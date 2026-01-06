import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Lock, Link2, Plus, RefreshCw, Trash2, MoreVertical } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useWorkspace } from "@/providers/workspace-provider";
import { useDomain, type Domain as DomainType } from "@/providers/domain-provider";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreateDomainModal } from "@/components/dashboard/CreateDomainModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function Domains() {
  const { language } = useLanguage();
  const { activeWorkspace } = useWorkspace();
  const { 
    getDomainsByWorkspace, 
    deleteDomain, 
    renewSSL 
  } = useDomain();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [domainToDelete, setDomainToDelete] = useState<DomainType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const workspaceDomains = activeWorkspace 
    ? getDomainsByWorkspace(activeWorkspace.id)
    : [];

  const handleRenewSSL = (domain: DomainType) => {
    renewSSL(domain.id);
  };

  const handleDeleteClick = (domain: DomainType) => {
    setDomainToDelete(domain);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (domainToDelete) {
      deleteDomain(domainToDelete.id);
      setDomainToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const getDnsDisplay = (domain: DomainType) => {
    return `${domain.dnsType} record → ${domain.dnsValue}`;
  };

  if (!activeWorkspace) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
      >
        <h2 className="text-2xl font-bold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
          Selecione um workspace para gerenciar domínios
        </h2>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
            {t("dashboard.domains.title", language)}
          </h1>
          <p className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
            {t("dashboard.domains.subtitle", language)}
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="transition-all duration-300 font-semibold"
          style={{
            background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
            color: "var(--color-primary-foreground)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 20px var(--color-primary)50`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("dashboard.domains.add", language)}
        </Button>
      </motion.div>

      {/* Domains List */}
      {workspaceDomains.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {workspaceDomains.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              className="rounded-xl border p-6 transition-all duration-300 group relative"
              style={{
                borderColor: "var(--color-border)",
                background: `linear-gradient(to bottom, var(--color-input-bg), var(--color-card))`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)50";
                e.currentTarget.style.boxShadow = `0 0 20px var(--color-primary)20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center border transition-colors duration-300"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary)20, var(--color-accent)10)`,
                      borderColor: "var(--color-primary)30",
                    }}
                  >
                    <Globe className="w-6 h-6 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <h3 
                      className="text-lg font-semibold transition-colors duration-300"
                      style={{ color: "var(--color-text)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-text)";
                      }}
                    >
                      {domain.domain}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Lock 
                    className="w-5 h-5 transition-colors duration-300"
                    style={{
                      color: domain.sslStatus === "active" ? "var(--color-success)" :
                             domain.sslStatus === "pending" ? "var(--color-warning)" :
                             "var(--color-error)"
                    }}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 transition-colors duration-300"
                        style={{
                          color: "var(--color-text-secondary)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--color-text)";
                          e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--color-text-secondary)";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 transition-colors duration-300"
                      style={{
                        backgroundColor: "var(--color-card)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      {(domain.sslStatus === "expired" || domain.sslStatus === "pending") && (
                        <DropdownMenuItem 
                          onClick={() => handleRenewSSL(domain)}
                          className="cursor-pointer transition-colors duration-300"
                          style={{ color: "var(--color-text)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Renovar SSL
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(domain)}
                        className="cursor-pointer transition-colors duration-300"
                        style={{ color: "var(--color-error)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--color-error)10";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    SSL Status:
                  </span>
                  <span
                    className="px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm border transition-colors duration-300"
                    style={domain.sslStatus === "active" ? {
                      backgroundColor: "var(--color-success)20",
                      color: "var(--color-success)",
                      borderColor: "var(--color-success)30",
                    } : domain.sslStatus === "pending" ? {
                      backgroundColor: "var(--color-warning)20",
                      color: "var(--color-warning)",
                      borderColor: "var(--color-warning)30",
                    } : {
                      backgroundColor: "var(--color-error)20",
                      color: "var(--color-error)",
                      borderColor: "var(--color-error)30",
                    }}
                  >
                    {domain.sslStatus === "active"
                      ? "Active"
                      : domain.sslStatus === "pending"
                      ? "Pending"
                      : "Expired"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    <Link2 className="w-4 h-4" />
                    Container:
                  </span>
                  <span className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                    {domain.containerName}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                    DNS: 
                  </span>
                  <span className="font-mono text-xs transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                    {getDnsDisplay(domain)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border p-12 text-center transition-colors duration-300"
          style={{
            borderColor: "var(--color-border)",
            background: `linear-gradient(to bottom, var(--color-input-bg), var(--color-card))`,
          }}
        >
          <div className="max-w-md mx-auto">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border transition-colors duration-300"
              style={{
                background: `linear-gradient(135deg, var(--color-primary)20, var(--color-accent)10)`,
                borderColor: "var(--color-primary)30",
              }}
            >
              <Globe className="w-8 h-8 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
            </div>
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
              Nenhum domínio encontrado
            </h3>
            <p className="mb-6 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
              Adicione seu primeiro domínio para começar a gerenciar SSL e DNS.
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="transition-all duration-300 font-semibold"
              style={{
                background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                color: "var(--color-primary-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px var(--color-primary)50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Domínio
            </Button>
          </div>
        </motion.div>
      )}

      {/* Modals and Dialogs */}
      <CreateDomainModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent 
          className="transition-colors duration-300"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
              Remover Domínio
            </AlertDialogTitle>
            <AlertDialogDescription className="transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
              Tem certeza que deseja remover o domínio "{domainToDelete?.domain}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
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
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-error)",
                color: "var(--color-error-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-error)90";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-error)";
              }}
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

