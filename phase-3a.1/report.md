# 杏林大典 · Phase 3A.1 管线根因修复报告

> 结论先行：本轮完成了七类系统性缺陷的根因定位与分层源头修复，定向回归 **33/33 全绿**。允许进入第二轮 25 样本随机压力测试，但继续遵守 STOP 边界（不进入 Phase 3B、不扩大生产规模、不修改 Phase 2.5 封板 Schema）。

---

## 一、Root Cause Matrix

Phase 3A `pipeline.mjs` 的「生成器」用布尔 flag 预埋缺陷（`boundary.classicFactWithoutOriginal`、`dosage.mixedToGrams`、`templated.isTemplated`…），「门禁」读同一 flag 反射式检测，形成自洽循环。因此七类缺陷并非产生自孤立的某一行代码，而是共同暴露了一个结构性事实：**真正的生产管线在「采集 / 来源解析 / 知识分类 / 剂量分层 / 安全红线 / 反模板」这些源头没有任何护栏，FactAudit 没有触发规则，Gate 是唯一且近乎循环的兜底。**

| 缺陷 | 首次产生层 | 源头缺失 | 修复层 |
| --- | --- | --- | --- |
| B 经典出处错配 ×5 | 来源解析 | 生成器自由臆造 `sourceTitle`，无「经典出处白名单」供查表 | L1 来源解析 + 出处白名单 |
| K 知识边界 ×4 | 知识分类 | 无「内容→来源类型」分类规则，教材概括/后世说法可被标 `classic_original` | L1 改型 + L2 分类 |
| A 事实来源缺漏 ×2 | 事实采集 | 高风险字段可挂 `classic_original+verified` 却 `sourceTitle` 空；FactAudit 无「哪些字段必挂证据」触发规则 | L2 采集 + L6 FactAudit 触发 |
| C 剂量混标 ×2 | 剂量分层 | 无 `DosageEvidence` 四层强制，古训/原典相对剂量被折算克数、现代数字无 verified 来源 | L3 剂量分层 |
| D 三值越级 ×2 | 知识分类 | `verificationStatus` 由生成器手填，无「来源类型→最高状态」封顶 | L2 分类封顶 |
| J 高危隔离 ×2 | 安全红线 | 无已禁用/禁针对象硬清单，安全提示靠生成器自觉 | L4 安全红线 |
| H 模板化 ×2 | 生成器/反模板 | 无跨节点 `standardJudgment/coreDefinition` 去重，对偶证只换字不换理 | L5 反模板 |
| F/G 反证/修正无效 ×1 | 结构填充（C4） | 无「反证必须能推翻、修正必须回应反证」的生成规范 | Gate F/G + 生成规范（语义人工复核） |
| E C3 证据不足 ×0 | 结构填充（C3） | 测试覆盖缺口（本轮未注入该缺陷，非管线漏放） | 回归 E×2 补足 |
| I 难度梯度 ×0 | 选题 | 五类样本内难度全部相同 | 回归 I 难度梯度 |

每一项都遵守「先修源头、不在 Gate 层加 patch」：修复动作发生在 L1–L6，Gate 只保留为「源头无法自动修正的异常」的最后不变式。

---

## 二、修改文件

| 文件 | 操作 | 说明 |
| --- | --- | --- |
| `phase-3a.1/source-catalog.mjs` | 新增 | 权威来源目录：经典出处白名单（B/K）、来源类型→最高三值口径（D）、禁用药材/禁针穴红线清单（J）、难度梯度（I） |
| `phase-3a.1/pipeline.mjs` | 新增 | 分层生产管线：L1 来源解析、L2 知识分类+三值封顶、L3 剂量分层、L4 安全红线、L5 反模板、L6 FactAudit触发、Gate A–K 最后不变式 |
| `phase-3a.1/regression.test.mjs` | 新增 | 定向回归测试（B×2 K×2 C×1 D×1 H×1 J×1 E×2 + I 五档） |
| `phase-3a.1/report.md` | 新增 | 本报告 |

未改动的封板资产：`src/types/canonicalKnowledgeSchema.ts`（Schema）、`src/data/golden/samples/*`（黄金样板）、`golden-sample-acceptance.test.ts`（既有验收）、`phase-3a/*`（原压力测试产物）均保持原样。

---

## 三、每项修复逻辑

### L1 来源解析（B / K）
每条 `classics` 先查 `CLASSIC_ATTRIBUTION` 白名单。命中后按 `correctCanon/correctChapter/correctStatus/correctType` 四字段纠偏：真实经典/歌诀（kind=B）只改出处、保留 verified；教学概括/后世说法（kind=K）改型为 `teaching_design` 并降 `teaching_inference`。查不到且标 `classic_original+verified` 的一律降级，不改 Schema、不降 verified 标准。

### L2 知识分类 + 三值封顶（A / D / K）
`MAX_STATUS_BY_SOURCE_TYPE` 给出每种来源类型的最高状态上限，`teaching_design/modern_interpretation` 上限即 `teaching_inference`，越级者在源头被降级而非 Gate 拒绝。`classic_original` 却 `sourceTitle` 空的事实，降级为 `teaching_design/teaching_inference` 并标「无权威出处」；其他缺来源事实补「待核验」并降 `pending`。

### L3 剂量分层（C）
原典剂量剥离「数字+g」与含数字的折算括注，只保留「各等分/两/钱/枚」原表述；现代剂量含数字但无 `verified` 来源时整段剥离，不进入背诵。残留混标由 Gate C 复核。

### L4 安全红线（J）
`BANNED_HERBS`（关木通等马兜铃酸药材）与 `FORBIDDEN_ACUPOINTS`（三阴交/合谷/关元）在生成阶段强制注入「已禁用/禁针」红线，不依赖生成器自觉。

### L5 反模板（H）
批级统计 `standardJudgment` 相等或包含关系，命中即整簇（不只后者）标记 `isTemplated` 要求重写，杜绝「对偶证只换字」。

### L6 FactAudit 触发（A）
每个事实校验 `field/sourceType/sourceTitle` 六要素，缺任一项即记录，把「哪些字段该挂证据」从隐式变为显式。

### Gate（最后不变式）
A–K 门在源头修复之后运行，只拦「源头无法自动修正」的异常（非法 sourceType、残留越级、残留越界等），不再承担「发现错误就 reject」的唯一防线角色。

---

## 四、新增测试

`phase-3a.1/regression.test.mjs`，33 条断言，按用户要求覆盖：

- B ×2：半夏「十八反」误标《中国药典》 → 改为后世歌诀；五行「见肝之病知肝传脾」误标《内经》 → 改为《金匮要略》且保留 verified。
- K ×2：桂枝汤「调和营卫」、气机「左升右降」教材/后世冒充原文 → 改型 `teaching_design`。
- C ×1：麻黄汤「三两」折克数 → 剥离克数、保留「三两」。
- D ×1：柴胡「小剂量升提」`teaching_design` 越级 verified → 降 `teaching_inference`。
- H ×1：湿热蕴脾 vs 寒湿困脾 套话 → 两节点均标记 `isTemplated`。
- J ×1：关木通无禁用红线 → 注入「已禁用」红线。
- E ×2：C3 证据不足（<2 条）、证据不相关 → Gate E 正确识别。
- I ×1：难度梯度「简单/中等/困难/易混淆/高难」五档权重互不重复、标签齐全。

每条「源头修复类」断言同时验证两件事：(1) 修复记录出现在正确源头层（如「来源解析」「知识分类」），(2) 对应 Gate 在修复后通过——证明是源头修好而非 Gate 拦截。

---

## 五、回归测试结果

```
定向回归结果：通过 33 / 失败 0 / 合计 33
```

B、K、C、D、H、J 全部在源头层修复并通过对应 Gate；E、I 覆盖缺口补齐；无失败项。运行命令 `node phase-3a.1/regression.test.mjs`（Node v22.16.0，退出码 0）。

---

## 六、尚存风险

- B/K 出处白名单当前覆盖 13 个已知锚点，未知出处依赖「未知即降级」兜底，可能把真实经典误降为 `teaching_inference`，代价是宁严勿松，需人工补 verified。
- C 的剂量正则只拦截「数字+g」与含数字括注，对「两/钱」等非十进制的语义折算仍需人工核对（与 Phase 3A 方案一致）。
- H 反模板仅做「相等/包含」文本去重，同义改写仍须人工抽检，未引入重型语义模型。
- F/G 属语义判断，自动化只做 flag 级弱判定，真实「是否推翻/是否回应反证」仍须人工复核。
- J 红线清单覆盖 4 味马兜铃酸药材 + 3 个禁针穴，未穷尽全部高危对象。
- 本轮只在定向样本上验证，泛化能力须靠第二轮 25 随机样本压力测试确认。

---

## 七、是否允许进入第二轮

**允许**。定向回归全绿，源头修复已生效且未破坏 Phase 2.5 封板 Schema、黄金样板与既有验收。进入第二轮 25 随机压力样本后，仍须遵守边界：不进入 Phase 3B、不扩大到全学科批量生产、不因失败降低 verified 标准或关闭测试。

---

> 边界声明：本阶段未写入正式 Canonical Knowledge、未进入 Phase 3B、未扩大生产规模、未修改 Phase 2.5 封板规则、未修改既有黄金样板、未通过关闭测试来解决失败。本阶段到此 STOP。