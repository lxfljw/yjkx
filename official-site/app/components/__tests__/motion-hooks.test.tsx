import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React, { useRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

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

function DelayedTargetComponent() {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInViewOnce(ref)

  return (
    <div>
      <button data-testid="mount" onClick={() => setMounted(true)} type="button">
        mount
      </button>
      {mounted ? <div ref={ref} data-testid="target" /> : null}
      <span data-testid="value">{String(inView)}</span>
    </div>
  )
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  MockIntersectionObserver.instances = []
})

describe('useInViewOnce', () => {
  it('returns true after first intersection and stays true, then disconnects', () => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

    render(<TestComponent />)

    expect(screen.getByTestId('value')).toHaveTextContent('false')

    const observer = MockIntersectionObserver.instances[0]
    expect(observer).toBeDefined()
    expect(observer.observe).toHaveBeenCalledTimes(1)

    act(() => {
      observer.trigger(true)
    })

    expect(screen.getByTestId('value')).toHaveTextContent('true')
    expect(observer.disconnect).toHaveBeenCalled()

    act(() => {
      observer.trigger(false)
    })

    expect(screen.getByTestId('value')).toHaveTextContent('true')
  })

  it('observes element when target mounts after initial render', async () => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

    render(<DelayedTargetComponent />)

    expect(screen.getByTestId('value')).toHaveTextContent('false')
    expect(MockIntersectionObserver.instances).toHaveLength(0)

    fireEvent.click(screen.getByTestId('mount'))

    await waitFor(() => {
      expect(MockIntersectionObserver.instances).toHaveLength(1)
    })

    const observer = MockIntersectionObserver.instances[0]
    expect(observer).toBeDefined()
    expect(observer.observe).toHaveBeenCalledTimes(1)

    act(() => {
      observer.trigger(true)
    })

    expect(screen.getByTestId('value')).toHaveTextContent('true')
  })
})
