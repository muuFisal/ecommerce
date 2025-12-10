import React, { createContext, useContext, useEffect, useState } from 'react';
import { t as baseT, type Lang } from './translations';

interface I18nContextValue {
  lang: Lang;
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = 'ecommerce-lang';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? null;
    if (stored === 'en' || stored === 'ar') {
      setLangState(stored);
      applyLangToDocument(stored);
    } else {
      setLangState('en');
      applyLangToDocument('en');
    }
  }, []);

  const setLang = (value: Lang) => {
    setLangState(value);
    localStorage.setItem(STORAGE_KEY, value);
    applyLangToDocument(value);
  };

  const value: I18nContextValue = {
    lang,
    t: (key: string) => baseT(key, lang),
    setLang,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

function applyLangToDocument(lang: Lang) {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  root.classList.toggle('lang-ar', lang === 'ar');
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}