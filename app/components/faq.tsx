'use client'

import { useState } from 'react'

const faqs = [
  {
    q: '유튜브 API 없이 사용 가능한가요?',
    a: '네. Yubling은 유튜브 공개 데이터를 기반으로 동작하기 때문에 별도 API 키나 채널 연동 없이 바로 사용할 수 있습니다.',
  },
  {
    q: '무료 플랜 제한은 어떻게 되나요?',
    a: 'Free 플랜은 Viral Search 하루 5회, Title Maker 하루 3회, Tag Extractor 무제한이 포함됩니다. 용도에 따라 Starter 플랜으로 업그레이드하시면 모든 기능을 무제한으로 사용할 수 있습니다.',
  },
  {
    q: 'Shorts 제작도 가능한가요?',
    a: '네. Shorts Maker 툴에서 키워드만 입력하면 컷 구성·자막·후킹 구조를 자동 생성합니다. Script Writer와 함께 사용하면 대본까지 한 번에 완성할 수 있습니다.',
  },
  {
    q: '한국어 지원되나요?',
    a: 'Yubling은 한국어 유튜브 시장에 최적화되어 있습니다. 제목 생성, 대본 생성, 태그 추출 모두 한국어로 결과를 제공합니다.',
  },
  {
    q: '채널 분석 기능은 무엇인가요?',
    a: 'Channel Copy 툴은 경쟁 채널 URL을 입력하면 제목 패턴, 태그 전략, 업로드 최적 시간대를 분석해줍니다. 성장하는 채널의 공식을 빠르게 파악할 수 있습니다.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 md:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 text-center">
            자주 묻는 질문
          </h2>
          <p className="text-zinc-400 text-base text-center mb-12">
            궁금한 점이 있으시면 언제든 문의해주세요.
          </p>

          <dl className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-[#131722] overflow-hidden"
              >
                <dt>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    aria-expanded={open === i}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className="text-sm font-medium text-white">{faq.q}</span>
                    <svg
                      className={`flex-none w-4 h-4 text-zinc-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </dt>
                <dd
                  className={`overflow-hidden transition-all duration-200 ${open === i ? 'max-h-96' : 'max-h-0'}`}
                >
                  <p className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
