// ============================================================
// 杏林大典 · Phase 5 · Batch-13 · 样本 Part M2（M 方剂剂量维度 10 节点）
// ID 区间 pb13-m-011 ~ pb13-m-020，category 一律 'formula'，title 用「剂量·主题」式
// 主题覆盖：中病即止原则 / 量效关系与毒性阈值 / 药食同源品限量 /
//       内服外用剂量之别 / 妊娠用药剂量警戒 / 服药时辰与用法用量 /
//       现代药理与安全窗 / 仲景方常量药考证 / 历代医家剂量经验 / 剧毒药剂量警戒
// 原则：剂量数值一律对照《中国药典》与规划教材通行表述；
//       高危药（罂粟壳/常山/马钱子/朱砂/雄黄/巴豆/蟾酥/斑蝥/乌头/附子/细辛/甘遂）
//       safety.prohibitions 必含【高风险】红线，红线与 authoring-spec 第 4 节目录一致；
//       dosage 字段为本学科核心字段，guideline 写标准剂量与用法、caution 写禁忌与警戒。
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// ============================================================

export const SAMPLES_PART_M2 = [
  // ============================================================
  // M 方剂剂量 · 中病即止原则（011）
  // ============================================================
  {
    id: 'pb13-m-011', title: '剂量·中病即止原则', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['剂量维度', '中病即止', '罂粟壳·高风险', '常山·高风险'],
    intent: '掌握发汗、攻下、催吐等峻猛治法与罂粟壳、常山等药「中病即止」的剂量底线。',
    facts: [
      { field: 'formula.dosage-principle', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.toxicity', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '一服汗出病差停后服', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '若一服汗出病差，停后服，不必尽剂' }],
    dosage: { guideline: '罂粟壳煎服 3-6g（蜜炙敛肺止咳、涩肠止泻），常山煎服 5-9g（涌吐痰饮可稍增量）；发汗、攻下、催吐之剂以得效为度，汗出、便通、痰涎吐出即停后服', caution: '罂粟壳有成瘾性，孕妇及儿童禁用，不可过量久服；常山涌吐力猛，体虚、孕妇慎用；过汗伤阳、过下伤阴、过吐伤正，均须中病即止' },
    cases: null,
    stdJudgment: '「中病即止」是峻猛治法与有毒药物的共同剂量底线：发汗以微汗为度、攻下以大便通利为度、催吐以痰涎得出为度，得效即停后服；罂粟壳、常山等有毒之品更须严格限量，防止药过病所、反伤正气。',
    coreDefinition: '中病即止：使用汗、吐、下及有毒药物时，以效验为度、病去即止，不可尽剂或久服，防止过汗亡阳、过下伤阴、毒物蓄积的用药原则。',
    safety: { note: '罂粟壳蜜炙入煎 3-6g，连续使用不超过常规疗程，防成瘾；常山生用催吐力猛，多炒用或酒炒减其涌吐之性，体虚者禁用。', prohibitions: ['【高风险】罂粟壳有毒、有成瘾性，3–6g 中病即止；孕妇及儿童禁用', '【高风险】常山有毒、涌吐力猛，中病即止；体虚孕妇慎用'] },
    learning: {
      knowledge: '罂粟壳：酸、涩，平，有毒，归肺、大肠、肾经。敛肺止咳、涩肠止泻、止痛。主治久咳虚嗽、久泻久痢、心腹及筋骨疼痛。煎服 3-6g，蜜炙止咳、醋炙止泻。有毒且易成瘾，须中病即止，孕妇及儿童禁用。常山：苦、辛，寒，有毒，归肺、心、肝经。涌吐痰涎、截疟。主治胸中痰饮、疟疾。煎服 5-9g，涌吐痰饮可稍增量，但须中病即止；生用催吐力猛，多酒炒或醋炒减毒。',
      misjudgment: '把「中病即止」理解为「症状稍减即停药」。错：中病即止指药力已中病、主症得解即停后服，并非见轻即止；如汗出病差停后服、得快下利即止，是为防过剂伤正。',
      reasoning: '同为收涩药，罂粟壳为何必须「中病即止」而乌梅、五味子可较长期服用？',
      feedback: '罂粟壳含吗啡类生物碱、有毒且易成瘾，咳泻减轻即须停服；乌梅、五味子为安全收涩之品，无成瘾性，可随证调治。',
      transfer: '峻下逐水之十枣汤「得快下利后，糜粥自养」，其「中病即止」之理与此何异？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 量效关系与毒性阈值（012）
  // ============================================================
  {
    id: 'pb13-m-012', title: '剂量·量效关系与毒性阈值', category: 'formula', difficulty: 4, difficultyLabel: '综合推理',
    riskTags: ['剂量维度', '量效关系', '毒性阈值', '马钱子·高风险', '细辛·高风险'],
    intent: '理解同一药物随剂量增减而功效递变的量效曲线，以及有毒药有效量与中毒量接近的剂量学要点。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.toxicity', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '柴胡：升举清阳 3-6g、疏肝解郁 6-9g、退热 9-15g（随证酌定）；大黄：健胃 1-3g、泻下 3-9g（后下）、攻积 10g 以上；附子：温阳 3-9g、回阳救逆 9-15g（先煎久煎）；有毒药按极量掌握', caution: '剂量递增不等于疗效递增，量效关系存在阈值与平台；马钱子、细辛、乌头类有效量与中毒量接近，加量即越入中毒区，孕妇及体弱者尤须收敛用量' },
    cases: null,
    stdJudgment: '剂量是方剂取效与致毒的分水岭：同一药物小、中、大剂量可呈现相反或递变的功效（如柴胡之升举与退热、大黄之健胃与攻积），有毒药的有效量与中毒量差距小、量效曲线陡峭，超量即由治疗转为伤害。',
    coreDefinition: '量效关系指药物剂量与效应强度间的对应规律；毒性阈值是药效转为毒性的剂量界限，有毒药因安全窗窄，剂量稍越即中毒。',
    safety: { note: '按证定量：峻药取效即止，不以「量大效宏」为追求；同一方中佐使药用量须轻于君药，防止主次颠倒。', prohibitions: ['【高风险】马钱子有大毒，炮制后 0.3–0.6g 入丸散，过量致惊厥；孕妇禁用', '【高风险】细辛煎剂 1–3g、散剂 0.5–1g，过量可致中毒；反藜芦'] },
    learning: {
      knowledge: '量效曲线的核心是「量变引起质变」：大黄 1-3g 健胃消食，3-9g 泻下攻积，10g 以上峻下；柴胡 3-6g 升举清阳，6-9g 疏肝解郁，大剂量透邪退热。有毒药如马钱子（0.3-0.6g 入丸散）、细辛（煎剂 1-3g）、附子（3-15g 先煎久煎）有效量与中毒量接近，剂量稍有逾越即现毒性反应。',
      misjudgment: '以为剂量越大疗效越强。错：量效关系有阈值和平台期，超过治疗窗后疗效不再增加而毒性陡增；尤其马钱子、乌头类安全窗窄，超量直接致中毒。',
      reasoning: '同一味大黄，为何小剂量健胃、大剂量攻下，其间的量效机制如何理解？',
      feedback: '大黄小剂量刺激胃肠蠕动而健胃，大剂量苦寒泻下、荡涤积滞，是「量变到质变」的典型；用量须与病位、病势相符，并非愈大愈佳。',
      transfer: '甘草小量调和诸药、大量（10g 以上）清热解毒或缓急止痛，试举一含甘草方剂的剂量安排说明之。',
    },
  },
  // ============================================================
  // M 方剂剂量 · 药食同源品限量（013）
  // ============================================================
  {
    id: 'pb13-m-013', title: '剂量·药食同源品限量', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['剂量维度', '药食同源', '山药', '枸杞子', '大枣'],
    intent: '掌握山药、枸杞子、大枣等药食同源品的常规剂量与过量偏性。',
    facts: [
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'herb.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '山药 15-30g（补脾养胃、生津益肺），枸杞子 6-12g（滋补肝肾、益精明目），大枣 6-15g（劈破入煎），生姜 3-9g（3-5 片），薏苡仁 9-30g，龙眼肉 9-15g', caution: '枸杞子甘润，脾虚便溏、实热者不宜多服；大枣甘壅助湿，湿盛脘腹胀满、痰热咳嗽者忌用；山楂多食损齿伤胃；山药养阴助湿，湿盛中满者慎用' },
    cases: null,
    stdJudgment: '药食同源品虽可入膳，入药仍当守量：山药 15-30g 补脾益肾、枸杞子 6-12g 滋补肝肾、大枣 6-15g 补中益气、生姜 3-9g 解表散寒，超量或久服，其甘润、辛散、温补之偏性同样致害。',
    coreDefinition: '药食同源品指既可作食品又列入药用的物品，性质平和仍具偏性，入药按常规剂量、食疗亦不宜超量久服。',
    safety: { note: '食疗代茶饮亦须有度：枸杞菊花茶、大枣生姜汤久服过量可致上火、腹胀；糖尿病患者慎用大枣、龙眼肉等高糖之品。', prohibitions: [] },
    learning: {
      knowledge: '山药甘平，补脾养胃、生津益肺、补肾涩精，煎服 15-30g；枸杞子甘平，滋补肝肾、益精明目，煎服 6-12g；大枣甘温，补中益气、养血安神，煎服 6-15g，劈破入煎；生姜辛微温，解表散寒、温中止呕，煎服 3-9g。四药药食两用，然甘壅、辛散、温补各有偏性，超量久服反生腹胀、上火等弊。',
      misjudgment: '把药食同源品当作「多吃无害」的保健品。错：山药、枸杞、大枣等虽可作食物，入药仍有剂量与禁忌，枸杞多服上火、大枣助湿生热，食疗过量同样致病。',
      reasoning: '同为药食同源，山药补脾与薏苡仁健脾利湿的剂量与服法有何不同？',
      feedback: '山药偏于平补脾肾之阴、可作主食替代，用量可至 30g；薏苡仁利湿兼清热、性偏滑利，9-30g 煎服，孕妇慎用。',
      transfer: '以枸杞子泡水代茶常饮者出现目赤口疮，说明药食同源品存在何种剂量陷阱？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 内服与外用剂量之别（014）
  // ============================================================
  {
    id: 'pb13-m-014', title: '剂量·内服与外用剂量之别', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['剂量维度', '内服外用', '川乌·高风险', '斑蝥·高风险', '蟾酥·高风险'],
    intent: '掌握乌头、斑蝥等有毒药内服与外用剂量的差异及外用经皮吸收中毒的风险。',
    facts: [
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'herb.toxicity', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '川乌、草乌内服须炮制，煎服 1.5-3g，先煎久煎；斑蝥内服 0.03-0.06g 入丸散；蟾酥 0.015-0.03g 入丸散；外用均取适量（研末调敷或制膏贴），不得大面积、长时间使用', caution: '外用并非绝对安全：斑蝥素、乌头碱、蟾酥毒素均可经皮吸收，大面积敷贴或破损皮肤用药可致中毒；斑蝥外用刺激皮肤发泡，不可入目及黏膜；川乌草乌反半夏瓜蒌贝母白蔹白及' },
    cases: null,
    stdJudgment: '内服与外用的剂量体系互不相通：川乌、草乌内服 1.5-3g 须先煎久煎，外用适量研末调敷；斑蝥内服 0.03-0.06g 只入丸散，外用发泡拔毒；有毒成分可经皮吸收，外用面积大、时间久同样中毒。',
    coreDefinition: '内服外用剂量之别：有毒药内服须炮制并严格限量，外用虽不经胃肠吸收，仍可通过皮肤、黏膜吸收中毒，故外用亦须控制面积与时长。',
    safety: { note: '斑蝥外用只宜小面积点敷、起泡即去，不可涂搽破损皮肤与黏膜；川乌、草乌外用不宜久敷，出现麻舌、心悸即停；孕妇及心肾功能不全者内服外用均禁用斑蝥。', prohibitions: ['【高风险】斑蝥有大毒，0.03–0.06g 只入丸散；孕妇及心肾功能不全禁用', '【高风险】川乌、草乌（附子类）须炮制，先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用'] },
    learning: {
      knowledge: '川乌、草乌辛热有大毒，祛风除湿、温经止痛，内服须炮制，煎服 1.5-3g，先煎、久煎至口尝无麻辣感；外用适量研末调敷。斑蝥辛热有大毒，破血逐瘀、散结消癥、攻毒蚀疮，内服 0.03-0.06g 入丸散，外用适量。乌头碱、斑蝥素均可经皮肤吸收，外用剂量以「适量」为限，禁止大面积、长时间敷贴。',
      misjudgment: '认为「外用药不入胃肠就不会中毒」。错：乌头碱、斑蝥素可通过完整皮肤吸收，外敷面积过大、时间过久或用于破损皮肤，吸收量足以引起心律失常、肾损害等中毒。',
      reasoning: '斑蝥内服仅 0.03-0.06g，为何外用发泡时亦须控制面积？',
      feedback: '斑蝥素刺激性极强且可经皮吸收，外敷发泡是局部攻毒之法，面积过大则吸收过量，引起尿血、肾损伤，故只能小面积点敷、起泡即去。',
      transfer: '蟾酥入眼可致失明，试说明有毒药外用为何同样需要剂量警戒。',
    },
  },
  // ============================================================
  // M 方剂剂量 · 妊娠用药剂量警戒（015）
  // ============================================================
  {
    id: 'pb13-m-015', title: '剂量·妊娠用药剂量警戒', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['剂量维度', '妊娠警戒', '附子·高风险', '巴豆·高风险', '甘遂·高风险'],
    intent: '掌握妊娠禁用与慎用药物目录及孕妇方剂中的剂量处理原则。',
    facts: [
      { field: 'herb.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'herb.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.safety', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '妊娠方剂禁用剧毒、峻下、破血、辛热走窜之品（斑蝥、水蛭、虻虫、马钱子、巴豆、甘遂、大戟、芫花、牵牛子、麝香、附子、朱砂、雄黄等）；慎用活血行气药（桃仁、红花、川芎、牛膝、枳实、大黄、芒硝等），必须用时取最小剂量、中病即止', caution: '禁用者一票否决、处方即去；慎用者非必需不用，确需活血化瘀（如保产无忧散之川芎、当归）亦以小量为度，并嘱孕者随诊' },
    cases: null,
    stdJudgment: '妊娠用药以「禁用不用、慎用减量」为铁律：斑蝥、水蛭、巴豆、甘遂、附子等剧毒峻烈之品绝对禁用；桃仁、红花、川芎、枳实等活血行气药非必需不用，确需应用时剂量从轻、得效即止，绝不可按常量投予。',
    coreDefinition: '妊娠用药警戒：依据药物对胎元的影响分禁用（剧毒、峻下、破血、辛热走窜）与慎用（活血、行气、攻下）两级，禁用者不用，慎用者小量短程。',
    safety: { note: '处方前须逐一核对药味有无妊娠禁忌；含附子、大黄、桃仁等慎用药的方剂须权衡病证与胎元，非急重之证不用。', prohibitions: ['【高风险】附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '【高风险】巴豆有大毒制霜 0.1–0.3g 只入丸散；孕妇禁用；不宜与牵牛子同用', '【高风险】甘遂 0.5–1.5g 入丸散；反甘草；孕妇禁用'] },
    learning: {
      knowledge: '妊娠禁忌分禁用与慎用两级：禁用者多为剧毒药（斑蝥、马钱子、巴豆、蟾酥、雄黄、朱砂）、峻下逐水药（甘遂、大戟、芫花、牵牛子）、破血逐瘀药（水蛭、虻虫、三棱、莪术）及辛热走窜之麝香、附子；慎用者多为活血化瘀药（桃仁、红花、川芎、牛膝）、行气药（枳实、槟榔）与攻下药（大黄、芒硝）。禁用之品绝不可入孕妇处方。',
      misjudgment: '把「慎用」当成「可以常规使用」。错：慎用药如桃仁、红花、川芎确有堕胎动血之虞，非必需不用；即使配伍使用，剂量亦须明显小于常量并中病即止。',
      reasoning: '同为活血药，为何当归、川芎在安胎方中可用而三棱、莪术绝对禁用？',
      feedback: '当归、川芎养血活血、量轻性缓，配伍白芍、黄芩等可收安胎之效；三棱、莪术破血消癥、力峻性烈，直伤胎元，故属禁用之列。',
      transfer: '孕妇外感风寒，含麻黄的方剂应如何处理麻黄一味？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 服药时辰与用法用量（016）
  // ============================================================
  {
    id: 'pb13-m-016', title: '剂量·服药时辰与用法用量', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['剂量维度', '服药时辰', '汤剂服法', '丸散服法'],
    intent: '掌握汤、丸、散剂型与病位上下的服药时点及得效即止的服法规范。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '十枣汤平旦服', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '平旦温服之……得快下利后，糜粥自养' }],
    dosage: { guideline: '汤剂一般每日 1 剂，分 2-3 次温服；病在胸膈以上饭后服、病在心腹以下饭前服；补益药饭前服、安神药睡前服、对胃肠有刺激者饭后服；丸散按每次固定量（如大蜜丸 1 丸、水丸 6-9g）每日 2-3 次温水送服', caution: '发汗剂、泻下剂、催吐剂得效即止、不必尽剂；急症可顿服、频服；呕吐者少量频饮；丸散缓图不可一次过量' },
    cases: null,
    stdJudgment: '服药时辰服从病位与剂型：病在上者食后服、病在下者食前服，补益空腹、安神临卧、峻剂平旦；汤剂一日一剂分次温服，丸散按固定量服用，汗下吐之剂得效即止。',
    coreDefinition: '服药时辰与剂量：依据病位上下、病性缓急与剂型特点确定服药时点、次数与每次用量，使药力与病位、生理节律相合。',
    safety: { note: '十枣汤平旦空腹服、得快下利后糜粥自养；桂枝汤温覆取微汗、汗出病差停后服；服药后见呕吐、腹泻不止者即停药并就医。', prohibitions: [] },
    learning: {
      knowledge: '汤剂常规每日 1 剂、分 2-3 次温服，急重症可顿服或频服；《神农本草经》序例「病在胸膈以上者，先食后服药；病在心腹以下者，先服药而后食」为服药时辰总纲；补益药宜饭前空腹、安神药宜睡前、对胃肠刺激之药宜饭后；十枣汤「平旦服」，峻下剂得快下利后糜粥自养。',
      misjudgment: '把所有汤剂都安排在饭后服用。错：补益药饭后服受食物阻滞、吸收迟缓，安神药日间服则昼寐夜寤，服时须随病位、药性而定，不可一刀切。',
      reasoning: '十枣汤为何必须「平旦服」而不在晚间服用？',
      feedback: '平旦空腹胃中空虚，药力直达下焦逐水，得快下利则水去正安；若晚间服用，既碍睡眠，又恐药后水泻与虚脱难以及时处理。',
      transfer: '失眠患者服用酸枣仁汤宜何时服、为何？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 现代药理与安全窗（017）
  // ============================================================
  {
    id: 'pb13-m-017', title: '剂量·现代药理与安全窗', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['剂量维度', '安全窗', '马钱子·高风险', '朱砂·高风险', '雄黄·高风险'],
    intent: '从有效成分与毒性成分理解中药剂量安全窗，掌握煎法、炮制对毒性的影响。',
    facts: [
      { field: 'herb.toxicity', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'herb.toxicity', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.safety', sourceType: 'textbook', sourceTitle: '《中药学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '马钱子炮制后 0.3-0.6g 入丸散（士的宁含量为毒性关键）；附子 3-15g 先煎 0.5-1 小时以上（乌头碱水解减毒）；朱砂 0.1-0.5g 只入丸散、忌火煅；细辛煎剂 1-3g；甘草 1.5-9g（大量久服不超过常规疗程）', caution: '安全窗窄的药（马钱子、附子、细辛）不得随意加量或延长疗程；含汞、砷矿物药（朱砂、雄黄）有蓄积性，严禁久服；甘草大剂量久服可致水肿、血压升高' },
    cases: null,
    stdJudgment: '现代药理揭示剂量安全窗的本质：马钱子之有效成分为士的宁、治疗量与中毒量极近；附子之乌头碱经久煎水解而减毒；朱砂之硫化汞在体内可释出游离汞而蓄积；甘草酸过量致水钠潴留。煎法、炮制与疗程共同决定药物是在治疗窗内还是越入中毒区。',
    coreDefinition: '安全窗（治疗窗）指有效剂量与中毒剂量之间的区间；中药剂量警戒即通过炮制、煎法、限量、控程把药效维持于安全窗内。',
    safety: { note: '含乌头碱之品（附子、川乌、草乌）先煎久煎至口尝无麻辣感；含汞砷矿物药忌火煅、忌久服；马钱子、细辛等安全窗窄者守极量。', prohibitions: ['【高风险】马钱子有大毒，炮制后 0.3–0.6g 入丸散，过量致惊厥；孕妇禁用', '【高风险】朱砂含硫化汞忌火煅；0.1–0.5g 只入丸散；不可久服；孕妇禁用', '【高风险】雄黄有毒 0.05–0.1g 只入丸散；忌火煅；孕妇禁用'] },
    learning: {
      knowledge: '附子含乌头碱，经先煎久煎水解为乌头原碱，毒性大减而回阳救逆之效犹存，故必先煎 0.5-1 小时以上；马钱子含士的宁，0.3-0.6g 入丸散，过量兴奋脊髓致惊厥；朱砂主含硫化汞，火煅析出游离汞而剧毒，久服可蓄积；甘草含甘草酸，大量久服致水钠潴留、血压升高。',
      misjudgment: '把「久煎减毒」套用于所有有毒药。错：乌头碱热不稳定故宜久煎，马钱子的士的宁、朱砂的硫化汞并不因煎煮而减毒，后者只宜入丸散并控制总量。',
      reasoning: '同样是减毒，为何附子宜久煎而马钱子必须炮制后入丸散？',
      feedback: '乌头碱遇热水解，久煎即可减毒；马钱子的士的宁对热稳定，须砂烫、油炸等炮制破坏部分生物碱，且难溶于水，故只作丸散小量服用。',
      transfer: '雄黄遇热可氧化为砒霜（三氧化二砷），据此说明含砷矿物药为何忌火煅。',
    },
  },
  // ============================================================
  // M 方剂剂量 · 仲景方常量药考证（018）
  // ============================================================
  {
    id: 'pb13-m-018', title: '剂量·仲景方常量药考证', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['剂量维度', '经方考证', '一两折合', '大枣', '生姜', '甘草'],
    intent: '掌握经方一两折合今制的两种通行说法及大枣、生姜、甘草等常量药的折算方法。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '经方换算通行两说：一两约合今 3g（临证换算常用）与汉制一两约 13.8-15.6g（据权器考证）；桂枝汤：桂枝三两约 9g、芍药三两约 9g、炙甘草二两约 6g、生姜三两约 9-15g（切片）、大枣十二枚约 30g（劈）', caution: '以枚、升、合计量的药味（大枣、半夏、粳米、芒硝）不可硬套重量折算；考证诸说并存，换算须注明依据，剂量宜从小量试服' },
    cases: null,
    stdJudgment: '仲景方剂量考证以「一两折合今制」为核心：一说一两约合 3g 便于临证、一说按汉权衡考据约合 13.8-15.6g；大枣以枚计（桂枝汤十二枚约 30g）、生姜以两切片（三两约 9-15g）、炙甘草以两计（二两约 6g），枚、升、合计量之品不作重量折算。',
    coreDefinition: '仲景方剂量考证：依据出土汉权衡与方药实测，考辨《伤寒论》《金匮要略》一两、一升、一合折合今制，为经方临证用量提供依据。',
    safety: { note: '经方为「一剂」量，今人多分次温服，实际摄入量小于原方一次量；以枚计的大枣、以合计的半夏，按个数与容积折算时须留有余地。', prohibitions: [] },
    learning: {
      knowledge: '经方剂量考证存在两说：李时珍「古之一两，今用一钱」（一两约 3g），柯雪帆等据东汉权衡考证一两约 15.6g；《伤寒论》规划教材以一两约 3g 为临证换算参考并注明考据差异。桂枝汤：桂枝、芍药各三两（约 9g），炙甘草二两（约 6g），生姜三两切片，大枣十二枚劈（约 30g）；大枣、半夏（升计）、粳米（合计）以实物量折算，不作纯重量换算。',
      misjudgment: '把所有经方按一两等于 15g 直接放大用药。错：考证结论未统一，且古方一剂今多分服，贸然按大折算可致用量过大；临证宜以一两约 3g 起步，随证酌增。',
      reasoning: '桂枝汤中大枣十二枚约合 30g，为何远大于药典 6-15g 的常量？',
      feedback: '大枣在桂枝汤中助桂芍益阴和营、护胃生津，十二枚为原方一剂总量且分次温服；药典 6-15g 为单味常量的单日参考，二者口径不同，不可简单对等。',
      transfer: '半夏以「升」计量（小半夏汤一升），若按重量换算大约几何、现代处方如何折算？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 历代医家剂量经验（019）
  // ============================================================
  {
    id: 'pb13-m-019', title: '剂量·历代医家剂量经验', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['剂量维度', '历代医家', '李东垣', '吴鞠通', '轻剂重剂'],
    intent: '比较李东垣轻剂与吴鞠通重剂的用药剂量风格及「量随证变」的规律。',
    facts: [
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '李东垣式轻剂：药味多而单味量小（补中益气汤黄芪一钱为主、余药三至五分），宜于脾胃虚馁、久病缓图；吴鞠通式重剂：阳明热盛、腑实急症用量偏重（石膏、大黄等以两计），得效即止', caution: '轻剂不可治实热急症、重剂不可施于虚人羸弱；吴鞠通虽用重剂，峻药仍中病即止，轻剂亦须守方守法' },
    cases: null,
    stdJudgment: '历代医家剂量经验归于「量随证变」：李东垣补土，药多量轻、轻清升提，宜脾胃久虚之缓调；吴鞠通治温，上焦如羽轻宣、中焦阳明热盛则石膏大黄重投，急下存阴而中病即止。轻剂重剂皆以病机为据。',
    coreDefinition: '历代医家剂量经验：李东垣倡轻剂（味多量小、升补脾胃），吴鞠通重急证用量（石膏大黄以两计），共同揭示剂量须随病机、病位、病势而变的规律。',
    safety: { note: '仿东垣轻剂须守法守方、以量少频服为要；仿鞠通重剂须把握「急下存阴」的适应证与中病即止的停药时机。', prohibitions: [] },
    learning: {
      knowledge: '李东垣为补土派代表，立方药味多而剂量轻：补中益气汤黄芪一钱为君、人参三分、炙甘草五分等，取轻清升发以鼓舞脾胃清阳，主治脾虚气陷。吴鞠通《温病条辨》治上焦「治上焦如羽，非轻不举」（银翘散轻清宣透），而治阳明热盛、腑实燥结则重用石膏、大黄急下存阴。两家用量悬殊，其理在于病机之别。',
      misjudgment: '以为「重剂就是好药、轻剂就是敷衍」。错：补中益气汤量轻是为升举清阳、避免壅滞；大承气汤量重是为急下存阴；剂量大小取决于病机，与医者态度无关。',
      reasoning: '同为补气，李东垣补中益气汤为何每味仅数分至一钱，而张锡纯升陷汤黄芪可用至八钱？',
      feedback: '东垣治脾虚气陷、药轻以升，量重反壅；锡纯治大气下陷、宗气不足，黄芪重用方能举陷；病机有轻重缓急，剂量随之。',
      transfer: '若治气虚下陷兼见大便秘结，仿东垣轻剂与重用黄芪两种思路如何取舍？',
    },
  },
  // ============================================================
  // M 方剂剂量 · 剧毒药剂量警戒（020）
  // ============================================================
  {
    id: 'pb13-m-020', title: '剂量·剧毒药剂量警戒', category: 'formula', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['剂量维度', '剧毒药', '马钱子·高风险', '朱砂·高风险', '雄黄·高风险', '巴豆·高风险', '蟾酥·高风险'],
    intent: '汇总马钱子、朱砂、雄黄、巴豆、蟾酥等剧毒药的限量、用法与红线。',
    facts: [
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
      { field: 'herb.dosage', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '马钱子炮制后 0.3-0.6g 入丸散；朱砂 0.1-0.5g 只入丸散、忌火煅；雄黄 0.05-0.1g 只入丸散、忌火煅；巴豆制霜 0.1-0.3g 只入丸散；蟾酥 0.015-0.03g 只入丸散，外用适量、不入目', caution: '五药均孕妇禁用；均只入丸散、不入煎剂；均不可过量久服；马钱子过量致惊厥、朱砂雄黄蓄积中毒、巴豆峻下伤正、蟾酥强心样成分过量致心律失常' },
    cases: null,
    stdJudgment: '剧毒药剂量警戒可归结为「炮制、丸散、微量、禁孕、即止」十字：马钱子 0.3-0.6g、朱砂 0.1-0.5g、雄黄 0.05-0.1g、巴豆霜 0.1-0.3g、蟾酥 0.015-0.03g，一律只入丸散、孕妇禁用、中病即止，超量即由治疗转为中毒。',
    coreDefinition: '剧毒药剂量警戒：对有剧毒的中药规定极量、限定剂型（只入丸散）、强调炮制与孕妇禁用，以极小的治疗窗换取确切的疗效。',
    safety: { note: '马钱子过量致颈项强直、惊厥；朱砂雄黄含重金属忌火煅、忌久服；巴豆霜得泻即止、糜粥自养；蟾酥不入目、外敷避黏膜。', prohibitions: ['【高风险】马钱子有大毒，炮制后 0.3–0.6g 入丸散，过量致惊厥；孕妇禁用', '【高风险】朱砂含硫化汞忌火煅；0.1–0.5g 只入丸散；不可久服；孕妇禁用', '【高风险】雄黄有毒 0.05–0.1g 只入丸散；忌火煅；孕妇禁用', '【高风险】巴豆有大毒制霜 0.1–0.3g 只入丸散；孕妇禁用；不宜与牵牛子同用', '【高风险】蟾酥有毒 0.015–0.03g 只入丸散；外用不入目；孕妇禁用'] },
    learning: {
      knowledge: '剧毒药限量一览（均只入丸散、不入煎剂、孕妇禁用）：马钱子炮制后 0.3-0.6g（过量兴奋脊髓致惊厥）；朱砂 0.1-0.5g（含硫化汞、忌火煅）；雄黄 0.05-0.1g（含二硫化二砷、忌火煅）；巴豆制霜 0.1-0.3g（峻下寒积、不宜与牵牛子同用）；蟾酥 0.015-0.03g（强心苷样成分、过量致心律失常、外用不入目）。',
      misjudgment: '把剧毒药的「入丸散」理解为「可以研粉吞服随意加量」。错：入丸散是为精确控制每次极量，且须炮制减毒；任意加量或改入煎剂都使毒性失控，可致惊厥、心律失常乃至死亡。',
      reasoning: '蟾酥剂量仅 0.015-0.03g，为何其强心作用仍可入药？',
      feedback: '蟾酥含蟾毒配基类强心成分，微量即能强心、开窍醒神、解毒消肿；治疗量极小、安全窗极窄，故只能以极微量入丸散并严守禁忌。',
      transfer: '五药之中，马钱子与巴豆的中毒表现各侧重于哪些系统？',
    },
  },
];
