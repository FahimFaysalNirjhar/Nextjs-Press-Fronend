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
  const [redirecting, setRedirecting] = useState(false);

  const handleSubscribe = () => {
    setError(null);
    setNeedsLogin(false);

    startTransition(async () => {
      // On success the server action calls redirect() to Stripe Checkout,
      // so anything below only runs when checkout could NOT be started.
      const result = await subscribePremium();

      if (result.success) {
        setRedirecting(true);
        window.location.assign(result.url);
        return;
      }

      // setError(
      //   result?.success
      //     ? "Could not start checkout. Please try again."
      //     : (result?.message ?? "Could not start checkout. Please try again."),
      // );
      setError(result.message);
      setNeedsLogin(result?.statusCode === 401 || result?.statusCode === 403);
    });
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        className="w-full"
        onClick={handleSubscribe}
        disabled={isPending || redirecting}
      >
        {(isPending || redirecting) && (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        )}
        {redirecting
          ? "Redirecting to checkout…"
          : isPending
            ? "Starting checkout…"
            : "Subscribe"}
      </Button>
      {error && (
        <p role="alert" className="text-center text-sm text-destructive">
          {error}{" "}
          {needsLogin && (
            <Link
              href="/Login"
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
