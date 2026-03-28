import Logo from "./logo";
export default function NavBar() {
  return (
    <>
      <header className="sticky mx-auto top-5 h-fit z-50 bg-secondary md:w-2/3 rounded-full">
        <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <Logo />
          <div className="flex items-center gap-4">
            <a
              href="/auth"
              className="text-white font-bold px-6 py-2 rounded-xl scale-95 hover:scale-100 transition-all duration-200 text-xs uppercase tracking-widest"
            >
              Login
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
