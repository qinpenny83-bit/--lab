// ============================================================
// 杏林大典 · Phase 4 · coverage-matrix 增量更新器
// 作用：把 Batch-2 / Batch-3 已生产的 150 个节点 verdict
//       （candidate/conditional/quarantine）回写到 coverage-matrix，
//       并输出 Batch-4 待选题清单（剩余 pending + legacy 升级候选）。
// 口径：
//   id 格式 pb{n}-{cat}-{domain}-{topic} → nodeId = {domain}-{topic}
//   verdict 来源：candidates.json / conditional.json / quarantine.json
// 运行：node phase-4/update-coverage.mjs
// ============================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'phase-4');
const matrix = JSON.parse(readFileSync(join(OUT, 'coverage-matrix.json'), 'utf8'));

// ---------- 收集 Batch-2/3 的 verdict 与元信息 ----------
const verdictById = {};
const metaById = {};
for (const b of ['batch-2', 'batch-3']) {
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

// 每个 nodeId 可能对应多个生产 id（如 pb1 资产挂载），取最新批次 verdict
const verdictByNode = {};
for (const [id, v] of Object.entries(verdictById)) {
  const nodeId = nodeIdFromId(id);
  if (nodeId) verdictByNode[nodeId] = v;
}

// ---------- 回写矩阵 ----------
let updated = 0;
let conflict = [];
for (const row of matrix.rows) {
  const v = verdictByNode[row.nodeId];
  if (!v) continue;
  if (row.status !== 'pending') {
    conflict.push({ nodeId: row.nodeId, was: row.status, now: v });
  }
  row.status = v;
  row.nodeStatus = v;
  row.sourceStatus = v === 'candidate' ? 'verified' : 'pending';
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
  batchesApplied: ['batch-2', 'batch-3'],
};

writeFileSync(join(OUT, 'coverage-matrix.json'), JSON.stringify(matrix, null, 2), 'utf8');

// ---------- 输出 Batch-4 选题清单 ----------
const byDomainPending = {};
for (const r of pending) (byDomainPending[r.domain] ||= []).push(r.nodeId);
// legacy 升级候选：按领域顺序取前 70（学习路径前段优先）
const legacyCandidates = legacy.slice().sort((a, b) => a.domain.localeCompare(b.domain) || a.nodeId.localeCompare(b.nodeId));
const b4 = {
  total: 105,
  pendingCount: pending.length,
  legacyUpgradeCount: 105 - pending.length,
  pending: pending.map((r) => r.nodeId),
  pendingByDomain: byDomainPending,
  legacyUpgrade: legacyCandidates.slice(0, 105 - pending.length).map((r) => r.nodeId),
  legacyRemaining: legacyCandidates.slice(105 - pending.length).map((r) => r.nodeId),
};
writeFileSync(join(OUT, 'batch-4-plan.json'), JSON.stringify({ generatedAt: new Date().toISOString(), ...b4 }, null, 2), 'utf8');

console.log(`updated=${updated} conflict=${conflict.length}`);
if (conflict.length) console.log('conflicts=', JSON.stringify(conflict));
console.log(`total=${total} produced=${produced.length} legacy=${legacy.length} pending=${pending.length}`);
console.log('byStatus=', JSON.stringify(byStatus));
console.log('Batch-4 plan: pending=', pending.length, 'legacyUpgrade=', b4.legacyUpgradeCount, 'legacyRemaining=', b4.legacyRemaining.length);
console.log('pendingByDomain=', JSON.stringify(byDomainPending));
