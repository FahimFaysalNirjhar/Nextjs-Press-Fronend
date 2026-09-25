// app/(dashboardGroup)/dashboard/page.tsx
import { Suspense } from "react";
import { MessageSquare } from "lucide-react";

import { getMyComments } from "../_actions/commentActions";
import { SubscriptionStatusCard } from "../_components/subscription/SubscriptionStatusCard";
import { MyCommentListSkeleton } from "./comments/MyCommentListSkeleton";
import { MyCommentList } from "./comments/MyCommentList";
// import { getMyPosts } from "../_actions/postActions"; // adjust to your actual action

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

      {/* Stats overview */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Suspense fallback={<StatCardSkeleton />}>
          <CommentCountCard />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-22 animate-pulse rounded-xl border bg-muted/40" />
          }
        >
          <SubscriptionStatusCard />
        </Suspense>
      </section>

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

async function CommentCountCard() {
  const result = await getMyComments();
  const count = Array.isArray(result?.data) ? result.data.length : 0;

  return (
    <StatCard
      icon={MessageSquare}
      value={count}
      label={`Comment${count === 1 ? "" : "s"} posted`}
    />
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number | string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      <Icon className="size-5 text-muted-foreground" aria-hidden />
      <div>
        <p className="text-2xl font-semibold leading-none">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      <div className="size-5 animate-pulse rounded-full bg-muted" />
      <div className="space-y-2">
        <div className="h-6 w-10 animate-pulse rounded bg-muted" />
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
