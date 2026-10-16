// ============================================================
// 🌿 杏林大典 · Phase 2 —— Canonical Knowledge Object Schema
// ============================================================
// 目标：定义「一个可以被持续学习 / 练习 / 记忆 / 辨析 / 迁移」
//       的完整知识对象（而非「一个标题 + 一段解释」）。
//
// 设计原则：
//   1. 身份可唯一定位（canonicalId 统一标识）
//   2. 核心知识必须达到 A6（辨析）~ A8（综合），不得停在「知道是什么」
//   3. 经典内容四层可追溯（原文 → 词句 → 传统解释 → 现代教学解释）
//   4. 剂量 / 方剂组成 / 穴位定位必须带来源，禁止推测
//   5. 每个对象至少 C1/C2/C3/C4 四层案例，核心知识不得只有一道选择题
//   6. 记忆分级（必须背 / 应当记 / 只理解 / 以用为先）+ 背诵训练字段
//
// 边界：本 Schema 及所有样例均为教育性学习素材，不构成任何医疗诊断、
//       治疗或用药建议。禁止引导使用者自行针刺或自行用药。
// ============================================================

// ============================================================
// 零、知识对象类型（12 类）
// ============================================================
export type KnowledgeObjectType =
  | 'theory'            // 理论（阴阳、气血、脏腑等）
  | 'diagnostic'        // 诊断（舌诊、脉诊、望诊等）
  | 'herb'              // 中药
  | 'formula'           // 方剂
  | 'meridian'          // 经络
  | 'acupoint'          // 腧穴
  | 'classic'           // 经典原文
  | 'clinical'          // 临床证候 / 病机
  | 'case'              // 案例
  | 'medicalChinese'    // 医古文
  | 'physicianSchool'   // 各家学说
  | 'modernMedicine';   // 现代医学基础

// ============================================================
// 一、深度阶梯（L1–L12 与 A1–A12 一一对应）
// ============================================================
// 说明：`A1..A12` 用于「评级」（这个对象达到哪一级 / 要求到哪一级），
//       深度阶梯本身即为 12 级。核心知识不得停留在 A1–A4。
//       硬门槛：核心知识必须达到 A6（辨析）及以上，样板要求 A6–A8。
export const DEPTH_LEVELS = [
  'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12',
] as const;

export type DepthLevel = (typeof DEPTH_LEVELS)[number];

export interface DepthRung {
  level: DepthLevel;
  /** 该级能力名 */
  label: string;
  /** 该级要回答的核心问题（学习目标） */
  objective: string;
}

export const DEPTH_LADDER: readonly DepthRung[] = [
  { level: 'A1', label: '认识', objective: '叫得出名称、认得它是谁' },
  { level: 'A2', label: '理解', objective: '知道它的定义与基本含义' },
  { level: 'A3', label: '解释', objective: '能用自己的话说明它' },
  { level: 'A4', label: '关联', objective: '知道它与相关概念的联系' },
  { level: 'A5', label: '比较', objective: '能区分易混概念' },
  { level: 'A6', label: '辨析', objective: '能放进案例中做出区分与判断' },
  { level: 'A7', label: '迁移', objective: '换一个情境仍能做出判断' },
  { level: 'A8', label: '综合', objective: '跨概念整合，解释清楚「为什么」' },
  { level: 'A9', label: '批判', objective: '主动寻找反证与适用边界' },
  { level: 'A10', label: '创造', objective: '能提出自己的解释或组方思路' },
  { level: 'A11', label: '传授', objective: '能完整教会别人' },
  { level: 'A12', label: '精通', objective: '能在陌生复杂情境中稳定运用' },
];

/**
 * 将 DepthLevel 转为其在阶梯中的序号（A1=1, A6=6, ... A12=12）。
 * 用于验收自动化判断「是否达到 A6 及以上」。
 */
export function depthOrdinal(level: DepthLevel): number {
  const index = DEPTH_LEVELS.indexOf(level);
  return index < 0 ? 0 : index + 1;
}

// ============================================================
// 一点五、来源与事实审校层（Phase 2.5 新增）
// ============================================================
// 目的：对每一个「容易产生事实错误」的字段，记录其来源证据与核验状态，
//       保证剂量 / 经典原文 / 穴位定位 / 药性等可追溯，禁止推测。
export type FactSourceType =
  | 'pharmacopoeia'          // 药典
  | 'national_standard'      // 国家标准
  | 'classic_original'       // 经典原文（必须逐字 + 精确出处，verified）
  | 'textbook'               // 教材（须标注版本/章节）
  | 'university_curriculum'  // 高校培养方案/课程大纲
  | 'traditional_commentary' // 传统解释（注家、历代医家）
  | 'modern_interpretation'  // 现代解释
  | 'teaching_design';       // 产品教学解释（不得伪装成经典原义）

export type VerificationStatus =
  | 'verified'           // 已逐字/精确核验
  | 'pending'            // 待核验，不得进入背诵
  | 'teaching_inference'; // 教学推断，非权威结论

export interface FactEvidence {
  factId: string;
  /** 字段名，如 'dosage.modernTeachingDosage' / 'classic.originalText' */
  field: string;
  /** 该字段当下采信的值 */
  value: string;
  sourceType: FactSourceType;
  sourceTitle: string;
  sourceEdition?: string;
  sourceChapter?: string;
  sourceLocation?: string;
  verificationStatus: VerificationStatus;
  reviewerNote?: string;
}

export interface ContentFactAudit {
  facts: FactEvidence[];
}

// ============================================================
// 二、案例等级（C1 – C4）
// ============================================================
export const CASE_LEVELS = ['C1', 'C2', 'C3', 'C4'] as const;
export type CaseLevel = (typeof CASE_LEVELS)[number];

export const CASE_LEVEL_LABEL: Record<CaseLevel, string> = {
  C1: '基础（直接验证核心知识）',
  C2: '对比（验证易混概念辨析）',
  C3: '变式（改变部分条件）',
  C4: '迁移（换一个完全不同情境）',
};

export interface CaseOption {
  id: string;
  text: string;
  correct: boolean;
  /** 为什么对 / 为什么错（对错都要讲清，不是只给答案） */
  why: string;
}

/** Phase 2.5：证据推理结构（C3/C4 必须支持，C3 起不得仅靠选择题） */
export interface FreeReasoning {
  /** 标准判断（系统展示的对照结论） */
  standardJudgment: string;
  /** 核心证据（至少 2 条） */
  coreEvidence: string[];
  /** 常见误区 */
  commonPitfalls: string[];
  /** 是否要求学习者给出「反证」（什么信息会推翻当前判断） */
  requireCounterEvidence: boolean;
  /** 是否要求「新证据后修正判断」 */
  requireRevision: boolean;
}

export interface KnowledgeCase {
  id: string;
  level: CaseLevel;
  title: string;
  /** 情景（C4 必须是完全不同的情境） */
  scenario: string;
  /** 追问 / 题目 */
  question: string;
  options: CaseOption[];
  /**
   * Phase 2.5：自由推理结构。
   * 硬规则：C1 可只选择题；C2 选择+为什么；C3 自由判断+至少两证据；
   *         C4 完整推理（判断→证据→反证→新信息→修正）。
   */
  freeReasoning?: FreeReasoning;
  /** 解答讲解（说明正确推理路径） */
  explanation: string;
  /** 一句话带走 */
  takeaway: string;
  /** 本案例关联的辨析点 / canonicalId */
  relatesTo: string[];
}

// ============================================================
// 三、身份（A. 身份）
// ============================================================
export interface KnowledgeIdentity {
  /** 局部唯一 id（黄金样板用 gs- 前缀，如 'gs-yin-yang'） */
  id: string;
  /** 全局规范 id（'ck-' 前缀，如 'ck-yin-yang'） */
  canonicalId: string;
  type: KnowledgeObjectType;
  /** 学科 / 知识领域，如 '中医基础理论' */
  domain: string;
  /** 子领域，如 '阴阳学说' */
  subdomain: string;
  /** 章节，如 '第一境 · 阴阳' */
  chapter: string;
  /** 单元，如 '阴阳是什么' */
  unit: string;
  title: string;
  aliases: string[];
}

// ============================================================
// 四、学习定位（B. 学习定位）
// ============================================================
export type ImportanceLevel = 'core' | 'support' | 'extended' | 'reference';

export interface MasteryTarget {
  /** 本对象要求达到的最低深度（核心知识不得低于 A6） */
  requiredDepth: DepthLevel;
  /** 必须覆盖的案例等级 */
  requiredCases: CaseLevel[];
  /** 是否要求迁移验证（换情境仍能判断） */
  transferRequired: boolean;
  /** 掌握判据（人类可读，可被验收自动检查的结构化描述） */
  masteryCriterion: string;
}

export interface LearningPosition {
  /** 学习阶段，如 'stage1' 或 '第一境' */
  learningStage: string;
  /** 前置知识 canonicalId 列表 */
  prerequisites: string[];
  /** 难度 1–5 */
  difficulty: 1 | 2 | 3 | 4 | 5;
  importance: ImportanceLevel;
  /** 本对象内容实际达到的深度等级（A1–A12） */
  knowledgeLevel: DepthLevel;
  masteryTarget: MasteryTarget;
}

// ============================================================
// 五、核心内容（C. 核心内容）
// ============================================================
export interface Distinction {
  /** 与什么区分（易混对象 / 概念名） */
  label: string;
  /** 关键差异（一句话，可复述） */
  difference: string;
  /** 最容易混淆的地方 */
  confusionPoint: string;
}

export interface CoreContent {
  /** 一句话理解（小白能读懂） */
  oneLine: string;
  coreDefinition: string;
  /** 结构拆解（内在层次 / 组成） */
  structure: string[];
  /** 机制（「为什么」，对应 A8 综合层） */
  mechanism: string;
  keyPoints: string[];
  /** 辨析点（至少 1 条，核心对象应 ≥2 条） */
  distinctions: Distinction[];
  commonMisunderstandings: string[];
  /** 反直觉点（真正的认知冲突，不是噱头） */
  counterIntuitivePoint?: string;
}

// ============================================================
// 六、深度内容层（D. 深度：L1–L12）
// ============================================================
export interface DepthLayer {
  level: DepthLevel;
  /** 该层教学内容（对应 DEPTH_LADDER 中该层的问题） */
  content: string;
}

// ============================================================
// 七、记忆系统（五、记忆系统）
// ============================================================
export type MemoryCategory = 'mustMemorize' | 'shouldMemorize' | 'understandOnly' | 'applicationFirst';

export interface MemoryTarget {
  id: string;
  text: string;
}

export interface RecallQuestion {
  id: string;
  /** 遮住后要回忆的问题 */
  question: string;
  answer: string;
}

export interface FillBlankItem {
  id: string;
  /** 挖空题干（用「____」表示空） */
  stem: string;
  answer: string;
}

export interface SequenceRecall {
  id: string;
  title: string;
  /** 必须按顺序回忆出的条目 */
  orderedItems: string[];
}

export interface WrittenRecall {
  id: string;
  prompt: string;
  /** 自我对照清单（写完逐条核） */
  checklist: string[];
}

export interface ConfusingPair {
  id: string;
  a: string;
  b: string;
  /** 关键区分（一句） */
  distinction: string;
  /** 记忆钩子 */
  mnemonic?: string;
}

export interface SpacedReviewPlan {
  /** 间隔天数（如 [1, 3, 7, 15, 30]） */
  intervalsDays: number[];
  /** 何时触发提前复习（如「连续 2 次答错」） */
  triggerOnError: string;
  /** 本次复习的回忆提示（遮 → 回忆 → 写 → 对照 → 找错 → 间隔） */
  reviewPrompt: string;
}

export interface MemorySystem {
  /** 必须背诵的内容（文本条目） */
  mustMemorize: string[];
  /** 应当记住的内容 */
  shouldMemorize: string[];
  /** 只需理解、不必背诵的内容 */
  understandOnly: string[];
  /** 以应用为优先、不追求字面背诵的内容 */
  applicationFirst: string[];
  memoryTargets: MemoryTarget[];
  recallQuestions: RecallQuestion[];
  fillBlank: FillBlankItem[];
  sequenceRecall: SequenceRecall[];
  writtenRecall: WrittenRecall[];
  confusingPairs: ConfusingPair[];
  spacedReview: SpacedReviewPlan;
}

// ============================================================
// 八、经典体系（六、经典体系：四层）
// ============================================================
export type ClassicLayerId = 1 | 2 | 3 | 4;

export interface ClassicLayer {
  layer: ClassicLayerId;
  layerName: '原文' | '词句' | '传统解释' | '现代教学解释';
  content: string;
  /** 本层释义的来源（传统解释必须注明来源；词句为训诂义，来源可选） */
  source?: string;
}

export interface ClassicReference {
  id: string;
  /** 原典，如《黄帝内经》 */
  canon: string;
  /** 篇章，如《素问 · 阴阳应象大论》 */
  chapter: string;
  /** 原文（必须逐字可追溯，禁止 AI 编造） */
  originalText: string;
  /** 出处引用（版本 / 卷 / 篇） */
  sourceCitation: string;
  /**
   * Phase 2.5：原文核验状态。
   * verified = 已逐字核验；pending = 本轮无法逐字核验。
   * pending 的原文不得进入「经典背诵内容」。
   */
  verificationStatus?: VerificationStatus;
  /** Phase 2.5：原文事实证据（exact text + exact source） */
  factSource?: FactEvidence;
  /** 四层解释（Layer 4 必须标注「现代教学解释，非原典原意替代」） */
  layers: ClassicLayer[];
  /** 背诵提示（本段原文的背诵重点；pending 原文不应进入背诵） */
  memorizationHint: string;
}

// ============================================================
// 九、安全边界
// ============================================================
export interface SafetyBoundary {
  /** 仅教育用途 */
  educationOnly: boolean;
  /** 不构成医疗诊断 */
  noDiagnosis: boolean;
  /** 针对特定对象的禁止事项（如「禁止引导自行针刺」） */
  prohibitions: string[];
  disclaimers: string[];
}

// ============================================================
// 十、可训练性 / 趣味性（十二、趣味性要求）
// ============================================================
export type InteractionMode =
  | 'materialIdentification'  // 识材局：药材/饮片线索逐步识别
  | 'formulaAssembly'         // 组方局：症候 + 药材池理解配伍
  | 'acupointMapping'         // 识穴局：身体地图找穴
  | 'classicDecode'           // 经文破译：古文→关键词→现代解释
  | 'pathomechanismDetect'    // 病机侦探：症状→关键线索→病机链
  | 'formulaDiscrimination'   // 方剂辨析：两相似方找真正区别
  | 'blindCase'               // 盲案：不给答案自己完整推理
  | 'reversalCase';           // 反转案例：中途新证据要求修正

export interface TrainabilityMeta {
  /** 该对象支持哪些基于知识本身的训练局 */
  supportedModes: InteractionMode[];
  /** 趣味来自哪里（必须是知识本身，而非金币/XP/徽章） */
  funComesFrom: string;
}

// ============================================================
// 十一、基础对象（所有类型共享）
// ============================================================
export interface CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity;
  positioning: LearningPosition;
  core: CoreContent;
  /** 深度内容层：必须从 A1 连续覆盖到 positioning.knowledgeLevel */
  depthLayers: DepthLayer[];
  memory: MemorySystem;
  classics: ClassicReference[];
  cases: KnowledgeCase[];
  safety: SafetyBoundary;
  trainability: TrainabilityMeta;
  /** Phase 2.5：事实审校层，记录该对象易错事实字段的来源证据 */
  factAudit?: ContentFactAudit;
}

// ============================================================
// 十二、类型特化扩展
// ============================================================

// ---------- TheoryKnowledge（理论） ----------
export interface TheoryKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'theory' };
}

// ---------- DiagnosticKnowledge（诊断 / 舌诊 / 脉诊） ----------
/** 结构化观察维度（舌诊：舌色/舌形/舌态/苔色/苔质） */
export interface ObservationDimensionSpec {
  name: string;
  /** 正常值 / 基准 */
  normal: string;
  /** 本对象的特征表现 */
  feature: string;
}

export interface DiagnosticKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'diagnostic' };
  diagnostic: {
    /** 观察对象（舌 / 脉 / 面色…） */
    target: string;
    /** 观察维度及特征 */
    dimensions: ObservationDimensionSpec[];
    /** 观察步骤（看什么 → 描述 → 识别 → 对比） */
    observationSteps: string[];
    /** 图片/素材使用说明（仅可靠教学素材，禁止「上传舌头 AI 诊断」） */
    mediaNote: string;
    /** 教学解释（该表现对应什么证候，教育用途） */
    teachingInterpretation: string;
  };
}

// ---------- 中药：剂量（Phase 2.5：分层剂量证据，禁止混标/推测） ----------
/**
 * 剂量证据：严格分层「原典 / 历史 / 现代教学 / 临床」，每一层独立带来源。
 *
 * 硬规则（Phase 2.5 封板要求）：
 *   1. 原典写「各等分」就只能写「各等分」，不得自行换算成克数；
 *   2. 现代教学剂量若无可靠教材出处，宁可留空（不填该字段），也不猜测；
 *   3. 每一层存在具体数字时，必须存在对应的 source，且 source.verificationStatus
 *      不得为 pending（pending 的剂量不可作为「具体数字」进入教学/背诵）。
 */
export interface DosageEvidence {
  /** 原典原文剂量（如「各等分」） */
  originalDosage?: string;
  originalDosageSource?: FactEvidence;

  /** 历史/历代医家剂量（须注明具体时代与出处） */
  historicalDosage?: string;
  historicalDosageSource?: FactEvidence;

  /** 现代教学/教材推荐剂量（须注明教材名 + 版次/章节） */
  modernTeachingDosage?: string;
  modernTeachingDosageSource?: FactEvidence;

  /** 临床常用剂量（须注明来源） */
  clinicalDosage?: string;
  clinicalDosageSource?: FactEvidence;
}

export interface DosageSpec {
  /** 分层剂量证据（Phase 2.5 起为主字段） */
  dosage: DosageEvidence;
  /** 度量衡换算说明（如有可靠来源；无来源则明确说明不换算） */
  metrologyNote?: string;
  /** 现代教学范围（在可靠来源内的表述） */
  teachingRange: string;
}

// ---------- HerbKnowledge（中药） ----------
export interface HerbAppearance {
  /** 原植物 / 原药材描述 */
  crudeOverview: string;
  /** 饮片性状 */
  decoctionPiece: string;
  /** 关键识别特征 */
  keyFeatures: string[];
  /** 易混品 */
  confusableSubstitutes: string[];
  /** 真伪鉴别要点 */
  authenticationPoints: string[];
  /** Phase 2.5：可选的视觉素材 id（无可靠授权图片时不得伪造，留空即「无真实识材图」） */
  visualAssetId?: string;
}

export interface HerbProperty {
  fourQi: string;
  fiveFlavors: string;
  channelTropism: string;
  ascendingDescending: string;
  toxicity: string;
}

export interface HerbAction {
  coreActions: string[];
  secondaryActions: string[];
  /** 功效之间的逻辑关系（为什么会这样排序） */
  actionLogic: string;
}

export interface HerbClinicalUse {
  indications: string[];
  compatibilityRules: string[];
  commonPartners: { herb: string; effect: string }[];
  /** 配伍后作用变化 */
  compatibilityChange: string;
}

export interface HerbProcessing {
  /** 生品 */
  rawProduct: string;
  /** 炮制品 */
  processedProduct?: string;
  /** 炮制方法 */
  method?: string;
  /** 炮制目的 */
  purpose?: string;
  /** 炮制后药性变化 */
  propertyChange?: string;
}

export interface HerbKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'herb' };
  herb: {
    name: string;
    pinyin: string;
    aliases: string[];
    /** 基原（含植物拉丁学名） */
    origin: string;
    medicinalPart: string;
    /** 药材标准来源（《中国药典》） */
    source: string;
    category: string;
    appearance: HerbAppearance;
    property: HerbProperty;
    action: HerbAction;
    clinical: HerbClinicalUse;
    processing: HerbProcessing;
    /** 剂量（分层来源，禁止推测） */
    dosage: DosageSpec;
    contraindications: string[];
  };
}

// ---------- FormulaKnowledge（方剂） ----------
export interface FormulaIngredient {
  name: string;
  /** 原始剂量（古籍，须注明「等分」或具体量） */
  classicDose: string;
  /** 现代教学剂量/范围（有可靠来源时） */
  modernDose?: string;
  /** Phase 2.5：本味药的剂量证据（分层带来源，禁止混标） */
  dosageEvidence?: DosageEvidence;
  /** 在方中的角色：君 / 臣 / 佐 / 使 */
  role: '君' | '臣' | '佐' | '使';
  /** 为什么存在（每味药存在的理由） */
  purpose: string;
}

export interface FormulaSyndrome {
  /** 病机 */
  pathomechanism: string;
  mainSymptoms: string[];
  associatedSymptoms: string[];
  tongue: string;
  pulse: string;
  /** 辨证关键（最核心的一两点） */
  keyToDiagnosis: string;
}

export interface FormulaVariation {
  variationName: string;
  /** 加减变化（去掉 / 加入什么） */
  change: string;
  /** 为什么会改变方证 */
  effect: string;
}

export interface FormulaComparison {
  /** 同类 / 易混 / 功效相似 / 病机相近但治法不同 */
  relatedFormula: string;
  relation: string;
  /** 核心区别 */
  keyDifference: string;
}

export interface IdentificationPrompt {
  /**
   * 训练类型：
   * - 方剂（识方训练）：药猜方 / 方补药 / 缺药找 / 方证判断 / 两方区别
   * - 腧穴（识穴训练）：定位辨穴 / 穴归经 / 穴属性 / 两穴比较 / 区域找穴
   */
  kind:
    // 方剂 · 识方训练
    | 'herbs-to-formula'
    | 'formula-to-herbs'
    | 'missing-herb'
    | 'formula-to-syndrome'
    | 'syndrome-to-formula'
    | 'two-formula-difference'
    // 腧穴 · 识穴训练
    | 'location-to-point'
    | 'point-to-meridian'
    | 'point-to-attribute'
    | 'two-point-difference'
    | 'region-to-point';
  prompt: string;
  answer: string;
}

export interface FormulaKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'formula' };
  formula: {
    name: string;
    pinyin: string;
    /** 出处（如《太平惠民和剂局方》） */
    source: string;
    /** 原方原文（含用法原文，逐字可追溯） */
    originalText: string;
    ingredients: FormulaIngredient[];
    /** 配伍逻辑（A + B 为什么形成这种作用） */
    combinationLogic: string;
    syndrome: FormulaSyndrome;
    variations: FormulaVariation[];
    comparisons: FormulaComparison[];
    /** 识方训练题 */
    identification: IdentificationPrompt[];
  };
}

// ---------- MeridianKnowledge（经络） ----------
export interface MeridianKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'meridian' };
}

// ---------- AcupointKnowledge（腧穴） ----------
/** Phase 2.5：腧穴空间认知结构（暂不要求 3D 人体，但须预留空间媒介） */
export interface SpatialLearning {
  /** 身体区域 */
  bodyRegion: string;
  /** 地标点（体表标志） */
  landmarkPoints: string[];
  /** 相对方向（上/下/内/外） */
  relativeDirection: string;
  /** 相对距离（如「下 3 寸」「一横指」） */
  relativeDistance: string;
  /** 邻近穴位 */
  neighboringPoints: string[];
  /** 经脉循行路径（本穴所在经脉的体表走行） */
  meridianPath: string;
  /** 可选的视觉素材 id（无可靠图片时不得伪造，留空） */
  visualAssetId?: string;
  /** 空间训练任务（区域识别/地标/上下内外/邻近/经脉/易混/闭眼回忆） */
  spatialTasks: string[];
}

export interface AcupointKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'acupoint' };
  acupoint: {
    name: string;
    pinyin: string;
    /** 国际标准代码（如 ST36） */
    code?: string;
    /** 所属经脉 */
    meridian: string;
    /** 定位（逐字规范表述） */
    location: string;
    locationSource: string;
    /** 取穴方法 */
    locatingMethod: string[];
    /** 体表标志 */
    surfaceLandmarks: string[];
    /** 解剖关系 */
    anatomy: string;
    mainIndications: string[];
    /** 常用配伍 */
    combinations: { withPoint: string; effect: string }[];
    /** 特定穴属性（如「合穴」「胃之下合穴」） */
    specialPointTypes: string[];
    /** 经络关系说明 */
    meridianRelation: string;
    /** 经典出处 */
    classicSource: string;
    /** 易混穴 */
    confusablePoints: { point: string; difference: string }[];
    /** 识穴训练题 */
    identification: IdentificationPrompt[];
    /** Phase 2.5：空间认知结构（文字空间学习；无可靠图片不留 visualAssetId） */
    spatial?: SpatialLearning;
  };
}

// ---------- ClassicKnowledge（经典原文） ----------
export interface ClassicKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'classic' };
  classic: {
    /** 所承载的经典原文（可逐字追溯） */
    reference: ClassicReference;
    /** 医古文关键词逐字解释 */
    keywordGlossary: { term: string; explanation: string }[];
    /** 现代白话通译 */
    modernTranslation: string;
  };
}

// ---------- 综合医案走练流程（先观察 → 判断 → 证据 → 教练反馈 → 对照 → 修正 → 理论 → 再挑战） ----------
export interface WalkthroughStage {
  order: number;
  label: string;
  prompt: string;
}

export interface WalkthroughSpec {
  /** 阶段引导语（按顺序） */
  stages: WalkthroughStage[];
}

/**
 * Phase 2.5：学习者一次独立推理尝试。
 * 系统据此记录「学习者到底提出了什么判断」，证明真的发生了独立推理，
 * 而非只是点击预设选项。
 */
export interface ReasoningAttempt {
  /** 学习者提出的假设/判断 */
  hypothesis: string;
  /** 至少 2 条支持证据 */
  evidence: string[];
  /** 反证：什么信息会推翻当前判断（可选，C4 必填） */
  counterEvidence?: string[];
  /** 自信度 0–1（可选） */
  confidence?: number;
  /** 新证据出现后为何修正（可选） */
  revisionReason?: string;
  /** 最终判断（可选） */
  finalJudgment?: string;
}

/** Phase 2.5：综合医案的推理记录会话 */
export interface CaseSession {
  /**
   * 学习者每次推理尝试的真实记录。
   * 静态样板中应为空数组（不得伪造「用户已完成推理」），
   * 运行时由系统在用户输入后追加。
   */
  attempts: ReasoningAttempt[];
  /** 教学参考示范：完整推理链（明确标注为示范，非真实学习者记录） */
  referenceAttempt?: ReasoningAttempt;
  /** 记录说明 */
  note: string;
}

// ---------- ClinicalKnowledge（临床证候 / 病机） ----------
export interface ClinicalKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'clinical' };
  /** 综合医案走练流程（临床证候对象可附带盲案/反转训练） */
  walkthrough?: WalkthroughSpec;
  /** Phase 2.5：推理记录会话（证明学习者进行了独立推理） */
  caseSession?: CaseSession;
}

// ---------- CaseKnowledge（案例） ----------
export interface CaseKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'case' };
  /** 综合医案：先观察 → 判断 → 证据 → 教练反馈 → 对照 → 修正 → 理论 → 再挑战 */
  walkthrough: WalkthroughSpec;
  /** Phase 2.5：推理记录会话 */
  caseSession?: CaseSession;
}

// ---------- MedicalChineseKnowledge（医古文） ----------
export interface MedicalChineseKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'medicalChinese' };
}

// ---------- PhysicianSchoolKnowledge（各家学说） ----------
export interface PhysicianSchoolKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'physicianSchool' };
}

// ---------- ModernMedicineKnowledge（现代医学基础） ----------
export interface ModernMedicineKnowledge extends CanonicalKnowledgeObjectBase {
  identity: KnowledgeIdentity & { type: 'modernMedicine' };
}

// ============================================================
// 十三、判别联合：统一知识对象
// ============================================================
export type CanonicalKnowledgeObject =
  | TheoryKnowledge
  | DiagnosticKnowledge
  | HerbKnowledge
  | FormulaKnowledge
  | MeridianKnowledge
  | AcupointKnowledge
  | ClassicKnowledge
  | ClinicalKnowledge
  | CaseKnowledge
  | MedicalChineseKnowledge
  | PhysicianSchoolKnowledge
  | ModernMedicineKnowledge;