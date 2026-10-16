import { Link } from 'react-router-dom';
import { useProgress } from '../store/progress';
import { paradoxChallenges } from '../data';
import { PageHead } from '../components/ui';

export default function ParadoxPage() {
  const p = useProgress();
  const doneCount = paradoxChallenges.filter((c) => p.completedParadoxes.includes(c.id)).length;

  return (
    <div className="page">
      <PageHead
        title="🧠 中医反直觉挑战"
        sub="中医不是一个症状对应一个答案。每个挑战都会用两个对比案例，让你发现：同样一个表面症状，在不同整体背景下需要不同思考。"
      />
      <p className="observe-progress">已完成 {doneCount} / {paradoxChallenges.length} 个挑战</p>
      <div className="paradox-list">
        {paradoxChallenges.map((c) => {
          const done = p.completedParadoxes.includes(c.id);
          return (
            <Link key={c.id} to={`/paradox/${c.id}`} className={'card paradox-item' + (done ? ' done' : '')}>
              <div className="paradox-item-head">
                <span className="paradox-claim">{c.claim}</span>
                {done ? <span className="node-state ok">✓</span> : null}
              </div>
              <p className="paradox-intro">{c.intro.slice(0, 48)}{c.intro.length > 48 ? '…' : ''}</p>
              <span className="case-card-go">开始挑战 →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
