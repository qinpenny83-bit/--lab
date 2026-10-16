// ============================================================
// 杏林大典 · Phase 5 · Batch-32 · 样本 Part AG1（AG 综合医案·试炼 10 节点 pb32-ag-001 ~ pb32-ag-010）
// 学科：AG 综合医案·试炼；覆盖：感冒/咳嗽/喘证/心悸/胸痹/不寐/胃痛/呕吐/泄泻/便秘
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「试炼·医案·主题」式，每节点一例完整医案式辨治
// facts 每节点 4-6 条，sourceTitle 限定：《中医内科学》规划教材 / 《方剂学》规划教材 /
//   《伤寒论》规划教材 / 《金匮要略》规划教材，status 一律 'verified'
// classics 一律整书名 label（《素问》《伤寒论》《金匮要略》），篇名入 chapter，
//   originalText 逐字核对，sourceType:'classic_original'，status:'verified'，均已在 classic-patch.mjs 收录
// dosage 一律填写 guideline/caution，剂量与《中国药典》及规划教材通行表述一致
// 高危药红线按 authoring-spec 第 4 节表：麻黄/细辛/半夏/甘草
// safety.note 一律含「知识学习内容，不构成诊疗建议；临床操作须遵医嘱」，
//   涉及高危药及急危重证（胸痹真心痛、喘促危象）另加禁忌与警戒
// 难度分布：简单 3（diff 1）/ 中等 3（diff 2）/ 困难 3（diff 3）/ 易混 1（diff 4）
//   （与 PART_AG2 合计：简单 6 / 中等 6 / 困难 4 / 易混 2 / 综合推理 2）
// ============================================================

export const PART_AG1 = [
  // ============================================================
  // AG 综合医案 · 感冒/咳嗽/喘证（001–003）
  // ============================================================
  {
    id: 'pb32-ag-001', title: '试炼·医案·感冒表寒里热辨治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['感冒', '表寒里热', '大青龙汤', '麻黄', '烦躁'],
    intent: '通过恶寒发热、无汗而烦躁的医案，训练表寒里热证的辨析，掌握大青龙汤解表清里并用的组方逻辑。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.调护', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《伤寒论》', canon: '《伤寒论》', chapter: '辨太阳病脉证并治', originalText: '太阳中风，脉浮紧，发热恶寒，身疼痛，不汗出而烦躁者，大青龙汤主之。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '大青龙汤：麻黄6~12g（先煎去沫）、桂枝6g、炙甘草6g、杏仁9g、生石膏20~30g（先煎）、生姜9g、大枣6枚。水煎，日1剂分2~3次温服，取遍身微汗。', caution: '麻黄发汗力强，表虚自汗、体虚者慎用，高血压、心脏病、失眠者慎用，运动员禁用；服药后微汗即止，不可过汗，恐亡阳伤津；石膏量大须先煎，脾胃虚寒者酌减。' },
    cases: null,
    stdJudgment: '恶寒发热、身痛、不汗出而烦躁，苔薄黄、脉浮紧而数，此表寒未解、郁热已生，寒热错杂并见。单用辛温则助热伤津，纯投寒凉则冰伏表邪，故以麻黄桂枝发汗解表、石膏清透里热，一散一清，方为大青龙汤之正治。',
    coreDefinition: '表寒里热证以恶寒发热、无汗、身痛、烦躁为特征，治以解表清里，方用大青龙汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。服药取微汗，中病即止，过汗者当急予温养。', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '医案主症恶寒发热并见、身痛无汗、烦躁不宁、口渴；舌苔薄白或薄黄，脉浮紧而数。辨证风寒束表、里有郁热，肺气不宣、热不得泄。治法解表散寒、兼清里热。主方大青龙汤：麻黄配桂枝解表散寒，石膏清透里热，杏仁宣降肺气，姜枣草调和营卫。调护药后覆被取微汗，汗出避风，多饮温水，忌再受凉。',
      misjudgment: '把烦躁口渴误作纯里热，径投白虎汤类清气分，却忽略恶寒无汗之表证，冰伏表邪反令寒热不罢。',
      reasoning: '大青龙汤与麻黄汤仅差一味石膏，为何一治喘一治烦躁？',
      feedback: '麻黄汤表实无热，纯用辛温；大青龙汤表实兼里热，加石膏清透。烦躁一症，正是辨表寒里热的关键眼目。',
      transfer: '夏季贪凉吹空调后恶寒无汗、身热烦躁者，试分析可否按表寒里热立法用药。',
    },
  },
  {
    id: 'pb32-ag-002', title: '试炼·医案·咳嗽外寒内饮辨治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['咳嗽', '外寒内饮', '小青龙汤', '麻黄', '细辛', '半夏'],
    intent: '通过咳嗽痰多清稀泡沫伴形寒背冷的医案，训练外寒内饮证的辨析，掌握小青龙汤解表化饮、散收并用的配伍。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
      { field: 'clinical.调护', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《伤寒论》', canon: '《伤寒论》', chapter: '辨太阳病脉证并治', originalText: '伤寒表不解，心下有水气，干呕发热而咳，或渴，或利，或噎，或小便不利、少腹满，或喘者，小青龙汤主之。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '小青龙汤：麻黄6~9g（先煎去沫）、桂枝6g、干姜6g、细辛3g、制半夏9g、五味子6g、白芍9g、炙甘草6g。水煎，日1剂分2次温服。', caution: '细辛煎剂1~3g、散剂0.5~1g，过量可致中毒，反藜芦；半夏生品有毒须炮制，反乌头类；麻黄峻汗，虚人、高血压、心脏病者慎用；干咳无痰、痰黄黏稠之热咳忌用本方。' },
    cases: null,
    stdJudgment: '咳嗽气喘、痰多清稀呈泡沫状、形寒背冷，或兼恶寒发热无汗，苔白滑、脉浮紧或弦滑，此为外寒引动内饮、水寒射肺。解表散寒与温肺化饮并进，小青龙汤麻黄桂枝解表、干姜细辛半夏温化水饮、五味子白芍敛肺和营，散中有收方不耗气。',
    coreDefinition: '外寒内饮证以咳嗽痰多清稀泡沫、形寒背冷、苔白滑为特征，治以解表散寒、温肺化饮，方用小青龙汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。含麻黄、细辛、半夏三味红线药，须严格控制剂量与煎法。', prohibitions: ['【高风险】细辛煎剂1-3g散剂0.5-1g，过量可致中毒；反藜芦', '麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '医案主症咳嗽气喘、痰多清稀泡沫、形寒背冷、口不渴，或见恶寒发热无汗；苔白滑，脉浮紧或弦滑。辨证外寒引动内饮、水寒射肺、肺失宣降。治法解表散寒、温肺化饮。主方小青龙汤：麻黄桂枝发汗解表，干姜细辛半夏温肺化饮，五味子白芍敛肺和营，散中有收。调护避风寒、忌生冷，背冷者注意保暖。',
      misjudgment: '见咳嗽痰稀即投温补，忽略外寒之表证，反留邪闭肺；或把清稀泡沫痰当虚寒久咳专事温补，不知外寒不解则饮邪难化。',
      reasoning: '小青龙汤以辛散为主，为何配伍五味子、白芍两味收敛之品？',
      feedback: '久咳肺气易散，且辛温药发散力猛，五味子白芍敛肺和营以制其性，散收相济，咳止而不伤正。',
      transfer: '慢性支气管炎遇冷即咳、痰多泡沫者，试按外寒内饮思路分析其反复发作之理。',
    },
  },
  {
    id: 'pb32-ag-003', title: '试炼·医案·喘证肾虚不纳辨治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['喘证', '肾虚不纳', '金匮肾气丸', '参蛤散', '附子'],
    intent: '通过动则喘甚、呼多吸少的医案，训练肾虚不纳证的辨析，掌握补肾纳气法及金匮肾气丸合参蛤散的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '逆调论篇第三十四', originalText: '夫不得卧，卧则喘者，是水气之客也；夫水者，循津液而流也；肾者水脏，主津液，主卧与喘也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '金匮肾气丸合参蛤散：熟地黄15g、山药15g、山茱萸9g、泽泻9g、茯苓12g、牡丹皮9g、桂枝6g、附子6g（先煎久煎）、人参6g（另煎兑入）、蛤蚧粉3g（冲服）。水煎，日1剂分2次温服。', caution: '附子须炮制、先煎久煎至无麻辣感，反半夏瓜蒌贝母白蔹白及，孕妇禁用；蛤蚧研末冲服效佳；喘促急性加重、唇紫、大汗、烦躁者属喘脱危象，须立即就医。' },
    cases: null,
    stdJudgment: '喘促日久、呼多吸少、动则益甚、气不得续、腰膝酸软、夜尿频多，舌淡苔白、脉沉细，此久病及肾、肾失摄纳。喘之标在肺、本在肾，金匮肾气丸温肾助阳、参蛤散益气纳气，一温一补一纳，使气归下元，喘促方减。',
    coreDefinition: '肾虚不纳证以呼多吸少、动则喘甚、气不得续、腰膝酸软为特征，治以补肾纳气，方用金匮肾气丸合参蛤散。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。含附子，须先煎久煎；喘脱危象须立即急诊。', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '急症须立即就医，本节点仅知识学习'] },
    learning: {
      knowledge: '医案主症喘促日久、呼多吸少、动则喘甚、气不得续、腰膝酸软、夜尿频多、面青肢冷；舌淡苔白，脉沉细。辨证久病及肾、肾失摄纳、气浮于上。治法补肾纳气。主方金匮肾气丸合参蛤散：肾气丸温补肾阳，人参蛤蚧益气纳气定喘。调护节房事、适劳逸、防外感，喘作时静养勿动。',
      misjudgment: '动则喘甚、呼多吸少之虚喘，误作痰浊壅肺而用降气破气之剂，愈耗肾气、喘反加重；或见脉沉细仍投辛散宣肺之品。',
      reasoning: '同为喘证，为何肾虚不纳证治肺无效而治肾立效？',
      feedback: '肺主出气、肾主纳气，肾虚则摄纳无权、气浮于上，故补肾纳气使气归丹田，呼吸乃复，此即治喘求本之义。',
      transfer: '老年慢阻肺患者动则气促、腰酸尿频，试按肾不纳气拟定长期调补方向。',
    },
  },
  // ============================================================
  // AG 综合医案 · 心悸/胸痹/不寐（004–006）
  // ============================================================
  {
    id: 'pb32-ag-004', title: '试炼·医案·心悸心血不足辨治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['心悸', '心血不足', '归脾汤', '益气养血'],
    intent: '通过心悸失眠、面色少华的医案，训练心血不足证的辨析，掌握归脾汤益气补血、健脾养心的组方。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痹论篇第四十三', originalText: '心痹者，脉不通，烦则心下鼓，暴上气而喘，嗌干善噫，厥气上则恐。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '归脾汤：党参15g、黄芪15g、白术12g、茯神12g、酸枣仁12g、龙眼肉9g、当归9g、远志6g、木香3g、炙甘草6g、生姜3片、大枣6枚。水煎，日1剂分2次温服。', caution: '本方甘温，内有痰火、湿热及外感发热者不宜；炙甘草大剂量久服可致水肿血压升高；服后腹胀者减龙眼肉、加砂仁。' },
    cases: null,
    stdJudgment: '心悸气短、头晕目眩、失眠健忘、面色无华、倦怠食少，舌淡红、脉细弱，此思虑过度、暗耗心血，脾气亏虚、气血乏源，心失所养。归脾汤黄芪党参白术补气生血、酸枣仁龙眼肉当归养血安神、木香理气醒脾，补而不滞。',
    coreDefinition: '心血不足证以心悸头晕、失眠健忘、面色无华、倦怠食少为特征，治以益气补血、健脾养心，方用归脾汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。心悸伴晕厥、胸痛者须先排除器质性心脏病。', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '医案主症心悸气短、头晕目眩、失眠健忘、面色无华、倦怠乏力、食少便溏；舌淡红，脉细弱。辨证心脾两虚、气血不足、心失所养。治法益气补血、健脾养心。主方归脾汤：黄芪党参白术补气以生血，酸枣仁龙眼肉当归养血安神，远志茯神宁心，木香理气防壅滞。调护劳逸结合、睡前忌浓茶咖啡、调畅情志。',
      misjudgment: '心悸兼见五心烦热、舌红少苔，误投归脾汤温补，反助火伤阴；血虚有热者当向天王补心丹方向立法。',
      reasoning: '归脾汤补血，为何重用黄芪党参等补气之品？',
      feedback: '气能生血，有形之血生于无形之气，补气即充养血源，气旺血行，心神得养，此归脾汤以气统血之妙。',
      transfer: '术后失血、面色萎黄、心悸失眠者，试按气血双补思路立法。',
    },
  },
  {
    id: 'pb32-ag-005', title: '试炼·医案·胸痹痰浊闭阻辨治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['胸痹', '痰浊闭阻', '瓜蒌薤白半夏汤', '半夏', '心痛'],
    intent: '通过胸闷如窒、痰多体胖的医案，训练痰浊闭阻证的辨析，掌握瓜蒌薤白半夏汤通阳泄浊、豁痰开结的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '胸痹心痛短气病脉证治第九', originalText: '胸痹不得卧，心痛彻背者，瓜蒌薤白半夏汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '瓜蒌薤白半夏汤：瓜蒌实15g、薤白12g、制半夏9g、白酒适量同煎。水煎，日1剂分2次温服；痰浊重者合涤痰汤。', caution: '半夏生品有毒须炮制，反乌头类，瓜蒌亦反乌头；薤白性滑利，气虚者不宜久用；胸痛剧烈持续不解、汗出肢冷者属真心痛急症，须立即就医。' },
    cases: null,
    stdJudgment: '胸闷重而心痛轻、痰多气短、肢体沉重、形体肥胖，苔浊腻、脉滑，此痰浊盘踞、胸阳失展。瓜蒌薤白半夏汤瓜蒌涤痰开结、薤白通阳散结、半夏逐痰降逆，白酒助药上行温通，痰去阳通则胸痹自解。',
    coreDefinition: '痰浊闭阻证以胸闷如窒、心痛时作、痰多气短、苔浊腻为特征，治以通阳泄浊、豁痰开结，方用瓜蒌薤白半夏汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。胸痛持续不解属真心痛急症，须立即就医；半夏须炮制。', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '急症须立即就医，本节点仅知识学习'] },
    learning: {
      knowledge: '医案主症胸闷如窒、时作心痛、痰多气短、肢体沉重、形体肥胖、倦怠乏力；苔浊腻，脉滑。辨证痰浊盘踞、胸阳失展、心脉痹阻。治法通阳泄浊、豁痰开结。主方瓜蒌薤白半夏汤：瓜蒌涤痰开结，薤白通阳散结，半夏逐痰降逆，白酒温通血脉。调护低脂饮食、控制体重、戒烟、避免饱餐后剧烈活动。',
      misjudgment: '胸痛一律按气滞血瘀投活血化瘀重剂，忽略痰浊壅塞之苔腻体胖，瘀不化而痰不去，胸阳终不展。',
      reasoning: '胸痹痰浊证为何以白酒同煎，其用意何在？',
      feedback: '白酒辛温，能温通血脉、行药之势，助瓜蒌薤白半夏上达胸中，使阳气宣通、痰浊得化。',
      transfer: '体胖痰多者反复胸闷心痛、苔腻脉滑，试按痰浊闭阻思路分析治则。',
    },
  },
  {
    id: 'pb32-ag-006', title: '试炼·医案·不寐心肾不交辨治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['不寐', '心肾不交', '黄连阿胶汤', '滋阴降火'],
    intent: '通过心烦失眠、腰膝酸软的医案，训练心肾不交证的辨析，掌握黄连阿胶汤滋阴降火、交通心肾的用法。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《伤寒论》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《伤寒论》', canon: '《伤寒论》', chapter: '辨少阴病脉证并治', originalText: '少阴病，得之二三日以上，心中烦，不得卧，黄连阿胶汤主之。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '黄连阿胶汤：黄连6g、黄芩9g、白芍12g、阿胶9g（烊化）、鸡子黄2枚（冲入）。水煎取汁，烊入阿胶、兑入鸡子黄搅匀，日1剂分2次温服。', caution: '阿胶滋腻，脾胃虚寒、便溏者慎用；鸡子黄须用新鲜者生冲；本方苦寒养阴并用，阳虚火衰之不寐忌用。' },
    cases: null,
    stdJudgment: '心烦失眠、入睡困难、多梦易醒、五心烦热、口干咽燥、腰膝酸软，舌红少苔、脉细数，此肾水亏于下、心火亢于上，水火不济。黄连黄芩清心泻火，阿胶鸡子黄芍药滋肾养阴，水升火降、心肾交泰，寐自安。',
    coreDefinition: '心肾不交证以心烦失眠、五心烦热、腰膝酸软、舌红少苔为特征，治以滋阴降火、交通心肾，方用黄连阿胶汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。长期失眠伴情绪低落或器质性疾病者应专科诊治。', prohibitions: [] },
    learning: {
      knowledge: '医案主症心烦不寐、入睡困难、多梦易醒、头晕耳鸣、五心烦热、口干咽燥、腰膝酸软；舌红少苔，脉细数。辨证肾水不足、心火独亢、心肾不交。治法滋阴降火、交通心肾。主方黄连阿胶汤：黄连黄芩清心泻火，阿胶鸡子黄芍药滋肾养阴，使水升火降。调护睡前放松、忌浓茶咖啡、起居有常、节制房事。',
      misjudgment: '心烦失眠见舌红即辨作肝火或痰热，投龙胆泻肝或温胆汤，忽略腰膝酸软、脉细数之肾阴虚，苦寒反伤真阴。',
      reasoning: '黄连阿胶汤中阿胶、鸡子黄皆滋补之品，与苦寒黄连同用，寒温并投的道理何在？',
      feedback: '此即泻南补北之法：泻心火以制其上炎，滋肾水以充其下源，水火既济则神安得卧。',
      transfer: '更年期心烦不寐、烘热汗出、腰酸者，试按心肾不交分析立法。',
    },
  },
  // ============================================================
  // AG 综合医案 · 胃痛/呕吐/泄泻/便秘（007–010）
  // ============================================================
  {
    id: 'pb32-ag-007', title: '试炼·医案·胃痛肝气犯胃辨治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['胃痛', '肝气犯胃', '柴胡疏肝散', '疏肝理气'],
    intent: '通过胃脘胀痛连胁、情志诱发的医案，训练肝气犯胃证的辨析，掌握柴胡疏肝散疏肝解郁、理气和胃的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '六元正纪大论篇第七十一', originalText: '木郁达之，火郁发之，土郁夺之，金郁泄之，水郁折之。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '柴胡疏肝散：柴胡9g、香附9g、川芎9g、陈皮6g、枳壳9g、白芍12g、炙甘草6g。水煎，日1剂分2次温服。', caution: '理气药多辛燥，久服耗气伤阴；肝胃阴虚、舌红少苔者慎用；孕妇慎用破气之品。' },
    cases: null,
    stdJudgment: '胃脘胀满疼痛、痛连两胁、嗳气太息、每因情志不畅加重，苔薄白、脉弦，此肝失疏泄、横逆犯胃、胃失和降。柴胡疏肝散柴胡香附疏肝解郁、陈皮枳壳理气宽中、川芎行气活血、白芍甘草缓急止痛，肝气条达则胃痛自止。',
    coreDefinition: '肝气犯胃证以胃脘胀痛连胁、嗳气太息、情志不畅则加重为特征，治以疏肝解郁、理气和胃，方用柴胡疏肝散。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。胃痛伴呕血黑便者须立即就医排除出血。', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '医案主症胃脘胀满疼痛、攻撑连胁、嗳气频作、善太息、每因情志不畅或恼怒加重、大便不畅；舌苔薄白，脉弦。辨证肝气郁结、横逆犯胃、胃失和降。治法疏肝解郁、理气和胃。主方柴胡疏肝散：柴胡香附疏肝解郁，陈皮枳壳理气宽中，川芎行气活血，白芍甘草缓急止痛。调护调畅情志、饮食规律、忌恼怒忧思。',
      misjudgment: '胃痛胀满即按食积投消导之剂，不辨肝气郁结之因，消导伤胃而胀满不解；或见痛即用活血止痛药，气滞未行反耗其血。',
      reasoning: '肝气犯胃之胃痛，为何治胃无效而调肝立效？',
      feedback: '病本在肝木乘土，肝气条达则胃不受克，和降复常，故疏肝即所以和胃，此治病求本之义。',
      transfer: '压力大、易怒者胃脘胀痛连胁，试按肝气犯胃立法并给出情志调护建议。',
    },
  },
  {
    id: 'pb32-ag-008', title: '试炼·医案·呕吐痰饮内停辨治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['呕吐', '痰饮内停', '小半夏汤', '苓桂术甘汤', '半夏'],
    intent: '通过呕吐清水痰涎、脘闷头眩的医案，训练痰饮内停证的辨析，并与肝气犯胃呕吐相鉴别，掌握温化痰饮、和胃降逆法。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《金匮要略》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '痰饮咳嗽病脉证并治第十二', originalText: '呕家本渴，渴者为欲解，今反不渴，心下有支饮故也，小半夏汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '小半夏汤合苓桂术甘汤：制半夏9g、生姜9g、茯苓15g、桂枝9g、白术12g、炙甘草6g。水煎，日1剂分2次温服。', caution: '半夏生品有毒须炮制，反乌头类，孕妇慎用；本方温化，胃热呕吐、胃阴不足者忌用；呕吐剧烈、水入即吐、尿少脱水者须中西医结合补液。' },
    cases: null,
    stdJudgment: '呕吐清水痰涎、脘闷不食、头眩心悸、肠鸣漉漉，苔白腻、脉滑，此中阳不运、痰饮内停、胃气上逆。与肝气犯胃之呕吐嗳气干呕不同，病机一在痰饮、一在肝气，小半夏汤半夏生姜降逆止呕、苓桂术甘汤温阳化饮，标本并治。',
    coreDefinition: '痰饮内停证以呕吐清水痰涎、脘闷头眩、苔白腻为特征，治以温化痰饮、和胃降逆，方用小半夏汤合苓桂术甘汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。半夏须炮制；呕吐剧烈者须防脱水，必要时就医补液。', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '医案主症呕吐清水痰涎、脘闷痞塞、食入即吐或呕后脘舒、头眩心悸、肠鸣漉漉、口不渴；舌苔白腻，脉滑。辨证中阳不运、痰饮内停、胃气上逆。治法温化痰饮、和胃降逆。主方小半夏汤合苓桂术甘汤：半夏生姜降逆止呕、燥湿化痰，茯苓桂枝白术甘草温阳化饮、健脾渗湿。调护少食多餐、忌生冷油腻、饭后缓行。',
      misjudgment: '呕吐泛吐清涎与肝气犯胃之嗳气干呕相混，同为呕吐而一痰一气，误投疏肝理气则痰饮不化反伤中阳；见吐即镇吐，饮邪不化，呕必复作。',
      reasoning: '金匮以呕后渴与不渴辨饮邪去留，口渴者为何反易愈？',
      feedback: '呕后口渴为饮邪将去、阳气来复之象；不渴则心下有支饮仍在，须小半夏汤温化水饮，饮去呕自止。',
      transfer: '平素痰多、晨起呕吐清涎、脘闷头眩者，试按痰饮内停分析其病机与用药方向。',
    },
  },
  {
    id: 'pb32-ag-009', title: '试炼·医案·泄泻肝气乘脾辨治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['泄泻', '肝气乘脾', '痛泻要方', '抑肝扶脾'],
    intent: '通过腹痛即泻、情志诱发的医案，训练肝气乘脾证的辨析，掌握痛泻要方抑肝扶脾、缓痛止泻的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '阴阳应象大论篇第五', originalText: '清气在下，则生飧泄；浊气在上，则生䐜胀。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '痛泻要方：炒白术15g、炒白芍12g、陈皮9g、防风6g。水煎，日1剂分2次温服。', caution: '本方平和，脾肾阳虚之久泻、湿热泄泻忌用；防风用量宜小，取其升清止泻之性。' },
    cases: null,
    stdJudgment: '泄泻每因情志不畅或紧张诱发，腹痛即泻、泻后痛减、肠鸣矢气、胸胁胀闷，脉弦，此肝木乘脾、脾失健运。痛泻要方白术健脾燥湿、白芍柔肝缓急、陈皮理气醒脾、防风散肝升清，抑木扶土，痛泻并止。',
    coreDefinition: '肝气乘脾证以腹痛即泻、泻后痛减、情志诱发为特征，治以抑肝扶脾，方用痛泻要方。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。泄泻伴发热、脓血便者须就医排除感染性腹泻。', prohibitions: [] },
    learning: {
      knowledge: '医案主症腹痛泄泻、肠鸣矢气、每因情绪紧张或恼怒加重、泻后痛减、胸胁痞闷、嗳气食少；舌淡红苔薄白，脉弦。辨证肝气郁结、横逆乘脾、脾失运化。治法抑肝扶脾。主方痛泻要方：白术健脾燥湿，白芍柔肝缓急止痛，陈皮理气醒脾，防风散肝疏脾、升清止泻。调护调畅情志、忌生冷油腻、注意饮食卫生。',
      misjudgment: '腹痛泄泻误作湿热泻投葛根芩连汤，不察其与情志相关、泻后痛减、脉弦，苦寒反伤脾阳；亦不可见泄泻即涩肠止泻，气机未畅反闭门留寇。',
      reasoning: '痛泻要方中防风一味，既非补脾亦非柔肝，其用意何在？',
      feedback: '防风辛散，能散肝舒脾、升清止泻，且风药胜湿，一药而兼疏、升、燥三用，为方中点睛之品。',
      transfer: '考试前紧张即腹痛泄泻的学生，试按肝气乘脾分析并给调护建议。',
    },
  },
  {
    id: 'pb32-ag-010', title: '试炼·医案·便秘阳虚冷秘辨治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['便秘', '阳虚冷秘', '济川煎', '温阳通便'],
    intent: '通过大便艰涩、四肢不温的医案，训练阳虚冷秘证的辨析，掌握济川煎温阳通便、补肾润肠的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '灵兰秘典论篇第八', originalText: '大肠者，传道之官，变化出焉。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '济川煎：当归15g、牛膝9g、肉苁蓉12g、泽泻6g、升麻6g、枳壳6g。水煎，日1剂分2次温服。', caution: '肉苁蓉6~10g常规用量，脾虚便溏者慎用；本方温润，实热便秘、津亏热结者忌用；老年便秘不宜长期攻下。' },
    cases: null,
    stdJudgment: '大便秘结、努挣乏力、临厕虚坐、小便清长、四肢不温、腰膝酸冷，舌淡苔白、脉沉迟，此肾阳不足、温煦无权、肠道传送无力。济川煎肉苁蓉温肾润肠、当归养血润燥、牛膝强腰下行、升麻升清、枳壳宽肠，升降相因。',
    coreDefinition: '阳虚冷秘证以大便艰涩、努挣乏力、四肢不温、腰膝酸冷为特征，治以温阳通便、补肾润肠，方用济川煎。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。便秘伴便血、消瘦、排便习惯骤变者须排查肠道病变。', prohibitions: [] },
    learning: {
      knowledge: '医案主症大便艰涩、排出无力、临厕虚坐、小便清长、面色晄白、四肢不温、腹中冷痛、腰膝酸冷；舌淡苔白，脉沉迟。辨证肾阳亏虚、温煦无权、肠道传送无力。治法温阳通便、补肾润肠。主方济川煎：肉苁蓉温补肾阳润肠通便，当归养血润燥，牛膝强腰下行，升麻升清、枳壳宽肠。调护多饮水、适当运动、定时排便、忌久坐。',
      misjudgment: '便秘即用大黄芒硝攻下，阳虚冷秘反伤肾阳，暂通复结；亦不可见虚即重用人参补气，气壅反滞，辨在四肢不温、腰膝酸冷、脉沉迟。',
      reasoning: '济川煎中升麻与枳壳一升一降，同用之理何在？',
      feedback: '升清降浊相须为用，升麻升举清阳以助运化，枳壳宽肠下气以助推送，升降复常则便通。',
      transfer: '老年便秘、四肢不温、夜尿频多者，试按阳虚冷秘分析立法并给生活调护。',
    },
  },
];
