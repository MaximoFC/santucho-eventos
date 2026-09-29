import { siteConfig } from "@/config/site";

// Sin número configurado cae al CTA final, así ningún botón queda roto.
export function whatsappHref(
    message: string = siteConfig.contact.whatsappMessage,
    phone: string = siteConfig.contact.whatsapp,
) {
    if (!phone) return "/#contacto";

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
