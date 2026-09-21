import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsSkeleton } from "../_components/NewsSkeleton";
import { PublicNewsList } from "../_components/PublicNewsList";
import NewsSearchBar from "../_components/NewsSearchBar";
import NewsFilters from "../_components/NewsFilters";

export const metadata: Metadata = {
  title: "Latest news",
  description: "Free-to-read stories from the newsroom.",
};

export default function PublicNewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
      <header className="mb-8 flex flex-col gap-6 border-b pb-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Latest news
          </h1>
          <p className="mt-3 text-muted-foreground">
            Free to read. Fresh stories from the newsroom.
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

      <Suspense
        fallback={
          <div className="mb-6 h-10 w-full animate-pulse rounded-md bg-muted sm:w-96" />
        }
      >
        <NewsFilters />
      </Suspense>

      <Suspense fallback={<NewsSkeleton />}>
        <PublicNewsList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
