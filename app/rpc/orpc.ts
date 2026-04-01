import type { RouterClient } from "@orpc/server";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCClient } from "@orpc/client";
import type router from "./router";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
declare global {
  var $client: RouterClient<typeof router> | undefined;
}
const link = new RPCLink({
  url: `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/rpc`,
  headers: async () => {
    if (typeof window !== "undefined") {
      return {};
    }

    const { headers } = await import("vinext/shims/headers");
    return await headers();
  },
});

export const client: RouterClient<typeof router> =
  globalThis.$client ?? createORPCClient(link);
export const orpc = createTanstackQueryUtils(client);
