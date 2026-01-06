import { motion } from "framer-motion";
import { CreditCard, TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useWorkspace } from "@/providers/workspace-provider";
import { useServer } from "@/providers/server-provider";
import { useContainer } from "@/providers/container-provider";
import { useDomain } from "@/providers/domain-provider";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";

export default function Billing() {
  const { language } = useLanguage();
  const { activeWorkspace } = useWorkspace();
  const { servers, getServersByWorkspace } = useServer();
  const { containers, getContainersByWorkspace } = useContainer();
  const { domains, getDomainsByWorkspace } = useDomain();

  if (!activeWorkspace) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#E6EDF3]">
          {t("dashboard.billing.selectWorkspace", language)}
        </h2>
      </motion.div>
    );
  }

  const workspaceServers = getServersByWorkspace(activeWorkspace.id);
  const workspaceContainers = getContainersByWorkspace(activeWorkspace.id);
  const workspaceDomains = getDomainsByWorkspace(activeWorkspace.id);

  const serversUsed = workspaceServers.length;
  const containersUsed = workspaceContainers.length;
  const bandwidthUsed = Math.floor(Math.random() * 2000 + 1000); // Mock bandwidth in GB
  const bandwidthLimit = 5000;

  const usagePercentage = Math.min(100, (serversUsed / 100) * 100);

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
      >
        <h1 className="text-3xl font-bold text-[#E6EDF3] mb-2">
          {t("dashboard.billing.title", language)}
        </h1>
        <p className="text-[#9FB0C7]">
          {t("dashboard.billing.subtitle", language)}
        </p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#E6EDF3] mb-2">
              {t("dashboard.billing.planName", language)}
            </h2>
            <p className="text-3xl font-bold text-[#E6EDF3]">
              {t("dashboard.billing.price", language)}
              <span className="text-lg text-[#9FB0C7]">{t("dashboard.billing.period", language)}</span>
            </p>
          </div>
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
            <CreditCard className="w-8 h-8 text-[#2EE6D6]" />
          </div>
        </div>
          <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#9FB0C7]">{t("dashboard.billing.currentUsage", language)}:</span>
            <span className="text-[#E6EDF3]">{usagePercentage.toFixed(0)}% {t("dashboard.billing.ofLimit", language)}</span>
          </div>
          <div className="w-full bg-[#0E1625] rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usagePercentage}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] h-2 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Usage Limits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6">
          <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">
            {t("dashboard.billing.usageLimits", language)}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9FB0C7]">{t("dashboard.billing.workspaces", language)}</span>
              <span className="text-sm text-[#E6EDF3]">{t("dashboard.billing.unlimited", language)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9FB0C7]">{t("dashboard.billing.servers", language)}</span>
              <span className="text-sm text-[#E6EDF3]">{serversUsed} / 100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9FB0C7]">{t("dashboard.billing.containers", language)}</span>
              <span className="text-sm text-[#E6EDF3]">{containersUsed} / 1000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9FB0C7]">{t("dashboard.billing.domains", language)}</span>
              <span className="text-sm text-[#E6EDF3]">{workspaceDomains.length} / {t("dashboard.billing.unlimited", language)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9FB0C7]">{t("dashboard.billing.bandwidth", language)}</span>
              <span className="text-sm text-[#E6EDF3]">{(bandwidthUsed / 1000).toFixed(1)}TB / {(bandwidthLimit / 1000).toFixed(0)}TB</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6">
          <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">
            {t("dashboard.billing.actions", language)}
          </h3>
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t("dashboard.billing.upgradePlan", language)}
            </Button>
            <Button variant="outline" className="w-full border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50">
              {t("dashboard.billing.manageSubscription", language)}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

