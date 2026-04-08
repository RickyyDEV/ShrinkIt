import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import { Key, Lock } from "lucide-react";
import PasswordForm from "./form";
import { prisma } from "@/app/(database)/database";
import { notFound } from "vinext/shims/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const urlCheck = await prisma.url.findUnique({
    where: {
      code,
    },
  });
  if (!urlCheck) return notFound();
  return (
    <div>
      <div className="flex flex-row min-h-screen justify-center items-center ">
        <div className="bg-secondary w-2/3 md:w-1/4 rounded-lg shadow-2xl space-y-4">
          <div className="p-10 pb-0 md:pb-4 space-y-3">
            <div className="rounded-full p-5 bg-primary/10 w-fit mx-auto">
              <Lock className="text-primary" />
            </div>
            <h1 className="text-2xl text-white font-bold text-center">
              Link protegido
            </h1>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Este link está protegido por senha.
              </p>
              <p className="text-sm text-gray-500">
                Insira a senha para continuar.
              </p>
            </div>
          </div>

          <Separator />
          <div className="p-10 pt-0">
            <PasswordForm code={code} />
          </div>
        </div>
      </div>
    </div>
  );
}
