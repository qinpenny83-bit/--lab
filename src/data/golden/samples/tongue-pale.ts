// ============================================================
// 黄金样板 06 · 👅 淡白舌（DiagnosticKnowledge / 舌诊训练样板）
// 验证：舌象观察 → 描述 → 特征识别 → 对比 → 教学解释
// 只使用结构化教学描述；严禁「上传舌头→AI 诊断」
// ============================================================
import type { DiagnosticKnowledge } from '../../../types/canonicalKnowledgeSchema';

export const goldenPaleTongue: DiagnosticKnowledge = {
  identity: {
    id: 'gs-diagnostic-pale-tongue',
    canonicalId: 'ck-diagnostic-pale-tongue',
    type: 'diagnostic',
    domain: '中医诊断学',
    subdomain: '舌诊 · 舌色',
    chapter: '四诊 · 望舌',
    unit: '淡白舌',
    title: '淡白舌',
    aliases: ['淡舌', '舌色淡白'],
  },

  positioning: {
    learningStage: 'stage7',
    prerequisites: ['ck-yin-yang', 'ck-qi-blood'],
    difficulty: 2,
    importance: 'core',
    knowledgeLevel: 'A8',
    masteryTarget: {
      requiredDepth: 'A6',
      requiredCases: ['C1', 'C2', 'C3', 'C4'],
      transferRequired: true,
      masteryCriterion: '能区分淡红舌/淡白舌/红舌，能结合舌形（胖嫩齿痕 vs 瘦薄）判断偏气虚、阳虚还是气血两虚，且明确这是教学观察而非诊断。',
    },
  },

  core: {
    oneLine: '淡白舌是「舌色比正常浅、白多红少」，提示正气不足——气血亏虚或阳虚不能上荣于舌。',
    coreDefinition: '淡白舌指舌色比正常淡红舌浅淡、白多红少，主虚证、寒证，多见于气血两虚或阳虚之人。',
    structure: [
      '正常基准：淡红舌、薄白苔（气血调和）',
      '淡白舌：舌色较正常浅淡，白多红少',
      '辨证指向：虚证、寒证',
      '结合舌形细分：胖嫩+齿痕→阳虚/水湿；瘦薄→气血两虚',
    ],
    mechanism: '舌为心之苗，又为脾之外候，舌色赖气血与阳气上荣而成。气血充足则舌色淡红润泽；气血亏虚或阳气不足、推动无力时，舌失濡养，血色不充，便见淡白。所以「淡白」的本质是「上荣于舌的气血或阳气不足」。',
    keyPoints: [
      '先定「正常」淡红舌，才能识别「偏淡」',
      '淡白主虚、主寒，不是主热',
      '不能只看舌色，必须结合舌形（胖嫩/齿痕/瘦薄）判断偏气虚还是阳虚',
    ],
    distinctions: [
      { label: '淡白舌 vs 淡红舌', difference: '淡红舌为正常、气血调和；淡白舌白多红少、主虚寒', confusionPoint: '分不清「正常偏淡」与「病态淡白」' },
      { label: '淡白舌 vs 红舌', difference: '红舌舌色转深、主热证；淡白舌舌色转浅、主虚寒', confusionPoint: '把寒热方向辨反' },
    ],
    commonMisunderstandings: [
      '把舌色浅淡当成「上火」治，方向完全反了',
      '只看舌色就下结论，忽略舌形与舌苔的联合判断',
    ],
    counterIntuitivePoint: '「舌头颜色浅」恰恰不是「没病」，而是「正气不足」的信号——越淡越要想到「虚」而不是「不虚」。',
  },

  depthLayers: [
    { level: 'A1', content: '淡白舌就是舌头颜色比正常的「淡红」更浅、更白。' },
    { level: 'A2', content: '正常舌是淡红舌、薄白苔；淡白舌舌色浅淡、白多红少，主虚证、寒证。' },
    { level: 'A3', content: '用自己的话：舌头靠气血「上色」，气血不足或阳气不够，舌头就显白。' },
    { level: 'A4', content: '关联：舌为心之苗、脾之外候；淡白舌关联气血两虚、阳虚，与「气能生血、阳能温煦」相通。' },
    { level: 'A5', content: '比较：淡白（虚寒）↔ 红/绛（热）↔ 淡红（正常），三者是一条「舌色深浅 + 寒热虚实」的光谱。' },
    { level: 'A6', content: '辨析：看到一个「偏白」的舌头，还要看舌形——若胖嫩、边有齿痕，偏阳虚水湿；若瘦薄，偏气血两虚。只有「舌色 + 舌形 + 舌苔」三者合起来才敢判断。' },
    { level: 'A7', content: '迁移：把「舌色浅=气血/阳气不足」的规律，套到陌生情境（如判断一个人是否偏虚寒），仍应先看舌色深浅再结合整体。' },
    { level: 'A8', content: '综合「为什么」：为什么淡白主虚寒而不是热？因为舌色来自气血上荣——虚则不能充、寒则不能运，血色不达舌体即淡白。理解了「上荣」这条机制，就能把舌色和气血阴阳串起来。' },
  ],

  memory: {
    mustMemorize: [
      '正常舌 = 淡红舌、薄白苔。',
      '淡白舌 = 舌色较正常浅淡、白多红少，主虚证、寒证，多见于气血两虚、阳虚。',
    ],
    shouldMemorize: ['淡白而胖嫩、边有齿痕 → 阳虚/水湿内停；淡白而瘦薄 → 气血两虚。'],
    understandOnly: ['舌色成像的显微/血管机制只需理解「上荣不足」即可。'],
    applicationFirst: ['优先练「淡白舌 → 判虚寒方向」的观察判断，而非背条文。'],
    memoryTargets: [
      { id: 'pt-mem-1', text: '正常舌 = 淡红舌 + 薄白苔' },
      { id: 'pt-mem-2', text: '淡白舌主虚、主寒' },
      { id: 'pt-mem-3', text: '胖嫩齿痕=阳虚；瘦薄=气血两虚' },
    ],
    recallQuestions: [
      { id: 'pt-rq-1', question: '正常的舌色舌苔是什么？', answer: '淡红舌、薄白苔。' },
      { id: 'pt-rq-2', question: '淡白舌主什么证？', answer: '虚证、寒证。' },
      { id: 'pt-rq-3', question: '淡白而胖嫩、边有齿痕多见于什么？', answer: '阳虚、水湿内停。' },
    ],
    fillBlank: [
      { id: 'pt-fb-1', stem: '淡白舌主____证、____证。', answer: '虚 / 寒' },
      { id: 'pt-fb-2', stem: '正常舌为____舌、____苔。', answer: '淡红 / 薄白' },
    ],
    sequenceRecall: [
      {
        id: 'pt-seq-1',
        title: '舌色光谱（由浅到深）',
        orderedItems: ['淡白舌（虚寒）', '淡红舌（正常）', '红舌（热证）', '绛舌（热入营血/阴虚）'],
      },
    ],
    writtenRecall: [
      {
        id: 'pt-wr-1',
        prompt: '写一段：如何判断一个「偏白」的舌头属于哪种虚？',
        checklist: ['先对照正常淡红舌', '确认淡白', '再看舌形胖嫩/齿痕 or 瘦薄', '给出阳虚/气血两虚方向'],
      },
    ],
    confusingPairs: [
      { id: 'pt-cp-1', a: '淡白舌', b: '淡红舌', distinction: '淡白是病态、主虚寒；淡红是正常、气血调和。', mnemonic: '正常看淡红，偏白才是病' },
      { id: 'pt-cp-2', a: '淡白·胖嫩齿痕', b: '淡白·瘦薄', distinction: '胖嫩齿痕偏阳虚水湿；瘦薄偏气血两虚。', mnemonic: '胖是阳虚，瘦是两虚' },
    ],
    spacedReview: {
      intervalsDays: [1, 3, 7, 15, 30],
      triggerOnError: '把「淡白主虚寒」与「红舌主热」弄反，立即重做舌色光谱排序',
      reviewPrompt: '遮住答案，先默写正常舌，再写淡白舌主什么，最后区分胖嫩/瘦薄两种细分，对照找错。',
    },
  },

  classics: [
    {
      id: 'pt-ref-1',
      canon: '《黄帝内经》',
      chapter: '《灵枢 · 脉度》',
      originalText: '心气通于舌，心和则舌能知五味矣。',
      sourceCitation: '《灵枢 · 脉度》',
      verificationStatus: 'verified',
      factSource: {
        factId: 'pt-classic-maidu',
        field: 'classic.originalText',
        value: '心气通于舌，心和则舌能知五味矣',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 灵枢》',
        sourceChapter: '《脉度》',
        verificationStatus: 'verified',
        reviewerNote: '原「舌者，心之苗也」非《灵枢·经脉》原句，已改引《灵枢·脉度》原文；「舌为心之苗」作为后世常用说法归入传统解释。',
      },
      layers: [
        { layer: 1, layerName: '原文', content: '心气通于舌，心和则舌能知五味矣。' },
        { layer: 2, layerName: '词句', content: '心气通于舌：心与舌以经脉相连、心气上通于舌；心和：心气调和；知五味：辨知饮食滋味。' },
        { layer: 3, layerName: '传统解释', content: '后世由此发展出「舌为心之苗」的说法，谓舌为心之外候，可候脏腑气血之盛衰。此为传统注家引申，非《内经》原句。', source: '《灵枢·五阅五使》「舌者，心之官也」及后世舌诊通论（traditional_commentary）' },
        { layer: 4, layerName: '现代教学解释', content: '现代教学将舌诊概括为「察舌质候脏腑虚实、察舌苔候邪气浅深」。此为现代教学解释，非原文逐字替代。', source: '中医诊断学教学通识' },
      ],
      memorizationHint: '记「心气通于舌」五字为舌诊理论入口；「舌为心之苗」作通俗记忆辅以原文对照。',
    },
  ],

  cases: [
    {
      id: 'pt-c1',
      level: 'C1',
      title: '淡白舌主什么',
      scenario: '直接验证核心知识。',
      question: '舌色淡白、白多红少，主要提示什么？',
      options: [
        { id: 'a', text: '虚证、寒证（气血两虚或阳虚）', correct: true, why: '舌失气血/阳气上荣则淡白。' },
        { id: 'b', text: '实热证', correct: false, why: '实热表现为舌红，不是淡白。' },
        { id: 'c', text: '无异常', correct: false, why: '淡白是偏虚的异常表现。' },
      ],
      explanation: '淡白主虚、主寒；若要细分，再看舌形。',
      takeaway: '淡白 = 虚寒方向。',
      relatesTo: ['ck-diagnostic-pale-tongue'],
    },
    {
      id: 'pt-c2',
      level: 'C2',
      title: '淡白舌 vs 红舌',
      scenario: '两个舌色方向相反的人。',
      question: '一个舌色偏白、一个舌色偏红，两个方向分别提示什么？',
      options: [
        { id: 'a', text: '偏白主虚寒，偏红主热', correct: true, why: '舌色深浅对应寒热虚实方向。' },
        { id: 'b', text: '偏白主热，偏红主寒', correct: false, why: '方向反了。' },
        { id: 'c', text: '两者无意义', correct: false, why: '舌色是重要的望诊线索。' },
      ],
      explanation: '舌色是一条「寒热虚实」的标尺：淡白偏虚寒，红绛偏热。',
      takeaway: '舌色深浅 = 寒热标尺。',
      relatesTo: ['ck-diagnostic-pale-tongue'],
    },
    {
      id: 'pt-c3',
      level: 'C3',
      title: '胖嫩齿痕 vs 瘦薄',
      scenario: '两个都是淡白舌，但舌形不同。',
      question: '淡白舌「胖嫩、边有齿痕」与「舌体瘦薄」分别偏什么？',
      options: [
        { id: 'a', text: '胖嫩齿痕偏阳虚水湿；瘦薄偏气血两虚', correct: true, why: '阳虚水湿不化则舌胖齿痕；气血两虚不充则舌瘦薄。' },
        { id: 'b', text: '两者都是阳虚，无区别', correct: false, why: '舌形不同，病机有差异。' },
        { id: 'c', text: '两者都偏热', correct: false, why: '淡白绝不偏热。' },
      ],
      freeReasoning: {
        standardJudgment: '淡白 + 胖嫩齿痕 → 阳虚/水湿；淡白 + 瘦薄 → 气血两虚。',
        coreEvidence: ['阳虚不能化水 → 舌体胖大、边有齿痕', '气血两虚不能充养 → 舌体瘦薄'],
        commonPitfalls: ['只看舌色不看舌形，漏掉阳虚/气血两虚的细分'],
        requireCounterEvidence: true,
        requireRevision: false,
      },
      explanation: '「淡白」定方向（虚寒），「舌形」定细分（阳虚/气血两虚）。',
      takeaway: '舌色定方向，舌形定细分。',
      relatesTo: ['ck-diagnostic-pale-tongue'],
    },
    {
      id: 'pt-c4',
      level: 'C4',
      title: '陌生情境里的望舌',
      scenario: '一个完全不同的场景：你观察到一个「舌色明显偏浅、形体又偏胖」的陌生表现。',
      question: '凭「舌色浅 + 舌体偏胖」这一组观察，最合理的初步方向是？',
      options: [
        { id: 'a', text: '有热、有火', correct: false, why: '舌色浅偏虚寒，不是热。' },
        { id: 'b', text: '偏虚寒，可能是阳虚/水湿方向', correct: true, why: '舌色浅主虚寒、舌胖主湿，为阳虚水湿的初步方向。' },
        { id: 'c', text: '无法判断', correct: false, why: '虽不能确诊，但能给出初步方向。' },
      ],
      freeReasoning: {
        standardJudgment: '舌色浅（偏虚寒） + 舌体偏胖（主湿） → 阳虚/水湿的初步方向。',
        coreEvidence: ['舌色浅 = 气血/阳气上荣不足，偏虚寒', '舌体偏胖 = 水湿不化'],
        commonPitfalls: ['把「舌色浅」误当正常', '把「舌胖」误当热'],
        requireCounterEvidence: true,
        requireRevision: true,
      },
      explanation: '迁移到陌生观察：先看舌色（浅=虚寒），再看舌形（胖=湿），得出「阳虚/水湿」的初步方向。这正是教学要训练的观察链。',
      takeaway: '观察链：色→形→苔→初步方向。',
      relatesTo: ['ck-diagnostic-pale-tongue'],
    },
  ],

  safety: {
    educationOnly: true,
    noDiagnosis: true,
    prohibitions: ['严禁「上传舌头照片让 AI 诊断」', '本对象仅训练舌象观察与教学解释，不构成诊断'],
    disclaimers: ['舌诊为四诊之一，须结合问闻切综合判断', '不凭单一舌象下健康结论，有不适请就医'],
  },

  trainability: {
    supportedModes: ['blindCase', 'reversalCase'],
    funComesFrom: '趣味来自「舌色光谱排序」「色+形联合判断」的观察与推理，而非金币奖励。',
  },

  diagnostic: {
    target: '舌色（淡白舌）',
    dimensions: [
      { name: '舌色', normal: '淡红润泽', feature: '较正常浅淡、白多红少' },
      { name: '舌形', normal: '大小适中、无齿痕', feature: '多见胖嫩、边有齿痕（阳虚水湿）；或舌体瘦薄（气血两虚）' },
      { name: '舌苔', normal: '薄白', feature: '多为薄白苔（虚寒者苔薄白或白润）' },
    ],
    observationSteps: [
      '先看舌色：与正常「淡红」对照，判断是否偏浅偏白',
      '再看舌形：胖嫩？有齿痕？还是瘦薄？',
      '再看舌苔：苔色苔质的厚薄润燥',
      '三者结合，给出「虚寒方向」的初步教学判断',
    ],
    mediaNote: '本样板仅使用上述结构化文字描述进行教学，不调用任何真实舌象照片；如需图片演示，须使用有明确授权、标注来源的教学舌象图，严禁采集用户舌象进行「AI 诊断」。',
    teachingInterpretation: '淡白舌提示气血不足或阳虚不能上荣于舌，是「虚寒」方向的典型舌象；结合舌形胖嫩（阳虚水湿）或瘦薄（气血两虚）可进一步细分。此为教学解释，非临床诊断。',
  },

  factAudit: {
    facts: [
      {
        factId: 'pt-fact-classic',
        field: 'classic.originalText',
        value: '心气通于舌，心和则舌能知五味矣',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 灵枢》',
        sourceChapter: '《脉度》',
        verificationStatus: 'verified',
        reviewerNote: '「舌者，心之苗也」非《灵枢·经脉》原句，已改引《灵枢·脉度》原文；「舌为心之苗」归入传统解释（后世引申）。',
      },
      {
        factId: 'pt-fact-media',
        field: 'diagnostic.mediaNote',
        value: '仅结构化文字描述，无真实舌象照片；不采集用户舌象做 AI 诊断',
        sourceType: 'teaching_design',
        sourceTitle: '舌诊教学媒体规范',
        verificationStatus: 'teaching_inference',
        reviewerNote: '无可靠授权舌象图片时不提供 visualAssetId，不伪造舌象素材。',
      },
    ],
  },
};