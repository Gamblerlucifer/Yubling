import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms — Yubling' }

export default function TermsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-zinc-500 text-sm mb-2">준비 중</p>
        <h1 className="text-2xl font-bold text-white mb-4">곧 오픈됩니다</h1>
        <Link href="/" className="text-sm text-[#7C5CFF] hover:text-[#9B7FFF] transition-colors">← 홈으로</Link>
      </div>
    </main>
  )
}
