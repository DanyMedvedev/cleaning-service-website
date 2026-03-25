import type { Metadata } from "next";
// @ts-ignore
import OfficeServiceContent from "../services/office/OfficeServiceContent";

export const metadata: Metadata = {
  title: "Sprzątanie biur Warszawa | Profesjonalna firma sprzątająca",
  description: "Profesjonalne sprzątanie mieszkań w Warszawie – kuchnia, łazienka, pokoje i przedpokój. Standardowe usługi już od 170 zł. Gwarantujemy dokładność i komfort w Twoim domu. 📞 Zadzwoń: +48 731 751 255",
  keywords: "sprzątanie biur Warszawa, firma sprzątająca biura Warszawa, usługi sprzątania biurowców Warszawa",
  alternates: {
    canonical: "https://czystydom.online/sprzatanie-biur-warszawa",
  },
  openGraph: {
    title: "Sprzątanie biur Warszawa | Profesjonalna firma sprzątająca CzystyDom",
    description: "Profesjonalne sprzątanie biur w Warszawie. Kompleksowe usługi dla firm.",
    url: "https://czystydom.online/sprzatanie-biur-warszawa",
    siteName: "CzystyDom",
    locale: "pl_PL",
    type: "website",
  },
};

export default function OfficeServicePage() {
  return <OfficeServiceContent />;
}