
GRANT SELECT (id, test_id, position, prompt, choice_a, choice_b, choice_c, choice_d, created_at) ON public.questions TO anon, authenticated;
CREATE POLICY "questions public read" ON public.questions FOR SELECT USING (true);
