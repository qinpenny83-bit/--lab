import type {
  KnowledgeNode,
  Case,
  ObservationTask,
  Formula,
  ClassicFragment,
  ParadoxChallenge,
  TopicId,
  SessionType,
} from '../types/models';

// ---------- 基础主题节点 ----------
import { yinYangNodes } from './knowledge/yinYang';
import { coldHeatNodes } from './knowledge/coldHeat';
import { exteriorInteriorNodes } from './knowledge/exteriorInterior';
import { deficiencyExcessNodes } from './knowledge/deficiencyExcess';
import { qiBloodNodes } from './knowledge/qiBlood';
import { organsNodes } from './knowledge/organs';
import { diagnosisNodes } from './knowledge/diagnosis';

// ---------- 专项内容库 ----------
import { cases as rawCases } from './knowledge/cases';
import { observationTasks } from './knowledge/observation';
import { formulas } from './knowledge/formulas';
import { classics } from './knowledge/classics';
import { paradoxChallenges } from './knowledge/paradox';
import { TRANSFER_SCENES } from './knowledge/transferCases';

export { observationTasks, formulas, classics, paradoxChallenges };

// ---------- 33 学科知识池（Phase 5 / Content Bible v2.0） ----------
export * from './v33';

/**
 * V2 病例分级增强：
 * 基于病例的真实结构推导分级元数据，避免手写不一致。
 * - clueDensity     有效线索占比（objective+subjective / 全部）
 * - distractorCount 干扰线索数量
 * - requiredQuestions 关键追问次数（key 问题数 + 1 个补充观察）
 * - transferLevel   迁移层级：1 明显场景 / 2 加干扰 / 3 陌生背景（由难度映射）
 */
function enhanceCase(c: Case): Case {
  const total = c.clues.length;
  const effective = c.clues.filter((cl) => cl.kind !== 'distractor').length;
  const distractorCount = total - effective;
  const keyQuestions = c.questions.filter((q) => q.kind === 'key').length;
  return {
    ...c,
    clueDensity: c.clueDensity ?? (total ? Math.round((effective / total) * 100) / 100 : 0),
    distractorCount: c.distractorCount ?? distractorCount,
    requiredQuestions: c.requiredQuestions ?? Math.min(4, keyQuestions + 1),
    transferLevel: c.transferLevel ?? (c.difficulty >= 4 ? 3 : c.difficulty >= 3 ? 2 : 1),
  };
}

export const cases: Case[] = rawCases.map(enhanceCase);

// ---------- 方剂 / 经典主题的知识节点 ----------
const formulaNodes: KnowledgeNode[] = [
  {
    id: 'fm-1',
    topic: 'formula',
    title: '方剂是一套思路',
    intro: '方剂不是药材的随机拼盘，而是围绕一个"病机"组织起来的思路：谁负责主攻，谁负责配合，谁负责调和。',
    quiz: {
      question: '理解一个方剂，最重要的第一步是？',
      options: [
        '背下所有药物的剂量',
        '先理解这个方要解决的核心病机与整体思路',
        '记住药味越多越好',
        '只记方名和主治病名',
      ],
      answer: 1,
      explain:
        '先问"这个方想解决什么问题、用什么策略"，再去看每味药在策略里的角色，才叫理解方剂。死背药味与剂量不是理解。',
      insight:
        '方剂思维 = 病机 → 策略 → 药物角色。学会这个链条，你就能看懂任何一个陌生方子。',
    },
    why: {
      question: '为什么死背药方没用，要先理解"思路"？',
      brief:
        '方剂不是药材的随机拼盘，而是围绕一个病机组织的策略：谁主攻、谁配合、谁调和。理解一个方，先问"它要解决什么核心问题、用什么策略"，再看每味药的角色，才能举一反三。',
      example:
        '像一支篮球队：不是把五个球星随便凑在一起就能赢，而是看谁主攻、谁防守、谁组织。方剂的"君臣佐使"就是球队的战术分工。',
      verify: {
        question: '理解一个方剂，最重要的第一步是？',
        options: ['背下所有药物的剂量', '先理解这个方要解决的核心病机与整体思路', '记住药味越多越好', '只记方名和主治病名'],
        answer: 1,
        explain:
          '先理解"病机→策略→药物角色"的链条，才叫理解方剂；死背剂量与药味不是理解。',
      },
    },
    credibility: {
      source: '中医方剂学（教材）',
      sourceType: 'textbook',
      modernExplanation:
        '方剂学教材以"君臣佐使"说明方剂结构，强调方是"针对病机的有序组合"，不是药物堆砌。',
      teachingPoint: '建立"病机→策略→药物角色"的方剂思维链条。',
      safetyNote: '本模块讲思路，不提供具体用药建议；用药请遵医嘱。',
    },
  },
  {
    id: 'fm-2',
    topic: 'formula',
    title: '君臣佐使',
    intro: '方剂内部有分工：君药主攻病机，臣药辅助君药，佐药制约与兼顾，使药调和引经。',
    quiz: {
      question: '方剂里"君药"的职责是？',
      options: [
        '负责调和所有药性，防止副作用',
        '针对核心病机起主要治疗作用',
        '负责引药到达特定部位',
        '凑足药味数量',
      ],
      answer: 1,
      explain:
        '君药是针对核心病机的主力。臣药加强或辅助君药，佐药处理兼证或制约毒性，使药调和诸药。看方先找君药，思路就清晰一半。',
      insight:
        '学会"找君药"，你就抓住了方子的灵魂：它在告诉你，这个方认为的"核心问题"是什么。',
    },
    why: {
      question: '为什么一首方子里，每味药的角色不一样？',
      brief:
        '君臣佐使是方剂的内部分工：君药针对核心病机主攻，臣药辅助君药，佐药制约毒性或兼顾兼证，使药调和诸药、引药达位。先找到君药，就抓住了这个方认为的"核心问题"。',
      example:
        '像做一桌菜：主菜（君）定下这顿饭的口味基调，配菜（臣）衬托主菜，调料（佐）去腥提味，最后的摆盘上菜（使）让整桌菜和谐呈现。',
      verify: {
        question: '方剂里"君药"的职责是？',
        options: ['负责调和所有药性，防止副作用', '针对核心病机起主要治疗作用', '负责引药到达特定部位', '凑足药味数量'],
        answer: 1,
        explain:
          '君药是针对核心病机的主力；臣佐使分别负责辅助、制约与调和。',
      },
    },
    credibility: {
      source: '《黄帝内经·素问》',
      sourceType: 'classic',
      originalText: '主病之谓君，佐君之谓臣，应臣之谓使。',
      modernExplanation:
        '《素问·至真要大论》最早提出方剂的主次结构：治疗主病的为君，辅佐君药的为臣，顺应臣药作用的为使。',
      teachingPoint: '学会"找君药"来抓住方子的灵魂，理解方剂内部分工。',
      safetyNote: '方剂学习为思路训练，实际用药须遵医嘱。',
    },
  },
  {
    id: 'fm-3',
    topic: 'formula',
    title: '方证对应',
    intro: '一个方对应一种"证候图景"（方证）：看到完整的图景，才谈得上用方。症状零散，图景未明，谈方为时过早。',
    quiz: {
      question: '"方证对应"的正确理解是？',
      options: [
        '某个症状出现，就直接用某个方',
        '方与"整体证候图景"对应，图景越完整判断越可靠',
        '方越贵越好',
        '名医的方可以直接照搬',
      ],
      answer: 1,
      explain:
        '方证对应是"图景匹配"：完整线索组合出的证候与某个方的适应图景一致时，才谈用方。单症状对号入座是方剂学习最大的误区。',
      insight:
        '方剂模块训练的不是"开药"，而是训练你识别"证候图景"的能力。先有图景，后有方。',
    },
    why: {
      question: '为什么"一个症状对应一个方"是学方最大的误区？',
      brief:
        '方证对应是"图景匹配"：完整线索组合出的证候与某个方的适应图景一致时，才谈用方。单个症状（比如咳嗽）可以由很多证候引起、对应很多不同的方，所以必须先有整体图景。',
      example:
        '像配钥匙：不是看钥匙上有几道齿就能配，得看清整把锁的构造。同一种咳嗽，寒热虚实不同，用的方完全不同。',
      verify: {
        question: '"方证对应"的正确理解是？',
        options: ['某个症状出现，就直接用某个方', '方与"整体证候图景"对应，图景越完整判断越可靠', '方越贵越好', '名医的方可以直接照搬'],
        answer: 1,
        explain:
          '方证对应是整体图景匹配：证候完整、图景清晰时才能谈用方，单症状对号入座是误区。',
      },
    },
    credibility: {
      source: '中医方剂学（教材）',
      sourceType: 'textbook',
      modernExplanation:
        '教材强调"方证相应"：方剂与证候类型相对应，辨证准确是选方的前提，反对单症状对号入座。',
      teachingPoint: '训练"先图景后方"的思维顺序，避免单症状对号入座。',
      safetyNote: '选方用药须由专业医师辨证决定，本模块仅训练思维。',
    },
  },
];

const classicNodes: KnowledgeNode[] = [
  {
    id: 'cl-1',
    topic: 'classic',
    title: '为什么读经典',
    intro: '经典之所以是经典，不是因为它古老，而是因为它提供了大量"观察与推理的范例"：古人怎样从现象到判断。',
    quiz: {
      question: '读《伤寒论》《内经》最值得学习的是什么？',
      options: [
        '背诵原文以获得谈资',
        '学习其中的观察方法与推理思路',
        '直接照搬其中的方药治疗现代疾病',
        '考证古代文字的读音',
      ],
      answer: 1,
      explain:
        '经典的价值在于思维范例：如何从脉证观察到证候判断，如何随证变化调整策略。背原文而不理解思路，等于收藏了钥匙却不会开门。',
      insight:
        '读经典的正确姿势：每一段原文都问三个问题——它观察到了什么？它如何推理？这个推理方法今天还能不能用？',
    },
    why: {
      question: '为什么说经典"老"，但不是"过时"？',
      brief:
        '经典的价值不在古老，而在它提供了大量"从现象到判断"的推理范例：古人怎样观察脉证、怎样随证调整。读经典学的是方法，不是照搬答案。',
      example:
        '像学下棋看古谱：古谱里的棋局今天不会一模一样重演，但里面的"定式思维"和"应变思路"仍然管用。读经典就是打中医的"棋谱"。',
      verify: {
        question: '读《伤寒论》《内经》最值得学习的是什么？',
        options: ['背诵原文以获得谈资', '学习其中的观察方法与推理思路', '直接照搬其中的方药治疗现代疾病', '考证古代文字的读音'],
        answer: 1,
        explain:
          '经典的价值在于思维范例：如何观察、如何推理、如何随证变化，而非背诵教条。',
      },
    },
    credibility: {
      source: '《黄帝内经·素问》',
      sourceType: 'classic',
      originalText: '夫上古圣人之教下也，皆谓之虚邪贼风，避之有时，恬惔虚无，真气从之，精神内守，病安从来。',
      modernExplanation:
        '《素问·上古天真论》教导：避开致病因素、保持精神安定，正气就能安然运行，疾病无从产生——这是"养生防病"的经典表述。',
      teachingPoint: '理解读经典的目的：学习古人观察与推理的方法，而非背诵教条。',
      safetyNote: '经典原文是历史文献，不代表现代诊疗建议。',
    },
  },
  {
    id: 'cl-2',
    topic: 'classic',
    title: '经方思维',
    intro: '经方思维是"以证候为核心"的思维：先辨清证候图景，再决定策略，随证变化而调整，不固执于固定套路。',
    quiz: {
      question: '"观其脉证，知犯何逆，随证治之"最核心的方法论是？',
      options: [
        '每次治疗都用同一个方',
        '以当下完整的脉证组合为依据，灵活调整策略',
        '只信脉象，不看症状',
        '病程越长越难治',
      ],
      answer: 1,
      explain:
        '这句话是辨证论治的纲领：以"当下完整的脉证组合"为判断依据，错误出在哪就针对哪里调整。核心是"随证"，不是"随病名"。',
      insight:
        '经方思维 = 动态观察 + 整体判断 + 灵活调整。这与"一个症状对应一个答案"的思维正相反，也是本产品要反复训练的。',
    },
    why: {
      question: '为什么"随证治之"是辨证论治的灵魂？',
      brief:
        '"观其脉证，知犯何逆，随证治之"的意思是：以当下完整的脉证组合为判断依据，搞清楚问题出在哪，再针对性地调整。核心是"随证"，不固执于固定套路。',
      example:
        '像开车导航：不是出发前定死一条路，而是每过一个路口都看路况（脉证），随时调整路线（治法）。路况变了，路线就要变。',
      verify: {
        question: '"观其脉证，知犯何逆，随证治之"最核心的方法论是？',
        options: ['每次治疗都用同一个方', '以当下完整的脉证组合为依据，灵活调整策略', '只信脉象，不看症状', '病程越长越难治'],
        answer: 1,
        explain:
          '核心是"随证"：以当下完整的脉证组合为依据灵活调整，而非固定套路。',
      },
    },
    credibility: {
      source: '《伤寒论》',
      sourceType: 'classic',
      originalText: '观其脉证，知犯何逆，随证治之。',
      modernExplanation:
        '张仲景在《伤寒论》中反复强调以当下的脉证组合为准绳来动态调治，这就是辨证论治的纲领。',
      teachingPoint: '理解"动态观察+整体判断+灵活调整"的经方思维。',
      safetyNote: '本文句是方法论，不构成任何用药指导。',
    },
  },
  {
    id: 'cl-3',
    topic: 'classic',
    title: '治未病',
    intro: '"上工治未病"：高明的医学在疾病形成前就介入——观察趋势、调理体质、阻断演变。',
    quiz: {
      question: '"治未病"在实践中最接近的做法是？',
      options: [
        '没病就不需要任何观察与调理',
        '在疾病未成形时，通过观察趋势提前调整生活与体质',
        '用药物预防所有可能的病',
        '只治疗最严重的病',
      ],
      answer: 1,
      explain:
        '治未病有三个层次：未病先防、已病防变、愈后防复。核心是"观察趋势、提前干预"：比如肝郁的人提前调畅气机，防止气滞血瘀的演变链。',
      insight:
        '治未病思维 = 动态眼光 + 预防意识。它要求你把身体看作一条会演变的河流，而不是一台待修的机器。',
    },
    why: {
      question: '为什么"没生病"也需要"治"？',
      brief:
        '"上工治未病"：高明的医学在疾病成形前就介入——观察趋势、调理体质、阻断演变。治未病分三层：未病先防、已病防变、愈后防复。',
      example:
        '像河堤管理：不是等洪水来了才抢险，而是平时就加固堤坝、清理河道（观察趋势、提前调理），把大问题化解在萌芽里。',
      verify: {
        question: '"治未病"在实践中最接近的做法是？',
        options: ['没病就不需要任何观察与调理', '在疾病未成形时，通过观察趋势提前调整生活与体质', '用药物预防所有可能的病', '只治疗最严重的病'],
        answer: 1,
        explain:
          '治未病三层：未病先防、已病防变、愈后防复，核心是观察趋势、提前干预。',
      },
    },
    credibility: {
      source: '《黄帝内经·素问》',
      sourceType: 'classic',
      originalText: '是故圣人不治已病治未病，不治已乱治未乱，此之谓也。',
      modernExplanation:
        '《素问·四气调神大论》提出"治未病"：高明的医者在疾病未成形时就开始调整，重视预防和早期干预。',
      teachingPoint: '建立"动态眼光+预防意识"的健康观：把身体看作会演变的河流。',
      safetyNote: '"治未病"重在日常调理与预防，不等于自行用药。',
    },
  },
];

/**
 * V2 知识来源增强：
 * 为每个知识节点补充来源元数据，严格区分「经典原文 / 传统医家解释 / 现代教学解释」。
 * 篇名、作者、年代均依据可信的文献常识，避免笼统混称。
 */
const SOURCE_META: Record<
  string,
  { title?: string; author?: string; era?: string; evidence?: 'original' | 'commentary' | 'modern'; level?: 'original' | 'classical' | 'modern' }
> = {
  // 阴阳
  'yy-1': { title: '《素问·阴阳应象大论》', author: '佚名（托名黄帝）', era: '战国至西汉', evidence: 'original', level: 'original' },
  'yy-2': { title: '《素问·阴阳应象大论》', author: '佚名（托名黄帝）', era: '战国至西汉', evidence: 'original', level: 'original' },
  'yy-3': { title: '《素问·生气通天论》', author: '佚名（托名黄帝）', era: '战国至西汉', evidence: 'original', level: 'original' },
  // 寒热
  'ch-3': { title: '《伤寒论·辨厥阴病脉证并治》', author: '张仲景', era: '东汉', evidence: 'original', level: 'original' },
  // 表里
  'ei-3': { title: '《伤寒论·辨少阳病脉证并治》', author: '张仲景', era: '东汉', evidence: 'original', level: 'original' },
  // 脏腑
  'og-1': { title: '《素问·灵兰秘典论》', author: '佚名（托名黄帝）', era: '战国至西汉', evidence: 'original', level: 'original' },
  'og-2': { title: '《素问·灵兰秘典论》', author: '佚名（托名黄帝）', era: '战国至西汉', evidence: 'original', level: 'original' },
  'og-3': { title: '《金匮要略·脏腑经络先后病脉证第一》', author: '张仲景', era: '东汉', evidence: 'original', level: 'original' },
  // 四诊
  'dg-1': { title: '《难经·六十一难》', author: '托名扁鹊（秦越人）', era: '战国至东汉', evidence: 'original', level: 'original' },
  'dg-3': { title: '《素问·阴阳应象大论》', author: '佚名（托名黄帝）', era: '战国至西汉', evidence: 'original', level: 'original' },
  // 方剂
  'fm-2': { title: '《素问·至真要大论》', author: '佚名（托名黄帝）', era: '战国至西汉', evidence: 'original', level: 'original' },
  // 经典
  'cl-1': { title: '《素问·上古天真论》', author: '佚名（托名黄帝）', era: '战国至西汉', evidence: 'original', level: 'original' },
  'cl-2': { title: '《伤寒论·辨太阳病脉证并治》', author: '张仲景', era: '东汉', evidence: 'original', level: 'original' },
  'cl-3': { title: '《素问·四气调神大论》', author: '佚名（托名黄帝）', era: '战国至西汉', evidence: 'original', level: 'original' },
  // 教材类：现代教学解释
  'ch-1': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'ch-2': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'ei-1': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'ei-2': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'de-1': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'de-2': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'de-3': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'qb-1': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'qb-2': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'qb-3': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'dg-2': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'dg-4': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'dg-5': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'dg-6': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'fm-1': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
  'fm-3': { author: '全国中医药行业高等教育规划教材', era: '现代', evidence: 'modern', level: 'modern' },
};

function enhanceNode(n: KnowledgeNode): KnowledgeNode {
  const meta = SOURCE_META[n.id];
  if (!meta || !n.credibility) return n;
  const c = n.credibility;
  return {
    ...n,
    credibility: {
      ...c,
      sourceTitle: meta.title ?? c.sourceTitle,
      sourceAuthor: meta.author,
      sourceEra: meta.era,
      evidenceType: meta.evidence ?? (c.sourceType === 'classic' ? 'original' : c.sourceType === 'textbook' ? 'modern' : 'commentary'),
      interpretationLevel: meta.level ?? (c.sourceType === 'classic' ? 'original' : 'modern'),
    },
  };
}

export const allKnowledgeNodes: KnowledgeNode[] = [
  ...yinYangNodes,
  ...coldHeatNodes,
  ...exteriorInteriorNodes,
  ...deficiencyExcessNodes,
  ...qiBloodNodes,
  ...organsNodes,
  ...diagnosisNodes,
  ...formulaNodes,
  ...classicNodes,
].map(enhanceNode);

export function nodesByTopic(topic: TopicId): KnowledgeNode[] {
  // V2：同样挂载迁移场景（variation/transfer），保证知识页能展示并进入场景验证
  return allKnowledgeNodes.filter((n) => n.topic === topic).map((n) => {
    const scenes = TRANSFER_SCENES[n.id];
    return scenes ? { ...n, transferScenes: scenes } : n;
  });
}

export function findNode(id: string): KnowledgeNode | undefined {
  const n = allKnowledgeNodes.find((x) => x.id === id);
  if (!n) return undefined;
  // V2：挂载迁移场景（familiar 来自节点自带 quiz，这里提供 variation/transfer）
  const scenes = TRANSFER_SCENES[id];
  return scenes ? { ...n, transferScenes: scenes } : n;
}

export function findCase(id: string): Case | undefined {
  return cases.find((c) => c.id === id);
}

export function findObservation(id: string): ObservationTask | undefined {
  return observationTasks.find((o) => o.id === id);
}

export function findFormula(id: string): Formula | undefined {
  return formulas.find((f) => f.id === id);
}

export function findClassic(id: string): ClassicFragment | undefined {
  return classics.find((c) => c.id === id);
}

export function findParadox(id: string): ParadoxChallenge | undefined {
  return paradoxChallenges.find((p) => p.id === id);
}

export function taskTitle(type: SessionType, refId: string): string {
  switch (type) {
    case 'case':
      return findCase(refId)?.title ?? '病例';
    case 'observation':
      return findObservation(refId)?.title ?? '观察训练';
    case 'knowledge':
      return findNode(refId)?.title ?? '知识挑战';
    case 'formula':
      return findFormula(refId)?.name ?? '方剂';
    case 'classic':
      return findClassic(refId)?.title ?? '经典片段';
    case 'paradox':
      return findParadox(refId)?.title ?? '反直觉挑战';
    default:
      return '训练';
  }
}
