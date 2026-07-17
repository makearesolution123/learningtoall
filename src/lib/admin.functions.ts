// Admin server functions — no auth (hidden panel). Uses admin client server-side.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const choice = z.enum(["A", "B", "C", "D"]);

export const adminListTests = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("tests")
    .select("id, title, description, duration_seconds, is_active, created_at")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const adminGetTest = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ testId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: test }, { data: questions }] = await Promise.all([
      supabaseAdmin.from("tests").select("*").eq("id", data.testId).maybeSingle(),
      supabaseAdmin.from("questions").select("*").eq("test_id", data.testId).order("position"),
    ]);
    if (!test) throw new Error("Not found");
    return { test, questions: questions ?? [] };
  });

export const adminCreateTest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      title: z.string().trim().min(1).max(200),
      description: z.string().trim().max(1000).optional().default(""),
      durationSeconds: z.number().int().min(60).max(60 * 60 * 4),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("tests")
      .insert({ title: data.title, description: data.description, duration_seconds: data.durationSeconds })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminUpdateTest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      testId: z.string().uuid(),
      title: z.string().trim().min(1).max(200),
      description: z.string().trim().max(1000).optional().default(""),
      durationSeconds: z.number().int().min(60).max(60 * 60 * 4),
      isActive: z.boolean(),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("tests")
      .update({
        title: data.title,
        description: data.description,
        duration_seconds: data.durationSeconds,
        is_active: data.isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.testId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteTest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ testId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("tests").delete().eq("id", data.testId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const questionSchema = z.object({
  testId: z.string().uuid(),
  prompt: z.string().trim().min(1).max(2000),
  choiceA: z.string().trim().min(1).max(500),
  choiceB: z.string().trim().min(1).max(500),
  choiceC: z.string().trim().min(1).max(500),
  choiceD: z.string().trim().min(1).max(500),
  correctAnswer: choice,
});

export const adminAddQuestion = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => questionSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: maxRow } = await supabaseAdmin
      .from("questions").select("position").eq("test_id", data.testId).order("position", { ascending: false }).limit(1).maybeSingle();
    const position = (maxRow?.position ?? 0) + 1;
    const { error } = await supabaseAdmin.from("questions").insert({
      test_id: data.testId,
      position,
      prompt: data.prompt,
      choice_a: data.choiceA,
      choice_b: data.choiceB,
      choice_c: data.choiceC,
      choice_d: data.choiceD,
      correct_answer: data.correctAnswer,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminUpdateQuestion = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    questionSchema.extend({ questionId: z.string().uuid(), position: z.number().int().min(1) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("questions")
      .update({
        prompt: data.prompt,
        choice_a: data.choiceA,
        choice_b: data.choiceB,
        choice_c: data.choiceC,
        choice_d: data.choiceD,
        correct_answer: data.correctAnswer,
        position: data.position,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.questionId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteQuestion = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ questionId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("questions").delete().eq("id", data.questionId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
