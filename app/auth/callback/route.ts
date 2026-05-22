import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('[auth/callback] exchange error:', error.message)
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  // --- Apply referral code if one was stored before OAuth redirect ---
  const response = NextResponse.redirect(`${origin}${next}`)

  // Read the pending referral code cookie
  const pendingCode = request.headers
    .get('cookie')
    ?.split(';')
    .find((c) => c.trim().startsWith('yubling_referral='))
    ?.split('=')[1]
    ?.trim()

  if (pendingCode) {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // Call the DB function to validate + apply the code
      await supabase.rpc('apply_referral_code', {
        p_user_id: user.id,
        p_code: decodeURIComponent(pendingCode),
      })
    }

    // Clear the referral cookie
    response.cookies.set('yubling_referral', '', {
      maxAge: 0,
      path: '/',
      httpOnly: true,
    })
  }

  return response
}
