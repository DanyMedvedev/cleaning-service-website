
import type { Metadata } from "next";
import ApartmentServiceContent from '../services/apartment/ApartmentServiceContent';

export const metadata: Metadata = {
  title: "Sprzątanie mieszkań Warszawa | Profesjonalna firma sprzątająca",
  description: "Profesjonalne sprzątanie mieszkań w Warszawie. Oferujemy standardowe i gruntowne sprzątanie mieszkań. Cena od 170 zł.",
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