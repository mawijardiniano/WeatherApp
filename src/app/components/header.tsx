import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function Header({ toggleDarkMode, darkMode }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-left">Weather Dashboard</p>
      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search city"
          className="border rounded w-40 h-10 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-sm"
        />

        <Button onClick={toggleDarkMode} className="">
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
      </div>
    </div>
  );
}
