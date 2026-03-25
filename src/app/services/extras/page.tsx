// SEO Metadata - Polish language with Warszawa
// This is a Server Component - NO "use client" directive!
export const metadata = {
  title: "Dodatkowe usługi sprzątania Warszawa | Mycie okien, piekarnika, lodówki",
  description: "Dodatkowe usługi sprzątania w Warszawie. Mycie okien, czyszczenie piekarnika, lodówki, sprzątanie balkonu. Profesjonalna firma sprzątająca.",
  keywords: "dodatkowe usługi sprzątania Warszawa, mycie okien Warszawa, czyszczenie piekarnika Warszawa, sprzątanie balkonu Warszawa",
  alternates: {
    canonical: "https://czystydom.online/dodatkowe-uslugi-sprzatania-warszawa",
  },
  openGraph: {
    title: "Dodatkowe usługi sprzątania Warszawa | CzystyDom",
    description: "Dodatkowe usługi sprzątania w Warszawie. Mycie okien, piekarnika, lodówki.",
    url: "https://czystydom.online/dodatkowe-uslugi-sprzatania-warszawa",
    siteName: "CzystyDom",
    locale: "pl_PL",
    type: "website",
  },
};

// Server Component - handles metadata only
import ExtrasServiceContent from "./ExtrasServiceContent";

export default function ExtrasServicePage() {
  return <ExtrasServiceContent />;
}
