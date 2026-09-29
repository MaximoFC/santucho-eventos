import type { Service } from "@/types/service";

export const services: Service[] = [
    {
        slug: "dj",
        number: "01",
        category: "MÚSICA",
        title: "DJ",
        description:
            "Creamos la mejor experiencia musical, adaptándonos al estilo y la energía de cada celebración.",
        image: {
            src: "/images/services/dj/cover.jpg",
            alt: "DJ mezclando en vivo frente a una pantalla LED",
        },
        pricing: "Según la cantidad de horas.",
    },

    {
        slug: "sonido",
        number: "02",
        category: "PRODUCCIÓN TÉCNICA",
        title: "Sonido",
        description:
            "Brindamos sistemas de sonido profesional con equipos de alta calidad para garantizar una reproducción clara.",
        image: {
            src: "/images/services/sonido.jpeg",
            alt: "Equipos de sonido profesional montados para un evento",
        },
        pricing: "Según el tamaño del espacio y la cantidad de personas.",
    },

    {
        slug: "iluminacion",
        number: "03",
        category: "PRODUCCIÓN TÉCNICA",
        title: "Iluminación",
        description:
            "Diseñamos ambientes únicos con iluminación profesional para realzar cada momento del evento.",
        image: {
            src: "/images/services/iluminacion.jpeg",
            alt: "Iluminación profesional en la pista de un evento",
        },
    },

    {
        slug: "cabina-de-fotos",
        number: "04",
        category: "ENTRETENIMIENTO",
        title: "Cabina de fotos",
        description:
            "Nuestra cabina de fotos ofrece impresiones instantáneas, accesorios temáticos y recuerdos únicos para que cada invitado se lleve una sonrisa.",
        image: {
            src: "/images/services/cabina-de-fotos/cover.jpg",
            alt: "Cabina de fotos iluminada en azul dentro de un salón de eventos",
        },
        featured: true,
        pricing: "Según la cantidad de horas.",
        includes: [
            "Cotillón",
        ],
    },

    {
        slug: "decoracion",
        number: "05",
        category: "AMBIENTACIÓN",
        title: "Decoración",
        description:
            "Transformamos cada espacio en un ambiente único y acorde a la temática de tu evento.",
        image: {
            src: "/images/services/decoracion/cover.jpg",
            alt: "Mesa dulce decorada con carteles de neón para una fiesta de 15",
        },
        pricing: "Según el diseño a realizar: la idea y la cantidad de elementos, como los de la mesa dulce.",
    },

    {
        slug: "pantalla-led",
        number: "06",
        category: "PRODUCCIÓN TÉCNICA",
        title: "Pantalla LED",
        description:
            "Ofrecemos pantallas LED de alta definición para transmitir videos, presentaciones, contenido en vivo e imágenes con excelente calidad.",
        image: {
            src: "/images/services/pantalla-led/cover.jpg",
            alt: "Escenario con pantalla LED de Santucho Eventos montado al aire libre",
        },
        gallery: [
            {
                src: "/images/hero-led.PNG",
                alt: "Pantalla LED mostrando la gráfica de una semana estudiantil",
            },
        ],
        pricing: "Según el tamaño de la pantalla.",
        includes: [
            "Operador de pantalla LED",
        ],
    },

    {
        slug: "ambientacion",
        number: "07",
        category: "AMBIENTACIÓN",
        title: "Ambientación",
        description:
            "Creamos ambientes que reflejan el estilo y la esencia de cada evento, combinando iluminación, decoración y detalles visuales.",
        image: {
            src: "/images/services/ambientacion/cover.jpg",
            alt: "Túnel de neón y letras LED en la entrada de una fiesta de 15",
        },
        featured: true,
        pricing: "Según los elementos elegidos. Cada opción se puede contratar de forma individual.",
        variants: [
            "Iluminación de plantas y pasillos",
            "Chispas frías (según la cantidad)",
            "Túnel irregular",
            "Túnel de arcos",
            "Túnel LED (según el túnel y la cantidad de cuerpos)",
            "Túnel de guirnaldas",
            "Letras LED (según la cantidad de letras de la palabra)",
            "Pista LED (según el tamaño)",
        ],
    },

    {
        slug: "entretenimiento",
        number: "08",
        category: "ENTRETENIMIENTO",
        title: "Entretenimiento",
        description:
            "Ofrecemos propuestas de entretenimiento para todas las edades, pensadas para sorprender y mantener a los invitados disfrutando durante todo el evento.",
        image: {
            src: "/images/services/entretenimiento/cover.jpg",
            alt: "Robots LED animando la pista con chispas frías",
        },
        gallery: [
            {
                src: "/images/gallery/robot-led.PNG",
                alt: "Robot LED bailando con invitados en la pista",
            },
            {
                src: "/images/services/entretenimiento/alas-neon.jpg",
                alt: "Alas de neón dentro de un arco luminoso para fotos",
            },
            {
                src: "/images/services/entretenimiento/base-360.jpg",
                alt: "Quinceañera sobre la plataforma de la base 360",
            },
        ],
        featured: true,
        pricing: "Según las opciones elegidas. Cada opción se puede contratar de forma individual.",
        variants: [
            "Robots LED: 1, 2 o 3 robots, de 25 a 30 minutos. Incluye pistola de chispa fría, marco de fotos y palo limbo",
            "Alas de neón",
            "Escopeta CO2",
            "Dinosaurio inflable",
            "Sapito inflable",
            "Gorilas gigantes (según la cantidad)",
            "Base 360: según la cantidad de horas. Incluye la grabación y el video editado",
        ],
    },
];