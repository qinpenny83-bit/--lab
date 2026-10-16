// ============================================================
// 杏林大典 · Phase 5 · Batch-38 · 样本 Part L1（L 方剂学 20 节点 pb38-l-001 ~ pb38-l-020）
// 学科：L 方剂学；覆盖：解表（参苏饮）/ 泻下（十枣汤）/ 和解（当归芍药散）/
//       清热（凉膈散、黄连阿胶汤）/ 温里（当归四逆汤）/ 补益（虎潜丸、二至丸）/
//       治燥（益胃汤、琼玉膏）/ 固涩（桃花汤、完带汤）/ 理气（橘皮竹茹汤、丹参饮）/
//       理血（膈下逐瘀汤、身痛逐瘀汤、鳖甲煎丸）/ 祛湿（连朴饮、萆薢分清饮）/
//       痈疡（四妙勇安汤）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// 经典引文经核对原文后分层，出处确凿者方收录
// 高危药（甘遂/大戟/芫花、细辛、半夏、䗪虫/蜣螂/鼠妇）全部标注毒性红线与剂量禁忌
// ============================================================

export const SAMPLES_PART_L1 = [
  // ============================================================
  // L 方剂学 · 解表剂·扶正解表（001）
  // ============================================================
  {
    id: 'pb38-l-001', title: '参苏饮', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['解表剂', '扶正解表', '参苏饮', '气虚外感', '半夏'],
    intent: '掌握参苏饮益气解表、理气化痰的组方特点，辨清其与一般辛温解表剂适用人群之别。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '人参6g、紫苏叶6g、葛根6g、制半夏6g、前胡6g、茯苓6g、枳壳4.5g、木香4.5g、桔梗4.5g、陈皮4.5g、炙甘草3g，加生姜3片、大枣2枚，水煎服', caution: '表实无汗或肺气壅实者不宜；素体壮实、外感而无虚象者不必用人参；半夏须用制半夏' },
    cases: null,
    stdJudgment: '参苏饮益气解表、理气化痰，主治气虚外感风寒、内有痰湿之恶寒发热、咳嗽痰白、胸脘满闷、倦怠无力者，为虚人外感之代表方，扶正祛邪两顾。',
    coreDefinition: '益气解表，理气化痰。主治气虚外感、内有痰湿证：恶寒发热、咳嗽痰白、倦怠气短，舌淡苔白、脉弱。',
    safety: { note: '本方以人参扶正托邪，表实无虚者勿用；半夏制用后入煎，孕妇慎用。', prohibitions: ['半夏生用有毒，须炮制后入煎', '半夏反乌头类（含附子），不可同用', '半夏孕妇慎用', '甘草反海藻、大戟、甘遂、芫花（十八反）'] },
    learning: {
      knowledge: '参苏饮由人参、苏叶、葛根、半夏、前胡、茯苓、枳壳、木香、桔梗、陈皮、炙甘草加姜枣组成，功效益气解表、理气化痰。苏叶葛根散表寒，人参扶正固本，半夏陈皮茯苓化痰湿，枳壳桔梗木香宽胸理气，主治气虚外感兼痰湿之恶寒发热、咳嗽痰白、胸脘满闷、倦怠无力。',
      misjudgment: '把参苏饮误用于表实无汗之壮实之人。错：本方专为素体气虚者设，人参扶正以托邪外出，若正气不虚而误投，反致恋邪，故表实邪盛者不宜用。',
      reasoning: '同为气虚外感，参苏饮与败毒散一兼痰湿、一兼风寒湿，临证如何凭兼夹取舍？',
      feedback: '参苏饮重在痰湿内停兼气虚，故配陈皮半夏茯苓木香理气化痰；败毒散病涉风寒湿表，故配羌活独活川芎祛风散湿，凭兼夹之证别之。',
      transfer: '老年人肺气虚弱、久咳痰多而又感风寒者，参苏饮加减如何顺护肺脾之气？',
    },
  },
  // ============================================================
  // L 方剂学 · 泻下剂·逐水（002）
  // ============================================================
  {
    id: 'pb38-l-002', title: '十枣汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['泻下剂', '逐水', '峻下', '甘遂', '大戟', '芫花', '有毒'],
    intent: '掌握十枣汤攻逐水饮的主治与枣汤送服、中病即止的峻药缓用之法，牢记三药反甘草之配伍禁忌。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '心下痞硬满', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '太阳中风，下利呕逆，表解者，乃可攻之。其人漐漐汗出，发作有时，头痛，心下痞硬满，引胁下痛，干呕短气，汗出不恶寒者，此表解里未和也，十枣汤主之' }],
    dosage: { guideline: '甘遂、大戟、芫花各等分研末，以大枣10枚煎汤送服，每服0.5-1g（强人约1钱匕，羸人减半），得快下利后糜粥自养', caution: '三药峻烈有毒，须醋制；表证未解者先解表后攻里；中病即止，不可久服；服药得利后宜糜粥调养' },
    cases: null,
    stdJudgment: '十枣汤攻逐水饮力峻，专治悬饮之咳唾引痛、心下痞硬及水肿腹胀实证，三药等分研末枣汤送服，得快下利后糜粥自养，峻药缓用之法在焉。',
    coreDefinition: '攻逐水饮。主治悬饮（饮停胸胁）之咳唾胸胁引痛、心下痞硬、干呕短气，及水肿腹胀之实证。',
    safety: { note: '本方为峻下逐水重剂，甘遂、大戟、芫花均反甘草，绝不可与甘草同用；三药有毒，须醋制研末枣汤送服，中病即止，得利后糜粥自养。', prohibitions: ['甘遂、大戟、芫花反甘草（十八反），禁与甘草同用', '孕妇禁用', '峻下逐水，体虚、年老、津亏者忌用', '三药有毒须醋制，严格限量，中病即止'] },
    learning: {
      knowledge: '十枣汤以甘遂、大戟、芫花各等分研末，大枣煎汤送服，攻逐水饮。主治悬饮之咳唾胸胁引痛、心下痞硬、干呕短气，及水肿腹胀、二便不利之实证。三药峻烈有毒，须醋制，强人每服一钱匕、羸人半钱匕，得快下利后糜粥自养，中病即止。',
      misjudgment: '误将甘遂、大戟、芫花作汤剂共煎。错：三药入汤剂则峻烈之性与毒性俱难控制，必须研末以大枣汤送服，方能控量缓达；且三药反甘草，与甘草同煎毒性剧增，属十八反明文禁忌。',
      reasoning: '同为逐水，十枣汤为何弃汤剂而取散剂，且独以大枣煎汤送服？',
      feedback: '三药峻毒，汤煎则药力过猛、毒性难控，研末散服便于控量；大枣甘缓培土，护脾胃而缓药毒，体现峻药缓用、攻邪不伤正之旨。',
      transfer: '胸水腹水之实证患者，十枣汤与葶苈大枣泻肺汤的适应证如何鉴别？',
    },
  },
  // ============================================================
  // L 方剂学 · 和解剂·调和肝脾（003）
  // ============================================================
  {
    id: 'pb38-l-003', title: '当归芍药散', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['和解剂', '调和肝脾', '当归芍药散', '妊娠腹痛', '养血利湿'],
    intent: '掌握当归芍药散养血调肝、健脾利湿之功，理解重用芍药、轻用川芎之妊娠用药特点。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '腹中㽲痛', canon: '妇人妊娠病脉证并治', chapter: '', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified', originalText: '妇人怀妊，腹中㽲痛，当归芍药散主之' }],
    dosage: { guideline: '当归9g、白芍18g、茯苓12g、白术12g、泽泻12g、川芎9g（原方芍药一斤、川芎半斤，量有轻重），为散每服方寸匕酒和服日三服，亦可作汤剂水煎服', caution: '血热及阴虚火旺者慎用；川芎辛温走窜，孕期剂量宜轻' },
    cases: null,
    stdJudgment: '当归芍药散养血调肝、健脾利湿，主治肝脾不和、血虚湿滞之妇人腹中㽲痛、妊娠腹痛及头晕目眩、足跗浮肿，酸甘苦淡合用，和缓柔剂。',
    coreDefinition: '养血调肝，健脾利湿。主治肝脾不和、血虚湿滞证：腹中㽲痛，或妊娠腹痛，眩晕浮肿，小便不利。',
    safety: { note: '本方为妊娠腹痛之常用方，属和缓柔剂；原方重用芍药柔肝缓急、轻用川芎行血，胎前用药之慎寓于剂量轻重之中。', prohibitions: [] },
    learning: {
      knowledge: '当归芍药散由当归、芍药、茯苓、白术、泽泻、川芎组成，养血调肝、健脾利湿。主治肝脾不和、血虚湿滞之妇人腹中㽲痛或妊娠腹痛，伴头晕目眩、小便不利、足跗浮肿。方中重用芍药柔肝缓急止痛，当归川芎养血活血，白术茯苓泽泻健脾利湿。',
      misjudgment: '误认当归芍药散只治妊娠腹痛。错：其适应证为肝脾不调、血虚夹湿，凡妇人腹中诸疾痛属此病机者皆可应用，妊娠腹痛只是典型证之一；辨证之要在于腹中掣痛兼浮肿眩晕。',
      reasoning: '妊娠腹痛属血虚湿滞者，为何重用芍药而轻用川芎当归？',
      feedback: '芍药酸甘柔肝养血、缓急止痛，故重用一斤；川芎辛窜行血，孕期用量宜轻，恐动胎气，故仅半斤，药量轻重正寓胎前用药之慎。',
      transfer: '围绝经期妇人腹痛浮肿、大便稀溏属肝脾不和者，本方合何药可兼顾肝肾阴血？',
    },
  },
  // ============================================================
  // L 方剂学 · 清热剂·清热解毒（004）
  // ============================================================
  {
    id: 'pb38-l-004', title: '凉膈散', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['清热剂', '清热解毒', '凉膈散', '清上泻下', '甘草'],
    intent: '掌握凉膈散泻火通便、清上泻下的组方机理，理解硝黄「以泻代清」之用法。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '连翘9g、黄芩9g、栀子9g、薄荷6g（后下）、竹叶3g、大黄6g、芒硝6g（冲服）、甘草6g、白蜜少许，水煎服', caution: '大黄芒硝泻下力强，孕妇及脾虚便溏者慎用；薄荷宜后下' },
    cases: null,
    stdJudgment: '凉膈散泻火通便、清上泻下，主治上中二焦热炽之胸膈烦热、口舌生疮、便秘溲赤，以连翘栀子清透、硝黄通下，寓清于泻，釜底抽薪。',
    coreDefinition: '泻火通便，清上泻下。主治上中二焦火热炽盛证：胸膈烦热，烦躁口渴，口舌生疮，便秘溲赤。',
    safety: { note: '本方借硝黄通下以泄上焦之热，便溏无实热者不宜；芒硝不入煎而冲服，孕妇慎用。', prohibitions: ['甘草反海藻、大戟、甘遂、芫花（十八反）', '大黄、芒硝泻下力强，孕妇及脾虚便溏者慎用'] },
    learning: {
      knowledge: '凉膈散由连翘、黄芩、栀子、薄荷、竹叶清泄上焦，大黄、芒硝通下腑实，甘草、白蜜缓中，共奏泻火通便、清上泻下之功。主治上中二焦火热炽盛之胸膈烦热、口舌生疮、面赤唇焦、便秘溲赤。硝黄之用不在攻下燥屎，而在釜底抽薪、引热下行，即所谓以泻代清。',
      misjudgment: '误认凉膈散为纯清热方而减去硝黄。错：方中大黄芒硝借阳明为出路，通腑泄热使上焦之热随下而解，若去硝黄则热无出路，清上之力孤，证兼便秘者尤不可去。',
      reasoning: '凉膈散与黄连解毒汤同为清热方，一用硝黄、一用三黄，清泄之途径有何不同？',
      feedback: '黄连解毒汤苦寒直折，三黄并投专清三焦火毒；凉膈散以硝黄通下、薄荷竹叶轻清上透，清上与泻下并行，胸膈烦热兼便秘者胜之。',
      transfer: '小儿口疮龈肿、大便三日未解属心胃火盛者，凉膈散与导赤散如何取舍？',
    },
  },
  // ============================================================
  // L 方剂学 · 清热剂·清脏腑热（005）
  // ============================================================
  {
    id: 'pb38-l-005', title: '黄连阿胶汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['清热剂', '清脏腑热', '黄连阿胶汤', '交通心肾', '少阴热化'],
    intent: '掌握黄连阿胶汤育阴清热、交通心肾之功与鸡子黄、阿胶的特殊煎法。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '心中烦不得卧', canon: '辨少阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '少阴病，得之二三日以上，心中烦，不得卧，黄连阿胶汤主之' }],
    dosage: { guideline: '黄连12g、黄芩6g、芍药6g、阿胶9g（烊化兑入）、鸡子黄2枚，先煎黄连黄芩芍药去滓，内阿胶烊尽，待药液小冷再搅入鸡子黄，温服', caution: '阿胶不入煎剂，须烊化；鸡子黄须待药液微温搅入，防凝固失效' },
    cases: null,
    stdJudgment: '黄连阿胶汤育阴清热、除烦安神，主治少阴热化、心肾不交之心中烦、不得卧，黄连黄芩清泄心火，阿胶芍药鸡子黄滋补真阴，清补并行。',
    coreDefinition: '育阴清热，交通心肾。主治少阴热化证：心中烦，不得卧，口干咽燥，舌红少苔，脉沉细数。',
    safety: { note: '鸡子黄与阿胶均不入煎剂：阿胶烊化兑服，鸡子黄待药液小冷搅入，高温久煎则蛋白凝固失效。', prohibitions: [] },
    learning: {
      knowledge: '黄连阿胶汤由黄连、黄芩、芍药、鸡子黄、阿胶组成，育阴清热、交通心肾。主治少阴热化、心肾不交之心中烦、不得卧，口干咽燥，舌红少苔，脉沉细数。煎法：先煮芩连芍去滓，内阿胶烊化，待药液小冷再搅入鸡子黄，温服。',
      misjudgment: '把鸡子黄与阿胶同下共煎。错：鸡子黄为血肉有情之品，高温久煎则蛋白凝固、效价大减，须待药汁微温后搅入；阿胶亦不入煎而烊化兑服，此为本方煎服法之要点。',
      reasoning: '同为失眠，黄连阿胶汤与朱砂安神丸一阴虚一火热，如何凭脉证分辨？',
      feedback: '黄连阿胶汤证为少阴阴虚火旺、心肾不交，舌红少苔脉细数、心烦不得卧；朱砂安神丸证为心火亢盛扰神，舌红苔黄脉数、惊悸失眠多梦，一滋阴降火一清心镇惊。',
      transfer: '围绝经期烘热汗出、彻夜难眠属肾阴亏虚、心火偏亢者，本方加何药可兼顾潮热？',
    },
  },
  // ============================================================
  // L 方剂学 · 温里剂·温经散寒（006）
  // ============================================================
  {
    id: 'pb38-l-006', title: '当归四逆汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['温里剂', '温经散寒', '当归四逆汤', '血虚寒厥', '细辛'],
    intent: '掌握当归四逆汤温经散寒、养血通脉之功，辨明其与四逆汤证治之别，牢记细辛用量红线。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '手足厥寒脉细欲绝', canon: '辨厥阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '手足厥寒，脉细欲绝者，当归四逆汤主之' }],
    dosage: { guideline: '当归12g、桂枝9g、芍药9g、细辛3g、通草6g、大枣8枚、炙甘草6g，水煎服', caution: '细辛煎剂用量1-3g，不可超量；内有久寒者加吴茱萸、生姜' },
    cases: null,
    stdJudgment: '当归四逆汤温经散寒、养血通脉，主治血虚寒凝之手足厥寒、脉细欲绝及肢体冷痛，养血与温通并施，故与阳虚厥逆之四逆汤证治迥异。',
    coreDefinition: '温经散寒，养血通脉。主治血虚寒厥证：手足厥寒，或腰股腿足肩臂冷痛，口不渴，脉细欲绝。',
    safety: { note: '细辛为有毒之品，煎剂1-3g、散剂0.5-1g，过量可致中毒；本方所治为血虚寒凝而非阳虚欲脱，不可误作回阳救逆之剂。', prohibitions: ['细辛煎剂1-3g、散剂0.5-1g，过量可致中毒', '细辛反藜芦（十八反）'] },
    learning: {
      knowledge: '当归四逆汤由当归、桂枝、芍药、细辛、通草、大枣、炙甘草组成，温经散寒、养血通脉。主治血虚寒凝之手足厥寒、脉细欲绝，或腰股腿足肩臂冷痛、口不渴、舌淡苔白。桂枝细辛温经散寒，当归芍药养血和营，通草通行血脉，甘草大枣益气，治在血分虚寒而非阳虚亡阳。',
      misjudgment: '误将当归四逆汤用于阳气虚衰之四肢厥冷。错：四逆汤证为少阴阳衰，厥冷过肘膝、脉微欲绝而无血虚之象；当归四逆汤证属血虚寒凝，手足厥寒而脉细欲绝，兼口不渴、舌淡，温经散寒与回阳救逆有别。',
      reasoning: '手足厥寒者，四逆汤证与当归四逆汤证同以厥为名，如何从脉证区分？',
      feedback: '四逆汤证阳虚阴盛，厥冷重而脉微，重在回阳救逆；当归四逆汤证血虚寒凝，厥寒而脉细，重在养血温经通脉，故以当归桂枝细辛为主药。',
      transfer: '雷诺现象手足冰冷发绀者，为何可借当归四逆汤养血温通之法调治？',
    },
  },
  // ============================================================
  // L 方剂学 · 补益剂·补阴（007–008）
  // ============================================================
  {
    id: 'pb38-l-007', title: '虎潜丸', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['补益剂', '补阴', '虎潜丸', '痿证', '滋阴降火'],
    intent: '掌握虎潜丸滋阴降火、强壮筋骨之功与阳中求阴、防苦寒伤胃之配伍匠心。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '黄柏15g、龟板12g（打碎先煎）、知母6g、熟地黄6g、白芍6g、锁阳4.5g、陈皮6g、干姜3g、狗骨（代虎骨）12g，炼蜜为丸每服9g日2次，亦可作汤剂', caution: '黄柏知母苦寒，久服伤胃，脾胃虚寒者慎用；虎骨药源稀缺，今以狗骨等替代' },
    cases: null,
    stdJudgment: '虎潜丸滋阴降火、强壮筋骨，主治肝肾阴虚、虚火灼筋之筋骨痿软、腰膝酸软，知柏合龟板熟地滋阴降火，锁阳干姜护阳温中，痿证要方。',
    coreDefinition: '滋阴降火，强壮筋骨。主治肝肾阴虚、虚火内灼之痿证：筋骨痿软，腿足瘦弱，步履艰难，舌红少苔。',
    safety: { note: '黄柏知母苦寒，配干姜温中以防苦寒败胃；龟板为介类质重之品，入煎须打碎先煎。', prohibitions: [] },
    learning: {
      knowledge: '虎潜丸由黄柏、龟板、知母、熟地黄、陈皮、白芍、锁阳、干姜、虎骨（今以狗骨代）组成，滋阴降火、强壮筋骨。主治肝肾阴虚、虚火内灼之痿证，筋骨痿软、腰膝酸软、腿足瘦弱。黄柏知母苦寒坚阴，龟板熟地白芍滋阴养血，锁阳温阳益精、干姜温中防苦寒伤胃。',
      misjudgment: '误将虎潜丸用于湿热浸淫之痿。错：本方主治阴虚火旺之痿，舌红少苔、脉细数；湿热痿证下肢痿软而苔黄腻、脉濡数，当用四妙丸清热利湿，滋阴润燥之品反助湿，方向截然相反。',
      reasoning: '痿证有湿热浸淫与阴虚火旺两端，为何虎潜丸与四妙丸不可互投？',
      feedback: '湿热痿证因湿困脾络，治宜清热利湿（四妙丸）；阴虚痿证因精血亏耗、筋骨失养，治宜滋阴降火（虎潜丸），苔之黄腻与少津是分辨眼目。',
      transfer: '久病下肢肌无力属肝肾阴虚者，虎潜丸加减如何兼顾其虚火与骨痿？',
    },
  },
  {
    id: 'pb38-l-008', title: '二至丸', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['补益剂', '补阴', '二至丸', '女贞子', '墨旱莲'],
    intent: '掌握二至丸补肝肾、益阴血之功与两药相须、平补不腻的组方特点。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '女贞子15g、墨旱莲15g煎服；或二味等分炼蜜为丸，每服9g，日2次', caution: '二药甘寒滋润，脾虚便溏、湿盛中满者慎用' },
    cases: null,
    stdJudgment: '二至丸补肝肾、益阴血，主治肝肾阴虚之头晕眼花、腰膝酸软、须发早白，女贞子合旱莲草二味平补，取冬至夏至采药得名，轻灵平和。',
    coreDefinition: '补肝肾，益阴血。主治肝肾阴虚证：头目昏花，腰膝酸软，须发早白，或阴虚血热之衄血。',
    safety: { note: '二药甘寒质润，兼能滑肠，脾虚便溏者慎用；药力平和，宜久服缓图。', prohibitions: [] },
    learning: {
      knowledge: '二至丸由女贞子、墨旱莲二味组成，冬至采女贞、夏至采旱莲，故名二至。补肝肾、益阴血，主治肝肾阴虚之头晕眼花、视物昏花、腰膝酸软、须发早白，兼凉血止血可治阴虚血热之衄血。二药甘寒平和，丸剂每服9g，汤剂各15g煎服。',
      misjudgment: '误将二至丸当乌发专药滥用。错：其治本在肝肾阴亏、血不上荣，须发早白是阴血不足之标象；若为湿热熏蒸或血热风燥之脱发白发，非本方所宜，用之反增滋腻。',
      reasoning: '二至丸药仅两味而列补阴名方，其组方之理何在？',
      feedback: '女贞子甘平补肝肾、益阴血，旱莲草甘酸寒补肝肾、凉血止血，两药相须平补肝肾而不滋腻，药简力专，久服方建其功。',
      transfer: '青壮年目涩干痛属肝肾阴虚者，二至丸合何药可兼顾明目？',
    },
  },
  // ============================================================
  // L 方剂学 · 治燥剂·滋润内燥（009–010）
  // ============================================================
  {
    id: 'pb38-l-009', title: '益胃汤', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['治燥剂', '滋润内燥', '益胃汤', '养阴益胃', '胃阴损伤'],
    intent: '掌握益胃汤甘凉生津、养阴益胃之功及温病下后复阴之应用背景。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '当复其阴', canon: '中焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '阳明温病，下后汗出，当复其阴，益胃汤主之' }],
    dosage: { guideline: '沙参9g、麦冬15g、细生地15g、玉竹4.5g（炒香）、冰糖3g，水煮取二杯分二次服，渣再煮一杯服', caution: '全方甘寒滋腻，湿浊内盛、苔厚腻者不宜；冰糖含糖，糖尿病患者慎用' },
    cases: null,
    stdJudgment: '益胃汤甘凉生津、养阴益胃，主治阳明温病下后汗出之胃阴损伤、口干咽燥、饥不欲食，沙参麦冬生地玉竹冰糖甘润之品，专事复其胃阴。',
    coreDefinition: '甘凉生津，养阴益胃。主治胃阴损伤证：口干咽燥，饥不欲食，或干呕，舌红少津，脉细数。',
    safety: { note: '本方为甘寒滋润之剂，脾胃虚寒或湿浊中阻者禁用；冰糖甘壅，血糖偏高者慎用。', prohibitions: [] },
    learning: {
      knowledge: '益胃汤由沙参、麦冬、细生地、玉竹、冰糖组成，甘凉生津、养阴益胃，主治阳明温病下后汗出之胃阴损伤证，口干咽燥、饥不欲食、舌红少津。重用生地麦冬养阴清热为君，沙参玉竹生津为臣，冰糖甘润和中，水煮分二次服。',
      misjudgment: '误将益胃汤用于胃阴亏而兼湿浊者。错：全方甘寒滋腻，苔厚腻、脘痞便溏之湿浊内盛者用之反滞脾碍胃；且本方主治温病下后之胃阴伤，非一切胃病通用之方。',
      reasoning: '温病下后，为何用甘凉养阴而非苦寒清热？',
      feedback: '下后热结虽解而胃阴已伤，若再苦寒则更伐生生之气；甘凉濡润复胃阴、生津液，胃阴复则气降能食，十二经之阴皆可复，此益胃汤命名之义。',
      transfer: '慢性萎缩性胃炎口干少津、饥而不欲食者，益胃汤合何药可助运化？',
    },
  },
  {
    id: 'pb38-l-010', title: '琼玉膏', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['治燥剂', '滋润内燥', '琼玉膏', '滋阴润肺', '益气补脾'],
    intent: '掌握琼玉膏滋阴润肺、益气补脾之功与生地配参苓蜜炼成膏之剂型特点。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '人参（或党参）15g、白茯苓30g、生地黄汁150g、白蜜适量，熬炼成膏，每服10-15g，开水冲服，日2次', caution: '膏剂含蜜滋腻，脾虚湿盛、痰多者慎用；糖尿病者忌服' },
    cases: null,
    stdJudgment: '琼玉膏滋阴润肺、益气补脾，主治肺肾阴亏、脾肺气虚之干咳少痰、咽燥咯血、气短乏力，生地配参苓蜜炼成膏，肺脾肾三脏并补而性味甘润。',
    coreDefinition: '滋阴润肺，益气补脾。主治肺肾阴亏、脾胃气虚证：干咳少痰，咽燥咯血，气短乏力，肌肉消瘦。',
    safety: { note: '膏剂含蜜，血糖偏高者忌服；外感咳嗽、痰湿壅盛者禁用，防闭门留寇。', prohibitions: ['人参反藜芦（十八反）'] },
    learning: {
      knowledge: '琼玉膏以生地黄汁、白蜜与白茯苓、人参末熬炼成膏，滋阴润肺、益气补脾，主治肺肾阴亏、脾肺气虚之干咳少痰、咽燥咯血、气短乏力、肌肉消瘦。生地滋阴凉血为君，人参茯苓益气健脾培土生金，白蜜润肺，每服10-15g开水冲服。',
      misjudgment: '误将琼玉膏用于外感咳嗽痰湿盛者。错：本方为肺肾阴虚之虚劳咳嗽而设，甘润滋腻；外感表证未解、痰湿壅盛或脾胃虚寒便溏者误用，反致闭门留寇、助湿碍运。',
      reasoning: '琼玉膏以肺肾同治、培土生金立论，其组方如何体现先后天并补？',
      feedback: '生地滋肾阴润肺燥，人参补脾肺之气，茯苓健脾渗湿使补而不滞，白蜜润肺止咳，肺脾肾三脏并调、气阴双补，为虚劳干咳之膏方。',
      transfer: '久咳咯血、消瘦乏力之虚劳者，琼玉膏与百合固金汤如何择用？',
    },
  },
  // ============================================================
  // L 方剂学 · 固涩剂（011–012）
  // ============================================================
  {
    id: 'pb38-l-011', title: '桃花汤', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['固涩剂', '涩肠固脱', '桃花汤', '虚寒下利', '赤石脂'],
    intent: '掌握桃花汤温中涩肠、固脱止利之功与赤石脂一半入煎一半研末冲服之用法。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '下利便脓血', canon: '辨少阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '少阴病，下利便脓血者，桃花汤主之' }],
    dosage: { guideline: '赤石脂24g（一半入煎，一半研末冲服）、干姜6g、粳米30g，水煎服', caution: '赤石脂畏肉桂（十九畏），含肉桂之方不宜与本方同用；湿热痢禁用' },
    cases: null,
    stdJudgment: '桃花汤温中涩肠、固脱止利，主治少阴虚寒下利便脓血、血色暗红、腹痛喜温，赤石脂涩肠固脱为君，干姜温中散寒，粳米养胃和中，温涩并用。',
    coreDefinition: '温中涩肠，固脱止利。主治虚寒痢：下利便脓血，血色暗红，腹痛喜温喜按，舌淡苔白。',
    safety: { note: '赤石脂为矿物药，长服宜注意；湿热下利、里急后重者绝对禁用涩肠之品，防闭门留邪。', prohibitions: [] },
    learning: {
      knowledge: '桃花汤由赤石脂（一半入煎、一半研末冲服）、干姜、粳米组成，温中涩肠、固脱止利，主治少阴虚寒下利便脓血之血色暗红、腹痛喜温喜按、滑脱不禁。赤石脂涩肠固脱为君，干姜温中散寒，粳米养胃和中，温涩并用、标本兼治。',
      misjudgment: '误将桃花汤用于湿热痢疾之下利脓血。错：本方治虚寒滑脱之利，脓血暗红、无里急后重、腹喜温按；湿热痢脓血鲜红、里急后重、苔黄腻，当用白头翁汤、芍药汤清热导滞，涩肠之品反闭门留邪。',
      reasoning: '同为下利便脓血，桃花汤证与白头翁汤证寒热迥异，如何一望而别？',
      feedback: '桃花汤证脓血晦暗、舌淡脉弱、腹冷喜温，属脾肾虚寒滑脱；白头翁汤证脓血鲜红、里急后重、苔黄脉数，属热毒蕴肠，血色、舌脉与里急后重之有无是分水岭。',
      transfer: '久痢滑脱不禁兼见四肢不温者，桃花汤与真人养脏汤的用药层次有何不同？',
    },
  },
  {
    id: 'pb38-l-012', title: '完带汤', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['固涩剂', '固崩止带', '完带汤', '脾虚带下', '甘草'],
    intent: '掌握完带汤补脾疏肝、化湿止带之功与重补轻疏、药量悬殊之组方特色。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '土炒白术30g、炒山药30g、人参6g、酒炒白芍15g、酒炒车前子9g、制苍术9g、甘草3g、陈皮1.5g、黑芥穗1.5g、柴胡1.8g，水煎服', caution: '湿热黄带臭秽、苔黄腻者禁用；药量悬殊为本方特色，柴胡芥穗用量宜轻' },
    cases: null,
    stdJudgment: '完带汤补脾疏肝、化湿止带，主治脾虚肝郁、湿浊下注之白带清稀量多、倦怠便溏，重剂白术山药健脾，轻剂柴胡荆芥疏肝升清，寓补于通。',
    coreDefinition: '补脾疏肝，化湿止带。主治脾虚肝郁、湿浊下注之带下：白带清稀量多，面色㿠白，倦怠便溏。',
    safety: { note: '本方甘温补脾，专治脾虚湿盛之虚寒带下；湿热黄带禁用。', prohibitions: ['甘草反海藻、大戟、甘遂、芫花（十八反）'] },
    learning: {
      knowledge: '完带汤由土炒白术、山药、人参、白芍、车前子、苍术、甘草、陈皮、黑芥穗、柴胡组成，补脾疏肝、化湿止带，主治脾虚肝郁、湿浊下注之白带量多清稀、倦怠便溏。重用白术山药健脾燥湿止带，苍术车前子燥湿利湿，柴胡荆芥穗疏肝升清，药量轻重悬殊为组方特色。',
      misjudgment: '误将完带汤用于湿热黄带。错：本方治脾虚湿盛之虚寒带下（色白清稀、无臭），湿热黄带臭秽、苔黄腻当用易黄汤清热祛湿止带，完带汤甘温补脾反助湿热，寒热证候不可不辨。',
      reasoning: '完带汤中柴胡、黑芥穗仅用数分，为何轻药反能疏肝升清？',
      feedback: '轻可去实、升清降浊：白术山药重补脾土，以轻量柴胡疏达肝气、芥穗升散湿浊，使清阳升而湿浊下趋，补中寓疏，量大者固其本、量小者畅其枢。',
      transfer: '脾虚带下日久兼见食少神疲者，完带汤如何加减以增健脾益气之力？',
    },
  },
  // ============================================================
  // L 方剂学 · 理气剂·降气（013）与行气（014）
  // ============================================================
  {
    id: 'pb38-l-013', title: '橘皮竹茹汤', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['理气剂', '降逆止呃', '橘皮竹茹汤', '胃虚有热', '甘草'],
    intent: '掌握橘皮竹茹汤降逆止呃、益气清热之功，辨明其与丁香柿蒂汤之寒热差异。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '哕逆', canon: '呕吐哕下利病脉证治', chapter: '', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified', originalText: '哕逆者，橘皮竹茹汤主之' }],
    dosage: { guideline: '橘皮12g、竹茹12g、生姜9g、大枣5枚、人参3g、甘草6g，水煎服', caution: '竹茹甘寒清胃，胃寒呃逆者禁用；人参另煎兑服可防耗损' },
    cases: null,
    stdJudgment: '橘皮竹茹汤降逆止呃、益气清热，主治胃虚有热之呃逆干呕、虚烦少气，橘皮竹茹降逆清胃，人参甘草大枣补益胃气，虚实兼顾而和缓之方。',
    coreDefinition: '降逆止呃，益气清热。主治胃虚有热之呃逆：呃逆或干呕，虚烦少气，口干，舌红嫩。',
    safety: { note: '方中竹茹甘寒清胃热，主治胃虚有热之呃；胃寒呃逆者禁用。', prohibitions: ['甘草反海藻、大戟、甘遂、芫花（十八反）'] },
    learning: {
      knowledge: '橘皮竹茹汤由橘皮、竹茹、生姜、大枣、人参、甘草组成，降逆止呃、益气清热，主治胃虚有热之呃逆干呕、虚烦少气、口干舌红嫩。橘皮理气和胃、竹茹清热止呕为君，人参益气补虚，生姜降逆，甘草大枣和中。',
      misjudgment: '误将橘皮竹茹汤用于胃寒呃逆。错：方中竹茹甘寒清胃热，主治胃虚有热之呃；胃寒呃逆声低沉缓、呕吐清水、苔白者，当用丁香柿蒂汤温中降逆，寒热之辨关乎疗效成败。',
      reasoning: '呃逆之治，橘皮竹茹汤与丁香柿蒂汤一清一温，如何凭呃声与舌象取舍？',
      feedback: '胃虚有热之呃，呃声急促、口干舌红嫩，宜橘皮竹茹汤清补降逆；胃寒呃逆声缓、舌淡苔白，宜丁香柿蒂汤温中散寒，寒热虚实四字可执要。',
      transfer: '肿瘤化疗后呕吐不止、口干少气者，橘皮竹茹汤合何药可兼和胃止呕？',
    },
  },
  {
    id: 'pb38-l-014', title: '丹参饮', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['理气剂', '行气活血', '丹参饮', '心胃诸痛', '丹参'],
    intent: '掌握丹参饮活血祛瘀、行气止痛之功与药仅三味、重用丹参之组方特点。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '丹参30g、檀香6g（后下）、砂仁6g（后下），水煎服', caution: '檀香砂仁芳香，宜后下取其气；无瘀血证者不宜久用' },
    cases: null,
    stdJudgment: '丹参饮活血祛瘀、行气止痛，主治血瘀气滞之心腹胃脘刺痛、痛有定处而夜间尤甚，重用丹参活血为君，檀香砂仁理气和中，药仅三味而效专。',
    coreDefinition: '活血祛瘀，行气止痛。主治血瘀气滞之心胃诸痛：心胸胃脘刺痛，痛有定处，入夜尤甚。',
    safety: { note: '本方以活血行气见功，须辨证属瘀阻气滞者方宜；檀香、砂仁后下以保芳香之气。', prohibitions: ['丹参反藜芦（十八反）'] },
    learning: {
      knowledge: '丹参饮由丹参、檀香、砂仁三味组成，活血祛瘀、行气止痛，主治血瘀气滞之心胃诸痛，心胸胃脘刺痛、痛有定处、入夜尤甚。重用丹参活血化瘀为君，檀香理气宽胸散寒止痛，砂仁和胃行气，檀香砂仁俱宜后下以取其气。',
      misjudgment: '误将丹参饮当胃病通治方，忽略瘀血病机。错：本方以活血为君、行气为佐，主治瘀阻气滞之刺痛固定；若为虚寒胃痛或肝胃气痛而无瘀象者，用之则药证不符，须凭刺痛、拒按、舌紫辨证。',
      reasoning: '丹参饮与金铃子散均治心腹诸痛，活血与理气之侧重如何辨析？',
      feedback: '金铃子散以川楝子延胡索行气活血、偏于气郁化热之痛；丹参饮重用丹参活血化瘀、偏于瘀血阻滞之刺痛，一理气一活血，各有所主。',
      transfer: '冠心病心绞痛夜间加重、舌紫暗者，丹参饮合何药可增强活血通脉之力？',
    },
  },
  // ============================================================
  // L 方剂学 · 理血剂·活血化瘀（015–017）
  // ============================================================
  {
    id: 'pb38-l-015', title: '膈下逐瘀汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['理血剂', '活血化瘀', '膈下逐瘀汤', '行气止痛', '桃仁'],
    intent: '掌握膈下逐瘀汤活血祛瘀、行气止痛之功及行气药在方中之枢纽地位。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '五灵脂6g（炒）、当归9g、川芎6g、桃仁9g（研泥）、丹皮6g、赤芍6g、乌药6g、延胡索3g、甘草9g、香附4.5g、红花9g、枳壳4.5g，水煎服', caution: '桃仁有小毒，孕妇慎用；五灵脂畏人参（十九畏），含人参方剂不宜与之同用' },
    cases: null,
    stdJudgment: '膈下逐瘀汤活血祛瘀、行气止痛，主治瘀血结于膈下之痞块坚硬、痛有定处、卧则腹坠，桃红四物去地黄合五灵脂延胡索，配乌药香附枳壳行气。',
    coreDefinition: '活血祛瘀，行气止痛。主治膈下瘀血证：痞块坚硬，痛有定处，卧则腹坠似有物，舌紫暗。',
    safety: { note: '本方活血行气并重，须有瘀血指征方用；桃仁有小毒，孕妇及无瘀滞者忌用。', prohibitions: ['桃仁有小毒，孕妇慎用', '甘草反海藻、大戟、甘遂、芫花（十八反）'] },
    learning: {
      knowledge: '膈下逐瘀汤由桃仁、红花、当归、川芎、赤芍、丹皮活血化瘀，五灵脂、延胡索化瘀止痛，香附、乌药、枳壳行气，甘草调和，共奏活血祛瘀、行气止痛之功。主治瘀血结于膈下之痞块坚硬、痛有定处、卧则腹坠，舌紫暗脉弦涩。',
      misjudgment: '误以为活血即可，忽视行气药之枢纽。错：香附乌药枳壳疏理肝脾气机，气行则血行，若弃行气药单恃活血，膈下瘀结难化；且桃仁有小毒，孕妇及无瘀滞者忌用。',
      reasoning: '五逐瘀汤同治瘀血，膈下逐瘀汤缘何独重行气与止痛？',
      feedback: '膈下乃肝脾所居、气机升降之枢，瘀结于膈下必碍气行，故于活血之外重投香附乌药枳壳，配五灵脂延胡索化瘀止痛，行气活血相辅相成。',
      transfer: '肝病胁下痞块、入夜痛甚者，膈下逐瘀汤如何配伍软坚之品？',
    },
  },
  {
    id: 'pb38-l-016', title: '身痛逐瘀汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['理血剂', '活血化瘀', '身痛逐瘀汤', '通痹止痛', '桃仁'],
    intent: '掌握身痛逐瘀汤活血行气、祛瘀通络、通痹止痛之功与久痹从瘀论治之思路。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '秦艽3g、川芎6g、桃仁9g、红花9g、甘草6g、羌活3g、没药6g、当归9g、五灵脂6g（炒）、香附3g、牛膝9g、地龙6g，水煎服', caution: '桃仁有小毒，孕妇慎用；风寒湿痹初起无瘀象者不宜' },
    cases: null,
    stdJudgment: '身痛逐瘀汤活血行气、祛瘀通络、通痹止痛，主治瘀血痹阻经络之肩臂腰腿痛如针刺，桃红配秦艽羌活地龙祛风通络，牛膝引下，痹证瘀血者宜。',
    coreDefinition: '活血行气，祛瘀通络，通痹止痛。主治瘀血痹阻经络证：肩臂腰腿疼痛如针刺，痛处固定，经久不愈。',
    safety: { note: '本方为久痹入络、瘀血阻络者设，须凭痛处固定、如刺之瘀血征辨证使用。', prohibitions: ['桃仁有小毒，孕妇慎用', '甘草反海藻、大戟、甘遂、芫花（十八反）'] },
    learning: {
      knowledge: '身痛逐瘀汤由秦艽、羌活、地龙祛风通络，桃仁、红花、当归、川芎、没药、五灵脂活血止痛，牛膝引血下行，香附理气，甘草调和，共奏活血行气、祛瘀通络、通痹止痛之功。主治瘀血痹阻经络之肩臂腰腿疼痛如针刺、痛处固定、久治不愈。',
      misjudgment: '误将身痛逐瘀汤用于风寒湿痹初起。错：本方主治久痹入络之瘀血证，痛如锥刺、固定不移、入夜加甚；风寒湿痹初起关节游走酸痛、苔白脉浮紧者，当用蠲痹汤、独活寄生汤祛风散寒除湿，瘀血药不可早投。',
      reasoning: '痹证日久，为何由祛风除湿转从瘀血论治？',
      feedback: '久病入络、气血凝滞则痛处固定如刺，此时邪已深伏血络，非桃红虫类搜剔不足以通络止痛，故身痛逐瘀汤以活血通络为法，兼以秦艽羌活地龙搜风。',
      transfer: '腰椎间盘突出腰痛固定、夜间尤甚者，身痛逐瘀汤与独活寄生汤如何择用？',
    },
  },
  {
    id: 'pb38-l-017', title: '鳖甲煎丸', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['理血剂', '消癥化积', '鳖甲煎丸', '疟母', '䗪虫', '有毒'],
    intent: '掌握鳖甲煎丸行气活血、祛湿化痰、软坚消癥之功及攻补兼施、丸药缓图之用法。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '疟母', canon: '疟病脉证并治', chapter: '', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified', originalText: '病疟，以月一日发，当以十五日愈，设不差，当月尽解。如其不差，当云何？师曰：此结为癥瘕，名曰疟母，急治之，宜鳖甲煎丸' }],
    dosage: { guideline: '炙鳖甲、柴胡、黄芩、大黄、桂枝、厚朴、半夏、射干、桃仁、牡丹、紫葳、赤硝、䗪虫、蜣螂、鼠妇、蜂窠、石韦、瞿麦、葶苈、芍药、人参、阿胶等23味，清酒煅灶下灰煎煮，炼蜜为丸（如梧子大），每服3g，日3次', caution: '虫类破瘀峻品，孕妇禁用；体虚无瘀者忌用；丸剂缓图，不可峻攻' },
    cases: null,
    stdJudgment: '鳖甲煎丸行气活血、祛湿化痰、软坚消癥，主治疟母及癥瘕积聚，鳖甲软坚为君，虫类搜剔、硝黄攻逐、参胶补虚，寒热并投、攻补兼施之剂。',
    coreDefinition: '行气活血，祛湿化痰，软坚消癥。主治疟母、癥瘕：胁下痞硬成块，腹中癥块，舌紫暗，脉沉涩。',
    safety: { note: '方中䗪虫、蜣螂、鼠妇均有小毒，破血力峻；人参阿胶补虚与硝黄虫类攻逐同炉，须丸剂小量缓服，中病即止。', prohibitions: ['䗪虫、蜣螂、鼠妇有小毒，孕妇禁用', '体虚无瘀者忌用', '半夏生用有毒须炮制，反乌头类（含附子）', '桃仁有小毒，孕妇慎用', '大黄泻下，孕妇慎用'] },
    learning: {
      knowledge: '鳖甲煎丸二十三味组成，以炙鳖甲软坚散结为君，大黄、赤硝、桃仁、牡丹、紫葳活血破瘀，蜣螂、䗪虫、鼠妇、蜂窠虫类搜剔络脉，柴胡、桂枝、厚朴、半夏、射干行气化痰，人参、阿胶益气养血，清酒煅灶下灰煎煮炼蜜为丸，行气活血、祛湿化痰、软坚消癥，主治疟母癥瘕。',
      misjudgment: '误将鳖甲煎丸作峻下逐瘀之剂长期攻伐。错：本方攻补兼施，虫类破瘀与参胶补虚同炉，旨在缓消癥积而非速攻；且方中䗪虫、蜣螂、鼠妇有小毒，孕妇禁用，体虚无瘀者忌用，须蜜丸小量久服缓图。',
      reasoning: '癥瘕坚积，鳖甲煎丸何以攻药与补药并投、寒药与热药同炉？',
      feedback: '癥瘕日久，邪结正伤：鳖甲软坚、硝黄虫类逐瘀搜剔治其标，人参阿胶扶正防其虚，桂枝干姜温、黄芩大黄清调其寒热，俾攻不伤正、补不碍邪，丸剂缓攻以图久效。',
      transfer: '脾大痞块、面黄消瘦之虚实夹杂者，鳖甲煎丸用法当如何缓图？',
    },
  },
  // ============================================================
  // L 方剂学 · 祛湿剂（018–019）
  // ============================================================
  {
    id: 'pb38-l-018', title: '连朴饮', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['祛湿剂', '清热祛湿', '连朴饮', '霍乱吐利', '半夏'],
    intent: '掌握连朴饮清热化湿、理气和中之功与重用芦根保津之配伍特点。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '厚朴6g、黄连3g（姜汁炒）、石菖蒲3g、制半夏3g、炒豆豉9g、焦栀子9g、芦根60g，水煎服', caution: '芦根用量须大（一两）以清热生津；寒湿吐泻禁用' },
    cases: null,
    stdJudgment: '连朴饮清热化湿、理气和中，主治湿热中阻之霍乱吐利、胸脘痞闷、苔黄腻，黄连栀子苦寒清热，厚朴半夏菖蒲化湿和胃，芦根重用生津。',
    coreDefinition: '清热化湿，理气和中。主治湿热中阻证：霍乱吐利，胸脘痞闷，口渴心烦，舌苔黄腻。',
    safety: { note: '本方为湿热吐利而设，寒湿霍乱（苔白、口不渴）禁用；芦根甘寒重用，清热不碍湿。', prohibitions: ['半夏生用有毒须炮制，反乌头类（含附子），孕妇慎用'] },
    learning: {
      knowledge: '连朴饮由厚朴、黄连（姜汁炒）、石菖蒲、制半夏、炒豆豉、焦栀子、芦根组成，清热化湿、理气和中，主治湿热中阻之霍乱吐利、胸脘痞闷、口渴心烦、苔黄腻。黄连栀子苦寒清热，厚朴半夏菖蒲化湿和胃，豆豉宣透，芦根重用60g清热生津。',
      misjudgment: '误将连朴饮用于寒湿吐泻。错：本方为湿热蕴伏而设，苔必黄腻、口渴心烦；寒湿霍乱吐利清稀、舌淡苔白腻、口不渴，当用藿香正气散或理中丸温散寒湿，苦寒之黄连栀子决不可投。',
      reasoning: '霍乱吐利之湿热证，何以重用芦根一两而轻用黄连三分？',
      feedback: '吐利伤津，芦根甘寒重用既清胃热又复津液，实为保津之法；黄连少量苦寒燥湿清热即可，中病止药，防苦寒伐胃，此湿热并治、津气并护之匠心。',
      transfer: '胃肠炎呕吐腹泻、脘痞苔黄腻者，连朴饮合何药可助止泻？',
    },
  },
  {
    id: 'pb38-l-019', title: '萆薢分清饮', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['祛湿剂', '利水渗湿', '萆薢分清饮', '膏淋白浊', '温肾利湿'],
    intent: '掌握萆薢分清饮温肾利湿、分清化浊之功，辨明《杨氏家藏方》与《医学心悟》两方寒温之别。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '川萆薢、盐炒益智仁、石菖蒲、乌药各9g（原方各等分为细末，每服三钱，入盐少许同煎服），现代作汤剂入食盐少许同煎', caution: '下焦湿热之膏淋（尿浊黄赤、苔黄腻）禁用，当用《医学心悟》萆薢分清饮清热利湿' },
    cases: null,
    stdJudgment: '萆薢分清饮温肾利湿、分清化浊，主治下焦虚寒之膏淋白浊、小便如米泔凝膏，萆薢利湿分浊为君，益智仁温肾缩尿，菖蒲乌药通窍行气。',
    coreDefinition: '温肾利湿，分清化浊。主治下焦虚寒之膏淋、白浊：小便白如米泔，凝如膏糊，频数无度。',
    safety: { note: '本方性偏温，专治虚寒膏淋；湿热浊淋见尿浊黄赤、苔黄腻者禁用温补之品。', prohibitions: [] },
    learning: {
      knowledge: '萆薢分清饮由川萆薢、益智仁（盐炒）、石菖蒲、乌药各等分组成，温肾利湿、分清化浊，主治下焦虚寒之膏淋、白浊，小便白如米泔、凝如膏糊、频数无度、舌淡苔白。萆薢利湿分清为君，益智仁温肾缩尿，石菖蒲化浊开窍，乌药温肾行气，煎服入盐少许引药归肾。',
      misjudgment: '误将萆薢分清饮用于湿热淋浊。错：本方主治下焦虚寒之膏淋（小便浑浊、腰膝酸冷、舌淡苔白），湿热淋浊尿浊而黄赤、苔黄腻者，当用《医学心悟》萆薢分清饮（萆薢黄柏茯苓车前子等）清热利湿，温补之品反助邪。',
      reasoning: '同名萆薢分清饮，《杨氏家藏方》与《医学心悟》两方寒温迥异，如何凭苔脉分辨？',
      feedback: '《杨氏》方温肾散寒，宜虚寒膏淋（苔白脉沉）；《心悟》方清热利湿，宜湿热白浊（苔黄脉数），小便之色与舌苔黄白为辨。',
      transfer: '老年尿浊迁延、腰膝冷痛者，萆薢分清饮合何药可兼顾肾阳？',
    },
  },
  // ============================================================
  // L 方剂学 · 痈疡剂·清热解毒（020）
  // ============================================================
  {
    id: 'pb38-l-020', title: '四妙勇安汤', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['痈疡剂', '清热解毒', '四妙勇安汤', '脱疽', '甘草'],
    intent: '掌握四妙勇安汤清热解毒、活血止痛之功与重用银花玄参、药少量大之配伍要旨。',
    facts: [
      { field: 'formula.composition', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.efficacy', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.indication', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.source', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.dosage', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '金银花90g、玄参90g、当归60g、甘草30g，水煎服，每日1剂，连服10-15日（用量宜大，药少量重）', caution: '甘草用量大至30g，须注意其反海藻大戟甘遂芫花及久服致水钠潴留；脾胃虚寒者慎用' },
    cases: null,
    stdJudgment: '四妙勇安汤清热解毒、活血止痛，主治热毒炽盛之脱疽患肢暗红肿痛、溃烂腐臭，银花玄参重用清热解毒养阴，当归活血，甘草解毒，药少量大。',
    coreDefinition: '清热解毒，活血止痛。主治热毒炽盛之脱疽：患肢暗红微肿灼热，溃烂腐臭，痛剧，舌红脉数。',
    safety: { note: '本方四味药少量大，银花玄参各90g、甘草30g，为挫热毒之峻剂；甘草大剂量久服可致水肿、血压升高，且反海藻大戟甘遂芫花。', prohibitions: ['甘草反海藻、大戟、甘遂、芫花（十八反）', '甘草大剂量久服可致水肿、血压升高', '玄参反藜芦（十八反）'] },
    learning: {
      knowledge: '四妙勇安汤由金银花、玄参、当归、甘草四味组成，用量宜大（银花玄参各90g、当归60g、甘草30g），清热解毒、活血止痛，主治热毒炽盛之脱疽，患趾暗红微肿灼热、疼痛剧烈、溃烂腐臭、烦热口渴。重用银花清热解毒为君，玄参清热养阴，当归活血，甘草解毒和药。',
      misjudgment: '误将四妙勇安汤药量减半使用。错：脱疽为热毒深伏血脉之重证，非重用银花玄参不足挫其毒焰，剂量不足则杯水车薪；且甘草用至30g，须牢记其反海藻大戟甘遂芫花，久服大剂尚须防水钠潴留。',
      reasoning: '同为痈疡剂，四妙勇安汤为何不用穿山甲皂刺等溃坚透托之品？',
      feedback: '脱疽热毒炽盛已腐筋烂骨，病在血分深部，治当清热解毒、活血养阴以保患肢，而非溃托之品可胜任；银花玄参重用清解血分热毒，当归活血防瘀，为保肢护络之正法。',
      transfer: '糖尿病足溃烂灼痛属热毒炽盛者，四妙勇安汤加减如何兼顾血糖与局部坏死？',
    },
  },
];
