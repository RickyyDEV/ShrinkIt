import { headers } from "vinext/shims/headers";
import SidebarWrapper from "./layout-wrapper";
import type { Metadata } from "vinext/shims/metadata";
import { auth } from "../(auth)/auth";
import { redirect } from "vinext/shims/navigation";
import { SessionProvider } from "../(auth)/user-context";
import { TooltipProvider } from "../components/ui/tooltip";

export const metadata: Metadata = {
  title: "ShrinkIt - Encurtador de URLs",
  description: "Encurte seus links de forma rápida e simples.",
  icons: {
    icon: "/icon",
    apple: "/icon",
    shortcut: "/icon",
  },
  openGraph: {
    title: "ShrinkIt - Encurtador de URLs",
    description: "Encurte seus links de forma rápida e simples.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "ShrinkIt - Encurtador de URLs",
    description: "Encurte seus links de forma rápida e simples.",
  },
};

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
            <TooltipProvider>
              {/* <SidebarWrapper> */}
              {children}
              {/* </SidebarWrapper> */}
            </TooltipProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
