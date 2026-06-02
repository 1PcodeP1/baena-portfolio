# Baena Editorial Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive editorial/brutalist portfolio for Carlos Baena using Next.js 15 App Router with dark mode, EN/ES i18n, Framer Motion animations, and a data-driven project index.

**Architecture:** Next.js 15 App Router with `[locale]` dynamic segment for i18n routing via `next-intl`. Design tokens use CSS custom properties so dark mode works via a single `dark` class on `<html>`. All project data lives in `src/data/projects.ts` — adding a new project requires editing only that file.

**Tech Stack:** Next.js 15 · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion 11 · next-intl 3 · next-themes 0.3

**Source design:** Stitch project `16420762046346993093` — "Carlos Baena - Landing Page Editorial (Refined)"  
**Spec:** `docs/superpowers/specs/2026-06-02-baena-portfolio-design.md`

---

## File Map

```
baena-portfolio/
├── messages/
│   ├── en.json                              CREATE — all UI strings in English
│   └── es.json                              CREATE — all UI strings in Spanish
├── middleware.ts                             CREATE — next-intl locale routing
├── next.config.ts                           MODIFY — add next-intl plugin
├── tailwind.config.ts                       MODIFY — design tokens + dark mode
├── src/
│   ├── app/
│   │   ├── globals.css                      MODIFY — CSS variables light/dark
│   │   └── [locale]/
│   │       ├── layout.tsx                   CREATE — ThemeProvider + NextIntlClientProvider
│   │       ├── page.tsx                     CREATE — landing page (all sections)
│   │       └── projects/
│   │           └── [slug]/
│   │               └── page.tsx             CREATE — project detail page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx                   CREATE — sticky header with toggles
│   │   │   ├── Footer.tsx                   CREATE — footer with links
│   │   │   └── Ticker.tsx                   CREATE — infinite scroll banner
│   │   ├── sections/
│   │   │   ├── Hero.tsx                     CREATE — full-viewport hero + Framer stagger
│   │   │   ├── Manifesto.tsx                CREATE — dark section + parallax
│   │   │   ├── TechnicalStack.tsx           CREATE — 4-column tech grid
│   │   │   ├── ProjectIndex.tsx             CREATE — split-panel project list
│   │   │   └── Contact.tsx                  CREATE — orange CTA section
│   │   └── ui/
│   │       ├── ThemeToggle.tsx              CREATE — sun/moon icon button
│   │       ├── LanguageToggle.tsx           CREATE — EN/ES text button
│   │       ├── ProjectCard.tsx              CREATE — single row in project list
│   │       └── ProjectPreview.tsx           CREATE — right-panel preview content
│   ├── data/
│   │   └── projects.ts                      CREATE — Project type + placeholder data
│   └── i18n/
│       ├── routing.ts                       CREATE — locales config
│       └── request.ts                       CREATE — getRequestConfig
```

---

## Task 1: Scaffold Next.js 15 and install dependencies

**Files:**
- Create: entire project scaffold
- Modify: `package.json` (add framer-motion, next-intl, next-themes)

- [ ] **Step 1: Scaffold Next.js 15 into temp dir**

```bash
npx create-next-app@15 /tmp/baena-scaffold \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --no-import-alias \
  --yes
```

Expected output: `Success! Created baena-scaffold`

- [ ] **Step 2: Copy scaffold into existing repo (preserve .git and docs/)**

```bash
rsync -av --exclude='.git' --exclude='docs' \
  /tmp/baena-scaffold/ \
  /Users/pupu/Repositorios/baena-portfolio/
```

Expected: all Next.js files copied, docs/ and .git/ untouched.

- [ ] **Step 3: Install additional dependencies**

```bash
cd /Users/pupu/Repositorios/baena-portfolio
npm install framer-motion next-intl next-themes
```

Expected: `added N packages` with no errors.

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev &
sleep 4
curl -s http://localhost:3000 | grep -q "Next.js" && echo "OK" || echo "FAIL"
kill %1
```

Expected: `OK`

- [ ] **Step 5: Commit scaffold**

```bash
cd /Users/pupu/Repositorios/baena-portfolio
git add -A
git commit -m "chore: scaffold Next.js 15 + install framer-motion, next-intl, next-themes"
```

---

## Task 2: Configure Tailwind tokens and CSS variables for dark mode

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts` with design token config**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E8552B',
        'on-primary': '#ffffff',
        background: 'var(--color-background)',
        'on-background': 'var(--color-on-background)',
        surface: 'var(--color-surface)',
        'surface-variant': 'var(--color-surface-variant)',
        secondary: 'var(--color-secondary)',
        outline: 'var(--color-outline)',
        'outline-variant': 'var(--color-outline-variant)',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      spacing: {
        'margin-desktop': '3rem',
        'margin-mobile': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace `src/app/globals.css` with design system CSS**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-background: #f7f4ed;
  --color-on-background: #111111;
  --color-surface: #f7f4ed;
  --color-surface-variant: #eae5d8;
  --color-secondary: #4a4a4a;
  --color-outline: #111111;
  --color-outline-variant: rgba(17, 17, 17, 0.2);
}

.dark {
  --color-background: #111111;
  --color-on-background: #f7f4ed;
  --color-surface: #111111;
  --color-surface-variant: #1e1e1e;
  --color-secondary: #888888;
  --color-outline: #f7f4ed;
  --color-outline-variant: rgba(247, 244, 237, 0.15);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
}

::selection {
  background-color: #E8552B;
  color: #ffffff;
}

/* Ticker animation */
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ticker-animate {
  animation: ticker 20s linear infinite;
}

/* Sparkle shape */
.sparkle {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "chore: configure Tailwind design tokens and dark mode CSS variables"
```

---

## Task 3: Configure next-intl routing and middleware

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create `src/i18n/routing.ts`**

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en'] as const,
  defaultLocale: 'es',
})

export type Locale = (typeof routing.locales)[number]
```

- [ ] **Step 2: Create `src/i18n/request.ts`**

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? routing.defaultLocale
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 3: Create `middleware.ts` at project root**

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
```

- [ ] **Step 4: Update `next.config.ts`**

```typescript
// next.config.ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {}

export default withNextIntl(nextConfig)
```

- [ ] **Step 5: Create placeholder message files (content filled in Task 6)**

```bash
mkdir -p /Users/pupu/Repositorios/baena-portfolio/messages
echo '{"nav":{"placeholder":"todo"}}' > /Users/pupu/Repositorios/baena-portfolio/messages/en.json
echo '{"nav":{"placeholder":"todo"}}' > /Users/pupu/Repositorios/baena-portfolio/messages/es.json
```

- [ ] **Step 6: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/i18n/ middleware.ts next.config.ts messages/
git commit -m "chore: configure next-intl routing and middleware"
```

---

## Task 4: Create project data types and seed data

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create `src/data/projects.ts` with type and 3 placeholder projects**

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add Project type and 3 placeholder projects"
```

---

## Task 5: Create i18n message files

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/es.json`

- [ ] **Step 1: Write `messages/en.json`**

```json
{
  "nav": {
    "lang": "EN",
    "langSwitch": "ES",
    "menu": "Menu",
    "themeLight": "Switch to light mode",
    "themeDark": "Switch to dark mode"
  },
  "hero": {
    "established": "EST. 2025",
    "role": "Full Stack Developer\nSystems Architect",
    "portfolio": "PORTFOLIO 2025"
  },
  "ticker": {
    "items": [
      "SOFTWARE ENGINEERING",
      "SYSTEMS ARCHITECTURE",
      "UI/UX IMPLEMENTATION",
      "CARLOS BAENA",
      "PORTFOLIO 2025"
    ]
  },
  "manifesto": {
    "quote1": "CODE IS",
    "quote2": "ARCHITECTURE.",
    "quote3": "EVERY FUNCTION IS A",
    "quote4": "LOAD-BEARING",
    "quote5": "COLUMN.",
    "tag": "Development Philosophy",
    "p1": "I build digital structures intended to last. My approach merges the precision of systems engineering with the aesthetic discipline of modern design. Every line of code serves a purpose, eliminating the superfluous to reveal the essential function underneath.",
    "p2": "Inspired by Brutalist architecture, I believe in exposing the raw mechanics of an application—clean APIs, robust state management, and semantic markup that stands strong against the test of scale and time."
  },
  "stack": {
    "title1": "TECHNICAL",
    "title2": "STACK",
    "frontend": "FRONTEND",
    "backend": "BACKEND",
    "mobile": "MOBILE",
    "devops": "DEVOPS"
  },
  "projects": {
    "title1": "PROJECT",
    "title2": "INDEX",
    "subtitle": "Selected engineering and architectural projects. Focused on robust systems and elegant UI.",
    "viewProject": "→ View project",
    "backToIndex": "← Project Index",
    "techStack": "Tech Stack",
    "whatItDoes": "What It Does",
    "viewRepo": "View Repository",
    "viewLive": "View Live"
  },
  "contact": {
    "title": "LET'S BUILD",
    "email": "hello@carlosbaena.dev"
  },
  "footer": {
    "rights": "© 2025 CARLOS BAENA — ALL RIGHTS RESERVED",
    "builtWith": "DESIGNED & BUILT WITH",
    "email": "EMAIL",
    "linkedin": "LINKEDIN",
    "github": "GITHUB",
    "instagram": "INSTAGRAM"
  }
}
```

- [ ] **Step 2: Write `messages/es.json`**

```json
{
  "nav": {
    "lang": "ES",
    "langSwitch": "EN",
    "menu": "Menú",
    "themeLight": "Cambiar a modo claro",
    "themeDark": "Cambiar a modo oscuro"
  },
  "hero": {
    "established": "EST. 2025",
    "role": "Desarrollador Full Stack\nArquitecto de Sistemas",
    "portfolio": "PORTAFOLIO 2025"
  },
  "ticker": {
    "items": [
      "INGENIERÍA DE SOFTWARE",
      "ARQUITECTURA DE SISTEMAS",
      "IMPLEMENTACIÓN UI/UX",
      "CARLOS BAENA",
      "PORTAFOLIO 2025"
    ]
  },
  "manifesto": {
    "quote1": "EL CÓDIGO ES",
    "quote2": "ARQUITECTURA.",
    "quote3": "CADA FUNCIÓN ES UNA",
    "quote4": "COLUMNA",
    "quote5": "ESTRUCTURAL.",
    "tag": "Filosofía de Desarrollo",
    "p1": "Construyo estructuras digitales diseñadas para durar. Mi enfoque fusiona la precisión de la ingeniería de sistemas con la disciplina estética del diseño moderno. Cada línea de código tiene un propósito, eliminando lo superfluo para revelar la función esencial.",
    "p2": "Inspirado en la arquitectura Brutalista, creo en exponer la mecánica cruda de una aplicación: APIs limpias, gestión de estado robusta y marcado semántico que resiste la prueba de la escala y el tiempo."
  },
  "stack": {
    "title1": "STACK",
    "title2": "TÉCNICO",
    "frontend": "FRONTEND",
    "backend": "BACKEND",
    "mobile": "MÓVIL",
    "devops": "DEVOPS"
  },
  "projects": {
    "title1": "ÍNDICE DE",
    "title2": "PROYECTOS",
    "subtitle": "Proyectos de ingeniería y arquitectura seleccionados. Enfocados en sistemas robustos y UI elegante.",
    "viewProject": "→ Ver proyecto",
    "backToIndex": "← Índice de proyectos",
    "techStack": "Stack Tecnológico",
    "whatItDoes": "Qué Hace",
    "viewRepo": "Ver Repositorio",
    "viewLive": "Ver en Vivo"
  },
  "contact": {
    "title": "CONSTRUYAMOS",
    "email": "hello@carlosbaena.dev"
  },
  "footer": {
    "rights": "© 2025 CARLOS BAENA — TODOS LOS DERECHOS RESERVADOS",
    "builtWith": "DISEÑADO Y CONSTRUIDO CON",
    "email": "EMAIL",
    "linkedin": "LINKEDIN",
    "github": "GITHUB",
    "instagram": "INSTAGRAM"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add messages/
git commit -m "feat: add EN and ES i18n message files"
```

---

## Task 6: Root layout — ThemeProvider + NextIntlClientProvider

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Delete (or clear): `src/app/layout.tsx` (scaffold default, replaced by locale layout)

- [ ] **Step 1: Create `src/app/[locale]/layout.tsx`**

```typescript
// src/app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { Anton, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import '../globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Carlos Baena | Portfolio',
  description: 'Full Stack Developer & Systems Architect',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${anton.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} font-sans bg-background text-on-background min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Update `globals.css` to use font variables**

Add at the end of `src/app/globals.css`:

```css
.font-display {
  font-family: var(--font-anton), sans-serif;
}

.font-mono {
  font-family: var(--font-mono), monospace;
}

.font-sans {
  font-family: var(--font-sans), sans-serif;
}
```

- [ ] **Step 3: Remove or replace the scaffold root `src/app/layout.tsx`**

Replace its content with a redirect to avoid conflict:

```typescript
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

- [ ] **Step 4: Create minimal `src/app/[locale]/page.tsx` to confirm routing works**

```typescript
// src/app/[locale]/page.tsx
export default function HomePage() {
  return <main><h1>OK</h1></main>
}
```

- [ ] **Step 5: Run dev and verify both locales work**

```bash
npm run dev &
sleep 5
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/es && echo " /es OK"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en && echo " /en OK"
kill %1
```

Expected: `200 /es OK` and `200 /en OK`

- [ ] **Step 6: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 7: Commit**

```bash
git add src/app/
git commit -m "feat: root layout with ThemeProvider, next-intl, and Google Fonts"
```

---

## Task 7: ThemeToggle and LanguageToggle components

**Files:**
- Create: `src/components/ui/ThemeToggle.tsx`
- Create: `src/components/ui/LanguageToggle.tsx`

- [ ] **Step 1: Create `src/components/ui/ThemeToggle.tsx`**

```typescript
// src/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-8 h-8 flex items-center justify-center text-on-background hover:text-primary transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
```

- [ ] **Step 2: Create `src/components/ui/LanguageToggle.tsx`**

```typescript
// src/components/ui/LanguageToggle.tsx
'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { routing } from '@/i18n/routing'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale() {
    const nextLocale = locale === 'es' ? 'en' : 'es'
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${nextLocale}${pathWithoutLocale}`)
  }

  return (
    <button
      onClick={switchLocale}
      className="font-mono text-[11px] tracking-widest uppercase border border-outline-variant px-3 py-1.5 text-on-background hover:text-primary hover:border-primary transition-colors"
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "feat: ThemeToggle and LanguageToggle components"
```

---

## Task 8: Ticker component

**Files:**
- Create: `src/components/layout/Ticker.tsx`

- [ ] **Step 1: Create `src/components/layout/Ticker.tsx`**

```typescript
// src/components/layout/Ticker.tsx
import { useTranslations } from 'next-intl'

export function Ticker() {
  const t = useTranslations('ticker')
  const items: string[] = t.raw('items')
  const content = [...items, ...items]

  return (
    <div className="w-full bg-on-background text-background py-4 border-b border-outline-variant overflow-hidden">
      <div className="ticker-animate flex gap-12 items-center whitespace-nowrap" style={{ display: 'inline-flex' }}>
        {content.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-mono text-[11px] tracking-widest uppercase">{item}</span>
            <span className="text-primary text-lg">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Ticker.tsx
git commit -m "feat: Ticker component with i18n content"
```

---

## Task 9: Header component

**Files:**
- Create: `src/components/layout/Header.tsx`

- [ ] **Step 1: Create `src/components/layout/Header.tsx`**

```typescript
// src/components/layout/Header.tsx
'use client'

import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`
        bg-background text-on-background w-full px-margin-mobile md:px-margin-desktop
        py-5 sticky top-0 z-40 border-b border-outline-variant
        flex justify-between items-center transition-all duration-300
        ${scrolled ? 'backdrop-blur-sm' : ''}
      `}
    >
      <div className="flex items-center gap-5">
        <button
          className="flex items-center justify-center text-on-background hover:text-primary transition-colors"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span className="font-display text-[28px] md:text-[36px] tracking-tighter leading-none pt-0.5">
          CARLOS BAENA
        </span>
      </div>
      <div className="flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: Header with sticky scroll blur, ThemeToggle, LanguageToggle"
```

---

## Task 10: Footer component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `src/components/layout/Footer.tsx`**

```typescript
// src/components/layout/Footer.tsx
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  const links = [
    { key: 'email', href: 'mailto:hello@carlosbaena.dev' },
    { key: 'linkedin', href: '#' },
    { key: 'github', href: '#' },
    { key: 'instagram', href: '#' },
  ] as const

  return (
    <footer className="bg-background text-on-background w-full px-margin-mobile md:px-margin-desktop py-16 border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12">
        <div className="font-display text-[56px] md:text-[88px] leading-[0.85] tracking-tighter">
          CARLOS<br />BAENA
        </div>
        <nav className="flex flex-col md:flex-row gap-5 md:gap-10">
          {links.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="font-mono text-[11px] tracking-widest uppercase text-secondary hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
            >
              {t(key)}
            </a>
          ))}
        </nav>
      </div>
      <div className="w-full h-px bg-outline-variant mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-[10px] md:text-[11px] tracking-widest text-secondary uppercase gap-3">
        <span>{t('rights')}</span>
        <span className="flex items-center gap-2">
          {t('builtWith')}
          <span className="sparkle w-2.5 h-2.5 bg-primary inline-block" />
        </span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: Footer with i18n social links"
```

---

## Task 11: Hero section with Framer Motion stagger

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

```typescript
// src/components/sections/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const wordVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export function Hero() {
  const t = useTranslations('hero')
  const roleLines = t('role').split('\n')

  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-20 relative border-b border-outline-variant overflow-hidden">
      <div className="absolute top-8 left-margin-mobile md:left-margin-desktop">
        <span className="font-mono text-[11px] tracking-widest text-secondary">{t('established')}</span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start md:items-center justify-center w-full max-w-[1400px] mx-auto"
      >
        <div className="font-display text-[100px] md:text-[240px] leading-[0.82] tracking-tighter uppercase w-full text-left md:text-center">
          <motion.div variants={wordVariants}>CARLOS</motion.div>
          <motion.div variants={wordVariants} className="text-primary italic">
            BAENA
          </motion.div>
        </div>

        <motion.div
          variants={wordVariants}
          className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-14 w-full justify-between"
        >
          <div className="font-mono text-[11px] tracking-widest text-secondary uppercase leading-relaxed">
            {roleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < roleLines.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="hidden md:block flex-grow mx-8 h-px bg-outline-variant" />
          <div className="font-display text-[48px] md:text-[72px] leading-none text-right">
            {t('portfolio')}
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 right-margin-mobile md:right-margin-desktop flex gap-3 text-primary">
        <div className="w-11 h-11 border-2 border-primary rounded-full flex items-center justify-center font-display text-xl hover:bg-primary hover:text-on-primary transition-colors">
          C
        </div>
        <div className="w-11 h-11 border-2 border-primary rounded-full flex items-center justify-center hover:bg-primary transition-colors">
          <span className="sparkle w-4 h-4 bg-primary" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: Hero section with Framer Motion stagger entrance"
```

---

## Task 12: Manifesto section with parallax

**Files:**
- Create: `src/components/sections/Manifesto.tsx`

- [ ] **Step 1: Create `src/components/sections/Manifesto.tsx`**

```typescript
// src/components/sections/Manifesto.tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function Manifesto() {
  const t = useTranslations('manifesto')
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  return (
    <section
      ref={ref}
      className="py-32 px-margin-mobile md:px-margin-desktop bg-on-background text-background border-b border-outline-variant relative overflow-hidden"
    >
      <motion.div style={{ y }} className="max-w-6xl mx-auto">
        <h2 className="font-display text-[56px] md:text-[130px] leading-[0.85] tracking-tighter uppercase mb-16 text-background">
          {t('quote1')} <span className="text-primary">{t('quote2')}</span>
          <br />
          {t('quote3')}
          <br />
          <span className="italic text-primary">{t('quote4')}</span> {t('quote5')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-[rgba(247,244,237,0.15)] pt-12">
          <div className="md:col-span-4">
            <div className="sparkle w-8 h-8 bg-primary mb-6" />
            <div className="font-mono text-[11px] tracking-widest text-primary uppercase">{t('tag')}</div>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="font-sans text-base text-background/80 font-light leading-relaxed">{t('p1')}</p>
            <p className="font-sans text-base text-background/80 font-light leading-relaxed">{t('p2')}</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Manifesto.tsx
git commit -m "feat: Manifesto section with Framer Motion parallax"
```

---

## Task 13: TechnicalStack section

**Files:**
- Create: `src/components/sections/TechnicalStack.tsx`

- [ ] **Step 1: Create `src/components/sections/TechnicalStack.tsx`**

```typescript
// src/components/sections/TechnicalStack.tsx
'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const stackData = [
  { num: '01', key: 'frontend', items: ['React', 'Next.js', 'Tailwind', 'Vue'] },
  { num: '02', key: 'backend', items: ['Node.js', 'NestJS', 'Python', 'PostgreSQL'] },
  { num: '03', key: 'mobile', items: ['Flutter', 'React Native', 'Swift'] },
  { num: '04', key: 'devops', items: ['Docker', 'AWS', 'CI/CD', 'Linux'] },
]

export function TechnicalStack() {
  const t = useTranslations('stack')

  return (
    <section className="py-32 px-margin-mobile md:px-margin-desktop border-b border-outline-variant bg-background">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8"
      >
        <h2 className="font-display text-[56px] md:text-[88px] leading-[0.85] tracking-tighter text-on-background uppercase">
          {t('title1')}<br />{t('title2')}
        </h2>
        <div className="sparkle w-10 h-10 bg-primary hidden md:block mt-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-outline-variant"
      >
        {stackData.map(({ num, key, items }) => (
          <div
            key={key}
            className="p-10 border-r border-b border-outline-variant flex flex-col h-full bg-background hover:bg-surface-variant transition-colors duration-200"
          >
            <div className="font-display text-[72px] text-outline-variant leading-none mb-10">{num}</div>
            <h3 className="font-display text-2xl tracking-tighter uppercase mb-8 text-on-background">
              {t(key as 'frontend' | 'backend' | 'mobile' | 'devops')}
            </h3>
            <div className="flex flex-col gap-2.5 mt-auto font-mono text-[11px] tracking-widest uppercase">
              {items.map((item) => (
                <div key={item} className="flex justify-between border-b border-outline-variant pb-2">
                  <span className="text-on-background">{item}</span>
                  <span className="text-primary">+</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/TechnicalStack.tsx
git commit -m "feat: TechnicalStack section with 4-column grid"
```

---

## Task 14: ProjectCard and ProjectPreview components

**Files:**
- Create: `src/components/ui/ProjectCard.tsx`
- Create: `src/components/ui/ProjectPreview.tsx`

- [ ] **Step 1: Create `src/components/ui/ProjectCard.tsx`**

```typescript
// src/components/ui/ProjectCard.tsx
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  locale: string
  isActive: boolean
  onHover: () => void
  onClick: () => void
}

export function ProjectCard({ project, locale, isActive, onHover, onClick }: ProjectCardProps) {
  const t = project.translations[locale as 'en' | 'es']

  return (
    <div
      className={`
        group flex items-center justify-between py-6 px-4 border-b border-outline-variant cursor-pointer
        transition-colors duration-150 hover:bg-surface-variant
        ${isActive ? 'border-l-2 border-l-primary pl-3' : 'border-l-2 border-l-transparent pl-3'}
      `}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <div className="flex items-center gap-6">
        <span className="font-mono text-[11px] tracking-widest text-secondary">{project.number}</span>
        <span className="font-display text-2xl md:text-3xl tracking-tighter uppercase text-on-background group-hover:text-primary transition-colors">
          {t.title}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-2 flex-wrap justify-end">
          {project.tech.slice(0, 2).map((tag) => (
            <span key={tag} className="font-mono text-[10px] tracking-widest uppercase border border-outline-variant px-2 py-0.5 text-secondary">
              {tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] tracking-widest text-secondary">{project.year}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/ui/ProjectPreview.tsx`**

```typescript
// src/components/ui/ProjectPreview.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Project } from '@/data/projects'

interface ProjectPreviewProps {
  project: Project
  locale: string
}

export function ProjectPreview({ project, locale }: ProjectPreviewProps) {
  const t = useTranslations('projects')
  const content = project.translations[locale as 'en' | 'es']

  return (
    <motion.div
      key={project.slug}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-full flex flex-col justify-between p-10"
    >
      <div>
        <div className="font-mono text-[11px] tracking-widest text-secondary mb-4">{project.number} · {project.year}</div>
        <h3 className="font-display text-[56px] md:text-[72px] leading-[0.85] tracking-tighter uppercase text-on-background mb-6">
          {content.title}
        </h3>
        <p className="font-sans text-base text-secondary leading-relaxed mb-8">
          {content.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase border border-outline-variant px-2.5 py-1 text-on-background"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-primary hover:gap-4 transition-all duration-200 mt-8"
      >
        {t('viewProject')}
      </Link>
    </motion.div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ProjectCard.tsx src/components/ui/ProjectPreview.tsx
git commit -m "feat: ProjectCard row and ProjectPreview panel components"
```

---

## Task 15: ProjectIndex section (split-panel orchestration)

**Files:**
- Create: `src/components/sections/ProjectIndex.tsx`

- [ ] **Step 1: Create `src/components/sections/ProjectIndex.tsx`**

```typescript
// src/components/sections/ProjectIndex.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ProjectPreview } from '@/components/ui/ProjectPreview'

export function ProjectIndex() {
  const t = useTranslations('projects')
  const locale = useLocale()
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)

  function handleClick(slug: string) {
    router.push(`/${locale}/projects/${slug}`)
  }

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop border-b border-outline-variant bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 flex flex-col md:flex-row items-start justify-between gap-8"
      >
        <h2 className="font-display text-[56px] md:text-[88px] leading-[0.85] tracking-tighter uppercase">
          {t('title1')}<br /><span className="text-primary">{t('title2')}</span>
        </h2>
        <p className="font-mono text-[11px] tracking-wider text-secondary uppercase leading-relaxed max-w-xs">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Desktop: split panel */}
      <div className="hidden md:grid md:grid-cols-2 border border-outline-variant min-h-[520px]">
        <div className="border-r border-outline-variant flex flex-col justify-center">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              isActive={activeIndex === i}
              onHover={() => setActiveIndex(i)}
              onClick={() => handleClick(project.slug)}
            />
          ))}
        </div>
        <div className="relative">
          <AnimatePresence mode="wait">
            <ProjectPreview
              key={projects[activeIndex].slug}
              project={projects[activeIndex]}
              locale={locale}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden flex flex-col">
        {projects.map((project, i) => {
          const content = project.translations[locale as 'en' | 'es']
          const isOpen = activeIndex === i
          return (
            <div key={project.slug} className="border-b border-outline-variant">
              <button
                className="w-full flex items-center justify-between py-5 text-left"
                onClick={() => setActiveIndex(isOpen ? -1 : i)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] tracking-widest text-secondary">{project.number}</span>
                  <span className="font-display text-2xl tracking-tighter uppercase">{content.title}</span>
                </div>
                <span className="font-mono text-[11px] text-secondary">{isOpen ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 px-2">
                      <p className="font-sans text-sm text-secondary leading-relaxed mb-4">
                        {content.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tag) => (
                          <span key={tag} className="font-mono text-[10px] tracking-widest uppercase border border-outline-variant px-2 py-0.5 text-secondary">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleClick(project.slug)}
                        className="font-mono text-[11px] tracking-widest uppercase text-primary"
                      >
                        {t('viewProject')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ProjectIndex.tsx
git commit -m "feat: ProjectIndex with split-panel desktop and accordion mobile"
```

---

## Task 16: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Create `src/components/sections/Contact.tsx`**

```typescript
// src/components/sections/Contact.tsx
'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function Contact() {
  const t = useTranslations('contact')

  return (
    <section className="py-36 px-margin-mobile md:px-margin-desktop bg-primary text-on-primary text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto flex flex-col items-center"
      >
        <h2 className="font-display text-[72px] md:text-[160px] leading-[0.8] tracking-tighter uppercase mb-12 w-full">
          {t('title')}
        </h2>
        <a
          href={`mailto:${t('email')}`}
          className="inline-block border border-on-primary bg-transparent text-on-primary font-mono text-[11px] tracking-widest uppercase px-12 py-5 hover:bg-on-primary hover:text-primary transition-colors"
        >
          {t('email')}
        </a>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: Contact section with orange CTA"
```

---

## Task 17: Compose landing page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Replace placeholder `page.tsx` with full landing page**

```typescript
// src/app/[locale]/page.tsx
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Ticker } from '@/components/layout/Ticker'
import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { TechnicalStack } from '@/components/sections/TechnicalStack'
import { ProjectIndex } from '@/components/sections/ProjectIndex'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <TechnicalStack />
        <ProjectIndex />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev server and visually verify the landing page**

```bash
npm run dev
```

Open `http://localhost:3000/es` and confirm:
- Header sticky with toggles
- "CARLOS BAENA" hero with stagger animation
- Ticker scrolling
- Manifesto dark section
- Technical stack 4 columns
- Project index with split panel on hover
- Orange contact section
- Footer

Open `http://localhost:3000/en` and confirm language switch works.

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/app/
git commit -m "feat: compose landing page with all sections in correct order"
```

---

## Task 18: Project detail page

**Files:**
- Create: `src/app/[locale]/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `src/app/[locale]/projects/[slug]/page.tsx`**

```typescript
// src/app/[locale]/projects/[slug]/page.tsx
'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { use } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { projects, getProjectBySlug } from '@/data/projects'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export function generateStaticParams() {
  return projects.flatMap((p) =>
    ['es', 'en'].map((locale) => ({ locale, slug: p.slug }))
  )
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = use(params)
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const content = project.translations[locale as 'en' | 'es']
  const t = useTranslations('projects')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="px-margin-mobile md:px-margin-desktop py-16 max-w-[1200px]"
        >
          {/* Back */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-secondary hover:text-primary transition-colors mb-16"
          >
            {t('backToIndex')}
          </Link>

          {/* Header block */}
          <div className="border-b border-outline-variant pb-12 mb-12">
            <div className="flex items-start justify-between gap-8 flex-wrap">
              <div>
                <span className="font-mono text-[11px] tracking-widest text-secondary block mb-4">
                  {project.number} · {project.year}
                </span>
                <h1 className="font-display text-[64px] md:text-[120px] leading-[0.85] tracking-tighter uppercase text-on-background">
                  {content.title}
                </h1>
              </div>
              <div className="flex gap-4 mt-4">
                <a
                  href={project.repoUrl}
                  className="font-mono text-[11px] tracking-widest uppercase border border-outline-variant px-5 py-2.5 text-on-background hover:border-primary hover:text-primary transition-colors"
                >
                  {t('viewRepo')}
                </a>
                <a
                  href={project.liveUrl}
                  className="font-mono text-[11px] tracking-widest uppercase border border-primary bg-primary text-on-primary px-5 py-2.5 hover:bg-transparent hover:text-primary transition-colors"
                >
                  {t('viewLive')}
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-7">
              <p className="font-sans text-lg text-secondary leading-relaxed">
                {content.fullDescription}
              </p>
            </div>
            <div className="md:col-span-5">
              <h2 className="font-mono text-[11px] tracking-widest uppercase text-primary mb-6">
                {t('techStack')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-widest uppercase border border-outline-variant px-3 py-1.5 text-on-background"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* What it does */}
          <div className="border-t border-outline-variant pt-12">
            <h2 className="font-display text-[40px] md:text-[56px] tracking-tighter uppercase text-on-background mb-10">
              {t('whatItDoes')}
            </h2>
            <ul className="flex flex-col gap-4">
              {content.whatItDoes.map((item, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-outline-variant pb-4">
                  <span className="font-mono text-[11px] tracking-widest text-primary mt-1">0{i + 1}</span>
                  <span className="font-sans text-base text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev and test a project detail page**

```bash
npm run dev
```

Open `http://localhost:3000/es/projects/project-alpha` — confirm:
- Back button navigates to `/es`
- Title, year, description in Spanish
- Tech tags visible
- "Qué Hace" list rendered

Open `http://localhost:3000/en/projects/project-alpha` — confirm English content.

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/projects/
git commit -m "feat: project detail page with back button, description, and tech breakdown"
```

---

## Task 19: Page transitions with Framer Motion AnimatePresence

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Create: `src/components/ui/PageTransition.tsx`

- [ ] **Step 1: Create `src/components/ui/PageTransition.tsx`**

```typescript
// src/components/ui/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Wrap children in `src/app/[locale]/layout.tsx`**

Add import and wrap `{children}`:

```typescript
import { PageTransition } from '@/components/ui/PageTransition'

// In the return, replace {children} with:
<PageTransition>{children}</PageTransition>
```

Full updated `layout.tsx` body:

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
  <NextIntlClientProvider messages={messages}>
    <PageTransition>{children}</PageTransition>
  </NextIntlClientProvider>
</ThemeProvider>
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Test navigation**

```bash
npm run dev
```

Navigate between landing → project detail → back. Confirm smooth fade+slide transition.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/PageTransition.tsx src/app/[locale]/layout.tsx
git commit -m "feat: page transitions with Framer Motion AnimatePresence"
```

---

## Task 20: Final responsive and dark mode QA pass

**Files:**
- Modify as needed (no new files expected — small fixes only)

- [ ] **Step 1: Test dark mode toggle**

```bash
npm run dev
```

- Click the moon icon in header → page switches to dark (background `#111111`, text `#f7f4ed`)
- Click sun icon → returns to light
- Refresh page → theme persists from `localStorage`
- Orange `#E8552B` is unchanged in both modes

- [ ] **Step 2: Test responsive breakpoints — mobile (375px)**

In browser devtools, set viewport to 375×812:
- Hero: font 100px, left-aligned
- Ticker: visible and scrolling
- Project Index: accordion (not split-panel)
- Stack: 1-column layout
- Header: hamburger + "CARLOS BAENA" at 28px

- [ ] **Step 3: Test EN/ES switch**

- Start at `/es` — all text in Spanish
- Click `EN` toggle → redirects to `/en/` — all text in English
- Navigate to `/en/projects/project-alpha` — title and description in English
- Click `ES` → `/es/projects/project-alpha` — content in Spanish

- [ ] **Step 4: Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 5: Build check**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no warnings about missing keys.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete Baena Editorial Portfolio — responsive, dark mode, EN/ES i18n"
```

---

## Self-Review Checklist

| Spec requirement | Covered in task |
|---|---|
| Next.js 15 App Router | Task 1 |
| Tailwind design tokens (colors, fonts, spacing) | Task 2 |
| CSS variables for dark mode | Task 2 |
| next-intl EN/ES routing | Task 3 |
| Project data model + 3 placeholders | Task 4 |
| i18n message files EN + ES | Task 5 |
| ThemeToggle (sun/moon) | Task 7 |
| LanguageToggle (EN/ES) | Task 7 |
| Header sticky + blur on scroll | Task 9 |
| Footer with placeholder links | Task 10 |
| Hero Framer Motion stagger | Task 11 |
| Manifesto parallax | Task 12 |
| Technical Stack 4 columns | Task 13 |
| ProjectCard row + ProjectPreview panel | Task 14 |
| ProjectIndex split-panel + mobile accordion | Task 15 |
| Contact orange CTA | Task 16 |
| Landing page section order (Header→Hero→Ticker→Manifesto→Stack→Projects→Contact→Footer) | Task 17 |
| Project detail page | Task 18 |
| Page transitions AnimatePresence | Task 19 |
| Dark mode QA + responsive QA | Task 20 |
