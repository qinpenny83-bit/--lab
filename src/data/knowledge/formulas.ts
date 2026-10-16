import type { Formula } from '../../types/models';

export const formulas: Formula[] = [
  // ============================================================
  // 1. 桂枝汤 — 调和营卫之祖方
  // ============================================================
  {
    id: 'formula-guizhi-tang',
    name: '桂枝汤',
    source: '《伤寒论》（东汉·张仲景）',
    function: '解肌发表，调和营卫',
    indication: '外感风寒表虚证：头痛发热，汗出恶风，鼻鸣干呕，苔白不渴，脉浮缓或浮弱。',
    herbs: [
      {
        id: 'guizhi',
        name: '桂枝',
        role: '君药——解肌发表，助卫阳',
        note: '辛甘温，走表走卫，发散风寒，是发汗解表的发动机，同时温通经脉、振奋卫阳。',
        removalQuestion: '如果把桂枝从桂枝汤中拿走，整个方子的思路会发生什么变化？',
        removalOptions: [
          {
            id: 'guizhi-a',
            text: '方子几乎丧失发汗解表的能力，变成偏于和营敛阴的补养之剂，难以再治表虚感冒',
            correct: true,
            explain: '桂枝是卫分的主力、全方中「动」的一面。少了它，发汗之力消失，营卫无从调和，表邪也无出路。',
          },
          {
            id: 'guizhi-b',
            text: '白芍性味酸收，正好顶替桂枝的发汗作用，疗效不受影响',
            correct: false,
            explain: '白芍是酸收之品，作用是敛营阴而非发汗，方向与桂枝相反，无法替代。',
          },
          {
            id: 'guizhi-c',
            text: '生姜本来就善于发汗，少了桂枝也无妨',
            correct: false,
            explain: '生姜发汗力弱，且偏于温胃止呕；缺少桂枝的走表温通，表证无法解除。',
          },
          {
            id: 'guizhi-d',
            text: '方子会变得更温和，更适合体虚的人长期服用',
            correct: false,
            explain: '没有桂枝就不成其为桂枝汤，失去解表功能后整个方义改变，也不再是对证的方。',
          },
        ],
      },
      {
        id: 'baishao',
        name: '白芍',
        role: '臣药——益阴敛营，和营阴',
        note: '酸甘微寒，收敛营阴，与桂枝一散一收、一卫一营，构成调和营卫的核心。',
        removalQuestion: '如果少了白芍，桂枝汤还称得上「调和营卫」吗？',
        removalOptions: [
          {
            id: 'baishao-a',
            text: '营阴失去收敛，桂枝一味辛散会导致汗出太过、营阴外泄，卫强营弱更甚',
            correct: true,
            explain: '桂枝散、白芍收，两者对立统一。无白芍则只散不收，汗多伤营，反而加重「汗出恶风」。',
          },
          {
            id: 'baishao-b',
            text: '没了白芍，方子发汗更猛，感冒好得更快',
            correct: false,
            explain: '汗出太过会伤津耗营，对表虚证而言是误治，不会好得更快。',
          },
          {
            id: 'baishao-c',
            text: '白芍只是佐药，少了不影响整体',
            correct: false,
            explain: '白芍与桂枝同为方中核心，一阴一阳缺一不可，不是可有可无的佐药。',
          },
          {
            id: 'baishao-d',
            text: '可以用甘草代替白芍来调和营卫',
            correct: false,
            explain: '甘草主要益气和中、调和诸药，并无敛营之功，不能替代白芍。',
          },
        ],
      },
      {
        id: 'shengjiang',
        name: '生姜',
        role: '佐药——助桂枝散邪，温胃止呕',
        note: '辛温，发散表邪，兼和胃止呕，是桂枝的「助攻手」，与桂枝相须为用。',
        removalQuestion: '把生姜去掉，桂枝汤会怎样？',
        removalOptions: [
          {
            id: 'shengjiang-a',
            text: '发汗的「火力」减弱，且温胃止呕之力缺失，鼻鸣干呕等症照顾不到',
            correct: true,
            explain: '生姜既助桂枝宣散表邪，又护胃止呕，去掉后表散与和中两方面都打了折扣。',
          },
          {
            id: 'shengjiang-b',
            text: '完全没影响，生姜只是调味品',
            correct: false,
            explain: '生姜在方中承担助卫散邪与和胃止呕之功，作用不可忽略。',
          },
          {
            id: 'shengjiang-c',
            text: '方子会变得更寒凉，适合热性感冒',
            correct: false,
            explain: '桂枝汤本就是温性方，去掉生姜不会变寒凉，也不改变适应证。',
          },
          {
            id: 'shengjiang-d',
            text: '大枣可以完全代替生姜的功能',
            correct: false,
            explain: '大枣甘补和中，但无辛散之力，补不了生姜的「散」。',
          },
        ],
      },
      {
        id: 'dazao',
        name: '大枣',
        role: '佐药——益气补中，助芍药和营',
        note: '甘温补脾益气，滋助营血，与生姜配伍有「辛甘化阳、甘酸化阴」之妙。',
        removalQuestion: '少了大枣，营卫调和还完整吗？',
        removalOptions: [
          {
            id: 'dazao-a',
            text: '营阴的「补给」减少，生姜辛散伤胃时缺少甘药缓冲，脾胃弱者易不适',
            correct: true,
            explain: '大枣补中益气以充营血，是「调和」的底子；缺了它，补力与护胃之力都不足。',
          },
          {
            id: 'dazao-b',
            text: '大枣偏甜，去掉后药更苦更「有效」',
            correct: false,
            explain: '大枣并非矫味剂，而是补脾和营的药理组成，去之无益。',
          },
          {
            id: 'dazao-c',
            text: '没影响，因为甘草同样能补气',
            correct: false,
            explain: '甘草虽能补气调和，但大枣益营血、养胃气的角色无法被完全替代。',
          },
          {
            id: 'dazao-d',
            text: '去掉大枣后发汗作用会增强',
            correct: false,
            explain: '大枣本身不敛汗，去掉它并不会增强发汗。',
          },
        ],
      },
      {
        id: 'zhi-gancao',
        name: '炙甘草',
        role: '使药——益气和中，调和诸药',
        note: '甘平，补中益气，调和辛散与酸收，使全方「汗而不过、补而不滞」。',
        removalQuestion: '把炙甘草去掉，桂枝汤会怎样？',
        removalOptions: [
          {
            id: 'zhi-gancao-a',
            text: '失去调和枢纽，桂枝与芍药、生姜与大枣之间缺少「和事佬」，散与收容易失衡',
            correct: true,
            explain: '甘草居中调和诸药，兼补脾胃，使散收有度，是全方的稳定器。',
          },
          {
            id: 'zhi-gancao-b',
            text: '方子会更苦，但效果完全一样',
            correct: false,
            explain: '甘草不是调味品，它的调和补中作用是功能性的，并非可有可无。',
          },
          {
            id: 'zhi-gancao-c',
            text: '发汗会减弱，感冒好得慢',
            correct: false,
            explain: '甘草并不助发汗，去掉它不会影响发汗强度。',
          },
          {
            id: 'zhi-gancao-d',
            text: '可用白术代替甘草的调和作用',
            correct: false,
            explain: '白术健脾燥湿，并无调和诸药之功，不能代替甘草。',
          },
        ],
      },
    ],
    overallIdea:
      '桂枝＋白芍，一辛一酸、一散一收，调和营卫；生姜＋大枣，一辛一甘，助卫和营、化生气血；炙甘草居中调和。全方「汗中寓补、散中有收」，是调和营卫、解肌发表的祖方。',
    safety:
      '本内容用于传统医学知识学习，不构成个人用药或治疗建议。桂枝汤为解表剂，表实无汗、温病初起及里热盛者不宜；临床使用须经中医师辨证处方。',
  },

  // ============================================================
  // 2. 四君子汤 — 益气健脾之基础方
  // ============================================================
  {
    id: 'formula-si-jun-zi-tang',
    name: '四君子汤',
    source: '《太平惠民和剂局方》（宋代官修方书）',
    function: '益气健脾',
    indication: '脾胃气虚证：面色萎白，语声低微，气短乏力，食少便溏，舌淡苔白，脉虚弱。',
    herbs: [
      {
        id: 'renshen',
        name: '人参',
        role: '君药——大补元气，健脾养胃',
        note: '甘温，为补气第一要药，直接补益脾胃之气，是方中「补」的主力。',
        removalQuestion: '如果少了人参，四君子汤还叫「补气方」吗？',
        removalOptions: [
          {
            id: 'renshen-a',
            text: '补气之力大减，方子从「以补为主」沦为平淡的健脾渗湿之剂',
            correct: true,
            explain: '人参是方中唯一的峻补元气之品，少了它，补气的核心就没了。',
          },
          {
            id: 'renshen-b',
            text: '白术能完全代替人参补气',
            correct: false,
            explain: '白术以健脾燥湿见长，补气之力远不及人参，二者不能互换。',
          },
          {
            id: 'renshen-c',
            text: '没了人参方子会更平和，更适合所有人',
            correct: false,
            explain: '失去补气主将后，方义改变，不再对脾胃气虚之证。',
          },
          {
            id: 'renshen-d',
            text: '甘草能代替人参补气',
            correct: false,
            explain: '甘草益气和中但力薄，为调和之使药，替代不了人参。',
          },
        ],
      },
      {
        id: 'baizhu',
        name: '白术',
        role: '臣药——健脾燥湿',
        note: '苦甘温，健脾益气、燥湿利水，帮助脾把「运化」这台机器转起来。',
        removalQuestion: '把白术去掉，四君子汤会怎样？',
        removalOptions: [
          {
            id: 'baizhu-a',
            text: '健脾乏力，湿浊无从化解，食少便溏等「脾失健运」之症难以改善',
            correct: true,
            explain: '白术是健脾燥湿的核心，负责解决脾虚生湿的问题，少了它运化之路不通。',
          },
          {
            id: 'baizhu-b',
            text: '没什么影响，白术只是辅助',
            correct: false,
            explain: '白术为臣药，承担「燥湿健脾」的关键任务，并非可有可无。',
          },
          {
            id: 'baizhu-c',
            text: '茯苓可以完全代替白术',
            correct: false,
            explain: '茯苓长于渗湿利水，健脾之力弱，且无燥湿之功，不能完全替代。',
          },
          {
            id: 'baizhu-d',
            text: '去掉白术后方子补气更强',
            correct: false,
            explain: '白术不去湿则脾运不健，气也难以补进去，去之补气反受拖累。',
          },
        ],
      },
      {
        id: 'fuling',
        name: '茯苓',
        role: '佐药——健脾渗湿',
        note: '甘淡平，利水渗湿、健脾宁心，与白术配伍一燥一渗，共祛脾湿。',
        removalQuestion: '少了茯苓，四君子汤还完整吗？',
        removalOptions: [
          {
            id: 'fuling-a',
            text: '湿邪失去「下渗」的出路，只靠白术燥湿，湿浊易留滞不去',
            correct: true,
            explain: '白术燥湿于中，茯苓渗湿于下，一燥一渗相须为用；缺了茯苓，排湿通路不畅。',
          },
          {
            id: 'fuling-b',
            text: '没关系，白术一味就够了',
            correct: false,
            explain: '白术燥湿但不渗利，湿邪缺少从小便而去的出路，单靠白术不够。',
          },
          {
            id: 'fuling-c',
            text: '去掉茯苓后补气效果增强',
            correct: false,
            explain: '茯苓并不碍补气，去之不会增强补气，反而使祛湿力减。',
          },
          {
            id: 'fuling-d',
            text: '甘草可以代替茯苓渗湿',
            correct: false,
            explain: '甘草甘缓和中，无渗湿利水之功。',
          },
        ],
      },
      {
        id: 'zhi-gancao-sijunzi',
        name: '炙甘草',
        role: '使药——益气和中，调和诸药',
        note: '甘平，补气和中，调和人参、白术、茯苓三药，使补而不峻、燥而不伤。',
        removalQuestion: '去掉炙甘草，四君子汤会怎样？',
        removalOptions: [
          {
            id: 'zhi-gancao-sijunzi-a',
            text: '失去和中调和的枢纽，诸药之间缺少衔接，且补中之力减一分',
            correct: true,
            explain: '甘草补脾和中、调和诸药，使全方补而不滞、燥而不过。',
          },
          {
            id: 'zhi-gancao-sijunzi-b',
            text: '没有影响，甘草纯属凑数',
            correct: false,
            explain: '甘草的益气和中作用与其他三味相得益彰，并非凑数。',
          },
          {
            id: 'zhi-gancao-sijunzi-c',
            text: '去掉后燥性减弱，更适合阴虚之人',
            correct: false,
            explain: '四君子汤本就为气虚湿困设，去甘草不改变其性质与适应证。',
          },
          {
            id: 'zhi-gancao-sijunzi-d',
            text: '大枣可完全代替甘草',
            correct: false,
            explain: '大枣虽补脾，但无调和诸药之功。',
          },
        ],
      },
    ],
    overallIdea:
      '人参补气为君，白术健脾燥湿为臣，茯苓渗湿健脾为佐，炙甘草和中为使。四味皆平和甘温，如「君子」般从容守中，是补气健脾的基础方，后世许多补脾方都由它加减化裁而来。',
    safety:
      '本内容用于传统医学知识学习，不构成个人用药或治疗建议。四君子汤偏温补，实证、热证及阴虚内热者不宜；人参品种与用量须遵医嘱，感冒期间不宜进补。',
  },

  // ============================================================
  // 3. 六味地黄丸 — 三补三泻之滋阴名方
  // ============================================================
  {
    id: 'formula-liu-wei-di-huang-wan',
    name: '六味地黄丸',
    source: '《小儿药证直诀》（北宋·钱乙，由《金匮要略》肾气丸去桂附化裁而来）',
    function: '滋补肝肾',
    indication: '肝肾阴虚证：腰膝酸软，头晕目眩，耳鸣耳聋，盗汗遗精，骨蒸潮热，手足心热，舌红少苔，脉沉细数。',
    herbs: [
      {
        id: 'shudihuang',
        name: '熟地黄',
        role: '君药——滋补肾阴，填精益髓',
        note: '甘微温，质润，专入肾经，滋阴补血、填精益髓，是「三补」之首。',
        removalQuestion: '如果少了熟地黄，六味地黄丸还补得动肾阴吗？',
        removalOptions: [
          {
            id: 'shudihuang-a',
            text: '失去滋阴填精的主将，「补」的力量大减，方子将不成其为滋肾方',
            correct: true,
            explain: '熟地是全方滋阴的核心，量也最大；缺了它，肾阴无源可补。',
          },
          {
            id: 'shudihuang-b',
            text: '山茱萸能完全顶替熟地黄滋补肾阴',
            correct: false,
            explain: '山茱萸偏于补肝涩精，滋肾阴之力远不及熟地，二者不能互换。',
          },
          {
            id: 'shudihuang-c',
            text: '少熟地后「泻」药比例升高，更适合实证之人',
            correct: false,
            explain: '去掉君药会破坏三补三泻的配比，方义尽失，并非变通之法。',
          },
          {
            id: 'shudihuang-d',
            text: '缺熟地没关系，多喝水就能补阴',
            correct: false,
            explain: '熟地是药力所系，补水不能替代药物的滋肾填精之功。',
          },
        ],
      },
      {
        id: 'shanzhuyu',
        name: '山茱萸',
        role: '臣药——补养肝肾，收敛固涩',
        note: '酸微温，补益肝肾、涩精止汗，与熟地相配，肝肾同补。',
        removalQuestion: '把山茱萸去掉，六味地黄丸会怎样？',
        removalOptions: [
          {
            id: 'shanzhuyu-a',
            text: '肝肾同补的「两条腿」断了一条，且失去固涩之力，遗精盗汗难收敛',
            correct: true,
            explain: '山茱萸补肝又固涩，既助熟地补阴，又收住精汗不外泄，缺之则补而不固。',
          },
          {
            id: 'shanzhuyu-b',
            text: '没影响，山茱萸可有可无',
            correct: false,
            explain: '山茱萸为臣药，承担补肝涩精之职，是方中重要一环。',
          },
          {
            id: 'shanzhuyu-c',
            text: '山药可完全代替山茱萸',
            correct: false,
            explain: '山药补脾固肾，性味甘平，无酸涩收敛之功，替代不了山茱萸。',
          },
          {
            id: 'shanzhuyu-d',
            text: '去掉山茱萸后泻火作用更强',
            correct: false,
            explain: '清泻虚热由丹皮、泽泻负责，与山茱萸无直接关系。',
          },
        ],
      },
      {
        id: 'shanyao',
        name: '山药',
        role: '臣药——补脾固肾，益气养阴',
        note: '甘平，补脾益肾、固涩精气，脾肾双补，使补阴有生化之源。',
        removalQuestion: '少了山药，六味地黄丸还完整吗？',
        removalOptions: [
          {
            id: 'shanyao-a',
            text: '脾肾之间的「桥梁」缺失，后天生化乏源，补肾阴缺少物质支撑',
            correct: true,
            explain: '山药补脾以资生化，脾健则肾阴有源，缺之则补力难以为继。',
          },
          {
            id: 'shanyao-b',
            text: '山药只是食材，去掉无妨',
            correct: false,
            explain: '山药在方中是臣药，承担补脾固肾之责，并非可有可无。',
          },
          {
            id: 'shanyao-c',
            text: '茯苓能代替山药补脾',
            correct: false,
            explain: '茯苓渗湿健脾但不滋阴固精，与山药作用方向不同。',
          },
          {
            id: 'shanyao-d',
            text: '去掉山药后补阴更快',
            correct: false,
            explain: '无脾胃运化则药力难以吸收，去山药反而不利于补阴。',
          },
        ],
      },
      {
        id: 'zexie',
        name: '泽泻',
        role: '佐药——泄肾浊，防熟地之滋腻',
        note: '甘寒，利水渗湿泄热，使熟地补而不腻，浊邪从小便而去。',
        removalQuestion: '把泽泻去掉会怎样？',
        removalOptions: [
          {
            id: 'zexie-a',
            text: '肾中浊邪失去排泄之路，熟地滋腻之性易留滞碍胃，补而难化',
            correct: true,
            explain: '泽泻是「三泻」之一，泄肾中虚火浊湿，保证补药清灵流通。',
          },
          {
            id: 'zexie-b',
            text: '去掉泽泻后补力大增',
            correct: false,
            explain: '无泻则补药壅滞，浊邪不去，补力反而难以发挥。',
          },
          {
            id: 'zexie-c',
            text: '泽泻是泻药，方中本不该有',
            correct: false,
            explain: '「三补三泻」正是本方特色，泽泻是配伍结构的关键部分。',
          },
          {
            id: 'zexie-d',
            text: '茯苓可完全代替泽泻',
            correct: false,
            explain: '茯苓渗脾湿，泽泻泄肾浊，各有所司，不能互相替代。',
          },
        ],
      },
      {
        id: 'mudanpi',
        name: '牡丹皮',
        role: '佐药——清虚热，泻肝火',
        note: '苦辛微寒，清泄肝火、退虚热，制约山茱萸之温，防止肝火妄动。',
        removalQuestion: '少了牡丹皮，六味地黄丸会怎样？',
        removalOptions: [
          {
            id: 'mudanpi-a',
            text: '肝火虚热失去清泄之路，骨蒸潮热、手足心热等阴虚火旺之象难以平息',
            correct: true,
            explain: '丹皮清泻肝火虚热，是「泻」中针对火热的关键一味。',
          },
          {
            id: 'mudanpi-b',
            text: '没影响，丹皮可有可无',
            correct: false,
            explain: '阴虚常伴火旺，丹皮清火是方义的一部分，缺之则热象不解。',
          },
          {
            id: 'mudanpi-c',
            text: '去掉丹皮后补阴更快',
            correct: false,
            explain: '火不清则阴更伤，去丹皮补阴反受拖累。',
          },
          {
            id: 'mudanpi-d',
            text: '泽泻可代替丹皮清虚热',
            correct: false,
            explain: '泽泻泄湿浊而非清肝火，作用不同。',
          },
        ],
      },
      {
        id: 'fuling-lwdh',
        name: '茯苓',
        role: '佐药——渗脾湿，助山药健脾',
        note: '甘淡平，健脾渗湿，使脾健运则肾精生化有源，与山药相配补中有运。',
        removalQuestion: '把茯苓从六味地黄丸中拿走会怎样？',
        removalOptions: [
          {
            id: 'fuling-lwdh-a',
            text: '脾湿失去渗利之路，山药补脾之力受限，且三泻少一「泻」，方中平衡被打破',
            correct: true,
            explain: '茯苓渗脾湿、助脾运，是三泻中针对中焦的一环，缺之则补药呆滞。',
          },
          {
            id: 'fuling-lwdh-b',
            text: '茯苓是利水药，去掉更利于补肾',
            correct: false,
            explain: '脾湿不除则运化无力，补肾之药难以吸收，去之反碍补肾。',
          },
          {
            id: 'fuling-lwdh-c',
            text: '泽泻可完全代替茯苓',
            correct: false,
            explain: '泽泻泄肾浊，茯苓渗脾湿，分工不同。',
          },
          {
            id: 'fuling-lwdh-d',
            text: '去掉茯苓后熟地吸收更好',
            correct: false,
            explain: '茯苓助脾运化，恰能帮助滋腻之熟地吸收，去之吸收反差。',
          },
        ],
      },
    ],
    overallIdea:
      '熟地滋肾阴、山茱萸养肝涩精、山药补脾固肾，三补治本；泽泻泄肾浊、丹皮清肝火、茯苓渗脾湿，三泻治标。补中有泻、寓泻于补，「三补三泻」使滋阴而不留湿、补虚而不助火，是肝肾阴虚的经典结构。',
    safety:
      '本内容用于传统医学知识学习，不构成个人用药或治疗建议。六味地黄丸为滋阴之剂，脾胃虚寒、便溏食少者不宜久服；熟地滋腻，需在医生指导下辨证使用。',
  },

  // ============================================================
  // 4. 理中丸 — 温中祛寒之基础方
  // ============================================================
  {
    id: 'formula-li-zhong-wan',
    name: '理中丸',
    source: '《伤寒论》（东汉·张仲景）',
    function: '温中祛寒，补气健脾',
    indication: '脾胃虚寒证：脘腹冷痛，喜温喜按，自利不渴，畏寒肢冷，呕吐食少，舌淡苔白滑，脉沉细或迟缓。',
    herbs: [
      {
        id: 'ganjiang',
        name: '干姜',
        role: '君药——温中祛寒，温运脾阳',
        note: '辛热，直入中焦，温脾胃之阳、散中焦之寒，是「温」的发动机。',
        removalQuestion: '如果少了干姜，理中丸还能「温中」吗？',
        removalOptions: [
          {
            id: 'ganjiang-a',
            text: '失去温散中寒的核心，方子从温中祛寒变成平淡的补气剂，冷痛喜温之证无从化解',
            correct: true,
            explain: '干姜是全方唯一辛热温中之品，是「理中」的关键，缺之则寒邪不去。',
          },
          {
            id: 'ganjiang-b',
            text: '人参能代替干姜温中',
            correct: false,
            explain: '人参补气而不散寒，温阳之力远不及干姜。',
          },
          {
            id: 'ganjiang-c',
            text: '去掉干姜后更适合阴虚火旺之人',
            correct: false,
            explain: '理中丸本就是为虚寒设，去干姜则方义改变，并非变通。',
          },
          {
            id: 'ganjiang-d',
            text: '生姜可完全代替干姜',
            correct: false,
            explain: '生姜走表散寒、温胃止呕，偏于表散；干姜守中温阳，专散中寒，不能互换。',
          },
        ],
      },
      {
        id: 'renshen-lzw',
        name: '人参',
        role: '臣药——补气健脾',
        note: '甘温，补益脾胃之气，与干姜一温一补，温补兼施。',
        removalQuestion: '把人参去掉，理中丸会怎样？',
        removalOptions: [
          {
            id: 'renshen-lzw-a',
            text: '「温」有余而「补」不足，脾胃气虚无药可托，中阳失去物质基础难复',
            correct: true,
            explain: '干姜温阳需有气可温，人参补气使阳有所附，缺之则温而不补。',
          },
          {
            id: 'renshen-lzw-b',
            text: '没影响，白术也能补气',
            correct: false,
            explain: '白术健脾燥湿，补气之力有限，不能代替人参。',
          },
          {
            id: 'renshen-lzw-c',
            text: '去掉人参后温中更快',
            correct: false,
            explain: '气不补则阳不复，去人参温中反难持久。',
          },
          {
            id: 'renshen-lzw-d',
            text: '甘草可完全代替人参',
            correct: false,
            explain: '甘草和中力薄，补气之功不能与人参同日而语。',
          },
        ],
      },
      {
        id: 'baizhu-lzw',
        name: '白术',
        role: '佐药——健脾燥湿',
        note: '苦甘温，健脾益气、燥湿和中，针对虚寒常伴的湿浊而设。',
        removalQuestion: '少了白术，理中丸还完整吗？',
        removalOptions: [
          {
            id: 'baizhu-lzw-a',
            text: '脾失健运之湿无从化解，自利、苔白滑等湿象难以改善',
            correct: true,
            explain: '白术燥湿健脾，帮助脾运化，缺之则湿浊留滞。',
          },
          {
            id: 'baizhu-lzw-b',
            text: '干姜能燥湿，白术多余',
            correct: false,
            explain: '干姜温中散寒，燥湿之力不及白术，二者各司其职。',
          },
          {
            id: 'baizhu-lzw-c',
            text: '去掉白术后方子更补',
            correct: false,
            explain: '湿不去则脾运不健，补益难收功。',
          },
          {
            id: 'baizhu-lzw-d',
            text: '茯苓可完全代替白术',
            correct: false,
            explain: '茯苓渗湿但不燥湿，健脾之力亦不及白术。',
          },
        ],
      },
      {
        id: 'zhi-gancao-lzw',
        name: '炙甘草',
        role: '使药——益气和中，调和诸药',
        note: '甘温，补中益气、调和干姜之辛热与人参白术之温补，使温而不燥。',
        removalQuestion: '把炙甘草从理中丸中拿走会怎样？',
        removalOptions: [
          {
            id: 'zhi-gancao-lzw-a',
            text: '失去和中协调之力，干姜辛热少甘药缓冲，且补中之力减一分',
            correct: true,
            explain: '甘草益气和中，缓和辛热，使全方温补有度。',
          },
          {
            id: 'zhi-gancao-lzw-b',
            text: '没影响，甘草纯属点缀',
            correct: false,
            explain: '甘草在理中丸中既补气又调和，作用实在。',
          },
          {
            id: 'zhi-gancao-lzw-c',
            text: '去掉后温中作用更强',
            correct: false,
            explain: '甘草并不抑制温中，去之反失调和。',
          },
          {
            id: 'zhi-gancao-lzw-d',
            text: '可用大枣完全代替甘草',
            correct: false,
            explain: '大枣补脾和营，但无调和诸药之功。',
          },
        ],
      },
    ],
    overallIdea:
      '干姜温中祛寒为君，人参补气健脾为臣，白术健脾燥湿为佐，炙甘草益气和中为使。一温一补一燥一和，中焦阳气复、寒邪散、脾运健，故名「理中」。',
    safety:
      '本内容用于传统医学知识学习，不构成个人用药或治疗建议。理中丸性偏温燥，阴虚内热、湿热中阻者不宜；方中干姜、附子类温热药须遵医嘱使用。',
  },

  // ============================================================
  // 5. 逍遥散 — 疏肝养血健脾之和方
  // ============================================================
  {
    id: 'formula-xiao-yao-san',
    name: '逍遥散',
    source: '《太平惠民和剂局方》（宋代官修方书）',
    function: '疏肝解郁，养血健脾',
    indication: '肝郁血虚脾弱证：两胁作痛，头痛目眩，口燥咽干，神疲食少，或月经不调、乳房胀痛，脉弦而虚。',
    herbs: [
      {
        id: 'chaihu',
        name: '柴胡',
        role: '君药——疏肝解郁',
        note: '苦辛微寒，条达肝气、解郁散结，是「疏」的主力，使肝气畅达不郁结。',
        removalQuestion: '如果少了柴胡，逍遥散还能「逍遥」吗？',
        removalOptions: [
          {
            id: 'chaihu-a',
            text: '失去疏肝解郁的主将，肝气郁结无从条达，方子退化为普通的养血健脾方',
            correct: true,
            explain: '柴胡是方中「疏肝」的核心，缺之则肝郁不舒，逍遥之义尽失。',
          },
          {
            id: 'chaihu-b',
            text: '薄荷能完全代替柴胡疏肝',
            correct: false,
            explain: '薄荷只是佐药，借其辛凉疏散助柴胡之力，疏肝解郁之功远不及柴胡。',
          },
          {
            id: 'chaihu-c',
            text: '去掉柴胡后更适合肝火旺的人',
            correct: false,
            explain: '柴胡用量轻则疏肝，去之则方不对证，并非降火之法。',
          },
          {
            id: 'chaihu-d',
            text: '白芍能代替柴胡疏肝',
            correct: false,
            explain: '白芍养血柔肝、性偏收敛，与柴胡的辛散升达方向相反。',
          },
        ],
      },
      {
        id: 'danggui',
        name: '当归',
        role: '臣药——养血活血，调经止痛',
        note: '甘辛温，补血活血、调经止痛，与白芍共养肝血，血充则肝体得养。',
        removalQuestion: '把当归去掉，逍遥散会怎样？',
        removalOptions: [
          {
            id: 'danggui-a',
            text: '养血之力大减，肝血不足则肝体失养，月经不调等血虚之症难以改善',
            correct: true,
            explain: '当归为养血要药，且能活血调经，缺之则「养血」一环落空。',
          },
          {
            id: 'danggui-b',
            text: '没影响，白芍一味即可养血',
            correct: false,
            explain: '白芍养血敛阴但无活血之功，当归补血活血相须为用，缺一不可。',
          },
          {
            id: 'danggui-c',
            text: '去掉当归后疏肝更强',
            correct: false,
            explain: '当归并不抑制疏肝，去之反使血虚难复。',
          },
          {
            id: 'danggui-d',
            text: '熟地可完全代替当归',
            correct: false,
            explain: '熟地滋腻守中，无当归活血行散之功，与方中「逍遥」之性不合。',
          },
        ],
      },
      {
        id: 'baishao-xy',
        name: '白芍',
        role: '臣药——养血柔肝，缓急止痛',
        note: '酸苦微寒，养血敛阴、柔肝缓急，与柴胡一散一柔，体用兼顾。',
        removalQuestion: '少了白芍，逍遥散还「体用兼顾」吗？',
        removalOptions: [
          {
            id: 'baishao-xy-a',
            text: '肝体失于濡养，柴胡辛散无柔药制约，恐疏泄太过而伤肝阴',
            correct: true,
            explain: '白芍柔肝养体，与柴胡「散肝用」互补，缺之则只疏不养。',
          },
          {
            id: 'baishao-xy-b',
            text: '白芍可有可无',
            correct: false,
            explain: '白芍是养血柔肝的臣药，承担「体」的一面，不可或缺。',
          },
          {
            id: 'baishao-xy-c',
            text: '当归可完全代替白芍柔肝',
            correct: false,
            explain: '当归养血活血，敛阴柔肝之力不及白芍。',
          },
          {
            id: 'baishao-xy-d',
            text: '去掉白芍后疏肝更快',
            correct: false,
            explain: '一味辛散反伤肝体，快则快矣，久则肝阴耗损。',
          },
        ],
      },
      {
        id: 'baizhu-xy',
        name: '白术',
        role: '佐药——健脾益气',
        note: '苦甘温，健脾益气、燥湿和中，与茯苓同扶脾土，取「肝病实脾」之意。',
        removalQuestion: '把白术去掉，逍遥散会怎样？',
        removalOptions: [
          {
            id: 'baizhu-xy-a',
            text: '脾土失于扶持，木郁乘土，神疲食少之症难以改善',
            correct: true,
            explain: '白术茯苓健脾以防肝木乘脾，缺之则中焦失护。',
          },
          {
            id: 'baizhu-xy-b',
            text: '没影响，白术只是辅助',
            correct: false,
            explain: '健脾是全方三分之一的立意（疏肝、养血、健脾），白术是其中关键。',
          },
          {
            id: 'baizhu-xy-c',
            text: '茯苓可完全代替白术',
            correct: false,
            explain: '茯苓渗湿而不燥湿，健脾之力不及白术。',
          },
          {
            id: 'baizhu-xy-d',
            text: '去掉白术后疏肝作用增强',
            correct: false,
            explain: '脾虚则肝更易乘之，去白术反使脾土更弱。',
          },
        ],
      },
      {
        id: 'fuling-xy',
        name: '茯苓',
        role: '佐药——健脾渗湿，宁心安神',
        note: '甘淡平，健脾渗湿，与白术相配补脾助运，兼安心神。',
        removalQuestion: '少了茯苓，逍遥散还完整吗？',
        removalOptions: [
          {
            id: 'fuling-xy-a',
            text: '脾湿失去渗利之路，脾运不健，「实脾」之力减半',
            correct: true,
            explain: '白术燥湿于中，茯苓渗湿于下，缺一则祛湿不彻、健脾不力。',
          },
          {
            id: 'fuling-xy-b',
            text: '茯苓可有可无',
            correct: false,
            explain: '茯苓承担渗湿健脾与宁心之职，是「实脾」重要一环。',
          },
          {
            id: 'fuling-xy-c',
            text: '甘草能代替茯苓渗湿',
            correct: false,
            explain: '甘草和中，无渗湿之功。',
          },
          {
            id: 'fuling-xy-d',
            text: '去掉茯苓后补血更快',
            correct: false,
            explain: '脾运不健则气血生化乏源，去茯苓反碍补血。',
          },
        ],
      },
      {
        id: 'zhi-gancao-xy',
        name: '炙甘草',
        role: '使药——益气和中，调和诸药',
        note: '甘平，益气补中、调和肝脾，使疏而不燥、补而不滞。',
        removalQuestion: '把炙甘草从逍遥散中拿走会怎样？',
        removalOptions: [
          {
            id: 'zhi-gancao-xy-a',
            text: '失去调和肝脾的枢纽，疏肝与健脾之间缺少衔接，和中之力减一分',
            correct: true,
            explain: '甘草居中调和，兼补脾气，使全方「疏、养、健」三法相融。',
          },
          {
            id: 'zhi-gancao-xy-b',
            text: '没影响，甘草纯属凑数',
            correct: false,
            explain: '甘草调和诸药、益气和中，作用不可或缺。',
          },
          {
            id: 'zhi-gancao-xy-c',
            text: '去掉甘草后疏肝更快',
            correct: false,
            explain: '甘草不碍疏肝，去之反失调和。',
          },
          {
            id: 'zhi-gancao-xy-d',
            text: '可用大枣完全代替甘草',
            correct: false,
            explain: '大枣补脾和营，但无调和诸药之功。',
          },
        ],
      },
    ],
    overallIdea:
      '柴胡疏肝解郁为君；当归、白芍养血柔肝为臣，体用兼顾；白术、茯苓健脾实土为佐，防肝木乘脾；炙甘草和中为使。原方尚配薄荷助柴胡疏散、生姜温胃和中。疏、养、健三法并施，肝郁得疏、血虚得养、脾弱得健，故名「逍遥」。',
    safety:
      '本内容用于传统医学知识学习，不构成个人用药或治疗建议。逍遥散以疏肝健脾为功，阴虚火旺、肝阳上亢者不宜单用；服药期间忌恼怒忧郁，具体用药须遵医嘱。',
  },

  // ============================================================
  // 6. 四物汤 — 补血调血之祖方
  // ============================================================
  {
    id: 'formula-si-wu-tang',
    name: '四物汤',
    source: '《太平惠民和剂局方》（本方源于唐代《仙授理伤续断秘方》）',
    function: '补血调血',
    indication: '营血虚滞证：心悸失眠，头晕目眩，面色无华，妇人月经不调、量少或经闭，脐腹作痛，舌淡，脉细弦或细涩。',
    herbs: [
      {
        id: 'shudihuang-swt',
        name: '熟地黄',
        role: '君药——滋阴补血，填精益髓',
        note: '甘微温，专于滋阴补血，为「补血」的主力，直接补充血之物质基础。',
        removalQuestion: '如果少了熟地黄，四物汤还补得动血吗？',
        removalOptions: [
          {
            id: 'shudihuang-swt-a',
            text: '失去滋阴补血之主将，血之物质来源断绝，方子退化为活血调经之剂',
            correct: true,
            explain: '熟地是方中补血的核心，缺之则「补」不成其为补。',
          },
          {
            id: 'shudihuang-swt-b',
            text: '当归能完全代替熟地补血',
            correct: false,
            explain: '当归补血兼活血，但滋阴之力远不及熟地，且补血之「体」仍赖熟地。',
          },
          {
            id: 'shudihuang-swt-c',
            text: '去掉熟地后活血更强，月经来得更顺畅',
            correct: false,
            explain: '血虚之人越活血越虚，无补血之根，单行活血是误治。',
          },
          {
            id: 'shudihuang-swt-d',
            text: '白芍可完全代替熟地补血',
            correct: false,
            explain: '白芍养血敛阴，重在「敛」，补血填精之力不及熟地。',
          },
        ],
      },
      {
        id: 'danggui-swt',
        name: '当归',
        role: '臣药——补血活血，调经止痛',
        note: '甘辛温，补血而不滞血、活血而不伤血，为血中圣药，兼调经止痛。',
        removalQuestion: '把当归从四物汤中拿走会怎样？',
        removalOptions: [
          {
            id: 'danggui-swt-a',
            text: '失去补血活血的枢纽，血虚易滞、滞则作痛，月经不调与腹痛难以兼顾',
            correct: true,
            explain: '当归补血活血一体两面，缺之则补而难通，血虚夹滞之证不解。',
          },
          {
            id: 'danggui-swt-b',
            text: '没影响，川芎能代替当归',
            correct: false,
            explain: '川芎行气活血而不补血，补血之功当归不可替代。',
          },
          {
            id: 'danggui-swt-c',
            text: '去掉当归后补血更纯',
            correct: false,
            explain: '血虚常伴血滞，当归的「动」恰是四物汤补而不滞的关键。',
          },
          {
            id: 'danggui-swt-d',
            text: '熟地可完全代替当归调经',
            correct: false,
            explain: '熟地滋阴守中，无活血调经之能。',
          },
        ],
      },
      {
        id: 'baishao-swt',
        name: '白芍',
        role: '佐药——养血敛阴，柔肝止痛',
        note: '酸苦微寒，养血敛阴、柔肝缓急，与熟地当归同补血分，并敛阴防辛散太过。',
        removalQuestion: '少了白芍，四物汤会怎样？',
        removalOptions: [
          {
            id: 'baishao-swt-a',
            text: '养血敛阴之力减损，且缺少「静」的一面，方中动静失衡，辛散易伤阴',
            correct: true,
            explain: '白芍敛阴柔肝，与川芎之动相配一静一动，缺之则补血少敛。',
          },
          {
            id: 'baishao-swt-b',
            text: '白芍可有可无',
            correct: false,
            explain: '白芍是养血敛阴的佐药，承担「收」的一面，不可或缺。',
          },
          {
            id: 'baishao-swt-c',
            text: '当归能代替白芍敛阴',
            correct: false,
            explain: '当归辛温走窜，无敛阴之功。',
          },
          {
            id: 'baishao-swt-d',
            text: '去掉白芍后活血更强',
            correct: false,
            explain: '无白芍收敛，辛药伤阴，血愈亏则愈难调。',
          },
        ],
      },
      {
        id: 'chuanxiong',
        name: '川芎',
        role: '使药——活血行气，调畅气血',
        note: '辛温，行气活血、祛风止痛，为「血中气药」，使全方补而不滞。',
        removalQuestion: '把川芎去掉，四物汤会怎样？',
        removalOptions: [
          {
            id: 'chuanxiong-a',
            text: '失去行气活血的「动」力，补血药聚而难运，易滋腻壅滞，「调血」之义落空',
            correct: true,
            explain: '川芎使熟地当归补而不滞，血行则诸药能达，缺之则补而难化。',
          },
          {
            id: 'chuanxiong-b',
            text: '没影响，川芎只是点缀',
            correct: false,
            explain: '川芎「血中气药」，承担方中行散调血之职，并非点缀。',
          },
          {
            id: 'chuanxiong-c',
            text: '去掉川芎后补血更纯粹',
            correct: false,
            explain: '「补血调血」重在调，无川芎则血滞不行，补亦无功。',
          },
          {
            id: 'chuanxiong-d',
            text: '当归可完全代替川芎行气',
            correct: false,
            explain: '当归活血有余，行气走窜之力不及川芎。',
          },
        ],
      },
    ],
    overallIdea:
      '熟地滋阴补血为君，当归补血活血为臣，白芍养血敛阴为佐，川芎行气活血为使。四药「补中有通、补而不滞」，动静相合，是补血调血、妇科调经的祖方，后世四物汤类方多由此加减。',
    safety:
      '本内容用于传统医学知识学习，不构成个人用药或治疗建议。四物汤性偏温补，阴虚火旺、湿热内盛者不宜；月经量多者慎用活血之品；孕妇及经期用药须遵医嘱。',
  },

  // ============================================================
  // 7. 麻黄汤 — 发汗解表之峻剂
  // ============================================================
  {
    id: 'formula-ma-huang-tang',
    name: '麻黄汤',
    source: '《伤寒论》（东汉·张仲景）',
    function: '发汗解表，宣肺平喘',
    indication: '外感风寒表实证：恶寒发热，头身疼痛，无汗而喘，舌苔薄白，脉浮紧。',
    herbs: [
      {
        id: 'mahuang',
        name: '麻黄',
        role: '君药——发汗解表，宣肺平喘',
        note: '辛微苦温，开腠理、发汗解表以散风寒，宣肺气以平喘，是表实无汗之首选。',
        removalQuestion: '如果少了麻黄，麻黄汤还「发得出汗」吗？',
        removalOptions: [
          {
            id: 'mahuang-a',
            text: '失去发汗解表的主将，方子几乎丧失开腠理散寒之力，表实无汗之证无从解除',
            correct: true,
            explain: '麻黄是全方发汗的核心，无麻黄则「发汗解表」名存实亡。',
          },
          {
            id: 'mahuang-b',
            text: '桂枝能完全代替麻黄发汗',
            correct: false,
            explain: '桂枝发汗力缓，须借麻黄开腠理才能峻汗，桂枝只是助麻黄之力。',
          },
          {
            id: 'mahuang-c',
            text: '杏仁能代替麻黄宣肺平喘',
            correct: false,
            explain: '杏仁降肺气为辅，麻黄宣肺为主，一宣一降相须，缺麻黄则肺气不宣。',
          },
          {
            id: 'mahuang-d',
            text: '去掉麻黄后更适合表虚之人',
            correct: false,
            explain: '麻黄汤本就是表实无汗之方，去麻黄则方义全失，并非变通。',
          },
        ],
      },
      {
        id: 'guizhi-mht',
        name: '桂枝',
        role: '臣药——解肌发表，温通经脉',
        note: '辛甘温，助麻黄发汗解表，兼温经止痛，缓解头身疼痛。',
        removalQuestion: '把桂枝从麻黄汤中拿走会怎样？',
        removalOptions: [
          {
            id: 'guizhi-mht-a',
            text: '发汗之力大减，麻黄无桂枝相助则开腠不力，且温通经脉止痛之力缺失',
            correct: true,
            explain: '麻黄得桂枝则发汗力宏，桂枝得麻黄则达表更速，相须为用；缺桂枝则汗出不彻。',
          },
          {
            id: 'guizhi-mht-b',
            text: '没影响，桂枝可有可无',
            correct: false,
            explain: '桂枝是方中臣药，助麻黄开腠发汗，兼解身痛，不可或缺。',
          },
          {
            id: 'guizhi-mht-c',
            text: '去掉桂枝后发汗更猛',
            correct: false,
            explain: '无桂枝相助，麻黄开腠之力不足，发汗反而减弱。',
          },
          {
            id: 'guizhi-mht-d',
            text: '生姜可完全代替桂枝',
            correct: false,
            explain: '生姜散寒力缓，温通经脉止痛之力远不及桂枝。',
          },
        ],
      },
      {
        id: 'xingren',
        name: '杏仁',
        role: '佐药——降利肺气，止咳平喘',
        note: '苦微温，降肺气、止咳平喘，与麻黄一宣一降，恢复肺的宣降功能。',
        removalQuestion: '少了杏仁，麻黄汤会怎样？',
        removalOptions: [
          {
            id: 'xingren-a',
            text: '肺气只宣不降，「喘」症难以平复，宣降失衡',
            correct: true,
            explain: '麻黄宣肺、杏仁降肺，一宣一降肺气乃和；缺杏仁则降路不通，喘难平。',
          },
          {
            id: 'xingren-b',
            text: '杏仁只是止咳药，去掉无妨',
            correct: false,
            explain: '杏仁在方中承担「降」的一面，与麻黄配伍是平喘关键，并非单纯止咳。',
          },
          {
            id: 'xingren-c',
            text: '去掉杏仁后发汗更强',
            correct: false,
            explain: '杏仁不碍发汗，去之反失宣降平衡。',
          },
          {
            id: 'xingren-d',
            text: '甘草可代替杏仁降气',
            correct: false,
            explain: '甘草和中，无降肺气之功。',
          },
        ],
      },
      {
        id: 'zhi-gancao-mht',
        name: '炙甘草',
        role: '使药——调和诸药，护胃安中',
        note: '甘平，调和麻黄桂枝之峻烈，使汗而不过、宣而不伤。',
        removalQuestion: '把炙甘草从麻黄汤中拿走会怎样？',
        removalOptions: [
          {
            id: 'zhi-gancao-mht-a',
            text: '失去制约峻烈之力的缓冲，麻桂辛散无度，恐汗出太过而伤正气',
            correct: true,
            explain: '甘草调和麻桂之峻，护中焦正气，使发汗「中病即止」而不伤正。',
          },
          {
            id: 'zhi-gancao-mht-b',
            text: '没影响，甘草纯属点缀',
            correct: false,
            explain: '甘草的调和护胃作用对峻汗之方尤为重要，并非点缀。',
          },
          {
            id: 'zhi-gancao-mht-c',
            text: '去掉甘草后发汗更彻底',
            correct: false,
            explain: '无甘草制约则易过汗伤阳，表虽解而正已伤，得不偿失。',
          },
          {
            id: 'zhi-gancao-mht-d',
            text: '大枣可完全代替甘草',
            correct: false,
            explain: '大枣补中但调和诸药之力不及甘草。',
          },
        ],
      },
    ],
    overallIdea:
      '麻黄发汗解表、宣肺平喘为君；桂枝解肌发表、温通经脉为臣，助麻黄开腠发汗；杏仁降利肺气为佐，与麻黄一宣一降；炙甘草调和诸药为使，缓峻护正。全方「开、宣、降、和」，为外感风寒表实无汗证的峻汗之方。',
    safety:
      '本内容用于传统医学知识学习，不构成个人用药或治疗建议。麻黄汤发汗力峻，仅适用于表实无汗之证；表虚自汗、体虚外感、温热病及咽痛者禁用，须经中医师辨证后方可使用。',
  },

  // ============================================================
  // 8. 小柴胡汤 — 和解少阳之代表方
  // ============================================================
  {
    id: 'formula-xiao-chai-hu-tang',
    name: '小柴胡汤',
    source: '《伤寒论》（东汉·张仲景）',
    function: '和解少阳',
    indication: '伤寒少阳证：往来寒热，胸胁苦满，默默不欲饮食，心烦喜呕，口苦，咽干，目眩，舌苔薄白，脉弦。',
    herbs: [
      {
        id: 'chaihu-xcht',
        name: '柴胡',
        role: '君药——透达少阳半表之邪，疏利气机',
        note: '苦辛微寒，轻清升散，透少阳半表之邪外出，兼疏肝利胆、调畅气机。',
        removalQuestion: '如果少了柴胡，小柴胡汤还「和解」得了少阳吗？',
        removalOptions: [
          {
            id: 'chaihu-xcht-a',
            text: '失去透邪外达的主将，半表之邪无出路，方子从和解剂沦为清里之剂',
            correct: true,
            explain: '柴胡是「和解少阳」的核心，透半表之邪、疏少阳枢机，缺之则和义尽失。',
          },
          {
            id: 'chaihu-xcht-b',
            text: '黄芩能完全代替柴胡',
            correct: false,
            explain: '黄芩清半里之热，方向是「清」而非「透」，与柴胡一透一清相配，不能互替。',
          },
          {
            id: 'chaihu-xcht-c',
            text: '去掉柴胡后更适合纯里热证',
            correct: false,
            explain: '无柴胡则少阳之邪不解，并非对症之变通。',
          },
          {
            id: 'chaihu-xcht-d',
            text: '生姜能代替柴胡透邪',
            correct: false,
            explain: '生姜温胃散寒，无透达少阳之功。',
          },
        ],
      },
      {
        id: 'huangqin',
        name: '黄芩',
        role: '臣药——清泄少阳半里之热',
        note: '苦寒，清少阳胆热，与柴胡一透一清，表里同治，为和解之关键组合。',
        removalQuestion: '把黄芩从小柴胡汤中拿走会怎样？',
        removalOptions: [
          {
            id: 'huangqin-a',
            text: '半里之热无从清泄，口苦咽干目眩等热象难以解除，柴胡独透而热不去',
            correct: true,
            explain: '黄芩清胆热、柴胡透表邪，一清一透方为和解；缺黄芩则热无出路。',
          },
          {
            id: 'huangqin-b',
            text: '没影响，黄芩可有可无',
            correct: false,
            explain: '黄芩承担方中「清」的一面，是和解结构的一半，缺之则方义残缺。',
          },
          {
            id: 'huangqin-c',
            text: '去掉黄芩后透邪更快',
            correct: false,
            explain: '单透不清，热邪留恋，反致病情迁延。',
          },
          {
            id: 'huangqin-d',
            text: '甘草可代替黄芩清热',
            correct: false,
            explain: '甘草和中，无清热之功。',
          },
        ],
      },
      {
        id: 'renshen-xcht',
        name: '人参',
        role: '佐药——益气扶正，防邪内传',
        note: '甘温，补中益气，扶助正气以拒邪内传，兼养胃气以助祛邪。',
        removalQuestion: '把人参从少阳和解之方中拿走，妥当吗？',
        removalOptions: [
          {
            id: 'renshen-xcht-a',
            text: '正气失援，邪气易乘虚内传，且胃气弱则「默默不欲饮食」之症难复',
            correct: true,
            explain: '少阳为枢，扶正方能御邪内传；人参补中益气是「和解」中托底的一环。',
          },
          {
            id: 'renshen-xcht-b',
            text: '人参是补药，少阳病不该用',
            correct: false,
            explain: '小柴胡汤用人参正是「扶正祛邪」的示范，邪在半表半里，正虚则邪陷。',
          },
          {
            id: 'renshen-xcht-c',
            text: '去掉人参后和解更快',
            correct: false,
            explain: '无正气托底，邪气易深入，和解反难奏效。',
          },
          {
            id: 'renshen-xcht-d',
            text: '大枣可完全代替人参扶正',
            correct: false,
            explain: '大枣补中力薄，扶正御邪之力不及人参。',
          },
        ],
      },
      {
        id: 'banxia',
        name: '半夏',
        role: '佐药——和胃降逆，散结消痞',
        note: '辛温，降逆止呕、散结消痞，针对「心烦喜呕」与胸胁苦满。',
        removalQuestion: '少了半夏，小柴胡汤会怎样？',
        removalOptions: [
          {
            id: 'banxia-a',
            text: '胃气上逆无药可降，喜呕之症难平，胸胁痰气郁结亦难消散',
            correct: true,
            explain: '半夏降胃气、散结滞，是方中「降」与「散」的主力，缺之则呕逆不解。',
          },
          {
            id: 'banxia-b',
            text: '生姜能完全代替半夏止呕',
            correct: false,
            explain: '生姜助半夏和胃止呕，但降逆散结之力远不及半夏。',
          },
          {
            id: 'banxia-c',
            text: '半夏可有可无',
            correct: false,
            explain: '半夏承担和胃降逆、散结消痞之职，是「喜呕、胸胁苦满」的对证之药。',
          },
          {
            id: 'banxia-d',
            text: '去掉半夏后柴胡透邪更强',
            correct: false,
            explain: '半夏不碍透邪，去之反失降逆散结之功。',
          },
        ],
      },
      {
        id: 'shengjiang-xcht',
        name: '生姜',
        role: '佐药——助半夏和胃止呕，助柴胡散邪',
        note: '辛温，和胃止呕、温散表邪，兼制半夏之毒，与半夏相配「小半夏汤」之意。',
        removalQuestion: '把生姜去掉，小柴胡汤会怎样？',
        removalOptions: [
          {
            id: 'shengjiang-xcht-a',
            text: '和胃止呕之力减损，且失去助柴胡透邪的温散之助',
            correct: true,
            explain: '生姜与半夏相配止呕力彰，又助柴胡疏透，缺之则呕逆难平、透邪力减。',
          },
          {
            id: 'shengjiang-xcht-b',
            text: '生姜只是调味，去掉无妨',
            correct: false,
            explain: '生姜承担和胃止呕与助透之职，作用实在。',
          },
          {
            id: 'shengjiang-xcht-c',
            text: '去掉生姜后清热更强',
            correct: false,
            explain: '生姜不碍清热，去之反失和中之力。',
          },
          {
            id: 'shengjiang-xcht-d',
            text: '大枣可完全代替生姜',
            correct: false,
            explain: '大枣甘补，无辛散止呕之功。',
          },
        ],
      },
      {
        id: 'zhi-gancao-xcht',
        name: '炙甘草',
        role: '使药——益气和中，调和诸药',
        note: '甘平，益气和中、调和柴芩寒热之性，使全方「和」而不偏。',
        removalQuestion: '把炙甘草从小柴胡汤中拿走会怎样？',
        removalOptions: [
          {
            id: 'zhi-gancao-xcht-a',
            text: '失去调和寒热、益气护中的枢纽，柴胡之升散与黄芩之苦寒难以和合',
            correct: true,
            explain: '甘草居中调和，兼扶胃气，是「和法」得以成立的关键一环。',
          },
          {
            id: 'zhi-gancao-xcht-b',
            text: '没影响，甘草纯属凑数',
            correct: false,
            explain: '甘草调和诸药、益气和中，在和解方中尤为重要。',
          },
          {
            id: 'zhi-gancao-xcht-c',
            text: '去掉甘草后和解更快',
            correct: false,
            explain: '无甘草调和，寒热药性相争，反难成「和」。',
          },
          {
            id: 'zhi-gancao-xcht-d',
            text: '大枣可完全代替甘草',
            correct: false,
            explain: '大枣补中但调和之力不及甘草。',
          },
        ],
      },
    ],
    overallIdea:
      '柴胡透少阳半表之邪、黄芩清少阳半里之热，一透一清为和解核心；人参、大枣扶正以御邪内传，半夏、生姜和胃降逆止呕，炙甘草调和诸药。全方「寒热并用、攻补兼施、升降相因」，是和解少阳、调达枢机的代表方。',
    safety:
      '本内容用于传统医学知识学习，不构成个人用药或治疗建议。小柴胡汤为和解剂，纯表证、纯里证不宜单用；方中含柴胡，阴虚火旺、肝阳上亢者慎用；具体用药须经中医师辨证处方。',
  },
];
