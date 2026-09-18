import { IPost } from "@/lib/types";
import NewsCard from "./NewsCard";

type PostsResponse = {
  success: boolean;
  message?: string;
  data?: IPost[];
};

/* ------------------------------ Sample data ------------------------------ */

const samplePosts: IPost[] = [
  {
    id: "1b7c2f0e-1111-4a01-9a01-000000000001",
    title: "Inside the newsroom: how a small team covers a city of 20 million",
    content:
      "Every morning at 6:30 the desk meets to decide what matters today. With four reporters, two sub editors and one photographer, the team has to choose carefully. This long read follows a full news cycle from the first tip to the final headline, and looks at what gets cut along the way. ".repeat(
        6,
      ),
    thumbnail: "https://picsum.photos/seed/newsroom/1200/700",
    isFeatured: true,
    tags: ["Long read", "Media", "Newsroom"],
    views: 18420,
    createdAt: "2026-09-16T08:30:00.000Z",
    isPermium: true,
    author: { name: "Anika Rahman" },
    _count: { comments: 42 },
  },
  {
    id: "1b7c2f0e-1111-4a01-9a01-000000000002",
    title: "Monsoon markets: what rising river levels mean for food prices",
    content:
      "Traders in riverside markets say supply routes are shifting weeks earlier than usual. We spoke with wholesalers, farmers and transport operators to understand where prices are likely to move next, and which staples are most exposed. ".repeat(
        6,
      ),
    thumbnail: "https://picsum.photos/seed/markets/800/450",
    isFeatured: false,
    tags: ["Economy", "Agriculture"],
    views: 9310,
    createdAt: "2026-09-14T05:10:00.000Z",
    isPermium: true,
    author: { name: "Tanvir Hossain" },
    _count: { comments: 17 },
  },
  {
    id: "1b7c2f0e-1111-4a01-9a01-000000000003",
    title: "The quiet rise of regional-language podcasts",
    content:
      "Independent producers are building loyal audiences without big budgets. Their shows cover local politics, folk music and small business, and listeners say it feels like the conversation they were missing. ".repeat(
        5,
      ),
    thumbnail: null,
    isFeatured: false,
    tags: ["Culture", "Audio"],
    views: 4120,
    createdAt: "2026-09-12T12:45:00.000Z",
    isPermium: true,
    author: { name: "Nusrat Jahan" },
    _count: { comments: 8 },
  },
  {
    id: "1b7c2f0e-1111-4a01-9a01-000000000004",
    title: "Data desk: mapping every road closure this week",
    content:
      "Using open transport feeds and reader reports, our data team built a live picture of closures across the city. This piece explains the method, the gaps in the data, and how you can help improve the map. ".repeat(
        5,
      ),
    thumbnail: "https://picsum.photos/seed/roads/800/450",
    isFeatured: false,
    tags: ["Data", "Transport", "Explainer"],
    views: 27650,
    createdAt: "2026-09-10T09:00:00.000Z",
    isPermium: true,
    author: { name: "Imran Chowdhury" },
    _count: { comments: 63 },
  },
  {
    id: "1b7c2f0e-1111-4a01-9a01-000000000005",
    title: "Why local election coverage keeps missing the story",
    content:
      "Turnout, candidate lists and results get most of the airtime. But interviews with voters suggest the deciding issues are often much smaller: a drain that never gets fixed, a school with no teacher for maths. ".repeat(
        5,
      ),
    thumbnail: "https://picsum.photos/seed/election/800/450",
    isFeatured: false,
    tags: ["Politics", "Analysis"],
    views: 12980,
    createdAt: "2026-09-08T14:20:00.000Z",
    isPermium: true,
    author: { name: "Anika Rahman" },
    _count: { comments: 29 },
  },
  {
    id: "1b7c2f0e-1111-4a01-9a01-000000000006",
    title: "A field guide to spotting misleading charts",
    content:
      "Truncated axes, cherry-picked date ranges and dual scales. We walk through the most common tricks with real examples, and a short checklist you can use before sharing a graph.",
    thumbnail: "https://picsum.photos/seed/charts/800/450",
    isFeatured: false,
    tags: ["Explainer", "Data"],
    views: 6045,
    createdAt: "2026-09-05T07:05:00.000Z",
    isPermium: true,
    author: { name: "Tanvir Hossain" },
    _count: { comments: 11 },
  },
];

/* ------------------------------ Data source ------------------------------ */

async function getPremiumPosts(): Promise<PostsResponse> {
  // Fake latency so you can see NewsSkeleton. Remove when using the real API.
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return { success: true, data: samplePosts };
}

/* ------------------------------ Component ------------------------------- */

// Async Server Component: the page streams the skeleton until this resolves.
export const PremiumNews = async () => {
  const result = await getPremiumPosts();

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load premium news</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const posts = result.data ?? [];

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">No premium stories yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          New stories will show up here as soon as they are published.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <NewsCard key={post.id} post={post} />
      ))}
    </div>
  );
};
