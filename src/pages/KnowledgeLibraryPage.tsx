import { useMemo, useState } from 'react';
import {
  v33AllNodesDoc,
  v33LearningPath,
  v33Subjects,
  v33Totals,
  v33FinalAudit,
  v33ProductionDashboard,
} from '../data/v33';
import type { V33Node } from '../types/v33';

const STAGE_NAMES: Record<string, string> = {
  stage1: '入门·基础认知', stage2: '诊法·望闻问切', stage3: '八纲·方向纲领',
  stage4: '藏象·气血·经络', stage5: '病因病机·脏腑辨证', stage6: '外感辨证体系',
  stage7: '治则·方剂·经典', stage8: '医案·综合·思维',
};

const TYPE_LABEL: Record<string, string> = {
  theory: '理论', diagnostic: '诊断', herb: '中药', formula: '方剂',
  meridian: '经络', acupoint: '腧穴', classic: '经典', clinical: '临床',
  case: '医案', ethic: '人文', evidence: '科研',
};

const STATUS_META: Record<string, { label: string; cls: string }> = {
  candidate: { label: '候选', cls: 'st-ok' },
  conditional: { label: '待审', cls: 'st-warn' },
  quarantine: { label: '隔离', cls: 'st-danger' },
  legacy: { label: '存量', cls: 'st-ok' },
  pending: { label: '待产', cls: 'st-muted' },
};

const PAGE_SIZE = 50;

export default function KnowledgeLibraryPage() {
  const [subjectFilter, setSubjectFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const nodes = v33AllNodesDoc.nodes;
  const stats = v33AllNodesDoc.stats;
  const knowledgeMap = v33LearningPath.knowledgeMap;

  // 学科覆盖表（按 stage 排序，与学习路径一致）
  const subjectRows = useMemo(() => {
    const stageRank = (s: string) => Number(s.replace('stage', ''));
    return [...v33Subjects].sort((a, b) => stageRank(a.stage) - stageRank(b.stage) || a.code.localeCompare(b.code));
  }, []);

  const producedCount = subjectRows.filter((s) => s.current > 0).length;
  const grandTargetLow = subjectRows.reduce((a, s) => a + s.target[0], 0);
  const grandCurrent = subjectRows.reduce((a, s) => a + s.current, 0);

  // 节点清单筛选
  const filtered = useMemo(() => {
    const kw = keyword.trim();
    return nodes.filter((n) => {
      if (subjectFilter !== 'ALL' && n.subject !== subjectFilter) return false;
      if (statusFilter !== 'ALL' && n.status !== statusFilter) return false;
      if (kw && !`${n.nodeId} ${n.topic} ${n.subjectName}`.toLowerCase().includes(kw.toLowerCase())) return false;
      return true;
    });
  }, [nodes, subjectFilter, statusFilter, keyword]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const reviewNodes = useMemo(
    () => nodes.filter((n) => n.status === 'conditional' || n.status === 'quarantine'),
    [nodes],
  );

  const audit = (v33FinalAudit as Record<string, unknown>).audit as Record<string, { status: string; detail: string }> | undefined;
  const dashboard = v33ProductionDashboard as Record<string, unknown>;
  const batches = (dashboard.batches as Record<string, unknown>[]) || [];

  const diffLabel = (d: number) => ({ 1: '简单', 2: '中等', 3: '困难', 4: '易混淆', 5: '综合推理' }[d] ?? d);

  const toggleExpand = (id: string) => setExpandedId((cur) => (cur === id ? null : id));

  return (
    <div className="page lib-page">
      <style>{`
        .lib-page { max-width: 1080px; }
        .lib-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
        .lib-stat { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 14px 16px; box-shadow: var(--shadow); }
        .lib-stat .num { font-size: 24px; font-weight: 700; color: var(--ink); line-height: 1.2; }
        .lib-stat .lbl { font-size: 12.5px; color: var(--ink-3); margin-top: 2px; }
        .lib-stat .sub { font-size: 11.5px; color: var(--ink-4); margin-top: 1px; }
        .lib-tbl-wrap { overflow-x: auto; }
        .lib-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .lib-table th { text-align: left; padding: 8px 10px; color: var(--ink-3); font-weight: 600; font-size: 12px; border-bottom: 1px solid var(--line); white-space: nowrap; }
        .lib-table td { padding: 9px 10px; border-bottom: 1px solid var(--line-soft, rgba(0,0,0,0.06)); vertical-align: middle; }
        .lib-table tr:last-child td { border-bottom: none; }
        .lib-table tr:hover td { background: var(--green-soft); }
        .subj-code { font-weight: 700; color: var(--green-deep); }
        .prog { height: 8px; border-radius: 99px; background: var(--line); overflow: hidden; min-width: 90px; }
        .prog > i { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--green), var(--green-deep)); }
        .prog.hi > i { background: linear-gradient(90deg, #f5b942, #e08a1e); }
        .gap-note { font-size: 11.5px; color: var(--ink-4); }
        .lib-filters { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .lib-filters select, .lib-filters input {
          padding: 8px 12px; border: 1px solid var(--line); border-radius: 10px;
          background: var(--card); color: var(--ink); font-size: 13px; outline: none;
        }
        .lib-filters input { min-width: 180px; }
        .lib-node-row { cursor: pointer; }
        .lib-node-meta { display: flex; flex-wrap: wrap; gap: 6px; }
        .pill { display: inline-flex; align-items: center; gap: 4px; padding: 2px 9px; border-radius: 99px; font-size: 11.5px; font-weight: 600; }
        .st-ok { background: #e6f4ea; color: #1f7a4d; }
        .st-warn { background: #fdf1dc; color: #a06b10; }
        .st-danger { background: #fde8e8; color: #b3382c; }
        .st-muted { background: #eee; color: #777; }
        .t-sm { font-size: 11.5px; color: var(--ink-3); }
        .lib-detail { padding: 12px 14px; background: #faf9f6; border: 1px dashed var(--line); border-radius: 10px; margin: 6px 0 2px; font-size: 13px; color: var(--ink-2); line-height: 1.7; }
        .lib-detail b { color: var(--ink); }
        .lib-detail .kv { margin: 3px 0; }
        .lib-pager { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 14px; }
        .lib-empty { text-align: center; color: var(--ink-3); padding: 28px 0; font-size: 13.5px; }
        .lib-audit-ok { color: #1f7a4d; font-weight: 600; }
        .lib-audit-warn { color: #a06b10; font-weight: 600; }
        .lib-audit-alert { color: #b3382c; font-weight: 600; }
        .lib-batch { border-top: 1px dashed var(--line); padding-top: 8px; margin-top: 8px; }
        .lib-honesty { font-size: 12px; color: var(--ink-3); background: #faf9f6; border: 1px dashed var(--line); border-radius: 10px; padding: 8px 12px; }
      `}</style>

      <div className="pagehead">
        <div>
          <h1>33 学科知识库</h1>
          <p>覆盖进度 · 节点清单 · 审核状态（基准：Content Bible v2.0 第 01/20/21/22 章）</p>
        </div>
      </div>

      {/* 概览 */}
      <div className="lib-stats">
        <div className="lib-stat">
          <div className="num">{stats.candidate}</div>
          <div className="lbl">候选节点 candidate</div>
          <div className="sub">Gate 全绿，待人工抽审</div>
        </div>
        <div className="lib-stat">
          <div className="num">{stats.conditional}</div>
          <div className="lbl">待审节点 conditional</div>
          <div className="sub">需人工补核后转正</div>
        </div>
        <div className="lib-stat">
          <div className="num">{stats.quarantine}</div>
          <div className="lbl">隔离节点 quarantine</div>
          <div className="sub">隔离即安全，不自动放行</div>
        </div>
        <div className="lib-stat">
          <div className="num">{producedCount}<span style={{ fontSize: 15.5, color: 'var(--ink-3)' }}> / 33</span></div>
          <div className="lbl">已生产学科</div>
          <div className="sub">A/B/C/D/G/L/N/Q 等</div>
        </div>
        <div className="lib-stat">
          <div className="num">{v33Totals.all}</div>
          <div className="lbl">知识节点总数</div>
          <div className="sub">目标下限合计 ≈{grandTargetLow}</div>
        </div>
        <div className="lib-stat">
          <div className="num">{grandCurrent}</div>
          <div className="lbl">覆盖达成（累计）</div>
          <div className="sub">{Math.round((grandCurrent / grandTargetLow) * 100)}% of 目标下限</div>
        </div>
      </div>

      {/* 学科覆盖 */}
      <div className="card">
        <div className="card-title-row">
          <h3>学科覆盖矩阵</h3>
          <span className="t-sm">核心对象区间：宁少勿滥，A6 质量门槛</span>
        </div>
        <div className="lib-tbl-wrap">
          <table className="lib-table">
            <thead>
              <tr>
                <th>代码</th><th>学科</th><th>类型</th><th>境界</th><th>目标区间</th>
                <th>现有</th><th>覆盖（下限）</th><th>缺口</th>
              </tr>
            </thead>
            <tbody>
              {subjectRows.map((s) => {
                const pct = s.coverageLow;
                const done = s.current >= s.target[0];
                return (
                  <tr key={s.code}>
                    <td className="subj-code">{s.code}</td>
                    <td>{s.name}{s.status === 'ext' ? <span className="t-sm"> ·扩展</span> : null}</td>
                    <td className="t-sm">{TYPE_LABEL[s.type] ?? s.type}</td>
                    <td className="t-sm">{STAGE_NAMES[s.stage] ?? s.stage}</td>
                    <td className="t-sm">{s.target[0]}–{s.target[1]}</td>
                    <td><b>{s.current}</b></td>
                    <td>
                      <div className={`prog${done ? ' hi' : ''}`} style={{ width: 110 }}>
                        <i style={{ width: `${Math.min(100, pct)}%` }} />
                      </div>
                      <span className="t-sm">{pct}%</span>
                    </td>
                    <td className="gap-note">{s.current >= s.target[0] ? '已达标' : `缺 ${s.target[0] - s.current}–${s.target[1] - s.current}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {subjectRows.filter((s) => s.honestyGap).map((s) => (
          <div key={s.code} className="lib-honesty" style={{ marginTop: 8 }}>
            <b>{s.name}（{s.code}）诚实缺口：</b>{s.honestyGap}
          </div>
        ))}
      </div>

      {/* 节点清单 */}
      <div className="card">
        <div className="card-title-row">
          <h3>节点清单（{filtered.length} / {nodes.length}）</h3>
          <span className="t-sm">点击行展开详情</span>
        </div>
        <div className="lib-filters">
          <select value={subjectFilter} onChange={(e) => { setSubjectFilter(e.target.value); setPage(1); }}>
            <option value="ALL">全部学科</option>
            {subjectRows.map((s) => (
              <option key={s.code} value={s.code}>{s.code} · {s.name}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="ALL">全部状态</option>
            <option value="candidate">候选</option>
            <option value="conditional">待审</option>
            <option value="quarantine">隔离</option>
          </select>
          <input placeholder="搜索 nodeId / 主题 / 学科名" value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(1); }} />
        </div>
        {pageRows.length === 0 ? (
          <div className="lib-empty">无匹配节点</div>
        ) : (
          <>
            <div style={{ marginTop: 10 }}>
              {pageRows.map((n) => (
                <NodeRow key={n.nodeId} node={n} expanded={expandedId === n.nodeId} onToggle={() => toggleExpand(n.nodeId)} diffLabel={diffLabel} />
              ))}
            </div>
            {pageCount > 1 && (
              <div className="lib-pager">
                <button className="btn btn-sm btn-ghost" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>上一页</button>
                <span className="t-sm">{safePage} / {pageCount}</span>
                <button className="btn btn-sm btn-ghost" disabled={safePage >= pageCount} onClick={() => setPage(safePage + 1)}>下一页</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 审核队列 */}
      <div className="card">
        <div className="card-title-row">
          <h3>人工审核队列（{reviewNodes.length}）</h3>
          <span className="t-sm">候选节点亦建议人工抽审</span>
        </div>
        {reviewNodes.length === 0 ? (
          <div className="lib-empty">当前无待审 / 隔离节点</div>
        ) : (
          reviewNodes.map((n) => (
            <div key={n.nodeId} style={{ padding: '10px 0', borderBottom: '1px solid var(--line-soft, rgba(0,0,0,0.06))' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div>
                  <b>{n.topic}</b>
                  <span className="t-sm" style={{ marginLeft: 8 }}>{n.nodeId}</span>
                </div>
                <div className="lib-node-meta">
                  <span className={`pill ${STATUS_META[n.status]?.cls}`}>{STATUS_META[n.status]?.label}</span>
                  {n.cases?.level ? <span className="pill st-muted">{String(n.cases.level)}</span> : null}
                  <span className="pill st-muted">{n.subjectName}（{n.subject}）</span>
                </div>
              </div>
              <div className="t-sm" style={{ marginTop: 4 }}>
                {n.intent ?? n.coreDefinition ?? n.description ?? ''}
              </div>
            </div>
          ))
        )}
        <div style={{ marginTop: 12 }}>
          <h3 style={{ fontSize: 15.5, marginBottom: 6 }}>审计结论</h3>
          {audit ? (
            <div style={{ display: 'grid', gap: 4 }}>
              {Object.entries(audit).map(([k, v]) => (
                <div key={k} style={{ fontSize: 15.5 }}>
                  <span className={
                    v.status === 'PASS' ? 'lib-audit-ok' : v.status === 'INFO' ? 'lib-audit-warn' : 'lib-audit-alert'
                  }>[{v.status}]</span>{' '}
                  <b>{k}</b>：{v.detail}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {batches.length > 0 && (
          <div className="lib-batch">
            <h3 style={{ fontSize: 15.5, marginBottom: 6 }}>批次明细（leak-through / 未知来源 / 高危隔离）</h3>
            {batches.map((b) => (
              <div key={String(b.batch)} style={{ fontSize: 15.5, marginBottom: 4 }}>
                <b>{String(b.batch)}</b>：
                leak-through {JSON.stringify(b.leakThrough)} · 未知来源 {String((b.unknownSourceRatio as Record<string, unknown>)?.pct ?? '?')}% · 高危隔离 {String((b.highRiskIsolationRate as Record<string, unknown>)?.pct ?? '?')}%
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NodeRow({
  node, expanded, onToggle, diffLabel,
}: {
  node: V33Node;
  expanded: boolean;
  onToggle: () => void;
  diffLabel: (d: number) => string | number;
}) {
  const m = STATUS_META[node.status] ?? STATUS_META.pending;
  return (
    <div className="lib-node-row" onClick={onToggle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '8px 4px', borderBottom: '1px solid var(--line-soft, rgba(0,0,0,0.05))', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <b style={{ fontSize: 15 }}>{node.topic}</b>
          <span className="t-sm" style={{ marginLeft: 8 }}>{node.nodeId}</span>
          {node.subjectName ? <span className="t-sm" style={{ marginLeft: 8 }}>{node.subjectName}</span> : null}
        </div>
        <div className="lib-node-meta">
          <span className={`pill ${m.cls}`}>{m.label}</span>
          <span className="pill st-muted">难度 {node.difficulty} · {diffLabel(node.difficulty)}</span>
          <span className="pill st-muted">来源 {node.sourceStatus === 'verified' ? 'verified' : node.sourceStatus}</span>
        </div>
      </div>
      {expanded ? (
        <div className="lib-detail">
          {node.stdJudgment ? <div className="kv"><b>判定：</b>{node.stdJudgment}</div> : null}
          {node.coreDefinition ? <div className="kv"><b>核心定义：</b>{node.coreDefinition}</div> : null}
          {node.learningUnit?.knowledge ? <div className="kv"><b>知识：</b>{node.learningUnit.knowledge}</div> : null}
          {node.learningUnit?.commonTrap ? <div className="kv"><b>常见误区：</b>{node.learningUnit.commonTrap}</div> : null}
          {node.learningUnit?.keyFacts?.length ? (
            <div className="kv"><b>关键事实：</b>{node.learningUnit.keyFacts.map((f) => `${f.field}（${f.sourceTitle}）`).join('；')}</div>
          ) : null}
          {node.learningUnit?.classicalLayer?.length ? (
            <div className="kv"><b>经典层：</b>{node.learningUnit.classicalLayer.map((c) => `${c.label}《${c.canon}》`).join('；')}</div>
          ) : null}
          {node.safety?.note ? <div className="kv"><b>安全：</b>{String(node.safety.note)}</div> : null}
          {node.riskTags?.length ? <div className="kv"><b>风险标签：</b>{node.riskTags.join('、')}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
