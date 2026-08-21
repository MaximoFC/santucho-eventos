import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type BrandLogoProps = {
    className?: string;
    priority?: boolean;
    href?: string;
};

export function BrandLogo({
    className = "",
    priority = false,
    href = "/",
}: BrandLogoProps) {
    return (
        <Link
            href={href}
            aria-label="Santucho Eventos - Inicio"
            className={`block ${className}`}
        >
            <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={420}
                height={180}
                priority={priority}
                className="h-auto w-full object-contain"
            />
        </Link>
    );
}