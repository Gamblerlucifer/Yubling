import Link from 'next/link'

type Tool = {
  icon: string
  name: string
  desc: string
  example: string
  href: string
  accent: string
}

const tools: Tool[] = [
  {
    icon: '🔥',
    name: 'Viral Search',
    desc: '조회수 대비 비정상적으로 터진 영상 탐지',
    example: '"먹방" → 구독자 2K로 4.2M뷰 영상 발견',
    href: '/tools/viral-search',
    accent: '#FF3B5C',
  },
  {
    icon: '🏷️',
    name: 'Tag Extractor',
    desc: 'URL만 입력하면 숨겨진 태그 즉시 추출',
    example: 'youtube.com/watch?v=xxx → 태그 23개 복사',
    href: '/tools/tag-extractor',
    accent: '#9B7FFF',
  },
  {
    icon: '📝',
    name: 'Script Writer',
    desc: '쇼츠·롱폼 대본 AI 자동 생성',
    example: '"제주여행" → 60초 쇼츠 대본 완성',
    href: '/tools/script-writer',
    accent: '#4DA3FF',
  },
  {
    icon: '✍️',
    name: 'Title Maker',
    desc: 'CTR 최적화된 제목 AI 생성',
    example: '클릭률 높은 제목 5개 즉시 생성',
    href: '/tools/title-maker',
    accent: '#FF3B5C',
  },
  {
    icon: '🎭',
    name: 'Persona',
    desc: '채널 컨셉·말투·브랜딩 방향 생성',
    example: '"30대 직장인 재테크" → 페르소나 완성',
    href: '/tools/persona',
    accent: '#9B7FFF',
  },
  {
    icon: '🖼️',
    name: 'Image Prompt',
    desc: 'Midjourney·FLUX용 썸네일 프롬프트 생성',
    example: '영상 제목 → 썸네일 프롬프트 3종',
    href: '/tools/image-prompt',
    accent: '#4DA3FF',
  },
  {
    icon: '⚙️',
    name: 'Upload Settings',
    desc: '설명란·태그·해시태그 자동 생성',
    example: '제목 입력 → 업로드 설정 전체 복붙',
    href: '/tools/upload-settings',
    accent: '#FF3B5C',
  },
  {
    icon: '📊',
    name: 'Channel Copy',
    desc: '경쟁 채널 패턴·제목·업로드 분석',
    example: '채널 URL → 제목 패턴·최적 업로드 시간',
    href: '/tools/channel-copy',
    accent: '#9B7FFF',
  },
  {
    icon: '⚡',
    name: 'Shorts Maker',
    desc: '컷 구성·자막·후킹 구조 자동 생성',
    example: '키워드 → 쇼츠 7컷 구조 완성',
    href: '/tools/shorts-maker',
    accent: '#4DA3FF',
  },
]

export default function ToolGrid() {
  return (
    <section id="tools" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <div className="mb-12 max-w-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            유튜버를 위한 AI 툴 생태계
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            분석부터 업로드까지
            <br />
            필요한 기능만 빠르게 사용하세요
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-3xl border border-white/[0.08] bg-[#131722] p-6 hover:border-white/[0.16] hover:bg-[#161c2a] transition-all duration-200"
            >
              {/* Icon */}
              <div className="text-2xl mb-4" aria-hidden="true">
                {tool.icon}
              </div>

              {/* Name */}
              <h3 className="text-white font-semibold text-base mb-1.5">{tool.name}</h3>

              {/* Desc */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{tool.desc}</p>

              {/* Example result */}
              <div
                className="rounded-xl px-3 py-2.5 mb-4"
                style={{ background: `${tool.accent}10`, border: `1px solid ${tool.accent}22` }}
              >
                <p className="text-xs leading-relaxed" style={{ color: tool.accent }}>
                  {tool.example}
                </p>
              </div>

              {/* CTA */}
              <div
                className="text-xs font-medium flex items-center gap-1 transition-all duration-150 group-hover:gap-2"
                style={{ color: tool.accent }}
              >
                바로 사용하기
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
