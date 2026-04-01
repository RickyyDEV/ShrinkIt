import z from "zod";
import { authorized } from "../procedure";
import { prisma } from "@/app/(database)/database";

const getUserUrls = authorized
  .route({
    method: "GET",
  })
  .input(
    z.object({
      cursor: z
        .object({
          id: z.number(),
          createdAt: z.date(),
        })
        .optional(),
      limit: z.number().default(10),
    }),
  )
  .handler(async ({ context, input: { cursor, limit } }) => {
    console.log(cursor);
    const urls = await prisma.url.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor
        ? {
            createdAt_id: {
              createdAt: cursor.createdAt,
              id: cursor.id,
            },
          }
        : undefined,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      where: {
        userId: context.user.id,
      },
    });
    const nextCursor = urls.length ? urls[urls.length - 1].id : null;
    return { urls, nextCursor };
  });

const addUserUrl = authorized
  .route({
    method: "POST",
  })
  .input(
    z.object({
      url: z.url(),
    }),
  )
  .handler(async ({ context, input: { url } }) => {
    await prisma.url.create({
      data: {
        url,
        userId: context.user.id,
      },
    });
    return { ok: true };
  });

export const url = { getById: getUserUrls, add: addUserUrl };
