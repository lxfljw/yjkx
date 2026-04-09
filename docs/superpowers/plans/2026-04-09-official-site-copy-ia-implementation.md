# Official Site 文案与信息架构优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不新增功能与依赖的前提下，让 `official-site` 的单页结构和文案与已确认设计稿一致（家庭主收纳人、先认知后转化）。

**Architecture:** 基于现有 Next.js App Router 单页组件结构，按“最小改动”策略调整区块顺序、文案和元信息。保留现有交互实现（Demo 放大、FAQ 折叠、锚点导航），仅改文案与编排。所有变更限定在 `official-site/app/*` 与 `official-site/README.md`。

**Tech Stack:** Next.js 14、React 18、TypeScript、Tailwind CSS、npm scripts（`lint`/`build`）

---

## File Structure
- Modify: `official-site/app/page.tsx`（区块顺序、metadata 归属）
- Modify: `official-site/app/layout.tsx`（全局 metadata）
- Modify: `official-site/app/components/Hero.tsx`（首屏主次按钮与文案）
- Modify: `official-site/app/components/Pain.tsx`（痛点区标题与文案）
- Modify: `official-site/app/components/Value.tsx`（价值区标题与文案）
- Modify: `official-site/app/components/Features.tsx`（能力区标题与文案）
- Modify: `official-site/app/components/Flow.tsx`（流程区标题与文案）
- Modify: `official-site/app/components/Demo.tsx`（演示区标题与说明文案）
- Modify: `official-site/app/components/Faq.tsx`（FAQ 问答文案）
- Modify: `official-site/app/components/Cta.tsx`（尾部 CTA 文案）
- Modify: `official-site/README.md`（项目说明替换默认模板）

### Task 1: 调整页面骨架与 metadata 归属

**Files:**
- Modify: `official-site/app/page.tsx`
- Modify: `official-site/app/layout.tsx`

- [ ] **Step 1: 在 `page.tsx` 调整区块顺序为 Hero -> Pain -> Value -> Features -> Flow -> Demo -> Faq -> Cta**
- [ ] **Step 2: 从 `page.tsx` 移除 `export const metadata`，避免与 `layout.tsx` 重复定义**
- [ ] **Step 3: 在 `layout.tsx` 写入业务 metadata**
```ts
export const metadata: Metadata = {
  title: '有迹可循 - 家庭物品收纳管理',
  description: '有迹可循官网：用空间拍照与物品标记，记住每件东西放在哪里，支持拿走放回与轨迹查看。',
}
```
- [ ] **Step 4: 运行类型与构建检查**
Run: `cd official-site && npm run lint && npm run build`  
Expected: lint 无 error；build 成功。
- [ ] **Step 5: 提交本任务**
```bash
git add official-site/app/page.tsx official-site/app/layout.tsx
git commit -m "refactor: align homepage section order and metadata ownership"
```

### Task 2: 调整 Hero 与 Pain（情绪先行）

**Files:**
- Modify: `official-site/app/components/Hero.tsx`
- Modify: `official-site/app/components/Pain.tsx`

- [ ] **Step 1: Hero 按钮主次改为“了解能力”在前，“立即体验”在后**
```tsx
<div className="flex gap-4">
  <a href="#features" className="bg-[#E85A4A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#d44a3a] transition-colors">了解能力</a>
  <a href={EXPERIENCE_URL} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">立即体验</a>
</div>
```
- [ ] **Step 2: Pain 标题与三条文案改为已确认版本**
```ts
const items = [
  { title: '明明在家却找不到', desc: '找过抽屉、翻过柜子，最后还是只能再来一遍。' },
  { title: '找不到就重复买', desc: '以为没有了就下单，结果回家又在角落里翻出来。' },
  { title: '家人总问“放哪了”', desc: '你记得大概位置，但每次都要重新解释一遍。' },
]
```
标题：`这些找东西时刻，你一定不陌生`
- [ ] **Step 3: 运行检查**
Run: `cd official-site && npm run lint`  
Expected: 无 error。
- [ ] **Step 4: 提交本任务**
```bash
git add official-site/app/components/Hero.tsx official-site/app/components/Pain.tsx
git commit -m "feat: update hero priority and pain copy"
```

### Task 3: 调整 Value、Features、Flow（认知路径）

**Files:**
- Modify: `official-site/app/components/Value.tsx`
- Modify: `official-site/app/components/Features.tsx`
- Modify: `official-site/app/components/Flow.tsx`

- [ ] **Step 1: 更新 Value 标题与文案**
标题：`先把“混乱感”降下来`  
卡片文案：`找物时间更短`、`重复购买更少`、`家人沟通成本更低`
- [ ] **Step 2: 更新 Features 标题与文案**
标题：`三个能力，撑起家庭收纳记忆`  
卡片文案：`空间拍照建档`、`物品位置标记`、`拿走放回轨迹可查`
- [ ] **Step 3: 更新 Flow 标题与步骤文案**
标题：`上手只要四步`  
步骤：`建空间` -> `标物品` -> `搜索定位` -> `移动后更新`
- [ ] **Step 4: 运行检查**
Run: `cd official-site && npm run lint`  
Expected: 无 error。
- [ ] **Step 5: 提交本任务**
```bash
git add official-site/app/components/Value.tsx official-site/app/components/Features.tsx official-site/app/components/Flow.tsx
git commit -m "feat: align value features flow messaging"
```

### Task 4: 调整 Demo、FAQ、CTA（证明与消疑）

**Files:**
- Modify: `official-site/app/components/Demo.tsx`
- Modify: `official-site/app/components/Faq.tsx`
- Modify: `official-site/app/components/Cta.tsx`

- [ ] **Step 1: 更新 Demo 区文案（不改交互）**
标题：`看一眼就知道怎么用`  
副文案：`空间、搜索、新建空间、分类、我的，左右滑动查看，点击可放大。`
- [ ] **Step 2: 更新 FAQ 问答方向与文案**
问题包含：`需要全家都注册吗？`、`识别准不准？`、`数据安全吗？`、`是否收费？`
- [ ] **Step 3: 更新 CTA 标题与副文案**
标题：`先把一个抽屉试起来`  
副文案：`从最常用的区域开始，今天就建立第一份家庭物品地图。`
- [ ] **Step 4: 运行检查**
Run: `cd official-site && npm run lint && npm run build`  
Expected: lint/build 均成功。
- [ ] **Step 5: 提交本任务**
```bash
git add official-site/app/components/Demo.tsx official-site/app/components/Faq.tsx official-site/app/components/Cta.tsx
git commit -m "feat: refine demo faq cta copy"
```

### Task 5: 更新 README 并完成验收

**Files:**
- Modify: `official-site/README.md`

- [ ] **Step 1: 将 README 从默认模板替换为项目说明**
必须包含：项目定位、启动命令、构建命令、页面区块、体验链接位置、部署工作流与 Secrets。
- [ ] **Step 2: 全量回归验证**
Run:
```bash
cd official-site
npm run lint
npm run build
```
Expected: 两个命令都成功；首页可正常渲染 8 区块。
- [ ] **Step 3: 最终提交**
```bash
git add official-site/README.md
git commit -m "docs: replace template readme with project guide"
```

## Self-Review
- Spec coverage: 已覆盖信息顺序、文案主次、metadata、README、验收命令。
- Placeholder scan: 无 TBD/TODO/“后续补充”类占位。
- Consistency: 所有任务都限制在 spec 定义文件范围内，未引入新依赖和新交互。
