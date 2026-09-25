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
  postId: string; // ← add this
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
  postId, // ← add this
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
      const result = await deleteComment(id, revalidateTagName);
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
      const result = await updateCommentStatus(id, postId, next); // ← pass postId
      if (result.success) {
        toast.success(`Comment ${next.toLowerCase()}`);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update status.");
      }
    });
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          {authorName && <p className="text-sm font-medium">{authorName}</p>}
          {postTitle && (
            <p className="truncate text-xs text-muted-foreground">
              on &quot;{postTitle}&quot;
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {status && (
            <Badge
              // around the Badge component
              variant={
                status === "APPROVED"
                  ? "default"
                  : status === "REJECT" // ← change from "REJECTED" to "REJECT"
                    ? "destructive"
                    : "secondary"
              }
            >
              {status}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>

      <p className="mt-2 whitespace-pre-line text-sm text-foreground/90">
        {content}
      </p>

      <div className="mt-3 flex justify-end gap-2">
        {showModeration && status !== "APPROVED" && (
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={() => handleModerate("APPROVED")}
          >
            <Check className="size-4" aria-hidden />
            Approve
          </Button>
        )}
        {showModeration && status !== "REJECT" && (
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={() => handleModerate("REJECT")}
          >
            <X className="size-4" aria-hidden />
            Reject
          </Button>
        )}
        {canDelete && (
          <Button
            size="sm"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            <Trash2 className="size-4" aria-hidden />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
