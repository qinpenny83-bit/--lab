import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { addFamilyMember, addFamilyNote, engine, familyObservation, removeFamilyMember, useProgress } from '../store/progress';
import { FAMILY_DIMENSIONS } from '../types/models';
import type { FamilyDimension, SafetyResult } from '../types/models';
import { PageHead, SafetyNote } from '../components/ui';

const RELATIONS = ['妈妈', '爸爸', '朋友'];

const DIMENSION_EXPLAIN: Record<FamilyDimension, string> = {
  睡眠: '入睡时间、深浅、夜醒次数——睡眠是精气神恢复的直接窗口',
  饮食: '食欲、口味变化、进食规律——反映脾胃运化的日常状态',
  精神: '精力、注意力、疲劳感——气血是否充足的日常信号',
  寒热感受: '怕冷、怕热、手脚温度——学习「寒热」辨证的第一手素材',
  运动: '活动量、耐受度、运动后感受——观察身体机能的长期趋势',
  情绪: '情绪起伏、压力、平稳度——情志因素在中医理论中的意义',
  二便: '次数、性状、规律——大小便是身体排浊与运化的晴雨表',
};

export default function FamilyPage() {
  const p = useProgress();
  const [activeId, setActiveId] = useState<string | null>(p.familyMembers[0]?.id ?? null);
  const [dim, setDim] = useState<FamilyDimension>('睡眠');
  const [value, setValue] = useState('');
  const [ask, setAsk] = useState('');
  const [answer, setAnswer] = useState<SafetyResult | null>(null);

  const member = useMemo(
    () => p.familyMembers.find((m) => m.id === activeId) ?? null,
    [p.familyMembers, activeId]
  );
  const analysis = member ? familyObservation(member) : null;

  const addMember = (relation: string) => {
    const m = addFamilyMember(relation);
    setActiveId(m.id);
  };

  const submitNote = () => {
    const v = value.trim();
    if (!member || !v) return;
    // SafetyGuard 先行：急症关键词直接拦截提示，但仍允许记录观察（绝不诊断）
    addFamilyNote(member.id, dim, v);
    setValue('');
  };

  const askAgent = () => {
    const text = ask.trim();
    if (!text) return;
    setAnswer(engine.safety(text));
    setAsk('');
  };

  const safetyBlock = analysis && analysis.safetyLevel === 'emergency';

  return (
    <div className="page page-narrow">
      <div className="practice-head">
        <Link to="/" className="back-link">← 返回首页</Link>
        <span className="tag">🏠 只观察 · 不诊断</span>
      </div>
      <PageHead
        title="家庭健康观察"
        sub="把家人的日常状态记下来，练习「连续观察同一维度」——这是学中医四诊的第一步，不是诊断，更不是治疗。"
      />

      {/* 安全声明 */}
      <div className="card family-safety">
        <p>
          ⚕️ 这里只记录观察，不做诊断、不开药、不推荐治疗。记录中出现急症信号（如胸痛、呼吸困难等），
          我会立即提示就医，不提供任何处理建议。
        </p>
      </div>

      {/* 成员列表 */}
      <div className="family-members">
        <span className="family-label">观察对象：</span>
        {p.familyMembers.map((m) => (
          <button
            key={m.id}
            className={'family-chip' + (m.id === activeId ? ' active' : '')}
            onClick={() => setActiveId(m.id)}
          >
            {m.relation}
            <span className="family-chip-count">{m.notes.length}</span>
          </button>
        ))}
        {RELATIONS.filter((r) => !p.familyMembers.some((m) => m.relation === r)).map((r) => (
          <button key={r} className="family-add" onClick={() => addMember(r)}>
            + {r}
          </button>
        ))}
      </div>

      {member && analysis ? (
        <>
          {/* Agent 整理：长期变化（纯观察维度） */}
          <div className={'card family-agent' + (safetyBlock ? ' urgent' : '')}>
            <div className="agent-head">
              <span className="agent-avatar">🧑‍⚕️</span>
              <span className="agent-name">观察整理 · {member.relation}</span>
              {safetyBlock ? <span className="tag tag-red">🚨 急症信号</span> : <span className="tag tag-mint">仅观察</span>}
            </div>
            <p className="family-insight">{analysis.insight}</p>
            <p className="family-trend">📈 {analysis.trendNote}</p>
            {safetyBlock ? (
              <p className="family-urgent">
                🚑 记录中出现急症关键词。这不是我能处理的情况，请立即联系正规医疗急救，不要等待。
              </p>
            ) : (
              <p className="family-dim-hint">
                <strong>为什么记录这些？</strong>{' '}
                {DIMENSION_EXPLAIN[dim]}。坚持同一维度连续记录 2-3 天，才能看到趋势——这也是中医「四诊合参」里观察能力的日常训练。
              </p>
            )}
          </div>

          {/* 快速记录 */}
          <div className="card family-form">
            <h3>➕ 快速记录</h3>
            <div className="family-dim-row">
              {FAMILY_DIMENSIONS.map((d) => (
                <button
                  key={d}
                  className={'family-dim' + (d === dim ? ' active' : '')}
                  onClick={() => setDim(d)}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="family-input-row">
              <input
                className="family-input"
                placeholder={`${member.relation}今天的${dim}怎么样？（例如：昨晚入睡很快，夜里醒了两次）`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitNote()}
              />
              <button className="btn btn-primary" onClick={submitNote} disabled={!value.trim()}>
                记录
              </button>
            </div>
          </div>

          {/* 最近记录 */}
          <div className="card family-notes">
            <div className="card-title-row">
              <h3>📋 最近记录</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => removeFamilyMember(member.id)}>
                删除该成员
              </button>
            </div>
            {member.notes.length ? (
              <div className="family-note-list">
                {member.notes.slice(0, 12).map((n, i) => (
                  <div key={i} className="family-note">
                    <span className="family-note-dim">{n.dimension}</span>
                    <span className="family-note-value">{n.value}</span>
                    <span className="family-note-time">
                      {new Date(n.at).toLocaleDateString('zh-CN')} {new Date(n.at).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="card-hint">还没有记录。选一个维度，记下今天的第一条观察吧。</p>
            )}
          </div>

          {/* 问问 Agent（关于观察，SafetyGuard 兜底） */}
          <div className="card family-ask">
            <h3>🤔 问问观察的含义</h3>
            <p className="card-hint">可以问「这个观察维度在中医理论学习里意味着什么」；涉及诊断、用药、急症，我会按安全规则回应。</p>
            <div className="ask-row">
              <input
                className="ask-input"
                placeholder="例如：睡眠记录对学中医有什么用？/ 我妈妈胸痛是什么病？"
                value={ask}
                onChange={(e) => setAsk(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && askAgent()}
              />
              <button className="btn btn-primary" onClick={askAgent}>提问</button>
            </div>
            {answer ? (
              <div className={'ask-answer level-' + answer.level}>
                <div className="ask-answer-head">{answer.emoji} {answer.label}</div>
                <p>{answer.response}</p>
                {answer.redirectTarget ? (
                  <Link className="btn btn-ghost btn-sm" to={answer.redirectTarget.type === 'map' ? '/map' : '/observe'}>
                    {answer.redirectTarget.label} →
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="card empty-card">
          <p>先添加一位观察对象（妈妈 / 爸爸 / 朋友），开始第一天的观察记录。</p>
        </div>
      )}

      <SafetyNote />
    </div>
  );
}
