import type { Metadata } from "next";

import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { services } from "@/data/services";
import { ServiceGallery } from "@/components/services/service-gallery";
import { whatsappHref } from "@/lib/whatsapp";
import { AnchorLink } from "@/components/ui/AnchorLink";

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Slugs fuera del catálogo devuelven 404 sin renderizar on-demand.
export const dynamicParams = false;

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

    const images = service.image ? [{ url: service.image.src, alt: service.image.alt }] : undefined;

    return {
        title: service.title,
        description: service.description,
        alternates: { canonical: `/servicios/${service.slug}` },
        openGraph: {
            title: `${service.title} | Santucho Eventos`,
            description: service.description,
            images,
        },
        twitter: { images },
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

    const details = [
        { label: "Opciones", items: service.variants },
        { label: "Incluye", items: service.includes },
        { label: "Cómo se cotiza", items: service.pricing ? [service.pricing] : undefined },
    ].filter((group) => group.items && group.items.length > 0);

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            {/* Hero */}
            <section className="px-6 pb-24 pt-32 lg:px-10 lg:pb-36 lg:pt-40">
                <div className="mx-auto max-w-[1600px]">
                    <Link
                        href="/servicios"
                        className="inline-flex items-center gap-2 py-2 text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
                    >
                        <span aria-hidden="true"><Icon name="arrow-left" /></span>
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

                            <h1 className="mt-4 max-w-4xl break-words text-[clamp(3.25rem,8vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
                                {service.title}
                            </h1>

                            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/55">
                                {service.description}
                            </p>
                        </div>

                        {service.image && (
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
                                <Image
                                    src={service.image.src}
                                    alt={service.image.alt}
                                    fill
                                    preload
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Details */}
            {details.length > 0 && (
                <section className="px-6 pb-32 lg:px-10 lg:pb-40">
                    <div className="mx-auto max-w-[1600px] border-t border-white/10 pt-8">
                        <div className="grid gap-12 lg:grid-cols-[0.6fr_1fr]">
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                                    Detalles
                                </p>

                                <h2 className="mt-5 max-w-md text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] sm:text-5xl">
                                    Pensado para tu evento.
                                </h2>
                            </div>

                            <dl className="grid gap-10">
                                {details.map((group) => (
                                    <div key={group.label}>
                                        <dt className="text-xs uppercase tracking-[0.2em] text-white/40">
                                            {group.label}
                                        </dt>

                                        <dd>
                                            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                                                {group.items!.map((item) => (
                                                    <li
                                                        key={item}
                                                        className="flex items-center gap-4 py-5 text-base text-white/70"
                                                    >
                                                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff1010]/70" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery */}
            {service.gallery && service.gallery.length > 0 && (
                <ServiceGallery items={service.gallery} title={service.title} />
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

                        <AnchorLink
                            href={whatsappHref(`Hola Santucho, quiero consultar por el servicio de ${service.title}.`)}
                            className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff1010]"
                        >
                            Consultar por WhatsApp
                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1"><Icon name="arrow-right" /></span>
                        </AnchorLink>
                    </div>
                </div>
            </section>
        </main>
    );
}
