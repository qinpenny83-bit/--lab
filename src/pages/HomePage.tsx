import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ensureDailyToday, useProgress } from '../store/progress';
import { stageById, STAGES, ALL_V3_NODES } from '../data/stages';
import { chaptersByStage, unitsByChapter, learningUnitById } from '../data/curriculum';
import { v33NodesBySubject, v33Subjects } from '../data/v33';
import type { V33Node } from '../types/v33';
import { CULTIVATION_REALMS, TOPIC_META } from '../types/models';
import type { LearningUnit } from '../types/models';
import { SafetyNote } from '../components/ui';

/** 学习单元类型 → 一句可读的「动作」描述（用于今日修炼弧线预览） */
const ARC_LABEL: Record<string, string> = {
  introduction: '理解一个概念',
  concept: '理解一个核心概念',
  why: '明白「为什么」',
  comparison: '比较两个概念',
  observation: '观察一个现象',
  check: '自己判断一次',
  explanation: '用自己的话解释',
  reflection: '想一想',
  paradox: '破解一个反直觉误区',
  case: '看一个真实案例',
  variation: '看一个变化案例',
  case_analysis: '完成一次中医推理',
  transfer: '把方法迁移到新情境',
  integration: '把知识串起来',
  summary: '小结',
  review: '复习巩固',
  classic: '读一段经典',
  formula: '看一个方剂结构',
};

/** 探索型入口（不抢「今日修炼」主路径，低调陈列） */
const EXPLORE = [
  { to: '/map', icon: '🗺️', name: '知识地图' },
  { to: '/classic', icon: '📜', name: '经典' },
  { to: '/formula', icon: '🍵', name: '方剂' },
  { to: '/paradox', icon: '🧠', name: '反直觉' },
  { to: '/family', icon: '🏠', name: '家庭观察' },
];

export default function HomePage() {
  const p = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    ensureDailyToday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stageId = p.currentStageId ?? 'stage1';
  const stage = stageById(stageId) ?? stageById('stage1')!;
  const completedSet = new Set(p.completedUnits);

  // 找到当前境界里「下一个还没走完的单元」所在的章节
  let focusChapter = null as ReturnType<typeof chaptersByStage>[number] | null;
  let focusUnit = null as LearningUnit | null;
  let focusIdx = 0;
  for (const ch of chaptersByStage(stageId)) {
    const us = unitsByChapter(ch.id);
    const idx = us.findIndex((u) => !completedSet.has(u.id));
    if (idx >= 0) {
      focusChapter = ch;
      focusUnit = us[idx];
      focusIdx = idx;
      break;
    }
  }

  // 当前境界全部走完 → 自动进入下一境的第一章
  if (!focusChapter) {
    const nextStage = STAGES.find((s) => s.order === stage.order + 1);
    const nextChapter = nextStage ? chaptersByStage(nextStage.id)[0] : null;
    if (nextChapter) {
      focusChapter = nextChapter;
      const us = unitsByChapter(nextChapter.id);
      focusUnit = us.find((u) => !completedSet.has(u.id)) ?? us[0] ?? null;
      focusIdx = 0;
    }
  }

  // 无课程章节的境界（第二~四、六~八境）：直接定位本境第一个未掌握的知识节点，
  // 让首页「今日修炼」永远有一个可一键进入的具体目标。
  let focusNode = null as V33Node | null;
  if (!focusChapter) {
    const usable = v33Subjects
      .filter((s) => s.stage === stageId)
      .sort((a, b) => a.code.localeCompare(b.code))
      .flatMap((s) => v33NodesBySubject(s.code))
      .filter((n) => n.status !== 'quarantine');
    focusNode = usable.find((n) => p.nodeMastery[n.nodeId]?.state !== 'mastered') ?? null;
    if (!focusNode) {
      const nextStage = STAGES.find((s) => s.order === stage.order + 1);
      if (nextStage) {
        const nextUsable = v33Subjects
          .filter((s) => s.stage === nextStage.id)
          .flatMap((s) => v33NodesBySubject(s.code));
        focusNode =
          nextUsable.find((n) => p.nodeMastery[n.nodeId]?.state !== 'mastered') ??
          nextUsable[0] ??
          null;
      }
    }
  }

  const chapterUnits = focusChapter ? unitsByChapter(focusChapter.id) : [];
  const chapterDone = chapterUnits.filter((u) => completedSet.has(u.id)).length;

  // 「你今天会」：当前章节从当前单元起，接下来最多 4 步的动作预览（去重）
  const todaySteps = (() => {
    if (!focusChapter || chapterUnits.length === 0) return [];
    const start = focusUnit ? Math.max(0, focusIdx) : 0;
    const seen = new Set<string>();
    const out: string[] = [];
    for (let i = start; i < chapterUnits.length && out.length < 4; i++) {
      const label = ARC_LABEL[chapterUnits[i].type] ?? '继续学习';
      if (!seen.has(label)) {
        seen.add(label);
        out.push(label);
      }
    }
    return out;
  })();

  // 「为什么现在学」：来自真实前置关系 + 进度位置，不写死文案
  const whyNow = (() => {
    if (!focusChapter && focusNode) {
      return `在「${stage.title}」里，下一个要掌握的是「${focusNode.topic}」。${focusNode.description}`;
    }
    if (!focusChapter) return `在「${stage.title}」里，还有内容值得你继续走。`;
    const chapterName = focusChapter.title;
    if (focusUnit) {
      const preTitles = focusUnit.prerequisiteIds
        .map((id) => learningUnitById(id)?.title)
        .filter(Boolean) as string[];
      const pre = preTitles.length ? `你已经学过「${preTitles.slice(0, 2).join('、')}」，` : '';
      if (stage.order === 1 && chapterDone === 0 && focusIdx === 0) {
        return `这是「初识中医」的第一课。中医不是靠背的，你要先学会"用中医的方式看身体"，后面每一境都建在这一步上。`;
      }
      return `${pre}接下来学「${focusUnit.title}」，因为：${focusUnit.objective}。`;
    }
    return `这一章「${chapterName}」你已经走完，再复习一遍，就能更稳地进入下一境。`;
  })();

  const focusTitle = focusUnit?.title ?? focusChapter?.title ?? focusNode?.topic ?? stage.title;

  // ---- 修炼状态 ----
  const completedCount = Object.values(p.stageProgress).filter(
    (sp) => sp.state === 'completed' || sp.state === 'mastered'
  ).length;
  const realm = CULTIVATION_REALMS[Math.min(completedCount, 7)];
  const stageNodes = ALL_V3_NODES.filter((n) => n.v3?.stageId === stageId);
  const masteredInStage = stageNodes.filter((n) => p.nodeMastery[n.id]?.state === 'mastered').length;
  const stagePct = stageNodes.length ? Math.round((masteredInStage / stageNodes.length) * 100) : 0;
  const recentMastering = p.recentTopics.slice(0, 3).map((t) => TOPIC_META[t]?.name).filter(Boolean);

  const ctaTarget = focusChapter ? `/course/${focusChapter.id}` : focusNode ? `/practice/${focusNode.nodeId}` : '/journey';

  return (
    <div className="home home-v35">
      {/* ===== 首屏：今日修炼（只回答三件事） ===== */}
      <section className="focus-hero rise">
        <div className="focus-eyebrow">🌿 今日修炼</div>
        <h1 className="focus-title">{focusTitle}</h1>
        {focusUnit ? (
          <p className="focus-objective">{focusUnit.objective}</p>
        ) : (
          <p className="focus-objective">{focusChapter?.description ?? focusNode?.description ?? ''}</p>
        )}

        <div className="focus-whyn">
          <span className="focus-li">为什么现在学？</span>
          <p className="focus-whyn-text">{whyNow}</p>
        </div>

        {todaySteps.length ? (
          <div className="focus-today">
            <span className="focus-li">今天你会</span>
            <div className="focus-steps">
              {todaySteps.map((s, i) => (
                <span key={s} className="focus-step">
                  <em>{['一', '二', '三', '四'][i] ?? i + 1}</em> {s}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="focus-meta">
          {focusChapter ? <span className="focus-min">预计 {focusChapter.estimatedMinutes} 分钟</span> : null}
          <span className="focus-chapter">
            {stage.title}
            {focusChapter ? ` · 第 ${focusChapter.order} 章「${focusChapter.title}」` : focusNode ? ` · 知识点「${focusNode.topic}」` : ''}
          </span>
        </div>

        <button className="btn btn-primary btn-cta" onClick={() => navigate(ctaTarget)}>
          开始今日修炼 →
        </button>
      </section>

      {/* ===== 你的修炼状态（克制地提示位置与去向） ===== */}
      <section className="card status-card rise d2">
        <div className="status-left">
          <span className="status-realm-icon">{realm.icon}</span>
          <div className="status-realm">
            <div className="status-realm-name">
              {realm.title} · <span className="status-stage">{stage.title}</span>
            </div>
            <div className="node-bar status-bar">
              <div className="node-bar-fill" style={{ width: `${stagePct}%` }} />
            </div>
            {recentMastering.length ? (
              <div className="status-recent">最近正在掌握：{recentMastering.join(' / ')}</div>
            ) : null}
          </div>
        </div>
        <Link to="/journey" className="status-more">
          查看我的修炼之路 →
        </Link>
      </section>

      {/* ===== 探索型入口（低调，不抢主路径） ===== */}
      <section className="explore-row rise d3">
        {EXPLORE.map((e) => (
          <Link key={e.to} to={e.to} className="explore-chip">
            <span className="explore-icon">{e.icon}</span>
            {e.name}
          </Link>
        ))}
      </section>

      <SafetyNote />
    </div>
  );
}