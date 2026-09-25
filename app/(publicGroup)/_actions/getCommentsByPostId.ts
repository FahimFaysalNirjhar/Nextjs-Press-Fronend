export const getCommentsByPostId = async (postId: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/comments/${postId}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60,
          tags: [`comments-${postId}`],
        },
      },
    );

    return await res.json();
  } catch (error) {
    console.error("Get comments failed:", error);
    return { success: false, message: "Could not load comments.", data: [] };
  }
};
