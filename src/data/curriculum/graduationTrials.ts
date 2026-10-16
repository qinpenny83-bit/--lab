// ============================================================
// V3.5 Phase 1.5：毕业试炼定义（可计算通过条件）
// 第一境试炼验证「框架是否建立」，第五境试炼验证「推理是否经历过完整训练」。
// 通过条件全部可计算；未通过时不扣分羞辱，只指出哪个环节还不稳。
// 边界：均为理论学习试炼，不构成任何诊断或治疗。
// ============================================================

import type { GraduationTrial } from '../../types/models';

export const graduationTrialArray: GraduationTrial[] = [
  // ------------------------------------------------------------------
  // 第一境毕业试炼
  // ------------------------------------------------------------------
  {
    id: 'trial-stage1',
    stageId: 'stage1',
    title: '第一境毕业试炼',
    description:
      '随机抽取基础概念、概念对比、综合理论场景与迁移问题，要求你用自己的语言解释，而不是只做选择题。',
    sample: { concepts: 3, comparisons: 2, scenarios: 1, transfers: 1 },
    conceptNodeIds: ['v3-s1-n4', 'v3-s1-n5', 'v3-s1-n6', 'v3-s1-n7', 'v3-s1-n11'],
    comparisonIds: [
      'cc-yin-yang-five-elements',
      'cc-symptom-syndrome',
      'cc-disease-syndrome',
      'cc-whole-vs-part',
      'cc-syndrome-vs-symptom-match',
    ],
    scenarioNodeIds: ['v3-s1-n4', 'v3-s1-n5', 'v3-s1-n6'],
    transferNodeIds: ['v3-s1-n4', 'v3-s1-n6', 'v3-s1-n13'],
    thresholds: {
      conceptUnderstanding: 0.7,
      conceptDistinction: 0.7,
      reasoning: 0.6,
      transfer: 0.6,
    },
    feedbackHints: [
      { dimension: 'concept', hint: '基础概念还不太稳：回到"一句话理解"和"为什么"两个环节，用自己的话把它讲给别人听。' },
      { dimension: 'comparison', hint: '概念之间还容易混：重点复习"概念对比"里的"最容易错在哪"，再各举一个例子。' },
      { dimension: 'reasoning', hint: '综合场景还推不顺：回到"现象观察→自己判断→解释理由"的案例，多问一次"为什么"。' },
      { dimension: 'transfer', hint: '换场景就吃力：多做几次"迁移"单元，验证你是不是真的理解、而不是记住答案。' },
    ],
  },

  // ------------------------------------------------------------------
  // 第五境毕业试炼
  // ------------------------------------------------------------------
  {
    id: 'trial-stage5',
    stageId: 'stage5',
    title: '病机推理毕业试炼',
    description:
      '随机给出理论学习场景，要求你完成：找线索 → 主次排序 → 提出假设 → 解释病机 → 找支持证据 → 找反证 → 修正 → 最终解释。',
    sample: { concepts: 2, comparisons: 1, scenarios: 2, transfers: 1 },
    conceptNodeIds: ['v3-s5-n2', 'v3-s5-n4', 'v3-s5-n6', 'v3-s5-n7', 'v3-s5-n9'],
    comparisonIds: ['cc-cold-heat', 'cc-deficiency-excess'],
    scenarioNodeIds: ['v3-s5-n6', 'v3-s5-n7', 'v3-s5-n8', 'v3-s5-n9', 'v3-s5-n11', 'v3-s5-n12'],
    transferNodeIds: ['v3-s5-n6', 'v3-s5-n7', 'v3-s5-n8', 'v3-s5-n12'],
    thresholds: {
      conceptUnderstanding: 0.7,
      conceptDistinction: 0.6,
      reasoning: 0.7,
      transfer: 0.7,
    },
    feedbackHints: [
      { dimension: 'concept', hint: '病机概念还不熟：回到"因果链教学"的单元，把每个病机的"原因→变化→表现"链补完整。' },
      { dimension: 'comparison', hint: '相似病机容易混淆：重点区分"气滞/气逆/气虚""寒/热""虚/实"这几组对比。' },
      { dimension: 'reasoning', hint: '推理链还缺环节：重点练"找证据"与"找反证"，看看漏在哪一步。' },
      { dimension: 'transfer', hint: '换场景就推不动：多做反证挑战与迁移变式，确认你不是在背案例。' },
    ],
  },
];