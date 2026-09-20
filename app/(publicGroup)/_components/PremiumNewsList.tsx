import { IPost } from "@/lib/types";
import NewsCard from "./NewsCard";
import { getPremiumNews } from "../_actions/getPremiunNews";
import NewsPagination from "./NewsPagination";

export const PremiumNews = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const result = await getPremiumNews({ query });

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load premium news</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const posts = result.data ?? [];
  const totalPages = result.meta?.totalPage ?? 1;
  const page = Number(query?.page) || 1;

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">No premium stories yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          New stories will show up here as soon as they are published.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: IPost) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>

      <NewsPagination page={page} totalPages={totalPages} />
    </>
  );
};
