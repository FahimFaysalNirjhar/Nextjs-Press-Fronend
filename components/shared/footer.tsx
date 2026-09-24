// components/footer.tsx
import { Suspense } from "react";
import Link from "next/link";
import { Crown } from "lucide-react";

import CurrentYear from "./current-year";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "News", href: "/news" },
      { label: "Premium News", href: "/premium", premium: true },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/Login" },
      { label: "Register", href: "/Register" },
      { label: "Subscribe", href: "/payment" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-serif text-2xl font-bold tracking-tight"
            >
              Nextjs Press
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Independent news, clear reporting and in-depth stories for readers
              who want the full picture.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground hover:underline hover:underline-offset-4"
                    >
                      {link.premium && (
                        <Crown
                          className="size-3.5 text-amber-500"
                          aria-hidden
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            ©{" "}
            <Suspense fallback="2026">
              <CurrentYear />
            </Suspense>{" "}
            Nextjs Press. All rights reserved.
          </p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
