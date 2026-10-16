import { readFileSync } from 'node:fs';

// 1) 统计每境可修炼节点数（与 V33_NODES_BY_STAGE 口径一致：排除隔离）
const nodesDoc = JSON.parse(readFileSync('src/data/v33/all-nodes.json', 'utf8'));
const nodes = nodesDoc.nodes.filter((n) => n.status !== 'quarantine');
const perStage = {};
for (const n of nodes) {
  const st = n.subject?.stage ?? n.stage;
  if (st) perStage[st] = (perStage[st] ?? 0) + 1;
}
console.log('每境可修炼节点数:', JSON.stringify(perStage));
const stage1 = perStage.stage1 ?? 0;

// 2) 模拟 syncStageProgress 判定逻辑
function stateOf(stageId, masteredByStage, touchedByStage, stageProgress) {
  const total = perStage[stageId] ?? 0;
  const mastered = masteredByStage[stageId] ?? 0;
  const touched = touchedByStage[stageId] ?? 0;
  const prevDone = (['stage2','stage3','stage4','stage5','stage6','stage7','stage8'].includes(stageId)
    ? prevStageDone(stageById(stageId).prerequisites[0], masteredByStage, stageProgress)
    : true);
  const passLine = total > 0 ? Math.ceil(total * 0.7) : 0;
  let state;
  if (total > 0 && mastered >= passLine && prevDone) state = 'completed';
  else if (prevDone && touched > 0) state = 'learning';
  else if (prevDone) state = 'unlocked';
  else state = 'locked';
  const prev = stageProgress[stageId]?.state;
  if (state === 'locked' && prev && prev !== 'locked' && prev !== 'unstable') {
    state = prev === 'completed' || prev === 'mastered' ? 'learning' : 'unlocked';
  }
  return state;
}
function prevStageDone(preId, masteredByStage, stageProgress) {
  const st = stageProgress[preId]?.state;
  if (st === 'completed' || st === 'mastered') return true;
  const preNodes = perStage[preId] ?? 0;
  if (preNodes === 0) return true;
  return (masteredByStage[preId] ?? 0) >= Math.ceil(preNodes * 0.3);
}
function stageById(id) {
  const order = { stage1: 1, stage2: 2, stage3: 3, stage4: 4, stage5: 5, stage6: 6, stage7: 7, stage8: 8 };
  return { id, prerequisites: order[id] > 1 ? [Object.keys(order).find((k) => order[k] === order[id] - 1)] : [] };
}

// 3) 场景模拟
function scenario(name, masteredByStage, touchedByStage = {}, prevProgress = {}) {
  const sp = {};
  for (const sid of Object.keys(perStage)) {
    sp[sid] = { state: stateOf(sid, masteredByStage, touchedByStage, { ...prevProgress, ...sp }) };
  }
  const line = Object.entries(sp).map(([k, v]) => `${k}:${v.state.slice(0, 4)}`).join(' ');
  console.log(`${name} → ${line}`);
}

console.log('--- 场景验证 ---');
scenario('新用户(0掌握)', {});
scenario('第一境学1节点', { stage1: 1 }, { stage1: 1 });
scenario('第一境掌握30%', { stage1: Math.ceil(stage1 * 0.3) }, { stage1: 30 });
scenario('第一境掌握70%', { stage1: Math.ceil(stage1 * 0.7) }, { stage1: 80 });
const s1_70 = Math.ceil(stage1 * 0.7);
scenario('一境70%+二境学1', { stage1: s1_70, stage2: 1 }, { stage1: 80, stage2: 1 });
scenario('一境70%+二境30%', { stage1: s1_70, stage2: Math.ceil((perStage.stage2 ?? 0) * 0.3) }, { stage1: 80, stage2: 30 });
const s2_70 = Math.ceil((perStage.stage2 ?? 0) * 0.7);
scenario('一二境70%', { stage1: s1_70, stage2: s2_70 }, { stage1: 80, stage2: 80 });
// 只升不降：一境曾达70%解锁二境，后掌握回落也不回锁
const prev = { stage2: { state: 'unlocked' } };
scenario('回退保护(二境曾解锁)', { stage1: 5 }, { stage1: 5 }, prev);
// 全掌握仍通关
scenario('一境全掌握', { stage1: stage1 }, { stage1: 100 });
