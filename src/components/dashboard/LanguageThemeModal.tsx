import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { t } from "@/i18n";

interface LanguageThemeModalProps {
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const languages = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export function LanguageThemeModal({ isOpen, onClose }: LanguageThemeModalProps) {
  const { language, setLanguage } = useLanguage();
  const { theme, themes, setTheme } = useTheme();

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
              className="w-full max-w-md bg-[#0B1E36] border border-[#1C2A3F] rounded-xl shadow-2xl pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#1C2A3F]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2EE6D6]/20 to-[#1CB8A8]/10 flex items-center justify-center border border-[#2EE6D6]/20">
                    <Globe className="w-5 h-5 text-[#2EE6D6]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#E6EDF3]">Language & Theme</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Language Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-[#2EE6D6]" />
                    <h3 className="text-sm font-semibold text-[#E6EDF3]">Idioma</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as "pt" | "en" | "es")}
                        variant={language === lang.code ? "default" : "outline"}
                        className={language === lang.code
                          ? "bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)]"
                          : "border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50"
                        }
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Theme Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-[#2EE6D6]" />
                    <h3 className="text-sm font-semibold text-[#E6EDF3]">Tema</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((t) => (
                      <Button
                        key={t.name}
                        onClick={() => setTheme(t.name)}
                        variant={theme.name === t.name ? "default" : "outline"}
                        className={theme.name === t.name
                          ? "bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)]"
                          : "border-[#1C2A3F] text-[#9FB0C7] hover:text-[#E6EDF3] hover:bg-[#142B4F]/50"
                        }
                      >
                        {t.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-[#2EE6D6] to-[#1CB8A8] text-[#060B14] hover:shadow-[0_0_20px_rgba(46,230,214,0.4)] transition-all duration-300 font-semibold"
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

