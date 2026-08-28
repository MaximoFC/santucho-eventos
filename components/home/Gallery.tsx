"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { GALLERY } from "@/content/gallery";

export function Gallery() {
    return (
        <section
            id="momentos"
            className="bg-[#050505] px-6 py-24 text-white lg:px-10 lg:py-36"
        >
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="mb-14 border-t border-white/10 pt-7 lg:mb-20">
                    <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">
                                Momentos Santucho
                            </p>

                            <h2 className="mt-6 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
                                Noches
                                <br />
                                que quedan.
                            </h2>
                        </div>

                        <p className="max-w-sm text-sm leading-relaxed text-white/50 lg:pb-2">
                            Algunas de las experiencias que tuvimos
                            el placer de hacer realidad.
                        </p>
                    </div>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
                    {GALLERY.map((item, index) => {
                        const featured = item.featured;

                        return (
                            <motion.figure
                                key={item.id}
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.15,
                                }}
                                transition={{
                                    duration: 0.7,
                                    delay: Math.min(index * 0.06, 0.3),
                                }}
                                className={
                                    featured
                                        ? "group relative overflow-hidden rounded-[1.5rem] md:col-span-2 lg:col-span-8"
                                        : "group relative overflow-hidden rounded-[1.5rem] lg:col-span-4"
                                }
                            >
                                <div
                                    className={
                                        featured
                                            ? "relative aspect-[16/10] overflow-hidden"
                                            : "relative aspect-[4/5] overflow-hidden"
                                    }
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        sizes={
                                            featured
                                                ? "(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 66vw"
                                                : "(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 33vw"
                                        }
                                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
                                        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
                                            Santucho Producciones
                                        </span>

                                        <span
                                            aria-hidden="true"
                                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-sm backdrop-blur-sm"
                                        >
                                            ↗
                                        </span>
                                    </div>
                                </div>
                            </motion.figure>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}