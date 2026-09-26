// app/(dashboardGroup)/admin-dashboard/applications/page.tsx
import { Suspense } from "react";
import { AuthorApplicationsList } from "./AuthorApplicationsList";

export default function AdminApplicationsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 lg:px-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Author applications
        </h1>
        <p className="mt-1 text-muted-foreground">
          Review and approve requests to become an author.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl border bg-muted/40"
              />
            ))}
          </div>
        }
      >
        <AuthorApplicationsList />
      </Suspense>
    </div>
  );
}
