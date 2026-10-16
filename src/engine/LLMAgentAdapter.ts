import type { AgentEngine, EvaluateInput, EvaluationResult } from './types';
import type { AgentProfile, AgentRecommendation, UserProgress, SafetyResult } from '../types/models';
import { recommend, todayChallenge, profile } from './ReviewCoach';
import { classifySafety } from './SafetyGuard';
import { LocalAgentEngine } from './LocalAgentEngine';

/**
 * 🤖 LLMAgentAdapter — 为 V2 预留的外部 LLM 接入点
 *
 * 当前 V1 不使用。未来接入方式：
 * 1. 实现一个带鉴权的 LLM 客户端（可配置 API Key / 本地模型服务）
 * 2. 将 evaluate 中的结构化作答 + 知识库上下文打包成 prompt
 * 3. 用 LLM 生成更开放的反馈（如自由文本推理、个性化讲解）
 * 4. 仍由 SafetyGuard 本地拦截危险输入，LLM 只处理学习内容
 *
 * 接口与 LocalAgentEngine 完全一致，因此上层（store / UI）无感知切换。
 */
export class LLMAgentAdapter implements AgentEngine {
  constructor(
    private readonly opts: {
      endpoint?: string;
      model?: string;
      apiKey?: string;
      enabled: boolean;
    } = { enabled: false }
  ) {}

  private ensureEnabled(): never {
    throw new Error(
      'LLMAgentAdapter 未启用（V1 使用 LocalAgentEngine）。如需启用请在创建时传入 endpoint/model/apiKey 并将 enabled 置为 true。'
    );
  }

  evaluate(_input: EvaluateInput): EvaluationResult {
    return this.ensureEnabled();
  }

  /** 推荐逻辑在 V2 中仍可先本地计算，再交给 LLM 润色理由 */
  recommend(progress: UserProgress): AgentRecommendation[] {
    if (!this.opts.enabled) return recommend(progress);
    return recommend(progress);
  }

  todayChallenge(progress: UserProgress): AgentRecommendation | null {
    if (!this.opts.enabled) return todayChallenge(progress);
    return todayChallenge(progress);
  }

  profile(progress: UserProgress): AgentProfile {
    if (!this.opts.enabled) return profile(progress);
    return profile(progress);
  }

  /** 安全分类永远走本地 SafetyGuard，不依赖外部模型 */
  safety(input: string): SafetyResult {
    return classifySafety(input);
  }
}

export function createAgentEngine(): AgentEngine {
  return new LocalAgentEngine();
}
