"use client";

import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 80);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "rgba(5, 5, 5, 0.78)"
            : "rgba(5, 5, 5, 0)",
          borderColor: scrolled
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(255, 255, 255, 0)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="border-b"
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <AnimatePresence mode="wait">
            {scrolled ? (
              <motion.div
                key="navbar-logo"
                layoutId="santucho-brand"
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                }}
                className="w-[150px] sm:w-[170px]"
              >
                <BrandLogo />
              </motion.div>
            ) : (
              <div
                aria-hidden="true"
                className="w-[150px] opacity-0 sm:w-[170px]"
              />
            )}
          </AnimatePresence>

          {/* Desktop navigation */}
          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-8 md:flex"
          >
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/55 transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="#contacto"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              Contacto
            </Link>
          </nav>

          {/* Mobile menu */}
          <button
            type="button"
            aria-label="Abrir menú"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
          >
            <span className="sr-only">Menú</span>

            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-white" />
              <span className="block h-px w-4 bg-white" />
            </span>
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}