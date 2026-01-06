import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDomain } from "@/providers/domain-provider";
import { useWorkspace } from "@/providers/workspace-provider";
import { useContainer } from "@/providers/container-provider";

interface CreateDomainModalProps {
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

export function CreateDomainModal({ isOpen, onClose }: CreateDomainModalProps) {
  const { createDomain } = useDomain();
  const { activeWorkspace } = useWorkspace();
  const { getContainersByWorkspace } = useContainer();
  const [domain, setDomain] = useState("");
  const [containerName, setContainerName] = useState("");
  const [dnsType, setDnsType] = useState<"A" | "CNAME">("A");
  const [dnsValue, setDnsValue] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const containers = activeWorkspace 
    ? getContainersByWorkspace(activeWorkspace.id)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!activeWorkspace) {
      setError("Selecione um workspace primeiro");
      return;
    }

    if (!domain.trim()) {
      setError("Domínio é obrigatório");
      return;
    }

    if (!domain.includes(".")) {
      setError("Domínio inválido");
      return;
    }

    if (!containerName.trim()) {
      setError("Container é obrigatório");
      return;
    }

    if (!dnsValue.trim()) {
      setError("Valor DNS é obrigatório");
      return;
    }

    setIsCreating(true);

    try {
      createDomain(
        domain.trim(),
        containerName.trim(),
        dnsType,
        dnsValue.trim(),
        activeWorkspace.id
      );

      setDomain("");
      setContainerName("");
      setDnsType("A");
      setDnsValue("");
      onClose();
    } catch (err) {
      setError("Erro ao criar domínio. Tente novamente.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setDomain("");
    setContainerName("");
    setDnsType("A");
    setDnsValue("");
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
                    <Globe className="w-5 h-5 text-[#2EE6D6]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#E6EDF3]">
                    Adicionar Domínio
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
                  <Label htmlFor="domain" className="text-sm font-medium text-[#C4B5FD]">
                    Domínio
                  </Label>
                  <Input
                    id="domain"
                    type="text"
                    value={domain}
                    onChange={(e) => {
                      setDomain(e.target.value);
                      setError("");
                    }}
                    placeholder="exemplo.com"
                    className="h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#1C2A3F]/50"
                    autoFocus
                    disabled={isCreating}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="container" className="text-sm font-medium text-[#C4B5FD]">
                    Container
                  </Label>
                  {containers.length > 0 ? (
                    <select
                      id="container"
                      value={containerName}
                      onChange={(e) => setContainerName(e.target.value)}
                      className="w-full h-11 bg-[#0E1625] border border-[#1C2A3F] rounded-md px-3 text-[#E6EDF3] focus:border-[#2EE6D6] focus:outline-none hover:border-[#1C2A3F]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isCreating}
                    >
                      <option value="" className="bg-[#0E1625]">Selecione um container</option>
                      {containers.map((container) => (
                        <option key={container.id} value={container.name} className="bg-[#0E1625]">
                          {container.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id="container"
                      type="text"
                      value={containerName}
                      onChange={(e) => {
                        setContainerName(e.target.value);
                        setError("");
                      }}
                      placeholder="Nome do container"
                      className="h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#1C2A3F]/50"
                      disabled={isCreating}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dns-type" className="text-sm font-medium text-[#C4B5FD]">
                    Tipo DNS
                  </Label>
                  <select
                    id="dns-type"
                    value={dnsType}
                    onChange={(e) => setDnsType(e.target.value as "A" | "CNAME")}
                    className="w-full h-11 bg-[#0E1625] border border-[#1C2A3F] rounded-md px-3 text-[#E6EDF3] focus:border-[#2EE6D6] focus:outline-none hover:border-[#1C2A3F]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isCreating}
                  >
                    <option value="A" className="bg-[#0E1625]">A Record (IP Address)</option>
                    <option value="CNAME" className="bg-[#0E1625]">CNAME (Domain)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dns-value" className="text-sm font-medium text-[#C4B5FD]">
                    {dnsType === "A" ? "IP Address" : "CNAME Value"}
                  </Label>
                  <Input
                    id="dns-value"
                    type="text"
                    value={dnsValue}
                    onChange={(e) => {
                      setDnsValue(e.target.value);
                      setError("");
                    }}
                    placeholder={dnsType === "A" ? "192.168.1.100" : "example.com"}
                    className="h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#1C2A3F]/50"
                    disabled={isCreating}
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
                    {isCreating ? "Criando..." : "Adicionar Domínio"}
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

