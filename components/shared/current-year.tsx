// components/current-year.tsx
import { cacheLife } from "next/cache";

// new Date() would fail the prerender with Cache Components, so it is cached instead.
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
