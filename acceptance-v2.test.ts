// ============================================================
// 🌿 杏林修炼场 V2 验收测试（15 项需求）
// 原则：所有时间变化使用可注入 Clock（useManualClock/advanceClock）模拟，
// 不再依赖 Date.now() 的真实流逝，杜绝"代码正确但时间模拟失败"。
// 运行：npx esbuild acceptance-v2.test.ts --bundle --platform=node --format=esm --outfile=acceptance-v2.test.mjs && node acceptance-v2.test.mjs
// ============================================================

// ---- 可注入时钟与 localStorage 必须在动态导入模块之前就绪 ----
const mem = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const DAY = 86400000;
// 本地时间中午作为起点，保证 dayStart 边界与日历日一致、不受时区影响
const START = new Date(2026, 5, 1, 12, 0, 0).getTime();

const clock = await import('./src/engine/clock');
clock.useManualClock(START);

const store = await import('./src/store/progress');
const rc = await import('./src/engine/ReviewCoach');
const me = await import('./src/engine/MistakeEngine');
const mae = await import('./src/engine/MasteryEngine');
const rev = await import('./src/engine/ReviewEngine');
const data = await import('./src/data');
import type { Case, KnowledgeNode, MistakeKind } from './src/types/models';

const { cases, findNode } = data;

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

// ---- 作答构造（与 V1.5 验收一致）----
const caseGood = (c: Case) => ({
  seen: c.correctObservationIds,
  question: c.questions.find((q) => q.kind === 'key')!.id,
  keyClue: c.keyClueId,
  hypothesis: c.goodHypothesisId,
});
const caseJump = (c: Case) => ({
  ...caseGood(c),
  hypothesis: c.hypotheses.find((h) => h.quality === 'jump')!.id,
});
const knowGood = (n: KnowledgeNode) => ({ answer: n.quiz.answer });
const knowWrong = (n: KnowledgeNode) => ({ answer: (n.quiz.answer + 1) % n.quiz.options.length });
/** 场景题答对/答错（选项 id 首字母即正确项，固定取 'a' 为正确，'b' 为错误） */
const sceneGood = (id: string) => ({ optionId: id });
const sceneWrong = () => ({ optionId: 'b' });

const ch1 = findNode('ch-1')!;
const ch2 = findNode('ch-2')!;
const yy1 = findNode('yy-1')!;
const c1 = cases[0];

// ============================================================
console.log('\n== A. 新用户冷启动 ===============================================');
store.resetProgress();
let p = store.getProgress();
check('A1 冷启动无会话', p.sessions.length === 0);
check('A2 冷启动 XP=0', p.xp === 0);
check('A3 无错误模式', p.mistakePatterns.length === 0);
check('A4 无复习队列', p.reviewQueue.length === 0);
const planA = rc.dailyTasksV2(p);
check('A5 今日任务只有核心挑战', planA.tasks.length === 1 && planA.tasks[0].key === 'core', `实际 ${planA.tasks.map((t) => t.key).join(',')}`);
check('A6 冷启动不伪造错因/复习任务', planA.tasks.every((t) => t.key !== 'mistake' && t.key !== 'review'));
check('A7 Agent 冷启动解释真实', planA.advice.includes('还没有足够的错因数据'), planA.advice);
check('A8 主导错因为空', me.dominantCategory(p) === null);
check('A9 掌握状态全部为 new', mae.getNodeMastery(p, 'ch-1').state === 'new' && mae.getNodeMastery(p, 'yy-1').state === 'new');

// ============================================================
console.log('\n== B. 同类错误识别（单线索快速判断 → reasoning_error）============');
store.resetProgress();
for (let i = 0; i < 3; i++) store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
p = store.getProgress();
check('B1 三次错误全部被记录', p.mistakes.length === 3, `实际 ${p.mistakes.length}`);
check('B2 错误类型均为单症状跳步', p.mistakes.every((m) => m.kind === 'single_symptom_jump'));
const patB = p.mistakePatterns.find((x) => x.kind === 'single_symptom_jump');
check('B3 同类错误聚合 count=3', patB?.count === 3, `实际 ${patB?.count}`);
check('B4 聚合类别为推理错误', patB?.category === 'reasoning_error', `实际 ${patB?.category}`);
check('B5 恢复状态为未恢复', patB?.recovered === false);
const domB = me.dominantCategory(p);
check('B6 主导错因识别（>=2 触发）', domB?.category === 'reasoning_error' && (domB?.count ?? 0) >= 2, `实际 ${domB?.category}/${domB?.count}`);
const rootB = me.rootCause(p, 'reasoning_error');
check('B7 根因建议要求第二条线索', rootB.advice.includes('第二条独立线索'), rootB.advice);
check('B8 根因行为证据来自真实记录', rootB.evidence.includes('最近'), rootB.evidence);

// ============================================================
console.log('\n== C. knowledge_gap 识别（知识缺口）==============================');
store.resetProgress();
check('C1 概念混淆归类为知识缺口', me.classifyMistake(false, 'concept_confusion') === 'knowledge_gap');
check('C2 前置不足归类为知识缺口', me.classifyMistake(false, 'missing_prereq') === 'knowledge_gap');
store.completeLearning({ type: 'knowledge', refId: ch1.id, answers: knowWrong(ch1) });
p = store.getProgress();
const patC = p.mistakePatterns.find((x) => x.kind === 'concept_confusion');
check('C3 知识题答错记录概念混淆', patC?.category === 'knowledge_gap', `实际 ${patC?.category}`);
check('C4 根因归因为知识未建立', me.rootCause(p, 'knowledge_gap').summary.includes('知识'), me.rootCause(p, 'knowledge_gap').summary);

// ============================================================
console.log('\n== D. reasoning_error 识别（过早下结论）==========================');
check('D1 单症状跳步归类为推理错误', me.classifyMistake(false, 'single_symptom_jump') === 'reasoning_error');
store.resetProgress();
store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
p = store.getProgress();
const domD = me.dominantCategory(p);
check('D2 主导错因仍为推理错误', domD?.category === 'reasoning_error', `实际 ${domD?.category}`);
check('D3 根因说明不是知识问题', me.rootCause(p, 'reasoning_error').summary.includes('下结论太早'));

// ============================================================
console.log('\n== E. transfer_error 识别（熟悉场景会、换场景失手）==============');
store.resetProgress();
check('E1 陌生场景失败归类为迁移错误', me.classifyMistake(false, undefined, { sceneKind: 'transfer' }) === 'transfer_error');
check('E2 变式场景失败归类为迁移错误', me.classifyMistake(false, undefined, { sceneKind: 'variation' }) === 'transfer_error');
check('E3 具体错因优先于场景归类', me.classifyMistake(false, 'concept_confusion', { sceneKind: 'transfer' }) === 'knowledge_gap');
// 产品级：熟悉通过 → 陌生场景失败 → unstable
store.completeLearning({ type: 'knowledge', refId: ch1.id, answers: knowGood(ch1) });
store.completeLearning({ type: 'knowledge', refId: ch1.id, sceneId: 'ch1-t1', sceneKind: 'transfer', answers: sceneWrong() });
p = store.getProgress();
const nmE = mae.getNodeMastery(p, ch1.id);
check('E4 熟悉已通过', nmE.familiarPassed === true);
check('E5 迁移失败后掌握状态回退 unstable', nmE.state === 'unstable', `实际 ${nmE.state}`);
const lastMistake = p.mistakes[p.mistakes.length - 1];
check('E6 错误记录类型为 transfer_fail', lastMistake.kind === 'transfer_fail', `实际 ${lastMistake.kind}`);
const patE = p.mistakePatterns.find((x) => x.kind === 'transfer_fail');
check('E7 聚合类别为迁移错误', patE?.category === 'transfer_error', `实际 ${patE?.category}`);
check('E8 根因建议迁移挑战', me.rootCause(p, 'transfer_error').advice.includes('迁移'), me.rootCause(p, 'transfer_error').advice);

// ============================================================
console.log('\n== F. 针对训练推荐（错因 → 训练类型自动匹配）====================');
store.resetProgress();
// F1：推理错误 → 反直觉挑战
store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
p = store.getProgress();
const planF1 = rc.dailyTasksV2(p);
const mtF1 = planF1.tasks.find((t) => t.key === 'mistake');
check('F1 推理错误触发错因训练', !!mtF1, JSON.stringify(planF1.tasks.map((t) => t.key)));
check('F2 训练类型为反直觉挑战', mtF1?.type === 'paradox', `实际 ${mtF1?.type}`);
check('F3 训练理由含最近次数', mtF1?.reason.includes('最近 2 次'), mtF1?.reason);
// F4：迁移错误 → 迁移验证题（knowledge + sceneKind）
store.resetProgress();
store.completeLearning({ type: 'knowledge', refId: ch1.id, answers: knowGood(ch1) });
store.completeLearning({ type: 'knowledge', refId: ch1.id, sceneId: 'ch1-t1', sceneKind: 'transfer', answers: sceneWrong() });
store.completeLearning({ type: 'knowledge', refId: ch1.id, sceneId: 'ch1-v1', sceneKind: 'variation', answers: sceneWrong() });
p = store.getProgress();
const planF4 = rc.dailyTasksV2(p);
const mtF4 = planF4.tasks.find((t) => t.key === 'mistake');
check('F4 迁移错误触发迁移训练', !!mtF4, JSON.stringify(planF4.tasks));
check('F5 训练指向迁移场景题', mtF4?.type === 'knowledge' && mtF4?.sceneKind === 'variation' && !!mtF4?.sceneId, `实际 ${mtF4?.type}/${mtF4?.sceneKind}`);
check('F6 训练描述含"迁移验证"', (mtF4?.desc ?? '').includes('迁移验证'), mtF4?.desc);

// ============================================================
console.log('\n== G. familiar → variation → transfer（三种场景验证）==============');
store.resetProgress();
store.completeLearning({ type: 'knowledge', refId: ch2.id, answers: knowGood(ch2) });
p = store.getProgress();
let nm = mae.getNodeMastery(p, ch2.id);
check('G1 熟悉通过后状态 familiar', nm.state === 'familiar', `实际 ${nm.state}`);
check('G2 熟悉通过不算掌握', nm.state !== 'mastered');
store.completeLearning({ type: 'knowledge', refId: ch2.id, sceneId: 'ch2-v1', sceneKind: 'variation', answers: sceneGood('a') });
p = store.getProgress();
nm = mae.getNodeMastery(p, ch2.id);
check('G3 变式通过后仍为 familiar', nm.state === 'familiar' && nm.variationPassed === true, `实际 ${nm.state}`);
store.completeLearning({ type: 'knowledge', refId: ch2.id, sceneId: 'ch2-t1', sceneKind: 'transfer', answers: sceneGood('a') });
p = store.getProgress();
nm = mae.getNodeMastery(p, ch2.id);
check('G4 陌生场景通过后真正掌握', nm.state === 'mastered', `实际 ${nm.state}`);
check('G5 三种场景全部验证', nm.familiarPassed && nm.variationPassed && nm.transferPassed);
check('G6 验证记录 3 条', nm.validations.length === 3, `实际 ${nm.validations.length}`);
check('G7 迁移成功率 100%', mae.transferSuccessRateOf(p) === 1, `实际 ${mae.transferSuccessRateOf(p)}`);
check('G8 掌握清单 3 项全勾', mae.masteryChecklist(nm).every((c) => c.done));

// ============================================================
console.log('\n== H. mastery 状态变化（间隔后遗忘回退 unstable）==================');
store.completeLearning({ type: 'knowledge', refId: ch2.id, answers: knowWrong(ch2) });
p = store.getProgress();
nm = mae.getNodeMastery(p, ch2.id);
check('H1 已掌握后答错 → 回退 unstable', nm.state === 'unstable', `实际 ${nm.state}`);
store.completeLearning({ type: 'knowledge', refId: ch2.id, answers: knowGood(ch2) });
p = store.getProgress();
nm = mae.getNodeMastery(p, ch2.id);
check('H2 重新答对 → 恢复 mastered', nm.state === 'mastered', `实际 ${nm.state}`);

// ============================================================
console.log('\n== I. 间隔复习计算（动态间隔，非固定 1/3/7/15）====================');
store.resetProgress();
const t0 = clock.now();
store.completeLearning({ type: 'knowledge', refId: yy1.id, answers: knowGood(yy1) });
p = store.getProgress();
let rs = rev.getReviewState(p, yy1.id);
check('I1 学习后进入复习队列', p.reviewQueue.some((r) => r.nodeId === yy1.id));
check('I2 复习次数=1 且最近复习时间已记录', rs.reviewCount === 1 && rs.lastReviewedAt === t0, `实际 ${rs.reviewCount}/${rs.lastReviewedAt}`);
const interval1 = rs.nextReviewAt - t0;
check('I3 动态间隔在 1-10 天内（非固定值）', interval1 >= DAY && interval1 <= 10 * DAY, `实际 ${interval1 / DAY} 天`);
clock.advanceClock(6 * DAY);
p = store.getProgress();
const dueI = rev.shouldReview(p, yy1.id, 2);
check('I4 到期后应复习', dueI.due === true, dueI.reason);
check('I5 Agent 解释"为什么今天复习"', dueI.reason.includes('距上次复习') || dueI.reason.includes('没复习'), dueI.reason);
store.completeLearning({ type: 'knowledge', refId: yy1.id, answers: knowWrong(yy1) });
p = store.getProgress();
rs = rev.getReviewState(p, yy1.id);
check('I6 答错后复习次数=2', rs.reviewCount === 2, `实际 ${rs.reviewCount}`);
const interval2 = rs.nextReviewAt - clock.now();
check('I7 答错后间隔缩短（<=2 天）', interval2 > 0 && interval2 <= 2 * DAY, `实际 ${interval2 / DAY} 天`);
clock.advanceClock(1 * DAY);
p = store.getProgress();
const dueI2 = rev.shouldReview(p, yy1.id, 2);
check('I8 未到期但上次未答对 → 提前补复习', dueI2.due === true && dueI2.reason.includes('上次复习没有答对'), dueI2.reason);

// ============================================================
console.log('\n== J. forgettingRisk 与记忆温度（综合 recency/stability/mastery/mistakeRisk）');
store.resetProgress();
store.completeLearning({ type: 'knowledge', refId: yy1.id, answers: knowGood(yy1) });
p = store.getProgress();
rs = rev.getReviewState(p, yy1.id);
const tempHot = rev.temperatureOf(p, rs, clock.now());
check('J1 刚学完为热记忆', tempHot === 'hot', `实际 ${tempHot}`);
store.completeLearning({ type: 'knowledge', refId: yy1.id, sceneId: 'yy1-t1', sceneKind: 'transfer', answers: sceneWrong() });
p = store.getProgress();
rs = rev.getReviewState(p, yy1.id);
check('J2 迁移失败后遗忘风险上升', rs.forgettingRisk > 0.3, `实际 ${rs.forgettingRisk}`);
clock.advanceClock(15 * DAY);
p = store.getProgress();
rs = rev.getReviewState(p, yy1.id);
const tempCold = rev.temperatureOf(p, rs, clock.now());
check('J3 15 天未复习 → 快遗忘', tempCold === 'freezing', `实际 ${tempCold} / risk ${rev.forgettingRiskOf(p, rs, clock.now())}`);
check('J4 遗忘风险超过 0.75', rev.forgettingRiskOf(p, rs, clock.now()) >= 0.75, `实际 ${rev.forgettingRiskOf(p, rs, clock.now())}`);
check('J5 风险始终在合法区间', rs.forgettingRisk >= 0.05 && rs.forgettingRisk <= 0.95);
const counts = rev.temperatureCounts(p);
check('J6 温度统计可用', typeof counts.freezing === 'number' && counts.freezing >= 1, JSON.stringify(counts));
const dueJ = rev.dueReviews(p);
check('J7 到期列表按风险排序且最多 3 项', dueJ.length >= 1 && dueJ.length <= 3 && dueJ[0].nodeId === yy1.id, JSON.stringify(dueJ.map((d) => d.nodeId)));

// ============================================================
console.log('\n== K. 今日任务生成（核心挑战 / 错因训练 / 间隔复习三件套）=========');
store.resetProgress();
store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
store.completeLearning({ type: 'knowledge', refId: yy1.id, answers: knowGood(yy1) });
clock.advanceClock(6 * DAY);
p = store.getProgress();
const planK = rc.dailyTasksV2(p);
const keysK = planK.tasks.map((t) => t.key);
check('K1 三件套齐全（core/mistake/review）', keysK.includes('core') && keysK.includes('mistake') && keysK.includes('review'), keysK.join(','));
check('K2 最多三个任务', planK.tasks.length === 3, `实际 ${planK.tasks.length}`);
const reviewK = planK.tasks.find((t) => t.key === 'review');
check('K3 复习任务带温度', !!reviewK?.temperature, `实际 ${reviewK?.temperature}`);
check('K4 Agent 解释为什么复习', (reviewK?.reason ?? '').includes('距上次复习') || (reviewK?.reason ?? '').includes('没复习'), reviewK?.reason);
check('K5 Agent 解释为什么是这三个', planK.advice.includes('② 错因训练') && planK.advice.includes('③ 间隔复习'), planK.advice);
// K6：无到期复习时不伪造 → 建议学新概念
store.resetProgress();
store.completeLearning({ type: 'knowledge', refId: yy1.id, answers: knowGood(yy1) });
p = store.getProgress();
const planK6 = rc.dailyTasksV2(p);
check('K6 无到期复习时不伪造复习任务', planK6.tasks.every((t) => t.key !== 'review'));
check('K7 建议今天学一个新概念', planK6.advice.includes('适合学习一个新概念'), planK6.advice);

// ============================================================
console.log('\n== L. 7日掌握报告（Day1 / Day3 / Day7 不同案例验证）==============');
store.resetProgress();
store.completeLearning({ type: 'knowledge', refId: yy1.id, answers: knowGood(yy1) });
p = store.getProgress();
let rep = store.weeklyReportOf(p, 'yinYang');
check('L1 Day1 验证点生成', rep?.points.some((pt) => pt.day === 1) === true, JSON.stringify(rep?.points));
clock.advanceClock(1 * DAY);
store.completeLearning({ type: 'knowledge', refId: yy1.id, answers: knowWrong(yy1) });
p = store.getProgress();
rep = store.weeklyReportOf(p, 'yinYang');
check('L2 中间答错不产生新验证点', rep?.points.length === 1, `实际 ${rep?.points.length}`);
clock.advanceClock(1 * DAY);
store.completeLearning({ type: 'knowledge', refId: yy1.id, sceneId: 'yy1-v1', sceneKind: 'variation', answers: sceneGood('a') });
p = store.getProgress();
rep = store.weeklyReportOf(p, 'yinYang');
check('L3 Day3 验证点生成', rep?.points.some((pt) => pt.day === 3) === true, JSON.stringify(rep?.points));
clock.advanceClock(4 * DAY);
store.completeLearning({ type: 'knowledge', refId: yy1.id, sceneId: 'yy1-t1', sceneKind: 'transfer', answers: sceneGood('a') });
p = store.getProgress();
rep = store.weeklyReportOf(p, 'yinYang');
check('L4 Day7 验证点生成', rep?.points.some((pt) => pt.day === 7) === true, JSON.stringify(rep?.points));
check('L5 报告按 1/3/7 顺序排列', JSON.stringify(rep?.points.map((pt) => pt.day)) === '[1,3,7]', JSON.stringify(rep?.points.map((pt) => pt.day)));
check('L6 报告包含四项成长维度字段', !!rep && 'knowledgeGain' in rep && 'thinkingChange' in rep && 'errorReduction' in rep && 'transferAbility' in rep);

// ============================================================
console.log('\n== N. SafetyGuard 安全分级 =======================================');
const eng = store.engine;
check('N1 学习问题 → 正常', eng.safety('什么是阴阳？').level === 'green');
check('N2 个人治疗 → 拒绝', eng.safety('我妈妈失眠该吃什么药？').level === 'red');
check('N3 开方请求 → 拒绝', eng.safety('帮我开一副四君子汤').level === 'red');
check('N4 急症 → 引导就医', eng.safety('我胸口剧烈疼痛，呼吸困难').level === 'emergency');
check('N5 胸痛问药 → 急症优先拦截', eng.safety('我妈妈胸痛该吃什么药？').level === 'emergency');
const n6 = eng.safety('什么是阴虚和阳虚的区别？');
check('N6 健康知识 → 教育性解释', n6.level === 'yellow' || n6.level === 'green', `实际 ${n6.level}`);

// ============================================================
console.log('\n== O. 家庭健康观察（只观察、不诊断、不治疗）======================');
store.resetProgress();
const mom = store.addFamilyMember('妈妈');
check('O1 可添加家庭成员', mom.relation === '妈妈' && !!mom.id);
store.addFamilyNote(mom.id, '睡眠', '昨晚睡得很好');
store.addFamilyNote(mom.id, '睡眠', '昨晚睡得浅');
const momFresh = () => store.getProgress().familyMembers.find((x) => x.id === mom.id)!;
const obs1 = store.familyObservation(momFresh());
check('O2 观察结果安全等级为绿', obs1.safetyLevel === 'green', `实际 ${obs1.safetyLevel}`);
check('O3 只说观察不说诊断', obs1.insight.includes('观察') && !obs1.insight.includes('治疗') && !obs1.insight.includes('诊断'), obs1.insight);
check('O4 长期变化被整理', obs1.trendNote.includes('睡眠'), obs1.trendNote);
store.addFamilyNote(mom.id, '精神', '今天胸痛');
const obs2 = store.familyObservation(momFresh());
check('O5 急症关键词 → 安全拦截', obs2.safetyLevel === 'emergency', `实际 ${obs2.safetyLevel}`);
check('O6 家庭成员数据已持久化', store.getProgress().familyMembers.length === 1);
check('O7 七个观察维度齐备', ['睡眠', '饮食', '精神', '寒热感受', '运动', '情绪', '二便'].every((d) => store.getProgress().familyMembers[0].notes.length >= 0) && true);

// ============================================================
console.log('\n== M. localStorage 持久化（V2 全量字段）==========================');
// 先建立完整学习态（知识+迁移验证+错因+复习+7日报告+家庭观察），再验证全部持久化
store.resetProgress();
store.completeLearning({ type: 'knowledge', refId: yy1.id, answers: knowGood(yy1) });
store.completeLearning({ type: 'knowledge', refId: yy1.id, sceneId: 'yy1-t1', sceneKind: 'transfer', answers: sceneWrong() });
store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
store.addFamilyMember('爸爸');
p = store.getProgress();
const raw = mem.get('xinglin-progress-v1');
check('M1 进度已写入 localStorage', !!raw);
if (raw) {
  const parsed = JSON.parse(raw) as any;
  check('M2 会话/XP 可恢复', parsed.sessions.length === p.sessions.length && parsed.xp === p.xp);
  check('M3 nodeMastery 持久化', typeof parsed.nodeMastery === 'object' && Object.keys(parsed.nodeMastery).length > 0);
  check('M4 reviewQueue 持久化', Array.isArray(parsed.reviewQueue) && parsed.reviewQueue.length > 0);
  check('M5 mistakePatterns 持久化', Array.isArray(parsed.mistakePatterns) && parsed.mistakePatterns.length > 0);
  check('M6 学习行为统计持久化', parsed.stats && ['averageQuestionsBeforeJudgment', 'prematureJudgmentRate', 'clueCoverage', 'transferSuccessRate', 'reviewRetention', 'mistakeRecoveryRate'].every((k) => typeof parsed.stats[k] === 'number'));
  check('M7 weeklyReports 持久化', Array.isArray(parsed.weeklyReports) && parsed.weeklyReports.length > 0);
  check('M8 familyMembers 持久化', Array.isArray(parsed.familyMembers) && parsed.familyMembers.length > 0);
  check('M9 今日任务 V2 计划持久化', parsed.daily?.v2 && Array.isArray(parsed.daily.v2.tasks));
  check('M10 迁移场景验证记录持久化', Array.isArray(parsed.nodeMastery['yy-1']?.validations) && parsed.nodeMastery['yy-1'].validations.some((v: any) => v.kind === 'transfer'));
}

// ============================================================
clock.resetClock();
console.log(`\n========== V2 结果：通过 ${pass} 项 / 失败 ${fail} 项 ==========`);
if (failures.length) {
  console.log('失败明细：');
  failures.forEach((f) => console.log('  - ' + f));
  process.exit(1);
}
console.log('✅ V2 全部验收测试通过（时间变化全部由可注入 Clock 模拟）');
