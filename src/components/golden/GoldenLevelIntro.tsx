import { GOLDEN_LEVEL_INTRO } from '../../data/golden/yinYangLevel';

/**
 * 关卡首屏：一屏回答四个问题——
 * ① 我在哪里 ② 我要学什么 ③ 学完我会什么 ④ 为什么值得学。
 */
export default function GoldenLevelIntro({
  onStart,
  startedLabel,
}: {
  onStart: () => void;
  startedLabel: string;
}) {
  return (
    <div className="gl-intro">
      <div className="gl-breadcrumb">{GOLDEN_LEVEL_INTRO.realm}</div>
      <h1 className="gl-intro-title">☯️ {GOLDEN_LEVEL_INTRO.topic}</h1>

      <div className="gl-intro-block">
        <p className="gl-intro-q">学完我会什么</p>
        <ul className="gl-intro-abilities">
          {GOLDEN_LEVEL_INTRO.abilities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="gl-hook">
        <p className="gl-hook-label">为什么值得学</p>
        <p className="gl-hook-text">{GOLDEN_LEVEL_INTRO.hook}</p>
      </div>

      <button className="btn btn-primary gl-start-btn" onClick={onStart}>
        {startedLabel}
      </button>
    </div>
  );
}