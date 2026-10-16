// 扫描课程数据：校验内嵌 JSON 可解析性、章节单元覆盖、交互类型分布
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const files = [
  'src/data/curriculum/learningUnits.ts',
  'src/data/curriculum/stage5LearningUnits.ts',
  'src/data/curriculum/reasoningChallenges.ts',
  'src/data/curriculum/conceptComparisons.ts',
  'src/data/curriculum/knowledgeBridges.ts',
  'src/data/curriculum/learningCases.ts',
  'src/data/curriculum/graduationTrials.ts',
];

function unescapeJs(raw) {
  // 模拟 JS 字符串字面量的转义求值（TS 源码中的 '...' 字面量）
  return raw.replace(/\\(u\{[0-9a-fA-F]+\}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|n|t|r|b|f|v|'|"|\\|\/|0)/g, (_, esc) => {
    if (esc === 'n') return '\n';
    if (esc === 't') return '\t';
    if (esc === 'r') return '\r';
    if (esc === 'b') return '\b';
    if (esc === 'f') return '\f';
    if (esc === 'v') return '\v';
    if (esc === '0') return '\0';
    if (esc === "'" || esc === '"' || esc === '\\' || esc === '/') return esc;
    return esc; // \uXXXX / \xXX 保留原样交给 JSON.parse 处理
  });
}

function extractJsonStrings(src) {
  const out = [];
  // interactionData: '...' / "..." （含跨行）
  const re = /interactionData:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/gs;
  let m;
  while ((m = re.exec(src)) !== null) {
    const raw = m[1] ?? m[2] ?? '';
    out.push({ raw: unescapeJs(raw), line: src.slice(0, m.index).split('\n').length });
  }
  return out;
}

let bad = 0;
const unitCounts = new Map(); // chapterId -> count
const typeCounts = new Map();

for (const f of files) {
  const full = path.join(root, f);
  const src = readFileSync(full, 'utf8');
  const items = extractJsonStrings(src);
  for (const it of items) {
    try {
      JSON.parse(it.raw);
    } catch (e) {
      bad++;
      console.log(`❌ JSON 解析失败 ${f}:${it.line} → ${e.message}`);
      console.log(`   片段: ${it.raw.slice(0, 120)}`);
    }
  }
  // 统计学习单元章节与类型
  if (f.includes('learningUnits') || f.includes('stage5LearningUnits')) {
    const idRe = /id:\s*'([^']+)'/g;
    const chRe = /chapterId:\s*'([^']+)'/g;
    const tyRe = /type:\s*'([^']+)'/g;
    const ids = [...src.matchAll(idRe)].map((x) => x[1]);
    const chs = [...src.matchAll(chRe)].map((x) => x[1]);
    const tys = [...src.matchAll(tyRe)].map((x) => x[1]);
    chs.forEach((c) => unitCounts.set(c, (unitCounts.get(c) ?? 0) + 1));
    tys.forEach((t) => typeCounts.set(t, (typeCounts.get(t) ?? 0) + 1));
    console.log(`${f}: ${ids.length} 个单元, ${chs.length} 个章节引用, 类型分布:`, Object.fromEntries(tys.map((t) => [t, tys.filter((x) => x === t).length])));
  }
}

console.log(`\nJSON 校验: ${bad === 0 ? '✅ 全部通过' : `❌ ${bad} 处失败`}`);
console.log(`章节单元数:`, Object.fromEntries(unitCounts));
console.log(`全部类型分布:`, Object.fromEntries(typeCounts));
