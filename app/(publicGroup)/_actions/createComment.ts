/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type CommentState = {
  success: boolean;
  message: string;
  data?: Record<string, any>;
};

export const createComment = async (
  postId: string,
  prevState: CommentState,
  formData: FormData,
) => {
  const content = formData.get("content");

  if (!content || String(content).trim().length === 0) {
    return { success: false, message: "Comment can't be empty." };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Please log in to comment." };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/comments`, {
      method: "POST",
      headers: {
        cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ postId, content }),
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag(`comments-${postId}`, {
        expire: 0,
      });
    }

    return result;
  } catch (error) {
    console.error("Create comment failed:", error);
    return {
      success: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
};
