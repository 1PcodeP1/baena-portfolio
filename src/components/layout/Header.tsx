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
