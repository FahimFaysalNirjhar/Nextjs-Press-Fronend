// _actions/postActions.ts (add to existing file, or create if it doesn't exist)
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

export const getAllPostsForAdmin = async () => {
  return authFetch("/api/posts/admin/all");
};

export const deletePost = async (postId: string) => {
  return authFetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
};

export const updatePost = async (
  postId: string,
  payload: {
    title?: string;
    status?: string;
    isFeatured?: boolean;
    isPermium?: boolean;
  },
) => {
  return authFetch(`/api/posts/${postId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
