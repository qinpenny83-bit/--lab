// ============================================================
// 杏林大典 · Phase 5 · Batch-20 · 样本 Part U2（U 中医儿科学 12 节点 pb20-u-014 ~ pb20-u-025）
// 学科：U 中医儿科学；覆盖：汗证（1）/ 急慢惊风（2）/ 水肿（1）/ 尿频（1）/ 遗尿（1）/
//       麻疹（1）/ 风疹（1）/ 水痘（1）/ 痄腮（1）/ 蛔虫病（1）/ 胎黄（1）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「儿科·病证·证型辨治」式
// facts sourceTitle 限定：《中医儿科学》规划教材 / 《方剂学》规划教材 / 《中药学》规划教材 /
//   《中国药典》 / 《伤寒论》规划教材 / 《温病学》规划教材
// classics 一律整书名 label（《素问》《金匮要略》《温病条辨》），篇名入 chapter，
//   originalText 逐字核对，sourceType:'classic_original'，status:'verified'，均在 classic-patch.mjs 收录
// dosage 一律按年龄分档填写 guideline/caution，小儿剂量宜小
// 高危药红线按 authoring-spec 第 4 节表：附子/细辛/朱砂/雄黄/全蝎/蜈蚣/苦楝皮/使君子/麻黄
// 难度分布：基础 4（difficulty 1）/ 中等 3（difficulty 2）/ 困难 2（difficulty 3）/ 易混综合 3（易混淆 2 + 综合推理 1）
// ============================================================

export const PART_U2 = [
  // ============================================================
  // U 中医儿科学 · 汗证 / 惊风（014–016）
  // ============================================================
  {
    id: 'pb20-u-014', title: '儿科·汗证肺卫不固证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['汗证', '自汗', '肺卫不固', '益气固表', '玉屏风散', '牡蛎散'],
    intent: '掌握小儿汗证肺卫不固证的主症舌脉、病机与益气固表治法，熟悉玉屏风散合牡蛎散的组成与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '阴阳别论篇第七', originalText: '阳加于阴谓之汗。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '玉屏风散合牡蛎散水煎，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2，6~12岁取2/3；黄芪6~12g、白术6~9g、防风3~6g、浮小麦9~15g、煅牡蛎先煎10~15g，日1剂分2~3次温服。', caution: '小儿脏腑娇嫩，剂量宜小，中病即止；麻黄根收涩止汗力强，表邪未解者忌早投；汗出当避风，汗后及时更衣。' },
    cases: null,
    stdJudgment: '汗证之肺卫不固者，白昼时时汗出，动辄益甚，头颈胸背尤多，神疲面㿠，屡屡感冒。病由卫表不固、腠理开泄，津液外泄所致。法当益气固表、调和营卫，玉屏风散合牡蛎散主之，黄芪白术固护卫表，防风走表祛风，牡蛎麻黄根浮小麦敛汗止泄，标本并图。',
    coreDefinition: '肺卫不固证以自汗为主、动则尤甚、神疲易感为特征，治以益气固表、调和营卫。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；汗出当避风，汗后及时更衣，勿过用收涩', prohibitions: [] },
    learning: {
      knowledge: '主症以自汗为主，或伴盗汗，汗出以头颈胸背为多，动则尤甚，神疲乏力，面色少华，平素易患感冒；舌淡苔薄白，脉细弱。病机肺卫气虚，卫外不固，腠理开泄。治以益气固表、调和营卫，主方玉屏风散合牡蛎散（黄芪、白术、防风、麻黄根、浮小麦、煅牡蛎），汗多不敛加五味子、糯稻根，营卫不和汗出恶风加桂枝、白芍，纳差便溏加山药、茯苓。调护以汗后及时揩干更衣、避风保暖、适当锻炼增强卫气为要。',
      misjudgment: '把动辄汗出皆作气虚，凡汗即投黄芪。错：汗证尚有湿热蒸迫、阴虚火旺者，湿热汗出身热口苦苔黄腻，阴虚盗汗潮热舌红少苔，非益气固表所能治，须辨虚实寒热。',
      reasoning: '同为自汗，肺卫不固与营卫不和治法有何差异，为何常以玉屏风散与牡蛎散合方同用？',
      feedback: '肺卫不固重在固表止汗，玉屏风散补中寓散；营卫不和则宜桂枝汤调和营卫；牡蛎散收敛止汗，两方标本兼施，汗止而不留邪。',
      transfer: '学龄前儿童白昼活动后头汗如洗、反复呼吸道感染，试按肺卫不固辨治并拟定调护。',
    },
  },
  {
    id: 'pb20-u-015', title: '儿科·急惊风证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['急惊风', '热极生风', '清热豁痰', '羚角钩藤汤', '安宫牛黄丸', '朱砂', '雄黄', '全蝎', '蜈蚣'],
    intent: '掌握急惊风热痰惊风四证并见的病机特点与清热豁痰熄风镇惊治法，熟悉羚角钩藤汤合安宫牛黄丸的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '至真要大论篇第七十四', originalText: '诸风掉眩，皆属于肝。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '羚角钩藤汤水煎，羚羊角宜锉末另煎兑入或研粉冲服0.3~0.6g，钩藤后下3~6g；安宫牛黄丸按年龄减量：3岁内每次1/4丸、3~6岁1/3丸、6岁以上1/2丸，温开水化服或鼻饲，日1~2次。', caution: '小儿剂量宜小，中病即止；安宫牛黄丸含朱砂、雄黄，不可久服，孕妇禁用；全蝎、蜈蚣有毒，用量宜小，研末吞服0.3~0.6g；急惊风属儿科急危重症，抽搐发作须立即就医。' },
    cases: null,
    stdJudgment: '急惊风以起病急骤、高热抽搐、神昏痰鸣为三大特征，热痰惊风四证并见，病位在心肝，属实热证。外感时邪化热化火，热极生风，炼液成痰，痰热蒙窍。法当清热豁痰、熄风镇惊，羚角钩藤汤凉肝熄风，合安宫牛黄丸清心开窍，急则治标，危重者须中西医急救并施。',
    coreDefinition: '急惊风以高热、抽搐、神昏、痰鸣为特征，热痰惊风并见，治以清热豁痰熄风镇惊。',
    safety: { note: '急惊风为儿科急危重症，抽搐发作须立即就医，本节点仅作知识学习；安宫牛黄丸含朱砂雄黄，只可暂用不可久服', prohibitions: ['【高风险】朱砂含硫化汞忌火煅；0.1-0.5g只入丸散；不可久服；孕妇禁用', '【高风险】雄黄有毒0.05-0.1g只入丸散；忌火煅；孕妇禁用', '全蝎有毒，煎服3~6g、研末0.6~1g，用量宜小，过量可致中毒；孕妇禁用', '蜈蚣有毒，煎服3~5g、研末0.6~1g，用量宜小，过量可致中毒；孕妇禁用'] },
    learning: {
      knowledge: '主症起病急骤，高热不退，烦躁不安，突然四肢抽搐、两目上视、牙关紧闭、颈项强直，甚则角弓反张、神志昏迷、痰涎壅盛、喉间痰鸣；舌红苔黄厚腻，脉弦数或滑数。病机外感时邪化热化火，热极生风，炼液成痰，痰热蒙蔽心窍，引动肝风。治以清热、豁痰、熄风、镇惊，主方羚角钩藤汤合安宫牛黄丸（羚羊角、钩藤、桑叶、菊花、生地黄、白芍、川贝母、竹茹、茯神、甘草），高热加石膏、知母，痰多加竹沥、天竺黄，抽搐不止加全蝎、蜈蚣、僵蚕，惊恐不宁者加朱砂入丸散、茯神。调护：抽搐时侧卧解衣、保持呼吸道通畅、防咬伤舌，急症处理同时转诊就医。',
      misjudgment: '一见抽搐即投全蝎蜈蚣等虫类镇痉。错：急惊风之抽搐以热为本，虫类熄风药治标而性走窜，剂量稍大即损小儿正气，须以清热豁痰为主，虫药少量佐之。',
      reasoning: '急惊风先开窍还是先熄风，为何医家常以安宫牛黄丸与羚角钩藤汤并进？',
      feedback: '神昏者窍闭为先，安宫牛黄丸清心开窍醒神；抽搐者肝风为急，羚角钩藤汤凉肝熄风。窍开风熄，热清痰化，惊自平复。',
      transfer: '夏秋高热患儿突发四肢强直抽搐、口吐白沫，试按急惊风辨治并说明急救次序。',
    },
  },
  {
    id: 'pb20-u-016', title: '儿科·慢惊风脾肾阳虚证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['慢惊风', '脾肾阳虚', '回阳救逆', '固真汤', '逐寒荡惊汤', '附子'],
    intent: '掌握慢惊风脾肾阳虚证的主症舌脉、病机与温补脾肾回阳救逆治法，理解急慢惊风虚实之辨。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '至真要大论篇第七十四', originalText: '诸病水液，澄澈清冷，皆属于寒。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '固真汤合逐寒荡惊汤水煎，附子须炮制先煎久煎至无麻辣感再入余药，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2；附子1.5~3g、人参另煎兑入1.5~3g，日1剂少量频服。', caution: '附子须炮制先煎久煎至无麻辣感，反半夏瓜蒌贝母白蔹白及，孕妇禁用；小儿剂量宜小，中病即止，阳回后转以温补调理，不宜久服回阳峻剂。' },
    cases: null,
    stdJudgment: '慢惊风脾肾阳虚者，病程迁延，精神萎靡，嗜睡露睛，面色㿠白，四肢不温，抽搐无力而时作时止，大便清稀完谷不化。大病久病伤及脾肾，阳气衰微，虚风内生，属阴证虚证。法当温补脾肾、回阳救逆，固真汤合逐寒荡惊汤主之，附子肉桂回阳，人参黄芪益气，阳回风定，切忌苦寒攻伐。',
    coreDefinition: '脾肾阳虚证以嗜睡露睛、四肢不温、抽搐无力、便清为特征，治以温补脾肾回阳救逆。',
    safety: { note: '慢惊风为儿科重症，须密切观察神志呼吸，必要时中西医结合救治；本节点仅作知识学习，临床用药须遵医嘱', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用'] },
    learning: {
      knowledge: '主症精神萎靡，嗜睡露睛，面色㿠白或萎黄，四肢不温，抽搐无力、时作时止，囟门低陷，大便清稀、完谷不化，小便清长；舌淡苔白，脉沉细弱。病机大病久病之后脾肾阳虚，精血亏耗，虚风内动。治以温补脾肾、回阳救逆，主方固真汤合逐寒荡惊汤（人参、白术、茯苓、炙甘草、黄芪、山药、肉桂、附子、胡椒、炮姜、丁香、灶心土），汗多肢冷加龙骨、煅牡蛎，抽搐不止加天麻、钩藤，纳少便溏加砂仁、陈皮。调护：居室温暖，注意保暖，缓慢喂食防呛入气道。',
      misjudgment: '把慢惊风抽搐误作急惊风而投清热镇惊之品。错：急惊风属实热，高热抽搐有力；慢惊风脾肾阳虚，抽搐无力、神疲肢冷，误用苦寒清热更伤阳气，风动反剧。',
      reasoning: '同为惊风，为何急惊风用羚角钩藤汤而慢惊风用固真汤逐寒荡惊汤，温凉悬殊如此？',
      feedback: '急惊风热痰实风，清热熄风；慢惊风脾肾阳虚虚风，温阳固本。虚实之辨一差，用药南辕北辙。',
      transfer: '久泻不止的患儿渐见嗜睡、手足蠕动、目光无神，试辨慢惊风先兆并立法。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 水肿 / 尿频 / 遗尿（017–019）
  // ============================================================
  {
    id: 'pb20-u-017', title: '儿科·水肿风水相搏证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['水肿', '风水相搏', '疏风利水', '麻黄连翘赤小豆汤', '五苓散', '麻黄'],
    intent: '掌握小儿水肿风水相搏证的主症舌脉、病机与疏风宣肺利水消肿治法，熟悉麻黄连翘赤小豆汤合五苓散。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '水气病脉证并治第十四', originalText: '风水，其脉自浮，外证骨节疼痛，恶风。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '麻黄连翘赤小豆汤合五苓散水煎，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2，6~12岁取2/3；麻黄3~6g先煎去沫，连翘6~9g，赤小豆15~30g，日1剂分2~3次温服。', caution: '麻黄发汗力强，虚人慎用，高血压心脏病失眠者慎用，运动员禁用；小儿剂量宜小，汗出以微汗为度，忌大汗伤津；水肿消退后即减停利水药。' },
    cases: null,
    stdJudgment: '风水相搏之肿，起于眼睑颜面，迅即遍及全身，头面为甚，皮色光亮，按之凹陷随手即起，小便短少，兼发热恶风、咳嗽咽红。风邪犯肺，宣降失司，水溢肌肤，属阳水实证。法当疏风宣肺、利水消肿，麻黄连翘赤小豆汤合五苓散主之，麻黄宣肺开腠，连翘赤小豆清热利湿，五苓散化气行水。',
    coreDefinition: '风水相搏证以眼睑颜面浮肿、迅即遍及全身、按之即起、兼表证为特征，治以疏风宣肺利水。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；急性肾炎水肿期须卧床限盐，监测尿量与血压', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用'] },
    learning: {
      knowledge: '主症水肿自眼睑颜面始，迅即波及全身，以头面为甚，皮肤光亮，按之凹陷随手即起，小便短少，伴发热恶风、咳嗽、咽红疼痛；舌质红，苔薄白或薄黄，脉浮数。病机风邪外袭，肺失宣降，通调失职，水湿泛滥肌肤。治以疏风宣肺、利水消肿，主方麻黄连翘赤小豆汤合五苓散（麻黄、连翘、赤小豆、杏仁、桑白皮、生姜、大枣、甘草、茯苓、猪苓、泽泻、桂枝、白术），咽红肿痛加牛蒡子、射干、板蓝根，血尿加白茅根、小蓟、仙鹤草，湿热重加车前子、滑石。调护：急性期卧床休息，低盐饮食，记录尿量，肿退后渐复常食。',
      misjudgment: '水肿见苔腻便溏即投健脾温阳之剂。错：风水相搏为阳水初起，邪在肺卫，当疏风利水；过早温补反致水湿留恋，水肿难消，须先解表利水。',
      reasoning: '同为水肿，风水相搏用麻黄宣肺利水，而脾虚湿困用健脾利水，机理有何不同？',
      feedback: '风水在肺，肺为水之上源，麻黄开肺气以行水；脾虚在运化，健脾以杜生湿之源。上源通、中焦运，则水湿各有出路。',
      transfer: '上呼吸道感染后突发眼睑浮肿、尿少尿血者，试按风水相搏分析病机与选方。',
    },
  },
  {
    id: 'pb20-u-018', title: '儿科·尿频脾肾气虚证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['尿频', '脾肾气虚', '温补脾肾', '升提固摄', '缩泉丸', '参苓白术散'],
    intent: '掌握小儿尿频脾肾气虚证的主症舌脉、病机与温补脾肾升提固摄治法，熟悉缩泉丸合参苓白术散。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '灵兰秘典论篇第八', originalText: '膀胱者，州都之官，津液藏焉，气化则能出矣。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '缩泉丸合参苓白术散水煎或研末为丸，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2，6~12岁取2/3；益智仁3~9g、乌药3~9g、山药6~15g，日1剂分2~3次温服。', caution: '小儿剂量宜小；湿热下注、尿急尿痛者忌用温补固涩；乌药辛温耗气，气虚甚者减量。' },
    cases: null,
    stdJudgment: '尿频之脾肾气虚者，病势迁延，小便频数、淋沥不尽，尿液清，精神倦怠，面色萎黄，形寒肢冷，纳少便溏。脾虚则中气下陷，肾虚则气化失司，膀胱约束无权。法当温补脾肾、升提固摄，缩泉丸合参苓白术散主之，益智仁乌药温肾缩尿，参术苓健脾升提，标本同治。',
    coreDefinition: '脾肾气虚证以小便频数清长、神倦纳差、形寒肢冷为特征，治以温补脾肾升提固摄。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；尿频久治不效须查尿常规排除感染', prohibitions: [] },
    learning: {
      knowledge: '主症病程日久，小便频数、淋沥不尽，尿液清，精神倦怠，面色萎黄，食欲不振，形寒怕冷，手足不温，大便稀薄；舌淡苔薄白，脉细弱。病机脾肾气虚，膀胱气化不利，约束无力。治以温补脾肾、升提固摄，主方缩泉丸合参苓白术散（益智仁、乌药、山药、党参、白术、茯苓、薏苡仁、莲子肉、白扁豆、砂仁、桔梗、甘草），畏寒肢冷加肉桂、菟丝子，尿频明显加桑螵蛸、芡实，纳差加焦山楂、神曲。调护：睡前少饮水，及时排尿，注意会阴部清洁防尿路感染。',
      misjudgment: '尿频伴尿黄即作湿热下注投八正散。错：湿热尿频尿急尿痛、苔黄腻属实，脾肾气虚尿频清长、神倦肢冷属虚，误用苦寒通利更耗脾肾之气，尿频反甚。',
      reasoning: '同见小便频数，为何湿热下注用八正散清利，脾肾气虚用缩泉丸温补？',
      feedback: '湿热者邪实，清利膀胱以通淋；气虚者正虚，温补脾肾以固摄。虚实异治，方不致误。',
      transfer: '肾病缓解期患儿仍日间尿频、夜尿清长、纳差神疲，试按脾肾气虚调治。',
    },
  },
  {
    id: 'pb20-u-019', title: '儿科·遗尿肾气不固证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['遗尿', '肾气不固', '温肾固涩', '菟丝子散', '附子'],
    intent: '掌握小儿遗尿肾气不固证的主症舌脉、病机与温补肾阳固涩止遗治法，熟悉菟丝子散的组成与附子用法。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '宣明五气篇第二十三', originalText: '膀胱不利为癃，不约为遗溺。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '菟丝子散加减水煎，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2，6~12岁取2/3；菟丝子6~12g、肉苁蓉3~9g、附子1.5~3g先煎久煎，五味子3~6g，日1剂分2次温服，或研末为散分服。', caution: '附子须炮制先煎久煎至无麻辣感，反半夏瓜蒌贝母白蔹白及，孕妇禁用；小儿剂量宜小，中病即止；肝经湿热及膀胱湿热者忌用温补固涩。' },
    cases: null,
    stdJudgment: '遗尿属肾气不固者，睡中不自主排尿，醒后方觉，一夜可数遗，尿清而长，面色㿠白，神疲畏寒，腰膝酸软。肾主封藏，司二便，下元虚寒则膀胱失约。法当温补肾阳、固涩止遗，菟丝子散加减主之，菟丝子肉苁蓉附子温肾助阳，五味子牡蛎鸡内金固涩缩尿，肾气充则膀胱约束有权。',
    coreDefinition: '肾气不固证以睡中遗尿、尿清而长、畏寒肢冷为特征，治以温补肾阳固涩止遗。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；遗尿久治不效须除外隐性脊柱裂等器质病变', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用'] },
    learning: {
      knowledge: '主症睡中经常遗尿，醒后方觉，一夜可遗数次，小便清长，面色㿠白，神疲乏力，畏寒肢冷，腰膝酸软，智力发育稍迟于同龄儿；舌淡苔白滑，脉沉细无力。病机肾气不足，命门火衰，下元虚寒，膀胱失约。治以温补肾阳、固涩止遗，主方菟丝子散加减（菟丝子、肉苁蓉、附子、五味子、鸡内金、煅牡蛎、益智仁），肢冷明显加肉桂、巴戟天，纳呆便溏加白术、茯苓、山药，尿频加桑螵蛸、覆盆子。调护：睡前控制饮水量，夜间定时唤醒排尿，家长勿斥责，培养自主排尿习惯。',
      misjudgment: '遗尿兼尿黄烦躁即投清肝泻火之剂。错：肝经湿热遗尿多见于白天尿急、尿黄味臊、性情急躁，与本证睡中清长遗尿迥异，误用苦寒更伤肾阳。',
      reasoning: '遗尿一证，何以肾气不固者治以温补固涩，而肝经湿热者治以清泻？',
      feedback: '肾司封藏，虚则失约故温补；肝经湿热下迫膀胱，实则失司故清泻。辨证之要在小便清长与尿黄烦躁之分。',
      transfer: '8岁患儿仍每夜遗尿、畏寒肢冷、夜尿清长，试拟温肾固涩之治并说明调护。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 麻疹 / 风疹 / 水痘（020–022）
  // ============================================================
  {
    id: 'pb20-u-020', title: '儿科·麻疹顺证证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['麻疹', '顺证', '透疹', '宣毒发表汤', '清解透表汤', '沙参麦冬汤'],
    intent: '掌握麻疹顺证三期传变的主症与治法，熟悉宣毒发表汤、清解透表汤、沙参麦冬汤，并能与风疹、幼儿急疹、猩红热鉴别。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '宣毒发表汤、清解透表汤、沙参麦冬汤均水煎，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2，6~12岁取2/3；升麻、葛根各3~9g，薄荷后下，日1剂分2~3次温服。', caution: '小儿剂量宜小，透疹药中病即止；麻疹忌用糖皮质激素与强效退热药，高热可物理降温；出疹期忌食油腻辛辣，忌过早收敛。' },
    cases: null,
    stdJudgment: '麻疹顺证重审期察色。初热期邪犯肺卫，发热咳嗽、目赤流泪、口腔麻疹黏膜斑，治以辛凉透表；出疹期邪入肺胃，疹随潮热循序透发，耳后头面、躯干四肢，终及手足心，疹色红润、颗粒分明，治以清凉解毒透疹；收没期阴津耗伤，疹点依序隐退、糠状脱屑，治以养阴益气。疹出有序、疹色红润、热退疹隐，为顺证之要。',
    coreDefinition: '麻疹顺证按初热、出疹、收没三期依次演变，疹出有序色润，治以透表、解毒、养阴。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；麻疹为法定传染病，确诊须报告隔离，重症转诊', prohibitions: [] },
    learning: {
      knowledge: '主症按三期传变：初热期发热、咳嗽、流涕喷嚏、目赤畏光流泪，口腔两颊近臼齿处见麻疹黏膜斑，苔薄白或微黄，脉浮数，治以辛凉透表、清宣肺卫，主方宣毒发表汤（升麻、葛根、前胡、杏仁、桔梗、枳壳、荆芥、防风、薄荷、木通、连翘、牛蒡子、竹叶、甘草）；出疹期发热起伏如潮，疹点先耳后发际、头面，渐及躯干四肢，手足心见疹为透齐，疹色红润、分布均匀、触之碍手，舌红苔黄、脉数，治以清凉解毒、透疹达邪，主方清解透表汤（西河柳、蝉蜕、葛根、升麻、紫草、桑叶、菊花、牛蒡子、金银花、连翘、甘草）；收没期疹点依次隐退，热退咳减，糠状脱屑，留棕褐色沉着，舌红少津、脉细数，治以养阴益气、清解余邪，主方沙参麦冬汤（沙参、麦冬、玉竹、天花粉、扁豆、桑叶、甘草）。调护：隔离至出疹后5天，合并肺炎者延长至10天，透疹期忌过早投大寒与收敛之剂，居室通风避光保暖。',
      misjudgment: '出疹期一见高热即用苦寒退热。错：疹随潮热外透，妄投苦寒冰伏邪气，疹出不透反生变证；透疹期贵在因势利导，使邪有出路。',
      reasoning: '麻疹出疹期为何不急于退热，反而以清热透疹为法，其理何在？',
      feedback: '热为透疹动力，潮热随疹透而解；清解透表使热有外达之路，若强遏其热，疹闭毒陷，肺炎喉痹诸变由生。',
      transfer: '发热咳嗽患儿口腔颊黏膜见灰白小点，试据此早期识别并拟定透疹治法。',
    },
  },
  {
    id: 'pb20-u-021', title: '儿科·风疹邪郁肺卫证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['风疹', '邪郁肺卫', '疏风清热', '银翘散'],
    intent: '掌握风疹邪郁肺卫证的主症舌脉、病机与疏风清热解表透疹治法，熟悉银翘散的组成与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《温病条辨》', canon: '《温病条辨》', chapter: '上焦篇', originalText: '太阴风温、温热、温疫、冬温，初起恶风寒者，桂枝汤主之；但热不恶寒而渴者，辛凉平剂银翘散主之。', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '银翘散加减水煎，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2，6~12岁取2/3；金银花、连翘各6~12g，薄荷、荆芥穗后下，武火急煎香气大出即服，日1剂分2~3次。', caution: '小儿剂量宜小，中病即止；辛凉解表方不宜久煎；风寒感冒及脾胃虚寒便溏者慎用。' },
    cases: null,
    stdJudgment: '风疹邪郁肺卫，发热恶风，喷嚏流涕，咳嗽咽痛，一二日内遍身淡红细小斑丘疹，先头面而后躯干四肢，疹色浅红、分布均匀，耳后枕部臖核肿大压痛。风热时邪郁于肺卫，透达肌肤。法当疏风清热、解表透疹，银翘散加减主之，邪透疹出则热自解。',
    coreDefinition: '邪郁肺卫证以发热恶风、淡红细疹、枕后臖核肿大为特征，治以疏风清热解表透疹。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；妊娠早期妇女须避免接触风疹患儿', prohibitions: [] },
    learning: {
      knowledge: '主症发热恶风，喷嚏流涕，咳嗽咽痛，发热1~2天内全身出现淡红色细小斑丘疹，自头面躯干渐及四肢，疹色浅红、分布均匀，耳后及枕部臖核肿大压痛；舌红苔薄白或薄黄，脉浮数。病机风热时邪侵袭肺卫，正气驱邪外达，疹透肌肤。治以疏风清热、解表透疹，主方银翘散加减（金银花、连翘、桔梗、薄荷、竹叶、生甘草、荆芥穗、淡豆豉、牛蒡子、芦根），疹色红赤加牡丹皮、赤芍、紫草，咽痛加板蓝根、玄参，咳嗽加杏仁、前胡、桑叶。调护：隔离至出疹后5天，孕妇妊娠早期避免接触患儿，多饮水，清淡饮食。',
      misjudgment: '把风疹疹色红赤误作热毒炽盛而重用苦寒。错：风疹邪郁肺卫，病在卫分，辛凉轻透即可；过用苦寒引邪内陷，反碍疹透。',
      reasoning: '风疹与麻疹均见皮疹发热，为何风疹一二日遍布、热势不盛，其病机差异在何处？',
      feedback: '风疹邪轻浅，郁于肺卫而外透；麻疹邪深重，随潮热循序透发。审热势之高低与疹出之次序，可别二病。',
      transfer: '发热咽痛次日即见全身淡红细疹、耳后淋巴结肿大者，试按风疹辨治。',
    },
  },
  {
    id: 'pb20-u-022', title: '儿科·水痘邪伤肺卫证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['水痘', '邪伤肺卫', '利湿解毒', '银翘散', '六一散'],
    intent: '掌握水痘邪伤肺卫证的主症舌脉、病机与疏风清热利湿解毒治法，熟悉银翘散合六一散的组成与调护禁忌。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '银翘散合六一散加减水煎，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2，6~12岁取2/3；金银花、连翘各6~12g，滑石包煎6~12g，薄荷后下，日1剂分2~3次温服。', caution: '小儿剂量宜小，中病即止；水痘患儿禁用糖皮质激素；疱疹破溃处注意清洁防继发感染，忌搔抓。' },
    cases: null,
    stdJudgment: '水痘邪伤肺卫，发热轻微，鼻塞流涕，喷嚏咳嗽，一二日内皮肤分批出现斑疹、丘疹、疱疹、结痂，四代同堂，躯干为多，疱浆清亮，根盘红晕，瘙痒。时行邪毒蕴于肺卫，外透肌表，兼夹湿邪。法当疏风清热、利湿解毒，银翘散合六一散加减主之，邪透湿化则痘渐结痂。',
    coreDefinition: '邪伤肺卫证以发热轻、斑疹丘疹疱疹结痂并见、疱浆清亮为特征，治以疏风清热利湿解毒。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；水痘为传染病须隔离，重症或免疫缺陷患儿立即就医', prohibitions: [] },
    learning: {
      knowledge: '主症发热轻微或无热，鼻塞流涕，喷嚏咳嗽，1~2天内皮疹分批出现，以躯干为多、头面四肢较少，斑疹、丘疹、疱疹、结痂同时并见，疱疹大小不一、疱浆清亮、疱壁薄、根盘红晕、瘙痒；舌红苔薄白或薄黄，脉浮数。病机时行邪毒经口鼻侵入，蕴于肺卫，外透肌表，与内湿相搏。治以疏风清热、利湿解毒，主方银翘散合六一散加减（金银花、连翘、竹叶、牛蒡子、桔梗、薄荷、荆芥穗、滑石、甘草），瘙痒甚加蝉蜕、白鲜皮、地肤子，咽痛加板蓝根、玄参，疱疹稠密浆浊加薏苡仁、土茯苓、紫草。调护：隔离至疱疹全部结痂干燥，剪短指甲防抓破感染，水痘忌用糖皮质激素，发热期卧床休息。',
      misjudgment: '水痘瘙痒即用激素类软膏止痒。错：糖皮质激素抑制免疫，可致水痘播散加重，甚则危及生命；止痒宜疏风利湿之品外洗。',
      reasoning: '水痘与脓疱疮均有疱疹，何以水痘忌用激素而脓疱疮局部处理不同，鉴别要点何在？',
      feedback: '水痘疱疹呈向心性分布、分批出现、疱壁薄易破，为病毒所致；脓疱疮多见于暴露部位、疱液浑浊脓性。辨清病性，用药方向自明。',
      transfer: '托幼机构出现发热出疹患儿，躯干散见清亮疱疹，试拟定隔离与辨治要点。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 痄腮 / 蛔虫病 / 胎黄（023–025）
  // ============================================================
  {
    id: 'pb20-u-023', title: '儿科·痄腮热毒蕴结证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['痄腮', '热毒蕴结', '清热解毒', '软坚散结', '普济消毒饮', '青黛散'],
    intent: '掌握痄腮热毒蕴结证的主症舌脉、病机与清热解毒软坚散结治法，熟悉普济消毒饮内服合外敷同治，并能与发颐鉴别。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '普济消毒饮加减水煎，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2，6~12岁取2/3；黄芩、连翘各6~12g，板蓝根9~15g，薄荷后下，日1剂分2~3次温服；青黛散或如意金黄散醋调敷患处，日1~2次。', caution: '小儿剂量宜小，中病即止；马勃入煎剂宜包煎，便溏者慎用苦寒；外敷药勿入眼口，皮肤破溃者停敷。' },
    cases: null,
    stdJudgment: '痄腮热毒蕴结，腮部漫肿，坚硬拒按，灼热疼痛，张口咀嚼困难，高热烦躁，口渴便秘。温毒炽盛，蕴结少阳经脉，气血壅滞结于腮颊。法当清热解毒、软坚散结，普济消毒饮加减主之，并以外敷青黛散、如意金黄散为助，内外合治，肿消热退。',
    coreDefinition: '热毒蕴结证以腮部漫肿坚硬灼痛、高热烦躁为特征，治以清热解毒软坚散结。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；并发脑膜炎、睾丸炎者须及时就医', prohibitions: [] },
    learning: {
      knowledge: '主症腮部漫肿，坚硬拒按，灼热疼痛，张口咀嚼困难，高热不退，烦躁口渴，头痛，咽红肿痛，便秘尿赤；舌红苔黄，脉滑数。病机温毒炽盛，蕴结少阳经脉，气血壅滞，结于腮颊。治以清热解毒、软坚散结，主方普济消毒饮加减（黄芩、黄连、连翘、板蓝根、玄参、马勃、牛蒡子、僵蚕、升麻、柴胡、陈皮、桔梗、甘草、薄荷），热甚加生石膏、知母、栀子，便秘加大黄、芒硝，肿硬不散加夏枯草、海藻、昆布、牡蛎，并发睾丸肿痛加龙胆草、荔枝核、延胡索。外治以青黛散或如意金黄散醋调外敷腮部。调护：隔离至腮肿消退，流质饮食，避免酸辣刺激，保持口腔清洁。',
      misjudgment: '把颌下淋巴结炎误作痄腮。错：淋巴结炎肿在颌下、可触及孤立肿块、边界清，腮腺管口无红肿；痄腮肿在耳垂周围、以耳垂为中心漫肿、边界不清，腮腺管口红肿。',
      reasoning: '痄腮热毒蕴结与发颐均见腮颊肿痛，为何一属温毒时邪、一属热毒化脓，治法如何区别？',
      feedback: '痄腮为时行温毒、病在少阳，多双侧漫肿、不化脓，宜清热解毒软坚；发颐为热毒蕴结化脓，多单侧、挤压溢脓，须消肿排脓。',
      transfer: '学龄儿童高热、双侧腮部以耳垂为中心漫肿疼痛者，试拟内服外敷同治方案。',
    },
  },
  {
    id: 'pb20-u-024', title: '儿科·蛔虫病证治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['蛔虫病', '驱蛔杀虫', '使君子散', '乌梅丸', '苦楝皮', '细辛', '附子'],
    intent: '掌握小儿蛔虫病肠蛔虫证与蛔厥证的辨治，熟悉使君子散与乌梅丸的运用及驱虫药毒性警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '趺蹶手指臂肿转筋阴狐疝蛔虫病脉证治第十九', originalText: '蛔虫之为病，令人吐涎，心痛发作有时，毒药不止，甘草粉蜜汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '使君子散加减：使君子仁炒香嚼服或入煎，按年龄折算，3岁以下每日6~9g、3~6岁9~12g、6~12岁12~15g，分2~3次服，连服2~3日；苦楝子或苦楝皮3~6g煎服。乌梅丸按年龄减量：3岁内每次3~6g、3~6岁6~9g、6岁以上9~12g，温开水送服。', caution: '【高风险】苦楝皮有毒不可过量久服，小儿脾胃虚寒慎用；使君子过量致呃逆眩晕，服后忌饮热茶；乌梅丸含细辛、附子，细辛煎剂1~3g、散剂0.5~1g，附子须炮制先煎久煎至无麻辣感，小儿剂量宜小；蛔厥或肠梗阻须立即就医。' },
    cases: null,
    stdJudgment: '蛔虫病以脐周腹痛、时作时止、痛止如常为纲，或嗜食异物、睡中磨牙、面有白斑，粪便查得虫卵可确诊；蛔厥证突发脘腹绞痛、痛引肩背、四肢厥冷、呕恶吐蛔。虫居肠中扰动气机，蛔性喜钻孔乱窜。肠蛔虫证驱蛔杀虫、调理脾胃，使君子散主之；蛔厥先安蛔定痛、乌梅丸主之，痛止再驱虫，此为治疗大要。',
    coreDefinition: '蛔虫病以脐周腹痛时作时止、大便下虫为特征，治以驱蛔杀虫；蛔厥则先安蛔定痛。',
    safety: { note: '驱虫药宜晨起空腹服，服后观察排虫情况；蛔厥、虫瘕为急腹症须立即就医；本节点仅作知识学习', prohibitions: ['【高风险】苦楝皮有毒不可过量久服；小儿脾胃虚寒慎用', '【高风险】细辛煎剂1-3g散剂0.5-1g，过量可致中毒；反藜芦', '附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '使君子有毒，过量致呃逆眩晕，忌与热茶同服'] },
    learning: {
      knowledge: '主症反复脐周腹痛，时作时止，痛止如常，食欲不振或嗜食异物，睡中磨牙流涎，面部白斑、巩膜蓝斑，大便下虫或粪便检出虫卵；舌淡红苔白或腻，脉弦。蛔厥证见突发胃脘及右胁下绞痛，痛引肩背，弯腰翻滚，四肢厥冷，恶心呕吐，甚则吐蛔。病机饮食不洁感染虫卵，蛔虫寄居肠中，扰动胃肠气机；蛔上扰胆道则成蛔厥。治以驱蛔杀虫、调理脾胃，肠蛔虫证主方使君子散加减（使君子、苦楝子、白芜荑、甘草），蛔厥证主方乌梅丸（乌梅、细辛、干姜、黄连、当归、附子、蜀椒、桂枝、人参、黄柏），腹痛加木香、延胡索，虫积日久脾虚加党参、白术。调护：晨起空腹服驱虫药，观察排虫情况；讲究饮食卫生，饭前便后洗手，瓜果洗净再食。',
      misjudgment: '蛔厥腹痛即投驱虫峻剂。错：蛔厥时蛔虫扰动胆道，驱虫药刺激蛔虫更乱窜，痛反加剧；须先安蛔定痛、酸以制蛔，待痛止脉和再议驱虫。',
      reasoning: '乌梅丸治蛔厥为何重用乌梅之酸，方中辛热与苦寒并用之理何在？',
      feedback: '蛔得酸则静，乌梅酸收安蛔；细辛附子蜀椒干姜辛热温脏散寒，黄连黄柏苦寒清热，辛开苦降使蛔静痛止，此厥阴病寒热错杂之治。',
      transfer: '小儿阵发脐周痛、夜间磨牙、面见虫斑，试拟驱虫方并说明服法与调护。',
    },
  },
  {
    id: 'pb20-u-025', title: '儿科·胎黄湿热郁蒸证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['胎黄', '湿热郁蒸', '清热利湿', '茵陈蒿汤'],
    intent: '掌握新生儿胎黄湿热郁蒸证的主症、病机与清热利湿退黄治法，熟悉茵陈蒿汤的组成与新生儿剂量警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '平人气象论篇第十八', originalText: '溺黄赤，安卧者，黄疸。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '茵陈蒿汤加减水煎，新生儿剂量宜小：茵陈3~6g、栀子2~3g、大黄1~3g后下，日1剂少量频服或鼻饲；随年龄增长酌增，婴幼儿取成人量1/6~1/3。', caution: '小儿剂量宜小，大黄通腑中病即止，便溏即减；茵陈过量可致恶心；黄疸进展快、精神差、大便灰白者须立即就医排查胆道闭锁等重症。' },
    cases: null,
    stdJudgment: '胎黄湿热郁蒸，面目皮肤发黄，色泽鲜明如橘皮，烦躁啼哭，不欲吮乳，小便深黄，大便干结。孕母湿热传胎或生后感邪，湿热郁蒸肝胆，胆汁外溢。法当清热利湿退黄，茵陈蒿汤加减主之，茵陈栀子清利湿热，大黄通腑泄热，湿热去则黄疸自退，并须结合光照等现代疗法。',
    coreDefinition: '湿热郁蒸证以面目皮肤发黄鲜明如橘皮、烦躁尿黄为特征，治以清热利湿退黄。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；新生儿黄疸重症须结合光照等现代治疗', prohibitions: [] },
    learning: {
      knowledge: '主症面目皮肤发黄，色泽鲜明如橘皮，烦躁啼哭，不欲吮乳，口渴唇干，小便深黄，大便秘结；舌红苔黄腻，指纹紫滞。病机孕母湿热内蕴传于胎儿，或生后感受湿热邪毒，湿热郁蒸肝胆，胆汁外溢肌肤。治以清热利湿退黄，主方茵陈蒿汤加减（茵陈、栀子、大黄），热重加虎杖、黄芩、板蓝根，湿重加茯苓、猪苓、泽泻、车前子，腹胀加厚朴、枳实，呕吐加竹茹、制半夏。调护：多喂糖水促进排尿退黄，密切观察精神、黄疸程度与大便颜色，黄疸进展快或精神萎靡者中西医结合救治。',
      misjudgment: '胎黄不分虚实，一律投茵陈蒿汤。错：胎黄尚有脾虚湿困之阴黄，黄色晦暗、神疲便溏、四肢欠温，当健脾温中；湿热郁蒸者色黄鲜明属实，方可用清利。',
      reasoning: '同为胎黄，湿热郁蒸用茵陈蒿汤清利，脾虚湿困用茵陈理中汤温运，辨色之明晦为何是分证眼目？',
      feedback: '黄色鲜明如橘者为阳黄属湿热，黄色晦暗如烟熏者为阴黄属寒湿，色泽明晦一辨，寒热虚实立分。',
      transfer: '新生儿生后三日皮肤黄染鲜明、烦啼、便干尿黄者，试拟清热利湿退黄方案并说明监护要点。',
    },
  },
];
