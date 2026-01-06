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
    domains, 
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
        <h2 className="text-2xl font-bold text-[#E6EDF3]">
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
          <h1 className="text-3xl font-bold text-[#E6EDF3] mb-2">
            {t("dashboard.domains.title", language)}
          </h1>
          <p className="text-[#9FB0C7]">
            {t("dashboard.domains.subtitle", language)}
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
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
              className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6 hover:border-[#2EE6D6]/30 hover:shadow-[0_0_20px_rgba(46,230,214,0.1)] transition-all duration-300 group relative"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                    <Globe className="w-6 h-6 text-[#2EE6D6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#E6EDF3] group-hover:text-[#2EE6D6] transition-colors">
                      {domain.domain}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {domain.sslStatus === "active" ? (
                    <Lock className="w-5 h-5 text-[#3EF3A4]" />
                  ) : domain.sslStatus === "pending" ? (
                    <Lock className="w-5 h-5 text-[#F5C77A]" />
                  ) : (
                    <Lock className="w-5 h-5 text-[#F26D6D]" />
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-[#142B4F] border-[#1C2A3F] w-48"
                    >
                      {(domain.sslStatus === "expired" || domain.sslStatus === "pending") && (
                        <DropdownMenuItem 
                          onClick={() => handleRenewSSL(domain)}
                          className="text-[#E6EDF3] hover:bg-[#0E1625] cursor-pointer"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Renovar SSL
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(domain)}
                        className="text-[#F26D6D] hover:bg-[#0E1625] cursor-pointer"
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
                  <span className="text-[#9FB0C7]">SSL Status:</span>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm",
                      domain.sslStatus === "active"
                        ? "bg-[#3EF3A4]/20 text-[#3EF3A4] border border-[#3EF3A4]/30"
                        : domain.sslStatus === "pending"
                        ? "bg-[#F5C77A]/20 text-[#F5C77A] border border-[#F5C77A]/30"
                        : "bg-[#F26D6D]/20 text-[#F26D6D] border border-[#F26D6D]/30"
                    )}
                  >
                    {domain.sslStatus === "active"
                      ? "Active"
                      : domain.sslStatus === "pending"
                      ? "Pending"
                      : "Expired"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9FB0C7] flex items-center gap-1">
                    <Link2 className="w-4 h-4" />
                    Container:
                  </span>
                  <span className="text-[#E6EDF3]">{domain.containerName}</span>
                </div>
                <div className="text-sm">
                  <span className="text-[#9FB0C7]">DNS: </span>
                  <span className="text-[#E6EDF3] font-mono text-xs">{getDnsDisplay(domain)}</span>
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
          className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-12 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center mx-auto mb-4 border border-[#2EE6D6]/20">
              <Globe className="w-8 h-8 text-[#2EE6D6]" />
            </div>
            <h3 className="text-xl font-semibold text-[#E6EDF3] mb-2">
              Nenhum domínio encontrado
            </h3>
            <p className="text-[#9FB0C7] mb-6">
              Adicione seu primeiro domínio para começar a gerenciar SSL e DNS.
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
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
        <AlertDialogContent className="bg-[#0B1E36] border-[#1C2A3F]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#E6EDF3]">
              Remover Domínio
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#9FB0C7]">
              Tem certeza que deseja remover o domínio "{domainToDelete?.domain}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#1C2A3F]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-[#F26D6D] text-white hover:bg-[#F26D6D]/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

