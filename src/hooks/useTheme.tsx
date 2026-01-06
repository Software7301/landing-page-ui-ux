import { createContext, useContext, useEffect, useState } from "react";
import { THEMES, type ThemeDefinition } from "@/theme/themes";

interface ThemeContextType {
  theme: ThemeDefinition;
  setTheme: (name: string) => void;
  themes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const stored = localStorage.getItem("theme") || THEMES[0].name;

  const initial = THEMES.find(t => t.name === stored) ?? THEMES[0];

  const [theme, setThemeState] = useState<ThemeDefinition>(initial);

  function setTheme(name: string) {
    const found = THEMES.find(t => t.name === name);
    if (!found) return;
    setThemeState(found);
    localStorage.setItem("theme", found.name);
  }

  useEffect(() => {
    THEMES.forEach(t => document.documentElement.classList.remove(t.className));
    document.documentElement.classList.add(theme.className);
  }, [theme]);

  useEffect(() => {
    THEMES.forEach(t => document.documentElement.classList.remove(t.className));
    document.documentElement.classList.add(initial.className);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
