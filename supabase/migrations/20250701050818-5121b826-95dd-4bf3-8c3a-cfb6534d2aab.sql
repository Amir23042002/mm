
-- Add unique constraint on user_id for the otp_verifications table
-- This is needed for the upsert operation to work correctly
ALTER TABLE public.otp_verifications 
ADD CONSTRAINT otp_verifications_user_id_unique UNIQUE (user_id);

-- Also add an index for better performance
CREATE INDEX IF NOT EXISTS idx_otp_verifications_user_id 
ON public.otp_verifications (user_id);

-- Add an index on expires_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_otp_verifications_expires_at 
ON public.otp_verifications (expires_at);
