// ============================================================
// 杏林大典 · Phase 5 · 前端数据生成器（33 学科知识池 → src/data/v33）
// 输入（唯一事实源）：
//   phase-5/blueprint-map.mjs          33 学科注册表
//   phase-5/learning-system/*.json     学习系统全部产物
// 输出：
//   src/data/v33/subjects.ts           33 学科注册表（含当前覆盖统计，随 all-nodes 自动重算）
//   src/data/v33/*.json                学习系统 JSON 直接拷贝（tsconfig resolveJsonModule 导入）
// 运行：node phase-5/build-v33-frontend.mjs
// 原则：不改写任何 phase-5 产物；前端数据全部由本脚本从唯一事实源生成，请勿手改 subjects.ts。
// ============================================================
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { BLUEPRINT_MAP } from './blueprint-map.mjs';

const ROOT = process.cwd();
const SRC_V33 = join(ROOT, 'src', 'data', 'v33');
const LS = join(ROOT, 'phase-5', 'learning-system');
mkdirSync(SRC_V33, { recursive: true });

// ---------- 1. 拷贝学习系统 JSON ----------
const JSON_FILES = [
  'all-nodes.json',
  'learning-path.json',
  'mastery-map.json',
  'daily-practice.json',
  'production-dashboard.json',
  'final-audit.json',
];
for (const f of JSON_FILES) {
  const from = join(LS, f);
  if (!existsSync(from)) {
    console.error(`MISSING ${from}`);
    process.exit(1);
  }
  copyFileSync(from, join(SRC_V33, f));
  console.log(`copied src/data/v33/${f}`);
}

// ---------- 2. 读取 all-nodes 统计 ----------
const allNodes = JSON.parse(readFileSync(join(LS, 'all-nodes.json'), 'utf8'));
const bySubject = allNodes.stats?.bySubject || {};

// ---------- 3. 生成 subjects.ts（覆盖统计随 all-nodes 自动重算） ----------
const rows = BLUEPRINT_MAP.subjects.map((s) => {
  const current = bySubject[s.code] ?? 0;
  const [low] = s.target;
  return {
    code: s.code,
    name: s.name,
    type: s.type,
    stage: s.stage,
    status: s.status,
    target: s.target,
    migratedFrom: s.migratedFrom || [],
    honestyGap: s.honestyGap ?? null,
    current,
    coverageLow: low ? Math.min(100, Math.round((current / low) * 100)) : current > 0 ? 100 : 0,
  };
});
const totals = rows.reduce(
  (acc, r) => {
    acc[r.status] += r.current;
    acc.all += r.current;
    return acc;
  },
  { core: 0, ext: 0, all: 0 },
);

const ts = `// ============================================================
// 杏林大典 · 33 学科知识池 · 学科注册表（自动生成，请勿手改）
// 来源：phase-5/blueprint-map.mjs（唯一注册表）+ phase-5/learning-system/all-nodes.json
// 重新生成：node phase-5/build-v33-frontend.mjs
// ============================================================
import type { V33SubjectRow } from '../../types/v33';

export const v33Subjects: V33SubjectRow[] = ${JSON.stringify(rows, null, 2)};

export const v33Totals = ${JSON.stringify(totals, null, 2)};
`;
writeFileSync(join(SRC_V33, 'subjects.ts'), ts, 'utf8');
console.log(`written src/data/v33/subjects.ts (${rows.length} subjects, ${totals.all} nodes)`);
