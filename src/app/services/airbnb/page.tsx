"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Building2, ArrowRight, Sparkles } from "lucide-react";

const features = [
  "Полная дезинфекция всех поверхностей",
  "Уборка всех комнат",
  "Смена постельного белья",
  "Свежие полотенца для гостей",
  "Подготовка к заселению гостей",
  "Уборка кухни и ванной",
  "Протирание пыли",
  "Мытьё полов",
];

const pricing = [
  { type: "Студия", priceMin: "120", priceMax: "180", desc: "до 30 м²" },
  { type: "1 спальня", priceMin: "150", priceMax: "220", desc: "30-50 м²" },
  { type: "2 спальни", priceMin: "200", priceMax: "300", desc: "50-80 м²" },
];

export default function AirbnbServicePage() {
  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-20 relative h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1520637836862-4d197d17c155?auto=format&fit=crop&q=80&w=1600" 
            alt="Клининг для Airbnb"
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
                  Клининг для Airbnb
                </h1>
                <p className="text-white/80 font-medium text-xl mb-8">
                  Уборка для сдачи в аренду. Быстрая и качественная подготовка помещений к заселению гостей.
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
                Мы делаем всё, чтобы ваши гости чувствовали себя как дома
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
                  <span className="text-text font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Стоимость уборки
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">
                Точная цена зависит от размера помещения и количества комнат
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {pricing.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-background rounded-3xl p-8 text-center border border-blue-50 hover:border-primary/30 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-bold text-text mb-2">{item.type}</h3>
                  <p className="text-text/60 text-sm mb-4">{item.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-primary">{item.priceMin}</span>
                    <span className="text-text/60"> - </span>
                    <span className="text-4xl font-black text-primary">{item.priceMax}</span>
                    <span className="text-text/60 ml-1">zł</span>
                  </div>
                  <Link 
                    href="/order" 
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all block"
                  >
                    Выбрать
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Почему арендодатели выбирают нас
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Быстрый выезд", 
                  desc: "Приедем в тот же день или на следующий после вашего запроса",
                  icon: Sparkles 
                },
                { 
                  title: "Честные цены", 
                  desc: "Никаких скрытых платежей - называем точную цену заранее",
                  icon: Check 
                },
                { 
                  title: "Для бизнеса", 
                  desc: "Работаем с большим количеством квартир, предлагаем скидки",
                  icon: Building2 
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-blue-50"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4" />
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
