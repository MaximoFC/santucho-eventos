"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { services } from "@/data/services";

export function Services() {
    const featuredServices = services.filter(
        (service) => service.featured,
    );

    return (
        <section
            id="servicios"
            className="bg-[#050505] px-6 py-24 text-white lg:px-10 lg:py-36"
        >
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="mb-14 flex flex-col gap-8 border-t border-white/10 pt-7 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">
                            Servicios
                        </p>

                        <h2 className="mt-6 max-w-4xl text-[clamp(3.5rem,7vw,7rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em]">
                            Todo para crear
                            <br />
                            el momento.
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-relaxed text-white/50 lg:pb-1">
                        Una producción integral para convertir una idea en una
                        experiencia que se vive de principio a fin.
                    </p>
                </div>

                {/* Services grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredServices.map((service, index) => {
                        const isFeatured = index === 0;

                        return (
                            <motion.article
                                key={service.slug}
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
                                    duration: 0.65,
                                    delay: index * 0.08,
                                }}
                                className={
                                    isFeatured
                                        ? "sm:col-span-2 lg:col-span-2"
                                        : ""
                                }
                            >
                                <Link
                                    href={`/servicios/${service.slug}`}
                                    aria-label={`Ver servicio ${service.title}`}
                                    className="group block h-full"
                                >
                                    <div
                                        className={`relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-neutral-900 ${
                                            isFeatured
                                                ? "aspect-[4/3] lg:aspect-[16/10]"
                                                : "aspect-[4/5]"
                                        }`}
                                    >
                                        {/* Image */}
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            sizes={
                                                isFeatured
                                                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                                                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            }
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                        {/* Overlay */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                                        />

                                        {/* Top metadata */}
                                        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 sm:p-6">
                                            <span>{service.number}</span>

                                            <span>{service.category}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                                            <div className="flex items-end justify-between gap-5">
                                                <div className="max-w-xl">
                                                    <h3
                                                        className={`font-semibold uppercase leading-[0.88] tracking-[-0.06em] ${
                                                            isFeatured
                                                                ? "text-4xl sm:text-5xl lg:text-6xl"
                                                                : "text-3xl"
                                                        }`}
                                                    >
                                                        {service.title}
                                                    </h3>

                                                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                                                        {
                                                            service.description
                                                        }
                                                    </p>
                                                </div>

                                                {/* Arrow */}
                                                <span
                                                    aria-hidden="true"
                                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-lg transition-all duration-300 group-hover:translate-x-1 group-hover:border-white group-hover:bg-white group-hover:text-black"
                                                >
                                                    ↗
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        );
                    })}
                </div>

                {/* Catalogue CTA */}
                <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-md text-sm leading-relaxed text-white/40">
                        Descubrí todas las experiencias, servicios y propuestas
                        disponibles para tu próximo evento.
                    </p>

                    <Link
                        href="/servicios"
                        className="group inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-white/65 transition-colors duration-300 hover:text-white"
                    >
                        Ver todos los servicios

                        <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}