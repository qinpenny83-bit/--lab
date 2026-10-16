// ============================================================
// 杏林大典 · Phase 5 · Batch-13 · 样本 Part M1（M 方剂剂量维度 10 节点 pb13-m-001 ~ pb13-m-010）
// 学科：M 方剂剂量（维度）；覆盖：经方一两折合今制 / 古今权衡制演变 / 常用药单次剂量安全窗口 /
//       细辛用量警戒 / 附子用量与先煎久煎 / 峻下逐水药丸散用量 / 儿童剂量折算 /
//       老人与体虚者剂量调整 / 煎煮法对剂量影响 / 剂型与剂量换算
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 formula，title 用「剂量·主题」式；dosage 为本学科核心字段必填；
// 高危药（细辛/附子/甘遂/大戟/芫花）prohibitions 红线对照 authoring-spec 第 4 节表；
// 本批 classics 留空，数值一律以《中国药典》与规划教材通行表述为准
// ============================================================

export const SAMPLES_PART_M1 = [
  // ============================================================
  // M 方剂剂量 · 折算体系（001–002）
  // ============================================================
  {
    id: 'pb13-m-001', title: '剂量·经方一两折合今制（汉制考证与现代折算法）', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['方剂剂量', '经方折算', '汉制', '剂量换算'],
    intent: '掌握《伤寒论》经方剂量的汉制考证结论（一两约合今 15.6g）与明清以来一两折 3g 的临证折算法，能正确换算桂枝汤、麻黄汤等方药量。',
    facts: [
      { field: 'formula.dosageConvert', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.dosageConvert', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.measureSystem', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '经方折算两法并行：考据法按汉制一两约合今 15.6g（一升约合今 200ml），用于还原古方原貌；临证法按明清「古之一两，今用一钱」即一两约 3g 折算，为当前处方常用。选定一种体系后全方各药按同一比例换算，不得混用。', caution: '按 15.6g 折算时，麻黄、附子、细辛等峻烈药单味量骤然放大数倍，非经方原量使用经验者不得擅用；按 3g 折算用于轻灵调和之剂尚可，用于急重症回阳逐水则力有不逮。' },
    cases: null,
    stdJudgment: '汉代一两实测约合今 15.6g，《伤寒论》原方剂量远大于现代常用量；明清医家以「古之一两，今用一钱」定出一两约 3g 的轻量折算法，两法相差约五倍。处方前须先申明采用何种折算体系，再依同比例换算全方。',
    coreDefinition: '经方剂量折算以东汉权衡实测为本：一两约 15.6g、一升约 200ml；明清以降通行「一两折一钱」约 3g 的临证轻量法。考据派还原古方、临证派取其轻灵，两套体系不可混算。',
    safety: { note: '折算体系不同可使全方药量相差约五倍；采用大剂量折算体系时，麻黄、附子、细辛等须逐一复核单味安全窗口，附子类须先煎久煎。', prohibitions: [] },
    learning: {
      knowledge: '东汉大司农铜权实测，汉代一两约合今 15.6g（另有 13.8g 之说），一升约合今 200ml。依此，《伤寒论》麻黄汤麻黄三两约 47g、桂枝汤桂枝三两约 47g，与今常用 9-15g 相差悬殊。明清医家提出「古之一两，今用一钱」，一两折合约 3g，为当代处方主流。两套折算体系并存：考据用 15.6g、临证惯用 3g，选其一即须全方同比例换算，不可先按原方两数再逐味按今量。',
      misjudgment: '以为《伤寒论》一两固定折合 3g 就是古方原量。错：3g 折法源于明清「一两折一钱」的临证轻用方案，汉代实测一两约 15.6g，两者相差约五倍；把轻量折法当作原方剂量，会低估经方「一剂知」的峻烈取效之量。',
      reasoning: '同是桂枝汤，按 15.6g 折算与按 3g 折算，为何取效与安全性判若两方？',
      feedback: '剂量体系决定方势：15.6g 体系重温阳散寒、取速效而须防过汗伤正，3g 体系取其调和营卫、轻可去实；折算体系一经选定，全方比例随之锁定，不可混搭。',
      transfer: '读《金匮要略》肾气丸「干地黄八两」，按 15.6g 折合约 125g，与今常用 15g 相差八倍，这提示考证剂量与临证剂量应如何取舍？',
    },
  },
  {
    id: 'pb13-m-002', title: '剂量·古今权衡制演变（汉唐斤两制与宋元明清制）', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['方剂剂量', '权衡制', '度量衡', '剂量换算'],
    intent: '掌握汉唐斤两制与宋元明清权衡制的计量差异及换算关系，能按方书成书年代正确折算药量。',
    facts: [
      { field: 'formula.measureSystem', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.measureSystem', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.dosageConvert', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '换算基准：汉代一两约 15.6g；唐药秤「大两」一两约 41.3g（一斤约 661g）；宋金元一两约 37.5g（一斤约 600g）、一钱约 3.75g；明清一两约 37.3g、一钱约 3.73g。1 两=10 钱、1 钱=10 分，先判方书年代再套对应基准。', caution: '唐代「大两」与日常「小两」并用，药量可差 2.6 倍，误用大两折算可使峻药超量；宋以后方书以钱分计量，直接按今克数误读会成倍放大药量。' },
    cases: null,
    stdJudgment: '权衡制随时代递变：汉代一两约 15.6g，唐代药秤大两约 41.3g，宋元明清一斤十六两约 600g、一两约 37g，宋明一两约为汉两的 2.4 倍。读古方先定成书年代，再按对应基准换克，唐大两与汉两混算可致药量成倍失真。',
    coreDefinition: '古今权衡制以斤两钱分为纲：汉一两约 15.6g，唐大两约 41.3g，宋元明清一两约 37g 上下；明清一两约为汉两 2.4 倍，故「古方一两今用一钱」之说正合此差。',
    safety: { note: '折算先辨朝代：汉唐方与宋明方基准不同，混用可使峻药剂量成倍偏离；含细辛、附子、甘遂的方剂在放大折算时须复核药典限量。', prohibitions: [] },
    learning: {
      knowledge: '汉制：一斤=16 两=384 铢，一两约 15.6g。唐制：药秤用「大两」，一斤约合今 661g、一两约 41.3g；民间日用「小两」承汉制。宋金元：一斤约 600g，一两约 37.5g、一钱约 3.75g，方书渐以钱、分计量。明清：一斤十六两约 600g，一两约 37.3g、一钱约 3.73g；今市斤 500g 系 1959 年后改制，不可反推古方。换算口诀：1 两=10 钱，1 钱=10 分；宋明一两约为汉代一两的 2.4 倍，正合「古一两今用一钱」。',
      misjudgment: '把宋代以后的「一两」按汉代 15.6g 折算。错：宋明一两约 37g，是汉两的 2.4 倍；同一「两」字在不同朝代数值不同，须先判定方书年代，否则整方剂量系统性失真。',
      reasoning: '李时珍说「古之一两，今用一钱可也」，为何这句话放到宋代以后的权衡背景下才讲得通？',
      feedback: '宋代一两约 37g，明代一两约 37.3g，恰约为汉代 15.6g 的 2.4 倍，「古之一两今用一钱（约 3.7g）」正是基于两朝权衡差异的折算经验。',
      transfer: '读到唐代《千金要方》某方「某药一两」，若不知唐大两与汉两之别就直接按 15g 起用，风险在哪里？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 安全窗口与高危药警戒（003–006）
  // ============================================================
  {
    id: 'pb13-m-003', title: '剂量·常用药单次剂量安全窗口', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['方剂剂量', '安全窗口', '药典剂量', '常用药'],
    intent: '掌握《中国药典》常用药单次煎服剂量范围，理解剂量安全窗口之内为治疗量、超量为风险量的基本原则。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.decoction', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '药典常用量即单次安全窗口：麻黄 2-9g、桂枝 3-9g、石膏 15-60g（先煎）、附子 3-15g（先煎久煎）、细辛 1-3g、甘草 2-10g、黄芪 9-30g、当归 6-12g、大黄 3-15g（后下）、苦杏仁 3-10g。峻烈药从下限起步。', caution: '安全窗口以药典为法定基准，超量即进入毒副作用区间：麻黄过量心悸汗脱，附子过量乌头碱中毒，细辛过量呼吸麻痹；甘草大剂量久服致水钠潴留、血压升高。' },
    cases: null,
    stdJudgment: '《中国药典》规定的常用剂量范围即单次剂量安全窗口：麻黄 2-9g、附子 3-15g、细辛 1-3g、石膏 15-60g 等均须按窗口起量。窗口之内为治疗量，超量进入毒副区间，峻烈药一律从下限起始、中病即止。',
    coreDefinition: '单次剂量安全窗口指药典法定常用量区间，如麻黄 2-9g、附子 3-15g、细辛 1-3g；窗口下限为有效起步量，上限为安全极量，超量即毒性区间。',
    safety: { note: '安全窗口以药典为准绳，超量使用须有充分依据并加强监护；麻黄、附子、细辛等峻药从下限起量，中病即止，不与含麻黄碱制剂叠加。', prohibitions: [] },
    learning: {
      knowledge: '《中国药典》常用量即单次安全窗口：解表药麻黄 2-9g、桂枝 3-9g；清热药石膏 15-60g（打碎先煎）、黄连 2-5g；补益药黄芪 9-30g、当归 6-12g、甘草 2-10g；泻下药大黄 3-15g（后下）；化痰止咳药苦杏仁 3-10g；温里药附子 3-15g（先煎久煎）、细辛 1-3g。窗口下限为有效量、上限为安全极量；峻烈药（附子、细辛、麻黄、甘遂类）一律从下限起步，中病即止。',
      misjudgment: '认为「剂量大疗效强」，把细辛、附子直接按窗口上限甚至超量使用。错：安全窗口上限是药典法定极量，细辛超量可致呼吸麻痹、附子超量致乌头碱中毒，剂量安全窗口优先于疗效追求。',
      reasoning: '同为温里药，为何附子单次窗口是 3-15g 而干姜可到 10g，二者毒性与煎法的差异如何影响窗口宽度？',
      feedback: '附子含乌头碱、须先煎久煎减毒，故窗口较窄且用法受限；干姜无毒、用量可稍大。毒性、炮制、煎法共同决定安全窗口的宽窄。',
      transfer: '遇到老人外感咳嗽，麻黄与苦杏仁同方配伍时，如何各自按窗口取值并照顾老人生理特点？',
    },
  },
  {
    id: 'pb13-m-004', title: '剂量·细辛用量警戒', category: 'formula', difficulty: 4, difficultyLabel: '高危',
    riskTags: ['方剂剂量', '细辛', '有毒', '十八反', '用量警戒'],
    intent: '掌握细辛煎剂与散剂的不同限量（煎剂 1-3g、散剂 0.5-1g），理解「细辛不过钱」的本义并牢记反藜芦红线。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.toxicity', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.incompatibility', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '细辛煎服 1-3g；研末吞服每次 0.5-1g；外用适量，可研末吹鼻或调敷。入汤剂宜后下或短煎以减少挥发油散失，但总量不得超出 3g 窗口。', caution: '反藜芦（十八反）；气虚多汗、阴虚阳亢头痛、肺燥干咳者忌用；散剂吞服绝对不可超过 1g，「细辛不过钱」即指散剂；过量可致口唇麻木、呕吐、呼吸麻痹等中毒表现。' },
    cases: null,
    stdJudgment: '细辛煎剂限量 1-3g、散剂每次 0.5-1g，为《中国药典》法定窗口；「细辛不过钱」本指研末单用不可过一钱（约 3g），煎剂受热挥发油散失而毒性降低，仍以 3g 为度。反藜芦，散剂过量可致呼吸麻痹。',
    coreDefinition: '细辛有毒，煎剂 1-3g、散剂 0.5-1g；「细辛不过钱」指散剂单用不可过一钱。含挥发油（黄樟醚），过量先中枢兴奋后麻痹，反藜芦。',
    safety: { note: '细辛为目录高危药：煎剂 1-3g、散剂 0.5-1g，散剂过量或单味久服易中毒；气虚、阴虚火旺者忌用；反藜芦，不与藜芦同方。', prohibitions: ['【高风险】煎剂1-3g散剂0.5-1g，过量可致中毒；反藜芦'] },
    learning: {
      knowledge: '细辛煎服 1-3g、研末吞服每次 0.5-1g（《中国药典》）。「细辛不过钱」出自宋代陈承《本草别说》「细辛若单用末，不可过一钱」，指散剂单用限量；入煎剂挥发油受热散失，毒性低于散剂，但仍以 1-3g 为度。主治风寒头痛、鼻渊鼻塞、牙痛、寒痰咳喘，配伍麻黄附子治少阴病反发热（麻黄细辛附子汤）。过量中毒表现：口唇麻木、心悸、呕吐，重者呼吸中枢麻痹。反藜芦。',
      misjudgment: '把「细辛不过钱」理解为煎剂也不能超过 3g 而一律不用。错：「不过钱」指研末单用，煎剂 1-3g 属法定范围；反之若散剂吞服超过 1g 则确有中毒风险，剂型不同限量不同，不可一概而论。',
      reasoning: '细辛单用研末与入煎剂，为何中毒风险相差悬殊？',
      feedback: '散剂直接吞服，挥发油（黄樟醚）全量入体、吸收完全，毒性最强；煎剂久煎受热使挥发油散失、毒性成分水解，故窗口放宽，但 3g 仍是上限。',
      transfer: '少阴病发热脉沉的麻黄细辛附子汤中，细辛用量与煎法应如何把握才不越警戒线？',
    },
  },
  {
    id: 'pb13-m-005', title: '剂量·附子用量与先煎久煎', category: 'formula', difficulty: 4, difficultyLabel: '高危',
    riskTags: ['方剂剂量', '附子', '有毒', '先煎', '十八反'],
    intent: '掌握附子煎服 3-15g 的法定剂量与炮制先煎久煎至无麻辣感的减毒要求，牢记反半夏瓜蒌贝母白蔹白及与孕妇禁用红线。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.toxicity', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.incompatibility', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.decoction', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '附子煎服 3-15g（《中国药典》），一律用炮制品（黑顺片、白附片、淡附片等），须先煎 30-60 分钟以上、久煎至口尝无麻辣感为度，再与他药同煎。回阳救逆重症可短期重用 15g 以上，须加倍先煎时间并密切监护。', caution: '反半夏、瓜蒌、贝母、白蔹、白及（乌头类十八反）；孕妇禁用；生附子只供外用，内服必须炮制；先煎不足、口有麻辣感即提示乌头碱未充分水解，不得服用。' },
    cases: null,
    stdJudgment: '附子煎服 3-15g，须炮制后先煎久煎至口尝无麻辣感，使双酯型乌头碱水解为毒性低的单酯型方可用；反半夏瓜蒌贝母白蔹白及，孕妇禁用，生品禁内服。先煎时间不足是附子中毒最常见原因。',
    coreDefinition: '附子辛甘大热有毒，煎服 3-15g，炮制后先煎 30-60 分钟以上至无麻辣感；回阳救逆、补火助阳、散寒止痛。反半夏瓜蒌贝母白蔹白及，孕妇禁用。',
    safety: { note: '附子为目录高危药：必须炮制、先煎久煎至无麻辣感，否则乌头碱中毒（口舌麻木、心律失常、呼吸抑制）；反半夏瓜蒌贝母白蔹白及；孕妇禁用；生附子禁内服。', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用'] },
    learning: {
      knowledge: '附子煎服 3-15g（《中国药典》），内服必须用炮制品并先煎 30-60 分钟以上、久煎至口尝无麻辣感，以促乌头碱水解减毒。功效回阳救逆（亡阳证配干姜、甘草如四逆汤）、补火助阳（肾阳虚配肉桂、熟地黄）、散寒止痛（寒痹配桂枝、白术）。重用 15g 以上须先煎更久并监护。反半夏、瓜蒌、贝母、白蔹、白及；孕妇禁用。生附子有大毒，只作外用。',
      misjudgment: '附子未经久煎、尝有麻辣感即服用，或与半夏同方。错：麻辣感提示乌头碱未水解完全，服之可致心律失常甚至死亡；与半夏同用犯十八反，均属致命失误。',
      reasoning: '四逆汤回阳救逆为何重用生附子力峻，而现代处方多用制附子且先煎久煎？',
      feedback: '生附子峻烈取速效但毒性大，古法以「久煎」控毒；现代药典以制附子 3-15g 为法定窗口、先煎久煎保安全，毒性管理优先于药力峻烈。',
      transfer: '患者真武汤证兼见呕吐，附子与半夏在方中相遇时，配伍禁忌与辨证需求应如何处理？',
    },
  },
  {
    id: 'pb13-m-006', title: '剂量·峻下逐水药丸散用量（甘遂大戟芫花）', category: 'formula', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['方剂剂量', '甘遂', '大戟', '芫花', '有毒', '十八反', '丸散'],
    intent: '掌握甘遂、大戟、芫花三味峻下逐水药的丸散限量与醋制减毒要求，理解十枣汤的服法警戒并牢记反甘草红线。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.toxicity', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.incompatibility', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.decoction', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '甘遂（醋制）入丸散每次 0.5-1.5g；京大戟煎服 1.5-3g、入丸散每次约 1g（醋制）；芫花（醋制）煎服 1.5-3g、入丸散每次约 0.6g。十枣汤以三药各等分研末，大枣煎汤调服 0.5-1g，清晨空腹顿服，得快下利后糜粥自养。', caution: '三药均反甘草（十八反）；均孕妇禁用、体虚及老弱者忌用；醋制减毒，生品不入药；中病即止、不可久服，下利过度须急止（服冷粥或对症处理）。' },
    cases: null,
    stdJudgment: '甘遂、大戟、芫花为峻下逐水猛药，甘遂 0.5-1.5g 入丸散，大戟、芫花煎服 1.5-3g 而丸散量更小，均须醋制减毒；三药反甘草、孕妇禁用、体虚忌用。十枣汤枣汤调服 0.5-1g、清晨空腹、得快利即止。',
    coreDefinition: '甘遂 0.5-1.5g、大戟煎 1.5-3g（丸散约 1g）、芫花煎 1.5-3g（丸散约 0.6g），均醋制入丸散为主；峻下逐水、消肿散结，反甘草，孕妇禁用，体虚忌用。',
    safety: { note: '甘遂、大戟、芫花均属目录高危药：峻下逐水力猛，只宜丸散小量、醋制减毒，中病即止；三药皆反甘草（十八反）；孕妇禁用、虚人忌用，下利不止须急固护胃气。', prohibitions: ['甘遂【高风险】0.5-1.5g入丸散；反甘草；孕妇禁用', '大戟【高风险】反甘草；孕妇禁用；峻下逐水虚人忌用', '芫花【高风险】反甘草；孕妇禁用；峻下逐水虚人忌用'] },
    learning: {
      knowledge: '三味峻下逐水药均须醋制减毒：甘遂入丸散 0.5-1.5g；京大戟煎服 1.5-3g、入丸散每次约 1g；芫花煎服 1.5-3g、入丸散每次约 0.6g（《中国药典》）。十枣汤证（悬饮、水肿腹胀）以甘遂、大戟、芫花各等分研末，大枣十枚煎汤调服 0.5-1g，清晨空腹，得快下利后糜粥自养以护胃气。三药均反甘草，孕妇禁用，体虚、老弱者忌用，中病即止。',
      misjudgment: '把甘遂、大戟、芫花按普通利水药煎汤重用，或与甘草同方。错：三药为毒性峻下药，煎剂吸收快、泻下过猛可致虚脱，必须入丸散小量并醋制；与甘草同用犯十八反，可增毒致死。',
      reasoning: '十枣汤证水饮壅盛，为何三味逐水药不煎汤而研末枣汤调服、且强调清晨空腹？',
      feedback: '丸散小量使药力缓释集中、避免煎剂过猛；清晨空腹便于药力专行攻逐水饮；枣汤护脾胃；得快利即止、糜粥自养，全程以「中病即止」控险。',
      transfer: '肝硬化腹水患者形体尚实而正气渐虚，若用甘遂类攻逐，剂量、服法与固护正气应如何统筹？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 特殊人群与个体化（007–008）
  // ============================================================
  {
    id: 'pb13-m-007', title: '剂量·儿童剂量折算（年龄与体重法）', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['方剂剂量', '儿童', '剂量折算', '体重法', '年龄法'],
    intent: '掌握儿童用药按年龄与体重折算成人剂量的方法，理解小儿脏腑娇嫩对剂量敏感的特点。',
    facts: [
      { field: 'formula.dosageConvert', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosageConvert', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '年龄折算法：新生儿约成人量 1/10；1-6 个月 1/14-1/7；6 个月-1 岁 1/7-1/5；1-2 岁 1/5-1/4；2-4 岁 1/4-1/3；4-6 岁 1/3-2/5；6-9 岁 2/5-1/2；9-14 岁 1/2-2/3。体重法：小儿剂量=成人剂量×小儿体重(kg)/50。体表面积法：小儿剂量=成人剂量×小儿体表面积(m²)/1.73，为较精确方法。', caution: '毒性药、峻猛药（附子、细辛、甘遂类）小儿尤须从严减量或避免使用；新生儿肝肾功能未成熟，慎用苦寒攻伐及含毒性成分之品；折算结果仍须结合个体体质微调。' },
    cases: null,
    stdJudgment: '儿童剂量折算以年龄与体重为两大基准：新生儿约成人量 1/10，随龄递增，9-14 岁至 1/2-2/3；体重法按小儿体重除以 50 乘成人量；体表面积法最为精确。小儿脏腑娇嫩、对毒性药敏感，峻烈药减量从严。',
    coreDefinition: '儿童剂量=成人剂量按年龄折算（新生儿 1/10 起随龄递增至 2/3）或按体重（kg/50）折算，体表面积法最准；毒性峻猛药小儿从严。',
    safety: { note: '小儿对毒性药敏感，细辛、附子、甘遂、朱砂等原则上不用于婴幼儿；折算剂量须结合体质与病情，峻药宁可不足不可过量，并加强用药后观察。', prohibitions: [] },
    learning: {
      knowledge: '儿童剂量折算：年龄法按新生儿约成人 1/10、1-6 个月 1/14-1/7、6 个月-1 岁 1/7-1/5、1-2 岁 1/5-1/4、2-4 岁 1/4-1/3、4-6 岁 1/3-2/5、6-9 岁 2/5-1/2、9-14 岁 1/2-2/3；体重法为成人剂量×小儿体重(kg)/50；体表面积法为成人剂量×小儿体表面积(m²)/1.73，最为精确。小儿脏腑娇嫩、形气未充，对附子、细辛、麻黄等峻药敏感，应减量从严并注意煎服法。',
      misjudgment: '把小儿当「缩小版成人」，按成人剂量减半甚至原量给药。错：儿童肝肾功能与代谢未成熟，体重法/体表面积法才是量化依据，凭感觉减量或超量均可致无效或中毒，毒性药更须从严。',
      reasoning: '同为 4 岁患儿，按年龄折算法约取成人 1/3，按体重法若体重 20kg 则取 2/5，两种方法结果不同时应以何者为准？',
      feedback: '体表面积法兼顾体重与身长、更接近生理药代，结果偏大者多见于肥胖儿；两种方法取较安全值，峻药再打折，并随病程调整。',
      transfer: '一岁幼儿外感高热咳嗽，麻黄、苦杏仁若要用，剂量应取成人量几成、煎法有何讲究？',
    },
  },
  {
    id: 'pb13-m-008', title: '剂量·老人与体虚者剂量调整', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['方剂剂量', '老人', '体虚', '剂量调整'],
    intent: '掌握 60 岁以上老人及久病体虚者用药量的下调原则，理解攻邪药与补益药在特殊人群中的剂量差异。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '60 岁以上老人及久病体虚者，一般用药量为成人量的 2/3-3/4 起步；攻邪峻猛药（发汗、泻下、逐水、破血）减量更甚或慎用；补益药可按常量或稍增量，但仍须小剂量试探、逐步加量。', caution: '老人肝肾代谢与排泄减慢，药物半衰期延长，超量蓄积风险高；峻下、大辛大热、大苦大寒之剂伤正，体虚者尤须顾护胃气；血压、心肾功能异常者慎用麻黄、附子等。' },
    cases: null,
    stdJudgment: '老人与体虚者用药量一般为成人量的 2/3-3/4 起步，攻邪峻猛药减量更甚或避用，补益药亦宜小量试探、渐加至效。老人生理功能衰减、代谢排泄减慢，剂量个体化比机械套量更重要。',
    coreDefinition: '60 岁以上及体虚者：一般药取成人量 2/3-3/4 起步，峻猛攻邪药再减或慎用，补益药小量递增；个体化是核心。',
    safety: { note: '老人与体虚者正气不足、脏腑功能衰减，麻黄、附子、甘遂类峻药尤须减量或禁用；含麻黄制剂与降压药同用须监测血压；处方以小剂量试探、中病即止为原则。', prohibitions: [] },
    learning: {
      knowledge: '60 岁以上老人及久病体虚者，一般药量取成人量的 2/3-3/4 起步；峻猛攻邪药（麻黄发汗、大黄芒硝泻下、甘遂大戟芫花逐水、三棱莪术破血）减量更甚或慎用，以免伤正；补益药（黄芪、党参、熟地黄、当归）可足量但宜小量递增。老人肝肾代谢与排泄减慢、药物蓄积风险高，剂量调整应个体化，攻补之间以顾护胃气为先。',
      misjudgment: '老人体虚「虚则补之」，补益药一味加量或攻邪药按青壮年常量。错：补益过度可壅滞碍胃，攻邪过量则正气更虚；老人用药以「轻灵和缓、小量试探」为要，量效关系须个体化。',
      reasoning: '同一剂补中益气汤，青壮年与七旬老人用量同为常量时，为何老人更易出现腹胀、虚火上浮？',
      feedback: '老人脾运与代谢减慢，补药壅滞更易成胀、虚不受补；减量或配伍理气药（陈皮、砂仁）可使补而不滞，剂量与配伍须同步调整。',
      transfer: '八旬老人便秘，麻子仁丸与大黄的取舍及用量应如何考虑体虚因素？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 煎法与剂型维度（009–010）
  // ============================================================
  {
    id: 'pb13-m-009', title: '剂量·煎煮法对剂量影响（先煎后下包煎另煎）', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['方剂剂量', '煎煮法', '先煎', '后下', '包煎', '另煎'],
    intent: '掌握先煎、后下、包煎、另煎等特殊煎法对有效成分溶出与实际用量的影响，能按药物性质选择正确煎法。',
    facts: [
      { field: 'formula.decoction', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.decoction', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '先煎：矿石贝壳类（石膏 15-60g、龙骨、牡蛎、磁石、石决明）打碎先煎 20-30 分钟再入他药；附子先煎 30-60 分钟以上至无麻辣感。后下：薄荷、砂仁、豆蔻、钩藤、大黄（取泻下）于第一煎将成时下入，再煎 5-10 分钟。包煎：旋覆花、车前子、葶苈子、辛夷用布袋包好再煎。另煎：人参、西洋参等贵重药另煎 30-60 分钟取汁兑服。', caution: '后下药久煎则挥发油散失、泻下成分破坏而效减；旋覆花等带绒毛药不包煎刺激咽喉致咳；附子先煎不足仍具毒性；另煎药与他药同煎可被药渣吸附而浪费贵重成分。' },
    cases: null,
    stdJudgment: '煎法直接决定实际摄入药量：矿石贝壳类先煎 20-30 分钟促溶出，附子先煎久煎为减毒；芳香药与大黄、钩藤后下防成分破坏；旋覆花、车前子等包煎防刺激；人参类另煎防有效成分被药渣吸附。煎法失当，纸上剂量与实际药量脱节。',
    coreDefinition: '先煎（矿石贝壳与附子）、后下（芳香与大黄钩藤）、包煎（绒毛与黏滑药）、另煎（贵重药）四法保证有效成分充分溶出或避免破坏，使标定剂量等于实际摄入量。',
    safety: { note: '附子必须先煎久煎至无麻辣感方可用；旋覆花、辛夷不包煎可刺激咽喉；含挥发性成分药久煎效减，煎法错误可致「有量无效」或「有量有毒」。', prohibitions: [] },
    learning: {
      knowledge: '煎煮法影响实际药量：矿石贝壳类（石膏 15-60g、龙骨、牡蛎、磁石）质地坚硬，须打碎先煎 20-30 分钟使成分溶出；附子先煎 30-60 分钟以上至无麻辣感以减毒。芳香药（薄荷、砂仁、豆蔻）与钩藤、大黄（取泻下）后下，于第一煎将成时投入再煎 5-10 分钟，防挥发油与有效成分破坏。旋覆花、车前子、葶苈子、辛夷包煎，防绒毛刺激咽喉、防沉底焦糊。人参、西洋参另煎 30-60 分钟兑服，防有效成分被其他药渣吸附。',
      misjudgment: '把薄荷、砂仁与群药同煎 30 分钟，或把石膏不先煎直接同煎。错：芳香药久煎挥发油尽失、药效殆尽，石膏不先煎溶出不足、清热力大减；煎法错则剂量虽标而实效打折。',
      reasoning: '同为清热药，石膏需先煎 20-30 分钟而黄连直接同煎即可，二者溶出特性差异何在？',
      feedback: '石膏为硫酸钙矿物、水溶性差，需久煎促溶；黄连为植物根茎、生物碱易溶，短煎即可；煎法设计以溶出特性为依据。',
      transfer: '方中同含人参、附子、大黄、旋覆花时，四种特殊煎法如何在一锅中统筹安排？',
    },
  },
  {
    id: 'pb13-m-010', title: '剂量·剂型与剂量换算（丸散汤膏）', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['方剂剂量', '剂型', '丸散汤膏', '剂量换算'],
    intent: '掌握汤、丸、散、膏各剂型的单次用量特点与换算关系，理解毒性药多入丸散且限量更严的原则。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosageConvert', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '汤剂吸收快、作用强，按药典煎服量给药；水丸每次 3-6g，大蜜丸每丸 9g 每次 1 丸、一日 2-3 次，浓缩丸按说明书每次 8-10 丸；散剂每次 1.5-3g 冲服；煎膏剂（膏方）每次 15-30g 开水冲服。毒性药入丸散须按极量：细辛 0.5-1g、朱砂 0.1-0.5g、巴豆霜 0.1-0.3g。', caution: '丸散剂吸收慢而持久，不可按汤剂量折算吞服，否则毒性蓄积；含毒丸散（如六神丸、磁朱丸）按粒/按丸服，不可加量；膏方含糖滋腻，糖尿病患者慎用。' },
    cases: null,
    stdJudgment: '剂型决定剂量基准：汤剂按药典常量、吸收快作用强；丸剂（水丸 3-6g、蜜丸 9g 每次 1 丸）作用缓和持久；散剂每次 1.5-3g；膏剂每次 15-30g 冲服。毒性药多入丸散且限量远严于汤剂，如细辛散剂 0.5-1g、朱砂 0.1-0.5g。',
    coreDefinition: '汤丸散膏各有用量基准：汤剂常量、水丸 3-6g、蜜丸 9g/次、散剂 1.5-3g、膏剂 15-30g；毒性药入丸散按极量（细辛 0.5-1g、朱砂 0.1-0.5g、巴豆霜 0.1-0.3g）。',
    safety: { note: '含毒丸散必须按粒/按丸限量服用，不可按汤剂量折算加量；朱砂、巴豆霜、雄黄等只入丸散不入煎剂；散剂吞服吸收完全，细辛、甘遂等限量从严。', prohibitions: [] },
    learning: {
      knowledge: '剂型与剂量换算：汤剂吸收快、作用强，按《中国药典》煎服量；丸剂作用缓和持久，水丸每次 3-6g、大蜜丸每丸 9g 每次 1 丸、浓缩丸每次 8-10 丸（按说明书）；散剂每次 1.5-3g（如六一散、七厘散），温水调服；煎膏剂（膏方）每次 15-30g 开水冲服，一日 2-3 次。毒性药多入丸散且限量从严：细辛散剂 0.5-1g、朱砂 0.1-0.5g（忌火煅）、巴豆霜 0.1-0.3g。',
      misjudgment: '把丸散按汤剂等量折算吞服，例如以为「汤剂细辛 3g 可用，散剂 3g 也无妨」。错：散剂吸收完全、毒性成分不经煎煮破坏，细辛散剂限量 0.5-1g，按汤剂量吞服可致中毒；丸散剂量体系独立于汤剂。',
      reasoning: '同一味细辛，汤剂可用 1-3g 而散剂仅 0.5-1g，剂型改变为何剂量窗口随之收窄？',
      feedback: '煎煮使挥发油等毒性成分散失、吸收减慢，汤剂窗口放宽；散剂原粉直接入胃、吸收完全且不经减毒，故限量近乎减半，剂型与剂量必须联动。',
      transfer: '同为通便，大黄入汤剂 3-15g 后下取泻下，若制成大黄丸剂长期调治便秘，剂量与服法应如何换算？',
    },
  },
];
