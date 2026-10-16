import type { GoldenLevelNode } from '../../data/golden/yinYangLevel';

type NodeStatus = 'done' | 'current' | 'locked';

function statusOf(doneIds: Set<string>, currentId: string, nodeId: string): NodeStatus {
  if (doneIds.has(nodeId)) return 'done';
  if (nodeId === currentId) return 'current';
  return 'locked';
}

const STATUS_LABEL: Record<NodeStatus, string> = {
  done: '✓ 已完成',
  current: '▶ 在这里',
  locked: '待解锁',
};

/**
 * 知识地图式探索路线：不计技术 ID，只呈现「走到哪、学什么、能得到什么」。
 */
export default function LevelMap({
  nodes,
  doneIds,
  currentId,
  onJump,
}: {
  nodes: GoldenLevelNode[];
  doneIds: Set<string>;
  currentId: string;
  onJump: (id: string) => void;
}) {
  return (
    <div className="gl-levelmap" role="list">
      {nodes.map((n, i) => {
        const st = statusOf(doneIds, currentId, n.id);
        const clickable = st === 'done' || st === 'current';
        return (
          <div key={n.id} className="gl-node-wrap">
            <div
              role="listitem"
              className={'gl-node gl-node-' + st + (clickable ? ' is-clickable' : '')}
              onClick={() => clickable && onJump(n.id)}
            >
              <div className="gl-node-rail">
                <span className={'gl-node-dot gl-node-dot-' + st}>{n.icon}</span>
                {i < nodes.length - 1 ? <span className="gl-node-line" /> : null}
              </div>
              <div className="gl-node-body">
                <div className="gl-node-head">
                  <span className="gl-node-num">{String(n.order).padStart(2, '0')}</span>
                  <span className="gl-node-title">{n.title}</span>
                  <span className={'gl-node-state gl-node-state-' + st}>{STATUS_LABEL[st]}</span>
                </div>
                <p className="gl-node-oneline">{n.oneLine}</p>
                <div className="gl-node-meta">
                  <span className="gl-node-minute">约 {n.minutes} 分钟</span>
                  <span className="gl-node-ability">✦ {n.ability}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}