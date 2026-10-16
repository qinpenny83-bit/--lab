import { findClassic } from '../../data';

/**
 * 经典卡：只引用既有「已验证」经典原文，原文 / 白话 / 课程解释三层分离，
 * 不做 AI 生成古文。
 */
export default function ClassicCard({
  classicId,
  today,
}: {
  classicId: string;
  today: string;
}) {
  const classic = findClassic(classicId);
  if (!classic) return null;
  return (
    <div className="gl-classic">
      <div className="gl-classic-head">
        <span className="tag">📜 今日所得</span>
        <span className="gl-classic-source">《{classic.book}》</span>
      </div>
      <p className="gl-classic-original">{classic.original}</p>
      <div className="gl-classic-arrow">↓</div>
      <p className="gl-classic-plain">{classic.plain}</p>
      <p className="gl-classic-today-label">今天的你，应该这样理解它：</p>
      <p className="gl-classic-today">{today}</p>
    </div>
  );
}