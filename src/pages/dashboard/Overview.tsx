import { useState } from "react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { WorkspaceCard } from "@/components/dashboard/WorkspaceCard";
import { CreateWorkspaceModal } from "@/components/dashboard/CreateWorkspaceModal";
import { FolderKanban, Bot, Activity, HardDrive, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useWorkspace } from "@/providers/workspace-provider";
import { useServer } from "@/providers/server-provider";
import { useContainer } from "@/providers/container-provider";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";

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

export default function Overview() {
  const { language } = useLanguage();
  const { workspaces, activeWorkspace } = useWorkspace();
  const { servers, getServersByWorkspace } = useServer();
  const { containers } = useContainer();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalWorkspaces = workspaces.length;
  const activeServers = servers.filter(s => s.status === "online").length;
  const totalServers = servers.length;
  
  const onlineServers = servers.filter(s => s.status === "online");
  const avgCpu = onlineServers.length > 0
    ? (onlineServers.reduce((sum, s) => sum + s.cpuUsage, 0) / onlineServers.length).toFixed(1)
    : "0";
  const avgRam = onlineServers.length > 0
    ? (onlineServers.reduce((sum, s) => sum + s.ramUsage, 0) / onlineServers.length).toFixed(1)
    : "0";

  const stats = [
    {
      title: t("dashboard.stats.totalWorkspaces", language),
      value: totalWorkspaces.toString(),
      change: totalWorkspaces > 0 ? `+${totalWorkspaces}` : "0",
      changeType: "positive" as const,
      description: t("dashboard.stats.totalWorkspacesDesc", language),
      icon: FolderKanban,
    },
    {
      title: t("dashboard.stats.activeAgents", language),
      value: activeServers.toString(),
      change: totalServers > 0 ? `${((activeServers / totalServers) * 100).toFixed(1)}%` : "0%",
      changeType: "positive" as const,
      description: t("dashboard.stats.activeAgentsDesc", language),
      icon: Bot,
    },
    {
      title: t("dashboard.stats.cpuUsage", language),
      value: `${avgCpu}%`,
      change: avgCpu !== "0" ? "Avg" : "0%",
      changeType: "positive" as const,
      description: t("dashboard.stats.cpuUsageDesc", language),
      icon: Activity,
    },
    {
      title: t("dashboard.stats.ramUsage", language),
      value: `${avgRam}%`,
      change: avgRam !== "0" ? "Avg" : "0%",
      changeType: "neutral" as const,
      description: t("dashboard.stats.ramUsageDesc", language),
      icon: HardDrive,
    },
  ];

  const hasWorkspaces = workspaces.length > 0;

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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </motion.div>

      {/* Resource Usage Chart 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="relative rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6 overflow-hidden group"
      >
        <div className="relative flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#E6EDF3] mb-1">
              {t("dashboard.chart.resourceUsage", language)}
            </h2>
            <p className="text-sm text-[#9FB0C7]">
              {t("dashboard.chart.resourceUsageDesc", language)}
            </p>
          </div>
        </div>
        {/* Mock Chart *
        <div className="relative h-64 flex items-end justify-between gap-1.5">
          {Array.from({ length: 30 }).map((_, i) => {
            const height = Math.random() * 60 + 20;
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{
                  delay: 0.6 + i * 0.02,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-1 bg-gradient-to-t from-[#2EE6D6] via-[#1CB8A8] to-[#2EE6D6] rounded-t hover:opacity-90 hover:shadow-[0_0_10px_rgba(46,230,214,0.5)] transition-all duration-300 cursor-pointer"
              />
            );
          })}
        </div> 
      </motion.div> */}

      {/* Workspaces Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#E6EDF3] mb-2">
              {t("dashboard.workspaces.title", language)}
            </h2>
            <p className="text-[#9FB0C7]">
              {t("dashboard.workspaces.subtitle", language)}
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("dashboard.workspaces.create", language)}
          </Button>
        </div>

        {/* Workspaces Grid or Empty State */}
        {hasWorkspaces ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace, index) => {
              const workspaceServers = getServersByWorkspace(workspace.id);
              return (
                <WorkspaceCard
                  key={workspace.id}
                  id={workspace.id}
                  name={workspace.name}
                  status={activeWorkspace?.id === workspace.id ? "active" : "inactive"}
                  serversCount={workspaceServers.length}
                  delay={0.2 + index * 0.1}
                />
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-12 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center mx-auto mb-4 border border-[#2EE6D6]/20">
                <Plus className="w-8 h-8 text-[#2EE6D6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#E6EDF3] mb-2">
                {t("dashboard.workspaces.emptyTitle", language)}
              </h3>
              <p className="text-[#9FB0C7] mb-6">
                {t("dashboard.workspaces.emptyDesc", language)}
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("dashboard.workspaces.create", language)}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      <CreateWorkspaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}
