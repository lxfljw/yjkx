'use client'

import { useState } from 'react'
import Image from 'next/image'

const EXPERIENCE_URL = 'https://shou-na-zhu-shou1.superun.yun/'

const images = [
  { src: '/01-spaces.png', alt: '空间首页：房间与物品概览', caption: '空间' },
  { src: '/02-search.png', alt: '搜索：快速查找物品', caption: '搜索' },
  { src: '/03-new-space.png', alt: '新建空间', caption: '新建空间' },
  { src: '/04-category.png', alt: '分类浏览', caption: '分类' },
  { src: '/05-profile.png', alt: '我的：统计与设置', caption: '我的' },
]

export default function Demo() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <section id="demo" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">产品界面预览</h2>
        <p className="text-center text-gray-500 text-sm mb-8">左右滑动查看截图，点击可放大。</p>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {images.map(img => (
            <figure key={img.src} className="flex-shrink-0 snap-start">
              <button onClick={() => setLightbox(img)} className="block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <Image src={img.src} alt={img.alt} width={195} height={422} className="block" />
              </button>
              <figcaption className="text-center text-sm text-gray-500 mt-2">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href={EXPERIENCE_URL} className="border border-[#E85A4A] text-[#E85A4A] px-6 py-3 rounded-full font-medium hover:bg-[#E85A4A] hover:text-white transition-colors">立即体验</a>
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-8 right-0 text-white text-2xl">×</button>
            <Image src={lightbox.src} alt={lightbox.alt} width={390} height={844} className="rounded-2xl max-h-[85vh] w-auto" />
          </div>
        </div>
      )}
    </section>
  )
}
