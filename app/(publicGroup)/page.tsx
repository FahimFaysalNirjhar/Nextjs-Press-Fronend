// app/(publicGroup)/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";

import HomeContent from "./_components/home/HomeContent";
import HomeSkeleton from "./_components/home/HomeSkeleton";

export const metadata: Metadata = {
  title: "Nextjs Press: Independent news and in-depth stories",
  description:
    "Clear reporting, in-depth analysis and premium long reads from Nextjs Press.",
};

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
