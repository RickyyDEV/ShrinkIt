import { auth } from "../(auth)/auth";
import { base } from "./context";
import { ORPCError } from "@orpc/server";

const authMiddleware = base.middleware(async ({ context, next }) => {
  const sessionData = await auth.api.getSession({
    headers: context.headers, // or reqHeaders if you're using the plugin
  });

  if (!sessionData?.session || !sessionData?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }

  // Adds session and user to the context
  return next({
    context: {
      session: sessionData.session,
      user: sessionData.user,
    },
  });
});

export const authorized = base.use(authMiddleware);
