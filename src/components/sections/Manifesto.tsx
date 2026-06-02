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
