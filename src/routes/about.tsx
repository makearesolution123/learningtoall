import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { GraduationCap, Target, Users, Award, BookOpen, Clock } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Learning to All Tutoring" },
      { name: "description", content: "Learn about Learning to All Tutoring's mission, approach, and experienced SAT tutors dedicated to helping students reach their goals." },
      { property: "og:title", content: "About Us — Learning to All Tutoring" },
      { property: "og:description", content: "Learn about Learning to All Tutoring's mission, approach, and experienced SAT tutors dedicated to helping students reach their goals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Hero */}
        <section className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-soft">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About Learning to All Tutoring
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We believe every student deserves access to high-quality SAT preparation.
            Our personalized approach builds confidence, sharpens skills, and helps students
            achieve their best possible score.
          </p>
        </section>

        {/* Mission cards */}
        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Goal-Focused Prep</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Every study plan is tailored to the student's target score, strengths, and areas for growth.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Experienced Tutors</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Our tutors know the SAT inside and out and are passionate about making concepts click.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Award className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Proven Results</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Students leave our program with stronger scores and the confidence to tackle any challenge.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Real SAT Practice</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Our practice tests mirror the format, timing, and rigor of the actual SAT.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Flexible Scheduling</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Sessions fit around busy school schedules so students can prep without the stress.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Accessible Learning</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Quality tutoring should be within reach. We keep our resources clear, organized, and easy to use.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-elevated sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to start preparing?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
            Try a free SAT-style practice test and see how our approach can help you improve.
          </p>
          <a
            href="/practice"
            className="mt-8 inline-flex items-center rounded-xl bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary shadow-soft transition-all hover:bg-primary-foreground/90"
          >
            Take a Practice Test
          </a>
        </section>
      </main>
    </div>
  );
}
