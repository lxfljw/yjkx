export default function Flow() {
  const steps = [
    { title: '建空间、拍一张', desc: '为房间或收纳区创建空间，用照片留下现场。' },
    { title: '标记物品位置', desc: '把物品与具体区域绑定，形成可搜索的记录。' },
    { title: '搜索或分类查看', desc: '需要时按名称或分类快速定位。' },
    { title: '拿走放回留痕', desc: '移动与归位可追溯，减少遗忘与争执。' },
  ]
  return (
    <section id="flow" className="py-16 bg-[#fdf8f6]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">使用流程</h2>
        <ol className="flex flex-col md:flex-row gap-6">
          {steps.map((s, i) => (
            <li key={i} className="flex-1 flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E85A4A] text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
