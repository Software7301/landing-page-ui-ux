import { useLanguage } from "@/hooks/useLanguage";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'pt', label: 'PT' },
        { code: 'es', label: 'ES' }
    ];

    const current = languages.find(l => l.code === language);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="
                    flex items-center gap-2 
                    text-sm text-[#C4B5FD] hover:text-[#F5F3FF] 
                    px-3 py-1.5 rounded-md 
                    border border-[rgba(109,40,217,0.15)] hover:border-[rgba(109,40,217,0.25)] 
                    bg-[#141026] hover:bg-[#18132E] 
                    backdrop-blur-sm
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/30
                    font-medium
                "
            >
                <Globe className="w-4 h-4" />
                <span>{current?.code.toUpperCase() || 'EN'}</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
                className="bg-[#18132E] backdrop-blur-md border-[rgba(109,40,217,0.15)] min-w-[100px]"
                align="end"
            >
                {languages.map(l => (
                    <DropdownMenuItem
                        key={l.code}
                        onClick={() => setLanguage(l.code as 'pt' | 'en' | 'es')}
                        className={`
                            cursor-pointer text-sm
                            ${l.code === language 
                                ? 'text-[#F5F3FF] bg-[#141026]' 
                                : 'text-[#C4B5FD] hover:text-[#F5F3FF] hover:bg-[#141026]'
                            }
                            transition-colors font-medium
                        `}
                    >
                        {l.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
