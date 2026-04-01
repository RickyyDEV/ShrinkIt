import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "@/env";
import { prisma } from "../(database)/database";
import { RedisClient } from "bun";

const client = new RedisClient(env.REDIS_URL);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secondaryStorage: {
    get: async (key) => {
      return await client.get(key);
    },
    set: async (key, value, ttl) => {
      if (ttl) {
        await client.set(key, value);
        await client.expire(key, ttl);
      } else await client.set(key, value);
    },
    delete: async (key) => {
      await client.del(key);
    },
  },
  baseURL: env.BETTER_AUTH_URL,
  experimental: { joins: true },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "x-real-ip"],
    },
  },
  trustedOrigins: ["http://localhost:3000", env.BETTER_AUTH_URL],
  plugins: [nextCookies()],
});
