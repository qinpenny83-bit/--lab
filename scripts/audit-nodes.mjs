// 分析 all-nodes.json：第六至八境节点数据完整性
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const doc = JSON.parse(readFileSync(join(__dirname, '../src/data/v33/all-nodes.json'), 'utf8'));
const nodes = doc.nodes;

for (const stage of ['stage6', 'stage7', 'stage8']) {
  const sn = nodes.filter((n) => n.stage === stage);
  const q = sn.filter((n) => n.status === 'quarantine');
  const usable = sn.filter((n) => n.status !== 'quarantine');
  const emptyDesc = usable.filter((n) => !n.description?.trim());
  const emptyKnow = usable.filter((n) => !n.learningUnit?.knowledge?.trim());
  const emptyReason = usable.filter((n) => !n.learningUnit?.reasoning?.trim());
  const emptyTransfer = usable.filter((n) => !n.learningUnit?.transfer?.trim());
  const emptyTrap = usable.filter((n) => !n.learningUnit?.commonTrap?.trim());
  const noKeyFacts = usable.filter((n) => !(n.learningUnit?.keyFacts ?? []).length);
  const emptyCore = usable.filter((n) => !n.coreDefinition?.trim());
  console.log(`\n=== ${stage} === 节点总数 ${sn.length}（隔离 ${q.length}，可用 ${usable.length}）`);
  console.log(`  空 description: ${emptyDesc.length}`);
  console.log(`  空 knowledge: ${emptyKnow.length}`);
  console.log(`  空 reasoning: ${emptyReason.length}`);
  console.log(`  空 transfer: ${emptyTransfer.length}`);
  console.log(`  空 commonTrap: ${emptyTrap.length}`);
  console.log(`  无 keyFacts: ${noKeyFacts.length}`);
  console.log(`  空 coreDefinition: ${emptyCore.length}`);
  if (emptyKnow.length) console.log(`  示例（空 knowledge）: ${emptyKnow.slice(0, 5).map((n) => n.nodeId).join(', ')}`);
}
