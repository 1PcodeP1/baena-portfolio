// src/data/projects.ts

export interface Project {
  slug: string
  number: string
  year: number
  featured: boolean
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
    featured: true,
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
    featured: false,
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
    featured: false,
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
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
