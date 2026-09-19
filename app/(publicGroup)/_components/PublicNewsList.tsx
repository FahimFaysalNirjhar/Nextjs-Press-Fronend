import { IPost } from "@/lib/types";
import NewsCard from "./NewsCard";
import { getPublicNews } from "../_actions/getPublicNews";

// type PostsResponse = {
//   success: boolean;
//   message?: string;
//   data?: IPost[];
// };

/* ------------------------------ Sample data ------------------------------ */

// const samplePosts: IPost[] = [
//   {
//     id: "2c8d3a1f-2222-4b02-8b02-000000000001",
//     title: "City council approves new bus lanes on the main ring road",
//     content:
//       "The council voted this week to add dedicated bus lanes along the ring road, with work expected to begin next quarter. Commuter groups welcomed the decision, while some shop owners asked for clearer plans on loading zones and parking. ".repeat(
//         6,
//       ),
//     thumbnail: "https://picsum.photos/seed/buslanes/1200/700",
//     isFeatured: true,
//     tags: ["City", "Transport"],
//     views: 21340,
//     createdAt: "2026-09-18T06:15:00.000Z",
//     isPermium: false,
//     author: { name: "Imran Chowdhury" },
//     _count: { comments: 37 },
//   },
//   {
//     id: "2c8d3a1f-2222-4b02-8b02-000000000002",
//     title: "Schools reopen after flood repairs, with classes running in shifts",
//     content:
//       "Most of the affected schools reopened on Sunday after weeks of repairs. To make up for lost time, many are running morning and afternoon shifts, and teachers say the first week is mostly about getting students back into a routine. ".repeat(
//         5,
//       ),
//     thumbnail: "https://picsum.photos/seed/schools/800/450",
//     isFeatured: false,
//     tags: ["Education", "Local"],
//     views: 8740,
//     createdAt: "2026-09-17T09:40:00.000Z",
//     isPermium: false,
//     author: { name: "Nusrat Jahan" },
//     _count: { comments: 14 },
//   },
//   {
//     id: "2c8d3a1f-2222-4b02-8b02-000000000003",
//     title: "Local team wins the regional football final in extra time",
//     content:
//       "A late goal in the second half of extra time settled a tense final on Saturday evening. The winning side dedicated the trophy to its supporters, many of whom travelled overnight to attend. ".repeat(
//         5,
//       ),
//     thumbnail: "https://picsum.photos/seed/football/800/450",
//     isFeatured: false,
//     tags: ["Sports"],
//     views: 15690,
//     createdAt: "2026-09-16T18:05:00.000Z",
//     isPermium: false,
//     author: { name: "Tanvir Hossain" },
//     _count: { comments: 52 },
//   },
//   {
//     id: "2c8d3a1f-2222-4b02-8b02-000000000004",
//     title: "Weekend weather: scattered showers, cooler evenings",
//     content:
//       "Forecasters expect scattered showers on Saturday, easing by Sunday afternoon. Evenings will be a few degrees cooler than last week, and light winds are expected across most districts.",
//     thumbnail: null,
//     isFeatured: false,
//     tags: ["Weather"],
//     views: 5230,
//     createdAt: "2026-09-15T04:30:00.000Z",
//     isPermium: false,
//     author: { name: "Newsdesk" },
//     _count: { comments: 2 },
//   },
//   {
//     id: "2c8d3a1f-2222-4b02-8b02-000000000005",
//     title: "Startup fair draws record crowd of young founders",
//     content:
//       "More than a hundred early-stage teams showed prototypes at this year's startup fair. Visitors tried out apps for farming, logistics and health, and several teams said they met their first investors on the day. ".repeat(
//         5,
//       ),
//     thumbnail: "https://picsum.photos/seed/startupfair/800/450",
//     isFeatured: false,
//     tags: ["Technology", "Business"],
//     views: 11080,
//     createdAt: "2026-09-13T11:20:00.000Z",
//     isPermium: false,
//     author: { name: "Anika Rahman" },
//     _count: { comments: 21 },
//   },
//   {
//     id: "2c8d3a1f-2222-4b02-8b02-000000000006",
//     title: "Book fair extends opening hours for the final week",
//     content:
//       "Organisers announced that the book fair will stay open two hours later each evening until it closes. Publishers are also offering discounts on children's titles and school textbooks.",
//     thumbnail: "https://picsum.photos/seed/bookfair/800/450",
//     isFeatured: false,
//     tags: ["Culture", "Events"],
//     views: 3860,
//     createdAt: "2026-09-11T13:00:00.000Z",
//     isPermium: false,
//     author: { name: "Nusrat Jahan" },
//     _count: { comments: 6 },
//   },
// ];

/* ------------------------------ Data source ------------------------------ */

// async function getPublicPosts(): Promise<PostsResponse> {
//   // Fake latency so you can see NewsSkeleton. Remove when using the real API.
//   await new Promise((resolve) => setTimeout(resolve, 1500));

//   return { success: true, data: samplePosts };

//   /* Real API version:
//   try {
//     const res = await fetch(`${process.env.API_URL}/posts?isPremium=false`, {
//       next: { revalidate: 60 },
//     })
//     const result: PostsResponse = await res.json()

//     if (!res.ok || !result.success) {
//       return { success: false, message: result.message ?? "Failed to load posts" }
//     }
//     return result
//   } catch {
//     return { success: false, message: "Could not reach the server" }
//   }
//   */
// }

/* ------------------------------ Component ------------------------------- */

// Async Server Component: the page streams the skeleton until this resolves.
export const PublicNewsList = async () => {
  const result = await getPublicNews();

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load the news</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  // Public page: never show premium posts, even if the API sends them
  const posts = (result.data ?? [])
    .filter((post: IPost) => !post.isPermium)
    .sort((a: IPost, b: IPost) => {
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">No news yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          New stories will show up here as soon as they are published.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post: IPost) => (
        <NewsCard key={post.id} post={post} />
      ))}
    </div>
  );
};
