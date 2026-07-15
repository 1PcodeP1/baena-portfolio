'use client'

import { useTranslations } from 'next-intl'
import { PinnedCards } from '@/components/scroll/PinnedCards'

const stackData = [
  { num: '01', key: 'frontend', items: ['React', 'Next.js', 'Tailwind', 'Vue'] },
  { num: '02', key: 'backend', items: ['Node.js', 'NestJS', 'Python', 'PostgreSQL'] },
  { num: '03', key: 'mobile', items: ['Flutter', 'React Native', 'Swift'] },
  { num: '04', key: 'devops', items: ['Docker', 'AWS', 'CI/CD', 'Linux'] },
] as const

type StackKey = 'frontend' | 'backend' | 'mobile' | 'devops'

export function TechnicalStack() {
  const t = useTranslations('stack')

  return (
    <section className="border-b border-outline-variant bg-background">
      <PinnedCards className="py-32 px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <h2 className="font-display text-[56px] md:text-[88px] leading-[0.85] tracking-tighter text-on-background uppercase">
            {t('title1')}<br />{t('title2')}
          </h2>
          <div className="sparkle w-10 h-10 bg-primary hidden md:block mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-outline-variant">
          {stackData.map(({ num, key, items }) => (
            <div
              key={key}
              data-pin-card
              className="p-10 border-r border-b border-outline-variant flex flex-col h-full bg-background hover:bg-surface-variant transition-colors duration-200 will-change-transform"
            >
              <div className="font-display text-[72px] text-outline-variant leading-none mb-10">{num}</div>
              <h3 className="font-display text-2xl tracking-tighter uppercase mb-8 text-on-background">
                {t(key as StackKey)}
              </h3>
              <div className="flex flex-col gap-2.5 mt-auto font-mono text-[11px] tracking-widest uppercase">
                {items.map((item) => (
                  <div key={item} className="flex justify-between border-b border-outline-variant pb-2">
                    <span className="text-on-background">{item}</span>
                    <span className="text-primary">+</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PinnedCards>
    </section>
  )
}
