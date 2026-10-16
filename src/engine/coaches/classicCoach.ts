import type { ClassicFragment } from '../../types/models';
import type { EvaluationResult } from '../types';

interface ClassicAnswers {
  guess: string;
  challenge: string;
}

export function evaluateClassic(f: ClassicFragment, raw: Record<string, unknown>): EvaluationResult {
  const a = raw as unknown as ClassicAnswers;
  const guessCorrect = !!a?.guess && f.guessOptions.find((o) => o.id === a.guess)?.correct === true;
  const challengeCorrect =
    !!a?.challenge && f.challenge.options.find((o) => o.id === a.challenge)?.correct === true;

  const guessOpt = f.guessOptions.find((o) => o.id === a?.guess);
  const chalOpt = f.challenge.options.find((o) => o.id === a?.challenge);

  // 支持分阶段评估：只传 guess 或只传 challenge
  const hasGuess = !!a?.guess;
  const hasChallenge = !!a?.challenge;

  const feedback: string[] = [];
  if (hasGuess) {
    feedback.push(
      guessCorrect ? '✅ 你的白话理解抓住了原文关键。' : '❌ ' + (guessOpt?.why ?? '再看一遍原文，注意关键词。')
    );
  }
  if (hasChallenge) {
    feedback.push(
      challengeCorrect
        ? '✅ 小挑战通过！你已经在用这段经典的思维方式了。'
        : '❌ ' + (chalOpt?.why ?? '再想想：这段经典真正在教什么推理方法？')
    );
  }

  let xp = 0;
  if (guessCorrect) xp += 10;
  if (challengeCorrect) xp += 20;

  const full = hasGuess && hasChallenge;
  const passed = !hasGuess ? challengeCorrect : !hasChallenge ? guessCorrect : guessCorrect && challengeCorrect;

  const wrong = !guessCorrect && hasGuess ? { q: f.guessOptions.find((o) => o.correct)?.text ?? '', a: guessOpt?.text ?? '' } : !challengeCorrect && hasChallenge ? { q: f.challenge.options.find((o) => o.correct)?.text ?? '', a: chalOpt?.text ?? '' } : null;

  return {
    correct: full ? guessCorrect && challengeCorrect : passed,
    passed,
    xp,
    topic: 'classic',
    feedback,
    explain: f.plain,
    mistakeKind: wrong ? 'concept_confusion' : undefined,
    mistakeQuestion: wrong ? (hasGuess && !guessCorrect ? '这段原文的白话意思' : '小挑战') : undefined,
    mistakeAnswer: wrong?.a,
    correctAnswer: wrong?.q,
  };
}
