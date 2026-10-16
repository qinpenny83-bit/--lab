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

/** 「今天你会」标题：按日期轮换，避免每天一模一样 */
const GREET = ['今天你会', '今日四步，陪你走', '今天这一程', '今日该做的四件小事', '今天，咱们这样练', '今日行程'];

/** 动作措辞变体：每个学习动作给几种说法，按日期轮换 */
const ACTION_VARIANTS: Record<string, string[]> = {
  introduction: ['理解一个概念', '先认识一个概念', '打个照面：认识它'],
  concept: ['理解一个核心概念', '弄懂一个核心概念', '吃透一个核心概念'],
  why: ['明白「为什么」', '弄清楚「为什么」', '搞懂背后的道理'],
  comparison: ['比较两个概念', '把两个概念放一起比', '辨一辨，两个概念差在哪'],
  observation: ['观察一个现象', '留意一个现象', '看一个身边的例子'],
  check: ['自己判断一次', '亲手断一回', '独立判一次'],
  explanation: ['用自己的话解释', '试着讲给别人听', '把道理说清楚'],
  reflection: ['想一想', '停下来琢磨一下', '在心里过一遍'],
  paradox: ['破解一个反直觉误区', '拆一个想当然的坑', '识破一个反直觉的误区'],
  case: ['看一个真实案例', '围观一个真实医案', '读一个临床案例'],
  variation: ['看一个变化案例', '看同一个道理换个样', '试试变着花样来'],
  case_analysis: ['完成一次中医推理', '跟着走完一次中医推理', '亲自推演一次辨证'],
  transfer: ['把方法迁移到新情境', '换个场景再用一次', '把学到的搬个家'],
  integration: ['把知识串起来', '把学过的连成一条线', '把碎片拼成整图'],
  summary: ['小结', '收个尾，小结一下', '把这节串个串'],
  review: ['复习巩固', '回炉一遍更扎实', '温故，再知新'],
  classic: ['读一段经典', '读一段原典', '翻开经典读一段'],
  formula: ['看一个方剂结构', '拆一个方子看看结构', '认识一首方'],
};

/** 每日小提示：中医谚语 / 趣味小知识，每天换一条 */
const DAILY_TIPS = [
  '医谚「上工治未病」——高手在病没来之前就防住了。今天学的，也是你的「治未病」功夫。',
  '四诊是望、闻、问、切。切是摸脉，也是「切中要害」的那个「切」。',
  '「急则治其标，缓则治其本」——先解燃眉之急，再理根本。中医从不蛮干。',
  '「正气存内，邪不可干」——底气足，病邪难近身。学中医也是在养你的「正气」。',
  '「药」字下是「约」——本草有约，一药一性，各有分寸，不可乱配。',
  '「三分治，七分养」——医是起点，养是日常功夫。',
  '「春夏养阳，秋冬养阴」——顺着节气走，就是最好的养生。',
  '「有诸内者，必形诸外」——身体里面的事，会写在脸上、脉上、舌上。',
  '「见肝之病，知肝传脾，当先实脾」——高手不只治眼前的，还防着下一步。',
  '「用药如用兵」——方剂如排兵布阵，君臣佐使各有职责。',
];

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
    const out: { type: string; label: string }[] = [];
    for (let i = start; i < chapterUnits.length && out.length < 4; i++) {
      const type = chapterUnits[i].type;
      const label = ARC_LABEL[type] ?? '继续学习';
      if (!seen.has(label)) {
        seen.add(label);
        out.push({ type, label });
      }
    }
    return out;
  })();

  // 按日期轮换：同一天内稳定（刷新不变），第二天自动换新
  const dayNum = new Date().getMonth() * 32 + new Date().getDate();
  const greeting = GREET[dayNum % GREET.length];
  const tip = DAILY_TIPS[dayNum % DAILY_TIPS.length];

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
            <span className="focus-li">{greeting}</span>
            <div className="focus-steps">
              {todaySteps.map((st, i) => {
                const variants = ACTION_VARIANTS[st.type] ?? [st.label];
                const label = variants[(dayNum + i) % variants.length];
                return (
                  <span key={`${st.type}-${i}`} className="focus-step">
                    <em>{['一', '二', '三', '四'][i] ?? i + 1}</em> {label}
                  </span>
                );
              })}
            </div>
            <div className="focus-tip">🪷 {tip}</div>
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

      {/* ===== 次栏：修炼状态 + 探索入口（桌面双栏，移动单列） ===== */}
      <div className="home-sub">
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

        <section className="explore-card rise d3">
          <div className="explore-title">继续探索</div>
          <div className="explore-row">
            {EXPLORE.map((e) => (
              <Link key={e.to} to={e.to} className="explore-chip">
                <span className="explore-icon">{e.icon}</span>
                {e.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <SafetyNote />
    </div>
  );
}