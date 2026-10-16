import { useMemo, useState } from 'react';
import type { GoldenCaseDetective } from '../../data/golden/yinYangLevel';
import ReferenceJudgment from './ReferenceJudgment';

type Phase = 'notice' | 'key' | 'reason' | 'review';

export interface CaseSettlePayload {
  noticed: string[];
  keyClue: string;
  reason: string;
  isBest: boolean;
}

/**
 * 案例侦探：三层练习让「第一次判断」不再是随机猜。
 *   ① 你注意到了什么（多选） → ② 哪个线索更重要 → ③ 你为什么这么判断。
 * 答错后进入「推理复盘五段式」+ 参考判断 + 一句话带走，不让用户停留在「对/错」。
 */
export default function CaseDetective({
  data,
  onSettle,
  onContinue,
}: {
  data: GoldenCaseDetective;
  onSettle: (payload: CaseSettlePayload) => void;
  onContinue: () => void;
}) {
  const [phase, setPhase] = useState<Phase>('notice');
  const [noticed, setNoticed] = useState<string[]>([]);
  const [keyClue, setKeyClue] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);

  const clueText = useMemo(() => new Map(data.clues.map((c) => [c.id, c.text])), [data.clues]);
  const reasonText = useMemo(
    () => new Map(data.reasonOptions.map((r) => [r.id, r.text])),
    [data.reasonOptions],
  );

  const isBest = keyClue === data.keyClueId && reason === data.bestReasonId;

  const toggleNotice = (id: string) =>
    setNoticed((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const submitReason = () => {
    if (!keyClue || !reason) return;
    onSettle({ noticed, keyClue, reason, isBest });
    setPhase('review');
  };

  const retry = () => {
    setPhase('notice');
    setNoticed([]);
    setKeyClue(null);
    setReason(null);
  };

  // ---------- ③ 为什么（三层输入） ----------
  if (phase === 'notice') {
    return (
      <div className="gl-case">
        <span className="tag">🔎 案例侦探</span>
        <p className="gl-scenario">{data.scenario}</p>
        <p className="gl-follow">{data.followIntro}</p>
        <ul className="gl-clue-list">
          {data.clues.map((c) => (
            <li key={c.id}>① {c.text}</li>
          ))}
        </ul>
        <p className="gl-prompt">{data.noticePrompt}</p>
        <div className="gl-option-list">
          {data.clues.map((c) => (
            <button
              key={c.id}
              className={'gl-option' + (noticed.includes(c.id) ? ' on' : '')}
              onClick={() => toggleNotice(c.id)}
            >
              {c.text}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" disabled={noticed.length === 0} onClick={() => setPhase('key')}>
          记下我注意到的线索 →
        </button>
      </div>
    );
  }

  if (phase === 'key') {
    return (
      <div className="gl-case">
        <span className="tag">🔎 案例侦探</span>
        <p className="gl-prompt">{data.keyPrompt}</p>
        <div className="gl-option-list">
          {data.clues.map((c) => (
            <button
              key={c.id}
              className={'gl-option' + (keyClue === c.id ? ' on' : '')}
              onClick={() => setKeyClue(c.id)}
            >
              {c.text}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" disabled={!keyClue} onClick={() => setPhase('reason')}>
          这条更关键 →
        </button>
      </div>
    );
  }

  if (phase === 'reason') {
    return (
      <div className="gl-case">
        <span className="tag">🔎 案例侦探</span>
        <p className="gl-prompt">{data.reasonPrompt}</p>
        <div className="gl-option-list">
          {data.reasonOptions.map((r) => (
            <button
              key={r.id}
              className={'gl-option' + (reason === r.id ? ' on' : '')}
              onClick={() => setReason(r.id)}
            >
              {r.text}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" disabled={!reason} onClick={submitReason}>
          这就是我的判断
        </button>
      </div>
    );
  }

  // ---------- 复盘：参考判断 +（答错时）五段式 + 一句话带走 ----------
  const ignored = data.clues.filter((c) => !noticed.includes(c.id));
  const missedKey = !noticed.includes(data.keyClueId);

  return (
    <div className="gl-case gl-review">
      <span className="tag">{isBest ? '🌿 参考判断' : '🧭 推理复盘'}</span>

      <ReferenceJudgment
        reference={data.reference}
        userText={`关注「${keyClue ? clueText.get(keyClue) : '—'}」，理由是「${reason ? reasonText.get(reason) : '—'}」`}
      />

      {!isBest ? (
        <div className="gl-five-step">
          <div className="gl-step">
            <span className="gl-step-num">①</span>
            <div>
              <p className="gl-step-t">你刚才注意到了什么</p>
              <p className="gl-step-c">
                {noticed.length
                  ? noticed.map((id) => clueText.get(id)).join('、')
                  : '你还没有明确记录到线索。'}
              </p>
            </div>
          </div>
          <div className="gl-step">
            <span className="gl-step-num">②</span>
            <div>
              <p className="gl-step-t">但你忽略了什么</p>
              <p className="gl-step-c">
                {missedKey
                  ? `最关键的一条「${clueText.get(data.keyClueId)}」你可能没有放进关注范围。`
                  : ignored.length
                  ? `还有「${ignored.map((c) => clueText.get(c.id)).join('、')}」值得再看看。`
                  : '你把关键线索都注意到了，很好。'}
              </p>
            </div>
          </div>
          <div className="gl-step">
            <span className="gl-step-num">③</span>
            <div>
              <p className="gl-step-t">为什么这个线索更重要</p>
              <p className="gl-step-c">{data.reference.keyBasis[0]}</p>
            </div>
          </div>
          <div className="gl-step">
            <span className="gl-step-num">④</span>
            <div>
              <p className="gl-step-t">如果没抓住它，你的判断还成立吗</p>
              <p className="gl-step-c">很可能不成立：少了最关键的线索，判断就会停在表面，看不到现象之间的关系。</p>
            </div>
          </div>
          <div className="gl-step">
            <span className="gl-step-num">⑤</span>
            <div>
              <p className="gl-step-t">重新判断</p>
              <button className="btn gl-retry-btn" onClick={retry}>
                再想一次
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="gl-takeaway">
        <p className="gl-takeaway-label">🌿 一句话带走</p>
        <p>{data.takeaway}</p>
      </div>

      <p className="gl-safety">{data.safetyNote}</p>

      <div className="reasoning-actions">
        <button className="btn btn-primary" onClick={onContinue}>
          继续探索 →
        </button>
      </div>
    </div>
  );
}