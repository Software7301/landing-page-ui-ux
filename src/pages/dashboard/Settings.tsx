import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Key, Globe, Save, Briefcase, Users, Shield } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspace } from "@/providers/workspace-provider";
import { useUser } from "@/providers/user-provider";
import { useTheme } from "@/hooks/useTheme";
import { ApiTokensModal } from "@/components/dashboard/ApiTokensModal";
import { toast } from "sonner";

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const { activeWorkspace, updateWorkspace } = useWorkspace();
  const { user, updateUser } = useUser();
  const { theme, themes, setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.name || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [tokensModalOpen, setTokensModalOpen] = useState(false);

  useEffect(() => {
    if (activeWorkspace) {
      setWorkspaceName(activeWorkspace.name);
    }
  }, [activeWorkspace]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserEmail(user.email);
    }
  }, [user]);

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

    if (firstName.trim() && lastName.trim() && userEmail.trim()) {
      updateUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: userEmail.trim(),
      });
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
          <SettingsIcon className="w-8 h-8 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
          <h1 className="text-3xl font-bold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
            {t("dashboard.settings.title", language)}
          </h1>
        </div>
        <p className="ml-11 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
          {t("dashboard.settings.subtitle", language)}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
        <Card 
          className="transition-all duration-300"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <CardHeader 
            className="pb-5 border-b transition-colors duration-300"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center border transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-primary)10",
                  borderColor: "var(--color-border)",
                }}
              >
                <Briefcase className="w-6 h-6 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
              </div>
              <CardTitle className="text-xl font-bold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                Workspace Settings
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="workspace-name" className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                Nome do Workspace
              </Label>
              <Input
                id="workspace-name"
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-input-bg)",
                  borderColor: "var(--color-input-border)",
                  color: "var(--color-text)",
                }}
                placeholder="Nome do workspace"
              />
            </div>
            <div className="space-y-2">
              <Label className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>Membros</Label>
              <div 
                className="rounded-lg border p-6 transition-colors duration-300"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-input-bg)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: "var(--color-primary)10",
                    }}
                  >
                    <Users className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                      Convide membros para colaborar neste workspace
                    </p>
                    <p className="text-xs transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                      Em breve você poderá gerenciar permissões e acessos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>Permissões</Label>
              <div 
                className="rounded-lg border p-6 transition-colors duration-300"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-input-bg)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: "var(--color-primary)10",
                    }}
                  >
                    <Shield className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1 transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                      Controle de permissões e acessos
                    </p>
                    <p className="text-xs transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                      Em breve você poderá definir permissões detalhadas para cada membro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <CardHeader 
            className="pb-5 border-b transition-colors duration-300"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center border transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-primary)10",
                  borderColor: "var(--color-border)",
                }}
              >
                <User className="w-6 h-6 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
              </div>
              <CardTitle className="text-xl font-bold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                User Profile
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                  Nome *
                </Label>
                <Input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--color-input-bg)",
                    borderColor: "var(--color-input-border)",
                    color: "var(--color-text)",
                  }}
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                  Sobrenome *
                </Label>
                <Input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--color-input-bg)",
                    borderColor: "var(--color-input-border)",
                    color: "var(--color-text)",
                  }}
                  placeholder="Seu sobrenome"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email" className="transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                Email *
              </Label>
              <Input
                id="user-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-input-bg)",
                  borderColor: "var(--color-input-border)",
                  color: "var(--color-text)",
                }}
                placeholder="seu@email.com"
              />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <CardHeader 
            className="pb-5 border-b transition-colors duration-300"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center border transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-primary)10",
                  borderColor: "var(--color-border)",
                }}
              >
                <Key className="w-6 h-6 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
              </div>
              <CardTitle className="text-xl font-bold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                API Tokens
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div 
              className="rounded-lg border p-4 transition-colors duration-300"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-input-bg)",
              }}
            >
              <p className="text-sm mb-4 transition-colors duration-300" style={{ color: "var(--color-text-secondary)" }}>
                Gerencie suas chaves de API para acesso programático.
              </p>
              <Button
                variant="outline"
                onClick={() => setTokensModalOpen(true)}
                className="transition-colors duration-300"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-card)",
                  color: "var(--color-text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-input-bg)";
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-card)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                Gerenciar Tokens
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="transition-all duration-300"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <CardHeader 
            className="pb-5 border-b transition-colors duration-300"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center border transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-primary)10",
                  borderColor: "var(--color-border)",
                }}
              >
                <Globe className="w-6 h-6 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
              </div>
              <CardTitle className="text-xl font-bold transition-colors duration-300" style={{ color: "var(--color-text)" }}>
                Language & Theme
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3">
              <Label className="font-medium transition-colors duration-300" style={{ color: "var(--color-text)" }}>Idioma</Label>
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
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-foreground)",
                      } : {
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-input-bg)",
                        color: "var(--color-text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "var(--color-card)";
                          e.currentTarget.style.borderColor = "var(--color-primary)";
                        } else {
                          e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "var(--color-input-bg)";
                          e.currentTarget.style.borderColor = "var(--color-border)";
                        } else {
                          e.currentTarget.style.backgroundColor = "var(--color-primary)";
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
              <Label className="font-medium transition-colors duration-300" style={{ color: "var(--color-text)" }}>Tema</Label>
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
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-foreground)",
                      } : {
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-input-bg)",
                        color: "var(--color-text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "var(--color-card)";
                          e.currentTarget.style.borderColor = "var(--color-primary)";
                        } else {
                          e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "var(--color-input-bg)";
                          e.currentTarget.style.borderColor = "var(--color-border)";
                        } else {
                          e.currentTarget.style.backgroundColor = "var(--color-primary)";
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
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
            }}
            onMouseEnter={(e) => {
              if (!isSaving) {
                e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSaving) {
                e.currentTarget.style.backgroundColor = "var(--color-primary)";
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
