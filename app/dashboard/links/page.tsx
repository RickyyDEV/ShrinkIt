"use client";
import { Button } from "@/app/components/ui/button";
import { client, orpc } from "@/app/rpc/orpc";
import { Loader, Loader2, MessageSquareWarning, Plus, X } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AddLinkModal from "@/app/components/dashboard/links/modal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import type { Url } from "@/app/(database)/generated/client";

export default function Page() {
  const { data, isLoading, isError, hasNextPage } = useInfiniteQuery(
    orpc.url.getById.infiniteOptions({
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      input: (pageParam: any) => ({
        limit: 10,
        cursor: pageParam,
      }),
    }),
  );
  const urls = data?.pages?.flatMap((e) => e.urls) ?? [];
  return (
    <div className="space-y-20">
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

      {isError && (
        <div className="flex flex-col items-center justify-center">
          <MessageSquareWarning size={60} />
          <h1 className="text-2xl max-w-1/3 text-center">
            Ocorreu um erro ao carregar os seus links, tente novamente mais
            tarde.
          </h1>
          <p className="text-center">Será que você já adicionou algum link?</p>
        </div>
      )}
      {isLoading && (
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin" size={60} />
          <p>Carregando...</p>
        </div>
      )}

      {!isLoading && urls && urls.length > 0 && (
        <>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Link curto</TableHead>
                <TableHead>URL de destino</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urls.map((a, _id) => (
                <TableRow key={_id}>
                  <TableCell className="font-medium text-primary">
                    https://shrinkit.rihosting.com.br/link/{a.code}
                  </TableCell>
                  <TableCell>{a.url}</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
