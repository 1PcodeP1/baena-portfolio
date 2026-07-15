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
    slug: 'crm-cloud',
    number: '01',
    year: 2026,
    tech: ['React', 'NestJS', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://crm-cloud-mvp-gestion-de-clientes.vercel.app',
    repoUrl: 'https://github.com/1PcodeP1/CRM-Cloud-MVP-Gestion-de-Clientes',
    translations: {
      en: {
        title: 'CRM Cloud',
        shortDescription: 'Full-stack customer relationship management platform.',
        fullDescription:
          'A CRM built end to end: React 18 + TypeScript + Vite on the frontend, NestJS with TypeORM and PostgreSQL on the backend, fully orchestrated with Docker Compose. Designed for small teams that need to track clients and interactions without enterprise overhead.',
        whatItDoes: [
          'JWT authentication with Passport.js and role-based access',
          'Client and interaction management with validated forms (React Hook Form + Zod)',
          'NestJS REST API with TypeORM over PostgreSQL',
          'Test coverage on both ends: Jest + Supertest (API), Vitest + Testing Library + MSW (UI)',
        ],
      },
      es: {
        title: 'CRM Cloud',
        shortDescription: 'Plataforma fullstack de gestión de relaciones con clientes.',
        fullDescription:
          'Un CRM construido de punta a punta: React 18 + TypeScript + Vite en el frontend, NestJS con TypeORM y PostgreSQL en el backend, todo orquestado con Docker Compose. Diseñado para equipos pequeños que necesitan gestionar clientes e interacciones sin la complejidad de una suite empresarial.',
        whatItDoes: [
          'Autenticación JWT con Passport.js y control de acceso por roles',
          'Gestión de clientes e interacciones con formularios validados (React Hook Form + Zod)',
          'API REST en NestJS con TypeORM sobre PostgreSQL',
          'Cobertura de tests en ambos extremos: Jest + Supertest (API), Vitest + Testing Library + MSW (UI)',
        ],
      },
    },
  },
  {
    slug: 'spotvibe',
    number: '02',
    year: 2026,
    tech: ['Flutter', 'Firebase', 'BLoC', 'Google Maps'],
    liveUrl: 'https://spotvibe-92ec3.web.app',
    repoUrl: 'https://github.com/1PcodeP1/SpotVibe',
    translations: {
      en: {
        title: 'SpotVibe',
        shortDescription: 'Nightlife discovery platform for Medellín — mobile app + admin hub.',
        fullDescription:
          'A two-product platform for Medellín nightlife: a Flutter app for iOS and Android where users discover venues, join groups and book tables, plus a web admin hub on Firebase Hosting. Built with Domain-Driven Design, flutter_bloc + freezed and dependency injection via get_it/injectable.',
        whatItDoes: [
          'Tinder-style venue discovery with category and price filters, super like and undo',
          'Groups ("parches") with chat and a split-the-bill calculator',
          'Full booking flow: reservation type → payment → QR entry code',
          'Google Maps centered on Medellín with category markers and event catalog with cart',
        ],
      },
      es: {
        title: 'SpotVibe',
        shortDescription: 'Plataforma de vida nocturna para Medellín — app móvil + hub administrativo.',
        fullDescription:
          'Una plataforma de dos productos para la vida nocturna de Medellín: una app Flutter para iOS y Android donde los usuarios descubren sitios, arman parches y reservan mesas, más un hub administrativo web en Firebase Hosting. Construida con Domain-Driven Design, flutter_bloc + freezed e inyección de dependencias con get_it/injectable.',
        whatItDoes: [
          'Descubrimiento de venues estilo Tinder con filtros de categoría y precio, super like y undo',
          'Parches (grupos) con chat y calculadora para dividir la cuenta',
          'Flujo completo de reservas: tipo de reserva → pago → código QR de entrada',
          'Google Maps centrado en Medellín con marcadores por categoría y catálogo de eventos con carrito',
        ],
      },
    },
  },
  {
    slug: 'renomotriz',
    number: '03',
    year: 2026,
    tech: ['React', 'Vite', 'CSS Modules', 'Cal.com'],
    liveUrl: '#',
    repoUrl: 'https://github.com/1PcodeP1/Renomotriz-landding-page',
    translations: {
      en: {
        title: 'Renomotriz',
        shortDescription: 'Premium landing page for an auto service center, built for conversion.',
        fullDescription:
          'A conversion-focused landing page for the Renomotriz auto service center. Glassmorphism aesthetic built with pure CSS Modules and native CSS variables — no CSS framework — plus smart behaviors: automatic dark mode by local time and a header that hides on scroll and reappears when you pause.',
        whatItDoes: [
          'Cal.com booking integration: a modal calendar without leaving the page',
          'Smart navbar: auto-hides on scroll, reappears after 800ms of inactivity',
          'Automatic dark mode between 6pm and 6am based on device local time',
          'Floating WhatsApp CTA with IntersectionObserver logic to avoid footer overlap',
        ],
      },
      es: {
        title: 'Renomotriz',
        shortDescription: 'Landing page premium para un centro de servicio automotriz, enfocada en conversión.',
        fullDescription:
          'Una landing page enfocada en conversión para el centro de servicio automotriz Renomotriz. Estética glassmorphism construida con CSS Modules puros y variables nativas de CSS — sin framework de estilos — más comportamientos inteligentes: modo oscuro automático según la hora local y un header que se oculta al scrollear y reaparece al pausar.',
        whatItDoes: [
          'Integración de reservas con Cal.com: calendario modal sin salir de la página',
          'Navbar inteligente: se oculta al scrollear y reaparece tras 800ms de inactividad',
          'Modo oscuro automático entre 6pm y 6am según la hora local del dispositivo',
          'CTA flotante de WhatsApp con lógica de IntersectionObserver para no tapar el footer',
        ],
      },
    },
  },
  {
    slug: 'obras-vivas',
    number: '04',
    year: 2025,
    tech: ['Next.js', 'TypeScript', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'tsParticles'],
    liveUrl: 'https://obras-vivas.vercel.app',
    repoUrl: 'https://github.com/1PcodeP1/Obras-Vivas',
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
    liveUrl: 'https://1pcodep1.github.io/APP_nativa/',
    repoUrl: 'https://github.com/1PcodeP1/APP_nativa',
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
  {
    slug: 'helena-voss',
    number: '06',
    year: 2026,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://helena-voss.vercel.app',
    repoUrl: '#',
    translations: {
      en: {
        title: 'Helena Voss',
        shortDescription: 'Editorial e-commerce for an art studio — gallery, catalog and commissions.',
        fullDescription:
          'An online gallery and shop for the Helena Voss art studio, built on Next.js 16 with Tailwind CSS v4. The design system — "The Curatorial System" — favors sharp geometry, hairline rules and an EB Garamond / Archivo Narrow pairing, translating the codes of a physical gallery into the browser.',
        whatItDoes: [
          'Full-bleed hero with ken-burns drift and scroll-triggered clip-path reveals',
          'Artwork catalog with staggered grid, filters and sold/available states',
          'Artwork detail page with sticky purchase panel and spec ledger',
          'Studio page with process timeline and private commissions form',
        ],
      },
      es: {
        title: 'Helena Voss',
        shortDescription: 'E-commerce editorial para un estudio de arte — galería, catálogo y encargos.',
        fullDescription:
          'Una galería y tienda online para el estudio de arte Helena Voss, construida en Next.js 16 con Tailwind CSS v4. El sistema de diseño — "The Curatorial System" — apuesta por geometría sin curvas, líneas hairline y la dupla tipográfica EB Garamond / Archivo Narrow, trasladando los códigos de una galería física al navegador.',
        whatItDoes: [
          'Hero full-bleed con deriva ken-burns y reveals de clip-path al scrollear',
          'Catálogo de obra con grilla escalonada, filtros y estados vendida/disponible',
          'Ficha de obra con panel de compra sticky y ledger de especificaciones',
          'Página de estudio con timeline de proceso y formulario de encargos privados',
        ],
      },
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
