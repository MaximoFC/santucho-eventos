"use client";

import Image from "next/image";
import Link from "next/link";
import {
    motion,
    useScroll,
    useTransform,
} from "motion/react";

import { siteConfig } from "@/config/site";

export function Hero() {
    const { scrollY } = useScroll();

    const heroBrandScale = useTransform(
        scrollY,
        [0, 350],
        [1, 0.88],
    );

    const heroBrandY = useTransform(
        scrollY,
        [0, 350],
        [0, -80],
    );

    const heroBrandOpacity = useTransform(
        scrollY,
        [0, 350],
        [1, 0],
    );

    const mainImageY = useTransform(
        scrollY,
        [0, 500],
        [0, 70],
    );

    const secondaryImageY = useTransform(
        scrollY,
        [0, 500],
        [0, -40],
    );

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
            {/* Ambient light */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-red-500/[0.04] blur-[140px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-[160px]"
            />

            <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-10 lg:pt-24">
                {/* LEFT */}
                <div className="relative z-20">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                    >
                        <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-white/45">
                            {siteConfig.hero.eyebrow}
                        </p>
                    </motion.div>

                    {/* Brand / H1 */}
                    <motion.div
                        style={{
                            scale: heroBrandScale,
                            y: heroBrandY,
                            opacity: heroBrandOpacity,
                            transformOrigin: "left center",
                        }}
                        className="relative"
                    >
                        <motion.h1
                            layoutId="santucho-brand"
                            className="max-w-4xl text-[clamp(4.25rem,9vw,9rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em]"
                        >
                            <span className="block">
                                {siteConfig.hero.title}
                            </span>

                            <span className="block text-white/90">
                                {siteConfig.hero.titleAccent}
                            </span>
                        </motion.h1>
                    </motion.div>

                    {/* Copy */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 24,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.25,
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                        className="mt-10 max-w-xl"
                    >
                        <p className="text-lg leading-relaxed text-white/60 md:text-xl">
                            {siteConfig.hero.description}
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="#contacto"
                                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
                            >
                                {siteConfig.hero.primaryCta}

                                <span
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </Link>

                            <Link
                                href="#servicios"
                                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/5"
                            >
                                {siteConfig.hero.secondaryCta}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.55,
                            duration: 0.7,
                        }}
                        className="mt-14 flex items-center gap-8 border-t border-white/10 pt-6"
                    >
                        <div>
                            <p className="text-2xl font-semibold">
                                {new Date().getFullYear() -
                                siteConfig.founded}
                                +
                            </p>
                                
                            <p className="mt-1 text-xs uppercase tracking-wider text-white/35">
                                años de experiencia
                            </p>
                        </div>

                        <div
                            aria-hidden="true"
                            className="h-8 w-px bg-white/10"
                        />

                        <div>
                            <p className="text-2xl font-semibold">
                                {siteConfig.coverage.length}
                            </p>

                            <p className="mt-1 text-xs uppercase tracking-wider text-white/35">
                                provincias
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT */}
                <div className="relative min-h-[540px] lg:min-h-[680px]">
                    {/* Main image */}
                    <motion.div
                        style={{
                            y: mainImageY,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 1.04,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            duration: 1.1,
                            ease: "easeOut",
                        }}
                        className="absolute right-0 top-0 h-[72%] w-[84%] overflow-hidden rounded-[2rem] border border-white/10"
                    >
                        <Image
                            src="/images/hero-main.PNG"
                            alt="Artista durante un evento producido por Santucho Eventos"
                            fill
                            priority
                            sizes="(max-width: 1024px) 84vw, 50vw"
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                    </motion.div>
                
                    {/* Secondary image */}
                    <motion.div
                        style={{
                            y: secondaryImageY,
                        }}
                        initial={{
                            opacity: 0,
                            x: 40,
                            rotate: 2,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            rotate: 2,
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.9,
                            ease: "easeOut",
                        }}
                        className="absolute bottom-2 left-0 h-[36%] w-[42%] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-2xl"
                    >
                        <Image
                            src="/images/hero-led.PNG"
                            alt="Pantalla LED durante un evento producido por Santucho Eventos"
                            fill
                            sizes="(max-width: 1024px) 42vw, 25vw"
                            className="object-cover"
                        />
                    </motion.div>
                
                    {/* Floating label */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.6,
                            duration: 0.7,
                        }}
                        className="absolute bottom-[20%] right-[4%] rounded-full border border-white/10 bg-black/65 px-4 py-2.5 backdrop-blur-md"
                    >
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/65">
                            Producción audiovisual
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 1.2,
                    duration: 0.8,
                    ease: "easeOut",
                }}
                className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 md:block"
            >
                <Link
                    href="#servicios"
                    className="group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35 transition-colors duration-300 hover:text-white/70"
                >
                    <span>Descubrí nuestros servicios</span>

                    <span
                        aria-hidden="true"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition-transform duration-300 group-hover:translate-y-1 group-hover:border-white/30"
                    >
                        ↓
                    </span>
                </Link>
            </motion.div>
        </section>
    );
}