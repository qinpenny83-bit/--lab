// ============================================================
// 杏林大典 · Phase 5 · coverage-matrix Batch-1 更新器
// 作用：把 Batch-1 的 150 个节点 verdict 回写 33 学科矩阵，
//       追加新节点行 + 重算各学科 migrated/gap + 全局 totals。
// 运行：node phase-5/update-coverage-b1.mjs
// ============================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const matrix = JSON.parse(readFileSync(join(OUT, 'coverage-matrix.json'), 'utf8'));

// ---------- 收集 Batch-1 verdict ----------
const verdictById = {};
const metaById = {};
{
  const samples = JSON.parse(readFileSync(join(OUT, 'batch-1', 'samples.json'), 'utf8')).samples;
  for (const s of samples) {
    metaById[s.id] = { title: s.title, category: s.category, difficulty: s.difficulty, difficultyLabel: s.difficultyLabel };
  }
  for (const v of ['candidates', 'conditional', 'quarantine']) {
    const doc = JSON.parse(readFileSync(join(OUT, 'batch-1', `${v}.json`), 'utf8'));
    const verdict = v === 'candidates' ? 'candidate' : v;
    for (const s of doc.samples || []) verdictById[s.id] = verdict;
  }
}

// ---------- 学科映射：pb5-a-* → A、pb5-b-* → B、pb5-g-* → G、pb5-l-* → L ----------
const SUBJECT_OF_ID = { a: 'A', b: 'B', g: 'G', l: 'L' };
const subjectOf = (id) => {
  const m = /^pb5-([a-z]+)-\d+$/.exec(id);
  return m ? SUBJECT_OF_ID[m[1]] : null;
};

// ---------- 追加新节点行（已存在则回写 verdict/producedBy） ----------
const existingNodeIds = new Set(matrix.rows.map((r) => r.nodeId));
let added = 0;
let refreshed = 0;
const skipped = [];
for (const [id, verdict] of Object.entries(verdictById)) {
  const subject = subjectOf(id);
  if (!subject) { skipped.push(id); continue; }
  const meta = metaById[id] || {};
  if (existingNodeIds.has(id)) {
    const row = matrix.rows.find((r) => r.nodeId === id);
    if (row) {
      row.status = verdict;
      row.nodeStatus = verdict;
      row.sourceStatus = verdict === 'candidate' ? 'verified' : verdict;
      row.learningStatus = 'ready';
      row.subject = subject;
      if (!row.producedBy || !row.producedBy.includes(id)) row.producedBy = [id];
      refreshed++;
    }
    continue;
  }
  matrix.rows.push({
    nodeId: id,
    title: meta.title,
    category: meta.category,
    difficulty: meta.difficulty,
    difficultyLabel: meta.difficultyLabel,
    status: verdict,
    nodeStatus: verdict,
    sourceStatus: verdict === 'candidate' ? 'verified' : verdict,
    learningStatus: 'ready',
    subject,
    producedBy: [id],
  });
  added++;
}

// ---------- 重算 subjects ----------
const countBySubject = {};
for (const r of matrix.rows) {
  if (r.subject) countBySubject[r.subject] = (countBySubject[r.subject] || 0) + 1;
}
for (const s of matrix.subjects) {
  const n = countBySubject[s.code] || 0;
  s.migrated = n;
  s.gapLow = Math.max(0, s.target[0] - n);
  s.gapHigh = Math.max(0, s.target[1] - n);
}

// ---------- 重算 totals ----------
const byStatus = {};
for (const r of matrix.rows) byStatus[r.status] = (byStatus[r.status] || 0) + 1;
const totalNodes = matrix.rows.length;
const produced = matrix.rows.filter((r) => ['candidate', 'conditional', 'quarantine'].includes(r.status));
const legacy = matrix.rows.filter((r) => r.status === 'legacy');
const pending = matrix.rows.filter((r) => r.status === 'pending');

matrix.generatedAt = new Date().toISOString();
matrix.totals = {
  totalSubjects: 33,
  totalNodes,
  migratedNodes: matrix.rows.filter((r) => r.subject).length,
  unmigrated: matrix.rows.filter((r) => !r.subject).map((r) => r.nodeId),
  bySubject: matrix.subjects,
  grandTargetLow: matrix.subjects.reduce((a, s) => a + s.target[0], 0),
  grandTargetHigh: matrix.subjects.reduce((a, s) => a + s.target[1], 0),
  grandGapLow: matrix.subjects.reduce((a, s) => a + s.gapLow, 0),
  grandGapHigh: matrix.subjects.reduce((a, s) => a + s.gapHigh, 0),
  byStatus,
  produced: produced.length,
  legacy: legacy.length,
  pending: pending.length,
  batchesApplied: ['phase-5/batch-1'],
};

writeFileSync(join(OUT, 'coverage-matrix.json'), JSON.stringify(matrix, null, 2), 'utf8');

console.log(`added=${added} skipped=${skipped.length}`);
console.log(`totalNodes=${totalNodes} produced=${produced.length} legacy=${legacy.length} pending=${pending.length}`);
console.log('byStatus=', JSON.stringify(byStatus));
console.log('grandGap =', matrix.totals.grandGapLow, '-', matrix.totals.grandGapHigh);
for (const code of ['A', 'B', 'G', 'L']) {
  const s = matrix.subjects.find((x) => x.code === code);
  console.log(`${s.code} ${s.name}: migrated=${s.migrated} target=${s.target[0]}-${s.target[1]} gap=${s.gapLow}-${s.gapHigh}`);
}
