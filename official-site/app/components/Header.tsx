'use client'

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
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#hero" className="font-bold text-lg text-[#E85A4A]">有迹可循</a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#features" className="text-gray-600 hover:text-gray-900">产品能力</a>
          <a href="#flow" className="text-gray-600 hover:text-gray-900">使用流程</a>
          <a href="#faq" className="text-gray-600 hover:text-gray-900">常见问题</a>
          <a href={EXPERIENCE_URL} className="bg-[#E85A4A] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#d44a3a] transition-colors">
            立即体验
          </a>
        </nav>
      </div>
    </header>
  )
}
