const EXPERIENCE_URL = 'https://shou-na-zhu-shou1.superun.yun/'

export default function Cta() {
  return (
    <section id="cta" className="py-16 bg-[#E85A4A]">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">现在就去体验</h2>
          <p className="text-white/80">用 H5 直接上手，把收纳变成可检索的习惯。</p>
        </div>
        <a href={EXPERIENCE_URL} className="bg-white text-[#E85A4A] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
          立即体验
        </a>
      </div>
    </section>
  )
}
