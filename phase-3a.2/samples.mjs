// ============================================================
// 杏林大典 · Phase 3A.2 · 25 个全新随机压力样本（原始候选）
// 说明：这里每个样本都模拟「原始生成器」的天然输出形态——包括其
//       已知的失败模式（出处想当然、剂量折算、三值手填越级、教学
//       术语冒充原文、已禁用/禁针内容自觉缺失等）。这些错误是生成
//       器自然会犯的，不是为命中 Gate 而人为篡改医学事实。
// 全新性：以下 25 个主题均未出现在 Phase 3A 列表与 Phase 3A.1
//       regression 中。
// ============================================================

export const SEED = 20260919;
export const GEN_LABEL = 'phase-3a.2-fresh';

// 常用干净事实（供干净基线样本使用）
const pharmacopoeiaFact = (field) => ({ field, sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' });
const guobiaoFact = (field) => ({ field, sourceType: 'national_standard', sourceTitle: '《腧穴名称与定位》GB/T 12346', status: 'verified' });

export const SAMPLES = [
  // ============================================================
  // 🌿 草药 ×5
  // ============================================================
  {
    id: 'pa32-herb-01', title: '附子', category: 'herb', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['高风险药材', '毒性警示缺口', '区分事实与教学推断'],
    intent: 'K 边界(回阳救逆第一品无权威出处) + A 来源缺漏，源头降级',
    facts: [
      pharmacopoeiaFact('herb.origin'),
      { field: 'herb.huiyang', sourceType: 'classic_original', sourceTitle: '', status: 'verified' },
    ],
    classics: [], dosage: {}, cases: null, stdJudgment: '', coreDefinition: '回阳救逆第一品', safety: {},
  },
  {
    id: 'pa32-herb-02', title: '半夏', category: 'herb', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['经典出处争议', '生半夏有毒'],
    intent: 'B 经典出处错配(十八反误标药典)',
    facts: [
      pharmacopoeiaFact('herb.origin'),
      { field: 'herb.du', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
    ],
    classics: [{ label: '十八反', canon: '', chapter: '', sourceTitle: '《中国药典》一部', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-herb-03', title: '细辛', category: 'herb', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['剂量混标', '古训与药典混淆'],
    intent: 'C 剂量混标(古训不过钱被折克数)',
    facts: [
      pharmacopoeiaFact('herb.origin'),
      { field: 'herb.dose', sourceType: 'textbook', sourceTitle: '《中药学》教材', status: 'verified' },
    ],
    classics: [],
    dosage: { originalDosage: '细辛不过钱，单用末不可过一钱（折约 3g）', modernDosage: '', modernSourceTitle: '', modernSourceVerified: false },
    cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-herb-04', title: '柴胡', category: 'herb', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['区分事实与教学推断', '三值越级'],
    intent: 'D 三值越级(小剂量升提教学推断被标 verified)',
    facts: [
      pharmacopoeiaFact('herb.origin'),
      { field: 'herb.shengti', sourceType: 'teaching_design', sourceTitle: '临床经验（无权威定性）', status: 'verified' },
    ],
    classics: [], dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-herb-05', title: '麻黄', category: 'herb', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['干净基线', '教学推断已正确标注'],
    intent: 'candidate 干净基线（无缺陷）',
    facts: [
      pharmacopoeiaFact('herb.origin'),
      { field: 'herb.shengjiang', sourceType: 'teaching_design', sourceTitle: '中药学升降浮沉教学通识', status: 'teaching_inference' },
    ],
    classics: [],
    dosage: { originalDosage: '（麻黄汤原方麻黄三两）', modernDosage: '2–9g', modernSourceTitle: '《中国药典》', modernSourceVerified: true },
    cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },

  // ============================================================
  // 💊 方剂 ×5
  // ============================================================
  {
    id: 'pa32-formula-06', title: '麻黄汤', category: 'formula', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['古今剂量混淆', '原典剂量'],
    intent: 'C 古今剂量混淆(原方三两折克数)',
    facts: [
      { field: 'formula.zuocheng', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》教材', status: 'verified' },
    ],
    classics: [],
    dosage: { originalDosage: '麻黄三两、桂枝二两、炙甘草一两、杏仁七十个（现折 9g/6g/3g/9g）', modernDosage: '', modernSourceTitle: '', modernSourceVerified: false },
    cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-formula-07', title: '桂枝汤', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['教材归纳冒充原典'],
    intent: 'K 知识边界(调和营卫冒充原文)',
    facts: [
      { field: 'formula.zuocheng', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
    ],
    classics: [{ label: '调和营卫', canon: '', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-formula-08', title: '四逆汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['古今剂量', '回阳救逆高风险'],
    intent: 'C 古今剂量混淆(生附子一枚 vs 现代炙附片无来源)',
    facts: [
      { field: 'formula.zuocheng', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
    ],
    classics: [],
    dosage: { originalDosage: '炙甘草二两、干姜一两半、生附子一枚（去皮，破八片）', modernDosage: '炙附片 9g、干姜 9g、炙甘草 6g', modernSourceTitle: '', modernSourceVerified: false },
    cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-formula-09', title: '六味地黄丸', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['教材归纳冒充原方'],
    intent: 'K 知识边界(三补三泻冒充原方)',
    facts: [
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》教材', status: 'verified' },
    ],
    classics: [{ label: '三补三泻', canon: '', chapter: '', sourceTitle: '《小儿药证直诀》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-formula-10', title: '小柴胡汤', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['经典出处错配', '断章取义'],
    intent: 'B 经典出处错配(但见一证误归黄帝内经)',
    facts: [
      { field: 'formula.zuocheng', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
    ],
    classics: [{ label: '但见一证便是', canon: '', chapter: '', sourceTitle: '《黄帝内经》', sourceType: 'classic_original', status: 'verified', originalText: '但见一证便是，不必悉具' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },

  // ============================================================
  // 📍 穴位 ×5
  // ============================================================
  {
    id: 'pa32-acu-11', title: '内关', category: 'acupoint', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['定位', '干净基线'],
    intent: 'candidate 干净基线（定位来源齐全）',
    facts: [
      guobiaoFact('acupoint.dingwei'),
      { field: 'acupoint.jingluo', sourceType: 'national_standard', sourceTitle: '《腧穴名称与定位》GB/T 12346', status: 'verified' },
    ],
    classics: [], dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-acu-12', title: '合谷', category: 'acupoint', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['经典出处错配', '孕妇禁针'],
    intent: 'B 经典出处错配(四总穴歌坑) + J 孕妇禁针',
    facts: [
      guobiaoFact('acupoint.dingwei'),
      guobiaoFact('acupoint.jingluo'),
    ],
    classics: [{ label: '四总穴歌', canon: '', chapter: '', sourceTitle: '《针灸大成》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-acu-13', title: '手三里', category: 'acupoint', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['经络归属', '易混淆', '教学推断边界'],
    intent: 'D 三值越级(经络/解剖教学推断被标 verified)',
    facts: [
      guobiaoFact('acupoint.dingwei'),
      { field: 'acupoint.jingluo', sourceType: 'national_standard', sourceTitle: '《腧穴名称与定位》GB/T 12346', status: 'verified' },
      { field: 'acupoint.jiepou', sourceType: 'teaching_design', sourceTitle: '解剖定位教学通识', status: 'verified' },
    ],
    classics: [], dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-acu-14', title: '三阴交', category: 'acupoint', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['孕妇禁针', '空间定位教学推断'],
    intent: 'J 禁针穴红线缺失',
    facts: [
      guobiaoFact('acupoint.dingwei'),
      guobiaoFact('acupoint.jingluo'),
    ],
    classics: [], dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-acu-15', title: '太冲', category: 'acupoint', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['知识边界', '教学术语冒充经典'],
    intent: 'K 知识边界(四关冒充经典)',
    facts: [
      guobiaoFact('acupoint.dingwei'),
      guobiaoFact('acupoint.jingluo'),
    ],
    classics: [{ label: '四关', canon: '', chapter: '', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },

  // ============================================================
  // 📖 理论 ×5
  // ============================================================
  {
    id: 'pa32-theory-16', title: '气机升降', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['后世归纳冒充原典'],
    intent: 'K 知识边界(左升右降冒充内经原句)',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》教材', status: 'verified' },
    ],
    classics: [{ label: '左升右降', canon: '', chapter: '', sourceTitle: '《内经》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-theory-17', title: '气血关系', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['教学口诀冒充原典'],
    intent: 'K 知识边界(气为血之帅冒充内经)',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》教材', status: 'verified' },
    ],
    classics: [{ label: '气为血之帅', canon: '', chapter: '', sourceTitle: '《黄帝内经》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-theory-18', title: '五行生克', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['经典出处错配', '易误归内经'],
    intent: 'B 经典出处错配(见肝之病误归内经)',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》教材', status: 'verified' },
    ],
    classics: [{ label: '见肝之病知肝传脾', canon: '', chapter: '', sourceTitle: '《内经》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-theory-19', title: '阴阳原典', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['白名单覆盖缺口', '原典理论(正确出处被保守降级)'],
    intent: '白名单未覆盖的真实经典被保守降级（需人工核验出处）',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》教材', status: 'verified' },
    ],
    classics: [{ label: '阴阳', canon: '', chapter: '', sourceTitle: '《素问·阴阳应象大论》', sourceType: 'classic_original', status: 'verified', originalText: '阴阳者，天地之道也，万物之纲纪' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-theory-20', title: '病因病机', category: 'theory', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['C3 证据不足', '表面证据实则不足'],
    intent: 'E 证据不足拦截(表面有证据但缺具体征象)',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》教材', status: 'verified' },
    ],
    classics: [], dosage: {},
    cases: { level: 'C3', originalJudgment: '病起内湿', c3Evidence: ['患者自述身体困重不适', '近来症状时轻时重'] },
    stdJudgment: '', coreDefinition: '', safety: {},
  },

  // ============================================================
  // 🩺 临床医案 ×5
  // ============================================================
  {
    id: 'pa32-case-21', title: '脾胃湿热医案', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['C3 证据不足', '证据强弱'],
    intent: 'E 证据不足拦截(表面有证据但不足以定湿热)',
    facts: [
      { field: 'case.anchor', sourceType: 'teaching_design', sourceTitle: '内科案例教学通识', status: 'teaching_inference' },
    ],
    classics: [], dosage: {},
    cases: { level: 'C3', originalJudgment: '脾胃湿热', c3Evidence: ['患者自述腹部不适', '精神状态一般'] },
    stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-case-22', title: '眩晕医案', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['C4 真实反证', '有效修正'],
    intent: '真实反证 + 有效修正（应通过 F/G）',
    facts: [
      { field: 'case.anchor', sourceType: 'teaching_design', sourceTitle: '内科案例教学通识', status: 'teaching_inference' },
    ],
    classics: [], dosage: {},
    cases: {
      level: 'C4', originalJudgment: '肝阳上亢眩晕(实热)',
      c3Evidence: ['眩晕耳鸣、头胀痛', '舌红苔黄、脉弦数'],
      counterEvidence: '然舌淡、脉细弱，无面红目赤，反见神疲乏力，属气血亏虚之虚象',
      revision: '排除肝阳上亢，改为气血亏虚证，治以益气养血、健脾升清',
    },
    stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa32-case-23', title: '咳嗽医案', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['C4 套话修正', '模板化'],
    intent: 'G 套话修正拦截 + H 模板化',
    facts: [
      { field: 'case.anchor', sourceType: 'teaching_design', sourceTitle: '内科案例教学通识', status: 'teaching_inference' },
    ],
    classics: [], dosage: {},
    cases: {
      level: 'C4', originalJudgment: '风寒犯肺咳嗽',
      c3Evidence: ['咳嗽声重、痰稀白', '恶寒发热、鼻塞流清涕'],
      counterEvidence: '但见咽喉肿痛、痰黄黏、口渴',
      revision: '综合考虑后需进一步观察，辨证论治',
    },
    stdJudgment: '抓住核心病机，辨证分型，再对应选方。', coreDefinition: '肺失宣肃', safety: {},
  },
  {
    id: 'pa32-case-24', title: '失眠医案', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['证据强弱', '强证据对照', '模板化'],
    intent: '强证据通过 E（对照 #21）+ H 模板化',
    facts: [
      { field: 'case.anchor', sourceType: 'teaching_design', sourceTitle: '内科案例教学通识', status: 'teaching_inference' },
    ],
    classics: [], dosage: {},
    cases: {
      level: 'C3', originalJudgment: '心脾两虚失眠',
      c3Evidence: ['入睡困难、多梦易醒', '心悸健忘、神疲、舌淡苔薄、脉细弱'],
    },
    stdJudgment: '抓住核心病机，辨证分型，再对应选方。', coreDefinition: '心神失养', safety: {},
  },
  {
    id: 'pa32-case-25', title: '胸痹医案', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['C4 反证无效', '非法来源枚举'],
    intent: 'F 反证无效拦截 + A 非法 sourceType 隔离(负对照)',
    facts: [
      { field: 'case.anchor', sourceType: 'teaching_design', sourceTitle: '内科案例教学通识', status: 'teaching_inference' },
      { field: 'case.experience', sourceType: '民间偏方', sourceTitle: '祖传秘方', status: 'verified' },
    ],
    classics: [], dosage: {},
    cases: {
      level: 'C4', originalJudgment: '痰浊闭阻胸痹',
      c3Evidence: ['胸闷如窒、痰多', '形体肥胖、苔白腻、脉滑'],
      counterEvidence: '患者既往有高血压病史，需定期服药控制',
      revision: '辨为痰浊闭阻，治以化痰通络',
    },
    stdJudgment: '', coreDefinition: '', safety: {},
  },
];