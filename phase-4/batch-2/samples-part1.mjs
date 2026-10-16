// ============================================================
// 杏林大典 · Phase 4 · Batch-2 · 样本 Part 1（领域 01–07，21 节点）
// 完全复用 phase-3a.1/pipeline.mjs（L1–L6 + Gate A–K）+ Q1–Q8
// 选题依据：phase-4/coverage-matrix.json 的 pending 节点（Core 优先）
// 本文件是「生成器天然输出形态」：含已知失败模式，由管线源头修复。
// ============================================================

export const SAMPLES_PART1 = [
  // ============================================================
  // 01 中医学基础认知
  // ============================================================
  {
    id: 'pb2-th-01-05', title: '同病异治与异病同治', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['辨证论治应用', '教学术语边界'],
    intent: '辨证论治的应用形态：同病异治/异病同治的原理与边界，区分「病」与「证」',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.examples', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.boundary', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '同病异治与异病同治是辨证论治的应用体现，着眼点始终是「证」而非「病」',
    coreDefinition: '同病异治：同一疾病证候不同治法各异；异病同治：不同疾病证候相同可同治',
    safety: {},
    learning: {
      knowledge: '同病异治指同一疾病因证候不同而治法不同；异病同治指不同疾病出现相同证候可采用相同治法。核心是「证同治同、证异治异」。',
      misjudgment: '把「同病异治」理解成同一病随便换药。错：换的是证不是病，感冒风寒用辛温、风热用辛凉，改的是证候属性。',
      reasoning: '两位患者都诊断「感冒」，一位恶寒重发热轻无汗脉浮紧，一位发热重恶寒轻咽痛脉浮数，为何治法一温一凉？',
      feedback: '因为证不同：前者风寒表实证宜辛温解表，后者风热犯卫宜辛凉解表。辨证论治辨的是当下的证，不是套病名。',
      transfer: '「异病同治」的经典例子是脾气下陷导致胃下垂与脱肛，都用补中益气汤，为什么？',
    },
  },
  {
    id: 'pb2-th-01-06', title: '因时因地因人制宜', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['三因制宜', '治则应用'],
    intent: '三因制宜原则与临床实例，注意与「治病求本」的关系',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.season', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.individual', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [{ label: '因时制宜', canon: '', chapter: '', sourceTitle: '《素问·六元正纪大论》', sourceType: 'classic_original', status: 'verified', originalText: '用寒远寒，用凉远凉，用温远温，用热远热' }],
    dosage: null,
    cases: null,
    stdJudgment: '三因制宜强调治疗须因时、因地、因人而变，是整体观念在治疗上的落实',
    coreDefinition: '因时制宜（季节昼夜）、因地制宜（地域）、因人制宜（体质年龄性别）',
    safety: {},
    learning: {
      knowledge: '三因制宜包括因时制宜（春生夏长，用药顺时）、因地制宜（北方燥寒、南方湿热）、因人制宜（体质、年龄、性别、生活习惯）。',
      misjudgment: '把「因人制宜」窄化为「看体质」。错：还包括年龄（小儿脏腑娇嫩、老人气血衰）、性别（经带胎产）、禀赋强弱。',
      reasoning: '同是外感风寒，江南梅雨季节的患者与西北干燥地区的患者，治法有何差异？',
      feedback: '江南湿重，宜解表兼化湿；西北燥寒，宜辛温解表兼顾津液。同一证型因地域气候不同，用药配伍就有差别。',
      transfer: '夏季贪凉饮冷致腹泻，与冬季受寒腹泻，治疗思路为何不同？',
    },
  },

  // ============================================================
  // 02 阴阳
  // ============================================================
  {
    id: 'pb2-th-02-07', title: '阴阳的相对性', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['相对属性', '无限可分'],
    intent: '阴阳的相对性：无限可分、随比较对象而变，避免绝对化理解',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.division', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [{ label: '阴阳', canon: '阴阳应象大论篇第五', chapter: '', sourceTitle: '《素问·阴阳应象大论》', sourceType: 'classic_original', status: 'verified', originalText: '阴阳者，天地之道也' }],
    dosage: null,
    cases: null,
    stdJudgment: '阴阳属性依比较对象而相对确立，无限可分，不可绝对化到具体事物',
    coreDefinition: '阴阳的相对性：对立面、可分性（阴阳之中复有阴阳）、转化性',
    safety: {},
    learning: {
      knowledge: '阴阳的相对性有三层：一是与对立面比较而定（上为阳下为阴是相对而言）；二是无限可分（昼为阳，上午为阳中之阳，下午为阳中之阴）；三是相互转化（重阴必阳）。',
      misjudgment: '把「背为阳」当绝对结论。错：背之阳是对腹而言；背内部还有阴阳之分（背之上半与下半）。任何具体属性都须先定参照。',
      reasoning: '同为胸腹，为何「腹为阴」而「背为阳」？若把心与肾比较，阴阳又如何划分？',
      feedback: '腹居下、内藏阴脏故为阴，背居上、外为阳位故为阳，这是位置相对。心在上属阳、肾在下属阴，但心肾中又各含阴阳。参照不同，结论不同。',
      transfer: '若用阴阳的相对性解释「阴中有阳、阳中有阴」，举例说明人体的例子。',
    },
  },
  {
    id: 'pb2-th-02-14', title: '阴平阳秘', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['经典原文', '健康状态'],
    intent: '阴平阳秘作为健康状态的核心描述，辨析「平」「秘」的含义',
    facts: [
      { field: 'theory.definition', sourceType: 'classic_original', sourceTitle: '《素问·生气通天论》', chapter: '生气通天论篇第三', status: 'verified' },
      { field: 'theory.meaning', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '阴平阳秘指阴阳各安其位、协调平衡的健康稳态，是治未病的理论根基',
    coreDefinition: '阴气平顺、阳气固秘，阴阳协调则精神乃治',
    safety: {},
    learning: {
      knowledge: '「阴平阳秘，精神乃治；阴阳离决，精气乃绝」出自《素问·生气通天论》。阴平指阴气平顺不亢不亏，阳秘指阳气固密不外泄，二者协调是健康状态。',
      misjudgment: '把「阴平阳秘」理解成「阴阳绝对相等、各占一半」。错：平衡是动态协调，不是数量均等，阳气固秘与阴精平顺各司其职。',
      reasoning: '患者长期熬夜、心烦失眠、汗出过多，为何说这是「阳秘」被破坏而非单纯阴虚？',
      feedback: '汗为心之液，阳气固密才能摄汗；汗出过多、神志浮越说明阳不固秘、阴亦失守。阴阳是相互维系的，一方失守则整体失衡。',
      transfer: '「阴平阳秘」与「阴阳离决」是两个极端，中间还有哪些阴阳失调的层次？',
    },
  },
  {
    id: 'pb2-th-02-15', title: '阴阳综合案例', category: 'theory', difficulty: 5, difficultyLabel: '综合推理',
    riskTags: ['C4', '综合推理'],
    intent: 'C4：多维度阴阳分析，要求假设→证据→反证→修正',
    facts: [
      { field: 'theory.case', sourceType: 'textbook', sourceTitle: '《中医诊断学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: {
      level: 'C4',
      originalJudgment: '患者面红、身热、烦躁、口渴，初步判断为阳热亢盛证',
      c3Evidence: ['面红目赤，身热喜冷（症状事实）', '舌红苔黄，脉数有力（舌脉体征）', '口渴喜冷饮，大便干结（症状事实）'],
      counterEvidence: '但患者四肢厥冷、但欲寐、小便清长，且脉虽数却重按无力',
      revision: '综合判断为阴盛格阳的真寒假热证而非阳热亢盛；面红身热是格阳于外的假象，四肢厥冷、小便清长、脉重按无力为真寒之本，治疗当回阳救逆而非清热泻火',
    },
    stdJudgment: '阴阳失调须辨真假标本，面红身热可因格阳而起，不可见热即清',
    coreDefinition: '阴阳失调的复杂形式：格拒、转化与真假',
    safety: {},
    learning: {
      knowledge: '阴阳失调包括偏盛、偏衰、互损、格拒、亡失。阴盛格阳可见「面红如妆、身热反不欲近衣」等假热象，须透过假象抓本质。',
      misjudgment: '见到面红身热就清泄阳热。错：真寒假热时清热如雪上加霜，回阳救逆才是正治，辨真假是生死关键。',
      reasoning: '同样是发热，如何区分阳明气分热盛与阴盛格阳？',
      feedback: '看全身状态与脉象：真热者四肢虽厥但胸腹灼热、脉滑实有力、欲饮冷；真寒者四肢厥冷且身虽热反欲盖衣被、脉虽数重按无力、小便清长。',
      transfer: '若患者真寒假热被误用寒凉后病情加重，病机如何变化？',
    },
  },

  // ============================================================
  // 03 五行
  // ============================================================
  {
    id: 'pb2-th-03-01', title: '五行基本概念', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['哲学基础', '取象比类'],
    intent: '五行学说的定义、起源与哲学基础，明确其作为方法模型的性质',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.origin', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [{ label: '木曰曲直', canon: '', chapter: '', sourceTitle: '《尚书·洪范》', sourceType: 'classic_original', status: 'verified', originalText: '水曰润下，火曰炎上，木曰曲直，金曰从革，土爰稼穑' }],
    dosage: null,
    cases: null,
    stdJudgment: '五行是取象比类的说理模型，木火土金水各有特性，用以归纳自然与人体',
    coreDefinition: '木曰曲直、火曰炎上、土爰稼穑、金曰从革、水曰润下',
    safety: {},
    learning: {
      knowledge: '五行指木、火、土、金、水五类事物的属性及其运动变化。最早见于《尚书·洪范》「水曰润下，火曰炎上……」，中医借其生克制化构建藏象理论。',
      misjudgment: '把五行当成五种具体物质或元素。错：五行是「属性归类」的方法模型，木不是树木，而是曲直生长的属性。',
      reasoning: '为何肝脏配属木而不是其他？依据是什么？',
      feedback: '肝主疏泄、喜条达恶抑郁，其性舒展升发，与木的「曲直生长、伸展条达」之性相类，故以取象比类配属。',
      transfer: '五行归类是把「象」相同的归为一类。若某事物兼有多个五行属性，如何归置？',
    },
  },
  {
    id: 'pb2-th-03-05', title: '五行相克', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['相克次序', '克我我克'],
    intent: '五行相克次序与「克我/我克」关系，注意与相乘区别',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.order', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '木克土、土克水、水克火、火克金、金克木，制约是维持平衡的常序',
    coreDefinition: '相克次序与所胜所不胜（克我者为我所不胜，我克者为我所胜）',
    safety: {},
    learning: {
      knowledge: '五行相克次序：木克土、土克水、水克火、火克金、金克木。对木而言，克我者为金（所不胜），我克者为土（所胜）。',
      misjudgment: '把「相克」等同于「相害」。错：常序相克是正常制约、维持平衡；相乘才是过度克制为病，二者程度与性质不同。',
      reasoning: '肝木过旺横逆犯脾（木乘土），这属于相克还是相乘？为什么？',
      feedback: '属于相乘。正常相克是木对土的适度制约；肝气过旺对脾的克制超过常态即为相乘，是病理传变。',
      transfer: '「见肝之病，知肝传脾，当先实脾」的治未病思想，用五行关系如何解释？',
    },
  },
  {
    id: 'pb2-th-03-07', title: '五行乘侮', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['相乘', '相侮', '病理传变'],
    intent: '相乘与相侮的区分：过克为乘、反克为侮，方向相反',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.example', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '相乘是克之大过（循相克方向），相侮是反向克制，均属五行关系失常',
    coreDefinition: '相乘（木乘土、土乘水等）、相侮（木侮金、金侮火等）',
    safety: {},
    learning: {
      knowledge: '相乘是相克太过，如肝木过旺乘脾土；相侮是反向克制，如肝木过旺反侮肺金。二者都源于某行太强或某行太弱。',
      misjudgment: '把「相侮」与「相乘」记反。错：乘是顺方向的过度克制（木→土），侮是逆方向的欺侮（木→金），方向完全相反。',
      reasoning: '患者肝火犯肺见咳逆上气、胸胁灼痛，这是相乘还是相侮？',
      feedback: '相侮。正常是金克木，肝火过旺反向凌金，属「木火刑金」，是五行反克。若肝乘脾见脘腹胀痛，才是相乘。',
      transfer: '土虚水泛（脾虚水肿）是相乘还是相侮？请按五行关系推导。',
    },
  },

  // ============================================================
  // 04 藏象
  // ============================================================
  {
    id: 'pb2-th-04-01', title: '藏象基本概念', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['藏象定义', '藏与脏'],
    intent: '藏象学说的定义与形成基础，区分中医「藏」与现代解剖脏器',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.formation', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '藏象是藏于内而象于外的系统学说，中医之「藏」是功能系统而非解剖器官',
    coreDefinition: '藏（脏）与象的关系：藏于内、象于外，司外揣内',
    safety: {},
    learning: {
      knowledge: '藏象学说通过人体外在的生理病理现象（象）推知内在脏腑（藏）的功能状态。中医的「心」涵盖主血脉、主神志等功能系统，不等同于解剖心脏。',
      misjudgment: '把中医「心肝脾肺肾」直接对号现代解剖器官。错：中医五脏是功能集合体，如「脾」主运化涉及消化吸收与免疫等多系统。',
      reasoning: '中医说「心藏神」，但现代医学认为思维在大脑，两者矛盾吗？',
      feedback: '不矛盾。「心藏神」是功能归类：神志活动与心血充盈密切相关，心主血脉为神志提供物质基础。中西医是不同认识体系，不必强行对应。',
      transfer: '「肾主骨生髓通于脑」如何从藏象角度理解？它与现代「肾」有何区别？',
    },
  },
  {
    id: 'pb2-th-04-08', title: '六腑总论', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['传化物而不藏', '以通为用'],
    intent: '六腑共同特点与「以通为用」的生理特性',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.character', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [{ label: '传化物而不藏', canon: '', chapter: '', sourceTitle: '《素问·五脏别论》', sourceType: 'classic_original', status: 'verified', originalText: '六腑者，传化物而不藏，故实而不能满也' }],
    dosage: null,
    cases: null,
    stdJudgment: '六腑传化物而不藏、实而不能满，以通降为用，不通则病',
    coreDefinition: '六腑（胆胃小肠大肠膀胱三焦）的共同生理特点',
    safety: {},
    learning: {
      knowledge: '六腑共同特点是传化水谷、泄而不藏，贵在通畅。故有「六腑以通为用、以降为顺」之说，腑气不通则病（如便秘、癃闭）。',
      misjudgment: '以为六腑「以通为用」就是都要用泻药。错：通是保持传化功能正常，泻法只是恢复通畅的手段之一，且须辨证。',
      reasoning: '为什么六腑病变多表现为「不通」？举例说明。',
      feedback: '六腑形态中空、功能传化，任何环节阻滞都会病：胃气不降则呕恶，肠腑不通则腹痛便秘，膀胱气化不利则癃闭。',
      transfer: '「胃气以降为和」与「脾主升清」如何配合维持中焦气机？',
    },
  },
  {
    id: 'pb2-th-04-16', title: '五脏之间的关系', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['心肾相交', '肝脾相关', '五脏协调'],
    intent: '五脏间主要关系：心肾水火既济、肝脾木土相克、肺肾金水相生',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.example', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '五脏通过生克制化相互联系，心肾相交、肝脾相克、肺肾相生是核心关系',
    coreDefinition: '心肾相交（水火既济）、肝脾相克（木乘土）、肺肾相生（金水相生）等',
    safety: {},
    learning: {
      knowledge: '五脏关系：心肾相交（心火下温肾水、肾水上济心火）；肝脾相克（肝木疏土、脾土荣木）；肺肾相生（金水相生，肺为水之上源）；脾肺相关（培土生金）。',
      misjudgment: '把心肾相交理解成心与肾两个器官直接相连。错：是功能层面的水火既济，心火须下降、肾水须上承，失调则心肾不交。',
      reasoning: '患者失眠、心悸、腰膝酸软、五心烦热，为何说是心肾不交？',
      feedback: '肾水不足不能上济心火，心火独亢则心悸失眠；肾阴亏于下则腰膝酸软。此即水火不济、心肾不交之象。',
      transfer: '「培土生金」治肺脾气虚久咳，五行依据是什么？',
    },
  },

  // ============================================================
  // 05 精气血津液神
  // ============================================================
  {
    id: 'pb2-th-05-01', title: '精的基本概念与功能', category: 'theory', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['先天之精', '后天之精'],
    intent: '精的定义、先天后天之分与生殖发育功能',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
      { field: 'theory.function', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '精是构成人体和维持生命的基本物质，分先天后天，主生殖发育',
    coreDefinition: '精的广义狭义、先天之精（禀受父母）、后天之精（水谷化生）',
    safety: {},
    learning: {
      knowledge: '精是生命之本。先天之精禀受于父母、藏于肾；后天之精由水谷精微化生、由脾输布。二者相互资助，共同主司生长发育与生殖。',
      misjudgment: '把「精」等同于「精子」或「精液」。错：中医之精是广义生命物质，精子只是肾精功能在生殖方面的一种体现。',
      reasoning: '儿童生长发育迟缓与肾精不足有关，但为何还要重视脾胃（后天）？',
      feedback: '先天之精须后天之精不断充养，脾胃健运则水谷精微源源补充，先天不足者赖后天调养可部分代偿，故「先天生后天、后天养先天」。',
      transfer: '久病耗精的患者为何多同时见脾虚？两精关系如何解释？',
    },
  },
  {
    id: 'pb2-th-05-14', title: '精与气的关系', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['精气互化', '精化气'],
    intent: '精与气的互化关系：精能化气、气能生精',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '精与气相互滋生转化：精化为气、气聚成精，肾精与肾气关系最典型',
    coreDefinition: '精化气（肾精化肾气）、气生精（气充则精足）',
    safety: {},
    learning: {
      knowledge: '精与气是同一生命物质的不同存在形态：精能化气，肾精充足则肾气充沛；气能生精，脏腑之气旺盛则精的化生有源。',
      misjudgment: '把精化气理解成精液直接变成气体。错：精化气指精微物质转化为生命活动所需的动力之气，是功能层面的转化。',
      reasoning: '久病肾精亏耗者为何气短乏力、动则气喘？',
      feedback: '肾精不足则化气无源，肾气亏虚不能纳气归元，故见气短动喘。精亏是根、气虚是标，治当填精纳气。',
      transfer: '「气能生精」在临床上的治则体现是什么？',
    },
  },
  {
    id: 'pb2-th-05-15', title: '精与血的关系', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['精血同源', '肝肾同源'],
    intent: '精血同源：精可化血、血可化精，肝肾同源的理论基础',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '精血同源、肝肾同源：精血互化，肝藏血肾藏精，精足则血旺',
    coreDefinition: '精化血（肾精化血）、血生精（血充养精）、肝肾同源',
    safety: {},
    learning: {
      knowledge: '精与血都由水谷精微化生、相互转化：肾精可化为肝血，肝血可充养肾精，故称精血同源、肝肾同源。',
      misjudgment: '以为精血同源就是精液与血液一样。错：同源指化生之本相同（水谷精微与肾精），功能形态各异，是互化关系。',
      reasoning: '长期失血的患者为何会腰膝酸软、头晕耳鸣（肾精亏虚之象）？',
      feedback: '失血伤肝血，肝血不足则肾精失于充养（精血互化），精亏不能上荣则头晕耳鸣、腰膝失养则酸软。',
      transfer: '治疗血虚为何常配伍补肾填精之品？',
    },
  },
  {
    id: 'pb2-th-05-16', title: '精神互用', category: 'theory', difficulty: 4, difficultyLabel: '易混淆',
    riskTags: ['精化神', '神驭精'],
    intent: '精神互用关系：精能化神、神能御精，注意与五脏藏神联系',
    facts: [
      { field: 'theory.definition', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '精化神、神驭精：精是神的物质基础，神是精的功能体现',
    coreDefinition: '精能化神（精足神旺）、神能御精（神安精固）',
    safety: {},
    learning: {
      knowledge: '精能化神：精充则神旺，精亏则神衰；神能御精：神志安定则精守于内，神摇志乱则精气走泄。二者互根互用。',
      misjudgment: '把精神互用简化成「精神好」。错：这里的神是生命活动的主宰与外在表现，精是物质基础，讲的是物质与功能的统一。',
      reasoning: '为何惊恐过度会导致遗精、滑泄？',
      feedback: '恐则气下、神志动荡，神不御精则肾气不固、精关失守，故见遗泄。这是「神能御精」失常的典型。',
      transfer: '久病精亏者神情淡漠、目光少神，用精神关系如何解释？',
    },
  },

  // ============================================================
  // 06 经络
  // ============================================================
  {
    id: 'pb2-th-06-01', title: '经络基本概念', category: 'meridian', difficulty: 2, difficultyLabel: '中等',
    riskTags: ['经络定义', '系统组成'],
    intent: '经络系统组成：经脉、络脉、经筋、皮部的基本框架',
    facts: [
      { field: 'meridian.definition', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.composition', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '经络是运行气血、联络脏腑肢节、沟通上下内外的通路系统',
    coreDefinition: '十二经脉、奇经八脉、十五络脉、十二经筋、十二皮部',
    safety: {},
    learning: {
      knowledge: '经络系统由经脉（十二正经、奇经八脉）、络脉（十五络脉、孙络、浮络）、经筋、皮部等组成，是运行气血、感应传导、调节功能的通路。',
      misjudgment: '以为经络就是血管或神经。错：经络是古人基于循行现象归纳的功能通路系统，与血管神经有联系但不能等同。',
      reasoning: '针灸「得气」的酸麻胀重感沿一定路线传导，如何用经络理论解释？',
      feedback: '针感循经感传是经络「感应传导」功能的体现，经络联络脏腑肢节、通行气血，刺激腧穴可调节相应经络脏腑。',
      transfer: '若经络是功能系统而非实体管道，如何理解「经络实质」研究的多种假说？',
    },
  },
  {
    id: 'pb2-th-06-02', title: '十二经脉', category: 'meridian', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['走向交接', '表里配属'],
    intent: '十二经脉的名称、走向规律（手三阴从胸走手等）与表里配属',
    facts: [
      { field: 'meridian.definition', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.rules', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '十二经脉走向规律：手三阴从胸走手、手三阳从手走头、足三阳从头走足、足三阴从足走腹胸',
    coreDefinition: '十二经脉名称（手足阴阳+脏腑）、走向交接规律、表里配属',
    safety: {},
    learning: {
      knowledge: '十二经脉走向规律：手三阴从胸走手交手三阳，手三阳从手走头交足三阳，足三阳从头走足交足三阴，足三阴从足走腹胸复交手三阴，如此循环。表里配属：肺-大肠、心-小肠、心包-三焦、脾-胃、肝-胆、肾-膀胱。',
      misjudgment: '记反手三阴的走向方向。错：手三阴都从胸走手（内侧面），不是从手走胸；记住「阴经走内侧、从胸走手/从足走腹」可推导。',
      reasoning: '为何头痛的选经要区分前额、两侧、巅顶？',
      feedback: '不同部位由不同经脉循行所过：前额属阳明、两侧属少阳、巅顶属厥阴（肝经上巅），「经脉所过、主治所及」。',
      transfer: '「面口合谷收」依据的是合谷所在经脉的循行部位，请用经络理论说明。',
    },
  },
  {
    id: 'pb2-th-06-06', title: '经络生理功能', category: 'meridian', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['联络作用', '运行气血', '感应调节'],
    intent: '经络四大生理功能：联络、运行、感应传导、调节平衡',
    facts: [
      { field: 'meridian.function', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '经络联络脏腑肢节、运行气血、感应传导、调节机体平衡',
    coreDefinition: '四大功能：联络作用、运行作用、感应传导、调节作用',
    safety: {},
    learning: {
      knowledge: '经络生理功能有四：一是联络脏腑肢节、沟通上下内外；二是运行气血、濡养周身；三是感应传导（针刺得气）；四是调节机体平衡（补虚泻实）。',
      misjudgment: '以为经络只负责「通气血」。错：联络与调节同样重要，脏腑病变在体表的反映（如肝病胁痛）也靠经络联络。',
      reasoning: '为什么按揉足三里能调理胃肠功能？',
      feedback: '足三里为胃经合穴，胃经络属脾胃，刺激该穴通过经络的联络与调节作用影响胃肠，体现了「经络所通、主治所及」。',
      transfer: '脏腑病变反映于体表特定部位（如心绞痛放射左臂内侧），与经络有何关系？',
    },
  },

  // ============================================================
  // 07 病因
  // ============================================================
  {
    id: 'pb2-th-07-02', title: '风邪', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['风为百病之长', '善行数变'],
    intent: '风邪特性与致病特点：轻扬开泄、善行数变、风为百病之长',
    facts: [
      { field: 'etiology.character', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [{ label: '风为百病之长', canon: '风论篇第四十二', chapter: '', sourceTitle: '《素问·风论》', sourceType: 'classic_original', status: 'verified', originalText: '风者，百病之长也' }],
    dosage: null,
    cases: null,
    stdJudgment: '风邪轻扬开泄、善行数变、主动，为百病之长，常兼他邪为患',
    coreDefinition: '风邪特性（阳邪、轻扬开泄、善行数变、主动）、致病特点',
    safety: {},
    learning: {
      knowledge: '风为阳邪，轻扬开泄：易袭阳位（头面、肌表）、使腠理开泄而汗出恶风；善行数变：病位游移、发病急变化快；风性主动：肢体动摇（眩晕、抽搐）。',
      misjudgment: '以为「风邪」指自然界吹的风。错：风邪是外感病因的抽象归纳，任何具有轻扬、游移、变动特性的病因都可辨为风。',
      reasoning: '风疹块此起彼伏、瘙痒游走不定，为何辨为风邪所致？',
      feedback: '风性善行数变、游走不定，风疹块时起时消、位置游移正是风邪致病的特点，治以祛风止痒。',
      transfer: '「风为百病之长」除了指风邪易兼他邪，还有何含义？',
    },
  },
  {
    id: 'pb2-th-07-03', title: '寒邪', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['寒性凝滞', '寒主收引', '伤阳'],
    intent: '寒邪特性：易伤阳气、凝滞、收引，与疼痛关系',
    facts: [
      { field: 'etiology.character', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '寒为阴邪易伤阳气，寒性凝滞主痛，寒性收引致拘急',
    coreDefinition: '寒邪三特点：易伤阳气、凝滞（气血凝滞而痛）、收引（经脉拘急）',
    safety: {},
    learning: {
      knowledge: '寒为阴邪，易伤阳气（畏寒肢冷）；寒性凝滞：气血凝滞不通则痛（遇寒加重、得温痛减）；寒性收引：经脉收缩拘急（肢体屈伸不利、无汗脉紧）。',
      misjudgment: '以为寒邪只引起「怕冷」。错：寒邪的核心病理是凝滞与收引，疼痛、拘挛、脉紧都是寒的直接表现。',
      reasoning: '痛经患者小腹冷痛、得温则减，为何辨为寒凝胞宫？',
      feedback: '寒性凝滞，寒客胞宫则经血凝滞不通而痛；得温则寒散血行、痛减，佐证寒凝的诊断。',
      transfer: '「寒则气收」与「寒主收引」如何统一理解？',
    },
  },
  {
    id: 'pb2-th-07-05', title: '湿邪', category: 'theory', difficulty: 3, difficultyLabel: '困难',
    riskTags: ['重浊黏滞', '湿性趋下'],
    intent: '湿邪特性：重浊、黏滞、趋下，易困脾',
    facts: [
      { field: 'etiology.character', sourceType: 'textbook', sourceTitle: '《中医基础理论》规划教材', status: 'verified' },
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '湿性重浊黏滞、趋下，易阻遏气机、损伤脾阳，病程缠绵',
    coreDefinition: '湿邪四特点：重浊、黏滞、趋下、易困脾',
    safety: {},
    learning: {
      knowledge: '湿为阴邪：重浊（头身困重、分泌物秽浊）、黏滞（病程缠绵难愈、症状黏滞不爽）、趋下（易袭阴位，下肢水肿、带下）、易阻气机损伤脾阳（脘痞腹胀）。',
      misjudgment: '把湿邪的「趋下」记成「趋上」。错：湿性重浊下沉，故多伤人下部（下肢水肿、淋浊带下），与风邪袭阳位相反。',
      reasoning: '患者头重如裹、周身困重、大便黏滞不爽，为何辨为湿邪？',
      feedback: '湿性重浊，故头身困重如裹；黏滞，故大便黏滞不爽、病程缠绵。这是湿邪致病的典型组合。',
      transfer: '「因于湿，首如裹」出自何处？如何用湿性解释？',
    },
  },
];
