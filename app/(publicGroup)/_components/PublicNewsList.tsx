import { IPost } from "@/lib/types";
import NewsCard from "./NewsCard";
import { getPublicNews } from "../_actions/getPublicNews";
import NewsPagination from "./NewsPagination";

export const PublicNewsList = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const result = await getPublicNews({ query });

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load the news</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const allPosts: IPost[] = result.data ?? [];

  // Safety net: never show premium posts on the public page
  const publicPosts = allPosts.filter((post) => !post.isPermium);

  // Featured on top; each group keeps the order chosen by the sort dropdown
  const posts = [
    ...publicPosts.filter((post) => post.isFeatured),
    ...publicPosts.filter((post) => !post.isFeatured),
  ];

  const totalPages = result.meta?.totalPage ?? 1;
  const page = Number(query?.page) || 1;
  const hasFilters = Boolean(query?.searchTerm || query?.tag);

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">
          {hasFilters ? "No stories found" : "No news yet"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasFilters
            ? "Try a different search or filter."
            : "New stories will show up here as soon as they are published."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>

      <NewsPagination page={page} totalPages={totalPages} />
    </>
  );
};
