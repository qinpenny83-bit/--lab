import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { completeLearning, useProgress } from '../store/progress';
import { findParadox, paradoxChallenges } from '../data';
import type { ParadoxChallenge } from '../types/models';
import { Choices, PageHead, Steps } from '../components/ui';

export default function ParadoxFlowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const p = useProgress();
  const c: ParadoxChallenge | undefined = findParadox(id ?? '');
  const next = c ? paradoxChallenges.find((x) => !p.completedParadoxes.includes(x.id)) : undefined;

  const [stage, setStage] = useState(0); // 0命题 1案例一 2案例二 3原理
  const [claim, setClaim] = useState<string | null>(null);
  const [caseA, setCaseA] = useState<string | null>(null);
  const [caseB, setCaseB] = useState<string | null>(null);
  const [result, setResult] = useState<{ feedback: string[]; explain: string; xp: number } | null>(null);

  if (!c) {
    return (
      <div className="page page-narrow">
        <div className="card empty-card">
          <p>挑战不存在。</p>
          <Link to="/paradox" className="btn btn-primary">返回反直觉挑战</Link>
        </div>
      </div>
    );
  }

  const submitAll = () => {
    const { result: r } = completeLearning({
      type: 'paradox',
      refId: c.id,
      answers: { claim, caseA, caseB },
    });
    setResult({ feedback: r.feedback, explain: r.explain ?? '', xp: r.xp });
    setStage(3);
  };

  const goNext = () => {
    if (next) navigate(`/paradox/${next.id}`);
    else navigate('/paradox');
  };

  return (
    <div className="page page-narrow">
      <div className="practice-head">
        <Link to="/paradox" className="back-link">← 反直觉挑战</Link>
        <span className="tag">🧠 单症状 ≠ 单答案</span>
      </div>
      <PageHead title={c.title} sub={c.intro} />

      {stage < 3 ? <Steps steps={['判断命题', '案例一', '案例二']} current={stage} /> : null}

      {stage === 0 ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">{c.claim}</h3>
          <p className="quiz-hint">先凭直觉回答，后面两个案例会检验你的直觉。</p>
          <Choices
            options={c.claimOptions.map((o) => ({ id: o.id, text: o.text }))}
            selected={claim ? [claim] : []}
            onToggle={(id) => setClaim(id as string)}
            size="lg"
          />
          <button className="btn btn-primary" disabled={!claim} onClick={() => setStage(1)}>
            记住你的答案 →
          </button>
        </div>
      ) : null}

      {stage >= 1 ? (
        <div className="card scenario-card paradox-case">
          <span className="scenario-label">案例一 · {c.cases[0].title}</span>
          <p>{c.cases[0].scenario}</p>
        </div>
      ) : null}

      {stage === 1 ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">{c.cases[0].question}</h3>
          <Choices
            options={c.cases[0].options.map((o) => ({ id: o.id, text: o.text }))}
            selected={caseA ? [caseA] : []}
            onToggle={(id) => setCaseA(id as string)}
          />
          <button className="btn btn-primary" disabled={!caseA} onClick={() => setStage(2)}>
            下一个案例 →
          </button>
        </div>
      ) : null}

      {stage >= 2 ? (
        <div className="card scenario-card paradox-case">
          <span className="scenario-label">案例二 · {c.cases[1].title}</span>
          <p>{c.cases[1].scenario}</p>
        </div>
      ) : null}

      {stage === 2 ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">{c.cases[1].question}</h3>
          <Choices
            options={c.cases[1].options.map((o) => ({ id: o.id, text: o.text }))}
            selected={caseB ? [caseB] : []}
            onToggle={(id) => setCaseB(id as string)}
          />
          <button className="btn btn-primary" disabled={!caseB} onClick={submitAll}>
            揭晓原理 →
          </button>
        </div>
      ) : null}

      {stage === 3 && result ? (
        <div className="rise">
          <div className="card result-card">
            <div className="result-head ok">🎉 挑战完成 +{result.xp} XP</div>
            <div className="result-feedback">
              {result.feedback.map((fb, i) => (
                <p key={i}>{fb}</p>
              ))}
            </div>
          </div>
          <div className="card teacher-card">
            <div className="teacher-head">🧠 核心教学点</div>
            <p className="teacher-theory">{result.explain}</p>
            <div className="safety-box">
              🛡️ 记住：看整体、看组合、看变化、看上下文——这正是中医思维与"症状查表"的本质区别。
            </div>
          </div>
          <div className="flow-actions">
            <button className="btn btn-primary" onClick={goNext}>
              {next ? '下一个挑战 →' : '完成全部挑战 🎉'}
            </button>
            <Link to="/cases" className="btn btn-ghost">去病例里实战</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
