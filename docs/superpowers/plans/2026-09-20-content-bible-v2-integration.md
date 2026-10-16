# Content Bible v2.0 接入应用页面 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Content Bible v2.0 完整架构文档以 iframe 整页嵌入方式接入杏林修炼场应用，提供 `/bible` 路由与「知识蓝图」导航入口。

**Architecture:** 静态资源（HTML + _shared + assets）复制到 `public/content-bible/`，新建 `ContentBiblePage.tsx` 用 iframe 全屏加载，注册路由并新增顶部/底部导航入口。

**Tech Stack:** React 18 + react-router-dom 6 + Vite 5 + TypeScript 5

---

### Task 1: 静态资源迁移到 public

**Files:**
- Copy: `content-bible/content-bible-v2.html` → `public/content-bible/content-bible-v2.html`
- Copy: `content-bible/_shared/` → `public/content-bible/_shared/`
- Copy: `content-bible/assets/` → `public/content-bible/assets/`
- Modify: `public/content-bible/content-bible-v2.html`（移除 charts-v2.js 引用）

- [ ] **Step 1: 创建 public/content-bible 目录并复制资源**

Run (PowerShell):
```powershell
New-Item -ItemType Directory -Force -Path 'public/content-bible'
Copy-Item -Recurse -Force 'content-bible/_shared' 'public/content-bible/'
Copy-Item -Recurse -Force 'content-bible/assets' 'public/content-bible/'
Copy-Item -Force 'content-bible/content-bible-v2.html' 'public/content-bible/content-bible-v2.html'
```
Expected: `public/content-bible/` 下出现 `content-bible-v2.html`、`_shared/`、`assets/`

- [ ] **Step 2: 移除副本中失效引用**

Edit `public/content-bible/content-bible-v2.html`：
删除行 `<script src="./assets/charts-v2.js"></script>`（文件不存在且文档无 echarts 容器，属 404 冗余引用）。

- [ ] **Step 3: 验证资源存在**

Run: `Get-ChildItem -Recurse 'public/content-bible' | Select-Object FullName`
Expected: 列出 content-bible-v2.html、_shared/js/mermaid.min.js、_shared/js/echarts.min.js、assets/charts.js

---

### Task 2: 新建 ContentBiblePage

**Files:**
- Create: `src/pages/ContentBiblePage.tsx`

- [ ] **Step 1: 创建页面组件**

Create `src/pages/ContentBiblePage.tsx`：
```tsx
export default function ContentBiblePage() {
  return (
    <div className="content-bible-page">
      <iframe
        title="杏林大典 Content Bible v2.0"
        src="/content-bible/content-bible-v2.html"
        className="content-bible-frame"
      />
    </div>
  );
}
```

- [ ] **Step 2: 添加 iframe 全屏样式**

在 `src/index.css` 末尾追加：
```css
.content-bible-page { height: 100%; }
.content-bible-frame {
  width: 100%;
  height: calc(100vh - 120px);
  border: 0;
  display: block;
  background: #fff;
}
```

---

### Task 3: 注册路由

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 导入并注册路由**

Modify `src/App.tsx`：
```tsx
import ContentBiblePage from './pages/ContentBiblePage';
// ...
<Route path="/bible" element={<ContentBiblePage />} />
```
（`/bible` 置于 `/map` 路由之后。）

---

### Task 4: 导航入口

**Files:**
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: 顶部导航新增「知识蓝图」**

Modify `DESKTOP_NAV`：
```tsx
const DESKTOP_NAV = [
  { to: '/', label: '今日修炼', icon: '🌿' },
  { to: '/journey', label: '修炼之路', icon: '🗺️' },
  { to: '/brain', label: '我的中医脑', icon: '🧠' },
  { to: '/map', label: '知识·经典', icon: '📚' },
  { to: '/bible', label: '知识蓝图', icon: '📐' },
];
```

- [ ] **Step 2: 移动端底部导航新增「蓝图」**

Modify `MOBILE_NAV`：
```tsx
const MOBILE_NAV = [
  { to: '/', label: '今日', icon: '🌿' },
  { to: '/journey', label: '修炼', icon: '🗺️' },
  { to: '/brain', label: '中医脑', icon: '🧠' },
  { to: '/map', label: '知识', icon: '📚' },
  { to: '/bible', label: '蓝图', icon: '📐' },
];
```

---

### Task 5: 构建与验证

**Files:**
- Test: 全项目

- [ ] **Step 1: TypeScript 构建**

Run: `npx tsc --noEmit`
Expected: 无类型错误（exit 0）

- [ ] **Step 2: 运行应用验证页面**

应用 dev server（http://localhost:5174/）运行中，浏览器访问 `http://localhost:5174/bible`：
Expected: iframe 加载 Content Bible v2.0，mermaid 图表正常渲染，顶部导航出现「知识蓝图」。

- [ ] **Step 3: 回归验证**

浏览器访问 `http://localhost:5174/`（今日修炼）与 `/map`（知识·经典）：
Expected: 页面正常，无回归。
