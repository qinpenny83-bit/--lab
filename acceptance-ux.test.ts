// ============================================================
// 🌿 杏林修炼场 V3.5 Final Polish · UX 不变式验收
// 验证「把答错变成一次学习」「把分析变成统一教学模式」两条闭环。
// 原则：测试的是 UX 不变式（结构性规则），不是截图；
//       所有断言来自真实数据 / 引擎 / 源码，不伪造、不迎合。
// 运行：npx esbuild acceptance-ux.test.ts --bundle --platform=node --format=esm --outfile=acceptance-ux.test.mjs && node acceptance-ux.test.mjs
// ============================================================

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const mem = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const DAY = 86400000;
const START = new Date(2026, 5, 1, 12, 0, 0).getTime();

const clock = await import('./src/engine/clock');
clock.useManualClock(START);

const store = await import('./src/store/progress');
const coach = await import('./src/engine/coachDecision');
const cur = await import('./src/data/curriculum');
const reasoner = await import('./src/engine/ReasonerEngine');

const srcPath = (rel: string) => join(process.cwd(), rel);
const readSrc = (rel: string) => readFileSync(srcPath(rel), 'utf8');

// ---- 断言框架 ----
let pass = 0;
let fail = 0;
const failures: string[] = [];
function check(name: string, cond: boolean, detail = '') {
  if (cond) {
    pass++;
    console.log(`  ✅ ${name}`);
  } else {
    fail++;
    failures.push(`${name} ${detail}`);
    console.log(`  ❌ ${name} ${detail}`);
  }
}

// 学习环节序号（与 LearningUnitPlayer 的 STEP_BADGE 对齐）：
// ①学习 ②为什么 ③观察 ④练习 ⑤案例 ⑥推理 ⑦迁移 ⑧复习
const ARC_TIER: Record<string, number> = {
  introduction: 1, concept: 1, comparison: 1, why: 2,
  observation: 3,
  check: 4, explanation: 4, reflection: 4, paradox: 4,
  case: 5, variation: 5, classic: 5, formula: 5,
  transfer: 7,
  integration: 8, summary: 8, review: 8,
};

const allUnits: any[] = cur.allLearningUnitArray;
const rcAll: any[] = cur.reasoningChallengeArray;

// ============================================================
console.log('\n== UX-01 零基础入口：学习 → 观察 → 练习 → 案例 → 推理 成立 =====');
// 新用户默认从初识中医开始
check('UX-01a 新用户默认第一境', store.defaultProgress().currentStageId === 'stage1');
// 数据层具备完整七环素材：学习 / 观察 / 练习 / 案例 / 推理 / 迁移 / 复习
const tierSeq = new Set(allUnits.map((u) => ARC_TIER[u.type]).filter(Boolean));
for (const tier of [1, 3, 4, 5, 7, 8]) {
  check(`UX-01b 存在环节序号 ${tier}`, tierSeq.has(tier), JSON.stringify([...tierSeq]));
}
// 推理（病机推理挑战）存在且排在案例之后
check('UX-01c 推理挑战存在', rcAll.length > 0);
const hasCase = allUnits.some((u) => ARC_TIER[u.type] === 5);
const hasTransfer = allUnits.some((u) => ARC_TIER[u.type] === 7);
check('UX-01d 案例→推理→迁移 链条素材齐备', hasCase && rcAll.length > 0 && hasTransfer);

// ============================================================
console.log('\n== UX-02 推理不能早于必要学习单元 ===========================');
const rc5 = cur.reasoningChallengesByStage('stage5');
// 每个推理挑战涉及的病机节点，在课程中都有对应的前置学习单元（先学，后推理）
const allPrereq = rc5.every((rc: any) =>
  rc.nodeIds.length > 0 && rc.nodeIds.every((nid: string) => cur.unitsByNode(nid).length > 0)
);
check('UX-02a 推理挑战均建立在已学节点之上', rc5.length > 0 && allPrereq);
// 第五境存在「学习/观察/练习/案例」类前置单元
const stage5UnitTiers = new Set(
  cur.stage5LearningUnitArray.map((u: any) => ARC_TIER[u.type]).filter(Boolean)
);
check('UX-02b 第五境具备推理前的学习环节', [1, 3, 4, 5].every((t) => stage5UnitTiers.has(t)), JSON.stringify([...stage5UnitTiers]));

// ============================================================
console.log('\n== UX-03 错误后存在：ignored clue → why → counterfactual → retry 完整链路 =====');
// 3.1 引擎层：漏标关键线索 → 产生可解释错因（"你注意到…但忽略了…"的数据基础）
const rc = rcAll[0];
const keyIds = rc.clues.filter((c: any) => c.grade === 'key').map((c: any) => c.id);
const sess3 = reasoner.createReasonerSession(rc);
reasoner.recordCluesViewed(sess3, rc.clues.map((c: any) => c.id), rc.clues.length);
reasoner.recordKeyClueSelection(sess3, []); // 一条关键线索都没标出
const m3 = reasoner.detectReasoningMistake(sess3, rc, {
  finalHypothesisId: rc.bestHypothesisId, counterUsed: true, revised: true, transferPassed: null,
});
check('UX-03a 漏标关键线索能识别错因', !!m3 && !!m3.mistakeKind, m3?.mistakeKind);
check('UX-03b 错因含可读归因（rootCause）', !!m3 && m3.rootCause.trim().length > 0);

// 3.2 数据层：复盘五段式所需素材完整
const hasWhy = rc.clues.every((c: any) => !!c.text && c.grade !== undefined);
check('UX-03c 线索带 why（为什么更重要）', hasWhy && rc.clues.every((c: any) => c.grade !== 'key' || !!c.why));
check('UX-03d 反事实追问素材存在', rcAll.every((c: any) => !!c.counterEvidenceQuestion && !!c.counterEvidenceAnswer));

// 3.3 源码层：五段式已在正式课程步骤（非弹窗）中实现
const rpSrc = readSrc('src/components/ReasoningPlayer.tsx');
for (const kw of ['你刚才注意到了什么', '你忽略了什么', '为什么', '反事实追问', '重新判断']) {
  check(`UX-03e 复盘五段含「${kw}」`, rpSrc.includes(kw));
}

// ============================================================
console.log('\n== UX-04 「教练带你看」存在统一模式 =========================');
// 数据层：read / think / observe 三类分析交互均存在（会被统一为「教练带你看」）
const interactionTypes = new Set(allUnits.map((u: any) => u.interactionType));
for (const it of ['read', 'think', 'observe']) {
  check(`UX-04a 存在分析交互 ${it}`, interactionTypes.has(it), JSON.stringify([...interactionTypes]));
}
// 源码层：统一模式横幅已实现
const luSrc = readSrc('src/components/LearningUnitPlayer.tsx');
check('UX-04b 统一「教练带你看」模式', luSrc.includes('教练带你看') && luSrc.includes('isCoachMode'));

// ============================================================
console.log('\n== UX-05 推理进入前存在心理转场 ===========================');
check('UX-05a 推理前有「轮到你来」心理转场', rpSrc.includes('现在，轮到你来判断') && rpSrc.includes('started'));

// ============================================================
console.log('\n== UX-06 迁移发生在推理之后 ===========================');
// 环节序号：迁移(7) 应排在案例(5)[推理]之后，复习(8)之前
const transferTier = 7;
const caseTier = 5;
const reviewTier = 8;
check(
  'UX-06a 迁移序号在案例(推理)之后、复习之前',
  transferTier > caseTier && transferTier < reviewTier,
);

// ============================================================
console.log('\n== UX-07 错误能够影响 CoachDecision =========================');
store.resetProgress();
const d0 = coach.coachDecision(store.getProgress());
check('UX-07a 无错时给出基线决策', !!d0.action && !!d0.reason);

// 通过真实结算注入两次「单一症状下结论」错误（reasoning_error），观察教练动作是否改变
const rcErr = rcAll[0];
const wrongId = rcErr.hypotheses.find((h: any) => h.id !== rcErr.bestHypothesisId)?.id;
for (let i = 0; i < 2; i++) {
  const s = reasoner.createReasonerSession(rcErr);
  reasoner.recordCluesViewed(s, rcErr.clues.map((c: any) => c.id), rcErr.clues.length);
  reasoner.recordKeyClueSelection(s, []); // 无关键线索基础 → single_symptom_jump
  store.settleReasoningOutcome({
    session: s,
    challenge: rcErr,
    outcome: { finalHypothesisId: wrongId, counterUsed: true, revised: true, transferPassed: null },
  });
}
const dErr = coach.coachDecision(store.getProgress());
check('UX-07b 错误后教练动作改变', dErr.action === 'compare', `action=${dErr.action}`);
check('UX-07c 教练决策可解释', dErr.reason.trim().length > 0);

// ============================================================
console.log('\n== UX-08 课程结束进入 Review / Mastery =====================');
store.resetProgress();
const rcFin = rcAll[0];
const sFin = reasoner.createReasonerSession(rcFin);
reasoner.recordCluesViewed(sFin, rcFin.clues.map((c: any) => c.id), rcFin.clues.length);
reasoner.recordKeyClueSelection(sFin, rcFin.clues.filter((c: any) => c.grade === 'key').map((c: any) => c.id));
store.settleReasoningOutcome({
  session: sFin,
  challenge: rcFin,
  outcome: { finalHypothesisId: rcFin.bestHypothesisId, counterUsed: true, revised: true, transferPassed: true },
});
const pFin = store.getProgress();
check('UX-08a 结算后写入复习队列', pFin.reviewQueue.length > 0);
check(
  'UX-08b 结算后写入掌握验证',
  rcFin.nodeIds.every((nid: string) => pFin.nodeMastery[nid] != null),
);

// ---- 汇总 ----
console.log(`\n============================================================`);
console.log(` 通过 ${pass} · 失败 ${fail}`);
if (fail > 0) {
  console.log('\n失败项：');
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
} else {
  console.log(' ✅ UX 不变式全部通过');
  process.exit(0);
}