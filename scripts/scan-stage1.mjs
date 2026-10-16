import { readFileSync } from 'node:fs';
const doc = JSON.parse(readFileSync('src/data/v33/all-nodes.json', 'utf8'));
const nodes = doc.nodes;

const STOP = new Set('的了是吗呢么啊吧呀哦嗯与和或及这那哪个哪些什么如何为何为什么能不能会会不会如果假设请想想说出说明说明一下可以吗怎样怎么样怎么'.split(''));

function tokens(text) {
  const out = [];
  const re = /[\u4e00-\u9fa5]{2,}|[A-Za-z][A-Za-z0-9+\-⁻⁺]*/g;
  let m;
  while ((m = re.exec(text))) out.push(m[0]);
  return out;
}
function prevText(n) {
  const lu = n.learningUnit ?? {};
  const kf = Array.isArray(n.keyFacts) ? n.keyFacts.map((f) => (typeof f === 'string' ? f : f?.fact ?? '')).join(' ') : '';
  return `${lu.knowledge ?? ''} ${n.stdJudgment ?? ''} ${n.coreDefinition ?? ''} ${kf} ${n.intent ?? ''}`;
}
function clean(w) {
  let s = w.replace(/[的了是么吗呢啊吧呀哦嗯与和或及这那哪个哪些什么如何为何为什么能不能会会不会如果假设请想想说出说明说明一下可以吗怎样怎么样怎么]+$/g, '');
  s = s.replace(/^[的了是么吗呢啊吧呀哦嗯与和或及这那哪个哪些什么如何为何为什么能不能会会不会如果假设请想想说出说明说明一下可以吗怎样怎么样怎么]+/g, '');
  return s;
}

// 只看 stage1 推理 + 迁移，输出供人工复核
const out = [];
for (const n of nodes) {
  if (n.stage !== 'stage1') continue;
  const lu = n.learningUnit ?? {};
  const prev = prevText(n);
  const prevTok = new Set(tokens(prev));
  const probes = [['推理', lu.reasoning ?? null], ['迁移', lu.transfer ?? null]];
  for (const [kind, text] of probes) {
    if (!text || typeof text !== 'string') continue;
    const tks = tokens(text).map(clean).filter((t) => t.length >= 2);
    if (!tks.length) continue;
    const un = tks.filter((t) => !prevTok.has(t));
    const ratio = un.length / tks.length;
    if (ratio >= 0.45 || text.length > 55) {
      out.push({ nodeId: n.nodeId, subject: n.subjectName, kind, ratio: Math.round(ratio * 100), len: text.length, unWords: un.slice(0, 8).join('/'), q: String(text).slice(0, 90) });
    }
  }
}
out.sort((a, b) => b.ratio - a.ratio);
console.log(`stage1 flagged: ${out.length}`);
for (const r of out) {
  console.log(`[${r.kind} ${r.ratio}%] ${r.nodeId}\n  题: ${r.q}`);
}
