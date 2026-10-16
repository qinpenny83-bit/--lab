// ============================================================
// 🌿 中医修炼馆 · 黄金知识关卡 —— ☯️ 阴阳探索
// 说明：本文件只提供「阴阳」这一关的展示层局部数据。
//       所有底层引擎（Reasoner / Mistake / Mastery / Review）与
//       V2/V3 核心数据都不在此改动；经典原文引用既有已验证来源。
// 边界：纯理论学习 / 思维训练素材，不构成任何医疗诊断或调理建议。
// ============================================================

// ---------- 关卡节点类型 ----------
export type GoldenStepKind =
  | 'discover'   // 先发现：生活观察
  | 'read'       // 定义理解
  | 'why'        // 为什么
  | 'paradox'    // 反直觉
  | 'practice'   // 案例侦探（三层练习）
  | 'judge'      // 你来判断（第二反直觉）
  | 'transfer'   // 迁移
  | 'mastery';   // 本关掌握

export interface GoldenLevelNode {
  id: string;        // 步骤 id（golden-yy-XX，写入 completedUnits 持久化）
  order: number;
  title: string;
  oneLine: string;
  icon: string;
  minutes: number;   // 预计耗时（分钟）
  ability: string;   // 获得的能力（一句可读）
  kind: GoldenStepKind;
}

export interface GoldenChoiceOption {
  id: string;
  text: string;
  /** 参考选择（本关学习范围内更符合关系思维的选项） */
  isReference?: boolean;
}

export interface GoldenReferenceJudgment {
  /** 参考判断结论 */
  conclusion: string;
  /** 关键依据（2-3 条真实依据） */
  keyBasis: readonly string[];
  /** ⭐ 最关键线索 */
  keyClue: string;
  /** 用户判断与参考判断之间的差异（不羞辱、只说差异） */
  deviation: string;
}

export interface GoldenCaseClue {
  id: string;
  text: string;
}

export interface GoldenCaseDetective {
  scenario: string;
  followIntro: string;
  clues: GoldenCaseClue[];
  keyClueId: string;
  noticePrompt: string;
  keyPrompt: string;
  reasonPrompt: string;
  reasonOptions: GoldenChoiceOption[];
  bestReasonId: string;
  reference: GoldenReferenceJudgment;
  takeaway: string;
  safetyNote: string;
}

// ---------- ① 我在哪里 / ② 我要学什么 ----------
export const GOLDEN_LEVEL_INTRO = {
  realm: '修炼之路 · 第一境 · 阴阳',
  topic: '这一关：看懂「阴阳」',
  // ③ 学完我会什么（能力目标，非抽象知识目标）
  abilities: [
    '看懂中医为什么会比较「寒与热」',
    '理解「阴阳」到底在比较什么',
    '发现一个现象为什么不能只看一个症状',
    '用「关系」而不是单一标签去观察现象',
  ],
  // ④ 为什么值得学（本关核心悬念）
  hook: '同样是「怕冷」，为什么中医不会只凭这一点就下判断？',
} as const;

// ---------- 探索路线（8 个节点，视觉地图） ----------
export const GOLDEN_YINYANG_NODES: GoldenLevelNode[] = [
  {
    id: 'golden-yy-01',
    order: 1,
    title: '先发现',
    oneLine: '从两个人对同一房间的不同感受说起',
    icon: '🔍',
    minutes: 2,
    ability: '学会先观察，别急着下判断',
    kind: 'discover',
  },
  {
    id: 'golden-yy-02',
    order: 2,
    title: '阴阳到底是什么',
    oneLine: '它不是两种东西，是一种看关系的方式',
    icon: '☯️',
    minutes: 3,
    ability: '理解阴阳是「关系视角」而非标签',
    kind: 'read',
  },
  {
    id: 'golden-yy-03',
    order: 3,
    title: '为什么要比较',
    oneLine: '一个症状说不完整件事',
    icon: '⚖️',
    minutes: 2,
    ability: '知道单一维度不足以判断',
    kind: 'why',
  },
  {
    id: 'golden-yy-04',
    order: 4,
    title: '同一个东西也能有阴有阳',
    oneLine: '换一个参照，阴阳会变',
    icon: '🔄',
    minutes: 3,
    ability: '发现阴阳的相对性',
    kind: 'paradox',
  },
  {
    id: 'golden-yy-05',
    order: 5,
    title: '你来观察',
    oneLine: '手脚凉，先别急着贴标签',
    icon: '👁️',
    minutes: 3,
    ability: '找到真正值得关注的线索',
    kind: 'practice',
  },
  {
    id: 'golden-yy-06',
    order: 6,
    title: '你来判断',
    oneLine: '「怕冷」就等于「阴」吗？',
    icon: '🧩',
    minutes: 3,
    ability: '知道一个症状不等于结论',
    kind: 'judge',
  },
  {
    id: 'golden-yy-07',
    order: 7,
    title: '换一个情况再试',
    oneLine: '把关系思维用到「昼夜」上',
    icon: '🧭',
    minutes: 2,
    ability: '把观察方式迁移到新场景',
    kind: 'transfer',
  },
  {
    id: 'golden-yy-08',
    order: 8,
    title: '本关掌握',
    oneLine: '回顾你真正学会的思维方式',
    icon: '🏮',
    minutes: 2,
    ability: '确认掌握了关系思维',
    kind: 'mastery',
  },
];

// ---------- 第一阶段：生活观察（先产生好奇，先不上定义） ----------
export const GOLDEN_DISCOVERY = {
  scenario: '同一天，同一个房间。\n一个人觉得「有点冷」。\n另一个人却觉得「刚刚好」。',
  question: '如果让你比较这两个现象，你会怎么描述？',
  views: [
    { id: 'v1', text: '一个人体质偏寒、一个人体质偏热，直接给各自定个属性' },
    { id: 'v2', text: '同样的环境，两个人的感受不一样——感受是「相对」出来的' },
    { id: 'v3', text: '房间的空调温度没调好' },
  ],
  revealTitle: '你刚才其实在做一件事：比较「关系」。',
  reveal:
    '中医看待身体，很少急着给一个人贴「寒」或「热」的标签。它先问：这个感受，是在和什么比较、又因什么而变化？这就是「阴阳」要帮你看清的事。',
} as const;

// ---------- 第二阶段：定义必须极简 ----------
export const GOLDEN_DEFINITION = {
  headline: '阴阳不是两种固定的东西，而是一种观察事物「关系」的方式。',
  examples: ['明 / 暗', '动 / 静', '寒 / 热'],
  examplesNote: '这些例子只是帮你理解「阴阳关系」，不是给世界上所有东西贴标签。',
  settle:
    '用阴阳去看，就是问：它更偏这一头，还是那一头？问的是一个「方向」，而不是一个终身不变的标签。',
} as const;

// ---------- 为什么要比较 ----------
export const GOLDEN_WHY = {
  content:
    '「寒」「热」只能描述温度一个维度，但人的状态远不止这些：还有动与静、上与下、亢奋与抑制。阴阳用一个统一框架把这些方向都收进来。一个人「怕冷 + 精神不振 + 面色偏白」，用阴阳一看，全都一致地指向「偏阴」——这比单说「怕冷」看得更完整。',
} as const;

// ---------- 反直觉 1：同一个东西也能有阴有阳 ----------
export const GOLDEN_PARADOX = {
  question: '一个东西到底是「阴」还是「阳」？',
  prompt: '先别查答案，凭第一直觉选一个。',
  options: [
    { id: 'p1a', text: '它天生就固定是阴或阳' },
    { id: 'p1b', text: '要看它和什么在比、怎么比', isReference: true },
    { id: 'p1c', text: '大的算阳，小的算阴' },
  ],
  revealTitle: '不能脱离「比较关系」单独讨论阴阳。',
  reveal:
    '想象三杯水：冰水、常温水、热水。和常温水比，冰水偏「阴」（更凉）；可和冰水比，常温水又成了「阳」（更暖）。同一个东西，换一个比较对象，观察到的阴阳方向就可能变。这就是阴阳的「相对性」。',
} as const;

// ---------- 案例侦探（三层：注意到 → 哪个关键 → 为什么） ----------
export const GOLDEN_CASE: GoldenCaseDetective = {
  scenario: '小林最近总觉得手脚凉。',
  followIntro: '但你继续观察，又多了几条信息：',
  clues: [
    { id: 'c1', text: '晚上更明显' },
    { id: 'c2', text: '喜欢喝温水' },
    { id: 'c3', text: '情绪紧张时更明显' },
  ],
  keyClueId: 'c3',
  noticePrompt: '第一步｜你注意到了什么？（可多选）',
  keyPrompt: '第二步｜哪个线索更重要？',
  reasonPrompt: '第三步｜你为什么这么判断？',
  reasonOptions: [
    { id: 'r1', text: '因为它直接说明小林「寒」' },
    { id: 'r2', text: '因为它能看出这个「凉」和什么在变化、有什么关系', isReference: true },
    { id: 'r3', text: '因为线索排得越靠前越重要' },
  ],
  bestReasonId: 'r2',
  reference: {
    conclusion: '在本关的学习范围内，真正值得关注的，是线索之间的「关系」，而不是「手脚凉」这个标签本身。',
    keyBasis: [
      '「情绪紧张时更明显」说明这个凉是会随状态变化的感受，而不是固定不变的标签。',
      '「晚上更明显」把凉和昼夜（阴阳交替）联系了起来，提示它和节律有关。',
      '「喜欢喝温水」是一个方向性的偏好，是另一个可对比的维度。',
    ],
    keyClue: '情绪紧张时更明显',
    deviation:
      '你的思路并不是没有依据。你可能先抓住了「手脚凉」，但把它当成了结论；而这一关真正想训练的是：不要只看一个现象，要看现象之间的关系。',
  },
  takeaway: '今天真正要记住的，不是「手脚凉属于什么」，而是：中医判断很少只靠一个症状，而要看多个现象之间的关系。',
  safetyNote: '本案例是观察与关系思维的训练，不构成任何诊断或调理建议；若长期手脚冰凉并伴随明显不适，请咨询医生。',
};

// ---------- 反直觉 2：怕冷 = 阴？ ----------
export const GOLDEN_JUDGE = {
  question: '「怕冷」就等于「阴」吗？',
  prompt: '先判断，再看教练怎么解释。',
  options: [
    { id: 'j1', text: '是，怕冷就是阴' },
    { id: 'j2', text: '不是，怕冷只是一个线索，不等于完整结论', isReference: true },
  ],
  reference: {
    conclusion: '在本关范围内，「怕冷」更接近一个线索，而不是一个结论。',
    keyBasis: [
      '一个症状只是指向「偏阴」方向的一个信号，不是完整的结论。',
      '中医判断要看多个表现之间的关系，而不是孤立的一个「怕冷」。',
    ],
    keyClue: '「怕冷」本身只是一个线索',
    deviation: '把「怕冷」直接等同于「阴」，会让判断停在第一个症状上，看不到其他表现与它之间的关系——这正是后面「辨证」要避免的。',
  },
  takeaway: '一个症状是线索，不是结论。这句会是你后面学「辨证」的第一盏灯。',
} as const;

// ---------- 迁移：白天 / 夜晚 ----------
export const GOLDEN_TRANSFER = {
  intro: '刚才我们聊的是「寒热」。现在换一个：白天和夜晚，你觉得应该怎么观察？',
  question: '哪一句更接近「用关系思维」去观察？',
  options: [
    { id: 't1', text: '白天明亮、活跃，夜晚安静、昏暗——它们是一对相对的状态', isReference: true },
    { id: 't2', text: '白天就是好，夜晚就是不好' },
    { id: 't3', text: '白天和夜晚没有关系，不用比较' },
  ],
  reference: {
    conclusion: '更符合关系思维的是：把白天和夜晚看作一对相对的状态。',
    keyBasis: [
      '白天明亮、活跃，夜晚安静、昏暗，正好是一组对比。',
      '阴阳要看的不是「谁好谁坏」，而是「相对的方向」。',
    ],
    keyClue: '「相对」这个词',
    deviation: '去想「好不好」，就又回到了贴标签；关系思维关注的是两者之间的「相对」与「变化」。',
  },
  takeaway: '你刚刚学会的不是一个答案，而是一种观察方式。',
} as const;

// ---------- 完成页：你掌握了什么（主角是能力，不是 XP/徽章） ----------
export const GOLDEN_SUMMARY = {
  abilities: [
    '知道阴阳不是简单标签，而是一种观察关系的方式',
    '能区分「相对」与「固定标签」',
    '知道不能只靠一个症状下判断',
    '能把「关系思维」迁移到新的现象上',
  ],
  // 复用既有「已验证」经典原文（严格不编造古文）
  classicId: 'classic-neijing-yinyangzhe',
  classicToday:
    '今天读这句话，你该这样理解：阴阳不是两种物质，而是一套给万物分类、看变化的「总模型」——中医用它来观察身体的上与下、内与外、寒与热、动与静。',
  unlocks: [
    { icon: '🔓', title: '寒热观察', desc: '带着「相对性」去看温度的方向' },
    { icon: '🔓', title: '八纲第一扇门', desc: '为第三境「阴阳总纲」埋下伏笔' },
  ],
} as const;

// ---------- 步骤 → 知识节点映射（结算时写入真实掌握 / 复习 / 错因） ----------
export const GOLDEN_STEP_NODE: Record<string, string> = {
  'golden-yy-01': 'v3-s1-n7',
  'golden-yy-02': 'v3-s1-n7',
  'golden-yy-03': 'v3-s1-n7',
  'golden-yy-04': 'v3-s1-n8',
  'golden-yy-05': 'v3-s1-n8',
  'golden-yy-06': 'v3-s1-n9',
  'golden-yy-07': 'v3-s1-n10',
  'golden-yy-08': 'v3-s1-n10',
};