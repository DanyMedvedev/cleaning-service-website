"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, User, ChevronDown, Sparkles, Home, Building2, Square, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pl', label: 'Polish', flag: '🇵🇱' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' },
  { code: 'ua', label: 'Ukrainian', flag: '🇺🇦' },
];

const servicesMenu = [
  {
    id: 'apartment',
    title: 'Уборка квартир',
    href: '/services/apartment',
  },
  {
    id: 'airbnb',
    title: 'Airbnb / Квартиры',
    href: '/services/airbnb',
  },
  {
    id: 'office',
    title: 'Офисы',
    href: '/services/office',
  },
  {
    id: 'extras',
    title: 'Дополнительные',
    href: '/services/extras',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const { lang: currentLangCode, setLang, t } = useTranslation();
  const currentLang = languages.find((l) => l.code === currentLangCode) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-50">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-medium tracking-wide block text-text font-serif italic">
              Czysty dom
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-full border border-blue-100 bg-background text-text text-sm font-medium hover:bg-white hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest hidden md:inline">
                {currentLang.flag} {currentLang.code}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-text/60 transition-transform ${
                  isLangOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <a
              href="tel:+48731751255"
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded-full border border-blue-100 bg-background text-text text-xs md:text-sm font-medium hover:bg-white hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="hidden md:inline">
                +48 731 751 255
              </span>
            </a>
          </div>
        </div>

        {/* Right side: Navigation Links */}
        <div className="hidden lg:flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar text-text">
          {/* Services - Horizontal inline */}
          <div className="flex items-center gap-1">
            {servicesMenu.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all text-sm font-medium whitespace-nowrap ${
                  pathname === service.href || pathname.startsWith(service.href + '/')
                    ? 'text-primary underline underline-offset-4 decoration-2'
                    : 'text-text'
                }`}
              >
                <span>{service.title}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/order"
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md shadow-blue-200/60 hover:shadow-lg transition-all text-xs md:text-sm font-bold whitespace-nowrap ${
              pathname === '/order' || pathname.startsWith('/order/')
                ? 'bg-primary text-white'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {t('nav.cleaning')}
          </Link>

          <div className="h-6 w-px bg-blue-100 hidden md:block" />
        </div>
      </div>

      {/* Language Dropdown */}
      <AnimatePresence>
        {isLangOpen && (
          <>
            <div className="fixed inset-0" onClick={() => setIsLangOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-32 w-56 bg-white rounded-2xl shadow-2xl border border-blue-50 p-2 overflow-hidden text-text"
            >
              {languages.map((langOption) => (
                <button
                  key={langOption.code}
                  onClick={() => {
                    setLang(langOption.code);
                    setIsLangOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50/60 transition-colors text-left"
                >
                  <span className="text-lg">{langOption.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{langOption.label}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text/50">
                      {langOption.code}
                    </span>
                  </div>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

