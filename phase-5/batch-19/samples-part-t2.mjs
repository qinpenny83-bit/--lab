// ============================================================
// 杏林大典 · Phase 5 · Batch-19 · 样本 Part T2（T 中医妇科学 15 节点 pb19-t-016 ~ pb19-t-030）
// 学科：T 中医妇科学；覆盖：带下病（3）/ 妊娠病（5）/ 产后病（4）/ 妇科杂病（3）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「妇科病证·证型辨治」式
// facts sourceTitle 限定：《中医妇科学》规划教材 / 《方剂学》规划教材 / 《中药学》规划教材 /
//   《中国药典》 / 《伤寒论》规划教材 / 《金匮要略》规划教材
// classics 一律整书名 label（《素问》《灵枢》《金匮要略》《校注妇人良方》《傅青主女科》
//   《济阴纲目》《女科经纶》《景岳全书》《医宗金鉴》），篇名入 chapter，originalText 逐字核对，
//   sourceType:'classic_original'，status:'verified'，均已在 classic-patch.mjs 收录
// dosage 一律填写 guideline/caution，妊娠期用药与经期用药分别说明
// 妊娠病节点 safety.note 必须写明妊娠用药禁忌
// 高危药红线按 authoring-spec 第 4 节表：半夏/甘草/甘遂/大戟/芫花/牵牛子/商陆/
//   朱砂/雄黄/马兜铃/三棱莪术（妊娠禁忌、破血逐瘀）
// 难度分布：基础 5（difficulty 1）/ 中等 4（difficulty 2）/ 困难 3（difficulty 3）/
//   易混淆 2（difficulty 4）/ 综合推理 1（difficulty 5）
// ============================================================

export const PART_T2 = [
  // ============================================================
  // T 中医妇科学 · 带下病（016–018）
  // ============================================================
  {
    id: 'pb19-t-016', title: '带下病·带下过多脾虚证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['带下病', '带下过多', '脾虚', '完带汤'],
    intent: '掌握脾虚带下过多的主症舌脉、病机与健脾益气升阳除湿治法，熟悉完带汤的组方要点与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《傅青主女科》', canon: '《傅青主女科》', chapter: '带下·白带下', originalText: '夫带下俱是湿症。而以带名者，因带脉不能约束而有此病，故以名之。', sourceTitle: '《傅青主女科》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '完带汤（白术、山药各15~30g，人参3~6g或党参12~15g，白芍10~15g，车前子10g，苍术、甘草各6g，陈皮、黑芥穗、柴胡各6g）水煎服，日1剂分2次温服。', caution: '本方健脾升阳为主，忌过用苦寒清利；服药期间忌生冷、肥甘厚腻之品，注意经期与性生活卫生。' },
    cases: null,
    stdJudgment: '脾虚带下之辨，重在色白质稀、无臭气三字，舌淡胖、脉细缓为据；湿由脾生，脾虚则水湿不运，下注任带而带下绵绵。完带汤重用白术山药以补脾束带，柴胡黑芥穗升阳疏达，苍术车前子燥湿利湿，虚实两顾，为脾虚带下之正治。',
    coreDefinition: '脾虚带下以量多色白质稀、绵绵无臭、倦怠便溏为特征，治以健脾益气升阳除湿，方用完带汤。',
    safety: { note: '妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症带下量多、色白或淡黄、质稀薄如涕如唾、绵绵不断无臭气，面色㿠白或萎黄、四肢倦怠、脘胁不舒、纳少便溏、或四肢浮肿；舌淡胖苔白或白腻，脉细缓。病机脾气虚弱、运化失司、水湿内停下注任带。治以健脾益气、升阳除湿，主方完带汤（白术、山药、人参、白芍、苍术、甘草、陈皮、黑芥穗、柴胡、车前子），肾虚腰酸加杜仲、菟丝子，寒凝腹痛加艾叶、香附，纳呆便溏加薏苡仁、砂仁。调护忌生冷肥甘，保持外阴清洁。',
      misjudgment: '带下色白质稀即投完带汤，未辨夹湿夹寒。错：脾虚为主者可径用本方，若兼肾阳虚之腰酸冷痛，或湿郁化热之口苦苔黄，单用则力有不逮，须随证加入温肾或清化之品。',
      reasoning: '同为脾虚，为何带下过多用完带汤升阳除湿，而泄泻用参苓白术散健脾渗湿？',
      feedback: '带下与泄泻病位一在任带、一在肠腑，完带汤升散清阳以摄带，参苓白术散甘淡渗利以实大便，同属脾虚而治法侧重不同，全在病机所向。',
      transfer: '白带量多清稀、久治不愈而兼腰酸者，试在完带汤基础上加入固肾之品。',
    },
  },
  {
    id: 'pb19-t-017', title: '带下病·带下过多湿热下注证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['带下病', '带下过多', '湿热下注', '止带方'],
    intent: '掌握湿热带下过多的主症舌脉、病机与清利湿热解毒杀虫治法，熟悉止带方的组方与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《傅青主女科》', canon: '《傅青主女科》', chapter: '带下·黄带下', originalText: '妇人有带下而色黄者，宛如黄茶浓汁，其气腥秽，所谓黄带是也。', sourceTitle: '《傅青主女科》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '止带方（猪苓、茯苓、车前子各10~15g，泽泻、茵陈各10~15g，赤芍、丹皮各10g，黄柏6~10g，栀子6~10g，牛膝10g）水煎服，日1剂分2次服。', caution: '本方苦寒清利，脾虚便溏及虚寒带下忌用；中病即止，不可久服伤脾；阴痒者配合外洗，注意煎洗浓度。' },
    cases: null,
    stdJudgment: '湿热带下以带色黄如脓、质稠臭秽、阴痒为辨，舌红苔黄腻、脉滑数可凭；湿热蕴结，任带受损，湿浊与热相搏而下注。止带方猪苓泽泻车前子茵陈分利水道，黄柏栀子清泄下焦，赤芍丹皮凉血，使湿热从小便分消，带下自止。',
    coreDefinition: '湿热下注带下以量多色黄质稠臭秽、阴痒、苔黄腻脉滑数为特征，治以清利湿热佐以解毒杀虫。',
    safety: { note: '妇科辨证知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症带下量多、色黄或黄绿如脓、质黏稠、有臭气，或带下如豆腐渣样、阴部灼热瘙痒，小腹作痛、口苦口腻、胸闷纳呆、小便短赤；舌红苔黄腻，脉滑数。病机湿热蕴结、损伤任带、带脉失约。治以清利湿热、解毒杀虫，主方止带方（猪苓、茯苓、车前子、泽泻、茵陈、赤芍、丹皮、黄柏、栀子、牛膝），阴痒甚加苦参、蛇床子、白鲜皮并配合外洗，带下如脓加土茯苓、败酱草，湿浊重加薏苡仁、苍术。调护勤换内裤、保持局部干燥，忌辛辣酒食。',
      misjudgment: '带下色黄即断为湿热。错：黄带亦有脾虚湿郁化热、或阴虚夹湿之别，须合舌脉与臭气轻重辨之，苔白腻口不渴者湿重于热，宜重化湿而非一味苦寒。',
      reasoning: '湿热带下为何选用牛膝引药下行，而不取薏苡仁健脾利湿？',
      feedback: '牛膝性善下行，引黄柏栀子诸药直达下焦病所；薏苡仁健脾渗利，与引经直达之用不同，一重在引药入下焦，一重在健脾渗湿。',
      transfer: '霉菌性阴道炎带下如豆腐渣、阴痒灼痛者，试按湿热下注配合外洗之法分析。',
    },
  },
  {
    id: 'pb19-t-018', title: '带下病·带下过少肝肾阴虚证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['带下病', '带下过少', '肝肾阴虚', '左归丸'],
    intent: '掌握带下过少肝肾阴虚证的主症舌脉、病机与滋补肝肾养精益血治法，熟悉左归丸加味的组方。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '上古天真论篇第一', originalText: '七七，任脉虚，太冲脉衰少，天癸竭，地道不通，故形坏而无子也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '左归丸加减（熟地15~24g，山药、枸杞子、山茱萸各10~12g，菟丝子12g，鹿角胶、龟板胶各6~10g烊化兑入，川牛膝6~10g，知母、肉苁蓉、紫河车、女贞子各10g）水煎服，日1剂分2次服。', caution: '本方滋腻，脾虚便溏者慎用，须配砂仁、陈皮理气和中；川牛膝活血通经，经量多者慎用；阴虚内热明显者鹿角胶用量宜减。' },
    cases: null,
    stdJudgment: '带下过少一证，总由阴液亏乏、任带失养所致，肝肾阴虚者以阴部干涩灼痛、五心烦热、舌红少苔为凭。左归丸为纯甘壮水之剂，加知母清虚热、肉苁蓉紫河车益精血，重在滋养肝肾、充养天癸，俾阴充液沛则带下自生。',
    coreDefinition: '带下过少肝肾阴虚证以带下量少或全无、阴部干涩、五心烦热、舌红少苔为特征，治以滋补肝肾养精益血。',
    safety: { note: '妇科辨证知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症带下量少甚至全无、阴部干涩灼痛、或伴阴痒、性交疼痛，头晕耳鸣、腰膝酸软、烘热汗出、五心烦热、夜寐不安、小便黄、大便干结；舌红少苔，脉细数或沉弦细。病机肝肾亏损、血少津乏、任带失养。治以滋补肝肾、养精益血，主方左归丸（熟地黄、山药、枸杞子、山茱萸、菟丝子、鹿角胶、龟板胶、川牛膝）加知母、肉苁蓉、紫河车、女贞子，虚火明显加黄柏、地骨皮，气虚加党参、黄芪。调护调畅情志、忌房劳过度，多食滋润之品。',
      misjudgment: '带下过少阴痒干涩即按湿热阴痒清利。错：本病阴液亏乏为本，清利之品愈伤其阴，干涩愈甚；须辨舌脉，舌红少苔脉细数者属阴虚，当滋养为主。',
      reasoning: '同见阴部干涩，带下过少之肝肾阴虚与绝经前后诸证之肾阴虚，治法有何异同？',
      feedback: '二者病本皆在肾阴亏虚，带下过少重滋养任带、充养天癸，绝经前后诸证兼调阴阳水火，法虽相近而侧重不同。',
      transfer: '围绝经期妇女带下稀少、阴道干涩、性生活疼痛者，试从肝肾阴虚角度拟定调治思路。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 妊娠病（019–023）
  // ============================================================
  {
    id: 'pb19-t-019', title: '妊娠病·恶阻脾胃虚弱证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['妊娠病', '恶阻', '脾胃虚弱', '香砂六君子汤', '半夏'],
    intent: '掌握恶阻脾胃虚弱证的主症舌脉、病机与健脾和胃降逆止呕治法，熟悉香砂六君子汤的用法与妊娠用药禁忌。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '妇人妊娠病脉证并治第二十', originalText: '妊娠呕吐不止，干姜人参半夏丸主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '香砂六君子汤（人参3~6g或党参12~15g，白术、茯苓各10~12g，甘草3~6g，姜半夏6~9g，陈皮6g，木香、砂仁各3~6g后下，生姜3片，大枣3枚）水煎浓煎，少量频服，日1剂。', caution: '妊娠恶阻服药宜浓煎少量频服，吐甚者以生姜汁滴舌后再服；半夏须用炮制品（姜半夏、法半夏）且用量宜轻，生半夏有毒禁内服；禁用峻下逐水、破血逐瘀及有毒之品。' },
    cases: null,
    stdJudgment: '恶阻一证，胃气以降为和，脾胃虚弱者孕后冲气上逆，胃失和降，故呕吐清涎、食入即吐、神疲思睡。香砂六君子汤以四君健脾、二陈化痰、木香砂仁理气和中，加生姜和胃止呕，俾脾气健运、胃气得降，呕吐自平；其治重在培土，而非镇逆。',
    coreDefinition: '恶阻脾胃虚弱证以孕早期呕吐清涎、食入即吐、神疲思睡为特征，治以健脾和胃降逆止呕。',
    safety: { note: '妊娠恶阻用药当顾护胎元，半夏须用炮制品且用量宜轻，服药宜浓煎少量频服；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症妊娠早期恶心呕吐不食、甚则食入即吐、呕吐清水或清涎、口淡、脘腹胀满、神疲思睡、头晕乏力；舌淡苔白润，脉缓滑无力。病机脾胃素虚、孕后冲气上逆、胃失和降。治以健脾和胃、降逆止呕，主方香砂六君子汤（人参、白术、茯苓、甘草、姜半夏、陈皮、木香、砂仁、生姜、大枣），吐甚伤阴加麦冬、石斛、芦根，胃寒加丁香、白豆蔻，痰多加竹茹。调护少食多餐、食后勿即卧、药宜浓煎少量频服，吐剧者以生姜汁滴舌。',
      misjudgment: '恶阻呕吐即用重镇降逆之品如代赭石。错：代赭石重镇潜降，孕妇用之恐碍胎气、损伤胎元；恶阻贵在健脾和胃、顺其冲气，忌镇坠攻伐之品。',
      reasoning: '妊娠恶阻呕吐甚者，为何服药讲究浓煎频服、少量多次？',
      feedback: '恶阻者胃气上逆，量大顿服反易触发呕吐，药汁难入；浓煎少量频服使药力缓缓下咽，配合生姜汁护胃，方能受药奏效。',
      transfer: '妊娠剧吐致脱水者，试说明中药频服与补液支持如何配合。',
    },
  },
  {
    id: 'pb19-t-020', title: '妊娠病·胎动不安肾虚证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['妊娠病', '胎动不安', '肾虚', '寿胎丸'],
    intent: '掌握胎动不安肾虚证的主症舌脉、病机与固肾安胎佐以益气治法，熟悉寿胎丸的组成与妊娠用药禁忌。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '六节藏象论篇第九', originalText: '肾者，主蛰，封藏之本，精之处也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '寿胎丸（菟丝子、桑寄生、续断各12~15g，阿胶6~10g烊化兑入）水煎服，日1剂分2次温服；出血期可日2剂或少量频服。', caution: '妊娠期禁用破血逐瘀、峻下滑利及有毒之品（三棱、莪术、桃仁、红花、巴豆、牵牛子等）；保胎期间须卧床静养、禁房事；若流血量多、腹痛加剧须及时就医。' },
    cases: null,
    stdJudgment: '胎动不安肾虚证，责在肾气虚弱、冲任不固、胎失所系，故见腰酸腹痛、小腹下坠、阴道流血色黯淡、脉沉滑尺弱。寿胎丸菟丝子桑寄生续断补肾固冲、阿胶养血止血，药性平和而力专，为补肾安胎之要方，血止后仍须续服固本。',
    coreDefinition: '胎动不安肾虚证以妊娠腰酸腹痛、小腹下坠、阴道少量流血色黯淡为特征，治以固肾安胎佐以益气。',
    safety: { note: '妊娠期用药当守妊娠用药禁忌，禁用破血逐瘀、峻下滑利及有毒之品，保胎期间卧床静养、禁房事；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['三棱、莪术破血逐瘀力峻，孕妇禁用', '巴豆有大毒制霜0.1-0.3g只入丸散；孕妇禁用；不宜与牵牛子同用', '牵牛子煎服3-6g入丸散1.5-3g；孕妇禁用；不宜与巴豆同用'] },
    learning: {
      knowledge: '主症妊娠期腰酸腹痛、小腹下坠、或伴阴道少量流血色黯淡，头晕耳鸣、两膝酸软、小便频数、或有堕胎小产史；舌淡苔白，脉沉滑尺弱。病机肾气虚弱、冲任不固、胎失所系。治以固肾安胎、佐以益气，主方寿胎丸（菟丝子、桑寄生、续断、阿胶），气虚加党参、白术、黄芪，小腹下坠加升麻、黄芪，阴道出血加艾叶炭、苎麻根。调护卧床静养、禁房事、避免劳累与剧烈活动，定期产检。',
      misjudgment: '胎动不安一见出血即投止血炭类。错：肾虚之血出因冲任不固，重在补肾固冲以安胎，炭类止血只治其标，且过用涩敛反碍血行，须标本兼顾。',
      reasoning: '寿胎丸四药皆平，并无峻补之品，何以能固胎元？',
      feedback: '菟丝子桑寄生续断平补肝肾而不腻，阿胶养血止血，全方以固摄冲任、系养胎元为功，不取峻补，正合胎前宜清宜平之旨。',
      transfer: '有复发性流产史者孕后再见腰酸下坠，试按固肾安胎思路及早干预。',
    },
  },
  {
    id: 'pb19-t-021', title: '妊娠病·妊娠腹痛虚寒证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['妊娠病', '妊娠腹痛', '虚寒', '胶艾汤'],
    intent: '掌握妊娠腹痛虚寒证的主症舌脉、病机与暖宫止痛养血安胎治法，理解川芎在妊娠期用量宜轻之理。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '妇人妊娠病脉证并治第二十', originalText: '妇人有漏下者，有半产后因续下血都不绝者，有妊娠下血者，假令妊娠腹中痛，为胞阻，胶艾汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '胶艾汤（阿胶6~10g烊化，艾叶6g，当归、白芍各10g，川芎3~6g，干地黄12g，甘草6g）加巴戟天、杜仲、补骨脂各10g，水煎服，日1剂分2次温服。', caution: '川芎辛温走窜，妊娠期用量宜轻（3~6g）；艾叶为安胎要药，但阴虚血热、胎动不安因热者忌用；服药期间忌生冷寒凉饮食，注意保暖。' },
    cases: null,
    stdJudgment: '妊娠腹痛虚寒者，小腹冷痛绵绵、喜温喜按、畏寒肢冷、脉沉细滑，阳虚胞寒、气血凝滞之象。胶艾汤四物养血、阿胶艾叶暖宫安胎，加巴戟天杜仲补骨脂温肾散寒，温而不燥、养而能固，使胞宫得温、血行痛止，胎元自安。',
    coreDefinition: '妊娠腹痛虚寒证以小腹冷痛喜温喜按、畏寒肢冷为特征，治以暖宫止痛养血安胎。',
    safety: { note: '妊娠期用药当守妊娠用药禁忌，川芎辛散走窜用量宜轻，艾叶安胎而阴虚血热者忌用；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症妊娠小腹冷痛、绵绵不休、喜温喜按、畏寒肢冷、面色㿠白、倦怠乏力、或伴腰酸；舌淡苔薄白而润，脉沉细滑。病机素体阳虚、胞脉失于温煦、气血运行不畅。治以暖宫止痛、养血安胎，主方胶艾汤（阿胶、艾叶、当归、川芎、白芍、干地黄、甘草）加巴戟天、杜仲、补骨脂，腰酸加菟丝子、续断，气虚加黄芪、党参。调护注意保暖、忌生冷寒凉饮食，避免腹部受寒。',
      misjudgment: '妊娠腹痛均按虚寒温补。错：妊娠腹痛有血虚、气郁、虚寒、血瘀之分，血瘀者痛如针刺拒按、舌暗，气郁者胀痛连胁、情志不舒；若概用温补，则气郁血瘀者反增其病。',
      reasoning: '胶艾汤中川芎辛温走窜，用于妊娠腹痛虚寒证，其用量宜轻，道理何在？',
      feedback: '川芎活血行气、辛散走窜，小量配伍于养血方中可调畅血行、和血止痛，量大则恐动血伤胎，故妊娠用之宜轻。',
      transfer: '孕早期小腹冷痛、得温则减者，试分析其病机与暖宫安胎立法。',
    },
  },
  {
    id: 'pb19-t-022', title: '妊娠病·妊娠肿胀脾虚证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['妊娠病', '妊娠肿胀', '脾虚', '白术散', '妊娠禁忌药'],
    intent: '掌握妊娠肿胀脾虚证的主症舌脉、病机与健脾除湿行水消肿治法，鉴别脾虚与肾虚、气滞三证之异，明确妊娠忌用峻下逐水药。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '妇人妊娠病脉证并治第二十', originalText: '妊娠有水气，身重，小便不利，洒淅恶寒，起即头眩，葵子茯苓散主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '白术散（白术、茯苓各15g，大腹皮、生姜皮、橘皮各10g）水煎服，日1剂分2次温服；水肿明显加泽泻、猪苓各10g。', caution: '妊娠肿胀忌用峻下逐水之品（甘遂、大戟、芫花、商陆、牵牛子等孕妇禁用），宜和缓渗利、中病即止；低盐饮食、注意休息，定期产检测血压，防子痫前期。' },
    cases: null,
    stdJudgment: '妊娠肿胀脾虚者，肿起于中焦不运，面目四肢浮肿、皮薄光亮、按之凹陷难起，兼脘腹胀满、气短懒言、舌淡胖苔白腻。与肾虚水泛之肿甚腰酸、气滞湿阻之随按随起相鉴别，脾虚者健脾为先，白术散白术茯苓健脾、大腹皮生姜皮橘皮行水，全在扶土制水。',
    coreDefinition: '妊娠肿胀脾虚证以面目四肢浮肿、按之凹陷、脘腹痞满、舌淡胖苔白腻为特征，治以健脾除湿行水消肿。',
    safety: { note: '妊娠肿胀禁用峻下逐水之品，宜和缓渗利，低盐饮食、定期产检；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['【高风险】甘遂0.5-1.5g入丸散；反甘草；孕妇禁用', '【高风险】大戟反甘草；孕妇禁用；峻下逐水虚人忌用', '【高风险】芫花反甘草；孕妇禁用；峻下逐水虚人忌用', '牵牛子煎服3-6g入丸散1.5-3g；孕妇禁用；不宜与巴豆同用', '商陆有毒醋制减毒；孕妇禁用；不可过量久服'] },
    learning: {
      knowledge: '主症妊娠中晚期面目四肢浮肿或遍身俱肿、皮薄光亮、按之凹陷难起、肤色淡黄或㿠白，脘腹胀满、气短懒言、食欲不振、大便溏薄；舌淡胖苔白腻，脉缓滑无力。病机脾气虚弱、水湿不运、泛溢肌肤。治以健脾除湿、行水消肿，主方白术散（白术、茯苓、大腹皮、生姜皮、橘皮），水肿明显加泽泻、猪苓，气虚加黄芪、党参，纳呆加砂仁、薏苡仁。调护低盐饮食、注意休息、定期产检测血压。',
      misjudgment: '妊娠肿胀按一般水肿峻利逐水。错：妊娠肿胀禁用甘遂、大戟、芫花、商陆、牵牛子等峻下逐水之品，恐伤胎元；须健脾行水、和缓渗利，中病即止。',
      reasoning: '同为妊娠肿胀，脾虚用白术散、气滞用天仙藤散、肾虚用真武汤，三证肿形与兼症有何不同？',
      feedback: '脾虚肿起于面、按之凹陷、兼脘痞便溏；气滞肿由足起、皮色不变、随按随起、兼胸闷胁胀；肾虚肿甚腰酸、下肢为甚、兼心悸气短、面浮肢冷，据此分治。',
      transfer: '孕晚期血压偏高、下肢浮肿按之没指者，试按脾虚水泛并结合产检监测思路分析。',
    },
  },
  {
    id: 'pb19-t-023', title: '妊娠病·滑胎肾虚证治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['妊娠病', '滑胎', '肾虚', '补肾固冲丸', '预培其损'],
    intent: '掌握滑胎肾虚证的主症舌脉、病机与补肾健脾调理冲任治法，理解孕前预培其损、孕后安胎超过前次堕胎孕周的全程思路。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '上古天真论篇第一', originalText: '肾者主水，受五脏六腑之精而藏之，故五脏盛，乃能泻。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '补肾固冲丸（菟丝子15g，续断、巴戟天、杜仲各10~12g，当归、枸杞子各10g，鹿角霜10g，党参12~15g，白术10g，砂仁3~6g后下，熟地12g，大枣3枚）水煎服或制丸，孕前调理期日1剂或按丸剂说明服用。', caution: '滑胎宜孕前开始调理、孕后保胎至超过前次堕胎之孕周；妊娠期禁房事；鹿角霜、巴戟天偏温，阴虚内热者慎用；禁用破血逐瘀及有毒之品。' },
    cases: null,
    stdJudgment: '滑胎肾虚者屡孕屡堕、应期而堕，肾气亏虚、冲任不固，胎元失于维系；其治不在胎堕之后，而在未孕之先，当预培其损。补肾固冲丸以菟丝子续断巴戟天杜仲鹿角霜温肾固冲、参术归地气血双补，孕前调理三月、孕后再守前法安胎，务使超过前次堕胎之期。',
    coreDefinition: '滑胎肾虚证以屡孕屡堕、腰酸膝软、夜尿频多、脉沉弱为特征，治以补肾健脾调理冲任，孕前预培其损。',
    safety: { note: '滑胎患者孕前孕后均须顾护胎元，妊娠期禁房事、禁破血逐瘀及有毒之品，保胎须超过前次堕胎孕周；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症屡孕屡堕、甚或应期而堕，孕后腰酸膝软、头晕耳鸣、夜尿频多、面色晦暗；舌淡苔白，脉沉弱。病机肾气亏虚、冲任不固、胎元失养。治以补肾健脾、调理冲任，主方补肾固冲丸（菟丝子、续断、巴戟天、杜仲、当归、鹿角霜、枸杞子、党参、白术、砂仁、熟地、大枣），腰酸甚加桑寄生、狗脊，气虚下坠加黄芪、升麻。调护堕胎后避孕半年至一年再孕，孕前调理服药，孕后卧床静养、禁房事、调畅情志，保胎至超过前次堕胎之孕周。',
      misjudgment: '滑胎只在孕后保胎，忽视孕前调理。错：滑胎之根在肾虚不固，屡堕之后胞络受损，须孕前预培其损、调补冲任，待体质复常再孕，方不至重蹈覆辙。',
      reasoning: '滑胎强调孕前预培其损，与胎动不安之孕后安胎，治序上为何一前一后？',
      feedback: '胎动不安病起于既孕之后，治在当下固胎；滑胎系反复堕胎之顽疾，根在虚损未复，先培本后受孕，方能种子成实。',
      transfer: '连续两次自然流产史患者拟再孕，试拟定孕前调理至孕后安胎的全程思路。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 产后病（024–027）
  // ============================================================
  {
    id: 'pb19-t-024', title: '产后病·产后腹痛血瘀证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['产后病', '产后腹痛', '血瘀', '生化汤'],
    intent: '掌握产后腹痛血瘀证的主症舌脉、病机与活血化瘀温经止痛治法，熟悉生化汤的组方特点与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '妇人产后病脉证治第二十一', originalText: '师曰：产妇腹痛，法当以枳实芍药散，假令不愈者，此为腹中有干血着脐下，宜下瘀血汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '生化汤（当归12~24g，川芎6~9g，桃仁6~10g，炮姜3~6g，炙甘草3g）加益母草15~30g，水煎加黄酒少许温服，日1剂分2次。', caution: '本方活血化瘀，若恶露量多、色鲜红无块（血热或气虚不摄）者忌用；产后失血过多者慎用桃仁；服药期间注意观察恶露量色质。' },
    cases: null,
    stdJudgment: '产后腹痛血瘀者，瘀阻胞脉、不通则痛，小腹疼痛拒按、恶露量少色紫暗夹块、块下痛减，舌紫暗脉弦涩。生化汤以当归重用养血活血、川芎桃仁活血祛瘀、炮姜温经散寒，加益母草以助化瘀，寓生新于化瘀之中，为产后血瘀腹痛之专方。',
    coreDefinition: '产后腹痛血瘀证以产后小腹疼痛拒按、恶露紫暗夹块、块下痛减为特征，治以活血化瘀温经止痛。',
    safety: { note: '产后用药须辨虚实，恶露量多色鲜红无块者忌用活血化瘀之品；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症产后小腹疼痛、拒按、得热痛减，恶露量少、色紫暗夹有血块、块下痛减，面色青白、四肢不温、或伴胸胁胀痛；舌紫暗苔白，脉沉紧或弦涩。病机产后瘀血内停、胞脉阻滞、不通则痛。治以活血化瘀、温经止痛，主方生化汤（当归、川芎、桃仁、炮姜、炙甘草）加益母草，痛甚加延胡索、五灵脂，胀甚加香附、乌药，寒甚加吴茱萸、肉桂。调护注意保暖、避免受寒，观察恶露量色质变化。',
      misjudgment: '产后腹痛一概止痛为先。错：产后多虚多瘀，血瘀者痛而拒按、块下痛减，血虚者喜按喜揉；若不分虚实，虚证误投化瘀则血海愈亏。',
      reasoning: '生化汤重用当归，在活血化瘀方中居何用意？',
      feedback: '当归养血和血、化瘀而不伤正，重用之以顺产后多虚之体，使瘀去而新生，全方功在生化，故名生化汤。',
      transfer: '剖宫产后恶露排出不畅、小腹阵痛拒按者，试按瘀阻胞脉思路分析用药。',
    },
  },
  {
    id: 'pb19-t-025', title: '产后病·产后发热感染邪毒证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['产后病', '产后发热', '感染邪毒', '五味消毒饮', '失笑散'],
    intent: '掌握产后发热感染邪毒证的主症舌脉、病机与清热解毒凉血化瘀治法，明确其为产后危急重症须结合西医救治。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '妇人产后病脉证治第二十一', originalText: '产后七八日，无太阳证，少腹坚痛，此恶露不尽；不大便，烦躁发热，切脉微实，再倍发热，日晡时烦躁者，不食，食则谵语，至夜即愈，宜大承气汤主之。热在里，结在膀胱也。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '五味消毒饮（金银花、野菊花、蒲公英、紫花地丁各15~30g，紫背天葵10g）合失笑散（蒲黄、五灵脂各6~10g包煎），加丹皮、赤芍各10g，鱼腥草15~30g，益母草15g，水煎服，日1剂分2~3次。', caution: '感染邪毒发热为产后危急重症，须结合现代抗感染及支持治疗，必要时转诊；本方苦寒，中病即止，产后胃气虚弱者注意顾护脾胃；高热神昏合安宫牛黄丸者中病即止、不可久服。' },
    cases: null,
    stdJudgment: '产后发热感染邪毒，多缘产时血室正开、邪毒乘虚内侵胞宫，正邪交争而高热寒战，恶露臭秽如败酱、小腹拒按，舌红苔黄厚脉数有力。五味消毒饮清热解毒、失笑散化瘀止痛，加丹皮赤芍凉血、鱼腥草益母草解毒祛瘀，热毒炽盛者更须结合西医抗感染。',
    coreDefinition: '产后发热感染邪毒证以产后高热寒战、小腹拒按、恶露臭秽为特征，治以清热解毒凉血化瘀。',
    safety: { note: '感染邪毒发热为产后危急重症，须结合现代抗感染与支持治疗；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['【高风险】朱砂含硫化汞忌火煅；0.1-0.5g只入丸散；不可久服；孕妇禁用', '【高风险】雄黄有毒0.05-0.1g只入丸散；忌火煅；孕妇禁用'] },
    learning: {
      knowledge: '主症产后高热寒战、小腹疼痛拒按，恶露量多或少、色紫暗如败酱、有臭气，烦躁口渴、尿少色黄、大便燥结；舌红苔黄厚，脉数有力。病机产后血室正开、邪毒乘虚入侵胞宫、正邪交争。治以清热解毒、凉血化瘀，主方五味消毒饮合失笑散（金银花、野菊花、蒲公英、紫花地丁、紫背天葵、蒲黄、五灵脂）加丹皮、赤芍、鱼腥草、益母草，小腹痛甚加败酱草、红藤，大便秘结加生大黄、枳实，高热神昏加安宫牛黄丸。调护半卧位以利恶露排出，高热时物理降温，必要时中西医结合救治。',
      misjudgment: '产后发热一律按外感表证发汗。错：产后发热有感染邪毒、外感、血虚、血瘀、蒸乳之分，邪毒发热高热寒战、恶露臭秽，发汗徒伤其正，当清热解毒凉血化瘀。',
      reasoning: '产后体虚，感染邪毒之热为何不先扶正而径用清热解毒？',
      feedback: '邪毒内炽、热势鸱张，不除其邪则正无安处，急则治标，清热解毒为先，顾护气阴于方药之中，此治产后感染之大要。',
      transfer: '产后恶露臭秽、高热不退者，试分析为何须中西医结合及时处理。',
    },
  },
  {
    id: 'pb19-t-026', title: '产后病·产后恶露不绝气虚证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['产后病', '恶露不绝', '气虚', '补中益气汤'],
    intent: '掌握产后恶露不绝气虚证的主症舌脉、病机与补气摄血治法，鉴别恶露不绝之气虚、血瘀、血热三证。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.随证加减', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '补中益气汤（黄芪15~30g，党参12~15g，白术10~12g，甘草3~6g，当归10g，陈皮6g，升麻、柴胡各3~6g）加艾叶6g、阿胶6~10g烊化、益母草12g，水煎服，日1剂分2次温服。', caution: '恶露色紫暗有块、臭秽者（血瘀或感染）忌用纯补；升麻、柴胡用量宜轻，防升散太过；服药期间观察恶露色质气味。' },
    cases: null,
    stdJudgment: '恶露不绝气虚者，冲任不固、统摄无权，恶露过期不止、量多色淡质清、小腹空坠、神疲懒言、舌淡脉缓弱。补中益气汤补气升提以摄血，加艾叶阿胶温经养血、益母草祛瘀生新，补中寓通，使气旺血有所统，恶露按期而止。',
    coreDefinition: '产后恶露不绝气虚证以恶露过期不止、量多色淡质清、小腹空坠为特征，治以补气摄血。',
    safety: { note: '恶露不绝当辨虚实，恶露臭秽、色紫暗者忌纯补；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症产后恶露过期不止、量多、色淡红、质清稀、无臭气，小腹空坠、神疲懒言、面色㿠白；舌淡苔白，脉缓弱。病机素体气虚、冲任不固、统摄无权、恶露不绝。治以补气摄血，主方补中益气汤（黄芪、党参、白术、甘草、当归、陈皮、升麻、柴胡）加艾叶、阿胶、益母草，腰酸加续断、杜仲，出血量多加炮姜炭、乌贼骨，夹瘀块加蒲黄、五灵脂。调护注意休息、加强营养，观察恶露色质气味，恶露臭秽者须防感染。',
      misjudgment: '恶露不绝即用炭类止血固涩。错：恶露不绝有气虚、血瘀、血热之分，血瘀者量少紫暗夹块、小腹拒按，血热者色红质稠、面赤口干；径投固涩则瘀血留滞、热不得清，须辨因论治。',
      reasoning: '补中益气汤本为脾虚气陷、清阳不升而设，用于恶露不绝，取其何义？',
      feedback: '产后气虚则清阳不升、血失统摄，补中益气汤升举清阳、使气旺摄血，正合陷者举之、虚者补之之义。',
      transfer: '产后恶露绵绵不绝、色淡质清、气短乏力者，试按气虚失摄立法选方。',
    },
  },
  {
    id: 'pb19-t-027', title: '产后病·缺乳气血虚弱证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['产后病', '缺乳', '气血虚弱', '通乳丹'],
    intent: '掌握缺乳气血虚弱证的主症舌脉、病机与补气养血佐以通乳治法，理解木通宜易通草的安全用药要点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '通乳丹（人参3~6g或党参15g，黄芪15~30g，当归12g，麦冬10g，木通3~6g或通草6~10g，桔梗6g，猪蹄1~2只煎汤代水）水煎服，日1剂分2次服。', caution: '木通须辨品种，关木通含马兜铃酸具肾毒性已禁用，宜以通草或川木通代之；哺乳期用药须考虑经乳汁对婴儿的影响；乳房胀硬疼痛、情志抑郁者非本方所宜，当疏肝解郁通络。' },
    cases: null,
    stdJudgment: '缺乳一证，乳汁为气血所化，气血虚弱则化源不足，乳房柔软无胀感、乳汁清稀、面色无华、脉细弱。通乳丹参芪归麦冬大补气血、滋养化源，猪蹄汤煎药兼补，木通桔梗通络下乳，俾气血充盛、乳络通畅，乳汁自生。',
    coreDefinition: '缺乳气血虚弱证以产后乳汁甚少或全无、乳房柔软无胀感、面色无华为特征，治以补气养血佐以通乳。',
    safety: { note: '通乳用药须辨虚实，木通慎用含马兜铃酸之关木通，宜用通草或川木通；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['【高风险】马兜铃含马兜铃酸有肾毒性3-9g不可过量久服；肾功能不全禁用；关木通含马兜铃酸已禁用，宜用通草或川木通'] },
    learning: {
      knowledge: '主症产后乳汁甚少或全无、乳汁清稀、乳房柔软无胀感，面色无华、神疲乏力、食欲不振；舌淡苔薄白，脉细弱。病机气血虚弱、乳汁化源不足。治以补气养血、佐以通乳，主方通乳丹（人参、黄芪、当归、麦冬、木通、桔梗、猪蹄），纳差加砂仁、陈皮，血虚加熟地、白芍。调护按需哺乳、多吸吮刺激泌乳，加强营养、多饮猪蹄鲫鱼汤类，保持情志舒畅；乳胀硬痛者当疏肝通络而非补益。',
      misjudgment: '缺乳一律补益。错：缺乳有虚实之分，气血虚者乳房柔软无胀感，肝郁气滞者乳房胀硬疼痛、情志抑郁；实证误补则乳络壅滞，须疏肝解郁通络。',
      reasoning: '通乳丹原用木通通络下乳，现代临床何以多易以通草？',
      feedback: '关木通含马兜铃酸具肾毒性，已列入禁用之列，今多以通草、川木通代之，通乳之功不减而毒副作用可免，此安全用药之要。',
      transfer: '产后情志不畅、乳房胀痛而乳汁不下者，试辨虚实并拟定治法。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 妇科杂病（028–030）
  // ============================================================
  {
    id: 'pb19-t-028', title: '妇科杂病·癥瘕气滞血瘀证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['妇科杂病', '癥瘕', '气滞血瘀', '香棱丸', '三棱', '莪术'],
    intent: '掌握癥瘕气滞血瘀证的主症舌脉、病机与行气活血化瘀消癥治法，明确三棱莪术破血药之禁忌与攻补兼施要义。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '妇人妊娠病脉证并治第二十', originalText: '所以血不止者，其癥不去故也，当下其癥，桂枝茯苓丸主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '香棱丸（木香、丁香各3~6g，三棱、莪术各6~10g，枳壳、青皮各6~10g，川楝子10g，小茴香3~6g）水煎服或制丸，日1剂分2次服。', caution: '三棱、莪术破血行气力峻，孕妇禁用、经期及月经过多者慎用；消癥之品不可久服猛攻，宜攻补兼施、中病即止；腹块性质不明者须先明确诊断，排除恶性肿瘤。' },
    cases: null,
    stdJudgment: '癥瘕气滞血瘀者，瘀结胞宫、积而成块，腹中积块坚硬、固定不移、痛有定处、拒按，舌紫暗有瘀点、脉沉涩。香棱丸木香丁香川楝子行气散结、三棱莪术破血消癥、青皮枳壳疏肝理气，气血同治，使气行血活、癥积渐消，久病正虚者当攻补兼施。',
    coreDefinition: '癥瘕气滞血瘀证以腹中积块坚硬固定、痛有定处、舌紫暗脉沉涩为特征，治以行气活血化瘀消癥。',
    safety: { note: '消癥之品破血力峻，孕妇禁用、经期及月经过多者慎用，久用须顾护正气，腹块性质不明者先明确诊断；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['三棱、莪术破血逐瘀力峻，孕妇禁用；经期及月经过多者慎用', '【高风险】巴豆有大毒制霜0.1-0.3g只入丸散；孕妇禁用；不宜与牵牛子同用', '牵牛子煎服3-6g入丸散1.5-3g；孕妇禁用；不宜与巴豆同用'] },
    learning: {
      knowledge: '主症腹中积块、坚硬成块、固定不移、疼痛拒按、痛有定处，或经行腹痛、月经量多或经期延长、色紫暗夹块，面色晦暗、肌肤甲错；舌紫暗或有瘀点，脉沉涩。病机气滞血瘀、瘀结胞宫、积而成癥。治以行气活血、化瘀消癥，主方香棱丸（木香、丁香、三棱、莪术、枳壳、青皮、川楝子、小茴香），疼痛甚加延胡索、蒲黄，月经过多加三七、茜草炭，久病体虚加黄芪、党参、白术。调护定期复查，腹块性质不明者先明确诊断，排除恶性肿瘤。',
      misjudgment: '癥瘕积聚一律猛攻破血。错：癥瘕有气滞血瘀、痰湿瘀结、肾虚血瘀之别，且病程缠绵，久用破血消癥之品耗伤正气，须辨虚实、攻补兼施、中病即止。',
      reasoning: '三棱莪术同为破血消癥要药，临床常相须为用，其性味功用有何异同？',
      feedback: '三棱偏于破血行气，莪术偏于破气消积，二药相须破血行气之力更峻，故孕妇禁用、虚人慎用，宜配参芪以护正气。',
      transfer: '子宫肌瘤伴痛经、舌暗有瘀斑者，试按气滞血瘀癥瘕分析用药与调护。',
    },
  },
  {
    id: 'pb19-t-029', title: '妇科杂病·不孕症肾虚证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['妇科杂病', '不孕症', '肾虚', '毓麟珠'],
    intent: '掌握不孕症肾虚证的主症舌脉、病机与补肾益气温养冲任治法，熟悉毓麟珠的组方与夫妇同治思路。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '上古天真论篇第一', originalText: '二七而天癸至，任脉通，太冲脉盛，月事以时下，故有子。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '毓麟珠（人参3~6g或党参15g，白术、茯苓、白芍各10g，川芎6g，炙甘草3~6g，当归、熟地各12g，菟丝子12~15g，杜仲10g，鹿角霜10g，川椒3g）水煎服，日1剂，经期暂停或遵医嘱。', caution: '川椒辛热，阴虚内热者去之或减量；鹿角霜偏温，血热者慎用；不孕诊治须夫妇同治、排除男方因素，择排卵期同房。' },
    cases: null,
    stdJudgment: '不孕症肾虚者，肾气亏虚、冲任不充、血海空虚，难以摄精成孕，多见月经后期量少、头晕耳鸣、腰膝酸软、性欲淡漠。毓麟珠四君四物气血双补，菟丝子杜仲鹿角霜川椒温肾助阳，俾肾气充盛、冲任通盛，经调而自能种子。',
    coreDefinition: '不孕症肾虚证以婚久不孕、月经后期量少、腰膝酸软、性欲淡漠为特征，治以补肾益气温养冲任。',
    safety: { note: '不孕诊治须夫妇同治、辨清虚实寒热，经期停药或遵医嘱；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症婚久不孕、月经后期、量少色淡、或见闭经，头晕耳鸣、腰膝酸软、性欲淡漠、小便清长；舌淡苔白，脉沉细或沉迟。病机肾气亏虚、冲任不充、血海空虚、难以摄精成孕。治以补肾益气、温养冲任，主方毓麟珠（人参、白术、茯苓、芍药、川芎、炙甘草、当归、熟地、菟丝子、杜仲、鹿角霜、川椒），肾阳虚加巴戟天、补骨脂、肉桂，肾阴虚加女贞子、旱莲草、山茱萸，月经后期加香附、丹参。调护调畅情志、避免熬夜，择排卵期同房，夫妇同治、男方同步检查。',
      misjudgment: '不孕症一味补肾填精。错：不孕有肾虚、肝郁、痰湿、血瘀之分，肝郁者经前乳胀、抑郁善太息，痰湿者形体肥胖、带多苔腻，血瘀者经行腹痛、舌暗，须辨证求因。',
      reasoning: '毓麟珠中配川椒辛热之品，于温养冲任方中起何作用？',
      feedback: '川椒温中散寒、助命门之火，少量用之温煦胞宫以助摄精，阴虚内热者去之，取其温而不燥之意。',
      transfer: '月经稀发、腰酸怕冷、备孕两年未孕者，试按肾虚冲任不足分析诊治思路。',
    },
  },
  {
    id: 'pb19-t-030', title: '妇科杂病·阴挺气虚下陷证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['妇科杂病', '阴挺', '气虚下陷', '补中益气汤'],
    intent: '掌握阴挺气虚下陷证的主症舌脉、病机与补中益气升阳举陷治法，鉴别气虚与肾虚阴挺之异。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '补中益气汤（黄芪15~30g，党参12~15g，白术10~12g，甘草3~6g，当归10g，陈皮6g，升麻、柴胡各3~6g）加枳壳10~15g、金樱子10g、乌梅6g，水煎服，日1剂分2次温服。', caution: '升麻、柴胡升提之品用量宜轻；湿热下注、阴部红肿溃烂者忌用本方；重度脱垂或伴感染须结合专科治疗。' },
    cases: null,
    stdJudgment: '阴挺气虚下陷者，脾虚气陷、带脉失约、无力系胞，子宫脱出、劳则加剧、小腹下坠、神疲懒言、脉虚细。与肾虚不固者腰膝酸软、头晕耳鸣、治以补肾固脱相鉴，此证重在补中益气、升阳举陷，补中益气汤重用黄芪、升麻柴胡升提，加枳壳金樱子乌梅固摄，升提与固涩并行。',
    coreDefinition: '阴挺气虚下陷证以子宫下脱、劳则加剧、小腹下坠、神疲乏力为特征，治以补中益气升阳举陷。',
    safety: { note: '阴挺调护重在避免负重与盆底锻炼，重度脱垂或伴感染须结合专科治疗；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症子宫下脱或脱出阴道口外、劳则加剧、小腹下坠，神疲乏力、少气懒言、面色无华、小便频数或失禁；舌淡苔白，脉虚细。病机脾虚气陷、带脉失约、冲任不固、无力系胞。治以补中益气、升阳举陷，主方补中益气汤（黄芪、党参、白术、甘草、当归、陈皮、升麻、柴胡）加枳壳、金樱子、乌梅，腰酸加续断、杜仲，肾虚明显加山茱萸、菟丝子。调护避免久站久蹲与重体力劳动、产后勿过早负重，配合盆底肌锻炼（提肛运动），保持大便通畅。',
      misjudgment: '阴挺均按气虚升提。错：阴挺有气虚、肾虚之分，兼见腰膝酸软、头晕耳鸣、小便频数者属肾虚不固，治宜大补元煎补肾固脱，单用升提则根蒂不固。',
      reasoning: '补中益气汤加枳壳治阴挺，枳壳本为理气宽中、行滞消胀之品，何以用于升提举陷？',
      feedback: '枳壳对平滑肌有双向调节作用，配伍于升提方中可助子宫收缩回纳，此古方新用之例，用量宜足。',
      transfer: '老年女性久咳便秘后子宫脱垂加重者，试分析升提固脱与治疗原发病并举的思路。',
    },
  },
];
