import { motion } from "framer-motion";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { WorkspaceCard } from "@/components/dashboard/WorkspaceCard";
import { FolderKanban, Bot } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Dashboard() {
  const { language } = useLanguage();

  // Mock data
  const stats = [
    {
      title: t("dashboard.stats.totalWorkspaces", language),
      value: "24",
      change: "+12.5%",
      changeType: "positive" as const,
      description: t("dashboard.stats.totalWorkspacesDesc", language),
      icon: FolderKanban,
    },
    {
      title: t("dashboard.stats.activeAgents", language),
      value: "20/32",
      change: "+8.2%",
      changeType: "positive" as const,
      description: t("dashboard.stats.activeAgentsDesc", language),
      icon: Bot,
    },
  ];

  const workspaces = [
    { id: "1", name: "CorsiEnterprise", status: "active" as const, serversCount: 12 },
    { id: "2", name: "Personal Workspace", status: "active" as const, serversCount: 8 },
    { id: "3", name: "Development", status: "inactive" as const, serversCount: 4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-[#E6EDF3] mb-2">
          {t("dashboard.title", language)}
        </h1>
        <p className="text-[#9FB0C7]">
          {t("dashboard.subtitle", language)}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </motion.div>

      {/* Workspaces Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#E6EDF3] mb-1">
              {t("dashboard.workspaces.title", language)}
            </h2>
            <p className="text-sm text-[#9FB0C7]">
              {t("dashboard.workspaces.subtitle", language)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace, index) => (
            <WorkspaceCard
              key={workspace.id}
              {...workspace}
              delay={0.6 + index * 0.1}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
