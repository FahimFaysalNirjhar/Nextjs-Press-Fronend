"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "@/components/ui/tooltip";

import { logOut } from "@/service/logout";
import { navByRole } from "../_config/dashboard-nav";
import { IUser } from "@/lib/types";

type DashboardSidebarProps = {
  user: IUser;
};

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { state, toggleSidebar, setOpenMobile } = useSidebar();

  const items = navByRole[user.role];

  const handleNavigation = () => {
    // Close sidebar when navigating on mobile
    setOpenMobile(false);
  };

  const handleLogout = async () => {
    try {
      // Close mobile sidebar first
      setOpenMobile(false);

      await logOut();

      toast.success("Logged out successfully");
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="top-14 h-[calc(100svh-3.5rem)]">
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          {state === "expanded" ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  NP
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Nextjs Press</span>

                  <span className="text-xs text-muted-foreground">
                    Dashboard
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleSidebar}
                aria-label="Collapse sidebar"
                className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Expand sidebar"
              className="group/logo flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
            >
              <span className="group-hover/logo:hidden">NP</span>

              <PanelLeftOpen className="hidden h-4 w-4 group-hover/logo:block" />
            </button>
          )}
        </div>

        {/* User Card */}
        <div className="border-b p-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-3">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user.profile?.profilePhoto ?? undefined}
                alt={user.name}
              />

              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {state === "expanded" && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user.name}</p>

                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>

                <Badge
                  variant="secondary"
                  className="mt-1 px-1.5 py-0 text-[10px]"
                >
                  {user.role}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarContent>
          <SidebarGroup className="px-3 py-4 group-data-[collapsible=icon]:px-2">
            <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Main
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {items.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className="h-10 rounded-lg transition-all data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-sm"
                      >
                        <Link href={item.href} onClick={handleNavigation}>
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t p-3 group-data-[collapsible=icon]:p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip="Log out"
                className="h-10 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
