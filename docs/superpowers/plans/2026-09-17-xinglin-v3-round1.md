# 杏林修炼场 V3 Round1 实施计划

> **For agentic workers:** 本计划覆盖 Round 1 全部工作：数据模型扩展 → 8 境定义 → 100+ 内容 → /journey 页面 → 数据迁移 → Agent 决策升级 → 测试

**目标:** 建立 "从小白到高阶" 的完整学习道路体系

**架构:** 在 V2 架构上扩展，不重写 Engine，不改坏 V2 掌握/复习/错因逻辑。新增 V3 类型使用独立 namespace 避免冲突。

**Tech Stack:** React + Vite + TypeScript + 本地数据 + localStorage + 纯前端

---

### Task 1: 扩展数据模型 (models.ts)

**Files:**
- Modify: `src/types/models.ts`

在文件末尾追加 V3 类型，不修改现有类型定义：

- `LearningStage` — 8 境（id, title, subtitle, description, level, prerequisites, nodes, unlockCondition, masteryCondition, order）
- `LearningModule` — 30+ 模块（id, title, stageId, description, nodes[], prereqs[]）
- `KnowledgeNodeV3Fields` — V3 额外字段（level, stage, module, prerequisites, relatedNodes, parentNodeId, childrenIds, coreConcept, whyItMatters, beginnerExplanation, deeperExplanation, observations, commonMistakes, misconceptions, classicReferences, formulaReferences, masteryRequirements）
- `StageProgress` — 用户每一境的进度（stageId, state, startedAt, completedAt, nodeProgress）
- `UserProgress` 增加 `schemaVersion: number`, `currentStageId`, `stageProgress: Record<string, StageProgress>`
- `AbilityDimension` — 能力雷达 8 维（observation, inquiry, induction, syndrome, counterEvidence, transfer, explanation, longTermMemory）
- `CultivationRealm` — 修炼等级（9 级从初学者到杏林试炼者）

### Task 2: 建立 8 境界定义

**Files:**
- Create: `src/data/stages/index.ts` — 8 境完整定义 + 模块映射
- Create: `src/data/stages/stage1.ts` — 第一境：初识中医 (12 节点)
- Create: `src/data/stages/stage2.ts` — 第二境：学会观察 (14 节点)
- Create: `src/data/stages/stage3.ts` — 第三境：八纲辨证 (16 节点)
- Create: `src/data/stages/stage4.ts` — 第四境：脏腑气血 (18 节点)
- Create: `src/data/stages/stage5.ts` — 第五境：病机推理 (12 节点)
- Create: `src/data/stages/stage6.ts` — 第六境：进阶辨证 (12 节点)
- Create: `src/data/stages/stage7.ts` — 第七境：方剂经典 (10 节点)
- Create: `src/data/stages/stage8.ts` — 第八境：综合试炼 (6+ 节点)

每个文件导出：
- `stageDef: LearningStage`
- `modules: LearningModule[]`
- `nodes: KnowledgeNode[]` (含 V3 扩展字段)
- 每个节点保证：一句话理解 + 为什么 + 深入理解 + 案例练习 + 变化案例 + 陌生迁移

### Task 3: 数据迁移

**Files:**
- Modify: `src/store/progress.ts`

- 新增 `SCHEMA_VERSION = 3`
- `load()` 中检测 `schemaVersion`，若缺失或 < 3 执行迁移
- V2 → V3 迁移：添加 `schemaVersion: 3`, `currentStageId: 'stage1'`, `stageProgress: {}`
- `ensureDailyToday()` 中注入境界感知
- 导出 `currentStage()` / `stageOfProgress()` 等工具函数

### Task 4: Agent 决策升级

**Files:**
- Modify: `src/engine/ReviewCoach.ts`
- Modify: `src/data/index.ts` (导出 stage 数据)

- 新增 `stageAwareRecommend(progress, stages)` — 综合境界+前置+错因+复习+迁移
- 推荐逻辑增加 stage filter：只推荐当前/前一境的知识
- 新增 `nextStageAction(progress)` — 返回 "距离下一境还差什么"
- 首页冷启动显示当前境界

### Task 5: /journey 修炼之路页面

**Files:**
- Create: `src/pages/JourneyPage.tsx`
- Modify: `src/App.tsx` (注册 `/journey` 路由)
- Modify: `src/components/Layout.tsx` (导航增加"修炼之路"入口)
- Modify: `src/index.css` (新增 JourneyPage 样式)

JourneyPage 结构：
- 顶部：当前境界展示 + 修炼等级标签
- 中间：8 境时间线（已完成/当前/锁定）
- 点击每一境：弹出详情（目标/知识地图/已掌握/不稳定/待学习/解锁条件）
- 底部："下一步修炼建议"（Agent 生成）

### Task 6: 测试

**Files:**
- Create: `acceptance-v3.test.mjs`

V3 验收测试，用可注入 Clock 覆盖：
1. 8 个境界存在且元数据完整
2. 前置关系正确
3. 新用户冷启动从第一境开始
4. 数据迁移 (V2 → V3)
5. StageProgress 更新逻辑
6. JourneyPage 渲染
7. 兼容性：V2 既有测试全部保持
8. TypeScript 0 errors
9. production build 成功