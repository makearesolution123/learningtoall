ALTER TABLE public.test_attempts DROP CONSTRAINT IF EXISTS test_attempts_test_id_fkey;
ALTER TABLE public.test_attempts ALTER COLUMN test_id TYPE text USING test_id::text;