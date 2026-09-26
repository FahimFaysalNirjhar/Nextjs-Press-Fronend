/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboardGroup)/admin-dashboard/applications/AuthorApplicationsList.tsx
import { ClipboardCheck } from "lucide-react";
import { getAllAuthorRequests } from "../../_actions/authorRequestActions";
import { ApplicationRow } from "./ApplicationRow";

export async function AuthorApplicationsList() {
  const result = await getAllAuthorRequests("PENDING");

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load applications</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const requests = Array.isArray(result.data?.authorRequests)
    ? result.data.authorRequests
    : [];

  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <ClipboardCheck
          className="mx-auto mb-2 size-6 text-muted-foreground"
          aria-hidden
        />
        <p className="font-medium">No pending applications</p>
        <p className="mt-1 text-sm text-muted-foreground">
          New author requests will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((request: any) => (
        <ApplicationRow
          key={request.id}
          id={request.id}
          userName={request.user?.name}
          userEmail={request.user?.email}
          bio={request.bio}
          createdAt={request.createdAt}
        />
      ))}
    </div>
  );
}
