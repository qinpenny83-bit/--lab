/**
 * 杏林大典 Phase 5 Batch-2 ——「C 经络学」知识节点样本（Part C1）
 * 节点编号：pb5-me-01 ～ pb5-me-13（共 13 个）
 * 内容依据：《经络腧穴学》规划教材通行知识；经典原文仅采用白名单条目。
 */
export const SAMPLES_PART_C1 = [
  {
    id: 'pb5-me-01',
    title: '十二经脉的命名规律',
    category: 'theory',
    difficulty: 1,
    difficultyLabel: '简单',
    riskTags: ['阴阳三分次序错位', '手足与脏腑对应混淆'],
    intent: '考察十二经脉名称三要素（手足、阴阳、脏腑）的组合规则，以及三阴三阳按四肢内外侧面分布的固定次序',
    facts: [
      { field: 'meridian.naming.threeElements', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.naming.yinyangDivision', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '十二经脉名称由手足、阴阳、脏腑三要素构成，阴阳按四肢内外侧面三分，内侧为太阴、厥阴、少阴，外侧为阳明、少阳、太阳。',
    coreDefinition: '十二经脉命名以手足定上下肢归属，以三阴三阳定阴阳属性与内外前后次序，以脏腑名定所连属之脏或腑，三要素组合成完整经名。',
    safety: { note: '命名规律属理论识记内容，不涉及直接操作风险；关键在于将经脉与脏腑、位置记准，避免临床归经误判。', prohibitions: [] },
    learning: {
      knowledge: '十二经脉命名由三要素构成：一是手足，标示经脉分布于上肢或下肢；二是阴阳，按四肢内侧面为阴、外侧面为阳划分，每侧再分三阴三阳，阴面从前缘到后缘依次为太阴、厥阴、少阴，阳面从前缘到后缘依次为阳明、少阳、太阳；三是所连属的脏腑，阴经属脏络腑，阳经属腑络脏。例如手太阴肺经指行于上肢内侧前缘、属肺之经脉，足阳明胃经指行于下肢外侧前缘、属胃之经脉。三阴三阳的固定次序是后续理解循行、交接与表里关系的基础。',
      misjudgment: '错：认为手足阴阳只表示上下位置，而太阴、厥阴、少阴与阳明、少阳、太阳的排列次序可以任意调换。',
      reasoning: '为什么上肢内侧从前到后是太阴、厥阴、少阴，而外侧是阳明、少阳、太阳？',
      feedback: '四肢内侧为阴面，按经脉所在位置自前缘至后缘依次为太阴、厥阴、少阴；外侧为阳面，自前缘至后缘依次为阳明、少阳、太阳，这是三阴三阳在四肢的标准分布次序。',
      transfer: '若已知某经行于上肢内侧中线，据命名规律应判断其为哪条经脉？'
    }
  },
  {
    id: 'pb5-me-02',
    title: '十二经脉的走向与流注规律',
    category: 'theory',
    difficulty: 2,
    difficultyLabel: '中等',
    riskTags: ['走向口诀误记', '流注次序衔接错误'],
    intent: '考察手三阴、手三阳、足三阳、足三阴的走向规律，以及十二经脉气血流注的固定次序',
    facts: [
      { field: 'meridian.course.directionRule', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.circulation.sequence', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '经脉十二者', canon: '《灵枢·经脉》', chapter: '经脉第十', originalText: '经脉十二者，伏行分肉之间，深而不见', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '十二经脉走向为手三阴从胸走手、手三阳从手走头、足三阳从头走足、足三阴从足走腹，流注次序以肺经起始、肝经终末而复注于肺，如环无端。',
    coreDefinition: '走向规律以四肢末端为界划分：胸至手、手至头、头至足、足至腹胸，构成阴阳相贯的流注环；气血自中焦肺经起始，依次相传十二经后复注于肺。',
    safety: { note: '走向与流注为理论框架，应用于经脉辨证与取穴时须与具体循行部位核对，流注次序用于解释病候传变。', prohibitions: [] },
    learning: {
      knowledge: '手三阴经从胸走手，交手三阳经；手三阳经从手走头，交足三阳经；足三阳经从头走足，交足三阴经；足三阴经从足走腹胸，复交手三阴经。气血流注次序为：肺经、大肠经、胃经、脾经、心经、小肠经、膀胱经、肾经、心包经、三焦经、胆经、肝经，再复注于肺经。手足阴阳表里经在四肢末端相接，同名阳经在头面相接，手足阴经在胸中相接，十二经气血由此周流循环，如环无端。',
      misjudgment: '错：把流注次序记成从肝经开始、按脏腑五行相生顺推，从而将肺与大肠的衔接次序颠倒。',
      reasoning: '为什么十二经流注循环以肺经起始，而不是从心经或脾经开始？',
      feedback: '肺经起于中焦，中焦为脾胃受纳腐熟、水谷精微化生之所，是气血生化之源，故十二经流注自手太阴肺经起始，经手足阴阳经相传一周后复注于肺，如环无端。',
      transfer: '若病邪沿流注次序自胃经传入脾经，临床可从哪些传变表现加以识别？'
    }
  },
  {
    id: 'pb5-me-03',
    title: '十二经脉的表里关系与交接规律',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['表里配属错误', '三类交接部位混淆'],
    intent: '考察十二经脉阴阳表里配属、属络关系，以及四肢末端、头面、胸中三类交接部位的规律',
    facts: [
      { field: 'meridian.exteriorInterior.matching', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.junction.threeSites', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '十二经以阴阳配成六对表里关系，阴经属脏络腑、阳经属腑络脏，表里经在四肢末端交接，同名阳经在头面交接，阴经在胸中交接。',
    coreDefinition: '表里配属为手足同名阴阳经成对，如肺与大肠、心与小肠；阴经属本脏而络其表里之腑，阳经属本腑而络其表里之脏；交接分四肢末端、头面、胸中三类部位。',
    safety: { note: '表里经理论用于解释脏腑病相移与络穴主治，针刺络穴可治表里两经病，不直接涉及操作风险。', prohibitions: [] },
    learning: {
      knowledge: '十二经脉以手足为纲、阴阳为目配成六对表里关系：肺与大肠、心与小肠、心包与三焦、脾与胃、肝与胆、肾与膀胱。阴经属脏络腑，阳经属腑络脏，如手太阴肺经属肺络大肠，手阳明大肠经属大肠络肺。交接规律有三：其一，表里阴阳经在四肢末端交接，如肺经与大肠经在食指端相接；其二，手足同名阳经在头面部交接，如手阳明经止于鼻旁迎香与足阳明经起点相接；其三，手足阴经在胸中交接，如足太阴经注心中交于手少阴经。表里关系是络穴主治与脏腑同治的依据。',
      misjudgment: '错：认为表里经在头面部交接，因此把肺经与大肠经的交接部位误记为鼻旁迎香。',
      reasoning: '为什么表里经在四肢末端交接，而同名阳经却在头面部交接？',
      feedback: '表里阴阳经一内一外并行，气血在四肢末端阴阳脉气交接处相贯流通；同名阳经均上行头面，故在头面按循行依次相交接，如手阳明经止于迎香与足阳明经起点相接。',
      transfer: '若患者手阳明经与足阳明经同病，可从哪一交界部位解释其症候的连续传变？'
    }
  },
  {
    id: 'pb5-me-04',
    title: '十二经脉在四肢与头面躯干的分布规律',
    category: 'theory',
    difficulty: 2,
    difficultyLabel: '中等',
    riskTags: ['内踝上八寸上下分布转换', '头面三阳分布错位'],
    intent: '考察十二经脉在四肢内外侧、头面与躯干的循行分布规律，以及下肢内踝上八寸上下的特殊位置转换',
    facts: [
      { field: 'meridian.limbDistribution.rule', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.headTrunk.distribution', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '四肢内侧为阴、外侧为阳，内侧前中后依次为太阴、厥阴、少阴，外侧前中后依次为阳明、少阳、太阳；头面阳明行面额、少阳行头侧、太阳行头项后。',
    coreDefinition: '四肢分布以内外侧面定阴阳，各分前中后三条线；头面三阳按阳明、少阳、太阳自前面至头项分布；躯干胸腹为阴、背腰为阳，足三阴与任脉行腹胸，足太阳与督脉行背腰。',
    safety: { note: '下肢内踝上八寸以下足厥阴与足太阴前后位置互换属易错点，用于定位取穴时须先核实具体经脉。', prohibitions: [] },
    learning: {
      knowledge: '上肢内侧前缘为手太阴、中线为手厥阴、后缘为手少阴；上肢外侧前缘为手阳明、中线为手少阳、后缘为手太阳。下肢外侧前缘为足阳明、中线为足少阳、后缘为足太阳；下肢内侧内踝上八寸以上前缘为足太阴、中线为足厥阴、后缘为足少阴，八寸以下前缘改为足厥阴、中线为足太阴，此为下肢分布的特殊转换。头面部阳明行于面额及前头，少阳行于头侧，太阳行于后头项部。躯干以任脉行腹胸正中、足阳明行胸腹前外侧、足太阳行背腰、督脉行背正中，构成阴阳对称的分布格局。',
      misjudgment: '错：认为下肢内侧前缘自始至终都是足太阴脾经，不知内踝上八寸以下前中两线互换。',
      reasoning: '为什么足厥阴肝经与足太阴脾经在下肢内踝上八寸处前后位置互换？',
      feedback: '足厥阴肝经在内踝上八寸以下行于下肢内侧前缘，上至八寸以上交出足太阴之后而改行中线，故八寸以下前缘为肝经、八寸以上前缘为脾经，此为教材明示的循行位置转换。',
      transfer: '若在下肢内侧中线偏上段出现带状疼痛，按分布规律应首先考虑何经病变？'
    }
  },
  {
    id: 'pb5-me-05',
    title: '手太阴肺经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['起止点记忆偏差', '主治遗漏咽喉病', '中府深刺风险'],
    intent: '考察肺经循行起止、属络关系、主治要点与常用腧穴',
    facts: [
      { field: 'meridian.lung.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.lung.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.lung.points', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '肺手太阴之脉', canon: '《灵枢·经脉》', chapter: '经脉第十', originalText: '肺手太阴之脉，起于中焦，下络大肠，还循胃口，上膈属肺', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '手太阴肺经起于中焦、属肺络大肠、行上肢内侧前缘止于拇指桡侧端，主治咳喘、咽喉病及上肢内侧前缘痛麻，常用穴中府、尺泽、列缺、太渊、少商。',
    coreDefinition: '肺经起于中焦，下络大肠，还循胃口，上膈属肺，从胸出腋行于上肢内侧前缘，止于拇指桡侧端少商；主治肺系咳喘、咽喉病及经脉循行部位病。',
    safety: { note: '中府穴内邻肺脏，针刺宜向外平刺或斜刺，不可直刺深刺，以免损伤肺脏致气胸；太渊穴近桡动脉搏动处，操作时避开动脉。', prohibitions: ['中府穴禁直刺深刺', '太渊穴针刺避开桡动脉'] },
    learning: {
      knowledge: '手太阴肺经起于中焦，下络大肠，还循胃口，上膈属肺，从肺系横出腋下，沿上肢内侧前缘下行，经寸口、鱼际，止于拇指桡侧端少商；其支脉从腕后列缺走向食指桡侧端，交于手阳明大肠经。主治咳嗽、气喘、胸闷等肺系病，咽喉肿痛，以及上肢内侧前缘的疼痛、麻木、厥冷；常用腧穴有中府（募穴）、尺泽（合穴）、列缺（络穴）、太渊（输穴、原穴、脉会）、少商（井穴），其中少商点刺出血善治咽喉肿痛。',
      misjudgment: '错：认为肺经起于胸中肺脏、止于食指桡侧端，把起点与络穴列缺的走向方向记反。',
      reasoning: '为什么肺经虽名手太阴，起点却在腹部的“中焦”而非胸部？',
      feedback: '肺经起于中焦，因中焦为水谷精微化生之源，肺朝百脉而输布气血，故其经脉自中焦起始，下络大肠后还循胃口上膈属肺，体现肺与脾胃、大肠的密切联系。',
      transfer: '若患者外感后咳嗽咽痛，且沿上肢内侧前缘出现酸楚，应从肺经哪一穴位入手分析？'
    }
  },
  {
    id: 'pb5-me-06',
    title: '手阳明大肠经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['入下齿与入上齿混淆', '头面左右交叉走向遗漏'],
    intent: '考察大肠经循行起止、头面走行、主治范围及面部交叉特点',
    facts: [
      { field: 'meridian.largeIntestine.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.largeIntestine.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '手阳明大肠经起于食指桡侧端商阳，行上肢外侧前缘，上头面入下齿，左右交叉止于对侧鼻旁迎香，主治头面五官病、热病及上肢外侧前缘病。',
    coreDefinition: '大肠经起于商阳，沿上肢外侧前缘上肩，交大椎，入缺盆络肺属大肠，上行颈面入下齿中，还出挟口交人中，左之右、右之左，止于对侧鼻旁迎香，是头面部左右交叉的阳经。',
    safety: { note: '迎香穴位于鼻翼外缘中点旁，宜向内上方斜刺或平刺；面部腧穴进针宜浅，避免深刺伤及深部组织。', prohibitions: ['面部腧穴进针宜浅，避免深刺'] },
    learning: {
      knowledge: '手阳明大肠经起于食指桡侧端商阳，沿食指上出合谷，行于上肢外侧前缘，经肩髃上肩，交于大椎，入缺盆络肺，下膈属大肠；其支者从缺盆上颈贯颊，入下齿中，还出挟口，交人中，左之右、右之左，上挟鼻孔，止于对侧鼻旁迎香。主治齿痛、鼻塞、鼻衄、咽喉肿痛等头面五官病，热病，以及上肢外侧前缘痛麻；常用穴合谷为原穴，善治头面诸疾，曲池为合穴，善治热病与皮肤病。',
      misjudgment: '错：认为大肠经入上齿中，与胃经入下齿的归属颠倒，且忽略其左右交叉止于对侧。',
      reasoning: '为什么大肠经在面部左右交叉后止于对侧鼻旁，而不像一般经脉止于本侧？',
      feedback: '大肠经在面部经人中处左之右、右之左交叉后上挟鼻孔，止于对侧迎香并与足阳明胃经相接，这是同名阳经在头面交接的典型体现，也解释了对侧面部病症可取本侧合谷治疗的现象。',
      transfer: '若患者下齿疼痛，据经脉归属应首先考虑何经病变，远端可取何穴？'
    }
  },
  {
    id: 'pb5-me-07',
    title: '足阳明胃经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['起于鼻交頞中理解偏差', '多气多血属性遗漏', '厉兑定位错误'],
    intent: '考察胃经循行、多气多血属性、主治范围及头面腹部的分布特点',
    facts: [
      { field: 'meridian.stomach.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.stomach.qiBloodCharacter', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.stomach.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '胃足阳明之脉', canon: '《灵枢·经脉》', chapter: '经脉第十', originalText: '胃足阳明之脉，起于鼻，交頞中', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '足阳明胃经起于鼻旁，行面颈胸腹与下肢外侧前缘，止于第二趾外侧端厉兑，为多气多血之经，主治胃肠病、头面五官病、神志病与热病。',
    coreDefinition: '胃经起于鼻旁交頞中，旁纳太阳之脉，下循鼻外入上齿，环唇挟口，沿面颊、颈、胸腹前外侧下行，经下肢外侧前缘止于第二趾外侧端厉兑；为多气多血之经。',
    safety: { note: '天枢等腹部腧穴针刺须注意深度与方向，腹壁薄处禁深刺；承泣穴位于眶下缘，禁深刺与提插捻转，防眶内出血。', prohibitions: ['承泣穴禁深刺、禁提插捻转', '腹部腧穴禁深刺直刺'] },
    learning: {
      knowledge: '足阳明胃经起于鼻旁，交頞中，旁纳太阳之脉，下循鼻外入上齿中，环唇挟口，沿下颌角上行耳前，至额颅；其下行支经人迎、缺盆，下膈属胃络脾，直行经乳头中线、腹部挟脐旁二寸下行，沿下肢外侧前缘经足三里、解溪，止于第二趾外侧端厉兑，支脉还上入大趾间交足太阴脾经。胃为水谷之海、多气多血之经，主治胃痛、呕吐、腹胀等胃肠病，齿痛、口眼㖞斜等头面五官病，以及神志病与热病；足三里为保健要穴，天枢为大肠募穴。',
      misjudgment: '错：认为胃经入下齿中，且足三里属于脾经腧穴，混淆了两经的循行与穴位归属。',
      reasoning: '为什么头面部阳明经病变最常表现为齿痛、口眼㖞斜等症候？',
      feedback: '阳明经多气多血，胃经在面部分布广泛，环唇挟口、入上齿、循颊车，经脉所过之处气血壅滞或亏虚即现口㖞、齿痛、面痛，故头面五官病多从阳明经论治。',
      transfer: '若患者胃脘灼痛伴前额头痛、牙龈肿痛，据经络辨证应归何经并首选何组腧穴？'
    }
  },
  {
    id: 'pb5-me-08',
    title: '足太阴脾经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['隐白定位错误', '连舌本散舌下遗漏', '妇科主治遗漏'],
    intent: '考察脾经循行起止、属络关系、主治范围及舌部联络特点',
    facts: [
      { field: 'meridian.spleen.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.spleen.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '足太阴脾经起于足大趾内侧端隐白，行下肢内侧前缘，入腹属脾络胃，连舌本散舌下，主治脾胃病、妇科病及下肢内侧病。',
    coreDefinition: '脾经起于隐白，沿足内侧、下肢内侧前缘上行，入腹属脾络胃，上膈挟咽，连舌本散舌下；主治腹胀、泄泻等脾胃病，月经过多、崩漏等妇科病及下肢内侧肿痛。',
    safety: { note: '三阴交为妇科常用穴，孕妇一般禁针；腹部腧穴如大横宜浅刺，避免损伤腹腔脏器。', prohibitions: ['孕妇禁针三阴交'] },
    learning: {
      knowledge: '足太阴脾经起于足大趾内侧端隐白，沿足内侧赤白肉际上行，经内踝前，上小腿内侧，循胫骨后缘，交出足厥阴之前，上行膝股内侧前缘，入腹属脾络胃，上膈挟咽，连舌本散舌下；其支者复从胃别上膈注心中，交于手少阴心经。主治胃脘痛、腹胀、便溏、泄泻等脾胃病，月经不调、崩漏、带下等妇科病，以及下肢内侧肿痛厥冷；常用穴隐白（井穴，治崩漏）、太白（原穴）、三阴交（足三阴交会穴）、阴陵泉（合穴，利湿）。',
      misjudgment: '错：认为脾经止于足大趾外侧端，且只主治消化病而遗漏妇科病主治。',
      reasoning: '为什么脾经病变可出现舌本强痛、舌下不适等舌部症状？',
      feedback: '脾经循行连舌本、散舌下，经脉所过主治所及，脾失健运或经气不利时即可见舌强、舌痛等舌部表现。',
      transfer: '若女性患者月经量多色淡、食少便溏，据脾经主治特点应如何选穴？'
    }
  },
  {
    id: 'pb5-me-09',
    title: '手少阴心经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['起于心中属心系理解', '少冲与小指尺侧混淆', '神志病主治遗漏'],
    intent: '考察心经循行起止、属络关系、主治要点及神志病主治',
    facts: [
      { field: 'meridian.heart.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.heart.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '心手少阴之脉', canon: '《灵枢·经脉》', chapter: '经脉第十', originalText: '心手少阴之脉，起于心中，出属心系', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '手少阴心经起于心中，出属心系络小肠，行上肢内侧后缘，止于小指桡侧端少冲，主治心、神志病及上肢内侧后缘病。',
    coreDefinition: '心经起于心中，出属心系，下膈络小肠；其支者从心系上挟咽，系目系；其直行者从心系上肺，下出腋下，沿上肢内侧后缘，止于小指桡侧端少冲。',
    safety: { note: '极泉穴位于腋窝，针刺须避开腋动脉；少海等肘部腧穴按常规操作即可。', prohibitions: ['极泉穴避开腋动脉'] },
    learning: {
      knowledge: '手少阴心经起于心中，出属心系，下膈络小肠；其支者从心系上挟咽，系目系；其直行者从心系上肺，出腋下极泉，沿上肢内侧后缘下行，经肘内侧、掌后锐骨端神门，入掌内后缘，止于小指桡侧端少冲，交于手太阳小肠经。主治心痛、心悸、怔忡等心病，失眠、健忘、癫狂痫等神志病，以及上肢内侧后缘痛麻；常用穴神门为原穴、输穴，为治失眠要穴，少冲为井穴，点刺可治昏迷、热病。',
      misjudgment: '错：认为心经止于小指尺侧端少泽，与小肠经少泽穴的位置相混。',
      reasoning: '为什么心经主治包含癫狂等神志病，而不限于心痛心悸？',
      feedback: '心主神明、藏神，心经属心系，其支者系目系，经脉与心神直接相通，心经经气失常即可见失眠、癫狂、神志不清等神明失守之症。',
      transfer: '若患者心烦失眠，伴上肢内侧后缘疼痛，按归经应选心经何穴为主？'
    }
  },
  {
    id: 'pb5-me-10',
    title: '手太阳小肠经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['少泽定位错误', '绕肩胛走行遗漏', '止于目内眦与听宫混淆'],
    intent: '考察小肠经循行起止、肩胛绕行、头面走行与主治范围',
    facts: [
      { field: 'meridian.smallIntestine.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.smallIntestine.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '手太阳小肠经起于小指尺侧端少泽，行上肢外侧后缘，绕肩胛，经面颊止于目内眦，主治头项强痛、肩背痛与耳目病。',
    coreDefinition: '小肠经起于少泽，沿手尺侧、上肢外侧后缘上行，绕肩胛交肩上，入缺盆络心循咽下膈抵胃属小肠；其支者从缺盆循颈上颊，至目锐眦，却入耳中；另一支抵鼻至目内眦，斜络于颧，交足太阳膀胱经。',
    safety: { note: '肩贞、天宗等肩背部腧穴针刺注意角度与深度，避免损伤深部组织；本经穴多治头项肩背病。', prohibitions: [] },
    learning: {
      knowledge: '手太阳小肠经起于小指尺侧端少泽，沿手尺侧上行，出踝中，直上循臂骨下廉，出肘内侧两筋之间，上循臑外后廉，出肩解，绕肩胛，交肩上，入缺盆，络心，循咽下膈，抵胃属小肠；其支者从缺盆循颈上颊，至目锐眦，却入耳中；其支者别颊上䪼抵鼻，至目内眦，斜络于颧，交足太阳经。主治头项强痛、肩背痛、耳聋耳鸣、目赤等病；常用穴少泽（井穴）、后溪（输穴、八脉交会穴通督脉）、小海（合穴）、听宫（治耳鸣要穴）。',
      misjudgment: '错：认为小肠经止于耳前听宫，而把本经循行终点误记为耳部。',
      reasoning: '为什么小肠经与膀胱经在目内眦相接，这一交接有何临床意义？',
      feedback: '小肠经支者抵鼻至目内眦与足太阳膀胱经相接，手足太阳为同名阳经，头面交接后两经同主头项腰背与目疾，故后溪可与睛明、天柱等配合治疗头项强痛与目疾。',
      transfer: '若患者落枕后头项强痛不能回顾，据小肠经循行可选取哪一远端腧穴？'
    }
  },
  {
    id: 'pb5-me-11',
    title: '足太阳膀胱经与背俞穴',
    category: 'theory',
    difficulty: 4,
    difficultyLabel: '易混淆',
    riskTags: ['背俞穴定位与次序', '第一侧线与第二侧线混淆', '睛明深刺风险'],
    intent: '考察膀胱经循行、背部背俞穴分布及其主治意义，辨析第一侧线易混概念',
    facts: [
      { field: 'meridian.bladder.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.backShu.distribution', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.bladder.juyangCharacter', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '膀胱足太阳之脉', canon: '《灵枢·经脉》', chapter: '经脉第十', originalText: '膀胱足太阳之脉，起于目内眦，上额交巅', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '足太阳膀胱经起于目内眦睛明，上额交巅，挟脊行背腰，属膀胱络肾，背部第一侧线分布脏腑背俞穴，为巨阳主一身之表，主治头项腰背及脏腑病。',
    coreDefinition: '膀胱经起于睛明，上额交巅，入络脑，还出别下项，挟脊抵腰中，络肾属膀胱；背部第一侧线距后正中线一寸五分，依次排列肺俞、心俞、肝俞、脾俞、肾俞等背俞穴，第二侧线距三寸；足太阳为巨阳，主一身之表。',
    safety: { note: '睛明穴位于目内眦，针刺禁深刺、禁提插捻转，防眶内血管损伤；背俞穴宜向脊柱方向斜刺，深度适中，防刺伤肺脏致气胸。', prohibitions: ['睛明穴禁深刺、禁提插', '背俞穴防气胸，斜刺为主'] },
    learning: {
      knowledge: '足太阳膀胱经起于目内眦睛明，上额交巅，其支者从巅至耳上角；其直行者从巅入络脑，还出别下项，沿肩胛内侧挟脊，抵腰中，入循膂络肾属膀胱；一支从腰中挟脊贯臀入腘中，另一支从膊内左右别下贯胛挟脊，过髀枢，沿下肢外侧后缘下行，止于小趾外侧端至阴。背部第一侧线挟脊旁开一寸五分，自上而下为肺俞、厥阴俞、心俞、督俞、膈俞、肝俞、胆俞、脾俞、胃俞、三焦俞、肾俞等，主治相应脏腑病；足太阳为巨阳统摄营卫，主一身之表，外感表证、头项腰背痛皆可取之。',
      misjudgment: '错：将心俞、肝俞等背俞穴误认为分布于膀胱经第二侧线，或把肺俞与心俞的上下次序颠倒。',
      reasoning: '为什么外感表证首选足太阳膀胱经论治，而不用阳明或少阳？',
      feedback: '足太阳为巨阳，行于背腰之表，统摄一身之阳与卫外功能，外邪袭表首犯太阳，故表证见恶寒发热、头项强痛，治取膀胱经风门、大杼、委中等疏散表邪。',
      transfer: '若患者咳嗽喘息，据背俞穴分布应在膀胱经背部哪一水平取穴？'
    }
  },
  {
    id: 'pb5-me-12',
    title: '足少阴肾经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['涌泉起点理解偏差', '贯脊属肾络膀胱遗漏', '入肺循喉咙挟舌本遗漏'],
    intent: '考察肾经循行起止、属络关系、主治范围及咽喉部联络特点',
    facts: [
      { field: 'meridian.kidney.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.kidney.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '肾足少阴之脉', canon: '《灵枢·经脉》', chapter: '经脉第十', originalText: '肾足少阴之脉，起于小指之下，邪走足心', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '足少阴肾经起于足小趾下斜走足心涌泉，行下肢内侧后缘，贯脊属肾络膀胱，上贯肝膈入肺循喉咙挟舌本，主治肾系、妇科与咽喉病。',
    coreDefinition: '肾经起于足小趾之下，斜走足心涌泉，沿内踝后、下肢内侧后缘上行，贯脊属肾络膀胱；其直者从肾上贯肝膈入肺中，循喉咙挟舌本；其支者从肺出络心注胸中，交手厥阴心包经。',
    safety: { note: '涌泉穴位于足底，刺激较强，体虚者注意手法；本经穴多用于肾系病，按常规操作。', prohibitions: [] },
    learning: {
      knowledge: '足少阴肾经起于足小趾之下，斜走足心涌泉，出于然谷之下，循内踝之后，别入跟中，上腨内，出腘内廉，上股内后廉，贯脊属肾络膀胱；其直者从肾上贯肝膈，入肺中，循喉咙，挟舌本；其支者从肺出络心，注胸中，交手厥阴心包经。主治水肿、遗尿、尿频、腰痛、耳鸣等肾系病，月经不调、不孕等妇科病，以及咽干、咽喉肿痛等咽喉病；常用穴涌泉（井穴）、太溪（原穴、输穴）、照海（八脉交会穴通阴跷）。',
      misjudgment: '错：认为肾经起于足大趾内侧端隐白，与脾经的起点混淆。',
      reasoning: '为什么肾经循行入肺中、循喉咙，因而可主治咳喘与咽喉干痛？',
      feedback: '肾经直行者从肾上贯肝膈入肺中、循喉咙挟舌本，肾阴上滋肺金、润养咽喉，肾经经气不利或肾阴虚时即可现干咳、咽干、喉痛诸症。',
      transfer: '若患者咽干夜甚、腰膝酸软，据肾经循行与主治应选取哪一腧穴？'
    }
  },
  {
    id: 'pb5-me-13',
    title: '手厥阴心包经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['历络三焦理解偏差', '上肢内侧中线定位', '中冲定位错误'],
    intent: '考察心包经循行起止、历络三焦、主治范围及代心受邪特点',
    facts: [
      { field: 'meridian.pericardium.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.pericardium.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '手厥阴心包经起于胸中属心包络，下膈历络三焦，行上肢内侧中线，止于中指端中冲，主治心、胃与神志病。',
    coreDefinition: '心包经起于胸中，出属心包络，下膈历络三焦；其支者循胸出胁，上抵腋下，循上肢内侧中线入肘中，下臂行两筋之间，入掌中，循中指出其端；其支者别掌中循小指次指出其端，交手少阳三焦经。',
    safety: { note: '内关穴位于掌长肌腱与桡侧腕屈肌腱之间，直刺时避开正中神经与血管；本经穴多用于心胸胃神志病，按常规操作。', prohibitions: [] },
    learning: {
      knowledge: '手厥阴心包经起于胸中，出属心包络，下膈历络三焦；其支者循胸出胁，上抵腋下天池，沿上肢内侧中线，经曲泽、郄门、间使、内关、大陵，入掌中劳宫，循中指止于中冲；其支者别掌中循无名指，交于手少阳三焦经。心包代心受邪，故主治心痛、心悸、胸闷等心病，胃痛、呕吐等胃病，以及癫狂、失眠等神志病；常用穴内关为络穴、八脉交会穴通阴维，善治心胸胃病，为急救要穴。',
      misjudgment: '错：认为心包经行于上肢内侧后缘，与心经的循行位置混淆。',
      reasoning: '为什么心包经常被称为“代心受邪”之经，其主治与心经相近？',
      feedback: '心包为心之外卫，心包络代君行令、代心受邪，邪气犯心先及心包，故心包经主治心与神志病和心经基本一致，临床取内关、大陵等可治心痛、癫狂。',
      transfer: '若患者胸痛彻背兼恶心呕吐，据心包经主治可选用哪一常用穴？'
    }
  }
];
