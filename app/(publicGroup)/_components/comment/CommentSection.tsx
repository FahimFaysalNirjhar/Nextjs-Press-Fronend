import { Suspense } from "react";
import { MessageSquare } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

function CommentListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="size-8 animate-pulse rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CommentSection({ postId }: { postId: string }) {
  return (
    <section className="mx-auto mt-14 max-w-2xl px-4 sm:px-6">
      <div className="border-t pt-8">
        <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
          <MessageSquare className="size-5" aria-hidden />
          Comments
        </h2>

        <CommentForm postId={postId} />

        <div className="mt-8">
          <Suspense fallback={<CommentListSkeleton />}>
            <CommentList postId={postId} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
