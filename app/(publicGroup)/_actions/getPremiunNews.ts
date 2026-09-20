import { cookies } from "next/headers";

export const getPremiumNews = async ({
  search,
}: {
  search?: { [key: string]: string | string[] | undefined };
}) => {
  const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ""}`;

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
    `${process.env.BACKEND_API_URL}/api/premium${searchTerm}`,
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
