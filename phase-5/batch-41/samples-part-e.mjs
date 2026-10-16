// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part E（E 针灸治疗学 10 节点 pb41-e-001 ~ pb41-e-010）
// 学科：E 针灸治疗学（补足学科上限批次）
// 覆盖：耳鸣耳聋 / 鼻渊 / 哮喘 / 眩晕 / 面痛 / 颈项强痛 /
//       肘劳 / 膝骨关节炎 / 带状疱疹 / 戒烟戒酒
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'，title 用「病证·分型/治法」式
// facts 仅用《针灸治疗学》规划教材 /《针灸学》规划教材 /《刺法灸法学》规划教材
// 取穴涉及合谷时 prohibitions 写「孕妇禁针」红线；safety.note 一律含安全声明
// 难度分布：简单3（002/007/008）中等3（003/004/006）困难2（005/009）易混综合2（001/010）
// ============================================================

export const PART_E = [
  // ============================================================
  // E 针灸治疗学 · 耳鸣耳聋·虚实分治（001）
  // ============================================================
  {
    id: 'pb41-e-001', title: '耳鸣耳聋·肝胆火盛与肾精亏虚取穴', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['耳鸣耳聋', '肝胆火盛', '肾精亏虚', '补泻异治'],
    intent: '辨析耳鸣耳聋肝胆火盛实证与肾精亏虚虚证的取穴与补泻差异。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '主穴毫针平补平泻；肝胆火盛配太冲、丘墟泻法，肾精亏虚配肾俞、太溪补法，可加艾条温和灸', caution: '耳周穴浅刺轻刺激；耳鸣伴剧烈眩晕呕吐者须排除颅内病变' },
    cases: null,
    stdJudgment: '耳鸣耳聋分虚实而治：肝胆火盛属实，泻太冲丘墟清泄肝胆；肾精亏虚属虚，补肾俞太溪益精填髓，主穴取耳周听会翳风配远端中渚侠溪。',
    coreDefinition: '耳鸣耳聋以耳周听会、翳风配远端中渚、侠溪为主穴，肝胆火盛者泻之，肾精亏虚者补之。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。耳鸣耳聋久治不效或突发暴聋，须耳科检查排除器质病变。', prohibitions: [] },
    learning: {
      knowledge: '主穴听会（足少阳胆经）、翳风（手少阳三焦经）、中渚（手少阳三焦经）、侠溪（足少阳胆经）。辨证配穴：肝胆火盛配太冲（足厥阴肝经）、丘墟（足少阳胆经），毫针泻法；肾精亏虚配肾俞（足太阳膀胱经）、太溪（足少阴肾经），毫针补法。肝胆火盛者突发耳鸣、声大如潮、口苦咽干、心烦易怒；肾精亏虚者病程久延、鸣声细如蝉、腰膝酸软、夜甚。实证以泻为主、虚证以补为主，虚实不辨则补泻颠倒。',
      misjudgment: '虚实不辨一律泻法。肾精亏虚之耳鸣施泻法反耗肾精，须补肾俞太溪；肝胆火盛者施补法则助火壅窍，补泻方向全凭虚实。',
      reasoning: '同是耳鸣，为何肝火者取胆经侠溪、肾虚者取肾经太溪？',
      feedback: '侠溪为胆经荥穴清泻肝胆之火，太溪为肾经原穴补益肾精，病机虚实不同则取经迥异，循经取穴以辨虚实为前提。',
      transfer: '若患者耳鸣伴头晕目赤、口苦咽干，应辨何证、加何穴？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 鼻渊·肺经风热（002）
  // ============================================================
  {
    id: 'pb41-e-002', title: '鼻渊·肺经风热取穴', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['鼻渊', '肺经风热', '迎香', '印堂', '合谷·孕妇禁针'],
    intent: '掌握鼻渊肺经风热证的主穴处方与疏风清热通窍刺法。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '迎香向内上方斜刺 0.3-0.5 寸，印堂提捏进针平刺 0.3-0.5 寸，毫针泻法，每日 1 次', caution: '合谷孕妇禁针；迎香直刺过深可伤鼻翼软骨' },
    cases: null,
    stdJudgment: '鼻渊取迎香印堂通利鼻窍，配合谷列缺原络相配宣肺解表，肺经风热者加曲池尺泽泻热，迎香向内上斜刺、印堂提捏进针，毫针泻法以疏风清热通窍。',
    coreDefinition: '鼻渊以迎香、印堂、合谷、列缺为主穴，肺经风热者配曲池、尺泽、风池，治以疏风清热、宣肺通窍。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。鼻渊反复发作伴头痛涕血者须耳鼻喉科检查排除鼻窦器质病变。', prohibitions: ['合谷：孕妇禁针，有堕胎风险'] },
    learning: {
      knowledge: '主穴迎香（手阳明大肠经）通利鼻窍，印堂（督脉）利窍止头痛，合谷（手阳明大肠经）与列缺（手太阴肺经）原络相配宣肺解表。肺经风热证见鼻塞流黄稠涕、头痛、发热、咳嗽咽痛，配曲池（手阳明大肠经）、尺泽（手太阴肺经合穴）、风池（足少阳胆经）疏风清热。迎香向内上方斜刺 0.3-0.5 寸，印堂提捏进针平刺，毫针泻法。',
      misjudgment: '迎香穴直刺进针。迎香当向内上方斜刺 0.3-0.5 寸，直刺过深可伤鼻翼软骨与鼻黏膜，且不利通窍之感传。',
      reasoning: '鼻渊为何取合谷列缺这对原络相配的穴组？',
      feedback: '合谷为大肠经原穴、列缺为肺经络穴，原络相配通表里两经，宣肺解表、疏风通窍，为鼻渊外感证之要配。',
      transfer: '若鼻渊日久、流清涕遇寒加重属肺气虚寒，取穴与刺法应如何变化？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 哮喘·虚实分治（003）
  // ============================================================
  {
    id: 'pb41-e-003', title: '哮喘·实证与虚证取穴', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['哮喘', '实证虚证', '天突禁深刺', '定喘', '膏肓灸'],
    intent: '掌握哮喘实证泻肺平喘与虚证补益肺肾的取穴处方及天突刺法警戒。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '实证毫针泻法，膻中平刺 0.3-0.5 寸、天突沿胸骨柄后缘向下刺 0.5-1 寸；虚证补法，膏肓肺俞可艾条温和灸 10-15 分钟', caution: '天突禁深刺，防伤气管与大血管；哮喘持续发作伴紫绀者须立即送医' },
    cases: null,
    stdJudgment: '哮喘实证取肺俞膻中天突定喘泻肺降气平喘，虚证取肺俞膏肓肾俞太渊太溪补益肺肾，虚者灸膏肓培元固本，天突沿胸骨柄后缘向下刺 0.5-1 寸、禁深刺。',
    coreDefinition: '哮喘以肺俞、膻中、天突、定喘为主穴，实证泻肺平喘、虚证补益肺肾，膏肓宜灸以培本。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。哮喘急性重度发作、口唇紫绀者须立即急诊，针灸不能替代急救。', prohibitions: ['天突穴禁深刺，沿胸骨柄后缘向下刺 0.5-1 寸，防伤气管与大血管'] },
    learning: {
      knowledge: '实证主穴肺俞（足太阳膀胱经）、膻中（任脉）、天突（任脉）、定喘（经外奇穴）、列缺（手太阴肺经），风寒加风门、尺泽，毫针泻法。虚证取肺俞、膏肓（足太阳膀胱经）、肾俞（足太阳膀胱经）、太渊（手太阴肺经原穴）、太溪（足少阴肾经原穴）、足三里（足阳明胃经），补法并灸膏肓。实证哮喘声高息涌、痰稠色黄、胸满；虚证声低息微、动则喘甚、腰酸。天突穴沿胸骨柄后缘向下平刺 0.5-1 寸，不可深刺直刺。',
      misjudgment: '天突直刺深刺。天突深部邻气管与胸骨柄后大血管，当沿胸骨柄后缘向下刺 0.5-1 寸，过深可刺伤气管引发呛咳出血。',
      reasoning: '虚喘为何灸膏肓而实喘不灸？',
      feedback: '膏肓为足太阳膀胱经穴，灸之温阳补肺、培元固本，宜于虚证久喘；实喘邪气壅盛，灸之反助火闭肺。',
      transfer: '若哮喘发作时喉中痰鸣、咯痰黄稠，辨证配穴当如何加减？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 眩晕·痰浊中阻（004）
  // ============================================================
  {
    id: 'pb41-e-004', title: '眩晕·痰浊中阻取穴', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['眩晕', '痰浊中阻', '丰隆豁痰', '中脘', '风池禁深刺'],
    intent: '掌握眩晕痰浊中阻证健脾化痰、升清降浊的取穴处方。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '主穴毫针平补平泻，丰隆、阴陵泉泻法，中脘直刺 1-1.5 寸；眩晕发作期每日 1 次', caution: '风池向鼻尖方向斜刺 0.8-1.2 寸，禁向内上方深刺；眩晕伴肢体麻木无力者须排除脑血管病' },
    cases: null,
    stdJudgment: '眩晕痰浊中阻者头重如蒙、呕恶痰涎、食少多寐，取百会风池内关太冲足三里，配中脘丰隆阴陵泉化痰降浊，丰隆为豁痰要穴施泻法，中焦清升则眩自止。',
    coreDefinition: '眩晕主穴百会、风池、内关、太冲、足三里，痰浊中阻配中脘、丰隆、阴陵泉，健脾化痰、升清降浊。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。眩晕伴言语不利、肢体无力者须立即就医排除脑血管意外。', prohibitions: [] },
    learning: {
      knowledge: '主穴百会（督脉）升清止眩，风池（足少阳胆经）息风止眩，内关（手厥阴心包经）和胃降逆，太冲（足厥阴肝经）平肝，足三里（足阳明胃经）扶土。痰浊中阻证见眩晕头重如蒙、胸闷恶心、呕吐痰涎、食少多寐，配中脘（任脉）健胃化痰、丰隆（足阳明胃经络穴）豁痰要穴、阴陵泉（足太阴脾经）健脾利湿，丰隆、阴陵泉施泻法。脾虚失运、聚湿生痰，痰浊上蒙清窍而眩。',
      misjudgment: '痰浊眩晕按肝阳上亢平肝息风论治、以泻太冲为主。痰浊者当运脾化痰，太冲平肝之力用非所宜，中脘丰隆阴陵泉方为正治。',
      reasoning: '丰隆为何称「豁痰要穴」，治眩晕取其意在治标还是治本？',
      feedback: '丰隆为足阳明胃经络穴，联络脾经，脾胃运化则痰源得绝，既豁既成之痰又杜生痰之本，标本兼顾。',
      transfer: '若眩晕兼呕吐痰涎清稀、腹胀便溏，可再加何穴？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 面痛·三叉神经痛（005）
  // ============================================================
  {
    id: 'pb41-e-005', title: '面痛·三叉神经痛取穴', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['面痛', '三叉神经痛', '按支取穴', '合谷·孕妇禁针', '三阴交·孕妇禁针'],
    intent: '掌握三叉神经痛按受累分支近部取穴与远取合谷内庭的处方，注意面部轻刺激原则。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '面部穴浅刺轻刺激，毫针平补平泻；痛剧时远取合谷内庭泻法，可配电针连续波', caution: '面部血管丰富，出针按压防血肿；三阴交、合谷孕妇禁针' },
    cases: null,
    stdJudgment: '面痛即三叉神经痛，按受累分支取穴：眼支攒竹阳白、上颌支四白颧髎、下颌支下关夹承浆，远取合谷内庭清阳明热，面部穴浅刺轻刺激，久痛补足三里三阴交。',
    coreDefinition: '面痛按三叉神经受累分支近部取穴并远取合谷内庭，实证泻之、久痛补之，面部穴轻浅刺激。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。面痛如伴面部疱疹或鼻咽部病变，须专科检查明确病因。', prohibitions: ['合谷：孕妇禁针，有堕胎风险', '三阴交：孕妇禁针，有堕胎风险'] },
    learning: {
      knowledge: '三叉神经痛面部剧痛如刀割电击、有扳机点。按支取穴：眼支（第一支）取攒竹（足太阳膀胱经）、阳白、鱼腰；上颌支（第二支）取四白（足阳明胃经）、颧髎、迎香；下颌支（第三支）取下关、夹承浆、颊车、地仓。远取合谷（手阳明大肠经）、内庭（足阳明胃经）清阳明热。久病体虚加足三里、三阴交补益气血。面部穴浅刺轻刺激，痛剧时以远端穴泻法为主，缓解期平补平泻。',
      misjudgment: '面部剧痛施强刺激泻法。三叉神经痛面部穴宜轻浅刺激，强刺激可诱发疼痛加重，痛剧时当以远端合谷内庭为主。',
      reasoning: '为何三叉神经痛无论何支受累都取合谷、内庭？',
      feedback: '合谷为面口之要穴、内庭为胃经荥穴清阳明胃热，二穴远端取用，循经而治又不刺激面部扳机点。',
      transfer: '若面痛反复发作伴面肌抽搐、神疲乏力，应如何调整取穴？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 颈项强痛·落枕与颈椎病（006）
  // ============================================================
  {
    id: 'pb41-e-006', title: '颈项强痛·落枕与颈椎病取穴', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['颈项强痛', '落枕穴', '肩井禁深刺', '颈夹脊', '后溪通督'],
    intent: '掌握颈项强痛主穴处方及落枕、颈椎病的分证配穴与动留针法。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '落枕穴、后溪毫针泻法，边捻转边嘱患者活动颈部（动留针）；阿是穴可温针灸；肩井斜刺 0.5-0.8 寸', caution: '肩井禁深刺防伤肺尖；颈椎病伴肢体麻木无力者须影像检查排除脊髓受压' },
    cases: null,
    stdJudgment: '颈项强痛取落枕穴阿是穴为主，后溪通督脉、悬钟为髓会共治项强，落枕加风池肩井、颈椎病加颈夹脊天柱，落枕穴后溪施泻法并动留针配合颈部活动。',
    coreDefinition: '颈项强痛以落枕穴、阿是穴、后溪、悬钟为主，落枕与颈椎病分别配风池肩井与颈夹脊天柱，动留针为要。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。颈项强痛伴上肢麻木无力、行走不稳者须先影像检查。', prohibitions: [] },
    learning: {
      knowledge: '主穴落枕穴（经外奇穴，手背第2、3掌骨间）专治落枕，阿是穴以痛为输，后溪（手太阳小肠经）通督脉治项强，悬钟（足少阳胆经）髓会治项痛。落枕：晨起颈项强痛、活动受限，配风池（足少阳胆经）、肩井（足少阳胆经）。颈椎病：颈项肩臂疼痛麻木，配颈夹脊（经外奇穴）、天柱（足太阳膀胱经）、大椎（督脉）。落枕穴、后溪施泻法，边捻转边让患者缓慢活动颈部，为动留针法。肩井穴斜刺 0.5-0.8 寸，禁深刺。',
      misjudgment: '肩井穴直刺深刺。肩井深部为肺尖，直刺过深可致气胸，当斜刺 0.5-0.8 寸。',
      reasoning: '后溪为手太阳小肠经穴，为何能治颈项强痛？',
      feedback: '后溪通于督脉，督脉行于项背正中，刺后溪可通调督脉与太阳经气，为项强之远道要穴。',
      transfer: '若颈椎病伴上肢麻木放射至手指，应加何经穴位？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 肘劳·网球肘阿是穴（007）
  // ============================================================
  {
    id: 'pb41-e-007', title: '肘劳·网球肘阿是穴', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['肘劳', '网球肘', '阿是穴', '多向透刺', '经筋病'],
    intent: '掌握肘劳以阿是穴为主多向透刺配手阳明经穴的取穴与刺法。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '阿是穴毫针多向透刺或围刺，可温针灸或加电针；痛点顽固者先刺络拔罐，再针', caution: '肘部操作常规进行；治疗后嘱减少腕部用力动作' },
    cases: null,
    stdJudgment: '肘劳即肱骨外上髁炎，疼痛有定处属经筋病，以阿是穴为主多向透刺，配曲池手三里肘髎外关舒筋通络，可温针灸或刺络拔罐，取效重在阿是穴与循经相合。',
    coreDefinition: '肘劳（网球肘）以阿是穴为要，多向透刺或围刺，配手阳明经曲池手三里肘髎与手少阳外关舒筋止痛。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。肘劳针刺后局部酸胀属正常，出针按压防出血。', prohibitions: [] },
    learning: {
      knowledge: '肘劳以肘外侧肱骨外上髁疼痛、前臂旋前或腕屈曲用力时痛甚为主症，属经筋病。主穴阿是穴（肱骨外上髁压痛点），毫针多向透刺或围刺以疏筋通络；配曲池、手三里、肘髎（均手阳明大肠经）与手少阳三焦经外关，行气活血、舒筋止痛。局部可温针灸或加电针，痛点顽固者先刺络拔罐。嘱患者减少腕部用力、注意劳逸结合。',
      misjudgment: '只取曲池而忽视阿是穴。肘劳痛有定处，阿是穴以痛为输是取效关键，曲池手三里为循经配合，二者不可偏废。',
      reasoning: '肘劳为何强调阿是穴多向透刺？',
      feedback: '阿是穴为病所，多向透刺可扩大刺激范围、松解局部筋结粘连，一穴数向，得气充分。',
      transfer: '若疼痛沿前臂外侧放射、反复发作，可取哪些远端穴配合？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 膝骨关节炎·鹤顶犊鼻取穴（008）
  // ============================================================
  {
    id: 'pb41-e-008', title: '膝骨关节炎·鹤顶犊鼻取穴', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['膝骨关节炎', '鹤顶', '犊鼻', '膝眼斜刺', '筋会阳陵泉'],
    intent: '掌握膝骨关节炎膝周取穴处方与膝眼斜刺法及关节腔感染防范。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '内膝眼、犊鼻向关节腔方向斜刺 0.5-1 寸，鹤顶浅刺 0.5-1 寸，毫针平补平泻，可温针灸或电针', caution: '膝眼针刺严格消毒，防关节腔感染；年老骨赘明显者刺激宜轻' },
    cases: null,
    stdJudgment: '膝骨关节炎取膝周穴为主，鹤顶内外膝眼通利关节，配阳陵泉血海梁丘活血舒筋止痛，膝眼向关节腔斜刺须严格消毒，风寒湿者温针灸，肝肾亏虚者补肝俞肾俞。',
    coreDefinition: '膝骨关节炎以鹤顶、内膝眼、犊鼻（外膝眼）、阳陵泉、血海、梁丘为主穴，通利关节、活血舒筋。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。膝眼穴进针须严格消毒，关节腔感染风险高。', prohibitions: [] },
    learning: {
      knowledge: '主穴鹤顶（经外奇穴，髌骨上缘中点凹陷）利膝止痛，内膝眼、犊鼻（外膝眼）向关节腔方向斜刺 0.5-1 寸通利关节，阳陵泉（足少阳胆经）筋会舒筋，血海（足太阴脾经）活血，梁丘（足阳明胃经）止痛。风寒湿证加膝阳关、委中并温针灸；肝肾亏虚证加肝俞、肾俞施补法。膝眼针尖对向关节腔斜刺，严格消毒，防关节腔感染。',
      misjudgment: '膝眼垂直深刺入关节腔。膝眼当向关节腔方向斜刺 0.5-1 寸，过深伤及软骨滑膜，消毒不严可致关节腔感染。',
      reasoning: '阳陵泉为何是膝痛必取之穴？',
      feedback: '阳陵泉为八会穴之筋会，膝为筋之府，筋会穴主治筋病，故膝痛常取阳陵泉舒筋通络。',
      transfer: '若膝痛遇寒加重、屈伸不利明显，刺灸法应作何调整？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 带状疱疹·蛇串疮围刺法（009）
  // ============================================================
  {
    id: 'pb41-e-009', title: '带状疱疹·蛇串疮围刺法', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['带状疱疹', '蛇串疮', '围刺法', '夹脊穴', '后遗神经痛'],
    intent: '掌握蛇串疮局部围刺配夹脊穴与支沟阳陵泉的处方及分证配穴。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.bianzheng', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '围刺：疱疹周围 0.5-1 寸处多针斜刺围刺、针尖向病灶中心；夹脊穴直刺 0.5-1 寸，毫针泻法，可刺络拔罐', caution: '疱疹局部皮肤破溃处严格消毒防继发感染；年老体弱者防后遗神经痛' },
    cases: null,
    stdJudgment: '蛇串疮以疱疹周围围刺为主，针尖向病灶中心，配相应节段夹脊穴与支沟阳陵泉，肝经郁热泻行间侠溪，脾经湿热配阴陵泉内庭，可刺络拔罐泄毒。',
    coreDefinition: '带状疱疹以局部围刺配相应节段夹脊穴、支沟、阳陵泉为主，疏肝泄热、清利湿热、解毒止痛。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。疱疹破溃糜烂处注意消毒防感染；眼周疱疹须眼科会诊。', prohibitions: [] },
    learning: {
      knowledge: '带状疱疹沿神经分布呈带状疱疹、灼痛如刺。围刺法：在疱疹周围 0.5-1 寸处取 4-6 针斜刺围刺，针尖朝向病灶中心；配病变相应节段夹脊穴（经外奇穴）直刺 0.5-1 寸，支沟（手少阳三焦经）、阳陵泉（足少阳胆经）疏利少阳。肝经郁热证疱疹色红灼痛、口苦烦急，配行间（足厥阴肝经）、侠溪（足少阳胆经）泻法；脾经湿热证疱疹色淡糜烂、脘闷纳呆，配阴陵泉（足太阴脾经）、内庭（足阳明胃经）。疱疹破溃处可刺络拔罐泄热。老年患者易后遗神经痛，宜早期干预。',
      misjudgment: '只在疱疹中心直刺。围刺须在疱疹周围进针、针尖向病灶中心，中心直刺易伤破损皮肤、加重感染。',
      reasoning: '围刺法的作用机理在于阻断病邪蔓延还是引邪外出？',
      feedback: '围刺如包围之势，针尖向病灶中心，既阻断邪毒蔓延又疏泄局部郁热，一围一刺，两得其效。',
      transfer: '若疱疹消退后遗局部刺痛经久不愈，取穴应如何调整？',
    },
  },
  // ============================================================
  // E 针灸治疗学 · 戒烟戒酒·耳穴与体穴结合（010）
  // ============================================================
  {
    id: 'pb41-e-010', title: '戒烟戒酒·耳穴与体穴结合', category: 'clinical', difficulty: 4, difficultyLabel: '综合推理',
    riskTags: ['戒烟戒酒', '耳穴压豆', '列缺足三里', '耳穴禁针', '戒断反应'],
    intent: '掌握戒烟戒酒耳穴与体穴结合的取穴方案与压豆操作，理解调神断瘾之机理。',
    facts: [
      { field: 'clinical.zhuzhi', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.quxue', sourceType: 'textbook', sourceTitle: '《针灸治疗学》规划教材', status: 'verified' },
      { field: 'clinical.erxue', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
      { field: 'clinical.cifa', sourceType: 'textbook', sourceTitle: '《刺法灸法学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '耳穴王不留行籽压豆，每日按压 3-5 次、每次 1-2 分钟至酸胀，双耳交替 3-5 天更换；体穴毫针平补平泻，每周 2-3 次', caution: '耳廓炎症冻伤禁用；孕妇及有习惯性流产史者禁压子宫、卵巢、内分泌等耳穴' },
    cases: null,
    stdJudgment: '戒烟以耳穴口肺胃内分泌神门配体穴列缺足三里，戒酒以耳穴肝心内分泌皮质下配内关百会，耳压体针结合调神安志、抑制中枢兴奋、减轻戒断反应。',
    coreDefinition: '戒瘾以耳穴压豆配体穴针刺，戒烟取口、肺、胃、内分泌、神门与列缺足三里，戒酒取神门、肝、皮质下、内分泌、心与内关百会。',
    safety: { note: '仅作知识学习，禁止无资质自行针刺。戒瘾成败系于患者主观意愿，针灸为辅助手段；耳穴操作须防耳廓感染。', prohibitions: ['耳廓冻伤、炎症、湿疹处禁用', '孕妇禁针耳穴；有习惯性流产史者禁用子宫、卵巢、内分泌等耳穴'] },
    learning: {
      knowledge: '戒烟耳穴取口（烟瘾信号）、肺、胃（替代口欲）、内分泌、神门、皮质下，体穴列缺（手太阴肺经）、足三里（足阳明胃经）、内关（手厥阴心包经）；戒酒耳穴取神门、肝、皮质下、内分泌、心，体穴百会（督脉）、内关。操作：耳廓消毒找敏感点，王不留行籽贴压，每日按压 3-5 次、每次 1-2 分钟至酸胀，双耳交替 3-5 天更换；体穴毫针平补平泻。机理在调神安志、抑制中枢兴奋、减轻烦躁失眠等戒断反应，须配合患者主观戒断意愿。',
      misjudgment: '只贴耳穴不按压、或忽视患者主观意愿。耳穴刺激量靠反复按压实现，仅贴不按刺激不足；戒瘾为身心结合之治，无主观意愿则针灸难收全功。',
      reasoning: '戒烟取「口」与「肺」两个耳穴，分别针对戒瘾的什么环节？',
      feedback: '「口」穴对应口腔依赖与吸烟动作习惯，「肺」穴对应烟毒损伤之脏与对烟的生理渴求，一治习惯一治脏气。',
      transfer: '若患者戒酒后烦躁失眠明显，耳穴当加何穴、体穴当加何穴？',
    },
  },
];
