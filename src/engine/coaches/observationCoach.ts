import type { ObservationTask, MistakeKind } from '../../types/models';
import type { EvaluationResult } from '../types';

interface ObsAnswers {
  seen: string[];
  objective: string[];
  dimension: string;
}

export function evaluateObservation(t: ObservationTask, raw: Record<string, unknown>): EvaluationResult {
  const a = raw as unknown as ObsAnswers;
  const seen: string[] = Array.isArray(a?.seen) ? a.seen : [];
  const objective: string[] = Array.isArray(a?.objective) ? a.objective : [];

  const trueSeen = t.seenOptions.filter((o) => o.isObservation).map((o) => o.id);
  const falseSeen = t.seenOptions.filter((o) => !o.isObservation).map((o) => o.id);
  const q1 = trueSeen.every((id) => seen.includes(id)) && !seen.some((id) => falseSeen.includes(id));

  const trueObj = t.objectiveOptions.filter((o) => o.isObservation).map((o) => o.id);
  const falseObj = t.objectiveOptions.filter((o) => !o.isObservation).map((o) => o.id);
  const q2 = trueObj.every((id) => objective.includes(id)) && !objective.some((id) => falseObj.includes(id));

  const q3 = a?.dimension === t.dimension;

  const passed = [q1, q2, q3].filter(Boolean).length >= 2;
  const perfect = q1 && q2 && q3;
  const feedback: string[] = [];

  if (q1) feedback.push('✅ 「看到了什么」：你分清了观察与推测。');
  else feedback.push('🔍 「看到了什么」要只记录可观察的现象，别把"他肯定阳虚""她抑郁了"这类推测混进去。');

  if (q2) feedback.push('✅ 「客观观察」：你抓住了可验证的信息。');
  else feedback.push('🔍 「客观观察」指的是可确认的事实（时间、频率、可见状态），推测结论不算。');

  if (q3) feedback.push('✅ 「观察维度」：归对了！这个现象属于「' + t.dimension + '」。');
  else feedback.push('🔍 这个现象在中医学习里通常归入「' + t.dimension + '」维度观察。');

  if (perfect) feedback.push('🎯 满分观察！观察——分类——不越界，正是中医思维的第一课。');

  let xp = 15;
  if (perfect) xp += 10;

  let mistakeKind: MistakeKind | undefined;
  let mistakeQuestion: string | undefined;
  let mistakeAnswer: string | undefined;
  let correctAnswer: string | undefined;

  if (!q3) {
    mistakeKind = 'overlook_clue';
    mistakeQuestion = '这些现象属于哪个观察维度';
    mistakeAnswer = a?.dimension ?? '';
    correctAnswer = t.dimension;
  } else if (!q1 || !q2) {
    mistakeKind = 'concept_confusion';
    mistakeQuestion = '区分客观观察与主观推测';
    mistakeAnswer = '混入了推测性内容';
    correctAnswer = '只保留可观察、可验证的信息';
  }

  return {
    correct: perfect,
    passed,
    xp,
    topic: t.topic,
    feedback,
    explain: t.explanation + '\n\n🧠 ' + t.insight,
    mistakeKind,
    mistakeQuestion,
    mistakeAnswer,
    correctAnswer,
  };
}
