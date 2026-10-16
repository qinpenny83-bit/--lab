// ============================================================
// 杏林大典 · Phase 5 · Batch-32 · 样本 Part AG2（AG 综合医案·试炼 10 节点 pb32-ag-011 ~ pb32-ag-020）
// 学科：AG 综合医案·试炼；覆盖：胁痛/黄疸/水肿/淋证/眩晕/头痛/中风/消渴/痹证/虚劳
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「试炼·医案·主题」式，每节点一例完整医案式辨治
// facts 每节点 4-6 条，sourceTitle 限定：《中医内科学》规划教材 / 《方剂学》规划教材 /
//   《伤寒论》规划教材 / 《金匮要略》规划教材，status 一律 'verified'
// classics 一律整书名 label（《素问》《金匮要略》），篇名入 chapter，
//   originalText 逐字核对，sourceType:'classic_original'，status:'verified'，均已在 classic-patch.mjs 收录
// dosage 一律填写 guideline/caution，剂量与《中国药典》及规划教材通行表述一致
// 高危药红线按 authoring-spec 第 4 节表：麻黄/朱砂/半夏/甘草；另有麝香（孕妇禁用）、
//   关木通（含马兜铃酸，禁用）等警戒
// safety.note 一律含「知识学习内容，不构成诊疗建议；临床操作须遵医嘱」，
//   涉及高危药及急危重证（中风、水肿尿少、高血压急症）另加禁忌与警戒
// 难度分布：简单 3（diff 1）/ 中等 3（diff 2）/ 困难 1（diff 3）/ 易混综合 3（diff 4-5）
//   （与 PART_AG1 合计：简单 6 / 中等 6 / 困难 4 / 易混综合 4）
// ============================================================

export const PART_AG2 = [
  // ============================================================
  // AG 综合医案 · 胁痛/黄疸/水肿/淋证（011–014）
  // ============================================================
  {
    id: 'pb32-ag-011', title: '试炼·医案·胁痛肝气郁结辨治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['胁痛', '肝气郁结', '柴胡疏肝散', '疏肝理气'],
    intent: '通过胁肋胀痛、情志诱发的医案，训练肝气郁结胁痛的辨析，掌握柴胡疏肝散疏肝理气、通络止痛的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '脏气法时论篇第二十二', originalText: '肝病者，两胁下痛引少腹，令人善怒。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '柴胡疏肝散：柴胡9g、香附9g、川芎9g、陈皮6g、枳壳9g、白芍9g、炙甘草3g。水煎，日1剂分2次温服。', caution: '理气药多辛燥，久服伤阴耗气；肝阴不足、舌红少苔者慎用；胁痛伴高热黄疸、痛势剧烈者须就医排查急腹症。' },
    cases: null,
    stdJudgment: '胁肋胀痛、走窜不定、每因情志而增减、胸闷太息、纳少嗳气，苔薄白、脉弦，此肝失条达、气机郁滞、络脉失和。柴胡疏肝散柴胡香附疏肝解郁、枳壳陈皮理气宽中、川芎活血通络、白芍甘草缓急止痛，气行络通则痛止。',
    coreDefinition: '肝气郁结证以胁肋胀痛走窜、情志诱发、太息嗳气为特征，治以疏肝理气、通络止痛，方用柴胡疏肝散。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。胁痛剧烈、发热、目黄者须就医排除肝胆急症。', prohibitions: [] },
    learning: {
      knowledge: '医案主症胁肋胀痛、走窜不定、痛随情志波动、胸闷善太息、嗳气纳少、或大便不调；舌苔薄白，脉弦。辨证肝失条达、气机郁滞、胁络失和。治法疏肝理气、通络止痛。主方柴胡疏肝散：柴胡香附疏肝解郁，枳壳陈皮理气宽中，川芎活血通络，白芍甘草缓急止痛。调护调畅情志、避免恼怒忧思、饮食清淡。',
      misjudgment: '胁痛胀满误作食积或瘀血，投消导或活血重剂，不辨其走窜、情志诱发之肝郁本质，气滞未解痛必不除。',
      reasoning: '同为胁痛，肝气郁结为何痛处走窜不定，而瘀血阻络却固定如刺？',
      feedback: '气行则血行，气滞则痛无定处；瘀血有形，着而不移，故刺痛固定。以痛之走窜与否辨气滞与血瘀。',
      transfer: '职场压力大者胁肋胀痛、叹息则舒，试按肝气郁结立法并给情志调护建议。',
    },
  },
  {
    id: 'pb32-ag-012', title: '试炼·医案·黄疸阳黄热重于湿辨治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['黄疸', '阳黄', '热重于湿', '茵陈蒿汤'],
    intent: '通过身目俱黄如橘色、口渴便秘的医案，训练阳黄热重于湿证的辨析，掌握茵陈蒿汤清热利湿退黄的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '黄疸病脉证并治第十五', originalText: '谷疸之为病，寒热不食，食即头眩，心胸不安，久久发黄为谷疸，茵陈蒿汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '茵陈蒿汤：茵陈30g（先煎）、栀子9g、大黄6~9g（后下）。水煎，日1剂分2次温服。', caution: '大黄后下取通腑泄热之意，脾虚便溏者减量，孕妇禁用；阴黄（黄色晦暗、苔白腻、脉沉迟）忌用本方；黄疸伴高热神昏、出血倾向者属急黄，须立即就医。' },
    cases: null,
    stdJudgment: '身目俱黄、黄色鲜明如橘、发热口渴、脘腹胀满、大便秘结、小便短赤，舌红苔黄腻、脉弦数，此湿热蕴蒸中焦、肝胆疏泄失常、胆汁外溢。茵陈蒿汤茵陈清利湿热退黄、栀子清三焦火、大黄通腑泄热，使湿热从二便而去。',
    coreDefinition: '阳黄热重于湿证以身目俱黄鲜明如橘、发热口渴、便秘尿赤、苔黄腻为特征，治以清热利湿、通腑退黄，方用茵陈蒿汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。黄疸属传染性疾病者须按法定程序报告并隔离，急黄须立即就医。', prohibitions: ['急症须立即就医，本节点仅知识学习', '大黄苦寒，孕妇禁用；脾虚便溏者慎用'] },
    learning: {
      knowledge: '医案主症身目俱黄、黄色鲜明、发热口渴、心中懊憹、脘腹胀满、大便秘结、小便短少黄赤；舌红苔黄腻，脉弦数。辨证湿热蕴蒸中焦、肝胆疏泄失常、胆汁外溢肌肤。治法清热利湿、通腑退黄。主方茵陈蒿汤：茵陈利湿退黄，栀子清三焦火，大黄通腑泄热，湿热下行则黄退。调护卧床休息、清淡饮食、忌酒、餐具单独消毒。',
      misjudgment: '见黄疸即投利湿退黄之品，不辨阳黄阴黄：黄色鲜明、口渴便秘者属阳黄；黄色晦暗、口淡便溏、苔白腻者属阴黄，误用苦寒反伤脾阳。',
      reasoning: '茵陈蒿汤以大黄通腑，黄疸兼便秘者用之，其机理何在？',
      feedback: '腑气一通，湿热随大便外泄，邪有出路，黄疸始退；此即通因通用、釜底抽薪之义。',
      transfer: '酒席应酬后身目发黄、右胁胀痛、便秘尿黄者，试按阳黄热重于湿分析并强调饮食调护。',
    },
  },
  {
    id: 'pb32-ag-013', title: '试炼·医案·水肿风水相搏辨治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['水肿', '风水相搏', '越婢加术汤', '麻黄', '疏风宣肺'],
    intent: '通过眼睑浮肿起病急骤、恶风发热的医案，训练风水相搏证的辨析，掌握越婢加术汤疏风清热、宣肺行水的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '水气病脉证并治第十四', originalText: '风水恶风，一身悉肿，脉浮不渴，续自汗出，无大热，越婢汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '越婢加术汤：麻黄9g（先煎）、生石膏15~30g（先煎）、白术9g、生姜9g、甘草6g、大枣6枚。水煎，日1剂分2次温服，取微汗。', caution: '麻黄发汗力强，高血压、心脏病、失眠者慎用，运动员禁用；服药以微汗为度，不可过汗伤阳；尿少肿甚、喘促不能平卧者属急症，须立即就医。' },
    cases: null,
    stdJudgment: '眼睑颜面浮肿起病急骤、继则四肢及全身皆肿、恶风发热、小便不利、肢节酸重，舌苔薄白、脉浮或浮数，此风邪袭表、肺失通调、风水相搏。越婢加术汤麻黄宣肺行水、石膏清透郁热、白术健脾制水，汗出表解则水行肿消。',
    coreDefinition: '风水相搏证以眼睑浮肿起病急、恶风发热、小便不利、脉浮为特征，治以疏风清热、宣肺行水，方用越婢加术汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。含麻黄须严格掌握煎法；水肿伴尿少、喘促、血压骤升者须立即就医。', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '急症须立即就医，本节点仅知识学习'] },
    learning: {
      knowledge: '医案主症眼睑浮肿、继则四肢及全身皆肿、来势迅速、恶风发热、肢节酸重、小便不利，或见咽痛咳嗽；舌苔薄白，脉浮或浮数。辨证风邪袭表、肺失宣降、通调失职、水湿泛溢。治法疏风清热、宣肺行水。主方越婢加术汤：麻黄宣肺利水，石膏清透郁热，白术健脾制水，姜枣草和中。调护低盐饮食、卧床休息、记录出入量、避风。',
      misjudgment: '风水浮肿误作脾肾阳虚，投温补利水之剂，不辨其起病急骤、头面先肿、恶风脉浮之表证，温补反恋邪。',
      reasoning: '越婢加术汤中麻黄与石膏同用，一宣一清，其治风水之理何在？',
      feedback: '麻黄宣肺以开上源、行水气，石膏清透在表之郁热，使风水之邪从汗而解，肺气宣则水道通。',
      transfer: '感冒后晨起眼睑浮肿、小便短少者，试按风水相搏分析并给低盐调护建议。',
    },
  },
  {
    id: 'pb32-ag-014', title: '试炼·医案·淋证热淋辨治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['淋证', '热淋', '八正散', '清热利湿通淋'],
    intent: '通过小便频急灼痛、尿色黄赤的医案，训练热淋证的辨析，掌握八正散清热利湿通淋的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '消渴小便不利淋病脉证并治第十三', originalText: '淋之为病，小便如粟状，小腹弦急，痛引脐中。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '八正散：车前子9g（包煎）、瞿麦9g、萹蓄9g、滑石15g（包煎）、栀子9g、甘草梢3g、木通6g、大黄6g（后下）。水煎，日1剂分2次温服。', caution: '木通须用川木通，关木通含马兜铃酸有肾毒性、禁用；滑石孕妇慎用；热淋日久伤阴或久病正虚者不宜过用苦寒通利。' },
    cases: null,
    stdJudgment: '小便频数短涩、灼热刺痛、溺色黄赤、少腹拘急胀痛、或伴寒热口苦，舌红苔黄腻、脉濡数，此湿热蕴结下焦、膀胱气化不利。八正散萹蓄瞿麦车前子滑石利湿通淋、栀子清三焦热、大黄泄热通腑，湿热下泄则淋痛自止。',
    coreDefinition: '热淋证以小便频急短涩、灼热刺痛、溺色黄赤为特征，治以清热利湿通淋，方用八正散。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。腰痛发热、寒战者须就医排除肾盂肾炎；木通须用川木通。', prohibitions: ['木通忌用关木通（含马兜铃酸，肾毒性），须用川木通3-9g', '滑石孕妇慎用'] },
    learning: {
      knowledge: '医案主症小便频数短涩、灼热刺痛、溺色黄赤、少腹拘急胀痛，或见寒热口苦、腰痛；舌红苔黄腻，脉濡数。辨证湿热蕴结下焦、膀胱气化不利。治法清热利湿通淋。主方八正散：萹蓄瞿麦车前子滑石利尿通淋，栀子清三焦热，大黄泄热通腑，甘草梢缓急止痛。调护多饮水、勤排尿、忌辛辣酒食、注意会阴卫生。',
      misjudgment: '尿频尿急即作肾虚论治投补涩之品，不辨其灼热刺痛、苔黄腻之湿热实象，补涩反留邪；淋证忌补，实热未清不可固涩。',
      reasoning: '八正散以通利为主，为何配伍大黄一味？',
      feedback: '大黄通腑泄热，使湿热从大便分消，二便通利则下焦湿热得去，此即前后分消之法。',
      transfer: '劳累饮少后尿频尿急、尿痛灼热者，试按热淋立法并强调多饮水的调护。',
    },
  },
  // ============================================================
  // AG 综合医案 · 眩晕/头痛/中风（015–017）
  // ============================================================
  {
    id: 'pb32-ag-015', title: '试炼·医案·眩晕肝阳上亢辨治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['眩晕', '肝阳上亢', '天麻钩藤饮', '朱砂', '平肝熄风'],
    intent: '通过眩晕耳鸣、头目胀痛、恼怒加重的医案，训练肝阳上亢证的辨析，掌握天麻钩藤饮平肝熄风、清热活血的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '至真要大论篇第七十四', originalText: '诸风掉眩，皆属于肝。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '天麻钩藤饮：天麻9g、钩藤12g（后下）、石决明15~30g（先煎）、栀子9g、黄芩9g、川牛膝12g、杜仲9g、益母草9g、桑寄生9g、夜交藤9g、朱茯神9g。水煎，日1剂分2次温服。', caution: '原方朱茯神含朱砂，现多去朱砂用茯神，朱砂忌火煅、不可久服、孕妇禁用；钩藤后下勿久煎；血压骤升、头痛呕吐剧烈者须立即就医。' },
    cases: null,
    stdJudgment: '眩晕耳鸣、头目胀痛、每因烦劳恼怒加重、面红目赤、急躁易怒、失眠多梦，舌红苔黄、脉弦或弦数，此肝阳上亢、气血上冲。天麻钩藤饮天麻钩藤石决明平肝熄风、栀子黄芩清肝泻火、牛膝引血下行、杜仲寄生补益肝肾，标本兼顾。',
    coreDefinition: '肝阳上亢证以眩晕耳鸣、头目胀痛、恼怒加重、面红目赤、脉弦为特征，治以平肝熄风、清热活血、补益肝肾，方用天麻钩藤饮。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。血压显著升高伴头痛呕吐者属高血压急症，须立即就医。', prohibitions: ['【高风险】朱砂含硫化汞忌火煅；0.1-0.5g只入丸散；不可久服；孕妇禁用', '急症须立即就医，本节点仅知识学习'] },
    learning: {
      knowledge: '医案主症眩晕耳鸣、头目胀痛、每因烦劳恼怒加重、面红目赤、急躁易怒、失眠多梦、口苦；舌红苔黄，脉弦数。辨证肝阳偏亢、风阳上扰清窍。治法平肝熄风、清热活血、补益肝肾。主方天麻钩藤饮：天麻钩藤石决明平肝熄风，栀子黄芩清肝泻火，牛膝益母草引血下行、活血利水，杜仲桑寄生补益肝肾。调护调畅情志、低盐低脂、监测血压、忌恼怒熬夜。',
      misjudgment: '眩晕头重如裹、苔白腻者误作肝阳上亢投平肝潜阳，不辨其痰湿内蕴之象；肝阳上亢舌红苔黄，痰湿眩晕苔白腻脉濡滑，一清一燥判然有别。',
      reasoning: '天麻钩藤饮平肝潜阳，为何配伍牛膝、益母草活血之品？',
      feedback: '肝阳上亢每兼气血并走于上，牛膝引血下行、益母草活血利水，使上亢之阳与并走之血俱降，防其生风之变。',
      transfer: '中老年高血压者眩晕头胀、面红易怒，试按肝阳上亢立法并强调血压监测。',
    },
  },
  {
    id: 'pb32-ag-016', title: '试炼·医案·头痛瘀血阻络辨治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['头痛', '瘀血阻络', '通窍活血汤', '麝香', '活血通窍'],
    intent: '通过头痛如刺、痛处固定、经久不愈的医案，训练瘀血头痛的辨析，掌握通窍活血汤活血化瘀、通窍止痛的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '通窍活血汤：赤芍9g、川芎9g、桃仁9g、红花9g、老葱3根、生姜9g、大枣5枚、麝香0.15g（冲服，可用人工麝香代）、黄酒适量。水煎，麝香研末冲服，黄酒送下，日1剂。', caution: '麝香不入煎剂、研末冲服，孕妇禁用；桃仁红花活血力强，月经过多者慎用；头痛剧烈伴呕吐、偏瘫、神昏者须立即就医排除颅内病变。' },
    cases: null,
    stdJudgment: '头痛经久不愈、痛处固定不移、痛如锥刺、日轻夜重，或有头部外伤史，舌质紫暗或有瘀斑、脉细涩，此久病入络、瘀血阻窍。通窍活血汤桃仁红花赤芍川芎活血化瘀、麝香开窍通络、葱姜枣酒温通，瘀去络通则头痛自愈。',
    coreDefinition: '瘀血阻络证以头痛如刺固定、经久不愈、夜甚、舌紫暗瘀斑为特征，治以活血化瘀、通窍止痛，方用通窍活血汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。麝香研末冲服不入煎剂，孕妇禁用；伴呕吐神昏者须立即就医。', prohibitions: ['麝香孕妇禁用；不入煎剂，研末冲服0.03-0.1g', '急症须立即就医，本节点仅知识学习'] },
    learning: {
      knowledge: '医案主症头痛如锥刺、痛处固定不移、经久不愈、日轻夜重、或有头部外伤史、面色晦暗；舌质紫暗或有瘀斑，脉细涩。辨证久病入络或跌仆留瘀、瘀血阻窍。治法活血化瘀、通窍止痛。主方通窍活血汤：桃仁红花赤芍川芎活血祛瘀，麝香开窍通络，老葱生姜大枣黄酒温通血脉。调护避风寒、防头部外伤、保证睡眠、调畅情志。',
      misjudgment: '头痛固定刺痛误作肝阳上亢，投平肝潜阳之剂，不察其舌紫暗瘀斑、外伤史、痛处固定之瘀血征象，瘀不去则痛不休。',
      reasoning: '瘀血头痛为何日轻夜重，与气血运行昼夜节律有何关联？',
      feedback: '入夜阳气内敛、血行迟缓，瘀滞更甚，故痛转剧；白昼阳气外达、血行略畅，痛势稍减，此与肝阳头痛晨起重、因劳怒加重不同。',
      transfer: '头部外伤后头痛如刺、经年不愈者，试按瘀血阻络分析并说明麝香的用法。',
    },
  },
  {
    id: 'pb32-ag-017', title: '试炼·医案·中风中经络风痰阻络辨治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['中风', '中经络', '风痰阻络', '半夏白术天麻汤', '半夏'],
    intent: '通过半身不遂、口舌歪斜、舌强语謇的医案，训练中风中经络的辨析，掌握风痰阻络证治与中脏腑、闭脱证的鉴别。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '调经论篇第六十二', originalText: '血之与气并走于上，则为大厥，厥则暴死，气复反则生，不反则死。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '半夏白术天麻汤合桃红四物汤：制半夏9g、天麻9g、白术9g、茯苓9g、陈皮6g、甘草3g、桃仁9g、红花9g、当归9g、川芎9g、白芍9g、熟地黄9g、生姜3片、大枣3枚。水煎，日1剂分2次温服。', caution: '半夏生品有毒须炮制；中风急性期须先经现代医学评估（溶栓时间窗），中药辨证施治须在住院条件下进行，不可延误急救。' },
    cases: null,
    stdJudgment: '半身不遂、口舌歪斜、舌强语謇、偏身麻木、头晕目眩、痰多黏腻，舌暗红苔白腻、脉弦滑，此风痰阻络、气血瘀滞。神志清醒为中经络；若昏不知人则属中脏腑，须辨闭证脱证。半夏白术天麻汤化痰熄风，合桃红四物汤活血通络。',
    coreDefinition: '中风中经络风痰阻络证以半身不遂、口舌歪斜、舌强语謇而神志清醒、苔白腻、脉弦滑为特征，治以化痰熄风、活血通络，方用半夏白术天麻汤合桃红四物汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。中风急性期属危重病，须立即送医，不可自行服药延误救治。', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '急症须立即就医，本节点仅知识学习', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '医案主症突发半身不遂、口舌歪斜、舌强语謇、偏身麻木、头晕目眩、痰多黏腻、胸脘痞闷，神志清楚；舌暗红苔白腻，脉弦滑。辨证风痰阻络、气血瘀滞。治法化痰熄风、活血通络。主方半夏白术天麻汤合桃红四物汤：半夏天麻白术茯苓陈皮化痰熄风，桃红四物活血通络。鉴别要点：中经络神志清醒，中脏腑昏不知人；中脏腑闭证牙关紧闭握固、脱证目合手撒。调护卧床、防呛咳误吸、情志安静、早期康复训练。',
      misjudgment: '中经络与中脏腑不辨，见中风即按昏迷论治或反之轻视，贻误救治；凡昏不知人者必先辨闭脱，脱证不可再投开窍攻伐之品。',
      reasoning: '同是中风，为何中经络治以化痰通络，中脏腑闭证却须开窍醒神，脱证须回阳固脱？',
      feedback: '病位深浅不同、邪正虚实各异：中经络病在经络，宜化痰活血通络；中脏腑闭证邪实内闭须开窍，脱证正虚欲脱须固脱，三者不可混治。',
      transfer: '晨起突发口眼歪斜、一侧肢体无力而神志清醒者，试分析其属中经络之何证并说明为何须立即就医。',
    },
  },
  // ============================================================
  // AG 综合医案 · 消渴/痹证/虚劳（018–020）
  // ============================================================
  {
    id: 'pb32-ag-018', title: '试炼·医案·消渴上消肺热津伤辨治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['消渴', '上消', '肺热津伤', '消渴方', '清热润肺'],
    intent: '通过烦渴多饮、口干舌燥、尿频量多的医案，训练上消肺热津伤证的辨析，掌握消渴方清热润肺、生津止渴的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '奇病论篇第四十七', originalText: '此肥美之所发也，此人必数食甘美而多肥也，肥者令人内热，甘者令人中满，故其气上溢，转为消渴。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '消渴方：天花粉15g、黄连6g、生地黄15g、藕汁适量（冲入）。水煎，日1剂分2次温服。', caution: '天花粉孕妇禁用；黄连苦寒，脾胃虚寒者减量；消渴须结合血糖监测与饮食控制，不可单恃方药。' },
    cases: null,
    stdJudgment: '烦渴多饮、口干舌燥、尿频量多、舌边尖红、苔薄黄、脉洪数，此肺热炽盛、耗伤津液、肺失敷布。消渴方天花粉清热生津、黄连清泻肺胃之火、生地黄滋阴凉血、藕汁生津止渴，热清津复则渴饮自减。',
    coreDefinition: '上消肺热津伤证以烦渴多饮、口干舌燥、尿频量多、舌边尖红为特征，治以清热润肺、生津止渴，方用消渴方。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。消渴（糖尿病）须规范监测血糖、控制饮食，防低血糖与并发症。', prohibitions: ['天花粉孕妇禁用'] },
    learning: {
      knowledge: '医案主症烦渴多饮、口干舌燥、尿频量多、形体渐瘦，或见皮肤干燥；舌边尖红，苔薄黄，脉洪数。辨证肺热炽盛、耗伤津液、肺失治节。治法清热润肺、生津止渴。主方消渴方：天花粉清热生津，黄连清泻肺胃之火，生地黄滋阴凉血，藕汁生津止渴。调护控制主食与甜食、多饮水、监测血糖、适度运动。',
      misjudgment: '口渴多饮一律按阴虚津亏投滋腻养阴之品，不辨其舌红苔黄、脉洪数之肺热实象，阴未复而热反留；上消须清热与生津并进。',
      reasoning: '消渴方清热用黄连，生津用天花粉，清与滋并用的依据何在？',
      feedback: '肺热不去则津液不断被灼，徒滋其阴如扬汤止沸；黄连清火以撤热源，花粉生津以复其本，清滋并行方为中鹄。',
      transfer: '多饮多尿、口干舌燥、体重下降的初诊患者，试按上消肺热津伤分析并强调血糖监测。',
    },
  },
  {
    id: 'pb32-ag-019', title: '试炼·医案·痹证行痹风寒湿痹辨治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['痹证', '行痹', '防风汤', '麻黄', '祛风通络'],
    intent: '通过肢体关节疼痛游走不定的医案，训练行痹（风寒湿痹风邪偏胜）的辨析，掌握防风汤祛风通络、散寒除湿的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痹论篇第四十三', originalText: '风寒湿三气杂至，合而为痹也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '防风汤：防风9g、当归9g、赤茯苓9g、杏仁9g、黄芩6g、秦艽9g、葛根9g、麻黄6g（先煎）、肉桂3g、生姜9g、大枣5枚、甘草6g。水煎，日1剂分2次温服。', caution: '麻黄发汗力强，高血压、心脏病者慎用，运动员禁用；服药以微汗为度；关节红肿灼热之热痹忌用辛温之品。' },
    cases: null,
    stdJudgment: '肢体关节疼痛酸楚、屈伸不利、痛处游走不定、或见恶风发热，苔薄白、脉浮或浮缓，此风邪偏胜、与寒湿相合、痹阻经络。防风汤防风秦艽葛根祛风通络、麻黄散寒、茯苓杏仁利湿化痰、当归肉桂活血温经，风去湿散则痛止。',
    coreDefinition: '行痹（风寒湿痹风邪偏胜）证以关节疼痛游走不定、屈伸不利、恶风为特征，治以祛风通络、散寒除湿，方用防风汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。含麻黄须控量；关节红肿热痛属热痹者忌辛温；痹证日久畸形者须专科诊治。', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '医案主症肢体关节、肌肉疼痛酸楚、屈伸不利、痛处游走不定，或见恶风发热、咽痛；舌苔薄白，脉浮或浮缓。辨证风邪偏胜、与寒湿合邪、痹阻经络。治法祛风通络、散寒除湿。主方防风汤：防风秦艽葛根祛风通络，麻黄散寒宣痹，赤茯苓杏仁利湿化痰，当归肉桂活血温经止痛。调护避风寒湿、注意保暖、适度关节活动、防跌仆。',
      misjudgment: '关节痛一律按寒痹用乌头汤类辛热猛剂，不辨其痛处游走、恶风脉浮之行痹特点；行痹宜祛风为主，过用辛热反伤阴血。',
      reasoning: '行痹、痛痹、着痹同属风寒湿痹，为何用药侧重各别？',
      feedback: '三痹以风、寒、湿邪偏胜而分：行痹风胜痛游走，重在祛风；痛痹寒胜痛剧烈，重在散寒；着痹湿胜痛重着，重在除湿。',
      transfer: '产后受风周身关节游走性酸痛、畏风者，试按行痹分析并给起居调护建议。',
    },
  },
  {
    id: 'pb32-ag-020', title: '试炼·医案·虚劳气血两虚辨治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['虚劳', '气血两虚', '八珍汤', '益气养血', '久病虚损'],
    intent: '通过面色萎黄、神疲乏力、心悸气短的医案，训练虚劳气血两虚证的辨析，掌握八珍汤益气养血的运用及五脏虚损鉴别。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '通评虚实论篇第二十八', originalText: '邪气盛则实，精气夺则虚。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '八珍汤：人参9g（另煎兑入）、白术9g、茯苓9g、炙甘草6g、当归9g、川芎9g、白芍9g、熟地黄15g、生姜3片、大枣5枚。水煎，日1剂分2次温服。', caution: '人参反藜芦；熟地黄滋腻，脾虚便溏者减量或佐砂仁；外感发热、食积内停者不宜补益；虚不受补者宜从小剂量起。' },
    cases: null,
    stdJudgment: '面色萎黄、神疲乏力、气短懒言、头晕目眩、心悸失眠、食少便溏，舌淡苔薄白、脉细弱，此气血亏虚、五脏失养。久病虚损当分五脏气血阴阳，此案气血两虚并见，八珍汤四君子补气、四物养血，气血双补而兼顾中焦。',
    coreDefinition: '虚劳气血两虚证以面色萎黄、神疲乏力、心悸气短、舌淡脉细弱为特征，治以益气养血，方用八珍汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。虚劳须查明原发病因，肿瘤、慢性消耗性疾病等须规范治疗。', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '人参反藜芦'] },
    learning: {
      knowledge: '医案主症面色萎黄、神疲乏力、气短懒言、头晕目眩、心悸失眠、食少便溏、形体消瘦；舌淡苔薄白，脉细弱。辨证久病失养、气血两虚、脏腑失荣。治法益气养血。主方八珍汤：四君子汤补气、四物汤养血，气血双补。鉴别要点：气虚重在倦怠气短、血虚重在面白头晕；阴虚见舌红脉细数、阳虚见畏寒肢冷脉沉迟，须与气血两虚区分。调护起居有常、饮食营养、劳逸适度、防外感。',
      misjudgment: '虚劳见乏力头晕即笼统补益，不辨气血阴阳与脏腑定位；舌红少苔、五心烦热者属阴虚，若投八珍汤温补反助火伤阴。',
      reasoning: '气血两虚与心脾两虚、脾肾阳虚皆可见倦怠乏力，当如何以舌脉症状鉴别？',
      feedback: '气血两虚以面色舌淡、脉细弱为纲，兼心悸失眠者重心脾，兼畏寒肢冷、腰膝酸软者偏脾肾阳虚；辨明病位病性，补益方能中的。',
      transfer: '肿瘤术后或慢性失血者面色萎黄、倦怠头晕，试按气血两虚分析并强调查明原发病。',
    },
  },
];
