import { NextRequest, NextResponse } from 'next/server'

const YT_API = 'https://www.googleapis.com/youtube/v3'
const API_KEY = process.env.YOUTUBE_API_KEY

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('q')

  if (!keyword) {
    return NextResponse.json({ error: '키워드를 입력하세요' }, { status: 400 })
  }

  if (!API_KEY) {
    return NextResponse.json({ error: 'API 키 없음' }, { status: 500 })
  }

  try {
    // 1. 키워드로 영상 검색 (관련성 순 → Viral Score로 재정렬)
    const searchRes = await fetch(
      `${YT_API}/search?part=snippet&q=${encodeURIComponent(keyword)}&type=video&order=relevance&maxResults=20&regionCode=KR&relevanceLanguage=ko&key=${API_KEY}`
    )
    const searchData = await searchRes.json()

    if (!searchData.items?.length) {
      return NextResponse.json({ results: [] })
    }

    const videoIds = searchData.items.map((i: any) => i.id.videoId).join(',')

    // 2. 영상 통계 + 채널 ID 가져오기
    const statsRes = await fetch(
      `${YT_API}/videos?part=statistics,snippet,contentDetails&id=${videoIds}&key=${API_KEY}`
    )
    const statsData = await statsRes.json()

    const channelIds = [...new Set(statsData.items.map((i: any) => i.snippet.channelId))].join(',')

    // 3. 채널 구독자 수 가져오기
    const channelRes = await fetch(
      `${YT_API}/channels?part=statistics&id=${channelIds}&key=${API_KEY}`
    )
    const channelData = await channelRes.json()

    const channelMap: Record<string, number> = {}
    for (const ch of channelData.items ?? []) {
      channelMap[ch.id] = parseInt(ch.statistics.subscriberCount ?? '0')
    }

    // 4. Viral Score 계산 & 정렬
    const results = statsData.items
      .map((video: any) => {
        const views = parseInt(video.statistics.viewCount ?? '0')
        const subs = channelMap[video.snippet.channelId] ?? 1
        const likes = parseInt(video.statistics.likeCount ?? '0')
        const comments = parseInt(video.statistics.commentCount ?? '0')

        // 떡상 점수: 구독자 대비 조회수 비율 + 반응률
        const viewRatio = views / Math.max(subs, 1)
        const engageRate = (likes + comments * 3) / Math.max(views, 1)
        const viralScore = Math.min(99, Math.round(
          (Math.log10(Math.max(viewRatio, 1)) * 20) +
          (engageRate * 1000) +
          (views > 1_000_000 ? 20 : views > 100_000 ? 10 : 0)
        ))

        // 업로드 몇 일 전
        const uploadedAt = new Date(video.snippet.publishedAt)
        const diffDays = Math.floor((Date.now() - uploadedAt.getTime()) / 86400000)
        const uploaded = diffDays === 0 ? '오늘' : `${diffDays}일 전`

        return {
          videoId: video.id,
          title: video.snippet.title,
          channel: video.snippet.channelTitle,
          thumbnail: video.snippet.thumbnails?.medium?.url ?? '',
          views: views >= 1_000_000
            ? `${(views / 1_000_000).toFixed(1)}M`
            : views >= 1_000
            ? `${(views / 1000).toFixed(1)}K`
            : String(views),
          subs: subs >= 1_000_000
            ? `${(subs / 1_000_000).toFixed(1)}M`
            : subs >= 1_000
            ? `${(subs / 1000).toFixed(1)}K`
            : String(subs),
          viralScore,
          uploaded,
          url: `https://youtube.com/watch?v=${video.id}`,
        }
      })
      .sort((a: any, b: any) => b.viralScore - a.viralScore)
      .slice(0, 10)

    return NextResponse.json({ results, keyword })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: '검색 실패' }, { status: 500 })
  }
}
