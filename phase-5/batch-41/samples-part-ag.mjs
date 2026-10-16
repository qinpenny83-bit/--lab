// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part AG（AG 综合医案·试炼 补足 10 节点 pb41-ag-001 ~ pb41-ag-010）
// 学科：AG 综合医案·试炼（学科上限补足批次）；覆盖：肺痨/鼓胀/遗精/汗证/颤证/痿证/腰痛/痹证/便血/消渴
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「试炼·医案·主题」式，每节点一例完整医案式辨治
//   （主诉/现病史/舌脉/辨证分析/治法/方药/转归 入 learning.knowledge）
// facts 每节点 4-6 条，sourceTitle 限定：《中医内科学》规划教材 / 《方剂学》规划教材 /
//   《伤寒论》规划教材 / 《金匮要略》规划教材，status 一律 'verified'
// classics 一律整书名 label（《素问》《金匮要略》），篇名入 chapter，originalText 逐字核对，
//   sourceType:'classic_original'，status:'verified'，均已在 classic-patch.mjs 收录
// dosage 一律填写 guideline/caution，剂量与《中国药典》及规划教材通行表述一致
// 高危药红线按 authoring-spec 第 4 节表：麻黄/细辛/附子/半夏/甘草/朱砂
// safety.note 一律含「知识学习内容，不构成诊疗建议；临床操作须遵医嘱」
// 难度分布：简单 3（diff 1）/ 中等 3（diff 2）/ 困难 2（diff 3）/ 易混综合 2（易混淆 1 + 综合推理 1）
// 机器味句式黑名单（authoring-spec 第 3 节）一律禁用
// ============================================================

export const PART_AG = [
  // ============================================================
  // AG 综合医案 · 虚损类（001–004）
  // ============================================================
  {
    id: 'pb41-ag-001', title: '试炼·医案·肺痨肺阴亏损辨治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['肺痨', '肺阴亏损', '月华丸', '潮热盗汗', '咳血'],
    intent: '通过干咳痰血、潮热盗汗的医案，训练肺阴亏损证的辨析，掌握月华丸滋阴杀虫的组方逻辑。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '月华丸：天冬12g、麦冬12g、生地黄15g、熟地黄15g、山药15g、百部9g、沙参12g、川贝母6g、茯苓15g、三七3g研粉冲服、阿胶6g烊化、菊花9g。水煎，日1剂分2次温服。', caution: '阿胶烊化兑入，三七研粉冲服；肺痨确诊后必须联合抗结核化学治疗（早期、联合、适量、规律、全程），中药为辅助扶正减毒；咯血量大、胸痛气促者急诊。' },
    cases: null,
    stdJudgment: '患者干咳少痰、痰中带血、午后潮热、颧红盗汗、消瘦乏力，舌红少苔、脉细数，此肺阴亏损、痨虫蚀肺。肺体阴虚、虚火灼络则咳血潮热，治宜滋阴润肺、杀虫止咳，月华丸天冬麦冬生地熟地滋肺肾之阴，百部川贝润肺杀虫，阿胶三七止血化瘀，正本清源。',
    coreDefinition: '肺痨肺阴亏损证以干咳痰血、潮热盗汗、舌红少苔为特征，治以滋阴润肺、杀虫止咳，方用月华丸。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。肺痨为法定传染病，规范化疗督导是治愈前提', prohibitions: ['咯血量大、胸痛气促者须急诊处理', '中药辅助治疗不替代抗结核化学治疗'] },
    learning: {
      knowledge: '主诉：干咳3月余，痰中带血半月。现病史：干咳无痰或少痰，咳甚痰中带血丝，午后低热，颧红盗汗，五心烦热，食欲减退，形体渐瘦。舌脉：舌质红、苔薄少，脉细数。辨证分析：痨虫犯肺、肺阴亏损，虚火灼伤肺络，阴虚内热则潮热盗汗。治法：滋阴润肺、杀虫止咳。方药：月华丸加减。转归：服药两周潮热盗汗减轻，痰血减少，嘱联合抗痨化疗并坚持疗程。',
      misjudgment: '见咳血即重用凉血止血，忽略阴虚之本。错：肺痨咳血源于阴虚火旺灼络，凉血止涩仅治其标，滋肺阴、杀虫除其因，标本并调方不致血止而火复。',
      reasoning: '同是阴虚咳血，为何肺痨用月华丸而杂病肺阴虚用百合固金汤？',
      feedback: '肺痨有痨虫为患，须百部獭肝杀虫与滋阴并举；百合固金纯养肺阴以治虚，病因不同则组方取舍立辨。',
      transfer: '久咳伴盗汗的年轻患者，试按肺痨肺阴亏损思路设计筛查与调护方案。',
    },
  },
  {
    id: 'pb41-ag-002', title: '试炼·医案·鼓胀水湿困脾辨治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['鼓胀', '水湿困脾', '实脾散', '附子', '腹水'],
    intent: '通过腹大胀满、畏寒水肿的医案，训练水湿困脾证的辨析，掌握实脾散温阳健脾行水的配伍。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '腹中论篇第四十', originalText: '有病心腹满，旦食则不能暮食，此为何病？岐伯对曰：名为鼓胀。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '实脾散：炮附子6g先煎久煎、干姜9g、白术12g、厚朴9g、木瓜9g、木香6g后下、草果仁6g、大腹皮12g、茯苓15g、炙甘草6g、生姜6g、大枣6枚。水煎，日1剂分2次温服。', caution: '附子须炮制先煎久煎至无麻辣感，反半夏瓜蒌贝母白蔹白及，孕妇禁用；甘淡渗利与温阳并进，中病即止防过燥伤阴；大量腹水伴黄疸、呕血、神昏者属鼓胀危候，须中西医结合综合治疗。' },
    cases: null,
    stdJudgment: '患者腹大胀满、按之如囊裹水、脘腹痞胀、食后益甚、畏寒肢冷、下肢水肿、小便短少，舌淡胖边齿痕、苔白腻，脉沉缓，此脾阳不振、水湿困聚腹中。温运脾阳、化气行水为要，实脾散附子干姜温脾阳，白术茯苓实脾利水，厚朴木香宽中导滞，温而不燥、行而不峻。',
    coreDefinition: '鼓胀水湿困脾证以腹大胀满、畏寒水肿、舌淡胖苔白腻为特征，治以温中健脾、行气利水，方用实脾散。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。鼓胀可并发上消化道出血与肝性脑病，腹水大量者须限制水钠并评估穿刺引流', prohibitions: ['附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '呕血、黑便、神昏谵妄者属鼓胀危候须立即急诊'] },
    learning: {
      knowledge: '主诉：腹大胀满3月。现病史：腹大如鼓、按之如囊裹水，脘腹胀满食后加重，畏寒肢冷，神疲乏力，下肢浮肿，小便短少，大便溏薄。舌脉：舌淡胖有齿痕、苔白腻，脉沉缓。辨证分析：脾阳不振、水湿内停，气机壅滞腹中，阳虚不运故畏寒溏泄。治法：温中健脾、行气利水。方药：实脾散加减。转归：药后小便增多、腹胀渐减，嘱低盐饮食、监测腹围体重，防出血昏迷之变。',
      misjudgment: '腹水一律峻下逐水以图速消。错：水湿困脾之鼓胀本虚标实，峻下逐水伤脾损正、水去复聚；温阳健脾化气行水方为治本，攻逐仅宜于标急。',
      reasoning: '同为鼓胀水停，为何有实脾散温化与十枣汤攻逐之截然两法？',
      feedback: '水湿困脾为脾阳虚衰、水不化气，温之则水自行；水热壅结之实证邪气亢盛，攻之则邪可去，虚实之辨定攻补之序。',
      transfer: '肝硬化腹水反复者，试按水湿困脾思路讨论低盐与利尿的调护配合。',
    },
  },
  {
    id: 'pb41-ag-003', title: '试炼·医案·遗精肾虚不固辨治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['遗精', '肾虚不固', '金锁固精丸', '滑精', '腰酸'],
    intent: '通过滑精腰酸的医案，训练肾虚不固证的辨析，掌握金锁固精丸补肾固涩的组方要点。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '血痹虚劳病脉证并治第六', originalText: '夫失精家，少腹弦急，阴头寒，目眩，发落，脉极虚芤迟，为清谷亡血失精。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '金锁固精丸：沙苑蒺藜12g、芡实12g、莲须6g、龙骨20g先煎、牡蛎20g先煎。水煎，日1剂分2次温服，或按比例制丸服。', caution: '龙骨牡蛎打碎先煎；固涩之剂只宜于无实邪者，湿热下注之遗精忌早投固涩，恐闭门留邪；滑精频繁伴发热或精液带血者须泌尿专科排查。' },
    cases: null,
    stdJudgment: '患者遗精频作、甚则滑精不禁、无梦而遗，伴腰膝酸软、头晕耳鸣、畏寒肢冷、神疲乏力，舌淡苔白、脉沉细弱，此肾气亏虚、封藏失职。肾虚不能固摄精关，治宜补肾益精、固涩止遗，金锁固精丸沙苑蒺藜补肾，芡实莲须固涩，龙骨牡蛎潜镇，涩中寓补、标本兼固。',
    coreDefinition: '遗精肾虚不固证以滑精频作、腰酸头晕、脉沉细为特征，治以补肾固精，方用金锁固精丸。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。固涩剂不宜用于湿热实证，辨虚辨实为先', prohibitions: ['湿热下注遗精忌早投固涩，防闭门留邪'] },
    learning: {
      knowledge: '主诉：遗精频作半年。现病史：无梦而遗、滑精不禁，每周三四次，腰膝酸软，头晕耳鸣，神疲乏力，畏寒肢冷，小便清长。舌脉：舌淡苔白，脉沉细弱。辨证分析：肾气亏虚、精关不固，肾虚髓海失养则头晕耳鸣。治法：补肾益精、固涩止遗。方药：金锁固精丸加减。转归：服药两周滑精减少，腰酸头晕减轻，嘱节房事、安心神、温水浴足。',
      misjudgment: '遗精一律责之相火妄动而泻火。错：无梦滑精、舌淡脉沉属肾虚不固，误用苦寒泻火更伤肾阳；相火妄动之梦遗多有口苦舌红，虚实之分在梦之有无与脉之强弱。',
      reasoning: '同为遗精，为何肾虚者固涩、湿热者清利，误涩误清各生何弊？',
      feedback: '肾虚精关失守，涩之固之正中病机；湿热下注扰动精室，涩之则湿热闭结，清利方为去路，审因用药不可移易。',
      transfer: '青年梦遗伴口苦尿黄者，试按湿热下注思路反向推演处方方向。',
    },
  },
  {
    id: 'pb41-ag-004', title: '试炼·医案·自汗盗汗气阴两虚辨治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['自汗', '盗汗', '气阴两虚', '生脉散', '牡蛎散'],
    intent: '通过日间汗出、夜卧盗汗并见的医案，训练气阴两虚证的辨析，掌握生脉散合牡蛎散的配伍。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '宣明五气篇第二十三', originalText: '五脏化液：心为汗。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '生脉散合牡蛎散：人参6g另煎兑服、麦冬12g、五味子6g、黄芪15g、麻黄根9g、浮小麦30g、煅牡蛎20g先煎。水煎，日1剂分2次温服。', caution: '牡蛎打碎先煎，浮小麦用量宜足；麻黄根为敛汗之品，不同于发汗之麻黄；汗证夜汗严重者宜排查结核、甲亢等原发病，不能唯止汗是务。' },
    cases: null,
    stdJudgment: '患者日间动辄汗出、静息亦汗，夜卧汗出湿衣、醒后即止，伴神疲气短、口干咽燥、五心烦热，舌红少津、脉细弱，此气阴两虚、腠理不固。气虚卫外不固则自汗，阴虚内热迫津外泄则盗汗，治宜益气养阴、固表敛汗，生脉散补气养阴、牡蛎散固表敛汗，标本同治。',
    coreDefinition: '汗证气阴两虚证以自汗盗汗并见、气短口干为特征，治以益气养阴、固表敛汗。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。夜汗伴潮热消瘦须排查结核、淋巴瘤等', prohibitions: ['盗汗潮热消瘦者须排查原发病，勿单纯止汗'] },
    learning: {
      knowledge: '主诉：汗出不止2月。现病史：日间稍动即汗、汗后恶风乏力，夜卧盗汗湿衣、醒后汗止，口咽干燥，五心烦热，气短懒言。舌脉：舌红少津，脉细弱。辨证分析：气阴两虚，气虚则卫表不固，阴虚则虚热迫津。治法：益气养阴、固表敛汗。方药：生脉散合牡蛎散加减。转归：服药一周汗出减少，气短口干改善，嘱调情志、避劳累、忌辛辣煎炸。',
      misjudgment: '见汗即用黄芪固表，量愈大愈好。错：阴虚内热之盗汗纯用黄芪升补反助火迫津；气阴两虚须益气与养阴并行，牡蛎五味敛汗，配伍方周全。',
      reasoning: '同为汗出，为何肺卫不固用玉屏风散，气阴两虚却用生脉散合牡蛎散？',
      feedback: '卫气不固之自汗以气虚为主，黄芪防风白术固表御风；气阴两虚汗出液耗，须人参麦冬五味益气养阴、牡蛎敛汗，侧重不同故选方有别。',
      transfer: '大病初愈动辄汗出气短者，试按气阴两虚思路拟方思路。',
    },
  },
  // ============================================================
  // AG 综合医案 · 肢体经络病（005–008）
  // ============================================================
  {
    id: 'pb41-ag-005', title: '试炼·医案·颤证风阳内动辨治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['颤证', '风阳内动', '天麻钩藤饮', '朱茯神', '肢体震颤'],
    intent: '通过肢体震颤、头晕目赤的医案，训练风阳内动证的辨析，掌握天麻钩藤饮平肝息风的组方逻辑。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '天麻钩藤饮：天麻9g、钩藤12g后下、石决明30g先煎、栀子9g、黄芩10g、川牛膝12g、杜仲9g、益母草15g、桑寄生15g、夜交藤15g、茯神15g（可朱砂拌）。水煎，日1剂分2次温服。', caution: '钩藤后下不宜久煎，石决明先煎；方中朱茯神仅以微量朱砂拌染，朱砂含硫化汞忌火煅、0.1~0.5g只入丸散、不可久服、孕妇禁用，心悸不显者可去朱砂；高血压者须同步规范降压。' },
    cases: null,
    stdJudgment: '患者头摇肢颤、不能自制、每因恼怒加重，伴头晕头痛、面赤口苦、急躁易怒、失眠多梦，舌红苔黄、脉弦有力，此肝阳化风、风阳内动。阳亢化风上扰则肢颤头晕，治宜平肝息风、清热安神，天麻钩藤饮平肝潜阳、栀子黄芩清肝热、杜仲桑寄生益肾、茯神夜交藤宁神，标本兼顾。',
    coreDefinition: '颤证风阳内动证以肢体震颤、头晕面赤、脉弦为特征，治以平肝息风、清热安神，方用天麻钩藤饮。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。震颤持续加重或伴智能衰退者须神经专科评估', prohibitions: ['朱砂含硫化汞忌火煅；0.1-0.5g只入丸散；不可久服；孕妇禁用', '高血压者须同步规范降压，防中风之变'] },
    learning: {
      knowledge: '主诉：肢体震颤3月。现病史：头摇肢颤不能自制，情绪激动时加重，头晕头痛，面赤口苦，急躁易怒，夜寐不安，多梦。舌脉：舌红苔黄，脉弦有力。辨证分析：肝阳偏亢、化风内动，风阳扰及筋脉则肢颤，上扰清窍则头晕。治法：平肝息风、清热安神。方药：天麻钩藤饮加减。转归：服药两周震颤减轻、入睡改善，嘱调情志、息怒戒酒、监测血压。',
      misjudgment: '见肢体震颤即从气血亏虚补益。错：风阳内动之颤有头晕面赤、舌红脉弦之实象，误补则阳亢更甚；颤证须辨虚实，实证平肝、虚证滋补，两途相悬。',
      reasoning: '同为颤证，为何肝阳化风者平肝，而肝肾亏虚者滋补，辨证眼目在何处？',
      feedback: '阳亢者面赤急躁、舌红脉弦，标实当清平；亏虚者腰酸肢麻、脉细舌淡，本虚当滋补，脉舌神色定虚实之机。',
      transfer: '震颤伴便秘口臭苔黄厚者，试按风阳兼痰热思路考虑通腑泄热。',
    },
  },
  {
    id: 'pb41-ag-006', title: '试炼·医案·痿证肺热津伤辨治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['痿证', '肺热津伤', '清燥救肺汤', '下肢痿软', '咽干'],
    intent: '通过热病后下肢痿软的医案，训练肺热津伤证的辨析，掌握清燥救肺汤清肺润燥的配伍。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痿论篇第四十四', originalText: '阳明者，五脏六腑之海，主润宗筋，宗筋主束骨而利机关也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '清燥救肺汤：桑叶9g、石膏20g先煎、人参6g另煎兑服、炙甘草6g、胡麻仁9g、阿胶9g烊化、麦冬12g、杏仁9g、枇杷叶9g。水煎，日1剂分2次温服。', caution: '石膏先煎，阿胶烊化，人参另煎兑服；肺热津伤忌辛温燥烈之品；病在急性期须排除脊髓炎、格林-巴利综合征等神经系统急症，肌力急剧下降或呼吸肌受累者急诊。' },
    cases: null,
    stdJudgment: '患者高热退后双下肢痿软无力、渐至不能行走，伴皮肤枯燥、咽干咳嗽少痰、心烦口渴、小便短赤，舌红苔黄燥、脉细数，此肺热叶焦、津伤不布。热灼肺津、筋脉失养则痿弱，治宜清肺润燥、濡养筋脉，清燥救肺汤桑叶石膏清肺热、麦冬阿胶胡麻养阴润燥、人参甘草益气生津，肺润则宗筋得养。',
    coreDefinition: '痿证肺热津伤证以热病后肢体痿软、咽干肤燥、舌红苔黄为特征，治以清肺润燥，方用清燥救肺汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。急性弛缓性瘫痪须排查神经系统急症并早期专科评估', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '肌力急剧下降、呼吸肌受累者须立即急诊'] },
    learning: {
      knowledge: '主诉：双下肢痿软2周。现病史：两周前高热咳嗽，热退后渐感下肢无力，不能久立行走，皮肤干燥，咽干鼻燥，干咳少痰，心烦口渴，小便短赤。舌脉：舌红苔黄燥，脉细数。辨证分析：肺热津伤、高源化绝，津液不布则筋脉失养。治法：清肺润燥、益气生津。方药：清燥救肺汤加减。转归：服药后咽干咳嗽减轻，下肢力量渐复，嘱坚持康复锻炼。',
      misjudgment: '痿证一律温补脾肾。错：肺热津伤之痿，温补反助热烁津，痿更不除；须辨肺热、湿热、脾胃虚弱与肝肾亏损四端，各以其法。',
      reasoning: '治痿独取阳明，为何肺热津伤之痿反以清肺润燥为先？',
      feedback: '肺为水之上源，肺热清、津液布，阳明筋脉得润，痿自渐起；清源即所以充流，与调理脾胃相须为用。',
      transfer: '湿热浸淫之痿见身重苔黄腻者，试与肺热津伤之痿作证候鉴别。',
    },
  },
  {
    id: 'pb41-ag-007', title: '试炼·医案·腰痛肾虚血瘀辨治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['腰痛', '肾虚血瘀', '独活寄生汤', '细辛', '久病入络'],
    intent: '通过腰痛日久、痛处固定的医案，训练肾虚与血瘀复合证的辨析，掌握补肾活血通络的组方逻辑。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '独活寄生汤加减：独活9g、桑寄生15g、秦艽9g、防风9g、细辛3g、川芎9g、当归9g、白芍12g、干地黄15g、杜仲9g、牛膝12g、党参12g、茯苓15g、炙甘草6g、肉桂3g后下。水煎，日1剂分2次温服。', caution: '细辛煎剂1~3g、散剂0.5~1g，过量可致中毒，反藜芦；甘草反海藻大戟甘遂芫花；腰痛伴下肢放射麻木、二便障碍者提示腰椎间盘突出或马尾受压，须影像学检查并专科处理。' },
    cases: null,
    stdJudgment: '患者腰痛经年、绵绵不休，痛处固定如刺、入夜尤甚，伴腰膝酸软、遇劳加重、面色晦暗，舌紫暗有瘀斑、脉细涩，此肾气亏虚兼瘀血阻络。久病入络，肾虚为本、血瘀为标，单补不化、单攻伤正，宜独活寄生汤补肝肾益气血以治本，合活血通络之品化瘀止痛，标本兼施。',
    coreDefinition: '腰痛肾虚血瘀证以腰痛日久、固定刺痛、腰酸脉涩为特征，治以补肾强腰、活血通络。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。腰痛伴下肢麻木、会阴部感觉异常与二便障碍者须急诊排查马尾综合征', prohibitions: ['【高风险】细辛煎剂1-3g散剂0.5-1g，过量可致中毒；反藜芦', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '下肢放射痛伴二便障碍者须影像学检查并转专科'] },
    learning: {
      knowledge: '主诉：腰痛反复5年、加重1月。现病史：腰痛绵绵，痛处固定如针刺、入夜加重，腰膝酸软，劳累后尤甚，畏寒喜暖，面色晦暗。舌脉：舌紫暗有瘀斑、苔薄白，脉细涩。辨证分析：肾气亏虚、腰府失养，久病入络、瘀血阻痹。治法：补肾益精、活血通络止痛。方药：独活寄生汤去细辛加活血药或合金铃子散。转归：药后腰痛渐减、夜痛减轻，嘱避免久立负重、练习腰背肌力。',
      misjudgment: '瘀血腰痛一味活血攻逐，忽视肾虚之本。错：久痛之瘀多因虚致瘀，纯用攻破耗伤肾气，瘀去复生；补肾以固本、活血以通络，虚实并调方可持久。',
      reasoning: '同为腰痛，为何急性闪挫从瘀治而久痛从虚从瘀并治？',
      feedback: '闪挫之瘀邪实为主、正气未伤，攻之即愈；久痛肾虚为本，攻伐伤正，补肾通络相济，病程不同则治略异。',
      transfer: '更年期女性腰痛夜甚伴烘热汗出者，试按肾虚兼瘀兼阴虚思路拓展组方。',
    },
  },
  {
    id: 'pb41-ag-008', title: '试炼·医案·痹证着痹湿胜辨治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['痹证', '着痹', '湿胜', '薏苡仁汤', '麻黄'],
    intent: '通过肢体重着酸痛、阴雨加重的医案，训练着痹湿胜证的辨析，掌握薏苡仁汤除湿通痹的组方。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痹论篇第四十三', originalText: '风寒湿三气杂至，合而为痹也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '薏苡仁汤：薏苡仁30g、苍术9g、羌活9g、独活9g、防风9g、麻黄6g、桂枝6g、当归12g、川芎9g、炙甘草6g、生姜6g。水煎，日1剂分2次温服。', caution: '麻黄发汗力强，虚人、高血压、心脏病、失眠者慎用，运动员禁用；甘草反海藻大戟甘遂芫花；着痹湿邪黏滞，疗程宜长，忌过汗伤正；关节红肿灼热者非本方所宜。' },
    cases: null,
    stdJudgment: '患者肢体关节重着酸痛、固定不移、屈伸不利，阴雨潮湿天加重，伴肌肤麻木、胸脘痞闷，苔白腻、脉濡缓，此湿邪偏胜留着关节之着痹。湿性重浊黏滞，留滞经隧则重着麻木，治宜除湿通络、祛风散寒，薏苡仁汤薏苡仁苍术健脾除湿、羌独活防风祛风胜湿、麻黄桂枝宣痹通络、归芎养血，湿去络通则痛止。',
    coreDefinition: '痹证着痹湿胜证以关节重着酸痛、固定麻木、苔腻脉濡为特征，治以除湿通络、祛风散寒，方用薏苡仁汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。关节红肿灼热属热痹，忌辛温发汗', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主诉：双膝踝关节重着酸痛2月。现病史：关节重着肿胀、固定不移、屈伸不利，阴雨潮湿及晨起加重，肌肤麻木不仁，脘痞纳呆，身重困倦。舌脉：苔白腻，脉濡缓。辨证分析：湿邪偏胜、留着关节，痹阻经络气血。治法：除湿通络、祛风散寒。方药：薏苡仁汤加减。转归：服药两周重着感减轻、麻木改善，嘱避潮湿、慎起居、忌食生冷肥甘。',
      misjudgment: '着痹与行痹、痛痹混同，一律祛风散寒。错：着痹以湿为主，痛重着而不游走，行痹痛游走、痛痹痛剧烈，三者邪各有偏，着痹重用除湿、他痹各有专法，混治则效差。',
      reasoning: '同为风寒湿痹，为何行痹痛游走、着痹重着不移，机制何在？',
      feedback: '风性善行数变故游走，湿性重浊黏滞故固定重着，寒性收引凝滞故痛剧，因邪之性辨病之形，治法随之而异。',
      transfer: '久居湿地之人腰膝重着酸痛者，试按着痹湿胜思路考虑健脾化湿配合。',
    },
  },
  // ============================================================
  // AG 综合医案 · 气血与脾胃病（009–010）
  // ============================================================
  {
    id: 'pb41-ag-009', title: '试炼·医案·血证便血气虚不摄辨治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['血证', '便血', '气虚不摄', '归脾汤', '远血'],
    intent: '通过先便后血、面色萎黄的医案，训练脾气虚不能统血证的辨析，掌握归脾汤益气摄血的组方。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '归脾汤：白术12g、人参6g另煎兑服、黄芪15g、当归9g、炙甘草6g、茯神15g、远志6g、酸枣仁15g、木香6g后下、龙眼肉9g、生姜6g、大枣6枚。水煎，日1剂分2次温服。', caution: '甘草反海藻大戟甘遂芫花；血止后仍须复查大便潜血与结肠镜，便血非独脾虚，肠息肉肿瘤须排查；出血量多、黑便伴头晕心悸者急诊。' },
    cases: null,
    stdJudgment: '患者大便下血、先便后血、色紫暗、质稀薄，反复发作，伴神疲乏力、面色萎黄、食少腹胀、心悸头晕，舌淡苔薄白、脉细弱，此脾气亏虚、统摄无权、血溢肠中。补脾益气、养血摄血为要，归脾汤黄芪人参白术益气健脾，当归龙眼养血，木香理气防补而壅滞，气充则血有所统。',
    coreDefinition: '血证便血气虚不摄证以先便后血、神疲面萎、脉细弱为特征，治以益气摄血，方用归脾汤。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。便血须排查肠道器质性病变，大量失血者先急救', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '大量便血伴头晕心悸冷汗者须立即急诊'] },
    learning: {
      knowledge: '主诉：便血反复半年。现病史：大便下血、先便后血、血色紫暗，质稀，伴神疲乏力、面色萎黄、头晕心悸、纳呆腹胀。舌脉：舌淡苔薄白，脉细弱。辨证分析：脾气虚弱、统血无权，血不循经下溢肠道为远血。治法：益气健脾、养血摄血。方药：归脾汤加减。转归：服药后便血渐止、面色转润，嘱复查结肠镜、忌辛辣刺激饮食。',
      misjudgment: '便血一律清热凉血止血。错：血色紫暗、脉细舌淡乃脾气虚不统血，凉血苦寒更伤中阳；须辨血色鲜暗、先便后血与先血后便，虚则温摄、热则清止。',
      reasoning: '同为便血，为何黄土汤温阳与槐角丸清热，一虚一实如何取舍？',
      feedback: '黄土汤适于脾阳不足之远血，槐角丸适于肠风湿热之近血；血色、舌脉、兼症三者合参，虚寒温之、湿热清之。',
      transfer: '溃疡性结肠炎反复便血者，试按脾虚不摄思路结合肠镜检查设计随访。',
    },
  },
  {
    id: 'pb41-ag-010', title: '试炼·医案·消渴中消胃热辨治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['消渴', '中消', '胃热炽盛', '玉女煎', '多食易饥'],
    intent: '通过多食易饥、口渴引饮的医案，训练中消胃热证的辨析，掌握玉女煎清胃滋阴的组方逻辑。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护与转归', sourceType: 'textbook', sourceTitle: '《中医内科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '阴阳别论篇第七', originalText: '二阳结谓之消。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '玉女煎加黄连栀子：石膏20g先煎、熟地黄15g、麦冬12g、知母9g、牛膝12g、黄连3g、栀子9g。水煎，日1剂分2次温服。', caution: '石膏先煎，脾胃虚寒者酌减；消渴确诊糖尿病者须同步规范降糖与监测，胃热炽盛之消谷善饥须与甲亢之食欲亢进鉴别；多尿多饮加重伴酮症倾向者转内分泌专科。' },
    cases: null,
    stdJudgment: '患者多食易饥、食量大增、形体反瘦，口渴引饮、尿频量多、大便干燥，舌红苔黄燥、脉滑实有力，此胃热炽盛、耗伤阴津之中消。阳明胃热消谷善饥，热灼津伤则口渴便干，治宜清胃泻火、养阴增液，玉女煎石膏知母清阳明胃热、熟地麦冬滋肾养阴、牛膝引热下行，加黄连栀子直折胃火。',
    coreDefinition: '消渴中消胃热证以多食易饥、口渴便干、舌红苔黄为特征，治以清胃泻火、养阴增液，方用玉女煎加味。',
    safety: { note: '知识学习内容，不构成诊疗建议；临床操作须遵医嘱。确诊糖尿病者须规范降糖监测，防酮症酸中毒', prohibitions: ['血糖控制与监测须按内分泌规范执行', '多饮多尿加重、恶心呕吐、呼气烂苹果味者须急诊排查酮症酸中毒'] },
    learning: {
      knowledge: '主诉：多食易饥2月。现病史：食量倍于平日仍饥，形体日渐消瘦，口渴喜冷饮，尿频量多，大便干结，心烦。舌脉：舌红苔黄燥，脉滑实有力。辨证分析：胃火炽盛、腐熟太过则消谷善饥，火烁津液则渴饮便干。治法：清胃泻火、养阴增液。方药：玉女煎加黄连栀子。转归：药后饥饿口渴减轻，空腹血糖复查改善，嘱饮食有节、适度运动、定期监测。',
      misjudgment: '消渴中消见饥饿即用大量益气补脾之品。错：中消胃热炽盛，补气助火消谷更甚；须清胃滋液为先，待火势渐平再顾脾胃，误补则病情加剧。',
      reasoning: '同为消渴，为何上消治肺、中消清胃、下消滋肾，三消病位如何确立？',
      feedback: '肺热津伤主口渴，胃热炽盛主善饥，肾虚固摄失职主尿多，以主症定位脏腑，三消之治各有侧重，终以滋肾为要。',
      transfer: '多食易饥兼口苦口臭便秘者，试按胃热兼腑实思路加通腑之品。',
    },
  },
];
