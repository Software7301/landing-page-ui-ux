import { motion, AnimatePresence } from "framer-motion";
import { X, Server, MapPin, Activity, Cpu, HardDrive, Globe, Monitor } from "lucide-react";
import type { Server as ServerType } from "@/providers/server-provider";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  server: ServerType | null;
}

export function ServerDetailModal({ isOpen, onClose, server }: ServerDetailModalProps) {
  const { language } = useLanguage();

  if (!server) return null;

  const createdAt = new Date(server.createdAt).toLocaleDateString(
    language === "pt" ? "pt-BR" : language === "es" ? "es-ES" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

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
            className="bg-[#0B1E36] border border-[#1C2A3F] rounded-xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                  <Server className="w-6 h-6 text-[#2EE6D6]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#E6EDF3] mb-1">{server.name}</h2>
                  <div className="flex items-center gap-2">
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
                    <span
                      className={cn(
                        "px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm",
                        server.agentConnected
                          ? "bg-[#3EF3A4]/20 text-[#3EF3A4] border border-[#3EF3A4]/30"
                          : "bg-[#9FB0C7]/20 text-[#9FB0C7] border border-[#1C2A3F]"
                      )}
                    >
                      {server.agentConnected ? "Agent Connected" : "Agent Disconnected"}
                    </span>
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

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#9FB0C7]" />
                  <span className="text-sm text-[#9FB0C7]">Região</span>
                </div>
                <p className="text-lg font-semibold text-[#E6EDF3]">{server.region}</p>
              </div>
              <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-[#9FB0C7]" />
                  <span className="text-sm text-[#9FB0C7]">IP Address</span>
                </div>
                <p className="text-lg font-semibold text-[#E6EDF3]">{server.ip || "N/A"}</p>
              </div>
              <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-[#9FB0C7]" />
                  <span className="text-sm text-[#9FB0C7]">OS</span>
                </div>
                <p className="text-lg font-semibold text-[#E6EDF3]">{server.os || "N/A"}</p>
              </div>
              <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[#9FB0C7]" />
                  <span className="text-sm text-[#9FB0C7]">Criado em</span>
                </div>
                <p className="text-sm font-semibold text-[#E6EDF3]">{createdAt}</p>
              </div>
            </div>

            {/* Resources */}
            <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">Recursos</h3>
              <div className="space-y-4">
                {/* CPU Usage */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#9FB0C7]" />
                      <span className="text-sm text-[#9FB0C7]">CPU Usage</span>
                    </div>
                    <span className="text-sm font-semibold text-[#E6EDF3]">{server.cpuUsage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-[#1C2A3F] rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${server.cpuUsage}%` }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "h-2 rounded-full",
                        server.cpuUsage > 80
                          ? "bg-[#F26D6D]"
                          : server.cpuUsage > 50
                          ? "bg-[#F5A623]"
                          : "bg-[#3EF3A4]"
                      )}
                    />
                  </div>
                </div>

                {/* RAM Usage */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-[#9FB0C7]" />
                      <span className="text-sm text-[#9FB0C7]">RAM Usage</span>
                    </div>
                    <span className="text-sm font-semibold text-[#E6EDF3]">{server.ramUsage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-[#1C2A3F] rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${server.ramUsage}%` }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "h-2 rounded-full",
                        server.ramUsage > 80
                          ? "bg-[#F26D6D]"
                          : server.ramUsage > 50
                          ? "bg-[#F5A623]"
                          : "bg-[#3EF3A4]"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
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
    </AnimatePresence>
  );
}

