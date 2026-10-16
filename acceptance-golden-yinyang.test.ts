// ============================================================
// 🌿 杏林修炼场 · 黄金关卡「☯️ 阴阳探索」验收（G01 ～ G14）
// 原则：只验证「真实数据 / 真实引擎 / 真实源码」中的结构不变式，
//       不伪造、不迎合、不把截图当测试。桌面与 390px 的最终观感
//       仍需浏览器人工复核（见最终交付说明）。
// 运行：npx esbuild acceptance-golden-yinyang.test.ts --bundle --platform=node --format=esm --outfile=acceptance-golden-yinyang.test.mjs && node acceptance-golden-yinyang.test.mjs
// ============================================================

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const mem = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const START = new Date(2026, 5, 1, 12, 0, 0).getTime();
const clock = await import('./src/engine/clock');
clock.useManualClock(START);

const golden = await import('./src/data/golden/yinYangLevel');
const data = await import('./src/data');
const stages = await import('./src/data/stages');
const store = await import('./src/store/progress');

const srcPath = (rel: string) => join(process.cwd(), rel);
const readSrc = (rel: string) => readFileSync(srcPath(rel), 'utf8');

// ---- 断言框架 ----
let pass = 0;
let fail = 0;
const failures: string[] = [];
function check(name: string, cond: boolean, detail = '') {
  if (cond) {
    pass++;
    console.log(`  ✅ ${name}`);
  } else {
    fail++;
    failures.push(`${name} ${detail}`);
    console.log(`  ❌ ${name} ${detail}`);
  }
}

const intro = golden.GOLDEN_LEVEL_INTRO;
const nodes = golden.GOLDEN_YINYANG_NODES;
const discovery = golden.GOLDEN_DISCOVERY;
const caseData = golden.GOLDEN_CASE;
const paradox = golden.GOLDEN_PARADOX;
const judge = golden.GOLDEN_JUDGE;
const transfer = golden.GOLDEN_TRANSFER;
const summary = golden.GOLDEN_SUMMARY;
const stepNode = golden.GOLDEN_STEP_NODE;

// ============================================================
console.log('\n== G01 首屏 3 秒回答「我在哪 / 我学什么 / 为什么学」 =====');
check('G01a 我在哪（第一境·阴阳）', intro.realm.length > 0 && intro.realm.includes('阴阳'));
check('G01b 我学什么（看懂阴阳）', intro.topic.length > 0);
check('G01c 学完我会什么 ≥4 条能力', intro.abilities.length >= 4);
check('G01d 为什么值得学（核心悬念）', intro.hook.length > 0);

// ============================================================
console.log('\n== G02 前 3 分钟至少一次「现象 → 观察 → 发现」 ==========');
check('G02a 第一步是「先发现」', nodes[0]?.kind === 'discover');
check('G02b 有生活现象', discovery.scenario.length > 0);
check('G02c 允许用户先观察（多选项）', discovery.views.length >= 2);
check('G02d 有「发现」揭示', discovery.revealTitle.length > 0 && discovery.reveal.length > 0);

// ============================================================
console.log('\n== G03 第一次判断记录线索 / 关键线索 / 理由（非单选） ====');
check('G03a 线索 ≥3 条', caseData.clues.length >= 3);
check('G03b 关键线索存在且在线索中', caseData.clues.some((c) => c.id === caseData.keyClueId));
check('G03c 第一步问「注意到什么」', caseData.noticePrompt.length > 0);
check('G03d 第二步问「哪个更关键」', caseData.keyPrompt.length > 0);
check('G03e 第三步问「为什么」且有理由选项', caseData.reasonPrompt.length > 0 && caseData.reasonOptions.length >= 2);
check('G03f 最佳关键线索与理由都在选项内', caseData.clues.some((c) => c.id === caseData.keyClueId) && caseData.reasonOptions.some((r) => r.id === caseData.bestReasonId));

// ============================================================
console.log('\n== G04 主观判断后给出参考判断 ===========================');
for (const [label, ref] of [['案例', caseData.reference], ['判断', judge.reference], ['迁移', transfer.reference]] as const) {
  check(`G04-${label} 有参考结论`, ref.conclusion.length > 0);
  check(`G04-${label} 有关键依据 ≥2`, ref.keyBasis.length >= 2);
  check(`G04-${label} 有最关键线索`, ref.keyClue.length > 0);
  check(`G04-${label} 有差异说明`, ref.deviation.length > 0);
}

// ============================================================
console.log('\n== G05 答错后完整五段式复盘 =============================');
const caseSrc = readSrc('src/components/golden/CaseDetective.tsx');
check('G05a ① 你注意到了什么', caseSrc.includes('你刚才注意到了什么'));
check('G05b ② 你忽略了什么', caseSrc.includes('但你忽略了什么'));
check('G05c ③ 为什么这个线索更重要', caseSrc.includes('为什么这个线索更重要'));
check('G05d ④ 反事实追问', caseSrc.includes('判断还成立吗'));
check('G05e ⑤ 重新判断', caseSrc.includes('重新判断'));
check('G05f 有「一句话带走」', caseData.takeaway.length > 0);

// ============================================================
console.log('\n== G06 至少一个真正的反直觉知识点 =======================');
check('G06a 反直觉 1（相对性）', paradox.question.length > 0 && paradox.revealTitle.length > 0 && paradox.reveal.length > 0);
check('G06b 反直觉 1 有参考选项', paradox.options.some((o) => o.isReference));
check('G06c 反直觉 2（怕冷≠阴）', judge.question.length > 0 && judge.options.some((o) => o.isReference));

// ============================================================
console.log('\n== G07 至少一个案例侦探 ===============================');
check('G07a 有案例场景', caseData.scenario.length > 0);
check('G07b 有多线索 + 关键线索', caseData.clues.length >= 3 && !!caseData.keyClueId);

// ============================================================
console.log('\n== G08 至少一次迁移 ===================================');
check('G08a 有换情境引入', transfer.intro.length > 0);
check('G08b 有迁移题 + 参考', transfer.question.length > 0 && transfer.options.length >= 2 && transfer.reference.conclusion.length > 0);
check('G08c 迁移指向「观察方式」而非答案', transfer.takeaway.includes('观察方式'));

// ============================================================
console.log('\n== G09 完成页突出「获得的能力」而非 XP/徽章 =============');
check('G09a 能力清单 ≥4 条', summary.abilities.length >= 4);
check('G09b 能力含「关系思维」语义', summary.abilities.some((a) => a.includes('关系') || a.includes('症状') || a.includes('标签')));
check('G09c 有解锁提示（知识/能力解锁）', summary.unlocks.length >= 1);

// ============================================================
console.log('\n== G10 至少一条经过验证的经典原文 =====================');
const classic = data.findClassic(summary.classicId);
check('G10a 经典引用可解析', !!classic);
if (classic) {
  check('G10b 原文非空且为内经原文', classic.original.includes('阴阳者'));
  check('G10c 有书名与白话', classic.book.length > 0 && classic.plain.length > 0);
}
check('G10d 课程解释三层分离（原文/白话/今解）', summary.classicToday.length > 0 && !!classic?.plain);

// ============================================================
console.log('\n== G11 从地图进入黄金关卡的路径清晰 ===================');
const appSrc = readSrc('src/App.tsx');
const journeySrc = readSrc('src/pages/JourneyPage.tsx');
check('G11a 注册了 /golden/yinyang 路由', appSrc.includes('/golden/yinyang'));
check('G11b 第一境有入口按钮', journeySrc.includes("stage.id === 'stage1'") && journeySrc.includes("navigate('/golden/yinyang')"));
check('G11c 8 个节点顺序 1..8', nodes.length === 8 && nodes.every((n, i) => n.order === i + 1));
check('G11d 每个步骤映射到真实知识节点', Object.values(stepNode).every((id) => !!stages.v3NodeById(id)));

// ============================================================
console.log('\n== G12 Desktop 正常（结构层面） =======================');
const cssSrc = readSrc('src/pages/golden-yinyang.css');
check('G12a 关卡样式文件存在', cssSrc.length > 0);
check('G12b 顶层容器限制宽度（桌面不溢出）', cssSrc.includes('.gl-page') && /max-width:\s*\d+px/.test(cssSrc));

// ============================================================
console.log('\n== G13 390px Mobile 正常（结构层面） ===================');
check('G13a 提供 ≤430px 移动断点（覆盖 390px）', cssSrc.includes('@media (max-width: 430px)'));
check('G13b 移动断点内做水平内边距适配', /\.gl-page\s*\{[\s\S]*?padding-left/.test(cssSrc));

// ============================================================
console.log('\n== G14 现有数据/引擎未被破坏 ==========================');
check('G14a 八境仍在', stages.STAGES.length === 8);
check('G14b 数据 schemaVersion 仍为 3', store.defaultProgress().schemaVersion === 3);
check('G14c 八境进度结构完整', Object.keys(store.defaultProgress().stageProgress).length === 8);
check('G14d 阴阳四节点可解析', ['v3-s1-n7', 'v3-s1-n8', 'v3-s1-n9', 'v3-s1-n10'].every((id) => !!stages.v3NodeById(id)));
store.resetProgress();
store.completeLearningUnit({ unitId: 'golden-yy-01', nodeId: 'v3-s1-n7', topic: 'yinYang', correct: null });
check('G14e 结算仍写回真实进度', store.getProgress().completedUnits.includes('golden-yy-01'));

// ============================================================
console.log('\n============================================');
console.log(`  黄金关卡验收结果：${pass} 通过 / ${fail} 失败`);
if (fail) {
  console.log('  失败项：');
  failures.forEach((f) => console.log('    - ' + f));
  process.exit(1);
} else {
  console.log('  ✨ 全部通过（结构不变式）');
}