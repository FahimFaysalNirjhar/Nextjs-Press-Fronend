// app/(dashboardGroup)/dashboard/apply/page.tsx
import { Suspense } from "react";
import { AuthorRequestCard } from "./AuthorRequestCard";

export default function BecomeAuthorPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Become an author</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Apply to start writing and publishing your own stories.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-32 animate-pulse rounded-xl border bg-muted/40" />
        }
      >
        <AuthorRequestCard />
      </Suspense>
    </div>
  );
}
