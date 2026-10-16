// ============================================================
// 杏林大典 · Phase 5 · 审核队列裁决器（adjudicate）
// 输入：
//   review/aggregated-queue.json  （99 项队列，聚合归因）
//   review/review-patch.mjs       （56 条出处补丁：B=原文可核 verified / K=教学总结保留降级）
//   coverage-matrix.json          （455 行覆盖矩阵，唯一覆盖事实源）
// 裁决规则（与 Phase 3A.3 闭合模式一致，不自动放行任何有风险项）：
//   quarantine → 保持隔离，不自动放行（隔离即安全）
//   humanReviewRequired（C4 语义）→ 保持 conditional，输出预审意见清单（留人工审定）
//   来源待核（reasonCount>0 且非人工）→ 按补丁裁决：
//       kind 'B' → 闭合为 candidate（出处 verified，原文可逐字核对到经典篇名）
//       kind 'K' → 保持 conditional（teaching_inference 保留降级，给出思想依据）
//       无补丁   → 保持 conditional，标记「待补出处」（不得静默放行）
// 输出：
//   review/review-result.json      （逐节点裁决结果 + 统计）
//   review/review-report.md        （人工可读审核报告）
//   并更新 coverage-matrix.json 中闭合节点的 status/nodeStatus/sourceStatus + review 审计字段
// 运行：node phase-5/review/adjudicate.mjs
// ============================================================
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REVIEW_PATCH } from './review-patch.mjs';
import { SAMPLES as PB1 } from '../../phase-3b/samples.mjs';
import { SAMPLES_PART1 as B2P1 } from '../../phase-4/batch-2/samples-part1.mjs';
import { SAMPLES_PART2 as B2P2 } from '../../phase-4/batch-2/samples-part2.mjs';
import { SAMPLES_PART3 as B2P3 } from '../../phase-4/batch-2/samples-part3.mjs';
import { SAMPLES_PART4 as B2P4 } from '../../phase-4/batch-2/samples-part4.mjs';
import { SAMPLES_P3_1 as B3P1 } from '../../phase-4/batch-3/samples-part1.mjs';
import { SAMPLES_P3_2 as B3P2 } from '../../phase-4/batch-3/samples-part2.mjs';
import { SAMPLES_P3_3 as B3P3 } from '../../phase-4/batch-3/samples-part3.mjs';
import { SAMPLES_P4_1 as B4P1 } from '../../phase-4/batch-4/samples-part1.mjs';
import { SAMPLES_P4_2 as B4P2 } from '../../phase-4/batch-4/samples-part2.mjs';
import { SAMPLES_P4_3 as B4P3 } from '../../phase-4/batch-4/samples-part3.mjs';
import { SAMPLES_P4_4 as B4P4 } from '../../phase-4/batch-4/samples-part4.mjs';
import { SAMPLES_P4_5 as B4P5 } from '../../phase-4/batch-4/samples-part5.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const OUT_DIR = join(__dirname);
mkdirSync(OUT_DIR, { recursive: true });

const queue = JSON.parse(readFileSync(join(OUT_DIR, 'aggregated-queue.json'), 'utf8'));
const matrix = JSON.parse(readFileSync(join(ROOT, 'phase-5', 'coverage-matrix.json'), 'utf8'));

// ---------- 样本索引（用于 C4 预审意见的 intent / 案例层级） ----------
const sampleById = new Map();
const pushSamples = (arr) => { for (const s of arr || []) sampleById.set(s.id, s); };
pushSamples(PB1); pushSamples(B2P1); pushSamples(B2P2); pushSamples(B2P3); pushSamples(B2P4);
pushSamples(B3P1); pushSamples(B3P2); pushSamples(B3P3);
pushSamples(B4P1); pushSamples(B4P2); pushSamples(B4P3); pushSamples(B4P4); pushSamples(B4P5);
{
  const b1 = JSON.parse(readFileSync(join(ROOT, 'phase-5', 'batch-1', 'samples.json'), 'utf8')).samples;
  pushSamples(b1);
}

// ---------- 引文提取 ----------
const quoteOf = (reason) => {
  const m = /「([^」]+)」/.exec(reason || '');
  return m ? m[1] : null;
};

// ---------- 逐节点裁决 ----------
const closed = [], retainedTeaching = [], missingPatch = [], noReason = [], humanReview = [], quarantine = [];
const matrixRowById = new Map(matrix.rows.map((r) => [r.nodeId, r]));
const nowIso = new Date().toISOString();
const unknown = [];

for (const r of queue.rows) {
  const mRow = matrixRowById.get(r.nodeId);
  if (!mRow) { unknown.push(r.nodeId); continue; }
  const sample = sampleById.get(r.samples?.[0]);
  const base = {
    nodeId: r.nodeId, domain: r.domain, domainName: r.domainName, topic: r.topic,
    difficulty: r.difficulty, category: r.category,
    samples: r.samples, reasons: r.reasons,
    intent: sample?.intent || null, cLevel: sample?.cases?.level || null,
  };

  if (r.currentVerdict === 'quarantine') {
    const rec = { ...base, action: 'keep_quarantine', gateFails: r.gateFails,
      note: '隔离即安全：Gate 最终不变式拦截，不得自动放行，留人工复核' };
    quarantine.push(rec);
    mRow.review = { adjudicatedAt: nowIso, action: 'keep_quarantine', note: rec.note };
  } else if (r.humanReviewRequired) {
    const rec = { ...base, action: 'keep_conditional_human',
      note: 'C4 语义人工复核：模型无法稳定判断，需人工审定后放行' };
    humanReview.push(rec);
    mRow.review = { adjudicatedAt: nowIso, action: 'keep_conditional_human', note: rec.note };
  } else {
    const quote = r.reasons.map(quoteOf).find(Boolean);
    if (!quote) {
      const rec = { ...base, quote: null, action: 'keep_conditional_no_reason',
        note: '队列中无降级原因记录，保持 conditional，待人工确认降级原因' };
      noReason.push(rec);
      mRow.review = { adjudicatedAt: nowIso, action: 'keep_conditional_no_reason', note: rec.note };
      continue;
    }
    const patch = REVIEW_PATCH[quote];
    if (patch?.kind === 'B') {
      const rec = { ...base, quote, action: 'close_to_candidate', canon: patch.canon, chapter: patch.chapter,
        originalText: patch.originalText, sourceType: patch.sourceType,
        note: `出处闭合：${patch.canon}·${patch.chapter}（原文可逐字核对）` };
      closed.push(rec);
      mRow.status = 'candidate'; mRow.nodeStatus = 'candidate'; mRow.sourceStatus = 'verified';
      mRow.review = { adjudicatedAt: nowIso, action: 'close_to_candidate', canon: patch.canon, chapter: patch.chapter,
        originalText: patch.originalText, sourceType: patch.sourceType, status: 'verified' };
    } else if (patch?.kind === 'K') {
      const rec = { ...base, quote, action: 'keep_conditional_teaching',
        note: `教学总结语保留 teaching_inference：${patch.note || '思想依据见补丁'}` };
      retainedTeaching.push(rec);
      mRow.review = { adjudicatedAt: nowIso, action: 'keep_conditional_teaching', note: rec.note };
    } else {
      const rec = { ...base, quote, action: 'keep_conditional_missing_patch',
        note: '未命中出处补丁，保持 conditional，待补权威出处' };
      missingPatch.push(rec);
      mRow.review = { adjudicatedAt: nowIso, action: 'keep_conditional_missing_patch', note: rec.note };
    }
  }
}

// ---------- 重算覆盖矩阵统计 ----------
const subjectSet = new Map(matrix.totals.bySubject.map((s) => [s.code, s]));
const bySubject = new Map();
for (const r of matrix.rows) {
  if (!r.subject) continue;
  if (!bySubject.has(r.subject)) bySubject.set(r.subject, { candidate: 0, conditional: 0, quarantine: 0 });
  const st = bySubject.get(r.subject);
  if (st[r.status] !== undefined) st[r.status] += 1;
}
matrix.totals.bySubject = matrix.totals.bySubject.map((s) => {
  const st = bySubject.get(s.code) || { candidate: 0, conditional: 0, quarantine: 0 };
  return { ...s, migrated: st.candidate + st.conditional + st.quarantine, gapLow: Math.max(0, s.target[0] - (st.candidate + st.conditional + st.quarantine)), gapHigh: Math.max(0, s.target[1] - (st.candidate + st.conditional + st.quarantine)), byStatus: st };
});
matrix.generatedAt = nowIso;

// ---------- 统计 ----------
const stats = {
  total: queue.rows.length,
  closedToCandidate: closed.length,
  retainedTeaching: retainedTeaching.length,
  missingPatch: missingPatch.length,
  noReason: noReason.length,
  humanReview: humanReview.length,
  quarantine: quarantine.length,
  unknownNode: unknown.length,
  afterMatrix: {
    candidate: matrix.rows.filter((r) => r.status === 'candidate').length,
    conditional: matrix.rows.filter((r) => r.status === 'conditional').length,
    quarantine: matrix.rows.filter((r) => r.status === 'quarantine').length,
  },
};

// ---------- 输出 review-result.json ----------
const resultDoc = {
  schema: 'phase-5/review/adjudicate/v1',
  basis: 'aggregated-queue.json（99 项）+ review-patch.mjs（56 条补丁）+ coverage-matrix.json（455 行）',
  adjudicatedAt: nowIso,
  stats,
  closed, retainedTeaching, missingPatch, noReason, humanReview, quarantine, unknown,
};
writeFileSync(join(OUT_DIR, 'review-result.json'), JSON.stringify(resultDoc, null, 2), 'utf8');

// ---------- 输出 review-report.md ----------
const L = [];
L.push('# Phase 5 · 审核队列裁决报告（Adjudication Report）');
L.push('');
L.push(`裁决时间：${nowIso}`);
L.push('');
L.push(`## 1. 总览`);
L.push('');
L.push(`审核队列共 **${stats.total}** 项（96 conditional + 3 quarantine），按 Phase 3A.3 闭合模式裁决：`);
L.push('');
L.push(`| 裁决结果 | 数量 | 说明 |`);
L.push(`| --- | ---: | --- |`);
L.push(`| 闭合为 candidate | ${stats.closedToCandidate} | 经典出处经补丁核实为原文可核（classic_original + verified），状态 conditional → candidate |`);
L.push(`| 保留 conditional（教学总结） | ${stats.retainedTeaching} | teaching_inference 保留降级，已给出思想依据（kind K） |`);
L.push(`| 保留 conditional（C4 语义人工） | ${stats.humanReview} | 模型无法稳定判断的语义案例，输出预审意见，待人工审定 |`);
L.push(`| 保留 conditional（待补出处） | ${stats.missingPatch} | 有降级原因但未命中出处补丁，不得静默放行 |`);
L.push(`| 保留 conditional（无降级原因记录） | ${stats.noReason} | 队列中无降级原因，待人工确认 |`);
L.push(`| 保持隔离 quarantine | ${stats.quarantine} | 隔离即安全，不自动放行 |`);
L.push(`| 矩阵未找到节点 | ${stats.unknownNode} | 异常，需排查 |`);
L.push('');
L.push(`覆盖矩阵更新后全局状态：candidate **${stats.afterMatrix.candidate}** / conditional **${stats.afterMatrix.conditional}** / quarantine **${stats.afterMatrix.quarantine}**。`);
L.push('');
L.push('## 2. 闭合明细（conditional → candidate，出处 verified）');
L.push('');
L.push('| 节点 | 学科 | 主题 | 出处 | 篇/章 | 原文 |');
L.push('| --- | --- | --- | --- | --- | --- |');
for (const c of [...closed].sort((a, b) => a.nodeId.localeCompare(b.nodeId))) {
  L.push(`| ${c.nodeId} | ${c.domainName} | ${c.topic} | ${c.canon} | ${c.chapter} | ${c.originalText} |`);
}
L.push('');
L.push('## 3. 保留 conditional（教学总结 teaching_inference）');
L.push('');
L.push('| 节点 | 学科 | 主题 | 引文 | 处理说明 |');
L.push('| --- | --- | --- | --- | --- |');
for (const c of retainedTeaching) {
  L.push(`| ${c.nodeId} | ${c.domainName} | ${c.topic} | ${c.quote} | ${c.note} |`);
}
L.push('');
L.push('## 4. 保留 conditional（C4 语义人工预审意见清单）');
L.push('');
L.push('以下节点属 C4 迁移推理语义案例，模型无法稳定判断，不自动放行。预审检查点：证据链是否完整、反证是否实质回应、修正是否重新限定原判断。');
L.push('');
L.push('| 节点 | 学科 | 主题 | 难度 | 案例层级 | 意图 |');
L.push('| --- | --- | --- | ---: | --- | --- |');
for (const c of [...humanReview].sort((a, b) => a.nodeId.localeCompare(b.nodeId))) {
  L.push(`| ${c.nodeId} | ${c.domainName} | ${c.topic} | ${c.difficulty} | ${c.cLevel || '—'} | ${c.intent || '—'} |`);
}
L.push('');
L.push('## 5. 隔离清单（quarantine，保持隔离）');
L.push('');
L.push('| 节点 | 学科 | 主题 | 拦截原因 |');
L.push('| --- | --- | --- | --- |');
for (const c of quarantine) {
  const fails = (c.gateFails || []).map((g) => `${g.gate}：${g.note}`).join('；') || '—';
  L.push(`| ${c.nodeId} | ${c.domainName} | ${c.topic} | ${fails} |`);
}
L.push('');
if (missingPatch.length) {
  L.push('## 6. 待补出处（conditional 保留，需人工补充权威出处）');
  L.push('');
  L.push('| 节点 | 学科 | 主题 | 引文 |');
  L.push('| --- | --- | --- | --- |');
  for (const c of missingPatch) L.push(`| ${c.nodeId} | ${c.domainName} | ${c.topic} | ${c.quote || '—'} |`);
  L.push('');
}
if (noReason.length) {
  L.push('## 7. 无降级原因记录（conditional 保留，待人工确认）');
  L.push('');
  L.push('| 节点 | 学科 | 主题 |');
  L.push('| --- | --- | --- |');
  for (const c of noReason) L.push(`| ${c.nodeId} | ${c.domainName} | ${c.topic} |`);
  L.push('');
}
L.push('## 8. 裁决原则声明');
L.push('');
L.push('- 本裁决仅闭合「出处可逐字核对到经典」的降级项；教学总结语保留 teaching_inference；C4 语义与隔离项一律不自动放行。');
L.push('- 历史产物文件未作任何改写；矩阵更新为唯一覆盖事实源，闭合依据以 review-patch.mjs 与 review-result.json 为准，可审计。');
L.push('- 覆盖矩阵已同步更新（status/nodeStatus/sourceStatus + review 审计字段），学习系统编排与前端数据需在裁决后重跑以保持一致。');
L.push('');
writeFileSync(join(OUT_DIR, 'review-report.md'), L.join('\n'), 'utf8');

// ---------- 写回覆盖矩阵 ----------
writeFileSync(join(ROOT, 'phase-5', 'coverage-matrix.json'), JSON.stringify(matrix, null, 2), 'utf8');

console.log(`total=${stats.total} closed=${stats.closedToCandidate} retainedTeaching=${stats.retainedTeaching} missingPatch=${stats.missingPatch} humanReview=${stats.humanReview} quarantine=${stats.quarantine} unknown=${stats.unknownNode}`);
console.log(`afterMatrix candidate=${stats.afterMatrix.candidate} conditional=${stats.afterMatrix.conditional} quarantine=${stats.afterMatrix.quarantine}`);
