export default function Pain() {
  const items = [
    { title: '明明在家却找不到', desc: '找过抽屉、翻过柜子，最后还是只能再来一遍。' },
    { title: '找不到就重复买', desc: '以为没有了就下单，结果回家又在角落里翻出来。' },
    { title: '家人总问“放哪了”', desc: '你记得大概位置，但每次都要重新解释一遍。' },
  ]
  return (
    <section id="pain" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">这些找东西时刻，你一定不陌生</h2>
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
