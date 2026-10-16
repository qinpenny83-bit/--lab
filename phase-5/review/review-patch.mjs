// ============================================================
// 杏林大典 · Phase 5 · 审核队列出处补丁（review-patch）
// 用途：对 Phase 4 队列中「经典出处待核」的 conditional 节点逐条补权威出处。
// 依据：与 phase-5/classic-patch.mjs 同一原则 —— 不改写任何历史产物文件，
//       仅提供可审计的出处核对映射，由 run-review.mjs 在裁决层闭合。
// 分类：
//   kind 'B'（classic_original + verified）：原文可逐字核对到经典篇名
//   kind 'K'（teaching_inference）：教学/临床总结语，保留降级但给出思想依据
// ============================================================

export const REVIEW_PATCH = {
  // ---------- 阴阳 ----------
  '人以天地之气生': {
    kind: 'B', canon: '《素问·宝命全形论》', chapter: '宝命全形论篇第二十五',
    originalText: '人以天地之气生，四时之法成', sourceType: 'classic_original', status: 'verified',
  },
  '阴平阳秘': {
    kind: 'B', canon: '《素问·生气通天论》', chapter: '生气通天论篇第三',
    originalText: '阴平阳秘，精神乃治', sourceType: 'classic_original', status: 'verified',
  },
  '重寒则热': {
    kind: 'B', canon: '《素问·阴阳应象大论》', chapter: '阴阳应象大论篇第五',
    originalText: '重寒则热，重热则寒', sourceType: 'classic_original', status: 'verified',
  },
  '背为阳，腹为阴': {
    kind: 'B', canon: '《素问·金匮真言论》', chapter: '金匮真言论篇第四',
    originalText: '背为阳，阳中之阳，心也；腹为阴，阴中之阴，肾也', sourceType: 'classic_original', status: 'verified',
  },
  '阴在内，阳之守也': {
    kind: 'B', canon: '《素问·阴阳应象大论》', chapter: '阴阳应象大论篇第五',
    originalText: '阴在内，阳之守也；阳在外，阴之使也', sourceType: 'classic_original', status: 'verified',
  },
  '阴胜则阳病': {
    kind: 'B', canon: '《素问·阴阳应象大论》', chapter: '阴阳应象大论篇第五',
    originalText: '阴胜则阳病，阳胜则阴病', sourceType: 'classic_original', status: 'verified',
  },
  '善诊者，察色按脉': {
    kind: 'B', canon: '《素问·阴阳应象大论》', chapter: '阴阳应象大论篇第五',
    originalText: '善诊者，察色按脉，先别阴阳', sourceType: 'classic_original', status: 'verified',
  },
  '春夏养阳，秋冬养阴': {
    kind: 'B', canon: '《素问·四气调神大论》', chapter: '四气调神大论篇第二',
    originalText: '所以圣人春夏养阳，秋冬养阴，以从其根', sourceType: 'classic_original', status: 'verified',
  },
  '怒伤肝，悲胜怒': {
    kind: 'B', canon: '《素问·阴阳应象大论》', chapter: '阴阳应象大论篇第五',
    originalText: '怒伤肝，悲胜怒', sourceType: 'classic_original', status: 'verified',
  },
  '治病必求于本': {
    kind: 'B', canon: '《素问·阴阳应象大论》', chapter: '阴阳应象大论篇第五',
    originalText: '治病必求于本', sourceType: 'classic_original', status: 'verified',
  },
  '善治者治皮毛，其次治肌肤，其次治筋脉': {
    kind: 'B', canon: '《素问·阴阳应象大论》', chapter: '阴阳应象大论篇第五',
    originalText: '善治者治皮毛，其次治肌肤，其次治筋脉，其次治六腑，其次治五脏', sourceType: 'classic_original', status: 'verified',
  },

  // ---------- 藏象（灵兰秘典论十二官 + 六节藏象论 + 金匮真言论 + 上古天真论） ----------
  '肝者，罢极之本': {
    kind: 'B', canon: '《素问·六节藏象论》', chapter: '六节藏象论篇第九',
    originalText: '肝者，罢极之本，魂之居也', sourceType: 'classic_original', status: 'verified',
  },
  '脾胃者，仓廪之官': {
    kind: 'B', canon: '《素问·灵兰秘典论》', chapter: '灵兰秘典论篇第八',
    originalText: '脾胃者，仓廪之官，五味出焉', sourceType: 'classic_original', status: 'verified',
  },
  '肺者，相傅之官': {
    kind: 'B', canon: '《素问·灵兰秘典论》', chapter: '灵兰秘典论篇第八',
    originalText: '肺者，相傅之官，治节出焉', sourceType: 'classic_original', status: 'verified',
  },
  '肾者，作强之官': {
    kind: 'B', canon: '《素问·灵兰秘典论》', chapter: '灵兰秘典论篇第八',
    originalText: '肾者，作强之官，伎巧出焉', sourceType: 'classic_original', status: 'verified',
  },
  '胆者，中正之官': {
    kind: 'B', canon: '《素问·灵兰秘典论》', chapter: '灵兰秘典论篇第八',
    originalText: '胆者，中正之官，决断出焉', sourceType: 'classic_original', status: 'verified',
  },
  '小肠者，受盛之官': {
    kind: 'B', canon: '《素问·灵兰秘典论》', chapter: '灵兰秘典论篇第八',
    originalText: '小肠者，受盛之官，化物出焉', sourceType: 'classic_original', status: 'verified',
  },
  '大肠者，传导之官': {
    kind: 'B', canon: '《素问·灵兰秘典论》', chapter: '灵兰秘典论篇第八',
    originalText: '大肠者，传导之官，变化出焉', sourceType: 'classic_original', status: 'verified',
  },
  '膀胱者，州都之官': {
    kind: 'B', canon: '《素问·灵兰秘典论》', chapter: '灵兰秘典论篇第八',
    originalText: '膀胱者，州都之官，津液藏焉', sourceType: 'classic_original', status: 'verified',
  },
  '三焦者，决渎之官': {
    kind: 'B', canon: '《素问·灵兰秘典论》', chapter: '灵兰秘典论篇第八',
    originalText: '三焦者，决渎之官，水道出焉', sourceType: 'classic_original', status: 'verified',
  },
  '胃者，水谷之海': {
    kind: 'B', canon: '《灵枢·海论》', chapter: '海论第三十三',
    originalText: '胃者，水谷之海', sourceType: 'classic_original', status: 'verified',
  },
  '人有髓海、血海、气海、水谷之海': {
    kind: 'B', canon: '《灵枢·海论》', chapter: '海论第三十三',
    originalText: '人有髓海，有血海，有气海，有水谷之海', sourceType: 'classic_original', status: 'verified',
  },
  '肝开窍于目': {
    kind: 'B', canon: '《素问·金匮真言论》', chapter: '金匮真言论篇第四',
    originalText: '东方青色，入通于肝，开窍于目，藏精于肝', sourceType: 'classic_original', status: 'verified',
  },
  '女子七岁，肾气盛，齿更发长；二七而天癸至，任脉通，太冲脉盛，月事以时下': {
    kind: 'B', canon: '《素问·上古天真论》', chapter: '上古天真论篇第一',
    originalText: '女子七岁，肾气盛，齿更发长；二七而天癸至，任脉通，太冲脉盛，月事以时下，故有子', sourceType: 'classic_original', status: 'verified',
  },

  // ---------- 精气血津液 ----------
  '天食人以五气': {
    kind: 'B', canon: '《素问·六节藏象论》', chapter: '六节藏象论篇第九',
    originalText: '天食人以五气，地食人以五味', sourceType: 'classic_original', status: 'verified',
  },
  '升降出入，无器不有': {
    kind: 'B', canon: '《素问·六微旨大论》', chapter: '六微旨大论篇第六十八',
    originalText: '升降出入，无器不有', sourceType: 'classic_original', status: 'verified',
  },
  '卫气者，所以温分肉': {
    kind: 'B', canon: '《灵枢·本藏》', chapter: '本藏第四十七',
    originalText: '卫气者，所以温分肉，充皮肤，肥腠理，司开阖者也', sourceType: 'classic_original', status: 'verified',
  },
  '中焦受气取汁': {
    kind: 'B', canon: '《灵枢·决气》', chapter: '决气第三十',
    originalText: '中焦受气取汁，变化而赤，是谓血', sourceType: 'classic_original', status: 'verified',
  },
  '腠理发泄，汗出溱溱': {
    kind: 'B', canon: '《灵枢·决气》', chapter: '决气第三十',
    originalText: '腠理发泄，汗出溱溱，是谓津', sourceType: 'classic_original', status: 'verified',
  },
  '夺血者无汗，夺汗者无血': {
    kind: 'B', canon: '《灵枢·营卫生会》', chapter: '营卫生会第十八',
    originalText: '夺血者无汗，夺汗者无血', sourceType: 'classic_original', status: 'verified',
  },

  // ---------- 病因病机 ----------
  '怒则气上': {
    kind: 'B', canon: '《素问·举痛论》', chapter: '举痛论篇第三十九',
    originalText: '怒则气上，喜则气缓，悲则气消，恐则气下，寒则气收，炅则气泄，惊则气乱，劳则气耗，思则气结', sourceType: 'classic_original', status: 'verified',
  },
  '审察病机，无失气宜': {
    kind: 'B', canon: '《素问·至真要大论》', chapter: '至真要大论篇第七十四',
    originalText: '审察病机，无失气宜', sourceType: 'classic_original', status: 'verified',
  },
  '清气在下，则生飧泄': {
    kind: 'B', canon: '《素问·阴阳应象大论》', chapter: '阴阳应象大论篇第五',
    originalText: '清气在下，则生飧泄；浊气在上，则生䐜胀', sourceType: 'classic_original', status: 'verified',
  },
  '寒极生热，热极生寒': {
    kind: 'B', canon: '《素问·阴阳应象大论》', chapter: '阴阳应象大论篇第五',
    originalText: '寒极生热，热极生寒', sourceType: 'classic_original', status: 'verified',
  },
  '邪气盛则实，精气夺则虚': {
    kind: 'B', canon: '《素问·通评虚实论》', chapter: '通评虚实论篇第二十八',
    originalText: '邪气盛则实，精气夺则虚', sourceType: 'classic_original', status: 'verified',
  },
  '诸风掉眩皆属于肝': {
    kind: 'B', canon: '《素问·至真要大论》', chapter: '至真要大论篇第七十四',
    originalText: '诸风掉眩，皆属于肝', sourceType: 'classic_original', status: 'verified',
  },

  // ---------- 诊法 ----------
  '望而知之谓之神': {
    kind: 'B', canon: '《难经·六十一难》', chapter: '六十一难',
    originalText: '望而知之谓之神，闻而知之谓之圣，问而知之谓之工，切脉而知之谓之巧', sourceType: 'classic_original', status: 'verified',
  },
  '闻而知之谓之圣': {
    kind: 'B', canon: '《难经·六十一难》', chapter: '六十一难',
    originalText: '望而知之谓之神，闻而知之谓之圣，问而知之谓之工，切脉而知之谓之巧', sourceType: 'classic_original', status: 'verified',
  },
  '问而知之谓之工': {
    kind: 'B', canon: '《难经·六十一难》', chapter: '六十一难',
    originalText: '望而知之谓之神，闻而知之谓之圣，问而知之谓之工，切脉而知之谓之巧', sourceType: 'classic_original', status: 'verified',
  },
  '切而知之谓之巧': {
    kind: 'B', canon: '《难经·六十一难》', chapter: '六十一难',
    originalText: '望而知之谓之神，闻而知之谓之圣，问而知之谓之工，切脉而知之谓之巧', sourceType: 'classic_original', status: 'verified',
  },
  '得神者昌，失神者亡': {
    kind: 'B', canon: '《素问·移精变气论》', chapter: '移精变气论篇第十三',
    originalText: '得神者昌，失神者亡', sourceType: 'classic_original', status: 'verified',
  },
  '五脏六腑之精气皆上注于目': {
    kind: 'B', canon: '《灵枢·大惑论》', chapter: '大惑论第八十',
    originalText: '五脏六腑之精气，皆上注于目而为之精', sourceType: 'classic_original', status: 'verified',
  },
  '阳加于阴谓之汗': {
    kind: 'B', canon: '《素问·阴阳别论》', chapter: '阴阳别论篇第七',
    originalText: '阳加于阴谓之汗', sourceType: 'classic_original', status: 'verified',
  },
  '三部九候': {
    kind: 'B', canon: '《素问·三部九候论》', chapter: '三部九候论篇第二十',
    originalText: '故人有三部，部有三候，以决死生，以处百病，以调虚实，而除邪疾', sourceType: 'classic_original', status: 'verified',
  },
  '脉浮者，病在表': {
    kind: 'B', canon: '《伤寒论》', chapter: '辨太阳病脉证并治（第51条）',
    originalText: '脉浮者，病在表，可发汗，宜麻黄汤', sourceType: 'classic_original', status: 'verified',
  },
  '伤寒一日，太阳受之': {
    kind: 'B', canon: '《素问·热论》', chapter: '热论篇第三十一',
    originalText: '伤寒一日，巨阳受之，故头项痛腰脊强', sourceType: 'classic_original', status: 'verified',
    note: '「巨阳」即太阳，教材通行作「太阳」',
  },

  // ---------- 六经 / 本草 ----------
  '病有发热恶寒者，发于阳也；无热恶寒者，发于阴也': {
    kind: 'B', canon: '《伤寒论》', chapter: '辨太阳病脉证并治（第7条）',
    originalText: '病有发热恶寒者，发于阳也；无热恶寒者，发于阴也', sourceType: 'classic_original', status: 'verified',
  },
  '上药一百二十种为君': {
    kind: 'B', canon: '《神农本草经》', chapter: '序录',
    originalText: '上药一百二十种为君，主养命以应天', sourceType: 'classic_original', status: 'verified',
  },
  '援物比类，化之冥冥': {
    kind: 'B', canon: '《素问·示从容论》', chapter: '示从容论篇第七十六',
    originalText: '援物比类，化之冥冥', sourceType: 'classic_original', status: 'verified',
  },

  // ---------- 经络 ----------
  '根于涌泉，结于廉泉': {
    kind: 'B', canon: '《灵枢·根结》', chapter: '根结第五',
    originalText: '足少阴根于涌泉，结于廉泉', sourceType: 'classic_original', status: 'verified',
  },

  // ---------- 教学/临床总结语（保留 teaching_inference，给出思想依据） ----------
  '十二经脉，三百六十五络': {
    kind: 'K', canon: '', chapter: '',
    originalText: '十二经脉，三百六十五络',
    note: '后世教学概括：经脉十二见《灵枢·经脉》「经脉十二者，伏行分肉之间」；「三百六十五」之数见《灵枢·九针十二原》「节之交，三百六十五会」',
    sourceType: 'teaching_inference', status: 'teaching_inference',
  },
  '痛则不通': {
    kind: 'K', canon: '', chapter: '',
    originalText: '痛则不通，通则不痛',
    note: '临床总结语；思想依据《素问·举痛论》「客于脉中则气不通，故卒然而痛」',
    sourceType: 'teaching_inference', status: 'teaching_inference',
  },
  '舌为心之苗': {
    kind: 'K', canon: '', chapter: '',
    originalText: '舌为心之苗',
    note: '教学总结语；思想依据《灵枢·五阅五使》「舌者，心之官也」',
    sourceType: 'teaching_inference', status: 'teaching_inference',
  },
  '四诊合参，不可偏废': {
    kind: 'K', canon: '', chapter: '',
    originalText: '四诊合参，不可偏废',
    note: '教学原则语；思想依据《难经·六十一难》四诊分工与《素问·阴阳应象大论》「善诊者，察色按脉，先别阴阳」',
    sourceType: 'teaching_inference', status: 'teaching_inference',
  },
  '四大证': {
    kind: 'K', canon: '', chapter: '',
    originalText: '四大证',
    note: '临床概括（阳明四大证：大热、大汗、大渴、脉洪大）；思想依据《伤寒论》白虎汤证',
    sourceType: 'teaching_inference', status: 'teaching_inference',
  },
  '甘温除大热': {
    kind: 'K', canon: '', chapter: '',
    originalText: '甘温除大热',
    note: '后世治则术语（金元李东垣补中益气汤法）；思想依据《内外伤辨惑论》《脾胃论》',
    sourceType: 'teaching_inference', status: 'teaching_inference',
  },
};
