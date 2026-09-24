// app/(publicGroup)/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Crown,
  Newspaper,
  PenLine,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nextjs Press is an independent news publication. Learn what we cover, how we work and how to support our journalism.",
};

const pillars = [
  {
    icon: Newspaper,
    title: "Free daily news",
    text: "Clear, timely reporting on the stories that matter, open to everyone without a paywall.",
  },
  {
    icon: Crown,
    title: "Premium long reads",
    text: "In-depth analysis, investigations and data stories for readers who want the full picture.",
  },
  {
    icon: Users,
    title: "A reader community",
    text: "Comment on stories, follow the conversation and hold us accountable.",
  },
];

const standards = [
  {
    icon: ShieldCheck,
    title: "Accuracy first",
    text: "We verify before we publish, and we correct mistakes openly and quickly.",
  },
  {
    icon: Scale,
    title: "Fair and independent",
    text: "Our reporting is not for sale. Sponsors and subscribers never influence what we cover.",
  },
  {
    icon: PenLine,
    title: "Accountable authors",
    text: "Every story carries a byline, so you always know who wrote it.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <header className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 sm:pt-20">
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-400">
          About us
        </p>
        <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
          Journalism that respects your time and your intelligence.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty font-serif text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
          Nextjs Press is an independent news publication. We report what
          happened, explain why it matters and leave the rest to you.
        </p>
      </header>

      {/* Mission */}
      <section className="mx-auto mt-16 max-w-2xl px-4 sm:px-6">
        <div className="border-y py-10">
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Our mission
          </h2>
          <div className="mt-5 space-y-5 font-serif text-lg leading-8 text-foreground/90 sm:text-xl sm:leading-9">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:pt-1 first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8]">
              We started Nextjs Press because good information should be easy to
              find and easy to trust. Too much of the news is noisy, rushed or
              hidden behind clutter. We want to do the opposite: fewer
              headlines, better stories and a reading experience that gets out
              of the way.
            </p>
            <p>
              Our newsroom is made up of authors who care about their beats, and
              readers who challenge us to do better. Together we are building a
              publication that is useful today and worth returning to tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <h2 className="text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          What you&apos;ll find here
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-background p-6 sm:p-8">
              <Icon className="size-6 text-foreground" aria-hidden />
              <h3 className="mt-4 font-serif text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Standards */}
      <section className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <p className="text-center font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Editorial standards
        </p>
        <h2 className="mt-3 text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          How we work
        </h2>
        <ul className="mt-10 divide-y border-y">
          {standards.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 py-6">
              <Icon
                className="mt-1 size-5 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <div>
                <h3 className="font-serif text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Premium CTA */}
      <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl bg-zinc-900 px-6 py-12 text-center text-white sm:px-12 sm:py-16 dark:bg-zinc-800">
          <Crown className="mx-auto size-7 text-amber-400" aria-hidden />
          <h2 className="mt-4 text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Support independent journalism
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-white/75">
            A premium subscription gives you unlimited access to our long reads
            and analysis, and directly funds the reporting you read.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-amber-400 text-black hover:bg-amber-300"
            >
              <Link href="/payment">
                Go premium
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/news">Read the latest news</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto mt-16 max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-serif text-2xl font-bold">Get in touch</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Have a tip, a correction or feedback? We read every message.
        </p>
        <p className="mt-3">
          <a
            href="mailto:hello@yourdomain.com"
            className="font-medium underline underline-offset-4"
          >
            hello@yourdomain.com
          </a>
        </p>
      </section>
    </div>
  );
}
