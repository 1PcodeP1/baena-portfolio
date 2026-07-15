'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export interface WordRevealSegment {
  text: string
  className?: string
  breakAfter?: boolean
}

interface WordRevealProps {
  segments: WordRevealSegment[]
  className?: string
}

/**
 * Scrubbed word reveal: every word starts dimmed and lights up one by one,
 * tied 1:1 to scroll progress (scrub), while the heading travels through
 * the viewport. Under prefers-reduced-motion the text renders fully visible.
 */
export function WordReveal({ segments, className = '' }: WordRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const words = gsap.utils.toArray<HTMLElement>('.word', ref.current)
        if (!words.length) return

        gsap.set(words, { opacity: 0.15 })
        gsap.to(words, {
          opacity: 1,
          ease: 'none',
          stagger: 0.5,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 1,
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <h2 ref={ref} className={className}>
      {segments.map((segment, si) => (
        <span key={si} className={segment.className}>
          {segment.text.split(' ').map((word, wi) => (
            <span key={wi} className="word inline-block will-change-[opacity]">
              {word}
              {' '}
            </span>
          ))}
          {segment.breakAfter && <br />}
        </span>
      ))}
    </h2>
  )
}
