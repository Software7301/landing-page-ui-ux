import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";

/**
 * Navbar Component
 * Premium navbar with logo, navigation links, and CTA buttons
 */
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[rgba(124,58,237,0.2)] bg-[#0B0614]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center group-hover:from-[#A855F7] group-hover:to-[#C084FC] transition-all duration-300 shadow-lg shadow-[#7C3AED]/20">
            <Network className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-[#EDE9FE]">CorsiHub</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-[#A78BFA] hover:text-[#EDE9FE] transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-[#A78BFA] hover:text-[#EDE9FE] transition-colors duration-200"
          >
            Pricing
          </a>
          <a
            href="#docs"
            className="text-sm text-[#A78BFA] hover:text-[#EDE9FE] transition-colors duration-200"
          >
            Docs
          </a>
        </div>

        {/* Right side - Language + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-[#A78BFA] hover:text-[#EDE9FE] hover:bg-[#120A24] border-0"
            >
              Sign In
            </Button>
            
            <Button
              size="sm"
              className="text-sm bg-[#7C3AED] hover:bg-[#A855F7] text-white border-0 shadow-lg shadow-[#7C3AED]/30"
            >
              Get Started
            </Button>
          </div>
          
          {/* Mobile: Show language switcher */}
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

