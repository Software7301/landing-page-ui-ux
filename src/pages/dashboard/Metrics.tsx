import { motion } from "framer-motion";
import { Server, Container, Globe, Cpu, HardDrive, Activity } from "lucide-react";
import { useWorkspace } from "@/providers/workspace-provider";
import { useServer } from "@/providers/server-provider";
import { useContainer } from "@/providers/container-provider";
import { useDomain } from "@/providers/domain-provider";
import { cn } from "@/lib/utils";

export default function Metrics() {
  const { activeWorkspace } = useWorkspace();
  const { getServersByWorkspace } = useServer();
  const { getContainersByWorkspace } = useContainer();
  const { getDomainsByWorkspace } = useDomain();

  if (!activeWorkspace) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#E6EDF3]">
          Selecione um workspace para ver métricas
        </h2>
      </motion.div>
    );
  }

  const workspaceServers = getServersByWorkspace(activeWorkspace.id);
  const workspaceContainers = getContainersByWorkspace(activeWorkspace.id);
  const workspaceDomains = getDomainsByWorkspace(activeWorkspace.id);

  const onlineServers = workspaceServers.filter(s => s.status === "online");
  const runningContainers = workspaceContainers.filter(c => c.status === "running");
  const activeDomains = workspaceDomains.filter(d => d.sslStatus === "active");

  const avgCpu = onlineServers.length > 0
    ? (onlineServers.reduce((sum, s) => sum + s.cpuUsage, 0) / onlineServers.length)
    : 0;
  const avgRam = onlineServers.length > 0
    ? (onlineServers.reduce((sum, s) => sum + s.ramUsage, 0) / onlineServers.length)
    : 0;

  const metrics = [
    {
      label: "Servidores Online",
      value: `${onlineServers.length} / ${workspaceServers.length}`,
      percentage: workspaceServers.length > 0 ? (onlineServers.length / workspaceServers.length) * 100 : 0,
      icon: Server,
      color: "from-[#2EE6D6] to-[#1CB8A8]",
    },
    {
      label: "Containers Running",
      value: `${runningContainers.length} / ${workspaceContainers.length}`,
      percentage: workspaceContainers.length > 0 ? (runningContainers.length / workspaceContainers.length) * 100 : 0,
      icon: Container,
      color: "from-[#3EF3A4] to-[#2EE6D6]",
    },
    {
      label: "Domínios Ativos",
      value: `${activeDomains.length} / ${workspaceDomains.length}`,
      percentage: workspaceDomains.length > 0 ? (activeDomains.length / workspaceDomains.length) * 100 : 0,
      icon: Globe,
      color: "from-[#8B5CF6] to-[#6D28D9]",
    },
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
          Métricas
        </h1>
        <p className="text-[#9FB0C7]">
          Visualize métricas e estatísticas do seu workspace
        </p>
      </motion.div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-5 h-5 text-[#2EE6D6]" />
            <h3 className="text-lg font-semibold text-[#E6EDF3]">CPU Usage</h3>
          </div>
          <div className="text-3xl font-bold text-[#E6EDF3] mb-2">{avgCpu.toFixed(1)}%</div>
          <div className="w-full bg-[#1C2A3F] rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${avgCpu}%` }}
              transition={{ duration: 0.5 }}
              className={cn(
                "h-2 rounded-full bg-gradient-to-r",
                avgCpu > 80 ? "from-[#F26D6D] to-[#F5A623]" : "from-[#2EE6D6] to-[#1CB8A8]"
              )}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <HardDrive className="w-5 h-5 text-[#2EE6D6]" />
            <h3 className="text-lg font-semibold text-[#E6EDF3]">RAM Usage</h3>
          </div>
          <div className="text-3xl font-bold text-[#E6EDF3] mb-2">{avgRam.toFixed(1)}%</div>
          <div className="w-full bg-[#1C2A3F] rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${avgRam}%` }}
              transition={{ duration: 0.5 }}
              className={cn(
                "h-2 rounded-full bg-gradient-to-r",
                avgRam > 80 ? "from-[#F26D6D] to-[#F5A623]" : "from-[#2EE6D6] to-[#1CB8A8]"
              )}
            />
          </div>
        </motion.div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br", metric.color, "opacity-20 flex items-center justify-center border border-[#2EE6D6]/20")}>
                <metric.icon className="w-5 h-5 text-[#2EE6D6]" />
              </div>
              <h3 className="text-sm font-medium text-[#9FB0C7]">{metric.label}</h3>
            </div>
            <div className="text-2xl font-bold text-[#E6EDF3] mb-2">{metric.value}</div>
            <div className="w-full bg-[#1C2A3F] rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.percentage}%` }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={cn("h-2 rounded-full bg-gradient-to-r", metric.color)}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-5 h-5 text-[#2EE6D6]" />
          <h3 className="text-lg font-semibold text-[#E6EDF3]">Resource Usage Over Time</h3>
        </div>
        <div className="relative h-64 flex items-end justify-between gap-1.5">
          {Array.from({ length: 24 }).map((_, i) => {
            const height = Math.random() * 60 + 20;
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{
                  delay: 0.8 + i * 0.02,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-1 bg-gradient-to-t from-[#2EE6D6] via-[#1CB8A8] to-[#2EE6D6] rounded-t hover:opacity-90 hover:shadow-[0_0_10px_rgba(46,230,214,0.5)] transition-all duration-300 cursor-pointer"
              />
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

