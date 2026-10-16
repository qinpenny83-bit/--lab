import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { completeLearning, engine, useProgress } from '../store/progress';
import { findClassic, classics } from '../data';
import type { ClassicFragment } from '../types/models';
import { Choices, PageHead, Steps } from '../components/ui';

export default function ClassicDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const p = useProgress();
  const f: ClassicFragment | undefined = findClassic(id ?? '');
  const next = f ? classics.find((x) => !p.completedClassics.includes(x.id)) : undefined;

  const [stage, setStage] = useState(0); // 0原文 1猜意思 2关键词+人话+思维 3小挑战 4完成
  const [guess, setGuess] = useState<string | null>(null);
  const [guessFeedback, setGuessFeedback] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [finalResult, setFinalResult] = useState<{ feedback: string[]; explain: string; xp: number } | null>(null);

  if (!f) {
    return (
      <div className="page page-narrow">
        <div className="card empty-card">
          <p>片段不存在。</p>
          <Link to="/classic" className="btn btn-primary">返回经典解码</Link>
        </div>
      </div>
    );
  }

  const submitGuess = () => {
    if (!guess) return;
    const r = engine.evaluate({ type: 'classic', refId: f.id, answers: { guess } });
    setGuessFeedback(r.feedback[0] ?? '');
    setStage(2);
  };

  const submitChallenge = () => {
    if (!challenge) return;
    const { result: r } = completeLearning({
      type: 'classic',
      refId: f.id,
      answers: { guess, challenge },
    });
    setFinalResult({ feedback: r.feedback, explain: r.explain ?? '', xp: r.xp });
    setStage(3);
  };

  const goNext = () => {
    if (next) navigate(`/classic/${next.id}`);
    else navigate('/classic');
  };

  return (
    <div className="page page-narrow">
      <div className="practice-head">
        <Link to="/classic" className="back-link">← 经典解码</Link>
        <span className="tag">{f.book}</span>
      </div>

      <div className="card original-card">
        <span className="original-book">{f.book} · {f.title}</span>
        <p className="original-text">「{f.original}」</p>
      </div>

      {stage === 0 ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">先别查翻译——你猜这段话是什么意思？</h3>
          <Choices
            options={f.guessOptions.map((o) => ({ id: o.id, text: o.text }))}
            selected={guess ? [guess] : []}
            onToggle={(g) => setGuess(g as string)}
          />
          <button className="btn btn-primary" disabled={!guess} onClick={submitGuess}>
            我猜完了 →
          </button>
        </div>
      ) : null}

      {stage >= 2 ? (
        <div className="rise">
          <div className="card result-card">
            <div className="result-head ok">📖 关键词拆解</div>
            <div className="keyword-list">
              {f.keywords.map((k) => (
                <div key={k.term} className="keyword-row">
                  <span className="keyword-term">{k.term}</span>
                  <span className="keyword-explain">{k.explain}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card teacher-card">
            <div className="teacher-head">🗣️ 人话解释</div>
            <p className="teacher-theory">{f.plain}</p>
          </div>

          <div className="card teacher-card">
            <div className="teacher-head">🧠 中医思维</div>
            <p className="teacher-theory">{f.insight}</p>
          </div>

          {stage === 2 ? (
            <div className="card quiz-card rise">
              <h3 className="quiz-q">小挑战：这段经典教你的方法，放在今天怎么用？</h3>
              <Choices
                options={f.challenge.options.map((o) => ({ id: o.id, text: o.text }))}
                selected={challenge ? [challenge] : []}
                onToggle={(c) => setChallenge(c as string)}
              />
              <button className="btn btn-primary" disabled={!challenge} onClick={submitChallenge}>
                完成挑战 →
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {stage === 3 && finalResult ? (
        <div className="rise">
          <div className="card result-card">
            <div className="result-head ok">🎉 解码完成 +{finalResult.xp} XP</div>
            <div className="result-feedback">
              {finalResult.feedback.map((fb, i) => (
                <p key={i}>{fb}</p>
              ))}
            </div>
          </div>
          <div className="flow-actions">
            <button className="btn btn-primary" onClick={goNext}>
              {next ? '下一个经典片段 →' : '完成全部经典 🎉'}
            </button>
            <Link to="/brain" className="btn btn-ghost">查看学习画像</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
