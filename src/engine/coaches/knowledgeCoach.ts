import type { KnowledgeNode, TransferScene } from '../../types/models';
import type { EvaluationResult } from '../types';
import { TRANSFER_SCENES } from '../../data/knowledge/transferCases';

export function evaluateKnowledge(node: KnowledgeNode, raw: Record<string, unknown>): EvaluationResult {
  const answer = raw?.answer as number | undefined;
  const correct = answer === node.quiz.answer;
  const chosen =
    typeof answer === 'number' && answer >= 0 && answer < node.quiz.options.length
      ? node.quiz.options[answer]
      : '';

  return {
    correct,
    passed: correct,
    xp: correct ? 15 : 0,
    topic: node.topic,
    feedback: [
      correct
        ? '✅ 答对了！'
        : '❌ 再想想：' + node.quiz.options[node.quiz.answer] + ' 才是更合理的组合。',
      '📖 ' + node.quiz.explain,
      '🧠 ' + node.quiz.insight,
    ],
    explain: node.quiz.explain,
    mistakeKind: correct ? undefined : 'concept_confusion',
    mistakeQuestion: node.quiz.question,
    mistakeAnswer: chosen ?? '',
    correctAnswer: node.quiz.options[node.quiz.answer],
  };
}

/**
 * V2：迁移场景验证题（variation / transfer）
 * 目的：验证"用户是真的理解了，还是记住了答案"。
 */
export function evaluateTransferScene(
  node: KnowledgeNode,
  sceneId: string,
  raw: Record<string, unknown>
): EvaluationResult | null {
  const optionId = raw?.optionId as string | undefined;
  const scenes: TransferScene[] | undefined = node.transferScenes ?? TRANSFER_SCENES[node.id];
  const scene = scenes?.find((s) => s.id === sceneId);
  if (!scene) return null;
  const opt = scene.options.find((o) => o.id === optionId);
  const correct = opt?.correct ?? false;

  return {
    correct,
    passed: correct,
    xp: correct ? 15 : 0,
    topic: node.topic,
    feedback: [
      correct
        ? '✅ 换了个场景你也抓住了要点，说明不是背答案。'
        : '❌ 这个场景你没答对——问题可能不是"不知道知识"，而是换场景后线索变了。',
      '🧩 ' + scene.title,
      ...(correct && opt ? ['💡 ' + opt.why] : []),
      ...(!correct
        ? ['💡 正确思路：' + (scene.options.find((o) => o.correct)?.why ?? '')]
        : []),
    ],
    explain: correct ? (opt?.why ?? '') : (scene.options.find((o) => o.correct)?.why ?? ''),
    mistakeKind: correct ? undefined : 'transfer_fail',
    mistakeQuestion: scene.question,
    mistakeAnswer: opt?.text ?? '',
    correctAnswer: scene.options.find((o) => o.correct)?.text ?? '',
  };
}
