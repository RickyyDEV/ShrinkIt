import { headers } from "vinext/shims/headers";
import SidebarWrapper from "./layout-wrapper";
import { auth } from "../(auth)/auth";
import { redirect } from "vinext/shims/navigation";
import { SessionProvider } from "../(auth)/user-context";
import { TooltipProvider } from "../components/ui/tooltip";
import { Providers } from "../rpc/client/providers";
import { Toaster } from "../components/ui/sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  if (!user?.session) redirect("/auth");
  return (
    <html lang="pt-br">
      <body>
        <main>
          <SessionProvider value={{ user: user.user, session: user.session }}>
            <Providers>
              <TooltipProvider>
                <SidebarWrapper>{children}</SidebarWrapper>
                <Toaster />
              </TooltipProvider>
            </Providers>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
