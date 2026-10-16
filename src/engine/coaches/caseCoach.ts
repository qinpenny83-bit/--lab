import type { Case, CaseClue, CaseQuestion, CaseHypothesis, MistakeKind } from '../../types/models';
import type { EvaluationResult } from '../types';

interface CaseAnswers {
  seen: string[];
  question: string;
  keyClue: string;
  hypothesis: string;
}

function clueText(c: Case, id: string): string {
  return c.clues.find((x) => x.id === id)?.text ?? '';
}
function hypothesisText(c: Case, id: string): string {
  return c.hypotheses.find((x) => x.id === id)?.text ?? '';
}

export function evaluateCase(c: Case, raw: Record<string, unknown>): EvaluationResult {
  const a = raw as unknown as CaseAnswers;
  const seen: string[] = Array.isArray(a?.seen) ? a.seen : [];

  const step1Good = c.correctObservationIds.every((id) => seen.includes(id));
  const pickedDistractors = seen.filter((id) => c.clues.find((x) => x.id === id)?.kind === 'distractor');

  const q = c.questions.find((x) => x.id === a?.question);
  const qGood = q?.kind === 'key';
  const qBad = q?.kind === 'less';

  const clueGood = a?.keyClue === c.keyClueId;

  const h = c.hypotheses.find((x) => x.id === a?.hypothesis);
  const hGood = a?.hypothesis === c.goodHypothesisId;
  const hJump = h?.quality === 'jump';

  const correct = clueGood && hGood;
  const feedback: string[] = [];

  if (step1Good) feedback.push('✅ ' + c.feedback.goodObservation);
  else if (pickedDistractors.length)
    feedback.push('🔍 观察要留神：' + pickedDistractors.map((id) => '「' + clueText(c, id) + '」').join('、') + ' 这些更像是先入为主的判断，不完全是观察到的现象。');

  if (qBad) feedback.push('❓ 这个追问偏弱：它不能帮你区分关键方向。' + c.feedback.keepWatching);
  else if (qGood) feedback.push('❓ 问得漂亮：这个追问直指关键线索。');

  if (!clueGood) feedback.push('⚠️ ' + c.feedback.keepWatching);
  if (hJump) feedback.push('🧠 ' + c.feedback.premature);
  else if (!hGood) feedback.push('🧠 推理方向还需要更多线索支撑，' + c.feedback.keepWatching);

  if (correct) feedback.push('🎯 你的判断与教学线索方向一致，很棒！');

  let xp = 25;
  if (step1Good) xp += 5;
  if (qGood) xp += 5;
  if (clueGood) xp += 10;
  if (hGood) xp += 10;

  let mistakeKind: MistakeKind | undefined;
  let mistakeQuestion: string | undefined;
  let mistakeAnswer: string | undefined;
  let correctAnswer: string | undefined;

  if (hJump) {
    mistakeKind = 'single_symptom_jump';
    mistakeQuestion = '你认为目前最值得关注的线索是什么 / 请形成你的初步推理';
    mistakeAnswer = h?.text ?? '';
    correctAnswer = '最值得关注：' + clueText(c, c.keyClueId) + '；合理推理：' + hypothesisText(c, c.goodHypothesisId);
  } else if (qBad) {
    mistakeKind = 'overlook_clue';
    mistakeQuestion = '如果只能再问一个问题，你会问什么';
    mistakeAnswer = q?.text ?? '';
    correctAnswer = '优先问能区分方向的关键问题';
  } else if (!clueGood) {
    mistakeKind = 'overlook_clue';
    mistakeQuestion = '你认为目前最值得关注的线索是什么';
    mistakeAnswer = clueText(c, a?.keyClue ?? '');
    correctAnswer = clueText(c, c.keyClueId);
  } else if (!hGood) {
    mistakeKind = 'concept_confusion';
    mistakeQuestion = '请形成你的初步推理';
    mistakeAnswer = h?.text ?? '';
    correctAnswer = hypothesisText(c, c.goodHypothesisId);
  }

  return {
    correct,
    passed: correct,
    xp,
    topic: c.topic,
    feedback,
    explain: c.teaching.theory,
    mistakeKind,
    mistakeQuestion,
    mistakeAnswer,
    correctAnswer,
    keyQuestion: qGood,
  };
}
