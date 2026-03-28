"use client";

import { ClipboardCheck } from "lucide-react";
import { useSession } from "../(auth)/user-context";

export default function Page() {
  const { user, session } = useSession();
  return (
    <div>
      <h1 className="text-4xl font-extrabold font-[Manrope] text-white tracking-tight">
        Olá, <span className="text-primary">{user.name}</span> 👋
      </h1>
      <p className="text-gray-400 mt-2 text-lg">
        Relatório dos seus links criados.
      </p>
      <br />
      <br />
      <div className="flex space-x-10">
        <div className="bg-secondary/50 rounded-4xl p-10 space-y-4 shadow-2xl w-1/6">
          <div>
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
              <ClipboardCheck />
            </div>
          </div>
          <div>
            <h3 className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">
              Total de Cliques
            </h3>
            <p className="text-4xl font-black headline-font">1.284.902</p>
          </div>
        </div>
        <div className="bg-secondary/50 rounded-4xl p-10 space-y-4 shadow-2xl w-1/6">
          <div>
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
              <ClipboardCheck />
            </div>
          </div>
          <div>
            <h3 className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">
              Links ativos
            </h3>
            <p className="text-4xl font-black headline-font">10</p>
          </div>
        </div>
      </div>
    </div>
  );
}
