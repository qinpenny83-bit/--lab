import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { completeV33Practice, useProgress } from '../store/progress';
import { v33NodeByNodeId, v33NodesBySubject, v33SubjectByCode } from '../data/v33';
import { getNodeMastery, masteryChecklist } from '../engine/MasteryEngine';
import { DISCRIMINATE_OPTIONS, v33PracticeBuild } from '../engine/v33Practice';
import { Choices, SafetyNote } from '../components/ui';
import BodyMap, { matchBodyParts } from '../components/BodyMap';
import { matchPersona, matchScene, matchFunFact } from '../data/funContent';
import { LEVEL_LABEL, MASTERY_LABEL } from '../types/models';

const STATUS_META: Record<string, { label: string; cls: string; tip: string }> = {
  candidate: { label: '候选', cls: 'ok', tip: '' },
  conditional: { label: '待审', cls: 'warn', tip: '该节点待人工审核，内容可参考但请谨慎对待。' },
  quarantine: { label: '隔离', cls: 'danger', tip: '该节点处于隔离状态（安全红线），仅可阅读不可答题。' },
};

// 反馈语库：答对 / 答错差异化鼓励，避免千篇一律
const PRAISE_POOL = [
  '🎉 漂亮！这一击正中要害',
  '🌟 判断精准，思路很稳',
  '👏 不错！你已经抓住要点',
  '✨ 妙啊，这个坑你绕开了',
  '🏆 拿下这一关，继续冲',
  '🧠 推理在线，满分判断',
];

const SOOTHE_POOL = [
  '🌱 别急，这正是新手该踩的坑',
  '💪 记住这个误区，下次就赢了',
  '🍵 错一次印象更深，稳住',
  '🔄 掉进坑里才有记忆点，再看一遍',
  '🛤️ 走岔路了，回头看看知识点就顺了',
];

// 推理对招 · 师父点评语库（随机差异化，避免千篇一律）
const REASON_PRAISE = [
  '🧙 师父点头：思路对上了，这一招你学会了',
  '⚔️ 一招拆解干净，推理在线',
  '🎯 判断和答案咬合，稳',
  '🌟 这就是辨证的感觉——不错',
  '🍃 线索、假设、结论一气呵成',
];
const REASON_SOOTHE = [
  '🧘 师父缓声道：错点也是长进，记住它',
  '📿 偏了一寸，方向没错——再看一眼答案',
  '🪷 别急，推理是练出来的，下一招再来',
  '🍂 有了偏差才记得深，回看一遍就顺了',
  '🌫️ 线索还没抓全，再拆一遍题',
];

// 迁移实战 · 出师点评语库
const TRANSFER_PRAISE = [
  '🚀 场景换了你也认得，这知识真的长在你身上了',
  '🌏 迁移成功——同一个道理，换个战场秒懂',
  '⚡ 出师感拉满，换个场景照样拿下',
  '🏆 能独立分析，说明真的懂了',
  '🌊 知识搬了家，还认得它，厉害',
];
const TRANSFER_SOOTHE = [
  '🐢 慢即是快，回炉一遍，下次场景就不慌了',
  '🛤️ 换场景露怯很正常，回头再读，加深印记',
  '🌱 再读一遍不丢人，读进去了才是自己的',
  '📚 知识搬家需要练习，下次一定能搬动',
  '🪨 地基还松，回学习区夯实一下',
];

const STREAK_KEY = 'v33_streak';
const STREAK_NODE_KEY = 'v33_streak_node';
const STREAK_SIDE_KEY = 'v33_streak_side';

// 必背记背小妙招（按学科类型给记忆方法）
const MEM_TRICKS: Record<string, { title: string; tip: string }> = {
  theory: { title: '画图串联法', tip: '把抽象概念画成小图/箭头串起来：比如「阴阳」画个太极，五行画个生克环。眼睛看过一遍，比嘴巴念十遍记得牢。' },
  diagnostic: { title: '口诀定位法', tip: '望闻问切各抓一个关键词编成一句顺口溜，例如「望神气、闻声息、问寒热、切脉象」。记住一句口诀，四诊就不会漏。' },
  herb: { title: '性味归经挂钩', tip: '每味药记住「一性一味一归经」，像给药材贴标签：麻黄-温-肺膀胱。标签贴齐了，功效自然顺着推出来。' },
  formula: { title: '方歌顺口溜', tip: '把方子编成歌诀或小故事：君臣佐使当成一个团队，君药是主角。唱着背，比干背药名快得多。' },
  meridian: { title: '循行画线法', tip: '用手指在自己身上比划经络走向：手三阴从胸走手、手三阳从手走头。身体就是最好的记忆地图。' },
  acupoint: { title: '骨度分寸法', tip: '腧穴记定位口诀：「一寸、三寸、几寸」，配合身上找标志（关节、骨缝、肚脐）。摸得到，就忘不掉。' },
  classic: { title: '朗读跟读法', tip: '经典条文读出声来，先读三遍再合上书默背一遍。古文有节奏，读出节奏感就自然记住了。' },
  clinical: { title: '症状→证型串联', tip: '一条链记忆：症状组→证型→治法→方药。看到症状先想证型，想到证型再推治法，链子一拉全出来。' },
  case: { title: '四步拆解法', tip: '医案拆成四步背：症→证→治→方。先背框架再填细节，像搭积木一样，一次加一块。' },
  ethic: { title: '场景代入法', tip: '把条文放进一个具体场景里：假设你面对一位患者，这条规则该怎么用？有画面，就有记忆。' },
  evidence: { title: '对比记忆法', tip: '把相似概念放在一起对比背：比如「偏倚vs误差」「相关vs因果」。比着比着，两个都记住了。' },
};

export default function V33PracticePage() {
  const { nodeId } = useParams<{ nodeId: string }>();
  const p = useProgress();
  const navigate = useNavigate();

  const node = nodeId ? v33NodeByNodeId(nodeId) : undefined;
  const subjectNodes = useMemo(
    // 排除隔离节点，与修炼之路/通关统计口径一致（避免 185/183 对不上）
    () => (node ? v33NodesBySubject(node.subject).filter((n) => n.status !== 'quarantine') : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodeId, node?.subject]
  );
  const idx = node ? subjectNodes.findIndex((n) => n.nodeId === node.nodeId) : -1;
  const subject = node ? v33SubjectByCode(node.subject) : undefined;
  const build = node ? v33PracticeBuild(node) : null;

  const nm = node ? getNodeMastery(p, node.nodeId) : undefined;

  // 辨析题状态
  const [quizSel, setQuizSel] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<{ correct: boolean } | null>(null);
  // 推理自评状态
  const [reasonInput, setReasonInput] = useState('');
  const [reasonSubmitted, setReasonSubmitted] = useState(false);
  const [reasonRecap, setReasonRecap] = useState(false);
  const [reasonGrade, setReasonGrade] = useState<boolean | null>(null);
  const [reasonFeed, setReasonFeed] = useState('');
  // 迁移自评状态
  const [transferAction, setTransferAction] = useState<'recap' | 'direct' | null>(null);
  const [transferGrade, setTransferGrade] = useState<boolean | null>(null);
  const [transferFeed, setTransferFeed] = useState('');
  const [learned, setLearned] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showTrick, setShowTrick] = useState(false);

  // 连击：跨节点连续答对辨析题的次数
  const [streak, setStreak] = useState(() => Number(localStorage.getItem(STREAK_KEY) || 0));
  const [streakNode, setStreakNode] = useState(() => localStorage.getItem(STREAK_NODE_KEY) || '');
  const [streakSide, setStreakSide] = useState(() => localStorage.getItem(STREAK_SIDE_KEY) || '');

  // 节点相关的器官（用于位置图高亮）
  const organHits = useMemo(
    () => (node ? matchBodyParts([node.topic, node.intent, (node.riskTags ?? []).join(' ')]) : []),
    [node]
  );

  // 趣味知识包：拟人人设 / 情景小剧场 / 冷知识彩蛋（按节点主题匹配）
  const persona = useMemo(
    () => (node ? matchPersona([node.topic, node.intent, (node.riskTags ?? []).join(' '), build?.stdJudgment]) : null),
    [node, build]
  );
  const scene = useMemo(
    () => (node ? matchScene([node.topic, node.intent, (node.riskTags ?? []).join(' '), build?.stdJudgment, build?.quiz.statement]) : null),
    [node, build]
  );
  const funFact = useMemo(
    () => (node ? matchFunFact([node.topic, node.intent, (node.riskTags ?? []).join(' '), build?.stdJudgment]) : null),
    [node, build]
  );

  if (!node || !build || !nm) {
    return (
      <div className="page page-narrow">
        <div className="practice-head">
          <Link to="/journey" className="back-link">← 返回修炼之路</Link>
        </div>
        <div className="card empty-card">
          <p>未找到该知识节点。</p>
          <Link to="/journey" className="btn btn-primary">返回修炼之路</Link>
        </div>
      </div>
    );
  }

  const subjectCode = node.subject;
  const isQuarantine = node.status === 'quarantine';
  const isConditional = node.status === 'conditional';
  const statusMeta = STATUS_META[node.status] ?? STATUS_META.candidate;
  const answerIndex = build.quiz.isTrap ? 1 : 0;

  const applyStreak = (delta: number) => {
    setStreak((cur) => {
      const next = Math.max(0, cur + delta);
      localStorage.setItem(STREAK_KEY, String(next));
      return next;
    });
  };

  const submitQuiz = () => {
    if (quizSel === null) return;
    const correct = Number(quizSel) === answerIndex;
    setQuizResult({ correct });
    // 连击只按「节点」计一次：同一节点重复提交不叠加
    if (streakNode !== node.nodeId) {
      if (correct) {
        applyStreak(1);
        setStreakNode(node.nodeId);
        localStorage.setItem(STREAK_NODE_KEY, node.nodeId);
      } else {
        applyStreak(-streak);
        setStreakNode('');
        localStorage.setItem(STREAK_NODE_KEY, '');
      }
      setStreakSide('');
      localStorage.setItem(STREAK_SIDE_KEY, '');
    }
    completeV33Practice({ nodeId: node.nodeId, topicKey: subjectCode, difficulty: node.difficulty, sceneKind: 'familiar', correct });
  };

  const gradeReason = (consistent: boolean) => {
    setReasonGrade(consistent);
    const pool = consistent ? REASON_PRAISE : REASON_SOOTHE;
    setReasonFeed(pool[Math.floor(Math.random() * pool.length)]);
    completeV33Practice({ nodeId: node.nodeId, topicKey: subjectCode, difficulty: node.difficulty, sceneKind: 'variation', correct: consistent });
  };

  const gradeTransfer = (able: boolean) => {
    setTransferGrade(able);
    const pool = able ? TRANSFER_PRAISE : TRANSFER_SOOTHE;
    setTransferFeed(pool[Math.floor(Math.random() * pool.length)]);
    completeV33Practice({ nodeId: node.nodeId, topicKey: subjectCode, difficulty: node.difficulty, sceneKind: 'transfer', correct: able });
  };

  const markLearned = () => {
    setLearned(true);
    completeV33Practice({ nodeId: node.nodeId, topicKey: subjectCode, difficulty: node.difficulty, correct: null });
  };

  const goto = (nid: string) => {
    setQuizSel(null); setQuizResult(null);
    setReasonInput(''); setReasonSubmitted(false); setReasonRecap(false); setReasonGrade(null); setReasonFeed('');
    setTransferAction(null); setTransferGrade(null); setTransferFeed(''); setLearned(false);
    setShowSources(false);
    navigate(`/practice/${nid}`);
  };

  const checklist = masteryChecklist(nm);
  const subjectMastered = subjectNodes.filter((n) => p.nodeMastery[n.nodeId]?.state === 'mastered').length;
  const praise = PRAISE_POOL[Math.floor(Math.random() * PRAISE_POOL.length)];
  const soothe = SOOTHE_POOL[Math.floor(Math.random() * SOOTHE_POOL.length)];
  const stageNo = subject?.stage ? subject.stage.replace('stage', '') : '';

  return (
    <div className="page page-narrow v33p">
      <style>{`
        .v33p .learn-card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; box-shadow: var(--shadow); }
        .v33p .learn-text { font-size: 14px; line-height: 1.85; color: var(--ink); white-space: pre-wrap; }
        .v33p .fact-list { margin-top: 10px; display: grid; gap: 6px; }
        .v33p .fact-item { font-size: 12.5px; color: var(--ink-2); line-height: 1.6; }
        .v33p .fact-src { color: var(--green-deep); font-weight: 600; }
        .v33p .canon-box { margin-top: 10px; background: #faf9f6; border: 1px dashed var(--line); border-radius: 10px; padding: 10px 12px; }
        .v33p .canon-text { font-family: var(--font-serif); font-size: 13.5px; color: var(--ink); line-height: 1.8; }
        .v33p .canon-meta { font-size: 11.5px; color: var(--ink-3); margin-top: 4px; }
        .v33p .sec-title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; font-family: var(--font-serif); margin-bottom: 10px; }
        .v33p .sec-title .sec-tag { font-size: 11px; font-family: var(--font-sans); font-weight: 600; padding: 2px 8px; border-radius: 99px; }
        .v33p .sec-tag.fam { background: var(--green-soft); color: var(--green-deep); }
        .v33p .sec-tag.var { background: var(--gold-soft); color: #8a651c; }
        .v33p .sec-tag.tra { background: #e8eefc; color: #3a5bbf; }
        .v33p .trap-statement { font-size: 14px; line-height: 1.8; background: #faf9f6; border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px; margin-bottom: 12px; }
        .v33p .reveal-box { background: #faf9f6; border: 1px dashed var(--line); border-radius: 10px; padding: 12px 14px; margin-top: 10px; }
        .v33p .reveal-box b { color: var(--green-deep); }
        .v33p .self-grade { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
        .v33p .grade-ok { background: var(--green-soft); color: var(--green-deep); border: 1px solid var(--green); }
        .v33p .grade-no { background: #fde8e8; color: #b3382c; border: 1px solid #eec; }
        .v33p .nav-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 14px; }
        .v33p .node-list { margin-top: 10px; display: grid; gap: 4px; max-height: 260px; overflow-y: auto; }
        .v33p .node-list a { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; font-size: 12.5px; color: var(--ink); text-decoration: none; }
        .v33p .node-list a:hover { background: var(--bg-soft); }
        .v33p .node-list a.cur { background: var(--green-soft); font-weight: 600; }
        .v33p .safety-line { font-size: 12px; color: #b3382c; margin-top: 8px; }
        .v33p .risk-pill { display: inline-block; font-size: 11px; padding: 1px 8px; border-radius: 99px; background: #fdf1dc; color: #a06b10; margin: 2px 4px 0 0; }
        /* ---- 趣味化新增 ---- */
        .v33p .vibe-strip { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: linear-gradient(135deg, #f7f3ea, #fbf7ee); border: 1px solid var(--line); border-radius: 14px; padding: 10px 14px; margin-bottom: 14px; font-size: 13px; }
        .v33p .vibe-strip .chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 10px; border-radius: 99px; font-size: 12px; font-weight: 600; }
        .v33p .chip.stage { background: #eef3e6; color: #5a7a3a; }
        .v33p .chip.progress { background: var(--green-soft); color: var(--green-deep); }
        .v33p .chip.streak { background: #fdf1dc; color: #a06b10; animation: pop 0.3s ease; }
        .v33p .chip.position { background: #e8eefc; color: #3a5bbf; }
        .v33p .mem-card { background: linear-gradient(135deg, #eef4e4, #f4f9ec); border: 1px solid #dbe8c9; border-radius: 12px; padding: 12px 14px; margin-bottom: 12px; }
        .v33p .mem-card .mem-title { font-size: 12px; font-weight: 700; color: #5a7a3a; margin-bottom: 6px; }
        .v33p .mem-card .mem-text { font-size: 14px; line-height: 1.8; color: var(--ink); font-weight: 600; }
        .v33p .quiz-feedback { margin-top: 12px; border-radius: 12px; padding: 12px 14px; font-size: 13.5px; line-height: 1.75; animation: rise 0.35s ease; }
        .v33p .quiz-feedback.ok { background: var(--green-soft); border: 1px solid var(--green); color: var(--ink); }
        .v33p .quiz-feedback.no { background: #fde8e8; border: 1px solid #eec; color: var(--ink); }
        .v33p .quiz-feedback .fb-head { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
        .v33p .quiz-feedback.ok .fb-head { color: var(--green-deep); }
        .v33p .quiz-feedback.no .fb-head { color: #b3382c; }
        .v33p .src-toggle { font-size: 12.5px; color: var(--ink-3); background: none; border: 1px dashed var(--line); border-radius: 99px; padding: 3px 12px; margin-top: 8px; cursor: pointer; }
        .v33p .src-toggle:hover { color: var(--green-deep); border-color: var(--green); }
        /* ---- 趣味知识包：人设卡 / 小剧场 / 冷知识 ---- */
        .v33p .persona-card { background: linear-gradient(135deg, #fdf3e3, #fbf0da); border: 1px solid #ecd9b0; border-radius: 12px; padding: 12px 14px; margin-bottom: 12px; }
        .v33p .persona-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
        .v33p .persona-title { font-size: 14px; font-weight: 800; color: #8a651c; }
        .v33p .persona-tag { font-size: 10.5px; font-weight: 600; color: #a06b10; background: #fff8ea; border: 1px solid #ecd9b0; border-radius: 99px; padding: 1px 8px; }
        .v33p .persona-tagline { font-size: 13.5px; font-weight: 600; color: #7c5a16; margin-bottom: 5px; }
        .v33p .persona-duty { font-size: 12.5px; line-height: 1.7; color: var(--ink-2); }
        .v33p .drama-box { margin-bottom: 10px; }
        .v33p .drama-head { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #6b4fa3; margin-bottom: 6px; }
        .v33p .drama-title { font-size: 11.5px; font-weight: 600; color: #8a6dc8; background: #f1ecfb; border-radius: 99px; padding: 1px 10px; }
        .v33p .drama-setup { font-size: 13px; color: var(--ink-2); margin-bottom: 6px; }
        .v33p .funfact-box { display: flex; gap: 8px; align-items: flex-start; margin-top: 10px; background: linear-gradient(135deg, #eef4fb, #f2f7fd); border: 1px solid #d5e3f2; border-radius: 10px; padding: 10px 12px; font-size: 12.5px; line-height: 1.7; color: var(--ink-2); }
        .v33p .funfact-icon { font-size: 15px; line-height: 1.4; }
        .v33p .funfact-box b { color: #3a5bbf; }
        .v33p .learned-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 12.5px; color: var(--green-deep); background: var(--green-soft); border-radius: 99px; padding: 3px 12px; margin-top: 10px; }
        .v33p .next-btn { flex: 1; max-width: 220px; }
        /* ---- 推理对招 / 迁移实战：仪式感横幅与节奏条 ---- */
        .v33p .coach-banner { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; background: linear-gradient(135deg, #f4efe6, #faf6ec); border: 1px dashed var(--line); border-radius: 10px; padding: 9px 12px; font-size: 13px; margin-bottom: 10px; }
        .v33p .coach-banner b { color: #8a651c; }
        .v33p .coach-banner .coach-quote { color: var(--ink-2); font-size: 12.5px; }
        .v33p .ritual-strip { display: flex; gap: 6px; align-items: center; margin: 2px 0 12px; flex-wrap: wrap; }
        .v33p .ritual-step { font-size: 11.5px; font-weight: 600; color: var(--ink-2); background: var(--bg-soft); border-radius: 99px; padding: 3px 10px; }
        .v33p .ritual-step.done { background: var(--green-soft); color: var(--green-deep); }
        .v33p .ritual-step.active { background: var(--gold-soft); color: #8a651c; }
        .v33p .ritual-arrow { color: var(--ink-3); font-size: 11px; }
        .v33p .world-banner { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; background: linear-gradient(135deg, #e8eefc, #f0f5fe); border: 1px solid #d5e3f2; border-radius: 10px; padding: 9px 12px; font-size: 13px; color: #3a5bbf; margin-bottom: 10px; }
        /* ---- 先说后对：书写框与对照卡 ---- */
        .v33p .think-input { width: 100%; border: 1.5px solid var(--line); border-radius: 10px; padding: 10px 12px; font-size: 13.5px; line-height: 1.7; color: var(--ink); background: #fff; font-family: inherit; resize: vertical; min-height: 64px; box-sizing: border-box; }
        .v33p .think-input:focus { outline: none; border-color: var(--green); box-shadow: 0 0 0 3px var(--green-soft); }
        .v33p .think-input::placeholder { color: var(--ink-3); }
        .v33p .vs-box { display: grid; gap: 10px; margin-top: 12px; animation: rise 0.3s ease; }
        .v33p .vs-item { border-radius: 10px; padding: 10px 12px; font-size: 13px; line-height: 1.7; }
        .v33p .vs-item .vs-tag { font-weight: 700; font-size: 11px; margin-bottom: 4px; }
        .v33p .vs-item.mine { background: #f3f2ef; border: 1px solid var(--line); color: var(--ink); }
        .v33p .vs-item.mine .vs-tag { color: var(--ink-3); }
        .v33p .vs-item.master { background: linear-gradient(135deg, #f7efdd, #fbf4e4); border: 1px solid #ecd9b0; color: var(--ink); }
        .v33p .vs-item.master .vs-tag { color: #8a651c; }
        .v33p .vs-arrow { text-align: center; font-size: 15px; color: var(--ink-3); }
        /* ---- 换场实战：行动选择卡 ---- */
        .v33p .action-cards { display: grid; gap: 8px; margin: 10px 0 4px; }
        .v33p .action-card { display: flex; align-items: center; gap: 10px; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; cursor: pointer; background: var(--card); text-align: left; transition: all 0.15s; font-family: inherit; width: 100%; box-sizing: border-box; }
        .v33p .action-card:hover { border-color: var(--green); background: var(--green-soft); }
        .v33p .action-card.done { border-color: var(--green); background: var(--green-soft); }
        .v33p .action-card .ac-txt { font-size: 13px; font-weight: 600; color: var(--ink); flex: 1; }
        .v33p .action-card .ac-sub { font-size: 11.5px; color: var(--ink-3); font-weight: 400; display: block; margin-top: 1px; }
        .v33p .recap-box { margin-top: 10px; background: #faf9f6; border: 1px dashed var(--line); border-radius: 10px; padding: 10px 12px; font-size: 13px; line-height: 1.75; animation: rise 0.3s ease; }
        .v33p .recall-toggle { display: inline-flex; align-items: center; gap: 6px; margin-top: 6px; background: none; border: 1px dashed var(--green); color: var(--green); font-size: 12.5px; font-weight: 600; padding: 5px 10px; border-radius: 999px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .v33p .recall-toggle:hover { background: var(--green-soft); }
        /* ---- 必背记背小妙招 ---- */
        .v33p .mem-trick { margin-top: 10px; }
        .v33p .trick-toggle { display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #f7efdd, #fbf4e4); border: 1px solid #ecd9b0; color: #8a651c; font-size: 12.5px; font-weight: 700; padding: 6px 12px; border-radius: 999px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .v33p .trick-toggle:hover { background: var(--gold-soft); }
        .v33p .trick-box { margin-top: 8px; background: linear-gradient(135deg, #fdf9ef, #fffdf7); border: 1px dashed #e6cf9f; border-radius: 10px; padding: 12px 14px; animation: rise 0.3s ease; }
        .v33p .trick-title { font-size: 13px; font-weight: 800; color: #8a651c; margin-bottom: 4px; }
        .v33p .trick-tip { font-size: 13px; line-height: 1.75; color: var(--ink); }
        .v33p .trick-extra { margin-top: 8px; font-size: 12px; line-height: 1.7; color: var(--ink-2); border-top: 1px dashed rgba(138,101,28,0.25); padding-top: 8px; }
        /* ---- 四步步骤条（粘性置顶） ---- */
        .v33p .step-bar { position: sticky; top: 6px; z-index: 30; display: flex; gap: 6px; flex-wrap: wrap; align-items: center; background: rgba(255,255,255,0.94); backdrop-filter: blur(6px); border: 1px solid var(--line); border-radius: 999px; padding: 6px 10px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
        .v33p .step-chip { font-size: 11.5px; font-weight: 600; color: var(--ink-3); background: var(--bg-soft); border-radius: 999px; padding: 3px 9px; transition: all 0.15s; white-space: nowrap; }
        .v33p .step-chip.done { color: var(--green-deep); background: var(--green-soft); }
        .v33p .step-chip.cur { color: #8a651c; background: var(--gold-soft); box-shadow: 0 0 0 2px rgba(214,170,66,0.35); }
        .v33p .step-chip.skip { opacity: 0.45; text-decoration: line-through; }
        @keyframes pop { 0% { transform: scale(0.7); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }
      `}</style>

      <div className="practice-head">
        <Link to="/journey" className="back-link">← 返回修炼之路</Link>
        <span className="tag">{subject?.name ?? node.subjectName}（{subjectCode}）· 修炼</span>
      </div>

      {/* 闯关氛围条：境界 · 进度 · 连击 · 位置 */}
      <div className="vibe-strip">
        <span className="chip stage">🏮 第{stageNo || '?'}境 · {subject?.name ?? ''}</span>
        <span className="chip progress">🌿 已掌握 {subjectMastered}/{subjectNodes.length}</span>
        {streak >= 2 ? <span className="chip streak">🔥 连击 {streak} 关</span> : null}
        <span className="chip position">{idx >= 0 ? `📍 第 ${idx + 1}/${subjectNodes.length} 节点` : '📍 隔离节点（只读）'}</span>
      </div>

      {/* 四步修炼步骤条（粘性置顶，长页不迷路） */}
      <div className="step-bar" style={{ marginBottom: 12 }}>
        {(() => {
          const steps = [
            { label: '📖 学习', done: learned || quizResult !== null || isQuarantine, skip: false },
            { label: '🧐 辨析', done: quizResult !== null || isQuarantine, skip: isQuarantine },
            { label: '🧠 推理', done: (reasonSubmitted && reasonGrade !== null) || isQuarantine || !build?.reasoning, skip: isQuarantine || !build?.reasoning },
            { label: '🧭 迁移', done: transferGrade !== null || isQuarantine || !build?.transfer, skip: isQuarantine || !build?.transfer },
          ];
          const cur = steps.findIndex((s) => !s.skip && !s.done);
          return steps.map((s, i) => (
            <span key={s.label} className={'step-chip' + (s.done ? ' done' : '') + (i === cur ? ' cur' : '') + (s.skip ? ' skip' : '')}>
              {s.skip ? '−' : s.done ? '✓' : i + 1} {s.label}
            </span>
          ));
        })()}
      </div>

      <h1 className="page-title" style={{ fontSize: 20, margin: '6px 0 2px' }}>{node.topic}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', margin: '6px 0 12px' }}>
        <span className={'tag ' + statusMeta.cls}>{statusMeta.label}</span>
        <span className="tag">难度 {node.difficulty} · {LEVEL_LABEL[node.difficulty] ?? node.difficulty}</span>
        <span className="tag">来源 {node.sourceStatus === 'verified' ? '已核实' : node.sourceStatus}</span>
      </div>

      {isConditional || isQuarantine ? (
        <div className="card" style={{ padding: '10px 14px', marginBottom: 12, background: isQuarantine ? '#fde8e8' : '#fdf1dc', border: '1px solid ' + (isQuarantine ? '#eec' : '#eed' ) }}>
          <span style={{ fontSize: 12.5, color: isQuarantine ? '#b3382c' : '#a06b10' }}>⚠️ {statusMeta.tip}</span>
        </div>
      ) : null}

      {/* 掌握状态 */}
      <div className="mastery-strip" style={{ marginBottom: 14 }}>
        <span className={'ms-state ms-' + nm.state}>{MASTERY_LABEL[nm.state]}</span>
        <span className="ms-check">
          {checklist.map((c) => (
            <span key={c.label} className={c.done ? 'ok' : 'no'}>
              {c.done ? '✓' : '○'} {c.label}
            </span>
          ))}
        </span>
      </div>

      {/* ① 学习：先记一句话，再展开讲 */}
      <div className="card learn-card" style={{ marginBottom: 14 }}>
        <div className="sec-title">📖 一、学习<span className="sec-tag fam">精读</span></div>
        {build.stdJudgment ? (
          <div className="mem-card">
            <div className="mem-title">🎯 先记住这一句</div>
            <p className="mem-text">{build.stdJudgment}</p>
          </div>
        ) : null}
        {!isQuarantine ? (
          <div className="mem-trick">
            <button className="trick-toggle" onClick={() => setShowTrick(!showTrick)}>
              🧠 {showTrick ? '收起记背妙招' : '必背记背小妙招 · 点开'}
            </button>
            {showTrick ? (
              <div className="trick-box">
                {(() => {
                  const t = MEM_TRICKS[node.subjectType] ?? MEM_TRICKS[String(node.subjectType)] ?? MEM_TRICKS.theory;
                  return (
                    <>
                      <p className="trick-title">💡 {t.title}</p>
                      <p className="trick-tip">{t.tip}</p>
                      <p className="trick-extra">
                        📌 妙招记法：把上面那句「必背」用自己的话小声复述一遍，再进入辨析闯关，印象更深。
                      </p>
                    </>
                  );
                })()}
              </div>
            ) : null}
          </div>
        ) : null}
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
        {organHits.length ? (
          <div className="learn-card" style={{ marginBottom: 12 }}>
            <div className="sec-title">📍 它在哪？<span className="sec-tag fam">位置图</span></div>
            <BodyMap highlight={organHits} />
          </div>
        ) : null}
        {build.knowledge ? <p className="learn-text" style={{ marginTop: 6 }}>{build.knowledge}</p> : null}
        {build.coreDefinition ? (
          <div className="canon-box"><b>核心定义：</b>{build.coreDefinition}</div>
        ) : null}
        {build.keyFacts.length ? (
          <>
            <button className="src-toggle" onClick={() => setShowSources(!showSources)}>
              {showSources ? '▾ 收起出处明细' : `🔍 查看已核实出处（${build.keyFacts.length} 条）`}
            </button>
            {showSources ? (
              <div className="fact-list">
                {build.keyFacts.map((f, i) => (
                  <div key={i} className="fact-item">· <span className="fact-src">[{f.field}]</span> 出自「{f.sourceTitle}」（{f.sourceType}）</div>
                ))}
              </div>
            ) : null}
          </>
        ) : null}
        {build.classicalLayer.length ? (
          <div className="canon-box">
            {build.classicalLayer.map((c, i) => (
              <div key={i} style={{ marginBottom: i < build.classicalLayer.length - 1 ? 8 : 0 }}>
                <div className="canon-text">「{c.originalText}」</div>
                <div className="canon-meta">—— {c.label}《{c.canon}》{c.chapter ? `·${c.chapter}` : ''}（{c.verificationStatus}）</div>
              </div>
            ))}
          </div>
        ) : null}
        {build.riskTags.length ? (
          <div style={{ marginTop: 8 }}>{build.riskTags.map((t) => <span key={t} className="risk-pill">{t}</span>)}</div>
        ) : null}
        {build.safetyNote ? <p className="safety-line">🛡️ {build.safetyNote}</p> : null}
        {funFact ? (
          <div className="funfact-box">
            <span className="funfact-icon">💡</span>
            <span><b>涨知识：</b>{funFact}</span>
          </div>
        ) : null}
        {!learned && !isQuarantine ? (
          <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={markLearned}>
            ✅ 读完了，点亮本节
          </button>
        ) : null}
        {learned ? <span className="learned-badge">✓ 本节已点亮，出发闯关</span> : null}
      </div>

      {/* ② 辨析 */}
      <div className="card learn-card" style={{ marginBottom: 14 }}>
        <div className="sec-title">🧐 二、辨析<span className="sec-tag fam">客观判断</span></div>
        {isQuarantine ? (
          <p style={{ fontSize: 13, color: 'var(--ink-3)' }}>该节点处于隔离状态，跳过辨析。</p>
        ) : (
          <>
            {scene ? (
              <div className="drama-box">
                <div className="drama-head">🎬 情景小剧场 <span className="drama-title">{scene.title}</span></div>
                {scene.speaker ? (
                  <p className="drama-setup">「{scene.speaker}」认真地对你说——</p>
                ) : null}
                <div className="trap-statement">「{build.quiz.statement}」</div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4, marginBottom: 8 }}>
                  上面这句台词，是「正确理解」还是「常见误区」？请判断：
                </p>
              </div>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 8 }}>
                下面这种说法，是「正确理解」还是「常见误区」？请判断：
              </p>
            )}
            {!scene ? <div className="trap-statement">「{build.quiz.statement}」</div> : null}
            <Choices
              options={DISCRIMINATE_OPTIONS.map((o) => ({ id: o.id, text: o.text }))}
              selected={quizSel !== null ? [quizSel] : []}
              onToggle={(id) => setQuizSel(String(id))}
              locked={quizResult !== null}
              size="md"
            />
            <button className="btn btn-primary" disabled={quizSel === null || quizResult !== null} onClick={submitQuiz} style={{ marginTop: 10 }}>
              提交判断
            </button>
            {quizResult ? (
              <div className={'quiz-feedback ' + (quizResult.correct ? 'ok' : 'no')}>
                <div className="fb-head">{quizResult.correct ? praise : `${soothe} · 这是常见误区`}</div>
                <p>{build.quiz.explanation}</p>
                {!quizResult.correct ? (
                  <p style={{ marginTop: 6, fontSize: 12.5, color: 'var(--ink-2)' }}>
                    🔁 回到上面的「先记住这一句」，看一遍再来——错一次，印象更深。
                  </p>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* ③ 推理 */}
      <div className="card learn-card" style={{ marginBottom: 14 }}>
        <div className="sec-title">🧠 三、推理<span className="sec-tag var">先说后对</span></div>
        {isQuarantine ? (
          <p style={{ fontSize: 13, color: 'var(--ink-3)' }}>该节点处于隔离状态，跳过推理。</p>
        ) : build.reasoning ? (
          <>
            {persona ? (
              <div className="coach-banner">
                <span>🧙 <b>{persona.title}</b> 出招</span>
                <span className="coach-quote">「{persona.tagline}」</span>
              </div>
            ) : (
              <div className="coach-banner">
                <span>🧙 <b>师父</b> 出招</span>
                <span className="coach-quote">「先自己想，再对答案——想得越用力，记得越牢」</span>
              </div>
            )}
            <p className="trap-statement" style={{ marginBottom: 4 }}>{build.reasoning}</p>
            <button className="recall-toggle" onClick={() => setReasonRecap(!reasonRecap)}>
              📖 {reasonRecap ? '收起回看' : '忘了？点开回看刚刚学的'}
            </button>
            {reasonRecap ? (
              <div className="recap-box" style={{ marginTop: 8 }}>
                <b>🔁 前文回看：</b>{' '}
                {build.coreDefinition ?? build.stdJudgment ?? (build.knowledge ? build.knowledge.slice(0, 120) + '…' : '')}
              </div>
            ) : null}
            <div className="ritual-strip">
              <span className={'ritual-step' + (reasonSubmitted ? ' done' : ' active')}>① 拆题</span>
              <span className="ritual-arrow">→</span>
              <span className={'ritual-step' + (reasonSubmitted ? ' done' : '')}>② 立论</span>
              <span className="ritual-arrow">→</span>
              <span className={'ritual-step' + (reasonSubmitted ? ' active' : '')}>③ 对招</span>
            </div>
            {!reasonSubmitted ? (
              <>
                <textarea
                  className="think-input"
                  rows={3}
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  placeholder="✍️ 先把你的判断写下来，哪怕一句话——写过的才算学过。"
                />
                <button
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: 10 }}
                  disabled={!reasonInput.trim()}
                  onClick={() => setReasonSubmitted(true)}
                >
                  📤 交卷，跟师父对招 →
                </button>
                {!reasonInput.trim() ? (
                  <p style={{ marginTop: 6, fontSize: 12, color: 'var(--ink-3)' }}>
                    ✍️ 先在框里写下判断（哪怕一句话），交卷按钮才会亮起。
                  </p>
                ) : null}
              </>
            ) : (
              <div className="vs-box">
                <div className="vs-item mine">
                  <div className="vs-tag">✍️ 你的推理</div>
                  <div>{reasonInput.trim()}</div>
                </div>
                <div className="vs-arrow">▼ 师父拆招</div>
                <div className="vs-item master">
                  <div className="vs-tag">🧙 师父的答案</div>
                  <div>{build.referenceAnswer ?? '（无参考答案）'}</div>
                </div>
              </div>
            )}
            {reasonSubmitted && reasonGrade === null ? (
              <div className="self-grade">
                <button className="btn btn-sm grade-ok" onClick={() => gradeReason(true)}>✅ 思路一致，师父点头</button>
                <button className="btn btn-sm grade-no" onClick={() => gradeReason(false)}>↻ 有偏差，记下再练</button>
              </div>
            ) : null}
            {reasonGrade !== null ? (
              <div className={'quiz-feedback ' + (reasonGrade ? 'ok' : 'no')}>
                <div className="fb-head">{reasonFeed}</div>
                <p>{reasonGrade ? '✓ 变式场景验证完成，已记入掌握。' : '↻ 已记录待修正——间隔复习会再次检验。'}</p>
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {/* ④ 迁移 */}
      <div className="card learn-card" style={{ marginBottom: 14 }}>
        <div className="sec-title">🧭 四、迁移<span className="sec-tag tra">换场实战</span></div>
        {isQuarantine ? (
          <p style={{ fontSize: 13, color: 'var(--ink-3)' }}>该节点处于隔离状态，跳过迁移。</p>
        ) : build.transfer ? (
          <>
            <div className="world-banner">
              <span>🌍 场景转移</span>
              <span>同一个道理，换个战场——你还认得它吗？</span>
            </div>
            <p className="trap-statement" style={{ marginBottom: 4 }}>{build.transfer}</p>
            {transferGrade === null ? (
              <div className="action-cards">
                <button className={'action-card' + (transferAction === 'recap' ? ' done' : '')} onClick={() => setTransferAction('recap')}>
                  <span style={{ fontSize: 18 }}>🔍</span>
                  <span className="ac-txt">
                    先回看原场景
                    <span className="ac-sub">把「先记住这一句」再读一遍，心里有底再答</span>
                  </span>
                </button>
                <button className={'action-card' + (transferAction === 'direct' ? ' done' : '')} onClick={() => setTransferAction('direct')}>
                  <span style={{ fontSize: 18 }}>⚡</span>
                  <span className="ac-txt">
                    直接上手
                    <span className="ac-sub">凭印象硬答——越敢下判断，记得越牢</span>
                  </span>
                </button>
              </div>
            ) : null}
            {transferAction === 'recap' && transferGrade === null ? (
              <div className="recap-box">
                <b>📖 原场景要点：</b>{' '}
                {build.stdJudgment ?? '（回想一下刚才学的内容）'}
                {build.coreDefinition ? (
                  <p style={{ marginTop: 6, color: 'var(--ink-2)' }}>{build.coreDefinition}</p>
                ) : null}
                <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>现在换到这个新场景，你能独立分析吗？</p>
              </div>
            ) : null}
            {transferAction === 'direct' && transferGrade === null ? (
              <div className="recap-box" style={{ background: '#fdf1dc', borderColor: '#eed' }}>
                <b>🧭 换场提示：</b> 换场景最容易丢的是边界条件——如果答不上来，先回看一眼「先记住这一句」。
                <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>诚实自评：你独立分析出来了吗？</p>
              </div>
            ) : null}
            {transferAction !== null && transferGrade === null ? (
              <div className="self-grade">
                <button className="btn btn-sm grade-ok" onClick={() => gradeTransfer(true)}>🚀 能独立分析，出师</button>
                <button className="btn btn-sm grade-no" onClick={() => gradeTransfer(false)}>🐢 还不行，回炉再读</button>
              </div>
            ) : null}
            {transferGrade !== null ? (
              <div className={'quiz-feedback ' + (transferGrade ? 'ok' : 'no')}>
                <div className="fb-head">{transferFeed}</div>
                <p>{transferGrade ? '✓ 迁移验证完成，记入掌握。' : '↻ 已记录待巩固——回到学习区再读一遍。'}</p>
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {/* 本学科节点清单 + 前后导航 */}
      <div className="nav-row">
        <button className="btn btn-ghost btn-sm" disabled={idx <= 0} onClick={() => goto(subjectNodes[idx - 1].nodeId)}>
          ← 上一关
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowList(!showList)}>
          {showList ? '收起清单' : `🗂️ 本学科清单（${subjectNodes.length}）`}
        </button>
        <button
          className={'btn btn-primary btn-sm next-btn' + (idx >= subjectNodes.length - 1 ? ' btn-ghost' : '')}
          disabled={idx < 0 || idx >= subjectNodes.length - 1}
          onClick={() => goto(subjectNodes[idx + 1].nodeId)}
        >
          下一关 →
        </button>
      </div>
      {showList ? (
        <div className="card learn-card" style={{ marginTop: 10 }}>
          <div className="node-list">
            {subjectNodes.map((n, i) => {
              const st = getNodeMastery(p, n.nodeId);
              const cur = n.nodeId === node.nodeId;
              return (
                <Link key={n.nodeId} to={`/practice/${n.nodeId}`} className={cur ? 'cur' : ''} onClick={() => goto(n.nodeId)}>
                  <span style={{ color: 'var(--ink-3)', fontSize: 11, width: 34 }}>{i + 1}</span>
                  <span style={{ flex: 1 }}>{n.topic}</span>
                  {n.status === 'quarantine' ? <span style={{ fontSize: 11, color: '#b3382c' }}>🔒隔离</span> : null}
                  {st.state === 'mastered' ? <span style={{ fontSize: 11, color: 'var(--green-deep)' }}>✓</span> : null}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      <SafetyNote />
    </div>
  );
}
