import { Suspense } from "react";
import { AdminCommentList } from "./AdminCommentList";

export default function AdminCommentsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 lg:px-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">All comments</h1>
        <p className="mt-1 text-muted-foreground">
          Moderate comments across the platform.
        </p>
      </header>
      <Suspense
        fallback={
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-xl border bg-muted/40"
              />
            ))}
          </div>
        }
      >
        <AdminCommentList />
      </Suspense>
    </div>
  );
}
