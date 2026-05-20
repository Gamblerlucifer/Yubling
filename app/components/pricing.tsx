import Link from 'next/link'

type Plan = {
  name: string
  price: string
  period: string
  desc: string
  features: string[]
  cta: string
  featured: boolean
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: '/ 월',
    desc: '시작은 무료로',
    features: [
      'Viral Search 5회/일',
      'Tag Extractor 10회/일',
      'Title Maker 3회/일',
      'Script Writer 3회/일',
      'BYOK 지원 (베타)',
    ],
    cta: '무료로 시작',
    featured: false,
  },
  {
    name: 'Starter',
    price: '$10',
    period: '/ 월',
    desc: '하루 커피 한 잔으로',
    features: [
      'Viral Search 무제한',
      'Tag Extractor 무제한',
      'AI 툴 30회/일',
      'Channel Copy (채널 3개)',
      'Shorts Maker',
      'BYOK 지원',
    ],
    cta: '즉시 시작하기',
    featured: true,
  },
  {
    name: 'Pro',
    price: '$30',
    period: '/ 월',
    desc: '본격 유튜버를 위해',
    features: [
      'Starter 전체 포함',
      'AI 툴 100회/일',
      'Channel Copy (채널 20개)',
      'Persona 저장 5개',
      '전용 지원',
      '최신 기능 Early Access',
    ],
    cta: '즉시 시작하기',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-12 text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            하루 커피 한 잔으로 유튜버가 되볼래?
          </h2>
          <p className="text-zinc-400 text-base">복잡한 계약 없이. 언제든 취소 가능.</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-5 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex-1 rounded-3xl border p-6 flex flex-col transition-shadow duration-200 ${
                plan.featured
                  ? 'border-[#9B7FFF]/60 bg-[#131722] shadow-lg shadow-[#9B7FFF]/10'
                  : 'border-white/[0.08] bg-[#131722]'
              }`}
            >
              <div className="mb-5">
                <p className="text-zinc-400 text-sm mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-zinc-400 text-xs mt-1">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <svg
                      className="w-4 h-4 flex-none mt-0.5"
                      style={{ color: plan.featured ? '#9B7FFF' : '#A1A7B3' }}
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
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center transition-opacity hover:opacity-90 ${
                  plan.featured
                    ? 'text-white'
                    : 'bg-white/[0.06] text-white border border-white/10 hover:bg-white/10'
                }`}
                style={
                  plan.featured
                    ? { background: 'linear-gradient(135deg, #9B7FFF, #FF3B5C)' }
                    : {}
                }
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
