# 杏林大典 · Phase 2.5 内容质量封板报告

> 本报告为 Phase 2 人工终审 9 项问题的封闭修复说明，记录所有变更、事实核验结果、自动化测试与剩余风险。
> 按约定：本阶段仅做「内容质量封板」，未进入 Phase 3，未批量生产新知识对象，未修改 UI / Agent 代码，未以 AI 猜测剂量 / 经典原文 / 药性。

---

## 一、结论摘要

- 9 项终审问题全部在代码层封闭完成。
- 新增事实审校层 `ContentFactAudit`，7 个黄金样板全部接入。
- 剂量来源彻底分层（原典 / 现代教学 / 临床），杜绝「各等分 ↔ 克数」混标。
- 全部经典原文逐字核验并锁定 `verified`，两处误归出处已更正。
- C3/C4 案例全部升级为「自由判断 + 证据 + 反证 + 修正」结构。
- 自动化测试 **543 项通过、0 失败**；`npx tsc --noEmit` 通过（exit 0）。

---

## 二、Schema 变更清单（`src/types/canonicalKnowledgeSchema.ts`）

| 新增 / 变更 | 用途 | 关键字段 |
|---|---|---|
| `FactSourceType` / `VerificationStatus` / `FactEvidence` | 事实来源证据与核验状态 | `sourceType`（药典/教材/经典原文/传统解释/教学设计等）、`verificationStatus`（verified/pending/teaching_inference） |
| `ContentFactAudit` | 挂载到基类 `factAudit?` 的事实审校层 | `facts: FactEvidence[]` |
| `DosageEvidence` | 剂量证据分层 | `originalDosage` / `historicalDosage` / `modernTeachingDosage` / `clinicalDosage`，各层独立 `*Source` |
| `FreeReasoning` | 挂载到 `KnowledgeCase.freeReasoning?` 的证据推理结构 | `standardJudgment` / `coreEvidence` / `commonPitfalls` / `requireCounterEvidence` / `requireRevision` |
| `ClassicReference.verificationStatus/factSource` | 经典原文核验状态与证据 | 逐字 + 精确出处 |
| `SpatialLearning` | 挂载到 `AcupointKnowledge.spatial?` 的空间认知结构 | `bodyRegion` / `landmarkPoints` / `relativeDirection` / `relativeDistance` / `meridianPath` / `spatialTasks` |
| `ReasoningAttempt` / `CaseSession` | 挂载到 `ClinicalKnowledge.caseSession?` 的推理记录 | `attempts`（运行时追加） / `referenceAttempt`（教学示范） |
| `HerbAppearance.visualAssetId?` | 识材视觉素材安全标注 | 无可靠授权图片时留空，不伪造 |

---

## 三、样板修复清单（7 / 7）

### 1. 人参 `herb-ginseng.ts`
- 升降浮沉：由绝对化「主升（升提阳气）」改为谨慎表述，并标注 `teaching_inference`（人参升降浮沉无药典法定定性）。
- 剂量：迁入 `DosageEvidence`。原典「各等分」（`verificationStatus: verified`，注明「不得折算为克数」）；现代 `3–9g` 引自《中国药典》2025 版一部（verified）。
- 识材：`visualAssetId` 留空，`factAudit` 标注 `pending`（当前仅为文字识材）。
- C3/C4：补 `freeReasoning`。

### 2. 四君子汤 `formula-four-gentlemen.ts`
- 剂量拆分：原方「各等分」（verified）与「9/9/9/6g」（《方剂学》规划教材，verified）严格分层，四味药逐味带 `dosageEvidence`。
- 原文：补全《太平惠民和剂局方》卷三「治一切气」原文与用法，`factSource` 标注「唯云各等分，不得折算」。
- 缺药题：由 1 道（仅茯苓）补至 **4 道**（人参 / 白术 / 茯苓 / 炙甘草各一）。
- C2/C3/C4：补 `freeReasoning`。

### 3. 足三里 `acupoint-zusanli.ts`
- 经典核验：**「皆调于三里」出自《灵枢·五邪》**，原误归《灵枢·邪气脏腑病形》已更正，并补全文与 `factSource`。
- 空间认知：新增 `spatial` 结构（区域/地标/上下/内外/邻近穴/经脉走行/闭眼回忆），无可靠 3D 素材故 `visualAssetId` 留空，标 `teaching_inference`。
- C3/C4：补 `freeReasoning`。

### 4. 脾胃气虚综合医案 `clinical-spleen-qi.ts`
- 经典核验：「脾胃者，仓廪之官」补全「五味出焉」，删除含糊「取其大义」标注，两处经典均 `verified`。
- 推理记录：新增 `caseSession`，`attempts` 为空数组（不伪造「用户已完成推理」），`referenceAttempt` 给出完整示范推理链（假设→证据→反证→修正→终判）。
- C3/C4：补 `freeReasoning`。

### 5. 阴阳（理论）`yin-yang.ts`
- 开篇经典 `verified` + `factSource`；新增 `factAudit`（经典原文 + `coreDefinition` 教材定义均 verified）。
- C3/C4：补 `freeReasoning`。

### 6. 淡白舌 `tongue-pale.ts`
- 经典核验：**「舌者，心之苗也」非《灵枢·经脉》原句**，改引《灵枢·脉度》「心气通于舌，心和则舌能知五味矣」，并将「舌为心之苗」归入传统解释（后世引申）。
- 新增 `factAudit`（原文 verified + 媒体规范 teaching_inference，不采集用户舌象）。
- C3/C4：已有 `freeReasoning`。

### 7. 阴阳应象大论开篇 `classic-yinyang.ts`
- 两段经典（开篇 + 「故积阳为天……阳化气，阴成形」）均 `verified` + `factSource`；`classic.reference` 同步锁定。
- 新增 `factAudit`；C3/C4：补 `freeReasoning`。

---

## 四、事实核验结果

| 事实项 | 结论 | 状态 |
|---|---|---|
| 四君子汤原方剂量「各等分」 | 与 9/9/9/6g 现代剂量拆分，不再混标 | verified |
| 四君子汤现代剂量 9/9/9/6g | 补《方剂学》（规划教材）出处 | verified |
| 足三里「皆调于三里」出处 | 《灵枢·五邪》（非《邪气脏腑病形》） | verified |
| 淡白舌「舌者心之苗」出处 | 非《灵枢·经脉》原句，改引《脉度》 | verified |
| 脾胃「仓廪之官，五味出焉」 | 补全原文，删除「取其大义」 | verified |
| 人参升降浮沉 | 无药典法定定性，改谨慎表述 | teaching_inference |

---

## 五、自动化测试结果

- `npx tsc --noEmit`：**通过（exit 0）**。
- `golden-sample-acceptance.test.ts`：**543 项通过、0 失败**。
- 其中 Phase 2.5 新增 `T01–T10` 全部通过：
  - T01 每个样板均有 `factAudit` 且非空
  - T02 每条 fact 六要素齐全
  - T03 每条经典原文均有 `verificationStatus`
  - T04 `verified` 经典必带 `factSource`
  - T05 无 `pending` 经典原文进入背诵
  - T06 四君子汤缺药题恰为 4 道
  - T07 现代剂量数字均有 `verified` 来源
  - T08 全部 C3/C4 具备证据推理结构（C3≥2 证据；C4 反证 + 修正）
  - T09 足三里 `spatial` 存在且 `spatialTasks≥3`
  - T10 综合医案 `caseSession`：`attempts` 空 + 示范推理链完整

---

## 六、剩余风险清单（如实记录，不粉饰）

| 风险 | 对象 | 说明 | 处置 |
|---|---|---|---|
| 识材视觉素材 `pending` | 人参 | 当前仅文字识材，无真实图片（`visualAssetId` 留空） | 待 Phase 3 引入可靠授权图片前不声称「真实识材」 |
| 升降浮沉 `teaching_inference` | 人参 | 无药典法定定性，为教学推断 | 已明确标注，不进入权威结论 |
| 空间学习 `teaching_inference` | 足三里 | 当前为文字空间学习，无 3D / 图片 | 预留 `spatial` 结构，将来接真实素材再接 `visualAssetId` |
| 无真实舌象照片 | 淡白舌 | 符合「禁上传舌象 AI 诊断」安全边界 | 有授权教学舌象图后方可补图 |
| 两处经典原为「凭记忆录入」 | 全样板 | 已在 Phase 2.5 逐字核验为 `verified` | 已闭环；后续新增经典仍须走 factAudit |

---

## 七、封板声明

Phase 2.5 全部 12 项验收任务完成，内容质量封板闭环。**按指令在此 STOP，不进入 Phase 3**，等待人工复核本报告与 7 个样板的事实审校记录后再决定是否启动 Phase 3（全学科批量生产）。