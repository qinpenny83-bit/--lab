import { readFileSync, writeFileSync } from 'fs';

const p = 'src/data/curriculum/learningUnits.ts';
const s = readFileSync(p, 'utf8');

// 匹配 interactionData 单引号字符串（不含反斜杠转义，此文件用直引号包中文）
const re = /interactionData:\s*\n?\s*'([^']*)'/g;

function fixInnerQuotes(json) {
  // 状态机：把 JSON 字符串值内部的 ASCII 直引号成对转成中文弯引号，
  // 结构引号（键/值的起止）保持不动。
  const out = [];
  let inStr = false;        // 是否处于 JSON 字符串（键或值）内部
  let expectOpen = true;    // 值内下一个内层引号是开引号还是闭引号
  for (let i = 0; i < json.length; i++) {
    const ch = json[i];
    if (ch !== '"') {
      out.push(ch);
      continue;
    }
    const prev = i > 0 ? json[i - 1] : '';
    const next = i + 1 < json.length ? json[i + 1] : '';
    if (!inStr) {
      // 字符串开引号（键或值起始）：保留
      out.push(ch);
      inStr = true;
      expectOpen = true; // 进入新字符串，内层引号从开引号开始
    } else {
      // 在字符串内部：判断是“字符串结束引号”还是“内层中文引号”
      if (next === ':' || next === ',' || next === '}' || next === ']') {
        // 结构闭合引号
        out.push(ch);
        inStr = false;
      } else {
        // 内层引号：成对转成弯引号
        out.push(expectOpen ? '\u201C' : '\u201D'); // “ / ”
        expectOpen = !expectOpen;
      }
    }
  }
  return out.join('');
}

let m, fixedCount = 0;
while ((m = re.exec(s)) !== null) {
  const raw = m[1];
  // 先结构化修复引号，再做 JSON 校验
  const fixed = fixInnerQuotes(raw);
  let validOriginal = true;
  try { JSON.parse(raw); } catch { validOriginal = false; }
  let validFixed = true;
  try { JSON.parse(fixed); } catch (e) { validFixed = false; console.log('STILL BROKEN after fix:', e.message, '| ', JSON.stringify(fixed.slice(-40))); }
  if (!validOriginal && validFixed) {
    // 应用到原文：把该 interactionData 的单引号内容替换
    s = s.replace("interactionData:\n      '" + raw + "'", "interactionData:\n      '" + fixed + "'");
    // 兼容不换行与不同缩进情形（幂等替换，用精确匹配兜底）
    s = s.replace("'" + raw + "'", "'" + fixed + "'");
    fixedCount++;
  }
}
writeFileSync(p, s, 'utf8');
console.log('fixed interactionData count =', fixedCount);

// 最终校验
const re2 = /interactionData:\s*\n?\s*'([^']*)'/g;
let mm, total = 0, broken = 0;
while ((mm = re2.exec(s)) !== null) {
  total++;
  try { JSON.parse(mm[1]); } catch (e) { broken++; console.log('REMAIN BROKEN:', e.message, JSON.stringify(mm[1].slice(-40))); }
}
console.log('final: total=' + total + ', broken=' + broken);
process.exit(broken === 0 ? 0 : 1);