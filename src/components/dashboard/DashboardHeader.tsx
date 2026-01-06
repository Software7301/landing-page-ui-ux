import { motion } from "framer-motion";
import { User, ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/useLanguage";
import { useWorkspace } from "@/providers/workspace-provider";
import { useThemeColors } from "@/lib/theme-colors";
import { t } from "@/i18n";

export function DashboardHeader() {
  const { language } = useLanguage();
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();
  const colors = useThemeColors();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 h-16 border-b backdrop-blur-xl transition-colors duration-300"
      style={{
        backgroundColor: `${colors.sidebarBg}F5`,
        borderColor: colors.sidebarBorder,
      }}
    >
      <div className="flex h-full items-center justify-end px-8 gap-3">
        {/* Workspace Selector */}
        {activeWorkspace && workspaces.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
              style={{
                color: colors.sidebarTextMuted,
                borderColor: colors.sidebarBorder,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.sidebarText;
                e.currentTarget.style.backgroundColor = `${colors.primary}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.sidebarTextMuted;
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span>{activeWorkspace.name}</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 transition-colors duration-300" 
              align="end"
              style={{
                backgroundColor: `${colors.primary}20`,
                borderColor: colors.sidebarBorder,
              }}
            >
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => setActiveWorkspace(workspace)}
                  className="cursor-pointer transition-colors duration-200"
                  style={{
                    color: colors.sidebarText,
                    backgroundColor: activeWorkspace.id === workspace.id ? `${colors.primary}30` : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.primary}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = activeWorkspace.id === workspace.id ? `${colors.primary}30` : "transparent";
                  }}
                >
                  {workspace.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <LanguageSwitcher />
        
        {/* User Menu */}
        <DropdownMenu>
            <DropdownMenuTrigger 
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: colors.sidebarTextMuted,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.sidebarText;
                e.currentTarget.style.backgroundColor = `${colors.primary}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.sidebarTextMuted;
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                }}
              >
                <User className="w-4 h-4" style={{ color: colors.primaryForeground }} />
              </div>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 transition-colors duration-300" 
              align="end"
              style={{
                backgroundColor: `${colors.primary}20`,
                borderColor: colors.sidebarBorder,
              }}
            >
              <div 
                className="px-3 py-2 border-b transition-colors duration-300"
                style={{
                  borderColor: colors.sidebarBorder,
                }}
              >
                <p className="text-sm font-medium transition-colors duration-300" style={{ color: colors.sidebarText }}>
                  John Doe
                </p>
                <p className="text-xs transition-colors duration-300" style={{ color: colors.sidebarTextMuted }}>
                  john@example.com
                </p>
              </div>
              <DropdownMenuItem 
                className="cursor-pointer transition-colors duration-200"
                style={{ color: colors.sidebarText }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.primary}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {t("dashboard.header.profile", language)}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer transition-colors duration-200"
                style={{ color: colors.sidebarText }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.primary}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {t("dashboard.header.settings", language)}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer transition-colors duration-200"
                style={{ color: colors.sidebarText }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.primary}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {t("dashboard.header.logout", language)}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </motion.header>
  );
}

