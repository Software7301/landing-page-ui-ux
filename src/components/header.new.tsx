import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { useEffect, useState } from "react";

export default function Header() {
  const { language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy para destacar seção ativa
      const sections = ["features", "pricing", "docs"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "features", href: "#features" },
    { key: "pricing", href: "#pricing" },
    { key: "docs", href: "#docs" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[rgba(109,40,217,0.2)] bg-[#0B0F17]/98 backdrop-blur-xl shadow-sm shadow-black/20"
          : "border-b border-[rgba(109,40,217,0.15)] bg-[#0B0F17]/95 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-105"
        >
          <div className="w-8 h-8 rounded-lg bg-[#6D28D9] flex items-center justify-center group-hover:bg-[#8B5CF6] transition-all duration-200 shadow-sm shadow-[#6D28D9]/20">
            <Network className="w-4 h-4 text-[#E5E7EB]" />
          </div>
          <span className="text-lg font-semibold text-[#E5E7EB] tracking-tight">
            CorsiHub
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.key;
            return (
              <a
                key={link.key}
                href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#E5E7EB] bg-[#141C2C] border border-[rgba(109,40,217,0.3)]"
                    : "text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#141C2C] hover:border hover:border-[rgba(109,40,217,0.2)]"
                }`}
              >
                {t(`header.${link.key}`, language)}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6D28D9]"></span>
                )}
              </a>
            );
          })}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#141C2C] hover:border hover:border-[rgba(109,40,217,0.2)] font-medium px-4 transition-all duration-200"
              asChild
            >
              <Link to="/dashboard">{t("header.dashboard", language)}</Link>
            </Button>

            <Button
              size="sm"
              className="text-sm bg-[#6D28D9] hover:bg-[#8B5CF6] text-[#E5E7EB] font-medium px-5 transition-all duration-200 shadow-sm shadow-[#6D28D9]/20 hover:shadow-md hover:shadow-[#6D28D9]/30"
              asChild
            >
              <Link to="/login">{t("header.signIn", language)}</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
