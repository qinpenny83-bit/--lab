// ============================================================
// v33 节点修炼内容适配器
// 事实源：v33 节点的 learningUnit 八要素（不虚构任何选项/答案）
// - 辨析题：commonTrap 中「错：」前的表述为误区陈述（无标记者为澄清性正确表述）
// - 推理题：reasoning（问题）+ feedback（参考答案）
// - 迁移题：transfer（问题，自评对照）
// ============================================================
import type { V33ClassicalLayer, V33KeyFact, V33Node } from '../types/v33';

export interface V33DiscriminateQuiz {
  /** 待判断的表述 */
  statement: string;
  /** true = 常见误区（答「误区」为正确）；false = 正确澄清（答「正确」为正确） */
  isTrap: boolean;
  /** 完整辨析说明 */
  explanation: string;
}

export interface V33PracticeBuild {
  knowledge: string | null;
  keyFacts: V33KeyFact[];
  classicalLayer: V33ClassicalLayer[];
  stdJudgment: string | null;
  coreDefinition: string | null;
  riskTags: string[];
  safetyNote: string | null;
  quiz: V33DiscriminateQuiz;
  reasoning: string | null;
  referenceAnswer: string | null;
  transfer: string | null;
}

/** 从 commonTrap 提取辨析题：错：标记前的表述即误区陈述 */
export function v33DiscriminateQuiz(node: V33Node): V33DiscriminateQuiz {
  const trap = node.learningUnit?.commonTrap ?? '';
  const m = trap.match(/错[:：]/);
  if (m && m.index !== undefined && m.index > 0) {
    const statement = trap.slice(0, m.index).replace(/[。；，、\s]+$/, '');
    return { statement: statement || trap, isTrap: true, explanation: trap };
  }
  return { statement: trap, isTrap: false, explanation: trap };
}

/** 组装一个节点的完整练习内容 */
export function v33PracticeBuild(node: V33Node): V33PracticeBuild {
  const lu = node.learningUnit;
  const safety = node.safety as Record<string, unknown> | null;
  return {
    knowledge: lu?.knowledge ?? null,
    keyFacts: lu?.keyFacts ?? [],
    classicalLayer: lu?.classicalLayer ?? [],
    stdJudgment: node.stdJudgment,
    coreDefinition: node.coreDefinition,
    riskTags: node.riskTags ?? [],
    safetyNote: safety?.note ? String(safety.note) : null,
    quiz: v33DiscriminateQuiz(node),
    reasoning: lu?.reasoning ?? null,
    referenceAnswer: lu?.feedback ?? null,
    transfer: lu?.transfer ?? null,
  };
}

/** 辨析题选项（答案索引固定：0=正确理解，1=常见误区） */
export const DISCRIMINATE_OPTIONS = [
  { id: '0', text: '这是正确的理解' },
  { id: '1', text: '这是常见的误区' },
] as const;

export const DISCRIMINATE_ANSWER_INDEX = (isTrap: boolean): number => (isTrap ? 1 : 0);
