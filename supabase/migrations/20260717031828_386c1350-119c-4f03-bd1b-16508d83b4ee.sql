
DROP POLICY IF EXISTS "questions viewable" ON public.questions;
REVOKE SELECT ON public.questions FROM anon;

CREATE OR REPLACE VIEW public.public_questions AS
SELECT id, test_id, position, prompt, choice_a, choice_b, choice_c, choice_d, created_at
FROM public.questions;

GRANT SELECT ON public.public_questions TO anon, authenticated;
