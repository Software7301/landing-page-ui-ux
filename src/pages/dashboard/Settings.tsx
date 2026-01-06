import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Key, Globe, Save, Briefcase } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspace } from "@/providers/workspace-provider";
import { useTheme } from "@/hooks/useTheme";
import { ApiTokensModal } from "@/components/dashboard/ApiTokensModal";
import { toast } from "sonner";

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const { activeWorkspace, updateWorkspace } = useWorkspace();
  const { theme, themes, setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.name || "");
  const [userName, setUserName] = useState("Max teste");
  const [userEmail, setUserEmail] = useState("max@example.com");
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [tokensModalOpen, setTokensModalOpen] = useState(false);

  useEffect(() => {
    if (activeWorkspace) {
      setWorkspaceName(activeWorkspace.name);
    }
  }, [activeWorkspace]);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const handleLanguageChange = (langCode: "pt" | "en" | "es") => {
    setSelectedLanguage(langCode);
    setLanguage(langCode);
    toast.success(`Language changed to ${languages.find(l => l.code === langCode)?.label}`);
  };

  const handleThemeChange = (themeName: string) => {
    const themeObj = themes.find(t => t.name === themeName);
    if (themeObj) {
      setSelectedTheme(themeObj);
      setTheme(themeName);
      toast.success(`Theme changed to ${themeObj.label}`);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);

    if (activeWorkspace && workspaceName.trim()) {
      updateWorkspace(activeWorkspace.id, { name: workspaceName.trim() });
    }

    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 500);
  };

  const languages = [
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-5xl"
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-[#2EE6D6]" />
          <h1 className="text-3xl font-bold text-[#E6EDF3]">
            {t("dashboard.settings.title", language)}
          </h1>
        </div>
        <p className="text-[#9FB0C7] ml-11">
          {t("dashboard.settings.subtitle", language)}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-8">
        <Card className="bg-[#0B1E36] border-[rgba(46,230,214,0.15)] shadow-xl hover:shadow-2xl hover:shadow-[#2EE6D6]/10 transition-all duration-300">
          <CardHeader className="pb-5 border-b border-[rgba(46,230,214,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#2EE6D6]/10 flex items-center justify-center border border-[rgba(46,230,214,0.15)] shadow-lg shadow-[#2EE6D6]/5">
                <Briefcase className="w-6 h-6 text-[#2EE6D6]" />
              </div>
              <CardTitle className="text-xl font-bold text-[#E6EDF3]">Workspace Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="space-y-2">
              <Label htmlFor="workspace-name" className="text-[#E5E7EB]">
                Nome do Workspace
              </Label>
              <Input
                id="workspace-name"
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="bg-[#142B4F]/30 border-[rgba(46,230,214,0.15)] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[rgba(46,230,214,0.25)] transition-colors"
                placeholder="Nome do workspace"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#E6EDF3]">Membros</Label>
              <div className="rounded-lg border border-[rgba(46,230,214,0.15)] bg-[#142B4F]/30 p-4">
                <p className="text-sm text-[#9FB0C7]">Funcionalidade de membros em breve</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#E6EDF3]">Permissões</Label>
              <div className="rounded-lg border border-[rgba(46,230,214,0.15)] bg-[#142B4F]/30 p-4">
                <p className="text-sm text-[#9FB0C7]">Funcionalidade de permissões em breve</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B1E36] border-[rgba(46,230,214,0.15)] shadow-xl hover:shadow-2xl hover:shadow-[#2EE6D6]/10 transition-all duration-300">
          <CardHeader className="pb-5 border-b border-[rgba(46,230,214,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#2EE6D6]/10 flex items-center justify-center border border-[rgba(46,230,214,0.15)] shadow-lg shadow-[#2EE6D6]/5">
                <User className="w-6 h-6 text-[#2EE6D6]" />
              </div>
              <CardTitle className="text-xl font-bold text-[#E6EDF3]">User Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-name" className="text-[#E6EDF3]">
                  Nome *
                </Label>
                <Input
                  id="user-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-[#142B4F]/30 border-[rgba(46,230,214,0.15)] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[rgba(46,230,214,0.25)] transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email" className="text-[#E6EDF3]">
                  Email *
                </Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="bg-[#142B4F]/30 border-[rgba(46,230,214,0.15)] text-[#E6EDF3] placeholder:text-[#9FB0C7] focus:border-[#2EE6D6] hover:border-[rgba(46,230,214,0.25)] transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B1E36] border-[rgba(46,230,214,0.15)] shadow-xl hover:shadow-2xl hover:shadow-[#2EE6D6]/10 transition-all duration-300">
          <CardHeader className="pb-5 border-b border-[rgba(46,230,214,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#2EE6D6]/10 flex items-center justify-center border border-[rgba(46,230,214,0.15)] shadow-lg shadow-[#2EE6D6]/5">
                <Key className="w-6 h-6 text-[#2EE6D6]" />
              </div>
              <CardTitle className="text-xl font-bold text-[#E6EDF3]">API Tokens</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-lg border border-[rgba(46,230,214,0.15)] bg-[#142B4F]/30 p-4">
              <p className="text-sm text-[#9FB0C7] mb-4">Gerencie suas chaves de API para acesso programático.</p>
              <Button
                variant="outline"
                onClick={() => setTokensModalOpen(true)}
                className="border-[rgba(46,230,214,0.15)] bg-[#0B1E36] text-[#E6EDF3] hover:bg-[#142B4F] hover:border-[rgba(46,230,214,0.25)] transition-colors"
              >
                Gerenciar Tokens
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0B1E36] border-[rgba(46,230,214,0.15)] shadow-xl hover:shadow-2xl hover:shadow-[#2EE6D6]/10 transition-all duration-300">
          <CardHeader className="pb-5 border-b border-[rgba(46,230,214,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#2EE6D6]/10 flex items-center justify-center border border-[rgba(46,230,214,0.15)] shadow-lg shadow-[#2EE6D6]/5">
                <Globe className="w-6 h-6 text-[#2EE6D6]" />
              </div>
              <CardTitle className="text-xl font-bold text-[#E6EDF3]">Language & Theme</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3">
              <Label className="text-[#E6EDF3] font-medium">Idioma</Label>
              <div className="grid grid-cols-3 gap-3">
                {languages.map((lang) => {
                  const langCode = lang.code as "pt" | "en" | "es";
                  const isSelected = selectedLanguage === langCode;
                  return (
                    <Button
                      key={lang.code}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handleLanguageChange(langCode)}
                      className={`transition-all duration-200 ${
                        isSelected
                          ? "bg-[#2EE6D6] text-[#060B14] hover:bg-[#1CB8A8] shadow-lg shadow-[#2EE6D6]/20 font-semibold"
                          : "border-[rgba(46,230,214,0.15)] bg-[#142B4F]/30 text-[#9FB0C7] hover:bg-[#142B4F] hover:border-[rgba(46,230,214,0.25)]"
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[#E6EDF3] font-medium">Tema</Label>
              <div className="grid grid-cols-3 gap-3">
                {themes.map((theme) => {
                  const isSelected = selectedTheme.name === theme.name;
                  const isBlue = theme.name === "blue";
                  return (
                    <Button
                      key={theme.name}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handleThemeChange(theme.name)}
                      className={`transition-all duration-200 ${
                        isSelected
                          ? isBlue
                            ? "bg-[#2EE6D6] text-[#060B14] hover:bg-[#1CB8A8] shadow-lg shadow-[#2EE6D6]/20 font-semibold"
                            : "bg-[#6D28D9] text-[#E5E7EB] hover:bg-[#8B5CF6] shadow-lg shadow-[#6D28D9]/20 font-semibold"
                          : "border-[rgba(46,230,214,0.15)] bg-[#142B4F]/30 text-[#9FB0C7] hover:bg-[#142B4F] hover:border-[rgba(46,230,214,0.25)]"
                      }`}
                    >
                      {theme.emoji && <span className="mr-2">{theme.emoji}</span>}
                      {theme.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          variants={itemVariants}
          className="flex justify-end pt-6"
        >
          <Button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="bg-[#2EE6D6] hover:bg-[#1CB8A8] text-[#060B14] font-semibold px-8 h-12 shadow-lg shadow-[#2EE6D6]/20 hover:shadow-xl hover:shadow-[#2EE6D6]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </motion.div>
      </motion.div>

      <ApiTokensModal
        isOpen={tokensModalOpen}
        onClose={() => setTokensModalOpen(false)}
      />
    </motion.div>
  );
}
