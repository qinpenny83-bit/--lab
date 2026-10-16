// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · Part U（U 中医儿科学 10 节点 pb41-u-001 ~ pb41-u-010）
// 学科：U 中医儿科学；覆盖：乳蛾（1）/ 紫癜（1）/ 病毒性心肌炎（1）/ 抽动障碍（1）/
//       注意力缺陷多动（1）/ 性早熟（1）/ 夏季热（1）/ 手足口病（1）/ 流行性乙型脑炎（1）/ 佝偻病（1）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「儿科·病证·证型证治」式，前缀带「儿科·」
// facts sourceTitle 限定：《中医儿科学》规划教材 / 《方剂学》规划教材 / 《中药学》规划教材 /
//   《中国药典》 / 《伤寒论》规划教材 / 《温病学》规划教材
// classics 一律整书名 label（《素问》《灵枢》《温病条辨》等，已在 classic-patch.mjs 收录），
//   篇名入 chapter，originalText 逐字核对，sourceType:'classic_original'，status:'verified'
// dosage 一律填写 guideline（按年龄分档剂量）/caution（小儿剂量宜小等警戒）
// 高危药红线按 authoring-spec 第 4 节表：朱砂（益脾镇惊散/安宫牛黄丸）/雄黄（安宫牛黄丸）/甘草等
// 难度分布：简单 3（difficulty 1）/ 中等 3（difficulty 2）/ 困难 2（difficulty 3）/ 易混综合 2（易混淆 1 + 综合推理 1）
// ============================================================

export const PART_U = [
  // ============================================================
  // U 中医儿科学 · 乳蛾 / 紫癜 / 病毒性心肌炎（001–003）
  // ============================================================
  {
    id: 'pb41-u-001', title: '儿科·乳蛾风热搏结证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['乳蛾', '风热搏结', '喉核红肿', '利咽消肿', '银翘散'],
    intent: '掌握小儿乳蛾风热搏结证的主症舌脉、病机与疏风清热利咽消肿治法，熟悉银翘散加减与咽部调护。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '银翘散加减水煎，按年龄折算：3岁以下取成人量1/3，3~6岁取1/2，6~12岁取2/3；金银花、连翘各6~12g，薄荷、荆芥穗各3~6g后下，桔梗、牛蒡子各3~6g，竹叶3~6g，芦根9~15g，生甘草3g，日1剂分2~3次温服。', caution: '小儿剂量宜小、药味宜精、中病即止；风热在表忌过早投苦寒重剂，防冰伏邪气；多饮温水、淡盐水含漱，忌辛辣煎炸。' },
    cases: null,
    stdJudgment: '乳蛾风热搏结者，喉核红肿灼痛、吞咽加剧，发热恶风、头痛咳嗽，舌边尖红、苔薄白或薄黄，脉浮数。风热之邪搏结于咽喉，气血壅滞，红肿乃生。法当疏风清热、利咽消肿，银翘散加减主之，风热去则肿消痛止。',
    coreDefinition: '乳蛾风热搏结证以喉核红肿灼痛、发热恶风、脉浮数为特征，治以疏风清热利咽消肿。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；咽痛明显、高热不退或喉核化脓者须及时就医', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症喉核红肿灼痛、吞咽痛甚，发热恶风、咳嗽咽干，舌边尖红苔薄白、脉浮数。病机风热搏结咽喉，气血壅滞。治以疏风清热、利咽消肿，银翘散加减（金银花、连翘、薄荷、桔梗、牛蒡子、甘草），热甚加石膏；多饮温水、忌辛辣煎炸。',
      misjudgment: '见喉核红肿即投清热解毒重剂。错：风热初起在表，当辛凉轻清疏风透邪，重用苦寒反冰伏邪气，热不得透，肿痛迁延。',
      reasoning: '同为乳蛾，风热搏结与热毒炽盛在红肿程度与用药取向上如何分野？',
      feedback: '风热者喉核轻中度红肿、兼表证，辛凉解表为主；热毒炽盛者红肿如涂丹、脓点成片、高热便秘，须清热解毒泻火排脓。',
      transfer: '幼儿喉核红肿伴高热烦躁，试辨风热与热毒孰轻孰重并立法。',
    },
  },
  {
    id: 'pb41-u-002', title: '儿科·紫癜血热妄行证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['紫癜', '血热妄行', '凉血止血', '犀角地黄汤', '水牛角'],
    intent: '掌握小儿紫癜血热妄行证的主症舌脉、病机与清热解毒凉血止血治法，熟悉犀角地黄汤加减与调护。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '犀角地黄汤加减水煎：水牛角15~30g先煎1小时，生地黄10~15g，牡丹皮6~9g，赤芍6~9g，加白茅根10~15g、侧柏叶6~9g；按年龄折算（3岁以下1/3、3~6岁1/2、6~12岁2/3），日1剂分2~3次温服。', caution: '水牛角须先煎；紫癜忌辛辣发物与剧烈活动、防碰撞；血小板显著减少、尿血便血明显或内脏出血者须中西医结合，忌自服活血药。' },
    cases: null,
    stdJudgment: '紫癜血热妄行者，皮肤瘀点瘀斑色泽鲜红、大小不一，可伴鼻衄、齿衄、便血尿血，心烦口渴，舌红苔黄，脉数有力。热毒内蕴血分，迫血妄行，溢于肌肤。法当清热解毒、凉血止血，犀角地黄汤加减主之，血凉则斑退血止。',
    coreDefinition: '紫癜血热妄行证以瘀斑鲜红、迫血诸窍出血、舌红脉数为特征，治以清热解毒凉血止血。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；出血量大或尿血不止者须住院观察', prohibitions: [] },
    learning: {
      knowledge: '瘀点瘀斑鲜红密集、多见于下肢，可伴鼻衄齿衄、便血尿血，心烦口渴，舌红苔黄、脉数有力。热毒迫血妄行、血溢脉外。治以清热解毒凉血止血，犀角地黄汤加减（水牛角、生地黄、牡丹皮、赤芍），鼻衄加白茅根藕节，尿血便血加小蓟地榆；忌辛辣发物、防碰撞。',
      misjudgment: '见紫癜即投止血收敛之品。错：血热妄行者血热为本，须凉血以止血，过早敛涩则瘀热内闭，斑色变暗、邪无出路。',
      reasoning: '同为皮肤出血，血热妄行与气不摄血一热一寒，用药何以判若冰炭？',
      feedback: '血热者斑色鲜红、脉数，凉血解毒；气不摄血者斑色暗淡、神倦脉细，益气摄血，误用寒凉则气愈伤血愈出。',
      transfer: '上呼吸道感染后双下肢突发密集鲜红瘀斑者，试辨血热与虚证并立法。',
    },
  },
  {
    id: 'pb41-u-003', title: '儿科·病毒性心肌炎气阴亏虚证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['病毒性心肌炎', '气阴亏虚', '益气养阴', '生脉散', '炙甘草汤', '心悸'],
    intent: '掌握小儿病毒性心肌炎气阴亏虚证的主症舌脉、病机与益气养阴宁心安神治法，理解病程中清解与补益的先后。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《温病条辨》', canon: '《温病条辨》', chapter: '上焦篇', originalText: '汗多脉散大，喘渴欲脱者，生脉散主之。', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '生脉散合炙甘草汤加减水煎：太子参10~15g、麦冬9g、五味子6g、炙甘草6g、生地黄10g、白芍9g、酸枣仁9g、丹参9g，阿胶6g烊化兑入；按年龄折算，日1剂分2~3次温服。', caution: '阿胶烊化兑服；急性期须卧床休息、定期复查心电图与心肌酶，气阴亏极、心阳虚衰者须中西医结合救治，忌劳累与剧烈运动。' },
    cases: null,
    stdJudgment: '病毒性心肌炎气阴亏虚者，心悸怔忡、气短自汗、神疲倦怠，或低热不退、盗汗、五心烦热，舌红少苔、脉细数或结代。邪热耗气伤阴，心之气阴亏耗，心神失养。法当益气养阴、宁心安神，生脉散合炙甘草汤加减主之，气阴复则心悸宁。',
    coreDefinition: '病毒性心肌炎气阴亏虚证以心悸气短、自汗盗汗、舌红少苔、脉结代为特征，治以益气养阴宁心安神。',
    safety: { note: '心肌炎急性期须住院或静养观察，本节点仅作知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '心悸怔忡、气短乏力，自汗盗汗、低热或五心烦热，舌红少苔、脉细数或结代。温毒耗伤气阴、心失所养。治以益气养阴宁心安神，生脉散合炙甘草汤加减（太子参、麦冬、五味子、炙甘草、生地黄、阿胶），低热加地骨皮。',
      misjudgment: '心肌炎见低热即重投苦寒清热。错：此时热邪已伤气阴，苦寒愈伐心气，当益气养阴为主，佐以清退虚热，不可本末倒置。',
      reasoning: '生脉散以人参配麦冬、五味子，何以酸甘化阴之中又能固气？',
      feedback: '人参益气、麦冬养阴、五味子酸收敛肺，气充阴复、汗敛而神安，正合气阴两伤之治。',
      transfer: '学龄儿童感冒后心悸胸闷、心电图ST-T改变者，试述从清热解毒到益气养阴的病程立法转换。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 抽动障碍 / 注意力缺陷多动 / 性早熟（004–006）
  // ============================================================
  {
    id: 'pb41-u-004', title: '儿科·抽动障碍肝亢风动证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['抽动障碍', '肝亢风动', '平肝熄风', '天麻钩藤饮', '清心宁神'],
    intent: '掌握小儿抽动障碍肝亢风动证的主症舌脉、病机与平肝熄风清心宁神治法，熟悉天麻钩藤饮加减与情志调护。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '天麻钩藤饮加减水煎：天麻6~9g、钩藤6~9g后下、石决明10~15g先煎、栀子6~9g、黄芩6~9g、茯神9g、夜交藤9g；按年龄折算，日1剂分2~3次温服。', caution: '钩藤后下、石决明先煎；平肝潜镇之品不宜久服，中病即止，以免寒凉伤胃；家长调护宜耐心，忌训斥责罚加重情志紧张。' },
    cases: null,
    stdJudgment: '抽动障碍肝亢风动者，眨眼挤眉、耸肩摇头、鼓腹挺胸，喉中吭吭发声，性情急躁易怒，舌红苔白、脉弦有力。肝风内动、痰扰清窍，风性善动而数变。法当平肝熄风、清心宁神，天麻钩藤饮加减主之，风平则动止声静。',
    coreDefinition: '抽动障碍肝亢风动证以多部位不自主抽动、烦躁易怒、脉弦为特征，治以平肝熄风清心宁神。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；抽动明显影响生活或伴秽语者宜专科综合干预', prohibitions: [] },
    learning: {
      knowledge: '头面颈肩四肢不自主抽动，眨眼挤眉、耸肩摇头或喉中发声，紧张时加重，伴烦躁易怒，舌红苔白、脉弦。肝风内动、痰热扰神。治以平肝熄风、清心宁神，天麻钩藤饮加减（天麻、钩藤、栀子、黄芩、茯神），眨眼频加菊花蝉蜕；调护作息规律、疏导情志。',
      misjudgment: '见抽动即投镇静止痉之虫类重剂。错：抽动多因肝风夹痰，重在平肝清心，虫类走窜镇痉宜少量佐用，重用徒耗气阴。',
      reasoning: '抽动与多动均关乎肝，为何一以熄风、一以清心为主？',
      feedback: '抽动重在风动于外，平肝熄风为先；多动重在神不守舍，清心宁神为要，二病病机侧重不同，立法随之有别。',
      transfer: '考试季抽动加重的学龄儿童，试从情志与肝风角度分析并调整治法。',
    },
  },
  {
    id: 'pb41-u-005', title: '儿科·注意力缺陷多动心肝火旺证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['多动', '心肝火旺', '清心平肝', '安神定志', '龙胆泻肝汤'],
    intent: '掌握小儿注意力缺陷多动障碍心肝火旺证的主症舌脉、病机与清心平肝安神定志治法，熟悉龙胆泻肝汤加减与行为管理配合。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '龙胆泻肝汤加减水煎：龙胆草3~6g、黄芩6g、栀子6g、泽泻9g、木通3~6g（用木通科木通）、车前子6~9g包煎、当归6g、生地黄9g、柴胡6g、生甘草3g，加钩藤6~9g、珍珠母10~15g先煎；按年龄折算，日1剂分2~3次温服。', caution: '方中木通须用木通科木通，禁用马兜铃科关木通；龙胆草、栀子苦寒伤胃，中病即止、勿久服；配合行为管理与教育训练，忌单纯依赖药物。' },
    cases: null,
    stdJudgment: '多动心肝火旺者，多动难静、冲动任性、烦躁易怒，注意力涣散、上课走神，口苦口干、尿黄便结，舌红苔黄、脉弦数。心肝之火内炽，神明被扰，动静失度。法当清心平肝、安神定志，龙胆泻肝汤加减主之，火清则神安而能静。',
    coreDefinition: '注意力缺陷多动心肝火旺证以多动冲动、烦躁易怒、舌红脉弦数为特征，治以清心平肝安神定志。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；苦寒直折中病即止，行为与教育干预为重要一环', prohibitions: ['【高风险】关木通（马兜铃科）含马兜铃酸有肾毒性，禁作木通入药；肾功能不全者禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症活动过度、冲动任性、易激惹，注意力涣散，口苦口干、尿黄便结，舌红苔黄、脉弦数。病机心肝火旺，神明受扰。治以清心平肝、安神定志，龙胆泻肝汤加减（龙胆草、黄芩、栀子、泽泻、木通、车前子、当归、生地、柴胡、甘草），加钩藤、珍珠母镇潜。',
      misjudgment: '多动必属心火，一律苦寒直折。错：本病尚有肝肾阴虚、心脾两虚之分，阴虚者五心烦热、脉细，脾虚者纳呆倦怠、脉弱，苦寒过用反伤中阳，须辨虚实。',
      reasoning: '同为心神不宁，心肝火旺与心脾两虚在多动表现与用药上如何鉴别？',
      feedback: '火旺者躁动有力、口苦便结，清泻为主；心脾两虚者神疲懒动、注意力涣散，补养为主，虚实之别即用药之别。',
      transfer: '上课小动作多、易与同学冲突又伴口苦便秘的患儿，试按心肝火旺立法并权衡攻伐之度。',
    },
  },
  {
    id: 'pb41-u-006', title: '儿科·性早熟阴虚火旺证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['性早熟', '阴虚火旺', '滋阴降火', '知柏地黄丸', '天癸'],
    intent: '掌握小儿性早熟阴虚火旺证的主症舌脉、病机与滋阴降火治法，理解天癸早至之理与生活调摄。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '上古天真论篇第一', originalText: '二七而天癸至，任脉通，太冲脉盛，月事以时下，故有子。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '知柏地黄丸加减水煎：知母6g、黄柏6g、熟地黄10~12g、山茱萸6~9g、山药9~12g、牡丹皮6~9g、茯苓9g、泽泻9g；或按成药说明服用，日2~3次；按年龄折算汤剂量。', caution: '知母、黄柏苦寒败胃，脾胃虚弱者慎用、中病即止；忌膏粱厚味与盲目进补，心理疏导与饮食调摄并重；乳房早发育须专科检查排除器质性病变。' },
    cases: null,
    stdJudgment: '性早熟阴虚火旺者，女孩乳核早现、男孩睾丸阴茎增大，伴五心烦热、潮热盗汗、颧红、烦躁易怒，舌红少苔、脉细数。肾阴不足、相火妄动，天癸早至。法当滋阴降火，知柏地黄丸加减主之，阴复火降则发育之期得缓。',
    coreDefinition: '性早熟阴虚火旺证以第二性征过早发育、五心烦热、舌红少苔为特征，治以滋阴降火。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；性早熟须专科评估骨龄与激素水平', prohibitions: [] },
    learning: {
      knowledge: '女孩8岁前乳房发育、男孩9岁前睾丸增大，潮热盗汗、五心烦热、夜寐不宁，舌红少苔脉细数。肾阴不足、相火妄动，天癸早至。治以滋阴降火，知柏地黄丸加减（知母、黄柏、熟地黄、山茱萸、牡丹皮），潮热加地骨皮，乳房胀痛加夏枯草；忌补品与高雌激素食品。',
      misjudgment: '性早熟见乳核即投疏肝理气。错：本病本在肾阴亏虚、相火偏亢，疏肝仅治标，当以滋阴降火治本，肾水足则相火自敛。',
      reasoning: '知柏地黄丸于六味滋肾中加知母黄柏，滋阴与降火孰为主次？',
      feedback: '六味三补三泻以补为主，知母黄柏清泻相火为辅，壮水之主以制阳光，阴足火降则发育复常。',
      transfer: '女孩七岁乳房微隆、夜热盗汗者，试按阴虚火旺立法并结合生活调摄。',
    },
  },
  // ============================================================
  // U 中医儿科学 · 夏季热 / 手足口病 / 乙脑 / 佝偻病（007–010）
  // ============================================================
  {
    id: 'pb41-u-007', title: '儿科·夏季热暑伤肺胃证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['夏季热', '暑伤肺胃', '清暑益气', '王氏清暑益气汤', '长期发热'],
    intent: '掌握小儿夏季热暑伤肺胃证的主症舌脉、病机与清暑益气养阴生津治法，熟悉王氏清暑益气汤加减与生活调护。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '王氏清暑益气汤加减水煎：西洋参3~5g另煎兑入、石斛6~9g、麦冬9g、黄连1~3g、竹叶3~6g、荷梗6~9g、知母3~6g、甘草3g、粳米适量、西瓜翠衣15~30g；按年龄折算，日1剂分2~3次温服。', caution: '西洋参另煎兑服；黄连苦寒不宜过量，中病即止；忌食生冷瓜果碍胃；病程长者注意气阴耗伤与脱水，反复高热不退须就医。' },
    cases: null,
    stdJudgment: '夏季热暑伤肺胃者，入夏长期发热不退，体温随气温升降，口渴多饮、尿频量多、无汗或少汗，精神尚可，舌红苔薄黄、脉数。暑气内蕴、耗伤肺胃气阴，津气外泄。法当清暑益气、养阴生津，王氏清暑益气汤主之，暑清津复则热自退。',
    coreDefinition: '夏季热暑伤肺胃证以入夏长期发热、口渴多饮、尿多汗少为特征，治以清暑益气养阴生津。',
    safety: { note: '儿科辨证知识学习，临床用药须遵医嘱；体温随气候波动为其特点，居室宜阴凉通风', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症入夏长期发热、气温下降则退，口渴多饮、尿多汗少，烦躁或委顿，舌红苔薄黄、脉数。病机暑气入肺胃，气阴两伤。治以清暑益气、养阴生津，王氏清暑益气汤加减（西洋参、石斛、麦冬、黄连、竹叶、荷梗、知母、西瓜翠衣、甘草）；居室阴凉通风。',
      misjudgment: '夏季热见发热即投苦寒退热之剂。错：本病为暑伤气阴，苦寒重剂易伤脾胃，且体温随气温波动，重在清暑养阴、缓缓图之，非苦寒所能速退。',
      reasoning: '同为小儿发热，夏季热与暑湿夹滞在病因与治法上有何区别？',
      feedback: '夏季热属暑伤肺胃、气阴耗伤，清暑益气养阴；暑湿夹滞多胸闷脘痞、苔腻，宜清暑化湿和中，湿重者不可过用甘润。',
      transfer: '三岁小儿入夏后低热缠绵、渴饮尿多而无汗，试按暑伤肺胃辨治并设计生活调护。',
    },
  },
  {
    id: 'pb41-u-008', title: '儿科·手足口病湿热蒸盛证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['手足口病', '湿热蒸盛', '清热化湿', '清瘟败毒饮', '疱疹', '隔离'],
    intent: '掌握小儿手足口病湿热蒸盛证的主症舌脉、病机与清热化湿解毒凉营治法，理解其与水痘的鉴别及重症转归。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '清瘟败毒饮加减水煎：石膏15~30g先煎、知母6g、水牛角15~30g先煎、生地黄9g、牡丹皮6g、赤芍6g、黄连2~3g、黄芩6g、栀子6g、连翘9g、玄参9g、竹叶6g、桔梗6g、生甘草3g；按年龄折算，日1剂分2~3次温服。', caution: '石膏、水牛角先煎；苦寒重剂中病即止；观察神志与抽搐，有脑炎、心肌炎表现者即就医；患儿隔离至疱疹结痂，餐具玩具消毒。' },
    cases: null,
    stdJudgment: '手足口病湿热蒸盛者，发热较甚、烦躁口渴，手足口部疱疹密集、疱液浑浊，口腔糜烂疼痛流涎，尿黄便秘，舌红苔黄厚腻、脉滑数。湿热疫毒蒸腾，熏灼肌肤黏膜。法当清热化湿、解毒凉营，清瘟败毒饮加减主之，湿化热清则疱疹渐敛。',
    coreDefinition: '手足口病湿热蒸盛证以高热烦躁、疱疹密集疱液浑浊、苔黄腻为特征，治以清热化湿解毒凉营。',
    safety: { note: '手足口病有传染性，须隔离至疱疹结痂，重症观察神志惊厥，本节点仅作知识学习', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '发热烦躁口渴，手足掌跖、口腔疱疹密集、疱液浑浊，口腔糜烂流涎拒食，尿黄便秘，舌红苔黄厚腻、脉滑数。湿热疫毒蒸腾、熏灼黏膜。治以清热化湿、解毒凉营，清瘟败毒饮加减（石膏、水牛角、生地、赤芍、黄连、黄芩、甘草）；隔离至结痂，疱勿挑破。',
      misjudgment: '把手足口病疱疹当水痘治。错：水痘疱壁薄、疱液清亮、躯干向心分布、新旧并存；手足口病疱疹多见于手足口、疱液浑浊、离心分布，治法轻重亦异，辨错则用药失当。',
      reasoning: '手足口病普通型与湿热蒸盛重型的转归不同，如何凭神志与疱疹判断？',
      feedback: '普通型神清、疱少而稀，轻清化湿解毒；湿热蒸盛型高热烦躁、疱密液浊，重剂清瘟败毒、凉营护心，防邪陷心包与惊厥。',
      transfer: '托儿所暴发手足口病时，试述如何辨别重症征象并落实隔离措施。',
    },
  },
  {
    id: 'pb41-u-009', title: '儿科·流行性乙型脑炎卫气营血辨治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['乙脑', '暑温', '卫气营血', '清热凉血', '安宫牛黄丸', '朱砂', '雄黄'],
    intent: '掌握小儿流行性乙型脑炎按卫气营血四层传变的辨证要点与分层立法，理解透热转气、凉血开窍诸法的衔接。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《温病条辨》', canon: '《温病条辨》', chapter: '上焦篇', originalText: '凡病温者，始于上焦，在手太阴。', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '按传变分层给药：卫分银翘散加减（金银花、连翘各9g，薄荷3g后下，竹叶6g，芦根12g，桔梗、牛蒡子各6g，甘草3g）；气分白虎汤加减（石膏20~30g先煎、知母6g、甘草3g、粳米）；营分清营汤加减（水牛角15~30g先煎、生地黄9g、玄参9g、麦冬9g、金银花、连翘、黄连、竹叶心、丹参）；血分犀角地黄汤加减；神昏加安宫牛黄丸，3岁内每次1/4丸、3~6岁1/3丸、6岁以上1/2丸化服。按年龄折算，日1~2剂分次服。', caution: '乙脑属温病急危重症，须隔离、住院，高热抽搐昏迷者中西医结合抢救；安宫牛黄丸含朱砂、雄黄，只可暂用，不可久服，孕妇禁用。' },
    cases: null,
    stdJudgment: '乙脑之治须循卫气营血四层递进：初期发热恶寒、头痛项强属卫分，银翘散轻宣；气分高热口渴、烦躁便秘，白虎汤清泄；营分身热夜甚、神昏谵语、斑疹隐隐，清营汤透热转气；血分灼热斑疹显露、动血动风，犀角地黄汤凉血。卫气营血明则传变可截。',
    coreDefinition: '乙脑按暑温辨治，以卫气营血四层传变立法，卫气轻透、营血凉开。',
    safety: { note: '乙脑为急危重症，须立即就医住院隔离，本节点仅作知识学习，临床用药须遵医嘱', prohibitions: ['【高风险】朱砂含硫化汞忌火煅；0.1-0.5g只入丸散；不可久服；孕妇禁用', '【高风险】雄黄有毒0.05-0.1g只入丸散；忌火煅；孕妇禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症循卫气营血四层：卫分发热恶寒、脉浮数；气分壮热口渴便秘、脉洪数；营分身热夜甚、神昏谵语、斑疹隐隐、舌绛；血分灼热、舌深绛。病机暑温疫毒深入营血。治法分层：卫分银翘散，气分白虎汤，营分清营汤透热转气，血分犀角地黄汤凉血，神昏加安宫牛黄丸。',
      misjudgment: '乙脑高热神昏即用苦寒直折一气到底。错：卫分证须轻清宣透，过早苦寒冰伏其邪；营分须透热转气，一味凉血则邪无外达之机，四层各有层次，不可混施。',
      reasoning: '卫气营血辨治中「透热转气」一法，为何是清营汤治营分证的关键？',
      feedback: '营分热邪须借气分透达之品（银翘竹叶之属）导邪外出，凉血而不滞邪，热透于外则斑消神清。',
      transfer: '盛夏高热抽搐昏迷患儿，试按卫气营血四层推演传变并设计分层给药次序。',
    },
  },
  {
    id: 'pb41-u-010', title: '儿科·佝偻病脾虚肝旺证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['佝偻病', '脾虚肝旺', '健脾平肝', '益脾镇惊散', '朱砂', '夜惊多汗'],
    intent: '掌握小儿佝偻病脾虚肝旺证的主症舌脉、病机与健脾助运平肝镇惊治法，理解朱砂类镇惊药的毒性警戒与替代思路。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医儿科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痿论篇第四十四', originalText: '肾主身之骨髓。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '益脾镇惊散加减水煎：党参3~6g（或太子参6g）、白术6g、茯苓6~9g、钩藤3~6g后下、炙甘草3g、灯心草1g，朱砂研末冲服0.05~0.1g（不入煎剂）；按年龄折算，日1剂分2~3次温服。', caution: '朱砂含硫化汞有毒，忌火煅，只入丸散0.1-0.5g，不可久服，小儿尤须慎防，现临床多以煅牡蛎、珍珠母代朱砂镇惊；佝偻病须配合日光照射、补充维生素D与合理喂养，忌纯恃药物。' },
    cases: null,
    stdJudgment: '佝偻病脾虚肝旺者，多汗夜惊、烦躁不安、枕秃明显，囟门迟闭、纳呆便溏，面色少华，舌淡苔薄白、脉缓弱。脾虚化源不足、肝木失养而生风，汗津外泄。法当健脾助运、平肝镇惊，益脾镇惊散加减主之，脾健则汗止惊平。',
    coreDefinition: '佝偻病脾虚肝旺证以多汗夜惊、枕秃、纳呆便溏、舌淡为特征，治以健脾助运平肝镇惊。',
    safety: { note: '佝偻病须综合调护（日照、喂养、维生素D），本节点仅作知识学习，临床用药须遵医嘱', prohibitions: ['【高风险】朱砂含硫化汞忌火煅；0.1-0.5g只入丸散；不可久服；孕妇禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症多汗（入睡尤甚）、夜惊啼哭、烦躁枕秃，出牙迟缓，纳呆便溏、面色少华，舌淡苔薄白、脉缓弱。病机脾虚气血乏源，肝木乘脾、虚风内扰。治以健脾助运、平肝镇惊，益脾镇惊散加减（党参、白术、茯苓、钩藤、甘草、灯心草），汗多加煅牡蛎、浮小麦。',
      misjudgment: '佝偻病一律补钙壮骨而忽略脾胃。错：脾虚则运化无力，钙与药食皆难吸收，须先健脾助运，脾健则骨得养，单一补钙而不顾脾，往往事倍功半。',
      reasoning: '佝偻病既责肾主骨，为何脾虚肝旺证反以健脾平肝为治法？',
      feedback: '本病幼婴之虚多在脾，脾虚则水谷精微不化，肾骨失养；肝旺之惊烦因脾虚生风，健脾固本、平肝治标，标本同图。',
      transfer: '夜惊多汗、发稀枕秃的六月龄婴儿，试按脾虚肝旺立法并安排喂养与日照。',
    },
  },
];
