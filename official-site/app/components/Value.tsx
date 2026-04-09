export default function Value() {
  const items = [
    { title: '更省时间', desc: '少翻找，少折腾，把精力留给真正重要的事。' },
    { title: '更低焦虑', desc: '物品有「落脚点」，心里也更踏实。' },
    { title: '更好协作', desc: '家人也能看懂物品在哪，减少重复沟通。' },
  ]
  return (
    <section id="value" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">你会感受到的变化</h2>
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
