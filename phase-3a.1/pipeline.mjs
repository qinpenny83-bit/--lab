// ============================================================
// 杏林大典 · Phase 3A.1 分层生产管线（源头修复版）
// 运行：node phase-3a.1/pipeline.mjs
// ============================================================
// 与 Phase 3A pipeline.mjs 的本质区别：
//   Phase 3A 的「生成器」用布尔 flag 预埋缺陷，「门禁」读同一 flag
//   反射式检测，形成自洽循环，等于没有真正的源头护栏。
//   本管线把缺陷逐层在「来源解析 / 知识分类 / 剂量分层 / 安全红线 /
//   反模板 / FactAudit 触发」这些产生源头修复，Gate 只作最后不变式兜底。
// ============================================================
import {
  CLASSIC_ATTRIBUTION,
  MAX_STATUS_BY_SOURCE_TYPE,
  STATUS_RANK,
  FACT_SOURCE_TYPES,
  VERIFICATION_STATUSES,
  BANNED_HERBS,
  FORBIDDEN_ACUPOINTS,
  HIGH_RISK_HERBS,
  DIFFICULTY_LADDER,
} from './source-catalog.mjs';

const deepClone = (o) => JSON.parse(JSON.stringify(o));

// 修正记录统一结构（回归测试据此断言「修复发生在源头而非 Gate」）
export function fix(layer, kind, reason) {
  return { layer, kind, reason };
}

// ---------- 标签归一化 + 出处表查表 ----------
function normLabel(s) {
  return String(s || '').replace(/[\s「」『』，。·、：:《》（）()]/g, '').trim();
}
export function findAttribution(label) {
  const key = normLabel(label);
  if (CLASSIC_ATTRIBUTION[key]) return { key, ...CLASSIC_ATTRIBUTION[key] };
  for (const [k, v] of Object.entries(CLASSIC_ATTRIBUTION)) {
    if (key && (key.includes(k) || k.includes(key))) return { key: k, ...v };
  }
  return null;
}

// ============================================================
// Layer 1 · 来源解析（修 B 出处错配 / K 知识边界）
// 经典/歌诀/术语条目先查白名单 → 纠偏出处与分类，未知则降级。
// ============================================================
function sourceParsing(c, out) {
  for (const ref of c.classics || []) {
    const att = findAttribution(ref.label);
    if (!att) {
      if (ref.sourceType === 'classic_original' && ref.status === 'verified') {
        ref.sourceType = 'traditional_commentary';
        ref.status = 'teaching_inference';
        ref.sourceTitle = ref.sourceTitle || '（待核验）';
        out.push(fix('来源解析', 'K', `经典「${ref.label}」无权威出处表记录却标 classic_original+verified，降级为 traditional_commentary/teaching_inference`));
      }
      continue;
    }
    const changed = [];
    if (att.correctType && ref.sourceType !== att.correctType) { ref.sourceType = att.correctType; changed.push(`sourceType→${att.correctType}`); }
    if (ref.sourceTitle !== att.correctCanon) { ref.sourceTitle = att.correctCanon; changed.push(`出处→「${att.correctCanon}」`); }
    if (att.correctStatus && ref.status !== att.correctStatus) { ref.status = att.correctStatus; changed.push(`status→${att.correctStatus}`); }
    if (att.correctChapter) ref.chapter = att.correctChapter;
    if (changed.length) {
      out.push(fix('来源解析', att.kind,
        `经典「${ref.label}」来源纠偏：${changed.join('、')}${att.note ? '（' + att.note + '）' : ''}`));
    }
  }
  return c;
}

// ============================================================
// Layer 2 · 知识分类 + 三值封顶（修 A 来源缺漏 / D 三值越级 / K 边界）
// ============================================================
function classifyAndDowngrade(c, out) {
  for (const f of c.facts || []) {
    const title = String(f.sourceTitle || '').trim();

    // A：来源缺漏。有两种改法：
    //   (1) classic_original 却无出处 → 知识边界 K + 来源缺漏 A，降级为教学推断
    //   (2) 其他来源缺 title → 补「（待核验）」并降级 pending
    if (f.sourceType === 'classic_original' && !title) {
      f.sourceType = 'teaching_design';
      f.status = 'teaching_inference';
      f.sourceTitle = '（无权威出处）';
      out.push(fix('知识分类', 'K', `fact「${f.field}」无出处却标 classic_original+verified，降级为 teaching_design/teaching_inference`));
      out.push(fix('事实采集', 'A', `fact「${f.field}」来源缺漏已按「无权威出处」降级，不得进入 verified`));
      continue;
    }
    if (!title) {
      f.sourceTitle = '（待核验）';
      f.status = 'pending';
      out.push(fix('事实采集', 'A', `fact「${f.field}」缺 sourceTitle，补「待核验」并降级 pending`));
    }

    // D：三值越级 → 按来源类型封顶（源头降级，而非 Gate 拒绝）
    const cap = MAX_STATUS_BY_SOURCE_TYPE[f.sourceType];
    if (cap && STATUS_RANK[f.status] > STATUS_RANK[cap]) {
      const before = f.status;
      f.status = cap;
      out.push(fix('知识分类', 'D', `fact「${f.field}」${f.sourceType} 被升级为 ${before}，按口径降级为 ${cap}`));
    }

    // 非法 sourceType / status（无法源头修正的异常，留给 Gate 硬拦）
    if (!FACT_SOURCE_TYPES.includes(f.sourceType)) {
      out.push(fix('事实采集', 'A', `fact「${f.field}」sourceType 非法「${f.sourceType}」`));
    }
    if (!VERIFICATION_STATUSES.includes(f.status)) {
      out.push(fix('事实采集', 'A', `fact「${f.field}」verificationStatus 非法「${f.status}」`));
    }
  }
  return c;
}

// ============================================================
// Layer 3 · 剂量分层（修 C 剂量混标）
// 原典「各等分/两/钱」不得折算克数；含数字的现代剂量必须有 verified 来源。
// 修复方式：剥离无来源的现代数字、剥离原典中的克数折算，而非整条 reject。
// ============================================================
function dosageLayering(c, out) {
  const d = deepClone(c.dosage || {});
  const orig = String(d.originalDosage || '');
  const modern = String(d.modernDosage || '');

  const origHasGram = /\d+(\.\d+)?\s*g/.test(orig);
  const origHasRelative = /各等分|等分|两|钱|枚|片|枣/.test(orig);

  if (origHasGram && origHasRelative) {
    d.originalDosage = orig
      .replace(/[（(][^（）()]*\d[^（）()]*[）)]/g, '')
      .replace(/\d+(\.\d+)?\s*g/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    out.push(fix('剂量分层', 'C', '原典「各等分/两」被折算为克数，剥离克数、仅保留原表述'));
  }

  const modernSourceVerified = d.modernSourceVerified === true && String(d.modernSourceTitle || '').trim().length > 0;
  const modernHasNum = /\d/.test(modern);
  if (modernHasNum && !modernSourceVerified) {
    d.modernDosage = undefined;
    d.modernSourceVerified = false;
    out.push(fix('剂量分层', 'C', '现代剂量数字缺少 verified 来源，从 modernDosage 剥离（不得进入背诵）'));
  }

  // 残留混标：仍有任何「克数折算未剥离」或「数字无来源」才为 true
  d.mixedToGrams = (/(各等分|等分|两|钱)/).test(String(d.originalDosage || '')) && /\d+(\.\d+)?\s*g/.test(String(d.originalDosage || ''));
  d.hasNumericModern = /\d/.test(String(d.modernDosage || ''));
  d.modernSourceVerified = modernSourceVerified;
  c.dosage = d;
  return c;
}

// ============================================================
// Layer 4 · 安全红线（修 J 高危/禁用内容隔离）
// 已禁用药材 / 禁针腧穴在生成阶段就强制注入红线警示。
// ============================================================
function safetyRedline(c, out) {
  const s = deepClone(c.safety || {});
  s.prohibitions = Array.isArray(s.prohibitions) ? s.prohibitions.slice() : [];
  let injected = false;

  if (c.category === 'herb' && BANNED_HERBS[c.title]) {
    const b = BANNED_HERBS[c.title];
    s.isBannedHerb = true;
    if (!s.prohibitions.some((p) => /已禁用|禁止/.test(p))) {
      s.prohibitions.push(b.redline);
      out.push(fix('安全红线', 'J', `已禁用药材「${c.title}」注入红线：${b.redline}`));
      injected = true;
    }
  } else if (c.category === 'herb' && HIGH_RISK_HERBS[c.title]) {
    const h = HIGH_RISK_HERBS[c.title];
    s.highRisk = true;
    if (!s.prohibitions.some((p) => /高风险|禁用|慎用|先煎/.test(p))) {
      s.prohibitions.push(h.redline);
      out.push(fix('安全红线', 'J', `高风险药材「${c.title}」注入红线：${h.redline}`));
      injected = true;
    }
  } else if (c.category === 'acupoint' && FORBIDDEN_ACUPOINTS[c.title]) {
    const a = FORBIDDEN_ACUPOINTS[c.title];
    s.highRisk = true;
    if (!s.prohibitions.some((p) => /禁针|禁深刺/.test(p))) {
      s.prohibitions.push(a.redline);
      out.push(fix('安全红线', 'J', `禁针穴「${c.title}」注入：${a.redline}`));
      injected = true;
    }
  }

  s.bannedWithoutWarning = (s.isBannedHerb && !injected);
  c.safety = s;
  return c;
}

// ============================================================
// Layer 5 · 反模板（修 H 模板化/重复，批级跨节点）
// 检测 standardJudgment 相等/包含 → 标记 isTemplated，强制重写。
// ============================================================
export function antiTemplating(nodes, out) {
  // 先统计每个 standardJudgment 是否与其他节点重复（含包含关系），
  // 命中即整簇标记，而非只标后者：模板化是“聚类”缺陷，首个出现者同样属于模板实例。
  const texts = nodes.map((nd) => String(nd.stdJudgment || '').trim()).filter(Boolean);
  const isDup = (sj) => sj && texts.filter((t) => t && (t === sj || t.includes(sj) || sj.includes(t))).length > 1;
  for (const nd of nodes) {
    const sj = String(nd.stdJudgment || '').trim();
    const cd = String(nd.coreDefinition || '').trim();
    nd.templated = nd.templated || {};
    nd.templated.stdJudgment = sj;
    nd.templated.core = cd;
    nd.templated.isTemplated = !!isDup(sj);
    if (nd.templated.isTemplated) {
      out.push(fix('反模板', 'H', `「${nd.title}」standardJudgment 与其他节点重复/包含（模板化），须重写`));
    }
  }
  return nodes;
}

// ============================================================
// Layer 6 · FactAudit 触发规则（修 A 来源完整性）
// 每个事实必须六要素齐全，缺任何关键要素即记录。
// ============================================================
function factAuditTrigger(c, out) {
  for (const f of c.facts || []) {
    const missing = ['field', 'sourceType', 'sourceTitle'].filter((k) => !f[k] || !String(f[k]).trim());
    if (missing.length) {
      out.push(fix('FactAudit触发', 'A', `fact「${f.field || '(未命名字段)'}」缺乏六要素之 ${missing.join('/')}`));
    }
  }
  return c;
}

// ============================================================
// 推理语义门（E/F/G）—— 不定性为字段检查，做弱语义判定。
// 新模型：cases = { level, originalJudgment, c3Evidence[], counterEvidence, revision }
// 空泛/套话模式：视为「证据不足」「反证无效」「修正无效」。
// ============================================================
function isFiller(t) {
  const s = String(t || '').trim();
  // 仅按「套话/空泛」模式判断，不再用长度卡短句：症状事实（即使短句）应视为有效证据，
  // 是否充分交由证据分层（evidenceTier）判断，避免把「胸闷如窒」「入睡困难」误标为空泛。
  return /(综合考虑.*观察|进一步观察|继续观察|动态观察|视情况|因证施治|辨证论治|随证|酌情|仅供参考|需.*进一步)/.test(s);
}
// —— 证据强度分层（7 层）——
// 仅用于判断「C3 证据是否存在第二独立来源」，不改变最终安全边界。
// 1 症状事实 / 2 舌脉体征 / 3 病史时间线 / 4 检验客观指标 / 5 经典依据 / 6 方药反应 / 7 其他支持证据
export const EVIDENCE_TIER_LABEL = {
  1: '症状事实', 2: '舌脉/体征', 3: '病史/时间线', 4: '检验/客观指标',
  5: '经典依据', 6: '方药反应', 7: '其他支持证据',
};
export function evidenceTier(t) {
  const s = String(t || '');
  if (/舌|脉|苔/.test(s)) return 2;
  if (/检验|检测|指标|生化|血象|血糖|血压|心电图|影像|超声|CT|核磁|X线|B超|病理|活检|抗体|培养|血氧/.test(s)) return 4;
  if (/《|经曰|原文|条文|经典|素问|灵枢|伤寒|金匮|内经|本草/.test(s)) return 5;
  if (/服药|服后|药后|用药|方后|复诊|改方|投以|加味|减味/.test(s)) return 6;
  if (/病史|既往|自幼|平素|反复发作|病程|宿疾|旧疾|多年|数年|十年前|既往史/.test(s)) return 3;
  if (/压痛点|叩击痛|听诊|闻诊|触诊|扪及|黄疸|水肿|皮疹|瘀斑|震颤|面赤|目赤/.test(s)) return 7;
  return 1; // 症状事实（默认）
}
function hasOpposingMarker(t) {
  // 反证必须带「转折/否定/对立征象」，否则只是补充性复述，不构成真实反证
  return /而|但|然|却|反|未|无|不|非|拒|排除|相反|舌淡|脉细|脉弱|脉沉|无汗|不渴|虚象/.test(String(t || ''));
}
function isGenericRevision(t) {
  const s = String(t || '').trim();
  return !s || s.length < 6 || /(综合考虑.*观察|进一步观察|继续观察|动态观察|视情况而定|因证施治|辨证论治|仍须观察|需结合临床)/.test(s);
}
function revisionAddressesCounter(t) {
  return /(排除|改为|重新|修正|不能|不可|不属|不应|须辨|应以|需.*清|重新限定|祛|补|温|清|利|降)/.test(String(t || ''));
}

export function semanticReasoningGates(rc) {
  const res = {};
  const evidence = (rc.c3Evidence || []).filter((x) => String(x || '').trim());
  if (evidence.length < 2) {
    res.E = '核心证据不足 2 条，不足以支撑结论';
  } else if (evidence.some(isFiller)) {
    res.E = '核心证据存在空泛项，表面有证据但不足以支撑结论';
  } else if (evidence.every((x) => evidenceTier(x) === 1)) {
    res.E = '核心证据仅为症状事实，缺乏第二独立证据（舌脉/体征、病史、检验、经典、方药等），不足以支撑具体证候结论';
  }
  if (rc.level === 'C4') {
    if (!rc.counterEvidence || isFiller(rc.counterEvidence) || !hasOpposingMarker(rc.counterEvidence)) {
      res.F = '反证为空泛/补充性说明，未真正削弱原判断';
    }
    if (!rc.revision || isGenericRevision(rc.revision) || !revisionAddressesCounter(rc.revision)) {
      res.G = '修正为空泛套话，未实质回应反证、未重新限定原判断';
    }
    // 通过 F/G 的 C4 语义案例：正则只能排除明显弱项，无法确证「反证真削弱/修正真回应」，须人工复核，不自动放行
    if (!res.F && !res.G) res.humanReviewRequired = true;
  }
  return res;
}

// 人工复核标记：C4 语义案例通过 F/G 后仍需人工确认（不追求完全自动化）
export function humanReviewRequired(c) {
  const isNewModel = c.cases && (c.cases.level || Array.isArray(c.cases.c3Evidence) ||
    typeof c.cases.counterEvidence === 'string' || typeof c.cases.revision === 'string');
  if (!isNewModel) return false;
  return !!semanticReasoningGates(c.cases).humanReviewRequired;
}

// ============================================================
// Gate · A–K 最后不变式（在源头修复之后，只拦「源头无法修正的异常」）
// ============================================================
export function runGates(c) {
  const fails = [];
  const add = (gate, note) => fails.push({ gate, note });

  // A
  if (!c.facts || c.facts.length === 0) add('A', 'factAudit 为空');
  else {
    const empty = c.facts.find((f) => !f.sourceTitle || !String(f.sourceTitle).trim());
    const badType = c.facts.find((f) => !FACT_SOURCE_TYPES.includes(f.sourceType));
    const badStatus = c.facts.find((f) => !VERIFICATION_STATUSES.includes(f.status));
    if (empty) add('A', `fact「${empty.field}」缺 sourceTitle`);
    if (badType) add('A', `fact「${badType.field}」sourceType 非法`);
    if (badStatus) add('A', `fact「${badStatus.field}」verificationStatus 非法`);
  }

  // B
  const vc = (c.classics || []).filter((r) => r.status === 'verified');
  for (const r of vc) {
    const att = findAttribution(r.label);
    if (att && r.sourceTitle !== att.correctCanon) add('B', `经典「${r.label}」出处「${r.sourceTitle}」≠ 权威「${att.correctCanon}」`);
  }

  // C
  if (c.dosage?.mixedToGrams) add('C', '原典剂量仍混有克数折算');
  else if (c.dosage?.hasNumericModern && !c.dosage?.modernSourceVerified) add('C', '现代剂量数字缺少 verified 来源');

  // D
  const up = (c.facts || []).find((f) => (f.sourceType === 'teaching_design' || f.sourceType === 'modern_interpretation') && f.status === 'verified');
  if (up) add('D', `fact「${up.field}」教学/现代解释被升级为 verified`);

  // E / F / G（语义门优先；旧 flag 模型回退，保证 3A.1 回归不变）
  if (c.cases) {
    const isNewModel = c.cases.level || Array.isArray(c.cases.c3Evidence) || typeof c.cases.counterEvidence === 'string' || typeof c.cases.revision === 'string';
    if (isNewModel) {
      const se = semanticReasoningGates(c.cases);
      if (se.E) add('E', se.E);
      if (se.F) add('F', se.F);
      if (se.G) add('G', se.G);
    } else {
      if (!c.cases.c4HasFlags) add('E', 'C4 缺 requireCounterEvidence/requireRevision');
      else if ((c.cases.c3EvidenceCount ?? 0) < 2) add('E', 'C3 核心证据不足 2 条');
      else if (!c.cases.c3Relevant) add('E', 'C3 证据与判断不相关');
      if (!c.cases.counterWeakens) add('F', 'C4 反证为补充性说明，未真正削弱原判断');
      if (!c.cases.revisionResponds) add('G', 'C4 修正未回应反证，仅换词/重复原判断');
    }
  }

  // H（节点级）
  if (c.templated?.isTemplated) add('H', 'freeReasoning/standardJudgment 模板化');

  // I
  if (![1, 2, 3, 4, 5].includes(c.difficulty)) add('I', `难度 ${c.difficulty} 超出 1–5`);

  // J
  const proh = c.safety?.prohibitions || [];
  if (c.safety?.bannedWithoutWarning) add('J', '已禁用药材未带「已禁用」红线警示');
  else if (c.category === 'herb' && BANNED_HERBS[c.title] && !proh.some((p) => /已禁用/.test(p))) add('J', '已禁用药材无红线警示');
  else if (c.category === 'herb' && HIGH_RISK_HERBS[c.title] && !proh.some((p) => /高风险/.test(p))) add('J', '高风险药材无红线警示');
  else if (c.category === 'acupoint' && FORBIDDEN_ACUPOINTS[c.title] && !proh.some((p) => /禁针|禁深刺|禁灸/.test(p))) add('J', '禁针穴缺禁针/禁深刺提示');

  // K：知识边界（残差判断：源头修复后仍存在的越界）
  const kb = [];
  const kUp = (c.facts || []).find((f) => (f.sourceType === 'teaching_design' || f.sourceType === 'modern_interpretation') && f.status === 'verified');
  if (kUp) kb.push('teaching_inference/design 被升级为 verified');
  for (const ref of c.classics || []) {
    const att = findAttribution(ref.label);
    if (att && att.kind === 'K' && ref.sourceType === 'classic_original' && ref.status === 'verified') {
      kb.push(`教学概括/后世说法伪装成经典原文（${ref.label}）`);
    }
  }
  for (const f of c.facts || []) {
    if (f.sourceType === 'classic_original' && f.status === 'verified' && !String(f.sourceTitle || '').trim()) {
      kb.push('原典无明确记载却标为经典事实');
    }
  }
  if (kb.length) add('K', [...new Set(kb)].join('；'));

  return fails;
}

// 难度梯度校验（修 I）
export function checkDifficultyGradient(samples) {
  const labels = samples.map((s) => s.difficultyLabel).filter(Boolean);
  const weights = samples.map((s) => s.difficulty).filter((d) => d != null);
  const distinct = new Set(weights);
  const missing = DIFFICULTY_LADDER.filter((l) => !labels.includes(l.label)).map((l) => l.label);
  return { distinct: distinct.size, missing, samples: samples.length };
}

// ============================================================
// 主管线：单节点跑 6 层源头修复 + Gate；批级跑反模板。
// ============================================================
export function runPipeline(raw) {
  const corrections = [];
  let c = deepClone(raw);
  c = sourceParsing(c, corrections);
  c = classifyAndDowngrade(c, corrections);
  c = dosageLayering(c, corrections);
  c = safetyRedline(c, corrections);
  c = factAuditTrigger(c, corrections);
  const gateFails = runGates(c);
  const verdict = gateFails.length === 0 ? (c.manualReview ? '有条件通过' : '通过') : '不通过';
  return { normalized: c, corrections, gateFails, verdict };
}

// ============================================================
// 独立运行：打印管线自检摘要（完整回归见 regression.test.mjs）
// ============================================================
const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].split('\\').join('/').split('/').slice(-1)[0]);
if (isMain) {
  console.log('Phase 3A.1 分层生产管线已加载。');
  console.log('分层：来源解析 → 知识分类/三值封顶 → 剂量分层 → 安全红线 → 反模板 → FactAudit触发 → Gate(最后不变式)。');
  console.log('请运行 node phase-3a.1/regression.test.mjs 查看定向回归结果。');
}