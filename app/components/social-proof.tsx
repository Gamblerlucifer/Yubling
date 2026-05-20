const stats = [
  { label: '오늘 분석된 영상', value: '1,284' },
  { label: '생성된 제목', value: '3,912' },
  { label: 'Shorts 구조 생성', value: '847' },
  { label: 'AI 사용 횟수', value: '12,039' },
  { label: '추출된 태그', value: '28,441' },
  { label: '분석된 채널', value: '612' },
]

export default function SocialProof() {
  const doubled = [...stats, ...stats]

  return (
    <section
      aria-label="실시간 사용 현황"
      className="relative overflow-hidden border-y border-white/[0.06] py-5 bg-[#0F1117]/60"
    >
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-3 flex-none">
            <span className="text-sm font-semibold text-white tabular-nums">{item.value}</span>
            <span className="text-xs text-zinc-400">{item.label}</span>
            <span className="w-px h-3 bg-white/10" aria-hidden="true" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
