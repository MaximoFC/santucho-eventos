import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { services } from "@/data/services";

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({
    params,
}: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;

    const service = services.find((item) => item.slug === slug);

    if (!service) {
        return {};
    }

    return {
        title: service.title,
        description: service.description,
    };
}

export default async function ServicePage({
    params,
}: ServicePageProps) {
    const { slug } = await params;

    const service = services.find((item) => item.slug === slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            {/* Hero */}
            <section className="px-6 pb-24 pt-32 lg:px-10 lg:pb-36 lg:pt-40">
                <div className="mx-auto max-w-[1600px]">
                    <Link
                        href="/servicios"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
                    >
                        <span aria-hidden="true">←</span>
                        Todos los servicios
                    </Link>

                    <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
                        <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                                {service.category}
                            </p>

                            <p className="mt-5 text-sm uppercase tracking-[0.2em] text-white/25">
                                {service.number}
                            </p>

                            <h1 className="mt-4 max-w-4xl text-[clamp(4rem,8vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
                                {service.title}
                            </h1>

                            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/55">
                                {service.description}
                            </p>
                        </div>

                        {service.image && (
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Variants */}
            {service.variants && service.variants.length > 0 && (
                <section className="px-6 pb-32 lg:px-10 lg:pb-40">
                    <div className="mx-auto max-w-[1600px] border-t border-white/10 pt-8">
                        <div className="grid gap-12 lg:grid-cols-[0.6fr_1fr]">
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                                    Opciones
                                </p>

                                <h2 className="mt-5 max-w-md text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] sm:text-5xl">
                                    Adaptamos el servicio a tu evento.
                                </h2>
                            </div>

                            <div>
                                <ul className="divide-y divide-white/10 border-y border-white/10">
                                    {service.variants.map((variant) => (
                                        <li
                                            key={variant}
                                            className="flex items-center justify-between gap-6 py-5"
                                        >
                                            <span className="text-base text-white/70">
                                                {variant}
                                            </span>

                                            <span
                                                aria-hidden="true"
                                                className="text-white/25"
                                            >
                                                ↗
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="px-6 pb-32 lg:px-10">
                <div className="mx-auto max-w-[1600px] border-t border-white/10 pt-8">
                    <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                ¿Querés sumar esta experiencia?
                            </p>

                            <h2 className="mt-3 max-w-xl text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] sm:text-5xl">
                                Hablemos de tu evento.
                            </h2>
                        </div>

                        <Link
                            href="/#contacto"
                            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
                        >
                            Consultar
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}