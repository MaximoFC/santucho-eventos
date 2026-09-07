export type ServiceCategory =
    | "Música"
    | "Producción técnica"
    | "Experiencias"
    | "Ambientación";

export interface Service {
    slug: string;
    number: string;
    category: string;
    title: string;
    description: string;
    image: string;
    featured?: boolean;
    variants?: string[];
}