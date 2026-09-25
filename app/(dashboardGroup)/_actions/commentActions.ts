"use server";

import { getMe } from "@/service/getMe";
import { revalidateTag } from "next/cache";
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

// Create a comment on a post
export const createComment = async (
  postId: string,
  prevState: { success: boolean; message: string },
  formData: FormData,
) => {
  const content = formData.get("content");

  if (!content || String(content).trim().length === 0) {
    return { success: false, message: "Comment can't be empty." };
  }

  const result = await authFetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ postId, content }),
  });

  if (result.success) {
    revalidateTag(`comments-${postId}`, {
      expire: 0,
    });
  }

  return result;
};

export const getMyComments = async () => {
  return authFetch("/api/comments/my-comments");
};
// Comments on a single post (used on the article page)
export const getCommentsByPostId = async (postId: string) => {
  return authFetch(`/api/comments/${postId}`);
};

// AUTHOR: comments left on posts I wrote
export const getCommentsOnMyPosts = async () => {
  const me = await getMe();

  if (!me.success) {
    return { success: false, message: "User not logged in." };
  }

  const authorId = me.data.profile.id;
  return authFetch(`/api/comments/author/${authorId}`);
};

// ADMIN: every comment, optionally filtered by status
export const getAllComments = async (status?: string) => {
  const query = status ? `?status=${status}` : "";
  return authFetch(`/api/comments${query}`);
};

// Edit a comment's own content (owner, per your PATCH /:commentId route)
export const updateComment = async (
  commentId: string,
  tag: string,
  prevState: { success: boolean; message: string },
  formData: FormData,
) => {
  const content = formData.get("content");

  if (!content || String(content).trim().length === 0) {
    return { success: false, message: "Comment can't be empty." };
  }

  const result = await authFetch(`/api/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });

  if (result.success) {
    revalidateTag(tag, {
      expire: 0,
    });
  }

  return result;
};

// ADMIN: approve or reject a comment
export const updateCommentStatus = async (
  commentId: string,
  postId: string,
  status: "APPROVED" | "REJECT",
) => {
  const result = await authFetch(`/api/comments/${commentId}/moderate`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  if (result.success) {
    revalidateTag("all-comments", { expire: 0 });
    revalidateTag(`comments-${postId}`, { expire: 0 });
  }

  return result;
};

// Shared: delete a comment (owner, post's author, or admin — backend enforces the rule)
export const deleteComment = async (commentId: string, tag: string) => {
  const result = await authFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (result.success) {
    revalidateTag(tag, {
      expire: 0,
    });
  }

  return result;
};
