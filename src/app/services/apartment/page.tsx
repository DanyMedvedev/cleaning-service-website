// SEO Metadata - Polish language with Warszawa
// This MUST be in a server component (no "use client")
export const metadata = {
  title: "Sprzątanie mieszkań Warszawa | Profesjonalna firma sprzątająca",
  description: "Profesjonalne sprzątanie mieszkań w Warszawie. Oferujemy standardowe i gruntowne sprzątanie mieszkań. Cena od 170 zł. Zadzwoń: +48 731 751 255",
  keywords: "sprzątanie mieszkań Warszawa, firma sprzątająca Warszawa, usługi sprzątania Warszawa, sprzątanie mieszkania Warszawa, czyszczenie mieszkania Warszawa",
  alternates: {
    canonical: "https://czystydom.online/sprzatanie-mieszkan-warszawa",
  },
  openGraph: {
    title: "Sprzątanie mieszkań Warszawa | Profesjonalna firma sprzątająca",
    description: "Profesjonalne sprzątanie mieszkań w Warszawie. Oferujemy standardowe i gruntowne sprzątanie mieszkań. Cena od 170 zł.",
    url: "https://czystydom.online/sprzatanie-mieszkan-warszawa",
    siteName: "CzystyDom",
    locale: "pl_PL",
    type: "website",
  },
};

// Server Component - handles metadata only
import ApartmentServiceContent from "./ApartmentServiceContent";

export default function ApartmentServicePage() {
  return <ApartmentServiceContent />;
}
