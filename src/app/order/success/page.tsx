"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Loader2, 
  Calendar,
  Home,
  CreditCard,
  Banknote,
  Mail,
  Download,
  Printer,
  Sparkles,
  PartyPopper
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
  paymentMethod: "card" | "cash";
  orderId: string;
  orderDate: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(data))));
        setOrderData(decoded);
      } catch (e) {
        console.error("Failed to parse order data");
        router.push("/order");
      }
    } else {
      router.push("/order");
    }
  }, [searchParams, router]);

  const handleSendReceipt = async () => {
    if (!email) return;
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEmailSent(true);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const formattedOrderDate = new Date(orderData.orderDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-text mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-text/60">
              Your cleaning is scheduled for {orderData.selectedDate}
            </p>
          </motion.div>

          {/* Confetti Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-2 mb-8"
          >
            <PartyPopper className="w-6 h-6 text-yellow-500" />
            <Sparkles className="w-6 h-6 text-primary" />
            <PartyPopper className="w-6 h-6 text-yellow-500" />
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-blue-100 overflow-hidden mb-8"
          >
            <div className="bg-primary p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Order ID</p>
                  <p className="text-2xl font-black">{orderData.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">Total Paid</p>
                  <p className="text-2xl font-black">{orderData.total} PLN</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl">
                <Calendar className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-text/60">Cleaning Date</p>
                  <p className="font-bold text-text">{orderData.selectedDate} at {orderData.selectedTime}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl">
                <Home className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-text/60">Service Details</p>
                  <p className="font-bold text-text">{orderData.rooms} rooms + {orderData.bathrooms} bathrooms</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl">
                {orderData.paymentMethod === "card" ? (
                  <CreditCard className="w-6 h-6 text-primary" />
                ) : (
                  <Banknote className="w-6 h-6 text-primary" />
                )}
                <div>
                  <p className="text-sm text-text/60">Payment Method</p>
                  <p className="font-bold text-text">
                    {orderData.paymentMethod === "card" ? "Paid by Card" : "Pay with Cash"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Receipt Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-blue-100 overflow-hidden mb-8"
          >
            <div className="p-6 border-b border-blue-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-text">Receipt</h3>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
            
            <div className="p-6 bg-gray-50" id="receipt">
              <div className="bg-white rounded-2xl p-6 border border-blue-100">
                <div className="text-center mb-6 pb-6 border-b border-blue-100">
                  <h4 className="text-xl font-black text-primary mb-2">CzystyDom</h4>
                  <p className="text-sm text-text/60">Professional Cleaning Services</p>
                  <p className="text-xs text-text/40 mt-2">Order: {orderData.orderId}</p>
                  <p className="text-xs text-text/40">Date: {formattedOrderDate}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text/60">Base cleaning ({orderData.rooms} rooms + {orderData.bathrooms} bath)</span>
                    <span>{orderData.baseTotal} PLN</span>
                  </div>
                  
                  {orderData.extrasTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-text/60">Extra options</span>
                      <span>{orderData.extrasTotal} PLN</span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-blue-100 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">{orderData.total} PLN</span>
                  </div>
                  
                  <div className="pt-3 border-t border-blue-100">
                    <div className="flex justify-between text-xs text-text/60">
                      <span>Payment:</span>
                      <span>{orderData.paymentMethod === "card" ? "Card" : "Cash"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-blue-100 text-center">
                  <p className="text-xs text-text/40">
                    Thank you for choosing CzystyDom!<br />
                    See you on {orderData.selectedDate}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Send Receipt by Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl border border-blue-100 p-4 md:p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-text">Send Receipt to Email</h3>
            </div>
            
            {emailSent ? (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl text-green-700">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Receipt sent to {email}</span>
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-blue-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <button
                  onClick={handleSendReceipt}
                  disabled={!email}
                  className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/"
              className="flex-1 py-4 bg-blue-50 text-text font-bold rounded-2xl text-center hover:bg-blue-100 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/order"
              className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl text-center hover:bg-primary/90 transition-all"
            >
              Book Another Cleaning
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
