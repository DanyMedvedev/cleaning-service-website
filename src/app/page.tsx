"use client";

import Image from 'next/image';
import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";
import { motion } from 'framer-motion';

// Lazy load components below the fold
const Services = dynamic(() => import("@/components/Services"), { 
  loading: () => <div className="h-96" /> 
});
const FAQ = dynamic(() => import("@/components/FAQ"), { 
  loading: () => <div className="h-64" /> 
});
const Features = dynamic(() => import("@/components/Features"), { 
  loading: () => <div className="h-64" /> 
});
const WhatIncluded = dynamic(() => import("@/components/WhatIncluded"), { 
  loading: () => <div className="h-64" /> 
});

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[110vh] -mt-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/HeroPhoto.png" 
            alt="CzystyDom - Profesjonalna firma sprzątająca Warszawa"
            fill
            className="object-cover blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-20 w-full pt-40">
          <div className="flex flex-col lg:flex-row items-start justify-center min-h-[75vh] gap-8">
            {/* Hero copy - left side */}
            <div className="text-left space-y-6 lg:w-1/2 lg:pt-28">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl lg:text-[64px] font-black text-white leading-tight"
              >
                {t('hero.title')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-lg md:text-2xl text-white/80 font-medium"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="pt-4 space-y-4"
              >
                <div className="flex items-center gap-3 text-white text-lg font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{t('hero.feature1')}</span>
                </div>
                <div className="flex items-center gap-3 text-white text-lg font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{t('hero.feature2')}</span>
                </div>
                <div className="flex items-center gap-3 text-white text-lg font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{t('hero.feature3')}</span>
                </div>
                <div className="flex items-center gap-3 text-white text-lg font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>{t('hero.feature4')}</span>
                </div>
              </motion.div>
            </div>

            {/* Contact Form in Hero - right side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="w-full lg:w-5/12 lg:mt-2"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Details Section */}
      <WhatIncluded />

      {/* Services Section - moved to bottom */}
      <div className="mt-32">
        <Services />
      </div>

      <Footer />
    </main>
  );
}
