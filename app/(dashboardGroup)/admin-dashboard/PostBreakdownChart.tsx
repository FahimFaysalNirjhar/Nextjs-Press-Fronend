// app/(dashboardGroup)/admin-dashboard/PostBreakdownChart.tsx
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  published: number;
  draft: number;
  archived: number;
  premium: number;
  featured: number;
};

export function PostBreakdownChart({
  published,
  draft,
  archived,
  premium,
  featured,
}: Props) {
  const data = [
    { name: "Published", value: published },
    { name: "Draft", value: draft },
    { name: "Archived", value: archived },
    { name: "Premium", value: premium },
    { name: "Featured", value: featured },
  ];

  return (
    <div className="h-55 w-full sm:h-65">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="stroke-muted"
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={40}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            width={40}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(var(--border))",
              fontSize: 13,
            }}
            formatter={(value) => [String(value ?? 0), "Posts"]}
          />
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            fill="hsl(var(--primary))"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
