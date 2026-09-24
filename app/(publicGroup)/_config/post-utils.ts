import type { IPost } from "@/lib/types";

export function toPlainText(content = "") {
  return content
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`>~\[\]()!-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function excerptOf(content: string, max = 160) {
  const plain = toPlainText(content);
  return plain.length > max ? `${plain.slice(0, max).trimEnd()}…` : plain;
}

// Premium posts always go through the premium route (and its paywall).
export function postHref(post: Pick<IPost, "id" | "isPermium">) {
  return post.isPermium ? `/premium/${post.id}` : `/news/${post.id}`;
}

export function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
