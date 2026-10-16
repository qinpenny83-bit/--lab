// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · Part X（X 中医耳鼻咽喉科学 10 节点 pb41-x-001 ~ pb41-x-010）
// 学科：X 中医耳鼻咽喉科学；覆盖：鼻病（3）/ 咽喉病（3）/ 耳病（2）/ 口齿病（2）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「耳鼻喉·病证·证型证治」式，前缀「耳鼻喉·」
// facts sourceTitle 限定：《中医耳鼻咽喉科学》规划教材 / 《方剂学》规划教材 / 《中药学》规划教材 /
//   《中国药典》 / 《伤寒论》规划教材 / 《温病学》规划教材
// classics 一律整书名 label（《素问》《灵枢》《金匮要略》等，已在 classic-patch.mjs 收录），
//   篇名入 chapter，originalText 逐字核对，sourceType:'classic_original'，status:'verified'；
//   拿不准的节点留空
// dosage 一律填写 guideline/caution，内服剂量与外用方法（吹喉/滴鼻/滴耳/涂敷）分别说明
// 高危药红线按 authoring-spec 第 4 节表：细辛/半夏/朱砂（冰硼散吹喉）/甘草/关木通（马兜铃酸）等
// 难度分布：简单 3（difficulty 1）/ 中等 3（difficulty 2）/ 困难 2（difficulty 3）/
//   易混综合 2（易混淆 1 + 综合推理 1）
// ============================================================

export const PART_X = [
  // ============================================================
  // X 中医耳鼻咽喉科 · 鼻病（001–003）
  // ============================================================
  {
    id: 'pb41-x-001', title: '耳鼻喉·鼻槁肺燥津伤证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['鼻槁', '萎缩性鼻炎', '肺燥津伤', '养阴润燥', '清燥救肺汤'],
    intent: '掌握鼻槁肺燥津伤证的主症舌脉、病机与养阴润燥宣肺通窍治法，熟悉清燥救肺汤的组成与加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '金匮真言论篇第四', originalText: '西方白色，入通于肺，开窍于鼻，藏精于肺。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '清燥救肺汤加减水煎：桑叶9g、石膏15g先煎、党参9g、麦冬12g、阿胶9g烊化、胡麻仁9g、杏仁9g、枇杷叶9g、生甘草3g，加沙参12g、玉竹9g，日1剂分2次温服；涕中带血加白茅根12g、侧柏叶9g。', caution: '阿胶滋腻碍胃，脾胃虚弱者减量；石膏先煎、中病即止；鼻内干燥者外用麻油或石蜡油滴鼻润燥去痂，忌抠挖痂皮，久治不效者须排除特异性感染与肿瘤。' },
    cases: null,
    stdJudgment: '鼻槁鼻内干燥、肌膜萎缩结痂，肺燥津伤者鼻内灼热、鼻塞嗅减、鼻气腥臭，干咳少痰、口干咽燥，舌红少津脉细数。肺开窍于鼻，燥伤肺津则鼻窍失濡、肌膜渐萎，法当养阴润燥、宣肺通窍，清燥救肺汤桑杏枇杷宣降肺气，麦冬阿胶胡麻滋润燥津。',
    coreDefinition: '鼻槁肺燥津伤证以鼻内干燥、肌膜萎缩结痂、干咳咽干为特征，治以养阴润燥宣肺通窍。',
    safety: { note: '专科辨证知识学习，临床用药须遵医嘱；鼻槁久治不效或涕中带血不止者须排除特异性感染与肿瘤', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '鼻内干燥灼热、鼻塞嗅减、鼻气腥臭，鼻内肌膜萎缩结痂，干咳少痰、口干咽燥，舌红少津脉细数。肺燥津伤、鼻窍失濡。治以养阴润燥、宣肺通窍，清燥救肺汤加减（桑叶、石膏、麦冬、阿胶、杏仁、枇杷叶、甘草）；外以麻油滴鼻，忌抠挖痂皮。',
      misjudgment: '鼻槁鼻塞即按鼻窒通窍辛散。错：鼻槁以干燥萎缩为本，辛香通窍之品愈用愈燥，萎缩反甚；须养阴润燥治本，通窍寓于润养之中。',
      reasoning: '同为鼻塞，鼻窒与鼻槁一实一虚，何以通窍之法不可概施？',
      feedback: '鼻窒邪阻鼻窍，辛宣通窍以开之；鼻槁津亏肌萎，愈通愈耗，须润养为先、缓图其本，辨虚实为用药第一义。',
      transfer: '鼻内干燥结痂、鼻塞嗅减而干咳者，试从肺燥津伤分析立法与外治要点。',
    },
  },
  {
    id: 'pb41-x-002', title: '耳鼻喉·鼻息肉痰瘀互结证治', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['鼻息肉', '痰瘀互结', '燥湿化痰', '活血散结', '二陈汤', '桃红四物汤'],
    intent: '掌握鼻息肉痰瘀互结证的主症舌脉、病机与燥湿化痰活血散结治法，熟悉半夏、桃仁红花的运用警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '脉度第十七', originalText: '肺气通于鼻，肺和则鼻能知臭香矣。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '二陈汤合桃红四物汤加减水煎：法半夏9g、陈皮9g、茯苓12g、生甘草3g、桃仁9g、红花6g、当归9g、川芎9g、赤芍9g、僵蚕9g、石菖蒲6g，日1剂分2次温服；息肉色暗紫加三棱6g、莪术6g，涕多加薏苡仁15g、冬瓜仁15g。', caution: '法半夏有毒须炮制使用，反乌头类药；桃仁红花活血力峻，孕妇禁用，血虚无瘀者忌用；息肉堵塞鼻腔或反复出血、单侧生长迅速者须手术摘除并活检，排除恶变。' },
    cases: null,
    stdJudgment: '鼻息肉鼻塞渐重、嗅觉减退，痰瘀互结者息肉灰白或暗红、表面光滑、涕多黏稠，头重胸闷、舌暗苔腻脉弦滑。痰湿久蕴、气血瘀滞则结聚鼻窍，法当燥湿化痰、活血散结，二陈汤燥湿化痰，桃红四物活血祛瘀，僵蚕菖蒲化痰开窍散结。',
    coreDefinition: '鼻息肉痰瘀互结证以鼻塞渐重、息肉灰白或暗红、头重胸闷为特征，治以燥湿化痰活血散结。',
    safety: { note: '息肉堵塞鼻腔或疑恶变者须手术并活检；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '桃仁红花活血祛瘀，孕妇禁用；血虚无瘀者忌用'] },
    learning: {
      knowledge: '鼻塞渐进加重、鼻内灰白或暗红息肉，涕多黏稠，舌暗红苔腻、脉弦滑。痰湿瘀滞结聚鼻窍成息肉。治以燥湿化痰、活血散结，二陈汤合桃红四物汤加减（法半夏、陈皮、茯苓、桃仁、红花、川芎、赤芍），加僵蚕石菖蒲开窍；息肉大者手术摘除，术后内服防复发。',
      misjudgment: '鼻息肉即按鼻窒宣肺通窍。错：息肉有形之痰瘀结聚，单纯通窍散而不消，须化痰活血消其结聚；息肉反复生长者更宜手术摘除配合内服，二者不可偏废。',
      reasoning: '鼻息肉痰瘀互结为何单用通窍药不效，化痰活血与手术摘除如何配合？',
      feedback: '息肉为痰瘀有形之结，通窍药仅暂开气道、不消其根；化痰活血可缩小新起者，已成之息肉每须手术摘除，术后内服化痰活血以杜其源。',
      transfer: '鼻塞渐重、鼻内灰白息肉反复生长者，试述化痰活血与手术选择的配合思路。',
    },
  },
  {
    id: 'pb41-x-003', title: '耳鼻喉·鼻窒肺经蕴热证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['鼻窒', '慢性鼻炎', '肺经蕴热', '清热宣肺', '黄芩汤'],
    intent: '掌握鼻窒肺经蕴热证的主症舌脉、病机与清热宣肺通利鼻窍治法，熟悉黄芩汤加减。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '黄芩汤加减水煎：黄芩9g、栀子9g、桑白皮9g、麦冬9g、桔梗6g、薄荷6g后下、连翘9g、生甘草3g，加辛夷9g包煎、白芷6g，日1剂分2次温服；涕黏黄加蒲公英15g、鱼腥草15g。', caution: '黄芩栀子苦寒清泄，脾胃虚寒、食少便溏者减量或配白术；鼻塞单侧持续加重、涕中带血者须排除鼻部新生物，转专科检查；勿长期使用血管收缩类滴鼻剂。' },
    cases: null,
    stdJudgment: '鼻窒鼻塞时轻时重、涕黏色黄，肺经蕴热者鼻甲红肿、咽干咳嗽，舌红苔薄黄脉数。肺经蕴热、壅滞鼻窍则宣降失司，法当清热宣肺、通利鼻窍，黄芩汤清肺泄热，桑白皮栀子泻肺经之热，薄荷桔梗辛宣开窍。',
    coreDefinition: '鼻窒肺经蕴热证以鼻塞时轻时重、涕黏色黄、鼻甲红肿为特征，治以清热宣肺通利鼻窍。',
    safety: { note: '专科辨证知识学习，临床用药须遵医嘱；单侧持续鼻塞伴血涕者须排除鼻部新生物', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症鼻塞时轻时重、呈间歇或交替性，涕黏或色黄，鼻肌膜充血、鼻甲肿大色红，伴咽干咳嗽；舌红苔薄黄，脉数。病机肺经蕴热、壅滞鼻窍。治以清热宣肺、通利鼻窍，黄芩汤加减，加辛夷白芷宣通鼻窍，涕黄稠加蒲公英鱼腥草。',
      misjudgment: '鼻窒鼻塞即投温散辛通。错：肺经蕴热者温散愈助热势，鼻甲充血更甚；当辨寒热，清泄肺热与宣通并举，方为正治。',
      reasoning: '同为慢性鼻塞，肺经蕴热与肺脾气虚治法一清一补，凭何眼目判别？',
      feedback: '蕴热者涕黄黏、鼻甲红、脉数，宜清宣；气虚者涕清稀、鼻甲淡、倦怠脉弱，宜补益。清补误投则热更炽或气更虚。',
      transfer: '鼻塞交替、涕黄黏而咽干者，试按肺经蕴热立法并说明滴鼻剂使用注意。',
    },
  },
  // ============================================================
  // X 中医耳鼻咽喉科 · 咽喉病（004–006）
  // ============================================================
  {
    id: 'pb41-x-004', title: '耳鼻喉·急喉风痰壅气闭证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['急喉风', '急性喉阻塞', '痰壅气闭', '祛痰开窍', '导痰汤', '朱砂'],
    intent: '掌握急喉风痰壅气闭证的主症舌脉、病机与泻火解毒祛痰开窍治法，牢记喉阻塞窒息的急症红线。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '忧恚无言第六十九', originalText: '咽喉者，水谷之道也；喉咙者，气之所以上下者也。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '导痰汤加减水煎：法半夏9g、胆南星9g、枳实9g、茯苓12g、橘红9g、生甘草3g、生姜3片，加黄连6g、栀子9g、僵蚕9g、石菖蒲9g，日1剂分2次温服；外治以冰硼散少许吹喉，日3~4次，吹药后勿即饮水。', caution: '急喉风呼吸困难明显者属急症，须立即就医，必要时气管切开，不得延误；冰硼散含朱砂仅限外用吹敷，忌咽下、忌久用；法半夏有毒须炮制，反乌头类药；痰涎壅盛者须备吸引器随时吸痰。' },
    cases: null,
    stdJudgment: '急喉风发病急骤、声嘶喉鸣、痰涎壅盛、吸气困难，痰壅气闭者喉内红肿、气促喘急、甚则昏蒙，舌红绛苔黄腻脉滑数。痰热壅塞气道、肺气闭郁，法当泻火解毒、祛痰开窍，导痰汤豁痰开闭，黄连栀子清泻火毒，僵蚕菖蒲化痰宣窍，外吹冰硼散解毒消肿。',
    coreDefinition: '急喉风痰壅气闭证以发病急骤、痰涎壅盛、吸气性呼吸困难为特征，治以泻火解毒祛痰开窍。',
    safety: { note: '急喉风属急症，呼吸困难者须立即就医，必要时气管切开；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['【高风险】朱砂含硫化汞忌火煅；0.1-0.5g只入丸散；不可久服；孕妇禁用（冰硼散仅限外用吹敷，忌咽下）', '半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '发病急骤，喉部红肿、痰涎壅盛，吸气性喉鸣、呼吸困难呈三凹征，舌红绛、苔黄腻、脉滑数。热毒痰涎壅塞气道，气闭于喉。治以泻火解毒、祛痰开窍，导痰汤加减（法半夏、胆南星、枳实、茯苓、甘草），加黄连、栀子；外吹冰硼散消肿，气闭重者即气管切开。',
      misjudgment: '急喉风喉鸣气喘仍按一般咽喉肿痛缓图内服。错：喉腔狭窄，痰壅气闭可顷刻窒息，内服药力缓不济急，当先解气道之急，内服外治与急救措施并施。',
      reasoning: '急喉风呼吸困难为何必须抢时处理，吹药与气管切开如何取舍？',
      feedback: '喉为气之要道，痰壅则气闭可亡；轻者吹药消肿豁痰，重者气道将闭则须立即气管切开，救急为先，切不可泥于内服。',
      transfer: '喉痛声嘶、痰鸣气促、吸气凹陷者，试述急救次序与外治用药注意。',
    },
  },
  {
    id: 'pb41-x-005', title: '耳鼻喉·慢喉喑肺脾气虚证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['慢喉喑', '慢性喉炎', '肺脾气虚', '补益肺脾', '补中益气汤'],
    intent: '掌握慢喉喑肺脾气虚证的主症舌脉、病机与补益肺脾益气开音治法，熟悉补中益气汤的运用。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '忧恚无言第六十九', originalText: '会厌者，音声之户也。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '补中益气汤加减水煎：黄芪15g、党参12g、白术9g、当归9g、陈皮6g、升麻6g、柴胡6g、炙甘草3g，加诃子9g、石菖蒲6g、蝉蜕6g，日1剂分2次温服；声嘶重加桔梗6g、胖大海3枚。', caution: '阴虚火旺、声带充血明显者忌用甘温升提之品；声嘶日久或痰中带血者须喉镜检查排除声带新生物，忌过度用声与烟酒刺激。' },
    cases: null,
    stdJudgment: '慢喉喑声嘶日久、语音低微，肺脾气虚者劳则加重、气短乏力、食少便溏，舌淡胖齿痕苔白脉缓弱。肺脾气虚则喉失充养、声门开合无力，法当补益肺脾、益气开音，补中益气汤补气升清，黄芪党参培补肺脾，升麻柴胡举陷，诃子蝉蜕敛肺开音。',
    coreDefinition: '慢喉喑肺脾气虚证以声嘶日久、语音低微、劳累加重、气短乏力为特征，治以补益肺脾益气开音。',
    safety: { note: '专科辨证知识学习，临床用药须遵医嘱；声嘶日久或痰中带血者须喉镜检查排除新生物', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症声音嘶哑日久，语音低微、讲话费力，劳累或用声多后加重，声带松弛闭合不全，伴气短乏力、食少便溏；舌淡胖齿痕，苔白，脉缓弱。病机肺脾气虚、喉失充养，声门开合不利。治以补益肺脾、益气开音，补中益气汤加减，加诃子蝉蜕敛肺开音，并嘱休声。',
      misjudgment: '慢喉喑一律按阴虚润喉。错：肺脾气虚者声带松弛、气短乏力，滋润寒凉反碍脾阳、气更不足；须辨气虚与阴虚，益气升清方合病机。',
      reasoning: '同为声嘶，肺脾气虚与肺燥津伤之治一升一润，如何鉴别？',
      feedback: '气虚者语音低微、劳则加重、舌淡脉弱，宜益气升清；燥伤者咽干声哑、舌红少津，宜润肺生津。一补一润，误投则虚者愈虚、燥者愈燥。',
      transfer: '教师声嘶年余、语声低微、劳则加重而气短便溏者，试从肺脾气虚立论并说明休声要义。',
    },
  },
  {
    id: 'pb41-x-006', title: '耳鼻喉·喉痈热毒壅盛证治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['喉痈', '扁桃体周围脓肿', '热毒壅盛', '泻火解毒', '五味消毒饮', '黄连解毒汤'],
    intent: '掌握喉痈热毒壅盛证的主症舌脉、病机与泻火解毒消肿排脓治法，牢记脓成排脓与窒喉急症的处理。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '至真要大论篇第七十四', originalText: '诸痛痒疮，皆属于心。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '五味消毒饮合黄连解毒汤加减水煎：金银花15g、野菊花12g、蒲公英15g、紫花地丁15g、紫背天葵子9g、黄连6g、黄芩9g、黄柏9g、栀子9g、皂角刺9g、白芷9g、天花粉12g、赤芍9g、牡丹皮9g，日1剂分2次温服；高热加石膏30g先煎、知母9g。', caution: '脓成者须由医师穿刺抽脓或切开排脓，切忌自行挤压，防脓毒走散；肿胀窒喉、呼吸不畅者属急症须立即就医，防窒息；苦寒解毒之剂中病即止，孕妇及脾虚者慎用。' },
    cases: null,
    stdJudgment: '喉痈咽喉红肿高突、疼痛剧烈、吞咽困难、言语含混，热毒壅盛者壮热口渴、便秘溲赤，舌红苔黄燥脉洪数。热毒壅盛、血肉腐败成痈，法当泻火解毒、消肿排脓，黄连解毒汤苦寒泻火，五味消毒饮解毒，皂刺白芷溃坚排脓。',
    coreDefinition: '喉痈热毒壅盛证以咽喉红肿高突、痛剧吞咽困难、壮热口渴为特征，治以泻火解毒消肿排脓。',
    safety: { note: '喉痈脓成须由医师排脓，肿胀窒喉属急症须立即就医；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['五味消毒饮合黄连解毒汤诸品苦寒，脾胃虚寒者慎用；孕妇慎用'] },
    learning: {
      knowledge: '主症咽喉红肿高突，疼痛剧烈，吞咽困难，语言含混如含物，涎液外流，伴壮热口渴、便秘溲赤；舌红苔黄燥，脉洪数。病机热毒壅盛、血肉腐败成痈。治以泻火解毒、消肿排脓，五味消毒饮合黄连解毒汤加减，加皂角刺白芷天花粉溃坚，脓成由医师排脓。',
      misjudgment: '喉痈吞咽困难仍令强进硬食。错：吞咽硬物刺激痈肿，痛加剧且可致脓肿溃破走散，宜进流质或半流质，脓成及时排脓，以通为用。',
      reasoning: '喉痈脓成之后，内服与排脓如何配合，为何忌待其自溃？',
      feedback: '脓成不排则热毒内蕴难解，脓肿自溃方向难测，溃入气道则窒喉可危；故脓成即穿刺或切开引流，内服泻火解毒以清其源。',
      transfer: '咽喉红肿高突、汤水难入、壮热便秘者，试述排脓时机与泻火解毒的配合。',
    },
  },
  // ============================================================
  // X 中医耳鼻咽喉科 · 耳病与口齿病（007–010）
  // ============================================================
  {
    id: 'pb41-x-007', title: '耳鼻喉·耳眩晕痰浊中阻证治', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['耳眩晕', '梅尼埃病', '痰浊中阻', '燥湿化痰', '半夏白术天麻汤'],
    intent: '掌握耳眩晕痰浊中阻证的主症舌脉、病机与燥湿化痰健脾和胃治法，熟悉半夏白术天麻汤的运用与半夏警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '痰饮咳嗽病脉证并治第十二', originalText: '心下有痰饮，胸胁支满，目眩，苓桂术甘汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '半夏白术天麻汤加减水煎：法半夏9g、白术12g、天麻9g、茯苓12g、橘红9g、生甘草3g、生姜3片、大枣4枚，加泽泻15g、石菖蒲6g，日1剂分2次温服；呕恶甚加竹茹9g、旋覆花9g包煎。', caution: '法半夏有毒须炮制使用，反乌头类药，孕妇慎用；眩晕发作期宜静卧少动、防跌倒，低盐饮食；反复发作或伴复视、肢体麻木、言语不利者须排除脑源性眩晕，及时就医。' },
    cases: null,
    stdJudgment: '耳眩晕突发旋转如坐舟车、恶心呕吐，痰浊中阻者头重如裹、胸闷纳呆、痰涎多，舌苔白腻脉濡滑。脾失健运则痰浊中阻、清阳不升、浊阴上蒙，法当燥湿化痰、健脾和胃，半夏白术天麻汤燥湿熄风，泽泻利水除饮，菖蒲化浊开窍。',
    coreDefinition: '耳眩晕痰浊中阻证以突发旋转性眩晕、头重如裹、胸闷呕恶、苔白腻为特征，治以燥湿化痰健脾和胃。',
    safety: { note: '眩晕反复或伴神经系统症状者须排除脑源性眩晕，及时就医；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症眩晕突发如坐舟车，不能站立，伴恶心呕吐痰涎、头重如裹、胸闷纳呆、耳鸣耳聋；舌苔白腻，脉濡滑。病机脾失健运、痰浊中阻，清阳不升浊阴上蒙。治以燥湿化痰、健脾和胃，半夏白术天麻汤加减，加泽泻菖蒲利水化浊，发作期静卧低盐。',
      misjudgment: '耳眩晕皆按肝阳上亢平肝潜阳。错：痰浊中阻者苔腻胸闷、呕恶痰涎，平肝潜阳重镇反碍脾运，痰浊愈聚；当辨痰与风，燥湿化痰方为正治。',
      reasoning: '同为眩晕，痰浊中阻与肝阳上亢在舌脉兼症上如何鉴别，治法何以一燥一镇？',
      feedback: '痰浊者苔腻头重、呕恶痰涎，燥湿化痰、健脾和胃为法；肝阳者面赤口苦、急躁易怒，平肝潜阳为治。痰湿误镇则清阳愈困，肝风误燥则风阳愈亢。',
      transfer: '突发旋转眩晕、呕恶痰涎、苔白腻者，试从痰浊中阻分析立法并说明起居调摄。',
    },
  },
  {
    id: 'pb41-x-008', title: '耳鼻喉·耳疮风热湿邪证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['耳疮', '外耳道炎', '风热湿邪', '疏风清热', '银翘散'],
    intent: '掌握耳疮风热湿邪证的主症舌脉、病机与疏风清热祛湿解毒治法，熟悉银翘散加减与局部外治。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外治要点', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '银翘散加减水煎：金银花12g、连翘12g、薄荷6g后下、荆芥穗6g、桔梗6g、竹叶9g、生甘草3g、栀子9g、黄芩9g、薏苡仁15g，日1剂分2次温服；局部以黄柏煎水湿敷或涂黄连膏，日2~3次，渗液多者先清拭再涂药。', caution: '外耳道肿痛忌挖耳、忌进水，滴耳药前须先清拭脓痂；反复发作者须控制血糖并排除真菌感染；苦寒清热之品中病即止，脾虚便溏者慎用。' },
    cases: null,
    stdJudgment: '耳疮外耳道灼热痒痛、红肿糜烂渗液，风热湿邪者咀嚼张口痛甚、耳郭肿赤，恶风发热、舌红苔黄腻脉浮数。风热湿邪壅滞耳窍肌肤，法当疏风清热、祛湿解毒，银翘散疏风清热，栀子黄芩薏苡仁清利湿热，局部涂药燥湿敛疮。',
    coreDefinition: '耳疮风热湿邪证以外耳道灼热痒痛、红肿糜烂渗液、恶风发热为特征，治以疏风清热祛湿解毒。',
    safety: { note: '专科辨证知识学习，临床用药须遵医嘱；外耳道肿痛忌挖耳进水，反复发作者须排查血糖', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '外耳道灼热疼痛，皮肤红肿糜烂渗液，咀嚼张口痛甚，恶风发热，舌红苔黄腻、脉浮数。风热湿邪壅滞耳窍肌肤生疮。治以疏风清热、祛湿解毒，银翘散加减（金银花、连翘、薄荷、桔梗、竹叶、甘草），加栀子、黄芩、薏苡仁清利湿热；外以黄柏煎水湿敷，忌挖耳进水。',
      misjudgment: '耳疮痒痛即投苦寒燥湿重剂。错：风热在表当辛凉疏解兼清湿热，重剂苦寒冰伏邪气，肿痛反难消退；疏清之中佐祛湿，表里兼顾方为正治。',
      reasoning: '同为外耳道肿痛，风热湿邪与肝胆湿热治法有何侧重？',
      feedback: '风热湿邪者病位浅表、起病急，重在疏风清热、兼祛其湿；肝胆湿热者痛连耳内、脓多口苦，重在清泻肝胆湿热，浅深轻重有别。',
      transfer: '游泳后外耳道灼痛痒、渗液糜烂者，试述内服立法与外治禁忌。',
    },
  },
  {
    id: 'pb41-x-009', title: '耳鼻喉·聤耳湿热困结证治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['聤耳', '化脓性中耳炎', '湿热困结', '清热祛湿', '龙胆泻肝汤'],
    intent: '掌握聤耳湿热困结证的主症舌脉、病机与清热祛湿解毒排脓治法，熟悉龙胆泻肝汤的运用与木通警戒。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '口问第二十八', originalText: '耳者，宗脉之所聚也。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '龙胆泻肝汤加减水煎：龙胆草6g、黄芩9g、栀子9g、泽泻12g、木通6g、车前子9g包煎、当归6g、生地黄12g、柴胡6g、生甘草3g，加蒲公英15g、金银花12g、皂角刺9g，日1剂分2次温服；滴耳药须先清拭脓液后再滴入，日2~3次。', caution: '方中木通须用木通科木通，禁用马兜铃科关木通；龙胆草栀子苦寒伤胃，脾胃虚寒者慎用，中病即止；脓液引流不畅、耳后红肿、乳突压痛或面瘫者须立即就医，滴耳仅限鼓膜未穿孔或遵医嘱。' },
    cases: null,
    stdJudgment: '聤耳耳内流脓黄稠、耳痛脓出痛减，湿热困结者鼓膜充血穿孔、头重口苦溲黄，舌红苔黄腻脉濡数。湿热蕴结耳窍、血肉腐化成脓，法当清热祛湿、解毒排脓，龙胆泻肝汤清泻肝胆湿热，蒲公英金银花解毒，皂刺溃脓，木通须用木通科之品。',
    coreDefinition: '聤耳湿热困结证以耳内流脓黄稠、耳痛、头重口苦、苔黄腻为特征，治以清热祛湿解毒排脓。',
    safety: { note: '脓液引流不畅或伴乳突压痛、面瘫者须立即就医；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '【高风险】关木通（马兜铃科）含马兜铃酸有肾毒性，禁作木通入药；肾功能不全者禁用', '龙胆草、栀子苦寒，脾胃虚寒者慎用，中病即止'] },
    learning: {
      knowledge: '主症耳内流脓黄稠量多，耳痛较甚、脓出痛减，鼓膜充血穿孔，听力下降，伴头重口苦、溲黄；舌红苔黄腻，脉濡数。病机湿热蕴结耳窍、血肉腐化成脓。治以清热祛湿、解毒排脓，龙胆泻肝汤加减（木通须用木通科之品），加蒲公英金银花皂角刺。',
      misjudgment: '聤耳流脓即重用排脓之品而不清湿热。错：脓由湿热腐化，徒排脓而湿热不清，脓源不竭；当清泻湿热以绝脓源，排脓为辅，内外兼施。',
      reasoning: '聤耳湿热困结用龙胆泻肝汤，方中木通为何须辨品种，误用有何危害？',
      feedback: '木通科木通利水通淋而无毒，马兜铃科关木通含马兜铃酸有肾毒性，误用可致肾损害，故处方用药须辨明品种，保障用药安全。',
      transfer: '耳内流脓黄稠量多、头重口苦者，试述清湿与排脓的配合及滴耳注意。',
    },
  },
  {
    id: 'pb41-x-010', title: '耳鼻喉·口糜脾胃积热证治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['口糜', '口腔溃疡', '脾胃积热', '清胃泻火', '凉膈散'],
    intent: '掌握口糜脾胃积热证的主症舌脉、病机与清胃泻火凉膈解毒治法，熟悉凉膈散清上泄下的配伍。',
    facts: [
      { field: 'clinical.主症', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.舌脉', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医耳鼻咽喉科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '金匮真言论篇第四', originalText: '中央黄色，入通于脾，开窍于口，藏精于脾。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '凉膈散加减水煎：连翘12g、栀子9g、黄芩9g、薄荷6g后下、大黄6g后下、芒硝6g冲服、竹叶9g、生甘草3g，加金银花12g、升麻6g、赤芍9g，日1剂分2次温服；外用冰硼散少许涂敷糜烂面，日2~3次，忌咽下。', caution: '大黄芒硝攻下，孕妇及经期忌用，脾虚便溏者慎用，中病即止；冰硼散含朱砂仅限外用涂敷，忌咽下、忌久用；糜烂久不愈合或伴高热者须口腔科排除恶变与系统性疾病。' },
    cases: null,
    stdJudgment: '口糜口腔黏膜糜烂灼痛、覆黄白假膜、口气臭秽，脾胃积热者口渴喜冷饮、便秘溲赤，舌红苔黄脉滑数。脾胃积热循经上炎、熏蒸口舌，法当清胃泻火、凉膈解毒，凉膈散清上泄下，黄芩栀子清泻火热，大黄芒硝釜底抽薪，金银花升麻解毒。',
    coreDefinition: '口糜脾胃积热证以口腔黏膜糜烂灼痛、覆黄白假膜、口气臭秽、便秘为特征，治以清胃泻火凉膈解毒。',
    safety: { note: '糜烂久不愈合或伴高热者须口腔科诊治排除恶变；专科辨证知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '大黄苦寒攻下，孕妇及经期忌用，脾虚便溏者慎用', '【高风险】朱砂含硫化汞忌火煅；0.1-0.5g只入丸散；不可久服；孕妇禁用（冰硼散仅限外用涂敷，忌咽下）'] },
    learning: {
      knowledge: '主症口腔黏膜糜烂，覆黄白色假膜，周围红晕，灼热疼痛，口气臭秽，口渴喜冷饮，便秘溲赤；舌红苔黄，脉滑数。病机脾胃积热循经上炎、熏蒸口舌。治以清胃泻火、凉膈解毒，凉膈散加减，加金银花升麻赤芍，外用冰硼散涂敷。',
      misjudgment: '口糜灼痛即投苦寒直折而不通腑。错：脾胃积热蕴于中焦，单清上焦而腑气不通，热无出路；凉膈散清上与通下并行，釜底抽薪方使热从下泄。',
      reasoning: '口糜脾胃积热何以取凉膈散清上与通下并施之法？',
      feedback: '脾胃为气机升降之枢，积热壅中则上熏口舌；大黄芒硝通腑泄热，引热下行，配合清上之品使热有出路，上下分消其势。',
      transfer: '口舌糜烂灼痛、口气臭秽而大便干结者，试述清上与通下并行的立法用意。',
    },
  },
];
