"use client";
import Logo from "../logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";
import { usePathname, useRouter } from "vinext/shims/navigation";
import { LayoutDashboard, Link, LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "@/app/(auth)/user-context";
import { cn } from "../lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { authClient } from "@/app/(auth)/auth-client";

export default function DashboardNav() {
  const { state } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSession();
  return (
    <>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="items-center pt-8">
          {state === "collapsed" ? <Link className="text-primary" /> : <Logo />}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/dashboard")}
                  className={cn(
                    "flex items-center gap-3  text-[#aaaab8] rounded-r-full py-3 px-6 hover:translate-x-0.5 transition-transform duration-200",
                    pathname === "/dashboard" &&
                      "bg-[#1d1f2d] text-[#7AA2F7] border-l-4 border-[#7AA2F7] ",
                  )}
                >
                  <LayoutDashboard />
                  <span className="font-label text-xs uppercase tracking-[0.05em] font-medium">
                    Dashboard
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push("/dashboard/links")}
                  className={cn(
                    "flex items-center gap-3  text-[#aaaab8] rounded-r-full py-3 px-6 hover:translate-x-0.5 transition-transform duration-200",
                    pathname === "/dashboard/links" &&
                      "bg-[#1d1f2d] text-[#7AA2F7] border-l-4 border-[#7AA2F7] ",
                  )}
                >
                  <Link />
                  <span className="font-label text-xs uppercase tracking-[0.05em] font-medium">
                    Links
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-2 p-4 rounded-xl text-left text-sm bg-primary-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.image!}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <Button
                  onClick={async () => {
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push("/auth/login");
                        },
                      },
                    });
                  }}
                  variant={"destructive"}
                  className={"rounded-md"}
                >
                  <LogOutIcon />
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
