import { useState } from "react";
import { motion } from "framer-motion";
import { Server, MoreVertical, Square, RotateCw, Trash2, Plus, Play } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useWorkspace } from "@/providers/workspace-provider";
import { useServer, type Server as ServerType } from "@/providers/server-provider";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ServerDetailModal } from "@/components/dashboard/ServerDetailModal";
import { CreateServerModal } from "@/components/dashboard/CreateServerModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Servers() {
  const { language } = useLanguage();
  const { activeWorkspace } = useWorkspace();
  const { 
    servers, 
    getServersByWorkspace, 
    deleteServer, 
    restartServer, 
    stopServer, 
    startServer 
  } = useServer();
  
  const [selectedServer, setSelectedServer] = useState<ServerType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [serverToDelete, setServerToDelete] = useState<ServerType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const workspaceServers = activeWorkspace 
    ? getServersByWorkspace(activeWorkspace.id)
    : [];

  const handleViewDetails = (server: ServerType) => {
    setSelectedServer(server);
    setIsDetailModalOpen(true);
  };

  const handleRestart = (server: ServerType) => {
    if (server.status === "online") {
      restartServer(server.id);
    }
  };

  const handleStop = (server: ServerType) => {
    if (server.status === "online") {
      stopServer(server.id);
    }
  };

  const handleStart = (server: ServerType) => {
    if (server.status === "offline") {
      startServer(server.id);
    }
  };

  const handleDeleteClick = (server: ServerType) => {
    setServerToDelete(server);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (serverToDelete) {
      deleteServer(serverToDelete.id);
      setServerToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  if (!activeWorkspace) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#E6EDF3]">
          Selecione um workspace para gerenciar servidores
        </h2>
      </motion.div>
    );
  }

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
          {t("dashboard.servers.title", language)}
        </h1>
        <p className="text-[#9FB0C7]">
          {t("dashboard.servers.subtitle", language)}
        </p>
      </motion.div>

      {/* Servers List */}
      {workspaceServers.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1C2A3F] bg-[#0E1625]/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.servers.name", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.servers.region", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.servers.status", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.servers.agent", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.servers.resources", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.servers.actions", language)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {workspaceServers.map((server, index) => (
                  <motion.tr
                    key={server.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                    className="border-b border-[#1C2A3F] hover:bg-[#142B4F]/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                          <Server className="w-5 h-5 text-[#2EE6D6]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#E6EDF3]">{server.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9FB0C7]">{server.region}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm",
                          server.status === "online"
                            ? "bg-[#3EF3A4]/20 text-[#3EF3A4] border border-[#3EF3A4]/30"
                            : "bg-[#F26D6D]/20 text-[#F26D6D] border border-[#F26D6D]/30"
                        )}
                      >
                        {server.status === "online" ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm",
                          server.agentConnected
                            ? "bg-[#3EF3A4]/20 text-[#3EF3A4] border border-[#3EF3A4]/30"
                            : "bg-[#9FB0C7]/20 text-[#9FB0C7] border border-[#1C2A3F]"
                        )}
                      >
                        {server.agentConnected ? "Connected" : "Disconnected"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9FB0C7]">
                      CPU: {server.cpuUsage.toFixed(1)}% | RAM: {server.ramUsage.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-[#142B4F] border-[#1C2A3F] w-48"
                        >
                          <DropdownMenuItem 
                            onClick={() => handleViewDetails(server)}
                            className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer"
                          >
                            <Server className="mr-2 h-4 w-4" />
                            {t("dashboard.servers.viewDetails", language)}
                          </DropdownMenuItem>
                          {server.status === "online" ? (
                            <>
                              <DropdownMenuItem 
                                onClick={() => handleRestart(server)}
                                className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer"
                              >
                                <RotateCw className="mr-2 h-4 w-4" />
                                {t("dashboard.servers.restart", language)}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStop(server)}
                                className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer"
                              >
                                <Square className="mr-2 h-4 w-4" />
                                {t("dashboard.servers.stop", language)}
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => handleStart(server)}
                              className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer"
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Iniciar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(server)}
                            className="text-[#F26D6D] hover:bg-[#0E1625] cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("dashboard.servers.delete", language)}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-12 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center mx-auto mb-4 border border-[#2EE6D6]/20">
              <Server className="w-8 h-8 text-[#2EE6D6]" />
            </div>
            <h3 className="text-xl font-semibold text-[#E6EDF3] mb-2">
              Nenhum servidor encontrado
            </h3>
            <p className="text-[#9FB0C7] mb-6">
              Crie seu primeiro servidor para começar a gerenciar sua infraestrutura.
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Servidor
            </Button>
          </div>
        </motion.div>
      )}

      {/* Modals and Dialogs */}
      <CreateServerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ServerDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        server={selectedServer}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0B1E36] border-[#1C2A3F]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#E6EDF3]">
              Deletar Servidor
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#9FB0C7]">
              Tem certeza que deseja deletar o servidor "{serverToDelete?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-[#F26D6D] text-white hover:bg-[#F26D6D]/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

