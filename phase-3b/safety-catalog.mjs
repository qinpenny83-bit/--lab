// ============================================================
// 杏林大典 · Phase 3B · 安全红线目录（safety-catalog）
// —— 高危内容的唯一权威事实源，独立于生成器 ——
// 规则（Phase 3A.3 确认）：高危目录必须由权威处方/禁忌来源同步扩充，
// 不能由生成器自己推断；本批 50 节点实际出现的风险条目全部在此登记；
// 任何风险无法确认 → pending/quarantine，绝不猜测。
// 数据来源：见每项 note 字段（《中国药典》一部 / 规划教材 / 古训出处）
// 本文件是 phase-3a.1/source-catalog.mjs 安全部分的「本批应用视图」，
// 管线仍从 source-catalog.mjs 读取（单一事实源），本文件用于独立核验与输出。
// ============================================================
import {
  BANNED_HERBS,
  FORBIDDEN_ACUPOINTS,
  HIGH_RISK_HERBS,
  DOSE_RISKS,
  SPECIAL_POPULATIONS,
} from '../phase-3a.1/source-catalog.mjs';

// —— 已禁用（马兜铃酸类，药典剔除）——
export const BANNED = BANNED_HERBS;

// —— 禁针/慎针腧穴 ——
export const FORBIDDEN_ACUPOINTS_CATALOG = FORBIDDEN_ACUPOINTS;

// —— 高风险药材（毒性/剂量/配伍/人群）——
export const HIGH_RISK = HIGH_RISK_HERBS;

// —— 剂量风险（古训与药典分层）——
export const DOSE_RISK_CATALOG = DOSE_RISKS;

// —— 特殊人群 ——
export const POPULATION_CATALOG = SPECIAL_POPULATIONS;

// —— 本批 50 节点实际命中条目索引（供验收核对，节点侧在 samples 中登记）——
export const BATCH_COVERAGE = {
  herbs: ['附子', '细辛', '半夏', '麻黄', '甘草', '甘遂', '大戟', '芫花'],
  acupoints: ['合谷', '三阴交', '哑门', '风府', '关元'],
  dose: ['细辛不过钱', '附子先煎', '麻黄用量', '石膏先煎'],
  populations: ['妊娠', '儿童', '出血倾向'],
};

// —— 输出用汇总文档（run.mjs 据此写 safety-catalog.json）——
export function buildSafetyCatalogDoc(seed, genLabel) {
  return {
    seed,
    genLabel,
    status: 'active',
    note: '权威安全红线目录：已禁用/高风险药材、禁针穴、剂量风险、特殊人群。来源为药典/规划教材/有据古训；管线 L4 从 source-catalog.mjs 注入警示，Gate J 兜底；生成器不得自行推断风险。',
    bannedHerbs: Object.fromEntries(Object.entries(BANNED).map(([k, v]) => [k, { redline: v.redline, reason: v.reason }])),
    highRiskHerbs: Object.fromEntries(Object.entries(HIGH_RISK).map(([k, v]) => [k, {
      toxicity: v.toxicity, doseRisk: v.doseRisk, incompatibility: v.incompatibility,
      population: v.population, redline: v.redline,
    }])),
    forbiddenAcupoints: Object.fromEntries(Object.entries(FORBIDDEN_ACUPOINTS_CATALOG).map(([k, v]) => [k, { redline: v.redline }])),
    doseRisks: Object.fromEntries(Object.entries(DOSE_RISK_CATALOG).map(([k, v]) => [k, { source: v.source, rule: v.rule, note: v.note }])),
    specialPopulations: Object.fromEntries(Object.entries(POPULATION_CATALOG).map(([k, v]) => [k, { herbs: v.herbs, acupoints: v.acupoints, note: v.note }])),
    batchCoverage: BATCH_COVERAGE,
    pending: [],
    quarantine: [],
  };
}
