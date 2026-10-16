import { GOLDEN_SUMMARY } from '../../data/golden/yinYangLevel';
import ClassicCard from './ClassicCard';

/**
 * 关卡完成页：主角是「你获得了哪些中医思维能力」，不是 XP/徽章。
 */
export default function MasterySummary({
  onDone,
  doneLabel,
}: {
  onDone: () => void;
  doneLabel: string;
}) {
  return (
    <div className="gl-summary">
      <h2 className="gl-summary-title">☯️ 你已经掌握</h2>
      <ul className="gl-summary-abilities">
        {GOLDEN_SUMMARY.abilities.map((a) => (
          <li key={a}>✓ {a}</li>
        ))}
      </ul>

      <ClassicCard
        classicId={GOLDEN_SUMMARY.classicId}
        today={GOLDEN_SUMMARY.classicToday}
      />

      <div className="gl-unlocks">
        <p className="gl-unlocks-label">你继续往里走，会解锁</p>
        <div className="gl-unlock-list">
          {GOLDEN_SUMMARY.unlocks.map((u) => (
            <div key={u.title} className="gl-unlock">
              <span className="gl-unlock-icon">{u.icon}</span>
              <div>
                <p className="gl-unlock-title">{u.title}</p>
                <p className="gl-unlock-desc">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary gl-done-btn" onClick={onDone}>
        {doneLabel}
      </button>
    </div>
  );
}