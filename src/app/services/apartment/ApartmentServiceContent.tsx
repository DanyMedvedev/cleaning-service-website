"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Sparkles, Home, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const standardFeatures = [
  "services_pages.apartment.standard.0",
  "services_pages.apartment.standard.1",
  "services_pages.apartment.standard.2",
  "services_pages.apartment.standard.3",
  "services_pages.apartment.standard.4",
  "services_pages.apartment.standard.5",
  "services_pages.apartment.standard.6",
  "services_pages.apartment.standard.7",
];

const deepFeatures = [
  "services_pages.apartment.deep.0",
  "services_pages.apartment.deep.1",
  "services_pages.apartment.deep.2",
  "services_pages.apartment.deep.3",
  "services_pages.apartment.deep.4",
  "services_pages.apartment.deep.5",
  "services_pages.apartment.deep.6",
  "services_pages.apartment.deep.7",
  "services_pages.apartment.deep.8",
];

const pricing = {
  standard: [
    { rooms: "pricing_1room", price: "170 zł" },
    { rooms: "pricing_2room", price: "250 zł" },
    { rooms: "pricing_3room", price: "300 zł" },
    { rooms: "pricing_4room", price: "400 zł" },
  ],
  deep: [
    { rooms: "pricing_1room", price: "510 zł" },
    { rooms: "pricing_2room", price: "620 zł" },
    { rooms: "pricing_3room", price: "770 zł" },
    { rooms: "pricing_4room", price: "900 zł" },
  ],
};

// JSON-LD Structured Data for Local SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "name": "CzystyDom",
  "description": "Profesjonalne usługi sprzątania mieszkań w Warszawie",
  "url": "https://czystydom.online/sprzatanie-mieszkan-warszawa",
  "telephone": "+48731751255",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Marszałkowska 123",
    "addressLocality": "Warszawa",
    "postalCode": "00-001",
    "addressCountry": "PL"
  },
  "areaServed": {
    "@type": "City",
    "name": "Warszawa"
  },
  "priceRange": "170-900 PLN",
  "openingHours": "Mo-Su 08:00-20:00"
};

export default function ApartmentServiceContent() {
  const { t } = useTranslation();
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-20 relative h-[500px]">
          <Image 
            src="/images/flats-cleaning.png" 
            alt="Sprzątanie mieszkań Warszawa - profesjonalna firma sprzątająca"
            fill
            className="object-cover blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >

                <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                  {t('services_pages.apartment.hero.title')} Warszawa
                </h1>
                <p className="text-white/80 font-medium text-xl mb-8">
                  {t('services_pages.apartment.hero.subtitle')}
                </p>
                <Link 
                  href="/order" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
                >
                  {t('services_pages.apartment.hero.cta')}
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
                {t('services_pages.apartment.included.title')}
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                {t('services_pages.apartment.included.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...standardFeatures, ...deepFeatures].map((feature, idx) => (
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Standard Cleaning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text">{t('services_pages.apartment.pricing.standard_title')}</h2>
                    <p className="text-text/60">{t('services_pages.apartment.pricing.standard_subtitle')}</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {pricing.standard.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-blue-50">
                      <span className="font-medium text-text">{t('services_pages.apartment.pricing.' + item.rooms)}</span>
                      <span className="font-black text-2xl text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
                <h3 className="font-bold text-text mb-4">{t('services_pages.apartment.pricing.includes')}</h3>
                <ul className="space-y-3">
                  {standardFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text/80 text-sm">{t(feature)}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/order" 
                  className="mt-8 w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all block text-center"
                >
                  {t('services_pages.apartment.pricing.cta_standard')}
                </Link>
              </motion.div>

              {/* Deep Cleaning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-50/70 border-2 border-primary relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  {t('services_pages.apartment.pricing.popular')}
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text">{t('services_pages.apartment.pricing.deep_title')}</h2>
                    <p className="text-text/60">{t('services_pages.apartment.pricing.deep_subtitle')}</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {pricing.deep.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-blue-50">
                      <span className="font-medium text-text">{t('services_pages.apartment.pricing.' + item.rooms)}</span>
                      <span className="font-black text-2xl text-accent">{item.price}</span>
                    </div>
                  ))}
                </div>
                <h3 className="font-bold text-text mb-4">{t('services_pages.apartment.pricing.includes')}</h3>
                <ul className="space-y-3">
                  {deepFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text/80 text-sm">{t(feature)}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/order" 
                  className="mt-8 w-full py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all block text-center"
                >
                  {t('services_pages.apartment.pricing.cta_deep')}
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                {t('services_pages.apartment.why.title')}
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                {t('services_pages.apartment.why.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: t('services_pages.apartment.why.reasons.0.title'), desc: t('services_pages.apartment.why.reasons.0.desc') },
                { title: t('services_pages.apartment.why.reasons.1.title'), desc: t('services_pages.apartment.why.reasons.1.desc') },
                { title: t('services_pages.apartment.why.reasons.2.title'), desc: t('services_pages.apartment.why.reasons.2.desc') },
                { title: t('services_pages.apartment.why.reasons.3.title'), desc: t('services_pages.apartment.why.reasons.3.desc') },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-6"
                >
                  <h3 className="font-bold text-text mb-2">{item.title}</h3>
                  <p className="text-text/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content Block - Local SEO */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
                Profesjonalne sprzątanie mieszkań w Warszawie
              </h2>
              <div className="prose prose-lg max-w-none text-text/80">
                <p>
                  Szukasz <strong>profesjonalnej firmy sprzątającej w Warszawie</strong>? 
                  Oferujemy kompleksowe <strong>usługi sprzątania mieszkań</strong> na terenie całego 
                  miasta. Nasza firma to gwarancja najwyższej jakości usług i indywidualnego podejścia 
                  do każdego klienta.
                </p>
                <p>
                  Jako doświadczona <strong>firma sprzątająca Warszawa</strong>, świadczymy usługi dla 
                  klientów indywidualnych oraz firm. Specjalizujemy się w sprzątaniu mieszkań wszystkich 
                  rozmiarów - od kawalerek po wielopokojowe apartamenty. Nasi pracownicy to 
                  profesjonaliści z wieloletnim doświadczeniem, którzy używają wyłącznie 
                  profesjonalnych środków czystości.
                </p>
                <p>
                  Oferujemy dwa rodzaje sprzątania: <strong>standardowe</strong> (170 zł) oraz 
                  <strong> gruntowne</strong> (od 510 zł). Standardowe sprzątanie obejmuje 
                  odkurzanie, mycie podłóg, czyszczenie kuchni i łazienki. Gruntowne sprzątanie 
                  to kompleksowa usługa obejmująca czyszczenie wnętrza lodówki, piekarnika, 
                  szafek kuchennych oraz mycie kafelków.
                </p>
                <p>
                  Dlaczego warto wybrać naszą <strong>firmę sprzątającą w Warszawie</strong>? 
                  Oferujemy: stałe ceny niezależne od metrażu, terminowe realizacje, 
                  profesjonalne środki czystości, gwarancję jakości oraz elastyczne godziny 
                  pracy. Pracujemy codziennie od 8:00 do 20:00, również w weekendy.
                </p>
                <p>
                  Zadzwoń do nas już dziś i zamów <strong>profesjonalne sprzątanie mieszkania 
                  w Warszawie</strong>. Twoje zadowolenie jest naszym priorytetem!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internal Linking Section - Other Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">
              Poznaj nasze pozostałe usługi
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/services/airbnb" 
                className="group p-6 bg-background rounded-2xl hover:bg-primary/5 transition-all border border-blue-50"
              >
                <h3 className="font-bold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                  Sprzątanie Airbnb
                </h3>
                <p className="text-text/60 text-sm mb-4">
                  Profesjonalne sprzątanie mieszkań na wynajem w Warszawie
                </p>
                <span className="text-primary font-medium text-sm flex items-center gap-2">
                  Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link 
                href="/services/office" 
                className="group p-6 bg-background rounded-2xl hover:bg-primary/5 transition-all border border-blue-50"
              >
                <h3 className="font-bold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                  Sprzątanie biur
                </h3>
                <p className="text-text/60 text-sm mb-4">
                  Kompleksowe usługi sprzątania biurowców i biur w Warszawie
                </p>
                <span className="text-primary font-medium text-sm flex items-center gap-2">
                  Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link 
                href="/services/extras" 
                className="group p-6 bg-background rounded-2xl hover:bg-primary/5 transition-all border border-blue-50"
              >
                <h3 className="font-bold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                  Dodatkowe usługi
                </h3>
                <p className="text-text/60 text-sm mb-4">
                  Mycie okien, czyszczenie piekarnika, lodówki i inne
                </p>
                <span className="text-primary font-medium text-sm flex items-center gap-2">
                  Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Zamów sprzątanie mieszkania w Warszawie
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Profesjonalna firma sprzątająca - zadzwoń: +48 731 751 255
            </p>
            <Link 
              href="/order" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 transition-all"
            >
              Przejdź do zamówienia
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}