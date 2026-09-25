import { Suspense } from "react";
import { AdminCommentList } from "./AdminCommentList";

export default function AdminCommentsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">All comments</h1>
        <p className="mt-1 text-muted-foreground">
          Moderate comments across the platform.
        </p>
      </header>
      <Suspense
        fallback={<div className="h-40 animate-pulse rounded-xl bg-muted" />}
      >
        <AdminCommentList />
      </Suspense>
    </div>
  );
}
