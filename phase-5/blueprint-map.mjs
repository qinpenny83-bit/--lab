// ============================================================
// 杏林大典 · Phase 5 · Blueprint Map（33 学科覆盖基准注册表）
// ============================================================
// 唯一覆盖基准：content-bible/content-bible-v2.html（Content Bible v2.0）
//   第 01 章 完整一级学科树（33 个一级学科 A–AG）
//   第 20 章 当前 102 节点迁移表（keep/split/merge/new 四规则）
//   第 22 章 最终真实规模估算（核心对象 ≈ 1700–2190，宁少勿滥）
//   第 21 章 三处诚实保留缺口（识舌识脉素材 / 小众临床认知框架 / 逐条 1:1 字段核对）
// 字段：
//   code/name           学科代码（A–AG）与名称
//   type                内容类型（theory/diagnostic/herb/formula/meridian/
//                       acupoint/classic/clinical/case/ethic/evidence）
//   stage               学习境界（stage1..stage8）
//   status              必修 core / 扩展 ext（中药学类专业）
//   target              [low, high] 核心对象区间（蓝图 22.2）
//   migratedFrom        V1 存量领域归位来源（现有 305 节点）
//   honestyGap          诚实保留缺口说明（无则 null）
// ============================================================

export const BLUEPRINT_MAP = {
  basis: 'content-bible/content-bible-v2.html 第 01/20/21/22 章（33 学科 A–AG）',
  note: '核心对象区间为结构反推粗估（宁少勿滥，A6 门槛），非产量承诺',
  subjects: [
    { code: 'A',  name: '中医基础理论',      type: 'theory',     stage: 'stage1', status: 'core', target: [160, 185], migratedFrom: ['01', '02', '03', '04', '05', '07', '08', '16', '23'], honestyGap: null },
    { code: 'B',  name: '中医诊断学',        type: 'diagnostic', stage: 'stage2', status: 'core', target: [140, 165], migratedFrom: ['09', '10', '11', '12', '13', '14', '15', '21', '22'], honestyGap: '识舌/识脉真实训练素材需真实图像/模拟数据，蓝图只定义结构+特征维度' },
    { code: 'C',  name: '经络学',            type: 'meridian',   stage: 'stage4', status: 'core', target: [35, 45],  migratedFrom: ['06'], honestyGap: null },
    { code: 'D',  name: '腧穴学',            type: 'acupoint',   stage: 'stage4', status: 'core', target: [60, 75],  migratedFrom: [], honestyGap: '选载穴逐穴字段依赖逐条核对教材与原典' },
    { code: 'E',  name: '针灸治疗学',        type: 'acupoint',   stage: 'stage6', status: 'core', target: [30, 40],  migratedFrom: [], honestyGap: null },
    { code: 'F',  name: '刺法灸法学',        type: 'theory',     stage: 'stage5', status: 'core', target: [25, 35],  migratedFrom: [], honestyGap: '只教理论与边界，不做线上真实刺灸操作' },
    { code: 'G',  name: '中药学',            type: 'herb',       stage: 'stage3', status: 'core', target: [250, 290], migratedFrom: [], honestyGap: '250+ 药逐条字段填充依赖逐条核对教材与原典' },
    { code: 'H',  name: '中药鉴定学',        type: 'herb',       stage: 'stage6', status: 'ext',  target: [50, 70],  migratedFrom: [], honestyGap: '识材训练素材依赖真实饮片图像' },
    { code: 'I',  name: '药用植物·本草学',   type: 'herb',       stage: 'stage6', status: 'ext',  target: [30, 45],  migratedFrom: [], honestyGap: null },
    { code: 'J',  name: '中药炮制学',        type: 'herb',       stage: 'stage6', status: 'ext',  target: [40, 60],  migratedFrom: [], honestyGap: '生品 vs 炮制品比较依赖逐条核对' },
    { code: 'K',  name: '中药药剂学',        type: 'herb',       stage: 'stage7', status: 'ext',  target: [25, 35],  migratedFrom: [], honestyGap: null },
    { code: 'L',  name: '方剂学',            type: 'formula',    stage: 'stage7', status: 'core', target: [230, 270], migratedFrom: ['17', '18'], honestyGap: '220+ 方逐条字段填充依赖逐条核对教材与原典' },
    { code: 'M',  name: '方剂剂量（维度）',  type: 'formula',    stage: 'stage7', status: 'core', target: [20, 30],  migratedFrom: [], honestyGap: null },
    { code: 'N',  name: '中医经典',          type: 'classic',    stage: 'stage7', status: 'core', target: [120, 145], migratedFrom: ['19'], honestyGap: '10 部经典原文出处级校验' },
    { code: 'O',  name: '医古文',            type: 'classic',    stage: 'stage8', status: 'core', target: [40, 55],  migratedFrom: [], honestyGap: null },
    { code: 'P',  name: '各家学说',          type: 'theory',     stage: 'stage8', status: 'core', target: [30, 45],  migratedFrom: [], honestyGap: null },
    { code: 'Q',  name: '中医临床基础',      type: 'clinical',   stage: 'stage5', status: 'core', target: [35, 45],  migratedFrom: ['20'], honestyGap: null },
    { code: 'R',  name: '中医内科学',        type: 'clinical',   stage: 'stage8', status: 'core', target: [95, 115], migratedFrom: [], honestyGap: null },
    { code: 'S',  name: '中医外科学',        type: 'clinical',   stage: 'stage8', status: 'core', target: [30, 40],  migratedFrom: [], honestyGap: null },
    { code: 'T',  name: '中医妇科学',        type: 'clinical',   stage: 'stage8', status: 'core', target: [30, 40],  migratedFrom: [], honestyGap: null },
    { code: 'U',  name: '中医儿科学',        type: 'clinical',   stage: 'stage8', status: 'core', target: [25, 35],  migratedFrom: [], honestyGap: null },
    { code: 'V',  name: '中医骨伤科学',      type: 'clinical',   stage: 'stage8', status: 'core', target: [20, 30],  migratedFrom: [], honestyGap: '认知框架级，不冒充全科临床深度' },
    { code: 'W',  name: '中医眼科学',        type: 'clinical',   stage: 'stage8', status: 'core', target: [15, 25],  migratedFrom: [], honestyGap: '认知框架级，不冒充全科临床深度' },
    { code: 'X',  name: '中医耳鼻咽喉科',    type: 'clinical',   stage: 'stage8', status: 'core', target: [15, 25],  migratedFrom: [], honestyGap: '认知框架级，不冒充全科临床深度' },
    { code: 'Y',  name: '推拿·养生康复',     type: 'clinical',   stage: 'stage6', status: 'core', target: [25, 35],  migratedFrom: [], honestyGap: null },
    { code: 'Z',  name: '中医急诊',          type: 'clinical',   stage: 'stage8', status: 'core', target: [20, 30],  migratedFrom: [], honestyGap: null },
    { code: 'AA', name: '传染病·预防',       type: 'clinical',   stage: 'stage8', status: 'core', target: [20, 30],  migratedFrom: [], honestyGap: null },
    { code: 'AB', name: '全科医学',          type: 'clinical',   stage: 'stage8', status: 'core', target: [15, 25],  migratedFrom: [], honestyGap: null },
    { code: 'AC', name: '现代医学基础',      type: 'theory',     stage: 'stage2', status: 'core', target: [40, 55],  migratedFrom: [], honestyGap: null },
    { code: 'AD', name: '伦理·法律',         type: 'ethic',      stage: 'stage8', status: 'core', target: [12, 20],  migratedFrom: [], honestyGap: null },
    { code: 'AE', name: '沟通·心理',         type: 'ethic',      stage: 'stage8', status: 'core', target: [12, 20],  migratedFrom: [], honestyGap: null },
    { code: 'AF', name: '科研·证据',         type: 'evidence',   stage: 'stage8', status: 'core', target: [18, 25],  migratedFrom: [], honestyGap: null },
    { code: 'AG', name: '综合医案·试炼',     type: 'case',       stage: 'stage8', status: 'core', target: [20, 30],  migratedFrom: ['21'], honestyGap: null },
  ],
};

// 首批范围（用户已确认：基础四科先行，约 150 节点）
// A 基础理论 / B 诊断学 / G 中药学 / L 方剂学
export const BATCH1_SUBJECTS = ['A', 'B', 'G', 'L'];

export const BATCH1_PLAN = {
  label: 'Phase 5 · Batch-1 · 基础四科 150 节点（A/B/G/L）',
  note: '目标区间取自蓝图 22.2；A/B 首批补足至目标上限（100%），G/L 首批起步，后续批次继续补足',
  perSubject: [
    { code: 'A', label: '基础理论', count: 28, note: '补足治则治法、病因病机深化、中医思维方法等缺口（127→155）' },
    { code: 'B', label: '诊断学',   count: 40, note: '补足问诊/闻诊/脉诊/八纲/脏腑辨证深化等缺口（125→165）' },
    { code: 'G', label: '中药学',   count: 42, note: '补足常用药 23 类核心药逐味学习单元（0→42 起步）' },
    { code: 'L', label: '方剂学',   count: 40, note: '补足常用方剂（解表/清热/补益等类）（25→65 起步）' },
  ],
};
