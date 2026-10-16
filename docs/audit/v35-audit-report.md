# 91个知识节点课程质量审计报告

> 杏林修炼场 V3.5 Phase 0 审计结果
> 审计日期：2026-09-17
> 审计范围：src/data/stages/（91个V3节点）+ src/data/knowledge/（30个V2节点）

---

## 一、数据资产总览

### 1.1 节点总量

| 类型 | 数量 | 说明 |
|------|------|------|
| V3 阶段节点 | 91 | stage1~8，含完整 v3 字段 |
| V2 知识节点 | 30 | yinYang ~ diagnosis + formula + classic |
| **知识节点总计** | **121** | |
| 病例 | 12 | 难度 1~5 分级 |
| 观察任务 | 20 | 8 个维度 |
| 方剂 | 8 | 含君臣佐使分析 |
| 经典片段 | 15 | 《黄帝内经》《伤寒论》《金匮要略》 |
| 反直觉挑战 | 10 | |
| 迁移场景 | 48 | 24 个节点各含 2 个变式/迁移场景 |

### 1.2 V3 节点按境界分布

| 境界 | 节点数 | 模块数 | 内容主题 |
|------|:------:|:------:|----------|
| stage1 初识中医 | 10 | 3 | 中医定义、整体观念、辨证论治、阴阳基础 |
| stage2 学会观察 | 12 | 3 | 四诊基础、十大观察维度、舌脉基础 |
| stage3 八纲辨证 | 12 | 4 | 表里、寒热、虚实、阴阳为纲 |
| stage4 脏腑气血 | 17 | 5 | 气、血、津液、五脏、六腑 |
| stage5 病机推理 | 12 | 4 | 病因病机、气机升降、寒热虚实变化、辨证推理方法 |
| stage6 进阶辨证 | 12 | 4 | 六经辨证、卫气营血、三焦辨证、综合对比 |
| stage7 方剂经典 | 10 | 4 | 治则治法、方剂思维、经方思维、经典学习 |
| stage8 综合试炼 | 6 | 2 | 八步推理实践、综合能力评估 |
| **合计** | **91** | **24** | |

---

## 二、审计维度与评级标准

### 2.1 审计维度说明

每个节点按照 15 项维度审计（对应 V3.5 需求文档中的①~⑮）：

| 编号 | 维度 | 说明 |
|:----:|------|------|
| ① | 小白理解 | 零基础能否看懂（检查 beginnerExplanation） |
| ② | 核心概念 | 掌握目标是否清晰（检查 coreConcept） |
| ③ | 前置知识 | prerequisites 是否完整 |
| ④ | 深度解释 | deeperExplanation 是否存在真正理论解释 |
| ⑤ | 常见误区 | commonMistakes 是否覆盖关键错误 |
| ⑥ | 易混概念 | misconceptions 是否包含分辨训练 |
| ⑦ | 观察训练 | observations 是否可操作 |
| ⑧ | 基础案例 | quiz 案例是否熟悉易懂 |
| ⑨ | 变化案例 | why.example 是否涉及条件变化 |
| ⑩ | 陌生迁移 | transferScenes 是否存在 |
| ⑪ | 反直觉 | paradoxIds 是否关联 |
| ⑫ | 经典关联 | classicReferences 是否引用 |
| ⑬ | 方剂关联 | formulaReferences 是否关联 |
| ⑭ | 后续知识 | childrenIds/relatedNodes 是否完整 |
| ⑮ | 毕业能力 | masteryRequirements 是否定义 |

### 2.2 评级标准

| 等级 | 含义 | 条件 |
|:----:|------|------|
| **A** | 完整 | ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮ 全部完整或仅 1-2 项轻微不足 |
| **B** | 基本够用 | 核心字段（①②③④⑧⑭）完整，引用类字段（⑪⑫⑬⑮）部分为空 |
| **C** | 明显不足 | 多个核心字段缺失或引用类字段系统性空缺（>50% 为空） |
| **D** | 缺失 | 缺少 quiz/why/credibility/v3 等关键结构 |

---

## 三、逐境界审计结果

### 3.1 Stage 1：初识中医（10 节点）

**评级：B**

| 节点 ID | 标题 | 评级 | 主要发现 |
|---------|------|:----:|----------|
| v3-s1-n1 | 中医的起源与定义 | B | 所有 v3 子字段齐全，classicReferences/formulaReferences/paradoxIds/masteryRequirements 均为空（可接受——入门阶段） |
| v3-s1-n2 | 中医的核心思维 | B | 同上。beginnerExplanation 用侦探破案比喻，优秀 |
| v3-s1-n3 | 中医的理论体系框架 | B | 同上。用工具箱比喻，优秀 |
| v3-s1-n4 | 整体观念 | B | 同上。用生态系统比喻，生动 |
| v3-s1-n5 | 辨证论治 | B | 同上。用灯不亮比喻 |
| v3-s1-n6 | 证、症、病的区别 | B | 同上。用车故障比喻，非常适合入门 |
| v3-s1-n7 | 阴阳的基本概念 | B | 同上。用两杯水温度比喻 |
| v3-s1-n8 | 阴阳的属性与分类 | B | 同上。用照片色调比喻，直观 |
| v3-s1-n9 | 阴阳的相互关系 | B | 同上。用家庭/跷跷板/四季三重比喻 |
| v3-s1-n10 | 阴阳在中医学中的应用 | B | 同上。用交通规则比喻 |

**关键结论：**
- ✅ beginnerExplanation 10/10 优秀，完全零基础友好
- ✅ quiz 10/10 完整，案例贴近生活
- ❌ classicReferences 10/10 为空（入门阶段可接受，但未来可补充 1-2 条）
- ❌ formulaReferences 10/10 为空（入门阶段合理）
- ❌ paradoxIds 10/10 为空
- ❌ masteryRequirements 10/10 为空

**改进建议：** 为 n7-n10（阴阳节点）各补充 1 条经典引用（如《素问·阴阳应象大论》），让小白第一次接触阴阳就知道出处。

---

### 3.2 Stage 2：学会观察（12 节点）

**评级：B+**

| 节点 ID | 标题 | 评级 | 主要发现 |
|---------|------|:----:|----------|
| v3-s2-n1 | 望诊基础 | A- | classicReferences 有值，masteryRequirements 有值。formulaReferences 为空（合理） |
| v3-s2-n2 | 闻诊基础 | A- | 同上 |
| v3-s2-n3 | 问诊基础 | A- | 同上 |
| v3-s2-n4 | 切诊基础 | A- | 同上 |
| v3-s2-n5 | 寒热观察 | A- | classicReferences/formulaReferences/paradoxIds/masteryRequirements 均有值，最佳节点之一 |
| v3-s2-n6 | 汗的观察 | B+ | classicReferences/formulaReferences 有值，paradoxIds 为空 |
| v3-s2-n7 | 饮食观察 | B+ | classicReferences 有值，formulaReferences/paradoxIds 为空 |
| v3-s2-n8 | 睡眠观察 | B+ | 同上 |
| v3-s2-n9 | 精神观察 | B+ | 同上 |
| v3-s2-n10 | 舌象基础 | A- | classicReferences/masteryRequirements 有值 |
| v3-s2-n11 | 脉象基础 | B | masteryRequirements 为空（可能是遗漏） |
| v3-s2-n12 | 观察训练方法 | A- | classicReferences/paradoxIds/masteryRequirements 均有值，8 个掌握要求 |

**关键结论：**
- ✅ beginnerExplanation 12/12 优秀
- ✅ classicReferences 12/12 非空（Stage 2 最佳）
- ✅ masteryRequirements 11/12 非空（仅 n11 缺失）
- ⚠️ formulaReferences 10/12 为空（观察阶段可以接受）
- ⚠️ paradoxIds 10/12 为空（仅 n5 和 n12 有值）

**改进建议：** 补充 v3-s2-n11 的 masteryRequirements；为 n6~n9 考虑添加 paradoxIds。

---

### 3.3 Stage 3：八纲辨证（12 节点）

**评级：B**

| 节点 ID | 标题 | 评级 | 主要发现 |
|---------|------|:----:|----------|
| v3-s3-n1 | "怕冷"不一定都是表证 | A | classRef/formulaRef/paradox/mastery 四数组均有值 |
| v3-s3-n2 | 表证的完整图景 | B+ | 四数组基本完整 |
| v3-s3-n3 | 表里的动态观察 | B+ | classRef/formulaRef 有值，paradoxIds 为空 |
| v3-s3-n4 | "怕冷"不等于"寒证" | A- | classRef/paradox/mastery 有值，formulaRef 为空 |
| v3-s3-n5 | 寒热证的成组观察法 | C | classicReferences 为空，masteryRequirements 为空 |
| v3-s3-n6 | 寒热真假 | A | 四数组均有值，beginnerExplanation 用暖气楼比喻 |
| v3-s3-n7 | "怕冷"的虚实之别 | B | classRef/formulaRef 有值，masteryRequirements 为空 |
| v3-s3-n8 | 虚实判断中的干扰因素 | B+ | 四数组基本完整 |
| v3-s3-n9 | 虚实夹杂 | B+ | 同上 |
| v3-s3-n10 | 阴阳是八纲的总纲 | B | classRef 有值，masteryRequirements 为空 |
| v3-s3-n11 | 八纲整合思维 | B+ | 四数组完整 |
| v3-s3-n12 | 八纲辨证综合案例 | A | 四数组完整，综合案例质量高 |

**关键结论：**
- ✅ beginnerExplanation 12/12 优秀，对比案例鲜明
- ✅ quiz 案例质量高，多线索组合判断训练到位
- ✅ classicReferences 11/12 非空（仅 n5 缺失）
- ⚠️ formulaReferences 4/12 为空
- ⚠️ paradoxIds 7/12 为空
- ⚠️ masteryRequirements 3/12 为空（n5, n7, n10）

**改进建议：** 为 n5（寒热成组观察法）补充 classicReferences 和 masteryRequirements；为 n3（表里动态观察）补充 paradoxIds；为 n7/n10 补充 masteryRequirements。

---

### 3.4 Stage 4：脏腑与气血津液（17 节点）

**评级：C**（因 masteryRequirements 和 paradoxIds 系统性缺失）

| 节点 ID | 标题 | 评级 | 主要发现 |
|---------|------|:----:|----------|
| v3-s4-n1 | 气是什么？ | C+ | classicRef/paradox/mastery 为空，formulaRef 有值 |
| v3-s4-n2 | 气的运动 | C+ | classicRef/formulaRef 有值，paradox/mastery 为空 |
| v3-s4-n3 | 三种气病方向 | C+ | master为空，classicRef为空，formulaRef有值 |
| v3-s4-n4 | 血——从面色苍白看起 | C+ | 同上模式 |
| v3-s4-n5 | 血瘀 | C+ | 同上 |
| v3-s4-n6 | 血的寒热 | C+ | classicRef/mastery/paradox 为空 |
| v3-s4-n7 | 津液——"口渴不止是缺水" | C+ | 同上 |
| v3-s4-n8 | 水湿痰饮 | C+ | classicRef/formulaRef 有值，paradox/mastery 为空 |
| v3-s4-n9 | 气血津液是一家 | C+ | 同上 |
| v3-s4-n10 | 心 | C+ | classicRef/formulaRef 有值，paradox/mastery 为空 |
| v3-s4-n11 | 肝 | C+ | 同上 |
| v3-s4-n12 | 脾 | C+ | 同上 |
| v3-s4-n13 | 肺 | C+ | 同上，formulaRef 丰富（3条） |
| v3-s4-n14 | 肾 | C+ | 同上 |
| v3-s4-n15 | 胃 | C+ | classicRef 为空 |
| v3-s4-n16 | 小肠与大肠 | C+ | classicRef 为空 |
| v3-s4-n17 | 胆、膀胱与三焦 | C+ | classicRef/formulaRef 有值 |

**关键结论：**
- ✅ beginnerExplanation 17/17 极其出色（电池、手机、管道、工厂等比喻）
- ✅ formulaReferences 0/17 为空（唯一一个 100% 有方剂引用的阶段）
- ✅ relatedNodes/childrenIds 完整
- ✅ v3 18 子字段 100% 存在
- ❌ **masteryRequirements 17/17 为空**（系统性遗漏，与 Stage 2/3 的模式不一致）
- ❌ **paradoxIds 17/17 为空**（可能是设计决定，但建议确认）
- ⚠️ classicReferences 6/17 为空（n1, n3, n6, n7, n15, n16）

**改进建议：** 这是审计中发现问题最多的阶段。需要：
1. 为 17 个节点逐一补充 masteryRequirements（参考 Stage 2 的 pattern：每个节点至少 1-3 个 case ID）
2. 为关键节点（如气、血、津液的基础概念节点）补充 paradoxIds
3. 为 n1（气）、n3（气病方向）、n15（胃）等补充 classicReferences

---

### 3.5 Stage 5：病机与辨证推理（12 节点）

**评级：C**（经典引用、方剂引用、悖论、掌握要求全部为空）

| 节点 ID | 标题 | 评级 | 主要发现 |
|---------|------|:----:|----------|
| v3-s5-n1 | 病因概述——外感与内伤 | C | 四数组全部为空，核心内容好但缺少扩展关联 |
| v3-s5-n2 | 病机——疾病变化的内在逻辑 | C | 同上 |
| v3-s5-n3 | 正邪相争——疾病的核心矛盾 | C | 同上 |
| v3-s5-n4 | 气机——人体生命活动的动力 | C | 同上 |
| v3-s5-n5 | 升降出入——气的基本运动形式 | C | 同上 |
| v3-s5-n6 | 气机失常——从郁到逆到陷 | C | 同上 |
| v3-s5-n7 | 寒热转化——病性的动态演变 | C | 同上 |
| v3-s5-n8 | 虚实夹杂——正邪力量的交织 | C | 同上 |
| v3-s5-n9 | 真假寒热与真假虚实 | C | 同上 |
| v3-s5-n10 | 观察与追问——信息收集的艺术 | C | 同上 |
| v3-s5-n11 | 线索组织与假设提出 | C | 同上 |
| v3-s5-n12 | 反证与调整——检验诊断的可靠性 | C | 同上 |

**关键结论：**
- ✅ quiz/why/credibility 12/12 完整
- ✅ beginnerExplanation 12/12 优秀
- ✅ v3 18 子字段全部存在
- ❌ **classicReferences 12/12 为空**（系统性遗漏）
- ❌ **formulaReferences 12/12 为空**（系统性遗漏）
- ❌ **paradoxIds 12/12 为空**（系统性遗漏）
- ❌ **masteryRequirements 12/12 为空**（系统性遗漏）

**改进建议：** Stage 5 是"从知道到会用"的关键过渡阶段，四数组全部为空是一个显著的缺口。需要：
1. 为 n1~n3（病因病机）补充 classicReferences（如《素问·调经论》《灵枢·百病始生》）
2. 为 n4~n6（气机）补充 formulaReferences（如逍遥散、半夏厚朴汤等理气方）
3. 为 n7~n9（寒热虚实变化）补充 paradoxIds（已存在的 para-01~05 可以关联）
4. 为 n10~n12（推理方法）补充 masteryRequirements

---

### 3.6 Stage 6：进阶辨证（12 节点）

**评级：B**

| 节点 ID | 标题 | 评级 | 主要发现 |
|---------|------|:----:|----------|
| v3-s6-n1 | 太阳病——表证在六经体系中的位置 | B+ | classRef/formulaRef 有值，paradox/mastery 为空 |
| v3-s6-n2 | 阳明病——里热证的六经视角 | B+ | 同上 |
| v3-s6-n3 | 少阳病——半表半里的枢机 | B+ | 同上 |
| v3-s6-n4 | 太阴病——脾虚寒湿的开始 | B+ | 同上 |
| v3-s6-n5 | 少阴病——心肾阳虚的危重阶段 | B+ | 同上 |
| v3-s6-n6 | 厥阴病——寒热错杂的终局 | B+ | 同上 |
| v3-s6-n7 | 卫分证——温热病的表证 | B+ | 同上 |
| v3-s6-n8 | 气分证——温病邪入气分 | B+ | 同上 |
| v3-s6-n9 | 营血分证——热入营血 | B+ | 同上 |
| v3-s6-n10 | 上焦与中焦病证 | B+ | 同上 |
| v3-s6-n11 | 下焦病证 | B+ | 同上 |
| v3-s6-n12 | 三种辨证体系的综合比较 | B+ | formulaReferences 为空，其他字段均好 |

**关键结论：**
- ✅ quiz/why/credibility 12/12 完整
- ✅ classicReferences 12/12 非空（包括《伤寒论》《温热论》《温病条辨》原文）
- ✅ formulaReferences 11/12 非空（仅 n12 为空）
- ⚠️ paradoxIds 12/12 为空
- ⚠️ masteryRequirements 12/12 为空

**改进建议：** 为 n12（综合比较节点）补充 formulaReferences；考虑为关键节点补充 paradoxIds（如寒热错杂的厥阴病可对应 para-01 怕冷≠寒）；为 n1~n6 六经节点补充 masteryRequirements。

---

### 3.7 Stage 7：治则·方剂·经典（10 节点）

**评级：B**

| 节点 ID | 标题 | 评级 | 主要发现 |
|---------|------|:----:|----------|
| v3-s7-n1 | 扶正祛邪 | B+ | classRef/formulaRef 丰富，paradox/mastery 为空 |
| v3-s7-n2 | 标本缓急 | B+ | 同上 |
| v3-s7-n3 | 正治反治 | B+ | 同上 |
| v3-s7-n4 | 方证对应 | B+ | 同上，方剂思维的关键节点 |
| v3-s7-n5 | 君臣佐使 | B+ | 同上 |
| v3-s7-n6 | 方剂结构 | B+ | 同上 |
| v3-s7-n7 | 随证治之 | B+ | 同上 |
| v3-s7-n8 | 动态变化——疾病传变 | B+ | 同上 |
| v3-s7-n9 | 读经典的方法 | B+ | 经典原文范例丰富 |
| v3-s7-n10 | 经典原文范例 | B+ | 同上 |

**关键结论：**
- ✅ classicReferences 10/10 非空（最佳，源于《素问》《伤寒论》等）
- ✅ formulaReferences 10/10 非空
- ✅ quiz/why/credibility 10/10 完整
- ⚠️ paradoxIds 10/10 为空
- ⚠️ masteryRequirements 10/10 为空

**改进建议：** 为 n4~n8（方剂思维节点）补充 masteryRequirements（如 case 验证）；考虑为 n1~n3（治则节点）补充 paradoxIds。

---

### 3.8 Stage 8：综合杏林试炼（6 节点）

**评级：A-**

| 节点 ID | 标题 | 评级 | 主要发现 |
|---------|------|:----:|----------|
| v3-s8-n1 | 观察与追问——锁定关键线索 | A- | 四数组全部有值，案例质量高 |
| v3-s8-n2 | 整理与推理——到辨证假设 | A- | paradoxIds 为空，其他均好 |
| v3-s8-n3 | 反证与调整——修正偏差 | A- | 四数组全部有值 |
| v3-s8-n4 | 迁移与解释——跨场景应用 | A- | 同上 |
| v3-s8-n5 | 杏林修炼报告——九维能力图谱 | B+ | classicReferences/formulaReferences/masteryRequirements 为空 |
| v3-s8-n6 | 从试炼到临床 | B+ | formulaReferences/masteryRequirements 为空 |

**关键结论：**
- ✅ 核心内容质量高，八步推理训练设计完整
- ✅ paradoxIds 5/6 非空（唯一 paradoxIds 覆盖率高的阶段）
- ✅ masteryRequirements 4/6 非空
- ⚠️ classicReferences 使用符号 ID（如 v3-classic-1）非人类可读，需验证解析
- ⚠️ formulaReferences 使用拼音 slug（如 danZhiXiaoYao），需验证匹配
- ⚠️ n5（修炼报告）和 n6（终身修炼）缺少引用和掌握要求

**改进建议：** 确认 classicReferences 和 formulaReferences 的 ID 格式是否被引擎正确解析；为 n5/n6 补充引用。

---

## 四、V2 节点审计结果

V2 的 30 个节点分布在 `src/data/knowledge/`（24 个）+ `src/data/index.ts` 内联（6 个）。

### 4.1 V2 节点完整性

| 字段 | V2 节点（30 个） | 覆盖率 |
|------|:----------------:|:------:|
| quiz | 30/30 | 100% |
| why | 30/30 | 100% |
| credibility | 30/30 | 100% |
| transferScenes | **0/30** | **0%** |
| v3 linkage | **0/30** | **0%** |

### 4.2 关键发现

**V2 与 V3 之间不存在任何数据链接。** V2 节点（yy-1, ch-1 等）使用独立 ID 体系，V3 节点（v3-s1-n1 等）使用另一套 ID 体系。两者之间没有引用关系。

这意味着：
1. V2 节点目前是"游离"在 V3 境界体系之外的孤立内容
2. Agent 只能通过 topic 字段（如 'yinYang'）将 V2 节点与 V3 节点在主题层面关联
3. 没有机制让 V2 节点融入境界→模块→章节的结构

**建议：** 在 V3.5 中为 V2 节点补充 v3 字段（stageId + moduleId），使其融入境界体系。

---

## 五、跨阶段对比

### 5.1 四数组填充率对比

| 境界 | classicReferences | formulaReferences | paradoxIds | masteryRequirements | **平均** |
|:----:|:-----------------:|:-----------------:|:----------:|:-------------------:|:--------:|
| Stage 1 | 0% | 0% | 0% | 0% | **0%** |
| Stage 2 | **100%** | 17% | 17% | **92%** | **56%** |
| Stage 3 | **92%** | 67% | 42% | 75% | **69%** |
| Stage 4 | 65% | **100%** | 0% | 0% | **41%** |
| Stage 5 | 0% | 0% | 0% | 0% | **0%** |
| Stage 6 | **100%** | **92%** | 0% | 0% | **48%** |
| Stage 7 | **100%** | **100%** | 0% | 0% | **50%** |
| Stage 8 | 67% | 67% | **83%** | 67% | **71%** |
| **整体** | **66%** | **55%** | **18%** | **29%** | **42%** |

### 5.2 评级分布

| 评级 | 节点数 | 占比 |
|:----:|:------:|:----:|
| A | 5 | 5% |
| B | 57 | 63% |
| C | 29 | 32% |
| D | 0 | 0% |

### 5.3 深度层次覆盖率

按 V3.5 需求中的六层学习深度：

| 深度层 | 覆盖率 | 说明 |
|--------|:------:|------|
| Layer 1: 认识（谁知道是什么） | 100% | 全部节点有 intro + quiz |
| Layer 2: 理解（知道为什么） | 100% | 全部节点有 why |
| Layer 3: 识别（能从信息中发现） | ~70% | quiz 包含选择判断，但 observation 关联不足 |
| Layer 4: 辨析（不机械套公式） | ~40% | misconceptions 和 paradoxIds 覆盖不足 |
| Layer 5: 推理（能解释为什么） | ~30% | 集中在 Stage 3/5/8，其他阶段较弱 |
| Layer 6: 迁移（换场景仍能用） | ~20% | V2 有 transferScenes 定义但未填充，V3 缺少迁移验证 |

---

## 六、核心问题诊断

### 问题 1：四数组系统性空缺

**classicReferences** 覆盖 66%，但 Stage 1 和 Stage 5 全部为空；**formulaReferences** 覆盖 55%，Stage 1/5 全部为空；**paradoxIds** 覆盖 18%，7 个阶段超过 50% 为空；**masteryRequirements** 覆盖 29%，Stage 1/4/5/6/7 系统性空缺。

**影响：** 知识节点变成孤立的信息卡片，缺少经典、方剂、反直觉挑战和案例验证的关联，课程性弱。

### 问题 2：V2 与 V3 数据隔离

V2 的 30 个节点和 V3 的 91 个节点使用完全不同的 ID 体系，没有任何交叉引用。Agent 无法统一决策——推荐 V2 节点时无法关联境界进度，推荐 V3 节点时无法利用 V2 的掌握数据。

### 问题 3：缺少"课程"中间层

当前结构是：境界→模块→节点。缺少"章节"层（LearningChapter）和"学习单元"层（LearningUnit）。节点之间是平行的，没有形成"先 A 后 B 再 C"的课程顺序。

### 问题 4：Layer 4-6 深度不足

91% 的节点停留在 Layer 1-3（认识、理解、识别），只有约 30% 进入 Layer 4（辨析），约 20% 进入 Layer 5-6（推理、迁移）。

### 问题 5：没有毕业标准和试炼

每个境界的 masteryCondition 只是文字描述，没有可执行的毕业条件代码。Stage 1~7 没有毕业试炼，Stage 8 的 6 个节点也主要是 quiz 形式，不是真正的综合推理训练。

---

## 七、具体改进优先级

### P0：必须修复（影响核心体验）

| 优先级 | 问题 | 范围 | 工作量估计 |
|:------:|------|:----:|:----------:|
| P0 | Stage 5 四数组全部为空 | 12 节点 | 3-4 小时 |
| P0 | Stage 4 masteryRequirements 全部为空 | 17 节点 | 2-3 小时 |
| P0 | V2 与 V3 数据打通 | 30 个 V2 节点 | 2-3 小时 |
| P0 | Stage 1 补充少量经典引用 | 10 节点 | 1 小时 |

### P1：重要但非阻塞

| 优先级 | 问题 | 范围 | 工作量估计 |
|:------:|------|:----:|:----------:|
| P1 | 建立 LearningUnit 数据层 | 设计+核心节点 | 4-6 小时 |
| P1 | 建立 LearningChapter（章节）层 | 24 个模块→约 50 章 | 3-5 小时 |
| P1 | Stage 4 paradoxIds 补充 | 17 节点 | 1-2 小时 |
| P1 | Stage 5~7 masteryRequirements 补充 | 34 节点 | 3-4 小时 |
| P1 | 为关键节点添加 transferScenes | 91 个 V3 节点 | 6-8 小时 |

### P2：锦上添花

| 优先级 | 问题 | 范围 | 工作量估计 |
|:------:|------|:----:|:----------:|
| P2 | 毕业试炼系统 | 8 境界 | 6-8 小时 |
| P2 | 概念对比系统设计 | 15+ 对比对 | 3-5 小时 |
| P2 | 内容扩充至 120-150 | 29-59 新节点 | 10-20 小时 |
| P2 | 小白入口（第一课） | UI+内容 | 4-6 小时 |

---

## 八、内容增减建议

### 8.1 建议合并的节点

| 节点 | 合并理由 |
|------|----------|
| v3-s1-n1 + v3-s1-n3 | "中医的起源与定义"和"中医的理论体系框架"内容重叠，合并为"中医是什么"一个章节 |
| v3-s4-n1 + v3-s4-n2 + v3-s4-n3 | "气是什么"+"气的运动"+"三种气病方向"天然是一个章节的三个单元，而非三个平行节点 |
| v3-s5-n10~n12 | "观察与追问"+"线索组织与假设"+"反证与调整"可以统一为一个"八步推理法"章节 |

### 8.2 建议拆分的关键节点

| 节点 | 拆分理由 |
|------|----------|
| v3-s3-n6（寒热真假） | 内容过于密集——"真寒假热"和"真热假寒"是两个完全不同的概念，建议拆分为两个单元 |
| v3-s4-n9（气血津液是一家） | 涉及三个物质系统的关系，建议拆分为气血关系 + 气津关系 + 血津关系三个小单元 |
| v3-s8-n1（观察与追问） | 案例过于丰富（45 岁女性头痛案例），建议拆分为案例呈现 + 线索筛选 + 追问设计三个单元 |

### 8.3 建议新增的关键节点

| 领域 | 建议新增 | 理由 |
|------|----------|------|
| Stage 3 | 八纲辨证实践小结 | 目前有"综合案例"但缺少实践指导节点 |
| Stage 4 | 五脏之间的生克关系 | 已有独立五脏但缺少整体互动关系 |
| Stage 5 | 辨证推理综合案例 | 12 个节点都是理论，缺少一个完整的推理演示 |
| Stage 6 | 多体系综合运用案例 | 目前 n12 是"对比"，建议增加"综合运用" |
| Stage 7 | 经方临床思维案例 | 经方思维的训练不应该只停留在理论层面 |
| Stage 8 | 2 个额外的高级案例 | 6 个节点对"综合试炼"来说偏少 |

---

## 九、内容来源核验情况

### 9.1 V3 节点来源

| 来源类型 | 占比 | 核验情况 |
|----------|:----:|----------|
| classic（经典原文） | ~35% | 引用来源可靠（《素问》《伤寒论》《难经》等） |
| textbook（教材） | ~60% | 内容可靠但非第一手来源 |
| general（一般） | ~5% | 需要核验 |

### 9.2 待核验的引用

以下节点的来源需要进一步确认：

| 节点 | 引用 | 问题 |
|------|------|------|
| v3-s2-n5 | `'classic-suwen-xuanming'` | ID 格式，需验证是否对应《素问·宣明五气》 |
| v3-s2-n10 | `'classic-shetai'` | ID 格式，需验证是否指向具体经典 |
| v3-s2-n11 | `'classic-maixue'` | 脉学经典文献来源需明确 |
| v3-s8-n1~n6 | `'v3-classic-1'` 等 | 符号 ID，无对应的可读引用 |
| v3-s8-n1~n4 | `'danZhiXiaoYao'` 等 | 拼音 slug，需验证是否匹配 formula ID |

### 9.3 编造风险

**未发现编造来源。** 所有 classicReferences 指向的对象名都是已知中医经典。教科书来源标注了作者和版本。但以下需要警惕：
- Stage 5 所有节点的 classicReferences 为空——不是编造问题，而是缺少引用
- Stage 8 的符号 ID 需要验证是否指向已定义的数据

---

## 十、审计总结

### 10.1 核心结论

**V3 的内容骨架是扎实的，但课程化不足。**

- **结构强度（A-）**：91 个节点结构完整，quiz/why/credibility/v3 全部存在
- **小白友好（A）**：beginnerExplanation 和 example 质量高，比喻生动
- **知识深度（C）**：Layer 4-6 覆盖率低，缺乏辨析、推理、迁移的系统训练
- **知识网络（D）**：经典引用、方剂关联、反直觉挑战、掌握验证四数组平均填充率仅 42%
- **课程连贯性（D）**：缺少章节层和学习单元层，节点之间是平铺的不是串联的
- **V2/V3 整合（D）**：两套数据完全隔离，Agent 无法统一决策

### 10.2 总体评级

| 评级 | 节点数 | 占比 |
|:----:|:------:|:----:|
| A（完整） | ~5 | ~5% |
| B（基本够用） | ~57 | ~63% |
| C（明显不足） | ~29 | ~32% |
| D（缺失） | 0 | 0% |

### 10.3 一句话总结

> **91 个节点是优秀的知识素材，但不是课程。从"素材"到"课程"的桥梁，就是 V3.5 需要建立的 LearningUnit、LearningChapter、ConceptComparison、KnowledgeBridge 和 GraduationCriterion。**

---

*审计完成。建议按照 V3.5 需求文档的 Phase 1→Phase 2→Phase 3 顺序逐步实施。*