// ============================================================
// 杏林大典 · Phase 5 · 经典出处补丁（classic-patch）
// —— Phase 5 本地白名单扩展，不修改 phase-3a.1/source-catalog.mjs ——
// 用途：Batch-1 样本引用的《内经》《伤寒论》公认原文，在 3A.1 出处表
//       中未收录，被 Gate K 降级为 conditional。经逐条核对原文后补录，
//       运行时注入（Object.assign），闭合 conditional 为 candidate。
// 分层口径与 source-catalog.mjs 一致：
//   kind 'B' = 原文出处可核验（classic_original + verified）
//   kind 'K' = 后世/教材归纳术语（teaching_design/teaching_inference）
// ============================================================
export const CLASSIC_ATTRIBUTION_PATCH = {
  // ---------- A 基础理论（5）----------
  '风善行数变': {
    kind: 'B', correctCanon: '《素问·风论》', correctChapter: '风论篇第四十二',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「风者，善行而数变」原文，风邪善行数变致病特性依据',
  },
  '怒伤肝': {
    kind: 'B', correctCanon: '《素问·阴阳应象大论》', correctChapter: '阴阳应象大论篇第五',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「怒伤肝，喜伤心，思伤脾，忧伤肺，恐伤肾」原文，五志伤五脏依据',
  },
  '从治': {
    kind: 'B', correctCanon: '《素问·至真要大论》', correctChapter: '至真要大论篇第七十四',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「正者正治，反者从治」原文，反治（从治）经典依据',
  },
  '司外揣内': {
    kind: 'B', correctCanon: '《素问·阴阳应象大论》', correctChapter: '阴阳应象大论篇第五',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「以我知彼，以表知里，以观过与不及之理，见微得过，用之不殆」原文；「司外揣内」术语另见《灵枢·外揣》',
  },
  '形与神俱': {
    kind: 'B', correctCanon: '《素问·上古天真论》', correctChapter: '上古天真论篇第一',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「形与神俱，而尽终其天年」原文，形神合一观依据',
  },
  '素问宝命全形论': {
    kind: 'B', correctCanon: '《素问》', correctChapter: '宝命全形论篇第二十五',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「凡刺之真，必先治神」原文，针刺治神总则依据',
  },
  // ---------- B 诊断学（4）----------
  '得神者昌': {
    kind: 'B', correctCanon: '《素问·移精变气论》', correctChapter: '移精变气论篇第十三',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「得神者昌，失神者亡」原文，望神判断预后依据',
  },
  '胃神根': {
    kind: 'K', correctCanon: '《素问·玉机真脏论》', correctChapter: '玉机真脏论篇第十九',
    correctStatus: 'teaching_inference', correctType: 'traditional_commentary',
    note: '「胃神根」为后世教学概括；「脉弱以滑，是有胃气」原文见《素问·玉机真脏论》',
  },
  '聚水': {
    kind: 'B', correctCanon: '《素问·水热穴论》', correctChapter: '水热穴论篇第六十一',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「肾者，胃之关也，关门不利，故聚水而从其类也」原文，水肿病机依据',
  },
  '重阴必阳': {
    kind: 'B', correctCanon: '《素问·阴阳应象大论》', correctChapter: '阴阳应象大论篇第五',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「重阴必阳，重阳必阴」原文，阴阳转化依据',
  },
  // ---------- L 方剂学（6）----------
  '无汗而喘': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '麻黄汤证条文「太阳病，头痛发热，身疼腰痛，骨节疼痛，恶风，无汗而喘者，麻黄汤主之」',
  },
  '汗出恶风': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '桂枝汤证条文「太阳病，头痛发热，汗出恶风，桂枝汤主之」；「阳浮者热自发，阴弱者汗自出」原文亦见',
  },
  '心下有水气': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '小青龙汤证条文「伤寒表不解，心下有水气，干呕发热而咳」',
  },
  '痞满燥实': {
    kind: 'K', correctCanon: '《伤寒论》阳明病篇（后世归纳）', correctChapter: '辨阳明病脉证并治',
    correctStatus: 'teaching_inference', correctType: 'teaching_design',
    note: '「痞满燥实」为大承气汤适应证四字概括，后世/教材归纳，非原句；原文依据见阳明腑实诸条',
  },
  '往来寒热': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨少阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '小柴胡汤证条文「伤寒五六日中风，往来寒热，胸胁苦满，嘿嘿不欲饮食，心烦喜呕」',
  },
  '脉微欲绝': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨少阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '四逆汤类证条文「下利清谷，内寒外热，脉微欲绝者，四逆汤主之」；「少阴病，脉沉者，急温之，宜四逆汤」亦见',
  },
  // ---------- C 经络学（12）----------
  '经脉十二者': {
    kind: 'B', correctCanon: '《灵枢·经脉》', correctChapter: '经脉第十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「经脉十二者，伏行分肉之间，深而不见」原文，十二经脉系统总纲',
  },
  '肺手太阴之脉': {
    kind: 'B', correctCanon: '《灵枢·经脉》', correctChapter: '经脉第十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「肺手太阴之脉，起于中焦，下络大肠，还循胃口，上膈属肺」原文节引',
  },
  '胃足阳明之脉': {
    kind: 'B', correctCanon: '《灵枢·经脉》', correctChapter: '经脉第十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「胃足阳明之脉，起于鼻，交頞中」原文节引',
  },
  '心手少阴之脉': {
    kind: 'B', correctCanon: '《灵枢·经脉》', correctChapter: '经脉第十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「心手少阴之脉，起于心中，出属心系」原文节引',
  },
  '膀胱足太阳之脉': {
    kind: 'B', correctCanon: '《灵枢·经脉》', correctChapter: '经脉第十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「膀胱足太阳之脉，起于目内眦，上额交巅」原文节引',
  },
  '肾足少阴之脉': {
    kind: 'B', correctCanon: '《灵枢·经脉》', correctChapter: '经脉第十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「肾足少阴之脉，起于小指之下，邪走足心」原文节引',
  },
  '肝足厥阴之脉': {
    kind: 'B', correctCanon: '《灵枢·经脉》', correctChapter: '经脉第十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「肝足厥阴之脉，起于大指丛毛之际」原文节引',
  },
  '任脉者': {
    kind: 'B', correctCanon: '《素问·骨空论》', correctChapter: '骨空论篇第六十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「任脉者，起于中极之下，以上毛际」原文节引；任脉为阴脉之海',
  },
  '督脉者': {
    kind: 'B', correctCanon: '《素问·骨空论》', correctChapter: '骨空论篇第六十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「督脉者，起于少腹以下骨中央」原文节引；督脉为阳脉之海',
  },
  '冲脉者': {
    kind: 'B', correctCanon: '《素问·骨空论》', correctChapter: '骨空论篇第六十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「冲脉者，起于气街，并少阴之经，侠脐上行」原文节引；冲脉为十二经之海（血海）',
  },
  '所出为井': {
    kind: 'B', correctCanon: '《灵枢·九针十二原》', correctChapter: '九针十二原第一',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「所出为井，所溜为荥，所注为输，所行为经，所入为合」原文，五输穴理论依据',
  },
  '节之交': {
    kind: 'B', correctCanon: '《灵枢·九针十二原》', correctChapter: '九针十二原第一',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「节之交，三百六十五会」原文，腧穴数目渊源',
  },
  '合治内腑': {
    kind: 'B', correctCanon: '《灵枢·邪气脏腑病形》', correctChapter: '邪气脏腑病形第四',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「荥输治外经，合治内腑」原文，下合穴理论依据',
  },
  '十二原': {
    kind: 'B', correctCanon: '《灵枢·九针十二原》', correctChapter: '九针十二原第一',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「十二原者，五脏之所以禀三百六十五节气味也」原文，原穴理论依据',
  },
  // ---------- D 腧穴学（5）----------
  '五脏募皆在阴': {
    kind: 'B', correctCanon: '《难经》', correctChapter: '六十七难',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「五脏募皆在阴，而俞在阳」原文，俞募穴理论依据',
  },
  '八会': {
    kind: 'B', correctCanon: '《难经》', correctChapter: '四十五难',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '八会穴出处（脏会章门、腑会中脘、气会膻中、血会膈俞、筋会阳陵泉、骨会大杼、髓会绝骨、脉会太渊）',
  },
  '腧穴所在，主治所在': {
    kind: 'K', correctCanon: '（教学归纳）', correctChapter: '',
    correctStatus: 'teaching_inference', correctType: 'teaching_design',
    note: '腧穴近治规律的教材归纳语，非经典原句',
  },
  '经脉所过，主治所及': {
    kind: 'K', correctCanon: '（教学归纳）', correctChapter: '',
    correctStatus: 'teaching_inference', correctType: 'teaching_design',
    note: '腧穴远治规律的教材归纳语，非经典原句',
  },
  '肚腹三里留': {
    kind: 'K', correctCanon: '明·徐凤《针灸大全》', correctChapter: '',
    correctStatus: 'teaching_inference', correctType: 'traditional_commentary',
    note: '四总穴歌句（肚腹三里留，腰背委中求，头项寻列缺，面口合谷收），最早见明·徐凤《针灸大全》',
  },
  // ---------- D 腧穴学·Batch-3 补充（5）----------
  '腰背委中求': {
    kind: 'K', correctCanon: '明·徐凤《针灸大全》', correctChapter: '',
    correctStatus: 'teaching_inference', correctType: 'traditional_commentary',
    note: '四总穴歌句，最早见明·徐凤《针灸大全》，委中治腰背痛歌诀',
  },
  '头项寻列缺': {
    kind: 'K', correctCanon: '明·徐凤《针灸大全》', correctChapter: '',
    correctStatus: 'teaching_inference', correctType: 'traditional_commentary',
    note: '四总穴歌句，最早见明·徐凤《针灸大全》，列缺通任脉治头项病歌诀',
  },
  '面口合谷收': {
    kind: 'K', correctCanon: '明·徐凤《针灸大全》', correctChapter: '',
    correctStatus: 'teaching_inference', correctType: 'traditional_commentary',
    note: '四总穴歌句，最早见明·徐凤《针灸大全》，合谷治面口病歌诀',
  },
  '气至而有效': {
    kind: 'B', correctCanon: '《灵枢·九针十二原》', correctChapter: '九针十二原第一',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「刺之要，气至而有效，效之信，若风之吹云」原文，针刺得气理论依据',
  },
  '盛则泻之': {
    kind: 'B', correctCanon: '《灵枢·经脉》', correctChapter: '经脉第十',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「盛则泻之，虚则补之，热则疾之，寒则留之，陷下则灸之，不盛不虚，以经取之」原文，针刺补泻原则依据',
  },
  // ---------- 经典书目级出处（Batch-6/7 起：整书原文引用闭合）----------
  '《神农本草经》': {
    kind: 'B', correctCanon: '《神农本草经》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '现存最早本草专著（汉·托名神农，原书已佚，今据顾观光等辑本引用原文）',
  },
  '《伤寒论》': {
    kind: 'B', correctCanon: '《伤寒论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '东汉·张仲景《伤寒论》原文',
  },
  '《金匮要略》': {
    kind: 'B', correctCanon: '《金匮要略》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '东汉·张仲景《金匮要略》原文',
  },
  '《本草纲目》': {
    kind: 'B', correctCanon: '《本草纲目》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·李时珍《本草纲目》原文',
  },
  '《温病条辨》': {
    kind: 'B', correctCanon: '《温病条辨》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·吴鞠通《温病条辨》原文',
  },
  '《温热论》': {
    kind: 'B', correctCanon: '《温热论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·叶天士《温热论》原文',
  },
  '《黄帝内经》': {
    kind: 'B', correctCanon: '《黄帝内经》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《黄帝内经》为《素问》《灵枢》合称，引用时宜注明具体篇章',
  },
  // ---------- L 方剂学·Batch-7 经典条文短语补丁（8）----------
  '汗出而喘': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '麻黄杏仁甘草石膏汤证条文「发汗后，不可更行桂枝汤，汗出而喘，无大热者，可与麻黄杏仁甘草石膏汤」',
  },
  '肠痈': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '疮痈肠痈浸淫病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '大黄牡丹汤证条文「肠痈者，少腹肿痞，按之即痛如淋……脓未成，可下之……大黄牡丹汤主之」',
  },
  '心下痛按之石硬': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '大陷胸汤证条文「伤寒六七日，结胸热实，脉沉而紧，心下痛，按之石硬者，大陷胸汤主之」',
  },
  '热结在里': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '大柴胡汤证条文「伤寒十余日，热结在里，复往来寒热者，与大柴胡汤」',
  },
  '少阴病四逆': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨少阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '四逆散证条文「少阴病，四逆，其人或咳，或悸，或小便不利，或腹中痛，或泄利下重者，四逆散主之」',
  },
  '热利下重': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨厥阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '白头翁汤证条文「热利下重者，白头翁汤主之」',
  },
  '夜热早凉': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '下焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '青蒿鳖甲汤条文「夜热早凉，热退无汗，热自阴来者，青蒿鳖甲汤主之」',
  },
  // ---------- L 方剂学·Batch-38 经典条文短语补丁（8）----------
  '心下痞硬满': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '十枣汤证条文「……心下痞硬满，引胁下痛，干呕短气……此表解里未和也，十枣汤主之」',
  },
  '腹中㽲痛': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '妇人妊娠病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '当归芍药散条文「妇人怀妊，腹中㽲痛，当归芍药散主之」',
  },
  '心中烦不得卧': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨少阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '黄连阿胶汤证条文「少阴病，得之二三日以上，心中烦，不得卧，黄连阿胶汤主之」',
  },
  '手足厥寒脉细欲绝': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨厥阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '当归四逆汤证条文「手足厥寒，脉细欲绝者，当归四逆汤主之」',
  },
  '当复其阴': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '中焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '益胃汤条文「阳明温病，下后汗出，当复其阴，益胃汤主之」',
  },
  '下利便脓血': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨少阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '桃花汤证条文「少阴病，下利便脓血者，桃花汤主之」',
  },
  '哕逆': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '呕吐哕下利病脉证治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '橘皮竹茹汤条文「哕逆者，橘皮竹茹汤主之」',
  },
  '疟母': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '疟病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '鳖甲煎丸条文「……此结为癥瘕，名曰疟母，急治之，宜鳖甲煎丸」',
  },
  // ---------- 常见经典医籍整书级补丁（Batch-8/9 起）----------
  '《景岳全书》': {
    kind: 'B', correctCanon: '《景岳全书》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·张景岳《景岳全书》原文（含新方八阵、古方八阵等）',
  },
  '《难经》': {
    kind: 'B', correctCanon: '《难经》', correctChapter: '难经（黄帝八十一难经）',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '战国至西汉《黄帝八十一难经》原文（论脉、经络、脏腑、腧穴、针法等，如六十八难五输穴主治、七十五难补母泻子、四十五难八会穴）',
  },
  '《太平惠民和剂局方》': {
    kind: 'B', correctCanon: '《太平惠民和剂局方》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '宋·太平惠民和剂局《太平惠民和剂局方》原文',
  },
  '《小儿药证直诀》': {
    kind: 'B', correctCanon: '《小儿药证直诀》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '宋·钱乙《小儿药证直诀》原文',
  },
  '《医学心悟》': {
    kind: 'B', correctCanon: '《医学心悟》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·程钟龄《医学心悟》原文',
  },
  '《医方集解》': {
    kind: 'B', correctCanon: '《医方集解》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·汪昂《医方集解》原文',
  },
  '《外科正宗》': {
    kind: 'B', correctCanon: '《外科正宗》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·陈实功《外科正宗》原文',
  },
  '《校注妇人良方》': {
    kind: 'B', correctCanon: '《校注妇人良方》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '宋·陈自明《妇人大全良方》原撰，明·薛己校注本原文',
  },
  '《备急千金要方》': {
    kind: 'B', correctCanon: '《备急千金要方》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '唐·孙思邈《备急千金要方》原文',
  },
  '《摄生众妙方》': {
    kind: 'B', correctCanon: '《摄生众妙方》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·张时彻《摄生众妙方》原文',
  },
  '《丹溪心法》': {
    kind: 'B', correctCanon: '《丹溪心法》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '元·朱丹溪《丹溪心法》原文',
  },
  // ---------- Q 中医临床基础（40）----------
  '太阳之为病': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「太阳之为病，脉浮，头项强痛而恶寒」提纲原文',
  },
  '名为中风': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「太阳病，发热，汗出，恶风，脉缓者，名为中风」原文',
  },
  '名为伤寒': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「太阳病，或已发热，或未发热，必恶寒，体痛，呕逆，脉阴阳俱紧者，名为伤寒」原文',
  },
  '阳明之为病': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨阳明病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「阳明之为病，胃家实是也」提纲原文',
  },
  '少阳之为病': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨少阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「少阳之为病，口苦，咽干，目眩也」提纲原文',
  },
  '太阴之为病': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「太阴之为病，腹满而吐，食不下，自利益甚，时腹自痛」提纲原文',
  },
  '自利不渴': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「自利不渴者，属太阴，以其脏有寒故也」原文，太阴寒湿辨证依据',
  },
  '少阴之为病': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨少阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「少阴之为病，脉微细，但欲寐也」提纲原文',
  },
  '厥阴之为病': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨厥阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「厥阴之为病，消渴，气上撞心，心中疼热，饥而不欲食，食则吐蛔」提纲原文',
  },
  '阴阳气不相顺接': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨厥阴病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「凡厥者，阴阳气不相顺接，便为厥」原文，厥证病机依据',
  },
  '小便不利微热消渴': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「若脉浮，小便不利，微热消渴者，五苓散主之」原文（第71条）',
  },
  '其人如狂': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「太阳病不解，热结膀胱，其人如狂，血自下，下者愈」原文（第106条桃核承气汤证）',
  },
  '但满而不痛': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「但满而不痛者，此为痞，柴胡不中与之，宜半夏泻心汤」原文（第149条）',
  },
  '伤寒一日太阳受之': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「伤寒一日，太阳受之，脉若静者，为不传」原文（第4条），循经传依据',
  },
  '行其经尽': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「若欲作再经者，针足阳明，使经不传则愈」同条；「行其经尽」见第8条「太阳病，头痛至七日以上自愈者，以行其经尽故也」',
  },
  '太阳与阳明合病': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「太阳与阳明合病者，必自下利，葛根汤主之」原文（第32条）',
  },
  '三阳合病': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨阳明病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「三阳合病，腹满身重，难以转侧，口不仁面垢」原文（第219条）',
  },
  '虚羸少气': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨阴阳易差后劳复病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「伤寒解后，虚羸少气，气逆欲吐，竹叶石膏汤主之」原文（第397条）',
  },
  '观其脉证知犯何逆': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「观其脉证，知犯何逆，随证治之」原文（第16条），辨证论治总则依据',
  },
  '卫之后方言气': {
    kind: 'B', correctCanon: '《温热论》', correctChapter: '温热论',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·叶天士《温热论》「卫之后方言气，营之后方言血」原文，卫气营血辨证层次依据',
  },
  '辛凉平剂银翘散主之': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '上焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《温病条辨》上焦篇「太阴风温、温热……但热不恶寒而渴者，辛凉平剂银翘散主之」原文',
  },
  '辛凉轻剂桑菊饮主之': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '上焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《温病条辨》上焦篇「太阴风温，但咳，身不甚热，微渴者，辛凉轻剂桑菊饮主之」原文',
  },
  '辛凉重剂白虎汤主之': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '上焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《温病条辨》上焦篇「白虎本为达热出表……辛凉重剂白虎汤主之」原文',
  },
  '传至中焦阳明温病': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '中焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《温病条辨》中焦篇「面目俱赤，语声重浊……若上焦温病，传至中焦，阳明温病也」原文',
  },
  '手厥阴暑温': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '上焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《温病条辨》上焦篇暑温条「形似伤寒，但右脉洪大而数，左脉反小于右，口渴甚，面赤，汗大出者，名曰暑温，在手太阴；……手厥阴暑温」原文',
  },
  '时欲漱口不欲咽': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '下焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《温病条辨》下焦篇「温病……时欲漱口不欲咽」原文，热入血分、血热瘀结辨证依据',
  },
  '凡病温者始于上焦': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '上焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《温病条辨》上焦篇「凡病温者，始于上焦，在手太阴」原文，三焦辨证纲领',
  },
  '上焦病不治则传中焦': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '中焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《温病条辨》中焦篇「上焦病不治，则传中焦，胃与脾也」原文，三焦传变规律',
  },
  '名曰湿温': {
    kind: 'B', correctCanon: '《温病条辨》', correctChapter: '上焦篇',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《温病条辨》上焦篇「头痛恶寒，身重疼痛……舌白不渴，脉弦细而濡，面色淡黄，胸闷不饥，午后身热，状若阴虚，病难速已，名曰湿温」原文',
  },
  '百脉一宗': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '百合狐惑阴阳毒病脉证治第三',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「百合病者，百脉一宗，悉致其病也」原文，百合病总纲',
  },
  '蚀于喉为惑': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '百合狐惑阴阳毒病脉证治第三',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「狐惑之为病……蚀于喉为惑，蚀于阴为狐」原文，狐惑病辨证依据',
  },
  '心下有痰饮': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '痰饮咳嗽病脉证并治第十二',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「心下有痰饮，胸胁支满，目眩，苓桂术甘汤主之」原文',
  },
  '温药和之': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '痰饮咳嗽病脉证并治第十二',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「病痰饮者，当以温药和之」原文，痰饮治则纲领',
  },
  '饮后水流在胁下': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '痰饮咳嗽病脉证并治第十二',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「饮后水流在胁下，咳唾引痛，谓之悬饮」原文，悬饮定义',
  },
  '咳逆倚息': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '痰饮咳嗽病脉证并治第十二',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「咳逆倚息，短气不得卧，其形如肿，谓之支饮」原文，支饮定义',
  },
  '病悬饮者': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '痰饮咳嗽病脉证并治第十二',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「病悬饮者，十枣汤主之」原文',
  },
  '虚劳里急诸不足': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '血痹虚劳病脉证并治第六',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「虚劳里急，诸不足，黄芪建中汤主之」原文',
  },
  '风水恶风': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '水气病脉证并治第十四',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「风水恶风，一身悉肿，脉浮不渴，续自汗出，无大热，越婢汤主之」原文',
  },
  '喘息咳唾胸背痛': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '胸痹心痛短气病脉证治第九',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「胸痹之病，喘息咳唾，胸背痛，短气，寸口脉沉而迟」原文，胸痹主症',
  },
  '谷疸之为病': {
    kind: 'B', correctCanon: '《金匮要略》', correctChapter: '黄疸病脉证并治第十五',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '「谷疸之为病，寒热不食，食即头眩，心胸不安，久久发黄为谷疸，茵陈蒿汤主之」原文',
  },
  // ---------- M 方剂剂量（2）----------
  '一服汗出病差停后服': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '桂枝汤条「若一服汗出病差，停后服，不必尽剂」原文，中病即止原则经典依据',
  },
  '十枣汤平旦服': {
    kind: 'B', correctCanon: '《伤寒论》', correctChapter: '辨太阳病脉证并治',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '十枣汤条「若下少病不除者，明日更服，加半钱……」「平旦服」原文，峻下方药时辰用法依据',
  },
  // ---------- N 中医经典（整书级：Batch-14 起）----------
  '《素问》': {
    kind: 'B', correctCanon: '《素问》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《黄帝内经》素问部原文（含上古天真论、四气调神大论、生气通天论、阴阳应象大论、至真要大论等八十一篇），引用时以篇名入 chapter 字段',
  },
  '《灵枢》': {
    kind: 'B', correctCanon: '《灵枢》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '《黄帝内经》灵枢部原文（含九针十二原、经脉、本输、邪气脏腑病形等八十一篇），引用时以篇名入 chapter 字段',
  },
  // ---------- O 医古文（整书级：Batch-15 起）----------
  '《左传》': {
    kind: 'B', correctCanon: '《左传》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '春秋左氏传，医和医缓论疾等医史文献出处',
  },
  '《史记》': {
    kind: 'B', correctCanon: '《史记》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '西汉·司马迁《史记》，扁鹊仓公列传为早期医家传记',
  },
  '《三国志》': {
    kind: 'B', correctCanon: '《三国志》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '西晋·陈寿《三国志》，华佗传为重要医史文献',
  },
  '《后汉书》': {
    kind: 'B', correctCanon: '《后汉书》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '南朝宋·范晔《后汉书》，方术列传含医家传记',
  },
  '《类经》': {
    kind: 'B', correctCanon: '《类经》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·张介宾《类经》及其序文（类经序）',
  },
  '《儒门事亲》': {
    kind: 'B', correctCanon: '《儒门事亲》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '金·张从正《儒门事亲》，攻邪派代表作',
  },
  '《医宗必读》': {
    kind: 'B', correctCanon: '《医宗必读》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·李中梓《医宗必读》，不失人情论等名篇出处',
  },
  '《名医类案》': {
    kind: 'B', correctCanon: '《名医类案》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·江瓘《名医类案》，医案文献源头',
  },
  '《医门法律》': {
    kind: 'B', correctCanon: '《医门法律》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·喻嘉言《医门法律》，秋燥论等名篇出处',
  },
  '《柳河东集》': {
    kind: 'B', correctCanon: '《柳河东集》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '唐·柳宗元《柳河东集》，与崔连州论石钟乳书等医学杂文出处',
  },
  '《嵇康集》': {
    kind: 'B', correctCanon: '《嵇康集》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '三国魏·嵇康《嵇康集》，养生论为重要养生文献',
  },
  '《宋学士文集》': {
    kind: 'B', correctCanon: '《宋学士文集》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·宋濂《宋学士文集》，赠医师葛某序等赠序出处',
  },
  '《刘宾客文集》': {
    kind: 'B', correctCanon: '《刘宾客文集》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '唐·刘禹锡《刘宾客文集》，鉴药等医学散文出处',
  },
  '《古今图书集成医部全录》': {
    kind: 'B', correctCanon: '《古今图书集成医部全录》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·陈梦雷等辑《古今图书集成·医部全录》，诸医论等医家评论辑录出处',
  },
  // ---------- P 各家学说（整书级：Batch-16 起）----------
  '《素问玄机原病式》': {
    kind: 'B', correctCanon: '《素问玄机原病式》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '金·刘完素《素问玄机原病式》，河间学派主火论代表著作',
  },
  '《脾胃论》': {
    kind: 'B', correctCanon: '《脾胃论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '金·李杲《脾胃论》，易水学派补土学说代表著作',
  },
  '《内外伤辨惑论》': {
    kind: 'B', correctCanon: '《内外伤辨惑论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '金·李杲《内外伤辨惑论》，内伤外感鉴别著作',
  },
  '《兰室秘藏》': {
    kind: 'B', correctCanon: '《兰室秘藏》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '金·李杲《兰室秘藏》，脾胃论治方书',
  },
  '《格致余论》': {
    kind: 'B', correctCanon: '《格致余论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '元·朱震亨《格致余论》，阳常有余阴常不足论出处',
  },
  '《局方发挥》': {
    kind: 'B', correctCanon: '《局方发挥》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '元·朱震亨《局方发挥》，批评局方辛燥流弊之作',
  },
  '《医林改错》': {
    kind: 'B', correctCanon: '《医林改错》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·王清任《医林改错》，瘀血证治代表著作',
  },
  '《医学衷中参西录》': {
    kind: 'B', correctCanon: '《医学衷中参西录》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '民国·张锡纯《医学衷中参西录》，中西汇通代表著作',
  },
  '《温疫论》': {
    kind: 'B', correctCanon: '《温疫论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·吴有性《温疫论》，戾气学说与温疫辨治奠基之作',
  },
  // ---------- R 中医内科学（整书级：Batch-17 起）----------
  '《诸病源候论》': {
    kind: 'B', correctCanon: '《诸病源候论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '隋·巢元方《诸病源候论》，病因病机学专著，内科诸病源候总汇',
  },
  '《外台秘要》': {
    kind: 'B', correctCanon: '《外台秘要》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '唐·王焘《外台秘要》，汇集唐以前方书医论，内伤杂病方治重要渊薮',
  },
  '《济生方》': {
    kind: 'B', correctCanon: '《济生方》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '宋·严用和《济生方》，严氏济生方论，虚劳、水肿、淋证诸方论',
  },
  '《三因极一病证方论》': {
    kind: 'B', correctCanon: '《三因极一病证方论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '宋·陈言《三因极一病证方论》，三因学说（内因外因不内外因）出处',
  },
  '《丹溪心法》': {
    kind: 'B', correctCanon: '《丹溪心法》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '元·朱震亨《丹溪心法》，阳常有余阴常不足、痰证论治',
  },
  '《证治汇补》': {
    kind: 'B', correctCanon: '《证治汇补》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·李用粹《证治汇补》，内科杂病证治汇编',
  },
  '《临证指南医案》': {
    kind: 'B', correctCanon: '《临证指南医案》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·叶天士《临证指南医案》，内伤杂病医案与治法大要',
  },
  '《血证论》': {
    kind: 'B', correctCanon: '《血证论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·唐容川《血证论》，血证治法纲领（止血消瘀宁血补血）',
  },
  '《类证治裁》': {
    kind: 'B', correctCanon: '《类证治裁》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·林珮琴《类证治裁》，内科病证分类论治',
  },
  '《杂病源流犀烛》': {
    kind: 'B', correctCanon: '《杂病源流犀烛》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·沈金鳌《杂病源流犀烛》，杂病源流与治法系统论述',
  },
  '《医醇賸义》': {
    kind: 'B', correctCanon: '《医醇賸义》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·费伯雄《医醇賸义》，制方平和、顾护脾胃之论',
  },
  '《先醒斋医学广笔记》': {
    kind: 'B', correctCanon: '《先醒斋医学广笔记》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·缪希雍《先醒斋医学广笔记》，吐血三要法、脾阴学说',
  },
  '《世医得效方》': {
    kind: 'B', correctCanon: '《世医得效方》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '元·危亦林《世医得效方》，内科杂病方治汇编',
  },
  '《张氏医通》': {
    kind: 'B', correctCanon: '《张氏医通》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·张璐《张氏医通》，内伤杂病证治通论',
  },
  // ---------- S 中医外科学（整书级：Batch-18 起）----------
  '《医宗金鉴》': {
    kind: 'B', correctCanon: '《医宗金鉴》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·吴谦等《医宗金鉴·外科心法要诀》，外科病证辨治官修总汇',
  },
  '《疡科心得集》': {
    kind: 'B', correctCanon: '《疡科心得集》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·高秉钧《疡科心得集》，辨溃疡阴阳、审经络之论',
  },
  '《外科证治全生集》': {
    kind: 'B', correctCanon: '《外科证治全生集》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·王维德《外科证治全生集》，阴阳辨痈疽、阳和汤小金丹出处',
  },
  '《刘涓子鬼遗方》': {
    kind: 'B', correctCanon: '《刘涓子鬼遗方》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '晋·刘涓子《鬼遗方》（南齐龚庆宣整理），现存最早外科专著',
  },
  '《外科理例》': {
    kind: 'B', correctCanon: '《外科理例》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·汪机《外科理例》，以补托为要、外科亦当辨证论治',
  },
  '《疡医大全》': {
    kind: 'B', correctCanon: '《疡医大全》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·顾世澄《疡医大全》，外科证治大全汇编',
  },
  // ---------- T 中医妇科学（整书级：Batch-19 起）----------
  '《傅青主女科》': {
    kind: 'B', correctCanon: '《傅青主女科》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·傅山《傅青主女科》，经带胎产诸证论治专书',
  },
  '《济阴纲目》': {
    kind: 'B', correctCanon: '《济阴纲目》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·武之望《济阴纲目》，妇科证治纲目汇编',
  },
  '《女科经纶》': {
    kind: 'B', correctCanon: '《女科经纶》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·萧埙《女科经纶》，妇科经旨汇论',
  },
  // ---------- U 中医儿科学（整书级：Batch-20 起）----------
  '《幼幼集成》': {
    kind: 'B', correctCanon: '《幼幼集成》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·陈复正《幼幼集成》，儿科证治集成，惊风辨妄之论',
  },
  '《幼科发挥》': {
    kind: 'B', correctCanon: '《幼科发挥》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·万全《幼科发挥》，万氏儿科家传发挥',
  },
  '《小儿病源方论》': {
    kind: 'B', correctCanon: '《小儿病源方论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '宋·陈文中《小儿病源方论》，小儿病源证治',
  },
  // ---------- V 中医骨伤科学（整书级：Batch-21 起）----------
  '《仙授理伤续断秘方》': {
    kind: 'B', correctCanon: '《仙授理伤续断秘方》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '唐·蔺道人《仙授理伤续断秘方》，现存最早骨伤专著',
  },
  '《正体类要》': {
    kind: 'B', correctCanon: '《正体类要》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·薛己《正体类要》，正骨主补气血之论',
  },
  '《伤科汇纂》': {
    kind: 'B', correctCanon: '《伤科汇纂》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·胡廷光《伤科汇纂》，伤科证治总汇',
  },
  // ---------- W 中医眼科学（整书级：Batch-22 起）----------
  '《银海精微》': {
    kind: 'B', correctCanon: '《银海精微》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '唐·孙思邈辑（托名），眼科五轮八廓论治',
  },
  '《审视瑶函》': {
    kind: 'B', correctCanon: '《审视瑶函》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·傅仁宇《审视瑶函》，眼科证治大全',
  },
  '《目经大成》': {
    kind: 'B', correctCanon: '《目经大成》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·黄庭镜《目经大成》，目病证治与针拨之术',
  },
  '《原机启微》': {
    kind: 'B', correctCanon: '《原机启微》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '元·倪维德《原机启微》，眼科病因病机专论',
  },
  // ---------- X 中医耳鼻咽喉科（整书级：Batch-23 起）----------
  '《重楼玉钥》': {
    kind: 'B', correctCanon: '《重楼玉钥》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·郑梅涧《重楼玉钥》，咽喉科专书，白喉养阴清肺汤出处',
  },
  '《口齿类要》': {
    kind: 'B', correctCanon: '《口齿类要》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·薛己《口齿类要》，口齿咽喉证治',
  },
  // ---------- J 中药炮制学 / H 中药鉴定学 / I 药用植物·本草学（整书级：Batch-33 起）----------
  '《雷公炮炙论》': {
    kind: 'B', correctCanon: '《雷公炮炙论》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '南朝宋·雷敩《雷公炮炙论》，现存最早炮制专论，炮制十七法之源（原书佚，今据辑本引用原文）',
  },
  '《本草蒙筌》': {
    kind: 'B', correctCanon: '《本草蒙筌》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '明·陈嘉谟《本草蒙筌》，炮制辅料与火候论述',
  },
  '《修事指南》': {
    kind: 'B', correctCanon: '《修事指南》',
    correctStatus: 'verified', correctType: 'classic_original',
    note: '清·张睿《修事指南》，炮制方法系统总结',
  },
};
