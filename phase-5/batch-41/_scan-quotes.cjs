const fs = require('fs');
const path = require('path');
const root = 'C:/Users/qinpei/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6aa7f4c708455455bde7b549/phase-5';
const dirs = fs.readdirSync(root).filter(d => d.startsWith('batch-'));
const seen = new Map();
for (const d of dirs) {
  const fp = path.join(root, d);
  let files = [];
  try { files = fs.readdirSync(fp).filter(f => /samples-part-.*\.mjs$/.test(f)); } catch (e) { continue; }
  for (const f of files) {
    let src;
    try { src = fs.readFileSync(path.join(fp, f), 'utf8'); } catch (e) { continue; }
    const re = /originalText:\s*'([^']+)'/g;
    let m;
    while ((m = re.exec(src)) !== null) {
      const q = m[1];
      if (!seen.has(q)) seen.set(q, []);
      seen.get(q).push(d + '/' + f);
    }
  }
}
const entries = [...seen.entries()];
console.log('unique quotes:', entries.length);
for (const [q, files] of entries) {
  console.log(q, '<=', files.join(','));
}
