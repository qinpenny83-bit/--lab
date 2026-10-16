// ============================================================
// 杏林大典 · Phase 4 · Batch-4 · 安全红线目录（safety-catalog）
// —— 高危内容的唯一权威事实源，独立于生成器 ——
// 数据来源与 phase-3a.1/source-catalog.mjs 完全一致（单一事实源），
// 本文件只负责「本批应用视图」：自动统计 Batch-4 实际命中条目。
// ============================================================
import {
  BANNED_HERBS,
  FORBIDDEN_ACUPOINTS,
  HIGH_RISK_HERBS,
  DOSE_RISKS,
  SPECIAL_POPULATIONS,
} from '../../phase-3a.1/source-catalog.mjs';

export const BANNED = BANNED_HERBS;
export const FORBIDDEN_ACUPOINTS_CATALOG = FORBIDDEN_ACUPOINTS;
export const HIGH_RISK = HIGH_RISK_HERBS;
export const DOSE_RISK_CATALOG = DOSE_RISKS;
export const POPULATION_CATALOG = SPECIAL_POPULATIONS;

// —— 自动统计：从节点列表计算本批命中条目（不手工维护，防遗漏）——
function collectHits(nodes) {
  const herbs = new Set();
  const acupoints = new Set();
  const dose = new Set();
  const populations = new Set();
  for (const n of nodes || []) {
    if (n.category === 'herb') {
      if (BANNED[n.title]) herbs.add(`${n.title}(禁用)`);
      else if (HIGH_RISK[n.title]) herbs.add(`${n.title}(高风险)`);
    }
    if (n.category === 'acupoint' && FORBIDDEN_ACUPOINTS[n.title]) acupoints.add(n.title);
    const d = n.dosage || {};
    const dosText = `${d.originalDosage || ''} ${d.modernDosage || ''}`;
    for (const [k, v] of Object.entries(DOSE_RISKS)) {
      if (k && (dosText.includes(k) || (n.title && k.includes(n.title)))) dose.add(k);
    }
    const s = n.safety || {};
    if (s.prohibitions && Array.isArray(s.prohibitions)) {
      const joined = s.prohibitions.join(' ');
      for (const [k, v] of Object.entries(SPECIAL_POPULATIONS)) {
        if (k && joined.includes(k)) populations.add(k);
      }
    }
  }
  return { herbs: [...herbs], acupoints: [...acupoints], dose: [...dose], populations: [...populations] };
}

export function buildSafetyCatalogDoc(seed, genLabel, nodes) {
  const coverage = collectHits(nodes);
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
    batchCoverage: coverage,
    pending: [],
    quarantine: [],
  };
}
