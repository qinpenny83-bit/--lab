import { useState } from 'react';
import type { GoldenChoiceOption, GoldenReferenceJudgment } from '../../data/golden/yinYangLevel';
import ReferenceJudgment from './ReferenceJudgment';

/**
 * 通用「选择题 → 参考判断 → 一句话带走」步骤，用于判断 / 迁移等环节。
 * 完成后一定给出参考判断（不发对错羞辱）。
 */
export default function GoldenChoice({
  question,
  prompt,
  options,
  reference,
  takeaway,
  onSettle,
  onContinue,
}: {
  question: string;
  prompt?: string;
  options: readonly GoldenChoiceOption[];
  reference: GoldenReferenceJudgment;
  takeaway: string;
  onSettle: (isReference: boolean) => void;
  onContinue: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [settled, setSettled] = useState(false);

  const chosen = options.find((o) => o.id === picked);
  const isRef = !!chosen?.isReference;

  const submit = () => {
    if (!picked) return;
    onSettle(isRef);
    setSettled(true);
  };

  return (
    <div className="gl-choice">
      <p className="gl-prompt">{question}</p>
      {prompt ? <p className="gl-muted">{prompt}</p> : null}
      <div className="gl-option-list">
        {options.map((o) => (
          <button
            key={o.id}
            className={'gl-option' + (picked === o.id ? ' on' : '')}
            onClick={() => setPicked(o.id)}
            disabled={settled}
          >
            {o.text}
          </button>
        ))}
      </div>

      {!settled ? (
        <button className="btn btn-primary" disabled={!picked} onClick={submit}>
          我选好了
        </button>
      ) : (
        <div className="rise">
          <ReferenceJudgment reference={reference} userText={chosen?.text} />
          <div className="gl-takeaway">
            <p className="gl-takeaway-label">🌿 一句话带走</p>
            <p>{takeaway}</p>
          </div>
          <div className="reasoning-actions">
            <button className="btn btn-primary" onClick={onContinue}>
              继续探索 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}