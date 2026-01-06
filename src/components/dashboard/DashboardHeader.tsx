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
import { useUser } from "@/providers/user-provider";
import { useNavigate } from "react-router-dom";
import { t } from "@/i18n";

export function DashboardHeader() {
  const { language } = useLanguage();
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 h-16 border-b backdrop-blur-xl transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-sidebar)F5",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex h-full items-center justify-end px-8 gap-3">
        {/* Workspace Selector */}
        {activeWorkspace && workspaces.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
              style={{
                color: "var(--color-text-secondary)",
                borderColor: "var(--color-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text)";
                e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-secondary)";
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
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
              }}
            >
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => setActiveWorkspace(workspace)}
                  className="cursor-pointer transition-colors duration-200"
                  style={{
                    color: "var(--color-text)",
                    backgroundColor: activeWorkspace.id === workspace.id ? "var(--color-sidebar-active)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = activeWorkspace.id === workspace.id ? "var(--color-sidebar-active)" : "transparent";
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
                color: "var(--color-text-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text)";
                e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
                }}
              >
                <User className="w-4 h-4" style={{ color: "var(--color-primary-foreground)" }} />
              </div>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 transition-colors duration-300" 
              align="end"
              style={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
              }}
            >
              <div 
                className="px-3 py-2 border-b transition-colors duration-300"
                style={{
                  borderColor: "var(--color-border)",
                }}
              >
                <p className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                  {user ? `${user.firstName} ${user.lastName}` : "User"}
                </p>
                <p className="text-xs transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                  {user?.email || "user@example.com"}
                </p>
              </div>
              <DropdownMenuItem 
                className="cursor-pointer transition-colors duration-200"
                style={{ color: "var(--color-text)" }}
                onClick={() => navigate("/dashboard/settings")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {t("dashboard.header.settings", language)}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer transition-colors duration-200"
                style={{ color: "var(--color-text)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
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

