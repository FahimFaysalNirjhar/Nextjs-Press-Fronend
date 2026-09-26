// app/(dashboardGroup)/admin-dashboard/applications/ApplicationRow.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { reviewAuthorRequest } from "../../_actions/authorRequestActions";

type Props = {
  id: string;
  userName?: string;
  userEmail?: string;
  bio?: string;
  createdAt: string;
};

export function ApplicationRow({
  id,
  userName,
  userEmail,
  bio,
  createdAt,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleReview = (status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      await reviewAuthorRequest(id, status);
      router.refresh();
    });
  };

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium">{userName ?? "Unknown user"}</p>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
        </div>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>

      {bio && <p className="mt-3 text-sm text-muted-foreground">{bio}</p>}

      <div className="mt-4 flex gap-2 border-t pt-4">
        <button
          onClick={() => handleReview("APPROVED")}
          disabled={isPending}
          className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
        >
          Approve
        </button>
        <button
          onClick={() => handleReview("REJECTED")}
          disabled={isPending}
          className="rounded-md border border-destructive/40 px-3 py-1.5 text-sm font-medium text-destructive disabled:opacity-50"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
