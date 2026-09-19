"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { subscribePremium } from "../../_actions/subscribePremium";

const SubscribeButton = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);

  const handleSubscribe = () => {
    setError(null);
    setNeedsLogin(false);

    startTransition(async () => {
      // On success the server action calls redirect() to Stripe Checkout,
      // so anything below only runs when checkout could NOT be started.
      const result = await subscribePremium();

      setError(
        result?.success
          ? "Could not start checkout. Please try again."
          : (result?.message ?? "Could not start checkout. Please try again."),
      );
      setNeedsLogin(result?.statusCode === 401 || result?.statusCode === 403);
    });
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <Button className="w-full" onClick={handleSubscribe} disabled={isPending}>
        {isPending && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {isPending ? "Redirecting to checkout…" : "Subscribe"}
      </Button>

      {error && (
        <p role="alert" className="text-center text-sm text-destructive">
          {error}{" "}
          {needsLogin && (
            <Link
              href="/login"
              className="font-medium underline underline-offset-4"
            >
              Log in
            </Link>
          )}
        </p>
      )}
    </div>
  );
};

export default SubscribeButton;
