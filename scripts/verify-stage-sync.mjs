// 验证 syncStageProgress 派生规则（模拟实现，与 src/store/progress.ts 逻辑一一对应）
// 用法：node scripts/verify-stage-sync.mjs

const STAGES = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  id: `stage${n}`,
  prerequisites: n === 1 ? [] : [`stage${n - 1}`],
}));

// 每境模拟 5 个节点（真实 v33 每境均有学科节点）
const NODES = Object.fromEntries(STAGES.map((s) => [s.id, Array.from({ length: 5 }, (_, i) => `${s.id}-n${i + 1}`)]));

function syncStageProgress(p) {
  const spMap = p.stageProgress;
  const completed = [];
  for (const stage of STAGES) {
    const nodes = NODES[stage.id];
    const total = nodes.length;
    const mastered = nodes.filter((n) => p.nodeMastery[n]?.state === 'mastered').length;
    const familiar = nodes.filter((n) => ['familiar', 'mastered', 'unstable'].includes(p.nodeMastery[n]?.state)).length;
    const touched = nodes.some((n) => (p.nodeMastery[n]?.validations?.length ?? 0) > 0);
    const prevDone = stage.prerequisites.every((pre) => completed.includes(pre));

    let state;
    if (total > 0 && mastered === total && prevDone) state = 'completed';
    else if (prevDone && touched) state = 'learning';
    else if (prevDone) state = 'unlocked';
    else state = 'locked';

    // 只升不降保护
    const prev = spMap[stage.id];
    const prevState = prev?.state;
    if (state === 'locked' && prevState && prevState !== 'locked' && prevState !== 'unstable') {
      state = prevState === 'completed' || prevState === 'mastered' ? 'learning' : 'unlocked';
    }

    if (state === 'completed') completed.push(stage.id);
    spMap[stage.id] = { stageId: stage.id, state, masteredNodeCount: mastered, totalNodeCount: total, familiarNodeCount: familiar };
  }

  const cur = STAGES.find((s) => ['unlocked', 'learning', 'familiar', 'unstable'].includes(spMap[s.id]?.state));
  if (cur) p.currentStageId = cur.id;
}

function fresh() {
  return {
    nodeMastery: {},
    stageProgress: Object.fromEntries(STAGES.map((s) => [s.id, { stageId: s.id, state: s.prerequisites.length ? 'locked' : 'unlocked', masteredNodeCount: 0, totalNodeCount: 5, familiarNodeCount: 0 }])),
    currentStageId: 'stage1',
  };
}

let pass = 0;
let fail = 0;
function check(name, got, want) {
  const ok = got === want;
  ok ? pass++ : fail++;
  console.log(`${ok ? '✅' : '❌'} ${name}: 期望 ${want}，实际 ${got}`);
}

// 场景 1：全新用户 —— 第一境 unlocked，其余 locked
{
  const p = fresh();
  syncStageProgress(p);
  check('S1 新用户第一境', p.stageProgress.stage1.state, 'unlocked');
  check('S1 新用户第二境', p.stageProgress.stage2.state, 'locked');
  check('S1 当前境界', p.currentStageId, 'stage1');
}

// 场景 2：第一境学 1 个节点（有验证记录但未掌握）→ learning
{
  const p = fresh();
  p.nodeMastery['stage1-n1'] = { state: 'learning', validations: [{}] };
  syncStageProgress(p);
  check('S2 学一个节点后第一境', p.stageProgress.stage1.state, 'learning');
  check('S2 第二境仍未解锁', p.stageProgress.stage2.state, 'locked');
}

// 场景 3：第一境全掌握 → completed，第二境 unlocked
{
  const p = fresh();
  for (const n of NODES.stage1) p.nodeMastery[n] = { state: 'mastered', validations: [{}] };
  syncStageProgress(p);
  check('S3 全掌握第一境', p.stageProgress.stage1.state, 'completed');
  check('S3 第二境解锁', p.stageProgress.stage2.state, 'unlocked');
  check('S3 第三境仍锁', p.stageProgress.stage3.state, 'locked');
  check('S3 当前境界跳第二境', p.currentStageId, 'stage2');
}

// 场景 4：第二境学 1 节点 → learning；全掌握 → completed → 第三境 unlocked
{
  const p = fresh();
  for (const n of NODES.stage1) p.nodeMastery[n] = { state: 'mastered', validations: [{}] };
  p.nodeMastery['stage2-n1'] = { state: 'familiar', validations: [{}] };
  syncStageProgress(p);
  check('S4 第二境学习中', p.stageProgress.stage2.state, 'learning');
  for (const n of NODES.stage2) p.nodeMastery[n] = { state: 'mastered', validations: [{}] };
  syncStageProgress(p);
  check('S4 第二境通关', p.stageProgress.stage2.state, 'completed');
  check('S4 第三境解锁', p.stageProgress.stage3.state, 'unlocked');
  check('S4 当前境界跳第三境', p.currentStageId, 'stage3');
}

// 场景 5：只升不降 —— 第一境曾通关后数据回退，不应被回锁
{
  const p = fresh();
  for (const n of NODES.stage1) p.nodeMastery[n] = { state: 'mastered', validations: [{}] };
  syncStageProgress(p); // stage1 completed, stage2 unlocked
  // 模拟掌握衰退：第一境节点状态全部清空
  p.nodeMastery = {};
  syncStageProgress(p);
  check('S5 数据回退后第一境不回锁', p.stageProgress.stage1.state, 'unlocked');
  check('S5 数据回退后第二境不回锁', p.stageProgress.stage2.state, 'unlocked');
}

// 场景 6：连闯 1→2→3→4，第五境在第四境通关后解锁（小白走查目标）
{
  const p = fresh();
  for (let s = 1; s <= 4; s++) {
    for (const n of NODES[`stage${s}`]) p.nodeMastery[n] = { state: 'mastered', validations: [{}] };
    syncStageProgress(p);
  }
  check('S6 第四境通关', p.stageProgress.stage4.state, 'completed');
  check('S6 第五境解锁', p.stageProgress.stage5.state, 'unlocked');
  check('S6 当前境界第五境', p.currentStageId, 'stage5');
}

console.log(`\n结果：${pass} 通过，${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
