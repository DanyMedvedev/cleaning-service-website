"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Building2, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const features = [
  "services_pages.office.features.0",
  "services_pages.office.features.1",
  "services_pages.office.features.2",
  "services_pages.office.features.3",
  "services_pages.office.features.4",
  "services_pages.office.features.5",
  "services_pages.office.features.6",
  "services_pages.office.features.7",
];

export default function OfficeServicePage() {
  const { t } = useTranslation();

  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-20 relative h-[500px]">
          <img 
            src="/images/office-cleaning.png" 
            alt={t('services_pages.office.hero.title')}
            className="absolute inset-0 w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-6 h-6 text-accent" />
                  <span className="text-accent font-bold uppercase tracking-widest text-sm">{t('services_pages.office.hero.services')}</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                  {t('services_pages.office.hero.title')}
                </h1>
                <p className="text-white/80 font-medium text-xl mb-8">
                  {t('services_pages.office.hero.subtitle')}
                </p>
                <Link 
                  href="/order" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
                >
                  {t('services_pages.office.hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                {t('services_pages.office.included.title')}
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                {t('services_pages.office.included.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl p-5 flex items-center gap-3 shadow-sm border border-blue-50"
                >
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text font-medium">{t(feature)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('services_pages.office.included.title')}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                {t('services_pages.office.included.subtitle')}
              </p>
              <Link 
                href="/order" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 transition-all"
              >
                {t('services_pages.office.hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
