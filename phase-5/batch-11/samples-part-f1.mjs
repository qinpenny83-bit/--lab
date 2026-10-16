// ============================================================
// 杏林大典 · Phase 5 · Batch-11 · 样本 Part F1（F 刺法灸法学 12 节点 pb11-f-001 ~ pb11-f-012）
// 学科：F 刺法灸法学；覆盖：毫针刺法系列（进针 / 角度深度 / 得气行针 / 补泻 / 留针出针 / 异常处理 / 注意事项）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// 经典引文按白名单分层；sourceTitle 仅用《刺法灸法学》规划教材 / 《针灸学》规划教材
// 禁针禁灸部位（乳中、神阙）与孕妇禁忌写入 prohibitions；异常处理原则写入 safety.note
// ============================================================

export const SAMPLES_PART_F1 = [
  // ============================================================
  // F 刺法灸法学 · 毫针刺法 · 进针手法（001–004）
  // ============================================================
  {
    id: 'pb11-f-001', title: '毫针刺法·进针手法', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['毫针刺法', '进针手法', '押手刺手'],
    intent: '掌握指切、夹持、舒张、提捏四种进针手法的操作要领与各自适用范围。',
    facts: [
      { field: 'technique.method.entry', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.operation.steps', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.indications', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.safety', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '毫针进针以刺手（右手）持针、押手（左手）辅助，四法按针之长短与部位皮肉厚薄选用：指切宜短针，夹持宜长针，舒张宜松弛皱褶之腹部，提捏宜皮薄肉浅之处，总以快速透皮减痛为要。',
    coreDefinition: '进针手法是毫针刺入皮下的操作技术，以左右手配合完成，分指切、夹持、舒张、提捏四种，按针长与部位灵活选用。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。进针前针具、穴区皮肤与医者手指须以 75% 乙醇严格消毒，针身不得触碰他物；指切进针者指甲须修整圆滑，防止划伤皮肤。', prohibitions: ['皮肤感染、溃疡、瘢痕处禁针'] },
    learning: {
      knowledge: '指切进针法：左手拇指或示指指甲切按穴位，右手持针紧靠甲缘刺入，适用于列缺、内关等短针及肌肉浅薄处。夹持进针法：左手拇示二指以消毒干棉球裹住针身下段、露出针尖 2-3 分，右手捻动针柄，两手配合将针尖刺入皮下，适用于环跳、秩边等长针及肌肉丰厚处。舒张进针法：左手拇示二指将穴区皮肤向两侧撑开绷紧，右手持针从两指之间刺入，适用于腹部天枢、大横等皮肤松弛处。提捏进针法：左手拇示二指将穴区皮肤捏起，右手持针从捏起处上端刺入，适用于印堂、百会等皮薄肉浅处。',
      misjudgment: '错：夹持进针法用不消毒的手指直接捏住针身刺入。夹持须以消毒干棉球裹针，针身不可被裸手触碰，否则破坏无菌，进针即带入污染。',
      reasoning: '为何舒张进针法偏用于腹部皮肤松弛处，而提捏进针法偏用于印堂、百会等皮薄处？',
      feedback: '腹部皮松皱褶多，撑开绷紧可使穴位固定、减轻疼痛；印堂百会皮薄肉少，捏起皮肤既便于浅刺入皮，又避免刺入过深，两法各适其位。',
      transfer: '给皮肤松弛的老年患者刺中脘，选哪种进针手法最顺手，为何不用提捏法？',
    },
  },
  {
    id: 'pb11-f-002', title: '毫针刺法·针刺角度与深度', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['毫针刺法', '针刺角度', '针刺深度', '气胸风险'],
    intent: '掌握直刺、斜刺、平刺三种角度与定深原则，明确胸背胁肋等部位的禁深刺红线。',
    facts: [
      { field: 'technique.angle.kinds', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.depth.principle', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.depth.byRegion', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.safety.depth', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '针刺角度分直刺（90°）、斜刺（45°）、平刺（15°）三类，深度以得气而不伤脏为度，据部位、体型、病情与季节而定，胸背胁肋邻近心肺，只可斜刺浅刺，禁直刺深刺。',
    coreDefinition: '角度指针身与皮肤夹角，深度以既不伤重要脏器又能得气为准，四肢肌肉丰厚可深刺，胸背头面薄浅处宜浅刺斜刺。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。胸背部、胁肋部禁直刺深刺，防止刺伤肺脏引发气胸；眼区、颈项部及背部正中线附近须严守规定角度与深度，出现胸痛气促须立即起针并按气胸原则处理。', prohibitions: ['胸背胁肋禁直刺深刺（防气胸）', '大血管浅表处（如人迎、冲阳）禁深刺', '乳中、神阙禁针禁灸'] },
    learning: {
      knowledge: '直刺：针身与皮肤呈 90° 垂直刺入，适用于四肢、腹部、腰臀部肌肉丰厚处，如足三里直刺 1-2 寸、环跳直刺 2-3 寸。斜刺：针身与皮肤约呈 45° 倾斜刺入，适用于胸背部及邻近重要脏器的部位，如背部膀胱经第一侧线斜刺 0.5-1 寸。平刺（横刺）：针身与皮肤约呈 15° 刺入，适用于头面部皮薄肉少处，如百会平刺 0.5-0.8 寸、印堂平刺 0.3-0.5 寸。定深原则：以既有针感又不伤脏腑为准，体型胖者深、瘦者浅；四肢肌肉丰厚可深，胸背胁肋 0.5-1 寸以内斜刺，头面 0.3-0.8 寸。',
      misjudgment: '错：背部腧穴一律垂直深刺以求强针感。背部内邻肺脏，直刺过深可穿破胸膜肺脏造成气胸，背俞穴当斜刺浅刺，以针感向深层扩散为度。',
      reasoning: '同属躯干部，为何腹部腧穴可直刺 1-2 寸，胸背部却只宜斜刺 0.5-1 寸？',
      feedback: '腹壁肌肉较厚且腹腔内为柔韧的肠管，可耐受一定深度；胸腔内为膨缩的肺脏，针入胸膜即致气胸，故胸背必须斜刺浅刺，深度的决定因素是内脏的危险性。',
      transfer: '在胸部膻中穴附近针刺与在腹部天枢穴针刺，角度深度各应如何把握？',
    },
  },
  {
    id: 'pb11-f-003', title: '毫针刺法·得气与候气催气', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['毫针刺法', '得气', '候气', '催气'],
    intent: '掌握得气的标志、候气与催气的操作方法，理解气至而有效的针灸原理。',
    facts: [
      { field: 'technique.deqi.sensation', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.houqi.method', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.cuiqi.method', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.deqi.principle', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢·九针十二原》', canon: '灵枢', chapter: '九针十二原', originalText: '刺之要，气至而有效，效之信，若风之吹云，明乎若见苍天', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: null,
    cases: null,
    stdJudgment: '得气以医者针下沉紧涩滞与患者酸麻胀重感为标志，未得气者当候气，仍不至者以捻转、提插、循按、弹刮等法催气，气至病所则疗效随之而至。',
    coreDefinition: '得气是针刺入穴后经气感应，医者觉针下沉紧、患者觉酸麻胀重；候气为静留待气，催气以手法激发经气运行。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。酸麻胀重属正常针感；若针下出现向肢体远端放射的电击样感应，多因刺中神经干，宜将针退至皮下调整方向，勿反复强刺激。', prohibitions: [] },
    learning: {
      knowledge: '得气标志：医者指下感到针沉紧、涩滞，如鱼吞钩饵；患者穴区出现酸、麻、胀、重感，或向一定方向传导、扩散。候气法：进针后未得气，将针留置穴内，静候经气来至，或轻微提捻诱导。催气法：①捻转、提插，以小幅高频激发针感；②循法，沿经脉循行方向轻循按穴周皮肤；③弹法，以指轻弹针柄使针体微颤；④刮法，以拇示指自下而上刮动针柄。行气法还可用摄法、飞法引导针感向病所方向传导。得气是施行补泻手法的前提，得气快者疗效多佳。',
      misjudgment: '错：患者自觉疼痛即视为得气。疼痛多为刺及血管壁或强烈刺激引起的不适，与酸麻胀重的针感不同，须调整针向深浅；把锐痛当得气强行行针会损伤组织。',
      reasoning: '为何得气快、针感传导远者，疗效往往优于得气迟钝者？',
      feedback: '经气盛则针下反应灵敏，气至病所说明经气被激发并沿经脉趋向病位，邪去正复，故古人有「气至而有效」之论，得气程度与疗效关系密切。',
      transfer: '体质虚弱者进针良久针下空虚无感，按候气、催气两法各应如何操作？',
    },
  },
  {
    id: 'pb11-f-004', title: '毫针刺法·行针手法（提插捻转）', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['毫针刺法', '行针', '提插法', '捻转法'],
    intent: '掌握提插法、捻转法的操作要领与刺激量控制，为补泻手法打基础。',
    facts: [
      { field: 'technique.ticha.method', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.niuzhuan.method', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.stimulation.intensity', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.aid.methods', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '提插法以针体在穴内上下进退行气，捻转法以针体左右旋转行气，幅度大小与频率快慢决定刺激量强弱，二者是行针催气的基本手法，亦是补泻手法的操作基础。',
    coreDefinition: '提插为针体上下进退、插进提出；捻转为针体左右旋转；刺激量由幅度、频率、用力与时间四要素构成。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。行针刺激量以患者能耐受为度，体弱、初诊者宜轻刺激；捻转不可单向连续过度，防止肌纤维缠绕针身造成滞针。', prohibitions: [] },
    learning: {
      knowledge: '提插法：针尖刺入应至深度后，针身沿纵轴在穴内上下进退，进为插、退为提，提插幅度以 0.3-0.5 寸为宜，频率约每分钟 60 次，幅度大、频率快则刺激强，反之则弱。捻转法：针身沿纵轴左右旋转，捻转角度约 180°-360°，频率约每分钟 60-120 次，角度大、频率快刺激强，角度小、频率慢刺激弱；捻转时须保持针尖方向不变。二者可单独使用也可结合，先小幅试刺探得针感，再据针感调整幅度频率。辅助手法有循、弹、刮、摇、飞、震颤等，用于催气行气。',
      misjudgment: '错：提插时把整个针身全部拔出穴外再重新刺入。提插须在穴内上下进退，针身始终保留在组织中，全部拔出会破坏针感、增加疼痛与感染机会。',
      reasoning: '捻转行针时，为何要求针尖方向不变、仅针体原地旋转？',
      feedback: '针尖方向固定可避免针体在组织内划弧摆动，防止牵拉疼痛与弯针；原地旋转使针身与周围组织均匀摩擦，激发的经气感应集中而稳定。',
      transfer: '针感迟钝需加强刺激时，你会在幅度、频率、用力三方面如何组合调整？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 毫针刺法 · 补泻（005–007）
  // ============================================================
  {
    id: 'pb11-f-005', title: '毫针刺法·捻转补泻', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['毫针刺法', '捻转补泻', '补法', '泻法'],
    intent: '掌握捻转补泻的手法参数（角度、频率、方向），区分补泻操作的差异。',
    facts: [
      { field: 'technique.nianzhuang.buxie.rule', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.nianzhuang.bu.param', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.nianzhuang.xie.param', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.buxie.precondition', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '捻转补泻以捻转角度、频率、用力轻重与方向区分补泻：补法角度小、频率慢、用力轻、时间短，多左转；泻法角度大、频率快、用力重、时间长，多右转；操作须在得气基础上进行。',
    coreDefinition: '捻转补泻是毫针补泻基本手法之一，以针体左右旋转的不同参数区分补泻，多与提插补泻配合运用。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。单向捻转不可过度连续，防止肌纤维缠绕致滞针；补泻操作以得气为前提，针感过强者宜减小角度与频率。', prohibitions: [] },
    learning: {
      knowledge: '捻转补法：捻转角度小（约 90°-180°），频率慢（约每分钟 60 次），用力轻，操作时间短，以大指向前、示指向后的左转为主，反复操作以针下热感为佳。捻转泻法：捻转角度大（约 180°-360°），频率快（约每分钟 120 次），用力重，操作时间长，以大指向后、示指向前或左右等幅大幅度捻转为主，以针下凉感为佳。方向分补泻以左转为补、右转为泻为主流；另有以捻转轻重缓急分补泻之说。捻转补泻须在得气后进行，虚证用补法、实证用泻法，可配合提插补泻综合施用。',
      misjudgment: '错：捻转补泻只认方向，以为左转必补、右转必泻，而忽略角度、频率与用力。教材以参数综合判补泻，单凭方向在针下无感时易失准，须四要素并重。',
      reasoning: '捻转补泻操作时，为何补法要求角度小、频率慢、用力轻，泻法恰恰相反？',
      feedback: '小角度慢频率轻用力使刺激温和徐缓，顺应正气扶助之意；大角度快频率重用力则刺激强烈，能顿挫病邪；参数差异正是补泻效应不同的物质基础。',
      transfer: '脾胃虚寒之胃痛与肝胃郁热之胃痛，用捻转手法行针时的参数选择有何不同？',
    },
  },
  {
    id: 'pb11-f-006', title: '毫针刺法·提插补泻', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['毫针刺法', '提插补泻', '重插轻提', '重提轻插'],
    intent: '掌握提插补泻的重插轻提与轻插重提要领及深浅次序。',
    facts: [
      { field: 'technique.ticha.buxie.rule', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.ticha.bu.param', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.ticha.xie.param', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.ticha.depth.order', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢·九针十二原》', canon: '灵枢', chapter: '九针十二原', originalText: '凡用针者，虚则实之，满则泄之，宛陈则除之，邪胜则虚之', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: null,
    cases: null,
    stdJudgment: '提插补泻以插提用力轻重与深浅次序分补泻：补法先浅后深、重插轻提、幅度小频率慢；泻法先深后浅、轻插重提、幅度大频率快；补泻以得气为前提，虚补实泻。',
    coreDefinition: '提插补泻是毫针补泻基本手法之一，以重插轻提为补、轻插重提为泻，配合深浅次序与幅度频率操作。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。提插幅度不宜超过 0.5-1 寸，防止刺伤深层组织；胸背等禁深刺部位不作大幅度提插，急性疼痛剧烈者提插宜轻。', prohibitions: [] },
    learning: {
      knowledge: '提插补法：针先刺入浅层（天部），得气后重插轻提，以下插为主，提插幅度小（约 0.3-0.5 寸）、频率慢（约每分钟 60 次），逐渐向深层（人部、地部）推进，即「先浅后深」，反复操作以补虚。提插泻法：针先刺入深层，得气后轻插重提，以上提为主，提插幅度大（约 0.5-1 寸）、频率快（约每分钟 120 次），由深层退向浅层，即「先深后浅」，以泻其实。均以得气为基础，可配合捻转补泻使用。',
      misjudgment: '错：把「重插轻提」记成「重提轻插」当补法。重插轻提、以下插为主是引气深入、扶助正气，属补；轻插重提、以上提为主是引邪外出、消散邪气，属泻，颠倒则虚实误治。',
      reasoning: '为何提插补法要求先浅后深，而泻法要求先深后浅？',
      feedback: '由浅入深如徐缓进阳，引气深入以补虚；由深出浅如开门逐邪，导邪外出以泻实；深浅次序体现补泻的用力方向与经气走向。',
      transfer: '肾虚腰痛与急性腰扭伤同取委中，提插补泻手法应分别如何操作？',
    },
  },
  {
    id: 'pb11-f-007', title: '毫针刺法·平补平泻', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['毫针刺法', '平补平泻', '补泻手法', '刺激量'],
    intent: '掌握平补平泻的均匀等量操作，辨清其与补法、泻法的区别。',
    facts: [
      { field: 'technique.pingbu.method', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.pingbu.range', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.pingbu.difference', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.pingbu.precondition', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '平补平泻在得气后以均匀的力度、中等的角度幅度与频率行提插捻转，不偏补不偏泻，刺激量适中，适用于虚实不显或虚实夹杂的病证，亦为毫针常规刺激量。',
    coreDefinition: '平补平泻是均匀等量、不快不慢、不轻不重地提插捻转的行针方法，补泻倾向不明显的调气手段。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。平补平泻亦须得气后操作，刺激量中等均匀；敏感者或虚弱者可将幅度频率调小，以患者能耐受为度。', prohibitions: [] },
    learning: {
      knowledge: '平补平泻操作：进针得气后，均匀地提插、捻转，捻转角度适中（约 90°-180°），提插幅度适中（约 0.3-0.5 寸），频率约每分钟 60-90 次，用力均匀，左右旋转、上下提插等幅等量，不快不慢，连续操作约 1-2 分钟或至针下平和。适用范围：①虚实不显著的病证；②虚实夹杂、不宜纯补纯泻者；③初次针刺、体质敏感者。与补法泻法的区别在于不强调方向与用力偏向，刺激量处于二者之间。',
      misjudgment: '错：把平补平泻当成「不补不泻」即随意捻转两下即可。平补平泻讲究均匀等量、得气后行针，是一种有明确操作参数的调气手法，随意的行针既非补泻亦非平补平泻。',
      reasoning: '虚实夹杂的病证，为何选用平补平泻而不宜单用补法或泻法？',
      feedback: '纯补恐碍邪、纯泻恐伤正，平补平泻以中等刺激调气守衡，既扶正又祛邪，进退有度，适合虚实并见之候。',
      transfer: '初次就诊、精神紧张又属实证的头痛患者，行针刺激量应如何调整才稳妥？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 毫针刺法 · 留针出针（008）
  // ============================================================
  {
    id: 'pb11-f-008', title: '毫针刺法·留针与出针', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['毫针刺法', '留针', '出针', '按压针孔'],
    intent: '掌握留针时间与出针操作要领，理解动留针与静留针之别。',
    facts: [
      { field: 'technique.liuzhen.time', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.liuzhen.kinds', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.chuzhen.method', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.chuzhen.hemostasis', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢·九针十二原》', canon: '灵枢', chapter: '九针十二原', originalText: '静以徐往，微以久留之而养', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: null,
    cases: null,
    stdJudgment: '留针在得气后置针穴内以候气调气，一般 15-30 分钟，痛证痉挛等可延长并定时行针；出针以棉球按压针旁、轻捻缓退，出后按压针孔片刻以防出血。',
    coreDefinition: '留针为针刺得气后针留置穴内一段时间以持续调气；出针为治疗毕将针退出并按压针孔的操作。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。留针期间须观察患者面色神色，防止晕针；出针后如针孔出血或皮下血肿，按压数分钟并冷敷；若起针后局部青紫肿胀可热敷消散。', prohibitions: [] },
    learning: {
      knowledge: '留针时间：一般病证得气后留针 15-30 分钟；急性疼痛、痉挛、顽固性病证可延长至 30-60 分钟；小儿、体弱、晕针倾向者短留或不留。静留针：留针期间不行针，任其自然感应；动留针：留针期间每隔 5-10 分钟行针一次，反复 2-3 次以加强针感、维持刺激量。出针操作：左手持消毒干棉球轻按针孔旁皮肤，右手持针柄轻捻并缓缓上提退出，出针后立即以棉球按压针孔 1-2 分钟，防止出血；出针次序一般先上后下、先内后外，术毕清点针数。',
      misjudgment: '错：出针时快速猛拔针体，认为越快越不痛。猛拔易牵拉组织、撕裂针孔出血，且针感残留不适；应轻捻缓退并随即按压针孔，方合「疾出针而徐按」或「徐出针而疾按」的补泻要求。',
      reasoning: '痛证与痉挛之属为何宜延长留针时间并采用动留针？',
      feedback: '痛证气血凝滞、痉挛筋脉拘急，延长留针并定时行针可反复激发经气、疏调气血、解痉止痛，故留针既久且动。',
      transfer: '体弱的慢性腹泻老人留针时间与行针次数应如何掌握？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 毫针刺法 · 异常处理（009–010）
  // ============================================================
  {
    id: 'pb11-f-009', title: '毫针刺法·晕针处理', category: 'theory', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['毫针刺法', '晕针', '应急处理', '预防'],
    intent: '掌握晕针的临床表现、发生原因与处理原则，明确预防要点。',
    facts: [
      { field: 'technique.yunzhen.symptoms', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.yunzhen.causes', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.yunzhen.treatment', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.yunzhen.prevention', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '晕针多发于精神紧张、体弱、饥饿疲劳者，先兆为头晕心慌、面色苍白、恶心汗出，处理上立即起针、平卧头低足高、松带保暖、饮温糖水，重者掐按水沟内关足三里，缓解前禁再针刺。',
    coreDefinition: '晕针是针刺过程中出现的晕厥先兆或晕厥反应，因精神紧张、体质虚弱或体位不当诱发，须立即起针平卧急救。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。处理原则：立即停止针刺并将针全部起出，扶患者平卧、头部放低，松开衣带、注意保暖；轻者饮温开水或糖水静卧片刻即复；重者掐按水沟、内关、足三里，或灸百会、关元，昏厥不醒者按晕厥常规急救。预防：初诊者解释消除紧张，选卧位，饥饿过劳酒后及大出血后者不予针刺。', prohibitions: ['饥饿、过劳、酒后、大怒及大出血后者禁立即针刺'] },
    learning: {
      knowledge: '临床表现：轻者头晕目眩、心慌气短、恶心欲吐、面色苍白、出冷汗、脉细弱；重者神志昏迷、四肢厥冷、血压下降。常见原因：①患者精神紧张、恐惧；②体质虚弱、饥饿、疲劳、大汗、大泻、大失血后；③体位不当，站立或坐位易发生；④刺激过强。处理：立即停止针刺、起出全部针具，平卧头低足高，松解衣带保暖；轻者饮温糖水静卧；重者掐按水沟、内关、足三里，灸百会、关元；不缓解者配合现代急救。预防：初诊者先解释以安定情绪，尽量取卧位，饥饿过劳者进食休息后再针，刺激量由小到大。',
      misjudgment: '错：晕针发生时慌忙拔针却让患者保持坐位，或继续行针以求「醒神」。晕针本质是暂时性脑供血不足，头低足高平卧才能改善灌注；继续行针加重刺激，坐位起立则晕厥加重。',
      reasoning: '为何体弱、饥饿者针刺时晕针风险高，且卧位比坐位安全得多？',
      feedback: '体弱饥饿者气血本虚，针刺刺激更耗正气、易致气随针脱；卧位时回心血量与脑供血有保障，晕针概率与程度都显著降低，故体位选择是预防第一关。',
      transfer: '患者针刺后诉头晕、出冷汗、面色发白，你依序会采取哪几步措施？',
    },
  },
  {
    id: 'pb11-f-010', title: '毫针刺法·滞针弯针断针处理', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['毫针刺法', '滞针', '弯针', '断针', '应急处理'],
    intent: '掌握滞针、弯针、断针的成因、表现与处理原则，强化预防意识。',
    facts: [
      { field: 'technique.zhizhen.cause', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.wanzhen.cause', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.duanzhen.cause', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.abnormal.prevention', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '滞针多因紧张或单向捻转过度，宜放松局部、反向捻回并循按弹柄；弯针须顺弯曲方向或恢复原体位后缓退，禁猛拔；断针须制动体位，外露者镊取，平陷者手术取出。',
    coreDefinition: '滞针是针下滞涩进退不得，弯针是针体弯曲，断针是针身断折于体内，三者皆以预防为主，处理须沉着有序。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。滞针处理：嘱患者放松、消除紧张，或稍延长留针，单向捻转过度者反向捻回，可循按穴周、弹叩针柄使肌纤维松解。弯针处理：针身微弯可顺弯曲方向缓慢退出；弯度较大须顺弯退出，勿捻转猛拔；因体位移动者先恢复原体位再退针。断针处理：医者镇静，嘱患者勿移动体位；断端外露于皮表者用镊子夹出；断端与皮肤相平或陷入皮下者，须外科手术取出。预防：针具用前检查，进针时留体外针身不少于 1/3，不可将针身全部刺入，留针时嘱患者勿随意变动体位。', prohibitions: [] },
    learning: {
      knowledge: '滞针：针下异常沉紧、捻转提插困难，患者疼痛。成因：精神紧张致局部肌肉收缩，或单向捻转角度过大致肌纤维缠绕针身。处理：放松局部、延长留针，反向捻转回解，循按邻近部位或轻弹针柄。弯针：针柄改变方向、提插捻转受限。成因：进针过猛刺及硬物、医者用力不当或患者移动体位。处理：轻弯者顺弯缓退，弯度大者依弯势退出，体位变动所致先复其位。断针：针身折断。成因：针具质量差、针根腐蚀、行针过猛、肌肉强烈收缩。处理：保持体位、断端外露则镊取，平陷或深藏则手术取出。预防要点：用前检查针具，针身至少留 1/3 于体外。',
      misjudgment: '错：发生弯针时强行捻转或猛力抽拔，想把针「拉直」退出。弯针已与组织钩缠，猛拔徒增疼痛并可能折针，须顺着弯曲方向缓缓退出，必要时先复位患者体位。',
      reasoning: '为何断针后严禁患者移动体位，且断端深陷时必须请外科处理？',
      feedback: '体位变动会使断端随肌肉收缩移向深层，增加取出难度；断端平陷皮下非肉眼能夹取，强行夹取反使针体游走，故必须外科手术取出。',
      transfer: '留针时患者因咳嗽猛然移动身体，针柄明显歪斜，你如何判断是滞针还是弯针并处置？',
    },
  },
  // ============================================================
  // F 刺法灸法学 · 毫针刺法 · 注意事项与时机疗程（011–012）
  // ============================================================
  {
    id: 'pb11-f-011', title: '毫针刺法·体位消毒与治神', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['毫针刺法', '体位', '消毒', '治神'],
    intent: '掌握针刺体位选择、消毒规范与治神要求，明确禁针禁灸部位红线。',
    facts: [
      { field: 'technique.position.choice', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.disinfection.rule', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.zhishen.rule', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.forbidden.acupoint', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问·宝命全形论》', canon: '素问', chapter: '宝命全形论', originalText: '凡刺之真，必先治神', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: null,
    cases: null,
    stdJudgment: '针刺体位以医者便于操作、患者舒适持久为原则，体弱紧张者取卧位；消毒须针具、手指、穴区三方面并重；治神强调医者守神、患者安神；乳中神阙等禁针禁灸部位须铭记。',
    coreDefinition: '体位、消毒、治神是针刺施术前的三大准备，关系到操作便利、防感染与疗效，配合禁针禁灸部位的规避构成安全前提。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。乳中、神阙禁针禁灸；孕妇腹部、腰骶部禁针，合谷、三阴交、昆仑、至阴等穴孕妇禁针或慎用；颜面部及五官区域禁灸、慎刺；大血管浅表处（人迎、冲阳等）禁深刺。针具一人一针一次性或高压灭菌，穴区以 75% 乙醇棉球由内向外消毒。', prohibitions: ['乳中、神阙禁针禁灸', '孕妇腹部、腰骶部禁针，合谷、三阴交等孕妇禁针或慎用', '颜面部及五官禁灸', '大血管浅表处禁深刺'] },
    learning: {
      knowledge: '体位选择：常用仰卧位（前身穴）、侧卧位（侧身穴）、俯卧位（后身穴）、仰靠坐位（头面颈项前部）、俯伏坐位（项背头部）、侧伏坐位（面颊耳部）；体弱、精神紧张、晕针史者一律取卧位。消毒规范：①针具，一次性毫针或高压蒸汽灭菌，一人一针；②医者手指，肥皂水刷洗后用 75% 乙醇擦拭；③穴区皮肤，以 75% 乙醇棉球由内向外环形消毒，禁直接以手指触摸针身。治神：《素问》「凡刺之真，必先治神」，医者进针前凝神定志、审察患者神色形态，操作时全神贯注；患者须静心宁神、消除恐惧，呼吸平稳配合。',
      misjudgment: '错：取坐位针刺体弱初诊者，以为方便取穴即可。坐位对紧张体弱者易诱发晕针，体弱、初诊、晕针史者应取卧位，体位选择本身就是安全措施。',
      reasoning: '为何「凡刺之真，必先治神」把治神置于针刺成败的首位？',
      feedback: '医者守神则持针稳、取穴准、手法得当；患者安神则经气易于激发、针感调达；神定气聚是得气与疗效的前提，故治神居首。',
      transfer: '给一位惧怕针灸的患者首次治疗，从体位、解释到进针手法你会怎样安排？',
    },
  },
  {
    id: 'pb11-f-012', title: '毫针刺法·针刺时机与疗程', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['毫针刺法', '针刺时机', '疗程', '按时取穴'],
    intent: '掌握针刺时机选择与疗程安排的规律，理解时间因素对疗效的影响。',
    facts: [
      { field: 'technique.timing.rule', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.timing.disease', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.course.rule', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'technique.timing.precaution', sourceType: 'textbook', sourceTitle: '《针灸学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '针刺时机因病情缓急而定，急症痛证发作即刺，慢性病定时施治，部分发作性疾病于发作前针刺；疗程一般每日或隔日一次，10 次为一疗程，疗程间休 3-5 天。',
    coreDefinition: '针刺时机是选择施术的时间点，疗程是治疗频次与周期安排，二者据病性缓急与病程长短灵活掌握。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。孕妇腰骶部、腹部及合谷、三阴交等穴禁针；过饥、过饱、酒后、大怒、过劳者暂不宜针刺；疗程间隔不可省略，连续久刺可致经气疲劳、敏感性下降。', prohibitions: ['孕妇腰骶部、腹部禁针，合谷、三阴交等孕妇禁针或慎用'] },
    learning: {
      knowledge: '针刺时机：①急症、痛证发作之时即刻针刺，如心绞痛、胆绞痛发作时针刺；②慢性病按时施针，每日或隔日定时治疗以形成节律；③发作性疾病于发作前施治，如疟疾发作前 1-2 小时针刺，癫痫发作前预防性针刺；④按气血流注择时，如子午流注、灵龟八法按时取穴。疗程安排：急性病可每日 1-2 次，不拘疗程；慢性病一般每日 1 次或隔日 1 次，10 次为一疗程，疗程间休息 3-5 天再行下疗程，顽固病证可连续 2-3 疗程后休息；刺激量首诊宜轻，逐次调整。',
      misjudgment: '错：慢性病每日连针不间断、数月不歇，以为针得越多越好。连续久刺使穴位与经气疲劳、耐受性升高，疗效反降，疗程间须休息 3-5 天以复其敏，张弛有度方能持久取效。',
      reasoning: '疟疾为何要在发作前 1-2 小时针刺，而非发作时或发作后？',
      feedback: '疟疾正邪交争有时，发作前针刺能先机调气、扶正截邪，在疟邪未盛之时抑其发作；发作时气血已乱，针刺难以收功。',
      transfer: '偏头痛每周发作两三次，从时机与疗程上应如何安排针刺？',
    },
  },
];
