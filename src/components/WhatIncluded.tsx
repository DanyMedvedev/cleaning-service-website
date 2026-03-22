"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const tabs = [
  { 
    id: 'room', 
    label: 'In the room', 
    items: ['Dusting all surfaces', 'Floor vacuuming & mopping', 'Mirror cleaning', 'Tidying up things'],
    image: '/images/in-the-room-cleaning.png'
  },
  { 
    id: 'hallway', 
    label: 'In the hallway', 
    items: ['Shoe arrangement', 'Dusting shelves', 'Floor mopping', 'Mirror cleaning'],
    image: '/images/hallway-cleaning-up.png'
  },
  { 
    id: 'kitchen', 
    label: 'Kitchen', 
    items: ['Dish washing', 'Countertop cleaning', 'Sink disinfection', 'Fridge outside cleaning'],
    image: '/images/kitchen-cleaning-up.png'
  },
  { 
    id: 'bathroom', 
    label: 'Bathroom', 
    items: ['Toilet disinfection', 'Shower/Tub cleaning', 'Mirror & Sink cleaning', 'Floor mopping'],
    image: '/images/bathroom-cleaning.png'
  },
];

const SLIDE_DURATION = 8000;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

export default function WhatIncluded() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const prevTabRef = useRef(0);
  const progressRef = useRef(0);

  const goToSlide = useCallback((index: number) => {
    prevTabRef.current = activeTab;
    progressRef.current = 0;
    setKey(k => k + 1);
    setActiveTab(index);
    setProgress(0);
  }, [activeTab]);

  const nextSlide = useCallback(() => {
    prevTabRef.current = activeTab;
    progressRef.current = 0;
    setKey(k => k + 1);
    setActiveTab((prev) => (prev + 1) % tabs.length);
    setProgress(0);
  }, [activeTab]);

  const prevSlide = useCallback(() => {
    prevTabRef.current = activeTab;
    progressRef.current = 0;
    setKey(k => k + 1);
    setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
    setProgress(0);
  }, [activeTab]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    let animationId: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      
      progressRef.current += (delta / SLIDE_DURATION) * 100;
      
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setKey(k => k + 1);
        setActiveTab((prev) => (prev + 1) % tabs.length);
        setProgress(0);
      } else {
        setProgress(progressRef.current);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [isAutoPlaying]);

  const activeTabData = tabs[activeTab];
  const direction = activeTab > prevTabRef.current ? 1 : -1;

  return (
    <section className="min-h-screen py-16 overflow-hidden bg-gradient-to-br from-creamLight via-cream to-creamLight flex flex-col">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex-1 flex flex-col">
        <div className="text-center mb-8 pt-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-text"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            {t('included.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg text-text/60 max-w-xl mx-auto"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Experience the difference of thorough, professional cleaning
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-500 ${
                activeTab === index 
                  ? 'bg-text text-white shadow-lg shadow-primary/20' 
                  : 'bg-white/40 text-text/50 border border-text/5 hover:bg-white/60 hover:text-text/70'
              }`}
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {t(`included.tabs.${tab.id}`)}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2 mb-6 opacity-60">
          {tabs.map((_, index) => (
            <div
              key={index}
              className="h-1 rounded-full transition-all duration-700"
              style={{ 
                width: index === activeTab ? '24px' : '6px',
                backgroundColor: index === activeTab ? 'var(--primary)' : 'var(--text)/20'
              }}
            />
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-6xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ 
                  duration: 0.45, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                <div className="order-1 relative">
                  <div className="absolute -z-10 w-full h-full rounded-[40px] opacity-15 transform translate-x-4 translate-y-4 bg-primary" />
                  
                  <div
                    className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-[40px] overflow-hidden shadow-2xl"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%)' }}
                  >
                    <img 
                      src={activeTabData.image}
                      alt={activeTabData.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <span 
                        className="text-2xl font-bold tracking-wide"
                        style={{ 
                          color: 'white', 
                          fontFamily: 'DM Serif Display, serif'
                        }}
                      >
                        {activeTabData.label}
                      </span>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="order-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  <div className="space-y-3">
                    {activeTabData.items.map((item, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 hover:shadow-xl hover:bg-white bg-white/70 backdrop-blur-sm border border-white/50"
                        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                      >
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                          <CheckCircle2 className="w-7 h-7 text-primary group-hover:text-white" />
                        </div>
                        <span className="font-medium text-xl text-text">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>


                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Timer progress bar - more visible */}
        <div className="mt-8 flex justify-center">
          <div className="w-32 h-1 bg-text/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary/50 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
