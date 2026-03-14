"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BadgePercent, Package, Wallet } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: BadgePercent,
      title: t('features.fixed_price.title'),
      desc: t('features.fixed_price.desc'),
    },
    {
      icon: Wallet,
      title: t('features.payment.title'),
      desc: t('features.payment.desc'),
    },
    {
      icon: ShieldCheck,
      title: t('features.insured.title'),
      desc: t('features.insured.desc'),
    },
    {
      icon: Package,
      title: t('features.supplies.title'),
      desc: t('features.supplies.desc'),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="p-6 md:p-7 rounded-3xl bg-background border border-blue-50/80 hover:border-primary/30 hover:shadow-lg hover:shadow-blue-100/60 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-text mb-4">
                {feature.title}
              </h3>
              <p className="text-sm text-text/60 font-medium leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
