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
        <h2 className="text-2xl font-bold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
          {t("dashboard.servers.title", language)}
        </h1>
        <p className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
          {t("dashboard.servers.subtitle", language)}
        </p>
      </motion.div>

      {workspaceServers.length > 0 ? (
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
                    {t("dashboard.servers.name", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    {t("dashboard.servers.region", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    {t("dashboard.servers.status", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    {t("dashboard.servers.agent", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    {t("dashboard.servers.resources", language)}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
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
                          <Server className="w-5 h-5 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
                        </div>
                        <div>
                          <p className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                            {server.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                      {server.region}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm border transition-colors duration-300"
                        style={server.status === "online" ? {
                          backgroundColor: "var(--color-success)20",
                          color: "var(--color-success)",
                          borderColor: "var(--color-success)30",
                        } : {
                          backgroundColor: "var(--color-error)20",
                          color: "var(--color-error)",
                          borderColor: "var(--color-error)30",
                        }}
                      >
                        {server.status === "online" ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm border transition-colors duration-300"
                        style={server.agentConnected ? {
                          backgroundColor: "var(--color-success)20",
                          color: "var(--color-success)",
                          borderColor: "var(--color-success)30",
                        } : {
                          backgroundColor: "var(--color-text-secondary)20",
                          color: "var(--color-text-secondary)",
                          borderColor: "var(--color-border)",
                        }}
                      >
                        {server.agentConnected ? "Connected" : "Disconnected"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                      CPU: {server.cpuUsage.toFixed(1)}% | RAM: {server.ramUsage.toFixed(1)}%
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
                          <DropdownMenuItem 
                            onClick={() => handleViewDetails(server)}
                            className="cursor-pointer transition-colors duration-300"
                            style={{ color: "var(--color-text)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }}
                          >
                            <Server className="mr-2 h-4 w-4" />
                            {t("dashboard.servers.viewDetails", language)}
                          </DropdownMenuItem>
                          {server.status === "online" ? (
                            <>
                              <DropdownMenuItem 
                                onClick={() => handleRestart(server)}
                                className="cursor-pointer transition-colors duration-300"
                                style={{ color: "var(--color-text)" }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                }}
                              >
                                <RotateCw className="mr-2 h-4 w-4" />
                                {t("dashboard.servers.restart", language)}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStop(server)}
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
                                {t("dashboard.servers.stop", language)}
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => handleStart(server)}
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
                              Iniciar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(server)}
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
              <Server className="w-8 h-8 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
            </div>
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
              Nenhum servidor encontrado
            </h3>
            <p className="mb-6 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
              Crie seu primeiro servidor para começar a gerenciar sua infraestrutura.
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
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
              Criar Servidor
            </Button>
          </div>
        </motion.div>
      )}

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
        <AlertDialogContent 
          className="transition-colors duration-300"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
              Deletar Servidor
            </AlertDialogTitle>
            <AlertDialogDescription className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
              Tem certeza que deseja deletar o servidor "{serverToDelete?.name}"? Esta ação não pode ser desfeita.
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
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
