// UserDashboardPage.tsx
import { Suspense } from "react";
import { MyCommentList } from "./MyCommentList";
import { MyCommentListSkeleton } from "./MyCommentListSkeleton";

export default function UserDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-6 py-10 sm:px-10 lg:px-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and view your activity.
        </p>
      </div>

      {/* Comments Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Your Comments</h2>
          <p className="text-sm text-muted-foreground">
            Comments you&apos;ve left on stories across the site.
          </p>
        </div>

        <Suspense fallback={<MyCommentListSkeleton />}>
          <MyCommentList />
        </Suspense>
      </section>
    </div>
  );
}
