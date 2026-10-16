// Batch-41 U/V/W/X 验证脚本：导入长度 / 标题唯一 / stdJudgment 唯一 / 质量门 / 难度分布
import { pathToFileURL } from 'url';
const base = 'C:/Users/qinpei/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6aa7f4c708455455bde7b549/phase-5/batch-41/';
(async () => {
  const U = (await import(pathToFileURL(base + 'samples-part-u.mjs').href)).PART_U;
  const V = (await import(pathToFileURL(base + 'samples-part-v.mjs').href)).PART_V;
  const W = (await import(pathToFileURL(base + 'samples-part-w.mjs').href)).PART_W;
  const X = (await import(pathToFileURL(base + 'samples-part-x.mjs').href)).PART_X;
  const all = { U, V, W, X };
  let fail = 0;
  const diffMap = { U: {}, V: {}, W: {}, X: {} };
  for (const [k, arr] of Object.entries(all)) {
    console.log(`${k}: length=${arr.length}`);
    if (arr.length !== 10) { fail++; console.log(`  !! ${k} 长度非10`); }
    const ids = arr.map(n => n.id);
    if (new Set(ids).size !== ids.length) { fail++; console.log(`  !! ${k} id 重复`); }
    const titles = arr.map(n => n.title);
    if (new Set(titles).size !== titles.length) { fail++; console.log(`  !! ${k} title 重复`); }
    for (const n of arr) diffMap[k][n.difficulty] = (diffMap[k][n.difficulty] || 0) + 1;
  }
  console.log('难度分布(1简单/2中等/3困难/4易混/5综合):', diffMap);
  const allTitles = [U, V, W, X].flat().map(n => n.title);
  if (new Set(allTitles).size !== allTitles.length) { fail++; console.log('!! 40 个 title 存在跨文件重复'); }
  const js = [U, V, W, X].flat().map(n => n.stdJudgment);
  if (new Set(js).size !== js.length) { fail++; console.log('!! stdJudgment 存在重复'); }
  const blacklist = ['请根据所学知识','综合考虑','由此可知','需要注意的是','通过以上分析','综上所述','总而言之','进一步分析','辩证看待','众所周知','显而易见','值得我们','充分地','在临床实践中','我们应当','进行辨证论治','根据患者情况','适当调整','首先，','其次，','总的来说'];
  for (const [k, arr] of Object.entries(all)) {
    for (const n of arr) {
      const text = JSON.stringify(n);
      for (const b of blacklist) if (text.includes(b)) { fail++; console.log(`!! ${k}/${n.id} 机器味: ${b}`); }
      if (!n.facts || n.facts.length < 4 || n.facts.length > 6) { fail++; console.log(`!! ${k}/${n.id} facts=${n.facts?.length}`); }
      for (const f of n.facts) if (!f.sourceType || !f.sourceTitle || !f.status || f.status !== 'verified') { fail++; console.log(`!! ${k}/${n.id} facts 字段异常: ${JSON.stringify(f)}`); }
      if (!n.dosage || !n.dosage.guideline || !n.dosage.caution) { fail++; console.log(`!! ${k}/${n.id} dosage 缺 guideline/caution`); }
      const cd = n.coreDefinition;
      if (cd.length < 30 || cd.length > 60) { console.log(`  warn ${k}/${n.id} coreDefinition 长度=${cd.length}`); fail++; }
      const kn = n.learning.knowledge;
      if (kn.length < 60 || kn.length > 120) { console.log(`  warn ${k}/${n.id} knowledge 长度=${kn.length}`); fail++; }
      if (n.learning.misjudgment.length < 15) { fail++; console.log(`!! ${k}/${n.id} misjudgment=${n.learning.misjudgment.length}`); }
      if (!n.learning.reasoning.includes('？')) { fail++; console.log(`!! ${k}/${n.id} reasoning 无？`); }
      if (n.learning.transfer.length < 10) { fail++; console.log(`!! ${k}/${n.id} transfer 短`); }
      const sj = n.stdJudgment;
      if (sj.length < 60 || sj.length > 140) { console.log(`  warn ${k}/${n.id} stdJudgment 长度=${sj.length}`); fail++; }
      for (const c of n.classics) {
        if (c.sourceType !== 'classic_original' || c.status !== 'verified' || !c.originalText) { fail++; console.log(`!! ${k}/${n.id} classics 字段异常: ${JSON.stringify(c)}`); }
      }
      if (!n.safety || !n.safety.note || !Array.isArray(n.safety.prohibitions)) { fail++; console.log(`!! ${k}/${n.id} safety 缺失`); }
    }
  }
  console.log(fail === 0 ? '=== 全部通过 ===' : `=== 存在 ${fail} 处问题 ===`);
})();
