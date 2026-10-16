// Batch-41 验证脚本：导入长度 / 标题唯一 / stdJudgment 唯一 / 质量门 / 机器味黑名单
import { pathToFileURL } from 'url';
const base = 'C:/Users/qinpei/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6aa7f4c708455455bde7b549/phase-5/batch-41/';
(async () => {
  const C = (await import(pathToFileURL(base + 'samples-part-c.mjs').href)).PART_C;
  const E = (await import(pathToFileURL(base + 'samples-part-e.mjs').href)).PART_E;
  const F = (await import(pathToFileURL(base + 'samples-part-f.mjs').href)).PART_F;
  const K = (await import(pathToFileURL(base + 'samples-part-k.mjs').href)).PART_K;
  const all = { C, E, F, K };
  let fail = 0;
  for (const [k, arr] of Object.entries(all)) {
    console.log(`${k}: length=${arr.length}`);
    if (arr.length !== 10) { fail++; console.log(`  !! ${k} 长度非10`); }
    const ids = arr.map(n => n.id);
    if (new Set(ids).size !== ids.length) { fail++; console.log(`  !! ${k} id 重复`); }
    const titles = arr.map(n => n.title);
    if (new Set(titles).size !== titles.length) { fail++; console.log(`  !! ${k} title 重复`); }
  }
  // 40 个 title 全局唯一
  const allTitles = [C, E, F, K].flat().map(n => n.title);
  if (new Set(allTitles).size !== allTitles.length) { fail++; console.log('!! 40 个 title 存在跨文件重复'); }
  // stdJudgment 唯一
  const js = [C, E, F, K].flat().map(n => n.stdJudgment);
  if (new Set(js).size !== js.length) { fail++; console.log('!! stdJudgment 存在重复'); }
  // 质量门
  const blacklist = ['请根据所学知识','综合考虑','由此可知','需要注意的是','通过以上分析','综上所述','总而言之','进一步分析','辩证看待','众所周知','显而易见','值得我们','充分地','在临床实践中','我们应当','进行辨证论治','根据患者情况','适当调整'];
  let cn = 0;
  for (const [k, arr] of Object.entries(all)) {
    for (const n of arr) {
      const text = JSON.stringify(n);
      for (const b of blacklist) if (text.includes(b)) { fail++; console.log(`!! ${k}/${n.id} 机器味: ${b}`); }
      if (!n.facts || n.facts.length < 4 || n.facts.length > 6) { fail++; console.log(`!! ${k}/${n.id} facts=${n.facts?.length}`); }
      for (const f of n.facts) if (!f.sourceType || !f.sourceTitle || !f.status) { fail++; console.log(`!! ${k}/${n.id} facts 字段缺`); }
      if (!n.dosage || !n.dosage.guideline || !n.dosage.caution) { fail++; console.log(`!! ${k}/${n.id} dosage 缺 guideline/caution`); }
      const cd = n.coreDefinition;
      if (cd.length < 30 || cd.length > 60) { console.log(`  warn ${k}/${n.id} coreDefinition 长度=${cd.length}`); }
      const kn = n.learning.knowledge;
      if (kn.length < 60 || kn.length > 120) { console.log(`  warn ${k}/${n.id} knowledge 长度=${kn.length}`); }
      if (!n.learning.reasoning.includes('？')) { fail++; console.log(`!! ${k}/${n.id} reasoning 无？`); }
      if (n.learning.misjudgment.length < 15) { fail++; console.log(`!! ${k}/${n.id} misjudgment 短`); }
      if (n.learning.transfer.length < 10) { fail++; console.log(`!! ${k}/${n.id} transfer 短`); }
      for (const c of n.classics) {
        if (c.sourceType !== 'classic_original' || c.status !== 'verified' || !c.originalText) { fail++; console.log(`!! ${k}/${n.id} classics 字段异常`); }
      }
      cn += n.facts.length;
    }
  }
  console.log('facts 总数 =', cn);
  console.log(fail === 0 ? '=== 全部通过 ===' : `=== 存在 ${fail} 处问题 ===`);
})();
