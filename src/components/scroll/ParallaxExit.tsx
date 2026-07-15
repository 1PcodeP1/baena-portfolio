'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface ParallaxExitProps {
  children: React.ReactNode
  /** How far the content drifts (in % of its own height) while its section leaves the viewport */
  yPercent?: number
  /** Fade the content out as it drifts */
  fade?: boolean
  className?: string
}

/**
 * Scrubbed exit parallax: as the closest parent <section> scrolls out of
 * view, the wrapped content drifts and fades 1:1 with scroll. Initial state
 * is untouched — this only acts once the user starts scrolling away.
 */
export function ParallaxExit({
  children,
  yPercent = -14,
  fade = true,
  className = '',
}: ParallaxExitProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = ref.current?.closest('section')
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(ref.current, {
          yPercent,
          opacity: fade ? 0 : 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}
