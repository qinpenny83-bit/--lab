// ============================================================
// 杏林大典 · Phase 5 · Batch-11 · 样本 Part F2（F 刺法灸法学 13 节点 pb11-f-013 ~ pb11-f-025）
// 学科：F 刺法灸法学；覆盖：皮肤针（梅花针叩刺）/ 三棱针（点刺放血）/ 皮内针（埋针法）/
//       电针法 / 头针（头皮针）/ 耳针（耳穴压豆）/ 艾炷灸（直接灸与间接灸）/ 艾条灸（温和灸雀啄灸回旋灸）/
//       温针灸 / 灸法补泻与施灸禁忌 / 拔罐法（闪罐走罐留罐）/ 刮痧法 / 穴位注射与穴位贴敷
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'theory'；title 一律「技法·要点」式；facts 来源仅限《刺法灸法学》《针灸学》规划教材
// safety：乳中、神阙禁针禁灸，颜面五官与大血管浅表处禁灸禁刺，孕妇腰骶腹部禁针灸等红线写入 prohibitions
// ============================================================

export const SAMPLES_PART_F2 = [
  // ============================================================
  // F 刺法灸法学 · 皮肤针（013）
  // ============================================================
  {
    id: 'pb11-f-013', title: '皮肤针·梅花针叩刺', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['刺法', '皮肤针', '梅花针', '出血', '感染风险'],
    intent: '掌握梅花针叩刺的持针姿势、腕力弹刺手法与轻中重三度刺激量的运用，牢记叩刺禁忌部位。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '叩刺频率 70-90 次/分，每穴区叩刺 1-3 分钟，以皮肤潮红或微出血为度；每日或隔日 1 次', caution: '重叩出血后须以消毒棉球按压止血；局部感染、出血性疾病患者禁用' },
    cases: null,
    stdJudgment: '皮肤针以腕力弹刺、针尖垂直叩击为操作要领，刺激量分轻中重三度；凡皮肤破损、瘢痕、大血管浅表处及孕妇腰骶腹部均禁叩，叩后出血须消毒按压。',
    coreDefinition: '皮肤针为浅刺皮肤之丛针，梅花针（5 枚）最常用；以腕力弹刺叩击经脉皮部，取浅刺皮肤、疏通皮部经气之义，多用于皮部病症与慢性调理。',
    safety: { note: '叩刺以针尖垂直落下、力度均匀为要，避免斜刺拖刮致痛；轻度出血属正常反应，须以消毒干棉球按压；针具须严格消毒，防止交叉感染。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['皮肤破损、溃疡、瘢痕处禁叩刺', '大血管浅表处禁叩刺', '孕妇腰骶部、腹部禁叩刺', '出血性疾病患者禁用'] },
    learning: {
      knowledge: '梅花针操作：针具与叩刺部位消毒后，右手握针柄，以腕关节弹力上下叩击，针尖垂直落到皮肤即迅速提起，频率 70-90 次/分。刺激量分三度：轻叩至皮肤潮红为补，中叩至红晕微出血为平补平泻，重叩至明显出血为泻。适应范围：头痛、失眠、眩晕、神经性皮炎、斑秃、近视（叩眼周）、痛经、带状疱疹后遗神经痛。叩刺部位按经脉循行（督脉、膀胱经背部第一侧线）或局部病灶选择。禁忌：皮肤破损、溃疡、瘢痕、肿瘤局部、大血管浅表处，孕妇腰骶腹部，出血倾向者。',
      misjudgment: '叩刺时用手腕主动下压而非腕部弹力。错：皮肤针靠腕关节弹力使针尖轻快垂直叩落，下压式叩击令针尖斜划皮肤，既痛又易感染；落针须垂直、起针须迅速。',
      reasoning: '同一梅花针，为何轻叩皮肤潮红属补、重叩出血属泻？',
      feedback: '皮部浅刺的刺激量决定补泻：轻叩仅振奋皮部卫气、故补，重叩疏泄瘀热邪气、故泻；刺激量须与病性虚实相称。',
      transfer: '带状疱疹后遗神经痛沿肋间分布，梅花针叩刺如何选择叩刺部位与轻重度？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 三棱针（014）
  // ============================================================
  {
    id: 'pb11-f-014', title: '三棱针·点刺放血', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['刺法', '三棱针', '放血', '出血风险'],
    intent: '掌握三棱针点刺放血的持针、进针深度与挤压出血操作，牢记虚证禁用与大血管处禁刺的红线。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.variation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '点刺深度 1-2 分（约 2-3mm），每穴出血数滴至数毫升，急性实证可稍多；隔日或每日 1 次', caution: '刺后以消毒干棉球按压 1-2 分钟止血；每次出血总量不宜过大，体弱者减量或不用' },
    cases: null,
    stdJudgment: '三棱针点刺以快速浅刺、挤压出血为要，主治实证热证；体质虚弱、贫血、出血倾向者及孕妇禁用，大血管浅表处禁刺，刺后须按压止血。',
    coreDefinition: '三棱针古称锋针，针体三棱、针尖锋利，专用于放血泻热；点刺浅刺 1-2 分，通过泄热、祛瘀、通络而泻实，属刺络泻血之法。',
    safety: { note: '点刺前严格消毒，刺后挤压出血并拭净，再以消毒干棉球按压止血；头面及大血管处禁刺，防止出血不止；晕针、晕血者取平卧施术。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['体质虚弱、贫血、有出血倾向者禁用', '大血管浅表处禁刺', '孕妇腰骶部、腹部禁刺', '头面部血管丰富处慎刺、禁深刺'] },
    learning: {
      knowledge: '点刺放血操作：选穴（十宣、十二井、耳尖、太阳、委中、大椎）常规消毒后，左手拇食中三指捏紧穴周皮肤，右手持三棱针快速垂直刺入 1-2 分（约 2-3mm）即出针，然后轻轻挤压针孔周围，使出血数滴至数毫升，以消毒棉球按压止血。常用方法有点刺、散刺、挑刺、泻血。适应范围：高热、中暑、惊厥、急性咽喉肿痛、目赤肿痛、麦粒肿、急性腰扭伤（委中放血）、高血压（耳尖放血）等实证热证瘀血证。注意事项：虚证、贫血、低血糖、出血性疾病禁用；同一部位放血量不宜过多；针具一次性或严格消毒。',
      misjudgment: '对虚证或贫血患者也照常用三棱针放血。错：三棱针放血为泻法，气血亏虚者一经放血，正虚更甚，可致晕厥；虚人确需者只宜少量浅刺或改用他法。',
      reasoning: '同为咽喉肿痛，为何实热证用少商、商阳点刺出血，而虚热证反而禁刺放血？',
      feedback: '点刺放血泄热祛瘀只针对实邪：实热壅肺咽痛刺井穴出血可顿挫热势；虚热为阴津亏耗，放血更伤阴血，故禁刺，当滋阴清热。',
      transfer: '麦粒肿初起目睑红肿，耳尖或太阳穴点刺放血为何能泻热消肿？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 皮内针（015）
  // ============================================================
  {
    id: 'pb11-f-015', title: '皮内针·埋针法', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['刺法', '皮内针', '埋针', '感染风险'],
    intent: '掌握皮内针麦粒型、图钉型的埋针操作与留置时间，牢记关节活动处及孕妇腹部腰骶禁埋的红线。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '埋针 1-3 天，期间每日按压 2-3 次以增强刺激；图钉型多用于耳穴、面部，麦粒型多用于背腰四肢', caution: '埋针处避免沾水，防感染；局部红肿疼痛即取针' },
    cases: null,
    stdJudgment: '皮内针以麦粒型横刺皮内、图钉型直按压入为基本操作，留置 1-3 天持续刺激；关节活动处、感染处禁埋，埋后防沾水感染。',
    coreDefinition: '皮内针将特制小针埋入皮内或皮下，留置数日以持续刺激腧穴，属浅刺久留之法；取静以留之之义，适用于慢性病、疼痛与需要持续刺激之证。',
    safety: { note: '埋针前局部严格消毒，埋后嘱患者保持局部干燥、避免抓挠，每日按压 1-2 分钟以巩固刺激；若局部红肿、疼痛、感染须立即取出并对症处理。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['关节活动处禁埋针', '皮肤感染、溃破处禁埋针', '孕妇腰骶部、腹部禁针', '留针期间局部禁沾水'] },
    learning: {
      knowledge: '埋针法操作：麦粒型皮内针用镊子夹住针身，针尖与皮肤呈 15-30° 角沿皮横刺入皮内 0.3-0.5cm，针柄留于皮外以胶布固定；图钉型（揿针）将针尖对准穴点直接按压刺入皮内，胶布固定。留置时间一般 1-3 天，夏季或汗多时 1 天左右，期间每日按压 2-3 次（每次 1 分钟）增强刺激。适应范围：头痛、失眠、三叉神经痛、哮喘、胃脘痛、遗尿、高血压、痛经等慢性或发作性疾病。注意事项：关节活动处、皮肤破损感染处、孕妇腰骶腹部禁埋；埋后防沾水、防过敏。',
      misjudgment: '把皮内针深刺入皮下肌肉层。错：皮内针只入皮内或皮下 0.3-0.5cm，深刺入肌层既失去皮内持续刺激之意，又易引起疼痛、弯针与感染。',
      reasoning: '哮喘缓解期为何常用皮内针埋于肺俞、定喘等穴以持续刺激？',
      feedback: '缓解期哮喘以扶正固本为主，皮内针浅刺久留持续刺激肺俞、定喘、膏肓，能较长时间激发经气、调节肺功能，比一次毫针刺激更持久。',
      transfer: '顽固性失眠，皮内针埋于安眠、神门、心俞，为何选这些穴并留针 1-2 天？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 电针法（016）
  // ============================================================
  {
    id: 'pb11-f-016', title: '电针法·波形参数', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['刺法', '电针', '波形', '禁忌证'],
    intent: '掌握电针疏波、密波、疏密波、断续波的频率参数与主治差异，牢记起搏器者禁用等安全红线。',
    facts: [
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '疏波 2-5Hz 用于痿证、肌肉萎缩；密波 50-100Hz 用于镇痛；通电 10-30 分钟，每日或隔日 1 次', caution: '电流由小渐大，避免突然加大；靠近延髓、脊髓的穴位慎用大电流' },
    cases: null,
    stdJudgment: '电针在毫针得气后通电，以波形频率调控刺激量：疏波兴奋、密波镇痛、疏密断续波作用广泛；起搏器植入者禁用，孕妇腰骶腹部及延髓、心前区穴位禁用电针。',
    coreDefinition: '电针是在毫针针刺得气基础上，接通电针仪输出电流以持续刺激腧穴的方法；通过频率、波形与强度参数调节刺激量，增强并替代手工捻转，适用于瘫痪、痿痹、疼痛诸证。',
    safety: { note: '通电前检查仪器与导线绝缘，电流从小到大缓慢调大，避免患者突然受电击；两电极不得跨越心脏纵轴（禁置心前区），延髓、脊髓附近穴慎用；电针过程中须观察患者反应，出现不适应立即减小电流或断电。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['安装心脏起搏器者禁用电针', '孕妇腰骶部、腹部禁电针', '心前区、延髓附近穴位禁电针', '皮肤破损感染处禁置电极'] },
    learning: {
      knowledge: '电针操作：毫针针刺得气后，把电针仪输出导线夹在针柄上，先选波形频率再缓慢调大电流，以患者有麻感而能耐受为度，通电 10-30 分钟。参数要领：疏波（2-5Hz）兴奋作用明显，用于痿证、肌肉萎缩、瘫痪（面瘫、中风后遗症）；密波（50-100Hz）镇痛、解痉，用于各种疼痛、肌肉痉挛；疏密波、断续波不易产生耐受，用于急性疼痛与肌肉萎缩锻炼。适应范围：痹证、坐骨神经痛、术后痛、神经衰弱等。注意事项：起搏器者禁用；孕妇腰骶腹部、心前区、延髓附近禁电针；两电极避免横跨脊柱与心脏。',
      misjudgment: '把密波用于痿证瘫痪而疏波用于镇痛。错：密波频率高，易致肌肉疲劳、兴奋作用弱，主要用于镇痛解痉；疏波频率低、单个脉冲刺激强，兴奋与收缩肌肉作用明显，才适合痿证瘫痪。',
      reasoning: '同一电针，为何坐骨神经痛宜用密波、面瘫恢复期宜用疏密波或断续波？',
      feedback: '疼痛以密波高频抑制传导而镇痛；面瘫恢复期需兴奋神经肌肉，疏密波、断续波交替刺激不易耐受疲劳，促进肌力恢复，故选后者。',
      transfer: '中风后足下垂患者，电针阳陵泉、解溪宜选何波形与频率？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 头针（017）
  // ============================================================
  {
    id: 'pb11-f-017', title: '头针·头皮针分区', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['刺法', '头针', '头皮针', '出血'],
    intent: '掌握头皮针刺激区定位、平刺进针角度深度与快速捻转参数，牢记囟门未闭小儿禁刺等红线。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '针尖与头皮呈 15-30° 角平刺 0.5-1.5 寸，捻转 200 次/分左右，留针 20-30 分钟；每日或隔日 1 次', caution: '头皮血管丰富，出针后按压 1-2 分钟防出血；中风急性期病情不稳定者慎用' },
    cases: null,
    stdJudgment: '头针按大脑皮层功能分区定刺激区，以 15-30° 角沿皮平刺入帽状腱膜下、快速捻转 200 次/分为操作核心；囟门未闭小儿与头皮感染者禁刺，出针须按压防出血。',
    coreDefinition: '头针又称头皮针，依据大脑皮层功能定位在头皮划分刺激区针刺，以平刺、快速捻转激发经气，主治脑源性疾患；刺激区易混淆，须牢记运动区、感觉区、言语区定位。',
    safety: { note: '头皮血管丰富，出针后须用消毒干棉球按压 1-2 分钟以防血肿；针刺沿帽状腱膜下层平刺，勿垂直深刺；小儿囟门未闭者禁刺，头皮感染溃疡处禁刺；中风急性期、高热惊厥等病情危重者慎用。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['囟门未闭小儿禁刺', '头皮感染、溃疡处禁刺', '有出血倾向者慎用头针', '孕妇腰骶部、腹部禁针'] },
    learning: {
      knowledge: '头皮针操作：取坐位或卧位，选好刺激区（运动区、感觉区、言语一、二、三区、晕听区、舞蹈震颤控制区）并常规消毒，用 28-30 号 1.5-2 寸毫针，针尖与头皮呈 15-30° 角快速刺入帽状腱膜下层，进针 0.5-1.5 寸，不提插，以拇指食指捻转 200 次/分左右，持续 2-3 分钟，留针 20-30 分钟，期间捻转 1-2 次；可配合电针。适应范围：中风偏瘫、失语、吞咽困难、面瘫、眩晕、失眠、癫痫、帕金森病等脑源性疾病。注意事项：头皮感染、囟门未闭、出血倾向者禁用。',
      misjudgment: '把言语区与运动区的头皮定位混用。错：言语一区位于运动区下 2/5（大脑皮层语言运动中枢投影），主治运动性失语；运动区主治对侧肢体瘫痪。二者相邻而功能各异，定位不准则效差。',
      reasoning: '为何头针进针要沿皮平刺于帽状腱膜下层并快速捻转，而非直刺头皮？',
      feedback: '帽状腱膜下层疏松，沿皮平刺便于进针且不易伤及血管神经，快速捻转能产生足够刺激量又无疼痛，是头皮针安全高效的进针层次。',
      transfer: '脑梗死致右侧肢体偏瘫伴运动性失语，头针应选哪些刺激区、在哪侧头皮针刺？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 耳针（018）
  // ============================================================
  {
    id: 'pb11-f-018', title: '耳针·耳穴压豆', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['刺法', '耳针', '耳穴', '压豆'],
    intent: '掌握耳穴压豆的选穴、贴压与按压参数，牢记耳廓感染禁用及孕妇习惯性流产史者禁压生殖区耳穴。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '每穴每次按压 1-2 分钟，每日 3-5 次；贴压 3-5 天，双耳交替', caution: '按压勿用力过猛致皮肤破损；耳廓对胶布过敏者改用磁珠或缩短贴敷时间' },
    cases: null,
    stdJudgment: '耳穴压豆以王不留行籽贴压敏感点、每日按压 3-5 次为要，适合疼痛失眠等慢性调理；耳廓感染、冻伤者禁用，有习惯性流产史者禁压子宫、卵巢等耳穴。',
    coreDefinition: '耳针在耳廓相应穴位针刺或压豆以诊治疾病，压豆法以王不留行籽贴压持续按压刺激，安全简便，为耳针最常用之操作；耳穴选取遵循相应部位、脏腑辨证、经验穴等原则。',
    safety: { note: '耳廓皮肤菲薄、血运较差，压豆前须检查有无冻伤、炎症、湿疹；按压手法由轻到重，防止破皮感染；胶布过敏者慎用。有习惯性流产史或孕妇禁针耳穴，压豆亦须避开子宫、卵巢、内分泌等穴。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['耳廓冻伤、炎症、湿疹处禁用', '孕妇禁针耳穴；有习惯性流产史者禁用子宫、卵巢、内分泌等耳穴', '耳廓出血不止者禁针', '胶布过敏者慎用压豆'] },
    learning: {
      knowledge: '耳穴压豆操作：耳廓常规消毒后，用探棒或压痛法在相应耳穴（神门、心、肾、皮质下、内分泌等）寻找敏感点，将王不留行籽粘于 0.5cm×0.5cm 胶布中央，对准敏感点贴压固定，以拇指食指对捏按压至耳廓出现酸、麻、胀、痛（得气感）。每日自行按压 3-5 次，每次 1-2 分钟，双耳交替，3-5 天更换。适应范围：头痛、牙痛、失眠、呃逆、单纯性肥胖、戒烟、高血压、近视、痛经、神经衰弱等。注意事项：耳廓冻伤炎症、孕妇（习惯性流产史）禁用。',
      misjudgment: '贴压耳穴后只贴不按。错：压豆的刺激靠反复按压实现，仅贴不按刺激量不足，须每日按压 3-5 次、每次 1-2 分钟至酸胀，方能持续激发耳穴经气。',
      reasoning: '失眠患者耳穴压豆常取神门、心、皮质下、枕，这些耳穴为何组合能安神？',
      feedback: '神门为止痛安神要穴、心主神明、皮质下调节大脑皮层兴奋抑制、枕镇静，四穴相配共奏宁心安神，符合脏腑辨证与经验取穴相结合。',
      transfer: '肥胖患者耳穴压豆取饥点、内分泌、脾、胃，其作用机理是什么？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 艾炷灸（019）
  // ============================================================
  {
    id: 'pb11-f-019', title: '艾炷灸·直接灸与间接灸', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['灸法', '艾炷灸', '直接灸', '间接灸', '烫伤'],
    intent: '掌握直接灸（瘢痕灸与无瘢痕灸）与间接灸（隔姜、隔蒜、隔附子饼等）的操作参数，牢记禁灸部位红线。',
    facts: [
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '艾炷大小如麦粒、黄豆或半枣核；无瘢痕灸以皮肤红晕为度（3-5 壮），隔姜灸每壮燃尽易姜再灸，一般 3-7 壮', caution: '瘢痕灸须取得患者同意并预防感染与瘢痕；间接灸所用姜蒜片须新鲜、厚薄均匀' },
    cases: null,
    stdJudgment: '艾炷灸分直接灸与间接灸：直接灸有瘢痕灸与无瘢痕灸之别，间接灸以姜、蒜、附子饼等为隔；颜面五官、乳中及大血管浅表处禁灸，孕妇腰骶腹部禁灸。',
    coreDefinition: '艾炷灸将艾绒搓成圆锥形炷体点燃施灸，直接置于皮肤者称直接灸，隔以姜蒜盐药者称间接灸；间接灸借药物与艾火温通之力，温阳散寒力专，为灸法之主体。',
    safety: { note: '施灸时注意防止艾炷倾倒、艾火脱落烫伤，瘢痕灸化脓期间须无菌换药；隔姜蒜片须新鲜、厚薄均匀，中间扎孔透气；颜面五官、乳中、大血管浅表处、孕妇腰骶腹部禁灸，实热证、阴虚内热者慎灸。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['乳中、神阙禁针禁灸', '颜面部与五官禁灸', '大血管浅表处禁灸', '孕妇腰骶部、腹部禁灸', '实热证、阴虚发热者慎灸'] },
    learning: {
      knowledge: '艾炷灸操作：将艾绒搓成上尖下平的圆锥形艾炷（麦粒大、黄豆大或半枣核大）。直接灸分两种：瘢痕灸（化脓灸）将艾炷直接置于穴位（如足三里、大椎）点燃，燃至将尽时按灭或任其燃尽，以局部烫伤化脓、愈后留瘢；无瘢痕灸燃至患者感灼痛时即换炷，以皮肤红晕为度，不起泡不留瘢。间接灸：隔姜灸取鲜姜片厚 0.2-0.3cm、中间针刺数孔，置穴上再放艾炷点燃，每壮燃尽易姜再灸，3-7 壮；隔蒜灸用于疮疡初起、蛇咬伤；隔附子饼灸用于阳痿、虚寒腹痛。适应范围：寒证虚证，如胃寒腹痛、泄泻、哮喘、痹证、疮疡阴证。',
      misjudgment: '把隔姜灸的姜片切得又厚又大或中间不扎孔。错：姜片过厚则艾热难以透达、灸效大减，过薄则易烫伤；中间扎数孔是让艾火热气透入，这是隔姜灸取效的关键操作。',
      reasoning: '同为虚寒腹痛，为何有人宜隔姜灸中脘、有人宜隔附子饼灸关元、气海？',
      feedback: '隔姜灸温中和胃、散寒止呕，适合中焦胃寒之腹痛呕吐；隔附子饼灸温肾助阳、散寒止痛，适合下元虚寒之腰痛、阳痿、宫寒；病位病性不同则所隔之药不同。',
      transfer: '寒湿痹痛日久、关节冷痛者，无瘢痕灸与隔姜灸如何取舍壮数与疗程？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 艾条灸（020）
  // ============================================================
  {
    id: 'pb11-f-020', title: '艾条灸·温和灸雀啄灸回旋灸', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['灸法', '艾条灸', '温和灸', '雀啄灸', '回旋灸'],
    intent: '掌握温和灸、雀啄灸、回旋灸三种悬起灸手法的距离、时长与适用差异，牢记颜面五官禁灸。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '燃端距皮肤 2-3cm，每穴灸 10-20 分钟，以皮肤潮红为度；每日 1-2 次', caution: '雀啄灸、回旋灸用于局部怕冷与痛点；防止艾灰脱落烫伤' },
    cases: null,
    stdJudgment: '艾条悬灸以温和灸为基本式，雀啄灸与回旋灸为变化式，均以皮肤温热红晕为度；颜面五官、大血管浅表处禁灸，施灸须防艾灰脱落烫伤。',
    coreDefinition: '艾条灸将艾绒卷成条状点燃悬于穴位上方施灸，悬起灸分温和灸、雀啄灸、回旋灸三种手法；操作简便、温热刺激柔和，为灸法最常用的形式。',
    safety: { note: '艾条燃端勿靠皮肤太近，随时弹去艾灰，防止灼伤皮肤与烧毁衣物；灸后局部红晕属正常，起水泡须防感染；颜面五官、大血管浅表处禁灸，孕妇腰骶腹部禁灸。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['颜面部与五官禁灸', '大血管浅表处禁灸', '孕妇腰骶部、腹部禁灸', '乳中、神阙禁针禁灸'] },
    learning: {
      knowledge: '艾条灸操作：将艾条一端点燃，右手持艾条悬于穴上方施灸。温和灸：燃端距皮肤 2-3cm 固定不动，每穴灸 10-20 分钟，至皮肤温热红晕为度，患者自觉温热舒适。雀啄灸：燃端如鸟雀啄食般一上一下移动施灸，距皮肤忽近忽远，刺激量较大，多用于急性疼痛、晕厥急救。回旋灸：燃端在穴区皮肤上方往复回旋移动，温热面大，多用于面积较大之痹痛麻木（如腰背、肩周）。适应范围：虚寒性胃脘痛、泄泻、痛经、风寒湿痹、宫寒不孕、阳虚感冒及保健灸（足三里、关元、气海）。',
      misjudgment: '雀啄灸时把艾条固定在一个高度不动。错：雀啄灸的要领是上下移动、忽近忽远，刺激量一强一弱交替；固定不动就成了温和灸，失去啄击样强刺激作用。',
      reasoning: '腰背痛面积较大与痛点局限者，为何分别宜用回旋灸与雀啄灸？',
      feedback: '回旋灸热力散布面积大，适合面状痹痛麻木；雀啄灸刺激集中而强，适合点状痛点与急救；选法应随病灶范围而定。',
      transfer: '保健灸足三里以温和灸为宜，每日 10-15 分钟，其温补脾胃之理是什么？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 温针灸（021）
  // ============================================================
  {
    id: 'pb11-f-021', title: '温针灸·针上加灸', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['灸法', '温针灸', '毫针', '烫伤'],
    intent: '掌握温针灸在针柄上裹艾绒、插艾条段的操作要领与防烫措施，牢记颜面五官及孕妇腰骶腹部禁用。',
    facts: [
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.feature', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '艾绒团或 2cm 艾条段，每针每次灸 1-3 壮（或燃完一段）；留针共约 20-30 分钟，燃尽冷却后出针', caution: '针柄下垫纸片接灰防烫伤；艾火未熄不得取针' },
    cases: null,
    stdJudgment: '温针灸在毫针留针时于针柄上加艾点燃，借针体导热深入穴内，针与灸并施；须防艾灰脱落烫伤，颜面五官与大血管处不宜，孕妇腰骶腹部禁用。',
    coreDefinition: '温针灸是针刺与艾灸结合之法：毫针得气留针后，在针柄上裹艾绒或插艾条段点燃，使热力沿针身传入穴内，温经散寒、通络止痛力专。',
    safety: { note: '艾绒应捻紧裹牢在针柄上，或插 2cm 艾条段，点燃前在针下方皮肤垫硬纸片接灰，防止艾灰脱落烫伤；艾火未燃尽不得拔针；颜面五官、大血管浅表处及孕妇腰骶腹部禁用。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['颜面部与五官禁灸（温针灸亦禁）', '大血管浅表处禁灸', '孕妇腰骶部、腹部禁针灸', '乳中禁针禁灸', '艾灰未熄不得拔针，防烫伤'] },
    learning: {
      knowledge: '温针灸操作：毫针针刺得气后留针，将艾绒搓成枣核大团裹缠于针柄上，或截取 2cm 左右艾条段从针柄上端插套，从下端点燃，使热力沿针身传入穴位深部。每针每次 1-3 壮，或燃完一段艾条，待艾火完全燃尽、针柄冷却后再出针，留针共约 20-30 分钟。操作要点：艾绒裹紧防脱落，针下垫纸片接灰，随时询问患者热感，过热时移开纸片散热。适应范围：风寒湿痹之腰腿痛、关节冷痛、肩凝、胃寒腹痛、痛经、痿证。注意事项：颜面五官、大血管浅表处、孕妇腰骶腹部禁用。',
      misjudgment: '温针灸点燃艾绒后患者刚感热烫就出针。错：温针灸须待艾火燃尽、热度经针身传导充分后再出针，过早出针既失温通之效，针热未退拔针还易带出艾火烫伤。',
      reasoning: '寒湿腰痛与虚寒胃痛，为何温针灸比单纯针刺或单纯艾灸效果更持久？',
      feedback: '温针灸借针体为导热媒介，热力直达病所深部，同时针刺疏通经络与艾灸温散寒邪协同作用，故对深部寒湿痹痛优于单用针或灸。',
      transfer: '膝关节冷痛遇寒加重，温针灸犊鼻、内膝眼、阳陵泉的操作要点有哪些？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 灸法补泻与施灸禁忌（022）
  // ============================================================
  {
    id: 'pb11-f-022', title: '灸法·补泻与施灸禁忌', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['灸法', '补泻', '禁灸', '禁忌'],
    intent: '掌握灸法补泻（毋吹其火为补、疾吹其火为泻）与实热阴虚禁灸、禁灸部位等禁忌，防止误灸。',
    facts: [
      { field: 'method.principle', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '补法：小炷 3-5 壮，艾火温和，不吹其火；泻法：大炷 5-10 壮或灸至灼痛，疾吹其火', caution: '凡实热、阴虚火旺、热病及部位禁忌者禁灸' },
    cases: null,
    stdJudgment: '灸法补泻以火之强弱与壮数多少为纲，徐徐自灭为补、疾吹旺火为泻；实热阴虚者禁灸，颜面五官、乳中、大血管浅表处及孕妇腰骶腹部均在禁灸之列。',
    coreDefinition: '灸法以艾火温通为用，其补泻取决于火力强弱与刺激量：温和持久者补阳，强火急灸者泻实散结；灸非万能，热证、阴虚及部位禁忌必须严守。',
    safety: { note: '施灸先辨证：实热、阴虚内热、温病热盛者误灸可助火伤阴、变证丛生；部位上颜面五官、乳中、神阙、大血管浅表处、阴部禁灸，孕妇腰骶腹部禁灸；灸后局部小水泡可自行吸收，大水泡须无菌处理。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['乳中、神阙禁针禁灸', '颜面部与五官禁灸', '大血管浅表处禁灸', '孕妇腰骶部、腹部禁灸', '实热证、阴虚发热、热毒证禁灸', '阴部禁灸'] },
    learning: {
      knowledge: '灸法补泻源于《灵枢·背俞》：「以火补者，毋吹其火，须自灭也；以火泻者，疾吹其火，传其艾，须其火灭也。」补法：艾炷宜小、壮数宜少（3-5 壮），点燃后不吹其火，任其徐燃自灭，火力温和，温阳补虚，用于虚寒证（脾肾阳虚之泄泻、宫寒不孕）。泻法：艾炷宜大、壮数宜多，点燃后疾吹其火，使火力强旺，灸至局部灼痛，温通散结、引热外出，用于寒湿痹痛、阴疽初起。施灸禁忌：①实热证、阴虚发热、热毒炽盛（高热、吐血、疔疮走黄）禁灸；②部位禁忌：颜面五官、乳中、神阙、大血管浅表处、阴部禁灸，孕妇腰骶腹部禁灸；③过饥过饱、醉酒、大惊大怒者暂不宜灸。',
      misjudgment: '认为灸法只能补阳，实热证用灸也无妨。错：灸法分补泻，实热、阴虚火旺者误灸如火上添油，助热伤津；热病、吐衄等皆属禁灸之列，并非虚寒才能灸、而是热证必须禁灸。',
      reasoning: '同是艾灸，为何「毋吹其火」为补、「疾吹其火」为泻？',
      feedback: '不吹其火则火力徐缓、温和持久，正合补法温养之义；疾吹其火则火势旺烈、刺激强烈，取泻法开通散结之力；火力强弱即补泻之别。',
      transfer: '孕妇下肢寒湿疼痛，为何艾灸腰骶、腹部属禁忌而灸足三里亦须审慎？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 拔罐法（023）
  // ============================================================
  {
    id: 'pb11-f-023', title: '拔罐法·闪罐走罐留罐', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['罐法', '闪罐', '走罐', '留罐', '烫伤'],
    intent: '掌握闪火法及留罐、闪罐、走罐三种手法的操作参数与适应差异，牢记禁用部位与留罐时长。',
    facts: [
      { field: 'method.definition', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '留罐 10-15 分钟；闪罐反复 10-20 次；走罐至皮肤潮红为度；刺络拔罐出血数毫升', caution: '留罐时间过长易起水泡，儿童与皮肤薄嫩者缩短时间' },
    cases: null,
    stdJudgment: '拔罐以负压吸拔为用，留罐、闪罐、走罐、刺络拔罐各有要领；皮肤破损、水肿、大血管浅表处及孕妇腰骶腹部禁用，留罐时间过长可致水泡。',
    coreDefinition: '拔罐法利用燃烧或抽气使罐内形成负压，吸附于腧穴或体表以祛风散寒、活血通络；留罐、闪罐、走罐等不同手法刺激量与作用面各有差异。',
    safety: { note: '闪火法操作时酒精棉球火焰勿烧灼罐口，防止烫伤皮肤；走罐须先涂凡士林等润滑介质；留罐时间不宜超过 15 分钟，出现水泡者小泡任其吸收、大泡无菌处理；皮肤破损、水肿、大血管浅表处及孕妇腰骶腹部禁用。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['皮肤溃疡、破损、水肿处禁用拔罐', '大血管浅表处禁用', '孕妇腰骶部、腹部禁用', '高热抽搐、有出血倾向者禁用', '留罐时间禁超过 15 分钟（防起泡）'] },
    learning: {
      knowledge: '拔罐操作：闪火法用镊子夹持酒精棉球点燃后伸入罐内绕 1-2 圈即抽出，迅速将罐扣于选定部位（沿肌肉丰满处）。留罐法：罐吸着后留置 10-15 分钟，至皮肤充血或瘀血为度起罐。闪罐法：罐吸着后立即拔下再吸拔，反复 10-20 次至皮肤潮红，用于局部麻木、面瘫、虚寒证。走罐法：罐口及皮肤涂凡士林等润滑剂，吸罐后手握罐体沿经络或肌肉走行上下推拉移动，至皮肤潮红为度，用于腰背、四肢大面积的痹痛。适应范围：风寒湿痹、腰背痛、感冒、咳嗽、哮喘、胃脘痛、软组织损伤。注意事项：皮肤破损、大血管浅表处、孕妇腰骶腹部禁用。',
      misjudgment: '走罐时不涂润滑介质直接推拉。错：走罐靠罐口在皮肤上滑动，无介质则罐口与皮肤摩擦牵拉疼痛、破皮；凡士林等润滑是走罐的必要准备。',
      reasoning: '同一拔罐，为何面瘫早期宜闪罐而腰背寒湿痛宜走罐或留罐？',
      feedback: '面瘫病位浅、面积小且面部皮肤薄嫩，闪罐轻刺激鼓动经气；腰背寒湿痛病位深、面积大，走罐留罐刺激强、祛寒通络彻底；手法随部位与病情而选。',
      transfer: '刺络拔罐（三棱针点刺后加罐）用于急性腰扭伤，其泻血通络之理与禁忌是什么？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 刮痧法（024）
  // ============================================================
  {
    id: 'pb11-f-024', title: '刮痧法·刮拭手法', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['刮痧', '出痧', '皮肤损伤'],
    intent: '掌握刮痧板与皮肤的角度、力度与出痧度判定，牢记出血倾向者禁用及孕妇腰骶腹部禁刮。',
    facts: [
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.principle', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '每部位刮拭 10-20 次或至出痧，顺序自上而下、由内向外；刮后饮温水，休息 30 分钟', caution: '出痧处 3-5 天消退前不宜再刮；刮拭力量过大致皮肤破损者消毒处理' },
    cases: null,
    stdJudgment: '刮痧以刮板蘸介质、与皮肤呈 45° 角由轻到重刮拭至出痧为要，适用于外感暑热与肌肉酸痛；皮肤破损、出血倾向者禁用，孕妇腰骶腹部禁刮。',
    coreDefinition: '刮痧用刮痧板蘸介质在体表反复刮拭，使皮下毛细血管破裂渗血成痧，以疏经通络、祛邪外出；操作以角度、力度与出痧为度为核心。',
    safety: { note: '刮痧板与皮肤须有介质润滑，刮拭方向一致、力度均匀，出痧即止，不必强求出深紫色痧；皮肤破损、感染、出血性疾病、血小板减少者禁用；孕妇腰骶腹部及乳晕部禁刮；刮后避风寒、勿立即洗冷水澡。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['皮肤破损、溃疡、感染处禁刮痧', '有出血倾向、血小板减少者禁用', '孕妇腰骶部、腹部及乳晕部禁刮', '大血管浅表处禁重刮', '出痧未退（3-5 天）不宜重复刮拭'] },
    learning: {
      knowledge: '刮痧操作：取坐位或卧位，暴露刮拭部位（颈项、肩背、腰骶、四肢），在皮肤涂刮痧油或清水，右手持刮痧板，刮板与皮肤呈 45° 角，先轻后重、单向刮拭（不可来回），每部位刮 10-20 次或至皮肤出现红色、暗红色痧点为止。顺序多自上而下、由内向外，颈项部先刮正中督脉再刮两侧膀胱经。适应范围：中暑、外感发热、头痛、咽痛、颈肩腰背酸痛、胸闷、恶心、风湿痹痛。注意事项：出痧后饮温水休息，3-5 天痧退后再刮；皮肤破损、出血倾向者禁用。',
      misjudgment: '刮痧时来回反复刮拭或过度用力追求深色痧。错：刮痧须单向刮拭、由轻到重、出痧即止，来回刮或蛮力刮易损伤皮肤、加重瘀血，深痧并非疗效越好。',
      reasoning: '中暑高热患者刮痧取颈项、背部膀胱经，为何能透热解暑？',
      feedback: '暑热之邪闭阻肌表经络，刮拭膀胱经、督脉疏通阳气、开腠理而透邪外出，痧出则热散，故中暑刮痧取效快捷。',
      transfer: '颈肩酸痛反复发作者自行刮痧，刮拭方向与出痧程度的把握应注意什么？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 穴位注射与穴位贴敷（025）
  // ============================================================
  {
    id: 'pb11-f-025', title: '穴位注射与穴位贴敷·操作要点', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['穴位注射', '穴位贴敷', '药物', '过敏'],
    intent: '掌握穴位注射回抽无血后注药、每穴 0.5-2ml 的剂量，以及穴位贴敷敷贴时间，牢记药物过敏与孕妇禁忌。',
    facts: [
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.parameter', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.operation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'method.indication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
      { field: 'method.contraindication', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '穴位注射每穴 0.5-2ml（头面耳穴 0.1-0.5ml），每日或隔日 1 次；穴位贴敷成人 2-6 小时、儿童 1-2 小时，以局部灼热起红晕为度', caution: '药物须在医生处方下使用，过敏体质者先小面积试贴；注药前回抽确认无血' },
    cases: null,
    stdJudgment: '穴位注射以得气回抽无血后缓慢注药为要，每穴 0.5-2ml；穴位贴敷以药膏敷穴、灼热起泡为度；两者均须严守药物过敏、皮肤破损、孕妇及重要脏器部位禁忌。',
    coreDefinition: '穴位注射将药液注入腧穴以兼取针刺与药物双重作用，穴位贴敷以药膏贴敷穴区经皮渗透而治病；一注一敷，皆以穴为靶、以药为用，须严守剂量与禁忌。',
    safety: { note: '穴位注射前须回抽无回血再注药，严禁药液注入血管或神经干，胸背穴注药须防气胸；青霉素类等须先皮试，过敏体质慎用；穴位贴敷药物多辛温走窜（白芥子、细辛、甘遂等），敷后灼痛起泡须即时揭去并防感染。孕妇腰骶腹部及合谷、三阴交等穴禁用。仅作知识学习，禁止无资质自行针刺/艾灸。', prohibitions: ['孕妇腰骶部、腹部及合谷、三阴交等穴禁用穴位注射与贴敷', '胸背部穴位注射禁深刺，防气胸', '药液禁注入血管与神经干', '皮肤破损、感染处禁贴敷', '过敏体质者慎用，强刺激性药物禁用于面部'] },
    learning: {
      knowledge: '穴位注射操作：选用 2-5ml 注射器、细针头抽取药液（当归注射液、维生素 B12 等），在选穴处常规消毒，快速刺入皮下后缓慢进针，得气后回抽无血，再缓慢注入药液 0.5-2ml（头面部、耳穴 0.1-0.5ml），出针按压片刻。每日或隔日 1 次。适应范围：痹证、腰腿痛、面瘫、哮喘、胃痛、神经衰弱。穴位贴敷操作：将药物研细末用姜汁、醋或水调成膏，制成药饼敷贴于穴位（三伏贴取肺俞、膏肓、定喘、膻中），胶布固定，成人 2-6 小时、儿童 1-2 小时，以局部灼热、红晕或小水泡为度，揭去药膏。适应范围：哮喘、慢支、过敏性鼻炎、虚寒性胃痛、痛经。禁忌：皮肤破损、药物过敏者禁用。',
      misjudgment: '穴位注射时回抽见血仍继续注药。错：回抽见血提示针尖已入血管，继续注药会使药液进入血循环，轻则效差、重则栓塞或过敏反应，必须退针换位重刺，确认无回血后再注。',
      reasoning: '同是三伏天贴敷，为何哮喘患者贴肺俞、膏肓、定喘，而痛经患者贴关元、气海、三阴交？',
      feedback: '三伏贴以冬病夏治为纲，选穴按病位与辨证：哮喘病在肺，取背俞穴与任脉膻中；痛经病在胞宫，取下焦任脉与三阴交、关元，温经散寒止痛；穴随证移。',
      transfer: '过敏性鼻炎患者三伏贴取大椎、肺俞、风门、印堂，贴敷时间与起泡处理应注意什么？',
    },
  },
];
