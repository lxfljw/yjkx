export default function Faq() {
  const items = [
    { q: '需要全家都注册吗？', a: '可先由家庭主收纳人建立空间并维护记录，是否支持多人协作与权限分配以 H5 实际功能为准。' },
    { q: '识别准不准？', a: '收纳场景复杂，建议结合“空间 + 区域 + 物品标记”一起使用，轨迹记录能帮助你更快找回。' },
    { q: '数据安全吗？', a: '请以产品内隐私说明与账号协议为准；官网仅做能力介绍，不额外收集超出业务范围的信息。' },
    { q: '是否收费？', a: '产品可能包含会员或增值服务，具体收费与权益以 H5 页面实际展示为准。' },
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
