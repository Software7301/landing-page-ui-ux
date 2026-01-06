export interface ThemeDefinition {
  name: string;      // key interna
  label: string;     // aparece no dropdown
  emoji?: string;
  className: string; // classe CSS aplicada no <html>
}

export const THEMES: ThemeDefinition[] = [
  {
    name: "purple",
    label: "Purple",
    emoji: "🟪",
    className: "theme-purple",
  },
  {
    name: "green",
    label: "Green",
    emoji: "🟩",
    className: "theme-green",
  },
  {
    name: "blue",
    label: "Blue",
    emoji: "🟦",
    className: "theme-blue",
  },
];
