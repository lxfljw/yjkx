import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import Hero from '../Hero'

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('Hero motion behavior', () => {
  it('does not render particles when user prefers reduced motion', () => {
    stubMatchMedia(true)

    render(<Hero />)

    expect(screen.queryByTestId('hero-particles')).not.toBeInTheDocument()
  })

  it('renders particles when user does not prefer reduced motion', () => {
    stubMatchMedia(false)

    render(<Hero />)

    expect(screen.getByTestId('hero-particles')).toBeInTheDocument()
  })
})
