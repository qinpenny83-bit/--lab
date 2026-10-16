import { readFileSync } from 'node:fs';
const src = readFileSync('src/data/v33/subjects.ts', 'utf8');
const rows = [...src.matchAll(/\{\s*"code":\s*"(\w+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"stage":\s*"(stage\d)"/g)];
const byStage = {};
for (const m of rows) {
  const st = m[3];
  (byStage[st] ??= []).push(`${m[1]} ${m[2]}`);
}
for (const st of ['stage1', 'stage2', 'stage3', 'stage4', 'stage5']) {
  console.log(`${st}: ${(byStage[st] ?? []).join(' | ')}`);
}
