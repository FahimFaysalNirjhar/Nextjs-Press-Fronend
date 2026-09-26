// app/(dashboardGroup)/admin-dashboard/users/page.tsx
import { Suspense } from "react";
import { UsersList } from "./UsersList";

type PageProps = {
  searchParams: Promise<{ role?: string; searchTerm?: string }>;
};

export default function AdminUsersPage({ searchParams }: PageProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-muted-foreground">
          All registered users on the platform.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-lg border bg-muted/40"
              />
            ))}
          </div>
        }
      >
        <UsersList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
