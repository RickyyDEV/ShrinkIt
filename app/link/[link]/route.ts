// app/api/hello/route.ts
import { prisma } from "@/app/(database)/database";
import { client } from "@/app/(database)/redis";
import { notFound } from "vinext/shims/navigation";
import { NextResponse, type NextRequest } from "vinext/shims/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { link: string } },
) {
  const { link } = params;
  if (link.length === 8) {
    const url = await prisma.url.findUnique({
      where: {
        code: link,
      },
    });
    if (url) {
      if (url.password) {
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
