// components/Navbar.tsx
"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { siteConfig } from "@/config/site";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { whatsappHref } from "@/lib/whatsapp";

export function Navbar() {
  const { scrolled } = useSmoothScroll();
  // En el Home el logo "viaja" desde el Hero; en el resto de páginas se muestra siempre.
  const isHome = usePathname() === "/";
  const showLogo = scrolled || !isHome;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: showLogo ? "rgba(5, 5, 5, 0.78)" : "rgba(5, 5, 5, 0)",
          borderColor: showLogo ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0)",
          backdropFilter: showLogo ? "blur(18px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="border-b"
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-10">
          <div className="relative aspect-[420/180] w-[150px] sm:w-[170px]">
            <div
              aria-hidden="true"
              inert
              className="pointer-events-none absolute inset-0 opacity-0"
            >
              <BrandLogo priority />
            </div>

            <AnimatePresence initial={false}>
              {showLogo && (
                <motion.div
                  key="navbar-logo"
                  layoutId="santucho-brand"
                  transition={{
                    layout: { type: "spring", stiffness: 280, damping: 28 },
                    opacity: { duration: 0.15, ease: "easeOut" },
                  }}
                  className="absolute inset-0"
                >
                  <BrandLogo />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav aria-label="Navegación principal" className="ml-auto mr-8 hidden items-center gap-8 md:flex">
            {siteConfig.navigation.map((item) => (
              <AnchorLink
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/55 transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </AnchorLink>
            ))}

          </nav>

          {/* Con 3 anclas no hace falta menú: en mobile el único atajo útil es contactar. */}
          <AnchorLink
            href={whatsappHref()}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff1010]"
          >
            Contacto
          </AnchorLink>
        </div>
      </motion.div>
    </motion.header>
  );
}