// ============================================================
// 杏林大典 · Phase 5 · Batch-40 · 样本 Part R（R 中医内科学 20 节点 pb40-r-001 ~ pb40-r-020）
// 学科：R 中医内科学；覆盖：消渴（3）/ 血证（2）/ 虚劳（2）/ 汗证（2）/ 内伤发热（2）/
//       颤证（1）/ 痉证（1）/ 腰痛（2）/ 痹证（2）/ 痿证（1）/ 遗精（1）/ 阳痿（1）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「病证·证型辨治」式
// classics 一律整书名 label（《素问》《灵枢》《金匮要略》《景岳全书》《医学心悟》《脾胃论》《丹溪心法》），
//   篇名入 chapter，originalText 逐字核对，sourceType:'classic_original'，status:'verified'，
//   均已在 phase-5/classic-patch.mjs 收录；拿不准出处的节点（腰痛瘀血、遗精）留空 classics
// facts sourceTitle 限定：《中医内科学》规划教材 /《方剂学》规划教材 /《中药学》规划教材 /《中国药典》
// dosage 一律填写 guideline/caution，剂量与《中国药典》及规划教材通行表述一致
// 高危药红线：附子（004/007/014/020）、麻黄（016/017）、川乌（017）、朱砂（012 朱茯神）、
//   甘草（004/010/011/012/013/015/016/017/018/019）、仙茅小毒（020）
// 难度分布：简单 6（difficulty 1）/ 中等 6（difficulty 2）/ 困难 5（difficulty 3）/ 易混淆·综合推理 3
// ============================================================

export const PART_R = [
  // ============================================================
  // R 中医内科学 · 消渴（001–003）
  // ============================================================
  {
    id: 'pb40-r-001', title: '消渴·上消肺热津伤证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['消渴', '上消', '肺热津伤', '消渴方', '清热润肺'],
    intent: '掌握上消肺热津伤证的主症舌脉、病机与清热润肺生津止渴治法，熟悉消渴方的组方与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《医学心悟》', canon: '《医学心悟》', chapter: '三消', originalText: '渴而多饮为上消，消谷善饥为中消，渴而便数有膏为下消。', sourceTitle: '《医学心悟》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '消渴方参考量：天花粉15g、黄连3g、生地黄15g、麦冬12g、葛根15g，水煎服，可兑藕汁、牛乳各适量；烦渴引饮加石膏15-30g先煎、知母9g。', caution: '黄连苦寒伤胃，中病即止；消渴为慢性代谢病，须监测血糖并配合饮食运动管理，服滋阴生津之品时湿盛中满者当佐砂仁陈皮。' },
    cases: null,
    stdJudgment: '上消以烦渴多饮、口干舌燥、尿频量多为主，舌边尖红、苔薄黄、脉洪数，是肺热炽盛、津液耗伤；消渴方花粉黄连清热生津、藕汁牛乳甘寒润燥，专治肺热津伤之渴，须知此渴饮多而不解，与热入阳明之渴饮水自救迥别。',
    coreDefinition: '消渴上消肺热津伤证以烦渴多饮、口干舌燥、尿频量多为主症，治以清热润肺、生津止渴，方用消渴方。',
    safety: { note: '辨证论治知识学习，临床用药须遵医嘱；消渴须定期监测血糖、筛查并发症，不宜单恃汤药', prohibitions: ['黄连苦寒伤胃，不宜久服；生津之品滋腻，湿盛中满者慎用'] },
    learning: {
      knowledge: '主症烦渴多饮、口干舌燥、尿频量多，舌边尖红苔薄黄脉洪数。病机肺热炽盛、耗伤津液。治法清热润肺、生津止渴。主方消渴方（天花粉、黄连、生地黄、麦冬、藕汁、牛乳），烦渴引饮加石膏知母，气阴两伤加人参五味子。',
      misjudgment: '把上消口渴当阳明热盛而重用石膏知母。错：上消病在肺热津伤、渴而多饮，与阳明胃热之壮热大汗不同，重剂苦寒清胃反伤肺津，当以甘寒润肺生津为法。',
      reasoning: '同为消渴，上消多饮、中消善饥、下消尿多，三消的脏腑定位与治法重心为何各不相同？',
      feedback: '上消病在肺胃津伤，甘寒生津为要，苦寒清火只宜少佐，津回渴止而尿亦自减。',
      transfer: '糖尿病口干多饮者，可参考上消立法，配合饮食运动管理。',
    },
  },
  {
    id: 'pb40-r-002', title: '消渴·中消胃热炽盛证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['消渴', '中消', '胃热炽盛', '玉女煎', '清胃泻火'],
    intent: '掌握中消胃热炽盛证的主症舌脉、病机与清胃泻火养阴增液治法，熟悉玉女煎加味的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '阴阳别论篇第七', originalText: '二阳结谓之消。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '玉女煎加黄连栀子参考量：生石膏15-30g先煎、知母9g、麦冬12g、熟地黄15g、牛膝9g、黄连3-6g、栀子9g，水煎服。', caution: '石膏先煎；知母黄连苦寒，脾胃虚寒者慎用；多食善饥、体重骤降者须查血糖与胰岛功能，防糖尿病酮症等急变。' },
    cases: null,
    stdJudgment: '中消胃热炽盛见多食易饥、口渴尿多、形体消瘦、大便秘结，苔黄、脉滑实有力，是胃火亢盛、腐熟太过、耗伤津液；玉女煎石膏知母清阳明之火、熟地麦冬养少阴之阴，加黄连栀子直折胃火，火去则食饥自平，此证消谷善饥而愈食愈瘦，与虚劳之消瘦判然有别。',
    coreDefinition: '消渴中消胃热炽盛证以多食易饥、形体消瘦、口渴尿多为主症，治以清胃泻火、养阴增液，方用玉女煎加黄连栀子。',
    safety: { note: '辨证论治知识学习，临床用药须遵医嘱；中消善饥当防血糖急变，定期监测为要', prohibitions: ['石膏宜先煎；黄连栀子苦寒，脾胃虚寒者慎用'] },
    learning: {
      knowledge: '主症多食易饥、口渴尿多、形体消瘦、大便干燥，舌红苔黄脉滑实有力。病机胃火炽盛、腐熟太过、津液耗伤。治法清胃泻火、养阴增液。主方玉女煎加黄连栀子（石膏、知母、麦冬、熟地黄、牛膝），便秘加玄参大黄，口渴甚加天花粉葛根。',
      misjudgment: '把中消多食易饥当胃火兼阴虚而径投滋阴。错：本证胃火炽盛、消谷善饥，若单滋阴而火不折，食饥不减，须清胃泻火为主、养阴为辅。',
      reasoning: '玉女煎本治少阴不足、阳明有余，移治中消胃热炽盛，为何要加黄连、栀子以泻火？',
      feedback: '中消胃火当折，玉女煎清滋并用，加黄连栀子专泻胃火，火平则消谷善饥自止。',
      transfer: '甲亢多食易饥者，试按中消胃火思路斟酌加减。',
    },
  },
  {
    id: 'pb40-r-003', title: '消渴·下消肾阴亏虚证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['消渴', '下消', '肾阴亏虚', '六味地黄丸', '滋阴固肾'],
    intent: '掌握下消肾阴亏虚证的主症舌脉、病机与滋阴固肾治法，理解下消阴阳两端之辨。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '消渴小便不利淋病脉证并治第十三', originalText: '男子消渴，小便反多，以饮一斗，小便一斗，肾气丸主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '六味地黄丸加减参考量：熟地黄24g、山茱萸12g、山药12g、泽泻9g、茯苓9g、牡丹皮9g，水煎服或成药服之；尿频量多加桑螵蛸9g、覆盆子12g、益智仁9g。', caution: '熟地滋腻碍胃，脾虚便溏者佐砂仁、陈皮；虚火明显者合知柏地黄丸意，苦寒药中病即止；下消日久须防糖尿病肾病等并发症。' },
    cases: null,
    stdJudgment: '下消肾阴亏虚以尿频量多、混浊如脂膏、腰膝酸软、头晕耳鸣、口干唇燥为辨，舌红少苔、脉细数，是肾阴亏损、固摄无权；六味地黄丸三补三泻滋补肾阴，加覆盆子桑螵蛸益智仁涩精缩尿，阴充则尿自约，此证与肾阳虚之饮一溲一当分阴阳而治。',
    coreDefinition: '消渴下消肾阴亏虚证以尿频量多、混浊如脂膏、腰膝酸软为主症，治以滋阴固肾，方用六味地黄丸加减。',
    safety: { note: '辨证论治知识学习，临床用药须遵医嘱；六味地黄丸宜久服缓图，脾虚便溏者须顾护中焦', prohibitions: ['熟地滋腻，脾虚便溏及痰湿内盛者慎用'] },
    learning: {
      knowledge: '主症尿频量多、混浊如脂膏、腰膝酸软、头晕耳鸣、口干唇燥，舌红少苔脉细数。病机肾阴亏虚、肾失固摄。治法滋阴固肾。主方六味地黄丸（熟地黄、山茱萸、山药、泽泻、茯苓、牡丹皮），阴虚火旺加知母黄柏，尿多混浊加益智仁桑螵蛸。',
      misjudgment: '把下消尿频当肾气虚而投固涩温补之品。错：肾阴亏虚者尿频量多兼混浊脂膏、舌红少苔，纯固涩不解阴虚之本，温补更助其火，须六味滋阴填精，阴充则固摄自复。',
      reasoning: '下消肾阴亏虚用六味地黄丸，而金匮以肾气丸治男子消渴，同为下消一阴一阳，其治何以判然？',
      feedback: '下消须辨阴阳，六味滋肾阴、肾气丸温肾阳，阴平阳秘则固摄有权。',
      transfer: '糖尿病肾病早期尿频量多者，试从下消肾阴亏虚角度调治。',
    },
  },
  // ============================================================
  // R 中医内科学 · 血证（004–005）
  // ============================================================
  {
    id: 'pb40-r-004', title: '血证·便血脾胃虚寒证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['血证', '便血', '脾胃虚寒', '黄土汤', '附子', '温中止血'],
    intent: '掌握便血脾胃虚寒证的主症舌脉、病机与黄土汤温阳健脾养血止血的配伍法度。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.附子炮制煎法', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '惊悸吐衄下血胸满瘀血病脉证治第十六', originalText: '下血，先便后血，此远血也，黄土汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '黄土汤参考量：灶心土30-60g先煎取汁代水煎药，炮附子6-9g先煎，白术9g、干地黄12g、阿胶9g烊化、黄芩9g、炙甘草6g，水煎服。', caution: '附子须炮制先煎久煎至口尝无麻辣感；孕妇禁用；灶心土宜先煎滤汁；阿胶烊化兑服；血止后当减温燥之品，防温补伤阴。' },
    cases: null,
    stdJudgment: '便血脾胃虚寒见下血紫暗或色黑如柏油、脘腹隐痛喜温喜按、怯寒神疲、便溏，舌淡苔白、脉细弱，是脾阳亏虚、统摄无权、血溢脉外；黄土汤灶心土温中止血、附子白术温阳健脾、阿胶生地养血滋阴，黄芩苦寒监制温燥，寒热并用而止血之力最稳。',
    coreDefinition: '血证便血脾胃虚寒证以便血紫暗或色黑、腹痛喜温喜按、怯寒神疲为主症，治以健脾温中、养血止血，方用黄土汤。',
    safety: { note: '便血量多色鲜或伴头晕心悸休克征象者须急诊处理，明确下消化道出血病因；黄土汤温清并用，血止即减温燥', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症下血紫暗或色黑如柏油、脘腹隐痛喜温喜按、怯寒神疲便溏，舌淡苔白脉细弱。病机脾胃虚寒、统摄无权、血溢肠中。治法健脾温中、养血止血。主方黄土汤（灶心土、白术、炮附子、阿胶、干地黄、黄芩、甘草），气虚甚加黄芪党参。',
      misjudgment: '把脾胃虚寒便血当热伤血络投凉血止血。错：本证血色紫暗、脘腹喜温喜按、舌淡脉细弱，寒象昭然，苦寒凉血更损脾阳，须黄土汤温中止血。',
      reasoning: '黄土汤以附子白术温阳，又佐黄芩苦寒，温清并用之理何在？',
      feedback: '黄土汤温清并调，使温阳不助火、清热不伤阳，脾阳复而血自归经。',
      transfer: '溃疡性结肠炎便血属脾虚寒者，试按黄土汤思路辨证。',
    },
  },
  {
    id: 'pb40-r-005', title: '血证·尿血肾虚火旺证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['血证', '尿血', '肾虚火旺', '知柏地黄丸', '滋阴降火'],
    intent: '掌握尿血肾虚火旺证的主症舌脉、病机与滋阴降火凉血止血治法，并与血淋之实证相鉴别。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《景岳全书》', canon: '《景岳全书》', chapter: '杂证谟·血证', originalText: '血本阴精，不宜动也，而动则为病。', sourceTitle: '《景岳全书》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '知柏地黄丸加减参考量：知母9g、黄柏9g、熟地黄15g、山茱萸9g、山药12g、茯苓9g、泽泻9g、牡丹皮9g，水煎服；尿血量多加白茅根15g、小蓟12g、旱莲草12g。', caution: '知母黄柏苦寒，久服伤脾阳，中病即止；无痛性血尿须排查泌尿系肿瘤；血尿反复不消应行尿红细胞形态学与影像学检查。' },
    cases: null,
    stdJudgment: '尿血肾虚火旺见小便短赤带血、头晕耳鸣、腰膝酸软、颧红潮热、盗汗，舌红少苔、脉细数，是肾阴亏虚、虚火灼络、血不循经；知柏地黄丸知母黄柏清泻相火、六味滋补肝肾之阴，加白茅根小蓟凉血止血，此证尿无灼痛，与热淋之尿痛涩滞者虚实自判。',
    coreDefinition: '血证尿血肾虚火旺证以小便短赤带血、头晕耳鸣、腰膝酸软为主症，治以滋阴降火、凉血止血，方用知柏地黄丸加减。',
    safety: { note: '辨证论治知识学习，临床用药须遵医嘱；无痛性血尿当排查泌尿系肿瘤，血尿反复者须专科随访', prohibitions: ['知母黄柏苦寒，久服伤脾阳，脾胃虚寒者慎用'] },
    learning: {
      knowledge: '主症小便短赤带血、头晕耳鸣、腰膝酸软、颧红潮热盗汗，舌红少苔脉细数。病机肾阴亏虚、虚火灼络。治法滋阴降火、凉血止血。主方知柏地黄丸（知母、黄柏、熟地黄、山茱萸、山药、茯苓、泽泻、牡丹皮），血多加白茅根小蓟旱莲草。',
      misjudgment: '把肾虚火旺尿血当热淋治以清热通淋。错：本证无尿痛灼热、兼腰膝酸软颧红盗汗，属虚火灼络，通淋之苦寒徒伤肾阴，当滋阴降火以宁血。',
      reasoning: '知柏地黄丸为滋肾阴方，何以能治尿血？',
      feedback: '尿血属虚火者，滋阴即所以降火，火降则络宁血止。',
      transfer: 'IgA肾病反复镜下血尿属阴虚火旺者，可循知柏地黄丸加减思路。',
    },
  },
  // ============================================================
  // R 中医内科学 · 虚劳（006–007）
  // ============================================================
  {
    id: 'pb40-r-006', title: '虚劳·气阴两虚证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['虚劳', '气阴两虚', '生脉散', '六味地黄丸', '益气养阴'],
    intent: '掌握虚劳气阴两虚证的主症舌脉与益气养阴双补治法，辨其与单纯气虚、单纯阴虚之异。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '通评虚实论篇第二十八', originalText: '邪气盛则实，精气夺则虚。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '生脉散合六味地黄丸参考量：人参6g另煎兑入、麦冬12g、五味子6g、熟地黄15g、山药12g、山茱萸9g、茯苓9g、泽泻9g、牡丹皮9g，水煎服。', caution: '人参反藜芦、畏五灵脂，同用须忌；外感未清或湿浊内盛者不宜早投补益；感冒发热期间停用补剂。' },
    cases: null,
    stdJudgment: '虚劳气阴两虚见短气乏力、自汗盗汗并见、口干咽燥、午后低热、纳少便溏，舌淡红少津、脉虚数，是元气亏虚兼阴液不足；生脉散益气养阴敛汗、六味地黄丸滋补肾阴，两方合用使气充阴复，此证既有别于纯气虚之补中益气，亦异于纯阴虚之六味地黄，须双补兼顾。',
    coreDefinition: '虚劳气阴两虚证以短气乏力、自汗盗汗并见、口干咽燥为主症，治以益气养阴，方用生脉散合六味地黄丸加减。',
    safety: { note: '补益之剂宜缓图，外感未清者勿早投，防闭门留寇；气阴两虚者忌辛燥耗气伤阴之品', prohibitions: ['人参反藜芦、畏五灵脂，忌同用'] },
    learning: {
      knowledge: '主症短气乏力、自汗盗汗并见、口干咽燥、午后低热、纳少便溏，舌淡红少津脉虚数。病机元气亏虚、阴液不足。治法益气养阴。主方生脉散合六味地黄丸（人参、麦冬、五味子、熟地黄、山药、山茱萸、茯苓、泽泻、牡丹皮），汗多加浮小麦煅牡蛎。',
      misjudgment: '把气阴两虚当单纯气虚或单纯阴虚偏治。错：短气自汗示气虚、盗汗咽干示阴虚，两者并见须双补，单补气则阴愈伤、单滋阴则气愈馁，故生脉散合六味地黄丸两顾。',
      reasoning: '气阴两虚证自汗盗汗并见，如何把握补气与养阴的分寸而不偏废？',
      feedback: '气阴两虚双补为法，气虚重者加重参芪，阴虚重者重用熟地麦冬，随其偏重而进退。',
      transfer: '肿瘤术后气阴两伤、乏力盗汗者，试按气阴两虚双补调养。',
    },
  },
  {
    id: 'pb40-r-007', title: '虚劳·肾阳虚证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['虚劳', '肾阳虚', '右归丸', '附子', '温补肾阳'],
    intent: '掌握虚劳肾阳虚证的主症舌脉与右归丸温补肾阳填精益髓的运用要点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.附子炮制煎法', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '血痹虚劳病脉证并治第六', originalText: '虚劳腰痛，少腹拘急，小便不利者，八味肾气丸主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '右归丸参考量：熟地黄24g、山药12g、山茱萸9g、枸杞子12g、菟丝子12g、鹿角胶12g烊化、杜仲9g、肉桂3g后下、当归9g、制附子6-9g先煎，水煎服。', caution: '附子须炮制先煎久煎至无麻辣感，孕妇禁用，反半夏瓜蒌贝母白蔹白及；本方温补峻烈，阴虚火旺、湿热内盛者禁用；鹿角胶烊化兑服。' },
    cases: null,
    stdJudgment: '虚劳肾阳虚见腰背酸痛、畏寒肢冷、遗精阳痿、下利清谷或五更泄泻、面色晄白，舌淡胖苔白、脉沉迟，是肾阳不足、温煦失职；右归丸桂附温补命门、鹿角胶杜仲菟丝子填精助阳，纯补无泻，使少火生气、阳回寒去，此方峻补真阳，阴虚火旺者断不可投。',
    coreDefinition: '虚劳肾阳虚证以腰背酸痛、畏寒肢冷、遗精阳痿、下利清谷为主症，治以温补肾阳，方用右归丸加减。',
    safety: { note: '右归丸纯补峻剂，须中病即止，久服防温燥伤阴；肾阳虚日久兼水肿喘促者当防心肾衰竭', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用'] },
    learning: {
      knowledge: '主症腰背酸痛、遗精阳痿、多尿或不禁、畏寒肢冷、下利清谷，舌淡胖苔白脉沉迟。病机肾阳亏虚、失于温养固摄。治法温补肾阳。主方右归丸（熟地黄、山药、山茱萸、枸杞子、菟丝子、鹿角胶、杜仲、肉桂、当归、制附子），五更泄加补骨脂肉豆蔻。',
      misjudgment: '把肾阳虚虚劳当脾阳虚治以理中丸辈。错：本证以腰背酸痛、遗精阳痿、五更泄泻为主，责在命门火衰，理中丸温中焦而不及下焦，当右归丸温补肾阳。',
      reasoning: '右归丸为纯补无泻之方，与六味地黄丸三补三泻相比，其立法依据有何不同？',
      feedback: '右归丸峻补真阳，纯虚无邪方可用之，凡有湿热痰浊者皆非所宜。',
      transfer: '老年性五更泄伴腰酸畏寒者，试从肾阳虚角度合方温肾止泻。',
    },
  },
  // ============================================================
  // R 中医内科学 · 汗证（008–009）
  // ============================================================
  {
    id: 'pb40-r-008', title: '汗证·自汗气虚证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['汗证', '自汗', '气虚', '玉屏风散', '益气固表'],
    intent: '掌握自汗气虚证的主症舌脉、病机与益气固表治法，熟悉玉屏风散的配伍特点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '评热病论篇第三十三', originalText: '人所以汗出者，皆生于谷，谷生于精。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '玉屏风散参考量：黄芪15-30g、白术15g、防风6-9g，水煎服或研末冲服，日一剂；汗出多加浮小麦15g、煅牡蛎15g先煎、糯稻根12g。', caution: '本方补气固表，实热汗出及阴虚盗汗不宜；外感表证未解者不宜过早投固表之品，防闭门留寇；黄芪量大，表实者慎用。' },
    cases: null,
    stdJudgment: '自汗气虚证汗出恶风、稍劳尤甚、体倦乏力、易于感冒，苔薄白、脉弱，是卫气不固、腠理开泄；玉屏风散黄芪固表、白术健脾、防风祛风，三味相须使卫外之气充实，汗出自止，与盗汗之阴虚者，一动一静、一寤一寐，病机自别。',
    coreDefinition: '汗证自汗气虚证以汗出恶风、稍劳尤甚、体倦乏力为主症，治以益气固表，方用玉屏风散加减。',
    safety: { note: '辨证论治知识学习，临床用药须遵医嘱；汗证久治不愈须排查甲亢、结核、低血糖等继发因素', prohibitions: ['实热、阴虚盗汗者不宜用玉屏风散'] },
    learning: {
      knowledge: '主症汗出恶风、稍劳尤甚、体倦乏力、易于感冒，苔薄白脉细弱。病机肺卫气虚、腠理不固。治法益气固表。主方玉屏风散（黄芪、白术、防风），汗多加浮小麦煅牡蛎糯稻根，气虚甚加党参黄精。',
      misjudgment: '把气虚自汗当阴虚盗汗治以滋阴降火。错：自汗寤时汗出、动则尤甚，盗汗寐中汗出、醒则自止，一责卫虚不固、一责阴虚火旺，滋阴降火用于气虚者反敛邪碍阳。',
      reasoning: '玉屏风散黄芪配防风，补气固表方中何以用祛风之药？',
      feedback: '防风少量祛风邪于外，使黄芪固表而不留邪，为补中寓散之妙。',
      transfer: '儿童反复呼吸道感染自汗者，试以玉屏风散固表预防。',
    },
  },
  {
    id: 'pb40-r-009', title: '汗证·盗汗阴虚证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['汗证', '盗汗', '阴虚', '当归六黄汤', '滋阴降火'],
    intent: '掌握盗汗阴虚证的主症舌脉、病机与滋阴降火治法，熟悉当归六黄汤的组方层次。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '血痹虚劳病脉证并治第六', originalText: '男子平人，脉虚弱细微者，喜盗汗也。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '当归六黄汤参考量：当归9g、生地黄12g、熟地黄12g、黄连3-6g、黄芩9g、黄柏9g、黄芪15g，水煎服。', caution: '三黄苦寒伤胃，脾胃虚弱便溏者慎用，中病即止；黄芪用量偏大以固卫，汗多者加浮小麦、五味子；盗汗长期不退须排查结核、肿瘤等。' },
    cases: null,
    stdJudgment: '盗汗阴虚见寐中汗出、醒则汗止、五心烦热、两颧潮红、口干咽燥，舌红少苔、脉细数，是阴虚火旺、迫津外泄；当归六黄汤当归生地熟地滋阴养血、黄连黄芩黄柏泻火坚阴、黄芪固表，滋填、清泻、固表三法并施，阴复火降则汗自收，丹溪谓盗汗属血虚阴虚，此其义也。',
    coreDefinition: '汗证盗汗阴虚证以寐中汗出、醒则汗止、五心烦热为主症，治以滋阴降火，方用当归六黄汤加减。',
    safety: { note: '辨证论治知识学习，临床用药须遵医嘱；盗汗经久不愈或伴低热消瘦须排查结核、甲亢等原发病', prohibitions: ['三黄苦寒伤胃，脾胃虚弱便溏者慎用；中病即止'] },
    learning: {
      knowledge: '主症寐中汗出、醒则自止、五心烦热、两颧色红、口渴咽干，舌红少苔脉细数。病机阴液亏虚、虚火内炽、迫津外泄。治法滋阴降火。主方当归六黄汤（当归、生地、熟地、黄连、黄芩、黄柏、黄芪），汗出甚加浮小麦五味子。',
      misjudgment: '把阴虚盗汗当气虚自汗投玉屏风散。错：盗汗寐中汗出、醒后即止，伴五心烦热、舌红少苔，卫表固摄之剂不能制其虚火，须当归六黄汤滋阴泻火。',
      reasoning: '当归六黄汤集当归生地滋阴、三黄泻火、黄芪固表于一方，汗证治法的层次如何理解？',
      feedback: '当归六黄汤滋填、清泻、固表三法并施，阴复火降卫固则盗汗自止。',
      transfer: '围绝经期烘热汗出兼心烦者，试按盗汗阴虚思路加减调治。',
    },
  },
  // ============================================================
  // R 中医内科学 · 内伤发热（010–011）
  // ============================================================
  {
    id: 'pb40-r-010', title: '内伤发热·阴虚发热证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['内伤发热', '阴虚发热', '清骨散', '滋阴清热'],
    intent: '掌握阴虚发热证的主症舌脉、病机与滋阴清热治法，熟悉清骨散退虚热的配伍要点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '调经论篇第六十二', originalText: '有所劳倦，形气衰少，谷气不盛，上焦不行，下脘不通，胃气热，热气熏胸中，故内热。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '清骨散参考量：银柴胡9g、胡黄连9g、秦艽9g、鳖甲15g先煎、地骨皮12g、青蒿9g后下、知母9g、甘草3g，水煎服。', caution: '鳖甲先煎、青蒿后下；方偏苦寒清透，气虚发热及阳虚发热者不宜；长期低热不退须排查结核、肿瘤、风湿免疫病等。' },
    cases: null,
    stdJudgment: '内伤发热阴虚证午后或夜间潮热、手足心热、盗汗口干、心烦少寐，舌红少苔、脉细数，是阴液亏耗、虚火内炽；清骨散银柴胡胡黄连地骨皮青蒿退骨蒸、鳖甲知母滋阴清热，专清骨蒸劳热，与气虚发热之劳后热作、气短乏力者虚实迥殊。',
    coreDefinition: '内伤发热阴虚发热证以午后潮热、手足心热、盗汗口干为主症，治以滋阴清热，方用清骨散加减。',
    safety: { note: '辨证论治知识学习，临床用药须遵医嘱；长期低热当先排查结核、肿瘤等器质性疾病，不可一味恃方退热', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症午后或夜间潮热、手足心热、骨蒸盗汗、心烦少寐、口干咽燥，舌红少苔脉细数。病机阴液亏虚、虚热内蒸。治法滋阴清热。主方清骨散（银柴胡、胡黄连、秦艽、鳖甲、地骨皮、青蒿、知母、甘草），阴虚甚加玄参生地。',
      misjudgment: '把阴虚发热当外感发热治以解表。错：本证午后潮热、热由内生、并无表证，发汗更劫阴液，须滋阴退蒸，清骨散鳖甲青蒿退骨蒸之热。',
      reasoning: '清骨散诸药多入肝肾退虚热，与气虚发热之甘温除热法相比较，两者的病机差异在哪里？',
      feedback: '阴虚发热潮热骨蒸，清骨散退热存阴；气虚发热劳则热作，补中益气甘温除热，虚实之辨为第一要义。',
      transfer: '术后低热绵绵、骨蒸盗汗者，试按阴虚发热清骨散加减。',
    },
  },
  {
    id: 'pb40-r-011', title: '内伤发热·气虚发热证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['内伤发热', '气虚发热', '补中益气汤', '甘温除热'],
    intent: '掌握气虚发热证的主症舌脉、病机与益气健脾甘温除热治法，理解东垣升阳举陷之旨。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《脾胃论》', canon: '《脾胃论》', chapter: '脾胃虚实传变论', originalText: '脾胃之气既伤，而元气亦不能充，而诸病之所由生也。', sourceTitle: '《脾胃论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '补中益气汤参考量：黄芪15-30g、党参12g、白术12g、炙甘草6g、当归9g、陈皮6g、升麻3g、柴胡3g，水煎服。', caution: '升麻柴胡量宜小，取其轻清升提；本方甘温，湿热、阴虚及外感发热者忌用；黄芪量大，兼表实者慎用。' },
    cases: null,
    stdJudgment: '内伤发热气虚证发热每于劳累后发作或加重、热势或高或低、倦怠乏力、气短懒言、自汗易感冒、食少便溏，舌淡苔薄白、脉虚弱，是脾胃气虚、清阳下陷、虚阳外浮；补中益气汤甘温除热，黄芪党参白术补中、升麻柴胡升举清阳，火升而热自退，此东垣「劳者温之」之旨。',
    coreDefinition: '内伤发热气虚发热证以劳累后发热、热势或高或低、倦怠乏力为主症，治以益气健脾、甘温除热，方用补中益气汤。',
    safety: { note: '甘温除热法专为气虚发热而设，实热、湿热及阴虚发热忌用；补中益气汤久服当防温燥，兼阴虚者加麦冬五味子', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症劳累后发热、热势或高或低、倦怠乏力、气短懒言、自汗易感冒、食少便溏，舌淡苔薄白脉虚弱。病机中气不足、清阳下陷。治法益气健脾、甘温除热。主方补中益气汤（黄芪、党参、白术、炙甘草、当归、陈皮、升麻、柴胡），自汗加煅牡蛎浮小麦。',
      misjudgment: '把气虚发热当阴虚发热治以滋阴退蒸。错：本证劳后热作、倦怠气短、舌淡脉虚，清骨散苦寒清透愈耗中气，当甘温除热、升阳举陷。',
      reasoning: '补中益气汤治发热，何以升麻柴胡仅用少量即能退热？',
      feedback: '升麻柴胡量小力专，轻清上浮以举下陷之清阳，非取其疏散之力。',
      transfer: '久病低热、劳倦乏力者，试以甘温除热法辨治。',
    },
  },
  // ============================================================
  // R 中医内科学 · 颤证 / 痉证（012–013）
  // ============================================================
  {
    id: 'pb40-r-012', title: '颤证·风阳内动证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['颤证', '风阳内动', '天麻钩藤饮', '镇肝熄风汤', '朱茯神', '平肝息风'],
    intent: '掌握颤证风阳内动证的主症舌脉、病机与镇肝息风舒筋止颤治法，理解重镇潜降之理。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.朱砂使用注意', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '脉要精微论篇第十七', originalText: '骨者，髓之府，不能久立，行则振掉，骨将惫矣。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '天麻钩藤饮合镇肝熄风汤参考量：天麻9g、钩藤12g后下、石决明18g先煎、怀牛膝15g、生赭石15g先煎、生龙骨15g先煎、生牡蛎15g先煎、生白芍12g、玄参12g、天冬12g、川楝子6g、生麦芽9g、茵陈6g、甘草3g，水煎服。', caution: '石决明清石等介贝类先煎；朱茯神含朱砂拌制，不宜久服，孕妇禁用；震颤进展伴强直、动作迟缓者须神经科诊治。' },
    cases: null,
    stdJudgment: '颤证风阳内动证头摇肢颤、颤动粗大不能自制、眩晕耳鸣、面赤烦躁、口苦咽干，舌红苔黄、脉弦，是肝阳化风、风阳上扰筋脉；天麻钩藤饮平肝潜阳、镇肝熄风汤重镇息风，石决明赭石龙牡重镇、牛膝引血下行，风静则颤动自止，与气血亏虚之细小震颤当辨虚实。',
    coreDefinition: '颤证风阳内动证以肢体颤动粗大、眩晕耳鸣、面赤烦躁为主症，治以镇肝息风、舒筋止颤，方用天麻钩藤饮合镇肝熄风汤加减。',
    safety: { note: '帕金森病等神经变性病须专科诊治，中药可辅助缓解症状；朱茯神不宜久服；震颤伴肌张力增高、行走困难者当及时就医', prohibitions: ['朱砂含硫化汞忌火煅；0.1-0.5g只入丸散；不可久服；孕妇禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症肢体颤动粗大、不能自制、眩晕耳鸣、面赤烦躁、口苦，舌红苔黄脉弦。病机肝阳偏亢、风阳内动、扰动筋脉。治法镇肝息风、舒筋止颤。主方天麻钩藤饮合镇肝熄风汤（天麻、钩藤、石决明、怀牛膝、赭石、龙骨、牡蛎、白芍、玄参、天冬等），痰热加胆南星竹沥。',
      misjudgment: '把风阳内动颤证当血虚生风投四物汤类。错：本证颤动粗大、面赤口苦、脉弦，属阳亢风动之实，养血息风缓不济急，须重镇潜阳息风。',
      reasoning: '镇肝熄风汤重用牛膝赭石龙牡，为何治疗颤动须重镇与潜降并用？',
      feedback: '重镇潜降使风阳归宅，颤动源于阳亢风动，潜阳即所以息风。',
      transfer: '老年手抖伴头晕头胀者，试从风阳内动角度评估与用药。',
    },
  },
  {
    id: 'pb40-r-013', title: '痉证·热甚发痉证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['痉证', '热甚发痉', '阳明热盛', '白虎汤', '增液承气汤', '清热止痉'],
    intent: '掌握痉证热甚发痉（阳明热盛）的主症舌脉与清泄胃热增液止痉治法，并与肝经热盛证相鉴别。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '痉湿暍病脉证治第二', originalText: '痉为病，胸满口噤，卧不着席，脚挛急，必齘齿，可与大承气汤。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '白虎汤合增液承气汤参考量：生石膏30g先煎、知母9g、粳米15g、甘草6g、玄参12g、麦冬12g、生地黄15g、大黄6g后下、芒硝6g冲服，水煎服。', caution: '石膏先煎、大黄后下、芒硝冲服；攻下之品中病即止，孕妇慎用大黄；抽搐持续、角弓反张属急重症，须急诊救治，勿单纯恃药。' },
    cases: null,
    stdJudgment: '痉证热甚发痉见壮热胸闷、口噤齘齿、项背强急、甚则角弓反张、手足挛急、腹胀便秘，苔黄燥、脉弦数，是阳明热盛、灼伤津液、筋脉失养；白虎汤清泄胃热、增液承气汤增水行舟，釜底抽薪使热去津回，与肝经热盛之羚角钩藤汤证须辨病在气分还是深入血分。',
    coreDefinition: '痉证热甚发痉证以壮热口噤、项背强急、角弓反张、腹胀便秘为主症，治以清泄胃热、增液止痉，方用白虎汤合增液承气汤加减。',
    safety: { note: '痉证抽搐不止、口噤不语属危急重症，须立即送医急救，中药仅作辨证配合；攻下剂中病即止，防伤正气', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '大黄芒硝攻下，中病即止；孕妇慎用'] },
    learning: {
      knowledge: '主症壮热汗出、口渴、项背强急、手足挛急、腹满便结，甚则角弓反张，舌红苔黄燥脉弦数。病机阳明热盛、耗灼津液、筋脉失养。治法清泄胃热、增液止痉。主方白虎汤合增液承气汤（石膏、知母、甘草、玄参、麦冬、生地、大黄、芒硝），热盛动风加羚羊角钩藤。',
      misjudgment: '把热甚发痉当外风破伤风治以祛风解痉。错：本证壮热便秘、苔黄脉弦数，属阳明热盛灼津，外风解痉之品不能清其里热，须白虎汤合增液承气汤釜底抽薪。',
      reasoning: '痉证热甚发痉用白虎汤合增液承气汤，为何攻下可以止痉？',
      feedback: '阳明热盛灼津致痉，攻下泻热存阴，热去津回则筋脉复柔。',
      transfer: '高热惊厥持续抽搐者，可参考热甚发痉思路配合救治。',
    },
  },
  // ============================================================
  // R 中医内科学 · 腰痛（014–015）
  // ============================================================
  {
    id: 'pb40-r-014', title: '腰痛·肾虚腰痛证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['腰痛', '肾虚腰痛', '左归丸', '右归丸', '附子', '补肾壮腰'],
    intent: '掌握肾虚腰痛的主症舌脉与阳虚阴虚两端分治，熟悉左归丸右归丸的选择依据。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.附子炮制煎法', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '脉要精微论篇第十七', originalText: '腰者，肾之府，转摇不能，肾将惫矣。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '左归丸参考量：熟地黄24g、山药12g、枸杞子12g、山茱萸12g、川牛膝9g、菟丝子12g、鹿角胶12g烊化、龟板胶12g烊化，水煎服；偏阳虚者用右归丸（含肉桂、制附子）。', caution: '附子须炮制先煎久煎至无麻辣感，孕妇禁用；鹿角胶龟板胶烊化兑服；腰痛反复或伴下肢放射痛、进行性加重者须影像学检查排除脊柱病变。' },
    cases: null,
    stdJudgment: '肾虚腰痛以酸软绵绵为特征、喜按喜揉、腿膝无力、遇劳更甚、卧则减轻，偏阳虚者畏寒肢冷舌淡、偏阴虚者心烦失眠舌红；左归丸滋肾填精、右归丸温肾壮阳，按阴阳两端分途施治，此腰痛之虚者居多，与刺痛固定之瘀血腰痛治法大异。',
    coreDefinition: '腰痛肾虚腰痛证以腰部酸软隐痛、喜按喜揉、遇劳加重为主症，治以补肾填精，阳虚用右归丸、阴虚用左归丸。',
    safety: { note: '辨证论治知识学习，临床用药须遵医嘱；肾虚腰痛久治不愈或伴腿麻、消瘦者须排查腰椎间盘病变与肿瘤结核', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用'] },
    learning: {
      knowledge: '主症腰部酸软隐痛、喜按喜揉、腿膝无力、遇劳更甚，偏阳虚畏寒肢冷舌淡，偏阴虚心烦失眠舌红。病机肾精亏虚、腰府失养。治法补肾填精壮腰。偏阳虚用右归丸、偏阴虚用左归丸，兼外邪合独活寄生汤。',
      misjudgment: '把肾虚腰痛当风寒湿痹治以祛风散寒。错：本证酸软喜按、遇劳加重，祛风燥湿之品更耗肾气，须补肾为主，与痹证之重着刺痛有虚实之别。',
      reasoning: '同为腰痛，肾虚者酸软喜按、瘀血者刺痛拒按，为何一补一攻而方向截然相反？',
      feedback: '肾虚者精亏失养故喜按，瘀血者络阻不通故拒按，虚实之治不可倒施。',
      transfer: '慢性腰肌劳损酸软喜按者，试按肾虚腰痛补肾强腰。',
    },
  },
  {
    id: 'pb40-r-015', title: '腰痛·瘀血腰痛证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['腰痛', '瘀血腰痛', '身痛逐瘀汤', '活血化瘀'],
    intent: '掌握瘀血腰痛的主症舌脉、病机与活血化瘀理气止痛治法，熟悉身痛逐瘀汤的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '身痛逐瘀汤参考量：秦艽9g、川芎9g、桃仁9g、红花9g、甘草6g、羌活6g、没药6g、当归12g、五灵脂9g包煎、香附9g、牛膝12g、地龙6g，水煎服。', caution: '五灵脂包煎、畏人参；桃仁红花活血，孕妇禁用，有出血倾向者慎用；久痛不愈、夜间痛甚伴消瘦发热者当排除脊柱肿瘤、结核。' },
    cases: null,
    stdJudgment: '瘀血腰痛痛处固定不移、或如锥刺、拒按、日轻夜重、俯仰转侧不利，舌紫暗或有瘀斑、脉涩，是瘀血留着、经络痹阻；身痛逐瘀汤桃红当归川芎活血、五灵脂没药散瘀止痛、牛膝地龙通络引经，瘀去络通则腰痛自解，与肾虚之酸软喜按者判若两途。',
    coreDefinition: '腰痛瘀血腰痛证以腰痛如刺、固定拒按、日轻夜重为主症，治以活血化瘀、理气止痛，方用身痛逐瘀汤。',
    safety: { note: '瘀血腰痛须排除骨折、结核、肿瘤等器质性病变，跌打损伤急性期须先摄片；活血药孕妇及出血倾向者禁用', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '桃仁红花活血通经，孕妇禁用'] },
    learning: {
      knowledge: '主症腰痛如刺、痛有定处、拒按、日轻夜重、俯仰转侧不利，舌紫暗有瘀斑脉涩。病机瘀血阻络、气血不畅。治法活血化瘀、理气止痛。主方身痛逐瘀汤（桃仁、红花、当归、川芎、五灵脂、没药、香附、牛膝、地龙、秦艽、羌活、甘草），痛甚加乳香延胡索。',
      misjudgment: '把瘀血腰痛当肾虚腰痛治以补益。错：本证刺痛拒按、日轻夜重、舌紫脉涩，补益反使瘀滞更甚，须活血化瘀，身痛逐瘀汤主之。',
      reasoning: '身痛逐瘀汤中用羌活秦艽祛风之品，活血方中佐祛风药的意义是什么？',
      feedback: '羌活秦艽疏风通络，助活血药直达病所，风与瘀每相兼为患。',
      transfer: '跌打损伤后遗腰痛固定刺痛者，试以活血化瘀通络法调治。',
    },
  },
  // ============================================================
  // R 中医内科学 · 痹证（016–017）
  // ============================================================
  {
    id: 'pb40-r-016', title: '痹证·行痹证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['痹证', '行痹', '防风汤', '麻黄', '祛风通络'],
    intent: '掌握行痹的主症舌脉、病机与祛风通络散寒除湿治法，熟悉防风汤的组方与风邪偏胜之辨。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.麻黄使用注意', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痹论篇第四十三', originalText: '风寒湿三气杂至，合而为痹也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '防风汤参考量：防风9g、麻黄6g、秦艽12g、葛根12g、肉桂3g后下、当归12g、茯苓12g、生姜9g、大枣4枚、甘草6g，水煎服。', caution: '麻黄发汗力强，虚人及高血压、心脏病、失眠者慎用，运动员禁用；辛温发散方中病即止，汗后避风寒；游走痛甚加威灵仙、海风藤。' },
    cases: null,
    stdJudgment: '行痹肢体关节酸痛、游走不定、屈伸不利，或见恶风发热，苔薄白、脉浮，是风邪偏胜、走注关节；防风汤防风秦艽葛根祛风、麻黄桂枝散寒、当归养血，治风先治血、血行风自灭，故风中佐养血之品，与痛痹之痛有定处、着痹之重着麻木者须分明。',
    coreDefinition: '痹证行痹证以肢体关节疼痛、游走不定、屈伸不利为主症，治以祛风通络、散寒除湿，方用防风汤加减。',
    safety: { note: '痹证为风寒湿邪侵袭之证，发汗宣散后须避风寒湿邪，防复感；关节红肿热痛者非本方所宜', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症肢体关节酸痛、屈伸不利、疼痛游走不定，或恶风发热，苔薄白脉浮。病机风邪偏胜、风寒湿邪痹阻经络。治法祛风通络、散寒除湿。主方防风汤（防风、麻黄、秦艽、葛根、肉桂、当归、茯苓、生姜、大枣、甘草），游走痛甚加威灵仙海风藤。',
      misjudgment: '把行痹当痛痹治以温经散寒重剂。错：行痹痛而游走、风邪偏胜，重用辛热温散虽可暂止，终耗阴血，须祛风为主兼养血，血行风自灭。',
      reasoning: '「治风先治血，血行风自灭」，行痹用防风汤佐当归养血，此语在痹证治疗中如何落实？',
      feedback: '养血濡润筋骨、活血疏通经络，血充络通则风邪无所依附。',
      transfer: '风湿性关节炎游走性疼痛者，试按行痹防风汤加减。',
    },
  },
  {
    id: 'pb40-r-017', title: '痹证·着痹证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['痹证', '着痹', '薏苡仁汤', '麻黄', '川乌', '除湿通络'],
    intent: '掌握着痹的主症舌脉、病机与除湿通络祛风散寒治法，熟悉薏苡仁汤的运用及川乌警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.川乌麻黄使用注意', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痹论篇第四十三', originalText: '湿气胜者为着痹也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '薏苡仁汤参考量：薏苡仁30g、苍术9g、麻黄6g、桂枝6g、羌活9g、独活9g、防风9g、制川乌3g先煎、甘草6g、生姜9g，水煎服。', caution: '麻黄发汗力强，虚人及高血压、心脏病者慎用，运动员禁用；制川乌有毒，须先煎久煎至无麻辣感，反半夏瓜蒌贝母白蔹白及，孕妇禁用；湿痹缠绵，须守方缓图，不可过用辛燥。' },
    cases: null,
    stdJudgment: '着痹肢体关节重着酸痛、肿胀散漫、痛有定处、肌肤麻木、阴雨逢寒则加剧，苔白腻、脉濡缓，是湿邪偏胜、留滞关节；薏苡仁汤薏苡仁苍术健脾除湿、麻黄羌独活散寒祛风、制川乌温经止痛，湿去则重着自除，此痹以湿为主，缠绵难愈，故须守方缓图。',
    coreDefinition: '痹证着痹证以肢体关节重着酸痛、肿胀麻木、痛有定处为主症，治以除湿通络、祛风散寒，方用薏苡仁汤加减。',
    safety: { note: '薏苡仁汤含麻黄与制川乌，须守煎法炮制；湿痹久服温燥须防伤阴，兼热化者去川乌加防己、黄柏', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '制川乌有毒须先煎久煎；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症肢体关节重着酸痛、或有肿胀、痛有定处、肌肤麻木、阴雨逢寒加重，苔白腻脉濡缓。病机湿邪偏胜、留滞关节、气血痹阻。治法除湿通络、祛风散寒。主方薏苡仁汤（薏苡仁、苍术、麻黄、桂枝、羌活、独活、防风、制川乌、甘草、生姜），麻木加海桐皮豨莶草。',
      misjudgment: '把着痹当行痹治以祛风为主。错：着痹重着麻木、痛有定处、苔白腻，湿邪为主，单祛风则湿恋不去，须除湿通络为要，薏苡仁汤健脾渗湿。',
      reasoning: '着痹重着麻木、病程缠绵，为何薏苡仁汤须以健脾渗湿为本？',
      feedback: '湿由脾生，健脾运湿以绝生湿之源，着痹方能渐愈。',
      transfer: '类风湿关节重着肿胀麻木者，试按着痹薏苡仁汤加减。',
    },
  },
  // ============================================================
  // R 中医内科学 · 痿证 / 遗精 / 阳痿（018–020）
  // ============================================================
  {
    id: 'pb40-r-018', title: '痿证·肺热津伤证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['痿证', '肺热津伤', '清燥救肺汤', '清热润燥'],
    intent: '掌握痿证肺热津伤证的主症舌脉、病机与清热润燥养阴生津治法，理解治痿独取阳明的旨义。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痿论篇第四十四', originalText: '肺热叶焦，则皮毛虚弱急薄者，生痿躄也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
      { label: '《素问》', canon: '《素问》', chapter: '痿论篇第四十四', originalText: '阳明者，五脏六腑之海，主润宗筋，宗筋主束骨而利机关也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '清燥救肺汤参考量：桑叶9g、石膏15g先煎、麦冬12g、杏仁9g、人参6g另煎、阿胶9g烊化、胡麻仁9g、枇杷叶6g、甘草3g，水煎服。', caution: '阿胶烊化、石膏先煎；肺胃津伤者忌辛温燥烈之品；痿证须尽早排查格林-巴利综合征、重症肌无力等神经肌肉疾病，及时专科诊治。' },
    cases: null,
    stdJudgment: '痿证肺热津伤起病于发热或热病之后，肢体痿软无力、皮肤枯燥、心烦口渴、咽干咳呛少痰、小便短赤，舌红苔黄燥、脉细数，是肺热叶焦、津伤不能濡养筋脉；清燥救肺汤桑叶石膏清肺润燥、麦冬阿胶胡麻养阴生津，肺津复则筋脉得养，治痿独取阳明之旨亦当铭记。',
    coreDefinition: '痿证肺热津伤证以热病后肢体痿软无力、心烦口渴、咽干咳呛为主症，治以清热润燥、养阴生津，方用清燥救肺汤加减。',
    safety: { note: '痿证须排除急性感染性多发性神经炎、重症肌无力等重症，进行性肌无力须尽早就医；津伤者忌辛燥之品', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症热病后肢体软弱无力、皮肤枯燥、心烦口渴、咽干咳呛少痰、小便短赤，舌红苔黄燥脉细数。病机肺热叶焦、津伤不能濡养筋脉。治法清热润燥、养阴生津。主方清燥救肺汤（桑叶、石膏、麦冬、杏仁、人参、阿胶、胡麻仁、枇杷叶、甘草），热退后改用益胃汤。',
      misjudgment: '把肺热津伤痿证当痹证治以祛风除湿通络。错：痿证肢体痿软无力、多无疼痛，痹证以关节疼痛为主，祛风燥湿更伤阴津，痿证首重滋养肺胃之津。',
      reasoning: '「治痿独取阳明」出自《素问·痿论》，肺热津伤之痿何以亦从阳明论治？',
      feedback: '阳明为多气多血之经、主润宗筋，调补脾胃则气血津液充盛，肺热津伤之痿亦赖以复。',
      transfer: '热病后肢体软弱无力者，试按肺热津伤痿证养阴清热。',
    },
  },
  {
    id: 'pb40-r-019', title: '遗精·君相火旺证治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['遗精', '君相火旺', '黄连清心饮', '三才封髓丹', '清心泻肝'],
    intent: '掌握遗精君相火旺证的主症舌脉与清心泻肝宁心固精治法，理解梦遗与滑精虚实之辨。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '黄连清心饮合三才封髓丹参考量：黄连3g、生地黄12g、当归9g、茯神12g、酸枣仁12g、远志6g、莲子肉9g、天冬9g、熟地黄12g、黄柏9g、砂仁3g后下、甘草3g，水煎服。', caution: '黄连黄柏苦寒，中病即止，久服伤胃阳；遗精频作须调畅情志、节制房劳；青年偶发遗精属生理现象，不必过虑。' },
    cases: null,
    stdJudgment: '遗精君相火旺证少寐多梦、梦则遗精、阳事易举、心中烦热、头晕目眩、口苦胁痛、小便短赤，舌红苔黄、脉弦数，是君火不宁、相火妄动、肾失封藏；黄连清心饮清心宁神、三才封髓丹滋阴降火，君相之火得折则精自固，与肾虚不固之滑精无梦者虚实各异。',
    coreDefinition: '遗精君相火旺证以梦遗频作、心中烦热、口苦胁痛为主症，治以清心泻肝、宁心固精，方用黄连清心饮合三才封髓丹加减。',
    safety: { note: '遗精辨证须辨梦遗滑精、虚实寒热；火旺者忌温补固涩，肾虚者忌苦寒清泄；心理疏导与生活调摄与药治并重', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '黄连黄柏苦寒，中病即止，脾胃虚寒者慎用'] },
    learning: {
      knowledge: '主症少寐多梦、梦则遗精、阳事易举、心中烦热、口苦胁痛，舌红苔黄脉弦数。病机君火偏亢、相火妄动扰动精室。治法清心泻肝、宁心固精。主方黄连清心饮合三才封髓丹（黄连、茯神、酸枣仁、远志、黄柏、砂仁、甘草），烦甚加栀子灯心草。',
      misjudgment: '把君相火旺遗精当肾虚不固治以补肾固涩。错：本证梦遗而烦热口苦、舌红苔黄，属火旺扰精，早用金锁固精丸类固涩反使火郁，须清心泻肝宁精。',
      reasoning: '遗精一证，梦遗多责君相火旺、滑精多责肾虚不固，梦与不梦如何成为辨证的眼目？',
      feedback: '梦遗火旺者清心泻肝，滑精肾虚者固肾涩精，火与虚是辨治枢要。',
      transfer: '青年梦遗频作伴烦热口苦者，试按君相火旺清心泻肝。',
    },
  },
  {
    id: 'pb40-r-020', title: '阳痿·命门火衰证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['阳痿', '命门火衰', '赞育丹', '附子', '温补下元'],
    intent: '掌握阳痿命门火衰证的主症舌脉、病机与温补下元振阳起痿治法，熟悉赞育丹的配伍。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'formula.方剂组成', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.附子炮制煎法', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痿论篇第四十四', originalText: '思想无穷，所愿不得，意淫于外，入房太甚，宗筋弛纵，发为筋痿，及为白淫。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '赞育丹参考量：熟地黄24g、白术12g、当归9g、枸杞子12g、杜仲9g、仙茅9g、巴戟天12g、山茱萸9g、淫羊藿12g、肉苁蓉12g、韭菜子9g、蛇床子6g、肉桂3g后下、制附子6-9g先煎，水煎服。', caution: '附子须炮制先煎久煎至无麻辣感，孕妇禁用，反半夏瓜蒌贝母白蔹白及；仙茅有小毒，不可过量久服；本方温补，阴虚火旺者忌用；阳痿伴心血管病者须中西医结合评估。' },
    cases: null,
    stdJudgment: '阳痿命门火衰证阳事不举、精薄清冷、神疲畏寒、腰膝酸软、头晕耳鸣、面色晄白，舌淡苔白、脉沉细，是命火衰微、宗筋失于温煦；赞育丹桂附仙茅巴戟淫羊藿温肾壮阳、熟地枸杞山茱萸填精，阴中求阳则阳生有根，此证与湿热下注之阳痿，一虚一实，最须明辨。',
    coreDefinition: '阳痿命门火衰证以阳事不举、精薄清冷、畏寒肢冷、腰膝酸软为主症，治以温补下元、振阳起痿，方用赞育丹加减。',
    safety: { note: '阳痿病因复杂，须排除心理、内分泌、血管及药物因素；温补方剂阴虚火旺、湿热下注者忌用；仙茅有小毒，不可久服', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '仙茅有小毒，3-10g，不可过量久服'] },
    learning: {
      knowledge: '主症阳事不举、精薄清冷、神疲畏寒、腰膝酸软，舌淡苔白脉沉细。病机命门火衰、宗筋失于温养。治法温补下元、振阳起痿。主方赞育丹（熟地、枸杞子、仙茅、巴戟天、淫羊藿、肉苁蓉、肉桂、制附子），腰膝酸软加续断。',
      misjudgment: '把命门火衰阳痿当湿热下注治以清利。错：本证精薄清冷、畏寒肢冷、脉沉细，属命火衰微，清利更伤阳气，须温补下元，赞育丹壮阳填精。',
      reasoning: '赞育丹温肾壮阳而配伍熟地枸杞等滋阴填精之品，阴中求阳之法对阳痿治疗有何意义？',
      feedback: '阴中求阳则阳得阴助而生化无穷，壮阳而不伤阴，起痿而不竭源。',
      transfer: '糖尿病性阳痿伴畏寒肢冷者，试从命门火衰角度辨证调治。',
    },
  },
];
