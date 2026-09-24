/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/isAccessTokenExist";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type PostState = {
  success: true;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};

export const createPost = async (prevState: PostState, formData: FormData) => {
  const payload = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    isFeatured: formData.get("isFeatured") === "on",
    isPermium: formData.get("isPermium") === "on",
    tags: (formData.get("tags") as string)?.split(", ").filter(Boolean) ?? [],
  };

  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get("accessToken")?.value;

  // if (!accessToken) {
  //   return { success: false, message: "User not logged in." };
  // }

  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    method: "POST",
    headers: {
      cookie: `accessToken=${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  // Backend currently throws a plain Error (500, no errorCode) for this
  // specific case, so we match on the known message text instead.
  // Fragile by nature: if that exact wording changes on the backend,
  // this stops matching. Update SUBSCRIPTION_MESSAGE below if it does.
  const SUBSCRIPTION_MESSAGE = "you are not a premium user";

  const needsSubscription =
    typeof result.message === "string" &&
    result.message.toLowerCase().includes(SUBSCRIPTION_MESSAGE);

  if (needsSubscription) {
    redirect("/payment");
  }

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
    revalidateTag(result.data.isPermium ? "premium-posts" : "public-posts", {
      expire: 0,
    });
  }

  return result;
};

export const updatePost = async (
  postId: string,
  prevState: PostState,
  formData: FormData,
) => {
  const payload = {
    title: formData.get("title") ?? "",
    content: formData.get("content") ?? "",
    thumbnail: formData.get("thumbnail") ?? "",
    isFeatured: formData.get("isFeatured") === "on",
    isPermium: formData.get("isPermium") === "on",
    tags: (formData.get("tags") as string).split(", ") ?? "",
  };

  // const cookieStore = await cookies();

  // const accessToken = cookieStore.get("accessToken")?.value;
  // console.log(accessToken);

  // if (!accessToken) {
  //   return {
  //     success: false,
  //     message: "User not not logged in.",
  //   };
  // }

  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts/${postId}`,
    {
      method: "PATCH",
      headers: {
        cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }

  if (result.success && result.data.isPermium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("public-posts", {
      expire: 0,
    });
  }
  return result;
};

export const deletePost = async (postId: string) => {
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
    `${process.env.BACKEND_API_URL}/api/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }

  if (result.success && result.data.isPermium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("public-posts", {
      expire: 0,
    });
  }
  return result;
};

export const getMyPosts = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  console.log(accessToken);

  if (!accessToken) {
    return {
      success: false,
      message: "User not not logged in.",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/my-posts`, {
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["my-posts"],
    },
  });

  const result = await res.json();
  console.log(result);
  return result;
};
