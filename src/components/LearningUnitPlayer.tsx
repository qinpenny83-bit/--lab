import { useMemo, useState } from 'react';
import type { LearningUnit } from '../types/models';
import { v3NodeById } from '../data/stages';
import { completeLearningUnit } from '../store/progress';
import { matchFunFact, matchPersona, matchScene } from '../data/funContent';
import { Choices } from './ui';

interface MC {
  question: string;
  options: string[];
  answer: number;
  explain: string;
}
interface Think {
  reveal: string;
}
interface Explain {
  prompt: string;
  structure: string[];
}

function parse<T>(raw?: string): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** 学习单元类型 → 统一视觉层级（①理解 ②为什么 ③观察 ④练习 ⑤案例 ⑥推理 ⑦迁移 ⑧复习） */
const STEP_BADGE: Record<string, { n: number; label: string }> = {
  introduction: { n: 1, label: '理解' },
  concept: { n: 1, label: '理解' },
  why: { n: 2, label: '为什么' },
  comparison: { n: 1, label: '对比' },
  observation: { n: 3, label: '观察' },
  check: { n: 4, label: '练习' },
  explanation: { n: 4, label: '练习' },
  reflection: { n: 4, label: '练习' },
  paradox: { n: 4, label: '练习' },
  case: { n: 5, label: '案例' },
  variation: { n: 5, label: '案例' },
  transfer: { n: 7, label: '迁移' },
  integration: { n: 8, label: '复习' },
  summary: { n: 8, label: '复习' },
  review: { n: 8, label: '复习' },
  classic: { n: 5, label: '经典' },
  formula: { n: 5, label: '方剂' },
};

/**
 * 学习单元播放器：每次只呈现当前学习任务。
 * 支持 read / think / observe / multi_choice / explain 五类交互，贯彻「先想再讲」。
 * 自由文本（explain）不做伪 AI 评分，只做结构完整度自检并如实记录。
 */
export default function LearningUnitPlayer({
  unit,
  onComplete,
}: {
  unit: LearningUnit;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<'interact' | 'feedback'>('interact');
  const [sel, setSel] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState<string[]>([]);
  const [fb, setFb] = useState<{ correct: boolean; explain: string } | null>(null);

  const node = v3NodeById(unit.nodeId);
  const topic = node?.topic ?? 'syndrome';
  const difficulty = node?.difficulty ?? 2;

  const sceneKind = unit.type === 'transfer' ? 'transfer' : unit.type === 'review' ? 'variation' : 'familiar';
  const mistakeKind = unit.type === 'paradox' ? 'single_symptom_jump' : 'concept_confusion';

  const mc = parse<MC>(unit.interactionData);
  const think = parse<Think>(unit.interactionData);
  const explain = parse<Explain>(unit.interactionData);

  // 趣味知识包：拟人人设 / 情景小剧场 / 冷知识彩蛋（与练习页一致，未命中不展示）
  const funTexts = [unit.title, unit.objective, unit.content, mc?.question];
  const persona = useMemo(() => matchPersona(funTexts), [unit.id]);
  const scene = useMemo(() => matchScene(funTexts), [unit.id]);
  const funFact = useMemo(() => matchFunFact(funTexts), [unit.id]);

  const badge = STEP_BADGE[unit.type] ?? { n: 1, label: '学习' };
  const stepNums = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧'];

  // 「🔍 教练带你看」分析模式：read / think / observe 三类交互统一俗成同一种教学模式
  const isCoachMode = unit.interactionType === 'read' || unit.interactionType === 'think' || unit.interactionType === 'observe';

  const finishNull = () => {
    completeLearningUnit({ unitId: unit.id, nodeId: unit.nodeId, topic, difficulty, correct: null });
    onComplete();
  };

  const submitMC = () => {
    if (sel === null || !mc) return;
    const correct = sel === mc.answer;
    // 先展示解析反馈；完成记录推迟到用户看完解析点「进入下一环」时，
    // 否则全局进度更新会立即重挂载播放器，反馈阶段被跳过。
    setFb({ correct, explain: mc.explain });
    setPhase('feedback');
  };

  const finishMC = () => {
    if (!fb || !mc) return;
    completeLearningUnit({ unitId: unit.id, nodeId: unit.nodeId, topic, difficulty, correct: fb.correct, mistakeKind, sceneKind });
    onComplete();
  };

  return (
    <div className="unit-player">
      <div className="unit-badge">
        <span className="unit-stage-badge">
          {stepNums[badge.n - 1]} {badge.label}
        </span>
        <span className="unit-node-name">{node?.title ?? ''}</span>
      </div>
      <h2 className="unit-title">{unit.title}</h2>
      <p className="unit-objective">🎯 {unit.objective}</p>
      <div className="unit-content">{unit.content}</div>

      {/* 🎭 拟人人设卡 */}
      {persona ? (
        <div className="persona-card">
          <div className="persona-head">
            <span className="persona-title">🎭 {persona.title}</span>
            <span className="persona-tag">人设档案</span>
          </div>
          <p className="persona-tagline">「{persona.tagline}」</p>
          <p className="persona-duty">{persona.duty}</p>
        </div>
      ) : null}

      {/* 🔍 教练带你看：read / think / observe 三类分析交互的统一模式 */}
      {isCoachMode ? (
        <div className="coach-banner">
          <span className="coach-title">🔍 教练带你看</span>
          <p className="coach-sub">先别急着判断。我们一起看看这个现象。</p>
        </div>
      ) : null}

      {/* 阅读型（你看到了什么） */}
      {unit.interactionType === 'read' ? (
        <button className="btn btn-primary" onClick={finishNull}>我理解了 →</button>
      ) : null}

      {/* 先想一想（为什么） */}
      {unit.interactionType === 'think' ? (
        !revealed ? (
          <div>
            <p className="unit-hint">先别急着看引导，自己在心里想 10 秒。</p>
            <button className="btn" onClick={() => setRevealed(true)}>我想好了，看看引导 →</button>
          </div>
        ) : (
          <div className="card reveal-card">
            <p className="unit-reveal">{think?.reveal ?? '这一步没有唯一答案，重点是你是否真的停下来想过了。'}</p>
            <button className="btn btn-primary" onClick={finishNull}>我理解了 →</button>
          </div>
        )
      ) : null}

      {/* 观察（开放观察，无标准答案） */}
      {unit.interactionType === 'observe' ? (
        !revealed ? (
          <div>
            <p className="unit-hint">按上面的提示，先只记录你看到的变化和它们之间的联系，别急着用"病"来命名。</p>
            <button className="btn" onClick={() => setRevealed(true)}>我观察好了，看看引导 →</button>
          </div>
        ) : (
          <div className="card reveal-card">
            <p className="unit-reveal">这一步没有标准答案。关键是：你在练习"只记录变化、不急着下结论"。牢记住这个停顿的感觉，后面做推理时会用到。</p>
            <button className="btn btn-primary" onClick={finishNull}>我记下了 →</button>
          </div>
        )
      ) : null}

      {/* 选择题 */}
      {unit.interactionType === 'multi_choice' && mc ? (
        phase === 'interact' ? (
          <div className="card quiz-card">
            {/* 🎬 情景小剧场：判断题包装成生活场景台词 */}
            {scene ? (
              <div className="drama-box">
                <div className="drama-head">🎬 情景小剧场 <span className="drama-title">{scene.title}</span></div>
                {scene.speaker ? <p className="drama-setup">「{scene.speaker}」认真地对你说——</p> : null}
              </div>
            ) : null}
            <h3 className="quiz-q">{mc.question}</h3>
            <Choices
              options={mc.options.map((o, i) => ({ id: String(i), text: o }))}
              selected={sel !== null ? [String(sel)] : []}
              onToggle={(id) => setSel(Number(id))}
              size="lg"
            />
            <button className="btn btn-primary" disabled={sel === null} onClick={submitMC}>提交我的判断</button>
          </div>
        ) : (
          <div className="card result-card rise">
            <div className={'result-head ' + (fb?.correct ? 'ok' : 'no')}>
              {fb?.correct ? '🎉 判断正确' : '💡 再想一次会更好'}
            </div>
            <div className="result-feedback"><p>{fb?.explain ?? ''}</p></div>
            <button className="btn btn-primary" onClick={finishMC}>我想好了，进入下一环 →</button>
          </div>
        )
      ) : null}

      {/* 自由解释（诚实策略：只做结构自检，不伪 AI 评分） */}
      {unit.interactionType === 'explain' ? (
        <div className="card quiz-card">
          <p className="quiz-q">{explain?.prompt ?? unit.content}</p>
          <textarea
            className="unit-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="用你自己的话写下来……"
            rows={4}
          />
          {(explain?.structure ?? []).length ? (
            <div className="unit-structure">
              <p className="unit-hint">写的时候，尽量覆盖这几个角度（可自检）：</p>
              {explain!.structure.map((s) => (
                <label key={s} className="unit-check">
                  <input
                    type="checkbox"
                    checked={checked.includes(s)}
                    onChange={() =>
                      setChecked((c) => (c.includes(s) ? c.filter((x) => x !== s) : [...c, s]))
                    }
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          ) : null}
          <button className="btn btn-primary" disabled={text.trim().length < 3} onClick={finishNull}>
            记录我的解释 →
          </button>
          <p className="safety-note">本系统为本地学习，不会给自由文本打分，也不会假装读懂了你的答案。</p>
        </div>
      ) : null}

      {/* 💡 涨知识冷知识 */}
      {funFact ? (
        <div className="funfact-box">
          <span className="funfact-icon">💡</span>
          <span><b>涨知识：</b>{funFact}</span>
        </div>
      ) : null}
    </div>
  );
}