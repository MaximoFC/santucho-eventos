import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Santucho Eventos | Producción Audiovisual",
    template: "%s | Santucho Eventos",
  },

  description:
    "Santucho Eventos ofrece soluciones audiovisuales profesionales para eventos: sonido, iluminación, pantallas LED, estructuras y asistencia técnica.",

  keywords: [
    "Santucho Eventos",
    "productora de eventos",
    "producción audiovisual",
    "sonido para eventos",
    "pantallas LED",
    "iluminación para eventos",
    "eventos Tucumán",
  ],

  openGraph: {
    title: "Santucho Eventos | Producción Audiovisual",
    description:
      "Soluciones audiovisuales profesionales para crear experiencias inolvidables.",
    type: "website",
    locale: "es_AR",
  },

  twitter: {
    card: "summary_large_image",
    title: "Santucho Eventos | Producción Audiovisual",
    description:
      "Soluciones audiovisuales profesionales para eventos.",
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
