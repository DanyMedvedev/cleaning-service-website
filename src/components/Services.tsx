"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  Sparkle, 
  Truck, 
  Building2, 
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const services = [
  {
    id: 'apartment',
    titleKey: 'services_cards.apartment.title',
    descriptionKey: 'services_cards.apartment.description',
    priceKey: 'services_cards.apartment.price',
    features: ['services_cards.apartment.feature1', 'services_cards.apartment.feature2', 'services_cards.apartment.feature3'],
    icon: Home,
    image: '/images/flats-cleaning.png'
  },
  {
    id: 'airbnb',
    titleKey: 'services_cards.airbnb.title',
    descriptionKey: 'services_cards.airbnb.description',
    priceKey: 'services_cards.airbnb.price',
    features: ['services_cards.airbnb.feature1', 'services_cards.airbnb.feature2', 'services_cards.airbnb.feature3'],
    icon: Sparkle,
    image: '/images/deep-cleaning-card.png'
  },
  {
    id: 'extras',
    titleKey: 'services_cards.extras.title',
    descriptionKey: 'services_cards.extras.description',
    priceKey: 'services_cards.extras.price',
    features: ['services_cards.extras.feature1', 'services_cards.extras.feature2', 'services_cards.extras.feature3'],
    icon: Truck,
    image: '/images/additional-services.png'
  },
  {
    id: 'office',
    titleKey: 'services_cards.office.title',
    descriptionKey: 'services_cards.office.description',
    priceKey: 'services_cards.office.price',
    features: ['services_cards.office.feature1', 'services_cards.office.feature2', 'services_cards.office.feature3'],
    icon: Building2,
    image: '/images/office-cleaning.png'
  }
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              {t('services.title')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-text"
            >
              {t('services.subtitle')}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-text/60 font-medium max-w-sm"
          >
            {t('services.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-background rounded-3xl border border-blue-50 hover:border-primary/25 hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary shadow-lg">
                  <service.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm text-text/60 font-medium leading-relaxed mb-8 flex-grow">
                  {t(service.descriptionKey)}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-bold text-text/80">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      {t(feature)}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-blue-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{t(service.priceKey)}</span>
                  <Link href={`/services/${service.id}`} className="text-xs font-black uppercase tracking-widest text-text hover:text-primary transition-colors">
                    {t('services_cards.details')} →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
