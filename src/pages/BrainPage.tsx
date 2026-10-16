import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BADGES, dominantRootCause, engine, resetProgress, useProgress } from '../store/progress';
import {
  CATEGORY_ICON,
  CATEGORY_LABEL,
  MASTERY_LABEL,
  TOPIC_META,
  TOPIC_ORDER,
  topicMetaOf,
} from '../types/models';
import type { ErrorCategory, MasteryState, MemoryTemperature } from '../types/models';
import { LevelBar, PageHead } from '../components/ui';
import { nodesByTopic } from '../data';
import { getNodeMastery, masteryChecklist } from '../engine/MasteryEngine';
import { getReviewState, temperatureOf } from '../engine/ReviewEngine';
import { now } from '../engine/clock';

const KIND_ICON: Record<string, string> = {
  single_symptom_jump: '⚡',
  concept_confusion: '🧩',
  overlook_clue: '👁️',
  missing_prereq: '🧱',
};

const STATE_EMOJI: Record<MasteryState, string> = {
  new: '⚪',
  learning: '🔵',
  familiar: '🟡',
  unstable: '🟠',
  mastered: '🟢',
};

const TEMP_ICON: Record<MemoryTemperature, string> = {
  hot: '🔥',
  warm: '🌡️',
  cold: '❄️',
  freezing: '🧊',
};

/** Agent 对单个知识点掌握状态的解释（基于真实验证记录） */
function agentNoteFor(state: MasteryState, title: string): string {
  switch (state) {
    case 'mastered':
      return `「${title}」熟悉、变式、陌生三种场景全部通过，间隔复习也稳定——真正掌握，不只是记住了答案。`;
    case 'familiar':
      return '你已经理解基础概念，但换一个场景还容易受到干扰。建议再做一次迁移挑战。';
    case 'unstable':
      return '间隔后出现了遗忘，说明还没真正记住。先复习一次，再做迁移验证。';
    case 'learning':
      return '还在积累验证记录：完成熟悉、变式、陌生三种场景验证，才能确认真正掌握。';
    default:
      return '先完成这个知识点的学习，再进入三种场景验证。';
  }
}

export default function BrainPage() {
  const p = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);
  const profile = engine.profile(p);
  const totalAnswered = TOPIC_ORDER.reduce((acc, t) => acc + (p.mastery[t]?.total ?? 0), 0);
  const totalCorrect = TOPIC_ORDER.reduce((acc, t) => acc + (p.mastery[t]?.correct ?? 0), 0);
  const accuracy = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const suggestions = engine.recommend(p).slice(0, 3);

  // ---- V2：所有知识节点的掌握记录 ----
  const nodeRows = TOPIC_ORDER.flatMap((t) =>
    nodesByTopic(t).map((n) => ({ topic: t, node: n, nm: getNodeMastery(p, n.id) }))
  );
  const studied = nodeRows.filter((x) => x.nm.validations.length > 0);
  const countByState = (s: MasteryState) => nodeRows.filter((x) => x.nm.state === s).length;
  const masteredCount = countByState('mastered');
  const familiarCount = countByState('familiar');
  const unstableCount = countByState('unstable');
  const learningCount = countByState('learning');

  // ---- V2：我的错误（错误模式聚合） ----
  const patterns = [...p.mistakePatterns].sort((a, b) => b.count - a.count).slice(0, 5);

  // ---- V2：我的思维（行为统计，只展示有数据的项） ----
  const s = p.stats;
  const thinkingRows: { icon: string; label: string }[] = [];
  if (s.prematureJudgmentRate >= 0.5) {
    thinkingRows.push({ icon: '⚡', label: `容易过早下结论（${Math.round(s.prematureJudgmentRate * 100)}% 的错误是单线索快速判断）` });
  } else if (s.prematureJudgmentRate > 0 && s.prematureJudgmentRate < 0.5) {
    thinkingRows.push({ icon: '👀', label: '下结论前开始先收集线索（过早判断错误占比已降低）' });
  }
  if (s.averageQuestionsBeforeJudgment >= 0.5) {
    thinkingRows.push({ icon: '🔍', label: `判断前会先追问（${Math.round(s.averageQuestionsBeforeJudgment * 100)}% 的病例会主动追问关键问题）` });
  }
  if (s.clueCoverage >= 0.7) {
    thinkingRows.push({ icon: '🧩', label: `线索覆盖稳定（病例整体正确率 ${Math.round(s.clueCoverage * 100)}%）` });
  }
  if (s.transferSuccessRate >= 0.7) {
    thinkingRows.push({ icon: '🧭', label: `换场景也能判断（迁移验证通过率 ${Math.round(s.transferSuccessRate * 100)}%）` });
  }
  if (s.reviewRetention >= 0.7) {
    thinkingRows.push({ icon: '📖', label: `复习保持良好（最近复习答对率 ${Math.round(s.reviewRetention * 100)}%）` });
  }
  if (s.mistakeRecoveryRate >= 0.7) {
    thinkingRows.push({ icon: '🌱', label: `错因纠正能力强（${Math.round(s.mistakeRecoveryRate * 100)}% 的错误模式已被纠正）` });
  }
  if (!thinkingRows.length) thinkingRows.push({ icon: '🌱', label: '行为数据积累中，多完成几次训练后生成。' });

  // ---- V2：我为什么会错（主导错因） ----
  const dom = dominantRootCause(p);
  const categoryCounts: { category: ErrorCategory; count: number }[] = [];
  for (const cat of Object.keys(CATEGORY_LABEL) as ErrorCategory[]) {
    const n = p.mistakePatterns.filter((x) => x.category === cat).reduce((a, x) => a + x.count, 0);
    if (n > 0) categoryCounts.push({ category: cat, count: n });
  }

  // ---- V2：7日掌握报告 ----
  const reports = [...p.weeklyReports].sort((a, b) => b.startedAt - a.startedAt);

  const doReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetProgress();
    setConfirmReset(false);
  };

  return (
    <div className="page">
      <PageHead
        title="我的中医大脑"
        sub="所有画像、优势、习惯与发现都来自你的真实答题记录，不虚构。"
      />

      {/* 学习画像 */}
      <div className="card profile-card">
        <div className="profile-head">
          <span className="agent-avatar">🧑‍⚕️</span>
          <span className="agent-name">你的学习画像</span>
          <span className="tag tag-mint">🧭 {profile.tag.label}</span>
        </div>
        <p className="profile-text">{profile.text}</p>
        <p className="agent-tag-desc">{profile.tag.desc}</p>
        <div className="profile-tags">
          {profile.strongTopics.map((t) => (
            <span key={t} className="tag strong">强 · {t}</span>
          ))}
          {profile.weakTopics.map((t) => (
            <span key={t} className="tag weak">待练 · {t}</span>
          ))}
        </div>
      </div>

      {/* V2 四宫格：我的知识 / 我的错误 / 我的思维 / 我的掌握 */}
      <div className="insight-grid v2-region-grid">
        <div className="card insight-card">
          <h4>📖 我的知识</h4>
          {studied.length ? (
            <>
              <p className="region-stat">
                已学习 {studied.length} / {nodeRows.length} 个知识点
              </p>
              {TOPIC_ORDER.map((t) => {
                const rows = studied.filter((x) => x.topic === t);
                if (!rows.length) return null;
                const done = rows.filter((x) => x.nm.state === 'mastered').length;
                return (
                  <div key={t} className="insight-row">
                    <span className="insight-icon">{TOPIC_META[t].emoji}</span>
                    <span>{TOPIC_META[t].name}</span>
                    <span className={'region-done' + (done === rows.length ? ' all' : '')}>
                      {done}/{rows.length} 掌握
                    </span>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <p className="card-hint">完成知识挑战后，这里会显示每个知识点的掌握进度。</p>
              <Link to="/journey" className="btn btn-primary btn-sm">开始修炼 →</Link>
            </>
          )}
        </div>

        <div className="card insight-card">
          <h4>🧩 我的错误</h4>
          {patterns.length ? (
            patterns.map((pat) => (
              <div key={pat.kind} className="insight-row">
                <span className="insight-icon">{CATEGORY_ICON[pat.category]}</span>
                <span>
                  {CATEGORY_LABEL[pat.category]}
                  {pat.recovered ? <em className="region-recovered"> · 已纠正</em> : null}
                </span>
                <span className="region-count">{pat.count} 次</span>
              </div>
            ))
          ) : (
            <p className="card-hint">暂无错误记录，继续保持。</p>
          )}
        </div>

        <div className="card insight-card">
          <h4>🧠 我的思维</h4>
          {thinkingRows.map((r, i) => (
            <div key={i} className="insight-row">
              <span className="insight-icon">{r.icon}</span>
              <span>{r.label}</span>
            </div>
          ))}
        </div>

        <div className="card insight-card">
          <h4>🎯 我的掌握</h4>
          {studied.length ? (
            <>
              <div className="insight-row">
                <span className="insight-icon">🟢</span>
                <span>真正掌握</span>
                <span className="region-count">{masteredCount}</span>
              </div>
              <div className="insight-row">
                <span className="insight-icon">🟡</span>
                <span>熟悉但不稳定</span>
                <span className="region-count">{familiarCount}</span>
              </div>
              <div className="insight-row">
                <span className="insight-icon">🟠</span>
                <span>需要巩固</span>
                <span className="region-count">{unstableCount}</span>
              </div>
              <div className="insight-row">
                <span className="insight-icon">🔵</span>
                <span>学习中</span>
                <span className="region-count">{learningCount}</span>
              </div>
              {s.transferSuccessRate > 0 ? (
                <p className="region-hint">
                  迁移验证通过率 {Math.round(s.transferSuccessRate * 100)}%（换场景仍能答对的比例）
                </p>
              ) : null}
            </>
          ) : (
            <p className="card-hint">完成一个知识点的学习与挑战后，这里会显示你掌握得怎么样。</p>
          )}
        </div>
      </div>

      {/* 🎯 真正掌握（按主题展示每个知识点的验证明细） */}
      {studied.length ? (
        <div className="card true-mastery-card">
          <div className="card-title-row">
            <h3>🎯 真正掌握</h3>
            <span className="card-hint">不是答对一次就算掌握：三种场景 + 间隔复习全部验证才算</span>
          </div>
          {TOPIC_ORDER.map((t) => {
            const rows = studied.filter((x) => x.topic === t);
            if (!rows.length) return null;
            return (
              <div key={t} className="true-topic">
                <div className="true-topic-head">
                  <span>{TOPIC_META[t].emoji} {TOPIC_META[t].name}</span>
                  <span className="true-topic-count">
                    {rows.filter((x) => x.nm.state === 'mastered').length}/{rows.length} 真正掌握
                  </span>
                </div>
                {rows.map(({ node, nm }) => {
                  const check = masteryChecklist(nm);
                  const rs = getReviewState(p, node.id, node.difficulty ?? 1);
                  const reviewed = rs.reviewCount > 0;
                  const temp = temperatureOf(p, rs, now());
                  return (
                    <div key={node.id} className={'true-row state-' + nm.state}>
                      <div className="true-row-head">
                        <span className="true-state">
                          {STATE_EMOJI[nm.state]} {MASTERY_LABEL[nm.state]}
                        </span>
                        <span className="true-node-title">{node.title}</span>
                        <span className={'true-temp true-temp-' + temp}>{TEMP_ICON[temp]}</span>
                      </div>
                      <div className="true-checks">
                        <span className={check[0].done ? 'ok' : 'no'} title="同类型题目再答一次">
                          {check[0].done ? '✓' : '✕'} 熟悉案例
                        </span>
                        <span className={check[1].done ? 'ok' : 'no'} title="换一种说法的同类题目">
                          {check[1].done ? '✓' : '✕'} 变式案例
                        </span>
                        <span className={check[2].done ? 'ok' : 'no'} title="全新场景的题目">
                          {check[2].done ? '✓' : '✕'} 陌生案例
                        </span>
                        <span className={reviewed ? 'ok' : 'no'} title="隔几天再考一次，检验是否真记住">
                          {reviewed ? '✓' : '✕'} 间隔复习
                        </span>
                      </div>
                      <p className="true-note">🤖 {agentNoteFor(nm.state, node.title)}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : null}

      {/* 我为什么会错？ */}
      {dom ? (
        <div className="card why-mistake-card">
          <div className="card-title-row">
            <h3>我为什么会错？</h3>
            <span className="tag tag-mint">
              {CATEGORY_ICON[dom.category]} {CATEGORY_LABEL[dom.category]}
            </span>
          </div>
          <p className="mistake-summary">{dom.cause.summary}</p>
          <p className="mistake-evidence">{dom.cause.evidence}</p>
          <p className="mistake-advice">💡 {dom.cause.advice}</p>
          {categoryCounts.length ? (
            <div className="category-list">
              {categoryCounts.map((c) => (
                <span key={c.category} className={'category-chip' + (c.category === dom.category ? ' active' : '')}>
                  {CATEGORY_ICON[c.category]} {CATEGORY_LABEL[c.category]} × {c.count}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* 🌱 7日掌握报告 */}
      {reports.length ? (
        <div className="card weekly-report-card">
          <div className="card-title-row">
            <h3>🌱 7日掌握报告</h3>
            <span className="card-hint">Day 1 / 3 / 7 用不同案例验证，看的是掌握，不是正确率</span>
          </div>
          {reports.map((r) => {
            const tNodes = nodesByTopic(r.topic).map((n) => getNodeMastery(p, n.id));
            const tMastered = tNodes.filter((n) => n.state === 'mastered').length;
            const topicMistakes = p.mistakes.filter((m) => m.topic === r.topic);
            const windowStart = r.startedAt;
            const windowEnd = windowStart + 7 * 86400000;
            const early = topicMistakes.filter((m) => m.at >= windowStart && m.at < windowStart + 3 * 86400000).length;
            const late = topicMistakes.filter((m) => m.at >= windowStart + 3 * 86400000 && m.at <= windowEnd).length;
            return (
              <div key={r.topic} className="weekly-report">
                <div className="weekly-head">
                  <span className="weekly-title">
                    {topicMetaOf(r.topic)?.emoji ?? '📖'} {topicMetaOf(r.topic)?.name ?? r.topic}
                  </span>
                  <span className="weekly-date">
                    {new Date(r.startedAt).toLocaleDateString('zh-CN')} 开始 · 记录 {r.points.length}/3 个验证点
                  </span>
                </div>
                <div className="weekly-track">
                  {[1, 3, 7].map((day) => {
                    const pt = r.points.find((x) => x.day === day);
                    return (
                      <div key={day} className={'weekly-day' + (pt ? ' done' : '')}>
                        <span className="weekly-day-num">Day {day}</span>
                        <span className="weekly-day-state">{pt ? '✓ 已验证' : '· 待验证'}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="weekly-dim">
                  <span>知识掌握：{tNodes.length ? `${tMastered}/${tNodes.length} 个知识点真正掌握` : '学习中'}</span>
                  <span>
                    错误变化：
                    {early === 0 && late === 0
                      ? '无错题记录'
                      : late < early
                        ? `从 ${early} 次降到 ${late} 次`
                        : `前后 ${early} / ${late} 次，继续观察`}
                  </span>
                  <span>
                    迁移能力：{s.transferSuccessRate > 0 ? `通过率 ${Math.round(s.transferSuccessRate * 100)}%` : '待积累'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* 我正在变强（行为反馈，不是数据后台） */}
      {p.sessions.length ? (
        <div className="card growth-card">
          <div className="card-title-row">
            <h3>我正在变强</h3>
            <span className="card-hint">只记录行为变化，不评价人格</span>
          </div>
          <div className="growth-grid">
            {s.prematureJudgmentRate > 0 ? (
              <div className="growth-item">
                <span className="growth-icon">{s.prematureJudgmentRate >= 0.5 ? '⚡' : '👀'}</span>
                <span className="growth-num">{Math.round(s.prematureJudgmentRate * 100)}%</span>
                <span className="growth-label">
                  {s.prematureJudgmentRate >= 0.5 ? '过早判断占比，下次先找第二条线索' : '过早判断占比，正在变稳'}
                </span>
              </div>
            ) : null}
            {s.transferSuccessRate > 0 ? (
              <div className="growth-item">
                <span className="growth-icon">🧭</span>
                <span className="growth-num">{Math.round(s.transferSuccessRate * 100)}%</span>
                <span className="growth-label">换陌生场景仍能判断（迁移能力）</span>
              </div>
            ) : null}
            {s.reviewRetention > 0 ? (
              <div className="growth-item">
                <span className="growth-icon">📖</span>
                <span className="growth-num">{Math.round(s.reviewRetention * 100)}%</span>
                <span className="growth-label">间隔复习后仍能答对（保持率）</span>
              </div>
            ) : null}
            {s.mistakeRecoveryRate > 0 ? (
              <div className="growth-item">
                <span className="growth-icon">🌱</span>
                <span className="growth-num">{Math.round(s.mistakeRecoveryRate * 100)}%</span>
                <span className="growth-label">错误模式已被纠正（纠正率）</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Agent 建议 */}
      <div className="card agent-advice-card">
        <div className="agent-head">
          <span className="agent-avatar">🧑‍⚕️</span>
          <span className="agent-name">Agent 建议</span>
        </div>
        {suggestions.length ? (
          suggestions.map((sg) => (
            <Link
              key={sg.id}
              to={sg.type === 'case' ? `/cases/${sg.refId}` : sg.type === 'observation' ? `/observe/${sg.refId}` : sg.type === 'formula' ? `/formula/${sg.refId}` : sg.type === 'classic' ? `/classic/${sg.refId}` : sg.type === 'paradox' ? `/paradox/${sg.refId}` : `/map/${sg.topic}`}
              className="agent-sub"
            >
              <span className="agent-sub-dot">•</span>
              <span className="agent-sub-text">{sg.title}</span>
              <span className="agent-sub-reason">{sg.reason}</span>
            </Link>
          ))
        ) : (
          <p className="card-hint">先完成一次训练，Agent 会给出下一步建议。</p>
        )}
      </div>

      {/* 徽章墙 */}
      <div className="card badge-wall">
        <h3>🏅 学习习惯徽章</h3>
        <p className="card-hint">不是积分游戏，而是记录你养成的学习习惯。</p>
        <div className="badge-grid">
          {BADGES.map((b) => {
            const earned = p.badges.find((x) => x.id === b.id);
            return (
              <div key={b.id} className={'badge-item' + (earned ? ' earned' : ' locked')}>
                <span className="badge-icon">{earned ? b.icon : '🔒'}</span>
                <span className="badge-name">{b.name}</span>
                <span className="badge-desc">{b.desc}</span>
                {earned ? <span className="badge-date">获得于 {new Date(earned.earnedAt).toLocaleDateString('zh-CN')}</span> : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* 数据总览 */}
      <div className="hero-stats">
        <div className="hero-stat">
          <span className="hero-stat-num">{p.streak}</span>
          <span className="hero-stat-label">🔥 连续天数</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-num">{p.xp}</span>
          <span className="hero-stat-label">✨ 总 XP</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-num">{totalAnswered}</span>
          <span className="hero-stat-label">答题次数</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-num">{accuracy}%</span>
          <span className="hero-stat-label">整体正确率</span>
        </div>
      </div>
      <div className="brain-level">
        <LevelBar />
      </div>

      {/* 主题掌握明细 */}
      <div className="card mastery-card">
        <h3>主题掌握明细</h3>
        {TOPIC_ORDER.map((t) => {
          const m = p.mastery[t];
          const r = m && m.total > 0 ? m.correct / m.total : 0;
          const state = m && m.total > 0 ? (r >= 0.8 ? '已掌握' : '修炼中') : '未开始';
          return (
            <div key={t} className="mastery-row">
              <span className="mastery-name">
                {TOPIC_META[t].emoji} {TOPIC_META[t].name}
              </span>
              <span className="mastery-bar">
                <span className="mastery-fill" style={{ width: `${Math.round(r * 100)}%` }} />
              </span>
              <span className="mastery-num">{m?.total ? `${Math.round(r * 100)}% · ${state}` : '—'}</span>
            </div>
          );
        })}
      </div>

      {/* 最近错题 */}
      {p.mistakes.length ? (
        <div className="card mistakes-card">
          <h3>📌 最近错题回顾</h3>
          {[...p.mistakes].reverse().slice(0, 5).map((m) => (
            <div key={m.sessionId} className="mistake-row">
              <p className="mistake-q">
                {KIND_ICON[m.kind] ?? '•'} 「{m.question}」
              </p>
              <p className="mistake-a">你的答案：{m.answer || '—'} · 参考：{m.correctAnswer || '—'}</p>
            </div>
          ))}
        </div>
      ) : null}

      {/* 数据管理 */}
      <div className="card data-card">
        <h3>数据管理</h3>
        <p className="card-hint">进度保存在本地浏览器（localStorage），刷新不会丢失。重新开始会清空全部记录。</p>
        <button className={'btn ' + (confirmReset ? 'btn-danger' : 'btn-ghost')} onClick={doReset}>
          {confirmReset ? '⚠️ 再次点击确认清空' : '重新开始体验'}
        </button>
        {!confirmReset ? null : (
          <button className="btn btn-ghost" onClick={() => setConfirmReset(false)}>
            取消
          </button>
        )}
      </div>

      <div className="brain-links">
        <Link to="/map" className="btn btn-ghost">去修炼 →</Link>
        <Link to="/paradox" className="btn btn-ghost">反直觉挑战</Link>
      </div>
    </div>
  );
}
