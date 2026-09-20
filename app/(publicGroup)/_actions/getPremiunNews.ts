import { cookies } from "next/headers";

export const getPremiumNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ""}`;

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

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  console.log(accessToken);

  if (!accessToken) {
    return {
      success: false,
      message: "User not not logged in.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/premium?${params.toString()}`,
    {
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 6, tags: ["premium-posts"] },
    },
  );

  const result = await res.json();

  return result;
};
