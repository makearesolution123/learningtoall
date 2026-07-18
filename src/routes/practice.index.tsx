import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, FileText, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { listTests } from "@/lib/practice.functions";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice Tests — Learning to All Tutoring" },
      {
        name: "description",
        content:
          "Browse full-length SAT practice tests with instant scoring and downloadable PDF reports.",
      },
    ],
  }),
  loader: async () => await listTests(),
  component: PracticeListPage,
});

function PracticeListPage() {
  const tests = Route.useLoaderData();

  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <header className="mb-10">
          <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-accent-foreground">
            Practice Tests
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Choose a practice test
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Timed, realistic practice with instant scoring and a downloadable PDF report.
          </p>
        </header>

        {tests.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
            <h2 className="text-lg font-semibold">No tests available yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">Please check back soon.</p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {tests.map((t) => {
              const mins = Math.round(t.durationSeconds / 60);
              return (
                <li key={t.id}>
                  <Link
                    to="/practice/$testId"
                    params={{ testId: t.id }}
                    className="group block h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated"
                  >
                    <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <span>{t.subject}</span>
                      <span>{t.difficulty}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold text-foreground">{t.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {t.description}
                    </p>
                    <dl className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="inline-flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        {t.questionCount} questions
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {mins} min
                      </div>
                    </dl>
                    <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Start test
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
