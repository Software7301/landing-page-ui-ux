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
import { useThemeColors } from "@/lib/theme-colors";
import { ApiTokensModal } from "@/components/dashboard/ApiTokensModal";
import { toast } from "sonner";

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const { activeWorkspace, updateWorkspace } = useWorkspace();
  const { theme, themes, setTheme } = useTheme();
  const colors = useThemeColors();
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
          <SettingsIcon className="w-8 h-8 transition-colors duration-300" style={{ color: colors.primary }} />
          <h1 className="text-3xl font-bold transition-colors duration-300" style={{ color: colors.textPrimary }}>
            {t("dashboard.settings.title", language)}
          </h1>
        </div>
        <p className="ml-11 transition-colors duration-300" style={{ color: colors.textSecondary }}>
          {t("dashboard.settings.subtitle", language)}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-8">
        <Card 
          className="shadow-xl hover:shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
            boxShadow: `0 10px 15px ${colors.primary}10`,
          }}
        >
          <CardHeader 
            className="pb-5 border-b transition-colors duration-300"
            style={{ borderColor: colors.cardBorder }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center border shadow-lg transition-colors duration-300"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  borderColor: colors.cardBorder,
                  boxShadow: `0 4px 6px ${colors.primary}10`,
                }}
              >
                <Briefcase className="w-6 h-6 transition-colors duration-300" style={{ color: colors.primary }} />
              </div>
              <CardTitle className="text-xl font-bold transition-colors duration-300" style={{ color: colors.textPrimary }}>
                Workspace Settings
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="space-y-2">
              <Label htmlFor="workspace-name" className="transition-colors duration-300" style={{ color: colors.textPrimary }}>
                Nome do Workspace
              </Label>
              <Input
                id="workspace-name"
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="transition-colors duration-300"
                style={{
                  backgroundColor: colors.inputBg,
                  borderColor: colors.inputBorder,
                  color: colors.textPrimary,
                }}
                placeholder="Nome do workspace"
              />
            </div>
            <div className="space-y-2">
              <Label className="transition-colors duration-300" style={{ color: colors.textPrimary }}>Membros</Label>
              <div 
                className="rounded-lg border p-4 transition-colors duration-300"
                style={{
                  borderColor: colors.cardBorder,
                  backgroundColor: colors.inputBg,
                }}
              >
                <p className="text-sm transition-colors duration-300" style={{ color: colors.textSecondary }}>
                  Funcionalidade de membros em breve
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="transition-colors duration-300" style={{ color: colors.textPrimary }}>Permissões</Label>
              <div 
                className="rounded-lg border p-4 transition-colors duration-300"
                style={{
                  borderColor: colors.cardBorder,
                  backgroundColor: colors.inputBg,
                }}
              >
                <p className="text-sm transition-colors duration-300" style={{ color: colors.textSecondary }}>
                  Funcionalidade de permissões em breve
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="shadow-xl hover:shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
            boxShadow: `0 10px 15px ${colors.primary}10`,
          }}
        >
          <CardHeader 
            className="pb-5 border-b transition-colors duration-300"
            style={{ borderColor: colors.cardBorder }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center border shadow-lg transition-colors duration-300"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  borderColor: colors.cardBorder,
                  boxShadow: `0 4px 6px ${colors.primary}10`,
                }}
              >
                <User className="w-6 h-6 transition-colors duration-300" style={{ color: colors.primary }} />
              </div>
              <CardTitle className="text-xl font-bold transition-colors duration-300" style={{ color: colors.textPrimary }}>
                User Profile
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-name" className="transition-colors duration-300" style={{ color: colors.textPrimary }}>
                  Nome *
                </Label>
                <Input
                  id="user-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="transition-colors duration-300"
                  style={{
                    backgroundColor: colors.inputBg,
                    borderColor: colors.inputBorder,
                    color: colors.textPrimary,
                  }}
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email" className="transition-colors duration-300" style={{ color: colors.textPrimary }}>
                  Email *
                </Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="transition-colors duration-300"
                  style={{
                    backgroundColor: colors.inputBg,
                    borderColor: colors.inputBorder,
                    color: colors.textPrimary,
                  }}
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="shadow-xl hover:shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
            boxShadow: `0 10px 15px ${colors.primary}10`,
          }}
        >
          <CardHeader 
            className="pb-5 border-b transition-colors duration-300"
            style={{ borderColor: colors.cardBorder }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center border shadow-lg transition-colors duration-300"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  borderColor: colors.cardBorder,
                  boxShadow: `0 4px 6px ${colors.primary}10`,
                }}
              >
                <Key className="w-6 h-6 transition-colors duration-300" style={{ color: colors.primary }} />
              </div>
              <CardTitle className="text-xl font-bold transition-colors duration-300" style={{ color: colors.textPrimary }}>
                API Tokens
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div 
              className="rounded-lg border p-4 transition-colors duration-300"
              style={{
                borderColor: colors.cardBorder,
                backgroundColor: colors.inputBg,
              }}
            >
              <p className="text-sm mb-4 transition-colors duration-300" style={{ color: colors.textSecondary }}>
                Gerencie suas chaves de API para acesso programático.
              </p>
              <Button
                variant="outline"
                onClick={() => setTokensModalOpen(true)}
                className="transition-colors duration-300"
                style={{
                  borderColor: colors.cardBorder,
                  backgroundColor: colors.cardBg,
                  color: colors.textPrimary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.inputBg;
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.cardBg;
                  e.currentTarget.style.borderColor = colors.cardBorder;
                }}
              >
                Gerenciar Tokens
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="shadow-xl hover:shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
            boxShadow: `0 10px 15px ${colors.primary}10`,
          }}
        >
          <CardHeader 
            className="pb-5 border-b transition-colors duration-300"
            style={{ borderColor: colors.cardBorder }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center border shadow-lg transition-colors duration-300"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  borderColor: colors.cardBorder,
                  boxShadow: `0 4px 6px ${colors.primary}10`,
                }}
              >
                <Globe className="w-6 h-6 transition-colors duration-300" style={{ color: colors.primary }} />
              </div>
              <CardTitle className="text-xl font-bold transition-colors duration-300" style={{ color: colors.textPrimary }}>
                Language & Theme
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3">
              <Label className="font-medium transition-colors duration-300" style={{ color: colors.textPrimary }}>Idioma</Label>
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
                      className="transition-all duration-200 font-semibold"
                      style={isSelected ? {
                        backgroundColor: colors.primary,
                        color: colors.primaryForeground,
                        boxShadow: `0 4px 6px ${colors.primary}30`,
                      } : {
                        borderColor: colors.cardBorder,
                        backgroundColor: colors.inputBg,
                        color: colors.textSecondary,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = colors.cardBg;
                          e.currentTarget.style.borderColor = colors.primary;
                        } else {
                          e.currentTarget.style.backgroundColor = colors.primaryHover;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = colors.inputBg;
                          e.currentTarget.style.borderColor = colors.cardBorder;
                        } else {
                          e.currentTarget.style.backgroundColor = colors.primary;
                        }
                      }}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-medium transition-colors duration-300" style={{ color: colors.textPrimary }}>Tema</Label>
              <div className="grid grid-cols-3 gap-3">
                {themes.map((themeItem) => {
                  const isSelected = selectedTheme.name === themeItem.name;
                  return (
                    <Button
                      key={themeItem.name}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handleThemeChange(themeItem.name)}
                      className="transition-all duration-200 font-semibold"
                      style={isSelected ? {
                        backgroundColor: colors.primary,
                        color: colors.primaryForeground,
                        boxShadow: `0 4px 6px ${colors.primary}30`,
                      } : {
                        borderColor: colors.cardBorder,
                        backgroundColor: colors.inputBg,
                        color: colors.textSecondary,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = colors.cardBg;
                          e.currentTarget.style.borderColor = colors.primary;
                        } else {
                          e.currentTarget.style.backgroundColor = colors.primaryHover;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = colors.inputBg;
                          e.currentTarget.style.borderColor = colors.cardBorder;
                        } else {
                          e.currentTarget.style.backgroundColor = colors.primary;
                        }
                      }}
                    >
                      {themeItem.emoji && <span className="mr-2">{themeItem.emoji}</span>}
                      {themeItem.label}
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
            className="font-semibold px-8 h-12 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: colors.primary,
              color: colors.primaryForeground,
              boxShadow: `0 4px 6px ${colors.primary}30`,
            }}
            onMouseEnter={(e) => {
              if (!isSaving) {
                e.currentTarget.style.backgroundColor = colors.primaryHover;
                e.currentTarget.style.boxShadow = `0 6px 8px ${colors.primary}40`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSaving) {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.boxShadow = `0 4px 6px ${colors.primary}30`;
              }
            }}
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
