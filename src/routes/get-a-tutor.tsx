import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { ChevronDown, ClipboardList, Search, MessageCircle, UserCheck, CalendarClock } from "lucide-react";
import { useState } from "react";

// Replace with your actual Google Form embed URL (Send > Embed <> in Google Forms)
const GOOGLE_FORM_EMBED_URL = "YOUR_GOOGLE_FORM_EMBED_LINK";
// Change this to an email (mailto:) or a page path like "/contact"
const CONTACT_CTA_HREF = "mailto:contact@learningtoall.com";

export const Route = createFileRoute("/get-a-tutor")({
  head: () => ({
    meta: [
      { title: "Get a Tutor — Learning to All Tutoring" },
      { name: "description", content: "Request a tutor at Learning to All Tutoring. Fill out our short form and we'll match you with a tutor who fits your schedule and learning goals." },
      { property: "og:title", content: "Get a Tutor — Learning to All Tutoring" },
      { property: "og:description", content: "Request a tutor at Learning to All Tutoring. Fill out our short form and we'll match you with a tutor who fits your schedule and learning goals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GetATutorPage,
});

function GetATutorPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Hero */}
        <section className="text-center animate-in fade-in duration-700">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Get a Tutor
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Fill out the form below and we'll match you with a tutor who fits your schedule and learning goals.
          </p>
          <a
            href="#request-form"
            aria-label="Scroll to request form"
            className="mt-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-soft transition-all hover:text-primary hover:shadow-elevated"
          >
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </section>

        {/* Form + info */}
        <section id="request-form" className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Request a Tutor</h2>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft">
              {GOOGLE_FORM_EMBED_URL === "YOUR_GOOGLE_FORM_EMBED_LINK" ? (
                <div className="flex min-h-[600px] flex-col items-center justify-center gap-3 p-10 text-center">
                  <ClipboardList className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Google Form embed goes here. Replace{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">GOOGLE_FORM_EMBED_URL</code>{" "}
                    at the top of <code className="rounded bg-muted px-1.5 py-0.5 text-xs">src/routes/get-a-tutor.tsx</code>.
                  </p>
                </div>
              ) : (
                <iframe
                  src={GOOGLE_FORM_EMBED_URL}
                  title="Request a Tutor Form"
                  className="h-[1200px] w-full border-0"
                  loading="lazy"
                >
                  Loading form…
                </iframe>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <h3 className="text-base font-semibold text-foreground">What happens next?</h3>
              <ol className="mt-4 space-y-4">
                {[
                  { icon: ClipboardList, text: "Submit the form." },
                  { icon: Search, text: "We'll review your request." },
                  { icon: MessageCircle, text: "We'll contact you using your preferred method." },
                  { icon: UserCheck, text: "We'll match you with an available tutor." },
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <step.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold text-foreground">Tutor Availability</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Our tutors are available throughout the week, including mornings, afternoons, evenings, and weekends. We'll do our best to match your requested schedule.
              </p>
            </div>
          </aside>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            <FaqItem
              question="How quickly will I hear back?"
              answer="Usually within 24 hours."
            />
            <FaqItem
              question="Are online sessions available?"
              answer="Yes. We offer 100% online sessions."
            />
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-20 rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-elevated sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Need help before submitting the form?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
            Reach out and we'll be happy to answer any questions.
          </p>
          <Link
            to={CONTACT_CTA_HREF as string}
            className="mt-8 inline-flex items-center rounded-xl bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary shadow-soft transition-all hover:bg-primary-foreground/90"
          >
            Contact Us
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
