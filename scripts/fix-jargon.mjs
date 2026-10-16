import { readFileSync, writeFileSync } from 'node:fs';

const p = 'src/data/v33/all-nodes.json';
const lines = readFileSync(p, 'utf8').split('\n');

// 定位 pb28-ac-001 节点起始行
const nodeIdx = lines.findIndex((l) => l.includes('"nodeId": "pb28-ac-001"'));
if (nodeIdx < 0) throw new Error('node not found');

const findAfter = (from, key) => {
  for (let i = from; i < lines.length; i++) {
    if (lines[i].includes(`"${key}":`)) return i;
  }
  throw new Error(`key ${key} not found after ${from}`);
};

const reasonIdx = findAfter(nodeIdx, 'reasoning');
const fbIdx = findAfter(nodeIdx, 'feedback');
const trIdx = findAfter(nodeIdx, 'transfer');

lines[reasonIdx] = '        "reasoning": "同样是细胞膜上镶嵌的蛋白质（膜蛋白），为什么通道蛋白能让离子像『顺水漂』一样快速过膜、一点力气都不费，而泵蛋白却要像『逆水划船』、还必须消耗ATP才能干活？想想刚刚学的『单纯扩散、易化扩散、主动转运』，答案就藏在『顺不顺水』里。",';
lines[fbIdx] = '        "feedback": "大白话版：核心是『顺水还是逆水』——通道蛋白开了一条亲水小门，离子顺着浓度差『顺水漂』过去，不耗能，这叫被动转运；泵蛋白要把离子从稀的地方搬到浓的地方，逆着浓度差硬顶，得烧ATP当燃料才行，这叫主动转运。记住一句话：顺水不费劲，逆水必耗能——方向决定耗不耗ATP。",';
lines[trIdx] = '        "transfer": "前文说过：线粒体是细胞的『燃料炉子』，负责烧出ATP；泵蛋白干活得烧ATP。现在假设氧气不够，炉子火不旺、ATP供应不上——泵蛋白没了燃料，你觉得细胞里的钠、钾离子还能维持住『一边浓一边稀』的浓度差吗？这会连累到哪些事？",';

writeFileSync(p, lines.join('\n'), 'utf8');
console.log('OK 替换完成:', [reasonIdx + 1, fbIdx + 1, trIdx + 1].join(', '));

// 校验 JSON 仍可解析
JSON.parse(readFileSync(p, 'utf8'));
console.log('JSON 校验通过');
