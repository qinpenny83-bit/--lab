// ============================================================
// 杏林大典 · Phase 3A.2 · Fresh 25 Random Pressure Test 执行器
// 输入：samples.mjs（25 全新随机样本）
// 管线：phase-3a.1/pipeline.mjs（L1-L6 源头修复 + Gate A-K 最后不变式）
// 输出：samples.json / candidates.json / quarantine.json / trace.json / summary.json
// 运行：node phase-3a.2/run.mjs
// ============================================================
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SAMPLES, SEED, GEN_LABEL } from './samples.mjs';
import {
  runPipeline,
  antiTemplating,
  runGates,
  checkDifficultyGradient,
} from '../phase-3a.1/pipeline.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;

// —— 分类：conditional 的「需人工复核」标记 ——
const REVIEW_MARK = /待核验|首出须核验|无权威出处表记录/;
function classify(gateFails, corrections) {
  if (gateFails.length > 0) return 'quarantine';
  const needReview = corrections.some((c) => REVIEW_MARK.test(c.reason || ''));
  return needReview ? 'conditional' : 'candidate';
}

// —— 逐节点运行 6 层源头修复 + Gate ——
const results = SAMPLES.map((raw) => {
  const { normalized, corrections, gateFails } = runPipeline(raw);
  return { raw, normalized, corrections, gateFails };
});

// —— 批级反模板（L5，跨节点），并把 H 修正写回对应节点 ——
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
  r.verdict = classify(r.finalGateFails, r.corrections);
}

// —— 难度梯度 ——
const gradient = checkDifficultyGradient(SAMPLES);
const byCategory = {};
for (const s of SAMPLES) (byCategory[s.category] ||= []).push(s.difficulty);
const perCatDistinct = Object.fromEntries(
  Object.entries(byCategory).map(([k, v]) => [k, new Set(v).size])
);

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

// —— 第一轮 7 类缺陷复发矩阵 ——
const ROUND1_DEFECTS = ['B', 'K', 'A', 'C', 'D', 'H', 'J'];
function distinctIds(arr) { return [...new Set((arr || []).map((x) => x.id))]; }
const defectMatrix = ROUND1_DEFECTS.map((d) => {
  const corrected = correctionByKind[d] || [];
  const blocked = gateFailByLetter[d] || [];
  const cIds = distinctIds(corrected);
  const bIds = distinctIds(blocked);
  const rawIds = [...new Set([...cIds, ...bIds])];
  return {
    defect: d,
    rawOccurrences: rawIds.length,
    caughtAtSource: { count: cIds.length, layers: [...new Set(corrected.map((x) => x.layer))], ids: cIds },
    blockedByGate: { count: bIds.length, ids: bIds },
  };
});

// —— 每节点完整链路（trace） ——
const trace = results.map((r) => ({
  id: r.raw.id,
  title: r.raw.title,
  category: r.raw.category,
  difficulty: r.raw.difficulty,
  difficultyLabel: r.raw.difficultyLabel,
  riskTags: r.raw.riskTags,
  intent: r.raw.intent,
  rawCandidate: r.raw,
  pipeline: {
    L1: r.corrections.filter((c) => c.layer === '来源解析'),
    L2: r.corrections.filter((c) => c.layer === '知识分类'),
    L3: r.corrections.filter((c) => c.layer === '剂量分层'),
    L4: r.corrections.filter((c) => c.layer === '安全红线'),
    L5: r.corrections.filter((c) => c.layer === '反模板'),
    L6: r.corrections.filter((c) => c.layer === 'FactAudit触发'),
    factCollection: r.corrections.filter((c) => c.layer === '事实采集'),
  },
  finalGateFails: r.finalGateFails,
  verdict: r.verdict,
}));

// ============================================================
// 写文件
// ============================================================
mkdirSync(OUT, { recursive: true });

const samplesDoc = {
  seed: SEED,
  genLabel: GEN_LABEL,
  total: SAMPLES.length,
  note: '25 个全新随机压力样本，均未出现在 Phase 3A 与 Phase 3A.1 regression 中；难度即 difficultyLabel 均与 difficulty 数值一致。',
  samples: SAMPLES.map((s) => ({
    id: s.id,
    title: s.title,
    category: s.category,
    difficulty: s.difficulty,
    difficultyLabel: s.difficultyLabel,
    riskTags: s.riskTags,
    intent: s.intent,
  })),
};

const passResults = results.filter((r) => r.verdict !== 'quarantine');
const quarantineResults = results.filter((r) => r.verdict === 'quarantine');

const candidatesDoc = {
  seed: SEED,
  genLabel: GEN_LABEL,
  note: 'candidate = Gate 全绿且源头修复无需人工复核；conditional = Gate 全绿但含「需人工复核」标记（白名单缺口 / 首出须核验）。二者均进入候选内容区，condition 须人工补 verified 后入库。',
  counts: { candidate: counts.candidate, conditional: counts.conditional },
  samples: passResults.map((r) => ({
    id: r.raw.id,
    title: r.raw.title,
    category: r.raw.category,
    difficulty: r.raw.difficulty,
    difficultyLabel: r.raw.difficultyLabel,
    verdict: r.verdict,
    corrections: r.corrections.map((c) => ({ layer: c.layer, kind: c.kind, reason: c.reason })),
    reviewRequired: r.corrections.filter((c) => REVIEW_MARK.test(c.reason || '')).map((c) => c.reason),
  })),
};

const quarantineDoc = {
  seed: SEED,
  genLabel: GEN_LABEL,
  counts: { quarantine: counts.quarantine },
  note: '隔离 = Gate 最终不变式拦截；源头层无法自动修复的异常（证据不足 / 反证无效 / 套话修正 / 模板化 / 非法来源枚举）。',
  samples: quarantineResults.map((r) => ({
    id: r.raw.id,
    title: r.raw.title,
    category: r.raw.category,
    difficulty: r.raw.difficulty,
    difficultyLabel: r.raw.difficultyLabel,
    riskTags: r.raw.riskTags,
    intent: r.raw.intent,
    gateFails: r.finalGateFails,
    corrections: r.corrections.map((c) => ({ layer: c.layer, kind: c.kind, reason: c.reason })),
  })),
};

const summaryDoc = {
  seed: SEED,
  genLabel: GEN_LABEL,
  total: SAMPLES.length,
  counts,
  verdictBreakdown: {
    candidate: counts.candidate,
    conditional: counts.conditional,
    quarantine: counts.quarantine,
  },
  gateFailByLetter: Object.fromEntries(
    Object.entries(gateFailByLetter).map(([k, v]) => [k, { count: v.length, samples: v }])
  ),
  correctionByKind: Object.fromEntries(
    Object.entries(correctionByKind).map(([k, v]) => [k, { count: v.length, samples: v }])
  ),
  defectMatrix,
  difficulty: {
    ladderLabelsOverall: gradient,
    perCategoryDistinct: perCatDistinct,
    perCategory: byCategory,
  },
};

writeFileSync(join(OUT, 'samples.json'), JSON.stringify(samplesDoc, null, 2));
writeFileSync(join(OUT, 'candidates.json'), JSON.stringify(candidatesDoc, null, 2));
writeFileSync(join(OUT, 'quarantine.json'), JSON.stringify(quarantineDoc, null, 2));
writeFileSync(join(OUT, 'trace.json'), JSON.stringify(trace, null, 2));
writeFileSync(join(OUT, 'summary.json'), JSON.stringify(summaryDoc, null, 2));

// ============================================================
// 控制台摘要
// ============================================================
console.log('================ Phase 3A.2 Fresh 25 Random Pressure Test ================');
console.log('seed =', SEED, ' label =', GEN_LABEL, ' total =', SAMPLES.length);
console.log('verdict counts:', JSON.stringify(counts));
console.log('\ngate fail (final):');
for (const [g, arr] of Object.entries(gateFailByLetter)) console.log(`  ${g}: ${arr.length}`, arr.map((x) => x.id).join(', '));
console.log('\nsource corrections by kind:');
for (const [k, arr] of Object.entries(correctionByKind)) console.log(`  ${k}: ${arr.length}`, distinctIds(arr).join(', '));
console.log('\ndefect matrix (round-1 7 types):');
for (const m of defectMatrix) {
  console.log(`  ${m.defect}: raw=${m.rawOccurrences} caught@source=${m.caughtAtSource.count} blocked@gate=${m.blockedByGate.count}`);
}
console.log('\nper-category distinct difficulty:', JSON.stringify(perCatDistinct));
console.log('overall gradient:', JSON.stringify(gradient));
console.log('===========================================================================');