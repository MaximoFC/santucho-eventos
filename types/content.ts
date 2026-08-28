export interface Service {
    slug: string;
    number: string;
    title: string;
    category: string;
    description: string;
    image: string;
    featured?: boolean;
}

export type GalleryItem = {
    id: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    type?: "image" | "video";
    featured?: boolean;
};