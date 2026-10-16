// ============================================================
// 杏林大典 · 33 学科知识池 · 学科注册表（自动生成，请勿手改）
// 来源：phase-5/blueprint-map.mjs（唯一注册表）+ phase-5/learning-system/all-nodes.json
// 重新生成：node phase-5/build-v33-frontend.mjs
// ============================================================
import type { V33SubjectRow } from '../../types/v33';

export const v33Subjects: V33SubjectRow[] = [
  {
    "code": "A",
    "name": "中医基础理论",
    "type": "theory",
    "stage": "stage1",
    "status": "core",
    "target": [
      160,
      185
    ],
    "migratedFrom": [
      "01",
      "02",
      "03",
      "04",
      "05",
      "07",
      "08",
      "16",
      "23"
    ],
    "honestyGap": null,
    "current": 185,
    "coverageLow": 100
  },
  {
    "code": "B",
    "name": "中医诊断学",
    "type": "diagnostic",
    "stage": "stage2",
    "status": "core",
    "target": [
      140,
      165
    ],
    "migratedFrom": [
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "21",
      "22"
    ],
    "honestyGap": "识舌/识脉真实训练素材需真实图像/模拟数据，蓝图只定义结构+特征维度",
    "current": 165,
    "coverageLow": 100
  },
  {
    "code": "C",
    "name": "经络学",
    "type": "meridian",
    "stage": "stage4",
    "status": "core",
    "target": [
      35,
      45
    ],
    "migratedFrom": [
      "06"
    ],
    "honestyGap": null,
    "current": 45,
    "coverageLow": 100
  },
  {
    "code": "D",
    "name": "腧穴学",
    "type": "acupoint",
    "stage": "stage4",
    "status": "core",
    "target": [
      60,
      75
    ],
    "migratedFrom": [],
    "honestyGap": "选载穴逐穴字段依赖逐条核对教材与原典",
    "current": 75,
    "coverageLow": 100
  },
  {
    "code": "E",
    "name": "针灸治疗学",
    "type": "acupoint",
    "stage": "stage6",
    "status": "core",
    "target": [
      30,
      40
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 40,
    "coverageLow": 100
  },
  {
    "code": "F",
    "name": "刺法灸法学",
    "type": "theory",
    "stage": "stage5",
    "status": "core",
    "target": [
      25,
      35
    ],
    "migratedFrom": [],
    "honestyGap": "只教理论与边界，不做线上真实刺灸操作",
    "current": 35,
    "coverageLow": 100
  },
  {
    "code": "G",
    "name": "中药学",
    "type": "herb",
    "stage": "stage3",
    "status": "core",
    "target": [
      250,
      290
    ],
    "migratedFrom": [],
    "honestyGap": "250+ 药逐条字段填充依赖逐条核对教材与原典",
    "current": 290,
    "coverageLow": 100
  },
  {
    "code": "H",
    "name": "中药鉴定学",
    "type": "herb",
    "stage": "stage6",
    "status": "ext",
    "target": [
      50,
      70
    ],
    "migratedFrom": [],
    "honestyGap": "识材训练素材依赖真实饮片图像",
    "current": 70,
    "coverageLow": 100
  },
  {
    "code": "I",
    "name": "药用植物·本草学",
    "type": "herb",
    "stage": "stage6",
    "status": "ext",
    "target": [
      30,
      45
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 45,
    "coverageLow": 100
  },
  {
    "code": "J",
    "name": "中药炮制学",
    "type": "herb",
    "stage": "stage6",
    "status": "ext",
    "target": [
      40,
      60
    ],
    "migratedFrom": [],
    "honestyGap": "生品 vs 炮制品比较依赖逐条核对",
    "current": 60,
    "coverageLow": 100
  },
  {
    "code": "K",
    "name": "中药药剂学",
    "type": "herb",
    "stage": "stage7",
    "status": "ext",
    "target": [
      25,
      35
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 35,
    "coverageLow": 100
  },
  {
    "code": "L",
    "name": "方剂学",
    "type": "formula",
    "stage": "stage7",
    "status": "core",
    "target": [
      230,
      270
    ],
    "migratedFrom": [
      "17",
      "18"
    ],
    "honestyGap": "220+ 方逐条字段填充依赖逐条核对教材与原典",
    "current": 270,
    "coverageLow": 100
  },
  {
    "code": "M",
    "name": "方剂剂量（维度）",
    "type": "formula",
    "stage": "stage7",
    "status": "core",
    "target": [
      20,
      30
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 30,
    "coverageLow": 100
  },
  {
    "code": "N",
    "name": "中医经典",
    "type": "classic",
    "stage": "stage7",
    "status": "core",
    "target": [
      120,
      145
    ],
    "migratedFrom": [
      "19"
    ],
    "honestyGap": "10 部经典原文出处级校验",
    "current": 145,
    "coverageLow": 100
  },
  {
    "code": "O",
    "name": "医古文",
    "type": "classic",
    "stage": "stage8",
    "status": "core",
    "target": [
      40,
      55
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 55,
    "coverageLow": 100
  },
  {
    "code": "P",
    "name": "各家学说",
    "type": "theory",
    "stage": "stage8",
    "status": "core",
    "target": [
      30,
      45
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 45,
    "coverageLow": 100
  },
  {
    "code": "Q",
    "name": "中医临床基础",
    "type": "clinical",
    "stage": "stage5",
    "status": "core",
    "target": [
      35,
      45
    ],
    "migratedFrom": [
      "20"
    ],
    "honestyGap": null,
    "current": 45,
    "coverageLow": 100
  },
  {
    "code": "R",
    "name": "中医内科学",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      95,
      115
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 115,
    "coverageLow": 100
  },
  {
    "code": "S",
    "name": "中医外科学",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      30,
      40
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 40,
    "coverageLow": 100
  },
  {
    "code": "T",
    "name": "中医妇科学",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      30,
      40
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 40,
    "coverageLow": 100
  },
  {
    "code": "U",
    "name": "中医儿科学",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      25,
      35
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 35,
    "coverageLow": 100
  },
  {
    "code": "V",
    "name": "中医骨伤科学",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      20,
      30
    ],
    "migratedFrom": [],
    "honestyGap": "认知框架级，不冒充全科临床深度",
    "current": 30,
    "coverageLow": 100
  },
  {
    "code": "W",
    "name": "中医眼科学",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      15,
      25
    ],
    "migratedFrom": [],
    "honestyGap": "认知框架级，不冒充全科临床深度",
    "current": 25,
    "coverageLow": 100
  },
  {
    "code": "X",
    "name": "中医耳鼻咽喉科",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      15,
      25
    ],
    "migratedFrom": [],
    "honestyGap": "认知框架级，不冒充全科临床深度",
    "current": 25,
    "coverageLow": 100
  },
  {
    "code": "Y",
    "name": "推拿·养生康复",
    "type": "clinical",
    "stage": "stage6",
    "status": "core",
    "target": [
      25,
      35
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 35,
    "coverageLow": 100
  },
  {
    "code": "Z",
    "name": "中医急诊",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      20,
      30
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 30,
    "coverageLow": 100
  },
  {
    "code": "AA",
    "name": "传染病·预防",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      20,
      30
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 30,
    "coverageLow": 100
  },
  {
    "code": "AB",
    "name": "全科医学",
    "type": "clinical",
    "stage": "stage8",
    "status": "core",
    "target": [
      15,
      25
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 25,
    "coverageLow": 100
  },
  {
    "code": "AC",
    "name": "现代医学基础",
    "type": "theory",
    "stage": "stage2",
    "status": "core",
    "target": [
      40,
      55
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 55,
    "coverageLow": 100
  },
  {
    "code": "AD",
    "name": "伦理·法律",
    "type": "ethic",
    "stage": "stage8",
    "status": "core",
    "target": [
      12,
      20
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 20,
    "coverageLow": 100
  },
  {
    "code": "AE",
    "name": "沟通·心理",
    "type": "ethic",
    "stage": "stage8",
    "status": "core",
    "target": [
      12,
      20
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 20,
    "coverageLow": 100
  },
  {
    "code": "AF",
    "name": "科研·证据",
    "type": "evidence",
    "stage": "stage8",
    "status": "core",
    "target": [
      18,
      25
    ],
    "migratedFrom": [],
    "honestyGap": null,
    "current": 25,
    "coverageLow": 100
  },
  {
    "code": "AG",
    "name": "综合医案·试炼",
    "type": "case",
    "stage": "stage8",
    "status": "core",
    "target": [
      20,
      30
    ],
    "migratedFrom": [
      "21"
    ],
    "honestyGap": null,
    "current": 30,
    "coverageLow": 100
  }
];

export const v33Totals = {
  "core": 2005,
  "ext": 210,
  "all": 2215
};
