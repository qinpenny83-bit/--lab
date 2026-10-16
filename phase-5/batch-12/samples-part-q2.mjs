// ============================================================
// 杏林大典 · Phase 5 · Batch-12 · 样本 Part Q2（Q 中医临床基础 10 节点 pb12-q-011 ~ pb12-q-020）
// 学科：Q 中医临床基础；覆盖：六经传变（循经传/越经传）· 合病并病 ·
//       温病卫气营血辨证总纲 · 卫分证治（银翘散桑菊饮）· 气分证治（白虎汤承气汤）·
//       营分证治（清营汤）· 血分证治（犀角地黄汤）· 三焦辨证 · 湿热病证（三仁汤）·
//       余热未清与阴伤（竹叶石膏汤）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// 规范：Q 规范（authoring-spec 第 10 节）；facts 4-6 条，sourceTitle 仅
//       《温病学》规划教材 /《伤寒论》规划教材 /《中医临床基础》规划教材
// classics 条文短语标签：均已核对原文，classic-patch.mjs 未收录者
//       在交付说明中列出，由主代理统一补录（本文件不改补丁文件）
// 安全：白虎/承气（生石膏先煎、大黄孕妇禁用）、清营/犀角地黄（水牛角代犀角先煎）、
//       三仁汤（半夏/滑石）、竹叶石膏汤（半夏/石膏）均落实服法警戒与红线
// ============================================================

export const SAMPLES_PART_Q2 = [
  // ============================================================
  // Q 中医临床基础 · 六经辨证（011-012）
  // ============================================================
  {
    id: 'pb12-q-011', title: '六经传变·循经传与越经传', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['六经辨证', '循经传', '越经传', '传变'],
    intent: '掌握六经病邪传变的两种基本方式（循经传、越经传）及传与不传的脉证判别。',
    facts: [
      { field: '临床.传变概念', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.循经传', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.越经传', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.表里传与直中', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.传变判别', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '伤寒一日太阳受之', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '伤寒一日，太阳受之。脉若静者，为不传；颇欲吐，若躁烦，脉数急者，为传也' },
      { label: '行其经尽', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '太阳病，头痛至七日以上自愈者，以行其经尽故也；若欲作再经者，针足阳明，使经不传则愈' },
    ],
    dosage: { guideline: '六经传变属辨证规律，不设专方剂量；循经传按所入之经辨证处方（如传阳明用白虎汤、传少阳用小柴胡汤），越经传按现证立法', caution: '传与不传以脉证为凭：脉静为不传，脉数急、躁烦为欲传；误汗误下可促邪内传，不得见某证便机械推定传经日数' },
    cases: null,
    stdJudgment: '六经传变是病邪在六经之间的移行：循经传按太阳、阳明、少阳、太阴、少阴、厥阴之序相传，越经传则不循次第隔经而传，传与不传取决于邪正对比，以脉证为据而非拘泥日数。',
    coreDefinition: '循经传：邪气按六经固有顺序依次相传，如太阳传阳明；越经传：邪气不循次第、跳越一经或数经而传，如太阳直传少阳或直中少阴；传变与否取决于正气强弱与病邪轻重，脉证是判别依据。',
    safety: { note: '本节点为辨证规律知识，不设具体方药剂量；临证以现证为凭，不可拘执传经日数而妄投方药，误汗误下均可促邪内传。', prohibitions: [] },
    learning: {
      knowledge: '六经传变指外感病过程中病邪在六经间的传移。循经传：按太阳→阳明→少阳→太阴→少阴→厥阴之序相传，如太阳病失治化热传入阳明，见身热汗出、不恶寒反恶热、脉大。越经传：不循次第、隔经而传，如太阳直传少阳、太阳直传少阴；另有表里传（太阳传少阴、阳明传太阴）与直中（外邪不经三阳直犯三阴，如少阴直中）。传与不传的判别以脉证为准：《伤寒论》「脉若静者为不传，颇欲吐、若躁烦、脉数急者为传」；「头痛至七日以上自愈者，以行其经尽故也」。',
      misjudgment: '按患病日数推算传经。错：传与不传取决于脉证而非日数，「伤寒一日，太阳受之」言发病层次，非定时传经；同处一日有传与不传之别，拘泥日数必致误治。',
      reasoning: '同为太阳病，为何有循经传阳明与越经传少阳之别，判别关键是什么？',
      feedback: '传变途径取决于邪正对比与体质差异：阳明热化则循经传阳明，少阳枢机不利则越经传少阳；脉数急、躁烦、呕、渴等脉证是判别传变的眼目。',
      transfer: '麻疹初起发热咳嗽，忽见神昏抽搐，属温病何种传变方式？',
    },
  },
  {
    id: 'pb12-q-012', title: '六经辨证·合病与并病', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['六经辨证', '合病', '并病'],
    intent: '掌握合病与并病的定义、证治及先表后里的治序原则。',
    facts: [
      { field: '临床.合病定义', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.并病定义', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.太阳阳明合病证治', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.三阳合病证治', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.合病并病鉴别', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '太阳与阳明合病', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '太阳与阳明合病者，必自下利，葛根汤主之' },
      { label: '三阳合病', canon: '辨阳明病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '三阳合病，腹满身重，难以转侧，口不仁，面垢，谵语，遗尿' },
    ],
    dosage: { guideline: '合病并病不设专方：太阳阳明合病下利用葛根汤（葛根、麻黄、桂枝、芍药、生姜、大枣、甘草）；三阳合病偏热者用白虎汤；并病表解后阳明腑实者用大承气汤', caution: '合病并病以现证为序：太阳证不罢者先解表，表解而后攻里；误下易致邪陷，下利不止者当急温里' },
    cases: null,
    stdJudgment: '合病是两经或三经同时受邪发病，并病是一经病证未罢又见他经病证；治疗重在把握主证先后，表证未罢先解表、里实已急先救里，误治则生变证。',
    coreDefinition: '合病：两经或三经之邪同时为病，如太阳阳明合病、太阳少阳合病、三阳合病；并病：一经病未罢又传他经，两经证候先后并见，如二阳并病；二者皆属表里同病，治分先后缓急。',
    safety: { note: '本节点辨证概念为主，涉及方药时按各专项警戒：葛根汤含麻黄发汗力强，虚人慎用；并病下之之承气汤含大黄芒硝峻下，须中病即止。', prohibitions: ['葛根汤含麻黄，发汗力强，体虚多汗者慎用', '大承气汤含大黄、芒硝，峻下攻伐，孕妇禁用，中病即止'] },
    learning: {
      knowledge: '合病指两经或三经同时受邪而发病，起病即见两经或三经证候，如太阳阳明合病、太阳少阳合病、三阳合病；并病指一经病证未罢又传一经，两经证候先后并见，如二阳并病。太阳阳明合病者必自下利，主以葛根汤解肌发表、升清止利（表解里自和，即逆流挽舟）；三阳合病腹满身重、口不仁面垢、谵语遗尿，偏于热盛者用白虎汤清解。治序总则：表证未罢先解表，里实已急先攻里；并病太阳证不罢者不可下，下之为逆。',
      misjudgment: '把合病与并病混为一谈。错：合病是两经同时受邪、发病即见两经证候；并病是一经未罢、后传一经，证候先后出现；并病有先后之序、先表后里，合病则须兼顾表里而分主次。',
      reasoning: '太阳阳明合病下利，为何主以葛根汤解表而不专事止利？',
      feedback: '下利由太阳表邪内迫阳明所致，表解则里自和；葛根升清止利兼解肌发表，邪从表出、清阳上达，下利自止，故云逆流挽舟。',
      transfer: '太阳病发汗后热不退，反见腹满便秘、潮热谵语，属合病还是并病？',
    },
  },
  // ============================================================
  // Q 中医临床基础 · 温病卫气营血辨证（013-017）
  // ============================================================
  {
    id: 'pb12-q-013', title: '温病·卫气营血辨证总纲', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['温病', '卫气营血', '辨证总纲'],
    intent: '掌握卫气营血辨证四个层次的内涵、传变规律及相应治法纲领。',
    facts: [
      { field: '临床.卫气营血概念', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.卫分证特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.气分证特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.营血分证特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.传变规律', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.治法纲领', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '卫之后方言气', canon: '温热论', chapter: '', sourceTitle: '《温热论》', sourceType: 'classic_original', status: 'verified', originalText: '卫之后方言气，营之后方言血。在卫汗之可也，到气才可清气，入营犹可透热转气，如犀角、玄参、羚羊角等物，入血就恐耗血动血，直须凉血散血' },
    ],
    dosage: { guideline: '卫气营血为辨证框架，不直接对应固定方剂：卫分辛凉解表（银翘散、桑菊饮），气分清气泄热（白虎汤）或通腑攻下（承气汤类），营分清营透热（清营汤），血分凉血散血（犀角地黄汤）', caution: '各阶段用药界限分明：卫分忌早投寒凉冰伏邪气，营分忌辛温发汗，血分忌单纯收敛止血而忘散瘀' },
    cases: null,
    stdJudgment: '卫气营血辨证以卫、气、营、血四个层次概括温病由浅入深的病变阶段，治法随之递进：在卫汗之、到气清气、入营透热转气、入血凉血散血，层次错则动手便错。',
    coreDefinition: '叶天士《温热论》创立：温邪由卫而气而营而血层层深入，反映病位浅深与病情轻重；卫分表热、气分里热、营分热灼营阴、血分耗血动血，各阶段证候治法不同，为温病辨证总纲。',
    safety: { note: '辨证层次决定用药层次：卫分误用重剂寒凉则冰伏其邪，营血分误用辛温则助热动血；犀角类药现以水牛角代用，须镑片先煎或锉末冲服。', prohibitions: [] },
    learning: {
      knowledge: '卫气营血辨证由叶天士《温热论》创立，是温病辨证论治总纲。卫分证：温邪初袭肺卫，发热微恶风寒、头痛咳嗽、口微渴、舌边尖红苔薄白、脉浮数；气分证：邪入里化热，壮热不恶寒反恶热、口渴引饮、苔黄、脉数有力；营分证：热灼营阴、心神被扰，身热夜甚、心烦少寐、时有谵语、斑疹隐隐、舌红绛、脉细数；血分证：热迫血行、耗血动血，身灼热、斑色紫黑、多部位出血、舌深绛。治法纲领：在卫汗之（辛凉解表）、到气才可清气、入营犹可透热转气、入血直须凉血散血。传变规律：卫→气→营→血递传，亦可逆传心包（卫→营），邪之浅深决定治之层次。',
      misjudgment: '把卫分表热当里热，早投白虎之类寒凉重剂。错：卫分证邪在肺卫，当辛凉轻透；早投重剂寒凉则冰伏其邪，热不得外达、病反深重，即叶氏「动手便错」之诫。',
      reasoning: '同为发热，为何卫、气、营、血四个层次的治法判然有别？',
      feedback: '病位浅深不同：卫分在表宜透，气分在里宜清，营分热灼阴伤宜透热转气，血分耗血动血宜凉血散血；层次不同，法度随之。',
      transfer: '高热三日不恶寒、口渴苔黄，属卫气营血何阶段？若兼斑疹隐隐、舌绛，又当如何判断？',
    },
  },
  {
    id: 'pb12-q-014', title: '温病·卫分证治（银翘散桑菊饮证）', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['温病', '卫分证', '银翘散', '桑菊饮'],
    intent: '掌握银翘散与桑菊饮的主治、组成要点与辛凉平剂、轻剂之别。',
    facts: [
      { field: '临床.卫分证候特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.银翘散组成功效', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.桑菊饮组成功效', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.银翘散桑菊饮鉴别', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.卫分治则', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '辛凉平剂银翘散主之', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '太阴风温、温热、温疫、冬温，初起恶风寒者，桂枝汤主之；但热不恶寒而渴者，辛凉平剂银翘散主之' },
      { label: '辛凉轻剂桑菊饮主之', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '太阴风温，但咳，身不甚热，微渴者，辛凉轻剂桑菊饮主之' },
    ],
    dosage: { guideline: '银翘散：连翘、银花、苦桔梗、薄荷、竹叶、生甘草、荆芥穗、淡豆豉、牛蒡子、鲜苇根，水煎服，香气大出即取服、勿过煮；桑菊饮：桑叶、菊花、杏仁、连翘、薄荷、桔梗、生甘草、苇根，水煎服', caution: '薄荷芳香含挥发油宜后下；银翘散勿久煎（过煮则辛凉透表之力尽失）；风热轻证勿过用辛散，津伤明显者酌减荆芥豆豉' },
    cases: null,
    stdJudgment: '银翘散辛凉透表、清热解毒，为温病初起邪在肺卫之主方；桑菊饮疏风清热、宣肺止咳，主治风温初起之但咳身热不甚；一平一轻，示邪之轻重有别、剂之大小随之。',
    coreDefinition: '银翘散（辛凉平剂）：银花连翘为君清热解毒、芳香透表，配薄荷荆芥豆豉透邪，牛蒡子桔梗甘草利咽，主治发热无汗或有汗不畅、微恶风寒、口渴咽痛；桑菊饮（辛凉轻剂）：桑叶菊花杏仁桔梗宣肺止咳，主治但咳、身不甚热、口微渴之卫分轻证。',
    safety: { note: '银翘散煎法关键在「香气大出即取服、勿过煮」，久煎则辛凉透表之力尽失；薄荷后下；卫分证忌辛温发汗（麻桂羌独之属）与早投苦寒。', prohibitions: [] },
    learning: {
      knowledge: '卫分证候特点：发热、微恶风寒、无汗或少汗、头痛、口微渴、咳嗽咽痛、舌边尖红、苔薄白或薄黄、脉浮数。银翘散（《温病条辨》辛凉平剂）：银花、连翘、桔梗、薄荷、竹叶、甘草、荆芥穗、淡豆豉、牛蒡子、苇根，功在辛凉透表、清热解毒，主治温病初起之发热无汗或汗出不畅、微恶风寒、口渴咽痛咳嗽。桑菊饮（辛凉轻剂）：桑叶、菊花、杏仁、连翘、薄荷、桔梗、甘草、苇根，功在疏风清热、宣肺止咳，主治风温初起之但咳、身热不甚、口微渴。鉴别要点：银翘散证热邪较盛、咽痛口渴突出，桑菊饮证以咳为主而热轻；苇根入煎清热生津。治则：辛凉解表、透邪外达。',
      misjudgment: '见恶寒无汗即以麻黄汤、桂枝汤类辛温发汗。错：卫分证之恶寒是温邪犯卫、卫阳被遏，本质属热，宜辛凉轻透；误用辛温则助热伤阴，即温病忌汗之戒。',
      reasoning: '银翘散与桑菊饮同为辛凉剂，为何一称平剂一称轻剂，适应证有何差异？',
      feedback: '银翘散治卫分热重而咽痛口渴明显之证，药力较著；桑菊饮治卫分邪轻、以咳为主之证，药力轻灵；邪之轻重决定剂之大小。',
      transfer: '小儿麻疹初起发热咳嗽、目赤流泪、流涕，可参银翘散加减的根据是什么？',
    },
  },
  {
    id: 'pb12-q-015', title: '温病·气分证治（白虎汤承气汤证）', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['温病', '气分证', '白虎汤', '承气汤', '大黄·高风险'],
    intent: '掌握气分证两大治法——白虎汤辛寒清气与承气汤通腑泄热，明辨经热与腑实。',
    facts: [
      { field: '临床.气分证候特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.白虎汤组成主治', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.承气汤类组成主治', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.气分治则', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.白虎汤使用禁忌', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.经热与腑实鉴别', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '辛凉重剂白虎汤主之', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '太阴温病，脉浮洪，舌黄，渴甚，大汗，面赤，恶热者，辛凉重剂白虎汤主之' },
      { label: '传至中焦阳明温病', canon: '中焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '面目俱赤，语声重浊，呼吸俱粗，大便闭，小便涩，舌苔老黄，甚则黑有芒刺，但恶热，不恶寒，日晡益甚者，传至中焦，阳明温病也。脉浮洪躁甚者，白虎汤主之；脉沉数有力，甚则脉体反小而实者，大承气汤主之' },
    ],
    dosage: { guideline: '白虎汤：生石膏（打碎先煎）、知母、炙甘草、粳米；大承气汤：大黄（后下）、芒硝（溶服）、厚朴、枳实（先煎），得下即止后服', caution: '白虎汤须大热大渴大汗脉洪大四大证俱备，表证未解、无汗恶寒或脉浮细无力者禁用；大承气汤须痞满燥实俱备，中病即止，孕妇禁用' },
    cases: null,
    stdJudgment: '气分证治分两大法：热炽阳明者以白虎汤辛寒清气、清热生津，热结肠腑者以承气汤类苦寒攻下、急下存阴；一清一下，病机不同而皆主气分实热。',
    coreDefinition: '气分证为里热炽盛、邪正剧争：白虎汤证热盛津伤（壮热大汗、烦渴引饮、面赤恶热、脉洪大），治以辛寒清气、清热生津；承气汤证热结肠腑（潮热谵语、腹满硬痛拒按、便秘、苔焦黑起刺、脉沉实），治以通腑泄热、急下存阴。',
    safety: { note: '生石膏用量宜大且打碎先煎；大承气汤大黄后下、芒硝溶服，得下即止后服，不可过剂伤正；承气类峻下攻伐，年老体弱、阴津亏虚者慎用。', prohibitions: ['大承气汤含大黄、芒硝，峻下攻伐，孕妇禁用；中病即止，不可过剂', '白虎汤须大热大渴大汗脉洪大四证俱备，表证未解或无汗恶寒者禁用'] },
    learning: {
      knowledge: '气分证候特点：壮热不恶寒反恶热、汗多、口渴引饮、舌红苔黄燥、脉洪大或沉实有力。白虎汤（《伤寒论》：石膏、知母、甘草、粳米）：清热生津，主治阳明气分热盛之四大证（大热、大汗、大渴、脉洪大），为气分无形热盛代表方。承气汤类（大承气汤：大黄、芒硝、厚朴、枳实）：峻下热结、急下存阴，主治阳明腑实（潮热谵语、腹满硬痛拒按、大便不通、苔焦黄起刺、脉沉实），为气分有形热结代表方。鉴别要点：白虎汤证热在经（无形热炽，脉浮洪、渴甚大汗），承气汤证热在腑（有形燥结，脉沉实、腹满硬痛）；「脉浮洪躁甚者白虎汤主之，脉沉数有力者大承气汤主之」。治则：清气泄热与通腑泄热并举。',
      misjudgment: '气分热盛见便秘即投大承气汤。错：白虎汤证与承气汤证虽皆属气分，一为无形热炽（脉浮洪、渴甚大汗、腹无硬痛）、一为有形燥结（腹满硬痛拒按、脉沉实）；白虎证误下则徒伤正气、阴津愈竭。',
      reasoning: '同属气分实热，为何白虎汤用石膏知母，承气汤却用大黄芒硝枳朴？',
      feedback: '热炽阳明而津未竭，辛寒可撤热保津；燥屎内结成实，非攻下不能去热存阴。经热在无形、腑实在有形，法随证立。',
      transfer: '肺炎高热、大汗口渴、脉洪大而大便三日未解，能否径用大承气汤？',
    },
  },
  {
    id: 'pb12-q-016', title: '温病·营分证治（清营汤证）', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['温病', '营分证', '清营汤', '水牛角'],
    intent: '掌握清营汤清营解毒、透热养阴的组方之理与热入营分证治。',
    facts: [
      { field: '临床.营分证候特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.清营汤组成功效', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.透热转气', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.营分治则', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.清营汤禁忌', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '手厥阴暑温', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '脉虚夜寐不安，烦渴舌赤，时有谵语，目常开不闭，或喜闭不开，暑入手厥阴也。手厥阴暑温，清营汤主之；舌白滑者，不可与也' },
    ],
    dosage: { guideline: '清营汤：水牛角（代犀角，镑片先煎）、生地、玄参、竹叶心、麦冬、丹参、黄连、银花、连翘（连心用），水煎服', caution: '舌白滑者（挟湿）忌用本方；水牛角代犀角用量宜大（30-60g）且先煎；黄连苦寒，脾胃虚寒者减量' },
    cases: null,
    stdJudgment: '清营汤清营解毒、透热养阴，主治热入营分证；以银花连翘竹叶透热转气，水牛角生地玄参麦冬丹参清营养阴，为邪初入营、犹可外透之专方。',
    coreDefinition: '营分证候特点：身热夜甚、心烦少寐、时有谵语、斑疹隐隐、舌红绛而干、脉细数；病机为热灼营阴、心神被扰。清营汤以清营解毒、透热养阴立法，使入营之邪透出气分而解，即透热转气。',
    safety: { note: '水牛角代犀角须镑片先煎、用量宜足；营分挟湿（舌白滑）忌用本方滋腻柔润之品；方含丹参活血，孕妇慎用；犀角（水牛角）非凉血重证勿轻投。', prohibitions: ['舌白滑（挟湿）者禁与清营汤，湿重忌柔润药', '清营汤含丹参，孕妇慎用'] },
    learning: {
      knowledge: '营分证候特点：身热夜甚、心烦不寐、时有谵语、斑疹隐隐、口反不甚渴（营阴上承）、舌红绛、脉细数。清营汤（《温病条辨》）：水牛角（代犀角）、生地、玄参、竹叶心、麦冬、丹参、黄连、银花、连翘。功效清营解毒、透热养阴。方义：水牛角清营解毒为君，生地玄参麦冬养阴清热为臣，银花连翘竹叶清热解毒而透热转气，黄连丹参清心凉血活血。主治热入营分、营阴已伤而邪尚可外透者，即「脉虚夜寐不安，烦渴舌赤，时有谵语」之手厥阴暑温证。鉴别要点：与气分证之别在舌（绛 vs 红苔黄）、热型（夜甚 vs 日晡甚）、神识（时有谵语 vs 无）及渴之程度（不甚渴 vs 大渴）。治则：清营泄热、透热转气。',
      misjudgment: '营分见斑即投凉血散血之剂。错：营分证斑疹隐隐、邪初入营，法当透热转气（清营汤）；血分证斑色紫黑、出血明显，方用凉血散血（犀角地黄汤）；层次未到而早用凉血，反使邪无外出之路。',
      reasoning: '同为舌绛，为何营分证用清营汤透热转气，而不直接用凉血散血之品？',
      feedback: '邪初入营、尚有外透之机，故用银翘竹叶辛凉透达，冀热邪转出气分而解；若已入血耗血动血，透之无功，方须凉血散血。',
      transfer: '乙脑高热神昏、舌绛而干、斑疹隐隐，清营汤应与何方合用？',
    },
  },
  {
    id: 'pb12-q-017', title: '温病·血分证治（犀角地黄汤证）', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['温病', '血分证', '犀角地黄汤', '水牛角'],
    intent: '掌握犀角地黄汤凉血散瘀之功与热入血分证治，明辨营分血分之别。',
    facts: [
      { field: '临床.血分证候特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.犀角地黄汤组成功效', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.凉血散血', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.血分治则', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.营血分鉴别', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '时欲漱口不欲咽', canon: '下焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '时欲漱口，不欲咽，大便黑而易者，有瘀血也，犀角地黄汤主之' },
    ],
    dosage: { guideline: '犀角地黄汤：水牛角（代犀角，镑片先煎或锉末冲服）、生地黄、芍药、牡丹皮，水煎服', caution: '血分热盛动血者用之；虚寒性出血（血色暗淡、四肢不温、脉迟）禁用；方含赤芍丹皮活血，孕妇慎用' },
    cases: null,
    stdJudgment: '犀角地黄汤清热解毒、凉血散瘀，主治热入血分证；水牛角生地清热凉血养阴，赤芍丹皮凉血散瘀，凉血与散瘀并行，血止而不留瘀。',
    coreDefinition: '血分证候特点：身灼热、躁扰或神昏谵语、斑色紫黑、吐血衄血便血尿血、舌深绛或紫绛起刺、脉细数；病机为热炽血分、耗血动血。犀角地黄汤（水牛角、生地、芍药、丹皮）凉血散血，为血分证代表方。',
    safety: { note: '水牛角代犀角用量宜大（30-60g）且先煎；凉血与散瘀并用，血止而不留瘀；虚寒性出血与孕妇忌用；蓄血证须辨瘀热轻重，重者配桃核承气汤类。', prohibitions: ['犀角地黄汤含赤芍、牡丹皮活血，孕妇慎用', '虚寒性出血（血色暗淡、肢冷脉迟）禁用本方'] },
    learning: {
      knowledge: '血分证候特点：身热灼手、躁扰不安或神昏谵语、斑疹紫黑、多部位出血（吐、衄、便、尿血）、舌深绛或紫绛、脉细数，重者动风痉厥。犀角地黄汤（《备急千金要方》，温病血分证代表方）：水牛角（代犀角）、生地黄、芍药、牡丹皮。功效清热解毒、凉血散瘀。方义：水牛角清心凉血解毒为君，生地凉血养阴为臣，芍药丹皮凉血散瘀为佐。主治：①热伤血络之出血发斑（斑色紫黑、吐衄便血）；②热扰心神之昏狂谵语；③蓄血瘀热之漱水不欲咽、大便色黑易解（「时欲漱口，不欲咽，大便黑而易者，有瘀血也」）。鉴别要点：与营分证（清营汤）之别在斑色（紫黑 vs 隐隐）、出血（明显 vs 轻或无）、舌色（深绛紫绛 vs 红绛）、神志（昏狂 vs 时有谵语）。治则：凉血散血、清热解毒。',
      misjudgment: '血分出血即用炭类收敛止血药。错：血分证之出血因热迫血行，宜凉血散血以安血；纯用收敛止血则瘀热内闭、出血反甚，故以赤芍丹皮散瘀、血止而不留瘀。',
      reasoning: '血分证出血为何不止血而用凉血散血（芍药、丹皮）？',
      feedback: '热迫血行、离经之血易凝为瘀：凉血使热清血宁，散瘀使瘀去新生，血自归经而不妄行，即凉血与散瘀并用之理。',
      transfer: '蓄血证「漱水不欲咽、大便黑易」，与阳明腑实之便秘口渴如何鉴别？',
    },
  },
  // ============================================================
  // Q 中医临床基础 · 三焦辨证与湿温（018-019）
  // ============================================================
  {
    id: 'pb12-q-018', title: '温病·三焦辨证（上中下焦）', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['温病', '三焦辨证'],
    intent: '掌握三焦辨证的上中下焦病位、证候与传变规律及其与卫气营血辨证的关系。',
    facts: [
      { field: '临床.三焦辨证概念', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.上焦证治', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.中焦证治', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.下焦证治', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.三焦传变规律', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.与卫气营血关系', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '凡病温者始于上焦', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '凡病温者，始于上焦，在手太阴' },
      { label: '上焦病不治则传中焦', canon: '中焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '温病由口鼻而入，鼻气通于肺，口气通于胃。肺病逆传则为心包，上焦病不治，则传中焦，胃与脾也；中焦病不治，即传下焦，肝与肾也' },
    ],
    dosage: { guideline: '上焦证治以辛凉轻透（银翘散、桑菊饮），中焦证治以清泄通下（白虎汤、承气汤类、三仁汤），下焦证治以滋养肝肾（加减复脉汤、三甲复脉汤类）', caution: '上焦禁用辛温发汗与苦寒攻下；下焦阴伤忌苦寒清泄而宜甘咸养阴，误汗误下皆可竭阴' },
    cases: null,
    stdJudgment: '三焦辨证以肺心（上焦）、脾胃（中焦）、肝肾（下焦）为纲，概括温病由浅入深的传变与脏腑病位，与卫气营血辨证相互补充，共成温病辨证体系。',
    coreDefinition: '吴鞠通《温病条辨》立三焦辨证：上焦病在手太阴肺与手厥阴心包，中焦病在足阳明胃与足太阴脾，下焦病在足少阴肾与足厥阴肝；自上而下传变，反映病位浅深与正邪消长。',
    safety: { note: '三焦辨证为温病定位之纲：上焦忌辛温发汗（助热）与早下（引邪入里）；下焦阴竭忌苦寒伤阴；逆传心包之闭证须清心开窍，不可徒以解表。', prohibitions: [] },
    learning: {
      knowledge: '三焦辨证由吴鞠通创立，以三焦为纲辨温病病位与传变。上焦病在手太阴肺与手厥阴心包：肺卫证（发热微恶寒、咳嗽、头痛）用银翘散、桑菊饮辛凉透表；逆传心包（神昏谵语、舌蹇肢厥）用清宫汤送服安宫牛黄丸、紫雪、至宝丹清热开窍。中焦病在足阳明胃与足太阴脾：阳明热盛（壮热、大汗、渴饮）用白虎汤，阳明腑实（潮热便秘、腹满硬痛）用承气汤类，太阴湿热（身热不扬、脘痞苔腻）用三仁汤。下焦病在足少阴肾与足厥阴肝：真阴耗竭（低热不退、手足心热甚于手足背、舌干绛）用加减复脉汤，虚风内动（手足蠕动、心中憺憺大动）用三甲复脉汤、大定风珠。传变规律：上焦→中焦→下焦自上而下，亦有逆传心包者。与卫气营血关系：上焦多兼卫分气分，中焦多属气分，下焦多为阴伤而近营血。',
      misjudgment: '把三焦辨证等同于内伤脏腑辨证。错：三焦辨证是温病特有的病程定位体系，重在揭示温热病邪自上而下传变的阶段病机（如湿温之邪留三焦），与杂病脏腑辨证着眼不同。',
      reasoning: '温病邪陷心包之神昏，为何不能按「病在上焦」以辛凉解表法治之？',
      feedback: '逆传心包已离肺卫之表，邪闭心窍，非解表可解，须清心开窍（清宫汤、安宫牛黄丸），上焦如羽之治另有法度。',
      transfer: '热病后期手足蠕动、舌干齿黑、脉虚，属三焦何部？治当何法？',
    },
  },
  {
    id: 'pb12-q-019', title: '温病·湿热病证（湿温三仁汤证）', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['温病', '湿温', '三仁汤', '半夏·高风险'],
    intent: '掌握湿温病证候特点、三仁汤宣上畅中渗下之法及湿温三禁。',
    facts: [
      { field: '临床.湿温证候特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.三仁汤组成功效', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.湿温治则', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.湿温三禁', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.湿温与暑温鉴别', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '名曰湿温', canon: '上焦篇', chapter: '', sourceTitle: '《温病条辨》', sourceType: 'classic_original', status: 'verified', originalText: '头痛恶寒，身重疼痛，舌白不渴，脉弦细而濡，面色淡黄，胸闷不饥，午后身热，状若阴虚，病难速已，名曰湿温。汗之则神昏耳聋，甚则目瞑不欲言；下之则洞泄；润之则病深不解。长夏深秋冬日同法，三仁汤主之' },
    ],
    dosage: { guideline: '三仁汤：杏仁、飞滑石、白通草、白蔻仁、竹叶、厚朴、生薏苡仁、半夏，水煎服', caution: '湿温三禁：禁发汗（汗之则神昏耳聋）、禁攻下（下之则洞泄）、禁滋润（润之则病深不解）；半夏用炮制品，滑石、半夏孕妇慎用' },
    cases: null,
    stdJudgment: '三仁汤宣畅气机、清利湿热，主治湿温初起湿重于热证；杏仁宣上、蔻仁畅中、薏仁渗下，三焦分消，为湿温初起之代表方。',
    coreDefinition: '湿温证候特点：头痛恶寒、身重疼痛、胸闷不饥、午后身热、舌白不渴、脉弦细而濡；病机为湿热交蒸、湿遏热伏而湿重于热。三仁汤以杏仁开上、蔻仁畅中、薏仁渗下，宣畅三焦气机。',
    safety: { note: '湿温初起湿重于热，忌大汗、忌攻下、忌滋腻；三仁汤含半夏须用炮制品（生品有毒、反乌头类），含滑石性滑，孕妇慎用；湿热化燥伤阴者转用清热养阴。', prohibitions: ['湿温初起忌发汗、忌攻下、忌滋润（三禁）', '三仁汤含半夏，生品有毒须炮制、反乌头类；含滑石，孕妇慎用'] },
    learning: {
      knowledge: '湿温证候特点：身热不扬、午后热甚、头重如裹、身重肢倦、胸闷脘痞、不饥不渴、面色淡黄、舌苔白腻、脉濡缓，病难速已。三仁汤（《温病条辨》）：杏仁、飞滑石、白通草、白蔻仁、竹叶、厚朴、生薏苡仁、半夏。功效宣畅气机、清利湿热。方义：杏仁宣利上焦肺气（开上），白蔻仁芳香化湿、行气宽中（畅中），薏苡仁渗利湿热（渗下），滑石通草竹叶清热利湿，厚朴半夏行气化湿散满。主治湿温初起、湿重于热证（头痛恶寒、身重疼痛、胸闷不饥、午后身热、舌白不渴、脉弦细而濡）。三禁：汗之则神昏耳聋，下之则洞泄，润之则病深不解。鉴别要点：与暑温之别在湿与热偏重（湿温苔白腻、热不扬、不渴；暑温壮热口渴、汗多）；与阴虚发热之别在舌脉（白腻苔濡脉 vs 少苔细数脉）。治则：宣畅气机、清热利湿。',
      misjudgment: '湿温午后身热、状若阴虚，误作阴虚发热而投滋阴。错：湿温午后热甚伴苔白腻、脉濡缓、身重不渴，是湿遏热伏；阴虚发热舌红少苔、脉细数；误润则湿邪胶着，即「润之则病深不解」。',
      reasoning: '湿温初起头痛恶寒身重，为何不能按风寒表证发汗解表？',
      feedback: '湿邪粘滞、湿热裹结：发汗则湿随热蒸、上蒙清窍而神昏耳聋；治当宣畅气机、芳香化湿、淡渗利湿，使湿去热孤。',
      transfer: '长夏之季身重胸闷、午后热甚、苔白腻者，三仁汤与藿香正气散如何取舍？',
    },
  },
  // ============================================================
  // Q 中医临床基础 · 温病后期（020）
  // ============================================================
  {
    id: 'pb12-q-020', title: '温病·余热未清与阴伤（竹叶石膏汤证）', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['温病', '余热未清', '竹叶石膏汤', '半夏·高风险'],
    intent: '掌握热病后期余热未清、气津两伤证候与竹叶石膏汤清补兼施之法。',
    facts: [
      { field: '临床.余热未清证候特点', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.竹叶石膏汤组成功效', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: '临床.竹叶石膏汤方义', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.余热未清治则', sourceType: 'textbook', sourceTitle: '《温病学》规划教材', status: 'verified' },
      { field: '临床.与白虎汤鉴别', sourceType: 'textbook', sourceTitle: '《中医临床基础》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '虚羸少气', canon: '辨阴阳易差后劳复病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '伤寒解后，虚羸少气，气逆欲吐者，竹叶石膏汤主之' },
    ],
    dosage: { guideline: '竹叶石膏汤：竹叶、石膏（打碎先煎）、半夏、麦门冬、人参（或党参）、甘草、粳米，水煎服', caution: '实热尚盛者不宜；半夏用炮制品、孕妇慎用；石膏打碎先煎；人参反藜芦，不与藜芦同用' },
    cases: null,
    stdJudgment: '竹叶石膏汤清热生津、益气和胃，主治热病后期余热未清、气津两伤证；石膏竹叶清余热，人参麦冬益气生津，半夏和胃降逆，清补兼施。',
    coreDefinition: '余热未清证候特点：身热多汗、心胸烦闷、气逆欲呕、口干喜饮、虚羸少气、舌红少苔、脉虚数；病机为热势已衰而气津两伤、胃气上逆。竹叶石膏汤清余热、益气阴、和胃气。',
    safety: { note: '竹叶石膏汤证以余热未清、气津两伤为眼目：实热炽盛时用之则病重药轻；石膏须打碎先煎；半夏须用炮制品，孕妇慎用；人参反藜芦。', prohibitions: ['竹叶石膏汤含半夏，生品有毒须炮制；反乌头类（含附子）；孕妇慎用', '石膏大寒，脾胃虚寒者慎用；实热亢盛者非本方所宜'] },
    learning: {
      knowledge: '余热未清、气津两伤证候特点：身热不退或低热、汗多、心胸烦闷、气逆欲吐、口干喜饮、神疲少气、舌红少苔、脉虚数，见于温病、伤寒后期。竹叶石膏汤（《伤寒论》）：竹叶、石膏、半夏、麦门冬、人参（或党参）、甘草、粳米。功效清热生津、益气和胃。方义：石膏竹叶清透余热，人参麦冬益气养阴生津，半夏降逆和胃止呕，甘草粳米护养胃气。主治热病后期余热未清、气津两伤之虚羸少气、气逆欲吐（「伤寒解后，虚羸少气，气逆欲吐者，竹叶石膏汤主之」）。鉴别要点：与白虎汤之别在虚实——白虎汤治气分实热（大热、大渴、大汗、脉洪大），竹叶石膏汤治余热兼虚（虚羸少气、气逆欲吐、脉虚数）；与生脉散之别在有无余热与胃气上逆。治则：清热生津、益气和胃。',
      misjudgment: '热病后期低热不退即投苦寒重剂。错：此期热势已衰而气津两伤，苦寒重伤气阴；竹叶石膏汤清补兼施，石膏辛甘大寒而非苦寒直折，配人参麦冬养正，正合病机。',
      reasoning: '同为石膏剂，白虎汤证与竹叶石膏汤证在病机上如何分野？',
      feedback: '白虎汤证邪热炽盛、津伤尚轻，重在清热；竹叶石膏汤证余热未清而气阴两伤、胃气上逆，故清法与补法并用，加人参麦冬半夏。',
      transfer: '流感热退后仍干呕少食、低热汗多、舌红少苔，竹叶石膏汤化裁的要点是什么？',
    },
  },
];
