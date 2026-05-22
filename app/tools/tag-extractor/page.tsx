'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

interface TagResult {
  videoId: string
  title: string
  channelTitle: string
  thumbnailUrl: string
  tags: string[]
  tagCount: number
}

export default function TagExtractorPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<TagResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleExtract() {
    const val = input.trim()
    if (!val) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/tools/tag-extractor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: val }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? '오류가 발생했습니다.')
      } else {
        setResult(data)
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopyAll() {
    if (!result?.tags.length) return
    await navigator.clipboard.writeText(result.tags.join(', '))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleExtract()
  }

  return (
    <div className="min-h-screen bg-[#06070A]">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            ← 대시보드
          </Link>
          <Link href="/" className="text-xl font-black text-white tracking-tight">
            yub<span className="text-[#7C5CFF]">ling</span>
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20">
            <span className="text-[10px] font-bold text-[#9B7FFF] uppercase tracking-wider">BETA</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Tag Extractor</h1>
          <p className="text-zinc-500 text-sm">
            유튜브 URL 또는 영상 ID를 입력하면 숨겨진 태그를 1초 만에 추출합니다.
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-3 mb-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://youtube.com/watch?v=... 또는 영상 ID"
            className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#7C5CFF]/50 transition-colors"
            disabled={loading}
          />
          <button
            onClick={handleExtract}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-[#7C5CFF] hover:bg-[#6B4FE0] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                추출 중
              </span>
            ) : (
              '태그 추출'
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-rose-500/20 bg-rose-500/[0.06]">
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6 mt-8">
            {/* Video info */}
            <div className="flex gap-4 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              {result.thumbnailUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.thumbnailUrl}
                  alt={result.title}
                  className="w-32 h-[72px] object-cover rounded-lg flex-none"
                />
              )}
              <div className="min-w-0">
                <p className="text-[11px] text-zinc-500 mb-1">{result.channelTitle}</p>
                <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
                  {result.title}
                </p>
                <p className="text-[11px] text-zinc-600 mt-1">태그 {result.tagCount}개</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-white">추출된 태그</h2>
                {result.tags.length > 0 && (
                  <button
                    onClick={handleCopyAll}
                    className="text-xs text-[#7C5CFF] hover:text-[#9B7FFF] transition-colors"
                  >
                    {copied ? '✓ 복사됨' : '전체 복사'}
                  </button>
                )}
              </div>

              {result.tags.length === 0 ? (
                <div className="p-6 rounded-xl border border-white/[0.06] text-center">
                  <p className="text-zinc-500 text-sm">이 영상에는 공개된 태그가 없습니다.</p>
                  <p className="text-zinc-600 text-xs mt-1">크리에이터가 태그를 비공개로 설정했을 수 있습니다.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => navigator.clipboard.writeText(tag)}
                      title="클릭하여 복사"
                      className="px-3 py-1.5 text-xs text-zinc-300 bg-white/[0.06] hover:bg-[#7C5CFF]/20 hover:text-[#9B7FFF] border border-white/[0.08] hover:border-[#7C5CFF]/30 rounded-full transition-all cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Copy as text */}
            {result.tags.length > 0 && (
              <div>
                <h3 className="text-xs text-zinc-600 mb-2">텍스트로 복사 (업로드 설정용)</h3>
                <div className="relative">
                  <textarea
                    readOnly
                    value={result.tags.join(', ')}
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-xs text-zinc-400 resize-none outline-none font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* How it works */}
        {!result && !error && !loading && (
          <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">사용 방법</h3>
            <ol className="space-y-2 text-sm text-zinc-500">
              <li className="flex gap-3">
                <span className="text-[#7C5CFF] font-bold">01</span>
                분석할 유튜브 영상의 URL을 붙여넣기
              </li>
              <li className="flex gap-3">
                <span className="text-[#7C5CFF] font-bold">02</span>
                "태그 추출" 버튼 클릭
              </li>
              <li className="flex gap-3">
                <span className="text-[#7C5CFF] font-bold">03</span>
                태그를 클릭하면 개별 복사, "전체 복사"로 한 번에 복사
              </li>
            </ol>
          </div>
        )}
      </main>
    </div>
  )
}
