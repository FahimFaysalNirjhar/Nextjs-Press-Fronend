import {
  ClipboardCheck,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  PenLine,
  UserCircle,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Role = "USER" | "AUTHOR" | "ADMIN";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

export const navByRole: Record<Role, NavItem[]> = {
  USER: [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "My subscription",
      href: "/dashboard/subscription",
      icon: CreditCard,
    },
    { label: "My comments", href: "/dashboard/comments", icon: MessageSquare },
    { label: "Become an author", href: "/dashboard/apply", icon: PenLine },
    { label: "Profile", href: "/profile", icon: UserCircle },
  ],
  AUTHOR: [
    {
      label: "Overview",
      href: "/author-dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "My subscription",
      href: "/author-dashboard/subscription",
      icon: CreditCard,
    },
    { label: "My posts", href: "/author-dashboard/my-posts", icon: FileText },
    {
      label: "Comments",
      href: "/author-dashboard/comments",
      icon: MessageSquare,
    },
    { label: "Profile", href: "/profile", icon: UserCircle },
  ],
  ADMIN: [
    {
      label: "Overview",
      href: "/admin-dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    { label: "Users", href: "/admin-dashboard/users", icon: Users },
    {
      label: "Applications",
      href: "/admin-dashboard/applications",
      icon: ClipboardCheck,
    },
    { label: "All posts", href: "/admin-dashboard/posts", icon: Newspaper },
    {
      label: "Comments",
      href: "/admin-dashboard/comments",
      icon: MessageSquare,
    },

    { label: "Profile", href: "/profile", icon: UserCircle },
  ],
};
