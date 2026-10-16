import type { SafetyResult } from '../types/models';

/**
 * 🚨 SafetyGuard 安全系统
 * 分级：🟢 学习问题（可答） / 🟡 健康知识教育（可解释）
 *       🔴 个人治疗处方用药（拒绝） / 🚨 急症（立即引导就医）
 * V1 使用本地关键词规则分类，未来可替换为 LLM 分类。
 */
const EMERGENCY_PATTERNS: RegExp[] = [
  /胸痛|胸[口部].{0,4}(剧痛|闷痛|压榨|撕裂|持续)/,
  /呼吸(困难|急促|停止)|窒息|喘不过气/,
  /昏迷|不省人事|意识(不清|模糊|丧失)/,
  /大出血|血流不止|吐血|咯血|便血(大量)/,
  /剧烈(腹痛|头痛)|腹(部|痛).{0,4}(剧痛|板状)/,
  /抽搐|中风|脑梗|心梗|偏瘫|口眼歪斜|突然(倒地|晕倒)/,
];

const RED_PATTERNS: RegExp[] = [
  /(我|我妈|我爸爸|我母亲|我父亲|我爷爷|我奶奶|我孩子|我女儿|我儿子|家人|朋友|邻居).{0,8}(吃|喝|用).{0,6}(什么|哪种).{0,4}(药|方)/,
  /开(个|一)?方|处方|配药|抓药/,
  /(吃|喝|用)(多少|几克|几粒|几片|几碗)/,
  /(我|我妈|我爸爸|我母亲|我父亲|我爷爷|我奶奶|我孩子|我女儿|我儿子|家人).{0,10}(病|症|不舒服|疼|痛|难受)/,
  /治疗(我|他|她|我妈妈|我爸)的/,
  /(给我|帮我)(治|开|开点|拿点|配点)/,
];

const YELLOW_RULES: { pattern: RegExp; title: string; text: string }[] = [
  {
    pattern: /失眠|睡不(着|好)/,
    title: '关于失眠',
    text: '失眠在传统医学里可能关联多种"整体背景"：心血不足、肝郁化火、胃气不和等。同样睡不着，背后的图景可能完全不同——这正是要训练"多线索组合判断"的原因：先观察，再组合，而不是直接下结论。',
  },
  {
    pattern: /感冒|受凉|风寒/,
    title: '关于感冒',
    text: '感冒在传统医学里常从"表证"角度理解：恶寒发热、头身痛、鼻塞流涕，是正邪交争于体表。但表证有寒热之分，体虚之人又有特殊变化，判断需要完整线索。',
  },
  {
    pattern: /咳嗽/,
    title: '关于咳嗽',
    text: '咳嗽只是一个信号，传统医学要追问：咳多久了？有痰无痰？痰色稀黄？白天咳还是夜里咳？只有组合线索才能判断方向，单凭"咳嗽"无法对应任何结论。',
  },
  {
    pattern: /上火|口腔溃疡|长痘/,
    title: '关于"上火"',
    text: '"上火"在传统医学里同样要分清：实火（邪热太盛，需清）与虚火（阴液不足，需养）方向完全相反。口舌生疮、长痘都可能是其中任何一种，需要观察组合。',
  },
  {
    pattern: /拉肚子|腹泻|便秘|大便/,
    title: '关于二便',
    text: '大便的稀、干、黏、次数，都是重要观察线索，但要放进整体里看：伴不伴腹痛？喜温喜按吗？精神状态如何？二便只是线索之一，不能单独定论。',
  },
  {
    pattern: /湿气|体寒|阳虚|阴虚|气虚|血虚|体质|调理|养生|食疗|泡脚|艾灸|拔罐|刮痧/,
    title: '关于体质与调理',
    text: '体质是长期的整体倾向，调理讲究方向与时机。传统医学的养生思路核心是"顺应与平衡"：规律作息、饮食有节、情绪舒畅。具体到个人体质，需要长期观察与专业评估，本系统只做知识教学，不做个人方案。',
  },
];

const GREEN_RULES: { pattern: RegExp; topic: string; text: string }[] = [
  { pattern: /阴阳/, topic: 'yinYang', text: '阴阳是中医的总纲：一对描述寒热、动静、内外等倾向的观察视角。从「阴阳」主题开始，你会学会用这对视角重新看身体。' },
  { pattern: /寒热/, topic: 'coldHeat', text: '寒热回答"身体的温度方向"：寒证喜温怕冷，热证喜凉怕热。但真假寒热会骗人，要多线索组合判断。' },
  { pattern: /表里/, topic: 'exteriorInterior', text: '表里回答"病邪在表层还是深层"：感冒初起多在表，久拖可能入里。' },
  { pattern: /虚实/, topic: 'deficiencyExcess', text: '虚实回答"是正气不足还是邪气太盛"：虚要补，实要祛，方向相反。' },
  { pattern: /气血/, topic: 'qiBlood', text: '气血津液是身体里流动的物质：气虚乏力，气滞胀痛，血虚面淡，津亏干燥。' },
  { pattern: /脏腑|五脏|脾|肝|心|肾|肺/, topic: 'organs', text: '脏腑不是解剖器官，而是功能系统：脾主运化、肝主疏泄、心主血脉神志……理解功能系统是辨证的基础。' },
  { pattern: /四诊|望闻问切|舌|脉象|脉/, topic: 'diagnosis', text: '四诊是收集线索的四个通道：望（看）、闻（听嗅）、问（追问）、切（脉象）。学会收集线索，才谈得上判断。' },
  { pattern: /辨证|证候|证型/, topic: 'syndrome', text: '辨证是把散落线索组合成整体图景：怕冷+喜热饮+便溏+乏力 → 阳虚。这是中医思维的核心。' },
  { pattern: /方剂|方子|桂枝汤|逍遥散|四君子/, topic: 'formula', text: '方剂是一套思路：先理解病机与策略，再看每味药的角色。从「方剂实验室」开始理解方剂结构吧。' },
  { pattern: /伤寒|黄帝内经|内经|金匮|经典|张仲景/, topic: 'classic', text: '经典提供观察与推理的范例。从「经典解码」开始，你会发现古文原来可以理解。' },
];

const GENERIC_GREEN: SafetyResult = {
  level: 'green',
  label: '学习问题',
  emoji: '🟢',
  response:
    '这是个好问题！中医修炼馆更擅长带你"边练边想"。你可以从「今日挑战」开始，或到「中医入门地图」选一个主题修炼；如果想知道某个概念，比如阴阳、寒热、辨证，直接问我也行。',
  redirect: '先去地图看看十大主题吧。',
  redirectTarget: { type: 'map', label: '打开知识地图' },
};

function matchRule(input: string): { title: string; text: string } | null {
  for (const rule of YELLOW_RULES) if (rule.pattern.test(input)) return rule;
  return null;
}

function matchGreen(input: string): { topic: string; text: string } | null {
  for (const rule of GREEN_RULES) if (rule.pattern.test(input)) return rule;
  return null;
}

export function classifySafety(input: string): SafetyResult {
  const text = input.trim();
  if (text.length < 2) return GENERIC_GREEN;

  if (EMERGENCY_PATTERNS.some((re) => re.test(text))) {
    return {
      level: 'emergency',
      label: '急症提示',
      emoji: '🚨',
      response:
        '胸痛等急症需要优先排除需要及时处理的情况，我不能通过这个学习系统判断病因或提供治疗方案。如果症状明显、突然发生或伴随其他危险表现，请及时寻求正规医疗帮助。',
      redirect: '如果你愿意，我们可以继续学习：为什么传统医学在观察身体时需要综合多个线索？',
      redirectTarget: { type: 'observation', label: '去练「多线索观察」' },
    };
  }

  if (RED_PATTERNS.some((re) => re.test(text))) {
    return {
      level: 'red',
      label: '个人治疗咨询',
      emoji: '🔴',
      response:
        '这是一个用于传统医学知识学习的学习系统，不是问诊工具。我不能根据描述判断病情、推荐药物或给出治疗方案——对任何人都不应该隔着屏幕这样"开药"。如果你或家人身体不适，请到正规医疗机构就诊。',
      redirect: '如果你愿意，我们可以继续学习：为什么传统医学在观察身体时需要综合多个线索？',
      redirectTarget: { type: 'observation', label: '去练「多线索观察」' },
    };
  }

  const yellow = matchRule(text);
  if (yellow) {
    return {
      level: 'yellow',
      label: '健康知识教育',
      emoji: '🟡',
      response: yellow.text,
      redirect: '想系统训练观察与判断？可以从「观察训练」或「知识地图」开始。',
      redirectTarget: { type: 'map', label: '打开知识地图' },
    };
  }

  const green = matchGreen(text);
  if (green) {
    return {
      level: 'green',
      label: '学习问题',
      emoji: '🟢',
      response: green.text,
      redirect: '要不要去这个主题修炼一下？',
      redirectTarget: { type: 'map', label: '去「' + green.topic + '」主题' },
    };
  }

  return GENERIC_GREEN;
}

export const SafetyGuard = { classify: classifySafety };
