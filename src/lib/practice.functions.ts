import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function serverPublic() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getActiveTest = createServerFn({ method: "GET" }).handler(async () => {
  const sb = serverPublic();
  const { data: test, error: te } = await sb
    .from("tests")
    .select("id, title, description, duration_seconds")
    .eq("is_active", true)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (te) throw new Error(te.message);
  if (!test) return null;
  const { data: questions, error: qe } = await sb
    .from("public_questions")
    .select("id, position, prompt, choice_a, choice_b, choice_c, choice_d")
    .eq("test_id", test.id)
    .order("position", { ascending: true });
  if (qe) throw new Error(qe.message);
  const safe = (questions ?? []).map((q) => ({
    id: q.id as string,
    position: q.position as number,
    prompt: q.prompt as string,
    choice_a: q.choice_a as string,
    choice_b: q.choice_b as string,
    choice_c: q.choice_c as string,
    choice_d: q.choice_d as string,
  }));
  return { test, questions: safe };
});

const submitSchema = z.object({
  testId: z.string().uuid(),
  tutorEmail: z.string().trim().email().max(255),
  answers: z.record(z.string(), z.enum(["A", "B", "C", "D"])),
  flagged: z.array(z.string()),
  timeRemainingSeconds: z.number().int().min(0),
  autoSubmitted: z.boolean().optional().default(false),
});

export const submitAttempt = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: test, error: te } = await supabaseAdmin
      .from("tests").select("id, title, duration_seconds").eq("id", data.testId).maybeSingle();
    if (te || !test) throw new Error("Test not found");

    const { data: questions, error: qe } = await supabaseAdmin
      .from("questions")
      .select("id, position, prompt, choice_a, choice_b, choice_c, choice_d, correct_answer")
      .eq("test_id", data.testId)
      .order("position", { ascending: true });
    if (qe || !questions) throw new Error("Failed to load questions");

    let correct = 0;
    const breakdown = questions.map((q) => {
      const student = data.answers[q.id] ?? null;
      const isCorrect = student === q.correct_answer;
      if (isCorrect) correct++;
      return {
        position: q.position,
        prompt: q.prompt,
        studentAnswer: student,
        correctAnswer: q.correct_answer,
        isCorrect,
        flagged: data.flagged.includes(q.id),
      };
    });
    const total = questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const unanswered = breakdown.filter((b) => !b.studentAnswer).length;
    const incorrect = total - correct - unanswered;

    const { data: attempt, error: ae } = await supabaseAdmin
      .from("test_attempts")
      .insert({
        test_id: data.testId,
        tutor_email: data.tutorEmail,
        submitted_at: new Date().toISOString(),
        score: correct,
        total,
        time_remaining_seconds: data.timeRemainingSeconds,
        answers: data.answers,
        flagged: data.flagged,
        auto_submitted: data.autoSubmitted,
      })
      .select("id")
      .single();
    if (ae) throw new Error(ae.message);

    // Fire-and-log email
    try {
      const { sendResultsEmail } = await import("./email.server");
      await sendResultsEmail({
        attemptId: attempt.id,
        tutorEmail: data.tutorEmail,
        testTitle: test.title,
        score: correct,
        total,
        percentage,
        timeRemainingSeconds: data.timeRemainingSeconds,
        breakdown,
        incorrect,
        unanswered,
      });
    } catch (e) {
      console.error("Email send failed:", e);
    }

    return {
      attemptId: attempt.id,
      score: correct,
      total,
      percentage,
      timeRemainingSeconds: data.timeRemainingSeconds,
      correct,
      incorrect,
      unanswered,
      flaggedCount: data.flagged.length,
    };
  });
