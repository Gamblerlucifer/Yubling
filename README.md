# Yubling — 유튜브 떡상 영상 분석 AI 플랫폼

> 떡상한 이유를 복사하세요

## 프로젝트 구조

```
app/
├── layout.tsx          # 루트 레이아웃 (Pretendard, JSON-LD, 메타데이터)
├── page.tsx            # 홈페이지 진입점
├── globals.css         # Tailwind + 전역 스타일
└── components/
    ├── header.tsx      # 스티키 헤더, 네비게이션
    ├── hero.tsx        # 히어로 섹션, Viral Search 목업
    ├── social-proof.tsx # 마퀴 통계 바
    ├── tool-grid.tsx   # 9개 AI 툴 카드 그리드
    ├── workflow.tsx    # 6단계 제작 워크플로우
    ├── live-dashboard.tsx # 실시간 AI 처리 현황
    ├── pricing.tsx     # Free / Starter / Pro 플랜
    ├── build-in-public.tsx # EP01~05 빌드인퍼블릭 타임라인
    ├── faq.tsx         # 아코디언 FAQ
    ├── final-cta.tsx   # 전환 유도 섹션
    └── footer.tsx      # 사이트 하단
```

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v3
- **Font**: Pretendard Variable (본문), JetBrains Mono (코드)
- **Language**: TypeScript

## SEO

- `layout.tsx`에 Organization / SoftwareApplication / FAQPage JSON-LD 삽입
- Open Graph + Twitter Card 완성
- Canonical URL 설정
- robots: index, follow

## 배포

```bash
npm run build
npm run start
```

Vercel 배포 권장 — `vercel` 명령어로 즉시 배포 가능
