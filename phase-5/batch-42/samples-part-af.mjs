// ============================================================
// 杏林大典 · Phase 5 · Batch-42 · 样本 Part AF（AF 循证医学·科研方法 7 节点 pb42-af-001 ~ pb42-af-007）
// 学科：AF 科研·证据；覆盖：临床实践指南制定与评价/GRADE证据分级与推荐强度/
//       系统评价与Meta分析解读/异质性与发表偏倚/非劣效与等效设计/
//       真实世界研究/中医药循证评价特殊性
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'theory'；title 一律「循证·」或「科研·」式
// facts sourceTitle 限定：《循证医学》规划教材 /《临床流行病学》规划教材 /《医学统计学》规划教材
// classics 一律留空数组（现代循证学科无权威经典原文）
// dosage 一律 null；safety.note 统一「循证与科研方法知识学习，不构成诊疗建议或研究伦理意见」
// 难度分布：简单 2（006/007）/ 中等 2（001/003）/ 困难 2（002/005）/ 易混综合 1（004 易混淆）
// ============================================================

export const PART_AF = [
  // ============================================================
  // AF 循证医学·科研方法 · 指南与证据分级（001–002）
  // ============================================================
  {
    id: 'pb42-af-001', title: '循证·临床实践指南制定与评价', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['临床实践指南', '指南制定', 'AGREE II', '推荐强度', '指南更新'],
    intent: '掌握临床实践指南的制定流程与AGREE II评价要点，理解指南的适用性限定与更新要求。',
    facts: [
      { field: 'theory.指南定义与功能', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.指南制定流程', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.AGREE II评价领域', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.证据分级与推荐形成', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
      { field: 'theory.指南更新与适用', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '临床实践指南是针对特定临床问题系统评价证据后形成的推荐意见集，制定须经历范围界定、多学科组队、证据合成、推荐形成与外部评审环节。AGREE II以范围与目的、参与人员、严谨性、清晰性、应用性、编辑独立性六大领域评价指南质量。指南须定期更新，应用前应核对其年限与适用人群。',
    coreDefinition: '临床实践指南是针对特定临床问题、在系统评价证据基础上形成推荐意见、供医患共同决策的参考文书。',
    safety: { note: '循证与科研方法知识学习，不构成诊疗建议或研究伦理意见', prohibitions: ['不构成诊疗建议', '指南推荐不得脱离适用人群与更新时效直接套用'] },
    learning: {
      knowledge: '主题要点：指南是把证据转化为推荐意见的桥梁。核心概念：PICO界定、多学科专家组、证据确定性、AGREE II六大领域评价。实践要点：应用前评价方法学质量与更新状态。注意事项：指南面向群体，个体决策须结合患者意愿。',
      misjudgment: '把指南当作「照抄执行的标准答案」。错：指南质量参差、面向群体平均，未做AGREE II评价与适用性核对就机械照搬，可能把过时或质量差的推荐误用于个体。',
      reasoning: '同一临床问题，为何不同国家指南可能给出相反的推荐？',
      feedback: '证据解读、价值取向与卫生资源差异都会改写推荐，应用前须核对证据等级与人群适用性。',
      transfer: '拿到一份针灸诊疗指南，试按AGREE II的六大领域逐一评估其质量。',
    },
  },
  {
    id: 'pb42-af-002', title: '循证·GRADE证据分级与推荐强度', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['GRADE', '证据确定性', '降级因素', '升级因素', '推荐强度'],
    intent: '掌握GRADE证据确定性的升降级规则与推荐强度的判定依据，理清证据与推荐的分工关系。',
    facts: [
      { field: 'theory.证据确定性四档', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.GRADE五项降级因素', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.GRADE升级因素', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.推荐强度分级', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
      { field: 'theory.推荐决策影响因素', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: 'GRADE将证据确定性分为高、中、低、极低四档，按偏倚风险、不一致性、间接性、不精确性与发表偏倚五项因素降级，按效应量很大、剂量反应关系、负偏倚压低真实效应三项因素升级。推荐强度分强与弱两级，判定不只看证据确定性，还要权衡利弊平衡、患者价值观偏好与资源消耗，弱推荐尤须医患协商。',
    coreDefinition: 'GRADE是国际通用的证据分级与推荐体系，以证据确定性四档定级，以利弊与价值观等定推荐强弱的动态框架。',
    safety: { note: '循证与科研方法知识学习，不构成诊疗建议或研究伦理意见', prohibitions: ['不构成诊疗建议', 'GRADE定级须逐项说明升降级理由，不得含糊带过'] },
    learning: {
      knowledge: '主题要点：衡量证据可信度与推荐力度。核心概念：确定性高/中/低/极低四档，五项降级（偏倚风险、不一致性、间接性、不精确性、发表偏倚）与三项升级（大效应量、剂量反应、负偏倚），推荐分强弱两级。注意事项：弱推荐也须结合患者意愿执行。',
      misjudgment: '把弱推荐读成「证据太差、不该用」。错：弱推荐多因证据确定性不足或利弊接近，仍是有条件推荐，须结合患者意愿与临床情境决定取舍。',
      reasoning: '为何源于观察性研究的证据在GRADE下也可能被升级为高确定性？',
      feedback: '效应量很大、存在剂量反应且负偏倚可能压低真实效应时，观察性证据可以升级。',
      transfer: '一条中药RCT证据降级至中确定性，试列出最可能的降级因素并说明理由。',
    },
  },
  // ============================================================
  // AF 循证医学·科研方法 · 证据解读（003–004）
  // ============================================================
  {
    id: 'pb42-af-003', title: '循证·系统评价与Meta分析解读', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['系统评价解读', 'AMSTAR', '森林图', '置信区间', '敏感性分析'],
    intent: '掌握对已发表系统评价与Meta分析进行批判性解读的步骤与要点，学会判断结论可信度。',
    facts: [
      { field: 'theory.解读总体框架', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.AMSTAR方法学评价', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.森林图与CI解读', sourceType: 'textbook', sourceTitle: '《医学统计学》规划教材', status: 'verified' },
      { field: 'theory.亚组与敏感性分析', sourceType: 'textbook', sourceTitle: '《医学统计学》规划教材', status: 'verified' },
      { field: 'theory.合并证据分级', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '解读系统评价先核方案是否预先注册、检索是否完整、偏倚风险评估是否到位，再判断异质性处理与合并模型是否恰当。森林图看各研究效应量与置信区间（CI）是否跨无效线，亚组分析与敏感性分析检验结论稳健性，最后用GRADE对合并证据定级。任一环节失守，合并结果都可能失真。',
    coreDefinition: '系统评价解读是按注册、检索、评价、合并、分级五个环节核查一篇Meta分析的方法学质量与结论可信度的过程。',
    safety: { note: '循证与科研方法知识学习，不构成诊疗建议或研究伦理意见', prohibitions: ['不构成诊疗建议', '不得只读合并结果而略过方案注册与质量评价环节'] },
    learning: {
      knowledge: '主题要点：解读是循证阅读的基本功。核心概念：方案注册、检索完整性、AMSTAR方法学评价、森林图CI与无效线、亚组分析、敏感性分析。实践要点：按流程核查再信结论，不只看合并菱形。注意事项：纳入研究质量决定合并质量，稳健性差时结论须保留。',
      misjudgment: '看见合并菱形不跨无效线就断定「疗效确切」。错：还需核查纳入研究质量、异质性与发表偏倚，稳健性不足时该结论可能被敏感性分析推翻。',
      reasoning: '为什么两篇针对同一问题、结论却相反的Meta分析可能都方法学合格？',
      feedback: '检索时限、纳入标准与统计模型不同可产生分歧，解读须回溯原始研究与方案而非只看合并图。',
      transfer: '评估一篇复方中药Meta分析，试按注册、检索、质量、稳健性四步写解读清单。',
    },
  },
  {
    id: 'pb42-af-004', title: '循证·异质性与发表偏倚', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['异质性', 'I²指数', '固定效应模型', '随机效应模型', '发表偏倚', '漏斗图'],
    intent: '区分异质性类型与发表偏倚的表现，掌握I²解读、效应模型选择与漏斗图判断的易错点。',
    facts: [
      { field: 'theory.异质性类型', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.I²指数含义', sourceType: 'textbook', sourceTitle: '《医学统计学》规划教材', status: 'verified' },
      { field: 'theory.效应模型选择', sourceType: 'textbook', sourceTitle: '《医学统计学》规划教材', status: 'verified' },
      { field: 'theory.发表偏倚机制', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.漏斗图与检验', sourceType: 'textbook', sourceTitle: '《医学统计学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '异质性分临床、方法学与统计学三类，I²指数大于50%提示实质异质性。处理策略有亚组分析、Meta回归、敏感性分析与换用随机效应模型，异质性过大且无法解释时应放弃合并。发表偏倚使阳性研究更易发表，漏斗图不对称是提示信号，但低质量研究与真实异质性亦可致不对称，须结合Egger检验。',
    coreDefinition: '异质性指纳入研究效应差异超出抽样波动的部分，以I²量化；发表偏倚指结果影响发表与否导致的证据系统失真。',
    safety: { note: '循证与科研方法知识学习，不构成诊疗建议或研究伦理意见', prohibitions: ['不构成诊疗建议', '漏斗图不对称不得直接断言发表偏倚，须结合检验与质量核查'] },
    learning: {
      knowledge: '主题要点：异质性决定能否合并，发表偏倚威胁结论。核心概念：三型异质性、I²指数（>50%提示实质异质性）、固定/随机效应模型、漏斗图与Egger检验。实践要点：先查异质性再选模型。注意事项：I²高不等于必须放弃，可先探源。',
      misjudgment: '以为漏斗图不对称就等于「实锤」发表偏倚。错：小样本低质量研究与真实异质性同样可致不对称，须结合Egger检验与纳入研究核查综合判断，单凭图形会误判。',
      reasoning: '同一组研究，为什么换用随机效应模型后合并CI明显变宽？',
      feedback: '随机效应模型把研究间方差计入误差，异质性越大CI越宽，提示合并结果不确定。',
      transfer: '一篇推拿Meta分析I²达68%，试拟定亚组分析的分组变量并预测其作用。',
    },
  },
  // ============================================================
  // AF 循证医学·科研方法 · 研究设计（005–006）
  // ============================================================
  {
    id: 'pb42-af-005', title: '科研·非劣效与等效设计', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['非劣效设计', '等效设计', '界值', '置信区间', '意向性分析'],
    intent: '掌握非劣效与等效设计的目的、界值设定与置信区间判定法，区分其与优效检验的差异。',
    facts: [
      { field: 'theory.非劣效设计目的', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
      { field: 'theory.非劣效界值设定', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
      { field: 'theory.置信区间判定法', sourceType: 'textbook', sourceTitle: '《医学统计学》规划教材', status: 'verified' },
      { field: 'theory.非劣效与优效区别', sourceType: 'textbook', sourceTitle: '《医学统计学》规划教材', status: 'verified' },
      { field: 'theory.ITT与PP分析', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '非劣效设计验证新干预疗效不低于标准治疗预设界值δ，等效设计则要求效应差落入对称的双侧区间。判定以效应差值的95%置信区间为准：区间下限高于-δ而非劣效成立，而非看P值是否小于0.05。界值须在试验前基于标准治疗效应设定，非劣效试验样本量通常更大，ITT与PP分歧时须谨慎解释。',
    coreDefinition: '非劣效与等效设计是预设界值、以置信区间法验证新干预疗效不劣于或等同于标准治疗的临床试验设计。',
    safety: { note: '循证与科研方法知识学习，不构成诊疗建议或研究伦理意见', prohibitions: ['不构成诊疗建议', '非劣效界值须预设并申报，不得事后放宽以迁就结论'] },
    learning: {
      knowledge: '主题要点：回答新干预「不比标准差多少」。核心概念：单侧界值δ、双侧等效区间、效应差95%CI与界值比较、ITT与PP分析。实践要点：界值试验前设定，CI下限高于-δ判非劣效。注意事项：P>0.05不等于非劣效，样本量常大于优效试验。',
      misjudgment: '把「两组差异无统计学意义」当作「证明非劣效成立」。错：P>0.05可能只是检验效能不足，非劣效须看效应差CI是否完全高于-δ，两条判据概念不同。',
      reasoning: '为什么非劣效试验常比优效试验需要更大的样本量？',
      feedback: '要在界值内「证实」不劣需要更窄的CI，精度要求高，样本量随之增大。',
      transfer: '某中药欲证明疗效不逊于标准西药但副作用更小，试确定设计类型与界值来源。',
    },
  },
  {
    id: 'pb42-af-006', title: '科研·真实世界研究', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['真实世界研究', '真实世界数据', '电子病历', '倾向性评分', '工具变量'],
    intent: '掌握真实世界研究的数据来源、设计与混杂控制要点，理解其与RCT的证据地位差异。',
    facts: [
      { field: 'theory.真实世界研究定义', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
      { field: 'theory.真实世界数据来源', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.与传统RCT差异', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
      { field: 'theory.混杂控制方法', sourceType: 'textbook', sourceTitle: '《医学统计学》规划教材', status: 'verified' },
      { field: 'theory.应用场景与局限', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '真实世界研究依托电子病历、医保数据库、疾病登记系统等常规收集数据，在真实诊疗环境中评价干预效果与安全性，入选宽松、样本量大、外推性好，但缺乏随机化使混杂与选择偏倚突出，常以倾向性评分匹配、工具变量、多因素校正控制。它补充RCT证据、服务药物警戒，却不能替代随机化对因果的保障。',
    coreDefinition: '真实世界研究是运用常规诊疗数据、贴近真实临床环境评价干预效果与安全性的研究，以观察性设计为主。',
    safety: { note: '循证与科研方法知识学习，不构成诊疗建议或研究伦理意见', prohibitions: ['不构成诊疗建议', '真实世界数据分析须遵守数据隐私与使用规范'] },
    learning: {
      knowledge: '主题要点：用真实诊疗数据补RCT之短。核心概念：真实世界数据（电子病历、医保库、登记系统）、实用试验、倾向性评分匹配（PSM）、工具变量。实践要点：明确数据来源与纳入标准，报告缺失与混杂校正。注意事项：大样本不消除系统误差，因果解释须谨慎。',
      misjudgment: '以为真实世界研究数据量大、证据等级就高。错：样本量解决不了系统误差，缺乏随机化带来的混杂与选择偏倚使其证据等级一般低于RCT。',
      reasoning: '真实世界数据库如此庞大，为何其因果结论仍须谨慎解读？',
      feedback: '相关不等于因果，混杂、信息缺失与选择性记录会扭曲关联，须校正后谨慎下结论。',
      transfer: '拟用医院信息系统评价某院内制剂的长期安全性，试拟定可行设计并指出数据要点。',
    },
  },
  // ============================================================
  // AF 循证医学·科研方法 · 中医药循证（007）
  // ============================================================
  {
    id: 'pb42-af-007', title: '循证·中医药循证评价特殊性', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['辨证论治', '个体化', '复合干预', '安慰剂对照', '证候结局', '实用试验'],
    intent: '理解辨证论治个体化、复合干预与证候结局对标准循证评价的挑战及适应性设计选择。',
    facts: [
      { field: 'theory.辨证个体化特点', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.复合干预评价难点', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
      { field: 'theory.安慰剂与盲法困难', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
      { field: 'theory.证候结局指标问题', sourceType: 'textbook', sourceTitle: '《循证医学》规划教材', status: 'verified' },
      { field: 'theory.适应性设计选择', sourceType: 'textbook', sourceTitle: '《临床流行病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '中医药循证评价须直面辨证论治的个体化、方药随证加减与复合干预并存等特征，标准化试验与个体化实践存在张力。安慰剂在气味外观上难模拟、盲法难维持，证候类结局缺乏公认标准；宜以实用性随机对照试验、真实世界研究与N-of-1设计补充传统RCT，并在证据分级时给专家经验以合理权重。',
    coreDefinition: '中医药循证评价特殊性指辨证个体化、复合干预、证候结局等特征使标准证据评价方法须作适应性调整。',
    safety: { note: '循证与科研方法知识学习，不构成诊疗建议或研究伦理意见', prohibitions: ['不构成诊疗建议', '不得以「个体化」为由拒绝证据评价，也不得用未经评价的经验替代证据'] },
    learning: {
      knowledge: '主题要点：为辨证论治寻找可检验路径。核心概念：辨证个体化、复合干预归因困难、安慰剂与盲法难题、证候结局标准化、实用性RCT、N-of-1设计。实践要点：按问题选择设计，明确证候判定标准。注意事项：个体化不等于不可检验，拒绝研究等于放弃证据。',
      misjudgment: '以为「辨证论治个体化」可以豁免随机对照检验。错：个体化方案可通过实用性试验、分层随机与N-of-1设计加以考察，拒绝检验等于放弃证据。',
      reasoning: '针灸试验中的「假针灸」对照，真能剥离安慰效应吗？',
      feedback: '期望、得气感等非特异效应难以完全分离，假针刺也非完全无效，解读效应量须留有余地。',
      transfer: '评价一套辨证论治的中药汤剂方案，试选择兼顾个体化的设计与证候结局指标。',
    },
  },
];
