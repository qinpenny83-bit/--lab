// ============================================================
// Phase 5 · 构建 33 学科覆盖矩阵（现有 305 节点归位 + 缺口计算）
// ============================================================
// 输入：phase-5/blueprint-map.mjs（33 学科）+ phase-4/coverage-matrix.json（305 存量）
// 输出：phase-5/coverage-matrix.json（33 学科版）
// 迁移规则（蓝图第 20 章）：旧领域号前缀 → 33 学科代码
// ============================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { BLUEPRINT_MAP } from './blueprint-map.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const p4 = JSON.parse(readFileSync(join(__dirname, '../phase-4/coverage-matrix.json'), 'utf8'));
const rows = p4.rows;

// 旧领域号 → 33 学科代码（源自 blueprint-map migratedFrom 反向推导）
const MIGRATION = {};
for (const s of BLUEPRINT_MAP.subjects) {
  for (const old of s.migratedFrom) MIGRATION[old] = s.code;
}
// 兜底：未列出的旧领域号（如 20 医案阅读 → Q，21 综合辨证思维 → B）
MIGRATION['20'] = 'Q';
MIGRATION['21'] = 'B';

function oldDomain(nodeId) {
  const m = /^(\d{2})/.exec(nodeId);
  return m ? m[1] : null;
}

const subjectRows = Object.fromEntries(BLUEPRINT_MAP.subjects.map((s) => [s.code, []]));
let unmigrated = [];
for (const r of rows) {
  const old = oldDomain(r.nodeId);
  const code = old ? MIGRATION[old] : null;
  if (!code) { unmigrated.push(r.nodeId); continue; }
  subjectRows[code].push({ ...r, subject: code });
}

// 汇总每学科
const subjects = BLUEPRINT_MAP.subjects.map((s) => {
  const list = subjectRows[s.code] || [];
  const byStatus = {};
  for (const r of list) byStatus[r.status] = (byStatus[r.status] || 0) + 1;
  return {
    code: s.code,
    name: s.name,
    status: s.status,
    target: s.target,
    migrated: list.length,
    gapLow: Math.max(0, s.target[0] - list.length),
    gapHigh: Math.max(0, s.target[1] - list.length),
    byStatus,
  };
});

const totals = {
  totalSubjects: 33,
  totalNodes: rows.length,
  migratedNodes: rows.length - unmigrated.length,
  unmigrated,
  bySubject: subjects,
  grandTargetLow: subjects.reduce((a, s) => a + s.target[0], 0),
  grandTargetHigh: subjects.reduce((a, s) => a + s.target[1], 0),
  grandGapLow: subjects.reduce((a, s) => a + s.gapLow, 0),
  grandGapHigh: subjects.reduce((a, s) => a + s.gapHigh, 0),
};

const out = {
  schema: 'phase-5/coverage-matrix/v33',
  basis: BLUEPRINT_MAP.basis,
  generatedAt: new Date().toISOString(),
  totals,
  subjects,
  rows: rows.map((r) => {
    const old = oldDomain(r.nodeId);
    return { ...r, subject: old ? MIGRATION[old] : null };
  }),
};

writeFileSync(join(__dirname, 'coverage-matrix.json'), JSON.stringify(out, null, 2), 'utf8');
console.log('33 学科覆盖矩阵已生成');
console.log('totalNodes=', totals.totalNodes, 'unmigrated=', unmigrated.length);
console.log('grandGapLow=', totals.grandGapLow, 'grandGapHigh=', totals.grandGapHigh);
console.log(subjects.map((s) => `${s.code} ${s.name}: migrated=${s.migrated} gap=${s.gapLow}-${s.gapHigh}`).join('\n'));
