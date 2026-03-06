-- Table for storing one-time verification codes
CREATE TABLE public.demo_verification_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for storing verified demo leads
CREATE TABLE public.demo_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_demo_leads_email ON public.demo_leads (email);
CREATE INDEX idx_demo_verification_codes_email ON public.demo_verification_codes (email, created_at DESC);

-- Enable RLS (no client-side policies needed - edge functions use service role)
ALTER TABLE public.demo_verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;