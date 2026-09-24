// app/(publicGroup)/contact/page.tsx
import type { Metadata } from "next";
import { CreditCard, Lightbulb, Mail, PenLine } from "lucide-react";
import { CONTACT_EMAIL, SITE_NAME } from "../_config/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team.`,
};

const channels = [
  {
    icon: Lightbulb,
    title: "Story tips",
    text: "Know something we should look into? Send us the details.",
    subject: "Story tip",
  },
  {
    icon: PenLine,
    title: "Corrections & feedback",
    text: "Spotted a mistake or have a suggestion? We want to hear it.",
    subject: "Correction or feedback",
  },
  {
    icon: CreditCard,
    title: "Subscriptions & billing",
    text: "Questions about premium, payments or your account.",
    subject: "Subscription help",
  },
];

export default function ContactPage() {
  return (
    <div className="pb-24">
      <header className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 sm:pt-20">
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-400">
          Contact
        </p>
        <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          We&apos;d love to hear from you.
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-serif text-lg leading-8 text-muted-foreground">
          Tips, corrections, questions or feedback: choose the topic below and
          your email app will open with the subject filled in.
        </p>
      </header>

      <section className="mx-auto mt-14 grid max-w-5xl gap-px overflow-hidden rounded-xl border bg-border px-0 md:grid-cols-3">
        {channels.map(({ icon: Icon, title, text, subject }) => (
          <a
            key={title}
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}
            className="group bg-background p-6 transition-colors hover:bg-muted/50 sm:p-8"
          >
            <Icon className="size-6" aria-hidden />
            <h2 className="mt-4 font-serif text-xl font-bold group-hover:underline group-hover:underline-offset-4">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </a>
        ))}
      </section>

      <section className="mx-auto mt-14 max-w-2xl px-4 text-center sm:px-6">
        <div className="border-y py-8">
          <Mail className="mx-auto size-5 text-muted-foreground" aria-hidden />
          <p className="mt-3 font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Or write to us directly
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 inline-block font-serif text-2xl font-bold underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            We read every message and aim to reply within a few working days.
          </p>
        </div>
      </section>
    </div>
  );
}
