/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboardGroup)/admin-dashboard/posts/AllPostsList.tsx
import Link from "next/link";
import { Newspaper, Star, Lock } from "lucide-react";
import { getAllPostsForAdmin } from "../../_actions/postActions";

const statusStyles: Record<string, string> = {
  PUBLISHED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  DRAFT: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  ARCHIVED: "bg-muted text-muted-foreground border-border",
};

export async function AllPostsList() {
  const result = await getAllPostsForAdmin();

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load posts</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const posts = Array.isArray(result.data) ? result.data : [];

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <Newspaper
          className="mx-auto mb-2 size-6 text-muted-foreground"
          aria-hidden
        />
        <p className="font-medium">No posts yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Author</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Flags</th>
            <th className="px-4 py-3 font-medium">Views</th>
            <th className="px-4 py-3 font-medium">Comments</th>
            <th className="px-4 py-3 font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => {
            const created = new Date(post.createdAt).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            );

            return (
              <tr key={post.id} className="border-b last:border-b-0">
                <td className="max-w-xs truncate px-4 py-3 font-medium">
                  <Link href={`/news/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {post.author?.name ?? "Unknown"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                      statusStyles[post.status] ?? statusStyles.DRAFT
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    {post.isFeatured && (
                      <Star
                        className="size-4 fill-amber-500 text-amber-500"
                        aria-label="Featured"
                      />
                    )}
                    {post.isPermium && (
                      <Lock
                        className="size-4 text-muted-foreground"
                        aria-label="Premium"
                      />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {post.views?.toLocaleString() ?? 0}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {post._count?.comments ?? 0}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{created}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
