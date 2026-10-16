// ============================================================
// 杏林大典 · Phase 5 · Batch-18 · 样本 Part S1（S 中医外科学 15 节点 pb18-s-001 ~ pb18-s-015）
// 学科：S 中医外科学；覆盖：疮疡（疖/疔疮/痈/有头疽/丹毒/瘰疬/流注/附骨疽）/
//       乳房疾病（乳痈/乳癖/乳岩）/ 瘿（气瘿/肉瘿/瘿痈）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「外科病证·证型辨治」式
// facts sourceTitle 限定：《中医外科学》规划教材 / 《方剂学》规划教材 / 《中药学》规划教材 /
//   《中国药典》 / 《伤寒论》规划教材 / 《金匮要略》规划教材
// classics 一律整书名 label（《素问》《灵枢》《诸病源候论》《外科正宗》《医宗金鉴》
//   《疡科心得集》），篇名入 chapter，originalText 逐字核对，
//   sourceType:'classic_original'，status:'verified'，均已在 classic-patch.mjs 收录
// dosage 一律填写 guideline（内服剂量+外用方法）/caution（禁忌警戒），
//   剂量与《中国药典》及规划教材通行表述一致
// 高危药红线按 authoring-spec 第 4 节表：半夏（006/013）/甘草（003/004/005/011/013/015）/
//   海藻反甘草（012/013）等均已在 prohibitions 标注
// 难度分布：基础 5（difficulty 1：001/003/005/009/014）/ 中等 4（difficulty 2：007/008/010/012）/
//   困难 3（difficulty 3：002/004/015）/ 易混综合 3（易混淆 2：006/011 + 综合推理 1：013）
// ============================================================

export const PART_S1 = [
  // ============================================================
  // S 中医外科学 · 疮疡 · 疖（001）
  // ============================================================
  {
    id: 'pb18-s-001', title: '疮疡·疖热毒蕴结证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['疮疡', '疖', '热毒蕴结', '五味消毒饮', '清热解毒'],
    intent: '掌握疖热毒蕴结证的主症舌脉、病机与清热解毒治法，熟悉五味消毒饮的组方与外治箍围法。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '生气通天论篇第三', originalText: '营气不从，逆于肉理，乃生痈肿。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '五味消毒饮（金银花、野菊花、蒲公英、紫花地丁、紫背天葵子）水煎，金银花、蒲公英各15~30g，野菊花、紫花地丁各10~15g，日1剂分2~3次温服；外用：初起用金黄膏或玉露膏箍围外敷，脓成则切开排脓后掺九一丹提脓。', caution: '五味消毒饮药性寒凉，脾胃虚寒、大便溏泄者慎用，中病即止；疖肿切忌挤压，尤其颜面部疖肿挤压可致毒邪走散。' },
    cases: null,
    stdJudgment: '疖为浅表化脓性疾病，热毒蕴结证见局部红肿热痛、突起根浅、范围3~6cm，轻者无身热，重者恶寒发热，舌红苔薄黄、脉数。法取清热解毒，五味消毒饮药少力专，金银花为君清气分热毒，配蒲公英野菊花紫花地丁清解疗毒，外以箍围促其消散。',
    coreDefinition: '疖热毒蕴结证以局部红肿热痛、根浅突起、易脓易溃为特征，治以清热解毒，方用五味消毒饮。',
    safety: { note: '外治忌挤压，颜面疖肿尤须防毒邪走散；辨证论治知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症皮肤浅表红肿热痛，突起根浅，范围3~6cm，脓出即愈，轻者无全身症状，重者恶寒发热；舌红苔薄黄，脉数。病机热毒蕴结肌肤，气血凝滞，营卫不和。治以清热解毒，主方五味消毒饮（金银花、野菊花、蒲公英、紫花地丁、紫背天葵子），热盛加连翘、黄芩，外治初起箍围消肿、脓成切开排脓。',
      misjudgment: '把多发性反复发作的疖一律按热毒蕴结投清热解毒重剂。错：反复发作者多属阴虚内热或脾胃气虚，须养阴清热或健脾益气，一味苦寒反伤中阳，愈清愈发。',
      reasoning: '同为清热解毒，五味消毒饮为何以金银花为君而不以苦寒直折的黄连为君？',
      feedback: '金银花甘寒清透，善清解热毒且不伤胃，配野菊花、蒲公英等共奏清解消散之效；黄连苦寒虽峻，用于轻浅之疖则嫌药重病轻。',
      transfer: '颈后反复起硬结红肿疼痛者，试辨其属实热还是正虚，再定清热解毒或扶正托毒。',
    },
  },
  // ============================================================
  // S 中医外科学 · 疮疡 · 颜面部疔疮（002）
  // ============================================================
  {
    id: 'pb18-s-002', title: '疮疡·颜面部疔疮证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['疮疡', '颜面部疔疮', '火毒蕴结', '五味消毒饮', '黄连解毒汤', '走黄'],
    intent: '掌握颜面部疔疮主症舌脉、火毒蕴结病机与清热解毒治法，牢记忌挤压忌切开防走黄。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.走黄警戒', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '生气通天论篇第三', originalText: '膏粱之变，足生大丁，受如持虚。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '五味消毒饮合黄连解毒汤（金银花、野菊花、蒲公英、紫花地丁、紫背天葵子、黄连、黄芩、黄柏、栀子）水煎，黄连、黄芩各6~10g，金银花15~30g，日1剂分2~3次服，重者日2剂；外用：初起玉露散或金黄散箍围，脓成提脓祛腐，溃后掺九一丹。', caution: '颜面疔疮严禁挤压、早期切开、艾灸及挑刺，防毒邪走散内攻成走黄危候；出现高热神昏、烦躁谵语、脉洪数须即中西医结合救治；苦寒药中病即止，防伤脾胃。' },
    cases: null,
    stdJudgment: '颜面疔疮初起如粟米脓头，坚硬根深，状如钉丁，麻痒相兼，继则红肿热痛明显，伴恶寒发热，舌红苔黄、脉数，重者壮热烦躁。疔为火毒之烈者，毒深根固，法当清热解毒并投，五味消毒饮合黄连解毒汤清解三焦火毒，外治只宜箍围，严禁挤压切开。',
    coreDefinition: '颜面部疔疮以粟粒脓头、坚硬根深、红肿热痛为特征，火毒蕴结，治以清热解毒，方用五味消毒饮合黄连解毒汤。',
    safety: { note: '颜面疔疮忌挤压、忌早期切开、忌灸，防疔毒走黄；出现走黄先兆（高热神昏）即按危重症救治；辨证论治知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症颜面部初起粟米样脓头，或痒或麻，逐渐红肿热痛，根深坚硬如钉丁之状，重者恶寒发热、口渴便秘；舌红苔黄，脉数有力。病机火毒蕴结，气血凝滞，毒盛则内攻入营成走黄。治以清热解毒，主方五味消毒饮合黄连解毒汤（金银花、野菊花、蒲公英、紫花地丁、紫背天葵子、黄连、黄芩、黄柏、栀子），便秘加生大黄，外治初起箍围、脓成提脓、溃后祛腐。',
      misjudgment: '疔疮脓头初现即用刀针切开排脓。错：疔根深蒂固，早期切开反致毒邪内陷走散，惟脓熟根松方宜提脓，且以药物提脓为主。',
      reasoning: '疔疮初起麻痒而后红肿热痛，为何说麻痒正是毒深之兆？',
      feedback: '麻痒为火毒走窜、经络阻隔之象，毒势深伏未及外透，较之单纯红肿热痛更险，故疔忌挤压切开，防其内攻。',
      transfer: '口角或鼻翼旁出现粟粒硬结红肿者，试分析其走黄风险与应避免的操作。',
    },
  },
  // ============================================================
  // S 中医外科学 · 疮疡 · 痈初期（003）
  // ============================================================
  {
    id: 'pb18-s-003', title: '疮疡·痈初期证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['疮疡', '痈', '初期', '仙方活命饮', '消法'],
    intent: '掌握痈初期主症舌脉、热毒蕴结病机与清热解毒和营消肿治法，理解消法在外痈初期的应用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '痈疽第八十一', originalText: '大热不止，热胜则肉腐，肉腐则为脓。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
      { label: '《素问》', canon: '《素问》', chapter: '至真要大论篇第七十四', originalText: '诸痛痒疮，皆属于心。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '仙方活命饮（金银花、当归、赤芍、乳香、没药、陈皮、防风、白芷、贝母、天花粉、皂角刺、穿山甲、甘草）水煎，金银花15~30g为君，日1剂分2次温服，药渣可再煎外洗；外用：初期金黄膏或玉露膏箍围外敷，范围超过肿块1~2cm，脓成则切开排脓。', caution: '仙方活命饮活血溃坚之品较多，孕妇及月经过多者慎用；乳香、没药有刺激性，过敏者减量；痈肿已成脓者不宜单纯内消，当转托法或切开。' },
    cases: null,
    stdJudgment: '痈发于皮肉之间，初期患处光软无头、红肿热痛、范围6~9cm，伴恶寒发热、头痛泛恶，舌红苔黄腻、脉滑数。热毒蕴结、营卫不和，法取清热解毒、和营消肿，仙方活命饮为疡门开手攻毒第一方，金银花配归芍活血，白芷防风透表，皂刺山甲溃坚，内外兼施以消为贵。',
    coreDefinition: '痈初期证以光软无头、红肿热痛、范围较大为特征，热毒蕴结，治以清热解毒和营消肿，方用仙方活命饮。',
    safety: { note: '痈为阳证，初期以消法为主，脓成忌内消；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症患处皮肉之间红肿，光软无头，灼热疼痛，范围6~9cm，初起即有恶寒发热、头痛泛恶；舌红苔黄腻，脉滑数。病机热毒蕴结，营卫不和，经络阻隔，气血凝滞。治以清热解毒、和营消肿，主方仙方活命饮（金银花、当归、赤芍、乳香、没药、陈皮、防风、白芷、贝母、天花粉、皂角刺、穿山甲、甘草），热盛加黄连、连翘，外治初期金黄膏箍围消肿。',
      misjudgment: '痈成脓后仍守消法重用皂刺山甲企图内消。错：脓已成则热胜肉腐、毒聚成脓，消之无功反稽留病程，当切开排脓或托毒外出。',
      reasoning: '仙方活命饮中白芷、防风辛温透表，为何痈初起热毒壅盛时仍可配伍？',
      feedback: '痈虽属热，但需因势利导，白芷防风疏风透邪使热毒外达，与清热活血之品相伍，透、清、消并行，正合痈初期消法之旨。',
      transfer: '颈后红肿光软无头、渐成肿块并恶寒发热者，试按痈初期拟定内服与外治方案。',
    },
  },
  // ============================================================
  // S 中医外科学 · 疮疡 · 有头疽（004）
  // ============================================================
  {
    id: 'pb18-s-004', title: '疮疡·有头疽证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['疮疡', '有头疽', '火毒凝结', '黄连解毒汤', '托法'],
    intent: '掌握有头疽主症舌脉、火毒凝结病机与清热和营托毒治法，理解消托补三期分治。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.消托补分期', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《医宗金鉴》', canon: '《医宗金鉴》', chapter: '外科心法要诀', originalText: '痈疽原是火毒生，经络阻隔气血凝。', sourceTitle: '《医宗金鉴》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '黄连解毒汤合仙方活命饮（黄连、黄芩、黄柏、栀子、金银花、当归、赤芍、乳香、没药、防风、白芷、贝母、天花粉、皂角刺、穿山甲、甘草）水煎，日1剂分2~3次温服，重者日2剂；外用：初起金黄膏箍围，脓成十字或井字切开排脓，溃后提脓祛腐、生肌收口。', caution: '有头疽发于项背易内陷，忌挤压碰撞，忌过早切开；脓成而不溃或疮口过小，须及时扩创引流；兼糖尿病者血糖控制与外科处理并重；穿山甲孕妇禁用，乳香没药孕妇慎用。' },
    cases: null,
    stdJudgment: '有头疽初起皮肤一粟粒样脓头，红肿热痛，根脚收束，渐向深部及四周扩散，脓头相继增多，溃后状如蜂窝，范围常逾9cm，伴壮热口渴，舌红苔黄、脉数有力。火毒凝结、气血凝滞，法取清热和营托毒，黄连解毒汤清三焦火毒，合仙方活命饮和营溃坚，脓成即托，溃后转补。',
    coreDefinition: '有头疽以粟粒脓头相继增多、红肿热痛、溃后如蜂窝为特征，火毒凝结，治以清热和营托毒。',
    safety: { note: '有头疽忌挤压、忌早期切开；脓熟不溃须扩创引流；消托补三期各有其法，不可混施；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症初起粟粒样脓头，红肿热痛，根脚收束，脓头相继增多如蜂窝，范围常超过9cm，多发项背，伴壮热口渴、便秘溲赤；舌红苔黄，脉数有力。病机外感风热湿热火毒，脏腑蕴毒，气血凝滞，热胜肉腐。治以清热解毒、和营托毒，主方黄连解毒汤合仙方活命饮（黄连、黄芩、黄柏、栀子、金银花、当归、赤芍、乳香、没药、皂角刺、穿山甲等），外治初起箍围、脓成切开、溃后提脓生肌。',
      misjudgment: '有头疽与痈同用消法，忽视托补转化。错：有头疽毒深根大，脓成后须托毒外出，溃后气血耗伤须补托收口，一味内消则毒陷难敛。',
      reasoning: '同为火毒为患，为何疔重内消而疽重托补？',
      feedback: '疔毒浅而急，消之可散；疽毒深而聚，脓成难消，托法助正鼓脓外出，防毒内陷，故三期分治各得其所。',
      transfer: '项部大片红肿、脓头蜂窝状并高热口渴者，试拟定消托补的阶段性用药思路。',
    },
  },
  // ============================================================
  // S 中医外科学 · 疮疡 · 丹毒风热毒蕴（005）
  // ============================================================
  {
    id: 'pb18-s-005', title: '疮疡·丹毒风热毒蕴证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['疮疡', '丹毒', '风热毒蕴', '普济消毒饮', '疏风清热'],
    intent: '掌握头面部丹毒主症舌脉、风热毒蕴病机与疏风清热解毒治法，熟悉普济消毒饮与外敷法。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《诸病源候论》', canon: '《诸病源候论》', chapter: '丹毒病诸候', originalText: '丹毒者，人身忽然焮赤，如丹涂之状，故谓之丹毒。', sourceTitle: '《诸病源候论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '普济消毒饮（黄芩、黄连、连翘、板蓝根、马勃、牛蒡子、薄荷、僵蚕、玄参、升麻、柴胡、桔梗、甘草、陈皮）水煎，黄芩、黄连各6~10g，板蓝根15~30g，薄荷后下，日1剂分2次服；外用：玉露散或金黄散凉开水调敷，随干随换；颜面部丹毒禁用砭镰法。', caution: '普济消毒饮苦寒清解，脾胃虚寒者慎用，中病即止；头面部丹毒禁砭镰放血，防感染扩散；丹毒反复发作须防形成大脚风，需根治足癣等感染灶。' },
    cases: null,
    stdJudgment: '丹毒发于头面者，皮肤突然焮红灼热、肿胀疼痛、边界清楚、迅速蔓延，伴恶寒发热、头痛口渴，甚则双目合缝，舌红苔薄黄、脉浮数。风热毒邪上犯，血分热盛，法取疏风清热解毒，普济消毒饮以芩连清上焦热毒，升麻柴胡薄荷疏风透邪，马勃牛蒡利咽散肿，外敷凉药以散热毒。',
    coreDefinition: '丹毒风热毒蕴证以皮肤焮红如丹涂、边界清楚、灼热肿胀为特征，治以疏风清热解毒，方用普济消毒饮。',
    safety: { note: '颜面部丹毒禁用砭镰法；发于下肢者反复发作可成象皮腿；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症头面部皮肤突然发红、色如涂丹、边界清楚、灼热肿胀、迅速蔓延，伴恶寒发热、头痛、口渴，重者双目肿闭；舌红苔薄黄，脉浮数。病机风热毒邪外袭，血分蕴热，肌肤经络壅滞。治以疏风清热解毒，主方普济消毒饮（黄芩、黄连、连翘、板蓝根、马勃、牛蒡子、薄荷、僵蚕、玄参、升麻、柴胡、桔梗、甘草、陈皮），外治玉露散或金黄散凉调外敷，颜面禁砭镰。',
      misjudgment: '头面丹毒误作一般接触性皮炎仅予外涂药膏。错：丹毒为血分热毒为患，须内服清热凉血解毒方药，单恃外涂不及其本，反致毒热蔓延。',
      reasoning: '同为颜面红肿热痛，丹毒与颜面疔疮为何治法一散一清、外治一敷一忌？',
      feedback: '丹毒浮浅在表，疏风清热可散；疔疮根深蒂固，清热解毒须防内攻，且忌挤压切开，二者病位浅深有别，治法随之而异。',
      transfer: '小腿焮红灼热、边界清楚且反复发作的患者，试分析其证型归属与根治要点。',
    },
  },
  // ============================================================
  // S 中医外科学 · 疮疡 · 瘰疬气滞痰凝（006）
  // ============================================================
  {
    id: 'pb18-s-006', title: '疮疡·瘰疬气滞痰凝证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['疮疡', '瘰疬', '气滞痰凝', '逍遥散', '二陈汤', '半夏'],
    intent: '掌握瘰疬气滞痰凝证的主症舌脉、病机与疏肝理气化痰散结治法，并鉴别颈痈与失荣。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '寒热第七十', originalText: '此皆鼠瘘寒热之毒气也，留于脉而不去者也。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '逍遥散合二陈汤（柴胡、当归、白芍、白术、茯苓、薄荷、生姜、甘草、半夏、陈皮）水煎，日1剂分2次温服，半夏用制半夏6~10g；外用：肿块期太乙膏或阳和解凝膏外敷，溃后提脓祛腐生肌。', caution: '制半夏有毒须炮制后用，生品禁内服，反乌头类（附子、川乌、草乌）；本方疏肝化痰，孕妇及月经过多者慎用；瘰疬如见肿块坚硬如石、推之不移，须排除恶性病变。' },
    cases: null,
    stdJudgment: '瘰疬发于颈项，结核如串珠，气滞痰凝证见肿块坚实、推之可动、皮色不变、不热不痛，或随情志而消长，苔白腻、脉弦滑。肝郁脾虚、痰气凝结成核，法取疏肝理气、化痰散结，逍遥散疏肝解郁，二陈汤燥湿化痰，内外合治，此证须与颈痈、失荣相鉴别。',
    coreDefinition: '瘰疬气滞痰凝证以颈项结核如串珠、坚实可动、皮色不变为特征，治以疏肝理气化痰散结，方用逍遥散合二陈汤。',
    safety: { note: '瘰疬初起无红肿热痛，切忌当作颈痈切开；痰核坚硬如石须排查恶变；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症颈项部结核如串珠状，大小不一，皮色不变，按之坚实、推之可动，无红肿热痛，或随喜怒而消长，兼胸胁胀闷；舌淡红苔白腻，脉弦滑。病机肝气郁结，脾失健运，痰浊内生，气滞痰凝于颈。治以疏肝理气、化痰散结，主方逍遥散合二陈汤（柴胡、当归、白芍、白术、茯苓、薄荷、生姜、制半夏、陈皮、甘草），肿块硬加海藻、昆布、牡蛎，外治阳和解凝膏外敷。',
      misjudgment: '把瘰疬误作颈痈而用清热解毒、切开排脓。错：颈痈为急性化脓性疾患，红肿热痛起病急；瘰疬属慢性痰核，不红不热不痛，误切则成瘘管，迁延难敛。',
      reasoning: '瘰疬结核随情志消长，为何疏肝之外尚需化痰？',
      feedback: '肝郁则气滞，气滞则津凝为痰，痰随气行结于颈项而成核，故疏肝与化痰并举，气行则痰消，结核自散。',
      transfer: '颈侧多个无痛性小结节且情绪波动时增大者，试从气滞痰凝角度分析其证治。',
    },
  },
  // ============================================================
  // S 中医外科学 · 疮疡 · 流注暑湿阻络（007）
  // ============================================================
  {
    id: 'pb18-s-007', title: '疮疡·流注暑湿阻络证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['疮疡', '流注', '暑湿阻络', '五神汤', '黄连解毒汤'],
    intent: '掌握流注暑湿阻络证的主症舌脉、病机与清热解毒化湿通络治法，理解流注多发性特点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '痈疽第八十一', originalText: '营卫稽留于经脉之中，则血泣而不行，血泣而不行则卫气从之而不通，壅遏而不得行，故热。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '五神汤合黄连解毒汤（金银花、紫花地丁、车前子、茯苓、牛膝、黄连、黄芩、黄柏、栀子）水煎，金银花15~30g，黄连、黄芩各6~10g，日1剂分2次温服；外用：初起金黄膏箍围，脓成切开引流，溃后提脓祛腐、生肌收口。', caution: '流注为多发性脓肿，一处未愈他处又起，须注意全身用药与局部处理并重；苦寒清热药中病即止；已成脓者及时切开，不可一味内消。' },
    cases: null,
    stdJudgment: '流注多发于夏秋，暑湿流注证见恶寒发热、头胀胸闷呕恶，躯干四肢一处或多处漫肿疼痛、皮色不变、按之微热，舌红苔白腻、脉滑数。暑湿之邪阻于经络，气血壅滞成脓，法取清热解毒、化湿通络，五神汤清解湿毒、通络消肿，合黄连解毒汤泻火解毒，外治箍围与切开并用。',
    coreDefinition: '流注暑湿阻络证以肌肉深处漫肿疼痛、皮色不变、此处未愈他处又起为特征，治以清热解毒化湿通络。',
    safety: { note: '流注多发性、易走散，须全身与局部同治；脓成即切开引流；辨证论治知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症初起恶寒发热、头胀胸闷、呕恶纳呆，继则四肢或躯干一处或多处漫肿疼痛，皮色如常，按之微热，此处未愈他处又起；舌红苔白腻，脉滑数。病机暑湿之邪阻于经络，气血凝滞，肉腐成脓。治以清热解毒、化湿通络，主方五神汤合黄连解毒汤（金银花、紫花地丁、车前子、茯苓、牛膝、黄连、黄芩、黄柏、栀子），外治初起金黄膏箍围、脓成切开引流。',
      misjudgment: '流注皮色不变、漫肿无头即误作阴证而投温补。错：流注虽皮色如常，然多伴寒战高热、按之灼热，属阳证脓疡，温补反助火毒，当清化解毒、促脓早透。',
      reasoning: '流注皮色不变而内已成脓，为何不可因外形不红而判定为阴证？',
      feedback: '病位深在肌肉，热毒尚未外透故皮色如常，然全身壮热、局部灼热已示阳证本质，辨阴阳当四诊合参，不可单恃皮色。',
      transfer: '夏秋之际多处肌肉漫肿疼痛伴恶寒发热者，试按暑湿流注分析病机与治疗原则。',
    },
  },
  // ============================================================
  // S 中医外科学 · 乳痈 · 肝胃郁热（008）
  // ============================================================
  {
    id: 'pb18-s-008', title: '乳痈·肝胃郁热证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['乳痈', '肝胃郁热', '疏肝清胃', '瓜蒌牛蒡汤'],
    intent: '掌握乳痈肝胃郁热证的主症舌脉、病机与疏肝清胃通乳消肿治法，熟悉瓜蒌牛蒡汤与外治。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《外科正宗》', canon: '《外科正宗》', chapter: '乳痈论第二十七', originalText: '乳房属阳明胃经，乳头属足厥阴肝经。', sourceTitle: '《外科正宗》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '瓜蒌牛蒡汤（瓜蒌、牛蒡子、天花粉、黄芩、栀子、连翘、金银花、柴胡、青皮、陈皮、皂角刺、甘草）水煎，瓜蒌15~30g，日1剂分2次温服；外用：初期金黄膏或玉露膏外敷，脓成则切开排脓，溃后八二丹提脓、生肌散收口。', caution: '瓜蒌反乌头类（附子、川乌、草乌），不宜同用；哺乳期用药宜兼顾乳汁排出，通乳与清解并行；脓成当及时切开，不宜一味内消；乳痈须防成乳漏。' },
    cases: null,
    stdJudgment: '乳痈肝胃郁热证见乳房红肿热痛加剧、肿块增大、乳汁排出不畅，伴恶寒发热或壮热、口渴、便秘溲赤，舌红苔黄腻、脉弦数。乳头属肝、乳房属胃，肝气郁结、胃热壅滞，热胜肉腐欲成脓，法取疏肝清胃、通乳消肿，瓜蒌牛蒡汤清解肝胃热毒、疏通乳络，脓成则切开。',
    coreDefinition: '乳痈肝胃郁热证以乳房红肿热痛、肿块增大、乳汁不畅为特征，治以疏肝清胃通乳消肿，方用瓜蒌牛蒡汤。',
    safety: { note: '乳痈红肿明显者忌暴力按摩排乳，防炎症扩散；脓成切开宜循乳络放射方向；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['瓜蒌反乌头类（附子、川乌、草乌），含瓜蒌方不宜与乌头类同用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症乳房红肿热痛较甚，肿块增大，乳汁排出不畅，皮色焮红，伴恶寒发热或壮热、口渴欲饮、便秘溲赤；舌红苔黄腻，脉弦数。病机乳头属肝、乳房属胃，肝气郁结化热，胃热壅滞，乳络阻塞，热盛肉腐。治以疏肝清胃、通乳消肿，主方瓜蒌牛蒡汤（瓜蒌、牛蒡子、天花粉、黄芩、栀子、连翘、金银花、柴胡、青皮、陈皮、皂角刺、甘草），外治初起金黄膏外敷、脓成切开排脓。',
      misjudgment: '乳痈发热红肿即大量用苦寒直折，忽视通乳散结。错：乳痈之成以乳汁壅滞为本，苦寒虽可清热，不通乳则郁积不去，当疏肝清胃与通乳并施，使乳络通畅热毒得泄。',
      reasoning: '乳头属肝、乳房属胃，乳痈红肿热痛为何既要清胃热又要疏肝气？',
      feedback: '肝气郁则乳络不畅，胃热盛则肉腐为脓，疏肝以通乳络、清胃以解热毒，二者相须，郁解热清则痈肿自消。',
      transfer: '产后哺乳乳房红肿跳痛、按之应指者，试分析其属肝胃郁热还是已入成脓期及处理要点。',
    },
  },
  // ============================================================
  // S 中医外科学 · 乳痈 · 乳汁郁滞（009）
  // ============================================================
  {
    id: 'pb18-s-009', title: '乳痈·乳汁郁滞证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['乳痈', '乳汁郁滞', '通乳散结', '瓜蒌牛蒡汤'],
    intent: '掌握乳痈乳汁郁滞证的主症舌脉、病机与疏肝理气通乳散结治法，熟悉排乳手法与外敷。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《诸病源候论》', canon: '《诸病源候论》', chapter: '妇人杂病诸候·乳痈候', originalText: '此由新产后，儿未能饮之，及饮不泄，或断儿乳，捻其乳汁不尽，皆令乳汁蓄结，与血气相搏。', sourceTitle: '《诸病源候论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '瓜蒌牛蒡汤加减（瓜蒌、牛蒡子、天花粉、柴胡、青皮、陈皮、皂角刺、王不留行、漏芦、路路通、甘草）水煎，日1剂分2次温服；外用：金黄散或玉露散冷调外敷肿块处，并可循乳络方向轻柔按摩排乳，哺乳前湿热敷。', caution: '按摩排乳忌暴力挤压，防乳腺损伤与炎症扩散；乳痈早期未成脓者忌手术切开；瓜蒌反乌头类；哺乳期用药注意观察婴儿反应。' },
    cases: null,
    stdJudgment: '乳痈乳汁郁滞证为乳痈初期，乳房胀硬疼痛、乳汁排出不畅、肿块边界不清、压痛明显、皮色微红，可伴轻度恶寒发热，舌淡红苔薄白或薄黄、脉弦。乳汁蓄积、乳络阻塞，气血凝滞成块，法取疏肝理气、通乳散结，瓜蒌牛蒡汤通乳消肿，配王不留行、路路通等，外以热敷按摩、金黄散外敷，通乳为第一要义。',
    coreDefinition: '乳痈乳汁郁滞证以乳房胀硬疼痛、乳汁不畅、肿块边界不清为特征，治以疏肝理气通乳散结。',
    safety: { note: '早期通乳为要，忌暴力按摩与过早切开；保持排乳通畅是防痈成脓的关键；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['瓜蒌反乌头类（附子、川乌、草乌），含瓜蒌方不宜与乌头类同用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症乳房胀硬疼痛，乳汁排出不畅，可触及边界不清的肿块，压痛明显，皮色微红或不变，伴恶寒发热较轻；舌淡红苔薄白或薄黄，脉弦。病机乳汁蓄积，乳络阻塞，气滞血凝。治以疏肝理气、通乳散结，主方瓜蒌牛蒡汤加减（瓜蒌、牛蒡子、天花粉、柴胡、青皮、陈皮、王不留行、漏芦、路路通、甘草），外治热敷按摩排乳、金黄散外敷。',
      misjudgment: '乳汁郁滞期即予大剂清热解毒，忽视通乳。错：此期郁滞为本、热象不显，重在疏肝通乳，乳汁得通则肿消痛止；过早苦寒反碍乳络疏通。',
      reasoning: '同是乳痈，为何乳汁郁滞期以通乳为先而不急于清热？',
      feedback: '郁滞未化热或热象尚轻，通乳使乳汁外泄、气血畅行，则瘀滞自散；若热毒已盛则须清解，病期不同治法有别。',
      transfer: '哺乳妇乳房胀痛硬结、排乳不畅而无高热者，试拟定通乳散结的内外治法。',
    },
  },
  // ============================================================
  // S 中医外科学 · 乳癖 · 肝郁痰凝（010）
  // ============================================================
  {
    id: 'pb18-s-010', title: '乳癖·肝郁痰凝证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['乳癖', '肝郁痰凝', '疏肝解郁', '逍遥蒌贝散'],
    intent: '掌握乳癖肝郁痰凝证的主症舌脉、病机与疏肝解郁化痰散结治法，理解其与乳岩的鉴别。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《疡科心得集》', canon: '《疡科心得集》', chapter: '辨乳癖乳痰论', originalText: '乳中结核，形如丸卵，不疼痛，不发寒热，皮色不变，其核随喜怒消长。', sourceTitle: '《疡科心得集》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '逍遥蒌贝散（柴胡、当归、白芍、茯苓、白术、瓜蒌、贝母、半夏、南星、生牡蛎、山慈菇）水煎，日1剂分2次温服，疗程与月经周期相关，经前加重者经前连服7~10日；外用：肿块明显者阳和解凝膏外敷。', caution: '瓜蒌、贝母反乌头类，半夏生品有毒须制用，天南星有毒须制用；孕妇慎用；乳癖肿块若短期增大、质地变硬、与皮肤粘连，须排除乳岩及时活检。' },
    cases: null,
    stdJudgment: '乳癖多见于青中年妇女，乳房胀痛与月经周期相关，肝郁痰凝证见乳房肿块随喜怒消长，胀痛连及胸胁，善郁易怒，失眠多梦，舌淡红苔薄白、脉弦滑。肝气郁结、痰浊凝结，乳络瘀阻，法取疏肝解郁、化痰散结，逍遥蒌贝散疏肝健脾化痰软坚，肿块柔软活动、随月经消长是与乳岩鉴别之要。',
    coreDefinition: '乳癖肝郁痰凝证以乳房肿块随喜怒消长、胀痛与月经相关为特征，治以疏肝解郁化痰散结，方用逍遥蒌贝散。',
    safety: { note: '乳癖为良性增生，但肿块质硬、固定、乳头溢血者须排除乳岩；外敷药注意皮肤过敏；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '瓜蒌贝母反乌头类，含瓜蒌贝母方不宜与乌头类同用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症单侧或双侧乳房胀痛，可触及大小不一、质地中等、边界不清的肿块，经前加重、经后减轻，随喜怒消长，兼胸胁胀闷、善郁易怒、失眠多梦；舌淡红苔薄白或白腻，脉弦滑。病机肝气郁结，脾失健运，痰浊凝结，乳络瘀阻。治以疏肝解郁、化痰散结，主方逍遥蒌贝散（柴胡、当归、白芍、茯苓、白术、瓜蒌、贝母、半夏、南星、生牡蛎、山慈菇），外治阳和解凝膏外敷。',
      misjudgment: '乳癖肿块按之不痛即疑为乳岩而过度恐慌。错：乳癖肿块质软或韧、活动、随月经消长，与乳岩肿块坚硬如石、推之不移、溃后如岩穴有别，可借助钼靶或活检鉴别。',
      reasoning: '乳癖与乳岩同发于乳房，为何乳癖重在疏肝化痰而乳岩重在扶正祛邪？',
      feedback: '乳癖为肝郁痰凝之良性增生，疏肝化痰可消；乳岩为癌毒内结、正气已伤之恶候，须扶正与解毒并行，病性不同治法迥异。',
      transfer: '经前乳房胀痛加重、可触及条索状结块的中年女性，试分析其证型与调治思路。',
    },
  },
  // ============================================================
  // S 中医外科学 · 乳岩 · 正虚毒恋（011）
  // ============================================================
  {
    id: 'pb18-s-011', title: '乳岩·正虚毒恋证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['乳岩', '正虚毒恋', '益气养血', '八珍汤', '五味消毒饮'],
    intent: '掌握乳岩正虚毒恋证的主症舌脉、病机与益气养血解毒散结治法，理解扶正与祛邪的关系。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.预后警戒', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《外科正宗》', canon: '《外科正宗》', chapter: '乳痈论第二十七', originalText: '忧郁伤肝，思虑伤脾，积想在心，所愿不得志者，致经络痞涩，聚结成核。', sourceTitle: '《外科正宗》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '八珍汤合五味消毒饮（人参或党参、白术、茯苓、当归、川芎、白芍、熟地黄、甘草、金银花、野菊花、蒲公英、紫花地丁、紫背天葵子）水煎，日1剂分2次温服，扶正与解毒并进；外用：疮面渗血水者掺海浮散或八二丹，外用生肌玉红膏。', caution: '乳岩溃破者忌挤压、忌乱用腐蚀药外涂；白花蛇舌草、半枝莲等解毒抗癌药久服须顾护脾胃；补益与解毒之品同用时注意消补相宜，正气来复乃可受攻。' },
    cases: null,
    stdJudgment: '乳岩晚期正虚毒恋证见肿块增大溃破，疮口不敛、渗流血水或如岩穴，乳头内陷，伴形体消瘦、神疲乏力、气短纳少，舌淡红苔薄白、脉沉细弱。癌毒内结日久，气血两亏、余毒留恋，法取益气养血、解毒散结，八珍汤双补气血扶其正，合五味消毒饮清解余毒，正复毒祛乃可带瘤延年。',
    coreDefinition: '乳岩正虚毒恋证以肿块溃破不敛、渗流血水、形体消瘦、神疲乏力为特征，治以益气养血解毒散结，方用八珍汤合五味消毒饮。',
    safety: { note: '乳岩溃破忌挤压刺激，禁用腐蚀性外用药；出现广泛转移征象须及时中西医结合综合治疗；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症乳岩晚期肿块增大，或溃破如岩穴，疮口不敛，渗流血水，乳头内陷、抬高，兼形体消瘦、神疲乏力、气短懒言、纳少便溏；舌淡红或淡暗，苔薄白，脉沉细弱。病机气血亏虚，癌毒留恋，正虚邪恋。治以益气养血、解毒散结，主方八珍汤合五味消毒饮（人参或党参、白术、茯苓、当归、川芎、白芍、熟地黄、甘草、金银花、野菊花、蒲公英、紫花地丁、紫背天葵子），外治疮面祛腐生肌。',
      misjudgment: '正虚毒恋期仍以大剂清热解毒攻伐。错：晚期气血大亏，一味攻毒则正气愈伤，毒未去而人先衰，当扶正为主、解毒为辅，益气养血使正复则邪自难留。',
      reasoning: '乳岩晚期毒邪仍在，为何治法以益气养血为先而不专事攻毒？',
      feedback: '邪之所凑其气必虚，晚期正虚为本，气旺血充则脏腑功能得复，方能耐受解毒散结之品，此扶正以祛邪之义。',
      transfer: '乳岩术后创面不愈、神疲消瘦者，试从正虚毒恋角度拟定扶正与祛邪兼顾的用药思路。',
    },
  },
  // ============================================================
  // S 中医外科学 · 气瘿 · 肝郁气滞（012）
  // ============================================================
  {
    id: 'pb18-s-012', title: '气瘿·肝郁气滞证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['气瘿', '肝郁气滞', '疏肝理气', '四海舒郁丸', '海藻'],
    intent: '掌握气瘿肝郁气滞证的主症舌脉、病机与疏肝理气解郁消肿治法，熟悉四海舒郁丸。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.禁忌', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《诸病源候论》', canon: '《诸病源候论》', chapter: '瘿候', originalText: '瘿者，由忧恚气结所生。', sourceTitle: '《诸病源候论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '四海舒郁丸（海藻、昆布、海带、海螵蛸、海蛤壳、青木香、陈皮）水煎服或为丸，海藻、昆布各10~15g，日1剂分2次服；一般不需外治，肿块明显者可配合外敷消瘿散结之膏药。', caution: '海藻反甘草，四海舒郁丸含海藻，忌与甘草同用；孕妇慎用；气瘿肿块迅速增大、质地变硬、有压迫症状者须排除恶变，考虑手术治疗。' },
    cases: null,
    stdJudgment: '气瘿多见于青春期或缺碘地区，颈前结喉两侧弥漫性肿大，质软不痛，皮色如常，随吞咽上下移动，可随情志波动消长，兼胸胁胀满，舌淡红苔薄白、脉弦。肝郁气滞、痰气交阻结于颈前，法取疏肝理气、解郁消肿，四海舒郁丸以海藻昆布海带咸软坚散结、青木香陈皮理气，气得行则肿得消。',
    coreDefinition: '气瘿肝郁气滞证以颈前弥漫肿大、质软不痛、随吞咽移动为特征，治以疏肝理气解郁消肿，方用四海舒郁丸。',
    safety: { note: '气瘿以情志调摄与饮食（碘）调理为辅；肿块压迫气管或疑恶变者手术；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；含海藻方忌与甘草同用；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症颈前结喉两侧漫肿，质软不痛，皮色如常，随吞咽上下移动，肿块可随情志而消长，兼胸胁胀满、善太息；舌淡红苔薄白，脉弦。病机肝郁气滞，脾失健运，痰气交阻，结于颈前。治以疏肝理气、解郁消肿，主方四海舒郁丸（海藻、昆布、海带、海螵蛸、海蛤壳、青木香、陈皮），胸闷太息加柴胡、郁金、香附，外治肿块明显者膏药外敷。',
      misjudgment: '气瘿肿块增大即疑为恶性而急于手术。错：气瘿多为单纯性甲状腺肿，质软随吞咽移动、无压迫症状者可保守调理；惟肿块硬、固定、声嘶、迅速增大方须手术或活检。',
      reasoning: '四海舒郁丸以海藻昆布等咸寒软坚药为主，为何尚需配青木香、陈皮理气？',
      feedback: '瘿肿因气滞痰凝，咸药软坚散结之外，须理气以助痰化，气行则痰消肿散，二者相辅相成。',
      transfer: '山区青年颈前对称性肿大、质软无压痛者，试从肝郁气滞与缺碘两个角度分析防治要点。',
    },
  },
  // ============================================================
  // S 中医外科学 · 肉瘿 · 痰气凝结（013）
  // ============================================================
  {
    id: 'pb18-s-013', title: '肉瘿·痰气凝结证治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['肉瘿', '痰气凝结', '理气化痰', '海藻玉壶汤', '十八反'],
    intent: '掌握肉瘿痰气凝结证的主症舌脉、病机与理气化痰软坚散结治法，理解海藻玉壶汤反药同用的含义。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.十八反警戒', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《外科正宗》', canon: '《外科正宗》', chapter: '瘿瘤论第二十二', originalText: '肉瘿者，软如绵，硬如馒，皮色如常。', sourceTitle: '《外科正宗》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '海藻玉壶汤（海藻、昆布、贝母、半夏、青皮、陈皮、当归、川芎、连翘、甘草、独活、海带）水煎，海藻、昆布各10~15g，制半夏6~10g，日1剂分2次服；外用：肿块外用阳和解凝膏，必要时手术切除。', caution: '海藻玉壶汤中海藻与甘草同用属十八反配伍，教材注明取其相反相激、攻坚破结之旨，临床应用须谨慎权衡、不宜久服；半夏生品有毒须炮制，反乌头类；孕妇慎用；肉瘿肿块增大迅速或囊变出血须手术。' },
    cases: null,
    stdJudgment: '肉瘿多见于中青年，颈前喉结一侧或两侧结块，柔韧而圆如肉之团，边界清楚，表面光滑，随吞咽上下移动，不痛，可缓慢增大，舌淡红苔白腻、脉弦滑。痰气凝结、瘀阻颈前，法取理气化痰、软坚散结，海藻玉壶汤软坚消瘿、理气化痰，方中海藻与甘草并用，为十八反相激成用之例，用须谨慎。',
    coreDefinition: '肉瘿痰气凝结证以颈前柔韧圆滑结块、随吞咽移动、不痛为特征，治以理气化痰软坚散结，方用海藻玉壶汤。',
    safety: { note: '海藻玉壶汤含海藻与甘草相反药对，属有争议配伍，须辨证审慎使用，不宜久服，服药期间忌与含甘草方剂同用；含制半夏，生半夏禁内服；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；海藻与甘草同用属十八反，须慎用且不宜久服'] },
    learning: {
      knowledge: '主症颈前喉结一侧或两侧结块，柔韧而圆，形如肉团，边界清楚，表面光滑，随吞咽上下移动，无明显疼痛，肿块可缓慢增大；舌淡红苔白腻，脉弦滑。病机肝脾气郁，痰浊凝结，瘀阻颈前。治以理气化痰、软坚散结，主方海藻玉壶汤（海藻、昆布、贝母、半夏、青皮、陈皮、当归、川芎、连翘、甘草、独活、海带），外治阳和解凝膏外敷或手术切除。',
      misjudgment: '肉瘿痰气凝结即长期服用海藻玉壶汤，忽视十八反风险。错：海藻与甘草同用属相反配伍，虽古方相激成用，但长期服用安全性存疑，肿块增长者宜手术，服药须中病即止。',
      reasoning: '海藻玉壶汤中海藻与甘草本属十八反，为何古方仍配伍同用？',
      feedback: '此取相反相激、借其激荡之力以攻坚破结，属特定配伍经验；后世用之极审慎，现代临床多避忌或减量短服，学习其义而不必泥守。',
      transfer: '颈前单发圆滑肿块随吞咽移动而甲功正常者，试分析肉瘿与气瘿的鉴别要点及是否宜用含海藻方。',
    },
  },
  // ============================================================
  // S 中医外科学 · 瘿痈 · 风热痰凝（014）
  // ============================================================
  {
    id: 'pb18-s-014', title: '瘿痈·风热痰凝证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['瘿痈', '风热痰凝', '疏风清热', '牛蒡解肌汤'],
    intent: '掌握瘿痈风热痰凝证的主症舌脉、病机与疏风清热化痰消肿治法，熟悉牛蒡解肌汤。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《外科正宗》', canon: '《外科正宗》', chapter: '瘿瘤论第二十二', originalText: '夫人生瘿瘤之症，非阴阳正气结肿，乃五脏瘀血、浊气、痰滞而成。', sourceTitle: '《外科正宗》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '牛蒡解肌汤（牛蒡子、薄荷、荆芥、连翘、栀子、牡丹皮、石斛、玄参、夏枯草）水煎，牛蒡子10~15g，薄荷后下，日1剂分2次温服；外用：金黄膏或玉露膏外敷颈前肿处，脓成则切开排脓。', caution: '牛蒡解肌汤性偏寒凉，脾胃虚寒者慎用，中病即止；瘿痈成脓应早期切开引流，防压迫气道；颈部肿块伴高热、呼吸不畅者须急治。' },
    cases: null,
    stdJudgment: '瘿痈多发于中年女性，颈前结喉一侧或两侧肿起，灼热疼痛，皮色发红，肿块边界不清，可波及耳后枕后，伴恶寒发热、头痛、口渴，舌红苔薄黄、脉浮数。风热外袭、痰热壅结颈前，法取疏风清热、化痰消肿，牛蒡解肌汤疏散风热、解毒消肿，夏枯草玄参散结清火，脓成即切开。',
    coreDefinition: '瘿痈风热痰凝证以颈前结块红肿热痛、伴恶寒发热为特征，治以疏风清热化痰消肿，方用牛蒡解肌汤。',
    safety: { note: '瘿痈急性期忌按摩挤压肿处，防炎症扩散与成脓加速；脓成及时切开引流；辨证论治知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症颈前结喉一侧或两侧肿胀疼痛，灼热，皮色发红，可向耳后枕后放射，肿块边界不清，按之痛甚，伴恶寒发热、头痛、口渴咽干；舌红苔薄黄，脉浮数。病机风热外袭，与痰相搏，痰热壅结颈前。治以疏风清热、化痰消肿，主方牛蒡解肌汤（牛蒡子、薄荷、荆芥、连翘、栀子、牡丹皮、石斛、玄参、夏枯草），外治金黄膏外敷、脓成切开排脓。',
      misjudgment: '瘿痈按一般瘿病投海藻玉壶汤类软坚散结。错：瘿痈为风热痰凝之急证，红肿热痛明显，当疏风清热为先；软坚散结之品性缓力柔，用于急性红肿反缓不济急。',
      reasoning: '同为颈前肿块，瘿痈红肿热痛，气瘿肉瘿则不红不痛，治疗为何一清一消？',
      feedback: '瘿痈为风热痰凝之阳证急症，须疏风清热速解其毒；气瘿肉瘿为痰气凝结之慢性肿块，宜理气软坚缓图，急慢殊途治法各异。',
      transfer: '颈前肿痛灼热伴发热咽痛、吞咽牵痛者，试按瘿痈风热痰凝分析病机与方药。',
    },
  },
  // ============================================================
  // S 中医外科学 · 疮疡 · 附骨疽（015）
  // ============================================================
  {
    id: 'pb18-s-015', title: '疮疡·附骨疽证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['疮疡', '附骨疽', '湿热瘀滞', '仙方活命饮', '五神汤'],
    intent: '掌握附骨疽主症舌脉、湿热瘀滞病机与清热解毒化湿行瘀治法，理解其深附着骨的特点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医外科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '痈疽第八十一', originalText: '热气淳盛，下陷肌肤，筋髓枯，内连五脏，血气竭，当其痈下，筋骨良肉皆无余，故命曰疽。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '仙方活命饮合五神汤（金银花、当归、赤芍、乳香、没药、白芷、贝母、天花粉、皂角刺、穿山甲、甘草、紫花地丁、车前子、茯苓、牛膝）水煎，金银花15~30g，日1剂分2~3次温服；外用：初起金黄膏箍围，脓成切开引流，溃后药线引流、提脓祛腐生肌。', caution: '附骨疽毒深着骨，初起即须重剂清热解毒，脓成及早切开防死骨形成；穿山甲孕妇禁用，乳香没药孕妇慎用；慢性期迁延成窦道者须结合清创与抗感染综合处理。' },
    cases: null,
    stdJudgment: '附骨疽发于四肢长骨，初起患肢疼痛彻骨，1~2周后疼痛加剧、局部胖肿、皮色微红、灼热拒按，伴寒战高热、口渴，舌红苔黄腻、脉滑数。疔疮疖痈余毒未尽或跌打损伤，湿热毒邪深窜入骨，法取清热解毒、化湿行瘀，仙方活命饮合五神汤清解托毒、活血消肿，脓成即切，防毒蚀骨。',
    coreDefinition: '附骨疽以患肢疼痛彻骨、胖肿灼热、恶寒高热为特征，湿热瘀滞，治以清热解毒化湿行瘀，方用仙方活命饮合五神汤。',
    safety: { note: '附骨疽初起即须重剂清解、及早切开，防死骨与窦道形成；慢性附骨疽须清创与内外同治；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症初起患肢疼痛彻骨，继则疼痛加剧，局部胖肿，皮色微红或不变，灼热，拒按，活动受限，伴寒战高热、口渴、溲赤便秘；舌红苔黄腻，脉滑数。病机疔疖痈毒未尽或外伤染毒，湿热毒邪深袭，阻于筋骨，气血凝滞。治以清热解毒、化湿行瘀，主方仙方活命饮合五神汤（金银花、当归、赤芍、乳香、没药、白芷、贝母、天花粉、皂角刺、穿山甲、紫花地丁、车前子、茯苓、牛膝、甘草），外治初起箍围、脓成切开引流。',
      misjudgment: '附骨疽初期患肢疼痛剧烈而皮色不变，误作痹证而用祛风除湿。错：附骨疽痛彻骨髓、按之灼热、伴寒战高热，乃毒深着骨之象，痹证多无高热与固定深压痛，误治则毒蚀骨质成死骨。',
      reasoning: '附骨疽与流注同为深部脓疡，为何附骨疽疼痛彻骨而流注以漫肿为主？',
      feedback: '附骨疽毒邪附着于骨，骨膜与骨内压力骤增故痛彻骨髓、拒按；流注病在肌肉之间，故以漫肿疼痛为主，病位浅深不同，疼痛性质迥异。',
      transfer: '大腿深部剧痛拒按、高热不退且皮色如常者，试分析其与流注、附骨疽的鉴别及治疗原则。',
    },
  },
];

