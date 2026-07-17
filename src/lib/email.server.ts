// Server-only email helper. Uses Resend via connector-gateway if RESEND_API_KEY
// is configured; otherwise logs and records a stub.
import { supabaseAdmin } from "@/integrations/supabase/client.server";

interface Breakdown {
  position: number;
  prompt: string;
  studentAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  flagged: boolean;
}

interface Args {
  attemptId: string;
  tutorEmail: string;
  testTitle: string;
  score: number;
  total: number;
  percentage: number;
  timeRemainingSeconds: number;
  breakdown: Breakdown[];
  incorrect: number;
  unanswered: number;
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function buildHtml(a: Args) {
  const rows = a.breakdown
    .map(
      (b) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eef0f4;font-weight:600;">Q${b.position}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eef0f4;">${b.studentAnswer ?? "—"}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eef0f4;">${b.correctAnswer}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eef0f4;color:${b.isCorrect ? "#16a34a" : b.studentAnswer ? "#dc2626" : "#6b7280"};">
          ${b.isCorrect ? "✅ Correct" : b.studentAnswer ? "❌ Incorrect" : "— Unanswered"}${b.flagged ? " 🚩" : ""}
        </td>
      </tr>`,
    )
    .join("");
  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#f7f8fb;padding:32px;color:#0f172a;">
    <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 4px 16px rgba(15,23,42,.05);">
      <h1 style="margin:0 0 4px;font-size:22px;">Practice Test Results</h1>
      <p style="margin:0 0 24px;color:#64748b;">${a.testTitle}</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:24px;">
        <div style="flex:1;min-width:140px;background:#eff4ff;border-radius:12px;padding:16px;">
          <div style="font-size:12px;color:#3b5bdb;text-transform:uppercase;letter-spacing:.05em;">Score</div>
          <div style="font-size:24px;font-weight:700;">${a.score} / ${a.total}</div>
        </div>
        <div style="flex:1;min-width:140px;background:#eff4ff;border-radius:12px;padding:16px;">
          <div style="font-size:12px;color:#3b5bdb;text-transform:uppercase;letter-spacing:.05em;">Percentage</div>
          <div style="font-size:24px;font-weight:700;">${a.percentage}%</div>
        </div>
        <div style="flex:1;min-width:140px;background:#eff4ff;border-radius:12px;padding:16px;">
          <div style="font-size:12px;color:#3b5bdb;text-transform:uppercase;letter-spacing:.05em;">Time Left</div>
          <div style="font-size:24px;font-weight:700;">${fmtTime(a.timeRemainingSeconds)}</div>
        </div>
      </div>
      <p style="margin:0 0 8px;color:#334155;">
        <strong>Correct:</strong> ${a.score} &nbsp;·&nbsp;
        <strong>Incorrect:</strong> ${a.incorrect} &nbsp;·&nbsp;
        <strong>Unanswered:</strong> ${a.unanswered}
      </p>
      <p style="margin:0 0 24px;color:#64748b;font-size:13px;">Submitted ${new Date().toLocaleString()}</p>
      <h2 style="font-size:16px;margin:24px 0 12px;">Detailed Breakdown</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f1f5f9;text-align:left;">
            <th style="padding:10px 12px;">Question</th>
            <th style="padding:10px 12px;">Student</th>
            <th style="padding:10px 12px;">Correct</th>
            <th style="padding:10px 12px;">Result</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

export async function sendResultsEmail(a: Args) {
  const subject = `Practice Test Results — ${a.score}/${a.total} (${a.percentage}%)`;
  const html = buildHtml(a);
  const resendKey = process.env.RESEND_API_KEY;
  const lovableKey = process.env.LOVABLE_API_KEY;

  let status = "skipped";
  let error: string | null = null;

  if (resendKey && lovableKey) {
    try {
      const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": resendKey,
        },
        body: JSON.stringify({
          from: "SAT Prep Studio <onboarding@resend.dev>",
          to: [a.tutorEmail],
          subject,
          html,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        status = "failed";
        error = `[${res.status}] ${body}`;
        console.error("Resend gateway error:", error);
      } else {
        status = "sent";
      }
    } catch (e) {
      status = "failed";
      error = (e as Error).message;
    }
  } else {
    console.warn("[email] RESEND_API_KEY not configured — logging results instead");
    console.log("[email] would send to", a.tutorEmail, subject);
    status = "skipped_no_provider";
  }

  await supabaseAdmin.from("email_logs").insert({
    attempt_id: a.attemptId,
    recipient: a.tutorEmail,
    subject,
    status,
    error,
  });
}
