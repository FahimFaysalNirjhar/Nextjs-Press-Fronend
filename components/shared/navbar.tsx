// components/navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Crown,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { logOut } from "@/service/logout";
import { NavbarProps } from "@/lib/types";

/* ---------- Config (adjust routes here) ---------- */

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Premium News", href: "/premium", icon: Crown, premium: true },
];

const dashboardByRole = {
  ADMIN: { label: "Admin Dashboard", href: "/admin-dashboard", badge: "Admin" },
  AUTHOR: {
    label: "Author Dashboard",
    href: "/dashboard/author",
    badge: "Author",
  },
  USER: { label: "My Dashboard", href: "/dashboard", badge: "Member" },
} as const;

const PROFILE_HREF = "/dashboard/profile";

/* ---------- Small helpers ---------- */

function UserAvatar({
  user,
  className,
}: {
  user: NavbarProps["user"];
  className?: string;
}) {
  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase();
  return (
    <Avatar className={className}>
      <AvatarImage
        src={user?.profile?.profilePhoto ?? undefined}
        alt={user?.name ?? "User avatar"}
      />
      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
        {initial ?? <UserRound className="size-4" aria-hidden />}
      </AvatarFallback>
    </Avatar>
  );
}

/* ---------- Navbar ---------- */

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const role = String(
    user?.role ?? "USER",
  ).toUpperCase() as keyof typeof dashboardByRole;
  const dashboard = dashboardByRole[role] ?? dashboardByRole.USER;

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = async () => {
    await logOut();
    toast.success("Logged out successfully");
    setOpen(false);
    router.push("/Login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center  gap-4 px-4">
        {/* Left: hamburger (mobile) + logo */}
        <div className="flex flex-1 items-center gap-1">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-ml-2 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="flex w-[85%] max-w-xs flex-col gap-0 p-0"
            >
              <SheetHeader className="border-b px-5 py-4 text-left">
                <SheetTitle className="text-lg font-semibold tracking-tight">
                  Nextjs Press
                </SheetTitle>
              </SheetHeader>

              {/* Links */}
              <nav
                aria-label="Main"
                className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
              >
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-5",
                            item.premium && "text-amber-500",
                          )}
                          aria-hidden
                        />
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Account area */}
              <div className="space-y-3 border-t p-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                      <UserAvatar user={user} className="size-10" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-1">
                      <SheetClose asChild>
                        <Link
                          href={dashboard.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                        >
                          <LayoutDashboard className="size-4" aria-hidden />
                          {dashboard.label}
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href={PROFILE_HREF}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                        >
                          <UserRound className="size-4" aria-hidden />
                          Profile
                        </Link>
                      </SheetClose>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="size-4" aria-hidden />
                        Log out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="grid gap-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/Login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/Register">Register</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="text-lg font-semibold tracking-tight">
            Nextjs Press
          </Link>
        </div>

        {/* Center/right: desktop nav */}
        <nav aria-label="Main" className=" hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.premium && (
                  <Crown className="size-3.5 text-amber-500" aria-hidden />
                )}
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-2.5 h-0.5 rounded-full bg-foreground"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: account */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full p-0 ring-offset-background transition hover:ring-2 hover:ring-border"
                  aria-label="Open account menu"
                >
                  <UserAvatar user={user} className="size-9" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64 p-1.5">
                <div className="flex items-center gap-3 px-2 py-2.5">
                  <UserAvatar user={user} className="size-10" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium leading-tight">
                      {user.name ?? "My account"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <Badge variant="secondary" className="text-[11px]">
                    {dashboard.badge}
                  </Badge>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="cursor-pointer py-2">
                  <Link href={dashboard.href}>
                    <LayoutDashboard className="mr-2 size-4" aria-hidden />
                    {dashboard.label}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer py-2">
                  <Link href={PROFILE_HREF}>
                    <UserRound className="mr-2 size-4" aria-hidden />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onSelect={handleLogout}
                  className="cursor-pointer py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" aria-hidden />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/Login">Login</Link>
              </Button>
              <Button size="sm" asChild className="hidden sm:inline-flex">
                <Link href="/Register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
