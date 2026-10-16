// ============================================================
// 杏林大典 · Phase 4 · Batch-2 · 样本 Part 3（领域 13–17，16 节点）
// 完全复用 phase-3a.1/pipeline.mjs（L1–L6 + Gate A–K）+ Q1–Q8
// ============================================================

export const SAMPLES_PART3 = [
  // ============================================================
  // 13 六经辨证
  // ============================================================
  {
    id: 'pb2-cl-13-01', title: '六经辨证总论', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['六经由来', '伤寒体系'],
    intent: '六经辨证体系定位：《伤寒论》对外感热病的六经分证体系',
    facts: [
      { field: 'syndrome.definition', sourceType: 'textbook', sourceTitle: '《伤寒论选读》规划教材', status: 'verified' },
      { field: 'syndrome.history', sourceType: 'textbook', sourceTitle: '《伤寒论选读》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '六经辨证是张仲景《伤寒论》创立的辨证体系，以六经统辖外感热病的证候传变',
    coreDefinition: '太阳、阳明、少阳、太阴、少阴、厥阴的划分与传变',
    safety: {},
    learning: {
      knowledge: '六经辨证源于《伤寒论》，将外感热病按太阳、阳明、少阳（三阳）、太阴、少阴、厥阴（三阴）分证，反映病位深浅、正邪盛衰与传变规律。',
      misjudgment: '把六经当作六种固定疾病。错：六经是辨证框架，同一疾病可循经传变，如感冒可从太阳传阳明。',
      reasoning: '为何外感病初起多在太阳经？六经辨证如何反映病位由表入里？',
      feedback: '太阳主表、为一身之藩篱，外邪侵袭先犯太阳。病位由太阳→阳明→少阳（三阳）再入三阴（太阴→少阴→厥阴），体现由表入里、由阳入阴的传变层次。',
      transfer: '六经辨证与八纲辨证在「表里」维度上有何对应关系？',
    },
  },
  {
    id: 'pb2-cl-13-08', title: '六经传变', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['循经传', '越经传', '直中'],
    intent: '六经传变方式：循经传、越经传、直中、合病并病',
    facts: [
      { field: 'syndrome.definition', sourceType: 'textbook', sourceTitle: '《伤寒论选读》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '六经传变有循经传、越经传、表里传、直中及合病并病等形式',
    coreDefinition: '循经传（按序）、越经传（隔经）、直中（直入三阴）、合病（并见）、并病（先后）',
    safety: {},
    learning: {
      knowledge: '六经传变：循经传（太阳→阳明→少阳→太阴……按序）、越经传（隔经而传）、表里传（太阳→少阴等表里经）、直中（邪气直中三阴）、合病（两经同病）、并病（一经未罢又传一经）。',
      misjudgment: '以为传变必须严格按六经顺序。错：体质、邪气、治疗都可影响传变，越经传、直中常见，辨证须以当下见证为准，不拘泥传经顺序。',
      reasoning: '素体阳虚之人感受寒邪，初起即见四肢厥冷、下利清谷、脉微细，属于何种传变？',
      feedback: '直中三阴（少阴）。素体阳虚，寒邪直入少阴，不经过三阳阶段，此即「直中」，治当回阳救逆。',
      transfer: '太阳与阳明同时发病（既恶寒发热无汗又口渴便结），属合病还是并病？',
    },
  },
  {
    id: 'pb2-cl-13-09', title: '合病与并病', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['合病', '并病', '鉴别'],
    intent: '合病（同时起病）与并病（先后传变）的鉴别',
    facts: [
      { field: 'syndrome.definition', sourceType: 'textbook', sourceTitle: '《伤寒论选读》规划教材', status: 'verified' },
      { field: 'syndrome.distinction', sourceType: 'textbook', sourceTitle: '《伤寒论选读》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '合病是两经同时发病，并病是一经未罢又见一经，治疗须兼顾主次',
    coreDefinition: '合病（同时）、并病（先后）的定义与治则',
    safety: {},
    learning: {
      knowledge: '合病：两经或三经证候同时出现（如太阳阳明合病）。并病：一经证候未解，又出现另一经证候（如太阳与少阳并病）。区别在发病时序。',
      misjudgment: '把合病并病混为一谈。错：合病是同时起病，并病是先后传变，「同时」与「先后」是鉴别关键。',
      reasoning: '患者初患太阳表证（恶寒发热头痛），数日后表证未罢又见胸胁苦满、往来寒热，属合病还是并病？',
      feedback: '并病。表证未罢又传少阳，是先后传变（太阳少阳并病），治须表里兼顾（柴胡桂枝汤之意）。',
      transfer: '太阳阳明合病（下利+表证）为何用葛根汤？治则依据是什么？',
    },
  },

  // ============================================================
  // 14 卫气营血辨证
  // ============================================================
  {
    id: 'pb2-cl-14-02', title: '卫分证', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['温病初起', '邪在肺卫'],
    intent: '卫分证的辨证要点：发热微恶风寒+咽痛口渴，温病初起',
    facts: [
      { field: 'syndrome.definition', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '卫分证是温病初起邪犯肺卫，发热微恶风寒、咽痛口渴、舌尖红',
    coreDefinition: '卫分证主症（发热微恶寒、咽痛、口渴）、与伤寒表证的鉴别',
    safety: {},
    learning: {
      knowledge: '卫分证：发热、微恶风寒、头痛、咽痛、口渴、舌尖红苔薄白或薄黄、脉浮数。为温邪犯卫，病位在肺卫。',
      misjudgment: '把卫分证当风寒表证辛温发汗。错：卫分证是温邪（热象明显：口渴咽痛、舌尖红），治宜辛凉解表（银翘散），辛温助热伤阴。',
      reasoning: '患者发热微恶风寒、咽痛明显、口渴、舌尖红、脉浮数，辨证与治法？',
      feedback: '卫分证（风热犯卫）。发热微恶寒、咽痛口渴、舌尖红为温邪犯卫，治以辛凉解表（银翘散），非辛温所能解。',
      transfer: '卫分证与太阳伤寒（恶寒重发热轻、无汗脉浮紧）如何鉴别？',
    },
  },
  {
    id: 'pb2-cl-14-03', title: '气分证', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['里热炽盛', '白虎汤证'],
    intent: '气分证的辨证要点：壮热不恶寒、口渴汗出、苔黄脉洪大',
    facts: [
      { field: 'syndrome.definition', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '气分证是温邪入里、里热炽盛，壮热不恶寒、口渴汗出、苔黄脉洪',
    coreDefinition: '气分证主症（壮热、大汗、大渴、脉洪大）、与卫分证的区别（恶寒有无）',
    safety: {},
    learning: {
      knowledge: '气分证：壮热、不恶寒反恶热、口渴喜冷饮、汗出、面赤、舌红苔黄、脉洪大。为邪入气分、里热炽盛，治以清气泄热（白虎汤类）。',
      misjudgment: '把气分证误当卫分证用辛凉轻剂。错：卫分有恶寒（表证未罢），气分不恶寒反恶热（表证已罢、里热炽盛），须清气分重剂，轻剂力不能及。',
      reasoning: '患者壮热、大汗、大渴、不恶寒反恶热、脉洪大，属卫气营血何阶段？',
      feedback: '气分证。壮热大汗大渴脉洪为里热炽盛之象，无恶寒说明表证已解。治以清气分热（白虎汤）。',
      transfer: '气分证「四大症」与少阴病口渴如何鉴别？',
    },
  },
  {
    id: 'pb2-cl-14-04', title: '营分证', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['热入营分', '斑疹', '神昏'],
    intent: '营分证的辨证要点：身热夜甚、心烦不寐、斑疹隐隐、舌绛',
    facts: [
      { field: 'syndrome.definition', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '营分证：身热夜甚、心烦不寐、斑疹隐隐、舌质红绛，热入营分伤阴',
    coreDefinition: '营分证主症（夜热、神志、斑疹、舌绛）、与气分证区别（舌绛斑疹）',
    safety: {},
    learning: {
      knowledge: '营分证：身热夜甚、心烦不寐、时有谵语、斑疹隐隐、口干不甚渴饮、舌红绛无苔、脉细数。为热入营分、营阴受损，治以清营透热（清营汤）。',
      misjudgment: '把营分证当气分证清气泄热。错：营分证病位深、伤营阴，见舌绛斑疹，须清营凉血养阴，单纯清气则热深难透。',
      reasoning: '患者身热夜甚、心烦不寐、皮肤斑疹隐隐、舌绛、脉细数，辨证为何？',
      feedback: '营分证。身热夜甚（入夜热甚为营分特点）、斑疹隐隐、舌绛为热入营分之象，治当清营透热养阴。',
      transfer: '营分证「口干不甚渴饮」与气分证「口渴喜冷饮」机理有何不同？',
    },
  },

  // ============================================================
  // 15 三焦辨证
  // ============================================================
  {
    id: 'pb2-cl-15-02', title: '上焦病证', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['温病上焦', '心肺'],
    intent: '上焦病证：温邪犯肺（肺卫/肺热）与热陷心包',
    facts: [
      { field: 'syndrome.definition', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '上焦病证为温病初起，邪犯肺卫或热陷心包，病位在心肺',
    coreDefinition: '上焦病证（肺卫证、肺热证、热陷心包）',
    safety: {},
    learning: {
      knowledge: '上焦病证包括邪犯肺卫（发热微恶寒、咳嗽）、肺热壅盛（身热咳喘）、热陷心包（神昏谵语、舌謇肢厥）。为温病初期，病位在肺与心包。',
      misjudgment: '把上焦病证等同于单纯感冒。错：上焦包括肺卫、肺热与热陷心包三层，热陷心包已是重症（神昏），远非感冒。',
      reasoning: '温病患者初起见发热、咳嗽、微恶风寒，属三焦何部位？',
      feedback: '上焦肺卫。温邪首先犯肺，肺卫失宣则发热咳嗽，病位在上焦。治宜宣肺透邪。',
      transfer: '若病情进展出现神昏谵语、肢厥，病机与病位如何变化？',
    },
  },
  {
    id: 'pb2-cl-15-03', title: '中焦病证', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['脾胃', '气分'],
    intent: '中焦病证：温邪犯脾胃，阳明燥热与太阴湿热',
    facts: [
      { field: 'syndrome.definition', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '中焦病证为温邪传中焦，见阳明燥热（胃）或太阴湿热（脾）',
    coreDefinition: '阳明燥热（大热大渴脉洪）、太阴湿热（身热不扬、脘痞苔腻）',
    safety: {},
    learning: {
      knowledge: '中焦病证：邪入中焦脾胃，阳明燥热（壮热、汗出、口渴、脉洪，治白虎/承气）与太阴湿热（身热不扬、脘痞呕恶、苔黄腻、便溏，治宣化湿热）两种。',
      misjudgment: '把中焦湿热当阳明燥热清热攻下。错：湿热须宣畅气机、化湿清热（三仁汤类），单纯苦寒攻下冰遏湿邪，病反不愈。',
      reasoning: '患者午后身热不扬、脘腹痞闷、呕恶、大便溏、苔黄腻，辨证属中焦何种病机？',
      feedback: '太阴湿热。身热不扬、脘痞呕恶、苔腻为湿重于热困阻中焦，治当宣化湿热（三仁汤类），忌单用苦寒。',
      transfer: '中焦阳明燥热与太阴湿热的鉴别关键症状是什么？',
    },
  },
  {
    id: 'pb2-cl-15-04', title: '下焦病证', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['肝肾', '阴虚动风'],
    intent: '下焦病证：热邪久羁耗伤肝肾之阴，虚风内动',
    facts: [
      { field: 'syndrome.definition', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '下焦病证：热邪久羁耗伤肝肾真阴，见手足蠕动、神倦、舌绛少苔',
    coreDefinition: '下焦病证（肾阴耗损、虚风内动）与血分证的鉴别',
    safety: {},
    learning: {
      knowledge: '下焦病证：热邪久羁耗伤肝肾真阴，症见低热不退、手足蠕动或瘛疭、神倦耳聋、舌绛苔少、脉虚弱。治以滋阴息风（加减复脉汤、大定风珠）。',
      misjudgment: '把虚风内动当肝阳化风平肝潜阳。错：下焦虚风是阴亏动风，须滋阴息风；肝阳化风是阳亢，须平肝潜阳，虚实迥异。',
      reasoning: '温病后期患者低热、手足蠕动、神倦、舌绛少苔、脉虚弱，辨证与治法？',
      feedback: '下焦肝肾阴耗、虚风内动。阴亏不养则蠕动，治以滋阴息风（大定风珠类），非平肝潜阳所宜。',
      transfer: '三焦传变自上而下的规律与临床意义是什么？',
    },
  },

  // ============================================================
  // 16 治则治法
  // ============================================================
  {
    id: 'pb2-th-16-05', title: '因势利导', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['治则', '顺势驱邪'],
    intent: '因势利导：顺应病邪出路（汗吐下）驱邪外出的治则',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '因势利导是顺应病势趋向（表散、上涌、下泻）给邪以出路的治则',
    coreDefinition: '因势利导含义（顺势驱邪）、实例（其在皮者汗而发之、其下者引而竭之）',
    safety: {},
    learning: {
      knowledge: '因势利导：顺应正气驱邪外出的趋势而用药，邪在表者汗之、在上者吐之（涌吐）、在下者泻之（攻下），给邪气以出路。',
      misjudgment: '以为因势利导就是「顺其自然不治疗」。错：因势利导是主动顺应病势用药，表证发汗、里结攻下都是积极治疗。',
      reasoning: '外感表证为何强调「在皮者汗而发之」？若误用攻下会如何？',
      feedback: '邪在肌表，正气驱邪趋向于外，汗法顺势助其外出；若误下引邪内陷，则表邪入里变生他证。',
      transfer: '「其高者，因而越之」指导何种治法？现代临床如何理解其适应证？',
    },
  },
  {
    id: 'pb2-th-16-06', title: '调整阴阳', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['损其有余', '补其不足'],
    intent: '调整阴阳治则：损其有余、补其不足，为治疗总纲',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '调整阴阳是治疗总纲：损其有余（实则泻之）、补其不足（虚则补之）',
    coreDefinition: '损其有余（阴阳偏盛）、补其不足（阴阳偏衰）、阴阳互济',
    safety: {},
    learning: {
      knowledge: '调整阴阳是治疗总纲：损其有余治阳盛（实热清热）或阴盛（实寒温散）；补其不足治阴虚（滋阴）或阳虚（温阳）；还须阴阳互济（阴中求阳、阳中求阴）。',
      misjudgment: '把调整阴阳理解成「补阴又补阳」。错：调整是针对失调状态，或损或补或调，须辨偏盛偏衰，盲目双补反致失衡。',
      reasoning: '「壮水之主，以制阳光」与「益火之源，以消阴翳」分别治什么？',
      feedback: '前者治阴虚阳亢（滋水制火），后者治阳虚阴盛（补火消阴），二者是「补其不足」的两端，是调整阴阳治则的经典表述。',
      transfer: '「阴中求阳」在肾气丸组方中的体现与原理是什么？',
    },
  },
  {
    id: 'pb2-th-16-07', title: '三因制宜', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['因人', '因时', '因地'],
    intent: '三因制宜作为治则的系统表述，与整体观念的联系',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '三因制宜：因时因地因人立法，是整体观念在治疗原则上的贯彻',
    coreDefinition: '因时（季节昼夜月相）、因地（地域）、因人（体质年龄性别）',
    safety: {},
    learning: {
      knowledge: '三因制宜作为治则：因时制宜（春夏养阳、秋冬养阴，用药顺时）、因地制宜（西北寒燥、东南湿热，药性随之）、因人制宜（体质、年龄、性别、生活习惯差异）。',
      misjudgment: '把三因制宜当「经验之谈」而非治则。错：三因制宜与整体观念一脉相承，是辨证论治不可分割的部分，直接决定选方用药。',
      reasoning: '同患便秘，老人、孕妇、燥热体质者治疗有何不同侧重？',
      feedback: '老人气血津亏宜润肠通便，孕妇忌峻下伤胎宜缓下润肠，燥热体质宜清热润肠。因人制宜决定了具体治法与药力峻缓。',
      transfer: '「用热远热、用寒远寒」体现了三因中的哪一条？如何理解？',
    },
  },

  // ============================================================
  // 17 方剂学基础
  // ============================================================
  {
    id: 'pb2-fm-17-01', title: '方剂是什么', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['方剂定义', '起源发展'],
    intent: '方剂定义与起源：由单味药到复方的演变，方剂是理法方药的一环',
    facts: [
      { field: 'formula.definition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.history', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '方剂是在辨证立法基础上按组方原则选药配伍的用药形式',
    coreDefinition: '方剂定义、起源（伊尹汤液等）、方剂与单味药的区别',
    safety: {},
    learning: {
      knowledge: '方剂是中医在辨证立法的基础上，按照组方原则选择药物、酌定剂量、规定剂型的用药形式。源于单味药经验，发展出复方配伍。',
      misjudgment: '把方剂当作「几味药的简单相加」。错：方剂是结构的整体，君臣佐使配伍使药力增效减毒，不是药效叠加。',
      reasoning: '为什么单用麻黄发汗力强而麻黄汤中配伍桂枝甘草反而更稳妥？',
      feedback: '麻黄配桂枝助发汗解表（相须），配甘草缓和峻烈（佐使），使发汗有力而不伤正。这是配伍优化，非简单相加。',
      transfer: '方剂与中成药（丸散膏丹）是什么关系？',
    },
  },
  {
    id: 'pb2-fm-17-02', title: '治法与方剂的关系', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['以法统方', '方从法出'],
    intent: '以法统方、方从法出：治法是组方依据，方剂是治法载体',
    facts: [
      { field: 'formula.definition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '以法统方：治法是组方的依据与统帅，方从法出、以方验法',
    coreDefinition: '治法与方剂的关系（以法统方、方从法出）、八法概述',
    safety: {},
    learning: {
      knowledge: '治法（汗吐下和温清消补八法）是辨证与组方之间的桥梁：先辨证立法，再依法组方。方剂是治法的体现，治法是方剂的理论依据。',
      misjudgment: '背方剂不背治法。错：不懂治法就无法理解为何如此组方，也无法加减变化，临证只会在记忆里翻方。',
      reasoning: '同为咳嗽，为何有用止嗽散（宣肺）、有用清气化痰丸（清热化痰）？',
      feedback: '因为治法不同：前者疏风宣肺（风邪犯肺），后者清化热痰（痰热壅肺）。先定治法再选方，治法错了方必错。',
      transfer: '「方从法出」与「以法统方」在教学上分别强调什么？',
    },
  },
  {
    id: 'pb2-fm-17-04', title: '配伍', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['相须', '相使', '相畏相杀'],
    intent: '药物七情配伍：相须相使相畏相杀相恶相反的临床意义',
    facts: [
      { field: 'formula.definition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '十八反', canon: '', chapter: '', sourceTitle: '（后世本草歌诀）', sourceType: 'traditional_commentary', status: 'teaching_inference', originalText: '本草明言十八反，半蒌贝蔹及攻乌……' }],
    dosage: null,
    cases: null,
    stdJudgment: '配伍七情：相须相使增效、相畏相杀减毒、相恶相反减效增毒，十八反十九畏为配伍禁忌',
    coreDefinition: '相须（同类增效）、相使（主辅增效）、相畏相杀（减毒）、相恶（减效）、相反（增毒）',
    safety: {},
    learning: {
      knowledge: '配伍七情：相须（功效相似相须增效，如石膏知母）、相使（一主一辅增效，如黄芪茯苓）、相畏相杀（毒药与解毒药互制）、相恶（降低药效）、相反（增毒，十八反）。',
      misjudgment: '把相畏与相杀记反。错：相畏是毒药畏解毒药（如半夏畏生姜），相杀是解毒药杀毒药之毒（生姜杀半夏毒），同一对药物从两个角度表述。',
      reasoning: '半夏与生姜同用属于哪种配伍关系？有何临床意义？',
      feedback: '相畏相杀。生姜制半夏之毒（相杀），半夏畏生姜（相畏），同用既减毒又助止呕，是「配伍减毒」的范例。',
      transfer: '十八反中「藻戟遂芫俱战草」指什么？为何列为配伍禁忌？',
    },
  },
  {
    id: 'pb2-fm-17-05', title: '方剂的加减变化', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['药味加减', '药量增减', '剂型变化'],
    intent: '方剂加减变化三法：药味加减、药量增减、剂型更换',
    facts: [
      { field: 'formula.definition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '方剂加减：药味加减（随证）、药量增减（变主次）、剂型更换（变药力）',
    coreDefinition: '随证加减、药量增减改变方义（如桂枝汤倍芍药）、剂型更换（汤丸散）',
    safety: {},
    learning: {
      knowledge: '方剂变化三法：药味加减（随兼证增损）、药量增减（改变君臣主次与方义，如桂枝汤倍芍药成桂枝加芍药汤）、剂型更换（汤者荡也、丸者缓也）。',
      misjudgment: '以为加减只是「加几味减几味」。错：药量变化可根本改变方义（同一药物君臣易位），剂型变化改变起效快慢与药力强弱。',
      reasoning: '桂枝汤与桂枝加芍药汤药物相同、药量不同，主治为何不同？',
      feedback: '倍芍药使方义从调和营卫转为缓急止痛，主治从太阳中风转为腹痛，这就是药量增减改变方义的典型。',
      transfer: '同一方作汤剂与作丸剂，适应证有何区别？',
    },
  },
];
