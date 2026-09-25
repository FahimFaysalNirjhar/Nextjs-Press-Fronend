/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCommentsByPostId } from "../../_actions/getCommentsByPostId";
import { getCurrentUser } from "../../_actions/getCurrentUser";
import { CommentItem } from "./CommentItem";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  status: string;
  author?: { name?: string; profile?: { profilePhoto?: string | null } };
};

export async function CommentList({ postId }: { postId: string }) {
  const [result, currentUser] = await Promise.all([
    getCommentsByPostId(postId),
    getCurrentUser(),
  ]);

  console.log("currentUser:", currentUser);
  console.log(
    "comments:",
    result?.data?.map((c: any) => ({ id: c.id, authorId: c.authorId })),
  );

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
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          isOwner={currentUser?.id === comment.authorId}
        />
      ))}
    </div>
  );
}
