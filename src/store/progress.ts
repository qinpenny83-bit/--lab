import { useSyncExternalStore } from 'react';
import type {
  AgentMemory,
  AgentRecommendation,
  Badge,
  BadgeDef,
  DailyPlanV2,
  ErrorCategory,
  FamilyMember,
  FamilyNote,
  FamilyObservationResult,
  LevelInfo,
  MistakeKind,
  SessionType,
  TopicId,
  UserProgress,
  WeeklyReport,
  WeeklyReportPoint,
  StageProgress,
  StageState,
  TransferSceneKind,
} from '../types/models';
import { LEVELS, TOPIC_ORDER, FAMILY_DIMENSIONS, MASTERY_LABEL } from '../types/models';
import type { EvaluateInput, EvaluationResult } from '../engine/types';
import { LocalAgentEngine } from '../engine/LocalAgentEngine';
import { dailySummary, dailyTasks, dailyTasksV2 } from '../engine/ReviewCoach';
import { dateKey, dayStart, now } from '../engine/clock';
import {
  classifyMistake,
  dominantCategory,
  emptyStats,
  kindForCategory,
  markPatternRecovered,
  rootCause,
  updateMistakePatterns,
} from '../engine/MistakeEngine';
import {
  getNodeMastery,
  recordSceneValidation,
  transferSuccessRateOf,
} from '../engine/MasteryEngine';
import {
  getReviewState,
  recordReviewResult,
  reviewRetentionOf,
} from '../engine/ReviewEngine';
import { findNode, nodesByTopic } from '../data';
import { unitsByChapter } from '../data/curriculum';
import { STAGES, ALL_V3_NODES } from '../data/stages';
import { v3NodeById } from '../data/stages';
import { v33NodesBySubject, v33Subjects } from '../data/v33';
import type { V33Node } from '../types/v33';
import { computeMasteryEvidence, detectReasoningMistake, finalizeSession } from '../engine/ReasonerEngine';
import type { ReasoningOutcome } from '../engine/ReasonerEngine';
import type { ReasoningChallenge, ReasonerSession } from '../types/models';

const STORAGE_KEY = 'xinglin-progress-v3';
const OLD_STORAGE_KEY = 'xinglin-progress-v1';

export const engine = new LocalAgentEngine();

// ============================================================
// 成就徽章定义（基于真实行为自动获得）
// ============================================================
export const BADGES: BadgeDef[] = [
  {
    id: 'first_leaf',
    icon: '🌱',
    name: '第一片叶',
    desc: '第一次完成完整学习流程',
    check: (p) => p.sessions.length >= 1,
  },
  {
    id: 'observer',
    icon: '👀',
    name: '察象者',
    desc: '完成 10 次观察训练',
    check: (p) => p.completedObservations.length >= 10,
  },
  {
    id: 'breaker',
    icon: '🧩',
    name: '破局者',
    desc: '识别 5 次"症状不等于答案"',
    check: (p) => p.sessions.filter((s) => s.type === 'paradox' && s.correct).length >= 5,
  },
  {
    id: 'slow_down',
    icon: '🐢',
    name: '慢下来',
    desc: '主动追问 10 次后再做判断',
    check: (p) => (p.thoughtfulAsks ?? 0) >= 10,
  },
  {
    id: 'seven_days',
    icon: '🔥',
    name: '七日修炼',
    desc: '连续学习 7 天',
    check: (p) => p.streak >= 7,
  },
];

function initStageProgress(): Record<string, StageProgress> {
  const sp: Record<string, StageProgress> = {};
  for (const stage of STAGES) {
    const sNodes = ALL_V3_NODES.filter((n) => n.v3?.stageId === stage.id);
    sp[stage.id] = {
      stageId: stage.id,
      state: 'unlocked',
      startedAt: null,
      completedAt: null,
      masteredNodeCount: 0,
      totalNodeCount: sNodes.length,
      familiarNodeCount: 0,
    };
  }
  return sp;
}

export function defaultProgress(): UserProgress {
  const today = dateKey(now());
  return {
    xp: 0,
    streak: 0,
    lastStudyTime: 0,
    mastery: Object.fromEntries(TOPIC_ORDER.map((t) => [t, { correct: 0, total: 0 }])) as Record<
      TopicId,
      { correct: number; total: number }
    >,
    completedCases: [],
    completedObservations: [],
    completedFormulas: [],
    completedClassics: [],
    completedParadoxes: [],
    completedKnowledge: [],
    mistakes: [],
    weakPoints: [],
    recentTopics: [],
    sessions: [],
    recommendedTasks: [],
    // ---- V1.5 ----
    memory: emptyMemory(),
    badges: [],
    daily: {
      date: today,
      caseId: null,
      observationId: null,
      reviewRefId: null,
      done: [],
      allDone: false,
    },
    consecutiveCorrect: 0,
    streakBroken: false,
    dailySummary: null,
    dailySummaryDate: null,
    thoughtfulAsks: 0,
    xpLog: [],
    // ---- V2 ----
    mistakePatterns: [],
    nodeMastery: {},
    reviewQueue: [],
    stats: emptyStats(),
    weeklyReports: [],
    familyMembers: [],
    // ---- V3 ----
    schemaVersion: 3,
    currentStageId: 'stage1',
    stageProgress: initStageProgress(),
    // ---- V3.5 ----
    completedUnits: [],
    reasonerSessions: [],
  };
}

function emptyMemory(): AgentMemory {
  return {
    learningHabits: [],
    reasoningPatterns: [],
    misconceptions: [],
    strengths: [],
    preferredLearningMode: 'none',
  };
}

function migrateV2Data(raw: string): UserProgress {
  // 尝试先解析成 V3 格式
  const parsed = JSON.parse(raw) as Partial<UserProgress>;
  const base = defaultProgress();

  // 数据已迁移（schemaVersion >= 3）
  if (parsed.schemaVersion && parsed.schemaVersion >= 3) {
    return mergeProgress(base, parsed);
  }

  // V2 数据迁移（schemaVersion 缺失或 < 3）：所有 V2 字段直接保留，补上 V3 默认字段
  console.log('[杏林] V2→V3 数据迁移中...');
  const migrated: UserProgress = mergeProgress(base, parsed);
  migrated.schemaVersion = 3;
  migrated.currentStageId = base.currentStageId;
  migrated.stageProgress = initStageProgress();

  // 根据 V2 完成度自动解锁第一个非空境界
  if (parsed.completedKnowledge && parsed.completedKnowledge.length > 0) {
    // 检查 V2 数据中的知识节点是否包含 V3 节点
    const v2Ids = new Set(parsed.completedKnowledge);
    for (const node of ALL_V3_NODES) {
      if (node.v3 && v2Ids.has(node.id)) {
        const stageId = node.v3.stageId;
        const sp = migrated.stageProgress[stageId];
        if (sp && sp.state === 'locked') {
          sp.state = 'unlocked';
        }
      }
    }
  }

  // 确定当前境界
  for (const stage of STAGES) {
    const sp = migrated.stageProgress[stage.id];
    if (!sp) continue;
    if (sp.state === 'unlocked' || sp.state === 'learning') {
      migrated.currentStageId = stage.id;
      break;
    }
  }

  return migrated;
}

function mergeProgress(base: UserProgress, partial: Partial<UserProgress>): UserProgress {
  return {
    ...base,
    ...partial,
    mastery: { ...base.mastery, ...(partial.mastery ?? {}) },
    memory: { ...emptyMemory(), ...(partial.memory ?? {}) },
    daily: { ...base.daily, ...(partial.daily ?? {}) },
    stageProgress: { ...base.stageProgress, ...(partial.stageProgress ?? {}) },
  };
}

function load(): UserProgress {
  try {
    // 先读 V3 存储键
    let raw = localStorage.getItem(STORAGE_KEY);

    // V3 键不存在，尝试读取 V2 旧键并迁移
    if (!raw) {
      raw = localStorage.getItem(OLD_STORAGE_KEY);
      if (raw) {
        const migrated = migrateV2Data(raw);
        // 境界状态按当前掌握度自愈（新老数据统一口径）
        syncStageProgress(migrated);
        // 写回 V3 键
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated)); } catch { /* skip */ }
        // 删除旧键
        try { localStorage.removeItem(OLD_STORAGE_KEY); } catch { /* skip */ }
        return migrated;
      }
      return defaultProgress();
    }

    const loaded = migrateV2Data(raw);
    // 境界状态按当前掌握度自愈（新老数据统一口径）
    syncStageProgress(loaded);
    return loaded;
  } catch {
    return defaultProgress();
  }
}

let cache: UserProgress = load();
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

// ============================================================
// V3：境界进度同步（自愈式）
// stageProgress 不依赖手写流转：每次进度写入时按「本境可修炼节点
// （v33 全部节点，排除隔离）的掌握状态」重算境界状态，
// 存量数据也能自愈。
// 策略：八境全部直接解锁（unlocked），自由探索；状态仅按真实
// 掌握度流转 unlocked → learning → completed（通关线 = 掌握 70%）。
// 不设任何前置锁，避免「学不完前置境进不了下一境」的卡点。
// ============================================================

/** 每境可修炼节点（v33 命名空间，与修炼之路统计口径一致，排除隔离节点） */
const V33_NODES_BY_STAGE: Record<string, V33Node[]> = (() => {
  const map: Record<string, V33Node[]> = {};
  for (const sub of v33Subjects) {
    const nodes = v33NodesBySubject(sub.code).filter((n) => n.status !== 'quarantine');
    (map[sub.stage] ??= []).push(...nodes);
  }
  return map;
})();

function syncStageProgress(p: UserProgress) {
  const spMap = p.stageProgress;
  for (const stage of STAGES) {
    const nodes = V33_NODES_BY_STAGE[stage.id] ?? [];
    const total = nodes.length;
    const mastered = nodes.filter((n) => p.nodeMastery[n.nodeId]?.state === 'mastered').length;
    const familiar = nodes.filter((n) => {
      const st = p.nodeMastery[n.nodeId]?.state;
      return st === 'familiar' || st === 'mastered' || st === 'unstable';
    }).length;
    const touched = nodes.some((n) => (p.nodeMastery[n.nodeId]?.validations.length ?? 0) > 0);

    // 状态流转（不设前置锁）：通关线 = 本境可修炼节点掌握 70%（向上取整），全掌握自然满足
    const passLine = total > 0 ? Math.ceil(total * 0.7) : 0;
    let state: StageState;
    if (total > 0 && mastered >= passLine) state = 'completed';
    else if (touched) state = 'learning';
    else state = 'unlocked';

    // 只升不降：存量已完成/进行中的境界不因统计口径或数据迁移被回退。
    // （掌握衰退仍会从 completed 回落为 learning，属刻意行为）
    const prev = spMap[stage.id];
    const prevState = prev?.state;
    if (state === 'unlocked' && prevState === 'completed') state = 'learning';
    spMap[stage.id] = {
      stageId: stage.id,
      state,
      startedAt: prev?.startedAt ?? (state === 'learning' || state === 'completed' ? now() : null),
      completedAt: state === 'completed' ? (prev?.completedAt ?? now()) : null,
      masteredNodeCount: mastered,
      totalNodeCount: total,
      familiarNodeCount: familiar,
    };
  }

  // 当前境界 = 顺序上第一个未通关且已解锁的境界
  const cur = STAGES.find((s) => {
    const st = spMap[s.id]?.state;
    return st === 'unlocked' || st === 'learning' || st === 'familiar' || st === 'unstable';
  });
  if (cur) p.currentStageId = cur.id;
}

export function getProgress(): UserProgress {
  return cache;
}

function save(p: UserProgress) {
  syncStageProgress(p);
  cache = p;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // localStorage 不可用时退化为内存态
  }
  notify();
}

export function useProgress(): UserProgress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getProgress,
    getProgress
  );
}

export function resetProgress() {
  save(defaultProgress());
}

/** 惰性生成/刷新今日任务状态（首页首次渲染时调用，保持 daily 与日期一致） */
export function ensureDailyToday() {
  const p = getProgress();
  const ts = now();
  const today = dateKey(ts);
  const hasTasks = p.daily.caseId || p.daily.observationId || p.daily.reviewRefId;
  if (p.daily.date === today && hasTasks) return;
  const plan = dailyTasksV2(p);
  const legacy = dailyTasks(p);
  const next = structuredClone(p);
  next.daily = {
    date: plan.date,
    caseId: plan.tasks.find((t) => t.type === 'case')?.refId ?? legacy.caseId,
    observationId: plan.tasks.find((t) => t.type === 'observation')?.refId ?? legacy.observationId,
    reviewRefId: plan.tasks.find((t) => t.key === 'review')?.refId ?? legacy.reviewRefId,
    reviewTopic: plan.tasks.find((t) => t.key === 'review')?.topic ?? legacy.reviewTopic,
    done: p.daily.date === today ? p.daily.done : [],
    allDone: false,
    v2: plan,
  };
  save(next);
}

// ---------- 等级 ----------
export function levelFromXp(xp: number): LevelInfo {
  let index = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) {
      index = i;
      break;
    }
  }
  const cur = LEVELS[index];
  const next = index < LEVELS.length - 1 ? LEVELS[index + 1] : null;
  const span = next ? next.xp - cur.xp : 1;
  return {
    index,
    name: cur.name,
    emoji: cur.emoji,
    currentXp: cur.xp,
    nextXp: next ? next.xp : null,
    progress: next ? Math.min(1, (xp - cur.xp) / span) : 1,
  };
}

// ---------- 连续天数（中断不惩罚） ----------
function updateStreak(p: UserProgress, ts: number): number {
  if (p.streak === 0 || p.lastStudyTime === 0) return 1;
  const diff = (dayStart(ts) - dayStart(p.lastStudyTime)) / 86400000;
  if (diff <= 0) return p.streak;
  if (diff === 1) return p.streak + 1;
  // 中断：重新从 1 开始，不惩罚，标记为「修炼未断」
  p.streakBroken = true;
  return 1;
}

const KIND_REASON: Record<MistakeKind, string> = {
  single_symptom_jump: '把单个症状直接等同于结论',
  concept_confusion: '混淆相似概念',
  overlook_clue: '忽略关键线索',
  missing_prereq: '前置知识不足',
  transfer_fail: '换场景就失手',
  premature_judgment: '信息没收集完就下结论',
  weak_evidence: '证据不足仍坚持原假设',
  ignore_counterevidence: '看到反证却不用',
  failed_revision: '未随新线索修正',
};

function recomputeWeakPoints(p: UserProgress) {
  const map = new Map<TopicId, { count: number; lastAt: number; kind: MistakeKind | undefined }>();
  for (const m of p.mistakes) {
    const cur = map.get(m.topic) ?? { count: 0, lastAt: 0, kind: undefined as MistakeKind | undefined };
    cur.count += 1;
    if (m.at > cur.lastAt) {
      cur.lastAt = m.at;
      cur.kind = m.kind;
    }
    map.set(m.topic, cur);
  }
  p.weakPoints = [...map.entries()]
    .map(([topic, v]) => ({
      topic,
      reason: v.kind ? KIND_REASON[v.kind] : '答题不稳定',
      count: v.count,
      lastAt: v.lastAt,
    }))
    .sort((a, b) => b.count - a.count);
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ============================================================
// V1.5：Agent 记忆更新（全部来自真实学习行为）
// ============================================================
function bumpHabit(memory: AgentMemory, type: SessionType) {
  const h = memory.learningHabits.find((x) => x.type === type);
  if (h) h.count += 1;
  else memory.learningHabits.push({ type, count: 1 });
}

function bumpPattern(memory: AgentMemory, kind: AgentMemory['reasoningPatterns'][number]['kind']) {
  const ts = now();
  const r = memory.reasoningPatterns.find((x) => x.kind === kind);
  if (r) {
    r.count += 1;
    r.lastAt = ts;
  } else {
    memory.reasoningPatterns.push({ kind, count: 1, lastAt: ts });
  }
}

function recomputeMemory(p: UserProgress) {
  const mem = p.memory;

  // 错误观念：topic+kind 聚合（出现 >=2 次才记录）
  const miscon = new Map<string, { topic: TopicId; kind: MistakeKind; times: number; lastAt: number }>();
  for (const m of p.mistakes) {
    const key = `${m.topic}:${m.kind}`;
    const cur = miscon.get(key) ?? { topic: m.topic, kind: m.kind, times: 0, lastAt: 0 };
    cur.times += 1;
    cur.lastAt = Math.max(cur.lastAt, m.at);
    miscon.set(key, cur);
  }
  mem.misconceptions = [...miscon.values()]
    .filter((v) => v.times >= 2)
    .sort((a, b) => b.times - a.times)
    .slice(0, 5);

  // 优势：基于真实正确表现
  const strengths: AgentMemory['strengths'] = [];
  const obsGood = p.sessions.filter((s) => s.type === 'observation' && s.correct).length;
  if (obsGood >= 3) strengths.push({ label: '观察力稳定', kind: 'observe', count: obsGood });
  const paradoxGood = p.sessions.filter((s) => s.type === 'paradox' && s.correct).length;
  if (paradoxGood >= 2) strengths.push({ label: '反直觉意识', kind: 'combine', count: paradoxGood });
  const knowledgeTotal = p.sessions.filter((s) => s.type === 'knowledge').length;
  const knowledgeGood = p.sessions.filter((s) => s.type === 'knowledge' && s.correct).length;
  if (knowledgeTotal >= 3 && knowledgeGood / knowledgeTotal >= 0.7) {
    strengths.push({ label: '概念掌握', kind: 'explore', count: knowledgeGood });
  }
  const reviewDone = p.daily.done.filter((d) => d.startsWith('review:')).length + (p.dailySummary ? 1 : 0);
  if (reviewDone >= 2) strengths.push({ label: '勤于复习', kind: 'review', count: reviewDone });
  mem.strengths = strengths.slice(0, 4);

  // 偏好学习模式：频次最高
  const top = [...mem.learningHabits].sort((a, b) => b.count - a.count)[0];
  mem.preferredLearningMode = top && top.count >= 2 ? top.type : 'none';
}

// ============================================================
// V1.5：每日任务管理
// ============================================================
function ensureDaily(p: UserProgress, ts: number) {
  const today = dateKey(ts);
  if (p.daily.date === today && (p.daily.caseId || p.daily.observationId || p.daily.reviewRefId || p.daily.done.length)) {
    return;
  }
  // 新的一天：重新生成任务（V2 三件套，旧字段保留 V1.5 兜底）
  const plan = dailyTasksV2(p);
  const legacy = dailyTasks(p);
  p.daily = {
    date: plan.date,
    caseId: plan.tasks.find((t) => t.type === 'case')?.refId ?? legacy.caseId,
    observationId: plan.tasks.find((t) => t.type === 'observation')?.refId ?? legacy.observationId,
    reviewRefId: plan.tasks.find((t) => t.key === 'review')?.refId ?? legacy.reviewRefId,
    reviewTopic: plan.tasks.find((t) => t.key === 'review')?.topic ?? legacy.reviewTopic,
    done: p.daily.date === today ? p.daily.done : [],
    allDone: false,
    v2: plan,
  };
  // 昨日完成总结保留（跨天时存档展示）
  if (p.dailySummary && p.dailySummaryDate !== today) {
    // 保留最近一次总结，供首页「昨日」展示
  }
}

function markDailyDone(p: UserProgress, type: string, refId: string) {
  // V2 任务键：key:type:refId（如 mistake:knowledge:yy-1）
  const v2Tasks = p.daily.v2?.tasks ?? [];
  for (const t of v2Tasks) {
    if (t.type === type && t.refId === refId) {
      const k = `${t.key}:${type}:${refId}`;
      if (!p.daily.done.includes(k)) p.daily.done.push(k);
    }
  }
  const key = `${type}:${refId}`;
  const expected =
    (type === 'case' ? `case:${p.daily.caseId}` : type === 'observation' ? `observation:${p.daily.observationId}` : `review:${p.daily.reviewRefId}`);
  // 只要完成了对应的训练类型就算推进（不强制匹配到当日具体任务，避免僵化）
  if (!p.daily.done.includes(key) && expected) {
    p.daily.done.push(expected);
  }
  const v2Targets = v2Tasks.map((t) => `${t.key}:${t.type}:${t.refId}`);
  const targets = v2Targets.length
    ? v2Targets
    : [p.daily.caseId ? `case:${p.daily.caseId}` : null, p.daily.observationId ? `observation:${p.daily.observationId}` : null, p.daily.reviewRefId ? `review:${p.daily.reviewRefId}` : null].filter(Boolean) as string[];
  const allDone = targets.length > 0 && targets.every((t) => p.daily.done.includes(t));
  if (allDone && !p.daily.allDone) {
    p.daily.allDone = true;
    p.dailySummary = dailySummary(p);
    p.dailySummaryDate = p.daily.date;
  }
}

// ============================================================
// V1.5：成就判定
// ============================================================
export function checkBadges(p: UserProgress): Badge[] {
  const fresh: Badge[] = [];
  for (const def of BADGES) {
    if (p.badges.some((b) => b.id === def.id)) continue;
    if (def.check(p)) {
      const badge: Badge = { id: def.id, earnedAt: now() };
      p.badges.push(badge);
      fresh.push(badge);
    }
  }
  return fresh;
}

// ============================================================
// 学习闭环：评估 → 结算 → 记忆 → 成就 → V2 错因/掌握/复习/统计 → 持久化
// ============================================================
export function completeLearning(input: EvaluateInput): {
  result: EvaluationResult;
  progress: UserProgress;
  earnedXp: number;
  newBadges: Badge[];
} {
  const result = engine.evaluate(input);
  const prev = getProgress();
  const nowTs = now();
  const p: UserProgress = structuredClone(prev);

  ensureDaily(p, nowTs);
  const today = p.daily.date;
  const isReviewTask = input.type === 'knowledge' && input.refId === p.daily.reviewRefId;

  // 连续正确计数
  if (result.correct) p.consecutiveCorrect += 1;
  else p.consecutiveCorrect = 0;

  // 首次完成判定
  const completedMap: Record<string, string[]> = {
    case: p.completedCases,
    observation: p.completedObservations,
    knowledge: p.completedKnowledge,
    formula: p.completedFormulas,
    classic: p.completedClassics,
    paradox: p.completedParadoxes,
  };
  const isFirst = !completedMap[input.type].includes(input.refId);

  // ---- V1.5 XP 规则 ----
  let earned = result.correct ? 10 : 2; // 完成挑战 +10
  if (isFirst && result.passed) earned += 5; // 首次完成 +5
  if (result.correct && p.consecutiveCorrect >= 2) earned += 3; // 连续正确 +3
  if (isReviewTask && result.correct) earned += 8; // 完成复习 +8

  const topic = result.topic;
  const sessionId = uid();
  p.sessions.push({
    id: sessionId,
    type: input.type,
    refId: input.refId,
    topic,
    startedAt: nowTs - 60000,
    completedAt: nowTs,
    correct: result.correct,
    keyQuestion: result.keyQuestion,
    mistake: result.feedback.find((f) => f.startsWith('❌') || f.startsWith('🧠') || f.startsWith('⚠️') || f.startsWith('🔍') || f.startsWith('🧩')) ?? result.mistakeQuestion,
    mistakeKind: result.mistakeKind,
    xpEarned: earned,
  });

  p.xp += earned;
  p.xpLog = [...p.xpLog.slice(-30), { at: nowTs, amount: earned, reason: input.type }];

  const m = p.mastery[topic];
  m.total += 1;
  if (result.correct) m.correct += 1;

  p.streak = updateStreak(p, nowTs);
  p.lastStudyTime = nowTs;
  p.recentTopics = [topic, ...p.recentTopics.filter((t) => t !== topic)].slice(0, 5);

  if (result.passed) {
    const list = completedMap[input.type];
    if (!list.includes(input.refId)) list.push(input.refId);
  }

  if (!result.correct && result.mistakeKind) {
    p.mistakes.push({
      sessionId,
      topic,
      refId: input.refId,
      question: result.mistakeQuestion ?? '',
      answer: result.mistakeAnswer ?? '',
      correctAnswer: result.correctAnswer ?? '',
      kind: result.mistakeKind,
      at: nowTs,
    });
  }
  p.mistakes = p.mistakes.slice(-80);
  recomputeWeakPoints(p);

  // ---- V2：Mistake Engine（错因分类 → 错误模式聚合） ----
  if (!result.correct) {
    classifyMistake(false, result.mistakeKind, { sceneKind: input.sceneKind });
    if (result.mistakeKind) {
      p.mistakePatterns = updateMistakePatterns(p.mistakePatterns, result.mistakeKind, topic);
    }
  } else {
    // 答对：把最近一次同类错误标记为「已恢复」（行为驱动的纠正记录）
    const lastErr = [...p.sessions].reverse().find((s) => !s.correct && s.mistakeKind);
    if (lastErr?.mistakeKind) markPatternRecovered(p.mistakePatterns, lastErr.mistakeKind);
  }

  // ---- V2：Mastery Engine（掌握验证：familiar → variation → transfer） ----
  if (input.type === 'knowledge') {
    const nm = getNodeMastery(p, input.refId);
    const sceneKind = input.sceneKind ?? 'familiar';
    const rec = recordSceneValidation(nm, sceneKind, result.correct, sessionId);
    p.nodeMastery[input.refId] = rec.nm;
    if (rec.changed && result.correct) {
      result.feedback.unshift(
        `🎯 掌握状态更新：${MASTERY_LABEL[rec.nm.state]}${
          rec.nm.state === 'mastered' ? ' —— 熟悉、变式、陌生三种场景全部通过，真正掌握！' : ''
        }`
      );
    } else if (rec.changed && !result.correct && rec.nm.state === 'unstable') {
      result.feedback.unshift(
        `🔄 这题没答对，掌握状态回退到「${MASTERY_LABEL.unstable}」——间隔后遗忘说明还需要巩固。`
      );
    }

    // ---- V2：Review Engine（动态间隔复习） ----
    const node = findNode(input.refId);
    const existed = p.reviewQueue.some((r) => r.nodeId === input.refId);
    const rs = recordReviewResult(p, input.refId, result.correct, node?.difficulty ?? 2);
    if (!existed) p.reviewQueue.push(rs);
  }

  // ---- V2：7日掌握报告 ----
  updateWeeklyReport(p, topic, nowTs, result.correct && input.type === 'knowledge');

  // ---- V1.5：Agent 记忆更新 ----
  bumpHabit(p.memory, input.type);
  if (result.correct) bumpPattern(p.memory, 'solid');
  else if (result.mistakeKind) bumpPattern(p.memory, result.mistakeKind);
  if (input.type === 'case') {
    if (result.correct && result.keyQuestion) bumpPattern(p.memory, 'careful');
    if (!result.correct && result.mistakeKind === 'single_symptom_jump') bumpPattern(p.memory, 'impatient');
    if (result.keyQuestion) p.thoughtfulAsks += 1; // 主动追问后再判断
  }
  recomputeMemory(p);

  // ---- V1.5：每日任务推进 ----
  markDailyDone(p, input.type, input.refId);

  // ---- V2：学习行为统计（仅用于反馈，不评价人格） ----
  p.stats = recomputeStats(p);

  // ---- V1.5：成就判定 ----
  const newBadges = checkBadges(p);

  p.recommendedTasks = engine.recommend(p).slice(0, 3);
  result.xp = earned;

  save(p);
  return { result, progress: p, earnedXp: earned, newBadges };
}

// ============================================================
// V2：7日掌握报告（Day 1 / 3 / 7 用不同案例验证）
// ============================================================
function updateWeeklyReport(p: UserProgress, topic: TopicId, ts: number, validated: boolean) {
  let report = p.weeklyReports.find((r) => r.topic === topic);
  if (!report) {
    report = { topic, startedAt: ts, points: [], knowledgeGain: '', thinkingChange: '', errorReduction: '', transferAbility: '' };
    p.weeklyReports.push(report);
  }
  if (!validated) return;
  const dayNum = Math.floor((dayStart(ts) - dayStart(report.startedAt)) / 86400000) + 1;
  const target = dayNum <= 1 ? 1 : dayNum <= 3 ? 3 : dayNum <= 7 ? 7 : null;
  if (target && !report.points.some((pt) => pt.day === target)) {
    report.points.push({ day: target, at: ts, validated: true, state: 'learning', note: `第 ${target} 天验证通过` });
    report.points.sort((a, b) => a.day - b.day);
  }
}

// ============================================================
// V2：学习行为统计（全部来自真实行为记录）
// ============================================================
function recomputeStats(p: UserProgress): UserProgress['stats'] {
  const caseSessions = p.sessions.filter((s) => s.type === 'case');
  const caseAsks = caseSessions.filter((s) => s.keyQuestion).length;
  const errorCount = Math.max(1, p.mistakes.length);
  const premature = p.mistakes.filter((m) => m.kind === 'single_symptom_jump').length;
  const patterns = p.mistakePatterns;
  const recoveredPatterns = patterns.filter((x) => x.recovered).length;
  return {
    // 判断前平均追问倾向：case 会话中主动追问的比例
    averageQuestionsBeforeJudgment: caseSessions.length ? Math.round((caseAsks / caseSessions.length) * 100) / 100 : 0,
    // 过早判断率：单线索快速判断错误在全部错误中的占比
    prematureJudgmentRate: Math.round((premature / errorCount) * 100) / 100,
    // 线索覆盖：case 会话整体正确率（观察+追问+综合判断的体现）
    clueCoverage: caseSessions.length ? Math.round((caseSessions.filter((s) => s.correct).length / caseSessions.length) * 100) / 100 : 0,
    // 迁移成功率：transfer 场景验证通过比例
    transferSuccessRate: Math.round(transferSuccessRateOf(p) * 100) / 100,
    // 复习保持率：最近复习中答对的比例
    reviewRetention: Math.round(reviewRetentionOf(p) * 100) / 100,
    // 错因纠正率：已恢复的错误模式占比
    mistakeRecoveryRate: patterns.length ? Math.round((recoveredPatterns / patterns.length) * 100) / 100 : 0,
  };
}

// ============================================================
// V2：家庭健康观察（非诊断、非治疗）
// ============================================================
export function addFamilyMember(relation: string): FamilyMember {
  const p = getProgress();
  const next = structuredClone(p);
  const member: FamilyMember = {
    id: 'fam-' + uid(),
    relation,
    createdAt: now(),
    notes: [],
  };
  next.familyMembers = [...next.familyMembers, member];
  save(next);
  return member;
}

export function addFamilyNote(memberId: string, dimension: string, value: string) {
  const p = getProgress();
  const next = structuredClone(p);
  const member = next.familyMembers.find((x) => x.id === memberId);
  if (!member) return;
  const note: FamilyNote = { dimension: dimension as FamilyNote['dimension'], value, at: now() };
  member.notes = [note, ...member.notes].slice(0, 200);
  save(next);
}

export function removeFamilyMember(memberId: string) {
  const p = getProgress();
  const next = structuredClone(p);
  next.familyMembers = next.familyMembers.filter((x) => x.id !== memberId);
  save(next);
}

/**
 * 整理一位成员的观察记录：
 * 只做「长期变化」的观察描述与维度意义解释，绝不诊断、不推荐治疗。
 * 急症关键词由 SafetyGuard 拦截（这里做轻量标记）。
 */
export function familyObservation(member: FamilyMember): FamilyObservationResult {
  const p = getProgress();
  const notes = member.notes;
  const recent = notes.slice(0, 14); // 最近约两周
  const changes: string[] = [];
  for (const dim of FAMILY_DIMENSIONS) {
    const dimNotes = recent.filter((n) => n.dimension === dim);
    if (dimNotes.length < 2) continue;
    const first = dimNotes[dimNotes.length - 1].value;
    const last = dimNotes[0].value;
    if (first !== last) changes.push(`${dim}：${first} → ${last}`);
  }
  const insight =
    changes.length > 0
      ? `近两周观察到的变化：${changes.join('；')}。这些只是观察记录，用于练习「连续观察同一维度」的能力。`
      : '同一维度的连续记录还不够多，先坚持记录 2-3 天，才能看到趋势。';
  // 急症标记（轻量）：不自行处理，提示就医
  const urgentKeywords = ['胸痛', '呼吸困难', '大出血', '昏迷', '剧烈腹痛', '抽搐', '无法说话'];
  const urgent = notes.some((n) => urgentKeywords.some((k) => n.value.includes(k)));
  const safetyLevel = urgent ? 'emergency' : 'green';
  return {
    memberId: member.id,
    insight,
    trendNote: changes.length ? '发现长期变化：' + changes.join('；') : '暂无明显趋势',
    safetyLevel,
  };
}

/** V2：该主题的 7 日报告（无则 null） */
export function weeklyReportOf(p: UserProgress, topic: TopicId): WeeklyReport | undefined {
  return p.weeklyReports.find((r) => r.topic === topic);
}

/** V2：主导错因根因（无则 null） */
export function dominantRootCause(p: UserProgress): { category: ErrorCategory; cause: ReturnType<typeof rootCause> } | null {
  const dom = dominantCategory(p);
  if (!dom) return null;
  return { category: dom.category, cause: rootCause(p, dom.category) };
}

// ============================================================
// V3.5：课程播放器 —— 学习单元结算（真实行为 → Mistake / Mastery / Review）
// ============================================================

/** 学习单元结算输入 */
export interface UnitSettleInput {
  unitId: string;
  nodeId: string;
  topic: TopicId;
  difficulty?: number;
  /** null = 无对错（read / think / explain），只记录完成与学习行为 */
  correct: boolean | null;
  mistakeKind?: MistakeKind;
  /** 掌握验证场景层级（familiar / variation / transfer），默认 familiar */
  sceneKind?: TransferSceneKind;
}

/**
 * 结算一个学习单元：
 * - 标记单元完成（completedUnits）并记录学习行为（streak / 最近学习）
 * - 有对错时：写入 session、掌握验证（familiar 场景）、复习队列、错因（错时）
 * 原则：read / think / explain 不虚报「正确」，只标记进度。
 */
export function completeLearningUnit(input: UnitSettleInput): UserProgress {
  const prev = getProgress();
  const nowTs = now();
  const p: UserProgress = structuredClone(prev);

  if (!p.completedUnits.includes(input.unitId)) p.completedUnits.push(input.unitId);
  p.streak = updateStreak(p, nowTs);
  p.lastStudyTime = nowTs;

  // 无对错（阅读/思考/解释）→ 只记进度，不虚报掌握
  if (input.correct === null) {
    if (!p.recentTopics.includes(input.topic)) {
      p.recentTopics = [input.topic, ...p.recentTopics].slice(0, 5);
    }
    save(p);
    return p;
  }

  const correct = input.correct;
  const difficulty = input.difficulty ?? 2;
  const sessionId = uid();
  const earned = correct ? 10 : 2;

  p.sessions.push({
    id: sessionId,
    type: 'knowledge',
    refId: input.nodeId,
    topic: input.topic,
    startedAt: nowTs - 60000,
    completedAt: nowTs,
    correct,
    mistakeKind: correct ? undefined : input.mistakeKind,
    xpEarned: earned,
  });

  p.xp += earned;
  p.xpLog = [...p.xpLog.slice(-30), { at: nowTs, amount: earned, reason: 'unit' }];
  const m = p.mastery[input.topic];
  m.total += 1;
  if (correct) m.correct += 1;
  p.recentTopics = [input.topic, ...p.recentTopics.filter((t) => t !== input.topic)].slice(0, 5);

  // 掌握验证：学习单元的选择题作为「熟悉场景」验证
  const nm = getNodeMastery(p, input.nodeId);
  const rec = recordSceneValidation(nm, input.sceneKind ?? 'familiar', correct, sessionId);
  p.nodeMastery[input.nodeId] = rec.nm;

  // 复习队列
  const existed = p.reviewQueue.some((r) => r.nodeId === input.nodeId);
  const rs = recordReviewResult(p, input.nodeId, correct, difficulty);
  if (!existed) p.reviewQueue.push(rs);

  // 错因（答错时）
  if (!correct && input.mistakeKind) {
    p.mistakes.push({
      sessionId,
      topic: input.topic,
      refId: input.nodeId,
      question: '',
      answer: '',
      correctAnswer: '',
      kind: input.mistakeKind,
      at: nowTs,
    });
    p.mistakes = p.mistakes.slice(-80);
    classifyMistake(false, input.mistakeKind, {});
    p.mistakePatterns = updateMistakePatterns(p.mistakePatterns, input.mistakeKind, input.topic);
    bumpPattern(p.memory, input.mistakeKind);
    recomputeWeakPoints(p);
  } else if (correct) {
    bumpPattern(p.memory, 'solid');
  }
  bumpHabit(p.memory, 'knowledge');
  recomputeMemory(p);
  p.stats = recomputeStats(p);
  checkBadges(p);

  save(p);
  return p;
}

/**
 * 重置一个章节的课程进度（移除该章节全部单元完成标记），
 * 用于「再复习一遍」：清除完成后状态，让播放器从头重走一遍。
 */
export function resetChapterProgress(chapterId: string): UserProgress {
  const prev = getProgress();
  const p: UserProgress = structuredClone(prev);
  const unitIds = unitsByChapter(chapterId).map((u) => u.id);
  if (unitIds.length) {
    p.completedUnits = p.completedUnits.filter((id) => !unitIds.includes(id));
  }
  save(p);
  return p;
}

// ============================================================
// v33：33 学科节点修炼结算
// 真实数据驱动（learningUnit 八要素），不虚构选项/答案：
// - 辨析题（客观，commonTrap）→ familiar 场景
// - 推理/迁移（对照参考答案自评）→ variation / transfer 场景
// - correct=null：仅学习，不虚报掌握
// ============================================================
export interface V33PracticeInput {
  nodeId: string;
  /** 学科代码（A~AG），作为掌握/错因聚合键（topicMetaOf 兼容展示） */
  topicKey: string;
  difficulty?: number;
  sceneKind?: TransferSceneKind;
  correct: boolean | null;
}

export function completeV33Practice(input: V33PracticeInput): UserProgress {
  const prev = getProgress();
  const nowTs = now();
  const p: UserProgress = structuredClone(prev);

  const topicKey = input.topicKey as TopicId;
  const nodeId = input.nodeId;
  const difficulty = input.difficulty ?? 2;

  // 掌握聚合键（学科代码）可能未注册 → 安全初始化
  if (!p.mastery[topicKey]) {
    p.mastery[topicKey] = { correct: 0, total: 0 };
  }
  const m = p.mastery[topicKey];

  // 纯学习：只记进度与学习行为
  if (input.correct === null) {
    p.streak = updateStreak(p, nowTs);
    p.lastStudyTime = nowTs;
    if (!p.recentTopics.includes(topicKey)) {
      p.recentTopics = [topicKey, ...p.recentTopics].slice(0, 5);
    }
    save(p);
    return p;
  }

  const correct = input.correct;
  const sessionId = uid();
  const earned = correct ? 10 : 2;
  p.sessions.push({
    id: sessionId,
    type: 'knowledge',
    refId: nodeId,
    topic: topicKey,
    startedAt: nowTs - 60000,
    completedAt: nowTs,
    correct,
    mistakeKind: correct ? undefined : 'concept_confusion',
    xpEarned: earned,
  });
  p.xp += earned;
  p.xpLog = [...p.xpLog.slice(-30), { at: nowTs, amount: earned, reason: 'v33' }];
  m.total += 1;
  if (correct) m.correct += 1;
  p.streak = updateStreak(p, nowTs);
  p.lastStudyTime = nowTs;
  p.recentTopics = [topicKey, ...p.recentTopics.filter((t) => t !== topicKey)].slice(0, 5);

  // 掌握验证：沿用 familiar → variation → transfer 状态机
  const nm = getNodeMastery(p, nodeId);
  const rec = recordSceneValidation(nm, input.sceneKind ?? 'familiar', correct, sessionId);
  p.nodeMastery[nodeId] = rec.nm;

  // 复习队列
  const existed = p.reviewQueue.some((r) => r.nodeId === nodeId);
  const rs = recordReviewResult(p, nodeId, correct, difficulty);
  if (!existed) p.reviewQueue.push(rs);

  // 错因：辨析答错 → 概念混淆；推理/迁移自评不一致 → 迁移失手
  if (!correct) {
    const kind: MistakeKind =
      input.sceneKind === 'transfer' || input.sceneKind === 'variation' ? 'transfer_fail' : 'concept_confusion';
    p.mistakes.push({
      sessionId,
      topic: topicKey,
      refId: nodeId,
      question: '',
      answer: '',
      correctAnswer: '',
      kind,
      at: nowTs,
    });
    p.mistakes = p.mistakes.slice(-80);
    classifyMistake(false, kind, {});
    p.mistakePatterns = updateMistakePatterns(p.mistakePatterns, kind, topicKey);
    bumpPattern(p.memory, kind);
    recomputeWeakPoints(p);
  } else {
    bumpPattern(p.memory, 'solid');
  }
  bumpHabit(p.memory, 'knowledge');
  recomputeMemory(p);
  p.stats = recomputeStats(p);
  checkBadges(p);
  updateWeeklyReport(p, topicKey, nowTs, correct);

  save(p);
  return p;
}

/** 八步推理结算输入 */
export interface ReasoningSettleInput {
  session: ReasonerSession;
  challenge: ReasoningChallenge;
  outcome: ReasoningOutcome;
}

/**
 * 结算一次八步推理会话：
 * - 落地会话（reasonerSessions）+ 完成时间 + 错因识别（detectReasoningMistake）
 * - 按结论与迁移结果，对涉及节点写入掌握验证（familiar / transfer）与复习队列
 * - 计算七维掌握证据（conceptUnderstanding 来自真实答题正确率）
 * 返回：识别出的错因（可为 null）与掌握证据，供 UI「推理复盘 / 掌握验证」展示。
 */
export function settleReasoningOutcome(input: ReasoningSettleInput): {
  mistake: ReturnType<typeof detectReasoningMistake>;
  mastery: ReturnType<typeof computeMasteryEvidence>;
} {
  const { session, challenge, outcome } = input;
  const prev = getProgress();
  const nowTs = now();
  const p: UserProgress = structuredClone(prev);

  const finished = finalizeSession(session);
  const mistake = detectReasoningMistake(finished, challenge, outcome);
  finished.mistake = mistake;

  // 落地会话（去重替换同 id）
  p.reasonerSessions = [...p.reasonerSessions.filter((s) => s.id !== finished.id), finished];

  const chooseBest = outcome.finalHypothesisId === challenge.bestHypothesisId;
  const nodeIds = challenge.nodeIds.length ? challenge.nodeIds : [];
  const sessionId = uid();

  for (const nodeId of nodeIds) {
    const difficulty = v3NodeById(nodeId)?.difficulty ?? 2;
    const nm = getNodeMastery(p, nodeId);
    const rec = recordSceneValidation(nm, 'familiar', chooseBest, sessionId);
    p.nodeMastery[nodeId] = rec.nm;
    if (outcome.transferPassed === true) {
      const recT = recordSceneValidation(p.nodeMastery[nodeId], 'transfer', true, sessionId);
      p.nodeMastery[nodeId] = recT.nm;
    }
    const existed = p.reviewQueue.some((r) => r.nodeId === nodeId);
    const allPass = chooseBest && outcome.transferPassed === true;
    const rs = recordReviewResult(p, nodeId, allPass, difficulty);
    if (!existed) p.reviewQueue.push(rs);
  }

  // 错因落地
  if (mistake) {
    p.mistakes.push({
      sessionId,
      topic: challenge.topic,
      refId: challenge.id,
      question: '',
      answer: '',
      correctAnswer: '',
      kind: mistake.mistakeKind,
      at: nowTs,
    });
    p.mistakes = p.mistakes.slice(-80);
    classifyMistake(false, mistake.mistakeKind, {});
    p.mistakePatterns = updateMistakePatterns(p.mistakePatterns, mistake.mistakeKind, challenge.topic);
    bumpPattern(p.memory, mistake.mistakeKind);
    recomputeWeakPoints(p);
  } else {
    bumpPattern(p.memory, 'solid');
  }
  bumpHabit(p.memory, 'knowledge');
  recomputeMemory(p);

  // 学习行为
  const earned = 15;
  p.xp += earned;
  p.xpLog = [...p.xpLog.slice(-30), { at: nowTs, amount: earned, reason: 'reasoning' }];
  p.streak = updateStreak(p, nowTs);
  p.lastStudyTime = nowTs;
  p.recentTopics = [challenge.topic, ...p.recentTopics.filter((t) => t !== challenge.topic)].slice(0, 5);
  p.sessions.push({
    id: sessionId,
    type: 'knowledge',
    refId: challenge.id,
    topic: challenge.topic,
    startedAt: finished.startedAt,
    completedAt: nowTs,
    correct: chooseBest,
    mistakeKind: mistake?.mistakeKind,
    xpEarned: earned,
  });

  p.stats = recomputeStats(p);
  checkBadges(p);

  // 七维掌握证据（conceptUnderstanding 来自真实答题正确率）
  const nodeSet = new Set(nodeIds);
  const relevant = p.sessions.filter((s) => s.type === 'knowledge' && nodeSet.has(s.refId));
  const conceptUnderstanding = relevant.length
    ? relevant.filter((s) => s.correct).length / relevant.length
    : 0;
  const mastery = computeMasteryEvidence({
    sessions: [finished],
    challenges: [challenge],
    conceptUnderstanding,
    retention: reviewRetentionOf(p),
    nodeIds,
  });

  save(p);
  return { mistake, mastery };
}

export type { AgentRecommendation };
