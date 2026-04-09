export default function Features() {
  const items = [
    { icon: '📷', title: '空间拍照标识', desc: '按房间、柜子、区域建立空间，拍照记录物品所在位置。' },
    { icon: '↔️', title: '拿走与放回', desc: '记录物品借出、移动与归位，减少「被挪走就忘了」的焦虑。' },
    { icon: '🕐', title: '物品轨迹可查', desc: '查看历史位置与变动，找回「最后一次出现」的线索。' },
  ]
  return (
    <section id="features" className="py-16 bg-[#fdf8f6]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">三大能力，把「放哪了」变成可检索的记忆</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(i => (
            <div key={i.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-3">{i.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{i.title}</h3>
              <p className="text-gray-600 text-sm">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
