"use client";
import Logo from "../logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";
import { usePathname } from "vinext/shims/navigation";
import { LayoutDashboard, LinkIcon, LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "@/app/(auth)/user-context";
import { cn } from "../lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { LogOut } from "@/app/(auth)/actions";
import Link from "vinext/shims/link";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/links", label: "Links", icon: LinkIcon },
];

export default function DashboardNav() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const { user } = useSession();

  const isCollapsed = state === "collapsed";

  return (
    <>
      <Sidebar collapsible="offcanvas" className="hidden md:flex">
        <SidebarHeader className="items-center pt-8 pb-4">
          {isCollapsed ? <LinkIcon className="text-primary" /> : <Logo />}
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="space-y-1">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-3 text-[#aaaab8] rounded-r-full py-3 px-6",
                      "hover:translate-x-0.5 transition-transform duration-200",
                      pathname === href &&
                        "bg-[#1d1f2d] text-[#7AA2F7] border-l-4 border-[#7AA2F7]",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {!isCollapsed && (
                      <span className="font-label text-xs uppercase tracking-[0.05em] font-medium">
                        {label}
                      </span>
                    )}
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div
                className={cn(
                  "flex items-center gap-2 p-3 rounded-xl bg-primary-foreground",
                  isCollapsed && "flex-col",
                )}
              >
                <Avatar className="h-8 w-8 rounded-lg shrink-0">
                  <AvatarImage
                    src={user.image!}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.name?.slice(0, 2).toUpperCase() ?? "AA"}
                  </AvatarFallback>
                </Avatar>

                {!isCollapsed && (
                  <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                )}

                <Button
                  onClick={async () => await LogOut()}
                  variant="destructive"
                  size="icon"
                  className="rounded-md shrink-0"
                  title="Sair"
                >
                  <LogOutIcon className="size-4" />
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="flex items-center justify-around h-16 px-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 flex-1 py-2 rounded-xl transition-colors",
                  active
                    ? "text-[#7AA2F7]"
                    : "text-[#aaaab8] hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-5 transition-transform duration-200",
                    active && "scale-110",
                  )}
                />
                <span className="text-[10px] uppercase tracking-[0.05em] font-medium">
                  {label}
                </span>
              </Link>
            );
          })}

          <button
            onClick={async () => await LogOut()}
            className="flex flex-col items-center gap-1 flex-1 py-2 rounded-xl text-[#aaaab8] hover:text-destructive transition-colors"
            title="Sair"
          >
            <LogOutIcon className="size-5" />
            <span className="text-[10px] uppercase tracking-[0.05em] font-medium">
              Sair
            </span>
          </button>
        </div>
      </nav>

      <div className="md:hidden h-16" />
    </>
  );
}
