import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { getSubscriptionStatus } from "../_actions/getSubscriptionStatus";
import PricingSection from "../_components/payment/PricingSection";
import { PricingSectionLoader } from "../_components/payment/PricingSectionLoader";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Choose a plan and get full access to premium news.",
};

type PageProps = {
  searchParams: Promise<{ success?: string }>;
};

// Runtime data (cookies, searchParams) lives here, inside <Suspense>,
// which keeps the page shell static with Cache Components enabled.
async function PaymentContent({ searchParams }: PageProps) {
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

export default function PaymentPage({ searchParams }: PageProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Get full access to premium news
        </h1>
        <p className="mt-3 text-muted-foreground">
          Long reads, analysis and data stories, for the price of a coffee.
        </p>
      </header>

      <Suspense fallback={<PricingSectionLoader />}>
        <PaymentContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
