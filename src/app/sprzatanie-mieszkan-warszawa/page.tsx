
import type { Metadata } from "next";
import ApartmentServiceContent from '../services/apartment/ApartmentServiceContent';

export const metadata: Metadata = {
  title: "Sprzątanie mieszkań Warszawa | Profesjonalna firma sprzątająca",
  description: "Profesjonalne sprzątanie mieszkań w Warszawie – kuchnia, łazienka, pokoje i przedpokój. Standardowe usługi już od 170 zł. Gwarantujemy dokładność i komfort w Twoim domu. 📞 Zadzwoń: +48 731 751 255",
  keywords: "sprzątanie mieszkań Warszawa, firma sprzątająca Warszawa, usługi sprzątania Warszawa",
  alternates: {
    canonical: "https://czystydom.online/sprzatanie-mieszkan-warszawa",
  },
  openGraph: {
    title: "Sprzątanie mieszkań Warszawa | Profesjonalna firma sprzątająca CzystyDom",
    description: "Profesjonalne sprzątanie mieszkań w Warszawie.",
    url: "https://czystydom.online/sprzatanie-mieszkan-warszawa",
    siteName: "CzystyDom",
    locale: "pl_PL",
    type: "website",
  },
};

export default function SprzatanieMieszkanWarszawaPage() {
  return <ApartmentServiceContent />;
}