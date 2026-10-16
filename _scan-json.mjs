import { readFileSync } from 'fs';

// 扫描两个学习单元文件中所有 interactionData 单引号字符串，还原 TS 转义后做 JSON 校验
const files = [
  'src/data/curriculum/learningUnits.ts',
  'src/data/curriculum/stage5LearningUnits.ts',
];
let grandFail = 0;
for (const p of files) {
  const s = readFileSync(p, 'utf8');
  const re = /interactionData:\s*\n?\s*'((?:[^'\\]|\\.)*)'/g;
  let m, i = 0, fail = 0;
  while ((m = re.exec(s)) !== null) {
    i++;
    const raw = m[1];
    // 还原 TS 单引号字符串里的反斜杠转义（数据里只用到 \\ 这一种，即 \\ -> \; \" 在这里不出现于 stage5 之外的源文件）
    const restored = raw.replace(/\\(.)/g, '$1');
    try {
      JSON.parse(restored);
    } catch (e) {
      fail++;
      grandFail++;
      console.log(p + ' interactionData #' + i + ' BROKEN: ' + e.message);
      console.log('  tail=' + JSON.stringify(raw.slice(-45)));
    }
  }
  console.log(p + ' -> total=' + i + ', broken=' + fail);
}
console.log(grandFail === 0 ? 'ALL VALID' : 'FOUND ' + grandFail + ' BROKEN');
process.exit(grandFail === 0 ? 0 : 1);