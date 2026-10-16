import type { KnowledgeBridge } from '../../types/models';

export const knowledgeBridgeArray: KnowledgeBridge[] = [
  {
    id: 'bridge-yin-yang-intro',
    fromNodeId: 'v3-s1-n4',
    toNodeId: 'v3-s1-n7',
    prompt: '你之前接触过中医的整体观念，现在来了解阴阳——这是中医认识世界最基础的框架。',
    triggerType: 'prerequisite',
  },
  {
    id: 'bridge-yin-yang-tier2',
    fromNodeId: 'v3-s1-n7',
    toNodeId: 'v3-s1-n9',
    prompt: '你刚刚学了阴阳的基本概念，接下来要看阴阳之间怎么互相影响和转化。',
    triggerType: 'prerequisite',
  },
  {
    id: 'bridge-yin-yang-application',
    fromNodeId: 'v3-s1-n9',
    toNodeId: 'v3-s1-n10',
    prompt: '你已经理解了阴阳的相互关系，现在看看它在中医学中怎么实际应用。',
    triggerType: 'prerequisite',
  },
  {
    id: 'bridge-cold-heat-basics',
    fromNodeId: 'v3-s1-n10',
    toNodeId: 'v3-s2-n5',
    prompt: '你之前学过阴阳，现在想一想：寒热和阴阳之间是什么关系？寒热本质上是阴阳失衡在温度上的表现。',
    triggerType: 'prerequisite',
  },
  {
    id: 'bridge-exterior-interior',
    fromNodeId: 'v3-s3-n1',
    toNodeId: 'v3-s3-n3',
    prompt: '你知道表证是什么了。疾病的传变就像从门口入侵——先在表（门口），然后可能进入更深的地方。',
    triggerType: 'prerequisite',
  },
  {
    id: 'bridge-qi-blood-body',
    fromNodeId: 'v3-s4-n1',
    toNodeId: 'v3-s4-n4',
    prompt: '你已经了解了气是什么，现在来看血和津液。气和血的关系就像燃料和车辆——气推动血的运行。',
    triggerType: 'prerequisite',
  },
  {
    id: 'bridge-body-fluid-water',
    fromNodeId: 'v3-s4-n4',
    toNodeId: 'v3-s4-n7',
    prompt: '津液和之前的血一样，都是人体必需的液态物质。但津液更清稀、分布更广。',
    triggerType: 'prerequisite',
  },
  {
    id: 'bridge-organs-connection',
    fromNodeId: 'v3-s4-n11',
    toNodeId: 'v3-s4-n12',
    prompt: '你学了五脏各自的功能。但中医看病时不会只看一个脏器。听听这个联系：肝和脾之间互相影响——肝气郁结会影响脾的运化。',
    triggerType: 'related',
  },
  {
    id: 'bridge-formula-thinking',
    fromNodeId: 'v3-s3-n11',
    toNodeId: 'v3-s7-n4',
    prompt: '你学完了辨证方法。现在要转变思维——方剂不是药物的简单组合，而是针对病机的策略。',
    triggerType: 'prerequisite',
  },
  {
    id: 'bridge-dynamic-classics',
    fromNodeId: 'v3-s7-n7',
    toNodeId: 'v3-s7-n10',
    prompt: '《伤寒论》说"观其脉证，知犯何逆，随证治之"。你现在应该能理解这句话的含义了：依据当下的完整证候来决策。',
    triggerType: 'prerequisite',
  },

  // ------------------------------------------------------------------
  // V3.5 Phase 1.5：第一境 → 第五境 的知识桥梁（示例中要求的三大通路）
  // ------------------------------------------------------------------
  {
    id: 'bridge-yin-yang-to-five-elements',
    fromNodeId: 'v3-s1-n7',
    toNodeId: 'v3-s1-n11',
    prompt: '你已经会用阴阳判断"偏阴还是偏阳"。但要讲清"肝和脾谁影响谁"，阴阳就不够了——下一步来看五行，它专门回答"关系"。',
    triggerType: 'related',
  },
  {
    id: 'bridge-whole-to-reasoning',
    fromNodeId: 'v3-s1-n4',
    toNodeId: 'v3-s5-n10',
    prompt: '整体观念告诉你"别孤立看症状"。到了第五境，这一步要落到行动上：收集线索、区分主次、建立假设、找证据、找反证——这就是病机推理。',
    triggerType: 'prerequisite',
  },
  {
    id: 'bridge-yin-yang-to-pathogenesis',
    fromNodeId: 'v3-s1-n7',
    toNodeId: 'v3-s5-n2',
    prompt: '阴阳是总纲，八纲是阴阳在辨证上的展开，病机则是追问"这个失衡是怎么发生的"。你现在学的病机，就站在阴阳→八纲→病机这条链的终点。',
    triggerType: 'related',
  },
  {
    id: 'bridge-zangfu-to-pathogenesis',
    fromNodeId: 'v3-s4-n11',
    toNodeId: 'v3-s5-n6',
    prompt: '你学过肝主疏泄（脏腑生理）。当这个功能失常，就会成为"脏腑病机"——比如肝失疏泄导致气机不畅（气滞）。病机就是把"正常的生理"反过来看。',
    triggerType: 'related',
  },
];