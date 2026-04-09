import { act, render, screen } from '@testing-library/react'
import React, { useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useInViewOnce } from '../useInViewOnce'

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []

  readonly callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])

  trigger(isIntersecting: boolean) {
    const target = this.observe.mock.calls[0]?.[0] ?? document.createElement('div')
    const entry = {
      isIntersecting,
      target,
      time: 0,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
    } as IntersectionObserverEntry

    this.callback([entry], this as unknown as IntersectionObserver)
  }
}

function TestComponent() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInViewOnce(ref)

  return (
    <div>
      <div ref={ref} data-testid="target" />
      <span data-testid="value">{String(inView)}</span>
    </div>
  )
}

describe('useInViewOnce', () => {
  it('returns true after first intersection and stays true', () => {
    MockIntersectionObserver.instances = []

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

    render(<TestComponent />)

    expect(screen.getByTestId('value')).toHaveTextContent('false')

    const observer = MockIntersectionObserver.instances[0]
    expect(observer).toBeDefined()

    act(() => {
      observer.trigger(true)
    })

    expect(screen.getByTestId('value')).toHaveTextContent('true')

    act(() => {
      observer.trigger(false)
    })

    expect(screen.getByTestId('value')).toHaveTextContent('true')

    vi.unstubAllGlobals()
  })
})
