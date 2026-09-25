// app/(dashboardGroup)/subscription/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { SubscriptionStatusCard } from "../../_components/subscription/SubscriptionStatusCard";

export const metadata: Metadata = {
  title: "My Subscription",
  description: "View your subscription status.",
};

export default function SubscriptionPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-6 py-10 sm:px-10 lg:px-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Subscription</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View your current subscription status.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-16 animate-pulse rounded-xl border bg-muted/40" />
        }
      >
        <SubscriptionStatusCard />
      </Suspense>
    </div>
  );
}
