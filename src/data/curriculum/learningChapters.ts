// ============================================================
// V3.5：课程章节数据 — Stage 1（初识中医）与 Stage 5（病机与辨证推理）
//
// ID 说明（V3.5 Phase 1.5 统一命名规范）：
//   历史章节 id 沿用旧式 'ch-stage1-modN-chN' 作兼容别名（学习单元据此引用，不可改动），
//   但其 moduleId 字段统一对齐真实模块 id：'s1-m1' ~ 's8-m8'。
//   新增章节（第五境教材层）一律采用新式 'ch-{stage}-{module}-c{序号}'。
//   localStorage 仅以 nodeId 为 key 存进度，故重命名不影响 V2/V3 数据兼容。
// ============================================================

import type { LearningChapter } from '../../types/models';

export const learningChapterArray: LearningChapter[] = [
  // ==========================================================
  // Stage 1：初识中医
  // ==========================================================
  {
    id: 'ch-stage1-mod1-ch1',
    stageId: 'stage1',
    moduleId: 's1-m1',
    title: '中医是什么',
    description:
      '了解中医到底研究什么、为什么强调整体、如何看待人体的功能与关系。这是整个学习道路的起点与"中医思维"的第一课。',
    nodeIds: ['v3-s1-n1', 'v3-s1-n2', 'v3-s1-n3'],
    estimatedMinutes: 20,
    order: 1,
  },
  {
    id: 'ch-stage1-mod1-ch2',
    stageId: 'stage1',
    moduleId: 's1-m2',
    title: '整体观念与辨证论治',
    description:
      '深入学习中医最核心的两大思维工具：把人看作有机整体（整体观念）、根据证候线索做出判断（辨证论治）。',
    nodeIds: ['v3-s1-n4', 'v3-s1-n5'],
    estimatedMinutes: 18,
    order: 2,
  },
  {
    id: 'ch-stage1-mod1-ch3',
    stageId: 'stage1',
    moduleId: 's1-m2',
    title: '证、症、病的区别',
    description:
      '辨析中医中"证"、"症"、"病"三个核心概念的区别，打破"一个症状对应一个证"的直觉，建立辨证思维的起点。',
    nodeIds: ['v3-s1-n6'],
    estimatedMinutes: 12,
    order: 3,
  },
  {
    id: 'ch-stage1-mod2-ch1',
    stageId: 'stage1',
    moduleId: 's1-m3',
    title: '阴阳是什么',
    description:
      '认识阴阳学说的基本概念和属性分类，理解阴阳作为中医认识世界的基本框架。',
    nodeIds: ['v3-s1-n7', 'v3-s1-n8'],
    estimatedMinutes: 12,
    order: 4,
  },
  {
    id: 'ch-stage1-mod2-ch2',
    stageId: 'stage1',
    moduleId: 's1-m3',
    title: '阴阳的关系与应用',
    description:
      '掌握阴阳之间的相互关系（对立、互根、消长、转化），了解阴阳学说在中医中的实际应用。',
    nodeIds: ['v3-s1-n9', 'v3-s1-n10'],
    estimatedMinutes: 15,
    order: 5,
  },
  {
    id: 'ch-stage1-mod4-ch1',
    stageId: 'stage1',
    moduleId: 's1-m4',
    title: '五行入门',
    description:
      '认识木火土金水五类属性与生克关系，学会用"关系"的眼光理解脏腑之间、身心之间的相互影响。',
    nodeIds: ['v3-s1-n11', 'v3-s1-n12', 'v3-s1-n13'],
    estimatedMinutes: 15,
    order: 6,
  },
  {
    id: 'ch-stage1-mod5-ch1',
    stageId: 'stage1',
    moduleId: 's1-m5',
    title: '身体里有什么',
    description:
      '认识中医眼中的身体地图：五脏六腑（藏象）是通过外在表现来理解的功能系统，气血津液是身体里流动、互化的基本物质。',
    nodeIds: ['v3-s1-n14', 'v3-s1-n15'],
    estimatedMinutes: 15,
    order: 7,
  },
  {
    id: 'ch-stage1-mod5-ch2',
    stageId: 'stage1',
    moduleId: 's1-m5',
    title: '为什么会生病',
    description:
      '建立"病因→病机"的分析主线：病因（病从哪来）分外感、内伤、不内外因三大类；病机（起病后怎么变）以正邪、阴阳、气机为主线。',
    nodeIds: ['v3-s1-n16', 'v3-s1-n17'],
    estimatedMinutes: 15,
    order: 8,
  },

  // ==========================================================
  // Stage 5：病机与辨证推理 —— Layer A 教材层
  // 病机学习地图（10 步）：
  //   ① 病机是什么 → ② 病机基本结构 → ③ 邪正盛衰 → ④ 阴阳失调 → ⑤ 气机失常
  //   → ⑥ 气血津液 → ⑦ 脏腑病机 → ⑧ 病位/病性/病势 → ⑨ 病机转化 → ⑩ 多病机综合
  // ==========================================================
  {
    id: 'ch-s5-m1-c1',
    stageId: 'stage5',
    moduleId: 's5-m1',
    title: '病机是什么（地图第①—③步）',
    description:
      '回答"病机到底是什么""为什么只看症状不够"，建立"病因→人体变化→病机→表现→证候"的分析主线，并理解正邪盛衰这一贯穿始终的核心矛盾。',
    nodeIds: ['v3-s5-n1', 'v3-s5-n2', 'v3-s5-n3'],
    estimatedMinutes: 20,
    order: 1,
  },
  {
    id: 'ch-s5-m5-c1',
    stageId: 'stage5',
    moduleId: 's5-m5',
    title: '核心病机（地图第④⑥⑦⑧步）',
    description:
      '系统学习四类基本病机的辨析：阴阳失调、气血津液病机、脏腑病机，以及病位/病性/病势三个定位维度。每一类都要求"先看生理、再看失常"。',
    nodeIds: ['v3-s5-n13', 'v3-s5-n14', 'v3-s5-n15', 'v3-s5-n16'],
    estimatedMinutes: 25,
    order: 2,
  },
  {
    id: 'ch-s5-m2-c1',
    stageId: 'stage5',
    moduleId: 's5-m2',
    title: '气机失常（地图第⑤步）',
    description:
      '气机是人体的动力系统。学习升降出入的基本运动形式，以及气机从"郁"到"逆"到"陷"的失常类型——这是病机分析里最常用的一把尺子。',
    nodeIds: ['v3-s5-n4', 'v3-s5-n5', 'v3-s5-n6'],
    estimatedMinutes: 18,
    order: 3,
  },
  {
    id: 'ch-s5-m3-c1',
    stageId: 'stage5',
    moduleId: 's5-m3',
    title: '病机的变化（地图第⑨⑩步）',
    description:
      '病机不是静止标签而是动态过程。学习病机转化（寒热、虚实的变化），以及多个病机之间如何相互影响、真假辨识。',
    nodeIds: ['v3-s5-n7', 'v3-s5-n8', 'v3-s5-n9'],
    estimatedMinutes: 20,
    order: 4,
  },
  {
    id: 'ch-s5-m4-c1',
    stageId: 'stage5',
    moduleId: 's5-m4',
    title: '辨证推理方法（把地图用于推理）',
    description:
      '学习"杏林推理八步"：观察→找线索→追问→组织信息→提出假设→找支持证据→找反证→调整判断。这是把前面所有病机知识真正"用起来"的核心训练。',
    nodeIds: ['v3-s5-n10', 'v3-s5-n11', 'v3-s5-n12'],
    estimatedMinutes: 20,
    order: 5,
  },
];