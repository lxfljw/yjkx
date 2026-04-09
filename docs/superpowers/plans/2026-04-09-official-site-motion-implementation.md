# Official Site 首页动效增强（方案 B）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `official-site` 落地“首屏 Canvas 粒子 + 全站 2D 进入动效”，并以 TDD 方式保证关键动效状态可回归。

**Architecture:** 使用 `IntersectionObserver` 驱动区块一次性进入状态，样式与关键帧集中在 `globals.css`。Hero 使用轻量 Canvas 粒子（非 Three.js），并对移动端与 `prefers-reduced-motion` 做降级。通过 Vitest + Testing Library 验证“状态是否正确触发”，再用 `lint/build` 做集成验证。

**Tech Stack:** Next.js 14、React 18、TypeScript、Tailwind CSS、Vitest、@testing-library/react、jsdom

---

## File Structure
- Modify: `official-site/package.json`
- Create: `official-site/vitest.config.ts`
- Create: `official-site/vitest.setup.ts`
- Create: `official-site/app/components/useInViewOnce.ts`
- Create: `official-site/app/components/usePrefersReducedMotion.ts`
- Modify: `official-site/app/page.tsx`
- Modify: `official-site/app/components/Header.tsx`
- Modify: `official-site/app/components/Hero.tsx`
- Modify: `official-site/app/components/Demo.tsx`
- Modify: `official-site/app/globals.css`
- Test: `official-site/app/components/__tests__/motion-hooks.test.tsx`
- Test: `official-site/app/components/__tests__/header.test.tsx`
- Test: `official-site/app/components/__tests__/hero-motion.test.tsx`

### Task 1: 建立测试基建（先测后改的前置）

**Files:**
- Modify: `official-site/package.json`
- Create: `official-site/vitest.config.ts`
- Create: `official-site/vitest.setup.ts`

- [ ] **Step 1: 安装测试依赖**
Run:
```bash
cd official-site
npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
Expected: 安装成功，无 peer dependency error。

- [ ] **Step 2: 在 `package.json` 增加测试脚本（先写配置）**
```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

- [ ] **Step 3: 新增 Vitest 配置与 setup**
`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['app/components/__tests__/**/*.test.tsx'],
  },
})
```

`vitest.setup.ts`:
```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: 运行空测试校验工具链**
Run: `cd official-site && npm run test:run`  
Expected: “No test files found” 或 0 tests 通过。

- [ ] **Step 5: 提交本任务**
```bash
git add official-site/package.json official-site/vitest.config.ts official-site/vitest.setup.ts
git commit -m "test: setup vitest and testing-library for motion TDD"
```

### Task 2: 为滚动进入状态编写失败测试并实现

**Files:**
- Create: `official-site/app/components/useInViewOnce.ts`
- Test: `official-site/app/components/__tests__/motion-hooks.test.tsx`

- [ ] **Step 1: 先写失败测试（无 hook 时应失败）**
```tsx
import { render, screen } from '@testing-library/react'
import { useRef } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useInViewOnce } from '../useInViewOnce'

function Probe() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInViewOnce(ref)
  return <div ref={ref} data-testid="probe" data-inview={String(inView)} />
}

describe('useInViewOnce', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      constructor(private cb: IntersectionObserverCallback) {}
      observe() { this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver) }
      unobserve() {}
      disconnect() {}
      takeRecords() { return [] }
      root = null
      rootMargin = ''
      thresholds = [0]
    })
  })

  it('sets true once element intersects', () => {
    render(<Probe />)
    expect(screen.getByTestId('probe')).toHaveAttribute('data-inview', 'true')
  })
})
```

- [ ] **Step 2: 运行单测确认失败**
Run: `cd official-site && npm run test:run -- app/components/__tests__/motion-hooks.test.tsx`  
Expected: FAIL，报 `Cannot find module '../useInViewOnce'`。

- [ ] **Step 3: 最小实现 `useInViewOnce` 让测试通过**
```ts
import { useEffect, useState, RefObject } from 'react'

export function useInViewOnce<T extends Element>(ref: RefObject<T>) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (inView || !ref.current) return

    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, { threshold: 0.15 })

    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [inView, ref])

  return inView
}
```

- [ ] **Step 4: 运行测试确认通过**
Run: `cd official-site && npm run test:run -- app/components/__tests__/motion-hooks.test.tsx`  
Expected: PASS。

- [ ] **Step 5: 提交本任务**
```bash
git add official-site/app/components/useInViewOnce.ts official-site/app/components/__tests__/motion-hooks.test.tsx
git commit -m "test: add in-view once hook with failing-first tests"
```

### Task 3: 为 Header 滚动态编写失败测试并实现

**Files:**
- Modify: `official-site/app/components/Header.tsx`
- Test: `official-site/app/components/__tests__/header.test.tsx`

- [ ] **Step 1: 先写失败测试（滚动后应切换样式状态）**
```tsx
import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from '../Header'

describe('Header motion state', () => {
  it('adds scrolled state when scrollY > 24', () => {
    render(<Header />)
    const el = screen.getByRole('banner')
    expect(el).toHaveAttribute('data-scrolled', 'false')

    Object.defineProperty(window, 'scrollY', { value: 30, writable: true })
    act(() => window.dispatchEvent(new Event('scroll')))

    expect(el).toHaveAttribute('data-scrolled', 'true')
  })
})
```

- [ ] **Step 2: 运行测试确认失败**
Run: `cd official-site && npm run test:run -- app/components/__tests__/header.test.tsx`  
Expected: FAIL，缺少 `data-scrolled` 或状态不变化。

- [ ] **Step 3: 最小实现 Header 滚动态状态**
关键实现（`Header.tsx`）：
```tsx
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 24)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])

<header data-scrolled={String(scrolled)} className={scrolled ? '...' : '...'}>
```

- [ ] **Step 4: 运行测试确认通过**
Run: `cd official-site && npm run test:run -- app/components/__tests__/header.test.tsx`  
Expected: PASS。

- [ ] **Step 5: 提交本任务**
```bash
git add official-site/app/components/Header.tsx official-site/app/components/__tests__/header.test.tsx
git commit -m "feat: add header scroll motion state with tests"
```

### Task 4: 为 Hero 动效降级写失败测试并实现

**Files:**
- Create: `official-site/app/components/usePrefersReducedMotion.ts`
- Modify: `official-site/app/components/Hero.tsx`
- Test: `official-site/app/components/__tests__/hero-motion.test.tsx`

- [ ] **Step 1: 先写失败测试（reduced motion 时不渲染粒子层）**
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Hero from '../Hero'

describe('Hero motion', () => {
  it('hides particle canvas when prefers-reduced-motion is enabled', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({
      matches: q.includes('prefers-reduced-motion'),
      media: q,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }))

    render(<Hero />)
    expect(screen.queryByTestId('hero-particles')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行测试确认失败**
Run: `cd official-site && npm run test:run -- app/components/__tests__/hero-motion.test.tsx`  
Expected: FAIL，当前 Hero 无此降级逻辑。

- [ ] **Step 3: 最小实现 reduced motion hook + Hero 渲染分支**
`usePrefersReducedMotion.ts`:
```ts
import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(m.matches)
    update()
    m.addEventListener?.('change', update)
    return () => m.removeEventListener?.('change', update)
  }, [])

  return reduced
}
```

Hero 中：
```tsx
const reducedMotion = usePrefersReducedMotion()
{!reducedMotion && <canvas data-testid="hero-particles" ... />}
```

- [ ] **Step 4: 运行测试确认通过**
Run: `cd official-site && npm run test:run -- app/components/__tests__/hero-motion.test.tsx`  
Expected: PASS。

- [ ] **Step 5: 提交本任务**
```bash
git add official-site/app/components/usePrefersReducedMotion.ts official-site/app/components/Hero.tsx official-site/app/components/__tests__/hero-motion.test.tsx
git commit -m "feat: add reduced-motion fallback for hero particles"
```

### Task 5: 接入页面进入动效与样式 token

**Files:**
- Modify: `official-site/app/page.tsx`
- Modify: `official-site/app/globals.css`
- Modify: `official-site/app/components/Demo.tsx`

- [ ] **Step 1: 在 `page.tsx` 为各区块增加可观测 class（如 `motion-section`）并接入一次性 in-view 状态**
- [ ] **Step 2: 在 `globals.css` 增加动效 token、关键帧、`prefers-reduced-motion` 降级样式**
```css
.motion-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .56s cubic-bezier(0.22,1,0.36,1), transform .56s cubic-bezier(0.22,1,0.36,1);
}
.motion-section.in-view {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .motion-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```
- [ ] **Step 3: Demo 弹层加过渡 class（不改现有开关逻辑）**
- [ ] **Step 4: 运行测试与构建回归**
Run:
```bash
cd official-site
npm run test:run
npm run lint
npm run build
```
Expected: test/lint/build 全部通过。

- [ ] **Step 5: 提交本任务**
```bash
git add official-site/app/page.tsx official-site/app/globals.css official-site/app/components/Demo.tsx
git commit -m "feat: add section reveal motions and demo transition styles"
```

## Self-Review
- Spec coverage: 覆盖了首屏粒子、全站进入动效、Header 状态动效、reduced-motion 降级、验收命令。
- Placeholder scan: 无 TBD/TODO，关键步骤均有代码或命令。
- Type consistency: hook 与测试引用命名一致（`useInViewOnce`、`usePrefersReducedMotion`）。
