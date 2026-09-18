import { IPost } from "@/lib/types";
import NewsCard from "./NewsCard";

/* -------------------------------------------------------------------------- */
/* Sample data (replace with your API / Prisma result)                        */
/* -------------------------------------------------------------------------- */

const samplePosts: IPost[] = [
  {
    id: "2c8d3a1f-2222-4b02-8b02-000000000001",
    title: "City council approves new bus lanes on the main ring road",
    content:
      "The council voted this week to add dedicated bus lanes along the ring road, with work expected to begin next quarter. Commuter groups welcomed the decision, while some shop owners asked for clearer plans on loading zones and parking. ".repeat(
        6,
      ),
    thumbnail: "https://picsum.photos/seed/buslanes/1200/700",
    isFeatured: true,
    tags: ["City", "Transport"],
    views: 21340,
    createdAt: "2026-09-18T06:15:00.000Z",
    isPermium: false,
    author: { name: "Imran Chowdhury" },
    _count: { comments: 37 },
  },
  {
    id: "2c8d3a1f-2222-4b02-8b02-000000000002",
    title: "Schools reopen after flood repairs, with classes running in shifts",
    content:
      "Most of the affected schools reopened on Sunday after weeks of repairs. To make up for lost time, many are running morning and afternoon shifts, and teachers say the first week is mostly about getting students back into a routine. ".repeat(
        5,
      ),
    thumbnail: "https://picsum.photos/seed/schools/800/450",
    isFeatured: false,
    tags: ["Education", "Local"],
    views: 8740,
    createdAt: "2026-09-17T09:40:00.000Z",
    isPermium: false,
    author: { name: "Nusrat Jahan" },
    _count: { comments: 14 },
  },
  {
    id: "2c8d3a1f-2222-4b02-8b02-000000000003",
    title: "Local team wins the regional football final in extra time",
    content:
      "A late goal in the second half of extra time settled a tense final on Saturday evening. The winning side dedicated the trophy to its supporters, many of whom travelled overnight to attend. ".repeat(
        5,
      ),
    thumbnail: "https://picsum.photos/seed/football/800/450",
    isFeatured: false,
    tags: ["Sports"],
    views: 15690,
    createdAt: "2026-09-16T18:05:00.000Z",
    isPermium: false,
    author: { name: "Tanvir Hossain" },
    _count: { comments: 52 },
  },
  {
    id: "2c8d3a1f-2222-4b02-8b02-000000000004",
    title: "Weekend weather: scattered showers, cooler evenings",
    content:
      "Forecasters expect scattered showers on Saturday, easing by Sunday afternoon. Evenings will be a few degrees cooler than last week, and light winds are expected across most districts.",
    thumbnail: null,
    isFeatured: false,
    tags: ["Weather"],
    views: 5230,
    createdAt: "2026-09-15T04:30:00.000Z",
    isPermium: false,
    author: { name: "Newsdesk" },
    _count: { comments: 2 },
  },
  {
    id: "2c8d3a1f-2222-4b02-8b02-000000000005",
    title: "Startup fair draws record crowd of young founders",
    content:
      "More than a hundred early-stage teams showed prototypes at this year's startup fair. Visitors tried out apps for farming, logistics and health, and several teams said they met their first investors on the day. ".repeat(
        5,
      ),
    thumbnail: "https://picsum.photos/seed/startupfair/800/450",
    isFeatured: false,
    tags: ["Technology", "Business"],
    views: 11080,
    createdAt: "2026-09-13T11:20:00.000Z",
    isPermium: false,
    author: { name: "Anika Rahman" },
    _count: { comments: 21 },
  },
  {
    id: "2c8d3a1f-2222-4b02-8b02-000000000006",
    title: "Book fair extends opening hours for the final week",
    content:
      "Organisers announced that the book fair will stay open two hours later each evening until it closes. Publishers are also offering discounts on children's titles and school textbooks.",
    thumbnail: "https://picsum.photos/seed/bookfair/800/450",
    isFeatured: false,
    tags: ["Culture", "Events"],
    views: 3860,
    createdAt: "2026-09-11T13:00:00.000Z",
    isPermium: false,
    author: { name: "Nusrat Jahan" },
    _count: { comments: 6 },
  },
  {
    // Premium: filtered out by the list below, to show the filter works.
    id: "2c8d3a1f-2222-4b02-8b02-000000000007",
    title: "Subscribers only: the long read behind the ring road plan",
    content: "An in-depth look at the planning process, for subscribers.",
    thumbnail: null,
    isFeatured: false,
    tags: ["Long read"],
    views: 900,
    createdAt: "2026-09-18T07:00:00.000Z",
    isPermium: true,
    author: { name: "Imran Chowdhury" },
    _count: { comments: 1 },
  },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

type PublicNewsListProps = {
  posts?: IPost[];
};

const PublicNewsList = ({ posts = samplePosts }: PublicNewsListProps) => {
  const publicPosts = posts
    .filter((post) => !post.isPermium)
    // Featured first, then newest
    .sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Latest news
        </h1>
        <p className="mt-3 text-muted-foreground">
          Free to read. {publicPosts.length}{" "}
          {publicPosts.length === 1 ? "story" : "stories"} available.
        </p>
      </header>

      {publicPosts.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="font-medium">No news yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            New stories will show up here as soon as they are published.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publicPosts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PublicNewsList;
