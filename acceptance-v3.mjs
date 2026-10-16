// ============================================================
// 🌿 杏林修炼场 V3 — 验收测试
// 检查 8 境体系、数据模型、Agent 升级、新页面
// 运行：node acceptance-v3.mjs
// ============================================================
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, 'src');
let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${msg}`);
  } else {
    failed++;
    console.error(`  ❌ ${msg}`);
  }
}

function fileExists(path) {
  return existsSync(resolve(SRC, path));
}

function fileContains(path, substr) {
  try {
    const content = readFileSync(resolve(SRC, path), 'utf-8');
    return content.includes(substr);
  } catch { return false; }
}

console.log('\n📋 杏林修炼场 V3 验收测试');
console.log('=' .repeat(50));

// ============================================================
// 1. 数据模型检查
// ============================================================
console.log('\n## 1️⃣ 数据模型 (models.ts)');

const models = readFileSync(resolve(SRC, 'types/models.ts'), 'utf-8');
assert(models.includes('interface LearningStage'), 'LearningStage 接口存在');
assert(models.includes('interface LearningModule'), 'LearningModule 接口存在');
assert(models.includes('interface KnowledgeNodeV3Fields'), 'KnowledgeNodeV3Fields 接口存在');
assert(models.includes('interface StageProgress'), 'StageProgress 接口存在');
assert(models.includes('schemaVersion: number'), 'UserProgress 有 schemaVersion 字段');
assert(models.includes('currentStageId'), 'UserProgress 有 currentStageId 字段');
assert(models.includes('stageProgress'), 'UserProgress 有 stageProgress 字段');
assert(models.includes("export type StageState = 'locked'"), 'StageState 类型存在');
assert(models.includes('ABILITY_LABELS'), 'ABILITY_LABELS 存在');
assert(models.includes('CULTIVATION_REALMS'), 'CULTIVATION_REALMS 存在');
assert(models.includes('level: 1 | 2 | 3 | 4 | 5 | 6'), 'KnowledgeNodeV3Fields.level 为 1-6');

// ============================================================
// 2. 8 境文件检查
// ============================================================
console.log('\n## 2️⃣ 8 境数据文件 (stages/)');

for (let i = 1; i <= 8; i++) {
  const p = `data/stages/stage${i}.ts`;
  assert(fileExists(p), `stage${i}.ts 存在`);
  assert(fileContains(p, 'export const stageDef'), `stage${i}.ts 导出 stageDef`);
  assert(fileContains(p, 'export const modules'), `stage${i}.ts 导出 modules`);
  assert(fileContains(p, 'export const nodes'), `stage${i}.ts 导出 nodes`);
}

assert(fileExists('data/stages/index.ts'), 'stages/index.ts 存在');
assert(fileContains('data/stages/index.ts', 'ALL_V3_NODES'), 'stages/index.ts 导出 ALL_V3_NODES');
assert(fileContains('data/stages/index.ts', 'STAGES'), 'stages/index.ts 导出 STAGES');
assert(fileContains('data/stages/index.ts', 'ALL_MODULES'), 'stages/index.ts 导出 ALL_MODULES');
assert(fileContains('data/stages/index.ts', 'stageById('), 'stages/index.ts 有 stageById 函数');
assert(fileContains('data/stages/index.ts', 'prereqNodes('), 'stages/index.ts 有 prereqNodes 函数');

// ============================================================
// 3. 节点数量检查
// ============================================================
console.log('\n## 3️⃣ V3 内容节点检查');

// 读取所有 stage 文件统计节点数量
let totalV3Nodes = 0;
for (let i = 1; i <= 8; i++) {
  const content = readFileSync(resolve(SRC, `data/stages/stage${i}.ts`), 'utf-8');
  // 统计每个节点的 quiz 数量（每个节点都有 quiz）
  const quizCount = (content.match(/quiz:\s*\{/g) || []).length;
  totalV3Nodes += quizCount;
  console.log(`  境界 ${i}: ${quizCount} 个节点`);
}
assert(totalV3Nodes >= 80, `V3 节点总数 >= 80（实际：${totalV3Nodes}）`);
assert(totalV3Nodes <= 120, `V3 节点总数 <= 120（实际：${totalV3Nodes}）`);

// ============================================================
// 4. 数据迁移检查
// ============================================================
console.log('\n## 4️⃣ 数据迁移 (progress.ts)');

const progress = readFileSync(resolve(SRC, 'store/progress.ts'), 'utf-8');
assert(progress.includes('STORAGE_KEY ='), 'progress.ts 有 STORAGE_KEY');
assert(progress.includes('xinglin-progress-v3'), 'STORAGE_KEY 升级为 v3');
assert(progress.includes('OLD_STORAGE_KEY'), 'progress.ts 有旧键引用');
assert(progress.includes('schemaVersion: 3'), 'defaultProgress schemaVersion 为 3');
assert(progress.includes('currentStageId'), 'defaultProgress 有 currentStageId');
assert(progress.includes('stageProgress'), 'defaultProgress 有 stageProgress');
assert(progress.includes('migrateV2Data'), 'progress.ts 有 V2→V3 迁移函数');
assert(progress.includes('initStageProgress'), 'progress.ts 有 initStageProgress 函数');
assert(progress.includes('import { STAGES, ALL_V3_NODES }'), 'progress.ts 导入 stages');

// ============================================================
// 5. Agent 升级检查
// ============================================================
console.log('\n## 5️⃣ Agent 决策升级 (ReviewCoach.ts)');

const coach = readFileSync(resolve(SRC, 'engine/ReviewCoach.ts'), 'utf-8');
assert(coach.includes("import { STAGES, ALL_V3_NODES, stageById, nodesOfStage, modulesOfStage, v3NodeById }"), 'ReviewCoach 导入 V3 模块');
assert(coach.includes('currentStage('), 'ReviewCoach 有 currentStage 辅助函数');
assert(coach.includes('pendingStageNodes('), 'ReviewCoach 有 pendingStageNodes 函数');
assert(coach.includes('recommendableStageNodes('), 'ReviewCoach 有 recommendableStageNodes 函数');
assert(coach.includes('cultivationRealm('), 'ReviewCoach 有 cultivationRealm 函数');
assert(coach.includes('p.currentStageId'), 'ReviewCoach 使用了 currentStageId');
assert(coach.includes('当前境界'), 'Recommend 包含境界感知推荐理由');

// ============================================================
// 6. 新页面检查
// ============================================================
console.log('\n## 6️⃣ /journey 修炼之路页面');

assert(fileExists('pages/JourneyPage.tsx'), 'JourneyPage.tsx 存在');
const journey = readFileSync(resolve(SRC, 'pages/JourneyPage.tsx'), 'utf-8');
assert(journey.includes('我的修炼之路'), 'JourneyPage 包含标题"我的修炼之路"');
assert(journey.includes('八境'), 'JourneyPage 提及"八境"');
assert(journey.includes('journey-node'), 'JourneyPage 使用 journey CSS 类');
assert(journey.includes('STAGES'), 'JourneyPage 遍历 STAGES');
assert(journey.includes('modulesOfStage'), 'JourneyPage 使用 modulesOfStage');

const app = readFileSync(resolve(SRC, 'App.tsx'), 'utf-8');
assert(app.includes('/journey'), 'App.tsx 注册 /journey 路由');
assert(app.includes('JourneyPage'), 'App.tsx 导入 JourneyPage');

const layout = readFileSync(resolve(SRC, 'components/Layout.tsx'), 'utf-8');
assert(layout.includes('/journey'), 'Layout.tsx 包含 /journey 导航');

// ============================================================
// 7. 构建验证
// ============================================================
console.log('\n## 7️⃣ 构建验证');
assert(fileExists('../dist/index.html'), '构建产物 index.html 存在');
assert(fileExists('../dist/assets'), '构建产物 assets 目录存在');

// ============================================================
// 汇总
// ============================================================
console.log('\n' + '=' .repeat(50));
console.log(`📊 V3 验收结果：${passed} 通过, ${failed} 失败`);
if (failed === 0) {
  console.log('🎉 全部 V3 验收测试通过！');
} else {
  console.error(`❌ 有 ${failed} 项未通过，请检查以上失败项。`);
}
process.exit(failed > 0 ? 1 : 0);