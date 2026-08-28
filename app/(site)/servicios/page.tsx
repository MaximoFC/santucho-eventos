import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "Servicios",
    description:
        "Descubrí los servicios de entretenimiento y producción disponibles para crear una experiencia única en tu próximo evento.",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#050505] px-6 py-32 text-white lg:px-10">
            <div className="mx-auto max-w-[1600px]">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">
                    Servicios
                </p>

                <h1 className="mt-6 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
                    Todo para
                    <br />
                    hacer única
                    <br />
                    tu noche.
                </h1>

                <p className="mt-10 max-w-xl text-lg leading-relaxed text-white/55">
                    Explorá nuestras propuestas de entretenimiento y
                    producción para encontrar las experiencias que mejor se
                    adaptan a tu evento.
                </p>

                <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {siteConfig.services.map((service) => (
                        <a
                            key={service.slug}
                            href={`/servicios/${service.slug}`}
                            className="group relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-white/10 bg-neutral-900"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                            <div className="absolute inset-x-0 top-0 flex justify-between p-5 text-[10px] uppercase tracking-[0.2em] text-white/55">
                                <span>{service.number}</span>
                                <span>{service.category}</span>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                                <h2 className="text-3xl font-semibold uppercase leading-[0.88] tracking-[-0.06em]">
                                    {service.title}
                                </h2>

                                <span
                                    aria-hidden="true"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25"
                                >
                                    ↗
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </main>
    );
}