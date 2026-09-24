// app/(publicGroup)/_actions/getHomePosts.ts
import type { IPost } from "@/lib/types";

export async function getHomePosts(limit = 30): Promise<IPost[]> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/posts?limit=${limit}`, // adjust to your endpoint
      { next: { revalidate: 300, tags: ["posts"] } }, // public data, same for everyone
    );
    if (!res.ok) return [];
    const json = await res.json();
    const list = Array.isArray(json?.data)
      ? json.data
      : (json?.data?.posts ?? json?.data?.data ?? []);
    return list as IPost[];
  } catch {
    return [];
  }
}
