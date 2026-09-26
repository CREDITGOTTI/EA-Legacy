CREATE TABLE public.visitor_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL CHECK (char_length(first_name) BETWEEN 1 AND 80),
  last_name TEXT NOT NULL CHECK (char_length(last_name) BETWEEN 1 AND 80),
  phone_e164 TEXT NOT NULL CHECK (phone_e164 ~ '^\+[1-9][0-9]{7,14}$'),
  consent_contact BOOLEAN NOT NULL CHECK (consent_contact = true),
  age_or_guardian_confirmed BOOLEAN NOT NULL CHECK (age_or_guardian_confirmed = true),
  utm_source TEXT CHECK (utm_source IS NULL OR char_length(utm_source) <= 120),
  utm_medium TEXT CHECK (utm_medium IS NULL OR char_length(utm_medium) <= 120),
  utm_campaign TEXT CHECK (utm_campaign IS NULL OR char_length(utm_campaign) <= 160),
  referrer TEXT CHECK (referrer IS NULL OR char_length(referrer) <= 500),
  landing_page TEXT CHECK (landing_page IS NULL OR char_length(landing_page) <= 500),
  user_agent TEXT CHECK (user_agent IS NULL OR char_length(user_agent) <= 500),
  source TEXT NOT NULL DEFAULT 'locker_entry' CHECK (source = 'locker_entry'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.visitor_access TO service_role;
ALTER TABLE public.visitor_access ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.legacy_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_access_id UUID REFERENCES public.visitor_access(id) ON DELETE SET NULL,
  legacy_name TEXT NOT NULL CHECK (char_length(legacy_name) BETWEEN 1 AND 100),
  sport TEXT NOT NULL CHECK (char_length(sport) BETWEEN 1 AND 80),
  career_stage TEXT NOT NULL CHECK (career_stage IN ('Youth Athlete', 'College Athlete', 'Professional Athlete', 'Former Athlete')),
  position_role TEXT CHECK (position_role IS NULL OR char_length(position_role) <= 100),
  purpose_statement TEXT NOT NULL CHECK (char_length(purpose_statement) BETWEEN 1 AND 500),
  legacy_audience TEXT NOT NULL CHECK (char_length(legacy_audience) BETWEEN 1 AND 300),
  primary_investment_path TEXT NOT NULL CHECK (primary_investment_path IN ('Stocks and Market Investing', 'Real Estate Ownership', 'Buying, Building, and Selling Existing Businesses')),
  industries JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(industries) = 'array'),
  innovation_industry TEXT NOT NULL CHECK (char_length(innovation_industry) BETWEEN 1 AND 120),
  world_need TEXT CHECK (world_need IS NULL OR char_length(world_need) <= 500),
  problem_to_solve TEXT CHECK (problem_to_solve IS NULL OR char_length(problem_to_solve) <= 500),
  attributes JSONB NOT NULL CHECK (jsonb_typeof(attributes) = 'object'),
  top_attributes JSONB NOT NULL CHECK (jsonb_typeof(top_attributes) = 'array'),
  recommended_next_step TEXT NOT NULL CHECK (char_length(recommended_next_step) <= 500),
  explicit_save_consent BOOLEAN NOT NULL CHECK (explicit_save_consent = true),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.legacy_profiles TO service_role;
ALTER TABLE public.legacy_profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER visitor_access_set_updated_at
BEFORE UPDATE ON public.visitor_access
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER legacy_profiles_set_updated_at
BEFORE UPDATE ON public.legacy_profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX visitor_access_created_at_idx ON public.visitor_access (created_at DESC);
CREATE INDEX legacy_profiles_visitor_access_id_idx ON public.legacy_profiles (visitor_access_id);
CREATE INDEX legacy_profiles_created_at_idx ON public.legacy_profiles (created_at DESC);