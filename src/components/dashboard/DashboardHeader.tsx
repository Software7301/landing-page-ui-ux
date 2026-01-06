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
import { t } from "@/i18n";

export function DashboardHeader() {
  const { language } = useLanguage();
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 h-16 border-b border-[#1C2A3F] bg-[#0B1E36]/95 backdrop-blur-xl"
    >
      <div className="flex h-full items-center justify-end px-8 gap-3">
        {/* Workspace Selector */}
        {activeWorkspace && workspaces.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/30 transition-colors border border-[#1C2A3F]">
              <span>{activeWorkspace.name}</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#142B4F] border-[#1C2A3F] w-56" align="end">
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => setActiveWorkspace(workspace)}
                  className={`
                    text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer
                    ${activeWorkspace.id === workspace.id ? "bg-[#0E1625]/50" : ""}
                  `}
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
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2EE6D6] to-[#1CB8A8] flex items-center justify-center">
                <User className="w-4 h-4 text-[#060B14]" />
              </div>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#142B4F] border-[#1C2A3F] w-56" align="end">
              <div className="px-3 py-2 border-b border-[#1C2A3F]">
                <p className="text-sm font-medium text-[#E6EDF3]">John Doe</p>
                <p className="text-xs text-[#9FB0C7]">john@example.com</p>
              </div>
              <DropdownMenuItem className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer">
                {t("dashboard.header.profile", language)}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer">
                {t("dashboard.header.settings", language)}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer">
                {t("dashboard.header.logout", language)}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </motion.header>
  );
}

