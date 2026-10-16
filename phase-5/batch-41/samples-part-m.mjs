// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part M（M 方剂剂量维度 10 节点 pb41-m-001 ~ pb41-m-010）
// 学科：M 方剂剂量（维度）；覆盖：君臣佐使剂量比例 / 麻黄石膏配伍比例 / 桂枝芍药等量配伍 /
//       大黄附子寒热配伍 / 经方一剂三服与中病即止 / 毒性药煎煮时间 / 妊娠期逐月用药 /
//       急症重剂与慢病轻剂 / 时辰给药 / 老年人多药联用剂量调整
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 formula，title 用「剂量·主题」式；dosage 为本学科核心字段必填；
// 高危药（麻黄/石膏/附子/细辛/半夏/甘草）prohibitions 红线对照 authoring-spec 第 4 节表；
// classics 仅引用 classic-patch.mjs 已收录条文（汗出而喘/汗出恶风/太阳中风/一服汗出病差停后服）
// 难度分布：简单 3（001/003/010）/ 中等 3（002/005/009）/ 困难 2（004/006）/ 易混淆 1（007）/ 综合推理 1（008）
// ============================================================

export const PART_M = [
  // ============================================================
  // M 方剂剂量 · 配伍比例（001–004）
  // ============================================================
  {
    id: 'pb41-m-001', title: '剂量·君臣佐使剂量比例原则', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['方剂剂量', '君臣佐使', '配伍比例', '组方原则'],
    intent: '掌握君臣佐使各药在方中的剂量比例原则，理解君药量最重、臣佐使递减的配伍规律。',
    facts: [
      { field: 'formula.配伍比例', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.组方原则', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.剂量规律', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.剂量范围', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '君药是针对主病主证、药力居首之品，剂量常为全方之最，如麻黄汤麻黄三两为君、桂枝二两为臣、杏仁七十枚为佐、炙甘草一两为使；一般臣药约为君药之半至等量，佐使药轻灵量小。内经以「君一臣二，制之小也；君一臣三佐九，制之大也」示方剂大小与药味多寡的关联。', caution: '剂量比例是方义的骨架：君臣药量颠倒则主次易位，方势全变；峻烈药即使作臣佐使用，仍须按药典单味窗口取值，不得因位次低而忽略毒性限量。' },
    cases: null,
    stdJudgment: '君臣佐使的剂量比例决定方势走向：君药量最重、力专效宏，直捣主证；臣药辅之约为君药之半，佐药制约兼治，使药调和引经而量轻。比例一旦失衡，主次易位，方义随之转变，故组方剂量先定君臣、再配佐使。',
    coreDefinition: '君臣佐使剂量比例：君药量最重以主攻主证，臣药次之相助，佐使药量轻以制衡调和；比例格局决定全方方势与主次。',
    safety: { note: '剂量比例学习属组方理论范畴，临证组方须先定君臣主次，峻烈药按药典单味窗口取值，不得因佐使位次而忽略限量。', prohibitions: [] },
    learning: {
      knowledge: '君臣佐使剂量规律：君药针对主病主证、药力居首，剂量常为全方之最，如麻黄汤麻黄三两为君；臣药辅助君药、量约为君药之半，如桂枝二两；佐药制约君臣毒性或兼治兼证，量轻；使药引经调和、量最小，如甘草一两。药味多寡分大小之制，药量比例则定主次轻重，二者共同构成组方骨架。',
      misjudgment: '把佐使药与君药等量甚至超量投用。错：佐使药使命在制衡调和，剂量大于君药会使主次颠倒、方势旁落，如桂枝汤中甘草用量超过桂枝，则调和营卫之旨失其统帅。',
      reasoning: '同样是桂枝、甘草同用，为何桂枝汤以桂枝为君量最重，而炙甘草汤却以甘草为君，两方剂量主次如何随病机变化？',
      feedback: '炙甘草汤主心阴阳两虚之脉结代，非甘草重用不能复脉，故量居首位；桂枝汤主营卫不和，须桂枝通阳为帅。病机决定谁为君，剂量跟着主次走。',
      transfer: '面对一位气虚兼外感者，若以黄芪为君、解表药为佐使，剂量如何分配才能扶正不碍邪？',
    },
  },
  {
    id: 'pb41-m-002', title: '剂量·麻黄与石膏配伍剂量比例', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['方剂剂量', '麻黄', '石膏', '配伍比例', '麻杏甘石汤'],
    intent: '掌握麻黄与石膏寒热配伍的剂量比例（石膏倍于麻黄）及其对全方辛凉宣肺之性的决定作用。',
    facts: [
      { field: 'formula.配伍比例', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.煎煮法', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '汗出而喘', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '发汗后，不可更行桂枝汤，汗出而喘，无大热者，可与麻黄杏仁甘草石膏汤。' },
    ],
    dosage: { guideline: '麻黄与石膏配伍以石膏倍于麻黄为常：麻杏甘石汤原方麻黄四两、石膏半斤（八两），比例为1:2，今常用麻黄6g配生石膏18~24g；麻黄按药典2~10g取值，石膏15~60g打碎先煎，杏仁9g、炙甘草6g。', caution: '石膏量小于麻黄则方转辛温，量倍于麻黄方成辛凉宣肺之剂；麻黄发汗力强，虚人、高血压、心脏病、失眠者慎用，运动员禁用；石膏先煎，脾胃虚寒者慎用。' },
    cases: null,
    stdJudgment: '麻黄与石膏一辛温一甘寒，配伍剂量比例直接决定方性：石膏倍于麻黄，则麻黄宣肺之力被石膏凉性制其温，全方成辛凉宣泄、清肺平喘之麻杏甘石汤。比例不足则温性未化，比例过重则宣透无力，故石膏用量须倍于麻黄。',
    coreDefinition: '麻黄石膏配伍以石膏倍于麻黄为则：麻黄宣肺开腠、石膏清泄肺热，石膏量大于麻黄则辛温变辛凉，主治肺热咳喘，代表方麻杏甘石汤。',
    safety: { note: '石膏须打碎先煎，用量倍于麻黄方能制其温；麻黄发汗力强，须按药典窗口取值并警惕心悸失眠等反应。', prohibitions: ['麻黄发汗力强，虚人及高血压、心脏病、失眠者慎用，运动员禁用', '石膏大寒，脾胃虚寒者慎用；须打碎先煎'] },
    learning: {
      knowledge: '麻杏甘石汤原方麻黄四两、石膏半斤，石膏量恰为麻黄二倍，为「麻黄得石膏则辛凉」的关键配伍。今常用麻黄6g、杏仁9g、生石膏18~24g（先煎）、炙甘草6g。石膏清泄肺胃之热、辛甘大寒，麻黄宣肺平喘，石膏倍于麻黄则制约其辛温发汗之性，转成辛凉宣泄之剂，主治肺热壅盛之身热咳喘、鼻煽口渴、苔薄黄脉数。',
      misjudgment: '麻黄与石膏等量相配，以为石膏仅作清热辅药。错：石膏量不足麻黄二倍时，麻黄辛温之性未被充分制衡，麻杏甘石汤即成辛温发汗之方，肺热咳喘者用之反助热，故石膏须倍于麻黄。',
      reasoning: '石膏量倍于麻黄方成辛凉，若把石膏减至与麻黄等量甚至更小，麻杏甘石汤的方性会发生什么变化？',
      feedback: '石膏量减则制衡不足，麻黄辛温发汗之性回归，方从辛凉宣肺退为辛温散邪，肺热壅盛者误投即助热生变，可见剂量比例先于药味决定方义。',
      transfer: '外感风热、热壅于肺之咳喘，若患者素有高血压，麻黄用量应如何调整，石膏比例又当如何保持？',
    },
  },
  {
    id: 'pb41-m-003', title: '剂量·桂枝与芍药等量配伍意义', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['方剂剂量', '桂枝', '芍药', '等量配伍', '桂枝汤'],
    intent: '掌握桂枝汤中桂枝与芍药等量配伍调和营卫的剂量意义，理解比例改变则方义随之变化。',
    facts: [
      { field: 'formula.配伍比例', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.组方意义', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.剂量变化', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '汗出恶风', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '太阳病，头痛发热，汗出恶风，桂枝汤主之。' },
      { label: '太阳中风', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '太阳中风，阳浮而阴弱。阳浮者，热自发；阴弱者，汗自出。啬啬恶寒，淅淅恶风，翕翕发热，鼻鸣干呕者，桂枝汤主之。' },
    ],
    dosage: { guideline: '桂枝汤桂枝、芍药各三两等量相配，今常用桂枝9g、芍药9g、炙甘草6g、生姜9g、大枣12枚；服药后啜热稀粥并温覆取微汗，一剂分三服。比例改变则方义随之：桂枝加桂汤桂枝增至五两主奔豚，桂枝加芍药汤芍药加倍主腹满时痛。', caution: '桂枝芍药等量是调和营卫的关键：桂枝通阳、芍药敛阴，一散一收；桂枝辛温，温热病及血热妄行者忌用；桂枝、芍药均按药典3~9g窗口取值。' },
    cases: null,
    stdJudgment: '桂枝汤以桂枝、芍药等量相配调和营卫：桂枝辛温通阳以散卫分之邪，芍药酸寒敛阴以固营分之汗，等量则一散一收、阴阳相济，汗出而不伤正。比例一偏，桂枝加桂汤主奔豚、桂枝加芍药汤主腹满，等量正是桂枝汤「调和」之量的眼目。',
    coreDefinition: '桂枝与芍药等量配伍是桂枝汤调和营卫的关键：桂枝通阳散邪、芍药敛阴和营，等量使散收相制，邪去而汗不伤正。',
    safety: { note: '桂枝辛温走表，温热病、阴虚火旺及血热证忌用；服桂枝汤须啜粥温覆取微汗，不可令如水流漓。', prohibitions: [] },
    learning: {
      knowledge: '桂枝汤中桂枝三两与芍药三两等量，今常用各9g，配炙甘草6g、生姜9g、大枣12枚。桂枝辛甘温，解肌通阳、助卫散寒；芍药酸苦微寒，敛阴和营、益阴护液；等量相伍则散中有收、发中有守，令汗出而不伤营阴。比例偏则方义易：桂枝加桂汤重用桂枝五两平冲降逆，桂枝加芍药汤重用芍药缓急止痛，可见量变即质变。',
      misjudgment: '桂枝汤中加大芍药用量以求滋阴。错：桂枝汤以等量为准，芍药过量则敛邪不出、卫阳被遏，表证稽留；滋阴当另立养阴之方，不得擅改桂枝汤比例。',
      reasoning: '桂枝加桂汤只增桂枝量而减芍药量，为何就能从调和营卫转向平冲降逆？',
      feedback: '桂枝重用则辛散之力大于酸敛，气机由和营转向温通降逆，配合温覆可平肾气上冲；等量变偏量，方义即从调和转为专攻。',
      transfer: '自汗恶风、营卫不和者，若兼见腹痛喜温，参考桂枝加芍药汤的思路，桂枝芍药比例该如何调整？',
    },
  },
  {
    id: 'pb41-m-004', title: '剂量·大黄与附子寒热配伍剂量', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['方剂剂量', '大黄', '附子', '寒热配伍', '大黄附子汤'],
    intent: '掌握大黄与附子寒热并用的配伍剂量关系，理解温下法「以热制寒、取大黄通下之用」的组方要义。',
    facts: [
      { field: 'formula.配伍比例', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.煎煮法', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.方义', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '大黄附子汤原方大黄三两、附子三枚（炮）、细辛二两，今常用大黄9g（后下）、制附子12g（先煎久煎）、细辛3g。附子辛热温散寒凝以制大黄苦寒之性，大黄反借其力专取通下，主治寒实内结之腹痛便秘、手足厥冷、脉沉弦。', caution: '附子须炮制、先煎0.5~1小时至口尝无麻辣感，反半夏瓜蒌贝母白蔹白及，孕妇禁用；细辛煎剂1-3g、散剂0.5-1g，反藜芦；大黄后下，孕妇、经期慎用。' },
    cases: null,
    stdJudgment: '大黄与附子寒热并用，剂量分寸在「制其性而存其用」：附子量足方能温散寒凝、制大黄之苦寒，大黄量适度方取其推荡通下之能，二者相合则寒实得温而大便自通。附子须炮制先煎久煎，此配伍以温为主、下为辅。',
    coreDefinition: '大黄附子汤以附子温散寒凝为主、大黄通下为辅，附子量足以制大黄之寒，共成温下之法，主治寒实内结证。',
    safety: { note: '附子有毒须炮制先煎久煎，细辛限量为煎剂1-3g，大黄后下；温下法适用于寒实内结，里实热证与孕妇禁用。', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '【高风险】细辛煎剂1-3g散剂0.5-1g，过量可致中毒；反藜芦', '大黄后下；孕妇、经期慎用'] },
    learning: {
      knowledge: '大黄附子汤（大黄、炮附子、细辛）为温下代表方：大黄三两通下积滞，附子三枚辛热温散寒凝，细辛二两助附子散寒止痛。今用大黄9g后下、制附子12g先煎久煎、细辛3g。附子量大取「温」，大黄量足取「下」，寒得温则散、结得下则通，主治寒实内结之腹痛拒按、大便秘结、畏寒肢冷、舌苔白腻、脉沉弦紧。',
      misjudgment: '见便秘腹痛即投承气类苦寒攻下，或把大黄附子汤当作清热通便方。错：寒实内结者舌不黄、脉不数，苦寒攻下反伤阳气、寒凝愈甚；本证须以附子为主温散，大黄为辅通下，主次不可颠倒。',
      reasoning: '大黄苦寒本主热结，为何在寒实内结时反与附子同用仍能取效？',
      feedback: '附子辛热散寒之力足以制大黄之苦寒，大黄在温药驾驭下专走肠腑推荡积滞，「制性存用」正是寒热并用的配伍精义。',
      transfer: '老人冷秘腹痛、四肢不温，试按温下之法分析附子与大黄的剂量主次并说明附子煎法。',
    },
  },
  // ============================================================
  // M 方剂剂量 · 服法节奏与毒性警戒（005–006）
  // ============================================================
  {
    id: 'pb41-m-005', title: '剂量·经方一剂三服与中病即止的剂量节奏', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['方剂剂量', '煎服法', '中病即止', '服药节奏'],
    intent: '掌握经方一剂分三服、中病即止的服药节奏，理解总量恒定而分次给药对峻烈方剂安全性的意义。',
    facts: [
      { field: 'formula.煎服法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.服药节奏', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.中病即止', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '一服汗出病差停后服', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '若一服汗出病差，停后服，不必尽剂。' },
    ],
    dosage: { guideline: '经方煎服节奏：以桂枝汤为例，水七升微火煮取三升，分温三服，每服一升；若一服汗出病差，停后服，不必尽剂。麻黄汤亦分温三服取微汗。峻剂如十枣汤则平旦空腹顿服、得快下后糜粥自养。', caution: '一剂总量恒定而分次给药，是峻烈药的安全设计：初服不效再进、效则即止，防过汗、过下伤正；解表剂忌令如水流漓，攻下剂得下即止后服。' },
    cases: null,
    stdJudgment: '经方服药讲究剂量节奏：一剂煎取三升分温三服，每服观察药后反应再定续服与否，中病即止、不必尽剂。总量虽定而分次投予，既保药力接续，又防过剂伤正，汗法以微汗为度、下法以得下为度，节奏即安全。',
    coreDefinition: '一剂三服、中病即止：经方一剂分温二至三服，首服观察反应，效则停药，不效再进，使峻烈方药不至于过剂伤正。',
    safety: { note: '分次服药可观察药势、及时止损；汗下之剂中病即止，得汗得下后停后服，防过汗亡阳、过下伤阴。', prohibitions: ['麻黄发汗力强，虚人及高血压、心脏病、失眠者慎用，运动员禁用；发汗以微汗为度'] },
    learning: {
      knowledge: '经方煎服法体现剂量节奏：桂枝汤水七升微火煮取三升、分温三服，一服汗出病差即停后服，不必尽剂；麻黄汤分温三服取微汗，中病即止；十枣汤平旦顿服、得快下后糜粥自养。一剂总量恒定，分次投予可在观察中调整剂量，汗下峻剂效即止服，防过汗伤阳、过下伤阴。',
      misjudgment: '把一剂三服理解为一次服尽或按日顿服全部药液。错：经方以分次服药为常法，逐服观察药后反应，首服不效方进次服；一次顿服过量，汗下太过必伤正气。',
      reasoning: '桂枝汤一服汗出病差即停后服，为何仲景宁可弃去剩余两服也不让患者服尽？',
      feedback: '药力已足、病邪已去，再服则过剂伤正，「中病即止」是经方剂量节奏的核心，剩药可弃不可强服。',
      transfer: '老年人服解表剂汗出后仍有余邪，此时按经方节奏应续服、减量服还是停药调护？',
    },
  },
  {
    id: 'pb41-m-006', title: '剂量·毒性药煎煮时间与有效剂量关系', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['方剂剂量', '有毒', '煎煮时间', '附子', '半夏'],
    intent: '掌握附子、半夏等毒性药的煎煮时间与有效剂量的关系，理解久煎减毒是安全取效的前提。',
    facts: [
      { field: 'formula.煎煮法', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.炮制', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.有效成分', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '毒性药煎煮以减毒为先：制附子3~15g须先煎久煎0.5~1小时至口尝无麻辣感，乌头碱水解后方可入他药同煎；半夏炮制后3~9g，生品禁止内服；天南星、白附子均须炮制后入药，商陆醋制减毒。', caution: '煎煮时间不足则毒性未减，加大剂量更增风险；久煎减毒不可由加大煎煮之外的配伍替代。附子反半夏瓜蒌贝母白蔹白及，半夏反乌头类（含附子），二者不得同用。' },
    cases: null,
    stdJudgment: '毒性药的煎煮时间直接决定有效剂量能否安全投予：制附子久煎至口尝无麻辣感，乌头碱水解减毒后方可足量取效；煎时不足则毒性未去，剂量再准亦有中毒之虞。故有毒药的安全逻辑是炮制、久煎在前，剂量取值在后。',
    coreDefinition: '毒性药久煎减毒是先决条件：附子先煎久煎水解乌头碱、半夏生品有毒须炮制，煎煮时间不足则毒性与有效剂量区间重叠，剂量无从谈起。',
    safety: { note: '附子先煎久煎至无麻辣感为硬性前提，配伍不可替代；半夏生品有毒须炮制，反乌头类；煎时不足的附子严禁投服。', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用'] },
    learning: {
      knowledge: '毒性药煎煮时间与有效剂量直接相关：附子含乌头碱，制附子3~15g须先煎0.5~1小时至口尝无麻辣感，双酯型乌头碱水解为乌头原碱后毒性大减，方能与干姜、甘草等共煎取回阳之效；半夏生品有毒，经姜制或法制后3~9g内服；天南星、白附子须炮制减毒；商陆醋制。煎时不足则毒存，剂量再小亦可中毒，久煎是安全窗口的前提。',
      misjudgment: '附子先煎半小时即下他药，以为药典限量3~15g之内便无中毒风险。错：煎煮时间不足时乌头碱未充分水解，即使3g亦可致心律失常；限量与煎法互为前提，缺一则不安全。',
      reasoning: '同样是乌头碱类药，为何炮制与久煎之后剂量才能放宽到治疗量？',
      feedback: '炮制与久煎使双酯型乌头碱水解减毒，毒性区间与有效区间分离，安全窗口随之打开；煎法不到，窗口关闭。',
      transfer: '遇虚寒重证欲重用附子回阳，除遵守限量外，煎煮上还须落实哪些硬性步骤？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 人群与节奏（007–010）
  // ============================================================
  {
    id: 'pb41-m-007', title: '剂量·妊娠期逐月用药剂量差异', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['方剂剂量', '妊娠用药', '逐月养胎', '妊娠禁忌'],
    intent: '掌握妊娠期用药剂量宜轻及逐月胎养的不同侧重，牢记妊娠禁用慎用药物红线。',
    facts: [
      { field: 'formula.妊娠用药', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.妊娠禁忌', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.逐月养胎', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '妊娠期用药剂量宜轻、药味宜简、中病即止：峻下逐水（甘遂、大戟、芫花、巴豆、牵牛）、破血逐瘀（三棱、莪术、水蛭、虻虫）、有毒药（雄黄、朱砂、马钱子、附子）禁用；活血（桃仁、红花、牛膝）、滑利（滑石、木通、冬葵子）、辛热（附子、肉桂）慎用。逐月养胎按月调摄，如孕二月忌房事防堕胎，孕五月始养脾肾。', caution: '妊娠禁忌药按药典与教材为准，不以经验推断扩充；即使慎用药亦须量减至常规下限、短程使用，出现腹痛下血即停药就医。' },
    cases: null,
    stdJudgment: '妊娠期用药以「量轻、药简、效即止」为纲：峻下、破血、有毒之品禁用，活血滑利辛热之品慎用且剂量宜减。逐月养胎按月侧重不同，孕早期尤须谨防伤胎动血，剂量差异的实质是胎儿发育阶段对药力敏感度不同。',
    coreDefinition: '妊娠期用药剂量宜轻：禁用峻下破血有毒之品，慎用活血滑利辛热药且减量短程，逐月养胎按胎孕月份调整调护侧重。',
    safety: { note: '妊娠用药禁忌以药典与规划教材为准；慎用药须减至常规下限、短程使用，胎动不安、腹痛下血即停药就医。', prohibitions: ['附子孕妇禁用；生半夏孕妇慎用；甘遂大戟芫花孕妇禁用', '桃仁、红花、牛膝等活血药妊娠禁用或慎用，剂量从下限'] },
    learning: {
      knowledge: '妊娠期逐月用药差异体现在禁忌与剂量两层：禁用峻下逐水（甘遂、大戟、芫花、巴豆、牵牛子）、破血逐瘀（三棱、莪术、水蛭、虻虫、斑蝥）与有毒之品（雄黄、朱砂、马钱子、附子）；慎用活血（桃仁、红花、牛膝、川芎）、滑利（滑石、木通、冬葵子）、辛热（附子、肉桂、吴茱萸）及攻下之品（大黄、芒硝），慎用药一律减量短程。逐月养胎按月调摄，孕早期谨防伤胎，中后期重在养脾肾、安胎气。',
      misjudgment: '妊娠早期误用活血化瘀药且剂量照常，以为「少量活血无碍」。错：孕早期胎元未固，桃仁红花牛膝等即便常规量亦可动血伤胎，慎用药须减至下限并严格观察。',
      reasoning: '同是牛膝，妊娠期禁用而产后瘀血腹痛反可用之，剂量与用途如何随生理状态改变？',
      feedback: '牛膝性下行，妊娠期引血下行易动胎，故禁用；产后瘀血内停需下行逐瘀，用之正合病机。人群生理状态决定同一味药的剂量与取舍。',
      transfer: '妊娠咳嗽伴痰热者，半夏为妊娠慎用药，如何权衡止咳与安胎并调整其用量？',
    },
  },
  {
    id: 'pb41-m-008', title: '剂量·急症重剂与慢病轻剂策略', category: 'formula', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['方剂剂量', '急症重剂', '慢病轻剂', '给药策略'],
    intent: '掌握急症重剂取效、慢病轻剂缓图的不同剂量策略，理解病势缓急与剂量轻重的关系。',
    facts: [
      { field: 'formula.给药策略', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.急症用药', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.慢病调理', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '急症重剂取速效：四逆汤回阳救逆，制附子9~15g先煎久煎、干姜6~9g、炙甘草6g，日2剂分4次频服；大承气汤急下存阴，大黄后下、芒硝溶服，得下即止。慢病轻剂缓图：以丸散小量长期服用，如六味地黄丸蜜丸每服6~9g、日2次。', caution: '重剂取效快而风险大：附子类必先煎久煎，攻下药得下即止；慢病虽用轻剂，亦须按药典窗口下限取值并定期评估，不可因「轻」而长期滥用有毒药。' },
    cases: null,
    stdJudgment: '病势决定剂量策略：急症病势暴急，须重剂频服以挽危亡，如四逆汤回阳、承气汤急下，药力迅捷而中病即止；慢病病势缠绵，宜轻剂丸散缓图，渐次调理以复正气。轻重之别，根在病势缓急，不在医者好恶。',
    coreDefinition: '急症重剂取速效、中病即止，慢病轻剂丸散缓图：剂量策略随病势缓急而定，重剂防过、轻剂防滞。',
    safety: { note: '重剂多含峻烈药，附子须先煎久煎、攻下须中病即止；慢病长期用药须按窗口下限并定期评估，防蓄积毒性。', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '大黄芒硝峻下攻伐，孕妇禁用，得下即止后服'] },
    learning: {
      knowledge: '急症重剂策略：四逆汤回阳救逆用制附子9~15g（先煎久煎）、干姜6~9g、炙甘草6g，病重者日2剂频服，待肢温脉起即减量；大承气汤大黄9~15g后下、芒硝9g溶服，急下存阴、得下即止。慢病轻剂策略：六味地黄丸等以丸剂每服6~9g日2次缓图，补虚而不骤；虚人、老年病势缓者，剂量从窗口下限起。',
      misjudgment: '慢病调理也按汤剂重药顿服，或急症轻剂缓投。错：慢病重剂则药过病所、耗伤正气，急症轻剂则缓不济事、坐失生机；剂量策略须与病势匹配。',
      reasoning: '同样是附子，回阳救急可日服数十克（先煎），而慢病温补肾阳仅用少量，剂量悬殊的根本依据是什么？',
      feedback: '急症阳亡须大剂急挽，附子久煎后毒减而力猛可暂用；慢病肾阳亏虚，轻剂小量缓补足矣，量大反燥伤阴。病势缓急与邪正对比决定剂量。',
      transfer: '老年心衰阳气暴脱与慢性心功能不全阳虚者，附子用量与煎法应如何分别掌握？',
    },
  },
  {
    id: 'pb41-m-009', title: '剂量·时辰给药与剂量优化', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['方剂剂量', '时辰给药', '择时服药', '剂量优化'],
    intent: '掌握按时辰择时服药以优化药效的给药规律，理解药性、病位与时相节律的配合。',
    facts: [
      { field: 'formula.择时服药', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.时辰节律', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.煎服法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '择时服药以顺药性与节律：攻下逐水剂晨起平旦空腹服（十枣汤平旦服，得快下后糜粥自养）；发汗解表剂白昼温服助阳透邪；补益药晨起或午后服以助吸收；泻下通便剂清晨或睡前服；安神剂睡前服。药量随服时调整，如安神药轻量入暮即可宁神。', caution: '峻下药平旦空腹服须防虚脱，体弱羸人减半量（十枣汤羸人服半钱匕）；夜间服发汗剂须防过汗亡阳；含挥发油药（薄荷、砂仁）后下并短煎。' },
    cases: null,
    stdJudgment: '时辰给药顺应药性与人体节律：逐水药平旦空腹顿服使药力直达下焦，发汗药白昼服助卫阳外达，安神药暮夜服随阳入阴，补益药晨服利吸收。服时与剂量联动，同一方药在不同时辰投予，剂量与取效各有讲究。',
    coreDefinition: '择时服药优化剂量效果：逐水药平旦空腹服、解表药白昼服、安神药睡前服、补益药晨服，服时顺应药性病位与昼夜节律。',
    safety: { note: '时辰给药以顺应药性与节律为要，峻下药平旦服须防虚脱、羸人减半；夜服发汗剂防过汗亡阳；芳香药后下短煎。', prohibitions: ['十枣汤含甘遂大戟芫花峻下逐水，反甘草，孕妇禁用；平旦空腹服，羸人减半，得快下即止'] },
    learning: {
      knowledge: '时辰给药规律：十枣汤平旦空腹顿服逐水，得快下后糜粥自养，强人服一钱匕、羸人半钱匕；发汗解表剂于白昼温服，借阳气外达助邪外出；补益剂晨起或午后服用利于吸收；通便剂清晨或睡前服；安神剂临睡前服以宁心安神。药量随服时机动，如安神药轻量即可，逐水药按体质分档，服时与剂量共同优化药效。',
      misjudgment: '逐水峻剂不分时辰随时顿服，或安神药日间大量服用。错：逐水药非平旦空腹则药力不专且攻伐失度，安神药日间重服则昏沉误事；服时错位使剂量效益落空。',
      reasoning: '十枣汤为何强调「平旦服」，午后或夜间服用有何弊端？',
      feedback: '平旦阳气始生、肠胃空虚，药力直达病所且易于观察下利反应；夜间服则攻下扰眠、气机逆乱，故择时即择势。',
      transfer: '慢性便秘者欲用润下缓图，参照时辰给药规律，服时与剂量应怎样安排更稳妥？',
    },
  },
  {
    id: 'pb41-m-010', title: '剂量·老年人多药联用剂量调整', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['方剂剂量', '老年用药', '多药联用', '剂量调整'],
    intent: '掌握老年人脏腑渐衰、代谢减退下的剂量调整原则，理解多药联用时减量、错峰、简药的必要性。',
    facts: [
      { field: 'formula.老年用药', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.剂量调整', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.多药联用', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '老年人体质渐衰，剂量常取成人量之2/3~1/2，峻烈药从窗口下限起步：附子3~6g先煎久煎、细辛1~2g、大黄3~6g后下。多药联用时简化药味、错峰服药，有毒药短程使用，配伍注意十八反十九畏。', caution: '肝肾功能减退者药力蓄积风险高，有毒药减量短程；中西药联用须间隔1小时以上；附子、细辛、麻黄类忌与含麻黄碱制剂及强心苷类叠加。' },
    cases: null,
    stdJudgment: '老年人气血阴阳渐衰、代谢排泄减退，剂量宜减：一般取成人量之半至三分之二，峻烈有毒药从下限起步、短程而止。多药联用须简药味、错峰服、查配伍禁忌，防药力叠加与蓄积毒性，量随人变是老年用药第一原则。',
    coreDefinition: '老年用药剂量宜减：常取成人量2/3~1/2，有毒药从下限短程；多药联用须简味错峰、核对十八反十九畏，防蓄积与叠加。',
    safety: { note: '老年肝肾代谢减退，剂量宜减、有毒药短程；多药联用错峰服、查配伍禁忌，忌与强心苷、麻黄碱制剂叠加。', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '【高风险】细辛煎剂1-3g散剂0.5-1g，过量可致中毒；反藜芦'] },
    learning: {
      knowledge: '老年剂量调整要点：六十岁以上常取成人量2/3~1/2，如黄芪9~15g、当归6~9g；峻烈药从下限起步，附子3~6g须先煎久煎、细辛1~2g、大黄3~6g后下。多药联用时药味从简、攻补有序，错峰服药防相互作用；肝肾功能减退者有毒药减量短程、定期复查；中西药联用间隔1小时以上。',
      misjudgment: '老人按成人常量服药，认为「不加重就是安全」。错：老年代谢减缓，常规量即可致蓄积，附子细辛类即便常量亦可中毒；剂量当随年齿递减，不可按青壮年常量硬套。',
      reasoning: '同患风寒外感，青壮年与七旬老人用麻黄汤，剂量与疗程应作何区别？',
      feedback: '老人卫外不固、汗源易竭，麻黄宜减量或改桂枝汤，中病即止；青壮年腠理实、可足量开腠。年龄与体质决定峻药的取舍与用量。',
      transfer: '八旬老者慢支喘咳合并便秘，拟用麻杏甘石汤与润下方，多药联用时应如何减量与错峰？',
    },
  },
];
