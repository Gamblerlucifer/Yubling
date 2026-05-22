import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// YouTube video ID regex patterns
const YT_URL_RE =
  /(?:youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/

function extractVideoId(input: string): string | null {
  // Direct 11-char ID
  if (/^[A-Za-z0-9_-]{11}$/.test(input.trim())) return input.trim()
  const match = input.match(YT_URL_RE)
  return match?.[1] ?? null
}

export async function POST(request: Request) {
  // 1. Auth check
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  // 2. Beta access check
  const { data: profile } = await supabase
    .from('profiles')
    .select('beta_access')
    .eq('id', user.id)
    .single()

  if (!profile?.beta_access) {
    return NextResponse.json(
      { error: '베타 접근 코드가 필요합니다. 가입 시 추천 코드를 입력해 주세요.' },
      { status: 403 }
    )
  }

  // 3. Parse input
  const body = await request.json().catch(() => ({}))
  const { input } = body as { input?: string }

  if (!input?.trim()) {
    return NextResponse.json({ error: '유튜브 URL 또는 영상 ID를 입력해 주세요.' }, { status: 400 })
  }

  const videoId = extractVideoId(input)
  if (!videoId) {
    return NextResponse.json({ error: '올바른 유튜브 URL 또는 영상 ID가 아닙니다.' }, { status: 400 })
  }

  // 4. YouTube Data API v3 — videos.list (1 unit)
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'YouTube API 키가 설정되지 않았습니다.' }, { status: 500 })
  }

  const ytUrl =
    `https://www.googleapis.com/youtube/v3/videos` +
    `?part=snippet&id=${videoId}&key=${apiKey}`

  const ytRes = await fetch(ytUrl, { next: { revalidate: 300 } }) // cache 5min

  if (!ytRes.ok) {
    return NextResponse.json({ error: 'YouTube API 오류가 발생했습니다.' }, { status: 502 })
  }

  const ytData = await ytRes.json()
  const item = ytData.items?.[0]

  if (!item) {
    return NextResponse.json({ error: '영상을 찾을 수 없습니다. ID를 다시 확인해 주세요.' }, { status: 404 })
  }

  const snippet = item.snippet
  const tags: string[] = snippet?.tags ?? []
  const title: string = snippet?.title ?? ''
  const channelTitle: string = snippet?.channelTitle ?? ''
  const thumbnailUrl: string =
    snippet?.thumbnails?.maxres?.url ??
    snippet?.thumbnails?.high?.url ??
    snippet?.thumbnails?.default?.url ??
    ''

  return NextResponse.json({
    videoId,
    title,
    channelTitle,
    thumbnailUrl,
    tags,
    tagCount: tags.length,
  })
}
