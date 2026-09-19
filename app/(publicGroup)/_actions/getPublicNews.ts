import { cookies } from "next/headers";

export const getPublicNews = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 6, tags: ["premium-posts"] },
  });

  const result = await res.json();

  return result;
};
