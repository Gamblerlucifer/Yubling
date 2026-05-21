const episodes = [
  { ep: 'EP.01', title: '도메인 구매', desc: 'yubling.com 등록. Y=Why, U=유튜브, bling=블링블링(떡상).', done: true },
  { ep: 'EP.02', title: '랜딩 공개', desc: '디자인 시스템 + SEO 구조 완성. Lighthouse 100점 목표.', done: true },
  { ep: 'EP.03', title: 'Viral Search 공개', desc: '유튜브 바이럴 영상 탐지 첫 번째 툴 오픈.', done: true },
  { ep: 'EP.04', title: 'AI 기능 추가', desc: 'Title Maker, Script Writer, Shorts Maker 순차 오픈.', done: false },
  { ep: 'EP.05', title: '결제 시스템 오픈', desc: 'Paddle 연동 + Starter/Pro 플랜 정식 출시.', done: false },
]

export default function BuildInPublic() {
  return (
    <section id="build-in-public" className="py-20 md:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-zinc-400">
            🚧 Build in Public
          </div>

          <h2 className="text-[clamp(1.25rem,5.5vw,2.5rem)] font-bold text-white tracking-tight mb-3">
            만드는 과정을 공개합니다
          </h2>
          <p className="text-zinc-400 text-base mb-12">
            아이디어부터 수익화까지, 전 과정을 투명하게 공유합니다.
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Line */}
            <div
              className="absolute left-[18px] top-2 bottom-2 w-px"
              style={{
                background:
                  'linear-gradient(180deg, #7C5CFF 0%, rgba(124,92,255,0.1) 100%)',
              }}
              aria-hidden="true"
            />

            <ol className="space-y-8">
              {episodes.map((ep) => (
                <li key={ep.ep} className="flex gap-5">
                  {/* Dot */}
                  <div
                    className={`flex-none w-9 h-9 rounded-full border flex items-center justify-center text-[10px] font-bold z-10 ${
                      ep.done
                        ? 'bg-[#7C5CFF] border-[#7C5CFF] text-white'
                        : 'bg-[#0F1117] border-white/10 text-zinc-400'
                    }`}
                    aria-hidden="true"
                  >
                    {ep.done ? '✓' : '○'}
                  </div>

                  {/* Content */}
                  <div className="pt-1.5 pb-2">
                    <p className="text-[11px] text-zinc-400 mb-0.5">{ep.ep}</p>
                    <p
                      className={`text-sm font-semibold mb-1 ${ep.done ? 'text-white' : 'text-zinc-400'}`}
                    >
                      {ep.title}
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{ep.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
