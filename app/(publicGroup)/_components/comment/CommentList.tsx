/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCommentsByPostId } from "../../_actions/getCommentsByPostId";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author?: { name?: string; profile?: { profilePhoto?: string | null } };
};

export async function CommentList({ postId }: { postId: string }) {
  const result = await getCommentsByPostId(postId);

  const raw = result?.data;
  const comments: Comment[] = Array.isArray(raw)
    ? raw.filter((c: any) => c.status === "APPROVED")
    : [];

  if (!result?.success) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Couldn&apos;t load comments right now.
      </p>
    );
  }

  if (comments.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No comments yet. Be the first to share your thoughts.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => {
        const date = new Date(comment.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        return (
          <div key={comment.id} className="flex gap-3">
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
              <p className="mt-1 whitespace-pre-line text-sm text-foreground/90">
                {comment.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
