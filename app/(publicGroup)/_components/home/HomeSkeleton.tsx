// app/(publicGroup)/_components/home/HomeSkeleton.tsx
const bar = "animate-pulse rounded bg-muted motion-reduce:animate-none";

export default function HomeSkeleton() {
  return (
    <div
      className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:pt-10"
      aria-busy="true"
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className={`${bar} aspect-16/10 w-full`} />
          <div className={`${bar} mt-5 h-3 w-24`} />
          <div className={`${bar} mt-4 h-9 w-full`} />
          <div className={`${bar} mt-2 h-9 w-2/3`} />
          <div className={`${bar} mt-5 h-4 w-full`} />
          <div className={`${bar} mt-2 h-4 w-5/6`} />
        </div>
        <div className="space-y-6 lg:col-span-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-4 border-b pb-5">
              <div className="flex-1 space-y-2">
                <div className={`${bar} h-3 w-16`} />
                <div className={`${bar} h-5 w-full`} />
                <div className={`${bar} h-5 w-3/4`} />
              </div>
              <div className={`${bar} size-24 shrink-0`} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 space-y-6 lg:w-2/3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-5 border-b pb-6">
            <div className="flex-1 space-y-3">
              <div className={`${bar} h-3 w-16`} />
              <div className={`${bar} h-6 w-full`} />
              <div className={`${bar} h-4 w-2/3`} />
            </div>
            <div className={`${bar} aspect-4/3 w-28 shrink-0 sm:w-44`} />
          </div>
        ))}
      </div>
    </div>
  );
}
