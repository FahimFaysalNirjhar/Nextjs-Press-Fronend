/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageSquare } from "lucide-react";
import { getCommentsOnMyPosts } from "../../_actions/commentActions";
import { CommentRow } from "../../_components/comment/CommentRow";

export async function AuthorCommentList() {
  const result = await getCommentsOnMyPosts();

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load comments</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const comments = Array.isArray(result.data) ? result.data : [];

  if (comments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <MessageSquare
          className="mx-auto mb-2 size-6 text-muted-foreground"
          aria-hidden
        />
        <p className="font-medium">No comments yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Comments on your stories will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment: any) => (
        <CommentRow
          key={comment.id}
          id={comment.id}
          postId={comment.postId ?? comment.post?.id}
          content={comment.content}
          createdAt={comment.createdAt}
          status={comment.status}
          authorName={comment.author?.name}
          postTitle={comment.post?.title}
          revalidateTagName="author-comments"
          canDelete
        />
      ))}
    </div>
  );
}
