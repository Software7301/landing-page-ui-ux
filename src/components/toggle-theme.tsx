import { useTheme } from "@/hooks/useTheme";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-white/5 border border-white/10">
        <Palette className="w-4 h-4" />
        {themes.find(t => t.name === theme.name)?.emoji}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-black border-white/10">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className="cursor-pointer"
          >
            {t.emoji} {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
