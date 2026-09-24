// lib/dashboard-links.ts
export const dashboardByRole = {
  ADMIN: { label: "Admin Dashboard", href: "/admin-dashboard", badge: "Admin" },
  AUTHOR: {
    label: "Author Dashboard",
    href: "/author-dashboard",
    badge: "Author",
  },
  USER: { label: "My Dashboard", href: "/dashboard", badge: "Member" },
} as const;

export type DashboardRole = keyof typeof dashboardByRole;

export const PROFILE_HREF = "/";

export function getDashboard(role?: string | null) {
  const key = String(role ?? "USER").toUpperCase() as DashboardRole;
  return dashboardByRole[key] ?? dashboardByRole.USER;
}
