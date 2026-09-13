"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle className="h-10 w-10 text-destructive" />
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
      </div>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
