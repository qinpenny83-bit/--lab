// Batch-4 E/F/G 拦截诊断：输出每个被拦节点的语义门判定细节
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SAMPLES_P4_1 } from './samples-part1.mjs';
import { SAMPLES_P4_2 } from './samples-part2.mjs';
import { SAMPLES_P4_3 } from './samples-part3.mjs';
import { SAMPLES_P4_4 } from './samples-part4.mjs';
import { semanticReasoningGates, evidenceTier, EVIDENCE_TIER_LABEL } from '../../phase-3a.1/pipeline.mjs';

const ALL = [...SAMPLES_P4_1, ...SAMPLES_P4_2, ...SAMPLES_P4_3, ...SAMPLES_P4_4];

for (const s of ALL) {
  if (!s.cases) continue;
  const c = s.cases;
  const isNewModel = c.level || Array.isArray(c.c3Evidence) || typeof c.counterEvidence === 'string' || typeof c.revision === 'string';
  if (!isNewModel) continue;
  const gates = semanticReasoningGates(c);
  const keys = Object.keys(gates);
  if (keys.length === 0) continue;
  const ev = (c.c3Evidence || []).filter((x) => String(x || '').trim());
  console.log(`\n[${s.id}] ${s.title} level=${c.level}`);
  console.log('  fields:', Object.keys(c).join(','));
  console.log('  c3Evidence count:', ev.length);
  ev.forEach((e, i) => console.log(`    e${i + 1} tier=${evidenceTier(e)}(${EVIDENCE_TIER_LABEL[evidenceTier(e)]}) :: ${String(e).slice(0, 40)}`));
  if (c.counterEvidence) console.log('  counterEvidence:', String(c.counterEvidence).slice(0, 60));
  if (c.revision) console.log('  revision:', String(c.revision).slice(0, 60));
  console.log('  gate results:', JSON.stringify(gates, null, 2));
}
