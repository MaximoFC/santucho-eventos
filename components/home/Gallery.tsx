"use client";

import Image from "next/image";

import {
    AnimatePresence,
    motion,
} from "motion/react";

import {
    useCallback,
    useState,
} from "react";

import { GALLERY } from "@/content/gallery";

import { GalleryLightbox } from "./GalleryLightbox";

export function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(
        null,
    );

    const openGallery = (index: number) => {
        setActiveIndex(index);
    };

    const closeGallery = useCallback(() => {
        setActiveIndex(null);
    }, []);

    const previousImage = useCallback(() => {
        setActiveIndex((current) => {
            if (current === null) return null;

            return (
                (current - 1 + GALLERY.length) %
                GALLERY.length
            );
        });
    }, []);

    const nextImage = useCallback(() => {
        setActiveIndex((current) => {
            if (current === null) return null;

            return (
                (current + 1) %
                GALLERY.length
            );
        });
    }, []);

    return (
        <>
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
                                Algunas de las experiencias que
                                tuvimos el placer de hacer realidad.
                            </p>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
                        {GALLERY.map((item, index) => {
                            const featured = item.featured;

                            return (
                                <motion.button
                                    key={item.id}
                                    type="button"
                                    onClick={() =>
                                        openGallery(index)
                                    }
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
                                        amount: 0.12,
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        delay: Math.min(
                                            index * 0.06,
                                            0.3,
                                        ),
                                        ease: "easeOut",
                                    }}
                                    className={[
                                        "group relative overflow-hidden rounded-[1.5rem] text-left",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                                        featured
                                            ? "md:col-span-2 lg:col-span-7"
                                            : "lg:col-span-5",
                                        index === 1
                                            ? "lg:col-start-8"
                                            : "",
                                        index === 2
                                            ? "lg:col-start-8"
                                            : "",
                                    ].join(" ")}
                                >
                                    <div
                                        className={[
                                            "relative overflow-hidden",
                                            featured
                                                ? "aspect-[16/10] lg:aspect-[1.28/1]"
                                                : "aspect-[4/5] md:aspect-[5/6]",
                                        ].join(" ")}
                                    >
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            sizes={
                                                featured
                                                    ? "(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 58vw"
                                                    : "(max-width: 768px) 100vw, (max-width: 1280px) 42vw, 42vw"
                                            }
                                            className="object-cover transition duration-1000 ease-out group-hover:scale-[1.045]"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                                        {/* Hover indicator */}
                                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                                            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/0 transition-all duration-500 group-hover:text-white/70">
                                                Ver imagen
                                            </span>

                                            <span
                                                aria-hidden="true"
                                                className="flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-sm text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:border-white/40 group-hover:opacity-100"
                                            >
                                                ↗
                                            </span>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <GalleryLightbox
                items={GALLERY}
                activeIndex={activeIndex}
                onClose={closeGallery}
                onPrevious={previousImage}
                onNext={nextImage}
            />
        </>
    );
}