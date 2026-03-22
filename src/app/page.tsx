"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import WhatIncluded from "@/components/WhatIncluded";
import FAQ from "@/components/FAQ";
import { useTranslation } from "@/lib/i18n";
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[110vh] -mt-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/HeroPhoto.png" 
            alt="Clean modern home" 
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-20 w-full pt-48">
          <div className="flex flex-col lg:flex-row items-start justify-center min-h-[75vh] gap-8">
            {/* Hero copy - left side */}
            <div className="text-left space-y-6 lg:w-1/2 lg:pt-32">
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
                  <span>Standard apartment cleaning from 170 zł</span>
                </div>
                <div className="flex items-center gap-3 text-white text-lg font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>Deep cleaning for thorough cleanliness</span>
                </div>
                <div className="flex items-center gap-3 text-white text-lg font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>Airbnb turn-over cleaning available</span>
                </div>
                <div className="flex items-center gap-3 text-white text-lg font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>Office cleaning from 5 zł/m²</span>
                </div>
              </motion.div>
            </div>

            {/* Contact Form in Hero - right side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="w-full lg:w-5/12 lg:mt-8"
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

      {/* FAQ Section */}
      <FAQ />

      {/* Services Section - moved to bottom */}
      <div className="mt-32">
        <Services />
      </div>

      <Footer />
    </main>
  );
}
