// 补全 batch-1..43 的 samples.json：从 part 源文件合并 stdJudgment/coreDefinition/facts/classics/cases/dosage/safety
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const P = process.cwd();
const BASE = join(P, 'phase-5');

async function main() {
  let patched = 0;
  let total = 0;
  for (let n = 1; n <= 43; n++) {
    const dir = join(BASE, `batch-${n}`);
    const samplesPath = join(dir, 'samples.json');
    if (!exists(samplesPath)) continue;
    const doc = JSON.parse(readFileSync(samplesPath, 'utf8'));
    const byId = new Map();
    const partFiles = readdirSync(dir).filter((f) => f.endsWith('.mjs'));
    for (const pf of partFiles) {
      const mod = await import(pathToFileURL(join(dir, pf)).href);
      for (const v of Object.values(mod)) {
        if (Array.isArray(v)) for (const s of v) if (s && typeof s === 'object' && s.id) byId.set(s.id, s);
      }
    }
    let changed = 0;
    for (const s of doc.samples) {
      const raw = byId.get(s.id);
      if (!raw) continue;
      for (const k of ['stdJudgment', 'coreDefinition', 'facts', 'classics', 'cases', 'dosage', 'safety']) {
        if (s[k] === undefined && raw[k] !== undefined) { s[k] = raw[k]; changed++; }
      }
    }
    if (changed) {
      writeFileSync(samplesPath, JSON.stringify(doc, null, 2), 'utf8');
      patched += changed;
    }
    total += doc.samples.length;
  }
  console.log(`patched ${patched} fields across ${total} samples`);
}

function exists(p) {
  try { readFileSync(p); return true; } catch { return false; }
}

main().catch((e) => { console.error(e); process.exit(1); });
