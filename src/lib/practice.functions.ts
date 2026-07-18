import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPublishedTests, getTestById } from "@/content/tests/registry";

export const listTests = createServerFn({ method: "GET" }).handler(async () => {
  return getPublishedTests().map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    subject: t.subject,
    difficulty: t.difficulty,
    durationSeconds: t.durationSeconds,
    questionCount: t.questions.length,
  }));
});

export const getTest = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ testId: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const t = getTestById(data.testId);
    if (!t || !t.published) return null;
    return {
      test: {
        id: t.id,
        title: t.title,
        description: t.description,
        subject: t.subject,
        difficulty: t.difficulty,
        duration_seconds: t.durationSeconds,
      },
      // Sanitized — no correct answers ever leave the server.
      questions: t.questions.map((q, i) => ({
        id: q.id,
        position: i + 1,
        prompt: q.prompt,
        imageUrl: q.imageUrl ?? null,
        choice_a: q.choices.A,
        choice_b: q.choices.B,
        choice_c: q.choices.C,
        choice_d: q.choices.D,
      })),
    };
  });

const submitSchema = z.object({
  testId: z.string().min(1),
  studentName: z.string().trim().max(120).optional().default(""),
  answers: z.record(z.string(), z.enum(["A", "B", "C", "D"])),
  flagged: z.array(z.string()),
  timeRemainingSeconds: z.number().int().min(0),
  autoSubmitted: z.boolean().optional().default(false),
});

export const submitAttempt = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    const test = getTestById(data.testId);
    if (!test || !test.published) throw new Error("Test not found");

    let correct = 0;
    const breakdown = test.questions.map((q, i) => {
      const student = data.answers[q.id] ?? null;
      const isCorrect = student === q.correctAnswer;
      if (isCorrect) correct++;
      return {
        position: i + 1,
        prompt: q.prompt,
        studentAnswer: student,
        studentAnswerText: student ? q.choices[student] : null,
        correctAnswer: q.correctAnswer,
        correctAnswerText: q.choices[q.correctAnswer],
        isCorrect,
        flagged: data.flagged.includes(q.id),
        explanation: q.explanation ?? null,
      };
    });

    const total = test.questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const unanswered = breakdown.filter((b) => !b.studentAnswer).length;
    const incorrect = total - correct - unanswered;

    // Best-effort attempt logging — never block the student on DB failures.
    let attemptId: string | null = null;
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: attempt } = await supabaseAdmin
        .from("test_attempts")
        .insert({
          test_id: data.testId,
          tutor_email: data.studentName || "anonymous",
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
      attemptId = attempt?.id ?? null;
    } catch (e) {
      console.error("Failed to log attempt", e);
    }

    return {
      attemptId,
      testTitle: test.title,
      studentName: data.studentName || "",
      score: correct,
      total,
      percentage,
      timeRemainingSeconds: data.timeRemainingSeconds,
      correct,
      incorrect,
      unanswered,
      flaggedCount: data.flagged.length,
      autoSubmitted: data.autoSubmitted,
      breakdown,
    };
  });
