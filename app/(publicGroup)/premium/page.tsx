import type { Metadata } from "next";
import { Suspense } from "react";
import { Lock } from "lucide-react";
import { NewsSkeleton } from "../_components/NewsSkeleton";
import { PremiumNews } from "../_components/PremiumNewsList";

export const metadata: Metadata = {
  title: "Premium news",
  description: "Long reads, analysis and data stories for subscribers.",
};

export default function PremiumNewsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Static header renders immediately, only the list waits on the database */}
      <header className="mb-8 max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Lock className="size-4" aria-hidden />
          Subscribers only
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Premium news
        </h1>
        <p className="mt-3 text-muted-foreground">
          Long reads, analysis and data stories.
        </p>
      </header>

      <Suspense fallback={<NewsSkeleton />}>
        <PremiumNews />
      </Suspense>
    </section>
  );
}
