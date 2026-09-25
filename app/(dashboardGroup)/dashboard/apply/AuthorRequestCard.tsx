// _components/dashboard/AuthorRequestCard.tsx
import { PenLine, Clock, CheckCircle2 } from "lucide-react";
import { getMyAuthorRequestStatus } from "../../_actions/authorRequestActions";
import { BecomeAuthorForm } from "./BecomeAuthorForm";

export async function AuthorRequestCard() {
  const result = await getMyAuthorRequestStatus();
  const status = result?.data?.authorRequest?.status; // ← was result?.data?.status

  if (status === "PENDING") {
    return (
      <div className="flex items-center gap-3 rounded-xl border p-4">
        <Clock className="size-5 text-amber-500" aria-hidden />
        <div>
          <p className="font-medium">Author request pending</p>
          <p className="text-sm text-muted-foreground">
            We&apos;ll review your request soon.
          </p>
        </div>
      </div>
    );
  }

  if (status === "APPROVED") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
        <CheckCircle2 className="size-5 text-emerald-500" aria-hidden />
        <p className="font-medium">You&apos;re an author now 🎉</p>
      </div>
    );
  }

  // no request yet, or REJECTED
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center gap-2">
        <PenLine className="size-4 text-muted-foreground" aria-hidden />
        <p className="font-medium">Become an author</p>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Write and publish your own stories on the platform.
      </p>
      <BecomeAuthorForm />
    </div>
  );
}
