// ============================================================
// 杏林大典 · 33 学科知识池 · 统一出口（loader）
// 事实源：phase-5/learning-system/*.json（由 build-v33-frontend.mjs 同步到本目录）
// 用途：33 学科知识库 / 学习路径 / 掌握画像 / 今日修炼的只读数据源
// ============================================================
import type {
  V33AllNodesDoc,
  V33LearningPathDoc,
  V33MasteryMapDoc,
  V33DailyPracticeDoc,
  V33ProductionDashboardDoc,
  V33FinalAuditDoc,
  V33SubjectRow,
  V33Node,
} from '../../types/v33';

import allNodesJson from './all-nodes.json';
import learningPathJson from './learning-path.json';
import masteryMapJson from './mastery-map.json';
import dailyPracticeJson from './daily-practice.json';
import productionDashboardJson from './production-dashboard.json';
import finalAuditJson from './final-audit.json';

/** 455 全节点结构化数据（含学习单元八要素） */
export const v33AllNodesDoc = allNodesJson as V33AllNodesDoc;
/** 33 学科 × 5 关卡知识地图 */
export const v33LearningPath = learningPathJson as V33LearningPathDoc;
/** 初始掌握画像（唯一能力事实源） */
export const v33MasteryMap = masteryMapJson as V33MasteryMapDoc;
/** 今日修炼推荐 */
export const v33DailyPractice = dailyPracticeJson as V33DailyPracticeDoc;
/** 生产异常仪表盘 */
export const v33ProductionDashboard = productionDashboardJson as V33ProductionDashboardDoc;
/** 最终审计报告 */
export const v33FinalAudit = finalAuditJson as V33FinalAuditDoc;

import { v33Subjects, v33Totals } from './subjects';

export { v33Subjects, v33Totals };

// ---------- 查询辅助 ----------
const nodeIndex = new Map<string, V33Node>();
for (const n of v33AllNodesDoc.nodes) nodeIndex.set(n.nodeId, n);

/** 通过 nodeId 查找节点 */
export function v33NodeByNodeId(nodeId: string): V33Node | undefined {
  return nodeIndex.get(nodeId);
}

/** 某学科全部节点 */
export function v33NodesBySubject(code: string): V33Node[] {
  return v33AllNodesDoc.nodes.filter((n) => n.subject === code);
}

/** 通过学科代码查找学科 */
export function v33SubjectByCode(code: string): V33SubjectRow | undefined {
  return v33Subjects.find((s) => s.code === code);
}

/** 覆盖概览：总数 + 状态分布 + 33 学科逐科覆盖 */
export function v33CoverageSummary() {
  return {
    total: v33AllNodesDoc.total,
    candidate: v33AllNodesDoc.stats.candidate,
    conditional: v33AllNodesDoc.stats.conditional,
    quarantine: v33AllNodesDoc.stats.quarantine,
    missingSample: v33AllNodesDoc.stats.missingSample,
    missingVerdict: v33AllNodesDoc.stats.missingVerdict,
    subjects: v33Subjects,
  };
}

export const V33_TOTAL_NODES = v33AllNodesDoc.total;
export const V33_SUBJECT_COUNT = v33Subjects.length;
