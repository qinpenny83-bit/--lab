// ============================================================
// 杏林大典 · Phase 4 · coverage-matrix 生成器
// ============================================================
// 唯一覆盖基准：phase-4/target-map.mjs（305 节点）
// 口径：
//   status=produced  —— 本阶段生产管线（Phase 3B Batch-1）已产出
//                       该主题级学习单元（理论/方剂主题主内容直接对应）
//   status=legacy    —— 已有 V3.5 canonical 旧实体覆盖（未走 Phase 4 管线，待升级）
//   status=pending   —— 尚未生产（Batch-2/3/4 排产）
//   assets           —— 已生产的实体级资产（单味药/穴位/案例）挂载，不虚报为主题覆盖
// 禁止：以「生成了很多节点」代替「305 逐一统计」。
// ============================================================
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { TARGET_MAP, DOMAIN_PREREQ, REFERENCE_HOST_DOMAIN } from './target-map.mjs';

const OUT_DIR = join(process.cwd(), 'phase-4');

// ---------- Phase 3B Batch-1 产出（50 节点，id/title/category/verdict） ----------
const PB3 = [
  // herb ×10（单味药 = 实体资产，不直接构成 305 主题覆盖）
  ['pb1-herb-01', '麻黄', 'herb', 'candidate'],
  ['pb1-herb-02', '桂枝', 'herb', 'candidate'],
  ['pb1-herb-03', '细辛', 'herb', 'candidate'],
  ['pb1-herb-04', '附子', 'herb', 'candidate'],
  ['pb1-herb-05', '柴胡', 'herb', 'candidate'],
  ['pb1-herb-06', '甘草', 'herb', 'candidate'],
  ['pb1-herb-07', '半夏', 'herb', 'candidate'],
  ['pb1-herb-08', '人参', 'herb', 'candidate'],
  ['pb1-herb-09', '石膏', 'herb', 'candidate'],
  ['pb1-herb-10', '黄连', 'herb', 'candidate'],
  // formula ×10（方剂 = 经典方剂领域主题级覆盖）
  ['pb1-formula-01', '麻黄汤', 'formula', 'candidate'],
  ['pb1-formula-02', '桂枝汤', 'formula', 'candidate'],
  ['pb1-formula-03', '小柴胡汤', 'formula', 'candidate'],
  ['pb1-formula-04', '四逆汤', 'formula', 'candidate'],
  ['pb1-formula-05', '六味地黄丸', 'formula', 'candidate'],
  ['pb1-formula-06', '补中益气汤', 'formula', 'conditional'],
  ['pb1-formula-07', '银翘散', 'formula', 'candidate'],
  ['pb1-formula-08', '十枣汤', 'formula', 'candidate'],
  ['pb1-formula-09', '逍遥散', 'formula', 'candidate'],
  ['pb1-formula-10', '白虎汤', 'formula', 'conditional'],
  // acupoint ×10（穴位 = 经络领域实体资产）
  ['pb1-acu-01', '合谷', 'acupoint', 'candidate'],
  ['pb1-acu-02', '足三里', 'acupoint', 'candidate'],
  ['pb1-acu-03', '内关', 'acupoint', 'candidate'],
  ['pb1-acu-04', '三阴交', 'acupoint', 'candidate'],
  ['pb1-acu-05', '哑门', 'acupoint', 'candidate'],
  ['pb1-acu-06', '风池', 'acupoint', 'candidate'],
  ['pb1-acu-07', '太冲', 'acupoint', 'candidate'],
  ['pb1-acu-08', '委中', 'acupoint', 'candidate'],
  ['pb1-acu-09', '膻中', 'acupoint', 'candidate'],
  ['pb1-acu-10', '列缺', 'acupoint', 'candidate'],
  // theory ×10（理论 = 主题级覆盖）
  ['pb1-theory-01', '阴阳学说', 'theory', 'candidate'],
  ['pb1-theory-02', '五行生克', 'theory', 'candidate'],
  ['pb1-theory-03', '藏象·心', 'theory', 'candidate'],
  ['pb1-theory-04', '气一元论与气血', 'theory', 'candidate'],
  ['pb1-theory-05', '六淫病因', 'theory', 'candidate'],
  ['pb1-theory-06', '正邪病机', 'theory', 'candidate'],
  ['pb1-theory-07', '四诊合参', 'theory', 'candidate'],
  ['pb1-theory-08', '八纲辨证', 'theory', 'candidate'],
  ['pb1-theory-09', '治未病', 'theory', 'candidate'],
  ['pb1-theory-10', '卫气营血辨证', 'theory', 'candidate'],
  // clinical case ×10（案例 = 辨证主题实体资产）
  ['pb1-case-01', '表实表虚辨汗', 'clinical', 'candidate'],
  ['pb1-case-02', '脾胃气虚案', 'clinical', 'candidate'],
  ['pb1-case-03', '肝郁化火案', 'clinical', 'candidate'],
  ['pb1-case-04', '湿困中焦证据不足案', 'clinical', 'quarantine'],
  ['pb1-case-05', '眩晕虚实辨案', 'clinical', 'conditional'],
  ['pb1-case-06', '咳嗽寒热辨案', 'clinical', 'conditional'],
  ['pb1-case-07', '脾虚湿盛与湿热中阻案', 'clinical', 'candidate'],
  ['pb1-case-08', '感冒入里化热案', 'clinical', 'candidate'],
  ['pb1-case-09', '寒热真假权重案', 'clinical', 'conditional'],
  ['pb1-case-10', '需暂缓判断案', 'clinical', 'quarantine'],
];

// ---------- 主题级 produced 映射（Phase 3B 主内容直接对应的 305 节点） ----------
const TOPIC_PRODUCED = {
  '02-01': ['pb1-theory-01'],   // 阴阳基本概念 ← 阴阳学说
  '03-04': ['pb1-theory-02'],   // 五行相生 ← 五行生克
  '04-03': ['pb1-theory-03'],   // 心 ← 藏象·心
  '05-02': ['pb1-theory-04'],   // 气的基本概念 ← 气一元论与气血
  '07-01': ['pb1-theory-05'],   // 六淫概念 ← 六淫病因
  '08-02': ['pb1-theory-06'],   // 邪正盛衰 ← 正邪病机
  '10-01': ['pb1-theory-08'],   // 八纲辨证总论 ← 八纲辨证
  '14-01': ['pb1-theory-10'],   // 卫气营血总论 ← 卫气营血辨证
  '16-01': ['pb1-theory-09'],   // 治病求本 ← 治未病（预防思想归治则总纲，note 标注）
  '18-01': ['pb1-formula-01', 'pb1-formula-02', 'pb1-formula-07'], // 解表剂
  '18-02': ['pb1-formula-10'],  // 清热剂
  '18-03': ['pb1-formula-08'],  // 泻下剂
  '18-04': ['pb1-formula-03', 'pb1-formula-09'], // 和解剂
  '18-05': ['pb1-formula-04'],  // 温里剂
  '18-06': ['pb1-formula-05', 'pb1-formula-06'], // 补益剂
  '21-01': ['pb1-theory-07'],   // 四诊信息综合 ← 四诊合参
};

// ---------- 资产挂载（实体级，不置 produced） ----------
const ASSETS = {
  // 单味药 → 方剂领域（方以药为支撑）
  '18-01': ['pb1-herb-01', 'pb1-herb-02', 'pb1-herb-09'], // 麻黄桂枝石膏
  '18-02': ['pb1-herb-10'],  // 黄连
  '18-03': ['pb1-herb-06'],  // 甘草（十枣汤反药）
  '18-04': ['pb1-herb-05'],  // 柴胡
  '18-05': ['pb1-herb-04', 'pb1-herb-07', 'pb1-herb-03'], // 附子半夏细辛
  '18-06': ['pb1-herb-08'],  // 人参
  // 穴位 → 经络领域
  '06-02': ['pb1-acu-01', 'pb1-acu-02', 'pb1-acu-03', 'pb1-acu-04', 'pb1-acu-05', 'pb1-acu-06', 'pb1-acu-07', 'pb1-acu-08', 'pb1-acu-09', 'pb1-acu-10'],
  // 案例 → 辨证主题
  '10-02': ['pb1-case-01', 'pb1-case-08'], // 表证里证 + 表里出入
  '12-11': ['pb1-case-02', 'pb1-case-07'], // 脾气虚/脾虚湿盛
  '12-06': ['pb1-case-03'], // 肝气郁结（化火 → 12-07）
  '12-07': ['pb1-case-03'],
  '12-12': ['pb1-case-04', 'pb1-case-07'], // 湿困中焦
  '10-09': ['pb1-case-05'], // 眩晕虚实
  '10-05': ['pb1-case-06'], // 咳嗽寒热
  '10-08': ['pb1-case-09'], // 寒热真假
  '21-05': ['pb1-case-10'], // 需暂缓判断 → 多假设推理
};

// ---------- legacy 映射（V3.5 canonical 85 → 305 节点） ----------
const LEGACY = {
  '01-01': ['ck-tcm-definition'],
  '01-02': ['ck-holism'],
  '01-03': ['ck-syndrome-differentiation'],
  '01-04': ['ck-symptom-sign-disease'],
  '01-07': ['ck-tcm-definition'],
  '02-01': ['ck-yin-yang-intro'],
  '02-02': ['ck-yin-yang-intro'],
  '02-03': ['ck-yin-yang-relation'],
  '02-04': ['ck-yin-yang-relation'],
  '02-05': ['ck-yin-yang-relation'],
  '02-06': ['ck-yin-yang-relation'],
  '02-08': ['ck-yin-yang-application'],
  '02-09': ['ck-yin-yang-application'],
  '02-10': ['ck-yin-yang-application'],
  '02-11': ['ck-yin-yang-application'],
  '02-12': ['ck-yin-yang-application'],
  '02-13': ['ck-yin-yang-overview'],
  '03-04': ['ck-yin-yang-relation'], // 五行生克关联（跨学说）
  '04-03': ['ck-heart-zang'],
  '04-04': ['ck-liver-zang'],
  '04-05': ['ck-spleen-zang'],
  '04-06': ['ck-lung-zang'],
  '04-07': ['ck-kidney-zang'],
  '04-09': ['ck-gallbladder-bladder-san-jiao'],
  '04-10': ['ck-stomach-fu'],
  '04-11': ['ck-small-large-intestine'],
  '04-12': ['ck-small-large-intestine'],
  '04-13': ['ck-gallbladder-bladder-san-jiao'],
  '04-14': ['ck-gallbladder-bladder-san-jiao'],
  '05-02': ['ck-qi-basics'],
  '05-03': ['ck-qi-basics'],
  '05-04': ['ck-qi-basics'],
  '05-05': ['ck-qi-movement'],
  '05-06': ['ck-qi-movement', 'ck-qi-mechanism'],
  '05-07': ['ck-qi-basics'],
  '05-08': ['ck-blood-basics'],
  '05-09': ['ck-body-fluid'],
  '05-10': ['ck-spirit-obs'],
  '05-11': ['ck-qi-blood-fluid'],
  '05-12': ['ck-qi-blood-fluid'],
  '05-13': ['ck-qi-blood-fluid'],
  '07-01': ['ck-etiology'],
  '07-09': ['ck-etiology', 'ck-spirit-obs'],
  '07-13': ['ck-phlegm-fluid'],
  '07-14': ['ck-blood-stasis'],
  '08-01': ['ck-pathogenesis'],
  '08-02': ['ck-vital-pathogen'],
  '08-03': ['ck-yin-yang-application'],
  '08-04': ['ck-qi-disorders', 'ck-qi-mechanism-disorder', 'ck-blood-cold-heat'],
  '08-05': ['ck-body-fluid', 'ck-phlegm-fluid'],
  '08-07': ['ck-qi-ascent-descent', 'ck-qi-mechanism-disorder'],
  '08-12': ['ck-disease-transmission'],
  '09-01': ['ck-inspection'],
  '09-02': ['ck-spirit-obs'],
  '09-06': ['ck-tongue-dx'],
  '09-08': ['ck-auscultation'],
  '09-11': ['ck-inquiry'],
  '09-13': ['ck-cold-heat-obs'],
  '09-14': ['ck-sweat-obs'],
  '09-16': ['ck-diet-obs'],
  '09-18': ['ck-sleep-obs'],
  '09-20': ['ck-palpation'],
  '09-21': ['ck-pulse-dx'],
  '09-22': ['ck-pulse-dx'],
  '09-24': ['ck-pulse-dx'],
  '09-25': ['ck-tongue-dx'],
  '10-01': ['ck-ba-gang-integration'],
  '10-02': ['ck-exterior-syndrome'],
  '10-03': ['ck-exterior-interior-dynamics'],
  '10-04': ['ck-exterior-interior-dynamics'],
  '10-05': ['ck-cold-heat-ba'],
  '10-07': ['ck-cold-heat-transformation'],
  '10-08': ['ck-false-cold-heat', 'ck-true-false-identification'],
  '10-09': ['ck-deficiency-excess'],
  '10-10': ['ck-deficiency-excess-mixed', 'ck-deficiency-excess-intertwine'],
  '10-12': ['ck-yin-yang-overview'],
  '10-13': ['ck-ba-gang-integration'],
  '10-14': ['ck-counter-evidence'],
  '11-02': ['ck-qi-disorders'],
  '11-03': ['ck-qi-disorders'],
  '11-04': ['ck-qi-disorders'],
  '11-05': ['ck-qi-disorders'],
  '11-07': ['ck-blood-stasis'],
  '11-08': ['ck-blood-cold-heat'],
  '11-11': ['ck-phlegm-fluid'],
  '11-12': ['ck-phlegm-fluid'],
  '11-13': ['ck-phlegm-fluid'],
  '12-01': ['ck-ba-gang-integration'],
  '13-02': ['ck-six-meridian-taiyang'],
  '13-03': ['ck-six-meridian-yangming'],
  '13-04': ['ck-six-meridian-shaoyang'],
  '13-05': ['ck-six-meridian-taiyin'],
  '13-06': ['ck-six-meridian-shaoyin'],
  '13-07': ['ck-six-meridian-jueyin'],
  '14-01': ['ck-defensive-qi-blood'],
  '15-01': ['ck-triple-burner'],
  '16-02': ['ck-strengthen-dispel'],
  '16-03': ['ck-priority-treatment'],
  '16-04': ['ck-orthodox-reverse'],
  '16-09': ['ck-monarch-minister'],
  '17-03': ['ck-monarch-minister', 'ck-formula-structure'],
  '17-08': ['ck-formula-syndrome'],
  '18-16': ['ck-formula-structure'],
  '19-11': ['ck-reading-classics'],
  '21-01': ['ck-info-gathering', 'ck-observation-inquiry-advanced'],
  '21-02': ['ck-inference-synthesis'],
  '21-03': ['ck-ba-gang-integration'],
  '21-05': ['ck-hypothesis-formation'],
  '21-07': ['ck-syndrome-dynamic-treatment'],
  '22-06': ['ck-differentiation-comparison'],
  '23-06': ['ck-info-gathering'],
  '23-07': ['ck-counter-evidence', 'ck-counter-evidence-advanced'],
  '23-08': ['ck-inference-synthesis', 'ck-transfer-explanation-advanced'],
};

// ---------- 节点判定的最终状态 ----------
const producedVerdict = {};
for (const [id, title, cat, verdict] of PB3) producedVerdict[id] = verdict;

function finalStatus(nodeId, topicName) {
  const prod = TOPIC_PRODUCED[nodeId];
  if (prod) {
    const verdicts = prod.map((id) => producedVerdict[id]);
    const hasQuarantine = verdicts.includes('quarantine');
    const hasConditional = verdicts.includes('conditional');
    return hasQuarantine ? 'quarantine' : hasConditional ? 'conditional' : 'candidate';
  }
  if (LEGACY[nodeId]) return 'legacy';
  return 'pending';
}

// ---------- 难度插值（同域 [base, cap] 线性） ----------
function difficultyFor(domain, i, n) {
  const [base, cap] = domain.diff;
  if (n <= 1) return base;
  return Math.round(base + ((cap - base) * i) / (n - 1));
}

// ---------- 前置 / 后继 ----------
function domainLastNode(domainId) {
  const d = TARGET_MAP.domains.find((x) => x.id === domainId);
  if (!d || d.topics.length === 0) return null;
  return d.topics[d.topics.length - 1][0];
}

function buildRow(nodeId, topicName, desc, domain, index, total) {
  const host = REFERENCE_HOST_DOMAIN[nodeId] || domain.id;
  const status = finalStatus(nodeId, topicName);
  const prod = TOPIC_PRODUCED[nodeId] || [];
  const assets = ASSETS[nodeId] || [];
  const legacy = LEGACY[nodeId] || [];
  const prevInDomain = index > 0 ? domain.topics[index - 1][0] : null;
  const nextInDomain = index < total - 1 ? domain.topics[index + 1][0] : null;
  const domainPrereq = (DOMAIN_PREREQ[domain.id] || [])
    .map((d) => domainLastNode(d))
    .filter(Boolean);
  const prereq = [...domainPrereq];
  if (prevInDomain) prereq.push(prevInDomain);
  // Reference 节点额外前置宿主域末节点
  if (domain.reference && host !== domain.id) {
    const hostLast = domainLastNode(host);
    if (hostLast && !prereq.includes(hostLast)) prereq.push(hostLast);
  }
  const sourceStatus =
    status === 'candidate' ? 'verified'
    : status === 'legacy' ? 'pending'
    : 'pending';
  return {
    nodeId,
    domain: host,
    domainName: TARGET_MAP.domains.find((d) => d.id === host)?.name || domain.name,
    topic: topicName,
    description: desc,
    status,
    nodeStatus: status === 'candidate' || status === 'conditional' || status === 'quarantine' ? status : null,
    sourceStatus,
    learningStatus: status === 'pending' ? 'planned' : status === 'legacy' ? 'needs_upgrade' : 'ready',
    difficulty: domain.reference ? 4 : difficultyFor(domain, index, total),
    prerequisite: prereq,
    nextNode: nextInDomain,
    producedBy: prod,
    legacyCoveredBy: legacy,
    assets,
    reference: domain.reference ? true : undefined,
  };
}

// ---------- 生成 ----------
const matrix = [];
for (const domain of TARGET_MAP.domains) {
  domain.topics.forEach(([nodeId, topicName, desc], i) => {
    matrix.push(buildRow(nodeId, topicName, desc, domain, i, domain.topics.length));
  });
}

// ---------- 统计 ----------
const byStatus = {};
for (const r of matrix) byStatus[r.status] = (byStatus[r.status] || 0) + 1;
const total = matrix.length;

const produced = matrix.filter((r) => r.status === 'candidate' || r.status === 'conditional' || r.status === 'quarantine');
const legacy = matrix.filter((r) => r.status === 'legacy');
const pending = matrix.filter((r) => r.status === 'pending');

const result = {
  schema: 'phase-4/coverage-matrix/v1',
  basis: TARGET_MAP.basis,
  generatedAt: new Date().toISOString(),
  totals: { total, produced: produced.length, legacy: legacy.length, pending: pending.length, byStatus },
  summary: {
    producedThemes: produced.map((r) => r.nodeId),
    legacyThemes: legacy.map((r) => r.nodeId),
    pendingThemes: pending.map((r) => r.nodeId),
    assetCount: Object.values(ASSETS).flat().length,
    assetsByNode: Object.fromEntries(Object.entries(ASSETS).map(([k, v]) => [k, v.length])),
  },
  rows: matrix,
};

writeFileSync(join(OUT_DIR, 'coverage-matrix.json'), JSON.stringify(result, null, 2), 'utf8');
console.log(`total=${total} produced=${produced.length} legacy=${legacy.length} pending=${pending.length}`);
console.log('byStatus=', JSON.stringify(byStatus));
console.log('assets=', result.summary.assetCount);
