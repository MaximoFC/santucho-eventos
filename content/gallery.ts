export type GalleryItem = {
    id: number;
    src: string;
    alt: string;
    featured?: boolean;
};

export const GALLERY: GalleryItem[] = [
    {
        id: 1,
        src: "/images/matinee-preview.JPG",
        alt: "Producción audiovisual de Santucho Eventos",
        featured: true,
    },
    {
        id: 2,
        src: "/images/matinee-preview.JPG",
        alt: "Evento producido por Santucho Eventos",
    },
    {
        id: 3,
        src: "/images/matinee-preview.JPG",
        alt: "Montaje de iluminación para evento",
    },
    {
        id: 4,
        src: "/images/matinee-preview.JPG",
        alt: "Producción técnica de Santucho Eventos",
    },
    {
        id: 5,
        src: "/images/matinee-preview.JPG",
        alt: "Experiencia audiovisual producida por Santucho",
    },
    {
        id: 6,
        src: "/images/matinee-preview.JPG",
        alt: "Evento con iluminación y pantallas LED",
    },
];