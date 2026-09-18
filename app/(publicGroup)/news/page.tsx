import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsSkeleton } from "../_components/NewsSkeleton";
import PublicNewsList from "../_components/PublicNewsList";

export const metadata: Metadata = {
  title: "Latest news",
  description: "Free-to-read stories from the newsroom.",
};

export default function PublicNewsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Static header renders immediately, only the list waits on data */}
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Latest news
        </h1>
        <p className="mt-3 text-muted-foreground">
          Free to read. Fresh stories from the newsroom.
        </p>
      </header>

      <Suspense fallback={<NewsSkeleton />}>
        <PublicNewsList />
      </Suspense>
    </section>
  );
}
