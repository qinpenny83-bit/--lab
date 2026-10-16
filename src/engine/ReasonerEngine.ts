/**
 * 🌿 杏林推理八步 · 推理训练器（V3.5 Phase 1.5）
 * 职责：把「杏林推理八步」从静态框架变成可运行的互动训练器。
 *   - 创建/推进一次八步推理会话（信息逐步展示，不一次性给全）
 *   - 每一步记录真实行为指标（cluesViewed / keyClueSelection / revisionAbibility …）
 *   - 把真实行为映射为错因（对接 MistakeEngine 的 9 类 MistakeKind）
 *   - 依据七个维度的掌握证据判定 mastered（对接 MasteryEngine 语义）
 * 原则：所有指标都来自真实操作，禁止虚构；不代替 LLM、不决定医疗边界。
 * 边界：本引擎为「中医理论学习」的思维训练工具，不构成任何诊断或治疗能力。
 */
import type {
  MasteryEvidence,
  MistakeKind,
  ReasoningChallenge,
  ReasoningMasteryGate,
  ReasoningStepState,
  ReasoningStepId,
  ReasoningMistake,
  ReasonerMetrics,
  ReasonerSession,
} from '../types/models';
import {
  DEFAULT_REASONING_GATE,
  REASONING_STEP_DEFS,
} from '../types/models';
import { now } from './clock';

// ------------------------------------------------------------------
// 1. 会话创建与步骤推进
// ------------------------------------------------------------------

/** 新建一次八步推理会话（当前进度归零，八步全部待处理） */
export function createReasonerSession(
  challenge: ReasoningChallenge,
  stageId = 'stage5'
): ReasonerSession {
  return {
    id: `rs-${challenge.id}-${now()}`,
    challengeId: challenge.id,
    stageId,
    currentNodeIds: [...challenge.nodeIds],
    currentStep: 0,
    steps: REASONING_STEP_DEFS.map(() => 'pending' as ReasoningStepState),
    metrics: emptyMetrics(),
    mistake: null,
    startedAt: now(),
    completedAt: null,
  };
}

/** 空指标（全部来自后续真实操作，不做任何预填） */
export function emptyMetrics(): ReasonerMetrics {
  return {
    cluesViewed: 0,
    cluesIgnored: 0,
    timeToFirstJudgment: 0,
    keyClueSelection: [],
    cluePrioritization: { key: [], minor: [], distractor: [] },
    hypothesisCount: 0,
    supportEvidence: [],
    counterEvidenceUsage: false,
    revisionCount: 0,
    revisionAbility: 0,
    reasoningQuality: 0,
    transferSuccess: false,
  };
}

/** 把某一步标记为 active，其余维持；返回下标（0-7） */
export function setActiveStep(session: ReasonerSession, stepId: ReasoningStepId): number {
  const idx = REASONING_STEP_DEFS.findIndex((s) => s.id === stepId);
  if (idx < 0) return session.currentStep;
  session.currentStep = idx;
  session.steps = session.steps.map((s, i) =>
    i === idx && s === 'pending' ? 'active' : s
  );
  return idx;
}

/** 完成某一步（已 skip 或 done 则跳过），完成后自动推进 */
export function completeStep(session: ReasonerSession, stepId: ReasoningStepId, skipped = false): void {
  const idx = REASONING_STEP_DEFS.findIndex((s) => s.id === stepId);
  if (idx < 0) return;
  session.steps[idx] = skipped ? 'skipped' : 'done';
  session.currentStep = Math.min(idx + 1, REASONING_STEP_DEFS.length - 1);
}

/** 会话结束（记录完成时间） */
export function finalizeSession(session: ReasonerSession): ReasonerSession {
  if (session.completedAt === null) session.completedAt = now();
  return session;
}

// ------------------------------------------------------------------
// 2. 行为记录（每一步都来自真实操作）
// ------------------------------------------------------------------

/** 记录用户查看了哪些线索（信息分步展示时调用） */
export function recordCluesViewed(
  session: ReasonerSession,
  viewedIds: string[],
  totalClueCount: number
): void {
  session.metrics.cluesViewed = viewedIds.length;
  session.metrics.cluesIgnored = Math.max(0, totalClueCount - viewedIds.length);
}

/** 记录用户的第一次判断时刻（用于衡量"是否过早下结论"） */
export function markFirstJudgment(session: ReasonerSession): void {
  if (session.metrics.timeToFirstJudgment === 0) {
    session.metrics.timeToFirstJudgment = Math.max(0, now() - session.startedAt);
  }
}

/** 记录用户标记出的"关键线索" */
export function recordKeyClueSelection(session: ReasonerSession, ids: string[]): void {
  session.metrics.keyClueSelection = [...ids];
  markFirstJudgment(session);
}

/** 记录用户对线索的主次排序（关键/次要/干扰） */
export function recordCluePrioritization(
  session: ReasonerSession,
  p: { key: string[]; minor: string[]; distractor: string[] }
): void {
  session.metrics.cluePrioritization = {
    key: [...p.key],
    minor: [...p.minor],
    distractor: [...p.distractor],
  };
}

/** 记录用户提出的假设数量（允许 A/B 多假设，不强迫唯一答案） */
export function recordHypotheses(session: ReasonerSession, count: number): void {
  session.metrics.hypothesisCount = Math.max(1, count);
  markFirstJudgment(session);
}

/** 记录用户选择的支持证据 */
export function recordSupportEvidence(session: ReasonerSession, clueIds: string[]): void {
  session.metrics.supportEvidence = [...clueIds];
}

/** 记录用户是否主动寻找反证（核心一步） */
export function recordCounterEvidence(session: ReasonerSession, used: boolean): void {
  session.metrics.counterEvidenceUsage = used;
}

/** 记录修正：新线索出现后是否修改原解释，以及修正质量（0-1） */
export function recordRevision(session: ReasonerSession, revised: boolean, quality: number): void {
  if (revised) session.metrics.revisionCount += 1;
  session.metrics.revisionAbility = Math.max(0, Math.min(1, quality));
}

/** 记录综合解释质量（0-1，用自己的话串起病机链） */
export function recordSynthesis(session: ReasonerSession, quality: number): void {
  session.metrics.reasoningQuality = Math.max(0, Math.min(1, quality));
}

/** 记录迁移验证结果 */
export function recordTransfer(session: ReasonerSession, passed: boolean): void {
  session.metrics.transferSuccess = passed;
}

// ------------------------------------------------------------------
// 3. 错因识别（真实行为 → MistakeKind → RootCause → TargetedPractice）
// ------------------------------------------------------------------

/** 一次八步会话的最终结果（供错因识别判断） */
export interface ReasoningOutcome {
  /** 用户最终选择的假设 id；未选则 null */
  finalHypothesisId: string | null;
  /** 用户是否真的使用了反证 */
  counterUsed: boolean;
  /** 出现新线索时是否修正了原解释 */
  revised: boolean;
  /** 迁移验证是否通过；未做迁移则 null */
  transferPassed: boolean | null;
}

/** 由真实行为识别本轮错因；无错则返回 null。规则按优先级从"最根本"到"最表层"排列。 */
export function detectReasoningMistake(
  session: ReasonerSession,
  challenge: ReasoningChallenge,
  outcome: ReasoningOutcome
): ReasoningMistake | null {
  const m = session.metrics;
  const total = challenge.clues.length;
  const keyIds = challenge.clues.filter((c) => c.grade === 'key').map((c) => c.id);
  const selectedKey = m.keyClueSelection.filter((id) => keyIds.includes(id));
  const choseBest = outcome.finalHypothesisId === challenge.bestHypothesisId;

  // —— 优先级 1：迁移失败（换场景失手，理解没到位） ——
  if (outcome.transferPassed === false) {
    return mistake(
      'transfer_fail',
      '熟悉案例能判断，换一个场景就推不动——说明案例的具体内容被记住了，但"病机"本身还没内化。',
      challenge,
      '回到「迁移」单元，用一个新的陌生场景重新走一遍八步，验证你不是在背案例。'
    );
  }

  // —— 优先级 2：忽略反证（核心缺陷，主动问"什么会推翻我"） ——
  if (outcome.counterUsed === false && challenge.counterEvidenceQuestion) {
    return mistake(
      'ignore_counterevidence',
      '你形成了自己的解释，但没有主动寻找"可能推翻它的证据"。可靠的判断需要被"反证"检验过。',
      challenge,
      '进入「反证挑战」，主动回答"什么新信息会让我改变判断"。'
    );
  }

  // —— 优先级 3：看够了信息，判断仍然错了 ——
  if (outcome.finalHypothesisId !== null && !choseBest) {
    const chosen = challenge.hypotheses.find((h) => h.id === outcome.finalHypothesisId);
    // 3a：把注意力押在一条干扰/次要线索上 → 单一症状下结论
    const relied = chosen?.supportingClueIds ?? [];
    const reliedOrEmpty = relied.length === 0 ? m.keyClueSelection : relied;
    const hasKeyBasis = reliedOrEmpty.some((id) => keyIds.includes(id));
    if (!hasKeyBasis) {
      return mistake(
        'single_symptom_jump',
        '你把结论建立在孤立线索上，忽略了关键线索组成的一整套证据——"一个表现"不等于"一个病机"。',
        challenge,
        '回到该案例，先把关键/次要/干扰分清楚，再用多个关键线索共同支撑结论。',
        chosen?.supportingClueIds[0]
      );
    }
    // 3b：有关键线索基础，但概念上把病机搞混了 → 概念混淆
    return mistake(
      'concept_confusion',
      '你抓住了关键线索，但对"它对应哪个病机"的判定有偏差——问题在概念边界，而不是线索采集。',
      challenge,
      '回到对应病机教材（Layer A），把"病因→变化→表现"的因果链补齐再回来。',
      undefined,
      outcome.finalHypothesisId
    );
  }

  // —— 优先级 4：没把线索看全 ——
  if (m.cluesViewed < total) {
    if (outcome.finalHypothesisId !== null) {
      return mistake(
        'premature_judgment',
        `你只看了 ${m.cluesViewed}/${total} 条线索就下了判断——信息没收集完，结论的可靠性就打折。`,
        challenge,
        '回到该案例，"先观察、再判断"，把全部线索看完后再提出假设。'
      );
    }
    return mistake(
      'overlook_clue',
      `还有 ${m.cluesIgnored} 条线索始终没被看到，其中可能包含推翻当前判断的关键信息。`,
      challenge,
      '做一次「观察训练」，练习先完整采集、再下结论。'
    );
  }

  // —— 优先级 5：看全了，但没认出关键线索 ——
  if (choseBest === false || selectedKey.length < keyIds.length) {
    return mistake(
      'overlook_clue',
      `关键线索 ${keyIds.length} 条，你只标出了 ${selectedKey.length} 条——"看到"了，但没有"识别"出它的分量。`,
      challenge,
      '用案例里的"线索分级"回看每条线索的 why，练习区分关键与干扰。'
    );
  }

  // —— 优先级 6：修正能力不足（有新线索却没改解释） ——
  if (outcome.revised === false && challenge.counterEvidenceQuestion) {
    return mistake(
      'failed_revision',
      '你面对新线索仍坚持原判断，没有让新证据更新你的解释——推理是动态修正，不是一次定死。',
      challenge,
      '回到「修正病机」一步，练习"新线索出现 → 修改假设"。'
    );
  }

  // —— 优先级 7：证据不足仍坚持假设 ——
  if (m.supportEvidence.length === 0 && m.hypothesisCount >= 1) {
    return mistake(
      'weak_evidence',
      '你提出了假设，但没有为它找支撑证据——判断需要"证据导向"，而不是凭感觉。',
      challenge,
      '回到「寻找支持证据」一步，给每个假设列全支持它的线索。'
    );
  }

  return null;
}

/** 拼接一条 ReasoningMistake（rootCause + correctReasoning + targetedPractice） */
function mistake(
  mistakeKind: MistakeKind,
  rootCause: string,
  challenge: ReasoningChallenge,
  targetedPractice?: string,
  missedClue?: string,
  wrongAssumption?: string
): ReasoningMistake {
  return {
    mistakeKind,
    rootCause,
    missedClue,
    wrongAssumption,
    correctReasoning: challenge.teaching.reasoning.join(' → '),
    targetedPractice:
      targetedPractice ?? `回到「${challenge.title}」案例，按杏林推理八步再走一遍，重点补上缺的那一步。`,
  };
}

// ------------------------------------------------------------------
// 4. 掌握证据（七维度；第五境不能"做完案例 = mastered"）
// ------------------------------------------------------------------

/** 掌握证据的外部输入（概念理解与复习保持来自其他引擎，不能由推理会话凭空推导） */
export interface MasteryEvidenceInput {
  sessions: ReasonerSession[];
  challenges: ReasoningChallenge[];
  /** 概念理解（0-1）：来自 MasteryEngine 对核心节点掌握率，非本引擎推导 */
  conceptUnderstanding?: number;
  /** 复习保持（0-1）：来自 ReviewEngine 的间隔复习保持率，非本引擎推导 */
  retention?: number;
  /** 覆盖的知识节点；缺省从会话汇总 */
  nodeIds?: string[];
}

/** 由一组真实会话计算七维掌握证据，并对照默认阈值判定 mastered */
export function computeMasteryEvidence(input: MasteryEvidenceInput): MasteryEvidence {
  const { sessions, challenges } = input;

  if (sessions.length === 0) {
    const evidence: MasteryEvidence = {
      nodeIds: input.nodeIds ?? [],
      conceptUnderstanding: input.conceptUnderstanding ?? 0,
      clueCoverage: 0,
      reasoningQuality: 0,
      counterEvidenceUsage: 0,
      revisionAbility: 0,
      transferSuccess: 0,
      retention: input.retention ?? 0,
      mastered: false,
      weakDimensions: [],
    };
    return evaluateMasteryGate(evidence);
  }

  const byId = new Map(challenges.map((c) => [c.id, c]));
  const clueCov: number[] = [];
  const quality: number[] = [];
  const counter: number[] = [];
  const revision: number[] = [];
  const transfer: number[] = [];

  for (const s of sessions) {
    const ch = byId.get(s.challengeId);
    const keyIds = ch?.clues.filter((c) => c.grade === 'key').map((c) => c.id) ?? [];
    const sel = new Set(s.metrics.keyClueSelection);
    const hit = keyIds.filter((id) => sel.has(id)).length;
    clueCov.push(keyIds.length > 0 ? hit / keyIds.length : 0);
    quality.push(s.metrics.reasoningQuality);
    counter.push(s.metrics.counterEvidenceUsage ? 1 : 0);
    revision.push(s.metrics.revisionAbility);
    transfer.push(s.metrics.transferSuccess ? 1 : 0);
  }

  const mean = (a: number[]) => a.reduce((x, y) => x + y, 0) / (a.length || 1);

  const evidence: MasteryEvidence = {
    nodeIds: input.nodeIds ?? [...new Set(sessions.flatMap((s) => s.currentNodeIds))],
    conceptUnderstanding: input.conceptUnderstanding ?? 0,
    clueCoverage: mean(clueCov),
    reasoningQuality: mean(quality),
    counterEvidenceUsage: mean(counter),
    revisionAbility: mean(revision),
    transferSuccess: mean(transfer),
    retention: input.retention ?? 0,
    mastered: false,
    weakDimensions: [],
  };

  return evaluateMasteryGate(evidence);
}

/** 七维度全部过阈值才 mastered；并给出未达标维度（用于"告诉用户哪里还不稳"） */
export function evaluateMasteryGate(
  evidence: MasteryEvidence,
  gate: ReasoningMasteryGate = DEFAULT_REASONING_GATE
): MasteryEvidence {
  const dims: [string, number, number][] = [
    ['conceptUnderstanding', evidence.conceptUnderstanding, gate.conceptUnderstanding],
    ['clueCoverage', evidence.clueCoverage, gate.clueCoverage],
    ['reasoningQuality', evidence.reasoningQuality, gate.reasoningQuality],
    ['counterEvidenceUsage', evidence.counterEvidenceUsage, gate.counterEvidenceUsage],
    ['revisionAbility', evidence.revisionAbility, gate.revisionAbility],
    ['transferSuccess', evidence.transferSuccess, gate.transferSuccess],
    ['retention', evidence.retention, gate.retention],
  ];
  const weakDimensions = dims.filter(([, v, t]) => v < t).map(([n]) => n);
  return { ...evidence, mastered: weakDimensions.length === 0, weakDimensions };
}