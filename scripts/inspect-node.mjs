import { readFileSync } from 'node:fs';
const doc = JSON.parse(readFileSync('src/data/v33/all-nodes.json', 'utf8'));
const nodes = doc.nodes;
// 找 reasoning + feedback 都较丰富的节点做样例
const rich = nodes
  .filter((n) => n.learningUnit?.reasoning && n.learningUnit?.feedback && n.learningUnit?.reasoning.length > 20)
  .slice(0, 3);
for (const n of rich) {
  console.log('='.repeat(60));
  console.log('nodeId:', n.nodeId, '| subject:', n.subjectName, '| topic:', n.topic);
  console.log('intent:', n.intent);
  console.log('stdJudgment:', n.stdJudgment);
  console.log('coreDefinition:', n.coreDefinition);
  console.log('reasoning:', n.learningUnit.reasoning);
  console.log('feedback:', n.learningUnit.feedback);
  console.log('transfer:', n.learningUnit.transfer);
  console.log('knowledge(前120字):', (n.learningUnit.knowledge ?? '').slice(0, 120));
  console.log('cases:', JSON.stringify(n.cases ?? null).slice(0, 150));
}
