// ============================================================
// 杏林大典 · Phase 5 · coverage-matrix Batch-3 更新器
// 作用：把 Batch-3 的 30 个节点 verdict 回写 33 学科矩阵。
// 运行：node phase-5/update-coverage-b3.mjs
// ============================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const matrix = JSON.parse(readFileSync(join(OUT, 'coverage-matrix.json'), 'utf8'));

// ---------- 收集 Batch-3 verdict ----------
const verdictById = {};
const metaById = {};
{
  const samples = JSON.parse(readFileSync(join(OUT, 'batch-3', 'samples.json'), 'utf8')).samples;
  for (const s of samples) {
    metaById[s.id] = { title: s.title, category: s.category, difficulty: s.difficulty, difficultyLabel: s.difficultyLabel };
  }
  for (const v of ['candidates', 'conditional', 'quarantine']) {
    const doc = JSON.parse(readFileSync(join(OUT, 'batch-3', `${v}.json`), 'utf8'));
    const verdict = v === 'candidates' ? 'candidate' : v;
    for (const s of doc.samples || []) verdictById[s.id] = verdict;
  }
}

// ---------- 学科映射：pb5-ac-* → D（腧穴学） ----------
const SUBJECT_OF_ID = { ac: 'D' };
const subjectOf = (id) => {
  const m = /^pb5-([a-z]+)-\d+$/.exec(id);
  return m ? SUBJECT_OF_ID[m[1]] : null;
};

// ---------- 追加新节点行 ----------
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

const batchesApplied = matrix.totals?.batchesApplied || ['phase-5/batch-1', 'phase-5/batch-2'];
if (!batchesApplied.includes('phase-5/batch-3')) batchesApplied.push('phase-5/batch-3');

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
  batchesApplied,
};

writeFileSync(join(OUT, 'coverage-matrix.json'), JSON.stringify(matrix, null, 2), 'utf8');

console.log(`added=${added} refreshed=${refreshed} skipped=${skipped.length}`);
console.log(`totalNodes=${totalNodes} produced=${produced.length} legacy=${legacy.length} pending=${pending.length}`);
console.log('byStatus=', JSON.stringify(byStatus));
console.log('grandGap =', matrix.totals.grandGapLow, '-', matrix.totals.grandGapHigh);
for (const code of ['C', 'D']) {
  const s = matrix.subjects.find((x) => x.code === code);
  console.log(`${s.code} ${s.name}: migrated=${s.migrated} target=${s.target[0]}-${s.target[1]} gap=${s.gapLow}-${s.gapHigh}`);
}
