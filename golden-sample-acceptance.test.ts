// ============================================================
// 🌿 杏林大典 · Phase 2 —— 黄金样板自动验收
// 目标：对 Schema 与 7 个黄金样板做「结构化不变式」校验，
//       证明一个知识对象具备「学习/练习/记忆/辨析/迁移」的完
//       整结构，而非「一个标题 + 一段解释」。
//
// 校验内容：
//   1. 必填字段（身份/定位/核心/深度/记忆/经典/案例/安全/可训练）
//   2. 来源字段（经典原文出处、剂量来源、方剂组成、穴位定位来源）
//   3. 深度等级（核心知识 ≥ A6，且 depthLayers 从 A1 连续覆盖）
//   4. 记忆字段（分级 + 五类训练字段 + 间隔复习）
//   5. 案例覆盖（C1/C2/C3/C4 齐全）
//   6. 迁移关联（C4 必须存在）
//   7. 安全边界（教育用途 / 禁针刺 / 禁上传舌象 / 禁自行用药）
//   8. 经典四层（原文→词句→传统解释→现代教学解释，词句与传统层带来源）
//
// 运行（与既有验收一致，用 esbuild 打包后由 node 执行）：
//   npx esbuild golden-sample-acceptance.test.ts --bundle --platform=node --format=esm --outfile=golden-sample-acceptance.test.mjs && node golden-sample-acceptance.test.mjs
// ============================================================

import { depthOrdinal, DEPTH_LEVELS } from './src/types/canonicalKnowledgeSchema';
import { goldenYinYang } from './src/data/golden/samples/yin-yang';
import { goldenGinseng } from './src/data/golden/samples/herb-ginseng';
import { goldenFourGentlemen } from './src/data/golden/samples/formula-four-gentlemen';
import { goldenZusanli } from './src/data/golden/samples/acupoint-zusanli';
import { goldenYinYangClassic } from './src/data/golden/samples/classic-yinyang';
import { goldenPaleTongue } from './src/data/golden/samples/tongue-pale';
import { goldenSpleenQiCase } from './src/data/golden/samples/clinical-spleen-qi';

type AnyObj = Record<string, any>;

const samples: { name: string; type: string; obj: AnyObj }[] = [
  { name: '阴阳', type: 'theory', obj: goldenYinYang as unknown as AnyObj },
  { name: '人参', type: 'herb', obj: goldenGinseng as unknown as AnyObj },
  { name: '四君子汤', type: 'formula', obj: goldenFourGentlemen as unknown as AnyObj },
  { name: '足三里', type: 'acupoint', obj: goldenZusanli as unknown as AnyObj },
  { name: '阴阳应象大论开篇', type: 'classic', obj: goldenYinYangClassic as unknown as AnyObj },
  { name: '淡白舌', type: 'diagnostic', obj: goldenPaleTongue as unknown as AnyObj },
  { name: '脾胃气虚综合医案', type: 'clinical', obj: goldenSpleenQiCase as unknown as AnyObj },
];

let pass = 0;
let fail = 0;
const failures: string[] = [];
function check(label: string, cond: boolean, detail = '') {
  if (cond) {
    pass++;
    console.log(`  ✅ ${label}`);
  } else {
    fail++;
    failures.push(`${label} ${detail}`.trim());
    console.log(`  ❌ ${label} ${detail}`);
  }
}

function hasText(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}
function nonEmptyStringArray(a: unknown): boolean {
  return Array.isArray(a) && a.length > 0 && a.every((x) => hasText(x));
}

// ---- 基础必填字段 ----
function checkIdentity(o: AnyObj, tag: string) {
  const id = o.identity as AnyObj;
  check(`[${tag}] 身份 identity 存在`, !!id);
  if (!id) return;
  check(`[${tag}] id 使用 gs- 前缀`, hasText(id.id) && id.id.startsWith('gs-'));
  check(`[${tag}] canonicalId 使用 ck- 前缀`, hasText(id.canonicalId) && id.canonicalId.startsWith('ck-'));
  check(`[${tag}] type 声明`, hasText(id.type));
  check(`[${tag}] domain/title 非空`, hasText(id.domain) && hasText(id.title));
  check(`[${tag}] aliases 合法`, Array.isArray(id.aliases));
}

function checkPositioning(o: AnyObj, tag: string) {
  const p = o.positioning as AnyObj;
  if (!p) { check(`[${tag}] positioning 存在`, false); return; }
  check(`[${tag}] positioning 存在`, true);
  const lvl = p.knowledgeLevel as string;
  const ord = depthOrdinal(lvl as any);
  check(`[${tag}] knowledgeLevel ≥ A6（当前 ${lvl}）`, ord >= 6);
  const mt = p.masteryTarget as AnyObj;
  if (mt) {
    check(`[${tag}] requiredDepth ≥ A6`, depthOrdinal(mt.requiredDepth as any) >= 6);
    check(`[${tag}] requiredCases 覆盖 C1-C4`, ['C1', 'C2', 'C3', 'C4'].every((c) => (mt.requiredCases || []).includes(c)));
    check(`[${tag}] transferRequired=true`, mt.transferRequired === true);
    check(`[${tag}] masteryCriterion 非空`, hasText(mt.masteryCriterion));
  }
}

function checkDepth(o: AnyObj, tag: string) {
  const layers = o.depthLayers as any[];
  const target = depthOrdinal(o.positioning.knowledgeLevel as any);
  if (!Array.isArray(layers)) { check(`[${tag}] depthLayers 存在`, false); return; }
  check(`[${tag}] depthLayers 存在`, true);
  check(`[${tag}] depthLayers 从 A1 连续覆盖到 ${o.positioning.knowledgeLevel}`, layers.length >= target);
  for (let i = 0; i < target; i++) {
    const lvl = DEPTH_LEVELS[i];
    const layer = layers.find((l) => l.level === lvl);
    check(`[${tag}] 深度层 ${lvl} 有内容`, !!layer && hasText(layer.content));
  }
}

function checkMemory(o: AnyObj, tag: string) {
  const m = o.memory as AnyObj;
  if (!m) { check(`[${tag}] memory 存在`, false); return; }
  check(`[${tag}] memory 存在`, true);
  check(`[${tag}] 四类记忆分级均声明`, ['mustMemorize', 'shouldMemorize', 'understandOnly', 'applicationFirst'].every((k) => Array.isArray(m[k])));
  check(`[${tag}] mustMemorize 非空`, nonEmptyStringArray(m.mustMemorize));
  check(`[${tag}] recallQuestions 非空`, Array.isArray(m.recallQuestions) && m.recallQuestions.length > 0);
  check(`[${tag}] fillBlank 非空`, Array.isArray(m.fillBlank) && m.fillBlank.length > 0);
  check(`[${tag}] sequenceRecall 非空`, Array.isArray(m.sequenceRecall) && m.sequenceRecall.length > 0);
  check(`[${tag}] writtenRecall 非空`, Array.isArray(m.writtenRecall) && m.writtenRecall.length > 0);
  check(`[${tag}] confusingPairs 非空`, Array.isArray(m.confusingPairs) && m.confusingPairs.length > 0);
  const sr = m.spacedReview as AnyObj;
  check(`[${tag}] spacedReview 含间隔计划`, !!sr && Array.isArray(sr.intervalsDays) && sr.intervalsDays.length > 0);
}

function checkCases(o: AnyObj, tag: string) {
  const cases = o.cases as any[];
  if (!Array.isArray(cases)) { check(`[${tag}] cases 存在`, false); return; }
  check(`[${tag}] cases 存在`, true);
  const levels = new Set(cases.map((c) => c.level));
  check(`[${tag}] C1/C2/C3/C4 齐全`, ['C1', 'C2', 'C3', 'C4'].every((c) => levels.has(c)));
  for (const c of cases) {
    check(`[${tag}] 案例 ${c.id}（${c.level}）含场景/提问/讲解`, hasText(c.scenario) && hasText(c.question) && hasText(c.explanation));
    check(`[${tag}] 案例 ${c.id} 选项含对错讲解`, Array.isArray(c.options) && c.options.length >= 2 && c.options.every((o2: any) => hasText(o2.why)));
  }
  const c4 = cases.find((c) => c.level === 'C4');
  check(`[${tag}] C4 迁移案例存在`, !!c4);
}

function checkClassics(o: AnyObj, tag: string) {
  const classics = o.classics as any[];
  if (!Array.isArray(classics) || classics.length === 0) { check(`[${tag}] classics 存在且非空`, false); return; }
  check(`[${tag}] classics 存在且非空`, true);
  const layerNames = ['原文', '词句', '传统解释', '现代教学解释'];
  for (const ref of classics) {
    check(`[${tag}] 经典「${ref.chapter}」原文非空且可追溯`, hasText(ref.originalText) && hasText(ref.sourceCitation));
    check(`[${tag}] 经典「${ref.chapter}」四层齐全`, Array.isArray(ref.layers) && ref.layers.length === 4 && layerNames.every((n, i) => ref.layers[i]?.layerName === n && hasText(ref.layers[i]?.content)));
    const layer3 = ref.layers?.[2];
    check(`[${tag}] 经典「${ref.chapter}」传统解释带来源`, hasText(layer3?.source));
    const layer4 = ref.layers?.[3];
    check(`[${tag}] 经典「${ref.chapter}」现代教学解释显式标注`, hasText(layer4?.content) && /现代教学/.test(layer4.content));
  }
}

function checkSafety(o: AnyObj, tag: string) {
  const s = o.safety as AnyObj;
  if (!s) { check(`[${tag}] safety 存在`, false); return; }
  check(`[${tag}] safety 存在`, true);
  check(`[${tag}] educationOnly=true`, s.educationOnly === true);
  check(`[${tag}] noDiagnosis=true`, s.noDiagnosis === true);
  check(`[${tag}] prohibitions 非空`, nonEmptyStringArray(s.prohibitions));
}

function checkTrainability(o: AnyObj, tag: string) {
  const t = o.trainability as AnyObj;
  if (!t) { check(`[${tag}] trainability 存在`, false); return; }
  check(`[${tag}] trainability 存在`, true);
  check(`[${tag}] 至少一种训练局`, Array.isArray(t.supportedModes) && t.supportedModes.length > 0);
  const validModes = ['materialIdentification', 'formulaAssembly', 'acupointMapping', 'classicDecode', 'pathomechanismDetect', 'formulaDiscrimination', 'blindCase', 'reversalCase'];
  check(`[${tag}] 训练局均为知识本体类型（非奖励数值）`, Array.isArray(t.supportedModes) && t.supportedModes.every((m: any) => validModes.includes(m)));
  check(`[${tag}] 趣味来自知识过程（发现/比较/推理/反转）`, hasText(t.funComesFrom) && /趣味来自|推理|比较|发现|反转|观察|辨析|识别|破译|组方|识材|识穴/.test(t.funComesFrom));
  check(`[${tag}] 不引入排行榜/签到等装饰奖励`, !/排行榜|签到|连击|段位|每日打卡/.test(`${t.funComesFrom || ''}`));
}

// ---- 类型特化校验 ----
function checkHerb(o: AnyObj, tag: string) {
  const h = o.herb as AnyObj;
  if (!h) { check(`[${tag}] herb 专项字段存在`, false); return; }
  check(`[${tag}] herb 专项字段存在`, true);
  check(`[${tag}] 基原含拉丁学名`, hasText(h.origin) && /Panax ginseng/.test(h.origin));
  check(`[${tag}] 药用部位/药典来源非空`, hasText(h.medicinalPart) && hasText(h.source));
  check(`[${tag}] 识材关键特征非空`, nonEmptyStringArray(h.appearance?.keyFeatures));
  check(`[${tag}] 易混品非空`, nonEmptyStringArray(h.appearance?.confusableSubstitutes));
  check(`[${tag}] 真伪鉴别要点非空`, nonEmptyStringArray(h.appearance?.authenticationPoints));
  check(`[${tag}] 四气/五味/归经/毒性齐全`, hasText(h.property?.fourQi) && hasText(h.property?.fiveFlavors) && hasText(h.property?.channelTropism) && hasText(h.property?.toxicity));
  check(`[${tag}] 核心/次要功效非空`, nonEmptyStringArray(h.action?.coreActions) && nonEmptyStringArray(h.action?.secondaryActions));
  const doseEvidence = h.dosage?.dosage;
  check(`[${tag}] 原典剂量非空且带来源`, hasText(doseEvidence?.originalDosage) && !!doseEvidence?.originalDosageSource && hasText(doseEvidence.originalDosageSource.verificationStatus));
  check(`[${tag}] 现代剂量非空且带来源`, hasText(doseEvidence?.modernTeachingDosage) && !!doseEvidence?.modernTeachingDosageSource && hasText(doseEvidence.modernTeachingDosageSource.verificationStatus));
  check(`[${tag}] 剂量声明不自行推算度量衡`, hasText(h.dosage?.metrologyNote) && /不.*(换算|推算)/.test(h.dosage.metrologyNote));
  check(`[${tag}] 教学范围非空`, hasText(h.dosage?.teachingRange));
  check(`[${tag}] 禁忌非空`, nonEmptyStringArray(h.contraindications));
  const safetyText = JSON.stringify(o.safety);
  check(`[${tag}] 明确禁止自行用药`, /自行|煎服|剂量/.test(safetyText));
}

function checkFormula(o: AnyObj, tag: string) {
  const f = o.formula as AnyObj;
  if (!f) { check(`[${tag}] formula 专项字段存在`, false); return; }
  check(`[${tag}] formula 专项字段存在`, true);
  check(`[${tag}] 原方出处与原文非空`, hasText(f.source) && hasText(f.originalText));
  const ings = f.ingredients || [];
  check(`[${tag}] 组成非空`, ings.length > 0);
  const roles = ['君', '臣', '佐', '使'];
  let allRoleOk = ings.every((ing: any) => roles.includes(ing.role) && hasText(ing.purpose) && hasText(ing.classicDose));
  check(`[${tag}] 每味药有角色/为什么存在/原始剂量`, allRoleOk);
  check(`[${tag}] 君药为主（君/臣/佐/使齐备）`, roles.every((r) => ings.some((ing: any) => ing.role === r)));
  check(`[${tag}] 配伍逻辑非空`, hasText(f.combinationLogic));
  check(`[${tag}] 方证关键（病机/主症/辨证关键）齐全`, hasText(f.syndrome?.pathomechanism) && nonEmptyStringArray(f.syndrome?.mainSymptoms) && hasText(f.syndrome?.keyToDiagnosis));
  check(`[${tag}] 加减变化非空`, Array.isArray(f.variations) && f.variations.length > 0);
  check(`[${tag}] 方剂比较非空`, Array.isArray(f.comparisons) && f.comparisons.length > 0);
  const allowedKinds = ['herbs-to-formula', 'formula-to-herbs', 'missing-herb', 'formula-to-syndrome', 'syndrome-to-formula', 'two-formula-difference'];
  const ids = f.identification || [];
  check(`[${tag}] 识方训练非空且类型合法`, ids.length > 0 && ids.every((p: any) => allowedKinds.includes(p.kind) && hasText(p.prompt) && hasText(p.answer)));
}

function checkAcupoint(o: AnyObj, tag: string) {
  const a = o.acupoint as AnyObj;
  if (!a) { check(`[${tag}] acupoint 专项字段存在`, false); return; }
  check(`[${tag}] acupoint 专项字段存在`, true);
  check(`[${tag}] 定位非空`, hasText(a.location));
  check(`[${tag}] 定位来源非空`, hasText(a.locationSource));
  check(`[${tag}] 归经非空`, hasText(a.meridian));
  check(`[${tag}] 特定穴属性非空`, nonEmptyStringArray(a.specialPointTypes));
  check(`[${tag}] 易混穴对比非空`, Array.isArray(a.confusablePoints) && a.confusablePoints.length > 0);
  check(`[${tag}] 识穴训练非空`, Array.isArray(a.identification) && a.identification.length > 0);
  const safetyText = JSON.stringify(o.safety);
  check(`[${tag}] 明确禁止自行针刺`, /针刺|艾灸/.test(safetyText));
}

function checkClassicType(o: AnyObj, tag: string) {
  const c = o.classic as AnyObj;
  if (!c) { check(`[${tag}] classic 专项字段存在`, false); return; }
  check(`[${tag}] classic 专项字段存在`, true);
  check(`[${tag}] 承载原文可追溯`, hasText(c.reference?.originalText) && hasText(c.reference?.sourceCitation));
  check(`[${tag}] 医古文关键词逐字解释`, Array.isArray(c.keywordGlossary) && c.keywordGlossary.length > 0);
  check(`[${tag}] 现代白话通译非空`, hasText(c.modernTranslation));
}

function checkDiagnostic(o: AnyObj, tag: string) {
  const d = o.diagnostic as AnyObj;
  if (!d) { check(`[${tag}] diagnostic 专项字段存在`, false); return; }
  check(`[${tag}] diagnostic 专项字段存在`, true);
  check(`[${tag}] 观察对象非空`, hasText(d.target));
  check(`[${tag}] 观察维度非空`, Array.isArray(d.dimensions) && d.dimensions.length > 0);
  check(`[${tag}] 观察步骤非空`, nonEmptyStringArray(d.observationSteps));
  check(`[${tag}] 教学解释非空`, hasText(d.teachingInterpretation));
  const safetyText = JSON.stringify(o.safety) + JSON.stringify(d.mediaNote);
  check(`[${tag}] 严禁「上传舌象 AI 诊断」`, /上传|AI 诊断|AI诊断/.test(safetyText));
}

function checkClinical(o: AnyObj, tag: string) {
  const w = o.walkthrough as AnyObj;
  if (!w) { check(`[${tag}] walkthrough 存在`, false); return; }
  check(`[${tag}] walkthrough 存在`, true);
  check(`[${tag}] walkthrough 覆盖 8 阶段走练`, Array.isArray(w.stages) && w.stages.length >= 8);
  const labels = (w.stages || []).map((s: any) => s.label);
  const expected = ['先观察', '自己判断', '给证据', '教练反馈', '对照标准', '修正', '理论', '再挑战'];
  check(`[${tag}] 走练阶段顺序完整`, expected.every((e) => labels.some((l: string) => l.includes(e))));
}

// ============================================================
console.log('\n== S 结构校验：必填字段 ====================================');
for (const s of samples) {
  console.log(`\n— ${s.name}（${s.type}）—`);
  const o = s.obj;
  checkIdentity(o, s.name);
  checkPositioning(o, s.name);
  if (!o.core) check(`[${s.name}] core 存在`, false);
  else {
    check(`[${s.name}] core.oneLine 非空`, hasText(o.core.oneLine));
    check(`[${s.name}] core.coreDefinition 非空`, hasText(o.core.coreDefinition));
    check(`[${s.name}] core.mechanism（为什么）非空`, hasText(o.core.mechanism));
    check(`[${s.name}] core.distinctions ≥ 2 条`, Array.isArray(o.core.distinctions) && o.core.distinctions.length >= 2);
    check(`[${s.name}] core 含反直觉点`, hasText(o.core.counterIntuitivePoint));
  }
}

console.log('\n== D 深度等级 =============================================');
for (const s of samples) checkDepth(s.obj, s.name);

console.log('\n== M 记忆系统 =============================================');
for (const s of samples) checkMemory(s.obj, s.name);

console.log('\n== C 案例覆盖 (C1–C4) ======================================');
for (const s of samples) checkCases(s.obj, s.name);

console.log('\n== L 经典四层与来源 =======================================');
for (const s of samples) checkClassics(s.obj, s.name);

console.log('\n== F 安全边界 =============================================');
for (const s of samples) checkSafety(s.obj, s.name);

console.log('\n== T 可训练性/趣味来源 =====================================');
for (const s of samples) checkTrainability(s.obj, s.name);

console.log('\n== 类型特化专项 ===========================================');
for (const s of samples) {
  if (s.type === 'herb') checkHerb(s.obj, s.name);
  else if (s.type === 'formula') checkFormula(s.obj, s.name);
  else if (s.type === 'acupoint') checkAcupoint(s.obj, s.name);
  else if (s.type === 'classic') checkClassicType(s.obj, s.name);
  else if (s.type === 'diagnostic') checkDiagnostic(s.obj, s.name);
  else if (s.type === 'clinical') checkClinical(s.obj, s.name);
}

// ---- 全局唯一性 ----
console.log('\n== U 全局唯一性 ===========================================');
const ids = samples.map((s) => s.obj.identity.id);
const canon = samples.map((s) => s.obj.identity.canonicalId);
check('7 个样板 id 唯一', new Set(ids).size === samples.length && samples.length === 7);
check('7 个样板 canonicalId 唯一', new Set(canon).size === samples.length && samples.length === 7);
check('样板数量正好 7 个', samples.length === 7);

// ============================================================
// Phase 2.5 事实审校与推理结构测试（T01–T10）
// ============================================================
console.log('\n== T 事实审校（Phase 2.5） ================================');

// T01：每个样板都有 factAudit 且 facts 非空
for (const s of samples) {
  const fa = s.obj.factAudit as AnyObj;
  check(`[T01·${s.name}] 存在 factAudit 且 facts 非空`, !!fa && Array.isArray(fa.facts) && fa.facts.length > 0);
}

// T02：每条 fact 的六要素齐全（factId/field/value/sourceType/sourceTitle/verificationStatus）
for (const s of samples) {
  const facts = ((s.obj.factAudit as AnyObj)?.facts as any[]) || [];
  for (const f of facts) {
    check(`[T02·${s.name}] fact「${f.factId}」六要素齐全`,
      hasText(f.factId) && hasText(f.field) && hasText(f.value) && hasText(f.sourceType) && hasText(f.sourceTitle) && hasText(f.verificationStatus));
  }
}

// T03：每条经典原文都有 verificationStatus（不允许缺省）
for (const s of samples) {
  const classics = (s.obj.classics as any[]) || [];
  for (const ref of classics) {
    check(`[T03·${s.name}] 经典「${ref.chapter}」有 verificationStatus`, hasText(ref.verificationStatus));
  }
}

// T04：verificationStatus='verified' 的经典必须带 factSource
for (const s of samples) {
  const classics = (s.obj.classics as any[]) || [];
  for (const ref of classics) {
    if (ref.verificationStatus === 'verified') {
      check(`[T04·${s.name}] 经典「${ref.chapter}」verified 且带 factSource`, !!ref.factSource && hasText(ref.factSource.sourceTitle));
    }
  }
}

// T05：pending 的经典原文不得进入背诵（pending 不得进记忆）
{
  let pendingLeak = false;
  const leakList: string[] = [];
  for (const s of samples) {
    const classics = (s.obj.classics as any[]) || [];
    const must = (s.obj.memory?.mustMemorize as string[]) || [];
    for (const ref of classics) {
      if (ref.verificationStatus === 'pending') {
        const leaked = must.some((m) => hasText(ref.originalText) && m.includes(ref.originalText.slice(0, 6)));
        if (leaked) { pendingLeak = true; leakList.push(`${s.name}:${ref.chapter}`); }
      }
    }
  }
  check('[T05] 无 pending 经典原文进入背诵', !pendingLeak, leakList.join('、'));
}

// T06：四君子汤缺药题恰为 4 道（覆盖四味药，不再只有茯苓）
{
  const sjzMiss = goldenFourGentlemen.formula.identification.filter((p) => p.kind === 'missing-herb');
  check('[T06] 四君子汤缺药题恰为 4 道（四味药各一）', sjzMiss.length === 4);
}

// T07：现代教学剂量数字必须带 verified 来源（四君子汤 9/9/9/6）
{
  const sjzIngs = goldenFourGentlemen.formula.ingredients;
  const doseOk = sjzIngs.length === 4 && sjzIngs.every((ing) => {
    const ev = ing.dosageEvidence;
    return !!ev && hasText(ev.modernTeachingDosage) && !!ev.modernTeachingDosageSource && ev.modernTeachingDosageSource.verificationStatus === 'verified';
  });
  check('[T07] 四君子汤四味药现代剂量均有 verified 来源', doseOk);
}

// T08：所有 C3/C4 案例具备证据推理结构（C3≥2 证据；C4 反证+修正）
for (const s of samples) {
  const cases = (s.obj.cases as any[]) || [];
  for (const c of cases) {
    if (c.level === 'C3') {
      const fr = c.freeReasoning;
      check(`[T08·${s.name}] C3「${c.title}」有 freeReasoning 且≥2 证据`, !!fr && Array.isArray(fr.coreEvidence) && fr.coreEvidence.length >= 2);
    }
    if (c.level === 'C4') {
      const fr = c.freeReasoning;
      check(`[T08·${s.name}] C4「${c.title}」完整推理(反证+修正)`, !!fr && fr.requireCounterEvidence === true && fr.requireRevision === true);
    }
  }
}

// T09：足三里具备空间认知结构
{
  const spatial = goldenZusanli.acupoint.spatial;
  check('[T09] 足三里 spatial 存在且 spatialTasks≥3', !!spatial && Array.isArray(spatial.spatialTasks) && spatial.spatialTasks.length >= 3);
}

// T10：综合医案具备独立推理记录会话（attempts 空 + 示范推理链）
{
  const cs = goldenSpleenQiCase.caseSession as AnyObj;
  const ok = !!cs && Array.isArray(cs.attempts) && cs.attempts.length === 0
    && !!cs.referenceAttempt && hasText(cs.referenceAttempt.hypothesis)
    && Array.isArray(cs.referenceAttempt.evidence) && cs.referenceAttempt.evidence.length >= 2;
  check('[T10] 医案 caseSession：attempts 空 + 示范推理链(假设+≥2证据)', ok);
}

// ---- 汇总 ----
console.log('\n============================================================');
console.log(`通过 ${pass} 项，失败 ${fail} 项`);
if (failures.length) {
  console.log('\n失败清单：');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
} else {
  console.log('✅ 全部通过：Schema 与 7 个黄金样板满足 Phase 2 结构验收。');
}