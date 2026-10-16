// Batch-4 E/F/G 拦截诊断：汇总所有被拦节点 → diag-result.json
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SAMPLES_P4_1 } from './samples-part1.mjs';
import { SAMPLES_P4_2 } from './samples-part2.mjs';
import { SAMPLES_P4_3 } from './samples-part3.mjs';
import { SAMPLES_P4_4 } from './samples-part4.mjs';
import { semanticReasoningGates, evidenceTier, EVIDENCE_TIER_LABEL } from '../../phase-3a.1/pipeline.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ALL = [...SAMPLES_P4_1, ...SAMPLES_P4_2, ...SAMPLES_P4_3, ...SAMPLES_P4_4];
const rows = [];

for (const s of ALL) {
  if (!s.cases) continue;
  const c = s.cases;
  const isNewModel = c.level || Array.isArray(c.c3Evidence) || typeof c.counterEvidence === 'string' || typeof c.revision === 'string';
  if (!isNewModel) continue;
  const gates = semanticReasoningGates(c);
  const keys = Object.keys(gates);
  const ev = (c.c3Evidence || []).filter((x) => String(x || '').trim());
  rows.push({
    id: s.id,
    title: s.title,
    level: c.level,
    fields: Object.keys(c),
    evidenceCount: ev.length,
    evidenceTiers: ev.map((e) => `${evidenceTier(e)}(${EVIDENCE_TIER_LABEL[evidenceTier(e)]})`),
    counterEvidence: c.counterEvidence ? String(c.counterEvidence).slice(0, 80) : null,
    revision: c.revision ? String(c.revision).slice(0, 80) : null,
    gateResults: gates,
    status: keys.length === 0 ? 'PASS' : (gates.humanReviewRequired && keys.length === 1 ? 'REVIEW' : 'BLOCKED'),
  });
}

const blocked = rows.filter((r) => r.status === 'BLOCKED');
const review = rows.filter((r) => r.status === 'REVIEW');
const pass = rows.filter((r) => r.status === 'PASS');
const summary = {
  totalCases: rows.length,
  blocked: blocked.length,
  review: review.length,
  pass: pass.length,
  gateCounts: {
    E: blocked.filter((r) => r.gateResults.E).length,
    F: blocked.filter((r) => r.gateResults.F).length,
    G: blocked.filter((r) => r.gateResults.G).length,
  },
  blockedIds: blocked.map((r) => r.id),
};
writeFileSync(join(__dirname, 'diag-result.json'), JSON.stringify({ summary, blocked, review, pass }, null, 2), 'utf8');
console.log(JSON.stringify(summary, null, 2));
