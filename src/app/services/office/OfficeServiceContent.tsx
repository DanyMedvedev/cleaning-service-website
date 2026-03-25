"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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

// JSON-LD Structured Data for Local SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "name": "CzystyDom",
  "description": "Profesjonalne usługi sprzątania biur w Warszawie",
  "url": "https://czystydom.online/sprzatanie-biur-warszawa",
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
  "priceRange": "Indywidualna wycena",
  "openingHours": "Mo-Su 08:00-20:00"
};

export default function OfficeServiceContent() {
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
            src="/images/office-cleaning.png" 
            alt="Sprzątanie biur Warszawa - profesjonalna firma sprzątająca"
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
                  {t('services_pages.office.hero.title')} Warszawa
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

        {/* SEO Content Block - Local SEO */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
                Profesjonalne sprzątanie biur w Warszawie
              </h2>
              <div className="prose prose-lg max-w-none text-text/80">
                <p>
                  Szukasz profesjonalnej firmy do <strong>sprzątania biur w Warszawie</strong>? 
                  Oferujemy kompleksowe usługi sprzątania dla biurowców, firm i przedsiębiorstw 
                  wszelkich rozmiarów. Nasza firma to gwarancja czystości i profesjonalizmu.
                </p>
                <p>
                  Nasza <strong>firma sprzątająca w Warszawie</strong> specjalizuje się w obsłudze 
                  obiektów biurowych. Oferujemy regularne sprzątanie biur, kompleksowe usługi 
                  porządkowe oraz jednorazowe sprzątanie po remontach czy wydarzeniach firmowych.
                </p>
                <p>
                  Co wchodzi w zakres naszego <strong>sprzątania biurowców</strong>? Sprzątanie 
                  biurek i krzeseł, wycieranie półek i szafek, czyszczenie komputerów i sprzętu, 
                  mycie podłóg i dywanów, sprzątanie kuchni i łazienek, wynoszenie śmieci, 
                  wycieranie drzwi i klamek oraz dezynfekcja powierzchni.
                </p>
                <p>
                  Dlaczego warto wybrać naszą firmę do sprzątania biur w Warszawie? 
                  Oferujemy elastyczny grafik dostosowany do Twoich potrzeb, konkurencyjne ceny 
                  z indywidualną wyceną, profesjonalne środki czystości oraz gwarancję jakości. 
                  Pracujemy codziennie, również w weekendy i święta.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">
              Poznaj nasze pozostałe usługi
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/sprzatanie-mieszkan-warszawa" 
                className="group p-6 bg-white rounded-2xl hover:bg-primary/5 transition-all border border-blue-50"
              >
                <h3 className="font-bold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                  Sprzątanie mieszkań
                </h3>
                <p className="text-text/60 text-sm mb-4">
                  Profesjonalne sprzątanie mieszkań w Warszawie
                </p>
                <span className="text-primary font-medium text-sm flex items-center gap-2">
                  Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link 
                href="/sprzatanie-airbnb-warszawa" 
                className="group p-6 bg-white rounded-2xl hover:bg-primary/5 transition-all border border-blue-50"
              >
                <h3 className="font-bold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                  Sprzątanie Airbnb
                </h3>
                <p className="text-text/60 text-sm mb-4">
                  Sprzątanie mieszkań na wynajem w Warszawie
                </p>
                <span className="text-primary font-medium text-sm flex items-center gap-2">
                  Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link 
                href="/services/extras" 
                className="group p-6 bg-white rounded-2xl hover:bg-primary/5 transition-all border border-blue-50"
              >
                <h3 className="font-bold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                  Dodatkowe usługi
                </h3>
                <p className="text-text/60 text-sm mb-4">
                  Mycie okien, czyszczenie piekarnika i inne
                </p>
                <span className="text-primary font-medium text-sm flex items-center gap-2">
                  Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
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
                Zamów sprzątanie biura w Warszawie
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Profesjonalna firma sprzątająca - zadzwoń: +48 731 751 255
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