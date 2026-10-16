interface RadarValue {
  label: string;
  value: number; // 0-1
}

/** 中医能力雷达（SVG，无第三方依赖） */
export default function RadarChart({
  values,
  size = 300,
  className = '',
}: {
  values: RadarValue[];
  size?: number;
  className?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.34;
  const n = values.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, ratio: number) => ({
    x: cx + Math.cos(angle(i)) * r * ratio,
    y: cy + Math.sin(angle(i)) * r * ratio,
  });

  const rings = [0.25, 0.5, 0.75, 1];
  const polygon = values
    .map((v, i) => {
      const p = pt(i, Math.max(0.04, v.value));
      return `${p.x},${p.y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={'radar ' + className} role="img" aria-label="能力雷达图">
      {rings.map((rr) => (
        <polygon
          key={rr}
          points={values.map((_, i) => `${pt(i, rr).x},${pt(i, rr).y}`).join(' ')}
          fill="none"
          stroke="rgba(63,125,92,.16)"
          strokeWidth="1"
        />
      ))}
      {values.map((_, i) => {
        const p = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(63,125,92,.12)" strokeWidth="1" />;
      })}
      <polygon
        points={polygon}
        fill="rgba(63,125,92,.22)"
        stroke="var(--green)"
        strokeWidth="2"
        strokeLinejoin="round"
        className="radar-fill"
      />
      {values.map((v, i) => {
        const p = pt(i, Math.max(0.04, v.value));
        return <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--green)" />;
      })}
      {values.map((v, i) => {
        const p = pt(i, 1.22);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="radar-label"
          >
            {v.label}
          </text>
        );
      })}
    </svg>
  );
}
