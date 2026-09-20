"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const selectClass =
  "h-10 w-full rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-48";

export default function NewsFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row">
      <select
        value={searchParams.get("tag") ?? ""}
        onChange={(e) => handleChange("tag", e.target.value)}
        className={selectClass}
        aria-label="Filter by topic"
      >
        <option value="">All topics</option>
        <option value="politics">Politics</option>
        <option value="transport">Transport</option>
        <option value="agriculture">Agriculture</option>
        <option value="media">Media</option>
        <option value="technology">Tech</option>
        <option value="sports">Sports</option>
      </select>

      <select
        value={searchParams.get("sort") ?? "createdAt-desc"}
        onChange={(e) => handleChange("sort", e.target.value)}
        className={selectClass}
        aria-label="Sort stories"
      >
        <option value="createdAt-desc">Newest</option>
        <option value="createdAt-asc">Oldest</option>
        <option value="views-desc">Most viewed</option>
      </select>
    </div>
  );
}
