"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Building2, ArrowRight, Sparkles } from "lucide-react";

const standardFeatures = [
  "Уборка рабочих мест",
  "Дезинфекция общих зон",
  "Вывоз мусора",
  "Мытьё полов и ковров",
  "Чистка санузлов",
  "Уборка кухни/зоны отдыха",
  "Протирание поверхностей",
  "Чистка дверей и ручек",
];

const deepFeatures = [
  "Всё из стандартной уборки",
  "Глубокая чистка ковров",
  "Мытьё окон внутри",
  "Чистка вентиляционных решёток",
  "Уборка после ремонта",
  "Удаление строительной пыли",
  "Чистка радиаторов",
  "Полировка мебели",
];

export default function OfficeServicePage() {
  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-20 relative h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
            alt="Уборка офисов"
            className="absolute inset-0 w-full h-full object-cover"
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
                  <span className="text-accent font-bold uppercase tracking-widest text-sm">Услуги</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Уборка офисов
                </h1>
                <p className="text-white/80 font-medium text-xl mb-8">
                  Поддержание чистоты в рабочих пространствах. Регулярная и после ремонта уборка.
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

        {/* Pricing Section */}
        <section className="py-20 bg-background">
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
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-primary">от 5</span>
                    <span className="text-text/60 text-xl">zł/м²</span>
                  </div>
                  <p className="text-text/60 mt-2">Минимальный заказ: 50 м²</p>
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
                  ПОСЛЕ РЕМОНТА
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text">Генеральная уборка</h2>
                    <p className="text-text/60">После ремонта и строительства</p>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-accent">от 11</span>
                    <span className="text-text/60 text-xl">zł/м²</span>
                  </div>
                  <p className="text-text/60 mt-2">Точная цена после осмотра</p>
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
                Почему бизнес выбирает нас
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                Мы понимаем потребности бизнеса и предлагаем гибкие условия
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Работаем вечером", desc: "Уборка после закрытия офиса" },
                { title: "Договор", desc: "Заключаем договор на регулярное обслуживание" },
                { title: "Контроль", desc: "Отчётность после каждой уборки" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-6 bg-background rounded-2xl"
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
