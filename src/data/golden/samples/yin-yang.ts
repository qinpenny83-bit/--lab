// ============================================================
// 黄金样板 01 · ☯️ 阴阳（TheoryKnowledge）
// 验证：理论知识深度 —— 概念→关系→属性→相对性→对立统一→
//       消长转化→辨析→案例→经典→背诵→迁移
// ============================================================
import type { TheoryKnowledge } from '../../../types/canonicalKnowledgeSchema';

export const goldenYinYang: TheoryKnowledge = {
  identity: {
    id: 'gs-yin-yang',
    canonicalId: 'ck-yin-yang',
    type: 'theory',
    domain: '中医基础理论',
    subdomain: '阴阳学说',
    chapter: '第一境 · 阴阳',
    unit: '阴阳是什么',
    title: '阴阳',
    aliases: ['阴阳学说', '阴阳理论', '对立统一'],
  },

  positioning: {
    learningStage: 'stage1',
    prerequisites: [],
    difficulty: 1,
    importance: 'core',
    knowledgeLevel: 'A8',
    masteryTarget: {
      requiredDepth: 'A6',
      requiredCases: ['C1', 'C2', 'C3', 'C4'],
      transferRequired: true,
      masteryCriterion: '能区分「阴阳的相对性」与「怕冷≠阴」，并能在昼夜、四季、药性等陌生情境中判断阴阳属性。',
    },
  },

  core: {
    oneLine: '阴阳不是两个固定的框，而是中医用来「比较」一对相互关联、相反相成现象的总纲。',
    coreDefinition: '阴阳是对自然界相互关联的某些事物或现象对立双方属性的概括，既可代表两个相互对立的事物，也可代表同一事物内部相互对立的两个方面。',
    structure: [
      '本义：山之向阳面为阳、背阴面为阴',
      '引申：凡明亮、温热、向上、向外、运动、亢进者属阳；晦暗、寒凉、向下、向内、静止、衰退者属阴',
      '两个不是两个「实体」，而是一对「关系」',
      '四组关系：对立制约、互根互用、消长平衡、相互转化',
    ],
    mechanism: '阴阳之所以是总纲，是因为它抽象出了「关系」本身：任何一对相反相成的属性，都可以放进阴阳这一框架里比较。寒与热、表与里、虚与实、气与血，都是阴阳在不同层面的具体展开。所以「治病必求于本」中的本，首先就是分清阴阳这一对总关系。',
    keyPoints: [
      '阴阳是对「对立双方属性」的概括，不是对单个事物的绝对标签',
      '判断阴阳必须先确定「跟谁比」，参照物变了阴阳可能互换',
      '阳化气、阴成形：功能与物质的相对关系',
    ],
    distinctions: [
      { label: '阴阳 vs 寒热', difference: '寒热是阴阳在「温度方向」上的具体表现，阴阳是更上位的总范畴', confusionPoint: '把「属阴」直接等同于「是寒性」' },
      { label: '阴阳的绝对 vs 相对', difference: '同一对关系的阴阳属性固定（绝对），但同一事物的阴阳属性随参照物而变（相对）', confusionPoint: '认为一个东西被贴了「阴」的标签就永远是阴' },
    ],
    commonMisunderstandings: [
      '把阴阳当成两种实体的「物质」',
      '认为怕冷就一定属阴、发热就一定属阳，忽略整体',
      '把「相对性」误解为「随便怎么定都行」',
    ],
    counterIntuitivePoint: '同一个人，白天精神、晚上困倦——「同一个身体」本身就既有阳（功能活跃）又有阴（物质静养），阴阳不是非此即彼的二分，而是同一事物内部的两面。',
  },

  depthLayers: [
    { level: 'A1', content: '阴阳二字本义是「阳光的向背」：朝太阳的一面是阳，背太阳的一面是阴。' },
    { level: 'A2', content: '中医把阴阳借用来概括：相互关联的事物或现象中，对立双方各自的属性。明亮、温热、向上、向外、运动、亢进属阳；晦暗、寒凉、向下、向内、静止、衰退属阴。' },
    { level: 'A3', content: '你可以把阴阳理解为「一套用来做比较的通用标尺」：只要有「一对相反又相成」的现象，就能用阴阳来框定谁偏动、谁偏静。' },
    { level: 'A4', content: '阴阳是总纲，下面派生出一系列更具体的对立：寒热（温度方向）、表里（病位深浅）、虚实（正气与邪气）、气血（物质与功能）。它们都是阴阳在不同层面的展开。' },
    { level: 'A5', content: '阴阳与寒热不是一回事：寒热只谈「温度的方向」，而阴阳还涵盖位置、动静、功能与物质等多维比较。见到「属阴」不能直接翻译成「是寒性」。' },
    { level: 'A6', content: '放进案例判断：一个人「怕冷」，能不能直接判为阴证？不能——还要看他是不是因为外感风寒（表寒）、是虚寒还是实寒、有没有发热反驳。阴阳判断必须建立在「比较 + 整体」上，而不是单个症状贴标签。' },
    { level: 'A7', content: '迁移：昼夜（昼为阳、夜为阴）、四季（春夏为阳、秋冬为阴）、药物五味（辛甘发散为阳、酸苦涌泄为阴）、人体上下（上为阳、下为阴）——换一个完全不同的情境，依然能用同一套关系去判断。' },
    { level: 'A8', content: '综合「为什么」：阴阳之所以能当总纲，是因为四组关系——对立制约（一方制约另一方）、互根互用（无阴则阳无以生）、消长平衡（此消彼长维持平衡）、相互转化（寒极生热、热极生寒）——把「变化」本身抽象成了一对可推理的关系。' },
  ],

  memory: {
    mustMemorize: [
      '《素问·阴阳应象大论》：「阴阳者，天地之道也……治病必求于本。」',
      '「阴静阳躁，阳生阴长，阳杀阴藏，阳化气，阴成形。」',
    ],
    shouldMemorize: ['明亮温热向上向外运动亢进属阳；晦暗寒凉向下向内静止衰退属阴。'],
    understandOnly: ['四组关系的精细展开（互根/消长/转化）重在理解，不强求逐字背。'],
    applicationFirst: ['真正要练的是「给定一对现象能判断阴阳」，而不是背概念。'],
    memoryTargets: [
      { id: 'yy-mem-1', text: '阴阳的判定基准（属阳/属阴各 6 个方向）' },
      { id: 'yy-mem-2', text: '「治病必求于本」中「本」指辨别阴阳这一总关系' },
      { id: 'yy-mem-3', text: '「阳化气，阴成形」的功能—物质对应' },
    ],
    recallQuestions: [
      { id: 'yy-rq-1', question: '阴阳的本义是什么？', answer: '阳光的向背（向日为阳、背日为阴）。' },
      { id: 'yy-rq-2', question: '判断阴阳之前必须先问什么？', answer: '跟谁比（参照物/比较对象是什么）。' },
      { id: 'yy-rq-3', question: '「阳化气，阴成形」说的是什么关系？', answer: '阳主功能、气化；阴主物质、成形。' },
    ],
    fillBlank: [
      { id: 'yy-fb-1', stem: '阴阳者，天地之____也，万物之纲纪。', answer: '道' },
      { id: 'yy-fb-2', stem: '阴静阳躁，阳生阴长，阳杀阴藏，阳化____，阴成形。', answer: '气' },
    ],
    sequenceRecall: [
      {
        id: 'yy-seq-1',
        title: '阴阳四组关系',
        orderedItems: ['对立制约', '互根互用', '消长平衡', '相互转化'],
      },
    ],
    writtenRecall: [
      {
        id: 'yy-wr-1',
        prompt: '用自己的话写一段：什么是阴阳，为什么它是中医的总纲？',
        checklist: ['先说它是对「对立双方属性」的概括', '再说判断要先定参照', '最后落到四组关系或「治病必求于本」'],
      },
    ],
    confusingPairs: [
      { id: 'yy-cp-1', a: '阴阳相对性', b: '阴阳绝对性', distinction: '同一关系的阴阳属性固定（绝对）；同一事物的阴阳属性随参照物而变（相对）。', mnemonic: '关系定死，事物随人、跟着比' },
      { id: 'yy-cp-2', a: '阳', b: '热', distinction: '阳是总范畴，热只是阳在温度上的表现之一。', mnemonic: '热只是阳的一小支' },
    ],
    spacedReview: {
      intervalsDays: [1, 3, 7, 15, 30],
      triggerOnError: '连续 2 次在「怕冷是否属阴」类辨析题答错，提前进入复习',
      reviewPrompt: '遮住答案，先回忆「阴阳判定基准」和「治病必求于本」的原文，再写一遍「阳化气阴成形」的含义，最后对照找错。',
    },
  },

  classics: [
    {
      id: 'yy-ref-1',
      canon: '《黄帝内经》',
      chapter: '《素问·阴阳应象大论》',
      originalText: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也，治病必求于本。',
      sourceCitation: '《素问·阴阳应象大论》篇首',
      verificationStatus: 'verified',
      factSource: {
        factId: 'yy-classic-da-bian',
        field: 'classic.originalText',
        value: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也，治病必求于本',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《阴阳应象大论》',
        verificationStatus: 'verified',
      },
      layers: [
        { layer: 1, layerName: '原文', content: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也，治病必求于本。' },
        { layer: 2, layerName: '词句', content: '道：根本规律；纲纪：纲领、总要；变化之父母：变化的根源；生杀之本始：生与灭的起始；神明：精神生命活动，一说为自然变化之玄妙；府：所在之处。' },
        { layer: 3, layerName: '传统解释', content: '传统注家（如王冰等）认为：阴阳贯穿天地、统摄万物，是变化生灭的总根源，诊病必须从阴阳这一根本入手。', source: '《素问》王冰注（traditional_commentary）' },
        { layer: 4, layerName: '现代教学解释', content: '现代教学将这段话理解为：阴阳是把「对立统一规律」用于说明生命与疾病的最高概括；「本」不是某个具体器官，而是先分清证候的阴阳属性。此为现代教学解释，是对原文大义的现代转译，不等于原典原意的直接替代。' },
      ],
      memorizationHint: '抓住「道—纲纪—父母—本始—府」五个排比，先背后四个字的节奏。',
    },
  ],

  cases: [
    {
      id: 'yy-c1',
      level: 'C1',
      title: '判断昼夜',
      scenario: '白天与黑夜，一个光明、温热、活跃，一个黑暗、寒凉、安静。',
      question: '昼与夜，哪个属阳，哪个属阴？判断依据是什么？',
      options: [
        { id: 'a', text: '昼为阳，夜为阴', correct: true, why: '昼光明、温热、活跃，符合阳的特性；夜黑暗、寒凉、安静，符合阴。' },
        { id: 'b', text: '昼为阴，夜为阳', correct: false, why: '把方向搞反了，寒凉安静属阴而非阳。' },
        { id: 'c', text: '昼夜与阴阳无关', correct: false, why: '昼夜是最经典的阴阳对照，属于阴阳的典型应用。' },
      ],
      explanation: '先把「昼」的特征（亮、温、动）列出来，再对照阴阳判定基准，逐条落到阳。',
      takeaway: '判断阴阳 = 先列特征，再对照基准。',
      relatesTo: ['ck-yin-yang'],
    },
    {
      id: 'yy-c2',
      level: 'C2',
      title: '怕冷就一定属阴吗',
      scenario: '一个人说自己「很怕冷」。',
      question: '仅凭「怕冷」，能否直接断定他证候属阴？为什么？',
      options: [
        { id: 'a', text: '能，怕冷就是阴证', correct: false, why: '单个症状不能贴标签，忽略了整体比较。' },
        { id: 'b', text: '不能，还要看有没有发热、是虚是实、是表是里', correct: true, why: '阴阳判断要建立在「比较 + 整体」上，怕冷可能是外感表寒，也可能是阳虚里寒，方向完全不同。' },
        { id: 'c', text: '能不能判断无所谓', correct: false, why: '这正是一开始就要建立的关键辨析，不能跳过。' },
      ],
      explanation: '「怕冷」只是寒（温度方向）的表现，而寒还要进一步分表寒/里寒、虚/实。这就是「阴阳是总纲、寒热是具体」的辨析。',
      takeaway: '一个症状 ≠ 一个阴阳属性，先比较、再看整体。',
      relatesTo: ['ck-yin-yang', 'ck-deficiency-excess'],
    },
    {
      id: 'yy-c3',
      level: 'C3',
      title: '同一个人的两手',
      scenario: '同一个人在冬天，会出现「后背发凉」但同时「手心出汗发热」。',
      question: '这个人是「属阴」还是「属阳」？',
      options: [
        { id: 'a', text: '他属阴，因为怕冷', correct: false, why: '只取了一个局部表现。' },
        { id: 'b', text: '他属阳，因为出汗发热', correct: false, why: '又只取了另一个局部表现。' },
        { id: 'c', text: '同一人内部可同时有阴有阳，需看整体偏盛偏衰', correct: true, why: '阴阳是同一事物内部的两面，个体可以「上热下寒」或「并见寒热」，要看整体失衡方向。' },
      ],
      freeReasoning: {
        standardJudgment: '同一对象内部可并见阴阳（后背发凉 + 手心发热），不能给整个人贴单一标签，要看整体失衡方向。',
        coreEvidence: ['阴阳是对同一事物内部对立两面的概括，可同时并存', '局部寒热并存说明「只取一个症状」会误判'],
        commonPitfalls: ['只取一个局部表现就给整体定性', '把「相对性」误解为「随便怎么定都行」'],
        requireCounterEvidence: true,
        requireRevision: false,
      },
      explanation: '这就是「同一个东西也能有阴有阳」的变式：不能指望一个人只有一种属性，要看局部之间的关系与整体方向。',
      takeaway: '阴阳可并见于同一个体，判断要看整体失衡方向。',
      relatesTo: ['ck-yin-yang'],
    },
    {
      id: 'yy-c4',
      level: 'C4',
      title: '冬天井水为何「冒热气」',
      scenario: '一个完全陌生的观察：大冬天，井里的水表面竟升起白气，看上去像「热」的。',
      question: '用阴阳关系解释：为什么井水「看似热」其实是相对恒温、与外界形成对比？',
      options: [
        { id: 'a', text: '井水确实变热了，属阳', correct: false, why: '被表面现象迷惑，忽略了「比较对象」。' },
        { id: 'b', text: '井水本身不热，是它相对外界冷空气显得「温」，属相对关系', correct: true, why: '阴阳判断依赖参照：井水温度相对外界冷的空气显「温」，是「寒热」在相对关系里的体现。' },
        { id: 'c', text: '这与阴阳无关', correct: false, why: '这正是「相对性」在陌生情境里的迁移。' },
      ],
      freeReasoning: {
        standardJudgment: '井水并非真的变热，而是相对外界冷空气显得「温」，是阴阳相对性在寒热上的体现。',
        coreEvidence: ['井水温度未变，是外界空气变冷制造了温差', '阴阳属性依赖参照物，参照物变了结论可能改变'],
        commonPitfalls: ['被「冒热气」的表面现象迷惑，直接判属阳', '忘记先找参照物就下结论'],
        requireCounterEvidence: true,
        requireRevision: true,
      },
      explanation: '换成「井水」这个陌生场景，关键是先找参照物：井水没变，是空气变冷了，两者的温差让它「显得」热——阴阳的相对性在陌生情境下依然成立。',
      takeaway: '换再陌生的情境，先问「参照是什么」。',
      relatesTo: ['ck-yin-yang'],
    },
  ],

  safety: {
    educationOnly: true,
    noDiagnosis: true,
    prohibitions: ['不可凭「一侧属阴/属阳」自行判断自己或他人健康', '本对象为思维训练，不构成任何养生或调理建议'],
    disclaimers: ['阴阳辨别的学习不等同于临床辨证能力', '任何具体症状请咨询专业中医师'],
  },

  trainability: {
    supportedModes: ['blindCase', 'reversalCase', 'classicDecode'],
    funComesFrom: '趣味来自「怕冷≠阴」「冬天井水冒热气」这类反直觉判断——比较、反转、迁移带来的「原来如此」，而非金币或徽章。',
  },

  factAudit: {
    facts: [
      {
        factId: 'yy-fact-classic',
        field: 'classic.originalText',
        value: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也，治病必求于本',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《阴阳应象大论》',
        verificationStatus: 'verified',
        reviewerNote: '开篇原文逐字核验，「本」承接上文五句排比指阴阳总纲。',
      },
      {
        factId: 'yy-fact-definition',
        field: 'core.coreDefinition',
        value: '阴阳是对自然界相互关联的事物或现象对立双方属性的概括',
        sourceType: 'textbook',
        sourceTitle: '《中医基础理论》（规划教材，阴阳学说章）',
        verificationStatus: 'verified',
      },
    ],
  },
};