// app/(dashboardGroup)/admin-dashboard/StatsOverviewSkeleton.tsx
export function StatsOverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-21 animate-pulse rounded-xl border bg-muted/40"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-85 animate-pulse rounded-xl border bg-muted/40" />
        <div className="h-85 animate-pulse rounded-xl border bg-muted/40" />
      </div>
    </div>
  );
}
