/**
 * 🌿 杏林修炼场 V1.5 — 验收测试
 * 覆盖 12 项验收标准：冷启动 / 完成病例 / 连续错误 / 模式识别 / 推荐变化 /
 * 大脑更新 / XP / 徽章 / 连续学习 / localStorage / 重置 / SafetyGuard
 */
import type { UserProgress } from './src/types/models';
import { TOPIC_META, TOPIC_ORDER } from './src/types/models';

// ---- mock localStorage（模拟浏览器持久层）----
const mem = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => {
    mem.set(k, v);
  },
  removeItem: (k: string) => {
    mem.delete(k);
  },
  clear: () => mem.clear(),
};

const store = await import('./src/store/progress');
const rc = await import('./src/engine/ReviewCoach');
const data = await import('./src/data');
const { cases, observationTasks, paradoxChallenges, findNode } = data;

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

const D = 86400000;
const now = () => Date.now();

// ---- 工具 ----
const caseGood = (c: any) => ({
  seen: c.correctObservationIds,
  question: c.questions.find((q: any) => q.kind === 'key')!.id,
  keyClue: c.keyClueId,
  hypothesis: c.goodHypothesisId,
});
const caseJump = (c: any) => ({
  ...caseGood(c),
  hypothesis: c.hypotheses.find((h: any) => h.quality === 'jump')!.id,
});
const obsGood = (t: any) => ({
  seen: t.seenOptions.filter((o: any) => o.isObservation).map((o: any) => o.id),
  objective: t.objectiveOptions.filter((o: any) => o.isObservation).map((o: any) => o.id),
  dimension: t.dimension,
});
const paraGood = (c: any) => ({
  claim: c.claimOptions.find((o: any) => o.correct)!.id,
  caseA: c.cases[0].options.find((o: any) => o.correct)!.id,
  caseB: c.cases[1].options.find((o: any) => o.correct)!.id,
});
const knowGood = (id: string) => {
  const n = findNode(id)!;
  return { answer: n.quiz.answer };
};

const c1 = cases[0];

console.log('\n== A. 新用户冷启动 ==');
store.resetProgress();
let p = store.getProgress();
check('A1 初始无会话', p.sessions.length === 0);
check('A2 初始 XP=0', p.xp === 0);
check('A3 discover 返回冷启动', rc.discover(p).kind === 'cold_start');
check('A4 冷启动文案不虚构', rc.discover(p).message.includes('还不了解你的学习习惯'));
const tag0 = rc.learningTag(p);
check('A5 标签冷启动状态', tag0.id === 'observer' && tag0.label.includes('待积累'));
check('A6 每日建议冷启动', rc.dailyTasks(p).advice.includes('第一个'));
check('A7 画像冷启动', rc.profile(p).text.includes('还没有足够'));
check('A8 冷启动推荐为全新内容（无错误文案）', !rc.recommend(p)[0]?.reason.includes('答错'));
check('A9 等级 Lv1 初识', store.levelFromXp(0).name === '初识者');

console.log('\n== B. 完成一个病例（正确五步）==');
const rB = store.completeLearning({ type: 'case', refId: c1.id, answers: caseGood(c1) });
p = store.getProgress();
check('B1 病例判断正确', rB.result.correct === true);
check('B2 首次完成 XP = 10+5 = 15', rB.earnedXp === 15, `实际 ${rB.earnedXp}`);
check('B3 会话已记录', p.sessions.length === 1);
check('B4 病例进入完成列表', p.completedCases.includes(c1.id));
check('B5 徽章「第一片叶」获得', p.badges.some((b) => b.id === 'first_leaf'));
check('B6 总 XP 正确', p.xp === 15, `实际 ${p.xp}`);
check('B7 每日任务推进', p.daily.done.includes(`case:${p.daily.caseId}`));
check('B8 记忆已开始积累', p.memory.learningHabits.some((h) => h.type === 'case' && h.count === 1));

console.log('\n== C. 连续答错同类问题（单症状跳步）==');
for (let i = 0; i < 3; i++) {
  store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
}
p = store.getProgress();
check('C1 错误被记录（3 次）', p.mistakes.length === 3);
check('C2 错误类型为单症状跳步', p.mistakes.every((m) => m.kind === 'single_symptom_jump'));
check('C3 记忆记录错误观念', (p.memory.misconceptions.find((m) => m.kind === 'single_symptom_jump')?.times ?? 0) >= 2);
const discC = rc.discover(p);
check('C4 Agent 识别连续错误', discC.kind === 'consecutive_errors', `实际 ${discC.kind}`);
check('C5 连续错误文案真实', discC.message.includes('连续 3 次'));
// 打破连续（答对一次）后，同类错误模式应优先
store.completeLearning({ type: 'case', refId: c1.id, answers: caseGood(c1) });
store.completeLearning({ type: 'case', refId: c1.id, answers: caseJump(c1) });
p = store.getProgress();
const discC2 = rc.discover(p);
check('C6 Agent 识别同类错误模式', discC2.kind === 'same_pattern', `实际 ${discC2.kind}`);
check('C7 同类错误文案真实', discC2.message.includes('过早下结论'));
check('C8 思维标签转为快速判断型', rc.learningTag(p).id === 'fast', `实际 ${rc.learningTag(p).id}`);
check('C9 推理模式已记录', (p.memory.reasoningPatterns.find((r) => r.kind === 'single_symptom_jump')?.count ?? 0) >= 3);

console.log('\n== D. 推荐变化 + XP 规则 ==');
const recD = rc.recommend(p);
check('D1 推荐不再冷启动', recD[0].reason.includes('答错'), `实际 ${recD[0]?.reason}`);
check('D2 弱项主题出现在推荐', recD.some((r) => r.topic === c1.topic));
const rD1 = store.completeLearning({ type: 'case', refId: c1.id, answers: caseGood(c1) });
check('D3 常规完成 XP=10（非首次）', rD1.earnedXp === 10, `实际 ${rD1.earnedXp}`);
const rD2 = store.completeLearning({ type: 'case', refId: c1.id, answers: caseGood(c1) });
check('D4 连续正确 XP=10+3=13', rD2.earnedXp === 13, `实际 ${rD2.earnedXp}`);
// 复习任务 XP：注入「昨日复习」场景（模拟真实错题生成的复习任务）
p = store.getProgress();
const reviewNode = findNode('ch-1')!;
p.daily.reviewRefId = reviewNode.id;
p.daily.reviewTopic = 'coldHeat';
const rD3 = store.completeLearning({ type: 'knowledge', refId: reviewNode.id, answers: knowGood(reviewNode.id) });
check('D5 复习 XP = 10+5首次+3连续+8复习 = 26', rD3.earnedXp === 26, `实际 ${rD3.earnedXp}`);
check('D6 XP 流水已记录', p.xpLog.length > 0);

console.log('\n== E. 徽章（真实行为自动获得）==');
// slow_down：10 次追问后再判断
for (let i = 0; i < 10; i++) store.completeLearning({ type: 'case', refId: c1.id, answers: caseGood(c1) });
p = store.getProgress();
check('E1 主动追问 10 次被记录', p.thoughtfulAsks >= 10);
check('E2 徽章「慢下来」获得', p.badges.some((b) => b.id === 'slow_down'));
// observer：10 次观察训练
for (let i = 0; i < 10; i++) {
  const t = observationTasks[i % observationTasks.length];
  store.completeLearning({ type: 'observation', refId: t.id, answers: obsGood(t) });
}
p = store.getProgress();
check('E3 观察训练累计 10 次', p.completedObservations.length >= 10);
check('E4 徽章「察象者」获得', p.badges.some((b) => b.id === 'observer'));
// breaker：5 次反直觉正确
for (let i = 0; i < 5; i++) {
  const c = paradoxChallenges[i % paradoxChallenges.length];
  store.completeLearning({ type: 'paradox', refId: c.id, answers: paraGood(c) });
}
p = store.getProgress();
check('E5 徽章「破局者」获得', p.badges.some((b) => b.id === 'breaker'));
// seven_days：模拟连续 7 天
p = store.getProgress();
for (let i = 0; i < 6; i++) {
  p.lastStudyTime = now() - D; // 每次都"昨天刚学过"→ streak 逐日 +1
  const t = observationTasks[0];
  store.completeLearning({ type: 'observation', refId: t.id, answers: obsGood(t) });
}
p = store.getProgress();
check('E6 连续 7 天达成', p.streak >= 7, `实际 ${p.streak}`);
check('E7 徽章「七日修炼」获得', p.badges.some((b) => b.id === 'seven_days'));
check('E8 五个徽章全部自动获得', p.badges.length === 5, `实际 ${p.badges.map((b) => b.id).join(',')}`);

console.log('\n== F. 大脑画像更新（真实数据）==');
const prof = rc.profile(p);
check('F1 画像文本基于真实数据', prof.text.length > 10 && !prof.text.includes('还没有足够'));
check('F2 优势来自行为', prof.strengths.length >= 1, `实际 ${prof.strengths.length}`);
check('F3 薄弱点来自错题', prof.weaknesses.length >= 1, `实际 ${prof.weaknesses.length}`);
check('F4 思维习惯记录跳步', prof.thinkingHabits.some((h) => h.label.includes('快速形成')));
check('F5 最近发现来自错题', prof.recentFindings.length >= 1);
check('F6 偏好模式非空', p.memory.preferredLearningMode !== 'none');

console.log('\n== G. 连续学习机制（中断不惩罚）==');
store.resetProgress();
p = store.getProgress();
const t0 = observationTasks[0];
store.completeLearning({ type: 'observation', refId: t0.id, answers: obsGood(t0) });
p = store.getProgress();
check('G1 首日连续=1', p.streak === 1);
store.completeLearning({ type: 'observation', refId: t0.id, answers: obsGood(t0) });
p = store.getProgress();
check('G2 同日多次不叠加', p.streak === 1, `实际 ${p.streak}`);
p.lastStudyTime = now() - D;
store.completeLearning({ type: 'observation', refId: t0.id, answers: obsGood(t0) });
p = store.getProgress();
check('G3 次日连续=2', p.streak === 2, `实际 ${p.streak}`);
p.lastStudyTime = now() - 3 * D;
store.completeLearning({ type: 'observation', refId: t0.id, answers: obsGood(t0) });
p = store.getProgress();
check('G4 中断后从 1 重新开始', p.streak === 1, `实际 ${p.streak}`);
check('G5 中断标记「修炼未断」', p.streakBroken === true);

console.log('\n== H. 每日任务 + 今日修炼完成总结 ==');
store.resetProgress();
p = store.getProgress();
store.ensureDailyToday();
p = store.getProgress();
check('H1 今日案件任务生成', p.daily.caseId !== null);
check('H2 今日观察任务生成', p.daily.observationId !== null);
const cA = cases.find((c) => c.id === p.daily.caseId)!;
store.completeLearning({ type: 'case', refId: cA.id, answers: caseGood(cA) });
store.completeLearning({ type: 'observation', refId: p.daily.observationId!, answers: obsGood(observationTasks.find((o) => o.id === p.daily.observationId)!) });
p = store.getProgress();
check('H3 任务推进 2/2（复习任务无数据时不强制）', p.daily.done.length >= 2);
const targets = [p.daily.caseId, p.daily.observationId].filter(Boolean);
const allTargetsDone = targets.every((t) => p.daily.done.includes(`case:${t}`) || p.daily.done.includes(`observation:${t}`));
if (targets.length >= 2 && allTargetsDone) {
  check('H4 今日修炼完成', p.daily.allDone === true);
  check('H5 Agent 总结真实生成', !!p.dailySummary && p.dailySummary.length > 0, `实际 ${p.dailySummary}`);
} else {
  check('H4 今日修炼完成（有复习任务时需补齐）', p.daily.allDone === true);
  check('H5 Agent 总结真实生成', !!p.dailySummary);
}

console.log('\n== I. localStorage 持久化 ==');
const raw = mem.get('xinglin-progress-v1');
check('I1 进度已写入 localStorage', !!raw);
if (raw) {
  const parsed = JSON.parse(raw);
  check('I2 刷新后数据可恢复', parsed.sessions.length === p.sessions.length && parsed.xp === p.xp);
  check('I3 记忆字段持久化', Array.isArray(parsed.memory?.reasoningPatterns));
  check('I4 徽章持久化', Array.isArray(parsed.badges));
  check('I5 每日任务持久化', parsed.daily && typeof parsed.daily.date === 'string');
}

console.log('\n== J. 重置体验 ==');
store.resetProgress();
p = store.getProgress();
check('J1 重置后 XP=0', p.xp === 0);
check('J2 重置后无会话', p.sessions.length === 0);
check('J3 重置后无徽章', p.badges.length === 0);
check('J4 重置后回到冷启动', rc.discover(p).kind === 'cold_start');
check('J5 重置后标签冷启动', rc.learningTag(p).id === 'observer');

console.log('\n== K. SafetyGuard 安全分级 ==');
const eng = store.engine;
const s1 = eng.safety('什么是阴阳？');
check('K1 学习问题 → 正常', s1.level === 'green', `实际 ${s1.level}`);
const s2 = eng.safety('我妈妈胸痛该吃什么药？');
check('K2 个人治疗 → 拒绝', s2.level === 'red', `实际 ${s2.level}`);
const s3 = eng.safety('帮我开一副四君子汤');
check('K3 开方请求 → 拒绝', s3.level === 'red', `实际 ${s3.level}`);
const s4 = eng.safety('我胸口剧烈疼痛，呼吸困难');
check('K4 急症 → 引导就医', s4.level === 'emergency', `实际 ${s4.level}`);
const s5 = eng.safety('什么是阴虚和阳虚的区别？');
check('K5 健康知识 → 教育性解释', s5.level === 'yellow' || s5.level === 'green', `实际 ${s5.level}`);

console.log(`\n========== 结果：通过 ${pass} 项 / 失败 ${fail} 项 ==========`);
if (failures.length) {
  console.log('失败明细：');
  failures.forEach((f) => console.log('  - ' + f));
  process.exit(1);
}
console.log('✅ 全部验收测试通过');
