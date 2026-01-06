import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Container } from "@/providers/container-provider";

interface ContainerLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  container: Container | null;
}

export function ContainerLogsModal({ isOpen, onClose, container }: ContainerLogsModalProps) {
  if (!container) return null;

  const logs = container.status === "running" 
    ? [
        "[INFO] Container started successfully",
        "[INFO] Application listening on port " + container.port.split(":")[1],
        "[INFO] Health check passed",
        "[DEBUG] Connection established",
        "[INFO] Request processed: GET /",
        "[INFO] Request processed: GET /api/status",
      ]
    : [
        "[WARN] Container is stopped",
        "[INFO] Last log entry before stop",
        "[INFO] Graceful shutdown completed",
      ];

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
            className="bg-[#0B1E36] border border-[#1C2A3F] rounded-xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1C2A3F]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                  <FileText className="w-5 h-5 text-[#2EE6D6]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#E6EDF3]">Logs - {container.name}</h2>
                  <p className="text-sm text-[#9FB0C7]">{container.image}</p>
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

            {/* Logs Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0E1625]">
              <div className="space-y-1 font-mono text-sm">
                {logs.map((log, index) => {
                  const isInfo = log.includes("[INFO]");
                  const isWarn = log.includes("[WARN]");
                  const isDebug = log.includes("[DEBUG]");
                  const isError = log.includes("[ERROR]");

                  return (
                    <div
                      key={index}
                      className={`
                        ${isInfo ? "text-[#3EF3A4]" : ""}
                        ${isWarn ? "text-[#F5A623]" : ""}
                        ${isDebug ? "text-[#2EE6D6]" : ""}
                        ${isError ? "text-[#F26D6D]" : ""}
                        ${!isInfo && !isWarn && !isDebug && !isError ? "text-[#9FB0C7]" : ""}
                      `}
                    >
                      {log}
                    </div>
                  );
                })}
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
    </AnimatePresence>
  );
}

