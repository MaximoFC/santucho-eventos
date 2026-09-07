export const siteConfig = {
  name: "Santucho Eventos",
  shortName: "Santucho",
  description:
    "Soluciones audiovisuales profesionales para hacer de cada evento una experiencia inolvidable.",
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
      "Sonido, iluminación, pantallas LED, proyección, estructuras y asistencia técnica profesional.",

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
    description: 'Trabajamos en cumpleaños, fiestas de 15, casamientos, eventos corporativos, recitales, festivales y celebraciones de todo tipo.',
  },

  positioning: {
    eyebrow: 'Más que un evento',
    title: 'Una experiencia.',
    description: 'No solo alquilamos equipos: combinamos tecnología, atención personalizada y un equipo técnico comprometido para que cada evento salga exactamente como lo imaginaste.',
    concepts: [
      {
        id: "tecnologia",
        number: "01",
        title: "Tecnología",
        description:
          "Equipos audiovisuales de calidad para lograr una puesta en escena profesional.",
      },
      {
        id: "produccion",
        number: "02",
        title: "Producción",
        description:
          "Combinamos sonido, iluminación, imagen, estructuras y asistencia técnica según las necesidades de cada evento.",
      },
      {
        id: "atencion",
        number: "03",
        title: "Atención",
        description:
          "Atención personalizada para acompañarte en la planificación y encontrar la propuesta adecuada para tu evento.",
      },
      {
        id: "compromiso",
        number: "04",
        title: "Compromiso",
        description:
          "Un equipo técnico comprometido para que todo funcione correctamente y sin preocupaciones.",
      },
    ],
  },

  experiences: [
    {
      number: "01",
      category: "SEMANA ESTUDIANTIL",
      title: "Eventos\nque se sienten",
      description:
        "Producción audiovisual para eventos universitarios, recitales, shows y celebraciones de gran escala.",
      image: "/images/semana-estudiantil-preview.PNG",
      imagePosition: "center 35%",
    },
    {
      number: "02",
      category: "FIESTAS",
      title: "Cada momento\nimporta",
      description:
        "Una puesta en escena pensada para celebraciones, cumpleaños, fiestas de 15, casamientos y eventos privados.",
      image: "/images/fiesta-preview.jpg",
      imagePosition: "center 55%",
    },
    {
      number: "03",
      category: "PEÑAS Y BINGOS",
      title: "La energía\nse comparte",
      description:
        "Sonido, iluminación y producción audiovisual para acompañar cada momento del evento.",
      image: "/images/penas-bingos-preview.png",
      imagePosition: "center 55%",
    },
    {
      number: "04",
      category: "MATINÉES",
      title: "Una noche\npara recordar",
      description:
        "Una producción pensada para crear una experiencia audiovisual atractiva y adaptada a cada celebración.",
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
  
} as const;

export type Experience = (typeof siteConfig.experiences)[number]