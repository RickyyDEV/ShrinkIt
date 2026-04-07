import { env } from "@/env";
import { RedisClient } from "bun";

export const client = new RedisClient(env.REDIS_URL);
