import { RefObject, useEffect, useState } from 'react'

export function useInViewOnce<T extends Element>(ref: RefObject<T>): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (inView || typeof IntersectionObserver === 'undefined') {
      return
    }

    let observer: IntersectionObserver | null = null
    let frameId: number | null = null
    let cancelled = false

    const startObserve = () => {
      if (cancelled || observer) {
        return
      }

      const target = ref.current
      if (!target) {
        frameId = window.requestAnimationFrame(startObserve)
        return
      }

      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer?.disconnect()
          observer = null
        }
      })

      observer.observe(target)
    }

    startObserve()

    return () => {
      cancelled = true
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
      observer?.disconnect()
    }
  }, [ref, inView])

  return inView
}
