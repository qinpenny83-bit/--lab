import { readFileSync } from 'node:fs';

const P = 'C:/Users/qinpei/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6aa7f4c708455455bde7b549/';
const t = readFileSync(P + 'public/assets/internal-organs.svg', 'utf8');
console.log('len=' + t.length);

const ids = [...t.matchAll(/<g[^>]*id="([^"]+)"/g)].map((m) => m[1]);
console.log('g ids: ' + ids.join(' | ').slice(0, 1000));

const texts = [...t.matchAll(/<text[^>]*>([^<]{0,40})/g)].slice(0, 50).map((m) => m[1]);
console.log('texts: ' + texts.join(' | ').slice(0, 600));
