import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../store/progress';
import { classics } from '../data';
import { PageHead } from '../components/ui';

const BOOKS = ['全部', '黄帝内经', '伤寒论', '金匮要略'] as const;

export default function ClassicPage() {
  const p = useProgress();
  const [book, setBook] = useState<string>('全部');
  const list = book === '全部' ? classics : classics.filter((c) => c.book === book);

  return (
    <div className="page">
      <PageHead
        title="经典解码"
        sub="原文 → 猜意思 → 关键词拆解 → 人话解释 → 中医思维 → 小挑战。让普通人觉得经典原来可以理解。"
      />
      <div className="book-tabs">
        {BOOKS.map((b) => (
          <button key={b} className={'chip' + (book === b ? ' active' : '')} onClick={() => setBook(b)}>
            {b}
          </button>
        ))}
      </div>
      <div className="classic-list">
        {list.map((c) => {
          const done = p.completedClassics.includes(c.id);
          return (
            <Link key={c.id} to={`/classic/${c.id}`} className={'card classic-item' + (done ? ' done' : '')}>
              <div className="classic-item-head">
                <span className="tag">{c.book}</span>
                {done ? <span className="node-state ok">✓ 已解码</span> : null}
              </div>
              <p className="classic-item-original">「{c.original.length > 46 ? c.original.slice(0, 46) + '…' : c.original}」</p>
              <span className="case-card-go">开始解码 →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
