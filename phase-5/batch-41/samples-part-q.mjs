// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part Q（Q 中医临床基础 10 节点 pb41-q-001 ~ pb41-q-010）
// 学科：Q 中医临床基础；覆盖：六经辨证（太阳中风/阳明经证/少阳/太阴/少阴/厥阴）+
//       温病（风温卫分/暑温气分/秋燥凉燥）+ 金匮（奔豚气病）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 用「六经·/温病·/金匮·证治」式
// facts sourceTitle 限定：《伤寒论》规划教材 / 《温病学》规划教材 / 《金匮要略》规划教材 / 《中医临床基础》规划教材
// classics 仅引用 classic-patch.mjs 已收录条文（伤寒/温病条辨/金匮），originalText 逐字核对
// 高危药红线按 authoring-spec 第 4 节表：附子/细辛/麻黄/半夏/甘草（麻黄细辛附子汤、乌梅丸、
//   小柴胡汤、理中丸、杏苏散、奔豚汤、桑菊饮、白虎汤）均已写入 prohibitions
// 难度分布：简单 3（001/003/004）/ 中等 3（002/007/008）/ 困难 2（005/006）/ 易混淆 1（009）/ 综合推理 1（010）
// ============================================================

export const PART_Q = [
  // ============================================================
  // Q 中医临床基础 · 六经辨证（001–006）
  // ============================================================
  {
    id: 'pb41-q-001', title: '六经·太阳中风桂枝汤证', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['六经辨证', '太阳中风', '桂枝汤', '调和营卫'],
    intent: '掌握太阳中风证的主症舌脉、卫强营弱病机与桂枝汤解肌祛风、调和营卫的证治要点。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '太阳之为病', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '太阳之为病，脉浮，头项强痛而恶寒。' },
      { label: '汗出恶风', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '太阳病，头痛发热，汗出恶风，桂枝汤主之。' },
    ],
    dosage: { guideline: '桂枝汤：桂枝9g、芍药9g、炙甘草6g、生姜9g、大枣12枚，水七升微火煮取三升，适寒温服一升，啜热稀粥并温覆取微汗，一剂分温三服。', caution: '服后须啜粥温覆助药力，不可令如水流漓；汗出表不解者不得再行峻汗；里热炽盛、温病初起恶寒轻者禁用本方。' },
    cases: null,
    stdJudgment: '太阳中风证以发热、汗出、恶风、脉浮缓为提纲之下的具体见证，病机为卫强营弱、营卫不和。风邪犯表、卫阳浮盛则发热，卫外不固则汗出恶风，故治以桂枝汤解肌祛风、调和营卫，啜粥温覆以助药力取微汗。',
    coreDefinition: '太阳中风证为风邪袭表、卫强营弱：发热汗出恶风脉浮缓，治以桂枝汤解肌祛风、调和营卫，取微汗而解。',
    safety: { note: '服桂枝汤须啜热稀粥并温覆助汗，以微汗为度，不可令如水流漓；汗后表不解者宜再服桂枝汤而非峻汗之剂。', prohibitions: [] },
    learning: {
      knowledge: '太阳中风证候特点：发热、汗出、恶风、头痛、脉浮缓，或见鼻鸣干呕。核心病机为卫强营弱：卫阳浮盛抗邪则发热，营阴失守则汗自出。治以解肌祛风、调和营卫，代表方桂枝汤（桂枝、芍药、炙甘草、生姜、大枣），服药后啜热稀粥、温覆取微汗。与太阳伤寒鉴别：有汗脉缓为中风表虚，无汗脉紧为伤寒表实。',
      misjudgment: '见恶寒发热即投麻黄汤峻汗。错：桂枝汤证汗出脉缓，营卫不和而腠理不密，麻黄汤发汗力峻，误投则汗出过多反伤卫阳，表虚者当以桂枝汤和之。',
      reasoning: '同为太阳表证，桂枝汤证为何「汗出」仍须解表，这与伤寒表实的无汗病机有何不同？',
      feedback: '中风之汗出是卫强营弱、腠理不固所致，解表旨在调和营卫而非开腠发汗；伤寒之无汗是卫阳被遏，须麻黄开腠。一和一峻，各从其证。',
      transfer: '产后自汗恶风、脉浮缓者，参考太阳中风思路可否用桂枝汤加味调和营卫？',
    },
  },
  {
    id: 'pb41-q-002', title: '六经·阳明经证白虎汤证', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['六经辨证', '阳明经证', '白虎汤', '辛寒清气'],
    intent: '掌握阳明经证壮热烦渴、汗大出、脉洪大的证候特点与白虎汤辛寒清气的证治。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '阳明之为病', canon: '辨阳明病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '阳明之为病，胃家实是也。' },
      { label: '三阳合病', canon: '辨阳明病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '三阳合病，腹满身重，难以转侧，口不仁面垢，谵语遗尿。发汗则谵语，下之则额上生汗，手足逆冷。若自汗出者，白虎汤主之。' },
    ],
    dosage: { guideline: '白虎汤：生石膏30~60g（打碎先煎）、知母9~15g、炙甘草6g、粳米15~30g，水煎温服，日1剂分2~3次。', caution: '须大热、大渴、大汗、脉洪大四证俱备；表证未解、无汗恶寒、脉浮细无力或脉沉者禁用；石膏打碎先煎，脾胃虚寒者慎用。' },
    cases: null,
    stdJudgment: '阳明经证为无形邪热弥漫、充斥内外：壮热面赤、大汗出、大烦渴引饮、脉洪大。热炽胃中、津液被灼，法取辛寒清气、清热生津，白虎汤以石膏为君清阳明之热、知母滋阴润燥，粳米甘草护胃，四证俱备方可投之。',
    coreDefinition: '阳明经证（白虎汤证）：壮热、大汗、大渴、脉洪大四大证，热炽津伤，治以白虎汤辛寒清气、清热生津。',
    safety: { note: '白虎汤为大热大渴大汗脉洪大四证而设，表证未解或无汗恶寒者禁用；石膏打碎先煎，虚寒者勿投。', prohibitions: ['白虎汤须大热、大渴、大汗、脉洪大四证俱备；表证未解或无汗恶寒、脉浮细无力者禁用', '生石膏大寒，脾胃虚寒、大便溏泄者慎用；须打碎先煎'] },
    learning: {
      knowledge: '阳明经证证候特点：身大热、不恶寒反恶热、汗大出、大烦渴引饮、面赤气粗、脉洪大有力，舌红苔黄燥。核心病机为胃热炽盛、弥漫内外、津气两伤。治以辛寒清气、清热生津，代表方白虎汤（生石膏、知母、炙甘草、粳米），热伤气津者加人参成白虎加人参汤。与阳明腑实证鉴别：经证为无形之热、腹无所苦，腑证为有形燥结、腹满硬痛拒按。',
      misjudgment: '热证初起恶寒未罢即投白虎汤。错：表证未解则当先解表，白虎大寒冰伏邪气、闭其外达之路，须大热不恶寒、四大证俱备方可与之。',
      reasoning: '阳明经证与腑证同属胃家实，为何经证用白虎汤辛寒清气，腑证却须承气汤苦寒攻下？',
      feedback: '经证邪热未与糟粕相结、弥漫气分，清之即解；腑证热与燥屎互结、腹满硬痛，非攻下不能下之。有形无形之别决定清与下之异。',
      transfer: '温病气分大热，若患者素体脾虚便溏，白虎汤应如何加减变通？',
    },
  },
  {
    id: 'pb41-q-003', title: '六经·少阳小柴胡汤证', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['六经辨证', '少阳病', '小柴胡汤', '和解枢机'],
    intent: '掌握少阳病提纲与小柴胡汤证的往来寒热、胸胁苦满等主症及和解少阳的证治。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.煎服法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '少阳之为病', canon: '辨少阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '少阳之为病，口苦，咽干，目眩也。' },
      { label: '往来寒热', canon: '辨少阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '伤寒五六日中风，往来寒热，胸胁苦满，嘿嘿不欲饮食，心烦喜呕，或胸中烦而不呕，或渴，或腹中痛，或胁下痞硬，或心下悸、小便不利，或不渴、身有微热，或咳者，小柴胡汤主之。' },
    ],
    dosage: { guideline: '小柴胡汤：柴胡12~24g、黄芩9g、人参9g、半夏9g、炙甘草9g、生姜9g、大枣4枚，水煎去滓再煎，温服，日1剂分3次。', caution: '去滓再煎以和枢机；半夏用炮制品、反乌头类；人参反藜芦；柴胡劫肝阴，阴虚阳亢者慎用。' },
    cases: null,
    stdJudgment: '少阳病以口苦、咽干、目眩为提纲，小柴胡汤证见往来寒热、胸胁苦满、嘿嘿不欲饮食、心烦喜呕。邪犯少阳、枢机不利，正邪分争于半表半里，法取和解少阳、调达枢机，小柴胡汤柴胡黄芩疏透清解、参枣扶正，去滓再煎使药性和缓。',
    coreDefinition: '少阳病提纲口苦咽干目眩，小柴胡汤证主症往来寒热、胸胁苦满、嘿嘿不欲饮食、心烦喜呕，治以和解少阳、调达枢机。',
    safety: { note: '小柴胡汤须去滓再煎以和枢机；半夏用炮制品，人参反藜芦；柴胡劫肝阴，阴虚火旺者慎用。', prohibitions: ['小柴胡汤含半夏，生品有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '少阳病证候特点：口苦、咽干、目眩为提纲，主症往来寒热、胸胁苦满、默默不欲饮食、心烦喜呕、脉弦。核心病机为邪犯少阳、枢机不利、正邪分争。治以和解少阳、调达枢机，代表方小柴胡汤（柴胡、黄芩、人参、半夏、炙甘草、生姜、大枣），须去滓再煎。与太阳病鉴别：太阳发热恶寒同见，少阳寒热往来交替；太阳脉浮、少阳脉弦。',
      misjudgment: '少阳证发热误作太阳表证而发汗，或误作阳明里实而攻下。错：少阳居半表半里，汗之则津伤助热、下之则邪陷里虚，惟和解一法最宜，误汗误下皆犯禁。',
      reasoning: '小柴胡汤中人参并非补虚之设，为何少阳证用参反能助枢机运转？',
      feedback: '少阳之邪正分争，参枣扶助正气使正胜邪却，枢机得转则邪自外解，扶正即所以和邪。',
      transfer: '感冒后寒热往来、口苦胁满持续不退者，试按少阳枢机不利分析立法用方。',
    },
  },
  {
    id: 'pb41-q-004', title: '六经·太阴理中汤证', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['六经辨证', '太阴病', '理中汤', '温中散寒'],
    intent: '掌握太阴病提纲与腹满时痛、自利不渴等证候，理解理中汤温中祛寒、补气健脾的证治。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '太阴之为病', canon: '辨太阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '太阴之为病，腹满而吐，食不下，自利益甚，时腹自痛。若下之，必胸下结硬。' },
      { label: '自利不渴', canon: '辨太阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '自利不渴者，属太阴，以其脏有寒故也，当温之，宜服四逆辈。' },
    ],
    dosage: { guideline: '理中丸（汤）：人参9g、干姜9g、白术9g、炙甘草9g，蜜丸每服9g日2~3次，或作汤剂煎服；服后腹中未热者，可渐增至四丸。', caution: '甘草反海藻大戟甘遂芫花，大剂量久服致水肿血压升高；干姜辛热，阴虚火旺、血热吐衄者忌用。' },
    cases: null,
    stdJudgment: '太阴病以腹满而吐、食不下、自利益甚、时腹自痛为提纲，属脾阳虚弱、寒湿内停。自利不渴者其脏有寒，法当温中祛寒、补气健脾，理中汤干姜温中散寒为君，人参白术炙甘草补气健脾，寒去阳复则吐利自止。',
    coreDefinition: '太阴病提纲为腹满而吐、食不下、自利益甚、时腹自痛；自利不渴属脏有寒，治以理中汤温中祛寒、补气健脾。',
    safety: { note: '理中汤为温中之剂，阴虚火旺、湿热泄利者禁用；甘草反海藻大戟甘遂芫花；丸服以腹中热为度。', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '太阴病证候特点：腹满而吐、食不下、自利（下利清稀不臭）、时腹自痛、喜温喜按，舌淡苔白、脉迟缓弱。核心病机为脾阳虚弱、寒湿内盛、运化失职。治以温中祛寒、补气健脾，代表方理中汤（人参、干姜、白术、炙甘草），吐甚加半夏生姜，腹满加厚朴陈皮。与少阴病鉴别：太阴下利不渴、病在脾，少阴下利清谷、病及肾阳。',
      misjudgment: '太阴下利兼见发热即断为太阳表证而发汗。错：太阴脏寒下利属里虚寒，误汗更伤脾阳、利必不止；表里同病者亦当先温其里，四逆辈温之。',
      reasoning: '同为下利，太阳阳明合病之利与太阴自利，为何一主葛根汤一主理中汤？',
      feedback: '合病下利因表邪内迫、病偏实，解表则利止；太阴自利因脏寒脾虚、病属虚寒，须温中补虚，攻补之别全在虚实。',
      transfer: '慢性腹泻、腹冷喜按、食少便溏者，试按太阴脏寒分析可否用理中汤化裁。',
    },
  },
  {
    id: 'pb41-q-005', title: '六经·少阴麻黄细辛附子汤证', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['六经辨证', '少阴病', '麻黄细辛附子汤', '温经解表', '附子', '细辛'],
    intent: '掌握少阴病提纲与太少两感证（发热脉沉）的证治，理解麻黄细辛附子汤温经解表的配伍。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '少阴之为病', canon: '辨少阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '少阴之为病，脉微细，但欲寐也。' },
    ],
    dosage: { guideline: '麻黄细辛附子汤：麻黄6g（先煎去上沫）、细辛3g、制附子9~12g（先煎久煎），水煎温服，微发其汗。', caution: '附子须炮制先煎0.5~1小时至无麻辣感；细辛煎剂1-3g、散剂0.5-1g；麻黄发汗力强，虚人、高血压心脏病失眠者慎用；素体阳虚者以微微得汗为度。' },
    cases: null,
    stdJudgment: '少阴病提纲为脉微细、但欲寐，属心肾阳虚。麻黄细辛附子汤证乃少阴阳虚复感外寒，见发热而脉沉，表里同病。法取温经解表：麻黄发太阳之汗、附子温少阴之阳、细辛联络表里，温阳与散寒并行，微发其汗则太少两感得解。',
    coreDefinition: '麻黄细辛附子汤证为少阴阳虚外感寒邪：发热脉沉、神疲欲寐，治以温经解表，麻黄附子细辛三味微发其汗。',
    safety: { note: '本方为阳虚外感而设，须微发其汗，不可峻汗；附子先煎久煎、细辛限量、麻黄减量，三者红线并存。', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '【高风险】细辛煎剂1-3g散剂0.5-1g，过量可致中毒；反藜芦', '麻黄发汗力强，虚人及高血压、心脏病、失眠者慎用，运动员禁用'] },
    learning: {
      knowledge: '少阴病提纲：脉微细、但欲寐。麻黄细辛附子汤证（太少两感）证候特点：发热（反发热）、脉沉、神疲乏力、畏寒肢冷、欲寐，无少阴纯阳虚之厥逆下利。核心病机为少阴阳虚复感外寒、表里同病。治以温经解表，代表方麻黄细辛附子汤（麻黄、细辛、制附子），麻黄6g先煎去上沫、细辛3g、制附子9~12g先煎久煎，微发其汗。与桂枝汤证鉴别：桂枝汤证脉浮缓、纯表证，本证脉沉而兼阳虚。',
      misjudgment: '见发热脉沉即按纯表证投麻黄汤峻汗。错：脉沉示少阴阳虚于里，峻汗则阳随汗脱，惟麻黄细辛附子汤温阳解表、微汗乃可，阳虚甚者当先温里。',
      reasoning: '麻黄细辛附子汤中麻黄仅发太阳之表，附子温少阴之里，两药用量孰轻孰重才合「微发其汗」之旨？',
      feedback: '表里同病以里虚为本，麻黄宜轻取6g左右，附子须足量先煎久煎温肾固阳，细辛为枢，使汗出而阳不亡。',
      transfer: '老人冬季感冒、发热不扬、脉沉欲寐者，试分析太少两感的立法要点与附子煎法。',
    },
  },
  {
    id: 'pb41-q-006', title: '六经·厥阴乌梅丸证', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['六经辨证', '厥阴病', '乌梅丸', '蛔厥', '寒热错杂', '附子', '细辛'],
    intent: '掌握厥阴病提纲与蛔厥证候，理解乌梅丸寒热并用、安蛔止痛的组方要义。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '厥阴之为病', canon: '辨厥阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '厥阴之为病，消渴，气上撞心，心中疼热，饥而不欲食，食则吐蛔，下之利不止。' },
      { label: '阴阳气不相顺接', canon: '辨厥阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '凡厥者，阴阳气不相顺接，便为厥。厥者，手足逆冷者是也。' },
      { label: '蛔厥者乌梅丸主之', canon: '辨厥阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '伤寒脉微而厥，至七八日肤冷，其人躁无暂安时者，此为脏厥，非蛔厥也。蛔厥者，其人当吐蛔。令病者静，而复时烦者，此为脏寒，蛔上入其膈，故烦，须臾复止，得食而呕，又烦者，蛔闻食臭出，其人常自吐蛔。蛔厥者，乌梅丸主之。又主久利。' },
    ],
    dosage: { guideline: '乌梅丸：乌梅15~30g（醋浸）、细辛3g、干姜6~9g、黄连6g、黄柏6g、当归9g、制附子6~9g（先煎久煎）、蜀椒6g、桂枝9g、人参9g，蜜丸每服9g，或作汤剂煎服。', caution: '附子须炮制先煎久煎；细辛煎剂1-3g；蜀椒辛热有小毒，孕妇慎用；蛔厥发作期不宜急用苦寒攻下。' },
    cases: null,
    stdJudgment: '厥阴病提纲见消渴、气上撞心、心中疼热、饥而不欲食、食则吐蛔，属上热下寒、寒热错杂。蛔厥因脏寒蛔上入膈，故静而复时烦、得食而呕。乌梅丸酸以安蛔、苦以下蛔、辛以温脏，寒热并用、安蛔止痛，并主久利，为厥阴病寒热错杂证之主方。',
    coreDefinition: '乌梅丸证属厥阴寒热错杂：消渴、气上撞心、心中疼热、饥不欲食、食则吐蛔，蛔厥以静而复烦为辨，乌梅丸寒热并用、安蛔止痛。',
    safety: { note: '乌梅丸含附子、细辛、蜀椒等辛热之品，附子先煎久煎、细辛限量，孕妇慎用；蛔厥发作忌峻下。', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '【高风险】细辛煎剂1-3g散剂0.5-1g，过量可致中毒；反藜芦'] },
    learning: {
      knowledge: '厥阴病提纲：消渴、气上撞心、心中疼热、饥而不欲食、食则吐蛔。乌梅丸证候特点：腹痛阵作、呕吐蛔虫、手足厥冷、静而复时烦、得食更甚，脉微。核心病机为寒热错杂、蛔动上扰。治以温脏安蛔、寒热并用，代表方乌梅丸（乌梅、细辛、干姜、黄连、黄柏、当归、附子、蜀椒、桂枝、人参），乌梅酸收安蛔、连柏苦寒下蛔、姜附椒桂辛热温脏。与脏厥鉴别：脏厥肢冷肤冷、躁无暂安时，蛔厥时静时烦、可吐蛔。',
      misjudgment: '见手足厥冷即按阳虚投四逆汤。错：蛔厥属寒热错杂而非纯阳虚，须乌梅丸寒热并用；若误用纯温之剂，蛔闻辛热更扰，厥逆反甚。',
      reasoning: '乌梅丸中黄连黄柏之苦与附子干姜之辛同用，寒热截然相反，为何能共安蛔止痛？',
      feedback: '蛔得酸则静、得苦则下、得辛则伏，寒热并用正合蛔虫特性与寒热错杂病机，使脏温蛔安、厥逆自回。',
      transfer: '久利下痢日久、寒热错杂者，试按乌梅丸「又主久利」的思路分析其治利之理。',
    },
  },
  // ============================================================
  // Q 中医临床基础 · 温病（007–009）与金匮（010）
  // ============================================================
  {
    id: 'pb41-q-007', title: '温病·风温肺卫桑菊饮证', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['温病', '卫分证', '桑菊饮', '辛凉轻剂'],
    intent: '掌握风温初起邪袭肺卫的轻证证候与桑菊饮疏风清热、宣肺止咳的证治。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.煎服法', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '辛凉轻剂桑菊饮主之', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '太阴风温，但咳，身不甚热，微渴者，辛凉轻剂桑菊饮主之。' },
      { label: '凡病温者始于上焦', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '凡病温者，始于上焦，在手太阴。' },
    ],
    dosage: { guideline: '桑菊饮：桑叶7.5g、菊花3g、杏仁6g、连翘5g、薄荷2.5g（后下）、桔梗6g、生甘草2.5g、苇根6g，水煎香气大出即取服，勿过煮。', caution: '本方为辛凉轻剂，风热初起轻证用之；薄荷后下、勿久煎；甘草反海藻大戟甘遂芫花；表寒重或里热盛者非本方所宜。' },
    cases: null,
    stdJudgment: '桑菊饮为辛凉轻剂，主治风温初起邪袭肺卫之轻证：但咳、身热不甚、口微渴。病位在手太阴肺，治以疏风清热、宣肺止咳，桑叶菊花轻清上焦、杏仁桔梗宣肺利咽，薄荷苇根透邪生津，邪浅病轻，故剂轻而药简。',
    coreDefinition: '桑菊饮证为风温初起卫分轻证：但咳、身热不甚、口微渴，病机为邪袭肺卫、肺失宣降，治以疏风清热、宣肺止咳。',
    safety: { note: '煎法以香气大出即取服为要，勿过煮伤辛凉之性；薄荷后下；风热轻证勿过用辛散。', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '风温肺卫证候特点：发热、微恶风寒、头痛、咳嗽、口微渴，舌边尖红、苔薄白或薄黄、脉浮数。桑菊饮证为其中之轻证：但咳、身不甚热、微渴。核心病机为风热袭肺、肺失宣降。治以疏风清热、宣肺止咳，代表方桑菊饮（桑叶、菊花、杏仁、连翘、薄荷、桔梗、生甘草、苇根），咳重加杏仁浙贝，渴甚加天花粉，热盛加石膏知母。与银翘散证鉴别：银翘散证热重渴甚咽痛，桑菊饮证咳重热轻。',
      misjudgment: '风温初起恶寒明显者亦投桑菊饮。错：桑菊饮辛凉轻透，恶寒重者邪郁未化热，当用银翘散或荆防之类；邪浅之证过用辛散反耗肺气。',
      reasoning: '同为辛凉解表，银翘散称平剂而桑菊饮称轻剂，剂量与药味的轻重差异何在？',
      feedback: '银翘散银花连翘重用、兼解毒利咽，药力较峻；桑菊饮桑菊轻清、重在宣肺止咳，量小剂轻，正合「轻可去实」之旨。',
      transfer: '感冒后咳嗽迁延、身热不高、咽微痒者，试按肺卫余邪分析桑菊饮的化裁方向。',
    },
  },
  {
    id: 'pb41-q-008', title: '温病·暑温气分证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['温病', '暑温', '气分证', '白虎汤', '清暑益气'],
    intent: '掌握暑温气分证（暑入阳明、暑伤津气）的证候与白虎汤、王氏清暑益气汤的证治。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '辛凉重剂白虎汤主之', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '太阴温病，脉浮洪，舌黄，渴甚，大汗，面赤，恶热者，辛凉重剂白虎汤主之。' },
      { label: '温病者', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '温病者：有风温，有温热，有温疫，有温毒，有暑温，有湿温，有秋燥，有冬温，有温疟。' },
    ],
    dosage: { guideline: '暑入阳明用白虎汤（生石膏30~60g打碎先煎、知母9~15g、炙甘草6g、粳米15~30g），津气大伤加人参成白虎加人参汤；暑伤津气用王氏清暑益气汤（西洋参、石斛、麦冬、黄连、竹叶、荷梗、知母、甘草、粳米、西瓜翠衣）。', caution: '白虎汤须四大证俱备，表证未解者禁用；清暑益气汤含黄连苦寒宜轻用；暑兼湿邪者忌纯辛寒甘润，须辨湿之轻重。' },
    cases: null,
    stdJudgment: '暑温发于夏至以后，气分证最为常见：暑入阳明见壮热烦渴、大汗面赤、脉洪大，治以白虎汤辛寒清气；暑伤津气见身热汗多、口渴神疲、脉虚无力，治以王氏清暑益气汤清暑益气、养阴生津。暑为阳邪，气分总以清热保津为要。',
    coreDefinition: '暑温气分证分两型：暑入阳明（壮热大汗烦渴脉洪大）白虎汤清暑泄热，暑伤津气（身热汗多口渴神疲脉虚）清暑益气汤清暑养阴。',
    safety: { note: '暑温气分忌辛温发汗与滋腻留邪；白虎汤四证俱备用之，清暑益气汤黄连轻用；暑湿相兼者当辨湿重热重而施治。', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '白虎汤须大热大渴大汗脉洪大四证俱备，表证未解或无汗恶寒者禁用'] },
    learning: {
      knowledge: '暑温气分证候特点：暑入阳明为壮热汗大出、口渴引饮、面赤气粗、脉洪大，舌苔黄燥；暑伤津气为身热汗多、口渴少气、精神疲惫、脉虚无力。核心病机为暑热炽盛气分、津气被灼。治以清热保津：白虎汤（石膏、知母、甘草、粳米）辛寒清气，津气伤者加人参；王氏清暑益气汤（西洋参、石斛、麦冬、黄连、竹叶、荷梗、知母、甘草、粳米、西瓜翠衣）清暑益气养阴。与湿温鉴别：暑温汗出热不因湿，湿温身热不扬、脘痞苔腻。',
      misjudgment: '暑温汗出过多即投补气敛汗之品。错：暑热未清而骤补，则闭门留寇、热势复炽；当先清暑泄热保津，津气伤而热已减者方用清暑益气。',
      reasoning: '同属气分暑热，为何白虎汤证重清热而清暑益气汤证重养津？',
      feedback: '白虎汤证邪热方炽、津伤未甚，清之即解；清暑益气汤证热势已缓而津气大伤，须益气养阴为主、清热为辅，主次随正邪消长而移。',
      transfer: '盛夏劳力者壮热大汗昏仆、脉洪大，试按暑入阳明分析急救处方思路。',
    },
  },
  {
    id: 'pb41-q-009', title: '温病·秋燥凉燥证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['温病', '秋燥', '凉燥', '杏苏散', '温燥鉴别'],
    intent: '掌握凉燥证候特点与杏苏散轻宣温润的证治，辨析凉燥与温燥的鉴别要点。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '燥伤本脏', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '燥伤本脏，头微痛，恶寒，咳嗽稀痰，鼻塞，嗌塞，脉弦，无汗，杏苏散主之。' },
    ],
    dosage: { guideline: '杏苏散：苏叶9g、半夏9g、茯苓9g、前胡9g、苦桔梗9g、枳壳6g、甘草3g、生姜3片、橘皮6g、杏仁9g、大枣3枚，水煎温服，日1剂分2~3次。', caution: '半夏用炮制品、反乌头类；本方为凉燥而设，温燥（发热口渴咽干痰少）者忌用；甘草反海藻大戟甘遂芫花。' },
    cases: null,
    stdJudgment: '凉燥发于深秋，燥凉束肺：头微痛、恶寒、无汗、咳嗽稀痰、鼻塞咽干、脉弦。治以轻宣温润、宣肺化痰，杏苏散苏叶杏仁宣肺润燥、半夏茯苓前胡化痰止咳，温而不燥、润而不腻，与温燥之桑杏汤辛凉甘润截然有别。',
    coreDefinition: '凉燥证为深秋燥凉犯肺：恶寒无汗、头微痛、咳嗽稀痰、鼻塞咽干，治以杏苏散轻宣温润、宣肺化痰。',
    safety: { note: '凉燥忌辛凉甘润之剂，温燥忌温燥之方，辨证先分寒热；半夏炮制品入药，孕妇慎用。', prohibitions: ['杏苏散含半夏，生品有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '凉燥证候特点：恶寒重、发热轻、头痛无汗、鼻塞、咳嗽稀痰、咽干唇燥、苔薄白而干、脉浮弦。核心病机为燥凉束肺、肺失宣降。治以轻宣温润，代表方杏苏散（苏叶、杏仁、半夏、茯苓、前胡、桔梗、枳壳、甘草、生姜、橘皮、大枣）。与温燥鉴别：温燥发热较著、口渴咽干、干咳少痰、舌红苔薄黄、脉浮数，主桑杏汤；凉燥恶寒无汗、痰稀苔白、脉浮弦，主杏苏散，一凉一温不可互投。',
      misjudgment: '见秋燥咳嗽即投桑杏汤等辛凉润燥剂。错：凉燥恶寒无汗、痰稀苔白，须杏苏散温润宣散；若误投桑杏凉润，则凉遏愈甚、邪郁难解。',
      reasoning: '同是秋燥犯肺，为何温燥用桑杏汤而凉燥用杏苏散，一凉一温的立法依据是什么？',
      feedback: '温燥为燥热伤津，须辛凉甘润；凉燥为燥凉束表，须轻宣温润，寒热属性不同，用药温凉随之迥异。',
      transfer: '深秋外感、恶寒鼻塞、咳嗽痰稀者，试按凉燥辨证拟定治则与主方。',
    },
  },
  {
    id: 'pb41-q-010', title: '金匮·奔豚气病证治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['金匮', '奔豚气病', '桂枝加桂汤', '奔豚汤'],
    intent: '掌握奔豚气病气从少腹上冲咽喉的证候特点与桂枝加桂汤、奔豚汤的证治鉴别。',
    facts: [
      { field: 'clinical.证候特点', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
      { field: 'clinical.核心病机', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
      { field: 'clinical.治则治法', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
      { field: 'clinical.代表方', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '奔豚气病脉证治第八', originalText: '奔豚病，从少腹起，上冲咽喉，发作欲死，复还止，皆从惊恐得之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '奔豚气病脉证治第八', originalText: '奔豚气上冲胸，腹痛，往来寒热，奔豚汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '桂枝加桂汤：桂枝15g（重用）、芍药9g、炙甘草6g、生姜9g、大枣12枚，水煎温服；奔豚汤：甘草6g、川芎6g、当归6g、半夏12g、黄芩6g、生葛根15g、芍药6g、生姜12g、甘李根白皮12g，水煎温服。', caution: '桂枝加桂汤重用桂枝须遵原旨，平冲降逆、中病即止；奔豚汤含半夏须炮制；奔豚发作多由惊恐情志诱发，须兼调神志。' },
    cases: null,
    stdJudgment: '奔豚气病以气从少腹上冲咽喉、发作欲死、复还止为特征，皆从惊恐得之。治分两端：阳虚寒水之气上冲者，桂枝加桂汤重用桂枝温阳平冲；肝气郁结化热上冲者，奔豚汤养血平肝、和胃降逆。同病异治，皆以镇逆降冲为要。',
    coreDefinition: '奔豚气病为气从少腹上冲咽喉、发作欲死复还止之冲气病，多因惊恐而发；桂枝加桂汤温阳平冲，奔豚汤养血平肝降逆。',
    safety: { note: '奔豚发作宜静卧调神，避免惊恐刺激；桂枝加桂汤重用桂枝，阴虚火旺者忌；奔豚汤含半夏须炮制入药。', prohibitions: ['奔豚汤含半夏，生品有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '奔豚气病证候特点：气从少腹上冲胸咽、发作时痛苦欲死、冲气平息后复如常人，发作与情志惊恐密切相关。核心病机为冲气上逆：阳虚寒水上冲者兼见腹痛畏寒、舌淡苔白，肝郁化热上冲者兼见往来寒热、腹痛。治法：前者温阳平冲，主桂枝加桂汤（重用桂枝五两平冲降逆）；后者养血平肝、和胃降逆，主奔豚汤（甘草、川芎、当归、半夏、黄芩、生葛根、芍药、生姜、甘李根白皮）。鉴别要点在寒热虚实之偏。',
      misjudgment: '凡奔豚即按肾气上冲投桂枝加桂汤。错：奔豚汤证多肝郁化热、兼往来寒热，须养血平肝降逆；桂枝加桂汤证偏阳虚寒水，若误投于肝热者则温药助火、冲气更剧。',
      reasoning: '同为奔豚上冲，为何一用桂枝加桂汤温阳、一用奔豚汤清热，病机取舍的关键何在？',
      feedback: '阳虚者冲气因寒水上逆，温阳即可镇冲；肝热者冲气因郁火上炎，须清肝养血以降逆。寒热之别定温清之治。',
      transfer: '患者每因恼怒即觉气从小腹上冲胸咽、胸胁胀满者，试按奔豚气病分析其病机与选方。',
    },
  },
];
