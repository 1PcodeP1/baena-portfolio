'use client'

import { useTranslations } from 'next-intl'
import { WordReveal } from '@/components/scroll/WordReveal'

export function Manifesto() {
  const t = useTranslations('manifesto')

  return (
    <section className="py-16 md:py-32 px-margin-mobile md:px-margin-desktop bg-on-background text-background border-b border-outline-variant relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <WordReveal
          className="font-display text-[34px] sm:text-[48px] md:text-[130px] leading-[0.9] md:leading-[0.85] tracking-tighter uppercase mb-10 md:mb-16 text-background"
          segments={[
            { text: t('quote1') },
            { text: t('quote2'), className: 'text-primary', breakAfter: true },
            { text: t('quote3'), breakAfter: true },
            { text: t('quote4'), className: 'italic text-primary' },
            { text: t('quote5') },
          ]}
        />

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
      </div>
    </section>
  )
}
