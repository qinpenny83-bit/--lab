import { useMemo, useRef, useState } from 'react';
import type { ReasoningChallenge, ReasoningMistake } from '../types/models';
import { REASONING_STEP_DEFS } from '../types/models';
import {
  createReasonerSession,
  recordCluesViewed,
  recordKeyClueSelection,
  recordCluePrioritization,
  recordHypotheses,
  recordSupportEvidence,
  recordCounterEvidence,
  recordRevision,
  recordSynthesis,
} from '../engine/ReasonerEngine';
import type { ReasoningOutcome } from '../engine/ReasonerEngine';
import { settleReasoningOutcome, getProgress } from '../store/progress';
import { coachDecision } from '../engine/coachDecision';
import { Steps } from './ui';

const STRENGTH: Record<string, string> = { key: '强', minor: '中', distractor: '弱' };
const BUCKET_LABEL: Record<'key' | 'minor' | 'distractor', string> = {
  key: '关键',
  minor: '次要',
  distractor: '干扰',
};

/**
 * 杏林推理八步（ReasoningPlayer）：第五境核心。
 * 一步一步让用户「先观察、再判断」，每一步记录真实行为。
 * 出错后进入「推理复盘五段式」（正式步骤，非弹窗）：
 *   ① 你注意到了什么 → ② 你忽略了什么 → ③ 为什么更重要 →
 *   ④ 反事实追问 → ⑤ 重新判断。
 */
export default function ReasoningPlayer({
  challenge,
  onDone,
}: {
  challenge: ReasoningChallenge;
  onDone: () => void;
}) {
  const sessionRef = useRef(createReasonerSession(challenge));
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  // 各步骤本地状态
  const [viewed, setViewed] = useState<string[]>([]);
  const [keySel, setKeySel] = useState<string[]>([]);
  const [bucket, setBucket] = useState<Record<string, 'key' | 'minor' | 'distractor'>>({});
  const [hyps, setHyps] = useState<string[]>([]);
  const [support, setSupport] = useState<string[]>([]);
  const [counterText, setCounterText] = useState('');
  const [revise, setRevise] = useState<'keep' | 'revise' | 'uncertain' | null>(null);
  const [mainClues, setMainClues] = useState<string[]>([]);
  const [mechanism, setMechanism] = useState<string | null>(null);
  const [synthText, setSynthText] = useState('');

  // 每步提交后的反馈与「已提交」标记
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string[] | null>(null);
  const [finished, setFinished] = useState<{ mistake: ReasoningMistake | null } | null>(null);
  const [coachReason, setCoachReason] = useState<string | null>(null);
  const [slowDownDone, setSlowDownDone] = useState(false);

  // 推理复盘五段式进度（0=① 到 4=⑤）
  const [reviewPhase, setReviewPhase] = useState(0);
  const [counterfactual, setCounterfactual] = useState<'hold' | 'break' | 'uncertain' | null>(null);
  const [counterfactualNote, setCounterfactualNote] = useState('');

  const keyIds = useMemo(() => challenge.clues.filter((c) => c.grade === 'key').map((c) => c.id), [challenge]);
  const clueById = useMemo(() => new Map(challenge.clues.map((c) => [c.id, c])), [challenge]);

  const stepOrder = REASONING_STEP_DEFS;

  const goNext = () => {
    setSubmitted(false);
    setFeedback(null);
    setStep((s) => s + 1);
  };

  /** 中间步骤的推进按钮文案：与「接下来做什么」对应，而非机械的「下一步」 */
  const nextActionLabel = (nextStep: number): string => {
    switch (nextStep) {
      case 1:
        return '找出关键线索 →';
      case 2:
        return '我来区分主次 →';
      case 3:
        return '建立我的假设 →';
      case 4:
        return '为假设找证据 →';
      case 5:
        return '主动找找反证 →';
      case 6:
        return '看看新线索 →';
      case 7:
        return '串起完整解释 →';
      default:
        return '继续 →';
    }
  };

  // ---------- Step 0 收集信息 ----------
  const submitCollect = () => {
    recordCluesViewed(sessionRef.current, viewed, challenge.clues.length);
    setFeedback([`你查看了 ${viewed.length}/${challenge.clues.length} 条线索，还有 ${challenge.clues.length - viewed.length} 条未看。先看全，再判断。`]);
    setSubmitted(true);
  };

  // ---------- Step 1 找关键线索 ----------
  const submitKey = () => {
    recordKeyClueSelection(sessionRef.current, keySel);
    const missed = keyIds.filter((id) => !keySel.includes(id));
    const fb: string[] = [];
    keyIds.forEach((id) => {
      const c = clueById.get(id);
      fb.push(`关键线索「${c?.text}」：${c?.why}`);
    });
    if (missed.length > 0) fb.push(`你漏掉了 ${missed.length} 条关键线索，回想一下它的分量。`);
    else fb.push('你把关键线索都抓住了，很好。');
    setFeedback(fb);
    setSubmitted(true);
  };

  // ---------- Step 2 区分主次 ----------
  const submitPrioritize = () => {
    const g: { key: string[]; minor: string[]; distractor: string[] } = { key: [], minor: [], distractor: [] };
    challenge.clues.forEach((c) => {
      const b = bucket[c.id] ?? 'distractor';
      g[b].push(c.id);
    });
    recordCluePrioritization(sessionRef.current, g);
    const fb = challenge.clues.map((c) => {
      const correct = c.grade;
      const chosen = bucket[c.id] ?? 'distractor';
      const ok = correct === chosen;
      return `${ok ? '✓' : '↺'}「${c.text}」应归为${BUCKET_LABEL[correct]}${ok ? '' : `，你放到了${BUCKET_LABEL[chosen]}`} — ${c.why}`;
    });
    setFeedback(fb);
    setSubmitted(true);
  };

  // ---------- Step 3 建立假设 ----------
  const submitHypothesis = () => {
    recordHypotheses(sessionRef.current, hyps.length);
    setFeedback([
      `你提出了 ${hyps.length} 种解释。${hyps.length <= 1 ? '允许先有一个假设，但可试着再想一个备选。' : '多个假设并行，是可靠推理的开始。'}`,
      '我们先不急着判断对错，继续找证据。',
    ]);
    setSubmitted(true);
  };

  // ---------- Step 4 寻找支持证据 ----------
  const submitSupport = () => {
    recordSupportEvidence(sessionRef.current, support);
    const fb = support.map((id) => {
      const c = clueById.get(id);
      return `「${c?.text}」支持强度：${STRENGTH[c?.grade ?? 'distractor']}${c?.grade === 'key' ? '（它是关键证据）' : c?.grade === 'minor' ? '（次要佐证）' : '（这条其实不足以支撑结论）'}`;
    });
    if (fb.length === 0) fb.push('你还没选支持证据——判断需要证据导向，而不是凭感觉。');
    setFeedback(fb);
    setSubmitted(true);
  };

  // ---------- Step 5 反证时刻 ----------
  const submitCounter = () => {
    const used = counterText.trim().length >= 3;
    recordCounterEvidence(sessionRef.current, used);
    setFeedback([challenge.counterEvidenceAnswer]);
    setSubmitted(true);
  };

  // ---------- Step 6 修正病机 ----------
  const submitRevise = () => {
    const revised = revise === 'revise';
    const quality = revised ? 0.8 : revise === 'uncertain' ? 0.5 : 0.3;
    recordRevision(sessionRef.current, revised, quality);
    const fb: string[] = [];
    if (revised) fb.push('你在新线索面前愿意调整解释——这是动态推理的关键能力。');
    else if (revise === 'uncertain') fb.push('你选择暂不确定，这是严谨的；新线索确实需要重新权衡。');
    else fb.push('你坚持原解释。请判断：新线索是否与你的解释冲突？');
    fb.push(challenge.counterEvidenceAnswer);
    setFeedback(fb);
    setSubmitted(true);
  };

  // ---------- Step 7 综合解释 ----------
  const submitSynthesize = () => {
    const hasKeyClue = mainClues.some((id) => keyIds.includes(id));
    const hasMechanism = mechanism !== null;
    const wroteEnough = synthText.replace(/\s/g, '').length >= 6;
    const quality = (hasKeyClue ? 0.4 : 0) + (hasMechanism ? 0.3 : 0) + (wroteEnough ? 0.3 : 0);
    recordSynthesis(sessionRef.current, quality);

    // 结算：识别错因 → 写入 Mistake/Mastery/Review → 返回复盘
    const finalHypothesisId = mechanism ?? (hyps.length ? hyps[hyps.length - 1] : null);
    const outcome: ReasoningOutcome = {
      finalHypothesisId,
      counterUsed: counterText.trim().length >= 3,
      revised: revise === 'revise',
      transferPassed: null,
    };
    const settled = settleReasoningOutcome({ session: sessionRef.current, challenge, outcome });
    // 教练「改变下一步学习」：结算后的真实进度里已含本次错因，据此给出可解释的下一步安排
    setCoachReason(coachDecision(getProgress()).reason);
    setSlowDownDone(false);
    setFinished({ mistake: settled.mistake });
    // 有错 → 进入五段式复盘（正式步骤，不是弹正确答案）；无错 → 直接结案
    if (settled.mistake) {
      setReviewPhase(0);
      setCounterfactual(null);
      setCounterfactualNote('');
    }
    setFeedback([belongs(hasKeyClue, hasMechanism, wroteEnough)]);
    setSubmitted(true);
  };

  const renderInteract = () => {
    // Step 0 收集信息
    if (step === 0) {
      return (
        <>
          <p className="reasoning-scenario">{challenge.background}</p>
          <div className="clue-board">
            {challenge.clues.map((c) => {
              const open = viewed.includes(c.id);
              return open ? (
                <div key={c.id} className="clue opened">
                  <span className="clue-num">✓</span>
                  <span>{c.text}</span>
                </div>
              ) : (
                <button key={c.id} className="clue locked" onClick={() => setViewed((v) => [...v, c.id])}>
                  查看线索 {challenge.clues.indexOf(c) + 1}
                </button>
              );
            })}
          </div>
          <div className="reasoning-actions">
            <button className="btn btn-primary" disabled={viewed.length === 0} onClick={submitCollect}>
              我看全了，找关键线索 →
            </button>
          </div>
        </>
      );
    }

    // Step 1 找关键线索（多选）
    if (step === 1) {
      return (
        <>
          <p className="reasoning-hint">哪些是你认为最重要的信息？可以多选。</p>
          <ClueMulti options={challenge.clues} selected={keySel} onToggle={(id) => toggleList(keySel, setKeySel, id)} />
          <div className="reasoning-actions">
            <button className="btn btn-primary" disabled={keySel.length === 0} onClick={submitKey}>标记好了关键线索</button>
          </div>
        </>
      );
    }

    // Step 2 区分主次（点击分组）
    if (step === 2) {
      return (
        <>
          <p className="reasoning-hint">把每条线索分成三类：关键 / 次要 / 干扰。</p>
          <div className="bucket-list">
            {challenge.clues.map((c) => (
              <div key={c.id} className="bucket-row">
                <span className="bucket-text">{c.text}</span>
                <div className="bucket-btns">
                  {(['key', 'minor', 'distractor'] as const).map((b) => (
                    <button
                      key={b}
                      className={'bucket-btn' + (bucket[c.id] === b ? ' on' : '')}
                      onClick={() => setBucket((prev) => ({ ...prev, [c.id]: b }))}
                    >
                      {BUCKET_LABEL[b]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="reasoning-actions">
            <button className="btn btn-primary" onClick={submitPrioritize}>分好主次了</button>
          </div>
        </>
      );
    }

    // Step 3 建立假设（多选，不直接要正确答案）
    if (step === 3) {
      return (
        <>
          <p className="reasoning-hint">目前你有哪几种解释？可以选一个，也可以多选。</p>
          <div className="cue-list">
            {challenge.hypotheses.map((h) => (
              <button
                key={h.id}
                className={'cue' + (hyps.includes(h.id) ? ' on' : '')}
                onClick={() => toggleList(hyps, setHyps, h.id)}
              >
                {h.text}
              </button>
            ))}
          </div>
          <div className="reasoning-actions">
            <button className="btn btn-primary" disabled={hyps.length === 0} onClick={submitHypothesis}>记下我的假设</button>
          </div>
        </>
      );
    }

    // Step 4 寻找支持证据（多选）
    if (step === 4) {
      return (
        <>
          <p className="reasoning-hint">哪些线索支持你现在的假设？</p>
          <ClueMulti options={challenge.clues} selected={support} onToggle={(id) => toggleList(support, setSupport, id)} />
          <div className="reasoning-actions">
            <button className="btn btn-primary" onClick={submitSupport}>选好我的证据</button>
          </div>
        </>
      );
    }

    // Step 5 反证时刻（自由文本）
    if (step === 5) {
      return (
        <div className="counter-moment">
          <span className="tag">⚡ 反证时刻</span>
          <p className="reasoning-hint">{challenge.counterEvidenceQuestion}</p>
          <textarea
            className="unit-textarea"
            value={counterText}
            onChange={(e) => setCounterText(e.target.value)}
            placeholder="如果它不成立，最可能是哪条信息暴露了问题？"
            rows={3}
          />
          <div className="reasoning-actions">
            <button className="btn btn-primary" disabled={counterText.trim().length < 3} onClick={submitCounter}>
              想好我的反证
            </button>
          </div>
        </div>
      );
    }

    // Step 6 修正病机（新线索出现）
    if (step === 6) {
      return (
        <>
          <div className="card new-clue-card">
            <span className="tag">新信息</span>
            <p className="reasoning-hint">{challenge.counterEvidenceQuestion}</p>
          </div>
          <p className="reasoning-hint">现在，你还坚持原来的解释吗？</p>
          <div className="cue-list">
            {([
              ['keep', '继续坚持'],
              ['revise', '修改解释'],
              ['uncertain', '暂不确定'],
            ] as const).map(([v, label]) => (
              <button key={v} className={'cue' + (revise === v ? ' on' : '')} onClick={() => setRevise(v)}>
                {label}
              </button>
            ))}
          </div>
          <div className="reasoning-actions">
            <button className="btn btn-primary" disabled={revise === null} onClick={submitRevise}>确认我是否修正</button>
          </div>
        </>
      );
    }

    // Step 7 综合解释（结构化 + 自由文本，诚实策略）
    return (
      <>
        <p className="reasoning-hint">现在，把你对整件事的解释串起来。</p>
        <div className="card quiz-card">
          <p className="quiz-q">① 你抓住的主要线索有哪些？（可多选）</p>
          <ClueMulti options={challenge.clues} selected={mainClues} onToggle={(id) => toggleList(mainClues, setMainClues, id)} />
        </div>
        <div className="card quiz-card">
          <p className="quiz-q">② 你认为是哪个核心机制在起作用？</p>
          <div className="cue-list">
            {challenge.hypotheses.map((h) => (
              <button key={h.id} className={'cue' + (mechanism === h.id ? ' on' : '')} onClick={() => setMechanism(h.id)}>
                {h.text}
              </button>
            ))}
          </div>
        </div>
        <div className="card quiz-card">
          <p className="quiz-q">③ 用你自己的话把「线索 → 机制 → 表现」串成一段。</p>
          <textarea className="unit-textarea" value={synthText} onChange={(e) => setSynthText(e.target.value)} rows={3} placeholder="从……到……，所以表现为……" />
        </div>
        <div className="reasoning-actions">
          <button className="btn btn-primary" onClick={submitSynthesize}>串起我的解释</button>
        </div>
      </>
    );
  };

  // 复位整场推理（「重新判断」用），重建新会话、清空所有 UI 状态
  const resetAll = () => {
    sessionRef.current = createReasonerSession(challenge);
    setStep(0);
    setViewed([]);
    setKeySel([]);
    setBucket({});
    setHyps([]);
    setSupport([]);
    setCounterText('');
    setRevise(null);
    setMainClues([]);
    setMechanism(null);
    setSynthText('');
    setSubmitted(false);
    setFeedback(null);
    setFinished(null);
    setCoachReason(null);
    setSlowDownDone(false);
    setReviewPhase(0);
    setCounterfactual(null);
    setCounterfactualNote('');
  };

  /** 复盘素材：全部来自本轮真实操作与案例已有数据，不做任何虚构补充 */
  const reviewMaterial = useMemo(() => {
    const m = finished?.mistake;
    if (!m) return null;
    const noticedClues = keySel.map((id) => clueById.get(id)?.text).filter((x): x is string => !!x);
    const noticedMechanism = mechanism
      ? challenge.hypotheses.find((h) => h.id === mechanism)?.text ?? ''
      : '';

    // ② 忽略了什么：优先取「真正的关键线索里没被标出的」，其次按错因回落到案例已有数据
    const missedKeyIds = keyIds.filter((id) => !keySel.includes(id));
    let ignoredLabel: string;
    let ignoredWhy: string;
    if (missedKeyIds.length > 0) {
      const c = clueById.get(missedKeyIds[0]);
      ignoredLabel = c?.text ?? '那条关键线索';
      ignoredWhy = c?.why ?? '';
    } else if (m.mistakeKind === 'concept_confusion') {
      const best = challenge.hypotheses.find((h) => h.id === challenge.bestHypothesisId);
      ignoredLabel = best ? `正确的病机方向：${best.text}` : challenge.teaching.reasoning[0] ?? '';
      ignoredWhy = challenge.teaching.theory;
    } else if (m.mistakeKind === 'ignore_counterevidence' || m.mistakeKind === 'failed_revision') {
      ignoredLabel = challenge.counterEvidenceAnswer;
      ignoredWhy = challenge.counterEvidenceQuestion;
    } else {
      const best = challenge.hypotheses.find((h) => h.id === challenge.bestHypothesisId);
      ignoredLabel = best?.text ?? challenge.teaching.reasoning[0] ?? '';
      ignoredWhy = challenge.teaching.theory;
    }

    return { m, noticedClues, noticedMechanism, ignoredLabel, ignoredWhy };
  }, [finished, keySel, mechanism, keyIds, clueById, challenge]);

  const renderReview = () => {
    const rm = reviewMaterial;
    if (!rm) return null;
    const isRush = rm.m.mistakeKind === 'premature_judgment' || rm.m.mistakeKind === 'single_symptom_jump';

    // ① 你注意到了什么
    if (reviewPhase === 0) {
      return (
        <div className="card review-card">
          <div className="review-open">这一次，我们回头看看你的判断是怎么形成的。</div>
          <h3 className="review-step">① 你刚才注意到了什么？</h3>
          <div className="review-list">
            {rm.noticedClues.length > 0 ? (
              rm.noticedClues.map((t, i) => <div key={i} className="review-chip">✓ {t}</div>)
            ) : (
              <p className="muted">你没有标出关键线索——注意力可能落在了干扰项上。</p>
            )}
          </div>
          {rm.noticedMechanism ? (
            <p className="review-note">你把它解释为：<strong>{rm.noticedMechanism}</strong></p>
          ) : null}
          <div className="reasoning-actions">
            <button className="btn btn-primary" onClick={() => setReviewPhase(1)}>看看我漏掉了什么 →</button>
          </div>
        </div>
      );
    }

    // ② 你忽略了什么
    if (reviewPhase === 1) {
      return (
        <div className="card review-card">
          <h3 className="review-step">② 但你忽略了什么？</h3>
          <p className="review-compare">
            {rm.noticedClues.length > 0
              ? <>你注意到了 <strong>{rm.noticedClues.join('、')}</strong>，<br />但没有关注 <strong className="review-hl">「{rm.ignoredLabel}」</strong>。</>
              : <>你几乎没有抓住关键线索，尤其没有关注 <strong className="review-hl">「{rm.ignoredLabel}」</strong>。</>}
          </p>
          <div className="reasoning-actions">
            <button className="btn btn-primary" onClick={() => setReviewPhase(2)}>为什么它更重要？→</button>
          </div>
        </div>
      );
    }

    // ③ 为什么更重要
    if (reviewPhase === 2) {
      return (
        <div className="card review-card">
          <h3 className="review-step">③ 为什么「{rm.ignoredLabel}」更重要？</h3>
          <p className="review-explain">{rm.ignoredWhy}</p>
          <div className="reasoning-actions">
            <button className="btn btn-primary" onClick={() => setReviewPhase(3)}>那我原来的判断呢？→</button>
          </div>
        </div>
      );
    }

    // ④ 反事实追问
    if (reviewPhase === 3) {
      return (
        <div className="card review-card">
          <h3 className="review-step">④ 反事实追问</h3>
          <p className="review-question">如果没有「{rm.ignoredLabel}」，你原来的判断还成立吗？</p>
          <div className="cue-list">
            {([
              ['hold', '成立'],
              ['break', '不成立'],
              ['uncertain', '不确定'],
            ] as const).map(([v, label]) => (
              <button key={v} className={'cue' + (counterfactual === v ? ' on' : '')} onClick={() => setCounterfactual(v)}>
                {label}
              </button>
            ))}
          </div>
          <textarea
            className="unit-textarea"
            value={counterfactualNote}
            onChange={(e) => setCounterfactualNote(e.target.value)}
            placeholder="（可选）简单说说你的理由……"
            rows={2}
          />
          <div className="reasoning-actions">
            <button className="btn btn-primary" disabled={counterfactual === null} onClick={() => setReviewPhase(4)}>
              我想清楚了 →
            </button>
          </div>
        </div>
      );
    }

    // ⑤ 重新判断
    return (
      <div className="card review-card">
        <h3 className="review-step">⑤ 现在，再做一次判断。</h3>
        <p className="review-explain">
          你选择了「{counterfactual === 'hold' ? '成立' : counterfactual === 'break' ? '不成立' : '不确定'}」。
          无论哪一种，关键是：你已经知道「{rm.ignoredLabel}」会改变你的判断方向。
        </p>
        {coachReason ? (
          <p className="muted">🧭 教练根据你刚才的错因，调整了下一步：{coachReason}</p>
        ) : null}
        {isRush ? (
          <div className="card slow-down-card">
            <span className="tag">🐢 慢下来微训练</span>
            <p>你刚才走快了——还没把信息看清，或单凭一条线索就下了结论。</p>
            <p className="muted">教练暂停了更难的迁移场景，先做一次停顿：</p>
            <p className="unit-hint">「我是先看全了信息，还是先下了结论？」</p>
            {!slowDownDone ? (
              <button className="btn btn-primary" onClick={() => setSlowDownDone(true)}>
                我想清楚了，这次先看全再判断 →
              </button>
            ) : (
              <p className="muted">好，记住这个停顿。下面进入迁移场景，检验你是否真的学会了。</p>
            )}
          </div>
        ) : null}
        <div className="reasoning-actions">
          <button className="btn" onClick={resetAll}>重新判断一次</button>
          {isRush && !slowDownDone ? null : (
            <button className="btn btn-primary" onClick={onDone}>换一个情境，再试一次 →</button>
          )}
        </div>
      </div>
    );
  };

  const renderFeedback = () => {
    // 最后一步（综合解释）完成：有错 → 五段式复盘；无错 → 结案
    if (step === 7 && finished) {
      if (finished.mistake) {
        return renderReview();
      }
      return (
        <div className="card result-card rise">
          <div className="result-head ok">🎉 推理链完整</div>
          <div className="result-feedback">
            <p>你完成了八步推理：先看全线索，再定主次，提出假设并用证据与反证检验，最后形成综合解释。</p>
          </div>
          <div className="reasoning-actions">
            <button className="btn btn-primary" onClick={onDone}>换一个情境，再试一次 →</button>
          </div>
        </div>
      );
    }

    // 中间步骤：给过程反馈 + 语义化推进
    return (
      <div className="card result-card rise">
        <div className="result-head ok">教学反馈</div>
        <div className="result-feedback">
          {(feedback ?? []).map((f, i) => (
            <p key={i}>{f}</p>
          ))}
        </div>
        <div className="reasoning-actions">
          <button className="btn btn-primary" onClick={goNext}>{nextActionLabel(step + 1)}</button>
        </div>
      </div>
    );
  };

  // 进入推理前的心理转场：让用户明确「现在轮到我了」，而不是「又做一道题」
  if (!started) {
    return (
      <div className="reasoning-player">
        <div className="reasoning-transition">
          <span className="tag">🧠 现在，轮到你来判断</span>
          <p className="reasoning-transition-line">前面你已经学会了观察。</p>
          <p className="reasoning-transition-line">现在试着自己解释。</p>
          <p className="reasoning-transition-em">不急着下结论，先找线索。</p>
          <button className="btn btn-primary" onClick={() => setStarted(true)}>
            好，开始找线索 →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reasoning-player">
      <div className="reasoning-head">
        <span className="tag">🔎 杏林推理 · {challenge.title}</span>
        <p className="reasoning-sub">别急着下结论，一步一步走。</p>
      </div>
      <Steps steps={stepOrder.map((s) => s.label)} current={step} />

      <details className="trajectory">
        <summary>我的推理轨迹</summary>
        <div className="trajectory-body">
          <p>我关注了：{(viewed.length ? challenge.clues.filter((c) => viewed.includes(c.id)).map((c) => c.text) : ['（还没看）']).join(' / ')}</p>
          <p>关键线索：{keySel.length ? keySel.map((id) => clueById.get(id)?.text).join(' / ') : '（未标）'}</p>
          <p>我的假设：{hyps.length ? challenge.hypotheses.filter((h) => hyps.includes(h.id)).map((h) => h.text).join(' / ') : '（未提出）'}</p>
          <p>支持证据：{support.length ? support.map((id) => clueById.get(id)?.text).join(' / ') : '（未选）'}</p>
          <p>反证：{counterText.trim() ? counterText : '（未思考）'}</p>
          <p>新线索后：{revise === 'revise' ? '我修改了判断' : revise === 'keep' ? '继续坚持' : '暂不确定'}</p>
          <p>核心机制：{mechanism ? challenge.hypotheses.find((h) => h.id === mechanism)?.text ?? '（未选）' : '（未选）'}</p>
        </div>
      </details>

      {!submitted ? renderInteract() : renderFeedback()}
    </div>
  );
}

function toggleList(cur: string[], set: (v: string[]) => void, id: string) {
  set(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
}

function belongs(hasKey: boolean, hasMech: boolean, wrote: boolean): string {
  const parts = [
    `是否提到关键线索：${hasKey ? '✓' : '✗'}`,
    `是否提出核心机制：${hasMech ? '✓' : '✗'}`,
    `是否用自己的话串起关系：${wrote ? '✓' : '✗'}`,
  ];
  return `你的解释已记录。结构完整度自检：${parts.join(' / ')}`;
}

function ClueMulti({
  options,
  selected,
  onToggle,
}: {
  options: { id: string; text: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="cue-list">
      {options.map((o) => (
        <button key={o.id} className={'cue' + (selected.includes(o.id) ? ' on' : '')} onClick={() => onToggle(o.id)}>
          {o.text}
        </button>
      ))}
    </div>
  );
}