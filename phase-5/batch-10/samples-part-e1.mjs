// ============================================================
// 杏林大典 · Phase 5 · Batch-10 · 样本 Part E1（针灸治疗学 15 节点）
// ID 区间 pb10-e-001 ~ pb10-e-015，category 一律 'clinical'
// 主题：针灸治疗原则（001-004）/ 选穴原则（005-006）/
//       配穴方法（007-008）/ 特定穴应用（009-011）/
//       头面五官科病证（012-015：头痛·面瘫·牙痛·咽喉肿痛）
// 难度分布：基础5（001/002/004/005/007）/ 中等4（003/006/012/013）/
//           困难3（008/009/011）/ 易混综合3（010/014/015）
// 依据：authoring-spec 第 8 节 E 针灸治疗学创作规范；
//       facts 取 3 种规划教材源 + 经典原句（《灵枢》《素问》《难经》）；
//       classics label 用整书名，灵枢/素问具体篇目统一标「《黄帝内经》」命中
//       classic-patch 的《黄帝内经》族；
//       取穴涉及合谷/关元等禁针穴时 prohibitions 写「孕妇禁针」红线，
//       safety.note 一律含「仅作知识学习，禁止无资质自行针刺」声明。
// ============================================================

export const SAMPLES_PART_E1 = [
  // ============================================================
  // E 针灸治疗学 · 治疗原则（001-004）
  // ============================================================
  {
    id: 'pb10-e-001', title: '针灸治疗原则·补虚泻实', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['针灸治疗原则', '提插捻转补泻', '合谷·孕妇禁针'],
    intent: '掌握虚则补之、实则泻之、宛陈则除之三大补泻原则及提插捻转补泻的操作方向',
    facts: [
      { field: 'clinical.zhize', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.zhize', sourceType: 'classic_original', sourceTitle: '《灵枢》', status: 'verified' },
      { field: 'clinical.buxiefa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'clinical.wanchen', sourceType: 'classic_original', sourceTitle: '《灵枢》', status: 'verified' },
      { field: 'clinical.yingyong', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《黄帝内经》', canon: '灵枢', chapter: '经脉', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified', originalText: '盛则泻之，虚则补之，热则疾之，寒则留之，陷下则灸之，不盛不虚，以经取之' },
      { label: '《黄帝内经》', canon: '灵枢', chapter: '九针十二原', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified', originalText: '凡用针者，虚则实之，满则泄之，宛陈则除之，邪胜则虚之' },
    ],
    dosage: { guideline: '补法重插轻提、拇指向前捻转为主，刺激量轻；泻法重提轻插、拇指向后捻转为主，刺激量重；宛陈刺络取委中（足太阳膀胱经）出血', caution: '提插捻转补泻须在针下得气的基础上操作，刺激量依体质耐受而定；合谷、关元孕妇禁针' },
    cases: null,
    stdJudgment: '虚证用补法扶正、实证用泻法祛邪，络脉瘀阻之宛陈则刺络出血以除之，补泻方向全在提插轻重与捻转顺逆',
    coreDefinition: '虚则补之、实则泻之、宛陈则除之，为针灸补虚泻实、祛瘀除滞的总原则',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。补泻手法须得气后操作，刺激量因人、因病位而异，不可盲目追求强刺激。', prohibitions: ['合谷：孕妇禁针，有堕胎风险', '关元：膀胱充盈时禁深刺；孕妇禁针'] },
    learning: {
      knowledge: '虚证取足三里（足阳明胃经）、关元（任脉）施提插捻转补法以扶正；实证取合谷（手阳明大肠经）、太冲（足厥阴肝经）施泻法以祛邪；瘀血宛陈取委中刺络放血。补法重插轻提、捻转左转，泻法重提轻插、捻转右转。',
      misjudgment: '把「实则泻之」理解成凡实必重泻，忽略正虚邪实之体——纯泻伤正，须补泻兼施或先补后泻，视脉证虚实而定。',
      reasoning: '同为合谷一穴，虚证与实证在提插捻转操作上如何区别？',
      feedback: '补法重插轻提、拇指向前捻转为主，泻法重提轻插、拇指向后捻转为主，同一腧穴因手法差异而补泻异向。',
      transfer: '若患者气滞血瘀兼体虚，补泻手法应如何配合使用？',
    },
  },
  {
    id: 'pb10-e-002', title: '针灸治疗原则·清热温寒', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['针灸治疗原则', '热则疾之', '陷下则灸之'],
    intent: '掌握热则疾之、寒则留之、陷下则灸之的刺灸法度及临床应用',
    facts: [
      { field: 'clinical.zhize', sourceType: 'classic_original', sourceTitle: '《灵枢》', status: 'verified' },
      { field: 'clinical.qingre', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.wenhan', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.jiufa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《黄帝内经》', canon: '灵枢', chapter: '经脉', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified', originalText: '热则疾之，寒则留之，陷下则灸之' },
    ],
    dosage: { guideline: '热证毫针浅刺疾出、不留针；寒证深刺久留针，可配温针灸或艾灸；陷下证以艾灸为主', caution: '灸法防烫伤，颜面、五官、大血管浅表处及孕妇腹部慎灸' },
    cases: null,
    stdJudgment: '热证浅刺疾出以泄热，寒证久留针或加灸以温散，阳气下陷者用灸以升提',
    coreDefinition: '热则疾之、寒则留之、陷下则灸之，是针灸针对热证、寒证、虚陷证的不同刺灸法度',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。灸法操作须防烫伤，阴虚火旺者慎灸。', prohibitions: [] },
    learning: {
      knowledge: '热证浅刺疾出不留针，高热取大椎（督脉）、曲池（手阳明大肠经）毫针泻法；寒证深刺久留针并加灸，胃脘冷痛取中脘（任脉）、足三里（足阳明胃经）温针灸；阳气下陷之脱肛、久泻，灸百会（督脉）升提固脱。',
      misjudgment: '把「热则疾之」等同于发热即放血——疾之指浅刺速出，宜于热在卫表气分；里热炽盛仍须深刺泻法或刺络，一概放血反耗正气。',
      reasoning: '寒证为何要久留针而热证却要浅刺疾出？',
      feedback: '寒邪凝滞须留针候气、以针温散，配灸助阳散寒；热邪浮越于表，浅刺疾出使邪随针泄，久留反助热势。',
      transfer: '若患者脱肛属中气下陷，为何首选灸法而非针刺？',
    },
  },
  {
    id: 'pb10-e-003', title: '针灸治疗原则·标本缓急', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['针灸治疗原则', '治病求本', '急则治标'],
    intent: '掌握治病求本、急则治标、缓则治本、标本同治的先后主次',
    facts: [
      { field: 'clinical.biaoben', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.zhiben', sourceType: 'classic_original', sourceTitle: '《素问》', status: 'verified' },
      { field: 'clinical.zhiji', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.yingyong', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《黄帝内经》', canon: '素问', chapter: '阴阳应象大论', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified', originalText: '治病必求于本' },
    ],
    dosage: { guideline: '标急者先治标，毫针泻法急止其症；标缓者专治本，补法缓图；标本俱急者标本同治', caution: '急则治标须以不伤正为度，标症缓解后即转治本' },
    cases: null,
    stdJudgment: '治病求本是根本大法，标急先治标、标缓专治本、标本俱急则同治，先后主次决定处方',
    coreDefinition: '标本缓急指针灸立法须分清病本与标症，急则治标、缓则治本、标本同治',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。', prohibitions: [] },
    learning: {
      knowledge: '头痛因肝阳上亢者，本在肝而标在头，取太冲（足厥阴肝经）、风池（足少阳胆经）平肝潜阳以治本；痛势剧烈者先取太阳（经外奇穴）、阿是穴毫针泻法急止其痛，标缓再调其本。',
      misjudgment: '见头痛便只取局部止痛穴，不辨病本——痛止而病源未除必反复发作，先分标本再定主次才是施治次序。',
      reasoning: '同为胃痛，为何有人先刺足三里缓急、有人却灸中脘治本？',
      feedback: '痛势急迫者先取足三里（足阳明胃经）和胃止痛，属急则治标；病程缠绵隐痛者灸中脘（任脉）、足三里健脾和胃，属缓则治本。',
      transfer: '若患者中风昏迷兼大便秘结，标本先后应如何安排？',
    },
  },
  {
    id: 'pb10-e-004', title: '针灸治疗原则·三因制宜', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['针灸治疗原则', '因时因地因人'],
    intent: '掌握因时、因地、因人制宜在针刺深浅、灸法取舍与刺激量上的体现',
    facts: [
      { field: 'clinical.yinshi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.yindi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.yinren', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '春夏浅刺、秋冬深刺留针；灸量依地域寒温与体质强弱增减', caution: '年老体弱、孕妇及初诊者刺激量宜轻' },
    cases: null,
    stdJudgment: '因时看季节昼夜与气血流注，因地察南北高下与体质倾向，因人审年龄性别强弱，三者合参以定刺灸宜忌',
    coreDefinition: '因时、因地、因人制宜，指针灸施治须结合时令气候、地域环境与个体差异灵活立法',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。', prohibitions: [] },
    learning: {
      knowledge: '春夏腠理开疏，针刺宜浅；秋冬腠理致密，宜深刺留针，冬季哮喘可灸肺俞（足太阳膀胱经）、膏肓俞扶正；北方严寒阳虚者多，可重用灸法；年老体弱者手法宜轻，取足三里（足阳明胃经）补法，青壮年实证可重泻。',
      misjudgment: '把因人制宜只当作年龄之差——性别、体质虚实、职业劳逸同样影响取穴与刺激量，漏看一项即失于周详。',
      reasoning: '同是风寒感冒，为何冬季针刺宜深、夏季宜浅？',
      feedback: '腠理随季节开阖，冬寒腠密深刺留针以达邪，夏热腠疏浅刺疾出以防伤卫，此即因时制宜。',
      transfer: '若患者为孕妇，取穴与刺激量需作哪些调整？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 选穴原则（005-006）
  // ============================================================
  {
    id: 'pb10-e-005', title: '选穴原则·近部取穴与远部取穴', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['选穴原则', '腧穴所在主治所在', '合谷·孕妇禁针'],
    intent: '掌握腧穴所在主治所在与经脉所过主治所及两大选穴法则',
    facts: [
      { field: 'clinical.jinbu', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.yuanbu', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.jingmai', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'clinical.yingyong', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '近部穴多浅刺或平刺，远部穴按病性施补泻，远近相配', caution: '睛明等目周穴禁深刺、禁提插捻转' },
    cases: null,
    stdJudgment: '病在局部取局部腧穴以疏调患部气血，病在脏腑或循经远达者取四肢远端穴，经脉所过主治所及为据',
    coreDefinition: '近部取穴即腧穴所在主治所在，远部取穴即经脉所过主治所及，为针灸选穴两大基本法则',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。睛明等目周穴禁深刺，操作须极谨慎。', prohibitions: ['合谷：孕妇禁针，有堕胎风险'] },
    learning: {
      knowledge: '近部取穴如眼病取睛明、攒竹（足太阳膀胱经），鼻病取迎香（手阳明大肠经），体现腧穴所在主治所在；远部取穴如胃痛取足三里（足阳明胃经）、面口病取合谷（手阳明大肠经），体现经脉所过主治所及，远近常配合使用。',
      misjudgment: '以为远部取穴只限于本经之穴——表里经、同名经及特定穴皆可远取，重在经脉联系，拘泥本经反失灵活。',
      reasoning: '牙痛为何常取远端的合谷而不只取口周局部穴？',
      feedback: '合谷为手阳明大肠经原穴，该经入下齿中，远部取穴以经脉所过主治所及为据，配颊车（足阳明胃经）远近相济。',
      transfer: '若患者腰痛在督脉正中一线，远部取穴应选何穴？',
    },
  },
  {
    id: 'pb10-e-006', title: '选穴原则·辨证取穴与对症取穴', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['选穴原则', '辨证取穴', '对症取穴'],
    intent: '掌握辨证取穴与对症取穴的分野及配合，如痰热取丰隆、发热取大椎曲池',
    facts: [
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.duizheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.shuxue', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'clinical.yingyong', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '辨证穴按证候虚实施补泻，对症穴多用泻法或平补平泻', caution: '刺络退热须体质壮实者方可，体虚发热不宜放血' },
    cases: null,
    stdJudgment: '辨证取穴针对病机立法，对症取穴针对症状选用经验穴，二者相须为用、纲举目张',
    coreDefinition: '辨证取穴以证候病机为纲选穴，对症取穴以症状体征为目选穴',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。', prohibitions: [] },
    learning: {
      knowledge: '辨证取穴如痰热壅肺之咳喘痰黄，取丰隆（足阳明胃经络穴）化痰、尺泽（手太阴肺经合穴）清肺；对症取穴如发热取大椎（督脉）、曲池（手阳明大肠经）退热，失眠取神门（手少阴心经）宁心安神，两者常相配合。',
      misjudgment: '把对症取穴当主法而忽略辨证——头痛一律取太阳、印堂止痛，不辨外感内伤与虚实，疗效短暂而病本难除。',
      reasoning: '同为咳嗽，为何有人取丰隆化痰、有人取太渊补肺？',
      feedback: '丰隆为化痰要穴，痰湿壅肺者宜之；太渊为肺经原穴，肺气虚弱者宜之，证型不同选穴自异。',
      transfer: '若患者高热伴神昏抽搐，对症取穴应选哪些急救穴？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 配穴方法（007-008）
  // ============================================================
  {
    id: 'pb10-e-007', title: '配穴方法·本经配穴与表里经配穴', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['配穴方法', '本经配穴', '表里经配穴'],
    intent: '掌握本经配穴与表里经配穴的取穴思路与脏腑表里理论依据',
    facts: [
      { field: 'clinical.benjing', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.biaoli', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.yinyang', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'clinical.yingyong', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '本经配穴远近同调，表里经配穴两经并施，毫针按证候补泻', caution: '表里配穴亦须辨虚实主次，不可两经平调而无侧重' },
    cases: null,
    stdJudgment: '本经配穴取病经远近腧穴同调，表里经配穴取相表里两经腧穴并施，以脏腑经脉表里相通为据',
    coreDefinition: '本经配穴按病变经脉自取远近穴，表里经配穴以阴阳表里经相配，共奏调经和脏之效',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。', prohibitions: [] },
    learning: {
      knowledge: '本经配穴如肺病咳嗽取中府、尺泽、太渊（手太阴肺经）远近同用；表里经配穴如胃病取足三里（足阳明胃经）配公孙（足太阴脾经络穴），脾胃表里相济；胆病取阳陵泉（足少阳胆经）配太冲（足厥阴肝经）疏泄肝胆。',
      misjudgment: '误以为表里经配穴只用于脏病——腑病与经脉病同样适用，凡脏腑表里相关皆可相配，胃病配脾经穴即其例。',
      reasoning: '胃痛时为何足三里与公孙相配优于足三里单用？',
      feedback: '足三里为胃经合穴、公孙为脾经络穴，表里经相配使脾胃同调、经气相接，协同之力胜于单穴。',
      transfer: '若患者心悸属心经病，本经配穴与表里经配穴各举一例。',
    },
  },
  {
    id: 'pb10-e-008', title: '配穴方法·前后配穴与上下配穴', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['配穴方法', '俞募配穴', '八脉交会穴'],
    intent: '掌握俞募配穴与八脉交会穴上下相应的取穴规律',
    facts: [
      { field: 'clinical.qianhou', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.shangxia', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.yumu', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bamai', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '俞募穴毫针补泻随脏腑虚实，八脉交会穴上下两穴同取、先刺一穴得气再刺对穴', caution: '胸腹募穴不宜深刺，背部俞穴斜刺防伤内脏' },
    cases: null,
    stdJudgment: '前后配穴以胸腹募穴配腰背俞穴调脏腑之气，上下配穴取四肢上下相应穴通调经气，属远近配合之变法',
    coreDefinition: '前后配穴即俞募配穴，上下配穴多取八脉交会穴，均属远近配穴之变法',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。背部俞穴须斜刺，胸腹穴不可深刺。', prohibitions: [] },
    learning: {
      knowledge: '俞募配穴如胃病取中脘（任脉、胃之募）配胃俞（足太阳膀胱经），肺病取中府（手太阴肺经、肺之募）配肺俞；上下配穴如内关（手厥阴心包经）配公孙（足太阴脾经）治胃心胸病，后溪（手太阳小肠经）配申脉（足太阳膀胱经）治头项腰背病。',
      misjudgment: '把俞募配穴理解为前后各取一穴即可——俞募须同属一脏一腑、腹背相对相应，张冠李戴则经气不接、调脏无功。',
      reasoning: '同为胃病，何时用俞募配穴、何时用上下配穴？',
      feedback: '脏腑虚损明显者以俞募配穴调补本脏本腑，气机逆乱、痛在心胸者以八脉交会穴上下相配，内关公孙通调胃心胸气。',
      transfer: '若患者心痛彻背，八脉交会穴上下相应当取哪一对？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 特定穴应用（009-011）
  // ============================================================
  {
    id: 'pb10-e-009', title: '特定穴应用·五输穴与补母泻子法', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['特定穴', '五输穴', '补母泻子'],
    intent: '掌握五输穴井荥输经合的五行属性与补母泻子取穴法',
    facts: [
      { field: 'clinical.wushu', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bumu', sourceType: 'classic_original', sourceTitle: '《难经》', status: 'verified' },
      { field: 'clinical.yingyong', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxi', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《难经》', canon: '难经', chapter: '六十九难', sourceTitle: '《难经》', sourceType: 'classic_original', status: 'verified', originalText: '虚者补其母，实者泻其子' },
      { label: '《黄帝内经》', canon: '灵枢', chapter: '九针十二原', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified', originalText: '所出为井，所溜为荥，所注为输，所行为经，所入为合' },
    ],
    dosage: { guideline: '补母穴用补法、泻子穴用泻法，毫针得气后按补泻手法操作', caution: '取穴前须先定本经五行属性，五行推错则母子颠倒' },
    cases: null,
    stdJudgment: '五输穴以井荥输经合配五行，虚证补其母经母穴、实证泻其子经子穴，母子法依生我我生而定',
    coreDefinition: '五输穴为十二经脉肘膝以下的井荥输经合五穴，补母泻子法按五行生克关系取穴施补泻',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。', prohibitions: [] },
    learning: {
      knowledge: '五输穴分布在肘膝以下：井（木）、荥（火）、输（土）、经（金）、合（水）。肺属金，虚证补母穴太渊（手太阴肺经输土穴），实证泻子穴尺泽（合水穴）；肝属木，虚证补曲泉（足厥阴肝经合水穴），实证泻行间（荥火穴）。',
      misjudgment: '补母泻子只记「虚补母、实泻子」却忘先定本经五行——五行属错则母子全乱，如把肺金母穴错取成他经土穴。',
      reasoning: '肺经实证为何泻尺泽而不泻太渊？',
      feedback: '肺属金、金生水，尺泽为肺经合水穴即子穴，实则泻其子；太渊为输土穴即母穴，虚则补之，补泻正相反。',
      transfer: '若肾经虚证（肾属水），补母泻子法当取何穴？',
    },
  },
  {
    id: 'pb10-e-010', title: '特定穴应用·原穴络穴与俞募穴', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['特定穴', '原络配穴', '俞募配穴', '合谷·孕妇禁针'],
    intent: '辨析原络配穴与俞募配穴的取穴部位、配穴关系与主治侧重',
    facts: [
      { field: 'clinical.yuanxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.luoxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.yuanluo', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.yumu', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '原络配穴主客同取，主经原穴配客经络穴；俞募配穴背俞斜刺、募穴浅刺', caution: '背俞穴针刺方向斜向脊柱，胸腹募穴不可深刺' },
    cases: null,
    stdJudgment: '原穴为脏腑原气留止、络穴为表里两经联络之枢，原络配穴主客相应，俞募配穴阴阳腹背相济',
    coreDefinition: '原穴调本脏本腑、络穴通表里两经，原络配穴主客相配；俞募配穴以背俞穴配胸腹募穴调脏腑',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。背部俞穴须斜刺防伤内脏。', prohibitions: ['合谷：孕妇禁针，有堕胎风险'] },
    learning: {
      knowledge: '原络配穴如肺经病取本经原穴太渊为主，配大肠经络穴偏历为客；大肠经病则反取合谷为主、列缺为客。俞募配穴如胃病取胃俞（足太阳膀胱经）配中脘（任脉、胃之募），肾病取肾俞配京门（足少阳胆经、肾之募）。',
      misjudgment: '原络配穴与俞募配穴常被混谈——原络主客配在表里经之间、穴在四肢腕踝部，俞募配在胸腹腰背、以脏腑为核心，方向全然不同。',
      reasoning: '肺经有病为何配大肠经络穴偏历而非肺经他穴？',
      feedback: '络穴为表里两经联络之枢纽，肺与大肠相表里，取偏历使表里经气相接，主客相应、一原一络共调两经。',
      transfer: '若患者便秘属大肠腑病，俞募配穴当取哪两穴？',
    },
  },
  {
    id: 'pb10-e-011', title: '特定穴应用·八会穴与八脉交会穴', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['特定穴', '八会穴', '八脉交会穴'],
    intent: '掌握八会穴各会精气类别与八脉交会穴四对上下相应之配',
    facts: [
      { field: 'clinical.bahui', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bamai', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bahui', sourceType: 'classic_original', sourceTitle: '《难经》', status: 'verified' },
      { field: 'clinical.yingyong', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《难经》', canon: '难经', chapter: '四十五难', sourceTitle: '《难经》', sourceType: 'classic_original', status: 'verified', originalText: '腑会太仓，脏会季胁，筋会阳陵泉，髓会绝骨，血会膈俞，骨会大杼，脉会太渊，气会三焦外一筋直两乳内也' },
    ],
    dosage: { guideline: '八会穴按所会精气施补泻，八脉交会穴上下两穴相配同取', caution: '膈俞、大杼等背部穴斜刺，胸腹穴禁深刺' },
    cases: null,
    stdJudgment: '八会穴各会脏、腑、气、血、筋、骨、髓、脉之精气，八脉交会穴通奇经八脉而上下相应，各有所主',
    coreDefinition: '八会穴为八类精气聚会之穴，八脉交会穴为十二正经与奇经八脉相通的八个腧穴',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。膈俞、大杼等背部穴须斜刺。', prohibitions: [] },
    learning: {
      knowledge: '脏会章门、腑会中脘、气会膻中（任脉）、血会膈俞、筋会阳陵泉（足少阳胆经）、骨会大杼、髓会绝骨、脉会太渊（手太阴肺经）；八脉交会穴：公孙配内关治胃心胸，后溪配申脉治头项腰背，足临泣配外关治目锐眦耳后，列缺配照海治肺系咽喉胸膈。',
      misjudgment: '八会穴与八脉交会穴名近实异——八会按精气类别分属八穴，八脉交会按奇经相通配对，口诀混记则取穴张冠李戴。',
      reasoning: '为何筋病取阳陵泉而骨病取大杼，二者归经有何不同？',
      feedback: '阳陵泉为足少阳胆经合穴，筋会于此，筋脉拘挛宜之；大杼为足太阳膀胱经穴，骨会于此，骨节酸楚宜之，各依所会。',
      transfer: '若患者眩晕属髓海不足，当取八会穴中何穴？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 头面五官科病证（012-015）
  // ============================================================
  {
    id: 'pb10-e-012', title: '头痛·分经论治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['头痛', '分经论治', '合谷·孕妇禁针'],
    intent: '掌握头痛按阳明、少阳、太阳、厥阴分经论治的取穴规律',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '主穴毫针平补平泻，按经配穴随证补泻；顽固性头痛可加电针', caution: '合谷孕妇禁针；头痛剧烈伴呕吐、神志改变者须排除颅脑病变' },
    cases: null,
    stdJudgment: '头痛以分经论治为纲，前额属阳明、两侧属少阳、后项属太阳、巅顶属厥阴，主穴基础上按经加配',
    coreDefinition: '头痛按疼痛部位归属阳明、少阳、太阳、厥阴四经，循经远近配穴论治',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。头痛若伴喷射性呕吐、神志异常，须先就医排除器质病变。', prohibitions: ['合谷：孕妇禁针，有堕胎风险'] },
    learning: {
      knowledge: '头痛主穴百会（督脉）、太阳（经外奇穴）、风池（足少阳胆经）、合谷（手阳明大肠经），毫针平补平泻。分经配穴：阳明前额配印堂、头维、内庭；少阳偏头配率谷、外关、足临泣；太阳后项配天柱、后溪、昆仑；厥阴巅顶配四神聪、太冲、行间。',
      misjudgment: '见头痛即取百会太阳风池了事，不辨部位归经——前额与巅顶配穴迥异，不分经则主穴之外无从加减、疗效打折。',
      reasoning: '同是头痛，为何偏头痛要配外关、足临泣这对八脉交会穴？',
      feedback: '外关（手少阳三焦经）通阳维脉、足临泣（足少阳胆经）通带脉，上下相应，专疏少阳经气不利之偏头痛。',
      transfer: '若患者巅顶痛伴干呕吐涎沫，配穴当加哪些肝经穴？',
    },
  },
  {
    id: 'pb10-e-013', title: '面瘫·风寒袭络', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['面瘫', '风寒袭络', '分期刺灸', '合谷·孕妇禁针'],
    intent: '掌握面瘫风寒袭络证的主穴处方与急性期、恢复期分期刺灸法',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '急性期面部穴浅刺轻刺激、短留针；恢复期面部穴平刺透刺，可加艾条温和灸或温针灸；风寒重者风池、翳风可配拔罐', caution: '合谷孕妇禁针；面部血管丰富，出针后按压防血肿' },
    cases: null,
    stdJudgment: '面瘫取阳明少阳经面部穴为主，风寒袭络者初期浅刺轻刺激、恢复期加灸，远近配穴贯穿始终',
    coreDefinition: '面瘫以口眼歪斜为主症，风寒袭络者治以祛风散寒、通经活络，局部穴配远端合谷太冲',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。面部穴操作须轻柔，出针按压防血肿。', prohibitions: ['合谷：孕妇禁针，有堕胎风险'] },
    learning: {
      knowledge: '面瘫主穴地仓、颊车（足阳明胃经）互相透刺，攒竹、阳白（足太阳膀胱经）平刺，合谷（手阳明大肠经）、太冲（足厥阴肝经）远近相配。风寒袭络加风池（足少阳胆经）、翳风祛风散寒；急性期毫针浅刺轻刺激，恢复期面部穴加艾条温和灸或温针灸。',
      misjudgment: '急性期对面部穴施强刺激或电针重泻——邪在浅表经络，强刺激反致面肌痉挛、恢复变慢，宜浅刺轻刺激。',
      reasoning: '面瘫初期为何面部穴宜轻浅刺激而合谷太冲不可省略？',
      feedback: '初期邪浅，面部浅刺意在疏调局部经气；合谷太冲为四关穴，通行气血、祛风通络，远近配合且不伤面部。',
      transfer: '若患者面瘫日久、面肌萎缩无力，刺灸法应作何调整？',
    },
  },
  {
    id: 'pb10-e-014', title: '牙痛·胃火与肾虚', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['牙痛', '胃火', '肾虚', '合谷·孕妇禁针'],
    intent: '辨析牙痛胃火实证与肾虚虚证的取穴与补泻差异',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '主穴合谷、颊车毫针泻法；胃火配内庭泻法，肾虚配太溪补法、行间泻法', caution: '合谷孕妇禁针；牙痛剧烈伴颊部红肿高热者须排除牙髓及颌面感染' },
    cases: null,
    stdJudgment: '牙痛分虚实，胃火牙痛属实取合谷颊车内庭泻之，肾虚牙痛属虚取太溪行间补泻兼施',
    coreDefinition: '牙痛以手阳明、足阳明经穴为主，胃火者清泻阳明，肾虚者滋阴降火',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。', prohibitions: ['合谷：孕妇禁针，有堕胎风险'] },
    learning: {
      knowledge: '牙痛主穴合谷（手阳明大肠经）、颊车（足阳明胃经），毫针泻法。胃火牙痛痛势剧烈、齿龈红肿，配内庭（足阳明胃经荥穴）清泻胃火；肾虚牙痛隐隐作痛、牙齿松动，配太溪（足少阴肾经原穴）补益肾阴、行间（足厥阴肝经荥穴）清泻虚火。',
      misjudgment: '把肾虚牙痛也当胃火泻之——肾虚者龈不红肿、痛势绵绵、齿根松动，再以泻法伤正，须太溪补、行间泻分施。',
      reasoning: '同为牙痛，为何胃火取内庭而肾虚却取太溪行间？',
      feedback: '内庭为胃经荥穴，荥主身热，清阳明实火；太溪为肾经原穴，补其不足，行间清泻虚火，一补一泻、虚实分治。',
      transfer: '若患者上牙痛属胃火兼便秘，配穴当如何调整？',
    },
  },
  {
    id: 'pb10-e-015', title: '咽喉肿痛·实热与虚热', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['咽喉肿痛', '实热虚热', '点刺出血', '合谷·孕妇禁针'],
    intent: '综合推理：据红肿、痛势、咽干与舌脉辨咽喉肿痛虚实，分施刺血与滋阴',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '实热取少商、商阳点刺出血，配尺泽、合谷泻法；虚热取照海、列缺，补法为主，可配太溪', caution: '合谷孕妇禁针；点刺出血须严格消毒，出针按压止血' },
    cases: null,
    stdJudgment: '咽喉肿痛实证刺少商商阳点刺出血以泻热，虚证补照海滋阴降火，尺泽合谷随虚实加减',
    coreDefinition: '咽喉肿痛分实热与虚热，实热泻肺胃之热，虚热滋阴降火，刺灸法随虚实而异',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。点刺出血须严格消毒，体质虚弱者忌放血。', prohibitions: ['合谷：孕妇禁针，有堕胎风险'] },
    learning: {
      knowledge: '咽喉肿痛实热证取少商（手太阴肺经井穴）、商阳（手阳明大肠经井穴）点刺出血，配尺泽（手太阴肺经合穴）、合谷（手阳明大肠经）泻法清泻肺胃实热；虚热证取照海（足少阴肾经）补法、列缺利咽，配太溪滋阴降火，干痛甚者加廉泉（任脉）。',
      misjudgment: '虚热咽痛也点刺少商出血——虚火当滋阴润燥，刺血更泄阴液反伤正气，须辨红肿、痛势与咽干程度再定补泻。',
      reasoning: '为何实热咽痛选井穴点刺出血，而虚热却取照海补法？',
      feedback: '少商商阳为井穴，点刺出血清泻肺热、消肿利咽，属实者泻之；照海通阴跷脉、滋阴利咽，虚火得水而制，属虚者补之。',
      transfer: '若患者咽痛伴发热恶寒、咳嗽，辨证当属何型，配穴如何调整？',
    },
  },
];
