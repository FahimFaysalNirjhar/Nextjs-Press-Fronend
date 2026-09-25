// _components/dashboard/SubscriptionStatusCard.tsx
import Link from "next/link";
import { CheckCircle2, CreditCard } from "lucide-react";
import { getSubscriptionStatus } from "@/app/(publicGroup)/_actions/getSubscriptionStatus";

export async function SubscriptionStatusCard() {
  const status = await getSubscriptionStatus();
  const isSubscribed = Boolean(status?.success && status?.data?.isSubscribed);

  if (isSubscribed) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="size-4" aria-hidden />
          <span className="font-medium">Subscription active</span>
        </div>
        <Link href="/premium" className="text-sm underline underline-offset-4">
          View premium news
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl border p-4">
      <div className="flex items-center gap-2 text-sm">
        <CreditCard className="size-4 text-muted-foreground" aria-hidden />
        <span>No active subscription</span>
      </div>
      <Link
        href="/payment"
        className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
      >
        Subscribe
      </Link>
    </div>
  );
}
