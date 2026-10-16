// ============================================================
// 杏林大典 · Phase 5 · Batch-42 · 样本 Part AD（AD 伦理·法律 8 节点 pb42-ad-001 ~ pb42-ad-008）
// 学科：AD 伦理·法律；覆盖：医学伦理（001-003）/ 卫生法规（004-008）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'theory'；title 一律「伦理·」或「法规·」前缀
// facts sourceTitle 限定：《医学伦理学》规划教材 / 《卫生法规》规划教材
// classics 一律留空数组（现代学科，无已收录经典条文可逐字核对的引用）
// dosage 一律 null（法规伦理学科不涉及剂量）
// safety.note：「法规与伦理知识学习，不构成法律意见或诊疗建议；临床操作须遵医嘱」
// prohibitions 首条统一含「不构成法律意见与诊疗指导」
// 难度分布：简单 3（difficulty 1）/ 中等 3（difficulty 2）/ 困难 1（difficulty 3）/ 易混综合 1（易混淆 1）
// ============================================================

export const PART_AD = [
  // ============================================================
  // AD 伦理·法律 · 医学伦理（001–003）
  // ============================================================
  {
    id: 'pb42-ad-001', title: '伦理·中医药文化自信与医德传承', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['医德传承', '大医精诚', '仁心仁术', '文化自信', '职业道德'],
    intent: '掌握中医药文化自信对医德建设的意义与历代医家医德精神的传承脉络。',
    facts: [
      { field: 'theory.中医药文化自信内涵', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
      { field: 'theory.大医精诚医德精神', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
      { field: 'theory.仁心仁术理念', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
      { field: 'theory.历代医家医德风范', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
      { field: 'theory.医德传承与现代规范衔接', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '中医药文化自信是对中医药理论体系、诊疗方法与文化价值的自觉认同，是医德建设的精神根基。孙思邈「大医精诚」确立医术精湛与医德高尚并重的范式，历代医家以仁心仁术、悬壶济世相承。继承这份精神遗产，临床者方能自觉把人文关怀融入辨证施治，使传统医德在当代诊疗秩序中落地。',
    coreDefinition: '中医药文化自信指对中医药学价值与生命观、诊疗智慧的高度认同，其核心医德精神为「大医精诚」与「仁心仁术」的世代传承。',
    safety: { note: '法规与伦理知识学习，不构成法律意见或诊疗建议；临床操作须遵医嘱', prohibitions: ['不构成法律意见与诊疗指导', '不得借传统文化之名宣传未经验证的疗法'] },
    learning: {
      knowledge: '核心概念：文化自信——对中医药理论体系、辨证思维与疗效价值的自觉肯定；大医精诚——医术「精」与品格「诚」并重，源出《备急千金要方》。实践要点：把「仁心」落实为问诊耐心与处方审慎。注意：传承不等于固守，现代伦理规范同样约束实践。',
      misjudgment: '以为弘扬中医药文化自信就是全盘肯定传统做法、排斥现代规范。错：自信与科学审慎不矛盾，疗效要证据支撑，违反伦理的做法并不因「传统」获得豁免。',
      reasoning: '「大医精诚」的「精」与「诚」被并置强调，为什么缺一不可？',
      feedback: '「精」关乎技术底线，「诚」关乎品格底线，二者缺一，医德根基即动摇。',
      transfer: '面对网络上夸大疗效的「祖传秘方」宣传，如何用医德传承的眼光看待？',
    },
  },
  {
    id: 'pb42-ad-002', title: '伦理·针灸推拿操作伦理规范', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['针灸伦理', '推拿伦理', '知情同意', '隐私保护', '身体接触'],
    intent: '掌握针灸推拿等直接接触性诊疗中的知情同意、隐私保护与身体接触边界等伦理要求。',
    facts: [
      { field: 'theory.针刺治疗知情同意', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
      { field: 'theory.隐私部位操作规范', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
      { field: 'theory.异性诊疗陪伴要求', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
      { field: 'theory.身体接触边界', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
      { field: 'theory.针具安全与无菌伦理', sourceType: 'textbook', sourceTitle: '《医学伦理学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '针灸推拿涉及身体接触与侵入性操作，须先行知情同意，说明选穴部位、手法与预期感受；乳房、会阴等隐私部位取穴或施术，须说明理由并征得同意，异性患者宜有第三人陪同。操作全程尊重患者身体自主权，遮盖非暴露部位，针具一人一用一消毒，防止交叉感染。',
    coreDefinition: '针灸推拿操作伦理指在身体接触性诊疗中恪守知情同意、隐私保护、尊重身体自主权与安全无菌要求的伦理准则。',
    safety: { note: '法规与伦理知识学习，不构成法律意见或诊疗建议；临床操作须遵医嘱', prohibitions: ['不构成法律意见与诊疗指导', '未经知情同意不得在隐私部位施术；针刺操作须由具备资质者执行'] },
    learning: {
      knowledge: '核心概念：知情同意——操作前讲清部位、手法与风险；身体自主权——患者有权拒绝不接受的暴露与操作；隐私保护贯穿取穴、留针、推拿全程。实践要点：异性操作安排陪同，暴露最小化，针具一人一用一灭菌。注意：痛感操作提前告知，喊停即停。',
      misjudgment: '认为推拿针灸属传统技术，比手术宽松，不必较真知情同意。错：凡身体接触与针刺均涉及人身权利，同意程序缺失既违伦理也埋下纠纷隐患。',
      reasoning: '患者拒绝在隐私部位针刺而拒绝接受替代穴位方案，医师应当如何处理？',
      feedback: '尊重拒绝是底线，可协商替代穴位或转介，不可强制或诱导继续操作。',
      transfer: '为老年女性患者行肩部推拿时，如何既保证疗效又守好接触边界？',
    },
  },
  {
    id: 'pb42-ad-003', title: '伦理·互联网诊疗伦理边界', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['互联网诊疗', '首诊限制', '电子处方', '隐私数据', '远程医疗'],
    intent: '辨析互联网诊疗与远程医疗、健康咨询的界限，掌握首诊限制与电子处方等伦理法律要求。',
    facts: [
      { field: 'theory.互联网诊疗定义范围', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.首诊限制规则', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.电子处方开具限制', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.患者隐私与数据安全', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.危急重症识别义务', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '互联网诊疗以复诊和慢性病管理为主，不得对首诊患者开展诊疗（国家另有规定的除外）；医师须实名注册且在其执业机构内提供服务。不得在线开具麻醉药品、精神药品等特殊管理药品处方，电子处方流转与审方须合规。平台须保障数据安全，发现危急重症迹象须引导患者线下就医，不得延误救治。',
    coreDefinition: '互联网诊疗伦理边界指线上诊疗须遵守首诊限制、处方限制与数据安全规则，并对危急重症承担识别与导诊义务。',
    safety: { note: '法规与伦理知识学习，不构成法律意见或诊疗建议；临床操作须遵医嘱', prohibitions: ['不构成法律意见与诊疗指导', '不得在线对首诊患者作出诊断或开具特殊管理药品处方'] },
    learning: {
      knowledge: '核心概念：首诊限制——初诊病情未经面诊核实不得线上确诊；远程医疗指机构间会诊协作，与面向患者的互联网诊疗不同。实践要点：结构化问诊单采集，资料不足建议面诊；病历处方留痕加密。注意：胸痛等危重指征须引导线下急诊。',
      misjudgment: '把互联网诊疗与「网上健康咨询」混为一谈，咨询平台给患者「确诊开方」。错：健康咨询不产生诊疗行为，一旦作出诊断或开具处方即属诊疗，须受首诊与处方规则约束。',
      reasoning: '慢性病复诊患者线上开方，如何判断本次咨询算复诊还是首诊？',
      feedback: '以是否建立过完整病历与明确诊断、病情是否稳定为界，资料缺失或病情变化都应转线下评估。',
      transfer: '平台接到「胸闷胸痛」的图文咨询，咨询医师应当如何处置？',
    },
  },
  // ============================================================
  // AD 伦理·法律 · 卫生法规（004–008）
  // ============================================================
  {
    id: 'pb42-ad-004', title: '法规·传染病防治法要点', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['传染病防治', '疫情报告', '甲类管理', '隔离措施', '预防接种'],
    intent: '掌握传染病分类、疫情报告时限与隔离控制等《传染病防治法》核心规定。',
    facts: [
      { field: 'theory.传染病分类标准', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.疫情报告时限', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.预防接种制度', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.隔离治疗与强制措施', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.医疗机构防控义务', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '《传染病防治法》将传染病分甲、乙、丙三类管理：甲类含鼠疫、霍乱，乙类含艾滋病、病毒性肝炎、肺结核及曾按甲类管理的新冠等。发现疫情须依法限时报告：甲类及按甲类管理的于2小时内、其他乙丙类于24小时内。医疗机构承担早发现、早报告、早隔离的防控义务，必要时依法采取隔离与医学观察措施。',
    coreDefinition: '传染病防治法是规范传染病预防、疫情报告、控制与救治的法律，核心在分类管理、限时报告与依法隔离。',
    safety: { note: '法规与伦理知识学习，不构成法律意见或诊疗建议；临床操作须遵医嘱', prohibitions: ['不构成法律意见与诊疗指导', '发现传染病疫情须依法报告，不得隐瞒、谎报、缓报'] },
    learning: {
      knowledge: '核心概念：甲类（鼠疫、霍乱）、乙类（艾滋病、病毒性肝炎、肺结核、新冠等）、丙类（流感等）三级分类；报告时限——甲类及甲管2小时内、其他24小时内。实践要点：首诊发现疑似病例立即填报报告卡并上报，做好隔离消毒。注意：不得因费用或身份拒绝收治。',
      misjudgment: '以为只有确诊才需要报告。错：疑似病例同样属于报告范围，迟报漏报可能延误疫情控制，酿成更大危害。',
      reasoning: '同为乙类传染病，为什么新冠曾按甲类管理而流感按丙类管理？',
      feedback: '管理类别取决于传染性与危害程度，甲类管理意味着更严格的报告、隔离与防控强度。',
      transfer: '门诊发现一例疑似登革热患者，首诊医师的法定动作是什么？',
    },
  },
  {
    id: 'pb42-ad-005', title: '法规·药品管理法要点', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['药品管理', '假药劣药', '上市许可持有人', '不良反应监测', '处方药'],
    intent: '掌握假药劣药的界定、药品上市许可持有人制度与药品不良反应监测等核心规定。',
    facts: [
      { field: 'theory.假药界定标准', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.劣药界定标准', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.上市许可持有人制度', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.不良反应监测报告', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.处方药非处方药分类', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '《药品管理法》以实质不符界定假药劣药：药品所含成分与国家药品标准不符、以非药品冒充药品或以此种药品冒充他种药品的为假药；成分含量不符、变质或污染等为劣药。药品上市许可持有人对药品全生命周期负责，医疗机构须落实不良反应监测报告义务，处方药凭处方调配，不得违规宣传与销售。',
    coreDefinition: '药品管理法规范药品研制、生产、经营与使用全程，核心是假劣药界定、全生命周期责任与不良反应监测。',
    safety: { note: '法规与伦理知识学习，不构成法律意见或诊疗建议；临床操作须遵医嘱', prohibitions: ['不构成法律意见与诊疗指导', '发现药品不良反应须按规定报告，不得隐瞒'] },
    learning: {
      knowledge: '核心概念：假药（成分不符、冒充）与劣药（含量不符、变质）的实质判定；上市许可持有人对药品全生命周期负总责；不良反应监测须落实。实践要点：调配使用前核对批准文号、有效期与外观。注意：处方药不得无处方网售，医疗机构制剂不得上市销售。',
      misjudgment: '以为「疗效不佳」的药品就是劣药。错：劣药以成分、含量、变质等客观质量指标判定，疗效不佳不等于法律上的劣药，二者认定标准不同。',
      reasoning: '一批中药饮片因储存不当霉变，应按假药还是劣药处理？',
      feedback: '霉变属于变质，质量指标不符，按劣药定性，医疗机构应立即停用并按规定处置。',
      transfer: '患者服用某药后出现说明书未列明的不良反应，医生应当完成哪些动作？',
    },
  },
  {
    id: 'pb42-ad-006', title: '法规·医疗纠纷预防与处理', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['医疗纠纷', '医患沟通', '病历封存', '人民调解', '尸检时限'],
    intent: '掌握《医疗纠纷预防和处理条例》的预防机制与法定处理途径。',
    facts: [
      { field: 'theory.纠纷预防机制', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.病历封存与复印', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.尸检时限规定', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.纠纷处理途径', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.大额赔偿协商限制', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '《医疗纠纷预防和处理条例》强调预防为主：落实知情同意、规范病历书写与高风险告知。争议处理循协商、人民调解、行政调解、诉讼路径，索赔数额较大（通常10万元以上）不得自行协商，应申请人民调解或诉讼。患者死亡争议的，医患双方须在法定时限内决定是否尸检，病历与疑似输液输血物品依法封存。',
    coreDefinition: '医疗纠纷预防与处理以预防为主、调解优先，明确病历封存、尸检时限与大额赔偿须循法定途径解决。',
    safety: { note: '法规与伦理知识学习，不构成法律意见或诊疗建议；临床操作须遵医嘱', prohibitions: ['不构成法律意见与诊疗指导', '发生医疗争议不得推诿，病历、实物须依法封存保全'] },
    learning: {
      knowledge: '核心概念：预防三件事——充分知情同意、规范病历记录、高风险操作专项告知；处理四途径——协商、人民调解、行政调解、诉讼。实践要点：疑似输液输血反应立即封存实物与病历；死亡争议48小时内组织尸检。注意：处理阶段不隐瞒不夸大，留痕提交病历复印件。',
      misjudgment: '把「调解」理解为「私了」，索赔10万元以上的纠纷也私下谈赔。错：条例规定大额赔偿不得自行协商，须经人民调解或诉讼，私了协议可能被认定无效。',
      reasoning: '患方拒绝尸检导致死因无法查明，后续责任认定受什么影响？',
      feedback: '死因不明使因果关系难以认定，依法拒绝尸检的一方可能承担不利后果。',
      transfer: '一位术后患者质疑切口感染与院方有关，科室应当如何启动预防与处理程序？',
    },
  },
  {
    id: 'pb42-ad-007', title: '法规·中药饮片与处方调剂法规', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['中药饮片', '处方调剂', '毒性饮片', '十八反', '特殊煎煮'],
    intent: '掌握中药饮片处方审核、调剂复核与毒性饮片管理等法规要求。',
    facts: [
      { field: 'theory.处方审核要点', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.调配复核程序', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.十八反十九畏核对', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.特殊煎煮法标注', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.毒性饮片管理', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '中药饮片调剂须落实处方审核：核对处方书写、用药适宜性与配伍禁忌，十八反十九畏、超剂量、妊娠禁忌须重点把关，疑义处方经处方医师确认或修改后方可调配。需先煎、后下、包煎、烊化的饮片应在处方或包装上明确标注。毒性中药饮片专柜专锁、专人保管、凭处方限量调配，生品与炮制品严格区分。',
    coreDefinition: '中药饮片调剂法规以处方审核、调配复核、特殊煎煮标注与毒性饮片专柜管理为核心内容。',
    safety: { note: '法规与伦理知识学习，不构成法律意见或诊疗建议；临床操作须遵医嘱', prohibitions: ['不构成法律意见与诊疗指导', '毒性中药饮片须凭处方限量调配，不得超量发药'] },
    learning: {
      knowledge: '核心概念：处方审核——查十八反（甘草反甘遂大戟芫花海藻等）、查超剂量、查妊娠禁忌；调配复核——称量准确、先调后核双人把关。实践要点：一人调配一人复核，发药时交代煎煮方法与禁忌。注意：生附子等毒性饮片专柜专账管理。',
      misjudgment: '以为十八反只是「参考建议」，调配时发现反药组合仍照方发药。错：反药同用可能产生毒性反应，属审核必查项，疑义处方必须退回医师确认。',
      reasoning: '处方中附子与半夏同见，药师核对的正确流程是什么？',
      feedback: '属十八反禁忌组合，先停止调配，退回处方医师确认或修改，不得擅自配发。',
      transfer: '处方标注「附子先煎」而发药时未作交代，可能造成什么后果？',
    },
  },
  {
    id: 'pb42-ad-008', title: '法规·执业药师与药品流通管理', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['执业药师', '处方审核', 'GSP', '特殊药品', '在岗执业'],
    intent: '掌握执业药师注册执业制度、处方审核职责与药品流通质量管理规范。',
    facts: [
      { field: 'theory.执业药师资格制度', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.处方审核与用药指导', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.药品经营质量管理规范', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.特殊管理药品流通', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
      { field: 'theory.执业药师在岗要求', sourceType: 'textbook', sourceTitle: '《卫生法规》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '执业药师经考试取得资格并注册后方可执业，承担处方审核、调配指导与用药咨询职责，营业时间须在岗履职，处方审核不得由他人替代。药品经营执行GSP，采购验收、储存养护、销售各环节留痕；麻醉药品、精神药品、医疗用毒性药品按专门办法双人双锁、专账管理。违反规定可能被暂停执业甚至注销注册。',
    coreDefinition: '执业药师与药品流通管理指以资格注册、在岗审核与GSP规范保障药品流通安全有序的制度体系。',
    safety: { note: '法规与伦理知识学习，不构成法律意见或诊疗建议；临床操作须遵医嘱', prohibitions: ['不构成法律意见与诊疗指导', '麻醉药品与精神药品须凭专用处方并按专门规定管理'] },
    learning: {
      knowledge: '核心概念：注册执业——未经注册不得以执业药师身份执业；GSP——采购验收、储存养护、销售全程质量管理，处方药凭处方销售；特殊药品专柜专账、双人双锁。实践要点：执业药师签章后方可发药，营业期间不得离岗。注意：网络售药须守专门规定。',
      misjudgment: '以为执业药师签章只是「走形式」，可先发药后补签。错：处方审核是法定责任环节，先发药后补签使审核形同虚设，违规者要承担行政与执业责任。',
      reasoning: '药店夜班营业时段执业药师不在岗，应当如何满足购药者的紧急需求又不违规？',
      feedback: '可引导购买非处方药或就近就医，处方药销售须待执业药师在岗审方，守规优先于成交。',
      transfer: '一家零售药店发现批号过期的退热药仍在货架，涉及哪些法规责任？',
    },
  },
];
