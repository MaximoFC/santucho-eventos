import type { Service } from "@/types/service";

export const services: Service[] = [
    {
        slug: "dj",
        number: "01",
        category: "MÚSICA",
        title: "DJ",
        description:
            "Creamos la mejor experiencia musical, adaptándonos al estilo y la energía de cada celebración.",
        image: "",
        variants: ["Cantidad de horas"],
    },

    {
        slug: "sonido",
        number: "02",
        category: "PRODUCCIÓN TÉCNICA",
        title: "Sonido",
        description:
            "Brindamos sistemas de sonido profesional con equipos de alta calidad para garantizar una reproducción clara.",
        image: "",
        variants: [
            "Según el tamaño del espacio",
            "Según la cantidad de personas",
        ],
    },

    {
        slug: "iluminacion",
        number: "03",
        category: "PRODUCCIÓN TÉCNICA",
        title: "Iluminación",
        description:
            "Diseñamos ambientes únicos con iluminación profesional para realzar cada momento del evento.",
        image: "",
    },

    {
        slug: "cabina-de-fotos",
        number: "04",
        category: "EXPERIENCIAS",
        title: "Cabina de fotos",
        description:
            "Nuestra cabina de fotos ofrece impresiones instantáneas, accesorios temáticos y recuerdos únicos para que cada invitado se lleve una sonrisa.",
        image: "/images/services/cabina-fotos-preview.PNG",
        variants: ["Cantidad de horas"],
        featured: true,
    },

    {
        slug: "decoracion",
        number: "05",
        category: "AMBIENTACIÓN",
        title: "Decoración",
        description:
            "Transformamos cada espacio en un ambiente único y acorde a la temática de tu evento.",
        image: "",
        variants: ["Según el diseño a realizar"],
    },

    {
        slug: "pantalla-led",
        number: "06",
        category: "PRODUCCIÓN TÉCNICA",
        title: "Pantalla LED",
        description:
            "Ofrecemos pantallas LED de alta definición para transmitir videos, presentaciones, contenido en vivo e imágenes con excelente calidad.",
        image: "",
        variants: ["Según el tamaño"],
    },

    {
        slug: "escenario",
        number: "07",
        category: "PRODUCCIÓN TÉCNICA",
        title: "Escenario",
        description:
            "Proveemos escenarios modulares, seguros y adaptables a distintos tipos de eventos.",
        image: "",
        variants: ["Según la medida"],
    },

    {
        slug: "ambientacion",
        number: "08",
        category: "AMBIENTACIÓN",
        title: "Ambientación",
        description:
            "Creamos ambientes que reflejan el estilo y la esencia de cada evento, combinando iluminación, decoración y detalles visuales.",
        image: "/images/services/tuneles-neon-preview.jpg",
        variants: [
            "Chispas frías",
            "Túnel irregular",
            "Túnel de arcos",
            "Túnel LED",
            "Túnel de guirnaldas",
            "Letras LED",
            "Pista LED",
        ],
    },

    {
        slug: "entretenimiento",
        number: "09",
        category: "ENTRETENIMIENTO",
        title: "Entretenimiento",
        description:
            "Ofrecemos propuestas de entretenimiento para todas las edades, pensadas para sorprender y mantener a los invitados disfrutando durante todo el evento.",
        image: "/images/services/robot-led-preview.jpg",
        variants: [
            "Robots LED",
            "Alas de neón",
            "Escopeta CO2",
            "Dinosaurio inflable",
            "Sapito inflable",
            "Gorilas gigantes",
            "Base 360",
        ],
    },
];