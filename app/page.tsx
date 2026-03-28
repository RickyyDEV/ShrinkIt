import { Link } from "lucide-react";
import NavBar from "./components/navbar";
import { Input } from "./components/ui/input";
import Footer from "./components/footer";
export default async function Page() {
  return (
    <main>
      <NavBar />
      <section className="max-w-7xl mx-auto px-8 py-24 relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 block">
            Simplicidade e rapidez
          </span>
          <h1 className="font-[Nunito] max-w-full text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-8 mx-auto leading-[1.1]">
            Encurte seus links de forma{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#ffb8ff]">
              Simples e rápida.
            </span>
          </h1>
          <p className="text[#aaaab8] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Crie links curtos, gerencie sua marca e acompanhe o desempenho dos
            seus acessos em uma ferramenta gratuita e fácil de usar.
          </p>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg[rgba(29, 31, 45, 0.7)] backdrop-blur-[20px] p-2 rounded-2xl flex flex-col md:flex-row gap-2 indigo-glow border border-outline-variant/10">
            <div className="grow flex items-center px-6 bg-surface-container-highest rounded-xl">
              <Link className="mr-6" />
              <Input
                className="w-full rounded-full md:text-lg placeholder:font-light focus-visible:ring-0 focus-visible:border-none bg-transparent border-none py-5 placeholder:text-gray-600"
                placeholder="Cole sua URL aqui..."
                type="text"
              />
            </div>
            <button className="bg-primary text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg shadow-primary/20">
              Encurtar URL
            </button>
          </div>
          <div className="flex gap-4 mt-4 ml-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
              Fácil de gerenciar
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
              Links 100% seguros
            </span>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
