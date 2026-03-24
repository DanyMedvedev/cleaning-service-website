"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Building2, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const features = [
  "services_pages.airbnb.features.0",
  "services_pages.airbnb.features.1",
  "services_pages.airbnb.features.2",
  "services_pages.airbnb.features.3",
  "services_pages.airbnb.features.4",
  "services_pages.airbnb.features.5",
  "services_pages.airbnb.features.6",
  "services_pages.airbnb.features.7",
];

const pricing = [
  { type: "services_pages.airbnb.pricing.studio", priceMin: "120", priceMax: "180", desc: "services_pages.airbnb.pricing.studio_desc" },
  { type: "services_pages.airbnb.pricing.1bed", priceMin: "150", priceMax: "220", desc: "services_pages.airbnb.pricing.1bed_desc" },
  { type: "services_pages.airbnb.pricing.2bed", priceMin: "200", priceMax: "300", desc: "services_pages.airbnb.pricing.2bed_desc" },
];

export default function AirbnbServicePage() {
  const { t } = useTranslation();

  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-20 relative h-[500px]">
          <img 
            src="/images/air-bnb-photo.png" 
            alt={t('services_pages.airbnb.hero.title')}
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
                  <span className="text-accent font-bold uppercase tracking-widest text-sm">{t('services_pages.airbnb.hero.services')}</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                  {t('services_pages.airbnb.hero.title')}
                </h1>
                <p className="text-white/80 font-medium text-xl mb-8">
                  {t('services_pages.airbnb.hero.subtitle')}
                </p>
                <Link 
                  href="/order" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
                >
                  {t('services_pages.airbnb.hero.cta')}
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
                {t('services_pages.airbnb.included.title')}
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                {t('services_pages.airbnb.included.subtitle')}
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

        {/* Pricing Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                {t('services_pages.apartment.pricing.standard_title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {pricing.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50"
                >
                  <h3 className="text-xl font-bold text-text mb-2">{t(item.type)}</h3>
                  <p className="text-text/60 text-sm mb-4">{t(item.desc)}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-primary">{item.priceMin}</span>
                    <span className="text-text/60">-</span>
                    <span className="text-3xl font-black text-primary">{item.priceMax}</span>
                    <span className="text-text/60 ml-1">zł</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/order" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
              >
                {t('services_pages.airbnb.hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                {t('services_pages.airbnb.features_section.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">{t('services_pages.airbnb.features_section.fast')}</h3>
                <p className="text-text/60">{t('services_pages.airbnb.features_section.fast_desc')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">{t('services_pages.airbnb.features_section.checkin')}</h3>
                <p className="text-text/60">{t('services_pages.airbnb.features_section.checkin_desc')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">{t('services_pages.airbnb.features_section.photos')}</h3>
                <p className="text-text/60">{t('services_pages.airbnb.features_section.photos_desc')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
