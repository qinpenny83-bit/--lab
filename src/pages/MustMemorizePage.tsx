import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { v33AllNodesDoc, v33NodeByNodeId, v33NodesBySubject, v33Subjects } from '../data/v33';
import type { V33Node, V33SubjectRow } from '../types/v33';
import { LEVEL_LABEL } from '../types/models';

// 四大板块（与知识蓝图/修炼之路保持一致）
const PLATES = [
  { key: 'root', tag: '根基层', desc: '中医怎么想', icon: '🌱', codes: ['A', 'B'], bg: '#e8f2ea', fg: '#2e6b4f' },
  { key: 'herb', tag: '方药层', desc: '中医用什么', icon: '🌿', codes: ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'], bg: '#f5ead6', fg: '#8a651c' },
  { key: 'classic', tag: '经典文献层', desc: '凭什么这么想', icon: '📜', codes: ['N', 'O', 'P'], bg: '#e8ecf6', fg: '#3d5a99' },
  { key: 'clinical', tag: '临床层', desc: '面对真实病证怎么办', icon: '🩺', codes: ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG'], bg: '#fae9e6', fg: '#a54a3a' },
];

const TYPE_LABEL: Record<string, string> = {
  theory: '理论', diagnostic: '诊断', herb: '中药', formula: '方剂',
  meridian: '经络', acupoint: '腧穴', classic: '经典', clinical: '临床',
  case: '医案', ethic: '人文', evidence: '科研',
};

// 知识主干链（知识点级）：每板块内用真实知识点串成主干，体现「先学什么、才能会什么」
interface KnGroup {
  label: string;
  ids: string[];
}
interface KnPlateChain {
  groups: KnGroup[];
  note: string;
  branches: string[];
  linkNote: string;
  stage: string;
}
const KNOWLEDGE_CHAINS: Record<string, KnPlateChain> = {
  root: {
    groups: [
      { label: '医学总纲', ids: ['01-01', '01-02', '01-03'] },
      { label: '阴阳五行', ids: ['02-01', '03-01', '03-04', '03-05'] },
      { label: '藏象脏腑', ids: ['04-01', '04-02', '04-08'] },
      { label: '气血津液', ids: ['05-02', '05-08', '05-09', '05-11'] },
      { label: '病因病机', ids: ['07-01', '08-01', '08-02'] },
      { label: '治则治法', ids: ['16-01', '16-09'] },
      { label: '四诊合参', ids: ['09-01', '09-06', '09-21'] },
      { label: '辨证体系', ids: ['10-01', '11-01', '12-01', '21-01'] },
    ],
    note: '地基就是这一串：先懂「整体观念、辨证论治」怎么想，再学阴阳五行的模型、藏象脏腑与气血津液的生理、六淫病机的病理，最后掌握四诊八纲——有了收集和判断线索的手段，才能谈看病。',
    branches: [],
    linkNote: '先学会「怎么想」，下一步才谈得上「用什么」',
    stage: '第一、二境',
  },
  herb: {
    groups: [
      { label: '中药性能', ids: ['pb5-g-01', 'pb5-g-02', 'pb5-g-03', 'pb5-g-04'] },
      { label: '方剂组方', ids: ['17-01', '17-03', '17-06'] },
      { label: '代表方类', ids: ['18-01', '18-06', '18-10'] },
    ],
    note: '一味药记「性味归经」，一首方记「君臣佐使」——从认药到组方的跨越；解表、补益、祛湿是临床最常用的三类方。',
    branches: ['C', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'M'],
    linkNote: '药和方用熟了，回头读经典，找「凭什么这么想」的凭据',
    stage: '第三、四、六、七境',
  },
  classic: {
    groups: [
      { label: '《黄帝内经》', ids: ['19-01', '19-02', '19-03'] },
      { label: '《伤寒论》', ids: ['19-05', '19-06'] },
      { label: '《金匮要略》', ids: ['19-09', '19-10'] },
    ],
    note: '回到原典找依据：内经立理、伤寒立方、金匮辨杂病——中医思想的源头都在这里。',
    branches: ['O', 'P'],
    linkNote: '道理立住了，去面对真实病证',
    stage: '第七境',
  },
  clinical: {
    groups: [
      { label: '辨证纲领', ids: ['pb12-q-001', 'pb12-q-013', '20-01'] },
      { label: '内科主战场', ids: ['pb17-r-001', 'pb17-r-005', 'pb17-r-025'] },
    ],
    note: '临床基础定辨证纲领（六经、卫气营血），内科是主战场（感冒、咳嗽、心悸起手），再延伸各科。',
    branches: ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF'],
    linkNote: '最后，用综合医案把前面学的一切串起来',
    stage: '第五、八境',
  },
};

/** 取节点「必背句」：优先先记住这一句 → 核心定义 → 一句话描述兜底 */
function memSentence(n: V33Node): string {
  return n.stdJudgment ?? n.coreDefinition ?? n.description ?? '';
}

/** 关键词高亮：把文本中所有命中片段包成 <mark> */
function highlight(text: string, kw: string): ReactNode {
  if (!kw) return text;
  const k = kw.toLowerCase();
  const lower = text.toLowerCase();
  if (!lower.includes(k)) return text;
  const parts: ReactNode[] = [];
  let i = 0;
  let idx = lower.indexOf(k);
  let key = 0;
  while (idx !== -1) {
    if (idx > i) parts.push(text.slice(i, idx));
    parts.push(<mark key={key++} className="mm-mark">{text.slice(idx, idx + kw.length)}</mark>);
    i = idx + kw.length;
    idx = lower.indexOf(k, i);
  }
  if (i < text.length) parts.push(text.slice(i));
  return parts;
}

/** 搜索匹配等级：3=标题命中（最相关） 2=必背句命中 1=知识点正文顺带提到 0=未命中 */
function matchLevel(kw: string, n: V33Node): number {
  if (n.topic.toLowerCase().includes(kw)) return 3;
  if (memSentence(n).toLowerCase().includes(kw)) return 2;
  if ((n.learningUnit?.knowledge ?? '').toLowerCase().includes(kw)) return 1;
  return 0;
}

export default function MustMemorizePage() {
  const navigate = useNavigate();
  const [plate, setPlate] = useState('root');
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const [kw, setKw] = useState('');
  const [view, setView] = useState<'map' | 'list'>('map');
  const [bodyOpen, setBodyOpen] = useState(false);
  const [composing, setComposing] = useState(false);

  const nodesAll = useMemo(() => v33AllNodesDoc.nodes.filter((n) => n.status !== 'quarantine'), []);
  const bySubject = useMemo(() => {
    const map: Record<string, V33Node[]> = {};
    for (const n of nodesAll) (map[n.subject] ??= []).push(n);
    for (const k of Object.keys(map)) map[k].sort((a, b) => a.nodeId.localeCompare(b.nodeId));
    return map;
  }, [nodesAll]);

  const totalMem = nodesAll.filter((n) => memSentence(n).trim()).length;
  const classicCount = nodesAll.filter((n) => (n.learningUnit?.classicalLayer?.length ?? 0) > 0).length;

  const kwT = kw.trim().toLowerCase();
  const plateCodes = PLATES.find((p) => p.key === plate)?.codes ?? [];

  // 非搜索模式：当前板块的学科
  const listSubjects = useMemo(() => v33Subjects.filter((s) => plateCodes.includes(s.code)), [plateCodes]);

  // 搜索模式：按相关度分级分组（标题命中 → 必背句命中 → 正文提到 → 学科名命中）
  const searchGroups = useMemo(() => {
    if (!kwT) return null;
    const subjectHit: V33SubjectRow[] = [];
    const topicHit: { n: V33Node; s: V33SubjectRow }[] = [];
    const sentHit: { n: V33Node; s: V33SubjectRow }[] = [];
    const bodyHit: { n: V33Node; s: V33SubjectRow }[] = [];
    for (const s of v33Subjects) {
      if (`${s.code} ${s.name}`.toLowerCase().includes(kwT)) subjectHit.push(s);
      const ns = bySubject[s.code] ?? [];
      for (const n of ns) {
        const lv = matchLevel(kwT, n);
        if (lv === 3) topicHit.push({ n, s });
        else if (lv === 2) sentHit.push({ n, s });
        else if (lv === 1) bodyHit.push({ n, s });
      }
    }
    return { subjectHit, topicHit, sentHit, bodyHit };
  }, [kwT, bySubject]);

  const searchEmpty =
    !!searchGroups &&
    searchGroups.subjectHit.length === 0 &&
    searchGroups.topicHit.length === 0 &&
    searchGroups.sentHit.length === 0 &&
    searchGroups.bodyHit.length === 0;

  const openSubject = (code: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const jumpToSubject = (code: string) => {
    const s = v33Subjects.find((x) => x.code === code);
    const pl = PLATES.find((p) => p.codes.includes(code));
    if (!s || !pl) return;
    setView('list');
    setKw('');
    setPlate(pl.key);
    setOpenSet(new Set([code]));
    setTimeout(() => {
      document.getElementById(`subj-${code}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  // 搜索命中分区：按相关度分组展示节点（标题命中 → 必背句命中 → 正文提到）
  const renderHitSection = (
    title: string,
    items: { n: V33Node; s: V33SubjectRow }[],
    open: boolean,
    onToggle?: () => void
  ) => {
    if (items.length === 0) return null;
    return (
      <div className="mm-res-sec">
        <div className="mm-res-sec-title">
          {title}
          <span className="mm-res-sec-cnt">{items.length}</span>
          {onToggle ? (
            <button className="mm-res-toggle" onClick={onToggle}>{open ? '收起' : '展开'}</button>
          ) : null}
        </div>
        {open ? (
          <div>
            {items.map(({ n, s }, i) => {
              const sent = memSentence(n);
              const canons = n.learningUnit?.classicalLayer ?? [];
              const pl = PLATES.find((p) => p.codes.includes(s.code));
              return (
                <div key={n.nodeId} className="mm-node">
                  <div className="mm-node-row">
                    <span className="mm-node-idx">{String(i + 1).padStart(2, '0')}</span>
                    <div className="mm-node-body">
                      <div className="mm-node-topic">
                        <button onClick={() => navigate(`/practice/${n.nodeId}`)}>{highlight(n.topic, kw)}</button>
                      </div>
                      {sent ? (
                        <div className="mm-node-sent"><span className="mm-k">必背：</span>{highlight(sent, kw)}</div>
                      ) : null}
                      {canons.length ? (
                        <div className="mm-node-canon">📜 {canons.map((c) => c.originalText).join('；')}</div>
                      ) : null}
                      <div className="mm-node-meta">
                        <span className="mm-res-subj" style={pl ? { color: pl.fg } : undefined}>{s.code} {s.name}</span>
                        <span>难度 · {LEVEL_LABEL[n.difficulty] ?? n.difficulty}</span>
                        <button className="mm-go" onClick={() => navigate(`/practice/${n.nodeId}`)}>去修炼 →</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="page page-narrow mm-page">
      <style>{`
        .mm-page { --line: rgba(62,56,46,0.09); }
        .mm-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
        .mm-stats { display: flex; gap: 8px; flex-wrap: wrap; }
        .mm-stat { font-size: 12px; font-weight: 600; background: var(--green-soft); color: var(--green-deep); border-radius: 999px; padding: 4px 12px; }
        .mm-switch { display: flex; gap: 6px; }
        .mm-switch button { border: 1px solid var(--line); background: var(--card); color: var(--ink-2); font-size: 13px; font-weight: 600; border-radius: 999px; padding: 6px 14px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .mm-switch button.on { background: var(--green); color: #fff; border-color: var(--green); }
        .mm-search { width: 100%; box-sizing: border-box; border: 1.5px solid var(--line); border-radius: 12px; padding: 10px 14px; font-size: 13.5px; font-family: inherit; color: var(--ink); background: var(--card); margin-bottom: 14px; }
        .mm-search:focus { outline: none; border-color: var(--green); box-shadow: 0 0 0 3px var(--green-soft); }
        /* 思维导图：知识主干链 */
        .mm-root { text-align: center; margin: 10px 0 4px; }
        .mm-root-node { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #1d5c41, #2f7d58); color: #fff; font-size: 15px; font-weight: 800; font-family: var(--font-serif); border-radius: 999px; padding: 10px 22px; box-shadow: 0 6px 16px rgba(30,90,60,0.25); }
        .mm-root-line { width: 2px; height: 18px; background: var(--green); margin: 0 auto; }
        .mm-flow { display: flex; flex-direction: column; gap: 0; margin-top: 6px; }
        .mm-stage { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; margin-bottom: 0; }
        .mm-stage-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .mm-stage-icon { font-size: 22px; }
        .mm-stage-tag { font-weight: 800; font-size: 14px; }
        .mm-stage-desc { display: block; font-size: 11.5px; color: var(--ink-3); margin-top: 1px; }
        .mm-stage-chain { display: flex; flex-direction: column; gap: 8px; }
        .mm-chain-arrow { color: var(--green-deep); font-size: 15px; font-weight: 800; flex-shrink: 0; }
        /* 知识点主干链 */
        .mm-kn-groups { display: flex; flex-direction: column; gap: 9px; }
        .mm-kn-group-label { font-size: 11.5px; font-weight: 800; margin-bottom: 4px; letter-spacing: 0.5px; }
        .mm-kn-group-line { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .mm-kn-item { display: inline-flex; align-items: center; gap: 6px; }
        .mm-kn { display: inline-flex; align-items: center; gap: 6px; border: 1.5px solid var(--line); background: #fff; border-radius: 999px; padding: 5px 11px; cursor: pointer; font-family: inherit; transition: all 0.15s; box-shadow: 0 2px 6px rgba(0,0,0,0.04); max-width: 230px; }
        .mm-kn:hover { border-color: var(--green); background: var(--green-soft); transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
        .mm-kn-subj { font-size: 9.5px; font-weight: 800; border-radius: 999px; padding: 1px 7px; flex-shrink: 0; letter-spacing: 0.3px; }
        .mm-kn-topic { font-size: 12px; font-weight: 700; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mm-branch { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; padding-left: 6px; align-items: center; }
        .mm-branch-title { font-size: 11px; font-weight: 700; color: var(--ink-3); }
        .mm-branch-node { display: inline-flex; align-items: center; gap: 4px; border: 1px dashed var(--line); background: var(--bg-soft); border-radius: 999px; padding: 5px 10px; font-size: 11.5px; font-weight: 600; color: var(--ink-2); cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .mm-branch-node:hover { border-color: var(--green); color: var(--green-deep); background: var(--green-soft); }
        .mm-branch-cnt { font-size: 10px; color: var(--ink-3); }
        .mm-stage-note { margin-top: 10px; font-size: 12px; line-height: 1.7; color: var(--ink-2); background: var(--bg-soft); border-radius: 8px; padding: 8px 10px; }
        .mm-flow-link { display: flex; align-items: center; gap: 8px; padding: 8px 6px 10px 22px; }
        .mm-flow-arrow { color: var(--green-deep); font-size: 16px; font-weight: 800; }
        .mm-flow-note { font-size: 12px; color: var(--ink-3); line-height: 1.6; }
        .mm-final { margin-top: 6px; }
        /* 板块页签 */
        .mm-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
        .mm-tab { display: flex; align-items: center; gap: 6px; border: 1px solid var(--line); background: var(--card); border-radius: 999px; padding: 7px 14px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; color: var(--ink-2); transition: all 0.15s; }
        .mm-tab.on { color: #fff; border-color: transparent; }
        .mm-tab .mm-tab-cnt { font-size: 11px; opacity: 0.85; }
        /* 学科卡片 */
        .mm-subj { border: 1px solid var(--line); border-radius: 14px; margin-bottom: 12px; overflow: hidden; background: var(--card); }
        .mm-subj-head { display: flex; align-items: center; gap: 8px; padding: 11px 14px; cursor: pointer; transition: background 0.12s; }
        .mm-subj-head:hover { background: var(--bg-soft); }
        .mm-subj-code { font-size: 11px; font-weight: 700; background: var(--bg-soft); border: 1px solid var(--line); border-radius: 6px; padding: 2px 6px; color: var(--ink-3); }
        .mm-subj-name { font-weight: 800; font-size: 14px; }
        .mm-subj-type { font-size: 11px; color: var(--ink-3); }
        .mm-subj-cnt { margin-left: auto; font-size: 11.5px; color: var(--ink-3); }
        .mm-subj-toggle { flex-shrink: 0; font-size: 11px; font-weight: 700; color: var(--green-deep); background: var(--green-soft); border: 1px solid var(--green); border-radius: 999px; padding: 4px 12px; }
        .mm-subj-toggle.on { color: var(--ink-2); background: var(--bg-soft); border-color: var(--line); }
        .mm-node { border-top: 1px dashed var(--line); padding: 10px 14px; }
        .mm-node-row { display: flex; gap: 8px; align-items: flex-start; }
        .mm-node-idx { font-size: 11px; font-weight: 700; color: var(--ink-3); padding-top: 2px; min-width: 24px; }
        .mm-node-body { flex: 1; min-width: 0; }
        .mm-node-topic { font-size: 13px; font-weight: 700; margin-bottom: 3px; }
        .mm-node-topic button { border: none; background: none; padding: 0; font-family: inherit; font-size: inherit; font-weight: inherit; color: var(--ink); cursor: pointer; text-align: left; }
        .mm-node-topic button:hover { color: var(--green); }
        .mm-node-sent { font-size: 12.5px; line-height: 1.75; color: var(--ink-2); }
        .mm-node-sent .mm-k { color: var(--green-deep); font-weight: 700; }
        .mm-node-canon { margin-top: 5px; font-size: 12px; line-height: 1.7; color: #3d5a99; background: #eef2fb; border-radius: 8px; padding: 7px 10px; }
        .mm-node-meta { margin-top: 6px; font-size: 11px; color: var(--ink-3); display: flex; gap: 8px; flex-wrap: wrap; }
        .mm-node-meta .mm-go { margin-left: auto; color: var(--green); font-weight: 700; cursor: pointer; background: none; border: none; font-family: inherit; font-size: 11.5px; }
        .mm-empty { text-align: center; color: var(--ink-3); font-size: 13px; padding: 30px 0; }
        .mm-empty-sug { margin-top: 8px; font-size: 12px; color: var(--green-deep); background: var(--green-soft); border-radius: 999px; padding: 6px 14px; display: inline-block; }
        .mm-legend { font-size: 11.5px; color: var(--ink-3); margin-bottom: 10px; line-height: 1.7; }
        .mm-hitbar { font-size: 12.5px; color: var(--ink-2); background: var(--green-soft); border: 1px solid var(--green); border-radius: 10px; padding: 8px 12px; margin-bottom: 12px; line-height: 1.7; }
        .mm-hitbar b { color: var(--green-deep); }
        .mm-mark { background: #fde68a; color: #7c2d12; border-radius: 3px; padding: 0 2px; font-weight: 700; }
        /* 搜索命中分区 */
        .mm-res-sec { margin-bottom: 14px; }
        .mm-res-sec-title { font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .mm-res-sec-cnt { font-size: 11px; font-weight: 700; background: var(--bg-soft); border: 1px solid var(--line); border-radius: 999px; padding: 2px 8px; color: var(--ink-2); }
        .mm-res-toggle { margin-left: auto; border: 1px solid var(--line); background: var(--card); border-radius: 999px; padding: 3px 12px; font-size: 11px; font-family: inherit; cursor: pointer; color: var(--ink-2); transition: all 0.15s; }
        .mm-res-toggle:hover { border-color: var(--green); color: var(--green-deep); }
        .mm-subj-hit { display: flex; align-items: center; gap: 8px; width: 100%; box-sizing: border-box; border: 1px solid var(--line); background: var(--card); border-radius: 12px; padding: 10px 14px; margin-bottom: 8px; cursor: pointer; font-family: inherit; text-align: left; transition: all 0.15s; }
        .mm-subj-hit:hover { border-color: var(--green); background: var(--green-soft); }
        .mm-res-subj { font-size: 11px; font-weight: 700; }
      `}</style>

      <div className="practice-head">
        <button className="back-link" onClick={() => navigate('/journey')}>← 返回修炼之路</button>
        <span className="tag">必背 · 知识汇总</span>
      </div>

      <div className="mm-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1 className="page-title" style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, margin: 0 }}>
            📖 必背
          </h1>
        </div>
        <div className="mm-switch">
          <button className={view === 'map' ? 'on' : ''} onClick={() => { setView('map'); setKw(''); }}>🧠 思维导图</button>
          <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>📋 必背清单</button>
        </div>
      </div>

      <div className="mm-stats" style={{ marginBottom: 12 }}>
        <span className="mm-stat">📌 必背句 {totalMem} 条</span>
        <span className="mm-stat">📜 经典原文 {classicCount} 段</span>
        <span className="mm-stat">🗂️ {v33Subjects.length} 学科 · 4 板块</span>
      </div>

      <input
        className="mm-search"
        placeholder="🔍 搜学科 / 知识点 / 必背句，比如：阴阳、麻黄、四君子…"
        value={kw}
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={(e) => {
          setComposing(false);
          const v = (e.target as HTMLInputElement).value;
          setKw(v);
          if (v.trim()) setView('list');
        }}
        onChange={(e) => {
          const v = e.target.value;
          setKw(v);
          // 中文输入法拼音组合期间不切视图、不搜索，避免拼音字母误当关键词
          if (!composing && v.trim()) setView('list');
        }}
      />

      {view === 'map' ? (
        <>
          {/* 思维导图：知识主干链（根 → 四大阶段 → 分支学科 → 终点医案） */}
          <div className="mm-root">
            <div className="mm-root-node">🌿 中医思维 · 必背知识脉络</div>
          </div>
          <div className="mm-root-line" />

          <div className="mm-flow">
            {PLATES.map((pl) => {
              const kc = KNOWLEDGE_CHAINS[pl.key];
              return (
                <div key={pl.key}>
                  {/* 阶段卡：知识点主干链 */}
                  <div className="mm-stage" style={{ borderLeft: `4px solid ${pl.fg}` }}>
                    <div className="mm-stage-head">
                      <span className="mm-stage-icon">{pl.icon}</span>
                      <span>
                        <span className="mm-stage-tag" style={{ color: pl.fg }}>{pl.tag}</span>
                        <span className="mm-stage-desc">{pl.desc} · {kc.stage}</span>
                      </span>
                    </div>
                    <div className="mm-kn-groups">
                      {kc.groups.map((g, gi) => (
                        <div key={gi} className="mm-kn-group">
                          <div className="mm-kn-group-label" style={{ color: pl.fg }}>▸ {g.label}</div>
                          <div className="mm-kn-group-line">
                            {g.ids.map((id, ii) => {
                              const n = v33NodeByNodeId(id);
                              if (!n) return null;
                              const subj = v33Subjects.find((s) => s.code === n.subject);
                              return (
                                <span key={id} className="mm-kn-item">
                                  {ii > 0 ? <span className="mm-chain-arrow">→</span> : null}
                                  <button className="mm-kn" onClick={() => navigate(`/practice/${id}`)} title={`${n.topic} · ${subj?.name ?? n.subject} · 点此去修炼`}>
                                    <span className="mm-kn-subj" style={{ background: pl.bg, color: pl.fg }}>{n.subject}</span>
                                    <span className="mm-kn-topic">{n.topic}</span>
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                      {/* 分支学科挂载 */}
                      {kc.branches.length ? (
                        <div className="mm-branch">
                          <span className="mm-branch-title">+ 延伸学科：</span>
                          {kc.branches.map((code) => {
                            const s = v33Subjects.find((x) => x.code === code);
                            const cnt = (bySubject[code] ?? []).length;
                            return (
                              <button key={code} className="mm-branch-node" onClick={() => jumpToSubject(code)} title={`${s?.name ?? code} · ${cnt} 条必背`}>
                                {s?.name ?? code}
                                <span className="mm-branch-cnt">{cnt}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                    <div className="mm-stage-note">💬 {kc.note}</div>
                  </div>
                  {/* 阶段之间的递进说明 */}
                  {pl.key !== 'clinical' ? (
                    <div className="mm-flow-link">
                      <span className="mm-flow-arrow">↓</span>
                      <span className="mm-flow-note">{kc.linkNote}</span>
                    </div>
                  ) : null}
                </div>
              );
            })}

            {/* 终点：综合医案试炼 */}
            <div className="mm-stage mm-final" style={{ borderLeft: '4px solid #a54a3a', background: 'linear-gradient(135deg, #fdf3f0, #fff)' }}>
              <div className="mm-stage-head">
                <span className="mm-stage-icon">🌟</span>
                <span>
                  <span className="mm-stage-tag" style={{ color: '#a54a3a' }}>终点 · 综合试炼</span>
                  <span className="mm-stage-desc">把所有学科串起来 · 第八境</span>
                </span>
              </div>
              <div className="mm-kn-groups">
                <div className="mm-kn-group">
                  <div className="mm-kn-group-label" style={{ color: '#a54a3a' }}>▸ 真实医案合流</div>
                  <div className="mm-kn-group-line">
                    {['pb32-ag-001', 'pb32-ag-020'].map((id, ii) => {
                      const n = v33NodeByNodeId(id);
                      if (!n) return null;
                      return (
                        <span key={id} className="mm-kn-item">
                          {ii > 0 ? <span className="mm-chain-arrow">→</span> : null}
                          <button className="mm-kn" onClick={() => navigate(`/practice/${id}`)} title={`${n.topic} · 去修炼`}>
                            <span className="mm-kn-subj" style={{ background: '#fae9e6', color: '#a54a3a' }}>AG</span>
                            <span className="mm-kn-topic">{n.topic}</span>
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="mm-branch">
                  <span className="mm-branch-title">+ 全部医案：</span>
                  <button className="mm-branch-node" onClick={() => jumpToSubject('AG')} title="综合医案·试炼 · 全部必背">
                    综合医案·试炼
                    <span className="mm-branch-cnt">{bySubject.AG?.length ?? 0}</span>
                  </button>
                </div>
              </div>
              <div className="mm-stage-note">💬 前面学的所有理论、诊断、方药、经典，都在真实医案里合流验证——这是修炼之路的最后一关。</div>
            </div>
          </div>

          <div className="mm-legend">
            🧭 主干链怎么读：从上往下看，每条链都是「先学左边、再学右边」的递进——比如根基层从「整体观念」一路串到「辨证体系」。<br />
            🔤 知识点左上角的字母是学科代号：<b>A</b> 中医基础理论 · <b>B</b> 中医诊断学 · <b>G</b> 中药学 · <b>L</b> 方剂学 · <b>N</b> 经典 · <b>Q</b> 临床基础 · <b>R</b> 中医内科学 · <b>AG</b> 综合医案。<br />
            👆 点任意知识点卡片，直接去修炼对应内容；点「+ 延伸学科」，跳到它的必背清单。
          </div>
        </>
      ) : (
        <>
          {kwT && searchGroups ? (
            searchEmpty ? (
              <div className="mm-empty">
                没有找到和「{kw.trim()}」相关的内容
                <div className="mm-empty-sug">试试搜：阴阳、五行、藏象、气血、麻黄、四君子、八纲</div>
              </div>
            ) : (
              <>
                <div className="mm-hitbar">
                  🔍「{kw.trim()}」命中：🎯 主题 <b>{searchGroups.topicHit.length}</b> · 📌 必背句 <b>{searchGroups.sentHit.length}</b> · 💬 提到 <b>{searchGroups.bodyHit.length}</b>
                  {searchGroups.subjectHit.length ? <> · 📚 学科 <b>{searchGroups.subjectHit.length}</b></> : null}
                  ——按相关度排序，最精准的排最前
                </div>

                {/* 学科名命中：整科必背 */}
                {searchGroups.subjectHit.length ? (
                  <div className="mm-res-sec">
                    <div className="mm-res-sec-title">📚 学科匹配<span className="mm-res-sec-cnt">{searchGroups.subjectHit.length}</span></div>
                    {searchGroups.subjectHit.map((s) => {
                      const cnt = (bySubject[s.code] ?? []).length;
                      return (
                        <button key={s.code} className="mm-subj-hit" onClick={() => jumpToSubject(s.code)}>
                          <span className="mm-subj-code">{s.code}</span>
                          <span className="mm-subj-name">{s.name}</span>
                          <span className="mm-subj-cnt">共 {cnt} 条必背 · 打开清单 →</span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {renderHitSection('🎯 主题命中（标题就是讲这个的）', searchGroups.topicHit, true)}
                {renderHitSection('📌 必背句命中（记背内容里提到）', searchGroups.sentHit, true)}
                {renderHitSection('💬 内容提到（顺带提及，点开可看）', searchGroups.bodyHit, bodyOpen, () => setBodyOpen((v) => !v))}
              </>
            )
          ) : (
            <>
              {/* 板块页签 */}
              <div className="mm-tabs">
                {PLATES.map((pl) => {
                  const cnt = pl.codes.reduce((a, c) => a + (bySubject[c]?.length ?? 0), 0);
                  return (
                    <button
                      key={pl.key}
                      className={'mm-tab' + (plate === pl.key ? ' on' : '')}
                      style={plate === pl.key ? { background: pl.fg } : undefined}
                      onClick={() => { setPlate(pl.key); setKw(''); }}
                    >
                      {pl.icon} {pl.tag}
                      <span className="mm-tab-cnt">{cnt}</span>
                    </button>
                  );
                })}
              </div>

              {listSubjects.length === 0 ? (
                <div className="mm-empty">这个板块还没有内容。</div>
              ) : (
                listSubjects.map((s) => {
                  const nodes = bySubject[s.code] ?? [];
                  const pl = PLATES.find((p) => p.codes.includes(s.code));
                  const open = openSet.has(s.code);
                  return (
                    <div key={s.code} className="mm-subj" id={`subj-${s.code}`}>
                      <div className="mm-subj-head" onClick={() => openSubject(s.code)}>
                        <span className="mm-subj-code">{s.code}</span>
                        <span className="mm-subj-name">{s.name}</span>
                        <span className="mm-subj-type">{TYPE_LABEL[s.type] ?? s.type}{s.status === 'ext' ? ' · 扩展' : ''}</span>
                        <span className="mm-subj-cnt">{nodes.length} 条</span>
                        <span className={'mm-subj-toggle' + (open ? ' on' : '')}>{open ? '收起' : '展开'}</span>
                      </div>
                      {open ? (
                        <div>
                          {nodes.map((n, i) => {
                            const sent = memSentence(n);
                            const canons = n.learningUnit?.classicalLayer ?? [];
                            return (
                              <div key={n.nodeId} className="mm-node">
                                <div className="mm-node-row">
                                  <span className="mm-node-idx">{String(i + 1).padStart(2, '0')}</span>
                                  <div className="mm-node-body">
                                    <div className="mm-node-topic">
                                      <button onClick={() => navigate(`/practice/${n.nodeId}`)}>{n.topic}</button>
                                    </div>
                                    {sent ? (
                                      <div className="mm-node-sent"><span className="mm-k">必背：</span>{sent}</div>
                                    ) : null}
                                    {canons.length ? (
                                      <div className="mm-node-canon">📜 {canons.map((c) => c.originalText).join('；')}</div>
                                    ) : null}
                                    <div className="mm-node-meta">
                                      <span>{TYPE_LABEL[s.type] ?? s.type}</span>
                                      <span>难度 · {LEVEL_LABEL[n.difficulty] ?? n.difficulty}</span>
                                      {pl ? <span style={{ color: pl.fg }}>{pl.icon} {pl.tag}</span> : null}
                                      <button className="mm-go" onClick={() => navigate(`/practice/${n.nodeId}`)}>去修炼 →</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
