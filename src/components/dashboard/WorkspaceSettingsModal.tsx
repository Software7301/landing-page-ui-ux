import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspace } from "@/providers/workspace-provider";

interface WorkspaceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function WorkspaceSettingsModal({ isOpen, onClose }: WorkspaceSettingsModalProps) {
  const { activeWorkspace, updateWorkspace } = useWorkspace();
  const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.name || "");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (activeWorkspace) {
      setWorkspaceName(activeWorkspace.name);
    }
  }, [activeWorkspace]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!activeWorkspace) {
      setError("Nenhum workspace selecionado");
      return;
    }

    if (!workspaceName.trim()) {
      setError("Nome do workspace é obrigatório");
      return;
    }

    if (workspaceName.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres");
      return;
    }

    setIsSaving(true);
    
    updateWorkspace(activeWorkspace.id, { name: workspaceName.trim() });
    
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 300);
  };

  const handleClose = () => {
    setWorkspaceName(activeWorkspace?.name || "");
    setError("");
    onClose();
  };

  if (!activeWorkspace) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#0B1E36] border border-[#1C2A3F] rounded-xl shadow-2xl pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#1C2A3F]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                    <SettingsIcon className="w-5 h-5 text-[#2EE6D6]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#E6EDF3]">Workspace Settings</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="workspace-name" className="text-sm font-medium text-[#C4B5FD]">
                    Nome do Workspace
                  </Label>
                  <Input
                    id="workspace-name"
                    type="text"
                    value={workspaceName}
                    onChange={(e) => {
                      setWorkspaceName(e.target.value);
                      setError("");
                    }}
                    className="h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#1C2A3F]/50"
                    disabled={isSaving}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-[#F26D6D]"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#C4B5FD]">Membros</Label>
                  <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4">
                    <p className="text-sm text-[#9FB0C7]">Funcionalidade de membros em breve</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#C4B5FD]">Permissões</Label>
                  <div className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4">
                    <p className="text-sm text-[#9FB0C7]">Funcionalidade de permissões em breve</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    onClick={handleClose}
                    disabled={isSaving}
                    className="border border-[#1C2A3F] bg-[#0E1625] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50 disabled:opacity-50"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold disabled:opacity-50"
                  >
                    {isSaving ? "Salvando..." : "Salvar"}
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

