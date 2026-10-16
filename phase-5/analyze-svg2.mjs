import { readFileSync } from 'node:fs';

const P = 'C:/Users/qinpei/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6aa7f4c708455455bde7b549/';
const t = readFileSync(P + 'public/assets/internal-organs.svg', 'utf8');

const tspans = [...t.matchAll(/<tspan[^>]*>([^<]{1,40})<\/tspan>/g)].slice(0, 60).map((m) => m[1]);
console.log('tspans: ' + tspans.join(' | ').slice(0, 800));

// 顶层 svg 属性
const svgHead = t.slice(0, 600).replace(/\s+/g, ' ');
console.log('head: ' + svgHead.slice(0, 400));

// 是否大量 text 标签
const textCount = (t.match(/<text/g) || []).length;
const tspanCount = (t.match(/<tspan/g) || []).length;
console.log('text tags=' + textCount + ' tspan tags=' + tspanCount);

// 器官可能以 fill 色区分？统计高频 fill
const fills = {};
for (const m of t.matchAll(/fill="(#?[0-9a-fA-F]{3,8}|[a-z]+)"/g)) fills[m[1]] = (fills[m[1]] || 0) + 1;
console.log('top fills: ' + Object.entries(fills).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([k, v]) => `${k}:${v}`).join(' '));
