// app/(publicGroup)/_components/home/HomeContent.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Lock, Newspaper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IPost } from "@/lib/types";

import { getHomePosts } from "../../_actions/getHomePosts";
import { excerptOf, formatDate, postHref } from "../../_config/post-utils";

/* ---------- Small building blocks ---------- */

function Kicker({ post }: { post: IPost }) {
  const tag = post.tags?.[0];
  return (
    <div className="flex items-center gap-3 font-sans text-[11px] font-bold uppercase tracking-widest">
      {tag && <span className="text-red-700 dark:text-red-400">{tag}</span>}
      {post.isPermium && (
        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
          <Lock className="size-3" aria-hidden />
          Premium
        </span>
      )}
    </div>
  );
}

function Byline({ post, className }: { post: IPost; className?: string }) {
  return (
    <p className={cn("font-sans text-xs text-muted-foreground", className)}>
      {post.author?.name && (
        <span className="font-semibold uppercase tracking-wide text-foreground/80">
          By {post.author.name}
        </span>
      )}
      {post.author?.name && <span aria-hidden> · </span>}
      <time dateTime={new Date(post.createdAt).toISOString()}>
        {formatDate(post.createdAt)}
      </time>
    </p>
  );
}

function Thumb({
  post,
  sizes,
  priority,
  className,
}: {
  post: IPost;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {post.thumbnail ? (
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <Newspaper className="size-8" aria-hidden />
        </div>
      )}
    </div>
  );
}

function SectionLabel({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between border-t-2 border-foreground pt-2",
        className,
      )}
    >
      <h2 className="font-sans text-xs font-bold uppercase tracking-widest">
        {children}
      </h2>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-sans text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          See all <ArrowRight className="size-3" aria-hidden />
        </Link>
      )}
    </div>
  );
}

/* ---------- Story layouts ---------- */

function LeadStory({ post }: { post: IPost }) {
  return (
    <article className="group">
      <Link href={postHref(post)} className="block">
        <Thumb
          post={post}
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="aspect-16/10"
        />
        <div className="mt-5">
          <Kicker post={post} />
          <h2 className="mt-3 text-balance font-serif text-3xl font-bold leading-[1.1] tracking-tight underline-offset-4 group-hover:underline sm:text-5xl">
            {post.title}
          </h2>
          <p className="mt-4 line-clamp-3 font-serif text-lg leading-8 text-muted-foreground">
            {excerptOf(post.content, 220)}
          </p>
          <Byline post={post} className="mt-4" />
        </div>
      </Link>
    </article>
  );
}

function SideStory({ post }: { post: IPost }) {
  return (
    <article className="group border-b py-5 first:pt-4 last:border-b-0">
      <Link href={postHref(post)} className="flex gap-4">
        <div className="min-w-0 flex-1">
          <Kicker post={post} />
          <h3 className="mt-2 font-serif text-xl font-bold leading-snug underline-offset-4 group-hover:underline">
            {post.title}
          </h3>
          <Byline post={post} className="mt-2" />
        </div>
        <Thumb
          post={post}
          sizes="112px"
          className="aspect-square w-24 shrink-0 sm:w-28"
        />
      </Link>
    </article>
  );
}

function ListStory({ post }: { post: IPost }) {
  return (
    <article className="group border-b py-6 first:pt-4">
      <Link href={postHref(post)} className="flex gap-5">
        <div className="min-w-0 flex-1">
          <Kicker post={post} />
          <h3 className="mt-2 font-serif text-xl font-bold leading-snug underline-offset-4 group-hover:underline sm:text-2xl">
            {post.title}
          </h3>
          <p className="mt-2 hidden line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:block">
            {excerptOf(post.content, 160)}
          </p>
          <Byline post={post} className="mt-3" />
        </div>
        <Thumb
          post={post}
          sizes="(min-width: 640px) 176px, 112px"
          className="aspect-4/3 w-28 shrink-0 self-start sm:w-44"
        />
      </Link>
    </article>
  );
}

function PremiumCard({ post }: { post: IPost }) {
  return (
    <article className="group">
      <Link href={postHref(post)} className="block">
        <div className="relative">
          <Thumb
            post={post}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-3/2"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-amber-400 px-2 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-black">
            <Lock className="size-3" aria-hidden />
            Premium
          </span>
        </div>
        <h3 className="mt-4 font-serif text-xl font-bold leading-snug underline-offset-4 group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
          {excerptOf(post.content, 130)}
        </p>
      </Link>
    </article>
  );
}

/* ---------- Page content ---------- */

export default async function HomeContent() {
  const posts = await getHomePosts();

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <Newspaper
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden
        />
        <h1 className="mt-4 font-serif text-3xl font-bold">No stories yet</h1>
        <p className="mt-2 text-muted-foreground">
          Check back soon. Our reporters are working on it.
        </p>
      </div>
    );
  }

  // newest first
  const sorted = [...posts].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
  );

  // Featured posts take the prime spots; fill gaps with the newest stories.
  const featured = sorted.filter((p) => p.isFeatured);
  const lead = featured[0] ?? sorted[0];
  const used = new Set<string>([lead.id]);

  const side: IPost[] = [];
  for (const p of [...featured.slice(1), ...sorted]) {
    if (side.length >= 3) break;
    if (!used.has(p.id)) {
      side.push(p);
      used.add(p.id);
    }
  }

  const premiumBand = sorted
    .filter((p) => p.isPermium && !used.has(p.id))
    .slice(0, 3);
  premiumBand.forEach((p) => used.add(p.id));

  const latest = sorted.filter((p) => !used.has(p.id)).slice(0, 8);

  const mostRead = [...sorted]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 5);

  const tagCounts = new Map<string, number>();
  for (const p of sorted) {
    for (const t of p.tags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  }
  const topics = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  return (
    <div className="pb-24">
      {/* Top stories */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:pt-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:border-r lg:pr-10">
            <LeadStory post={lead} />
          </div>

          {side.length > 0 && (
            <aside className="lg:col-span-4">
              <SectionLabel>Also featured</SectionLabel>
              <div>
                {side.map((post) => (
                  <SideStory key={post.id} post={post} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* Latest + sidebar */}
      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:border-r lg:pr-10">
            <SectionLabel href="/news">Latest news</SectionLabel>
            <div>
              {latest.map((post) => (
                <ListStory key={post.id} post={post} />
              ))}
            </div>
            <Button asChild variant="outline" className="mt-8 w-full sm:w-auto">
              <Link href="/news">
                More news <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <aside className="space-y-10 lg:col-span-4">
            {/* Most read */}
            <div>
              <SectionLabel>Most read</SectionLabel>
              <ol className="mt-2">
                {mostRead.map((post, i) => (
                  <li key={post.id} className="border-b last:border-b-0">
                    <Link
                      href={postHref(post)}
                      className="group flex gap-4 py-4"
                    >
                      <span
                        aria-hidden
                        className="w-7 shrink-0 font-serif text-3xl font-bold leading-none text-muted-foreground/60"
                      >
                        {i + 1}
                      </span>
                      <span className="font-serif text-base font-semibold leading-snug underline-offset-4 group-hover:underline">
                        {post.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            {/* Premium promo */}
            <div className="border bg-muted/40 p-6">
              <Crown className="size-6 text-amber-500" aria-hidden />
              <h2 className="mt-3 font-serif text-2xl font-bold leading-tight">
                Read without limits
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Unlock every long read, analysis and data story, and support
                independent journalism.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/payment">Go premium</Link>
              </Button>
            </div>

            {/* Topics */}
            {topics.length > 0 && (
              <div>
                <SectionLabel>Topics</SectionLabel>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topics.map((tag) => (
                    <Link
                      key={tag}
                      href={`/news?tag=${encodeURIComponent(tag)}`}
                      className="border px-3 py-1 font-sans text-xs font-medium transition-colors hover:bg-muted"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Premium spotlight */}
      {premiumBand.length > 0 && (
        <section className="mt-16 bg-zinc-900 py-14 text-white dark:bg-zinc-950">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-amber-400">
                  <Crown className="size-4" aria-hidden />
                  Premium
                </p>
                <h2 className="mt-2 text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                  Stories worth the deeper read
                </h2>
              </div>
              <Link
                href="/premium"
                className="inline-flex items-center gap-1 font-sans text-sm font-medium text-white/80 hover:text-white"
              >
                Explore premium <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {premiumBand.map((post) => (
                <PremiumCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
