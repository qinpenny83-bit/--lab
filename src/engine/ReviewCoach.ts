import type {
  AgentDiscovery,
  AgentProfile,
  AgentRecommendation,
  DailyPlanV2,
  DailyTaskV2Item,
  DiscoveryKind,
  ErrorCategory,
  LearningStage,
  LearningTag,
  MistakeKind,
  SessionType,
  TopicId,
  TransferSceneKind,
  UserProgress,
} from '../types/models';
import { CATEGORY_ICON, CATEGORY_LABEL, TOPIC_META, TOPIC_ORDER, topicMetaOf } from '../types/models';
import { cases, observationTasks, formulas, classics, paradoxChallenges, nodesByTopic, taskTitle, findObservation, findNode } from '../data';
import { dominantCategory, rootCause } from './MistakeEngine';
import { dueReviews } from './ReviewEngine';
import { getNodeMastery, nextPendingScene } from './MasteryEngine';
import { dateKey, now } from './clock';
import { STAGES, ALL_V3_NODES, stageById, nodesOfStage, modulesOfStage, v3NodeById } from '../data/stages';

/** 主题名安全读取：v33 学科代码等未注册键原样返回 */
function tname(topic: string): string {
  return topicMetaOf(topic)?.name ?? topic;
}

const KIND_LABEL: Record<MistakeKind, string> = {
  single_symptom_jump: '把单个症状直接等同于结论',
  concept_confusion: '混淆相似概念',
  overlook_clue: '忽略关键线索',
  missing_prereq: '前置知识不足',
  transfer_fail: '换场景就失手',
  premature_judgment: '过早下结论',
  weak_evidence: '证据不足仍坚持',
  ignore_counterevidence: '忽略反证',
  failed_revision: '未随新线索修正',
};

const KIND_ICON: Record<MistakeKind, string> = {
  single_symptom_jump: '⚡',
  concept_confusion: '🧩',
  overlook_clue: '👁️',
  missing_prereq: '🧱',
  transfer_fail: '🧭',
  premature_judgment: '🏃',
  weak_evidence: '🧾',
  ignore_counterevidence: '🙈',
  failed_revision: '🔄',
};

function rate(p: UserProgress, topic: TopicId): number {
  const m = p.mastery[topic];
  if (!m || m.total === 0) return 0;
  return m.correct / m.total;
}

// ---- V3：境界感知工具 ----

/** 当前有效境界（stage1 → stage8） */
function currentStage(p: UserProgress): LearningStage | undefined {
  const id = p.currentStageId;
  if (!id) return STAGES[0]; // 默认境界一
  return stageById(id) ?? STAGES[0];
}

/** 当前境界中用户尚未掌握的知识节点 */
function pendingStageNodes(p: UserProgress): string[] {
  const stage = currentStage(p);
  if (!stage) return [];
  const stageNodes = ALL_V3_NODES.filter((n) => n.v3?.stageId === stage.id);
  return stageNodes
    .filter((n) => {
      const nm = p.nodeMastery[n.id];
      return !nm || nm.state !== 'mastered';
    })
    .map((n) => n.id);
}

/** 当前境界中推荐的知识节点（前置已满足） */
function recommendableStageNodes(p: UserProgress): string[] {
  const pending = pendingStageNodes(p);
  const mastered = new Set(
    Object.entries(p.nodeMastery)
      .filter(([, v]) => v.state === 'mastered')
      .map(([id]) => id)
  );
  return pending.filter((id) => {
    const node = v3NodeById(id);
    if (!node?.v3?.prerequisites.length) return true;
    return node.v3.prerequisites.every((pre) => mastered.has(pre));
  });
}

/** 修炼等级：根据已完成境界数量 */
function cultivationRealm(p: UserProgress): string {
  const completedCount = Object.values(p.stageProgress).filter((sp) => sp.state === 'completed' || sp.state === 'mastered').length;
  const realms = [
    { name: '初学者', icon: '🌱', min: 0 },
    { name: '见习者', icon: '🌿', min: 1 },
    { name: '观察者', icon: '👁️', min: 2 },
    { name: '辨证者', icon: '🧩', min: 3 },
    { name: '推理者', icon: '🔍', min: 4 },
    { name: '迁移者', icon: '🧭', min: 5 },
    { name: '综合修炼者', icon: '⚗️', min: 6 },
    { name: '杏林试炼者', icon: '🌟', min: 7 },
  ];
  let realm = realms[0];
  for (const r of realms) {
    if (completedCount >= r.min) realm = r;
  }
  return `${realm.icon} ${realm.name}`;
}

function unfinished(
  _p: UserProgress,
  type: SessionType,
  allIds: string[],
  completed: string[]
): string[] {
  return allIds.filter((id) => !completed.includes(id));
}

/** 找一个指定主题下未完成的病例 */
function unfinishedCase(p: UserProgress, topic: TopicId): string | null {
  return unfinished(p, 'case', cases.map((c) => c.id), p.completedCases).find(
    (id) => cases.find((c) => c.id === id)?.topic === topic
  ) ?? null;
}

export function recommend(progress: UserProgress): AgentRecommendation[] {
  const p = progress;
  const recs: AgentRecommendation[] = [];
  const add = (type: SessionType, refId: string, topic: TopicId, reason: string, priority: number) => {
    if (recs.some((r) => r.refId === refId && r.type === type)) return;
    recs.push({ id: `${type}-${refId}`, type, refId, topic, reason, priority, title: taskTitle(type, refId) });
  };
  const ts = now();

  // ---- V3：境界感知入口优先推荐 ----
  // 当用户有当前境界（非 stage1 冷启动）且该境界有未完成的 V3 知识节点时，
  // 优先级高于 V2 错因推荐——因为境界就是修炼的主线。
  if (p.currentStageId && p.currentStageId !== 'stage1') {
    const stageNodeIds = pendingStageNodes(p);
    const stageRecs = recommendableStageNodes(p);
    const stage = currentStage(p);
    if (stage && stageNodeIds.length > 0) {
      // 有效果推荐：优先推荐当前境界中未掌握且前置已满足的节点
      for (const id of stageRecs.slice(0, 2)) {
        const node = v3NodeById(id);
        if (node) {
          const prereqText = node.v3?.prerequisites.length
            ? `（解锁条件：已掌握 ${node.v3.prerequisites.length} 个前置知识）`
            : '';
          add('knowledge', id, node.topic, `你当前修炼「${stage.title}」，继续推进${node.v3?.coreConcept ? '：' + node.v3.coreConcept : ''}${prereqText}`, 0);
        }
      }
    } else if (stage && stageNodeIds.length === 0 && stage.order < 8) {
      // 当前境界全部完成，提示进阶
      const nextStage = stageById(`stage${stage.order + 1}`);
      if (nextStage && (p.stageProgress[nextStage.id]?.state === 'unlocked' || p.stageProgress[nextStage.id]?.state === 'locked')) {
        const site = p.stageProgress[nextStage.id];
        add('knowledge', 'v3-s1-n1', 'yinYang', `你已经完成「${stage.title}」，下一境界「${nextStage.title}」等待开启！`, 0);
      }
    }
  }

  // 1) 错误最多
  const errCount = new Map<TopicId, number>();
  for (const m of p.mistakes) errCount.set(m.topic, (errCount.get(m.topic) ?? 0) + 1);
  const errSorted = [...errCount.entries()].sort((a, b) => b[1] - a[1]);
  for (const [topic, count] of errSorted) {
    const lastKind = [...p.mistakes].reverse().find((m) => m.topic === topic)?.kind;
    const label = lastKind ? KIND_LABEL[lastKind] : '这个主题';
    const uc = unfinishedCase(p, topic);
    if (uc) {
      add('case', uc, topic, `你最近在「${tname(topic)}」上答错 ${count} 次，最容易${label}。今天用一个新病例练"${tname(topic)}"。`, 1);
      break;
    }
    const uo = unfinished(p, 'observation', observationTasks.map((o) => o.id), p.completedObservations).filter((id) => observationTasks.find((o) => o.id === id)?.topic === topic);
    if (uo.length) {
      add('observation', uo[0], topic, `你最近在「${tname(topic)}」上答错 ${count} 次，容易${label}。先做 3 分钟观察训练找回手感。`, 1);
      break;
    }
    const uk = nodesByTopic(topic).filter((n) => !p.completedKnowledge.includes(n.id));
    if (uk.length) {
      add('knowledge', uk[0].id, topic, `你最近在「${tname(topic)}」上答错 ${count} 次，最容易${label}。用一个知识挑战把概念钉牢。`, 1);
      break;
    }
  }

  // 2) 最近连续错误
  const recent = p.sessions.slice(-6);
  let consecutive = 0;
  let conTopic: TopicId | null = null;
  for (let i = recent.length - 1; i >= 0; i--) {
    const s = recent[i];
    if (!s.correct) {
      consecutive++;
      conTopic = s.topic;
    } else break;
  }
  if (consecutive >= 2 && conTopic) {
    const topic = conTopic;
    const uc = unfinishedCase(p, topic);
    if (uc) add('case', uc, topic, `你最近连续 ${consecutive} 次在「${tname(topic)}」上出错，趁热打铁换个场景巩固。`, 2);
    else {
      const uk = nodesByTopic(topic).filter((n) => !p.completedKnowledge.includes(n.id));
      if (uk.length) add('knowledge', uk[0].id, topic, `连续出错别急着往前走，先把「${tname(topic)}」的基本盘稳住。`, 2);
    }
  }

  // 3) 长时间未复习
  for (const topic of TOPIC_ORDER) {
    const m = p.mastery[topic];
    if (!m || m.total === 0) continue;
    const last = [...p.sessions].reverse().find((s) => s.topic === topic);
    if (!last) continue;
    const days = (ts - last.completedAt) / 86400000;
    if (days >= 3) {
      const uk = nodesByTopic(topic).filter((n) => !p.completedKnowledge.includes(n.id));
      const refId = uk.length ? uk[0].id : nodesByTopic(topic)[0].id;
      add('knowledge', refId, topic, `你已经 ${Math.floor(days)} 天没有复习「${tname(topic)}」，记忆正在消退，花 2 分钟把它捡回来。`, 3);
      if (recs.length >= 3) break;
    }
  }

  // 4) 前置知识不足
  for (const topic of TOPIC_ORDER) {
    const meta = TOPIC_META[topic];
    if (!meta.prereq) continue;
    const pre = meta.prereq;
    if (p.mastery[pre].total > 0 && rate(p, pre) < 0.5 && rate(p, topic) < 0.5) {
      const uk = nodesByTopic(pre).filter((n) => !p.completedKnowledge.includes(n.id));
      if (uk.length) add('knowledge', uk[0].id, pre, `「${tname(topic)}」学得吃力，多半是前置的「${tname(pre)}」还没打牢。先补地基。`, 3);
    }
  }

  // 5) 新知识（补齐推荐位）
  const fills: { type: SessionType; ids: string[]; completed: string[]; topicOf: (id: string) => TopicId; reason: (title: string) => string }[] = [
    {
      type: 'observation',
      ids: observationTasks.map((o) => o.id),
      completed: p.completedObservations,
      topicOf: (id) => observationTasks.find((o) => o.id === id)?.topic ?? 'diagnosis',
      reason: () => '新的观察训练：先学会"看到"，再谈判断。',
    },
    {
      type: 'case',
      ids: cases.map((c) => c.id),
      completed: p.completedCases,
      topicOf: (id) => cases.find((c) => c.id === id)?.topic ?? 'syndrome',
      reason: () => '新病例在等你：把学过的线索组合起来推一次。',
    },
    {
      type: 'formula',
      ids: formulas.map((f) => f.id),
      completed: p.completedFormulas,
      topicOf: () => 'formula' as TopicId,
      reason: () => '去方剂实验室：理解一个方子为什么这样组。',
    },
    {
      type: 'classic',
      ids: classics.map((c) => c.id),
      completed: p.completedClassics,
      topicOf: () => 'classic' as TopicId,
      reason: () => '经典解码：你会发现古文原来可以理解。',
    },
    {
      type: 'paradox',
      ids: paradoxChallenges.map((c) => c.id),
      completed: p.completedParadoxes,
      topicOf: (id) => paradoxChallenges.find((c) => c.id === id)?.topics[0] ?? 'syndrome',
      reason: () => '反直觉挑战：检验你是不是还在"单症状对号入座"。',
    },
  ];
  for (const fill of fills) {
    if (recs.length >= 3) break;
    const ids = unfinished(p, fill.type, fill.ids, fill.completed);
    if (!ids.length) continue;
    const id = ids[0];
    add(fill.type, id, fill.topicOf(id), fill.reason(taskTitle(fill.type, id)), 4);
  }

  return recs.sort((a, b) => a.priority - b.priority).slice(0, 3);
}

export function todayChallenge(p: UserProgress): AgentRecommendation | null {
  const recs = recommend(p);
  return recs[0] ?? null;
}

// ============================================================
// V1.5：思维标签（学习行为特征，非人格测试）
// ============================================================
export function learningTag(p: UserProgress): LearningTag {
  if (p.sessions.length === 0) {
    return {
      id: 'observer',
      label: '观察型 · 待积累',
      desc: '还没有足够的学习行为记录。先完成今天的第一个挑战，我会基于真实行为生成标签。',
    };
  }
  const jumps = p.mistakes.filter((m) => m.kind === 'single_symptom_jump').length;
  const solid = p.memory.reasoningPatterns.find((r) => r.kind === 'solid')?.count ?? 0;
  const caseCount = p.sessions.filter((s) => s.type === 'case').length;
  const obsCount = p.sessions.filter((s) => s.type === 'observation').length;
  const errRatio = p.mistakes.length / Math.max(1, p.sessions.length);

  if (jumps >= 2 && jumps >= Math.max(2, p.mistakes.length * 0.4)) {
    return {
      id: 'fast',
      label: '快速判断型',
      desc: '你最近倾向于看到线索后迅速给出结论。可以尝试「先多问一个问题，再做判断」。',
    };
  }
  if (errRatio <= 0.25 && (obsCount >= 2 || caseCount >= 3)) {
    return {
      id: 'careful',
      label: '谨慎型',
      desc: '你倾向先收集线索再下判断，正确率稳定。继续保持这种节奏。',
    };
  }
  if (solid >= 3) {
    return {
      id: 'observer',
      label: '观察型',
      desc: '你习惯先完整地"看到"再进入判断，这是中医思维的好基础。',
    };
  }
  return {
    id: 'balanced',
    label: '综合型',
    desc: '你的观察与判断比较均衡。可以试试挑战更高难度的病例，或在反直觉挑战里检验自己。',
  };
}

// ============================================================
// V1.5：Agent 主动发现（全部基于真实数据）
// ============================================================
export function discover(p: UserProgress): AgentDiscovery {
  // 0) 冷启动
  if (p.sessions.length === 0) {
    const stage = currentStage(p);
    return { kind: 'cold_start', message: `欢迎来到「${stage?.title ?? '初识中医'}」！我还不了解你的学习习惯，先完成今天的第一个挑战，我会开始观察你的推理方式。` };
  }

  // V3：境界进度提示（每完成一个新境界时触发一次）
  if (p.currentStageId) {
    const sp = p.stageProgress[p.currentStageId];
    const stage = currentStage(p);
    if (stage && sp && sp.state !== 'completed' && sp.state !== 'mastered' && sp.masteredNodeCount > 0) {
      const ratio = sp.masteredNodeCount / sp.totalNodeCount;
      if (ratio >= 0.8) {
        const pending = sp.totalNodeCount - sp.masteredNodeCount;
        return {
          kind: 'new_knowledge',
          message: `「${stage.title}」你已经掌握了 ${sp.masteredNodeCount}/${sp.totalNodeCount} 个知识点（${Math.round(ratio * 100)}%），还差 ${pending} 个就完成了！继续推进，不要停下来。`,
          refType: 'knowledge',
          refId: recommendableStageNodes(p)[0] ?? undefined,
        };
      }
      if (sp.state === 'locked' && stage.prerequisites.every((pre) => p.stageProgress[pre]?.state === 'completed')) {
        return {
          kind: 'new_knowledge',
          message: `你已达到开启「${stage.title}」的条件！点击开始你的修炼新篇章。`,
          refType: 'knowledge',
          refId: ALL_V3_NODES.find((n) => n.v3?.stageId === stage.id)?.id,
        };
      }
    }
  }

  const ts = now();

  // 1) 连续错误（最近连续 >=2 次出错）
  const recent = p.sessions.slice(-5);
  let conErr = 0;
  let conTopic: TopicId | null = null;
  for (let i = recent.length - 1; i >= 0; i--) {
    if (!recent[i].correct) {
      conErr++;
      conTopic = recent[i].topic;
    } else break;
  }
  if (conErr >= 2 && conTopic) {
    const uc = unfinishedCase(p, conTopic);
    return {
      kind: 'consecutive_errors',
      message: `我发现你最近连续 ${conErr} 次在「${tname(conTopic)}」上出错。今天先不学新知识，我们把这个问题先解决掉。`,
      refType: uc ? 'case' : 'knowledge',
      refId: uc ?? nodesByTopic(conTopic).find((n) => !p.completedKnowledge.includes(n.id))?.id,
    };
  }

  // 2) 同类错误模式（最近 10 次错题中某种错误出现 >=2 次）
  const kindMap = new Map<MistakeKind, { count: number; topic: TopicId; lastAt: number }>();
  for (const m of p.mistakes.slice(-10)) {
    const cur = kindMap.get(m.kind) ?? { count: 0, topic: m.topic, lastAt: 0 };
    cur.count += 1;
    cur.topic = m.topic;
    cur.lastAt = Math.max(cur.lastAt, m.at);
    kindMap.set(m.kind, cur);
  }
  const topKind = [...kindMap.entries()].sort((a, b) => b[1].count - a[1].count)[0];
  if (topKind && topKind[1].count >= 2) {
    const [kind, info] = topKind;
    if (kind === 'single_symptom_jump') {
      const up = unfinished(p, 'paradox', paradoxChallenges.map((c) => c.id), p.completedParadoxes);
      return {
        kind: 'same_pattern',
        message: `我注意到你最近 ${info.count} 次在「${tname(info.topic)}」的案例里都有过早下结论的情况。今天先不学新知识，我们做 2 个反直觉案例。`,
        refType: 'paradox',
        refId: up[0] ?? undefined,
      };
    }
    if (kind === 'overlook_clue') {
      const uo = unfinished(p, 'observation', observationTasks.map((o) => o.id), p.completedObservations);
      return {
        kind: 'same_pattern',
        message: `你最近 ${info.count} 次忽略了关键线索。先做 3 分钟的观察训练，练习"先完整看到，再判断"。`,
        refType: 'observation',
        refId: uo[0] ?? undefined,
      };
    }
    if (kind === 'transfer_fail') {
      const scene = pendingSceneFor(p, info.topic);
      if (scene) {
        return {
          kind: 'same_pattern',
          message: `你最近 ${info.count} 次是"熟悉场景能答对、换个场景就失手"。这不是知识问题，是记忆和"理解"还有距离——做一次迁移挑战验证一下。`,
          refType: 'knowledge',
          refId: scene.nodeId,
        };
      }
      return {
        kind: 'same_pattern',
        message: `你最近 ${info.count} 次在「${tname(info.topic)}」换场景后失手。回到这个概念，把"为什么"讲清楚再继续。`,
        refType: 'knowledge',
        refId: nodesByTopic(info.topic).find((n) => !p.completedKnowledge.includes(n.id))?.id,
      };
    }
    return {
      kind: 'same_pattern',
      message: `你最近在「${tname(info.topic)}」上反复出现「${KIND_LABEL[kind]}」。回到基础概念，把边界钉清楚。`,
      refType: 'knowledge',
      refId: nodesByTopic(info.topic).find((n) => !p.completedKnowledge.includes(n.id))?.id,
    };
  }

  // 3) 最近下降（前后半程正确率对比，至少 6 次会话）
  if (p.sessions.length >= 6) {
    const half = Math.floor(p.sessions.length / 2);
    const first = p.sessions.slice(0, half);
    const second = p.sessions.slice(half);
    const r1 = first.filter((s) => s.correct).length / first.length;
    const r2 = second.filter((s) => s.correct).length / second.length;
    if (r1 - r2 >= 0.3) {
      const rec = recommend(p)[0];
      return {
        kind: 'decline',
        message: `你的正确率从之前的 ${Math.round(r1 * 100)}% 降到了最近的 ${Math.round(r2 * 100)}%。先回到一个你已经掌握的主题，恢复手感再往前。`,
        refType: rec?.type,
        refId: rec?.refId,
      };
    }
  }

  // 4) 长时间未复习（>=3 天）
  for (const topic of TOPIC_ORDER) {
    const m = p.mastery[topic];
    if (!m || m.total === 0) continue;
    const last = [...p.sessions].reverse().find((s) => s.topic === topic);
    if (!last) continue;
    const days = (ts - last.completedAt) / 86400000;
    if (days >= 3) {
      const ref = nodesByTopic(topic).find((n) => !p.completedKnowledge.includes(n.id)) ?? nodesByTopic(topic)[0];
      return {
        kind: 'stale_review',
        message: `你已经 ${Math.floor(days)} 天没有碰「${tname(topic)}」了，记忆正在悄悄消退。花 2 分钟复习一下。`,
        refType: 'knowledge',
        refId: ref?.id,
      };
    }
  }

  // 5) 新知识
  const recs = recommend(p);
  if (recs.length) {
    return {
      kind: 'new_knowledge',
      message: `今天有一个新的挑战在等你：「${recs[0].title}」。${recs[0].reason}`,
      refType: recs[0].type,
      refId: recs[0].refId,
    };
  }
  return { kind: 'new_knowledge', message: '今天的推荐训练都完成了，去「知识地图」探索新主题吧。' };
}

export function discoveryKindLabel(kind: DiscoveryKind): string {
  const map: Record<DiscoveryKind, string> = {
    cold_start: '刚认识你',
    consecutive_errors: '连续错误',
    same_pattern: '同类错误模式',
    decline: '最近下降',
    stale_review: '该复习了',
    new_knowledge: '新知识',
  };
  return map[kind];
}

// ============================================================
// V1.5：每日任务（今日案件 / 今日观察 / 昨日复习）
// ============================================================
export interface DailyPlan {
  date: string;
  caseId: string | null;
  observationId: string | null;
  reviewRefId: string | null;
  reviewTopic: TopicId | null;
  advice: string;
}

export function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function dailyTasks(p: UserProgress): DailyPlan {
  const ts = now();
  const today = new Date(ts).toISOString().slice(0, 10);

  // 今日案件：推荐逻辑优先（弱项主题的未完成病例）
  let caseId: string | null = null;
  const recs = recommend(p);
  const caseRec = recs.find((r) => r.type === 'case');
  if (caseRec && !p.completedCases.includes(caseRec.refId)) {
    caseId = caseRec.refId;
  } else {
    const uc = unfinished(p, 'case', cases.map((c) => c.id), p.completedCases);
    if (uc.length) caseId = uc[0];
  }

  // 今日观察：未完成的观察训练（优先弱项主题）
  let observationId: string | null = null;
  const obsRec = recs.find((r) => r.type === 'observation');
  if (obsRec && !p.completedObservations.includes(obsRec.refId)) {
    observationId = obsRec.refId;
  } else {
    const uo = unfinished(p, 'observation', observationTasks.map((o) => o.id), p.completedObservations);
    if (uo.length) observationId = uo[0];
  }

  // 昨日复习：昨天（或最近 3 天）出错最多的主题 → 该主题未完成知识节点
  let reviewRefId: string | null = null;
  let reviewTopic: TopicId | null = null;
  const threeDaysAgo = ts - 3 * 86400000;
  const errTopics = new Map<TopicId, number>();
  for (const m of p.mistakes) {
    if (m.at < threeDaysAgo) continue;
    errTopics.set(m.topic, (errTopics.get(m.topic) ?? 0) + 1);
  }
  const yesterdayStart = startOfDay(ts) - 86400000;
  const yesterdaySessions = p.sessions.filter((s) => s.completedAt >= yesterdayStart && s.completedAt < startOfDay(ts));
  const yesterdayErrs = yesterdaySessions.filter((s) => !s.correct);
  const targetTopic: TopicId | null =
    (yesterdayErrs.length ? yesterdayErrs[0].topic : null) ??
    [...errTopics.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
    (p.sessions.length ? [...p.sessions].reverse().find((s) => !s.correct)?.topic ?? null : null);
  if (targetTopic) {
    const uk = nodesByTopic(targetTopic).filter((n) => !p.completedKnowledge.includes(n.id));
    reviewRefId = uk.length ? uk[0].id : nodesByTopic(targetTopic)[0]?.id ?? null;
    reviewTopic = targetTopic;
  } else {
    // 没有任何错题：复习最近学过主题的第一个知识节点
    const recentTopic = p.recentTopics[0];
    if (recentTopic) {
      reviewRefId = nodesByTopic(recentTopic)[0]?.id ?? null;
      reviewTopic = recentTopic;
    }
  }

  // Agent 建议（基于真实数据）
  let advice: string;
  const yErrCount = yesterdayErrs.length;
  if (yErrCount > 0 && targetTopic) {
    advice = `昨天你在「${tname(targetTopic)}」判断上出现了 ${yErrCount} 次错误，我们先解决这个问题。`;
  } else if (p.mistakes.length >= 2) {
    const top = [...new Map(p.mistakes.slice(-8).map((m) => [m.topic, m])).values()].sort((a, b) => b.at - a.at)[0];
    advice = top
      ? `你最近在「${tname(top.topic)}」上容易「${KIND_LABEL[top.kind]}」。今天用一个 3 分钟挑战把它练稳。`
      : '今天保持节奏，完成三个任务就是胜利。';
  } else if (p.sessions.length === 0) {
    advice = '今天不用学新知识，先完成第一个案件，让我认识你的思考方式。';
  } else if (p.consecutiveCorrect >= 3) {
    advice = `你已经连续答对 ${p.consecutiveCorrect} 次，状态不错。今天可以试试更有挑战的内容。`;
  } else {
    advice = '保持节奏：案件 → 观察 → 复习，三件事做完就是完整的一天。';
  }

  return { date: today, caseId, observationId, reviewRefId, reviewTopic, advice };
}

// ============================================================
// V2：今日任务三件套（核心挑战 / 错因训练 / 间隔复习）
// 错因 → 针对训练 → 间隔复习 → 迁移 → 掌握验证
// ============================================================

/** 找一个指定主题（或任意主题）下未完成的训练项 */
function firstUnfinished(
  p: UserProgress,
  type: SessionType,
  topic?: TopicId
): string | null {
  const completed =
    type === 'case'
      ? p.completedCases
      : type === 'observation'
        ? p.completedObservations
        : type === 'knowledge'
          ? p.completedKnowledge
          : type === 'formula'
            ? p.completedFormulas
            : type === 'classic'
              ? p.completedClassics
              : p.completedParadoxes;
  const all =
    type === 'case'
      ? cases.map((c) => c.id)
      : type === 'observation'
        ? observationTasks.map((o) => o.id)
        : type === 'knowledge'
          ? (topic ? nodesByTopic(topic) : Object.values(TOPIC_ORDER).flatMap((t) => nodesByTopic(t))).map((n) => n.id)
          : type === 'formula'
            ? formulas.map((f) => f.id)
            : type === 'classic'
              ? classics.map((c) => c.id)
              : paradoxChallenges.map((c) => c.id);
  return all.find((id) => !completed.includes(id)) ?? null;
}

/** 该主题下未验证过的迁移场景题（variation / transfer，优先陌生场景） */
function pendingSceneFor(p: UserProgress, topic: TopicId): { nodeId: string; sceneId: string; sceneKind: TransferSceneKind; title: string } | null {
  for (const node of nodesByTopic(topic)) {
    const scenes = findNode(node.id)?.transferScenes;
    if (!scenes || scenes.length === 0) continue;
    const nm = getNodeMastery(p, node.id);
    const pending = nextPendingScene(scenes, nm);
    if (pending && pending.kind !== 'familiar') {
      return { nodeId: node.id, sceneId: pending.id, sceneKind: pending.kind, title: node.title };
    }
  }
  return null;
}

/** 主导错因对应的主题（从真实错误记录里取最近一条） */
function topicOfCategory(p: UserProgress, category: ErrorCategory): TopicId {
  const pat = p.mistakePatterns.find((x) => x.category === category);
  if (pat) return pat.topic;
  const recent = [...p.mistakes].reverse().find((m) => {
    const cat =
      m.kind === 'single_symptom_jump'
        ? 'reasoning_error'
        : m.kind === 'overlook_clue'
          ? 'recognition_error'
          : m.kind === 'transfer_fail'
            ? 'transfer_error'
            : 'knowledge_gap';
    return cat === category;
  });
  return recent?.topic ?? TOPIC_ORDER[0];
}

/** 由主导错因生成针对训练任务（无可用训练返回 null） */
function buildMistakeTraining(
  p: UserProgress,
  category: ErrorCategory,
  count: number
): DailyTaskV2Item | null {
  const topic = topicOfCategory(p, category);
  const cause = rootCause(p, category);
  const base = {
    key: 'mistake' as const,
    type: 'knowledge' as SessionType,
    refId: '',
    topic,
    label: '错因训练',
    icon: CATEGORY_ICON[category] ?? '🧠',
    desc: '',
    reason: `最近 ${count} 次出现「${CATEGORY_LABEL[category]}」。${cause.advice}`,
  };

  switch (cause.trainingType) {
    case 'observation': {
      const id = firstUnfinished(p, 'observation', topic) ?? firstUnfinished(p, 'observation');
      if (!id) return null;
      return { ...base, type: 'observation', refId: id, desc: taskTitle('observation', id) };
    }
    case 'paradox': {
      const id = firstUnfinished(p, 'paradox', topic) ?? firstUnfinished(p, 'paradox');
      if (!id) return null;
      return { ...base, type: 'paradox', refId: id, desc: taskTitle('paradox', id) };
    }
    case 'case': {
      // 优先迁移场景题（transfer_error 的针对训练 = 换陌生场景验证）
      const scene = pendingSceneFor(p, topic);
      if (scene) {
        return {
          ...base,
          type: 'knowledge',
          refId: scene.nodeId,
          desc: `${scene.title} · 迁移验证`,
          sceneKind: scene.sceneKind,
          sceneId: scene.sceneId,
        };
      }
      const id = firstUnfinished(p, 'case', topic) ?? firstUnfinished(p, 'case');
      if (!id) return null;
      return { ...base, type: 'case', refId: id, desc: taskTitle('case', id) };
    }
    default: {
      // knowledge_gap / expression_error → 回到知识节点重做概念题
      const id = firstUnfinished(p, 'knowledge', topic) ?? firstUnfinished(p, 'knowledge');
      if (!id) return null;
      return { ...base, type: 'knowledge', refId: id, desc: taskTitle('knowledge', id), sceneKind: 'familiar' };
    }
  }
}

/** 生成今日任务三件套：① 核心挑战 ② 错因训练 ③ 间隔复习 */
export function dailyTasksV2(p: UserProgress): DailyPlanV2 {
  const today = dateKey(now());
  const tasks: DailyTaskV2Item[] = [];

  // ① 今日核心挑战（病例优先：冷启动/无错因时核心就是病例推理）
  const rec0 = recommend(p)[0] ?? null;
  let coreRec = rec0;
  if (rec0 && rec0.type !== 'case') {
    const uc = firstUnfinished(p, 'case');
    if (uc) {
      const topic = cases.find((c) => c.id === uc)?.topic ?? rec0.topic;
      coreRec = {
        id: `case-${uc}`,
        type: 'case',
        refId: uc,
        topic,
        reason: '用一个新病例把学过的线索组合起来推一次。',
        priority: 1,
        title: taskTitle('case', uc),
      };
    }
  }
  if (coreRec) {
    tasks.push({
      key: 'core',
      type: coreRec.type,
      refId: coreRec.refId,
      topic: coreRec.topic,
      label: '今日核心挑战',
      icon: '🎯',
      desc: coreRec.title,
      reason: coreRec.reason,
    });
  }

  // ② 错因训练（主导错因达到阈值 → 自动生成针对训练）
  const dom = dominantCategory(p);
  if (dom && dom.count >= 2) {
    const mt = buildMistakeTraining(p, dom.category, dom.count);
    if (mt) tasks.push(mt);
  }

  // ③ 间隔复习（到期且值得复习的节点，由 Review Engine 动态计算）
  const due = dueReviews(p);
  if (due.length) {
    const d = due[0];
    const node = findNode(d.nodeId);
    if (node) {
      tasks.push({
        key: 'review',
        type: 'knowledge',
        refId: node.id,
        topic: node.topic,
        label: '间隔复习',
        icon: '🔄',
        desc: node.title,
        reason: d.reason,
        sceneKind: 'familiar',
        temperature: d.temperature,
      });
    }
  }

  // 去重：核心挑战优先，其次错因训练，最后复习（同一节点只保留一项）
  const seen = new Set<string>();
  const deduped = tasks.filter((t) => {
    const k = `${t.type}:${t.refId}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  // Agent 解释"为什么是这三个"
  const advice = buildV2Advice(p, deduped);

  return { date: today, tasks: deduped.slice(0, 3), advice };
}

function buildV2Advice(p: UserProgress, tasks: DailyTaskV2Item[]): string {
  if (p.sessions.length === 0) {
    return '今天只做一件事：完成核心挑战，让我认识你的思考方式。还没有足够的错因数据，也没有到期的复习。';
  }
  const stage = currentStage(p);
  const realm = cultivationRealm(p);
  const stageHint = stage ? ` · 当前境界「${stage.title}」 · 修炼等级：${realm}` : ` · 修炼等级：${realm}`;

  const core = tasks.find((t) => t.key === 'core');
  const mistake = tasks.find((t) => t.key === 'mistake');
  const review = tasks.find((t) => t.key === 'review');
  const parts: string[] = [];
  if (core) parts.push(`① 核心挑战「${core.desc}」${core.reason.split('。')[0]}。`);
  if (mistake) parts.push(`② 错因训练：${mistake.reason}`);
  if (review) parts.push(`③ 间隔复习：${review.reason}`);
  if (!review) parts.push('今天没有到期的复习知识，适合学习一个新概念，而不是重复旧内容。');
  return parts.join(' ') + stageHint;
}

// ============================================================
// V1.5：今日修炼完成总结（真实数据，禁止虚构表扬）
// ============================================================
export function dailySummary(p: UserProgress): string {
  const ts = now();
  const todayStart = startOfDay(ts);
  const yesterdayStart = todayStart - 86400000;
  const todaySessions = p.sessions.filter((s) => s.completedAt >= todayStart);
  const yesterdaySessions = p.sessions.filter((s) => s.completedAt >= yesterdayStart && s.completedAt < todayStart);
  if (todaySessions.length === 0) return '今天还没有修炼记录。';
  const parts: string[] = [];

  const todayErrs = todaySessions.filter((s) => !s.correct).length;
  const yErr = yesterdaySessions.filter((s) => !s.correct).length;
  if (todayErrs === 0 && yesterdaySessions.length > 0 && yErr > 0) {
    parts.push('今天你比昨天更稳：昨天有错题，今天全部答对。');
  } else if (todayErrs === 0 && todaySessions.length >= 2) {
    parts.push(`今天 ${todaySessions.length} 次挑战全部答对，状态很好。`);
  } else if (todayErrs > 0) {
    parts.push(`今天有 ${todayErrs} 次答错，已被记录进薄弱点——这正是下次修炼的方向。`);
  } else {
    parts.push(`今天完成了 ${todaySessions.length} 次修炼。`);
  }

  // 观察先行：今天是否有 case 类型训练且整体正确
  const todayCases = todaySessions.filter((s) => s.type === 'case');
  if (todayCases.length && todayCases.every((s) => s.correct)) {
    parts.push('你在病例推理中保持观察与判断的完整流程。');
  }
  return parts.join('');
}

// ============================================================
// V1.5：学习画像（基于真实答题数据）
// ============================================================
export function profile(p: UserProgress): AgentProfile {
  const tag = learningTag(p);
  const strongTopics: string[] = [];
  const weakTopics: string[] = [];
  for (const topic of TOPIC_ORDER) {
    const r = rate(p, topic);
    const m = p.mastery[topic];
    if (m.total >= 2 && r >= 0.7) strongTopics.push(tname(topic));
    else if (m.total >= 1 && r < 0.6) weakTopics.push(tname(topic));
  }

  const kindCount = new Map<MistakeKind, number>();
  for (const m of p.mistakes) kindCount.set(m.kind, (kindCount.get(m.kind) ?? 0) + 1);
  const topKind = [...kindCount.entries()].sort((a, b) => b[1] - a[1])[0];

  const parts: string[] = [];
  if (p.mastery[TOPIC_ORDER[0]].total === 0 && p.sessions.length === 0) {
    parts.push('你还没有足够的学习记录。先完成一次「今日挑战」，我会基于你的真实答题数据生成画像。');
  } else {
    if (strongTopics.length) parts.push(`你目前对「${strongTopics.slice(0, 2).join('」「')}」掌握得不错。`);
    if (weakTopics.length) parts.push(`在「${weakTopics.slice(0, 3).join('」「')}」上还有提升空间。`);
    if (topKind) {
      const advice: Record<MistakeKind, string> = {
        single_symptom_jump: '你容易把单个症状直接等同于证候。建议接下来训练「多线索组合判断」——病例推理和反直觉挑战最适合你。',
        concept_confusion: '你容易混淆相似概念。建议回到对应主题做一轮知识挑战，把概念边界钉清楚。',
        overlook_clue: '你容易忽略关键线索。建议多做「观察训练」，练习先完整采集、再下判断。',
        missing_prereq: '你的前置基础还不稳。建议按知识地图顺序，先把地基补牢再往上走。',
        transfer_fail: '你熟悉场景能答对、换一个场景就失手——这是记忆和"理解"还有距离。建议做一次迁移挑战，验证你是真的理解了原理，而不是记住了答案。',
        premature_judgment: '你容易在信息没收集完时过早下结论。建议练习"先观察、再判断"——把线索看全，再提出假设。',
        weak_evidence: '你在证据不足时仍坚持原假设。建议练习"寻找支持证据"，让每个假设都有足够依据。',
        ignore_counterevidence: '你看到反证却不使用。建议练习"寻找反证"——主动问"什么信息可能推翻我的解释"。',
        failed_revision: '你得到新线索后没有修正原解释。建议练习"修正病机"，让新证据真正更新你的判断。',
      };
      parts.push(advice[topKind[0]]);
    }
    if (!weakTopics.length && !topKind && strongTopics.length) {
      parts.push('当前表现很稳！可以挑战更高难度的病例，或者去「方剂实验室」「经典解码」拓展新的思维维度。');
    }
  }

  // 优势 / 薄弱点 / 思维习惯（真实数据推导）
  const strengths: { label: string; icon: string }[] = [];
  const obsCount = p.completedObservations.length;
  if (obsCount >= 3) strengths.push({ label: '观察细节', icon: '👀' });
  const paradoxGood = p.sessions.filter((s) => s.type === 'paradox' && s.correct).length;
  if (paradoxGood >= 2) strengths.push({ label: '反直觉意识', icon: '🧠' });
  if (strongTopics.length >= 2) strengths.push({ label: '概念整合', icon: '🧩' });
  if (p.memory.strengths.length) {
    for (const s of p.memory.strengths.slice(0, 2)) {
      const icons: Record<string, string> = { observe: '👀', combine: '🧩', review: '📖', explore: '🧭' };
      strengths.push({ label: s.label, icon: icons[s.kind] ?? '✨' });
    }
  }

  const weaknesses: { label: string; icon: string }[] = [];
  for (const w of p.weakPoints.slice(0, 3)) {
    weaknesses.push({ label: `${tname(w.topic)}·${w.reason}`, icon: KIND_ICON[w.kind as MistakeKind] ?? '⚠️' });
  }
  if (!weaknesses.length && topKind) weaknesses.push({ label: KIND_LABEL[topKind[0]], icon: KIND_ICON[topKind[0]] });
  if (!weaknesses.length && weakTopics.length) weaknesses.push({ label: `${weakTopics[0]}待提升`, icon: '🌱' });
  if (!weaknesses.length && p.sessions.length === 0) weaknesses.push({ label: '记录待积累', icon: '🌱' });

  const thinkingHabits: { label: string; icon: string }[] = [];
  const jumpCount = p.mistakes.filter((m) => m.kind === 'single_symptom_jump').length;
  const overlookCount = p.mistakes.filter((m) => m.kind === 'overlook_clue').length;
  const transferFailCount = p.mistakes.filter((m) => m.kind === 'transfer_fail').length;
  if (jumpCount >= 2) thinkingHabits.push({ label: '容易快速形成初步判断', icon: '⚡' });
  if (overlookCount >= 2) thinkingHabits.push({ label: '偶尔略过关键线索', icon: '👁️' });
  if (transferFailCount >= 2) thinkingHabits.push({ label: '换场景时容易失手', icon: '🧭' });
  if (p.consecutiveCorrect >= 3) thinkingHabits.push({ label: '近期判断稳定', icon: '🎯' });
  const caseTotal = p.sessions.filter((s) => s.type === 'case').length;
  if (caseTotal >= 3) thinkingHabits.push({ label: '习惯用病例检验推理', icon: '🔍' });
  if (!thinkingHabits.length) thinkingHabits.push({ label: '行为数据积累中', icon: '🌱' });

  const recentFindings = p.mistakes.slice(-3).reverse().map((m) => ({
    label: `${tname(m.topic)} · ${KIND_LABEL[m.kind]}`,
    at: m.at,
  }));
  if (!recentFindings.length && p.sessions.length) {
    const last = [...p.sessions].reverse()[0];
    recentFindings.push({ label: `最近完成了${last.type === 'case' ? '病例' : last.type === 'observation' ? '观察训练' : last.type === 'paradox' ? '反直觉挑战' : '知识挑战'}`, at: last.completedAt });
  }

  return {
    text: parts.join(''),
    strongTopics,
    weakTopics,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 3),
    thinkingHabits: thinkingHabits.slice(0, 4),
    recentFindings,
    tag,
  };
}
