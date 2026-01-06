import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Server, 
  Bot, 
  Container, 
  Globe, 
  CreditCard, 
  Settings,
  Network,
  BarChart3,
  Truck
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useWorkspace } from "@/providers/workspace-provider";
import { useThemeColors } from "@/lib/theme-colors";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  i18nKey: string;
  requiresWorkspace?: boolean;
}

const allNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard", i18nKey: "sidebar.dashboard" },
  { icon: FolderKanban, label: "Workspaces", path: "/dashboard/workspaces", i18nKey: "sidebar.workspaces", requiresWorkspace: true },
  { icon: Server, label: "Servers", path: "/dashboard/servers", i18nKey: "sidebar.servers", requiresWorkspace: true },
  { icon: Bot, label: "Agents", path: "/dashboard/agents", i18nKey: "sidebar.agents", requiresWorkspace: true },
  { icon: Container, label: "Containers", path: "/dashboard/containers", i18nKey: "sidebar.containers", requiresWorkspace: true },
  { icon: Globe, label: "Domains", path: "/dashboard/domains", i18nKey: "sidebar.domains", requiresWorkspace: true },
  { icon: BarChart3, label: "Métricas", path: "/dashboard/metrics", i18nKey: "sidebar.metrics", requiresWorkspace: true },
  { icon: CreditCard, label: "Billing", path: "/dashboard/billing", i18nKey: "sidebar.billing", requiresWorkspace: true },
  { icon: Settings, label: "Settings", path: "/dashboard/settings", i18nKey: "sidebar.settings" },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};


export function DashboardSidebar() {
  const location = useLocation();
  const { language } = useLanguage();
  const { hasWorkspaces } = useWorkspace();
  const colors = useThemeColors();

  const navItems = allNavItems.filter(
    (item) => !item.requiresWorkspace || hasWorkspaces
  );

  return (
    <>
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 h-screen w-64 border-r z-40 transition-colors duration-300"
        style={{
          backgroundColor: colors.sidebarBg,
          borderColor: colors.sidebarBorder,
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="p-6 border-b transition-colors duration-300"
            style={{ borderColor: colors.sidebarBorder }}
          >
            <Link to="/" className="flex items-center gap-2.5 group">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                  boxShadow: `0 0 20px ${colors.primary}40`,
                }}
              >
                <Network className="w-4 h-4" style={{ color: colors.primaryForeground }} />
              </div>
              <span className="text-lg font-semibold transition-colors duration-300" style={{ color: colors.sidebarText }}>
                CorsiHub
              </span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

                return (
                  <motion.div
                    key={item.path}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={itemVariants}
                    layout
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                        isActive ? "border" : ""
                      )}
                      style={{
                        backgroundColor: isActive ? `${colors.primary}15` : "transparent",
                        color: isActive ? colors.sidebarText : colors.sidebarTextMuted,
                        borderColor: isActive ? colors.sidebarActive : "transparent",
                        boxShadow: isActive ? `0 0 15px ${colors.primary}20` : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = `${colors.primary}10`;
                          e.currentTarget.style.color = colors.sidebarText;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = colors.sidebarTextMuted;
                        }
                      }}
                    >
                      <Icon
                        className="w-5 h-5 transition-colors duration-200"
                        style={{
                          color: isActive ? colors.primary : colors.sidebarTextMuted,
                        }}
                      />
                      <span>{t(item.i18nKey, language)}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </nav>

          {/* User Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="p-4 border-t transition-colors duration-300"
            style={{ borderColor: colors.sidebarBorder }}
          >
            <div 
              className="flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer group"
              style={{
                backgroundColor: `${colors.primary}10`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.primary}10`;
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0"
                style={{
                  backgroundColor: colors.sidebarBg,
                  borderColor: `${colors.primary}50`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${colors.primary}50`;
                }}
              >
                <Truck className="w-6 h-6 transition-colors duration-200" style={{ color: colors.primary }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate transition-colors duration-200" style={{ color: colors.sidebarText }}>
                  Max Takahashi
                </p>
                <p className="text-xs truncate transition-colors duration-200" style={{ color: colors.primary }}>
                  Outro
                </p>
                <p className="text-xs truncate transition-colors duration-200" style={{ color: colors.sidebarTextMuted }}>
                  autopiernovacapitalrp@gmail.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
