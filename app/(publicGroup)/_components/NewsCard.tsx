import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, Lock, MessageSquare, Newspaper } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IPost } from "@/lib/types";

/**
 * Shape of a post as returned by Prisma, e.g.
 *
 * prisma.post.findMany({
 *   where: { status: "PUBLISHED" },
 *   include: { author: { select: { name: true } }, _count: { select: { comments: true } } },
 * })
 */

type NewsCardProps = {
  post: IPost;
  className?: string;
};

const WORDS_PER_MINUTE = 200;

function toPlainText(content: string) {
  return content
    .replace(/<[^>]*>/g, " ") // HTML tags
    .replace(/[#*_`>~\[\]()!-]+/g, " ") // basic markdown symbols
    .replace(/\s+/g, " ")
    .trim();
}

function readingTime(text: string) {
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatViews(views: number) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(views);
}

const NewsCard = ({ post, className }: NewsCardProps) => {
  const plain = toPlainText(post.content);

  const WORDS_PER_MINUTE = 200;

  const calculateReadingTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  };

  const excerpt =
    plain.length > 160 ? `${plain.slice(0, 160).trimEnd()}…` : plain;
  const comments = post._count?.comments ?? 0;
  const [primaryTag, ...otherTags] = post.tags;

  return (
    <Link
      href={`/news/${post.id}`}
      className={cn(
        "group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        post.isFeatured && "md:col-span-2",
        className,
      )}
    >
      <Card
        className={cn(
          "h-full overflow-hidden gap-0 py-0 transition-shadow group-hover:shadow-md",
          post.isFeatured && "md:flex-row",
        )}
      >
        {/* Thumbnail */}
        <div
          className={cn(
            "relative aspect-video w-full shrink-0 overflow-hidden bg-muted",
            post.isFeatured && "md:aspect-auto md:w-1/2",
          )}
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes={
                post.isFeatured
                  ? "(min-width: 768px) 50vw, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              }
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <Newspaper className="size-8" aria-hidden />
            </div>
          )}

          {(post.isFeatured || post.isPermium) && (
            <div className="absolute left-3 top-3 flex gap-2">
              {post.isFeatured && <Badge>Featured</Badge>}
              {post.isPermium && (
                <Badge variant="secondary" className="gap-1">
                  <Lock className="size-3" aria-hidden />
                  Premium
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col">
          <CardContent className="flex flex-1 flex-col gap-3 p-5">
            {primaryTag && (
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline">{primaryTag}</Badge>
                {otherTags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h3
              className={cn(
                "line-clamp-2 font-semibold leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4",
                post.isFeatured ? "text-2xl md:text-3xl" : "text-lg",
              )}
            >
              {post.title}
            </h3>

            {excerpt && (
              <p
                className={cn(
                  "text-sm leading-relaxed text-muted-foreground",
                  post.isFeatured ? "line-clamp-4" : "line-clamp-3",
                )}
              >
                {excerpt}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t px-5 py-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {post.author?.name && (
                <>
                  <span className="font-medium text-foreground">
                    {post.author.name}
                  </span>
                  <span aria-hidden>·</span>
                </>
              )}
              <time dateTime={new Date(post.createdAt).toISOString()}>
                {formatDate(post.createdAt)}
              </time>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden />
                {post.readingTime ?? calculateReadingTime(plain)} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="size-3.5" aria-hidden />
                {formatViews(post.views)}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="size-3.5" aria-hidden />
                {comments}
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default NewsCard;
