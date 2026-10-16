import type { GraduationCriterion } from '../../types/models';

export const graduationCriterionArray: GraduationCriterion[] = [
  {
    id: 'gc-stage1',
    stageId: 'stage1',
    description: '掌握中医基本概念、阴阳学说和五行学说，能够用自己的话解释整体观念、辨证论治、阴阳与五行的基本关系，并通过第一境毕业试炼',
    requiredKnowledgeIds: [
      'v3-s1-n1', 'v3-s1-n4', 'v3-s1-n5', 'v3-s1-n6', 'v3-s1-n7', 'v3-s1-n9', 'v3-s1-n10',
      'v3-s1-n11', 'v3-s1-n12', 'v3-s1-n13',
      'v3-s1-n14', 'v3-s1-n15', 'v3-s1-n16', 'v3-s1-n17',
    ],
    minimumMasteryRate: 0.7,
    requiredFamiliarSuccess: 3,
    requiredVariationSuccess: 2,
    requiredTransferSuccess: 1,
    maxRecentMistakeRate: 0.4,
    requiredReviewRetention: 0.6,
    finalTrialId: 'trial-stage1',
  },
  {
    id: 'gc-stage5',
    stageId: 'stage5',
    description: '掌握病机概念与气机失常、寒热转化、虚实夹杂、真假辨识、阴阳失调、气血津液、脏腑病机、病位病性病势等核心病机，能够完成"线索→假设→证据→反证→修正→综合解释"的完整推理，并通过第五境毕业试炼',
    requiredKnowledgeIds: [
      'v3-s5-n1', 'v3-s5-n2', 'v3-s5-n3',
      'v3-s5-n4', 'v3-s5-n5', 'v3-s5-n6',
      'v3-s5-n7', 'v3-s5-n8', 'v3-s5-n9',
      'v3-s5-n10', 'v3-s5-n11', 'v3-s5-n12',
      'v3-s5-n13', 'v3-s5-n14', 'v3-s5-n15', 'v3-s5-n16',
    ],
    minimumMasteryRate: 0.7,
    requiredFamiliarSuccess: 3,
    requiredVariationSuccess: 3,
    requiredTransferSuccess: 2,
    maxRecentMistakeRate: 0.35,
    requiredReviewRetention: 0.6,
    finalTrialId: 'trial-stage5',
  },
];