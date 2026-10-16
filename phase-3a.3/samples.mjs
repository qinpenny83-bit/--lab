// ============================================================
// 杏林大典 · Phase 3A.3 · 定向收口样本（targeted closure）
// 范围仅限 Phase 3A.2 报告中的 3 类残余问题，不做结构性扩张：
//   1) 3 个 conditional 出处闭合（半夏十八反 / 合谷四总穴歌 / 阴阳白名单）
//   2) E 门证据强度分层校准 × 2 回归
//   3) F/G 语义抽检 × 2（真实反证 / 反证无效）
// 运行：node phase-3a.3/run.mjs
// ============================================================

export const SEED = 20260920;
export const GEN_LABEL = 'phase-3a.3-targeted-closure';

const pharmacopoeiaFact = (field) => ({ field, sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' });
const guobiaoFact = (field) => ({ field, sourceType: 'national_standard', sourceTitle: '《腧穴名称与定位》GB/T 12346', status: 'verified' });

export const SAMPLES = [
  // ============================================================
  // 三、3 个 conditional 出处闭合（复用 Phase 3A.2 原始样本，验证补出处后不再「须核验」）
  // ============================================================
  {
    id: 'pa33-herb-banxia', title: '半夏', category: 'herb', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['经典出处闭合', '生半夏有毒'],
    intent: '十八反出处闭合：误标《中国药典》→ 纠为《儒门事亲》',
    facts: [
      pharmacopoeiaFact('herb.origin'),
      { field: 'herb.du', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
    ],
    classics: [{ label: '十八反', canon: '', chapter: '', sourceTitle: '《中国药典》一部', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa33-acu-hegu', title: '合谷', category: 'acupoint', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['经典出处闭合', '孕妇禁针'],
    intent: '四总穴歌出处闭合：误标《针灸大成》→ 纠为《针灸大全》',
    facts: [
      guobiaoFact('acupoint.dingwei'),
      guobiaoFact('acupoint.jingluo'),
    ],
    classics: [{ label: '四总穴歌', canon: '', chapter: '', sourceTitle: '《针灸大成》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa33-theory-yinyang', title: '阴阳原典', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['白名单覆盖缺口闭合'],
    intent: '阴阳白名单缺口闭合：补入《素问·阴阳应象大论》verified',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》教材', status: 'verified' },
    ],
    classics: [{ label: '阴阳', canon: '', chapter: '', sourceTitle: '《素问·阴阳应象大论》', sourceType: 'classic_original', status: 'verified', originalText: '阴阳者，天地之道也，万物之纲纪' }],
    dosage: {}, cases: null, stdJudgment: '', coreDefinition: '', safety: {},
  },

  // ============================================================
  // 二、E 门证据强度分层校准 × 2 回归
  // ============================================================
  {
    id: 'pa33-e-01', title: '失眠（仅症状）', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['E 校准回归', '症状only'],
    intent: 'E 校准：只有症状、确实不足 → 应拦截',
    facts: [
      { field: 'case.anchor', sourceType: 'teaching_design', sourceTitle: '内科案例教学通识', status: 'teaching_inference' },
    ],
    classics: [], dosage: {},
    cases: { level: 'C3', originalJudgment: '心脾两虚失眠', c3Evidence: ['入睡困难、多梦易醒', '胸闷心慌、时有头晕'] },
    stdJudgment: '', coreDefinition: '', safety: {},
  },
  {
    id: 'pa33-e-02', title: '失眠（症状+舌脉）', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['E 校准回归', '症状+独立证据'],
    intent: 'E 校准：症状 + 第二独立证据（舌脉）→ 应进入 C3',
    facts: [
      { field: 'case.anchor', sourceType: 'teaching_design', sourceTitle: '内科案例教学通识', status: 'teaching_inference' },
    ],
    classics: [], dosage: {},
    cases: { level: 'C3', originalJudgment: '心脾两虚失眠', c3Evidence: ['入睡困难、多梦易醒', '舌淡红、苔薄白、脉弦细'] },
    stdJudgment: '', coreDefinition: '', safety: {},
  },

  // ============================================================
  // 三、F/G 语义抽检 × 2（真实反证 / 反证无效）
  // ============================================================
  {
    id: 'pa33-fg-01', title: '眩晕医案（真实反证）', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['F/G 抽检', '真实反证', '人工复核'],
    intent: 'F/G 抽检：真实反证 + 有效修正 → 通过 F/G，加 human_review_required',
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
    id: 'pa33-fg-02', title: '胸痹医案（反证无效）', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['F/G 抽检', '反证无效', '套话修正'],
    intent: 'F/G 抽检：反证与判断无关 + 修正未回应 → 应拦截',
    facts: [
      { field: 'case.anchor', sourceType: 'teaching_design', sourceTitle: '内科案例教学通识', status: 'teaching_inference' },
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