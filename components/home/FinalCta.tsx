"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";

const SantuchoLanyard = dynamic(
    () => import("./SantuchoLanyard").then((mod) => mod.SantuchoLanyard),
    { ssr: false },
);

export function FinalCTA() {
    return (
        <section
            id="contacto"
            className="relative isolate overflow-hidden bg-[#050505] px-6 py-28 text-white lg:px-10 lg:py-40"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,255,255,0.045),transparent_35%)]"
            />

            <div className="relative mx-auto grid max-w-[1600px] items-center lg:grid-cols-[1fr_0.8fr]">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">
                        Tu próximo evento
                    </p>

                    <h2 className="mt-6 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-semibold uppercase leading-[0.78] tracking-[-0.08em]">
                        Hagamos
                        <br />
                        que pase.
                    </h2>

                    <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
                        Contanos qué tenés en mente y creemos juntos una experiencia
                        que todos quieran recordar.
                    </p>

                    <div className="mt-10">
                        <Link
                            href="#"
                            className="group inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
                        >
                            Hablar por WhatsApp

                            <span
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <SantuchoLanyard
                        logoSrc="/logo-black.png"
                        eyebrow="Event production"
                        index="01"
                        captionTop="Experiencias que se recuerdan"
                        captionBottom="Tucumán · Argentina"
                    />
                </div>
            </div>
        </section>
    );
}