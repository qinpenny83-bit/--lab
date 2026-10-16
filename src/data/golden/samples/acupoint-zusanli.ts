// ============================================================
// 黄金样板 04 · 📍 足三里（AcupointKnowledge）
// 验证：经脉 + 定位 + 解剖 + 特定穴 + 主治 + 配伍 + 识穴
// ============================================================
import type { AcupointKnowledge } from '../../../types/canonicalKnowledgeSchema';

export const goldenZusanli: AcupointKnowledge = {
  identity: {
    id: 'gs-acupoint-zusanli',
    canonicalId: 'ck-acupoint-zusanli',
    type: 'acupoint',
    domain: '针灸学',
    subdomain: '腧穴 · 足阳明胃经',
    chapter: '经络腧穴 · 足阳明胃经',
    unit: '足三里',
    title: '足三里',
    aliases: ['三里', '下陵', 'Zusanli', 'ST36'],
  },

  positioning: {
    learningStage: 'stage6',
    prerequisites: ['ck-yin-yang', 'ck-meridian-basics'],
    difficulty: 3,
    importance: 'core',
    knowledgeLevel: 'A8',
    masteryTarget: {
      requiredDepth: 'A6',
      requiredCases: ['C1', 'C2', 'C3', 'C4'],
      transferRequired: true,
      masteryCriterion: '能定位（犊鼻下 3 寸、胫骨前缘一横指），能说出它是胃经合穴与下合穴，并能与易混穴（阴陵泉等）区分，建立空间记忆。',
    },
  },

  core: {
    oneLine: '足三里是「肚腹」问题的总开关，位在小腿外侧、犊鼻下 3 寸，既是胃经合穴，又是胃的下合穴。',
    coreDefinition: '足三里归属于足阳明胃经，定位在小腿前外侧、犊鼻（外膝眼）下 3 寸、距胫骨前缘一横指（中指）处；为胃经合穴，又是胃的下合穴。',
    structure: [
      '归经：足阳明胃经（ST36）',
      '定位：犊鼻下 3 寸、胫骨前缘一横指',
      '特定穴：合穴 + 胃之下合穴',
      '功能：和胃健脾、通腑化痰、强壮保健',
      '四总穴之一：「肚腹三里留」',
    ],
    mechanism: '「合治内腑」「治府者，治其合」——合穴与下合穴是经脉之气深入脏腑的枢纽。足三里既是本经合穴，又是胃腑之气下合之处，所以对胃痛、呕吐、腹胀、泄泻、便秘等脾胃病证作用突出；又因阳明胃经「多气多血」，故兼能补气血、强壮保健。',
    keyPoints: [
      '定位三要素：犊鼻（外膝眼）、向下 3 寸、胫骨前缘一横指',
      '合穴 + 下合穴双重身份是关键',
      '「肚腹三里留」概括其治腹疾的核心地位',
    ],
    distinctions: [
      { label: '足三里 vs 阴陵泉', difference: '足三里在外侧（胃经），阴陵泉在内侧（脾经），两者分居腿内外', confusionPoint: '把内外、脾经胃经搞混' },
      { label: '足三里 vs 上巨虚', difference: '上巨虚在足三里下 3 寸，是大肠的下合穴', confusionPoint: '两个「下合穴」位置相邻' },
    ],
    commonMisunderstandings: [
      '把「胃经」与「脾经」的腧穴位置记混（一外一内）',
      '以为足三里只能治胃病，忽略其强壮保健、治下肢痿痹等作用',
    ],
    counterIntuitivePoint: '一个在小腿上的穴位，为什么能治「肚子」的病？因为合穴、下合穴是经气下合于本经、内通于腑的枢纽——穴位不在脏腑上，但经气能通过它深入脏腑。这就是「远离病灶、内通其腑」的道理。',
  },

  depthLayers: [
    { level: 'A1', content: '足三里是小腿外侧的一个常用穴位，属足阳明胃经。' },
    { level: 'A2', content: '定位：犊鼻（外膝眼）下 3 寸、距胫骨前缘一横指；特定穴：合穴、胃的下合穴。' },
    { level: 'A3', content: '用自己的话：从外膝眼往下量三寸、再往外偏开胫骨一横指，就是足三里。' },
    { level: 'A4', content: '关联：胃经为多气多血之经；合穴/下合穴内通胃腑，故能调脾胃、补气血、强健身体。' },
    { level: 'A5', content: '比较：足三里（腿外侧、胃经）与阴陵泉（腿内侧、脾经）分居两侧，定位先分「内外」。' },
    { level: 'A6', content: '辨析：在腿上「犊鼻下 3 寸、胫骨前缘一横指、偏外」的位置找穴，若找到的是「胫骨内侧」则偏到阴陵泉方向去了——先定内外再定上下。' },
    { level: 'A7', content: '迁移：把「肚腹三里留」的规律，套到「陌生腹疾 + 需要辨经取穴」的情境里，仍应优先想到调足阳明胃经、调足三里。' },
    { level: 'A8', content: '综合「为什么」：足三里之所以是「保健强身第一穴」，是因为「合穴 + 下合穴 + 多气多血之经」三者叠加：既通腑气治腹疾，又益气养血补虚，既治已病又可保健。' },
  ],

  memory: {
    mustMemorize: [
      '定位：犊鼻下 3 寸、距胫骨前缘一横指。',
      '特定穴：足阳明胃经合穴、胃之下合穴。',
      '四总穴歌之一：「肚腹三里留」。',
    ],
    shouldMemorize: ['主治五类：脾胃病、下肢痿痹、神志病、外科（乳痈肠痈）、虚劳保健。'],
    understandOnly: ['解剖层次的神经血管分布只需理解「穴位下有肌与血管神经」，不必死背英文名。'],
    applicationFirst: ['优先练「看体表位置→定穴→相比易混穴」，而非背条文。'],
    memoryTargets: [
      { id: 'zsl-mem-1', text: '定位公式：犊鼻下 3 寸 + 胫骨前缘一横指' },
      { id: 'zsl-mem-2', text: '双重特定穴：合穴 + 下合穴' },
      { id: 'zsl-mem-3', text: '「肚腹三里留」= 治腹疾要穴' },
    ],
    recallQuestions: [
      { id: 'zsl-rq-1', question: '足三里的定位是什么？', answer: '犊鼻（外膝眼）下 3 寸、距胫骨前缘一横指。' },
      { id: 'zsl-rq-2', question: '足三里是哪两条特定穴属性？', answer: '合穴、胃之下合穴。' },
      { id: 'zsl-rq-3', question: '「肚腹三里留」是什么意思？', answer: '腹部（肚腹）病证优先考虑取足三里。' },
    ],
    fillBlank: [
      { id: 'zsl-fb-1', stem: '足三里定位：犊鼻下____寸、距胫骨前缘一横指。', answer: '3' },
      { id: 'zsl-fb-2', stem: '足三里为足阳明胃经的____穴，又是胃之____穴。', answer: '合 / 下合' },
    ],
    sequenceRecall: [
      {
        id: 'zsl-seq-1',
        title: '足三里主治（按重要性顺序）',
        orderedItems: ['脾胃病（胃痛呕吐腹胀泄泻便秘）', '下肢痿痹', '神志病', '虚劳诸证（强壮保健）'],
      },
    ],
    writtenRecall: [
      {
        id: 'zsl-wr-1',
        prompt: '描述：怎么在自己的腿上找到足三里？',
        checklist: ['坐位屈膝', '先找外膝眼（犊鼻）', '向下量 3 寸（四指并拢约 3 寸）', '再向外移胫骨前缘一横指', '按之有酸胀感'],
      },
    ],
    confusingPairs: [
      { id: 'zsl-cp-1', a: '足三里', b: '阴陵泉', distinction: '足三里在腿外侧（胃经）；阴陵泉在腿内侧胫骨内侧髁下（脾经）。', mnemonic: '外胃里脾，三里外、阴陵内' },
      { id: 'zsl-cp-2', a: '足三里', b: '上巨虚', distinction: '上巨虚在足三里下 3 寸，为大肠之下合穴。', mnemonic: '再下三寸是大肠' },
      { id: 'zsl-cp-3', a: '下合穴（胃）', b: '下合穴（大肠）', distinction: '胃下合穴=足三里，大肠下合穴=上巨虚。', mnemonic: '胃三里、大肠上巨虚' },
    ],
    spacedReview: {
      intervalsDays: [1, 3, 7, 15, 30],
      triggerOnError: '「足三里 vs 阴陵泉」内外定位连续 2 次答错，重做定位对比',
      reviewPrompt: '闭眼在腿上比划定位，遮住答案默写「犊鼻下3寸+一横指」与特定穴，再对照找错。',
    },
  },

  classics: [
    {
      id: 'zsl-ref-1',
      canon: '《黄帝内经》',
      chapter: '《灵枢 · 五邪》',
      originalText: '邪在脾胃，则病肌肉痛。阳气有余，阴气不足，则热中善饥；阳气不足，阴气有余，则寒中肠鸣腹痛；阴阳俱有余，若俱不足，则有寒有热。皆调于三里。',
      sourceCitation: '《灵枢 · 五邪》（「皆调于三里」之确切出处）',
      verificationStatus: 'verified',
      factSource: {
        factId: 'zsl-classic-wuxie',
        field: 'classic.originalText',
        value: '皆调于三里',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 灵枢》',
        sourceChapter: '《五邪》',
        verificationStatus: 'verified',
        reviewerNote: '原样板误将「皆调于三里」归入《邪气脏腑病形》，实出自《灵枢·五邪》，已更正。',
      },
      layers: [
        { layer: 1, layerName: '原文', content: '邪在脾胃，则病肌肉痛。阳气有余，阴气不足，则热中善饥；阳气不足，阴气有余，则寒中肠鸣腹痛；阴阳俱有余，若俱不足，则有寒有热。皆调于三里。' },
        { layer: 2, layerName: '词句', content: '邪在脾胃：病邪在脾胃；调：调治、调理；三里：即足三里。' },
        { layer: 3, layerName: '传统解释', content: '古人认为脾胃受邪、病变于肌肉时，无论属寒属热，都应当调理足三里，取其合穴下合穴内通胃腑之力。', source: '《灵枢·五邪》文义（traditional_commentary）' },
        { layer: 4, layerName: '现代教学解释', content: '现代教学将此作为「合治内腑」「肚腹三里留」的经典依据。此为现代教学解释，不是对原文的逐字替代。', source: '针灸学教学通识' },
      ],
      memorizationHint: '抓「皆调于三里」五字，与「肚腹三里留」互参。',
    },
  ],

  cases: [
    {
      id: 'zsl-c1',
      level: 'C1',
      title: '足三里的定位',
      scenario: '复习基本定位。',
      question: '足三里的定位是？',
      options: [
        { id: 'a', text: '犊鼻下 3 寸、距胫骨前缘一横指', correct: true, why: '标准定位，小腿前外侧。' },
        { id: 'b', text: '胫骨内侧髁下缘凹陷中', correct: false, why: '那是阴陵泉（脾经），位置偏内。' },
        { id: 'c', text: '腓骨小头前下方凹陷中', correct: false, why: '那是阳陵泉（胆经）的方向。' },
      ],
      explanation: '定位三要素：犊鼻（外膝眼）+ 下 3 寸 + 胫骨前缘一横指。',
      takeaway: '定位 = 基准点 + 距离 + 偏移。',
      relatesTo: ['ck-acupoint-zusanli'],
    },
    {
      id: 'zsl-c2',
      level: 'C2',
      title: '足三里还是阴陵泉',
      scenario: '两个容易搞混的膝下穴位。',
      question: '腿内侧胫骨内侧髁下缘的这个穴，是足三里吗？',
      options: [
        { id: 'a', text: '是，内侧下缘就是足三里', correct: false, why: '足三里在腿外侧，不在内侧。' },
        { id: 'b', text: '不是，那是阴陵泉（足太阴脾经）', correct: true, why: '内侧、胫骨内侧髁下缘是阴陵泉。' },
        { id: 'c', text: '两者是同穴异名', correct: false, why: '两者分属胃经与脾经，位置一外一内。' },
      ],
      explanation: '一根腿内外两条经：外膝眼下 3 寸是足三里（胃经），内膝下是阴陵泉（脾经）。',
      takeaway: '先定内外，再定上下。',
      relatesTo: ['ck-acupoint-zusanli'],
    },
    {
      id: 'zsl-c3',
      level: 'C3',
      title: '同身寸取穴',
      scenario: '给一个「手指短小」的儿童，与一个「手指粗长」的成人取穴。',
      question: '用「一横指/3 寸」定位时要注意什么？',
      options: [
        { id: 'a', text: '用谁的手都一样', correct: false, why: '手寸不同，定位会偏。' },
        { id: 'b', text: '用「同身寸」（患者本人的手指）取穴', correct: true, why: '一横指、四指并拢 3 寸均以患者本人的手为准。' },
        { id: 'c', text: '用尺子量绝对厘米最准', correct: false, why: '个体差异会造成偏位，取穴用同身寸。' },
      ],
      freeReasoning: {
        standardJudgment: '取穴尺度必须用「同身寸」——以学习者/患者本人的手指为尺度。',
        coreEvidence: ['「3 寸」「一横指」是相对尺度，个体手寸不同', '用患者同身寸可消除个体差异，避免定位偏位'],
        commonPitfalls: ['用施术者或他人之手量取导致偏位', '用绝对厘米替代同身寸'],
        requireCounterEvidence: true,
        requireRevision: false,
      },
      explanation: '「3 寸」「一横指」都是同身寸概念——以学习者/患者本人的手指为尺度，避免个体差异带来定位偏差。',
      takeaway: '取穴尺度用「同身寸」。',
      relatesTo: ['ck-acupoint-zusanli'],
    },
    {
      id: 'zsl-c4',
      level: 'C4',
      title: '「肚腹三里留」的迁移',
      scenario: '一个陌生场景：需要为「胃脘不适、腹胀」的人选一个「治腹疾、调胃经」的远端保健穴。',
      question: '用「合治内腑/肚腹三里留」的规律，应该优先想到哪个穴位方向？',
      options: [
        { id: 'a', text: '一个在腹部的穴位', correct: false, why: '「治腹疾」不等于「取腹部穴」，远端合穴同样通腑。' },
        { id: 'b', text: '足三里（胃经合穴、下合穴）', correct: true, why: '肚腹三里留——治腹疾要穴，优先取足三里。' },
        { id: 'c', text: '任一胃经穴即可', correct: false, why: '并非所有胃经穴都通腑气，足三里因下合穴身份地位特殊。' },
      ],
      freeReasoning: {
        standardJudgment: '治腹疾 → 胃经 → 合穴/下合穴 → 足三里。',
        coreEvidence: ['足三里为胃之下合穴，下合穴内通于腑（合治内腑）', '四总穴歌「肚腹三里留」将其定为治腹疾要穴'],
        commonPitfalls: ['误以为治腹疾必须取腹部穴，忽略远端下合穴', '把任一胃经穴等同足三里'],
        requireCounterEvidence: true,
        requireRevision: true,
      },
      explanation: '换到陌生情境，抓住「治腹疾 → 胃经 → 合穴/下合穴 → 足三里」这条推理链，就能正确落穴。',
      takeaway: '「肚腹三里留」是可迁移的取穴规律。',
      relatesTo: ['ck-acupoint-zusanli'],
    },
  ],

  safety: {
    educationOnly: true,
    noDiagnosis: true,
    prohibitions: ['仅为教育性识穴与理论学习，禁止引导使用者自行针刺或艾灸', '孕妇、儿童、皮肤破损/感染处禁用针刺与灸法', '任何取穴治疗须由专业针灸医师操作'],
    disclaimers: ['本内容用于理解「穴位为何能治远隔部位」，不构成任何治疗操作指导'],
  },

  trainability: {
    supportedModes: ['acupointMapping', 'blindCase', 'reversalCase'],
    funComesFrom: '趣味来自「身体地图找穴」和「远端穴为何治腹疾」的空间推理，而非勋章数值。',
  },

  factAudit: {
    facts: [
      {
        factId: 'zsl-fact-location',
        field: 'acupoint.location',
        value: '在小腿前外侧，犊鼻（外膝眼）下 3 寸，距胫骨前缘一横指（中指）',
        sourceType: 'national_standard',
        sourceTitle: '经络腧穴学国家标准定位（参照规划教材《针灸学》）',
        verificationStatus: 'verified',
      },
      {
        factId: 'zsl-fact-classic',
        field: 'classic.originalText',
        value: '皆调于三里',
        sourceType: 'classic_original',
        sourceTitle: '《黄帝内经 · 灵枢》',
        sourceChapter: '《五邪》',
        verificationStatus: 'verified',
        reviewerNote: '已纠正原「《邪气脏腑病形》」之误归。',
      },
      {
        factId: 'zsl-fact-song',
        field: 'classic.「肚腹三里留」',
        value: '肚腹三里留',
        sourceType: 'traditional_commentary',
        sourceTitle: '《四总穴歌》（「肚腹三里留，腰背委中求，头项寻列缺，面口合谷收」）',
        verificationStatus: 'verified',
      },
      {
        factId: 'zsl-fact-spatial',
        field: 'acupoint.spatial',
        value: '文字空间学习（无可靠 3D/图片素材，visualAssetId 留空）',
        sourceType: 'teaching_design',
        sourceTitle: '空间认知训练结构（暂为文字定位 + 地标/方向/邻近关系）',
        verificationStatus: 'teaching_inference',
        reviewerNote: '当前为文字空间学习，非视觉空间学习；不伪造人体图片。',
      },
    ],
  },

  acupoint: {
    name: '足三里',
    pinyin: 'Zúsānlǐ',
    code: 'ST36',
    meridian: '足阳明胃经',
    location: '在小腿前外侧，犊鼻（外膝眼）下 3 寸，距胫骨前缘一横指（中指）。',
    locationSource: '经络腧穴学国家标准定位（参照规划教材《针灸学》）',
    locatingMethod: [
      '坐位屈膝；同侧手展开，食指第二指关节桡侧缘对准犊鼻穴下缘，小指第二指关节处即为本穴（四指并拢约合 3 寸）。',
      '或以犊鼻（外膝眼）为基准，向上向下量取，再向外偏移胫骨前缘一横指。',
    ],
    surfaceLandmarks: ['犊鼻（外膝眼）', '胫骨前嵴', '胫骨前缘一横指（中指同身寸）'],
    anatomy: '位于胫骨前肌与趾长伸肌之间；浅层有腓肠外侧皮神经，深层有胫前动、静脉与腓深神经分布。',
    mainIndications: ['胃痛、呕吐、腹胀、腹泻、痢疾、便秘等脾胃病', '下肢痿痹', '心悸、失眠、癫狂等神志病', '乳痈、肠痈等外科病', '虚劳诸证（强壮保健要穴）'],
    combinations: [
      { withPoint: '中脘', effect: '配合治胃脘痛' },
      { withPoint: '内关', effect: '配合治胃痛呕吐' },
      { withPoint: '脾俞、气海、肾俞', effect: '配合治虚证泄泻' },
    ],
    specialPointTypes: ['合穴', '胃之下合穴'],
    meridianRelation: '足三里属足阳明胃经；胃经多气多血，为气血生化之源所在之经，故该穴既有调胃腑之功，又具补气血强壮之力。',
    classicSource: '《灵枢·五邪》「皆调于三里」；《四总穴歌》「肚腹三里留」。',
    confusablePoints: [
      { point: '阴陵泉', difference: '足太阴脾经，位于腿内侧胫骨内侧髁下缘，与足三里分居内外。' },
      { point: '上巨虚', difference: '足三里下 3 寸，为大肠之下合穴。' },
      { point: '阳陵泉', difference: '足少阳胆经，位于腓骨小头前下方凹陷中，偏腿外侧上方。' },
    ],
    identification: [
      { kind: 'location-to-point', prompt: '犊鼻下 3 寸、胫骨前缘一横指的是什么穴？', answer: '足三里。' },
      { kind: 'point-to-meridian', prompt: '足三里归属于哪条经脉？', answer: '足阳明胃经。' },
      { kind: 'point-to-attribute', prompt: '足三里是哪些特定穴？', answer: '合穴、胃之下合穴。' },
      { kind: 'two-point-difference', prompt: '足三里与阴陵泉的核心区别？', answer: '足三里偏外属胃经，阴陵泉偏内属脾经。' },
      { kind: 'region-to-point', prompt: '「肚腹三里留」中的「三里」指？', answer: '足三里。' },
    ],
    spatial: {
      bodyRegion: '小腿前外侧（膝关节下、胫骨嵴外侧）',
      landmarkPoints: ['犊鼻（外膝眼）', '胫骨前嵴', '胫骨前缘'],
      relativeDirection: '自犊鼻向下、居胫骨前缘外侧（偏外，不在胫骨内侧面）',
      relativeDistance: '犊鼻下 3 寸（四指并拢约 3 寸，同身寸），距胫骨前缘一横指（中指）',
      neighboringPoints: ['上巨虚（下 3 寸，大肠下合穴）', '下巨虚（上巨虚下 3 寸，小肠下合穴）', '阳陵泉（腓骨小头前下方，胆经）', '阴陵泉（胫骨内侧髁下缘，脾经）'],
      meridianPath: '足阳明胃经自头面经颈、胸、腹，沿下肢前外侧下行，经足三里、上巨虚、下巨虚至足次趾外侧端。',
      spatialTasks: [
        '区域识别：小腿前外侧 vs 小腿内侧/后侧',
        '地标识别：先定位外膝眼（犊鼻）与胫骨前嵴',
        '上下关系：自犊鼻向下量 3 寸',
        '内外关系：居胫骨前缘外侧一横指，勿偏胫骨内侧（阴陵泉方向）',
        '邻近穴位：说出上巨虚、下巨虚与足三里的上下三寸关系',
        '经脉关系：描述足阳明胃经在小腿前外侧的走行',
        '易混穴比较：足三里（外/胃经）vs 阴陵泉（内/脾经）、阳陵泉（腓骨小头前下方）',
        '闭眼空间回忆：闭眼沿腿前外侧比划定位并核对',
      ],
    },
  },
};