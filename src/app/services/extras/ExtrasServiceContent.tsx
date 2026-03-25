"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, ArrowRight, ChefHat, Archive, Square, Home } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const extras = [
  {
    id: "oven",
    price: "45 zł",
    icon: ChefHat,
  },
  {
    id: "fridge",
    price: "40 zł",
    icon: Archive,
  },
  {
    id: "windows",
    price: "40 zł/okno",
    icon: Square,
  },
  {
    id: "balcony",
    price: "35 zł",
    icon: Home,
  },
];

// JSON-LD Structured Data for Local SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "name": "CzystyDom",
  "description": "Dodatkowe usługi sprzątania w Warszawie - mycie okien, czyszczenie piekarnika, lodówki, sprzątanie balkonu",
  "url": "https://czystydom.online/dodatkowe-uslugi-sprzatania-warszawa",
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
  "priceRange": "35-45 PLN",
  "openingHours": "Mo-Su 08:00-20:00"
};

export default function ExtrasServiceContent() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

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
            src="/images/additional-services.png"
            alt="Dodatkowe usługi sprzątania Warszawa - mycie okien, piekarnika, lodówki"
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
                  {t('services_pages.extras.hero.title')} Warszawa
                </h1>
                <p className="text-white/80 font-medium text-xl mb-8">
                  {t('services_pages.extras.hero.subtitle')}
                </p>
                <Link 
                  href="/order" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
                >
                  {t('services_pages.extras.hero.cta')}
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
                {t('services_pages.extras.included.title')}
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                {t('services_pages.extras.included.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {extras.flatMap((extra) => {
                const features = t('services_pages.extras.' + extra.id + '.features');
                if (!Array.isArray(features)) return [];
                return (features as string[]).map((feature, fIdx) => (
                  <motion.div
                    key={`${extra.id}-${fIdx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: fIdx * 0.05 }}
                    className="bg-white rounded-2xl p-5 flex items-center gap-3 shadow-sm border border-blue-50"
                  >
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-text font-medium">{feature}</span>
                  </motion.div>
                ));
              })}
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
                Dodatkowe usługi sprzątania w Warszawie
              </h2>
              <div className="prose prose-lg max-w-none text-text/80">
                <p>
                  Szukasz dodatkowych usług sprzątania w Warszawie? Oferujemy szeroki zakres 
                  specjalistycznych usług, które uzupełnią regularne sprzątanie Twojego mieszkania 
                  lub biura. Nasza firma to gwarancja profesjonalizmu i wysokiej jakości.
                </p>
                <p>
                  Co oferujemy? <strong>Mycie okien</strong> (40 zł/okno) - kompleksowe czyszczenie 
                  szyb, ram i parapetów wewnątrz. <strong>Czyszczenie piekarnika</strong> (45 zł) - 
                  pełne odtłuszczenie wnętrza, rusztów i blach. <strong>Czyszczenie lodówki</strong> 
                  (40 zł) - mycie wszystkich półek, szuflad i usunięcie nieprzyjemnych zapachów.
                </p>
                <p>
                  Oferujemy również <strong>sprzątanie balkonu lub loggii</strong> (35 zł) - mycie 
                  podłogi, czyszczenie poręczy i wynoszenie śmieci. Wszystkie usługi wykonywane są 
                  przy użyciu profesjonalnych środków czystości, które są bezpieczne dla Twojego 
                  zdrowia i środowiska.
                </p>
                <p>
                  Dlaczego warto zamówić dodatkowe usługi sprzątania w Warszawie? Regularne 
                  czyszczenie piekarnika, lodówki i okien przedłuża żywotność urządzeń i utrzymuje 
                  je w idealnym stanie. Zadzwoń do nas i zamów dodatkowe usługi już dziś!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Extras Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                {t('services_pages.extras.included.title')}
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                {t('services_pages.extras.included.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {extras.map((extra, idx) => (
                <motion.div
                  key={extra.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <extra.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">
                    {t('services_pages.extras.' + extra.id + '.title')}
                  </h3>
                  <p className="text-text/60 text-sm mb-4">
                    {t('services_pages.extras.' + extra.id + '.description')}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary">{extra.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/order" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
              >
                {t('services_pages.extras.hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">
              Poznaj nasze pozostałe usługi
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/sprzatanie-mieszkan-warszawa" 
                className="group p-6 bg-background rounded-2xl hover:bg-primary/5 transition-all border border-blue-50"
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
                className="group p-6 bg-background rounded-2xl hover:bg-primary/5 transition-all border border-blue-50"
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
                href="/sprzatanie-biur-warszawa" 
                className="group p-6 bg-background rounded-2xl hover:bg-primary/5 transition-all border border-blue-50"
              >
                <h3 className="font-bold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                  Sprzątanie biur
                </h3>
                <p className="text-text/60 text-sm mb-4">
                  Kompleksowe usługi sprzątania biurowców
                </p>
                <span className="text-primary font-medium text-sm flex items-center gap-2">
                  Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}