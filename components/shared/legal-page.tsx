// components/shared/legal-page.tsx
export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({ title, intro, updated, sections }: LegalPageProps) {
  return (
    <div className="pb-24">
      <header className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-400">
          Legal
        </p>
        <h1 className="mt-3 text-balance font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 font-serif text-lg leading-8 text-muted-foreground">
          {intro}
        </p>
        <p className="mt-4 border-t pt-4 font-sans text-xs uppercase tracking-widest text-muted-foreground">
          Last updated: {updated}
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-5xl gap-12 px-4 sm:px-6 lg:grid-cols-[14rem_1fr]">
        {/* Table of contents (desktop only) */}
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-20">
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
              On this page
            </p>
            <ol className="mt-4 space-y-2 border-l text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-2xl space-y-10">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-20">
              <h2 className="font-serif text-2xl font-bold tracking-tight">
                {i + 1}. {s.title}
              </h2>
              <div className="mt-3 space-y-4 text-[15px] leading-7 text-foreground/85">
                {s.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.bullets && (
                  <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
