'use client'

import { useEffect, useState } from 'react'

function AnimatedNumber({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return <>{value.toLocaleString()}</>
}

const queue = [
  { id: 1, tool: 'Viral Search', keyword: '먹방 쇼츠', status: 'running', progress: 72 },
  { id: 2, tool: 'Title Maker', keyword: '제주 여행 브이로그', status: 'waiting', progress: 0 },
  { id: 3, tool: 'Script Writer', keyword: '재테크 입문', status: 'waiting', progress: 0 },
]

export default function LiveDashboard() {
  const [progress, setProgress] = useState(72)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 99 ? 72 : p + 1))
      setTick((t) => t + 1)
    }, 180)
    return () => clearInterval(id)
  }, [])

  const eta = Math.max(1, Math.round((100 - progress) * 0.18))

  return (
    <section
      id="live"
      aria-label="실시간 AI 처리 현황"
      className="py-20 md:py-28 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <div className="mb-10 max-w-xl">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B5C] animate-pulse" aria-hidden="true" />
            실시간 AI 처리 현황
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            지금도 분석 중입니다
          </h2>
          <p className="text-zinc-400 text-base">
            Yubling은 지금 이 순간에도 쉬지 않고 돌아가고 있어요.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '오늘 AI 사용량', value: 12039, unit: '회', accent: '#7C5CFF' },
            { label: '생성된 제목', value: 3912, unit: '개', accent: '#FF3B5C' },
            { label: 'Shorts 구조 생성', value: 847, unit: '건', accent: '#4DA3FF' },
            { label: '분석된 채널', value: 612, unit: '개', accent: '#7C5CFF' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.08] bg-[#131722] p-5"
            >
              <p className="text-xs text-zinc-400 mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white tabular-nums">
                <AnimatedNumber target={stat.value} />
                <span className="text-sm font-normal text-zinc-400 ml-1">{stat.unit}</span>
              </p>
              <div
                className="mt-3 h-0.5 rounded-full w-full opacity-30"
                style={{ background: stat.accent }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Queue Panel */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#131722] overflow-hidden">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-[#FF3B5C] animate-pulse"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-zinc-300">실시간 처리 Queue</span>
            </div>
            <span className="text-[11px] text-zinc-400">
              {tick % 30 < 15 ? '3명 대기 중' : '2명 대기 중'}
            </span>
          </div>

          {/* Queue rows */}
          <div className="divide-y divide-white/[0.04]">
            {queue.map((item, i) => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                {/* Status dot */}
                <div
                  className={`flex-none w-2 h-2 rounded-full ${
                    item.status === 'running'
                      ? 'bg-[#FF3B5C] animate-pulse'
                      : 'bg-white/10'
                  }`}
                  aria-hidden="true"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{item.tool}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] text-zinc-400">
                      {item.keyword}
                    </span>
                  </div>
                  {item.status === 'running' ? (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-200"
                          style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #7C5CFF, #FF3B5C)',
                          }}
                          role="progressbar"
                          aria-label="AI 처리 진행률"
                          aria-valuenow={progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <span className="text-[11px] text-zinc-400 tabular-nums flex-none">
                        {progress}%
                      </span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-zinc-400">
                      대기 중 · 예상 {eta + i * 12}초
                    </p>
                  )}
                </div>

                {/* Status badge */}
                <span
                  className={`flex-none text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    item.status === 'running'
                      ? 'bg-[#FF3B5C]/10 text-[#FF3B5C]'
                      : 'bg-white/[0.04] text-zinc-500'
                  }`}
                >
                  {item.status === 'running' ? '처리 중' : '대기'}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-white/[0.06]">
            <p className="text-[11px] text-zinc-400">
              평균 처리 시간 <span className="text-zinc-400">12초</span> · 오늘 처리 완료{' '}
              <span className="text-zinc-400">2,847건</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
