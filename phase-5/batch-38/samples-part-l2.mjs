// ============================================================
// 杏林大典 · Phase 5 · Batch-38 · 样本 Part L2（方剂学 20 节点）
// ID 区间 pb38-l-021 ~ pb38-l-040，category 一律 'formula'，标题=单方名
// 学科：L 方剂学；本批为 L 学科第 231~270 号节点的一部分（另一位作者负责 001~020）
// 主题覆盖：温里剂 / 清热剂 / 理气剂 / 理血剂 / 祛湿剂 / 祛风剂 / 安神剂 / 补益剂 / 治燥剂 / 痈疡剂
// 选题依据：全部避开 batch-38/l-titles.txt 及 phase-5 既有 L 方剂学节点标题
//           （l-01~l-140 共 205 个唯一标题），亦避开对方 001~020 示例章节首选题
// 原则：方源/组成/功效/主治/剂量为《方剂学》规划教材通行表述；经典原文只写确凿可核验者；
//       方含高危药（附子/细辛/半夏/麝香/虫类药/芒硝/甘草）时 safety.prohibitions 必写红线，
//       与 authoring-spec 第 4 节一致；剂量为教材参考量（非处方）。
// ============================================================

export const SAMPLES_PART_L2 = [
  // ============================================================
  // L 方剂学 · 温里剂（021）
  // ============================================================
  {
    id: 'pb38-l-021', title: '黄芪建中汤', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['温里剂', '黄芪建中汤', '甘草·高风险'],
    intent: '黄芪建中汤的组成、方义与主治（中焦虚寒兼气虚之虚劳里急），掌握小建中汤加黄芪的组方思路。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'classic_original', sourceTitle: '《金匮要略》', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '《金匮要略》', canon: '血痹虚劳病脉证并治', chapter: '', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified', originalText: '虚劳里急，诸不足，黄芪建中汤主之' }],
    dosage: { guideline: '黄芪 15g、桂枝 9g、芍药 18g、生姜 9g、大枣 6 枚、炙甘草 6g、饴糖 30g（烊化冲服）；水煎温服', caution: '饴糖甘温助湿，中满吐逆、湿热内蕴者忌用；糖尿病及血糖偏高者慎用饴糖' },
    cases: null,
    stdJudgment: '黄芪建中汤即小建中汤加黄芪，功在温中补气、和里缓急。小建中汤所治虚劳里急偏于中阳不振，加黄芪后补气固表之力倍增，凡中气虚寒之腹痛喜温喜按、气短自汗、倦怠乏力者，皆宜以此方温建中气、益气固表。',
    coreDefinition: '黄芪补中益气固表，饴糖温中缓急止痛，桂枝温阳散寒，芍药和营敛阴，姜枣草调补中州，主治中焦虚寒兼气虚之虚劳里急。',
    safety: { note: '本方为温补之剂，阴虚火旺、外感表证未解者忌用；饴糖须烊化冲服，不入同煎。', prohibitions: ['【高风险】甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '黄芪建中汤（《金匮要略》）由黄芪、桂枝、芍药、生姜、大枣、炙甘草、饴糖组成，功效温中补气、和里缓急，主治中焦虚寒兼气虚之虚劳里急：腹痛喜温喜按、气短自汗。饴糖甘温缓急为君，桂枝芍药辛甘化阳、酸甘化阴，黄芪益气固表，饴糖须烊化冲服。',
      misjudgment: '把黄芪建中汤与小建中汤等同，见腹痛即投而忽视气虚之候。错：小建中汤治中焦虚寒里急，黄芪建中汤在其基础上加黄芪，专为气虚不固（自汗、短气、易感冒）者设，无气虚征象不必加黄芪。',
      reasoning: '小建中汤为何加入一味黄芪后，主治范围就从里急腹痛扩及自汗短气？',
      feedback: '黄芪补脾气、固卫表，与饴糖桂枝相配使中气充实、卫阳固密，里急得缓、汗出得止，故虚劳诸不足皆可投。',
      transfer: '虚寒胃痛兼见胃下垂、气短下坠者，黄芪建中汤加升麻、柴胡的机理是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 治燥剂（022）· 补益剂（023）
  // ============================================================
  {
    id: 'pb38-l-022', title: '麦门冬汤', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['治燥剂', '麦门冬汤', '半夏·高风险', '甘草·高风险'],
    intent: '麦门冬汤的组成、方义与主治（肺胃阴虚之虚热肺痿），理解麦冬七倍于半夏「培土生金、降逆下气」的配伍法度。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'classic_original', sourceTitle: '《金匮要略》', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '《金匮要略》', canon: '肺痿肺痈咳嗽上气病脉证治', chapter: '', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified', originalText: '火逆上气，咽喉不利，止逆下气者，麦门冬汤主之' }],
    dosage: { guideline: '麦门冬 60g、半夏 9g、人参 9g、甘草 6g、粳米 6g、大枣 12 枚；水煎温服（原方麦冬与半夏七比一）', caution: '方含半夏，须用制半夏，反乌头类（附子、川乌、草乌）；肺痈实证咳吐脓痰、痰湿壅盛者忌用' },
    cases: null,
    stdJudgment: '麦门冬汤重用麦门冬七倍于半夏，甘寒清养肺胃之阴为君，半夏降逆下气为臣，人参甘草粳米大枣补益脾胃、培土生金为佐使，清养与降逆并举，主治肺胃阴虚之肺痿：咳唾涎沫、气喘短气、咽喉干燥、舌红少苔、脉虚数，为治虚热肺痿之要方。',
    coreDefinition: '重用麦冬养阴生津润燥，半夏降逆下气，参草粳枣益胃生津、培土生金，主治肺胃阴虚之咳逆上气、咽喉不利。',
    safety: { note: '本方麦冬量大滋腻，痰湿壅盛、脾虚便溏者慎用；半夏与乌头类相反须牢记。', prohibitions: ['【高风险】方含半夏，生半夏有毒须炮制（用制半夏）；反乌头类（附子、川乌、草乌）；孕妇慎用', '【高风险】甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '麦门冬汤（《金匮要略》）由麦门冬、半夏、人参、甘草、粳米、大枣组成，功效清养肺胃、降逆下气，主治肺胃阴虚之肺痿：咳唾涎沫、咽喉干燥、气逆而喘。麦冬重用甘寒养阴为君，半夏少量降逆下气为臣，人参甘草粳米大枣补脾胃以生肺金为佐使；麦冬与半夏七比一为配伍关键，半夏得麦冬则不燥、麦冬得半夏则不腻。',
      misjudgment: '把麦门冬汤当滋阴润肺方通治一切咳嗽。错：本方证为肺胃气阴两伤之虚热肺痿（咳唾涎沫、咽干口燥、舌红少苔），若外感咳嗽痰多或肺痈咳脓痰者，误投甘寒之品反恋邪碍胃。',
      reasoning: '半夏性温燥、麦冬性甘寒，一燥一润，何以能同处一方相济为功？',
      feedback: '肺胃阴伤者津不上承，麦冬养阴以润燥，半夏借其降逆之性引津液下行濡养，燥润相济、降而不燥。',
      transfer: '慢性萎缩性胃炎见胃脘灼痛、口干少津者，麦门冬汤去半夏加石斛、白芍的机理是什么？',
    },
  },
  {
    id: 'pb38-l-023', title: '玉液汤', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['补益剂', '玉液汤', '消渴'],
    intent: '玉液汤的组成、方义与主治（消渴气阴两虚证），掌握益气滋阴、固肾止渴之配伍。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '生山药 30g、生黄芪 15g、知母 18g、生鸡内金 6g、葛根 6g、五味子 9g、天花粉 9g；水煎温服', caution: '本方偏于温补与清润并用，实热炽盛、苔黄厚腻之消渴不宜；鸡内金研末冲服效佳' },
    cases: null,
    stdJudgment: '玉液汤以黄芪山药益气固摄为主，知母天花粉滋阴清热为辅，葛根升津、鸡内金运脾、五味子敛肾，全方益气滋阴、固肾止渴，主治消渴气阴两虚之口渴引饮、小便频多、困倦气短、脉虚细无力。',
    coreDefinition: '黄芪山药益气生津、固摄下元，知母天花粉清热滋阴生津，葛根升发津液，鸡内金助运，五味子固肾缩泉。',
    safety: { note: '张锡纯立方之意在气阴双补，消渴属阴损及阳、气虚不固者尤宜；忌用于痰湿壅盛之证。', prohibitions: [] },
    learning: {
      knowledge: '玉液汤（《医学衷中参西录》）由生山药、生黄芪、知母、生鸡内金、葛根、五味子、天花粉组成，功效益气滋阴、固肾止渴，主治消渴气阴两虚证：口渴引饮、小便频多、气短神疲。黄芪山药益气固摄为君，知母花粉滋阴清热生津为臣，葛根升津、五味子敛肾为佐使。',
      misjudgment: '把玉液汤当清热生津方用于胃火炽盛之消渴。错：本方证口渴多尿并见气短乏力、脉虚，属气阴两虚；若烦渴多饮、苔黄脉洪大，为胃热津伤，须清胃热为主，误用芪葛温升反助其火。',
      reasoning: '黄芪性温、葛根升散，何以能用于以口渴为苦的消渴方中？',
      feedback: '气虚则津不上承而渴，黄芪益气升阳、葛根升发清阳，使津液上潮以解渴，此「升津止渴」之法，与纯清热养阴不同路。',
      transfer: '糖尿病见蛋白尿、腰酸乏力者，玉液汤重用山药、五味子的道理是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 理血剂（024）· 祛湿剂（025）
  // ============================================================
  {
    id: 'pb38-l-024', title: '桂枝茯苓丸', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['理血剂', '桂枝茯苓丸', '化瘀消癥'],
    intent: '桂枝茯苓丸的组成、方义与主治（瘀血留结胞宫之癥积、漏下），理解消癥缓图不伤胎的制方思想。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'classic_original', sourceTitle: '《金匮要略》', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '《金匮要略》', canon: '妇人妊娠病脉证并治', chapter: '', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified', originalText: '所以血不止者，其癥不去故也，当下其癥，桂枝茯苓丸主之' }],
    dosage: { guideline: '桂枝、茯苓、牡丹皮、桃仁、芍药各 6g；共研细末炼蜜为丸，每服 6g，日三服，或作汤剂水煎温服', caution: '本方化瘀力缓，须丸药缓图；孕妇及月经过多者禁用；血虚无瘀者忌用' },
    cases: null,
    stdJudgment: '桂枝茯苓丸以桂枝温通血脉为君，桃仁牡丹皮活血化瘀为臣，芍药和营、茯苓渗湿健脾为佐使，活血化瘀、缓消癥块，主治瘀血留结胞宫之癥积：小腹包块、腹痛拒按、漏下不止、血色紫暗，及素有癥病而妊娠漏下者，为「化瘀消癥而不伤胎」之代表方。',
    coreDefinition: '桂枝温通血脉，桃仁丹皮化瘀消癥，芍药和营，茯苓渗湿健脾，主治瘀血留结胞宫之癥积、漏下、腹痛。',
    safety: { note: '本方为化瘀缓图之剂，孕妇虽有癥病亦须谨慎，当在医师指导下使用；月经过多、血虚无瘀者禁用。', prohibitions: ['孕妇禁用（方含桃仁、牡丹皮等活血化瘀药，消癥之剂胎前当慎）'] },
    learning: {
      knowledge: '桂枝茯苓丸（《金匮要略》）由桂枝、茯苓、牡丹皮、桃仁、芍药各等分组成，功效活血化瘀、缓消癥块，主治瘀血留结胞宫之癥积：小腹包块、按之疼痛、月经不调、漏下不止。桂枝温通血脉为君，桃仁丹皮破瘀为臣，芍药养血和营、茯苓渗湿健脾为佐使；炼蜜为丸、小量日服，取「丸者缓也」之意，使瘀消而不伤胎。',
      misjudgment: '把桂枝茯苓丸当通治癥块的猛剂，或以汤代丸大剂久服。错：本方特色在「缓消」，炼蜜为丸、量小日服，使瘀消而不伤胎气；若作汤剂大剂猛投，恐破血伤胎，孕妇尤须谨慎。',
      reasoning: '妇人妊娠期何以仍可用桂枝茯苓丸消癥而不致堕胎？',
      feedback: '癥块不去则漏下不止，消癥即所以安胎；丸药缓图、瘀去癥消而胎元自固，正合「有故无殒」之意。',
      transfer: '产后恶露不尽、腹痛拒按属瘀血内结者，桂枝茯苓丸与生化汤如何择用？',
    },
  },
  {
    id: 'pb38-l-025', title: '五皮散', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['祛湿剂', '五皮散', '利水'],
    intent: '五皮散的组成与主治（皮水水肿），掌握五药皆皮、利水消肿兼理气之组方特点。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '生姜皮、桑白皮、陈橘皮、大腹皮、茯苓皮各 9g；水煎温服', caution: '本方利水之力平缓，阴水（脾肾阳虚）及虚证水肿须配温阳健脾之品；大腹皮行气破滞，孕妇慎用' },
    cases: null,
    stdJudgment: '五皮散以五种皮类入药：茯苓皮利水渗湿健脾，大腹皮行气利水，陈皮理气化湿，桑白皮肃降肺气以利水，生姜皮和脾散水，全方利水消肿、理气健脾，主治皮水之一身悉肿、心腹胀满、小便不利，为利水而不伤正之平剂。',
    coreDefinition: '五药皆用其皮，利水消肿兼以理气行滞，主治水停皮肤之皮水：一身浮肿、腹胀喘满、小便不利。',
    safety: { note: '本方为治水肿实证之平剂，脾肾阳虚之阴水当以温阳利水为正治。', prohibitions: [] },
    learning: {
      knowledge: '五皮散（《华氏中藏经》）由生姜皮、桑白皮、陈橘皮、大腹皮、茯苓皮各等分组成，功效利水消肿、理气健脾，主治皮水：一身悉肿、心腹胀满、小便不利。茯苓皮渗湿为君，大腹皮行气利水为臣，桑白皮肃肺利水、陈皮理气、生姜皮散水为佐使，五药皆皮、皮以达皮。',
      misjudgment: '把五皮散当成通治一切水肿的方子。错：五皮散利水力缓、兼理气滞，主治皮水之肿势较轻者；风水表证须配解表、阴水虚证须配温补，单恃本方治重证水肿则力有不逮。',
      reasoning: '「五药皆皮，皮以达皮」之说，中医取类比象的用药思路如何理解？',
      feedback: '皮类药质轻走表、善行皮间水湿，取类比象以皮治皮，配合茯苓皮利水、桑白皮宣肺，使水邪从肤腠水道分消。',
      transfer: '妊娠水肿属脾虚气滞者，五皮散如何化裁以兼顾安胎？',
    },
  },
  // ============================================================
  // L 方剂学 · 安神剂（026）
  // ============================================================
  {
    id: 'pb38-l-026', title: '交泰丸', category: 'formula', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['安神剂', '交泰丸', '交通心肾'],
    intent: '交泰丸的组成与主治（心肾不交之失眠），理解黄连肉桂大寒大热同用的机理。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '黄连 10g、肉桂 1g；研末蜜丸或作汤剂，睡前服', caution: '黄连苦寒伤胃，脾胃虚寒者慎用；心肾阴虚、水不济火之失眠宜滋阴降火，非本方所宜' },
    cases: null,
    stdJudgment: '交泰丸黄连肉桂二味等路数悬殊之药相配：黄连苦寒清泄心火，肉桂辛热温补肾阳、引火归元，一清一温使心火得降、肾阳得复、水火既济，专治心肾不交之失眠心烦、怔忡健忘，为两味药制方之典范。',
    coreDefinition: '黄连清心泻火，肉桂温肾引火归元，交通心肾，主治心肾不交之失眠、心烦、怔忡。',
    safety: { note: '本方药仅二味而寒热并用，须辨心火亢而肾阳微者方宜；肉桂含挥发油，研末入丸散或后下为佳。', prohibitions: [] },
    learning: {
      knowledge: '交泰丸（《韩氏医通》）由黄连、肉桂按十比一组成，功效交通心肾，主治心肾不交之失眠：心烦不寐、心悸怔忡、口舌生疮。黄连苦寒清泻心火为君，肉桂辛热温补肾阳、引火归元为臣，心火降、肾阳复则水火既济、心神得安，故名交泰，肉桂研末入丸散或后下。',
      misjudgment: '把交泰丸用于纯阴虚之失眠。错：本方治心火偏亢、肾阳不足之失眠（兼腰冷畏寒、口舌生疮），若属肾阴亏虚、水不济火之虚烦不寐（五心烦热、盗汗），须滋水降火，用肉桂反助其热。',
      reasoning: '黄连大寒与肉桂大热同方，两药相合为什么反能安神治失眠？',
      feedback: '失眠之根在心肾不交：黄连折心火使其不炎上，肉桂温肾阳引火下行，一升一降、寒热对流，水火既济则寐安。',
      transfer: '若失眠兼见心悸自汗、舌淡脉细，交泰丸与归脾汤合用的思路是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 清热剂（027）
  // ============================================================
  {
    id: 'pb38-l-027', title: '竹叶石膏汤', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['清热剂', '竹叶石膏汤', '半夏·高风险', '甘草·高风险'],
    intent: '竹叶石膏汤的组成、方义与主治（热病后期余热未清、气津两伤证），掌握清热与益气生津并行的清补兼施法。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '《伤寒论》', canon: '辨阴阳易差后劳复病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '伤寒解后，虚羸少气，气逆欲吐，竹叶石膏汤主之' }],
    dosage: { guideline: '竹叶 15g、石膏 30g（先煎）、半夏 9g（制）、麦门冬 15g、人参 6g、甘草 3g、粳米 15g；水煎温服', caution: '石膏先煎，半夏须制用（反乌头类）；本方甘寒，湿盛中满、苔腻者忌用；热病愈后当以糜粥养胃为善后' },
    cases: null,
    stdJudgment: '竹叶石膏汤以石膏竹叶清透余热为君，麦冬人参益气养阴为臣，半夏降逆和胃、甘草粳米益胃生津为佐使，清热生津、益气和胃，主治热病后期余热未清、气津两伤之身热多汗、虚羸少气、气逆欲吐、口干喜饮、脉虚数，为清补兼施治虚热之代表方。',
    coreDefinition: '石膏竹叶清透余热，人参麦冬益气生津，半夏降逆和胃，粳米甘草养胃，主治余热未清、气津两伤之虚羸少气。',
    safety: { note: '本方为热病善后之剂，实热炽盛、苔黄厚者不宜；半夏须制用并与乌头类相反。', prohibitions: ['【高风险】方含半夏，生半夏有毒须炮制；反乌头类（附子、川乌、草乌）；孕妇慎用', '【高风险】甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '竹叶石膏汤（《伤寒论》）由竹叶、石膏、半夏、麦门冬、人参、甘草、粳米组成，功效清热生津、益气和胃，主治热病后期余热未清、气津两伤：身热汗多、虚羸少气、气逆欲吐。石膏竹叶清透余热为君，麦冬人参益气养阴为臣，半夏降逆和胃为佐，甘草粳米益胃为使；石膏先煎，病愈后以糜粥自养。',
      misjudgment: '把竹叶石膏汤当清热泻火方用于实热证。错：本方证热势已衰而气阴已伤（虚羸少气、脉虚数），若见壮热烦渴、苔黄脉洪大，为阳明实热，须白虎汤清泄，误投本方便药力不逮且碍邪外出。',
      reasoning: '竹叶石膏汤与白虎汤均用石膏，一治热病后期、一治阳明热盛，选方之际当以何为据？',
      feedback: '白虎汤证热盛津未伤、脉洪大有力，本方证热轻津气已伤、脉虚数无力，一实一虚，虚实之间定取舍。',
      transfer: '肺炎恢复期低热不退、口干乏力者，竹叶石膏汤配沙参、石斛化裁的道理是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 温里剂（028）
  // ============================================================
  {
    id: 'pb38-l-028', title: '吴茱萸汤', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['温里剂', '吴茱萸汤', '吴茱萸·小毒'],
    intent: '吴茱萸汤的组成、方义与主治（中焦虚寒、肝寒上逆之呕吐头痛），理解阳明、少阴、厥阴三经同治的温降法。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '《伤寒论》', canon: '辨厥阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '干呕，吐涎沫，头痛者，吴茱萸汤主之' }],
    dosage: { guideline: '吴茱萸 9g、人参 9g、生姜 18g、大枣 12 枚；水煎温服', caution: '吴茱萸辛热有小毒，用量 3–9g 为宜，不宜过量久服；肝胃郁热之呕吐吞酸、苔黄脉数者忌用' },
    cases: null,
    stdJudgment: '吴茱萸汤以吴茱萸温肝暖胃、降逆止呕为君，生姜温胃散寒、降逆止呕为臣，人参大枣益气补虚为佐使，温中补虚、降逆止呕，主治中焦虚寒之食谷欲呕、胃脘冷痛，厥阴寒逆之巅顶头痛、干呕吐涎沫，及少阴吐利之手足逆冷，为三经同治之温降名方。',
    coreDefinition: '吴茱萸暖肝温胃降逆，生姜散寒止呕，人参大枣补虚缓中，主治虚寒呕吐、巅顶头痛、吐利厥冷。',
    safety: { note: '吴茱萸有小毒，用量宜 3–9g 并中病即止；肝胃郁热、热盛呕逆者忌用。', prohibitions: ['吴茱萸辛热有小毒，不可过量久服；呕吐属肝胃郁热（吐酸口苦、苔黄）者忌用'] },
    learning: {
      knowledge: '吴茱萸汤（《伤寒论》）由吴茱萸、人参、生姜、大枣组成，功效温中补虚、降逆止呕，主治胃中虚寒之食谷欲呕、胃脘冷痛，厥阴寒逆之干呕、吐涎沫、巅顶头痛，少阴吐利之手足逆冷、烦躁欲死。吴茱萸温肝暖胃降逆为君，重用生姜散寒止呕为臣，人参大枣益气补中为佐使，温降并行、补泻兼施。',
      misjudgment: '见呕吐即投吴茱萸汤，不辨寒热。错：本方证呕吐多伴胃脘冷痛、得热则减、吐清涎沫，属虚寒；若吐酸苦、口苦苔黄、食入即吐，为肝胃郁热，误用吴茱萸辛热之品反助火伤津。',
      reasoning: '巅顶头痛何以用吴茱萸汤？肝经与巅顶在经络上如何关联？',
      feedback: '肝寒之气循经上犯巅顶则头痛，吴茱萸暖肝降逆，浊阴下潜则痛呕俱止，足厥阴肝经上达巅顶故也。',
      transfer: '老年眩晕呕吐属肝寒上逆者，吴茱萸汤与半夏白术天麻汤如何鉴别？',
    },
  },
  // ============================================================
  // L 方剂学 · 理气剂（029–030）
  // ============================================================
  {
    id: 'pb38-l-029', title: '旋覆代赭汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['理气剂', '旋覆代赭汤', '降逆化痰', '半夏·高风险', '甘草·高风险'],
    intent: '旋覆代赭汤的组成、方义与主治（胃气虚弱、痰浊内阻之心下痞硬噫气），理解重镇降逆与益气和中的配伍。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '《伤寒论》', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '伤寒发汗，若吐若下，解后，心下痞硬，噫气不除者，旋覆代赭汤主之' }],
    dosage: { guideline: '旋覆花 9g（包煎）、代赭石 15g（先煎）、人参 6g、生姜 15g、半夏 9g（制）、甘草 6g、大枣 12 枚；水煎温服', caution: '方含半夏须制用、反乌头类；代赭石为重镇之品，孕妇慎用；噫气属实热、胃气不虚者不宜' },
    cases: null,
    stdJudgment: '旋覆代赭汤以旋覆花下气消痰为君，代赭石重镇降逆为臣，半夏生姜化痰散结、人参甘草大枣补益胃气为佐使，降逆化痰、益气和胃，主治胃气虚弱、痰浊内阻之心下痞硬、噫气频作、或反胃呕吐、吐涎沫、苔白滑、脉弦虚，为虚实夹杂、攻补兼施之典范。',
    coreDefinition: '旋覆花消痰下气，代赭石重镇降逆，半夏生姜化痰散结，参草枣益胃补虚，主治虚气上逆之痞硬噫气。',
    safety: { note: '旋覆花有绒毛须包煎；代赭石质重碍胃，中病即止；半夏与乌头类相反。', prohibitions: ['【高风险】方含半夏，生半夏有毒须炮制；反乌头类（附子、川乌、草乌）；孕妇慎用', '【高风险】甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '旋覆代赭汤（《伤寒论》）由旋覆花、代赭石、人参、生姜、半夏、甘草、大枣组成，功效降逆化痰、益气和胃，主治胃气虚弱、痰浊内阻之胃气上逆：心下痞硬、噫气不除、反胃呕吐。旋覆花下气消痰为君，代赭石重镇降逆为臣，生姜半夏化痰散结、人参甘草大枣补益胃气为佐使；代赭石先煎、旋覆花包煎，虚人痰气并治。',
      misjudgment: '把旋覆代赭汤与橘皮竹茹汤混治呃逆噫气。错：旋覆代赭汤证噫气伴心下痞硬、苔白滑，属痰浊阻胃兼胃虚；橘皮竹茹汤证呃逆伴虚烦少气、舌红，属胃虚有热，一温降化痰、一清热降逆，寒热有别。',
      reasoning: '代赭石质重性降，何以用量反小于旋覆花，制方者如此安排用意何在？',
      feedback: '胃虚者不堪重镇峻降，代赭石小量配旋覆花轻灵下气，降而不伤中气，反以参草枣护胃，量轻义重。',
      transfer: '贲门失弛缓症之食入反出、心下痞硬者，旋覆代赭汤加刀豆、柿蒂的思路是什么？',
    },
  },
  {
    id: 'pb38-l-030', title: '暖肝煎', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['理气剂', '暖肝煎', '温肝'],
    intent: '暖肝煎的组成、方义与主治（肝肾虚寒之寒疝），掌握温补肝肾与行气散寒并行的配伍。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '当归 9g、枸杞子 9g、小茴香 6g、肉桂 3g、乌药 6g、沉香 3g（后下）、茯苓 6g、生姜 3 片；水煎温服', caution: '湿热下注之阴囊红肿热痛、疝气兼见口苦苔黄者忌用；沉香后下勿久煎' },
    cases: null,
    stdJudgment: '暖肝煎以当归枸杞子温补肝肾为君，肉桂小茴香温肾散寒为臣，乌药沉香行气止痛、茯苓渗湿、生姜散寒为佐使，温补肝肾、行气止痛，主治肝肾虚寒之小腹冷痛、疝气坠痛、睾丸偏坠、畏寒喜暖、舌淡苔白、脉沉迟，为治寒疝之效方。',
    coreDefinition: '当归枸杞温补肝肾，肉桂茴香温散寒邪，乌药沉香行气止痛，主治肝肾虚寒之寒疝、小腹冷痛。',
    safety: { note: '疝气须辨寒热虚实：本方宜肝肾虚寒之疝，湿热疝气及气滞实疝忌用。', prohibitions: [] },
    learning: {
      knowledge: '暖肝煎（《景岳全书》）由当归、枸杞子、小茴香、肉桂、乌药、沉香、茯苓、生姜组成，功效温补肝肾、行气止痛，主治肝肾虚寒之寒疝：小腹冷痛、疝气坠痛、畏寒喜暖。当归枸杞温补肝肾为君，肉桂茴香温肾散寒为臣，乌药沉香行气止痛为佐，茯苓生姜为使。',
      misjudgment: '把暖肝煎用于湿热下注之疝气肿痛。错：本方证疝痛得温则减、畏寒肢冷、苔白脉沉迟，属肝肾虚寒；若阴囊红肿灼痛、口苦苔黄，为湿热蕴结，误用肉桂茴香等温药则火势更炽。',
      reasoning: '当归枸杞为补血滋阴之品，与肉桂茴香等温散药同用，其理何在？',
      feedback: '疝之标在肝经寒凝、其本在肝肾亏虚，当归枸杞补其本、肉桂茴香散其标，温补与散寒并行，虚寒之疝乃愈。',
      transfer: '老人小腹冷痛频作而兼尿频者，暖肝煎与缩泉丸合用的道理是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 理血剂（031）
  // ============================================================
  {
    id: 'pb38-l-031', title: '通窍活血汤', category: 'formula', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['理血剂', '通窍活血汤', '麝香·孕妇禁用'],
    intent: '通窍活血汤的组成、方义与主治（瘀阻头面证），掌握活血化瘀药与麝香开窍通络的配伍。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '赤芍 3g、川芎 3g、桃仁 9g、红花 9g、老葱 3 根（切碎）、鲜姜 9g、红枣 7 枚、麝香 0.15g（绢包入煎或冲服）、黄酒 250ml；水煎温服', caution: '麝香芳香走窜、活血力峻，孕妇禁用；本方破血通窍，体虚无瘀及有出血倾向者忌用' },
    cases: null,
    stdJudgment: '通窍活血汤以赤芍川芎桃仁红花活血祛瘀为君，麝香芳香开窍通络为臣，老葱生姜通阳散寒、黄酒活血通脉为佐使，活血通窍，主治瘀阻头面之头痛头晕、耳聋日久、面色青紫、酒渣鼻、脱发及胸腹血瘀之证，为王清任逐瘀五方中通窍之专方。',
    coreDefinition: '赤芍川芎桃仁红花活血化瘀，麝香开窍通络，葱姜酒通阳行血，主治瘀阻头面之头痛、耳聋、脱发。',
    safety: { note: '麝香为名贵香药，入煎宜绢包、或研末冲服以保全药力；孕妇及出血倾向者禁用。', prohibitions: ['【高风险】方含麝香，芳香走窜，孕妇禁用'] },
    learning: {
      knowledge: '通窍活血汤（《医林改错》）由赤芍、川芎、桃仁、红花、老葱、鲜姜、红枣、麝香、黄酒组成，功效活血通窍，主治瘀阻头面：头痛如刺、耳聋、脱发、面青。赤芍川芎桃仁红花活血为君，麝香开窍通络为臣，葱姜黄酒通阳行血为佐使，麝香研末冲服或绢包煎。',
      misjudgment: '把通窍活血汤用于气虚血瘀之头痛。错：本方证头痛如刺、固定不移、面色暗滞，属瘀血实邪阻窍；若头痛绵绵、遇劳加重、神疲乏力，为气虚血瘀，宜补阳还五汤或益气活血之剂，破血通窍反耗正气。',
      reasoning: '麝香药价昂贵、药力峻猛，在通窍活血汤中究竟起什么不可替代的作用？',
      feedback: '麝香辛香走窜、通经开窍之力为诸药之冠，引活血药上行入脑络，瘀血得化、窍络得通，头痛耳聋方解。',
      transfer: '外伤后头痛如刺日久不愈者，通窍活血汤与血府逐瘀汤如何区别选用？',
    },
  },
  // ============================================================
  // L 方剂学 · 祛风剂（032）
  // ============================================================
  {
    id: 'pb38-l-032', title: '独活寄生汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['祛风剂', '独活寄生汤', '痹证', '细辛·高风险', '甘草·高风险'],
    intent: '独活寄生汤的组成、方义与主治（痹证日久、肝肾两亏、气血不足证），理解祛邪与扶正并行的治痹大法。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '独活 9g、桑寄生 18g、杜仲 9g、牛膝 9g、细辛 3g、秦艽 9g、茯苓 9g、肉桂心 3g、防风 9g、川芎 9g、人参 6g、甘草 6g、当归 9g、芍药 9g、干地黄 9g；水煎温服', caution: '细辛煎剂 1–3g、散剂 0.5–1g，过量可致中毒，反藜芦；湿热痹证（关节红肿灼痛、苔黄腻）忌用' },
    cases: null,
    stdJudgment: '独活寄生汤以独活祛下焦风寒湿邪为君，桑寄生杜仲牛膝补肝肾强筋骨为臣，细辛秦艽防风祛风散寒、四物辈养血活血、人参茯苓甘草益气健脾为佐使，祛风湿、止痹痛、益肝肾、补气血，主治痹证日久、肝肾两亏之腰膝冷痛、屈伸不利、舌淡苔白、脉细弱，为治久痹正虚之代表方。',
    coreDefinition: '独活祛下焦风湿，桑寄生杜仲牛膝补肝肾强筋骨，细辛防风散寒，参苓草益气，归芍地养血，主治肝肾两亏之痹痛。',
    safety: { note: '本方补益与祛邪并重，湿热痹及急性风湿热（关节红肿灼热）忌用；细辛剂量须守红线。', prohibitions: ['【高风险】细辛煎剂 1–3g、散剂 0.5–1g；过量可致中毒；反藜芦', '【高风险】甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '独活寄生汤（《备急千金要方》）由独活、桑寄生、杜仲、牛膝、细辛、秦艽、茯苓、肉桂心、防风、川芎、人参、甘草、当归、芍药、干地黄组成，功效祛风湿、止痹痛、益肝肾、补气血，主治痹证日久、肝肾两亏、气血不足：腰膝冷痛、肢节屈伸不利、畏寒喜暖。独活寄生为君，杜仲牛膝补肝肾、细辛秦艽防风祛风散寒为臣，四物养血、参苓草益气为佐使。',
      misjudgment: '把独活寄生汤当通用祛风止痛方，不辨久痹正虚之机。错：本方证痹痛多年、腰膝酸软、心悸短气、舌淡脉细，为邪恋正虚；若痹证初起、体壮邪实，当以祛风散寒除湿为先，过早投用本方则补而留邪。',
      reasoning: '同是治痹，独活寄生汤为何要配伍大量补肝肾养气血之品？',
      feedback: '久痹则肝肾气血俱亏，邪气久踞，祛邪不扶正则邪去正难复，补益肝肾气血与祛风湿并施，邪正两顾。',
      transfer: '类风湿关节炎后期关节变形、腰膝酸软者，独活寄生汤合益肾壮骨之品化裁的依据是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 补益剂（033）
  // ============================================================
  {
    id: 'pb38-l-033', title: '地黄饮子', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['补益剂', '地黄饮子', '滋阴温阳', '附子·高风险'],
    intent: '地黄饮子的组成、方义与主治（下元虚衰、痰浊上泛之喑痱），理解阴阳并补、开窍化痰的「上下并治」法。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '熟地黄 12g、巴戟天 9g、山茱萸 9g、石斛 9g、肉苁蓉 9g、炮附子 6g（先煎）、五味子 6g、肉桂 3g、白茯苓 9g、麦门冬 9g、石菖蒲 6g、远志 6g，加薄荷、生姜、大枣；水煎温服', caution: '附子须炮制、先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用；阴虚火旺、痰火内盛之喑痱不宜' },
    cases: null,
    stdJudgment: '地黄饮子以熟地山茱萸石斛麦冬五味滋阴补肾为君，巴戟天肉苁蓉附子肉桂温补肾阳为臣，石菖蒲远志茯苓化痰开窍、薄荷生姜利咽为佐使，滋肾阴、补肾阳、开窍化痰，主治下元虚衰、痰浊上泛之喑痱：舌强不能言、足废不能用、口干不欲饮、脉沉细弱，为阴阳双补、上下并治之名方。',
    coreDefinition: '熟地萸肉麦冬五味滋肾阴，巴戟苁蓉附桂温肾阳，菖蒲远志化痰开窍，主治下元虚衰之喑痱舌强足废。',
    safety: { note: '本方温润并用，阴虚火旺、痰火内盛及肝阳上亢者忌用；附子炮制先煎为用方前提。', prohibitions: ['【高风险】附子须炮制、先煎久煎至无麻辣感；反半夏、瓜蒌、贝母、白蔹、白及；孕妇禁用'] },
    learning: {
      knowledge: '地黄饮子（《宣明论方》）由熟地黄、巴戟天、山茱萸、石斛、肉苁蓉、附子、五味子、肉桂、白茯苓、麦门冬、石菖蒲、远志组成，功效滋肾阴、补肾阳、开窍化痰，主治下元虚衰、痰浊上泛之喑痱：舌强不能言、足废不能用、口干不欲饮。熟地山茱萸麦冬五味滋肾阴，巴戟苁蓉附桂温肾阳，菖蒲远志茯苓化痰开窍，薄荷生姜利咽为引。',
      misjudgment: '把地黄饮子用于肝阳上亢之猝然舌强不语、半身不遂。错：本方证喑痱为下元虚衰、痰浊上泛，发病较缓、兼腰膝酸软、脉沉细；若猝然昏仆、舌强不语伴面赤眩晕、脉弦有力，属肝阳化风，误用温补则火上添油。',
      reasoning: '同为舌强不能言，地黄饮子证与中风之中脏腑、中经络如何鉴别？',
      feedback: '中脏腑实证多猝然昏仆、面赤脉弦，地黄饮子证无昏仆而病势缓、脉沉细弱，虚与实、缓与急是为大别。',
      transfer: '脑梗死恢复期之言语謇涩、足痿不用属下元虚衰者，地黄饮子合黄芪、当归化裁的机理是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 理血剂（034–035）
  // ============================================================
  {
    id: 'pb38-l-034', title: '桃核承气汤', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['理血剂', '桃核承气汤', '破瘀泻热', '芒硝·孕妇禁用', '甘草·高风险'],
    intent: '桃核承气汤的组成、方义与主治（下焦蓄血之瘀热互结证），理解「破血下瘀」及表证未解先解表之次序。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '《伤寒论》', canon: '辨太阳病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '太阳病不解，热结膀胱，其人如狂……外解已，但少腹急结者，乃可攻之，宜桃核承气汤' }],
    dosage: { guideline: '桃仁 12g、大黄 12g、桂枝 6g、甘草 6g、芒硝 6g（冲服）；水煎温服', caution: '方含芒硝泻下峻猛，孕妇禁用；本方攻下力强，体虚、老人及月经期慎用，中病即止；表证未解者先解表后攻里' },
    cases: null,
    stdJudgment: '桃核承气汤以桃仁破血祛瘀为君，大黄苦寒泻热逐瘀为臣，桂枝温通血脉、引药直达下焦，芒硝软坚泻热、甘草护胃缓急为佐使，破血下瘀、泻热，主治下焦蓄血之瘀热互结证：少腹急结、小便自利、其人如狂、至夜发热、脉沉实，须表解而后攻里。',
    coreDefinition: '桃仁破瘀，大黄芒硝泻热逐瘀，桂枝温通血脉，主治下焦蓄血之少腹急结、如狂、至夜发热。',
    safety: { note: '本方攻逐之力峻猛，孕妇禁用，体虚者慎用；下后中病即止，不可过剂。', prohibitions: ['【高风险】方含芒硝泻下峻猛，孕妇禁用；中病即止，不可过剂', '【高风险】甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '桃核承气汤（《伤寒论》）由桃仁、大黄、桂枝、甘草、芒硝组成，功效破血下瘀、泻热，主治下焦蓄血之瘀热互结：少腹急结、小便自利、其人如狂、至夜发热、脉沉实。桃仁破瘀为君，大黄泻热逐瘀为臣，桂枝温通血脉、引药入下焦为佐，芒硝软坚泻热、甘草缓急为使；表证未解当先解外，外解已乃可攻之，芒硝冲服。',
      misjudgment: '见狂躁便结即用桃核承气汤，不辨蓄血与蓄水。错：本方证须少腹急结而小便自利，为血结而非水结；若小便不利而少腹满，属蓄水证，当化气行水，误用本方则诛伐无过。',
      reasoning: '桂枝辛温，何以出现在破瘀泻热之峻下剂中？',
      feedback: '桂枝在此不取发汗而取温通血脉，与大黄芒硝寒热相济，使瘀血得温则行、随泻而解，此寒因热用之法。',
      transfer: '急性盆腔炎之少腹刺痛、发热便秘属瘀热互结者，桃核承气汤化裁应用的思路是什么？',
    },
  },
  {
    id: 'pb38-l-035', title: '少腹逐瘀汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['理血剂', '少腹逐瘀汤', '温经止痛'],
    intent: '少腹逐瘀汤的组成、方义与主治（少腹寒凝血瘀之痛经、不孕），掌握温经散寒与活血祛瘀并用法。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '小茴香 1.5g、干姜 3g、延胡索 3g、没药 6g、当归 9g、川芎 3g、肉桂 3g、赤芍 6g、蒲黄 9g、五灵脂 6g；水煎温服', caution: '本方温通力强，孕妇禁用；月经过多、阴虚内热及热性痛经者忌用' },
    cases: null,
    stdJudgment: '少腹逐瘀汤以小茴香肉桂干姜温经散寒为君，当归川芎赤芍养血活血、蒲黄五灵脂没药延胡索化瘀止痛为臣，温经散寒、活血祛瘀、止痛，主治寒凝血瘀之少腹积块疼痛、痛经、经色紫黑有块、月经不调及不孕，为治宫寒血瘀之专方。',
    coreDefinition: '小茴香肉桂干姜温散下焦寒邪，蒲黄五灵脂没药延胡索化瘀止痛，主治少腹寒凝血瘀之痛经、不孕。',
    safety: { note: '本方为王清任治少腹寒瘀之要方，药性温通，实热证及出血量多者忌用。', prohibitions: ['孕妇禁用（活血温通，胎前当禁）'] },
    learning: {
      knowledge: '少腹逐瘀汤（《医林改错》）由小茴香、干姜、延胡索、没药、当归、川芎、肉桂、赤芍、蒲黄、五灵脂组成，功效活血祛瘀、温经止痛，主治寒凝血瘀之少腹疼痛、痛经、月经不调、经色紫黑有块、不孕。茴香肉桂干姜温经散寒为君，蒲黄五灵脂没药延胡索化瘀止痛为臣，当归川芎赤芍养血活血为佐。',
      misjudgment: '把少腹逐瘀汤用于热性痛经。错：本方证痛经得温则减、经色紫黑有块、畏寒肢冷，属寒凝血瘀；若经期腹痛拒按、经色鲜红、舌红苔黄，为血热瘀滞，误用肉桂干姜等温药反助火动血。',
      reasoning: '痛经有寒凝与血热之别，少腹逐瘀汤凭什么指征辨识寒凝血瘀之痛经？',
      feedback: '寒凝之痛经多喜温熨、得热痛减、经色紫暗有块，舌淡暗苔白；血热者经色鲜红、舌红苔黄，以此为辨。',
      transfer: '婚后久不孕而见小腹冷痛、经行有块者，少腹逐瘀汤温经化瘀助孕的机理是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 祛湿剂（036–037）
  // ============================================================
  {
    id: 'pb38-l-036', title: '附子汤', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['祛湿剂', '附子汤', '附子·高风险'],
    intent: '附子汤的组成、方义与主治（阳虚寒湿之身痛骨节痛），掌握温经助阳与祛寒除湿并用法。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'classic_original', sourceTitle: '《伤寒论》', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [{ label: '《伤寒论》', canon: '辨少阴病脉证并治', chapter: '', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified', originalText: '少阴病，得之一二日，口中和，其背恶寒者，当灸之，附子汤主之' }],
    dosage: { guideline: '炮附子 15g（先煎久煎）、茯苓 9g、人参 6g、白术 12g、芍药 9g；水煎温服', caution: '附子须炮制、先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用；热痹关节红肿热痛者忌用' },
    cases: null,
    stdJudgment: '附子汤以炮附子温肾助阳、祛寒止痛为君，人参补气助阳为臣，白术茯苓健脾燥湿、芍药和营止痛为佐使，温经助阳、祛寒除湿，主治阳虚寒湿之身体骨节疼痛、背恶寒、手足寒、口中和、脉沉微，为少阴虚寒夹湿之正方。',
    coreDefinition: '附子温肾助阳祛寒，人参补气，白术茯苓燥湿健脾，芍药和营止痛，主治阳虚寒湿之骨节痛、背恶寒。',
    safety: { note: '附子为有毒之品，务必炮制先煎久煎；本方与真武汤同用附子术苓芍，但更重温补以祛寒湿。', prohibitions: ['【高风险】附子须炮制、先煎久煎至无麻辣感；反半夏、瓜蒌、贝母、白蔹、白及；孕妇禁用'] },
    learning: {
      knowledge: '附子汤（《伤寒论》）由炮附子、茯苓、人参、白术、芍药组成，功效温经助阳、祛寒除湿，主治阳虚寒湿之身体骨节疼痛、背恶寒、手足寒、口中不渴。附子温肾散寒止痛为君，人参补气助阳为臣，白术茯苓健脾燥湿、芍药和营止痛为佐使，煎服时附子须炮制、先煎久煎。',
      misjudgment: '把附子汤与真武汤混用。错：真武汤治阳虚水泛之水气病（水肿、心悸、头眩、身瞤动），以利水为主；附子汤治阳虚寒湿之身痛骨节痛，以温补祛寒为主，两方虽药味相近而主治不同。',
      reasoning: '附子汤与真武汤同为附子术苓芍之伍，为何一治身痛一治水肿？',
      feedback: '附子汤去生姜加人参，重在温补阳气以祛寒湿之痛；真武汤加生姜，重在温散水气以治水泛之证，一痛一水、一补一散。',
      transfer: '阳虚体质之腰背冷痛、遇寒加重者，附子汤与独活寄生汤如何择用？',
    },
  },
  {
    id: 'pb38-l-037', title: '实脾散', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['祛湿剂', '实脾散', '附子·高风险', '甘草·高风险'],
    intent: '实脾散的组成、方义与主治（阳虚水泛之阴水），掌握温阳健脾与行气利水并行之法。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '厚朴 6g、白术 6g、木瓜 6g、木香 6g、草果仁 6g、大腹子 6g、炮附子 6g、白茯苓 6g、炮干姜 6g、炙甘草 3g，加生姜 5 片、大枣 1 枚；水煎温服', caution: '附子须炮制、先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用；阳水（湿热或风水之肿）忌用' },
    cases: null,
    stdJudgment: '实脾散以炮附子干姜温脾肾之阳为君，白术茯苓健脾渗湿为臣，厚朴木香草果大腹子行气导滞、木瓜祛湿利水为佐，甘草和中为使，温阳健脾、行气利水，主治阳虚水泛之阴水：身半以下肿甚、手足不温、口不渴、胸腹胀满、大便溏薄、苔白腻、脉沉迟，为「温阳实脾以制水」之代表方。',
    coreDefinition: '附子干姜温脾肾阳，白术茯苓健脾渗湿，厚朴木香草果行气利水，主治阳虚水泛之阴水浮肿。',
    safety: { note: '阴水治在温运脾阳、行气利水，阳水实证忌用；附子之炮制与先煎久煎为用方前提。', prohibitions: ['【高风险】附子须炮制、先煎久煎至无麻辣感；反半夏、瓜蒌、贝母、白蔹、白及；孕妇禁用', '【高风险】甘草反海藻、大戟、甘遂、芫花；大剂量久服可致水肿、血压升高'] },
    learning: {
      knowledge: '实脾散（《重订严氏济生方》）由厚朴、白术、木瓜、木香、草果仁、大腹子、炮附子、茯苓、炮干姜、炙甘草组成，加生姜大枣，功效温阳健脾、行气利水，主治阳虚水泛之阴水：身半以下肿甚、手足不温、便溏、苔白腻。附子干姜温脾肾阳为君，白术茯苓健脾渗湿、厚朴木香草果大腹子行气导滞为臣佐，附子须先煎久煎。',
      misjudgment: '把实脾散用于湿热壅盛之阳水。错：本方证水肿以下半身为甚、手足不温、口不渴、便溏苔白腻，属脾肾阳虚之阴水；若肿势急骤、烦热口渴、苔黄腻，为湿热阳水，误用附子干姜则热势更张。',
      reasoning: '「气行则水行」，实脾散为何在温阳健脾之外重用厚朴木香草果等行气药？',
      feedback: '水湿内停必碍气机，气滞则水聚，行气以助水行、气化则水自消，故行气与温阳健脾三管齐下。',
      transfer: '慢性肾炎水肿属脾肾阳虚者，实脾散与真武汤如何区别选用？',
    },
  },
  // ============================================================
  // L 方剂学 · 清热剂（038）
  // ============================================================
  {
    id: 'pb38-l-038', title: '犀角地黄汤', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['清热剂', '犀角地黄汤', '凉血解毒', '血热动血'],
    intent: '犀角地黄汤的组成、方义与主治（热入血分之血热动血证），理解凉血与散瘀并用的「治血四法」及犀角替代用药。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '水牛角 30g（锉碎先煎，原方犀角）、生地黄 24g、芍药 12g、牡丹皮 9g；水煎温服', caution: '本方寒凉，脾胃虚寒、便溏者忌用；犀角已依法禁用，临床以水牛角替代并增大剂量、先煎久煎' },
    cases: null,
    stdJudgment: '犀角地黄汤以水牛角清心凉血、解毒散瘀为君，生地黄凉血养阴为臣，芍药和营泄热、牡丹皮凉血散瘀为佐使，清热解毒、凉血散瘀，主治热入血分之血热动血证：身热谵语、斑疹紫黑、吐血衄血便血、舌绛起刺、脉细数，为温病血分证之代表方。',
    coreDefinition: '水牛角凉血解毒散瘀，生地滋阴凉血，芍药和营泄热，丹皮凉血散瘀，主治热入血分之斑疹吐衄、舌绛神昏。',
    safety: { note: '犀角为国家禁用之珍稀药材，临床均以水牛角替代，用量宜大、先煎久煎；血分实热方宜，气虚不摄血之出血忌用。', prohibitions: [] },
    learning: {
      knowledge: '犀角地黄汤（《备急千金要方》）由犀角（今以水牛角代）、生地黄、芍药、牡丹皮组成，功效清热解毒、凉血散瘀，主治热入血分之血热动血：身热、神昏谵语、斑色紫黑、吐衄便血、舌绛起刺。水牛角清心凉血解毒为君，生地凉血养阴为臣，芍药和营泄热、丹皮凉血散瘀为佐使，凉血而兼散瘀，血止而不留瘀。',
      misjudgment: '把犀角地黄汤用于气虚不摄之出血。错：本方证出血伴身热、斑紫黑、舌绛，属血热妄行；若血溢而面色㿠白、神疲肢冷、舌淡脉细，为气虚不摄，须益气摄血，误用寒凉则阳气愈伤。',
      reasoning: '凉血药常防留瘀，犀角地黄汤为何在凉血之外还要配伍丹皮芍药等散瘀之品？',
      feedback: '热与血搏则成瘀，瘀不去则热不净、血不复，凉血与散瘀并举，使热清血宁而瘀散，此凉血散瘀之要义。',
      transfer: '热毒型血小板减少之皮肤瘀斑、齿衄鼻衄者，犀角地黄汤配紫草、白茅根化裁的机理是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 理气剂（039）
  // ============================================================
  {
    id: 'pb38-l-039', title: '天台乌药散', category: 'formula', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['理气剂', '天台乌药散', '行气散寒', '巴豆·制霜'],
    intent: '天台乌药散的组成、方义与主治（寒凝气滞之小肠疝气），理解巴豆同炒川楝子之炮制用意。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '天台乌药 12g、木香 6g、小茴香 6g、青皮 6g、高良姜 9g、槟榔 9g、川楝子 12g、巴豆 70 粒（与川楝子同炒黑、去巴豆不用）；共研细末，每服 3g，温酒送下', caution: '巴豆有大毒，只作炮制辅料、炒后弃去不用，成品方中不含巴豆；孕妇及湿热疝气忌用' },
    cases: null,
    stdJudgment: '天台乌药散以乌药行气疏肝、散寒止痛为君，木香小茴香青皮高良姜行气散寒为臣，槟榔下气破滞、川楝子与巴豆同炒后入药以苦寒泄热为佐使，行气疏肝、散寒止痛，主治寒凝气滞之小肠疝气：少腹引控睾丸而痛、偏坠肿胀、舌淡苔白、脉沉弦，为治寒疝气痛之要方。',
    coreDefinition: '乌药行气疏肝散寒，木香茴香青皮良姜行气止痛，槟榔川楝子下气，主治寒凝气滞之疝气少腹引睾痛。',
    safety: { note: '巴豆有毒，方中仅作炮制辅料（与川楝子同炒后去巴豆），成品不含巴豆，但炮制须依法；湿热疝气及气滞无寒者忌用。', prohibitions: ['炮制辅料巴豆有大毒，须炒黑弃去巴豆不用，成品方中不得含巴豆'] },
    learning: {
      knowledge: '天台乌药散（《医学发明》）由天台乌药、木香、小茴香、青皮、高良姜、槟榔、川楝子、巴豆组成，功效行气疏肝、散寒止痛，主治寒凝气滞之小肠疝气：少腹引控睾丸痛、偏坠。乌药行气疏肝为君，木香茴香青皮良姜行气散寒为臣，槟榔下气、川楝子与巴豆同炒后入药为佐使；炮制上以巴豆辛热制川楝子苦寒，炒后去巴豆不用。',
      misjudgment: '把天台乌药散与暖肝煎混治疝痛。错：天台乌药散证为寒凝气滞之实证疝痛（痛而胀、拒按、脉沉弦），暖肝煎证为肝肾虚寒之疝（痛势缓、喜暖喜按、脉沉迟），一以行气散寒攻实、一以温补肝肾治虚。',
      reasoning: '川楝子苦寒，何以要用大毒之巴豆同炒而后弃巴豆？',
      feedback: '借巴豆辛热之性制川楝子苦寒，免其伤阳，又存其入肝经行气泄热之功，两药相制为用，去巴豆而留其气，此炮制之妙。',
      transfer: '疝气术后阴囊坠胀冷痛者，天台乌药散去槟榔加荔枝核、橘核的思路是什么？',
    },
  },
  // ============================================================
  // L 方剂学 · 痈疡剂（040）
  // ============================================================
  {
    id: 'pb38-l-040', title: '阳和汤', category: 'formula', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['痈疡剂', '阳和汤', '温阳散寒', '麻黄·慎用'],
    intent: '阳和汤的组成、方义与主治（阳虚寒凝之阴疽），理解「阳和通腠、温补托里」及阴证忌用寒凉之理。',
    facts: [
      { field: 'formula.fangyuan', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zuocheng', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.gongxiao', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.zhuzhi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.fangyi', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'formula.jiliang', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '熟地黄 30g、肉桂 3g（研末冲服或后下）、麻黄 2g、鹿角胶 9g（烊化）、白芥子 6g、姜炭 2g、生甘草 3g；水煎温服', caution: '本方温补托里，疮疡红肿热痛之阳证忌用；麻黄辛散，虚人、高血压、心脏病者慎用，运动员禁用；阴虚火旺者忌用' },
    cases: null,
    stdJudgment: '阳和汤以熟地黄温补营血为君，鹿角胶生精益髓、助阳为臣，肉桂姜炭温阳散寒、麻黄开腠理以达邪、白芥子祛皮里膜外之痰为佐，甘草调和为使，温阳补血、散寒通滞，主治阴疽：漫肿无头、皮色不变、酸痛无热、口不渴、舌淡苔白、脉沉细，为治阴证疮疡之要方。',
    coreDefinition: '熟地鹿胶温补精血，肉桂姜炭温阳散寒，麻黄开腠达邪，白芥子祛痰，主治阳虚寒凝之阴疽漫肿无头。',
    safety: { note: '阴疽贵在温托，阳证疮疡（红肿热痛）万不可用；麻黄量小取其开腠，虚人、高血压、心脏病者慎用。', prohibitions: ['方含麻黄，体虚多汗、高血压、心脏病、失眠者慎用；运动员禁用', '疮疡红肿热痛之阳证忌用本方'] },
    learning: {
      knowledge: '阳和汤（《外科证治全生集》）由熟地黄、肉桂、麻黄、鹿角胶、白芥子、姜炭、生甘草组成，功效温阳补血、散寒通滞，主治阳虚寒凝之阴疽：漫肿无头、皮色不变、酸痛无热、舌淡苔白。重用熟地温补营血为君，鹿角胶助阳生髓为臣，姜炭肉桂温阳散寒、麻黄开腠达邪、白芥子祛皮里膜外之痰为佐使；麻黄用量宜小（2–3g），与熟地相配补而不滞、散而不耗。',
      misjudgment: '把阳和汤用于阳证疮疡之红肿热痛。错：阳和汤专治阴疽之漫肿无头、皮色不变、不红不热，若疮疡红肿灼痛、脓黄稠、舌红苔黄，属阳证热毒，须清热解毒，误用肉桂麻黄等温散则火上加油。',
      reasoning: '麻黄辛散走表，为何在温补为主的阳和汤中只取小量？',
      feedback: '少量麻黄借其辛散开腠理，使寒凝之邪有外出之路，又与熟地相配制其滋腻，补散相因、以通为和，故名「阳和」。',
      transfer: '慢性骨髓炎之窦道流清稀脓液、久不敛口属阴证者，阳和汤配黄芪、当归托毒生肌的机理是什么？',
    },
  },
];
