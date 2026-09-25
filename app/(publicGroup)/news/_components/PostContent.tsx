// _components/PostContent.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Eye, Lock, Star, ArrowLeft } from "lucide-react";
import { getPublicPostById } from "../../_actions/getPublicPostById";
import { CommentSection } from "../../_components/comment/CommentSection";
import { Suspense } from "react";
import { CommentSectionSkeleton } from "../../_components/comment/CommentSectionSkeleton";
// adjust to your depth

export default async function PostContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPublicPostById(id);

  if (!result.success) {
    notFound();
  }

  const post = result.data;
  const created = new Date(post.createdAt);
  const date = created.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const paragraphs: string[] = String(post.content ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="pb-24">
      {/* Header */}
      <header className="mx-auto max-w-2xl px-4 pt-8 sm:px-6 sm:pt-12">
        <Link
          href="/news"
          className="inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          News
        </Link>

        {/* Kicker */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs font-bold uppercase tracking-widest">
          {post.isFeatured && (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Star className="size-3.5 fill-current" aria-hidden />
              Featured
            </span>
          )}
          {post.isPermium && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Lock className="size-3.5" aria-hidden />
              Premium
            </span>
          )}
          {post.tags?.map((tag: string) => (
            <Link
              key={tag}
              href={`/news?tag=${encodeURIComponent(tag)}`}
              className="text-red-700 hover:underline dark:text-red-400"
            >
              {tag}
            </Link>
          ))}
        </div>

        <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        {/* Byline */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y py-3 font-sans text-sm">
          <div className="space-y-0.5">
            {post.author?.name && (
              <p className="font-semibold uppercase tracking-wide">
                By {post.author.name}
              </p>
            )}
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <CalendarDays className="size-3.5" aria-hidden />
              <time dateTime={created.toISOString()}>{date}</time>
            </p>
          </div>
          {typeof post.views === "number" && (
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="size-4" aria-hidden />
              {post.views.toLocaleString()} views
            </p>
          )}
        </div>
      </header>

      {/* Lead image */}
      {post.thumbnail && (
        <figure className="mx-auto mt-8 max-w-4xl sm:px-6">
          <div className="relative aspect-3/2 w-full overflow-hidden bg-muted sm:aspect-video">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      )}

      {/* Body */}
      <div className="mx-auto mt-10 max-w-2xl space-y-6 px-4 font-serif text-lg leading-8 text-foreground/90 sm:px-6 sm:text-xl sm:leading-9">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "first-letter:float-left first-letter:mr-3 first-letter:pt-1 first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8]"
                : undefined
            }
          >
            {p}
          </p>
        ))}
      </div>

      {/* Topics */}
      {post.tags?.length > 0 && (
        <footer className="mx-auto mt-14 max-w-2xl px-4 sm:px-6">
          <div className="border-t pt-6">
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Topics
            </p>
            <div className="flex flex-wrap gap-2 font-sans">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/news?tag=${encodeURIComponent(tag)}`}
                  className="border px-3 py-1 text-xs font-medium transition-colors hover:bg-muted"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      )}
      <Suspense fallback={<CommentSectionSkeleton />}>
        <CommentSection postId={post.id} />
      </Suspense>
    </article>
  );
}
