// AuthorDashboardPage.tsx
import { Suspense } from "react";
import { AuthorCommentList } from "./AuthorCommentList";
import { MyCommentListSkeleton } from "../../dashboard/comments/MyCommentListSkeleton";

// or wherever you keep it — reuse the same skeleton, the row shape is identical

export default function AuthorDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-6 py-10 sm:px-10 lg:px-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Author Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your content and view comments on your posts.
        </p>
      </div>

      {/* Comments Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Comments on Your Posts</h2>
          <p className="text-sm text-muted-foreground">
            View and manage comments from readers on your stories.
          </p>
        </div>

        <Suspense fallback={<MyCommentListSkeleton />}>
          <AuthorCommentList />
        </Suspense>
      </section>
    </div>
  );
}
