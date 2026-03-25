import type { Metadata } from "next";
// @ts-ignore
import AirbnBServiceContent from "../services/airbnb/AirbnBServiceContent";

export const metadata: Metadata = {
  title: "Sprzątanie Airbnb Warszawa | Profesjonalna firma sprzątająca",
  description: "Profesjonalne sprzątanie mieszkań w Warszawie – kuchnia, łazienka, pokoje i przedpokój. Standardowe usługi już od 170 zł. Gwarantujemy dokładność i komfort w Twoim domu. 📞 Zadzwoń: +48 731 751 255",
  keywords: "sprzątanie Airbnb Warszawa, sprzątanie mieszkania na wynajem Warszawa, cleaning service Warsaw",
  alternates: {
    canonical: "https://czystydom.online/sprzatanie-airbnb-warszawa",
  },
  openGraph: {
    title: "Sprzątanie Airbnb Warszawa | Profesjonalna firma sprzątająca CzystyDom",
    description: "Profesjonalne sprzątanie mieszkań na wynajem w Warszawie.",
    url: "https://czystydom.online/sprzatanie-airbnb-warszawa",
    siteName: "CzystyDom",
    locale: "pl_PL",
    type: "website",
  },
};

export default function AirbnbServicePage() {
  return <AirbnBServiceContent />;
}