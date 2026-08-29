"use client";

import Link from "next/link";
import { type MouseEvent, type ReactNode } from "react";

import { useSmoothScroll } from "@/providers/SmoothScrollProvider";

export function AnchorLink({
    href,
    className,
    children,
}: {
    href: string;
    className?: string;
    children: ReactNode;
}) {
    const { scrollTo } = useSmoothScroll();

    function handleClick(e: MouseEvent<HTMLAnchorElement>) {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        // -90 compensa la altura fija del navbar (h-20 + margen)
        scrollTo(href, { offset: -90, duration: 1.2 });
    }

    return (
        <Link href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}