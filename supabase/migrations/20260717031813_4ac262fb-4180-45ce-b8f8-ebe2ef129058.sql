
-- Tests
CREATE TABLE public.tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration_seconds INTEGER NOT NULL DEFAULT 1200,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tests TO authenticated;
GRANT ALL ON public.tests TO service_role;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tests are viewable by everyone" ON public.tests FOR SELECT USING (is_active = true);
CREATE POLICY "service manages tests" ON public.tests FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Questions
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(test_id, position)
);
GRANT SELECT ON public.questions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.questions TO authenticated;
GRANT ALL ON public.questions TO service_role;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
-- Public may view questions (needed for practice) but NOT correct_answer -- we'll enforce via a view for public and use service role for grading.
CREATE POLICY "questions viewable" ON public.questions FOR SELECT USING (true);
CREATE POLICY "service manages questions" ON public.questions FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Attempts
CREATE TABLE public.test_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  tutor_email TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ,
  score INTEGER,
  total INTEGER,
  time_remaining_seconds INTEGER,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  flagged JSONB NOT NULL DEFAULT '[]'::jsonb,
  auto_submitted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.test_attempts TO service_role;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service manages attempts" ON public.test_attempts FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Email logs
CREATE TABLE public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES public.test_attempts(id) ON DELETE SET NULL,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.email_logs TO service_role;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service manages email logs" ON public.email_logs FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Seed default test + 15 questions
INSERT INTO public.tests (id, title, description, duration_seconds)
VALUES ('00000000-0000-0000-0000-000000000001', 'SAT Practice Test 1', 'A 15-question sample SAT-style practice test.', 1200);

INSERT INTO public.questions (test_id, position, prompt, choice_a, choice_b, choice_c, choice_d, correct_answer) VALUES
('00000000-0000-0000-0000-000000000001', 1, 'If 3x + 5 = 20, what is the value of x?', '3', '5', '15', '25', 'B'),
('00000000-0000-0000-0000-000000000001', 2, 'Which word is closest in meaning to "meticulous"?', 'Careless', 'Thorough', 'Rapid', 'Loud', 'B'),
('00000000-0000-0000-0000-000000000001', 3, 'What is 15% of 200?', '15', '20', '30', '45', 'C'),
('00000000-0000-0000-0000-000000000001', 4, 'Choose the correctly punctuated sentence.', 'Its raining outside.', 'It''s raining outside.', 'Its'' raining outside.', 'It is raining, outside.', 'B'),
('00000000-0000-0000-0000-000000000001', 5, 'If f(x) = 2x^2 - 3, what is f(4)?', '13', '29', '32', '5', 'B'),
('00000000-0000-0000-0000-000000000001', 6, 'Which of the following is a synonym for "benevolent"?', 'Cruel', 'Kind', 'Rude', 'Stubborn', 'B'),
('00000000-0000-0000-0000-000000000001', 7, 'Solve for y: 4y - 8 = 12', '3', '4', '5', '6', 'C'),
('00000000-0000-0000-0000-000000000001', 8, 'The primary purpose of a topic sentence is to:', 'Conclude a paragraph', 'Introduce the main idea', 'Provide a quote', 'Add a transition', 'B'),
('00000000-0000-0000-0000-000000000001', 9, 'What is the slope of the line y = -3x + 7?', '7', '-3', '3', '-7', 'B'),
('00000000-0000-0000-0000-000000000001', 10, 'Choose the best transition: "She studied hard; ___, she passed."', 'however', 'therefore', 'meanwhile', 'nevertheless', 'B'),
('00000000-0000-0000-0000-000000000001', 11, 'A rectangle has length 8 and width 5. What is its area?', '13', '26', '40', '45', 'C'),
('00000000-0000-0000-0000-000000000001', 12, 'Which sentence uses parallel structure correctly?', 'She likes hiking, swimming, and to bike.', 'She likes to hike, swim, and biking.', 'She likes hiking, swimming, and biking.', 'She likes hike, swim, and bike.', 'C'),
('00000000-0000-0000-0000-000000000001', 13, 'If x/4 = 9, then x =', '13', '36', '5', '2.25', 'B'),
('00000000-0000-0000-0000-000000000001', 14, 'Which word best completes the sentence: "The evidence was ___, leaving no room for doubt."', 'ambiguous', 'compelling', 'trivial', 'obscure', 'B'),
('00000000-0000-0000-0000-000000000001', 15, 'The average of 4, 8, and x is 10. What is x?', '10', '14', '18', '22', 'C');
