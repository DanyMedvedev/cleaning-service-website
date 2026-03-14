"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { CheckCircle2 } from 'lucide-react';

const tabs = [
  { 
    id: 'room', 
    label: 'In the room', 
    items: ['Dusting all surfaces', 'Floor vacuuming & mopping', 'Mirror cleaning', 'Tidying up things'],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'hallway', 
    label: 'In the hallway', 
    items: ['Shoe arrangement', 'Dusting shelves', 'Floor mopping', 'Mirror cleaning'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'kitchen', 
    label: 'Kitchen', 
    items: ['Dish washing', 'Countertop cleaning', 'Sink disinfection', 'Fridge outside cleaning'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'bathroom', 
    label: 'Bathroom', 
    items: ['Toilet disinfection', 'Shower/Tub cleaning', 'Mirror & Sink cleaning', 'Floor mopping'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
];

export default function WhatIncluded() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('room');

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-text mb-4"
          >
            {t('included.title')}
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 md:px-8 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all border ${
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-md shadow-primary/25 border-primary" 
                  : "bg-white text-text/60 border-blue-100 hover:bg-blue-50/60"
              }`}
            >
              {t(`included.tabs.${tab.id}`)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-xl shadow-blue-100/50 border border-blue-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              <div className="order-2 md:order-1">
                {tabs.find(t => t.id === activeTab)?.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-50 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="font-bold text-text/80">{item}</span>
                  </div>
                ))}
              </div>
              <div className="order-1 md:order-2">
                <motion.div
                  key={`image-${activeTab}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg"
                >
                  <img 
                    src={tabs.find(t => t.id === activeTab)?.image}
                    alt={tabs.find(t => t.id === activeTab)?.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
