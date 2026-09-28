import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import Link from "next/link";

import { services } from "@/data/services";

export const metadata: Metadata = {
    title: "Servicios",
    description:
        "Descubrí los servicios de producción audiovisual, entretenimiento y ambientación de Santucho Eventos para crear una experiencia única.",
    alternates: { canonical: "/servicios" },
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <section className="px-6 pb-24 pt-32 lg:px-10 lg:pb-36 lg:pt-40">
                <div className="mx-auto max-w-[1600px]">
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">
                        Servicios
                    </p>

                    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
                        <h1 className="max-w-5xl text-[clamp(4rem,9vw,9rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
                            Todo para
                            <br />
                            que el evento
                            <br />
                            suceda.
                        </h1>

                        <p className="max-w-xl text-lg leading-relaxed text-white/55 lg:justify-self-end lg:pb-2">
                            Producción técnica, ambientación y experiencias pensadas
                            para adaptar cada evento a su escala, estilo y público.
                        </p>
                    </div>
                </div>
            </section>

            <section
                id="servicios"
                className="px-6 pb-32 lg:px-10 lg:pb-40"
            >
                <div className="mx-auto max-w-[1600px]">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/servicios/${service.slug}`}
                                className="group relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-white/10 bg-neutral-900"
                            >
                                {service.image ? (
                                    <Image
                                        src={service.image.src}
                                        alt={service.image.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                <div className="absolute inset-x-0 top-0 flex justify-between p-5 text-[10px] uppercase tracking-[0.2em] text-white/55">
                                    <span>{service.number}</span>
                                    <span>{service.category}</span>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                                    <div>
                                        <h2 className="text-3xl font-semibold uppercase leading-[0.88] tracking-[-0.06em]">
                                            {service.title}
                                        </h2>

                                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                                            {service.description}
                                        </p>
                                    </div>

                                    <span
                                        aria-hidden="true"
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-lg transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black"
                                    >
                                        <Icon name="arrow-up-right" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}