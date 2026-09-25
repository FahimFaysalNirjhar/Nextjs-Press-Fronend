import { AuthorCommentList } from "./AuthorCommentList";

export default function AuthorDashboardPage() {
  return (
    <div className="space-y-8">
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

        <AuthorCommentList />
      </section>
    </div>
  );
}
