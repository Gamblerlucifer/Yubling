'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type Provider = 'google' | 'kakao'

export async function signInWithOAuth(
  provider: Provider,
  referralCode?: string
) {
  const supabase = await createClient()

  // Store referral code in a short-lived cookie before OAuth redirect
  if (referralCode?.trim()) {
    const cookieStore = await cookies()
    cookieStore.set('yubling_referral', referralCode.trim(), {
      httpOnly: true,
      maxAge: 60 * 10, // 10 minutes — enough to complete OAuth
      path: '/',
      sameSite: 'lax',
    })
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
