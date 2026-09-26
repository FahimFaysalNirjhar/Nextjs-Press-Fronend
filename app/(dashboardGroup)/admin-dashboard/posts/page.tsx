// app/(dashboardGroup)/admin-dashboard/posts/page.tsx
import { Suspense } from "react";
import { AllPostsList } from "./AllPostsList";

export default function AdminPostsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">All posts</h1>
        <p className="mt-1 text-muted-foreground">
          Every post on the platform, including premium content.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-lg border bg-muted/40"
              />
            ))}
          </div>
        }
      >
        <AllPostsList />
      </Suspense>
    </div>
  );
}
