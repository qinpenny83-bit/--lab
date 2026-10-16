// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · Part W（W 中医眼科学 10 节点 pb41-w-001 ~ pb41-w-010）
// 学科：W 中医眼科学；覆盖：云雾移睛（1）/ 高风雀目（1）/ 青盲（1）/ 目劄（1）/ 白涩症（1）/
//       金疳（1）/ 火疳（1）/ 漏睛（1）/ 眼丹（1）/ 目系暴盲（1）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「眼科·病证·证型证治」式（含「眼科·」前缀）
// facts sourceTitle 限定：《中医眼科学》规划教材 / 《方剂学》规划教材 / 《中药学》规划教材 /
//   《中国药典》 / 《伤寒论》规划教材 / 《温病学》规划教材
// classics 一律整书名 label（《素问》《灵枢》《金匮要略》等，已在 classic-patch.mjs 收录），
//   篇名入 chapter，originalText 逐字核对，sourceType:'classic_original'，status:'verified'；
//   拿不准的节点留空
// dosage 一律填写 guideline（内服剂量 + 点眼外用方法）/caution（禁忌与警戒）
// 高危药红线按 authoring-spec 第 4 节表：甘草（百合固金/竹叶泻经/血府逐瘀等）/ 细辛（还阴救苦汤）/
//   桃仁红花（血府逐瘀汤）等
// 难度分布：简单 3（difficulty 1）/ 中等 3（difficulty 2）/ 困难 2（difficulty 3）/
//   易混综合 2（易混淆 1 + 综合推理 1）
// ============================================================

export const PART_W = [
  // ============================================================
  // W 中医眼科学 · 瞳神病（001–003）
  // ============================================================
  {
    id: 'pb41-w-001', title: '眼科·云雾移睛肝肾亏虚证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['云雾移睛', '玻璃体混浊', '肝肾亏虚', '补益肝肾', '杞菊地黄丸'],
    intent: '掌握云雾移睛肝肾亏虚证的主症舌脉、病机与补益肝肾治法，熟悉杞菊地黄丸的组成与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '五脏生成篇第十', originalText: '肝受血而能视，足受血而能步，掌受血而能握，指受血而能摄。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '杞菊地黄丸加减水煎：熟地黄24g、山药12g、山茱萸12g、茯苓9g、泽泻9g、牡丹皮9g、枸杞子12g、菊花9g，日1剂分2次温服；头晕耳鸣加磁石30g打碎先煎、五味子6g，阴虚火旺加知母9g、黄柏9g。', caution: '熟地黄滋腻碍胃，脾虚便溏、腹胀纳少者减量或佐砂仁；黑影骤然增多伴闪光，或视力骤降者须立即就医，排除视网膜脱离，不得泥于补益而延误。' },
    cases: null,
    stdJudgment: '云雾移睛属肝肾亏虚者，眼前黑影飘动如云雾蚊蝶，时隐时现，视物昏矇，伴头晕耳鸣、腰膝酸软、夜寐不宁，舌红少苔脉细。精血不足则神膏失养、浊气上泛，法当补益肝肾、滋阴明目，杞菊地黄丸于六味之中加枸杞菊花，平补肝肾而兼清浮火。',
    coreDefinition: '云雾移睛肝肾亏虚证以眼前黑影飘动、视物昏矇、腰膝酸软为特征，治以补益肝肾。',
    safety: { note: '专科辨证知识学习，临床用药须遵医嘱；黑影骤增伴闪光须排除视网膜脱离，立即就医', prohibitions: [] },
    learning: {
      knowledge: '眼前黑影飘动如云雾蚊蝇，时隐时现，视物昏矇，伴头晕耳鸣、腰膝酸软，舌红少苔、脉细。肝肾精血亏虚、神膏失养，浊气上泛。治以补益肝肾、滋阴明目，杞菊地黄丸加减（熟地黄、山茱萸、山药、茯苓、牡丹皮、枸杞子、菊花）；黑影骤增者结合眼底检查。',
      misjudgment: '把眼前黑影一律当飞蚊症而不问虚实。错：黑影暴增伴闪光常为视网膜脱离先兆，此时补益肝肾缓不济急，须急诊检查；黑影隐现、日渐昏矇者方从肝肾精血论治。',
      reasoning: '同为云雾移睛，黑影骤增暴作与缓缓隐现之治有何缓急之别？',
      feedback: '骤增暴作多属眼底急变，当以现代检查为先、速决去留；缓缓隐现、久视昏矇者为精血虚损，方宜补益肝肾缓图。',
      transfer: '中年女性眼前飘黑影如蚊蝇、头晕腰酸者，试从肝肾精血角度拟定治法与调护。',
    },
  },
  {
    id: 'pb41-w-002', title: '眼科·高风雀目脾肾阳虚证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['高风雀目', '夜盲', '脾肾阳虚', '温补脾肾', '右归丸', '附子'],
    intent: '掌握高风雀目脾肾阳虚证的主症舌脉、病机与温补脾肾治法，熟悉右归丸的运用与附子先煎警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '生气通天论篇第三', originalText: '阳气者，精则养神，柔则养筋。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '右归丸加减水煎：熟地黄24g、山药12g、山茱萸9g、枸杞子12g、菟丝子12g、鹿角胶9g烊化、杜仲9g、肉桂3g、制附子6g先煎、当归9g，日1剂分2次温服；夜盲甚加夜明砂6g、鸡内金9g，便溏加党参12g、白术9g。', caution: '制附子须先煎30~60分钟至无麻辣感方可下他药；熟地鹿角胶滋腻，纳呆腹胀者减量；本病视功能进行性损害，宜中西医结合并定期视野检查，勿恃温补而废随访。' },
    cases: null,
    stdJudgment: '高风雀目以入暮或暗处视物不见为特征，脾肾阳虚者夜盲日甚、视野渐窄，神疲畏寒、腰膝酸软、食少便溏，舌淡苔白脉沉细。阳虚则神光不能发越，法当温补脾肾、益气明目，右归丸温肾填精，菟丝鹿角温养下元，肉桂附子扶阳，兼顾中土。',
    coreDefinition: '高风雀目脾肾阳虚证以夜盲日甚、视野缩窄、畏寒便溏为特征，治以温补脾肾益气明目。',
    safety: { note: '本病属进行性损害，宜中西医结合并定期随访；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用'] },
    learning: {
      knowledge: '主症入暮或暗处视物不清，夜盲日甚，视野渐窄如管状，伴神疲畏寒、腰膝酸软、食少便溏；舌淡苔白，脉沉细无力。病机脾肾阳虚、目失温煦，神光不得发越。治以温补脾肾、益气明目，右归丸加减（附子先煎、菟丝子、鹿角胶、肉桂），气虚加党参黄芪，忌苦寒伤阳。',
      misjudgment: '把夜盲一律按肾阴虚滋阴填精。错：高风雀目以阳虚为多，夜盲畏寒、舌淡脉沉细为阳虚眼目，滋阴清润反伤阳气，夜盲更甚；须分阳虚阴虚，温补与滋阴不可相混。',
      reasoning: '同为雀目，阳虚与阴虚在夜盲轻重、兼症舌脉上如何判别，治法何以一温一滋？',
      feedback: '阳虚者畏寒肢冷、舌淡脉沉细，温补脾肾方合病机；阴虚者五心烦热、舌红少苔，当滋阴填精。阳虚误滋阴则寒凝愈甚，阴虚误温补则火灼目络。',
      transfer: '青年夜盲渐重、视野日窄而畏寒便溏者，试从脾肾阳虚分析立法并说明附子运用之要。',
    },
  },
  {
    id: 'pb41-w-003', title: '眼科·青盲玄府郁闭证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['青盲', '视神经萎缩', '玄府郁闭', '疏肝解郁', '逍遥散'],
    intent: '掌握青盲玄府郁闭证的主症舌脉、病机与疏肝解郁通络明目治法，理解玄府闭塞与神光不发的病机关系。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '逍遥散合四物汤加减水煎：柴胡9g、当归9g、白芍12g、茯苓9g、白术9g、薄荷6g后下、生甘草6g、熟地黄12g、川芎6g、赤芍9g、丹参15g、石菖蒲6g，日1剂分2次温服；口苦烦躁加牡丹皮9g、栀子9g，头目刺痛加桃仁9g、红花6g。', caution: '青盲须先明确病因，青光眼、颅内占位压迫等引起的视神经损害须针对原发病治疗；疏肝理气之品辛散，久服注意顾护阴血；本病视功能已损者恢复较难，须耐心守方并定期复查视野。' },
    cases: null,
    stdJudgment: '青盲眼外观如常而视力渐降、视野缩窄，玄府郁闭者多因情志抑郁或外伤瘀阻，头目胀痛、胸胁满闷，舌暗脉弦涩。肝气郁结则玄府闭塞、神光不得发越，法当疏肝解郁、通络明目，逍遥散疏其郁滞，合四物丹参菖蒲通脉开窍。',
    coreDefinition: '青盲玄府郁闭证以视力渐降、情志不舒、舌暗脉弦涩为特征，治以疏肝解郁通络明目。',
    safety: { note: '青盲须结合眼底检查明确病因，青光眼及颅内病变所致者须针对原发病治疗；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '视物日渐昏矇、视力缓降、视野缺损，伴情志抑郁、胸胁满闷，舌紫暗、脉弦涩。肝气郁结、气滞血瘀，玄府闭塞，神光不发。治以疏肝解郁、通络明目，逍遥散合四物汤加减（柴胡、当归、白芍、茯苓、白术、薄荷、熟地黄、川芎），加丹参、石菖蒲、郁金通络开窍。',
      misjudgment: '青盲见视物昏矇即投滋补肝肾。错：玄府郁闭以郁滞瘀阻为机，此时滋补反壅塞气机，玄府愈闭；须先疏解开通，郁去络通而后议补。',
      reasoning: '玄府一词取义于门户，目之玄府闭塞与情志气机有何联系，为何疏肝为开闭之先？',
      feedback: '目为神光发越之处，赖玄府通达；肝主疏泄调畅气机，情志抑郁则气机壅滞、玄府闭塞，故疏肝解郁即是开通玄府、复其神光。',
      transfer: '郁怒之后视力渐降、视野缺损、胸胁满闷者，试从玄府郁闭阐释病机并拟定治法。',
    },
  },
  // ============================================================
  // W 中医眼科学 · 胞睑与白睛病（004–008）
  // ============================================================
  {
    id: 'pb41-w-004', title: '眼科·目劄肝脾不和证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['目劄', '胞睑眨动', '肝脾不和', '疏肝健脾', '逍遥散'],
    intent: '掌握目劄肝脾不和证的主症舌脉、病机与疏肝健脾柔肝熄风治法，熟悉逍遥散加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '至真要大论篇第七十四', originalText: '诸风掉眩，皆属于肝。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '逍遥散加减水煎：柴胡6g、当归9g、白芍12g、茯苓9g、白术9g、炙甘草3g、薄荷6g后下、钩藤9g后下、僵蚕6g、菊花9g，日1剂分2次温服；食少便溏加山药12g、薏苡仁15g，烦躁易怒加牡丹皮9g、栀子9g。', caution: '小儿剂量宜轻，中病即止；目劄久治不效或伴挤眉耸鼻、喉中吭声者，须与抽动障碍鉴别，必要时转专科；屈光不正引起的瞬目频繁者应先矫正视力。' },
    cases: null,
    stdJudgment: '目劄以胞睑频频眨动为主症，肝脾不和者目眨不休、喜揉眼、眼干涩，面色萎黄、食少烦躁、大便不调，舌淡苔薄脉弦细。肝木乘脾、虚风动于目络，法当疏肝健脾、柔肝熄风，逍遥散调和肝脾，钩藤僵蚕菊花平熄风阳。',
    coreDefinition: '目劄肝脾不和证以胞睑频频眨动、食少烦躁、面色萎黄为特征，治以疏肝健脾柔肝熄风。',
    safety: { note: '小儿目劄须排除抽动障碍与屈光不正，必要时转专科；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症胞睑频频眨动不能自主，或喜揉眼、目干涩，伴面色萎黄、食少纳呆、烦躁易怒、大便不调；舌淡苔薄白，脉弦细。病机肝木乘脾、脾虚肝旺，虚风上扰目络。治以疏肝健脾、柔肝熄风，逍遥散加减，加钩藤僵蚕菊花平肝熄风，并嘱少看电视免视疲劳。',
      misjudgment: '目劄频眨即按惊风镇惊熄风重剂。错：目劄多为脾虚肝旺之虚风，宜疏肝健脾以缓风阳，骤投全蝎蜈蚣镇惊之品重伤脾胃，风未息而中气先馁。',
      reasoning: '同为目眨不止，肝脾不和之虚风与热极动风之实证如何鉴别，治法有何轻重？',
      feedback: '目劄眨而不抽、无发热神昏者属虚风，当调肝脾、缓风阳；热极动风则高热抽搐，须清热镇惊，两者病机治法迥异。',
      transfer: '学龄儿童课间频频眨眼揉眼、食少易怒者，试按肝脾不和辨治并说明调护要点。',
    },
  },
  {
    id: 'pb41-w-005', title: '眼科·白涩症肺阴不足证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['白涩症', '干眼', '肺阴不足', '滋阴润肺', '百合固金汤'],
    intent: '掌握白涩症肺阴不足证的主症舌脉、病机与滋阴润肺治法，熟悉百合固金汤的组成与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '宣明五气篇第二十三', originalText: '五脏化液：心为汗，肺为涕，肝为泪，脾为涎，肾为唾，是谓五液。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '百合固金汤加减水煎：百合12g、生地黄12g、熟地黄12g、玄参9g、麦冬12g、浙贝母6g、当归9g、白芍9g、桔梗6g、生甘草6g，日1剂分2次温服；干涩甚加沙参12g、玉竹9g、桑叶6g；外用人工泪液类滴眼液每次1~2滴，日3~6次，滴前洗手。', caution: '玄参、生地黄甘寒滋腻，脾虚便溏者减量；贝母反乌头类药，同用须忌；白涩症忌辛辣炙煿与风燥久视，久坐空调房者须定时瞬目。' },
    cases: null,
    stdJudgment: '白涩症眼干涩不爽、频频眨目，肺阴不足者干涩灼热、畏光、视久昏蒙，白睛赤脉隐隐，干咳咽干、舌红少苔脉细数。肺阴亏虚则津液不布、目失濡润，法当滋阴润肺，百合固金汤滋养肺肾之阴，麦冬贝母润燥，生熟地玄参滋水涵金。',
    coreDefinition: '白涩症肺阴不足证以眼干涩灼热、视久昏蒙、干咳咽干为特征，治以滋阴润肺。',
    safety: { note: '专科辨证知识学习，临床用药须遵医嘱；眼干涩久治不效或伴口眼干燥者须查干燥综合征等全身病', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '玄参反藜芦，同用须忌', '浙贝母反乌头类药（含附子、川乌、草乌），同用须忌'] },
    learning: {
      knowledge: '眼干涩不爽、灼热畏光，视久昏蒙，白睛赤脉隐隐，干咳少痰、咽干口燥，舌红少苔、脉细数。肺阴不足、津液不布，目失濡润。治以滋阴润肺，百合固金汤加减（百合、生地黄、熟地黄、玄参、麦冬、浙贝母、桔梗、甘草）；外点人工泪液，忌辛辣燥热。',
      misjudgment: '白涩症目微红赤即按风热目赤辛凉疏解。错：本证津亏为本，疏风解表更耗津液，干涩愈甚；当辨燥涩与风热，润肺生津方为正治。',
      reasoning: '同为目干涩，肺阴不足与肝血虚的用药何以同中有异？',
      feedback: '肺阴不足者兼干咳咽干，重在润肺生津；肝血虚者兼头晕目涩、爪甲不荣，重在养血柔肝，均以濡润为法而所本之脏不同。',
      transfer: '长期伏案对屏、眼干涩灼热干咳者，试从肺阴不足立法并拟定内外同治方案。',
    },
  },
  {
    id: 'pb41-w-006', title: '眼科·金疳肺经燥热证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['金疳', '泡性结膜炎', '肺经燥热', '泻肺清热', '泻肺汤'],
    intent: '掌握金疳肺经燥热证的主症舌脉、病机与泻肺清热治法，熟悉泻肺汤加减与点眼外治。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '五脏生成篇第十', originalText: '诸气者，皆属于肺。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '泻肺汤加减水煎：桑白皮9g、地骨皮9g、黄芩9g、知母9g、麦冬9g、桔梗6g、连翘9g、赤芍9g，日1剂分2次温服；涩痛甚加栀子9g、金银花12g，干咳加沙参12g、玉竹9g；外点鱼腥草滴眼液或黄连眼药水，每次1~2滴，日3~6次，滴前洗手。', caution: '桑白皮、黄芩苦寒清泄肺热，脾虚便溏者减量；小泡破溃者忌揉眼、忌包扎，防止感染；反复发作者须查结核等全身因素。' },
    cases: null,
    stdJudgment: '金疳以白睛生灰白小泡、周绕赤脉为特征，肺经燥热者小泡凸起、涩痛畏光，干咳少痰、鼻干咽燥，舌红苔薄黄脉数。白睛属气轮、内应于肺，燥热循经壅滞则结聚成疳，法当泻肺清热、凉血散结，泻肺汤泻其燥热，赤芍连翘凉血散结。',
    coreDefinition: '金疳肺经燥热证以白睛生灰白小泡、周绕赤脉、涩痛畏光为特征，治以泻肺清热凉血散结。',
    safety: { note: '专科辨证知识学习，临床用药须遵医嘱；点眼药液一人一瓶，滴前洗手，小泡破溃者防感染', prohibitions: [] },
    learning: {
      knowledge: '主症白睛生灰白色粟粒样小泡，周绕赤脉，微痛或灼热涩痛、畏光流泪，可反复发作；伴干咳少痰、鼻干咽燥；舌红苔薄黄，脉数。病机肺经燥热、上壅气轮，气血瘀滞结聚。治以泻肺清热、凉血散结，泻肺汤加减，加连翘赤芍凉血，外点鱼腥草滴眼液。',
      misjudgment: '金疳小泡赤痛即按火疳苦寒泻火重剂。错：金疳病位浅、肺经燥热为主，清宣润燥即可；火疳深结紫赤、热毒壅盛，须重剂泻火散结，轻重浅深不可混施。',
      reasoning: '金疳与火疳同属白睛病，为何一浅一深、治法轻重有别？',
      feedback: '金疳为气轮表层燥热结泡，色白浅表，轻清泻肺；火疳为深层紫赤结节、痛拒按，热毒壅滞，须苦寒泻火散结，浅深不同立法亦异。',
      transfer: '小儿白睛反复生小泡、涩痛畏光而干咳者，试从肺经燥热立论并说明调护。',
    },
  },
  {
    id: 'pb41-w-007', title: '眼科·火疳热毒内蕴证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['火疳', '巩膜炎', '热毒内蕴', '泻火解毒', '还阴救苦汤', '细辛'],
    intent: '掌握火疳热毒内蕴证的主症舌脉、病机与泻火解毒凉血散结治法，熟悉还阴救苦汤的运用与细辛警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '还阴救苦汤加减水煎：黄连6g、黄芩9g、黄柏9g、栀子9g、龙胆草6g、连翘9g、知母9g、生地黄12g、牡丹皮9g、红花6g、赤芍9g、细辛3g后下、柴胡6g、生甘草3g，日1剂分2次温服；便秘加大黄6g后下，痛甚加延胡索9g。', caution: '方含细辛，煎剂宜后下且用量勿超3g；苦寒之品中病即止，脾胃虚寒者慎用；火疳反复或伴视力下降、瞳神受累者须专科随访，排除风湿免疫疾病。' },
    cases: null,
    stdJudgment: '火疳白睛深部紫红结节隆起、疼痛拒按，热毒内蕴者结节色紫、痛剧羞明，口苦咽干、便秘溲赤，舌红苔黄脉弦数。热毒壅滞白睛深层、气血凝泣，法当泻火解毒、凉血散结，还阴救苦汤苦寒直折，细辛升麻引药上达，红花赤芍散结消瘀。',
    coreDefinition: '火疳热毒内蕴证以白睛深层紫红结节、痛剧拒按、口苦便秘为特征，治以泻火解毒凉血散结。',
    safety: { note: '火疳易反复并波及瞳神，须专科随访；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['【高风险】细辛煎剂1-3g散剂0.5-1g，过量可致中毒；反藜芦', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '白睛深层隆起紫红色结节，疼痛拒按、羞明流泪，伴口苦咽干、便秘溲赤，舌红苔黄、脉弦数。热毒内蕴、气血壅滞白睛深层。治以泻火解毒、凉血散结，还阴救苦汤加减（黄连、黄芩、栀子、龙胆草、生地黄、牡丹皮、红花、细辛、甘草），便秘加大黄；忌辛辣燥热。',
      misjudgment: '火疳结节紫赤疼痛即投活血破瘀。错：本证热毒为本、瘀滞为标，活血须伍苦寒泻火，单恃破瘀则热未清而血愈耗，结节反难消散。',
      reasoning: '还阴救苦汤中细辛用量甚微，其意在于何？',
      feedback: '细辛辛温升散，能引苦寒之药上达目窍、开通玄府，取反佐升提之妙，故用量宜轻、后下，中病即止。',
      transfer: '白睛深层结节反复发作、紫赤拒按而大便干结者，试述泻火与散结并行的立法思路。',
    },
  },
  {
    id: 'pb41-w-008', title: '眼科·漏睛风热外袭证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['漏睛', '泪囊炎', '风热外袭', '疏风清热', '竹叶泻经汤'],
    intent: '掌握漏睛风热外袭证的主症舌脉、病机与疏风清热解毒排脓治法，理解脓成忌挤的安全要点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '竹叶泻经汤加减水煎：竹叶9g、柴胡6g、栀子9g、黄芩9g、黄连3g、羌活6g、升麻6g、赤芍9g、车前子9g包煎、泽泻9g、茯苓9g、炙甘草3g、酒大黄3g，日1剂分2次温服；脓多肿甚加蒲公英15g、金银花12g。', caution: '内眦脓成者忌自行挤压，防脓毒内攻入颅；慢性漏睛反复溢脓者宜手术（泪囊鼻腔吻合术），急性发作红肿扩散、发热者须立即就医；黄连黄芩苦寒，孕妇及脾虚者慎用。' },
    cases: null,
    stdJudgment: '漏睛内眦红肿疼痛、泪多黏浊，风热外袭者按捺泪窍有脓汁溢出，恶风发热、头痛，舌红苔薄黄脉浮数。风热客于泪窍、泪道壅滞化腐，法当疏风清热、解毒排脓，竹叶泻经汤疏解风热、清利泪窍，栀子黄芩黄连清解内热，大黄通下釜底抽薪。',
    coreDefinition: '漏睛风热外袭证以内眦红肿、泪窍溢脓、恶风发热为特征，治以疏风清热解毒排脓。',
    safety: { note: '内眦脓成忌自行挤压，防脓毒内攻；慢性漏睛反复发作者宜手术治疗；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '大黄苦寒攻下，孕妇及经期忌用，脾虚便溏者慎用'] },
    learning: {
      knowledge: '主症内眦部红肿疼痛，泪多黏浊，按捺泪窍有脓性分泌物溢出，伴恶风发热、头痛；舌红苔薄黄，脉浮数。病机风热外袭客于泪窍，泪道壅滞化腐。治以疏风清热、解毒排脓，竹叶泻经汤加减，肿甚加蒲公英金银花，脓成由医师处理，忌挤压。',
      misjudgment: '漏睛流脓即按压排脓。错：挤压可使脓毒内攻，或逆流入眶入颅，酿成危候；泪窍溢脓须引流有道，急性期药物控制，脓成切开引流由医师施行。',
      reasoning: '漏睛急性发作与慢性溢脓在治法上为何内服与外治轻重不同？',
      feedback: '急性风热外袭以疏风清热、内服为主，脓成则切开引流；慢性久溢脓者泪道已阻塞，须手术重建泪道通道，内服难求根治。',
      transfer: '内眦红肿溢脓、按之痛甚而恶风发热者，试述治疗原则与禁忌。',
    },
  },
  // ============================================================
  // W 中医眼科学 · 眼丹与暴盲（009–010）
  // ============================================================
  {
    id: 'pb41-w-009', title: '眼科·眼丹热毒炽盛证治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['眼丹', '眼睑丹毒', '热毒炽盛', '泻火解毒', '黄连解毒汤', '五味消毒饮'],
    intent: '掌握眼丹热毒炽盛证的主症舌脉、病机与泻火解毒消肿散结治法，牢记眼丹向眶内蔓延的急症红线。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '至真要大论篇第七十四', originalText: '诸痛痒疮，皆属于心。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '黄连解毒汤合五味消毒饮加减水煎：黄连6g、黄芩9g、黄柏9g、栀子9g、金银花15g、野菊花12g、蒲公英15g、紫花地丁15g、紫背天葵子9g、赤芍9g、牡丹皮9g、天花粉12g、皂角刺9g，日1剂分2次温服；高热烦渴加石膏30g先煎、知母9g。', caution: '眼丹可向眶内蔓延致眶蜂窝织炎、海绵窦血栓而危及生命，红肿波及眉额颊部、眼球突出、发热神昏者属急症，须立即就医，切勿挤压；苦寒解毒之剂中病即止，孕妇慎用。' },
    cases: null,
    stdJudgment: '眼丹胞睑漫肿赤痛、灼热拒按，热毒炽盛者肿势波及眉额、耳前淋巴结肿大，壮热口渴、便秘溲赤，舌红苔黄燥脉洪数。火毒循经上攻、气血壅滞胞睑，法当泻火解毒、消肿散结，黄连解毒汤苦寒泻火，五味消毒饮清热解毒，皂刺花粉溃坚散结。',
    coreDefinition: '眼丹热毒炽盛证以胞睑漫肿赤痛、壮热口渴、脉洪数为特征，治以泻火解毒消肿散结。',
    safety: { note: '眼丹向眶内蔓延属急症须立即就医，切忌挤压；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['黄连解毒汤诸品苦寒，脾胃虚寒者慎用；孕妇慎用'] },
    learning: {
      knowledge: '胞睑漫肿赤痛、灼热拒按，耳前淋巴结肿大，壮热口渴、便秘溲赤，舌红苔黄燥、脉洪数。火毒炽盛、循经上攻，气血壅滞胞睑。治以泻火解毒、消肿散结，黄连解毒汤合五味消毒饮加减（黄连、黄芩、黄柏、栀子、金银花、紫花地丁），赤芍凉血、皂角刺溃坚。',
      misjudgment: '眼丹初起红肿即按针眼轻症待其自溃。错：眼丹病重，漫肿无头、范围广大，毒盛可内攻眶颅；针眼局限成脓、可溃可消，两者轻重悬殊，眼丹须重剂急治。',
      reasoning: '同为胞睑生疮，针眼局限易愈，眼丹漫肿可危，其病机与处置何以一轻一重？',
      feedback: '针眼邪浅结聚成脓，消之溃之皆宜；眼丹毒深漫肿，热毒可循血脉内陷，故须泻火解毒重剂截断，并密切观察是否波及眶内。',
      transfer: '胞睑漫肿炽痛、高热神昏谵语者，试分析毒陷之变并说明急救原则。',
    },
  },
  {
    id: 'pb41-w-010', title: '眼科·目系暴盲气滞血瘀证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['目系暴盲', '视神经病变', '气滞血瘀', '行气活血', '血府逐瘀汤'],
    intent: '掌握目系暴盲气滞血瘀证的主症舌脉、病机与行气活血通络明目治法，牢记暴盲急症须抢时救治。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医眼科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '大惑论第八十', originalText: '五脏六腑之精气，皆上注于目而为之精。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '血府逐瘀汤加减水煎：桃仁9g、红花6g、当归9g、川芎9g、赤芍9g、生地黄12g、柴胡6g、桔梗6g、牛膝9g、枳壳9g、生甘草3g，加丹参15g、石菖蒲6g、郁金9g，日1剂分2次温服；眼底出血明显加三七粉3g冲服、茜草9g。', caution: '目系暴盲为眼科急症，缺血性视神经病变、视网膜中央动脉阻塞等抢救以小时计，须立即就医，不可迟待；桃仁红花活血力峻，孕妇禁用，出血期须结合眼底情况慎用破瘀。' },
    cases: null,
    stdJudgment: '目系暴盲视力骤然下降或失明，气滞血瘀者多因情志郁怒，头目胀痛、胸胁满闷，眼底视乳头水肿或有出血，舌紫暗脉弦涩。气滞则血瘀、目系脉络闭阻，神光不能上达，法当行气活血、通络明目，血府逐瘀汤活血行气，丹参菖蒲郁金通络开窍，须抢时救治。',
    coreDefinition: '目系暴盲气滞血瘀证以视力骤降、头目胀痛、舌紫暗脉弦涩为特征，治以行气活血通络明目。',
    safety: { note: '目系暴盲属眼科急症，抢救以小时计，须立即就医；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['桃仁红花活血祛瘀，孕妇禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '三七活血止血，孕妇慎用，出血量多者须结合止血治疗'] },
    learning: {
      knowledge: '主症一眼或双眼视力骤然下降甚至失明，伴头目胀痛、胸胁满闷、情志抑郁；眼底视乳头水肿或出血；舌紫暗或有瘀斑，脉弦涩。病机气滞血瘀、目系脉络闭阻。治以行气活血、通络明目，血府逐瘀汤加减，加丹参石菖蒲郁金通络开窍，须抢时急诊。',
      misjudgment: '暴盲无痛即按肝肾亏虚缓补。错：暴盲急症常因血脉瘀阻或气血脱失，缓补坐失时机；当先辨阻塞、出血、缺血之急，行气活血、通络救盲为先，复明而后议补。',
      reasoning: '同是暴盲，气滞血瘀与气血两虚的治法为何一攻一补，误补何以贻误病机？',
      feedback: '气滞血瘀者实证居多，宜行气活血速通目系脉络；气血两虚者脉细弱无瘀象，宜益气养血。瘀实误补则闭者愈闭，虚证误攻则耗气伤血，救盲时机转瞬即逝。',
      transfer: '郁怒后一眼骤然失明、头目胀痛者，试述急诊思路与活血通络立法。',
    },
  },
];
