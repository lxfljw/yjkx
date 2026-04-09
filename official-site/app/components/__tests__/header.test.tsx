import { act, cleanup, render } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import Header from '../Header'

afterEach(() => {
  cleanup()
})

describe('Header', () => {
  it('updates data-scrolled when page is scrolled beyond threshold', () => {
    render(<Header />)

    const header = document.querySelector('header')
    expect(header).toHaveAttribute('data-scrolled', 'false')

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 25,
      writable: true,
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(header).toHaveAttribute('data-scrolled', 'true')
  })
})
