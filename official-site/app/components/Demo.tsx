'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

const EXPERIENCE_URL = 'https://shou-na-zhu-shou1.superun.yun/'

const images = [
  { src: '/01-spaces.png', alt: '空间首页：房间与物品概览', caption: '空间' },
  { src: '/02-search.png', alt: '搜索：快速查找物品', caption: '搜索' },
  { src: '/03-new-space.png', alt: '新建空间', caption: '新建空间' },
  { src: '/04-category.png', alt: '分类浏览', caption: '分类' },
  { src: '/05-profile.png', alt: '我的：统计与设置', caption: '我的' },
]

export default function Demo() {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section id="demo" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">看一眼就知道怎么用</h2>
        <p className="text-center text-gray-500 text-sm mb-8">空间、搜索、新建空间、分类、我的，左右滑动查看。</p>
        <div className="relative max-w-4xl mx-auto overflow-hidden pb-10">
          <Swiper
            modules={[Autoplay]}
            className="demo-swiper"
            loop
            centeredSlides
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween={24}
            speed={400}
            autoplay={{ delay: 2400, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 14, centeredSlides: true },
              768: { slidesPerView: 3, spaceBetween: 24, centeredSlides: true },
            }}
            onSwiper={swiper => {
              swiperRef.current = swiper
            }}
            onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay?.start()}
            onTouchStart={() => {
              swiperRef.current?.autoplay?.stop()
            }}
            onTouchEnd={() => {
              swiperRef.current?.autoplay?.start()
            }}
          >
            {images.map(img => (
              <SwiperSlide key={img.src}>
                <figure className="px-2">
                  <div className="demo-card rounded-2xl overflow-hidden shadow-md">
                    <Image src={img.src} alt={img.alt} width={195} height={422} className="block w-full h-auto" />
                  </div>
                  <figcaption className="text-center text-sm text-gray-500 mt-2">{img.caption}</figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-700 hover:bg-white"
            aria-label="上一张"
          >
            ‹
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-700 hover:bg-white"
            aria-label="下一张"
          >
            ›
          </button>
        </div>
        <div className="text-center mt-8">
          <a href={EXPERIENCE_URL} className="border border-[#E85A4A] text-[#E85A4A] px-6 py-3 rounded-full font-medium hover:bg-[#E85A4A] hover:text-white transition-colors">立即体验</a>
        </div>
      </div>
    </section>
  )
}
