// app/api/hello/route.ts
import { prisma } from "@/app/(database)/database";
import { client } from "@/app/(database)/redis";
import { notFound } from "vinext/shims/navigation";
import { NextResponse, type NextRequest } from "vinext/shims/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  const { code } = params;
  if (code.length === 8) {
    const url = await prisma.url.findUnique({
      where: {
        code,
      },
    });
    if (url) {
      if (url.expireAt && url.expireAt < new Date()) {
        await prisma.url.delete({
          where: {
            code,
          },
        });
        return notFound();
      }
      if (url.password) {
        return NextResponse.redirect(
          new URL(`/link/p/${url.code}`, request.url),
        );
      }
      await client.incr(`clicks:${url.code}`);
      return NextResponse.redirect(url.url);
    } else {
      return notFound();
    }
  } else {
    return notFound();
  }
}
