import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { Experiences } from "@/components/sections/Experiences";
import { Positioning } from "@/components/sections/Positioning";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/home/Gallery";
import { Clients } from "@/components/home/Clients";
import { FinalCTA } from "@/components/home/FinalCta";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Solo datos confirmados: sin dirección, horarios ni teléfono hasta que el cliente los confirme.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  foundingDate: String(siteConfig.founded),
  logo: `${siteConfig.url}${siteConfig.logo.src}`,
  image: `${siteConfig.url}/images/hero-main.PNG`,
  areaServed: siteConfig.coverage.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  telephone: siteConfig.contact.whatsapp ? `+${siteConfig.contact.whatsapp}` : undefined,
  sameAs: [siteConfig.contact.instagram, siteConfig.contact.facebook].filter(Boolean),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Hero />

      <Experiences />

      <Positioning />

      <Services />

      <Gallery />

      <Clients />

      <FinalCTA />
    </main>
  )
}
