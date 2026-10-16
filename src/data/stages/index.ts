// ============================================================
// V3：8 境体系索引文件
// 所有境界、模块、知识节点统一由此文件导出
// ============================================================
import type { KnowledgeNode, LearningStage, LearningModule } from '../../types/models';

// 按境分批导入
import * as s1 from './stage1';
import * as s2 from './stage2';
import * as s3 from './stage3';
import * as s4 from './stage4';
import * as s5 from './stage5';
import * as s6 from './stage6';
import * as s7 from './stage7';
import * as s8 from './stage8';

// 9 境定义（含第 0 境：小白）
export const STAGES: LearningStage[] = [
  s1.stageDef,
  s2.stageDef,
  s3.stageDef,
  s4.stageDef,
  s5.stageDef,
  s6.stageDef,
  s7.stageDef,
  s8.stageDef,
];

// 全部模块
export const ALL_MODULES: LearningModule[] = [
  ...s1.modules,
  ...s2.modules,
  ...s3.modules,
  ...s4.modules,
  ...s5.modules,
  ...s6.modules,
  ...s7.modules,
  ...s8.modules,
];

// 全部 V3 知识节点（含 V2 已有节点+新增节点）
export const ALL_V3_NODES: KnowledgeNode[] = [
  ...s1.nodes,
  ...s2.nodes,
  ...s3.nodes,
  ...s4.nodes,
  ...s5.nodes,
  ...s6.nodes,
  ...s7.nodes,
  ...s8.nodes,
];

// ---------- 工具函数 ----------

export function stageById(id: string): LearningStage | undefined {
  return STAGES.find((s) => s.id === id);
}

export function stageByOrder(order: number): LearningStage | undefined {
  return STAGES.find((s) => s.order === order);
}

export function modulesOfStage(stageId: string): LearningModule[] {
  return ALL_MODULES.filter((m) => m.stageId === stageId);
}

export function nodesOfStage(stageId: string): KnowledgeNode[] {
  return ALL_V3_NODES.filter((n) => n.v3?.stageId === stageId);
}

export function nodesOfModule(moduleId: string): KnowledgeNode[] {
  return ALL_V3_NODES.filter((n) => n.v3?.moduleId === moduleId);
}

export function v3NodeById(id: string): KnowledgeNode | undefined {
  return ALL_V3_NODES.find((n) => n.id === id);
}

/** 获取一个节点的前置知识节点列表 */
export function prereqNodes(nodeId: string): KnowledgeNode[] {
  const node = v3NodeById(nodeId);
  if (!node?.v3?.prerequisites.length) return [];
  return node.v3.prerequisites.map((id) => v3NodeById(id)).filter(Boolean) as KnowledgeNode[];
}

/** 获取一个节点的相关知识节点 */
export function relatedNodes(nodeId: string): KnowledgeNode[] {
  const node = v3NodeById(nodeId);
  if (!node?.v3?.relatedNodes.length) return [];
  return node.v3.relatedNodes.map((id) => v3NodeById(id)).filter(Boolean) as KnowledgeNode[];
}

/** 该境界是否可以被解锁（前置境界全部 completed） */
export function isStageUnlockable(stageId: string, completedStageIds: string[]): boolean {
  const stage = stageById(stageId);
  if (!stage) return false;
  return stage.prerequisites.every((pre) => completedStageIds.includes(pre));
}

/** 从 V2 节点 id 找到它所属的境界 */
export function stageOfNodeId(nodeId: string): LearningStage | undefined {
  const node = v3NodeById(nodeId);
  if (!node?.v3?.stageId) return undefined;
  return stageById(node.v3.stageId);
}

export const STAGE_COUNT = STAGES.length;

/** 所有 V3 节点 id 集合 */
export const ALL_V3_NODE_IDS: string[] = ALL_V3_NODES.map((n) => n.id);