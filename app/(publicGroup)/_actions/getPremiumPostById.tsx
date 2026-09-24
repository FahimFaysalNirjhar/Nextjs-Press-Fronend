export const getPremiumPostById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/premium/${id}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 6,
          tags: ["public-posts", `post-${id}`],
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
