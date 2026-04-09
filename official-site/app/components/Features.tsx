export default function Features() {
  const items = [
    { icon: '📷', title: '空间拍照建档', desc: '按房间、柜子、区域建立空间，用照片留下当下收纳状态。' },
    { icon: '📍', title: '物品位置标记', desc: '把物品与具体区域绑定，形成可检索的位置记录。' },
    { icon: '🕐', title: '拿走放回轨迹可查', desc: '记录移动与归位，回看物品变化更有线索。' },
  ]
  return (
    <section id="features" className="py-16 bg-[#fdf8f6]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">三个能力，撑起家庭收纳记忆</h2>
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
