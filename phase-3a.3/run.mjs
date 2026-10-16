// ============================================================
// 杏林大典 · Phase 3A.3 · 定向收口执行器（targeted closure）
// 输入：samples.mjs（6 个定向样本，仅覆盖 3 类残余问题）
// 管线：phase-3a.1/pipeline.mjs（L1-L6 源头修复 + Gate A-K + E 分层 + F/G 人工复核）
// 输出：summary.json / trace.json
// 运行：node phase-3a.3/run.mjs
// ============================================================
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SAMPLES, SEED, GEN_LABEL } from './samples.mjs';
import {
  runPipeline,
  antiTemplating,
  runGates,
  humanReviewRequired,
  evidenceTier,
  EVIDENCE_TIER_LABEL,
} from '../phase-3a.1/pipeline.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;

const REVIEW_MARK = /待核验|首出须核验|无权威出处表记录/;
function classify(gateFails, corrections, humanReview) {
  if (gateFails.length > 0) return 'quarantine';
  if (humanReview) return 'conditional';
  if (corrections.some((c) => REVIEW_MARK.test(c.reason || ''))) return 'conditional';
  return 'candidate';
}

const results = SAMPLES.map((raw) => {
  const { normalized, corrections, gateFails } = runPipeline(raw);
  return { raw, normalized, corrections, gateFails };
});

// 批级反模板（本批 stdJudgment 均为空，无 H，仍保留调用以保持链路一致）
const batchCorrections = [];
antiTemplating(results.map((r) => r.normalized), batchCorrections);

for (const r of results) {
  r.finalGateFails = runGates(r.normalized);
  // 证据分层（仅对含 cases 的样本，用于报告展示）
  if (r.normalized.cases && Array.isArray(r.normalized.cases.c3Evidence)) {
    r.evidenceLayers = r.normalized.cases.c3Evidence
      .filter((x) => String(x || '').trim())
      .map((x) => ({ text: x, tier: evidenceTier(x), tierLabel: EVIDENCE_TIER_LABEL[evidenceTier(x)] }));
  } else {
    r.evidenceLayers = [];
  }
  r.humanReviewRequired = humanReviewRequired(r.normalized);
  r.verdict = classify(r.finalGateFails, r.corrections, r.humanReviewRequired);
}

const counts = { candidate: 0, conditional: 0, quarantine: 0 };
for (const r of results) counts[r.verdict]++;

const summary = {
  seed: SEED,
  genLabel: GEN_LABEL,
  total: SAMPLES.length,
  counts,
  samples: results.map((r) => ({
    id: r.raw.id,
    title: r.raw.title,
    category: r.raw.category,
    intent: r.raw.intent,
    verdict: r.verdict,
    evidenceLayers: r.evidenceLayers,
    humanReviewRequired: r.humanReviewRequired,
    corrections: r.corrections.map((c) => ({ layer: c.layer, kind: c.kind, reason: c.reason })),
    gateFails: r.finalGateFails,
  })),
};

const trace = results.map((r) => ({
  id: r.raw.id,
  title: r.raw.title,
  intent: r.raw.intent,
  rawClassics: r.raw.classics,
  fixedClassics: r.normalized.classics,
  corrections: r.corrections,
  gateFails: r.finalGateFails,
  humanReviewRequired: r.humanReviewRequired,
  verdict: r.verdict,
}));

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'summary.json'), JSON.stringify(summary, null, 2));
writeFileSync(join(OUT, 'trace.json'), JSON.stringify(trace, null, 2));

console.log('================ Phase 3A.3 Targeted Closure ================');
console.log('total =', SAMPLES.length, ' counts =', JSON.stringify(counts));
for (const r of results) {
  console.log(`\n[${r.verdict.toUpperCase()}] ${r.raw.id} (${r.raw.title})`);
  if (r.evidenceLayers.length) {
    console.log('  evidence layers:', r.evidenceLayers.map((e) => `${e.tier}·${e.tierLabel}`).join(', '));
  }
  if (r.humanReviewRequired) console.log('  human_review_required =', true);
  for (const c of r.corrections) console.log(`  fix[${c.kind}]@${c.layer}: ${c.reason}`);
  for (const f of r.finalGateFails) console.log(`  gate[${f.gate}]: ${f.note}`);
}
console.log('\n===============================================================');