'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const EXPERIENCE_URL = 'https://shou-na-zhu-shou1.superun.yun/'
const SCROLL_THRESHOLD = 24

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100" data-scrolled={scrolled}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <a href="#hero" className="flex items-center" aria-label="有迹可循">
          <Image src="/logo.png" alt="有迹可循 Logo" width={36} height={36} priority />
        </a>
        <nav className="flex items-center gap-3 md:gap-6 text-xs md:text-sm whitespace-nowrap">
          <a href="#features" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">产品能力</a>
          <a href="#flow" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">使用流程</a>
          <a href="#faq" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">常见问题</a>
          <a href={EXPERIENCE_URL} className="bg-[#E85A4A] text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm hover:bg-[#d44a3a] transition-colors whitespace-nowrap">
            立即体验
          </a>
        </nav>
      </div>
    </header>
  )
}
