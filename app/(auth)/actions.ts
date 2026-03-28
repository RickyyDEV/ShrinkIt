"use server";

import { headers } from "vinext/shims/headers";
import { auth } from "./auth";

export async function GoogleLogin() {
  return await auth.api.signInSocial({
    headers: await headers(),
    body: {
      provider: "google",
      callbackURL: "/dashboard",
    },
  });
}

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
