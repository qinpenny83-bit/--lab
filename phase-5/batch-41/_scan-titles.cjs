const fs = require('fs');
const path = require('path');
const root = 'C:/Users/qinpei/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6aa7f4c708455455bde7b549/phase-5';
const dirs = fs.readdirSync(root).filter(d => d.startsWith('batch-') && d !== 'batch-41');
const titles = new Map();
for (const d of dirs) {
  const fp = path.join(root, d);
  let files = [];
  try { files = fs.readdirSync(fp).filter(f => /samples-part-.*\.mjs$/.test(f)); } catch (e) { continue; }
  for (const f of files) {
    let src;
    try { src = fs.readFileSync(path.join(fp, f), 'utf8'); } catch (e) { continue; }
    const re = /title:\s*'([^']+)'/g;
    let m;
    while ((m = re.exec(src)) !== null) {
      const t = m[1];
      if (!titles.has(t)) titles.set(t, []);
      titles.get(t).push(d + '/' + f);
    }
  }
}
const mine = [
  // M
  '剂量·君臣佐使剂量比例原则','剂量·麻黄与石膏配伍剂量比例','剂量·桂枝与芍药等量配伍意义','剂量·大黄与附子寒热配伍剂量','剂量·经方一剂三服与中病即止的剂量节奏','剂量·毒性药煎煮时间与有效剂量关系','剂量·妊娠期逐月用药剂量差异','剂量·急症重剂与慢病轻剂策略','剂量·时辰给药与剂量优化','剂量·老年人多药联用剂量调整',
  // Q
  '六经·太阳中风桂枝汤证','六经·阳明经证白虎汤证','六经·少阳小柴胡汤证','六经·太阴理中汤证','六经·少阴麻黄细辛附子汤证','六经·厥阴乌梅丸证','温病·风温肺卫桑菊饮证','温病·暑温气分证治','温病·秋燥凉燥证治','金匮·奔豚气病证治',
  // S
  '皮肤病·疥疮湿热蕴结证治','皮肤病·鹅掌风血虚风燥证治','皮肤病·热疮肺胃热盛证治','皮肤病·油风肝肾不足证治','皮肤病·黄褐斑肝郁气滞证治','皮肤病·药毒湿毒蕴肤证治','外科·烧伤火毒伤津证治','外科·毒蛇咬伤风毒证治','外科·破伤风风毒入络证治','外科·褥疮气血亏虚证治',
  // T
  '月经病·经行头痛肝火证治','月经病·经行泄泻脾虚证治','月经病·经行浮肿脾肾阳虚证治','妊娠病·妊娠咳嗽阴虚肺燥证治','妊娠病·妊娠小便淋痛心火偏亢证治','产后病·产后大便难血虚津亏证治','产后病·产后身痛外感风寒证治','产后病·产后乳汁自出气虚证治','妇科杂病·妇人腹痛气滞血瘀证治','妇科杂病·盆腔炎湿热瘀结证治',
];
let conflict = 0;
for (const t of mine) {
  if (titles.has(t)) { console.log('CONFLICT:', t, '=>', titles.get(t).join(',')); conflict++; }
  else { console.log('OK:', t); }
}
console.log('conflicts:', conflict);
