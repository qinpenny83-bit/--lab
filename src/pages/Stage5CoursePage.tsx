import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProgress, completeLearningUnit, resetChapterProgress } from '../store/progress';
import { learningChapterArray, unitsByChapter, reasoningChallengeById } from '../data/curriculum';
import { stageById, v3NodeById } from '../data/stages';
import { getNodeMastery } from '../engine/MasteryEngine';
import type { LearningUnitType } from '../types/models';
import LearningUnitPlayer from '../components/LearningUnitPlayer';
import ReasoningPlayer from '../components/ReasoningPlayer';
import { SafetyNote } from '../components/ui';

/** 学习单元类型 → 「当前一步」的友好名称（对应 学习→观察→练习→案例→推理→迁移→复习） */
const STEP_NAME: Record<LearningUnitType, string> = {
  introduction: '理解',
  concept: '理解',
  why: '为什么',
  comparison: '对比',
  observation: '观察',
  check: '练习',
  explanation: '练习',
  reflection: '练习',
  paradox: '练习',
  case: '案例',
  variation: '案例',
  transfer: '迁移',
  integration: '综合',
  summary: '复习',
  review: '复习',
  classic: '经典',
  formula: '方剂',
};

export default function Stage5CoursePage() {
  const { chapterId = '' } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const p = useProgress();

  const chapter = learningChapterArray.find((c) => c.id === chapterId);
  const stage = chapter ? stageById(chapter.stageId) : undefined;
  const units = useMemo(() => unitsByChapter(chapterId), [chapterId]);

  const completedSet = useMemo(() => new Set(p.completedUnits), [p.completedUnits]);
  const currentIdx = units.findIndex((u) => !completedSet.has(u.id));
  const current = currentIdx >= 0 ? units[currentIdx] : null;
  const allDone = units.length > 0 && currentIdx === -1;

  // 「为什么是现在？」：来自真实前置关系 + 掌握进度，不写死文案
  const whyNow = useMemo(() => {
    if (!chapter) return '';
    const firstNode = v3NodeById(chapter.nodeIds[0]);
    const prereqTitles = (firstNode?.v3?.prerequisites ?? [])
      .map((id) => v3NodeById(id)?.title)
      .filter(Boolean) as string[];
    const mastered = chapter.nodeIds.filter((id) => getNodeMastery(p, id).state === 'mastered').length;
    const pre = prereqTitles.length ? `你已经学过「${prereqTitles.join('、')}」这些前置内容，` : '';
    return `${pre}现在学「${chapter.title}」，是因为：${chapter.description}`;
  }, [chapter, p]);

  if (!chapter) {
    return (
      <div className="page page-narrow">
        <div className="card empty-card">
          <p>没有找到这个章节。</p>
          <Link to="/journey" className="btn btn-primary">返回修炼之路</Link>
        </div>
      </div>
    );
  }

  if (units.length === 0) {
    return (
      <div className="page page-narrow">
        <div className="practice-head">
          <Link to="/journey" className="back-link">← 返回修炼之路</Link>
        </div>
        <div className="card empty-card">
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
          <p className="muted">这一章的课程内容还在打磨中。你可以先去「气机失常」这一章完整走一遍。</p>
          <Link to="/course/ch-s5-m2-c1" className="btn btn-primary">去「气机失常」章节 →</Link>
        </div>
      </div>
    );
  }

  const handleCaseDone = () => {
    if (current) {
      completeLearningUnit({
        unitId: current.id,
        nodeId: current.nodeId,
        topic: v3NodeById(current.nodeId)?.topic ?? 'syndrome',
        difficulty: v3NodeById(current.nodeId)?.difficulty ?? 2,
        correct: null,
      });
    }
    navigate(`/course/${chapterId}`);
  };

  const doneCount = units.filter((u) => completedSet.has(u.id)).length;
  const stepPct = units.length ? Math.round((doneCount / units.length) * 100) : 0;

  return (
    <div className="page page-narrow">
      <div className="practice-head">
        <Link to="/journey" className="back-link">← 返回修炼之路</Link>
      </div>

      {/* 当前一步（只突出「你现在正在学什么」） */}
      <div className="course-now">
        <div className="course-now-stage">
          {stage ? `${stage.title}` : ''}
          {stage ? ` · 第 ${chapter.order} 章` : ''}
        </div>
        <h1 className="course-now-title">{chapter.title}</h1>
        <div className="course-now-pos">
          <span className="course-now-step">
            当前：{current ? STEP_NAME[current.type] ?? '学习' : '已完成'}
          </span>
          <span className="course-now-count">
            {current ? currentIdx + 1 : units.length} / {units.length}
          </span>
        </div>
        <div className="node-bar course-step-bar">
          <div className="node-bar-fill" style={{ width: `${stepPct}%` }} />
        </div>
      </div>

      {/* 为什么是现在？ */}
      {!allDone ? (
        <div className="card why-now">
          <p className="why-now-label">为什么是现在？</p>
          <p className="why-now-text">{whyNow}</p>
        </div>
      ) : null}

      {allDone ? (
        <div className="card result-card rise">
          <div className="result-head ok">🎓 本章课程已完成</div>
          <div className="result-feedback">
            <p>你走完了一整条「理解 → 观察 → 练习 → 案例 → 推理 → 迁移 → 复习」的学习链。</p>
            <p className="muted">系统已根据你的真实行为更新了掌握状态与复习计划。</p>
          </div>
          <div className="reasoning-actions">
            <Link to="/journey" className="btn">返回修炼之路</Link>
            <button
              className="btn btn-primary"
              onClick={() => {
                resetChapterProgress(chapterId);
                navigate(`/course/${chapterId}`);
              }}
            >
              再复习一遍 →
            </button>
          </div>
        </div>
      ) : current ? (
        current.interactionType === 'case_analysis' ? (
          <ReasoningPlayer
            key={current.id}
            challenge={reasoningChallengeById(parseChallengeId(current.interactionData))!}
            onDone={handleCaseDone}
          />
        ) : (
          <LearningUnitPlayer key={current.id} unit={current} onComplete={() => navigate(`/course/${chapterId}`)} />
        )
      ) : null}

      <SafetyNote />
    </div>
  );
}

function parseChallengeId(raw?: string): string {
  if (!raw) return '';
  try {
    const d = JSON.parse(raw) as { challengeId?: string };
    return d.challengeId ?? '';
  } catch {
    return '';
  }
}