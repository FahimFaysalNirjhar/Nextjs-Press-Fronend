// _components/dashboard/BecomeAuthorForm.tsx
"use client";

import { useActionState } from "react";
import { submitAuthorRequest } from "../../_actions/authorRequestActions";

const initialState = { success: false, message: "" };

export function BecomeAuthorForm() {
  const [state, formAction, isPending] = useActionState(
    submitAuthorRequest,
    initialState,
  );

  return (
    <form action={formAction} className="mt-4 space-y-3">
      <textarea
        name="bio"
        rows={3}
        placeholder="Tell us why you'd like to become an author (optional)"
        className="w-full resize-none rounded-md border p-2 text-sm"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Submit request"}
      </button>

      {state.message && (
        <p
          className={`text-sm ${
            state.success ? "text-emerald-600" : "text-destructive"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
