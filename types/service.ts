export type ServiceCategory =
    | "MÚSICA"
    | "PRODUCCIÓN TÉCNICA"
    | "ENTRETENIMIENTO"
    | "AMBIENTACIÓN";

export interface ServiceImage {
    src: string;
    alt: string;
}

export interface Service {
    slug: string;
    number: string;
    category: ServiceCategory;
    title: string;
    description: string;
    image?: ServiceImage; // Portada: cards, hero del detalle y Open Graph
    gallery?: ServiceImage[]; // Fotos adicionales (sin repetir la portada)
    pricing?: string; // Cómo se determina el presupuesto del servicio
    includes?: string[]; // Elementos incluidos en la contratación
    featured?: boolean; // Se muestra en el Home (ideal: 3 para completar la grilla)
    variants?: string[]; // Variantes o alternativas disponibles dentro del servicio
}
