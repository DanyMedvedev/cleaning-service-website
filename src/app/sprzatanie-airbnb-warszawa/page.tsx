import type { Metadata } from "next";
// @ts-ignore
import AirbnBServiceContent from "../services/airbnb/AirbnBServiceContent";

export const metadata: Metadata = {
  title: "Sprzątanie Airbnb Warszawa | Profesjonalna firma sprzątająca",
  description: "Profesjonalne sprzątanie mieszkań na wynajem w Warszawie. Szybka realizacja 2-3 godziny. Świeża pościel i ręczniki. Cena od 120 zł.",
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