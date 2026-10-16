// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part AA（AA 传染病·预防 补足 10 节点 pb41-aa-001 ~ pb41-aa-010）
// 学科：AA 传染病·预防（学科上限补足批次）；覆盖：呼吸道传染病/肝炎/肠道传染病/
//       病毒性出疹病/带状疱疹/湿温类/痨瘵/百日咳/狂犬病/医院感染
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「传染·病证·防控」式
// facts sourceTitle 限定：《中医急诊学》规划教材 / 《传染病学》规划教材 / 《温病学》规划教材 /
//   《方剂学》规划教材 / 《中药学》规划教材 / 《中国药典》 / 《伤寒论》规划教材，status 一律 'verified'
// classics 一律整书名 label（《素问》《伤寒论》），篇名入 chapter，originalText 逐字核对，
//   sourceType:'classic_original'，status:'verified'，均已在 classic-patch.mjs 收录
// safety.prohibitions 一律含「传染病须按国家传染病防治法规范管理，本节点仅知识学习」
//   及高危药红线（按 authoring-spec 第 4 节表：麻黄/半夏/甘草）
// dosage 一律填写 guideline/caution，剂量与《中国药典》及规划教材通行表述一致
// 难度分布：简单 3（diff 1）/ 中等 3（diff 2）/ 困难 2（diff 3）/ 易混综合 2（易混淆 1 + 综合推理 1）
// 机器味句式黑名单（authoring-spec 第 3 节）一律禁用
// ============================================================

export const PART_AA = [
  // ============================================================
  // AA 传染病·预防 · 呼吸道传染病（001、007、008）
  // ============================================================
  {
    id: 'pb41-aa-001', title: '传染·流行性感冒表寒里热证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['流行性感冒', '表寒里热', '大青龙汤', '麻黄', '时行感冒'],
    intent: '掌握流行性感冒的辨证分型与表寒里热证的选方用药，理解时行感冒的传染特点。',
    facts: [
      { field: 'clinical.流行病学', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.证型辨证', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'clinical.防控要点', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '热论篇第三十一', originalText: '凡病伤寒而成温者，先夏至日者为病温，后夏至日者为病暑。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '表寒里热者大青龙汤（麻黄6~9g先煎去沫、桂枝6g、炙甘草6g、杏仁9g、生石膏30g先煎、生姜9g、大枣6枚）水煎，日1剂分2~3次温服，取微汗。', caution: '麻黄发汗力强，体虚自汗、高血压、心脏病、失眠者慎用，运动员禁用；石膏先煎，服药后微汗即止，不可过汗；抗病毒西药（奥司他韦）与汤药可并用，重症高热神昏转温病重症方案。' },
    cases: null,
    stdJudgment: '流行性感冒以起病急骤、高热寒战、全身酸痛而呼吸道症状较轻为特征，属中医时行感冒范畴；表寒里热者恶寒发热并见、无汗烦躁、苔薄黄脉浮紧数，以大青龙汤解表清里一散一清，兼防传变。重症喘促神昏者按温病气营血分层救治，并报告疫情。',
    coreDefinition: '流行性感冒表寒里热证以恶寒发热、无汗烦躁为特征，治以解表清里，方用大青龙汤。',
    safety: { note: '流感传染性强，须按传染病防治法报告隔离；重症老人儿童易并发肺炎，宜早期抗病毒；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', '麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '流行病学：飞沫与接触传播，冬季高发，潜伏期1~3天，易并发肺炎。证型：风寒束表、表寒里热、热毒袭肺。病机：疫毒兼挟寒热，侵犯肺卫，表邪未解而里热渐生。主方：表寒里热用大青龙汤麻黄桂枝解表、石膏清里、杏仁宣肺；热毒袭肺者麻杏石甘汤合银翘散。给药：汤剂口服，高热者配合物理降温补液。防控：戴口罩、勤洗手、隔离至热退48小时。',
      misjudgment: '流感一律按普通感冒辛温发汗。错：流感疫毒化热迅速，纯用辛温助热伤津，病转气营；须辨表寒里热与热毒袭肺，宣清并施方合病机。',
      reasoning: '同为高热恶寒无汗，为何流感之表寒里热须加石膏，而普通风寒感冒不必？',
      feedback: '流感疫毒内蕴化热之性显著，恶寒未解而里热已生，石膏清透防其内传；普通风寒表实无里热，发汗即解，方有轻重之辨。',
      transfer: '老人流感高热3日、咳黄痰胸闷者，试按热毒袭肺思路调整选方与转诊。',
    },
  },
  {
    id: 'pb41-aa-007', title: '传染·肺结核痨瘵证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['肺结核', '痨瘵', '肺阴亏损', '月华丸', '咳血'],
    intent: '掌握肺结核痨瘵的病因病机、肺阴亏损证治与中西医结合化疗原则。',
    facts: [
      { field: 'clinical.流行病学', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.证型辨证', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.化疗原则', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.防控要点', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '肺阴亏损者月华丸加减（天冬12g、麦冬12g、生地黄15g、熟地黄15g、山药15g、百部9g、沙参12g、川贝母6g、茯苓15g、三七3g研粉冲服、阿胶6g烊化、菊花9g）水煎，日1剂分2次服。', caution: '阿胶烊化兑入，三七研粉冲服；抗结核化学治疗（异烟肼、利福平、吡嗪酰胺等2HRZE/4HR方案）是治疗基石，中药为辅助；咯血量大、胸痛气促者急诊，痰菌阳性须呼吸道隔离。' },
    cases: null,
    stdJudgment: '肺结核痨瘵以咳嗽咯血、潮热盗汗、消瘦乏力为特征，正虚感染痨虫、阴虚火旺为基本病机；肺阴亏损者干咳少痰、痰中带血、午后潮热、颧红盗汗，月华丸滋阴杀虫、润肺止咳。确诊靠痰菌与影像学，规范化疗全程督导，中药辅助减毒增效，传染期隔离防播散。',
    coreDefinition: '肺结核痨瘵以阴虚为本、痨虫为标，肺阴亏损证用月华丸滋阴润肺杀虫，须联合化疗。',
    safety: { note: '结核病属法定传染病，规范化疗与督导管理是治愈关键，中药不替代抗结核药；知识学习内容，临床用药须遵医嘱', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', '咯血量大、胸痛气促者须急诊处理', '传染期痰菌阳性者须呼吸道隔离'] },
    learning: {
      knowledge: '流行病学：飞沫空气传播，痰菌阳性者传染源地位明确。病机：痨虫侵蚀肺脏，阴虚火旺、气阴两虚演变。证型：肺阴亏损、阴虚火旺、气阴耗伤。主方：肺阴亏损月华丸润肺杀虫，阴虚火旺合百合固金汤滋阴降火，咯血加白及、三七。化疗原则：早期、联合、适量、规律、全程（2HRZE/4HR），全程督导服药。防控：卡介苗接种、筛查密切接触者、规范隔离。',
      misjudgment: '症状减轻即自行停用抗结核药，单恃中药调养。错：中断化疗可致耐药复发，痰菌转阴须坚持全程督导；中药仅在扶正减毒，不能灭菌，疗程管理不容松懈。',
      reasoning: '同是阴虚咳嗽，为何痨瘵之咳血用月华丸而杂病之肺阴虚用沙参麦冬汤？',
      feedback: '痨瘵有痨虫为患，须杀虫（百部獭肝）与滋阴并举，重在除因；杂病肺阴虚纯虚当补，无杀虫之义，病因不同则遣药各异。',
      transfer: '糖尿病合并肺结核者，试按阴虚燥热叠加的思路分析证治侧重。',
    },
  },
  {
    id: 'pb41-aa-008', title: '传染·百日咳痉咳期证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['百日咳', '痉咳期', '桑白皮汤', '顿咳', '半夏'],
    intent: '掌握百日咳痉咳期的证候特点与痰火阻肺证治，理解小儿呛咳窒息的风险。',
    facts: [
      { field: 'clinical.流行病学', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.分期特点', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.证型辨证', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.监护要点', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '痉咳期痰火阻肺者桑白皮汤合葶苈大枣泻肺汤加减（桑白皮10g、制半夏9g、苏子10g、杏仁9g、川贝母6g、黄芩10g、黄连3g、栀子9g、葶苈子10g包煎、大枣6枚）水煎，按年龄酌减剂量，日1剂分3~4次服。', caution: '半夏生品有毒须炮制，反乌头类（含附子），小儿剂量按年龄折算并减量；小婴儿阵咳后青紫窒息须住院监护，伴高热惊厥、肺炎者急诊。' },
    cases: null,
    stdJudgment: '百日咳痉咳期以阵发性痉挛性咳嗽、鸡鸣样回声、咳毕呕吐痰涎为特征，持续2~6周，属中医顿咳；痰火阻肺者咳嗽连声、目赤鼻衄、舌红苔黄，桑白皮汤合葶苈大枣泻肺汤泻肺降逆、清化痰热。小婴儿阵咳青紫为窒息危象须住院，疫苗免疫是根本预防。',
    coreDefinition: '百日咳痉咳期痰火阻肺证以阵挛咳、鸡鸣回声为特征，治以泻肺降逆、清化痰热。',
    safety: { note: '百日咳属法定传染病须报告隔离，小婴儿窒息与并发肺炎是主要风险；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', '半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '小婴儿阵咳青紫窒息须住院监护'] },
    learning: {
      knowledge: '流行病学：百日咳杆菌飞沫传播，婴幼儿易感，接种百白破疫苗可预防。分期：卡他期（1~2周）、痉咳期（2~6周）、恢复期。证型：痉咳期多痰火阻肺，咳嗽连声数十声、面赤握拳、涕泪俱出、咳后鸡鸣回声。主方：桑白皮汤合葶苈大枣泻肺汤泻肺清热、化痰降逆，酌加地龙、僵蚕解痉。监护：保持安静防咳剧，小婴儿夜间专人看护，阵咳青紫者吸氧并转诊。',
      misjudgment: '痉咳期一见咳嗽即用收敛止咳之品。错：顿咳邪热痰阻、肺气上逆，过早敛肺闭门留邪，咳反缠绵；当泻肺降逆化痰，痰热清则咳自止。',
      reasoning: '同为阵发性咳嗽，为何百日咳忌用敛肺止咳而治咳嗽哮喘常用敛肺之品？',
      feedback: '百日咳痰热壅肺为实，敛肺则邪不得出；虚喘久咳肺气耗散，五味子等敛之固之，虚实异治，收敛取舍全在病机。',
      transfer: '痉咳剧烈伴鼻衄目赤者，试按肺热上冲思路加清肝泻肺之品。',
    },
  },
  // ============================================================
  // AA 传染病·预防 · 肝胆与肠道传染病（002、003）
  // ============================================================
  {
    id: 'pb41-aa-002', title: '传染·病毒性肝炎胁痛证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['病毒性肝炎', '胁痛', '茵陈蒿汤', '湿热蕴结', '转氨酶'],
    intent: '掌握病毒性肝炎胁痛的证型辨证与湿热蕴结证治，理解传染途径与随访管理。',
    facts: [
      { field: 'clinical.流行病学', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.证型辨证', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随访管理', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '湿热蕴结胁痛者茵陈蒿汤加味（茵陈30g、栀子10g、大黄6~9g后下，加虎杖15g、垂盆草30g、郁金10g）水煎，日1剂分2次服；肝郁气滞者柴胡疏肝散（柴胡10g、陈皮6g、川芎9g、香附9g、枳壳9g、芍药15g、炙甘草6g）。', caution: '茵陈用量宜足，大黄后下中病即止；苦寒清利之品脾胃虚寒者酌减；重型肝炎黄疸进行性加深、凝血异常、意识改变者立即转诊，中药不替代抗病毒治疗。' },
    cases: null,
    stdJudgment: '病毒性肝炎胁痛以右胁胀痛、纳差乏力、身目黄染为识别要点，湿热蕴结者苔黄腻脉弦滑，茵陈蒿汤清热利湿退黄，肝郁气滞者柴胡疏肝散疏肝理气。甲戊肝经粪口传播、乙肝经血与母婴传播，抗病毒与保肝并举，慢乙肝须长期随访监测病毒与纤维化。',
    coreDefinition: '病毒性肝炎胁痛以湿热蕴结与肝郁气滞为主证，分别以茵陈蒿汤、柴胡疏肝散辨治。',
    safety: { note: '肝炎按法定传染病报告管理，重型肝炎须专科住院；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', '重型肝炎黄疸加深、出血倾向、肝性脑病须立即转诊', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '流行病学：甲戊肝粪口传播，乙丙肝血液体液传播，乙肝可母婴传播。证型：湿热蕴结、肝郁气滞、肝阴不足。病机：疫毒湿热内蕴肝胆，肝失疏泄，胆汁外溢。主方：湿热蕴结茵陈蒿汤清利湿热退黄，肝郁气滞柴胡疏肝散理气止痛，肝阴不足一贯煎柔肝养阴。随访：定期查肝功能、病毒载量与甲胎蛋白，抗病毒方案由专科制定。',
      misjudgment: '肝功能正常即认为痊愈、停止随访。错：慢乙肝可肝功能间歇正常而纤维化隐匿进展，须病毒学与影像学长期监测，防肝硬化肝癌。',
      reasoning: '同为胁痛，为何病毒性肝炎多先见纳差乏力，而胆囊炎以绞痛为著？',
      feedback: '肝炎之湿热内蕴重在肝脾，中焦运化先困故纳差乏力；胆囊炎气滞血瘀胆道壅塞，痛势急迫，病位病性不同则主症各别。',
      transfer: '乙肝携带者饮酒后右胁不适者，试按湿热伤肝思路解释发病诱因。',
    },
  },
  {
    id: 'pb41-aa-003', title: '传染·细菌性痢疾湿热痢证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['细菌性痢疾', '湿热痢', '芍药汤', '里急后重', '甘草'],
    intent: '掌握细菌性痢疾湿热痢的证候特点与芍药汤用药，理解通因通用的治法要义。',
    facts: [
      { field: 'clinical.流行病学', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.证型辨证', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'clinical.防控要点', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '湿热痢者芍药汤（芍药15g、当归10g、黄连6g、槟榔9g、木香6g后下、炙甘草6g、大黄9g后下、黄芩10g、肉桂2g）水煎，日1剂分2次服；疫毒痢者白头翁汤（白头翁15g、黄连6g、黄柏10g、秦皮10g）加味。', caution: '甘草反海藻大戟甘遂芫花；大黄后下取通因通用之义，泻下后减量，孕妇慎用；伴高热惊厥、休克、黏液脓血便量多者静脉抗感染并急诊。' },
    cases: null,
    stdJudgment: '细菌性痢疾湿热痢以腹痛里急后重、下痢赤白黏冻、肛门灼热、苔黄腻为特征，粪检见脓细胞与红细胞；芍药汤调和气血、清热解毒、通因通用，木香槟榔调气则后重自除，归芍和血则便脓自愈。疫毒痢高热神昏抽搐属危候，抗生素与补液先行，并报告疫情。',
    coreDefinition: '细菌性痢疾湿热痢以里急后重、下痢赤白为特征，芍药汤调气行血、清热解毒。',
    safety: { note: '痢疾属法定传染病，粪便隔离至症状消失；中毒性菌痢为急危重症须立即救治；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '中毒性菌痢高热惊厥休克须立即急诊'] },
    learning: {
      knowledge: '流行病学：志贺菌经粪口途径传播，食物水源污染流行。证型：湿热痢、疫毒痢、寒湿痢、休息痢。病机：湿热疫毒蕴结肠腑、气血壅滞、脂络受损。主方：湿热痢芍药汤清热化湿、调气行血，行血则便脓自愈、调气则后重自除；疫毒痢白头翁汤凉血解毒。给药：口服为主，脱水者口服补液或静脉。防控：隔离消毒、饭前便后洗手、粪便无害化处理。',
      misjudgment: '痢疾见泻下即用止泻收敛药。错：湿热疫毒未尽，收敛则闭门留寇，反成休息痢迁延；当以清热化湿通下为法，毒去则痢自止。',
      reasoning: '同为泻利，为何痢疾用大黄通下而泄泻用止涩？',
      feedback: '痢疾之滞在肠腑气血，通因通用导邪外出；泄泻之湿在脾胃，止涩健脾固其下，一攻一守，病机虚实有别。',
      transfer: '进食不洁后发热腹痛、脓血便者，试按湿热痢思路分析补液与用药次序。',
    },
  },
  // ============================================================
  // AA 传染病·预防 · 病毒性出疹病与带状疱疹（004、005）
  // ============================================================
  {
    id: 'pb41-aa-004', title: '传染·手足口病邪犯肺脾证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['手足口病', '邪犯肺脾', '甘露消毒丹', '疱疹', '儿童'],
    intent: '掌握手足口病邪犯肺脾证的证候特点与甘露消毒丹应用，理解重症识别与隔离要求。',
    facts: [
      { field: 'clinical.流行病学', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.证型辨证', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.重症识别', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '邪犯肺脾证者甘露消毒丹加减（滑石18g包煎、茵陈15g、黄芩10g、石菖蒲9g、川贝母6g、木通6g、藿香10g后下、连翘10g、白豆蔻6g后下、薄荷6g后下、射干9g）水煎，按年龄酌减，日1剂分3次服。', caution: '木通须用木通科木通或川木通，严禁关木通（含马兜铃酸）；轻症居家隔离观察，持续高热、惊跳、精神萎靡、呼吸心率异常提示重症须立即转诊。' },
    cases: null,
    stdJudgment: '手足口病邪犯肺脾证以发热、手足口臀斑丘疹疱疹、口腔疱疹疼痛流涎、纳差为特征，舌红苔薄腻；甘露消毒丹清热解毒、化湿透邪。多由肠道病毒引起，飞沫与接触传播，5岁以下高发；持续高热伴惊跳、嗜睡、肢体抖动提示重症脑炎，须立即住院。',
    coreDefinition: '手足口病邪犯肺脾证以手足口疱疹伴湿热见症为特征，甘露消毒丹清解化湿透邪。',
    safety: { note: '手足口病属法定报告传染病，居家隔离至症状消退；重症进展迅速，精神神经异常即转诊；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', '持续高热、惊跳、嗜睡、肢体抖动提示重症须立即转诊', '木通禁用关木通（含马兜铃酸）'] },
    learning: {
      knowledge: '流行病学：EV71、柯萨奇病毒等肠道病毒引起，接触与飞沫传播，夏秋高发。证型：邪犯肺脾、湿热蒸盛。病机：湿热疫毒由口鼻而入，犯及肺脾，蒸灼肌肤发为疱疹。主方：邪犯肺脾甘露消毒丹清利湿热、宣透解毒，口腔疱疹溃烂者配冰硼散外吹，手足疱疹勿挑破。重症识别：持续高热不退、精神萎靡、频繁惊跳、呕吐、四肢抖动、呼吸心率增快。',
      misjudgment: '见疱疹即按麻疹水痘辛温透疹。错：手足口病属湿热疫毒，辛温反助热；宜清解化湿，与麻疹之疏风透疹病机治法截然两途。',
      reasoning: '同为发疹性传染病，为何手足口病宜清化而麻疹初期宜宣透？',
      feedback: '麻疹疹发于肺卫之风热，透之为顺；手足口疱疹发于湿热蒸灼，清化为主，病因湿温之别决定宣透与清解之分。',
      transfer: '托幼机构出现手足口病例者，试按隔离与消毒要求设计园所处置。',
    },
  },
  {
    id: 'pb41-aa-005', title: '传染·带状疱疹肝经湿热证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['带状疱疹', '肝经湿热', '龙胆泻肝汤', '蛇串疮', '缠腰火丹'],
    intent: '掌握带状疱疹肝经湿热证的证候特点与龙胆泻肝汤应用，理解后遗神经痛防治。',
    facts: [
      { field: 'clinical.流行病学', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.证型辨证', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治与后遗痛', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '至真要大论篇第七十四', originalText: '诸痛痒疮，皆属于心。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '肝经湿热证者龙胆泻肝汤加减（龙胆草6g、黄芩10g、栀子9g、泽泻10g、木通6g、车前子10g包煎、当归10g、生地黄15g、柴胡10g、甘草6g）水煎，日1剂分2次服。', caution: '木通禁用关木通（含马兜铃酸）；龙胆草苦寒败胃，中病即止，脾胃虚寒者慎用；甘草反海藻大戟甘遂芫花；疱疹勿挑破，老人疼痛迁延者尽早抗病毒并防治后遗神经痛。' },
    cases: null,
    stdJudgment: '带状疱疹肝经湿热证以沿一侧肋间神经带状分布的簇集水疱、灼热刺痛、口苦尿黄、苔黄腻为特征，属中医蛇串疮、缠腰火丹；龙胆泻肝汤清泄肝胆湿热。抗病毒治疗宜尽早（72小时内），老年患者疼痛迁延者后遗神经痛风险高，须及早干预，眼周受累立即眼科会诊。',
    coreDefinition: '带状疱疹肝经湿热证以带状簇疱、灼痛、口苦为特征，龙胆泻肝汤清利肝胆湿热。',
    safety: { note: '带状疱疹为水痘-带状疱疹病毒再激活，传染期疱液接触传播；眼带状疱疹与后遗神经痛须专科处理；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '木通禁用关木通（含马兜铃酸）', '眼周疱疹须眼科会诊，疱液期避免接触孕妇与未免疫者'] },
    learning: {
      knowledge: '流行病学：潜伏水痘病毒再激活，沿神经分布，免疫低下者多发。证型：肝经湿热、脾虚湿蕴、气滞血瘀（后遗期）。病机：肝胆湿热循经外发，阻遏肌肤络脉。主方：肝经湿热龙胆泻肝汤清利湿热，灼痛加延胡索、川楝子，脾虚湿蕴用除湿胃苓汤。外治：疱液期金黄散或青黛散外敷，勿挑破防感染。后遗痛：气血瘀滞者桃红四物汤合金铃子散，配合针灸理疗。',
      misjudgment: '疱疹结痂疼痛减轻即停药停药了事。错：结痂不代表神经痛解除，老年与免疫低下者后遗神经痛可迁延数月，须及早抗病毒与止痛并举。',
      reasoning: '同为疼痛疱疹，为何带状疱疹强调清热利湿，而单纯疱疹多从风热论治？',
      feedback: '带状疱疹病在肝胆湿热蕴毒循经外发，清利以断其源；单纯疱疹多风热上扰，疏风清热为先，病位病性有别，用药随之而变。',
      transfer: '肋间带状疱疹疼痛剧烈不能安卧者，试按气滞血瘀思路设计止痛方药组合。',
    },
  },
  // ============================================================
  // AA 传染病·预防 · 湿温类与暴露处置（006、009、010）
  // ============================================================
  {
    id: 'pb41-aa-006', title: '传染·伤寒温病辨治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['伤寒', '湿温', '三仁汤', '肠伤寒', '湿热留恋'],
    intent: '辨析伤寒（肠伤寒）之湿温属性与张仲景伤寒论之区别，掌握三仁汤辨治要点。',
    facts: [
      { field: 'clinical.流行病学', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.湿温病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.证型辨证', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.监护要点', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '生气通天论篇第三', originalText: '因于湿，首如裹。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '湿重于热者三仁汤（杏仁9g、白豆蔻仁6g后下、薏苡仁30g、滑石18g包煎、通草6g、竹叶6g、厚朴9g、制半夏9g）水煎，日1剂分2次服；湿热并重者王氏连朴饮（黄连6g、厚朴9g、石菖蒲9g、半夏9g、淡豆豉9g、栀子9g、芦根30g）加减。', caution: '半夏生品有毒须炮制，反乌头类（含附子）；湿温三禁：忌发汗、忌攻下、忌滋润，汗之则神昏耳聋，下之则洞泄不止，润之则病深不解；肠出血倾向、便血者禁攻下并急诊。' },
    cases: null,
    stdJudgment: '伤寒（肠伤寒）以稽留高热、相对缓脉、玫瑰疹、肝脾肿大为特征，中医辨为湿温；湿邪困遏、留恋气分，湿重于热者三仁汤宣畅气机、清利湿热，湿热并重者连朴饮。仲景伤寒论之伤寒是外感风寒总纲，二者名同实异，辨治思路一以六经、一以湿温，须严格区分。',
    coreDefinition: '肠伤寒属湿温，以湿热留恋气分为病机，三仁汤宣化湿浊，忌汗下润三法。',
    safety: { note: '肠伤寒经粪口传播，病程中肠道溃疡出血穿孔为危象；湿温三禁与中医辨治须与现代隔离观察结合；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', '半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '肠出血、便血、腹痛加剧者禁攻下并立即急诊', '湿温忌汗忌下忌滋润'] },
    learning: {
      knowledge: '流行病学：伤寒杆菌粪口传播，潜伏期1~2周，稽留热型。病机：湿热病邪困阻中焦，留恋气分，湿遏热伏。证型：湿重于热、湿热并重、热重于湿。主方：湿重于热三仁汤开上畅中渗下，湿热并重王氏连朴饮清热化湿。辨证禁忌：湿温初起禁汗（汗之则神昏耳聋）、禁下（下之则洞泄）、禁润（润之则病深不解）。监护：相对缓脉与玫瑰疹为辨证眼目，病程2~3周警惕肠出血穿孔。',
      misjudgment: '将肠伤寒之湿温按六经太阳病发汗解表。错：湿温湿热氤氲，发汗则湿邪不化反伤津致神昏；其辨证体系属卫气营血与湿温三焦，非六经伤寒之法。',
      reasoning: '同为外感病名伤寒，为何仲景以六经论治，而肠伤寒须按湿温立法？',
      feedback: '仲景伤寒乃风寒外感之总纲，六经辨其传变；肠伤寒乃湿热疫毒之病，以湿温法治之，名同实异，明此方不致混治。',
      transfer: '持续发热伴相对缓脉疑肠伤寒者，试按湿温特点设计观察与隔离要点。',
    },
  },
  {
    id: 'pb41-aa-009', title: '传染·狂犬病暴露后处置', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['狂犬病', '暴露后处置', '疫苗接种', '伤口冲洗', '被动免疫'],
    intent: '掌握狂犬病暴露分级与暴露后处置流程，理解暴露后预防的时效性与规范性。',
    facts: [
      { field: 'clinical.暴露分级', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.伤口处理', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.免疫程序', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.被动免疫', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.中医辅助', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '暴露后处置：立即用肥皂水与流动清水交替彻底冲洗伤口约15分钟，碘伏消毒；按暴露分级（Ⅰ级接触不破皮、Ⅱ级破皮无出血、Ⅲ级破皮出血或黏膜沾染）接种狂犬疫苗（Ⅱ、Ⅲ级），Ⅲ级再加用狂犬病被动免疫制剂并于接种首针前浸润注射伤口周围，必要时加破伤风抗毒素。', caution: '狂犬病一旦发病病死率近乎100%，暴露后预防须尽早规范完成；伤口深者冲洗后暂不缝合；中医清热解毒方药（如桃仁承气汤类古方思路）仅作辅助，不能替代疫苗接种与被动免疫。' },
    cases: null,
    stdJudgment: '狂犬病暴露后处置的核心是及时规范：立即肥皂水清水交替冲洗伤口15分钟并消毒，Ⅱ级及以上接种狂犬疫苗，Ⅲ级加用被动免疫制剂；暴露后预防越早越好，未及时者只要未发病仍应补种全程。狂犬病发病后几乎全部死亡，预防是唯一有效手段，中医古方防治思路仅具文献价值。',
    coreDefinition: '狂犬病暴露后处置以伤口冲洗、疫苗与被动免疫为核心，暴露后预防是唯一有效手段。',
    safety: { note: '狂犬病病死率极高，暴露后预防不能延误；疫苗接种与被动免疫按国家规范执行；知识学习内容，不构成诊疗建议', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', 'Ⅲ级暴露须被动免疫制剂与疫苗联合应用', '头部面部咬伤或免疫低下者按Ⅲ级处理', '中药不能替代疫苗与被动免疫'] },
    learning: {
      knowledge: '暴露分级：Ⅰ级接触或喂养动物、皮肤完好被舔；Ⅱ级裸露皮肤被轻咬、无出血抓伤；Ⅲ级单处或多处贯穿性咬伤、黏膜沾染。处置要点：冲洗（肥皂水+清水交替15分钟）→消毒→按级免疫；Ⅱ级接种疫苗（5针法第0、3、7、14、28天），Ⅲ级加被动免疫制剂。注意事项：咬伤头面颈者潜伏期短，优先处置；发病前全程接种均有效。',
      misjudgment: '伤口小、出血少即自行消毒处理，拒打疫苗。错：狂犬病毒经神经上行，伤口再小亦可能感染，暴露分级不以伤口大小定，规范免疫方保万全。',
      reasoning: '同为动物咬伤，为何抓伤与咬伤处置相同，而粘膜沾染亦按Ⅲ级？',
      feedback: '分级依据是皮肤黏膜完整性与唾液接触，黏膜薄嫩易吸收病毒故同按Ⅲ级；分级决定免疫策略，不依伤口外观轻重。',
      transfer: '被流浪犬咬伤小腿出血者，试按暴露处置流程排出时间节点。',
    },
  },
  {
    id: 'pb41-aa-010', title: '传染·医院感染防控与针刺伤处理', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['医院感染', '标准预防', '针刺伤', '手卫生', '职业暴露'],
    intent: '掌握医院感染防控的标准预防措施与针刺伤暴露后处理流程。',
    facts: [
      { field: 'clinical.感染链', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.标准预防', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.手卫生', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.针刺伤处置', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
      { field: 'clinical.暴露后预防', sourceType: 'textbook', sourceTitle: '《传染病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '针刺伤处置：立即在伤口旁轻轻由近心端向远心端挤压排出血液（禁止吸吮），流动水下冲洗，碘伏消毒后无菌包扎，上报医院感染管理部门，评估暴露源后进行乙肝（疫苗+免疫球蛋白）、HIV（暴露后预防2小时内启动）、丙肝等相应预防与随访。', caution: 'HIV暴露后预防用药须由专科医师评估，越早越好（2小时内最佳），并按规定随访监测；锐器使用后不复帽，利器入锐器盒；中药制剂不参与职业暴露预防。' },
    cases: null,
    stdJudgment: '医院感染防控以标准预防为基石：视所有体液血液均有潜在传染性，凡接触均防护；手卫生五个时机（接触患者前、清洁操作前、体液暴露风险后、接触患者后、接触周围环境后）为核心措施。针刺伤按挤血-冲洗-消毒-上报-评估-预防流程处置，暴露后预防用药宜早，阻断成功率与时效正相关。',
    coreDefinition: '医院感染防控以标准预防与手卫生为核心，针刺伤按挤血冲洗消毒上报评估流程处置。',
    safety: { note: '职业暴露预防用药须专科评估并随访，针刺伤处置后须登记报告；知识学习内容，不构成诊疗建议；临床操作须遵医院感染规范', prohibitions: ['传染病须按国家传染病防治法规范管理，本节点仅知识学习', '针刺伤禁止吸吮伤口', 'HIV暴露后预防须2小时内启动并随访'] },
    learning: {
      knowledge: '感染链三环节：传染源、传播途径、易感宿主。标准预防：手卫生、手套口罩防护镜、锐器安全、环境清洁消毒、医疗废物分类。手卫生时机：接触患者前、清洁/无菌操作前、体液暴露风险后、接触患者后、接触患者周围环境后。针刺伤处置：挤压排血（禁吸吮）→流动水冲洗→碘伏消毒→上报→暴露源评估→乙肝/HIV/丙肝相应预防。注意事项：钝针回套禁徒手，规范锐器盒使用。',
      misjudgment: '戴手套即认为防护到位，忽略手卫生时机。错：手套不能替代洗手，摘除手套后仍需手卫生；病原经污染手传播是院感主渠道，时机掌握比装备更重要。',
      reasoning: '同为消毒措施，为何洗手比戴手套更能降低院感率？',
      feedback: '洗手清除暂居菌并经摩擦作用即时生效，手套透气性差滋生汗液细菌，且摘戴过程可致污染，故时机正确的洗手是防控第一措施。',
      transfer: '注射室连续操作多名患者时，试按手卫生五个时机排出洗手节点。',
    },
  },
];
