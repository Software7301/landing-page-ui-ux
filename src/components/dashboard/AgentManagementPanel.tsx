import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Server, Activity, Cpu, HardDrive, RefreshCw, Power, Trash2, Download, Settings, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAgent, type Agent } from "@/providers/agent-provider";
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

interface AgentManagementPanelProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent | null;
  onAgentUpdate?: () => void;
}

export function AgentManagementPanel({ isOpen, onClose, agent, onAgentUpdate }: AgentManagementPanelProps) {
  const { startAgent, stopAgent, restartAgent, updateAgentVersion, deleteAgent } = useAgent();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);

  if (!agent) return null;

  const handleStart = () => {
    startAgent(agent.id);
    onAgentUpdate?.();
  };

  const handleStop = () => {
    stopAgent(agent.id);
    onAgentUpdate?.();
  };

  const handleRestart = () => {
    restartAgent(agent.id);
    onAgentUpdate?.();
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    updateAgentVersion(agent.id);
    setTimeout(() => {
      setIsUpdating(false);
      onAgentUpdate?.();
    }, 1500);
  };

  const handleConfigure = () => {
    setIsConfiguring(true);
    setTimeout(() => {
      setIsConfiguring(false);
    }, 1000);
  };

  const handleDelete = () => {
    deleteAgent(agent.id);
    setIsDeleteDialogOpen(false);
    onClose();
    onAgentUpdate?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0B1E36] border border-[#1C2A3F] rounded-xl w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-[#1C2A3F] sticky top-0 bg-[#0B1E36] z-10">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                  <Bot className="w-8 h-8 text-[#2EE6D6]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#E6EDF3] mb-1">{agent.name}</h2>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-md text-sm font-medium backdrop-blur-sm",
                        agent.status === "online"
                          ? "bg-[#3EF3A4]/20 text-[#3EF3A4] border border-[#3EF3A4]/30"
                          : "bg-[#F26D6D]/20 text-[#F26D6D] border border-[#F26D6D]/30"
                      )}
                    >
                      {agent.status === "online" ? "Online" : "Offline"}
                    </span>
                    <span className="text-sm text-[#9FB0C7]">Versão: {agent.version}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={onClose}
                className="h-8 w-8 p-0 text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-4 h-4 text-[#9FB0C7]" />
                    <span className="text-sm text-[#9FB0C7]">Servidor</span>
                  </div>
                  <p className="text-lg font-semibold text-[#E6EDF3]">{agent.serverName}</p>
                </div>
                <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#9FB0C7]" />
                    <span className="text-sm text-[#9FB0C7]">Último Heartbeat</span>
                  </div>
                  <p className="text-lg font-semibold text-[#E6EDF3]">{agent.lastHeartbeat}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-6">
                <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#2EE6D6]" />
                  Métricas do Agente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-[#9FB0C7]" />
                        <span className="text-sm text-[#9FB0C7]">CPU Usage</span>
                      </div>
                      <span className="text-sm font-semibold text-[#E6EDF3]">
                        {agent.status === "online" ? `${agent.cpuUsage.toFixed(1)}%` : "0%"}
                      </span>
                    </div>
                    <div className="w-full bg-[#1C2A3F] rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: agent.status === "online" ? `${agent.cpuUsage}%` : "0%" }}
                        transition={{ duration: 0.5 }}
                        className="h-2 rounded-full bg-[#3EF3A4]"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-[#9FB0C7]" />
                        <span className="text-sm text-[#9FB0C7]">RAM Usage</span>
                      </div>
                      <span className="text-sm font-semibold text-[#E6EDF3]">
                        {agent.status === "online" ? `${Math.round(agent.ramUsage)} MB` : "0 MB"}
                      </span>
                    </div>
                    <div className="w-full bg-[#1C2A3F] rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: agent.status === "online" ? `${agent.ramUsage}%` : "0%" }}
                        transition={{ duration: 0.5 }}
                        className="h-2 rounded-full bg-[#3EF3A4]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-6">
                <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">Ações</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {agent.status === "online" ? (
                    <>
                      <Button
                        onClick={handleRestart}
                        variant="outline"
                        className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F] hover:border-[#2EE6D6]/30"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reiniciar
                      </Button>
                      <Button
                        onClick={handleStop}
                        variant="outline"
                        className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F] hover:border-[#F26D6D]/30"
                      >
                        <Power className="w-4 h-4 mr-2" />
                        Parar
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleStart}
                      variant="outline"
                      className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F] hover:border-[#3EF3A4]/30"
                    >
                      <Power className="w-4 h-4 mr-2" />
                      Iniciar
                    </Button>
                  )}
                  <Button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    variant="outline"
                    className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F] hover:border-[#2EE6D6]/30 disabled:opacity-50"
                  >
                    <Download className={cn("w-4 h-4 mr-2", isUpdating && "animate-spin")} />
                    {isUpdating ? "Atualizando..." : "Atualizar"}
                  </Button>
                  <Button
                    onClick={handleConfigure}
                    disabled={isConfiguring}
                    variant="outline"
                    className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F] hover:border-[#2EE6D6]/30 disabled:opacity-50"
                  >
                    <Settings className={cn("w-4 h-4 mr-2", isConfiguring && "animate-spin")} />
                    {isConfiguring ? "Configurando..." : "Configurar"}
                  </Button>
                  <Button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    variant="outline"
                    className="border-[#F26D6D]/30 text-[#F26D6D] hover:bg-[#F26D6D]/10 hover:border-[#F26D6D]/50 col-span-2 md:col-span-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                </div>
              </div>

              {/* Logs Section */}
              <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-6">
                <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">Logs Recentes</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {agent.status === "online" ? (
                    <>
                      <div className="text-sm text-[#9FB0C7] font-mono">
                        <span className="text-[#3EF3A4]">[INFO]</span> Agent heartbeat received - {agent.lastHeartbeat}
                      </div>
                      <div className="text-sm text-[#9FB0C7] font-mono">
                        <span className="text-[#3EF3A4]">[INFO]</span> Monitoring server resources...
                      </div>
                      <div className="text-sm text-[#9FB0C7] font-mono">
                        <span className="text-[#2EE6D6]">[DEBUG]</span> Connection established with server
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-[#9FB0C7] font-mono">
                      <span className="text-[#F26D6D]">[WARN]</span> Agent offline - Last seen {agent.lastHeartbeat}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-[#1C2A3F]">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F]"
              >
                Fechar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0B1E36] border-[#1C2A3F] text-[#E6EDF3]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#E6EDF3]">Remover Agente</AlertDialogTitle>
            <AlertDialogDescription className="text-[#9FB0C7]">
              Tem certeza que deseja remover o agente "{agent.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-[#F26D6D] text-white hover:bg-[#F26D6D]/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AnimatePresence>
  );
}

