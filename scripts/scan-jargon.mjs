import { readFileSync } from 'node:fs';
const doc = JSON.parse(readFileSync('src/data/v33/all-nodes.json', 'utf8'));
const nodes = doc.nodes;

// 前文文本（学习步能看到的）：knowledge + stdJudgment + coreDefinition + keyFacts
function prevText(n) {
  const kf = Array.isArray(n.keyFacts) ? n.keyFacts.map((f) => f?.fact ?? f?.text ?? '').join(' ') : '';
  return `${n.knowledge ?? ''} ${n.stdJudgment ?? ''} ${n.coreDefinition ?? ''} ${kf}`;
}

// 常见专业术语/难词表（启发式扫描用）
const hardTerms = [
  'ATP', '膜蛋白', '通道蛋白', '泵蛋白', '电位', '转运体', '内质网', '溶酶体', '高尔基体',
  '线粒体', '氧化磷酸化', '三羧酸', '磷脂双分子层', '静息电位', '受体', '第二信使',
  '细胞骨架', '微管', '微丝', '端粒', '表观遗传', '顺式', '反式', '转录因子', '启动子',
];

// 统计：每个学科里 reasoning/transfer 命中难词且前文未覆盖的题
const bySubject = {};
let flagged = [];
for (const n of nodes) {
  if (!n.learningUnit) continue;
  const prev = prevText(n);
  const probes = [['reasoning', n.learningUnit.reasoning], ['transfer', n.learningUnit.transfer], ['discern', n.learningUnit.discern?.statement ?? n.learningUnit.discern]];
  for (const [kind, text] of probes) {
    if (!text) continue;
    const hit = hardTerms.filter((t) => text.includes(t) && !prev.includes(t));
    if (hit.length) {
      flagged.push({ nodeId: n.nodeId, subject: n.subjectName, topic: n.topic, kind, term: hit.join('/'), q: String(text).slice(0, 60) });
      const s = n.subjectName ?? '?';
      bySubject[s] = (bySubject[s] ?? 0) + 1;
    }
  }
}

console.log('=== 命中难词且前文未覆盖的题目数:', flagged.length, '===');
console.log('=== 按学科分布 ===');
for (const [s, c] of Object.entries(bySubject).sort((a, b) => b[1] - a[1])) console.log(`  ${s}: ${c}`);
console.log('=== 明细（前 40 条）===');
for (const f of flagged.slice(0, 40)) {
  console.log(`  [${f.subject}] ${f.nodeId} ${f.kind} 缺:${f.term}\n    题:${f.q}`);
}
