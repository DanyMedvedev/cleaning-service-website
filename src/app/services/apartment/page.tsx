"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Sparkles, Home, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const standardFeatures = [
  "Протирание пыли с мебели и поверхностей",
  "Протирание подоконников",
  "Уборка столов и тумбочек",
  "Пылесос ковров и пола",
  "Мытьё пола",
  "Вынос мусора",
  "Кухня: столешница, раковина, фасады, техника снаружи, плита",
  "Ванная: унитаз, раковина, ванна/душ, зеркала",
];

const deepFeatures = [
  "Всё из стандартной уборки",
  "Мытьё кухни полностью (внутри и снаружи)",
  "Чистка духовки внутри",
  "Чистка холодильника внутри",
  "Мытьё шкафов внутри",
  "Чистка ванной и плитки",
  "Пыль в труднодоступных местах",
  "Плинтусы и двери",
  "Глубокая мойка пола",
];

const pricing = {
  standard: [
    { rooms: "1-комнатная", price: "170 zł" },
    { rooms: "2-комнатная", price: "250 zł" },
    { rooms: "3-комнатная", price: "300 zł" },
    { rooms: "4-комнатная", price: "400 zł" },
  ],
  deep: [
    { rooms: "1-комнатная", price: "510 zł" },
    { rooms: "2-комнатная", price: "620 zł" },
    { rooms: "3-комнатная", price: "770 zł" },
    { rooms: "4-комнатная", price: "900 zł" },
  ],
};

export default function ApartmentServicePage() {
  const { t } = useTranslation();
  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-20 relative h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600" 
            alt="Уборка квартир"
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
                  <Home className="w-6 h-6 text-accent" />
                  <span className="text-accent font-bold uppercase tracking-widest text-sm">Услуги</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Уборка квартир
                </h1>
                <p className="text-white/80 font-medium text-xl mb-8">
                  Профессиональная уборка квартир в Варшаве. Стандартная и генеральная уборка для комфортного проживания.
                </p>
                <Link 
                  href="/order" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
                >
                  Заказать уборку
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
                Что входит в уборку
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                Мы делаем всё, чтобы ваш дом сиял чистотой
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
                  <span className="text-text font-medium">{feature}</span>
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
                    <h2 className="text-2xl font-bold text-text">Стандартная уборка</h2>
                    <p className="text-text/60">Для регулярного поддержания чистоты</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {pricing.standard.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-blue-50">
                      <span className="font-medium text-text">{item.rooms}</span>
                      <span className="font-black text-2xl text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
                <h3 className="font-bold text-text mb-4">Что входит:</h3>
                <ul className="space-y-3">
                  {standardFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/order" 
                  className="mt-8 w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all block text-center"
                >
                  Заказать стандартную уборку
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
                  ПОПУЛЯРНО
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text">Генеральная уборка</h2>
                    <p className="text-text/60">Для тщательной очистки всего помещения</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {pricing.deep.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-blue-50">
                      <span className="font-medium text-text">{item.rooms}</span>
                      <span className="font-black text-2xl text-accent">{item.price}</span>
                    </div>
                  ))}
                </div>
                <h3 className="font-bold text-text mb-4">Что входит:</h3>
                <ul className="space-y-3">
                  {deepFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/order" 
                  className="mt-8 w-full py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all block text-center"
                >
                  Заказать генеральную уборку
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
                Почему выбирают нас
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                Мы гарантируем качественную уборку и индивидуальный подход к каждому клиенту
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Опытные клинеры", desc: "Профессиональные и проверенные специалисты" },
                { title: "Качественная химия", desc: "Безопасные и эффективные средства" },
                { title: "Гарантия качества", desc: "Переделаем бесплатно, если что-то не понравится" },
                { title: "Удобное время", desc: "Работаем с 8:00 до 18:00, без выходных" },
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

        <Footer />
      </main>
    </>
  );
}
