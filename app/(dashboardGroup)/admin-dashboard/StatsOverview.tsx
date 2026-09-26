// app/(dashboardGroup)/admin-dashboard/StatsOverview.tsx
import {
  FileText,
  CheckCircle2,
  Lock,
  Star,
  FileEdit,
  Archive,
  MessageSquare,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPostsStats } from "../_actions/statsActions";
import { PostBreakdownChart } from "./PostBreakdownChart";
import { CommentBreakdownChart } from "./CommentBreakdownChart";

export async function StatsOverview() {
  const result = await getPostsStats();

  if (!result.success) {
    return (
      <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
        <p className="font-medium">Couldn&apos;t load statistics</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const stats = result.data;

  const primaryCards = [
    {
      label: "Total posts",
      value: stats.totalPost,
      icon: FileText,
      accent: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      label: "Published",
      value: stats.totalPublishedPost,
      icon: CheckCircle2,
      accent: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Premium posts",
      value: stats.totalPremium,
      icon: Lock,
      accent: "text-purple-600",
      bg: "bg-purple-500/10",
    },
    {
      label: "Featured posts",
      value: stats.totalFeatured,
      icon: Star,
      accent: "text-amber-600",
      bg: "bg-amber-500/10",
    },
    {
      label: "Drafts",
      value: stats.totalDraftPost,
      icon: FileEdit,
      accent: "text-slate-600",
      bg: "bg-slate-500/10",
    },
    {
      label: "Archived",
      value: stats.totalArchivedPost,
      icon: Archive,
      accent: "text-zinc-600",
      bg: "bg-zinc-500/10",
    },
    {
      label: "Total comments",
      value: stats.totalComments,
      icon: MessageSquare,
      accent: "text-cyan-600",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Total views",
      value: stats.totalPostViews,
      icon: Eye,
      accent: "text-rose-600",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {primaryCards.map((card) => (
          <Card key={card.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`rounded-lg p-2.5 ${card.bg}`}>
                <card.icon className={`size-5 ${card.accent}`} aria-hidden />
              </div>
              <div>
                <p className="text-2xl font-semibold leading-none tabular-nums">
                  {card.value.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {card.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Post breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostBreakdownChart
              published={stats.totalPublishedPost}
              draft={stats.totalDraftPost}
              archived={stats.totalArchivedPost}
              premium={stats.totalPremium}
              featured={stats.totalFeatured}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Comment moderation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CommentBreakdownChart
              approved={stats.totalApprovedComments}
              rejected={stats.totalRejectedComments}
              total={stats.totalComments}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
