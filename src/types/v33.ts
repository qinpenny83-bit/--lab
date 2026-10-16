// ============================================================
// 杏林大典 · 33 学科知识池 · 类型定义（v33 schema）
// 对应 phase-5/learning-system/*.json（唯一事实源，由 build-v33-frontend.mjs 同步）
// ============================================================

export type V33NodeStatus = 'candidate' | 'conditional' | 'quarantine';

export type V33MasteryState = 'new' | 'learning' | 'familiar' | 'mastered' | 'unstable';

export interface V33KeyFact {
  field: string;
  sourceType: string;
  sourceTitle: string;
  status: string;
}

export interface V33ClassicalLayer {
  label: string;
  canon: string;
  chapter: string;
  originalText: string;
  sourceTitle: string;
  sourceType: string;
  verificationStatus: string;
  knowledgeBoundary: string;
}

export interface V33LearningUnit {
  knowledge: string | null;
  keyFacts: V33KeyFact[];
  classicalLayer: V33ClassicalLayer[];
  commonTrap: string | null;
  reasoning: string | null;
  feedback: string | null;
  transfer: string | null;
  mastery: V33MasteryState;
}

export interface V33Node {
  nodeId: string;
  subject: string;
  subjectName: string;
  subjectType: string;
  stage: string;
  topic: string;
  description: string;
  status: V33NodeStatus;
  sourceStatus: string;
  learningStatus: string;
  difficulty: number;
  prerequisite: string[];
  nextNode: string | null;
  producedBy: string[];
  verdictSource: string | null;
  category: string | null;
  riskTags: string[];
  intent: string | null;
  cases: Record<string, unknown> | null;
  stdJudgment: string | null;
  coreDefinition: string | null;
  dosage: Record<string, unknown> | null;
  safety: Record<string, unknown>;
  learningUnit: V33LearningUnit;
}

export interface V33AllNodesDoc {
  schema: string;
  basis: string;
  generatedAt: string;
  total: number;
  stats: {
    candidate: number;
    conditional: number;
    quarantine: number;
    bySubject: Record<string, number>;
    missingSample: number;
    missingVerdict: number;
  };
  nodes: V33Node[];
}

export type V33SubjectType =
  | 'theory'
  | 'diagnostic'
  | 'herb'
  | 'formula'
  | 'meridian'
  | 'acupoint'
  | 'classic'
  | 'clinical'
  | 'case'
  | 'ethic'
  | 'evidence';

export interface V33SubjectRow {
  code: string;
  name: string;
  type: V33SubjectType;
  stage: string;
  status: 'core' | 'ext';
  target: [number, number];
  migratedFrom: string[];
  honestyGap: string | null;
  current: number;
  coverageLow: number;
}

export interface V33LearningPathGateNode {
  nodeId: string;
  topic: string;
  difficulty: number;
  status: string;
  cLevel: string | null;
  prerequisite: string[];
  unlocks: string[];
}

export interface V33LearningPathGate {
  name: string;
  unlock: string;
  nodes: V33LearningPathGateNode[];
}

export interface V33KnowledgeMapEntry {
  subject: string;
  subjectName: string;
  type: string;
  coreStatus: string;
  stage: string;
  stageName: string;
  target: number[];
  totalNodes: number;
  gap: number[];
  gates: Record<string, V33LearningPathGate>;
}

export interface V33LearningPathStage {
  stage: string;
  stageName: string;
  subjects: string[];
}

export interface V33ExampleStep {
  step: string;
  subject: string;
  nodeId: string;
  topic: string;
}

export interface V33LearningPathDoc {
  schema: string;
  basis: string;
  generatedAt: string;
  totalSubjects: number;
  totalNodes: number;
  knowledgeMap: V33KnowledgeMapEntry[];
  learningPath: V33LearningPathStage[];
  exampleProgression: V33ExampleStep[];
  note: string;
}

export interface V33MasteryMapDoc {
  schema: string;
  sourceOfTruth: string;
  note: string;
  generatedAt: string;
  total: number;
  profile: {
    initial: string;
    byState: Record<string, number>;
  };
  nodes: Record<string, unknown>[];
}

export interface V33DailyPracticeDoc {
  schema: string;
  generatedAt: string;
  date: string;
  dailyLoad: number;
  strategy: string;
  selection: Record<string, unknown>[];
}

export interface V33ProductionDashboardDoc {
  schema?: string;
  [k: string]: unknown;
}

export interface V33FinalAuditDoc {
  schema?: string;
  [k: string]: unknown;
}
