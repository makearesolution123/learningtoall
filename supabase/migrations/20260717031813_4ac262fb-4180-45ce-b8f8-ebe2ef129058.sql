
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
VALUES ('00000000-0000-0000-0000-000000000001', 'SAT Practice Test 1', 'Algebra Practice Test 1', 1200);

INSERT INTO public.questions (test_id, position, prompt, choice_a, choice_b, choice_c, choice_d, correct_answer) VALUES
('00000000-0000-0000-0000-000000000001', 1, 'Maria rents a kayak at a cost of $8 per hour plus a onetime equipment fee of $12. Which equation represents the total cost c, in dollars, to rent the kayak for h hours?', 'c = 8(h + 12)', 'c = 12(h + 8)', 'c = 8h + 12', 'c = 12h + 8', 'C'),
('00000000-0000-0000-0000-000000000001', 2, 'For the linear function k, the graph of y = k(x) in the xy-plane passes through the points (2, 11) and (5, 20). Which equation defines k?', 'k(x) = 3x + 5', 'k(x) = 2x + 7', 'k(x) = 5x + 1', 'k(x) = 9x + 2', 'A'),
('00000000-0000-0000-0000-000000000001', 3, 'The function g is defined by the equation g(x) = x + 7/9. What is the value of g(x) when x = 2/9?', '1', '9/9', '5/9', '1/9', 'A'),
('00000000-0000-0000-0000-000000000001', 4, 'In the xy-plane, the graph of the linear function h contains the points (0, 5) and (6, 29). Which equation defines h, where y = h(x)?', 'h(x) = 4x + 5', 'h(x) = 24x + 5', 'h(x) = 5x + 4', 'h(x) = 6x + 5', 'A'),
('00000000-0000-0000-0000-000000000001', 5, 'What is the y-coordinate of the y-intercept of the graph of 2x/3 = -4y/5 + 12 in the xy-plane?', '12', '15', '18', '20', 'C'),
('00000000-0000-0000-0000-000000000001', 6, 'What value of x is the solution to the equation 0.6x - 0.24 = 6(x - 0.04) + 1.2?', '-0.2', '0.2', '1.2', '2', 'A'),
('00000000-0000-0000-0000-000000000001', 7, 'For the function f, if f(2x) = x + 9 for all values of x, what is the value of f(10)?', '5', '10', '14', '19', 'C'),
('00000000-0000-0000-0000-000000000001', 8, 'If 6 - 5(3 - 2x) = 21 - 4(3 - 2x), what is the value of 3 - 2x?', '-15', '-5', '5', '15', 'A'),
('00000000-0000-0000-0000-000000000001', 9, 'The line with the equation (3/4)x + (1/2)y = 1 is graphed in the xy-plane. What is the x-coordinate of the x-intercept of the line?', '3/4', '1/2', '4/3', '2', 'C'),
('00000000-0000-0000-0000-000000000001', 10, '2(3x - 4) - 9 = 3(x - 2) + 5. If x is the solution to the equation above, what is the value of x - 2?', '2', '4', '6', '8', 'A'),
('00000000-0000-0000-0000-000000000001', 11, 'The function h is defined by h(x) = -2x + 9. What is the value of h(0)?', '-2', '0', '7', '9', 'D'),
('00000000-0000-0000-0000-000000000001', 12, 'A caterer charges a delivery fee of $25 plus $9 per guest for a catered event. Which equation represents the total cost c, in dollars, for g guests?', 'c = 25(g + 9)', 'c = 9(g + 25)', 'c = 25g + 9', 'c = 9g + 25', 'D'),
('00000000-0000-0000-0000-000000000001', 13, 'For the linear function p, the graph of y = p(x) in the xy-plane passes through the points (1, 4) and (4, 22). Which equation defines p?', 'p(x) = 6x - 2', 'p(x) = 3x + 1', 'p(x) = 2x + 2', 'p(x) = 4x', 'A'),
('00000000-0000-0000-0000-000000000001', 14, 'What is the y-coordinate of the y-intercept of the graph of 5x/2 = -3y/4 + 16 in the xy-plane?', '16', '64/3', '48', '4', 'B'),
('00000000-0000-0000-0000-000000000001', 15, 'For the function q, if q(4x) = x - 5 for all values of x, what is the value of q(8)?', '-3', '-4', '-5', '3', 'B');
