# Baena Portfolio — Design Spec

**Date:** 2026-06-02  
**Status:** Approved  
**Source design:** Stitch project 16420762046346993093 — "Carlos Baena - Landing Page Editorial (Refined)"

---

## 1. Overview

Personal editorial/brutalist portfolio for Carlos Baena, fullstack developer. Built with Next.js 15 App Router. Faithful to the Stitch design with three additions: dark mode, functional EN/ES i18n, and Framer Motion animations. Projects are data-driven so new ones can be added by editing a single file.

---

## 2. Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| i18n | next-intl |
| Dark mode | next-themes |
| Fonts | Anton · JetBrains Mono · Plus Jakarta Sans (Google Fonts) |
| Deploy target | Vercel |

---

## 3. Design Tokens

Identical to Stitch source. Both modes use the same orange accent.

| Token | Light | Dark |
|-------|-------|------|
| `background` | `#f7f4ed` | `#111111` |
| `on-background` | `#111111` | `#f7f4ed` |
| `primary` | `#E8552B` | `#E8552B` |
| `on-primary` | `#ffffff` | `#ffffff` |
| `surface-variant` | `#eae5d8` | `#1e1e1e` |
| `secondary` | `#4a4a4a` | `#888888` |
| `outline-variant` | `rgba(17,17,17,0.2)` | `rgba(247,244,237,0.15)` |

**Typography:**
- Display/Headlines: Anton (400)
- Labels/Mono: JetBrains Mono (400/500/700)
- Body: Plus Jakarta Sans (400/500/600/700)

---

## 4. Project Structure

```
baena-portfolio/
├── messages/
│   ├── en.json
│   └── es.json
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx          # ThemeProvider + NextIntlClientProvider
│   │       ├── page.tsx            # Landing (all sections)
│   │       └── projects/
│   │           └── [slug]/
│   │               └── page.tsx    # Project detail page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Sticky · dark toggle · lang toggle
│   │   │   ├── Footer.tsx
│   │   │   └── Ticker.tsx          # Infinite scroll banner
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Giant CARLOS BAENA + stagger animation
│   │   │   ├── Manifesto.tsx       # Dark bg · parallax text
│   │   │   ├── TechnicalStack.tsx  # 4-column grid
│   │   │   ├── ProjectIndex.tsx    # Split panel: list + hover preview
│   │   │   └── Contact.tsx         # LET'S BUILD orange section
│   │   └── ui/
│   │       ├── ProjectCard.tsx     # Row item in the list
│   │       ├── ProjectPreview.tsx  # Right panel (AnimatePresence)
│   │       ├── ThemeToggle.tsx     # Sun/moon icon button
│   │       └── LanguageToggle.tsx  # EN / ES text button
│   ├── data/
│   │   └── projects.ts             # Single source of truth for all projects
│   ├── i18n/
│   │   ├── routing.ts
│   │   └── request.ts
│   └── lib/
│       └── utils.ts
├── next.config.ts
└── tailwind.config.ts
```

---

## 5. Page Sections (in order)

### 5.1 Header
- Sticky, `z-40`, border-bottom
- Left: hamburger icon + "CARLOS BAENA" in Anton
- Right: `LanguageToggle` (EN / ES) + `ThemeToggle` (icon)
- On scroll > 20px: subtle background blur (`backdrop-blur-sm`)

### 5.2 Hero
- Full viewport height (`min-h-[85vh]`)
- "CARLOS" and "BAENA" (italic, primary color) in massive Anton
- Subtitle: "Full Stack Developer / Systems Architect" (JetBrains Mono)
- "PORTFOLIO 2025" right-aligned
- **Framer Motion:** stagger entrance — each word slides up with `0.15s` delay between them
- Two decorative circles (C initial + sparkle) bottom-right, pulse on hover

### 5.3 Ticker
- Black background, white text, primary orange dots
- CSS `animation: ticker 20s linear infinite`
- Content: SOFTWARE ENGINEERING · SYSTEMS ARCHITECTURE · UI/UX IMPLEMENTATION · CARLOS BAENA · PORTFOLIO 2025

### 5.4 Manifesto
- Dark background (`on-background`), light text
- Quote: "CODE IS ARCHITECTURE. EVERY FUNCTION IS A LOAD-BEARING COLUMN."
- **Framer Motion:** parallax — text moves at 0.3x scroll speed
- Two-column philosophy paragraph below divider

### 5.5 Technical Stack
- 4-column grid: FRONTEND · BACKEND · MOBILE · DEVOPS
- Each column: large ghost number + category title + tech list with `+` separators
- Hover: `bg-surface-variant` transition

### 5.6 Project Index
**Split-panel layout (desktop):**
- Left 50%: numbered list rows. Each row: `01 · PROJECT NAME · YEAR · [tag1] [tag2]`
- Right 50%: preview panel — static container, content swaps with `AnimatePresence`
- Preview panel shows: project title (large Anton), short description, full tech stack tags, "→ View project" link
- Active row highlighted with left border in `primary`
- **Mobile:** stacked cards with tap-to-expand accordion

**Interaction states:**
- Default: list visible, preview shows first project
- Hover on row: preview updates (slide + fade with AnimatePresence)
- Click on row or "→ View project": navigate to `/[locale]/projects/[slug]`

### 5.7 Contact
- Orange (`primary`) background, white text
- "LET'S BUILD" in Anton at ~180px desktop / ~80px mobile
- Email button: border outline, hover inverts to white bg + orange text
- Email: placeholder `hello@carlosbaena.dev` (easily swappable)

### 5.8 Footer
- "CARLOS / BAENA" large Anton left
- Nav links right: EMAIL · LINKEDIN · GITHUB · INSTAGRAM (all `href="#"` placeholder)
- Divider line
- Copyright + "DESIGNED & BUILT WITH ✦"

---

## 6. Project Detail Page (`/[locale]/projects/[slug]`)

Sections:
1. **Back button** — `← PROJECT INDEX` with slide-left animation on click
2. **Header block** — project number + name (Anton, massive) + year
3. **Meta row** — tech stack tags + status (placeholder links to repo/live)
4. **Description** — full description in EN or ES based on locale
5. **What it does** — bullet list of features
6. **Tech breakdown** — categorized tech tags (Frontend / Backend / etc.)
7. **CTA** — repo link + live link (both `#` placeholders)

Page transition: fade + slide up with Framer Motion `AnimatePresence` on the layout.

---

## 7. Data Model

```typescript
// src/data/projects.ts
export interface Project {
  slug: string
  number: string            // "01", "02", etc.
  year: number
  featured: boolean
  tech: string[]
  liveUrl: string           // "#" until deployed
  repoUrl: string           // "#" until public
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
```

Seeded with 3 placeholder projects. Carlos adds real ones by extending this array.

---

## 8. i18n

- `next-intl` with middleware routing: `/en/*` and `/es/*`
- Default locale: `es`
- `messages/en.json` and `messages/es.json` contain all UI strings (nav, section headings, CTA labels)
- Project content (title, description) lives in `projects.ts` under `translations` — not in message files

---

## 9. Dark Mode

- `next-themes` with `attribute="class"` — adds `dark` class to `<html>`
- Tailwind `darkMode: "class"` — all `dark:` variants in components
- No flash on load: `ThemeProvider` with `enableSystem` and `suppressHydrationWarning`
- Toggle persists in `localStorage` via next-themes

---

## 10. Animations (Framer Motion)

| Component | Animation |
|-----------|-----------|
| Hero words | Stagger slide-up on mount (0.15s between words) |
| Reveal sections | `whileInView` fade + translateY (replaces CSS IntersectionObserver) |
| Manifesto text | Parallax via `useScroll` + `useTransform` |
| Project preview | `AnimatePresence` fade + slide-left on project change |
| Page transitions | Layout animation via `<AnimatePresence>` in root layout |
| Project detail entry | Slide-up fade on route load |

---

## 11. Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|---------|
| Mobile (`< 768px`) | Single column · hero font 100px · project index as accordion |
| Tablet (`768px–1024px`) | 2-col project grid fallback |
| Desktop (`> 1024px`) | Full split-panel projects · hero font 240px |

---

## 12. Out of Scope (this version)

- Contact form (email link only)
- Blog
- CMS integration
- Analytics
- Image gallery per project
