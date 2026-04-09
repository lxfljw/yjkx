# 有迹可循官网（official-site）

有迹可循官网是一个基于 Next.js 14 的单页站点，用于介绍「家庭物品收纳管理」能力，并引导用户进入 H5 体验页。

## 技术栈
- Next.js 14（App Router）
- React 18 + TypeScript
- Tailwind CSS

## 本地开发
```bash
cd official-site
npm install
npm run dev
```

默认访问：`http://localhost:3000`

## 构建与启动
```bash
cd official-site
npm run lint
npm run build
npm run start
```

## 页面结构
首页由以下区块组成（见 `app/page.tsx`）：
1. Header
2. Hero
3. Pain
4. Value
5. Features
6. Flow
7. Demo
8. Faq
9. Cta
10. Footer

对应组件目录：`app/components/`

## 体验链接
当前体验地址：
- `https://shou-na-zhu-shou1.superun.yun/`

已在多个区块按钮中使用（Header/Hero/Demo/Cta）。如需替换，请同步更新这些组件中的 `EXPERIENCE_URL` 常量。

## 发布（GitHub Actions + Vercel）
仓库包含工作流：
- `.github/workflows/deploy-vercel.yml`

推送到 `main` 后自动触发部署，也支持 `workflow_dispatch` 手动触发。

### 必需 Secrets
请在 GitHub 仓库中配置：
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

以上值可从 Vercel 项目设置或 `vercel link` 获取。

## 发布（GitHub Pages）
仓库包含工作流：
- `.github/workflows/nextjs.yml`

推送到 `main` 后自动触发构建与发布，也支持 `workflow_dispatch` 手动触发。

### Pages 仓库设置
在 GitHub 仓库中进入 `Settings -> Pages`：
- `Source` 选择 `GitHub Actions`

### 访问地址
- `https://lxfljw.github.io/yjkx/`
