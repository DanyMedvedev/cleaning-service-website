"use client";

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Calculator from "@/components/Calculator";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import WhatIncluded from "@/components/WhatIncluded";
import FAQ from "@/components/FAQ";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

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

        <div className="max-w-7xl mx-auto px-4 relative z-20 w-full pt-64">
          <div className="flex flex-col items-center justify-center min-h-[75vh]">
            {/* Hero copy - centered */}
            <div className="text-center space-y-6 mb-10">
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
                className="text-lg md:text-2xl text-white/80 font-medium max-w-xl mx-auto"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 justify-center text-sm font-medium text-white/70"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                  ✓ Fixed price · ✓ Insured cleaners · ✓ Supplies included
                </span>
              </motion.div>
            </div>

            {/* Hero mini-calculator - centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="w-full max-w-3xl"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl shadow-black/20 border border-white/20 p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-1">
                      Instant quote
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-text">
                      Quick cleaning estimate
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Rooms Counter */}
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-text/60 uppercase tracking-widest">
                        {t('calculator.rooms')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-9 h-9 rounded-full bg-white border border-blue-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-40"
                        disabled={rooms <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-black text-text">{rooms}</span>
                      <button
                        onClick={() => setRooms(rooms + 1)}
                        className="w-9 h-9 rounded-full bg-white border border-blue-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Bathrooms Counter */}
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-text/60 uppercase tracking-widest">
                        {t('calculator.bathrooms')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                        className="w-9 h-9 rounded-full bg-white border border-blue-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-40"
                        disabled={bathrooms <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-black text-text">{bathrooms}</span>
                      <button
                        onClick={() => setBathrooms(bathrooms + 1)}
                        className="w-9 h-9 rounded-full bg-white border border-blue-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    window.location.href = `/order?rooms=${rooms}&bathrooms=${bathrooms}`;
                  }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-primary text-white font-bold text-base md:text-lg hover:bg-primary/90 shadow-lg shadow-blue-200/60 transition-all"
                >
                  {t('hero.calculate_btn')}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-[11px] text-text/50 text-center">
                  No card required · Final price depends on extras & frequency · Full breakdown below
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Details Section */}
      <WhatIncluded />

      {/* Calculator Section */}
      <Calculator />

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


