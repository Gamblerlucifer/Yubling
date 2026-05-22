import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '대시보드 — Yubling' }

const TOOLS = [
  {
    id: 'tag-extractor',
    name: 'Tag Extractor',
    desc: '유튜브 영상 태그를 1초 만에 추출',
    badge: 'BETA',
    available: true,
    href: '/tools/tag-extractor',
  },
  {
    id: 'title-maker',
    name: 'Title Maker',
    desc: 'AI가 조회수 올리는 제목 5개 생성',
    badge: '곧 오픈',
    available: false,
    href: '/tools/title-maker',
  },
  {
    id: 'image-prompt',
    name: 'Image Prompt',
    desc: '썸네일 아이디어를 AI 이미지 프롬프트로',
    badge: '곧 오픈',
    available: false,
    href: '/tools/image-prompt',
  },
  {
    id: 'upload-settings',
    name: 'Upload Settings',
    desc: '최적 업로드 시간·설명·카테고리 추천',
    badge: '곧 오픈',
    available: false,
    href: '/tools/upload-settings',
  },
  {
    id: 'viral-search',
    name: 'Viral Search',
    desc: '지금 뜨는 바이럴 영상 패턴 탐지',
    badge: '곧 오픈',
    available: false,
    href: '/tools/viral-search',
  },
]

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, beta_access, plan, referral_code_used')
    .eq('id', user.id)
    .single()

  const displayName = profile?.full_name ?? user.email?.split('@')[0] ?? '유저'
  const hasBetaAccess = profile?.beta_access ?? false

  return (
    <div className="min-h-screen bg-[#06070A]">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-white tracking-tight">
            yub<span className="text-[#7C5CFF]">ling</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">{displayName}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Beta access banner */}
        {!hasBetaAccess && (
          <div className="mb-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] flex items-start gap-3">
            <span className="text-amber-400 text-lg mt-0.5">🔒</span>
            <div>
              <p className="text-sm font-medium text-amber-300">베타 접근 코드가 필요합니다</p>
              <p className="text-xs text-amber-400/70 mt-0.5">
                매주 목요일 유튜브 영상에 코드가 공개됩니다.{' '}
                <Link href="/signup" className="underline hover:text-amber-300">
                  코드 입력하기 →
                </Link>
              </p>
            </div>
          </div>
        )}

        {hasBetaAccess && (
          <div className="mb-8 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] flex items-start gap-3">
            <span className="text-emerald-400 text-lg mt-0.5">✓</span>
            <div>
              <p className="text-sm font-medium text-emerald-300">베타 테스터입니다 🎉</p>
              <p className="text-xs text-emerald-400/70 mt-0.5">
                코드: {profile?.referral_code_used} · 플랜: {profile?.plan?.toUpperCase()}
              </p>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold text-white mb-2">안녕하세요, {displayName} 님</h1>
        <p className="text-zinc-500 text-sm mb-10">사용 가능한 툴 목록입니다.</p>

        {/* Tool grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => {
            const isLocked = !hasBetaAccess || !tool.available

            return (
              <div
                key={tool.id}
                className={`group relative rounded-2xl border p-6 transition-all ${
                  isLocked
                    ? 'border-white/[0.06] bg-white/[0.02] opacity-50 cursor-not-allowed'
                    : 'border-white/[0.08] bg-white/[0.03] hover:border-[#7C5CFF]/40 hover:bg-white/[0.05] cursor-pointer'
                }`}
              >
                {/* Badge */}
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 ${
                    tool.available && hasBetaAccess
                      ? 'bg-[#7C5CFF]/20 text-[#9B7FFF]'
                      : 'bg-white/[0.06] text-zinc-500'
                  }`}
                >
                  {tool.badge}
                </span>

                <h3 className="text-sm font-semibold text-white mb-1">{tool.name}</h3>
                <p className="text-xs text-zinc-500">{tool.desc}</p>

                {!isLocked && (
                  <Link
                    href={tool.href}
                    className="absolute inset-0 rounded-2xl"
                    aria-label={tool.name}
                  />
                )}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
