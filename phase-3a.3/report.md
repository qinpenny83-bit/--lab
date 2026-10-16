# Phase 3A.3 最终收口报告

seed = 20260920 · label = phase-3a.3-targeted-closure · total = 6 样本

判定：**candidate 4 / conditional 1 / quarantine 2**。三个 conditional 全部闭合，E/F/G 无新增结构性问题。

---

## 一、3 个 conditional 出处闭合

| 节点 | 锚点 | 原错误出处 | 权威出处（补 provenance） | 闭合后分类 | 结论 |
| --- | --- | --- | --- | --- | --- |
| 半夏 | 十八反歌 | 误标《中国药典》一部 | 金·张子和《儒门事亲》［$TRAE_REF］(https://szyyj.gd.gov.cn/zyyfw/ysbj/content/post_4041482.html) | traditional_commentary / teaching_inference | candidate |
| 合谷 | 四总穴歌 | 误标《针灸大成》 | 明·徐凤《针灸大全》［$TRAE_REF］(http://dianda.cqvip.com/Qikan/Article/Detail?id=45002634) | traditional_commentary / teaching_inference | candidate |
| 阴阳 | 阴阳者天地之道也 | 白名单缺口（保守降级） | 《素问·阴阳应象大论》补入白名单 | classic_original / verified | candidate |

闭合原则执行情况：

- 十八反歌、四总穴歌均确证了**首出处的权威、可追溯起源**，不再「须核验」；两者本质是后世**歌诀**（口诀），按 Phase 2.5 封板口径归类为 traditional_commentary、封顶 teaching_inference，**未强行升 verified**。
- 「阴阳者，天地之道也」为《素问·阴阳应象大论》**原文**，属 classic_original，按口径授予 verified。
- 未删除任何 conditional、未修改三值白名单标准、未由 LLM 猜出处。

---

## 二、E 门证据强度分层校准

C3 证据按 7 层归类：症状事实 / 舌脉体征 / 病史时间线 / 检验客观指标 / 经典依据 / 方药反应 / 其他支持证据。

判定规则（只校准分类，不降安全边界）：

- 证据 ≥ 2 条；存在套话 → 拦截（不变）。
- **全部证据均为「症状事实」单层 → 拦截**（症状存在 ≠ 足以支撑具体证候结论）。
- 症状 + 任一第二独立证据（舌脉/体征、检验、经典、方药等）→ 放行。

2 个回归结果：

| 样本 | 证据 | 分层 | 结果 |
| --- | --- | --- | --- |
| pa33-e-01 | 入睡困难、多梦易醒；胸闷心慌、时有头晕 | 1·症状 + 1·症状 | quarantine（只有症状，确实不足） |
| pa33-e-02 | 入睡困难、多梦易醒；舌淡红、苔薄白、脉弦细 | 1·症状 + 2·舌脉 | candidate（症状 + 第二独立证据） |

同时修正了 isFiller 的「短句即空泛」误判：不再用长度卡短句，套话与否只看套话模式，因此「胸闷如窒」「入睡困难」这类具体症状被正确视为一层证据，而非空泛。

---

## 三、F/G 人工复核机制

- F：counterEvidence 必须带转折/否定/对立征象，否则拦截 —— 不变。
- G：revision 必须实质回应反证、重新限定原判断 —— 不变。
- 新增 `human_review_required`：C4 案例**通过 F/G 后**仍标记人工复核，**不自动放行**（正则只能排除明显弱项，无法确证「真削弱/真回应」）。

抽检结果：

| 样本 | 反证/修正 | 结果 |
| --- | --- | --- |
| pa33-fg-01 | 真实反证 + 有效修正 | conditional（F/G 通过 + human_review_required） |
| pa33-fg-02 | 反证与判断无关 + 修改未回应 | quarantine（F + G 拦截） |

---

## 四、Phase 3B Readiness Audit

### Gate 1：来源可信度

| 问题 | 结论 | 依据 |
| --- | --- | --- |
| 未知出处是否默认降级 | 是 | 来源解析/知识分类对无白名单记录、无 sourceTitle 者降级为 pending/teaching_inference |
| 是否存在生成器自由猜出处 | 否 | 只按 `CLASSIC_ATTRIBUTION` 查表纠偏或降级，无猜测分支 |
| 是否存在非法来源枚举 | 否 | `FACT_SOURCE_TYPES` / `VERIFICATION_STATUSES` 白名单 + Gate A 硬拦 |
| 是否存在来源缺失进入 candidate | 否 | 缺 sourceTitle 补「待核验」降级 pending，Gate A 拒绝空出处 |

### Gate 2：知识边界

| 问题 | 结论 |
| --- | --- |
| classic_verified 是否只来自权威来源 | 是，verified 仅授予药典/国标/经典原文/教材/高校课纲 |
| historical/textbook/clinical/teaching_inference 是否隔离 | 是，traditional_commentary / modern_interpretation / teaching_design 封顶 teaching_inference |
| 是否存在知识层级冒充 | 否，Gate K 拦截教学概括/后世说法伪装经典原文 |

### Gate 3：剂量

| 问题 | 结论 |
| --- | --- |
| 原典/历史/现代/临床是否完全分层 | 是，originalDosage 与 modernDosage 分离 |
| 是否存在自动折算 | 否，原典「两/钱/枚」配克数时剥离克数折算 |
| 无来源现代剂量是否被摘除 | 是，modernSourceVerified 不成立时摘除 modernDosage |

### Gate 4：状态

| 问题 | 结论 |
| --- | --- |
| verified/pending/quarantine 是否单向 | 是，仅存在降级（按来源类型封顶），无自动升级分支 |
| 是否存在自动越级 | 否，源头层封顶 + Gate D 拦截教学/现代解释升 verified |

### Gate 5：安全

| 问题 | 结论 |
| --- | --- |
| 高危药物/禁针/特殊人群/剂量风险 是否有独立隔离机制 | 是，Layer 4 安全红线独立注入 `BANNED_HERBS` / `FORBIDDEN_ACUPOINTS`，Gate J 兜底 |

说明：当前红线目录覆盖已禁用药材（关木通/广防己/青木香/马兜铃）与禁针/孕妇禁针穴（三阴交/合谷/关元），为**固定清单**。Phase 3B 扩容到 50 节点时，特殊人群（妊娠/儿童/肝肾功能不全）与更多高危药物仍需**出处方**扩充目录，而非由生成器推断。

### Gate 6：推理

| 问题 | 结论 |
| --- | --- |
| C3 evidence 是否语义放水 | 否，症状单层不足以支撑结论，须第二独立证据 |
| C4 counterEvidence 是否语义放水 | 否，须带对立征象且真正削弱；通过后仍须人工复核 |
| revision 是否语义放水 | 否，须实质回应反证并重新限定；通过后仍须人工复核 |

### Gate 7：生产独立性（最重要）

结论：**已解耦**。

「生成器生成什么」与「Gate 认为是否正确」来自不同的规则/证据来源：

- 生成器产出的是**带自然失败模式的原始候选**（出处想当然、剂量折算、三值手填越级、教学术语冒充原文、禁用内容自觉缺失）。
- 管线的源头修复（L1–L6）读取的是**独立于生成器的权威目录**（`CLASSIC_ATTRIBUTION` 白名单、`MAX_STATUS_BY_SOURCE_TYPE`、`BANNED_HERBS`、`FORBIDDEN_ACUPOINTS`）。生成器不读这些目录，目录也不由生成器生成。
- Gate A–K 是最后的**不变式兜底**，判定依据仍是同一套独立目录，与生成器输出无自洽反馈。

即：不存在第一轮那种「生成器用布尔 flag 预埋缺陷、门禁读同一 flag 反射式检测」的自洽循环。目录是冻结的、由出处方维护的事实源；生成是其对立面。

---

## 五、停止条件与后续

Phase 3A.3 完成，3 个 conditional 全部闭合，E/F/G 无新增结构性问题。**推演到此停止，未进入 Phase 3B，未自动生产 50 节点。**

Phase 3B 第一批（50 节点 × 草药/方剂/穴位/理论/临床各 10）须在**人工确认「Phase 3B 准入」之后**方可执行；执行时目录（白名单/红线）须由出处方随内容同步扩充，继续完整走「来源→事实→分类→教学→推理→安全→去重→Gate→candidate/quarantine」并保留完整 trace。