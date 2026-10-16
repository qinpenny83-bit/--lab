import { readFileSync, writeFileSync } from 'node:fs';

const P = 'C:/Users/qinpei/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6aa7f4c708455455bde7b549/';
const t = readFileSync(P + 'public/assets/internal-organs.svg', 'utf8');

// 删除所有 <text ...>...</text> 标注（含嵌套 tspan）
const cleaned = t.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, '');

writeFileSync(P + 'public/assets/internal-organs-clean.svg', cleaned, 'utf8');
console.log('before=' + t.length + ' after=' + cleaned.length);

// 头部路径/尺寸确认
const vbox = cleaned.match(/viewBox="[^"]*"/)?.[0];
console.log('viewBox: ' + vbox);
const textLeft = (cleaned.match(/<text/g) || []).length;
console.log('remaining text tags=' + textLeft);
