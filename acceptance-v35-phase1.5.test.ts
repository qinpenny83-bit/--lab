// ============================================================
// 🌿 杏林修炼场 V3.5 Phase 1.5 验收测试
// 验证两件事：
//   1) 第一境（初识中医）能否让零基础用户建立起"框架地图"——
//      核心主题必须有完整 10 层教学（理解→识别→辨析→解释→迁移）。
//   2) 第五境（病机推理）能否让学习者经历
//      "线索→假设→证据→反证→修正→综合解释"的完整训练。
// 原则：只验证数据结构与可解释决策的真实性，不修改生产逻辑迎合测试。
// 运行：npx esbuild acceptance-v35-phase1.5.test.ts --bundle --platform=node --format=esm --outfile=acceptance-v35-phase1.5.test.mjs && node acceptance-v35-phase1.5.test.mjs
// ============================================================

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
const models = await import('./src/types/models');
const reasoner = await import('./src/engine/ReasonerEngine');
const mistake = await import('./src/engine/MistakeEngine');
const stages = await import('./src/data/stages');

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

const {
  learningUnitArray,
  learningChapterArray,
  conceptComparisonArray,
  learningCaseArray,
  reasoningChallengeArray,
  graduationTrialArray,
  graduationCriterionArray,
  knowledgeBridgeArray,
  unitsByNode,
  criterionByStage,
  reasoningChallengesByStage,
  trialByStage,
} = cur;

const REASONING_EIGHT_STEPS = models.REASONING_EIGHT_STEPS;

// ============================================================
console.log('\n== A. 第一境：核心主题的 10 层教学完整性 ========================');
// 第一境"真正学深"的核心主题应各有完整 10 步弧线
const stage1CoreThemes: Record<string, { id: string; nodes: string[] }> = {
  '中医是什么': { id: 'tcm', nodes: ['v3-s1-n1', 'v3-s1-n2', 'v3-s1-n3'] },
  '整体观念': { id: 'whole', nodes: ['v3-s1-n4'] },
  '证、症、病': { id: 'szd', nodes: ['v3-s1-n6'] },
  '五行': { id: 'wx', nodes: ['v3-s1-n11', 'v3-s1-n12', 'v3-s1-n13'] },
  '辨证论治': { id: 'bz', nodes: ['v3-s1-n5'] },
  '阴阳': { id: 'yy', nodes: ['v3-s1-n7', 'v3-s1-n8', 'v3-s1-n9', 'v3-s1-n10'] },
  '藏象': { id: 'zx', nodes: ['v3-s1-n14'] },
  '气血津液': { id: 'qx', nodes: ['v3-s1-n15'] },
  '病因': { id: 'by', nodes: ['v3-s1-n16'] },
  '病机': { id: 'bj', nodes: ['v3-s1-n17'] },
};

for (const [name, theme] of Object.entries(stage1CoreThemes)) {
  const units = theme.nodes.flatMap((n) => unitsByNode(n));
  check(`A1 ${name} 有完整 10 层教学`, units.length === 10, `实际 ${units.length}`);
  const types = new Set(units.map((u) => u.type));
  check(
    `A2 ${name} 覆盖理解/辨析/迁移关键层`,
    ['concept', 'why', 'observation', 'check', 'explanation', 'reflection', 'paradox', 'transfer', 'integration'].every((t) => types.has(t)),
    JSON.stringify([...types]),
  );
}

// 10 层里的"反直觉"与"迁移"必须有真实内容（不能是空壳）
check(
  'A3 所有 10 层主题的反直觉单元都有内容',
  Object.values(stage1CoreThemes)
    .flatMap((t) => t.nodes.flatMap((n) => unitsByNode(n)))
    .filter((u) => u.type === 'paradox')
    .every((u) => u.content.trim().length > 0),
);

check(
  'A4 所有 10 层主题的迁移单元都有内容',
  Object.values(stage1CoreThemes)
    .flatMap((t) => t.nodes.flatMap((n) => unitsByNode(n)))
    .filter((u) => u.type === 'transfer')
    .every((u) => u.content.trim().length > 0),
);

// 章节结构存在且顺序正确
check('A5 第一境章节 >= 6', learningChapterArray.filter((c) => c.stageId === 'stage1').length >= 6);

// ============================================================
console.log('\n== B. 第一境：概念对比 ==========================================');
const ccIds = conceptComparisonArray.map((c) => c.id);
for (const required of [
  'cc-yin-yang-five-elements',
  'cc-symptom-syndrome',
  'cc-disease-syndrome',
  'cc-whole-vs-part',
  'cc-syndrome-vs-symptom-match',
]) {
  check(`B1 对比存在: ${required}`, ccIds.includes(required));
}
const ccFull = conceptComparisonArray.filter((c) =>
  c.commonGround && c.keyDifference && c.confusionPoint && c.counterCase
);
check('B2 每组建模完整（共同点/差别/易混点/反例）', ccFull.length === conceptComparisonArray.length,
  `完整 ${ccFull.length}/${conceptComparisonArray.length}`);

// ============================================================
console.log('\n== C. 第一境：理论学习案例 =====================================');
check('C1 至少 3 个学习案例', learningCaseArray.length >= 3, `实际 ${learningCaseArray.length}`);
const stage1Cases = learningCaseArray.filter((c) => c.stageId === 'stage1');
check('C2 案例均属第一境', stage1Cases.length === learningCaseArray.length);
check(
  'C3 每个案例含完整流程（观察→猜测→理由→追问→新线索→修正→迁移）',
  stage1Cases.every((c) =>
    c.scenario && c.guessQuestion && c.reasonQuestion && c.probingQuestion &&
    c.newClue && c.reviseQuestion && c.reviseOptions.length > 0 &&
    c.theory && c.transferQuestion && c.transferOptions.length > 0
  ),
);
check(
  'C4 每个案例有正确修正答案与迁移正确答案',
  stage1Cases.every((c) =>
    c.reviseOptions.some((o) => o.correct) && c.transferOptions.some((o) => o.correct)
  ),
);

// ============================================================
console.log('\n== D. 第一境：毕业条件与毕业试炼 ================================');
const gc1 = criterionByStage('stage1');
check('D1 第一境毕业条件存在', !!gc1);
check('D2 毕业试炼已绑定', gc1?.finalTrialId === 'trial-stage1');
check(
  'D3 必掌握知识覆盖阴阳+五行+辨证论治',
  (gc1?.requiredKnowledgeIds ?? []).includes('v3-s1-n7') &&
  (gc1?.requiredKnowledgeIds ?? []).includes('v3-s1-n11') &&
  (gc1?.requiredKnowledgeIds ?? []).includes('v3-s1-n5'),
);
const tr1 = trialByStage('stage1');
check('D4 第一境试炼定义存在', !!tr1);
check(
  'D5 试炼阈值全部可计算（0-1）',
  !!tr1 && Object.values(tr1.thresholds).every((v) => v >= 0 && v <= 1),
);
check(
  'D6 未通过时按维度给出反馈（不扣分羞辱）',
  !!tr1 && tr1.feedbackHints.length >= 4,
);

// ============================================================
console.log('\n== E. 第一境：前置知识链 & Agent 追问 ==========================');
const bz1 = learningUnitArray.find((u) => u.id === 'lu-bz-01');
const yy1 = learningUnitArray.find((u) => u.id === 'lu-yy-01');
check('E1 辨证论治首单元接在整体观念之后', bz1?.prerequisiteIds.includes('lu-whole-10'));
check('E2 阴阳首单元接在证症病之后', yy1?.prerequisiteIds.includes('lu-szd-10'));
check(
  'E3 每个核心主题都有 Agent 追问（reflection）单元',
  Object.values(stage1CoreThemes)
    .flatMap((t) => t.nodes.flatMap((n) => unitsByNode(n)))
    .filter((u) => u.type === 'reflection')
    .length >= 5,
);
// 前置关系：10 层内线性链
const chainOk = Object.values(stage1CoreThemes).every((t) => {
  const units = t.nodes.flatMap((n) => unitsByNode(n));
  return units.every((u, i) => i === 0 || u.prerequisiteIds.length > 0);
});
check('E4 每条 10 层弧线内部有前置链', chainOk);

// ============================================================
console.log('\n== F. 第五境：杏林推理八步 =====================================');
check('F1 八步框架完整', Array.isArray(REASONING_EIGHT_STEPS) && REASONING_EIGHT_STEPS.length === 8);
for (const step of ['收集信息', '找关键线索', '区分主次', '建立假设', '寻找支持证据', '寻找反证', '修正病机', '综合解释']) {
  check(`F2 包含步骤: ${step}`, REASONING_EIGHT_STEPS.includes(step));
}

// ============================================================
console.log('\n== G. 第五境：病机推理挑战 =====================================');
const rc5 = reasoningChallengesByStage('stage5');
check('G1 至少 6 个推理挑战', rc5.length >= 6, `实际 ${rc5.length}`);
check('G2 难度覆盖 Lv1~Lv5', new Set(rc5.map((c) => c.level)).size >= 5, JSON.stringify([...new Set(rc5.map((c) => c.level))]));
for (const rc of rc5) {
  const key = rc.clues.filter((c) => c.grade === 'key').length;
  const minor = rc.clues.filter((c) => c.grade === 'minor').length;
  const dist = rc.clues.filter((c) => c.grade === 'distractor').length;
  check(`G3 ${rc.id}: 关键线索≥3/次要≥2/干扰≥2`, key >= 3 && minor >= 2 && dist >= 2,
    `实际 ${key}/${minor}/${dist}`);
  check(`G4 ${rc.id}: 多条候补假设且有最佳项`, rc.hypotheses.length >= 2 && rc.hypotheses.some((h) => h.isBest));
  check(`G5 ${rc.id}: 因果链完整`, rc.causalChain.length >= 3, `实际 ${rc.causalChain.length}`);
  check(`G6 ${rc.id}: 反证训练存在`, !!rc.counterEvidenceQuestion && !!rc.counterEvidenceAnswer);
  check(`G7 ${rc.id}: 迁移变式存在`, !!rc.transferVariant?.scenario && !!rc.transferVariant?.question);
  check(`G8 ${rc.id}: 错误恢复携带错因映射`, rc.commonMistakes.length >= 1 && rc.commonMistakes.every((m) => !!m.mistakeKind && !!m.description));
  check(`G9 ${rc.id}: 非最佳假设注明破绽`, rc.hypotheses.filter((h) => !h.isBest).every((h) => !!h.weakness));
}
check('G10 最佳假设 id 有效', rc5.every((rc) => rc.hypotheses.some((h) => h.id === rc.bestHypothesisId)));

// ============================================================
console.log('\n== H. 第五境：毕业条件与毕业试炼 ================================');
const gc5 = criterionByStage('stage5');
check('H1 第五境毕业条件存在', !!gc5);
check('H2 毕业试炼已绑定', gc5?.finalTrialId === 'trial-stage5');
check('H3 必掌握覆盖病机核心节点', (gc5?.requiredKnowledgeIds ?? []).length >= 8);
const tr5 = trialByStage('stage5');
check('H4 第五境试炼定义存在', !!tr5);
check('H5 推理维度阈值更高（≥0.7）', !!tr5 && tr5.thresholds.reasoning >= 0.7);
check('H6 场景节点绑定病机节点', !!tr5 && tr5.scenarioNodeIds.length >= 4);

// ============================================================
console.log('\n== I. 第一境 ↔ 第五境 知识桥梁 =================================');
const bridgeIds = knowledgeBridgeArray.map((b) => b.id);
for (const required of [
  'bridge-yin-yang-to-five-elements',
  'bridge-whole-to-reasoning',
  'bridge-yin-yang-to-pathogenesis',
  'bridge-zangfu-to-pathogenesis',
]) {
  check(`I1 桥梁存在: ${required}`, bridgeIds.includes(required));
}
// 桥梁必须"真实"：连接到第五境病机节点
const stage5Bridges = knowledgeBridgeArray.filter((b) => b.toNodeId.startsWith('v3-s5-') || b.fromNodeId.startsWith('v3-s5-'));
check('I2 存在连通第五境的桥梁', stage5Bridges.length >= 3, `实际 ${stage5Bridges.length}`);

// ============================================================
console.log('\n== J. Agent 教练：可解释决策 ===================================');
check('J1 动作标签覆盖 8 种教练动作', Object.keys(coach.ACTION_LABEL).length === 8);

store.resetProgress();
let p = store.getProgress();
const d0 = coach.coachDecision(p);
check('J2 兜底决策可解释（含观察/动作/理由）', !!d0.observation && !!d0.action && !!d0.actionLabel && !!d0.reason);

// 第五境分支：无错因时应推荐病机推理案例
p.currentStageId = 'stage5';
const d5 = coach.coachDecision(p);
check('J3 第五境无错因时推荐推理案例', d5.reason.includes('病机') && (d5.action === 'switch_example' || d5.action === 'probe'), d5.reason);

// 错因驱动分支：注入 reasoning_error 主导后，教练应给出"对比案例"并解释原因
store.resetProgress();
p = store.getProgress();
p.mistakes.push({
  kind: 'single_symptom_jump',
  category: 'reasoning_error',
  nodeId: 'v3-s5-n6',
  refId: 'rc-stage5-lv1-qi-stagnation',
  at: START,
  sceneKind: 'variation',
} as any);
p.mistakePatterns.push({
  kind: 'single_symptom_jump',
  category: 'reasoning_error',
  count: 3,
  recovered: false,
  lastSeenAt: START,
} as any);
const dErr = coach.coachDecision(p);
check('J4 有错因时教练按错因决策并可解释', !!dErr.reason && dErr.reason.length > 0, dErr.reason);

// ============================================================
console.log('\n== M. 第五境：杏林推理八步互动训练器 ===============================');
const rcSample = reasoningChallengeArray[0];
const rcKeyIds = rcSample.clues.filter((c) => c.grade === 'key').map((c) => c.id);

// M1 会话创建：八步全待处理，从第 0 步开始
const sess = reasoner.createReasonerSession(rcSample);
check(
  'M1 会话创建：八步待处理且从 0 开始',
  sess.steps.length === 8 && sess.steps.every((s) => s === 'pending') && sess.currentStep === 0,
);

// M2 步骤推进（信息逐步展示，不一次性给全）
reasoner.setActiveStep(sess, 'collect');
reasoner.completeStep(sess, 'collect');
check('M2 步骤推进：完成第一步后前进并标记 done', sess.steps[0] === 'done' && sess.currentStep === 1);

// M3 行为记录全部来自真实操作
reasoner.recordCluesViewed(sess, rcSample.clues.map((c) => c.id), rcSample.clues.length);
reasoner.recordKeyClueSelection(sess, rcKeyIds);
reasoner.recordCluePrioritization(sess, { key: rcKeyIds, minor: [], distractor: [] });
reasoner.recordHypotheses(sess, 2);
reasoner.recordSupportEvidence(sess, rcKeyIds);
reasoner.recordCounterEvidence(sess, true);
reasoner.recordRevision(sess, true, 0.8);
reasoner.recordSynthesis(sess, 0.9);
reasoner.recordTransfer(sess, true);
check(
  'M3 行为指标被真实记录',
  sess.metrics.cluesViewed === rcSample.clues.length &&
    sess.metrics.hypothesisCount === 2 &&
    sess.metrics.counterEvidenceUsage === true &&
    sess.metrics.revisionAbility === 0.8 &&
    sess.metrics.transferSuccess === true,
);

// M4 多假设（不强迫唯一答案）
check('M4 允许多假设（A/B 两个假设）', sess.metrics.hypothesisCount === 2);

// M5 忽略反证 → ignore_counterevidence
const m5 = reasoner.detectReasoningMistake(sess, rcSample, {
  finalHypothesisId: rcSample.bestHypothesisId, counterUsed: false, revised: true, transferPassed: true,
});
check('M5 未主动找反证被识别为 ignore_counterevidence', m5?.mistakeKind === 'ignore_counterevidence', m5?.mistakeKind);

// M6 迁移失败 → transfer_fail
const m6 = reasoner.detectReasoningMistake(sess, rcSample, {
  finalHypothesisId: rcSample.bestHypothesisId, counterUsed: true, revised: true, transferPassed: false,
});
check('M6 迁移失败被识别为 transfer_fail', m6?.mistakeKind === 'transfer_fail', m6?.mistakeKind);

// M7 过早判断 → premature_judgment
const sess7 = reasoner.createReasonerSession(rcSample);
reasoner.recordCluesViewed(sess7, rcKeyIds.slice(0, 1), rcSample.clues.length);
const m7 = reasoner.detectReasoningMistake(sess7, rcSample, {
  finalHypothesisId: rcSample.bestHypothesisId, counterUsed: true, revised: true, transferPassed: null,
});
check('M7 线索没看全就判断被识别为 premature_judgment', m7?.mistakeKind === 'premature_judgment', m7?.mistakeKind);

// M8 面对新线索却未修正 → failed_revision
const m8 = reasoner.detectReasoningMistake(sess, rcSample, {
  finalHypothesisId: rcSample.bestHypothesisId, counterUsed: true, revised: false, transferPassed: null,
});
check('M8 面对新线索未修正被识别为 failed_revision', m8?.mistakeKind === 'failed_revision', m8?.mistakeKind);

// M9 掌握证据：维度不足 → 不 mastered 且列出弱项
const weakSess = reasoner.createReasonerSession(rcSample);
reasoner.recordKeyClueSelection(weakSess, []);
reasoner.recordSynthesis(weakSess, 0.2);
reasoner.recordCounterEvidence(weakSess, false);
reasoner.recordRevision(weakSess, false, 0);
reasoner.recordTransfer(weakSess, false);
const evWeak = reasoner.computeMasteryEvidence({
  sessions: [weakSess], challenges: [rcSample], conceptUnderstanding: 0.4, retention: 0.4,
});
check('M9 维度不足不判 mastered 并列出弱项', evWeak.mastered === false && evWeak.weakDimensions.length > 0, JSON.stringify(evWeak.weakDimensions));

// M10 掌握证据：七维全达标 → mastered
const goodSess = reasoner.createReasonerSession(rcSample);
reasoner.recordKeyClueSelection(goodSess, rcKeyIds);
reasoner.recordCluesViewed(goodSess, rcSample.clues.map((c) => c.id), rcSample.clues.length);
reasoner.recordSynthesis(goodSess, 1);
reasoner.recordCounterEvidence(goodSess, true);
reasoner.recordRevision(goodSess, true, 1);
reasoner.recordTransfer(goodSess, true);
const evGood = reasoner.computeMasteryEvidence({
  sessions: [goodSess], challenges: [rcSample], conceptUnderstanding: 1, retention: 1,
});
check('M10 七维全达标判 mastered', evGood.mastered === true, JSON.stringify(evGood.weakDimensions));

// M11 MistakeEngine 接入：八类推理错因都能归类
const allKinds = ['single_symptom_jump', 'premature_judgment', 'weak_evidence', 'ignore_counterevidence', 'failed_revision', 'overlook_clue', 'concept_confusion', 'transfer_fail'];
check('M11 八类推理错因均接入 MistakeEngine', allKinds.every((k) => mistake.classifyCategory(k as any) !== null));

// ============================================================
console.log('\n== L. ID 命名规范 & 数据兼容 =====================================');
const s1ModuleIds = new Set(stages.modulesOfStage('stage1').map((m) => m.id));
check(
  'L1 第一境章节 moduleId 与真实模块对齐',
  learningChapterArray.filter((c) => c.stageId === 'stage1').every((c) => s1ModuleIds.has(c.moduleId)),
);
const s5ModuleIds = new Set(stages.modulesOfStage('stage5').map((m) => m.id));
check(
  'L2 第五境章节 moduleId 与真实模块对齐',
  learningChapterArray.filter((c) => c.stageId === 'stage5').every((c) => s5ModuleIds.has(c.moduleId)),
);
check(
  'L3 毕业条件引用的节点均真实存在',
  graduationCriterionArray.flatMap((gc) => gc.requiredKnowledgeIds).every((id) => !!stages.v3NodeById(id)),
);

// ============================================================
console.log('\n== K. 毕业试炼总数兼容 =========================================');
check('K1 毕业试炼 == 毕业条件数量', graduationTrialArray.length === graduationCriterionArray.length);

// ---- 汇总 ----
console.log(`\n============================================================`);
console.log(` 通过 ${pass} · 失败 ${fail}`);
if (fail > 0) {
  console.log('\n失败项：');
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
} else {
  console.log(' ✅ 全部通过');
  process.exit(0);
}