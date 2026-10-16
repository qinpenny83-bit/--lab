// ============================================================
// V3.5 Phase 1.5（第二轮）：第五境「气机失常」章节 — 教学链
// 章：ch-s5-m2-c1（气机失常，地图第⑤步）
// 覆盖知识节点：v3-s5-n4（气机）、v3-s5-n5（升降出入）、v3-s5-n6（气机失常）
// 教学弧线：理解 → 为什么 → 体系位置 → 先想再讲 → 判断 → 解释 → 反直觉 → 案例 → 迁移 → 掌握验证
// 对应病机推理挑战：rc-stage5-lv1-qi-stagnation（气滞，单一病机教学案例）
// 边界：全部为理论学习 / 思维训练内容，不构成任何医疗诊断或用药建议。
// ============================================================

import type { LearningUnit } from '../../types/models';

export const stage5LearningUnitArray: LearningUnit[] = [
  // ① 理解：气机是什么
  {
    id: 'lu-s5-qj-01',
    nodeId: 'v3-s5-n4',
    chapterId: 'ch-s5-m2-c1',
    type: 'introduction',
    title: '一句话理解：气机是什么',
    objective: '用一句话抓住"气机"——它不是一团看不见的物质，而是气的运动方式',
    content:
      '"气机"指的是气在身体里运行的方式。气不是静止的，它一直在升、降、出、入地运动；这套运动的正常，是脏腑能各司其职的基础。所以中医说的"气机失常"，问题不在"气够不够多"，而在"气动了没有、朝哪个方向动、动得顺不顺"。',
    interactionType: 'read',
    difficulty: 1,
    prerequisiteIds: [],
    relatedNodeIds: ['v3-s5-n5'],
    sourceMetadata: '{"source":"《中医基础理论》","sourceAuthor":"孙广仁","sourceEra":"现代","chapter":"病机·气机失调","interpretationLevel":"modern"}',
    safetyNote: '本节讲的是中医认识身体的思维方式，不涉及诊断。',
  },
  // ② 为什么：为什么气机强调"运动"
  {
    id: 'lu-s5-qj-02',
    nodeId: 'v3-s5-n4',
    chapterId: 'ch-s5-m2-c1',
    type: 'why',
    title: '为什么气机强调"运动关系"',
    objective: '理解为什么判断气机，先看"方向"而不是先看"数量"',
    content:
      '因为气的作用要在运动里才能发挥：肺要"宣发肃降"才能呼吸，胃要"降浊"才能不往上返，脾要"升清"才能把营养往上送。气一旦不按它的方向走，功能立刻出错。所以中医判断气的问题，第一问是"气是堵着、往上冲，还是往下坠"，而不是"气多还是气少"。',
    interactionType: 'read',
    difficulty: 1,
    prerequisiteIds: ['lu-s5-qj-01'],
    relatedNodeIds: ['v3-s5-n6'],
    safetyNote: '',
  },
  // ③ 体系位置：升降出入
  {
    id: 'lu-s5-qj-03',
    nodeId: 'v3-s5-n5',
    chapterId: 'ch-s5-m2-c1',
    type: 'concept',
    title: '升降出入：气的四种基本运动',
    objective: '建立"升、降、出、入"四个方向的直觉',
    content:
      '升是往上（如脾气升清），降是往下（如胃气降浊），出是向外（如肺的宣发、体表的汗），入是向内（如肺的肃降、肾的摄纳）。每个脏腑都有自己的"标准运动方向"——记住这个方向，后面看到"恶心、嗳气"你才会想到"胃气该降却没降"，看到"泄泻"你才会想到"脾气该升却升不动"。',
    interactionType: 'read',
    difficulty: 1,
    prerequisiteIds: ['lu-s5-qj-02'],
    relatedNodeIds: ['v3-s5-n6'],
    safetyNote: '',
  },
  // ④ 先想再讲：观察
  {
    id: 'lu-s5-qj-04',
    nodeId: 'v3-s5-n5',
    chapterId: 'ch-s5-m2-c1',
    type: 'observation',
    title: '先想：你遇到过"气不顺"吗',
    objective: '用一次生活观察，先自己体会"气机方向"',
    content:
      '回想一次生气之后的身体感觉：是不是胸口发闷、总想叹一口气、还可能打嗝？先不要急着给它命名，只体会"气好像堵在胸口、往上窜"这个方向感。想想看：如果"气堵住了走不动"和"气往上冲、"和"气往下坠"，三个人的感受会有什么不同？',
    interactionType: 'think',
    interactionData:
      '{"reveal":"堵住走不动的，多感觉闷、胀；往上冲的，多感觉恶心、嗳气、往上顶；往下坠的，多感觉小腹下坠、想解大便。中医正是用\\"气朝哪个方向乱\\"，给这些感受归类——这就是气机分析的起点。"}',
    difficulty: 1,
    prerequisiteIds: ['lu-s5-qj-03'],
    relatedNodeIds: ['v3-s5-n6'],
    safetyNote: '本环节是开放思考，无标准答案。',
  },
  // ⑤ 判断：气机朝哪个方向失常
  {
    id: 'lu-s5-qj-05',
    nodeId: 'v3-s5-n6',
    chapterId: 'ch-s5-m2-c1',
    type: 'check',
    title: '自己判断一下',
    objective: '先猜，再看答案：用"方向"给气机失常分类',
    content: '同样是气出了问题，方向不同、表现就不同，判法也不同。',
    interactionType: 'multi_choice',
    interactionData:
      '{"question":"一个人总打嗝、恶心、反酸、吃完更明显，这最像气机朝哪个方向失常？","options":["气滞（堵住走不动）","气逆（该降反升）","气陷（该升反坠）","气的数量不够"],"answer":1,"explain":"打嗝、恶心、反酸都是\\"气往上走\\"的方向性表现——胃气本应下降，现在不降反升，所以是气逆。这题的关键不是背症状，而是先问\\"气朝哪个方向乱\\"。"}',
    difficulty: 1,
    prerequisiteIds: ['lu-s5-qj-04'],
    relatedNodeIds: ['v3-s5-n4'],
    safetyNote: '本题为思维训练，不构成诊断建议。',
  },
  // ⑥ 解释：三类气机失常的区别
  {
    id: 'lu-s5-qj-06',
    nodeId: 'v3-s5-n6',
    chapterId: 'ch-s5-m2-c1',
    type: 'explanation',
    title: '解释：气滞、气逆、气陷差在哪',
    objective: '用自己的话讲清三者的方向差别，而不是背定义',
    content:
      '请你用自己的话回答两个问题：① 同样是"腹部不舒服"，怎么从感觉上区分"气滞的胀"和"气陷的下坠"？② 为什么"判断方向"比"判断气的多少"更先一步？试着把你理解的"方向"这个线索写下来。',
    interactionType: 'explain',
    interactionData:
      '{"prompt":"用你自己的话，讲清气滞、气逆、气陷方向上的差别。","structure":["堵住的感受","往上冲的感受","往下坠的感受"]}',
    difficulty: 2,
    prerequisiteIds: ['lu-s5-qj-05'],
    relatedNodeIds: ['v3-s5-n4', 'v3-s5-n6'],
    safetyNote: '本题没有标准答案，重点是你能否从"方向"角度讲清差别。',
  },
  // ⑦ 反直觉：胀≠虚
  {
    id: 'lu-s5-qj-07',
    nodeId: 'v3-s5-n6',
    chapterId: 'ch-s5-m2-c1',
    type: 'paradox',
    title: '反直觉：胀，不一定等于虚',
    objective: '打破"有不适感=身体虚、要补"的直觉',
    content:
      '直觉上，身体难受、堵得慌，容易想"是不是虚了、该补一补"。但中医对"胀"更常想到的是"堵"而不是"虚"。',
    interactionType: 'multi_choice',
    interactionData:
      '{"question":"一个人胸胁胀痛、叹气后才舒服、随情绪起伏，最不该先想到的处理方向是？","options":["先辨气机是不是堵了（气滞）","先补气（觉得是气不够）","看这\\"胀痛\\"是不是还游走、和情绪有关","吃好睡好观察它会不会随着情绪缓解"],"answer":1,"explain":"胀痛、叹气后舒、随情绪起伏，是气机郁滞的典型，方向在\\"堵\\"而不是\\"虚\\"。一上来就补，等于往已经堵住的管道里再加压力。反直觉的关键在：\\"不舒服\\"不等于\\"不足\\"。"}',
    difficulty: 2,
    prerequisiteIds: ['lu-s5-qj-06'],
    relatedNodeIds: ['v3-s5-n4'],
    safetyNote: '本题为思维训练，不是治疗建议。',
  },
  // ⑧ 进入案例：八步推理
  {
    id: 'lu-s5-qj-08',
    nodeId: 'v3-s5-n6',
    chapterId: 'ch-s5-m2-c1',
    type: 'case',
    title: '进入案例：练一次完整的杏林推理八步',
    objective: '把"方向"这把尺子，真正用到一次线索推理里',
    content:
      '接下来你会遇到一个理论学习案例：一个人近期情绪压抑，身体有些不适。你要先收集线索、找出关键、分清主次、提出假设，再去找支持证据和反证，最后可能会出现新信息，需要你修正判断。请放慢速度，先观察，再下结论。',
    interactionType: 'case_analysis',
    interactionData: '{"challengeId":"rc-stage5-lv1-qi-stagnation"}',
    difficulty: 3,
    prerequisiteIds: ['lu-s5-qj-07'],
    relatedNodeIds: ['v3-s5-n4', 'v3-s5-n6'],
    safetyNote: '这是一个理论学习案例，用于训练推理能力，不判断任何真实个人的身体状况。',
  },
  // ⑨ 迁移：换一个陌生场景
  {
    id: 'lu-s5-qj-09',
    nodeId: 'v3-s5-n6',
    chapterId: 'ch-s5-m2-c1',
    type: 'transfer',
    title: '迁移：换一个陌生场景',
    objective: '验证是否内化了"方向"判断，而非记住案例答案',
    content:
      '把刚才学会的"先看方向"用到另一个不相干的场景里。',
    interactionType: 'multi_choice',
    interactionData:
      '{"question":"一个人饭后总觉得胃脘胀满、嗳气，胀满时轻时重、部位不固定。这最像哪一类气机问题？最该抓住的线索是？","options":["气滞——抓住\\"胀而游走、嗳气后舒\\"","血瘀——抓住\\"痛如针刺、固定不移\\"","气逆——抓住\\"恶心反酸\\"","无所谓，先观察"],"answer":0,"explain":"胀满、嗳气、部位不固定，是气机不畅（气滞）的方向性表现；血瘀应以固定刺痛为主。抓住\\"胀而游走\\"就能和血瘀区分——换场景后仍然要回到\\"方向\\"这一把尺子。"}',
    difficulty: 2,
    prerequisiteIds: ['lu-s5-qj-08'],
    relatedNodeIds: ['v3-s5-n4', 'v3-s5-n5'],
    safetyNote: '本场景为思维训练，不是诊断建议。',
  },
  // ⑩ 掌握验证：气机这把尺子
  {
    id: 'lu-s5-qj-10',
    nodeId: 'v3-s5-n6',
    chapterId: 'ch-s5-m2-c1',
    type: 'review',
    title: '掌握验证：你拿到"气机"这把尺子了吗',
    objective: '综合验证：能否把气机的核心思路讲成一个可复用的判断法',
    content:
      '学到这里，请做最后一次判断——它综合了概念、方向和反证。',
    interactionType: 'multi_choice',
    interactionData:
      '{"question":"下列哪一句，最准确地概括了\\"气机\\"用于判断的核心思路？","options":["气机就是看气够不够，虚了就补","先看气朝哪个方向动（升降出入），再结合病位判断是堵、是逆、是陷","气机只和情绪有关，和其他无关","背熟气滞/气逆/气陷三个名词就算掌握"],"answer":1,"explain":"气机分析的灵魂是\\"方向\\"：升降出入是否失常，是理解堵（气滞）、反（气逆）、坠（气陷）的共同钥匙。你能够把它讲成一个可以反复使用的判断法，才算真正掌握。"}',
    difficulty: 2,
    prerequisiteIds: ['lu-s5-qj-09'],
    relatedNodeIds: ['v3-s5-n4', 'v3-s5-n5', 'v3-s5-n6'],
    safetyNote: '',
  },
];