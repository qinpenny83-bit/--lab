/**
 * 杏林大典 Phase 5 Batch-2 ——「C 经络学」知识节点样本（Part C2）
 * 节点编号：pb5-me-14 ～ pb5-me-25（共 12 个）
 * 内容依据：《经络腧穴学》规划教材通行知识；经典原文仅采用白名单条目。
 */
export const SAMPLES_PART_C2 = [
  {
    id: 'pb5-me-14',
    title: '手少阳三焦经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['关冲定位错误', '耳后走行遗漏', '丝竹空止点混淆'],
    intent: '考察三焦经循行起止、耳周走行、主治范围及与耳病的关系',
    facts: [
      { field: 'meridian.sanjiao.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.sanjiao.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '手少阳三焦经起于无名指尺侧端关冲，行上肢外侧中线，经肩颈耳后止于眉梢丝竹空，主治耳、目、头侧与胁肋病。',
    coreDefinition: '三焦经起于关冲，沿无名指尺侧、上肢外侧中线上行，过肩入缺盆，布膻中，散络心包，下膈循属三焦；其支者从膻中上出缺盆，上项系耳后，另一支从耳后入耳中出走耳前，至目锐眦，止于眉梢丝竹空。',
    safety: { note: '翳风穴深部有重要血管神经，禁深刺；丝竹空位于眉梢，面部腧穴宜浅刺。', prohibitions: ['翳风穴禁深刺', '丝竹空宜浅刺'] },
    learning: {
      knowledge: '手少阳三焦经起于无名指尺侧端关冲，沿手背第四、五掌骨间上行，经腕背、上肢外侧中线，过肘尖、肩髎，上肩入缺盆，布膻中，散络心包，下膈循属三焦；其支者从膻中上出缺盆，上项，系耳后直上，出耳上角，屈下颊至䪼；另一支从耳后入耳中，出走耳前，过客主人前，交颊，至目锐眦，止于眉梢丝竹空。主治耳聋、耳鸣、耳痛等耳病，目赤肿痛等目病，偏头痛、胁肋痛及上肢外侧中线病；常用穴外关为络穴、八脉交会穴通阳维，善治头侧耳病。',
      misjudgment: '错：认为三焦经止于耳前听宫，与小肠经的循行终点混淆。',
      reasoning: '为什么三焦经在耳周分布密集，因而成为治疗耳病的主选经脉？',
      feedback: '三焦经支者从耳后入耳中出走耳前，环绕耳周，经脉所过主治所及，故耳聋耳鸣多取外关、中渚、翳风等三焦经穴治疗。',
      transfer: '若患者突发耳聋伴偏头痛，按归经应首选三焦经何穴？'
    }
  },
  {
    id: 'pb5-me-15',
    title: '足少阳胆经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['瞳子髎起点混淆', '头侧走行遗漏', '足窍阴定位错误'],
    intent: '考察胆经循行起止、头侧耳周走行、主治范围及与偏头痛的关系',
    facts: [
      { field: 'meridian.gallbladder.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.gallbladder.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '足少阳胆经起于目外眦瞳子髎，行头侧耳后颈肩，下循胁肋，沿下肢外侧中线止于第四趾外侧端足窍阴，主治头侧、耳目、胁肋与下肢外侧病。',
    coreDefinition: '胆经起于瞳子髎，上抵头角，下耳后，循颈行手少阳之前至肩上，入缺盆；其支者从耳后入耳中出走耳前，至目锐眦后；其直者从缺盆下腋循胸过季胁，下行合髀厌，沿下肢外侧中线，止于第四趾外侧端足窍阴。',
    safety: { note: '风池穴深部近延髓与椎动脉，应朝鼻尖方向斜刺，禁深刺、禁向上深刺；肩井穴深部为肺尖，禁深刺直刺。', prohibitions: ['风池穴禁深刺、朝鼻尖方向刺', '肩井穴禁深刺防气胸'] },
    learning: {
      knowledge: '足少阳胆经起于目外眦瞳子髎，上抵头角，下耳后，循颈行手少阳之前至肩上，退却交出手少阳之后，入缺盆；其支者从耳后入耳中，出走耳前，至目锐眦后；其支者别目锐眦，下大迎，合于手少阳，抵于䪼，下加颊车，下颈合缺盆，下胸中贯膈络肝属胆，循胁里出气街，绕毛际横入髀厌；其直者从缺盆下腋循胸过季胁，下合髀厌，沿下肢外侧中线经风市、阳陵泉、光明、悬钟，止于第四趾外侧端足窍阴。主治偏头痛、目赤、耳聋、胁肋痛、口苦及下肢外侧病；阳陵泉为合穴、筋会，风池治头风目疾。',
      misjudgment: '错：认为胆经起于目内眦睛明，与膀胱经的起点混淆。',
      reasoning: '为什么偏头痛多从足少阳胆经论治，且远端取阳陵泉有效？',
      feedback: '胆经行于头侧，经脉所过主治所及，偏头痛为少阳经气不利之典型病位，远端取阳陵泉可疏利少阳经气，体现循经远取。',
      transfer: '若患者胁肋胀痛、口苦咽干，据胆经主治应如何选穴？'
    }
  },
  {
    id: 'pb5-me-16',
    title: '足厥阴肝经',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['大敦定位错误', '内踝八寸上下分布转换', '绕阴器连目系遗漏'],
    intent: '考察肝经循行起止、下肢特殊分布、属络关系及主治范围',
    facts: [
      { field: 'meridian.liver.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.liver.lowerLimbDistribution', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.liver.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '肝足厥阴之脉', canon: '《灵枢·经脉》', chapter: '经脉第十', originalText: '肝足厥阴之脉，起于大指丛毛之际', sourceTitle: '《灵枢·经脉》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '足厥阴肝经起于足大趾丛毛际大敦，行下肢内侧前缘（内踝上八寸以下），绕阴器上抵小腹属肝络胆，上贯膈布胁肋连目系，主治肝、胁肋、少腹、妇科与前阴病。',
    coreDefinition: '肝经起于大敦，沿足背、内踝前上行，内踝上八寸以下行下肢内侧前缘，交出足太阴之后行中线，循股阴入毛中，过阴器，抵小腹，挟胃属肝络胆，上贯膈布胁肋，循喉咙之后上入颃颡，连目系，上出额与督脉会于巅；其支者从目系下颊里环唇内。',
    safety: { note: '期门穴位于乳头直下第六肋间隙，宜斜刺或平刺，禁深刺直刺防伤肝脏；大敦、行间等足部穴按常规操作。', prohibitions: ['期门穴禁深刺直刺防伤肝'] },
    learning: {
      knowledge: '足厥阴肝经起于足大趾丛毛之际大敦，沿足背内侧上行，经内踝前，上小腿内侧，内踝上八寸处交出足太阴之后，沿下肢内侧中线上行，绕阴器，抵小腹，挟胃属肝络胆，上贯膈布胁肋，循喉咙之后上入颃颡，连目系，上出额与督脉会于巅顶；其支者从目系下颊里环唇内，另一支从肝别贯膈上注肺中交于手太阴。主治胁肋胀痛、少腹痛、头痛目眩等肝经病，月经不调、崩漏、疝气等妇科前阴病，以及癫痫；太冲为原穴善平肝息风，期门为肝之募穴。',
      misjudgment: '错：认为肝经全程行于下肢内侧前缘，忽略了内踝上八寸以下前缘、以上交出太阴后的位置转换。',
      reasoning: '为什么肝经病可出现巅顶头痛，而阳明经头痛多在前额？',
      feedback: '肝经上出额与督脉会于巅，巅顶为肝经所过，故巅顶痛责之于肝；前额为阳明经循行部位，故前额痛归阳明经，此为头痛分经论治的依据。',
      transfer: '若患者胁痛目赤、急躁易怒，据肝经主治可选取何穴疏肝泻热？'
    }
  },
  {
    id: 'pb5-me-17',
    title: '督脉（阳脉之海）',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['阳脉之海功能', '与脑脊髓联系', '风府深刺风险'],
    intent: '考察督脉循行起止、总督诸阳、与脑脊髓的联系及主治范围',
    facts: [
      { field: 'meridian.du.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.du.seaOfYang', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '督脉者', canon: '《素问·骨空论》', chapter: '骨空论篇第六十', originalText: '督脉者，起于少腹以下骨中央', sourceTitle: '《素问·骨空论》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '督脉起于少腹以下骨中央，行腰背正中线上行至头面，总督诸阳经为阳脉之海，与脑、脊髓相关，主治神志、头面与腰脊病。',
    coreDefinition: '督脉起于少腹以下骨中央，下出会阴，沿脊柱上行，至项后风府入属于脑，上巅顶，循额至鼻柱；总督一身之阳经，为阳脉之海，并与脑、脊髓关系密切。',
    safety: { note: '大椎、命门等背部督脉腧穴针刺深度适中，多直刺或向上斜刺；风府穴禁深刺，防伤及延髓。', prohibitions: ['风府穴禁深刺防伤延髓', '背部督脉穴防深刺'] },
    learning: {
      knowledge: '督脉起于少腹以下骨中央，下出会阴，经长强，沿脊柱里面上行，至项后风府穴入属于脑，上巅顶，沿前额下行至鼻柱，止于上唇系带处龈交。督脉行于背部正中，总督手足三阳经与阳维脉，为阳脉之海，与脑、脊髓有直接联系，故主治癫狂痫、昏迷、失眠等神志病，头痛、眩晕等头面病，以及腰脊强痛、脊柱病；常用穴长强（络穴）、腰阳关、命门、大椎（诸阳之会）、百会（巅顶要穴）、水沟（急救要穴）。',
      misjudgment: '错：认为督脉与任脉一样行于腹胸正中线，混淆两脉的循行位置。',
      reasoning: '为什么督脉被称为阳脉之海，而任脉被称为阴脉之海？',
      feedback: '督脉行于背腰正中，与六阳经在大椎等穴交会，总督诸阳，故为阳脉之海；任脉行于腹胸正中，与足三阴经及阴维脉交会，总任诸阴，故为阴脉之海。',
      transfer: '若患者突然昏仆不省人事，据督脉主治与循行应首选何穴急救？'
    }
  },
  {
    id: 'pb5-me-18',
    title: '任脉（阴脉之海）',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['阴脉之海功能', '任主胞胎含义', '中极关元孕妇禁针'],
    intent: '考察任脉循行起止、总任诸阴、任主胞胎及主治范围',
    facts: [
      { field: 'meridian.ren.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.ren.seaOfYin', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '任脉者', canon: '《素问·骨空论》', chapter: '骨空论篇第六十', originalText: '任脉者，起于中极之下，以上毛际', sourceTitle: '《素问·骨空论》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '任脉起于中极之下，行腹胸正中线，总任诸阴经为阴脉之海，任主胞胎，主治腹、胸、咽喉与妇科病。',
    coreDefinition: '任脉起于中极之下，以上毛际，循腹里上关元，至咽喉，上颐循面入目；行于腹胸正中，与足三阴经、阴维脉交会，总任诸阴为阴脉之海，主胞胎。',
    safety: { note: '中极、关元、气海等小腹腧穴孕妇禁针禁灸；天突穴针刺须沿胸骨柄后缘向下刺，禁深刺直刺，防伤主动脉与肺。', prohibitions: ['孕妇禁针中极、关元', '天突穴禁深刺直刺'] },
    learning: {
      knowledge: '任脉起于中极之下，以上毛际，循腹里上关元，至咽喉，上颐循面入目；本经行于腹胸正中线，自会阴经曲骨、中极、关元、气海、神阙、中脘、膻中、天突、廉泉至承浆。任脉与足三阴经在小腹交会，与阴维脉相会，总任一身之阴经，为阴脉之海；任主胞胎，与女子月经、妊娠密切相关。主治小腹痛、月经不调、不孕等妇科病，腹胀、胃痛等腹病，胸痛、咳喘等胸病，以及咽喉病；气海、关元为补益要穴，膻中为气会。',
      misjudgment: '错：认为任脉起于胞中、止于龈交，把督脉的循行起止安到任脉上。',
      reasoning: '为什么任脉被称为“任主胞胎”，与妇科病关系密切？',
      feedback: '任脉起于胞宫附近的中极之下，行于腹胸正中，与足三阴经交会于小腹，总任阴经而主一身之阴，胞胎孕育依赖阴血，故任脉主胞胎，妇科病多从任脉论治。',
      transfer: '若患者产后恶露不尽、小腹冷痛，据任脉主治可选取何穴？'
    }
  },
  {
    id: 'pb5-me-19',
    title: '冲脉与带脉',
    category: 'theory',
    difficulty: 4,
    difficultyLabel: '易混淆',
    riskTags: ['十二经之海与血海归属', '带脉环腰约束功能', '冲脉循行方向'],
    intent: '考察冲脉、带脉的循行、功能称号与主治，辨析奇经易混概念',
    facts: [
      { field: 'meridian.chong.courseAndSea', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.dai.beltFunction', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.chongDai.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [
      { label: '冲脉者', canon: '《素问·骨空论》', chapter: '骨空论篇第六十', originalText: '冲脉者，起于气街，并少阴之经，侠脐上行', sourceTitle: '《素问·骨空论》', sourceType: 'classic_original', status: 'verified' }
    ],
    dosage: null,
    cases: null,
    stdJudgment: '冲脉起于气街并足少阴经上行，为十二经之海、血海；带脉环腰一周约束纵行诸经，主治妇科病、气逆里急与带下腰软。',
    coreDefinition: '冲脉起于气街，并足少阴之经侠脐上行，至胸中而散，为十二经之海、血海，调节十二经气血；带脉起于季胁，环腰一周，约束纵行经脉，主治带下、腰软。',
    safety: { note: '冲脉、带脉理论用于解释妇科与腰腹病机，其循行部位的腧穴操作按所在经脉常规处理，无特殊禁忌。', prohibitions: [] },
    learning: {
      knowledge: '冲脉起于气街，并足少阴之经侠脐上行，至胸中而散；上至于头，下至于足，贯穿全身，能调节十二经气血，故称十二经之海，又因与女子月经密切相关而称血海，冲脉失调可见月经不调、不孕、气逆里急、腹痛等。带脉起于季胁章门，斜向下行，环腰一周，如束带然，约束纵行诸经，带脉失约则见带下量多、腰部酸软如坐水中、下肢痿软；常用穴位有带脉穴、五枢、维道等，临床多与任脉、肝脾经配合调理妇科。',
      misjudgment: '错：认为冲脉为阳脉之海、督脉为血海，将奇经的功能称号互相调换。',
      reasoning: '为什么冲脉称十二经之海，而带脉的作用强调“约束”？',
      feedback: '冲脉并少阴上行、贯穿上下，通行十二经气血且主血海，故称十二经之海；带脉环腰一周如带约束纵行经脉，防止诸经下陷，故曰约束，二者一纵一横，共同维系经气。',
      transfer: '若患者带下量多、腰膝酸软，据带脉功能应如何解释病机并选穴？'
    }
  },
  {
    id: 'pb5-me-20',
    title: '跷脉与维脉',
    category: 'theory',
    difficulty: 4,
    difficultyLabel: '易混淆',
    riskTags: ['阴跷阳跷司眼睑开合', '阴维阳维维系功能', '照海申脉归属混淆'],
    intent: '考察阴阳跷脉、阴阳维脉的循行、功能与主治，辨析易混功能归属',
    facts: [
      { field: 'meridian.qiao.eyeLidAndLimb', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.wei.connection', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.qiaoWei.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '阴跷阳跷司眼睑开合与下肢运动，阴维阳维分别维系联络全身阴经阳经，主治癫痫、不寐与下肢痿痹。',
    coreDefinition: '阴跷脉起于照海，阳跷脉起于申脉，均达目内眦，司眼睑开合与下肢运动；阴维脉维系诸阴经，阳维脉维系诸阳经，分别调节一身之里与外。',
    safety: { note: '跷脉、维脉以照海、申脉、内关、外关等八脉交会穴为用，操作按相应经穴常规，无特殊禁忌。', prohibitions: [] },
    learning: {
      knowledge: '阴跷脉起于足内踝下照海，沿下肢内侧上行，经阴部、胸内，上入缺盆，出人迎前，至目内眦与阳跷脉会合；阳跷脉起于足外踝下申脉，沿下肢外侧上行，经胁肋、肩颈，上口角，至目内眦。跷脉司眼睑开合，主下肢运动，阳跷主一身左右之阳，阴跷主一身左右之阴，跷脉失调可见目张不瞑或目闭不启、失眠、下肢痿痹、癫痫。阴维脉起于筑宾，维系诸阴经；阳维脉起于金门，维系诸阳经，阳维主表，阴维主里，为病可见寒热、胸胁痛；八脉交会穴中照海通阴跷、申脉通阳跷、内关通阴维、外关通阳维。',
      misjudgment: '错：认为阴跷脉与阳跷脉均起于足外踝下申脉，混淆照海与申脉的归属。',
      reasoning: '为什么跷脉病可见眼睑开合失常，如目张不瞑或目闭不启？',
      feedback: '阴阳跷脉交会于目内眦，阴跷气盛则目闭，阳跷气盛则目张，跷脉阴阳失衡即现失眠或嗜睡、眼睑开合失常。',
      transfer: '若患者顽固失眠，据跷脉理论可选用哪两个八脉交会穴配合？'
    }
  },
  {
    id: 'pb5-me-21',
    title: '十二经别与十五络脉',
    category: 'theory',
    difficulty: 4,
    difficultyLabel: '易混淆',
    riskTags: ['经别与络脉功能混淆', '别出部位记错', '十五络脉组成遗漏'],
    intent: '考察经别、络脉的别出部位、循行特点、功能区别及络穴主治',
    facts: [
      { field: 'meridian.jingbie.courseAndFunction', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.luomai.composition', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.luoPoint.indications', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '十二经别从肘膝以上别出，深入体腔属络脏腑，加强表里经联系并扩大主治；十五络脉从络穴分出，沟通表里阴阳两经，络穴可治表里经病。',
    coreDefinition: '经别为十二经脉别行的正经，从肘膝以上别出，深入体腔属络脏腑，上出头项，阴经经别合入相表里阳经经别（六合），加强表里联系；络脉为经脉别出的分支，十五络脉各有络穴，沟通表里经与阴阳。',
    safety: { note: '经别、络脉为理论概念，临床应用时络穴取穴操作按常规进行，飞扬、公孙等络穴均位于肢体安全部位。', prohibitions: [] },
    learning: {
      knowledge: '十二经别从四肢肘膝以上别出，称为“离”，深入胸腹腔属络本经相关脏腑为“入”，浅出体表上行头项为“出”，阴经经别合入相表里的阳经经别为“合”，形成六合。经别的作用在于加强表里两经的联系，扩大腧穴的主治范围（如合谷可治头面病），并深入体腔属络脏腑。十五络脉由十二经脉各一络、任脉络、督脉络及脾之大络组成，各从络穴分出，如肺经列缺、大肠经偏历、脾经公孙、膀胱经飞扬等，主要沟通表里阴阳两经，络穴主治表里两经病症。',
      misjudgment: '错：认为经别从井穴附近别出且不入体腔，把经别与络脉的别出部位和功能混淆。',
      reasoning: '为什么经别虽也加强表里联系，却要强调“从肘膝以上别出”与“深入体腔”？',
      feedback: '经别从肘膝以上别出后深入体腔属络脏腑，使经脉与脏腑直接相连，故能扩大主治、解释远道取穴的机理；络脉从络穴分出，走行较浅，重在沟通表里阴阳。',
      transfer: '若用合谷治疗头面病，据经别理论应如何解释其机理？'
    }
  },
  {
    id: 'pb5-me-22',
    title: '十二经病候概要（是动病与所生病）',
    category: 'theory',
    difficulty: 3,
    difficultyLabel: '困难',
    riskTags: ['是动病与所生病区别', '病候归经判断'],
    intent: '考察是动病、所生病的含义与区别，以及十二经病候在归经辨证中的运用',
    facts: [
      { field: 'meridian.ishidong.definition', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.suosheng.definition', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '是动病指经气变动所致的经脉循行部位病候，所生病指本经所属脏腑病变所生的病候，二者共同构成十二经病候的诊断依据。',
    coreDefinition: '是动病为经气变动引起的经脉循行部位及其所属脏腑病候，如肺经“是动则病肺胀满膨膨而喘咳”；所生病为本经所属脏腑发生病变所生之病候，脏腑症状突出、范围更广。',
    safety: { note: '是动病、所生病用于归经辨证，判断病位时须四诊合参，避免仅凭单条病候下结论。', prohibitions: [] },
    learning: {
      knowledge: '《灵枢·经脉》记载十二经脉各有“是动则病”与“是主……所生病”两类病候。是动病指经脉经气变动失常时，沿经脉循行部位出现的病候及所络属脏腑的功能异常，如肺经是动则病肺胀满膨膨而喘咳、缺盆中痛；所生病指本脏本腑发生病变时所生的病候，范围更广，如肺经所生病见咳、上气、喘喝、烦心、胸满、臑臂内前廉痛厥、掌中热。临床将两类病候结合经脉循行部位与脏腑功能进行归经辨证，作为选经取穴的依据。',
      misjudgment: '错：认为是动病专指脏腑病，所生病专指循行部位病，把二者的含义颠倒。',
      reasoning: '为什么同一经脉的是动病候以循行部位表现为主，而所生病候涵盖脏腑病更多？',
      feedback: '是动病为经气变动所致，先见经脉所过之处症状；所生病为本经所属脏腑病，故脏腑症状突出、范围更广，二者病位深浅与侧重不同。',
      transfer: '若患者咳喘并见缺盆中痛，据肺经病候应属是动病还是所生病？'
    }
  },
  {
    id: 'pb5-me-23',
    title: '经络临床应用：辨证归经与循经取穴',
    category: 'theory',
    difficulty: 4,
    difficultyLabel: '易混淆',
    riskTags: ['头痛分经归属', '循经取穴原则', '归经辨证步骤'],
    intent: '考察归经辨证方法与循经取穴原则的临床应用，重点是头痛分经论治',
    facts: [
      { field: 'meridian.clinical.meridianDifferentiation', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.clinical.headacheRegionalMapping', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: null,
    stdJudgment: '归经辨证按病位与症候归属经脉，循经取穴遵循经脉所过主治所及；头痛分经为前额阳明、头侧少阳、后头太阳、巅顶厥阴。',
    coreDefinition: '归经辨证依据病变部位、症候特点确定所属经脉；循经取穴为在病变所属经脉上选取腧穴，以经脉所过、主治所及为原则；头痛分经为前额阳明、头侧少阳、后头太阳、巅顶厥阴。',
    safety: { note: '头痛辨经后取穴多在肢体远端，操作安全；若头痛剧烈或伴呕吐、肢体无力等，须先排除器质性病变。', prohibitions: [] },
    learning: {
      knowledge: '归经辨证以病位与症候为依据：按病变部位所在经脉循行区域归经，如齿痛辨阳明、胁痛辨少阳厥阴；按症候特点归经，如情志抑郁、善太息多属肝经，心悸失眠多属心经。循经取穴遵循经脉所过主治所及，在病变经脉上选取本经或表里经腧穴，如胃脘痛取足三里、目疾取光明。头痛分经论治是典型应用：前额及眉棱骨痛属阳明经，头侧痛属少阳经，后头及项部痛属太阳经，巅顶痛属厥阴经，据此分别选取合谷、外关、后溪、太冲等穴。',
      misjudgment: '错：认为后头痛属少阳经、巅顶痛属太阳经，将头痛分经的部位归属记反。',
      reasoning: '为什么巅顶痛归厥阴肝经，而前额痛归阳明胃经？',
      feedback: '肝经上出额与督脉会于巅顶，经脉所过主治所及，故巅顶痛取太冲；胃经循行于前额面颊，故前额痛归阳明经，取合谷、内庭等穴。',
      transfer: '若患者两侧太阳穴胀痛且口苦，据头痛分经应归何经并选何穴？'
    }
  },
  {
    id: 'pb5-me-24',
    title: '经络综合案例：头痛辨经',
    category: 'theory',
    difficulty: 5,
    difficultyLabel: '综合推理',
    riskTags: ['表里寒热鉴别', '素体阳虚与现症热象权衡', '阳明经循行定位'],
    intent: '综合运用归经辨证与八纲分析头痛病例，训练寒热真假与主次病机的鉴别能力',
    facts: [
      { field: 'meridian.clinical.headache.regionalMapping', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.clinical.heatPatternJudgment', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.stomach.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: {
      model: 'C4',
      scenario: '患者头痛，以前额及眉棱骨处痛甚，伴鼻塞、齿痛。',
      c3Evidence: [
        '前额连眉棱骨痛（症状事实）',
        '口渴喜冷饮、牙龈肿痛（症状事实）',
        '大便干结、脉滑数（舌脉体征）'
      ],
      counterEvidence: '但患者素来怕冷、手足不温，且此次头痛遇风加重',
      revision: '修正为阳明经热为主兼表证：虽素体阳虚，但现症口渴龈肿脉滑数乃阳明胃热之象，头额痛属足阳明经循行所过，治取足三里、内庭清阳明热，兼疏风解表，不属单纯风寒头痛'
    },
    stdJudgment: '本例前额头痛伴口渴龈肿、大便干结、脉滑数，属阳明经热为主兼表证，治取足三里、内庭清阳明热，兼以疏风解表。',
    coreDefinition: '头痛辨证须先分经定位（前额属阳明），再辨寒热虚实；本例虽素体阳虚，但现症口渴喜冷饮、牙龈肿痛、大便干结、脉滑数为阳明胃热确据，不可因体质而忽视现症。',
    safety: { note: '清泻阳明可刺足三里、内庭等肢体远端穴，操作安全；若头痛剧烈、持续不缓解或伴喷射性呕吐，须转诊排除颅内病变。', prohibitions: [] },
    learning: {
      knowledge: '本例患者头痛以前额连眉棱骨痛为主，兼鼻塞齿痛，病位在足阳明经循行所过之处；口渴喜冷饮、牙龈肿痛、大便干结、脉滑数，为阳明胃热炽盛之象，热邪循经上攻，故前额痛甚。但患者素来怕冷、手足不温，提示素体阳虚，且头痛遇风加重，提示兼夹表邪。辨证要点在于区别病之本源与当前主证：现症热象鲜明，应以阳明经热为主，兼以疏风解表，取足三里、内庭清泻阳明之热，配合疏风之穴，不属单纯风寒头痛。',
      misjudgment: '错：因患者素体怕冷、手足不温而断为风寒头痛，忽视口渴龈肿脉滑数等阳明热象。',
      reasoning: '为什么素体阳虚之人出现口渴喜冷饮、牙龈肿痛时，仍要判为阳明经热为主？',
      feedback: '辨证以现症为依据，口渴喜冷饮、牙龈肿痛、大便干结、脉滑数均为阳明胃热的确据，热象显著而非虚寒，素体阳虚只提示兼护阳气，不改变当前阳明热盛的病机判断。',
      transfer: '若同一患者服清胃方后热象减退而仍怕冷肢凉，下一步应如何调整治法？'
    }
  },
  {
    id: 'pb5-me-25',
    title: '经络综合案例：胁痛辨经',
    category: 'theory',
    difficulty: 4,
    difficultyLabel: '易混淆',
    riskTags: ['胁痛归经少阳厥阴', '阳陵泉太冲选用', '气滞与瘀血鉴别'],
    intent: '考察胁痛归经辨证、疏肝利胆取穴及气滞与瘀血的鉴别',
    facts: [
      { field: 'meridian.clinical.hypochondriacPain.mapping', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' },
      { field: 'meridian.gallbladder.liver.course', sourceType: 'textbook', sourceTitle: '《经络腧穴学》规划教材', status: 'verified' }
    ],
    classics: [],
    dosage: null,
    cases: {
      model: 'C3',
      scenario: '患者胁肋胀痛反复发作，痛势走窜，善太息，每因情绪波动而加重。',
      c3Evidence: [
        '胁肋胀痛走窜、善太息（症状事实）',
        '情绪波动后加重（病史时间线）',
        '脉弦（舌脉体征）'
      ],
      counterEvidence: '',
      revision: ''
    },
    stdJudgment: '胁肋胀痛走窜、善太息，情绪波动后加重，脉弦，属足少阳胆经与足厥阴肝经气滞，取阳陵泉、太冲疏肝利胆。',
    coreDefinition: '胁肋为肝胆经循行分布之处，胀痛走窜、随情绪加重、脉弦为肝气郁滞特征，辨为足少阳与足厥阴经病变，治以疏肝利胆、行气止痛。',
    safety: { note: '阳陵泉、太冲位于肢体远端，针刺安全；若胁痛剧烈、持续加重或伴发热黄疸，须排除肝胆急症。', prohibitions: [] },
    learning: {
      knowledge: '胁肋部为足少阳胆经与足厥阴肝经循行所过之处，胆经下循胁肋，肝经上贯膈布胁肋，故胁痛多辨为肝胆两经病变。本例胁肋胀痛走窜、善太息，为肝气郁滞、气机不畅之象；情绪波动后加重，提示病由情志诱发；脉弦为肝郁典型脉象。四者合参，证属肝胆经气滞，治以疏肝利胆、行气止痛，循经取穴阳陵泉（胆经合穴）与太冲（肝经原穴）为主，配合期门、支沟等穴。',
      misjudgment: '错：将胁肋胀痛走窜误判为瘀血阻络之刺痛，取血海、膈俞而忽视疏肝理气。',
      reasoning: '为什么胁痛胀痛走窜且随情绪波动加重，要归足少阳与足厥阴经并取阳陵泉、太冲？',
      feedback: '胁肋为肝胆经所过，胀痛走窜、善太息、情志诱发、脉弦皆肝郁气滞之征，阳陵泉为胆经合穴、太冲为肝经原穴，疏肝利胆、行气止痛，与病机相合。',
      transfer: '若胁痛由胀痛转为刺痛固定不移、舌质紫暗，辨证与选穴应作何调整？'
    }
  }
];
