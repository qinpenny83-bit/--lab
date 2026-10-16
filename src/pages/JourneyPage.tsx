import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../store/progress';
import { v33AllNodesDoc, v33NodesBySubject, v33Subjects } from '../data/v33';
import type { V33SubjectRow } from '../types/v33';
import { getNodeMastery } from '../engine/MasteryEngine';
import { chaptersByStage } from '../data/curriculum';
import type { StageState } from '../types/models';

const STAGE_ORDER = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7', 'stage8'];

const STAGE_META: Record<string, { emoji: string; name: string; desc: string }> = {
  stage1: { emoji: '🌱', name: '入门·基础认知', desc: '中医基础理论：整体观念、阴阳五行、藏象、气血津液、经络总论——中医思维的根。' },
  stage2: { emoji: '👁️', name: '诊法·望闻问切', desc: '中医诊断学与现代医学基础：四诊合参、八纲辨证，学会收集线索。' },
  stage3: { emoji: '🔄', name: '中药·药性药理', desc: '中药学：四气五味、升降浮沉、归经毒性，认识每一位药材。' },
  stage4: { emoji: '🏮', name: '经络·腧穴', desc: '经络学与腧穴学：十二正经、奇经八脉，腧穴定位与主治。' },
  stage5: { emoji: '🔍', name: '辨证·临床基础', desc: '刺法灸法、病因病机、脏腑辨证、中医临床基础，从证候走向治法。' },
  stage6: { emoji: '🧩', name: '针推·外感辨证', desc: '针灸治疗、推拿养生康复，外感辨证体系与中药鉴定/炮制/本草。' },
  stage7: { emoji: '⚗️', name: '方剂·经典', desc: '方剂学、方剂剂量、中医经典：从方证对应到经方思维。' },
  stage8: { emoji: '🌟', name: '医案·综合·思维', desc: '临床各科（内外妇儿骨眼耳）、各家学说、伦理科研与综合医案试炼。' },
};

const TYPE_LABEL: Record<string, string> = {
  theory: '理论', diagnostic: '诊断', herb: '中药', formula: '方剂',
  meridian: '经络', acupoint: '腧穴', classic: '经典', clinical: '临床',
  case: '医案', ethic: '人文', evidence: '科研',
};

const DIFF_LABEL: Record<number, string> = { 1: '认识', 2: '理解', 3: '应用', 4: '辨析', 5: '迁移', 6: '综合' };

// 四大板块分类（与知识蓝图保持一致）
const PLATES = [
  { key: 'root', tag: '根基层', desc: '中医怎么想', icon: '🌱', codes: ['A', 'B'], bg: '#e8f2ea', fg: '#2e6b4f' },
  { key: 'herb', tag: '方药层', desc: '中医用什么', icon: '🌿', codes: ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'], bg: '#f5ead6', fg: '#8a651c' },
  { key: 'classic', tag: '经典文献层', desc: '凭什么这么想', icon: '📜', codes: ['N', 'O', 'P'], bg: '#e8ecf6', fg: '#3d5a99' },
  { key: 'clinical', tag: '临床层', desc: '面对真实病证怎么办', icon: '🩺', codes: ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG'], bg: '#fae9e6', fg: '#a54a3a' },
];

function plateOf(code: string) {
  return PLATES.find((pl) => pl.codes.includes(code)) ?? PLATES[3];
}

function stateLabel(state: StageState): string {
  const map: Record<StageState, string> = {
    locked: '🔒 未解锁',
    unlocked: '🔓 可开始',
    learning: '📖 修炼中',
    familiar: '🌿 渐入佳境',
    unstable: '🔄 需要巩固',
    mastered: '✅ 已掌握',
    completed: '🌟 已通关',
  };
  return map[state] ?? state;
}

export default function JourneyPage() {
  const p = useProgress();
  const navigate = useNavigate();
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  // 33 学科按境界分组
  const subjectsByStage = useMemo(() => {
    const map: Record<string, V33SubjectRow[]> = {};
    for (const s of v33Subjects) {
      (map[s.stage] ??= []).push(s);
    }
    for (const k of Object.keys(map)) map[k].sort((a, b) => a.code.localeCompare(b.code));
    return map;
  }, []);

  const allNodes = v33AllNodesDoc.nodes;
  const isMastered = (nodeId: string) => p.nodeMastery[nodeId]?.state === 'mastered';
  const masteredTotal = allNodes.filter((n) => isMastered(n.nodeId)).length;
  const overallProgress = allNodes.length ? Math.round((masteredTotal / allNodes.length) * 100) : 0;

  // 修炼等级：已完成境界数
  const completedCount = Object.values(p.stageProgress).filter(
    (sp) => sp.state === 'completed' || sp.state === 'mastered'
  ).length;
  const realmIndex = Math.min(completedCount, 7);
  const realms = [
    { name: '初学者', icon: '🌱', desc: '中医思维的起点' },
    { name: '见习者', icon: '🌿', desc: '开始理解中医的语言' },
    { name: '观察者', icon: '👁️', desc: '学会"看到了什么"比"这是什么病"更重要' },
    { name: '辨证者', icon: '🧩', desc: '能够把线索组合成证候图景' },
    { name: '推理者', icon: '🔍', desc: '能从多个角度综合分析病机' },
    { name: '迁移者', icon: '🧭', desc: '熟悉的知识能运用到陌生场景' },
    { name: '综合修炼者', icon: '⚗️', desc: '多套辨证体系融会贯通' },
    { name: '杏林试炼者', icon: '🌟', desc: '已走过完整的修炼之路' },
  ];
  const currentRealm = realms[realmIndex];

  function toggleStage(stageId: string) {
    setExpandedStage(expandedStage === stageId ? null : stageId);
    setExpandedSubject(null);
  }

  function toggleSubject(code: string) {
    setExpandedSubject(expandedSubject === code ? null : code);
  }

  function nodeStateText(nodeId: string): { label: string; cls: string } {
    const nm = p.nodeMastery[nodeId];
    if (!nm) return { label: '未学习', cls: '' };
    if (nm.state === 'mastered') return { label: '已掌握', cls: 'ok' };
    if (nm.state === 'unstable') return { label: '不稳定', cls: '' };
    if (nm.state === 'familiar') return { label: '熟悉中', cls: 'rec' };
    if (nm.state === 'learning') return { label: '学习中', cls: 'rec' };
    return { label: '未学习', cls: '' };
  }

  const stageStats = (stageId: string) => {
    const subs = subjectsByStage[stageId] ?? [];
    const nodes = subs.flatMap((s) => v33NodesBySubject(s.code).filter((n) => n.status !== 'quarantine'));
    const mastered = nodes.filter((n) => isMastered(n.nodeId)).length;
    return { subs, nodes, mastered, total: nodes.length };
  };

  const firstPending = (stageId: string): string | null => {
    const { nodes } = stageStats(stageId);
    const n = nodes.find((nd) => p.nodeMastery[nd.nodeId]?.state !== 'mastered');
    return n ? n.nodeId : null;
  };

  return (
    <div className="page-page" style={{ maxWidth: 760, margin: '0 auto', padding: '16px 14px 80px' }}>
      {/* 头部 */}
      <div style={{ marginBottom: 24 }}>
        <button className="back-link" onClick={() => navigate('/')}>← 返回首页</button>
        <h1 className="page-title" style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          🛤️ 我的修炼之路
        </h1>
        <p style={{ color: 'var(--ink-2)', fontSize: 13, marginTop: 4 }}>
          八境循序渐进，完整覆盖蓝图全部 33 学科、{allNodes.length} 个知识节点，分属四大板块。
        </p>
        {/* 四大板块图例 */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
          {PLATES.map((pl) => {
            const cnt = v33Subjects.filter((s) => pl.codes.includes(s.code)).length;
            return (
              <span key={pl.key} style={{ fontSize: 12, fontWeight: 600, background: pl.bg, color: pl.fg, borderRadius: 999, padding: '4px 12px' }}>
                {pl.icon} {pl.tag} · {cnt}科
              </span>
            );
          })}
        </div>
      </div>

      {/* 新手引导：八境全开放，但建议从第一境开始 */}
      {completedCount === 0 && masteredTotal === 0 ? (
        <div className="card" style={{ padding: '12px 16px', marginBottom: 16, background: 'linear-gradient(135deg, #f7efdd, #fdf6e6)', border: '1px solid #ecd9b0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 30 }}>🧭</span>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>新手这样走更顺</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 2, lineHeight: 1.6 }}>
                八境全部开放，想逛哪境都行；建议从第一境「入门·基础认知」开始打地基，一路循序渐进。
              </div>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                const n = firstPending('stage1');
                navigate(n ? `/practice/${n}` : '/journey');
                toggleStage('stage1');
              }}
            >
              从第一境开始 →
            </button>
          </div>
        </div>
      ) : null}

      {/* 修炼等级总览 */}
      <div className="card" style={{ padding: 20, marginBottom: 20, background: 'linear-gradient(135deg, var(--green-soft), var(--card))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 48 }}>{currentRealm.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 20, fontFamily: 'var(--font-serif)' }}>
              {currentRealm.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>
              {currentRealm.desc} · 已完成 {completedCount}/8 境
            </div>
            <div className="node-bar" style={{ marginTop: 8 }}>
              <div className="node-bar-fill" style={{ width: `${overallProgress}%` }} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>
              整体进度：{masteredTotal}/{allNodes.length} 知识点掌握 · {overallProgress}%
            </div>
          </div>
        </div>

        {/* 中医基础理论 · 核心学科英雄板块（单独拿出来，入口一目了然） */}
        {(() => {
          const subj = v33Subjects.find((s) => s.code === 'A');
          if (!subj) return null;
          const snodes = v33NodesBySubject('A').filter((n) => n.status !== 'quarantine');
          const mastered = snodes.filter((n) => isMastered(n.nodeId)).length;
          const pct = snodes.length ? Math.round((mastered / snodes.length) * 100) : 0;
          const pending = snodes.find((n) => p.nodeMastery[n.nodeId]?.state !== 'mastered');
          const allDone = snodes.length > 0 && !pending;
          return (
            <div
              style={{
                marginBottom: 20,
                borderRadius: 18,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1d5c41, #2f7d58)',
                color: '#fff',
                boxShadow: '0 6px 18px rgba(30,90,60,0.25)',
              }}
            >
              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.18)', borderRadius: 999, padding: '3px 10px' }}>
                      🏮 第一境 · 核心学科
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-serif)', marginTop: 8 }}>
                      🍀 中医基础理论
                    </div>
                    <div style={{ fontSize: 12.5, opacity: 0.88, marginTop: 4, lineHeight: 1.6 }}>
                      整体观念 · 阴阳五行 · 藏象 · 气血津液 —— 中医思维的根，全部 33 学科的地基。
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: 26, fontWeight: 800 }}>
                      {mastered}
                      <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.75 }}>/{snodes.length}</span>
                    </div>
                    <div style={{ fontSize: 11.5, opacity: 0.8 }}>知识点已掌握</div>
                  </div>
                </div>
                <div className="node-bar" style={{ marginTop: 12, background: 'rgba(255,255,255,0.25)' }}>
                  <div className="node-bar-fill" style={{ width: `${pct}%`, background: '#fff' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12.5, opacity: 0.92 }}>
                    {allDone ? '🌟 已全掌握——中医思维的根已扎稳！' : `进度 ${pct}% · 还有 ${snodes.length - mastered} 个待掌握`}
                  </span>
                  {pending ? (
                    <button
                      className="btn"
                      style={{ background: '#fff', color: '#1d5c41', fontWeight: 700, borderRadius: 999, padding: '9px 20px', border: 'none', cursor: 'pointer', fontSize: 14 }}
                      onClick={() => navigate(`/practice/${pending.nodeId}`)}
                    >
                      继续修炼 →
                    </button>
                  ) : (
                    <span style={{ fontSize: 12.5, fontWeight: 600 }}>🎉 全部拿下</span>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* 境界路径图 */}
        <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
          {STAGE_ORDER.map((id) => {
            const sp = p.stageProgress[id];
            const isActive = sp?.state === 'learning' || sp?.state === 'familiar' || sp?.state === 'unstable';
            const isDone = sp?.state === 'completed' || sp?.state === 'mastered';
            return (
              <span
                key={id}
                onClick={() => toggleStage(id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: isDone ? 'var(--green-soft)' : isActive ? 'var(--gold-soft)' : 'var(--bg-soft)',
                  color: isDone ? 'var(--green-deep)' : isActive ? '#8a651c' : 'var(--ink-3)',
                  transition: 'all 0.15s',
                }}
              >
                {STAGE_META[id].emoji} {STAGE_META[id].name}
              </span>
            );
          })}
        </div>
      </div>

      {/* 八境时间线 */}
      <div className="journey">
        {STAGE_ORDER.map((stageId) => {
          const meta = STAGE_META[stageId];
          const sp = p.stageProgress[stageId] ?? {
            stageId,
            state: 'locked' as StageState,
            startedAt: null,
            completedAt: null,
            masteredNodeCount: 0,
            totalNodeCount: 0,
            familiarNodeCount: 0,
          };
          const { subs, nodes, mastered, total } = stageStats(stageId);
          const progressPct = total > 0 ? Math.round((mastered / total) * 100) : 0;
          const isLocked = sp.state === 'locked';
          const isCompleted = sp.state === 'completed' || sp.state === 'mastered';
          const isCurrent = p.currentStageId === stageId;

          return (
            <div key={stageId} className="journey-node-wrap has-line">
              <div
                className={'journey-node' + (isCompleted ? ' mastered' : '') + (isLocked ? ' locked' : '') + (expandedStage === stageId ? ' selected' : '')}
                onClick={() => !isLocked && toggleStage(stageId)}
                style={{ cursor: isLocked ? 'default' : 'pointer' }}
              >
                <div className="node-emoji" style={{
                  background: isCompleted ? 'var(--green-soft)' : isCurrent ? 'var(--gold-soft)' : undefined,
                }}>
                  {meta.emoji}
                </div>
                <div className="node-body">
                  <div className="node-title-row">
                    <span className="node-title">{meta.name}</span>
                    <span className={'node-state' + (isCompleted ? ' ok' : isCurrent ? ' rec' : '')}>
                      {stateLabel(sp.state)}
                    </span>
                    {isCurrent ? (
                      <span style={{ fontSize: 10, color: '#8a651c', background: 'var(--gold-soft)', borderRadius: 999, padding: '1px 7px' }}>
                        当前
                      </span>
                    ) : null}
                  </div>
                  <span className="node-desc">{meta.desc}</span>
                  <div className="node-bar">
                    <div className="node-bar-fill" style={{ width: `${progressPct}%` }} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>
                    {mastered}/{total} 知识点 · {subs.length} 个学科
                    {isLocked ? ` · 🗝️ 需要完成前置境界` : ''}
                  </span>
                </div>
                {!isLocked ? (
                  <span className="node-go">{expandedStage === stageId ? '收起 ↑' : '进入 ↓'}</span>
                ) : (
                  <span className="node-go" style={{ opacity: 0.3 }}>🔒</span>
                )}
              </div>

              {/* 展开详情：学科 → 节点 */}
              {expandedStage === stageId && !isLocked ? (
                <div style={{ padding: '0 12px 12px 12px', animation: 'rise 0.25s ease' }}>
                  <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: '8px 0 14px', lineHeight: 1.6 }}>
                    {meta.desc}
                  </p>

                  {/* 学科列表 */}
                  {subs.map((s) => {
                    const sNodes = v33NodesBySubject(s.code);
                    const sMastered = sNodes.filter((n) => isMastered(n.nodeId)).length;
                    const expanded = expandedSubject === s.code;
                    const pl = plateOf(s.code);
                    return (
                      <div key={s.code} style={{
                        marginBottom: 10,
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        background: 'var(--card)',
                      }}>
                        <div
                          onClick={() => toggleSubject(s.code)}
                          style={{
                            padding: '10px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            background: 'var(--bg-soft)',
                            transition: 'background 0.15s',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 11, fontWeight: 600, background: pl.bg, color: pl.fg, borderRadius: 999, padding: '2px 8px' }}>
                              {pl.icon} {pl.tag}
                            </span>
                            <span style={{ fontWeight: 700, fontSize: 13 }}>{s.code} · {s.name}</span>
                            <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                              {TYPE_LABEL[s.type] ?? s.type}{s.status === 'ext' ? ' · 扩展' : ''}
                            </span>
                            <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                              目标 {s.target[0]}–{s.target[1]}
                            </span>
                          </div>
                          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                            {sMastered}/{sNodes.length}{expanded ? ' −' : ' +'}
                          </span>
                        </div>
                        {expanded ? (
                          <div style={{ padding: '8px 14px' }}>
                            <p style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 8 }}>
                              {s.current >= s.target[0] ? '✓ 已达下限目标' : `缺口 ${s.target[0] - s.current}–${s.target[1] - s.current}`}
                              {s.honestyGap ? ` · 诚实缺口：${s.honestyGap}` : ''}
                            </p>
                            {sNodes.map((n) => {
                              const ns = nodeStateText(n.nodeId);
                              const isQ = n.status === 'quarantine';
                              return (
                                <div
                                  key={n.nodeId}
                                  onClick={() => !isQ && navigate(`/practice/${n.nodeId}`)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '6px 8px',
                                    borderRadius: 6,
                                    cursor: isQ ? 'not-allowed' : 'pointer',
                                    fontSize: 12.5,
                                    opacity: isQ ? 0.6 : 1,
                                    transition: 'background 0.12s',
                                  }}
                                  onMouseEnter={(e) => !isQ && (e.currentTarget.style.background = 'var(--bg-soft)')}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                  <span className={'node-state' + (ns.cls ? ' ' + ns.cls : '')} style={{ fontSize: 10, padding: '1px 6px' }}>
                                    {isQ ? '🔒' : ns.label}
                                  </span>
                                  <span style={{ flex: 1, color: 'var(--ink)' }}>{n.topic}</span>
                                  <span style={{ color: 'var(--ink-3)', fontSize: 11 }}>
                                    {n.difficulty}级 · {DIFF_LABEL[n.difficulty] ?? n.difficulty}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}

                  {/* 第一境：☯️ 阴阳黄金关卡入口 */}
                  {stageId === 'stage1' ? (
                    <div className="card" style={{ padding: '12px 14px', marginBottom: 12, background: 'var(--gold-soft)' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>☯️ 阴阳探索 · 黄金关卡</p>
                      <p style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 8 }}>
                        从一场生活观察开始，亲手发现「阴阳是在比较关系」，再走完案例侦探与迁移。
                      </p>
                      <button
                        onClick={() => navigate('/golden/yinyang')}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '9px 0', fontSize: 13 }}
                      >
                        进入阴阳探索 →
                      </button>
                    </div>
                  ) : null}

                  {/* 第五境：课程播放器入口 */}
                  {stageId === 'stage5' ? (
                    <div className="card" style={{ padding: '12px 14px', marginBottom: 12, background: 'var(--gold-soft)' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>🎓 一键进入课程（不是知识列表，是一堂真正的课）</p>
                      <p style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 8 }}>
                        从教材到八步推理，再到迁移与掌握验证，亲自走完一条完整学习链。
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {chaptersByStage('stage5').map((ch) => (
                          <button
                            key={ch.id}
                            onClick={() => navigate(`/journey/stage5/${ch.id}`)}
                            style={{
                              textAlign: 'left',
                              padding: '8px 10px',
                              borderRadius: 8,
                              border: '1px solid var(--line)',
                              background: 'var(--card)',
                              cursor: 'pointer',
                              fontSize: 12.5,
                            }}
                          >
                            <span style={{ fontWeight: 600 }}>{ch.order}. {ch.title}</span>
                            <span style={{ display: 'block', color: 'var(--ink-3)', fontSize: 11, marginTop: 2 }}>
                              {ch.description.slice(0, 46)}{ch.description.length > 46 ? '…' : ''} · 约 {ch.estimatedMinutes} 分钟
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* 开始修炼按钮 */}
                  {!isCompleted && !isLocked ? (
                    <div style={{ marginTop: 12, textAlign: 'center' }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          const first = firstPending(stageId);
                          if (first) navigate(`/practice/${first}`);
                          else navigate('/journey');
                        }}
                        style={{ padding: '10px 32px', fontSize: 14 }}
                      >
                        {isCurrent ? '继续修炼' : '开始修炼'} {'→'}
                      </button>
                    </div>
                  ) : null}
                  {isCompleted ? (
                    <div style={{ marginTop: 12, textAlign: 'center', color: 'var(--green-deep)', fontWeight: 600, fontSize: 14 }}>
                      🌟 此境已通关！{STAGE_ORDER.indexOf(stageId) < 7 ? '继续挑战下一境界' : '你已走完全部八境！'}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
