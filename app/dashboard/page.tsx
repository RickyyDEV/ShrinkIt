"use client";
import {
  ActivitySquare,
  Archive,
  ArrowRight,
  CornerLeftUpIcon,
  Link2,
  Loader2,
  MouseIcon,
} from "lucide-react";
import { useSession } from "../(auth)/user-context";
import Link from "vinext/shims/link";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "../rpc/orpc";
import { Label } from "../components/ui/label";
import { CopyButton } from "../components/dashboard/copy-button";
export default function Page() {
  const { user, session } = useSession();
  const { data, isLoading } = useQuery(
    orpc.url.getById.queryOptions({
      input: {
        limit: 3,
      },
    }),
  );
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold font-[Manrope] text-white tracking-tight">
          Olá, <span className="text-primary">{user.name}</span> 👋
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Relatório dos seus links criados.
        </p>
        <br />
        <br />
        <div className="grid md:grid-cols-3 grid-rows-3 md:grid-rows-none gap-5">
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
              <p className="text-4xl truncate font-black headline-font">
                1.284.902
              </p>
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
              <p className="text-4xl font-black headline-font">10</p>
            </div>
          </div>
          <div className="bg-secondary/50 rounded-4xl p-10 space-y-4 shadow-2xl">
            <div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                <CornerLeftUpIcon />
              </div>
            </div>
            <div>
              <h3 className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">
                URLs criadas
              </h3>
              <p className="text-4xl font-black headline-font">10</p>
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
          <div className="space-y-5">
            {data.urls.map((e) => (
              <div className="flex items-center space-x-2" key={e.id}>
                <div className="rounded-lg bg-primary p-2">
                  <Link2 className="text-white" />
                </div>
                <div>
                  <div className="flex space-x-2">
                    <Link
                      href={"https://shrinkit.rihosting.com.br/link/" + e.code}
                      className="text-md text-white"
                    >
                      {"https://shrinkit.rihosting.com.br/link/" + e.code}
                    </Link>
                    <CopyButton
                      text={"https://shrinkit.rihosting.com.br/link/" + e.code}
                    />
                  </div>
                  <span className="text-xs">{e.url}</span>
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
