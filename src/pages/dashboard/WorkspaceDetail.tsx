import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FolderKanban, Calendar, Server, CheckCircle2 } from "lucide-react";
import { useWorkspace } from "@/providers/workspace-provider";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";

export default function WorkspaceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();

  const workspace = workspaces.find((w) => w.id === id);

  if (!workspace) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#E6EDF3]">
          {t("dashboard.workspaces.notFound", language) || "Workspace não encontrado"}
        </h2>
        <Button
          onClick={() => navigate("/dashboard/workspaces")}
          className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Workspaces
        </Button>
      </motion.div>
    );
  }

  const isActive = activeWorkspace?.id === workspace.id;
  const createdAt = new Date(workspace.createdAt).toLocaleDateString(language === "pt" ? "pt-BR" : language === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleActivate = () => {
    setActiveWorkspace(workspace);
  };

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
        className="flex items-center gap-4"
      >
        <Button
          onClick={() => navigate("/dashboard/workspaces")}
          variant="ghost"
          className="text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </motion.div>

      {/* Workspace Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
              <FolderKanban className="w-8 h-8 text-[#2EE6D6]" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-[#E6EDF3]">{workspace.name}</h1>
                {isActive && (
                  <span className="px-3 py-1 rounded-md text-sm font-medium bg-[#3EF3A4]/20 text-[#3EF3A4] border border-[#3EF3A4]/30">
                    <CheckCircle2 className="w-4 h-4 inline mr-1" />
                    Ativo
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-[#9FB0C7]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Criado em {createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  <span>0 servidores</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={handleActivate}
              className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
            >
              Ativar Workspace
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6">
          <div className="text-sm text-[#9FB0C7] mb-2">Servidores</div>
          <div className="text-3xl font-bold text-[#E6EDF3]">0</div>
        </div>
        <div className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6">
          <div className="text-sm text-[#9FB0C7] mb-2">Agentes</div>
          <div className="text-3xl font-bold text-[#E6EDF3]">0</div>
        </div>
        <div className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6">
          <div className="text-sm text-[#9FB0C7] mb-2">Containers</div>
          <div className="text-3xl font-bold text-[#E6EDF3]">0</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

