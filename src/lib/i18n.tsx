"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/dictionaries/en.json';
import pl from '@/dictionaries/pl.json';
import ua from '@/dictionaries/ua.json';
import ru from '@/dictionaries/ru.json';

type Dictionary = typeof en;

const dictionaries: Record<string, Dictionary> = {
  en,
  pl,
  ua: ua as Dictionary,
  ru,
};

type LanguageContextType = {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Try to get saved language from localStorage
    const savedLang = localStorage.getItem('cleanly-lang');
    if (savedLang && dictionaries[savedLang]) {
      setLang(savedLang);
    }
  }, []);

  const handleSetLang = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('cleanly-lang', newLang);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = dictionaries[lang] || dictionaries.en;
    
    for (const key of keys) {
      if (current[key] === undefined) {
        // Fallback to English
        current = dictionaries.en;
        for (const k of keys) {
          if (current[k] === undefined) return path;
          current = current[k];
        }
        return current;
      }
      current = current[key];
    }
    
    return current;
  };

  // Return provider even when not mounted to ensure useTranslation works
  const translateFn = isMounted ? t : ((key: string) => key);
  
  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translateFn }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
