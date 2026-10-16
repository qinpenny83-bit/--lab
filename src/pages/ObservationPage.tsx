import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../store/progress';
import { observationTasks } from '../data';
import { OBSERVATION_DIMENSIONS } from '../types/models';
import { PageHead } from '../components/ui';

export default function ObservationPage() {
  const p = useProgress();
  const [dim, setDim] = useState<string>('全部');
  const nextTask = observationTasks.find((t) => !p.completedObservations.includes(t.id)) ?? observationTasks[0];
  const doneCount = observationTasks.filter((t) => p.completedObservations.includes(t.id)).length;
  const filtered = dim === '全部' ? observationTasks : observationTasks.filter((t) => t.dimension === dim);

  return (
    <div className="page">
      <PageHead
        title="观察训练"
        sub="每天 2-3 分钟。这里只练一件事：分清「你看到了什么」和「你推测了什么」。"
      />

      <Link to={`/observe/${nextTask.id}`} className="card today-task">
        <span className="today-task-badge">今日推荐训练</span>
        <h3>{nextTask.title}</h3>
        <p>{nextTask.scenario.slice(0, 60)}…</p>
        <span className="case-card-go">开始 3 分钟训练 →</span>
      </Link>

      <div className="dim-chips">
        <button className={'chip' + (dim === '全部' ? ' active' : '')} onClick={() => setDim('全部')}>
          全部
        </button>
        {OBSERVATION_DIMENSIONS.map((d) => (
          <button key={d} className={'chip' + (dim === d ? ' active' : '')} onClick={() => setDim(d)}>
            {d}
          </button>
        ))}
      </div>

      <p className="observe-progress">
        已完成 {doneCount} / {observationTasks.length} 个观察训练
      </p>

      <div className="task-list">
        {filtered.map((t) => {
          const done = p.completedObservations.includes(t.id);
          return (
            <Link key={t.id} to={`/observe/${t.id}`} className={'card task-item' + (done ? ' done' : '')}>
              <span className="task-item-dim">{t.dimension}</span>
              <span className="task-item-title">{t.title}</span>
              {done ? <span className="node-state ok">✓</span> : <span className="case-card-go">练 →</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
