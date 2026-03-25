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
  title: "CzystyDom - Profesjonalna firma sprzątająca Warszawa | Usługi sprzątania",
  description: "Profesjonalne sprzątanie mieszkań w Warszawie – kuchnia, łazienka, pokoje i przedpokój. Standardowe usługi już od 170 zł. Gwarantujemy dokładność i komfort w Twoim domu. 📞 Zadzwoń: +48 731 751 255",
  keywords: "firma sprzątająca Warszawa, sprzątanie mieszkań Warszawa, usługi sprzątania Warszawa, sprzątanie biur Warszawa, sprzątanie Airbnb Warszawa",
  metadataBase: new URL('https://czystydom.online'),
  alternates: {
    canonical: "https://czystydom.online",
    languages: {
      'pl': 'https://czystydom.online',
      'en': 'https://czystydom.online/en',
    },
  },
  openGraph: {
    title: "CzystyDom - Profesjonalna firma sprzątająca Warszawa",
    description: "Profesjonalne sprzątanie mieszkań w Warszawie – kuchnia, łazienka, pokoje i przedpokój. Standardowe usługi już od 170 zł. Gwarantujemy dokładność i komfort w Twoim domu.",
    url: "https://czystydom.online",
    siteName: "CzystyDom",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/flats-cleaning.png",
        width: 1200,
        height: 630,
        alt: "CzystyDom - Firma sprzątająca Warszawa",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
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
