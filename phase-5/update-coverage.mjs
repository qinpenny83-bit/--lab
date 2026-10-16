// ============================================================
// 杏林大典 · Phase 5 · 通用覆盖矩阵更新器
// 用法：
//   node phase-5/update-coverage.mjs --batch batch-6 --prefix pb6 --subjects g:G,l:L,e:E
//   --subjects：id 小写学科字母 → 蓝图学科代码（逗号分隔，如 g:G,l:L,e:E,f:F,h:H）
// 运行后自动重算 bySubject/totals 并追加批次到 batchesApplied。
// ============================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const getArg = (name, dft) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : dft;
};
const BATCH = getArg('--batch', 'batch-6');
const PREFIX = getArg('--prefix', 'pb6');
const SUBJECT_MAP = Object.fromEntries((getArg('--subjects', '').split(',').filter(Boolean)).map((s) => s.split(':')));

const OUT = __dirname;
const matrix = JSON.parse(readFileSync(join(OUT, 'coverage-matrix.json'), 'utf8'));

// ---------- 收集本批 verdict ----------
const verdictById = {};
const metaById = {};
{
  const samples = JSON.parse(readFileSync(join(OUT, BATCH, 'samples.json'), 'utf8')).samples;
  for (const s of samples) {
    metaById[s.id] = { title: s.title, category: s.category, difficulty: s.difficulty, difficultyLabel: s.difficultyLabel };
  }
  for (const v of ['candidates', 'conditional', 'quarantine']) {
    const doc = JSON.parse(readFileSync(join(OUT, BATCH, `${v}.json`), 'utf8'));
    const verdict = v === 'candidates' ? 'candidate' : v;
    for (const s of doc.samples || []) verdictById[s.id] = verdict;
  }
}

// ---------- 学科映射 ----------
const subjectOf = (id) => {
  const m = new RegExp(`^${PREFIX}-([a-z]+)-\\d+$`).exec(id);
  return m ? (SUBJECT_MAP[m[1]] || null) : null;
};

// ---------- 追加/刷新节点行 ----------
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

const batchesApplied = matrix.totals?.batchesApplied || [];
if (!batchesApplied.includes(`phase-5/${BATCH}`)) batchesApplied.push(`phase-5/${BATCH}`);

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

console.log(`[${BATCH}] added=${added} refreshed=${refreshed} skipped=${skipped.length}`);
console.log(`totalNodes=${totalNodes} produced=${produced.length} legacy=${legacy.length} pending=${pending.length}`);
console.log('byStatus=', JSON.stringify(byStatus));
console.log('grandGap =', matrix.totals.grandGapLow, '-', matrix.totals.grandGapHigh);
for (const [letter, code] of Object.entries(SUBJECT_MAP)) {
  const s = matrix.subjects.find((x) => x.code === code);
  if (s) console.log(`${s.code} ${s.name}: migrated=${s.migrated} target=${s.target[0]}-${s.target[1]} gap=${s.gapLow}-${s.gapHigh}`);
}
