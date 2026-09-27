"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";

import { useSmoothScroll } from "@/providers/SmoothScrollProvider";

export function AnchorLink({
    href,
    className,
    children,
    ariaLabel,
}: {
    href: string;
    className?: string;
    children: ReactNode;
    ariaLabel?: string;
}) {
    const { scrollTo } = useSmoothScroll();
    const pathname = usePathname();

    if (href.startsWith("http")) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className={className}
            >
                {children}
            </a>
        );
    }

    // "#id" o "/#id": en el Home se hace scroll suave; en otras páginas navega al Home.
    const hash = href.startsWith("#") ? href : href.startsWith("/#") ? href.slice(1) : null;

    function handleClick(e: MouseEvent<HTMLAnchorElement>) {
        if (!hash || pathname !== "/") return;
        e.preventDefault();
        // -90 compensa la altura fija del navbar (h-20 + margen)
        scrollTo(hash, { offset: -90, duration: 1.2 });
    }

    return (
        <Link href={href} aria-label={ariaLabel} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}
