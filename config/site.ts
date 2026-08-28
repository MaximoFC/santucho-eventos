export const siteConfig = {
  name: "Santucho Eventos",
  shortName: "Santucho",
  description:
    "Soluciones audiovisuales profesionales para crear experiencias inolvidables.",
  location: "Tucumán, Argentina",
  founded: 2020,

  logo: {
    src: "/brand/santucho-eventos.png",
    alt: "Santucho Eventos",
  },

  coverage: [
    "Tucumán",
    "Catamarca",
    "Santiago del Estero",
    "Salta",
    "La Rioja",
  ],

  contact: {
    whatsapp: "",
    instagram: "",
    facebook: "",
  },

  hero: {
    eyebrow: "PRODUCCIÓN AUDIOVISUAL · EVENTOS",

    title: "SANTUCHO",
    titleAccent: "EVENTOS",

    description:
      "Sonido, iluminación, pantallas LED, estructuras y asistencia técnica profesional.",

    primaryCta: "Solicitar presupuesto",
    secondaryCta: "Ver servicios",
  },

  navigation: [
    {
      label: "Servicios",
      href: "#servicios",
    },
    {
      label: "Eventos",
      href: "#experiencias",
    },
    {
      label: "Galería",
      href: "#galeria",
    },
  ],

  experienceIntro: {
    eyebrow: 'Lo que hacemos',
    title: 'Experiencias que\nse viven.',
    description: 'Desde una primera idea hasta el último aplauso, nos ocupamos de cada detalle para que tu evento tenga identidad propia.',
  },

  positioning: {
    eyebrow: 'Más que un evento',
    title: 'Una experiencia.',
    description: 'No solo alquilamos equipos. Combinamos tecnología, experiencia y atención personalizada para que cada evento suceda exactamente como lo imaginaste.',
    concepts: [
      {
        id: "tecnologia",
        number: "01",
        title: "Tecnología",
        description:
          "Equipamiento audiovisual profesional para lograr una puesta en escena de alto nivel.",
      },
      {
        id: "produccion",
        number: "02",
        title: "Producción",
        description:
          "Planificamos cada detalle para que imagen, sonido e iluminación funcionen en conjunto.",
      },
      {
        id: "atencion",
        number: "03",
        title: "Atención",
        description:
          "Acompañamiento personalizado desde la planificación hasta el final del evento.",
      },
      {
        id: "compromiso",
        number: "04",
        title: "Compromiso",
        description:
          "Un equipo técnico presente y preparado para que todo salga como fue pensado.",
      },
    ],
  },

  experiences: [
    {
      number: "01",
      category: "SEMANA ESTUDIANTIL",
      title: "Eventos\nque se sienten",
      description:
        "Producción audiovisual para recitales, shows y eventos de gran escala.",
      image: "/images/semana-estudiantil-preview.PNG",
      imagePosition: "center 35%",
    },
    {
      number: "02",
      category: "FIESTAS",
      title: "Cada detalle\ncuenta",
      description:
        "Una puesta en escena pensada para que cada momento tenga impacto.",
      image: "/images/semana-estudiantil-preview.PNG",
      imagePosition: "center 55%",
    },
    {
      number: "03",
      category: "PEÑAS Y BINGOS",
      title: "Cada detalle\ncuenta",
      description:
        "Una puesta en escena pensada para que cada momento tenga impacto.",
      image: "/images/matinee-preview.JPG",
      imagePosition: "center 55%",
    },
    {
      number: "04",
      category: "MATINÉES",
      title: "Cada detalle\ncuenta",
      description:
        "Una puesta en escena pensada para que cada momento tenga impacto.",
      image: "/images/matinee-preview.JPG",
      imagePosition: "center 55%",
    },
  ],

  footer: {
    slogan: 'Hacemos que pase',
    links: [
      { label: 'Inicio', href: '#inicio' },
      { label: 'Servicios', href: '#servicios' },
      { label: 'Experiencias', href: '#experiencias' },
      { label: 'Contacto', href: '#contacto' }
    ],
    socials: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'facebook', href: 'https://facebook.com' },
    ]
  },

  services: [
    {
        slug: "robot-led",
        number: "01",
        category: "ENTRETENIMIENTO",
        title: "Robot LED",
        description:
            "Una experiencia visual que transforma la pista y convierte cada momento en espectáculo.",
        image: "/images/matinee-preview.JPG",
        featured: true,
    },

    {
        slug: "cabina-de-fotos",
        number: "02",
        category: "EXPERIENCIAS",
        title: "Cabina de fotos",
        description:
            "Un espacio pensado para crear recuerdos y sumar una experiencia interactiva al evento.",
        image: "/images/matinee-preview.JPG",
        featured: true,
    },

    {
        slug: "servicio-3",
        number: "03",
        category: "ENTRETENIMIENTO",
        title: "Servicio pendiente",
        description:
            "Descripción temporal hasta recibir la información definitiva del cliente.",
        image: "/images/matinee-preview.JPG",
        featured: true,
    },
  ]
} as const;

export type Experience = (typeof siteConfig.experiences)[number]