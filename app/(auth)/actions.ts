"use server";

import { headers } from "vinext/shims/headers";
import { auth } from "./auth";
import { redirect } from "vinext/shims/navigation";

export async function GoogleLogin() {
  return await auth.api.signInSocial({
    headers: await headers(),
    body: {
      provider: "google",
      callbackURL: "/dashboard",
    },
  });
}

export async function LogOut() {
  await auth.api
    .signOut({
      headers: await headers(),
    })
    .then((e) => e.success && redirect("/auth/"));
}
