// ============================================================
// 黄金样板 02 · 🌿 人参（HerbKnowledge）
// 验证：识材 + 药性 + 功效 + 配伍 + 炮制 + 记忆 + 剂量来源
// ============================================================
import type { HerbKnowledge } from '../../../types/canonicalKnowledgeSchema';

export const goldenGinseng: HerbKnowledge = {
  identity: {
    id: 'gs-herb-ginseng',
    canonicalId: 'ck-herb-ginseng',
    type: 'herb',
    domain: '中药学',
    subdomain: '补气药',
    chapter: '方药之境 · 补气药',
    unit: '人参',
    title: '人参',
    aliases: ['人衔', '鬼盖', '神草', '土精', '园参（栽培品）', '林下山参／籽海'],
  },

  positioning: {
    learningStage: 'stage6',
    prerequisites: ['ck-yin-yang', 'ck-qi-blood'],
    difficulty: 3,
    importance: 'core',
    knowledgeLevel: 'A8',
    masteryTarget: {
      requiredDepth: 'A6',
      requiredCases: ['C1', 'C2', 'C3', 'C4'],
      transferRequired: true,
      masteryCriterion: '能说出人参的基原与性味归经，能在「气虚 vs 实证」情境里判断是否适用，并能区分人参与西洋参。',
    },
  },

  core: {
    oneLine: '人参是「大补元气」的第一药，补的是气、留的是津，贵在「补气而不伤阴」。',
    coreDefinition: '人参为五加科植物人参（Panax ginseng C. A. Mey.）的干燥根和根茎，味甘、微苦，性微温，归脾、肺、心、肾经，功能大补元气、复脉固脱、补脾益肺、生津养血、安神益智。',
    structure: [
      '基原：五加科人参属，多年生草本',
      '药用部位：根和根茎（《中国药典》2005 年版起将芦头一并收载）',
      '四气：微温',
      '五味：甘、微苦',
      '归经：脾、肺、心、肾',
    ],
    mechanism: '元气是人体诸气之根。人参「大补元气」排在首位，其余「补脾益肺、生津养血、安神益智」五项都由元气补足后派生而来：元气足，则脾得健运、肺得宣降、心肾之气自复，「气能生津、气能摄血」也就随之成立。这就是「补气为纲、余效为目」的内在逻辑。',
    keyPoints: [
      '人参补的是「元气」，是总纲性的补气药',
      '气能生津：补气即可生津止渴，不必专靠养阴药',
      '分清「园参／林下山参」与「生晒参／红参」的差异',
      '实证、热证而正气不虚者忌服',
    ],
    distinctions: [
      { label: '人参 vs 西洋参', difference: '人参性微温走高，善大补元气；西洋参性凉，补气又养阴、偏清火', confusionPoint: '把西洋参当成人参的平替，忽略寒温方向的差别' },
      { label: '人参 vs 生晒参/红参', difference: '生晒参（原植物直接晒/烘干）性较平和；红参（蒸制后烘干）性偏温，偏于温补', confusionPoint: '以为两者完全等同，其实温补强度不同' },
    ],
    commonMisunderstandings: [
      '认为人参「越补越好」，忽略实证/热证忌服',
      '以为人参只能回阳救脱，忽略其生津、安神等常效',
      '把野生/林下参与普通园参混为一谈',
    ],
    counterIntuitivePoint: '人参性「微温」且偏「补气生津」，并不适合所有虚证——对阴虚火旺者，用性凉的西洋参往往更合适。补药也有「方向」，不是「虚就用人参」。',
  },

  depthLayers: [
    { level: 'A1', content: '人参是「百草之王」，《中国药典》定为补气第一要药。' },
    { level: 'A2', content: '基原：五加科植物人参 Panax ginseng C. A. Mey. 的干燥根和根茎；味甘、微苦，微温；归脾、肺、心、肾经。' },
    { level: 'A3', content: '用自己的话讲：人参最主要作用是「补气」，尤其能大补全身最根本的元气；补气顺带能生津、养血、安神。' },
    { level: 'A4', content: '关联：人参是四君子汤（与白术、茯苓、甘草）、独参汤（单味救脱）等的核心；补气与「气能生津、气能摄血」直接相关。' },
    { level: 'A5', content: '比较：人参与西洋参都补气，但人参微温、西洋参凉；人参善补元气，西洋参善补气养阴清火。这是方药里最容易混的一对。' },
    { level: 'A6', content: '辨析：一个「乏力」的人能不能用人参？要看他有没有实证、热证——苔黄厚、腹胀、发热而正气不虚者忌用。判断「虚」是前提。' },
    { level: 'A7', content: '迁移：从「体虚欲脱」到「脾虚食少」「肺虚喘咳」「津伤口渴」这些不同情境，都有一条主线——元气/气虚。换情境依然要抓住「气」这个轴心。' },
    { level: 'A8', content: '综合「为什么」：五大功效（益气、固脱、补脾肺、生津养血、安神益智）不是并列，而是「大补元气」这一总纲下的逐级展开；理解了「元气是诸气之根」，就理解了为什么一味药能覆盖这么多方向。' },
  ],

  memory: {
    mustMemorize: [
      '《药典》性味归经：甘、微苦，微温。归脾、肺、心、肾经。',
      '《药典》功效：大补元气，复脉固脱，补脾益肺，生津养血，安神益智。',
      '《神农本草经》：「主补五脏，安精神，定魂魄，止惊悸，除邪气，明目，开心益智。」',
    ],
    shouldMemorize: ['用量：3–9g，另煎兑服；研粉吞服一次 2g、一日 2 次。', '不宜与藜芦、五灵脂同用。'],
    understandOnly: ['人参皂苷等活性成分的现代药理分布（茎叶＞根、参须＞主根）只需理解「部位都有药效」。'],
    applicationFirst: ['优先练「辨虚证 → 能否用人参」，而不是背功效表。'],
    memoryTargets: [
      { id: 'rs-mem-1', text: '基原：五加科 Panax ginseng C. A. Mey. 干燥根和根茎' },
      { id: 'rs-mem-2', text: '归经：脾、肺、心、肾（四个字：脾肺心肾）' },
      { id: 'rs-mem-3', text: '用量 3–9g + 反藜芦、畏五灵脂' },
    ],
    recallQuestions: [
      { id: 'rs-rq-1', question: '人参的性味归经是什么？', answer: '甘、微苦，微温；归脾、肺、心、肾经。' },
      { id: 'rs-rq-2', question: '人参的第一功效（总纲）是什么？', answer: '大补元气。' },
      { id: 'rs-rq-3', question: '人参不宜与哪两味同用？', answer: '藜芦（十八反）、五灵脂（十九畏）。' },
    ],
    fillBlank: [
      { id: 'rs-fb-1', stem: '人参为五加科植物人参（______ C. A. Mey.）的干燥根和根茎。', answer: 'Panax ginseng' },
      { id: 'rs-fb-2', stem: '人参功能____元气、复脉固脱、补脾益肺、生津养血、安神益智。', answer: '大补' },
    ],
    sequenceRecall: [
      {
        id: 'rs-seq-1',
        title: '人参五大功效（按「总纲→派生」顺序）',
        orderedItems: ['大补元气', '复脉固脱', '补脾益肺', '生津养血', '安神益智'],
      },
    ],
    writtenRecall: [
      {
        id: 'rs-wr-1',
        prompt: '写一段：为什么说人参是「补气的总纲」？',
        checklist: ['先写「元气是诸气之根」', '再写其余功效是元气足后的派生', '最后落到「实证/热证忌服」的边界'],
      },
    ],
    confusingPairs: [
      { id: 'rs-cp-1', a: '人参', b: '西洋参', distinction: '人参微温、善补元气；西洋参凉、补气养阴清火。', mnemonic: '人参温，西洋凉' },
      { id: 'rs-cp-2', a: '生晒参', b: '红参', distinction: '生晒参较平和；红参经蒸制，性更温，偏温补。', mnemonic: '红参「火气」更重' },
      { id: 'rs-cp-3', a: '园参', b: '林下山参', distinction: '园参人工栽培；林下山参在山林野生状态自然生长，价高品质优。', mnemonic: '野的更贵更少' },
    ],
    spacedReview: {
      intervalsDays: [1, 3, 7, 15, 30],
      triggerOnError: '「人参 vs 西洋参」连续答错 2 次，立即重做对比题',
      reviewPrompt: '遮住答案，先默写「性味归经 + 功效 + 用量」，再回忆「反藜芦畏五灵脂」，最后对照药典找错。',
    },
  },

  classics: [
    {
      id: 'rs-ref-1',
      canon: '《神农本草经》',
      chapter: '上品 · 人参',
      originalText: '人参，味甘，微寒。主补五脏，安精神，定魂魄，止惊悸，除邪气，明目，开心益智。久服轻身延年。',
      sourceCitation: '《神农本草经》草部上品（各版本于气味有「微寒／小寒」之异文，主补五脏以下文字一致）',
      verificationStatus: 'verified',
      factSource: {
        factId: 'rs-classic-shennong',
        field: 'classic.originalText',
        value: '人参，味甘，微寒。主补五脏，安精神，定魂魄，止惊悸，除邪气，明目，开心益智。久服轻身延年。',
        sourceType: 'classic_original',
        sourceTitle: '《神农本草经》',
        sourceChapter: '草部上品 · 人参',
        verificationStatus: 'verified',
        reviewerNote: '气味「微寒」诸辑本有「微寒/小寒」异文；「主补五脏」以下文字各本一致。',
      },
      layers: [
        { layer: 1, layerName: '原文', content: '人参，味甘，微寒。主补五脏，安精神，定魂魄，止惊悸，除邪气，明目，开心益智。久服轻身延年。' },
        { layer: 2, layerName: '词句', content: '主：主治；安精神、定魂魄：安定神志；止惊悸：止惊恐心悸；开心益智：开通心窍、增益智慧。' },
        { layer: 3, layerName: '传统解释', content: '清代陈修园《神农本草经读》认为「主补五脏」为本经提纲，谓五脏得甘寒之助而安、定、止、明、开、益。此为传统注家的阐释。', source: '《神农本草经读》（清·陈修园）' },
        { layer: 4, layerName: '现代教学解释', content: '现代教学把「主补五脏」对应为「大补元气」：元气充则五脏皆得所养。此为现代教学解释，是对原文大义的转译，不是对原典原意的直接替代。', source: '现代方剂学/中药学教学通识' },
      ],
      memorizationHint: '按「补五脏 → 安神定魂 → 止惊悸 → 明目 → 开心益智」的递进链条背。',
    },
  ],

  cases: [
    {
      id: 'rs-c1',
      level: 'C1',
      title: '人参的性味归经',
      scenario: '复习人参基本属性。',
      question: '下列哪一项是人参的正确性味归经？',
      options: [
        { id: 'a', text: '甘、微苦，微温；归脾、肺、心、肾经', correct: true, why: '与《中国药典》完全一致。' },
        { id: 'b', text: '苦、寒；归肝、胆经', correct: false, why: '这是偏清热的药性，与人参不符。' },
        { id: 'c', text: '辛、热；归心肺经', correct: false, why: '辛热是温里散寒类的方向，不是人参。' },
      ],
      explanation: '记牢「甘微苦、微温，归脾肺心肾」四字经：脾、肺、心、肾。',
      takeaway: '人参性微温，不是大热大寒。',
      relatesTo: ['ck-herb-ginseng'],
    },
    {
      id: 'rs-c2',
      level: 'C2',
      title: '人参还是西洋参',
      scenario: '一个气短乏力、口干、夜间盗汗心烦的人，整体偏「热」的虚证。',
      question: '人参与西洋参，选哪个更合适？为什么？',
      options: [
        { id: 'a', text: '人参，补气最强', correct: false, why: '人参微温，偏热证用会更燥。' },
        { id: 'b', text: '西洋参，补气养阴又清火', correct: true, why: '本证偏阴虚火旺，西洋参性凉，补气兼养阴清火更对症。' },
        { id: 'c', text: '两者随便选', correct: false, why: '寒温方向不同，选错会加重不适。' },
      ],
      explanation: '同样是「补气」，要看寒温方向：偏热用凉性的西洋参，偏寒虚用人参。',
      takeaway: '补药也分寒温方向。',
      relatesTo: ['ck-herb-ginseng'],
    },
    {
      id: 'rs-c3',
      level: 'C3',
      title: '腹痛苔黄能不能用人参',
      scenario: '一个人腹胀、大便干、舌苔黄厚，同时诉「很累、没力气」。',
      question: '他「累」能不能用人参补？为什么？',
      options: [
        { id: 'a', text: '能，累就是气虚', correct: false, why: '只盯住「累」，忽略了实证的表现。' },
        { id: 'b', text: '不能，实证内热而正气不虚者忌服', correct: true, why: '苔黄厚、腹胀大便秘是实热（邪实），此时用人参「闭门留寇」。' },
        { id: 'c', text: '先吃一点试试', correct: false, why: '误补会让实热加重，不能「试试」。' },
      ],
      freeReasoning: {
        standardJudgment: '「累」不等于「气虚」。腹胀、大便干、苔黄厚为实热内结，正气不虚者用人参是禁忌。',
        coreEvidence: ['苔黄厚、腹胀、大便秘 = 邪实（实热内结）', '实证、热证而正气不虚者忌服人参（反致「闭门留寇」）'],
        commonPitfalls: ['只盯「累」字就判气虚', '把实热误当气虚而「试试」进补'],
        requireCounterEvidence: true,
        requireRevision: false,
      },
      explanation: '「累」不等于「气虚」。实证、热证而正气不虚者，人参是禁忌——这就是「辨虚是前提」。',
      takeaway: '先辨虚，再谈补。',
      relatesTo: ['ck-herb-ginseng', 'ck-deficiency-excess'],
    },
    {
      id: 'rs-c4',
      level: 'C4',
      title: '跑完马拉松后的「气短」',
      scenario: '一个完全不同的现代情境：剧烈运动后大汗淋漓、气短脉弱、口渴，处于「气随汗脱」状态。',
      question: '从「气」的角度，为什么这种「气脱先兆」强调了人参「大补元气」的价值？',
      options: [
        { id: 'a', text: '因为汗多口渴，人参能当运动饮料', correct: false, why: '把补气药和补水混淆了本体。' },
        { id: 'b', text: '因为气随汗泄、元气一时亏脱，需急救益气固脱', correct: true, why: '大汗亡阳、气随汗脱时，补元气是第一要务，这正是「复脉固脱」的迁移应用。' },
        { id: 'c', text: '与人参无关', correct: false, why: '这正是「大补元气、复脉固脱」在急性虚脱情境里的迁移。' },
      ],
      freeReasoning: {
        standardJudgment: '大汗后气随汗泄、元气一时亏脱，需「大补元气、复脉固脱」急救，正是人参第一功用的迁移。',
        coreEvidence: ['大汗、气短脉弱 = 气随汗脱，元气不固', '人参「复脉固脱」专为此类气脱而设'],
        commonPitfalls: ['把补气药当运动饮料，混淆「补水」与「益气固脱」', '忽略「气随汗脱」的急危性，误判为普通疲劳'],
        requireCounterEvidence: true,
        requireRevision: true,
      },
      explanation: '换到「运动后气随汗脱」这个陌生场景，仍然要抓「气/元气」主线——人参的「大补元气、复脉固脱」在这里体现价值。',
      takeaway: '抓「气」主线，陌生场景也能判断。',
      relatesTo: ['ck-herb-ginseng', 'ck-qi-blood'],
    },
  ],

  safety: {
    educationOnly: true,
    noDiagnosis: true,
    prohibitions: ['不可自行购买煎服、不可自行增减剂量', '实证、热证而正气不虚者忌服', '儿童、孕妇、有出血倾向者须在医师指导下使用'],
    disclaimers: ['本内容仅用于学习识药与药性，不构成用药建议', '任何用药须经专业中医师辨证处方'],
  },

  trainability: {
    supportedModes: ['materialIdentification', 'blindCase', 'reversalCase'],
    funComesFrom: '趣味来自「识材」（看芦头、芦碗、珍珠点辨真假）和「辨虚才能补」的推理反转，而非勋章数值。',
  },

  herb: {
    name: '人参',
    pinyin: 'Rénshēn',
    aliases: ['人衔', '鬼盖', '神草', '土精', '百草之王'],
    origin: '五加科植物人参 Panax ginseng C. A. Mey. 的干燥根和根茎',
    medicinalPart: '根和根茎',
    source: '《中华人民共和国药典》（2025 年版）一部',
    category: '补气药',
    appearance: {
      crudeOverview: '主根呈纺锤形或圆柱形，长 3–15cm，直径 1–2cm；表面灰黄色，上部或全体有疏浅断续的粗横纹及明显的纵皱，下部有支根 2–3 条并着生多数细长须根。',
      decoctionPiece: '饮片常为斜切或横切的薄片，断面淡黄白色、显粉性，形成层环纹棕黄色，皮部有黄棕色点状树脂道及放射状裂隙。',
      keyFeatures: ['芦头（根茎）', '芦碗（茎痕，凹陷）', '艼（不定根）', '须根疣状突起（俗称「珍珠点」）', '断面明显形成层环纹'],
      confusableSubstitutes: ['西洋参（同科五加科，Panax quinquefolium，性凉）', '商陆、桔梗等伪品（常被用来伪造）'],
      authenticationPoints: ['看芦碗分布是否自然', '看须根是否有疣状突起（珍珠点）', '断面形成层环是否清晰', '尝味微苦回甘、香气特异'],
    },
    property: {
      fourQi: '微温',
      fiveFlavors: '甘、微苦',
      channelTropism: '归脾、肺、心、肾经',
      ascendingDescending: '偏升浮，善升提元气；但其「复脉固脱」亦含固脱收摄之性，故不以「主升」绝对化（教学推断，非药典法定定性）。',
      toxicity: '无毒（但实证、热证而正气不虚者忌服）',
    },
    action: {
      coreActions: ['大补元气', '复脉固脱'],
      secondaryActions: ['补脾益肺', '生津养血', '安神益智'],
      actionLogic: '「大补元气」是总纲；元气充则脾、肺、心、肾四脏之气皆得补，气能生津、气能摄血、气能养神，故其余功效随之成立。',
    },
    clinical: {
      indications: ['体虚欲脱、肢冷脉微', '脾虚食少', '肺虚喘咳', '津伤口渴、内热消渴', '气血亏虚、久病虚羸', '惊悸失眠'],
      compatibilityRules: ['不宜与藜芦（十八反）同用', '不宜与五灵脂（十九畏）同用'],
      commonPartners: [
        { herb: '白术', effect: '气脾双补，增强健脾益气' },
        { herb: '茯苓', effect: '健脾渗湿，补而不滞' },
        { herb: '炙甘草', effect: '益气和中、调和诸药' },
      ],
      compatibilityChange: '人参与白术、茯苓、甘草相配，构成四君子汤，是补气的基础方；欲兼行气加陈皮（异功散），欲兼化痰加半夏陈皮（六君子汤）。',
    },
    processing: {
      rawProduct: '生晒参：鲜参经晒干或烘干',
      processedProduct: '红参：鲜参经蒸制后干燥',
      method: '蒸制后烘干',
      purpose: '改变药性，加强温补与扶正',
      propertyChange: '生晒参性较平和；红参性偏温，更善温补（体寒、气虚较重者多用红参）',
    },
    dosage: {
      dosage: {
        originalDosage: '各等分（《太平惠民和剂局方》四君子汤原方，非人参单品法定克数）',
        originalDosageSource: {
          factId: 'rs-dose-original',
          field: 'dosage.originalDosage',
          value: '各等分',
          sourceType: 'classic_original',
          sourceTitle: '《太平惠民和剂局方》',
          sourceChapter: '卷三',
          verificationStatus: 'verified',
          reviewerNote: '原方唯云「各等分」，不得折算为克数；人参单品在《局方》中并无独立法定克数。',
        },
        modernTeachingDosage: '3–9g，另煎兑服；研粉吞服一次 2g、一日 2 次',
        modernTeachingDosageSource: {
          factId: 'rs-dose-modern',
          field: 'dosage.modernTeachingDosage',
          value: '3–9g，另煎兑服；研粉吞服一次 2g、一日 2 次',
          sourceType: 'pharmacopoeia',
          sourceTitle: '《中华人民共和国药典》',
          sourceEdition: '2025 年版 一部',
          sourceChapter: '人参〔用法与用量〕',
          verificationStatus: 'verified',
        },
      },
      metrologyNote: '本样板不换算历代度量衡为具体克数，仅转引上述可靠来源的原文表述，避免自行推算。',
      teachingRange: '教学范围：一般 3–9g 煎服；急救气脱证在医师指导下可酌情增减（本产品不提供具体处方剂量）。',
    },
    contraindications: ['实证、热证而正气不虚者忌服', '不宜与藜芦、五灵脂同用', '有出血倾向、儿童及孕妇须谨慎并由医师指导'],
  },

  factAudit: {
    facts: [
      {
        factId: 'rs-fact-origin',
        field: 'herb.origin',
        value: '五加科植物人参 Panax ginseng C. A. Mey. 的干燥根和根茎',
        sourceType: 'pharmacopoeia',
        sourceTitle: '《中华人民共和国药典》',
        sourceEdition: '2025 年版 一部',
        verificationStatus: 'verified',
      },
      {
        factId: 'rs-fact-ascending',
        field: 'herb.property.ascendingDescending',
        value: '偏升浮，善升提元气；非绝对「主升」',
        sourceType: 'teaching_design',
        sourceTitle: '中药学升降浮沉教学通识',
        verificationStatus: 'teaching_inference',
        reviewerNote: '人参升降浮沉无药典法定定性，原「主升（升提阳气）」依据不足，已改为谨慎表述并标 teaching_inference。',
      },
      {
        factId: 'rs-fact-visual',
        field: 'herb.appearance.visualAssetId',
        value: '（未提供）',
        sourceType: 'teaching_design',
        sourceTitle: '无可靠授权图片',
        verificationStatus: 'pending',
        reviewerNote: '当前识材仅为文字描述，无真实视觉素材，不得声称已完成「真实识材」。',
      },
    ],
  },
};