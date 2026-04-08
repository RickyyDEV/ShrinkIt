"use client";
import { usePathname } from "vinext/shims/navigation";
import DashboardNav from "../components/dashboard/navbar";
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const page = path === "/dashboard" ? "Dashboard" : "Links";

  return (
    <SidebarProvider>
      <DashboardNav />
      <SidebarInset>
        {/* Header: trigger só aparece no desktop */}
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 z-40">
          <SidebarTrigger className="-ml-1 hidden md:flex" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 hidden md:block"
          />
          <h1 className="font-semibold">{page}</h1>
        </header>

        {/* Conteúdo: padding-bottom extra no mobile para não ficar atrás da bottom nav */}
        <div className="flex flex-1 flex-col gap-4 p-5 pb-24 md:p-14 md:pb-14">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
