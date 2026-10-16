// ============================================================
// 杏林大典 · Phase 3A.1 定向回归测试
// 运行：node phase-3a.1/regression.test.mjs
// 目标：验证分层生产管线「在源头修复缺陷」而非「Gate 发现即 reject」。
// 覆盖（按用户要求）：B×2 K×2 C×1 D×1 H×1 J×1 E×2 + I 难度梯度。
// 断言风格与既有 golden-sample-acceptance.test.ts 一致（pass/fail 计数）。
// ============================================================
import { runPipeline, antiTemplating, checkDifficultyGradient, runGates } from './pipeline.mjs';
import { DIFFICULTY_LADDER } from './source-catalog.mjs';

let pass = 0;
let fail = 0;
const failures = [];
function check(label, cond, detail = '') {
  if (cond) { pass++; console.log(`  ✅ ${label}`); }
  else { fail++; failures.push(`${label} ${detail}`.trim()); console.log(`  ❌ ${label} ${detail}`); }
}
function section(t) { console.log(`\n== ${t} ==`); }
function hasCorrection(res, layer, kind) {
  return res.corrections.some((x) => x.layer === layer && x.kind === kind);
}
function gateHas(res, gate) {
  return res.gateFails.some((f) => f.gate === gate);
}
// 干净事实（用于需要“其他事实 OK”的样本）
const okFact = { field: 'identity.基础', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' };

console.log('Phase 3A.1 定向回归测试\n');

// ============================================================
// B · 经典出处错配 ×2
// ============================================================
section('B-1 半夏「十八反」出处误标《中国药典》');
(() => {
  const res = runPipeline({
    id: 'r-b1', title: '半夏', category: 'herb', difficulty: 5,
    facts: [okFact],
    classics: [{ label: '十八反', canon: '', chapter: '', sourceTitle: '《中国药典》一部', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, safety: {},
  });
  const ref = res.normalized.classics[0];
  check('来源解析层记录 B 纠偏（而非 Gate 拦截）', hasCorrection(res, '来源解析', 'B'));
  check('出处被改为后世歌诀（非《中国药典》）', ref.sourceTitle !== '《中国药典》一部' && /歌诀|本草/.test(ref.sourceTitle));
  check('状态降为 teaching_inference', ref.status === 'teaching_inference');
  check('B 门在修复后通过', !gateHas(res, 'B'));
})();

section('B-2 五行「见肝之病知肝传脾」出处误标《内经》');
(() => {
  const res = runPipeline({
    id: 'r-b2', title: '五行生克乘侮', category: 'theory', difficulty: 5,
    facts: [okFact],
    classics: [{ label: '见肝之病知肝传脾', canon: '', chapter: '', sourceTitle: '《内经》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, safety: {},
  });
  const ref = res.normalized.classics[0];
  check('来源解析层记录 B 纠偏', hasCorrection(res, '来源解析', 'B'));
  check('出处被改为《金匮要略》', ref.sourceTitle === '《金匮要略》');
  check('保持为经典原文且 verified（原典本身成立）', ref.sourceType === 'classic_original' && ref.status === 'verified');
  check('B 门在修复后通过', !gateHas(res, 'B'));
})();

// ============================================================
// K · 知识边界 ×2
// ============================================================
section('K-1 桂枝汤「调和营卫」教材术语冒充经典原文');
(() => {
  const res = runPipeline({
    id: 'r-k1', title: '桂枝汤', category: 'formula', difficulty: 5,
    facts: [okFact],
    classics: [{ label: '调和营卫', canon: '', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, safety: {},
  });
  const ref = res.normalized.classics[0];
  check('来源解析层记录 K 知识边界纠偏', hasCorrection(res, '来源解析', 'K'));
  check('sourceType 改为 teaching_design（不再冒充原文）', ref.sourceType === 'teaching_design');
  check('状态降为 teaching_inference', ref.status === 'teaching_inference');
  check('K 门在修复后通过（源头已改型）', !gateHas(res, 'K'));
})();

section('K-2 气机升降「左升右降」后世归纳冒充《内经》原句');
(() => {
  const res = runPipeline({
    id: 'r-k2', title: '气机升降', category: 'theory', difficulty: 5,
    facts: [okFact],
    classics: [{ label: '左升右降', canon: '', chapter: '', sourceTitle: '《内经》', sourceType: 'classic_original', status: 'verified' }],
    dosage: {}, cases: null, safety: {},
  });
  const ref = res.normalized.classics[0];
  check('来源解析层记录 K 纠偏', hasCorrection(res, '来源解析', 'K'));
  check('sourceType 改为 teaching_design', ref.sourceType === 'teaching_design');
  check('状态降为 teaching_inference', ref.status === 'teaching_inference');
  check('K 门在修复后通过', !gateHas(res, 'K'));
})();

// ============================================================
// C · 剂量混标 ×1
// ============================================================
section('C-1 麻黄汤「三两」原方被折算为克数');
(() => {
  const res = runPipeline({
    id: 'r-c1', title: '麻黄汤', category: 'formula', difficulty: 5,
    facts: [okFact], classics: [],
    dosage: { originalDosage: '麻黄三两（现折算约 9g）、桂枝二两', modernDosage: '', modernSourceTitle: '', modernSourceVerified: false },
    cases: null, safety: {},
  });
  check('剂量分层层记录 C 纠偏', hasCorrection(res, '剂量分层', 'C'));
  check('原典剂量中克数被剥离', !/g/.test(res.normalized.dosage.originalDosage || ''));
  check('原典相对剂量表述保留', /三两/.test(res.normalized.dosage.originalDosage || ''));
  check('C 门在修复后通过', !gateHas(res, 'C'));
})();

// ============================================================
// D · 三值越级 ×1
// ============================================================
section('D-1 柴胡「小剂量升提」teaching_design 被升级为 verified');
(() => {
  const res = runPipeline({
    id: 'r-d1', title: '柴胡', category: 'herb', difficulty: 5,
    facts: [
      { field: 'herb.origin', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
      { field: 'herb.shengti', sourceType: 'teaching_design', sourceTitle: '临床经验（无权威定性）', status: 'verified' },
    ],
    classics: [], dosage: {}, cases: null, safety: {},
  });
  check('知识分类层记录 D 三值降级', hasCorrection(res, '知识分类', 'D'));
  const upgraded = res.normalized.facts.find((f) => f.field === 'herb.shengti');
  check('teaching_design 降为 teaching_inference', upgraded.status === 'teaching_inference');
  check('D 门在修复后通过', !gateHas(res, 'D'));
})();

// ============================================================
// J · 高危内容隔离 ×1
// ============================================================
section('J-1 关木通（马兜铃酸）无禁用红线');
(() => {
  const res = runPipeline({
    id: 'r-j1', title: '关木通', category: 'herb', difficulty: 5,
    facts: [{ field: 'herb.efficacy', sourceType: 'classic_original', sourceTitle: '《本经》', status: 'verified' }],
    classics: [], dosage: {}, cases: null, safety: {},
  });
  check('安全红线层记录 J 红线注入', hasCorrection(res, '安全红线', 'J'));
  check('prohibitions 含「已禁用」红线', (res.normalized.safety.prohibitions || []).some((p) => /已禁用/.test(p)));
  check('J 门在修复后通过', !gateHas(res, 'J'));
})();

// ============================================================
// H · 模板化 ×1（对偶证对）
// ============================================================
section('H-1 湿热蕴脾 vs 寒湿困脾 套话模板（对偶证复制）');
(() => {
  const nodes = [
    { id: 'r-h1a', title: '湿热蕴脾', category: 'clinical', difficulty: 5, stdJudgment: '抓住核心病机，辨证分型，再对应选方。', coreDefinition: '湿浊困脾', templated: {} },
    { id: 'r-h1b', title: '寒湿困脾', category: 'clinical', difficulty: 5, stdJudgment: '抓住核心病机，辨证分型，再对应选方。', coreDefinition: '湿浊困脾', templated: {} },
  ];
  const out = [];
  antiTemplating(nodes, out);
  check('反模板层记录 H 去重', out.some((c) => c.kind === 'H'));
  check('两节点均被标记 isTemplated', nodes.every((n) => n.templated.isTemplated === true));
  const g = nodes.map((n) => runGates({ ...nodes[0], templated: n.templated, stdJudgment: n.stdJudgment }));
  check('H 门能独立识别模板化（强制重写）', g.every((f) => f.some((x) => x.gate === 'H')));
})();

// ============================================================
// E · C3 证据不足 ×2（覆盖缺口补足）
// ============================================================
section('E-1 C3 核心证据不足（<2 条）');
(() => {
  const res = runPipeline({
    id: 'r-e1', title: '阴阳辨析', category: 'theory', difficulty: 5,
    facts: [okFact], classics: [], dosage: {},
    cases: { c4HasFlags: true, c3EvidenceCount: 1, c3Relevant: true, counterWeakens: true, revisionResponds: true },
    safety: {},
  });
  check('E 门识别「证据不足」', gateHas(res, 'E') && res.gateFails.find((f) => f.gate === 'E').note.includes('不足'), JSON.stringify(res.gateFails));
})();

section('E-2 C3 证据与判断不相关');
(() => {
  const res = runPipeline({
    id: 'r-e2', title: '气血辨析', category: 'theory', difficulty: 5,
    facts: [okFact], classics: [], dosage: {},
    cases: { c4HasFlags: true, c3EvidenceCount: 2, c3Relevant: false, counterWeakens: true, revisionResponds: true },
    safety: {},
  });
  check('E 门识别「证据不相关」', gateHas(res, 'E') && res.gateFails.find((f) => f.gate === 'E').note.includes('不相关'), JSON.stringify(res.gateFails));
})();

// ============================================================
// I · 学习难度梯度（简单/中等/困难/易混淆/高难）
// ============================================================
section('I-1 难度梯度五档俱全且互不重复');
(() => {
  const samples = DIFFICULTY_LADDER.map((l, i) => ({
    id: 'r-i' + i, title: l.label, category: 'herb', difficulty: l.weight, difficultyLabel: l.label,
  }));
  const grad = checkDifficultyGradient(samples);
  check('五档权重互不重复', grad.distinct === 5);
  check('五档标签齐全（无缺失档）', grad.missing.length === 0, '缺失:' + grad.missing.join('、'));
})();

// ============================================================
// 汇总
// ============================================================
console.log(`\n========================================`);
console.log(`定向回归结果：通过 ${pass} / 失败 ${fail} / 合计 ${pass + fail}`);
if (fail > 0) {
  console.log('失败项：');
  for (const f of failures) console.log('  - ' + f);
}
console.log('========================================');
const decision = (fail === 0)
  ? '\n定向回归全绿。允许进入第二轮 25 样本随机压力测试（仍须遵守 STOP 边界：不进入 Phase 3B、不扩大规模）。'
  : '\n定向回归仍有失败项。禁止进入第二轮随机压力测试，继续修复。';
console.log(decision);
process.exitCode = fail === 0 ? 0 : 1;