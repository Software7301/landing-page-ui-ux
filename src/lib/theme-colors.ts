import { useTheme } from "@/hooks/useTheme";

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryForeground: string;
  accent: string;
  sidebarBg: string;
  sidebarBorder: string;
  sidebarActive: string;
  sidebarText: string;
  sidebarTextMuted: string;
  cardBg: string;
  cardBorder: string;
  inputBg: string;
  inputBorder: string;
  textPrimary: string;
  textSecondary: string;
}

export function useThemeColors(): ThemeColors {
  const { theme } = useTheme();

  const themes: Record<string, ThemeColors> = {
    purple: {
      primary: "#6D28D9",
      primaryHover: "#8B5CF6",
      primaryForeground: "#E5E7EB",
      accent: "#8B5CF6",
      sidebarBg: "#0B1E36",
      sidebarBorder: "rgba(109, 40, 217, 0.15)",
      sidebarActive: "rgba(109, 40, 217, 0.3)",
      sidebarText: "#E6EDF3",
      sidebarTextMuted: "#9FB0C7",
      cardBg: "#141C2C",
      cardBorder: "rgba(109, 40, 217, 0.15)",
      inputBg: "#0B0F17",
      inputBorder: "rgba(109, 40, 217, 0.15)",
      textPrimary: "#E5E7EB",
      textSecondary: "#9CA3AF",
    },
    green: {
      primary: "#4ADE80",
      primaryHover: "#22C55E",
      primaryForeground: "#E5E7EB",
      accent: "#22C55E",
      sidebarBg: "#0B1E36",
      sidebarBorder: "rgba(74, 222, 128, 0.15)",
      sidebarActive: "rgba(74, 222, 128, 0.3)",
      sidebarText: "#E6EDF3",
      sidebarTextMuted: "#9FB0C7",
      cardBg: "#141C2C",
      cardBorder: "rgba(74, 222, 128, 0.15)",
      inputBg: "#0B0F17",
      inputBorder: "rgba(74, 222, 128, 0.15)",
      textPrimary: "#E5E7EB",
      textSecondary: "#9CA3AF",
    },
    blue: {
      primary: "#2EE6D6",
      primaryHover: "#1CB8A8",
      primaryForeground: "#060B14",
      accent: "#1CB8A8",
      sidebarBg: "#0B1E36",
      sidebarBorder: "rgba(46, 230, 214, 0.15)",
      sidebarActive: "rgba(46, 230, 214, 0.3)",
      sidebarText: "#E6EDF3",
      sidebarTextMuted: "#9FB0C7",
      cardBg: "#0B1E36",
      cardBorder: "rgba(46, 230, 214, 0.15)",
      inputBg: "#142B4F",
      inputBorder: "rgba(46, 230, 214, 0.15)",
      textPrimary: "#E6EDF3",
      textSecondary: "#9FB0C7",
    },
  };

  return themes[theme.name] || themes.purple;
}

