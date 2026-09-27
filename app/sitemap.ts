import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: siteConfig.url, priority: 1 },
        { url: `${siteConfig.url}/servicios`, priority: 0.8 },
        ...services.map((service) => ({
            url: `${siteConfig.url}/servicios/${service.slug}`,
            priority: 0.6,
        })),
    ];
}
