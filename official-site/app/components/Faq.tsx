export default function Faq() {
  const items = [
    { q: '照片和物品信息存在哪里？安全吗？', a: '请遵循产品内隐私说明与账号协议。首版官网仅做介绍，具体以 H5 内展示与更新为准。' },
    { q: '识别一定准确吗？', a: '收纳场景复杂，建议以「空间 + 区域 + 物品标注」结合使用；轨迹与放回记录可提升找回概率。' },
    { q: '是否收费？', a: '产品内可能有会员或增值服务，请以 H5 实际展示为准。' },
    { q: '可以多人一起用吗？', a: '若产品提供家庭或协作能力，以 H5 功能为准；官网仅说明方向与价值。' },
  ]
  return (
    <section id="faq" className="py-16 bg-[#fdf8f6]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">常见问题</h2>
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
