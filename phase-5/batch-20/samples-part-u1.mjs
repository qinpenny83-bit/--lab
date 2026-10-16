// ============================================================
// 杏林大典 · Phase 5 · Batch-20 · 样本 Part U1（U 中医儿科学 13 节点 pb20-u-001 ~ pb20-u-013）
// 学科：U 中医儿科学；覆盖：小儿生理病理特点（1）/ 喂养保育（1）/ 感冒（1）/ 咳嗽（1）/
//       肺炎喘嗽（1）/ 哮喘（2）/ 厌食（1）/ 积滞（1）/ 疳证（1）/ 泄泻（2）/ 夜啼（1）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「儿科·病证·证型辨治」式，前缀带「儿科·」
// facts sourceTitle 限定：《中医儿科学》规划教材 / 《方剂学》规划教材 / 《中药学》规划教材 /
//   《中国药典》 / 《伤寒论》规划教材 / 《温病学》规划教材
// classics 一律整书名 label（《小儿药证直诀》《幼幼集成》《幼科发挥》《小儿病源方论》《素问》
//   《灵枢》《温病条辨》《伤寒论》《景岳全书》），篇名入 chapter，originalText 逐字核对，
//   sourceType:'classic_original'，status:'verified'，均已在 classic-patch.mjs 收录
// dosage 一律填写 guideline（按年龄分档剂量）/caution（小儿剂量宜小等警戒）
// 高危药红线按 authoring-spec 第 4 节表：麻黄/甘草/半夏/木通（关木通马兜铃酸）/朱砂/细辛等
// 难度分布：基础 4（difficulty 1）/ 中等 4（difficulty 2）/ 困难 3（difficulty 3）/ 易混综合 2（易混淆 1 + 综合推理 1）
// ============================================================

export const PART_U1 = [
  // ============================================================
  // U 中医儿科学 · 生理病理与喂养保育（001–002）
  // ============================================================
  {
    id: 'pb20-u-001', title: '儿科·小儿生理病理特点要义', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['儿科', '生理特点', '病理特点', '稚阴稚阳', '易虚易实'],
    intent: '掌握小儿脏腑娇嫩、形气未充与生机蓬勃、发育迅速的生理特点，以及发病容易、传变迅速、脏气清灵、易趋康复的病理特点。',
    facts: [
      { field: 'clinical.生理特点-脏腑娇嫩形气未充', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.生理特点-生机蓬勃发育迅速', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病理特点-发病容易传变迅速', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病理特点-脏气清灵易趋康复', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.稚阴稚阳与纯阳学说', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.易虚易实易寒易热', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '逆顺肥瘦第三十八', originalText: '婴儿者，其肉脆血少气弱。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
      { label: '《小儿药证直诀》', canon: '《小儿药证直诀》', chapter: '阎孝忠序', originalText: '脏腑柔弱，易虚易实，易寒易热。', sourceTitle: '《小儿药证直诀》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '本节点论述小儿生理病理特点，不涉具体方药；临床用药一律按年龄折算：新生儿约成人量1/6，1~6个月约1/5，6个月~1岁约1/4，1~3岁约1/3，3~7岁约1/3~1/2，7~14岁约1/2~2/3。', caution: '小儿脏腑娇嫩、形气未充，剂量宜小、药味宜精、中病即止；攻伐、苦寒、温燥之品尤须审慎，防虚虚实实之变。' },
    cases: null,
    stdJudgment: '小儿生理特点可概括为脏腑娇嫩、形气未充与生机蓬勃、发育迅速两端，病理上则发病容易、传变迅速，脏气清灵、易趋康复。钱乙以易虚易实、易寒易热六字总括其病机变化，治疗上宜轻灵制胜、中病即止，不可过用攻伐。',
    coreDefinition: '小儿生理特点为脏腑娇嫩、形气未充，生机蓬勃、发育迅速；病理特点为发病容易、传变迅速，脏气清灵、易趋康复。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；小儿用药须按年龄折算，忌攻伐太过', prohibitions: [] },
    learning: {
      knowledge: '生理特点：脏腑娇嫩、形气未充，即稚阴稚阳，阴精阳气均未充盛；生机蓬勃、发育迅速，故称纯阳之体。病理特点：发病容易、传变迅速，脏气清灵、易趋康复。小儿肺脾肾三脏常不足、肝心二脏常有余；钱乙谓其易虚易实、易寒易热，故辨证宜快、用药宜轻，处处顾护脾肺。',
      misjudgment: '把纯阳误作阳热亢盛而滥用苦寒。错：纯阳之体指生机旺盛、发育迅速，并非阴虚阳亢；小儿脏气清灵，苦寒过用反伤脾阳，伐生生之气。',
      reasoning: '同为稚阴稚阳之体，为何小儿发热之变证远较成人急骤？',
      feedback: '小儿脏腑柔弱而神气怯弱，感邪后易从热化、从火化，热极可生风动痰，故传变迅速；认准这一特点，临证处方才敢早投截断之剂。',
      transfer: '对反复感冒的学龄前儿童，如何据脾常不足、肺常虚的特点拟定调护方案？',
    },
  },
  {
    id: 'pb20-u-002', title: '儿科·小儿喂养保育要点', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['儿科', '喂养', '保育', '乳食有节', '辅食添加'],
    intent: '掌握小儿喂养与保育的基本原则，理解乳食不节、寒温失调与脾胃病、外感病的发生关系。',
    facts: [
      { field: 'clinical.喂养方式与母乳喂养', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.辅食添加原则', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.保育要点-三分饥与寒', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.乳食不节致病', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.调护与疾病预防', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '五味第五十六', originalText: '故谷不入，半日则气衰，一日则气少矣。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '本节点述喂养保育，不涉方药剂量；若因病用药，仍按年龄折算：1岁以下约成人量1/6~1/4，1~3岁约1/3，3~7岁约1/3~1/2，7~14岁约1/2~2/3，日1剂分2~3次服。', caution: '小儿喂养贵在有节，乳贵有时、食贵有节，忌恣食生冷肥甘；用药剂量宜小，药后注意观察乳食、大便与精神状态。' },
    cases: null,
    stdJudgment: '小儿喂养以母乳为佳，按时哺乳、乳贵有时；添加辅食宜由少到多、由稀到稠、由细到粗、由一种到多种，循序渐进。调护讲究若要小儿安、常受三分饥与寒，背暖肚暖足暖、头凉心胸凉，乳食有节、寒温适度，脾胃自安而少病。',
    coreDefinition: '小儿喂养保育贵在乳食有节、寒温适调，强调三分饥与寒，脾胃得护则少病。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；喂养知识不构成个体化喂养方案，特殊体质小儿宜咨询专科', prohibitions: [] },
    learning: {
      knowledge: '喂养要点：半岁以内以母乳或配方乳为主，按时哺乳、乳贵有时；4~6个月起逐步添加辅食，遵循由少到多、由稀到稠、由细到粗、由一种到多种的原则。保育要点：衣着宜背暖、肚暖、足暖，头凉、心胸凉；食勿过饱，即三分饥与寒；忌偏食、零食与生冷肥甘，乳食不节最易伤脾致病。',
      misjudgment: '怕小儿受凉而过度厚衣保暖。错：衣被过厚则汗出腠疏，反易感邪，且阳郁于内而生内热；头凉、心胸凉正是给郁热以出路。',
      reasoning: '同是三分饥与寒，为何饥偏于护脾、寒偏于固表？',
      feedback: '食带三分饥则脾胃不伤、运化有力；衣着三分寒则腠理致密、卫外坚固，一护内一固外，共御病邪。',
      transfer: '添加辅食后小儿大便不调、夜卧不宁者，试从喂养失节角度分析并调整。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 感冒与咳嗽（003–004）
  // ============================================================
  {
    id: 'pb20-u-003', title: '儿科·感冒风寒证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['儿科', '感冒', '风寒', '辛温解表', '荆防败毒散', '甘草'],
    intent: '掌握小儿风寒感冒的主症舌脉指纹、病机与辛温解表治法，熟悉荆防败毒散的组方与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉指纹', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '阴阳应象大论篇第五', originalText: '其在皮者，汗而发之。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '荆防败毒散（荆芥、防风、羌活、独活、柴胡、前胡、川芎、枳壳、桔梗、茯苓、甘草）水煎，日1剂分2~3次温服；按年龄折算：1岁以下约为成人量1/6~1/4，1~3岁约1/3，3~7岁约1/3~1/2，如荆芥、防风成人各9g，1~3岁各用约3g，3~7岁各用约4~5g。', caution: '小儿剂量宜小，药后以微微汗出为度，中病即止，忌大汗亡阳伤阴；辛温药武火急煎、不宜久煮；汗后避风，多饮温水。' },
    cases: null,
    stdJudgment: '小儿风寒感冒以恶寒发热、无汗、头身疼痛、鼻塞流清涕、咳嗽喷嚏、咽不红为特征，舌苔薄白、脉浮紧、指纹浮红；风寒外束、卫阳被遏、肺气失宣，法当辛温解表、宣肺散寒，荆防败毒散为常用之方，小儿剂量须按年龄折算，忌峻汗。',
    coreDefinition: '小儿风寒感冒以恶寒重、发热轻、无汗、鼻塞流清涕、苔薄白脉浮紧为特征，治以辛温解表，方用荆防败毒散。',
    safety: { note: '荆防败毒散辛温发散，小儿服后取微汗即可，中病即止；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症恶寒发热、无汗、头痛身痛、鼻塞流清涕、喷嚏、咳嗽咽痒、痰白清稀；舌苔薄白，脉浮紧，指纹浮红。病机风寒外束，卫阳被遏，肺气失宣。治以辛温解表、宣肺散寒，主方荆防败毒散（荆芥、防风、羌活、独活、柴胡、前胡、川芎、枳壳、桔梗、茯苓、甘草），头痛加白芷，咳嗽重加杏仁，鼻塞加苍耳子、辛夷，夹食加神曲、山楂；调护宜避风寒、进温水、饮食清淡。',
      misjudgment: '见咽红即断风热而投辛凉。错：风寒感冒咽多不红，舌苔薄白、脉浮紧、无汗，误用辛凉则寒邪郁闭难解，咳嗽迁延；辨咽红与否是小儿寒热感冒的关键分界。',
      reasoning: '小儿风寒感冒为何以荆防败毒散取微汗，而不轻易用麻黄汤峻汗？',
      feedback: '小儿脏腑娇嫩，峻汗易伤卫阳、耗津液，反致正虚邪恋；荆防败毒散药力平和，微汗即解，合小儿不耐攻伐之性。',
      transfer: '冬季小儿受凉后恶寒无汗、喷嚏流清涕，试按风寒感冒辨治并给出剂量折算。',
    },
  },
  {
    id: 'pb20-u-004', title: '儿科·咳嗽风热证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['儿科', '咳嗽', '风热犯肺', '辛凉宣肺', '桑菊饮', '甘草'],
    intent: '掌握小儿风热咳嗽的主症舌脉指纹、病机与疏风清热宣肺止咳治法，熟悉桑菊饮的组方要点与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉指纹', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《温病条辨》', canon: '《温病条辨》', chapter: '上焦篇', originalText: '太阴风温，但咳，身不甚热，微渴者，辛凉轻剂桑菊饮主之。', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '桑菊饮（桑叶、菊花、杏仁、连翘、薄荷、桔梗、甘草、芦根）水煎，薄荷后下，日1剂分2~3次温服；按年龄折算：1岁以下约为成人量1/6~1/4，1~3岁约1/3，3~7岁约1/3~1/2，如桑叶、菊花成人各9g，1~3岁各用约3g。', caution: '小儿剂量宜小，辛凉之剂不宜久煎，中病即止；风寒咳嗽、脾虚便溏者慎用苦寒，忌早投敛肺止咳之品。' },
    cases: null,
    stdJudgment: '小儿风热咳嗽以咳嗽不爽、痰黄黏稠、咽红疼痛、鼻流浊涕、发热微恶风、汗出口渴为辨，舌红苔薄黄、脉浮数、指纹浮紫；风热犯肺、肺失清肃，治宜疏风清热、宣肺止咳，桑菊饮辛凉轻清、不寒不燥，深合小儿肺脏娇嫩之性。',
    coreDefinition: '小儿风热咳嗽以咳嗽不爽、痰黄黏稠、咽红、苔薄黄脉浮数为特征，治以疏风清热宣肺止咳，方用桑菊饮。',
    safety: { note: '桑菊饮轻清宣透，小儿服后以汗出热退为度；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症咳嗽不爽、痰黄黏稠、不易咯出、咽红疼痛、鼻流浊涕、发热恶风、汗出、口渴；舌红苔薄黄，脉浮数，指纹浮紫。病机风热犯肺，肺失清肃。治以疏风清热、宣肺止咳，主方桑菊饮（桑叶、菊花、杏仁、连翘、薄荷、桔梗、甘草、芦根），咽红肿痛加牛蒡子、射干，痰多加浙贝母、瓜蒌，热甚加黄芩、栀子；调护宜清淡饮食、多饮温水、忌肥甘厚味。',
      misjudgment: '把咽红咳嗽一律当风热，见咳即清热。错：若苔白不渴、痰白清稀、咽不红，仍是风寒或痰湿，早用桑菊饮类凉药反遏肺气，咳更不愈；辨痰色与咽红为要。',
      reasoning: '同是风热咳嗽，为何桑菊饮轻于银翘散，儿科反多用桑菊饮？',
      feedback: '小儿咳嗽病位在肺而病势尚浅，桑菊饮药轻味薄、专走肺卫，宣透风热而不伤正；银翘散偏重清热，用于热象明显者，轻症用之反嫌其寒。',
      transfer: '夏秋之交小儿咽红咳嗽、身热不著者，试按风热咳嗽立法并说明剂量折算。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 肺炎喘嗽与哮喘（005–007）
  // ============================================================
  {
    id: 'pb20-u-005', title: '儿科·肺炎喘嗽痰热闭肺证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['儿科', '肺炎喘嗽', '痰热闭肺', '五虎汤', '葶苈大枣泻肺汤', '麻黄', '甘草'],
    intent: '掌握小儿肺炎喘嗽痰热闭肺证的主症舌脉指纹、病机与清热涤痰开肺定喘治法，熟悉五虎汤合葶苈大枣泻肺汤的组成与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉指纹', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《伤寒论》', canon: '《伤寒论》', chapter: '辨太阳病脉证并治', originalText: '发汗后，不可更行桂枝汤，汗出而喘，无大热者，可与麻黄杏仁甘草石膏汤。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '五虎汤（麻黄、杏仁、石膏、甘草、细茶）合葶苈大枣泻肺汤（葶苈子、大枣）水煎，麻黄先煎去沫，石膏打碎先煎，日1剂分3~4次温服；按年龄折算：如麻黄成人3~6g，1~3岁用1~1.5g，3~7岁用1.5~2g，石膏成人15~30g，1~3岁用6~10g。', caution: '小儿剂量宜小；麻黄发汗力强，体虚多汗者慎用；石膏重用须防伤胃；痰热闭肺传变迅速，若见神昏抽搐须即送医，中西医结合救治。' },
    cases: null,
    stdJudgment: '肺炎喘嗽痰热闭肺证以发热烦躁、咳嗽剧烈、气促鼻扇、喉间痰鸣、痰稠色黄为辨，舌红苔黄腻、脉滑数、指纹紫滞；痰热交阻、闭郁肺气，治宜清热涤痰、开肺定喘，五虎汤合葶苈大枣泻肺汤清宣与涤痰并进，腑气不通者佐通下以泄肺热。',
    coreDefinition: '肺炎喘嗽痰热闭肺证以发热咳嗽、气促鼻扇、喉间痰鸣、苔黄腻为特征，治以清热涤痰开肺定喘。',
    safety: { note: '五虎汤含麻黄，小儿须按年龄折算用量，中病即止；痰热闭肺为肺炎喘嗽重证，须密切观察呼吸神志，必要时中西医结合；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症发热烦躁、咳嗽剧烈、气促鼻扇、喉间痰鸣、痰稠色黄、面赤口渴、口唇紫绀；舌红苔黄腻，脉滑数，指纹紫滞。病机痰热交阻，闭郁肺气，宣降失司。治以清热涤痰、开肺定喘，主方五虎汤合葶苈大枣泻肺汤（麻黄、杏仁、石膏、甘草、细茶、葶苈子、大枣），痰壅便秘加生大黄通腑泄热，痰多加浙贝母、天竺黄，口唇紫绀加丹参、赤芍；调护宜保持气道通畅、勤拍背、多饮水。',
      misjudgment: '见气促即按哮喘论治。错：肺炎喘嗽以发热、咳嗽、气促鼻扇为要，肺部听诊有中细湿啰音；哮喘以反复发作的喘息痰鸣为特点，两者病机主方不同，混治则贻误病情。',
      reasoning: '痰热闭肺而大便秘结者，为何通腑能助平喘？',
      feedback: '肺与大肠相表里，腑气通则肺气降，加生大黄通下痰热，釜底抽薪，喘促自平；此为肺炎喘嗽重要的兼治法。',
      transfer: '小儿高热咳喘、痰鸣便干、唇绀者，试按痰热闭肺立法并权衡通腑时机。',
    },
  },
  {
    id: 'pb20-u-006', title: '儿科·哮喘发作期热哮证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['儿科', '哮喘', '发作期', '热哮', '麻杏石甘汤', '苏葶丸', '麻黄'],
    intent: '掌握小儿热哮发作期的主症舌脉指纹、病机与清肺涤痰止咳平喘治法，熟悉麻杏石甘汤合苏葶丸的组成与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉指纹', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《景岳全书》', canon: '《景岳全书》', chapter: '杂证谟·喘促', originalText: '喘有夙根，遇寒即发，或遇劳即发者，亦名哮喘。', sourceTitle: '《景岳全书》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '麻杏石甘汤（麻黄、杏仁、石膏、甘草）合苏葶丸（苏子、葶苈子）水煎，麻黄先煎去沫，石膏先煎，日1剂分3~4次温服；按年龄折算：如麻黄成人3~6g，1~3岁用1~1.5g，3~7岁用1.5~2g，葶苈子成人6~9g，小儿酌减至2~4g。', caution: '小儿剂量宜小；麻黄发汗力强，多汗体虚者慎用；葶苈子泻肺力峻，脾虚便溏者减量；哮喘发作期若见紫绀、神萎、三凹征，须急送医。' },
    cases: null,
    stdJudgment: '热哮发作期以喘促气急、喉间痰鸣如吼、咳痰黄稠、发热面红、胸闷口渴为辨，舌红苔黄腻、脉滑数、指纹紫；痰热壅肺、气道挛急，治宜清肺涤痰、止咳平喘，麻杏石甘汤清宣肺热，合苏葶丸降气涤痰，表解里清则哮鸣自平。',
    coreDefinition: '热哮发作期以喘促哮鸣、痰黄稠、面红口渴、苔黄腻脉滑数为特征，治以清肺涤痰止咳平喘。',
    safety: { note: '麻杏石甘汤含麻黄，小儿按年龄折算；发作期控制后须转入缓解期调理固本；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症喘促气急、喉间痰鸣如吼、咳痰黄稠、发热面红、胸闷、口渴喜饮、小便黄赤、大便干结；舌红苔黄腻，脉滑数，指纹紫。病机素有伏痰，感受外邪化热，痰热壅肺，气道挛急。治以清肺涤痰、止咳平喘，主方麻杏石甘汤合苏葶丸（麻黄、杏仁、石膏、甘草、苏子、葶苈子），哮鸣重加射干、地龙，痰多加瓜蒌、浙贝母，便结加瓜蒌仁、大黄；调护宜清淡饮食、避免鱼腥发物与冷饮。',
      misjudgment: '热哮与寒哮不分，一见哮喘即投温散。错：热哮痰黄黏稠、面赤口渴、苔黄脉数，寒哮痰白清稀、形寒肢冷、苔白脉紧，寒热判错则方药南辕北辙，须察痰色舌脉以定寒热。',
      reasoning: '哮喘宿根在肺脾肾三脏，为何发作期专治其标而不固本？',
      feedback: '发作期痰气壅实，标实为急，先涤痰平喘以解其危；正虚之本待缓解期再议，急则治标、缓则治本，次序不可颠倒。',
      transfer: '小儿咳喘痰鸣、痰黄便干、发热面赤者，试按热哮辨治并说明麻黄的折算用量。',
    },
  },
  {
    id: 'pb20-u-007', title: '儿科·哮喘缓解期肺脾气虚证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['儿科', '哮喘', '缓解期', '肺脾气虚', '玉屏风散', '人参五味子汤'],
    intent: '掌握小儿哮喘缓解期肺脾气虚证的主症舌脉、病机与健脾益气补肺固表治法，理解缓解期调本防发的意义。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '经脉别论篇第二十一', originalText: '饮入于胃，游溢精气，上输于脾。脾气散精，上归于肺。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '玉屏风散（黄芪、白术、防风）合人参五味子汤（人参、茯苓、白术、五味子、麦冬、甘草、生姜、大枣）水煎服，日1剂分2~3次温服，或制膏久服缓图；按年龄折算：如黄芪成人15~30g，1~3岁用5~10g，3~7岁用8~12g，人参以党参代之者酌加量。', caution: '小儿剂量宜小；缓解期宜缓图固本，忌骤用温补峻品；外感急性发作期暂停补益方，先治其标；人参反藜芦，同用须忌。' },
    cases: null,
    stdJudgment: '哮喘缓解期肺脾气虚证以反复感冒、气短自汗、面白少华、食少便溏为辨，舌淡苔白、脉细弱、指纹淡；肺虚卫外不固、脾虚运化失健、痰湿内蕴，治宜健脾益气、补肺固表，玉屏风散合人参五味子汤培土生金，脾气充则卫气固、宿痰自化，为缓解期治本之要。',
    coreDefinition: '哮喘缓解期肺脾气虚证以反复感冒、气短自汗、食少便溏、舌淡脉细弱为特征，治以健脾益气补肺固表。',
    safety: { note: '缓解期以固本为主，急性发作须先治标；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症反复感冒、气短自汗、咳嗽无力、痰白清稀、面白少华、神疲懒言、食少纳呆、大便溏薄；舌淡苔白，脉细弱，指纹淡。病机哮喘日久，肺脾气虚，卫外不固，运化失健，痰湿内蕴。治以健脾益气、补肺固表，主方玉屏风散合人参五味子汤（黄芪、白术、防风、人参、茯苓、五味子、麦冬、甘草、生姜、大枣），汗多加煅龙骨、煅牡蛎、浮小麦，纳差加焦山楂、炒谷芽，便溏加山药、薏苡仁；调护宜适当锻炼、避免过敏原。',
      misjudgment: '缓解期见轻微喘咳即用发作期方药。错：缓解期以正虚为主，偶有喘咳亦属正虚痰恋，重在补脾肺、固卫表；屡用麻黄葶苈攻伐，正气愈伤，发作愈频。',
      reasoning: '培土何以能生金？补脾为何能减少哮喘复发？',
      feedback: '脾为生痰之源、肺为贮痰之器，脾气健运则痰无由生，卫气充实则外邪难侵，故健脾益气实为杜绝哮喘复发之本。',
      transfer: '学龄儿童哮喘缓解、自汗纳少、易感者，试按肺脾气虚设计固本调理思路。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 厌食与积滞（008–009）
  // ============================================================
  {
    id: 'pb20-u-008', title: '儿科·厌食脾胃不和证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['儿科', '厌食', '脾胃不和', '运脾和胃', '不换金正气散', '半夏'],
    intent: '掌握小儿厌食脾胃不和证的主症舌脉、病机与运脾和胃治法，熟悉不换金正气散的组成与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减与调护', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '灵兰秘典论篇第八', originalText: '脾胃者，仓廪之官，五味出焉。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '不换金正气散（藿香、苍术、厚朴、陈皮、半夏、甘草、生姜、大枣）水煎，日1剂分2~3次温服，饭前或饭后半小时服；按年龄折算：如苍术、厚朴成人各6~9g，1~3岁各用2~3g，3~7岁各用3~4g，半夏用姜半夏或法半夏3~6g折算。', caution: '小儿剂量宜小，方中半夏须用炮制品；苍术苦温香燥，阴虚内热者慎用；厌食忌用滋腻补品与苦寒败胃之品，重在运脾不在补脾。' },
    cases: null,
    stdJudgment: '厌食脾胃不和证以食欲不振、厌恶进食、食而乏味、脘腹胀满、嗳气恶心为辨，舌淡红苔薄白或薄腻、脉尚和缓；脾运失健、胃纳不和，治宜运脾和胃，不换金正气散芳香醒脾、燥湿和胃，药性平和，切合小儿脾常不足、易为湿困之体。',
    coreDefinition: '厌食脾胃不和证以食欲不振、食而乏味、脘腹胀满为特征，治以运脾和胃，方用不换金正气散。',
    safety: { note: '不换金正气散含半夏，须用炮制品；厌食久治不愈当查有无积滞、疳证及情志因素；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症食欲不振、厌恶进食、食而乏味、脘腹胀满、嗳气恶心、大便或干或溏、精神尚可；舌淡红苔薄白或薄腻，脉尚和缓，指纹多正常或淡滞。病机脾胃不和，运化失健，纳化失司。治以运脾和胃，主方不换金正气散（藿香、苍术、厚朴、陈皮、半夏、甘草、生姜、大枣），腹胀加莱菔子、槟榔，嗳气加鸡内金、麦芽，便溏加山药、茯苓；调护宜定时定量进食、少食零食冷饮、营造愉快进食环境。',
      misjudgment: '把厌食与积滞等同，一律消导攻伐。错：厌食以不思进食为主而无脘腹痞胀、嗳腐酸臭之积滞征象，纯消导反伤脾运；脾胃不和之治贵在运脾开胃，非在攻积。',
      reasoning: '同为纳呆，为何积滞宜消、厌食宜运，二者病机有何不同？',
      feedback: '积滞乃乳食停聚中焦，属实，消导化滞为主；厌食乃脾运失健、纳化无力，属虚中夹滞，宜芳香醒脾、运化和中，误消则脾愈虚。',
      transfer: '挑食、偏食致面黄纳呆的小儿，试按脾胃不和思路结合喂养调护综合处理。',
    },
  },
  {
    id: 'pb20-u-009', title: '儿科·积滞乳食内积证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['儿科', '积滞', '乳食内积', '消乳化积', '消乳丸', '保和丸', '半夏'],
    intent: '掌握小儿积滞乳食内积证的主症舌脉指纹、病机与消乳化积导滞和中治法，熟悉消乳丸、保和丸的选用与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉指纹', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '太阴阳明论篇第二十九', originalText: '食饮不节，起居不时者，阴受之。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '乳积用消乳丸（香附、神曲、麦芽、陈皮、砂仁、炙甘草），食积用保和丸（山楂、神曲、半夏、茯苓、陈皮、连翘、莱菔子），水煎或研末为丸服，日1剂分2~3次；按年龄折算：如山楂、神曲成人各9~12g，1~3岁各用3~4g，3~7岁各用4~6g。', caution: '小儿剂量宜小，消导之品中病即止，不可久服；积滞化热或夹疳者须转方调脾；方中半夏须用炮制品。' },
    cases: null,
    stdJudgment: '积滞乳食内积证以乳食不思、脘腹胀满、嗳腐吞酸、呕吐酸馊、大便酸臭夹不消化食物为辨，舌苔厚腻、脉滑、指纹紫滞；乳食停聚、中焦壅滞、脾胃运化失司，治宜消乳化积、导滞和中，乳积投消乳丸、食积投保和丸，腑气一通、宿滞一去，脾胃自复。',
    coreDefinition: '积滞乳食内积证以脘腹胀满、嗳腐吞酸、大便酸臭为特征，治以消乳化积导滞和中。',
    safety: { note: '消导之剂中病即止，久用伤脾；积滞日久当防转为疳证；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症乳食不思、脘腹胀满、嗳腐吞酸、呕吐酸馊乳食、大便酸臭或夹不消化食物、夜卧不宁、手足心热；舌红苔厚腻，脉滑，指纹紫滞。病机乳食不节，停聚中焦，壅滞气机，脾胃运化失常。治以消乳化积、导滞和中，主方乳积用消乳丸（香附、神曲、麦芽、陈皮、砂仁、炙甘草），食积用保和丸（山楂、神曲、半夏、茯苓、陈皮、连翘、莱菔子），腹胀甚加木香、厚朴，呕吐加生姜汁、竹茹；调护宜节乳食、进软食，积滞初愈勿骤进肥甘。',
      misjudgment: '积滞化热见苔黄便干即投苦寒通下。错：积滞之热源于食停，苦寒直折反冰伏中阳、脾运更呆；宜消导行气为主，佐以清热，便结甚者方用轻下。',
      reasoning: '同为食积，为何乳积选消乳丸而食积选保和丸？',
      feedback: '乳积之滞在乳，消乳丸以麦芽、神曲消乳化积；食积之滞在谷肉，保和丸山楂、莱菔子擅消肉食之积，药证相对，效乃彰显。',
      transfer: '逢年过节小儿贪食后脘胀嗳腐、夜卧不宁者，试按乳食内积辨治并调整饮食。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 疳证与泄泻（010–012）
  // ============================================================
  {
    id: 'pb20-u-010', title: '儿科·疳证疳气证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['儿科', '疳证', '疳气', '调脾健运', '资生健脾丸'],
    intent: '掌握小儿疳证疳气证的主症舌脉、病机与调脾健运治法，理解疳证脾胃损伤为本的机理与转归。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《小儿药证直诀》', canon: '《小儿药证直诀》', chapter: '诸疳', originalText: '疳皆脾胃病，亡津液之所作也。', sourceTitle: '《小儿药证直诀》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '资生健脾丸（人参、白术、茯苓、山药、莲子肉、薏苡仁、芡实、白扁豆、藿香、砂仁、陈皮、麦芽、山楂、神曲、桔梗、炙甘草）水煎服或制丸服，日1剂分2~3次；按年龄折算：如白术、茯苓成人各9~12g，1~3岁各用3~4g，3~7岁各用4~6g。', caution: '小儿剂量宜小；疳证须缓图调补，忌峻补与攻伐；兼见积滞或疳积者先消后补或消补兼施；若见形体极度消瘦、精神萎靡之干疳，须中西医结合治疗。' },
    cases: null,
    stdJudgment: '疳气证为疳证之初，以形体略瘦、面色萎黄少华、毛发稀疏、食欲不振、精神欠佳、大便不调为辨，舌淡苔薄白、脉细；脾失健运、气血生化乏源，治宜调脾健运，资生健脾丸平补平运、药性甘淡平和，为疳气证之要方，得脾胃复健则疳气自消。',
    coreDefinition: '疳证疳气证以形体略瘦、面色萎黄、食欲不振、大便不调为特征，治以调脾健运，方用资生健脾丸。',
    safety: { note: '疳证为慢性消耗性疾病，须耐心调理，兼查有无虫积；干疳重症须及时就医；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症形体略瘦、面色萎黄少华、毛发稀疏、食欲不振、精神欠佳、易发脾气、大便或溏或干、睡眠欠安；舌淡苔薄白或微腻，脉细。病机乳食不节或喂养不当，日久脾胃失健，气血生化不足，形体失养。治以调脾健运，主方资生健脾丸（人参、白术、茯苓、山药、莲子肉、薏苡仁、芡实、白扁豆、藿香、砂仁、陈皮、麦芽、山楂、神曲、桔梗、炙甘草），腹胀加莱菔子、木香，便溏加煨肉豆蔻，夜寐不安加酸枣仁；调护宜保证营养均衡、少食多餐、忌偏食零食。',
      misjudgment: '疳气证形体略瘦即投大剂滋补厚味。错：疳之本在脾胃失运，滋腻厚味反壅脾碍运，愈补愈呆；宜甘淡平补与健运并行，运脾则愈。',
      reasoning: '钱乙谓疳皆脾胃病，为何疳证尚见目赤、牙疳等肝心肾诸变？',
      feedback: '脾虚则气血乏源，五脏失养，肝开窍于目、齿为骨之余，故日久可生眼疳、牙疳诸变；治疳不忘护脾，防变于未然。',
      transfer: '疳气证小儿形体渐瘦、纳差便溏者，试按调脾健运思路拟定调理方案并说明缓治之理。',
    },
  },
  {
    id: 'pb20-u-011', title: '儿科·泄泻伤食泻证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['儿科', '泄泻', '伤食泻', '消食化滞', '保和丸', '半夏'],
    intent: '掌握小儿伤食泻的主症舌脉指纹、病机与运脾和胃消食化滞治法，熟悉保和丸的组成与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉指纹', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痹论篇第四十三', originalText: '饮食自倍，肠胃乃伤。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '保和丸（山楂、神曲、半夏、茯苓、陈皮、连翘、莱菔子）水煎或研末为丸服，日1剂分3次；按年龄折算：如山楂、神曲成人各9~12g，1~3岁各用3~4g，3~7岁各用4~6g，半夏用姜半夏或法半夏。', caution: '小儿剂量宜小，中病即止，泻止后节乳食、进糜粥调养；半夏须用炮制品；脱水明显者须防伤阴，必要时配合补液。' },
    cases: null,
    stdJudgment: '伤食泻以脘腹胀满、腹痛即泻、泻后痛减、大便酸臭如败卵、夹不消化食物、嗳腐吞酸为辨，舌苔垢腻、脉滑、指纹沉滞；乳食积滞、损伤脾胃、运化失职，治宜运脾和胃、消食化滞，保和丸消食导滞、和中止泻，积滞去则泻自止，为伤食泻之常用方。',
    coreDefinition: '伤食泻以泻下酸臭、夹不消化食物、腹痛胀满、泻后痛减为特征，治以消食化滞和中。',
    safety: { note: '保和丸含半夏，须用炮制品；伤食泻须与湿热泻、脾虚泻相鉴别，泻甚防脱水；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用'] },
    learning: {
      knowledge: '主症脘腹胀满、腹痛即泻、泻后痛减、大便酸臭或如败卵、夹有不消化食物、嗳腐吞酸、不思乳食、夜卧不安；舌苔垢腻或微黄，脉滑，指纹沉滞。病机乳食不节，积滞中焦，损伤脾胃，运化失职，水谷不分。治以运脾和胃、消食化滞，主方保和丸（山楂、神曲、半夏、茯苓、陈皮、连翘、莱菔子），腹胀腹痛加木香、厚朴、槟榔，呕吐加藿香、生姜，水泻明显加泽泻、车前子；调护宜暂禁食6~8小时或进稀粥，忌生冷肥甘。',
      misjudgment: '伤食泻误投涩肠止泻之品。错：积滞未去而用诃子、石榴皮等收涩，则闭门留寇，腹胀愈甚、泻下缠绵；当因势利导，消积导滞使邪有出路。',
      reasoning: '同为小儿泄泻，伤食泻与湿热泻皆泻下臭秽，如何据大便与舌苔判别？',
      feedback: '伤食泻粪酸臭如败卵、苔垢腻、兼嗳腐，湿热泻粪色黄褐而臭、肛周灼热、苔黄腻、口渴尿黄；一因食积一因湿热，治分消导与清利。',
      transfer: '小儿进食过量油腻后腹痛泄泻、泻后痛减者，试按伤食泻辨治并说明节食调护。',
    },
  },
  {
    id: 'pb20-u-012', title: '儿科·泄泻脾虚泻证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['儿科', '泄泻', '脾虚泻', '健脾助运', '参苓白术散', '易混淆'],
    intent: '掌握小儿脾虚泻的主症舌脉、病机与健脾益气助运止泻治法，辨析脾虚泻与伤食泻、湿热泻之异。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《幼幼集成》', canon: '《幼幼集成》', chapter: '泄泻证治', originalText: '夫泄泻之本，无不由于脾胃。', sourceTitle: '《幼幼集成》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '参苓白术散（人参、白术、茯苓、甘草、山药、莲子肉、薏苡仁、砂仁、桔梗、白扁豆、大枣）水煎服或研末冲服，日1剂分3次；按年龄折算：如白术、茯苓成人各9~12g，1~3岁各用3~4g，3~7岁各用4~6g。', caution: '小儿剂量宜小；脾虚泻迁延难愈，须守方缓图，忌骤用收涩峻补；兼积滞、湿热者先祛邪；久泻伤阴伤阳者另当固护气阴。' },
    cases: null,
    stdJudgment: '脾虚泻以大便稀溏、色淡不臭、食后作泻、时轻时重、面色萎黄、形体消瘦、神疲倦怠为辨，舌淡苔白、脉缓弱、指纹淡；脾胃虚弱、运化无权、清浊不分，治宜健脾益气、助运止泻，参苓白术散甘平补脾、渗湿止泻，与伤食泻之消导、湿热泻之清利迥然有别，辨治首重粪色与病程。',
    coreDefinition: '脾虚泻以大便稀溏、食后作泻、面色萎黄、神疲倦怠、舌淡脉缓弱为特征，治以健脾益气助运止泻。',
    safety: { note: '参苓白术散含甘草，中病即止；脾虚泻须与伤食泻、湿热泻鉴别，泻久防脱液伤阴；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症大便稀溏、色淡不臭、常食后作泻、时轻时重、面色萎黄、形体消瘦、神疲倦怠、纳呆腹胀；舌淡苔白，脉缓弱，指纹淡。病机脾胃虚弱，运化无权，水谷不化，清浊不分。治以健脾益气、助运止泻，主方参苓白术散（人参、白术、茯苓、甘草、山药、莲子肉、薏苡仁、砂仁、桔梗、白扁豆、大枣），腹胀加木香、厚朴，久泻不止加煨诃子、石榴皮，夹不消化物加神曲、山楂；调护宜少食多餐、进易消化饮食、注意腹部保暖。',
      misjudgment: '脾虚泻与伤食泻同见便稀而混为一治。错：脾虚泻粪色淡、不臭、食后即泻、病程长、面黄神疲；伤食泻粪酸臭、夹残渣、泻后痛减、起病急，一补一消，误补则积滞愈壅，误消则脾气愈伤。',
      reasoning: '脾虚泻为何食后即泻，其机理与脾失升清有何关联？',
      feedback: '食后谷气骤充，脾弱不能运化升清，清浊俱走大肠而泻；治脾虚泻重在复脾升运之能，而非见泻止泻。',
      transfer: '久泻面黄、食后即泻的幼儿，试从脾虚与伤食两端对照鉴别并处方。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 夜啼（013）
  // ============================================================
  {
    id: 'pb20-u-013', title: '儿科·夜啼心经积热证治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['儿科', '夜啼', '心经积热', '清心导赤', '导赤散', '木通', '综合推理'],
    intent: '掌握小儿夜啼心经积热证的主症舌脉指纹、病机与清心导赤泻火安神治法，综合鉴别脾寒、惊恐、食积所致夜啼。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉指纹', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《小儿药证直诀》', canon: '《小儿药证直诀》', chapter: '诸方', originalText: '视其睡，口中气温，或合面睡，及上窜咬牙，皆心热也。', sourceTitle: '《小儿药证直诀》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '导赤散（生地黄、木通、甘草梢、竹叶）水煎，竹叶后下，日1剂分3次温服，或少量频服；按年龄折算：如生地黄成人9~15g，1~3岁用3~5g，3~7岁用5~8g，木通用木通或川木通2~4g折算。', caution: '小儿剂量宜小；木通须辨品种，禁用含马兜铃酸的关木通；导赤散苦寒清利，脾虚便溏者慎用，中病即止，不可久服。' },
    cases: null,
    stdJudgment: '夜啼心经积热证以入夜啼哭、哭声洪亮、见灯尤甚、面赤唇红、烦躁不宁、小便短赤为辨，舌尖红苔黄、脉数、指纹紫；心经积热、热扰神明，治宜清心导赤、泻火安神，导赤散引热从小便而出，使心火下行，与脾寒夜啼之哭声低微、得温则缓迥异，辨明寒热虚实为夜啼立法之首务。',
    coreDefinition: '夜啼心经积热证以入夜啼哭、哭声洪亮、面赤烦躁、小便短赤、舌尖红为特征，治以清心导赤泻火安神。',
    safety: { note: '木通须用正品木通或川木通，禁用关木通（含马兜铃酸，有肾毒性）；导赤散苦寒，小儿中病即止；夜啼须排除饥饿、尿布、惊吓等生理因素及器质性疾病；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['【高风险】马兜铃含马兜铃酸有肾毒性3-9g不可过量久服；肾功能不全禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症入夜啼哭不安、哭声洪亮、见灯光啼甚、面赤唇红、烦躁不宁、身腹俱热、小便短赤、大便秘结；舌尖红，苔薄黄，脉数，指纹紫。病机乳母或小儿心经积热，热扰神明，神不守舍。治以清心导赤、泻火安神，主方导赤散（生地黄、木通、甘草梢、竹叶），心烦甚加栀子、灯心草，大便不通加生大黄，惊惕不宁加钩藤、蝉蜕；调护宜保持卧室安静、避强光，乳母忌辛辣炙煿之品。',
      misjudgment: '夜啼一证概投安神镇惊之品。错：夜啼须分心热、脾寒、惊恐、食积四型，心热者面赤溺赤、哭声洪亮，脾寒者面白肢冷、得温则缓，惊恐者惊惕不安、睡中易醒，不辨病因，泛用镇惊则药不对证。',
      reasoning: '心经积热之夜啼，为何用利水之木通、生地而少用重镇安神之品？',
      feedback: '导赤散寓清于利，生地凉血养阴、木通竹叶引心火从小便而出，邪热有出路则神自安；重镇之品沉降伤脾，非心热夜啼之正治。',
      transfer: '乳母食辛辣后婴儿入夜啼哭、面赤溺黄者，试从心经积热立法并追溯诱因。',
    },
  },
];
