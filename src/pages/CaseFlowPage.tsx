import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { completeLearning, useProgress, BADGES } from '../store/progress';
import { findCase, cases } from '../data';
import { TOPIC_META } from '../types/models';
import type { Case, Badge } from '../types/models';
import { Choices, PageHead } from '../components/ui';

const BADGE_MAP = Object.fromEntries(BADGES.map((b) => [b.id, b]));

type Mode = 'investigate' | 'observe' | 'ask' | 'judge' | 'result';

export default function CaseFlowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const p = useProgress();
  const c: Case | undefined = findCase(id ?? '');
  const nextCase = c ? cases.find((x) => !p.completedCases.includes(x.id)) : undefined;

  const [mode, setMode] = useState<Mode>('investigate');
  const [unlocked, setUnlocked] = useState(2);
  const [seen, setSeen] = useState<string[]>([]);
  const [question, setQuestion] = useState<string | null>(null);
  const [hypothesis, setHypothesis] = useState<string | null>(null);
  const [result, setResult] = useState<{
    correct: boolean;
    feedback: string[];
    explain: string;
    xp: number;
  } | null>(null);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  if (!c) {
    return (
      <div className="page page-narrow">
        <div className="card empty-card">
          <p>病例不存在。</p>
          <Link to="/cases" className="btn btn-primary">返回病例列表</Link>
        </div>
      </div>
    );
  }

  const totalClues = c.clues.length;
  const maxUnlock = Math.min(totalClues, Math.max(3, c.correctObservationIds.length + 1));
  const visibleClues = c.clues.slice(0, unlocked);
  const lockedClues = totalClues - unlocked;

  const submitCase = () => {
    if (!c) return;
    const { result: r, newBadges: nb } = completeLearning({
      type: 'case',
      refId: c.id,
      answers: { seen, question, keyClue: hypothesis ?? '', hypothesis },
    });
    setResult({ correct: r.correct, feedback: r.feedback, explain: r.explain ?? '', xp: r.xp });
    setNewBadges(nb);
    setMode('result');
  };

  const goNext = () => {
    if (nextCase) navigate(`/cases/${nextCase.id}`);
    else navigate('/cases');
  };

  const progressPct = Math.min(
    100,
    Math.round(((unlocked / totalClues) * 0.4 + (question ? 0.2 : 0) + (seen.length ? 0.2 : 0) + (hypothesis ? 0.2 : 0)) * 100)
  );

  return (
    <div className="page page-narrow">
      <div className="practice-head">
        <Link to="/cases" className="back-link">← 病例列表</Link>
        <span className="tag">{TOPIC_META[c.topic].emoji} {TOPIC_META[c.topic].name}</span>
        <span className="tag tag-soft">难度 {'★'.repeat(c.difficulty)}</span>
      </div>

      {mode !== 'result' ? (
        <PageHead
          title="🔍 案件推理"
          sub="像侦探一样：先收集线索，再组合推理。不要急着下结论。"
        />
      ) : null}

      {/* 案件文件 */}
      <div className="card case-file">
        <div className="case-file-top">
          <h3>📁 案件 · {c.title}</h3>
          <span className="case-file-id">#{c.id.slice(-3)}</span>
        </div>
        <p className="case-goal">🎯 任务目标：{c.background.includes('，') ? c.background.split('，')[0] : '还原这个案例的推理过程'}。请你像侦探一样，从线索出发，还原这个案例的推理过程。</p>
        <p className="case-background">👤 {c.background}</p>
        <p className="case-complaint">
          <strong>主诉：</strong>
          {c.complaint}
        </p>
      </div>

      {/* 推理进度 */}
      <div className="card deduction-card">
        <div className="deduction-head">
          <span>🧠 推理进度</span>
          <span className="deduction-pct">{progressPct}%</span>
        </div>
        <div className="deduction-bar">
          <div className="deduction-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="deduction-meta">
          <span>🔍 线索 {unlocked} / {totalClues}</span>
          <span>❓ {question ? '已提问 1 个关键问题' : '待提问'}</span>
          <span>👁️ {seen.length ? `已观察 ${seen.length} 项` : '未观察'}</span>
          <span>🧩 {hypothesis ? '已形成判断' : '未判断'}</span>
        </div>
        <p className="card-hint">提示：线索有限，先观察，再判断。</p>
      </div>

      {mode === 'investigate' ? (
        <div className="card clue-card rise">
          <h4>📋 已发现线索</h4>
          <ul className="clue-list">
            {visibleClues.map((cl) => (
              <li key={cl.id} className={'clue-item clue-' + cl.kind}>
                <span className="clue-dot" />
                {cl.text}
                <span className="clue-kind">
                  {cl.kind === 'objective' ? '客观' : cl.kind === 'subjective' ? '主观' : '推断'}
                </span>
              </li>
            ))}
          </ul>
          {lockedClues > 0 ? (
            <p className="clue-locked">
              🔒 还有 {lockedClues} 条线索尚未发现（主动查看可解锁）
            </p>
          ) : (
            <p className="clue-locked">已发现本案件全部可观察线索。</p>
          )}

          <div className="detective-actions">
            <button
              className="btn btn-ghost"
              disabled={unlocked >= maxUnlock}
              onClick={() => setUnlocked((u) => Math.min(maxUnlock, u + 1))}
            >
              {unlocked >= maxUnlock ? '线索已全部解锁' : `🔍 查看线索（余 ${maxUnlock - unlocked} 次）`}
            </button>
            <button className="btn btn-ghost" onClick={() => setMode('ask')}>
              {question ? '❓ 更换追问' : '❓ 提出问题'}
            </button>
            <button className="btn btn-ghost" onClick={() => setMode('observe')}>
              👁️ 继续观察
            </button>
            <button className="btn btn-primary" onClick={() => setMode('judge')}>
              🧩 形成判断
            </button>
          </div>
        </div>
      ) : null}

      {/* 观察：从已发现线索中选择客观观察 */}
      {mode === 'observe' ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">继续观察：从已发现线索中，哪些是你"观察到的现象"？</h3>
          <p className="quiz-hint">只选客观现象，不选推测（可多选）。</p>
          <Choices
            options={visibleClues.map((cl) => ({ id: cl.id, text: cl.text }))}
            selected={seen}
            multi
            onToggle={(ids) => setSeen(ids as string[])}
          />
          <div className="flow-actions">
            <button className="btn btn-ghost" onClick={() => setMode('investigate')}>← 回案件</button>
            <button className="btn btn-primary" disabled={seen.length === 0} onClick={() => setMode('investigate')}>
              保存观察 →
            </button>
          </div>
        </div>
      ) : null}

      {/* 追问 */}
      {mode === 'ask' ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">提出问题：如果只能再问一个问题，你会问什么？</h3>
          <Choices
            options={c.questions.map((q) => ({ id: q.id, text: q.text }))}
            selected={question ? [question] : []}
            onToggle={(qid) => setQuestion(qid as string)}
          />
          <div className="flow-actions">
            <button className="btn btn-ghost" onClick={() => setMode('investigate')}>← 回案件</button>
            <button className="btn btn-primary" disabled={!question} onClick={() => setMode('investigate')}>
              确认追问 →
            </button>
          </div>
        </div>
      ) : null}

      {/* 形成判断 */}
      {mode === 'judge' ? (
        <div className="card quiz-card rise">
          <h3 className="quiz-q">形成判断：综合你已发现的线索，你的初步推理是？</h3>
          <Choices
            options={c.hypotheses.map((h) => ({ id: h.id, text: h.text }))}
            selected={hypothesis ? [hypothesis] : []}
            onToggle={(hid) => setHypothesis(hid as string)}
          />
          <div className="flow-actions">
            <button className="btn btn-ghost" onClick={() => setMode('investigate')}>← 再想想</button>
            <button className="btn btn-primary" disabled={!hypothesis} onClick={submitCase}>
              提交判断，听 Agent 反馈 →
            </button>
          </div>
        </div>
      ) : null}

      {/* 反馈 */}
      {mode === 'result' && result ? (
        <div className="rise">
          <div className="card result-card">
            <div className={'result-head ' + (result.correct ? 'ok' : 'no')}>
              {result.correct ? '🎉 推理方向正确' : '🧠 已记录你的推理，看看 Agent 怎么说'}
              <span className="result-xp">+{result.xp} XP</span>
            </div>
            {newBadges.length ? (
              <div className="badge-toast">
                {newBadges.map((b) => {
                  const def = BADGE_MAP[b.id];
                  return (
                    <span key={b.id} className="badge-toast-item">
                      {def.icon} 获得徽章「{def.name}」
                    </span>
                  );
                })}
              </div>
            ) : null}
            <h4>🤖 Agent 反馈</h4>
            <div className="result-feedback">
              {result.feedback.map((f, i) => (
                <p key={i}>{f}</p>
              ))}
            </div>
          </div>

          <div className="card teacher-card">
            <div className="teacher-head">👨‍🏫 中医老师解释</div>
            <ol className="teacher-reasoning">
              {c.teaching.reasoning.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ol>
            <p className="teacher-theory">{result.explain}</p>
            <div className="safety-box">🛡️ 安全边界：{c.teaching.safetyBoundary}</div>
          </div>

          <div className="flow-actions">
            <button className="btn btn-primary" onClick={goNext}>
              {nextCase ? '下一个案件 →' : '完成全部案件 🎉'}
            </button>
            <Link to="/brain" className="btn btn-ghost">查看学习画像</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
