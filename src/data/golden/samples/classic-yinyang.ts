// ============================================================
// 黄金样板 05 · 📜 《素问·阴阳应象大论》开篇（ClassicKnowledge）
// 验证：原文→出处→医古文→传统解释→现代教学解释→背诵→迁移
// ============================================================
import type { ClassicKnowledge } from '../../../types/canonicalKnowledgeSchema';

export const goldenYinYangClassic: ClassicKnowledge = {
  identity: {
    id: 'gs-classic-yinyang',
    canonicalId: 'ck-classic-yinyang-dao',
    type: 'classic',
    domain: '经典',
    subdomain: '《黄帝内经》',
    chapter: '《素问 · 阴阳应象大论》',
    unit: '「治病必求于本」',
    title: '阴阳者，天地之道也',
    aliases: ['治病必求于本', '阴阳应象大论开篇'],
  },

  positioning: {
    learningStage: 'stage8',
    prerequisites: ['ck-yin-yang'],
    difficulty: 2,
    importance: 'core',
    knowledgeLevel: 'A8',
    masteryTarget: {
      requiredDepth: 'A6',
      requiredCases: ['C1', 'C2', 'C3', 'C4'],
      transferRequired: true,
      masteryCriterion: '能背诵并逐字理解开篇，能说清「本=阴阳」而非某一具体病位，并能与《天元纪大论》同句区分。',
    },
  },

  core: {
    oneLine: '「治病必求于本」的「本」，不是某个器官，而是先分清阴阳这一总关系。',
    coreDefinition: '《素问·阴阳应象大论》开篇指出：阴阳是天地万物变化生灭的根本规律，所以诊治疾病必须从辨别阴阳这一根本入手。',
    structure: [
      '五个排比：道（规律）→ 纲纪（纲领）→ 变化之父母（变化根源）→ 生杀之本始（生灭起始）→ 神明之府（神之所藏）',
      '一句收束：治病必求于本',
      '「本」即上文的「阴阳」，是总纲而非具体病位',
    ],
    mechanism: '为什么古人开篇就讲「阴阳」而不是某味药、某个症状？因为阴阳概括的是「关系」本身：一切病变都是正邪、寒热、虚实、表里这些对立关系的失衡。只有先辨清这一对总关系，后面的辨证论治才有着力点。所以「治病必求于本」是方法论的定调。',
    keyPoints: [
      '本 = 阴阳这一总纲领',
      '五个排比层层递进，指向「根本规律」',
      '这是方法论宣言，不是具体治法',
    ],
    distinctions: [
      { label: '《阴阳应象大论》 vs 《天元纪大论》', difference: '两篇均有「天地之道也」句，但「治病必求于本」只见于《阴阳应象大论》', confusionPoint: '同句异篇，须凭后半「治病必求于本」区分' },
      { label: '「本」=阴阳 vs 「本」=某个脏腑', difference: '「本」指阴阳，不是肾、脾等某一具体脏腑', confusionPoint: '把「本」误解为某个器官' },
    ],
    commonMisunderstandings: [
      '把「治病必求于本」的「本」理解为「治本除根」的字面义',
      '把这段话当成某味药/某穴的依据来引用',
    ],
    counterIntuitivePoint: '谈「治病」却不先说「吃什么药」，而是先说「分阴阳」——因为方向分不清，药再对也可能是错的。这就是「先定方向、再谈手段」。',
  },

  depthLayers: [
    { level: 'A1', content: '这是《黄帝内经》里最著名的开篇之一：「阴阳者，天地之道也……治病必求于本。」' },
    { level: 'A2', content: '原文讲：阴阳是天地万物的根本规律，是变化的根源，诊治疾病必须抓住这个「本」。' },
    { level: 'A3', content: '用自己的话：阴阳是给一切「对立关系」定性的总法子，治病要先分清这对关系。' },
    { level: 'A4', content: '关联：这段话是「辨证首辨阴阳」的理论源头，也是「阴阳为总纲」的最早文字依据。' },
    { level: 'A5', content: '比较：《天元纪大论》也有「天地之道也」，但「治病必求于本」是《阴阳应象大论》独有的收束句。' },
    { level: 'A6', content: '辨析：「本」是阴阳，还是某个脏腑？——是阴阳。若把「本」理解成肾、脾等具体器官，就偏离了原文「先辨总纲」的方法论。' },
    { level: 'A7', content: '迁移：把「先辨总纲再谈方法」套到任何一个陌生问题——先分清寒热虚实方向，再谈具体处理，思路都是「必求于本」。' },
    { level: 'A8', content: '综合「为什么」：这段为什么能统领全篇？因为它把「阴阳」从自然规律提升为「诊治必须先抓的根本」，后面所有「积阳为天、积阴为地……阳化气、阴成形」都是从这一总纲展开的。' },
  ],

  memory: {
    mustMemorize: [
      '「阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。治病必求于本。」',
      '「阴静阳躁，阳生阴长，阳杀阴藏。阳化气，阴成形。」',
    ],
    shouldMemorize: ['出处：《素问·阴阳应象大论》篇首。'],
    understandOnly: ['「神明之府」的历代歧义只需了解有「精神生命活动」与「自然玄妙变化」两说。'],
    applicationFirst: ['优先练「本=阴阳」的应用判断，而非机械背全文。'],
    memoryTargets: [
      { id: 'yj-mem-1', text: '五个排比：道 / 纲纪 / 变化之父母 / 生杀之本始 / 神明之府' },
      { id: 'yj-mem-2', text: '收束句：治病必求于本' },
      { id: 'yj-mem-3', text: '「阳化气，阴成形」的功能—物质对应' },
    ],
    recallQuestions: [
      { id: 'yj-rq-1', question: '「治病必求于本」的「本」指什么？', answer: '阴阳（这一总纲），不是某个具体脏腑。' },
      { id: 'yj-rq-2', question: '开篇的五个排比从「道」到「神明之府」说明了什么？', answer: '把阴阳逐级定为天地万物的根本规律。' },
      { id: 'yj-rq-3', question: '「神明之府」一般解作什么？', answer: '神（精神生命活动）所藏之处；一说为自然变化之玄妙所在。' },
    ],
    fillBlank: [
      { id: 'yj-fb-1', stem: '阴阳者，天地之____也，万物之纲纪。', answer: '道' },
      { id: 'yj-fb-2', stem: '治病必求于____。', answer: '本' },
      { id: 'yj-fb-3', stem: '阴静阳躁，阳生阴长，阳杀阴藏，阳化____，阴成形。', answer: '气' },
    ],
    sequenceRecall: [
      {
        id: 'yj-seq-1',
        title: '开篇五个排比（按顺序）',
        orderedItems: ['天地之道', '万物之纲纪', '变化之父母', '生杀之本始', '神明之府'],
      },
    ],
    writtenRecall: [
      {
        id: 'yj-wr-1',
        prompt: '默写「阴阳者……治病必求于本」一句，并解释「本」的含义。',
        checklist: ['原文完整', '点明「本」=阴阳', '说明不是具体脏腑'],
      },
    ],
    confusingPairs: [
      { id: 'yj-cp-1', a: '《阴阳应象大论》句', b: '《天元纪大论》句', distinction: '「治病必求于本」只见于《阴阳应象大论》。', mnemonic: '有「求于本」才是应象大论' },
      { id: 'yj-cp-2', a: '本 = 阴阳', b: '本 = 某一脏', distinction: '「本」是阴阳总纲，不是肾脾等具体脏器。', mnemonic: '本是总纲不是器官' },
    ],
    spacedReview: {
      intervalsDays: [1, 3, 7, 15, 30],
      triggerOnError: '默写错字或把「本」讲成具体脏腑，立即重背',
      reviewPrompt: '遮住原文，先背五个排比，再背「治病必求于本」，随后默写并对照，最后口述「本」的含义。',
    },
  },

  classics: [
    {
      id: 'yj-ref-1',
      canon: '《黄帝内经》',
      chapter: '《素问·阴阳应象大论》',
      originalText: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。治病必求于本。',
      sourceCitation: '《素问·阴阳应象大论》篇首（《补注释文黄帝内经素问》王冰注本）',
      verificationStatus: 'verified',
      factSource: {
        factId: 'yj-classic-da-bian',
        field: 'classic.originalText',
        value: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。治病必求于本',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《阴阳应象大论》',
        verificationStatus: 'verified',
        reviewerNote: '「治病必求于本」只见于《阴阳应象大论》，与《天元纪大论》同句须以后半区分。',
      },
      layers: [
        { layer: 1, layerName: '原文', content: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。治病必求于本。' },
        { layer: 2, layerName: '词句', content: '道：根本规律；纲纪：纲领、总要；变化之父母：变化的根源；生杀之本始：生长与消亡的起始；神明之府：神所藏之处（一说自然变化之玄妙所在）；本：根本（指阴阳）。' },
        { layer: 3, layerName: '传统解释', content: '王冰注本将「神明」解为生命精神之所，谓治病当先察阴阳。此为传统注家的大义。', source: '《素问》王冰注' },
        { layer: 4, layerName: '现代教学解释', content: '现代教学把「治病必求于本」概括为「辨证首辨阴阳」，即先分清证候的阴阳属性。此为现代教学解释，是对原文方法论的现代转述，不等于原典原意的直接替代。', source: '中医基础理论/内经选读教学通识' },
      ],
      memorizationHint: '把五个排比当成「五级台阶」：道→纲纪→父母→本始→府，先背节奏再对应含义。',
    },
    {
      id: 'yj-ref-2',
      canon: '《黄帝内经》',
      chapter: '《素问·阴阳应象大论》',
      originalText: '故积阳为天，积阴为地。阴静阳躁，阳生阴长，阳杀阴藏。阳化气，阴成形。',
      sourceCitation: '《素问·阴阳应象大论》（紧接开篇之后）',
      verificationStatus: 'verified',
      factSource: {
        factId: 'yj-classic-ji-yang',
        field: 'classic.originalText',
        value: '故积阳为天，积阴为地。阴静阳躁，阳生阴长，阳杀阴藏。阳化气，阴成形',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《阴阳应象大论》',
        verificationStatus: 'verified',
      },
      layers: [
        { layer: 1, layerName: '原文', content: '故积阳为天，积阴为地。阴静阳躁，阳生阴长，阳杀阴藏。阳化气，阴成形。' },
        { layer: 2, layerName: '词句', content: '积：积聚；阳生阴长、阳杀阴藏：指阴阳互根、互为生杀；阳化气：阳主化生无形之气；阴成形：阴主构成有形之体。' },
        { layer: 3, layerName: '传统解释', content: '传统以「阳化气、阴成形」说明功能与物质、气与形体的关系。', source: '《素问》王冰注（取其大义）' },
        { layer: 4, layerName: '现代教学解释', content: '现代教学用「阳化气、阴成形」解释功能与物质的相对关系，是理解气与形、动与静的经典句。此为现代教学解释。', source: '中医基础理论教学通识' },
      ],
      memorizationHint: '「阳化气、阴成形」六字是理解功能与物质关系的关键，务必记牢。',
    },
  ],

  cases: [
    {
      id: 'yj-c1',
      level: 'C1',
      title: '「本」指什么',
      scenario: '直接考核心理解。',
      question: '「治病必求于本」的「本」是什么？',
      options: [
        { id: 'a', text: '阴阳这一总纲', correct: true, why: '原文前五句讲的都是阴阳，「本」即阴阳。' },
        { id: 'b', text: '肾这个脏腑', correct: false, why: '把「本」误读为某一具体器官。' },
        { id: 'c', text: '病因病毒', correct: false, why: '以今人概念套古文，偏离原文。' },
      ],
      explanation: '「本」承接上文五句排比，指阴阳这一总纲。',
      takeaway: '本 = 阴阳。',
      relatesTo: ['ck-classic-yinyang-dao'],
    },
    {
      id: 'yj-c2',
      level: 'C2',
      title: '两篇「天地之道」',
      scenario: '《阴阳应象大论》与《天元纪大论》都出现「天地之道也」。',
      question: '如何快速区分「阴阳者，天地之道也……」这一句出自哪一篇？',
      options: [
        { id: 'a', text: '看后面有没有「治病必求于本」——有则是《阴阳应象大论》', correct: true, why: '「治病必求于本」是应象大论独有的收束句。' },
        { id: 'b', text: '两篇完全一样，无法区分', correct: false, why: '两篇语境不同，后文不同，可区分。' },
        { id: 'c', text: '看前面有没有「黄帝曰」', correct: false, why: '都不是可靠的唯一区分点。' },
      ],
      explanation: '凭后文「治病必求于本」锁定《阴阳应象大论》。',
      takeaway: '同句异篇，凭「求于本」分。',
      relatesTo: ['ck-classic-yinyang-dao'],
    },
    {
      id: 'yj-c3',
      level: 'C3',
      title: '「阳化气，阴成形」',
      scenario: '换一句同一篇里的经典句。',
      question: '「阳化气，阴成形」讲的是哪一对关系？',
      options: [
        { id: 'a', text: '功能（气）与物质（形）的关系', correct: true, why: '阳主化气、功能；阴主成形、物质。' },
        { id: 'b', text: '冷与热的关系', correct: false, why: '这句讲的是气与形，不是寒热。' },
        { id: 'c', text: '上与下的关系', correct: false, why: '范围不符。' },
      ],
      freeReasoning: {
        standardJudgment: '「阳化气，阴成形」讲的是「功能（气）与物质（形）」的相对关系。',
        coreEvidence: ['阳主化气、主动能（无形之气）', '阴主成形、主物质（有形之体）'],
        commonPitfalls: ['把它误解为寒热关系', '把它误解为上下升降关系'],
        requireCounterEvidence: true,
        requireRevision: false,
      },
      explanation: '「阳化气、阴成形」是把阴阳落到「功能 vs 物质」这一对具体关系上。',
      takeaway: '阳化气、阴成形 = 功能与物质。',
      relatesTo: ['ck-classic-yinyang-dao'],
    },
    {
      id: 'yj-c4',
      level: 'C4',
      title: '陌生场景里的「求于本」',
      scenario: '一个完全不同的情境：面对一个复杂的、信息芜杂的陌生问题（不限中医），需要先定方向再处理。',
      question: '用「治病必求于本」的方法论，第一步应该做什么？',
      options: [
        { id: 'a', text: '先抓一堆细节', correct: false, why: '忽略总纲，容易方向错。' },
        { id: 'b', text: '先分清方向/总纲（如寒热虚实），再谈具体', correct: true, why: '「求于本」= 先定总纲，再谈手段。' },
        { id: 'c', text: '先找捷径处理', correct: false, why: '违背「先辨方向」的方法论。' },
      ],
      freeReasoning: {
        standardJudgment: '「治病必求于本」的方法是：先分方向（总纲），再谈具体手段。',
        coreEvidence: ['「本」指阴阳这一总纲，先辨方向是前提', '方向错了，再对的手段也会南辕北辙'],
        commonPitfalls: ['一头扎进细节里，忽略先定总纲', '把「求于本」当成某味药/某穴的依据'],
        requireCounterEvidence: true,
        requireRevision: true,
      },
      explanation: '方法论可迁移：先辨总纲（方向），再谈具体手段——这是「必求于本」的普遍价值。',
      takeaway: '先定方向，再谈手段。',
      relatesTo: ['ck-classic-yinyang-dao', 'ck-yin-yang'],
    },
  ],

  safety: {
    educationOnly: true,
    noDiagnosis: true,
    prohibitions: ['不得断章取义地引用经文为具体诊疗背书', '本对象仅学习原文与方法论，不构成任何诊治依据'],
    disclaimers: ['经典原文学习不等于具备临床能力', '涉及健康问题请咨询专业中医师'],
  },

  trainability: {
    supportedModes: ['classicDecode', 'blindCase', 'reversalCase'],
    funComesFrom: '趣味来自「经文破译」：把古文拆成关键词、再拼回现代理解，以及「本=阴阳」这一反直觉判断。',
  },

  classic: {
    reference: {
      id: 'yj-ref-1',
      canon: '《黄帝内经》',
      chapter: '《素问·阴阳应象大论》',
      originalText: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。治病必求于本。',
      sourceCitation: '《素问·阴阳应象大论》篇首（《补注释文黄帝内经素问》王冰注本）',
      verificationStatus: 'verified',
      factSource: {
        factId: 'yj-classic-da-bian',
        field: 'classic.reference.originalText',
        value: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。治病必求于本',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《阴阳应象大论》',
        verificationStatus: 'verified',
      },
      layers: [
        { layer: 1, layerName: '原文', content: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。治病必求于本。' },
        { layer: 2, layerName: '词句', content: '道：根本规律；纲纪：纲领总要；变化之父母：变化之根源；生杀之本始：生灭之起始；神明之府：神之所藏；本：根本（阴阳）。' },
        { layer: 3, layerName: '传统解释', content: '王冰注本谓治疾当先察阴阳，此为传统注家的大义。', source: '《素问》王冰注' },
        { layer: 4, layerName: '现代教学解释', content: '现代教学概括为「辨证首辨阴阳」。此为现代教学解释，非原典原意的直接替代。', source: '中医基础理论教学通识' },
      ],
      memorizationHint: '五级排比 + 一句收束，先记节奏再记含义。',
    },
    keywordGlossary: [
      { term: '道', explanation: '根本规律、法则。' },
      { term: '纲纪', explanation: '纲领、总要（纲是网的总绳，纪是丝的头绪）。' },
      { term: '变化之父母', explanation: '变化的根源、本源。' },
      { term: '生杀之本始', explanation: '生长与消亡的根本起始。' },
      { term: '神明之府', explanation: '「神」所藏之处，一指精神生命活动，一指自然变化之玄妙。' },
      { term: '本', explanation: '根本——即上文所说的阴阳这一总纲。' },
    ],
    modernTranslation: '阴阳，是天地间的根本规律，是万物的总纲领，是一切变化的根源，是生长与消亡的本源，也是精神生命活动（神明）所蕴藏的处所。因此，治疗疾病必须探求这个根本——阴阳。',
  },

  factAudit: {
    facts: [
      {
        factId: 'yj-classic-da-bian',
        field: 'classic.reference.originalText',
        value: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。治病必求于本',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《阴阳应象大论》',
        verificationStatus: 'verified',
        reviewerNote: '「治病必求于本」只见于《阴阳应象大论》，与《天元纪大论》同句区分。',
      },
      {
        factId: 'yj-classic-ji-yang',
        field: 'classic.reference.originalText',
        value: '故积阳为天，积阴为地。阴静阳躁，阳生阴长，阳杀阴藏。阳化气，阴成形',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 素问》',
        sourceChapter: '《阴阳应象大论》',
        verificationStatus: 'verified',
      },
    ],
  },
};