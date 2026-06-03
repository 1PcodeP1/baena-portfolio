'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function Contact() {
  const t = useTranslations('contact')

  return (
    <section className="py-36 px-margin-mobile md:px-margin-desktop bg-primary text-on-primary text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="max-w-5xl mx-auto flex flex-col items-center"
      >
        <h2 className="font-display text-[48px] sm:text-[64px] md:text-[160px] leading-[0.8] tracking-tighter uppercase mb-12 w-full">
          {t('title')}
        </h2>
        <a
          href={`mailto:${t('email')}`}
          className="inline-block border border-on-primary bg-transparent text-on-primary font-mono text-[11px] tracking-widest uppercase px-12 py-5 hover:bg-on-primary hover:text-primary transition-colors"
        >
          {t('email')}
        </a>
      </motion.div>
    </section>
  )
}
