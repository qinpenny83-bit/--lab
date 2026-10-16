import { Link } from 'react-router-dom';
import { useProgress } from '../store/progress';
import { cases } from '../data';
import { TOPIC_META } from '../types/models';
import { PageHead } from '../components/ui';

export default function CasesPage() {
  const p = useProgress();

  return (
    <div className="page">
      <PageHead
        title="病例推理"
        sub="每个病例都是一场思维训练：先观察，再追问，再组合线索，最后形成推理。"
      />
      <p className="map-tip">⚠️ 病例均为教学虚构，不用于真实诊断。</p>
      <div className="case-grid">
        {cases.map((c) => {
          const done = p.completedCases.includes(c.id);
          return (
            <Link key={c.id} to={`/cases/${c.id}`} className={'card case-card' + (done ? ' done' : '')}>
              <div className="case-card-head">
                <span className="tag">{TOPIC_META[c.topic].emoji} {TOPIC_META[c.topic].name}</span>
                <span className={'case-diff diff-' + c.difficulty}>
                  {'●'.repeat(c.difficulty)}
                  <span className="diff-ghost">{'●'.repeat(3 - c.difficulty)}</span>
                </span>
              </div>
              <h3 className="case-card-title">{c.title}</h3>
              <p className="case-card-complaint">{c.complaint}</p>
              <div className="case-card-foot">
                {done ? <span className="node-state ok">✓ 已完成</span> : <span className="node-state">未开始</span>}
                <span className="case-card-go">开始推理 →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
