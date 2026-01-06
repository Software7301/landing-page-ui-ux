import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiToken {
  id: string;
  name: string;
  token: string;
  createdAt: Date;
  lastUsed?: Date;
}

interface ApiTokensModalProps {
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

export function ApiTokensModal({ isOpen, onClose }: ApiTokensModalProps) {
  const [tokens, setTokens] = useState<ApiToken[]>(() => {
    const stored = localStorage.getItem('apiTokens');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          lastUsed: t.lastUsed ? new Date(t.lastUsed) : undefined,
        }));
      } catch {
        return [];
      }
    }
    return [];
  });
  const [isCreating, setIsCreating] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [newToken, setNewToken] = useState<string | null>(null);
  const [visibleTokens, setVisibleTokens] = useState<Set<string>>(new Set());

  const generateToken = () => {
    return `corsihub_${Math.random().toString(36).substr(2, 9)}_${Date.now().toString(36)}`;
  };

  const handleCreateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenName.trim()) return;

    const token = generateToken();
    const newTokenObj: ApiToken = {
      id: `token-${Date.now()}`,
      name: tokenName.trim(),
      token,
      createdAt: new Date(),
    };

    const updatedTokens = [...tokens, newTokenObj];
    setTokens(updatedTokens);
    setNewToken(token);
    setTokenName("");
    setIsCreating(false);
    
    localStorage.setItem('apiTokens', JSON.stringify(updatedTokens));
  };

  const handleDeleteToken = (id: string) => {
    setTokens(prev => {
      const updated = prev.filter(t => t.id !== id);
      localStorage.setItem('apiTokens', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
  };

  const toggleTokenVisibility = (id: string) => {
    setVisibleTokens(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const maskToken = (token: string) => {
    return token.substring(0, 12) + '...' + token.substring(token.length - 8);
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0B1E36] border border-[#1C2A3F] rounded-xl shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#1C2A3F] sticky top-0 bg-[#0B1E36] z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                    <Key className="w-5 h-5 text-[#2EE6D6]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#E6EDF3]">API Tokens</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* New Token Form */}
                {isCreating ? (
                  <form onSubmit={handleCreateToken} className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="token-name" className="text-sm font-medium text-[#C4B5FD]">
                        Nome do Token
                      </Label>
                      <Input
                        id="token-name"
                        type="text"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                        placeholder="Ex: Production API"
                        className="h-11 bg-[#0E1625] border-[#1C2A3F] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[#1C2A3F]/50"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={() => {
                          setIsCreating(false);
                          setTokenName("");
                        }}
                        variant="outline"
                        className="flex-1 border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
                      >
                        Criar Token
                      </Button>
                    </div>
                  </form>
                ) : (
                  <Button
                    onClick={() => setIsCreating(true)}
                    className="w-full bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Novo Token
                  </Button>
                )}

                {/* New Token Display */}
                {newToken && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border p-4 space-y-3 transition-colors duration-300"
                    style={{
                      borderColor: "var(--color-success)50",
                      backgroundColor: "var(--color-success)10",
                    }}
                  >
                    <p className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--color-success)" }}>
                      Token criado com sucesso! Copie agora, pois não será exibido novamente.
                    </p>
                    <div className="flex items-center gap-2">
                      <code 
                        className="flex-1 px-3 py-2 border rounded text-sm font-mono transition-colors duration-300"
                        style={{
                          backgroundColor: "var(--color-input-bg)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text)",
                        }}
                      >
                        {newToken}
                      </code>
                      <Button
                        onClick={() => handleCopyToken(newToken)}
                        variant="outline"
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
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Tokens List */}
                {tokens.length > 0 ? (
                  <div className="space-y-3">
                    {tokens.map((token) => (
                      <div
                        key={token.id}
                        className="rounded-lg border border-[#1C2A3F] bg-[#0E1625] p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-sm font-semibold text-[#E6EDF3]">{token.name}</h4>
                            <p className="text-xs text-[#9FB0C7]">
                              Criado em {new Date(token.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            onClick={() => handleDeleteToken(token.id)}
                            variant="ghost"
                            className="h-8 w-8 p-0 text-[#F26D6D] hover:text-[#F26D6D] hover:bg-[#F26D6D]/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 px-3 py-2 bg-[#060B14] border border-[#1C2A3F] rounded text-sm text-[#E6EDF3] font-mono">
                            {visibleTokens.has(token.id) ? token.token : maskToken(token.token)}
                          </code>
                          <Button
                            onClick={() => toggleTokenVisibility(token.id)}
                            variant="outline"
                            className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50"
                          >
                            {visibleTokens.has(token.id) ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            onClick={() => handleCopyToken(token.token)}
                            variant="outline"
                            className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#9FB0C7]">
                    <p>Nenhum token criado ainda</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

