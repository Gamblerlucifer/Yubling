import Link from 'next/link'

const toolLinks = [
  { label: 'Viral Search', href: '/tools/viral-search' },
  { label: 'Tag Extractor', href: '/tools/tag-extractor' },
  { label: 'Script Writer', href: '/tools/script-writer' },
  { label: 'Title Maker', href: '/tools/title-maker' },
  { label: 'Shorts Maker', href: '/tools/shorts-maker' },
  { label: 'Channel Copy', href: '/tools/channel-copy' },
]

const companyLinks = [
  { label: 'Pricing', href: '#pricing' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Build in Public', href: '#build-in-public' },
  { label: 'Blog', href: '/blog' },
]

const legalLinks = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Contact', href: 'mailto:hello@yubling.com' },
]

export default function Footer() {
  return (
    <footer
      className="border-t border-white/[0.06] pt-14 pb-8"
      aria-label="사이트 하단"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 w-fit"
              aria-label="Yubling 홈"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF3B5C] to-[#7C5CFF] flex items-center justify-center text-white text-xs font-bold tracking-tight">
                Y
              </div>
              <span className="text-white font-semibold text-sm tracking-tight">Yubling</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[200px]">
              유튜버 생산성을 높이는
              <br />
              AI 분석 워크스페이스
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
              Tools
            </p>
            <ul className="space-y-2.5">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
              Legal
            </p>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-white/[0.06]">
          <p className="text-xs text-zinc-400">© 2026 Yubling. All rights reserved.</p>
          <p className="text-xs text-zinc-400">
            Made with ♥ for Korean YouTubers
          </p>
        </div>
      </div>
    </footer>
  )
}
