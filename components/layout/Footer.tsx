import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#050505] px-6 py-12 text-white lg:px-10 lg:py-16">
            <div className="mx-auto max-w-[1600px]">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <Link
                            href="#inicio"
                            className="text-2xl font-semibold uppercase tracking-[-0.06em]"
                        >
                            {siteConfig.name}
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">{siteConfig.footer.slogan}</p>
                    </div>
                    <nav
                        aria-label="Navegación al pie de página"
                        className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs uppercase tracking-[0.18em] text-white/55 sm:flex sm:gap-8"
                    >
                        {siteConfig.footer.links.map((link) => 
                            <Link
                                key={link.href}
                                href={link.href}
                                className="transition hover:text-white"
                            >
                                {link.label}
                            </Link>
                        )}
                    </nav>
                </div>
                <div
                    className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 text-[10px] uppercase trackin[0.18em] text-white/35 sm:flex-row sm:items-center sm:justify-between"
                >
                    <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados</p>
                    <div className="flex gap-6">
                        {siteConfig.footer.socials.map((social) =>
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                            >
                                {social.label}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}