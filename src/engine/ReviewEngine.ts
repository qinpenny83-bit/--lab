/**
 * 🔄 Review Engine（V2）
 * 职责：动态间隔复习。不是固定 1/3/7/15，而是综合
 * 正确率、错误类型、回答速度（以耗时近似）、间隔时间、迁移成功率，
 * 决定"今天是否该复习这个知识点"以及"为什么"。
 */
import type { MemoryTemperature, ReviewState, UserProgress } from '../types/models';
import { daysBetween, now } from './clock';
import { getNodeMastery, transferSuccessRateOf } from './MasteryEngine';

export const MIN_REVIEW_INTERVAL_MS = 12 * 3600 * 1000; // 12 小时（同日不重复复习）

/** 由节点数据初始化复习状态 */
export function freshReviewState(nodeId: string, difficulty = 2): ReviewState {
  const t = now();
  return {
    nodeId,
    lastReviewedAt: null,
    nextReviewAt: t + 86400000, // 初次学习后 1 天
    reviewCount: 0,
    stability: 0.3,
    difficulty,
    forgettingRisk: 0.5,
    lastCorrect: true,
    temperature: 'warm',
    lastResultAt: null,
  };
}

export function getReviewState(p: UserProgress, nodeId: string, difficulty = 2): ReviewState {
  return p.reviewQueue.find((r) => r.nodeId === nodeId) ?? freshReviewState(nodeId, difficulty);
}

/** 稳定度：综合答对比例 + 复习次数 + 迁移成功 */
function stabilityFrom(p: UserProgress, nodeId: string, base: number, correct: boolean): number {
  const nm = getNodeMastery(p, nodeId);
  const validations = nm.validations;
  const correctCount = validations.filter((v) => v.correct).length;
  const total = Math.max(1, validations.length);
  const acc = correctCount / total;
  const transferBonus = nm.transferPassed ? 0.25 : 0;
  const decay = correct ? 0.1 : -0.25;
  return Math.max(0.05, Math.min(0.95, base + (acc - 0.5) * 0.4 + decay + transferBonus));
}

/** 遗忘风险：recency + stability + mastery + mistakeRisk（读取时按当前时间实时计算） */
export function forgettingRiskOf(p: UserProgress, rs: ReviewState, t: number): number {
  const days = rs.lastReviewedAt ? daysBetween(rs.lastReviewedAt, t) : 0;
  const recency = Math.min(1, days / 14); // 越久越高
  const stab = 1 - rs.stability;
  const nm = getNodeMastery(p, rs.nodeId);
  const masteryPenalty = nm.state === 'mastered' ? -0.2 : nm.state === 'familiar' ? -0.05 : 0.15;
  const mistakeRisk = rs.lastCorrect ? 0 : 0.2;
  const diff = (rs.difficulty - 1) / 4 * 0.15;
  return Math.max(0.05, Math.min(0.95, recency * 0.4 + stab * 0.3 + masteryPenalty + mistakeRisk + diff));
}

/** 动态间隔（天）：稳定度越高间隔越长，难度越高间隔越短 */
function intervalDays(rs: ReviewState): number {
  const base = [1, 2, 3, 5, 7][Math.min(4, rs.reviewCount)];
  const stab = 0.7 + rs.stability * 1.4; // 0.7 - 2.1 倍
  const diffFactor = 1 + (5 - rs.difficulty) / 10; // 难度 1 → 1.4 倍；难度 5 → 1.0 倍
  return Math.max(1, Math.round(base * stab * diffFactor));
}

/** 记忆温度：综合 recency / stability / mastery / mistakeRisk */
export function temperatureOf(p: UserProgress, rs: ReviewState, t: number): MemoryTemperature {
  const risk = forgettingRiskOf(p, rs, t);
  if (risk >= 0.75) return 'freezing';
  if (risk >= 0.55) return 'cold';
  if (risk >= 0.3) return 'warm';
  return 'hot';
}

/** 记录一次复习结果（正确/错误），更新复习状态与下次复习时间 */
export function recordReviewResult(
  p: UserProgress,
  nodeId: string,
  correct: boolean,
  difficulty: number
): ReviewState {
  const t = now();
  let rs = getReviewState(p, nodeId, difficulty);
  rs.lastResultAt = t;
  rs.lastCorrect = correct;
  rs.reviewCount += 1;
  rs.stability = stabilityFrom(p, nodeId, rs.stability, correct);
  // 错误 → 缩短间隔（2 天内再复习）；正确 → 按动态间隔
  rs.nextReviewAt = t + (correct ? intervalDays(rs) * 86400000 : Math.max(1, Math.min(2, Math.round(intervalDays(rs) / 2))) * 86400000);
  rs.forgettingRisk = forgettingRiskOf(p, rs, t);
  rs.lastReviewedAt = t;
  rs.temperature = temperatureOf(p, rs, t);
  return rs;
}

/** 判断今天是否应该复习该节点，并给出原因 */
export function shouldReview(
  p: UserProgress,
  nodeId: string,
  difficulty: number
): { due: boolean; reason: string } {
  const t = now();
  const rs = getReviewState(p, nodeId, difficulty);
  if (rs.reviewCount === 0 && rs.lastReviewedAt === null) {
    return { due: false, reason: '还没学过，先学再谈复习。' };
  }
  const overdueDays = daysBetween(rs.nextReviewAt, t);
  const nm = getNodeMastery(p, nodeId);
  const lastTransferFail = nm.validations.some((v) => v.kind === 'transfer' && !v.correct && t - v.at < 7 * 86400000);

  if (t >= rs.nextReviewAt) {
    if (lastTransferFail) {
      return {
        due: true,
        reason: `这个知识已经 ${Math.max(1, daysBetween(rs.lastReviewedAt ?? t, t))} 天没复习，而且上次陌生案例中出现过错误，今天适合重新验证。`,
      };
    }
    return {
      due: true,
      reason: `距上次复习已 ${Math.max(1, daysBetween(rs.lastReviewedAt ?? t, t))} 天，记忆正在变冷，今天适合巩固。`,
    };
  }
  if (overdueDays < 0 && !rs.lastCorrect) {
    return { due: true, reason: '上次复习没有答对，虽然还没到期，但建议今天先补一次。' };
  }
  return { due: false, reason: `复习计划在 ${Math.max(0, -overdueDays)} 天后到期，今天不需要。` };
}

/** 今天的复习候选列表（到期且值得复习的节点） */
export function dueReviews(p: UserProgress): { nodeId: string; reason: string; temperature: MemoryTemperature; risk: number }[] {
  const t = now();
  const out: { nodeId: string; reason: string; temperature: MemoryTemperature; risk: number }[] = [];
  for (const nodeId of Object.keys(p.nodeMastery)) {
    const nm = p.nodeMastery[nodeId];
    if (nm.validations.length === 0) continue;
    const rs = getReviewState(p, nodeId);
    const d = shouldReview(p, nodeId, rs.difficulty);
    if (d.due) {
      // 风险与温度按当前时间实时计算，避免展示过期的快照
      out.push({ nodeId, reason: d.reason, temperature: temperatureOf(p, rs, t), risk: forgettingRiskOf(p, rs, t) });
    }
  }
  return out
    .sort((a, b) => b.risk - a.risk)
    .slice(0, 3);
}

/** 全局记忆温度统计（首页展示） */
export function temperatureCounts(p: UserProgress): Record<MemoryTemperature, number> {
  const t = now();
  const counts: Record<MemoryTemperature, number> = { hot: 0, warm: 0, cold: 0, freezing: 0 };
  for (const rs of p.reviewQueue) {
    if (rs.lastResultAt === null) continue;
    counts[temperatureOf(p, rs, t)] += 1;
  }
  return counts;
}

export function reviewRetentionOf(p: UserProgress): number {
  const queue = p.reviewQueue;
  if (queue.length === 0) return 0;
  const withResult = queue.filter((r) => r.lastResultAt !== null);
  if (withResult.length === 0) return 0;
  return withResult.filter((r) => r.lastCorrect).length / withResult.length;
}

export function transferSuccessRate(p: UserProgress): number {
  return transferSuccessRateOf(p);
}
