"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Check, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  deleteComment,
  updateCommentStatus,
} from "../../_actions/commentActions";

type CommentRowProps = {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  status?: string;
  authorName?: string;
  postTitle?: string;
  revalidateTagName: string;
  showModeration?: boolean;
  canDelete?: boolean;
};

export function CommentRow({
  id,
  postId,
  content,
  createdAt,
  status,
  authorName,
  postTitle,
  revalidateTagName,
  showModeration = false,
  canDelete = true,
}: CommentRowProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDelete = () => {
    if (!confirm("Delete this comment? This can't be undone.")) return;

    startTransition(async () => {
      const result = await deleteComment(id, postId, revalidateTagName);
      if (result.success) {
        toast.success(result.message || "Comment deleted");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete comment.");
      }
    });
  };

  const handleModerate = (next: "APPROVED" | "REJECT") => {
    startTransition(async () => {
      const result = await updateCommentStatus(id, postId, next);
      if (result.success) {
        toast.success(`Comment ${next.toLowerCase()}`);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update status.");
      }
    });
  };

  return (
    <div className="group mb-4 rounded-xl border bg-card p-5 transition-colors hover:border-border/80">
      {/* Top row: avatar + author/post info + status/date */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
            {authorName?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {authorName && (
                <p className="text-sm font-semibold leading-none">
                  {authorName}
                </p>
              )}
              {status && (
                <Badge
                  variant={
                    status === "APPROVED"
                      ? "default"
                      : status === "REJECT"
                        ? "destructive"
                        : "secondary"
                  }
                  className="h-5 px-1.5 text-[10px] font-medium uppercase tracking-wide"
                >
                  {status}
                </Badge>
              )}
            </div>
            {postTitle && (
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                on &quot;{postTitle}&quot;
              </p>
            )}
          </div>
        </div>

        <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">
          {date}
        </span>
      </div>

      {/* Comment content */}
      <p className="mt-3 whitespace-pre-line pl-12 text-sm leading-relaxed text-foreground/90">
        {content}
      </p>

      {/* Actions */}
      {(showModeration || canDelete) && (
        <div className="mt-4 flex justify-end gap-2 border-t pt-3">
          {showModeration && status !== "APPROVED" && (
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={() => handleModerate("APPROVED")}
              className="h-8 gap-1.5 text-xs"
            >
              <Check className="size-3.5" aria-hidden />
              Approve
            </Button>
          )}
          {showModeration && status !== "REJECT" && (
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={() => handleModerate("REJECT")}
              className="h-8 gap-1.5 text-xs"
            >
              <X className="size-3.5" aria-hidden />
              Reject
            </Button>
          )}
          {canDelete && (
            <Button
              size="sm"
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
              className="h-8 gap-1.5 text-xs"
            >
              <Trash2 className="size-3.5" aria-hidden />
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
