// app/(dashboardGroup)/admin-dashboard/posts/EditPostDialog.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { updatePost } from "../../_actions/postActions";

type Props = {
  post: {
    id: string;
    title: string;
    status: string;
    isFeatured: boolean;
    isPermium: boolean;
  };
};

export function EditPostDialog({ post }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [status, setStatus] = useState(post.status);
  const [isFeatured, setIsFeatured] = useState(post.isFeatured);
  const [isPermium, setIsPermium] = useState(post.isPermium);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      const result = await updatePost(post.id, {
        title,
        status,
        isFeatured,
        isPermium,
      });

      if (result.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(result.message ?? "Failed to update post.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label={`Edit "${post.title}"`}
      >
        <Pencil className="size-4" aria-hidden />
      </button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={(checked) => setIsFeatured(checked === true)}
            />
            <Label htmlFor="isFeatured" className="cursor-pointer font-normal">
              Featured
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isPermium"
              checked={isPermium}
              onCheckedChange={(checked) => setIsPermium(checked === true)}
            />
            <Label htmlFor="isPermium" className="cursor-pointer font-normal">
              Premium
            </Label>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <button
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="rounded-md border px-3 py-1.5 text-sm font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending || !title.trim()}
            className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {isPending && (
              <Loader2 className="size-3.5 animate-spin" aria-hidden />
            )}
            Save changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
