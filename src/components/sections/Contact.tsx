'use client'

import { useTranslations } from 'next-intl'
import { ClipReveal } from '@/components/scroll/ClipReveal'

export function Contact() {
  const t = useTranslations('contact')

  return (
    <section className="py-36 px-margin-mobile md:px-margin-desktop bg-primary text-on-primary text-center relative overflow-hidden">
      <ClipReveal from="bottom" className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center">
          <h2 className="font-display text-[48px] sm:text-[64px] md:text-[160px] leading-[0.8] tracking-tighter uppercase mb-12 w-full">
            {t('title')}
          </h2>
          <a
            href={`mailto:${t('email')}`}
            className="inline-block border border-on-primary bg-transparent text-on-primary font-mono text-[11px] tracking-widest uppercase px-12 py-5 hover:bg-on-primary hover:text-primary transition-colors"
          >
            {t('email')}
          </a>
        </div>
      </ClipReveal>
    </section>
  )
}
