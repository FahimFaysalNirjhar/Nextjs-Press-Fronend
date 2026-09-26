import { cookies } from "next/headers";

export const getPremiumPostById = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    // console.log(accessToken);

    if (!accessToken) {
      return {
        success: false,
        message: "User not not logged in.",
      };
    }
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/premium/${id}`,
      {
        headers: {
          cookie: `accessToken=${accessToken}`,
        },
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 6,
          tags: ["premium-posts", `post-${id}`],
        },
      },
    );

    if (res.status === 404) {
      return { success: false, message: "Post not found" };
    }

    return await res.json();
  } catch (error) {
    console.error("Get post failed:", error);
    return {
      success: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
};
