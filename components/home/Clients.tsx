"use client";

import Image from "next/image";

import { CLIENTS } from "@/content/clients";

const FIRST_ROW = CLIENTS;
const SECOND_ROW = [...CLIENTS].reverse();

function LogoRow({
    clients,
    reverse = false,
}: {
    clients: typeof CLIENTS;
    reverse?: boolean;
}) {
    const duplicatedClients = [...clients, ...clients];

    return (
        <div
            className="group relative flex w-max"
            data-direction={reverse ? "reverse" : "forward"}
        >
            <div
                className={`flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16 lg:gap-24 lg:pr-24 ${
                    reverse
                        ? "animate-clients-reverse"
                        : "animate-clients"
                }`}
            >
                {duplicatedClients.map((client, index) => (
                    <div
                        key={`${client.id}-${index}`}
                        className="flex h-16 w-32 shrink-0 items-center justify-center sm:h-20 sm:w-40"
                    >
                        <Image
                            src={client.logo}
                            alt={client.name}
                            width={160}
                            height={80}
                            className="max-h-12 w-auto max-w-[9rem] object-contain opacity-45 grayscale transition duration-500 group-hover:opacity-70 sm:max-h-14 sm:max-w-[10rem]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Clients() {
    return (
        <section
            aria-labelledby="clients-title"
            className="relative overflow-hidden bg-[#050505] py-24 text-white lg:py-32"
        >
            <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
                <div className="border-t border-white/10 pt-7">
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">
                        Confianza
                    </p>

                    <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <h2
                            id="clients-title"
                            className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em]"
                        >
                            Quienes
                            <br />
                            confían.
                        </h2>

                        <p className="max-w-sm text-sm leading-relaxed text-white/45">
                            Instituciones, espacios y organizaciones que
                            eligieron a Santucho para hacer realidad sus
                            eventos.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative mt-16 space-y-5 lg:mt-24 lg:space-y-7">
                {/* Fades laterales */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050505] to-transparent sm:w-28 lg:w-48"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050505] to-transparent sm:w-28 lg:w-48"
                />

                <LogoRow clients={FIRST_ROW} />

                <LogoRow clients={SECOND_ROW} reverse />
            </div>
        </section>
    );
}