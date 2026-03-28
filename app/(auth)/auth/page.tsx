"use client";
import { ArrowLeft } from "lucide-react";
import Logo from "../../components/logo";
import { GoogleLogin } from "../actions";
import { redirect, useRouter } from "vinext/shims/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <main>
      <div className="p-8">
        <a
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300 font-label text-sm tracking-tight group hover:underline"
          href="/"
        >
          <ArrowLeft size={15} />
          <span>Voltar para a Página Inicial</span>
        </a>
      </div>

      <div className="grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-10 space-y-5">
            <Logo />
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface text-center mb-2">
              Acesse sua conta
            </h1>
            <p className="font-label text-on-surface-variant text-sm tracking-wide text-center">
              Acesse sua conta do Gmail
            </p>
          </div>
          <div className="glass-effect rounded-xl p-8 shadow-2xl ring-1 ring-white/5">
            <button
              onClick={async () => {
                const { url } = await GoogleLogin();
                if (!url) return;
                router.replace(url);
              }}
              className="w-full flex items-center justify-center gap-3 bg-surface-container-high text-on-surface font-label font-medium py-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container-highest transition-colors active:scale-[0.98]"
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              <span>Entrar com Google</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
