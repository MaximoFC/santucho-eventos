export type GalleryItem = {
    id: string;
    src: string;
    alt: string;
    layout: string;
};

export const GALLERY: GalleryItem[] = [
    {
        id: "01",
        src: "/images/gallery/semana.PNG",
        alt: "Semana estudiantil producida por Santucho Producciones",
        layout: "col-span-2 row-span-2 lg:col-span-4 lg:row-span-2",
    },
    {
        id: "02",
        src: "/images/gallery/robot-led.PNG",
        alt: "Robot led en fiesta de cumpleaños",
        layout: "col-span-1 row-span-2 lg:col-span-4 lg:row-span-1",
    },
    {
        id: "03",
        src: "/images/gallery/15.jpg",
        alt: "Fiesta de 15 años animada por Santucho Producciones",
        layout: "col-span-1 row-span-2 lg:col-span-4 lg:row-span-2",
    },
    {
        id: "04",
        src: "/images/gallery/15-2.jpg",
        alt: "Fiesta de 15 años con efectos especiales de Santucho Producciones",
        layout: "col-span-1 row-span-2 lg:col-span-4 lg:row-span-1",
    },
    
];