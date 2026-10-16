// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part F（F 刺法灸法学 10 节点 pb41-f-001 ~ pb41-f-010）
// 学科：F 刺法灸法学（补足学科上限批次）
// 覆盖：隔姜隔蒜隔盐灸 / 艾炷灸壮数与补泻 / 刺络拔罐 / 拔罐适应禁忌 /
//       耳穴分布规律 / 头针标准线 / 三棱针散刺挑刺 / 穴位埋线 /
//       毫针规格消毒保管 / 血肿气胸预防
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'theory'；sourceTitle 仅用《刺法灸法学》规划教材 /《针灸学》规划教材
// 禁针禁灸部位（乳中、神阙、颜面五官、大血管浅表处、孕妇腰骶腹部）写入 prohibitions
// safety.note 一律含「仅作知识学习，禁止无资质自行针刺/艾灸」声明
// 难度分布：简单3（004/007/009）中等3（001/003/005）困难2（006/008）易混综合2（002/010）
// ============================================================

export const PART_F = [
  // ============================================================
  // F 刺法灸法学 · 间接灸（001）
  // ============================================================
  {
    id: 'pb41-f-001', title: '灸法·隔姜灸隔蒜灸隔盐灸', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['灸法', '隔姜灸', '隔蒜灸', '隔盐灸', '神阙', '烫伤'],
    intent: '掌握隔姜、隔蒜、隔盐三种间接灸的取材、操作参数与各自适应证及施灸禁忌。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '姜蒜片厚 0.2-0.3cm、中间针刺数孔；隔姜灸每次 3-7 壮，隔蒜灸 3-7 壮，隔盐灸神阙 3-7 壮或至腹内温热', caution: '姜蒜片须新鲜；灸后局部红晕为度，起泡者小泡任其吸收、大泡消毒处理' },
    cases: null,
    stdJudgment: '隔姜灸温中和胃散寒，宜寒性腹痛呕泻；隔蒜灸解毒消肿杀虫，宜疮疡初起蛇咬肺痨；隔盐灸神阙回阳固脱止泻，三法皆以艾炷隔物施灸，壮数 3-7 壮为常。',
    coreDefinition: '间接灸以艾炷隔姜、蒜、盐等物施灸，借艾火与隔物之力温通散寒、解毒回阳，为艾炷灸之主体。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。施灸防艾火脱落烫伤，灸后起泡防感染；颜面五官、乳中、大血管浅表处及孕妇腰骶腹部禁灸，实热证阴虚者慎灸。', prohibitions: ['乳中、神阙禁针（神阙可隔盐灸）', '颜面部与五官禁灸', '大血管浅表处禁灸', '孕妇腰骶部、腹部禁灸', '实热证、阴虚内热者慎灸'] },
    learning: {
      knowledge: '隔姜灸：鲜生姜切 0.2-0.3cm 厚片，中间针刺数孔置穴上，上放艾炷点燃，燃尽易炷再灸，每穴 3-7 壮，至皮肤红晕汗湿为度；适应胃脘冷痛、呕吐泻痢、寒性腹痛、风寒湿痹。隔蒜灸：独头蒜切厚片或捣泥铺穴，扎孔置艾炷灸 3-7 壮，多灸疮疡肿毒初起、蛇虫咬伤、肺痨咳嗽；蒜灸解毒力强，灸后可起泡化脓。隔盐灸：炒干食盐填平神阙穴（禁针），上置姜片艾炷灸 3-7 壮，治吐泻并作、虚脱、寒疝腹痛、宫寒不孕、久泻脱肛。',
      misjudgment: '把隔盐灸用于神阙以外穴位。隔盐灸专用于神阙，借盐之咸寒入肾与脐部温阳回厥之性，他穴隔盐既无此义又易烫伤。',
      reasoning: '同是间接灸，为何姜、蒜、盐各有专属适应证？',
      feedback: '姜辛温散寒和中、蒜辛温解毒杀虫、盐咸寒入肾回阳，隔物之性即补艾火之功，故各有所宜。',
      transfer: '寒性痛经患者若予隔姜灸，宜取何穴施灸？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 艾炷灸壮数与补泻（002）
  // ============================================================
  {
    id: 'pb41-f-002', title: '灸法·艾炷灸壮数与补泻', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['灸法', '壮数', '灸补灸泻', '毋吹其火', '疾吹其火'],
    intent: '掌握壮数计法与灸法补泻的区分，理解补泻取决于火力徐疾与壮数多寡。',
    facts: [
      { field: 'method.parameter.zhuang', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.buxie.mild', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.buxie.strong', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '一般每穴 3-7 壮，沉寒痼冷可灸 9-15 壮；小儿老人壮数宜少、艾炷宜小；灸补任其自灭多壮，灸泻疾吹其火少壮', caution: '壮数多则热力持久，阴虚火旺、实热证及孕妇腰骶腹部禁灸' },
    cases: null,
    stdJudgment: '壮为艾炷灸计量单位，每燃一炷为一壮，壮数多少视病情体质而定；灸法补泻以火力徐疾为准，补者毋吹其火任其自灭，泻者疾吹其火速燃速灭。',
    coreDefinition: '壮数即艾炷施灸之计数单位；灸法补泻以火力之徐疾与壮数多寡区分，补法温和持久、泻法疾吹速燃。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。施灸防烫伤与艾火脱落，灸疮防感染；颜面五官、乳中、孕妇腰骶腹部禁灸。', prohibitions: ['乳中、神阙禁针（神阙可隔盐灸）', '颜面部与五官禁灸', '孕妇腰骶部、腹部禁灸', '阴虚火旺、实热证慎灸'] },
    learning: {
      knowledge: '壮数：艾炷灸每燃完一炷称一壮，一般每穴 3-7 壮，沉寒痼冷可灸 9-15 壮；小儿、老人、体弱者壮数宜少、艾炷宜小。灸法补泻：《灵枢·背俞》「以火补者，毋吹其火，须自灭也；以火泻者，疾吹其火，传其艾，须其火灭也」——灸补：毋吹其火、任其自然燃尽，火力温和持久，壮数可多；灸泻：疾吹其火、速燃速灭，火力峻猛短促，壮数宜少。临床虚寒证宜灸补（温和灸），实热壅盛者用灸泻（雀啄灸类）引热外出或不用灸。',
      misjudgment: '认为灸法只有补没有泻。灸法亦有补泻，火自灭者为补、疾吹其火者为泻，实热证亦可借泻灸引热外出，但须辨证明确。',
      reasoning: '同为艾灸，为何「毋吹其火」为补、「疾吹其火」为泻？',
      feedback: '火力徐缓持久则温补之力深透，故自灭者为补；火力疾猛短促则泄热散邪，故疾吹者为泻，补泻之别全在火势。',
      transfer: '沉寒痼冷之痹证与湿热蕴结之痹证，灸法与壮数应如何取舍？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 刺络拔罐（003）
  // ============================================================
  {
    id: 'pb41-f-003', title: '拔罐法·刺络拔罐', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['拔罐', '刺络拔罐', '三棱针点刺', '皮肤针叩刺', '出血量'],
    intent: '掌握刺络拔罐的刺血-拔罐-留罐操作流程、适应证与出血量控制。',
    facts: [
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '三棱针点刺 3-5 处或皮肤针叩刺至渗血，随即闪罐或留罐于刺络处 5-10 分钟，出血量 1-5ml', caution: '虚人老人小儿放血量宜少；出血不止者立即起罐按压止血' },
    cases: null,
    stdJudgment: '刺络拔罐先以三棱针点刺或皮肤针叩刺局部出血，随即拔罐使瘀血热毒随罐而出，留罐 5-10 分钟，用于瘀血阻络、热毒壅盛之证。',
    coreDefinition: '刺络拔罐为刺血与拔罐结合之法：局部消毒后点刺或叩刺出血，再拔罐以增出血祛瘀泄热之力。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。刺络处严格消毒防感染，起罐后清净血迹；出血性疾病、皮肤破损感染处禁用，孕妇腰骶腹部禁用。', prohibitions: ['出血性疾病（血友病、血小板减少症）禁用', '皮肤破损、溃疡、感染处禁用', '孕妇腰骶部、腹部禁用', '大血管浅表处禁用'] },
    learning: {
      knowledge: '操作：选穴或痛点常规消毒，以三棱针点刺 3-5 处或皮肤针叩刺至渗血，立即用闪火法拔罐于其上，留罐 5-10 分钟，起罐后清净血迹，出血量 1-5ml 为度。适应证：瘀血阻络之刺痛、跌打损伤、丹毒、蛇串疮（疱疹破溃后）、风热壅盛之咽喉肿痛、痤疮、风湿痹痛。虚人、老人、小儿出血宜少。刺络处须严格消毒防感染，留罐不宜过长防起水疱。',
      misjudgment: '刺络越深出血越多越好。刺络拔罐意在祛瘀泄热，表浅点刺即可，过深出血不止反伤气血，虚证尤当少量。',
      reasoning: '瘀血痹痛为何刺络后再拔罐而非单纯放血？',
      feedback: '拔罐负压可扩大出血面并持续引邪外出，较单纯点刺放血祛瘀泄热之力更强，且操作集中便于控制。',
      transfer: '丹毒红肿灼痛处刺络拔罐，与寻常瘀血处刺络有何操作差别？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 拔罐适应症与禁忌（004）
  // ============================================================
  {
    id: 'pb41-f-004', title: '拔罐法·适应症与禁忌', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['拔罐', '适应症', '禁忌证', '高热抽搐', '水疱处理'],
    intent: '掌握拔罐的适应范围与禁忌证，理解辨证选法之理。',
    facts: [
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.safety', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '留罐 5-15 分钟，闪罐反复吸拔至皮肤潮红，走罐在皮肤涂介质后沿经络推动', caution: '罐后紫痕数日消退属正常；起水疱小者任其吸收、大者消毒穿刺引流' },
    cases: null,
    stdJudgment: '拔罐温通经络、祛风散寒除湿、活血止痛，适风寒湿痹、瘀血疼痛、感冒咳喘与胃肠病，高热抽搐、皮肤溃破、孕妇腰骶腹部及出血倾向者禁用。',
    coreDefinition: '拔罐以罐具吸附体表形成负压，使局部充血瘀血，起温通经络、散寒除湿、行气活血之功，须明适应证与禁忌。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。拔罐操作防烫伤与吸力过大；高热抽搐、皮肤破溃、肿瘤局部、骨折处及出血倾向者禁用。', prohibitions: ['高热抽搐、惊厥者禁用', '皮肤破溃、溃疡、瘢痕处禁用', '孕妇腰骶部、腹部禁用', '出血性疾病（血友病、血小板减少症）禁用', '过饥、过饱、醉酒、疲劳时慎用'] },
    learning: {
      knowledge: '适应症：风寒湿痹、肩背腰腿痛、肌肉劳损、感冒风寒、咳嗽气喘、胃脘疼痛、腹痛泄泻、疮疡初起未溃者。禁忌证：高热抽搐、皮肤过敏破溃感染、肿瘤局部、骨折处、孕妇腰骶部与腹部、有出血倾向者（血友病、血小板减少）、过饥过饱、醉酒、剧烈运动后。操作注意：罐具大小与部位相宜，点火勿烧罐口，吸力以皮肤耐受为度，留罐 5-15 分钟，起罐以指按压罐缘进气。',
      misjudgment: '认为拔罐可以治一切疼痛。拔罐温散之力强，热毒炽盛、阴虚火旺者拔罐反助火势，须辨证选法。',
      reasoning: '为什么高热抽搐与出血倾向者禁用拔罐？',
      feedback: '高热抽搐为内热动风，拔罐温散反助其热；出血倾向者负压瘀血可致皮下出血加重，故二者皆属禁忌。',
      transfer: '患者酒后即刻要求拔罐，存在哪些风险、应如何处置？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 耳穴分布规律与常用耳穴（005）
  // ============================================================
  {
    id: 'pb41-f-005', title: '耳针·耳穴分布规律与常用耳穴', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['耳针', '耳穴分布', '倒置胎儿', '神门', '耳廓禁针'],
    intent: '掌握耳廓分区如倒置胎儿的分布规律与常用耳穴定位及主治。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.distribution', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.commonPoints', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '毫针耳穴浅刺 0.1-0.3 寸刺至软骨膜，留针 20-30 分钟；压豆每日按压 3-5 次、每次 1-2 分钟', caution: '耳廓感染冻伤处禁针禁压；孕妇禁针耳穴' },
    cases: null,
    stdJudgment: '耳穴分布如倒置胎儿：耳垂为头面、对耳屏为脑、耳甲腔为胸腔、耳甲艇为腹腔、对耳轮为脊柱、耳舟为上肢，常用穴神门内分泌皮质下等主全身疾病。',
    coreDefinition: '耳廓分区如倒置胎儿，耳穴分布以相应部位为纲，常用神门、内分泌、皮质下、心、肝、脾、肺、肾等穴诊治全身疾病。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。耳廓皮肤菲薄血运差，操作防感染出血；耳廓冻伤炎症处禁用。', prohibitions: ['耳廓冻伤、炎症、湿疹处禁用', '孕妇禁针耳穴；有习惯性流产史者禁用子宫、卵巢、内分泌等耳穴', '耳廓出血不止者禁针'] },
    learning: {
      knowledge: '耳穴分布规律（倒置胎儿图）：耳垂—头面部（眼、面颊、内耳、扁桃体）；耳屏—鼻咽部；对耳屏—脑（皮质下、枕、额）；耳甲腔—胸腔（心、肺、气管）；耳甲艇—腹腔（胃、肝、脾、肾、膀胱）；对耳轮—脊柱躯干（颈椎、胸椎、腰骶椎）；耳舟—上肢（肩、肘、腕、指）；耳轮脚周围—消化系（口、食道、胃）。常用耳穴：神门（三角窝，安神止痛）、皮质下、内分泌、交感、心、肝、脾、肺、肾、胃、枕。用于疼痛、失眠、高血压、单纯性肥胖、戒烟、近视、痛经、神经衰弱等。',
      misjudgment: '把耳垂误记为下肢区。耳廓如倒置胎儿，耳垂对应头面部，四肢对应耳舟，方向记反则取穴全错。',
      reasoning: '耳穴为何能反映和治疗全身脏腑肢体病证？',
      feedback: '耳廓神经血管丰富、与脏腑经络相通，相应部位反射区分布如倒置胎儿，刺激耳穴经神经体液途径调节相应脏腑功能。',
      transfer: '若患者胃痛，据耳穴分布应在耳廓何区取何穴？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 头针标准线（006）
  // ============================================================
  {
    id: 'pb41-f-006', title: '头针·顶颞前斜线等标准线', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['头针', '顶颞前斜线', '顶颞后斜线', '运动区', '感觉区', '快速捻转'],
    intent: '掌握头针标准头穴线的定位、主治与沿皮刺操作要领。',
    facts: [
      { field: 'method.lines.motor', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.lines.sensory', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.lines.midline', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '沿皮平刺 0.5-1 寸，快速捻转每分钟 200 次左右，留针 30 分钟、期间行针 2-3 次，或用电针', caution: '头皮血管丰富，出针按压防血肿；婴幼儿囟门未闭禁刺其区' },
    cases: null,
    stdJudgment: '头针按标准化头穴线沿皮刺入，顶颞前斜线主运动、顶颞后斜线主感觉、额中线主神志、顶中线主腰腿，沿皮平刺 0.5-1 寸，快速捻转或电针刺激。',
    coreDefinition: '头针在头皮特定区带沿皮刺入以治脑源性疾病，标准线如顶颞前斜线（运动区）、顶颞后斜线（感觉区）按功能分段对应。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。头皮感染处禁刺，婴幼儿囟门未闭禁刺该区，出针按压防血肿。', prohibitions: ['头皮感染、破损处禁刺', '婴幼儿囟门未闭禁刺其相应区'] },
    learning: {
      knowledge: '标准头穴线：额中线（前发际正中直上 0.5 寸至 1 寸，治神志病），额旁1线（治肺心病）、额旁2线（治脾胃病）、额旁3线（治肝胆病），顶中线（百会至前顶，治腰腿足痿瘫），顶颞前斜线（前神聪至悬厘，运动区：上 1/5 主下肢躯干、中 2/5 主上肢、下 2/5 主面舌），顶颞后斜线（百会至曲鬓，感觉区对应分段），颞前线（颔厌至悬厘，主运动性失语），颞后线（率谷至曲鬓，主眩晕耳鸣）。操作：穴线常规消毒，毫针沿皮平刺 0.5-1 寸，快速捻转每分钟 200 次左右，留针 30 分钟期间行针 2-3 次或电针。用于中风偏瘫、失语、感觉障碍、震颤、眩晕。',
      misjudgment: '把顶颞前斜线与顶颞后斜线的功能记反。前者为运动区主肢体运动，后者为感觉区主感觉障碍，二线相邻平行、一前一后，定位与主治不可混淆。',
      reasoning: '顶颞前斜线为何要分段对应躯体不同部位？',
      feedback: '大脑皮层运动区按躯体投影分布，顶颞前斜线正投影于皮层中央前回一带，故按上 1/5、中 2/5、下 2/5 分段对应下肢、上肢与面舌。',
      transfer: '中风偏瘫以上肢为重者，顶颞前斜线当重点刺激哪段？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 三棱针散刺与挑刺（007）
  // ============================================================
  {
    id: 'pb41-f-007', title: '三棱针·散刺与挑刺', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['三棱针', '散刺', '挑刺', '刺络放血', '泄热祛瘀'],
    intent: '掌握三棱针散刺与挑刺的操作要领、适应范围与安全警戒。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.sanchi', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.tiaoci', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '散刺：病变局部浅刺数点至数十点，点距约 1cm，以出血为度；挑刺：针尖挑破皮肤后挑断皮下纤维，出针压迫止血', caution: '严格消毒，虚人放血量少；孕妇腰骶腹部、出血倾向者禁用' },
    cases: null,
    stdJudgment: '三棱针古称锋针，刺法分点刺、散刺、刺络、挑刺四类：散刺于病变局部浅刺多点、点距约 1cm 泄热祛瘀，挑刺以针尖挑断皮下白色纤维治顽疾，出针按压止血。',
    coreDefinition: '三棱针散刺在病变局部浅刺多点出血以泄热祛瘀，挑刺以针尖挑断皮下纤维以通络散结，皆属刺络放血范畴。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。三棱针锋利，刺入宜浅；严格消毒防感染，出血性疾病禁用。', prohibitions: ['出血性疾病（血友病、血小板减少症）禁用', '皮肤感染处禁刺', '孕妇腰骶部、腹部禁用'] },
    learning: {
      knowledge: '散刺法：在病变局部（丹毒赤肿、顽癣、带状疱疹周围）用三棱针浅刺数点至数十点出血，点距约 1cm，使瘀热外泄；施术严格消毒，浅刺入皮即可。挑刺法：以三棱针或挑刺针挑破皮肤后，挑断皮下白色纤维样组织，常用于痔疮、麦粒肿、面瘫、甲状腺肿及顽固性疼痛，挑治部位常在背腰部反应点。操作后局部压迫止血，24 小时内避水。三棱针针体三角形三棱、锋利，刺入宜浅，避免伤及深部组织。',
      misjudgment: '把散刺与点刺混同。点刺为单穴（十宣、少商）一点即刺出血，散刺为病变局部多点浅刺，取穴思路与出血方式不同。',
      reasoning: '挑刺为何多选背腰部反应点？',
      feedback: '背腰部为膀胱经与脏腑背俞穴分布处，皮下常有阳性反应点，挑断此处纤维可激发经气、调整脏腑，为经验要法。',
      transfer: '麦粒肿红肿未化脓时，据三棱针法应如何施治？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 穴位埋线（008）
  // ============================================================
  {
    id: 'pb41-f-008', title: '穴位埋线·操作与适应症', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['穴位埋线', '羊肠线', '持续刺激', '无菌操作', '排异'],
    intent: '掌握穴位埋线的操作流程、适应范围与无菌及排异警戒。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '以埋线针将羊肠线或可吸收线埋入穴内肌层，每次选 2-4 穴，间隔 15-30 天再埋，3-5 次为一疗程', caution: '线头不得外露，埋线后局部酸胀 3-5 日属正常，一周内避水' },
    cases: null,
    stdJudgment: '穴位埋线以可吸收线埋入穴位皮下肌层形成持续刺激，集针刺、留针与组织疗法于一体，适哮喘胃病肥胖腰腿痛等慢性病，15-30 天埋一次。',
    coreDefinition: '穴位埋线将羊肠线等埋入穴位肌层，产生 15-30 天的持续刺激，适于慢性顽固性疾病，须严格无菌。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。埋线须严格无菌，线头外露或排异反应须及时处理；皮肤感染处禁埋。', prohibitions: ['皮肤感染、溃疡处禁埋', '出血性疾病患者禁埋', '孕妇腰骶部、腹部禁埋', '糖尿病患者伤口难愈，慎用'] },
    learning: {
      knowledge: '操作：选定穴位（每次 2-4 穴），常规消毒，以埋线针（穿刺针）将消毒后的羊肠线或 PGA 可吸收线送入穴内肌层，退针后线头不得外露，创可贴覆盖。适应症：哮喘、慢性支气管炎、胃脘痛、慢性泄泻、便秘、单纯性肥胖、腰腿痛、面瘫后遗症、慢性荨麻疹等慢性顽固性疾病。间隔 15-30 天埋线一次，3-5 次为一疗程。埋线后局部酸胀痛 3-5 天，一周内避水防感染；线结外露、排异反应者及时处理。',
      misjudgment: '埋线一次取穴越多越好。埋线刺激持续而强，一次取穴过多可致过度刺激与排异，每次 2-4 穴、间隔 15-30 天为宜。',
      reasoning: '埋线为何适于慢性病而急性病少用？',
      feedback: '埋线刺激缓而持久，正合慢性病病势缓、病程长之特点；急性病需即时强刺激，埋线缓不济急。',
      transfer: '肥胖患者埋线常取哪些穴，治疗间隔如何安排？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 毫针规格选择与消毒保管（009）
  // ============================================================
  {
    id: 'pb41-f-009', title: '针具·毫针规格选择与消毒保管', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['毫针', '规格', '针长直径', '高压消毒', '防锈防弯'],
    intent: '掌握毫针规格分档、按部位选针原则与消毒保管要求。',
    facts: [
      { field: 'method.specification', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.selection', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.sterilization', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.maintenance', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '毫针按针长 25-100mm、直径 0.22-0.35mm 选用，肌肉丰厚处用长粗针、浅表处用短细针', caution: '针具一人一针一消毒，锈蚀弯折断裂者即弃' },
    cases: null,
    stdJudgment: '毫针以不锈钢制成，规格按针体长度与直径分档，选择视部位深浅与体质而定，头面浅表用短细针、肌肉丰厚处用长粗针，消毒以高压蒸汽为首选，保管防锈防弯。',
    coreDefinition: '毫针为针灸主体针具，规格以针长与直径标示，按部位深浅选针，用后清洗灭菌干燥保管，不合格者弃用。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。锈蚀弯曲针禁用，传染病患者针具单独处理，一次性针具不得复用。', prohibitions: ['锈蚀、弯折、断裂毫针禁用', '一次性针具不得重复使用'] },
    learning: {
      knowledge: '规格：毫针针身长度常用 25mm（1 寸）、40mm（1.5 寸）、50mm（2 寸）、75mm（3 寸），直径 0.22、0.25、0.30、0.35mm；针长选择：头面浅表用 25mm、四肢肌肉用 40mm、臀部肌肉丰厚处用 75mm，针细痛感轻、针粗刺激强。消毒：首选高压蒸汽灭菌（121℃ 20 分钟），或煮沸 15 分钟、75% 乙醇浸泡 30 分钟；一人一针，用后清洗去除血迹再灭菌。保管：针具置针盒针包干燥保存防锈，针身不得弯折，定期检查针尖有无钩曲、针身有无锈蚀裂纹，不合格即弃。',
      misjudgment: '认为煮沸消毒后针具可长期存放复用。煮沸仅灭活一般病原，干燥不彻底易生锈，弯折锈蚀针入皮即折针，须干燥密闭保存并定期检查针身。',
      reasoning: '同是 40mm 长针，为何面部与臀部选针粗细不同？',
      feedback: '面部皮薄肉浅宜细针（0.22-0.25mm）减痛，臀部肌肉丰厚宜粗针（0.30-0.35mm）强刺激，粗细选择随部位与刺激量而定。',
      transfer: '传染病患者用过的毫针应如何处理？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 血肿与气胸预防（010）
  // ============================================================
  {
    id: 'pb41-f-010', title: '针刺意外·血肿气胸预防', category: 'theory', difficulty: 4, difficultyLabel: '综合推理',
    riskTags: ['针刺意外', '血肿', '气胸', '出针按压', '胸背禁深刺'],
    intent: '掌握针刺血肿与气胸的成因、识别、处理原则与预防关键。',
    facts: [
      { field: 'method.hematoma', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.pneumothorax', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.emergency', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.prevention', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '出针即用消毒干棉球按压针孔 1-2 分钟；血肿 24 小时内冷敷、之后热敷；气胸立即起针、半卧位、给氧并送医', caution: '胸背胁肋禁直刺深刺，进针时嘱患者勿深呼吸咳嗽' },
    cases: null,
    stdJudgment: '针刺血肿因刺破小血管，先冷敷后热敷可散；气胸因刺伤肺脏，见胸痛气促唇绀须立即起针、半卧、给氧、送医，胸背浅刺为预防关键。',
    coreDefinition: '血肿为针刺伤血管致皮下瘀血，气胸为刺伤胸膜肺脏之危症；预防重在出针按压与胸背禁深刺，处理分轻重缓急。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺/艾灸。针刺出现胸闷气促须立即起针并按气胸处理，重者送急诊；出针按压为常规。', prohibitions: ['胸背胁肋禁直刺深刺（防气胸）', '大血管浅表处（如人迎、冲阳）禁深刺', '乳中、神阙禁针（神阙可隔盐灸）'] },
    learning: {
      knowledge: '血肿：多因刺伤皮下小血管或出针未按压，见局部肿胀疼痛青紫；轻者 24 小时内冷敷止血、之后热敷促进吸收，重者加压包扎或外科处理。预防：出针即用消毒干棉球按压针孔 1-2 分钟，面部血管丰富处更须按压。气胸：针刺胸背部过深刺伤肺脏，见突发胸痛、气促、咳嗽、唇绀、脉细数，叩诊鼓音、听诊呼吸音减弱；处理：立即起针，患者半卧位安静休息，给氧，密切观察，重者胸腔穿刺排气并送急诊。预防：胸背部、胁肋部一律斜刺浅刺（0.5-1 寸以内），锁骨上窝禁深刺，进针时嘱患者勿深呼吸咳嗽。',
      misjudgment: '血肿初起即热敷。热敷扩张血管反使出血加重，血肿 24 小时内当冷敷止血，24 小时后再热敷化瘀。',
      reasoning: '气胸为何常在针刺后数分钟至数小时才被发现，如何早期识别？',
      feedback: '肺损伤早期症状轻微、渐次加重，故针刺胸背后须观察有无迟发胸痛气促；凡针刺后胸闷憋气、呼吸音减弱即应高度警惕气胸。',
      transfer: '若患者在背部针刺后突感胸痛憋气，第一步应做什么？',
    },
  },
];
