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
    id: 'regular',
    title: 'Regular Cleaning',
    description: 'Perfect for routine maintenance. Includes dusting, vacuuming, mopping, and basic kitchen/bathroom cleaning.',
    icon: Home,
    price: 'From 139 PLN',
    features: ['Dusting all surfaces', 'Floor vacuuming & mopping', 'Kitchen & Bathroom cleaning'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    description: 'A thorough, intensive refresh for your home. Targets neglected areas and removes stubborn dirt.',
    icon: Sparkle,
    price: 'From 249 PLN',
    features: ['Steam cleaning carpets', 'Deep grout scrubbing', 'Inside cabinets & appliances'],
    image: '/images/deep-cleaning-card.png'
  },
  {
    id: 'move',
    title: 'Move-out Cleaning',
    description: 'Ensures your old or new home is spotless. Designed to meet landlord inspection standards.',
    icon: Truck,
    price: 'From 349 PLN',
    features: ['Full disinfection', 'Inside all cupboards', 'Window washing included'],
    image: '/images/move-out-cleaning.png'
  },
  {
    id: 'office',
    title: 'Office Cleaning',
    description: 'Keep your workspace productive and professional. Custom schedules for businesses of all sizes.',
    icon: Building2,
    price: 'Custom Quote',
    features: ['Desk & equipment cleaning', 'Common areas sanitation', 'Waste management'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
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
            We offer specialized solutions for every need, from one-room apartments to large commercial spaces.
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
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary shadow-lg">
                  <service.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-text/60 font-medium leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-bold text-text/80">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-blue-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{service.price}</span>
                  <Link href={`/services/${service.id}`} className="text-xs font-black uppercase tracking-widest text-text hover:text-primary transition-colors">
                    Details →
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
