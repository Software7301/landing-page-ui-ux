import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, CheckCircle, XCircle, Server } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import { AgentManagementPanel } from "@/components/dashboard/AgentManagementPanel";
import { useAgent } from "@/providers/agent-provider";
import { useWorkspace } from "@/providers/workspace-provider";

export default function Agents() {
  const { language } = useLanguage();
  const { agents, getAgentsByWorkspace } = useAgent();
  const { activeWorkspace } = useWorkspace();
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleAgentClick = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    setIsPanelOpen(true);
  };

  const handleAgentUpdate = () => {
    setSelectedAgent(agents.find(a => a.id === selectedAgent?.id) || null);
  };

  const workspaceAgents = activeWorkspace 
    ? getAgentsByWorkspace(activeWorkspace.id)
    : [];

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
          {t("dashboard.agents.title", language)}
        </h1>
        <p className="text-[#9FB0C7]">
          {t("dashboard.agents.subtitle", language)}
        </p>
      </motion.div>

      {/* Agents List */}
      {workspaceAgents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center py-12 rounded-xl border border-[#1C2A3F] bg-[#0E1625]"
        >
          <Bot className="w-16 h-16 text-[#9FB0C7] mx-auto mb-4 opacity-50" />
          <p className="text-[#9FB0C7]">Nenhum agente encontrado para este workspace</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {workspaceAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
            onClick={() => handleAgentClick(agent)}
            className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6 hover:border-[#2EE6D6]/30 hover:shadow-[0_0_20px_rgba(46,230,214,0.1)] transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                  <Bot className="w-6 h-6 text-[#2EE6D6]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#E6EDF3] group-hover:text-[#2EE6D6] transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-[#9FB0C7]">v{agent.version}</p>
                </div>
              </div>
              {agent.status === "online" ? (
                <CheckCircle className="w-5 h-5 text-[#3EF3A4]" />
              ) : (
                <XCircle className="w-5 h-5 text-[#F26D6D]" />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#9FB0C7]">Status:</span>
                <span
                  className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm",
                    agent.status === "online"
                      ? "bg-[#3EF3A4]/20 text-[#3EF3A4] border border-[#3EF3A4]/30"
                      : "bg-[#F26D6D]/20 text-[#F26D6D] border border-[#F26D6D]/30"
                  )}
                >
                  {agent.status === "online" ? "Online" : "Offline"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#9FB0C7]">Last Heartbeat:</span>
                <span className="text-[#E6EDF3]">{agent.lastHeartbeat}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#9FB0C7] flex items-center gap-1">
                  <Server className="w-4 h-4" />
                  Server:
                </span>
                <span className="text-[#E6EDF3]">{agent.serverName}</span>
              </div>
            </div>
          </motion.div>
          ))}
        </motion.div>
      )}

      {/* Agent Management Panel */}
      <AgentManagementPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        agent={selectedAgent}
        onAgentUpdate={handleAgentUpdate}
      />
    </motion.div>
  );
}

