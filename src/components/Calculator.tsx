"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Minus, Check, Sparkles, 
  Refrigerator, Microwave, Layout, 
  Wind, Trash2,
  Calendar, Info
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from '@/lib/i18n';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PRICING = {
  room: 100,
  bathroom: 50,
  extras: {
    fridge: { label: 'Inside Fridge', price: 40, icon: Refrigerator },
    oven: { label: 'Inside Oven', price: 40, icon: Sparkles },
    cabinets: { label: 'Inside Cabinets', price: 50, icon: Layout },
    windows: { label: 'Windows', price: 60, icon: Layout }, // Using Layout as fallback for Window
    ironing: { label: 'Ironing', price: 50, icon: Wind },
    balcony: { label: 'Balcony', price: 40, icon: Trash2 },
  },
  frequencies: [
    { id: 'once', label: 'One-time', discount: 0, badge: null },
    { id: 'weekly', label: 'Once a week', discount: 20, badge: '-20%' },
    { id: 'biweekly', label: 'Twice a month', discount: 15, badge: '-15%' },
    { id: 'monthly', label: 'Once a month', discount: 10, badge: '-10%' },
  ]
};

export default function Calculator() {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [frequency, setFrequency] = useState(PRICING.frequencies[0]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let price = (rooms * PRICING.room) + (bathrooms * PRICING.bathroom);
    
    selectedExtras.forEach(extraKey => {
      price += PRICING.extras[extraKey as keyof typeof PRICING.extras].price;
    });

    if (frequency.discount > 0) {
      price = price * (1 - frequency.discount / 100);
    }

    setTotal(Math.round(price));
  }, [rooms, bathrooms, selectedExtras, frequency]);

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <section id="calculator" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-text mb-4"
          >
            {t('calculator.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text/60 max-w-2xl mx-auto font-medium"
          >
            {t('calculator.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Controls */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Rooms & Bathrooms */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
              <h3 className="text-xl font-bold text-text mb-8 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                Size of your place
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Rooms */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-text/80">{t('calculator.rooms')}</label>
                    <div className="flex items-center gap-4 bg-blue-50/50 p-2 rounded-2xl border border-blue-50">
                      <button 
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                        disabled={rooms <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-8 text-center font-bold text-lg text-text">{rooms}</span>
                      <button 
                        onClick={() => setRooms(rooms + 1)}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bathrooms */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-text/80">{t('calculator.bathrooms')}</label>
                    <div className="flex items-center gap-4 bg-blue-50/50 p-2 rounded-2xl border border-blue-50">
                      <button 
                        onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                        disabled={bathrooms <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-8 text-center font-bold text-lg text-text">{bathrooms}</span>
                      <button 
                        onClick={() => setBathrooms(bathrooms + 1)}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Extras */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
              <h3 className="text-xl font-bold text-text mb-8 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                {t('calculator.extras')}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                {Object.entries(PRICING.extras).map(([id, extra]) => (
                  <button
                    key={id}
                    onClick={() => toggleExtra(id)}
                    className={cn(
                      "group relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300",
                      selectedExtras.includes(id) 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105" 
                        : "bg-white border-blue-50 text-text/60 hover:border-primary/30 hover:bg-blue-50/30"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                      selectedExtras.includes(id) ? "bg-white/20" : "bg-blue-50 group-hover:bg-white"
                    )}>
                      <extra.icon className={cn(
                        "w-6 h-6",
                        selectedExtras.includes(id) ? "text-white" : "text-primary"
                      )} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-center line-clamp-2">
                      {extra.label}
                    </span>
                    {selectedExtras.includes(id) && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                      </div>
                    )}
                    <span className={cn(
                      "text-xs font-bold",
                      selectedExtras.includes(id) ? "text-white/80" : "text-primary"
                    )}>
                      +{extra.price} PLN
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Frequency */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
              <h3 className="text-xl font-bold text-text mb-8 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
                {t('calculator.frequency')}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {PRICING.frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setFrequency(freq)}
                    className={cn(
                      "relative p-4 rounded-2xl border transition-all duration-300 text-left",
                      frequency.id === freq.id 
                        ? "bg-primary/5 border-primary shadow-sm" 
                        : "bg-white border-blue-50 hover:border-primary/30"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <span className={cn(
                        "text-sm font-bold",
                        frequency.id === freq.id ? "text-primary" : "text-text"
                      )}>
                        {freq.label}
                      </span>
                      {freq.badge && (
                        <span className="inline-block w-fit px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold">
                          {freq.badge} discount
                        </span>
                      )}
                    </div>
                    {frequency.id === freq.id && (
                      <div className="absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-200/60 border border-blue-50 overflow-hidden">
              <div className="p-8 bg-primary text-white">
                <div className="flex items-center gap-3 mb-2 opacity-80">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-widest">{t('calculator.summary')}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    key={total}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-5xl font-black"
                  >
                    {total}
                  </motion.span>
                  <span className="text-xl font-bold opacity-80 uppercase">PLN</span>
                </div>
                <p className="text-sm mt-2 font-medium opacity-80">
                  Everything included, taxes and supplies.
                </p>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text/60 font-medium">{rooms} {t('calculator.rooms')} + {bathrooms} {t('calculator.bathrooms')}</span>
                    <span className="text-text font-bold">{(rooms * PRICING.room) + (bathrooms * PRICING.bathroom)} PLN</span>
                  </div>
                  
                  {selectedExtras.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text/60 font-medium">{selectedExtras.length} {t('calculator.extras')}</span>
                      <span className="text-text font-bold">
                        {selectedExtras.reduce((acc, curr) => acc + PRICING.extras[curr as keyof typeof PRICING.extras].price, 0)} PLN
                      </span>
                    </div>
                  )}

                  {frequency.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-accent font-bold">Frequency discount ({frequency.badge})</span>
                      <span className="text-accent font-bold">
                        -{Math.round(((rooms * PRICING.room) + (bathrooms * PRICING.bathroom) + selectedExtras.reduce((acc, curr) => acc + PRICING.extras[curr as keyof typeof PRICING.extras].price, 0)) * (frequency.discount / 100))} PLN
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-blue-50">
                  <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-50 mb-6">
                    <Info className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-xs text-text/60 leading-relaxed">
                      Subscription can be canceled at any time. We bring all professional supplies for every cleaning.
                    </p>
                  </div>

                  <button 
                    onClick={() => {
                      window.location.href = `/order?rooms=${rooms}&bathrooms=${bathrooms}`;
                    }}
                    className="w-full py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group">
                    {t('calculator.book_now')}
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

