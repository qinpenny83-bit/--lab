import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { completeLearning, engine, useProgress } from '../store/progress';
import { findFormula, formulas } from '../data';
import type { Formula } from '../types/models';
import { Choices, PageHead, SafetyNote } from '../components/ui';

export default function FormulaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const p = useProgress();
  const f: Formula | undefined = findFormula(id ?? '');
  const nextFormula = f ? formulas.find((x) => !p.completedFormulas.includes(x.id)) : undefined;

  const [activeHerb, setActiveHerb] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [herbFeedback, setHerbFeedback] = useState<Record<string, { correct: boolean; explain: string }>>({});
  const [done, setDone] = useState(false);
  const [finalResult, setFinalResult] = useState<{ correct: boolean; feedback: string[]; explain: string; xp: number } | null>(null);

  if (!f) {
    return (
      <div className="page page-narrow">
        <div className="card empty-card">
          <p>方剂不存在。</p>
          <Link to="/formula" className="btn btn-primary">返回方剂实验室</Link>
        </div>
      </div>
    );
  }

  const explored = Object.keys(answers).length;
  const allExplored = explored === f.herbs.length;
  const active = f.herbs.find((h) => h.id === activeHerb);

  const answerHerb = (optionId: string) => {
    if (!active) return;
    const r = engine.evaluate({
      type: 'formula',
      refId: f.id,
      answers: { herbId: active.id, optionId },
    });
    setAnswers((a) => ({ ...a, [active.id]: optionId }));
    setHerbFeedback((m) => ({ ...m, [active.id]: { correct: r.correct, explain: r.feedback[0] ?? '' } }));
  };

  const finish = () => {
    const { result: r } = completeLearning({
      type: 'formula',
      refId: f.id,
      answers: { herbAnswers: answers },
    });
    setFinalResult({ correct: r.correct, feedback: r.feedback, explain: r.explain ?? '', xp: r.xp });
    setDone(true);
  };

  const goNext = () => {
    if (nextFormula) navigate(`/formula/${nextFormula.id}`);
    else navigate('/formula');
  };

  return (
    <div className="page page-narrow">
      <div className="practice-head">
        <Link to="/formula" className="back-link">← 方剂实验室</Link>
        <span className="tag">🍵 方剂结构理解</span>
      </div>
      <PageHead title={f.name} sub={f.function} />

      <div className="card formula-info">
        <p><strong>出处：</strong>{f.source}</p>
        <p><strong>主治：</strong>{f.indication}</p>
        <div className="formula-herbs-row">
          {f.herbs.map((h) => {
            const doneHerb = herbFeedback[h.id] !== undefined;
            return (
              <button
                key={h.id}
                className={'herb-chip' + (activeHerb === h.id ? ' active' : '') + (doneHerb ? (herbFeedback[h.id].correct ? ' ok' : ' no') : '')}
                onClick={() => setActiveHerb(h.id)}
              >
                {h.name}
                {doneHerb ? (herbFeedback[h.id].correct ? ' ✓' : ' ✗') : ''}
              </button>
            );
          })}
        </div>
        <p className="formula-progress">
          已探索 {explored} / {f.herbs.length} 味药
        </p>
      </div>

      {active ? (
        <div className="card quiz-card rise" key={active.id}>
          <h3 className="quiz-q">
            「{active.name}」在方中的角色
          </h3>
          <p className="quiz-hint">{active.role} — {active.note}</p>
          <div className="removal-q">
            <p>🤔 {active.removalQuestion}</p>
          </div>
          <Choices
            options={active.removalOptions.map((o) => ({ id: o.id, text: o.text }))}
            selected={answers[active.id] ? [answers[active.id]] : []}
            onToggle={(oid) => answerHerb(oid as string)}
            locked={!!herbFeedback[active.id]}
          />
          {herbFeedback[active.id] ? (
            <div className={'herb-feedback ' + (herbFeedback[active.id].correct ? 'ok' : 'no')}>
              {herbFeedback[active.id].explain}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="card hint-card">
          <p>👆 点击任意一味药材，思考"如果少了它，方子的整体思路会怎样变化？"</p>
        </div>
      )}

      {allExplored && !done ? (
        <button className="btn btn-primary btn-lg" onClick={finish}>
          我已理解全部配伍，完成修炼 →
        </button>
      ) : null}

      {done && finalResult ? (
        <div className="rise">
          <div className="card result-card">
            <div className={'result-head ' + (finalResult.correct ? 'ok' : 'no')}>
              {finalResult.correct ? '🎉 方剂结构理解满分' : '💡 配伍思路已记录'}
              <span className="result-xp">+{finalResult.xp} XP</span>
            </div>
            <div className="result-feedback">
              {finalResult.feedback.map((fb, i) => (
                <p key={i}>{fb}</p>
              ))}
            </div>
          </div>
          <div className="card teacher-card">
            <div className="teacher-head">🧭 整体思路</div>
            <p className="teacher-theory">{finalResult.explain}</p>
            <div className="safety-box">🛡️ {f.safety}</div>
          </div>
          <div className="flow-actions">
            <button className="btn btn-primary" onClick={goNext}>
              {nextFormula ? '下一个方剂 →' : '完成全部方剂 🎉'}
            </button>
            <Link to="/classic" className="btn btn-ghost">去经典解码</Link>
          </div>
        </div>
      ) : null}

      <SafetyNote />
    </div>
  );
}
