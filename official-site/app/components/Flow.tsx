export default function Flow() {
  const steps = [
    { title: '建空间', desc: '先按房间和收纳区域建立你的家庭空间。' },
    { title: '标物品', desc: '给常用物品打上位置标记，形成可查记录。' },
    { title: '搜索定位', desc: '要用时直接搜索，快速找到对应区域。' },
    { title: '移动后更新', desc: '拿走或放回后及时记录，轨迹更完整。' },
  ]
  return (
    <section id="flow" className="py-16 bg-[#fdf8f6]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">上手只要四步</h2>
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
