"use client";

import React, { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  Building2,
  Building,
  Sparkles,
  ChefHat,
  Archive,
  Square,
  Minus,
  Plus,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Country codes with flags
const COUNTRIES = [
  { code: 'PL', name: 'Poland', flag: '🇵🇱', dialCode: '+48' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '+7' },
];

// New pricing structure
type PropertyType = "apartment" | "office" | "airbnb";
type CleaningType = "standard" | "deep";

const PRICING = {
  apartment: {
    standard: {
      1: 170,  // 1-room
      2: 250,  // 2-room
      3: 300,  // 3-room
      4: 400,  // 4-room
    },
    deep: {
      1: 510,  // 1-room
      2: 620,  // 2-room
      3: 770,  // 3-room
      4: 900,  // 4-room
    },
  },
  office: {
    standardRate: { min: 5, max: 7 }, // per m²
    deepRate: { min: 11, max: 14 },   // per m²
  },
  airbnb: {
    studio: { min: 120, max: 180 },
    "1bedroom": { min: 150, max: 220 },
    "2bedroom": { min: 200, max: 300 },
  },
  extras: {
    oven: { label: "Oven (inside)", price: 45 },
    fridge: { label: "Refrigerator (inside)", price: 40 },
    windows: { label: "Window cleaning", price: 40 },
    balcony: { label: "Balcony", price: 35 },
  } as Record<string, { label: string; price: number }>,
};

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function formatFullDate(d: Date) {
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

function OrderPageContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const serviceParam = searchParams?.get("service");

  // Property type selection
  const [propertyType, setPropertyType] = useState<PropertyType>("apartment");
  
  // For apartments: number of rooms
  const [rooms, setRooms] = useState(1);
  
  // For apartments: cleaning type (standard or deep)
  const [cleaningType, setCleaningType] = useState<CleaningType>("standard");
  
  // For offices: square meters
  const [squareMeters, setSquareMeters] = useState(50);
  
  // For airbnb: bedroom type
  const [airbnbType, setAirbnbType] = useState<"studio" | "1bedroom" | "2bedroom">("1bedroom");
  
  // Selected extras
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({
    oven: 0,
    fridge: 0,
    windows: 0,
    balcony: 0,
  });

  // Date and time
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(() => startOfDay(addDays(new Date(), 1)));
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[4]);

  // Address and contact
  const [city, setCity] = useState("Warsaw");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Service info data
  const serviceInfo: Record<string, {
    title: string;
    description: string;
    image: string;
    features: string[];
  }> = {
    apartment: {
      title: "Уборка квартир",
      description: "Профессиональная уборка квартир в Варшаве. Стандартная и генеральная уборка для комфортного проживания.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
      features: [
        "Протирание пыли с мебели и поверхностей",
        "Протирание подоконников",
        "Уборка столов и тумбочек",
        "Пылесос ковров и пола",
        "Мытьё пола",
        "Вынос мусора",
        "Кухня: столешница, раковина, фасады, техника, плита",
        "Ванная: унитаз, раковина, ванна/душ, зеркала"
      ]
    },
    airbnb: {
      title: "Клининг для апартаментов / Airbnb",
      description: "Уборка для сдачи в аренду. Быстрая и качественная подготовка помещений к заселению гостей.",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c155?auto=format&fit=crop&q=80&w=800",
      features: [
        "Полная дезинфекция всех поверхностей",
        "Уборка всех комнат",
        "Смена постельного белья",
        "Полотенца для гостей",
        "Подготовка к заселению гостей",
        "Уборка кухни и ванной"
      ]
    },
    office: {
      title: "Уборка офисов",
      description: "Поддержание чистоты в рабочих пространствах. Регулярная и после ремонта уборка.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      features: [
        "Уборка рабочих мест",
        "Дезинфекция общих зон",
        "Вывоз мусора",
        "Мытьё полов и ковров",
        "Чистка санузлов",
        "Кухня/зона отдыха"
      ]
    },
    extras: {
      title: "Дополнительные услуги",
      description: "Дополните основную уборку специальными услугами для полного комфорта.",
      image: "/images/deep-cleaning-card.png",
      features: [
        "Чистка духовки внутри - 45 zł",
        "Чистка холодильника внутри - 40 zł",
        "Мытьё окон - 40 zł/окно",
        "Уборка балкона - 35 zł"
      ]
    }
  };

  const currentServiceInfo = serviceInfo[serviceParam || ''];

  useEffect(() => {
    if (!searchParams) return;
    const r = Number(searchParams.get("rooms"));
    if (Number.isFinite(r) && r > 0) setRooms(Math.min(4, Math.max(1, Math.floor(r))));
    
    // Set property type based on service parameter
    const service = searchParams.get("service");
    if (service === "apartment") setPropertyType("apartment");
    else if (service === "airbnb") setPropertyType("airbnb");
    else if (service === "office") setPropertyType("office");
  }, [searchParams]);

  // Detect country based on phone number
  useEffect(() => {
    if (phone.startsWith('+')) {
      const country = COUNTRIES.find(c => phone.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [phone]);

  const selectCountry = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setPhone('');
    setShowCountryDropdown(false);
  };

  // Calculate base price
  const basePrice = useMemo(() => {
    if (propertyType === "apartment") {
      const prices = PRICING.apartment[cleaningType];
      return prices[rooms as keyof typeof prices] || prices[1];
    } else if (propertyType === "office") {
      const rate = cleaningType === "deep" 
        ? PRICING.office.deepRate 
        : PRICING.office.standardRate;
      // Use average rate
      return Math.round(squareMeters * ((rate.min + rate.max) / 2));
    } else if (propertyType === "airbnb") {
      const prices = PRICING.airbnb[airbnbType];
      // Use average price
      return Math.round((prices.min + prices.max) / 2);
    }
    return 0;
  }, [propertyType, rooms, cleaningType, squareMeters, airbnbType]);

  // Calculate extras total
  const extrasTotal = useMemo(() => {
    return Object.entries(selectedExtras).reduce((sum, [id, qty]) => {
      const price = PRICING.extras[id as keyof typeof PRICING.extras]?.price ?? 0;
      return sum + qty * price;
    }, 0);
  }, [selectedExtras]);

  // Total price
  const total = basePrice + extrasTotal;

  const weekDays = useMemo(() => {
    const start = startOfDay(addDays(new Date(), 1 + weekOffset * 7));
    return Array.from({ length: 7 }, (_, i) => startOfDay(addDays(start, i)));
  }, [weekOffset]);

  const toggleExtraCheck = (id: string) => {
    setSelectedExtras((prev) => ({ ...prev, [id]: prev[id] ? 0 : 1 }));
  };

  const handleSubmit = async () => {
    if (!name || !phone) {
      return;
    }

    setIsLoading(true);

    try {
      await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType:    "Большая",
          name:        name,
          phone:       phone,
          objectType:  propertyType,
          details:     propertyType === "office" ? squareMeters : propertyType === "airbnb" ? airbnbType : rooms,
          cleaningType: cleaningType,
          windows:     selectedExtras.windows,
          fridge:      selectedExtras.fridge > 0,
          oven:        selectedExtras.oven > 0,
          wardrobe:    false,
          ironing:     false,
          balcony:     selectedExtras.balcony > 0,
          visitDate:   selectedDate.toISOString().split("T")[0],
          visitTime:   selectedTime,
          tsaddress:   `${city}, ${street} ${houseNumber}${apartmentNumber ? '/' + apartmentNumber : ''}, ${postcode}`,
          comment:     notes,
          price:       total,
        }),
      });

      setIsSubmitted(true);

    } catch (err) {
      console.error("Ошибка:", err);
      setIsSubmitted(true); // всё равно показываем успех
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-cream to-secondary/5 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-32 h-32 mx-auto mb-8 bg-accent/10 rounded-full flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Check className="w-16 h-16 text-accent" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-text mb-4"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            Спасибо!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-text/70 font-medium mb-8"
          >
            Мы свяжемся с вами в ближайшее время для подтверждения записи
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                className="w-3 h-3 bg-accent rounded-full"
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-blue-200/60"
            >
              На главную
            </a>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen">
        <Navbar />

        {/* Service Info Banner */}
        {currentServiceInfo && (
          <div className="pt-20 relative h-64">
            <img 
              src={currentServiceInfo.image} 
              alt={currentServiceInfo.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black text-white mb-4"
                  >
                    {currentServiceInfo.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/80 font-medium text-lg mb-6"
                  >
                    {currentServiceInfo.description}
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-3"
                  >
                    {currentServiceInfo.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Check className="w-4 h-4 text-accent" />
                        <span className="text-white text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!currentServiceInfo && (
        <section className="pt-24 pb-12 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-3">
                  {t('order.constructor')}
                </p>
                <h1 className="text-4xl md:text-5xl font-black text-text">
                  {t('order.cleaning_in')} <span className="text-primary">{city}</span>
                </h1>
                <p className="text-text/60 font-medium mt-4">
                  {t('order.configure_cleaning')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 border border-blue-50 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-semibold text-text">{t('order.supplies_included')}</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/60 border border-blue-50">
                  <span className="text-sm font-semibold text-text/70">{t('order.no_prepayment')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        <section className="pb-24 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left column - Configuration */}
              <div className="lg:col-span-8 space-y-8">
                {/* Contact Info */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                  <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                      1
                    </span>
                    {t('order.contact_details')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-2">{t('order.name')}</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('order.name_placeholder')}
                        className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-2">{t('order.phone_number')}</label>
                      <div className="relative">
                        <div className="flex">
                          {/* Country Selector */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                              className="flex items-center gap-1 px-3 py-3 rounded-l-xl border-2 border-r-0 border-blue-100 bg-blue-50/30 hover:bg-blue-50 transition-colors"
                            >
                              <span className="text-lg">{selectedCountry.flag}</span>
                              <span className="text-sm font-bold text-text hidden sm:inline">{selectedCountry.dialCode}</span>
                              <svg className="w-3 h-3 text-text/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            
                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-blue-200/60 border border-blue-50 z-50 max-h-60 overflow-y-auto">
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
                              </div>
                            )}
                          </div>
                          
                          {/* Phone Input */}
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              if (/^[\d+]*$/.test(e.target.value)) {
                                setPhone(e.target.value);
                              }
                            }}
                            placeholder="123 456 789"
                            className="flex-1 px-4 py-3 rounded-r-xl border-2 border-l-0 border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-w-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Type Selection */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                  <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                      2
                    </span>
                    {t('order.property_type')}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => setPropertyType("apartment")}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3",
                        propertyType === "apartment"
                          ? "border-primary bg-primary/5"
                          : "border-blue-100 hover:border-primary/30"
                      )}
                    >
                      <Home className={cn("w-8 h-8", propertyType === "apartment" ? "text-primary" : "text-text/50")} />
                      <span className={cn("font-bold", propertyType === "apartment" ? "text-primary" : "text-text")}>
                        {t('order.apartment')}
                      </span>
                    </button>
                    <button
                      onClick={() => setPropertyType("office")}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3",
                        propertyType === "office"
                          ? "border-primary bg-primary/5"
                          : "border-blue-100 hover:border-primary/30"
                      )}
                    >
                      <Building2 className={cn("w-8 h-8", propertyType === "office" ? "text-primary" : "text-text/50")} />
                      <span className={cn("font-bold", propertyType === "office" ? "text-primary" : "text-text")}>
                        Office
                      </span>
                    </button>
                    <button
                      onClick={() => setPropertyType("airbnb")}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3",
                        propertyType === "airbnb"
                          ? "border-primary bg-primary/5"
                          : "border-blue-100 hover:border-primary/30"
                      )}
                    >
                      <Building className={cn("w-8 h-8", propertyType === "airbnb" ? "text-primary" : "text-text/50")} />
                      <span className={cn("font-bold", propertyType === "airbnb" ? "text-primary" : "text-text")}>
                        Airbnb
                      </span>
                    </button>
                  </div>
                </div>

                {/* Apartment Options */}
                {propertyType === "apartment" && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                    <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                        2
                      </span>
                    </h2>

                    {/* Number of Rooms */}
                    <div className="mb-8">
                      <span className="font-bold text-text/80 mb-4 block">{t('order_form.number_of_rooms')}</span>
                      <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((room) => (
                          <button
                            key={room}
                            onClick={() => setRooms(room)}
                            className={cn(
                              "p-4 rounded-2xl border-2 transition-all",
                              rooms === room
                                ? "border-primary bg-primary/5"
                                : "border-blue-100 hover:border-primary/30"
                            )}
                          >
                            <span className={cn("block text-lg font-bold", rooms === room ? "text-primary" : "text-text")}>
                              {room}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cleaning Type */}
                    <div>
                      <span className="font-bold text-text/80 mb-4 block">{t('order_form.type_of_cleaning')}</span>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setCleaningType("standard")}
                          className={cn(
                            "p-6 rounded-2xl border-2 transition-all text-left",
                            cleaningType === "standard"
                              ? "border-primary bg-primary/5"
                              : "border-blue-100 hover:border-primary/30"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Check className={cn("w-5 h-5", cleaningType === "standard" ? "text-primary" : "text-text/30")} />
                            <span className={cn("font-bold text-lg", cleaningType === "standard" ? "text-primary" : "text-text")}>
                              {t('order_form.standard')}
                            </span>
                          </div>
                          <div className="text-2xl font-black text-text">
                            {PRICING.apartment.standard[rooms as keyof typeof PRICING.apartment.standard]} zł
                          </div>
                          <p className="text-xs text-text/50 mt-2">
                            {t('order_form.standard_apartment_desc')}
                          </p>
                        </button>
                        <button
                          onClick={() => setCleaningType("deep")}
                          className={cn(
                            "p-6 rounded-2xl border-2 transition-all text-left",
                            cleaningType === "deep"
                              ? "border-primary bg-primary/5"
                              : "border-blue-100 hover:border-primary/30"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className={cn("w-5 h-5", cleaningType === "deep" ? "text-primary" : "text-text/30")} />
                            <span className={cn("font-bold text-lg", cleaningType === "deep" ? "text-primary" : "text-text")}>
                              {t('order_form.deep')}
                            </span>
                          </div>
                          <div className="text-2xl font-black text-text">
                            {PRICING.apartment.deep[rooms as keyof typeof PRICING.apartment.deep]} zł
                          </div>
                          <p className="text-xs text-text/50 mt-2">
                            {t('order_form.deep_apartment_desc')}
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Office Options */}
                {propertyType === "office" && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                    <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                        2
                      </span>
                      Office details
                    </h2>

                    {/* Square Meters */}
                    <div className="mb-8">
                      <span className="font-bold text-text/80 mb-4 block">Office area (m²)</span>
                      <div className="flex items-center gap-4 bg-blue-50/50 p-2 rounded-2xl border border-blue-50 w-fit">
                        <button
                          onClick={() => setSquareMeters((v) => Math.max(10, v - 10))}
                          className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                        >
                          <Minus className="w-5 h-5"/>
                        </button>
                        <span className="w-20 text-center font-bold text-2xl text-text">{squareMeters}</span>
                        <button
                          onClick={() => setSquareMeters((v) => v + 5)}
                          className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => setSquareMeters((v) => v + 10)}
                          className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                        >
                          +10
                        </button>
                      </div>
                    </div>

                    {/* Cleaning Type */}
                    <div>
                      <span className="font-bold text-text/80 mb-4 block">{t('order_form.type_of_cleaning')}</span>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setCleaningType("standard")}
                          className={cn(
                            "p-6 rounded-2xl border-2 transition-all text-left",
                            cleaningType === "standard"
                              ? "border-primary bg-primary/5"
                              : "border-blue-100 hover:border-primary/30"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Check className={cn("w-5 h-5", cleaningType === "standard" ? "text-primary" : "text-text/30")} />
                            <span className={cn("font-bold text-lg", cleaningType === "standard" ? "text-primary" : "text-text")}>
                              {t('order_form.standard')}
                            </span>
                          </div>
                          <div className="text-2xl font-black text-text">
                            {PRICING.office.standardRate.min}-{PRICING.office.standardRate.max} zł/m²
                          </div>
                          <p className="text-xs text-text/50 mt-2">
                            {t('order_form.office_standard_desc')}
                          </p>
                        </button>
                        <button
                          onClick={() => setCleaningType("deep")}
                          className={cn(
                            "p-6 rounded-2xl border-2 transition-all text-left",
                            cleaningType === "deep"
                              ? "border-primary bg-primary/5"
                              : "border-blue-100 hover:border-primary/30"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className={cn("w-5 h-5", cleaningType === "deep" ? "text-primary" : "text-text/30")} />
                            <span className={cn("font-bold text-lg", cleaningType === "deep" ? "text-primary" : "text-text")}>
                              {t('order_form.office_deep')}
                            </span>
                          </div>
                          <div className="text-2xl font-black text-text">
                            {PRICING.office.deepRate.min}-{PRICING.office.deepRate.max} zł/m²
                          </div>
                          <p className="text-xs text-text/50 mt-2">
                            {t('order_form.office_deep_desc')}
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Airbnb Options */}
                {propertyType === "airbnb" && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                    <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                        2
                      </span>
                      {t('order_form.apartment_details')}
                    </h2>

                    {/* Bedroom Type */}
                    <div>
                      <span className="font-bold text-text/80 mb-4 block">{t('order_form.number_of_rooms')}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                          onClick={() => setAirbnbType("studio")}
                          className={cn(
                            "p-6 rounded-2xl border-2 transition-all",
                            airbnbType === "studio"
                              ? "border-primary bg-primary/5"
                              : "border-blue-100 hover:border-primary/30"
                          )}
                        >
                          <span className={cn("block font-bold text-lg", airbnbType === "studio" ? "text-primary" : "text-text")}>
                            {t('order_form.studio')}
                          </span>
                          <div className="text-xl font-black text-text mt-2">
                            {PRICING.airbnb.studio.min}-{PRICING.airbnb.studio.max} zł
                          </div>
                        </button>
                        <button
                          onClick={() => setAirbnbType("1bedroom")}
                          className={cn(
                            "p-6 rounded-2xl border-2 transition-all",
                            airbnbType === "1bedroom"
                              ? "border-primary bg-primary/5"
                              : "border-blue-100 hover:border-primary/30"
                          )}
                        >
                          <span className={cn("block font-bold text-lg", airbnbType === "1bedroom" ? "text-primary" : "text-text")}>
                            {t('order_form.1bedroom')}
                          </span>
                          <div className="text-xl font-black text-text mt-2">
                            {PRICING.airbnb[airbnbType].min}-{PRICING.airbnb[airbnbType].max} zł
                          </div>
                        </button>
                        <button
                          onClick={() => setAirbnbType("2bedroom")}
                          className={cn(
                            "p-6 rounded-2xl border-2 transition-all",
                            airbnbType === "2bedroom"
                              ? "border-primary bg-primary/5"
                              : "border-blue-100 hover:border-primary/30"
                          )}
                        >
                          <span className={cn("block font-bold text-lg", airbnbType === "2bedroom" ? "text-primary" : "text-text")}>
                            {t('order_form.2bedrooms')}
                          </span>
                          <div className="text-xl font-black text-text mt-2">
                            {PRICING.airbnb[airbnbType].min}-{PRICING.airbnb[airbnbType].max} zł
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Services */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                  <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                      {propertyType === "apartment" ? 3 : propertyType === "office" ? 3 : 3}
                    </span>
                    {t('order_form.additional_services')}
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      onClick={() => toggleExtraCheck("oven")}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                        selectedExtras.oven > 0
                          ? "border-primary bg-primary/5"
                          : "border-blue-100 hover:border-primary/30"
                      )}
                    >
                      <ChefHat className={cn("w-6 h-6", selectedExtras.oven > 0 ? "text-primary" : "text-text/50")} />
                      <span className={cn("font-bold text-sm", selectedExtras.oven > 0 ? "text-primary" : "text-text")}>
                        {t('order_form.oven')}
                      </span>
                      <span className="text-xs font-bold text-text/50">
                        +{PRICING.extras.oven.price} zł
                      </span>
                    </button>
                    <button
                      onClick={() => toggleExtraCheck("fridge")}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                        selectedExtras.fridge > 0
                          ? "border-primary bg-primary/5"
                          : "border-blue-100 hover:border-primary/30"
                      )}
                    >
                      <Archive className={cn("w-6 h-6", selectedExtras.fridge > 0 ? "text-primary" : "text-text/50")} />
                      <span className={cn("font-bold text-sm", selectedExtras.fridge > 0 ? "text-primary" : "text-text")}>
                        {t('order_form.fridge')}
                      </span>
                      <span className="text-xs font-bold text-text/50">
                        +{PRICING.extras.fridge.price} zł
                      </span>
                    </button>
                    <button
                      onClick={() => setSelectedExtras((prev) => ({ ...prev, windows: prev.windows > 0 ? 0 : 1 }))}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                        selectedExtras.windows > 0
                          ? "border-primary bg-primary/5"
                          : "border-blue-100 hover:border-primary/30"
                      )}
                    >
                      <Square className={cn("w-6 h-6", selectedExtras.windows > 0 ? "text-primary" : "text-text/50")} />
                      <span className={cn("font-bold text-sm", selectedExtras.windows > 0 ? "text-primary" : "text-text")}>
                        {t('order_form.windows')}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedExtras((prev) => ({ ...prev, windows: Math.max(0, prev.windows - 1) })); }}
                          className="w-6 h-6 rounded-full bg-blue-100 hover:bg-primary/20 flex items-center justify-center text-text"
                          disabled={selectedExtras.windows === 0}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-text w-4 text-center">{selectedExtras.windows}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedExtras((prev) => ({ ...prev, windows: prev.windows + 1 })); }}
                          className="w-6 h-6 rounded-full bg-blue-100 hover:bg-primary/20 flex items-center justify-center text-text"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-text/50">
                        {selectedExtras.windows > 0 ? `${PRICING.extras.windows.price * selectedExtras.windows} zł` : `+${PRICING.extras.windows.price} zł/${t('order_form.windows').toLowerCase()}`}
                      </span>
                    </button>
                    <button
                      onClick={() => toggleExtraCheck("balcony")}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                        selectedExtras.balcony > 0
                          ? "border-primary bg-primary/5"
                          : "border-blue-100 hover:border-primary/30"
                      )}
                    >
                      <Home className={cn("w-6 h-6", selectedExtras.balcony > 0 ? "text-primary" : "text-text/50")} />
                      <span className={cn("font-bold text-sm", selectedExtras.balcony > 0 ? "text-primary" : "text-text")}>
                        {t('order_form.balcony')}
                      </span>
                      <span className="text-xs font-bold text-text/50">
                        +{PRICING.extras.balcony.price} zł
                      </span>
                    </button>
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                  <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                      {propertyType === "apartment" ? 4 : propertyType === "office" ? 4 : 4}
                    </span>
                    {t('order_form.choose_date')}
                  </h2>

                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setWeekOffset((v) => v - 1)}
                      className="w-10 h-10 rounded-xl border border-blue-100 bg-white hover:bg-blue-50 transition-colors flex items-center justify-center text-text"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-sm font-bold text-text/70 uppercase tracking-widest">
                      {formatFullDate(weekDays[0])} — {formatFullDate(weekDays[6])}
                    </div>
                    <button
                      onClick={() => setWeekOffset((v) => v + 1)}
                      className="w-10 h-10 rounded-xl border border-blue-100 bg-white hover:bg-blue-50 transition-colors flex items-center justify-center text-text"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {weekDays.map((d) => {
                      const active = startOfDay(d).getTime() === startOfDay(selectedDate).getTime();
                      return (
                        <button
                          key={d.toISOString()}
                          onClick={() => setSelectedDate(d)}
                          className={cn(
                            "p-3 rounded-2xl border text-center transition-all",
                            active
                              ? "bg-primary text-white border-primary shadow-md shadow-blue-200/60"
                              : "bg-white border-blue-50 hover:border-primary/30 hover:bg-blue-50/40 text-text"
                          )}
                        >
                          <div className={cn("text-[10px] font-bold uppercase tracking-widest", active ? "text-white/80" : "text-text/40")}>
                            {d.toLocaleDateString("en-US", { weekday: "short" })}
                          </div>
                          <div className={cn("text-sm font-black mt-1", active ? "text-white" : "text-text")}>
                            {d.getDate().toString().padStart(2, "0")}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6">
                    {TIME_SLOTS.map((slot) => {
                      const active = slot === selectedTime;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={cn(
                            "px-3 py-2 rounded-xl border text-xs font-bold transition-all",
                            active
                              ? "bg-primary text-white border-primary"
                              : "bg-white border-blue-50 hover:border-primary/30 text-text/70"
                          )}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Address Section */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                  <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                      {propertyType === "apartment" ? 5 : propertyType === "office" ? 5 : 5}
                    </span>
                    {t('order_form.address')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-2">{t('order_form.city')}</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Warsaw"
                        className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-2">{t('order_form.street')}</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder={t('order_form.street_name')}
                        className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-2">{t('order_form.postcode')}</label>
                      <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="00-001"
                        className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-2">{t('order_form.house_number')}</label>
                      <input
                        type="text"
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        placeholder="12"
                        className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-text/70 mb-2">{t('order_form.apartment_number')}</label>
                    <input
                      type="text"
                      value={apartmentNumber}
                      onChange={(e) => setApartmentNumber(e.target.value)}
                      placeholder="5"
                      className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all md:w-1/2"
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-text/70 mb-2">{t('order_form.comments')}</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special instructions or notes..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200/60 disabled:opacity-50"
                >
                  {isLoading ? t('order_form.sending') : t('order_form.submit_order')}
                </button>
              </div>

              {/* Right column - Order Summary */}
              <div className="lg:col-span-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50 sticky top-32">
                  <h2 className="text-xl font-bold text-text mb-6">{t('order_form.order_summary')}</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-4 border-b border-blue-50">
                      <div>
                        <span className="font-bold text-text block">
                          {propertyType === "apartment" && t(`order_form.${rooms}bedroom_cleaning`)}
                          {propertyType === "office" && `${squareMeters}m² ${cleaningType} cleaning`}
                          {propertyType === "airbnb" && t(`order_form.${airbnbType}_cleaning`)}
                        </span>
                        <span className="text-xs text-text/50">
                          {propertyType === "apartment" && (cleaningType === "standard" ? t('order_form.standard_cleaning') : t('order_form.deep_cleaning'))}
                          {propertyType === "office" && (cleaningType === "standard" ? t('order_form.office_standard') : t('order_form.office_deep'))}
                          {propertyType === "airbnb" && t('order_form.airbnb_turnover')}
                        </span>
                      </div>
                      <span className="font-bold text-lg text-text">{basePrice} zł</span>
                    </div>

                    {extrasTotal > 0 && (
                      <div className="pb-4 border-b border-blue-50">
                        <span className="font-bold text-text block mb-2">{t('order_form.additional_services')}</span>
                        <div className="space-y-1">
                          {Object.entries(selectedExtras).map(([id, qty]) => {
                            if (!qty) return null;
                            const extra = PRICING.extras[id as keyof typeof PRICING.extras];
                            return (
                              <div key={id} className="flex justify-between items-center text-sm">
                                <span className="text-text/70">{t(`order_form.${id}`)}</span>
                                <span className="font-bold text-text">+{extra?.price * qty} zł</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-xl text-text">{t('order_form.total')}</span>
                      <span className="font-black text-3xl text-primary">{total} zł</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200/60 disabled:opacity-50"
                  >
                    {isLoading ? t('order_form.sending') : t('order_form.submit_order')}
                  </button>

                  <p className="text-xs text-text/50 text-center mt-4">
                    {t('order_form.no_prepayment')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPageContent />
    </Suspense>
  );
}


