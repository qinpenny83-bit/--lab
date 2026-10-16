// ============================================================
// 杏林大典 · Phase 4 · coverage-matrix Batch-4 更新器（最终版）
// 作用：把 Batch-4 的 105 个节点 verdict 回写矩阵，输出 305 全覆盖统计。
// 运行：node phase-4/update-coverage-b4.mjs
// ============================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'phase-4');
const matrix = JSON.parse(readFileSync(join(OUT, 'coverage-matrix.json'), 'utf8'));

// ---------- 收集 Batch-2/3/4 verdict ----------
const verdictById = {};
const metaById = {};
for (const b of ['batch-2', 'batch-3', 'batch-4']) {
  const samples = JSON.parse(readFileSync(join(OUT, b, 'samples.json'), 'utf8')).samples;
  for (const s of samples) {
    metaById[s.id] = { title: s.title, category: s.category, difficulty: s.difficulty, difficultyLabel: s.difficultyLabel };
  }
  for (const v of ['candidates', 'conditional', 'quarantine']) {
    const doc = JSON.parse(readFileSync(join(OUT, b, `${v}.json`), 'utf8'));
    const verdict = v === 'candidates' ? 'candidate' : v;
    for (const s of doc.samples || []) verdictById[s.id] = verdict;
  }
}

const nodeIdFromId = (id) => {
  const m = /^pb\d+-[a-z]+-(\d{2})-(\d{2})$/.exec(id);
  return m ? `${m[1]}-${m[2]}` : null;
};

const verdictByNode = {};
for (const [id, v] of Object.entries(verdictById)) {
  const nodeId = nodeIdFromId(id);
  if (nodeId) verdictByNode[nodeId] = v;
}

// ---------- 回写矩阵 ----------
let updated = 0;
const conflict = [];
for (const row of matrix.rows) {
  const v = verdictByNode[row.nodeId];
  if (!v) continue;
  if (row.status !== 'pending' && row.status !== 'legacy') {
    conflict.push({ nodeId: row.nodeId, was: row.status, now: v });
  }
  row.status = v;
  row.nodeStatus = v;
  row.sourceStatus = v === 'candidate' ? 'verified' : v === 'conditional' ? 'conditional' : 'quarantine';
  row.learningStatus = 'ready';
  row.producedBy = [...new Set([...(row.producedBy || []), ...Object.keys(verdictById).filter((id) => nodeIdFromId(id) === row.nodeId)])];
  updated++;
}

// ---------- 重算统计 ----------
const byStatus = {};
for (const r of matrix.rows) byStatus[r.status] = (byStatus[r.status] || 0) + 1;
const total = matrix.rows.length;
const produced = matrix.rows.filter((r) => ['candidate', 'conditional', 'quarantine'].includes(r.status));
const legacy = matrix.rows.filter((r) => r.status === 'legacy');
const pending = matrix.rows.filter((r) => r.status === 'pending');

matrix.generatedAt = new Date().toISOString();
matrix.totals = { total, produced: produced.length, legacy: legacy.length, pending: pending.length, byStatus };
matrix.summary = {
  producedThemes: produced.map((r) => r.nodeId),
  legacyThemes: legacy.map((r) => r.nodeId),
  pendingThemes: pending.map((r) => r.nodeId),
  assetCount: matrix.summary?.assetCount || 0,
  assetsByNode: matrix.summary?.assetsByNode || {},
  batchesApplied: ['batch-2', 'batch-3', 'batch-4'],
};

writeFileSync(join(OUT, 'coverage-matrix.json'), JSON.stringify(matrix, null, 2), 'utf8');

console.log(`updated=${updated} conflict=${conflict.length}`);
if (conflict.length) console.log('conflicts=', JSON.stringify(conflict));
console.log(`total=${total} produced=${produced.length} legacy=${legacy.length} pending=${pending.length}`);
console.log('byStatus=', JSON.stringify(byStatus));
console.log('coverage =', Math.round((produced.length / total) * 100) + '%');
