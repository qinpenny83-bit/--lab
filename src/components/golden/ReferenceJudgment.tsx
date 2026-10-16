import type { GoldenReferenceJudgment } from '../../data/golden/yinYangLevel';

/**
 * 参考判断：不判定「对错羞辱」，而是并列呈现
 * 「你的第一判断 / 参考判断 / 关键差异」，并标出最关键线索。
 */
export default function ReferenceJudgment({
  reference,
  userText,
}: {
  reference: GoldenReferenceJudgment;
  userText?: string;
}) {
  return (
    <div className="gl-reference">
      {userText ? (
        <div className="gl-ref-row gl-ref-user">
          <span className="gl-ref-label">你的第一判断</span>
          <span className="gl-ref-text">{userText}</span>
        </div>
      ) : null}

      <div className="gl-ref-row gl-ref-answer">
        <span className="gl-ref-label">参考判断</span>
        <span className="gl-ref-text">{reference.conclusion}</span>
      </div>

      {reference.keyBasis.length ? (
        <div className="gl-ref-basis">
          <p className="gl-ref-section">为什么？</p>
          <ul>
            {reference.keyBasis.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="gl-ref-key">
        <p className="gl-ref-section">⭐ 最关键线索</p>
        <p className="gl-ref-key-text">{reference.keyClue}</p>
      </div>

      <div className="gl-ref-deviation">
        <p className="gl-ref-section">关键差异</p>
        <p>{reference.deviation}</p>
      </div>
    </div>
  );
}