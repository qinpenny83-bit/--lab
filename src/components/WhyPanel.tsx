import { useState } from 'react';
import type { KnowledgeWhy } from '../types/models';

/** 「为什么？」四步交互：问题 → 简短解释 → 一个例子 → 一个验证题 */
export function WhyPanel({ why }: { why: KnowledgeWhy }) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const submitVerify = () => {
    if (sel === null || done) return;
    setDone(true);
  };

  return (
    <div className={'why-panel' + (open ? ' open' : '')}>
      <button type="button" className="why-toggle" onClick={() => setOpen((o) => !o)}>
        <span className="why-toggle-icon">{open ? '▾' : '❓'}</span>
        <span>为什么？</span>
        <span className="why-toggle-arrow">{open ? '收起' : '展开'}</span>
      </button>

      {open ? (
        <div className="why-body rise">
          <p className="why-question">{why.question}</p>

          <div className="why-step">
            <span className="why-step-tag">简短解释</span>
            <p className="why-brief">{why.brief}</p>
          </div>

          <div className="why-step">
            <span className="why-step-tag">一个例子</span>
            <p className="why-example">{why.example}</p>
          </div>

          <div className="why-step">
            <span className="why-step-tag">来试一道反例</span>
            <p className="why-verify-q">{why.verify.question}</p>
            <div className="choices why-choices">
              {why.verify.options.map((o, i) => {
                const isSel = sel === i;
                const isAns = done && i === why.verify.answer;
                const isWrong = done && isSel && i !== why.verify.answer;
                return (
                  <button
                    key={i}
                    type="button"
                    className={
                      'choice md' +
                      (isSel && !done ? ' selected' : '') +
                      (isAns ? ' correct' : '') +
                      (isWrong ? ' wrong' : '')
                    }
                    disabled={done}
                    onClick={() => setSel(i)}
                  >
                    <span className="choice-text">{o}</span>
                    <span className="choice-mark">{done && isAns ? '✓' : done && isWrong ? '✗' : isSel ? '●' : '○'}</span>
                  </button>
                );
              })}
            </div>
            {!done ? (
              <button className="btn btn-ghost btn-sm" disabled={sel === null} onClick={submitVerify}>
                验证我的理解
              </button>
            ) : (
              <p className="why-verify-explain">{why.verify.explain}</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
