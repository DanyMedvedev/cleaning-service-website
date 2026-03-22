"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, ArrowRight, ChefHat, Archive, Square, Home } from "lucide-react";

const extras = [
  {
    id: "oven",
    title: "Чистка духовки",
    price: "45 zł",
    description: "Полная чистка духовки внутри и снаружи",
    features: [
      "Чистка внутренних поверхностей",
      "Чистка противней и решёток",
      "Удаление жира и нагара",
      "Полировка стекла",
    ],
    icon: ChefHat,
  },
  {
    id: "fridge",
    title: "Чистка холодильника",
    price: "40 zł",
    description: "Полная чистка холодильника внутри",
    features: [
      "Чистка всех полок",
      "Чистка ящиков для овощей",
      "Чистка дверных карманов",
      "Удаление неприятных запахов",
    ],
    icon: Archive,
  },
  {
    id: "windows",
    title: "Мытьё окон",
    price: "40 zł/окно",
    description: "Мытьё окон внутри",
    features: [
      "Мытьё стёкол",
      "Чистка рам",
      "Чистка подоконников",
      "Удаление разводов",
    ],
    icon: Square,
  },
  {
    id: "balcony",
    title: "Уборка балкона",
    price: "35 zł",
    description: "Полная уборка балкона или лоджии",
    features: [
      "Мытьё пола",
      "Чистка перил",
      "Уборка полок",
      "Вынос мусора",
    ],
    icon: Home,
  },
];

export default function ExtrasServicePage() {
  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-20 relative h-[500px]">
          <img 
            src="/images/deep-cleaning-card.png" 
            src="/images/additional-services.png"
            alt="Дополнительные услуги"
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
                  <Square className="w-6 h-6 text-accent" />
                  <span className="text-accent font-bold uppercase tracking-widest text-sm">Услуги</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Дополнительные услуги
                </h1>
                <p className="text-white/80 font-medium text-xl mb-8">
                  Дополните основную уборку специальными услугами для полного комфорта.
                </p>
                <Link 
                  href="/order" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
                >
                  Заказать с дополнительными услугами
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

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
                Доступные услуги
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                Выберите дополнительные услуги при заказе уборки квартиры или офиса
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {extras.map((extra, idx) => (
                <motion.div
                  key={extra.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <extra.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text">{extra.title}</h3>
                        <p className="text-text/60 text-sm">{extra.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-primary">{extra.price}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {extra.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm text-text/80">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/order" 
                    className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all block text-center"
                  >
                    Добавить к заказу
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-3xl p-8 md:p-12 border border-blue-50"
            >
              <h2 className="text-2xl font-bold text-text mb-6">
                Как заказать дополнительные услуги?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl mb-4">1</div>
                  <h3 className="font-bold text-text mb-2">Выберите услугу</h3>
                  <p className="text-text/60 text-sm">Добавьте нужные услуги при оформлении заказа на уборку</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl mb-4">2</div>
                  <h3 className="font-bold text-text mb-2">Выберите время</h3>
                  <p className="text-text/60 text-sm">Укажите удобную дату и время для проведения работ</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl mb-4">3</div>
                  <h3 className="font-bold text-text mb-2">Подтвердите заказ</h3>
                  <p className="text-text/60 text-sm">Мы свяжемся с вами для подтверждения деталей</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link 
                  href="/order" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
                >
                  Оформить заказ
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
