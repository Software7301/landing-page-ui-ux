import { useState } from "react";
import { motion } from "framer-motion";
import { WorkspaceCard } from "@/components/dashboard/WorkspaceCard";
import { CreateWorkspaceModal } from "@/components/dashboard/CreateWorkspaceModal";
import { Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useWorkspace } from "@/providers/workspace-provider";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";

export default function Workspaces() {
  const { language } = useLanguage();
  const { workspaces, activeWorkspace } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
            {t("dashboard.workspaces.title", language)}
          </h1>
          <p className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
            {t("dashboard.workspaces.subtitle", language)}
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="transition-all duration-300 font-semibold"
          style={{
            background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
            color: "var(--color-primary-foreground)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 20px var(--color-primary)50`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("dashboard.workspaces.create", language)}
        </Button>
      </motion.div>

        {/* Workspaces Grid or Empty State */}
        {hasWorkspaces ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace, index) => (
              <WorkspaceCard
                key={workspace.id}
                id={workspace.id}
                name={workspace.name}
                status={activeWorkspace?.id === workspace.id ? "active" : "inactive"}
                serversCount={0}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border p-12 text-center transition-colors duration-300"
          style={{
            borderColor: "var(--color-border)",
            background: `linear-gradient(to bottom, var(--color-input-bg), var(--color-card))`,
          }}
        >
          <div className="max-w-md mx-auto">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border transition-colors duration-300"
              style={{
                background: `linear-gradient(135deg, var(--color-primary)20, var(--color-accent)10)`,
                borderColor: "var(--color-primary)30",
              }}
            >
              <Plus className="w-8 h-8 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
            </div>
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
              {t("dashboard.workspaces.emptyTitle", language)}
            </h3>
            <p className="mb-6 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
              {t("dashboard.workspaces.emptyDesc", language)}
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="transition-all duration-300 font-semibold"
              style={{
                background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                color: "var(--color-primary-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px var(--color-primary)50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("dashboard.workspaces.create", language)}
            </Button>
          </div>
        </motion.div>
      )}

      <CreateWorkspaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}

