import pt from './pt.json';
import en from './en.json';
import es from './es.json';

type Translations = typeof en;

const translations: Record<string, Translations> = {
  pt,
  en,
  es,
};

export function t(key: string, lang: string = 'en'): any {
  const keys = key.split('.');
  let value: any = translations[lang] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      const fallback: any = translations.en;
      let fallbackValue = fallback;
      for (const fk of keys) {
        fallbackValue = fallbackValue?.[fk];
      }
      return fallbackValue !== undefined ? fallbackValue : key;
    }
  }
  
  return value !== undefined ? value : key;
}

export type Language = 'pt' | 'en' | 'es';

// Re-export useI18n from index.tsx if it exists
export { useI18n } from './index.tsx';

