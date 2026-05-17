import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import { useAppStore } from '../../store/useAppStore';
import type { Language } from '../../stypes';
import { LABELS, LANGUAGES } from './locales';

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  labels: (typeof LABELS)[Language];
  languages: typeof LANGUAGES;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useAppStore();

  const value = useMemo<LanguageContextValue>(() => {
    const labels = (LABELS[language] ?? LABELS.vi) as (typeof LABELS)[Language];

    return {
      language,
      setLanguage,
      languages: LANGUAGES,
      labels,
      t: (key: string) => (labels as Record<string, string>)[key] || key,
    };
  }, [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}



