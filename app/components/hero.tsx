import Link from 'next/link'

const mockResults = [
  {
    rank: 1,
    thumbnail: '#1a1f2e',
    title: '혼자 제주도 3박4일 실비용 공개 (충격)',
    channel: '여행하는 김씨',
    views: '4.2M',
    subs: '18.3K',
    viralScore: 98,
    uploaded: '6일 전',
    accent: '#FF3B5C',
  },
  {
    rank: 2,
    thumbnail: '#1e1a2e',
    title: '월 300 버는 직장인의 현실 루틴',
    channel: '현실재테크',
    views: '2.8M',
    subs: '9.1K',
    viralScore: 94,
    uploaded: '3일 전',
    accent: '#9B7FFF',
  },
  {
    rank: 3,
    thumbnail: '#1a2e1e',
    title: '아이폰 vs 갤럭시 카메라 진짜 비교',
    channel: '테크리뷰어',
    views: '1.9M',
    subs: '22.5K',
    viralScore: 91,
    uploaded: '2일 전',
    accent: '#4DA3FF',
  },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,92,255,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left */}
          <div className="flex-none lg:w-[45%] pt-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              🚧 Build in Public
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-5">
              떡상한 이유를
              <br />
              <span
                style={{
                  backgroundImage: 'linear-gradient(90deg, #FF3B5C, #7C5CFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                복사하세요
              </span>
            </h1>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              조회수 잘 나오는 영상엔 공식이 있습니다.
              <br />
              Yubling은 터진 영상의 패턴을 분석해
              <br />
              제목·대본·태그·쇼츠 구조까지 자동 생성합니다.
            </p>

            {/* Search Input */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 flex items-center gap-3 px-4 h-12 rounded-xl border border-white/10 bg-white/[0.04] focus-within:border-white/20 transition-colors">
                <svg
                  className="w-4 h-4 text-zinc-500 flex-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="예: 먹방, 브이로그, 여행 쇼츠"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
                  aria-label="키워드 검색"
                />
              </div>
              <button
                className="flex-none h-12 px-5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #FF3B5C, #7C5CFF)' }}
              >
                떡상 영상 찾기
              </button>
            </div>

            {/* Sub info */}
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
              {['무료 시작 가능', '가입 없이 검색 가능', '실시간 AI 분석'].map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <svg
                    className="w-3.5 h-3.5 text-[#7C5CFF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Viral Search Mockup */}
          <div className="w-full lg:w-[55%]" aria-label="Viral Search 미리보기">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0F1117] overflow-hidden">
              {/* Mockup header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
                <span className="text-xs font-medium text-zinc-300">Viral Search</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B5C]" />
                  <span className="text-[10px] text-zinc-400">실시간 분석 중</span>
                </div>
              </div>

              {/* Results */}
              <div className="divide-y divide-white/[0.04]">
                {mockResults.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors cursor-default"
                  >
                    {/* Thumbnail */}
                    <div
                      className="flex-none w-[88px] h-[52px] rounded-lg"
                      style={{ background: item.thumbnail }}
                      aria-hidden="true"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate leading-snug mb-1">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 overflow-hidden whitespace-nowrap">
                        <span className="truncate max-w-[70px]">{item.channel}</span>
                        <span className="flex-none">·</span>
                        <span className="flex-none">{item.subs}</span>
                        <span className="flex-none">·</span>
                        <span className="flex-none">{item.uploaded}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-none flex flex-col items-end gap-1.5">
                      <span className="text-sm font-semibold text-white">{item.views}</span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${item.accent}22`, color: item.accent }}
                      >
                        Score {item.viralScore}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">1,284개 영상 분석 완료</span>
                <Link
                  href="/tools/viral-search"
                  className="text-[11px] text-[#9B7FFF] hover:text-[#B8A4FF] transition-colors"
                >
                  전체 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
