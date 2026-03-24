import type { Metadata } from "next";
import { Montserrat, DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat"
});
const dmSerifDisplay = DM_Serif_Display({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif"
});
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans"
});

export const metadata: Metadata = {
  title: "Modern Cleaning Service",
  description: "Get your home clean and fresh with our professional services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${dmSerifDisplay.variable} ${dmSans.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
