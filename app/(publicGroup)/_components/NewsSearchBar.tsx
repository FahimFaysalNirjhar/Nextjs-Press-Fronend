"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function NewsSearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (value) {
        params.set("searchTerm", value);
      } else {
        params.delete("searchTerm");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  return (
    <div className="flex w-full max-w-xl items-center gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          defaultValue={
            searchParams.get("searchTerm")
              ? searchParams.get("searchTerm")?.toString()
              : ""
          }
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search news..."
          className="pl-9"
        />
      </div>
      <Button type="button">Search</Button>
    </div>
  );
}
