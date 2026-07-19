import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Clock, Flag, ChevronLeft, ChevronRight, X, CheckCircle2, Loader2, Download } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { DesmosCalculator } from "@/components/desmos-calculator";
import { getTest, submitAttempt } from "@/lib/practice.functions";

export const Route = createFileRoute("/practice/$testId")({
  head: ({ loaderData }) => {
    const data = loaderData as unknown as LoaderData;
    return {
      meta: [
        {
          title: data
            ? `${data.test.title} — Learning to All Tutoring`
            : "Practice Test — Learning to All Tutoring",
        },
        {
          name: "description",
          content:
            data?.test.description ??
            "Take a realistic timed SAT practice test with instant scoring and a PDF report.",
        },
      ],
    };
  },

  loader: async ({ params }) => {
    const data = await getTest({ data: { testId: params.testId } });
    if (!data) throw notFound();
    return data;
  },
  notFoundComponent: () => (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Test not found</h1>
        <p className="mt-2 text-muted-foreground">This practice test doesn't exist or isn't published.</p>
      </main>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </main>
    </div>
  ),
  component: PracticePage,
});

type LoaderData = Awaited<ReturnType<typeof getTest>>;
type Question = NonNullable<LoaderData>["questions"][number];
type Choice = "A" | "B" | "C" | "D";

type Result = Awaited<ReturnType<typeof submitAttempt>>;

const STORAGE_KEY_PREFIX = "sat-practice-state-v2:";

function PracticePage() {
  const data = Route.useLoaderData() as NonNullable<LoaderData>;
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "test">("intro");

  return (
    <div className="min-h-dvh bg-muted/30">
      {phase === "intro" && <SiteNav />}
      {phase === "intro" ? (
        <IntroPanel test={data.test} count={data.questions.length} onStart={() => setPhase("test")} />
      ) : (
        <TestRunner
          testId={data.test.id}
          durationSeconds={data.test.duration_seconds}
          questions={data.questions}
          onDone={() => navigate({ to: "/practice" })}
        />
      )}
    </div>
  );
}

function IntroPanel({
  test,
  count,
  onStart,
}: {
  test: { title: string; description: string | null; duration_seconds: number };
  count: number;
  onStart: () => void;
}) {
  const mins = Math.round(test.duration_seconds / 60);
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12">
        <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-accent-foreground">
          Practice Test
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{test.title}</h1>
        {test.description && <p className="mt-3 text-muted-foreground">{test.description}</p>}
        <dl className="mt-8 grid grid-cols-2 gap-4">
          <Stat label="Questions" value={String(count)} />
          <Stat label="Time Limit" value={`${mins} min`} />
        </dl>
        <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
          <li>• The timer starts when you press "Start Test".</li>
          <li>• You may flag questions and revisit them before submitting.</li>
          <li>• Your answers are auto-saved locally during the session.</li>
          <li>• At time zero, your test will submit automatically.</li>
        </ul>
        <button
          onClick={onStart}
          className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-elevated"
        >
          Start Test
        </button>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function TestRunner({
  testId,
  durationSeconds,
  questions,
  onDone,
}: {
  testId: string;
  durationSeconds: number;
  questions: Question[];
  onDone: () => void;
}) {
  const submit = useServerFn(submitAttempt);
  const storageKey = STORAGE_KEY_PREFIX + testId;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Choice>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [remaining, setRemaining] = useState(durationSeconds);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const warned5 = useRef(false);
  const warned1 = useRef(false);
  const submittedRef = useRef(false);

  // Restore
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
      if (!raw) return;
      const s = JSON.parse(raw);
      setAnswers(s.answers ?? {});
      setFlagged(new Set(s.flagged ?? []));
    } catch {}
  }, [storageKey]);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers, flagged: [...flagged] }));
    } catch {}
  }, [storageKey, answers, flagged]);

  const handleSubmit = useCallback(
    async (name: string, auto = false) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      setSubmitting(true);
      try {
        const res = await submit({
          data: {
            testId,
            studentName: name,
            answers,
            flagged: [...flagged],
            timeRemainingSeconds: Math.max(0, remaining),
            autoSubmitted: auto,
          },
        });
        setResult(res);
        try { localStorage.removeItem(storageKey); } catch {}
      } catch (e) {
        submittedRef.current = false;
        toast.error((e as Error).message || "Failed to submit");
      } finally {
        setSubmitting(false);
      }
    },
    [answers, flagged, remaining, submit, testId, storageKey],
  );

  // Timer
  useEffect(() => {
    if (result) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        const next = r - 1;
        if (next === 300 && !warned5.current) {
          warned5.current = true;
          toast.warning("5 minutes remaining");
        }
        if (next === 60 && !warned1.current) {
          warned1.current = true;
          toast.warning("1 minute remaining");
        }
        if (next <= 0) {
          clearInterval(t);
          void handleSubmit(studentName.trim(), true);
          toast.error("Time has expired. Your test has been submitted.");
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [result, studentName, handleSubmit]);

  // Beforeunload guard
  useEffect(() => {
    if (result) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [result]);

  const q = questions[index];
  const answered = Object.keys(answers).length;
  const progressPct = Math.round(((index + 1) / questions.length) * 100);

  return (
    <div className="flex min-h-dvh flex-col">
      <TestHeader remaining={remaining} index={index} count={questions.length} answered={answered} />
      {!result && <DesmosCalculator />}

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_280px]">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Question {index + 1} of {questions.length}
            </span>
            <button
              onClick={() =>
                setFlagged((prev) => {
                  const next = new Set(prev);
                  next.has(q.id) ? next.delete(q.id) : next.add(q.id);
                  return next;
                })
              }
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                flagged.has(q.id)
                  ? "bg-warning/15 text-warning-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Flag className="h-3.5 w-3.5" />
              {flagged.has(q.id) ? "Flagged" : "Flag for review"}
            </button>
          </div>

          {q.imageUrl && (
            <img
              src={q.imageUrl}
              alt=""
              className="mt-4 max-h-80 w-full rounded-2xl border border-border object-contain"
            />
          )}

          <h2 className="mt-4 text-lg font-medium leading-relaxed text-foreground sm:text-xl">{q.prompt}</h2>

          <div className="mt-6 space-y-3">
            {(["A", "B", "C", "D"] as const).map((letter) => {
              const text = q[`choice_${letter.toLowerCase()}` as "choice_a"] as string;
              const selected = answers[q.id] === letter;
              return (
                <button
                  key={letter}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: letter }))}
                  className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                    selected
                      ? "border-primary bg-primary-soft shadow-soft"
                      : "border-border bg-background hover:border-primary/40 hover:bg-muted/50"
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-semibold transition-colors ${
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground group-hover:bg-primary/10"
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="pt-1 text-sm text-foreground sm:text-base">{text}</span>
                </button>
              );
            })}
          </div>

          {answers[q.id] && (
            <button
              onClick={() =>
                setAnswers((a) => {
                  const n = { ...a };
                  delete n[q.id];
                  return n;
                })
              }
              className="mt-4 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear answer
            </button>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <div className="hidden text-xs text-muted-foreground sm:block">{progressPct}% complete</div>
            {index === questions.length - 1 ? (
              <button
                onClick={() => setSubmitOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
              >
                Review & Submit
              </button>
            ) : (
              <button
                onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        <aside className="rounded-3xl border border-border bg-card p-5 shadow-soft lg:sticky lg:top-24 lg:h-fit">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Navigator</h3>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {questions.map((qq, i) => {
              const isAnswered = !!answers[qq.id];
              const isFlagged = flagged.has(qq.id);
              const isCurrent = i === index;
              return (
                <button
                  key={qq.id}
                  onClick={() => setIndex(i)}
                  className={`relative aspect-square rounded-lg text-sm font-medium transition-all ${
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-soft ring-2 ring-primary/30"
                      : isAnswered
                        ? "bg-success/15 text-success-foreground hover:bg-success/25"
                        : "bg-muted text-foreground hover:bg-muted/70"
                  }`}
                >
                  {i + 1}
                  {isFlagged && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-warning" />
                  )}
                </button>
              );
            })}
          </div>
          <dl className="mt-5 space-y-1.5 text-xs">
            <Legend color="bg-primary" label="Current" />
            <Legend color="bg-success/15" label="Answered" />
            <Legend color="bg-muted" label="Unanswered" />
            <Legend color="bg-warning" label="Flagged" />
          </dl>
          <button
            onClick={() => setSubmitOpen(true)}
            className="mt-5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Submit Test
          </button>
        </aside>
      </main>

      {submitOpen && !result && (
        <Modal onClose={() => !submitting && setSubmitOpen(false)}>
          <h2 className="text-xl font-semibold text-foreground">Submit your practice test</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your name so it appears on your downloadable PDF report (optional).
          </p>
          <div className="mt-6 grid gap-2">
            <label className="text-xs font-medium text-foreground">Your Name (optional)</label>
            <input
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 transition focus:border-primary focus:ring-2"
            />
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
            <MiniStat label="Answered" value={answered} />
            <MiniStat label="Flagged" value={flagged.size} />
            <MiniStat label="Left" value={questions.length - answered} />
          </dl>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setSubmitOpen(false)}
              className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              disabled={submitting}
            >
              Keep working
            </button>
            <button
              disabled={submitting}
              onClick={() => setConfirmOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:bg-primary/90 disabled:opacity-40"
            >
              Submit Test
            </button>
          </div>
        </Modal>
      )}

      {confirmOpen && !result && (
        <Modal onClose={() => !submitting && setConfirmOpen(false)}>
          <h2 className="text-lg font-semibold">Are you sure you want to submit?</h2>
          <p className="mt-2 text-sm text-muted-foreground">You won't be able to change answers after submitting.</p>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setConfirmOpen(false)}
              disabled={submitting}
              className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit(studentName.trim())}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:bg-primary/90 disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Submitting…" : "Yes, submit"}
            </button>
          </div>
        </Modal>
      )}

      {result && <ResultModal result={result} onClose={onDone} />}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className={`h-3 w-3 rounded ${color}`} />
      <span>{label}</span>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <div className="text-lg font-semibold text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function TestHeader({
  remaining,
  index,
  count,
  answered,
}: {
  remaining: number;
  index: number;
  count: number;
  answered: number;
}) {
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const pct = Math.round(((index + 1) / count) * 100);
  const low = remaining <= 60;
  const warn = remaining <= 300;
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-foreground">SAT Practice</div>
          <div className="text-xs text-muted-foreground">
            {answered}/{count} answered · {pct}%
          </div>
        </div>
        <div className="h-1.5 hidden max-w-xs flex-1 overflow-hidden rounded-full bg-muted sm:block">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div
          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-sm tabular-nums shadow-soft ${
            low ? "bg-destructive text-destructive-foreground" : warn ? "bg-warning text-warning-foreground" : "bg-foreground text-background"
          }`}
        >
          <Clock className="h-4 w-4" />
          {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
        </div>
      </div>
    </header>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-elevated animate-in zoom-in-95 sm:p-8">
        <div className="flex justify-end">
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ResultModal({ result, onClose }: { result: Result; onClose: () => void }) {
  const m = Math.floor(result.timeRemainingSeconds / 60);
  const s = result.timeRemainingSeconds % 60;
  const [downloading, setDownloading] = useState(false);

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const { generateResultsPdf } = await import("@/lib/results-pdf");
      generateResultsPdf(result);
    } catch (e) {
      toast.error((e as Error).message || "Failed to generate PDF");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-elevated animate-in zoom-in-95">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Practice Test Complete!</h2>
        <p className="mt-1 text-sm text-muted-foreground">Download your full breakdown as a PDF report below.</p>
        <div className="mt-6 rounded-2xl bg-primary-soft p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-accent-foreground">You scored</div>
          <div className="mt-1 text-5xl font-bold text-foreground">
            {result.score}
            <span className="text-2xl text-muted-foreground"> / {result.total}</span>
          </div>
          <div className="mt-1 text-lg font-semibold text-primary">{result.percentage}%</div>
        </div>
        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          <MiniStat label="Correct" value={result.correct} />
          <MiniStat label="Incorrect" value={result.incorrect} />
          <MiniStat label="Skipped" value={result.unanswered} />
        </dl>
        <div className="mt-4 text-xs text-muted-foreground">
          Time remaining: {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
        </div>
        <button
          onClick={downloadPdf}
          disabled={downloading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 disabled:opacity-60"
        >
          {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {downloading ? "Preparing PDF…" : "Download PDF Report"}
        </button>
        <button
          onClick={onClose}
          className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
        >
          Close
        </button>
      </div>
    </div>
  );
}
