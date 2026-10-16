// ============================================================
// 杏林大典 · Phase 5 · 审核队列聚合器（96 conditional + 3 quarantine 归因）
// 输入：phase-4 根级 conditional/quarantine（权威队列）+ 各批次 conditional/quarantine（原因）
// 输出：phase-5/review/aggregated-queue.json（逐节点归因 + 分类）
// 运行：node phase-5/review/aggregate.mjs
// ============================================================
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const OUT_DIR = join(__dirname);
mkdirSync(OUT_DIR, { recursive: true });

const read = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null);
const readJson = (dir, file) => read(join(ROOT, dir, file));

// ---------- 1. 权威队列：phase-4 根级 ----------
const rootCond = readJson('phase-4', 'conditional.json')?.samples || [];
const rootQuar = readJson('phase-4', 'quarantine.json')?.samples || [];
const queueNodes = new Set([...rootCond, ...rootQuar].map((s) => s.nodeId));

// ---------- 2. 各批次原因（id → 条目） ----------
const byNode = new Map();
const BATCHES = [
  ['phase-3b', null],
  ['phase-4/batch-2', null],
  ['phase-4/batch-3', null],
  ['phase-4/batch-4', null],
  ['phase-5/batch-1', null],
];
const nodeIdFromId = (id) => {
  const m = /^pb\d+-\w+-(\d{2})-(\d{2})$/.exec(id);
  return m ? `${m[1]}-${m[2]}` : null;
};
for (const [dir] of BATCHES) {
  for (const v of ['conditional', 'quarantine', 'candidates']) {
    const doc = readJson(dir, `${v}.json`);
    for (const s of doc?.samples || []) {
      const nid = nodeIdFromId(s.id);
      if (!nid) continue;
      const prev = byNode.get(nid);
      if (!prev) byNode.set(nid, { nodeId: nid, samples: [] });
      byNode.get(nid).samples.push({ id: s.id, title: s.title, category: s.category, difficulty: s.difficulty, verdict: v === 'candidates' ? 'candidate' : v, reviewReasons: s.reviewReasons || [], humanReviewRequired: !!s.humanReviewRequired, gateFails: s.gateFails || [], intent: s.intent || null });
    }
  }
}

// ---------- 3. 组装 ----------
const rows = [];
for (const nid of queueNodes) {
  const info = byNode.get(nid) || { nodeId: nid, samples: [] };
  const rootMeta = rootCond.find((s) => s.nodeId === nid) || rootQuar.find((s) => s.nodeId === nid) || {};
  const allReasons = [...new Set(info.samples.flatMap((s) => s.reviewReasons))];
  const humanReview = info.samples.some((s) => s.humanReviewRequired);
  const quarantined = info.samples.some((s) => s.verdict === 'quarantine');
  rows.push({
    nodeId: nid,
    domain: rootMeta.domain || null,
    domainName: rootMeta.domainName || null,
    topic: rootMeta.topic || info.samples[0]?.title || null,
    category: rootMeta.category || info.samples[0]?.category || null,
    difficulty: rootMeta.difficulty || info.samples[0]?.difficulty || null,
    currentVerdict: quarantined ? 'quarantine' : 'conditional',
    humanReviewRequired: humanReview,
    reasonCount: allReasons.length,
    reasons: allReasons,
    gateFails: info.samples.flatMap((s) => (s.gateFails || []).map((g) => ({ gate: g.gate, note: g.note }))),
    samples: info.samples.map((s) => s.id),
  });
}
rows.sort((a, b) => a.nodeId.localeCompare(b.nodeId));

// ---------- 4. 分类统计 ----------
const stats = {
  total: rows.length,
  humanReviewRequired: rows.filter((r) => r.humanReviewRequired).length,
  sourceOnly: rows.filter((r) => !r.humanReviewRequired && r.reasonCount > 0).length,
  noReasonNoHuman: rows.filter((r) => !r.humanReviewRequired && r.reasonCount === 0).length,
  quarantine: rows.filter((r) => r.currentVerdict === 'quarantine').length,
};

// 去重原因列表
const distinctReasons = [...new Set(rows.flatMap((r) => r.reasons))];
const quoteCount = new Map();
for (const r of rows) for (const reason of r.reasons) quoteCount.set(reason, (quoteCount.get(reason) || 0) + 1);

writeFileSync(join(OUT_DIR, 'aggregated-queue.json'), JSON.stringify({ generatedAt: new Date().toISOString(), stats, rows, distinctReasons, distinctReasonCount: distinctReasons.length, quoteCount: Object.fromEntries(quoteCount) }, null, 2), 'utf8');

console.log(`total=${stats.total} humanReview=${stats.humanReviewRequired} sourceOnly=${stats.sourceOnly} noReasonNoHuman=${stats.noReasonNoHuman} quarantine=${stats.quarantine}`);
console.log(`distinctReasons=${distinctReasons.length}`);
