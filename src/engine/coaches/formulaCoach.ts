import type { Formula, Herb } from '../../types/models';
import type { EvaluationResult } from '../types';

/** 单味药的"如果少了它"评估 */
export function evaluateHerb(h: Herb, optionId: string): { correct: boolean; explain: string; chosen: string } {
  const opt = h.removalOptions.find((o) => o.id === optionId);
  return {
    correct: !!opt?.correct,
    explain: opt?.explain ?? '',
    chosen: opt?.text ?? '',
  };
}

/** 整方完成后的汇总评估 */
export function evaluateFormula(f: Formula, raw: Record<string, unknown>): EvaluationResult {
  const herbAnswers = (raw?.herbAnswers ?? {}) as Record<string, string>;
  const results = f.herbs.map((h) => ({ herb: h, ...evaluateHerb(h, herbAnswers[h.id] ?? '') }));
  const correctCount = results.filter((r) => r.correct).length;
  const passed = correctCount >= Math.ceil(f.herbs.length / 2);

  const feedback: string[] = results.map((r) =>
    r.correct
      ? `✅ 「${r.herb.name}」：你理解它在方中的角色了。`
      : `❌ 「${r.herb.name}」：少了它，${r.explain}`
  );
  const wrong = results.find((r) => !r.correct);

  return {
    correct: correctCount === f.herbs.length,
    passed,
    xp: correctCount * 8 + 20,
    topic: 'formula',
    feedback,
    explain: f.overallIdea,
    mistakeKind: wrong ? 'concept_confusion' : undefined,
    mistakeQuestion: wrong ? `如果少了「${wrong.herb.name}」，方子的整体思路会怎样变化？` : undefined,
    mistakeAnswer: wrong ? wrong.chosen : undefined,
    correctAnswer: wrong
      ? f.herbs
          .filter((h) => h.id === wrong.herb.id)
          .map((h) => h.removalOptions.find((o) => o.correct)?.text ?? '')
          .join('')
      : undefined,
  };
}
