// app/(dashboardGroup)/admin-dashboard/CommentBreakdownChart.tsx
"use client";

import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  approved: number;
  rejected: number;
  total: number;
};

const COLORS = ["#10b981", "#ef4444", "#94a3b8"];

export function CommentBreakdownChart({ approved, rejected, total }: Props) {
  const pending = Math.max(total - approved - rejected, 0);

  const data = [
    { name: "Approved", value: approved },
    { name: "Rejected", value: rejected },
    { name: "Pending", value: pending },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        No comments yet.
      </p>
    );
  }

  return (
    <div className="h-60 w-full sm:h-70">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="45%"
            outerRadius="70%"
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(var(--border))",
              fontSize: 13,
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={32}
            iconType="circle"
            wrapperStyle={{ fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
