/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboardGroup)/author-dashboard/page.tsx
import { Suspense } from "react";
import { MessageSquare, FileText, Eye } from "lucide-react";
import { getCommentsOnMyPosts } from "../_actions/commentActions";
import { SubscriptionStatusCard } from "../_components/subscription/SubscriptionStatusCard";
import { AuthorCommentList } from "./comments/AuthorCommentList";
import { getMyPosts } from "../_actions/myPostsActions";

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

      {/* Stats overview */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatCardSkeleton />}>
          <PostStatsCards />
        </Suspense>
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
          <h2 className="text-lg font-semibold">Comments on Your Posts</h2>
          <p className="text-sm text-muted-foreground">
            View and manage comments from readers on your stories.
          </p>
        </div>

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
          <AuthorCommentList />
        </Suspense>
      </section>
    </div>
  );
}

// Two stat cards from one fetch: total posts + total views summed across posts
async function PostStatsCards() {
  const result = await getMyPosts();
  const posts = Array.isArray(result?.data) ? result.data : [];
  const totalViews = posts.reduce(
    (sum: number, p: any) => sum + (p.views ?? 0),
    0,
  );

  return (
    <>
      <StatCard
        icon={FileText}
        value={posts.length}
        label={`Post${posts.length === 1 ? "" : "s"} published`}
      />
      <StatCard
        icon={Eye}
        value={totalViews.toLocaleString()}
        label="Total views"
      />
    </>
  );
}

async function CommentCountCard() {
  const result = await getCommentsOnMyPosts();
  const count = Array.isArray(result?.data) ? result.data.length : 0;

  return (
    <StatCard
      icon={MessageSquare}
      value={count}
      label={`Comment${count === 1 ? "" : "s"} received`}
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
