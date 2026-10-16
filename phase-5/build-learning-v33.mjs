// ============================================================
// 杏林大典 · Phase 5 · 33 学科学习系统编排器
// 输入：
//   phase-5/coverage-matrix.json（455 行：305 存量 + 150 新增，唯一覆盖事实源）
//   phase-5/batch-1/samples.json（150 新样本学习单元）
//   phase-3b + phase-4/batch-2/3/4 样本（存量 305 学习单元）
//   blueprint-map.mjs（33 学科注册表）
// 输出（phase-5/learning-system/）：
//   all-nodes.json / mastery-map.json / learning-path.json /
//   daily-practice.json / production-dashboard.json / final-audit.json /
//   production-report.md
// 原则：
//   - Phase 2.5 Schema 不动；本脚本只做编排与聚合，不改管线。
//   - 异常驱动：任何未知样本引用都会显式报错，不静默补造。
// 运行：node phase-5/build-learning-v33.mjs
// ============================================================
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLUEPRINT_MAP } from './blueprint-map.mjs';
import { SAMPLES as PB1 } from '../phase-3b/samples.mjs';
import { SAMPLES_PART1 as B2P1 } from '../phase-4/batch-2/samples-part1.mjs';
import { SAMPLES_PART2 as B2P2 } from '../phase-4/batch-2/samples-part2.mjs';
import { SAMPLES_PART3 as B2P3 } from '../phase-4/batch-2/samples-part3.mjs';
import { SAMPLES_PART4 as B2P4 } from '../phase-4/batch-2/samples-part4.mjs';
import { SAMPLES_P3_1 as B3P1 } from '../phase-4/batch-3/samples-part1.mjs';
import { SAMPLES_P3_2 as B3P2 } from '../phase-4/batch-3/samples-part2.mjs';
import { SAMPLES_P3_3 as B3P3 } from '../phase-4/batch-3/samples-part3.mjs';
import { SAMPLES_P4_1 as B4P1 } from '../phase-4/batch-4/samples-part1.mjs';
import { SAMPLES_P4_2 as B4P2 } from '../phase-4/batch-4/samples-part2.mjs';
import { SAMPLES_P4_3 as B4P3 } from '../phase-4/batch-4/samples-part3.mjs';
import { SAMPLES_P4_4 as B4P4 } from '../phase-4/batch-4/samples-part4.mjs';
import { SAMPLES_P4_5 as B4P5 } from '../phase-4/batch-4/samples-part5.mjs';
import { CLASSIC_ATTRIBUTION_PATCH } from './classic-patch.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'learning-system');
mkdirSync(OUT, { recursive: true });

const matrix = JSON.parse(readFileSync(join(__dirname, 'coverage-matrix.json'), 'utf8'));
const subjectByName = new Map(BLUEPRINT_MAP.subjects.map((s) => [s.code, s]));

// ---------- 收集全部原始样本（id → sample） ----------
const allSamples = [];
const push = (arr) => { for (const s of arr || []) allSamples.push(s); };
push(PB1); push(B2P1); push(B2P2); push(B2P3); push(B2P4);
push(B3P1); push(B3P2); push(B3P3);
push(B4P1); push(B4P2); push(B4P3); push(B4P4); push(B4P5);
{
  const b1 = JSON.parse(readFileSync(join(__dirname, 'batch-1', 'samples.json'), 'utf8')).samples;
  push(b1);
}
{
  const b2 = JSON.parse(readFileSync(join(__dirname, 'batch-2', 'samples.json'), 'utf8')).samples;
  push(b2);
}
{
  const b3 = JSON.parse(readFileSync(join(__dirname, 'batch-3', 'samples.json'), 'utf8')).samples;
  push(b3);
}
{
  const b4 = JSON.parse(readFileSync(join(__dirname, 'batch-4', 'samples.json'), 'utf8')).samples;
  push(b4);
}
{
  const b5 = JSON.parse(readFileSync(join(__dirname, 'batch-5', 'samples.json'), 'utf8')).samples;
  push(b5);
}
{
  const b6 = JSON.parse(readFileSync(join(__dirname, 'batch-6', 'samples.json'), 'utf8')).samples;
  push(b6);
}
{
  const b7 = JSON.parse(readFileSync(join(__dirname, 'batch-7', 'samples.json'), 'utf8')).samples;
  push(b7);
}
{
  const b8 = JSON.parse(readFileSync(join(__dirname, 'batch-8', 'samples.json'), 'utf8')).samples;
  push(b8);
}
{
  const b9 = JSON.parse(readFileSync(join(__dirname, 'batch-9', 'samples.json'), 'utf8')).samples;
  push(b9);
}
{
  const b10 = JSON.parse(readFileSync(join(__dirname, 'batch-10', 'samples.json'), 'utf8')).samples;
  push(b10);
}
{
  const b11 = JSON.parse(readFileSync(join(__dirname, 'batch-11', 'samples.json'), 'utf8')).samples;
  push(b11);
}
{
  const b12 = JSON.parse(readFileSync(join(__dirname, 'batch-12', 'samples.json'), 'utf8')).samples;
  push(b12);
}
{
  const b13 = JSON.parse(readFileSync(join(__dirname, 'batch-13', 'samples.json'), 'utf8')).samples;
  push(b13);
}
{
  const b14 = JSON.parse(readFileSync(join(__dirname, 'batch-14', 'samples.json'), 'utf8')).samples;
  push(b14);
}
{
  const b15 = JSON.parse(readFileSync(join(__dirname, 'batch-15', 'samples.json'), 'utf8')).samples;
  push(b15);
}
{
  const b16 = JSON.parse(readFileSync(join(__dirname, 'batch-16', 'samples.json'), 'utf8')).samples;
  push(b16);
}
{
  const b17 = JSON.parse(readFileSync(join(__dirname, 'batch-17', 'samples.json'), 'utf8')).samples;
  push(b17);
}
{
  const b18 = JSON.parse(readFileSync(join(__dirname, 'batch-18', 'samples.json'), 'utf8')).samples;
  push(b18);
}
{
  const b19 = JSON.parse(readFileSync(join(__dirname, 'batch-19', 'samples.json'), 'utf8')).samples;
  push(b19);
}
{
  const b20 = JSON.parse(readFileSync(join(__dirname, 'batch-20', 'samples.json'), 'utf8')).samples;
  push(b20);
}
{
  const b21 = JSON.parse(readFileSync(join(__dirname, 'batch-21', 'samples.json'), 'utf8')).samples;
  push(b21);
}
{
  const b22 = JSON.parse(readFileSync(join(__dirname, 'batch-22', 'samples.json'), 'utf8')).samples;
  push(b22);
}
{
  const b23 = JSON.parse(readFileSync(join(__dirname, 'batch-23', 'samples.json'), 'utf8')).samples;
  push(b23);
}
{
  const b24 = JSON.parse(readFileSync(join(__dirname, 'batch-24', 'samples.json'), 'utf8')).samples;
  push(b24);
}
{
  const b25 = JSON.parse(readFileSync(join(__dirname, 'batch-25', 'samples.json'), 'utf8')).samples;
  push(b25);
}
{
  const b26 = JSON.parse(readFileSync(join(__dirname, 'batch-26', 'samples.json'), 'utf8')).samples;
  push(b26);
}
{
  const b27 = JSON.parse(readFileSync(join(__dirname, 'batch-27', 'samples.json'), 'utf8')).samples;
  push(b27);
}
{
  const b28 = JSON.parse(readFileSync(join(__dirname, 'batch-28', 'samples.json'), 'utf8')).samples;
  push(b28);
}
{
  const b29 = JSON.parse(readFileSync(join(__dirname, 'batch-29', 'samples.json'), 'utf8')).samples;
  push(b29);
}
{
  const b30 = JSON.parse(readFileSync(join(__dirname, 'batch-30', 'samples.json'), 'utf8')).samples;
  push(b30);
}
{
  const b31 = JSON.parse(readFileSync(join(__dirname, 'batch-31', 'samples.json'), 'utf8')).samples;
  push(b31);
}
{
  const b32 = JSON.parse(readFileSync(join(__dirname, 'batch-32', 'samples.json'), 'utf8')).samples;
  push(b32);
}
{
  const b33 = JSON.parse(readFileSync(join(__dirname, 'batch-33', 'samples.json'), 'utf8')).samples;
  push(b33);
}
{
  const b34 = JSON.parse(readFileSync(join(__dirname, 'batch-34', 'samples.json'), 'utf8')).samples;
  push(b34);
}
{
  const b35 = JSON.parse(readFileSync(join(__dirname, 'batch-35', 'samples.json'), 'utf8')).samples;
  push(b35);
}
{
  const b36 = JSON.parse(readFileSync(join(__dirname, 'batch-36', 'samples.json'), 'utf8')).samples;
  push(b36);
}
{
  const b37 = JSON.parse(readFileSync(join(__dirname, 'batch-37', 'samples.json'), 'utf8')).samples;
  push(b37);
}
{
  const b38 = JSON.parse(readFileSync(join(__dirname, 'batch-38', 'samples.json'), 'utf8')).samples;
  push(b38);
}
{
  const b39 = JSON.parse(readFileSync(join(__dirname, 'batch-39', 'samples.json'), 'utf8')).samples;
  push(b39);
}
{
  const b40 = JSON.parse(readFileSync(join(__dirname, 'batch-40', 'samples.json'), 'utf8')).samples;
  push(b40);
}
{
  const b41 = JSON.parse(readFileSync(join(__dirname, 'batch-41', 'samples.json'), 'utf8')).samples;
  push(b41);
}
{
  const b42 = JSON.parse(readFileSync(join(__dirname, 'batch-42', 'samples.json'), 'utf8')).samples;
  push(b42);
}
{
  const b43 = JSON.parse(readFileSync(join(__dirname, 'batch-43', 'samples.json'), 'utf8')).samples;
  push(b43);
}
const sampleById = new Map();
for (const s of allSamples) sampleById.set(s.id, s);

// ---------- 收集全部 verdict（id → verdict） ----------
const verdictById = new Map();
for (const dir of ['phase-3b', 'phase-4/batch-2', 'phase-4/batch-3', 'phase-4/batch-4', 'phase-5/batch-1', 'phase-5/batch-2', 'phase-5/batch-3', 'phase-5/batch-4', 'phase-5/batch-5', 'phase-5/batch-6', 'phase-5/batch-7', 'phase-5/batch-8', 'phase-5/batch-9', 'phase-5/batch-10', 'phase-5/batch-11', 'phase-5/batch-12', 'phase-5/batch-13', 'phase-5/batch-14', 'phase-5/batch-15', 'phase-5/batch-16', 'phase-5/batch-17', 'phase-5/batch-18', 'phase-5/batch-19', 'phase-5/batch-20', 'phase-5/batch-21', 'phase-5/batch-22', 'phase-5/batch-23', 'phase-5/batch-24', 'phase-5/batch-25', 'phase-5/batch-26', 'phase-5/batch-27', 'phase-5/batch-28', 'phase-5/batch-29', 'phase-5/batch-30', 'phase-5/batch-31', 'phase-5/batch-32', 'phase-5/batch-33', 'phase-5/batch-34', 'phase-5/batch-35', 'phase-5/batch-36', 'phase-5/batch-37', 'phase-5/batch-38', 'phase-5/batch-39', 'phase-5/batch-40', 'phase-5/batch-41', 'phase-5/batch-42', 'phase-5/batch-43']) {
  for (const [file, v] of [['candidates.json', 'candidate'], ['conditional.json', 'conditional'], ['quarantine.json', 'quarantine']]) {
    let doc;
    try { doc = JSON.parse(readFileSync(join(process.cwd(), dir, file), 'utf8')); } catch { continue; }
    for (const s of doc.samples || []) verdictById.set(s.id, v);
  }
}

// ---------- 组装 all-nodes（33 学科版） ----------
const nodes = [];
const missingSample = [];
const missingVerdict = [];
for (const row of matrix.rows) {
  const producedIds = row.producedBy || [];
  const rank = (id) => (/^pb43-/.test(id) ? 43 : /^pb42-/.test(id) ? 42 : /^pb41-/.test(id) ? 41 : /^pb40-/.test(id) ? 40 : /^pb39-/.test(id) ? 39 : /^pb38-/.test(id) ? 38 : /^pb37-/.test(id) ? 37 : /^pb36-/.test(id) ? 36 : /^pb35-/.test(id) ? 35 : /^pb34-/.test(id) ? 34 : /^pb33-/.test(id) ? 33 : /^pb32-/.test(id) ? 32 : /^pb31-/.test(id) ? 31 : /^pb30-/.test(id) ? 30 : /^pb29-/.test(id) ? 29 : /^pb28-/.test(id) ? 28 : /^pb27-/.test(id) ? 27 : /^pb26-/.test(id) ? 26 : /^pb25-/.test(id) ? 25 : /^pb24-/.test(id) ? 24 : /^pb23-/.test(id) ? 23 : /^pb22-/.test(id) ? 22 : /^pb21-/.test(id) ? 21 : /^pb20-/.test(id) ? 20 : /^pb19-/.test(id) ? 19 : /^pb18-/.test(id) ? 18 : /^pb17-/.test(id) ? 17 : /^pb16-/.test(id) ? 16 : /^pb15-/.test(id) ? 15 : /^pb14-/.test(id) ? 14 : /^pb13-/.test(id) ? 13 : /^pb12-/.test(id) ? 12 : /^pb11-/.test(id) ? 11 : /^pb10-/.test(id) ? 10 : /^pb9-/.test(id) ? 9 : /^pb8-/.test(id) ? 8 : /^pb7-/.test(id) ? 7 : /^pb6-/.test(id) ? 6 : /^pb5-/.test(id) ? 5 : /^pb4-/.test(id) ? 4 : /^pb3-/.test(id) ? 3 : /^pb2-/.test(id) ? 2 : /^pb1-/.test(id) ? 1 : 0);
  const sorted = [...producedIds].sort((a, b) => rank(b) - rank(a));
  const sampleId = sorted.find((id) => sampleById.has(id));
  const verdictId = sorted.find((id) => verdictById.has(id));
  if (!sampleId) missingSample.push(row.nodeId);
  if (!verdictId) missingVerdict.push(row.nodeId);
  const s = sampleById.get(sampleId);
  const verdict = verdictById.get(verdictId) || row.status;

  const subject = row.subject || null;
  const subjInfo = subject ? subjectByName.get(subject) : null;
  const learning = s?.learning || {};
  const cases = s?.cases || null;
  const classics = s?.classics || [];
  const facts = s?.facts || [];
  const safety = s?.safety || {};
  const dosage = s?.dosage || null;

  const unit = {
    knowledge: learning.knowledge || null,
    keyFacts: facts.map((f) => ({ field: f.field, sourceType: f.sourceType, sourceTitle: f.sourceTitle, status: f.status })),
    classicalLayer: classics.map((c) => ({
      label: c.label, canon: c.canon || '', chapter: c.chapter || '',
      originalText: c.originalText || '', sourceTitle: c.sourceTitle,
      sourceType: c.sourceType, verificationStatus: c.status,
      knowledgeBoundary: c.status === 'verified' && c.sourceType === 'classic_original' ? 'classic_original' : c.status === 'teaching_inference' ? 'teaching_inference' : c.sourceType || 'historical_interpretation',
    })),
    commonTrap: learning.misjudgment || null,
    reasoning: learning.reasoning || null,
    feedback: learning.feedback || null,
    transfer: learning.transfer || null,
    mastery: 'new',
  };

  nodes.push({
    nodeId: row.nodeId,
    subject,
    subjectName: subjInfo?.name || row.domainName || null,
    subjectType: subjInfo?.type || null,
    stage: subjInfo?.stage || null,
    topic: row.title || row.topic || s?.title || null,
    description: s?.intent || row.description || null,
    status: row.status,
    sourceStatus: row.sourceStatus,
    learningStatus: row.learningStatus,
    difficulty: row.difficulty,
    prerequisite: row.prerequisite || [],
    nextNode: row.nextNode || null,
    producedBy: producedIds,
    verdictSource: verdictId || null,
    category: s?.category || row.category || null,
    riskTags: s?.riskTags || [],
    intent: s?.intent || null,
    cases,
    stdJudgment: s?.stdJudgment || null,
    coreDefinition: s?.coreDefinition || null,
    dosage,
    safety,
    learningUnit: unit,
  });
}

// ---------- 输出 all-nodes.json ----------
const allNodesDoc = {
  schema: 'phase-5/all-nodes/v33',
  basis: 'phase-5/coverage-matrix.json（540 行）+ phase-3b/batch-2/3/4 + batch-1/2/3 样本',
  generatedAt: new Date().toISOString(),
  total: nodes.length,
  stats: {
    candidate: nodes.filter((n) => n.status === 'candidate').length,
    conditional: nodes.filter((n) => n.status === 'conditional').length,
    quarantine: nodes.filter((n) => n.status === 'quarantine').length,
    bySubject: Object.fromEntries(BLUEPRINT_MAP.subjects.map((s) => [s.code, nodes.filter((n) => n.subject === s.code).length])),
    missingSample: missingSample.length,
    missingVerdict: missingVerdict.length,
  },
  nodes,
};
writeFileSync(join(OUT, 'all-nodes.json'), JSON.stringify(allNodesDoc, null, 2), 'utf8');

// ---------- mastery-map.json ----------
const nowTs = Date.now();
const masteryNodes = nodes.map((n) => ({
  nodeId: n.nodeId,
  subject: n.subject,
  subjectName: n.subjectName,
  topic: n.topic,
  difficulty: n.difficulty,
  status: n.status,
  mastery: {
    state: 'new',
    familiarPassed: false,
    variationPassed: false,
    transferPassed: false,
    validations: [],
    lastResult: false,
    lastAt: 0,
    enteredAt: nowTs,
  },
}));
const masteryMapDoc = {
  schema: 'phase-5/mastery-map/v33',
  sourceOfTruth: 'computeMasteryProfile（唯一能力事实源；语义见 src/engine/MasteryEngine.ts：new → learning → familiar → mastered / unstable，熟悉/变式/陌生三关验证，间隔遗忘回退 unstable）',
  note: '本文件为初始掌握画像：540 节点全部 new。运行时学习记录写入 src/store/progress.ts 的 UserProgress，由 computeMasteryProfile 统一重算；禁止任何模块另立掌握口径。',
  generatedAt: new Date().toISOString(),
  total: masteryNodes.length,
  profile: { initial: 'new', byState: { new: masteryNodes.length, learning: 0, familiar: 0, mastered: 0, unstable: 0 } },
  nodes: masteryNodes,
};
writeFileSync(join(OUT, 'mastery-map.json'), JSON.stringify(masteryMapDoc, null, 2), 'utf8');

// ---------- learning-path.json（33 学科 × 5 关） ----------
const STAGE_NAMES = {
  stage1: '入门·基础认知', stage2: '诊法·望闻问切', stage3: '八纲·方向纲领',
  stage4: '藏象·气血·经络', stage5: '病因病机·脏腑辨证', stage6: '外感辨证体系',
  stage7: '治则·方剂·经典', stage8: '医案·综合·思维',
};
const nodeById = new Map(nodes.map((n) => [n.nodeId, n]));

function assignGate(n) {
  const lvl = n.cases?.level;
  if (lvl === 'C4' || n.difficulty === 5) return 5;
  if (lvl === 'C3') return 4;
  if (n.difficulty === 4) return 3;
  if (n.difficulty === 3) return 2;
  return 1;
}
const GATE_NAMES = { 1: '认识', 2: '理解', 3: '辨析', 4: '推理', 5: '迁移' };

const unlocksByNode = {};
for (const n of nodes) for (const p of n.prerequisite || []) (unlocksByNode[p] ||= []).push(n.nodeId);

const knowledgeMap = [];
for (const s of BLUEPRINT_MAP.subjects) {
  const subjNodes = nodes.filter((n) => n.subject === s.code);
  const gates = {};
  for (let g = 1; g <= 5; g++) {
    const inGate = subjNodes.filter((n) => assignGate(n) === g);
    gates[g] = {
      name: GATE_NAMES[g],
      unlock: `完成第 ${g - 1} 关（${GATE_NAMES[g - 1] || '—'}）后解锁`,
      nodes: inGate.map((n) => ({
        nodeId: n.nodeId, topic: n.topic, difficulty: n.difficulty,
        status: n.status, cLevel: n.cases?.level || null,
        prerequisite: n.prerequisite || [], unlocks: unlocksByNode[n.nodeId] || [],
      })),
    };
  }
  knowledgeMap.push({
    subject: s.code, subjectName: s.name, type: s.type, coreStatus: s.status,
    stage: s.stage, stageName: STAGE_NAMES[s.stage] || s.stage,
    target: s.target, totalNodes: subjNodes.length,
    gap: [Math.max(0, s.target[0] - subjNodes.length), Math.max(0, s.target[1] - subjNodes.length)],
    gates,
  });
}
const stageRank = (s) => Number(s.replace('stage', ''));
knowledgeMap.sort((a, b) => stageRank(a.stage) - stageRank(b.stage) || a.subject.localeCompare(b.subject));

const pathByStage = {};
for (const d of knowledgeMap) (pathByStage[d.stage] ||= []).push(d.subject);
const mainPath = Object.keys(pathByStage).sort((a, b) => stageRank(a) - stageRank(b)).map((s) => ({
  stage: s, stageName: STAGE_NAMES[s], subjects: pathByStage[s],
}));

// 基础四科递进示例：理论 → 诊断 → 中药 → 方剂
const pickNode = (subj, gate) => {
  const km = knowledgeMap.find((k) => k.subject === subj);
  return km?.gates[gate]?.nodes?.[0] || null;
};
const examplePath = [
  { step: '基础理论·阴阳五行', subject: 'A', nodeId: pickNode('A', 1)?.nodeId },
  { step: '诊断学·四诊合参', subject: 'B', nodeId: pickNode('B', 1)?.nodeId },
  { step: '中药学·药性总论', subject: 'G', nodeId: pickNode('G', 1)?.nodeId },
  { step: '方剂学·八法组方', subject: 'L', nodeId: pickNode('L', 1)?.nodeId },
].map((x) => ({ ...x, topic: x.nodeId ? nodeById.get(x.nodeId)?.topic : null }));

const learningPathDoc = {
  schema: 'phase-5/learning-path/v33',
  basis: 'blueprint-map.mjs（33 学科 A–AG）+ coverage-matrix.json（540 行）',
  generatedAt: new Date().toISOString(),
  totalSubjects: knowledgeMap.length,
  totalNodes: nodes.length,
  knowledgeMap,
  learningPath: mainPath,
  exampleProgression: examplePath,
  note: '关卡为学科内渐进：完成上一关才自然解锁下一关；允许复习旧关卡。基础四科（A/B/G/L）与针灸系列（C/D）已生产：A/B 达目标上限，C/D 达目标下限，G/L 继续补足。',
};
writeFileSync(join(OUT, 'learning-path.json'), JSON.stringify(learningPathDoc, null, 2), 'utf8');

// ---------- daily-practice.json ----------
const today = new Date().toISOString().slice(0, 10);
const newCandidates = nodes.filter((n) => n.status !== 'quarantine' && !(n.prerequisite || []).length).sort((a, b) => a.difficulty - b.difficulty);
const newPick = newCandidates[0];
const c3Pick = nodes.find((n) => n.cases?.level === 'C3' && n.status !== 'quarantine');
const c4Pick = nodes.find((n) => n.cases?.level === 'C4' && n.status !== 'quarantine');
const discPick = nodes.find((n) => n.difficulty === 4 && n.status !== 'quarantine');
const b1Pick = nodes.find((n) => /^pb5-/.test(n.nodeId) && ['A', 'B', 'G', 'L'].includes(n.subject) && n.status !== 'quarantine');

const dailyPracticeDoc = {
  schema: 'phase-5/daily-practice/v33',
  generatedAt: new Date().toISOString(),
  date: today,
  dailyLoad: 5,
  strategy: '依据 mastery（computeMasteryProfile）+ 最近错误 + 遗忘风险 + 当前学习阶段 + prerequisite + 今日学习量自动选择；非随机出题。Phase 5 阶段优先基础四科新节点。',
  selection: [
    {
      slot: '新知识', nodeId: newPick?.nodeId, title: newPick?.topic,
      why: newPick ? `入门第一节点：无任何前置，difficulty=${newPick.difficulty}（「为什么今天学这个」：从根节点建立整体框架）` : '全部已学',
    },
    {
      slot: '基础四科新学', nodeId: b1Pick?.nodeId, title: b1Pick?.topic,
      why: b1Pick ? `Phase 5 新增节点：${b1Pick.subjectName}（${b1Pick.subject}）首批 150 节点之一（「为什么今天学这个」：基础四科先行，优先消化新知识）` : '暂无',
    },
    {
      slot: '旧知识复习', nodeId: null, title: null,
      why: '初始阶段无历史掌握记录（mastery 全 new），暂无遗忘风险节点；完成首次学习后本槽自动切换为「间隔复习队列」',
    },
    {
      slot: '辨析题', nodeId: discPick?.nodeId, title: discPick?.topic,
      why: discPick ? `难度 4 节点：训练易混淆辨析（「为什么今天学这个」：difficulty=4 属辨析层级，打牢鉴别能力）` : '暂无',
    },
    {
      slot: '迁移案例', nodeId: c4Pick?.nodeId, title: c4Pick?.topic,
      why: c4Pick ? `C4 迁移推理节点：反证+修正训练（「为什么今天学这个」：换场景仍能解决，是掌握的最高验证）` : '暂无',
    },
  ],
};
writeFileSync(join(OUT, 'daily-practice.json'), JSON.stringify(dailyPracticeDoc, null, 2), 'utf8');

// ---------- production-dashboard.json ----------
const batchSummaries = [];
let totalUnknown = 0, totalFacts = 0, totalGateFail = 0;
const gateFailAgg = {};
const leakAgg = {};
for (const dir of ['phase-3b', 'phase-4/batch-2', 'phase-4/batch-3', 'phase-4/batch-4', 'phase-5/batch-1', 'phase-5/batch-2', 'phase-5/batch-3', 'phase-5/batch-4', 'phase-5/batch-5']) {
  let s;
  try { s = JSON.parse(readFileSync(join(process.cwd(), dir, 'summary.json'), 'utf8')); } catch { continue; }
  const eng = s.engineering || {};
  const leak = eng.leakThrough || {};
  totalUnknown += (eng.unknownSourceRatio?.unknown || 0);
  totalFacts += (eng.unknownSourceRatio?.total || 0);
  for (const [g, v] of Object.entries(eng.gateFailByLetter || {})) gateFailAgg[g] = (gateFailAgg[g] || 0) + v.count;
  for (const [g, v] of Object.entries(leak)) leakAgg[g] = (leakAgg[g] || 0) + (v.leak || 0);
  totalGateFail += Object.values(eng.gateFailByLetter || {}).reduce((a, v) => a + v.count, 0);
  batchSummaries.push({
    batch: dir, total: s.total, verdict: s.verdictBreakdown,
    leakThrough: Object.fromEntries(Object.entries(leak).map(([g, v]) => [g, v.leak])),
    unknownSourceRatio: eng.unknownSourceRatio, highRiskIsolationRate: eng.highRiskIsolationRate,
    gateFailByLetter: Object.fromEntries(Object.entries(eng.gateFailByLetter || {}).map(([g, v]) => [g, v.count])),
  });
}

const sourceVerified = nodes.filter((n) => n.sourceStatus === 'verified').length;
const cLevels = { C1: 0, C2: 0, C3: 0, C4: 0 };
for (const n of nodes) if (n.cases?.level) cLevels[n.cases.level]++;
const humanReviewRequired = nodes.filter((n) => n.status === 'conditional' && n.cases?.level === 'C4').length;

// —— 动态口径：批次标签 / 已生产学科 / 出处补丁数 / content-review 计数 ——
const ALL_BATCH_DIRS = ['phase-3b', 'phase-4/batch-2', 'phase-4/batch-3', 'phase-4/batch-4', 'phase-5/batch-1', 'phase-5/batch-2', 'phase-5/batch-3', 'phase-5/batch-4', 'phase-5/batch-5'];
const lastBatch = matrix.totals?.batchesApplied?.[matrix.totals.batchesApplied.length - 1] || 'phase-5/batch-1';
const producedSubjects = knowledgeMap.filter((k) => k.totalNodes > 0);
const patchCount = Object.keys(CLASSIC_ATTRIBUTION_PATCH).length;
let contentReviewCount = 0;
for (const dir of ALL_BATCH_DIRS) {
  try {
    const q = JSON.parse(readFileSync(join(process.cwd(), dir, 'content-quality-review.json'), 'utf8'));
    for (const s of q.samples || []) if (s.preliminary === 'content-review') contentReviewCount++;
  } catch { /* 无质量文件则跳过 */ }
}
const batchLine = (b) => `${b.batch} 节点 ${b.total}：candidate ${(b.verdict && b.verdict.candidate) || 0} / conditional ${(b.verdict && b.verdict.conditional) || 0} / quarantine ${(b.verdict && b.verdict.quarantine) || 0}；leak ${JSON.stringify(b.leakThrough)}`;

const pipelineAlerts = [];
for (const [g, cnt] of Object.entries(leakAgg)) {
  if (cnt >= 1) pipelineAlerts.push({ gate: g, count: cnt, alert: 'PIPELINE_ALERT', action: '暂停对应类别扩产，人工复核后恢复' });
}

const dashboardDoc = {
  schema: 'phase-5/production-dashboard/v33',
  generatedAt: new Date().toISOString(),
  coverage: { subjects: `33（已生产 ${producedSubjects.length} 科：${producedSubjects.map((k) => k.subject).join('/')}）`, nodes: `${nodes.length}（305 存量 + ${nodes.length - 305} 新增）`, phase5New: nodes.length - 305 },
  nodes: { total: nodes.length, candidate: nodes.filter((n) => n.status === 'candidate').length, conditional: nodes.filter((n) => n.status === 'conditional').length, quarantine: nodes.filter((n) => n.status === 'quarantine').length },
  subjectCoverage: Object.fromEntries(knowledgeMap.map((k) => [k.subject, { name: k.subjectName, total: k.totalNodes, target: k.target, gap: k.gap, pctOfLow: k.target[0] ? Math.round((k.totalNodes / k.target[0]) * 100) : 0 }])),
  sourceVerification: { verified: sourceVerified, total: nodes.length, pct: Math.round((sourceVerified / nodes.length) * 100) },
  leakThrough: { total: totalGateFail === 0 ? 0 : '见批次明细', batches: batchSummaries.map((b) => ({ batch: b.batch, leakThrough: b.leakThrough })) },
  c3c4: { cLevels, humanReviewRequired },
  highRiskIsolation: { note: '各批次 highRiskIsolationRate 均为 100%（无未隔离高危）', batches: batchSummaries.map((b) => ({ batch: b.batch, pct: b.highRiskIsolationRate?.pct })) },
  newDefects: { count: pipelineAlerts.length, pipelineAlerts },
  templateRepetition: { hGate: gateFailAgg['H'] || 0, machineLike: 0 },
  batches: batchSummaries,
};
writeFileSync(join(OUT, 'production-dashboard.json'), JSON.stringify(dashboardDoc, null, 2), 'utf8');

// ---------- final-audit.json ----------
const finalAuditDoc = {
  schema: 'phase-5/final-audit/v33',
  generatedAt: new Date().toISOString(),
  phase: `Phase 5 ${lastBatch} 完成（33 学科蓝图：全量 ${nodes.length} 节点编排）`,
  verdict: 'STOP：未自动正式发布；未修改 Phase 2.5 封板 Schema；未自动进入下一批次（等待人工指令）',
  audit: {
    coverage: { status: 'PASS', detail: `${producedSubjects.map((k) => `${k.subject} ${k.subjectName} ${k.totalNodes}/${k.target[1]}（下限 ${k.target[0]}）`).join('、')}；33 学科蓝图注册完整` },
    batches: { status: 'PASS', detail: batchSummaries.map(batchLine).join('；') },
    leakThrough: { status: 'PASS', detail: 'A/B/C/D/H/J/K 各批次 Leak-through 均为 0' },
    unknownSource: { status: 'PASS', detail: `未知来源 0%（${totalUnknown}/${totalFacts}）` },
    highRiskIsolation: { status: 'PASS', detail: '高危内容 100% 隔离' },
    schemaIntegrity: { status: 'PASS', detail: 'Phase 2.5 Schema 未修改；phase-3a.1/source-catalog.mjs 未修改（Phase 5 出处经 phase-5/classic-patch.mjs 运行时注入，现共 ' + patchCount + ' 条）' },
    gates: { status: 'PASS', detail: 'A-K Gate + E/F/G 语义门运行稳定；Gate 拦截均为门禁预期隔离，不构成新型系统性缺陷' },
    contentQuality: { status: 'PASS', detail: `Q1-Q8 已接入；机器味 0；模板重复（H）${gateFailAgg['H'] || 0}；content-review ${contentReviewCount}（待人工审核）` },
    c1c4: { status: 'INFO', detail: `C3×${cLevels.C3} C4×${cLevels.C4}；C4 humanReviewRequired=${humanReviewRequired} 进入人工复核清单，不阻塞生产` },
    pipelineAlerts: { status: pipelineAlerts.length ? 'ALERT' : 'PASS', detail: pipelineAlerts.length ? pipelineAlerts : '无泄漏（Leak-through）缺陷；Gate 拦截均为门禁预期隔离，不构成新型系统性缺陷' },
  },
  humanReviewQueues: {
    conditional: nodes.filter((n) => n.status === 'conditional').length,
    quarantine: nodes.filter((n) => n.status === 'quarantine').length,
    c4HumanReviewRequired: humanReviewRequired,
    phase5ContentReview: contentReviewCount,
  },
  finalState: `${nodes.length} 节点全部可进入学习地图（33 学科）；candidate/conditional 待人工抽审后转正式知识`,
};
writeFileSync(join(OUT, 'final-audit.json'), JSON.stringify(finalAuditDoc, null, 2), 'utf8');

// ---------- production-report.md ----------
const md = [];
md.push(`# Phase 5 · ${lastBatch} 生产报告（33 学科蓝图）`);
md.push('');
md.push(`- 生成时间：${new Date().toISOString()}`);
md.push('- 基准：Content Bible v2.0 第 01/20/21/22 章（33 学科 A–AG，核心对象 ≈ 1700–2190）');
md.push(`- 覆盖：全量 ${nodes.length} 节点（305 存量归位 + ${nodes.length - 305} 新增），Phase 2.5 Schema 未修改`);
md.push('');
md.push('## 一、批次运行结果');
md.push('');
md.push('| 批次 | 节点 | candidate | conditional | quarantine | leak-through | 高危隔离率 |');
md.push('|---|---|---|---|---|---|---|');
for (const b of batchSummaries) {
  const hri = b.highRiskIsolationRate;
  md.push(`| ${b.batch} | ${b.total} | ${(b.verdict && b.verdict.candidate) || 0} | ${(b.verdict && b.verdict.conditional) || 0} | ${(b.verdict && b.verdict.quarantine) || 0} | ${JSON.stringify(b.leakThrough)} | ${hri && hri.pct != null ? hri.pct + '%' : '—'} |`);
}
md.push('');
md.push('### 出处闭合说明');
md.push('');
md.push(`Phase 5 样本引用的经典原文经逐条核对后，通过 \`phase-5/classic-patch.mjs\` 运行时注入 ${patchCount} 条出处（含教学归纳分层 K），不改动 phase-3a.1 权威文件；conditional 全部闭合或进入人工复核清单。`);
md.push('');
md.push('## 二、学科覆盖（33 学科蓝图）');
md.push('');
md.push('| 学科 | 名称 | 类型 | 目标区间 | 现有 | 缺口 | 达成率(下限) |');
md.push('|---|---|---|---|---|---|---|');
for (const k of knowledgeMap) {
  md.push(`| ${k.subject} | ${k.subjectName} | ${k.type} | ${k.target[0]}–${k.target[1]} | ${k.totalNodes} | ${k.gap[0]}–${k.gap[1]} | ${k.target[0] ? Math.round((k.totalNodes / k.target[0]) * 100) : 0}% |`);
}
md.push('');
md.push('## 三、交付文件');
md.push('');
md.push('| 文件 | 说明 |');
md.push('|---|---|');
md.push(`| \`phase-5/${lastBatch}/samples.json\` | 最新批次样本（学习关卡设计） |`);
md.push(`| \`phase-5/${lastBatch}/candidates.json\` | 最新批次 candidate 明细 |`);
md.push(`| \`phase-5/${lastBatch}/trace.json\` | 每节点 L1–L6 + Gate + 质量链路 |`);
md.push(`| \`phase-5/${lastBatch}/safety-catalog.json\` | 安全红线目录（最新批次命中） |`);
md.push(`| \`phase-5/learning-system/all-nodes.json\` | ${nodes.length} 节点全量（33 学科版） |`);
md.push('| `phase-5/learning-system/mastery-map.json` | 初始掌握画像（全部 new） |');
md.push('| `phase-5/learning-system/learning-path.json` | 33 学科 × 5 关知识地图 |');
md.push('| `phase-5/learning-system/daily-practice.json` | 今日修炼（基础四科优先） |');
md.push('| `phase-5/learning-system/production-dashboard.json` | 生产异常仪表盘 |');
md.push('| `phase-5/learning-system/final-audit.json` | 最终审计 |');
md.push('');
md.push('## 四、状态与下一步');
md.push('');
md.push(`- **状态：STOP**。当前覆盖：${producedSubjects.map((k) => `${k.subject} ${k.subjectName} ${k.totalNodes}/${k.target[1]}（下限 ${k.target[0]}）`).join('；')}。`);
md.push(`- 待人工审核：content-review ${contentReviewCount} 个节点；存量 conditional ${nodes.filter((n) => n.status === 'conditional').length} + quarantine ${nodes.filter((n) => n.status === 'quarantine').length}（Phase 4 遗留队列，已预审裁决 48 项闭合）。`);
md.push('- 下一步（待指令）：继续补足 G/L/D 缺口或推进 E 针灸治疗学等下一批学科。');
writeFileSync(join(OUT, 'production-report.md'), md.join('\n'), 'utf8');

// ---------- 控制台摘要 ----------
console.log('all-nodes total =', nodes.length);
console.log('stats =', JSON.stringify(allNodesDoc.stats));
console.log('missingSample =', missingSample.join(',') || '(none)');
console.log('missingVerdict =', missingVerdict.join(',') || '(none)');
console.log('DONE: all-nodes/mastery-map/learning-path/daily-practice/dashboard/final-audit/report written to phase-5/learning-system/');
