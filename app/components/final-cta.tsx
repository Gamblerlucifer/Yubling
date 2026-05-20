import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-16 text-center"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,92,255,0.18) 0%, transparent 70%), #0F1117',
            border: '1px solid rgba(124,92,255,0.2)',
          }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 max-w-xl mx-auto">
            지금 떡상 패턴을 분석해보세요
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-md mx-auto">
            복잡한 제작 과정 없이
            <br />
            AI로 빠르게 유튜브를 성장시키세요
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="h-12 px-8 rounded-xl text-sm font-semibold text-white flex items-center justify-center transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7C5CFF, #FF3B5C)' }}
            >
              무료로 시작하기
            </Link>
            <Link
              href="/tools/viral-search"
              className="h-12 px-8 rounded-xl text-sm font-medium text-zinc-300 border border-white/10 flex items-center justify-center hover:bg-white/[0.04] transition-colors"
            >
              떡상 영상 먼저 보기 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
