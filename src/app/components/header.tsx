import { Button } from "@/components/ui/button";
interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
  searchInput: string;
  setSearchInput: (val: string) => void;
  onSearch: () => void;
}

export default function Header({
  toggleDarkMode,
  darkMode,
  searchInput,
  setSearchInput,
  onSearch
}: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-left">Weather Dashboard</p>
      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          className="border rounded w-40 h-10 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-sm"
        />

        <Button onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
      </div>
    </div>
  );
}
