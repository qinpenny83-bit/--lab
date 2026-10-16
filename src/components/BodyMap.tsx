import { useState } from 'react';

// 交互式人体器官位置图（写实医学插画版，正面观）
// 底图：Wikimedia Commons 公有领域写实人体解剖图（Mikael Häggström，PD-self）
// 热区：透明覆盖层，坐标基于底图 viewBox 1363×1212 目测校准
// 医学左右以被观察者为准（图中左侧 = 人体右侧）。

export type BodyPartId =
  | 'brain' | 'lung' | 'heart' | 'liver' | 'gallbladder' | 'stomach'
  | 'spleen' | 'pancreas' | 'small' | 'large' | 'kidney' | 'bladder';

interface PartSpec {
  id: BodyPartId;
  name: string;
  func: string;
}

export const BODY_PARTS: PartSpec[] = [
  { id: 'brain', name: '脑', func: '总指挥部：思维、记忆、感觉运动、平衡协调' },
  { id: 'lung', name: '肺', func: '换气站：氧气进血、二氧化碳排出（右三叶左两叶）' },
  { id: 'heart', name: '心', func: '动力泵：把血泵向全身，终生不停' },
  { id: 'liver', name: '肝', func: '化工厂：解毒、代谢、分泌胆汁、储存营养' },
  { id: 'gallbladder', name: '胆', func: '胆汁仓库：储存肝分泌的胆汁，吃油时释放' },
  { id: 'stomach', name: '胃', func: '搅拌罐：胃酸杀菌分解，食物变食糜' },
  { id: 'spleen', name: '脾', func: '血检站：过滤衰老血细胞、培育免疫细胞' },
  { id: 'pancreas', name: '胰', func: '双面手：分泌胰液助消化、分泌胰岛素管血糖' },
  { id: 'small', name: '小肠', func: '吸收主战场：营养分解后吸收入血' },
  { id: 'large', name: '大肠', func: '废料回收站：回收水分、成形粪便' },
  { id: 'kidney', name: '肾', func: '净水厂：过滤血液、调水盐平衡、管血压' },
  { id: 'bladder', name: '膀胱', func: '储水池：储存尿液，约 300–500ml 产生尿意' },
];

const PART_MAP: Record<BodyPartId, PartSpec> = Object.fromEntries(BODY_PARTS.map((b) => [b.id, b])) as Record<BodyPartId, PartSpec>;

interface HotShape {
  kind: 'ellipse' | 'rect' | 'ring';
  cx?: number; cy?: number; rx?: number; ry?: number;   // ellipse
  x?: number; y?: number; w?: number; h?: number; r?: number; // rect
  outer?: { x: number; y: number; w: number; h: number; r: number }; // ring
  inner?: { x: number; y: number; w: number; h: number; r: number };
  lx: number; ly: number; // 标签锚点
}

// 坐标基于底图 viewBox 0 0 1363 1212
const HOTSHAPES: Record<BodyPartId, HotShape> = {
  brain: { kind: 'ellipse', cx: 681, cy: 205, rx: 142, ry: 88, lx: 681, ly: 100 },
  lung: { kind: 'rect', x: 415, y: 460, w: 500, h: 340, r: 120, lx: 250, ly: 660 }, // 覆盖左右两肺整体
  heart: { kind: 'ellipse', cx: 745, cy: 675, rx: 78, ry: 105, lx: 745, ly: 540 },
  liver: { kind: 'ellipse', cx: 588, cy: 820, rx: 150, ry: 106, lx: 465, ly: 700 },
  gallbladder: { kind: 'ellipse', cx: 580, cy: 892, rx: 46, ry: 40, lx: 580, ly: 838 },
  stomach: { kind: 'ellipse', cx: 698, cy: 826, rx: 106, ry: 86, lx: 780, ly: 726 },
  spleen: { kind: 'ellipse', cx: 872, cy: 800, rx: 56, ry: 78, lx: 950, ly: 690 },
  pancreas: { kind: 'ellipse', cx: 690, cy: 884, rx: 148, ry: 30, lx: 690, ly: 842 },
  small: { kind: 'rect', x: 515, y: 915, w: 330, h: 200, r: 70, lx: 250, ly: 1090 },
  large: {
    kind: 'ring',
    outer: { x: 445, y: 885, w: 470, h: 300, r: 95 },
    inner: { x: 530, y: 930, w: 300, h: 200, r: 60 },
    lx: 250, ly: 780,
  },
  kidney: { kind: 'rect', x: 505, y: 895, w: 355, h: 105, r: 50, lx: 250, ly: 960 }, // 左右双肾整体
  bladder: { kind: 'ellipse', cx: 681, cy: 1140, rx: 88, ry: 46, lx: 681, ly: 1080 },
};

// 圆角矩形 path（顺时针）
function roundRect(x: number, y: number, w: number, h: number, r: number): string {
  const rr = Math.min(r, w / 2, h / 2);
  return [
    `M${x + rr} ${y}`,
    `H${x + w - rr}`,
    `A${rr} ${rr} 0 0 1 ${x + w} ${y + rr}`,
    `V${y + h - rr}`,
    `A${rr} ${rr} 0 0 1 ${x + w - rr} ${y + h}`,
    `H${x + rr}`,
    `A${rr} ${rr} 0 0 1 ${x} ${y + h - rr}`,
    `V${y + rr}`,
    `A${rr} ${rr} 0 0 1 ${x + rr} ${y}`,
    'Z',
  ].join(' ');
}

interface BodyMapProps {
  highlight?: BodyPartId[]; // 当前节点相关的器官，高亮显示
}

export default function BodyMap({ highlight = [] }: BodyMapProps) {
  const [active, setActive] = useState<BodyPartId | null>(null);
  const hot = new Set(highlight);

  const onPart = (id: BodyPartId) => setActive((cur) => (cur === id ? null : id));

  const renderShape = (id: BodyPartId) => {
    const s = HOTSHAPES[id];
    if (s.kind === 'ellipse') {
      return <ellipse cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />;
    }
    if (s.kind === 'rect') {
      return <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.r} />;
    }
    const o = s.outer!, i = s.inner!;
    const d = `${roundRect(o.x, o.y, o.w, o.h, o.r)} ${roundRect(i.x, i.y, i.w, i.h, i.r)}`;
    return <path d={d} fillRule="evenodd" />;
  };

  return (
    <div className="bodymap-real">
      <style>{`
        .bodymap-real { display: flex; gap: 14px; align-items: flex-start; flex-wrap: wrap; }
        .bodymap-real .bm-fig { position: relative; width: min(320px, 100%); }
        .bodymap-real .bm-fig img { display: block; width: 100%; height: auto; border-radius: 10px; border: 1px solid var(--line); background: #fff; }
        .bodymap-real .bm-fig svg.ov { position: absolute; top: 0; left: 0; width: 100%; height: auto; pointer-events: none; }
        .bodymap-real .bm-fig svg.ov .hot-layer { pointer-events: visiblePainted; cursor: pointer; }
        .bodymap-real .bm-fig svg.ov .hot-layer * { fill: rgba(255,255,255,0); transition: fill .15s ease; }
        .bodymap-real .bm-fig svg.ov .hot-layer:hover * { fill: rgba(255,205,90,.18); }
        .bodymap-real .bm-fig svg.ov .hot-layer:hover { stroke: rgba(224,138,26,.65); stroke-width: 4; }
        .bodymap-real .bm-fig svg.ov .hot-layer.hot * { fill: rgba(255,205,90,.32); }
        .bodymap-real .bm-fig svg.ov .hot-layer.hot { stroke: #e08a1a; stroke-width: 5; }
        .bodymap-real .bm-fig svg.ov .hot-layer.on * { fill: rgba(255,195,60,.36); }
        .bodymap-real .bm-fig svg.ov .hot-layer.on { stroke: #e08a1a; stroke-width: 6; }
        .hot-layer .bm-tag { font-size: 46px; font-weight: 800; fill: #a06b10; paint-order: stroke; stroke: #fffdf5; stroke-width: 9; stroke-linejoin: round; pointer-events: none; }
        .bodymap-real .bm-tip { font-size: 11px; color: var(--ink-3); margin-top: 4px; }
        .bodymap-real .bm-note { font-size: 11px; color: var(--ink-3); margin-top: 2px; }
        .bodymap-real .bm-side { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 8px; }
        .bodymap-real .bm-side-title { font-size: 12.5px; font-weight: 700; color: var(--ink); }
        .bodymap-real .bm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .bodymap-real .bm-chip { font-size: 11.5px; padding: 4px 6px; border-radius: 8px; background: var(--bg-soft); border: 1px solid var(--line); cursor: pointer; text-align: center; transition: all .15s ease; }
        .bodymap-real .bm-chip:hover { border-color: var(--green); }
        .bodymap-real .bm-chip.on { background: var(--green-soft); border-color: var(--green); font-weight: 700; color: var(--green-deep); }
        .bodymap-real .bm-chip.hot { background: #fdf1dc; border-color: #e6c37c; color: #a06b10; }
        .bodymap-real .bm-info { min-height: 46px; font-size: 12.5px; line-height: 1.6; color: var(--ink-2); background: var(--bg-soft); border-radius: 10px; padding: 10px 12px; }
        .bodymap-real .bm-info b { color: var(--green-deep); }
      `}</style>

      <div className="bm-fig">
        <img src="/assets/internal-organs-clean2.svg" alt="人体器官位置写实图" draggable={false} />
        <svg className="ov" viewBox="0 0 1363 1212" preserveAspectRatio="none" aria-label="器官热区">
          {/* 全部器官的可点击热区（透明层，hover 淡橙） */}
          {BODY_PARTS.map((b) => {
            const s = HOTSHAPES[b.id];
            return (
              <g key={b.id} className={'hot-layer' + (active === b.id ? ' on' : '')} onClick={() => onPart(b.id)}>
                {renderShape(b.id)}
              </g>
            );
          })}
          {/* 高亮 / 激活层：金色描边 + 填充 + 中文标签（覆盖在热区之上） */}
          {BODY_PARTS.map((b) => {
            const isHot = hot.has(b.id);
            const isActive = active === b.id;
            if (!isHot && !isActive) return null;
            const s = HOTSHAPES[b.id];
            return (
              <g key={b.id} className={'hot-layer' + (isHot ? ' hot' : '') + (isActive ? ' on' : '')} onClick={() => onPart(b.id)}>
                {renderShape(b.id)}
                <text x={s.lx} y={s.ly} textAnchor="middle" className="bm-tag">{b.name}</text>
              </g>
            );
          })}
        </svg>
        <div className="bm-tip">医学写实插画（正面观）：高亮 = 本节知识点所在器官；点击任一器官查看功能。</div>
        <div className="bm-note">左右以被观察者为准（图中左侧 = 人体的右侧，与真实镜像是反的）。</div>
      </div>

      <div className="bm-side">
        <div className="bm-side-title">📍 器官位置速查</div>
        <div className="bm-grid">
          {BODY_PARTS.map((b) => (
            <button
              key={b.id}
              className={'bm-chip' + (active === b.id ? ' on' : '') + (hot.has(b.id) ? ' hot' : '')}
              onClick={() => onPart(b.id)}
            >
              {b.name}
            </button>
          ))}
        </div>
        <div className="bm-info">
          {active ? (
            <>
              <b>{PART_MAP[active].name}</b> —— {PART_MAP[active].func}
            </>
          ) : hot.size > 0 ? (
            <>本节涉及的器官已高亮（金色标注 + 名称），点击任一器官看看它在哪、管什么。</>
          ) : (
            <>点击左侧任一器官，看看它在身体的哪里、负责什么工作。</>
          )}
        </div>
      </div>
    </div>
  );
}

// 从节点文本匹配相关器官（标题/风险标签/意图）
const KEYWORD_MAP: Array<[BodyPartId, RegExp]> = [
  ['brain', /脑|神经|指挥|中枢|大脑|脊髓/],
  ['lung', /肺|呼吸|换气|咳|气喘/],
  ['heart', /心|血脉|血液|循环|泵|脉/],
  ['liver', /肝|疏泄|解毒|藏血|目/],
  ['gallbladder', /胆/],
  ['stomach', /胃/],
  ['spleen', /脾|运化|免疫/],
  ['pancreas', /胰|胰岛素|血糖/],
  ['small', /小肠|吸收/],
  ['large', /大肠|排便|便/],
  ['kidney', /肾|尿|膀胱|水液|腰/],
  ['bladder', /膀胱|尿/],
];

export function matchBodyParts(texts: (string | undefined | null)[]): BodyPartId[] {
  const hit = new Set<BodyPartId>();
  const hay = (texts.filter(Boolean).join(' ') || '').toLowerCase();
  for (const [id, re] of KEYWORD_MAP) if (re.test(hay)) hit.add(id);
  return [...hit];
}
