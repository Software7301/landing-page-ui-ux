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
          <h1 className="text-3xl font-bold text-[#E6EDF3] mb-2">
            {t("dashboard.workspaces.title", language)}
          </h1>
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

      <CreateWorkspaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}

