'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface PinnedCardsProps {
  children: React.ReactNode
  className?: string
}

/**
 * Pin de sección: on desktop the wrapper pins to the viewport while every
 * `[data-pin-card]` descendant reveals in sequence, driven 1:1 by scroll.
 * On mobile it degrades to a simple staggered entrance (no pin), and under
 * prefers-reduced-motion everything renders static.
 */
export function PinnedCards({ children, className = '' }: PinnedCardsProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-pin-card]', ref.current)
      if (!cards.length) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(cards, { yPercent: 18, opacity: 0 })
        gsap.to(cards, {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          stagger: 0.35,
          scrollTrigger: {
            trigger: ref.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: '+=140%',
            invalidateOnRefresh: true,
          },
        })
      })

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(cards, { y: 32, opacity: 0 })
        ScrollTrigger.batch(cards, {
          start: 'top 85%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.12,
            }),
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
