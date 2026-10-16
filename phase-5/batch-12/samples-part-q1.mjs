// ============================================================
// 杏林大典 · Phase 5 · Batch-12 · 样本 Part Q1（Q 中医临床基础 10 节点 pb12-q-001 ~ pb12-q-010）
// 学科：Q 中医临床基础；覆盖：六经辨证（太阳/阳明/少阳/太阴/少阴/厥阴 +
//       太阳蓄水证、太阳蓄血证、痞证、结胸证）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// facts sourceTitle 限定：《伤寒论》规划教材 / 《中医临床基础》规划教材
// classics 引用《伤寒论》条文以条文短语为 label；已收录于 classic-patch.mjs 者直接引用，
//   未收录者列于交付说明，由主代理统一补录（本文件不改动 classic-patch.mjs）
// 高危药（附子/细辛/甘遂/半夏/麻黄/甘草）红线按 authoring-spec 第 4 节表写入 prohibitions
// ============================================================

export const SAMPLES_PART_Q1 = [
  // ============================================================
  // 六经辨证 · 太阳（1–2）
  // ============================================================
  {
    id: 'pb12-q-001', title: '六经·太阳病证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['六经辨证', '太阳病', '桂枝汤', '麻黄汤'],
    intent: '掌握太阳病提纲及太阳中风、太阳伤寒两证的证候特点、核心病机与经方辨治。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '太阳之为病', canon: '《伤寒论》', originalText: '太阳之为病，脉浮，头项强痛而恶寒。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
      { label: '名为中风', canon: '《伤寒论》', originalText: '太阳病，发热，汗出，恶风，脉缓者，名为中风。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
      { label: '名为伤寒', canon: '《伤寒论》', originalText: '太阳病，或已发热，或未发热，必恶寒，体痛，呕逆，脉阴阳俱紧者，名为伤寒。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '桂枝汤：桂枝9g、芍药9g、炙甘草6g、生姜9g、大枣12枚，水煎温服，啜热稀粥并温覆取微汗；麻黄汤：麻黄9g、桂枝6g、杏仁9g、炙甘草3g，先煎麻黄去上沫，取微汗', caution: '表虚者禁麻黄汤、表实者禁桂枝汤；汗后表不解者不得再行峻汗' },
    cases: null,
    stdJudgment: '太阳病以脉浮、头项强痛、恶寒为提纲，病位在表、病性属寒。太阳中风证见发热汗出恶风脉缓，为卫强营弱，治以桂枝汤解肌祛风、调和营卫；太阳伤寒证见恶寒发热无汗身痛脉紧，为卫阳被遏、营阴郁滞，治以麻黄汤发汗解表、宣肺平喘。一虚一实，汗法有别。',
    coreDefinition: '太阳病为外感病初期，风寒犯表、营卫受病。提纲「脉浮，头项强痛而恶寒」；中风表虚主桂枝汤，伤寒表实主麻黄汤。',
    safety: { note: '服桂枝汤后须啜热稀粥并温覆，助药力以取微汗；麻黄汤发汗力峻，中病即止，不可过汗伤阳。', prohibitions: ['麻黄发汗力强，虚人及高血压、心脏病、失眠者慎用，运动员禁用'] },
    learning: {
      knowledge: '太阳病提纲为脉浮、头项强痛、恶寒，核心病机为风寒袭表、卫外失司。太阳中风证候特点：发热、汗出、恶风、脉浮缓，病机为卫强营弱，治以解肌祛风、调和营卫，代表方桂枝汤（桂枝、芍药、炙甘草、生姜、大枣）；太阳伤寒证候特点：恶寒发热、无汗、身痛腰痛、脉浮紧，病机为卫阳被遏、营阴郁滞，治以发汗解表、宣肺平喘，代表方麻黄汤（麻黄、桂枝、杏仁、炙甘草）。鉴别要点：有汗无汗、脉缓脉紧，即表虚与表实之别。',
      misjudgment: '见发热恶寒即投麻黄汤。错：伤寒表实无汗脉紧方可用麻黄汤；汗出恶风脉缓之表虚证误投麻黄汤，发汗太过反伤卫阳，桂枝汤方为的对之剂。',
      reasoning: '同为太阳表证，为何中风用桂枝汤而伤寒用麻黄汤，两方配伍差异何在？',
      feedback: '中风表虚、营卫不和，须桂枝汤调和营卫、啜粥助汗；伤寒表实、腠理闭郁，须麻黄汤峻汗开腠。桂枝汤以芍药敛阴配桂枝通阳，麻黄汤以麻黄宣肺配杏仁降气，一和一峻、一虚一实。',
      transfer: '太阳病汗后表不解，脉浮弱、身疼痛者，为何仲景仍主桂枝汤而非麻黄汤？',
    },
  },
  {
    id: 'pb12-q-002', title: '六经·阳明病证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['六经辨证', '阳明病', '白虎汤', '大承气汤'],
    intent: '掌握阳明病提纲「胃家实」及阳明经热证、阳明腑实证的证治要点与白虎汤、大承气汤的运用。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '阳明之为病', canon: '《伤寒论》', originalText: '阳明之为病，胃家实是也。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '白虎汤：石膏30-60g（打碎先煎）、知母9g、炙甘草6g、粳米15g；大承气汤：大黄12g（后下）、厚朴15g、枳实12g、芒硝9g（冲服），得下利后止后服', caution: '大承气汤峻下热结，须中病即止；表证未解、里未成实者禁用' },
    cases: null,
    stdJudgment: '阳明病提纲为「胃家实」，病位在胃肠、病性属里热实证。阳明经热证见身大热、汗大出、口大渴、脉洪大，热炽津伤，治以清热生津，白虎汤主之；阳明腑实证见日晡潮热、腹满硬痛、大便不通、脉沉实，燥屎内结，治以峻下热结，大承气汤主之。经证清、腑证下，是阳明辨治之纲。',
    coreDefinition: '阳明病为里热实证之总纲，经证热炽津伤用白虎汤，腑证燥屎内结用大承气汤，皆以「胃家实」为提纲。',
    safety: { note: '大承气汤泻下峻猛，得下利后即止后服，不可过用伤正；白虎汤中用甘草、粳米护胃，然表未解者不可早投。', prohibitions: ['甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '阳明病提纲「胃家实」，核心病机为阳明热盛、燥实内结。阳明经热证候特点：身大热、汗大出、口大渴、脉洪大（四大），治以清热生津，代表方白虎汤（石膏、知母、炙甘草、粳米）；阳明腑实证候特点：日晡潮热、腹满硬痛拒按、便秘、舌苔黄燥、脉沉实，治以峻下热结，代表方大承气汤（大黄、厚朴、枳实、芒硝）。鉴别要点：经证无燥屎内结之腹满便闭，腑证有之；经证宜清、腑证宜下。',
      misjudgment: '把白虎汤用于阳明腑实。错：白虎汤治无形热炽之经证，虽大热大渴而无腹满硬痛、大便不通；腑实燥结须承气攻下，单用白虎反致热结愈深、病重药轻。',
      reasoning: '同为阳明病，白虎汤与大承气汤一清一下，辨证的关键症状在哪几项？',
      feedback: '关键在腹满便闭之有无：无燥屎内结属经证，清热生津用白虎；有潮热腹满便秘属腑证，峻下热结用承气。舌苔由黄燥转焦黑、脉由洪大转沉实，提示热邪由经入腑。',
      transfer: '温病气分热盛亦见大热大渴，借用白虎汤时与伤寒阳明经证有何异同考量？',
    },
  },
  // ============================================================
  // 六经辨证 · 少阳（3）
  // ============================================================
  {
    id: 'pb12-q-003', title: '六经·少阳病证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['六经辨证', '少阳病', '小柴胡汤', '和解'],
    intent: '掌握少阳病提纲及半表半里、枢机不利的病机，小柴胡汤和解少阳的运用。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '少阳之为病', canon: '《伤寒论》', originalText: '少阳之为病，口苦，咽干，目眩也。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
      { label: '往来寒热', canon: '《伤寒论》', originalText: '伤寒五六日中风，往来寒热，胸胁苦满，嘿嘿不欲饮食，心烦喜呕。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '小柴胡汤：柴胡24g、黄芩9g、人参9g、半夏9g（洗）、炙甘草9g、生姜9g、大枣12枚，去滓再煎，日三服', caution: '少阳病禁汗、禁吐、禁下；本方以和解为法，不可作发汗或攻下之剂使用' },
    cases: null,
    stdJudgment: '少阳病提纲为口苦、咽干、目眩，病位在半表半里，枢机不利、胆火内郁是其核心病机。证候特点为往来寒热、胸胁苦满、默默不欲饮食、心烦喜呕，治以和解少阳，小柴胡汤主之。少阳禁汗、禁吐、禁下，只宜和解，此「少阳三禁」为少阳辨治之关键。',
    coreDefinition: '少阳病枢机不利、胆火内郁，提纲「口苦咽干目眩」，主证往来寒热、胸胁苦满，治以和解少阳，小柴胡汤主之。',
    safety: { note: '小柴胡汤去滓再煎，取其和解枢机之意；半夏生用有毒须炮制，反乌头类（含附子），不可与附子同用。', prohibitions: ['半夏生品有毒，须炮制后入煎，反乌头类（含附子），孕妇慎用', '甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '少阳病提纲为口苦、咽干、目眩，核心病机为邪犯少阳、枢机不利、胆火内郁。证候特点：往来寒热、胸胁苦满、默默不欲饮食、心烦喜呕、脉弦，治则治法为和解少阳，代表方小柴胡汤（柴胡、黄芩、人参、半夏、生姜、大枣、炙甘草），柴芩疏透清解并用、参草枣扶正达邪。鉴别要点：与太阳恶寒发热之同时并见不同，少阳为寒热往来；与阳明蒸蒸发热不同，少阳热势不高而兼喜呕。',
      misjudgment: '见往来寒热即重用柴胡攻邪而忽略扶正。错：小柴胡汤中人参、大枣、甘草扶助正气，正虚之体邪陷少阳方能托邪外出；纯用柴芩则枢机无力运转，邪难外透。',
      reasoning: '少阳病为何禁汗、禁吐、禁下，误治后将转属何证？',
      feedback: '少阳枢机位于半表半里：汗之则伤津助热，吐下则耗气伤中，邪反内陷；误下可成结胸或心下痞，故张仲景明示「少阳不可发汗」「不可吐下」。',
      transfer: '妇人热入血室、经水适断而寒热如疟，为何仍以小柴胡汤和解为治？',
    },
  },
  // ============================================================
  // 六经辨证 · 太阴（4）
  // ============================================================
  {
    id: 'pb12-q-004', title: '六经·太阴病证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['六经辨证', '太阴病', '理中丸', '温中'],
    intent: '掌握太阴病提纲、脾阳虚寒湿内盛之病机与理中丸温中散寒的运用。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '太阴之为病', canon: '《伤寒论》', originalText: '太阴之为病，腹满而吐，食不下，自利益甚，时腹自痛。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
      { label: '自利不渴', canon: '《伤寒论》', originalText: '自利不渴者，属太阴，以其脏有寒故也。当温之，宜服四逆辈。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '理中丸：人参、干姜、炙甘草、白术各9g，蜜丸或作汤剂；病重下利不止者，可投四逆辈（附子须炮制先煎）', caution: '太阴病忌攻下；四逆辈含附子，须炮制先煎久煎至无麻辣感' },
    cases: null,
    stdJudgment: '太阴病提纲为腹满而吐、食不下、自利益甚、时腹自痛，核心病机为脾阳虚弱、寒湿内盛。证候特点是腹满时痛、下利清稀、口不渴，治以温中散寒、健脾燥湿，轻证主理中丸（人参、白术、干姜、炙甘草），重证宜四逆辈。太阴与阳明同属中焦，一虚一实、一寒一热，须辨脾家虚寒与肠腑燥实。',
    coreDefinition: '太阴病脾阳虚、寒湿盛，提纲「腹满而吐，食不下，自利益甚」，治以温中散寒、健脾燥湿，理中丸主之，重则四逆辈。',
    safety: { note: '四逆辈含附子，须炮制后先煎久煎至口尝无麻辣感，再下余药；太阴病忌用攻下，以免中阳更伤。', prohibitions: ['附子须炮制、先煎久煎至口尝无麻辣感；反半夏、瓜蒌、贝母、白蔹、白及；孕妇禁用', '甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '太阴病提纲为腹满而吐、食不下、自利益甚、时腹自痛，核心病机为脾阳虚弱、运化失职、寒湿内停。证候特点：腹满时痛、喜温喜按、下利清稀、口不渴、舌淡苔白，治则治法为温中散寒、健脾燥湿，代表方理中丸（人参、白术、干姜、炙甘草），干姜温中散寒为主药。鉴别要点：太阴下利口不渴属虚寒，与阳明腑实之腹满便秘相对；「自利不渴者属太阴」，与少阴下利之「自利而渴」亦须分清。',
      misjudgment: '见腹满即作阳明腑实攻下。错：太阴腹满时痛、喜温喜按、下利不渴，属脾虚寒湿之证，攻下必致中阳更伤、下利不止；须温中散寒，以理中丸类方为治。',
      reasoning: '同为下利，太阴「自利不渴」与少阴「自利而渴」病机有何不同，如何鉴别？',
      feedback: '太阴下利为脾虚湿盛、津液未伤，故口不渴；少阴下利为肾阳衰微、不能蒸化津液上承，故口渴。一在脾一在肾、一轻一重，故太阴宜四逆辈温中、少阴宜四逆汤回阳。',
      transfer: '太阴病腹痛下利而兼表证恶寒身痛，应先解表还是先温里，其理据何在？',
    },
  },
  // ============================================================
  // 六经辨证 · 少阴（5）
  // ============================================================
  {
    id: 'pb12-q-005', title: '六经·少阴病证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['六经辨证', '少阴病', '四逆汤', '附子', '细辛'],
    intent: '掌握少阴病提纲、心肾阳虚之寒化证与四逆汤回阳救逆的运用。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '少阴之为病', canon: '《伤寒论》', originalText: '少阴之为病，脉微细，但欲寐也。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
      { label: '脉微欲绝', canon: '《伤寒论》', originalText: '下利清谷，内寒外热，脉微欲绝者，四逆汤主之。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '四逆汤：炙甘草6g、干姜6g、生附子10g（炮，破八片，先煎久煎），附子先煎至无麻辣感再入余药；太少两感用麻黄细辛附子汤，细辛煎剂1-3g', caution: '附子有毒，必须炮制先煎久煎；细辛煎剂1-3g、散剂0.5-1g，过量可致中毒' },
    cases: null,
    stdJudgment: '少阴病提纲为脉微细、但欲寐，核心病机为心肾阳虚、阴寒内盛。寒化证候特点：无热恶寒、蜷卧、四肢厥冷、下利清谷、脉微细欲绝，治以回阳救逆，四逆汤主之；兼见发热恶寒无汗、脉反沉者，为太少两感，用麻黄细辛附子汤温经解表。少阴为生死之关，须辨寒化与热化。',
    coreDefinition: '少阴病心肾阳虚、阴寒内盛，提纲「脉微细，但欲寐」，寒化证治以回阳救逆，四逆汤主之，太少两感用麻黄细辛附子汤。',
    safety: { note: '附子须炮制并先煎久煎至口尝无麻辣感，干姜、甘草可助解附子之毒；细辛煎剂1-3g、散剂0.5-1g，过量可致中毒，反藜芦。', prohibitions: ['附子须炮制、先煎久煎至口尝无麻辣感；反半夏、瓜蒌、贝母、白蔹、白及；孕妇禁用', '细辛【高风险】煎剂1-3g、散剂0.5-1g，过量可致中毒；反藜芦', '麻黄发汗力强，虚人及高血压、心脏病、失眠者慎用，运动员禁用', '甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '少阴病提纲为脉微细、但欲寐，核心病机为心肾阳衰、阴寒内盛。寒化证候特点：无热恶寒、蜷卧、四肢厥冷、下利清谷、小便清长、脉微细欲绝，治则治法为回阳救逆，代表方四逆汤（生附子、干姜、炙甘草），附子温肾回阳、干姜温中散寒、甘草益气和中。鉴别要点：少阴寒化之厥冷下利较太阴病位更深，脉微细但欲寐、病及于肾；兼表证之发热而脉反沉，属太少两感，用麻黄细辛附子汤温经解表。',
      misjudgment: '见但欲寐即按阳虚论治而忽略热化。错：少阴热化证见心烦不得眠、口燥咽干、舌红少苔，黄连阿胶汤主之；阳虚之但欲寐与阴虚之不得眠，一寒一热，须凭脉舌详辨，不可概投温阳。',
      reasoning: '四逆汤中附子与干姜相须为用，为何说「附子无干姜不热」，炙甘草在方中起何作用？',
      feedback: '附子辛热温肾回阳、干姜辛热温中散寒，相须为用回阳力倍增；炙甘草甘缓益气，既缓姜附之峻烈，又助其温补，并能解附子之毒，为回阳救逆之经典配伍。',
      transfer: '太少两感之发热恶寒而脉反沉，为何用麻黄细辛附子汤，而非纯用发表或纯用温里？',
    },
  },
  // ============================================================
  // 六经辨证 · 厥阴（6）
  // ============================================================
  {
    id: 'pb12-q-006', title: '六经·厥阴病证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['六经辨证', '厥阴病', '乌梅丸', '附子', '细辛'],
    intent: '掌握厥阴病提纲、寒热错杂之病机与乌梅丸清上温下的运用。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '厥阴之为病', canon: '《伤寒论》', originalText: '厥阴之为病，消渴，气上撞心，心中疼热，饥而不欲食，食则吐蛔，下之利不止。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
      { label: '阴阳气不相顺接', canon: '《伤寒论》', originalText: '凡厥者，阴阳气不相顺接，便为厥。厥者，手足逆冷者是也。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '乌梅丸：乌梅300枚（醋浸）、细辛、干姜、黄连、当归、附子（炮）、蜀椒、桂枝、人参、黄柏，蜜丸，每服小量渐加；方中附子先煎、细辛煎剂1-3g', caution: '乌梅丸含附子、细辛，须按炮制与剂量要求；丸剂按丸数折算，不可超量' },
    cases: null,
    stdJudgment: '厥阴病提纲为消渴、气上撞心、心中疼热、饥而不欲食、食则吐蛔，核心病机为寒热错杂、厥热胜复。上热下寒证以乌梅丸清上温下、安蛔止痛为治；「凡厥者，阴阳气不相顺接便为厥」，厥证有寒厥、热厥、蛔厥之别，须辨手足逆冷之性质与程度。厥阴为六经传变之末，病情多端，寒热虚实易相混淆。',
    coreDefinition: '厥阴病寒热错杂、厥热胜复，提纲「消渴，气上撞心，心中疼热」，主方乌梅丸清上温下，厥证以阴阳气不相顺接为纲。',
    safety: { note: '乌梅丸含附子、细辛：附子须炮制先煎久煎至无麻辣感，细辛煎剂1-3g、散剂0.5-1g，过量可致中毒，反藜芦；服丸剂按丸量折算，不可妄加。', prohibitions: ['附子须炮制、先煎久煎至口尝无麻辣感；反半夏、瓜蒌、贝母、白蔹、白及；孕妇禁用', '细辛【高风险】煎剂1-3g、散剂0.5-1g，过量可致中毒；反藜芦'] },
    learning: {
      knowledge: '厥阴病提纲为消渴、气上撞心、心中疼热、饥而不欲食、食则吐蛔，核心病机为寒热错杂、阴阳气不相顺接。上热下寒证候特点：上热见消渴、气上撞心、心中疼热，下寒见下利、四肢厥冷，治则治法为清上温下、安蛔止痛，代表方乌梅丸（乌梅、细辛、干姜、黄连、当归、附子、蜀椒、桂枝、人参、黄柏），乌梅酸收敛阴、连柏苦寒清热、姜附椒桂辛温祛寒。鉴别要点：蛔厥之吐蛔、时静时烦与脏厥之躁无暂安时不同；寒厥脉微欲绝须回阳，热厥脉滑须清下。',
      misjudgment: '把乌梅丸仅当作驱蛔剂。错：乌梅丸是厥阴病寒热错杂证之主方，酸收、苦泄、辛开并用，安蛔只是其功用之一；凡上热下寒之证皆可化裁，不能以驱蛔一途概之。',
      reasoning: '同为手足厥冷，寒厥、热厥、蛔厥如何从脉证上区分，治疗何以各异？',
      feedback: '寒厥脉微欲绝、下利清谷，须四逆汤回阳；热厥脉滑、胸腹灼热而手足冷，须白虎或承气清下；蛔厥吐蛔、时静时烦，须乌梅丸安蛔温脏。三者厥冷虽同，脉证迥异，治各不同。',
      transfer: '厥阴病「厥少热多，其病当愈」，如何理解厥热胜复与预后判断的关系？',
    },
  },
  // ============================================================
  // 太阳变证 · 蓄水与蓄血（7–8）
  // ============================================================
  {
    id: 'pb12-q-007', title: '六经·太阳蓄水证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['六经辨证', '太阳腑证', '蓄水证', '五苓散'],
    intent: '掌握太阳蓄水证膀胱气化不利之病机与五苓散化气行水的运用。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '小便不利微热消渴', canon: '《伤寒论》', originalText: '太阳病，发汗后，大汗出……若脉浮，小便不利，微热消渴者，五苓散主之。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '五苓散：猪苓9g、泽泻15g、白术9g、茯苓9g、桂枝6g，为散，以白饮和服方寸匕，日三服，多饮暖水，汗出愈', caution: '作汤剂时须中病即止，不可过利水而伤阴；水入即吐者宜少量频服' },
    cases: null,
    stdJudgment: '太阳蓄水证由太阳表邪循经入腑、膀胱气化不利所致，证候特点为发热恶风、小便不利、烦渴欲饮、甚则水入即吐，治以化气行水、兼以解表，五苓散主之。方中二苓泽泻渗利水湿、白术健脾、桂枝通阳化气兼解表。蓄水与蓄血同属太阳腑证，一以小便不利为要，一以神志如狂为要，鉴别在小便通利与否。',
    coreDefinition: '太阳蓄水证邪入膀胱、气化不利，证见小便不利、微热消渴，治以化气行水，五苓散主之，桂枝通阳化气兼解表。',
    safety: { note: '五苓散为散剂，以白饮（米汤）和服，服后多饮暖水以助汗出；若作汤剂，桂枝用量宜小，利水中病即止。', prohibitions: [] },
    learning: {
      knowledge: '太阳蓄水证候特点：发热恶风、小便不利、烦渴欲饮、甚则水入即吐，核心病机为太阳表邪不解、循经入腑、膀胱气化不利、水蓄下焦。治则治法为化气行水、兼以解表，代表方五苓散（猪苓、泽泻、白术、茯苓、桂枝）。鉴别要点：与太阳蓄血证同属太阳腑证，蓄水证小便不利而神志如常，蓄血证小便自利而如狂、发狂；与水逆证相较，水入即吐者根在膀胱气化失司，仍以五苓散化气行水。',
      misjudgment: '见口渴即作津伤而纯用滋阴生津。错：蓄水之渴乃水气内停、气不化津、津不上承所致，愈饮愈渴、水入即吐；须化气行水以布津止渴，误投滋阴反助水湿。',
      reasoning: '同为太阳表证，为何有的发展为蓄水（小便不利）而有的发展为蓄血（其人如狂），鉴别着眼点是什么？',
      feedback: '着眼小便：蓄水证膀胱气化不利故小便不利，蓄血证热与血结于下焦而膀胱气化未伤故小便自利；再察神志，蓄血多伴如狂、发狂，蓄水神志如常，据此分治。',
      transfer: '水肿小便不利而兼恶风者，借用五苓散与越婢汤应如何取舍？',
    },
  },
  {
    id: 'pb12-q-008', title: '六经·太阳蓄血证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['六经辨证', '太阳腑证', '蓄血证', '桃核承气汤', '逐瘀'],
    intent: '掌握太阳蓄血证热与血结于下焦之病机与桃核承气汤泻热逐瘀的运用。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '其人如狂', canon: '《伤寒论》', originalText: '太阳病不解，热结膀胱，其人如狂，血自下，下者愈。其外不解者，尚未可攻，当先解其外；外解已，但少腹急结者，乃可攻之，宜桃核承气汤。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '桃核承气汤：桃仁9g（去皮尖，捣碎）、大黄12g、桂枝6g、炙甘草6g、芒硝6g（冲服），先食温服，得下瘀血后止后服', caution: '攻下逐瘀力猛，中病即止；孕妇及月经过多者禁用；表证未解者先解表，不可径用攻下' },
    cases: null,
    stdJudgment: '太阳蓄血证由表邪入里化热、热与血搏结于下焦所致，证候特点为少腹急结、小便自利、神志如狂、脉沉涩，治以泻热逐瘀，桃核承气汤主之。方为调胃承气汤加桃仁、桂枝而成，大黄桃仁泻热逐瘀、桂枝通经活血、芒硝软坚散结。运用要点：表解方可用攻，表未解者先解表后攻里，中病即止。',
    coreDefinition: '太阳蓄血证热结下焦、血蓄不行，证见少腹急结、小便自利、其人如狂，治以泻热逐瘀，桃核承气汤主之。',
    safety: { note: '桃核承气汤攻下逐瘀力猛，得下瘀血后止后服；桃仁有小毒须捣碎入煎，孕妇及月经过多者禁用。', prohibitions: ['甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高', '桃仁有小毒，孕妇及月经过多者禁用'] },
    learning: {
      knowledge: '太阳蓄血证候特点：少腹急结或硬满、小便自利、其人如狂或发狂、脉沉涩，核心病机为太阳表邪入里化热、热与血搏结于下焦。治则治法为泻热逐瘀，代表方桃核承气汤（桃仁、大黄、桂枝、炙甘草、芒硝），即调胃承气汤加桃仁、桂枝。鉴别要点：与太阳蓄水证之别在于小便不利与小便自利；与阳明腑实证之别在于本证以少腹急结、神志如狂为主，而无腹满硬痛便秘之典型阳明腑实见症。',
      misjudgment: '表证未解即投桃核承气汤。错：条文明言「其外不解者，尚未可攻，当先解其外」，表未解而骤用攻瘀，易致表邪内陷；须先解表，表解后再行泻热逐瘀。',
      reasoning: '桃核承气汤以调胃承气汤为底加桃仁、桂枝，桂枝在方中起何作用？',
      feedback: '调胃承气汤泻热通便、桃仁活血逐瘀、桂枝辛温通经以助血行瘀散，使瘀热从下而解；此处桂枝非为解表，乃助活血通络之品。',
      transfer: '妇人瘀热互结之痛经、经闭，借用桃核承气汤时应如何调整剂量与配伍？',
    },
  },
  // ============================================================
  // 太阳误治变证 · 痞证与结胸（9–10）
  // ============================================================
  {
    id: 'pb12-q-009', title: '六经·心下痞证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['六经辨证', '心下痞', '半夏泻心汤', '辛开苦降'],
    intent: '掌握心下痞寒热错杂之病机与半夏泻心汤辛开苦降、和中消痞的运用。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '但满而不痛', canon: '《伤寒论》', originalText: '伤寒五六日，呕而发热者，柴胡汤证具，而以他药下之……若心下满而硬痛者，此为结胸也，大陷胸汤主之；但满而不痛者，此为痞，柴胡不中与之，宜半夏泻心汤。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '半夏泻心汤：半夏12g（洗）、黄芩、干姜、人参、炙甘草各9g、黄连3g、大枣12枚，去滓再煎，温服', caution: '半夏生品有毒须炮制，反乌头类（含附子）；本方偏于温补，湿热壅盛而中气不虚者不宜' },
    cases: null,
    stdJudgment: '痞证以心下痞满、按之不痛为特征，由误下伤中、寒热互结于中焦、气机痞塞所致。半夏泻心汤辛开苦降、寒热并用、补泻兼施，为治痞之代表方：半夏干姜辛温散结、芩连苦寒清热、参草枣补益中气。痞证与结胸之别，正在「满而不痛」与「心下痛按之石硬」，一属寒热错杂、一属热实内结。',
    coreDefinition: '痞证心下痞满、按之不痛，核心病机为寒热互结、气机痞塞，治以辛开苦降、和中消痞，半夏泻心汤主之。',
    safety: { note: '半夏生品有毒，须以法半夏、姜半夏等炮制品入煎，反乌头类（含附子）不可同用；本方去滓再煎使药性和合。', prohibitions: ['半夏生品有毒须炮制，反乌头类（含附子），孕妇慎用', '甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '痞证证候特点：心下痞满不痛、按之濡软、呕恶、肠鸣下利、舌苔腻而微黄，核心病机为伤寒误下伤中、寒热错杂互结于心下、中焦气机痞塞。治则治法为辛开苦降、和中消痞，代表方半夏泻心汤（半夏、黄芩、黄连、干姜、人参、炙甘草、大枣），半夏干姜辛开散寒、芩连苦降清热、参草枣补益中气。鉴别要点：与结胸之「心下硬满而痛」相比，痞证但满而不痛；与旋覆代赭汤证之「心下痞硬、噫气不除」相比，本证以呕、利、痞并见为特点。',
      misjudgment: '见心下痞满即用行气消导之品。错：本痞为寒热互结、中虚气滞，非食积气滞可比，纯用理气消导则中气更伤；须辛开苦降、寒热并调，半夏泻心汤类方方为的对。',
      reasoning: '半夏泻心汤寒热并用、辛开苦降，为何干姜配黄连、半夏配黄芩能愈心下痞？',
      feedback: '痞由寒热互结、升降失常：辛温之半夏干姜散寒开结，苦寒之芩连清热降逆，辛开苦降使寒热消、升降复、中气旺，痞满自除。',
      transfer: '慢性胃肠病见胃脘痞满、口苦、便溏者，如何移用半夏泻心汤之辛开苦降法？',
    },
  },
  {
    id: 'pb12-q-010', title: '六经·结胸证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['六经辨证', '结胸', '大陷胸汤', '甘遂', '逐水'],
    intent: '掌握结胸证水热互结之病机与大陷胸汤泻热逐水破结的运用。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '心下痛按之石硬', canon: '《伤寒论》', originalText: '伤寒六七日，结胸热实，脉沉而紧，心下痛，按之石硬者，大陷胸汤主之。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '大陷胸汤：大黄18g、芒硝12g（冲服）、甘遂1-1.5g（研末冲服），甘遂不入煎剂，得快利止后服', caution: '甘遂为峻下逐水之品，0.5-1.5g入丸散，反甘草，孕妇禁用；中病即止' },
    cases: null,
    stdJudgment: '结胸证由表邪内陷、水热互结于胸胁所致，证候特点为心下硬满而痛、拒按，甚则从心下至少腹硬满而痛不可近、脉沉紧，治以泻热逐水破结，大陷胸汤主之。方中甘遂峻逐水饮、大黄泻热、芒硝软坚，为峻下之剂。结胸与痞证同由误下而成，其别在痛与不痛：结胸痛而拒按、痞证满而不痛。',
    coreDefinition: '结胸证水热互结、胸脘硬痛，证见心下痛、按之石硬，治以泻热逐水破结，大陷胸汤主之。',
    safety: { note: '甘遂为峻下逐水之品，须研末冲服（0.5-1.5g），不入煎剂，反甘草，孕妇禁用，得快利后止后服，不可过用。', prohibitions: ['甘遂【高风险】0.5-1.5g入丸散，反甘草，孕妇禁用；峻下逐水，中病即止'] },
    learning: {
      knowledge: '结胸证候特点：心下硬满疼痛、拒按，甚则从心下至少腹硬满而痛不可近、脉沉紧，核心病机为太阳表证误下、邪热内陷与水饮互结于胸胁。治则治法为泻热逐水、破结开胸，代表方大陷胸汤（大黄、芒硝、甘遂），甘遂峻逐水饮、大黄泻热、芒硝软坚散结。鉴别要点：与痞证相比，结胸痛而拒按、痞证但满而不痛；与悬饮相比，结胸有表证误下之因、心下石硬而痛，悬饮则咳唾引痛、痛在胁下。',
      misjudgment: '见胸痛即按气滞血瘀论治。错：结胸为水热互结之实邪内聚，非气滞血瘀，行气活血不能解其结；须甘遂等峻逐水饮之品破结逐水，药轻则病重药轻、水热不去。',
      reasoning: '结胸与痞证同因误下而成，为何一用大陷胸汤峻下、一用半夏泻心汤和中，辨证眼目何在？',
      feedback: '眼目在痛与不痛、硬与软：心下痛而按之石硬为热实结胸，须大陷胸汤泻热逐水；但满而不痛、按之濡软为痞，须半夏泻心汤辛开苦降，虚实迥异、攻补悬殊。',
      transfer: '大陷胸汤与十枣汤皆用甘遂逐水，两方的病位与适应证有何区别？',
    },
  },
];
