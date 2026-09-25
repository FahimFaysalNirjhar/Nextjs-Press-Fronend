"use server";

import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export const deleteComment = async (commentId: string, postId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Please log in to delete comments." };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/comments/${commentId}`,
      {
        method: "DELETE",
        headers: { cookie: `accessToken=${accessToken}` },
      },
    );

    const result = await res.json();

    if (result.success) {
      updateTag(`comments-${postId}`);
    }

    return result;
  } catch (error) {
    console.error("Delete comment failed:", error);
    return {
      success: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
};
