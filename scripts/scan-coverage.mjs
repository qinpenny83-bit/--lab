import { readFileSync } from 'node:fs';
const doc = JSON.parse(readFileSync('src/data/v33/all-nodes.json', 'utf8'));
const nodes = doc.nodes;

const STOP = new Set('的了是吗呢么啊吧呀哦嗯与和或及这那哪个哪些什么如何为何为什么能不能会会不会如果假设请想想说出说明说明一下可以吗怎样怎么样怎么'.split(''));

function tokens(text) {
  const out = [];
  // 连续中文串（>=2字）与连续英文/数字串
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

// 清洗词：去首尾虚词字符，太短的不要
function clean(w) {
  let s = w.replace(/[的了是么吗呢啊吧呀哦嗯与和或及这那哪个哪些什么如何为何为什么能不能会会不会如果假设请想想说出说明说明一下可以吗怎样怎么样怎么]+$/g, '');
  s = s.replace(/^[的了是么吗呢啊吧呀哦嗯与和或及这那哪个哪些什么如何为何为什么能不能会会不会如果假设请想想说出说明说明一下可以吗怎样怎么样怎么]+/g, '');
  return s;
}

const rows = [];
for (const n of nodes) {
  const lu = n.learningUnit ?? {};
  const prev = prevText(n);
  const prevTok = new Set(tokens(prev));
  const probes = [
    ['辨析', lu.discern?.statement ?? null],
    ['推理', lu.reasoning ?? null],
    ['迁移', lu.transfer ?? null],
  ];
  for (const [kind, text] of probes) {
    if (!text || typeof text !== 'string') continue;
    const tks = tokens(text).map(clean).filter((t) => t.length >= 2);
    if (tks.length === 0) continue;
    const un = tks.filter((t) => !prevTok.has(t));
    const ratio = un.length / tks.length;
    const hasForeign = tks.some((t) => /[A-Za-z0-9]/.test(t));
    // 疑似：未铺垫词占比高，或题目明显偏长（>35字）
    if (ratio >= 0.45 || text.length > 55) {
      rows.push({
        nodeId: n.nodeId, subject: n.subjectName, stage: n.stage, kind,
        ratio: Math.round(ratio * 100), len: text.length,
        unWords: un.slice(0, 8).join('/'),
        q: String(text).slice(0, 80),
      });
    }
  }
}

rows.sort((a, b) => (b.ratio * 10 + Math.min(b.len, 80)) - (a.ratio * 10 + Math.min(a.len, 80)));
console.log(`=== 疑似「前文无铺垫/偏长」题目数: ${rows.length} / 节点 ${nodes.length} ===`);
const byStage = {};
for (const r of rows) byStage[r.stage] = (byStage[r.stage] ?? 0) + 1;
console.log('按境分布:', JSON.stringify(byStage));
console.log('=== 明细 ===');
for (const r of rows) {
  console.log(`[${r.stage}|${r.subject}] ${r.nodeId} ${r.kind} 未铺垫${r.ratio}% 长${r.len}\n  缺词: ${r.unWords}\n  题: ${r.q}`);
}
