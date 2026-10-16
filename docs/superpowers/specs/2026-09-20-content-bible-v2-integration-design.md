# Content Bible v2.0 接入应用页面 · 设计

日期：2026-09-20
状态：已批准（用户确认"按这个方案执行"）

## 目标

将独立的 `content-bible/content-bible-v2.html`（杏林大典 Content Bible v2.0 · 终极学科全覆盖审计与知识体系重构，23 章完整架构）以 iframe 整页嵌入方式接入杏林修炼场应用，提供应用内访问入口。

## 方案

### 1. 静态资源迁移

- 复制 `content-bible/content-bible-v2.html` → `public/content-bible/content-bible-v2.html`
- 复制 `content-bible/_shared/` → `public/content-bible/_shared/`（含 mermaid.min.js、echarts.min.js）
- 复制 `content-bible/assets/` → `public/content-bible/assets/`（charts.js）
- 副本中移除失效引用 `./assets/charts-v2.js`（文件不存在；v2 文档无 echarts 容器，该引用为 404 冗余）。原 `content-bible/` 源文件保持不动。

### 2. 新页面

- `src/pages/ContentBiblePage.tsx`：iframe 全屏加载 `/content-bible/content-bible-v2.html`
- 路由：`/bible` → `ContentBiblePage`（注册于 `src/App.tsx`）

### 3. 导航入口

- `src/components/Layout.tsx`：
  - 顶部导航（DESKTOP_NAV）新增 `{ to: '/bible', label: '知识蓝图', icon: '📐' }`，置于「知识·经典」之后
  - 移动端底部导航（MOBILE_NAV）新增 `{ to: '/bible', label: '蓝图', icon: '📐' }`

### 4. 验证

- `tsc` 构建通过
- iframe 页面加载正常，mermaid 图表渲染
- 既有路由无回归（今日修炼/修炼之路/我的中医脑/知识·经典）

## 非目标

- 不重构文档内容为 React 组件
- 不修改 `content-bible/` 源文件
- 不改变 Phase 2.5 Schema / 生产管线
