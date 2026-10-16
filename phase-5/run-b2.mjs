// ============================================================
// 杏林大典 · Phase 5 · Batch-2 · 55 节点执行器（C 经络学 25 + D 腧穴学 30）
// 管线：phase-3a.1/pipeline.mjs（L1–L6 源头修复 + Gate A–K 不变式）
// 内容质量层：Q1–Q8 预审（独立于工程 Gate）+ 机器味检测 + 难度分布
// 样本：C1(13)+C2(12) + D1(15)+D2(15) = 55
// 覆盖：33 学科蓝图（Content Bible v2.0）针灸系列 C 经络学/D 腧穴学
//       目标区间 C[35,45]、D[60,75]，本批为下限以下首产（C 25/D 30）
// 输出：samples.json / candidates.json / conditional.json /
//       quarantine.json / trace.json / content-quality-review.json /
//       safety-catalog.json / summary.json
// 运行：node phase-5/run-b2.mjs
// ============================================================
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SAMPLES_PART_C1 } from './batch-2/samples-part-c1.mjs';
import { SAMPLES_PART_C2 } from './batch-2/samples-part-c2.mjs';
import { SAMPLES_PART_D1 } from './batch-2/samples-part-d1.mjs';
import { SAMPLES_PART_D2 } from './batch-2/samples-part-d2.mjs';
import {
  runPipeline,
  antiTemplating,
  runGates,
  semanticReasoningGates,
} from '../phase-3a.1/pipeline.mjs';
import { buildSafetyCatalogDoc } from './safety-catalog.mjs';
import { BANNED_HERBS, HIGH_RISK_HERBS, FORBIDDEN_ACUPOINTS, CLASSIC_ATTRIBUTION } from '../phase-3a.1/source-catalog.mjs';
import { CLASSIC_ATTRIBUTION_PATCH } from './classic-patch.mjs';

// —— 出处补丁注入：Batch-2 样本引用的经络/腧穴经典原文（《灵枢》《素问》
//    《难经》等），经逐条核对后运行时补入白名单（不改 phase-3a.1 权威文件）——
Object.assign(CLASSIC_ATTRIBUTION, CLASSIC_ATTRIBUTION_PATCH);

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'batch-2');

const SEED = 'phase-5/batch-2';
const GEN_LABEL = 'Phase 5 · Batch-2 · 55 nodes（C 经络学 25 + D 腧穴学 30，33 学科蓝图针灸系列）';

const SAMPLES = [
  ...SAMPLES_PART_C1, ...SAMPLES_PART_C2,
  ...SAMPLES_PART_D1, ...SAMPLES_PART_D2,
];

// —— 分类：conditional 的「需人工复核」标记 ——
const REVIEW_MARK = /待核验|首出须核验|无权威出处表记录|humanReviewRequired|暂缓判断/;
function classify(gateFails, corrections, normalized) {
  if (gateFails.length > 0) return 'quarantine';
  const needReview = corrections.some((c) => REVIEW_MARK.test(c.reason || ''));
  const c4review = normalized.cases && semanticReasoningGates(normalized.cases).humanReviewRequired;
  return needReview || c4review ? 'conditional' : 'candidate';
}

// ============================================================
// 内容质量层（独立于工程 Gate，预审标记，最终裁决留人工）
// Q1 factual_clarity / Q2 learning_value / Q3 reasoning_value /
// Q4 difficulty_fit / Q5 differentiation / Q6 classical_depth /
// Q7 language_quality / Q8 actionability
// ============================================================
const MACHINE_PATTERNS = [
  /请根据所学知识/, /综合考虑/, /由此可知/, /需要注意的是/, /通过以上分析/,
  /综上所述/, /总而言之/, /进一步分析/, /辩证看待/, /众所周知/, /显而易见/,
  /值得我们/, /充分地/, /在临床实践中/, /我们应当/, /需要注意的是/,
  /进行辨证论治/, /根据患者情况/, /适当调整/,
];
function machineLikeHits(texts) {
  const hits = [];
  for (const t of texts) {
    for (const p of MACHINE_PATTERNS) {
      if (p.test(String(t || ''))) hits.push(p.source);
    }
  }
  return [...new Set(hits)];
}

function contentQualityReview(node, index, batch) {
  const learning = node.learning || {};
  const allTexts = [node.stdJudgment, node.coreDefinition, learning.knowledge, learning.misjudgment, learning.reasoning, learning.feedback, learning.transfer];
  const mlHits = machineLikeHits(allTexts);

  const factsOk = (node.facts || []).filter((f) => f.sourceTitle && f.sourceType && f.status).length;
  const Q1 = {
    score: factsOk === (node.facts || []).length && (node.facts || []).length > 0 ? 'pass' : 'review',
    note: factsOk === (node.facts || []).length ? `事实 ${factsOk}/${(node.facts || []).length} 条来源要素齐全` : `事实来源要素不全 ${factsOk}/${(node.facts || []).length}`,
  };

  const catKeyword = {
    herb: /归.*经|性味|药性|有毒|功效|主治|配伍|剂量|炮制|化痰|清热|泻火|大补|调和|先煎/,
    formula: /功效|主治|组成|方源|配伍|剂量|出自|原方/,
    acupoint: /定位|主治|经脉|穴|配伍|横纹|棘突|凹陷/,
    theory: /原文|出处|《|机制|关系|分类|功能|学说|辨证|病机|传变|病因|外感|气血|津液|交会|经脉|循行|流注/,
    clinical: /证|症状|舌|脉|方|治|证据|病机|判断|寒热|虚实/,
    diagnostic: /舌|脉|望|闻|问|切|色|苔|诊/,
    case: /医案|辨证|方|证|转方|疗效|证据/,
  };
  const hasConcrete = catKeyword[node.category] ? catKeyword[node.category].test(String(learning.knowledge || '')) : false;
  const Q2 = {
    score: hasConcrete ? 'pass' : 'review',
    note: hasConcrete ? 'knowledge 含具体知识点' : 'knowledge 偏概括，缺具体知识点',
  };

  const hasQuestion = /？|\?/.test(String(learning.reasoning || ''));
  const hasTrap = learning.misjudgment && String(learning.misjudgment).length >= 15;
  const Q3 = {
    score: hasQuestion && hasTrap ? 'pass' : 'review',
    note: `${hasQuestion ? 'reasoning 为问句' : 'reasoning 非问句'};${hasTrap ? 'misjudgment 含具体陷阱' : 'misjudgment 偏笼统'}`,
  };

  const Q4 = {
    score: [1, 2, 3, 4, 5].includes(node.difficulty) ? 'pass' : 'fail',
    note: `difficulty=${node.difficulty} 合法，难度匹配须人工核对`,
  };

  const dupCount = batch.filter((b) => b && b.stdJudgment === node.stdJudgment).length;
  const Q5 = {
    score: dupCount === 1 ? 'pass' : 'review',
    note: dupCount === 1 ? 'stdJudgment 批次内唯一' : `stdJudgment 与 ${dupCount - 1} 个节点重复`,
  };

  const classics = node.classics || [];
  const hasClassicAnchor = classics.length > 0 || (node.facts || []).some((f) => f.sourceType === 'classic_original');
  const realClassics = classics.filter((c) => c.status === 'verified' || (c.sourceType === 'classic_original'));
  const teachingLabels = classics.filter((c) => c.status === 'teaching_inference' || c.sourceType === 'traditional_commentary' || c.sourceType === 'teaching_design');
  const hasOriginalText = classics.some((c) => c.originalText);
  let Q6;
  if (!hasClassicAnchor) Q6 = { score: 'na', note: '不涉及经典', hits: [] };
  else if (realClassics.length > 0 && !hasOriginalText) Q6 = { score: 'review', note: '真实经典条目无原文，待人工核原文', hits: realClassics.map((c) => c.label) };
  else Q6 = { score: 'pass', note: teachingLabels.length > 0 ? `教学/后世条目已正确分层（${teachingLabels.length} 条）` : '经典条目带原文或已分层', hits: [] };

  const Q7 = {
    score: mlHits.length === 0 ? 'pass' : 'review',
    hits: mlHits,
    note: mlHits.length === 0 ? '未检出机器味句式' : `检出机器味句式 ${mlHits.join('、')}`,
  };

  const Q8 = {
    score: learning.transfer && String(learning.transfer).length >= 10 ? 'pass' : 'review',
    note: learning.transfer ? 'transfer 提供可迁移的新情境' : '缺 transfer 迁移情境',
  };

  return {
    nodeId: node.id,
    title: node.title,
    category: node.category,
    Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8,
    machineLikeCount: mlHits.length,
    reviewer: 'human (待人工审核)',
    preliminary: mlHits.length === 0 && Q1.score === 'pass' && Q2.score === 'pass' && Q3.score === 'pass' && Q5.score === 'pass' && Q8.score === 'pass' ? 'content-candidate' : 'content-review',
  };
}

// ============================================================
// 逐节点运行 6 层源头修复 + Gate + 内容质量层
// ============================================================
const results = SAMPLES.map((raw) => {
  const { normalized, corrections, gateFails } = runPipeline(raw);
  return { raw, normalized, corrections, gateFails };
});

const batchCorrections = [];
antiTemplating(results.map((r) => r.normalized), batchCorrections);
for (const r of results) {
  if (r.normalized.templated?.isTemplated) {
    r.corrections.push({
      layer: '反模板',
      kind: 'H',
      reason: `「${r.normalized.title}」standardJudgment 与其他节点重复/包含（模板化），须重写`,
    });
  }
  r.finalGateFails = runGates(r.normalized);
  r.verdict = classify(r.finalGateFails, r.corrections, r.normalized);
  r.quality = contentQualityReview(r.normalized, 0, SAMPLES);
}

// —— 难度分布 ——
const difficultyBands = { basic: [1, 2], mid: [3], hard: [4], mixed: [5] };
const bandLabel = { basic: '基础(1–2)', mid: '中等(3)', hard: '困难(4)', mixed: '易混/综合(5)' };
const diffDist = { basic: 0, mid: 0, hard: 0, mixed: 0 };
for (const s of SAMPLES) {
  for (const [k, vals] of Object.entries(difficultyBands)) {
    if (vals.includes(s.difficulty)) { diffDist[k]++; break; }
  }
}
const diffTotal = SAMPLES.length;
const diffPercent = Object.fromEntries(Object.entries(diffDist).map(([k, v]) => [k, { count: v, pct: Math.round((v / diffTotal) * 100) }]));
const byCategory = {};
for (const s of SAMPLES) (byCategory[s.category] ||= []).push(s.difficulty);

// ============================================================
// 汇总统计
// ============================================================
const counts = { candidate: 0, conditional: 0, quarantine: 0 };
for (const r of results) counts[r.verdict]++;

const gateFailByLetter = {};
for (const r of results) {
  for (const f of r.finalGateFails) {
    (gateFailByLetter[f.gate] ||= []).push({ id: r.raw.id, title: r.normalized.title, note: f.note });
  }
}

const correctionByKind = {};
for (const r of results) {
  for (const c of r.corrections) {
    (correctionByKind[c.kind] ||= []).push({ id: r.raw.id, title: r.normalized.title, layer: c.layer, reason: c.reason });
  }
}

const LAYERS = ['来源解析', '知识分类', '剂量分层', '安全红线', '反模板', 'FactAudit触发', '事实采集'];
const correctionByLayer = {};
for (const r of results) {
  for (const c of r.corrections) {
    (correctionByLayer[c.layer] ||= []).push({ id: r.raw.id, kind: c.kind, reason: c.reason });
  }
}

// —— Leak-through：Gate 拦截数与源头修复数的对比 ——
const leakThrough = Object.fromEntries(
  ['A', 'B', 'C', 'D', 'H', 'J', 'K'].map((g) => {
    const gateBlocked = (gateFailByLetter[g] || []).length;
    const sourceFixed = (correctionByKind[g] || []).length;
    return [g, { sourceFixed, gateBlocked, leak: gateBlocked }];
  })
);

// —— 未知来源比例 ——
let unknownSourceCount = 0;
let totalFactCount = 0;
for (const r of results) {
  for (const f of r.normalized.facts || []) {
    totalFactCount++;
    if (/待核验|无权威出处/.test(String(f.sourceTitle || ''))) unknownSourceCount++;
  }
}

// —— 高危内容隔离率 ——
const catalogHit = (r) => {
  const t = r.normalized.title;
  if (r.normalized.category === 'herb') return BANNED_HERBS[t] ? 'banned' : (HIGH_RISK_HERBS[t] ? 'high' : null);
  if (r.normalized.category === 'acupoint') return FORBIDDEN_ACUPOINTS[t] ? 'forbidden' : null;
  return null;
};
const riskNodes = results.filter((r) => catalogHit(r));
const riskCovered = riskNodes.filter((r) => (r.normalized.safety?.prohibitions || []).some((p) => /高风险|已禁用|禁针|禁深刺|禁灸/.test(p))).length;
const highRiskIsolationRate = riskNodes.length > 0 ? Math.round((riskCovered / riskNodes.length) * 100) : 100;

// ============================================================
// trace（每节点完整链路）
// ============================================================
const trace = results.map((r) => ({
  nodeId: r.raw.id,
  title: r.raw.title,
  category: r.raw.category,
  difficulty: r.raw.difficulty,
  difficultyLabel: r.raw.difficultyLabel,
  source: (r.normalized.facts || []).map((f) => f.sourceTitle).filter(Boolean),
  sourceType: [...new Set((r.normalized.facts || []).map((f) => f.sourceType))],
  verificationStatus: [...new Set((r.normalized.facts || []).map((f) => f.status))],
  L1: r.corrections.filter((c) => c.layer === '来源解析'),
  L2: r.corrections.filter((c) => c.layer === '知识分类'),
  L3: r.corrections.filter((c) => c.layer === '剂量分层'),
  L4: r.corrections.filter((c) => c.layer === '安全红线'),
  L5: r.corrections.filter((c) => c.layer === '反模板'),
  L6: r.corrections.filter((c) => c.layer === 'FactAudit触发'),
  factCollection: r.corrections.filter((c) => c.layer === '事实采集'),
  gateResults: r.finalGateFails,
  contentQualityReview: r.quality,
  finalStatus: r.verdict,
}));

// ============================================================
// 写文件
// ============================================================
mkdirSync(OUT, { recursive: true });

const safetyCatalogDoc = buildSafetyCatalogDoc(SEED, GEN_LABEL, SAMPLES);

const samplesDoc = {
  seed: SEED, genLabel: GEN_LABEL, total: SAMPLES.length,
  note: '55 个真实知识节点（Batch-2：33 学科蓝图针灸系列 C 经络学 25 / D 腧穴学 30），含学习关卡设计（知识→辨析→推理→反馈→迁移）与风险登记。C/D 为首产，未达目标区间下限，后续批次继续补足。',
  samples: SAMPLES.map((s) => ({
    id: s.id, title: s.title, category: s.category, difficulty: s.difficulty,
    difficultyLabel: s.difficultyLabel, riskTags: s.riskTags, intent: s.intent,
    learning: s.learning,
  })),
};

const passResults = results.filter((r) => r.verdict !== 'quarantine');
const quarantineResults = results.filter((r) => r.verdict === 'quarantine');
const conditionalResults = passResults.filter((r) => r.verdict === 'conditional');
const candidateResults = passResults.filter((r) => r.verdict === 'candidate');

const candidatesDoc = {
  seed: SEED, genLabel: GEN_LABEL,
  note: 'candidate = Gate 全绿且源头修复无需人工复核（含 C4 语义门通过但无 humanReviewRequired 标记者）。candidate ≠ 正式知识，须经 contentQualityReview + human review 后方可进入 Canonical Knowledge。',
  counts: { candidate: candidateResults.length },
  samples: candidateResults.map((r) => ({
    id: r.raw.id, title: r.raw.title, category: r.raw.category,
    difficulty: r.raw.difficulty, difficultyLabel: r.raw.difficultyLabel,
    corrections: r.corrections.map((c) => ({ layer: c.layer, kind: c.kind, reason: c.reason })),
    qualityPreliminary: r.quality.preliminary,
  })),
};

const conditionalDoc = {
  seed: SEED, genLabel: GEN_LABEL,
  note: 'conditional = Gate 全绿但含「需人工复核」标记（出处待核 / C4 语义门 humanReviewRequired / 暂缓判断类）。须人工补核后转 candidate 或 quarantine。',
  counts: { conditional: conditionalResults.length },
  samples: conditionalResults.map((r) => ({
    id: r.raw.id, title: r.raw.title, category: r.raw.category,
    difficulty: r.raw.difficulty, difficultyLabel: r.raw.difficultyLabel,
    reviewReasons: r.corrections.filter((c) => REVIEW_MARK.test(c.reason || '')).map((c) => c.reason),
    humanReviewRequired: !!(r.normalized.cases && semanticReasoningGates(r.normalized.cases).humanReviewRequired),
    corrections: r.corrections.map((c) => ({ layer: c.layer, kind: c.kind, reason: c.reason })),
  })),
};

const quarantineDoc = {
  seed: SEED, genLabel: GEN_LABEL, counts: { quarantine: quarantineResults.length },
  note: '隔离 = Gate 最终不变式拦截（证据不足 / 反证无效 / 套话修正 / 模板化 / 非法来源枚举）。隔离即安全：不得自动放行。',
  samples: quarantineResults.map((r) => ({
    id: r.raw.id, title: r.raw.title, category: r.raw.category,
    difficulty: r.raw.difficulty, difficultyLabel: r.raw.difficultyLabel,
    riskTags: r.raw.riskTags, intent: r.raw.intent,
    gateFails: r.finalGateFails,
    corrections: r.corrections.map((c) => ({ layer: c.layer, kind: c.kind, reason: c.reason })),
  })),
};

const qualityReviewDoc = {
  seed: SEED, genLabel: GEN_LABEL, total: results.length,
  note: '内容质量层 Q1–Q8 预审：工程可测项（来源要素/机器味/差异化/关卡完整性）由管线独立检测；学习价值/难度匹配/经典深度等最终裁决须人工审核。',
  summary: {
    machineLikeHits: results.filter((r) => r.quality.machineLikeCount > 0).length,
    contentCandidate: results.filter((r) => r.quality.preliminary === 'content-candidate').length,
    contentReview: results.filter((r) => r.quality.preliminary === 'content-review').length,
  },
  reviews: results.map((r) => r.quality),
};

const summaryDoc = {
  seed: SEED, genLabel: GEN_LABEL, total: SAMPLES.length,
  counts,
  verdictBreakdown: { candidate: counts.candidate, conditional: counts.conditional, quarantine: counts.quarantine },
  engineering: {
    gateFailByLetter: Object.fromEntries(Object.entries(gateFailByLetter).map(([k, v]) => [k, { count: v.length, samples: v }])),
    correctionByKind: Object.fromEntries(Object.entries(correctionByKind).map(([k, v]) => [k, { count: v.length, samples: v }])),
    correctionByLayer: Object.fromEntries(Object.entries(correctionByLayer).map(([k, v]) => [k, { count: v.length }])),
    leakThrough,
    unknownSourceRatio: { unknown: unknownSourceCount, total: totalFactCount, pct: totalFactCount ? Math.round((unknownSourceCount / totalFactCount) * 100) : 0 },
    highRiskIsolationRate: { covered: riskCovered, nodes: riskNodes.length, pct: highRiskIsolationRate },
  },
  content: {
    difficultyDistribution: diffPercent,
    perCategory: byCategory,
    perCategoryDistinct: Object.fromEntries(Object.entries(byCategory).map(([k, v]) => [k, new Set(v).size])),
    machineLikeRepetition: results.filter((r) => r.quality.machineLikeCount > 0).map((r) => r.raw.id),
    contentPreliminary: { contentCandidate: results.filter((r) => r.quality.preliminary === 'content-candidate').length, contentReview: results.filter((r) => r.quality.preliminary === 'content-review').length },
    c3c4: {
      cLevels: Object.fromEntries(['C1', 'C2', 'C3', 'C4'].map((l) => [l, SAMPLES.filter((s) => s.cases && s.cases.level === l).length])),
      humanReviewRequired: results.filter((r) => r.normalized.cases && semanticReasoningGates(r.normalized.cases).humanReviewRequired).map((r) => r.raw.id),
      evidenceInsufficient: quarantineResults.filter((r) => r.finalGateFails.some((f) => f.gate === 'E')).map((r) => r.raw.id),
    },
  },
};

writeFileSync(join(OUT, 'samples.json'), JSON.stringify(samplesDoc, null, 2));
writeFileSync(join(OUT, 'candidates.json'), JSON.stringify(candidatesDoc, null, 2));
writeFileSync(join(OUT, 'conditional.json'), JSON.stringify(conditionalDoc, null, 2));
writeFileSync(join(OUT, 'quarantine.json'), JSON.stringify(quarantineDoc, null, 2));
writeFileSync(join(OUT, 'trace.json'), JSON.stringify(trace, null, 2));
writeFileSync(join(OUT, 'content-quality-review.json'), JSON.stringify(qualityReviewDoc, null, 2));
writeFileSync(join(OUT, 'safety-catalog.json'), JSON.stringify(safetyCatalogDoc, null, 2));
writeFileSync(join(OUT, 'summary.json'), JSON.stringify(summaryDoc, null, 2));

// ============================================================
// 控制台摘要
// ============================================================
console.log('================ Phase 5 Batch-2 · 55 Nodes（C25 + D30） ================');
console.log('seed =', SEED, ' label =', GEN_LABEL, ' total =', SAMPLES.length);
console.log('verdict counts:', JSON.stringify(counts));
console.log('\ngate fail (final):');
for (const [g, arr] of Object.entries(gateFailByLetter)) console.log(`  ${g}: ${arr.length}`, arr.map((x) => x.id).join(', '));
console.log('\nsource corrections by kind:');
for (const [k, arr] of Object.entries(correctionByKind)) console.log(`  ${k}: ${arr.length}`, [...new Set(arr.map((x) => x.id))].join(', '));
console.log('\nleak-through (sourceFixed → gateBlocked):');
for (const [g, v] of Object.entries(leakThrough)) console.log(`  ${g}: fixed=${v.sourceFixed} gateBlocked=${v.leak}`);
console.log('\nunknown source ratio:', `${unknownSourceCount}/${totalFactCount} (${Math.round((unknownSourceCount / totalFactCount) * 100)}%)`);
console.log('high-risk isolation rate:', `${riskCovered}/${riskNodes.length} (${highRiskIsolationRate}%)`);
console.log('\ndifficulty distribution:', JSON.stringify(diffPercent));
console.log('machine-like nodes:', results.filter((r) => r.quality.machineLikeCount > 0).map((r) => r.raw.id).join(', ') || '(none)');
console.log('content preliminary:', JSON.stringify(summaryDoc.content.contentPreliminary));
console.log('C levels:', JSON.stringify(summaryDoc.content.c3c4.cLevels));
console.log('==========================================================================');
