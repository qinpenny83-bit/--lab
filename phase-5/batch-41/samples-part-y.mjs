// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part Y（Y 推拿·养生康复 补足 10 节点 pb41-y-001 ~ pb41-y-010）
// 学科：Y 推拿·养生康复（学科上限补足批次）；覆盖：推拿基本手法（1-3）/ 推拿·病证手法（4-8）/ 养生（9-10）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「推拿·」或「养生·」前缀
// facts sourceTitle 限定：《推拿学》规划教材 / 《中医养生学》规划教材 / 《康复医学》规划教材 /
//   《黄帝内经》 / 《素问》 / 《灵枢》，sourceType 'textbook'（原文类用 'classic_original'），status 'verified'
// classics 一律整书名 label（《素问》《灵枢》），篇名入 chapter，originalText 逐字核对，
//   sourceType:'classic_original'，status:'verified'，均已在 classic-patch.mjs 收录
// dosage 写「手法操作无内服剂量」+ 手法频次时长 caution
// 推拿禁忌红线（骨折脱位急性期/肿瘤/出血倾向/孕妇腰骶腹部/皮肤破损/严重心脑血管病）入 safety.prohibitions
// 难度分布：简单 3（diff 1）/ 中等 3（diff 2）/ 困难 2（diff 3）/ 易混综合 2（易混淆 1 + 综合推理 1）
// 机器味句式黑名单（authoring-spec 第 3 节）一律禁用
// ============================================================

export const PART_Y = [
  // ============================================================
  // Y 推拿·养生康复 · 推拿基本手法（001–003）
  // ============================================================
  {
    id: 'pb41-y-001', title: '推拿·振法点法操作要领', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['振法', '点法', '推拿基本手法', '穴位按压', '高频振颤'],
    intent: '掌握振法的高频振颤与点法的垂直点压操作要领，理解二法深透渗透的共同特性。',
    facts: [
      { field: 'clinical.适应证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.操作要领', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.着力部位', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.频率与时长', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.作用机理', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.禁忌证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法操作无内服剂量。振法单次每部位3~5分钟，点法每穴约1~2分钟，全套治疗20~30分钟，隔日1次，10次为一疗程。', caution: '振法频率每分钟150~200次，压力均匀透达深层；点法压力由轻到重、得气为度，禁用暴力戳点；体瘦骨突与头面胸腹处减力，点按腹部穴位时嘱患者配合呼气。' },
    cases: null,
    stdJudgment: '振法以掌根或大鱼际吸定施术部位，前臂肌群快速交替收缩产生高频振颤，频率每分钟150~200次，力向深层传导；点法以拇指指端垂直按压穴位，由轻渐重、得气即止。一振一压，皆以渗透而不伤皮为要，主治肌痉挛与穴区深部酸胀。',
    coreDefinition: '振法以掌部高频振颤传力深透，点法以指端垂直点压穴位激发经气，均以得气渗透为度。',
    safety: { note: '振法点法忌暴力戳压，头面胸腹与骨突处减力，操作前修剪指甲，施术后局部保暖；推拿养生知识学习，临床操作须在专业医师指导下进行', prohibitions: ['骨折、脱位急性期及疑有骨折者禁用推拿', '恶性肿瘤局部及性质不明肿块处禁用推拿', '出血倾向、血小板减少及血液病患者禁用推拿', '孕妇腰骶部、腹部禁用推拿', '皮肤破损、湿疹、烧烫伤及感染处禁用推拿', '严重心脑血管疾病急性期禁用推拿'] },
    learning: {
      knowledge: '适应证：肌肉痉挛、软组织酸胀与穴位深部压痛。操作要点：振法以掌根或大鱼际吸定后高频振颤、紧贴不移，点法以拇指指端垂直下压、由浅入深，得气后持续数秒再徐缓放松。作用机理：振颤改善局部微循环、缓解肌紧张，点压激发经气通络止痛。禁忌证：骨折脱位急性期、肿瘤、出血倾向、孕妇腰骶腹部、皮肤破损。调护：施术部位保暖，配合功能锻炼。',
      misjudgment: '把点法做成快速叩击或在皮肤上反复磨转。错：点法要求垂直下压、静止持续，叩击与磨转刺激表浅且易致瘀青，不能深入穴位产生酸麻胀重的得气感。',
      reasoning: '振法与摩法同为放松类手法，为何振法更宜肌层深部痉挛而摩法偏于浅表？',
      feedback: '振法频率高、力透深，能达肌层与骨膜表面；摩法轻柔圆周运动止于皮表，各有所宜，深层痉挛首选振法。',
      transfer: '网球肘肱骨外上髁压痛明显者，试按点法要领设计取穴与压力方案。',
    },
  },
  {
    id: 'pb41-y-002', title: '推拿·弹拨法理筋松解', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['弹拨法', '理筋', '条索状硬结', '肌腱粘连'],
    intent: '掌握弹拨法对条索状筋结的操作要领与适应证，理解理筋松解的治疗思路。',
    facts: [
      { field: 'clinical.适应证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.操作要领', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.着力部位', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.作用机理', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.禁忌证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法操作无内服剂量。弹拨每处筋结1~3分钟，间歇放松，全套20~30分钟，隔日1次，5~10次为一疗程。', caution: '弹拨力度以患者耐受为度，先轻后重、弹而即松；急性损伤肿胀期、筋骨折断可疑处禁用，弹拨后以揉法顺筋缓其刺激。' },
    cases: null,
    stdJudgment: '弹拨法以拇指指端或食中指指腹垂直压住条索状筋结后，作与肌纤维垂直方向的往返拨动，状如弹弦；要领在压定、弹动、即松，由轻到重、以耐受为度，可分解粘连、理顺筋络，是治疗肌腱韧带慢性损伤与硬结的核心手法之一。',
    coreDefinition: '弹拨法以指端压住条索状筋结作横向往返拨动，分离粘连、理筋通络，为理筋类手法的代表。',
    safety: { note: '弹拨法刺激较强，施术后局部可有短暂酸胀，须以揉摩收功；急性期肿胀、筋骨折断可疑处禁用；推拿养生知识学习，临床操作须在专业医师指导下进行', prohibitions: ['骨折、脱位急性期及疑有骨折者禁用推拿', '恶性肿瘤局部及性质不明肿块处禁用推拿', '出血倾向、血小板减少及血液病患者禁用推拿', '孕妇腰骶部、腹部禁用推拿', '皮肤破损、湿疹、烧烫伤及感染处禁用推拿', '严重心脑血管疾病急性期禁用推拿'] },
    learning: {
      knowledge: '适应证：肌腱韧带慢性损伤、条索状硬结、粘连与肌肉痉挛。操作要点：拇指指端垂直压入筋结边缘，再横向拨动如拨琴弦，节奏均匀、由轻到重，每处1~3分钟，弹拨后立即以揉法顺筋放松。作用机理：横向牵拉分离粘连纤维，改善局部气血运行，缓解疼痛与活动受限。禁忌证：骨折脱位急性期、局部红肿热痛、出血倾向、孕妇腰骶腹部、皮肤破损。调护：施术部位保暖，避免立即剧烈活动。',
      misjudgment: '弹拨方向沿肌纤维走行作纵向捋顺。错：纵向捋顺虽属理筋类但刺激浅，不能分解粘连；弹拨必须与肌纤维垂直横向拨动，力点集中才能松解条索状硬结。',
      reasoning: '弹拨与按揉同作用于酸痛处，为何对条索状硬结的疗效差别悬殊？',
      feedback: '按揉以压力为主、刺激弥散，对粘连硬结难以突破；弹拨垂直横向拨动，力点集中，能直接分离纤维粘连，故效专力宏。',
      transfer: '跟腱慢性疼痛伴局部硬结者，试按弹拨法要领选择拨动方向与力度。',
    },
  },
  {
    id: 'pb41-y-003', title: '推拿·抖法拍法操作要领', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['抖法', '拍法', '放松手法', '虚掌叩击'],
    intent: '掌握抖法的牵抖要领与拍法的虚掌叩击要求，理解二法作为收功放松手法的应用。',
    facts: [
      { field: 'clinical.适应证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.操作要领', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.频率与力度', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.作用机理', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.禁忌证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法操作无内服剂量。抖法每次1~2分钟，拍法每部位1~3分钟，多在推拿收尾时使用，全套20~30分钟。', caution: '抖法幅度宜小、频率宜快，上肢每分钟200次左右，忌牵拉过猛伤及关节；拍法用虚掌、轻重交替，肾区与体弱老人减力，骨质疏松者慎用叩击。' },
    cases: null,
    stdJudgment: '抖法分牵抖与顿抖，握住肢体末端作小幅高频抖动，使波动传至肩髋关节，幅度小、频率快、轻柔和缓；拍法以五指并拢虚掌有节律叩击，响而不痛、轻重交替。二法皆作收功放松之用，行气活血、缓解余紧张，施术后患者肢体轻快为度。',
    coreDefinition: '抖法以高频小幅抖动放松肢体关节，拍法以虚掌节律叩击行气活血，均为收功性放松手法。',
    safety: { note: '抖法牵拉幅度不可过大，拍法禁用实掌重击；胸背、肾区与骨质疏松者减力；推拿养生知识学习，临床操作须在专业医师指导下进行', prohibitions: ['骨折、脱位急性期及疑有骨折者禁用推拿', '恶性肿瘤局部及性质不明肿块处禁用推拿', '出血倾向、血小板减少及血液病患者禁用推拿', '孕妇腰骶部、腹部禁用推拿', '皮肤破损、湿疹、烧烫伤及感染处禁用推拿', '严重骨质疏松者慎用叩击类手法'] },
    learning: {
      knowledge: '适应证：肢体疲劳、关节僵硬与推拿收尾放松。操作要点：抖法双手握住腕踝部，小幅度快速上下抖动，使波传至近端关节；拍法五指并拢成虚掌，腕部放松有节律叩击，先轻后重再轻。作用机理：抖法松弛关节与肌群，拍法振动传导促进气血流通。禁忌证：关节脱位、骨折、严重骨质疏松、肿瘤及皮肤破损处。调护：拍后局部保暖，配合缓慢活动肢体。',
      misjudgment: '抖法用力生拉硬拽以求抖开关节。错：抖法靠频率不靠幅度，生拉硬拽易拉伤韧带关节；幅度宜小、频率宜快，波动由远端传至近端才达放松之效。',
      reasoning: '同是收功手法，为何抖法多用于四肢而拍法多用于躯干？',
      feedback: '四肢关节活动度大、肌肉起止明确，适合抖动放松；躯干肌肉丰厚平坦，虚掌拍击振动传导面广，能疏散余滞。',
      transfer: '长跑后下肢酸胀紧绷者，试按抖法拍法组合设计收功顺序。',
    },
  },
  // ============================================================
  // Y 推拿·养生康复 · 推拿·病证手法（004–008）
  // ============================================================
  {
    id: 'pb41-y-004', title: '推拿·小儿腹泻推拿', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['小儿腹泻', '补脾经', '补大肠', '推上七节骨', '捏脊'],
    intent: '掌握小儿腹泻推拿的常用穴位组合与补泻方向，理解健脾止泻治法与重症识别。',
    facts: [
      { field: 'clinical.适应证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.手法操作', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.穴位方向', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.频次与疗程', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.作用机理', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.禁忌证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法操作无内服剂量。每日推拿1~2次，每次10~20分钟，3~5日为一疗程，以滑石粉或介质润滑。', caution: '推七节骨止泻方向为向上推，摩腹止泻用逆时针，方向颠倒则疗效相反；患儿发热、明显脱水或黏液脓血便者须先西医诊治，不可单恃推拿。' },
    cases: null,
    stdJudgment: '小儿腹泻推拿以健脾止泻为纲，常取补脾经、补大肠、逆摩腹、揉脐、揉龟尾、推上七节骨，久泻脾虚加捏脊与推三关；手法宜轻快柔和、以介质润滑，每日1~2次。湿热泻须兼清利、方向宜慎，重症脱水先补液纠酸，不得延误。',
    coreDefinition: '小儿腹泻推拿以补脾经、补大肠、逆摩腹、推上七节骨等健脾止泻手法为主，辨寒热虚实选穴配伍。',
    safety: { note: '小儿皮肤娇嫩，手法宜轻，操作前涂抹介质防擦伤；发热、脱水、脓血便须先就医；推拿养生知识学习，临床操作须在专业医师指导下进行', prohibitions: ['骨折、脱位急性期及疑有骨折者禁用推拿', '恶性肿瘤局部及性质不明肿块处禁用推拿', '出血倾向、血小板减少及血液病患者禁用推拿', '皮肤破损、湿疹、烧烫伤及感染处禁用推拿', '高热、重度脱水、黏液脓血便及急腹症患儿须先西医诊治'] },
    learning: {
      knowledge: '适应证：婴幼儿单纯性消化不良、脾虚泻与风寒泻。操作要点：补脾经沿拇指桡侧由指尖向指根直推300次，补大肠沿食指桡侧由指尖向虎口直推，逆时针摩腹3~5分钟，推上七节骨自下向上100~200次，揉龟尾1~2分钟，捏脊自长强至大椎捏3~5遍。作用机理：补益脾胃、升提清阳，恢复大肠传导。禁忌证：湿热重证、重症脱水、肠梗阻。调护：控制乳食、腹部保暖。',
      misjudgment: '止泻一律推上七节骨、摩腹一律顺时针。错：摩腹顺时针为泻、逆时针为补，虚寒泻宜逆摩腹；推七节骨向上为补涩止泻、向下为泻热通便，方向用反则泄泻反剧。',
      reasoning: '同为泄泻，为何湿热泻不宜过用补涩，而脾虚泻独重补法与升提？',
      feedback: '湿热泻邪实当清利，过早补涩则闭门留寇；脾虚泻本虚当补，兼以升提固涩，虚实不同，手法方向与选穴各异。',
      transfer: '秋季腹泻频作而脱水不明显者，试按脾虚兼湿思路调整推拿选穴。',
    },
  },
  {
    id: 'pb41-y-005', title: '推拿·小儿厌食推拿', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['小儿厌食', '补脾经', '揉板门', '运内八卦', '捏脊'],
    intent: '掌握小儿厌食推拿的醒脾开胃穴位组合与操作顺序，理解脾胃运化与食欲的关系。',
    facts: [
      { field: 'clinical.适应证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.手法操作', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.穴位组合', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.频次与疗程', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.作用机理', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.禁忌证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法操作无内服剂量。每日1次，每次15~20分钟，饭前操作尤佳，10次为一疗程，可连做2~3个疗程。', caution: '操作前洗净双手并涂介质，饭前半小时推拿助开胃；长期厌食消瘦、发育迟缓须排查器质性疾病，呕吐者运内八卦方向宜慎。' },
    cases: null,
    stdJudgment: '小儿厌食推拿重在醒脾开胃，以补脾经、揉板门、运内八卦、顺摩腹、捏脊与按揉足三里为主组，腹胀者加分推腹阴阳、掐揉四横纹；手法轻柔连贯，饭前施术助食欲。疗程宜长、疗效缓进，须同时调整喂养习惯，忌追喂零食冷饮。',
    coreDefinition: '小儿厌食推拿以补脾经、揉板门、运内八卦、顺摩腹、捏脊开胃进食，重在醒脾助运。',
    safety: { note: '小儿皮肤娇嫩，手法宜轻，以介质润滑防擦伤；长期厌食消瘦、发育迟缓须排查器质性病因；推拿养生知识学习，临床操作须在专业医师指导下进行', prohibitions: ['骨折、脱位急性期及疑有骨折者禁用推拿', '恶性肿瘤局部及性质不明肿块处禁用推拿', '出血倾向、血小板减少及血液病患者禁用推拿', '皮肤破损、湿疹、烧烫伤及感染处禁用推拿', '急性胃肠炎、发热期间暂缓推拿'] },
    learning: {
      knowledge: '适应证：功能性小儿厌食、食欲不振与喂养困难。操作要点：补脾经300次，揉板门100~200次，顺运内八卦50~100次，顺时针摩腹3分钟，捏脊3~5遍，按揉足三里各1分钟。作用机理：补脾助运、消积导滞，恢复胃气受纳。禁忌证：急性胃肠炎、发热及皮肤破损。调护：定时定量喂养，少食生冷甜腻，鼓励户外活动。',
      misjudgment: '厌食一味清胃热、消食导滞。错：厌食多属脾虚运化不及，过用消导苦寒更伤脾胃；当以补脾开胃为主，消导仅作佐使。',
      reasoning: '同是食欲不振，为何有的用消食导滞、有的用补脾益气？',
      feedback: '食积者腹满拒按、苔厚腻，宜消；脾虚者面黄乏力、苔薄白，宜补。问诊看苔察腹，虚实立辨，选穴即明。',
      transfer: '挑食偏食伴面色萎黄之幼儿，试按脾虚思路组织推拿穴位套餐。',
    },
  },
  {
    id: 'pb41-y-006', title: '推拿·小儿夜啼推拿', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['小儿夜啼', '脾寒气滞', '心经积热', '惊恐伤神', '推三关'],
    intent: '掌握小儿夜啼脾寒、心热、惊恐三型的推拿选穴与手法，理解辨证论治在儿推中的应用。',
    facts: [
      { field: 'clinical.适应证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.证型辨证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.手法操作', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.频次与疗程', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.作用机理', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.禁忌证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法操作无内服剂量。睡前推拿1次，每次10~20分钟，3~7日为一疗程。', caution: '推拿前排除饥饱、尿布、环境因素；伴发热、腹胀硬满或抽搐者须就医；清法（清心经、清小肠）中病即止，防伤脾阳。' },
    cases: null,
    stdJudgment: '小儿夜啼推拿首辨三因：脾寒气滞者面青肢冷、曲腰而啼，取补脾经、推三关、揉外劳宫温中散寒；心经积热者面赤烦躁、见灯哭甚，取清心经、清小肠、揉小天心清热宁神；惊恐伤神者睡中惊惕，取揉百会、掐揉小天心、按揉神门镇惊安神。',
    coreDefinition: '小儿夜啼推拿按脾寒、心热、惊恐三型选穴，以温中、清心、镇惊为治法要旨。',
    safety: { note: '夜啼推拿宜环境安静、手法轻柔，睡前施术；器质性腹痛、发热与抽搐先就医；推拿养生知识学习，临床操作须在专业医师指导下进行', prohibitions: ['骨折、脱位急性期及疑有骨折者禁用推拿', '恶性肿瘤局部及性质不明肿块处禁用推拿', '出血倾向、血小板减少及血液病患者禁用推拿', '皮肤破损、湿疹、烧烫伤及感染处禁用推拿', '高热、急腹症、抽搐及器质性疾病先西医诊治'] },
    learning: {
      knowledge: '适应证：功能性夜啼。辨证要点：脾寒型面青肢冷、得温则减、曲腰啼哭；心热型面赤唇红、烦躁不安、见灯光哭声更甚；惊恐型睡中易惊、紧偎母怀。操作要点：脾寒补脾经、推三关、揉外劳宫、摩腹；心热清心经、清小肠、揉小天心、清天河水；惊恐揉百会、掐揉小天心、按揉神门。作用机理：温阳散寒、清心泻热、安神定惊。禁忌证：发热、肠套叠等器质病。调护：环境安静温暖，定时作息。',
      misjudgment: '见夜啼即予清心泻热。错：夜啼以脾寒者居多，早投寒凉清法更伤脾阳，啼哭愈甚；须按面、舌、哭声辨寒热，脾寒者温之、心热者清之、惊恐者安之。',
      reasoning: '同为夜啼，为何脾寒型用补法而心热型用清法，误用会怎样？',
      feedback: '脾寒本虚宜温补，心热标实宜清泻；误清则寒凝益甚，误温则热扰更狂，辨证是选穴的前提。',
      transfer: '睡中惊悸不安之幼儿，试将安神定惊组穴迁移至惊跳不宁证。',
    },
  },
  {
    id: 'pb41-y-007', title: '推拿·产后身痛推拿', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['产后身痛', '益气养血', '温经通络', '肾俞', '足三里'],
    intent: '掌握产后身痛推拿的益气养血、温经通络治法与操作禁忌，理解产后特殊体质。',
    facts: [
      { field: 'clinical.适应证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.手法操作', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.取穴', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.作用机理', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.禁忌证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法操作无内服剂量。每日或隔日1次，每次20~30分钟，7~10次为一疗程。', caution: '产后体虚，手法宜柔，忌重刺激与大面积叩击；腰骶部操作避开恶露期腹部，哺乳期避免刺激乳房；伴发热、恶露异常者先排除产褥感染。' },
    cases: null,
    stdJudgment: '产后身痛多因气血亏虚、筋脉失养，复受风寒湿邪乘袭而痛，治以益气养血、温经通络；推拿宜柔和持久，以擦法温熨腰背、揉法放松四肢，点按肾俞、命门、足三里、血海等穴，忌峻猛泻法，操作中观察产妇体力与恶露，兼顾哺乳安全。',
    coreDefinition: '产后身痛推拿以益气养血、温经通络为法，用揉擦手法与补益穴位温养筋脉、驱散寒湿。',
    safety: { note: '产后体虚不耐重手法，操作忌过久过猛；发热、腹痛、恶露臭秽须先排除产褥感染；推拿养生知识学习，临床操作须在专业医师指导下进行', prohibitions: ['骨折、脱位急性期及疑有骨折者禁用推拿', '恶性肿瘤局部及性质不明肿块处禁用推拿', '出血倾向、血小板减少及血液病患者禁用推拿', '皮肤破损、湿疹、烧烫伤及感染处禁用推拿', '产褥感染发热、急性盆腔炎期间禁用推拿', '哺乳期避免刺激乳房局部'] },
    learning: {
      knowledge: '适应证：产后遍身关节酸痛、屈伸不利。病机：产后气血骤虚、卫外不固，风寒湿乘虚客于经络。操作要点：先以擦法温熨腰骶与背部膀胱经，揉法放松四肢肌群，再点按肾俞、命门、足三里、血海、三阴交各1分钟，关节局部配揉捏捻法。作用机理：温经散寒、补益气血，改善关节局部循环。禁忌证：产褥感染、出血倾向、皮肤破损。调护：避风寒、温补饮食、适度活动。',
      misjudgment: '按风寒湿痹重用祛风散寒重手法，企图一次驱邪。错：产后本虚标实，重手法与过度发汗耗气伤血，邪未去而正愈亏；当以补益为主、温通为用，缓图收功。',
      reasoning: '产后身痛与常人痹证同见关节痛，为何治法重心一补一攻？',
      feedback: '常人痹证邪实为主，祛邪为先；产后气血大伤、正虚为本，攻邪伤正，故以益气养血充其源，温经通络行其滞。',
      transfer: '人流术后腰痛绵绵、畏风怕冷者，试按产后身痛思路拟定手法与穴位。',
    },
  },
  {
    id: 'pb41-y-008', title: '推拿·面部美容推拿', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['面部美容', '面部推拿', '经络美容', '摩面提拉'],
    intent: '掌握面部美容推拿的经络循行手法与操作顺序，理解其改善面色、延缓皱纹的机理与禁忌。',
    facts: [
      { field: 'clinical.适应证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.操作要领', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.操作顺序', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.作用机理', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
      { field: 'clinical.禁忌证', sourceType: 'textbook', sourceTitle: '《推拿学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法操作无内服剂量。每周2~3次，每次10~15分钟，坚持1~3个月方见稳定效果。', caution: '操作前净面并涂润肤霜，手法轻缓向上提拉；痤疮化脓、皮炎湿疹、面部外伤及出血倾向者禁做，操作中避免过度牵拉眼睑。' },
    cases: null,
    stdJudgment: '面部美容推拿以循经摩面、按揉提拉为法，沿阳明、少阳经气自额、眼周、面颊至下颌依次施抹摩揉，手法轻缓、方向向上，配合按揉迎香、地仓、颊车、颧髎、太阳诸穴；有助气血上荣、改善面色与松弛，效果贵在坚持，皮肤炎症期禁做。',
    coreDefinition: '面部美容推拿通过循经摩面、按揉提拉与穴位点按促进面部气血流通，改善肤色与皮肤弹性。',
    safety: { note: '面部皮肤娇嫩，手法宜轻缓并涂介质，禁重力搓擦；急性皮炎、化脓性痤疮、皮肤破损期禁做；推拿养生知识学习，临床操作须在专业医师指导下进行', prohibitions: ['骨折、脱位急性期及疑有骨折者禁用推拿', '恶性肿瘤局部及性质不明肿块处禁用推拿', '出血倾向、血小板减少及血液病患者禁用推拿', '皮肤破损、湿疹、烧烫伤及感染处禁用推拿', '急性皮炎、化脓性痤疮、面部外伤期禁做面部推拿'] },
    learning: {
      knowledge: '适应证：面色萎黄晦暗、皮肤松弛、眼周细纹及疲劳面容。操作要领：洁面涂霜后，自额中线向两侧抹法，眼周以轻揉法环行，面颊以按揉提拉法自下而上，下颌沿颏唇沟抹向耳前，每部3~5遍；按揉迎香、地仓、颊车、颧髎、阳白、太阳各约半分钟。作用机理：促进头面气血运行、增强皮肤代谢弹性。禁忌证：皮肤炎症、痤疮化脓、出血倾向。调护：配合睡眠与防晒，持之以恒。',
      misjudgment: '美容推拿用力越大、拉扯越狠效果越好。错：面部肌肉薄、血管表浅，重手法与向下拉扯反致皮肤松弛与瘀青，宜轻缓向上、持久渗透。',
      reasoning: '面部手法为何强调方向向上，这与经络气血运行有何关联？',
      feedback: '面部肌肉皮肤多顺应重力下垂，向上提拉配合阳明经气血上行之势，顺势助荣，久之改善松弛。',
      transfer: '眼袋浮肿晨起明显者，试将轻揉与点按眼周穴位之法迁移应用。',
    },
  },
  // ============================================================
  // Y 推拿·养生康复 · 养生（009–010）
  // ============================================================
  {
    id: 'pb41-y-009', title: '养生·八段锦导引要点', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['八段锦', '导引', '养生功法', '调息'],
    intent: '掌握八段锦八式的动作要点与练功总则，理解导引吐纳在养生康复中的作用。',
    facts: [
      { field: 'clinical.功法概述', sourceType: 'textbook', sourceTitle: '《中医养生学》规划教材', status: 'verified' },
      { field: 'clinical.动作要点', sourceType: 'textbook', sourceTitle: '《中医养生学》规划教材', status: 'verified' },
      { field: 'clinical.练功总则', sourceType: 'textbook', sourceTitle: '《中医养生学》规划教材', status: 'verified' },
      { field: 'clinical.适用人群', sourceType: 'textbook', sourceTitle: '《康复医学》规划教材', status: 'verified' },
      { field: 'clinical.注意事项', sourceType: 'textbook', sourceTitle: '《中医养生学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '异法方宜论篇第十二', originalText: '中央者，其地平以湿，天地所以生万物也众，其民食杂而不劳，故其病多痿厥寒热，其治宜导引按蹻。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '养生导引无内服剂量。每式重复6~8次，全套约15~20分钟，每日晨起或午后练习1次。', caution: '动作宜缓慢圆活、呼吸深匀，量力而行；严重心脑血管病急性期、椎体不稳及关节急性疼痛者禁练或简化幅度，饱餐后1小时内不宜。' },
    cases: null,
    stdJudgment: '八段锦八式导引以松静自然、意守丹田为总纲，两手托天理三焦、左右开弓似射雕等一式一功，动作宜缓慢圆活、呼吸与动作相配、力随腰发；练习须循序渐进、量力而行，气血虚弱与关节病者简化幅度，饭后一小时内不宜。',
    coreDefinition: '八段锦是八节连贯导引功法，以松静自然、意守丹田为纲，调身调息调心合一。',
    safety: { note: '八段锦为低强度导引功法，练习中觉头晕胸闷即停；养生知识学习，功法锻炼须量力而行，慢性病者遵医嘱', prohibitions: ['严重心脑血管疾病急性期禁练', '骨折未愈合、椎体不稳及关节急性疼痛者禁练或简化动作', '孕妇及高龄体弱者忌憋气用力与过度弯腰'] },
    learning: {
      knowledge: '适应证：中老年人、慢性病稳定期及亚健康者的日常锻炼。动作要点：八式顺序为两手托天理三焦、左右开弓似射雕、调理脾胃须单举、五劳七伤往后瞧、摇头摆尾去心火、两手攀足固肾腰、攒拳怒目增气力、背后七颠百病消；每式以意念领气、动作带动呼吸，起吸落呼、开吸合呼。作用机理：伸展筋骨、调和脏腑、畅通任督，培补正气。注意事项：呼吸深匀细长，忌憋气；动作幅度由小渐大。',
      misjudgment: '把八段锦当体操，只求动作到位而忽略呼吸与意念。错：导引贵在形气意三者合一，徒具外形则失却调气养神之功，练功效果大减。',
      reasoning: '同为健身运动，为何八段锦强调意念守中而非一味加大强度？',
      feedback: '导引之旨在于以意领气、以气运身，松静之中神形俱练，过度用力反耗真气，与养生求稳求久之道相悖。',
      transfer: '颈椎不适久坐者，试将左右开弓式迁移为工间放松操。',
    },
  },
  {
    id: 'pb41-y-010', title: '养生·体质辨识与调养', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['体质辨识', '九种体质', '气虚质', '痰湿质', '因人制宜'],
    intent: '掌握九种体质的分型依据与调养原则，能结合形体舌脉初步辨识体质并制定调养方向。',
    facts: [
      { field: 'clinical.体质分类', sourceType: 'textbook', sourceTitle: '《中医养生学》规划教材', status: 'verified' },
      { field: 'clinical.辨识依据', sourceType: 'textbook', sourceTitle: '《中医养生学》规划教材', status: 'verified' },
      { field: 'clinical.各型调养', sourceType: 'textbook', sourceTitle: '《中医养生学》规划教材', status: 'verified' },
      { field: 'clinical.调养原则', sourceType: 'textbook', sourceTitle: '《中医养生学》规划教材', status: 'verified' },
      { field: 'clinical.注意事项', sourceType: 'textbook', sourceTitle: '《中医养生学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '宝命全形论篇第二十五', originalText: '人生有形，不离阴阳。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '养生调摄无内服剂量。体质调养以饮食、运动、情志与起居综合干预为主，疗程按3个月为一阶段评估调整。', caution: '体质辨识是倾向性判断而非疾病诊断；兼病者先治病后调体，进补须辨虚实施补，痰湿与湿热体质忌滥补滋腻之品。' },
    cases: null,
    stdJudgment: '体质分九种：平和质阴阳协调，气虚、阳虚、阴虚、痰湿、湿热、血瘀、气郁、特禀八种各有偏颇；辨识以形体、神色、舌脉与生活史综合判定，调养因人制宜：气虚补气健脾，阳虚温阳散寒，阴虚养阴润燥，痰湿燥湿化痰，湿热清热利湿，血瘀活血通络，气郁疏肝理气，特禀避触过敏源。',
    coreDefinition: '体质辨识按九种体质分型判定个体阴阳气血偏颇，以因人制宜为调养总纲。',
    safety: { note: '体质辨识为养生指导，不替代疾病诊疗；调补用药须辨虚实寒热，进补不当反生内热湿滞；知识学习内容，不构成诊疗建议', prohibitions: ['痰湿、湿热体质忌盲目温补滋腻', '阳虚体质忌过食生冷与大汗运动', '特禀体质须回避已知过敏原，过敏急性期就医'] },
    learning: {
      knowledge: '辨识依据：形体胖瘦、面色唇舌、精神情志、寒热喜恶、饮食二便与脉象舌苔，兼参生活史。各型要点：气虚质声低气短、易感冒；阳虚质畏寒肢冷、便溏；阴虚质手足心热、口干；痰湿质体胖腹满、苔腻；湿热质面垢油光、口苦；血瘀质面色晦暗、舌紫；气郁质神情抑郁、善太息；特禀质易过敏。调养原则：平和质顺四时保养，偏颇质纠偏扶正。注意事项：体质可因年龄、疾病、环境动态变化，宜定期复评。',
      misjudgment: '见手足心热、口干即断阴虚，一味滋阴。错：湿热、气郁化火亦可现热象，须兼察舌苔腻否、口渴喜温喜冷；辨证不明则滋阴助湿，反生胀满。',
      reasoning: '同为冬季畏寒，为何有人宜温补阳气、有人宜温通血脉，辨识眼目在何处？',
      feedback: '阳虚畏寒兼便溏神疲、脉沉迟，宜温补；血瘀畏寒兼痛有定处、舌紫暗，宜温通活血，同寒异治，重在审因。',
      transfer: '体胖易困、大便黏滞之人，试按痰湿质思路设计饮食运动方案。',
    },
  },
];
