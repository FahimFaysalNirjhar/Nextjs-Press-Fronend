"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../../_actions/createComment";

export function CommentForm({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const action = createComment.bind(null, postId);
  const [state, formAction, pending] = useActionState(action, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Comment posted");
      formRef.current?.reset();

      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <Textarea
        name="content"
        required
        rows={3}
        placeholder="Share your thoughts..."
        className="resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={pending} size="sm">
          {pending ? "Posting..." : "Post comment"}
        </Button>
      </div>
    </form>
  );
}
