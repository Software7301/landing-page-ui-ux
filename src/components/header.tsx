import { Network } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const coreLoginUrl = import.meta.env.VITE_CORE_URL ? `${import.meta.env.VITE_CORE_URL}/login` : 'http://localhost:5174/login';

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[rgba(109,40,217,0.15)] bg-[#0E0A1A]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6D28D9] to-[#5B21B6] flex items-center justify-center">
            <Network className="w-5 h-5 text-[#F5F3FF]" />
          </div>
          <span className="text-xl font-semibold text-[#F5F3FF]">CorsiHub</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-[#C4B5FD] hover:text-[#F5F3FF] transition-colors">
            {t('header.features', language)}
          </a>
          <a href="#pricing" className="text-sm text-[#C4B5FD] hover:text-[#F5F3FF] transition-colors">
            {t('header.pricing', language)}
          </a>
          <a href="#docs" className="text-sm text-[#C4B5FD] hover:text-[#F5F3FF] transition-colors">
            {t('header.docs', language)}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={coreLoginUrl}
            className="text-sm text-[#C4B5FD] hover:text-[#F5F3FF] px-4 py-2 rounded-md border border-[rgba(109,40,217,0.15)] bg-[#141026] hover:bg-[#18132E] transition-colors"
          >
            {t('header.signIn', language)}
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-xs text-[#C4B5FD] hover:text-[#F5F3FF] px-2 py-1 rounded border border-[rgba(109,40,217,0.15)] bg-[#141026] hover:bg-[#18132E] transition-colors">
              {language.toUpperCase()}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#18132E] border-[rgba(109,40,217,0.15)]">
              <DropdownMenuItem
                onClick={() => setLanguage('en')}
                className="cursor-pointer text-[#F5F3FF] hover:bg-[#141026]"
              >
                EN
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('pt')}
                className="cursor-pointer text-[#F5F3FF] hover:bg-[#141026]"
              >
                PT
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('es')}
                className="cursor-pointer text-[#F5F3FF] hover:bg-[#141026]"
              >
                ES
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
