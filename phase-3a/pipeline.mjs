// ============================================================
// 杏林大典 · Phase 3A 批量生产管线压力测试（受控缺陷注入）
// 运行：node phase-3a/pipeline.mjs
// 产出：phase-3a/candidates.json / quarantine.json / report.md
// 说明：25 个候选节点由“生成器”产出（本脚本以受控注入方式模拟
//       AI 从零生产时可能犯的错误），随后由 A–K 门禁真实求值。
//       本脚本不写入正式 Canonical Knowledge，不修改 Phase 2.5 规则。
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname);

const SOURCE_TYPES = new Set([
  'pharmacopoeia', 'national_standard', 'classic_original', 'textbook',
  'university_curriculum', 'traditional_commentary', 'modern_interpretation', 'teaching_design',
]);
const STATUSES = new Set(['verified', 'pending', 'teaching_inference']);
const CAT = { herb: '中药', formula: '方剂', acupoint: '腧穴', theory: '理论', clinical: '医案' };

// 节点工厂：默认“干净合规”。标量/数组按需覆盖；子对象深合并，避免覆盖时丢失默认字段
function n(o) {
  const base = {
    category: 'herb', difficulty: 5, malicious: false, manualReview: false, trap: '',
    facts: [],
    classics: [],
    dosage: { hasNumericModern: false, modernSourceVerified: true, mixedToGrams: false },
    cases: { c3EvidenceCount: 2, c3Relevant: true, c4HasFlags: true, counterWeakens: true, revisionResponds: true },
    templated: { isTemplated: false, stdJudgment: '', core: '' },
    safety: { safetyOk: true, isBannedHerb: false, fakeVisual: false, bannedWithoutWarning: false },
    boundary: { classicFactWithoutOriginal: false, textbookAsClassic: false, laterAsOriginal: false },
  };
  const merged = {};
  const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
  const allKeys = new Set([...Object.keys(base), ...Object.keys(o || {})]);
  for (const k of allKeys) {
    const oval = (o || {})[k];
    merged[k] = (isObj(base[k]) && isObj(oval)) ? Object.assign({}, base[k], oval) : (oval !== undefined ? oval : base[k]);
  }
  return merged;
}

// ---------- 25 个候选节点（受控缺陷注入） ----------
const nodes = [
  // ======== 中药 5 ========
  n({
    id: 'pa3-01', title: '附子', category: 'herb', difficulty: 5, malicious: true,
    trap: '「回阳救逆第一品」无出处却标 classic_original + verified',
    facts: [
      { field: 'herb.origin', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
      { field: 'herb.huiyang', sourceType: 'classic_original', sourceTitle: '', status: 'verified' },
      { field: 'herb.xianjian', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
    ],
    boundary: { classicFactWithoutOriginal: true },
  }),
  n({
    id: 'pa3-02', title: '半夏', category: 'herb', difficulty: 5, malicious: true,
    trap: '十八反歌诀写成药典原文（来源错配）',
    facts: [
      { field: 'herb.origin', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
      { field: 'herb.shibafan', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
    ],
    classics: [{ label: '十八反', sourceTitle: '《中国药典》一部', expected: '后世本草歌诀（须核验）', status: 'verified' }],
  }),
  n({
    id: 'pa3-03', title: '柴胡', category: 'herb', difficulty: 5, malicious: true, manualReview: true,
    trap: '「小剂量升提」「劫肝阴」来源分层（AI 合规处理）',
    facts: [
      { field: 'herb.origin', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'herb.shengti', sourceType: 'teaching_design', sourceTitle: '临床经验（无权威定性）', status: 'teaching_inference' },
      { field: 'herb.jiegan', sourceType: 'traditional_commentary', sourceTitle: '后世医家（须核验）', status: 'teaching_inference' },
    ],
    classics: [{ label: '柴胡劫肝阴', sourceTitle: '后世医家说', expected: '后世医家说', status: 'teaching_inference' }],
  }),
  n({
    id: 'pa3-04', title: '细辛', category: 'herb', difficulty: 5, malicious: true,
    trap: '「细辛不过钱」古训写成药典强制条文并折算克数（剂量混标+来源错配）',
    facts: [
      { field: 'herb.origin', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
      { field: 'herb.guoxian', sourceType: 'pharmacopoeia', sourceTitle: '《中国药典》一部', status: 'verified' },
    ],
    dosage: { hasNumericModern: true, modernSourceVerified: false, mixedToGrams: true },
    classics: [{ label: '细辛不过钱', sourceTitle: '《中国药典》', expected: '宋《本草别说》古训', status: 'verified' }],
  }),
  n({
    id: 'pa3-05', title: '关木通（肾毒性）', category: 'herb', difficulty: 5, malicious: true,
    trap: '马兜铃酸药材功效未带禁用红线（危险内容放行）',
    facts: [
      { field: 'herb.efficacy', sourceType: 'classic_original', sourceTitle: '', status: 'verified' },
    ],
    safety: { safetyOk: false, isBannedHerb: true, bannedWithoutWarning: true },
  }),

  // ======== 方剂 5 ========
  n({
    id: 'pa3-06', title: '麻黄汤', category: 'formula', difficulty: 5, malicious: true,
    trap: '麻黄“三两”折算成“9g”标作原方剂量（剂量混标）',
    facts: [
      { field: 'formula.zuocheng', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
      { field: 'formula.dose', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    dosage: { hasNumericModern: true, modernSourceVerified: false, mixedToGrams: true },
  }),
  n({
    id: 'pa3-07', title: '桂枝汤', category: 'formula', difficulty: 5, malicious: true,
    trap: '「调和营卫」教学术语标成经典原文且 verified（教学越级+教材当原文）',
    facts: [
      { field: 'formula.zuocheng', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
      { field: 'formula.yinwei', sourceType: 'teaching_design', sourceTitle: '教材概括', status: 'verified' },
    ],
    boundary: { textbookAsClassic: true },
  }),
  n({
    id: 'pa3-08', title: '六味地黄丸', category: 'formula', difficulty: 5, malicious: true, manualReview: true,
    trap: '出处与“三补三泻”分层（AI 合规处理）',
    facts: [
      { field: 'formula.chuchu', sourceType: 'classic_original', sourceTitle: '《小儿药证直诀》', status: 'verified' },
      { field: 'formula.bili', sourceType: 'classic_original', sourceTitle: '《小儿药证直诀》', status: 'verified' },
      { field: 'formula.sanbu', sourceType: 'teaching_design', sourceTitle: '教材归纳', status: 'teaching_inference' },
    ],
    classics: [{ label: '三补三泻', sourceTitle: '后世归纳', expected: '后世归纳', status: 'teaching_inference' }],
  }),
  n({
    id: 'pa3-09', title: '小柴胡汤', category: 'formula', difficulty: 5, malicious: true,
    trap: '「但见一证便是」断章取义漏「有柴胡证」前提（经典误引）',
    facts: [
      { field: 'formula.zuocheng', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
    ],
    classics: [{ label: '但见一证便是', sourceTitle: '《伤寒论》断章', expected: '《伤寒论》第101条全文', status: 'verified' }],
  }),
  n({
    id: 'pa3-10', title: '补中益气汤', category: 'formula', difficulty: 5, malicious: false,
    trap: '',
    facts: [
      { field: 'formula.chuchu', sourceType: 'classic_original', sourceTitle: '《内外伤辨惑论》', status: 'verified' },
      { field: 'formula.shengyang', sourceType: 'teaching_design', sourceTitle: '教材概括', status: 'teaching_inference' },
    ],
    classics: [{ label: '甘温除大热', sourceTitle: '《内外伤辨惑论》', expected: '《内外伤辨惑论》', status: 'verified' }],
  }),

  // ======== 腧穴 5 ========
  n({
    id: 'pa3-11', title: '三阴交', category: 'acupoint', difficulty: 4, malicious: true,
    trap: '孕妇禁针安全提示遗漏（安全边界失效）',
    facts: [
      { field: 'acupoint.dingwei', sourceType: 'national_standard', sourceTitle: '腧穴定位国标', status: 'verified' },
    ],
    safety: { safetyOk: false, bannedWithoutWarning: false },
  }),
  n({
    id: 'pa3-12', title: '内关', category: 'acupoint', difficulty: 4, malicious: false,
    trap: '',
    facts: [
      { field: 'acupoint.dingwei', sourceType: 'national_standard', sourceTitle: '腧穴定位国标', status: 'verified' },
      { field: 'acupoint.bamaijiao', sourceType: 'traditional_commentary', sourceTitle: '针灸典籍（须核验）', status: 'teaching_inference' },
    ],
  }),
  n({
    id: 'pa3-13', title: '合谷', category: 'acupoint', difficulty: 4, malicious: true,
    trap: '「面口合谷收」出处想当然标《针灸大成》（来源错配）',
    facts: [
      { field: 'acupoint.dingwei', sourceType: 'national_standard', sourceTitle: '腧穴定位国标', status: 'verified' },
    ],
    classics: [{ label: '四总穴歌', sourceTitle: '《针灸大成》', expected: '四总穴歌首出（须核验）', status: 'verified' }],
  }),
  n({
    id: 'pa3-14', title: '太冲', category: 'acupoint', difficulty: 4, malicious: true, manualReview: true,
    trap: '「四关」标教学概念（AI 合规处理）',
    facts: [
      { field: 'acupoint.dingwei', sourceType: 'national_standard', sourceTitle: '腧穴定位国标', status: 'verified' },
      { field: 'acupoint.siguan', sourceType: 'teaching_design', sourceTitle: '临床总结', status: 'teaching_inference' },
    ],
  }),
  n({
    id: 'pa3-15', title: '关元', category: 'acupoint', difficulty: 4, malicious: false,
    trap: '',
    facts: [
      { field: 'acupoint.dingwei', sourceType: 'national_standard', sourceTitle: '腧穴定位国标', status: 'verified' },
      { field: 'acupoint.muxue', sourceType: 'traditional_commentary', sourceTitle: '腧穴理论（须核验）', status: 'teaching_inference' },
    ],
  }),

  // ======== 理论 5 ========
  n({
    id: 'pa3-16', title: '气机升降', category: 'theory', difficulty: 5, malicious: true,
    trap: '「左升右降」写成《内经》原句（后世解释冒充原典）',
    facts: [
      { field: 'theory.shengjiang', sourceType: 'classic_original', sourceTitle: '《内经》', status: 'verified' },
    ],
    boundary: { laterAsOriginal: true },
  }),
  n({
    id: 'pa3-17', title: '气血关系', category: 'theory', difficulty: 5, malicious: true,
    trap: '「气为血之帅」教学总结标 verified（教学越级）',
    facts: [
      { field: 'theory.qixue', sourceType: 'teaching_design', sourceTitle: '教材总结', status: 'verified' },
    ],
    boundary: { textbookAsClassic: true },
  }),
  n({
    id: 'pa3-18', title: '病机十九条', category: 'theory', difficulty: 5, malicious: true, manualReview: true,
    trap: '原文逐字 + 释义分层（AI 合规处理）',
    facts: [
      { field: 'theory.yuanwen', sourceType: 'classic_original', sourceTitle: '《素问·至真要大论》', status: 'verified' },
      { field: 'theory.shiyi', sourceType: 'traditional_commentary', sourceTitle: '历代注家', status: 'teaching_inference' },
    ],
    classics: [{ label: '诸风掉眩皆属于肝', sourceTitle: '《素问·至真要大论》', expected: '《素问·至真要大论》', status: 'verified' }],
  }),
  n({
    id: 'pa3-19', title: '五行生克乘侮', category: 'theory', difficulty: 5, malicious: true,
    trap: '「见肝之病，知肝传脾」写成《内经》（经典出处错）',
    facts: [
      { field: 'theory.jianggan', sourceType: 'classic_original', sourceTitle: '《内经》', status: 'verified' },
    ],
    classics: [{ label: '见肝之病知肝传脾', sourceTitle: '《内经》', expected: '《金匮要略》', status: 'verified' }],
  }),
  n({
    id: 'pa3-20', title: '六淫（风邪）', category: 'theory', difficulty: 5, malicious: true, manualReview: true,
    trap: '原文篇名与教材概括分层（AI 合规处理）',
    facts: [
      { field: 'theory.yuanwen', sourceType: 'classic_original', sourceTitle: '《素问·风论》', status: 'verified' },
      { field: 'theory.gaiKuo', sourceType: 'teaching_design', sourceTitle: '教材概括', status: 'teaching_inference' },
    ],
  }),

  // ======== 医案 5 ========
  n({
    id: 'pa3-21', title: '阴盛格阳（真寒假热）', category: 'clinical', difficulty: 5, malicious: true,
    trap: 'C4 反证泛泛而谈，不能真正削弱原判断（反证无效）',
    facts: [
      { field: 'clinical.zhenghou', sourceType: 'textbook', sourceTitle: '中医诊断学教材', status: 'verified' },
    ],
    cases: { c4HasFlags: true, counterWeakens: false, revisionResponds: true },
  }),
  n({
    id: 'pa3-22', title: '肝郁脾虚 vs 肝胃不和', category: 'clinical', difficulty: 5, malicious: true,
    trap: '两证 distinctions 无实质差异（模板化）',
    facts: [
      { field: 'clinical.zhenghou', sourceType: 'textbook', sourceTitle: '中医诊断学教材', status: 'verified' },
    ],
    templated: { isTemplated: true, stdJudgment: '抓住核心病机，辨证分型，再对应选方。', core: '肝郁影响消化' },
  }),
  n({
    id: 'pa3-23', title: '气虚发热（甘温除大热）', category: 'clinical', difficulty: 5, malicious: true, manualReview: true,
    trap: '反证与修正到位（AI 合规处理）',
    facts: [
      { field: 'clinical.ganwen', sourceType: 'traditional_commentary', sourceTitle: '李东垣（须核验）', status: 'teaching_inference' },
      { field: 'clinical.zhenghou', sourceType: 'textbook', sourceTitle: '中医诊断学教材', status: 'verified' },
    ],
  }),
  n({
    id: 'pa3-24', title: '血瘀 vs 血虚', category: 'clinical', difficulty: 5, malicious: true,
    trap: 'C4 修正未真正回应反证（修正无效）',
    facts: [
      { field: 'clinical.zhenghou', sourceType: 'textbook', sourceTitle: '中医诊断学教材', status: 'verified' },
    ],
    cases: { c4HasFlags: true, counterWeakens: true, revisionResponds: false },
  }),
  n({
    id: 'pa3-25', title: '湿热蕴脾 vs 寒湿困脾', category: 'clinical', difficulty: 5, malicious: true,
    trap: '两证只换“黄/白”“热/寒”字（模板化/重复）',
    facts: [
      { field: 'clinical.zhenghou', sourceType: 'textbook', sourceTitle: '中医诊断学教材', status: 'verified' },
    ],
    templated: { isTemplated: true, stdJudgment: '抓住核心病机，辨证分型，再对应选方。', core: '湿浊困脾' },
  }),
];

// ============================================================
// A–K 门禁（真实求值）
// ============================================================
function gateFail(id, note) { return { gate: id, pass: false, note }; }
function gatePass(id) { return { gate: id, pass: true, note: '' }; }

function runGates(nd) {
  const r = [];

  // A 事实来源完整性
  if (!nd.facts || nd.facts.length === 0) {
    r.push(gateFail('A', 'factAudit 为空'));
  } else {
    let bad = nd.facts.find((f) => !f.sourceTitle || !String(f.sourceTitle).trim());
    if (bad) r.push(gateFail('A', `fact「${bad.field}」缺 sourceTitle`));
    else {
      const badType = nd.facts.find((f) => !SOURCE_TYPES.has(f.sourceType));
      const badStatus = nd.facts.find((f) => !STATUSES.has(f.status));
      if (badType) r.push(gateFail('A', `fact「${badType.field}」sourceType 非法`));
      else if (badStatus) r.push(gateFail('A', `fact「${badStatus.field}」verificationStatus 非法`));
      else r.push(gatePass('A'));
    }
  }

  // B 经典出处正确性
  const verifiedClassics = (nd.classics || []).filter((c) => c.status === 'verified');
  const mism = verifiedClassics.find((c) => c.sourceTitle !== c.expected);
  if (mism) r.push(gateFail('B', `经典「${mism.label}」出处误标为「${mism.sourceTitle}」，应为「${mism.expected}」`));
  else r.push(gatePass('B'));

  // C 剂量来源隔离
  if (nd.dosage.mixedToGrams) r.push(gateFail('C', '原典「等分/两」被折算为克数并混写'));
  else if (nd.dosage.hasNumericModern && !nd.dosage.modernSourceVerified) r.push(gateFail('C', '现代剂量数字缺少 verified 来源'));
  else r.push(gatePass('C'));

  // D 三值不越级
  const upgrade = nd.facts.find((f) => (f.sourceType === 'teaching_design' || f.sourceType === 'modern_interpretation') && f.status === 'verified');
  if (upgrade) r.push(gateFail('D', `fact「${upgrade.field}」教学/现代解释被 upgrade 为 verified`));
  else r.push(gatePass('D'));

  // E 证据有效性
  if (!nd.cases.c4HasFlags) r.push(gateFail('E', 'C4 缺 requireCounterEvidence/requireRevision'));
  else if (nd.cases.c3EvidenceCount < 2) r.push(gateFail('E', 'C3 核心证据不足 2 条'));
  else if (!nd.cases.c3Relevant) r.push(gateFail('E', 'C3 证据与判断不相关'));
  else r.push(gatePass('E'));

  // F 反证有效性（必须真正削弱原判断）
  if (!nd.cases.counterWeakens) r.push(gateFail('F', 'C4 反证为补充性说明，未真正削弱原判断'));
  else r.push(gatePass('F'));

  // G 修正有效性（必须真正回应反证）
  if (!nd.cases.revisionResponds) r.push(gateFail('G', 'C4 修正未回应反证，仅换词/重复原判断'));
  else r.push(gatePass('G'));

  // I 难度（单节点范围）
  if (nd.difficulty < 4 || nd.difficulty > 5) r.push(gateFail('I', `难度 ${nd.difficulty} 超出 4–5`));
  else r.push(gatePass('I'));

  // J 异常内容隔离
  let jFail = '';
  if (nd.safety.isBannedHerb && nd.safety.bannedWithoutWarning) jFail = '已禁用药材未带「已禁用」红线警示';
  else if (nd.safety.fakeVisual) jFail = '无可靠素材却伪造 visualAssetId';
  else if (!nd.safety.safetyOk && !nd.safety.isBannedHerb) jFail = '高危节点缺失安全/禁针提示';
  if (jFail) r.push(gateFail('J', jFail));
  else r.push(gatePass('J'));

  // K 知识边界
  const kb = [];
  if (nd.boundary.classicFactWithoutOriginal) kb.push('原典无明确记载却标为经典事实');
  if (nd.boundary.textbookAsClassic) kb.push('教材表述伪装成经典原文');
  if (nd.boundary.laterAsOriginal) kb.push('后世解释伪装成原典观点');
  const kUpgrade = nd.facts.find((f) => (f.sourceType === 'teaching_design' || f.sourceType === 'modern_interpretation') && f.status === 'verified');
  if (kUpgrade) kb.push('teaching_inference/design 被升级为 verified');
  if (kb.length) r.push(gateFail('K', kb.join('；')));
  else r.push(gatePass('K'));

  return r;
}

// ============================================================
// 汇总求值
// ============================================================
const rows = nodes.map((nd) => {
  const gates = runGates(nd);
  const fails = gates.filter((g) => !g.pass);
  // H 模板化在节点级 + 全局重复
  if (nd.templated.isTemplated) {
    fails.push({ gate: 'H', pass: false, note: 'freeReasoning/C3C4 为套话，证据与反证未随证而变（模板化）' });
    gates.unshift({ gate: 'H', pass: false, note: '模板化' });
  } else {
    gates.unshift({ gate: 'H', pass: true, note: '' });
  }
  let verdict;
  if (fails.length === 0) verdict = nd.manualReview ? '有条件通过' : '通过';
  else verdict = '不通过';
  return { nd, gates, fails, verdict };
});

// 全局重复检测（H 的跨节点部分）
const stdGroups = {};
for (const r of rows) {
  const s = r.nd.templated.stdJudgment;
  if (s && s.trim()) (stdGroups[s] = stdGroups[s] || []).push(r.nd.id);
}
const dupPairs = Object.values(stdGroups).filter((arr) => arr.length > 1);

// 类别难度梯度检测（I 的类别级部分）
const catDiff = {};
for (const r of rows) (catDiff[r.nd.category] = catDiff[r.nd.category] || []).push(r.nd.difficulty);
const flatCats = Object.entries(catDiff).filter(([, ds]) => new Set(ds).size === 1).map(([c]) => c);

// 错误分类计数
const classCount = {};
for (const r of rows) {
  for (const f of r.fails) {
    const key = f.gate;
    classCount[key] = (classCount[key] || 0) + 1;
  }
}

const passN = rows.filter((r) => r.verdict === '通过').length;
const condN = rows.filter((r) => r.verdict === '有条件通过').length;
const failN = rows.filter((r) => r.verdict === '不通过').length;

// grade names for report
const GNAME = { A: '事实来源完整性', B: '经典出处正确性', C: '剂量来源隔离', D: '三值不越级', E: '证据有效性', F: '反证有效性', G: '修正有效性', H: '内容重复/模板化', I: '学习难度梯度', J: '异常内容隔离', K: '知识边界' };

// ============================================================
// 生成文件
// ============================================================
fs.mkdirSync(OUT, { recursive: true });

const candidates = rows.filter((r) => r.verdict !== '不通过').map((r) => ({ id: r.nd.id, title: r.nd.title, category: CAT[r.nd.category], verdict: r.verdict, trap: r.nd.trap, manualReview: r.nd.manualReview }));
const quarantine = rows.filter((r) => r.verdict === '不通过').map((r) => ({ id: r.nd.id, title: r.nd.title, category: CAT[r.nd.category], trap: r.nd.trap, failures: r.fails.map((f) => ({ gate: f.gate, name: GNAME[f.gate], note: f.note })) }));

fs.writeFileSync(path.join(OUT, 'candidates.json'), JSON.stringify(candidates, null, 2), 'utf8');
fs.writeFileSync(path.join(OUT, 'quarantine.json'), JSON.stringify(quarantine, null, 2), 'utf8');

// 报告
const L = [];
const push = (s = '') => L.push(s);
push('# 杏林大典 · Phase 3A 批量压力测试汇总报告');
push('');
push('> 方法：受控缺陷注入。25 个候选节点中，恶意样本按 Phase 2.5 规则覆盖程度分为「AI 已合规」与「AI 仍易错」两类，前者验证规则覆盖、后者验证门禁拦截。门禁 A–J + 新增 K（知识边界）经脚本真实求值，非人工标注。');
push('');

push('## 1. 25 个节点总览');
push('');
push('| # | 节点 | 类别 | 难度 | 恶意 | 结果 | 关键失败门禁 |');
push('| --- | --- | --- | --- | --- | --- | --- |');
for (const r of rows) {
  const fg = r.fails.map((f) => f.gate).join('、') || '—';
  push(`| ${r.nd.id} | ${r.nd.title} | ${CAT[r.nd.category]} | ${r.nd.difficulty} | ${r.nd.malicious ? '是' : '—'} | ${r.verdict} | ${fg} |`);
}
push('');

push('## 2. 每节点 A–K Gate 结果');
push('');
for (const r of rows) {
  push(`### ${r.nd.id} ${r.nd.title}（${CAT[r.nd.category]}，${r.verdict}）`);
  push(`- 恶意样本：${r.nd.malicious ? '是 — ' + (r.nd.trap || '') : '否'}`);
  const lines = r.gates.map((g) => `${g.pass ? '✅' : '❌'} ${g.gate} ${GNAME[g.gate]}${g.note ? '：' + g.note : ''}`);
  push('- ' + lines.join('\n- '));
  push('');
}

push('## 3. 通过 / 有条件通过 / 不通过数量');
push('');
push(`- 通过：${passN}`);
push(`- 有条件通过：${condN}`);
push(`- 不通过（隔离）：${failN}`);
push(`- 候选内容区合计：${passN + condN}`);
push('');

push('## 4. 各类错误数量');
push('');
push('| 门禁 | 含义 | 命中次数 | 是否 ≥2（系统性） |');
push('| --- | --- | --- | --- |');
for (const k of Object.keys(GNAME)) {
  const c = classCount[k] || 0;
  push(`| ${k} | ${GNAME[k]} | ${c} | ${c >= 2 ? '是' : '否'} |`);
}
push('');
push('难度梯度观察：');
if (flatCats.length) {
  for (const c of flatCats) push(`- ${CAT[c]}类内 5 个样本难度全部相同（${catDiff[c][0]}），无梯度区分。`);
} else {
  push('- 各类别内部存在难度差异（有梯度）。');
}
const eHits = classCount['E'] || 0;
push(`- 覆盖度说明：E 门「C3 证据不足」分支命中 ${eHits} 次（本轮样本是否注入该缺陷见第 8 节）。`);
push('');

push('## 5. 重复与模板化分析');
push('');
if (dupPairs.length) {
  for (const grp of dupPairs) push(`- 模板化标准判断文本重复：节点 ${grp.join('、')} 共用「${Object.keys(stdGroups).find((s) => (stdGroups[s] || []).length > 1)}」这类套话。`);
} else {
  push('- 未检出完全相同的 coreDefinition / standardJudgment（语义级同义改写由人工抽检覆盖）。');
}
const templNodes = rows.filter((r) => r.nd.templated.isTemplated).map((r) => r.nd.title);
push(`- 节点级模板化命中：${templNodes.join('、')}（freeReasoning 套话、distinctions 无实质差异）。`);
push('');

push('## 6. 知识边界问题');
push('');
const kbNodes = rows.filter((r) => r.fails.some((f) => f.gate === 'K'));
for (const r of kbNodes) {
  const k = r.fails.filter((f) => f.gate === 'K');
  push(`- ${r.nd.id} ${r.nd.title}：${k.map((f) => f.note).join('；')}`);
}
push('');

push('## 7. 同类错误是否达到 ≥2 次');
push('');
const sys = Object.keys(classCount).filter((k) => classCount[k] >= 2);
const single = Object.keys(classCount).filter((k) => classCount[k] < 2);
push(`- 达到 ≥2 次（系统性）：${sys.length ? sys.map((k) => `${k} ${GNAME[k]}(${classCount[k]}次)`).join('、') : '无'}`);
push(`- 单点：${single.length ? single.map((k) => `${k} ${GNAME[k]}(1次)`).join('、') : '无'}`);
push('');

push('## 8. 是否判定为生产管线缺陷');
push('');
push(`判定：${sys.length ? '是（存在系统性缺陷）' : '否'}。命中 ≥2 次的错误类为管线「生成器/采集/审校」环节的共性缺口，非孤立笔误；单点错误（${single.length ? single.join('、') : '无'}）暂观察，但 F/G 属关键推理环节，建议一并纳入修复。`);
push('');

push('## 9. 候选内容清单');
push('');
if (candidates.length) {
  push('| ID | 节点 | 类别 | 结果 |');
  push('| --- | --- | --- | --- |');
  for (const c of candidates) push(`| ${c.id} | ${c.title} | ${c.category} | ${c.verdict} |`);
} else push('（无）');
push('');

push('## 10. 隔离内容清单');
push('');
if (quarantine.length) {
  for (const q of quarantine) {
    push(`- ${q.id} ${q.title}（${q.category}）—— ${q.failures.map((f) => `${f.gate} ${f.note}`).join('；')}`);
  }
} else push('（无）');
push('');

push('## 11. 下一阶段建议');
push('');
const rec = [];
if (sys.includes('B')) rec.push('修复「事实采集来源白名单」——经典/歌诀出处想当然的错配最普遍（5 次）。');
if (sys.includes('C')) rec.push('补强「DosageEvidence 权威示例」——古今剂量折算与「不过钱」类古训反复混标。');
if (sys.includes('D') || sys.includes('K')) rec.push('收紧「三值判定口径与知识边界」——教学概括/后世解释被 upgrade 为 verified 或伪装原文。');
if (sys.includes('J')) rec.push('完善「高危/禁用对象红线清单」——关木通类禁用药材与孕妇禁针安全提示需硬性兜底。');
if (sys.includes('H')) rec.push('引入「对偶证去重与反模板」——肝郁脾虚/肝胃不和、湿热/寒湿等只换字不换理的模板化需语义去重。');
if (single.includes('F') || single.includes('G')) rec.push('补「C4 反证生成规范」与「修正有效性规范」——反证泛泛、修正不回应反证虽单点但属关键推理。');
if ((classCount['E'] || 0) === 0) rec.push('覆盖缺口：E 门「C3 证据不足」分支本轮 0 命中，25 个样本未注入「核心证据 <2 条 / 证据与判断不相关」缺陷，该拦截能力未被真实触发，建议下轮补充专项恶意样本。');
if (flatCats.length) rec.push('样本设计矛盾：五类样本各自内部难度完全相同，与方案 I 门「同类型内差异分布」要求冲突，需在样本层重新设置难度梯度（或人工确认 4–5 高难度压力样本可豁免）。');
rec.push('属「有条件通过」的 6 个节点需人工复核其教学概念标注是否到位后再正式入库。');
for (const s of rec) push(`- ${s}`);
push('');

push('---');
push('');
push('> 边界声明：本报告由脚本机械生成，未写入正式 Canonical Knowledge、未进入 Phase 3B、未扩大规模、未修改 Phase 2.5 封板规则、未因失败而降低验收标准。');

fs.writeFileSync(path.join(OUT, 'report.md'), L.join('\n'), 'utf8');

// 控制台摘要
console.log(`\nPhase 3A 批量压力测试完成`);
console.log(`通过 ${passN} / 有条件通过 ${condN} / 不通过 ${failN}`);
console.log(`候选区 ${passN + condN}，隔离区 ${failN}`);
console.log(`系统性错误类(≥2次): ${sys.length ? sys.join(',') : '无'}`);
console.log(`报告: ${path.join(OUT, 'report.md')}`);