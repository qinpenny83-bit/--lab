import type { ClassicFragment } from '../../types/models';

export const classics: ClassicFragment[] = [
  // ============================================================
  // 一、黄帝内经（6 段）
  // ============================================================

  // ---------- 内经 1 ----------
  {
    id: 'classic-neijing-tandanjingxu',
    book: '黄帝内经',
    title: '恬淡虚无，真气从之',
    original: '恬淡虚无，真气从之，精神内守，病安从来。',
    guessOptions: [
      {
        id: 'tandanjingxu-a',
        text: '内心清静、欲望淡薄，正气就能顺从地运行；精神安守于内不外耗，病从哪里来呢',
        correct: true,
        why: '「恬淡虚无」讲心的状态，「真气从之」讲气的运行，「精神内守」讲神的安居，三层连起来正是中医养生的总原则。',
      },
      {
        id: 'tandanjingxu-b',
        text: '只要淡泊名利就不会生病，和身体状态没有关系',
        correct: false,
        why: '这句话强调的是「心」影响「身」的机制，不是说心里清净就百病不生，身体层面的调养同样重要。',
      },
      {
        id: 'tandanjingxu-c',
        text: '整天无所事事、什么都不想，真气就会自动变强',
        correct: false,
        why: '「虚无」是指少私寡欲，不是消极躺平；真气靠顺时而养、起居有常，不是靠什么都不做。',
      },
      {
        id: 'tandanjingxu-d',
        text: '生病之后要保持安静，不要到处走动',
        correct: false,
        why: '这是讲「未病」时的养生防病，而不是生病后的护理建议，理解方向错了。',
      },
    ],
    keywords: [
      { term: '恬淡虚无', explain: '内心清静，欲望淡薄，不为外物所扰' },
      { term: '真气', explain: '人体生命活动的根本之气，即正气' },
      { term: '精神内守', explain: '精神安驻于内，不因贪欲焦虑而外散耗损' },
      { term: '病安从来', explain: '反问句：病从哪里来呢？即根本不会生病' },
    ],
    plain:
      '想要身体好，先让心静下来。少一些贪求和焦虑，体内的正气就能顺畅地运行；精神安稳地待在身体里不外散，病就找不到门进来。',
    insight:
      '中医把「心」放在养生的第一位，认为神安则气顺、气顺则形和。防病不只靠吃，更靠养心——这是「身心一体」观念的源头。',
    challenge: {
      question: '「精神内守」的核心含义是什么？',
      options: [
        {
          id: 'tandanjingxu-ch-a',
          text: '把注意力集中在身体某个穴位上',
          correct: false,
          why: '内守不是意守某处，而是精神整体安驻于内、不外耗。',
        },
        {
          id: 'tandanjingxu-ch-b',
          text: '精神安驻于内，不因欲望与焦虑而外耗',
          correct: true,
          why: '「内守」强调神不妄动、精不外泄，正是防病的根本。',
        },
        {
          id: 'tandanjingxu-ch-c',
          text: '生病时卧床静养',
          correct: false,
          why: '这是讲平时养生的状态，不是病后护理。',
        },
        {
          id: 'tandanjingxu-ch-d',
          text: '每天长时间打坐冥想',
          correct: false,
          why: '形式不重要，关键是心境「恬淡」、神不外驰。',
        },
      ],
    },
  },

  // ---------- 内经 2 ----------
  {
    id: 'classic-neijing-shengrenzhibing',
    book: '黄帝内经',
    title: '圣人不治已病治未病',
    original: '是故圣人不治已病治未病，不治已乱治未乱，此之谓也。',
    guessOptions: [
      {
        id: 'shengrenzhibing-a',
        text: '高明的人不是在病已形成后才治，而是在病未发生时就调理；就像治国，不在动乱发生后才去平定',
        correct: true,
        why: '「治未病」是中医预防医学的最高纲领：防患于未然，既治已病之防变，也重未病之先防。',
      },
      {
        id: 'shengrenzhibing-b',
        text: '医生只给没病的人看病，得了病就不治了',
        correct: false,
        why: '「治未病」不是拒绝治已病，而是强调预防优先，两者都要做。',
      },
      {
        id: 'shengrenzhibing-c',
        text: '没病的人不用管，有病的人才需要治疗',
        correct: false,
        why: '恰好说反了：圣人重视的是「病前」与「未乱」阶段的调摄。',
      },
      {
        id: 'shengrenzhibing-d',
        text: '预防比治疗重要，所以生病后不用看医生',
        correct: false,
        why: '预防重要不意味着放弃治疗，原文后文「渴而穿井」正批评拖延治疗。',
      },
    ],
    keywords: [
      { term: '不治已病治未病', explain: '不等到病成再治，而在未病时防病、既病后防变' },
      { term: '已乱/未乱', explain: '用治国的比喻说明防患于未然的道理' },
      { term: '此之谓也', explain: '总结语：说的就是这个道理' },
    ],
    plain:
      '真正高明的人，不会等到病已经形成才去治疗，而是在病还未发生时就开始调理；就像治理国家，不在动乱爆发之后才去镇压。等到病已形成才吃药、乱已发生才去平乱，就像渴了才去挖井、要打仗了才去铸兵器，已经太晚了。',
    insight:
      '中医预防观的核心是「防重于治」。治未病包含三层：未病先防、既病防变、瘥后防复——医生不是等敌人攻城才防御，而是在城墙外就化解危机。',
    challenge: {
      question: '「渴而穿井，斗而铸锥」这个比喻想说明什么？',
      options: [
        {
          id: 'shengrenzhibing-ch-a',
          text: '做事要有远见，未雨绸缪',
          correct: false,
          why: '这说的是正面态度，但原文是反着说的：渴了才挖井、打仗才铸兵器，为时已晚。',
        },
        {
          id: 'shengrenzhibing-ch-b',
          text: '临渴掘井、临阵磨枪，为时已晚',
          correct: true,
          why: '比喻等到病已成、乱已生才动手，就像渴了才挖井，已经来不及了。',
        },
        {
          id: 'shengrenzhibing-ch-c',
          text: '做事要坚持不懈',
          correct: false,
          why: '与坚持无关，讲的是「时机」——预防要在病前。',
        },
        {
          id: 'shengrenzhibing-ch-d',
          text: '要勤俭节约、自力更生',
          correct: false,
          why: '与节约无关，核心是批评「临时抱佛脚」。',
        },
      ],
    },
  },

  // ---------- 内经 3 ----------
  {
    id: 'classic-neijing-yangqizhe',
    book: '黄帝内经',
    title: '阳气者，若天与日',
    original: '阳气者，若天与日，失其所，则折寿而不彰。',
    guessOptions: [
      {
        id: 'yangqizhe-a',
        text: '人体的阳气就像天上的太阳，如果失去正常功能，就会折损寿命、生机黯淡',
        correct: true,
        why: '以太阳喻阳气：太阳普照则万物生长，阳气正常运行则生命蓬勃；阳气失位则生命萎靡。',
      },
      {
        id: 'yangqizhe-b',
        text: '太阳和阳气是同一回事，多晒太阳就能补足阳气',
        correct: false,
        why: '这是比喻，不是等同。晒太阳有益，但阳气的根本在于脏腑功能的正常运行。',
      },
      {
        id: 'yangqizhe-c',
        text: '阳气越多越好，人人都需要壮阳',
        correct: false,
        why: '中医讲阴阳平衡，阳气贵在「得其所」，太过与不及都是病。',
      },
      {
        id: 'yangqizhe-d',
        text: '阳气只存在于白天，晚上就没有阳气',
        correct: false,
        why: '阳气有昼夜消长节律，但始终存在，只是位置与状态不同。',
      },
    ],
    keywords: [
      { term: '阳气', explain: '生命活动的主导能量，推动温煦全身的功能之气' },
      { term: '若天与日', explain: '把阳气比作天空中的太阳，强调其主导地位' },
      { term: '失其所', explain: '阳气失去正常的位置与功能，运行失常' },
      { term: '折寿而不彰', explain: '折损寿命，生机不显、萎靡不振' },
    ],
    plain:
      '阳气对于人体，就像太阳对于天地一样重要。太阳正常运行，万物才能生长；阳气正常运行，生命才有活力。如果阳气失职，人就会像没有太阳的天地一样阴沉冷寂，寿命折损、生机黯淡。',
    insight:
      '「阳气者，若天与日」确立了阳为主导的宇宙观与生命观，是「扶阳」思想的源头。但养阳不是一味壮阳，而是让阳气「得其所」——升降出入、各归其位。',
    challenge: {
      question: '「失其所则折寿而不彰」中「折寿而不彰」的意思是？',
      options: [
        {
          id: 'yangqizhe-ch-a',
          text: '寿命缩短，生机不显',
          correct: true,
          why: '「折寿」即损寿，「不彰」即生机不彰显、生命活力黯淡。',
        },
        {
          id: 'yangqizhe-ch-b',
          text: '虽然长寿但默默无闻',
          correct: false,
          why: '「不彰」说的是生机不是名声，理解偏了。',
        },
        {
          id: 'yangqizhe-ch-c',
          text: '去世后没有留下名声',
          correct: false,
          why: '与名声无关，讲的是生命状态。',
        },
        {
          id: 'yangqizhe-ch-d',
          text: '只是心情不好而已',
          correct: false,
          why: '这是全身阳气失职的严重状态，不止情绪问题。',
        },
      ],
    },
  },

  // ---------- 内经 4 ----------
  {
    id: 'classic-neijing-yinyangzhe',
    book: '黄帝内经',
    title: '阴阳者，天地之道也',
    original: '阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。',
    guessOptions: [
      {
        id: 'yinyangzhe-a',
        text: '阴阳是天地运行的总规律，是万物分类的纲领、一切变化的根源、生长消亡的根本，也是精神活动寄居之处',
        correct: true,
        why: '这是内经对阴阳最权威的定义：阴阳不是两样东西，而是一套解释天、地、人万事万物的总模型。',
      },
      {
        id: 'yinyangzhe-b',
        text: '阴阳是两种具体的物质，一个像黑球一个像白球',
        correct: false,
        why: '阴阳是属性与关系的抽象，不是具体物质；同一事物可再分阴阳。',
      },
      {
        id: 'yinyangzhe-c',
        text: '阴阳就是男人和女人',
        correct: false,
        why: '男女只是阴阳在人身上的一个例子，远不能涵盖「天地之道」。',
      },
      {
        id: 'yinyangzhe-d',
        text: '阴阳只存在于中医理论里，与天地自然无关',
        correct: false,
        why: '原文第一句就是「天地之道」，阴阳首先是宇宙观，中医用它观察人体。',
      },
    ],
    keywords: [
      { term: '天地之道', explain: '天地自然的根本规律' },
      { term: '万物之纲纪', explain: '给万事万物分类的总纲领、总法则' },
      { term: '变化之父母', explain: '一切运动变化的根源与动力' },
      { term: '生杀之本始', explain: '生长收藏、生长消亡的根本起点' },
      { term: '神明之府', explain: '人的精神意识活动寄居的处所' },
    ],
    plain:
      '阴阳是天地间最基本的规律：用它可以把万物分门别类，一切变化都由它推动，生长与消亡都以它为根本，人的精神活动也离不开它。懂得了阴阳，就拿到了认识世界和身体的「总钥匙」。',
    insight:
      '阴阳是一套「分类与运动」的思维模型，而不是两种物质。中医用阴阳给身体的上下、内外、寒热、动静建模——这是「万物之纲纪」在临床上的具体化。',
    challenge: {
      question: '「万物之纲纪」中「纲纪」指的是什么？',
      options: [
        {
          id: 'yinyangzhe-ch-a',
          text: '总纲领、总法则',
          correct: true,
          why: '纲是总绳，纪是头绪；纲纪即统领万物的根本法则。',
        },
        {
          id: 'yinyangzhe-ch-b',
          text: '朝廷的法律法规',
          correct: false,
          why: '这里的纲纪是比喻性的总法则，不是人间的法律。',
        },
        {
          id: 'yinyangzhe-ch-c',
          text: '渔网上的网绳',
          correct: false,
          why: '只是字面义，原文是比喻万物的分类框架。',
        },
        {
          id: 'yinyangzhe-ch-d',
          text: '皇帝的统治',
          correct: false,
          why: '与政治无关，讲的是自然的根本规律。',
        },
      ],
    },
  },

  // ---------- 内经 5 ----------
  {
    id: 'classic-neijing-yipingweiqi',
    book: '黄帝内经',
    title: '谨察阴阳所在而调之，以平为期',
    original: '谨察阴阳所在而调之，以平为期。',
    guessOptions: [
      {
        id: 'yipingweiqi-a',
        text: '仔细诊察阴阳偏盛偏衰的所在，加以调整，以恢复平衡为治疗目标',
        correct: true,
        why: '「谨察」是诊断功夫，「调之」是治法，「以平为期」是目标——三句话讲完整个治疗学。',
      },
      {
        id: 'yipingweiqi-b',
        text: '平时要多观察天气的阴晴变化',
        correct: false,
        why: '这里的「阴阳所在」指人体阴阳失调的部位与性质，不是天气预报。',
      },
      {
        id: 'yipingweiqi-c',
        text: '只要脉象平稳就不用吃药了',
        correct: false,
        why: '「以平为期」是治疗的终点，不是说脉平就停药；脉平恰恰是治疗成功的标志。',
      },
      {
        id: 'yipingweiqi-d',
        text: '治疗以让病人情绪平静为目标',
        correct: false,
        why: '「平」指阴阳气血的平衡，不是情绪层面的平静。',
      },
    ],
    keywords: [
      { term: '谨察', explain: '认真仔细地诊察，四诊合参' },
      { term: '阴阳所在', explain: '阴阳失调的部位、偏盛偏衰的性质' },
      { term: '调之', explain: '用针药等调整纠偏，恢复协调' },
      { term: '以平为期', explain: '以平衡为治疗的预期目标' },
    ],
    plain:
      '治病要先弄清楚身体里阴阳到底哪里失衡了——是阳太盛还是阴不足，病在表还是在里，然后用药、用针去调整它。调整到什么程度为止？调到阴阳平衡、气血和调，也就是回到「平」的健康状态。',
    insight:
      '中医治疗的总纲不是「杀敌」，而是「纠偏复平」：用药物的偏性去纠正身体的偏性，把失去平衡的人体重新推回自稳状态——这就是「以平为期」。',
    challenge: {
      question: '「以平为期」中的「平」指什么？',
      options: [
        {
          id: 'yipingweiqi-ch-a',
          text: '心情平静安和',
          correct: false,
          why: '「平」指的是人体的平衡态，不是情绪。',
        },
        {
          id: 'yipingweiqi-ch-b',
          text: '阴阳平衡、气血和调的健康状态',
          correct: true,
          why: '「平」即平人、健康人：阴阳匀平、气血调和。',
        },
        {
          id: 'yipingweiqi-ch-c',
          text: '脉搏平稳',
          correct: false,
          why: '脉平只是表现之一，这里的「平」是全身的平衡态。',
        },
        {
          id: 'yipingweiqi-ch-d',
          text: '大家地位平等',
          correct: false,
          why: '与人事无关，讲的是治疗目标。',
        },
      ],
    },
  },

  // ---------- 内经 6 ----------
  {
    id: 'classic-neijing-zhizheyangsheng',
    book: '黄帝内经',
    title: '智者之养生也',
    original: '故智者之养生也，必顺四时而适寒暑，和喜怒而安居处，节阴阳而调刚柔。',
    guessOptions: [
      {
        id: 'zhizheyangsheng-a',
        text: '懂得养生的人，顺应四季寒暑变化，情绪平和，起居安稳，节制阴阳、调和刚柔',
        correct: true,
        why: '四句话讲了养生的四大维度：顺自然、和情志、安居处、调阴阳——一个都不能少。',
      },
      {
        id: 'zhizheyangsheng-b',
        text: '聪明人靠吃各种补药来养生',
        correct: false,
        why: '原文谈的是生活方式与情志调摄，与吃补药无关。',
      },
      {
        id: 'zhizheyangsheng-c',
        text: '只有聪明人才能长寿，普通人做不到',
        correct: false,
        why: '「智者」是可学的榜样，养生方法人人可用，不是天赋门槛。',
      },
      {
        id: 'zhizheyangsheng-d',
        text: '养生就是每天坚持锻炼身体',
        correct: false,
        why: '锻炼只是「安居处」的一部分，养生是全方位的生活智慧。',
      },
    ],
    keywords: [
      { term: '顺四时而适寒暑', explain: '顺应四季更替，主动适应寒热变化' },
      { term: '和喜怒', explain: '调节情绪，使七情平和有度' },
      { term: '安居处', explain: '起居有常，居处安稳，劳逸适度' },
      { term: '节阴阳而调刚柔', explain: '节制房事阴阳，调和身体刚柔之性' },
    ],
    plain:
      '懂得养生的人，会顺着四季的寒暑变化来调整作息穿着，让喜怒哀乐保持平和，起居有规律、生活安稳，同时节制欲望、调和身体里刚与柔的平衡——这样身体就处在和谐的状态里。',
    insight:
      '养生不是某一招，而是「全方位的生活管理」：顺应自然节律、管理情绪、规律起居、节制欲望。身体是生活方式的投影，这正是中医「形神合一」思想的体现。',
    challenge: {
      question: '「和喜怒」的正确理解是？',
      options: [
        {
          id: 'zhizheyangsheng-ch-a',
          text: '喜怒等情绪要完全压抑掉',
          correct: false,
          why: '压抑不是「和」，情绪贵在疏泄有度，不是消灭。',
        },
        {
          id: 'zhizheyangsheng-ch-b',
          text: '让情绪平和有度，不过激也不过抑',
          correct: true,
          why: '「和」是中庸：情绪正常表达，但不让某种情绪长期过激。',
        },
        {
          id: 'zhizheyangsheng-ch-c',
          text: '只保留高兴，不要有愤怒',
          correct: false,
          why: '喜怒哀乐各有其用，关键是「和」，不是只留一种。',
        },
        {
          id: 'zhizheyangsheng-ch-d',
          text: '情绪无所谓，想怎样就怎样',
          correct: false,
          why: '「和喜怒」正是要管理情绪，任性发泄恰恰是养生大忌。',
        },
      ],
    },
  },

  // ============================================================
  // 二、伤寒论（5 段）
  // ============================================================

  // ---------- 伤寒论 1 ----------
  {
    id: 'classic-shanghan-taiyang',
    book: '伤寒论',
    title: '太阳之为病（太阳病提纲）',
    original: '太阳之为病，脉浮，头项强痛而恶寒。',
    guessOptions: [
      {
        id: 'taiyang-a',
        text: '太阳病的特点是：脉摸起来浮，后脑勺到脖子僵硬疼痛，同时怕冷',
        correct: true,
        why: '「脉浮、头项强痛、恶寒」三症并见，就锁定病在太阳（最外层），这是仲景的提纲挈领。',
      },
      {
        id: 'taiyang-b',
        text: '太阳病就是晒太阳太多而得的病',
        correct: false,
        why: '太阳是人体最外层防线（太阳经、太阳表）的名称，与天上的太阳无关。',
      },
      {
        id: 'taiyang-c',
        text: '太阳病只在中午发作',
        correct: false,
        why: '「太阳」是六经之一，不是时间概念，与发作时辰无关。',
      },
      {
        id: 'taiyang-d',
        text: '脉浮说明病邪已经深入脏腑',
        correct: false,
        why: '脉浮恰恰提示邪在体表、正气抗邪于外，是「病在表」的标志。',
      },
    ],
    keywords: [
      { term: '太阳', explain: '六经之一，人体最外层的藩篱，主一身之表' },
      { term: '脉浮', explain: '脉搏轻取即得，提示邪在表、正气趋表抗邪' },
      { term: '头项强痛', explain: '后脑与颈项僵硬疼痛，寒邪束表、太阳经气不利' },
      { term: '恶寒', explain: '怕冷，风寒之邪伤及卫阳' },
    ],
    plain:
      '太阳是人体最外面的一道防线。风寒邪气最先攻击这里，于是出现三个典型信号：脉浮（正气在体表抗邪）、后脑勺到脖子僵硬疼痛（经气被寒邪束缚）、怕冷（卫阳被寒邪打压）。见到这组「脉＋证」，就知道病在体表。',
    insight:
      '仲景用一句提纲就建立了「表证」的识别标准：一个「浮」脉加一组表证症状。辨证不是背病名，而是抓「脉证组合」——这是六经辨证的起点。',
    challenge: {
      question: '太阳病提纲中「恶寒」说明什么？',
      options: [
        {
          id: 'taiyang-ch-a',
          text: '寒邪侵犯体表，卫阳被遏',
          correct: true,
          why: '恶寒是卫阳抗邪而受遏的典型表现，是表寒证的标志。',
        },
        {
          id: 'taiyang-ch-b',
          text: '体内有实热',
          correct: false,
          why: '实热多恶热喜冷，恶寒指向寒邪在表。',
        },
        {
          id: 'taiyang-ch-c',
          text: '肾阳严重不足',
          correct: false,
          why: '肾阳虚的畏寒是慢性虚寒，与太阳病急性恶寒不同。',
        },
        {
          id: 'taiyang-ch-d',
          text: '只是心理上害怕',
          correct: false,
          why: '恶寒是身体层面的怕冷，是客观感受，不是心理恐惧。',
        },
      ],
    },
  },

  // ---------- 伤寒论 2 ----------
  {
    id: 'classic-shanghan-suizhengzhizhi',
    book: '伤寒论',
    title: '观其脉证，知犯何逆，随证治之',
    original: '观其脉证，知犯何逆，随证治之。',
    guessOptions: [
      {
        id: 'suizhengzhizhi-a',
        text: '仔细察看脉象与症状，弄清是哪种误治或失调，再根据当下的证候选择治法方药',
        correct: true,
        why: '这是仲景面对「坏病」（被误治的变证）时的处理原则：重新辨证、动态调方，不执守原方。',
      },
      {
        id: 'suizhengzhizhi-b',
        text: '看到什么症状就开什么药，头痛治头、脚痛治脚',
        correct: false,
        why: '「随证治之」是抓住当下的证候本质来立法，恰恰反对机械地对症用药。',
      },
      {
        id: 'suizhengzhizhi-c',
        text: '只要脉象正常就不用再管病人了',
        correct: false,
        why: '脉证合参只是辨证的第一步，不是判断痊愈的唯一依据。',
      },
      {
        id: 'suizhengzhizhi-d',
        text: '随便开个方子先试试看',
        correct: false,
        why: '「观」「知」「随」三字都是严谨的辨证过程，与「试试看」截然相反。',
      },
    ],
    keywords: [
      { term: '观其脉证', explain: '四诊合参，全面观察脉象与症状' },
      { term: '知犯何逆', explain: '判断误治之处或失调的性质所在' },
      { term: '随证治之', explain: '随当下证候立法处方，动态调整' },
    ],
    plain:
      '病人被误治或病情变化后，不要死守原来的方子，而要重新仔仔细细地看脉、看证，判断到底哪里出了问题，再根据当下呈现的证候重新定法处方。病在变，方就要跟着变。',
    insight:
      '「随证治之」是辨证论治精神的浓缩：证是动态的，治法就必须随之调整。经方不是「一个病一个方」的死板对应，而是「一个证一个方」的灵活应变。',
    challenge: {
      question: '「随证治之」体现的中医核心原则是？',
      options: [
        {
          id: 'suizhengzhizhi-ch-a',
          text: '一病一方，一方到底',
          correct: false,
          why: '恰恰相反，随证治之反对死守一方，强调随证变化。',
        },
        {
          id: 'suizhengzhizhi-ch-b',
          text: '辨证论治，动态调整',
          correct: true,
          why: '以当下证候为依据立法处方，证变方变，正是辨证论治的精髓。',
        },
        {
          id: 'suizhengzhizhi-ch-c',
          text: '以药试病，碰运气',
          correct: false,
          why: '「观其脉证」在先，是严谨辨证，不是试药。',
        },
        {
          id: 'suizhengzhizhi-ch-d',
          text: '头痛医头，脚痛医脚',
          correct: false,
          why: '随证治之抓的是证候本质，与对症治疗相反。',
        },
      ],
    },
  },

  // ---------- 伤寒论 3 ----------
  {
    id: 'classic-shanghan-guizhitang',
    book: '伤寒论',
    title: '太阳病，头痛发热，汗出恶风，桂枝汤主之',
    original: '太阳病，头痛发热，汗出恶风，桂枝汤主之。',
    guessOptions: [
      {
        id: 'guizhitang-a',
        text: '太阳病出现头痛、发热、出汗还怕风，就用桂枝汤主治',
        correct: true,
        why: '「汗出恶风」是关键：表虚有汗，营卫不和，正是桂枝汤的适应证。',
      },
      {
        id: 'guizhitang-b',
        text: '只要有头痛发热，不管有没有汗，都能用桂枝汤',
        correct: false,
        why: '若表实无汗当用麻黄汤；汗出与否是鉴别表虚表实、选方的最重要依据。',
      },
      {
        id: 'guizhitang-c',
        text: '桂枝汤是峻烈发汗剂，无汗也能用',
        correct: false,
        why: '桂枝汤是「解肌」之方，药力温和，用于有汗的表虚证；峻汗剂是麻黄汤。',
      },
      {
        id: 'guizhitang-d',
        text: '出汗怕风是好事，说明邪气已去，不用治',
        correct: false,
        why: '汗出恶风正是营卫不和的表现，提示表邪未解而卫气已虚，需要调和。',
      },
    ],
    keywords: [
      { term: '汗出', explain: '关键鉴别点：有汗说明是表虚（卫弱营和失常）' },
      { term: '恶风', explain: '怕风，风性开泄，营卫不和之象' },
      { term: '主之', explain: '专方主治，方证一一对应' },
    ],
    plain:
      '太阳病见头痛、发热，同时出着汗还怕风——这是「表虚证」：邪气在表，卫气已弱，营卫失调。桂枝汤调和营卫、解肌发表，正对此证。',
    insight:
      '「有汗用桂枝，无汗用麻黄」是经方最经典的鉴别。一个「汗」字，决定了整个方子的方向——表虚用和法，表实用汗法。方证对应，差之毫厘，谬以千里。',
    challenge: {
      question: '与麻黄汤证相比，桂枝汤证最关键的区别症状是？',
      options: [
        {
          id: 'guizhitang-ch-a',
          text: '无汗而喘',
          correct: false,
          why: '无汗是麻黄汤证，桂枝汤证恰恰是有汗。',
        },
        {
          id: 'guizhitang-ch-b',
          text: '汗出恶风',
          correct: true,
          why: '汗出恶风是桂枝汤证（表虚）的标志，与麻黄汤证的无汗相对。',
        },
        {
          id: 'guizhitang-ch-c',
          text: '脉浮紧',
          correct: false,
          why: '脉浮紧主表实，是麻黄汤证；桂枝汤证脉多浮缓。',
        },
        {
          id: 'guizhitang-ch-d',
          text: '身疼痛',
          correct: false,
          why: '身疼痛两方证皆可见，不是鉴别要点。',
        },
      ],
    },
  },

  // ---------- 伤寒论 4 ----------
  {
    id: 'classic-shanghan-fayuyang',
    book: '伤寒论',
    title: '发于阳，发于阴',
    original: '病有发热恶寒者，发于阳也；无热恶寒者，发于阴也。',
    guessOptions: [
      {
        id: 'fayuyang-a',
        text: '病见发热又怕冷的，发于阳分；只怕冷不发热的，发于阴分',
        correct: true,
        why: '发热与否反映正邪交争的态势：能发热说明阳气尚能与邪相争，无热则阳气已虚。',
      },
      {
        id: 'fayuyang-b',
        text: '发热就是阳证，怕冷就是阴证，两者互不相干',
        correct: false,
        why: '发热恶寒常并见，关键是「有无发热」这一条来分阴阳，不是割裂看。',
      },
      {
        id: 'fayuyang-c',
        text: '白天得的病属阳，晚上得的病属阴',
        correct: false,
        why: '此「阴阳」指病发于阳经（表）还是阴经（里、虚寒），与时辰无关。',
      },
      {
        id: 'fayuyang-d',
        text: '男人得的病属阳，女人得的病属阴',
        correct: false,
        why: '与性别无关，说的是正邪交争的状态。',
      },
    ],
    keywords: [
      { term: '发热恶寒', explain: '发热与怕冷并见，正气奋起与邪抗争' },
      { term: '发于阳', explain: '病发于阳分，阳气尚足、能抗邪' },
      { term: '无热恶寒', explain: '只怕冷而不发热，阳气已虚、无力抗邪' },
      { term: '发于阴', explain: '病发于阴分，多属虚寒之证' },
    ],
    plain:
      '病刚开始时，如果既发热又怕冷，说明阳气还足，能跟邪气搏斗，病在「阳」的层面（偏表、偏实）；如果只怕冷、一点热都不发，说明阳气已经不足，无力抵抗，病在「阴」的层面（偏里、偏虚寒）。',
    insight:
      '仲景用「发热与否」作为判断正邪交争的侦察指标：发热是正气抗邪的信号，无热是正气不支的警报。这为「辨阴阳」提供了可操作的客观依据。',
    challenge: {
      question: '「无热恶寒者，发于阴也」提示什么？',
      options: [
        {
          id: 'fayuyang-ch-a',
          text: '阴证，阳气不足、无力抗邪',
          correct: true,
          why: '无热恶寒提示阳气已虚，病发于阴分，治疗当扶阳温经。',
        },
        {
          id: 'fayuyang-ch-b',
          text: '阳证，热势炽盛',
          correct: false,
          why: '热盛当见发热，无热恶寒恰恰相反。',
        },
        {
          id: 'fayuyang-ch-c',
          text: '表证未解',
          correct: false,
          why: '虽可涉及表，但关键在于阳气不足的「阴」的层面。',
        },
        {
          id: 'fayuyang-ch-d',
          text: '正常生理现象',
          correct: false,
          why: '这是病理状态，是辨别阴阳属性的重要依据。',
        },
      ],
    },
  },

  // ---------- 伤寒论 5 ----------
  {
    id: 'classic-shanghan-yinyangzihe',
    book: '伤寒论',
    title: '阴阳自和者，必自愈',
    original: '凡病，若发汗、若吐、若下、若亡血、亡津液，阴阳自和者，必自愈。',
    guessOptions: [
      {
        id: 'yinyangzihe-a',
        text: '无论经过发汗、催吐、泻下，还是失血、津液耗损，只要阴阳能自行调和，病就会自己痊愈',
        correct: true,
        why: '仲景相信人体有强大的自愈力：只要阴阳尚能自和，就不要乱用药去干扰它。',
      },
      {
        id: 'yinyangzihe-b',
        text: '凡是生病的，发汗吐下之后必然痊愈',
        correct: false,
        why: '汗吐下是手段不是目的，误用反伤正气；痊愈的前提是「阴阳自和」。',
      },
      {
        id: 'yinyangzihe-c',
        text: '汗吐下会让人阴阳大伤而必死',
        correct: false,
        why: '汗吐下虽有损耗，但人体能自我修复；仲景说的是可以自愈，不是必死。',
      },
      {
        id: 'yinyangzihe-d',
        text: '生病后应该继续发汗，把邪气彻底排干净',
        correct: false,
        why: '原文恰恰提醒：汗吐下伤津耗液后要「观其自和」，不可一味再攻。',
      },
    ],
    keywords: [
      { term: '亡血、亡津液', explain: '发汗吐下及失血导致血与津液的耗损' },
      { term: '阴阳自和', explain: '机体依靠自身机制重新恢复阴阳平衡' },
      { term: '必自愈', explain: '可以自然痊愈，不必强行用药' },
    ],
    plain:
      '生病之后，无论经过发汗、催吐、泻下，还是失血、津液耗损，只要身体还能靠自己的力量把阴阳调回平衡，病就会自己好。这时候医生最该做的，是别乱插手，给自愈留出空间。',
    insight:
      '中医高度重视人体的自愈能力（阴阳自和）。治疗的最高境界不是「代人体作战」，而是「顺势助和」——判断何时该出手，何时该收手，本身就是功夫。',
    challenge: {
      question: '「阴阳自和者，必自愈」给医生的启示是？',
      options: [
        {
          id: 'yinyangzihe-ch-a',
          text: '要猛攻邪气，除恶务尽',
          correct: false,
          why: '邪去正伤同样是失败；仲景强调给自和留余地。',
        },
        {
          id: 'yinyangzihe-ch-b',
          text: '相信并扶持人体自愈力，不过度治疗',
          correct: true,
          why: '阴阳自和是人体本有的机制，医生应顺势而为，避免过度干预。',
        },
        {
          id: 'yinyangzihe-ch-c',
          text: '只用补药堆砌',
          correct: false,
          why: '重点不是补，而是不干扰自和的进程。',
        },
        {
          id: 'yinyangzihe-ch-d',
          text: '干脆放弃治疗',
          correct: false,
          why: '是「观察待和」而非「放弃」，需动态判断是否仍可自和。',
        },
      ],
    },
  },

  // ============================================================
  // 三、金匮要略（4 段）
  // ============================================================

  // ---------- 金匮 1 ----------
  {
    id: 'classic-jingui-jianganchuanpi',
    book: '金匮要略',
    title: '见肝之病，知肝传脾，当先实脾',
    original: '夫治未病者，见肝之病，知肝传脾，当先实脾。',
    guessOptions: [
      {
        id: 'jianganchuanpi-a',
        text: '治未病的人，看到肝有病，知道肝会传给脾，就先补益脾土以截断传变',
        correct: true,
        why: '肝属木、脾属土，木克土。肝病最易传脾，先实脾就是「先安未受邪之地」。',
      },
      {
        id: 'jianganchuanpi-b',
        text: '肝有病不用治，等着它自己好',
        correct: false,
        why: '恰恰相反：要主动预防传变，既治肝又防脾，而不是放任不管。',
      },
      {
        id: 'jianganchuanpi-c',
        text: '见肝病只治肝，其他脏腑一概不管',
        correct: false,
        why: '这正是仲景反对的孤立治肝——要看脏腑间的传变关系。',
      },
      {
        id: 'jianganchuanpi-d',
        text: '脾有病要先治肝',
        correct: false,
        why: '方向反了：原文说的是「肝病传脾、先实脾」，是护脾而非治脾的病。',
      },
    ],
    keywords: [
      { term: '治未病', explain: '此处指既病防变：在疾病传变之前预先设防' },
      { term: '知肝传脾', explain: '按五行相克（木克土）预判肝病将传于脾' },
      { term: '当先实脾', explain: '预先补益脾土，使脾强不受邪' },
    ],
    plain:
      '高明的医生看到病人肝有病，会立刻想到：肝属木、脾属土，木会克土，病邪很可能顺着这个关系传给脾。于是提前把脾补起来（实脾），让脾土强壮、扛得住，切断传变的通路。',
    insight:
      '中医治病看「传变」而不只看「当下」。脏腑间有生克关系，治疗就要「先安未受邪之地」——这既是预防思想，也是整体观念在临床上的落地。',
    challenge: {
      question: '「见肝之病，知肝传脾」依据的五行关系是？',
      options: [
        {
          id: 'jianganchuanpi-ch-a',
          text: '木克土',
          correct: true,
          why: '肝属木、脾属土，木克土，所以肝病最易传脾。',
        },
        {
          id: 'jianganchuanpi-ch-b',
          text: '火克金',
          correct: false,
          why: '火克金与肝脾无直接对应关系。',
        },
        {
          id: 'jianganchuanpi-ch-c',
          text: '土生金',
          correct: false,
          why: '土生金是相生，而肝传脾是相克方向的传变。',
        },
        {
          id: 'jianganchuanpi-ch-d',
          text: '水生木',
          correct: false,
          why: '水生木是相生，肝病传脾走的是相克（木克土）路线。',
        },
      ],
    },
  },

  // ---------- 金匮 2 ----------
  {
    id: 'classic-jingui-wuzangyuantong',
    book: '金匮要略',
    title: '若五脏元真通畅，人即安和',
    original: '若五脏元真通畅，人即安和；客气邪风，中人多死。',
    guessOptions: [
      {
        id: 'wuzangyuantong-a',
        text: '只要五脏的根本正气运行通畅，人就安康平和；外来邪风侵犯人体，才容易致病',
        correct: true,
        why: '「通畅」是健康的关键词：正气畅通则邪不可干，邪风伤人往往因为内不通。',
      },
      {
        id: 'wuzangyuantong-b',
        text: '五脏通畅的人永远不会得任何病',
        correct: false,
        why: '这是强调正气为主的预防观，不是说百病不侵、绝对不得病。',
      },
      {
        id: 'wuzangyuantong-c',
        text: '元真是肾精，只要补肾就行了',
        correct: false,
        why: '「元真」是五脏的根本正气，重在「通畅」的运行状态，不是单指补肾。',
      },
      {
        id: 'wuzangyuantong-d',
        text: '邪风来了人就一定会死',
        correct: false,
        why: '「中人多死」的前提是正气不畅、邪气深入，不是见风即死。',
      },
    ],
    keywords: [
      { term: '五脏元真', explain: '五脏中的根本正气、元气真气' },
      { term: '通畅', explain: '运行无阻、升降出入正常' },
      { term: '人即安和', explain: '人就安康平和，不生病' },
      { term: '客气邪风', explain: '外来的不正之气、致病邪气' },
    ],
    plain:
      '身体里五脏的「根本之气」只要畅通无阻，人就是安和健康的；反过来，外来邪风之所以能侵入致病，往往是因为内在的通路已经堵了、正气已经虚了。健康的关键在「内通」。',
    insight:
      '「正气存内，邪不可干」的金匮版本：健康不是靠消灭所有外邪（也消灭不完），而是靠保持内在正气的通畅。通，就是最好的防御。',
    challenge: {
      question: '「五脏元真通畅，人即安和」强调健康的关键是？',
      options: [
        {
          id: 'wuzangyuantong-ch-a',
          text: '正气运行通畅',
          correct: true,
          why: '「通畅」是这句话的题眼：通则为安，不通则病。',
        },
        {
          id: 'wuzangyuantong-ch-b',
          text: '把外界的邪气全部消灭',
          correct: false,
          why: '外邪不可尽灭，重点是内正通畅、邪不可干。',
        },
        {
          id: 'wuzangyuantong-ch-c',
          text: '多吃补药',
          correct: false,
          why: '补不是关键，通才是关键；乱补反生壅滞。',
        },
        {
          id: 'wuzangyuantong-ch-d',
          text: '避开所有致病的天气',
          correct: false,
          why: '强调内因主导，不是消极躲避外因。',
        },
      ],
    },
  },

  // ---------- 金匮 3 ----------
  {
    id: 'classic-jingui-qianbanbinan',
    book: '金匮要略',
    title: '千般疢难，不越三条',
    original:
      '千般疢难，不越三条：一者，经络受邪，入脏腑，为内所因也；二者，四肢九窍，血脉相传，壅塞不通，为外皮肤所中也；三者，房室、金刃、虫兽所伤。',
    guessOptions: [
      {
        id: 'qianbanbinan-a',
        text: '疾病千变万化，病因不外三类：内因（经络受邪入脏腑）、外因（皮肤血脉受邪）、不内外因（房事、外伤、虫兽伤）',
        correct: true,
        why: '这是中医「三因学说」的源头：把纷繁的病因归纳为三条，纲举目张。',
      },
      {
        id: 'qianbanbinan-b',
        text: '天下只有三种病值得治',
        correct: false,
        why: '「不越三条」是归纳病因，不是说只有三种病。',
      },
      {
        id: 'qianbanbinan-c',
        text: '生病的人不会超过三个器官',
        correct: false,
        why: '讲的是病因分类，与器官数量无关。',
      },
      {
        id: 'qianbanbinan-d',
        text: '病因只有风寒暑湿燥火',
        correct: false,
        why: '六淫只是外因的一部分，三因还包含内因与不内外因。',
      },
    ],
    keywords: [
      { term: '千般疢难', explain: '千种疾病（疢难即疾病、灾病）' },
      { term: '不越三条', explain: '总括起来不超过三类' },
      { term: '内所因', explain: '邪从经络深入脏腑，病发于内' },
      { term: '外皮肤所中', explain: '邪从皮肤、四肢九窍而入' },
      { term: '房室、金刃、虫兽所伤', explain: '房劳、刀伤、虫兽咬伤等，属不内外因' },
    ],
    plain:
      '疾病虽然千变万化，但追究起来，病因不外乎三条：第一类是邪气顺着经络深入脏腑，从内部发病；第二类是邪气从皮肤、四肢九窍侵入；第三类是房劳过度、刀剑外伤、虫兽咬伤之类。抓住这三条，辨证就有了方向。',
    insight:
      '中医的病因学不是零散罗列，而是「结构化思维」：三因分类法把病因系统化，指导临床「审因论治」。这也是后世医家把病因分内因、外因、不内外因的源头。',
    challenge: {
      question: '「房室、金刃、虫兽所伤」属于哪一类病因？',
      options: [
        {
          id: 'qianbanbinan-ch-a',
          text: '内因',
          correct: false,
          why: '内因是经络受邪入脏腑，不是房室外伤。',
        },
        {
          id: 'qianbanbinan-ch-b',
          text: '外因',
          correct: false,
          why: '外因指邪从皮肤腠理而入，房室外伤不属于外感之邪。',
        },
        {
          id: 'qianbanbinan-ch-c',
          text: '不内外因',
          correct: true,
          why: '房劳、金刃、虫兽伤既非内伤七情，也非外感六淫，故称不内外因。',
        },
        {
          id: 'qianbanbinan-ch-d',
          text: '以上都不属于',
          correct: false,
          why: '仲景明列第三条即为此类，属于不内外因。',
        },
      ],
    },
  },

  // ---------- 金匮 4 ----------
  {
    id: 'classic-jingui-xiezailuo',
    book: '金匮要略',
    title: '邪在于络，肌肤不仁；邪在于经，即重不胜',
    original:
      '邪在于络，肌肤不仁；邪在于经，即重不胜；邪入于腑，即不识人；邪入于脏，舌即难言，口吐涎。',
    guessOptions: [
      {
        id: 'xiezailuo-a',
        text: '病邪在络脉，皮肤麻木；在经脉，肢体沉重、抬举无力；入腑则神志不清；入脏则舌强难言、口吐涎沫',
        correct: true,
        why: '仲景以病位深浅给中风分层：络→经→腑→脏，一层比一层深，一层比一层重。',
      },
      {
        id: 'xiezailuo-b',
        text: '邪在络就是全身经络都堵死了，无药可救',
        correct: false,
        why: '邪在络是最浅的一层，只是肌肤麻木，恰恰是预后最好的阶段。',
      },
      {
        id: 'xiezailuo-c',
        text: '肌肤不仁就是皮肤没感觉，不用治',
        correct: false,
        why: '肌肤不仁是邪中的表现，提示病已入络，需要及早治疗。',
      },
      {
        id: 'xiezailuo-d',
        text: '邪在经要立刻用峻烈发汗药',
        correct: false,
        why: '经文讲的是按深浅分层判断病情，并未主张不分深浅一律峻汗。',
      },
    ],
    keywords: [
      { term: '络', explain: '最浅表的络脉，邪轻病浅' },
      { term: '肌肤不仁', explain: '皮肤肌肉麻木不仁，感觉减退' },
      { term: '经', explain: '较深的经脉，邪气入经则病重一层' },
      { term: '即重不胜', explain: '肢体沉重、不能抬举，运动障碍' },
      { term: '由浅入深', explain: '络→经→腑→脏，病位渐深、病情渐重' },
    ],
    plain:
      '同样是中风，病邪侵犯的深浅不同，表现也完全不同：只在络脉，是皮肤麻木；深入到经脉，肢体就沉重无力、抬不起来；再入腑，人就神志不清、不认人；一旦入脏，舌头僵硬说不出话、口吐涎沫。病位越深，病情越重。',
    insight:
      '仲景用「深浅分层」来把握疾病：同一个病，根据病位由浅入深判断轻重预后、决定治法。这种「层次思维」贯穿中医，是临床决策的重要框架。',
    challenge: {
      question: '「邪入于腑，即不识人」说明病邪已到哪一层？',
      options: [
        {
          id: 'xiezailuo-ch-a',
          text: '最浅的络脉',
          correct: false,
          why: '邪在络只是肌肤不仁，不至于神志不清。',
        },
        {
          id: 'xiezailuo-ch-b',
          text: '经脉层面',
          correct: false,
          why: '邪在经是肢体沉重，尚未影响神志。',
        },
        {
          id: 'xiezailuo-ch-c',
          text: '腑，神志已受影响',
          correct: true,
          why: '经文明确：邪入于腑，即不识人，病位已深。',
        },
        {
          id: 'xiezailuo-ch-d',
          text: '只在皮肤表面',
          correct: false,
          why: '皮肤表面属于最浅的络脉层面，不会不识人。',
        },
      ],
    },
  },
];
