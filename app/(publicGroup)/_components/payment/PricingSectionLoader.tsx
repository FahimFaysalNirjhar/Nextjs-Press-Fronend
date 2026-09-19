export function PricingSectionLoader() {
  return (
    <div className="grid gap-6 md:grid-cols-2" aria-hidden>
      {[0, 1].map((i) => (
        <div
          key={i}
          className="h-96 animate-pulse rounded-xl bg-muted motion-reduce:animate-none"
        />
      ))}
    </div>
  );
}
