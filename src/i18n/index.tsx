import { createContext, useContext, useState, type ReactNode, useEffect } from "react";


export interface LanguageFile {
    config: {
        code: string;
        label: string;
        emoji?: string;
    };
    [key: string]: any; // outras seções flexíveis
}


// Tipagem dos módulos globais
const modules = import.meta.glob("./*.ts", {
    eager: true,
}) as Record<string, { default: LanguageFile }>;

// Construção automática das línguas
const languages: Record<string, LanguageFile> = {};

for (const path in modules) {
    const mod = modules[path];
    if (mod.default?.config?.code) {
        const code = mod.default.config.code;
        languages[code] = mod.default;
    }
}

type LangCode = keyof typeof languages;

// Contexto
interface I18nContextType {
    lang: LangCode;
    //   t: (path: string) => string;
    t: <T = string>(path: string) => T;

    switchLang: (code: LangCode) => void;
    available: { code: string; label: string; emoji?: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const stored = (localStorage.getItem("lang") as LangCode) || "en";
    const [lang, setLang] = useState<LangCode>(stored);

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    function t(path: string) {
        return path.split(".").reduce((obj: any, key) => obj?.[key], languages[lang]);
    }

    function switchLang(code: LangCode) {
        setLang(code);
    }

    const available = Object.values(languages).map(l => l.config);

    return (
        <I18nContext.Provider value={{ lang, t, switchLang, available }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
    return ctx;
}
