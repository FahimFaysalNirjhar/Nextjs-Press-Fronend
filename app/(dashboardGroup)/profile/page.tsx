import { Suspense } from "react";
import { getMe } from "@/service/getMe";
import { ProfileDetails } from "../_components/profile/ProfileDetails";
import { ProfileSkeleton } from "../_components/profile/ProfileSkeleton";

async function ProfileContent() {
  const result = await getMe();

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load your profile</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  return <ProfileDetails profile={result.data.profile} />;
}

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-6 py-10 sm:px-10 lg:px-12">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Your account details and public information.
        </p>
      </header>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
