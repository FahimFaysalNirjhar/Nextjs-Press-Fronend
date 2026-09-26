// app/(dashboardGroup)/admin-dashboard/page.tsx
import { Suspense } from "react";
import { StatsOverview } from "./StatsOverview";
import { StatsOverviewSkeleton } from "./StatsOverviewSkeleton";

export default function AdminOverviewPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-6 py-10 sm:px-10 lg:px-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Platform-wide statistics at a glance.
        </p>
      </div>

      <Suspense fallback={<StatsOverviewSkeleton />}>
        <StatsOverview />
      </Suspense>
    </div>
  );
}
