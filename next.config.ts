import type { NextConfig } from "vinext";
import { env } from "./env";

const nextConfig: NextConfig = {
  headers: async () => {
    return [
      {
        source: "/link/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Use specific domain in prod
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
        ],
      },
    ];
  },
};

export default nextConfig;
