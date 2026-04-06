import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { debounce, useQueryState } from "nuqs";
import { Label } from "../../ui/label";

export default function SearchComponent() {
  const [search, setSearch] = useQueryState("s", {
    defaultValue: "",
  });
  return (
    <div className="space-x-4">
      <div className="relative flex items-center md:w-1/3">
        <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
        <Input
          className="bg-secondary pl-9"
          id="search-input"
          placeholder="Buscar links..."
          type="search"
          defaultValue={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(e.currentTarget.value);
            }
          }}
        />
      </div>
    </div>
  );
}
