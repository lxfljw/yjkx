export default function Pain() {
  const items = [
    { title: '翻遍抽屉也找不到', desc: '明明买过，却想不起上次收在哪一格。' },
    { title: '重复购买浪费钱', desc: '找不到就先买新的，家里越堆越满。' },
    { title: '家人不知道你放哪', desc: '收纳的人是你，找东西的却是全家。' },
  ]
  return (
    <section id="pain" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">你是不是也常遇到这些时刻</h2>
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
