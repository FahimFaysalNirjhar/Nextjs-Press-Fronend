"use client";

import Image from "next/image";
import { useTransition } from "react";
import { Lock, Pencil, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PostFormDialog from "./PostFormDialog";

import { IPost } from "@/lib/types";
import { deletePost } from "../_actions/myPostsActions";
import { toast } from "sonner";

export default function MyPostCard({ post }: { post: IPost }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Delete "${post.title}"? This can't be undone.`)) return;

    startTransition(async () => {
      const result = await deletePost(post.id);
      if (result.success) {
        toast.success(result.message || "Post deleted");
      } else {
        toast.error(result.message || "Failed to delete the post.");
      }
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="relative h-40 w-full bg-muted">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No thumbnail
          </div>
        )}

        <div className="absolute left-3 top-3 flex gap-1.5">
          {post.isFeatured && (
            <Badge className="gap-1 bg-amber-400 text-black hover:bg-amber-400">
              <Star className="size-3" aria-hidden />
              Featured
            </Badge>
          )}
          {post.isPermium && (
            <Badge variant="secondary" className="gap-1">
              <Lock className="size-3" aria-hidden />
              Premium
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-medium leading-snug">{post.title}</h3>

        {post.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <PostFormDialog
            post={post}
            trigger={
              <Button variant="outline" size="sm" className="flex-1">
                <Pencil className="size-4" aria-hidden />
                Edit
              </Button>
            }
          />
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="size-4" aria-hidden />
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
