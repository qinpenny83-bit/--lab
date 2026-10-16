# 🌿 杏林修炼场 V3.5 · Phase 1.5 验收报告（第二轮）

> 本轮回答一个问题：上一轮暴露的 4 个短板，是否真正修完；第一境是否已是"真正的小白教材样板"，第五境是否已是"真正的病机推理教材 + 互动训练样板"。
> 只精雕两个境界：第一境（初识中医，验证零基础学习体验）与第五境（病机推理，验证真正的思维训练）。
> 边界：全部内容均为理论学习 / 思维训练工具，不构成任何医疗诊断、开方或用药建议。
> 结论口径：本报告只写"已核实的事实"与"未核实 / 未完成的缺口"，不为了显示完成而判定通过。

---

## 0. 一句话结论

上一轮的 4 个短板，**在数据层与引擎层已全部修复**：第一境「中医是什么」补齐到完整 10 层（10 个核心主题 × 10 层 = 100 个学习单元），第五境补齐了真正的 Layer A 教材（16 个病机节点 + 5 章病机学习地图，覆盖全部 12 个核心病机主题），「杏林推理八步」落地为可运行的互动推理训练器（`ReasonerEngine`，含行为记录 / 错因识别 / 七维掌握判定），章节/模块 ID 统一且保持 V2/V3 兼容。工程侧 TypeScript 0 错误、production build 成功、验收测试 **148/148 通过**。

**第三轮（本轮）已把 UI 交互层闭环**：新增第五境「气机失常」课程播放器（`Stage5CoursePage` 课程容器 + `LearningUnitPlayer` 学习单元播放器 + `ReasoningPlayer` 八步推理），接入 `/journey/stage5/:chapterId` 路由与修炼之路入口，每一步真实行为写入 Mistake/Mastery/Review 引擎；并把 `coachDecision` 真正接入课程流，使教练能"根据错误改变下一步学习"。工程侧本轮重新核实：TypeScript 0 错误、production build 成功（108 modules）。**但"真机人工验收"仍未完成**：本会话浏览器自动化工具不可用，Test A~H 的真人点选未能执行，故不能虚报"真机通过"。详见第 C、D、11 节。

---

## A. 第一境：真正达到"小白能学会"了吗

### A1. 4 短板之一「中医是什么只有 5 单元」已修复

上一轮 `中医是什么`（节点 n1/n2/n3）只有 5 个入门单元 + n3 的 2 个单元，未套 10 层模板。本轮在 `src/data/curriculum/learningUnits.ts` 中将该主题重写为完整 10 层弧线 `lu-tcm-01`~`lu-tcm-10`：

| 层 | 单元 | 教学目的 |
|---|---|---|
| 理解 | `lu-tcm-01` 一句话理解：中医研究什么 | 中医研究的是"整体的人的状态与关系"，不是单一症状 |
| 为什么 | `lu-tcm-02` 为什么中医要强调整体 | 局部表现由整体状态决定 |
| 体系位置 | `lu-tcm-03` 理论如何连成体系 | 阴阳→五行→藏象→辨证是同一套关系语言 |
| 观察 | `lu-tcm-04` 中医怎么看待人体 | 功能与关系，而非孤立零件 |
| 判断 | `lu-tcm-05` 自己判断一下 | 先猜后学 |
| 解释 | `lu-tcm-06` 解释你的理由 | 训练"为什么这么想" |
| 追问 | `lu-tcm-07` Agent 追问 | 慢下来，别急着下结论 |
| 反直觉 | `lu-tcm-08` 不是"对症"而是"对状态" | 打破"一个症状对应一个答案" |
| 迁移 | `lu-tcm-09` 换一个陌生场景 | 验证是否内化 |
| 掌握验证 | `lu-tcm-10` 中医思维 vs 症状匹配 | 用自己的话区分两种思维 |

并修正了前置链：下一主题「整体观念」首单元 `lu-whole-01` 的 `prerequisiteIds` 现指向 `lu-tcm-10`，保证主线线性不跳。

### A2. 10 个核心主题现全部 10 层

| 主题 | 10 层教学 | 单元 |
|---|---|---|
| 中医是什么 | ✅ 完整（本轮补齐） | `lu-tcm-01`~`10` |
| 整体观念 | ✅ 完整 | `lu-whole-01`~`10` |
| 辨证论治 | ✅ 完整 | `lu-bz-01`~`10` |
| 证、症、病 | ✅ 完整 | `lu-szd-01`~`10` |
| 阴阳 | ✅ 完整 | `lu-yy-01`~`10` |
| 五行 | ✅ 完整 | `lu-wx-01`~`10` |
| 藏象 | ✅ 完整 | `lu-zx-01`~`10` |
| 气血津液 | ✅ 完整 | `lu-qx-01`~`10` |
| 病因 | ✅ 完整 | `lu-by-01`~`10` |
| 病机 | ✅ 完整 | `lu-bj-01`~`10` |

合计 **100 个学习单元**（上一轮为 97，本轮「中医是什么」由 7 → 10）。第一境另有 5 个模块（s1-m1~m5）、17 个知识节点、8 个章节、8 组概念对比（其中 5 组必修）、3 个理论案例。

### A3. 客观判断：内容质量达标，但"小白能学会"尚未被 UI 验证

内容层面，第一境 10 个主题每一层都有明确教学目的、反直觉单元与迁移单元全部非空（测试 A3/A4 已验证），且逐层有 `prerequisiteIds` 前置链（测试 E4）。**但**：100 个学习单元目前没有任何页面消费（`learningUnitArray` 未被任何 `.tsx` 引用）。也就是说，"10 层弧线"是数据里成立、用户视角尚未成立的样板——用户现在能看到的仍是通过既有 `/map/:topic` 的知识节点页（6 层内容），而非这条 10 层教学弧线的逐步呈现。因此"小白能学会"只能判定为"内容已具备"，不能判定为"已被用户验证"。

---

## B. 第五境：真正达到"可以训练病机推理"了吗

### B1. 4 短板之二「缺少 Layer A 教材」已修复

本轮新增模块 `s5-m5`（核心病机 Layer A 教材）及 4 个完整节点，加上原有 12 个节点，共 **16 个病机节点**（`v3-s5-n1`~`n16`），覆盖用户要求的全部 12 个病机核心主题：

| 病机主题 | 节点 | 位置 |
|---|---|---|
| 什么是病机 / 为什么需要病机 | n2（+n1） | 病机地图 ①② |
| 病因→人体变化→病机→表现→证候 | n1、n2 | 病机地图 ② |
| 病机是动态过程而非静态标签 | n2、n7、n8 | 病机地图 ⑨ |
| 邪正盛衰 | n3 | 病机地图 ③ |
| 阴阳失调 | n13（本轮新增） | 病机地图 ④ |
| 气机失常（升降出入） | n4、n5、n6 | 病机地图 ⑤ |
| 气血津液病机（相互影响） | n14（本轮新增） | 病机地图 ⑥ |
| 脏腑病机（生理→失常→表现） | n15（本轮新增） | 病机地图 ⑦ |
| 病位 / 病性 / 病势 | n16（本轮新增） | 病机地图 ⑧ |
| 病机转化 | n7、n8 | 病机地图 ⑨ |
| 多病机相互作用 | n8、n9 | 病机地图 ⑩ |

每个节点都含 `intro / quiz / why(verify) / credibility(出处+原文+教学点+安全说明) / v3（level、prerequisites、coreConcept、beginnerExplanation、deeperExplanation、observations、commonMistakes、misconceptions）` 六层结构，前置关系真实（如 n13 前置 n3、n13 后接 n14，符合"邪正盛衰→阴阳失调→气血津液"的地图顺序）。教材语言为小白可懂（如 n13 用"房间冷热"类比阳虚/阴虚/阳盛/阴盛），并带《黄帝内经·阴阳应象大论》等出处。这是真正讲"什么是病机"的教材，而非聊天框里的碎片说明。

### B2. 4 短板之三「八步仅内容框架」已修复为引擎

新增 `src/engine/ReasonerEngine.ts`，把 `REASONING_EIGHT_STEPS` 变成可运行的互动训练器：

- **会话与步骤**：`createReasonerSession` / `setActiveStep` / `completeStep` / `finalizeSession`，信息分步展示（八步由 pending→active→done 推进）。
- **真实行为记录**：`recordCluesViewed`（cluesViewed / cluesIgnored）、`markFirstJudgment`（timeToFirstJudgment）、`recordKeyClueSelection`、`recordCluePrioritization`（关键/次要/干扰）、`recordHypotheses`（允许 A/B 多假设）、`recordSupportEvidence`、`recordCounterEvidence`、`recordRevision`（revisionCount / revisionAbility）、`recordSynthesis`（reasoningQuality）、`recordTransfer`。
- **错因识别**：`detectReasoningMistake` 按"最根本→最表层"优先级，由真实行为映射到 8 类推理错因（transfer_fail → ignore_counterevidence → single_symptom_jump / concept_confusion → premature_judgment / overlook_clue → failed_revision → weak_evidence），每条都携带 rootCause + correctReasoning + targetedPractice，形成 RootCause → TargetedPractice。
- **七维掌握判定**：`computeMasteryEvidence` / `evaluateMasteryGate` 从 `conceptUnderstanding / clueCoverage / reasoningQuality / counterEvidenceUsage / revisionAbility / transferSuccess / retention` 七维综合判定，仅当全部过阈值才 `mastered`，并输出 `weakDimensions` 告知用户哪里还不稳。不再存在"做完 N 个案例 = mastered"。

`MistakeEngine` 同步扩展，8 类推理错因全部归入 `reasoning_error`，与 `MISTAKE_CATEGORY` 对齐（测试 M11 已验证）。

### B3. 4 短板之四「ID 命名不一致」已修复并保持兼容

统一命名规范落地于 `src/data/curriculum/learningChapters.ts`：

- `nodeId`（localStorage 的进度 key）**完全不动**，保证 V2/V3/localStorage 历史数据 100% 兼容。
- 历史章节 `id`（`ch-stage1-modN-chN`）保留为兼容别名，但 `moduleId` 字段统一对齐真实模块 id（`s1-m1`~`s8-m8`）。
- 新增章节一律采用新式 `ch-{stage}-{module}-c{序号}`（如 `ch-s5-m5-c1`）。
- 测试 L1/L2 验证第一境、第五境所有章节 `moduleId` 均与真实模块对齐，L3 验证毕业条件引用的节点全部真实存在。

### B4. 新增 3 个教学型病机案例 + 原有 6 挑战已完整

`reasoningChallenges.ts` 现有 **9 个推理挑战**：原 6 个（Lv1~Lv5）+ 本轮/上轮新增 3 个教学型（`kind: 'teaching'`）：

| 案例 | 类型 | 教学目的 |
|---|---|---|
| `rc-stage5-teach-single-qi-deficiency` | 单一病机 | 一个病机如何解释多个相关现象 |
| `rc-stage5-teach-double-qi-stasis-blood-stasis` | 双重病机 | 一个解释不够，需多病机并见 |
| `rc-stage5-teach-transformation-heat-injures-yin` | 病机变化 | 新信息出现，必须修改原解释 |

测试 G3~G9 对全部 9 个挑战逐一验证：线索分级（关键≥3 / 次要≥2 / 干扰≥2）、多候补假设且有最佳项、因果链完整、反证训练存在、迁移变式存在、错误恢复携带错因映射、非最佳假设注明破绽。原有 6 个挑战无需重写，缺项已通过统一数据结构补齐。

### B5. 客观判断：教材与引擎达标，但"互动"无 UI 承载

病机教材（16 节点六层内容）在数据层是真正成立、可被既有 `/map/:topic` 节点页触达的；推理训练器（`ReasonerEngine`）在引擎层也是真正成立、可被测试调用的。**但**：`ReasonerEngine`、`reasoningChallengeArray` 均未被任何 `.tsx` 页面引用。用户目前无法"标记关键线索""把线索分主次""用自己的话综合解释"——这些只存在于引擎 API 与测试用例里。因此"可以训练病机推理"只能判定为"引擎能力已具备"，不能判定为"用户已能被训练"。

---

## C. 仍然不足的地方（诚实清单）

> 用户特别要求核查的三个"假互动"风险，逐一作答：

### C1. 有没有只是"看起来互动"，实际上仍是选择题？

**部分存在，且是结构性的。** 病机节点的 `quiz` 与 `why.verify` 是选择题——但对于"小练习/概念检查"，选择是恰当的、不属于伪装互动。真正的风险在两个地方：

1. **自由文本质量无法真实评测**：`recordSynthesis(session, quality)` 与 `recordRevision(session, revised, quality)` 里的 `quality`（0-1）需要调用方给出。项目是纯前端、local-first、默认无 LLM，因此"用自己的话解释为什么"这个核心交互，在无 LLM 或人工评分的情况下，`quality` 只能退化为"是否做了/是否选了"的布尔值或自我评分，**"病机解释质量"实际无法被真实测量**。这是当前"看起来有综合解释、实际上难以真评"的根源。
2. **最终判断仍是"选假设"**：推理挑战最终落到 `bestHypothesisId` 的选择，用户自由组织的病机链并未被结构化采集（只通过八步的过程性操作记录间接反映）。

### C2. 有没有只是"看起来有 Agent"，实际上只是预设回复？

**是，但这是项目的既定架构，不是隐藏偷工。** `LocalAgentEngine` + `coachDecision` 是规则引擎：`ReasonerEngine.detectReasoningMistake` 返回的 rootCause / targetedPractice 是预设文案模板。项目硬约束明确"LLM 仅用于自由回答理解等，不决定安全边界、掌握状态、复习时间"，因此"规则化预设回复"是刻意设计。需诚实说明的是：**它因此不是"会真正读懂你解释内容的教练"，而是"基于可追踪行为规则、给出定向反馈的教练"**。能做到"先发现你漏了哪条线索、再指向针对性练习"，做不到"判断你用自然语言写的那段推理到底对不对"。

### C3. 有没有只是"看起来有推理"，实际上答案仍然是症状匹配？

**明显改进，但未根除。** 推理挑战已通过"多假设 + 反证 + 因果链 + 修正"把训练从"症状→证"的单点连线拉长为"线索→证据→反证→修正"的过程训练，且八步中"寻找反证"是强制步骤（引擎在无反证时会判 `ignore_counterevidence`），这比"症状匹配"有本质区别。但根子上：最终检验仍落在"从若干预设假设里选出最佳"，用户自己形成的因果推理链没有被独立评分（见 C1）。所以结论是"从症状匹配升级为'强制过程推理 + 证据/反证导向'，但尚未升级为'对自由推理链的开放评估'"。

### C4. UI 承接缺失 → **本轮已解决**

第三轮补齐了 UI 交互层：`learningUnitArray` / `reasoningChallengeArray` / `ReasonerEngine`（`createReasonerSession` 等）现由 `Stage5CoursePage`、`LearningUnitPlayer`、`ReasoningPlayer` 承接，接入 `/journey/stage5/:chapterId` 路由与修炼之路入口。第五境已有自己的 LearningUnit 管线（`stage5LearningUnits.ts` 的 10 层教学链），杏林推理八步有了逐步交互界面。细节见第 D 节。（上轮 C4 的"无页面引用"结论已不再成立。）

### C5. 规模仍是"样板"量级（按计划）

3 个教学案例 + 6 个推理挑战 + 4 个知识桥梁，是按"两个境界样板"的最小闭环，足以验证"教得深 / 练得到位"，但未覆盖其余 6 境、其余病机、方剂与经典的完整路径。这是本阶段刻意不做的，不属于缺陷。

---

## D. 第三轮：第五境「课程播放器」已落地（UI 交互闭环）

上一轮判定"UI 交互层缺失"，本轮把第五境真正做成用户可**顺序走完的一条课程流**（不进入 Phase 2、不扩其他境界），且每一层 `Stage → Chapter → LearningUnit → Knowledge → Practice → Case → Reasoning → Transfer → Review` 都落到真实数据与引擎：

| 层 | 实现 | 文件 |
|---|---|---|
| 路由 | `/journey/stage5/:chapterId` | `App.tsx` |
| 入口 | 修炼之路第五境「🎓 一键进入课程」 | `JourneyPage.tsx` |
| 课程容器 | 按完成进度定位当前单元 + 「为什么是现在？」（真实前置/掌握派生）+ 章节进度 + 节点掌握条 | `Stage5CoursePage.tsx` |
| 学习单元 | 支持 read / think / multi_choice / explain 四类交互，贯彻「先想再讲」；自由文本只做结构自检、不伪 AI 评分 | `LearningUnitPlayer.tsx` |
| 八步推理 | 完整八步 + 「我的推理轨迹」折叠区 + 出错「推理复盘」而非判错 | `ReasoningPlayer.tsx` |
| 数据链 | `lu-s5-qj-01`~`10`（前置链完整）承载 `ch-s5-m2-c1`，单元 8 关联挑战 `rc-stage5-lv1-qi-stagnation`（7 条分级线索、3 假设、反证已齐） | `stage5LearningUnits.ts` |
| 引擎结算 | `completeLearningUnit`（写掌握/复习/错因）+ `settleReasoningOutcome`（写会话/七维掌握/错因落地） | `progress.ts` |
| 教练接入 | 结算后调用 `coachDecision(getProgress())`，展示基于真实错因的「下一步安排」；`premature_judgment`/`single_symptom_jump` 时插入「🐢 慢下来微训练」并暂停迁移 | `ReasoningPlayer.tsx` + `coachDecision.ts` |

「为什么是现在」文案由 `chapter.nodeIds` 的真实前置（`prerequisites`）与 `getNodeMastery` 实时派生，非写死。八步每一步行为均被 `ReasonerEngine` 记录（cluesViewed / keyClueSelection / 主次分组 / 假设 / 支持证据 / 反证 / 修正 / 综合），经 `detectReasoningMistake` 映射到 8 类错因并写入 Mistake/Mastery/Review。

---

## 9. 测试 / TypeScript / Build 结果（本轮实测）

| 项 | 结果 |
|---|---|
| 验收测试 `acceptance-v35-phase1.5.test.ts` | **通过 148 · 失败 0**（上一轮结果；本轮 UI/教练改动不涉及测试覆盖的数据/引擎行为） |
| TypeScript（`tsc --noEmit`） | 0 错误（本轮重新核实） |
| Production build（`vite build`） | 成功（本轮 108 modules，含课程播放器与教练接入） |

新增测试段覆盖：第一境「中医是什么」10 层完整性（A）、推理八步互动训练器 11 项（M1~M11：会话创建/步骤推进/行为记录/多假设/反证识别/迁移识别/过早判断/修正失败/七维掌握/错因接入）、ID 命名与数据兼容（L1~L3）、毕业试炼总数兼容（K）。

---

## 10. UI 真实体验验收

> 用户要求"必须在浏览器真实操作，至少人工验证 Test A~H"。本会话浏览器自动化工具调用返回 `IDE Command timeout`，无法完成真人点选；因此如实区分「静态/代码核实」与「真机人工验收」，二者不混为一谈。

| 能力 | 代码实现与链路（静态核实） | 真机人工验收 |
|---|---|---|
| 教材可体验 | YES（read / think 单元，先想再讲） | 待用户真机点选 |
| 练习可体验 | YES（multi_choice，提交后给解释） | 待真机 |
| 案例可体验 | YES（case_analysis → ReasoningPlayer） | 待真机 |
| 八步可体验 | YES（ReasoningPlayer 八步交互） | 待真机 |
| 错误恢复可体验 | YES（推理复盘 + 再试一次，非判错） | 待真机 |
| 迁移可体验 | YES（单元 9 换场景选择题） | 待真机 |
| 复习可体验 | YES（ReviewEngine 队列按对错调整） | 待真机 |
| 掌握可体验 | YES（MasteryEngine 多维证据） | 待真机 |

**用户是否真的完成了一堂课？** 代码链路层面，一条完整「教材→练习→案例→八步→迁移→复习→掌握」可被顺序走完（10 单元前置链完整、构建通过）；但"人能坐下来学完 20~30 分钟不迷路"的体感只能由真人真机验证，本会话无法断言。开发服务器已启动于 `http://localhost:5174/#/journey/stage5/ch-s5-m2-c1`，可直接打开逐项对照 Test A~H。

---

## 11. 六个关键验收问题（诚实作答）

1. **零基础用户能否从页面开始连续学 20~30 分钟不迷路？** —— 结构上成立：有章节进度条、当前单元标题、「为什么是现在」、前置链线性推进。但连续学习中是否真不迷路属于真机体感，本会话无法验证（标记：结构成立、真机待验）。

2. **有没有真正"自己想过"而非一直点下一步？** —— 设计上强制：`think` 单元先想再看引导；`explain` 需自写文本（≥3 字才可继续）+ 结构自检；八步每步都有提交门槛（`disabled`），无一键跳过通道。是否"真的想"仍需真人验证。

3. **答错后系统是否帮助理解为什么？** —— 是。选择题答错给解释（非 ❌）；八步每步给"教学反馈"；推理复盘给 `rootCause` + `targetedPractice` + 参考路径。

4. **是否经历反证和修正？** —— 是。Step 5 反证时刻（强制自由文本）、Step 6 新线索出现后「继续 / 修改 / 暂不确定」，记录 revision。

5. **换新案例能否重新应用？** —— 是。单元 9 迁移换场景，强制回到"方向"这把尺子；`settleReasoningOutcome` 对涉及节点写 transfer 场景校验。

6. **系统是否根据错误改变下一步学习？** —— **已接入但非完全动态改道**：错因写入 MistakeEngine、复习时间由 ReviewEngine 调整、`coachDecision` 结算后基于真实错因展示「下一步安排」、过早判断/单点下结论时插入「慢下来微训练」并暂停迁移。尚未做的是"打断当前章节、跳转到独立微训练模块"这一级（当前是章节内停顿 + 定向建议 + 再试一次）。

---

## 12. 最终判定

**Phase 1.5 的三层（数据 / 引擎 / UI）均已实现，但"真机人工验收"这一硬项未完成，不虚报"完全通过"。**

已通过（静态核实 + 构建）：上一轮 4 短板（中医是什么 10 层、第五境 Layer A 教材、八步引擎、ID 统一）+ 本轮 UI 交互层（课程播放器 + 学习单元播放器 + 八步推理 + 教练接入）全部落地；TypeScript 0 错误、production build 成功（108 modules）、148/148 测试（上轮）、数据/组件/引擎链路经代码检索逐一核实。

诚实告缺：① 真机人工点选验收（Test A~H）因本会话浏览器工具不可用未完成；② 自由文本解释质量在无 LLM 下仍只能做结构自检（既定架构，非偷工）；③ 教练是规则化反馈而非读懂内容（既定架构）；④ 教练"动态改道到独立微训练模块"未做（当前为章节内停顿 + 定向建议）。

**结论：不进入 Phase 2、不扩充其他境界。** 下一步动作是请用户在真机浏览器走一遍 `http://localhost:5174/#/journey/stage5/ch-s5-m2-c1`（或本地 `npm run dev`），逐项完成 Test A~H；任一项体感不达标，按第 11 节清单回补后复验。