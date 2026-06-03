'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { applyReferralCode } from '@/app/actions/referral'

export default function ReferralForm() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return

    setError('')
    startTransition(async () => {
      const result = await applyReferralCode(code.trim())
      if (result?.error) {
        setError(result.error)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => { setCode(e.target.value.toUpperCase()); setError('') }}
        placeholder="YUBLING-EP01"
        className="flex-1 bg-black/30 border border-amber-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder-amber-900 outline-none focus:border-amber-500/50"
      />
      <button
        type="submit"
        disabled={isPending || !code.trim()}
        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isPending ? '확인 중...' : '코드 입력'}
      </button>
      {error && <p className="absolute mt-12 text-xs text-rose-400">{error}</p>}
    </form>
  )
}
