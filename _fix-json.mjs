import { readFileSync, writeFileSync } from 'fs';

const p = 'src/data/curriculum/stage5LearningUnits.ts';
let s = readFileSync(p, 'utf8');

// 用字符码精确构造，避免转义歧义
const BS = String.fromCharCode(0x5c); // 一个反斜杠
const Q = String.fromCharCode(0x22);  // 一个引号
const DOT = String.fromCharCode(0x3002); // 。
const BU = '\u4e0d\u8db3'; // 不足
const BDY = '\u4e0d\u7b49\u4e8e'; // 不等于

// 文件中的坏序列（字面量）：
//   不等于 + \\ + " + 不足 + \\ + " + 。 + \\ + " + }
const bad = BDY + BS + BS + Q + BU + BS + BS + Q + DOT + BS + BS + Q + '}';
// 修复后（去掉结尾多余的两个反斜杠，让最后一个引号成为 JSON 字符串的闭合引号）：
//   不等于 + \\ + " + 不足 + \\ + " + 。 + " + }
const good = BDY + BS + BS + Q + BU + BS + BS + Q + DOT + Q + '}';

if (!s.includes(bad)) {
  console.log('NEEDLE NOT FOUND — abort, no change');
  process.exit(1);
}

s = s.replace(bad, good);
writeFileSync(p, s, 'utf8');
console.log('FIXED unit 7 interactionData JSON ending');

// 额外校验：把文件里所有 interactionData 还原后是否能被 JSON.parse
const re = /interactionData:\s*\n?\s*'((?:[^'\\]|\\.)*)'/g;
let m;
let i = 0;
let fail = 0;
while ((m = re.exec(s)) !== null) {
  i++;
  const raw = m[1];
  // 还原 TS 单引号字符串转义：\\ -> \（此处数据只用到了 \\ 这一种转义）
  const restored = raw.replace(/\\(.)/g, '$1');
  try {
    JSON.parse(restored);
  } catch (e) {
    fail++;
    console.log('STILL BROKEN #' + i + ': ' + e.message);
    const t = raw.slice(-40);
    console.log('  tail(repr): ' + JSON.stringify(t));
  }
}
console.log('interactionData total=' + i + ', broken=' + fail);
process.exit(fail === 0 ? 0 : 1);