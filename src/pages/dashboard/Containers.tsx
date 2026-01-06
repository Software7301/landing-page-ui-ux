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
        <h2 className="text-2xl font-bold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
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
        <h1 className="text-3xl font-bold mb-2 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
          {t("dashboard.containers.title", language)}
        </h1>
        <p className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
          {t("dashboard.containers.subtitle", language)}
        </p>
      </motion.div>

      {/* Containers List */}
      {workspaceContainers.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border overflow-hidden transition-colors duration-300"
          style={{
            borderColor: "var(--color-border)",
            background: `linear-gradient(to bottom, var(--color-input-bg), var(--color-card))`,
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr 
                  className="border-b transition-colors duration-300"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-input-bg)80",
                  }}
                >
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    {t("dashboard.containers.name", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    {t("dashboard.containers.image", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    {t("dashboard.containers.status", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    {t("dashboard.containers.port", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    {t("dashboard.containers.server", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
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
                    className="border-b transition-colors duration-300"
                    style={{
                      borderColor: "var(--color-border)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors duration-300"
                          style={{
                            background: `linear-gradient(135deg, var(--color-primary)20, var(--color-accent)10)`,
                            borderColor: "var(--color-primary)30",
                          }}
                        >
                          <Container className="w-5 h-5 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
                        </div>
                        <span className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                          {container.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                      {container.image}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm border transition-colors duration-300"
                        style={container.status === "running" ? {
                          backgroundColor: "var(--color-success)20",
                          color: "var(--color-success)",
                          borderColor: "var(--color-success)30",
                        } : container.status === "restarting" ? {
                          backgroundColor: "var(--color-warning)20",
                          color: "var(--color-warning)",
                          borderColor: "var(--color-warning)30",
                        } : {
                          backgroundColor: "var(--color-error)20",
                          color: "var(--color-error)",
                          borderColor: "var(--color-error)30",
                        }}
                      >
                        {container.status === "running" ? "Running" : container.status === "restarting" ? "Restarting" : "Stopped"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                      {container.port}
                    </td>
                    <td className="px-6 py-4 text-sm transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                      {container.serverName}
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 transition-colors duration-300"
                            style={{
                              color: "var(--color-text-secondary)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "var(--color-text)";
                              e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--color-text-secondary)";
                              e.currentTarget.style.backgroundColor = "transparent";
                            }}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 transition-colors duration-300"
                          style={{
                            backgroundColor: "var(--color-card)",
                            borderColor: "var(--color-border)",
                          }}
                        >
                          {container.status === "stopped" ? (
                            <DropdownMenuItem 
                              onClick={() => handleStart(container)}
                              className="cursor-pointer transition-colors duration-300"
                              style={{ color: "var(--color-text)" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              {t("dashboard.containers.start", language)}
                            </DropdownMenuItem>
                          ) : (
                            <>
                              <DropdownMenuItem 
                                onClick={() => handleStop(container)}
                                className="cursor-pointer transition-colors duration-300"
                                style={{ color: "var(--color-text)" }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                }}
                              >
                                <Square className="mr-2 h-4 w-4" />
                                {t("dashboard.containers.stop", language)}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleRestart(container)}
                                className="cursor-pointer transition-colors duration-300"
                                style={{ color: "var(--color-text)" }}
                                disabled={container.status === "restarting"}
                                onMouseEnter={(e) => {
                                  if (!e.currentTarget.disabled) {
                                    e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                }}
                              >
                                <RotateCw className="mr-2 h-4 w-4" />
                                {t("dashboard.containers.restart", language)}
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleLogs(container)}
                            className="cursor-pointer transition-colors duration-300"
                            style={{ color: "var(--color-text)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {t("dashboard.containers.logs", language)}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(container)}
                            className="cursor-pointer transition-colors duration-300"
                            style={{ color: "var(--color-error)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "var(--color-error)10";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }}
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
              <Container className="w-8 h-8 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
            </div>
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
              Nenhum container encontrado
            </h3>
            <p className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
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
        <AlertDialogContent 
          className="transition-colors duration-300"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
              Remover Container
            </AlertDialogTitle>
            <AlertDialogDescription className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
              Tem certeza que deseja remover o container "{containerToDelete?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="transition-colors duration-300"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text)";
                e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-error)",
                color: "var(--color-error-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-error)90";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-error)";
              }}
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

