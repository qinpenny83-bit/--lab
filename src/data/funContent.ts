// 趣味知识包：拟人人设卡 / 情景小剧场 / 冷知识彩蛋
// 内容基于真实中医与解剖常识撰写（趣味措辞不改变医学事实），
// 按节点主题关键词自动匹配，未命中则不展示，保证内容准确不瞎编。

export interface Persona {
  title: string;   // 人设名，如「肝 · 化工厂厂长」
  tagline: string; // 一句话性格签名
  duty: string;    // 核心职责一句话
}

export interface Scene {
  title: string;   // 场景名，如「深夜的宿舍」
  speaker?: string; // 说话人，如「室友」
}

// ---------- 拟人人设库（按顺序优先匹配） ----------
const PERSONA_LIB: Array<{ keys: RegExp; persona: Persona }> = [
  {
    keys: /肝|疏泄|藏血|胁|目/,
    persona: {
      title: '肝 · 化工厂厂长',
      tagline: '谁惹我，我「肝火」就旺！',
      duty: '解毒、代谢、分泌胆汁、存营养；性格闷不吭声——早期受损也没感觉，所以要主动护肝。',
    },
  },
  {
    keys: /心|血脉|神明|心神|胸/,
    persona: {
      title: '心 · 动力泵房站长',
      tagline: '我不停机，你就活着。',
      duty: '主血脉、主神明：把血泵向全身，同时掌管精神意识——白天清醒、夜里安睡都归它管。',
    },
  },
  {
    keys: /肺|呼吸|咳|喘|气短|鼻/,
    persona: {
      title: '肺 · 换气站站长',
      tagline: '每一次呼吸，都是我上班打卡。',
      duty: '主气、司呼吸，还管宣发肃降——把清气吸进来、浊气排出去，津液皮毛也归它养护。',
    },
  },
  {
    keys: /脾|运化|脾胃/,
    persona: {
      title: '脾 · 后勤部长',
      tagline: '吃进去的都归我管，水谷精微我分发。',
      duty: '主运化、升清：把食物变成气血精华，输送到全身；脾虚的人容易乏力、没胃口、大便稀。',
    },
  },
  {
    keys: /肾|腰|精|水液|骨/,
    persona: {
      title: '肾 · 藏宝库管理员',
      tagline: '先天之本，精气我都替你收着。',
      duty: '主藏精、主水、主纳气：管生长发育、生殖和骨骼，中医说「肾为先天之本」，要省着用。',
    },
  },
  {
    keys: /胃|受纳|腐熟|消谷/,
    persona: {
      title: '胃 · 食材加工车间主任',
      tagline: '饭菜到我这先粗加工，磨成食糜再送走。',
      duty: '受纳、腐熟水谷：把食物搅碎初步消化，胃「以降为和」——胃气上逆就会反酸、打嗝、恶心想吐。',
    },
  },
  {
    keys: /胆/,
    persona: {
      title: '胆 · 仓库保管员',
      tagline: '肝产的胆汁，我替你存着，吃油时放闸。',
      duty: '储存和排泄胆汁，帮助消化脂肪；中医还说「胆主决断」——胆小的人，胆气就不足。',
    },
  },
  {
    keys: /小肠|分清泌浊|吸收/,
    persona: {
      title: '小肠 · 精加工流水线',
      tagline: '营养在这儿分拣打包，送进血液。',
      duty: '受盛化物、分清泌浊：把食糜进一步消化，精华吸收入血，糟粕交给大肠。',
    },
  },
  {
    keys: /大肠|排便|便秘|便/,
    persona: {
      title: '大肠 · 废品回收站站长',
      tagline: '水分我回收，剩下的打包走人。',
      duty: '传导糟粕、回收水分：把食物残渣变成大便排出；大肠燥热会便秘，虚寒会拉稀。',
    },
  },
  {
    keys: /膀胱|尿/,
    persona: {
      title: '膀胱 · 蓄水池管理员',
      tagline: '攒到 300–500ml 我就报信：该去厕所了。',
      duty: '贮存和排泄尿液；中医说「膀胱者，州都之官，津液藏焉」，排尿全靠它把关。',
    },
  },
  {
    keys: /脑|元神|髓/,
    persona: {
      title: '脑 · 总司令部参谋',
      tagline: '元神之府，七窍都听我调度。',
      duty: '中医称脑为「元神之府」——精神、思维、感觉的统帅；但要注意，中医主神明的核心仍是「心」。',
    },
  },
  {
    keys: /气血|血虚|气虚|气滞|血瘀|补气|补血/,
    persona: {
      title: '气血 · 人体快递系统',
      tagline: '气是派件员，血是包裹——气推血行，血载气养。',
      duty: '中医说「气为血之帅，血为气之母」：气不足则无力（气虚），血不足则面白头晕（血虚）。',
    },
  },
  {
    keys: /阴阳/,
    persona: {
      title: '阴阳 · 平衡师',
      tagline: '白天阳，黑夜阴；动是阳，静是阴。',
      duty: '阴阳不是玄学，是「相反相成」的两面：寒热、上下、表里、动静，调和了就是健康态。',
    },
  },
  {
    keys: /五行/,
    persona: {
      title: '五行 · 相生相克循环圈',
      tagline: '木火土金水，一环扣一环。',
      duty: '木生火、火生土、土生金、金生水、水生木；相克是制约，太过或不及都会失衡。',
    },
  },
  {
    keys: /经络|穴位|针灸|针刺/,
    persona: {
      title: '经络 · 高速公路网',
      tagline: '361 个正经穴位，像服务区一样分布在线路上。',
      duty: '经络不是血管，是古人发现的「通路」——刺激穴位能调节对应脏腑，针灸推拿都靠它。',
    },
  },
  {
    keys: /湿|痰/,
    persona: {
      title: '湿气 · 体内梅雨天',
      tagline: '身体困重、舌苔厚腻、大便粘马桶——就是我在搞事。',
      duty: '湿性重浊黏滞：湿气重的人常觉得浑身沉重、头昏沉、容易水肿；祛湿要健脾（脾运化水湿）。',
    },
  },
  {
    keys: /寒|热|温/,
    persona: {
      title: '寒热 · 体温管理员',
      tagline: '寒是冰窖，热是火炉——中医看病先看寒热。',
      duty: '寒证怕冷喜暖、热证怕热喜凉；辨证寒热是中医八纲辨证的第一步。',
    },
  },
  {
    keys: /情志|怒|喜|思|忧|悲|恐|惊|情绪/,
    persona: {
      title: '情志 · 情绪信号兵',
      tagline: '怒伤肝、喜伤心、思伤脾、忧伤肺、恐伤肾。',
      duty: '情绪不是小事：过激的情绪会伤对应脏腑，所以养生先养心、气顺身体才顺。',
    },
  },
];

// ---------- 情景小剧场库（生活场景模板） ----------
// 注意：keys 避免宽泛单字（夜/水/药/足/按 等），防止跨主题误匹配
const SCENE_LIB: Array<{ keys: RegExp; scene: Scene }> = [
  {
    keys: /熬夜|失眠|睡觉|睡眠|子时|作息|晚睡|熬夜伤/,
    scene: { title: '深夜的宿舍', speaker: '刚打完游戏的室友' },
  },
  {
    keys: /喝酒|饮酒|酒精|酒量|解酒/,
    scene: { title: '热闹的聚餐饭桌', speaker: '端着酒杯的朋友' },
  },
  {
    keys: /生气|发火|动怒|情绪|压力|焦虑|心情|郁结/,
    scene: { title: '下班路上的地铁口', speaker: '刚被领导批了一顿的同事' },
  },
  {
    keys: /辛辣|麻辣|火锅|辣椒/,
    scene: { title: '火锅店的麻辣锅底前', speaker: '无辣不欢的干饭搭子' },
  },
  {
    keys: /减肥|节食|体重|晚饭|饿瘦/,
    scene: { title: '健身房的更衣室', speaker: '正在节食的闺蜜' },
  },
  {
    keys: /感冒|发烧|咳嗽|着凉|流感|鼻塞|伤寒/,
    scene: { title: '感冒季的办公室', speaker: '吸着鼻子的同事' },
  },
  {
    keys: /出汗|排汗|大汗/,
    scene: { title: '晨跑的公园步道', speaker: '刚跑完五公里的老大爷' },
  },
  {
    keys: /喝水|饮水|多喝|口渴/,
    scene: { title: '工位旁的饮水机', speaker: '抱着水杯的养生同事' },
  },
  {
    keys: /空调|贪凉|冷饮|冰镇/,
    scene: { title: '三伏天的办公室', speaker: '把空调调到 18 度的同事' },
  },
  {
    keys: /推拿|刮痧|拔罐|按摩/,
    scene: { title: '小区门口的养生馆', speaker: '热情推销的店员' },
  },
  {
    keys: /月经|痛经|例假|经期/,
    scene: { title: '闺蜜们的深夜聊天', speaker: '皱着眉头的闺蜜' },
  },
  {
    keys: /脱发|掉发|头发|秃/,
    scene: { title: '出租屋的洗手台', speaker: '看着掉发的室友' },
  },
  {
    keys: /保健品|补品|人参|鹿茸|灵芝|燕窝/,
    scene: { title: '过年的亲戚家客厅', speaker: '塞给你一瓶补品的亲戚' },
  },
  {
    keys: /水果|奶茶|甜食|零食|糖/,
    scene: { title: '下午茶的工位', speaker: '正要下单奶茶的同事' },
  },
  {
    keys: /咖啡|浓茶|提神/,
    scene: { title: '加班的深夜', speaker: '把咖啡当续命水的打工人' },
  },
  {
    keys: /暴食|吃多|自助|食积/,
    scene: { title: '自助餐厅的取餐台', speaker: '宣称要吃回本的朋友' },
  },
  {
    keys: /服药|吃药|汤剂|煎药|煎煮|用药/,
    scene: { title: '药房的中药柜台', speaker: '第一次抓药的小白' },
  },
  {
    keys: /泡脚/,
    scene: { title: '冬日的客厅', speaker: '端来泡脚桶的养生达人' },
  },
];

// ---------- 冷知识彩蛋库 ----------
const FUNFACT_LIB: Array<{ keys: RegExp; fact: string }> = [
  { keys: /肝/, fact: '你睡着的时候，肝可没闲着——中医说「人卧则血归于肝」，人静卧时，约有四分之一的血液会回到肝里「加班」。' },
  { keys: /心/, fact: '心脏一天跳约 10 万次，一年泵出的血量，够灌满一个小型游泳池。' },
  { keys: /肺/, fact: '你一天大约呼吸 2 万次；左右肺里约有 3 亿个肺泡，全部摊开面积堪比一个网球场。' },
  { keys: /脾/, fact: '中医说的「脾」和西医解剖的脾不是一回事——中医的脾是「运化系统」，管消化吸收和气血生成。' },
  { keys: /肾/, fact: '中医说「肾藏精」，这个「精」是生长发育与生殖的根本，可不止是管尿的器官。' },
  { keys: /胃/, fact: '胃酸的腐蚀力能溶解铁钉，可胃自己却没事——全靠胃壁那层黏液「防弹衣」在保护。' },
  { keys: /胆/, fact: '胆其实不产胆汁，它只是个「仓库」——胆汁是肝生产的，胆负责储存和放闸。' },
  { keys: /小肠/, fact: '小肠盘在肚子里有 6–7 米长，内壁皱褶+绒毛+微绒毛，总吸收面积比一个网球场还大。' },
  { keys: /大肠/, fact: '大肠里住着约 100 万亿个细菌，数量比银河系的星星还多，它们帮你消化、合成维生素。' },
  { keys: /膀胱/, fact: '膀胱攒到 300–500ml 尿液才会强烈「报信」——你其实一直靠大脑在「压着」这个信号。' },
  { keys: /脑/, fact: '大脑只占体重的 2%，却要消耗全身约 20% 的能量——你坐着不动，它也在疯狂「烧油」。' },
  { keys: /气血/, fact: '「气为血之帅，血为气之母」：气推着血跑，血给气供粮，这对搭档谁也离不开谁。' },
  { keys: /阴阳/, fact: '阴阳不是玄学：白天阳、夜晚阴，动是阳、静是阴——就是一对「相反相成」的搭档。' },
  { keys: /五行/, fact: '五行不是五种材料，是五种「运动趋势」：木曰曲直、火曰炎上、土曰稼穑、金曰从革、水曰润下。' },
  { keys: /经络/, fact: '经络不是血管——古人发现身体上有条条「线路」，刺激某点能影响远端，于是才有了针灸。' },
  { keys: /湿/, fact: '「湿气重」常表现为：身体困重、舌苔厚腻、大便粘马桶——就像体内下了场梅雨天。' },
  { keys: /情志/, fact: '中医讲「怒伤肝、喜伤心、思伤脾、忧伤肺、恐伤肾」——情绪上头时，真的会「伤」到对应脏腑。' },
  { keys: /穴/, fact: '人体有 361 个正经穴位，像高速公路上的服务区——针刺或按压能调节对应的脏腑功能。' },
  { keys: /睡眠|熬夜|子时/, fact: '子时（23–1点）胆经当令、丑时（1–3点）肝经当令——古人早就强调「早睡才能养肝胆」。' },
  { keys: /泡脚|足/, fact: '脚上有 60 多个穴位，睡前热水泡脚，相当于给全身做一次温和的「推拿」。' },
  { keys: /服药|汤剂|煎煮|中药|煎药/, fact: '中药煎煮讲究「先煎、后下、包煎」——有的药材要久煮出效，有的后放几分钟香气一散就起效。' },
];

function haystack(texts: (string | undefined | null)[]): string {
  return (texts.filter(Boolean).join(' ') || '').toLowerCase();
}

/** 匹配拟人人设卡；未命中返回 null */
export function matchPersona(texts: (string | undefined | null)[]): Persona | null {
  const hay = haystack(texts);
  if (!hay) return null;
  for (const { keys, persona } of PERSONA_LIB) {
    if (keys.test(hay)) return persona;
  }
  return null;
}

/** 匹配情景小剧场；未命中返回 null */
export function matchScene(texts: (string | undefined | null)[]): Scene | null {
  const hay = haystack(texts);
  if (!hay) return null;
  for (const { keys, scene } of SCENE_LIB) {
    if (keys.test(hay)) return scene;
  }
  return null;
}

/** 匹配冷知识彩蛋；未命中返回 null */
export function matchFunFact(texts: (string | undefined | null)[]): string | null {
  const hay = haystack(texts);
  if (!hay) return null;
  for (const { keys, fact } of FUNFACT_LIB) {
    if (keys.test(hay)) return fact;
  }
  return null;
}
