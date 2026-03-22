"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck,
  Calendar,
  Home,
  Sparkles
} from "lucide-react";

interface OrderData {
  rooms: number;
  bathrooms: number;
  selectedDate: string;
  selectedTime: string;
  extras: string[];
  frequency: string;
  total: number;
  baseTotal: number;
  extrasTotal: number;
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(data))));
        setOrderData(decoded);
      } catch (e) {
        console.error("Failed to parse order data");
      }
    }
  }, [searchParams]);

  const handlePayment = async () => {
    if (!paymentMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to success page with order data
    if (orderData) {
      const successData = btoa(unescape(encodeURIComponent(JSON.stringify({
        ...orderData,
        paymentMethod,
        orderId: `ORD-${Date.now()}`,
        orderDate: new Date().toISOString()
      }))));
      router.push(`/order/success?data=${successData}`);
    }
    
    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-black text-text mb-4">
              Choose Payment Method
            </h1>
            <p className="text-text/60 font-medium">
              Complete your booking for {orderData.total} PLN
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Cash Payment */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setPaymentMethod("cash")}
              className={`p-8 rounded-3xl border-2 transition-all text-left ${
                paymentMethod === "cash" 
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                  : "border-blue-100 bg-white hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  paymentMethod === "cash" ? "bg-primary text-white" : "bg-blue-50 text-primary"
                }`}>
                  <Banknote className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text">Pay with Cash</h3>
                  <p className="text-sm text-text/60">Pay when cleaner arrives</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-text/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  No prepayment required
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Pay after service is done
                </li>
              </ul>
            </motion.button>

            {/* Card Payment */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setPaymentMethod("card")}
              className={`p-8 rounded-3xl border-2 transition-all text-left ${
                paymentMethod === "card" 
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                  : "border-blue-100 bg-white hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  paymentMethod === "card" ? "bg-primary text-white" : "bg-blue-50 text-primary"
                }`}>
                  <CreditCard className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text">Pay with Card</h3>
                  <p className="text-sm text-text/60">Secure payment via Przelew24</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-text/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Instant confirmation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Secure & encrypted
                </li>
              </ul>
            </motion.button>
          </div>

          {/* Card Form */}
          {paymentMethod === "card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-3xl border border-blue-100 p-4 md:p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-text/60">
                  Your payment is secured with SSL encryption
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength={3}
                      className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-blue-100 p-4 md:p-6 mb-8"
          >
            <h3 className="text-lg font-bold text-text mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text/60">Service</span>
                <span className="font-medium">{orderData.rooms} rooms + {orderData.bathrooms} bathrooms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Date & Time</span>
                <span className="font-medium">{orderData.selectedDate} at {orderData.selectedTime}</span>
              </div>
              {orderData.extras.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-text/60">Extra options</span>
                  <span className="font-medium">{orderData.extras.length} selected</span>
                </div>
              )}
              <div className="pt-3 border-t border-blue-100 flex justify-between">
                <span className="font-bold text-text">Total</span>
                <span className="font-bold text-primary text-xl">{orderData.total} PLN</span>
              </div>
            </div>
          </motion.div>

          {/* Pay Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handlePayment}
            disabled={!paymentMethod || isProcessing}
            className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
              paymentMethod
                ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                : "bg-blue-100 text-text/40 cursor-not-allowed"
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : paymentMethod === "cash" ? (
              <>
                <Sparkles className="w-5 h-5" />
                Confirm Booking
              </>
            ) : paymentMethod === "card" ? (
              <>
                <CreditCard className="w-5 h-5" />
                Pay {orderData.total} PLN
              </>
            ) : (
              "Select payment method"
            )}
          </motion.button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
