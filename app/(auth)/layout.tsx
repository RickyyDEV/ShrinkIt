import { headers } from "vinext/shims/headers";
import { auth } from "./auth";
import { redirect } from "vinext/shims/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  if (user?.session) redirect("/dashboard");
  else return <section>{children}</section>;
}
