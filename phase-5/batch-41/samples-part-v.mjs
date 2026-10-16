// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · Part V（V 中医骨伤科学 10 节点 pb41-v-001 ~ pb41-v-010）
// 学科：V 中医骨伤科学；覆盖：胫腓骨干骨折（1）/ 跟骨骨折（1）/ 肋骨骨折（1）/ 骨盆骨折（1）/
//       指骨骨折（1）/ 网球肘（1）/ 狭窄性腱鞘炎（1）/ 半月板损伤（1）/ 跟痛症（1）/ 颈椎病（1）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「骨伤·病证·治法/证治」式（前缀必带「骨伤·」）
// facts sourceTitle 限定：《中医骨伤科学》规划教材 / 《方剂学》规划教材 / 《中药学》规划教材 /
//   《中国药典》 / 《伤寒论》规划教材
// classics 一律整书名 label（《医宗金鉴》《素问》等，已在 classic-patch.mjs 收录），
//   篇名入 chapter，originalText 逐字核对，sourceType:'classic_original'，status:'verified'
// dosage 一律填写 guideline（内服剂量+固定/外用方法）/caution（禁忌与警戒）
// 高危药红线按 authoring-spec 第 4 节表：麻黄（葛根汤）/没药（身痛逐瘀汤）/甘草等
// 难度分布：简单 3（difficulty 1）/ 中等 3（difficulty 2）/ 困难 2（difficulty 3）/ 易混综合 2（易混淆 1 + 综合推理 1）
// ============================================================

export const PART_V = [
  // ============================================================
  // V 中医骨伤科学 · 胫腓骨干 / 跟骨 / 肋骨骨折（001–003）
  // ============================================================
  {
    id: 'pb41-v-001', title: '骨伤·胫腓骨干骨折整复固定', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['胫腓骨干骨折', '整复固定', '夹板', '中下1/3', '骨不连'],
    intent: '掌握胫腓骨干骨折的移位特点、五块夹板固定方法与三期用药，理解中下1/3血供薄弱与迟缓愈合的关系。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.移位特点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.固定方法', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.外用方', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《医宗金鉴》', canon: '《医宗金鉴》', chapter: '编辑正骨心法要旨', originalText: '机触于外，巧生于内，手随心转，法从手出。', sourceTitle: '《医宗金鉴》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '早期桃红四物汤加减（桃仁、红花、当归、川芎、生地黄、赤芍各9g）水煎日1剂分2次；中期和营止痛汤或接骨紫金丹；后期六味地黄丸合健步虎潜丸；外敷消瘀止痛膏，每2~3日换药。', caution: '小腿中下1/3血供差，注意防迟缓愈合与骨不连，定期摄片；固定后观察足趾血运感觉，过紧致足趾青紫麻木即松解；警惕骨筋膜室综合征，肿胀剧痛、足趾被动牵拉痛者须急诊处理。' },
    cases: null,
    stdJudgment: '胫腓骨干骨折多因直接暴力致横断粉碎，或间接扭转致斜行螺旋；胫骨中下1/3血供薄弱，最易迟缓愈合。整复宜拔伸牵引纠正重叠成角，五块夹板超关节固定，胫骨骨折须力线正直、防旋转移位，固定期练足踝与股四头肌，后期再负重，动静结合贯穿始终。',
    coreDefinition: '胫腓骨干骨折治以拔伸整复、夹板固定，中下1/3血供差须防骨不连。',
    safety: { note: '骨折整复固定须由专业医师操作，辨证论治知识学习，临床手法与用药须遵医嘱', prohibitions: ['乳香、没药活血止痛力峻，内服过量刺激胃肠致恶心呕吐，孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '主症小腿肿胀疼痛、畸形、异常活动、骨擦音，不能站立负重。病机直接或间接暴力致胫腓骨中断。治以拔伸牵引整复、五块夹板固定6~8周；内服三期：初期桃红四物汤活血化瘀、中期和营止痛汤和营生新、后期六味地黄丸补肝肾强筋骨。',
      misjudgment: '小腿骨折消肿后即停固定过早负重。错：胫骨中下1/3愈合缓慢，负重过早致断端再移位或内固定失效，须以X线骨痂与力线为准渐次负重。',
      reasoning: '胫腓骨双骨折与单纯腓骨骨折在固定要求上为何一重一轻？',
      feedback: '腓骨不承重且固定易，胫骨负重且中下1/3血供差，故双骨折以胫骨为主线固定练功，腓骨随其愈合。',
      transfer: '小腿螺旋形骨折愈合期出现局部隐痛、断端叩痛者，试分析骨不连风险并调整治法。',
    },
  },
  {
    id: 'pb41-v-002', title: '骨伤·跟骨骨折整复固定', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['跟骨骨折', '高处坠下', '足跟痛', '挤压复位', '固定'],
    intent: '掌握跟骨骨折的好发机制、挤压整复与跖屈位固定方法，理解距下关节受累对预后的影响。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.损伤机制', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.固定方法', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '无移位者抬高患肢、足跖屈位夹板或石膏固定4~6周；有移位者手法挤压复位后同法固定；早期内服桃红四物汤加减，后期六味地黄丸合虎潜丸补肝肾；外敷消瘀止痛膏。', caution: '高处坠下者须先排除脊柱、骨盆及内脏合并损伤；粉碎波及距下关节面者宜手术；固定期抬高患肢消肿，忌过早负重，负重须待X线愈合后渐行。' },
    cases: null,
    stdJudgment: '跟骨骨折多由高处坠下足跟着地所致，足跟部肿胀瘀斑、压痛明显、足弓塌陷变平、不能负重。治疗依移位轻重：无移位者仅予固定制动，有移位者先挤压跟骨两侧以矫正增宽塌陷，再跖屈位固定；波及距下关节者预后较差，须防创伤性关节炎。',
    coreDefinition: '跟骨骨折因高处坠下足跟着地，治以挤压复位、跖屈位固定，防距下关节炎。',
    safety: { note: '跟骨骨折整复固定须专业医师操作，辨证论治知识学习，临床手法与用药须遵医嘱', prohibitions: ['桃仁、红花活血力峻，孕妇慎用；血虚无瘀者忌用'] },
    learning: {
      knowledge: '主症足跟剧痛、肿胀瘀斑、足跟增宽、足弓变浅，不能负重站立。病机高处坠下足跟着地垂直压缩暴力。无移位者跖屈位夹板石膏固定；有移位者对挤跟骨两侧复位后同法固定；早期桃红四物汤活血消肿，后期六味地黄丸合虎潜丸补肝肾，练功踝足活动、愈合后渐负重。',
      misjudgment: '跟骨骨折消肿不痛便以为痊愈。错：跟骨是负重点，距下关节受损者过早负重即遗创伤性关节炎，须以X线愈合程度决定负重时机。',
      reasoning: '跟骨骨折波及距下关节者预后为何明显变差？',
      feedback: '距下关节面破坏则跟距活动失顺，负重应力集中，久则疼痛肿胀，故关节面平整与否决定治法与预后。',
      transfer: '建筑工人高处坠落双足跟肿痛不能立，试述急救检查次序与固定要点。',
    },
  },
  {
    id: 'pb41-v-003', title: '骨伤·肋骨骨折固定与并发症', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['肋骨骨折', '胸廓固定', '连枷胸', '血气胸', '排痰'],
    intent: '掌握肋骨骨折的好发部位、胸带固定方法与血气胸、连枷胸等并发症的识别处理。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.好发部位', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.固定方法', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.并发症', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '单纯肋骨骨折以弹力胸带或宽胶布半环式固定，限制胸廓活动止痛；内服复元活血汤加减（柴胡、天花粉、当归、红花、桃仁、酒大黄、皂角刺代穿山甲、甘草）日1剂分2次；痛甚加延胡索、乳香没药（少量）。', caution: '多根多处骨折致连枷胸反常呼吸者须加压固定或牵引、手术内固定，并抗休克；出现气促发绀、咳血提示血气胸须即就医；鼓励咳痰排痰防肺不张与肺炎；大黄攻下，年老体弱者慎用。' },
    cases: null,
    stdJudgment: '肋骨骨折以4~7肋最易受累，直接暴力致骨折端内陷可刺伤胸膜肺，间接暴力多在肋骨角。症状为胸痛、深呼吸咳嗽加重、局部压痛、挤压胸廓痛剧。治以胸带固定限制活动，内服活血理气止痛之剂；多根多处骨折形成连枷胸者，须纠正反常呼吸，防呼吸循环衰竭。',
    coreDefinition: '肋骨骨折治以胸廓固定、活血理气止痛，多根多处骨折须纠正连枷胸反常呼吸。',
    safety: { note: '肋骨骨折并发血气胸、连枷胸为急症须立即就医，本节点仅作知识学习，临床用药须遵医嘱', prohibitions: ['甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高', '乳香、没药活血止痛力峻，内服过量刺激胃肠致恶心呕吐，孕妇慎用'] },
    learning: {
      knowledge: '主症胸痛、深呼吸咳嗽转侧加重，局部压痛，胸廓挤压征阳性；多根多处骨折见反常呼吸（连枷胸），并发气胸血胸则气促发绀。病机暴力致肋骨断裂，骨端刺伤胸膜肺。治以胸带固定、复元活血汤活血理气止痛；连枷胸牵引或手术内固定，血气胸闭式引流。',
      misjudgment: '肋骨骨折见瘀斑即重用活血破瘀。错：骨折出血期破瘀太过反加重内出血，且老年患者宜行气止痛为先，活血须轻，中病即止。',
      reasoning: '连枷胸的反常呼吸为何会危及生命，固定与呼吸支持何以并重？',
      feedback: '反常呼吸使有效通气量锐减，纵隔摆动影响循环，故须固定浮动胸壁同时给氧、必要时机械通气，标本兼治。',
      transfer: '车祸后胸痛气促、胸壁塌陷呼吸反向者，试述急救次序与固定选择。',
    },
  },
  // ============================================================
  // V 中医骨伤科学 · 骨盆 / 指骨骨折（004–005）
  // ============================================================
  {
    id: 'pb41-v-004', title: '骨伤·骨盆骨折急救固定', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['骨盆骨折', '失血性休克', '急救固定', '抗休克', '合并伤'],
    intent: '掌握骨盆骨折的暴力机制、失血性休克等合并伤识别与抗休克兜扎固定的急救次序。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.损伤机制', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.急救要点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.固定方法', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.合并伤', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '急救以抗休克为先：迅速建立静脉通道补液输血，骨盆带或床单兜扎临时固定减少骨盆容积、控制出血；稳定型骨折卧床4~6周；不稳定型行股骨髁上牵引或手术复位内固定；后期内服八珍汤或补中益气汤益气养血，接骨续筋药酒外搽。', caution: '骨盆骨折多伴失血性休克，血压不稳者禁搬动翻转，须平卧位整体搬运；注意尿道膀胱、直肠及骶神经损伤，留置导尿观察血尿；急救用药以对症抗休克为主，无高危内服方药。' },
    cases: null,
    stdJudgment: '骨盆骨折多由挤压、重物砸伤或高坠暴力所致，骨盆环断裂，伤者剧烈疼痛、不能坐立，骨盆挤压分离试验阳性，常并发大出血、尿道膀胱损伤。急救以抗休克为第一要务，兜扎固定骨盆减少容积以助止血，稳定型卧床自愈，不稳定型牵引或手术，合并内脏伤者即行专科处理。',
    coreDefinition: '骨盆骨折以抗休克与临时兜扎固定为先，稳定型卧床、不稳定型牵引手术。',
    safety: { note: '骨盆骨折并休克为急危重症须立即送医抢救，本节点仅作知识学习', prohibitions: [] },
    learning: {
      knowledge: '骨盆剧痛，局部肿胀瘀斑，骨盆挤压分离试验阳性；重者面色苍白、血压下降。强大暴力致骨盆环断裂、盆壁血管破裂出血，可伤尿道膀胱。急救以抗休克为先：补液输血、骨盆带兜扎减容止血；稳定型卧床，不稳定型牵引或手术固定；后期益气养血接骨续筋。',
      misjudgment: '休克未纠正即反复搬动复位。错：骨盆骨折出血凶猛，反复搬动加重骨折端活动致出血不止，应先固定制动抗休克，生命体征稳定后再复位固定。',
      reasoning: '兜扎固定骨盆为何能成为止血措施之一？',
      feedback: '骨盆为环状结构，断端分离使盆内容积增大、出血面开放，兜扎合拢骨盆环、减小容积，使骨折端靠拢压迫止血，为抢救赢得时间。',
      transfer: '工地挤压伤后血压骤降、骨盆剧痛者，试述从现场固定到抗休克的完整流程。',
    },
  },
  {
    id: 'pb41-v-005', title: '骨伤·指骨骨折固定', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['指骨骨折', '夹板固定', '锤状指', '功能位', '末节撕脱'],
    intent: '掌握指骨骨折的分段特点、铝板夹板功能位固定与末节撕脱骨折过伸位固定的区别。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.骨折分类', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.固定方法', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法复位后以铝板或竹夹板固定于功能位：掌指关节屈曲、指间关节微屈，末节撕脱骨折固定于过伸位3~4周；内服桃红四物汤加减或三七粉1~3g冲服；外敷消瘀止痛膏。', caution: '末节基底撕脱性骨折（锤状指）固定不确实者宜手术；固定勿过紧防指端缺血坏死，观察指端颜色温度；健指尽早活动防僵硬。' },
    cases: null,
    stdJudgment: '指骨骨折分近节、中节、末节三段，直接暴力多横断，扭转暴力多斜行螺旋；末节基底撕脱骨折致锤状指。治疗以手法复位、铝板夹板固定于功能位，固定3~4周，锤状指须过伸位固定；早期即活动健指，解除固定后循序渐进练指间关节屈伸。',
    coreDefinition: '指骨骨折以铝板夹板功能位固定，末节撕脱骨折过伸位固定，防指端缺血与关节僵硬。',
    safety: { note: '指骨骨折复位固定须专业医师操作，辨证论治知识学习，临床手法与用药须遵医嘱', prohibitions: ['三七孕妇慎用，血虚无瘀者忌用'] },
    learning: {
      knowledge: '主症手指肿痛、畸形、异常活动，末节撕脱骨折时远节指间关节不能主动伸直呈锤状。病机打击或扭转暴力致指骨断裂、肌腱牵拉移位。治法：手法复位后铝板夹板固定于功能位，末节撕脱骨折过伸位，固定3~4周；内服桃红四物汤或三七粉，固定期活动健指。',
      misjudgment: '锤状指按一般指骨骨折固定于屈曲位。错：末节撕脱骨折须伸肌腱止点对合，屈曲位使撕脱处分离，愈合失败遗留锤状畸形，须过伸位固定。',
      reasoning: '同为指骨骨折，为何末节撕脱骨折的固定体位与众不同？',
      feedback: '撕脱者骨块被伸肌腱牵拉分离，须过伸位使骨块靠拢基底部对合；骨干骨折则固定于功能位防旋转成角，体位服从损伤机制。',
      transfer: '接球时指尖戳伤致远节不能伸直者，试述诊断与固定要点。',
    },
  },
  // ============================================================
  // V 中医骨伤科学 · 网球肘 / 狭窄性腱鞘炎 / 半月板损伤 / 跟痛症 / 颈椎病（006–010）
  // ============================================================
  {
    id: 'pb41-v-006', title: '骨伤·网球肘理筋手法', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['网球肘', '肱骨外上髁炎', '理筋手法', '弹拨', '肘劳'],
    intent: '掌握肱骨外上髁炎的体征、病机与按揉弹拨理筋手法的操作要点。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.手法要点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.辅助治疗', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.外用方', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '理筋手法：先揉按前臂伸肌群放松，再于肱骨外上髁及桡侧腕伸肌腱附着处施按揉、弹拨、分筋，配合曲池、手三里穴点按，最后屈伸旋转肘关节理顺筋脉，每次10~15分钟，每日或隔日1次；外敷消瘀止痛膏或万应膏；内服养血荣筋丸或舒筋活血汤。', caution: '急性期肿胀明显者手法宜轻柔，忌暴力弹拨；局部红肿热痛疑感染、或肿瘤者禁手法；治疗后忌提重物与前臂用力旋转，可配合理疗与护肘。' },
    cases: null,
    stdJudgment: '网球肘（肱骨外上髁炎）以肘外侧疼痛、前臂旋转提物时加重、外上髁局限压痛为特征，密耳氏征阳性。病由前臂伸肌腱反复牵拉劳损、筋脉损伤瘀滞所致。理筋手法以揉按弹拨松解肌腱附着点，配曲池手三里点按，舒筋活血、解痛复伸。',
    coreDefinition: '网球肘治以揉按弹拨理筋手法，松解伸肌腱附着点，佐以舒筋活血。',
    safety: { note: '理筋手法须专业操作，本节点仅作知识学习，临床手法须遵医嘱', prohibitions: [] },
    learning: {
      knowledge: '肘外侧疼痛，握物拧毛巾时加重，肱骨外上髁压痛，密耳氏征阳性。前臂伸肌腱反复劳损，筋脉瘀滞失养。治以理筋手法：揉滚前臂伸肌群，按揉弹拨肱骨外上髁伸肌腱附着处，点按曲池，配合肘屈伸旋转；外敷消瘀止痛膏，内服舒筋活血汤，嘱休息制动。',
      misjudgment: '弹拨越重越痛以为松解越彻底。错：本病为劳损性筋伤，暴力弹拨反致局部充血水肿加重，手法当以酸胀为度、由轻渐重，松解与养血并行。',
      reasoning: '网球肘与外上髁压痛点定位准确，为何手法疗效迥异？',
      feedback: '痛点多在伸肌腱止点，准确定位按揉弹拨方能直达病所，泛泛揉肘则隔靴搔痒，故定位是手法的前提。',
      transfer: '乒乓球爱好者肘外侧痛、拧毛巾加剧者，试述手法要点与用臂调护。',
    },
  },
  {
    id: 'pb41-v-007', title: '骨伤·狭窄性腱鞘炎理筋手法', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['狭窄性腱鞘炎', '弹响指', '理筋手法', '握拳尺偏试验', '熏洗'],
    intent: '掌握狭窄性腱鞘炎的好发部位、体征与按揉弹拨、屈伸牵拉手法及中药熏洗疗法。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.手法要点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.外用方', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '手法：桡骨茎突处或掌指关节掌侧按揉、弹拨、摇转，配合拇指屈伸牵拉滑动肌腱，每次10分钟，隔日1次；外洗方伸筋草15g、透骨草15g、红花6g、桂枝9g、艾叶9g煎水熏洗，每日2次；痛甚者内服舒筋活血汤。', caution: '早期以制动休息为主，手法忌粗暴硬扳；局部封闭注射须专业操作，勿反复多次；反复发作交锁明显者可行小针刀或手术松解，须专科处理。' },
    cases: null,
    stdJudgment: '狭窄性腱鞘炎以拇指屈肌腱（弹响指）与桡骨茎突部伸肌腱（握拳尺偏试验阳性）多见，局部疼痛、活动受限，屈伸时有弹响或交锁。病由反复摩擦劳损，腱鞘增厚狭窄，肌腱滑动受阻。理筋手法按揉弹拨、屈伸牵拉以松解粘连、滑利腱鞘，配合活血通络熏洗，疗效确凿。',
    coreDefinition: '狭窄性腱鞘炎治以按揉弹拨与屈伸牵拉手法，佐以活血通络药熏洗。',
    safety: { note: '手法忌粗暴，交锁明显者宜专科诊治，本节点仅作知识学习', prohibitions: [] },
    learning: {
      knowledge: '桡骨茎突或掌指关节掌侧肿痛压痛，拇指屈伸弹响，甚则交锁，握拳尺偏试验阳性。肌腱腱鞘长期摩擦劳损、腱鞘肥厚狭窄。治以按揉弹拨腱鞘局部，配合拇指屈伸牵拉滑利肌腱，隔日1次；伸筋草、透骨草、红花、桂枝煎水熏洗活血通络；早期制动休息。',
      misjudgment: '见交锁即暴力硬扳强拉。错：腱鞘狭窄者强行屈伸反致肌腱嵌顿加重或撕裂，应先松解腱鞘周围筋脉，交锁仍不解者宜手术或小针刀松解。',
      reasoning: '弹响指与桡骨茎突腱鞘炎同属腱鞘狭窄，为何好发部位与体征各异？',
      feedback: '一在屈指肌腱经过掌骨头处，一在伸拇短肌外展拇长肌经过桡骨茎突处，解剖部位不同而病理一致，治法相通、部位有别。',
      transfer: '哺乳期妇女拇指根部疼痛弹响者，试述理筋手法与外洗方并说明制动休息的重要。',
    },
  },
  {
    id: 'pb41-v-008', title: '骨伤·半月板损伤手法与康复', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['半月板损伤', '膝关节交锁', '弹响', '解锁手法', '股四头肌康复'],
    intent: '掌握半月板损伤的体征、与韧带损伤的鉴别、解锁手法与股四头肌康复锻炼的安排。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.手法要点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.康复练功', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '交锁者先以解锁手法：坐位屈膝、内外旋转小腿并缓慢伸膝使半月板复位；随后揉滚按揉膝周（血海、梁丘、阴陵泉、阳陵泉），弹拨腘窝筋结，每次15~20分钟，隔日1次；内服初期桃红四物汤合三七粉，后期健步虎潜丸；康复练股四头肌等长收缩与直腿抬高，每日2~3组。', caution: '急性肿胀期制动冷敷、忌重手法与暴力旋转；反复交锁、绞索或关节肿胀日久不消者宜关节镜诊治；未经影像学确诊勿行暴力解锁手法。' },
    cases: null,
    stdJudgment: '半月板损伤多有膝部扭转外伤史，关节肿胀疼痛、活动受限，屈伸时有弹响，甚则交锁，股四头肌渐萎缩；麦氏试验、研磨试验阳性。膝内扭伤半月板被股胫关节面挤压撕裂。轻度损伤以理筋手法舒筋活络、解锁手法解除交锁，配合股四头肌康复锻炼；严重撕裂反复交锁者宜手术。',
    coreDefinition: '半月板损伤以理筋与解锁手法解除交锁弹响，康复重在股四头肌锻炼。',
    safety: { note: '半月板损伤须影像学确诊，交锁复位与手法须专业医师操作，本节点仅作知识学习', prohibitions: ['桃仁、红花活血力峻，孕妇慎用；血虚无瘀者忌用'] },
    learning: {
      knowledge: '主症膝关节肿胀疼痛、屈伸受限，旋转弹响，交锁者屈伸不能，久则股四头肌萎缩；麦氏试验、研磨试验阳性。病机扭转暴力使半月板嵌于股胫关节面间撕裂。治法：交锁者解锁手法复位，揉滚按揉膝周、弹拨筋结，配合股四头肌等长收缩与直腿抬高康复。',
      misjudgment: '膝关节扭伤一律按侧副韧带损伤固定。错：固定制动久则股四头肌萎缩、关节僵硬，须先辨清半月板、韧带何者受损，半月板损伤重在舒筋与康复，盲目长时间固定反害其功。',
      reasoning: '半月板损伤为何特别强调股四头肌锻炼，其与关节稳定有何关系？',
      feedback: '股四头肌是膝关节的动力稳定器，肌力增强则关节受力平稳、减少半月板再损伤，故康复练功与手法同等重要。',
      transfer: '篮球转身扭伤致膝交锁不能伸直者，试述解锁手法与后续康复次序。',
    },
  },
  {
    id: 'pb41-v-009', title: '骨伤·跟痛症温针与理筋', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['跟痛症', '跖腱膜炎', '温针灸', '理筋手法', '骨刺', '阿是穴'],
    intent: '掌握跟痛症的病因鉴别与理筋牵拉、温针灸温通结合的治疗思路，理解骨刺与疼痛的非因果性。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.鉴别要点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.理筋手法', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.温针灸', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: { guideline: '温针灸：取阿是穴、太溪、昆仑、申脉、照海，毫针刺入得气后于针柄置艾炷温灸1~2壮，留针20~30分钟，每日或隔日1次；理筋手法先按揉足跟痛点，再背伸踝趾牵拉跖腱膜，弹拨足底筋结，每次10分钟；配合透骨草、伸筋草煎水熏洗。', caution: '温针灸为针灸操作，须专业资质，皮肤破损感染处禁针；糖尿病足、下肢血管病变及感觉减退者慎针慎灸；足跟痛经久不愈或伴发热肿胀须摄片排除应力骨折、骨髓炎或肿瘤。' },
    cases: null,
    stdJudgment: '跟痛症以晨起下地足跟刺痛、活动后减轻、久行复痛为特征，压痛多在跟骨结节前内侧，多因跖腱膜炎、跟骨骨刺或跟下脂肪垫劳损所致。治疗以理筋手法松解跖腱膜、温针灸温通局部经脉，配合熏洗与足弓垫支持，多法合施；骨刺非疼痛主因，不必强求消除。',
    coreDefinition: '跟痛症治以理筋牵拉跖腱膜与温针灸温经通络，配合熏洗及足弓支持。',
    safety: { note: '温针灸属针灸操作，仅作知识学习，禁止无资质自行针刺；糖尿病足、血管病变者慎用', prohibitions: [] },
    learning: {
      knowledge: '足跟底部疼痛，晨起第一步最著、久站复作，跟骨结节前内侧压痛，X线可示骨刺。跖腱膜劳损、气血瘀滞，风寒湿邪凝滞经脉。治以理筋手法按揉痛点、背伸踝趾牵拉跖腱膜，弹拨足底筋结；温针灸阿是、太溪、昆仑温经散寒；透骨草伸筋草熏洗，配足弓垫分散应力。',
      misjudgment: '见骨刺即认定痛由刺生而欲手术刮除。错：多数跟痛症源于跖腱膜炎与筋脉劳损，骨刺仅是X线所见，与疼痛未必因果，保守理筋温针多可缓解，手术须严格指征。',
      reasoning: '温针灸与单纯针刺相比，为何更合跟痛症寒凝筋伤之病机？',
      feedback: '针能通经、灸能温散，寒凝筋脉者非温不散，针柄加灸使热力循针达于病所，温通相济，疗效更著。',
      transfer: '晨起足跟剧痛、行走后减轻的中年肥胖者，试述理筋牵拉与温针灸结合的治疗方案。',
    },
  },
  {
    id: 'pb41-v-010', title: '骨伤·颈椎病颈型与神经根型辨治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['颈椎病', '颈型', '神经根型', '葛根汤', '身痛逐瘀汤', '麻黄', '没药', '牵引'],
    intent: '掌握颈型与神经根型颈椎病的鉴别要点、分型治法与牵引手法的适应证禁忌。',
    facts: [
      { field: 'clinical.主症体征', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.分型特点', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.治法', sourceType: 'textbook', sourceTitle: '《中医骨伤科学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.药物剂量', sourceType: 'textbook', sourceTitle: '《中国药典》', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '痹论篇第四十三', originalText: '风寒湿三气杂至，合而为痹也。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '颈型：葛根汤加减（葛根15g、麻黄3~6g、桂枝9g、白芍9g、炙甘草6g、生姜、大枣），项强加羌活、片姜黄；神经根型：身痛逐瘀汤加减（秦艽、川芎、桃仁、红花、甘草、羌活、没药、当归、五灵脂、香附、牛膝、地龙）日1剂分2次；配合牵引（重量3~5kg、每次15~20分钟）与理筋松解手法。', caution: '麻黄发汗力强，虚人慎用，高血压心脏病失眠者慎用，运动员禁用；没药活血力峻、过量刺激胃肠，孕妇慎用；脊髓型颈椎病禁用牵引与旋转手法；手法须专业操作。' },
    cases: null,
    stdJudgment: '颈型颈椎病以颈项疼痛僵硬、活动受限为要，无上肢放射痛；神经根型则以颈痛伴上肢放射痛麻木为特征，压顶试验、臂丛牵拉试验阳性。二型一主筋脉拘急、一主根性受压，治法各异：颈型疏风解肌、葛根汤主之；神经根型活血通络、身痛逐瘀汤主之，并配牵引理筋。',
    coreDefinition: '颈型颈椎病治以疏风解肌，神经根型治以活血通络，均配合牵引理筋。',
    safety: { note: '颈椎牵引与手法须专业医师操作，脊髓型禁用牵引推拿，本节点仅作知识学习', prohibitions: ['麻黄发汗力强虚人慎用；高血压心脏病失眠者慎用；运动员禁用', '乳香、没药活血止痛力峻，内服过量刺激胃肠致恶心呕吐，孕妇慎用', '甘草反海藻大戟甘遂芫花；大剂量久服致水肿血压升高'] },
    learning: {
      knowledge: '颈型颈项强痛、活动受限、肩背酸痛，无上肢放射；神经根型颈痛伴上肢放射痛、手指麻木，压顶试验、臂丛牵拉试验阳性。风寒湿邪客于颈项，或神经根受压、气血瘀阻。颈型葛根汤疏风解肌，神经根型身痛逐瘀汤活血通络，均配枕颌带牵引与理筋手法。',
      misjudgment: '见颈肩痛手麻即按颈型轻证处理。错：上肢放射痛与压顶试验阳性提示根性受压，须按神经根型活血通络并合理牵引，误作颈型轻疏则麻木迁延。',
      reasoning: '同为颈椎病，为何脊髓型禁用牵引与旋转手法而神经根型可用？',
      feedback: '脊髓型椎管狭窄、受压在脊髓，牵引旋转加重压迫可致瘫痪；神经根型受压在根性通道，牵引拉开椎间隙反可缓解，安全界限不可混淆。',
      transfer: '长期伏案者颈痛伴右臂放射麻至食指者，试辨型立法并安排牵引。',
    },
  },
];
