// ============================================================
// V3.5：课程模块统一出口
// ============================================================

export { canonicalKnowledgeArray } from './canonicalKnowledge';
export { learningChapterArray } from './learningChapters';
export { learningUnitArray } from './learningUnits';
export { stage5LearningUnitArray } from './stage5LearningUnits';
export { knowledgeBridgeArray } from './knowledgeBridges';
export { conceptComparisonArray } from './conceptComparisons';
export { graduationCriterionArray } from './graduationCriteria';
export { learningCaseArray } from './learningCases';
export { reasoningChallengeArray } from './reasoningChallenges';
export { graduationTrialArray } from './graduationTrials';

// 辅助函数
import { canonicalKnowledgeArray } from './canonicalKnowledge';
import { learningChapterArray } from './learningChapters';
import { learningUnitArray } from './learningUnits';
import { knowledgeBridgeArray } from './knowledgeBridges';
import { conceptComparisonArray } from './conceptComparisons';
import { graduationCriterionArray } from './graduationCriteria';
import { learningCaseArray } from './learningCases';
import { reasoningChallengeArray } from './reasoningChallenges';
import { graduationTrialArray } from './graduationTrials';
import { stage5LearningUnitArray } from './stage5LearningUnits';

/** 全部学习单元（第一境 + 第五境课程链），供课程播放器与查询统一使用 */
export const allLearningUnitArray = [...learningUnitArray, ...stage5LearningUnitArray];

/** 通过节点 ID 查找规范化知识 */
export function canonicalByNodeId(nodeId: string) {
  return canonicalKnowledgeArray.find((ck) => ck.v3NodeIds.includes(nodeId) || ck.v2NodeIds.includes(nodeId));
}

/** 通过境界 ID 查找章节 */
export function chaptersByStage(stageId: string) {
  return learningChapterArray.filter((ch) => ch.stageId === stageId).sort((a, b) => a.order - b.order);
}

/** 通过章节 ID 查找学习单元（含第五境课程链；源数据已按教学顺序排列） */
export function unitsByChapter(chapterId: string) {
  return allLearningUnitArray.filter((u) => u.chapterId === chapterId);
}

/** 通过节点 ID 查找学习单元（含第五境课程链） */
export function unitsByNode(nodeId: string) {
  return allLearningUnitArray.filter((u) => u.nodeId === nodeId);
}

/** 通过 id 查找学习单元 */
export function learningUnitById(unitId: string) {
  return allLearningUnitArray.find((u) => u.id === unitId);
}

/** 通过境界 ID 查找毕业条件 */
export function criterionByStage(stageId: string) {
  return graduationCriterionArray.find((gc) => gc.stageId === stageId);
}

/** 通过境界 ID 查找理论学习案例（第一境） */
export function learningCasesByStage(stageId: string) {
  return learningCaseArray.filter((lc) => lc.stageId === stageId);
}

/** 通过境界 ID 查找病机推理挑战（第五境） */
export function reasoningChallengesByStage(stageId: string) {
  return reasoningChallengeArray.filter((rc) => rc.stageId === stageId);
}

/** 通过境界 ID 查找毕业试炼 */
export function trialByStage(stageId: string) {
  return graduationTrialArray.find((t) => t.stageId === stageId);
}

/** 通过 id 查找病机推理挑战 */
export function reasoningChallengeById(id: string) {
  return reasoningChallengeArray.find((rc) => rc.id === id);
}

/** 查找两个节点之间的知识桥梁 */
export function bridgeBetween(fromNodeId: string, toNodeId: string) {
  return knowledgeBridgeArray.find((b) => b.fromNodeId === fromNodeId && b.toNodeId === toNodeId);
}

/** 查找概念对比 */
export function comparisonByNodeIds(nodeIds: string[]) {
  return conceptComparisonArray.filter((cc) =>
    cc.relatedNodeIds.some((id) => nodeIds.includes(id))
  );
}

/** 规范化知识总数 */
export const TOTAL_CANONICAL = canonicalKnowledgeArray.length;
/** 章节总数 */
export const TOTAL_CHAPTERS = learningChapterArray.length;
/** 学习单元总数（含第五境课程链） */
export const TOTAL_UNITS = allLearningUnitArray.length;
/** 知识桥梁总数 */
export const TOTAL_BRIDGES = knowledgeBridgeArray.length;
/** 概念对比总数 */
export const TOTAL_COMPARISONS = conceptComparisonArray.length;
/** 毕业条件总数 */
export const TOTAL_CRITERIA = graduationCriterionArray.length;
/** 理论学习案例总数（第一境） */
export const TOTAL_LEARNING_CASES = learningCaseArray.length;
/** 病机推理挑战总数（第五境） */
export const TOTAL_REASONING_CHALLENGES = reasoningChallengeArray.length;
/** 毕业试炼总数 */
export const TOTAL_TRIALS = graduationTrialArray.length;