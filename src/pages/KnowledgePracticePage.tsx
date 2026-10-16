import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { completeLearning, useProgress } from '../store/progress';
import { nodesByTopic } from '../data';
import { MASTERY_LABEL, TEMPERATURE_LABEL, TOPIC_META, TOPIC_ORDER } from '../types/models';
import type { KnowledgeNode, TopicId, TransferSceneKind } from '../types/models';
import { Choices, PageHead, Steps } from '../components/ui';
import { WhyPanel } from '../components/WhyPanel';
import { getNodeMastery, masteryChecklist, nextPendingScene } from '../engine/MasteryEngine';
import { getReviewState, temperatureOf } from '../engine/ReviewEngine';
import { now } from '../engine/clock';

const SCENE_LABEL: Record<TransferSceneKind, string> = {
  familiar: '熟悉场景',
  variation: '变式场景',
  transfer: '陌生场景',
};

export default function KnowledgePracticePage() {
  const { topic } = useParams<{ topic: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const p = useProgress();
  const tid = (TOPIC_ORDER as readonly string[]).includes(topic ?? '') ? (topic as TopicId) : TOPIC_ORDER[0];
  const meta = TOPIC_META[tid];
  const nodes = nodesByTopic(tid);

  const startNodeId = searchParams.get('node');
  const sceneId = searchParams.get('scene');

  const startIdx = useMemo(() => {
    if (!startNodeId) return 0;
    const i = nodes.findIndex((n) => n.id === startNodeId);
    return i >= 0 ? i : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startNodeId, tid]);

  const [idx, setIdx] = useState(startIdx);
  const [sel, setSel] = useState<number | null>(null);
  const [sceneSel, setSceneSel] = useState<string | null>(null);
  const [result, setResult] = useState<{ correct: boolean; feedback: string[]; xp: number } | null>(null);
  const [activeScene, setActiveScene] = useState<string | null>(sceneId);

  // 切换到指定节点 / 场景（来自首页任务链接）
  useEffect(() => {
    setIdx(startIdx);
    setSel(null);
    setSceneSel(null);
    setResult(null);
    setActiveScene(sceneId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIdx, sceneId]);

  const node: KnowledgeNode | undefined = nodes[idx];
  const nm = node ? getNodeMastery(p, node.id) : undefined;
  const rs = node ? getReviewState(p, node.id, node.difficulty ?? 1) : undefined;
  const temp = node && rs ? temperatureOf(p, rs, now()) : undefined;
  const scene = node?.transferScenes?.find((s) => s.id === activeScene) ?? null;
  const pendingScene = node ? nextPendingScene(node.transferScenes, nm!) : null;

  const canAnswer = node && !result;

  const submit = () => {
    if (sel === null || !node) return;
    const { result: r } = completeLearning({
      type: 'knowledge',
      refId: node.id,
      answers: { answer: sel },
    });
    setResult({ correct: r.correct, feedback: r.feedback, xp: r.xp });
  };

  const submitScene = () => {
    if (sceneSel === null || !node || !scene) return;
    const { result: r } = completeLearning({
      type: 'knowledge',
      refId: node.id,
      sceneId: scene.id,
      sceneKind: scene.kind,
      answers: { optionId: sceneSel },
    });
    setResult({ correct: r.correct, feedback: r.feedback, xp: r.xp });
  };

  const next = () => {
    if (activeScene) {
      // 场景题结束后回到节点清单
      setActiveScene(null);
      setSearchParams({}, { replace: true });
      setSceneSel(null);
      setResult(null);
      return;
    }
    if (idx + 1 < nodes.length) {
      setIdx(idx + 1);
      setSel(null);
      setResult(null);
      setSearchParams({}, { replace: true });
    } else {
      navigate('/map');
    }
  };

  const startScene = (kind: TransferSceneKind) => {
    if (!node || !node.transferScenes) return;
    const s = node.transferScenes.find((x) => x.kind === kind) ?? node.transferScenes.find((x) => x.kind !== 'familiar');
    if (!s) return;
    setActiveScene(s.id);
    setSceneSel(null);
    setResult(null);
  };

  const m = p.mastery[tid];

  return (
    <div className="page page-narrow">
      <div className="practice-head">
        <Link to="/map" className="back-link">
          ← 返回地图
        </Link>
        <span className="tag">{meta.emoji} {meta.name}主题修炼</span>
      </div>
      <PageHead title={meta.name} sub={meta.desc} />
      <div className="practice-meta">
        <span>
          挑战进度 {Math.min(idx + 1, nodes.length)} / {nodes.length}
        </span>
        <span>
          掌握度 {Math.round(((m?.correct ?? 0) / Math.max(1, m?.total ?? 1)) * 100)}%（{m?.total ?? 0} 次答题）
        </span>
      </div>
      <Steps steps={nodes.map((n) => n.title)} current={idx} />

      {/* 当前节点的掌握状态 + 记忆温度 */}
      {node && nm ? (
        <div className="mastery-strip">
          <span className={'ms-state ms-' + nm.state}>
            {MASTERY_LABEL[nm.state]}
          </span>
          {temp && rs ? (
            <span className={'ms-temp ms-temp-' + temp}>{TEMPERATURE_LABEL[temp]}</span>
          ) : null}
          <span className="ms-check">
            {masteryChecklist(nm).map((c) => (
              <span key={c.label} className={c.done ? 'ok' : 'no'}>
                {c.done ? '✓' : '○'} {c.label}
              </span>
            ))}
          </span>
        </div>
      ) : null}

      {canAnswer && activeScene && scene ? (
        <div className="card quiz-card">
          <span className="tag">{SCENE_LABEL[scene.kind]} · 迁移验证</span>
          <h3 className="quiz-q">{scene.question}</h3>
          <p className="quiz-scenario">{scene.scenario}</p>
          <Choices
            options={scene.options.map((o) => ({ id: o.id, text: o.text }))}
            selected={sceneSel !== null ? [sceneSel] : []}
            onToggle={(id) => setSceneSel(String(id))}
            locked={result !== null}
            size="lg"
          />
          <button className="btn btn-primary" disabled={sceneSel === null} onClick={submitScene}>
            提交判断
          </button>
        </div>
      ) : null}

      {canAnswer && !activeScene && node ? (
        <div className="card quiz-card">
          <h3 className="quiz-q">{node.quiz.question}</h3>
          <Choices
            options={node.quiz.options.map((o, i) => ({ id: String(i), text: o }))}
            selected={sel !== null ? [String(sel)] : []}
            onToggle={(id) => setSel(Number(id))}
            locked={result !== null}
            size="lg"
          />
          <button className="btn btn-primary" disabled={sel === null} onClick={submit}>
            提交判断
          </button>
        </div>
      ) : null}

      {canAnswer && !activeScene && node?.why ? (
        <WhyPanel why={node.why} />
      ) : null}

      {canAnswer && !activeScene && node && pendingScene && nm && nm.state !== 'mastered' ? (
        <div className="card transfer-entry rise">
          <p className="transfer-entry-text">
            🧩 你已经通过熟悉场景，做一次「{SCENE_LABEL[pendingScene.kind]}」验证你是不是真的理解了，而不是记住了答案。
          </p>
          <button className="btn btn-primary btn-sm" onClick={() => startScene(pendingScene.kind)}>
            开始 {SCENE_LABEL[pendingScene.kind]} →
          </button>
        </div>
      ) : null}

      {result && node ? (
        <div className="card result-card rise">
          <div className={'result-head ' + (result.correct ? 'ok' : 'no')}>
            {result.correct ? '🎉 判断正确' : '💡 再来一次会更好'}
            <span className="result-xp">+{result.xp} XP</span>
          </div>
          <div className="result-feedback">
            {result.feedback.map((f, i) => (
              <p key={i}>{f}</p>
            ))}
          </div>
          <button className="btn btn-primary" onClick={next}>
            {activeScene ? '返回节点清单 →' : idx + 1 < nodes.length ? '下一个挑战 →' : '完成本主题 →'}
          </button>
        </div>
      ) : null}

      {!node ? (
        <div className="card empty-card">
          <p>这个主题还没有知识挑战。</p>
          <Link to="/map" className="btn btn-primary">
            返回地图
          </Link>
        </div>
      ) : null}
    </div>
  );
}
