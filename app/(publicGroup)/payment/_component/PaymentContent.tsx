import type { Metadata } from "next";
import Link from "next/link";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { getSubscriptionStatus } from "../../_actions/getSubscriptionStatus";
import PricingSection from "../../_components/payment/PricingSection";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Choose a plan and get full access to premium news.",
};

type PageProps = {
  searchParams: Promise<{ success?: string }>;
};

export async function PaymentContent({ searchParams }: PageProps) {
  const [{ success }, status] = await Promise.all([
    searchParams,
    getSubscriptionStatus(),
  ]);

  // status is { success, data: { isSubscribed, ... } } or { success: false, message }
  const isSubscribed = Boolean(status?.success && status?.data?.isSubscribed);
  const cancelled = success === "false";

  return (
    <>
      {cancelled && !isSubscribed && (
        <div
          role="status"
          className="mb-8 flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            <span className="font-medium">Payment cancelled.</span> You
            haven&apos;t been charged. You can subscribe whenever you&apos;re
            ready.
          </p>
        </div>
      )}

      {isSubscribed && (
        <div
          role="status"
          className="mb-8 flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            <span className="font-medium">Your subscription is active.</span>{" "}
            <Link href="/premium" className="underline underline-offset-4">
              Go to premium news
            </Link>
          </p>
        </div>
      )}

      <PricingSection isSubscribed={isSubscribed} />
    </>
  );
}
