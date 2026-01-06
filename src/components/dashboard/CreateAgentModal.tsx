import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAgent } from "@/providers/agent-provider";
import { useServer } from "@/providers/server-provider";
import { useWorkspace } from "@/providers/workspace-provider";
import { toast } from "sonner";
import { modalVariants, backdropVariants } from "@/lib/motion";

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAgentModal({ isOpen, onClose }: CreateAgentModalProps) {
  const { createAgent, startAgent } = useAgent();
  const { servers, getServersByWorkspace } = useServer();
  const { activeWorkspace } = useWorkspace();
  const [agentName, setAgentName] = useState("");
  const [selectedServerId, setSelectedServerId] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const workspaceServers = activeWorkspace
    ? getServersByWorkspace(activeWorkspace.id)
    : [];

  useEffect(() => {
    if (workspaceServers.length > 0 && !selectedServerId) {
      setSelectedServerId(workspaceServers[0].id);
    }
  }, [workspaceServers, selectedServerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!activeWorkspace) {
      setError("No workspace selected");
      return;
    }

    if (!agentName.trim()) {
      setError("Agent name is required");
      return;
    }

    if (agentName.trim().length < 3) {
      setError("Agent name must be at least 3 characters");
      return;
    }

    if (!selectedServerId) {
      setError("Please select a server");
      return;
    }

    if (workspaceServers.length === 0) {
      setError("No servers available. Please create a server first.");
      return;
    }

    setIsCreating(true);

    try {
      const selectedServer = workspaceServers.find(s => s.id === selectedServerId);
      if (!selectedServer) {
        throw new Error("Server not found");
      }

      const newAgent = createAgent(
        agentName.trim(),
        selectedServer.id,
        selectedServer.name,
        activeWorkspace.id
      );

      startAgent(newAgent.id);

      toast.success("Agent created successfully!");
      
      setTimeout(() => {
        setIsCreating(false);
        setAgentName("");
        setSelectedServerId(workspaceServers[0]?.id || "");
        onClose();
      }, 300);
    } catch (err) {
      setIsCreating(false);
      toast.error("Failed to create agent");
      setError("Failed to create agent");
    }
  };

  const handleClose = () => {
    setAgentName("");
    setSelectedServerId("");
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
              className="w-full max-w-md bg-[#141C2C] border border-[rgba(109,40,217,0.15)] rounded-xl shadow-2xl pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-[rgba(109,40,217,0.15)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#6D28D9]/10 flex items-center justify-center border border-[rgba(109,40,217,0.15)]">
                    <Bot className="w-5 h-5 text-[#6D28D9]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#E5E7EB]">Create Agent</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#0B0F17] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="agent-name" className="text-sm font-medium text-[#E5E7EB]">
                    Agent Name
                  </Label>
                  <Input
                    id="agent-name"
                    type="text"
                    value={agentName}
                    onChange={(e) => {
                      setAgentName(e.target.value);
                      setError("");
                    }}
                    className="h-11 bg-[#0B0F17] border-[rgba(109,40,217,0.15)] text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#6D28D9] hover:border-[rgba(109,40,217,0.25)]"
                    placeholder="My Agent"
                    disabled={isCreating}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="server" className="text-sm font-medium text-[#E5E7EB]">
                    Server
                  </Label>
                  {workspaceServers.length === 0 ? (
                    <div className="rounded-lg border border-[rgba(109,40,217,0.15)] bg-[#0B0F17] p-4">
                      <p className="text-sm text-[#9CA3AF]">
                        No servers available. Please create a server first.
                      </p>
                    </div>
                  ) : (
                    <select
                      id="server"
                      value={selectedServerId}
                      onChange={(e) => {
                        setSelectedServerId(e.target.value);
                        setError("");
                      }}
                      className="w-full h-11 rounded-lg border border-[rgba(109,40,217,0.15)] bg-[#0B0F17] px-4 text-[#E5E7EB] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isCreating}
                    >
                      {workspaceServers.map((server) => (
                        <option key={server.id} value={server.id}>
                          {server.name} ({server.region})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#F87171]"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex items-center gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    onClick={handleClose}
                    disabled={isCreating}
                    variant="outline"
                    className="border-[rgba(109,40,217,0.15)] bg-[#0B0F17] text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#141C2C] disabled:opacity-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating || workspaceServers.length === 0}
                    className="bg-[#6D28D9] hover:bg-[#8B5CF6] text-[#E5E7EB] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? "Creating..." : "Create Agent"}
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

