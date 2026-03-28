import { Link } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c0d18] border-t border-[#464753]/15">
      <div className="w-full px-8 py-12 flex justify-center">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2 text-center">
            <div className="text-2xl font-black text-white tracking-tighter flex space-x-1">
              <Link className="text-primary" />
              <span>ShrinkIt</span>
            </div>
          </div>
          <p className="text-xs text-[#aaaab8] text-center md:text-left">
            © 2026 Ricardo Marinho.
            <br /> Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
