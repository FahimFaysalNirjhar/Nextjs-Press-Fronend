// _components/comment/CommentSectionSkeleton.tsx

export function CommentSectionSkeleton() {
  return (
    <section className="mx-auto mt-14 max-w-2xl px-4 sm:px-6">
      <div className="border-t pt-6">
        {/* "Comments" heading placeholder */}
        <div className="mb-6 h-4 w-24 animate-pulse rounded bg-muted" />

        {/* Comment form placeholder */}
        <div className="mb-8 space-y-3">
          <div className="h-20 w-full animate-pulse rounded-md bg-muted" />
          <div className="ml-auto h-9 w-24 animate-pulse rounded-md bg-muted" />
        </div>

        {/* A few comment row placeholders */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="size-9 shrink-0 animate-pulse rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                </div>
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
