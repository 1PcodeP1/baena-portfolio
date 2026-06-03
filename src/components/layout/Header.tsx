'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const navLinks = [
    { label: 'EMAIL', href: 'mailto:hello@carlosbaena.dev' },
    { label: 'GITHUB', href: '#' },
    { label: 'LINKEDIN', href: '#' },
    { label: 'INSTAGRAM', href: '#' },
  ]

  return (
    <>
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
            onClick={() => setDrawerOpen(true)}
            className="flex items-center justify-center text-on-background hover:text-primary transition-colors"
            aria-label="Abrir menú"
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

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-on-background/60 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 z-50 h-full w-[min(320px,85vw)] bg-background border-r border-outline-variant flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant">
                <span className="font-display text-[22px] tracking-tighter leading-none">
                  CARLOS BAENA
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-on-background hover:text-primary transition-colors"
                  aria-label="Cerrar menú"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col flex-grow px-8 py-10 gap-1">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className="font-mono text-[12px] tracking-widest uppercase text-secondary hover:text-primary transition-colors py-4 border-b border-outline-variant"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              {/* Drawer footer toggles */}
              <div className="flex items-center gap-4 px-8 py-8 border-t border-outline-variant">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
