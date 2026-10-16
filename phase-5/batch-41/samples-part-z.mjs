// ============================================================
// 杏林大典 · Phase 5 · Batch-41 · 样本 Part Z（Z 中医急诊 补足 10 节点 pb41-z-001 ~ pb41-z-010）
// 学科：Z 中医急诊（学科上限补足批次）；覆盖：心脑血管急症/急腹症/泌尿与代谢急症/
//       过敏与复苏后/创伤性休克
// schema：{ id, title, category, difficulty, difficultyLabel, riskTags, intent,
//          facts[], classics[], dosage, cases, stdJudgment, coreDefinition,
//          safety:{note, prohibitions[]}, learning:{knowledge, misjudgment, reasoning, feedback, transfer} }
// category 一律 'clinical'；title 一律「急诊·病证·救治」式
// facts sourceTitle 限定：《中医急诊学》规划教材 / 《传染病学》规划教材 / 《温病学》规划教材 /
//   《方剂学》规划教材 / 《中药学》规划教材 / 《中国药典》 / 《伤寒论》规划教材，status 一律 'verified'
// classics 一律整书名 label（《素问》《灵枢》《伤寒论》《金匮要略》《诸病源候论》），篇名入 chapter，
//   originalText 逐字核对，sourceType:'classic_original'，status:'verified'，均已在 classic-patch.mjs 收录
// dosage 一律填写 guideline（参考剂量与给药途径）/ caution（禁忌与警戒），剂量与《中国药典》一致
// safety.prohibitions 一律含「急症须立即就医，本节点仅知识学习」；涉及附子/半夏/甘草红线药者
//   按 authoring-spec 第 4 节表逐一标注
// 难度分布：简单 3（diff 1）/ 中等 3（diff 2）/ 困难 2（diff 3）/ 易混综合 2（易混淆 1 + 综合推理 1）
// 机器味句式黑名单（authoring-spec 第 3 节）一律禁用
// ============================================================

export const PART_Z = [
  // ============================================================
  // Z 中医急诊 · 心脑血管急症（001–002、009）
  // ============================================================
  {
    id: 'pb41-z-001', title: '急诊·急性心肌梗死院前救治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['急性心肌梗死', '真心痛', '胸痛', '生脉散', '院前急救'],
    intent: '掌握急性心肌梗死院前识别、早期处理流程与中医辨证参与，理解时间就是心肌的原则。',
    facts: [
      { field: 'clinical.急危识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.院前处理', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.中医辨证', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.监护与转诊', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '胸痹心痛短气病脉证治第九', originalText: '胸痹之病，喘息咳唾，胸背痛，短气，寸口脉沉而迟，关上小紧数，栝蒌薤白白酒汤主之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '院前处理：立即停止活动静卧、吸氧，无禁忌时嚼服阿司匹林300mg、舌下含服硝酸甘油0.5mg，呼叫120转运；中医参与：气阴两虚者予生脉散（红参3~9g另煎兑服、麦冬12g、五味子6g）煎汤频服，气滞血瘀者可含服速效救心丸。', caution: '收缩压低于90mmHg或疑右室梗死时禁用硝酸甘油；胸痛未确诊前忌用镇痛药掩盖病情；转运途中持续监护心律血压，备除颤，症状不缓解直达胸痛中心。' },
    cases: null,
    stdJudgment: '急性心肌梗死院前救治贵在早期识别：持续胸骨后压榨痛超30分钟、含硝酸甘油不缓解、伴冷汗濒死感者按心梗处理；立即静卧、吸氧、阿司匹林嚼服并呼叫120，时间就是心肌。中医辨证多为气阴两伤或气滞血瘀，以生脉散益气固脱、速效救心丸行气活血，但绝不因用药延误再灌注治疗。',
    coreDefinition: '急性心肌梗死以持续胸痛、含硝酸甘油不缓解为识别要点，院前急救核心是静卧吸氧、抗血小板、尽快转运再灌注。',
    safety: { note: '心肌梗死是致死性急症，院前处理与再灌注治疗是生命线，中医辨证用药仅作辅助；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '胸痛未确诊前忌用镇痛药掩盖病情', '低血压或疑右室梗死者禁用硝酸甘油'] },
    learning: {
      knowledge: '急危识别：持续胸痛>30分钟、向左臂下颌放射、大汗、恶心呕吐、心电图ST段抬高或压低、肌钙蛋白升高。病机：心脉痹阻、气滞血瘀，甚则阳气暴脱。救治：先西医——静卧、吸氧、双抗（阿司匹林+氯吡格雷）、肝素、溶栓或PCI；中医辨证气阴两虚用生脉散，寒凝心脉用栝蒌薤白白酒汤，回阳救逆用参附汤。监护：持续心电监测，室颤时立即除颤。',
      misjudgment: '胸痛先做心电图正常即排除心梗。错：早期心梗心电图可完全正常，须动态复查并查肌钙蛋白，伴典型症状者不能因一次正常报告放松警惕。',
      reasoning: '同为胸痛，为何心梗强调忌用镇痛药，而肾绞痛胆绞痛可用解痉镇痛？',
      feedback: '心梗胸痛是缺血信号，镇痛掩盖后病情进展难察；急腹症疼痛重在解痉对症。止痛之前必先明确急危鉴别，以免误治。',
      transfer: '糖尿病患者发生无痛性心梗比例高，试按识别要点分析此类胸痛漏诊风险。',
    },
  },
  {
    id: 'pb41-z-002', title: '急诊·高血压急症处理', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['高血压急症', '肝阳暴亢', '羚角钩藤汤', '血压骤升'],
    intent: '掌握高血压急症的定义、初始降压目标与中医辨证处理，理解降压速度与靶器官的关系。',
    facts: [
      { field: 'clinical.急危识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.降压策略', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.监护与转诊', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《素问》', canon: '《素问》', chapter: '生气通天论篇第三', originalText: '阳气者，大怒则形气绝，而血菀于上，使人薄厥。', sourceTitle: '《素问》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '收缩压≥180mmHg和（或）舒张压≥120mmHg伴靶器官损害者按急症处理，立即静脉降压（硝普钠、乌拉地尔等），初始1小时内平均动脉压降幅不超过25%，2~6小时降至160/100mmHg左右；中医辨证肝阳暴亢者羚角钩藤汤（羚羊角1~3g磨冲或替代品、钩藤12g后下、菊花9g、石决明30g先煎、栀子9g、黄芩10g、白芍15g、生地黄15g、川贝母6g、茯神15g、竹茹9g、桑叶9g、甘草6g）口服或鼻饲。', caution: '降压忌过速过低以防脑肾灌注不足；舌下含服硝苯地平快速降压已不推荐；伴脑卒中、心衰、夹层者分别按相应流程处置。' },
    cases: null,
    stdJudgment: '高血压急症指血压骤升伴急性靶器官损害，须在严密监护下静脉降压，初始1小时平均动脉压降幅不超过25%，随后2~6小时渐降至160/100mmHg左右；中医多从肝阳暴亢、气火上逆立论，以羚角钩藤汤平肝息风，与西医降压并举，忌舌下含服硝苯地平之快速骤降。',
    coreDefinition: '高血压急症是血压显著升高伴心脑肾等靶器官急性损害的危象，须控速降压并保护靶器官。',
    safety: { note: '高血压急症可致脑卒中、心衰与夹层，降压宜缓不宜骤，须急诊监护下处理；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '舌下含服硝苯地平快速降压已不推荐', '伴主动脉夹层、脑出血者按专项流程处置'] },
    learning: {
      knowledge: '急危识别：血压≥180/120mmHg伴头痛、视物模糊、胸痛、气促、神经体征之一。病机：肝阳暴亢、气火上逆，血随气升菀于上。救治：静脉降压为主（硝普钠、乌拉地尔），初始1小时MAP降幅≤25%，再渐降；中医辨证肝阳上亢用羚角钩藤汤平肝息风、凉血宁神，痰热内扰者合用半夏白术天麻汤。监护：持续血压心电监测，观察神志瞳孔，脑卒中与夹层者分诊对应科室。',
      misjudgment: '血压升高即予舌下含服硝苯地平快速降压。错：快速骤降可致脑灌注不足而加重缺血，且降压幅度不可控；应选可调控的静脉制剂平稳降压。',
      reasoning: '同为高血压，为何门诊可口服缓降而急症须静脉控速降压？',
      feedback: '急症伴靶器官损害，血管自我调节已失效，骤降反致缺血损伤；静脉给药可滴定调控，平稳渐进方保灌注。',
      transfer: '长期服药依从性差的老人血压200/110mmHg伴头晕，试按急症与亚急症界线分析处置去向。',
    },
  },
  {
    id: 'pb41-z-009', title: '急诊·心脏骤停复苏后中医调理', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['心脏骤停', '复苏后综合征', '生脉散', '参附汤', '阳气暴脱'],
    intent: '掌握复苏后综合征的监护要点与气阴两伤、阳气暴脱的中医调理思路。',
    facts: [
      { field: 'clinical.复苏后识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.现代处理', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.监护要点', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '脏腑经络先后病脉证第一', originalText: '若五脏元真通畅，人即安和。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '自主循环恢复后进入复苏后管理：目标温度管理（32~36℃维持24小时以上）、机械通气与循环支持、纠正电解质酸碱失衡（西医）；中医辨证气阴两伤者生脉散（人参3~9g另煎兑服、麦冬12g、五味子6g）鼻饲，阳气暴脱者参附汤（红参10g另煎兑服、炮附子10g先煎久煎至无麻辣感）鼻饲，或予参附注射液静脉滴注。', caution: '附子须炮制先煎久煎至无麻辣感，反半夏瓜蒌贝母白蔹白及，孕妇禁用；中药仅作复苏后辅助调理，目标温度管理与生命支持是复苏成功关键。' },
    cases: null,
    stdJudgment: '心脏骤停复苏后进入复苏后综合征阶段，先以目标温度管理、通气循环支持维护脑与器官灌注；中医从气阴两伤或阳气暴脱论治，生脉散益气养阴、参附汤回阳固脱，鼻饲或静脉给药。中药参与须在生命支持框架内进行，不能替代除颤通气等现代技术。',
    coreDefinition: '复苏后中医调理针对气阴两伤与阳气暴脱，以生脉散、参附汤益气固脱，辅助现代复苏后管理。',
    safety: { note: '复苏后患者病情不稳，中药须在重症监护框架内经鼻饲或静脉途径给药；知识学习内容，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用'] },
    learning: {
      knowledge: '复苏后识别：自主循环恢复但昏迷、血流动力学不稳、低氧与酸中毒并存。病机：心肺骤停致气血阴阳俱脱，阳气暴脱或气阴两伤。救治：西医——亚低温治疗、目标血压管理、通气策略、控制血糖；中医——气阴两伤用生脉散益气养阴复脉，阳气暴脱用参附汤回阳救逆，瘀血内阻者酌加活血通络之品。监护：瞳孔、GCS评分、心电图、血乳酸动态观察，预防感染与再发骤停。',
      misjudgment: '复苏成功后立即大剂量温补峻剂，以为助阳即可回神。错：复苏后常有内环境紊乱与再灌注损伤，过量温燥耗阴助热，须辨气阴两伤与阳脱之别，小量频服、动态调整。',
      reasoning: '同为复苏后厥脱，为何有的用生脉散而有的用参附汤，抉择标准是什么？',
      feedback: '生脉散适于气阴两伤之汗多脉虚，参附汤适于阳脱之冷汗肢厥脉微；察汗之冷热、肢之温凉、脉之微数，厥脱性质立辨。',
      transfer: '溺水复苏成功后四肢厥冷者，试按阳脱思路讨论参附汤介入时机。',
    },
  },
  // ============================================================
  // Z 中医急诊 · 急腹症（003–005）
  // ============================================================
  {
    id: 'pb41-z-003', title: '急诊·急性胆囊炎胆胀救治', category: 'clinical', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['急性胆囊炎', '胆胀', '大柴胡汤', '右上腹痛', '半夏'],
    intent: '掌握急性胆囊炎胆胀的急危识别、通腑利胆治法与手术指征。',
    facts: [
      { field: 'clinical.急危识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.给药途径', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.手术指征', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '胀论第三十五', originalText: '胆胀者，胁下痛胀，口中苦，善太息。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '基础处理：禁食、胃肠减压、补液、抗感染、解痉（西医）；中医辨证少阳阳明合病者大柴胡汤（柴胡15g、黄芩10g、芍药15g、制半夏9g、生姜9g、枳实9g、大枣6枚、大黄6~9g后下）水煎口服或鼻饲，日1剂。', caution: '半夏生品有毒须炮制，反乌头类（含附子），孕妇慎用；大黄后下通腑，中病即止；坏疽性胆囊炎、穿孔、化脓性胆管炎伴黄疸休克者须急诊手术，不可延误。' },
    cases: null,
    stdJudgment: '急性胆囊炎以右上腹或胁下绞痛、放射右肩、发热口苦、莫菲征阳性为识别要点，伴黄疸高热提示胆道梗阻；中医辨为胆腑气滞、湿热蕴结，少阳阳明合病者大柴胡汤和解少阳、通腑泄热，禁食补液抗感染先行。坏疽穿孔及化脓性胆管炎者急诊手术。',
    coreDefinition: '急性胆囊炎属中医胆胀范畴，以胁下痛胀口苦为特征，大柴胡汤通腑利胆为常用治法。',
    safety: { note: '急性胆囊炎可并发穿孔与化脓性胆管炎，保守治疗须动态观察，黄疸休克者立即手术；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '半夏生半夏有毒须炮制；反乌头类（含附子）；孕妇慎用', '坏疽穿孔及化脓性胆管炎须急诊手术'] },
    learning: {
      knowledge: '急危识别：右上腹阵发绞痛、莫菲征阳性、发热、白细胞升高，伴黄疸高热寒战提示化脓性胆管炎。病机：胆失疏泄、湿热蕴结，少阳枢机不利。救治：禁食、补液、抗感染、解痉止痛，中医药以大柴胡汤和解少阳、内泻阳明，方中柴胡黄芩疏利肝胆、半夏生姜和胃、大黄枳实通腑泄热。监护：观察腹痛、黄疸、体温与血压，穿孔与休克者转外科手术。',
      misjudgment: '右上腹痛一律按胆囊炎抗炎解痉，不做影像学鉴别。错：右肾绞痛、十二指肠穿孔、胰腺炎亦可右上腹痛，须超声或CT明确后方可定方案，误判可延误急症手术。',
      reasoning: '同是右上腹痛，为何大柴胡汤与胆道排石方用药一攻一利有异？',
      feedback: '急性炎症之腑实当通，大柴胡汤和解通下并举；排石方以化石利胆为主，适宜慢性结石稳定期，急慢异治。',
      transfer: '进食油腻后右上腹剧痛伴发热者，试按胆胀思路列出禁食与观察要点。',
    },
  },
  {
    id: 'pb41-z-004', title: '急诊·急性胰腺炎腹痛救治', category: 'clinical', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['急性胰腺炎', '腹痛', '大承气汤', '腑实热结', '禁食'],
    intent: '掌握急性胰腺炎的识别、禁食减压基础处置与通腑泻热的中医救治。',
    facts: [
      { field: 'clinical.急危识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.基础处理', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.监护与转诊', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '腹满寒疝宿食病脉证治第十', originalText: '病者腹满，按之不痛为虚，痛者为实，可下之。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '基础处理：禁食水、胃肠减压、抑制胰酶分泌（生长抑素或奥曲肽）、抑酸、补液与营养支持（西医）；中医辨证腑实热结者大承气汤（大黄12g后下、芒硝9~12g冲服、枳实12g、厚朴24g）水煎口服或高位灌肠，日1~2剂，通腑后减量。', caution: '大黄后下、芒硝冲服，泻下后中病即止，防过泻伤津脱液；重症胰腺炎伴休克、ARDS、肾功能衰竭者入ICU；确诊前严格禁食水。' },
    cases: null,
    stdJudgment: '急性胰腺炎以饱餐饮酒后突发上腹剧痛、向腰背放射、腹胀呕吐、血尿淀粉酶升高为识别要点；先禁食减压、抑制胰酶分泌与补液，中医辨为腑实热结者以大承气汤通腑泻热、釜底抽薪，口服或灌肠促肠麻痹恢复。重症伴休克呼衰者转ICU，胆囊源性者处理胆道病因。',
    coreDefinition: '急性胰腺炎以剧烈上腹痛、血尿淀粉酶升高为特征，腑实热结者大承气汤通腑泻热为要。',
    safety: { note: '急性胰腺炎可迅速进展为重症，禁食减压与器官支持优先，通腑泻热须中病即止；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '确诊前严格禁食水', '重症胰腺炎伴休克、ARDS、肾衰者立即转ICU'] },
    learning: {
      knowledge: '急危识别：上腹持续性剧痛、腰背放射、腹胀、呕吐、血淀粉酶升高3倍以上、CT见胰腺肿胀坏死。病机：肝胆湿热、食积壅滞，腑气不通，气滞血瘀。救治：西医——禁食、胃肠减压、生长抑素抑制分泌、液体复苏；中医——腑实热结大承气汤通腑泻下，湿热中阻合清胰汤（柴胡、黄芩、胡黄连、白芍、木香、延胡索、大黄、芒硝）疏利。监护：尿量、血氧、乳酸与腹压监测，多器官衰竭者血液净化。',
      misjudgment: '腹痛减轻即恢复进食。错：胰腺修复需时，过早进食可诱发再燃，须待腹痛消失、淀粉酶下降并逐步由流质过渡，防复发。',
      reasoning: '同为腑实证，为何胰腺炎之大承气汤宜灌肠与口服并用而忌峻下过剂？',
      feedback: '灌肠直达结肠促肠蠕动、减轻腹压，口服促胃肠功能恢复；峻下过剂则津液外脱，加重重症之虚损，故中病即止。',
      transfer: '高脂血症诱发胰腺炎反复者，试按预防复发思路设计出院调护要点。',
    },
  },
  {
    id: 'pb41-z-005', title: '急诊·急性阑尾炎肠痈救治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['急性阑尾炎', '肠痈', '大黄牡丹汤', '转移性右下腹痛'],
    intent: '掌握急性阑尾炎肠痈的分期辨证、大黄牡丹汤应用与手术指征。',
    facts: [
      { field: 'clinical.急危识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.分期辨证', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.手术指征', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '疮痈肠痈浸淫病脉证并治', originalText: '肠痈者，少腹肿痞，按之即痛如淋，小便自调，时时发热，自汗出，复恶寒。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '未穿孔的单纯性与早期化脓性阑尾炎可在严密监护下保守：大黄牡丹汤（大黄9~12g后下、牡丹皮12g、桃仁9g、冬瓜子15g、芒硝6~9g冲服）水煎，日1剂分2次服，痛减脓成者转薏苡附子败酱散须辨证。', caution: '芒硝冲服、大黄后下，泻下中病即止；毒热期穿孔、腹膜炎、阑尾周围脓肿及小儿老人孕妇阑尾炎宜手术，保守期间腹痛加剧、腹肌紧张加重须立即中转手术。' },
    cases: null,
    stdJudgment: '急性阑尾炎以转移性右下腹痛、麦氏点压痛反跳痛为识别要点，发热、肌紧张提示腹膜炎；中医辨为肠腑热毒壅滞、气血瘀结，瘀滞期与蕴热期以大黄牡丹汤泻热破瘀、消肿排脓，保守须严加监护。毒热期穿孔腹膜炎者手术，不可迁延。',
    coreDefinition: '急性阑尾炎属肠痈，以转移性右下腹痛为特征，大黄牡丹汤泻热破瘀，毒热期手术。',
    safety: { note: '阑尾炎保守治疗仅适于早期轻症且须外科监护，疑穿孔或婴幼儿孕妇者手术；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '穿孔、腹膜炎及阑尾周围脓肿须手术治疗', '小儿、老人、孕妇阑尾炎宜尽早手术'] },
    learning: {
      knowledge: '急危识别：转移性右下腹痛、麦氏点压痛、反跳痛与肌紧张、发热白细胞升高。病机：湿热蕴结肠腑、气滞血瘀成痈。分期：瘀滞期腹痛局限、身无热；蕴热期发热口渴、压痛反跳痛；毒热期高热、全腹膜炎体征。救治：大黄牡丹汤泻热破瘀、散结消肿，瘀滞蕴热期用之，脓已成或毒热期以手术或薏苡附子败酱散排脓。监护：观察腹痛范围与体温，包块增大或高热不退转外科。',
      misjudgment: '右下腹痛初起即按肠痈投大黄牡丹汤，不作鉴别。错：右输尿管结石、附件炎、克罗恩病可酷似阑尾炎，须血常规、超声或CT排除后用药，误用峻下可致穿孔扩散。',
      reasoning: '肠痈脓已成与未成，为何治法一下一托截然不同？',
      feedback: '脓未成热瘀在肠，下之使毒从下泄；脓已成正气受损，下之反使脓毒内陷，故《金匮》明言脓已成不可下，当排脓托毒。',
      transfer: '孕妇右下腹痛疑似阑尾炎者，试分析手术与保守抉择的难点。',
    },
  },
  // ============================================================
  // Z 中医急诊 · 泌尿与代谢急症（006–007）
  // ============================================================
  {
    id: 'pb41-z-006', title: '急诊·输尿管结石绞痛救治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['输尿管结石', '肾绞痛', '石淋', '石韦散', '排石'],
    intent: '掌握输尿管结石绞痛发作的解痉止痛与中药排石思路，理解梗阻感染的急诊指征。',
    facts: [
      { field: 'clinical.急危识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.止痛处理', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.监护与转诊', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《诸病源候论》', canon: '《诸病源候论》', chapter: '淋病诸候', originalText: '石淋者，淋而出石也。', sourceTitle: '《诸病源候论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '绞痛发作先解痉镇痛（阿托品类或非甾体抗炎药），鼓励大量饮水；中药石韦散加减（石韦12g、冬葵子12g、瞿麦15g、滑石30g包煎、车前子15g包煎，加金钱草30g、海金沙15g包煎、鸡内金10g）水煎，日1剂。', caution: '瞿麦孕妇禁用，滑石车前子包煎；伴发热寒战、恶心呕吐、无尿或血尿加重者提示结石梗阻合并感染，须急诊引流或碎石，不可单纯排石。' },
    cases: null,
    stdJudgment: '输尿管结石绞痛以腰腹阵发剧痛、向下腹会阴放射、肉眼血尿为识别要点，超声示肾积水可定梗阻部位；发作时先解痉镇痛、大量饮水，中药石韦散合三金排石汤利水通淋排石。发热伴无尿提示梗阻感染，须急诊解除梗阻，排石药物不可替代引流。',
    coreDefinition: '输尿管结石绞痛属石淋，以腰腹绞痛与血尿为特征，治以利水通淋排石，梗阻感染须急诊引流。',
    safety: { note: '结石绞痛合并感染与无尿是急诊指征，排石中药不能替代梗阻解除；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '梗阻合并感染、无尿者须急诊引流或碎石', '瞿麦孕妇禁用'] },
    learning: {
      knowledge: '急危识别：突发腰腹绞痛、沿输尿管走向放射、肉眼血尿、肾区叩击痛，发热寒战提示感染。病机：湿热蕴结下焦、煎熬尿液成石，石阻气机、不通则痛。救治：解痉镇痛与补液在先，中药石韦散利水通淋，金钱草海金沙鸡内金化石排石，绞痛缓解后大量饮水配合跳跃运动促排。监护：结石>1cm、积水加重或合并感染转泌尿外科。',
      misjudgment: '绞痛一止便不再处理，任结石留存。错：静止结石可再梗阻并损害肾功，缓解期仍须排石与随访复查，监测积水与结石变化。',
      reasoning: '同是血尿腹痛，为何输尿管结石禁做腹部加压检查，而阑尾炎要查反跳痛？',
      feedback: '结石绞痛为内脏痛，按压无定位意义反增痛苦；阑尾炎查腹膜刺激征以定炎症范围，查体设计因病变性质而异。',
      transfer: '反复肾绞痛的饮水少者，试按预防结石复发思路设计生活干预。',
    },
  },
  {
    id: 'pb41-z-007', title: '急诊·痛风急性发作救治', category: 'clinical', difficulty: 1, difficultyLabel: '简单',
    riskTags: ['痛风', '急性发作', '四妙丸', '浊瘀痹阻', '关节红肿'],
    intent: '掌握痛风急性发作的识别、早期抗炎用药与清热利湿的中医救治，理解急性期用药禁忌。',
    facts: [
      { field: 'clinical.急危识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.西医处理', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.调护要点', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《金匮要略》', canon: '《金匮要略》', chapter: '中风历节病脉证并治第五', originalText: '病历节，不可屈伸，疼痛。', sourceTitle: '《金匮要略》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '急性发作卧床休息、抬高患肢、局部冷敷，尽早予秋水仙碱或非甾体抗炎药（西医）；中医辨证湿热下注、浊瘀痹阻者四妙丸加减（苍术9g、黄柏12g、牛膝12g、薏苡仁30g，加土茯苓30g、萆薢15g、忍冬藤30g）水煎，日1剂分2次服。', caution: '急性期不宜启动降尿酸药快速纠酸，防尿酸波动诱发转移性发作；秋水仙碱小剂量起始、消化道反应即停；忌海鲜、动物内脏、啤酒等高嘌呤饮食。' },
    cases: null,
    stdJudgment: '痛风急性发作以第一跖趾关节骤发红肿热痛、剧痛如刀割、血尿酸升高为识别要点；治疗先卧床冷敷、尽早抗炎镇痛，中医辨为湿热浊瘀流注关节，四妙丸清热利湿、加土茯苓萆薢泄浊。急性期忌用降尿酸药快速纠酸，缓解期再行达标治疗。',
    coreDefinition: '痛风急性发作以关节红肿热痛骤发为特征，治以清热利湿泄浊，急性期禁忌快速降尿酸。',
    safety: { note: '痛风急性期以抗炎镇痛为先，降尿酸方案须于缓解期启动；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '急性期不宜快速降尿酸以防转移性发作', '秋水仙碱小剂量、消化道反应即停用'] },
    learning: {
      knowledge: '急危识别：单关节（第一跖趾常见）红肿灼热、触痛剧烈、活动受限，伴发热与血尿酸升高。病机：脾肾亏虚、湿热浊瘀内蕴，流注关节经脉。救治：西医——非甾体抗炎药或秋水仙碱尽早使用，激素关节腔或短期口服；中医——四妙丸加土茯苓、萆薢、忍冬藤清热利湿、泄浊通络，外敷金黄散消肿。调护：卧床抬高患肢，多饮水碱化尿液，忌高嘌呤饮食。',
      misjudgment: '痛风急性发作时加大降尿酸药剂量以求迅速达标。错：血尿酸骤降致关节内结晶脱落再发剧痛，急性期应以抗炎为主，降尿酸于缓解期从小剂量渐增。',
      reasoning: '同为关节红肿热痛，为何痛风多下足而化脓性关节炎可于任何关节？',
      feedback: '痛风结晶喜沉降于远端小关节、足底血供凉处，故第一跖趾独多；化脓性关节炎循感染途径而定，辨位有助于病因鉴别。',
      transfer: '足趾红肿热痛伴发热疑痛风者，试按鉴别要点排查感染性关节炎。',
    },
  },
  // ============================================================
  // Z 中医急诊 · 过敏与创伤（008、010）
  // ============================================================
  {
    id: 'pb41-z-008', title: '急诊·过敏性休克急救', category: 'clinical', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['过敏性休克', '厥脱', '肾上腺素', '参附汤', '附子'],
    intent: '掌握过敏性休克的识别、肾上腺素一线急救与阳脱证的中医参与，理解中西急救次序。',
    facts: [
      { field: 'clinical.急危识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.一线急救', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.监护要点', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《伤寒论》', canon: '《伤寒论》', chapter: '辨少阴病脉证并治', originalText: '少阴之为病，脉微细，但欲寐也。', sourceTitle: '《伤寒论》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '立即停用致敏物，保持气道通畅，肌注肾上腺素0.3~0.5mg（成人，可间隔5~15分钟重复），快速补液，糖皮质激素与抗组胺药辅助（西医）；阳气暴脱者参附汤（红参10g另煎兑服、炮附子10g先煎久煎至无麻辣感）鼻饲或口服，或参附注射液静脉。', caution: '肾上腺素是过敏性休克一线救命药物，不可因等待中药而延误；附子须炮制先煎久煎至无麻辣感，反半夏瓜蒌贝母白蔹白及，孕妇禁用；喉头水肿窒息者立即气管插管或环甲膜穿刺。' },
    cases: null,
    stdJudgment: '过敏性休克以接触过敏原后速发皮疹、喉紧气促、血压骤降、神志淡漠为识别要点；立即停用致敏物并肌注肾上腺素，快速补液维持循环；中医辨为阳脱证，参附汤回阳救逆、生脉散益气固脱可辅助，但绝不延迟肾上腺素给药，喉头水肿者即刻建立气道。',
    coreDefinition: '过敏性休克是速发型变态反应致循环衰竭，急救一线为肾上腺素，中医参附汤回阳救逆辅助。',
    safety: { note: '过敏性休克抢救黄金时间极短，肾上腺素与气道管理优先于一切药物；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '肾上腺素为一线用药，不可因中药延误', '附子须炮制先煎久煎至无麻辣感；反半夏瓜蒌贝母白蔹白及；孕妇禁用', '喉头水肿窒息者立即气管插管或环甲膜穿刺'] },
    learning: {
      knowledge: '急危识别：接触药物、食物或虫咬后速发荨麻疹、喉头水肿、喘息、血压下降、意识改变。病机：正气骤虚、阴竭阳脱，肺卫闭塞、气道不利。救治：西医——肌注肾上腺素0.3~0.5mg、补液、糖皮质激素；中医——阳脱用参附汤回阳救逆，气阴两竭用生脉散，汗出肢厥脉微者急煎频服。监护：气道、血压、脉氧动态监测，双相反应者观察24小时。',
      misjudgment: '皮疹不明显即否认过敏性休克，或先予抗组胺药等待。错：休克可在皮疹出现前发生，抗组胺药不能升压；凡过敏原接触后循环衰竭者，按过敏性休克处理并即刻肾上腺素。',
      reasoning: '同为休克，为何过敏性休克首选肾上腺素而低血容量休克首选补液扩容？',
      feedback: '过敏性休克核心是血管扩张与通透性骤增，肾上腺素收缩血管、缓解支气管痉挛并举；低血容量休克容量不足为主，扩容为先，机制不同则首选各异。',
      transfer: '青霉素皮试后即感喉紧心慌者，试按速发反应流程推演处置步骤。',
    },
  },
  {
    id: 'pb41-z-010', title: '急诊·创伤性休克液体复苏与监护', category: 'clinical', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['创伤性休克', '液体复苏', '可允许性低血压', '血脱', '监护'],
    intent: '掌握创伤性休克的控制性液体复苏策略与监护指标，理解血脱益气的中医参与。',
    facts: [
      { field: 'clinical.急危识别', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.病机', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.液体复苏', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
      { field: 'clinical.主方', sourceType: 'textbook', sourceTitle: '《方剂学》规划教材', status: 'verified' },
      { field: 'clinical.监护指标', sourceType: 'textbook', sourceTitle: '《中医急诊学》规划教材', status: 'verified' },
    ],
    classics: [
      { label: '《灵枢》', canon: '《灵枢》', chapter: '决气第三十', originalText: '血脱者，色白，夭然不泽，其脉空虚，此其候也。', sourceTitle: '《灵枢》', sourceType: 'classic_original', status: 'verified' },
    ],
    dosage: { guideline: '先控制出血（加压包扎、止血带、骨盆带）、畅通气道；液体复苏采用限制性策略：晶体液（平衡盐）首选，成人初始快速输注500~1000ml，活动性出血未控制时维持收缩压80~90mmHg或桡动脉搏动可触及，及时配血输注红细胞与血浆；中医辨证血脱气随血脱者独参汤（人参10~15g浓煎频服）或当归补血汤（黄芪30g、当归6g）口服或鼻饲。', caution: '颅脑损伤者禁用可允许性低血压；大量晶体后须输注血液制品防稀释性凝血病；低体温、酸中毒、凝血病为致死三联征须同步处理。' },
    cases: null,
    stdJudgment: '创伤性休克以失血失液致组织灌注不足为特征，急救先控出血、后限制性复苏：未控制出血时晶体液维持收缩压80~90mmHg即可，避免过量补液稀释凝血因子；颅内损伤者例外。中医以血脱益气为法，独参汤、当归补血汤大补元气以摄血固脱，但输血手术止血不可替代。',
    coreDefinition: '创伤性休克按失血程度分层复苏，活动性出血者限制性补液维持低血压，血脱益气为中医治法。',
    safety: { note: '创伤性休克救治核心是止血与确定性治疗，液体复苏须与输血策略协调，避免复苏不足与过量两端；辨证论治知识学习，临床用药须遵医嘱', prohibitions: ['急症须立即就医，本节点仅知识学习', '颅脑损伤者禁用可允许性低血压', '大量晶体后须输注血液制品，防稀释性凝血病'] },
    learning: {
      knowledge: '急危识别：创伤后面色苍白、四肢湿冷、脉细速、尿量减少、收缩压下降。病机：大量失血、气随血脱、阴竭阳亡。救治：控出血（止血带、填塞、手术）、限制性液体复苏、按比例输注红细胞血浆血小板、抗纤溶药氨甲环酸；中医血脱者独参汤益气固脱、当归补血汤补气生血。监护：心率血压、尿量≥0.5ml/(kg·h)、乳酸、中心静脉压与体温，动态复查血常规凝血。',
      misjudgment: '活动性出血未控制时按常规补足晶体液，使血压升至正常。错：补液扩容稀释凝血因子并冲脱血凝块，出血反增；未控制出血宜维持可允许性低血压，尽早手术止血。',
      reasoning: '同样失血性休克，为何颅脑损伤者反不宜可允许性低血压？',
      feedback: '脑灌注依赖足够灌注压，低血压加重继发脑缺血损伤；故颅脑损伤须维持较高灌注压，限制性复苏不适用，个体化权衡两难。',
      transfer: '工地高处坠落多发伤血压80/50mmHg者，试按控出血与复苏次序编排处置流程。',
    },
  },
];
