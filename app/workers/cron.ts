import Baker from "cronbake";
import { client } from "../(database)/redis";
import { prisma } from "../(database)/database";

// Create a new Baker instance
const baker = Baker.create();

const dailyJob = baker.add({
  name: "daily-job",
  cron: "@every_minute",
  immediate: true,
  callback: async () => {
    let cursor = 0;

    do {
      const [nextCursor, keys] = await client.scan(
        cursor,
        "MATCH",
        "clicks:*",
        "COUNT",
        100,
      );

      cursor = Number(nextCursor);

      for (const key of keys) {
        const count = Number(await client.get(key));
        if (!count) continue;

        const code = key.split(":")[1];
        await prisma.url.update({
          where: { code },
          data: {
            accesses: {
              increment: count,
            },
          },
        });

        await client.del(key);
      }
    } while (cursor !== 0);
  },
});

baker.bakeAll();
