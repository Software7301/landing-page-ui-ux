import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'EN', name: 'English' },
        { code: 'pt', label: 'PT', name: 'Português' },
        { code: 'es', label: 'ES', name: 'Español' }
    ];

    const current = languages.find(l => l.code === language);

    const handleLanguageChange = (code: 'pt' | 'en' | 'es') => {
        setLanguage(code);
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300"
                    style={{
                        color: "var(--color-text-secondary)",
                        borderColor: "var(--color-border)",
                        borderWidth: "1px",
                        backgroundColor: "var(--color-input-bg)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-text)";
                        e.currentTarget.style.borderColor = "var(--color-primary)50";
                        e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-text-secondary)";
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.backgroundColor = "var(--color-input-bg)";
                    }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Globe className="w-4 h-4 transition-colors duration-300" style={{ color: "var(--color-primary)" }} />
                    </motion.div>
                    <span className="font-medium">{current?.code.toUpperCase() || 'EN'}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-3 h-3 transition-colors duration-300" />
                    </motion.div>
                </motion.button>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
                className="min-w-[120px] transition-colors duration-300"
                align="end"
                style={{
                    backgroundColor: "var(--color-card)",
                    borderColor: "var(--color-border)",
                }}
            >
                <AnimatePresence>
                    {languages.map((l, index) => (
                        <motion.div
                            key={l.code}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                            <DropdownMenuItem
                                onClick={() => handleLanguageChange(l.code as 'pt' | 'en' | 'es')}
                                className="cursor-pointer transition-colors duration-200"
                                style={{
                                    color: l.code === language ? "var(--color-primary)" : "var(--color-text)",
                                    backgroundColor: l.code === language ? "var(--color-sidebar-active)" : "transparent",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "var(--color-sidebar-hover)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = l.code === language ? "var(--color-sidebar-active)" : "transparent";
                                }}
                            >
                                <motion.span
                                    whileHover={{ x: 2 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="font-medium">{l.label}</span>
                                    <span className="text-xs opacity-70">{l.name}</span>
                                </motion.span>
                            </DropdownMenuItem>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
