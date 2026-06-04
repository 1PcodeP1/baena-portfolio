// src/data/projects.ts

export interface Project {
  slug: string
  number: string
  year: number
  tech: string[]
  liveUrl: string
  repoUrl: string
  translations: {
    en: {
      title: string
      shortDescription: string
      fullDescription: string
      whatItDoes: string[]
    }
    es: {
      title: string
      shortDescription: string
      fullDescription: string
      whatItDoes: string[]
    }
  }
}

export const projects: Project[] = [
  {
    slug: 'project-alpha',
    number: '01',
    year: 2025,
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    liveUrl: '#',
    repoUrl: '#',
    translations: {
      en: {
        title: 'Project Alpha',
        shortDescription: 'Full-stack platform for managing distributed workflows.',
        fullDescription:
          'A comprehensive platform built to manage and orchestrate distributed workflows across teams. Focused on reliability, observability, and developer experience.',
        whatItDoes: [
          'Real-time task orchestration across multiple services',
          'Role-based access control with JWT authentication',
          'PostgreSQL-backed persistence with Docker Compose local dev',
          'REST API with NestJS and OpenAPI documentation',
        ],
      },
      es: {
        title: 'Project Alpha',
        shortDescription: 'Plataforma fullstack para gestionar flujos de trabajo distribuidos.',
        fullDescription:
          'Una plataforma integral construida para gestionar y orquestar flujos de trabajo distribuidos entre equipos. Enfocada en confiabilidad, observabilidad y experiencia del desarrollador.',
        whatItDoes: [
          'Orquestación de tareas en tiempo real entre múltiples servicios',
          'Control de acceso basado en roles con autenticación JWT',
          'Persistencia en PostgreSQL con Docker Compose para desarrollo local',
          'API REST con NestJS y documentación OpenAPI',
        ],
      },
    },
  },
  {
    slug: 'project-beta',
    number: '02',
    year: 2024,
    tech: ['Flutter', 'Firebase', 'BLoC', 'Dart'],
    liveUrl: '#',
    repoUrl: '#',
    translations: {
      en: {
        title: 'Project Beta',
        shortDescription: 'Cross-platform mobile app with real-time sync.',
        fullDescription:
          'A Flutter application built with clean architecture (BLoC pattern) and Firebase backend. Available on iOS and Android with offline-first data handling.',
        whatItDoes: [
          'Offline-first architecture with Firestore local cache',
          'BLoC state management for predictable UI state',
          'Push notifications via Firebase Cloud Messaging',
          'Cross-platform iOS and Android from a single codebase',
        ],
      },
      es: {
        title: 'Project Beta',
        shortDescription: 'App móvil multiplataforma con sincronización en tiempo real.',
        fullDescription:
          'Una aplicación Flutter construida con arquitectura limpia (patrón BLoC) y backend en Firebase. Disponible en iOS y Android con manejo de datos offline-first.',
        whatItDoes: [
          'Arquitectura offline-first con caché local de Firestore',
          'Gestión de estado con BLoC para UI predecible',
          'Notificaciones push vía Firebase Cloud Messaging',
          'iOS y Android multiplataforma desde un solo código fuente',
        ],
      },
    },
  },
  {
    slug: 'project-gamma',
    number: '03',
    year: 2023,
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    liveUrl: '#',
    repoUrl: '#',
    translations: {
      en: {
        title: 'Project Gamma',
        shortDescription: 'SaaS dashboard with advanced data visualization.',
        fullDescription:
          'A SaaS analytics dashboard built for monitoring business KPIs in real time. Clean React frontend with a Node.js/Express API and MongoDB for flexible document storage.',
        whatItDoes: [
          'Real-time KPI monitoring with WebSocket updates',
          'Configurable chart widgets with drag-and-drop layout',
          'Multi-tenant architecture with workspace isolation',
          'CSV and PDF export for all reports',
        ],
      },
      es: {
        title: 'Project Gamma',
        shortDescription: 'Dashboard SaaS con visualización avanzada de datos.',
        fullDescription:
          'Un dashboard de analíticas SaaS construido para monitorear KPIs de negocio en tiempo real. Frontend React limpio con API Node.js/Express y MongoDB para almacenamiento de documentos flexible.',
        whatItDoes: [
          'Monitoreo de KPIs en tiempo real con actualizaciones WebSocket',
          'Widgets de gráficas configurables con layout drag-and-drop',
          'Arquitectura multi-tenant con aislamiento de workspaces',
          'Exportación CSV y PDF para todos los reportes',
        ],
      },
    },
  },
  {
    slug: 'obras-vivas',
    number: '04',
    year: 2025,
    tech: ['Next.js', 'TypeScript', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'tsParticles'],
    liveUrl: '#',
    repoUrl: '#',
    translations: {
      en: {
        title: 'Obras Vivas',
        shortDescription: 'Interactive art installation website — light, memory and eternity in Santa Fe de Antioquia.',
        fullDescription:
          'Digital showcase for an interdisciplinary art installation inspired by the heritage of Santa Fe de Antioquia, Colombia. Characters extracted from traditional paintings — carriers, incense-bearers, matrons and stewards — are brought to life through animation, spatial audio, and interactive presence.',
        whatItDoes: [
          'Hero with particle system (tsParticles) and letter-by-letter text reveal via Splitting.js + GSAP',
          'Interactive sound map of Santa Fe de Antioquia: click a landmark to hear its character',
          'Gallery of five living characters — each with an expandable card, modal and soundscape',
          'Smooth scroll orchestrated with Lenis + GSAP ScrollTrigger across all sections',
        ],
      },
      es: {
        title: 'Obras Vivas',
        shortDescription: 'Sitio web de instalación artística interactiva — luz, memoria y eternidad en Santa Fe de Antioquia.',
        fullDescription:
          'Vitrina digital de una instalación artística interdisciplinar inspirada en el patrimonio de Santa Fe de Antioquia, Colombia. Personajes extraídos de pinturas tradicionales — cargueros, sahumadoras, matronas y mayordomos — cobran vida a través de animación, audio espacial y presencia interactiva.',
        whatItDoes: [
          'Hero con sistema de partículas (tsParticles) y revelado de texto letra a letra con Splitting.js + GSAP',
          'Mapa sonoro interactivo de Santa Fe de Antioquia: clic en un punto histórico para escuchar su personaje',
          'Galería de cinco personajes vivos — cada uno con card expandible, modal y paisaje sonoro',
          'Smooth scroll orquestado con Lenis + GSAP ScrollTrigger a lo largo de todas las secciones',
        ],
      },
    },
  },
  {
    slug: 'grand-stakes',
    number: '05',
    year: 2025,
    tech: ['Flutter', 'Dart', 'Hive', 'Audioplayers'],
    liveUrl: '#',
    repoUrl: '#',
    translations: {
      en: {
        title: 'Grand Stakes',
        shortDescription: 'High-fidelity casino simulator built entirely in Flutter — zero real money, full luxury experience.',
        fullDescription:
          'Grand Stakes Pro Simulator recreates the atmosphere of a private high-roller atelier. Built with Flutter for Android, iOS, Web and macOS, it features premium dark-mode UI, realistic sound design, and fully local persistent state — no backend required.',
        whatItDoes: [
          'Four complete casino games: Blackjack (Split/Double/Surrender), Roulette, Slots with Minor/Major/Grand jackpots, and Baccarat',
          'Local auth with Hive: multi-session profiles with isolated balance, history and settings',
          'Reactive state engine via ValueListenableBuilder — balance and stats update in real time',
          'Continuous Jazz soundtrack + contextual SFX (card dealing, jackpots, wheel spin) via Audioplayers',
        ],
      },
      es: {
        title: 'Grand Stakes',
        shortDescription: 'Simulador de casino de alta fidelidad construido en Flutter — sin dinero real, experiencia de lujo completa.',
        fullDescription:
          'Grand Stakes Pro Simulator recrea la atmósfera de un atelier privado de high-roller. Construido con Flutter para Android, iOS, Web y macOS, ofrece UI premium en modo oscuro, diseño de sonido realista y estado persistente completamente local — sin backend.',
        whatItDoes: [
          'Cuatro juegos de casino completos: Blackjack (Split/Double/Surrender), Ruleta, Slots con jackpots Minor/Major/Grand y Baccarat',
          'Autenticación local con Hive: perfiles multi-sesión con saldo, historial y ajustes aislados',
          'Motor de estado reactivo con ValueListenableBuilder — saldo y estadísticas se actualizan en tiempo real',
          'Banda sonora Jazz continua + SFX contextuales (reparto de cartas, jackpots, giro de ruleta) vía Audioplayers',
        ],
      },
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
