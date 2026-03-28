import { Link } from "lucide-react";

export default function Logo() {
  return (
    <>
      <div className="text-2xl font-black text-white tracking-tighter flex space-x-1 select-none">
        <Link className="text-primary" />
        <span>ShrinkIt</span>
      </div>
    </>
  );
}
