import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { completeLearning, useProgress } from '../store/progress';
import { findObservation, observationTasks } from '../data';
import { OBSERVATION_DIMENSIONS } from '../types/models';
import type { ObservationTask } from '../types/models';
import { Choices, PageHead, Steps } from '../components/ui';

export default function ObservationFlowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const p = useProgress();
  const t: ObservationTask | undefined = findObservation(id ?? '');
  const nextTask = t ? observationTasks.find((x) => !p.completedObservations.includes(x.id)) : undefined;

  const [stage, setStage] = useState(0); // 0看 1客观 2维度 3解释
  const [seen, setSeen] = useState<string[]>([]);
  const [objective, setObjective] = useState<string[]>([]);
  const [dimension, setDimension] = useState<string | null>(null);
  const [result, setResult] = useState<{ correct: boolean; feedback: string[]; explain: string; xp: number } | null>(null);

  if (!t) {
    return (
      <div className="page page-narrow">
        <div className="card empty-card">
          <p>训练不存在。</p>
          <Link to="/observe" className="btn btn-primary">返回观察训练</Link>
        </div>
      </div>
    );
  }

  const submit = () => {
    const { result: r } = completeLearning({
      type: 'observation',
      refId: t.id,
      answers: { seen, objective, dimension },
    });
    setResult({ correct: r.correct, feedback: r.feedback, explain: r.explain ?? '', xp: r.xp });
    setStage(3);
  };

  const goNext = () => {
    if (nextTask) navigate(`/observe/${nextTask.id}`);
    else navigate('/observe');
  };

  const seenOptions = t.seenOptions.map((o) => ({ id: o.id, text: o.text }));
  const objOptions = t.objectiveOptions.map((o) => ({ id: o.id, text: o.text }));

  return (
    <div className="page page-narrow">
      <div className="practice-head">
        <Link to="/observe" className="back-link">← 观察训练</Link>
        <span className="tag">👁️ {t.dimension} · {t.title}</span>
      </div>
      <PageHead title={t.title} sub="只训练观察能力，不下任何个人诊断。" />

      {stage < 3 ? <Steps steps={['你看到了什么', '哪些是客观观察', '属于哪个维度']} current={stage} /> : null}

      <div className="card scenario-card">
        <span className="scenario-label">情境</span>
        <p>{t.scenario}</p>
      </div>

      {stage === 0 ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">「你看到了什么？」</h3>
          <p className="quiz-hint">只勾选"能直接看到/听到的现象"，不要勾推测（可多选）。</p>
          <Choices options={seenOptions} selected={seen} multi onToggle={(ids) => setSeen(ids as string[])} />
          <button className="btn btn-primary" disabled={seen.length === 0} onClick={() => setStage(1)}>
            记录完毕 →
          </button>
        </div>
      ) : null}

      {stage === 1 ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">「哪些属于客观观察？」</h3>
          <p className="quiz-hint">客观观察 = 可确认的事实；推断结论不算。</p>
          <Choices options={objOptions} selected={objective} multi onToggle={(ids) => setObjective(ids as string[])} />
          <button className="btn btn-primary" disabled={objective.length === 0} onClick={() => setStage(2)}>
            区分完毕 →
          </button>
        </div>
      ) : null}

      {stage === 2 ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">「这些现象在中医学习里，通常被放在哪个观察维度？」</h3>
          <Choices
            options={OBSERVATION_DIMENSIONS.map((d) => ({ id: d, text: d }))}
            selected={dimension ? [dimension] : []}
            onToggle={(d) => setDimension(d as string)}
          />
          <button className="btn btn-primary" disabled={!dimension} onClick={submit}>
            提交，看解释 →
          </button>
        </div>
      ) : null}

      {stage === 3 && result ? (
        <div className="rise">
          <div className="card result-card">
            <div className={'result-head ' + (result.correct ? 'ok' : 'no')}>
              {result.correct ? '🎉 观察满分' : '💡 观察要点已记录'}
              <span className="result-xp">+{result.xp} XP</span>
            </div>
            <div className="result-feedback">
              {result.feedback.map((f, i) => (
                <p key={i}>{f}</p>
              ))}
            </div>
          </div>
          <div className="card teacher-card">
            <div className="teacher-head">👨‍🏫 解释</div>
            <p className="teacher-theory">{result.explain}</p>
          </div>
          <div className="flow-actions">
            <button className="btn btn-primary" onClick={goNext}>
              {nextTask ? '下一个观察训练 →' : '完成全部训练 🎉'}
            </button>
            <Link to="/paradox" className="btn btn-ghost">试试反直觉挑战</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
