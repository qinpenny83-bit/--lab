// ============================================================
// 杏林大典 · Phase 3A.1 权威来源目录
// —— 来源解析层 / 知识分类层 / 安全红线层的唯一事实源 ——
// 地位：Phase 2.5 封板 Schema 的「配套约束数据」。本目录不修改
//       Schema 本身，只补上 Schema 缺少的「出处白名单」「分类口径」
//       「三值上限」「安全红线清单」，把缺陷拦在产生源头。
// 冻结声明：目录内容来自 Phase 2.5 已核验的黄金样板与 Phase 3A
//       恶意样本的预期出处；未引入新学科、未扩大生产规模。
// ============================================================

// —— 来源类型清单（与 Schema FactSourceType 严格一致）——
export const FACT_SOURCE_TYPES = [
  'pharmacopoeia', 'national_standard', 'classic_original', 'textbook',
  'university_curriculum', 'traditional_commentary', 'modern_interpretation', 'teaching_design',
];

export const VERIFICATION_STATUSES = ['verified', 'pending', 'teaching_inference'];

// status 大小序（越级=从低等级升到高等级）
export const STATUS_RANK = { pending: 0, teaching_inference: 1, verified: 2 };

// —— 三值判定口径：来源类型 → 允许的最高 verificationStatus ——
// 原理（Phase 2.5 封板）：verified 只授予「可逐字/精确核验」的来源，
//       教学设计与现代解释天然不具备权威定性，上限只能是 teaching_inference。
//       这是 D「三值越级」的源头判据：生成时按此表封顶，而非 Gate 后才拒。
export const MAX_STATUS_BY_SOURCE_TYPE = {
  pharmacopoeia: 'verified',
  national_standard: 'verified',
  classic_original: 'verified',
  textbook: 'verified',
  university_curriculum: 'verified',
  traditional_commentary: 'teaching_inference',
  modern_interpretation: 'teaching_inference',
  teaching_design: 'teaching_inference',
};

// —— 经典出处白名单（来源解析层核心，修 B / K）——
// key：经典/歌诀/术语的归一化标签（内容锚点）
// kind：'B'=出处错配（内容本身是真实经典/歌诀，只是出处标错）；
//       'K'=知识边界（教学概括/后世说法被冒充成经典原文）
// correctCanon/Chapter/Status/Type：该锚点的权威出处与正确分类
export const CLASSIC_ATTRIBUTION = {
  // —— kind B：真实经典/歌诀/古训，出处是可纠正的 ——
  '十八反': { kind: 'B', correctCanon: '金·张子和《儒门事亲》所载十八反歌诀', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'traditional_commentary', note: '「十八反歌」最早见于金·张子和《儒门事亲》，为后世本草歌诀，非《中国药典》原文' },
  '细辛不过钱': { kind: 'B', correctCanon: '宋《本草别说》（陈承）古训', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'traditional_commentary', note: '古训，非现行药典强制条文，亦不得折算为克数' },
  '但见一证便是': { kind: 'B', correctCanon: '《伤寒论》', correctChapter: '第101条', correctStatus: 'verified', correctType: 'classic_original', note: '须带「有柴胡证」前提，不得断章取义' },
  '四总穴歌': { kind: 'B', correctCanon: '明·徐凤《针灸大全》', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'traditional_commentary', note: '四总穴歌最早记载于明·徐凤《针灸大全》，非《针灸大成》原句' },
  '见肝之病知肝传脾': { kind: 'B', correctCanon: '《金匮要略》', correctChapter: '脏腑经络先后病脉证第一', correctStatus: 'verified', correctType: 'classic_original', note: '非《内经》原句' },
  '用寒远寒': { kind: 'B', correctCanon: '《素问·六元正纪大论》', correctChapter: '', correctStatus: 'verified', correctType: 'classic_original', note: '「用寒远寒，用凉远凉，用温远温，用热远热」原文，为因时制宜思想的经典依据' },
  '木曰曲直': { kind: 'B', correctCanon: '《尚书·洪范》', correctChapter: '', correctStatus: 'verified', correctType: 'classic_original', note: '「水曰润下，火曰炎上，木曰曲直，金曰从革，土爰稼穑」为五行特性最早出处' },
  '传化物而不藏': { kind: 'B', correctCanon: '《素问·五脏别论》', correctChapter: '', correctStatus: 'verified', correctType: 'classic_original', note: '「六腑者，传化物而不藏，故实而不能满也」原文，六腑生理特性依据' },
  '因时制宜': { kind: 'K', correctCanon: '（教学术语，思想见《素问·六元正纪大论》）', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'teaching_design', note: '「因时制宜」四字为后世教学概括，其思想经典依据为《素问·六元正纪大论》「用寒远寒」等' },
  '阴阳': { kind: 'B', correctCanon: '《素问·阴阳应象大论》', correctChapter: '阴阳应象大论篇第五', correctStatus: 'verified', correctType: 'classic_original', note: '「阴阳者，天地之道也」确为《素问·阴阳应象大论》原文，补入白名单' },
  '治未病': { kind: 'B', correctCanon: '《素问·四气调神大论》', correctChapter: '', correctStatus: 'verified', correctType: 'classic_original', note: '「圣人不治已病治未病，不治已乱治未乱」原文出处' },
  '上工治未病': { kind: 'B', correctCanon: '《难经·七十七难》', correctChapter: '七十七难', correctStatus: 'verified', correctType: 'classic_original', note: '「上工治未病」首见《难经》，非《素问》原句' },
  '君主之官': { kind: 'B', correctCanon: '《素问·灵兰秘典论》', correctChapter: '灵兰秘典论篇第八', correctStatus: 'verified', correctType: 'classic_original', note: '「心者，君主之官也，神明出焉」原文' },
  '风为百病之长': { kind: 'B', correctCanon: '《素问·风论》', correctChapter: '风论篇第四十二', correctStatus: 'verified', correctType: 'classic_original', note: '「风者，百病之长也」原文' },
  '卫气营血': { kind: 'B', correctCanon: '清·叶天士《温热论》', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'traditional_commentary', note: '卫气营血辨证为叶桂《温热论》创立；三焦辨证方为吴鞠通《温病条辨》' },
  '八纲辨证': { kind: 'K', correctCanon: '清·程钟龄《医学心悟》', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'traditional_commentary', note: '八纲作为系统辨证纲领正式确立于清·程钟龄《医学心悟》，非《黄帝内经》原词' },

  // —— kind K：教学概括/后世说法，不得冒充经典原文 ——
  '回阳救逆第一品': { kind: 'K', correctCanon: '（无权威可核验出处）', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'teaching_design', note: '临床科普定位，无权威出处' },
  '调和营卫': { kind: 'K', correctCanon: '（后世教学术语）', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'teaching_design', note: '后世教学术语，非《伤寒论》原句' },
  '三补三泻': { kind: 'K', correctCanon: '（教材归纳）', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'teaching_design', note: '教材归纳，非《小儿药证直诀》原句' },
  '气为血之帅': { kind: 'K', correctCanon: '（教学口诀）', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'teaching_design', note: '教学口诀，非《内经》原句' },
  '左升右降': { kind: 'K', correctCanon: '《素问·刺禁论》「肝生于左，肺藏于右」为原文；「左升右降」为后世归纳', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'teaching_design', note: '「左升右降」为后世归纳，不得绝对化为《内经》原句' },
  '柴胡劫肝阴': { kind: 'K', correctCanon: '（后世医家说）', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'traditional_commentary', note: '后世医家之说，非《本经》原句' },
  '甘温除大热': { kind: 'K', correctCanon: '李东垣（补中益气汤相关，首出须核验）', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'traditional_commentary', note: '术语首出须核验' },
  '四关': { kind: 'K', correctCanon: '（临床总结）', correctChapter: '', correctStatus: 'teaching_inference', correctType: 'teaching_design', note: '临床总结，非经典原句' },
};

// 教学概括/后世说法的锚点集合（命中即代表「知识边界」风险）
export const NON_CLASSIC_LABELS = new Set(Object.keys(CLASSIC_ATTRIBUTION).filter((k) => CLASSIC_ATTRIBUTION[k].kind === 'K'));

// —— 高危/禁用药材红线清单（安全红线层，修 J）——
export const BANNED_HERBS = {
  '关木通': { reason: '含马兜铃酸，已确认肾毒性，已从《中国药典》剔除', redline: '【已禁用】含马兜铃酸，具肾毒性，禁止指导使用；历史用法仅供学习鉴识，不得作用药依据' },
  '广防己': { reason: '含马兜铃酸，已禁用', redline: '【已禁用】含马兜铃酸，具肾毒性，禁止指导使用' },
  '青木香': { reason: '含马兜铃酸，已禁用', redline: '【已禁用】含马兜铃酸，具肾毒性，禁止指导使用' },
  '马兜铃': { reason: '含马兜铃酸，已禁用', redline: '【已禁用】含马兜铃酸，具肾毒性，禁止指导使用' },
};

// —— 禁针/慎针腧穴红线清单（安全红线层，修 J）——
// Phase 3B 扩充：哑门/风府（延髓深度风险）、乳中（禁针禁灸）、神阙（禁针）、
// 鸠尾（肝区）、人迎（颈动脉）——均来自《针灸学》规划教材与腧穴安全操作规范。
export const FORBIDDEN_ACUPOINTS = {
  '三阴交': { redline: '孕妇禁针，有堕胎风险' },
  '合谷': { redline: '孕妇禁针，有堕胎风险' },
  '关元': { redline: '膀胱充盈时禁深刺；孕妇禁针' },
  '哑门': { redline: '深部近延髓，禁深刺，禁向上方深刺' },
  '风府': { redline: '深部近延髓，禁深刺，禁向上方深刺' },
  '乳中': { redline: '禁针禁灸，仅作胸部分寸定位标志' },
  '神阙': { redline: '禁针，宜灸' },
  '鸠尾': { redline: '深部邻近肝脏，禁深刺（肝肿大者禁刺）' },
  '人迎': { redline: '禁深刺，禁双侧同时取穴' },
};

// —— 高风险药材红线清单（Phase 3B 新增：毒性/剂量/配伍/人群风险）——
// 依据：《中国药典》一部、《中药学》规划教材、十八反歌诀（金·张子和《儒门事亲》）
// 原则：只有权威可核验的风险才写入；无法确认的条目不进目录，节点侧按
//       「未知风险 → pending/quarantine」处理，绝不猜测。
export const HIGH_RISK_HERBS = {
  '附子': {
    toxicity: '生附子有大毒；临床内服多用炮制品（制附子/炮附片/黑顺片）',
    doseRisk: '制附子 3–15g，须先煎久煎（先煎 0.5–1 小时至口尝无麻辣感）',
    incompatibility: '不宜与半夏、瓜蒌、贝母、白蔹、白及同用（十八反乌头类）',
    population: '孕妇禁用；阴虚阳亢、真热假寒者忌用',
    redline: '【高风险】附子须炮制后使用，内服先煎久煎至口尝无麻辣感；孕妇禁用；反半夏、瓜蒌、贝母、白蔹、白及；剂量遵《中国药典》制附子 3–15g，不得自行加量',
  },
  '细辛': {
    toxicity: '有小毒',
    doseRisk: '煎剂 1–3g，散剂每次 0.5–1g；古训「细辛不过钱」（单用末不可过一钱）',
    incompatibility: '',
    population: '气虚多汗、阴虚阳亢头痛、肺燥阴伤干咳者慎用',
    redline: '【高风险】细辛煎剂 1–3g、散剂 0.5–1g；「细辛不过钱」为古训（指单用末），不得折算为常规用量依据；过量可致中毒',
  },
  '半夏': {
    toxicity: '生半夏有毒；内服须用炮制品（姜半夏/法半夏/清半夏）',
    doseRisk: '炮制品 3–9g',
    incompatibility: '反乌头（川乌、草乌、附子）',
    population: '孕妇慎用；阴虚燥咳、血证者慎用（辛温燥烈）',
    redline: '【高风险】生半夏有毒，不得生品内服，须炮制；反乌头类（含附子）；孕妇慎用',
  },
  '麻黄': {
    toxicity: '含麻黄碱，发汗力强',
    doseRisk: '2–10g（儿童酌减）；不宜久煎',
    incompatibility: '',
    population: '表虚自汗、阴虚盗汗、虚喘者慎用；高血压、心脏病、失眠者慎用；运动员禁用',
    redline: '【高风险】发汗力强，虚人慎用；高血压/心脏病/失眠者慎用；运动员禁用；不宜过量或久服',
  },
  '甘草': {
    toxicity: '',
    doseRisk: '2–10g；大剂量久服可致水钠潴留、血压升高',
    incompatibility: '反海藻、大戟、甘遂、芫花（十八反）',
    population: '孕妇慎用（大剂量）；湿盛胀满、水肿者慎用',
    redline: '【高风险】反海藻、大戟、甘遂、芫花；大剂量久服致水肿、血压升高，不得与禁忌药同用',
  },
  '甘遂': {
    toxicity: '有毒',
    doseRisk: '0.5–1.5g，宜入丸散',
    incompatibility: '反甘草',
    population: '孕妇禁用；体虚者忌用',
    redline: '【高风险】甘遂有毒，0.5–1.5g 入丸散；反甘草；孕妇禁用；峻下逐水，虚人忌用',
  },
  '大戟': {
    toxicity: '有毒',
    doseRisk: '0.5–1.5g，宜入丸散',
    incompatibility: '反甘草',
    population: '孕妇禁用',
    redline: '【高风险】大戟有毒，反甘草；孕妇禁用；峻下逐水，虚人忌用',
  },
  '芫花': {
    toxicity: '有毒',
    doseRisk: '0.5–1.5g，宜入丸散',
    incompatibility: '反甘草',
    population: '孕妇禁用',
    redline: '【高风险】芫花有毒，反甘草；孕妇禁用；峻下逐水，虚人忌用',
  },
  '牵牛子': {
    toxicity: '有毒',
    doseRisk: '煎服 3–6g（捣碎），入丸散每次 1.5–3g',
    incompatibility: '不宜与巴豆、巴豆霜同用（十九畏）',
    population: '孕妇禁用',
    redline: '【高风险】牵牛子有毒，峻下逐水只宜实证、短期使用，中病即止；孕妇禁用；不宜与巴豆、巴豆霜同用（十九畏）',
  },
  '商陆': {
    toxicity: '有毒',
    doseRisk: '煎服 3–9g（醋制减毒），外用适量',
    incompatibility: '',
    population: '孕妇禁用；脾虚水肿者慎用',
    redline: '【高风险】商陆有毒，醋制可减毒；孕妇禁用；峻下逐水只宜实证、中病即止，不可过量久服',
  },
  '苦楝皮': {
    toxicity: '有毒',
    doseRisk: '煎服 3–6g（鲜品 15–30g），外用适量',
    incompatibility: '',
    population: '小儿及脾胃虚寒者慎用；肝肾功能不全者慎用；孕妇慎用',
    redline: '【高风险】苦楝皮有毒，不可过量久服；小儿及脾胃虚寒者慎用',
  },
  '白果': {
    toxicity: '有毒（生品毒性大，含银杏酚酸类成分）',
    doseRisk: '煎服 5–10g',
    incompatibility: '',
    population: '小儿尤须慎防生食中毒',
    redline: '【高风险】白果不可生食、不可过量，生食或过量可中毒（呕吐抽搐）；小儿尤须慎防',
  },
  '洋金花': {
    toxicity: '有大毒（含东莨菪碱等莨菪烷类生物碱）',
    doseRisk: '0.3–0.6g，宜入丸散，不作煎剂；外用适量',
    incompatibility: '',
    population: '孕妇、外感及痰热咳喘、青光眼、高血压及心动过速患者禁用',
    redline: '【高风险】洋金花有大毒，内服 0.3–0.6g 只入丸散，不作煎剂、不得随意加量；孕妇、外感及痰热咳喘、青光眼、高血压及心动过速患者禁用',
  },
  '朱砂': {
    toxicity: '有毒（主含硫化汞）',
    doseRisk: '0.1–0.5g，研末冲服或入丸散，不入煎剂',
    incompatibility: '',
    population: '孕妇及肝肾功能不全者禁用',
    redline: '【高风险】朱砂含硫化汞，忌火煅（煅后析出水银、剧毒）；内服 0.1–0.5g 只入丸散、不入煎剂；不宜大量服用或少量久服；孕妇及肝肾功能不全者禁用',
  },
  '巴豆': {
    toxicity: '有大毒',
    doseRisk: '制霜用 0.1–0.3g，入丸散；外用适量',
    incompatibility: '不宜与牵牛子同用（十九畏）',
    population: '孕妇禁用；体虚者忌用',
    redline: '【高风险】巴豆有大毒，内服须制霜、0.1–0.3g 只入丸散，不得煎服或加量；孕妇禁用；不宜与牵牛子同用',
  },
  '马钱子': {
    toxicity: '有大毒（含番木鳖碱/士的宁）',
    doseRisk: '0.3–0.6g，炮制后入丸散；外用适量',
    incompatibility: '',
    population: '孕妇禁用；体虚者忌用',
    redline: '【高风险】马钱子有大毒，须炮制（砂烫）后 0.3–0.6g 入丸散，不得生用或煎服；过量致惊厥；孕妇禁用',
  },
  '蟾酥': {
    toxicity: '有毒（含蟾毒配基类强心成分）',
    doseRisk: '0.015–0.03g，入丸散；外用适量',
    incompatibility: '',
    population: '孕妇禁用；体弱者忌用',
    redline: '【高风险】蟾酥有毒，内服 0.015–0.03g 只入丸散；外用不可入目；孕妇禁用',
  },
  '雄黄': {
    toxicity: '有毒（主含二硫化二砷）',
    doseRisk: '0.05–0.1g，入丸散；外用适量',
    incompatibility: '',
    population: '孕妇禁用；忌火煅',
    redline: '【高风险】雄黄有毒，内服 0.05–0.1g 只入丸散；忌火煅（煅后生成砒霜、剧毒）；孕妇禁用',
  },
  '硫黄': {
    toxicity: '有毒',
    doseRisk: '1.5–3g，入丸散；外用适量',
    incompatibility: '',
    population: '孕妇慎用；阴虚火旺者忌用',
    redline: '【高风险】硫黄有毒，内服 1.5–3g 只入丸散，不入煎剂；孕妇慎用',
  },
  '轻粉': {
    toxicity: '有毒（主含氯化亚汞）',
    doseRisk: '0.1–0.2g，入丸散；外用适量',
    incompatibility: '',
    population: '孕妇禁用；内服不可过量久服',
    redline: '【高风险】轻粉有毒，内服 0.1–0.2g 只入丸散；不可过量久服（汞蓄积中毒）；孕妇禁用',
  },
  '斑蝥': {
    toxicity: '有大毒（含斑蝥素）',
    doseRisk: '0.03–0.06g，入丸散；外用适量',
    incompatibility: '',
    population: '孕妇禁用；心肾功能不全者禁用',
    redline: '【高风险】斑蝥有大毒，内服 0.03–0.06g 只入丸散；外用不可大面积或久敷；孕妇及心肾功能不全者禁用',
  },
  '罂粟壳': {
    toxicity: '有毒（含吗啡等阿片类生物碱），有成瘾性',
    doseRisk: '3–6g，宜蜜炙',
    incompatibility: '',
    population: '孕妇及儿童禁用；有成瘾性，不宜常服',
    redline: '【高风险】罂粟壳有毒且有成瘾性，3–6g、中病即止，不宜常服；孕妇及儿童禁用；须按麻醉药品管理',
  },
  '常山': {
    toxicity: '有毒',
    doseRisk: '5–9g；涌吐宜生用',
    incompatibility: '',
    population: '体虚及孕妇慎用',
    redline: '【高风险】常山有毒，涌吐力猛，中病即止；体虚及孕妇慎用',
  },
  '马兜铃': {
    toxicity: '有小毒（含马兜铃酸，肾毒性）',
    doseRisk: '3–9g',
    incompatibility: '',
    population: '肾功能不全者禁用；不可过量久服',
    redline: '【高风险】马兜铃含马兜铃酸有肾毒性，3–9g、不可过量久服；肾功能不全者禁用；蜜炙可缓其苦寒之性',
  },
  '黄药子': {
    toxicity: '有毒（含皂苷/黄独素，肝毒性）',
    doseRisk: '5–15g；外用适量',
    incompatibility: '',
    population: '肝病患者禁用；不可过量久服',
    redline: '【高风险】黄药子有毒，5–15g、不可过量久服（肝损伤风险）；肝病患者禁用',
  },
  '雷公藤': {
    toxicity: '剧毒',
    doseRisk: '去皮根木质部 10–25g（须先煎久煎 2 小时以上）',
    incompatibility: '',
    population: '孕妇禁用；心、肝、肾功能不全者禁用；儿童及体弱者禁用',
    redline: '【高风险】雷公藤剧毒，须去皮、久煎 2 小时以上减毒；心肝肾功能不全者、孕妇、儿童禁用；不可自行使用',
  },
};

// —— 剂量风险目录（Phase 3B 新增：古训与药典的分层依据）——
export const DOSE_RISKS = {
  '细辛不过钱': { source: '宋·陈承《本草别说》古训', rule: '单用为末不可过钱（约 1g）', note: '古训指单用散剂，不混同煎剂常规量；禁止折算为克数常规依据' },
  '附子先煎': { source: '《中国药典》一部', rule: '制附子先煎久煎至口尝无麻辣感', note: '久煎减毒是安全前提，配伍不可替代先煎' },
  '麻黄用量': { source: '《中国药典》一部', rule: '2–10g，儿童酌减', note: '发汗力强，超量或久服可致心悸失眠' },
  '石膏先煎': { source: '《中药学》规划教材', rule: '生石膏内服 15–60g，宜先煎', note: '先煎利于有效成分溶出' },
};

// —— 特殊人群风险（Phase 3B 新增：妊娠/儿童/出血倾向）——
export const SPECIAL_POPULATIONS = {
  '妊娠': {
    herbs: ['附子（禁用）', '半夏（慎用）', '甘遂（禁用）', '大戟（禁用）', '芫花（禁用）', '麻黄（慎用）', '甘草（大剂量慎用）'],
    acupoints: ['合谷（禁针）', '三阴交（禁针）', '昆仑（禁针）', '至阴（禁针）'],
    note: '妊娠禁忌以权威药典与针灸教材为准，不以经验推断扩充',
  },
  '儿童': { herbs: ['麻黄（酌减）'], acupoints: ['不宜深刺、留针宜短'], note: '儿童剂量按体重折算，遵循儿科用药规则' },
  '出血倾向': { acupoints: ['血友病/出血倾向者禁刺、禁强刺激'], note: '针刺有出血风险者须规避或慎用' },
};

// —— 学习难度梯度（修 I）——
export const DIFFICULTY_LADDER = [
  { label: '简单', weight: 1 },
  { label: '中等', weight: 2 },
  { label: '困难', weight: 3 },
  { label: '易混淆', weight: 4 },
  { label: '综合推理', weight: 5 },
];