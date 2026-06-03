'use server'

import { createClient } from '@/lib/supabase/server'

export async function applyReferralCode(code: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const { data, error } = await supabase.rpc('apply_referral_code', {
    p_user_id: user.id,
    p_code: code,
  })

  if (error) return { error: '오류가 발생했습니다.' }
  if (!data) return { error: '유효하지 않은 코드입니다. 다시 확인해 주세요.' }

  return { success: true }
}
