import { AlertCircle, FileText } from "lucide-react";

import MyPostCard from "./MyPostCard";
import { IPost } from "@/lib/types";
import { getMyPosts } from "../_actions/myPostsActions";

export default async function MyPostList() {
  const result = await getMyPosts();

  if (!result.success) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-destructive/40 bg-destructive/5 p-10 text-center">
        <AlertCircle className="mb-3 size-8 text-destructive" aria-hidden />
        <p className="text-lg font-semibold">Couldn&apos;t load your posts</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {result.message}
        </p>
      </div>
    );
  }

  const posts: IPost[] = result.data ?? [];

  if (posts.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 p-10 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
          <FileText className="size-7 text-primary" aria-hidden />
        </div>
        <p className="text-lg font-semibold">No posts yet</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Click &quot;New post&quot; to publish your first story.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {posts.map((post) => (
          <MyPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
