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
    <div className="mx-auto w-full max-w-[1600px] space-y-8 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">My posts</h1>
          <p className="text-muted-foreground">
            Write, edit, and manage your stories.
          </p>
        </div>

        <PostFormDialog
          trigger={
            <Button size="lg" className="w-full sm:w-auto">
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
