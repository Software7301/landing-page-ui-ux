import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspace } from "@/providers/workspace-provider";
import { useServer } from "@/providers/server-provider";
import { useContainer } from "@/providers/container-provider";
import { useDomain } from "@/providers/domain-provider";
import { useAgent } from "@/providers/agent-provider";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";

interface CreateWorkspaceModalProps {
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

export function CreateWorkspaceModal({ isOpen, onClose }: CreateWorkspaceModalProps) {
  const { createWorkspace } = useWorkspace();
  const { createServer, updateServer } = useServer();
  const { createContainer, startContainer } = useContainer();
  const { createDomain } = useDomain();
  const { createAgent, startAgent } = useAgent();
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nome do workspace é obrigatório");
      return;
    }

    if (name.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres");
      return;
    }

    const newWorkspace = createWorkspace(name.trim());
    
    setTimeout(() => {
      const server1 = createServer("Production Server 1", "us-east-1", newWorkspace.id);
      setTimeout(() => {
        updateServer(server1.id, { 
          status: "online", 
          agentConnected: true,
          cpuUsage: 45.2,
          ramUsage: 62.8,
        });
      }, 100);
      
      const server2 = createServer("Staging Server", "eu-west-1", newWorkspace.id);
      setTimeout(() => {
        updateServer(server2.id, { 
          status: "online", 
          agentConnected: true,
          cpuUsage: 23.1,
          ramUsage: 38.5,
        });
      }, 200);
      
      const server3 = createServer("Development Server", "us-west-2", newWorkspace.id);
      
      setTimeout(() => {
        const container1 = createContainer(
          "web-app",
          "nginx:latest",
          "80:80",
          server1.id,
          "Production Server 1",
          newWorkspace.id
        );
        setTimeout(() => {
          startContainer(container1.id);
        }, 300);
        
        const container2 = createContainer(
          "api-service",
          "node:18-alpine",
          "3000:3000",
          server2.id,
          "Staging Server",
          newWorkspace.id
        );
        setTimeout(() => {
          startContainer(container2.id);
        }, 400);
        
        createContainer(
          "database",
          "postgres:15",
          "5432:5432",
          server3.id,
          "Development Server",
          newWorkspace.id
        );
        
        setTimeout(() => {
          createDomain(
            "app.example.com",
            "web-app",
            "A",
            "192.168.1.100",
            newWorkspace.id
          );
          
          createDomain(
            "api.example.com",
            "api-service",
            "A",
            "192.168.1.101",
            newWorkspace.id
          );
          
          createDomain(
            "staging.example.com",
            "web-app",
            "CNAME",
            "staging.example.com",
            newWorkspace.id
          );
          
          setTimeout(() => {
            const agent1 = createAgent(
              "Agent Production-01",
              server1.id,
              "Production Server 1",
              newWorkspace.id
            );
            setTimeout(() => {
              startAgent(agent1.id);
            }, 100);
            
            const agent2 = createAgent(
              "Agent Staging-01",
              server2.id,
              "Staging Server",
              newWorkspace.id
            );
            setTimeout(() => {
              startAgent(agent2.id);
            }, 200);
            
            createAgent(
              "Agent Dev-01",
              server3.id,
              "Development Server",
              newWorkspace.id
            );
          }, 600);
        }, 500);
      }, 300);
    }, 100);
    
    setName("");
    onClose();
  };

  const handleClose = () => {
    setName("");
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
                <h2 className="text-xl font-semibold text-[#E6EDF3]">
                  Criar Workspace
                </h2>
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
                  <Label htmlFor="workspace-name" className="text-sm font-medium text-[#C4B5FD]">
                    Nome do Workspace
                  </Label>
                  <Input
                    id="workspace-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Ex: Meu Workspace"
                    className="h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#1C2A3F]/50"
                    autoFocus
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

                {/* Actions */}
                <div className="flex items-center gap-3 justify-end">
                  <Button
                    type="button"
                    onClick={handleClose}
                    className="border border-[#1C2A3F] bg-[#0E1625] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
                  >
                    Criar Workspace
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

