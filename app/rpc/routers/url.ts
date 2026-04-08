"use server";

import z from "zod";
import { authorized } from "../procedure";
import { prisma } from "@/app/(database)/database";
import { ORPCError } from "@orpc/client";

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
      search: z.string().optional(),
    }),
  )
  .handler(async ({ context, input: { cursor, limit, search } }) => {
    try {
      const where = {
        userId: context.user.id,
        ...(search && {
          url: {
            contains: search,
            mode: "insensitive" as const,
          },
        }),
      };
      const urls = await prisma.url.findMany({
        take: limit + 1,
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
        where,
      });
      const hasNextPage = urls.length > limit;
      const items = hasNextPage ? urls.slice(0, limit) : urls;
      const lastItem = items.length ? items[items.length - 1] : null;
      return {
        urls: items,
        cursor: hasNextPage
          ? { id: lastItem!.id, createdAt: lastItem!.createdAt }
          : null,
      };
    } catch (error) {
      console.error(error);
      throw new ORPCError("Erro ao buscar URLs");
    }
  });

const addUserUrl = authorized
  .route({
    method: "POST",
  })
  .input(
    z.object({
      url: z.url(),
      expiration: z.date().optional(),
      password: z
        .string()
        .min(3, "Mínimo de 3 caracteres")
        .max(12, "Máximo de 12 caracteres.")
        .optional(),
    }),
  )
  .handler(
    async ({ context, input: { url, expiration, password }, errors }) => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const testLink = await fetch(url, {
          method: "HEAD",
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!testLink.ok) throw new ORPCError("URL inválida ou inacessível");
      } catch {
        throw new ORPCError("URL inválida ou inacessível");
      }
      try {
        const count = await prisma.url.count({
          where: {
            userId: context.user.id,
          },
        });
        if (count < 3)
          await prisma.url.create({
            data: {
              url,
              expireAt: expiration,
              password: password && (await Bun.password.hash(password)),
              userId: context.user.id,
            },
          });
        else throw new ORPCError("Você só pode criar até 3 URLs encurtadas");
      } catch (error) {
        console.error(error);
        throw new ORPCError("Erro ao criar URL");
      }

      return { ok: true };
    },
  );

const removeUserUrl = authorized
  .route({
    method: "POST",
  })
  .input(
    z.object({
      id: z.number(),
    }),
  )
  .handler(async ({ context, input: { id } }) => {
    try {
      await prisma.url.delete({
        where: {
          id,
          userId: context.user.id,
        },
      });
      return { ok: true };
    } catch (error) {
      throw new ORPCError("URL não encontrada, tente novamente mais tarde");
    }
  });

const getInitialData = authorized
  .route({
    method: "GET",
  })
  .handler(async ({ context }) => {
    try {
      const [urls, count, accesses] = await prisma.$transaction([
        prisma.url.findMany({
          where: {
            userId: context.user.id,
          },
          take: 3,
        }),
        prisma.url.count({
          where: {
            userId: context.user.id,
          },
        }),
        prisma.url.aggregate({
          _sum: { accesses: true },
          where: { userId: context.user.id },
        }),
      ]);
      return { urls, count, accesses: accesses._sum.accesses ?? 0 };
    } catch (error) {
      throw new ORPCError("URL não encontrada, tente novamente mais tarde");
    }
  });
export const url = {
  getById: getUserUrls,
  add: addUserUrl,
  remove: removeUserUrl,
  initial: getInitialData,
};
