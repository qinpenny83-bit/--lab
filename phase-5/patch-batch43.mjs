import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const P = process.cwd();
const bpPath = join(P, 'phase-5', 'blueprint-map.mjs');
const blPath = join(P, 'phase-5', 'build-learning-v33.mjs');

let bp = readFileSync(bpPath, 'utf8');
if (!bp.includes('target: [160, 185]')) {
  bp = bp.replace('target: [130, 155]', 'target: [160, 185]');
  writeFileSync(bpPath, bp, 'utf8');
  console.log('blueprint A target -> [160,185]');
} else {
  console.log('blueprint A target already updated');
}

let bl = readFileSync(blPath, 'utf8');
const has43 = bl.includes("'batch-43'");
if (!has43) {
  // 1) batch-43 samples push（在 batch-42 push 块后追加）
  const anchor = "const b42 = JSON.parse(readFileSync(join(__dirname, 'batch-42', 'samples.json'), 'utf8')).samples;\n  push(b42);";
  if (!bl.includes(anchor)) throw new Error('anchor b42 not found');
  const insert = anchor + "\n}\n{\n  const b43 = JSON.parse(readFileSync(join(__dirname, 'batch-43', 'samples.json'), 'utf8')).samples;\n  push(b43);";
  bl = bl.replace(anchor, insert);
  // 2) verdict 目录列表追加 batch-43
  bl = bl.replace("'phase-5/batch-42'", "'phase-5/batch-42', 'phase-5/batch-43'");
  // 3) rank 函数前置 pb43 分支
  bl = bl.replace('(/^pb42-/.test(id) ? 42 :', '(/^pb43-/.test(id) ? 43 : /^pb42-/.test(id) ? 42 :');
  writeFileSync(blPath, bl, 'utf8');
  console.log('build-learning-v33.mjs: batch-43 wired (push/verdict/rank)');
} else {
  console.log('build-learning-v33.mjs already has batch-43');
}
