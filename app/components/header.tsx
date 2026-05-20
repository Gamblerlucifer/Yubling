'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Tools', href: '#tools' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Build in Public', href: '#build-in-public' },
  { label: 'Blog', href: '/blog' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled ? 'border-b border-white/[0.06]' : 'border-b border-transparent'
      }`}
      style={{ background: 'rgba(6,7,10,0.72)', backdropFilter: 'blur(20px)' }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Yubling 홈">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF3B5C] to-[#7C5CFF] flex items-center justify-center text-white text-xs font-bold tracking-tight">
            Y
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">Yubling</span>
        </Link>

        {/* Nav */}
        <nav aria-label="주요 메뉴">
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-zinc-400 hover:text-white text-sm transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:block text-zinc-400 hover:text-white text-sm transition-colors duration-150"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="h-10 px-4 rounded-xl bg-white text-[#06070A] text-sm font-medium hover:bg-white/90 transition-colors duration-150 flex items-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
