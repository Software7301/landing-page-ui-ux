import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Play, Square, RotateCw, Trash2, FileText, MoreVertical } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useWorkspace } from "@/providers/workspace-provider";
import { useContainer, type Container as ContainerType } from "@/providers/container-provider";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContainerLogsModal } from "@/components/dashboard/ContainerLogsModal";
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

export default function Containers() {
  const { language } = useLanguage();
  const { activeWorkspace } = useWorkspace();
  const { 
    containers, 
    getContainersByWorkspace, 
    deleteContainer, 
    startContainer, 
    stopContainer, 
    restartContainer 
  } = useContainer();
  
  const [selectedContainer, setSelectedContainer] = useState<ContainerType | null>(null);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [containerToDelete, setContainerToDelete] = useState<ContainerType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const workspaceContainers = activeWorkspace 
    ? getContainersByWorkspace(activeWorkspace.id)
    : [];

  const handleStart = (container: ContainerType) => {
    if (container.status === "stopped") {
      startContainer(container.id);
    }
  };

  const handleStop = (container: ContainerType) => {
    if (container.status === "running") {
      stopContainer(container.id);
    }
  };

  const handleRestart = (container: ContainerType) => {
    if (container.status === "running") {
      restartContainer(container.id);
    }
  };

  const handleLogs = (container: ContainerType) => {
    setSelectedContainer(container);
    setIsLogsModalOpen(true);
  };

  const handleDeleteClick = (container: ContainerType) => {
    setContainerToDelete(container);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (containerToDelete) {
      deleteContainer(containerToDelete.id);
      setContainerToDelete(null);
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
          Selecione um workspace para gerenciar containers
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
          {t("dashboard.containers.title", language)}
        </h1>
        <p className="text-[#9FB0C7]">
          {t("dashboard.containers.subtitle", language)}
        </p>
      </motion.div>

      {/* Containers List */}
      {workspaceContainers.length > 0 ? (
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
                    {t("dashboard.containers.name", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.containers.image", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.containers.status", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.containers.port", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.containers.server", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#9FB0C7]">
                    {t("dashboard.containers.actions", language)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {workspaceContainers.map((container, index) => (
                  <motion.tr
                    key={container.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                    className="border-b border-[#1C2A3F] hover:bg-[#142B4F]/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                          <Container className="w-5 h-5 text-[#2EE6D6]" />
                        </div>
                        <span className="text-sm font-medium text-[#E6EDF3]">{container.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9FB0C7]">{container.image}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm",
                          container.status === "running"
                            ? "bg-[#3EF3A4]/20 text-[#3EF3A4] border border-[#3EF3A4]/30"
                            : container.status === "restarting"
                            ? "bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30"
                            : "bg-[#F26D6D]/20 text-[#F26D6D] border border-[#F26D6D]/30"
                        )}
                      >
                        {container.status === "running" ? "Running" : container.status === "restarting" ? "Restarting" : "Stopped"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9FB0C7]">{container.port}</td>
                    <td className="px-6 py-4 text-sm text-[#9FB0C7]">{container.serverName}</td>
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
                          {container.status === "stopped" ? (
                            <DropdownMenuItem 
                              onClick={() => handleStart(container)}
                              className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer"
                            >
                              <Play className="mr-2 h-4 w-4" />
                              {t("dashboard.containers.start", language)}
                            </DropdownMenuItem>
                          ) : (
                            <>
                              <DropdownMenuItem 
                                onClick={() => handleStop(container)}
                                className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer"
                              >
                                <Square className="mr-2 h-4 w-4" />
                                {t("dashboard.containers.stop", language)}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleRestart(container)}
                                className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer"
                                disabled={container.status === "restarting"}
                              >
                                <RotateCw className="mr-2 h-4 w-4" />
                                {t("dashboard.containers.restart", language)}
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleLogs(container)}
                            className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {t("dashboard.containers.logs", language)}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(container)}
                            className="text-[#F26D6D] hover:bg-[#0E1625] cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("dashboard.containers.remove", language)}
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
              <Container className="w-8 h-8 text-[#2EE6D6]" />
            </div>
            <h3 className="text-xl font-semibold text-[#E6EDF3] mb-2">
              Nenhum container encontrado
            </h3>
            <p className="text-[#9FB0C7]">
              Crie seu primeiro container para começar a gerenciar suas aplicações Docker.
            </p>
          </div>
        </motion.div>
      )}

      {/* Modals and Dialogs */}
      <ContainerLogsModal
        isOpen={isLogsModalOpen}
        onClose={() => setIsLogsModalOpen(false)}
        container={selectedContainer}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0B1E36] border-[#1C2A3F]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#E6EDF3]">
              Remover Container
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#9FB0C7]">
              Tem certeza que deseja remover o container "{containerToDelete?.name}"? Esta ação não pode ser desfeita.
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
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

