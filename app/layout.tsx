import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Santucho Eventos | Producción de eventos en Tucumán";
const description =
  "Sonido, iluminación, pantallas LED, DJ, ambientación y entretenimiento para eventos en Tucumán, Catamarca, Santiago del Estero, Salta y La Rioja.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: title,
    template: "%s | Santucho Eventos",
  },

  description,

  openGraph: {
    title,
    description,
    siteName: siteConfig.name,
    type: "website",
    locale: "es_AR",
    // ponytail: foto del Hero; reemplazar por una pieza 1200x630 con logo cuando exista.
    images: ["/images/hero-main.PNG"],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-main.PNG"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
