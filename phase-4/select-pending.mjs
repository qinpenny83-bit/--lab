// 从 coverage-matrix.json 提取 pending 节点按领域分布，并输出 Batch-2 选题清单
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'phase-4');
const matrix = JSON.parse(readFileSync(join(OUT, 'coverage-matrix.json'), 'utf8'));

const pending = matrix.rows.filter((r) => r.status === 'pending');
const byDomain = {};
for (const r of pending) (byDomain[r.domain] ||= []).push(r);

console.log('pending total =', pending.length);
for (const [d, arr] of Object.entries(byDomain)) {
  console.log(`  领域 ${d.padStart(2)}: ${arr.length}  pending  [${arr.map((x) => x.nodeId).join(',')}]`);
}
writeFileSync(join(OUT, 'pending-list.json'), JSON.stringify({ total: pending.length, byDomain }, null, 2), 'utf8');
