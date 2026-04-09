# 有迹可循官网动效设计（方案 B：首屏 Canvas + 全站 2D）

## 1. 背景与目标
- 项目：`official-site`（Next.js 单页官网）。
- 目标：在不引入 Three.js 的前提下，提升首页品牌冲击力与浏览节奏，兼顾桌面与移动端。
- 设计结论：本轮采用“轻量 Canvas 粒子（仅首屏）+ 全站 CSS/JS 进入动效”。

## 2. 是否需要 Three.js（结论）

### 2.1 当前结论
当前阶段不需要 Three.js，动画方案足够。

### 2.2 判定依据
- 当前无可用 3D 资产与明确 3D 叙事。
- 目标端同时覆盖桌面与移动，Three.js 在移动端性能与兼容成本更高。
- 首页核心诉求是“信息传达 + 转化”，并非 3D 内容展示。

### 2.3 升级触发条件（未来）
仅当同时满足以下条件，才进入 Three.js 方案：
1. 有可落地的 3D 资产（模型/材质/动画）；
2. 有必须通过 3D 表达的业务叙事；
3. 接受移动端降级与额外维护成本。

## 3. 动效架构（确认版）

### 3.1 分层
- Layer 1：全站基础动效（CSS + IntersectionObserver）。
- Layer 2：首屏增强动效（Canvas 粒子背景，非 3D）。
- Layer 3：交互反馈（hover、lightbox 开关过渡）。

### 3.2 触发策略
- 首屏：页面进入后 0.2s 启动动效。
- 其他区块：滚动进入时播放一次，不重复触发。
- 降级：`prefers-reduced-motion` 场景下关闭粒子与位移动效。

### 3.3 性能边界
- Canvas 仅在 Hero 渲染，移动端粒子数量减半。
- 过渡仅使用 `transform/opacity`，避免回流抖动。
- 移动端目标帧率：55-60fps；低端机允许自动降级为纯 CSS。

## 4. 区块级动效参数

### 4.1 全局参数
- 缓动：`cubic-bezier(0.22, 1, 0.36, 1)`
- 基础时长：`560ms`
- 区块内错峰：`80ms`
- 初始：`opacity: 0; transform: translateY(20px)`

### 4.2 Header
- 首次加载：`translateY(12px -> 0)`，`420ms`。
- 滚动超过 24px：背景与阴影过渡，`180ms`。

### 4.3 Hero（重点）
- 文案三段错峰：标题 0ms / 副文案 100ms / 按钮 180ms。
- 主视觉块：`scale(0.96 -> 1)` + `opacity`，`620ms`。
- Canvas 粒子：
  - 桌面：24-32 粒子，慢速漂移，连接线可选（低透明）。
  - 移动：10-14 粒子，无连接线。

### 4.4 Pain / Value / Features
- 标题先入、卡片后入。
- 卡片错峰：每张 `+80ms`。
- 桌面 hover：上移 `-4px` + 阴影增强，`180ms`。

### 4.5 Flow
- 步骤项依次进入。
- 序号圆点 `scale(0.92 -> 1)`，`260ms`。

### 4.6 Demo
- 区块进入同全局参数。
- 图片卡 hover：`scale(1 -> 1.02)`，`200ms`。
- Lightbox：遮罩 `180ms`，内容 `scale(0.96 -> 1)` `220ms`。

### 4.7 FAQ
- 区块进入同全局参数。
- 展开项以 `opacity + slight translate` 过渡为主，避免高度抖动。

### 4.8 CTA
- 区块上浮：`translateY(24px -> 0)`，`560ms`。
- 按钮 hover：亮度轻升 + `translateY(-1px)`，`160ms`。

## 5. 实施边界与文件清单

### 5.1 预计修改文件
- `official-site/app/globals.css`
- `official-site/app/page.tsx`
- `official-site/app/components/Header.tsx`
- `official-site/app/components/Hero.tsx`
- `official-site/app/components/Demo.tsx`

### 5.2 明确不改
- 不引入 Three.js 及相关依赖。
- 不修改既有业务文案和信息架构。
- 不改动 Demo 的核心交互逻辑（仅增强过渡）。

## 6. 验收标准
- 首屏在进入后 0.2s 内启动连续动效，观感连贯。
- 区块首次进入视口时有一次性进入动画。
- Demo 弹层开关过渡平滑。
- 移动端（<768px）无明显卡顿。
- `prefers-reduced-motion` 下自动降级并保持可用性。

## 7. 风险与对策
- 风险：Canvas 与滚动动画叠加导致低端机掉帧。
  - 对策：移动端减粒子、降帧策略、必要时关闭连接线。
- 风险：动画过多干扰信息阅读。
  - 对策：控制位移幅度与时长，不做无限重复强动效。
- 风险：实现分散在多个组件，样式维护复杂。
  - 对策：动效 token 与关键帧集中在 `globals.css`。

## 8. Spec 自检
- Placeholder scan：无 TBD/TODO。
- Internal consistency：方案结论、参数、文件范围一致。
- Scope check：聚焦首页动效增强，单轮可执行。
- Ambiguity check：关键参数与降级规则已明确。
