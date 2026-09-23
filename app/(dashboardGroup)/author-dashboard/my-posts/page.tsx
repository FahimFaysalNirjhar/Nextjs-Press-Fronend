import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyPostList from "../../_components/MyPostList";
import { MyPostSkeleton } from "../../_components/MyPostSkeleton";
import PostFormDialog from "../../_components/PostFormDialog";

export const metadata: Metadata = {
  title: "My posts",
};

export default function MyPostsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My posts</h1>
          <p className="mt-1 text-muted-foreground">
            Write, edit, and manage your stories.
          </p>
        </div>

        <PostFormDialog
          trigger={
            <Button>
              <Plus className="size-4" aria-hidden />
              New post
            </Button>
          }
        />
      </header>

      <Suspense fallback={<MyPostSkeleton />}>
        <MyPostList />
      </Suspense>
    </div>
  );
}
