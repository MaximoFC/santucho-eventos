"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { ServiceImage } from "@/types/service";

interface ServiceGalleryProps {
    items: readonly ServiceImage[];
    title: string;
}

const AUTOPLAY_INTERVAL = 6000;
const SWIPE_THRESHOLD = 40;

const pad = (value: number) => String(value).padStart(2, "0");

export function ServiceGallery({ items, title }: ServiceGalleryProps) {
    const [{ active, previous }, setSlides] = useState({ active: 0, previous: -1 });
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const reduceMotion = useReducedMotion();
    const swipeStart = useRef<number | null>(null);

    const count = items.length;
    const hasMany = count > 1;
    const autoplay = hasMany && !paused && !hovered && !reduceMotion;

    const goTo = (index: number) =>
        setSlides((current) =>
            index === current.active
                ? current
                : { active: (index + count) % count, previous: current.active },
        );

    useEffect(() => {
        if (!autoplay) return;

        const timeout = window.setTimeout(() => {
            setSlides((current) => ({
                active: (current.active + 1) % count,
                previous: current.active,
            }));
        }, AUTOPLAY_INTERVAL);

        return () => window.clearTimeout(timeout);
    }, [autoplay, active, count]);

    if (count === 0) return null;

    const next = (active + 1) % count;

    return (
        <section
            aria-labelledby="service-gallery-title"
            className="px-6 pb-32 lg:px-10 lg:pb-40"
        >
            <div className="mx-auto max-w-[1600px]">
                <div className="border-t border-white/10 pt-8">
                    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                                Experiencia
                            </p>

                            <h2
                                id="service-gallery-title"
                                className="mt-5 max-w-md text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] sm:text-5xl"
                            >
                                Así se vive.
                            </h2>
                        </div>

                        {hasMany && (
                            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                <span className="text-white">{pad(active + 1)}</span> / {pad(count)}
                            </p>
                        )}
                    </div>

                    <div
                        role="group"
                        aria-roledescription="carrusel"
                        aria-label={`Fotos de ${title}`}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onFocus={() => setHovered(true)}
                        onBlur={() => setHovered(false)}
                        onKeyDown={(event) => {
                            if (!hasMany) return;
                            if (event.key === "ArrowLeft") goTo(active - 1);
                            if (event.key === "ArrowRight") goTo(active + 1);
                        }}
                        onPointerDown={(event) => {
                            swipeStart.current = event.clientX;
                        }}
                        onPointerUp={(event) => {
                            if (swipeStart.current === null || !hasMany) return;
                            const delta = event.clientX - swipeStart.current;
                            swipeStart.current = null;
                            if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(active + (delta < 0 ? 1 : -1));
                        }}
                        className="relative aspect-[4/5] touch-pan-y select-none overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 sm:aspect-[16/10] lg:aspect-[16/9]"
                    >
                        {items.map((item, index) => {
                            const isActive = index === active;
                            // Solo se cargan la actual, la saliente (crossfade) y la siguiente (precarga).
                            const isMounted = isActive || index === previous || index === next;

                            return (
                                <div
                                    key={item.src}
                                    role="group"
                                    aria-roledescription="diapositiva"
                                    aria-label={`${index + 1} de ${count}`}
                                    aria-hidden={!isActive}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
                                        isActive ? "opacity-100" : "opacity-0"
                                    }`}
                                >
                                    {/* Fondo desenfocado de la misma foto: las verticales no quedan recortadas */}
                                    {isMounted && (
                                    <>
                                    <Image
                                        src={item.src}
                                        alt=""
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 90vw"
                                        className="scale-110 object-cover opacity-40 blur-2xl"
                                    />

                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 90vw"
                                        className="object-contain"
                                    />
                                    </>
                                    )}
                                </div>
                            );
                        })}

                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent"
                        />

                        <p aria-live={autoplay ? "off" : "polite"} className="absolute bottom-5 left-5 max-w-[70%] text-xs text-white/70 sm:bottom-6 sm:left-6">
                            {items[active].alt}
                        </p>
                    </div>

                    {hasMany && (
                        <div className="mt-5 flex items-center justify-between gap-4">
                            <div className="flex">
                                {items.map((item, index) => (
                                    <button
                                        key={item.src}
                                        type="button"
                                        aria-label={`Ver foto ${index + 1}`}
                                        aria-current={index === active ? "true" : undefined}
                                        onClick={() => goTo(index)}
                                        className="group flex h-11 items-center px-1.5 focus-visible:outline-2 focus-visible:outline-[#ff1010]"
                                    >
                                        <span
                                            className={`block h-px transition-all duration-300 ${
                                                index === active
                                                    ? "w-10 bg-[#ff1010]"
                                                    : "w-5 bg-white/25 group-hover:w-8 group-hover:bg-white/60"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                {!reduceMotion && (
                                    <button
                                        type="button"
                                        aria-label={paused ? "Reanudar reproducción" : "Pausar reproducción"}
                                        onClick={() => setPaused((value) => !value)}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xs text-white/60 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-[#ff1010]"
                                    >
                                        <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
                                    </button>
                                )}

                                <button
                                    type="button"
                                    aria-label="Foto anterior"
                                    onClick={() => goTo(active - 1)}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-[#ff1010]"
                                >
                                    <span aria-hidden="true">←</span>
                                </button>

                                <button
                                    type="button"
                                    aria-label="Foto siguiente"
                                    onClick={() => goTo(active + 1)}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-[#ff1010]"
                                >
                                    <span aria-hidden="true">→</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
