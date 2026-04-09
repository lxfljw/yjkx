import { RefObject, useEffect, useState } from 'react'

export function useInViewOnce<T extends Element>(ref: RefObject<T>): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (inView) {
      return
    }

    const target = ref.current
    if (!target || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setInView(true)
        observer.disconnect()
      }
    })

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [ref, inView])

  return inView
}
