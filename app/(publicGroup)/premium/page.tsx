import type { Metadata } from "next";
import { Suspense } from "react";
import { Lock } from "lucide-react";
import { NewsSkeleton } from "../_components/NewsSkeleton";
import { PremiumNews } from "../_components/PremiumNewsList";
import NewsSearchBar from "../_components/NewsSearchBar";

export const metadata: Metadata = {
  title: "Premium news",
  description: "Long reads, analysis and data stories for subscribers.",
};

export default async function PremiumNewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
      <header className="mb-8 flex flex-col gap-6 border-b pb-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Lock className="size-3.5" aria-hidden />
            Subscribers only
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Premium news
          </h1>
          <p className="mt-3 text-muted-foreground">
            Long reads, analysis and data stories.
          </p>
        </div>

        <div className="w-full md:max-w-sm lg:max-w-md">
          <Suspense
            fallback={
              <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            }
          >
            <NewsSearchBar />
          </Suspense>
        </div>
      </header>

      {/* key makes the skeleton show again on every new search */}
      <Suspense fallback={<NewsSkeleton />}>
        <PremiumNews searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
