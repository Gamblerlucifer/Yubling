-- ============================================================
-- Yubling - Initial Schema
-- ============================================================

-- --------------------------------------------------------
-- referral_codes: EP-specific codes for beta access gating
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.referral_codes (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  code         TEXT        UNIQUE NOT NULL,
  episode      TEXT,                         -- e.g. 'EP.01'
  description  TEXT,
  max_uses     INTEGER     DEFAULT NULL,     -- NULL = unlimited
  used_count   INTEGER     DEFAULT 0,
  is_active    BOOLEAN     DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- --------------------------------------------------------
-- profiles: extends auth.users
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id                 UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email              TEXT,
  full_name          TEXT,
  avatar_url         TEXT,
  referral_code_used TEXT        REFERENCES public.referral_codes(code),
  beta_access        BOOLEAN     DEFAULT false,
  plan               TEXT        DEFAULT 'free',  -- 'free' | 'starter' | 'pro'
  created_at         TIMESTAMPTZ DEFAULT now(),
  updated_at         TIMESTAMPTZ DEFAULT now()
);

-- --------------------------------------------------------
-- RLS: Row Level Security
-- --------------------------------------------------------
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own row
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Referral codes: anyone authenticated can read active codes (for validation)
CREATE POLICY "referral_codes_select_active" ON public.referral_codes
  FOR SELECT USING (is_active = true);

-- --------------------------------------------------------
-- Trigger: auto-create profile on new user
-- --------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- --------------------------------------------------------
-- Helper: apply referral code + increment counter
-- Called from the auth callback server action
-- --------------------------------------------------------
CREATE OR REPLACE FUNCTION public.apply_referral_code(
  p_user_id UUID,
  p_code    TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_valid BOOLEAN;
BEGIN
  -- Check if code exists, is active, and has remaining uses
  SELECT (
    is_active = true AND
    (max_uses IS NULL OR used_count < max_uses)
  )
  INTO v_valid
  FROM public.referral_codes
  WHERE code = p_code;

  IF v_valid IS NOT TRUE THEN
    RETURN false;
  END IF;

  -- Update profile: set beta_access and record the code
  UPDATE public.profiles
  SET
    beta_access        = true,
    referral_code_used = p_code,
    updated_at         = now()
  WHERE id = p_user_id
    AND referral_code_used IS NULL;   -- only apply once

  -- Increment usage counter
  UPDATE public.referral_codes
  SET used_count = used_count + 1
  WHERE code = p_code;

  RETURN true;
END;
$$;

-- --------------------------------------------------------
-- Seed: initial EP.01 beta codes
-- (change / add more before each episode goes live)
-- --------------------------------------------------------
INSERT INTO public.referral_codes (code, episode, description, max_uses) VALUES
  ('YUBLING-EP01', 'EP.01', 'EP.01 영상 베타 코드',  500),
  ('YB-BETA-2025', 'EP.01', '런칭 이벤트 코드',       100)
ON CONFLICT (code) DO NOTHING;
