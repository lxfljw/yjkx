const EXPERIENCE_URL = 'https://shou-na-zhu-shou1.superun.yun/'

export default function Hero() {
  return (
    <section id="hero" className="bg-[#fdf8f6] py-20">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <p className="text-sm text-[#E85A4A] font-medium mb-3">家庭物品 · 空间收纳</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">告别翻箱倒柜，<br />把家还给生活</h1>
          <p className="text-gray-600 mb-8 text-lg">有迹可循通过空间拍照与物品标记，帮你记住每件物品放在哪里，支持拿走放回与轨迹查看。</p>
          <div className="flex gap-4">
            <a href={EXPERIENCE_URL} className="bg-[#E85A4A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#d44a3a] transition-colors">立即体验</a>
            <a href="#features" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">了解能力</a>
          </div>
        </div>
        <div className="flex-shrink-0 w-48 h-96 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-400 text-sm">
          首屏主视觉
        </div>
      </div>
    </section>
  )
}
