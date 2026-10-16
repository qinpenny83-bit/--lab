import { Link } from 'react-router-dom';
import { useProgress } from '../store/progress';
import { formulas } from '../data';
import { PageHead, SafetyNote } from '../components/ui';

export default function FormulaPage() {
  const p = useProgress();
  const doneCount = formulas.filter((f) => p.completedFormulas.includes(f.id)).length;

  return (
    <div className="page">
      <PageHead
        title="方剂实验室"
        sub="不教你开药，教你理解方剂结构：药材 → 作用 → 配伍 → 整体思路。"
      />
      <p className="observe-progress">已理解 {doneCount} / {formulas.length} 个方剂</p>
      <div className="formula-grid">
        {formulas.map((f) => {
          const done = p.completedFormulas.includes(f.id);
          return (
            <Link key={f.id} to={`/formula/${f.id}`} className={'card formula-card' + (done ? ' done' : '')}>
              <div className="formula-card-head">
                <span className="formula-name">{f.name}</span>
                {done ? <span className="node-state ok">✓ 已理解</span> : null}
              </div>
              <p className="formula-source">出处：{f.source}</p>
              <p className="formula-fn">{f.function}</p>
              <p className="formula-herbs">{f.herbs.map((h) => h.name).join(' · ')}</p>
              <span className="case-card-go">拆解结构 →</span>
            </Link>
          );
        })}
      </div>
      <SafetyNote />
    </div>
  );
}
