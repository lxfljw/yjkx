export default function Faq() {
  const items = [
    { q: '照片和物品信息存在哪里？安全吗？', a: '数据存储在云端服务器，采用加密传输与存储，保障信息安全。' },
    { q: '识别一定准确吗？', a: '本产品没有识别功能，通过拍照和手动标记记录物品位置。' },
    { q: '是否收费？', a: '提供免费版和 Pro 版，基础功能免费使用，高级功能需订阅 Pro 版。' },
    { q: '支持多人同时使用吗？', a: '支持，创建家庭后邀请家人加入即可共同管理。' },
  ]
  return (
    <section id="faq" className="py-16 bg-[#fdf8f6]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">你可能还关心</h2>
        <div className="flex flex-col gap-3">
          {items.map(i => (
            <details key={i.q} className="bg-white rounded-2xl px-6 py-4 group">
              <summary className="font-medium text-gray-900 cursor-pointer list-none flex justify-between items-center">
                {i.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
