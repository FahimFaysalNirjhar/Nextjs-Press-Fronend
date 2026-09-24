// Runtime data (cookies, searchParams) lives here, inside <Suspense>,
// which keeps the page shell static with Cache Components enabled.

import { Suspense } from "react";
import { PaymentContent } from "./_component/PaymentContent";
import { PricingSectionLoader } from "../_components/payment/PricingSectionLoader";

type PageProps = {
  searchParams: Promise<{ success?: string }>;
};

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
