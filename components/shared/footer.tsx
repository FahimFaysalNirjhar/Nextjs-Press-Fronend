// components/shared/footer.tsx
import { Suspense } from "react";
import Link from "next/link";
import { Crown } from "lucide-react";

import { getMe } from "@/service/getMe";
import { getDashboard } from "@/lib/dashboard-links";
import CurrentYear from "./current-year";

const linkClass =
  "inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground hover:underline hover:underline-offset-4";

const headingClass =
  "font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Premium News", href: "/premium", premium: true },
  { label: "About", href: "/about" },
];

const companyLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
];

/* ---------- Account column (depends on the session) ---------- */

async function AccountLinks() {
  const result = await getMe();

  // Same user object the navbar reads. Tolerates the role being on the user
  // or nested under `profile`.
  const user = result.success ? result.data : null;
  const role = user?.role ?? user?.profile?.role;
  const dashboard = getDashboard(role);

  const links = user
    ? [
        { label: dashboard.label, href: dashboard.href },
        { label: "Subscribe", href: "/payment" },
      ]
    : [
        { label: "Login", href: "/Login" },
        { label: "Register", href: "/Register" },
        { label: "Subscribe", href: "/payment" },
      ];

  return (
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className={linkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AccountLinksFallback() {
  return (
    <ul className="mt-4 space-y-3" aria-hidden>
      {[20, 16, 24].map((w, i) => (
        <li key={i}>
          <div
            className="h-4 animate-pulse rounded bg-muted motion-reduce:animate-none"
            style={{ width: `${w * 4}px` }}
          />
        </li>
      ))}
    </ul>
  );
}

/* ---------- Footer ---------- */

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

          {/* Explore */}
          <nav aria-label="Explore">
            <h2 className={headingClass}>Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.premium && (
                      <Crown className="size-3.5 text-amber-500" aria-hidden />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Account (role-based) */}
          <nav aria-label="Account">
            <h2 className={headingClass}>Account</h2>
            <Suspense fallback={<AccountLinksFallback />}>
              <AccountLinks />
            </Suspense>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className={headingClass}>Company</h2>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
