import type { Metadata } from "next";
// @ts-ignore
import ExtrasServiceContent from "../services/extras/ExtrasServiceContent";

export const metadata: Metadata = {
  title: "Dodatkowe usługi sprzątania Warszawa | Mycie okien, piekarnika, lodówki",
  description: "Dodatkowe usługi sprzątania w Warszawie. Mycie okien, czyszczenie piekarnika, lodówki, sprzątanie balkonu.",
  keywords: "dodatkowe usługi sprzątania Warszawa, mycie okien Warszawa, czyszczenie piekarnika Warszawa",
  alternates: {
    canonical: "https://czystydom.online/dodatkowe-uslugi-sprzatania-warszawa",
  },
  openGraph: {
    title: "Dodatkowe usługi sprzątania Warszawa | Mycie okien, piekarnika, lodówki",
    description: "Dodatkowe usługi sprzątania w Warszawie.",
    url: "https://czystydom.online/dodatkowe-uslugi-sprzatania-warszawa",
    siteName: "CzystyDom",
    locale: "pl_PL",
    type: "website",
  },
};

export default function ExtrasServicePage() {
  return <ExtrasServiceContent />;
}