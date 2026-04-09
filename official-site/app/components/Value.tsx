export default function Value() {
  const items = [
    { title: '找物时间更短', desc: '临时要用时不再翻箱倒柜，位置一查就知道。' },
    { title: '重复购买更少', desc: '先查再买，减少“以为没有了”的重复下单。' },
    { title: '家人沟通成本更低', desc: '物品位置看得见，少解释、少反复确认。' },
  ]
  return (
    <section id="value" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">先把“混乱感”降下来</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(i => (
            <div key={i.title} className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{i.title}</h3>
              <p className="text-gray-600 text-sm">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
