import { Suspense } from "react";
import { NewsSkeleton } from "../../_components/NewsSkeleton";
import PremiumPostContent from "../_component/PremiumPostContent";

export default async function PremiumPostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <article className="pb-20">
      <Suspense fallback={<NewsSkeleton />}>
        <PremiumPostContent params={params} />
      </Suspense>
    </article>
  );
}
