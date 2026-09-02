"use client";

import Image from "next/image";

import {
    AnimatePresence,
    motion,
} from "motion/react";

import {
    useEffect,
    useState,
} from "react";

import type { GalleryItem } from "@/content/gallery";

type GalleryLightboxProps = {
    items: GalleryItem[];
    activeIndex: number | null;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
};

export function GalleryLightbox({
    items,
    activeIndex,
    onClose,
    onPrevious,
    onNext,
}: GalleryLightboxProps) {
    const open = activeIndex !== null;

    const item =
        activeIndex !== null
            ? items[activeIndex]
            : null;

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft") {
                onPrevious();
            }

            if (event.key === "ArrowRight") {
                onNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [open, onClose, onPrevious, onNext]);

    return (
        <AnimatePresence>
            {open && item && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Galería de imágenes"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
                >
                    {/* Backdrop */}
                    <button
                        type="button"
                        aria-label="Cerrar galería"
                        onClick={onClose}
                        className="absolute inset-0 cursor-default"
                    />

                    {/* Top bar */}
                    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
                        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                            Santucho Producciones
                        </span>

                        <div className="flex items-center gap-5">
                            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                                {String(activeIndex + 1).padStart(2, "0")}{" "}
                                /{" "}
                                {String(items.length).padStart(2, "0")}
                            </span>

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Cerrar galería"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative z-[1] flex h-full w-full items-center justify-center px-6 py-24 sm:px-16 lg:px-24">
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                        >
                            <motion.div
                                key={item.id}
                                initial={{
                                    opacity: 0,
                                    scale: 0.97,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.97,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                className="relative h-full w-full"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    {items.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={onPrevious}
                                aria-label="Imagen anterior"
                                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:left-8 lg:left-10"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                onClick={onNext}
                                aria-label="Imagen siguiente"
                                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:right-8 lg:right-10"
                            >
                                →
                            </button>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}