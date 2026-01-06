import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Key, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { WorkspaceSettingsModal } from "@/components/dashboard/WorkspaceSettingsModal";
import { UserProfileModal } from "@/components/dashboard/UserProfileModal";
import { ApiTokensModal } from "@/components/dashboard/ApiTokensModal";
import { LanguageThemeModal } from "@/components/dashboard/LanguageThemeModal";

export default function Settings() {
  const { language } = useLanguage();
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [tokensModalOpen, setTokensModalOpen] = useState(false);
  const [languageThemeModalOpen, setLanguageThemeModalOpen] = useState(false);

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
          {t("dashboard.settings.title", language)}
        </h1>
        <p className="text-[#9FB0C7]">
          {t("dashboard.settings.subtitle", language)}
        </p>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workspace Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
              <SettingsIcon className="w-5 h-5 text-[#2EE6D6]" />
            </div>
            <h3 className="text-lg font-semibold text-[#E6EDF3]">Workspace Settings</h3>
          </div>
          <p className="text-sm text-[#9FB0C7] mb-4">Configure workspace name, members, and permissions.</p>
          <button 
            onClick={() => setWorkspaceModalOpen(true)}
            className="text-sm text-[#2EE6D6] hover:text-[#3EF3A4] transition-colors"
          >
            Configure →
          </button>
        </motion.div>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
              <User className="w-5 h-5 text-[#2EE6D6]" />
            </div>
            <h3 className="text-lg font-semibold text-[#E6EDF3]">User Profile</h3>
          </div>
          <p className="text-sm text-[#9FB0C7] mb-4">Manage your personal information and preferences.</p>
          <button 
            onClick={() => setProfileModalOpen(true)}
            className="text-sm text-[#2EE6D6] hover:text-[#3EF3A4] transition-colors"
          >
            Edit Profile →
          </button>
        </motion.div>

        {/* API Tokens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
              <Key className="w-5 h-5 text-[#2EE6D6]" />
            </div>
            <h3 className="text-lg font-semibold text-[#E6EDF3]">API Tokens</h3>
          </div>
          <p className="text-sm text-[#9FB0C7] mb-4">Manage API keys for programmatic access.</p>
          <button 
            onClick={() => setTokensModalOpen(true)}
            className="text-sm text-[#2EE6D6] hover:text-[#3EF3A4] transition-colors"
          >
            Manage Tokens →
          </button>
        </motion.div>

        {/* Language & Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="rounded-xl border border-[#1C2A3F] bg-gradient-to-b from-[#0E1625] to-[#142B4F] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
              <Globe className="w-5 h-5 text-[#2EE6D6]" />
            </div>
            <h3 className="text-lg font-semibold text-[#E6EDF3]">Language & Theme</h3>
          </div>
          <p className="text-sm text-[#9FB0C7] mb-4">Customize interface language and appearance.</p>
          <button 
            onClick={() => setLanguageThemeModalOpen(true)}
            className="text-sm text-[#2EE6D6] hover:text-[#3EF3A4] transition-colors"
          >
            Configure →
          </button>
        </motion.div>
      </div>

      {/* Modals */}
      <WorkspaceSettingsModal
        isOpen={workspaceModalOpen}
        onClose={() => setWorkspaceModalOpen(false)}
      />
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
      <ApiTokensModal
        isOpen={tokensModalOpen}
        onClose={() => setTokensModalOpen(false)}
      />
      <LanguageThemeModal
        isOpen={languageThemeModalOpen}
        onClose={() => setLanguageThemeModalOpen(false)}
      />
    </motion.div>
  );
}

