import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

interface UserProfileModalProps {
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

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { language } = useLanguage();
  const [name, setName] = useState("Max teste");
  const [email, setEmail] = useState("max@example.com");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email inválido");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 500);
  };

  const handleClose = () => {
    setName("Max teste");
    setEmail("max@example.com");
    setError("");
    onClose();
  };

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
                    <User className="w-5 h-5 text-[#2EE6D6]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#E6EDF3]">User Profile</h2>
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
                  <Label htmlFor="user-name" className="text-sm font-medium text-[#C4B5FD]">
                    Nome
                  </Label>
                  <Input
                    id="user-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    className="h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#1C2A3F]/50"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-email" className="text-sm font-medium text-[#C4B5FD]">
                    Email
                  </Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#1C2A3F]/50"
                    disabled={isSaving}
                  />
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

