"use client";

import React, { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Frequency = { id: string; label: string; discount: number; badge: string | null };

const PRICING = {
  room: 100,
  bathroom: 50,
  extras: {
    fridge: { label: "Refrigerator (inside)", price: 40 },
    oven: { label: "Oven (inside)", price: 40 },
    cabinets: { label: "Kitchen cabinets (inside)", price: 65 },
    windows: { label: "Window cleaning", price: 40 },
    ironing: { label: "Ironing", price: 50 },
    balcony: { label: "Balcony", price: 35 },
    extraHour: { label: "Extra hours", price: 45 },
    litterBox: { label: "Litter box cleaning", price: 10 },
  },
  frequencies: [
    { id: "weekly", label: "Once a week", discount: 20, badge: "-20%" },
    { id: "biweekly", label: "Twice a month", discount: 15, badge: "-15%" },
    { id: "monthly", label: "Once a month", discount: 10, badge: "-10%" },
    { id: "once", label: "One-time cleaning", discount: 0, badge: null },
  ] satisfies Frequency[],
};

const PROMOS: Record<string, { label: string; discountPercent: number }> = {
  start: { label: "START", discountPercent: 15 },
  cleanly10: { label: "CLEANLY10", discountPercent: 10 },
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
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({
    fridge: 0,
    oven: 0,
    cabinets: 0,
    windows: 0,
    ironing: 0,
    balcony: 0,
    extraHour: 0,
    litterBox: 0,
  });
  const [frequency, setFrequency] = useState<Frequency>(PRICING.frequencies[0]);

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(
    null
  );

  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(() => startOfDay(addDays(new Date(), 1)));
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[4]);

  const [city, setCity] = useState("Warsaw");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [propertyType, setPropertyType] = useState<"apartment" | "house">("apartment");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!searchParams) return;
    const r = Number(searchParams.get("rooms"));
    const b = Number(searchParams.get("bathrooms"));
    if (Number.isFinite(r) && r > 0) setRooms(Math.min(10, Math.max(1, Math.floor(r))));
    if (Number.isFinite(b) && b > 0) setBathrooms(Math.min(10, Math.max(1, Math.floor(b))));
  }, [searchParams]);

  const extrasTotal = useMemo(() => {
    return Object.entries(selectedExtras).reduce((sum, [id, qty]) => {
      const price = PRICING.extras[id as keyof typeof PRICING.extras]?.price ?? 0;
      return sum + qty * price;
    }, 0);
  }, [selectedExtras]);

  const baseTotal = useMemo(
    () => {
      const houseMultiplier = propertyType === "house" ? 1.5 : 1;
      return Math.round((rooms * PRICING.room + bathrooms * PRICING.bathroom) * houseMultiplier);
    },
    [rooms, bathrooms, propertyType]
  );

  const frequencyDiscountValue = useMemo(() => {
    if (frequency.discount <= 0) return 0;
    return Math.round((baseTotal + extrasTotal) * (frequency.discount / 100));
  }, [frequency, baseTotal, extrasTotal]);

  const promoDiscountValue = useMemo(() => {
    if (!appliedPromo) return 0;
    const afterFrequency = Math.max(0, baseTotal + extrasTotal - frequencyDiscountValue);
    return Math.round(afterFrequency * (appliedPromo.discountPercent / 100));
  }, [appliedPromo, baseTotal, extrasTotal, frequencyDiscountValue]);

  const total = useMemo(() => {
    return Math.max(0, Math.round(baseTotal + extrasTotal - frequencyDiscountValue - promoDiscountValue));
  }, [baseTotal, extrasTotal, frequencyDiscountValue, promoDiscountValue]);

  const weekDays = useMemo(() => {
    const start = startOfDay(addDays(new Date(), 1 + weekOffset * 7));
    return Array.from({ length: 7 }, (_, i) => startOfDay(addDays(start, i)));
  }, [weekOffset]);

  const toggleExtraCheck = (id: string) => {
    setSelectedExtras((prev) => ({ ...prev, [id]: prev[id] ? 0 : 1 }));
  };

  const adjustExtraQty = (id: string, delta: number) => {
    setSelectedExtras((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }));
  };

  const applyPromo = () => {
    const code = promoInput.trim().toLowerCase();
    const promo = PROMOS[code];
    if (!promo) {
      setAppliedPromo(null);
      return;
    }
    setAppliedPromo({ code: promo.label, discountPercent: promo.discountPercent });
  };

  const clearPromo = () => {
    setPromoInput("");
    setAppliedPromo(null);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-24 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-3">
                Order constructor
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-text">
                Home cleaning in <span className="text-primary">{city}</span>
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

      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                <h2 className="text-xl font-bold text-text mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                    1
                  </span>
                  Your apartment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text/80">Rooms</span>
                    <div className="flex items-center gap-4 bg-blue-50/50 p-2 rounded-2xl border border-blue-50">
                      <button
                        onClick={() => setRooms((v) => Math.max(1, v - 1))}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                        disabled={rooms <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-8 text-center font-bold text-lg text-text">{rooms}</span>
                      <button
                        onClick={() => setRooms((v) => v + 1)}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text/80">Bathrooms</span>
                    <div className="flex items-center gap-4 bg-blue-50/50 p-2 rounded-2xl border border-blue-50">
                      <button
                        onClick={() => setBathrooms((v) => Math.max(1, v - 1))}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                        disabled={bathrooms <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-8 text-center font-bold text-lg text-text">{bathrooms}</span>
                      <button
                        onClick={() => setBathrooms((v) => v + 1)}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <span className="font-bold text-text/80 mb-4 block">Property type</span>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPropertyType("apartment")}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        propertyType === "apartment"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-blue-100 hover:border-primary/30"
                      }`}
                    >
                      <span className="block font-bold text-lg">Apartment</span>
                      <span className="text-xs opacity-60">Standard pricing</span>
                    </button>
                    <button
                      onClick={() => setPropertyType("house")}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        propertyType === "house"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-blue-100 hover:border-primary/30"
                      }`}
                    >
                      <span className="block font-bold text-lg">House</span>
                      <span className="text-xs opacity-60">+50% multiplier</span>
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-50">
                  <Info className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-xs text-text/60 leading-relaxed">
                    Estimated service time and final price depend on extra options and apartment condition.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                <h2 className="text-xl font-bold text-text mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                    2
                  </span>
                  Choose a convenient date and time
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

                <div className="grid grid-cols-7 gap-2">
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
                        <div
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-widest",
                            active ? "text-white/80" : "text-text/40"
                          )}
                        >
                          {d.toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                        <div className={cn("text-sm font-black mt-1", active ? "text-white" : "text-text")}>
                          {d.getDate().toString().padStart(2, "0")}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
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

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                <h2 className="text-xl font-bold text-text mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                    3
                  </span>
                  Frequency
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {PRICING.frequencies.map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setFrequency(freq)}
                      className={cn(
                        "relative p-4 rounded-2xl border transition-all duration-300 text-left",
                        frequency.id === freq.id
                          ? "bg-primary/5 border-primary shadow-sm"
                          : "bg-white border-blue-50 hover:border-primary/30"
                      )}
                    >
                      <div className="flex flex-col gap-1">
                        <span
                          className={cn("text-sm font-bold", frequency.id === freq.id ? "text-primary" : "text-text")}
                        >
                          {freq.label}
                        </span>
                        {freq.badge && (
                          <span className="inline-block w-fit px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold">
                            {freq.badge} discount
                          </span>
                        )}
                      </div>
                      {frequency.id === freq.id && (
                        <div className="absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-6 text-xs text-text/60 font-medium">
                  More frequent cleaning — higher discount. You can cancel or reschedule anytime.
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                <h2 className="text-xl font-bold text-text mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                    4
                  </span>
                  Extra options
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(PRICING.extras).map(([id, extra]) => {
                    const qty = selectedExtras[id] ?? 0;
                    const isCounter = ["windows", "ironing", "balcony", "extraHour", "litterBox"].includes(id);
                    return (
                      <div
                        key={id}
                        className={cn(
                          "rounded-2xl border p-4 flex items-center justify-between gap-4 transition-colors",
                          qty > 0 ? "bg-primary/5 border-primary/20" : "bg-white border-blue-50 hover:border-primary/20"
                        )}
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-text truncate">{extra.label}</div>
                          <div className="text-xs font-bold text-primary mt-1">{extra.price} PLN</div>
                        </div>

                        {isCounter ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => adjustExtraQty(id, -1)}
                              className="w-9 h-9 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-40"
                              disabled={qty <= 0}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-6 text-center font-bold text-text">{qty}</span>
                            <button
                              onClick={() => adjustExtraQty(id, +1)}
                              className="w-9 h-9 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleExtraCheck(id)}
                            className={cn(
                              "px-4 py-2 rounded-xl border text-xs font-bold transition-all whitespace-nowrap",
                              qty > 0
                                ? "bg-primary text-white border-primary"
                                : "bg-white border-blue-100 text-text/70 hover:border-primary/30"
                            )}
                          >
                            {qty > 0 ? "Added" : "Add"}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                <h2 className="text-xl font-bold text-text mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                    5
                  </span>
                  Promocode
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 rounded-2xl border border-blue-100 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-6 py-3 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={clearPromo}
                    className="px-6 py-3 rounded-2xl border border-blue-100 bg-white font-bold text-text/70 hover:bg-blue-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-4 text-xs text-text/60 font-medium">
                  Try: <span className="font-bold text-text">START</span> (15%) or{" "}
                  <span className="font-bold text-text">CLEANLY10</span> (10%).
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-50/70 border border-blue-50">
                <h2 className="text-xl font-bold text-text mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                    6
                  </span>
                  Address and contact details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text/50">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-blue-100 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option>Warsaw</option>
                      <option>Krakow</option>
                      <option>Wroclaw</option>
                      <option>Gdansk</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text/50">Street</label>
                    <input
                      value={street}
                      onChange={(e) => {
                        setStreet(e.target.value);
                        if (errors.street) setErrors({...errors, street: ''});
                      }}
                      className={`w-full px-4 py-3 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.street ? 'border-red-400' : 'border-blue-100'}`}
                    />
                    {errors.street && <p className="text-xs text-red-500">{errors.street}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text/50">Postcode</label>
                    <input
                      value={postcode}
                      onChange={(e) => {
                        setPostcode(e.target.value);
                        if (errors.postcode) setErrors({...errors, postcode: ''});
                      }}
                      className={`w-full px-4 py-3 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.postcode ? 'border-red-400' : 'border-blue-100'}`}
                    />
                    {errors.postcode && <p className="text-xs text-red-500">{errors.postcode}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text/50">House</label>
                      <input
                        value={houseNumber}
                        onChange={(e) => {
                          setHouseNumber(e.target.value);
                          if (errors.houseNumber) setErrors({...errors, houseNumber: ''});
                        }}
                        className={`w-full px-4 py-3 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.houseNumber ? 'border-red-400' : 'border-blue-100'}`}
                      />
                      {errors.houseNumber && <p className="text-xs text-red-500">{errors.houseNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text/50">Apt</label>
                      <input
                        value={apartmentNumber}
                        onChange={(e) => setApartmentNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-blue-100 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text/50">Your name</label>
                    <input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({...errors, name: ''});
                      }}
                      className={`w-full px-4 py-3 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-red-400' : 'border-blue-100'}`}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text/50">Phone</label>
                    <input
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({...errors, phone: ''});
                      }}
                      className={`w-full px-4 py-3 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.phone ? 'border-red-400' : 'border-blue-100'}`}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text/50">Email</label>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({...errors, email: ''});
                      }}
                      className={`w-full px-4 py-3 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-400' : 'border-blue-100'}`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text/50">
                      Additional order information
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-2xl border border-blue-100 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 sticky top-28">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-200/60 border border-blue-50 overflow-hidden">
                <div className="p-8 bg-primary text-white">
                  <div className="flex items-center gap-3 mb-2 opacity-80">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-widest">Summary</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-5xl font-black"
                    >
                      {total}
                    </motion.span>
                    <span className="text-xl font-bold opacity-80 uppercase">PLN</span>
                  </div>
                  <p className="text-sm mt-2 font-medium opacity-80">
                    {formatFullDate(selectedDate)} · {selectedTime}
                  </p>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-text/60 font-medium">
                        {rooms} rooms + {bathrooms} bathrooms
                      </span>
                      <span className="text-text font-bold">{baseTotal} PLN</span>
                    </div>

                    {extrasTotal > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text/60 font-medium">Extra options</span>
                        <span className="text-text font-bold">{extrasTotal} PLN</span>
                      </div>
                    )}

                    {frequencyDiscountValue > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-accent font-bold">
                          Frequency discount ({frequency.badge})
                        </span>
                        <span className="text-accent font-bold">-{frequencyDiscountValue} PLN</span>
                      </div>
                    )}

                    {promoDiscountValue > 0 && appliedPromo && (
                      <div className="flex justify-between text-sm">
                        <span className="text-accent font-bold">
                          Promocode {appliedPromo.code} (-{appliedPromo.discountPercent}%)
                        </span>
                        <span className="text-accent font-bold">-{promoDiscountValue} PLN</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-blue-50">
                    <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-50 mb-6">
                      <Info className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-xs text-text/60 leading-relaxed">
                        This is an estimate. In MVP mode we don’t collect payments — the button is a UI preview.
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        // Validation
                        const newErrors: Record<string, string> = {};
                        
                        if (!street.trim()) newErrors.street = 'Street is required';
                        if (!postcode.trim()) newErrors.postcode = 'Post code is required';
                        if (!houseNumber.trim()) newErrors.houseNumber = 'House number is required';
                        if (!name.trim()) newErrors.name = 'Name is required';
                        if (!phone.trim()) newErrors.phone = 'Phone is required';
                        if (!email.trim()) {
                          newErrors.email = 'Email is required';
                        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                          newErrors.email = 'Please enter a valid email';
                        }
                        
                        if (Object.keys(newErrors).length > 0) {
                          setErrors(newErrors);
                          return;
                        }
                        
                        setErrors({});
                        const orderInfo = {
                          rooms,
                          bathrooms,
                          selectedDate: formatFullDate(selectedDate),
                          selectedTime,
                          extras: selectedExtras,
                          frequency: frequency.id,
                          total,
                          baseTotal,
                          extrasTotal
                        };
                        const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(orderInfo))));
                        window.location.href = `/order/payment?data=${encoded}`;
                      }}
                      className="w-full py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group">
                      Place order
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function OrderPageWithSuspense() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <OrderPageContent />
    </Suspense>
  );
}

