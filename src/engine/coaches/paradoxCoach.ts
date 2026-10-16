import type { ParadoxChallenge } from '../../types/models';
import type { EvaluationResult } from '../types';

interface ParadoxAnswers {
  claim: string;
  caseA: string;
  caseB: string;
}

export function evaluateParadox(c: ParadoxChallenge, raw: Record<string, unknown>): EvaluationResult {
  const a = raw as unknown as ParadoxAnswers;

  const claimCorrect = !!a?.claim && c.claimOptions.find((o) => o.id === a.claim)?.correct === true;
  const aCorrect = !!a?.caseA && c.cases[0]?.options.find((o) => o.id === a.caseA)?.correct === true;
  const bCorrect = !!a?.caseB && c.cases[1]?.options.find((o) => o.id === a.caseB)?.correct === true;

  const scores = [claimCorrect, aCorrect, bCorrect];
  const passed = scores.filter(Boolean).length >= 2;
  const perfect = scores.every(Boolean);

  const feedback: string[] = [];
  if (!claimCorrect) {
    const wrong = c.claimOptions.find((o) => o.id === a?.claim);
    feedback.push('🧠 命题判断：' + (wrong?.why ?? '再看两个案例，你会改变答案。'));
  } else {
    feedback.push('🧠 命题判断：你没有被表面症状带偏。');
  }
  if (!aCorrect) feedback.push('🧩 案例一：' + (c.cases[0]?.options.find((o) => o.id === a?.caseA)?.why ?? '注意整体背景。'));
  if (!bCorrect) feedback.push('🧩 案例二：' + (c.cases[1]?.options.find((o) => o.id === a?.caseB)?.why ?? '注意整体背景。'));
  if (perfect) feedback.push('🎯 完美！你已经理解"看整体、看组合、看上下文"了。');

  const xp = scores.filter(Boolean).length * 15 + 10;

  const wrongClaim = !claimCorrect ? c.claimOptions.find((o) => o.id === a?.claim) : undefined;

  return {
    correct: perfect,
    passed,
    xp,
    topic: c.topics[0] ?? 'syndrome',
    feedback,
    explain: c.principle,
    mistakeKind: wrongClaim ? 'single_symptom_jump' : undefined,
    mistakeQuestion: wrongClaim ? c.claim : undefined,
    mistakeAnswer: wrongClaim?.text ?? '',
    correctAnswer: c.claimOptions.find((o) => o.correct)?.text ?? '',
  };
}
