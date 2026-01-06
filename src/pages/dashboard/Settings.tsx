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
      className="space-y-6 max-w-4xl"
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-[#6D28D9]" />
          <h1 className="text-3xl font-bold text-[#E5E7EB]">
            {t("dashboard.settings.title", language)}
          </h1>
        </div>
        <p className="text-[#9CA3AF] ml-11">
          {t("dashboard.settings.subtitle", language)}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
        <Card className="bg-[#141C2C] border-[rgba(109,40,217,0.15)] shadow-sm">
          <CardHeader className="pb-4 border-b border-[rgba(109,40,217,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#6D28D9]/10 flex items-center justify-center border border-[rgba(109,40,217,0.15)]">
                <Briefcase className="w-5 h-5 text-[#6D28D9]" />
              </div>
              <CardTitle className="text-xl text-[#E5E7EB]">Workspace Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="workspace-name" className="text-[#E5E7EB]">
                Nome do Workspace
              </Label>
              <Input
                id="workspace-name"
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="bg-[#0B0F17] border-[rgba(109,40,217,0.15)] text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#6D28D9]"
                placeholder="Nome do workspace"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#E5E7EB]">Membros</Label>
              <div className="rounded-lg border border-[rgba(109,40,217,0.15)] bg-[#0B0F17] p-4">
                <p className="text-sm text-[#9CA3AF]">Funcionalidade de membros em breve</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#E5E7EB]">Permissões</Label>
              <div className="rounded-lg border border-[rgba(109,40,217,0.15)] bg-[#0B0F17] p-4">
                <p className="text-sm text-[#9CA3AF]">Funcionalidade de permissões em breve</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141C2C] border-[rgba(109,40,217,0.15)] shadow-sm">
          <CardHeader className="pb-4 border-b border-[rgba(109,40,217,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#6D28D9]/10 flex items-center justify-center border border-[rgba(109,40,217,0.15)]">
                <User className="w-5 h-5 text-[#6D28D9]" />
              </div>
              <CardTitle className="text-xl text-[#E5E7EB]">User Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-name" className="text-[#E5E7EB]">
                  Nome *
                </Label>
                <Input
                  id="user-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-[#0B0F17] border-[rgba(109,40,217,0.15)] text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#6D28D9]"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email" className="text-[#E5E7EB]">
                  Email *
                </Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="bg-[#0B0F17] border-[rgba(109,40,217,0.15)] text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#6D28D9]"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141C2C] border-[rgba(109,40,217,0.15)] shadow-sm">
          <CardHeader className="pb-4 border-b border-[rgba(109,40,217,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#6D28D9]/10 flex items-center justify-center border border-[rgba(109,40,217,0.15)]">
                <Key className="w-5 h-5 text-[#6D28D9]" />
              </div>
              <CardTitle className="text-xl text-[#E5E7EB]">API Tokens</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-lg border border-[rgba(109,40,217,0.15)] bg-[#0B0F17] p-4">
              <p className="text-sm text-[#9CA3AF] mb-4">Gerencie suas chaves de API para acesso programático.</p>
              <Button
                variant="outline"
                onClick={() => setTokensModalOpen(true)}
                className="border-[rgba(109,40,217,0.15)] bg-[#141C2C] text-[#E5E7EB] hover:bg-[#1A2435] hover:border-[rgba(109,40,217,0.25)]"
              >
                Gerenciar Tokens
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#141C2C] border-[rgba(109,40,217,0.15)] shadow-sm">
          <CardHeader className="pb-4 border-b border-[rgba(109,40,217,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#6D28D9]/10 flex items-center justify-center border border-[rgba(109,40,217,0.15)]">
                <Globe className="w-5 h-5 text-[#6D28D9]" />
              </div>
              <CardTitle className="text-xl text-[#E5E7EB]">Language & Theme</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3">
              <Label className="text-[#E5E7EB]">Idioma</Label>
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
                          ? "bg-[#6D28D9] text-[#E5E7EB] hover:bg-[#8B5CF6] shadow-lg shadow-[#6D28D9]/20"
                          : "border-[rgba(109,40,217,0.15)] bg-[#0B0F17] text-[#9CA3AF] hover:bg-[#141C2C] hover:border-[rgba(109,40,217,0.25)]"
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
              <Label className="text-[#E5E7EB]">Tema</Label>
              <div className="grid grid-cols-3 gap-3">
                {themes.map((theme) => {
                  const isSelected = selectedTheme.name === theme.name;
                  return (
                    <Button
                      key={theme.name}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handleThemeChange(theme.name)}
                      className={`transition-all duration-200 ${
                        isSelected
                          ? "bg-[#6D28D9] text-[#E5E7EB] hover:bg-[#8B5CF6] shadow-lg shadow-[#6D28D9]/20"
                          : "border-[rgba(109,40,217,0.15)] bg-[#0B0F17] text-[#9CA3AF] hover:bg-[#141C2C] hover:border-[rgba(109,40,217,0.25)]"
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
          className="flex justify-end pt-4"
        >
          <Button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="bg-[#6D28D9] hover:bg-[#8B5CF6] text-[#E5E7EB] font-semibold px-8 h-12 shadow-lg shadow-[#6D28D9]/20 hover:shadow-xl hover:shadow-[#6D28D9]/30 transition-all duration-300"
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
