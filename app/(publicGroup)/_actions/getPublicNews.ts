export const getPublicNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  if (query?.tag) {
    params.set("tags", JSON.stringify([query.tag]));
  }

  if (query?.sort) {
    const [sortBy, sortOrder] = (query.sort as string).split("-");

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
  }

  params.set("page", (query?.page as string) || "1");
  params.set("limit", "9");

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts?${params.toString()}`,
    {
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 6, tags: ["public-posts"] },
    },
  );

  const result = await res.json();

  return result;
};
