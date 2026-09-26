/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboardGroup)/admin-dashboard/posts/PostRow.tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Lock, Trash2, Loader2 } from "lucide-react";
import { deletePost } from "../../_actions/postActions";
import { EditPostDialog } from "./EditPostDialog";

const statusStyles: Record<string, string> = {
  PUBLISHED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  DRAFT: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  ARCHIVED: "bg-muted text-muted-foreground border-border",
};

type Props = {
  post: any;
};

export function PostRow({ post }: Props) {
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const created = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deletePost(post.id);
      if (result.success) {
        router.refresh();
      } else {
        setError(result.message ?? "Failed to delete post.");
        setConfirming(false);
      }
    });
  };

  return (
    <tr className="border-b last:border-b-0">
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
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <EditPostDialog
            post={{
              id: post.id,
              title: post.title,
              status: post.status,
              isFeatured: post.isFeatured,
              isPermium: post.isPermium,
            }}
          />

          {confirming ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 className="size-3.5 animate-spin" aria-hidden />
                ) : (
                  "Confirm"
                )}
              </button>
              <button
                onClick={() => setConfirming(false)}
                disabled={isPending}
                className="rounded-md border px-2 py-1 text-xs font-medium disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              aria-label={`Delete "${post.title}"`}
            >
              <Trash2 className="size-4" aria-hidden />
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </td>
    </tr>
  );
}
