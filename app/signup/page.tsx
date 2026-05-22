'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { signInWithOAuth } from '@/app/actions/auth'

// Note: metadata export doesn't work in 'use client' files
// Move to a parent layout if needed

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export default function SignupPage() {
  const [referralCode, setReferralCode] = useState('')
  const [codeStatus, setCodeStatus] = useState<'idle' | 'valid' | 'invalid'>('idle')
  const [isPending, startTransition] = useTransition()

  async function handleValidateCode() {
    const code = referralCode.trim()
    if (!code) return
    // Client-side optimistic — real validation happens server-side on callback
    // Just check non-empty and looks like a code
    if (code.length >= 6) {
      setCodeStatus('valid')
    } else {
      setCodeStatus('invalid')
    }
  }

  function handleGoogleSignup() {
    startTransition(async () => {
      await signInWithOAuth('google', referralCode.trim() || undefined)
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[#06070A]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-black text-white tracking-tight">
              yub<span className="text-[#7C5CFF]">ling</span>
            </span>
          </Link>
          <p className="mt-2 text-zinc-500 text-sm">유튜브 AI 제작 툴 베타 가입</p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 space-y-6">
          {/* Referral code section */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
              베타 추천 코드
            </label>
            <div className="relative">
              <input
                type="text"
                value={referralCode}
                onChange={(e) => {
                  setReferralCode(e.target.value)
                  setCodeStatus('idle')
                }}
                onBlur={handleValidateCode}
                placeholder="YUBLING-EP01"
                className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#7C5CFF]/60 ${
                  codeStatus === 'valid'
                    ? 'border-emerald-500/60'
                    : codeStatus === 'invalid'
                    ? 'border-rose-500/40'
                    : 'border-white/10'
                }`}
              />
              {codeStatus === 'valid' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs font-medium">
                  ✓ 확인됨
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-600">
              매주 목요일 영상에 베타 코드가 공개됩니다.{' '}
              <Link href="https://youtube.com/@yubling" target="_blank" className="text-[#7C5CFF] hover:text-[#9B7FFF]">
                유블링 유튜브 →
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[11px] text-zinc-600">소셜 계정으로 가입</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Google signup */}
          <button
            onClick={handleGoogleSignup}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-3 bg-white text-[#0F1117] font-semibold text-sm rounded-xl px-4 py-3 hover:bg-zinc-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            {isPending ? '연결 중...' : 'Google로 시작하기'}
          </button>

          {/* Kakao (coming soon) */}
          <button
            disabled
            className="w-full flex items-center justify-center gap-3 bg-[#FEE500]/20 text-[#FEE500]/40 font-semibold text-sm rounded-xl px-4 py-3 cursor-not-allowed"
          >
            <span className="text-base">K</span>
            카카오 (준비 중)
          </button>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-[#7C5CFF] hover:text-[#9B7FFF]">
            로그인
          </Link>
        </p>

        <p className="text-center text-[11px] text-zinc-700 mt-4 leading-relaxed">
          가입하면{' '}
          <Link href="/terms" className="underline">이용약관</Link>과{' '}
          <Link href="/privacy" className="underline">개인정보 처리방침</Link>에 동의하게 됩니다.
        </p>
      </div>
    </main>
  )
}
