'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

/** Edge the content is revealed from */
type RevealFrom = 'bottom' | 'top' | 'left' | 'right'

const CLIP: Record<RevealFrom, string> = {
  bottom: 'inset(100% 0 0 0)',
  top: 'inset(0 0 100% 0)',
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
}

interface ClipRevealProps {
  children: React.ReactNode
  from?: RevealFrom
  className?: string
}

/**
 * Clip-path curtain reveal: the content starts fully clipped and uncovers
 * when it enters the viewport; scrolling back re-covers it. Renders static
 * under prefers-reduced-motion.
 */
export function ClipReveal({ children, from = 'bottom', className = '' }: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(ref.current, {
          clipPath: CLIP[from],
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
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
