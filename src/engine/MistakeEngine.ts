/**
 * 🧩 Mistake Engine（V2）
 * 职责：把每次作答结果分类为五类错因，聚合成错误模式，并推断根因。
 * 原则：所有分类与归因必须来自真实行为记录，不虚构。
 */
import type {
  ErrorCategory,
  LearningSession,
  MistakeKind,
  MistakePattern,
  MistakeRecord,
  RootCause,
  SessionType,
  TopicId,
  UserProgress,
} from '../types/models';
import { CATEGORY_LABEL, MISTAKE_CATEGORY } from '../types/models';
import { now } from './clock';

/** 将具体错误模式归类为五类错因之一 */
export function classifyCategory(kind: MistakeKind | undefined): ErrorCategory | null {
  if (!kind) return null;
  return MISTAKE_CATEGORY[kind];
}

/**
 * 综合分类：
 * - 有 mistakeKind → 按映射归类
 * - transfer 场景（variation/transfer）失败但 familiar 通过 → transfer_error
 */
export function classifyMistake(
  correct: boolean,
  kind: MistakeKind | undefined,
  context: { sceneKind?: 'familiar' | 'variation' | 'transfer' } = {}
): ErrorCategory | null {
  if (correct) return null;
  const mapped = classifyCategory(kind);
  if (mapped) return mapped;
  if (context.sceneKind && context.sceneKind !== 'familiar') return 'transfer_error';
  return 'knowledge_gap';
}

const CATEGORY_OF: Record<ErrorCategory, MistakeKind[]> = {
  knowledge_gap: ['concept_confusion', 'missing_prereq'],
  recognition_error: ['overlook_clue'],
  // V3.5 Phase 1.5：第五境病机推理错因都归入"推理错误"，与 MISTAKE_CATEGORY 对齐
  reasoning_error: ['single_symptom_jump', 'premature_judgment', 'weak_evidence', 'ignore_counterevidence', 'failed_revision'],
  transfer_error: ['transfer_fail'],
  expression_error: [],
};

/** 由错因类别得到对应的具体错误模式（用于推荐） */
export function kindForCategory(category: ErrorCategory): MistakeKind | null {
  return CATEGORY_OF[category][0] ?? null;
}

/**
 * 更新错误模式聚合表。
 * 每次出现错误时调用：更新 count / recentCount / recovered / topic。
 */
export function updateMistakePatterns(
  patterns: MistakePattern[],
  kind: MistakeKind,
  topic: TopicId
): MistakePattern[] {
  const category = classifyCategory(kind) ?? 'knowledge_gap';
  const t = now();
  const existing = patterns.find((p) => p.kind === kind);
  if (existing) {
    existing.category = category;
    existing.count += 1;
    existing.recentCount += 1;
    existing.lastAt = t;
    existing.topic = topic;
    // 再次出现同类错误 → 标记为未恢复
    existing.recovered = false;
  } else {
    patterns.push({
      category,
      kind,
      topic,
      count: 1,
      recentCount: 1,
      firstAt: t,
      lastAt: t,
      recovered: false,
    });
  }
  return [...patterns].sort((a, b) => b.count - a.count).slice(0, 12);
}

/**
 * 每次答对同类训练时调用：降低该模式的 recentCount，连续答对则标记 recovered。
 */
export function markPatternRecovered(patterns: MistakePattern[], kind: MistakeKind) {
  const p = patterns.find((x) => x.kind === kind);
  if (p) {
    p.recovered = true;
    p.recentCount = Math.max(0, p.recentCount - 1);
  }
}

/** 最近 10 次会话中各类错因的出现次数（用于识别当前主导错因） */
export function recentCategoryCounts(p: UserProgress): Map<ErrorCategory, number> {
  const recent = p.sessions.slice(-10);
  const map = new Map<ErrorCategory, number>();
  for (const s of recent) {
    if (s.correct) continue;
    const cat = classifyCategory(s.mistakeKind);
    if (!cat) continue;
    map.set(cat, (map.get(cat) ?? 0) + 1);
  }
  return map;
}

/** 主导错因（最近 10 次中占比最高的类别） */
export function dominantCategory(p: UserProgress): { category: ErrorCategory; count: number } | null {
  const map = recentCategoryCounts(p);
  const top = [...map.entries()].sort((a, b) => b[1] - a[1])[0];
  if (!top || top[1] < 2) return null;
  return { category: top[0], count: top[1] };
}

/** 推断根因（含行为证据与训练建议） */
export function rootCause(p: UserProgress, category: ErrorCategory): RootCause {
  const evidenceMistakes: MistakeRecord[] = p.mistakes.filter(
    (m) => classifyCategory(m.kind) === category
  );
  const recent = evidenceMistakes.slice(-3).reverse();
  const evidence =
    recent.length > 0
      ? `最近 ${recent.length} 次同类错误：${recent.map((m) => `「${m.question || '答题'}」`).join('、')}`
      : '同类错误记录还很少，再积累几次才能确定规律。';

  switch (category) {
    case 'knowledge_gap':
      return {
        category,
        summary: '不是"想错了"，是"知识本身还没有建立"。',
        evidence,
        advice: '回到对应主题做一轮概念挑战，把定义和边界钉清楚，再进入应用。',
        trainingType: 'knowledge',
      };
    case 'recognition_error':
      return {
        category,
        summary: '知识在，但线索摆在面前时没有被"看到"。',
        evidence,
        advice: '做 3 分钟观察训练，练习先完整采集线索、再进入判断。',
        trainingType: 'observation',
      };
    case 'reasoning_error':
      return {
        category,
        summary: '不是知识问题，而是下结论太早——线索还没收齐就开始判断。',
        evidence,
        advice: '下次形成判断前，先主动寻找第二条独立线索，或用反直觉挑战练"先质疑再下结论"。',
        trainingType: 'paradox',
      };
    case 'transfer_error':
      return {
        category,
        summary: '熟悉场景能答对，换一个场景就失手——记忆和"理解"还有距离。',
        evidence,
        advice: '做一次迁移挑战：换一个陌生背景，验证你是不是真的理解了原理，而不是记住了答案。',
        trainingType: 'case',
      };
    case 'expression_error':
      return {
        category,
        summary: '能判断，但说不清为什么——理解还没有形成可解释的结构。',
        evidence,
        advice: '用「为什么？」交互把概念讲给自己听：讲不清楚的地方，就是需要再练的地方。',
        trainingType: 'knowledge',
      };
  }
}

/** 由 LearningSession 生成错误记录的错因类别（兼容历史数据） */
export function categoryOfSession(s: LearningSession): ErrorCategory | null {
  return classifyCategory(s.mistakeKind);
}

export function describeCategory(category: ErrorCategory): string {
  return CATEGORY_LABEL[category];
}

/** 默认空统计 */
export function emptyStats() {
  return {
    averageQuestionsBeforeJudgment: 0,
    prematureJudgmentRate: 0,
    clueCoverage: 0,
    transferSuccessRate: 0,
    reviewRetention: 0,
    mistakeRecoveryRate: 0,
  };
}

export type { SessionType as _SessionType, TopicId as _TopicId };
