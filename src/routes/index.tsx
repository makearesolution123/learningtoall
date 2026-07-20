import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import {
  Calculator,
  FileText,
  ClipboardCheck,
  Target,
  TrendingUp,
  Laptop,
  UserCheck,
  MessageCircle,
  Search,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const STATS = [
  { value: "1570", label: "SAT Math Score" },
  { value: "500+", label: "Tutoring Sessions" },
  { value: "95%", label: "Student Satisfaction" },
  { value: "200+", label: "Practice Tests Completed" },
];

const FEATURES = [
  {
    icon: Calculator,
    title: "Desmos-First Strategy",
    description:
      "We teach students to use the Desmos graphing calculator as a core problem-solving tool—not just a crutch—saving valuable time on test day.",
  },
  {
    icon: ClipboardCheck,
    title: "Realistic Practice Tests",
    description:
      "Take timed SAT practice tests designed to closely mirror the pacing and difficulty of the actual exam.",
  },
  {
    icon: FileText,
    title: "Instant Score Reports",
    description:
      "Receive an easy-to-read PDF performance report after every practice test so students and parents can immediately track progress.",
  },
];

const WHY_CARDS = [
  { icon: Target, title: "Personalized Study Plans", description: "Lessons built around each student's goals and weak spots." },
  { icon: Calculator, title: "Desmos Mastery", description: "Turn the calculator into your fastest test-day advantage." },
  { icon: TrendingUp, title: "Track Score Growth", description: "Clear reports after every practice test show progress." },
  { icon: Laptop, title: "Flexible Online Tutoring", description: "Sessions that fit your schedule, 100% online." },
];

const STEPS = [
  { icon: ClipboardCheck, title: "Take a Diagnostic Practice Test", description: "Start with a realistic timed SAT to reveal your baseline." },
  { icon: Search, title: "Get Matched with a Tutor", description: "We pair you with a tutor who fits your goals and schedule." },
  { icon: MessageCircle, title: "Personalized Lessons & Feedback", description: "Targeted sessions with instant, actionable feedback." },
  { icon: TrendingUp, title: "Track Your Score Improvement", description: "Watch your practice scores rise week over week." },
];

const FAQS = [
  { question: "What subjects do you tutor?", answer: "We specialize in SAT prep — both Math and Reading & Writing — with deep focus on Desmos strategy for the digital SAT." },
  { question: "How do the practice tests work?", answer: "Our practice tests are timed and mirror the real SAT. When you finish, you can download a detailed PDF report showing every question, your answer, and the correct answer." },
  { question: "Are tutoring sessions online or in person?", answer: "All sessions are 100% online, giving you flexible scheduling from anywhere." },
  { question: "How do I get matched with a tutor?", answer: "Fill out the short form on the Get a Tutor page. We'll review your request and reach out within 24 hours to match you with an available tutor." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Learning to All Tutoring — Personalized SAT Prep" },
      { name: "description", content: "Raise your SAT score with personalized online tutoring, Desmos strategy, and realistic timed practice tests with instant PDF reports." },
      { property: "og:title", content: "Learning to All Tutoring — Personalized SAT Prep" },
      { property: "og:description", content: "Raise your SAT score with personalized online tutoring, Desmos strategy, and realistic timed practice tests with instant PDF reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Hero */}
        <section className="relative text-center animate-in fade-in duration-700">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-8 -z-10 mx-auto h-64 max-w-3xl rounded-full bg-primary/10 blur-3xl" />
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Personalized SAT prep, built around you
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Raise Your SAT Score with{" "}
            <span className="text-primary">Personalized Tutoring</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Learn proven Desmos strategies, take realistic timed SAT practice tests, and receive instant performance reports after every exam.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/get-a-tutor"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:bg-primary/90"
            >
              Get a Tutor
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-all hover:bg-muted"
            >
              Try a Practice Test
            </Link>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="mt-24 animate-in fade-in duration-700" aria-labelledby="value-heading">
          <h2 id="value-heading" className="sr-only">What we offer</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <article key={f.title} className="rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition-all hover:shadow-elevated">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Why students choose */}
        <section className="mt-24" aria-labelledby="why-heading">
          <div className="text-center">
            <h2 id="why-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Students Choose Learning to All
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A focused, modern approach designed for the digital SAT.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CARDS.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-24" aria-labelledby="how-heading">
          <div className="text-center">
            <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A simple path from your first practice test to real score growth.
            </p>
          </div>
          <ol className="relative mt-12 grid gap-6 md:grid-cols-4">
            <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Step {i + 1}</div>
                <h3 className="mt-1 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Social proof / stats */}
        <section className="mt-24" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Our results</h2>
          <div className="grid gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-bold tracking-tight text-primary">{s.value}</div>
                <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-24 max-w-3xl" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((f) => (
              <FaqItem key={f.question} question={f.question} answer={f.answer} />
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-24 rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-elevated sm:p-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Improve Your SAT Score?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
            Get matched with a tutor and start building a personalized study plan today.
          </p>
          <Link
            to="/get-a-tutor"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary shadow-soft transition-all hover:bg-primary-foreground/90"
          >
            <UserCheck className="h-4 w-4" />
            Request a Tutor
          </Link>
        </section>
      </main>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/50"
      >
        <span className="text-sm font-medium text-foreground">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground animate-in fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}
