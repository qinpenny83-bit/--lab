import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress, completeLearningUnit } from '../store/progress';
import { v3NodeById } from '../data/stages';
import type { MistakeKind, TransferSceneKind } from '../types/models';
import {
  GOLDEN_YINYANG_NODES,
  GOLDEN_STEP_NODE,
  GOLDEN_DISCOVERY,
  GOLDEN_DEFINITION,
  GOLDEN_WHY,
  GOLDEN_PARADOX,
  GOLDEN_CASE,
  GOLDEN_JUDGE,
  GOLDEN_TRANSFER,
} from '../data/golden/yinYangLevel';
import LevelMap from '../components/golden/LevelMap';
import GoldenLevelIntro from '../components/golden/GoldenLevelIntro';
import DiscoveryMoment from '../components/golden/DiscoveryMoment';
import CaseDetective from '../components/golden/CaseDetective';
import GoldenChoice from '../components/golden/GoldenChoice';
import MasterySummary from '../components/golden/MasterySummary';
import '../pages/golden-yinyang.css';

/** 把一次内容完成结算进真实引擎（Mistake / Mastery / Review），不再造平行学习引擎 */
function settleStep(
  stepId: string,
  correct: boolean | null,
  mistakeKind?: MistakeKind,
  sceneKind?: TransferSceneKind,
) {
  const nodeId = GOLDEN_STEP_NODE[stepId] ?? 'v3-s1-n7';
  completeLearningUnit({
    unitId: stepId,
    nodeId,
    topic: 'yinYang',
    difficulty: v3NodeById(nodeId)?.difficulty ?? 2,
    correct,
    mistakeKind,
    sceneKind,
  });
}

export default function GoldenYinYangPage() {
  const p = useProgress();
  const navigate = useNavigate();

  const doneSet = useMemo(
    () => new Set(p.completedUnits.filter((id) => id.startsWith('golden-yy-'))),
    [p.completedUnits],
  );

  // 0 = 关卡首屏（问题 + 地图）；1..8 = 八个探索节点
  const [step, setStep] = useState(0);
  const [mapOpen, setMapOpen] = useState(false);

  const currentId = step >= 1 ? GOLDEN_YINYANG_NODES[step - 1].id : GOLDEN_YINYANG_NODES[0].id;
  const hasStarted = doneSet.size > 0;
  const allDone = GOLDEN_YINYANG_NODES.every((n) => doneSet.has(n.id));

  const resumeStep = () => {
    const firstUndone = GOLDEN_YINYANG_NODES.find((n) => !doneSet.has(n.id));
    setStep(firstUndone ? firstUndone.order : GOLDEN_YINYANG_NODES.length);
  };

  const gotoNode = (id: string) => {
    const n = GOLDEN_YINYANG_NODES.find((x) => x.id === id);
    if (n) setStep(n.order);
    setMapOpen(false);
  };

  const advance = () => setStep((s) => Math.min(s + 1, GOLDEN_YINYANG_NODES.length));

  const contentHeader = (
    <div className="gl-content-head">
      <Link to="/journey" className="back-link">← 修炼之路</Link>
      <div className="gl-content-progress">
        <span>☯️ 阴阳探索</span>
        <span className="gl-content-count">
          {step >= 1 ? `第 ${step} / ${GOLDEN_YINYANG_NODES.length} 步` : ''}
        </span>
      </div>
      <button className="gl-map-toggle" onClick={() => setMapOpen((v) => !v)}>
        {mapOpen ? '收起路线' : '查看路线'}
      </button>
    </div>
  );

  return (
    <div className="page page-narrow gl-page">
      {contentHeader}

      {mapOpen || step === 0 ? (
        <div className={step === 0 ? 'gl-map-hero' : 'gl-map-collapsed'}>
          {step === 0 ? null : <p className="gl-map-collapsed-title">这条探索路线，你走到哪一步了</p>}
          <LevelMap
            nodes={GOLDEN_YINYANG_NODES}
            doneIds={doneSet}
            currentId={currentId}
            onJump={gotoNode}
          />
        </div>
      ) : null}

      {/* 关卡首屏：四个问题 + 地图 */}
      {step === 0 ? (
        <GoldenLevelIntro
          onStart={resumeStep}
          startedLabel={allDone ? '回顾本关' : hasStarted ? '继续探索' : '开始探索'}
        />
      ) : null}

      {/* ① 先发现 */}
      {step === 1 ? (
        <DiscoveryMoment
          data={GOLDEN_DISCOVERY}
          onDone={() => {
            settleStep('golden-yy-01', null);
            advance();
          }}
        />
      ) : null}

      {/* ② 阴阳到底是什么 */}
      {step === 2 ? (
        <div className="gl-read">
          <span className="tag">☯️ 阴阳到底是什么</span>
          <p className="gl-headline">{GOLDEN_DEFINITION.headline}</p>
          <div className="gl-example-row">
            {GOLDEN_DEFINITION.examples.map((e) => (
              <span key={e} className="gl-example-chip">{e}</span>
            ))}
          </div>
          <p className="gl-note">{GOLDEN_DEFINITION.examplesNote}</p>
          <p className="gl-settle">{GOLDEN_DEFINITION.settle}</p>
          <button className="btn btn-primary" onClick={() => { settleStep('golden-yy-02', null); advance(); }}>
            我懂了，继续 →
          </button>
        </div>
      ) : null}

      {/* ③ 为什么要比较 */}
      {step === 3 ? (
        <div className="gl-read">
          <span className="tag">⚖️ 为什么要比较</span>
          <p className="gl-body-text">{GOLDEN_WHY.content}</p>
          <button className="btn btn-primary" onClick={() => { settleStep('golden-yy-03', null); advance(); }}>
            继续 →
          </button>
        </div>
      ) : null}

      {/* ④ 反直觉 1：同一个东西也能有阴有阳 */}
      {step === 4 ? <ParadoxStep onContinue={() => advance()} /> : null}

      {/* ⑤ 你来观察：案例侦探 */}
      {step === 5 ? (
        <CaseDetective
          data={GOLDEN_CASE}
          onSettle={(r) => {
            if (r.isBest) {
              settleStep('golden-yy-05', true);
            } else {
              const kind: MistakeKind =
                r.keyClue !== GOLDEN_CASE.keyClueId ? 'overlook_clue' : 'single_symptom_jump';
              settleStep('golden-yy-05', false, kind);
            }
          }}
          onContinue={() => advance()}
        />
      ) : null}

      {/* ⑥ 你来判断：怕冷 = 阴？ */}
      {step === 6 ? (
        <div className="gl-golden-choice-wrap">
          <span className="tag">🧩 你来判断</span>
          <GoldenChoice
            question={GOLDEN_JUDGE.question}
            prompt={GOLDEN_JUDGE.prompt}
            options={GOLDEN_JUDGE.options}
            reference={GOLDEN_JUDGE.reference}
            takeaway={GOLDEN_JUDGE.takeaway}
            onSettle={(isRef) => settleStep('golden-yy-06', isRef, isRef ? undefined : 'single_symptom_jump')}
            onContinue={() => advance()}
          />
        </div>
      ) : null}

      {/* ⑦ 迁移：白天 / 夜晚 */}
      {step === 7 ? (
        <div className="gl-golden-choice-wrap">
          <span className="tag">🧭 换一个情况再试</span>
          <p className="gl-transfer-intro">{GOLDEN_TRANSFER.intro}</p>
          <GoldenChoice
            question={GOLDEN_TRANSFER.question}
            options={GOLDEN_TRANSFER.options}
            reference={GOLDEN_TRANSFER.reference}
            takeaway={GOLDEN_TRANSFER.takeaway}
            onSettle={(isRef) => settleStep('golden-yy-07', isRef, isRef ? undefined : 'transfer_fail', 'transfer')}
            onContinue={() => advance()}
          />
        </div>
      ) : null}

      {/* ⑧ 本关掌握 */}
      {step === 8 ? (
        <MasterySummary
          onDone={() => {
            settleStep('golden-yy-08', null);
            navigate('/journey');
          }}
          doneLabel={allDone ? '回到修炼之路 →' : '完成本关，回到修炼之路 →'}
        />
      ) : null}
    </div>
  );
}

/** 反直觉 1：先点一个，再揭示「相对性」 */
function ParadoxStep({ onContinue }: { onContinue: () => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const ref = GOLDEN_PARADOX.options.find((o) => 'isReference' in o && o.isReference);
  const isCorrect = picked === ref?.id;

  return (
    <div className="gl-paradox">
      <span className="tag">🔄 反直觉瞬间</span>
      <p className="gl-prompt">{GOLDEN_PARADOX.question}</p>
      <p className="gl-muted">{GOLDEN_PARADOX.prompt}</p>
      <div className="gl-option-list">
        {GOLDEN_PARADOX.options.map((o) => (
          <button
            key={o.id}
            className={'gl-option' + (picked === o.id ? ' on' : '')}
            onClick={() => {
              setPicked(o.id);
              settleStep('golden-yy-04', o.id === ref?.id, o.id === ref?.id ? undefined : 'concept_confusion');
            }}
            disabled={picked !== null}
          >
            {o.text}
          </button>
        ))}
      </div>
      {picked ? (
        <div className="card gl-reveal rise">
          <p className="gl-reveal-title">{GOLDEN_PARADOX.revealTitle}</p>
          <p className="gl-reveal-text">{GOLDEN_PARADOX.reveal}</p>
          <div className="reasoning-actions">
            <button className="btn btn-primary" onClick={onContinue}>
              {isCorrect ? '原来如此，继续 →' : '我明白了，继续 →'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}