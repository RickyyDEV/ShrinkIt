"use client";
import { Button } from "@/app/components/ui/button";
import { client, orpc } from "@/app/rpc/orpc";
import { Plus } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AddLinkModal from "@/app/components/dashboard/links/modal";

export default function Page() {
  const { data } = useInfiniteQuery(
    orpc.url.getById.infiniteOptions({
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      input: (pageParam: any) => ({
        limit: 10,
        cursor: pageParam,
      }),
    }),
  );
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-extrabold font-[Manrope] text-white tracking-tight">
            Meus links
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Gerencie e monitore todos os seus links encurtados.
          </p>
        </div>

        <AddLinkModal />
      </div>
    </div>
  );
}
