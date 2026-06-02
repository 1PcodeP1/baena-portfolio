# Baena Editorial Portfolio

Portafolio personal de **Carlos Baena**, desarrollador fullstack y arquitecto de sistemas. Diseño editorial brutalista, completamente responsive, con soporte bilingüe EN/ES y modo oscuro.

**Demo:** [baena-portfolio.vercel.app](https://baena-portfolio.vercel.app) · **Repo:** [github.com/1PcodeP1/baena-portfolio](https://github.com/1PcodeP1/baena-portfolio)

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15.5 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Animaciones | Framer Motion 12 |
| i18n | next-intl 4 |
| Dark mode | next-themes 0.4 |
| Tipografía | Anton · JetBrains Mono · Plus Jakarta Sans |
| Deploy | Vercel (SSG) |

---

## Características

### Diseño editorial brutalista
Basado en un diseño Stitch con paleta crema/negro/naranja (`#E8552B`). Tipografía masiva en Anton, labels en JetBrains Mono y cuerpo en Plus Jakarta Sans. Sin imágenes decorativas — todo es tipografía, bordes y espacio.

### Bilingüe EN / ES funcional
Routing automático con `next-intl` v4: `/es/*` y `/en/*`. El toggle en el header cambia de idioma sin recargar la página. El contenido de cada proyecto también tiene traducciones independientes (título, descripción, lista de features).

### Dark mode persistente
`next-themes` añade la clase `dark` al `<html>`. Todos los colores son CSS custom properties definidos en `@theme` de Tailwind v4, y `.dark {}` los sobreescribe. El naranja `#E8552B` se mantiene igual en ambos modos. La preferencia se guarda en `localStorage`.

### Animaciones con Framer Motion
- **Hero:** stagger de palabras al montar (0.15s entre "CARLOS" y "BAENA")
- **Secciones:** `whileInView` fade + translateY al entrar al viewport
- **Manifesto:** parallax suave con `useScroll` + `useTransform` (-18% al scroll)
- **Project Index:** `AnimatePresence mode="wait"` en el panel de preview al cambiar de proyecto
- **Transiciones de página:** fade + slide entre rutas vía `AnimatePresence` en el layout

### Project Index — split panel + accordion
En desktop: lista de proyectos a la izquierda, panel de preview animado a la derecha. El hover en una fila actualiza el panel con `AnimatePresence`. En mobile: accordion con `motion.div` height 0 → auto.

### Proyectos data-driven
Todos los proyectos viven en un único archivo:

```
src/data/projects.ts
```

Para agregar un proyecto nuevo, basta extender el array `projects` con la estructura `Project`. No hay que tocar ningún componente.

---

## Estructura del proyecto

```
baena-portfolio/
├── messages/
│   ├── en.json              # Strings UI en inglés
│   └── es.json              # Strings UI en español
├── middleware.ts            # Routing i18n (next-intl)
├── src/
│   ├── app/
│   │   ├── globals.css      # Tokens Tailwind v4 + dark mode CSS vars
│   │   └── [locale]/
│   │       ├── layout.tsx   # ThemeProvider + NextIntlClientProvider + fonts
│   │       ├── page.tsx     # Landing page (todas las secciones)
│   │       └── projects/
│   │           └── [slug]/
│   │               ├── page.tsx            # Detalle de proyecto (Server Component)
│   │               └── ProjectContent.tsx  # Wrapper client para animación de entrada
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Sticky, blur al scroll, toggles idioma/tema
│   │   │   ├── Footer.tsx          # Wordmark + links sociales
│   │   │   └── Ticker.tsx          # Banner infinito animado
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Tipografía masiva + stagger entrance
│   │   │   ├── Manifesto.tsx       # Sección oscura + parallax
│   │   │   ├── TechnicalStack.tsx  # Grid 4 columnas con hover
│   │   │   ├── ProjectIndex.tsx    # Split panel desktop / accordion mobile
│   │   │   └── Contact.tsx         # CTA naranja "LET'S BUILD"
│   │   └── ui/
│   │       ├── ThemeToggle.tsx     # Icono sol / luna
│   │       ├── LanguageToggle.tsx  # EN ↔ ES
│   │       ├── ProjectCard.tsx     # Fila en la lista de proyectos
│   │       ├── ProjectPreview.tsx  # Panel derecho animado
│   │       └── PageTransition.tsx  # Fade+slide entre rutas
│   ├── data/
│   │   └── projects.ts      # Fuente única de verdad — editar aquí
│   └── i18n/
│       ├── routing.ts       # defineRouting con locales ['es', 'en']
│       └── request.ts       # getRequestConfig + dynamic message import
├── next.config.ts           # withNextIntl plugin
└── tailwind.config.ts       # vacío — config vive en globals.css @theme
```

---

## Secciones de la landing page

El orden de secciones en `/[locale]/page.tsx`:

| # | Sección | Descripción |
|---|---------|-------------|
| 1 | **Header** | Sticky con blur al hacer scroll. Toggle de idioma (EN/ES) y tema (claro/oscuro). Hamburger decorativo. |
| 2 | **Hero** | "CARLOS / BAENA" en Anton a 240px desktop / 100px mobile. Stagger de entrada con Framer Motion. Role y año de portafolio. |
| 3 | **Ticker** | Banner negro infinito con las especialidades: SOFTWARE ENGINEERING · SYSTEMS ARCHITECTURE · UI/UX IMPLEMENTATION. |
| 4 | **Manifesto** | Sección oscura con frase filosófica en tipografía masiva. Parallax al scroll (-18%). Dos columnas de texto. |
| 5 | **Technical Stack** | Grid de 4 columnas (Frontend / Backend / Mobile / DevOps) con números fantasma y lista de tecnologías. |
| 6 | **Project Index** | Lista de proyectos con panel de preview animado en desktop. Accordion en mobile. Click navega al detalle. |
| 7 | **Contact** | Sección naranja con "LET'S BUILD" a 160px y botón de email. |
| 8 | **Footer** | Wordmark grande + links a redes sociales + copyright. |

---

## Página de detalle de proyecto

Ruta: `/[locale]/projects/[slug]`

- Botón "← Volver" con hover animado
- Nombre del proyecto en Anton a 120px
- Botones de repo y live (placeholders `#` hasta tener URLs reales)
- Descripción completa en el idioma activo
- Grid de tech stack tags
- Lista numerada "What It Does / Qué Hace"
- Animación de entrada fade + slide al cargar

---

## Cómo agregar un proyecto

Edita `src/data/projects.ts` y agrega un objeto al array `projects`:

```typescript
{
  slug: 'mi-proyecto',       // URL: /es/projects/mi-proyecto
  number: '04',              // Número en la lista
  year: 2025,
  featured: false,
  tech: ['Next.js', 'Supabase', 'Tailwind'],
  liveUrl: 'https://mi-proyecto.com',   // '#' si no está desplegado aún
  repoUrl: 'https://github.com/1PcodeP1/mi-proyecto',
  translations: {
    en: {
      title: 'My Project',
      shortDescription: 'Short description for the preview panel.',
      fullDescription: 'Full description shown on the detail page.',
      whatItDoes: [
        'Feature one',
        'Feature two',
        'Feature three',
      ],
    },
    es: {
      title: 'Mi Proyecto',
      shortDescription: 'Descripción corta para el panel de preview.',
      fullDescription: 'Descripción completa en la página de detalle.',
      whatItDoes: [
        'Feature uno',
        'Feature dos',
        'Feature tres',
      ],
    },
  },
}
```

El proyecto aparece automáticamente en el Project Index y se generan dos rutas SSG: `/es/projects/mi-proyecto` y `/en/projects/mi-proyecto`.

---

## Actualizar textos de la UI

Los strings de navegación, secciones y footer viven en:

```
messages/en.json   # Inglés
messages/es.json   # Español
```

Edítalos directamente — next-intl los carga por locale sin configuración extra.

---

## Desarrollo local

```bash
git clone https://github.com/1PcodeP1/baena-portfolio.git
cd baena-portfolio
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — redirige a `/es` automáticamente.

```bash
npm run build       # Build de producción (SSG)
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript check
```

---

## Deploy en Vercel

1. Importa el repo en [vercel.com/new](https://vercel.com/new)
2. Vercel detecta Next.js automáticamente — sin configuración extra
3. El build genera 13 rutas estáticas:

| Ruta | Tipo |
|------|------|
| `/` | Static redirect a `/es` |
| `/es` · `/en` | SSG — landing pages |
| `/es/projects/project-alpha` | SSG |
| `/en/projects/project-alpha` | SSG |
| `/es/projects/project-beta` | SSG |
| `/en/projects/project-beta` | SSG |
| `/es/projects/project-gamma` | SSG |
| `/en/projects/project-gamma` | SSG |

---

## Tokens de diseño

Definidos en `src/app/globals.css` bajo `@theme` de Tailwind v4. El dark mode sobreescribe los tokens dinámicos con `.dark {}`.

| Token | Light | Dark |
|-------|-------|------|
| `background` | `#f7f4ed` | `#111111` |
| `on-background` | `#111111` | `#f7f4ed` |
| `primary` | `#E8552B` | `#E8552B` |
| `on-primary` | `#ffffff` | `#ffffff` |
| `surface-variant` | `#eae5d8` | `#1e1e1e` |
| `secondary` | `#4a4a4a` | `#888888` |
| `outline-variant` | `rgba(17,17,17,0.2)` | `rgba(247,244,237,0.15)` |

---

*Diseñado y construido con ✦*
