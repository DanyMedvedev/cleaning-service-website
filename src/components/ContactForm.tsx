"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Sparkles, Phone, User, 
  Refrigerator, Microwave, Layout, 
  Wind, Trash2, Home, Send, CheckCircle2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from '@/lib/i18n';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Country codes with flags
const COUNTRIES = [
  { code: 'PL', name: 'Poland', flag: '🇵🇱', dialCode: '+48' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '+7' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', dialCode: '+370' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', dialCode: '+371' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', dialCode: '+372' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', dialCode: '+420' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', dialCode: '+421' },
];

const SERVICES = [
  { id: 'standard', label: 'Standard cleaning', icon: Home, price: null },
  { id: 'deep', label: 'Deep cleaning', icon: Sparkles, price: 100 },
  { id: 'fridge', label: 'Inside Fridge', icon: Refrigerator, price: 40 },
  { id: 'oven', label: 'Inside Oven', icon: Microwave, price: 40 },
  { id: 'cabinets', label: 'Inside Cabinets', icon: Layout, price: 50 },
  { id: 'windows', label: 'Windows', icon: Layout, price: 60 },
  { id: 'ironing', label: 'Ironing', icon: Wind, price: 50 },
  { id: 'balcony', label: 'Balcony', icon: Trash2, price: 40 },
];

export default function ContactForm() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; services?: string }>({});

  // Detect country based on phone number
  useEffect(() => {
    if (phone.startsWith('+')) {
      const country = COUNTRIES.find(c => phone.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [phone]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; services?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = t('contact_form.errors.name_required');
    }
    
    if (!phone.trim()) {
      newErrors.phone = t('contact_form.errors.phone_required');
    } else if (phone.length < 9) {
      newErrors.phone = t('contact_form.errors.phone_invalid');
    }
    
    if (selectedServices.length === 0) {
      newErrors.services = t('contact_form.errors.services_required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setIsSubmitted(true);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and + sign
    if (/^[\d+]*$/.test(value)) {
      setPhone(value);
    }
  };

  const selectCountry = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setPhone(country.dialCode);
    setShowCountryDropdown(false);
  };

  if (isSubmitted) {
    return (
      <section className="relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-sm rounded-[32px] shadow-2xl shadow-blue-200/60 border border-blue-50 p-6 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 bg-accent/10 rounded-full flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-12 h-12 text-accent" />
              </motion.div>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-text mb-4"
            >
              {t('contact_form.success.title')}
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-text/70 font-medium"
            >
              {t('contact_form.success.message')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex justify-center gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="w-3 h-3 bg-accent rounded-full"
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/95 backdrop-blur-sm rounded-[32px] border border-blue-50 p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-text/80 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {t('contact_form.name_label')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('contact_form.name_placeholder')}
                  className={cn(
                    "w-full px-6 py-4 rounded-2xl border-2 bg-white/80 backdrop-blur-sm text-text placeholder:text-text/30 font-medium transition-all outline-none",
                    errors.name 
                      ? "border-red-300 focus:border-red-400" 
                      : "border-blue-50 focus:border-primary"
                  )}
                />
                {name && !errors.name && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 font-medium"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-text/80 uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                {t('contact_form.phone_label')}
              </label>
              <div className="relative">
                <div className="flex">
                  {/* Country Selector */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="flex items-center gap-2 px-4 py-4 rounded-l-2xl border-2 border-r-0 border-blue-50 bg-blue-50/30 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span className="text-sm font-bold text-text">{selectedCountry.dialCode}</span>
                      <svg className="w-4 h-4 text-text/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <AnimatePresence>
                      {showCountryDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-blue-200/60 border border-blue-50 z-50 max-h-64 overflow-y-auto"
                        >
                          {COUNTRIES.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => selectCountry(country)}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left",
                                selectedCountry.code === country.code && "bg-primary/5"
                              )}
                            >
                              <span className="text-xl">{country.flag}</span>
                              <span className="text-sm font-medium text-text">{country.name}</span>
                              <span className="text-sm text-text/50 ml-auto">{country.dialCode}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Phone Input */}
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={t('contact_form.phone_placeholder')}
                    className={cn(
                      "flex-1 px-6 py-4 rounded-r-2xl border-2 border-l-0 bg-white/80 backdrop-blur-sm text-text placeholder:text-text/30 font-medium transition-all outline-none",
                      errors.phone 
                        ? "border-red-300 focus:border-red-400" 
                        : "border-blue-50 focus:border-primary"
                    )}
                  />
                </div>
                {phone && !errors.phone && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
              {errors.phone && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 font-medium"
                >
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Services Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-text/80 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {t('contact_form.services_label')}
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={cn(
                      "group relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300",
                      selectedServices.includes(service.id) 
                        ? "bg-primary border-primary shadow-lg shadow-primary/20" 
                        : "bg-white border-blue-50 hover:border-primary/30 hover:bg-blue-50/30"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                      selectedServices.includes(service.id) ? "bg-white/20" : "bg-blue-50 group-hover:bg-white"
                    )}>
                      <service.icon className={cn(
                        "w-5 h-5",
                        selectedServices.includes(service.id) ? "text-white" : "text-primary"
                      )} />
                    </div>
                    <span className={cn(
                      "text-xs font-bold text-center",
                      selectedServices.includes(service.id) ? "text-white" : "text-text"
                    )}>
                      {service.label}
                    </span>
                    {selectedServices.includes(service.id) && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white stroke-[4]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {errors.services && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 font-medium"
                >
                  {errors.services}
                </motion.p>
              )}
            </div>

            {/* Phone Button */}
            <a
              href="tel:+48731751255"
              className="w-full py-4 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group text-lg"
            >
              <Phone className="w-5 h-5" />
              +48 731 751 255
            </a>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-3 group text-lg"
            >
              {t('contact_form.submit')}
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <p className="text-xs text-text/40 text-center">
              {t('contact_form.privacy')}
            </p>
          </form>
        </motion.div>
    </>
  );
}
