// app/api/hello/route.ts
import { prisma } from "@/app/(database)/database";
import { notFound } from "vinext/shims/navigation";
import { NextResponse } from "vinext/shims/server";

export async function GET(
  request: Request,
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
      return NextResponse.redirect(url.url);
    } else {
      return notFound();
    }
  } else {
    return notFound();
  }
}
