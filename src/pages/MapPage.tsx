import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../store/progress';
import { TOPIC_META, TOPIC_ORDER } from '../types/models';
import type { TopicId } from '../types/models';
import { nodesByTopic } from '../data';
import { PageHead } from '../components/ui';

type NodeState = 'mastered' | 'learning' | 'review' | 'locked' | 'fresh';

const STATE_LABEL: Record<NodeState, { text: string; cls: string; icon: string }> = {
  mastered: { text: '已掌握', cls: 'ok', icon: '✓' },
  learning: { text: '正在学习', cls: '', icon: '📖' },
  review: { text: '需要复习', cls: 'warn', icon: '↻' },
  locked: { text: '尚未解锁', cls: 'lock', icon: '🔒' },
  fresh: { text: '待修炼', cls: 'fresh', icon: '🌱' },
};

export default function MapPage() {
  const p = useProgress();
  const [selected, setSelected] = useState<TopicId | null>(null);

  const rate = (t: TopicId) => {
    const m = p.mastery[t];
    if (!m || m.total === 0) return 0;
    return m.correct / m.total;
  };

  const unlocked = useMemo(() => {
    const set = new Set<TopicId>();
    for (const t of TOPIC_ORDER) {
      const prereq = TOPIC_META[t].prereq;
      if (!prereq) set.add(t);
      else if (rate(prereq) >= 0.5) set.add(t);
    }
    return set;
  }, [p.mastery]);

  const isUnlocked = (t: TopicId) => unlocked.has(t);

  /** 状态判定：已掌握 / 正在学习 / 需要复习 / 尚未解锁 / 待修炼 */
  const stateOf = (t: TopicId): NodeState => {
    if (!isUnlocked(t)) return 'locked';
    const r = rate(t);
    if (r >= 0.8) return 'mastered';
    const wp = p.weakPoints.find((w) => w.topic === t && w.count > 0);
    if (wp && (p.mastery[t]?.total ?? 0) > 0) return 'review';
    if ((p.mastery[t]?.total ?? 0) > 0) return 'learning';
    return 'fresh';
  };

  /** 前置链：它建立在哪些主题之上（含跨级） */
  const prereqChain = (t: TopicId): TopicId[] => {
    const chain: TopicId[] = [];
    let cur = TOPIC_META[t].prereq;
    while (cur) {
      chain.unshift(cur);
      cur = TOPIC_META[cur].prereq;
    }
    return chain;
  };

  /** 后续链：它将延伸至哪些主题（沿路径向前） */
  const nextChain = (t: TopicId): TopicId[] => {
    const i = TOPIC_ORDER.indexOf(t);
    return TOPIC_ORDER.slice(i + 1);
  };

  const selectedId: TopicId = selected ?? (TOPIC_ORDER.find((t) => isUnlocked(t)) ?? TOPIC_ORDER[0]);
  const selMeta = TOPIC_META[selectedId];
  const before = prereqChain(selectedId);
  const after = nextChain(selectedId);
  const chainNodes: TopicId[] = [...before, selectedId, ...after];
  const topicNodes = nodesByTopic(selectedId);

  return (
    <div className="page">
      <PageHead
        title="中医入门地图"
        sub="一条由浅入深的修炼路径。点击主题，看它在知识网络中如何生长。"
      />
      <p className="map-tip">💡 每个主题掌握度达到 50% 后，下一主题自动解锁。</p>

      {/* 线性修炼路径 */}
      <div className="journey">
        {TOPIC_ORDER.map((t, i) => {
          const meta = TOPIC_META[t];
          const r = rate(t);
          const open = isUnlocked(t);
          const mastered = r >= 0.8;
          const started = (p.mastery[t]?.total ?? 0) > 0;
          const todayRec = p.recommendedTasks.find((rec) => rec.topic === t);
          const st = stateOf(t);
          return (
            <div key={t} className={'journey-node-wrap' + (i < TOPIC_ORDER.length - 1 ? ' has-line' : '')}>
              <button
                type="button"
                className={
                  'journey-node' +
                  (mastered ? ' mastered' : started ? ' started' : '') +
                  (t === selectedId ? ' selected' : '')
                }
                onClick={() => setSelected(t)}
              >
                {open ? (
                  <>
                    <span className="node-emoji">{meta.emoji}</span>
                    <span className="node-body">
                      <span className="node-title-row">
                        <span className="node-title">{meta.name}</span>
                        {t === selectedId ? <span className="node-state cur">查看中</span> : null}
                        {mastered ? <span className="node-state ok">已掌握</span> : null}
                        {!mastered && st === 'review' ? <span className="node-state warn">需复习</span> : null}
                        {todayRec ? <span className="node-state rec">今日推荐</span> : null}
                      </span>
                      <span className="node-desc">{meta.desc}</span>
                      <span className="node-bar">
                        <span className="node-bar-fill" style={{ width: `${Math.round(r * 100)}%` }} />
                      </span>
                    </span>
                    <span className="node-go">→</span>
                  </>
                ) : (
                  <>
                    <span className="node-emoji">🔒</span>
                    <span className="node-body">
                      <span className="node-title-row">
                        <span className="node-title">{meta.name}</span>
                      </span>
                      <span className="node-desc">需先掌握「{TOPIC_META[meta.prereq!].name}」50%</span>
                      <span className="node-bar">
                        <span className="node-bar-fill" style={{ width: '0%' }} />
                      </span>
                    </span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* 第二层：知识网络关系展示 */}
      <div className="card map-net-card rise">
        <div className="card-title-row">
          <h3>
            {selMeta.emoji} {selMeta.name} · 在知识网络中的位置
          </h3>
          <Link to={`/map/${selectedId}`} className="btn btn-primary btn-sm">
            进入修炼 →
          </Link>
        </div>
        <p className="net-sub">你的中医思维正在形成一张网络：每个主题都与前后主题相连。</p>

        <div className="net-path">
          {chainNodes.map((t, i) => {
            const st = stateOf(t);
            const s = STATE_LABEL[st];
            const isCur = t === selectedId;
            return (
              <div key={t} className={'net-node' + (isCur ? ' cur' : '')}>
                <button type="button" className="net-node-btn" onClick={() => setSelected(t)} disabled={!isUnlocked(t)}>
                  <span className="net-node-emoji">{isUnlocked(t) ? TOPIC_META[t].emoji : '🔒'}</span>
                  <span className="net-node-name">{isCur ? selMeta.name : TOPIC_META[t].name}</span>
                </button>
                <span className={'net-state ' + s.cls}>
                  {s.icon} {s.text}
                </span>
                {i < chainNodes.length - 1 ? <span className="net-arrow">→</span> : null}
              </div>
            );
          })}
        </div>

        <div className="net-legend">
          <span className="net-legend-item ok">✓ 已掌握</span>
          <span className="net-legend-item">📖 正在学习</span>
          <span className="net-legend-item warn">↻ 需要复习</span>
          <span className="net-legend-item fresh">🌱 待修炼</span>
          <span className="net-legend-item lock">🔒 尚未解锁</span>
        </div>

        {/* 本主题知识节点清单 */}
        <div className="net-nodes">
          <h4 className="net-nodes-title">本主题修炼清单</h4>
          <div className="net-node-list">
            {topicNodes.map((n) => {
              const done = p.completedKnowledge.includes(n.id);
              return (
                <Link key={n.id} to={`/map/${selectedId}`} className="net-knowledge">
                  <span className={'net-k-dot ' + (done ? 'done' : '')}>{done ? '✓' : '○'}</span>
                  <span className="net-k-title">{n.title}</span>
                  <span className={'net-k-state ' + (done ? 'ok' : '')}>{done ? '已修炼' : '未修炼'}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <p className="map-manage-link">
        <Link to="/library" className="btn btn-ghost btn-sm">内容管理后台 →</Link>
      </p>
    </div>
  );
}
