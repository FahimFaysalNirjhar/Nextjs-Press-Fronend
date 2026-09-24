import { Suspense } from "react";
import { NewsSkeleton } from "../../_components/NewsSkeleton";
import PostContent from "../_components/PostContent";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <article className="pb-20">
      <Suspense fallback={<NewsSkeleton />}>
        <PostContent params={params} />
      </Suspense>
    </article>
  );
}
