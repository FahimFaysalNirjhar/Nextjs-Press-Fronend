import { AlertCircle, FileText } from "lucide-react";

import MyPostCard from "./MyPostCard";
import { IPost } from "@/lib/types";
import { getMyPosts } from "../_actions/myPostsActions";

export default async function MyPostList() {
  const result = await getMyPosts();

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <AlertCircle
          className="mx-auto mb-2 size-6 text-destructive"
          aria-hidden
        />
        <p className="font-medium">Couldn&apos;t load your posts</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const posts: IPost[] = result.data ?? [];

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <FileText
          className="mx-auto mb-2 size-6 text-muted-foreground"
          aria-hidden
        />
        <p className="font-medium">No posts yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Click &quot;New post&quot; to publish your first story.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <MyPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
