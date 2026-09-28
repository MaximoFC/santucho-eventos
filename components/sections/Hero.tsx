// components/Hero.tsx
"use client";

import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";

import { AnchorLink } from "@/components/ui/AnchorLink";
import { siteConfig } from "@/config/site";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { whatsappHref } from "@/lib/whatsapp";

export function Hero() {
    const { scrolled } = useSmoothScroll();
    const { scrollY } = useScroll();

    const rawMainY = useTransform(scrollY, [0, 600], [0, 60]);
    const rawSecondaryY = useTransform(scrollY, [0, 600], [0, -30]);

    // Spring suaviza los saltos crudos del scroll y elimina la vibración
    const mainImageY = useSpring(rawMainY, { stiffness: 120, damping: 24, mass: 0.4 });
    const secondaryImageY = useSpring(rawSecondaryY, { stiffness: 120, damping: 24, mass: 0.4 });

    return (
        <section id="inicio" className="relative min-h-svh overflow-hidden bg-[#050505] text-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-1/4 z-0 h-96 w-96 rounded-full bg-red-500/[0.04] blur-[140px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/3 z-0 h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-[160px]"
            />

            <motion.div
                style={{ y: mainImageY, willChange: "transform" }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute inset-y-0 right-0 z-10 w-full sm:w-[80%] lg:w-[60%]"
            >
                <Image
                    src="/images/hero-main.PNG"
                    alt="Artista durante un evento producido por Santucho Eventos"
                    fill
                    preload
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    className="object-cover"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#050505] to-transparent"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    style={{ willChange: "transform" }}
                    className="absolute bottom-[8%] right-[6%] rounded-full border border-white/10 bg-black/65 px-4 py-2.5 backdrop-blur-md"
                >
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/65">
                        Producción audiovisual
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                style={{ y: secondaryImageY, willChange: "transform" }}
                initial={{ opacity: 0, x: 40, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 2 }}
                transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
                className="absolute bottom-10 left-[54%] z-20 hidden h-[190px] w-[230px] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-2xl sm:block lg:bottom-14 lg:left-[38%] lg:h-[220px] lg:w-[260px]"
            >
                <Image
                    src="/images/hero-led.PNG"
                    alt="Pantalla LED durante un evento producido por Santucho Eventos"
                    fill
                    sizes="260px"
                    className="object-cover"
                />
            </motion.div>

            <div className="relative z-30 mx-auto flex min-h-svh max-w-[1600px] flex-col justify-center px-6 pb-16 pt-28 lg:px-10 lg:pb-10 lg:pt-24">
                <div className="max-w-xl lg:max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-white/45">
                            {siteConfig.hero.eyebrow}
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="invisible" aria-hidden="true">
                            <div className="max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em]">
                                <span className="block">
                                    {siteConfig.hero.title}
                                </span>

                                <span className="block text-white/90">
                                    {siteConfig.hero.titleAccent}
                                </span>
                            </div>
                        </div>

                        <AnimatePresence initial={false}>
                            {!scrolled && (
                                <motion.div
                                    key="hero-brand"
                                    layoutId="santucho-brand"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        layout: {
                                            type: "spring",
                                            stiffness: 280,
                                            damping: 30,
                                            mass: 0.8,
                                        },
                                        opacity: {
                                            duration: 0.25,
                                            ease: "easeOut",
                                        },
                                        y: {
                                            duration: 0.35,
                                            ease: "easeOut",
                                        },
                                    }}
                                    className="absolute inset-0"
                                >
                                    <h1 className="max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em]">
                                        <span className="block">
                                            {siteConfig.hero.title}
                                        </span>
                                
                                        <span className="block text-white/90">
                                            {siteConfig.hero.titleAccent}
                                        </span>
                                    </h1>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
                        className="mt-10"
                    >
                        <p className="text-lg leading-relaxed text-white/60 md:text-xl">
                            {siteConfig.hero.description}
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <AnchorLink
                                href={whatsappHref()}
                                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
                            >
                                {siteConfig.hero.primaryCta}
                                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                                    <Icon name="arrow-right" />
                                </span>
                            </AnchorLink>

                            <AnchorLink
                                href="#servicios"
                                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/5"
                            >
                                {siteConfig.hero.secondaryCta}
                            </AnchorLink>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.7 }}
                        className="mt-14 flex items-center gap-8 border-t border-white/10 pt-6"
                    >
                        <div>
                            <p className="text-2xl font-semibold">
                                {new Date().getFullYear() - siteConfig.founded}+
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-wider text-white/35">
                                años de experiencia
                            </p>
                        </div>

                        <div aria-hidden="true" className="h-8 w-px bg-white/10" />

                        <div>
                            <p className="text-2xl font-semibold">{siteConfig.coverage.length}</p>
                            <p className="mt-1 text-xs uppercase tracking-wider text-white/35">
                                provincias
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 md:block"
            >
                <AnchorLink
                    href="#servicios"
                    className="group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35 transition-colors duration-300 hover:text-white/70"
                >
                    <span>Descubrí nuestros servicios</span>
                    <span
                        aria-hidden="true"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition-transform duration-300 group-hover:translate-y-1 group-hover:border-white/30"
                    >
                        <Icon name="arrow-down" />
                    </span>
                </AnchorLink>
            </motion.div>
        </section>
    );
}