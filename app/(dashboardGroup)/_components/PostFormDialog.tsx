/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

import { IPost } from "@/lib/types";
import { createPost, updatePost } from "../_actions/myPostsActions";

const initialState = { success: false, message: "" };

export default function PostFormDialog({
  post,
  trigger,
}: {
  post?: IPost; // present = edit mode, absent = create mode
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(post);
  const formRef = useRef<HTMLFormElement>(null);

  // Bind the post id for edit, so the form only ever needs to send (prevState, formData)
  const action = isEdit ? updatePost.bind(null, post!.id) : createPost;

  const [state, formAction, isPending] = useActionState(
    action as any,
    initialState as any,
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message ||
          (isEdit ? "Post updated successfully" : "Post created successfully"),
      );
      formRef.current?.reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
      setOpen(false);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, isEdit]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit post" : "Create post"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update your story and save the changes."
              : "Write a new story for your readers."}
          </DialogDescription>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-1"
        >
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={post?.title}
              placeholder="Give your story a title"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              required
              rows={6}
              defaultValue={post?.content}
              placeholder="Write the story..."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              name="thumbnail"
              type="url"
              defaultValue={post?.thumbnail ?? ""}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={post?.tags?.join(", ") ?? ""}
              placeholder="tech, politics"
            />
            <p className="text-xs text-muted-foreground">
              Separate tags with a comma and a space.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <Label htmlFor="isFeatured">Featured</Label>
              <p className="text-xs text-muted-foreground">
                Show this story at the top of the list.
              </p>
            </div>
            <Switch
              id="isFeatured"
              name="isFeatured"
              defaultChecked={post?.isFeatured}
            />
          </div>

          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <Label htmlFor="isPermium">Premium</Label>
              <p className="text-xs text-muted-foreground">
                Only subscribers can read this story.
              </p>
            </div>
            <Switch
              id="isPermium"
              name="isPermium"
              defaultChecked={post?.isPermium}
            />
          </div>

          {(state as any).message && !(state as any).success && (
            <p className="text-sm text-destructive">{(state as any).message}</p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : isEdit ? "Save changes" : "Publish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
