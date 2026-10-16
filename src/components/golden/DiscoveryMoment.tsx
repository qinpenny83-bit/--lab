import { useState } from 'react';

export interface DiscoveryData {
  scenario: string;
  question: string;
  views: readonly { id: string; text: string }[];
  revealTitle: string;
  reveal: string;
}

/**
 * 发现时刻：现象 → 你怎么看 → 发现。
 * 重点不是考知识，而是让用户第一次意识到「中医在比较关系」。
 */
export default function DiscoveryMoment({
  data,
  onDone,
}: {
  data: DiscoveryData;
  onDone: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="gl-discovery">
      <p className="gl-scenario">{data.scenario}</p>
      <p className="gl-prompt">{data.question}</p>

      {!picked ? (
        <div className="gl-option-list">
          {data.views.map((v) => (
            <button key={v.id} className="gl-option" onClick={() => setPicked(v.id)}>
              {v.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="card gl-reveal rise">
          <p className="gl-reveal-title">{data.revealTitle}</p>
          <p className="gl-reveal-text">{data.reveal}</p>
          <div className="reasoning-actions">
            <button className="btn btn-primary" onClick={onDone}>
              我发现了，继续 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}