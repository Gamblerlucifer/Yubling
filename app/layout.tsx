import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yubling — 유튜브 떡상 영상 분석 AI 플랫폼',
  description:
    '유튜브 떡상 영상 찾기, 제목 생성, 쇼츠 구조 생성, 채널 분석까지. Yubling은 조회수 잘 나오는 패턴을 분석해 유튜버 제작 생산성을 높이는 AI 툴 플랫폼입니다.',
  keywords: [
    '유튜브 떡상 영상 찾기',
    '유튜브 제목 생성기',
    '유튜브 채널 분석',
    '유튜브 쇼츠 만들기',
    '유튜브 태그 추출기',
    '유튜브 대본 생성기',
    '유튜브 AI',
    '유튜브 자동화',
  ],
  metadataBase: new URL('https://yubling.com'),
  openGraph: {
    title: 'Yubling — 떡상한 이유를 복사하세요',
    description: '조회수 잘 나오는 영상엔 공식이 있습니다.',
    url: 'https://yubling.com',
    type: 'website',
    images: [{ url: '/og/main.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yubling — 유튜브 AI 제작 툴',
    description: '떡상 영상 분석부터 쇼츠 구조 생성까지.',
    images: ['/og/main.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://yubling.com' },
  verification: {
    google: 'SiEVcmW2M3B_clwewgO9L8l26LIE5KH9_If5ihHJfLU',
  },
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Yubling',
  url: 'https://yubling.com',
  logo: 'https://yubling.com/og/main.jpg',
  description: '유튜버 생산성을 높이는 AI 분석 워크스페이스',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@yubling.com',
    contactType: 'customer support',
    availableLanguage: ['Korean', 'English'],
  },
  sameAs: [],
}

const jsonLdSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Yubling',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://yubling.com',
  description:
    '유튜브 떡상 영상 찾기, 제목 생성, 쇼츠 구조 생성, 채널 분석까지. AI로 유튜버 제작 생산성을 높이는 플랫폼.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
      description: 'Viral Search 하루 5회, Title Maker 하루 3회, Tag Extractor 무제한',
    },
    {
      '@type': 'Offer',
      name: 'Starter',
      price: '5',
      priceCurrency: 'USD',
      description: '모든 AI 툴 무제한, Script Writer, Shorts Maker, Upload Settings',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '15',
      priceCurrency: 'USD',
      description: 'Starter 전체 포함, Channel Copy 분석, API 연동, Bulk 생성',
    },
  ],
}

const jsonLdFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '유튜브 API 없이 사용 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. Yubling은 유튜브 공개 데이터를 기반으로 동작하기 때문에 별도 API 키나 채널 연동 없이 바로 사용할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '무료 플랜 제한은 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Free 플랜은 Viral Search 하루 5회, Title Maker 하루 3회, Tag Extractor 무제한이 포함됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'Shorts 제작도 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. Shorts Maker 툴에서 키워드만 입력하면 컷 구성·자막·후킹 구조를 자동 생성합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '한국어 지원되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yubling은 한국어 유튜브 시장에 최적화되어 있습니다. 제목 생성, 대본 생성, 태그 추출 모두 한국어로 결과를 제공합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '채널 분석 기능은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Channel Copy 툴은 경쟁 채널 URL을 입력하면 제목 패턴, 태그 전략, 업로드 최적 시간대를 분석해줍니다.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
      </head>
      <body className="bg-[#06070A] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
