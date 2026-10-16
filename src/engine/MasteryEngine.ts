/**
 * 🎯 Mastery Engine（V2）
 * 职责：掌握验证。一个知识点不能因为答对一次就 mastered。
 * 必须经过：熟悉场景（familiar）→ 变式场景（variation）→ 陌生场景（transfer）
 * 三种验证；间隔后遗忘则回退到 unstable。
 */
import type {
  MasteryState,
  NodeMastery,
  SceneValidation,
  TransferScene,
  TransferSceneKind,
  UserProgress,
} from '../types/models';
import { now } from './clock';

export const SCENE_ORDER: TransferSceneKind[] = ['familiar', 'variation', 'transfer'];

/** 初始掌握记录 */
export function freshNodeMastery(nodeId: string): NodeMastery {
  const t = now();
  return {
    nodeId,
    state: 'new',
    familiarPassed: false,
    variationPassed: false,
    transferPassed: false,
    validations: [],
    lastResult: false,
    lastAt: 0,
    enteredAt: t,
  };
}

export function getNodeMastery(p: UserProgress, nodeId: string): NodeMastery {
  return p.nodeMastery[nodeId] ?? freshNodeMastery(nodeId);
}

/**
 * 状态机计算：
 * - 从未验证 → new
 * - 有验证但全部未通过 → learning
 * - familiar 通过但 variation/transfer 未全过 → familiar（熟悉但不稳定）
 * - familiar+variation+transfer 全过 → mastered
 * - 曾经 mastered 但间隔复习验证失败 / 超过复习期限未复习 → unstable
 * - 变式或陌生场景最近失败 → unstable（不降回 learning，因为熟悉场景仍然会）
 */
export function computeMasteryState(nm: NodeMastery, nowTs: number): MasteryState {
  if (nm.familiarPassed && nm.variationPassed && nm.transferPassed) {
    // 已达成全验证；若最近一次验证失败，回退 unstable
    if (!nm.lastResult && nm.validations.length > 0) return 'unstable';
    return 'mastered';
  }
  if (nm.familiarPassed) {
    // 熟悉场景通过，但更高层验证未全过
    if (nm.validations.some((v) => v.kind !== 'familiar' && !v.correct)) return 'unstable';
    return 'familiar';
  }
  if (nm.validations.length > 0) return 'learning';
  return 'new';
}

/** 场景是否已经完成验证 */
export function scenePassed(nm: NodeMastery, kind: TransferSceneKind): boolean {
  if (kind === 'familiar') return nm.familiarPassed;
  if (kind === 'variation') return nm.variationPassed;
  return nm.transferPassed;
}

/**
 * 记录一次场景验证结果并重算状态。
 * 返回更新后的 NodeMastery 与是否发生状态变化。
 */
export function recordSceneValidation(
  nm: NodeMastery,
  kind: TransferSceneKind,
  correct: boolean,
  sessionId: string
): { nm: NodeMastery; changed: boolean } {
  const prevState = nm.state;
  const t = now();
  const validation: SceneValidation = { kind, correct, at: t, sessionId };
  nm.validations = [...nm.validations, validation].slice(-20);
  if (kind === 'familiar') nm.familiarPassed = nm.familiarPassed || correct;
  if (kind === 'variation') nm.variationPassed = nm.variationPassed || correct;
  if (kind === 'transfer') nm.transferPassed = nm.transferPassed || correct;
  nm.lastResult = correct;
  nm.lastAt = t;
  nm.state = computeMasteryState(nm, t);
  return { nm, changed: nm.state !== prevState };
}

/** 获取节点可用的下一个待验证场景（按 familiar → variation → transfer 顺序） */
export function nextPendingScene(scenes: TransferScene[] | undefined, nm: NodeMastery): TransferScene | null {
  if (!scenes || scenes.length === 0) return null;
  for (const kind of SCENE_ORDER) {
    if (scenePassed(nm, kind)) continue;
    const scene = scenes.find((s) => s.kind === kind);
    if (scene) return scene;
  }
  return null;
}

/** 把掌握状态映射为展示文案 */
export function masteryReason(nm: NodeMastery): string[] {
  const ok = (v: boolean) => (v ? '✓' : '✕');
  const reasons = [
    `熟悉案例 ${ok(nm.familiarPassed)}`,
    `变式案例 ${ok(nm.variationPassed)}`,
    `陌生案例 ${ok(nm.transferPassed)}`,
  ];
  return reasons;
}

export function masteryChecklist(nm: NodeMastery): { label: string; done: boolean }[] {
  return [
    { label: '熟悉案例', done: nm.familiarPassed },
    { label: '变式案例', done: nm.variationPassed },
    { label: '陌生案例', done: nm.transferPassed },
  ];
}

export function countMastered(p: UserProgress): number {
  return Object.values(p.nodeMastery).filter((n) => n.state === 'mastered').length;
}

export function countMasteryOf(p: UserProgress, state: MasteryState): number {
  return Object.values(p.nodeMastery).filter((n) => n.state === state).length;
}

export function transferSuccessRateOf(p: UserProgress): number {
  const all = Object.values(p.nodeMastery);
  const checked = all.filter((n) => n.transferPassed || n.validations.some((v) => v.kind === 'transfer'));
  if (checked.length === 0) return 0;
  const ok = checked.filter((n) => n.transferPassed).length;
  return ok / checked.length;
}
