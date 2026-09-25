import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import { Navbar } from "@/components/shared/navbar";

const DashboardGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const result = await getMe();
  const user = result.success ? result.data.profile : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Main Navbar */}
      <div className="relative z-50">
        <Navbar user={user} />
      </div>

      {/* Dashboard Area */}
      <SidebarProvider className="h-[calc(100svh-4rem)] min-h-0 w-full">
        <div className="flex h-full w-full min-w-0">
          {/* Sidebar */}
          <DashboardSidebar user={user} />

          {/* Main Content */}
          <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
            {/* Mobile Sidebar Trigger */}
            <div className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur md:hidden">
              <SidebarTrigger className="size-9" />

              <span className="text-sm font-semibold">Dashboard</span>
            </div>

            {/* Page Content */}
            <div className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardGroupLayout;
