// ============================================================
// 杏林大典 · Phase 5 · Batch-42 · 样本 Part AE（AE 沟通·心理 8 节点 pb42-ae-001 ~ pb42-ae-008）
// 学科：AE 沟通·心理；覆盖：医患沟通（001-003）/ 医学心理（004-008）
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'theory'；title 一律「沟通·主题」或「心理·主题」式
// facts sourceTitle 限定：《医患沟通学》规划教材 / 《医学心理学》规划教材
// classics 一律留空数组（现代学科，无已收录经典条文可逐字核对的引用）
// dosage 一律 null（沟通心理学科不涉及剂量）
// safety：沟通节点 note「医患沟通知识学习，不构成诊疗建议；临床操作与病情告知须遵循专业规范」；
//         心理节点 note「心理学知识学习，不构成诊疗建议；严重心理障碍须转介专科」，涉危机节点 prohibitions 加【心理危机警戒】
// 难度分布：简单 3（difficulty 1）/ 中等 3（difficulty 2）/ 困难 1（difficulty 3）/ 易混综合 1（综合推理 1）
// ============================================================

export const PART_AE = [
  // ============================================================
  // AE 沟通·心理 · 医患沟通（001–003）
  // ============================================================
  {
    id: 'pb42-ae-001', title: '沟通·倾听与共情技巧', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['倾听', '共情', '复述核实', '非语言沟通', '倾听障碍'],
    intent: '掌握积极倾听的要素与共情表达的方法，识别常见倾听障碍。',
    facts: [
      { field: 'theory.积极倾听要素', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.共情与同情区别', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.共情表达方式', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.倾听障碍类型', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.复述与澄清技巧', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '积极倾听包括专注、不打断、以复述确认理解并回应情绪；共情是设身处地体会患者感受并以语言或非语言方式让对方感到被理解，与「同情」的居高临下不同。常见倾听障碍有急于下结论、选择性听、心不在焉。倾听质量决定病史可信度，也直接塑造患者的被尊重感。',
    coreDefinition: '倾听与共情是医患沟通的基本功：全神贯注接收信息、体会患者感受并准确反馈，使患者感到被理解与尊重。',
    safety: { note: '医患沟通知识学习，不构成诊疗建议；临床操作与病情告知须遵循专业规范', prohibitions: ['不得以敷衍应付患者的倾诉，须真实反馈理解', '共情不等于迎合，不得为安抚而附和错误的病情认知'] },
    learning: {
      knowledge: '核心概念：积极倾听三要素——专注、回应、澄清；共情句式——「我理解您（情绪），因为（事实）」；同情是「为您难过」，共情是「站在您的角度感受」。实践要点：眼神接触、点头示意，讲完用「您是说……对吗」复述确认。注意：翻看手机破坏倾听。',
      misjudgment: '以为共情就是「顺着患者说话」，连错误的病情认知也点头附和。错：共情承接的是情绪而非认同事实，情绪安抚后再温和纠偏才是完整沟通。',
      reasoning: '患者反复诉说症状却始终绕不开焦虑，听与问的节奏应当如何把握？',
      feedback: '先完整听完他的担心，再切入结构化追问，情绪未落地时追问只会被挡回来。',
      transfer: '一位主诉「心慌」的患者讲话急促反复，如何用倾听技巧稳住局面？',
    },
  },
  {
    id: 'pb42-ae-002', title: '沟通·儿童患者沟通技巧', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['儿童沟通', '年龄分期', '家长沟通', '操作安抚', '知情同意'],
    intent: '掌握按年龄分期的儿童沟通策略与家长同步沟通、操作安抚技巧。',
    facts: [
      { field: 'theory.婴幼儿沟通策略', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.学龄前游戏化沟通', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.学龄期参与式沟通', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.青春期尊重与隐私', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.家长沟通与知情同意', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '与儿童沟通须按年龄分层：婴幼儿以安抚与家长沟通为主；学龄前儿童用拟人化语言、游戏与即时奖励；学龄期可解释检查流程、邀请参与；青春期须尊重其独立感与隐私。监护人行使知情同意，但儿童意见须同步听取。操作前用分散注意力、正向暗示降低恐惧，避免「打针不疼」式欺骗。',
    coreDefinition: '儿童患者沟通技巧指按年龄分期采用形象化、游戏化与尊重隐私的策略，并与监护人协同完成告知与安抚。',
    safety: { note: '医患沟通知识学习，不构成诊疗建议；临床操作与病情告知须遵循专业规范', prohibitions: ['不得以「不疼」「没事」等哄骗方式换取儿童配合，信任一旦破裂更难修复', '儿童诊疗的知情同意须由监护人行使，不得仅凭儿童口头同意实施有创操作'] },
    learning: {
      knowledge: '核心概念：年龄分期——3岁以下主要沟通对象是家长；学龄前期用拟人话术；青春期把患者本人当沟通主角。实践要点：操作时家长在场安抚、讲故事转移注意，完成操作立即表扬并兑现承诺。注意：承诺的事必须做到，才留得住信任。',
      misjudgment: '以为哄骗「打针一点不疼」能让儿童配合。错：欺骗破坏信任，下次操作更难，儿童还会把「这个医生骗人」的印象传给别的孩子。',
      reasoning: '青春期的慢病患儿拒绝服药、抗拒复查，沟通时应当以谁为第一对象？',
      feedback: '青春期应直接与患儿本人沟通，家长在场但不当面否定孩子的表达，协商式解决比命令式有效。',
      transfer: '三岁患儿抗拒听诊器检查，如何用游戏化策略完成听诊？',
    },
  },
  {
    id: 'pb42-ae-003', title: '沟通·老年患者沟通技巧', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['老年沟通', '感官代偿', '信息简化', '重复确认', '家属协作'],
    intent: '掌握老年患者的沟通特点与听觉视觉代偿、信息简化确认等技巧。',
    facts: [
      { field: 'theory.老年患者沟通特点', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.听觉视觉代偿技巧', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.信息简化与分步告知', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.尊重与称呼礼仪', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.家属协作沟通', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '老年患者常见听力视力减退、反应与理解偏慢、多重用药，沟通宜放慢语速、适度提高音量、面对面配合口型，信息分成小块逐项确认。用药交代要落到具体情景，如「早饭后服白色药片」。称呼得体、留出倾听时间，必要时请家属参与记录，但不得越过患者本人作决定。',
    coreDefinition: '老年患者沟通技巧指以感官代偿、放慢节奏、信息简化与重复确认适应老年人生理心理特点的沟通方法。',
    safety: { note: '医患沟通知识学习，不构成诊疗建议；临床操作与病情告知须遵循专业规范', prohibitions: ['不得因老人听不清、记不住而敷衍告知，关键信息须书面或家属协助确认', '家属在场时不得忽视患者本人的表达与决定权'] },
    learning: {
      knowledge: '核心概念：感官代偿——弱听者看口型、弱视者放大字号；信息简化——一次只交代一件事；重复确认——让老人复述服药安排。实践要点：视线平齐、语速放慢、医嘱配书面卡片。注意：老人常以「都行」回避表达，须主动询问，防家属代答。',
      misjudgment: '以为老人「都听医生的」，直接向家属交代完就结束沟通。错：老人是当事人，跳过本人沟通既失尊重，也让治疗方案落不到执行。',
      reasoning: '老人拒绝家属代劳的用药管理，却频频漏服药物，沟通责任在谁？',
      feedback: '尊重自主与保障安全要并行：先问清漏服原因，再协商由谁以什么方式协助，而非直接指定家属接管。',
      transfer: '一位耳背的独居老人复诊时无家属陪同，如何确保医嘱被听懂？',
    },
  },
  // ============================================================
  // AE 沟通·心理 · 医学心理（004–008）
  // ============================================================
  {
    id: 'pb42-ae-004', title: '心理·慢性病心理调适', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['慢性病', '心理调适', '认知重建', '行为激活', '病耻感'],
    intent: '掌握慢性病患者的心理反应规律与促进心理调适的干预要点。',
    facts: [
      { field: 'theory.慢性病心理反应阶段', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.病耻感与情绪问题', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.疾病认知重建', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.行为激活策略', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.社会支持作用', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '慢性病确诊常引发否认、愤怒、讨价还价、抑郁到接受的阶段性反应，长期带病还带来病耻感、失控感与对未来的忧虑。调适核心在重建对疾病的合理认知：病不等于残，治疗是合作不是对抗；以行为激活维持日常活动与生活意义，借助家庭与病友支持降低孤独，必要时筛查抑郁并转介。',
    coreDefinition: '慢性病心理调适指帮助患者接纳带病状态、重建合理认知、维持社会功能与生活质量的心理干预过程。',
    safety: { note: '心理学知识学习，不构成诊疗建议；严重心理障碍须转介专科', prohibitions: ['【心理危机警戒】慢性病患者出现持续抑郁或自伤念头时须转介精神专科评估', '心理调适不能替代慢性病的规范药物治疗'] },
    learning: {
      knowledge: '核心概念：心理反应五阶段——否认、愤怒、讨价还价、抑郁、接受；认知重建——把「我完了」改写为「带病也能活得有质量」；行为激活——用可完成的日常活动对抗退缩。实践要点：共设小目标并肯定执行。注意：持续抑郁降低依从，应纳入复诊问询。',
      misjudgment: '把慢性病患者反复诉苦简单归为「想不开」，劝说几句就完。错：慢性病的情绪问题有明确心理病理基础，持续两周以上的低落须按抑郁线索评估转介。',
      reasoning: '同样的糖尿病，为什么有人积极控糖十年，有人确诊后彻底放弃？',
      feedback: '差别多在疾病信念：认为「反正治不好」者放弃，相信「我能管住它」者坚持，认知是依从的心理开关。',
      transfer: '一位确诊慢阻肺的老人整日卧床叹气，如何用行为激活设计第一步？',
    },
  },
  {
    id: 'pb42-ae-005', title: '心理·患者家属心理支持', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['家属支持', '照护者负担', '预期性哀伤', '信息支持', '情绪支持'],
    intent: '掌握家属心理需求的识别与信息支持、情绪支持的实施要点。',
    facts: [
      { field: 'theory.家属心理需求', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.照护者负担识别', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.信息支持方法', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.情绪支持技巧', sourceType: 'textbook', sourceTitle: '《医患沟通学》规划教材', status: 'verified' },
      { field: 'theory.哀伤反应识别', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '家属是患者最重要的支持系统，却也承受焦虑、疲惫与决策压力，慢性或重病照护中可能出现明显的照护者负担。医务人员应向家属提供清晰可理解的信息、倾听其情绪、引导其参与决策，并识别持续的哀伤、失眠等异常反应；临终情境中的家属还经历预期性哀伤，需要专门的陪伴与疏导。',
    coreDefinition: '患者家属心理支持指医务工作者对家属提供信息、情绪与决策支持，并识别照护负担与哀伤反应的照护过程。',
    safety: { note: '心理学知识学习，不构成诊疗建议；严重心理障碍须转介专科', prohibitions: ['【心理危机警戒】家属出现持续哀伤、失眠或轻生念头时须引导其接受专业心理帮助', '不得向家属隐瞒关键病情信息以「保护」，信息支持是家属知情权的一部分'] },
    learning: {
      knowledge: '核心概念：照护者负担——经济、时间、情绪多重消耗叠加；预期性哀伤——家属在患者去世前已开始哀伤；信息支持——病情进展与预后是家属焦虑的主要来源。实践要点：定期同步病情，用「您最近睡得怎么样」打开情绪出口。注意：家属分歧时帮其聚焦患者利益。',
      misjudgment: '以为「把精力都放患者身上」，家属情绪无暇顾及。错：家属情绪不稳会反向影响患者与治疗决策，支持家属就是支持患者。',
      reasoning: '一位家属每夜守在ICU外不肯离开，这种坚持背后可能是什么心理状态？',
      feedback: '可能是对失去的恐惧与愧疚的补偿，过度的自我牺牲提示需要引导休息与支持。',
      transfer: '肿瘤患者家属向医生打探「实话」，如何提供既不隐瞒又不压垮的信息？',
    },
  },
  {
    id: 'pb42-ae-006', title: '心理·医护人员职业倦怠与自我调适', category: 'theory', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['职业倦怠', '情感耗竭', '去人格化', '成就感降低', '自我调适'],
    intent: '掌握职业倦怠的三维表现、高发原因与自我调适的基本方法。',
    facts: [
      { field: 'theory.职业倦怠三维度', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.医护人员高发原因', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.自我调适方法', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.正念与放松训练', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.寻求专业帮助', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '职业倦怠以情感耗竭、去人格化与成就感降低为三要素：身心透支、对患者冷漠疏离、觉得工作没有意义。医护人员因高强度、倒班、生死压力与医患摩擦属高发人群。调适须双管齐下：个人层面规律作息、运动、正念练习、划定工作边界；组织层面合理排班、建立支持系统。持续数月不缓解宜寻求专业心理咨询。',
    coreDefinition: '职业倦怠是长期工作压力下的情感耗竭、去人格化与成就感降低综合征，需个人与组织共同应对。',
    safety: { note: '心理学知识学习，不构成诊疗建议；严重心理障碍须转介专科', prohibitions: ['倦怠明显的医护若伴抑郁或自伤念头须转介专业评估，不可硬扛', '不得将职业倦怠简单归咎于个人「抗压差」，组织因素须同步调整'] },
    learning: {
      knowledge: '核心概念：倦怠三维度——情感耗竭、去人格化、成就感降低；高发诱因——倒班、暴露于创伤事件、医患冲突累积。实践要点：下班划清界限、规律运动睡眠，创伤事件及时疏解，参加同事支持小组。注意：用酒精麻痹疲惫是危险信号，界限模糊时请专业人员评估。',
      misjudgment: '把「最近不想上班、对患者不耐烦」当成偷懒或矫情。错：这正是去人格化与耗竭的典型信号，越早干预越容易恢复，硬扛只会滑向抑郁。',
      reasoning: '同样是高强度工作，为什么有人倦怠有人仍保持热情？',
      feedback: '差别常在支持系统与意义感：被认可、能倾诉、有成长感者消耗得慢，倦怠是环境与个体的合力结果。',
      transfer: '连续三例抢救失败后你感到「麻木」，这属于正常还是预警信号？',
    },
  },
  {
    id: 'pb42-ae-007', title: '心理·睡眠障碍心理干预', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['失眠', '刺激控制', '睡眠限制', '睡眠卫生', '认知重构'],
    intent: '掌握失眠认知行为治疗（CBT-I）的核心技术及其心理机制。',
    facts: [
      { field: 'theory.失眠认知模型', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.刺激控制疗法', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.睡眠限制疗法', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.睡眠卫生教育', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.睡眠相关认知重构', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '失眠由对睡眠的灾难化担忧与不良行为维持：越怕睡不着越睡不着，卧床过久反而稀释睡意。CBT-I以刺激控制（床只与睡觉建立联系、无睡意离床）与睡眠限制（压缩卧床时间、提高睡眠效率）为核心，辅以睡眠卫生教育与认知重构，打破「睡不够8小时就要出事」的信念。心理干预是原发性失眠的一线选择。',
    coreDefinition: '睡眠障碍心理干预以认知行为治疗为核心，通过刺激控制、睡眠限制、睡眠卫生教育与认知重构打破失眠的恶性循环。',
    safety: { note: '心理学知识学习，不构成诊疗建议；严重心理障碍须转介专科', prohibitions: ['【心理危机警戒】失眠伴明显抑郁或自杀意念者须先转介精神专科，不得只做睡眠指导', '睡眠限制等干预须由专业人员实施，自行压缩卧床时间可能加重疲惫'] },
    learning: {
      knowledge: '核心概念：刺激控制——睡不着就离开床，让床重新成为睡眠信号；睡眠限制——压缩卧床时间、提高睡眠效率；认知重构——用「偶尔睡不好无妨」替换灾难化想法。实践要点：记录睡眠日记，作息固定，午睡不超20分钟。注意：先排除躯体疾病与药物因素。',
      misjudgment: '把安眠药当作失眠的首选长期方案，忽视心理干预。错：药物适合短期过渡，长期依赖有耐受与戒断问题，CBT-I疗效持久且无药物依赖。',
      reasoning: '为什么「早点上床等着睡」反而让失眠更顽固？',
      feedback: '长时间躺床把床与「清醒焦虑」绑定，睡眠驱力被稀释，刺激控制正是要切断这层错误联结。',
      transfer: '一位患者每天22点上床却凌晨2点才入睡，睡眠日记显示卧床9小时、睡眠5小时，如何开始干预？',
    },
  },
  {
    id: 'pb42-ae-008', title: '心理·疼痛的心理因素与管理', category: 'theory', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['疼痛心理', '疼痛灾难化', '认知行为干预', '放松训练', '多模式镇痛'],
    intent: '综合理解疼痛的主观性与心理社会影响因素，掌握慢性疼痛的心理管理思路。',
    facts: [
      { field: 'theory.疼痛主观性', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.情绪与认知影响', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.疼痛灾难化概念', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.认知行为干预', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
      { field: 'theory.心理与药物镇痛协同', sourceType: 'textbook', sourceTitle: '《医学心理学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '疼痛是主观感受，疼痛报告以患者自述为金标准，强度受注意力、情绪、预期与认知调制：焦虑抑郁放大疼痛，灾难化思维（「这痛会毁掉我」）预测更差的疼痛结局。慢性疼痛取多模式管理：药物与病因治疗之外，认知行为干预、放松训练、正念与分心技术改善疼痛体验，心理干预不否定疼痛的真实性。',
    coreDefinition: '疼痛的心理因素指情绪、注意力与认知对疼痛感受的调制作用；心理管理以认知行为技术与放松训练减轻疼痛相关痛苦。',
    safety: { note: '心理学知识学习，不构成诊疗建议；严重心理障碍须转介专科', prohibitions: ['疼痛心理管理不得替代病因诊治，不明原因疼痛须先排除器质性疾病', '不得以「心理作用」为由轻视患者的疼痛主诉，疼痛报告须以患者自述为准'] },
    learning: {
      knowledge: '核心概念：疼痛三成分——感觉辨别、情绪动机与认知评价；灾难化——对疼痛的放大与无助思虑，是慢性化强预测因子；放松与分心改变注意分配。实践要点：评估纳入情绪问卷；解释「心理技术减轻痛苦，不否定痛的真实」。注意：术前高焦虑者术后镇痛需求更大。',
      misjudgment: '疼痛找不到器质性依据就断言「是心理作用，不用管」。错：功能性与心因成分不等于「假痛」，患者体验真实，轻视标签会让患者求医无门、痛苦加剧。',
      reasoning: '相同手术、相同切口，为什么两位患者的术后疼痛评分相差悬殊？',
      feedback: '术前焦虑、疼痛预期与应对方式调制术后痛感，心理准备充分的患者评分更低、恢复更快。',
      transfer: '一位慢性腰痛患者CT只有轻度退变却痛到无法工作，如何从心理与躯体两面制定管理计划？',
    },
  },
];
