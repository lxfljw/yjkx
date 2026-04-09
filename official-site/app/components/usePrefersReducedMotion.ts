import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function getInitialPreference() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialPreference)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY)
    const handleChange = () => {
      setPrefersReducedMotion(mediaQueryList.matches)
    }

    handleChange()

    mediaQueryList.addEventListener?.('change', handleChange)
    mediaQueryList.addListener?.(handleChange)

    return () => {
      mediaQueryList.removeEventListener?.('change', handleChange)
      mediaQueryList.removeListener?.(handleChange)
    }
  }, [])

  return prefersReducedMotion
}
