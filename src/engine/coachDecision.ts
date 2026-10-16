// ============================================================
// V3.5 Phase 1.5：Agent 教练 —— 可解释决策
// 职责：根据用户真实学习行为，给出「当前在学什么」+「为什么让ta这么做」+「安排了什么训练」。
// 原则：所有决策必须来自真实行为记录（错因、掌握状态、最近会话），可追溯到证据，不虚构。
// 边界：只做学习路径决策，不决定安全边界、医疗建议或掌握状态。
// ============================================================

import type { CoachDecision, SessionType, UserProgress } from '../types/models';
import { dominantCategory, rootCause } from './MistakeEngine';
import { recommend } from './ReviewCoach';
import { stageById } from '../data/stages';
import { criterionByStage, reasoningChallengesByStage } from '../data/curriculum';

/** 把错因类别映射为教学动作 */
function actionFor(category: string): CoachDecision['action'] {
  switch (category) {
    case 'knowledge_gap':
      return 'back_to_prerequisite';
    case 'recognition_error':
      return 'probe';
    case 'reasoning_error':
      return 'compare';
    case 'transfer_error':
      return 'transfer';
    case 'expression_error':
      return 'hint';
    default:
      return 'probe';
  }
}

const ACTION_LABEL: Record<CoachDecision['action'], string> = {
  probe: '继续追问',
  hint: '给一个小提示',
  switch_example: '换一个例子',
  back_to_prerequisite: '回退前置知识',
  compare: '给对比案例',
  transfer: '给迁移案例',
  review: '安排复习',
  confirm_mastery: '判断是否掌握',
};

/**
 * 生成可解释的教练决策。
 * 优先看「当前境界主线」，再看「最近的真实错因」，形成一条可读的决策链。
 */
export function coachDecision(progress: UserProgress): CoachDecision {
  const stage = stageById(progress.currentStageId ?? 'stage1');
  const stageTitle = stage?.title ?? '初识中医';

  // 1) 当前境界未完成的推荐（主线优先）
  const recs = recommend(progress);
  const top = recs[0] ?? null;

  // 2) 最近真实错因
  const dom = dominantCategory(progress);

  // 2a) 有明确主导错因 → 依据错因做教学动作
  if (dom) {
    const cause = rootCause(progress, dom.category);
    const trainingType = cause.trainingType as SessionType;
    return {
      stageTitle,
      observation: `最近 10 次学习中，「${dom.category}」类错误出现了 ${dom.count} 次。`,
      action: actionFor(dom.category),
      actionLabel: ACTION_LABEL[actionFor(dom.category)],
      target: top
        ? { type: top.type, refId: top.refId, label: top.title }
        : { type: trainingType, refId: '', label: '' },
      reason: `${cause.summary} ${cause.evidence} 所以：${cause.advice}`,
    };
  }

  // 2b) 没有明显错因 → 看是否该进入第五境病机推理（若处于第五境且已有推理挑战）
  if (progress.currentStageId === 'stage5') {
    const challenges = reasoningChallengesByStage('stage5');
    const pending = challenges.find((c) => c.id === 'rc-stage5-lv1-qi-stagnation') ?? challenges[0];
    if (pending) {
      return {
        stageTitle,
        observation: '近期没有明显反复的错误，说明基础盘相对稳定。',
        action: 'switch_example',
        actionLabel: ACTION_LABEL['switch_example'],
        target: { type: 'knowledge', refId: pending.nodeIds[0], label: pending.title },
        reason: `你在第五境修炼的是「病机推理」：先从一个单一病机的案例（${pending.title}）入手，练习"线索→假设→证据→反证"的完整链条。`,
      };
    }
  }

  // 3) 兜底：跟主线走
  const criterion = criterionByStage(progress.currentStageId ?? 'stage1');
  return {
    stageTitle,
    observation: '还没有足够的错误记录来定位薄弱环节。',
    action: top ? 'hint' : 'probe',
    actionLabel: ACTION_LABEL[top ? 'hint' : 'probe'],
    target: top ? { type: top.type, refId: top.refId, label: top.title } : null,
    reason: top
      ? `先跟着「${stageTitle}」的主线推进：${top.reason}`
      : `${criterion?.description ?? '继续当前境界的学习'}，完成后再判断掌握情况。`,
  };
}

export { ACTION_LABEL };