import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServer } from "@/providers/server-provider";
import { useWorkspace } from "@/providers/workspace-provider";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

interface CreateServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const regions = [
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "eu-west-1", label: "EU West (Ireland)" },
  { value: "eu-central-1", label: "EU Central (Frankfurt)" },
  { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  { value: "sa-east-1", label: "South America (São Paulo)" },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function CreateServerModal({ isOpen, onClose }: CreateServerModalProps) {
  const { createServer, startServer } = useServer();
  const { activeWorkspace } = useWorkspace();
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [region, setRegion] = useState("us-east-1");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!activeWorkspace) {
      setError("Selecione um workspace primeiro");
      return;
    }

    if (!name.trim()) {
      setError("Nome do servidor é obrigatório");
      return;
    }

    if (name.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres");
      return;
    }

    setIsCreating(true);

    try {
      const newServer = createServer(name.trim(), region, activeWorkspace.id);
      
      setTimeout(() => {
        startServer(newServer.id);
      }, 500);

      setName("");
      setRegion("us-east-1");
      onClose();
    } catch (err) {
      setError("Erro ao criar servidor. Tente novamente.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setName("");
    setRegion("us-east-1");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#0B1E36] border border-[#1C2A3F] rounded-xl shadow-2xl pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#1C2A3F]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                    <Server className="w-5 h-5 text-[#2EE6D6]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#E6EDF3]">
                    Criar Servidor
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="server-name" className="text-sm font-medium text-[#C4B5FD]">
                    Nome do Servidor
                  </Label>
                  <Input
                    id="server-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Ex: Production Server 1"
                    className="h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#1C2A3F]/50"
                    autoFocus
                    disabled={isCreating}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="server-region" className="text-sm font-medium text-[#C4B5FD]">
                    Região
                  </Label>
                  <select
                    id="server-region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full h-11 bg-[#0E1625] border border-[#1C2A3F] rounded-md px-3 text-[#E6EDF3] focus:border-[#2EE6D6] focus:outline-none hover:border-[#1C2A3F]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isCreating}
                  >
                    {regions.map((reg) => (
                      <option key={reg.value} value={reg.value} className="bg-[#0E1625]">
                        {reg.label}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#F26D6D]"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    onClick={handleClose}
                    disabled={isCreating}
                    className="border border-[#1C2A3F] bg-[#0E1625] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50 disabled:opacity-50"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold disabled:opacity-50"
                  >
                    {isCreating ? "Criando..." : "Criar Servidor"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

