"use client";

import { useActionState, useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateComment } from "../../_actions/updateComment";
import { deleteComment } from "../../_actions/deleteComment";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author?: { name?: string; profile?: { profilePhoto?: string | null } };
};

export function CommentItem({
  comment,
  postId,
  isOwner,
}: {
  comment: Comment;
  postId: string;
  isOwner: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const router = useRouter();

  const action = updateComment.bind(null, comment.id, postId);
  const [state, formAction, pending] = useActionState(action, {
    success: false,
    message: "",
  });

  if (state.success && isEditing) {
    setIsEditing(false);
  }

  const date = new Date(comment.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDelete = () => {
    if (!confirm("Delete this comment?")) return;
    startDeleteTransition(async () => {
      const result = await deleteComment(comment.id, postId);
      if (result.success) {
        toast.success("Comment deleted");
        router.refresh();
      } else {
        toast.error(result.message || "Could not delete comment.");
      }
    });
  };

  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
        {comment.author?.name?.charAt(0).toUpperCase() ?? "?"}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium">
            {comment.author?.name ?? "Anonymous"}
          </p>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>

        {isEditing ? (
          <form action={formAction} className="mt-2 space-y-2">
            <Textarea
              name="content"
              required
              rows={3}
              defaultValue={comment.content}
              className="resize-none"
            />
            {state.message && !state.success && (
              <p className="text-xs text-destructive">{state.message}</p>
            )}
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={pending}>
                {pending ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <p className="mt-1 whitespace-pre-line text-sm text-foreground/90">
              {comment.content}
            </p>
            {isOwner && (
              <div className="mt-1 flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-xs text-muted-foreground hover:text-destructive hover:underline"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
