// _actions/statsActions.ts
"use server";

import { cookies } from "next/headers";

async function authFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in." };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}${path}`, {
      ...options,
      headers: {
        cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
        ...options.headers,
      },
    });
    return await res.json();
  } catch (error) {
    console.error(`Request failed: ${path}`, error);
    return {
      success: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
}

export const getPostsStats = async () => {
  return authFetch("/api/posts/stats");
};
