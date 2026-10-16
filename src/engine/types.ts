import type { MistakeKind, SessionType, TopicId, TransferSceneKind } from '../types/models';

export interface EvaluateInput {
  type: SessionType;
  refId: string;
  /** 各步骤的作答，格式由对应 Coach 约定 */
  answers: Record<string, unknown>;
  /** V2：迁移场景验证题 id（knowledge 类型时使用） */
  sceneId?: string;
  /** V2：场景种类 familiar / variation / transfer（knowledge 场景验证时使用） */
  sceneKind?: TransferSceneKind;
  /** V2：回答耗时（毫秒），用于复习难度与稳定性计算 */
  elapsedMs?: number;
}

export interface EvaluationResult {
  correct: boolean;
  passed: boolean;
  xp: number;
  topic: TopicId;
  feedback: string[];
  explain?: string;
  correctAnswer?: string;
  mistakeKind?: MistakeKind;
  mistakeQuestion?: string;
  mistakeAnswer?: string;
  /** case 类型：是否主动提出了关键追问（用于「慢下来」行为统计） */
  keyQuestion?: boolean;
}

export interface AgentEngine {
  evaluate(input: EvaluateInput): EvaluationResult;
  recommend(progress: import('../types/models').UserProgress): import('../types/models').AgentRecommendation[];
  todayChallenge(
    progress: import('../types/models').UserProgress
  ): import('../types/models').AgentRecommendation | null;
  profile(progress: import('../types/models').UserProgress): import('../types/models').AgentProfile;
  safety(input: string): import('../types/models').SafetyResult;
}
