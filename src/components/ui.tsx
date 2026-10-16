import { useProgress, levelFromXp } from '../store/progress';
import type { ReactNode } from 'react';

/** 选项列表（单选 / 多选 / 锁定态） */
export function Choices({
  options,
  selected,
  multi = false,
  locked = false,
  onToggle,
  size = 'md',
}: {
  options: { id: string; text: string; sub?: string }[];
  selected: string[];
  multi?: boolean;
  locked?: boolean;
  onToggle: (value: string | string[]) => void;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <div className="choices">
      {options.map((o) => {
        const isSel = selected.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            disabled={locked}
            className={'choice ' + (isSel ? 'selected' : '') + ' ' + size}
            onClick={() => {
              if (locked) return;
              if (multi) {
                onToggle(isSel ? selected.filter((s) => s !== o.id) : [...selected, o.id]);
              } else {
                onToggle(o.id);
              }
            }}
          >
            <span className="choice-text">
              {o.text}
              {o.sub ? <span className="choice-sub">{o.sub}</span> : null}
            </span>
            <span className="choice-mark">{multi ? (isSel ? '✓' : '') : isSel ? '●' : '○'}</span>
          </button>
        );
      })}
    </div>
  );
}

/** 步骤指示器 */
export function Steps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="steps">
      {steps.map((s, i) => (
        <div key={s} className={'step' + (i === current ? ' active' : i < current ? ' done' : '')}>
          <span className="step-dot">{i < current ? '✓' : i + 1}</span>
          <span className="step-label">{s}</span>
        </div>
      ))}
    </div>
  );
}

/** 等级 + XP 进度 */
export function LevelBar({ compact = false }: { compact?: boolean }) {
  const p = useProgress();
  const lv = levelFromXp(p.xp);
  if (compact) {
    return (
      <div className="levelbar levelbar-compact">
        <span className="level-emoji">{lv.emoji}</span>
        <span className="level-name">{lv.name}</span>
        <span className="level-xp">{p.xp} XP</span>
      </div>
    );
  }
  return (
    <div className="levelbar">
      <div className="levelbar-head">
        <span className="level-emoji">{lv.emoji}</span>
        <span className="level-name">{lv.name}</span>
        {lv.nextXp !== null ? (
          <span className="level-xp">
            {p.xp - lv.currentXp} / {lv.nextXp - lv.currentXp} XP
          </span>
        ) : (
          <span className="level-xp">{p.xp} XP · 已满级</span>
        )}
      </div>
      <div className="xpbar">
        <div className="xpbar-fill" style={{ width: `${Math.round(lv.progress * 100)}%` }} />
      </div>
    </div>
  );
}

/** 主题徽章 */
export function TopicTag({ name, emoji }: { name: string; emoji?: string }) {
  return (
    <span className="tag">
      {emoji ? emoji + ' ' : ''}
      {name}
    </span>
  );
}

/** 页头标题 */
export function PageHead({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="pagehead">
      <div>
        <h1>{title}</h1>
        {sub ? <p>{sub}</p> : null}
      </div>
      {right ? <div className="pagehead-right">{right}</div> : null}
    </div>
  );
}

/** 安全声明脚注 */
export function SafetyNote() {
  return (
    <p className="safety-note">
      ⚕️ 本内容用于传统医学知识学习，不构成个人用药或治疗建议。身体不适请及时寻求正规医疗帮助。
    </p>
  );
}
