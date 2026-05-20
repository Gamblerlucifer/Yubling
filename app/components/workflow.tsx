const steps = [
  { icon: '🔥', title: 'Viral Search', sub: '떡상 영상 발견', color: '#FF3B5C' },
  { icon: '📊', title: 'Channel Copy', sub: '패턴 분석', color: '#9B7FFF' },
  { icon: '✍️', title: 'Title Maker', sub: '제목 생성', color: '#4DA3FF' },
  { icon: '📝', title: 'Script Writer', sub: '대본 작성', color: '#FF3B5C' },
  { icon: '⚡', title: 'Shorts Maker', sub: '쇼츠 구조화', color: '#9B7FFF' },
  { icon: '⚙️', title: 'Upload Settings', sub: '업로드 완료', color: '#4DA3FF' },
]

export default function Workflow() {
  return (
    <section id="workflow" className="py-20 md:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-12 max-w-xl">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 whitespace-nowrap">
            제작 시간을 줄이는 워크플로우
          </h2>
          <p className="text-zinc-400 text-base">
            아이디어에서 업로드까지, AI가 단계별로 자동화합니다.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-0 overflow-x-auto pb-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col md:flex-row items-center">
              {/* Card */}
              <div className="flex-none w-[160px] rounded-2xl border border-white/[0.08] bg-[#131722] p-4 text-center hover:border-white/[0.16] transition-colors">
                <div className="text-2xl mb-2" aria-hidden="true">
                  {step.icon}
                </div>
                <p className="text-white text-sm font-semibold mb-0.5">{step.title}</p>
                <p className="text-[11px]" style={{ color: step.color }}>
                  {step.sub}
                </p>
              </div>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <div
                  className="flex-none md:mx-2 my-2 md:my-0 w-px md:w-8 h-6 md:h-px flex md:flex-row flex-col items-center justify-center"
                  aria-hidden="true"
                >
                  <div
                    className="hidden md:block w-full h-px"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(124,92,255,0.4), rgba(77,163,255,0.4))',
                    }}
                  />
                  <div
                    className="block md:hidden w-px h-full"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(124,92,255,0.4), rgba(77,163,255,0.4))',
                    }}
                  />
                  <span className="hidden md:block text-zinc-600 text-[10px] ml-1">›</span>
                  <span className="block md:hidden text-zinc-600 text-[10px] mt-1">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
