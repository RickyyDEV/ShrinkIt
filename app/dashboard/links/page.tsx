"use client";
import { orpc } from "@/app/rpc/orpc";
import { EllipsisIcon, Loader2, MessageSquareWarning } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AddLinkModal from "@/app/components/dashboard/links/modal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import Link from "vinext/shims/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { useConfirmDeleteModal } from "@/app/components/dashboard/links/remove/remove-store";
import RemoveModal from "@/app/components/dashboard/links/remove/remove-modal";
import SearchComponent from "@/app/components/dashboard/links/search";
import { useQueryState } from "nuqs";
import { CopyButton } from "@/app/components/dashboard/copy-button";

export default function Page() {
  const { openModal } = useConfirmDeleteModal();
  const [search] = useQueryState("s", {
    defaultValue: "",
  });
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    orpc.url.getById.infiniteOptions({
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage.cursor?.id != null ? lastPage.cursor : undefined,
      input: (cursor: any) => {
        return {
          limit: 10,
          search,
          cursor: cursor && {
            createdAt: cursor.createdAt,
            id: cursor.id,
          },
        };
      },
    }),
  );
  const urls = data?.pages?.flatMap((e) => e.urls) ?? [];
  return (
    <div className="space-y-5">
      <div className="space-y-10">
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
        <SearchComponent />
      </div>

      {isError && (
        <div className="flex flex-col items-center justify-center">
          <MessageSquareWarning size={60} />
          <h1 className="text-2xl max-w-1/3 text-center font-[Nunito]">
            Ocorreu um erro ao carregar os seus links, tente novamente mais
            tarde.
          </h1>
          <p className="text-center">Será que você já adicionou algum link?</p>
        </div>
      )}
      {!isLoading && urls && urls.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <MessageSquareWarning size={60} />
          <h1 className="text-2xl max-w-1/3 text-center font-[Nunito]">
            Nenhum link encontrado.
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
            <TableCaption>
              {hasNextPage && !isFetchingNextPage && (
                <Button
                  variant="ghost"
                  className="w-fit text-primary underline"
                  onClick={() => {
                    if (hasNextPage) {
                      fetchNextPage();
                    }
                  }}
                >
                  Carregar mais...
                </Button>
              )}
              {isFetchingNextPage && (
                <div className="flex justify-center items-center gap-2 text-lg">
                  <Loader2 className="animate-spin" size={25} />
                  Carregando...
                </div>
              )}
              <p> Mostrando {urls.length} links</p>
            </TableCaption>
            <TableFooter></TableFooter>
            <TableHeader>
              <TableRow>
                <TableHead>Link curto</TableHead>
                <TableHead>URL de destino</TableHead>
                <TableHead>Acessos</TableHead>
                <TableHead>Exipiração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urls.map((a, _id) => (
                <TableRow key={_id}>
                  <TableCell className="font-medium text-primary">
                    <Link
                      target="_blank"
                      href={"https://shrinkit.rihosting.com.br/link/" + a.code}
                    >
                      https://shrinkit.rihosting.com.br/link/{a.code}
                    </Link>
                  </TableCell>
                  <TableCell>{a.url}</TableCell>
                  <TableCell>{a.accesses}</TableCell>
                  <TableCell>
                    {a.expireAt
                      ? a.expireAt.toLocaleDateString()
                      : "Indefinido"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0"
                        >
                          <EllipsisIcon size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Link</DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => openModal(a.id)}
                          >
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      <RemoveModal />
    </div>
  );
}
