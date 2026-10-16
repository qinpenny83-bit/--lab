// ============================================================
// 黄金样板 07 · 🩺 脾胃气虚综合医案（ClinicalKnowledge）
// 验证：诊断→病机→方药/治法→经典→对比→迁移
// 流程：先观察→自己判断→给证据→教练反馈→对照标准→修正→理论→再挑战
// ============================================================
import type { ClinicalKnowledge } from '../../../types/canonicalKnowledgeSchema';

export const goldenSpleenQiCase: ClinicalKnowledge = {
  identity: {
    id: 'gs-clinical-spleen-qi',
    canonicalId: 'ck-clinical-spleen-qi-deficiency',
    type: 'clinical',
    domain: '中医内科学 / 辨证',
    subdomain: '脾胃病 · 脾胃气虚证',
    chapter: '辨证之境 · 脾胃病证',
    unit: '脾胃气虚证',
    title: '脾胃气虚证综合医案',
    aliases: ['脾气虚证', '四君子汤证典型案'],
  },

  positioning: {
    learningStage: 'stage8',
    prerequisites: ['ck-yin-yang', 'ck-qi-blood', 'ck-formula-four-gentlemen', 'ck-herb-ginseng'],
    difficulty: 4,
    importance: 'core',
    knowledgeLevel: 'A8',
    masteryTarget: {
      requiredDepth: 'A6',
      requiredCases: ['C1', 'C2', 'C3', 'C4'],
      transferRequired: true,
      masteryCriterion: '能从一组食少便溏、面色萎白、气短乏力等症状，推出「脾胃气虚」病机与「益气健脾」治法，并能与脾胃虚寒、脾虚湿盛作区分。',
    },
  },

  core: {
    oneLine: '食少便溏 + 面色萎白 + 气短乏力，指向「脾胃气虚」——病机是运化失健，治法是益气健脾。',
    coreDefinition: '脾胃气虚证指脾胃之气不足、运化失健所表现的证候，以纳呆食少、食后腹胀、大便溏薄、气短乏力、面色萎白、舌淡苔白、脉虚弱为主要表现，治法为益气健脾（代表方四君子汤）。',
    structure: [
      '病位：脾、胃',
      '病性：气虚',
      '病机链：脾胃气虚 → 运化失健 → 纳少便溏；气血生化不足 → 面色萎白、气短乏力',
      '治法：益气健脾',
      '代表方：四君子汤',
    ],
    mechanism: '脾胃为后天之本、气血生化之源。脾气一虚，受纳与运化无力，水谷不化则食少、便溏；水湿不运则内生湿浊；气血生化不足则面色萎白、气短乏力、语声低微。舌淡苔白、脉虚弱，皆是气虚之象。治疗要「益气」以扶本、「健脾」以助运化、「渗湿」以防湿困，正是四君子汤的组方逻辑。',
    keyPoints: [
      '抓主症：食少 + 便溏 + 面色萎白 + 气短乏力',
      '辨关键：无明显寒象 → 不是虚寒（理中丸）；无明显水泻 → 不首选参苓白术散',
      '治法定调：益气健脾 = 补气 + 健脾 + 渗湿',
    ],
    distinctions: [
      { label: '脾胃气虚 vs 脾胃虚寒', difference: '虚寒多腹冷痛、喜温喜按、四肢不温，需温中（理中丸）；气虚无寒象，益气健脾即可', confusionPoint: '都「虚」，但有无寒象决定治法' },
      { label: '脾胃气虚 vs 脾虚湿盛', difference: '湿盛则泄泻更明显、水湿泛滥，参苓白术散渗湿止泻更强', confusionPoint: '都便溏，看湿的轻重' },
    ],
    commonMisunderstandings: [
      '看到「便溏」就当湿盛猛用渗利，忽略本在气虚',
      '只补气不健脾渗湿，导致「补而不效」',
    ],
    counterIntuitivePoint: '越虚越要先「补气」，但同时要「健脾渗湿」——因为气虚会生湿，湿又反过来困脾。只补不渗，气补不进去；这就是四君子汤非要放茯苓的原因。',
  },

  depthLayers: [
    { level: 'A1', content: '脾胃气虚证就是「脾胃没力气运化」，表现为不想吃、吃后胀、大便偏溏、气短乏力。' },
    { level: 'A2', content: '主症：食少、便溏、面色萎白、气短乏力、语声低微、舌淡苔白、脉虚弱；治法益气健脾。' },
    { level: 'A3', content: '用自己的话：脾胃是「化生气血」的后勤部，它一虚，吃进来的化不动、生成的气血也不足。' },
    { level: 'A4', content: '关联：脾胃为后天之本、气血生化之源；直接关联四君子汤（益气健脾）与「气能生血」。' },
    { level: 'A5', content: '比较：与脾胃虚寒（有寒象）、脾虚湿盛（湿象更重）并列，同属「脾虚」大类的不同偏重。' },
    { level: 'A6', content: '辨析：给一组症状，要能判断「有无寒象」——有腹冷痛、喜温喜按走虚寒（理中丸）；只有气虚便溏走四君子思路。' },
    { level: 'A7', content: '迁移：换一个「长期食少便溏、面色㿠白、乏力」的陌生对象，仍能落到「脾胃气虚 → 益气健脾」这条主线。' },
    { level: 'A8', content: '综合「为什么」：把「后天之本—运化—化源—气能生血」串成一条链，就能解释为什么脾胃气虚会同时出现消化差、乏力、面色差、便溏这一整组表现，以及为什么治法是「益气 + 健脾 + 渗湿」三位一体。' },
  ],

  memory: {
    mustMemorize: [
      '脾胃气虚主症：食少便溏、面色萎白、气短乏力、舌淡苔白、脉虚弱。',
      '治法：益气健脾；代表方：四君子汤。',
      '病机关键：脾胃为后天之本、气血生化之源。',
    ],
    shouldMemorize: ['与虚寒（理中丸）、湿盛（参苓白术散）的鉴别点。'],
    understandOnly: ['病机链的完整推演重在理解，不必逐字背。'],
    applicationFirst: ['优先练「症状组 → 病机 → 治法 → 选方」，而非背证型表。'],
    memoryTargets: [
      { id: 'pq-mem-1', text: '主症五件套：食少、便溏、面色萎白、气短乏力、舌淡脉弱' },
      { id: 'pq-mem-2', text: '治法：益气健脾' },
      { id: 'pq-mem-3', text: '代表方：四君子汤' },
    ],
    recallQuestions: [
      { id: 'pq-rq-1', question: '脾胃气虚证的病机核心是什么？', answer: '脾胃气虚，运化失健，气血生化不足。' },
      { id: 'pq-rq-2', question: '治法和代表方是什么？', answer: '益气健脾；四君子汤。' },
      { id: 'pq-rq-3', question: '如何与脾胃虚寒区分？', answer: '看有无寒象：虚寒有腹冷痛、喜温喜按，需温中。' },
    ],
    fillBlank: [
      { id: 'pq-fb-1', stem: '脾胃气虚证治法是益气____。', answer: '健脾' },
      { id: 'pq-fb-2', stem: '脾胃为后天之本、气血____之源。', answer: '生化' },
    ],
    sequenceRecall: [
      {
        id: 'pq-seq-1',
        title: '病机链（按因果顺序）',
        orderedItems: ['脾胃气虚', '运化失健', '纳少、便溏', '气血生化不足', '面色萎白、气短乏力'],
      },
    ],
    writtenRecall: [
      {
        id: 'pq-wr-1',
        prompt: '把脾胃气虚证的病机链完整写一遍，并说明治法如何对应病机。',
        checklist: ['气虚→运化失健', '水谷不化→食少便溏', '化源不足→面白乏力', '治法：益气健脾（四君子）'],
      },
    ],
    confusingPairs: [
      { id: 'pq-cp-1', a: '脾胃气虚', b: '脾胃虚寒', distinction: '虚寒有寒象（腹冷痛、喜温喜按），需温中；气虚无寒象。', mnemonic: '有寒用理中，无寒四君子' },
      { id: 'pq-cp-2', a: '脾胃气虚', b: '脾虚湿盛', distinction: '湿盛泄泻水湿更明显，渗湿止泻力更需（参苓白术散）。', mnemonic: '便溏重了加渗湿' },
    ],
    spacedReview: {
      intervalsDays: [1, 3, 7, 15, 30],
      triggerOnError: '「气虚 vs 虚寒」判断连续 2 次出错，重做病机链排序与鉴别的对比题',
      reviewPrompt: '遮住答案，先默写主症五件套，再写病机链，最后口述与虚寒/湿盛的鉴别，对照找错。',
    },
  },

  classics: [
    {
      id: 'pq-ref-1',
      canon: '《黄帝内经》',
      chapter: '《素问·阴阳应象大论》',
      originalText: '治病必求于本。',
      sourceCitation: '《素问·阴阳应象大论》（开篇收束句「阴阳者……治病必求于本」之末句）',
      verificationStatus: 'verified',
      factSource: {
        factId: 'pq-classic-qiu-ben',
        field: 'classic.originalText',
        value: '治病必求于本',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《阴阳应象大论》',
        verificationStatus: 'verified',
      },
      layers: [
        { layer: 1, layerName: '原文', content: '治病必求于本。' },
        { layer: 2, layerName: '词句', content: '本：根本，此处指辨证（分清寒热虚实）这一总纲。' },
        { layer: 3, layerName: '传统解释', content: '传统认为诊疾必先从根本（阴阳/辨证）入手。', source: '《素问》王冰注（取其大义）' },
        { layer: 4, layerName: '现代教学解释', content: '现代教学用于强调「先辨寒热虚实、再定治法」的辨证思维。此为现代教学解释，非原典逐字替代。', source: '中医诊断学教学通识' },
      ],
      memorizationHint: '五个字，但代表「先辨方向」的方法论。',
    },
    {
      id: 'pq-ref-2',
      canon: '《黄帝内经》',
      chapter: '《素问 · 灵兰秘典论》',
      originalText: '脾胃者，仓廪之官，五味出焉。',
      sourceCitation: '《素问·灵兰秘典论》（十二官原文之一）',
      verificationStatus: 'verified',
      factSource: {
        factId: 'pq-classic-canglin',
        field: 'classic.originalText',
        value: '脾胃者，仓廪之官，五味出焉',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《灵兰秘典论》',
        verificationStatus: 'verified',
        reviewerNote: '补全原文「五味出焉」，删除原「取其大义」含糊标注。',
      },
      layers: [
        { layer: 1, layerName: '原文', content: '脾胃者，仓廪之官，五味出焉。' },
        { layer: 2, layerName: '词句', content: '仓廪：储藏粮食的仓库，比喻脾胃主受纳运化水谷；五味出焉：饮食水谷的滋味由此化出。' },
        { layer: 3, layerName: '传统解释', content: '传统以「仓廪之官」喻脾胃为受纳、运化水谷的脏腑。', source: '《素问·灵兰秘典论》文义（traditional_commentary）' },
        { layer: 4, layerName: '现代教学解释', content: '现代教学将脾胃称为「后天之本」，与「仓廪之官」的经典比喻相承。此为现代教学解释。', source: '中医基础理论教学通识' },
      ],
      memorizationHint: '「仓廪之官」四字 = 脾胃管「吃饭消化」的比喻；「五味出焉」点明其化生水谷精微。',
    },
  ],

  cases: [
    {
      id: 'pq-c1',
      level: 'C1',
      title: '核心病机判断',
      scenario: '直接验证核心知识。',
      question: '「食少便溏、面色萎白、气短乏力」最核心的病机是？',
      options: [
        { id: 'a', text: '脾胃气虚，运化失健', correct: true, why: '主症全集指向脾气虚、运化无力。' },
        { id: 'b', text: '湿热中阻', correct: false, why: '湿热应见苔黄腻、身重，不是本组表现。' },
        { id: 'c', text: '肝气犯胃', correct: false, why: '肝气犯胃应见胁胀、嗳气吞酸，方向不同。' },
      ],
      explanation: '食少、便溏示运化失健，面白气短示气血生化不足，病机落在脾胃气虚。',
      takeaway: '主症全集锁病机。',
      relatesTo: ['ck-clinical-spleen-qi-deficiency'],
    },
    {
      id: 'pq-c2',
      level: 'C2',
      title: '气虚还是虚寒',
      scenario: '两案均有「食少便溏」，一案另见「腹中冷痛、喜温喜按、四肢不温」。',
      question: '有腹冷痛的那案，治法方向有何不同？',
      options: [
        { id: 'a', text: '仍是益气健脾，无区别', correct: false, why: '有了寒象，就要温中。' },
        { id: 'b', text: '要温中散寒（理中丸方向）', correct: true, why: '寒象明显，需在健脾基础上温中。' },
        { id: 'c', text: '改清湿热', correct: false, why: '方向完全反了。' },
      ],
      explanation: '有无寒象是分水岭：无寒=益气健脾，有寒=温中散寒。',
      takeaway: '辨寒象定治法。',
      relatesTo: ['ck-clinical-spleen-qi-deficiency', 'ck-formula-four-gentlemen'],
    },
    {
      id: 'pq-c3',
      level: 'C3',
      title: '湿盛加重怎么办',
      scenario: '变式：在原证基础上，泄泻明显、水样便、苔白腻更重。',
      question: '治法如何在益气健脾基础上调整？',
      options: [
        { id: 'a', text: '加强渗湿止泻（参苓白术散方向）', correct: true, why: '湿盛泄泻，需渗湿止泻之力更强。' },
        { id: 'b', text: '干脆不用健脾', correct: false, why: '本仍虚，健脾不可丢。' },
        { id: 'c', text: '改用攻下', correct: false, why: '虚人不可攻下。' },
      ],
      freeReasoning: {
        standardJudgment: '湿盛泄泻是在「气虚」底子上加重「湿象」，应在益气健脾基础上加强渗湿止泻（参苓白术散方向）。',
        coreEvidence: ['泄泻明显、水样便、苔白腻 = 湿象加重', '本仍虚，健脾底子不可丢'],
        commonPitfalls: ['因湿重而丢健脾、改用攻下', '仍只补气不渗湿，补而不效'],
        requireCounterEvidence: true,
        requireRevision: true,
      },
      explanation: '湿盛是在「气虚」底子上加重了「湿象」，故在益气健脾基础上加强渗湿。',
      takeaway: '看兼证定加减。',
      relatesTo: ['ck-clinical-spleen-qi-deficiency', 'ck-formula-four-gentlemen'],
    },
    {
      id: 'pq-c4',
      level: 'C4',
      title: '陌生对象的完整推理',
      scenario: '一个完全不同的对象：长期思虑、饮食不节，近半年食后腹胀、大便溏薄、面色㿠白、语声低微、易疲劳，舌淡苔白。',
      question: '给出你的三步：病机 → 治法 → 代表方方向。',
      options: [
        { id: 'a', text: '脾胃气虚 → 益气健脾 → 四君子汤方向', correct: true, why: '无寒象、只气虚便溏，标准脾胃气虚，落四君子思路。' },
        { id: 'b', text: '脾胃虚寒 → 温中散寒 → 理中丸方向', correct: false, why: '案中无腹冷痛、喜温等寒象。' },
        { id: 'c', text: '肝气郁结 → 疏肝解郁 → 逍遥散方向', correct: false, why: '主症是脾胃运化与气虚，不是肝郁。' },
      ],
      freeReasoning: {
        standardJudgment: '脾胃气虚 → 益气健脾 → 四君子汤方向（无寒象、只气虚便溏）。',
        coreEvidence: ['食后腹胀、大便溏薄、面色㿠白、语声低微、易疲劳 = 脾气虚、运化失健', '舌淡苔白、无寒象 → 非虚寒'],
        commonPitfalls: ['因「便溏」误判虚寒走理中丸', '因「思虑」误判肝郁走逍遥散'],
        requireCounterEvidence: true,
        requireRevision: true,
      },
      explanation: '换成陌生对象，仍走「主症 → 病机 → 治法 → 选方」主线：无寒象，落到脾胃气虚、益气健脾、四君子汤。',
      takeaway: '陌生案例走同一条推理链。',
      relatesTo: ['ck-clinical-spleen-qi-deficiency', 'ck-formula-four-gentlemen'],
    },
  ],

  safety: {
    educationOnly: true,
    noDiagnosis: true,
    prohibitions: ['本医案为教学推理样本，非真实病历、非诊疗依据', '不可据此自行诊断或照方抓药'],
    disclaimers: ['综合医案训练的是辨证思维，不构成任何临床诊疗能力', '有相关症状请及时就医，遵专业中医师辨证处方'],
  },

  trainability: {
    supportedModes: ['pathomechanismDetect', 'blindCase', 'reversalCase', 'formulaDiscrimination'],
    funComesFrom: '趣味来自「病机侦探」——从症状逐级推病机、再对照标准修正判断的完整推理，而非徽章数值。',
  },

  factAudit: {
    facts: [
      {
        factId: 'pq-fact-classic',
        field: 'classics[].originalText',
        value: '治病必求于本 / 脾胃者，仓廪之官，五味出焉',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《阴阳应象大论》《灵兰秘典论》',
        verificationStatus: 'verified',
        reviewerNote: '两处经典均逐字核验，「仓廪之官」补全「五味出焉」，删除原「取其大义」标注。',
      },
    ],
  },

  walkthrough: {
    stages: [
      { order: 1, label: '先观察', prompt: '先不急判断。把「食少、便溏、面色萎白、气短乏力、语声低微、舌淡、脉细弱」这些信息全部收集齐，看看一共有几条线索指向「虚」' },
      { order: 2, label: '自己判断', prompt: '先给出你此刻的初步假设：这个人的病位在哪、病性是什么？' },
      { order: 3, label: '给证据', prompt: '为你的假设至少找两条支持证据，并主动问一句：有没有哪条线索不支持、甚至推翻它（比如有没有「热」的证据）？' },
      { order: 4, label: '教练反馈', prompt: '教练提示：本组症状里没有「热象」也没有「明显寒痛」，最突出的是「气不足 + 运化无力」。' },
      { order: 5, label: '对照标准', prompt: '对照标准：脾胃气虚证 = 食少便溏 + 面色萎白 + 气短乏力 + 舌淡苔白脉虚弱，无明显寒象。' },
      { order: 6, label: '修正', prompt: '若你之前的判断偏向了「湿热」或「虚寒」，请据此修正为「脾胃气虚、运化失健」。' },
      { order: 7, label: '理论', prompt: '收束理论：脾胃为后天之本，气虚则运化失健、化源不足，故益气健脾（四君子汤：补气+健脾+渗湿）。' },
      { order: 8, label: '再挑战', prompt: '换一个陌生对象重做一遍，看能否独立走出「病机→治法→选方」三步。' },
    ],
  },

  caseSession: {
    attempts: [],
    referenceAttempt: {
      hypothesis: '脾胃气虚，运化失健（病位脾胃、病性气虚）',
      evidence: ['食少、便溏 —— 运化失健', '面色萎白、气短乏力 —— 气血生化不足'],
      counterEvidence: ['若出现腹冷痛、喜温喜按、四肢不温，则改判脾胃虚寒（而非单纯气虚）'],
      confidence: 0.8,
      revisionReason: '本组症状无寒象、无热象，故排除「虚寒/湿热」，修正为「气虚」',
      finalJudgment: '脾胃气虚证 → 治法益气健脾（四君子汤方向）',
    },
    note: '本样板为静态教学对象，attempts 为空数组，不伪造任何「学习者已完成推理」记录；运行时由系统在用户输入后追加。referenceAttempt 为教学示范推理链，非真实学习者记录。',
  },
};