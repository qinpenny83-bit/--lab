// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part C（C 经络学 10 节点 pb41-c-001 ~ pb41-c-010）
// 学科：C 经络学（补足学科上限批次）
// 覆盖：经络辨证与归经用药 / 手太阴肺经循行原文 / 足阳明胃经循行原文 /
//       手少阳三焦经循行原文 / 冲脉循行与病候 / 带脉循行与病候 /
//       阳跷脉阴跷脉病候 / 十二经筋病候与治疗 / 络脉病证与刺络 /
//       经络气血流注与开阖枢
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 沿用 batch-2 样例的 'theory'；classics 逐字核对白名单条目
// 三个「经脉循行」节点侧重循行原文细节与病候，与既有单经总览节点区分
// 难度分布：简单3（001/006/007）中等3（002/005/009）困难2（003/008）易混综合2（004/010）
// ============================================================

export const PART_C = [
  // ============================================================
  // C 经络学 · 经络辨证与归经用药（001）
  // ============================================================
  {
    id: 'pb41-c-001', title: '经络·经络辨证与归经用药', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['经络辨证', '归经用药', '引经药', '归经三法'],
    intent: '掌握按病位、症候与脏腑病机归经的辨证路径，理解药物归经与引经药的导向作用。',
    facts: [
      { field: 'meridian.bianzheng.threePaths', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.guijing.drugEntry', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.yinjing.herb', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.clinical.apply', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '归经与引经属用药导向理论，本节点不涉及具体剂量', caution: '引经药在方中多作佐使、用量宜轻，实际剂量以处方规范为准' },
    cases: null,
    stdJudgment: '归经辨证沿病位所在经脉、症候特点与脏腑病机三条路径判定病经，归经用药据此选取入病经之药并以引经药导向，如太阳经头痛用羌活、阳明经头痛用白芷，辨证与用药互为表里。',
    coreDefinition: '经络辨证按病位与症候归属经脉，归经用药选入病经之药并配引经药直达病所，辨经与选药相合而处方有据。',
    safety: { note: '经络辨证与归经用药为理论应用内容，不涉及直接操作风险；归经判断须四诊合参，避免以单一症状定经。', prohibitions: [] },
    learning: {
      knowledge: '归经辨证三法：按病位归经（齿痛属阳明、胁痛属少阳厥阴、巅顶痛属厥阴），按症候特点归经（情志抑郁善太息属肝、心悸失眠属心），按脏腑病机归经（咳喘胸满属肺、腹胀便溏属脾胃）。归经用药如柴胡入少阳、白芷入阳明、羌活入太阳、细辛入少阴、吴茱萸入厥阴、苍术入太阴。引经药在方中起导向作用：太阳经病加羌活、阳明经病加白芷升麻、少阳经病加柴胡、太阴经病加苍术、少阴经病加细辛、厥阴经病加吴茱萸。',
      misjudgment: '把引经药当作主药重用。错：引经药属佐使，引导全方药力趋向病经，用量宜轻，重用则喧宾夺主、改变方义。',
      reasoning: '同为头痛，为何太阳经病首选羌活、阳明经病首选白芷？',
      feedback: '羌活辛温入膀胱经，为太阳经引经与祛风止痛要药；白芷入阳明经，善治前额眉棱骨痛，两药各随病经而用。',
      transfer: '若患者巅顶痛属厥阴肝经，处方中可配何引经药？',
    },
  },
  // ============================================================
  // C 经络学 · 手太阴肺经经脉循行（002）
  // ============================================================
  {
    id: 'pb41-c-002', title: '经络·手太阴肺经经脉循行', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['肺经循行', '起于中焦', '是动病', '所生病', '支脉交接'],
    intent: '逐句研读《灵枢·经脉》肺经原文，掌握起止、属络、支脉交接与病候归类。',
    facts: [
      { field: 'meridian.feijing.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.feijing.zhizhi', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.feijing.ishidong', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.feijing.suosheng', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '肺手太阴之脉', canon: '《灵枢·经脉》', chapter: '经脉第十', originalText: '肺手太阴之脉，起于中焦，下络大肠，还循胃口，上膈属肺', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '循行原文解读属理论内容，不涉及用药剂量', caution: '循行定位用于归经辨证与循经取穴，不直接涉及刺灸操作' },
    cases: null,
    stdJudgment: '肺经起于中焦、下络大肠、还循胃口、上膈属肺，从肺系横出腋下，行上肢内侧前缘，出大指之端，支脉自腕后直出次指内廉交大肠经，是动病见肺胀喘咳缺盆痛。',
    coreDefinition: '手太阴肺经起于中焦，属肺络大肠，沿上肢内侧前缘至拇指端，支脉交次指端接大肠经，主胸肺咽喉病与上肢内侧前缘之痛。',
    safety: { note: '循行与病候为理论内容，不涉及直接操作风险；病候用于归经辨证，须四诊合参。', prohibitions: [] },
    learning: {
      knowledge: '原文逐句：起于中焦——中焦为脾胃受纳水谷、化生气血之所，故肺主一身之气本于中焦；下络大肠、还循胃口、上膈属肺，从肺系横出腋下，循臑内行少阴心主之前，下肘中循臂内上骨下廉，入寸口（脉会太渊所在），上鱼循鱼际出大指之端；其支者从腕后直出次指内廉出其端，交于手阳明大肠经。是动病：肺胀满膨膨而喘咳，缺盆中痛。所生病：咳上气喘喝、烦心胸满、臑臂内前廉痛厥、掌中热；气有余则肩背痛汗出，气虚则肩背痛寒、少气不足以息、溺色变。',
      misjudgment: '认为肺经起于鼻。错：鼻为肺窍但非肺经起点，肺经起于中焦，正因为起于中焦，肺经才与脾胃化生之气相通，气血流注亦自肺经始。',
      reasoning: '肺经为何不直接起于肺脏而强调起于中焦？',
      feedback: '中焦为气血生化之源，肺主一身之气、朝百脉，肺经之气本于中焦水谷精微，故起于中焦，十二经流注亦以肺经为始。',
      transfer: '肺经支脉在何处交于手阳明大肠经？',
    },
  },
  // ============================================================
  // C 经络学 · 足阳明胃经经脉循行（003）
  // ============================================================
  {
    id: 'pb41-c-003', title: '经络·足阳明胃经经脉循行', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['胃经循行', '起于鼻交頞中', '属胃络脾', '骭厥', '消谷善饥'],
    intent: '逐句研读胃经原文，掌握头面、躯干、下肢三段循行与是动所生病候的对应关系。',
    facts: [
      { field: 'meridian.weijing.courseHead', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.weijing.courseTrunk', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.weijing.ishidong', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.weijing.suosheng', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '胃足阳明之脉', canon: '《灵枢·经脉》', chapter: '经脉第十', originalText: '胃足阳明之脉，起于鼻，交頞中，旁约太阳之脉，下循鼻外，入上齿中，还出挟口，环唇', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '循行原文解读属理论内容，不涉及用药剂量', caution: '胃经循行沿线穴位（人迎、缺盆）操作时须防深刺，本节仅作理论研读' },
    cases: null,
    stdJudgment: '胃经起于鼻交頞中，循面入上齿环唇过客主人至额颅，分支属胃络脾，循乳夹脐抵气街，沿下肢外侧前缘下足跗入中趾内间，是动病见洒洒振寒、恶人与火、弃衣而走。',
    coreDefinition: '足阳明胃经起于鼻旁，属胃络脾，行于头面前额、胸腹正中旁开与下肢外侧前缘，为多气多血之经，主胃肠病与经脉所过之痛。',
    safety: { note: '胃经循行为理论内容；沿线人迎穴邻近颈动脉，缺盆邻近肺尖，涉足操作时须严守刺法规范。', prohibitions: [] },
    learning: {
      knowledge: '原文三段循行：头面——起于鼻交頞中，旁约太阳之脉，下循鼻外入上齿中，还出挟口环唇，下交承浆，却循颐后下廉出大迎，循颊车上耳前，过客主人，循发际至额颅。躯干——支者从大迎前下人迎，循喉咙入缺盆，下膈属胃络脾；直者从缺盆下乳内廉，下挟脐入气街中。下肢——下髀关抵伏兔，下膝膑中，循胫外廉，下足跗入中指内间，支者别跗上入大指间出其端。是动病：洒洒振寒、善呻数欠、颜黑，病至恶人与火、闻木声惕然而惊、独闭户塞牖，甚则欲上高而歌、弃衣而走、贲响腹胀，是为骭厥。所生病：衄、口㖞、唇胗、颈肿、喉痹、大腹水肿、膝膑肿痛；气盛则身以前皆热、消谷善饥、溺色黄，气虚则身以前皆寒栗、胃中寒则胀满。',
      misjudgment: '把胃经起点误记为目内眦。错：起于目内眦的是足太阳膀胱经，胃经起于鼻旁交頞中，头面部两条阳经起点相邻而不同。',
      reasoning: '胃经病候「恶人与火、闻木声则惕然而惊」，为何表现为阳热躁动之象？',
      feedback: '阳明为多气多血之经，热盛则阳气偏亢，神明受扰，故见恶人恶火、惊惕不安，甚则登高而歌、弃衣而走，属阳明热盛的典型病候。',
      transfer: '牙龈肿痛、消谷善饥多责阳明，据循行与病候应如何解释？',
    },
  },
  // ============================================================
  // C 经络学 · 手少阳三焦经经脉循行（004）
  // ============================================================
  {
    id: 'pb41-c-004', title: '经络·手少阳三焦经经脉循行', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['三焦经循行', '遍属三焦', '耳支脉', '三焦胆经易混'],
    intent: '逐句研读三焦经原文，掌握上肢外侧中线循行、绕耳两支脉与少阳经病候，辨析与胆经之异同。',
    facts: [
      { field: 'meridian.sanjiao.courseArm', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.sanjiao.courseEar', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.sanjiao.ishidong', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.sanjiao.suosheng', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《黄帝内经》', canon: '灵枢', chapter: '经脉第十', originalText: '三焦手少阳之脉，起于小指次指之端，上出两指之间，循手表腕，出臂外两骨之间，上贯肘', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '循行原文解读属理论内容，不涉及用药剂量', caution: '三焦经沿线穴位（翳风深部近茎乳孔、肩井近肺尖）涉足操作时须防深刺' },
    cases: null,
    stdJudgment: '三焦经起于无名指端，循上肢外侧中线过肩入缺盆，布膻中散络心包遍属三焦，一支系耳后出耳上角，一支入耳中出耳前至目锐眦，是动病见耳聋浑浑焞焞、嗌肿喉痹。',
    coreDefinition: '手少阳三焦经起于无名指端，沿上肢外侧中线上行，入缺盆布膻中、遍属三焦，两支脉绕耳前后，主耳病、咽喉病与上肢外侧之痛。',
    safety: { note: '三焦经循行为理论内容；翳风穴深部近茎乳孔、肩井穴近肺尖，涉足操作须严守刺法规范。', prohibitions: [] },
    learning: {
      knowledge: '原文逐句：起于小指次指之端（无名指端），上出两指之间，循手表腕，出臂外两骨之间，上贯肘，循臑外上肩，交出足少阳之后，入缺盆，布膻中，散络心包，下膈，遍属三焦。其支者：从膻中上出缺盆，上项，系耳后直上，出耳上角，以屈下颊至䪼。其支者：从耳后入耳中，出走耳前，过客主人前，交颊，至目锐眦。是动病：耳聋浑浑焞焞，嗌肿，喉痹。所生病：汗出，目锐眦痛，颊痛，耳后肩臑肘臂外皆痛，小指次指不用。三焦与胆经皆属少阳：三焦行上肢外侧中线、胆经行下肢外侧中线，两支脉皆绕耳前后，故少阳经病多现耳病、偏头痛。',
      misjudgment: '把「遍属三焦」误记为「络三焦」。三焦经下膈后遍属三焦（属三焦）、散络心包，属络关系须与心包经互为表里对照记忆。',
      reasoning: '三焦经与胆经同属少阳，为何耳鸣耳聋与偏头痛可同取两经穴位？',
      feedback: '手足少阳经气相通、共绕耳前后，少阳主枢、经气不利则耳窍失聪、头侧掣痛，故取三焦经翳风中渚、胆经听会侠溪同用。',
      transfer: '外关为三焦经络穴，偏头痛为何常以之外关配足临泣？',
    },
  },
  // ============================================================
  // C 经络学 · 冲脉循行与病候（005）
  // ============================================================
  {
    id: 'pb41-c-005', title: '经络·冲脉循行与病候', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['冲脉循行', '十二经之海', '血海', '气逆里急', '奔豚'],
    intent: '掌握冲脉起止循行、十二经之海与血海之称号及气逆、妇科病候。',
    facts: [
      { field: 'meridian.chong.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.chong.seaTitle', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.chong.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.chong.qiNi', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '冲脉者', canon: '《素问·骨空论》', chapter: '骨空论篇第六十', originalText: '冲脉者，起于气街，并少阴之经，侠脐上行，至胸中而散', sourceTitle: '《素问·骨空论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '冲脉理论不涉及用药剂量', caution: '冲脉病候之气逆里急须与奔豚气、疝气鉴别，临床辨证为准' },
    cases: null,
    stdJudgment: '冲脉起于气街，并足少阴之经侠脐上行至胸中而散，上出于颃颡渗诸阳、下注少阴大络渗三阴，为十二经之海与血海，病候以气逆里急、月经不调、崩漏不孕为要。',
    coreDefinition: '冲脉起于气街并足少阴上行，至胸中而散，贯上下而主血，称十二经之海、血海，主月经与气逆之病。',
    safety: { note: '冲脉理论用于解释妇科与气逆病机；冲脉病候提示临床须排除癥瘕、疝气等器质病变。', prohibitions: [] },
    learning: {
      knowledge: '循行：起于气街（气冲穴处），并足少阴肾经侠脐上行，至胸中而散；《灵枢·逆顺肥瘦》云其上者出于颃颡、渗诸阳、灌诸精，其下者注少阴大络、出于气街、循阴股内廉、入腘中、下至内踝之后、渗三阴。功能：贯通上下、通行十二经气血，为十二经之海；与血室（子宫）相关、主女子月经孕育，为血海。病候：气逆里急、腹痛、月经不调、崩漏、不孕、癥瘕，气从少腹上冲胸咽之奔豚。冲脉失调与肝、肾、脾胃气机相关。',
      misjudgment: '把冲脉「并少阴之经」误记为并阳明之经。冲脉并足少阴肾经上行，正因与肾经相并，冲脉病常伴肾虚腰酸、气逆奔豚。',
      reasoning: '冲脉为何既称十二经之海又称血海？',
      feedback: '冲脉贯上下、通行诸经气血，故为十二经之海；又起于胞中、主女子月经与孕育，故称血海，一名二义各有依据。',
      transfer: '女子月经不调兼气从少腹上冲，据冲脉病候应如何解释病机？',
    },
  },
  // ============================================================
  // C 经络学 · 带脉循行与病候（006）
  // ============================================================
  {
    id: 'pb41-c-006', title: '经络·带脉循行与病候', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['带脉循行', '回身一周', '带脉失约', '带下', '如坐水中'],
    intent: '掌握带脉起于季胁环腰一周的循行特点、约束诸经之功能与带下腰软病候。',
    facts: [
      { field: 'meridian.dai.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.dai.beltFunction', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.dai.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.dai.acupoints', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《难经》', canon: '《难经》', chapter: '二十八难', originalText: '带脉者，起于季胁，回身一周', sourceTitle: '《难经》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '带脉理论不涉及用药剂量', caution: '带下病辨证须分寒热虚实，带脉穴操作按常规取穴' },
    cases: null,
    stdJudgment: '带脉起于季胁，斜向下行环腰一周如束带然，约束纵行诸经，失约则带下量多、腰腹纵弛如坐水中、腰酸软无力，为妇科带下病之理论根基。',
    coreDefinition: '带脉起于季胁章门处，斜向下行经带脉、五枢、维道，环腰一周，约束纵行诸经，主带下与腰腹弛纵之病。',
    safety: { note: '带脉理论用于解释妇科与腰腹病机；带脉穴位于侧腹部，操作按常规刺法。', prohibitions: [] },
    learning: {
      knowledge: '循行：《难经·二十八难》「带脉者，起于季胁，回身一周」；《灵枢·经别》言足少阴之正当十四椎出属带脉，即带脉与足少阳胆经在季胁部相交，环腰一周，如束带然。功能：约束纵行诸经，使经气上下运行有序而不下陷，兼司带下。病候：带脉失约则带下量多、腰腹纵弛、腰部酸软如坐水中、下肢痿软、月经不调；常用穴带脉（足少阳胆经）、五枢、维道。临床治疗带下、经带胎产诸疾多取带脉穴并配任脉、脾肝肾经穴。',
      misjudgment: '认为带脉只是一条「束腰的环带」而忽略其穴位归属。带脉为奇经之一，属足少阳经带脉、五枢、维道三穴所在，为约束诸经之横脉，有穴可刺、有病可治。',
      reasoning: '带脉为何能「约束」纵行诸经？',
      feedback: '带脉横束腰腹、环身一周，纵行诸经皆受其约束，约束不失常则经气不上越不下陷，失约则诸经下陷，故见带下与腰腹弛纵。',
      transfer: '若患者带下清稀量多、腰膝酸软，据带脉理论当配何经腧穴同用？',
    },
  },
  // ============================================================
  // C 经络学 · 阳跷脉阴跷脉病候（007）
  // ============================================================
  {
    id: 'pb41-c-007', title: '经络·阳跷脉阴跷脉病候', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['阳跷阴跷', '目张目闭', '照海申脉', '八脉交会', '癫痫不寐'],
    intent: '掌握阴阳跷脉起止、司眼睑开合与下肢运动之功能及失眠嗜睡癫痫等病候。',
    facts: [
      { field: 'meridian.qiao.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.qiao.eyeLid', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.qiao.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.qiao.bamai', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《难经》', canon: '《难经》', chapter: '二十八难', originalText: '阳跷脉者，起于跟中，循外踝上行，入风池', sourceTitle: '《难经》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '跷脉理论不涉及用药剂量', caution: '失眠嗜睡辨证须排除情志与器质因素，跷脉穴操作按常规' },
    cases: null,
    stdJudgment: '阳跷脉起于申脉循外踝上行，阴跷脉起于照海循内踝上行，二脉交会于目内眦，司眼睑开合与下肢运动，阳跷为病目张不瞑、阴跷为病目闭不启，并主癫痫下肢痿痹。',
    coreDefinition: '阳跷脉起于申脉循外踝上行，阴跷脉起于照海循内踝上行，均达目内眦，司眼睑开合与下肢运动，主目疾、不寐与下肢病。',
    safety: { note: '跷脉理论用于解释寤寐与下肢病机；照海、申脉操作按常规刺法，无特殊禁忌。', prohibitions: [] },
    learning: {
      knowledge: '循行：阳跷脉起于足外踝下申脉穴，沿外踝上行，经下肢外侧、胁肋、肩颈，上口角至目内眦；阴跷脉起于足内踝下照海穴，沿下肢内侧上行，经阴部、胸内，上入缺盆，出人迎前，至目内眦，与阳跷会合。功能：司眼睑开合、主下肢运动，阳跷主一身左右之阳、阴跷主一身左右之阴。病候：阳跷为病阴缓而阳急，见目张不瞑（失眠）、下肢外侧拘急；阴跷为病阳缓而阴急，见目闭不启（嗜睡）、下肢内侧拘急；并主癫痫、不寐、下肢痿痹。八脉交会穴：照海通阴跷，申脉通阳跷。',
      misjudgment: '把申脉归阴跷、照海归阳跷。照海在足内踝下通阴跷，申脉在足外踝下通阳跷，内阴外阳，记反则取穴全错。',
      reasoning: '顽固失眠为何取申脉而嗜睡取照海？',
      feedback: '阳跷气盛则目张，取申脉泻阳跷之有余而治失眠；阴跷气盛则目闭，取照海补阴跷而治嗜睡，跷脉阴阳平衡则寤寐如常。',
      transfer: '若患者失眠兼腰膝酸软，可取哪些跷脉相关穴位配伍？',
    },
  },
  // ============================================================
  // C 经络学 · 十二经筋病候与治疗（008）
  // ============================================================
  {
    id: 'pb41-c-008', title: '经络·十二经筋病候与治疗', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['十二经筋', '以痛为输', '燔针劫刺', '寒则反折筋急', '经筋经脉区别'],
    intent: '掌握经筋循行不入内脏之特点、挛急弛纵两类病候与燔针劫刺以痛为输之治疗原则。',
    facts: [
      { field: 'meridian.jingjin.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.jingjin.disease', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.jingjin.treatment', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.jingjin.contrast', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《黄帝内经》', canon: '灵枢', chapter: '经筋第十三', originalText: '治在燔针劫刺，以知为数，以痛为输', sourceTitle: '《灵枢·经筋》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '经筋治疗原则属理论内容，不涉及用药剂量', caution: '燔针（火针）操作有烫伤与感染风险，须专业医师施行' },
    cases: null,
    stdJudgment: '十二经筋起于四肢爪甲、结于关节、上布头面躯干而不入内脏，病则寒性挛急或热性弛纵，治疗宗「燔针劫刺，以知为数，以痛为输」。',
    coreDefinition: '十二经筋为经脉之气结聚于筋肉关节之体系，不入内脏，主关节屈伸，病见挛急或弛纵，治以燔针劫刺、以痛为输。',
    safety: { note: '经筋理论用于筋伤痹痛辨证；火针操作须防烫伤与感染，仅限专业医师施行。', prohibitions: [] },
    learning: {
      knowledge: '经筋循行特点：起于四肢末端爪甲，结聚于关节骨骼，上行布于头面躯干，不入内脏、不属脏腑。分类：手足三阳经筋、手足三阴经筋，如足太阳之筋起于足小指、结于踝、上结于膝，足少阳之筋起于小趾次趾、结于外踝。病候规律：寒则反折筋急——掣痛、转筋、挛急，热则筋弛纵不收——膝伸不屈、足不收、口㖞。治疗原则：《灵枢·经筋》「治在燔针劫刺，以知为数，以痛为输」，以痛处（阿是穴）为输穴，燔针劫刺，得气为度；现代多用阿是穴针刺、火针、温针灸与推拿理筋。',
      misjudgment: '把经筋与经脉混为一谈。经筋不入内脏、不属脏腑，病在筋肉关节；经脉属络脏腑、内连脏腑，病及脏腑气血，二者病位与治法判然有别。',
      reasoning: '经筋病为何强调「以痛为输」而不循经取穴？',
      feedback: '经筋不循脏腑而结于关节，其病有定处，痛处即病所，以痛为输最切病机；经脉病方须循经远取。',
      transfer: '肘劳（网球肘）疼痛固定于肱骨外上髁，据经筋理论应如何取治？',
    },
  },
  // ============================================================
  // C 经络学 · 络脉病证与刺络（009）
  // ============================================================
  {
    id: 'pb41-c-009', title: '经络·络脉病证与刺络', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['络脉', '浮络孙络', '宛陈则除之', '刺络放血', '瘀血痹痛'],
    intent: '掌握络脉结构与瘀血痹痛热毒病证特点，理解刺络放血「宛陈则除之」的机理与注意事项。',
    facts: [
      { field: 'meridian.luomai.structure', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.luomai.disease', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.ciluo.principle', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.ciluo.safety', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '刺络放血每次数滴至数毫升，以泻热祛瘀为度', caution: '体虚者放血量宜少，孕妇、凝血障碍者禁用，严格消毒防感染' },
    cases: null,
    stdJudgment: '络脉自经脉支而横出、行于浅表，浮络孙络布于皮部，络脉病证以瘀血、痹痛、热毒为多，刺络放血宗宛陈则除之，取委中曲泽十宣等浮络盛处。',
    coreDefinition: '络脉为经脉分支横出于表，浮络孙络行于皮部，络脉病证以瘀血痹痛热毒为多，刺络放血以宛陈则除之泄热祛瘀。',
    safety: { note: '刺络放血须严格消毒，放血量以泻热祛瘀为度；孕妇、凝血障碍者禁用，体虚者少量。', prohibitions: ['孕妇禁用刺络放血', '凝血功能障碍者禁用刺络放血'] },
    learning: {
      knowledge: '络脉结构：《灵枢·脉度》「经脉为里，支而横者为络，络之别者为孙」，浮络行于体表。十五络脉各从络穴分出沟通表里经，如肺经列缺、脾经公孙。络脉病证：瘀血阻络——刺痛固定拒按、久痹入络；热毒壅盛——丹毒赤肿、咽喉肿痛、高热；蛇串疮疱疹灼痛。治疗：宛陈则除之，刺络放血，常取委中、曲泽（刺络要穴）、十宣、耳尖、大椎、太阳等浮络充盈处点刺出血；放血量宜少，体质虚弱者慎用，严格消毒防感染，孕妇及凝血障碍者禁用。',
      misjudgment: '刺络放血一味求多。放血以泻热祛瘀为度，每次数滴至数毫升即可，放血过多伤血耗气，虚人尤忌。',
      reasoning: '久痹刺痛为何宜刺络，而新感轻痛不宜刺络？',
      feedback: '久痹瘀血留滞络脉，非刺络不能祛除瘀滞，宛陈则除之；新感轻痛邪浅未成瘀，刺络反伤正气。',
      transfer: '蛇串疮（带状疱疹）局部刺络放血，其祛邪机理何在？',
    },
  },
  // ============================================================
  // C 经络学 · 经络气血流注与开阖枢（010）
  // ============================================================
  {
    id: 'pb41-c-010', title: '经络·经络气血流注与开阖枢', category: 'theory', difficulty: 4, difficultyLabel: '综合推理',
    riskTags: ['气血流注', '如环无端', '开阖枢', '太阳为开', '少阳为枢', '六经传变'],
    intent: '掌握十二经气血流注之环流秩序与三阴三阳开阖枢理论，理解其在六经辨证中的应用。',
    facts: [
      { field: 'meridian.liuzhu.sequence', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.yingwei.run', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.kaiheshu.sanyang', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.kaiheshu.sanyin', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.kaiheshu.clinical', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《黄帝内经》', canon: '灵枢', chapter: '根结第五', originalText: '太阳为开，阳明为阖，少阳为枢', sourceTitle: '《灵枢·根结》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '气血流注与开阖枢属理论框架，不涉及用药剂量', caution: '开阖枢用于解释六经传变，临证仍以脉证为凭' },
    cases: null,
    stdJudgment: '十二经气血自肺经起始依次流注一周而复归于肺，如环无端；开阖枢以太阳太阴为开、阳明厥阴为阖、少阳少阴为枢，阐释三阴三阳经气出入枢转之机。',
    coreDefinition: '气血沿十二经自肺经起始周流如环无端，开阖枢以太阳太阴为开、阳明厥阴为阖、少阳少阴为枢，说明经气离合出入的枢机规律。',
    safety: { note: '流注与开阖枢为理论框架，用于解释传变与取穴；开阖枢之说各家理解有异，临证仍以脉证为准。', prohibitions: [] },
    learning: {
      knowledge: '气血流注：十二经流注次序为肺经、大肠经、胃经、脾经、心经、小肠经、膀胱经、肾经、心包经、三焦经、胆经、肝经，复注于肺，如环无端；营气行于脉中、卫气行于脉外，昼夜各行五十周。开阖枢：《灵枢·根结》「太阳为开，阳明为阖，少阳为枢」，「太阴为开，厥阴为阖，少阴为枢」。太阳主表为开，外邪首犯；阳明主里为阖，阳气蓄积；少阳居表里之间为枢，转枢出入。三阴同理：太阴为开主输布，厥阴为阖主藏血，少阴为枢主水火枢转。临床意义：六经病传变与开阖枢失常相关，太阳病开折则暴病，少阳枢机不利则往来寒热。',
      misjudgment: '将三阴开阖枢记成「太阴为阖、厥阴为开」。三阴次序与三阳相对：太阴开、厥阴阖、少阴枢，记反则无法解释太阴输布、厥阴藏血之机。',
      reasoning: '少阳为何称「枢」，往来寒热与其枢机不利有何关联？',
      feedback: '少阳居表里之间为枢，枢机转输营卫阴阳；枢机不利则邪正分争、阳入阴出，故见往来寒热，和解少阳即复其枢转之职。',
      transfer: '太阳病不解传入少阳，据开阖枢理论应如何解释病势进退？',
    },
  },
];
