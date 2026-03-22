"use client";

import React, { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
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
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
                  Order constructor
                </p>
                <h1 className="text-4xl md:text-5xl font-black text-text">
                  Cleaning in <span className="text-primary">{city}</span>
                </h1>
                <p className="text-text/60 font-medium mt-4">
                  Configure your cleaning, choose a convenient date and time, and see the estimated cost instantly.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 border border-blue-50 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-semibold text-text">Supplies included</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/60 border border-blue-50">
                  <span className="text-sm font-semibold text-text/70">No prepayment</span>
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
                    Your contact details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-2">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-2">Phone number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+48 123 456 789"
                        className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Type Selection */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                  <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                      2
                    </span>
                    Property type
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
                        Apartment
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
                      Apartment details
                    </h2>

                    {/* Number of Rooms */}
                    <div className="mb-8">
                      <span className="font-bold text-text/80 mb-4 block">Number of rooms</span>
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
                            <span className="text-xs text-text/50">rooms</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cleaning Type */}
                    <div>
                      <span className="font-bold text-text/80 mb-4 block">Type of cleaning</span>
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
                              Standard
                            </span>
                          </div>
                          <div className="text-2xl font-black text-text">
                            {PRICING.apartment.standard[rooms as keyof typeof PRICING.apartment.standard]} zł
                          </div>
                          <p className="text-xs text-text/50 mt-2">
                            Dusting, vacuuming, mopping, kitchen & bathroom
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
                              Deep
                            </span>
                          </div>
                          <div className="text-2xl font-black text-text">
                            {PRICING.apartment.deep[rooms as keyof typeof PRICING.apartment.deep]} zł
                          </div>
                          <p className="text-xs text-text/50 mt-2">
                            Full kitchen, oven, fridge, bathroom tiles, baseboards
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
                      <span className="font-bold text-text/80 mb-4 block">Type of cleaning</span>
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
                              Standard
                            </span>
                          </div>
                          <div className="text-2xl font-black text-text">
                            {PRICING.office.standardRate.min}-{PRICING.office.standardRate.max} zł/m²
                          </div>
                          <p className="text-xs text-text/50 mt-2">
                            Regular office cleaning
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
                              After renovation
                            </span>
                          </div>
                          <div className="text-2xl font-black text-text">
                            {PRICING.office.deepRate.min}-{PRICING.office.deepRate.max} zł/m²
                          </div>
                          <p className="text-xs text-text/50 mt-2">
                            Deep cleaning after renovation
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
                      Airbnb / Apartment details
                    </h2>

                    {/* Bedroom Type */}
                    <div>
                      <span className="font-bold text-text/80 mb-4 block">Number of rooms</span>
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
                            Studio
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
                            1 Bedroom
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
                            2 Bedrooms
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
                    Additional services
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
                        Oven
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
                        Fridge
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
                        Windows
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
                        {selectedExtras.windows > 0 ? `${PRICING.extras.windows.price * selectedExtras.windows} zł` : `+${PRICING.extras.windows.price} zł/window`}
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
                        Balcony
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
                    Choose date and time
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

                  <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200/60">
                    Book Cleaning
                  </button>
                </div>
              </div>

              {/* Right column - Order Summary */}
              <div className="lg:col-span-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl shadow-blue-50/70 border border-blue-50 sticky top-32">
                  <h2 className="text-xl font-bold text-text mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-4 border-b border-blue-50">
                      <div>
                        <span className="font-bold text-text block">
                          {propertyType === "apartment" && `${rooms}-room ${cleaningType} cleaning`}
                          {propertyType === "office" && `${squareMeters}m² ${cleaningType} cleaning`}
                          {propertyType === "airbnb" && `${airbnbType} cleaning`}
                        </span>
                        <span className="text-xs text-text/50">
                          {propertyType === "apartment" && (cleaningType === "standard" ? "Standard cleaning" : "Deep cleaning")}
                          {propertyType === "office" && (cleaningType === "standard" ? "Standard office cleaning" : "After renovation")}
                          {propertyType === "airbnb" && "Airbnb turn-over cleaning"}
                        </span>
                      </div>
                      <span className="font-bold text-lg text-text">{basePrice} zł</span>
                    </div>

                    {extrasTotal > 0 && (
                      <div className="pb-4 border-b border-blue-50">
                        <span className="font-bold text-text block mb-2">Additional services</span>
                        <div className="space-y-1">
                          {Object.entries(selectedExtras).map(([id, qty]) => {
                            if (!qty) return null;
                            const extra = PRICING.extras[id as keyof typeof PRICING.extras];
                            return (
                              <div key={id} className="flex justify-between items-center text-sm">
                                <span className="text-text/70">{extra?.label}</span>
                                <span className="font-bold text-text">+{extra?.price * qty} zł</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-xl text-text">Total</span>
                      <span className="font-black text-3xl text-primary">{total} zł</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200/60">
                    Book Cleaning
                  </button>

                  <p className="text-xs text-text/50 text-center mt-4">
                    No prepayment required • You can cancel or reschedule
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
