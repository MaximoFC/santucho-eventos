"use client";

import Image from "next/image";

import {
    AnimatePresence,
    motion,
} from "motion/react";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { GALLERY } from "@/content/gallery";

export function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(
        null,
    );

    const close = useCallback(() => {
        setActiveIndex(null);
    }, []);

    const move = useCallback((direction: number) => {
        setActiveIndex((current) => {
            if (current === null) return null;

            return (
                (current + direction + GALLERY.length) %
                GALLERY.length
            );
        });
    }, []);

    useEffect(() => {
        if (activeIndex === null) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            }

            if (event.key === "ArrowLeft") {
                move(-1);
            }

            if (event.key === "ArrowRight") {
                move(1);
            }
        };

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;

            window.removeEventListener(
                "keydown",
                onKeyDown,
            );
        };
    }, [activeIndex, close, move]);

    return (
        <>
            <section
                id="momentos"
                className="bg-[#050505] px-6 py-20 text-white lg:px-10 lg:py-28"
            >
                <div className="mx-auto max-w-[1600px]">
                    {/* Header */}
                    <div className="mb-10 grid gap-6 border-t border-white/10 pt-6 lg:mb-12 lg:grid-cols-[1fr_0.42fr] lg:items-end">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">
                                Momentos Santucho
                            </p>

                            <h2 className="mt-5 max-w-5xl text-[clamp(3.25rem,7vw,7.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em]">
                                Noches
                                <br />
                                que quedan.
                            </h2>
                        </div>

                        <p className="max-w-sm text-sm leading-relaxed text-white/50 lg:pb-1">
                            Algunas de las experiencias que
                            tuvimos el placer de hacer realidad.
                        </p>
                    </div>

                    {/* Gallery */}
                    <div className="grid auto-rows-[minmax(190px,22vw)] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
                        {GALLERY.map((item, index) => (
                            <motion.button
                                key={item.id}
                                type="button"
                                onClick={() =>
                                    setActiveIndex(index)
                                }
                                initial={{
                                    opacity: 0,
                                    y: 18,
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
                                    duration: 0.55,
                                    delay: Math.min(
                                        index * 0.05,
                                        0.2,
                                    ),
                                }}
                                className={[
                                    "group relative overflow-hidden rounded-2xl text-left",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                                    item.layout,
                                ].join(" ")}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 40vw"
                                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/0 transition-colors duration-300 group-hover:text-white/75">
                                        Ver imagen
                                    </span>

                                    <span
                                        aria-hidden="true"
                                        className="flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-sm opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:border-white/50 group-hover:opacity-100"
                                    >
                                        ↗
                                    </span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Galería de imágenes"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 p-5 backdrop-blur-xl sm:p-8"
                    >
                        {/* Background close */}
                        <button
                            type="button"
                            aria-label="Cerrar galería"
                            onClick={close}
                            className="absolute inset-0 cursor-default"
                        />

                        <div className="relative z-10 flex h-full flex-col">
                            {/* Top bar */}
                            <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                                <span>
                                    Santucho Producciones
                                </span>

                                <div className="flex items-center gap-4">
                                    <span>
                                        {String(
                                            activeIndex + 1,
                                        ).padStart(2, "0")}{" "}
                                        /{" "}
                                        {String(
                                            GALLERY.length,
                                        ).padStart(2, "0")}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={close}
                                        aria-label="Cerrar galería"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-lg text-white transition-colors hover:bg-white/10"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative flex min-h-0 flex-1 items-center justify-center py-10">
                                <Image
                                    src={
                                        GALLERY[activeIndex].src
                                    }
                                    alt={
                                        GALLERY[activeIndex].alt
                                    }
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                    priority
                                />

                                {/* Previous */}
                                <button
                                    type="button"
                                    aria-label="Imagen anterior"
                                    onClick={() => move(-1)}
                                    className="absolute left-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                                >
                                    ←
                                </button>

                                {/* Next */}
                                <button
                                    type="button"
                                    aria-label="Imagen siguiente"
                                    onClick={() => move(1)}
                                    className="absolute right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}