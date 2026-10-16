// ============================================================
// 🌿 中医修炼馆 — 核心数据模型
// 所有本地知识库与用户进度共享这一套类型定义
// ============================================================

// ---------- 十大主题（知识地图的十个节点） ----------
export const TOPIC_ORDER = [
  'yinYang',
  'coldHeat',
  'exteriorInterior',
  'deficiencyExcess',
  'qiBlood',
  'organs',
  'diagnosis',
  'syndrome',
  'formula',
  'classic',
] as const;

export type TopicId = (typeof TOPIC_ORDER)[number];

export interface TopicMeta {
  id: TopicId;
  name: string;
  emoji: string;
  desc: string;
  /** 解锁本主题需要的前置主题 */
  prereq: TopicId | null;
}

export const TOPIC_META: Record<TopicId, TopicMeta> = {
  yinYang: { id: 'yinYang', name: '阴阳', emoji: '☯️', desc: '中医认识世界的总纲', prereq: null },
  coldHeat: { id: 'coldHeat', name: '寒热', emoji: '❄️', desc: '辨清身体里温度的方向', prereq: 'yinYang' },
  exteriorInterior: { id: 'exteriorInterior', name: '表里', emoji: '🚪', desc: '病邪在表层还是深层', prereq: 'coldHeat' },
  deficiencyExcess: { id: 'deficiencyExcess', name: '虚实', emoji: '⚖️', desc: '是正气不足，还是邪气太盛', prereq: 'exteriorInterior' },
  qiBlood: { id: 'qiBlood', name: '气血津液', emoji: '💧', desc: '身体里流动的物质', prereq: 'deficiencyExcess' },
  organs: { id: 'organs', name: '脏腑', emoji: '🏮', desc: '五脏六腑各自的分工', prereq: 'qiBlood' },
  diagnosis: { id: 'diagnosis', name: '四诊', emoji: '👁️', desc: '望闻问切，收集线索', prereq: 'organs' },
  syndrome: { id: 'syndrome', name: '辨证', emoji: '🧩', desc: '把线索组合成证候', prereq: 'diagnosis' },
  formula: { id: 'formula', name: '方剂', emoji: '🍵', desc: '理解方子的结构与思路', prereq: 'syndrome' },
  classic: { id: 'classic', name: '经典', emoji: '📜', desc: '回到经典原文里思考', prereq: 'syndrome' },
};

/** 兼容 v33 学科代码等动态主题键的安全访问（未注册键原样返回） */
export function topicMetaOf(topic: string): TopicMeta | undefined {
  return TOPIC_META[topic as TopicId];
}

// ---------- 等级 ----------
export const LEVELS = [
  { name: '初识者', emoji: '🌱', xp: 0 },
  { name: '入门者', emoji: '🌿', xp: 120 },
  { name: '察象者', emoji: '🍃', xp: 300 },
  { name: '辨证者', emoji: '🌳', xp: 600 },
  { name: '方证者', emoji: '🔥', xp: 1000 },
  { name: '中医思维者', emoji: '🧙', xp: 1600 },
] as const;

export interface LevelInfo {
  index: number;
  name: string;
  emoji: string;
  currentXp: number;
  nextXp: number | null;
  progress: number; // 0-1
}

// ---------- 知识节点 ----------
export interface KnowledgeQuiz {
  question: string;
  options: string[];
  answer: number; // 正确选项下标
  explain: string;
  insight: string; // 中医思维
}

/** 「为什么？」交互：问题 → 简短解释 → 一个例子 → 一个验证题 */
export interface KnowledgeWhy {
  question: string;
  brief: string;
  example: string;
  verify: {
    question: string;
    options: string[];
    answer: number;
    explain: string;
  };
}

/** 知识可信度结构（V1.5）：每条知识的出处与教学边界 */
export interface KnowledgeCredibility {
  source: string; // 出处，如《黄帝内经》
  sourceType: 'classic' | 'textbook' | 'general';
  originalText?: string; // 原文（如有）
  modernExplanation: string; // 现代解释
  teachingPoint: string; // 本段用于学习什么
  safetyNote?: string; // 安全说明
  // ---- V2：来源信息增强 ----
  sourceTitle?: string; // 篇名，如《素问·阴阳应象大论》
  sourceAuthor?: string; // 作者 / 整理者
  sourceEra?: string; // 年代，如"战国至西汉"
  evidenceType?: 'original' | 'commentary' | 'modern'; // 经典原文 / 医家阐释 / 现代教学
  interpretationLevel?: 'original' | 'classical' | 'modern'; // 解释层级
}

export interface KnowledgeNode {
  id: string;
  topic: TopicId;
  title: string;
  intro: string;
  quiz: KnowledgeQuiz;
  why?: KnowledgeWhy;
  credibility?: KnowledgeCredibility;
  // ---- V2：掌握验证 ----
  difficulty?: 1 | 2 | 3; // 知识难度（默认 1）
  transferScenes?: TransferScene[]; // 场景验证：familiar + variation + transfer
  // ---- V3：六层内容结构 ---
  v3?: KnowledgeNodeV3Fields; // 扩展字段（level/stage/module/prerequisites/etc.）
}

// ---------- 病例 ----------
export interface CaseClue {
  id: string;
  text: string;
  kind: 'objective' | 'subjective' | 'distractor';
}

export interface CaseQuestion {
  id: string;
  text: string;
  kind: 'key' | 'useful' | 'less';
}

export interface CaseHypothesis {
  id: string;
  text: string;
  quality: 'good' | 'partial' | 'jump';
}

export interface Case {
  id: string;
  title: string;
  topic: TopicId;
  difficulty: 1 | 2 | 3 | 4 | 5;
  background: string;
  complaint: string;
  clues: CaseClue[];
  questions: CaseQuestion[];
  keyClueId: string;
  correctObservationIds: string[];
  hypotheses: CaseHypothesis[];
  goodHypothesisId: string;
  feedback: {
    goodObservation: string;
    premature: string;
    keepWatching: string;
  };
  teaching: {
    reasoning: string[];
    theory: string;
    safetyBoundary: string;
  };
  // ---- V2：分级案例 ----
  clueDensity?: number; // 线索密度 0-1（线索数 / 干扰数）
  distractorCount?: number; // 干扰线索数量
  requiredQuestions?: number; // 建议追问次数
  transferLevel?: 1 | 2 | 3; // 迁移层级：1 明显场景 / 2 加干扰 / 3 陌生背景
}

// ---------- 观察训练 ----------
export const OBSERVATION_DIMENSIONS = [
  '舌象',
  '面色',
  '寒热',
  '睡眠',
  '饮食',
  '二便',
  '精神状态',
  '情绪',
] as const;

export type ObservationDimension = (typeof OBSERVATION_DIMENSIONS)[number];

export interface ObservationOption {
  id: string;
  text: string;
  isObservation: boolean;
}

export interface ObservationTask {
  id: string;
  dimension: ObservationDimension;
  topic: TopicId;
  title: string;
  scenario: string;
  seenOptions: ObservationOption[];
  objectiveOptions: ObservationOption[];
  explanation: string;
  insight: string;
}

// ---------- 方剂 ----------
export interface RemovalOption {
  id: string;
  text: string;
  correct: boolean;
  explain: string;
}

export interface Herb {
  id: string;
  name: string;
  role: string; // 在该方中的地位
  note: string; // 作用说明
  removalQuestion: string; // 如果少了它，思路会怎样变化？
  removalOptions: RemovalOption[];
}

export interface Formula {
  id: string;
  name: string;
  source: string;
  function: string;
  indication: string;
  herbs: Herb[];
  overallIdea: string;
  safety: string;
}

// ---------- 经典 ----------
export interface ClassicOption {
  id: string;
  text: string;
  correct: boolean;
  why: string;
}

export interface ClassicKeyword {
  term: string;
  explain: string;
}

export interface ClassicFragment {
  id: string;
  book: '黄帝内经' | '伤寒论' | '金匮要略';
  title: string;
  original: string;
  guessOptions: ClassicOption[];
  keywords: ClassicKeyword[];
  plain: string;
  insight: string;
  challenge: {
    question: string;
    options: ClassicOption[];
  };
}

// ---------- 反直觉挑战 ----------
export interface ParadoxCase {
  title: string;
  scenario: string;
  question: string;
  options: ClassicOption[];
  analysis: string;
}

export interface ParadoxChallenge {
  id: string;
  title: string;
  claim: string;
  intro: string;
  claimOptions: ClassicOption[];
  cases: ParadoxCase[];
  principle: string;
  topics: TopicId[];
}

// ---------- 学习会话与进度 ----------
export type SessionType = 'case' | 'observation' | 'knowledge' | 'formula' | 'classic' | 'paradox';

export interface LearningSession {
  id: string;
  type: SessionType;
  refId: string;
  topic: TopicId;
  startedAt: number;
  completedAt: number;
  correct: boolean;
  mistake?: string;
  mistakeKind?: MistakeKind;
  xpEarned: number;
  /** case 会话：是否主动提出了关键追问（用于「慢下来」与统计） */
  keyQuestion?: boolean;
}

export type MistakeKind =
  | 'single_symptom_jump'
  | 'concept_confusion'
  | 'overlook_clue'
  | 'missing_prereq'
  | 'transfer_fail' // V2：熟悉场景会、换场景失手（迁移验证失败）
  // ---- V3.5 Phase 1.5：第五境病机推理新增错因（与 MistakeEngine 对接） ----
  | 'premature_judgment' // 过早判断：线索没收集完就下结论
  | 'weak_evidence' // 证据不足仍坚持原假设
  | 'ignore_counterevidence' // 看到反证却不使用
  | 'failed_revision'; // 得到新线索却未能修正原解释

export interface MistakeRecord {
  sessionId: string;
  topic: TopicId;
  refId: string;
  question: string;
  answer: string;
  correctAnswer: string;
  kind: MistakeKind;
  at: number;
}

export interface MasteryStat {
  correct: number;
  total: number;
}

export interface WeakPoint {
  topic: TopicId;
  reason: string;
  count: number;
  lastAt: number;
  kind?: MistakeKind;
}

export interface AgentRecommendation {
  id: string;
  type: SessionType;
  refId: string;
  topic: TopicId;
  reason: string;
  priority: number;
  title: string;
}

export interface UserProgress {
  xp: number;
  streak: number;
  lastStudyTime: number;
  mastery: Record<TopicId, MasteryStat>;
  completedCases: string[];
  completedObservations: string[];
  completedFormulas: string[];
  completedClassics: string[];
  completedParadoxes: string[];
  completedKnowledge: string[];
  mistakes: MistakeRecord[];
  weakPoints: WeakPoint[];
  recentTopics: TopicId[];
  sessions: LearningSession[];
  recommendedTasks: AgentRecommendation[];
  // ---- V1.5：Agent 记忆 / 成长系统 ----
  memory: AgentMemory;
  badges: Badge[];
  daily: DailyTaskState;
  consecutiveCorrect: number; // 连续正确次数（用于 +3 XP）
  streakBroken: boolean; // 是否曾中断（用于「修炼未断」提示，不惩罚）
  dailySummary: string | null; // 最近一次「今日修炼完成」总结（基于真实数据）
  dailySummaryDate: string | null;
  thoughtfulAsks: number; // 主动追问次数（「慢下来」徽章）
  xpLog: XpLogEntry[];
  // ---- V2：错因 / 掌握 / 复习 / 统计 / 7日报告 / 家庭观察 ----
  mistakePatterns: MistakePattern[];
  nodeMastery: Record<string, NodeMastery>; // key: nodeId
  reviewQueue: ReviewState[]; // 每个知识节点的复习状态
  stats: LearningStats;
  weeklyReports: WeeklyReport[];
  familyMembers: FamilyMember[];
  // ---- V3：8 境体系 / 修炼道路 / 数据版本 ----
  schemaVersion: number; // 数据版本（用于迁移）
  currentStageId: string | null; // 当前所在境界（如 'stage1'）
  stageProgress: Record<string, StageProgress>; // 每境进度
  // ---- V3.5：课程化学习 / 八步推理 ----
  completedUnits: string[]; // 已完成的 LearningUnit id（课程播放器进度）
  reasonerSessions: ReasonerSession[]; // 八步推理会话记录（全部来自真实操作）
}

// ---------- V1.5：Agent 记忆 ----------
export type ReasoningPatternKind = MistakeKind | 'solid' | 'impatient' | 'careful';

export interface ReasoningPatternRecord {
  kind: ReasoningPatternKind;
  count: number;
  lastAt: number;
}

export interface AgentMemory {
  /** 学习习惯：各训练类型的使用频次 */
  learningHabits: { type: SessionType; count: number }[];
  /** 推理模式：错误类型 / 稳定答对 / 过于急切 的频次 */
  reasoningPatterns: ReasoningPatternRecord[];
  /** 错误观念：最近错题中反复出现的行为摘要（最多 5 条） */
  misconceptions: { topic: TopicId; kind: MistakeKind; times: number; lastAt: number }[];
  /** 优势：基于真实表现推导 */
  strengths: { label: string; kind: 'observe' | 'combine' | 'review' | 'explore'; count: number }[];
  /** 偏好学习模式：训练类型频次最高者 */
  preferredLearningMode: SessionType | 'none';
}

// ---------- V1.5：成就徽章（中医学习习惯徽章） ----------
export type BadgeId = 'first_leaf' | 'observer' | 'breaker' | 'slow_down' | 'seven_days';

export interface Badge {
  id: BadgeId;
  earnedAt: number;
}

export interface BadgeDef {
  id: BadgeId;
  icon: string;
  name: string;
  desc: string;
  check: (p: UserProgress) => boolean;
}

// ---------- V1.5：每日任务 ----------
export interface DailyTaskState {
  date: string; // YYYY-MM-DD
  caseId: string | null;
  observationId: string | null;
  reviewRefId: string | null; // 昨日复习
  reviewTopic?: TopicId | null; // 复习主题（用于展示）
  done: string[]; // 已完成任务 key（case:{id} / obs:{id} / review:{refId}）
  allDone: boolean;
  // ---- V2：今日任务三件套（核心挑战 / 错因训练 / 间隔复习） ----
  v2?: DailyPlanV2;
}

/** V2：今日任务三件套中的一项 */
export interface DailyTaskV2Item {
  key: 'core' | 'mistake' | 'review';
  type: SessionType;
  refId: string;
  topic: TopicId;
  label: string;
  icon: string;
  desc: string;
  reason: string; // Agent 解释"为什么今天做这个"
  sceneKind?: TransferSceneKind; // 针对训练指向迁移场景题时使用
  sceneId?: string;
  temperature?: MemoryTemperature;
}

/** V2：今日任务计划（最多三个：核心挑战 / 错因训练 / 间隔复习） */
export interface DailyPlanV2 {
  date: string;
  tasks: DailyTaskV2Item[];
  advice: string; // Agent 解释"为什么是这三个"
}

export type DailyTaskKey = 'case' | 'observation' | 'review';

// ---------- V1.5：思维标签（学习行为特征，非人格测试） ----------
export type LearningTagId = 'observer' | 'fast' | 'careful' | 'balanced';

export interface LearningTag {
  id: LearningTagId;
  label: string;
  desc: string;
}

// ---------- V1.5：Agent 主动发现 ----------
export type DiscoveryKind = 'cold_start' | 'consecutive_errors' | 'same_pattern' | 'decline' | 'stale_review' | 'new_knowledge';

export interface AgentDiscovery {
  kind: DiscoveryKind;
  message: string;
  refType?: SessionType;
  refId?: string;
}

// ---------- V1.5：XP 流水（用于成长反馈动画） ----------
export interface XpLogEntry {
  at: number;
  amount: number;
  reason: string;
}

// ---------- 安全系统 ----------
export type SafetyLevel = 'green' | 'yellow' | 'red' | 'emergency';

export interface SafetyResult {
  level: SafetyLevel;
  label: string;
  emoji: string;
  response: string;
  redirect?: string;
  redirectTarget?: { type: SessionType | 'map'; refId?: string; label: string };
}

// ---------- Agent ----------
export interface AgentEvaluation {
  correct: boolean;
  xp: number;
  feedback: string[];
  explain?: string;
  passed: boolean;
}

export interface AgentProfile {
  text: string;
  strongTopics: string[];
  weakTopics: string[];
  // ---- V1.5：学习画像升级 ----
  strengths: { label: string; icon: string }[];
  weaknesses: { label: string; icon: string }[];
  thinkingHabits: { label: string; icon: string }[];
  recentFindings: { label: string; at: number }[];
  tag: LearningTag;
}

// ============================================================
// V2：Mistake Engine —— 错误分析体系
// 五类错因：知识缺口 / 识别错误 / 推理错误 / 迁移错误 / 表达错误
// ============================================================
export type ErrorCategory =
  | 'knowledge_gap' // 知识不知道
  | 'recognition_error' // 看到线索但没有识别
  | 'reasoning_error' // 知道知识，但过早下结论
  | 'transfer_error' // 熟悉场景会，陌生场景不会
  | 'expression_error'; // 理解了但无法解释

export const MISTAKE_CATEGORY: Record<MistakeKind, ErrorCategory> = {
  single_symptom_jump: 'reasoning_error',
  concept_confusion: 'knowledge_gap',
  overlook_clue: 'recognition_error',
  missing_prereq: 'knowledge_gap',
  transfer_fail: 'transfer_error',
  premature_judgment: 'reasoning_error',
  weak_evidence: 'reasoning_error',
  ignore_counterevidence: 'reasoning_error',
  failed_revision: 'reasoning_error',
};

export const CATEGORY_LABEL: Record<ErrorCategory, string> = {
  knowledge_gap: '知识缺口',
  recognition_error: '识别错误',
  reasoning_error: '推理错误',
  transfer_error: '迁移错误',
  expression_error: '表达错误',
};

export const CATEGORY_ICON: Record<ErrorCategory, string> = {
  knowledge_gap: '📖',
  recognition_error: '👁️',
  reasoning_error: '⚡',
  transfer_error: '🧩',
  expression_error: '🗣️',
};

export interface MistakePattern {
  category: ErrorCategory;
  kind: MistakeKind;
  topic: TopicId;
  count: number;
  recentCount: number; // 最近 10 次会话中出现次数
  firstAt: number;
  lastAt: number;
  recovered: boolean; // 最近一次同类是否已被纠正（针对训练后验证）
}

export interface RootCause {
  category: ErrorCategory;
  summary: string; // 一句话归因
  evidence: string; // 行为证据（来自真实记录）
  advice: string; // Agent 建议
  trainingType: SessionType; // 推荐训练类型
}

// ============================================================
// V2：Mastery Engine —— 掌握验证
// new → learning → familiar → mastered；间隔后遗忘回到 unstable
// ============================================================
export type MasteryState = 'new' | 'learning' | 'familiar' | 'unstable' | 'mastered';

export type TransferSceneKind = 'familiar' | 'variation' | 'transfer';

export const MASTERY_LABEL: Record<MasteryState, string> = {
  new: '尚未学习',
  learning: '学习中',
  familiar: '熟悉但不稳定',
  unstable: '需要巩固',
  mastered: '已掌握',
};

export interface TransferScene {
  id: string;
  kind: TransferSceneKind;
  title: string;
  scenario: string; // 情景描述（陌生背景 / 干扰线索）
  question: string;
  options: { id: string; text: string; correct: boolean; why: string }[];
}

export interface SceneValidation {
  kind: TransferSceneKind;
  correct: boolean;
  at: number;
  sessionId: string;
}

export interface NodeMastery {
  nodeId: string;
  state: MasteryState;
  familiarPassed: boolean;
  variationPassed: boolean;
  transferPassed: boolean;
  validations: SceneValidation[]; // 最近验证记录（保留 20 条）
  lastResult: boolean;
  lastAt: number;
  enteredAt: number;
}

// ============================================================
// V2：Review Engine —— 间隔复习
// ============================================================
export type MemoryTemperature = 'hot' | 'warm' | 'cold' | 'freezing';

export const TEMPERATURE_LABEL: Record<MemoryTemperature, string> = {
  hot: '🔥 热记忆',
  warm: '🌡️ 温记忆',
  cold: '❄️ 冷记忆',
  freezing: '🧊 快遗忘',
};

export interface ReviewState {
  nodeId: string;
  lastReviewedAt: number | null;
  nextReviewAt: number;
  reviewCount: number;
  stability: number; // 0-1 稳定度
  difficulty: number; // 1-5 难度
  forgettingRisk: number; // 0-1 遗忘风险
  lastCorrect: boolean;
  temperature: MemoryTemperature;
  lastResultAt: number | null;
}

// ============================================================
// V2：学习行为统计（仅用于学习反馈，不评价人格）
// ============================================================
export interface LearningStats {
  averageQuestionsBeforeJudgment: number; // 判断前平均追问次数
  prematureJudgmentRate: number; // 过早判断率 0-1
  clueCoverage: number; // 线索覆盖度 0-1
  transferSuccessRate: number; // 迁移成功率 0-1
  reviewRetention: number; // 复习保持率 0-1
  mistakeRecoveryRate: number; // 错因纠正率 0-1
}

// ============================================================
// V2：7日掌握报告
// ============================================================
export interface WeeklyReportPoint {
  day: number; // 1 | 3 | 7
  at: number;
  validated: boolean;
  state: MasteryState;
  note: string;
}

export interface WeeklyReport {
  topic: TopicId;
  startedAt: number;
  points: WeeklyReportPoint[];
  knowledgeGain: string;
  thinkingChange: string;
  errorReduction: string;
  transferAbility: string;
}

// ============================================================
// V2：家庭健康观察（非诊断、非治疗）
// ============================================================
export const FAMILY_DIMENSIONS = [
  '睡眠',
  '饮食',
  '精神',
  '寒热感受',
  '运动',
  '情绪',
  '二便',
] as const;

export type FamilyDimension = (typeof FAMILY_DIMENSIONS)[number];

export interface FamilyNote {
  dimension: FamilyDimension;
  value: string;
  at: number;
}

export interface FamilyMember {
  id: string;
  relation: string; // 妈妈 / 爸爸 / 朋友
  createdAt: number;
  notes: FamilyNote[]; // 观察记录（按时间倒序）
}

export interface FamilyObservationResult {
  memberId: string;
  insight: string; // 长期变化观察（纯观察维度，非诊断）
  trendNote: string;
  safetyLevel: SafetyLevel;
}

// ============================================================
// V3：8 境体系 —— 完整修炼道路
// ============================================================

/** 学习境界（8 境） */
export interface LearningStage {
  id: string; // stage1 ~ stage8
  title: string; // 如"初识中医"
  subtitle: string; // 如"认识中医在研究什么"
  description: string; // 详细描述
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  order: number; // 1-8 排序
  prerequisites: string[]; // 前置境界 id 列表
  moduleIds: string[]; // 包含的模块 id
  unlockCondition: string; // 解锁条件描述
  masteryCondition: string; // 通关条件描述
}

/** 学习模块（境界下的子模块） */
export interface LearningModule {
  id: string; // 如 'stage1-mod1'
  stageId: string;
  title: string;
  description: string;
  nodeIds: string[]; // 包含的知识节点
  prerequisites: string[]; // 前置模块 id
  order: number;
}

/** 知识节点级别（1 认识 → 6 综合） */
export const LEVEL_LABEL: Record<number, string> = {
  1: '认识',
  2: '理解',
  3: '应用',
  4: '推理',
  5: '迁移',
  6: '综合',
};

/** V3：能力雷达 8 维 */
export type AbilityDimension =
  | 'observation'   // 观察能力
  | 'inquiry'       // 追问能力
  | 'induction'     // 归纳能力
  | 'syndrome'      // 辨证能力
  | 'counterEvidence' // 反证能力
  | 'transfer'      // 迁移能力
  | 'explanation'   // 解释能力
  | 'longTermMemory'; // 长期记忆

export const ABILITY_LABELS: Record<AbilityDimension, string> = {
  observation: '观察',
  inquiry: '追问',
  induction: '归纳',
  syndrome: '辨证',
  counterEvidence: '反证',
  transfer: '迁移',
  explanation: '解释',
  longTermMemory: '长期记忆',
};

export const ABILITY_ICONS: Record<AbilityDimension, string> = {
  observation: '👁️',
  inquiry: '❓',
  induction: '📊',
  syndrome: '🧩',
  counterEvidence: '🔍',
  transfer: '🧭',
  explanation: '🗣️',
  longTermMemory: '🧠',
};

/** V3：修炼等级（非医疗资格） */
export const CULTIVATION_REALMS = [
  { title: '初学者', icon: '🌱', minStagesCompleted: 0 },
  { title: '见习者', icon: '🌿', minStagesCompleted: 1 },
  { title: '观察者', icon: '👁️', minStagesCompleted: 2 },
  { title: '辨证者', icon: '🧩', minStagesCompleted: 3 },
  { title: '推理者', icon: '🔍', minStagesCompleted: 4 },
  { title: '迁移者', icon: '🧭', minStagesCompleted: 5 },
  { title: '综合修炼者', icon: '⚗️', minStagesCompleted: 6 },
  { title: '杏林试炼者', icon: '🌟', minStagesCompleted: 7 },
] as const;

/** V3：境界进度状态 */
export type StageState = 'locked' | 'unlocked' | 'learning' | 'familiar' | 'unstable' | 'mastered' | 'completed';

/** V3：每一境的用户进度 */
export interface StageProgress {
  stageId: string;
  state: StageState;
  startedAt: number | null;
  completedAt: number | null;
  masteredNodeCount: number;
  totalNodeCount: number;
  familiarNodeCount: number;
}

/** V3：知识节点六层结构（V3 扩展字段，可选挂载到 KnowledgeNode） */
export interface KnowledgeNodeV3Fields {
  level: 1 | 2 | 3 | 4 | 5 | 6; // 1 认识 → 6 综合
  stageId: string;
  moduleId: string;
  prerequisites: string[]; // 前置知识节点 id
  relatedNodes: string[]; // 相关知识节点 id
  parentNodeId: string | null;
  childrenIds: string[];
  /** 一句话理解（小白能看懂） */
  coreConcept: string;
  /** 为什么这个知识点重要 */
  whyItMatters: string;
  /** 初阶解释（面向小白） */
  beginnerExplanation: string;
  /** 深入理解（理论结构） */
  deeperExplanation: string;
  /** 观察要点 */
  observations: string[];
  /** 常见错误 */
  commonMistakes: string[];
  /** 常见误解 */
  misconceptions: string[];
  /** 经典原文引用 id */
  classicReferences: string[];
  /** 方剂关联 id */
  formulaReferences: string[];
  /** 反直觉挑战关联 id */
  paradoxIds: string[];
  /** 掌握要求：需要完成哪些 case ids 来验证 */
  masteryRequirements: string[];
}

// ============================================================
// V3.5：课程架构 — 课程数据模型
// 将知识节点组织为可学习的课程，而非平铺的知识卡片
// ============================================================

/** V3.5：规范化知识标识 — 解决 V2/V3 知识实体重复和 ID 割裂 */
export interface CanonicalKnowledge {
  canonicalId: string;
  title: string;
  aliases: string[];

  // 跨版本关联：一个知识实体只有唯一 canonicalId
  v2NodeIds: string[];
  v3NodeIds: string[];

  stageIds: string[];
  moduleIds: string[];

  prerequisiteIds: string[];
  relatedKnowledgeIds: string[];

  // 配套资源引用
  caseIds: string[];
  observationIds: string[];
  formulaIds: string[];
  classicIds: string[];
  paradoxIds: string[];
  transferIds: string[];
}

/** V3.5：章节 — 知识节点之上的课程组织层
 *  境界 → 模块 → 章节 → 知识节点 → 学习单元 */
export interface LearningChapter {
  id: string;
  stageId: string;
  moduleId: string;
  title: string;
  description: string;
  nodeIds: string[]; // 本章节包含的知识节点 ID
  estimatedMinutes: number; // 预计学习时长
  order: number;
}

/** V3.5：学习单元类型 */
export type LearningUnitType =
  | 'introduction'   // 引入
  | 'concept'        // 概念讲解
  | 'why'            // 为什么
  | 'comparison'     // 对比辨析
  | 'observation'    // 观察训练
  | 'case'           // 基础案例
  | 'variation'      // 变化案例
  | 'paradox'        // 反直觉
  | 'transfer'       // 迁移
  | 'explanation'    // 自我解释
  | 'reflection'     // 反思
  | 'classic'        // 经典关联
  | 'formula'        // 方剂关联
  | 'review'         // 间隔复习
  | 'integration'    // 综合
  | 'summary'        // 总结
  | 'check';         // 检查

/** V3.5：交互类型 */
export type InteractionType =
  | 'read'           // 阅读
  | 'think'          // 先想一想
  | 'multi_choice'   // 选择题
  | 'sort'           // 排序
  | 'identify'       // 识别
  | 'compare'        // 对比
  | 'explain'        // 解释
  | 'observe'        // 观察
  | 'case_analysis'; // 案例分析

/** V3.5：学习单元 — 一个知识点由一组学习单元组成 */
export interface LearningUnit {
  id: string;
  nodeId: string;            // 所属知识节点
  chapterId: string;         // 所属章节
  type: LearningUnitType;
  title: string;             // 单元标题（如"什么是阴阳"）
  objective: string;         // 本单元的学习目标
  content: string;           // 教学内容（纯文本，不使用 HTML/MD 富文本）
  interactionType: InteractionType;
  interactionData?: string;  // 交互数据（如选择题的 JSON）
  difficulty: 1 | 2 | 3;
  prerequisiteIds: string[]; // 前置学习单元
  relatedNodeIds: string[];  // 相关知识节点
  sourceMetadata?: string;   // 来源元数据 JSON
  safetyNote?: string;
}

/** V3.5：知识桥梁 — 连接前后知识的主动提示 */
export interface KnowledgeBridge {
  id: string;
  fromNodeId: string;       // 前置知识节点
  toNodeId: string;         // 当前知识节点
  prompt: string;           // 提示语（如"你之前学过阴阳，现在想想寒热和阴阳之间是什么关系？"）
  triggerType: 'prerequisite' | 'related' | 'review';
}

/** V3.5：概念对比 */
export interface ConceptComparison {
  id: string;
  title: string;
  conceptA: string;          // 概念 A 名称
  conceptB: string;          // 概念 B 名称
  commonGround: string;      // 共同点
  keyDifference: string;     // 关键差别
  confusionPoint: string;    // 最容易混淆的地方
  observationFocus: string;  // 观察重点
  observationTip: string;    // 观察技巧
  typicalCaseA: string;      // 概念 A 的典型案例
  typicalCaseB: string;      // 概念 B 的典型案例
  counterCase: string;       // 反例
  relatedNodeIds: string[];
  relatedBridgeId: string | null;
}

/** V3.5：可执行毕业条件 */
export interface GraduationCriterion {
  id: string;
  stageId: string;
  description: string;              // 人类可读描述

  // 知识掌握要求
  requiredKnowledgeIds: string[];   // 必须掌握的知识节点
  minimumMasteryRate: number;       // 0-1，该境界最低掌握率

  // 案例验证
  requiredFamiliarSuccess: number;  // 基础案例通过数
  requiredVariationSuccess: number; // 变化案例通过数
  requiredTransferSuccess: number;  // 迁移案例通过数

  // 错误率要求
  maxRecentMistakeRate: number;     // 0-1，最近学习中最大允许错误率

  // 复习保持
  requiredReviewRetention: number;  // 0-1，间隔复习保留率要求

  // 最终试炼
  finalTrialId: string | null;      // 毕业试炼 ID（如综合 case id）
}

/** V3.5：学习完成状态的粒度（看过 ≠ 掌握） */
export type LearningStatus =
  | 'untouched'    // 未接触
  | 'introduced'   // 已接触（只看过）
  | 'understood'   // 已理解（看过 + 理解检查）
  | 'familiar'     // 已熟悉（做过基础案例）
  | 'unstable'     // 不稳定（变化案例出错）
  | 'mastered'     // 已掌握（变化案例 + 迁移通过）
  | 'transferred'; // 已迁移（陌生场景验证通过）

// ============================================================
// V3.5 Phase 1.5：深度教学与推理训练数据结构
// 目标：验证「零基础能否被教会框架」「学习者能否经历完整推理训练」
// 边界：以下结构均为理论学习 / 思维训练工具，不构成任何医疗诊断能力。
// ============================================================

/** 杏林推理八步（第五境教学框架，非医疗诊断能力声明） */
export const REASONING_EIGHT_STEPS = [
  '收集信息',
  '找关键线索',
  '区分主次',
  '建立假设',
  '寻找支持证据',
  '寻找反证',
  '修正病机',
  '综合解释',
] as const;

export type ReasoningStep = (typeof REASONING_EIGHT_STEPS)[number];

/** 线索分级：关键 / 次要 / 干扰 */
export type ClueGrade = 'key' | 'minor' | 'distractor';

/** 分级线索：每条线索标注它"应该被如何对待"及其原因 */
export interface EvidenceClue {
  id: string;
  text: string;
  grade: ClueGrade;
  /** 为什么它是关键的 / 次要的 / 干扰的 */
  why: string;
}

/** 候补假设：每个假设带支持证据与反对证据（训练"多假设"思维） */
export interface ReasoningHypothesis {
  id: string;
  text: string;
  supportingClueIds: string[];
  opposingClueIds: string[];
  /** 是否是最佳解释 */
  isBest: boolean;
  /** 当不是最佳解释时，说明它的破绽在哪 */
  weakness?: string;
}

/** 第五境病机推理挑战（理论学习案例，非医疗诊断） */
export interface ReasoningChallenge {
  id: string;
  stageId: string;          // 'stage5'
  title: string;
  level: 1 | 2 | 3 | 4 | 5; // 案例难度（Lv1 单一病机 → Lv5 综合推理）
  /** 挑战类型：challenge=独立推理挑战；teaching=教学型案例（教材→案例的引导桥接） */
  kind?: 'challenge' | 'teaching';
  topic: TopicId;
  nodeIds: string[];        // 涉及的核心病机知识节点
  background: string;       // 理论教学场景背景
  clues: EvidenceClue[];    // 分级线索（关键 ×3 / 次要 ×2 / 干扰 ×2）
  hypotheses: ReasoningHypothesis[]; // 多个候补假设
  bestHypothesisId: string;
  /** 因果链：原因 → 内部变化 → 功能变化 → 现象 → 现象间的关系 */
  causalChain: string[];
  /** 反证训练：什么新信息会让你的判断发生改变 */
  counterEvidenceQuestion: string;
  counterEvidenceAnswer: string;
  /** 常见错误及其错因映射（接入 MistakeEngine） */
  commonMistakes: { description: string; mistakeKind: MistakeKind }[];
  /** 教学解释：证据 → 病机 → 综合解释 */
  teaching: {
    reasoning: string[];    // 正确推理路径
    theory: string;         // 背后的病机理论
    safetyBoundary: string;
  };
  /** 迁移变式：换场景重新判断 */
  transferVariant: {
    scenario: string;
    question: string;
    expectedClueIds: string[];
    explanation: string;
  };
}

/** 第一境理论学习案例（观察→猜测→理由→追问→新线索→修正→理论→迁移，非医疗诊断） */
export interface LearningCase {
  id: string;
  stageId: string;          // 'stage1'
  title: string;
  nodeIds: string[];
  /** 现象观察（先看，不急着判断） */
  scenario: string;
  /** 让用户先猜测的问题 */
  guessQuestion: string;
  guessOptions: { id: string; text: string }[];
  /** 引导用户解释理由的问题 */
  reasonQuestion: string;
  /** Agent 追问（根据用户答案继续追问，不直接公布答案） */
  probingQuestion: string;
  /** 新线索（加入后需要修正判断） */
  newClue: string;
  /** 修正后的问题（带正误与解释） */
  reviseQuestion: string;
  reviseOptions: { id: string; text: string; correct: boolean; why: string }[];
  /** 理论收束 */
  theory: string;
  /** 迁移问题 */
  transferQuestion: string;
  transferOptions: { id: string; text: string; correct: boolean; why: string }[];
  safetyNote: string;
}

/** 毕业试炼维度 */
export type TrialDimension = 'concept' | 'comparison' | 'reasoning' | 'transfer';

/** 毕业试炼（可计算通过条件） */
export interface GraduationTrial {
  id: string;
  stageId: string;
  title: string;
  description: string;
  /** 抽题数量：基础概念 / 概念对比 / 综合场景 / 迁移 */
  sample: { concepts: number; comparisons: number; scenarios: number; transfers: number };
  conceptNodeIds: string[];
  comparisonIds: string[];
  scenarioNodeIds: string[];
  transferNodeIds: string[];
  /** 各维度通过阈值（0-1，全部达标才算通过） */
  thresholds: {
    conceptUnderstanding: number;
    conceptDistinction: number;
    reasoning: number;
    transfer: number;
  };
  /** 未通过时指出哪个环节还不稳（不扣分羞辱，只提示方向） */
  feedbackHints: { dimension: TrialDimension; hint: string }[];
}

/** 毕业试炼单次结果（可计算，不依赖主观评分） */
export interface TrialResult {
  trialId: string;
  passed: boolean;
  conceptUnderstanding: number; // 0-1
  conceptDistinction: number;   // 0-1
  reasoning: number;            // 0-1
  transfer: number;             // 0-1
  weakDimensions: TrialDimension[];
}

/** Agent 教练的可解释决策 */
export interface CoachDecision {
  /** 当前阶段（用于解释"为什么让你学这个"） */
  stageTitle: string;
  /** 观察到的行为事实 */
  observation: string;
  /** 采取的教学动作 */
  action: 'probe' | 'hint' | 'switch_example' | 'back_to_prerequisite' | 'compare' | 'transfer' | 'review' | 'confirm_mastery';
  actionLabel: string;
  /** 完成的动作与目标 */
  target: { type: SessionType; refId: string; label: string } | null;
  /** 完整的可解释文字说明 */
  reason: string;
}

// ============================================================
// V3.5 Phase 1.5（第二轮）：ID 命名规范 / 杏林推理八步互动训练器 / 掌握证据
// 边界：均为学习训练工具，不构成任何医疗诊断能力。
// ============================================================

/**
 * ============================================================
 * ID 命名规范（V3.5 统一约定）
 * ------------------------------------------------------------
 * stageId      阶段       'stage1' ~ 'stage8'
 * moduleId     模块       '{stage短名}-m{序号}'，如 's1-m1'、's5-m1'（stage1→s1，stage5→s5）
 * chapterId    章节       'ch-{stage短名}-{module短名}-c{序号}'，如 'ch-s1-m1-c1'
 * unitId       学习单元   'lu-{主题短名}-{两位序号}'，如 'lu-whole-01'、'lu-szm-01'
 * nodeId       知识节点   'v3-{stage短名}-n{序号}'，如 'v3-s1-n1'、'v3-s5-n13'
 * canonicalKnowledgeId    'ck-{slug}'，如 'ck-tcm-definition'
 * bridgeId     知识桥梁   'bridge-{from}-to-{to}'，如 'bridge-whole-to-reasoning'
 * challengeId  推理案例   'rc-{stage短名}-{难度或类型}-{slug}'，如 'rc-stage5-lv1-qi-stagnation'
 * trialId      毕业试炼   'trial-{stage短名}'，如 'trial-stage5'
 * ============================================================
 * 注意：历史章节沿用旧式 'ch-stage1-modN-chN' 作兼容别名，新增章节一律用新式。
 * 以上 ID 均不写入 localStorage（localStorage 仅以 nodeId 为 key 存掌握/复习状态），
 * 故重命名不影响 V2/V3 数据兼容。
 */
export const STAGE_PREFIX: Record<string, string> = {
  stage1: 's1',
  stage2: 's2',
  stage3: 's3',
  stage4: 's4',
  stage5: 's5',
  stage6: 's6',
  stage7: 's7',
  stage8: 's8',
};

// ------------------------------------------------------------
// 杏林推理八步：步骤定义（比 REASONING_EIGHT_STEPS 更完整的交互元数据）
// ------------------------------------------------------------
export type ReasoningStepId =
  | 'collect'        // ① 收集信息
  | 'key_clue'       // ② 找关键线索
  | 'prioritize'     // ③ 区分主次
  | 'hypothesis'     // ④ 建立假设
  | 'support'        // ⑤ 寻找支持证据
  | 'counter'        // ⑥ 寻找反证
  | 'revise'         // ⑦ 修正病机
  | 'synthesize';    // ⑧ 综合解释

export interface ReasoningStepDef {
  id: ReasoningStepId;
  order: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  label: string;       // 中文步骤名（与 REASONING_EIGHT_STEPS 对齐）
  purpose: string;     // 这一步训练什么
  /** 本步骤需要记录的行为指标字段 */
  metricKey: string;
  /** 本步骤允许的交互：read / mark / sort / choose / explain / revise */
  interaction: 'read' | 'mark' | 'sort' | 'choose' | 'explain' | 'revise';
}

export const REASONING_STEP_DEFS: ReasoningStepDef[] = [
  { id: 'collect', order: 1, label: '收集信息', purpose: '先把线索看全，不急于判断', metricKey: 'cluesViewed', interaction: 'mark' },
  { id: 'key_clue', order: 2, label: '找关键线索', purpose: '从多条信息里标出最关键的', metricKey: 'keyClueSelection', interaction: 'mark' },
  { id: 'prioritize', order: 3, label: '区分主次', purpose: '把线索分为关键/次要/干扰', metricKey: 'cluePrioritization', interaction: 'sort' },
  { id: 'hypothesis', order: 4, label: '建立假设', purpose: '允许提出多个假设，而非唯一答案', metricKey: 'hypothesisCount', interaction: 'choose' },
  { id: 'support', order: 5, label: '寻找支持证据', purpose: '为假设找支持，训练"证据导向"', metricKey: 'supportEvidence', interaction: 'choose' },
  { id: 'counter', order: 6, label: '寻找反证', purpose: '主动问"什么会推翻我的假设"', metricKey: 'counterEvidenceUsage', interaction: 'explain' },
  { id: 'revise', order: 7, label: '修正病机', purpose: '出现新线索时修改原解释', metricKey: 'revisionAbility', interaction: 'revise' },
  { id: 'synthesize', order: 8, label: '综合解释', purpose: '用自己的话串起完整病机链', metricKey: 'reasoningQuality', interaction: 'explain' },
];

// ------------------------------------------------------------
// 推理训练器：一次八步推理会话的运行状态（全部来自真实操作）
// ------------------------------------------------------------
export interface ReasonerMetrics {
  cluesViewed: number;             // 查看了多少条线索
  cluesIgnored: number;            // 有多少条线索始终没看
  timeToFirstJudgment: number;     // 从开始到第一次判断的间隔（ms）
  keyClueSelection: string[];      // 用户标记的关键线索
  cluePrioritization: { key: string[]; minor: string[]; distractor: string[] };
  hypothesisCount: number;         // 提出的假设数量
  supportEvidence: string[];       // 用户选的支持证据
  counterEvidenceUsage: boolean;   // 是否主动寻找反证
  revisionCount: number;           // 修正次数
  revisionAbility: number;         // 0-1 修正质量
  reasoningQuality: number;        // 0-1 综合解释质量
  transferSuccess: boolean;        // 迁移验证是否通过
}

export type ReasoningStepState = 'pending' | 'active' | 'done' | 'skipped';

export interface ReasonerSession {
  id: string;
  challengeId: string;
  stageId: string;
  currentNodeIds: string[];
  currentStep: number;             // 0-7，对应 REASONING_STEP_DEFS 下标
  steps: ReasoningStepState[];
  metrics: ReasonerMetrics;
  /** 本轮识别出的错因（可为 null=本轮无错） */
  mistake: ReasoningMistake | null;
  startedAt: number;
  completedAt: number | null;
}

// ------------------------------------------------------------
// 「为什么错了」记录：Mistake → RootCause → TargetedPractice
// ------------------------------------------------------------
export interface ReasoningMistake {
  mistakeKind: MistakeKind;    // 对接 MistakeEngine 的错因分类
  rootCause: string;           // 一句话归因（来自真实行为）
  missedClue?: string;         // 被忽略的线索
  wrongAssumption?: string;    // 错误的假设
  correctReasoning: string;    // 正确的推理路径
  targetedPractice: string;    // 针对性训练建议
}

// ------------------------------------------------------------
// 掌握证据：第五境不能"做完 6 个案例 = mastered"
// ------------------------------------------------------------
export interface MasteryEvidence {
  nodeIds: string[];             // 涉及的知识节点
  conceptUnderstanding: number;  // 0-1（对病机概念的真理解，非背诵）
  clueCoverage: number;          // 0-1（关键线索覆盖）
  reasoningQuality: number;      // 0-1（推理链完整性）
  counterEvidenceUsage: number;  // 0-1（主动反证）
  revisionAbility: number;       // 0-1（修正能力）
  transferSuccess: number;       // 0-1（迁移成功率）
  retention: number;             // 0-1（间隔复习保持）
  /** 是否达到 mastered：七个维度都过阈值 */
  mastered: boolean;
  /** 未达标维度的名字（用于"告诉用户哪里还不稳"） */
  weakDimensions: string[];
}

export interface ReasoningMasteryGate {
  conceptUnderstanding: number;
  clueCoverage: number;
  reasoningQuality: number;
  counterEvidenceUsage: number;
  revisionAbility: number;
  transferSuccess: number;
  retention: number;
}

export const DEFAULT_REASONING_GATE: ReasoningMasteryGate = {
  conceptUnderstanding: 0.7,
  clueCoverage: 0.6,
  reasoningQuality: 0.6,
  counterEvidenceUsage: 0.5,
  revisionAbility: 0.5,
  transferSuccess: 0.6,
  retention: 0.6,
};

