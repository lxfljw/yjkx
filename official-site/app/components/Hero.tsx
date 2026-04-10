'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const EXPERIENCE_URL = 'https://shou-na-zhu-shou1.superun.yun/'

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section id="hero" className="relative bg-[#fdf8f6] py-12 md:py-20 overflow-hidden">
      {isMounted && !prefersReducedMotion ? (
        <canvas
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          data-testid="hero-particles"
        />
      ) : null}
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12">
        <div className="flex-1 w-full text-center md:text-left">
          <p className="text-sm text-[#E85A4A] font-medium mb-2 md:mb-3">家庭物品 · 空间收纳</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">告别翻箱倒柜<br />把家还给生活</h1>
          <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg max-w-xl">有迹可循通过空间拍照与物品标记，帮你记住每件物品放在哪里，支持拿走放回与轨迹查看。</p>
          <div className="flex justify-center md:justify-start gap-3 md:gap-4">
            <a href="#features" className="bg-[#E85A4A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#d44a3a] transition-colors whitespace-nowrap">了解能力</a>
            <a href={EXPERIENCE_URL} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">立即体验</a>
          </div>
        </div>
        <div className="mx-auto md:mx-0 flex-shrink-0 w-[220px] h-[446px] md:w-48 md:h-96 rounded-3xl overflow-hidden shadow-md">
          <Image
            src="/01-spaces.png"
            alt="首页主视觉"
            width={384}
            height={768}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}
