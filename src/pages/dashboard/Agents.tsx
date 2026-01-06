import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, CheckCircle, XCircle, Server, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AgentManagementPanel } from "@/components/dashboard/AgentManagementPanel";
import { CreateAgentModal } from "@/components/dashboard/CreateAgentModal";
import { useAgent } from "@/providers/agent-provider";
import { useWorkspace } from "@/providers/workspace-provider";

export default function Agents() {
  const { language } = useLanguage();
  const { agents, getAgentsByWorkspace } = useAgent();
  const { activeWorkspace } = useWorkspace();
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
            {t("dashboard.agents.title", language)}
          </h1>
          <p className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
            {t("dashboard.agents.subtitle", language)}
          </p>
        </div>
        {activeWorkspace && (
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="font-semibold transition-all duration-300"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
              e.currentTarget.style.boxShadow = `0 10px 15px var(--color-primary)40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
              e.currentTarget.style.boxShadow = `0 4px 6px var(--color-primary)30`;
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("dashboard.agents.create", language)}
          </Button>
        )}
      </motion.div>

      {/* Agents List */}
      {workspaceAgents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center py-12 rounded-xl border transition-colors duration-300"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-card)",
          }}
        >
          <Bot className="w-16 h-16 mx-auto mb-4 opacity-50 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }} />
          <p className="mb-4 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
            {t("dashboard.agents.emptyTitle", language)}
          </p>
          {activeWorkspace && (
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="font-semibold transition-all duration-300"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
                e.currentTarget.style.boxShadow = `0 10px 15px var(--color-primary)40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary)";
                e.currentTarget.style.boxShadow = `0 4px 6px var(--color-primary)30`;
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
          )}
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
            className="rounded-xl border p-6 transition-all duration-300 group cursor-pointer"
            style={{
              borderColor: "var(--color-border)",
              background: `linear-gradient(to bottom, var(--color-input-bg), var(--color-card))`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)50";
              e.currentTarget.style.boxShadow = `0 0 20px var(--color-primary)20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center border transition-colors duration-300"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary)20, var(--color-accent)10)`,
                    borderColor: "var(--color-primary)30",
                  }}
                >
                  <Bot className="w-6 h-6 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <h3 
                    className="text-lg font-semibold transition-colors duration-300"
                    style={{ color: "var(--color-text)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text)";
                    }}
                  >
                    {agent.name}
                  </h3>
                  <p className="text-sm transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    v{agent.version}
                  </p>
                </div>
              </div>
              {agent.status === "online" ? (
                <CheckCircle className="w-5 h-5 transition-colors duration-300" style={{ color: "var(--color-success)" }} />
              ) : (
                <XCircle className="w-5 h-5 transition-colors duration-300" style={{ color: "var(--color-error)" }} />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                  {t("dashboard.agents.status", language)}:
                </span>
                <span
                  className="px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm border transition-colors duration-300"
                  style={agent.status === "online" ? {
                    backgroundColor: "var(--color-success)20",
                    color: "var(--color-success)",
                    borderColor: "var(--color-success)30",
                  } : {
                    backgroundColor: "var(--color-error)20",
                    color: "var(--color-error)",
                    borderColor: "var(--color-error)30",
                  }}
                >
                  {agent.status === "online" 
                    ? t("dashboard.agents.statusOnline", language) 
                    : t("dashboard.agents.statusOffline", language)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                  {t("dashboard.agents.lastHeartbeat", language)}:
                </span>
                <span className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                  {agent.lastHeartbeat}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                  <Server className="w-4 h-4" />
                  {t("dashboard.agents.server", language)}:
                </span>
                <span className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                  {agent.serverName}
                </span>
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

      {/* Create Agent Modal */}
      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </motion.div>
  );
}

