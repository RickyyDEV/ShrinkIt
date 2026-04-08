"use client";
import {
  ActivitySquare,
  Archive,
  ArrowRight,
  Link2,
  Loader2,
  MouseIcon,
} from "lucide-react";
import { useSession } from "../(auth)/user-context";
import Link from "vinext/shims/link";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "../rpc/orpc";
import { CopyButton } from "../components/dashboard/copy-button";
import { Skeleton } from "../components/ui/skeleton";
export default function Page() {
  const { user } = useSession();
  const { data, isLoading } = useQuery(orpc.url.initial.queryOptions());
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold font-[Manrope] text-white tracking-tight">
          Olá, <span className="text-primary">{user.name}</span> 👋
        </h1>
        <p className="text-gray-400 mt-2 mb-8 text-lg">
          Relatório dos seus links criados.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-secondary/50 rounded-4xl p-10 space-y-4 shadow-2xl">
            <div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                <MouseIcon />
              </div>
            </div>
            <div>
              <h3 className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">
                Total de Cliques
              </h3>
              {isLoading ? (
                <Skeleton className="h-10 w-1/3" />
              ) : (
                <p className="text-4xl truncate font-black headline-font">
                  {data?.accesses}
                </p>
              )}
            </div>
          </div>
          <div className="bg-secondary/50 rounded-4xl p-10 space-y-4 shadow-2xl">
            <div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                <ActivitySquare />
              </div>
            </div>
            <div>
              <h3 className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">
                Links ativos
              </h3>

              {isLoading ? (
                <Skeleton className="h-10 w-1/5" />
              ) : (
                <p className="text-4xl font-black headline-font">
                  {data?.count}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary/50 rounded-lg p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-extrabold text-white items-center ">
            Links recentes
          </h1>
          <Link
            className="text-xs text-primary font-light hover:underline"
            href={"/dashboard/links"}
          >
            Ver todos
            <ArrowRight size={20} strokeWidth={1} className="inline" />
          </Link>
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" size={50} />
          </div>
        )}
        {!isLoading && (data?.urls.length === 0 || !data?.urls) && (
          <div className="text-center space-y-2">
            <Archive className="mx-auto" size={70} />
            <h1 className="text-xl font-bold">
              Nenhum link foi criado ainda...
            </h1>
          </div>
        )}
        {!isLoading && data?.urls != undefined && data.urls.length > 0 && (
          <div className="space-y-3">
            {data.urls.map((e) => (
              <div className="flex items-center gap-3 min-w-0" key={e.id}>
                <div className="rounded-lg bg-primary p-2 shrink-0">
                  <Link2 className="text-white size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <Link
                      target="_blank"
                      href={"https://shrinkit.rihosting.com.br/link/" + e.code}
                      prefetch={false}
                      className="text-sm text-white truncate min-w-0 flex-1 hover:underline"
                    >
                      {"shrinkit.rihosting.com.br/link/" + e.code}
                    </Link>
                    <CopyButton
                      className="shrink-0"
                      text={"https://shrinkit.rihosting.com.br/link/" + e.code}
                    />
                  </div>
                  <span className="text-xs text-gray-400 truncate block">
                    {e.url}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
}
