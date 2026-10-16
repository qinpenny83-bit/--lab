import type { AgentEngine, EvaluateInput, EvaluationResult } from './types';
import type { AgentProfile, AgentRecommendation, UserProgress, SafetyResult } from '../types/models';
import { findCase, findObservation, findNode, findFormula, findClassic, findParadox } from '../data';
import { evaluateCase } from './coaches/caseCoach';
import { evaluateObservation } from './coaches/observationCoach';
import { evaluateKnowledge, evaluateTransferScene } from './coaches/knowledgeCoach';
import { evaluateFormula, evaluateHerb } from './coaches/formulaCoach';
import { evaluateClassic } from './coaches/classicCoach';
import { evaluateParadox } from './coaches/paradoxCoach';
import { recommend, todayChallenge, profile } from './ReviewCoach';
import { classifySafety } from './SafetyGuard';

/**
 * 🌿 LearningAgent — 本地规则引擎（V1 默认）
 * 架构：LearningAgent
 *   ├── CaseCoach       病例推理
 *   ├── ObservationCoach 观察训练
 *   ├── KnowledgeCoach   知识挑战
 *   ├── FormulaCoach     方剂实验室
 *   ├── ClassicCoach     经典解码
 *   └── ReviewCoach      复习推荐 + 学习画像
 * 外部安全：SafetyGuard
 */
export class LocalAgentEngine implements AgentEngine {
  evaluate(input: EvaluateInput): EvaluationResult {
    switch (input.type) {
      case 'case': {
        const c = findCase(input.refId);
        if (!c) throw new Error('病例不存在: ' + input.refId);
        return evaluateCase(c, input.answers);
      }
      case 'observation': {
        const t = findObservation(input.refId);
        if (!t) throw new Error('观察任务不存在: ' + input.refId);
        return evaluateObservation(t, input.answers);
      }
      case 'knowledge': {
        const n = findNode(input.refId);
        if (!n) throw new Error('知识节点不存在: ' + input.refId);
        // V2：迁移场景验证题（variation / transfer）
        if (input.sceneId) {
          const r = evaluateTransferScene(n, input.sceneId, input.answers);
          if (r) return { ...r, correct: r.correct, passed: r.correct };
        }
        return evaluateKnowledge(n, input.answers);
      }
      case 'formula': {
        const f = findFormula(input.refId);
        if (!f) throw new Error('方剂不存在: ' + input.refId);
        // 单味药即时反馈（不结算会话）
        if (typeof input.answers.herbId === 'string' && typeof input.answers.optionId === 'string') {
          const h = f.herbs.find((x) => x.id === input.answers.herbId);
          if (!h) throw new Error('药材不存在');
          const r = evaluateHerb(h, input.answers.optionId as string);
          return {
            correct: r.correct,
            passed: r.correct,
            xp: r.correct ? 8 : 0,
            topic: 'formula',
            feedback: [r.correct ? `✅ 「${h.name}」的角色你想对了。` : `❌ ${r.explain}`],
            explain: h.note,
          };
        }
        return evaluateFormula(f, input.answers);
      }
      case 'classic': {
        const c = findClassic(input.refId);
        if (!c) throw new Error('经典不存在: ' + input.refId);
        return evaluateClassic(c, input.answers);
      }
      case 'paradox': {
        const c = findParadox(input.refId);
        if (!c) throw new Error('反直觉挑战不存在: ' + input.refId);
        return evaluateParadox(c, input.answers);
      }
      default:
        throw new Error('未知训练类型');
    }
  }

  recommend(progress: UserProgress): AgentRecommendation[] {
    return recommend(progress);
  }

  todayChallenge(progress: UserProgress): AgentRecommendation | null {
    return todayChallenge(progress);
  }

  profile(progress: UserProgress): AgentProfile {
    return profile(progress);
  }

  safety(input: string): SafetyResult {
    return classifySafety(input);
  }
}
