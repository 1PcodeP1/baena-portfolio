'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface ScrollStaggerProps {
  children: React.ReactNode
  className?: string
}

/**
 * Reveals every `[data-stagger-item]` descendant with a staggered rise-in
 * once the wrapper enters the viewport. Renders static under
 * prefers-reduced-motion.
 */
export function ScrollStagger({ children, className = '' }: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-stagger-item]', ref.current)
      if (!items.length) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(items, { y: 40, opacity: 0 })
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 78%',
            once: true,
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
