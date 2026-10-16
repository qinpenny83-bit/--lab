/**
 * ⏱️ 可注入时钟（V2）
 * 所有引擎与 store 一律通过 now() 取时间，禁止直接调用 Date.now()，
 * 这样验收测试可以使用 fake timer 模拟真实时间变化（间隔复习 / 7日报告 / 连续天数）。
 */
let nowFn: () => number = () => Date.now();

let manual: number | null = null;

export function now(): number {
  if (manual !== null) return manual;
  return nowFn();
}

/** 注入固定时间（测试用） */
export function setClock(fn: () => number) {
  nowFn = fn;
  manual = null;
}

/** 注入固定时间戳（测试用） */
export function setNow(ts: number) {
  manual = ts;
}

/** 让时钟从固定时间戳开始并自动流逝（测试用） */
export function useManualClock(start: number) {
  manual = start;
  nowFn = () => manual!;
}

/** 在手动时钟上拨快 ms 毫秒（测试用） */
export function advanceClock(ms: number) {
  if (manual !== null) manual += ms;
}

/** 恢复真实时钟 */
export function resetClock() {
  nowFn = () => Date.now();
  manual = null;
}

export function dayStart(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function daysBetween(a: number, b: number): number {
  return Math.round((dayStart(b) - dayStart(a)) / 86400000);
}

export function dateKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}
