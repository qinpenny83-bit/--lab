// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part T（T 中医妇科学 10 节点 pb41-t-001 ~ pb41-t-010）
// 学科：T 中医妇科学；覆盖：月经病（经行头痛/经行泄泻/经行浮肿）/
//       妊娠病（妊娠咳嗽/妊娠小便淋痛）/ 产后病（产后大便难/产后身痛/产后乳汁自出）/
//       妇科杂病（妇人腹痛/盆腔炎）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「病类·病证·证型证治」式
// facts sourceTitle 限定：《中医妇科学》规划教材 / 《方剂学》规划教材 / 《中药学》规划教材 / 《中国药典》 / 《金匮要略》规划教材
// classics 一律整书名 label（《素问》《金匮要略》《诸病源候论》《景岳全书》《医宗金鉴》），
//   篇名入 chapter，originalText 逐字核对，sourceType:'classic_original'，status:'verified'，
//   均已在 phase-5/classic-patch.mjs 收录；拿不准的留空
// dosage 一律填写 guideline/caution，妊娠期用药与经期用药分别说明，剂量与《中国药典》及规划教材通行表述一致
// 高危药红线按 authoring-spec 第 4 节表：附子（003）/木通（005）/桃仁红花妊娠禁忌（009）等
//   均已写入 safety.prohibitions；妊娠病节点均写明妊娠用药禁忌红线
// 难度分布：简单 3（difficulty 1：001/002/006）/ 中等 3（difficulty 2：003/004/007）/
//   困难 2（difficulty 3：009/010）/ 易混综合 2（易混淆 1：005 + 综合推理 1：008）
// ============================================================

export const PART_T = [
  // ============================================================
  // T 中医妇科学 · 月经病 · 经行头痛（001）
  // ============================================================
  {
    id: 'pb41-t-001', title: '月经病·经行头痛肝火证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['月经病', '经行头痛', '肝火', '清热平肝', '天麻钩藤饮', '冲任气血'],
    intent: '掌握经行头痛肝火证的主症舌脉、病机与清热平肝息风止痛治法，理解其随月经周期发作的气血机理。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '至真要大论篇第七十四', originalText: '诸风掉眩，皆属于肝。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '天麻钩藤饮加减（天麻、钩藤、石决明、栀子、黄芩、川牛膝、杜仲、益母草、桑寄生、夜交藤、茯神）水煎，天麻、钩藤（后下）各10~15g，石决明15~30g先煎，栀子、黄芩各6~10g，日1剂分2次温服。', caution: '钩藤含生物碱，久煎效减，须后下；石决明质重先煎；经期量多者益母草、川牛膝活血下行之品宜减量；肝火头痛经期忌辛辣刺激与熬夜，保持情志舒畅。' },
    cases: null,
    stdJudgment: '经行头痛每逢经期或经行前后发作，经净自止，因冲气随经血上逆、清窍受扰。肝火证见经前或经期巅顶或两侧胀痛掣痛，伴头晕目眩、口苦咽干、烦躁易怒、乳房胀痛，舌红苔黄脉弦数；肝郁化火循经上扰，法宜清热平肝、息风止痛，天麻钩藤饮平肝息风、芩栀清热，火降则痛止。',
    coreDefinition: '经行头痛肝火证以经期巅顶两侧胀痛掣痛、口苦烦躁、舌红脉弦数为特征，治以清热平肝息风止痛。',
    safety: { note: '妇科辨证知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症经前或经期头痛剧烈，多发于巅顶或两侧颞部，胀痛或掣痛，经后渐减，伴头晕目眩、口苦咽干、烦躁易怒、失眠多梦、经前乳房胀痛；舌红苔黄，脉弦数。病机肝郁化火，经前冲气挟肝火循经上逆，扰于清窍。治以清热平肝、息风止痛，主方天麻钩藤饮（天麻、钩藤、石决明、栀子、黄芩、川牛膝、杜仲、益母草、桑寄生、夜交藤、茯神），头痛如掣加羚羊角（或山羊角代）、蔓荆子，便秘加龙胆草、大黄；调护经前调畅情志、忌辛辣。',
      misjudgment: '经行头痛一律按血虚头痛补养。错：肝火者胀痛掣痛、口苦烦躁、舌红脉弦数，属实热；血虚者隐痛绵绵、头晕目眩、舌淡脉细弱，属虚；误补则火愈炽、痛愈甚。',
      reasoning: '经行头痛平时不发而经期发作，为何与肝经及冲气上逆密切相关？',
      feedback: '肝藏血、司疏泄，经前阴血下注冲任，肝体失养则疏泄太过、气郁化火，冲气挟火循肝经上至巅顶而头痛；经净血复则火平痛止，故其发作具有周期性。',
      transfer: '经期伴烦躁易怒、口苦而偏头痛明显者，试按肝火立法并说明经前预防性调治思路。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 月经病 · 经行泄泻（002）
  // ============================================================
  {
    id: 'pb41-t-002', title: '月经病·经行泄泻脾虚证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['月经病', '经行泄泻', '脾虚', '健脾化湿', '参苓白术散', '经期运化'],
    intent: '掌握经行泄泻脾虚证的主症舌脉、病机与健脾益气化湿止泻治法，理解经期脾运受碍之机。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《景岳全书》', canon: '《景岳全书》', chapter: '杂证谟·泄泻', originalText: '泄泻之本，无不由于脾胃。', sourceTitle: '《景岳全书》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '参苓白术散加减（人参、白术、茯苓、甘草、山药、莲子肉、薏苡仁、扁豆、砂仁、桔梗）水煎或制散，白术、茯苓各10~15g，山药15~20g，砂仁3~6g后下，日1剂分2次温服。', caution: '参苓白术散甘温补脾，湿热蕴盛、泄泻臭秽者不宜单投；砂仁含挥发油，入煎须后下；经期泄泻者忌食生冷油腻，注意腹部保暖，兼肾虚腰酸者酌加补骨脂、益智仁。' },
    cases: null,
    stdJudgment: '经行泄泻每值经前或经期大便溏泄，经净自止，因脾虚失运、经期气血下注冲任而脾运愈弱，水湿下注肠间。脾虚证见大便溏泄、日二三次，脘腹胀满，神疲肢倦，纳差口淡，面色萎黄，舌淡胖苔白脉濡缓；治以健脾益气、化湿止泻，参苓白术散培土渗湿，脾旺则水湿自化，泄泻得止。',
    coreDefinition: '经行泄泻脾虚证以经期大便溏泄、脘腹胀满、神疲纳差、舌淡脉濡缓为特征，治以健脾益气化湿止泻。',
    safety: { note: '妇科辨证知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症经前或经期大便溏泄，日2~3次，便质清稀，脘腹胀满，纳呆口淡，神疲肢倦，面色萎黄，经量多色淡；舌淡胖边有齿痕，苔白，脉濡缓。病机脾气虚弱，运化失职，经期气血注于冲任，脾运愈弱，水湿下注。治以健脾益气、化湿止泻，主方参苓白术散（人参、白术、茯苓、甘草、山药、莲子肉、薏苡仁、扁豆、砂仁、桔梗），腹胀甚加木香、厚朴，神疲甚加黄芪，虚寒腹痛加炮姜；调护经期忌生冷，食宜温软易消化。',
      misjudgment: '经行泄泻投清肠利湿之品。错：本证因脾虚不运，非肠中湿热，清利苦寒反伤脾阳，泄泻愈甚；当温运健脾，培土以制水。',
      reasoning: '平日大便正常而经期即泄泻，为何说关键在于脾虚而冲任气血变动？',
      feedback: '脾虚为本，经期阴血下注冲任、气血分移，脾运益形不足，水湿无以转输乃下泄为溏；经净气血归复，脾运暂充，故泄泻自止，发作与经期同步即其明证。',
      transfer: '经行泄泻兼腰膝酸软、五更便溏者，试辨析其是否脾肾同病及立法变化。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 月经病 · 经行浮肿（003）
  // ============================================================
  {
    id: 'pb41-t-003', title: '月经病·经行浮肿脾肾阳虚证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['月经病', '经行浮肿', '脾肾阳虚', '温肾健脾', '肾气丸', '苓桂术甘汤', '附子'],
    intent: '掌握经行浮肿脾肾阳虚证的主症舌脉、病机与温肾健脾化气行水治法，掌握附子煎服警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '水热穴论篇第六十一', originalText: '肾者，胃之关也，关门不利，故聚水而从其类也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '肾气丸合苓桂术甘汤加减（熟地黄、山药、山茱萸、茯苓、泽泻、牡丹皮、制附子、桂枝、白术、甘草）水煎，制附子3~9g先煎久煎，桂枝3~9g，白术、茯苓各10~15g，日1剂分2次温服。', caution: '附子须炮制并先煎久煎至无麻辣感，方可入煎；附子反半夏、瓜蒌、贝母、白蔹、白及，不宜同用；肉桂、附子温热助火，阴虚内热、湿热浮肿者忌用；经行浮肿者经期宜低盐饮食，控制水液摄入。' },
    cases: null,
    stdJudgment: '经行浮肿每逢经前或经期面目四肢浮肿，经净渐消，因脾肾阳虚、水湿不化，经期气血下注则水湿泛溢肌表。脾肾阳虚证见面浮肢肿、按之凹陷不起，腰膝酸软，畏寒肢冷，纳少便溏，舌淡胖边有齿痕苔白润脉沉细；治宜温肾健脾、化气行水，肾气丸温肾助阳化气、苓桂术甘汤健脾渗湿，阳气得复则水行肿消。',
    coreDefinition: '经行浮肿脾肾阳虚证以经期面浮肢肿、按之凹陷、畏寒肢冷、舌淡胖为特征，治以温肾健脾化气行水。',
    safety: { note: '方含附子、桂枝温热之品，阴虚内热者忌；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '桂枝辛温助热，阴虚火旺、血热者慎用'] },
    learning: {
      knowledge: '主症经前或经期面目浮肿，四肢肿胀，按之凹陷不起，随月经周期反复，伴腰膝酸软、畏寒肢冷、神疲乏力、纳少便溏、经量多色淡；舌淡胖边有齿痕，苔白润，脉沉细或沉迟。病机脾肾阳虚，水湿内停，经期气血下注，水湿泛溢肌肤。治以温肾健脾、化气行水，主方肾气丸合苓桂术甘汤（熟地黄、山药、山茱萸、茯苓、泽泻、牡丹皮、制附子、桂枝、白术、甘草），便溏加补骨脂、肉豆蔻，肿甚加猪苓、车前子；调护经期低盐饮食。',
      misjudgment: '经行浮肿一概利水消肿。错：本证阳虚为本，纯利水则阳愈虚、水复聚，须温肾健脾化气，气化则水行，附子桂枝温阳是取效关键。',
      reasoning: '同为水肿，为何经行浮肿治重温肾健脾，而风水相搏之肿治以疏风利水？',
      feedback: '经行浮肿发于经期、经净自消，为周期性之虚证水肿，根在脾肾阳虚不能化气；风水之肿起病急、兼表证，属实证，治须宣肺利水；一虚一实，法有天渊。',
      transfer: '经行浮肿而平素小便清长、腰冷者，试分析其阳虚程度及附子用量调节。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 妊娠病 · 妊娠咳嗽（004）
  // ============================================================
  {
    id: 'pb41-t-004', title: '妊娠病·妊娠咳嗽阴虚肺燥证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['妊娠病', '妊娠咳嗽', '阴虚肺燥', '养阴润肺', '百合固金汤', '妊娠用药禁忌'],
    intent: '掌握妊娠咳嗽阴虚肺燥证的主症舌脉、病机与养阴润肺止咳安胎治法，牢记妊娠期用药宜忌。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.妊娠用药警戒', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '咳论篇第三十八', originalText: '五脏六腑皆令人咳，非独肺也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '百合固金汤加减（百合、生地黄、熟地黄、玄参、麦冬、川贝母、当归、白芍、桔梗、甘草）水煎，百合、麦冬各10~15g，玄参10g，川贝母3~9g研粉冲服或入煎，日1剂分2次温服；妊娠期去当归，熟地黄减量，加桑寄生、续断、菟丝子安胎。', caution: '妊娠期忌用辛散温燥之品（麻黄、细辛、半夏类）止咳，防伤胎元；当归活血，妊娠期宜去或减量；川贝母、桔梗用量宜轻；干咳痰中带血者须排除妊娠相关出血性疾病，及时就诊。' },
    cases: null,
    stdJudgment: '妊娠咳嗽（子嗽）发于妊娠期，因胎火偏盛或阴津不足，肺失清润而咳。阴虚肺燥证见妊娠咳嗽干咳少痰或无痰，咽干口燥，手足心热，午后潮热颧红，舌红少苔脉细滑数；阴虚于下、胎火灼肺，法宜养阴润肺、止咳安胎，百合固金汤滋肾润肺，加桑寄生、续断安胎，肺润胎安则咳自止。',
    coreDefinition: '妊娠咳嗽阴虚肺燥证以妊娠期干咳少痰、咽干潮热、舌红少苔为特征，治以养阴润肺止咳安胎。',
    safety: { note: '妊娠期用药须顾护胎元，忌辛散温燥与破血滑利之品；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['妊娠期忌用麻黄、细辛、半夏等辛温燥烈之品', '当归活血，妊娠期宜去或减量，防滑胎动胎'] },
    learning: {
      knowledge: '主症妊娠期间咳嗽，干咳少痰或痰中带血丝，咽干口燥，声音嘶哑，午后潮热，手足心热，颧红，纳差；舌红少苔，脉细滑数。病机素体阴虚，孕后血聚养胎，阴津愈亏，胎火偏盛，肺失濡润。治以养阴润肺、止咳安胎，主方百合固金汤加减（百合、生地黄、玄参、麦冬、川贝母、白芍、桔梗、甘草，去当归加桑寄生、续断），咳甚加款冬花、紫菀，痰中带血加旱莲草、仙鹤草；调护多饮水、忌辛辣燥热、防受凉。',
      misjudgment: '妊娠咳嗽按普通外感咳嗽投疏风宣肺剂。错：子嗽多因阴虚胎火，非表邪束肺，辛散宣肺反耗阴助火伤胎；妊娠咳嗽须处处顾护胎元，宣散之品当忌。',
      reasoning: '妊娠咳嗽养阴之方为何去当归，而加桑寄生、续断之类安胎药？',
      feedback: '当归活血行血，孕后用之恐滑胎动胎，故去之；桑寄生、续断补肾安胎，使肺肾阴充、胎元稳固，治病与安胎并举，此妊娠病治疗之特色。',
      transfer: '妊娠中期干咳咽燥、夜间尤甚者，试按阴虚肺燥立法并交代起居宜忌。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 妊娠病 · 妊娠小便淋痛（005）
  // ============================================================
  {
    id: 'pb41-t-005', title: '妊娠病·妊娠小便淋痛心火偏亢证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['妊娠病', '妊娠小便淋痛', '子淋', '心火偏亢', '清心泻火', '导赤散', '木通警戒'],
    intent: '掌握妊娠小便淋痛心火偏亢证的主症舌脉、病机与清心泻火润燥通淋治法，辨析其与湿热下注证之异并掌握妊娠用药警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.妊娠用药警戒', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《诸病源候论》', canon: '《诸病源候论》', chapter: '淋病诸候', originalText: '诸淋者，由肾虚而膀胱热故也。', sourceTitle: '《诸病源候论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '导赤散加玄参、麦冬（生地黄、木通、生甘草梢、竹叶、玄参、麦冬）水煎，生地黄15g，木通3~6g，竹叶6~10g，玄参、麦冬各10g，日1剂分2次温服；心烦甚加莲子心、栀子。', caution: '木通须用川木通，用量宜小（3~6g），不可久服，肾功能不全者禁用；心火偏亢证忌用苦寒重剂清利，防损胎元；妊娠期慎用滑利通淋之品，忌投八正散类峻利药；多饮水、忌辛辣助火之品。' },
    cases: null,
    stdJudgment: '妊娠小便淋痛（子淋）以孕后尿频、尿急、淋沥涩痛为特征。心火偏亢证见小便短黄频数、淋沥涩痛，面赤心烦，口舌生疮，夜寐不安，舌尖红苔黄脉细滑数；孕后阴血养胎、心火偏亢，移热小肠下灼膀胱，法宜清心泻火、润燥通淋，导赤散清心利尿，加玄参麦冬养阴，水去热清则淋痛自愈。',
    coreDefinition: '妊娠小便淋痛心火偏亢证以妊娠期尿频涩痛、面赤心烦、口舌生疮、舌尖红为特征，治以清心泻火润燥通淋。',
    safety: { note: '妊娠期通淋须顾护胎元，忌峻利伤胎；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['木通用量宜小3-6g，须用川木通，肾功能不全者禁用，不可久服', '孕妇忌用峻下滑利之品（如八正散类），防动胎伤胎'] },
    learning: {
      knowledge: '主症妊娠期间小便频数、急迫、淋沥涩痛，尿少色黄，面赤心烦，口渴喜饮，口舌生疮，夜寐不安，舌尖红赤；舌尖红苔黄，脉细滑数。病机孕后阴血下聚养胎，心火偏亢，移热于小肠，下注膀胱。治以清心泻火、润燥通淋，主方导赤散加玄参、麦冬（生地黄、木通、生甘草梢、竹叶、玄参、麦冬），心烦加莲子心、栀子，口舌生疮加黄连少许。',
      misjudgment: '子淋见小便涩痛即按湿热下注投八正散。错：湿热下注者带下黄稠、苔黄腻、脉滑数，小便灼痛甚；心火偏亢者以心烦口疮为眼目、舌尖红、脉细滑数；八正散苦寒峻利，孕妇用之伤胎，须以导赤散清润为法。',
      reasoning: '同为妊娠淋痛，为何心火偏亢用清润之导赤散而湿热下注须另立法，其舌脉如何鉴别？',
      feedback: '心火偏亢责之于心，舌尖红、心烦口疮；湿热下注责之于脾与膀胱，苔黄腻、带下黄稠、脉滑数；心火宜清宜润，湿热宜利宜化，选方用药因机而别。',
      transfer: '孕妇小便淋痛兼带下黄稠、苔黄腻者，试辨析其与心火偏亢证的治法差异。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 产后病 · 产后大便难（006）
  // ============================================================
  {
    id: 'pb41-t-006', title: '产后病·产后大便难血虚津亏证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['产后病', '产后大便难', '血虚津亏', '养血润燥', '四物汤', '产后三病'],
    intent: '掌握产后大便难血虚津亏证的主症舌脉、病机与养血润燥润肠通便治法，理解产后多虚多瘀的病机特点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '妇人产后病脉证治', originalText: '亡津液，胃燥，故令大便难。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '四物汤加味（当归、熟地黄、白芍、川芎加肉苁蓉、火麻仁、柏子仁）水煎，当归、熟地黄各12~15g，白芍10~15g，肉苁蓉、火麻仁各10~15g捣碎，日1剂分2次温服。', caution: '产后大便难忌用大黄、番泻叶等峻下攻伐之品，产后气血大亏，峻下更伤气血，且影响乳汁；火麻仁质润多脂，脾虚便溏者减量；同时嘱产妇多饮水、多食蔬菜水果，适当下床活动，养成定时排便习惯。' },
    cases: null,
    stdJudgment: '产后大便难列于《金匮要略》新产三病之中，因产时亡血汗出、津液亏损，肠道失于濡润而大便艰涩。血虚津亏证见产后数日大便不解或艰涩难下，腹无胀痛或微胀，面色萎黄，皮肤不润，心悸头晕，神疲乏力，舌淡苔薄白脉细弱；治宜养血润燥、润肠通便，四物汤养血、肉苁蓉火麻仁润肠，血充津回则大便自通。',
    coreDefinition: '产后大便难血虚津亏证以产后大便数日不解、艰涩难下、面色萎黄、舌淡脉细弱为特征，治以养血润燥润肠通便。',
    safety: { note: '产后忌峻下攻伐，养血润肠为要；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症产后大便数日不解，或排便艰涩、努责乏力，粪质干燥，腹无明显胀痛，伴面色萎黄、皮肤不润、心悸头晕、神疲乏力、气短懒言；舌淡苔薄白，脉细弱。病机产时亡血伤津，血虚津亏，肠道失润。治以养血润燥、润肠通便，主方四物汤加味（当归、熟地黄、白芍、川芎加肉苁蓉、火麻仁、柏子仁），心悸头晕加阿胶、何首乌，气短加黄芪、党参；调护多饮水、多食蔬果、适当活动、定时排便。',
      misjudgment: '产后便秘即投大黄、芒硝攻下。错：产后气血大亏、津液不足，肠道失润而非燥结，峻下则气阴愈伤、乳汁减少，反致大便愈难，当以润养为法。',
      reasoning: '同为便秘，为何阳明腑实用承气攻下，而产后大便难反用养血润肠？',
      feedback: '承气之证燥屎内结、腹满硬痛、苔黄脉实，攻下乃去其实；产后之难腹无所苦、面色萎黄、脉细弱，润养乃补其虚；虚实异治，攻补不可倒置。',
      transfer: '产后大便难兼恶露色暗有块、小腹阵痛者，试分析血瘀兼病时如何于润肠方中兼顾活血。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 产后病 · 产后身痛（007）
  // ============================================================
  {
    id: 'pb41-t-007', title: '产后病·产后身痛外感风寒证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['产后病', '产后身痛', '外感风寒', '养血祛风', '趁痛散', '产后多虚'],
    intent: '掌握产后身痛外感风寒证的主症舌脉、病机与养血祛风散寒除湿治法，理解产后体虚感邪的发病特点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痹论篇第四十三', originalText: '风寒湿三气杂至，合而为痹也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '趁痛散加减（当归、黄芪、白术、独活、肉桂、牛膝、生姜、甘草、薤白）水煎，当归、黄芪各10~15g，独活6~10g，肉桂1~3g后下，日1剂分2次温服；痛甚加秦艽、桑枝，畏寒甚加防风、桂枝。', caution: '产后身痛治宜养血祛风，忌纯投辛散发汗之品重伤阴血；肉桂辛热，阴虚火旺者慎用；牛膝下行，恶露过多者慎用；服药期间避风寒、慎起居，肢体保暖，忌冷水洗浴。' },
    cases: null,
    stdJudgment: '产后身痛因产后气血亏虚，百节空虚，风寒湿邪乘虚侵袭经络关节而致疼痛，属虚中夹实。外感风寒证见肢体关节疼痛、屈伸不利，痛处游走或固定，得热则舒，畏寒恶风，兼见头痛，舌淡苔薄白脉浮紧；治宜养血祛风、散寒除湿，趁痛散中黄芪当归养血扶正、独活肉桂散寒祛风，血充邪去则身痛自除。',
    coreDefinition: '产后身痛外感风寒证以产后肢体关节疼痛、屈伸不利、畏寒得热则舒、脉浮紧为特征，治以养血祛风散寒除湿。',
    safety: { note: '产后身痛扶正与祛邪并重，忌过汗伤血；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症产后肢体关节酸痛、麻木重着，屈伸不利，甚则肿胀，疼痛得热则减、遇寒加重，痛处游走或固定，畏寒恶风，时有头痛，兼见乏力汗出；舌淡苔薄白，脉浮紧或浮缓。病机产后血虚，百节空虚，风寒湿邪乘虚侵袭，痹阻经络。治以养血祛风、散寒除湿，主方趁痛散（当归、黄芪、白术、独活、肉桂、牛膝、生姜、甘草、薤白），游走性痛加秦艽、威灵仙，冷痛甚加附子、桂枝；调护避风寒、肢体保暖、忌冷水浴。',
      misjudgment: '产后身痛按寻常痹证投祛风散寒重剂。错：产后气血大虚，重用辛散祛风之品汗出伤正，邪去而虚更甚，痛反难止；须黄芪当归养血扶正为先，祛邪居次。',
      reasoning: '同为风寒湿痹，为何寻常痹证可重用祛风散寒，而产后身痛须养血扶正为先？',
      feedback: '痹证之实者邪盛正不虚，可径用祛邪；产后身痛正虚为本、邪侵为标，一味祛邪则正气愈亏、邪易复入，故当扶正祛邪兼顾，此产后多虚之要义。',
      transfer: '产后冒雨涉水出现关节冷痛者，试按外感风寒立法并说明调护宜忌。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 产后病 · 产后乳汁自出（008）
  // ============================================================
  {
    id: 'pb41-t-008', title: '产后病·产后乳汁自出气虚证治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['产后病', '乳汁自出', '气虚', '补气固摄', '补中益气汤', '辨生理病理'],
    intent: '掌握产后乳汁自出气虚证的主症舌脉、病机与补气益血固摄敛乳治法，辨析生理性溢乳与病理性乳汁自出及肝经郁热之别。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '补中益气汤加减（黄芪、人参、白术、炙甘草、当归、陈皮、升麻、柴胡加五味子、芡实、牡蛎）水煎，黄芪15~30g，人参另煎兑入或以党参15g代，升麻、柴胡各3~6g，五味子6g，牡蛎15~30g先煎，日1剂分2次温服。', caution: '升麻、柴胡升提之品用量宜轻；阴虚火旺、湿热内盛者不宜单投本方；补中益气汤甘温，兼肝经郁热、乳汁稠黄量多者忌误投；乳溢量多致乳量减少者须顾护乳汁，酌情哺喂排空。' },
    cases: null,
    stdJudgment: '产后乳汁不经吮吸而自然流出，须辨生理与病理：乳汁充盈、乳房饱满而偶溢者属生理性溢乳。气虚证见乳汁自出量少质清稀、乳房柔软无胀感，伴神疲乏力、气短懒言、面色淡白，舌淡苔薄白脉细弱；产后气血亏虚、摄纳无权，乳随气泄，治宜补气益血、固摄敛乳，补中益气汤升提补气，加五味子牡蛎敛乳固摄，气旺则乳有所统。',
    coreDefinition: '产后乳汁自出气虚证以乳汁自出量少质清稀、乳房柔软无胀感、神疲气短为特征，治以补气益血固摄敛乳。',
    safety: { note: '妇科辨证知识学习，临床用药须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '主症产后乳汁不经吮吸而自行流出，量少，乳汁清稀如水，乳房柔软无胀满感，伴神疲乏力、气短懒言、面色淡白、纳差；舌淡苔薄白，脉细弱。病机产后气血亏虚，中气不足，摄纳无权，乳随气泄。治以补气益血、固摄敛乳，主方补中益气汤加减（黄芪、人参、白术、炙甘草、当归、陈皮、升麻、柴胡加五味子、芡实、牡蛎），纳差加砂仁、山药；乳房饱满而偶溢属生理，无须服药，宜按时哺喂排空。',
      misjudgment: '产后乳汁自出即投固涩敛乳之品。错：乳房饱满而乳汁充盈溢出属生理性，强予固涩反致乳汁壅滞成痈；病理性自出须辨气虚（量少清稀、乳房软）与肝热（量多质稠、乳房胀、烦躁），对证而治。',
      reasoning: '乳房饱满之溢乳与乳房柔软之乳汁自出，为何一属生理一属病理，其机制如何？',
      feedback: '溢乳乃乳汁充盈、压力外溢，源实而溢，排空自止；自出乃气虚不摄、乳随气泄，源虚而漏，补气方愈；辨乳量之多少、乳房之虚实即得其情。',
      transfer: '产后乳汁自出且量多质稠、烦躁口苦、乳房胀痛者，试辨析其证型并说明与气虚证的治法差异。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 妇科杂病 · 妇人腹痛（009）
  // ============================================================
  {
    id: 'pb41-t-009', title: '妇科杂病·妇人腹痛气滞血瘀证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['妇科杂病', '妇人腹痛', '气滞血瘀', '行气活血', '膈下逐瘀汤', '桃仁红花妊娠忌用'],
    intent: '掌握妇人腹痛气滞血瘀证的主症舌脉、病机与行气活血化瘀止痛治法，掌握活血药妊娠禁忌并辨析与寒湿凝滞证之别。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '妇人杂病脉证并治', originalText: '妇人腹中诸疾痛，当归芍药散主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '膈下逐瘀汤加减（桃仁、牡丹皮、赤芍、乌药、延胡索、甘草、当归、川芎、五灵脂、红花、香附、枳壳）水煎，桃仁、红花各6~9g，乌药、延胡索各10g，五灵脂6~10g包煎，日1剂分2次温服；经前数日开始服至经行。', caution: '方含桃仁、红花、五灵脂等破血活血之品，孕妇禁用，经期量多者慎用或减量；五灵脂须包煎；膈下逐瘀汤久用伤正，瘀去痛止即当更方调补；服药期间忌生冷，保持情志舒畅。' },
    cases: null,
    stdJudgment: '妇人腹痛以妇女非行经、妊娠及产后期间小腹疼痛为特征，范围广涉盆腔诸疾。气滞血瘀证见下腹胀痛或刺痛，痛处固定拒按，经前或经行、劳累后加重，经色紫暗有块，块下痛减，胸胁乳房胀痛，情志抑郁，舌暗有瘀点苔薄白脉弦涩；气滞则血瘀、瘀阻胞脉，治宜行气活血、化瘀止痛，膈下逐瘀汤气血同治，瘀化气行则痛止。',
    coreDefinition: '妇人腹痛气滞血瘀证以下腹胀痛刺痛、固定拒按、经色紫暗有块、舌暗脉弦涩为特征，治以行气活血化瘀止痛。',
    safety: { note: '破血活血之品妊娠期禁用；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['桃仁、红花、五灵脂破血活血，孕妇禁用，经期量多者慎用', '五灵脂须包煎；活血药久服伤正，中病即止'] },
    learning: {
      knowledge: '主症下腹部胀痛或刺痛，痛处固定，拒按，经前或经期、劳累后加重，经行不畅，经色紫暗有血块，块下痛减，伴胸胁乳房胀痛、情志抑郁、善太息；舌暗或有瘀点瘀斑，苔薄白，脉弦涩。病机情志不遂，气滞血瘀，瘀阻胞脉，不通则痛。治以行气活血、化瘀止痛，主方膈下逐瘀汤（桃仁、牡丹皮、赤芍、乌药、延胡索、甘草、当归、川芎、五灵脂、红花、香附、枳壳），腹痛甚加蒲黄、乳香，胀甚加青皮、木香；调护经前调畅情志、忌寒凉。',
      misjudgment: '妇人腹痛刺痛固定拒按即重用破血逐瘀。错：瘀久则正伤，或兼气虚、寒凝，一味破血徒耗气血；且须排除癥瘕、盆腔炎性包块等器质病变，辨清兼夹，化瘀之中随证补气或温散。',
      reasoning: '膈下逐瘀汤中香附、乌药等理气药与桃仁、红花等活血药并用，气与血在本证中如何相因致病？',
      feedback: '气为血帅，气滞则血行受阻而成瘀，血瘀又碍气行而胀痛愈甚，故行气与活血并举，气血同治方中病机，此即"气行则血行"之义。',
      transfer: '妇人小腹冷痛拘急、得热则减、经色暗淡者，试辨析其与气滞血瘀证的寒热虚实之别。',
    },
  },
  // ============================================================
  // T 中医妇科学 · 妇科杂病 · 盆腔炎（010）
  // ============================================================
  {
    id: 'pb41-t-010', title: '妇科杂病·盆腔炎湿热瘀结证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['妇科杂病', '盆腔炎', '湿热瘀结', '清热利湿', '化瘀止痛', '银甲丸', '外治灌肠'],
    intent: '掌握盆腔炎湿热瘀结证的主症舌脉、病机与清热利湿化瘀止痛治法，熟悉中药保留灌肠等外治配合及慢性期调护。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医妇科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '银甲丸加减（金银花、连翘、升麻、红藤、蒲公英、败酱草、生鳖甲、蒲黄、椿根皮、琥珀、茵陈、紫花地丁、大青叶）水煎或制丸，金银花、蒲公英各15g，红藤、败酱草各15~30g，生鳖甲10~15g先煎，蒲黄6~10g包煎，日1剂分2次温服。外治：红藤败酱草煎液保留灌肠，每晚1次；或中药渣湿热敷下腹。', caution: '银甲丸药性寒凉，脾胃虚寒、大便溏泄者慎用；蒲黄、琥珀活血散瘀，孕妇禁用，经期量多者停用；急性盆腔炎高热腹痛剧烈者须抗生素与支持治疗，中西医结合，不可单恃中药；慢性期坚持疗程并注意经期卫生、节制房事。' },
    cases: null,
    stdJudgment: '盆腔炎多因经行产后胞宫空虚，湿热之邪乘虚内侵，与血搏结，瘀阻胞宫胞脉，病势缠绵。湿热瘀结证见下腹疼痛拒按或胀痛刺痛，带下量多色黄质稠有臭味，低热起伏，口苦咽干，小便黄短，大便干结，舌红苔黄腻脉弦滑数；湿热与瘀血互结，法宜清热利湿、化瘀止痛，银甲丸清热解毒利湿、化瘀散结，配合保留灌肠直达病所，湿去瘀化则腹痛带下俱减。',
    coreDefinition: '盆腔炎湿热瘀结证以下腹疼痛拒按、带下黄稠臭秽、低热口苦、舌红苔黄腻为特征，治以清热利湿化瘀止痛。',
    safety: { note: '急性盆腔炎须中西医结合治疗防败血症；妇科辨证知识学习，临床用药须遵医嘱', prohibitions: ['蒲黄、琥珀活血散瘀，孕妇禁用，经期量多者停用'] },
    learning: {
      knowledge: '主症下腹疼痛拒按，或胀痛、刺痛，痛连腰骶，带下量多色黄质稠有臭味，低热起伏，口苦咽干，小便黄短，大便干结；舌红苔黄腻，脉弦滑数。病机湿热之邪乘虚入侵胞宫胞脉，与血搏结，湿热瘀阻。治以清热利湿、化瘀止痛，主方银甲丸（金银花、连翘、升麻、红藤、蒲公英、败酱草、生鳖甲、蒲黄、椿根皮、琥珀、茵陈、紫花地丁、大青叶），带下臭秽加土茯苓、苦参，腹痛甚加延胡索、乳香；外治红藤败酱草煎液保留灌肠、中药渣热敷下腹。',
      misjudgment: '盆腔炎腹痛仅止痛而不辨湿热。错：湿热瘀结为本，止痛为标，瘀不化、湿不去则痛反复；投止痛之品如隔靴搔痒，须清热利湿化瘀并举方能缓解。',
      reasoning: '盆腔炎慢性期常反复腹痛、带下量多，为何内服之外还须保留灌肠等外治？',
      feedback: '病位在盆腔深部，内服之药力经胃肠输布有所减损；保留灌肠使药液直达病灶、局部浓度高，内服外灌相合可增效，此妇科外治之一法。',
      transfer: '慢性盆腔炎反复小腹隐痛、带下量多色黄者，试拟内服与保留灌肠配合的长期调治方案。',
    },
  },
];
